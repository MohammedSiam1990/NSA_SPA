
$(document).ready(function () {
    var Lang = sessionStorage['lang'];
  
    FillDBSTRINGPage('CMItemComponents');
    
});

var ChangeMainUOM = function () {
    
    var gridIG = $("#CompGrid").data("kendoGrid");
    var dataSourceIG = gridIG.dataSource;
   
   
        dataSourceIG.filter([
            {
                field: "MainItemUOMID",
                operator: "eq",
                value: $('#UOM').val()
            }]);
   
}

var FillForm = function (data) {
   
    $('#ItemID').val(data.ItemID);
    $('#ItemNum').val(data.ItemNum).attr('disabled','true');
    $('#ItemName').val(data.ItemName).attr('disabled', 'true');
    $('#ItemNameAr').val(data.ItemNameAr).attr('disabled', 'true');
    
    $('#CMItemComponents .required-label').removeClass('required-label');

    var model = data.ItemComponents;

    $.map(model, function (x) {
        x.Total = x.Qty * x.Cost;
    });
   
    var list_UOM = [];
    if (sessionStorage['TypeID'].toString() === '1') { // sellComp
        $.map(data.ItemUOM, function (e) {
            
            if (e.Sell) {
                var obj = { 'id': '', 'NameAr': '', 'Name': '' }
                obj.id = e.ItemUOMID;
                obj.NameAr = e.NameAr;
                obj.Name = e.Name;
                list_UOM.push(obj);
            }
        });
    }
    else { // ManComp
        $.map(data.ItemUOM, function (e) {
          
            var obj = { 'id': '', 'NameAr': '', 'Name': '' }
            obj.id = e.ItemUOMID;
            obj.NameAr = e.NameAr;
            obj.Name = e.Name;
            list_UOM.push(obj);
        });
    }
    
    fillDropdown('UOM', list_UOM, '', true);
    
    var CompdataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                
                e.success(model);
            }
        },
        batch: false,
        filter: { field: "MainItemUOMID", operator: "eq", value: $('#UOM').val() },
        schema: {
            model: {
                id: "CompItemID",
                fields: {
                    CompItemID: { editable: true, nullable: false },
                    MainItemUOMID: { type: "number" },
                    CompItemUOMID: { editable: true, nullable: false },
                    ItemName: { editable: true, type: "string" },
                    ItemNameAr: { editable: true, type: "string" },
                    Name: { editable: true, type: "string" },
                    NameAr: { editable: true, type: "string" },
                    Qty: { editable: true, type: "number", validation: { min: 0 }, defaultValue: 0 },
                    TypeID: { editable: false },
                    IsMain: { editable: true, type: "boolean" },
                    IsBase: { editable: true, type: "boolean" },
                    Cost: { editable: false, type: "number" },
                    Total: { editable: true, type: "number" }
                }
                //,
                //Total: function () {
                //    return (this.get("Qty") * this.get("Cost"));
                //}
            }

        },
        aggregate: [
            { field: "CompItemID", aggregate: "count" },
            { field: "Qty", aggregate: "sum" },
            { field: "Cost", aggregate: "sum" }
            ,
            { field: "Total", aggregate: "sum" }
        ]
        //{ field: "Total", aggregate: "average" },
        ,
        change: function (e) {

            if (e.action === "add") {
                var newItem = e.items[0];
                newItem.MainItemUOMID = $('#UOM').val();
                
                var filter = this.filter();
                if (filter) {
                    var noValueFilter = { field: "MainItemUOMID", operator: "eq", value: $('#UOM').val() };
                    this.filter([noValueFilter]);
                }
                
            }
            //else if (e.action === "itemchange" && e.field === "CompItemID") {
            //    var model = e.items[0]
            //    //$("#CompGrid").find("tr[data-uid='" + model.uid + "'] td:eq(1)").text('');
            //}
            else if (e.action === "itemchange" && e.field === "Qty") {
                var grid = $("#CompGrid").getKendoGrid()
                var dataItem = grid.dataItem(grid.select());
                dataItem.set('Total', dataItem.Cost * dataItem.Qty);
                grid.refresh();
            }
        }
    });
    var rowIndex = null;
    var cellIndex = null;
    var saveButtonClicked = false;
    grid = $("#CompGrid").kendoGrid({
        dataSource: CompdataSource,
        height: 550,
        groupable: false,
        navigatable: true,
        sortable: true,
        selectable: true,
        toolbar: [
            { className: 'addNewComp', name: "addNewComp", text: "<span class='fa fa-plus'></span>" }
        ],
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
                cell= e.sender.current(e.sender.tbody.children().eq(rowIndex).children().eq(cellIndex));
                rowIndex = cellIndex = null;

                e.sender.editCell(cell);
                saveButtonClicked = false;
            }

            $('.addNewComp').unbind("click");
            $('.addNewComp').bind("click", function () {
                var Compgrid = $("#CompGrid").data("kendoGrid");
                
                if ($('#UOM').val() !== '') {
                    try {
                        Compgrid.addRow();
                    }
                    catch (ss) {alert(ss)}
                }
                else {
                    markInvalid($('#UOM'), DBSTRING['Please_SelectUOM'])
                    $('#ResultMessage').addClass('alert-danger show');
                    $('#ResultMessage').removeClass('hide');
                    $('#ResultTxt').html(DBSTRING['Please_SelectUOM']);
                    setTimeout("$('#ResultMessage').removeClass('show')", 5000);
                    
                }
            });
        },
        columns: [{
            field: "CompItemID",
            title: DBSTRING['Name'],
            template: $Lang === 'ar' ? "#:ItemNameAr#" : "#:ItemName#",
            editor: EditorItemName,
            footerTemplate: DBSTRING["NumItems"] + ": " +"#:count#",
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
                field: "CompItemUOMID",
                title: DBSTRING['UOM'],
                template: $Lang === 'ar' ? "#:NameAr===null?'':NameAr#" : "#:Name===null?'':Name#",
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
                field: "Qty",
                title: DBSTRING['Qty'],
               
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
                //,
                //footerAttributes: {
                //    "class": "Center"
                //}
            },
            {
                field: "IsMain",
                title: DBSTRING['Main'],
                
                template: '<input type="checkbox" #= IsMain ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                },
                hidden: sessionStorage['TypeID'].toString() !== '1'
            },{
            field: "IsBase",
            title: DBSTRING['Base'],
            
            template: '<input type="checkbox" #= IsBase ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
            }
            , {
                field: "Cost",
                title: DBSTRING['Cost'],
                //footerTemplate: DBSTRING["NumItems"] + ": " +"#:sum#",
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            },
            {
                field: "Total",
                title: DBSTRING['Total'],
                //template: "<span class='totalSpan'>#= Cost * Qty #</span>",
                editable: function () { return false },
                footerTemplate: DBSTRING["Average"] + ": " +"#:sum#",
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
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
                            var grid = $("#CompGrid").data("kendoGrid");
                            grid.removeRow(tr);
                           
                        }
                    }
                ],
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
    $("#CompGrid .k-grid-content").on("click", "input.chkbx", function (e) {

        var grid = $("#CompGrid").data("kendoGrid");
        var checked = $(this).is(':checked');
        var col = $(this).closest('td');

        dataItem = grid.dataItem($(e.target).closest("tr"));
        dataItem.set(grid.columns[col.index() ].field, checked);
       
    });
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var getDfaultUOM = function () {
    return $('#UOM').val();
}
var EditorItemName = function (container, e) {
   
    var grid = $("#grid").getKendoGrid()
    var dataSource = grid.dataSource;
    var datas = [];
    try {
        datas = dataSource.data().filter(function (element, index, array) {
            
            var IsComponent = false;
            var IsStore = false, IsMain = false;
            if (element.ItemUOM !== null) {
                element.ItemUOM.forEach(function (x) {
                    if (x.Component) {
                        IsComponent = true;
                    }
                });
            }
            if (sessionStorage['TypeID'].toString() === '2') {
                if (element.ItemTypeID === 1) {
                    IsStore = true;
                }
                else {
                    IsStore = false;
                }
            }
            else {
                IsStore = true;
            }
            if (element.ItemID === $('#ItemID')) {
                IsMain = true;
            }
            return IsComponent && IsStore && !IsMain && element.StatusID !== 8;

        });
    }
    catch (ex) {alert(ex)}
  
    var rand = Math.floor(Math.random() * 1000);
 
    var ds = new kendo.data.DataSource.create({
        data: datas
    });

    $("<input validationMessage='" + DBSTRING['Required'] + "' id='" + rand + "' data-bind='value : " + e.field + " '/>")//required='required' 
        .appendTo(container)
        .kendoComboBox({
            filter: "contains",
            dataTextField: $Lang === 'ar' ? "ItemNameAr" : "ItemName",
            dataValueField: "ItemID",
            dataSource: ds,
            change: function (er) {
                var model = e.model;
                model.ItemName = $('#' + rand).data('kendoComboBox').text();
                model.ItemNameAr = $('#' + rand).data('kendoComboBox').text();

                var DI = this.dataItem().ItemUOM.filter(function (x) {
                    return x.Component && x.StatusID === 7
                });

                if (DI.length === 1) {
                    var DataItemTbl = $('#CompGrid').data('kendoGrid').dataItems();
                    var ItemUOMs = [];
                    ItemUOMs = _.pluck(DataItemTbl, 'CompItemUOMID');

                    var searchFound = _.contains(ItemUOMs, DI[0].ItemUOMID)

                    if (!searchFound) {
                        e.model.set('CompItemUOMID', DI[0].ItemUOMID);
                        e.model.Name = DI[0].Name;
                        e.model.NameAr = DI[0].NameAr;
                        e.model.set('NameAr', DI[0].NameAr);
                       
                    }
                    else {
                        e.model.set('CompItemUOMID', '');
                        e.model.Name = '';
                        e.model.NameAr = '';
                    }
                }
                else {
                    e.model.set('CompItemUOMID', '');
                    e.model.Name = '';
                    e.model.NameAr = '';
                }
                var grid = $("#CompGrid").data("kendoGrid");
                grid.refresh();
               
            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1
        });
}

var EditorItemUOM = function (container, e) {

    var grid = $("#grid").getKendoGrid()
    var dataSource = grid.dataSource;
    var dataUOM = [];

    $.map(dataSource.data(), function (it) {
        if (it.ItemID.toString() === e.model.CompItemID.toString()) {
            $.map(it.ItemUOM, function (x) {

                if (x.Component && x.StatusID === 7) {
                    var searchFound = $('#CompGrid').data('kendoGrid').dataItems().some(
                        function (dataItem) {
                            var found = false;

                            found = dataItem.CompItemUOMID === x.ItemUOMID;
                            try {

                                if (dataItem.CompItemUOMID.ItemUOMID !== undefined) {
                                    found = dataItem.CompItemUOMID.ItemUOMID === x.ItemUOMID;
                                }
                            } catch (dd) { };

                            return found;
                        });

                    var objUOM = {
                        'ItemUOMID': "", "Name": "", "NameAr": "", "isDeleted": ""
                    };
                    objUOM.ItemUOMID = x.ItemUOMID;
                    objUOM.Name = x.Name;
                    objUOM.NameAr = x.NameAr;
                    objUOM.isDeleted = searchFound ? true : false;
                    dataUOM.push(objUOM);
                }
            });
        }
    });
    objPlzSelect = { 'ItemUOMID': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'], "isDeleted": "" };
    dataUOM.unshift(objPlzSelect);
    var rand = Math.floor(Math.random() * 1000);
    var ds = new kendo.data.DataSource.create({
        data: dataUOM
    });
    var htmlTemplate = $("#template").html();

    $("<input validationMessage='" + DBSTRING['Required'] + "' id='" + rand + "'  data-bind='value :" + e.field + "'/>")
        .appendTo(container)
        .kendoComboBox({
            filter: "contains",
            dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
            dataValueField: "ItemUOMID",
            dataSource: ds,
            change: function (er) {
               
                e.model.Name = $('#' + rand).data('kendoComboBox').text();
                e.model.NameAr = $('#' + rand).data('kendoComboBox').text();

                var grid = $("#CompGrid").data("kendoGrid");
                grid.refresh();
            },
            select: function (e) {
                if (e.dataItem.isDeleted) {
                    e.preventDefault();
                }
            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1,
            template: kendo.template(htmlTemplate)
        });
}

var SaveUpdate = function () {
    $('.warning').removeClass('warning')
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');

    if ($('#UOM').val() === '') {
        markInvalid($('#UOM'), DBSTRING['Please_SelectUOM'])
        setTimeout("helperUp($('#UOM'))", 5000);
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['Please_SelectUOM']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        return false;
    }

    var listObj = [];
    var masterGrid = $("#CompGrid").data("kendoGrid");
    var listCompItems = masterGrid.dataItems();
    var view = masterGrid.dataSource.view();
    var validItem_UOM = ''; 
    //listCompItems.forEach(function (item) {
    for (var i = 0; i < view.length; i++) {
        item = view[i]
        var obj = {

            "ItemComponentID": "", "TypeID": "", "MainItemID": "", "MainItemUOMID": "",
            "CompItemID": "", "CompItemUOMID": "", "Qty": "", "IsMain": "", "IsBase": "", "InsertedBy": ""
        };
        if (item.CompItemID !== '' && item.CompItemID !== null) {
            obj.ItemComponentID = item.ItemComponentID === null || item.ItemComponentID === '' ? 0 : item.ItemComponentID;
            obj.TypeID = sessionStorage['TypeID'];
            obj.MainItemID = $('#ItemID').val();
            obj.MainItemUOMID = $('#UOM').val();
            obj.CompItemID = item.CompItemID;

            obj.CompItemUOMID = item.CompItemUOMID === null ? '' : item.CompItemUOMID.ItemUOMID === undefined ? item.CompItemUOMID : item.CompItemUOMID.ItemUOMID;
            obj.Qty = item.Qty;
            obj.IsMain = item.IsMain;
            obj.IsBase = item.IsBase;

            obj.InsertedBy = sessionStorage['UserId'];
            if (obj.CompItemID !== '' && obj.CompItemID !== null) {
                if (obj.CompItemUOMID === '' || obj.CompItemUOMID === null) {
                    validItem_UOM = '1';
                    firstCell = masterGrid.tbody.find("[data-uid='" + item.uid + "']");
                    cell = firstCell.children().eq(1);
                    cell.addClass('warning');
                }
                if (obj.Qty <= 0) {
                    validItem_UOM = validItem_UOM + '2';
                    firstCell = masterGrid.tbody.find("[data-uid='" + item.uid + "']");
                    cell = firstCell.children().eq(2);
                    cell.addClass('warning');
                }
            }

            listObj.push(obj);
        }
    }
   
    if (validItem_UOM.indexOf('1') > -1 && validItem_UOM.indexOf('2') === -1) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['ItemselectUOM']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        return false;
    }
    else if (validItem_UOM.indexOf('1') > -1 && validItem_UOM.indexOf('2') > -1) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['ItemselectUOM']+'<br />'+DBSTRING['QtyGreterZero']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        return false;
    }
    else if (validItem_UOM.indexOf('2') > -1){
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['QtyGreterZero']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        return false;
    }


    //if (listObj.length < 1) {
    //    $('#ResultMessage').addClass('alert-danger show');
    //    $('#ResultMessage').removeClass('hide');
    //    $('#ResultTxt').html(DBSTRING['AddItem']);
    //    setTimeout("$('#ResultMessage').removeClass('show')", 5000);
    //    return false;
    //}
   
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Items + "SaveItemComponents?MainItemID=" + $('#ItemID').val() + "&MainItemUOMID=" + $('#UOM').val() + "&Lang=" + Lang;

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
        data: JSON.stringify(listObj),
        success: function (data) {
            if (data.success === true) {

                $("#grid").data("kendoGrid").dataSource.read();


                $('#ResultMessage').addClass('alert-success show');
                $('#ResultTxt').html(data.message);

                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
                var grid = $("#grid").getKendoGrid()
                var dataItem = grid.dataItem(grid.select());
                try { 
                var model = dataItem.ItemComponents;
                var CompGrid = $("#CompGrid").data("kendoGrid");
                    CompGrid.dataSource.read(model);
                  
                    CompGrid.refresh();
                } catch (ss) { alert(ss) }
                

                $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();

            }
            else {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(data.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
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