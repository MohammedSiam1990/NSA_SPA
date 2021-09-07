
$(document).ready(function () {
  
    FillDBSTRINGPage('RolesForm');
    successCallBack('');
    
});

var successCallBack = function (data) {
   
    var token = sessionStorage['token'];
    var URL = $URL_Roles + "GetRole";
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
                    data: { companyId: CompanyID, Lang: $Lang },
                    success: function (data, status, xhr) {
                       
                        options.success(data.datalist.Role);
                    }
                });
            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "Id",
                fields: {
                    id: { type: "number" }
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
            { name: "search", text: DBSTRING['Search'] },
            {
                name: "excel", template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'
            }
        ],
        excel: {
            allPages: true
        },
        search: {
            fields: ["CreateDateS", "Name", "NameAr"]
        },
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        columns: [{
            field: "Name",
            title: DBSTRING['NameEn'],
            width: "260px",
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
                width: "260px",
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
            },
             {
                field: "CreateDateS",
                width: "150px",
                title: DBSTRING['CreateDate'],

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
                        
                        LoadContentChild('CMRoles', data);
                    }
                }
            ],

            title: "<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['New'] + "'> </span>",
            width: "120px",
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
        LoadContentChild('CMRoles');
    });


}



