

$(document).ready(function () {
    
    FillDBSTRINGPage('SupplierForm');
    successCallBack('');

});

var successCallBack = function (x) {

    var token = sessionStorage['token'];
    var URL = $URL_Supplier + "GetSupplier";
    var CompanyID = sessionStorage['CompanyID'];

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
                    data: { CompanyID: CompanyID, Lang: $Lang },
                    success: function (data) {
                       
                        options.success(data.datalist.Supplier);
                    }
                });
            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "SupplierID",
                fields: {
                    SupplierID: { type: "number" },
                    CreateDate: { type: "date" },
                    SupplierName: { type: "string" },
                    SupplierNameAr: { type: "string" },
                    CreateDateS: { type: "string" }
                }
            }
        }
    });

    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $Export = GetPermession(MenuID, 'export');
    $Add = GetPermession(MenuID, 'add');
    $Edit = GetPermession(MenuID, 'edit');

    var toolBarBtn = [];
    toolBarBtn.push({
        name: "search", text: DBSTRING['Search']
    });
    if ($Export) {
        toolBarBtn.push({
            name: "excel", template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'//k-state-disabled
        });
    }

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
            fields: ["CreateDateS", "SupplierName", "SupplierNameAr", $Lang === 'ar' ? "StatusNameAr" : "StatusName"]
        },
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        columns: [{
            field: "SupplierNum",
            title: DBSTRING['Num'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "SupplierName",
            title: DBSTRING['NameEn'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
                field: "SupplierNameAr",
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
            field: $Lang === 'ar' ? "StatusNameAr" : "StatusName",
            title: DBSTRING['Status'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        {
            field: "CreateDate",
            title: DBSTRING['CreateDate'],
            format: "{0:dd/MM/yyyy}",
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
                        
                        LoadContentChild('CMSuppliers', data);
                    },
                    visible: function (dataItem) {
                        return $Edit
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
        LoadContentChild('CMSuppliers');
    });
    //var gridIG = $("#grid").data("kendoGrid");
    //var dataSourceIG = gridIG.dataSource;
    //var filter = SetFilterCustBtn();
    //dataSourceIG.filter(filter);

}

var dataBound_Grid = function (e) {
  
    //$('.TypeIdClass').unbind("click");
    //$('.TypeIdClass').bind("click", function () {
    //    $('.TypeIdClass').removeClass("btn-disabled");
    //    $(this).addClass("btn-disabled");
    //    var filterValue = 1;

    //    if ($(this).hasClass('k-grid-1')) {
    //        filterValue = 1;
    //        $('#pageTitle').html($(this).parent().find('span').html());
    //    }
    //    else if ($(this).hasClass('k-grid-2')) {
    //        filterValue = 2;
    //        $('#pageTitle').html($(this).parent().find('span').html());
    //    }
        


    //    sessionStorage['CustTypeID'] = filterValue;
    //    valueSearch = $(".k-grid-toolbar .k-grid-search input").val();
    //    if (valueSearch !== '') {
    //        $(".k-grid-toolbar .k-grid-search input").val(valueSearch).trigger("input")
    //    }
    //    else {

    //        var gridIG = $("#grid").data("kendoGrid");
    //        var dataSourceIG = gridIG.dataSource;

    //        dataSourceIG.filter(
    //            {
    //                field: "CustTypeID",
    //                operator: "eq",
    //                value: filterValue
    //            });

    //        //var gridIG = $("#grid").data("kendoGrid");
    //        //var dataSourceIG = gridIG.dataSource;
    //        //var filter = SetFilterItemBtn();
    //        //dataSourceIG.filter(filter);
    //    }
    //});

   
    //if (sessionStorage['selectedRows']) {

    //    var dataItem = this.dataSource.get(sessionStorage['selectedRows']);
    //    this.select($('[data-uid=' + dataItem.uid + ']'));
    //}

    

}
