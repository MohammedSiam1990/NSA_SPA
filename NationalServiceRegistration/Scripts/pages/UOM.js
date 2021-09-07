
$(document).ready(function () {
    
    FillDBSTRINGPage('UOMForm');
    successCallBack('');
    
});

var successCallBack = function (data) {
   
    var token = sessionStorage['token'];
    var URL = $URL_UOM + "GetUoms";
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
                    
                        options.success(data.datalist);
                    }
                });

            }
        },
        pageSize: 25
    });
    
    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: true,
        sortable: true,
        toolbar: [{
            name: "search", text: DBSTRING['Search']
        }, {
                text: "<span class='fa fa-plus'></span>",
                className: "btn btn-primary ",
        }],
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        columns: [{
            field: "uomName",
            title: DBSTRING['NameEn'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
                field: "uomNameAr",
            title: DBSTRING['NameAr'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
            }, {
                field: $Lang === 'ar' ? "statusNameAr" : "statusName",
                title: DBSTRING['Status'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            }, {
                field: "createDate",
                title: DBSTRING['CreateDate'],
                template: "#= kendo.toString(kendo.parseDate(createDate, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
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
                        LoadContentChild('CMUOM', data);

                    }
                    }
                
                ],

            title: "",
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
    
    grid.find(".k-grid-toolbar").on("click", ".fa-plus", function (e) {
        LoadContentChild('CMUOM');
    });


}



