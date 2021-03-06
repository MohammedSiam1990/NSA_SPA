
$(document).ready(function () {
    var Lang = sessionStorage['lang'];

    $('#SubpageTitle').parent().show();
    $('#SubpageTitle').html(DBSTRING['WorkStation']);
    FillDBSTRINGPage('CMWorkStations');

});

var FillForm = function (data) {
    var grid = $("#grid").getKendoGrid()
    BranchID = grid.dataItem(grid.select()).BranchID;
    $('#CompanyID').val(sessionStorage['CompanyID']);
    $('#BranchID').val(BranchID);
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $addWorkStation= GetPermession(MenuID, 'addWorkStation');
    $editWorkStation = GetPermession(MenuID, 'editWorkStation');
    //var token = sessionStorage['token'];
    //var URL = $URL_Branches + "GetBranches";
    //var BrandId = sessionStorage['BrandsID'];
    //var UserID = sessionStorage['UserId'];
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                
                e.success(data);
            },
            update: function (e) {
                e.success();
            },
            create: function (e) {
                e.success(item);
            }
        },
        batch: false,
        schema: {
            model: {
                id: "BranchWorkstationID",
                fields: {
                    BranchWorkstationID: { editable: false, nullable: false, type: "number" },
                    StatusID: { editable: false},
                    Serial: { editable: false },
                    Name: { editable: false, type: "string"},
                    NameAr: { editable: false, type: "string" },
                    CompanyID: { editable: false, type: "number", defaultValue: $('#CompanyID').val() },
                    BranchID: { editable: false, type: "number" ,defaultValue: $('#BranchID').val()},
                    WorkstationName: { editable: true, type: "string" }
                }
            }
        }
    });
    var toolbar = [{ name: "search", text: DBSTRING['Search'] }];
    if ($addWorkStation) {
        toolbar.push({ className: 'addNew', name: "addNew", text: "<span class='fa fa-plus'></span>" })
    }
    grid = $("#WSgrid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: false,
        sortable: true,
        toolbar: toolbar,
        pageable: false,
        editable: {
            "createAt": "bottom"
        },
        dataBound: function (e) {
            $('.addNew').unbind("click");
            $('.addNew').bind("click", function () {
                var WSgrid = $("#WSgrid").data("kendoGrid");
                WSgrid.addRow();
            });
        },
        columns: [{
            field: "WorkstationName",
            title: DBSTRING['Name'],
            width: '30%',
            template: "#:WorkstationName #",
            editable: function (e) {
                
                return $editWorkStation || ( e.BranchWorkstationID === 0 && $addWorkStation)
            },
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
                field: "Serial",
                title: DBSTRING['Serial'],
                width:'50%',
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            },
        {
            field: $Lang === 'ar' ? "NameAr" : "Name",
            title: DBSTRING['Status'],
            width: '10%',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            command: [
                {
                    name: 'Save',
                    text: "<span class='fa fa-save'></span>",
                    //className: "btn-primary",
                    click: function (e){
                        
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                       
                        SaveUpdate(data)
                        
                    },
                    visible: function (dataItem) {
                        
                        return (dataItem.StatusID !== 6 || dataItem.BranchWorkstationID === 0) && ($editWorkStation || dataItem.BranchWorkstationID === 0)
                    }

                }],

            title: "",
            width: "10%",
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }
        ]
    });

    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}
function formatValue(dataValue, maskFormat) {
   
    $('#maskedTextbox').kendoMaskedTextBox({ mask: maskFormat, value: dataValue });
    var maskedTextBox = $("#maskedTextbox").data("kendoMaskedTextBox");
    var returnValue = maskedTextBox.value();
    return returnValue;
}
var SaveUpdate = function (item) {
    $('#ResultMessageWS').removeClass('alert-success');
    $('#ResultMessageWS').removeClass('alert-danger');
    var obj = {

        "BranchWorkstationID": "", "BranchID": "", "CompanyID": "", "WorkstationName": "", 
        "Serial": "", "Mac": "", "StatusID": "", "CreatedBy": "", "CreateDate": "",
        "ApprovedBy": "", "ApprovedDate": "", "ModifiedBy": "",
        "LastModifyDate": ""
    };
  
    obj.BranchWorkstationID = item.BranchWorkstationID === null || item.BranchWorkstationID === '' ? 0 : item.BranchWorkstationID;
    obj.BranchID = $('#BranchID').val();
    obj.CompanyID = $('#CompanyID').val();
    if (item.WorkstationName === '') {
        $('#ResultMessageWS').addClass('alert-danger show');
        $('#ResultMessageWS').removeClass('hide');
        $('#ResultTxtWS').html(DBSTRING['Please_enter_your_WSName']);
        setTimeout("$('#ResultMessageWS').removeClass('show')", 5000);
        return false;
    }
    else {
        obj.WorkstationName = item.WorkstationName;
    }
    
    obj.Serial = item.Serial;
    obj.Mac = item.Mac;
  
    if (obj.BranchWorkstationID === 0) {
        obj.StatusID = $Pending;
        obj.CreatedBy = sessionStorage['UserId'];
    }
    else {
        obj.StatusID = item.StatusID;
        obj.CreatedBy = item.CreatedBy;
    }
    
    obj.ApprovedBy = item.ApprovedBy;
    obj.ModifiedBy = sessionStorage['UserId'];

    obj.ApprovedDate = item.ApprovedDate;
    obj.CreateDate = item.CreateDate;
  
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_BranchWorkStations + "SaveBranchWorkStations?Lang=" + Lang;
    
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "Json",
        contentType: 'application/json',
        async: false,
        cache: false,
        headers: {
            Authorization: 'bearer ' + token
        },
        data: JSON.stringify( obj),
        success: function (data) {
            if (data.success === true) {
                $("#grid").data("kendoGrid").dataSource.read();

                $('#ResultMessageWS').addClass('alert-success show');
                $('#ResultTxtWS').html(data.message);

                setTimeout("$('#ResultMessageWS').removeClass('show')", 2000);
                var grid = $("#grid").getKendoGrid()
                var dataItem = grid.dataItem(grid.select());

                var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: function (e) {
                            e.success(dataItem.WorkStations);
                        }
                        
                    },
                    batch: false,
                    schema: {
                        model: {
                            id: "BranchWorkstationID",
                            fields: {
                                WorkstationID: { editable: false, nullable: false, type: "number" },
                                StatusID: { editable: false },
                                Serial: { editable: false },
                                Name: { editable: false, type: "string" },
                                NameAr: { editable: false, type: "string" },
                                CompanyID: { editable: false, type: "number", defaultValue: $('#CompanyID').val() },
                                BranchID: { editable: false, type: "number", defaultValue: $('#BranchID').val() },
                                WorkstationName: { editable: true, type: "string" }
                            }
                        }
                    }
                });
                var WSgrid = $("#WSgrid").data("kendoGrid");
                WSgrid.setDataSource(dataSource);
                $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();

            }
            else {
                $('#ResultMessageWS').addClass('alert-danger show');
                $('#ResultMessageWS').removeClass('hide');
                $('#ResultTxtWS').html(data.message);
                setTimeout("$('#ResultMessageWS').removeClass('show')", 5000);
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status === 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status === 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#ResultMessageWS').addClass('alert-danger show');
            $('#ResultMessageWS').removeClass('hide');
            $('#ResultTxtWS').html(msg);
            setTimeout("$('#ResultMessageWS').removeClass('show')", 5000);
        }
    });

}