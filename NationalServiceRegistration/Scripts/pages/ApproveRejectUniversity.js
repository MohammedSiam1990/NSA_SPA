
$(document).ready(function () {

    /*    FillDBSTRINGPage('ApproveRejectUniversityForm');*/
    successCallBack('');

});

var successCallBack = function (data) {

    var token = sessionStorage['token'];
    var URL = $URL_ApproveRejectUniversity + "GetProUniversitysAll";

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
                    data: { Lang: $Lang },
                    success: function (data, status, xhr) {
                        options.success(data.datalist);
                        /* alert(JSON.stringify(data.datalist))*/
                    }
                });
            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "universityId",
                fields: {
                    universityId: { type: "number" },
                    CreateDate: { type: "date" },
                    CreateDateS: { type: "string" },
                }
            }
        }
    });
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    var toolBar = [{ name: "search", text: DBSTRING['Search'] }];
    $Export = GetPermession(MenuID, 'export');
    $Add = GetPermession(MenuID, 'add');
    $Edit = GetPermession(MenuID, 'edit');


    if ($Export) {
        toolBar.push({ name: "excel", template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>' })
    };
    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: true,
        sortable: true,
        toolbar: toolBar,
        excel: {
            allPages: true
        },
        search: {
            fields: ["CreateDateS", "UniversityId", "UniversityQID","UniversityNameAr", $Lang === 'ar' ? "StatusNameAr" : "StatusName", "LastName"]
        },
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },

        columns: [

            {
                field: "UniversityId",
                title: DBSTRING['OrderNum'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            },
            {
                field: "UniversityQID",
                title: DBSTRING['QID'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            }, {
                field: "UniversityNameAr",
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
                            LoadContentChild('University', data);

                        },
                        visible: function (dataItem) {
                            return $Edit

                        }
                    }

                ],

                /*       title: $Add === true ? "<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['New'] + "'> </span>" : "",*/
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

    //grid.on("click", ".fa-plus-addNew", function (e) {
    //    LoadContentChild('University');
    //});


}

