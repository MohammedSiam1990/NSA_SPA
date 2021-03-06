var list_Item = [];
var list_Group = [];
var DataSourceItem, DataSourceGroup;

$(document).ready(function () {
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var BrandID = sessionStorage['BrandsID'];


    var URL = $URL_Items + "GetActiveItems?BrandID=" + BrandID + '&Lang=' + $Lang.toLowerCase();

    var rand = Math.floor(Math.random() * 1000);
    $.get(URL, function (data) {
        if (data.success) {
            list_Item = data.datalist;
            //objPlzSelect = { 'ItemID': '', 'ItemNameAr': DBSTRING['PleaseSelect'], 'ItemName': DBSTRING['PleaseSelect'] };
            
            list_Item = list_Item.filter(function (element, index, array) { 
                return element.StatusID === 7 && element.ItemTypeID === 3;
            });
           
            //list_Item.unshift(objPlzSelect);
            DataSourceItem= new kendo.data.DataSource({ data: list_Item });
        }
    });
    
    var URLGroup = $URL_ItemGroups + "GetItemGroups";
   
    $.ajax({
        type: 'Get',
        url: URLGroup,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { BrandID: BrandID, Lang: $Lang },
        success: function (data, status, xhr) {
            list_Group = data.datalist.ItemGroups;
            list_Group = list_Group.filter(function (element, index, array) {
                return element.StatusID === 7 && element.TypeID === 3;
            });
        }
    });
    if ($('#PriceTemplateID').val() === '') {
        BindPTGrid([]);
        $("#FromDate").kendoDatePicker({
            min: new Date(),
            change: function () {
                var datepicker = $("#ToDate").data("kendoDatePicker");
                datepicker.min(new Date(this.value()));
                if (new Date(this.value()) > new Date(datepicker.value())) {
                    datepicker.value(this.value())
                }
            }
        });
        $("#ToDate").kendoDatePicker({ min: new Date() });
        $('#TypeID').val(sessionStorage['TypeID']);

        //var datepicker = $("#datepicker").data("kendoDatePicker");

        //datepicker.min(new Date(2000, 0, 1));
    }
    //DISABLE inputs
    $("#FromDate").attr("readonly", true);
    $("#ToDate").attr("readonly", true);
    FillDBSTRINGPage('CMPriceTemplate');
    // create DatePicker from input HTML element
   
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
});

var FillForm = function (data) {
    
    $('#PriceTemplateID').val(data.PriceTemplateID);
    $('#TypeID').val(sessionStorage['TypeID']);
    $('#Name').val(data.Name);
    $('#NameAr').val(data.NameAr);

    $("#FromDate").kendoDatePicker({ value: data.Fromdate});
    $("#ToDate").kendoDatePicker({ value: data.ToDate  });
    //$('#TaxVal').val(data.TaxVal);

    var FD = $("#FromDate").data("kendoDatePicker");
    var TD = $("#ToDate").data("kendoDatePicker");

    FD.enable(false);
    TD.enable(false);


    if (data.InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }
 
    if (data.DateEffect ) {
        $('#DateEffect').prop("checked", true);
    }
    else {
        $('#DateEffect').prop("checked", false);
    }

    var PriceTemplateDetails = data.PriceTemplateDetails
    BindPTGrid(PriceTemplateDetails);


    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var BindPTGrid = function (data) {
    var TypeID = $('#TypeID').val();
    try { 
    var PTdataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
               
                e.success(data);
            }
        },
        batch: false,
        schema: {
            model: {
                id: "PriceTemplateDetailsID",
                fields: {
                    PriceTemplateDetailsID: { editable: true, nullable: false },
                    ItemID: {  nullable: true },
                    ItemUOMID: {  nullable: true ,defaultValue:null},
                    GroupID: {  nullable: true },
                    ItemName: { editable: true, type: "string" },
                    ItemNameAr: { editable: true, type: "string" },
                    Name: { editable: true, type: "string" },
                    NameAr: { editable: true, type: "string" },
                    GroupName: { editable: true, type: "string" },
                    GroupNameAr: { editable: true, type: "string" },
                    Price: { editable: true, type: "number", defaultValue: 0, validation: { min: 0 }},
                    value: { editable: true, type: "number", validation: { min: 0 }, defaultValue: 0 }
                    
                }
            }
        }
    });
        var rowIndex = null;
        var cellIndex = null;
    gridIn = $("#PTGrid").kendoGrid({
        dataSource: PTdataSource,
        height: 550,
        groupable: false,
        navigatable: true,
        sortable: true,
        selectable: true,
        //toolbar: [
        //    { className: 'addNewPT', name: "addNewPT", text: "<span class='fa fa-plus'></span>" }
        //],
        pageable: false,
        editable: {
            "createAt": "bottom"
        },
        dataBinding: function (e) {
            var current = e.sender.current() || [];
            if (current[0]) {
                cellIndex = current.index();
                rowIndex = current.parent().index();
            }
        },
        dataBound: function (e) {
            if (!isNaN(cellIndex)) {
                cell = e.sender.current(e.sender.tbody.children().eq(rowIndex).children().eq(cellIndex));
                rowIndex = cellIndex = null;

                e.sender.editCell(cell);
                saveButtonClicked = false;
            }

            $('.addNewPT').unbind("click");
            $('.addNewPT').bind("click", function () {
                try { 
                var PTgrid = $("#PTGrid").data("kendoGrid");
                    PTgrid.addRow();
                }
                catch (ex) { alert(ex) }
            });
        },
        columns: [{
            field: "ItemID",
            title: DBSTRING['Items'],
            template: $Lang === 'ar' ? "#:ItemNameAr===null?'':ItemNameAr#" : "#:ItemName===null?'':ItemName#",
            editor: EditorItemName,
           
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "ItemUOMID",
            title: DBSTRING['UOM'],
            template: $Lang === 'ar' ? "#:NameAr===null?'':NameAr#" : "#:Name===null?'':Name#",//"#= (ItemUOMID=== null || ItemUOMID === null) ? '' : $Lang === 'ar' ? NameAr : Name #",//
            editor: EditorItemUOM,

            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
            }, {
                field: "GroupID",
                title: DBSTRING['Group'],
                template: ($Lang === 'ar' ? "#:GroupNameAr===null?'':GroupNameAr#" : "#:GroupName===null?'':GroupName#"),//"#= (GroupID === null || GroupID === null) ? ' ' : $Lang === 'ar' ? GroupNameAr : GroupName #",//
                editor: EditorGroup,
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                },
                hidden: sessionStorage['TypeID'] === '1'
            },
        {
            field: "Price",
            title: DBSTRING['CurrentPrice'],
            editable: function (e) {
                return false
            },
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
         
            },
            {
                field: "value",
                title: sessionStorage['TypeID'] === '1' ? DBSTRING['NewPrice'] : DBSTRING['Discount'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                },
                editor: function (container, options) {
                    //var tr = $(e.target).closest("tr"); //get the row for deletion
                    //var data = this.dataItem(tr);
                  
                    // create an input element
                    var input = $("<input name='" + options.field + "'/>");
                    // append it to the container
                    input.appendTo(container);
                    if (sessionStorage['TypeID'] === '1') {
                        input.kendoNumericTextBox({
                            max: options.model.Price,
                            min: 0
                        });
                    }
                    else {
                        input.kendoNumericTextBox({

                            min: 0,
                            max: 99
                        });
                    }
                   
                }

            }
            ,
        {
            command: [
                {
                    name: "Delete",
                    text: "<span class='fa fa-trash'>   </span>",
                    className: "btn-danger ",
                    click: function (e) {
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var data = this.dataItem(tr); //get the row data so it can be referred later
                        var grid = $("#PTGrid").data("kendoGrid");
                        grid.removeRow(tr);

                    }
                }
            ],
            title: "<span class='fa btn btn-success  k-icon k-i-plus addNewPT' title='" + DBSTRING['New'] + "' style=' width: 25px;height: 25px;'> </span>",
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
    } catch (ex) { alert(ex) }


}

var EditorItemName = function (container, e) {

    var rand = Math.floor(Math.random() * 1000);

    $("<input  id='" + rand + "'  />")//required='required' 
        .appendTo(container)
        .kendoComboBox({
            filter: "contains",
            dataTextField: $Lang === 'ar' ? "ItemNameAr" : "ItemName",
            dataValueField: "ItemID",
            dataSource: DataSourceItem,
            change: function (er) {
                
              //  alert(JSON.stringify(e.model))
                var model = e.model;
                model.set('ItemName', $('#' + rand).data('kendoComboBox').text())
                model.set('ItemNameAr', $('#' + rand).data('kendoComboBox').text())
                model.set('ItemID', $('#' + rand).data('kendoComboBox').value());
                model.set('GroupID', ''); 
                
                var DI = this.dataItem()!==undefined? this.dataItem().ItemUOM:[];
                if (DI.length === 1) {
                    var DataItemTbl = $('#PTGrid').data('kendoGrid').dataItems();
                    var ItemUOMs = [];
                    ItemUOMs = _.pluck(DataItemTbl, 'ItemUOMID');
                   
                    var searchFound = _.contains(ItemUOMs, DI[0].ItemUOMID) || _.contains(ItemUOMs, DI[0].ItemUOMID.toString())
                    if (!searchFound) {
                        model.ItemUOMID = DI[0].ItemUOMID.toString();
                        model.set('Name', DI[0].Name);
                        model.set('NameAr', DI[0].NameAr);
                        model.set('Price', DI[0].Price);

                  
                       // item.ItemUOMID === null ? '' : item.ItemUOMID.ItemUOMID === undefined ? item.ItemUOMID : item.ItemUOMID.ItemUOMID;
                    }
                    else {
                        model.set('ItemUOMID', '');
                        model.set('Name', '');
                        model.set('NameAr', '');
                        model.set('Price', 0);
                        
                    }
                }
                else {
                    model.set('ItemUOMID', '');
                    model.set('Name', '');
                    model.set('NameAr', '');
                    model.set('Price', 0);
                   
                }
                model.set('GroupName', '')
                model.set('GroupNameAr', '')
                model.set('GroupID', null)
                model.set('value', 0);
                var grid = $("#PTGrid").data("kendoGrid");
                grid.refresh();

            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1,
            value: (e.model.ItemID)
        });
}


var EditorGroup = function (container, e) {
    var dataGroup = [];
    var DataItemTbl = $('#PTGrid').data('kendoGrid').dataItems();
    var ItemGroups = [];
    ItemGroups = _.pluck(DataItemTbl, 'GroupID');
    $.map(list_Group, function (dataItem) {
        try {
            var searchFound = _.contains(ItemGroups, dataItem.ItemGroupID) || _.contains(ItemGroups, dataItem.ItemGroupID.toString());
            
            var objGroup = {
                'ItemGroupID': "", "ItemGroupName": "", "ItemGroupNameAr": "", "isDeleted": ""
            };

            objGroup.ItemGroupID = dataItem.ItemGroupID;
            objGroup.ItemGroupName = dataItem.ItemGroupName;
            objGroup.ItemGroupNameAr = dataItem.ItemGroupNameAr;
            objGroup.isDeleted = searchFound ? true : false;
            dataGroup.push(objGroup);
                    } catch (ex) { this.alert(ex) }
    });

    objPlzSelect = { 'ItemGroupID': '', 'ItemGroupName': DBSTRING['PleaseSelect'], 'ItemGroupNameAr': DBSTRING['PleaseSelect'], "isDeleted": "" };
    dataGroup.unshift(objPlzSelect);

    DataSourceGroup = new kendo.data.DataSource({ data: dataGroup });
    var rand = Math.floor(Math.random() * 1000);

    $("<input  id='" + rand + "'  data-bind='value :" + e.field + "' />")
        .appendTo(container)
        .kendoComboBox({
            filter: "contains",
            dataTextField: $Lang === 'ar' ? "ItemGroupNameAr" : "ItemGroupName",
            dataValueField: "ItemGroupID",
            dataSource: DataSourceGroup,
            change: function (er) {
                
                var model = e.model;
                model.set('GroupName', $('#' + rand).data('kendoComboBox').text())
                model.set('GroupNameAr', $('#' + rand).data('kendoComboBox').text())
                model.set('GroupID', $('#' + rand).data('kendoComboBox').value())
              
              
                model.set('ItemName', '')
                model.set('ItemNameAr', '')
                model.set('ItemID', '');
                
                model.set('Price', 0);
                model.set('value', 0);
                model.set('ItemUOMID', null);
                model.set('Name', '');
                model.set('NameAr', '');

            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1,
            template: kendo.template($("#templateGroup").html())
        });
}

var EditorItemUOM = function (container, e) {
    var dataUOM = [];

    var DataItemTbl = $('#PTGrid').data('kendoGrid').dataItems();
    var ItemUOMs = [];
    ItemUOMs = _.pluck(DataItemTbl, 'ItemUOMID');
 
    $.map(list_Item, function (dataItem) {
        if (dataItem.ItemID.toString() === e.model.ItemID.toString()) {
            $.map(dataItem.ItemUOM, function (x) {
           
                var searchFound = _.contains(ItemUOMs, x.ItemUOMID) || _.contains(ItemUOMs, x.ItemUOMID.toString())

                    var objUOM = {
                        'ItemUOMID': "", "Name": "", "NameAr": "", "isDeleted": "","Price":""
                    };

                    objUOM.ItemUOMID = x.ItemUOMID;
                    objUOM.Name = x.Name;
                    objUOM.NameAr = x.NameAr;
                objUOM.isDeleted = searchFound ? true : false;
                objUOM.Price = x.Price,
                    dataUOM.push(objUOM);
                
            });
        }
    });

    objPlzSelect = { 'ItemUOMID': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'], "isDeleted": "","Price":"0" };
    dataUOM.unshift(objPlzSelect);
    var DSUOM = new kendo.data.DataSource({ data: dataUOM });
    var rand = Math.floor(Math.random() * 1000);
    var NameTmp = $Lang === 'ar' ? $("#templateAr").html() : $("#template").html();
    
        $("<input id='" + rand + "'  data-bind='value :" + e.field + "' />")
            .appendTo(container)
            .kendoComboBox({
                filter: "contains",
                dataTextField: $Lang === 'ar' ? "NameAr" : "Name" ,
                dataValueField: "ItemUOMID",
                dataSource: DSUOM,
                change: function (er) {
                    var combobox = $('#' + rand).data("kendoComboBox");
                    // get the dataItem corresponding to the selectedIndex.
                    var dataItem = combobox.dataItem();
                  
                    //  e.model.Name = combobox.text();
                    e.model.set('Name', dataItem.Name);
                    e.model.set('NameAr', dataItem.NameAr);
                    e.model.set('Price', dataItem.Price)
                    e.model.set('value', 0);

                    e.model.set('GroupName', '')
                    e.model.set('GroupNameAr', '')
                    e.model.set('GroupID', null)
                },
                select: function (e) {
                    if (e.dataItem.isDeleted) {
                        //  alert('sdss')
                        e.preventDefault();
                    }
                },
                messages: {
                    noData: DBSTRING["NoMatchingData"]
                },
                minLength: 1
                ,
                template: kendo.template(NameTmp)
            });
  
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    $('.warning').removeClass('warning');
    if (!ValidateForm('CMPriceTemplate'))
        return false;

    var obj = {
        "PriceTemplateID": "", "TypeID": "", "TypeName": "", "Name": "", "NameAr": "", "DateEffect": "",
        "FromDate": "", "ToDate": "", "InActive": "",
        "BrandID": "", "InsertedBy": "", "ModifiedBy": "", "PriceTemplateDetails": []
    };

    var objDet = { "PriceTemplateDetailsID": "", "PriceTemplateID": "", "ItemID": "", "ItemUOMID": "", "SalesGroupID": "", "value": "" };

    obj.PriceTemplateID = $('#PriceTemplateID').val() === '' ? 0 : $('#PriceTemplateID').val();
    obj.TypeID = $('#TypeID').val();
    obj.TypeName = sessionStorage['TypeID'] === '1' ? 'Price' : 'Discount';
    obj.Name = $('#Name').val();
    obj.NameAr = $('#NameAr').val();
    obj.FromDate = $('#FromDate').val();
    obj.ToDate = $('#ToDate').val();
    obj.DateEffect = $('#DateEffect').is(':checked');
    obj.BrandID = sessionStorage['BrandsID'];
    obj.InActive = $('#InActive').is(':checked');

    obj.InsertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];

    var masterGrid = $("#PTGrid").data("kendoGrid");
    var listgrid = masterGrid.dataSource.data();
    var validItem_Group=true, validUOM = true, validPrice = true;

    listgrid.forEach(function (item) {
       
        if (item.ItemID !== '' && item.ItemID !== null) {
            if (item.ItemUOMID === '' || item.ItemUOMID === null) {

                validUOM = false
                firstCell = masterGrid.tbody.find("[data-uid='" + item.uid + "']");
                cell = firstCell.children().eq(1);
                cell.addClass('warning');


            }
            objDet = { "PriceTemplateDetailsID": "", "PriceTemplateID": "", "ItemID": "", "ItemUOMID": "", "SalesGroupID": "", "value": "" };
            objDet.PriceTemplateDetailsID = 0;
            objDet.PriceTemplateID = obj.PriceTemplateID;
            objDet.ItemID = item.ItemID;
            objDet.ItemUOMID = item.ItemUOMID === null ? '' : item.ItemUOMID.ItemUOMID === undefined ? item.ItemUOMID : item.ItemUOMID.ItemUOMID;//item.ItemUOMID;
            //objDet.SalesGroupID = item.GroupID;
            objDet.value = item.value;

            if (parseFloat(item.value) <= 0) {
                validPrice = false;
                firstCell = masterGrid.tbody.find("[data-uid='" + item.uid + "']");
                cell = firstCell.children().eq(4);
                cell.addClass('warning');
            }

            obj.PriceTemplateDetails.push(objDet);
        }
        else if (item.GroupID !== '' && item.GroupID !== null) {
            objDet = { "PriceTemplateDetailsID": "", "PriceTemplateID": "", "ItemID": "", "ItemUOMID": "", "SalesGroupID": "", "value": "" };
            objDet.PriceTemplateDetailsID = 0;
            objDet.PriceTemplateID = obj.PriceTemplateID;
            //objDet.ItemID = item.ItemID;
            //objDet.ItemUOMID = item.ItemUOMID;
            objDet.SalesGroupID = item.GroupID;
            objDet.value = item.value;
            if (parseFloat(item.value) <= 0) {
                validPrice = false;
                firstCell = masterGrid.tbody.find("[data-uid='" + item.uid + "']");
                cell = firstCell.children().eq(4);
                cell.addClass('warning');
            }
            obj.PriceTemplateDetails.push(objDet);
        }

        if ((item.GroupID === '' || item.GroupID === null) && (item.ItemID === '' || item.ItemID === null)) {
        
            validItem_Group = false;
            firstCell = masterGrid.tbody.find("[data-uid='" + item.uid + "']");
            cell = firstCell.children().eq(0);
            firstCell.addClass('warning');
        }
    });

    if (!validItem_Group) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['AddItem']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
    }
    else if (!validUOM && validPrice) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['ItemselectUOM']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
    }
    
    else if (!validPrice && !validUOM) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['ItemselectUOM'] + '<br />' + DBSTRING['ValueGreterZero']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
    }
    else if (!validPrice && validUOM) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['ValueGreterZero']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
    }
    else {
        var Lang = sessionStorage['lang'];
        var token = sessionStorage['token'];
        var URL = $URL_PriceTemplate + "SavePriceTemplate?Lang=" + Lang;

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
                    }
                    catch (ex) { }
                    if (IsComeFromDestroy) {
                        $dataForm = '';
                        $('#ChildContent').hide();
                        $('#MainContent').show();
                    }
                    else {
                        $('#ResultMessage').addClass('alert-success show');
                        $('#ResultTxt').html(data.message);

                        setTimeout("$('#ResultMessage').removeClass('show')", 2000);

                        if ($('#PriceTemplateID').val() === '') {
                            $(':input', '#CMPriceTemplate')
                                .not(':button, :submit, :reset, :hidden')
                                .val('')
                                .prop('checked', false)
                                .prop('selected', false);
                            grid = $("#PTGrid").data("kendoGrid");
                            grid.dataSource.data([]);
                            grid.refresh();
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
    }
}