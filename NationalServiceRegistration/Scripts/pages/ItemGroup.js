
var list_ItemType;
$(document).ready(function () {
    try {
        FillDBSTRINGPage('ItemGroupsForm');
        successCallBack('');

        var BrandID = sessionStorage['BrandsID'];
        var URL = $URL_Items + "GetItems?BrandID=" + BrandID + '&Lang=' + $Lang.toLowerCase();
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
                list_ItemType = data.datalist;
                objPlzSelect = { 'ItemID': '', 'ItemNameAr': DBSTRING['PleaseSelect'], 'ItemName': DBSTRING['PleaseSelect'] };

                list_ItemType = list_ItemType.filter(function (element, index, array) {
                    return element.StatusID === 7 && element.ItemTypeID === 3;
                });
                GetPageConfig();

            }
        });  
    }
    catch (ss) {
        alert(ss)
    }
});

var successCallBack = function (data) {
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $Export = GetPermession(MenuID, 'export');
    $Add = GetPermession(MenuID, 'add');
    $Edit = GetPermession(MenuID, 'edit');
    $Delete = GetPermession(MenuID, 'delete');
    $addSellingItems = GetPermession(MenuID, 'addSellingItems');

    var toolBarBtn = [];
    toolBarBtn.push({
        name: "search", text: DBSTRING['Search'], className: "k-searchFilter"
    });
    if ($Export) {
        toolBarBtn.push({
            name: "excel",
            template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'
        });
    }
    var obj = { "text": "" };
    obj.text = "<span class='fa fa-plus'></span>";
    obj.className = "btn btn-primary";

    var list_BranchType = GetLookup('Lookups');
    list_BranchType = list_BranchType.filter(function (el) {
        return el.StatusID === $ItemGroupType
    });

    if (sessionStorage['TypeID'] === undefined || sessionStorage['TypeID'] === null ||
        sessionStorage['TypeID'] === '0' || sessionStorage['TypeID'] === '') {
        sessionStorage['TypeID'] = 1
    }
    $('#SubpageTitle').parent().show();
    
    var strtemplateBtn = '<div id="DivBtn2" class="div-icons">';
    $.each(list_BranchType, function () {
        var selected = '';
        if (this.id.toString() === sessionStorage['TypeID'].toString()) {
            selected = "btn-disabled";
            $('#SubpageTitle').html($Lang === 'ar' ? this.NameAr : this.Name);
        }

        strtemplateBtn +='<div class="d-flex flex-column align-items-center mr-3 ml-3"><a class="' + selected + ' TypeIdClass k-grid-' + this.id + ' icons-tables  button1 spin circle " ><img class="" src="../../assets/images/icon/' + this.Name + '.svg" width="40" height="40"></img>  </a> <span class="title-table mt-1" string="' + this.Name + ' " > ' + ($Lang === 'ar' ? this.NameAr : this.Name) + '</span></div>'
       obj.name = this.id.toString();
    });
   
    obj = { "name": "", template: "" };//"text": "", "className": "" };
    obj.text = 'Group';


    obj.name = 'Group';
    obj.template = strtemplateBtn
    toolBarBtn.push(obj)
    var token = sessionStorage['token'];
    var URL = $URL_ItemGroups + "GetItemGroups";
    var BrandId = sessionStorage['BrandsID'];

    if (BrandId === '' || BrandId === null || BrandId === undefined || BrandId === 'undefined') {

        BrandId = $("#MenuBarBranches").val();
        sessionStorage['BrandsID'] = BrandId;
    }

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: 'Get',
                    url: URL,
                    headers: {
                        Authorization: 'bearer ' + token
                    },
                    async: false,
                    data: { BrandID: BrandId, Lang: $Lang },
                    success: function (data, status, xhr) {

                        sessionStorage['SalesGroupsIcons'] = JSON.stringify(data.datalist.SalesGroupsIcons);
                        options.success(data.datalist.ItemGroups);
                    }
                });

            },
            update: function (options) {
                options.success();
            }
        },
        filter: { field: "TypeID", operator: "eq", value: sessionStorage['TypeID'] },
        pageSize: 25,
        schema: {
            model: {
                id: "ItemGroupID",
                fields: {
                    ItemGroupID: { type: "number" },
                    CreateDate: { type: "date" },
                    CreateDateS: { type: "string" },
                    ItemsIds: { editable: true, defaultValue: [] },
                    ItemsNameAr: { editable: true },
                    ItemsName: { editable: true }
                }
            }
        }
    });

    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: true,
        sortable: true,

        toolbar: toolBarBtn,
        excel: {
            allPages: true
        },
        search: {
            fields: [$Lang === 'ar' ? "ItemsNameAr.join(', ')" : "ItemsName.join(', ')", "CreateDateS", "ItemGroupNum", "ItemGroupName", "ItemGroupNameAr", $Lang === 'ar' ? "StatusNameAr" : "StatusName", "LastName"]
        },
        dataBound: function (e) {
            $('.TypeIdClass').unbind("click");
            $('.TypeIdClass').bind("click", function () {
                $('.TypeIdClass').removeClass("btn-disabled");
                $(this).addClass("btn-disabled");
                var filterValue = 1;
                
                if ($(this).hasClass('k-grid-1')) {
                    filterValue = 1;
                    $('#SubpageTitle').html($(this).parent().find('span').html());
                }
                else if ($(this).hasClass('k-grid-2')) {
                    filterValue = 2;
                    $('#SubpageTitle').html($(this).parent().find('span').html());
                }
                else if ($(this).hasClass('k-grid-3')) {
                    filterValue = 3;
                    $('#SubpageTitle').html($(this).parent().find('span').html());
                }

                sessionStorage['TypeID'] = filterValue;
                valueSearch = $(".k-grid-toolbar .k-grid-search input").val();
                if (valueSearch !== '') {
                    $(".k-grid-toolbar .k-grid-search input").val(valueSearch).trigger("input")
                }
                else {
                    var gridIG = $("#grid").data("kendoGrid");
                    var dataSourceIG = gridIG.dataSource;

                    dataSourceIG.filter(
                        {
                            field: "TypeID",
                            operator: "eq",
                            value: filterValue
                        });

                }

                //gridIG.dataSource.refresh();
                localStorage["kendo-grid-options"] = kendo.stringify(gridIG.getOptions());
            });

            var data = this.dataSource.data();
            if (sessionStorage['TypeID'] !== '3' || (sessionStorage['TypeID'] === '3' && !$addSellingItems)) {
                $.each(data, function (i, row) {
                    $('tr[data-uid="' + row.uid + '"] ').find(".k-hierarchy-cell a").remove();
                });

            }
            else {

                valueSearch = $(".k-grid-toolbar .k-grid-search input").val();
                //var result = data, "NameAr", valueSearch);
                //alert(result);
                if (valueSearch !== '') {
                    var grid = $("#grid").data("kendoGrid");
                    $.each(data, function (i, item) {
                        if (JSON.stringify(item.ItemsNameAr).indexOf(valueSearch) > -1) {
                            var row = $('#' + grid.element.attr('id') + ' tr[data-uid="' + item.uid + '"]')
                            grid.expandRow(row);

                        }
                        else {
                            var row = $('#' + grid.element.attr('id') + ' tr[data-uid="' + item.uid + '"]')
                            grid.collapseRow(row);

                        }
                        $(".k-grid-toolbar .k-grid-search input").focus()

                    });
                }
            }
        },

        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        }, autoBind: true,
        detailInit: detailInit,
        columns: [{
            field: "ItemGroupNum",
            title: DBSTRING['Num'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "ItemGroupName",
            title: DBSTRING['NameEn'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "ItemGroupNameAr",
            title: DBSTRING['NameAr'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: $Lang === 'ar' ? "StatusNameAr" : "StatusName",
            title: DBSTRING['Status'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "CreateDateS",
            title: DBSTRING['CreateDate'],
            //template: "#= kendo.toString(kendo.parseDate(CreateDate, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
            //format: "{0:dd/MM/yyyy}",
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
                    name: 'edit',
                    text: '',
                    className: "btn-primary ",
                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        LoadContentChild('CMItemGroups', data);

                    },
                    visible: function (dataItem) {
                        return $Edit
                    }
                },
                {
                    name: "Delete",
                    text: "<span class='fa fa-trash'>  </span>",
                    className: "btn-danger ",
                    click: function (e) {

                        //add a click event listener on the delete button
                        //   e.preventDefault(); //prevent page scroll reset
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var data = this.dataItem(tr); //get the row data so it can be referred later

                        showConfirmDelete('ItemGroups', 'ItemGroupID', data.ItemGroupID);
                    },
                    visible: function (dataItem) {
                        return $Delete
                    }

                }],

            title:$Add? "<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['New'] + "'> </span>":"",
            width: "260px",
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
    if ( $addSellingItems) {
        $("#grid ").kendoTooltip({
            filter: ".k-hierarchy-cell",
            content: function (e) {
                return DBSTRING['AddSellComp'];
            }
        });
    }
    grid.on("click", ".fa-plus-addNew", function (e) {
        LoadContentChild('CMItemGroups');

    });
}


    
var detailInit = function (e) {
    var detailRow = e.detailRow;
    var model = e.data;
    //model.Names = GetNamesItemsString(model.ItemsIds)
    var template = kendo.template($("#javascriptTemplate").html())
    $("<div  id='Dgrid' />").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                 
                    e.success(model);
                }
            },
            batch: false,
            filter: { field: "ItemGroupID", operator: "eq", value: model.ItemGroupID },
            schema: {
                model: {
                    id: "ItemsIds"
                    ,
                    fields: {
                        ItemsIds: { editable: true },
                        ItemsNameAr: { editable: true },
                        ItemsName: { editable: true }
                    }
                }
            }
        },
        editable: true,
        navigatable: true,
        sortable: false,
        dataBound: function (e) {
            valueSearch = $(".k-grid-toolbar .k-grid-search input").val();

            if (valueSearch === '') {

                var firstCell = e.sender.tbody.find("tr[role='row']:last" + " td:eq(1)");
                e.sender.editCell(firstCell);
            }
        },
        columns: [
            {
                //title: DBSTRING['Barcode'],
                template: DBSTRING['Items'],
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
                title: DBSTRING['Items'] ,
                field: "ItemsIds",
                //template: template(dataItem),
                template: "#=$Lang === 'ar' ?ItemsNameAr.join(', '):ItemsName.join(', ')#",
                //template: function (dataItem) {
                //     //   <li role="option" aria-selected="true" class="k-button" unselectable="on" aria-setsize="3"><span unselectable="on">mohammedItem</span><span aria-hidden="true" unselectable="on" aria-label="delete" title="delete" class="k-select"><span class="k-icon k-i-close"></span></span></li><li role="option" aria-selected="true" class="k-button" unselectable="on" aria-setsize="3"><span unselectable="on">11</span><span aria-hidden="true" unselectable="on" aria-label="delete" title="delete" class="k-select"><span class="k-icon k-i-close"></span></span></li><li role="option" aria-selected="true" class="k-button" unselectable="on" aria-setsize="3"><span unselectable="on">شش</span><span aria-hidden="true" unselectable="on" aria-label="delete" title="delete" class="k-select"><span class="k-icon k-i-close"></span></span></li>
                    
                //    return "<ul>" + kendo.htmlEncode(dataItem.ItemsName.join(', ')) + "</ul>";
                //},
                editor: orgEditor,
                width: "90%",
                height: "200px",
                headerAttributes: {
                    style: "display: none"
                }
            },
            {
                command: [
                    {
                        name: 'Save',
                        text: "<span class='fa fa-save'></span>",
                        className: "btn-primary",
                       // width: '10%',
                        click: function (e) {

                            // e.target is the DOM element which represents the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);

                            SaveItemsGroups(data)

                        }
                    }
                ],
                width: "40px",
                headerAttributes: {
                    style: "display: none"
                },
                attributes: {
                    "class": "Center"
                }
            }
        ]
    }).data("kendoGrid");

}

var GetNamesItemsArray = function (ItemsIds) {
    
   var items = [];
    $.map(ItemsIds, function (x) {
        $.map(list_ItemType , function (element) {
            if (x.toString() === element.ItemID.toString()) {
                $Lang === 'ar' ? items.push(element.ItemNameAr) : items.push(element.ItemName);
            }
        });
    });
  
    return items;
}

var GetNamesItemsString = function (ItemsIds) {

    var items = [];
    $.map(ItemsIds, function (x) {
        $.map(list_ItemType, function (element) {
            if (x.toString() === element.ItemID.toString()) {
                $Lang === 'ar' ? items.push(element.ItemNameAr) : items.push(element.ItemName);
            }
        });
    });
    
    return items.join(', ');
}

function orgEditor(container, options) {
    var dataList = [];
    var DataItemTbl = $('#grid').data('kendoGrid').dataItems();
    var Items = _.pluck(DataItemTbl, 'ItemsIds');
    var FlattenIDs = [];
    $.map(Items, function (n) {
        $.map(n, function (x) {
            FlattenIDs.push(x);
        });
    });
    var AllowDublicateItem = GetConfig(12);//12 allowDublicate
    
        $.map(list_ItemType, function (dataItem) {

            try {

                var searchFound = !AllowDublicateItem ? _.contains(FlattenIDs, dataItem.ItemID) || _.contains(FlattenIDs, dataItem.ItemID.toString()) : false;

                var obj = {
                    'ItemID': "", "ItemName": "", "ItemNameAr": "", "isDeleted": ""
                };

                obj.ItemID = dataItem.ItemID;
                obj.ItemName = dataItem.ItemName;
                obj.ItemNameAr = dataItem.ItemNameAr;
                obj.isDeleted = searchFound ? true : false;
                dataList.push(obj);
            } catch (ex) { this.alert(ex) }
        });
    


    var DataSourceItem = new kendo.data.DataSource({ data: dataList });

    //alert(JSON.stringify(options.model.ItemsIds))
    var MultiSelect = $("<select id='" + options.model.ItemGroupID + "' />")
        .appendTo(container)
        .kendoMultiSelect({
            filter: "contains",
            dataTextField: $Lang === 'ar' ? "ItemNameAr" : "ItemName",
            dataValueField: "ItemID",
            dataSource: DataSourceItem,
            value: options.model.ItemsIds,
            change: function (er) {
                try {
                    var Values = this.value();
                    var dataItem = this.dataItems();
                    options.model.ItemsIds = Values;

                    var ItemsNameAr = [], ItemsName = [];
                    $.map(Values, function (ID) {
                        $.map(dataItem, function (di) {
                            if (ID === di.ItemID) {
                                ItemsName.push(di.ItemName)
                                ItemsNameAr.push(di.ItemNameAr)
                            }
                        });
                    });

                    options.model.ItemsName = ItemsName;
                    options.model.ItemsNameAr = ItemsNameAr;

                }
                catch (dd) {
                    alert(dd)
                }
            },
            minLength: 1,
            noDataTemplate: $("#noDataTemplate").html(),
            select: onSelect,
            template: kendo.template($("#templateItems").html())
        });

    MakeSortableMultiSelectKendo(MultiSelect, options);
}

function onSelect(e) {
    if (e.dataItem.isDeleted) {
        //prevent selection by cancelling the event
        e.preventDefault();
        
        this.setOptions({ autoClose: false });
    }
    else {
        this.setOptions({ autoClose: true });
    }
};

var SaveItemsGroups = function (data) {
    var ListObj = [];
    var obj = {
        "SalesGroupItemsID": "", "SalesGroupID": "", "ItemID": "", "OrderID": "",
        "InsertedBy": ""
    };
 
    data.ItemsIds.forEach(function (item, order) {
        obj = {
            "SalesGroupItemsID": "", "SalesGroupID": "", "ItemID": "", "OrderID": "",
            "InsertedBy": ""
        };

        obj.SalesGroupItemsID = 0;
        obj.SalesGroupID = data.ItemGroupID;
        obj.ItemID = item;
        obj.OrderID = order;
        obj.InsertedBy = sessionStorage['UserId'];
        ListObj.push(obj);
    });

    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Items + "SaveSalesGroupsItems?SalesGroupID=" + data.ItemGroupID + "&Lang=" + Lang;

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
        data: JSON.stringify(ListObj),
        success: function (data) {
            if (data.success === true) {
                $('#ResultMessageIndex').removeClass('alert-danger');
                $('#ResultMessageIndex').addClass('alert-success show');
                $('#ResultTxtIndex').html(data.message);
                setTimeout("$('#ResultMessageIndex').removeClass('show')", 2000);
            }
            else {
                $('#ResultMessageIndex').removeClass('alert-success');
                $('#ResultMessageIndex').addClass('alert-danger show');
                $('#ResultMessageIndex').removeClass('hide');
                $('#ResultTxtIndex').html(data.message);
                setTimeout("$('#ResultMessageIndex').removeClass('show')", 5000);
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
            $('#ResultMessageIndex').addClass('alert-danger show');
            $('#ResultMessageIndex').removeClass('hide');
            $('#ResultTxtIndex').html(msg);
            setTimeout("$('#ResultMessageIndex').removeClass('show')", 5000);
        }
    });
}
function placeholder(element) {
    return $("<li class='list-item' id='placeholder'>" + DBSTRING['DropHere']+"</li>");
}

