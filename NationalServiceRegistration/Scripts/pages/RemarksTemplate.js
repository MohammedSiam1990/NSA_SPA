
$(document).ready(function () {
    FillDBSTRINGPage('RemarksTemplateForm');
    successCallBack('');

});

var successCallBack = function (data) {

    var token = sessionStorage['token'];
    var BrandID = sessionStorage['BrandsID'];



    try {



        var URL = $URL_RemarksTemplate + "GetRemarksTemplates?BrandID=" + BrandID + '&Lang=' + $Lang;
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
            pageSize: 25,
            schema: {
                model: {
                    id: "RemarksTemplateID",
                    fields: {
                        RemarksTemplateID: { type: "number" },
                        CreateDate: { type: "date" },
                        CreateDateS: { type: "string" }
                    }
                }
            }
        });

        var selectedItem = sessionStorage['selectedRows'] !== undefined && sessionStorage['selectedRows'] !== null ? sessionStorage['selectedRows'] : '';
        var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
        var toolBar = [{ name: "search", text: DBSTRING['Search'] }];
        $Export = GetPermession(MenuID, 'export');
        $Add = GetPermession(MenuID, 'add');
        $Edit = GetPermession(MenuID, 'edit');
        $Delete = GetPermession(MenuID, 'delete');

        if ($Export) {
            toolBar.push({ name: "excel", template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>' })
        };

        grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            height: 550,
            groupable: true,
            sortable: true,
            selectable: true,
            toolbar: toolBar,
            excel: {
                allPages: true
            },
            search: {
                fields: ["CreateDateS", "RemarksTemplateName", "RemarksTemplateNameAr", $Lang === 'ar' ? "StatusNameAr" : "StatusName", "LastName"]
            },
            change: function (e, args) {

                var grid = $("#grid").getKendoGrid()
                selectedItem = grid.dataItem(grid.select()).RemarksTemplateID;

                sessionStorage['selectedRows'] = selectedItem;

            },
            dataBound: function (e) {
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
                field: "RemarksTemplateName",
                title: DBSTRING['NameEn'],
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            }, {
                field: "RemarksTemplateNameAr",
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
            },
            {
                field: "CreateDate",
                title: DBSTRING['CreateDate'],
                template: "#= kendo.toString(kendo.parseDate(CreateDate, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
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
                        name: 'edit',

                        text: '',
                        className: "btn btn-primary ",
                        click: function (e) {
                            // e.target is the DOM element which represents the button
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            var grid = $("#grid").data("kendoGrid");
                            grid.select(tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            sessionStorage['LastEditPage'] = JSON.stringify(data);
                            LoadContentChild('CMRemarksTemplate', data);
                        },
                        visible: function (dataItem) {
                            return $Edit

                        }
                    },

                    {
                        name: "Delete",
                        text: "<span class='fa fa-trash'></span>",
                        className: "btn-danger ",
                        click: function (e) {

                            //add a click event listener on the delete button
                            //   e.preventDefault(); //prevent page scroll reset
                            var tr = $(e.target).closest("tr"); //get the row for deletion

                            var data = this.dataItem(tr); //get the row data so it can be referred later

                            showConfirmDelete('RemarksTemplate', 'RemarksTemplateID', data.RemarksTemplateID);
                        },
                        visible: function (dataItem) {
                            return  $Delete

                        }

                    }
                ],

                title: $Add?"<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['New'] + "'> </span>":"",
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
            LoadContentChild('CMRemarksTemplate');
        });
        grid.find(".k-grid-toolbar").on("click", ".fa-refresh", function (e) {
            LoadContent('RemarksTemplate');
        });



    } catch (e) {
        alert(e);
    }
}




var ImageChange = function (input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
            $('#lblImage').html(input.files[0].name)
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function validFrm() {
    if ($('.error-message').length === 0)
        return true;
    else
        return false;
}


