

$(document).ready(function () {
    var Lang = sessionStorage['lang'];
    FillDBSTRINGPage('CMPreBranch');
    $("#tabstrip").kendoTabStrip({
        //activate: onActivate,
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });


    $('#SubpageTitle').parent().show();
    $('#SubpageTitle').html(DBSTRING['PreparationBranch']);
   

});

var BindItemEx = function (DataExc) {
    var BrandID = sessionStorage['BrandsID'];
    var URL = $URL_Items + "GetItems?BrandID=" + BrandID + '&Lang=' + $Lang.toLowerCase();
    var token = sessionStorage['token'];
    var DataSourceItem;
    var list_Item = [];
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { BrandID: BrandID, Lang: $Lang },
        success: function (data, status, xhr) {

            if (data.success) {
                list_Item = data.datalist;

                list_Item = list_Item.filter(function (element) {
                    element.Excluded = DataExc.includes(element.ItemID.toString());

                    return element.StatusID === 7;
                });

                DataSourceItem = new kendo.data.DataSource({
                    transport: {
                        read: function (e) {
                            e.success(list_Item);
                        }
                    },
                    batch: false,
                    pageSize: 25,
                    schema: {
                        model: {
                            id: "ItemID",
                            fields: {
                                ItemID: { editable: true, nullable: false, type: "number" },
                                ItemNum: { editable: false, type: "string" },
                                ItemName: { editable: false, type: "string" },
                                ItemNameAr: { editable: false, type: "string" },
                                Excluded: { editable: true, type: "boolean" }
                            }
                        }
                    }
                });
                var toolbar = [{ name: "search", text: DBSTRING['Search'] }];
                if ($editPreparationBranch) {
                    toolbar.push({ className: 'SavePreBranch btn-primary', name: "SavePreBranch", text: "<span class='fa fa-save' style='font-size:20px;' ></span>" })
                }

                var Egrid = $("#Egrid").kendoGrid({
                    dataSource: DataSourceItem,
                    height: 550,
                    groupable: false,
                    sortable: true,
                    toolbar: toolbar,
                    pageable: {
                        refresh: true,
                        buttonCount: 5,
                        pageSizes: $pageSizes
                    },

                    dataBound: function (e) {

                        $('.chkbxEx').unbind("click");
                        $('.chkbxEx').bind("click", function () {
                            var masterGrid = $("#Egrid").data("kendoGrid");
                            var tr = $(this).closest("tr"); // get the current table row (tr)
                            var data = masterGrid.dataItem(tr);
                            data.set('Excluded', $(this).is(':checked'));

                            var NChkBoxes = $('#Egrid .chkbxEx').length;
                            var NChkChecked = $('#Egrid .chkbxEx:checked').length;
                            if (NChkBoxes === NChkChecked && NChkBoxes > 0) {
                                $('#headerEx-chb')[0].checked = true;
                            }
                            else {
                                $('#headerEx-chb')[0].checked = false;
                            }
                        });


                        var NChkBoxes = $('#Egrid .chkbxEx').length;
                        var NChkChecked = $('#Egrid .chkbxEx:checked').length;
                        if (NChkBoxes === NChkChecked && NChkBoxes > 0) {
                            $('#headerEx-chb')[0].checked = true;
                        }
                        else {
                            $('#headerEx-chb')[0].checked = false;
                        }
                    },
                    columns: [
                        {
                            field: "ItemNum",
                            title: DBSTRING['Num'],
                            width: '20%',
                            headerAttributes: {
                                "class": "Center",
                                style: "text-align: center;"
                            },
                            attributes: {
                                "class": "Center"
                            }
                        },
                        {
                            field: "ItemName",
                            title: DBSTRING['NameEn'],
                            width: '30%',
                            headerAttributes: {
                                "class": "Center",
                                style: "text-align: center;"
                            },
                            attributes: {
                                "class": "Center"
                            }
                        }, {
                            field: "ItemNameAr",
                            title: DBSTRING['NameAr'],
                            width: '30%',
                            headerAttributes: {
                                "class": "Center",
                                style: "text-align: center;"
                            },
                            attributes: {
                                "class": "Center"
                            }
                        },
                        {
                            title: DBSTRING["Component"],
                            field: "Excluded",
                            sortable: false,
                            headerTemplate: "<input type='checkbox'  id='headerEx-chb' class='k-checkbox header-checkbox'>",
                            template: function (dataItem) {
                                if (dataItem.Excluded) {
                                    return "<input type='checkbox' checked='checked'  class='k-checkbox chkbxEx' />";
                                }
                                else {
                                    return "<input type='checkbox' class='k-checkbox chkbxEx' />";
                                }
                            },
                            width: '20%',
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
                $('#headerEx-chb').change(function () {

                    var masterGrid = $("#Egrid").data("kendoGrid");
                    var view = masterGrid.dataSource.data();
                    var isCK = $(this).is(':checked')

                    $.map(view, function (item) {
                        item.set('Excluded', isCK);
                    });
                });
                Egrid.on("click", ".SavePreBranch", function (e) {
                    SaveUpdate();
                });
            }

        }
    });
}

var BindPM = function (data) {
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
                id: "PaymentMethodID",
                fields: {
                    PaymentMethodID: { editable: true, nullable: false, type: "number" },

                    PaymentMethodName: { editable: false, type: "string" },
                    PaymentMethodNameAr: { editable: false, type: "string" },
                    CompanyID: { editable: false, type: "number", defaultValue: $('#CompanyID').val() },
                    BranchID: { editable: false, type: "number", defaultValue: $('#BranchID').val() },
                    Connected: { editable: true, type: "boolean" }
                }
            }
        }
    });
    var toolbar = [];
    if ($editPreparationBranch) {
        toolbar.push({ className: 'SavePreBranch btn-primary', name: "SavePreBranch", text: "<span class='fa fa-save' style='font-size:20px;' ></span>" })
    }
    var PMgrid = $("#PMgrid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: false,
        sortable: true,
        toolbar: toolbar,
        pageable: false,

        dataBound: function (e) {

            $('.chkbxPM').unbind("click");
            $('.chkbxPM').bind("click", function () {

                var masterGrid = $("#PMgrid").data("kendoGrid");
                var tr = $(this).closest("tr"); // get the current table row (tr)
                var data = masterGrid.dataItem(tr);
                data.set('Connected', $(this).is(':checked'));

                var NChkBoxes = $('#PMgrid .chkbxPM').length;
                var NChkChecked = $('#PMgrid .chkbxPM:checked').length;
                if (NChkBoxes === NChkChecked && NChkBoxes > 0) {
                    $('#header-chb')[0].checked = true;
                }
                else {
                    $('#header-chb')[0].checked = false;
                }
            });


            var NChkBoxes = $('#PMgrid .chkbxPM').length;
            var NChkChecked = $('#PMgrid .chkbxPM:checked').length;
            if (NChkBoxes === NChkChecked && NChkBoxes > 0) {
                $('#header-chb')[0].checked = true;
            }
            else {
                $('#header-chb')[0].checked = false;
            }
        },
        columns: [{
            field: "PaymentMethodName",
            title: DBSTRING['NameEn'],
            width: '30%',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "PaymentMethodNameAr",
            title: DBSTRING['NameAr'],
            width: '50%',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        {
            title: DBSTRING["Component"],
            field: "Connected",
            sortable: false,
            headerTemplate: "<input type='checkbox'  id='header-chb' class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                if (dataItem.Connected) {
                    return "<input type='checkbox' checked='checked'  class='k-checkbox chkbxPM' />";
                }
                else {
                    return "<input type='checkbox' class='k-checkbox chkbxPM' />";
                }
            },
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
    $('#header-chb').change(function () {

        var masterGrid = $("#PMgrid").data("kendoGrid");
        var view = masterGrid.dataSource.data();
        var isCK = $(this).is(':checked')

        $.map(view, function (item) {
            item.set('Connected', isCK);
        });
    });
    PMgrid.on("click", ".SavePreBranch", function (e) {
        SaveUpdate();
    });
}

var BindPT = function (DataPT) {
    var BrandID = sessionStorage['BrandsID'];
    var URL = $URL_PriceTemplate + "GetPriceTemplate?BrandID=" + BrandID + '&Lang=' + $Lang.toLowerCase();
    var DataSourceItem;
    var list_Item = [];
    var token = sessionStorage['token'];
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { BrandID: BrandID, Lang: $Lang },
        success: function (data, status, xhr) {

            if (data.success) {
                list_Item = data.datalist.PriceTemplate;
                list_Item = list_Item.filter(function (element) {
                    element.Connected = DataPT.includes(element.PriceTemplateID.toString());
                    return element.InActive === false;
                });

                DataSourceItem = new kendo.data.DataSource({
                    transport: {
                        read: function (e) {

                            e.success(list_Item);
                        }
                    },
                    batch: false,
                    pageSize: 25,
                    schema: {
                        model: {
                            id: "PriceTemplateID",
                            fields: {
                                TaxID: { type: "number" },
                                CreateDate: { type: "date" },
                                Name: { type: "string" },
                                NameAr: { type: "string" },
                                Connected: { editable: true, type: "boolean" }
                            }
                        }
                    }
                });
                var toolbar = [{ name: "search", text: DBSTRING['Search'] }];
                if ($editPreparationBranch) {
                    toolbar.push({ className: 'SavePreBranch btn-primary', name: "SavePreBranch", text: "<span class='fa fa-save' style='font-size:20px;' ></span>" })
                }

                var Egrid = $("#PTgrid").kendoGrid({
                    dataSource: DataSourceItem,
                    height: 550,
                    groupable: false,
                    sortable: true,
                    toolbar: toolbar,
                    pageable: {
                        refresh: true,
                        buttonCount: 5,
                        pageSizes: $pageSizes
                    },

                    dataBound: function (e) {

                        $('.chkbx').unbind("click");
                        $('.chkbx').bind("click", function () {

                            var masterGrid = $("#PTgrid").data("kendoGrid");
                            var tr = $(this).closest("tr"); // get the current table row (tr)
                            var data = masterGrid.dataItem(tr);
                            data.set('Connected', $(this).is(':checked'));

                            var NChkBoxes = $('#PTgrid .chkbx').length;
                            var NChkChecked = $('#PTgrid .chkbx:checked').length;
                            if (NChkBoxes === NChkChecked && NChkBoxes > 0) {
                                $('#headerPT-chb')[0].checked = true;
                            }
                            else {
                                $('#headerPT-chb')[0].checked = false;
                            }
                        });


                        var NChkBoxes = $('#PTgrid .chkbx').length;
                        var NChkChecked = $('#PTgrid .chkbx:checked').length;
                        if (NChkBoxes === NChkChecked && NChkBoxes > 0) {
                            $('#headerPT-chb')[0].checked = true;
                        }
                        else {
                            $('#headerPT-chb')[0].checked = false;
                        }
                    },
                    columns: [

                        {
                            field: "Name",
                            title: DBSTRING['NameEn'],
                            width: '30%',
                            headerAttributes: {
                                "class": "Center",
                                style: "text-align: center;"
                            },
                            attributes: {
                                "class": "Center"
                            }
                        }, {
                            field: "NameAr",
                            title: DBSTRING['NameAr'],
                            width: '30%',
                            headerAttributes: {
                                "class": "Center",
                                style: "text-align: center;"
                            },
                            attributes: {
                                "class": "Center"
                            }
                        },
                        {
                            title: DBSTRING["Component"],
                            field: "Connected",
                            sortable: false,
                            headerTemplate: "<input type='checkbox'  id='headerPT-chb' class='k-checkbox header-checkbox'>",
                            template: function (dataItem) {
                                if (dataItem.Connected) {
                                    return "<input type='checkbox' checked='checked'  class='k-checkbox chkbx' />";
                                }
                                else {
                                    return "<input type='checkbox' class='k-checkbox chkbx' />";
                                }
                            },
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
                $('#headerPT-chb').change(function () {

                    var masterGrid = $("#PTgrid").data("kendoGrid");
                    var view = masterGrid.dataSource.data();
                    var isCK = $(this).is(':checked')

                    $.map(view, function (item) {
                        item.set('Connected', isCK);
                    });
                });
                Egrid.on("click", ".SavePreBranch", function (e) {
                    SaveUpdate();
                });
            }
        }});
}

var FillForm = function (data) {
    var grid = $("#grid").getKendoGrid()
    dataItem = grid.dataItem(grid.select());
    BranchID = dataItem.BranchID;
    $('#CompanyID').val(sessionStorage['CompanyID']);
    $('#BranchID').val(BranchID);
    
    var JsonData = (dataItem.toJSON());
    var PaymentMethodConnecting = JsonData.PaymentMethodConnecting;
    
    $.map(data, function (x) {
        x.Connected = PaymentMethodConnecting.includes(x.PaymentMethodID.toString());
    });

    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $editPreparationBranch = GetPermession(MenuID, 'editPreparationBranch');

    BindPM(data);
    BindItemEx(JsonData.ItemsExcluded);
    BindPT(JsonData.PriceTemplate);

    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var SaveUpdate = function () {
    var TypeID = $('.k-state-active').val();  /// Payment ===> 1 , Excluded ===> 2
    $('#ResultMessageWS').removeClass('alert-success');
    $('#ResultMessageWS').removeClass('alert-danger');
    var objList = [];
    var obj = {
        "BranchConnectingID": "", "BranchID": "",
        "ConnectingID": "", /////  ConnectingID ==> PaymentMethodID
        "TypeID": "",  /// Payment ===> 1 , Excluded ===> 2
        "TypeName": "",/// Payment , Excluded 
        "InsertedBy": ""
    };
    var masterGrid, view;
    
    if (TypeID.toString() === '1') {
        masterGrid = $("#PMgrid").data("kendoGrid");
        view = masterGrid.dataSource.data();
       
        $.map(view, function (item) {
            
            if (item.Connected === 'true' || item.Connected === true ) {  
                try {
                    obj.BranchConnectingID = 0;
                    obj.BranchID = $('#BranchID').val();
                    obj.ConnectingID = item.PaymentMethodID;
                    obj.TypeID = TypeID;
                    obj.TypeName = 'payment'
                    obj.InsertedBy = sessionStorage['UserId'];
                    objList.push(obj);
                    obj = { "BranchConnectingID": "", "BranchID": "", "ConnectingID": "", "TypeID": "", "TypeName": "", "InsertedBy": "" };
                } catch (ex) { this.alert(ex) }
            }
        });
    }
    else if (TypeID.toString() === '2'){
        masterGrid = $("#Egrid").data("kendoGrid");
        view = masterGrid.dataSource.data();
        $.map(view, function (item) {
            if (item.Excluded) {
                
                obj.BranchConnectingID = 0;
                obj.BranchID = $('#BranchID').val();
                obj.ConnectingID = item.ItemID;
                obj.TypeID = TypeID;
                obj.TypeName = 'Excluded'
                obj.InsertedBy = sessionStorage['UserId'];
                objList.push(obj);
                obj = { "BranchConnectingID": "", "BranchID": "", "ConnectingID": "", "TypeID": "", "TypeName": "", "InsertedBy": "" };
            }
        });
    }
    else if (TypeID.toString() === '3') {
       
        masterGrid = $("#PTgrid").data("kendoGrid");
        view = masterGrid.dataSource.data();
        $.map(view, function (item) {
            if (item.Connected) {

                obj.BranchConnectingID = 0;
                obj.BranchID = $('#BranchID').val();
                obj.ConnectingID = item.PriceTemplateID;
                obj.TypeID = TypeID;
                obj.TypeName = 'PriceTemplate'
                obj.InsertedBy = sessionStorage['UserId'];
                objList.push(obj);
                obj = { "BranchConnectingID": "", "BranchID": "", "ConnectingID": "", "TypeID": "", "TypeName": "", "InsertedBy": "" };
            }
        });
    }
  
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Branches + "SaveBranchesConnecting?BranchID=" + $('#BranchID').val()+"&TypeID="+TypeID+"&Lang=" + Lang;
    
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
        data: JSON.stringify( objList),
        success: function (data) {
            if (data.success === true) {
                $("#grid").data("kendoGrid").dataSource.read();

                $('#ResultMessage').addClass('alert-success show');
                $('#ResultTxt').html(data.message);

                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                
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