var $initdataSource = '';
var $SKUdataSource = '';

$(document).ready(function () {

    var Lang = sessionStorage['lang'];
    $folderImg = 'Item'
    if ($('#ItemID').val() === '') {
        var grid = $("#grid").data("kendoGrid");
        var count = grid.dataItems().length+1;
        $('#ItemNumAuto').val(count)
        $('#ItemNum').val(count)
        FillDropDownIItemForm(function (r) {
            if (r) {
                var initdataSource = [{
                    "ItemUOMID": (Math.floor(Math.random() * 100000) + 1) * -1,
                    "ItemID": 0,
                    "Name": "pice",
                    "NameAr": DBSTRING["pice"],
                    "Cost": 0,
                    "Price": 0,
                    "Sell": false,
                    "Transfer": false,
                    "Adjust": false,
                    "Component": false,
                    "Purchase": false,
                    "Equivalent": 1,
                    "SKU": [],
                    "StatusID": false
                }];

                BindUOMGrid(initdataSource);
                $("#Color").kendoColorPicker({
                    buttons: false
                });
                $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
            }
        });
    }

    $("#panelbar").kendoPanelBar({
        expandMode: "multi"
    });

    try {
        BindFileUploaderkendo();
    }
    catch (ex) { alert(ex) }
    FillDBSTRINGPage('CMItems');
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    var changeLogo = GetPermession(MenuID, 'changeLogo');

    if (!changeLogo) {
        $('#photos').parent().hide();
        $('#delete-image').hide();
    }
    //$(".external").click(function (e) {
    //    alert()
    //    e.preventDefault();
    //    e.stopPropagation();
    //    console.log("clicked a");
    //});  
});

var FillDropDownIItemForm = function (callback) {
    $("#SubTypeIDDiv").addClass("hide");

    var lang = $Lang.toLowerCase();
    var list_Type = GetLookup('Lookups');

    var Status = list_Type.filter(function (el) {
        
        return el.StatusID === 1 && el.Value === $Active 
    });


    list_Type = list_Type.filter(function (el) {
        return el.StatusID === $ItemType && el.id === 3
    });
    fillDropdown('TypeID', list_Type, 3, true);
    $('#TypeID').data('kendoDropDownList').enable(false)
    $('#Status').val(lang === 'ar' ? Status[0].NameAr : Status[0].Name)

    var BrandID = sessionStorage['BrandsID'];
    var URL = $URL_Operations + "GetAllDataJsonByBrandID?BrandID=" + BrandID + "&Lang=" + $Lang.toLowerCase();

    $.get(URL, function (data) {
        if (data.success) {
            data.datalist = JSON.stringify(data.datalist);
            var $data = JSON.parse(data.datalist);

            $.each($data, function (index, value) {
                if (index === 'RemarksTemplate') {
                    fillDropdown('RemarksTemplate', value, '', true);
                }
                else if (index === 'Departments') {
                    fillDropdown('Department', value, '', true);
                }
                else if (index === 'ItemGroups') {

                    fillDropdown('Group', value, '', true);
                }
                else if (index === 'GeneralTax') {
                    fillDropdown('GeneralTax', value, '', true);
                }
                else if (index === 'SpecialTax') {
                    fillDropdown('SpecialTax', value, '', true);
                }
            });
            callback(true);
        }
    });
}

var BindUOMGrid = function (initdataSource) {

    $initdataSource = initdataSource;
    $dataSource = new kendo.data.DataSource({
        transport: {

            read: function (e) {
                e.success($initdataSource);
            },
            update: function (e) {
                
            },
            create: function (e) {
                //alert(JSON.stringify())
                //e.success(item);
            }
        }
        ,
        batch: false,
        schema: {
            model: {
                id: "ItemUOMID",
                fields: {
                    ItemUOMID: { editable: false, nullable: false, type: "number" },
                    ItemID: { editable: false, nullable: false, type: "number" },
                    Name: {
                        //validation: {
                        //    required: true
                            //,
                            //Namevalidation: function (input) {
                            //    if ( input.val() === "") {
                            //        input.attr("data-Namevalidation-msg", DBSTRING["Reqfield"]);
                            //        return false;///^[A-Z]/.test(input.val());
                            //    }

                            //    return true;
                            //}
                            //,
                            //duplicate: function (input) {  
                            //    if (input.val() !== "") {
                            //        // 1. get data
                            //        var name = input.val();

                            //        var grid = $("#UOMgrid").data('kendoGrid');
                            //        var view = grid.dataSource.view();
                            //        var dataItem = grid.dataItem(grid.current().closest("tr"));
                            //        var name_edit = dataItem.Name;

                            //        // 2. check for duplicate
                            //        var valid = true;
                            //        for (var i = 0; i < view.length; i++) {
                            //            if ((name === view[i].Name) && (name !== name_edit) && view[i].id) {
                            //                valid = false;
                            //                //  input.attr("data-duplicate-msg", "Duplicates not allowed.");
                            //                input.attr("data-duplicate-msg", DBSTRING['DuplicatesNotAllowed']);
                            //                break;
                            //            }
                            //        }
                            //        return valid;
                            //    }
                            //    return true;
                            //}
                    //    }
                    },
                    NameAr: {
                        //validation: {
                        //    required: true
                        //,
                        //Namevalidation: function (input) {
                        //    if ( input.val() === "") {
                        //        input.attr("data-Namevalidation-msg", DBSTRING["Reqfield"]);
                        //        return false;///^[A-Z]/.test(input.val());
                        //    }

                        //    return true;
                        //}
                        //,
                        //duplicate: function (input) {  
                        //    if (input.val() !== "") {
                        //        // 1. get data
                        //        var name = input.val();

                        //        var grid = $("#UOMgrid").data('kendoGrid');
                        //        var view = grid.dataSource.view();
                        //        var dataItem = grid.dataItem(grid.current().closest("tr"));
                        //        var name_edit = dataItem.Name;

                        //        // 2. check for duplicate
                        //        var valid = true;
                        //        for (var i = 0; i < view.length; i++) {
                        //            if ((name === view[i].Name) && (name !== name_edit) && view[i].id) {
                        //                valid = false;
                        //                //  input.attr("data-duplicate-msg", "Duplicates not allowed.");
                        //                input.attr("data-duplicate-msg", DBSTRING['DuplicatesNotAllowed']);
                        //                break;
                        //            }
                        //        }
                        //        return valid;
                        //    }
                        //    return true;
                        //}
                        //    }
                    },
                    Cost: {
                        editable: false, type: "number", validation: {
                            //required: true,
                            min: 1
                        },
                        defaultValue: 0
                    },
                    Price: {
                        type: "number", validation: {
                            //required: true,
                            min: 0
                        },
                        defaultValue:0
                    },
                    Sell: { editable: true, type: "boolean" },
                    Transfer: { editable: true, type: "boolean" },
                    Adjust: { editable: true, type: "boolean" },
                    Component: { editable: true, type: "boolean" },
                    Purchase: { editable: true, type: "boolean" },
                    Equivalent: {
                        type: "number", validation: {
                           //  required: true
                           // ,
                            //duplicate: function (input) {
                            //    if (input.val() !== "") {
                            //        // 1. get data
                            //        var eq = input.val();                          
                            //        var grid = $("#UOMgrid").data('kendoGrid');
                            //        var view = grid.dataSource.view();
                            //        var dataItem = grid.dataItem(grid.current().closest("tr"));
                            //        var name_edit = dataItem.Equivalent;

                            //        // 2. check for duplicate
                            //        var valid = true;
                            //        for (var i = 0; i < view.length; i++) {

                            //            if ((parseFloat(eq) === parseFloat(view[i].Equivalent)) && (parseFloat(eq) !== parseFloat(name_edit)) && view[i].id) {       
                            //                valid = false;
                            //                input.attr("data-duplicate-msg", DBSTRING['DuplicatesNotAllowed']);
                            //                break;
                            //            }
                            //        }
                            //        return valid;
                            //    }
                            //    return true;
                            //},
                            min: 0
                        }
                    },
                    SKU: {
                        editable: true, defaultValue: []
                    },
                    StatusID: { editable: true, type: "boolean" }
                }
            }
        },
        change: function (e) {

            //if (e.action === "add") {
            //    var newItem = e.items[0];
            //    newItem.MainItemUOMID = $('#UOM').val();

            //    var filter = this.filter();
            //    if (filter) {
            //        var noValueFilter = { field: "MainItemUOMID", operator: "eq", value: $('#UOM').val() };
            //        this.filter([noValueFilter]);
            //    }

            //}
            //else if (e.action === "itemchange" && e.field === "CompItemID") {
            //    var model = e.items[0]
            //    //$("#CompGrid").find("tr[data-uid='" + model.uid + "'] td:eq(1)").text('');
            //}
            if (e.action === "itemchange") {
                //&& e.field === "Qty"
                var model = e.items[0]
                $initdataSource.map(function (el) {
                    if (el.ItemUOMID.toString() === model.ItemUOMID.toString()) {
                     
                        el[e.field] = model[e.field];
                    }
                });
            }
        }
    });

    var UOMgrid = $("#UOMgrid").kendoGrid({
        dataSource: $dataSource,
        pageable: false,
        navigatable: true,
        height: "300px",
        resizable: true,
        scrollable: true,
        detailInit: detailInit,
        editable: {
            "createAt": "bottom"
        },
        detailExpand: function (e) {
            e.sender.tbody.find('.k-detail-row').each(function (idx, item) {
                if (item !== e.detailRow[0]) {
                    e.sender.collapseRow($(item).prev());
                }
            })

            var grid = e.sender;
            var rows = grid.element.find(".k-master-row").not(e.masterRow);

            rows.each(function (e) {
                grid.collapseRow(this);
            });

            var item = this.dataItem(e.masterRow);
            var items = sessionStorage['expanded'];

            if (items) {
                items = JSON.parse(items);

            } else {
                items = [];
            }

            items.push(item.ItemUOMID);
            sessionStorage['expanded'] = JSON.stringify(items);

        },
        detailCollapse: function (e) {
            var item = this.dataItem(e.masterRow);
            var items = JSON.parse(sessionStorage['expanded']);

            items = items.filter(function (x) {
                return x !== item.ItemUOMID;
            });
            sessionStorage['expanded'] = JSON.stringify(items);
        },
        dataBound: function (e) {

            var items = sessionStorage['expanded'];
            var grid = this;
            if (items) {
                items = JSON.parse(items);
                items.forEach(function (x) {
                    var item = grid.dataSource.view().find(function (y) {
                        return y.ItemUOMID === x;
                    });

                    if (item) {
                        var row = $('#' + grid.element.attr('id') + ' tr[data-uid="' + item.uid + '"]')
                        grid.expandRow(row);
                    }
                })
            }

            $('.addUOMID').unbind("click");
            $('.saveUOMID').unbind("click");
            $('.saveUOMID').bind("click", function () {
                $(".addUOMID", "#UOMgrid").show();
                $(".saveUOMID", "#UOMgrid").hide();
            });

            $('.addUOMID').bind("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var panelBar = $("#panelbar").data("kendoPanelBar");
                
                panelBar.expand($("#UOMPanel"));
                $dataSource.aggregate([
                    { field: "Equivalent", aggregate: "max" }
                ]);

                // var EquivalentAggregates = $dataSource.aggregates().Equivalent;
                var obj = {
                    "ItemUOMID": (Math.floor(Math.random() * 100000) + 1) * -1,
                    "ItemID": 0,
                    "Name": "",
                    "NameAr": "",
                    "Cost": 0,
                    "Price": 0,
                    "Sell": false,
                    "Transfer": false,
                    "Adjust": false,
                    "Component": false,
                    "Purchase": false,
                    "Equivalent": '', //EquivalentAggregates.max + 1,
                    "SKU": [],
                    "StatusID": false
                };
                $initdataSource.push(obj);
                
                $dataSource.read({ data: $initdataSource });
                $('#UOMgrid').data('kendoGrid').dataSource.read();
                $('#UOMgrid').data('kendoGrid').refresh();

                var grid = $("#UOMgrid").data("kendoGrid");
                var row = grid.tbody.find("tr:last");


                var firstCell = grid.tbody.find("tr[role='row']:last" + " td:eq(1)");
                grid.editCell(firstCell);
                grid.select(row);
            
            });


        },
        edit: function (e) {
            var input = $(e.container.find('input'))
            $(input).on('keypress', function (e) {
                $(".addUOMID", "#UOMgrid").hide();
                $(".saveUOMID", "#UOMgrid").show();
            });
            //e.model.bind("change", function (j) {
            //    $(".addUOMID", "#UOMgrid").hide();
            //    $(".saveUOMID", "#UOMgrid").show();
            //});
        },
        selectable: true,
        //toolbar: [{
        //    className: 'addUOMID', name: "addUOMID", text: DBSTRING['New']
        //}, { className: 'saveUOMID', name: "save", text: DBSTRING['Save'] }/*, { name: "cancel", text: DBSTRING['Cancel'] }*/],
        columns: [{
            title: DBSTRING["NameEn"],
            field: "Name",
            template: "#:Name#",
            editor: EditorNameUOM,
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
            {
                title: DBSTRING["NameAr"],
                field: "NameAr",
                template: "#:NameAr#",
                editor: EditorNameUOMAr,
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            },{
            title: DBSTRING["Equivalent"],
            field: "Equivalent",
            //editable: isEditable,
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
            //,hidden: $('#TypeID').val().toString() === $Selling.toString()
        },
        {
            title: DBSTRING["Price"],
            field: "Price",
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        {
            title: DBSTRING["Cost"],
            field: "Cost",
            //editable: isEditable,
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            },
            hidden: $('#TypeID').val().toString() === $Selling.toString()
        }
            ,
        {
            title: DBSTRING["Component"],
            field: "Component",
            template: '#=dirtyField(data,"Component")#<input type="checkbox" #= Component ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            },
            hidden: $('#TypeID').val().toString() === $Selling.toString()
        }
            ,
        {
            title: DBSTRING["Transfer"],
            field: "Transfer",
            template: '#=dirtyField(data,"Transfer")#<input type="checkbox" #= Transfer ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            },
            hidden: $('#TypeID').val().toString() === $Selling.toString()
        }
            ,
        {
            title: DBSTRING["Adjust"],
            field: "Adjust",
            template: '#=dirtyField(data,"Adjust")#<input type="checkbox" #= Adjust ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            },
            hidden: $('#TypeID').val().toString() === $Selling.toString()
        }
            ,
        {
            title: DBSTRING["Sell"],
            field: "Sell",
            template: '#=dirtyField(data,"Sell")#<input type="checkbox" #= Sell ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            },
            hidden: $('#TypeID').val().toString() === $Selling.toString()
        }
            ,
        {
            title: DBSTRING["Purchase"],
            field: "Purchase",
            template: '#=dirtyField(data,"Purchase")#<input type="checkbox" #= Purchase ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            },
            hidden: $('#TypeID').val().toString() === $Selling.toString()
        }, {
            title: DBSTRING["InActive"],
            field: "StatusID",
            template: '#=dirtyField(data,"StatusID")# <input type="checkbox" #= StatusID ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />',
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
                        var data = this.dataItem(tr); //get the row data so it can be referred later
                        var grid = $("#UOMgrid").data("kendoGrid");

                        $initdataSource = $initdataSource.filter(function (el) {
                            return el.ItemUOMID.toString() !== data.ItemUOMID.toString();
                        });

                        grid.removeRow(tr);
                        grid.dataSource.read();
                        $(".addUOMID", "#UOMgrid").hide();
                        $(".saveUOMID", "#UOMgrid").show();
                    },
                    visible: function (dataItem) {
                        return (dataItem.Equivalent !== 1 && dataItem.ItemUOMID <= 0)
                    }
                },
                {
                    name: "Expand",
                    text: "<span class='fa fa-plus'></span>",
                    className: "btn-sm btn-info k-grid-ExpandBtn ",
                    click: function (e) {
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var grid = $("#UOMgrid").data("kendoGrid");
                        grid.expandRow(tr);
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
    }).data("kendoGrid");

    $("#UOMgrid .k-grid-content").on("change", "input.chkbx", function (e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

        dataItem.set("StatusID", this.checked);
    });

    $("#UOMgrid ").kendoTooltip({
        filter: ".k-hierarchy-cell,.k-grid-ExpandBtn",
        content: function (e) {
            return DBSTRING['AddSKU'];
        }
    });
    $("#UOMgrid .k-grid-content").on("click", "input.chkbx", function (e) {
       
        var grid = $("#UOMgrid").data("kendoGrid");
        var checked = $(this).is(':checked');
        var col = $(this).closest('td');
        
        dataItem = grid.dataItem($(e.target).closest("tr"));
        dataItem.set(grid.columns[col.index() - 1].field, checked);
        
        $initdataSource.map(function (el) {
           
            if (el.ItemUOMID.toString() === dataItem.ItemUOMID.toString()) {
                el[grid.columns[col.index() - 1].field.toString()] = checked;
                
            }
        });

       
       // $initdataSource
    });
}

var ChangeItemType = function () {
    
    if ($('#TypeID').val().toString() === '1') {
        $("#SubTypeIDDiv").removeClass("hide")
    } else {
        $("#SubTypeIDDiv").addClass("hide");
    }

    var grid = $("#UOMgrid").data("kendoGrid");
    if ($('#TypeID').val().toString() === $Selling.toString()) {
        grid.hideColumn("Sell");
        grid.hideColumn("Adjust");
        grid.hideColumn("Transfer");
        grid.hideColumn("Component");
        grid.hideColumn("Cost");
        //grid.hideColumn("Equivalent");
        grid.hideColumn("Purchase");

    }
    else {
        grid.showColumn("Sell");
        grid.showColumn("Adjust");
        grid.showColumn("Transfer");
        grid.showColumn("Component");
        grid.showColumn("Cost");
       // grid.showColumn("Equivalent");
        grid.showColumn("Purchase");
    }
}

var FillForm = function (data) {

    $('#ItemID').val(data.ItemID);
    $('#ItemName').val(data.ItemName);
    $('#ItemNameAr').val(data.ItemNameAr);
    $('#ItemNum').val(data.ItemNum);
    $('#ItemNumAuto').val(data.ItemNumAuto)
    $('#MobileName').val(data.MobileName);
    $('#MobileNameAr').val(data.MobileNameAr);
    $('#Insurancevalue').val(data.InsuranceVal);
    var colorpicker = $("#Color").kendoColorPicker({
        buttons: false
    }).data("kendoColorPicker");

    // set picker value
    colorpicker.value(data.PosColor);
    FillDropDownIItemForm(function (r) {
        if (r) {

            $('#TypeID').data('kendoDropDownList').value(3);
            $('#Department').data('kendoDropDownList').value(isNull(data.DepartmentID));
            $('#GeneralTax').data('kendoDropDownList').value(isNull(data.GnrlTaxID));
            $('#SpecialTax').data('kendoDropDownList').value(isNull(data.SpclTaxID));

            $('#Group').data('kendoDropDownList').value(isNull(data.GroupID));
            $('#RemarksTemplate').data('kendoDropDownList').value(isNull(data.RemarksTemplateID));

            if (data.ItemTypeID.toString() === $Selling.toString()) {
                $('#TypeID').data('kendoDropDownList').enable(false);
            }
            else {
                var dropDownList = $('#TypeID').data("kendoDropDownList");
                var chai = dropDownList.dataSource.get($Selling);
                dropDownList.dataSource.remove(chai);
            }
         

            if (data.StatusID === $InActive) {
                $('#InActive').prop("checked", true);
            }
            else {
                $('#InActive').prop("checked", false);
            }

            if (data.NoDisc) {
                $('#NoDiscount').prop("checked", true);
            }
            else {
                $('#NoDiscount').prop("checked", false);
            }

            if (data.PriceChange) {
                $('#PriceChange').prop("checked", true);
            }
            else {
                $('#PriceChange').prop("checked", false);
            }

            if (data.Weighable) {
                $('#Weighable').prop("checked", true);
            }
            else {
                $('#Weighable').prop("checked", false);
            }
            if (data.SubTypeID === 1) {
                $('#SubTypeID').prop("checked", true);
            }
            else {
                $('#SubTypeID').prop("checked", false);
            }

            if ($('#TypeID').val().toString() === '1') {
                $("#SubTypeIDDiv").removeClass("hide")
            } else {
                $("#SubTypeIDDiv").addClass("hide");
            }

            var initdataSource = [];
            data.ItemUOM.forEach(function (x) {

                var obj = {
                    "ItemUOMID": x.ItemUOMID,
                    "ItemID": x.ItemID,
                    "Name": x.Name,
                    "NameAr": x.NameAr,
                    "Cost": x.Cost,
                    "Price": x.Price,
                    "Sell": x.Sell,
                    "Transfer": x.Transfer,
                    "Adjust": x.Adjust,
                    "Component": x.Component,
                    "Purchase": x.Purchase,
                    "Equivalent": x.Equivalent,
                    "SKU": x.SKU,
                    "StatusID": x.StatusID === $InActive ? true : false
                }
                initdataSource.push(obj);
            })

            BindUOMGrid(initdataSource);
            if (data.ImageName !== '' && data.ImageName !== null) {

                var img_url = data.ImageName;
                $("#preview").attr("src", img_url);
                var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);
                $('#ImageName').val(ImageName);
            }

            $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
        }
    });
}

function addNew(widgetId, value) {
    var widget = $("#" + widgetId).getKendoMultiSelect();
    var dataSource = widget.dataSource;
    var items = sessionStorage['expanded'];

    if (items) {
        items = JSON.parse(items);
    }

    var eq = value;
    var grid = $("#UOMgrid").data('kendoGrid');
    var view = grid.dataSource.view();
    var dataItem = '';
    if (items) {
        items.forEach(function (x) {
            var item = grid.dataSource.view().find(function (y) {
                return y.ItemUOMID === x;
            });
            if (item !== undefined) {
                item = JSON.stringify(item);
                var xitem = JSON.parse(item)
                dataItem = xitem;
            }
        });
    }
    else {
        dataItem = grid.dataItem(grid.current().closest("tr"));
    }

    var name_edit = dataItem.ItemUOMID;
    var valid = true;
    for (var i = 0; i < view.length; i++) {
        if (view[i].ItemUOMID !== name_edit) {
            view[i].SKU.forEach(function (ix) {
                if (eq === ix) {
                    valid = false;
                }
            });
        }

        if (!valid) {
            $('#ResultMessageSKU').html(DBSTRING["DuplicateSKU"])
            $('#ResultMessageSKU').addClass('show');//.removeClass('hide');
            setTimeout("$('#ResultMessageSKU').removeClass('show')", 5000);
            return;
        }
    }
    var arrSelected = [];
    if (valid) {
        if (jQuery.inArray(value, dataSource.data()) === -1) {
            dataSource.data().push(value);
        }
        $.map($initdataSource, function (x) {

            if (x.ItemUOMID === parseInt(widgetId)) {
                x.SKU.push(value)
                arrSelected = x.SKU;
            }
        });
    }

    // widget.value(arrSelected);
    $('#UOMgrid').data('kendoGrid').dataSource.read();
    $('#UOMgrid').data('kendoGrid').refresh();

    dataSource.sync();
    widget.close();
}

function orgEditor(container, options) {
    var arrayAll = options.model.SKU;
    var multiData = options.model.SKU.toJSON();
    var itemUOMID = options.model.itemUOMID;

    //var ds = new kendo.data.DataSource({
    //    data: multiData
    //   // filter: { field: "", operator: "eq", value: "????!!!!!" }
    //});

    $("<select id='" + options.model.ItemUOMID + "' multiple='multiple' data-bind='value :SKU'/>")
        .appendTo(container)
        .kendoMultiSelect({
            change: function (e) {
                var value = this.value();
                // Use the value of the widget
                var arrSKU = value.split(',');

                $.map($initdataSource, function (e) {
                    if (e.ItemUOMID === parseInt(itemUOMID)) {
                        e.SKU = [];

                        $.each(arrSKU, function (i, el) {
                            e.SKU.push(el);
                        });
                    }
                });
            },

            filterable: false,
            minLength: 3,
            dataSource: multiData,
            noDataTemplate: $("#noDataTemplate").html()

        });

    // $(".k-multiselect").find('ul').append('<span style="float:left;margen-top:5px;" class="fa btn btn-success fa-plus-addNew k-icon k-i-plus" title="' + DBSTRING['New'] + '"> </span>')
    //$('#' + options.model.ItemUOMID).keydown(function (e) {
    //    if (e.key !== "Enter") {
    //        return;
    //    }
    //    var value = $(this).val();
    //    if (!value || value.length === 0) {
    //        return;
    //    }
    //    $('#AddNewSKU').click();
    //});
}

var detailInit = function (e) {

    $("<div  />").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success($initdataSource);
                },
                update: function (e) {
                    e.data.dirty = true;
                    e.success();
                },
                create: function (e) {
                    var item = e.data;
                    item.ItemUOMID = (Math.floor(Math.random() * 100000) + 1) * -1;
                    e.data.dirty = true;
                    e.success(item);
                },
                change: function (e) {
                    if (e.field && e.field.indexOf("SKU") >= 0) {
                        preventBinding = true;
                    }
                }
            },
            batch: true,
            filter: { field: "ItemUOMID", operator: "eq", value: e.data.ItemUOMID },
            schema: {
                model: {
                    id: "ItemUOMID",
                    fields: {
                        SKU: { editable: true, defaultValue: [] }
                    }
                }
            }
        },
        editable: true,
        navigatable: true,
        sortable: false,
        dataBound: function (e) {
          
            var firstCell = e.sender.tbody.find("tr[role='row']:last" + " td:eq(1)");
            e.sender.editCell(firstCell);
        },
        columns: [
            {
                //title: DBSTRING['Barcode'],
                template: DBSTRING['Barcode'],
                //editor: orgEditor,
                width: "10%",
                height: "200px",
                headerAttributes: {
                    style: "display: none"
                },
                attributes: {
                    "class": "Center"
                }
            },
            {
                title: DBSTRING['Barcode'],
                field: "SKU",
                template: "#= SKU.join(', ') #",
                editor: orgEditor,
                width: "100%",
                height: "200px",
                headerAttributes: {
                    style: "display: none"
                }
            }
        ]
    }).data("kendoGrid");
}

var isEditable = function (e) {
    var dataSource = $("#UOMgrid").data("kendoGrid").dataSource;
    return e.Equivalent !== 1 && e.ItemUOMID < 0;
}

var EditorNameUOM = function (container, e) {

    $("<input id='" + e.ItemUOMID + "'  data-bind='value :" + e.field + "'/>")
        .appendTo(container)
        .kendoAutoComplete({
            filter: "contains",
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1
        });

    var lang = sessionStorage['lang'];
    var URL = $URL_Items + "GetUOMNames?BrandID=" + sessionStorage['BrandsID'] + "&Lang=" + $Lang.toLowerCase();

    $.get(URL, function (data) {

        if (data.success) {
            var datalist = JSON.parse(data.datalist);
            var compData = _.uniq(_.pluck(datalist, 'Name'))// data.datalist.split(',')
            //alert(JSON.stringify(compData))
            var ListDataSource = new kendo.data.DataSource({
                data: compData
            });
            var autocomplete = $("#" + e.ItemUOMID).data("kendoAutoComplete");
            autocomplete.setDataSource(ListDataSource);
        }
    });
}

var EditorNameUOMAr = function (container, e) {


    $("<input id='" + e.ItemUOMID + "'  data-bind='value :" + e.field + "'/>")
        .appendTo(container)
        .kendoAutoComplete({
            filter: "contains",
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            minLength: 1
        });

    var lang = sessionStorage['lang'];
    var URL = $URL_Items + "GetUOMNames?BrandID=" + sessionStorage['BrandsID'] + "&Lang=" + $Lang.toLowerCase();

    $.get(URL, function (data) {

        if (data.success) {
            var datalist = JSON.parse(data.datalist);
            var compData = _.uniq(_.pluck(datalist, 'NameAr'))// data.datalist.split(',')
            //alert(JSON.stringify(compData))
            var ListDataSource = new kendo.data.DataSource({
                data: compData
            });
            var autocomplete = $("#" + e.ItemUOMID).data("kendoAutoComplete");
            autocomplete.setDataSource(ListDataSource);
        }
    });
}

function dirtyField(data, fieldName) {
    var hasClass = $("[data-uid=" + data.uid + "]").find(".k-dirty-cell").length < 1;
    if (data.dirty && data.dirtyFields[fieldName] && hasClass) {
        return "<span class='k-dirty'></span>"
    }
    else {
        return "";
    }
}

//******************************************************/

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    $('.warning').removeClass('warning');
    var grid = $("#UOMgrid").data("kendoGrid");
    if (!ValidateForm('CMItems'))
        return false;

    var obj = {
        "ItemId": "","ItemNumAuto": "", "ItemNum": "", "ItemName": "", "ItemNameAr": "", "MobileName": "",
        "MobileNameAr": "", "ItemTypeId": "", "DepartmentId": "", "GroupId": "", "GnrlTaxId": "",
        "SpclTaxId": "", "RemarksTemplateId": "", "InsuranceVal": "", "NoDisc": "", "PriceChange": "",
        "Weighable": "", "PosColor": "", "ImageName": "", "StatusId": "", "BrandId": "", "InsertedBy": "",
        "CreateDate": "", "ModifiedBy": "", "LastModifyDate": "", "DeletedBy": "", "DeletedDate": "", "ItemUoms": [], "SubTypeID": ""
    };

    var objUOM = {
        "ItemUomid": "", "Name": "", "NameAr": "", "Cost": "", "Price": "", "Sell": "", "Transfer": "", "Adjust": "",
        "Component": "", "Purchase": "", "Equivalent": "", "ItemId": "", "Skus": []
    }

    var objSkus = { "Skuid": "", "Code": "", "BrandID": "", "ItemUomid": "" }

    obj.ItemId = $('#ItemID').val() === '' ? 0 : $('#ItemID').val();
    obj.ItemNum = $('#ItemNum').val();
    obj.ItemNumAuto = $('#ItemNumAuto').val()
    obj.ItemName = $('#ItemName').val();
    obj.ItemNameAr = $('#ItemNameAr').val();

    obj.MobileName = $('#MobileName').val();
    obj.MobileNameAr = $('#MobileNameAr').val();
    obj.ItemTypeId = $('#TypeID').val();

    obj.DepartmentId = $('#Department').val();
    obj.GroupId = $('#Group').val();
    obj.GnrlTaxId = $('#GeneralTax').val();
    obj.SpclTaxId = $('#SpecialTax').val();
    obj.RemarksTemplateId = $('#RemarksTemplate').val();
    obj.InsuranceVal = $('#Insurancevalue').val();
    obj.NoDisc = $('#NoDiscount').is(':checked');
    obj.PriceChange = $('#PriceChange').is(':checked');
    obj.Weighable = $('#Weighable').is(':checked');
    obj.SubTypeID = $('#SubTypeID').is(':checked') ? 1 : null;
    obj.PosColor = $('#Color').val();
    obj.ImageName = $('#ImageName').val();
    if ($('#InActive').is(':checked')) {
        obj.StatusId = $InActive;
    }
    else {
        obj.StatusId = $Active;
    }

    obj.BrandId = sessionStorage['BrandsID'];
    obj.insertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];
    obj.DeletedBy = sessionStorage['UserId'];

    var listCompItems = grid.dataItems();
    var view = grid.dataSource.view();
    var validName = true, validNameAr = true, validEqui = true;
    var firstCell, cell;

    listCompItems.forEach(function (it) {
        objUOM = {
            "ItemUomid": "", "Name": "", "NameAr": "", "Cost": "", "Price": "", "Sell": "", "Transfer": "", "Adjust": "",
            "Component": "", "Purchase": "", "Equivalent": "", "ItemId": "", "Skus": [], "StatusID": ""
        }

        objUOM.ItemUomid = it.ItemUOMID < 0 ? 0 : it.ItemUOMID;
        objUOM.Name = it.Name;
        objUOM.NameAr = it.NameAr;
        objUOM.Price = it.Price;

        var name_edit = it.Name;
        var name_editAr = it.NameAr;

        // 2. check for duplicate
        for (var i = 0; i < view.length; i++) {
            if ((name_edit === view[i].Name) && it.ItemUOMID !== view[i].ItemUOMID) {

                firstCell = grid.tbody.find("[data-uid='" + view[i].uid + "']");
                validName = false;
                cell = firstCell.children().eq(1);
                cell.addClass('warning');
            }
            else if (view[i].Name === '') {

                firstCell = grid.tbody.find("[data-uid='" + view[i].uid + "']");
                validName = false;
                cell = firstCell.children().eq(1);
                cell.addClass('warning');
            }

            if ((name_editAr === view[i].NameAr) && it.ItemUOMID !== view[i].ItemUOMID) {

                firstCell = grid.tbody.find("[data-uid='" + view[i].uid + "']");
                validNameAr = false;
                cell = firstCell.children().eq(2);
                cell.addClass('warning');
            }
            else if (view[i].Name === '') {

                firstCell = grid.tbody.find("[data-uid='" + view[i].uid + "']");
                validNameAr = false;
                cell = firstCell.children().eq(2);
                cell.addClass('warning');
            }
        }

        objUOM.ItemId = it.ItemId;
        objUOM.StatusID = it.StatusID ? $InActive : $Active;
        if ($('#TypeID').val().toString() === $Selling.toString()) {
            objUOM.Cost = 0;
            objUOM.Sell = true;
            objUOM.Transfer = false;
            objUOM.Adjust = false;
            objUOM.Component = false;
            objUOM.Purchase = false;
            objUOM.Equivalent = isNull(it.Equivalent);
        } else {

            objUOM.Cost = it.Cost;
            objUOM.Sell = it.Sell;
            objUOM.Transfer = it.Transfer;
            objUOM.Adjust = it.Adjust;
            objUOM.Component = it.Component;
            objUOM.Purchase = it.Purchase;
            objUOM.Equivalent = it.Equivalent;
            var equ_edit = isNull(it.Equivalent);

            for (var j = 0; j < view.length; j++) {
                if (view[j].Equivalent !== null) {
                    if ((equ_edit.toString() === view[j].Equivalent.toString()) && it.ItemUOMID !== view[j].ItemUOMID) {

                        firstCell = grid.tbody.find("[data-uid='" + view[j].uid + "']");
                        validEqui = false;
                        cell = firstCell.children().eq(3);
                        cell.addClass('warning');
                    }

                    else if (view[j].Equivalent.toString() === '' || view[j].Equivalent.toString() === '0') {

                        firstCell = grid.tbody.find("[data-uid='" + view[j].uid + "']");
                        validEqui = false;
                        cell = firstCell.children().eq(3);
                        cell.addClass('warning');
                    }
                }
                else {

                    firstCell = grid.tbody.find("[data-uid='" + view[j].uid + "']");
                    validEqui = false;
                    cell = firstCell.children().eq(3);
                    cell.addClass('warning');

                }
            }
        }

        it.SKU.forEach(function (sk) {
            objSkus = { "Code": "", "BrandID": "", "ItemUomid": "" }
            objSkus.BrandID = sessionStorage['BrandsID'];
            objSkus.Code = sk;
            objSkus.ItemUomid = objUOM.ItemUomid;
            objUOM.Skus.push(objSkus);
        });

        obj.ItemUoms.push(objUOM);
    });

    if ((!validName || !validNameAr) && !validEqui) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['NameDuplicateOrEmpty'] + '<br />' + DBSTRING['EquiDuplicateOrEmpty']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);

    }
    else if ((!validName || !validNameAr) && validEqui) {
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['NameDuplicateOrEmpty']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);

    }
    else if ((validName || validNameAr) && !validEqui) {
       
        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['EquiDuplicateOrEmpty']);
        setTimeout("$('#ResultMessage').removeClass('show')", 5000);

    }
   
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Items + "SaveItem?Lang=" + Lang + '&rand=' + Math.random();
    if (validName && validNameAr && validEqui) {
        $.ajax({
            type: "POST",
            url: URL,
            dataType: "Json",
            contentType: 'application/json',
            async: false,
            headers: {
                Authorization: 'bearer ' + token
            },
            data: JSON.stringify(obj),
            success: function (data) {
                var initdataSource = [];
                
                if (data.success === true) {
                    $("#grid").data("kendoGrid").dataSource.read();

                    $(".addUOMID", "#UOMgrid").show();
                    $(".saveUOMID", "#UOMgrid").hide();
                    var grid = $("#UOMgrid").data("kendoGrid");
                    grid.saveChanges();

                    if (IsComeFromDestroy) {
                        $dataForm = ''
                        $('#ChildContent').hide();
                        $('#MainContent').show();
                    }
                    else {
                        $('#ResultMessage').addClass('alert-success show');
                        $('#ResultTxt').html(data.message);

                        setTimeout("$('#ResultMessage').removeClass('show')", 2000);

                        
                        if ($('#ItemID').val() === '') {
                            $(':input', '#CMItems')
                                .not(':button, :submit, :reset, :hidden')
                                .val('')
                                .prop('checked', false)
                                .prop('selected', false);

                            resetKendoDropDownByForm('CMItems','TypeID');
                            //var colorpicker = $("#Color").kendoColorPicker({
                            //    buttons: false
                            //}).data("kendoColorPicker");


                            //// set picker value
                            //colorpicker.value(data.PosColor);

                            initdataSource = [{
                                "ItemUOMID": (Math.floor(Math.random() * 100000) + 1) * -1,
                                "ItemID": 0,
                                "Name": "pice",
                                "NameAr": DBSTRING["pice"],
                                "Cost": 0,
                                "Price": 0,
                                "Sell": false,
                                "Transfer": false,
                                "Adjust": false,
                                "Component": false,
                                "Purchase": false,
                                "Equivalent": 1,
                                "SKU": [],
                                "StatusID": false
                            }];
                            $initdataSource = initdataSource;
                            $("#UOMgrid").data("kendoGrid").dataSource.read();
                            $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                        }
                        else {

                            $('#ResultMessage').addClass('alert-success show');
                            $('#ResultTxt').html(data.message);

                            setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                            var grid = $("#grid").getKendoGrid()
                            var dataItem = grid.dataItem(grid.select());

                            /************************* */

                            dataItem.ItemUOM.forEach(function (x) {
                                var obj = {
                                    "ItemUOMID": x.ItemUOMID,
                                    "ItemID": x.ItemID,
                                    "Name": x.Name,
                                    "NameAr": x.NameAr,
                                    "Cost": x.Cost,
                                    "Price": x.Price,
                                    "Sell": x.Sell,
                                    "Transfer": x.Transfer,
                                    "Adjust": x.Adjust,
                                    "Component": x.Component,
                                    "Purchase": x.Purchase,
                                    "Equivalent": x.Equivalent,
                                    "SKU": x.SKU,
                                    "StatusID": x.StatusID === $InActive ? true : false
                                }
                                initdataSource.push(obj);
                            });

                            /**************************/

                            $initdataSource = initdataSource;
                            $("#UOMgrid").data("kendoGrid").dataSource.read();
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
    }
}