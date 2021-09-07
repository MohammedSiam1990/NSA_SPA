
$(document).ready(function () {
    sessionStorage['TypeID'] = '';
    sessionStorage['selectedRows'] = '';
    FillDBSTRINGPage('ItemsForm');
    successCallBack('');

});





var successCallBack = function (data) {

    var token = sessionStorage['token'];

    var BrandID = sessionStorage['BrandsID'];

    var URL = $URL_Items + "GetItems?BrandID=" + BrandID + '&Lang=' + $Lang;
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
                    success: function (data, status, xhr) {

                        options.success(data.datalist);
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
                        alert(msg)
                    }
                });
            }

        },
        filter: {
            field: "StatusID",
            operator: "eq",
            value: $('#sel-checkbox').is(':checked') ? 8 : 7
        },
        pageSize: 25,
        schema: {
            model: {
                id: "ItemID",
                fields: {
                    ItemID: { type: "number" },
                    CreateDate: { type: "date" },
                    CreateDateS: { type: "string" }
                }
            }
        }
    });

    var selectedItem = sessionStorage['selectedRows'] !== undefined && sessionStorage['selectedRows'] !== null ? sessionStorage['selectedRows'] : '';
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    var toolBarBtn = [];
    toolBarBtn.push({
        name: "search", text: DBSTRING['Search']
    });

    $Export = GetPermession(MenuID, 'export');
    $Add = GetPermession(MenuID, 'add');
    $Edit = GetPermession(MenuID, 'edit');
    $Delete = GetPermession(MenuID, 'delete');
    $viewSellingComponents = GetPermession(MenuID, 'viewSellingComponents');
    $viewManComponents = GetPermession(MenuID, 'viewManComponents');
    $editSellingComponents = GetPermession(MenuID, 'editSellingComponents');
    $editManComponents = GetPermession(MenuID, 'editManComponents');

    if ($Export) {
        toolBarBtn.push({
            name: "excel", template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'//k-state-disabled
        });
    }
    var obj = { "text": "" };
   
    var list_ItemComponentType = GetLookup('Lookups');//ItemComponentType
    list_ItemComponentType = list_ItemComponentType.filter(function (el) {
        return el.StatusID === $ItemComponentType
    });

    if (sessionStorage['TypeID'] === undefined || sessionStorage['TypeID'] === '') {
        sessionStorage['TypeID'] = 0
    }

    var strtemplateBtn = '<div id="DivBtn" class="div-icons">';
    $.each(list_ItemComponentType, function () {
        var isTrue =false,  selected = '';
       
        if (this.Name === 'Selling Components') {
            isTrue = $viewSellingComponents
        }
        else if (this.Name === 'Man Components') {
            isTrue = $viewManComponents
        }

        if (isTrue)
            strtemplateBtn += '<div class="d-flex flex-column align-items-center abs-icons  mr-3 ml-3"><a  class="' + selected + ' FilterClass k-grid-' + this.id + ' icons-tables icons-tables  button1 spin circle" ><img class="" src="../../assets/images/icon/' + this.Name + '.svg" width="40" height="40"></img></a> <span class="title-table mt-1" string="' + this.NameAr + ' " > ' + ($Lang === 'ar' ? this.NameAr : this.Name) + '</span></div>';
    });

   strtemplateBtn +='<input id = "sel-checkbox" class= "FilterClass" type = checkbox />&nbsp; ' + DBSTRING['InActive'] + '</div>'

     obj = { "name": "", template: "" };
     obj.text = 'Group';


    obj.name = 'Group';
    obj.template = strtemplateBtn
    toolBarBtn.push(obj)


    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: true,
        sortable: true,
        selectable: true,
        toolbar: toolBarBtn

        ,
        excel: {
            allPages: true
        },
        search: {
            fields: [' SalesGroupsName.join(", ")',$Lang === 'ar' ? "ItemTypeNameAr" : "ItemTypeName", $Lang === 'ar' ? "DeplartmentNameAr" : "DeplartmentName", "ItemNum", "ItemName", "ItemNameAr", $Lang === 'ar' ? "ItemGroupNameAr" : "ItemGroupName", "LastName"]
        },
        change: function (e, args) {

            var grid = $("#grid").getKendoGrid()
            selectedItem = grid.dataItem(grid.select()).ItemID;

            sessionStorage['selectedRows'] = selectedItem;

        },
        dataBound: function (e) {
            $('.FilterClass').unbind("click");
            $('.FilterClass').bind("click", function () {
                $('#SubpageTitle').parent().show();
                sessionStorage['selectedRows'] = '';
                if (!$(this).is(':checkbox')) {
                    $('.FilterClass').not(this, ' input:checkbox').removeClass("btnActive");

                    $(this).not(' input:checkbox').toggleClass("btnActive");
                }
                if (sessionStorage['TypeID'] === undefined || sessionStorage['TypeID'] === null) {
                    sessionStorage['TypeID'] = 0;
                }
                var filterValue = $(this).is(':checkbox') ? sessionStorage['TypeID'] : 0;
                if ($(this).hasClass('k-grid-1') && $(this).hasClass('btnActive')) {
                    filterValue = 1;
                    $('#SubpageTitle').html($(this).parent().find('span').html());
                }
                else if ($(this).hasClass('k-grid-2') && $(this).hasClass('btnActive')) {
                    filterValue = 2;
                    $('#SubpageTitle').html($(this).parent().find('span').html());
                }
                else {
                    $('#SubpageTitle').parent().hide();
                }
                sessionStorage['TypeID'] = filterValue;
                
                valueSearch = $(".k-grid-toolbar .k-grid-search input").val();
                if (valueSearch !== '') {
                    $(".k-grid-toolbar .k-grid-search input").val(valueSearch).trigger("input")
                }
                else {
                    var gridIG = $("#grid").data("kendoGrid");
                    var dataSourceIG = gridIG.dataSource;
                    var filter = SetFilterItemBtn();
                    dataSourceIG.filter(filter);
                }
            });

            if (sessionStorage['selectedRows']) {

                var dataItem = this.dataSource.get(sessionStorage['selectedRows']);
                this.select($('[data-uid=' + dataItem.uid + ']'));
            }

        },
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        columns: [{
            field: "ItemNum",
            title: DBSTRING['Num'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "ItemName",
            title: DBSTRING['NameEn'],
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
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        {
            field: $Lang === 'ar' ? "ItemTypeNameAr" : "ItemTypeName",
            title: DBSTRING['ItemType'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        {
            field: $Lang === 'ar' ? "DeplartmentNameAr" : "DeplartmentName",
            title: DBSTRING['Department'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        {
            field: $Lang === 'ar' ? "ItemGroupNameAr" : "ItemGroupName",
            title: DBSTRING['Group'],
       
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
            {
                field: "SalesGroupsName",
                title: DBSTRING['SalesGroup'],
                width: "200px",
                template: "#= SalesGroupsName.join(', ') #",
                "groupable": false,
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
                    name: 'ItemsComp',
                    text: "<span class='fa fa-object-group'></span>",
                    className: "btn-primary ",
                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var grid = $("#grid").data("kendoGrid");
                        grid.select(tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        sessionStorage['LastEditPage'] = JSON.stringify(data);
                        LoadContentChild('CMItemComponents', data);
                    },
                    visible: function (dataItem) {
                        var Show=false, ItemsFilter = $('.btnActive').length;
                        if (sessionStorage['TypeID'] === '1')
                            Show = $editSellingComponents;
                        else if (sessionStorage['TypeID'] === '2') {
                            Show = $editManComponents;
                        }
                        return (ItemsFilter > 0) && Show
                    }
                }
                ,
                {
                    name: 'edit',

                    text: '',
                    className: "btn-primary ",
                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var grid = $("#grid").data("kendoGrid");
                        grid.select(tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        sessionStorage['LastEditPage'] = JSON.stringify(data);
                        LoadContentChild('CMItems', data);
                    },
                    visible: function (dataItem) {
                        var ItemsFilter = $('.btnActive').length;
                        return (ItemsFilter === 0) && $Edit
                    }
                }
                ,
                {
                    name: "Delete",
                    text: "<span class='fa fa-trash'></span>",
                    className: "btn-danger ",
                    click: function (e) {

                        //add a click event listener on the delete button
                        //   e.preventDefault(); //prevent page scroll reset
                        var tr = $(e.target).closest("tr"); //get the row for deletion

                        var data = this.dataItem(tr); //get the row data so it can be referred later

                        showConfirmDelete('Item', 'ItemID', data.ItemID);
                    },
                    visible: function (dataItem) {
                        var ItemsFilter = $('.btnActive').length;
                        return (ItemsFilter === 0) && $Delete
                    }
                }
            ],

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

    grid.on("click", ".fa-plus-addNew", function (e) {
        LoadContentChild('CMItems');
    });

    $("#grid").kendoTooltip({
        filter: ".k-grid-ItemsComp",
        content: function (e) {
            return DBSTRING['ItemsComp'];
        }
    });
}

var SetFilterItemBtn = function () {
    var filterValue = parseInt(sessionStorage['TypeID']);
    var filter = {};
    if (filterValue === 1) {

        filter =
        {
            logic: "and",
            filters: [
                {
                    logic: "or",
                    filters: [
                        {
                            field: "ItemTypeID",
                            operator: "eq",
                            value: 3
                        },
                        {
                            field: "ItemTypeID",
                            operator: "eq",
                            value: 4
                        }
                    ]
                },
               
                {
                    field: "StatusID",
                    operator: "eq",
                    value: $('#sel-checkbox').is(':checked') ? 8 : 7
                }
            ]
        }
    }
    else if (filterValue === 2) {
        filter =
        {
            logic: "and",
            filters: [
                {
                    field: "ItemTypeID",
                    operator: "eq",
                    value: 2
                },
                
                {
                    field: "StatusID",
                    operator: "eq",
                    value: $('#sel-checkbox').is(':checked') ? 8 : 7
                }
            ]
        }
    }
    else {
        filter =
        {
            logic: "and",
            filters: [
                {
                    field: "StatusID",
                    operator: "eq",
                    value: $('#sel-checkbox').is(':checked') ? 8 : 7

                }
            ]
        }
    }
    return filter;
}

