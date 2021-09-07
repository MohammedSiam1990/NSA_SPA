var initdataSource = [];
var list_ItemUOM = [];
var list_ItemType = [];
var DataSourceItemType;
$(document).ready(function () {
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var BrandID = sessionStorage['BrandsID'];
   

    var URL = $URL_Items + "GetItems?BrandID=" + BrandID + '&Lang=' + $Lang.toLowerCase();

    var rand = Math.floor(Math.random() * 1000);
    $.get(URL, function (data) {
        if (data.success) {
            list_ItemType = data.datalist;
            objPlzSelect = { 'ItemID': '', 'ItemNameAr': DBSTRING['PleaseSelect'], 'ItemName': DBSTRING['PleaseSelect'] };

            list_ItemType = list_ItemType.filter(function (element, index, array) {
                return element.StatusID === 7;
            });

            list_ItemType.unshift(objPlzSelect);
            DataSourceItemType = new kendo.data.DataSource({ data: list_ItemType });
        }
    });

    if ($('#RemarksTemplateID').val() === '') {
        var initdataSource = [];
        BindRDGrid(initdataSource);
    }
    sessionStorage['TypeIDTemp'] = 1;
    FillDBSTRINGPage('CMRemarksTemplate');
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
});

var FillForm = function (data) {
    sessionStorage['TypeIDTemp'] = 1;
    $('#RemarksTemplateID').val(data.RemarksTemplateID);

    $('#remarksTemplateName').val(data.RemarksTemplateName);
    $('#remarksTemplateNameAr').val(data.RemarksTemplateNameAr);
    $('#NumberOfMandatory').val(data.NumberOfMandatory);
    $('#UpperLimitForAdditions').val(data.UpperLimitForAdditions);

    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }

    BindRDGrid(data.RemarksTemplateDetails);
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}
var getDefaultType = function () {
  
    return parseInt(sessionStorage['TypeIDTemp'])
}
var BindRDGrid = function (initdataSource) {

    $dataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                e.success(initdataSource);
            }
        },
        filter: {
            field: "TypeID",
            operator: "eq",
            value: 1
        },
        schema: {
            model: {
                id: "RemarksTemplateDetailsD",
                fields: {
                    RemarksTemplateDetailsD: { editable: false, nullable: false, type: "number" },
                    RemarkName1: { editable: true, type: "string" },
                    RemarkName2: { editable: true, type: "string" },
                    TypeID: { editable: true, type: "number" },//, defaultValue: getDefaultType
                    ItemID: { editable: true, type: "number" },
                    Price: { editable: true, type: "number" },
                    Calories: { editable: true, type: "number" },
                    Quantity: { editable: true, type: "number" },
                    ItemTypeNameAr: { editable: true, type: "string" },
                    ItemTypeName: { editable: true, type: "string" },
                    RemarksTypeNameAr: { editable: true, type: "string" },
                    RemarksTypeName: { editable: true, type: "string" },
                    RemarksTemplateID: { editable: false, type: "number", defaultValue: $('#RemarksTemplateID').val() },
                    Itemuom: { editable: true, type: "number" },
                    ItemUOMName: { editable: true, type: "string" }

                }
            }
        },
        change: function (e) {

            if (e.action === "add") {

                var newItem = e.items[0];
                newItem.TypeID = getDefaultType();
                var filter = this.filter();
                if (filter) {
                    var noValueFilter = { field: "TypeID", operator: "eq", value: newItem.TypeID };
                    this.filter([noValueFilter]);
                }
            }
        }
    });
    var toolBarBtn = [];
    toolBarBtn.push({
        className: 'addNew btn-success', name: "addNew", text: "<span class='fa fa-plus '></span>"
    });

    var RemarkType_list = GetLookup('Lookups');//ItemComponentType
    RemarkType_list = RemarkType_list.filter(function (el) {
        return el.StatusID === $RemarkType
    });

    $.each(RemarkType_list, function () {

        obj = { "name": "", "text": "", "className": "" };
        obj.text = $Lang === 'ar' ? this.NameAr : this.Name;
        if (this.id.toString() === '1') {
            obj.className = "btnActive FilterClass";
        }
        else {
            obj.className = "FilterClass"
        }
        obj.name = this.id.toString();
        toolBarBtn.push(obj)
    });
    var obj = { "text": "" };

    grid = $("#RDgrid").kendoGrid({
        dataSource: $dataSource,
        height: 550,
        groupable: false,
        sortable: true,
        navigatable: true,
        scrollable: true,
        detailInit: detailInit,
        toolbar: toolBarBtn,
        pageable: false,

        editable: {
            "createAt": "bottom"
        },
        dataBound: function (e) {

            $('.addNew').unbind("click");
            $('.addNew').bind("click", function () {
                try {

                    var RDgrid = $("#RDgrid").data("kendoGrid");
                    RDgrid.addRow();
                }
                catch (ex) { alert(ex) }
            });

            $('.FilterClass').unbind("click");
            $('.FilterClass').bind("click", function () {
                sessionStorage['selectedRows'] = '';
                $('.FilterClass').removeClass("btnActive");
                $(this).addClass("btnActive");

                if (sessionStorage['TypeIDTemp'] === undefined || sessionStorage['TypeIDTemp'] === null) {
                    sessionStorage['TypeIDTemp'] = 1;
                }

                var filterValue = sessionStorage['TypeIDTemp'];
                if ($(this).hasClass('k-grid-1') && $(this).hasClass('btnActive')) {
                    filterValue = 1;
                }
                else if ($(this).hasClass('k-grid-2') && $(this).hasClass('btnActive')) {
                    filterValue = 2;
                }
                else if ($(this).hasClass('k-grid-3') && $(this).hasClass('btnActive')) {
                    filterValue = 3;
                }

                sessionStorage['TypeIDTemp'] = filterValue;

                var gridIG = $("#RDgrid").data("kendoGrid");
                var dataSourceIG = gridIG.dataSource;
                if (filterValue === 0) {
                    dataSourceIG.filter({})
                }
                else {

                    dataSourceIG.filter({
                        field: "TypeID",
                        operator: "eq",
                        value: filterValue
                    });
                }
            });
        },

        columns: [{
            field: "RemarkName1",
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
            field: "RemarkName2",
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
            field: "TypeID",
            title: DBSTRING['Types'],
            template: $Lang === 'ar' ? '#:RemarksTypeNameAr#' : '#:RemarksTypeName#',
            editor: EditorRemarkType,
            width: '30%',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            },
            hidden: true
        },


        {
            field: "Calories",
            title: DBSTRING['Calories'],
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
            field: "Price",
            title: DBSTRING['Price'],
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
            command: [


                {
                    name: "Delete",
                    text: "<span class='fa fa-trash'>   </span>",
                    className: "btn-danger ",
                    click: function (e) {
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var grid = $("#RDgrid").data("kendoGrid");
                        grid.removeRow(tr);


                    }

                }
            ],

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

    //var dataSourceIG = grid.dataSource;
    //var filter = {field: "TypeID",operator: "eq",value: 1
    //    }
    //dataSourceIG.filter(filter);

}

var detailInit = function (e) {
    var detailRow = e.detailRow,
        data = this.dataSource.data(),
        codeDetailData = e.data;
    var model = [];
    model.push(e.data);
    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success(codeDetailData.toJSON());
                }
            },
            change: function (e) {
                if (e.field && e.field.indexOf("Quantity") >= 0) {
                    var grid = $("#RDgrid").data("kendoGrid");
                    var dataItem = grid.dataSource.get(e.items[0].RemarksTemplateDetailsD);
                    dataItem.Quantity = e.items[0].Quantity;
                }
            },
            filter: { field: "RemarksTemplateDetailsD", operator: "eq", value: e.data.RemarksTemplateDetailsD },
            schema: {
                model: {
                    id: "RemarksTemplateDetailsD",
                    fields: {
                        RemarksTemplateDetailsD: { editable: false, nullable: false, type: "number" },
                        ItemID: { editable: true, type: "number" },
                        Quantity: { editable: true, type: "number" },
                        ItemTypeNameAr: { editable: true, type: "string" },
                        ItemTypeName: { editable: true, type: "string" },
                        RemarksTemplateID: { editable: false, type: "number", defaultValue: $('#RemarksTemplateID').val() },
                        Itemuom: { editable: true, type: "number" },
                        ItemUOMName: { editable: true, type: "string" }
                    }
                }
            }
        },
        editable: true,
        sortable: false,
        columns: [
            {
                field: "ItemID",
                title: DBSTRING['Items'],
                template: $Lang === 'ar' ? '#:ItemTypeNameAr#' : '#:ItemTypeName#',
                editor: EditorNameItems,
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
                field: "Itemuom",
                title: DBSTRING['UOM'],
                template: "#=Itemuom === '' || Itemuom === null ? DBSTRING['PleaseSelect'] : ItemUOMName#",// Itemuom === '' ? DBSTRING['PleaseSelect'] : ItemUOMName
                editor: EditorItemUOM,
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            },
            {
                field: "Quantity",
                title: DBSTRING['Qty'],
                width: '30%',
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
}

var EditorNameItems = function (container, e) {

    var rand = Math.floor(Math.random() * 1000);
    $("<input required='required' validationMessage='" + DBSTRING['Required'] + "'  id='" + rand + "' data-bind='value :" + e.field + "'/>")//data-bind='value :" + e.field + "'
        .appendTo(container)
        .kendoDropDownList({
            filter: "contains",
            dataTextField: $Lang === 'ar' ? "ItemNameAr" : "ItemName",
            dataValueField: "ItemID",
            dataSource: DataSourceItemType,

            change: function (er) {
                var grid = $("#RDgrid").data("kendoGrid");
                var dataItem = grid.dataSource.get(e.model.RemarksTemplateDetailsD);
                dataItem.Itemuom = null;
                e.model.set('ItemUOMName', DBSTRING['PleaseSelect']);
                dataItem.ItemUOMName = DBSTRING['PleaseSelect'];
                e.model.set('ItemID', $('#' + rand).data('kendoDropDownList').value());
                dataItem.ItemID = $('#' + rand).data('kendoDropDownList').value();
                if ($Lang === 'ar') {
                    e.model.set('ItemTypeNameAr', $('#' + rand).data('kendoDropDownList').text());
                    dataItem.ItemTypeNameAr = $('#' + rand).data('kendoDropDownList').text();
                } else {
                    e.model.ItemTypeName = $('#' + rand).data('kendoDropDownList').text();
                    dataItem.ItemTypeName = $('#' + rand).data('kendoDropDownList').text();
                }
                e.model.set('Itemuom', null)
            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1
        });
}

var EditorItemUOM = function (container, e) {
    var dataUOM = [];

    $.map(list_ItemType, function (dataItem) {
        if (dataItem.ItemID.toString() === e.model.ItemID.toString()) {
            $.map(dataItem.ItemUOM, function (x) {
                if (x.StatusID === 7) {
                    dataUOM.push(x);
                }
            });
        }
    });

    objPlzSelect = { 'ItemUOMID': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
    dataUOM.unshift(objPlzSelect);
    var DSUOM = new kendo.data.DataSource({ data: dataUOM });
    var rand = Math.floor(Math.random() * 1000);

    $("<input id='" + rand + "' />")//data-text-field='Name' data-bind='value :" + e.field + "'
        .appendTo(container)
        .kendoDropDownList({
            filter: "contains",

            dataTextField: "Name",
            dataValueField: "ItemUOMID",
            dataSource: DSUOM,
            change: function (er) {
                var grid = $("#RDgrid").data("kendoGrid");
                var dataItem = grid.dataSource.get(e.model.RemarksTemplateDetailsD);

                e.model.set('Itemuom', $('#' + rand).data('kendoDropDownList').value());
                e.model.set('ItemUOMName', $('#' + rand).data('kendoDropDownList').text());


                dataItem.Itemuom = $('#' + rand).data('kendoDropDownList').value();
                dataItem.ItemUOMName = $('#' + rand).data('kendoDropDownList').text();

            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1,
            value: (e.model.Itemuom)
        });
}

var EditorRemarkType = function (container, e) {

    var list_RemarkType = GetLookup('Lookups');
    list_RemarkType = list_RemarkType.filter(function (el) {
        return el.StatusID === $RemarkType;
    })


    var objPlzSelect = { 'id': '', 'NameAr': DBSTRING['PleaseSelect'], 'Name': DBSTRING['PleaseSelect'] };
    list_RemarkType.unshift(objPlzSelect);
    var DataSourceRemarkType = new kendo.data.DataSource({ data: list_RemarkType });
    var rand = Math.floor(Math.random() * 1000);
    $("<input required='required' validationMessage='" + DBSTRING['Required'] + "' id='" + rand + "'  data-bind='value :" + e.field + "'/>")
        .appendTo(container)
        .kendoDropDownList({
            filter: "contains",
            dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
            dataValueField: "id",
            dataSource: DataSourceRemarkType,
            change: function (er) {
                if ($Lang === 'ar') {
                    e.model.RemarksTypeNameAr = $('#' + rand).data('kendoDropDownList').text();
                } else {
                    e.model.RemarksTypeName = $('#' + rand).data('kendoDropDownList').text();
                }
            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1
        });
}


var SaveUpdate = function (IsComeFromDestroy) {

    $('#ResultMessage').removeClass('alert-danger');
    $('#ResultMessage').removeClass('alert-success');
    $('.warning').removeClass('warning');
    if (!ValidateForm('CMRemarksTemplate'))
        return false;

    var obj = {
        "RemarksTemplateID": "", "RemarksTemplateName": "", "RemarksTemplateNameAr": "",
        "StatusID": "", "BrandID": "", "NumberOfMandatory": "", "UpperLimitForAdditions": "",
        "ModifiedBy": "", "ModifyDate": "", "CreateDate": "", "InsertedBy": "", "DeletedBy": "", "DeletedDate": ""
        , "RemarksTemplateDetails": []
    };


    var objremarksTemplateDetails = {
        "RemarksTemplateDetailsD": "",
        "RemarksTemplateID": "",
        "RemarkName1": "",
        "RemarkName2": "",
        "TypeID": "",
        "ItemID": "",
        "Price": "",
        "Calories": "",
        "Quantity": "",
        "Itemuom": ""
    };




    obj.RemarksTemplateID = $('#RemarksTemplateID').val() === '' ? 0 : $('#RemarksTemplateID').val();
    obj.RemarksTemplateName = $('#remarksTemplateName').val();
    obj.RemarksTemplateNameAr = $('#remarksTemplateNameAr').val();
    obj.NumberOfMandatory = $('#NumberOfMandatory').val();
    obj.UpperLimitForAdditions = $('#UpperLimitForAdditions').val();
    obj.BrandID = sessionStorage['BrandsID'];
    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }
    obj.insertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];
    obj.DeletedBy = sessionStorage['UserId'];


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;



    obj.ModifyDate = today;
    obj.CreateDate = today;

    try {


        var listMastergrid = $('#RDgrid').data('kendoGrid').dataSource.data();//$('#RDgrid').data('kendoGrid').dataItems();

        var view = $('#RDgrid').data('kendoGrid').dataSource.view();
        
        var masterGrid = $("#RDgrid").data("kendoGrid");
        var detailRows = masterGrid.element.find(".k-detail-row");
        var name1_edit = '';
        var name2_edit = '';
        var IDRD = '';
        var validName1 = true, validName2 = true, validItem_UOM = true;
        listMastergrid.forEach(function (item) {
            if (item.RemarkName1 !== '' && item.RemarkName2 !== '') {
                objremarksTemplateDetails = {
                    "RemarksTemplateDetailsD": "",
                    "RemarkName1": "",
                    "RemarkName2": "",
                    "TypeID": "",
                    "ItemID": "",
                    "Price": "",
                    "Calories": "",
                    "Quantity": "",
                    "Itemuom": ""
                };
                objremarksTemplateDetails.RemarksTemplateDetailsD = 0;
                //objremarksTemplateDetails.RemarksTemplateID = obj.RemarksTemplateID;
                objremarksTemplateDetails.RemarkName1 = item.RemarkName1;
                objremarksTemplateDetails.RemarkName2 = item.RemarkName2;
                objremarksTemplateDetails.ItemID = item.ItemID;
                objremarksTemplateDetails.TypeID = item.TypeID;
                objremarksTemplateDetails.Price = item.Price;
                objremarksTemplateDetails.Calories = item.Calories;

                objremarksTemplateDetails.Quantity = item.Quantity;
                objremarksTemplateDetails.Itemuom = item.Itemuom;


                name1_edit = item.RemarkName1;
                name2_edit = item.RemarkName2;
                IDRD = item.RemarksTemplateDetailsD;
                $.map(listMastergrid, function (x) {

                    if ((name1_edit === x.RemarkName1) && IDRD !== x.RemarksTemplateDetailsD) {
                        firstCell = masterGrid.tbody.find("[data-uid='" + x.uid + "']");
                        validName1 = false;
                        cell = firstCell.children().eq(1);
                        cell.addClass('warning');
                    }
                    else if (x.RemarkName1 === '') {

                        firstCell = masterGrid.tbody.find("[data-uid='" + x.uid + "']");
                        validName1 = false;

                        cell = firstCell.children().eq(1);
                        cell.addClass('warning');
                    }

                    if ((name2_edit === x.RemarkName2) && IDRD !== x.RemarksTemplateDetailsD) {

                        firstCell = masterGrid.tbody.find("[data-uid='" + x.uid + "']");
                        validName2 = false;
                        cell = firstCell.children().eq(2);
                        cell.addClass('warning');
                    }
                    else if (x.RemarkName1 === '') {

                        firstCell = masterGrid.tbody.find("[data-uid='" + x.uid + "']");
                        validName2 = false;
                        cell = firstCell.children().eq(2);
                        cell.addClass('warning');
                    }

                    if (x.ItemID !== '' && x.ItemID !== null && IDRD === x.RemarksTemplateDetailsD) {
                        if (x.Itemuom === '' || x.Itemuom === null) {
                            validItem_UOM = false;
                            firstCell = masterGrid.tbody.find("[data-uid='" + x.uid + "']");
                            cell = firstCell.children().eq(2);
                            cell.addClass('warning');

                            var row = $('#' + masterGrid.element.attr('id') + ' tr[data-uid="' + item.uid + '"]')
                            masterGrid.expandRow(row);

                            var detailRow = row.next(".k-detail-row");
                            //+		1	tr.k-detail-row {rowIndex: 1, sectionRowIndex: 1, cells: HTMLCollection(2), …}	Object


                            var firstCell = detailRow.find("td:eq(1)");
                            firstCell.addClass('warning');
                        }
                    }
                });

                obj.RemarksTemplateDetails.push(objremarksTemplateDetails);
            }
        });
    
        if ((!validName1 || !validName2) && validItem_UOM) {
            $('#ResultMessage').addClass('alert-danger show');
            $('#ResultMessage').removeClass('hide');
            $('#ResultTxt').html(DBSTRING['NameDuplicateOrEmpty']);
            setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            return false;
        }
        else if ((!validName1 || !validName2) && !validItem_UOM) {
            $('#ResultMessage').addClass('alert-danger show');
            $('#ResultMessage').removeClass('hide');
            $('#ResultTxt').html(DBSTRING['NameDuplicateOrEmpty'] + '  <br /> ' + DBSTRING['ItemselectUOM']);
            setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            return false;
        }
        else if (!validItem_UOM) {

            $('#ResultMessage').addClass('alert-danger show');
            $('#ResultMessage').removeClass('hide');
            $('#ResultTxt').html(DBSTRING['ItemselectUOM']);
            setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            return false;
        }

        var Lang = sessionStorage['lang'];
        var token = sessionStorage['token'];
        var URL = $URL_RemarksTemplate + "SaveRemarksTemplates?Lang=" + Lang + '&rand=' + Math.random();

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
            data: JSON.stringify(obj),
            success: function (data) {
                if (data.success === true) {
                    try {
                        
                        $("#grid").data("kendoGrid").dataSource.read();

                        $('.warning').removeClass('warning');
                    }
                    catch (ex) { alert(ex);}
                    if (IsComeFromDestroy) {
                        $dataForm = '';
                        $('#ChildContent').hide();
                        $('#MainContent').show();
                    }
                    else {
                        $('#ResultMessage').addClass('alert-success show');
                        $('#ResultTxt').html(data.message);

                        setTimeout("$('#ResultMessage').removeClass('show')", 2000);

                        if ($('#RemarksTemplateID').val() === '') {
                            $(':input', '#CMRemarksTemplate')
                                .not(':button, :submit, :reset, :hidden')
                                .val('')
                                .prop('checked', false)
                                .prop('selected', false)
                          
                            $('#NumberOfMandatory').val(1);
                            $('#UpperLimitForAdditions').val(0);

                            grid = $("#RDgrid").data("kendoGrid");                            
                            grid.dataSource.data([]);
                            grid.refresh();

                            $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                        }
                        else {
                            $('#ResultMessage').addClass('alert-success show');
                            $('#ResultTxt').html(data.message);

                            setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                            var grid = $("#grid").getKendoGrid()
                            var dataItem = grid.dataItem(grid.select());
                            
                            gridRT = $("#RDgrid").data("kendoGrid");
                            gridRT.dataSource.data(data.RemarksTemplateDetails);
                            gridRT.refresh();
                            $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();

                        }
                        $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                    }

                }
                else {

                    if (data.repeated !== null && data.repeated !== undefined) {
                       
                        markInvalid($('#' + data.repeated), data.message);
                    }
                    else {

                        $('#ResultMessage').addClass('alert-danger show');
                        $('#ResultMessage').removeClass('hide');
                        $('#ResultTxt').html(data.message);
                        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
                    }
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
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(msg);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            }
        });


    } catch (e) {

    }

}