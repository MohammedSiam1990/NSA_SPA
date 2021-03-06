
$(document).ready(function () {
    
    //if ($Lang.toLowerCase() === 'ar') {
    //    $("#grid").parent().addClass('k-rtl');
    //}
    //else {
    //    $("#grid").parent().removeClass('k-rtl');
    //}
    FillDBSTRINGPage('BrandsForm');
   // api_call();
    successCallBack('')
});

function api_call() {
    var token = sessionStorage['token'];
    var URL = $URL_Brands + "GetBrands";
    var CompID = sessionStorage['CompanyID'];
    var UserID = sessionStorage['UserId'];
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { UserID: UserID, CompanyID:CompID, Lang: $Lang },
        success: function (data, status, xhr) {
         
            successCallBack(data);
        }
    }).fail(function (xhr, status) {
        if (status === "error") {
            return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
    });
}

var ReloadGrid = function () {
    
    var searchResults = null;
    var token = sessionStorage['token'];
    var URL = $URL_Brands + "GetBrands";
    var CompID = sessionStorage['CompanyID'];
    var UserID = sessionStorage['UserId'];
    $.ajax({
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { UserID: UserID, CompanyID: CompID, Lang: $Lang },
        success: function (result, textStatus, jqXHR) {
            //massage results and store in searchResults
          
            //Kendo grid stuff
            var dataSource = new kendo.data.DataSource({ data: result });
            //var grid = $('#grid').data('kendoGrid');
          
            //dataSource.read();
            try {
                $("#grid").data("kendoGrid").dataSource.data(JSON.parse( result ));
                //grid.dataSource.read();
                //grid.refresh();
                //alert()
            }
            catch (ss) {alert(ss)}
        }
    });

}
var grid;
var successCallBack = function (data) {
 
    var token = sessionStorage['token'];
    var URL = $URL_Brands + "GetBrands";
 
    var CompID = sessionStorage['CompanyID'];
    var UserID = sessionStorage['UserId'];
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
                    data: { UserID: UserID, CompanyID: CompID, Lang: $Lang },
                    success: function (data, status, xhr) {
                       // alert(data.datalist[0].statusName)
                        options.success(data.datalist);
                    }
                });

            },
            destroy: function (options) {
                $.ajax({
                    type: 'Get',
                    url: URL,
                    headers: {
                        Authorization: 'bearer ' + token
                    },
                    async: false,
                    data: { TableNme: 'Brands', TableKey: 'brandId', RowID: '', Lang: $Lang },
                    success: function (data, status, xhr) {
                        alert(JSON.stringify(data))
                        options.success(data.datalist);
                    }
                });

            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "BrandID",
                fields: {
                    BrandID: { type: "number" },
                    CreateDate: { type: "date" },
                    CreateDateS: { type: "string" }
                }
            }
        }
       
    });
   
    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: true,
        sortable: true,

        toolbar: [
           
            {
                name: "search",
                text: DBSTRING['Search']
            },
            {
                name: "excel",
                template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'
            }
            //,{
            //    text: "<span class='fa fa-plus'></span>",
            //    className: "btn btn-primary ",
            //}
        ],
        excel: {
            allPages: true
        },
        editable: false,
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes:$pageSizes
        },
        search: {
            fields: [$Lang === 'ar' ? "ServiceNameAr" : "ServiceName", "BrandName", "BrandNameAr",  $Lang === 'ar' ? "StatusNameAr" : "StatusName", "LastName"]
        },
        dataBound: function () {
            dataView = this.dataSource.view();
            for (var i = 0; i < dataView.length; i++) {
                if (dataView[i].IsDefault === true) {
                    var uid = dataView[i].uid;
                    $("#grid tbody").find("tr[data-uid=" + uid + "]").addClass("green");  //alarm's in my style and we call uid for each row
                }
               
            }
        }
   ,
        columns: [
            {
                field: "BrandName",
                title: DBSTRING['NameEn'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            }, {
                field: "BrandNameAr",
                title: DBSTRING['NameAr'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            },  {
                field: $Lang === 'ar' ? "StatusNameAr" : "StatusName",
                title: DBSTRING['Status'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            }
            , {
                field: $Lang === 'ar' ? "ServiceNameAr" : "ServiceName", //"MajorServiceID",
                title: DBSTRING['MajorService'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            }
            , {
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
                            
                            LoadContentChild('CMBrands', data);
                        },
                        visible: function (dataItem) {
                            return (dataItem.StatusID !== $Pending)
                        }
                    }
                    //, {
                    //    name: "Delete",
                    //    text: "<span class='fa fa-trash'>   </span>",
                    //    className: "btn-danger ",
                    //    click: function (e) {
                    //        //add a click event listener on the delete button
                    //        //   e.preventDefault(); //prevent page scroll reset
                    //        var tr = $(e.target).closest("tr"); //get the row for deletion
                    //        var data = this.dataItem(tr); //get the row data so it can be referred later
                            
                    //        showConfirmDelete('Brands', 'BrandID', data.BrandID);
                            
                    //    },
                    //    visible: function (dataItem) {
                    //        return !(dataItem.IsDefault === true)
                    //    }
                    //}
                ],
                title: "<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['New'] + "'> </span>",
                
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
        LoadContentChild('CMBrands');
    });
}
