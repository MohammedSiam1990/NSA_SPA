
$(document).ready(function () {
    
    FillDBSTRINGPage('BranchesForm');
    // api_call();
    successCallBack('');
    
});


var successCallBack = function (data) {
    
    var token = sessionStorage['token'];
    var URL = $URL_Branches + "GetBranches";
    var BrandId = sessionStorage['BrandsID'];
    var UserID = sessionStorage['UserId'];
    if (BrandId === '' || BrandId === null || BrandId === undefined || BrandId === 'undefined') {
       
        BrandId = $("#MenuBarBranches").val();
        sessionStorage['BrandsID'] = BrandId;
       
    }
    ListPM = [];
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
                    data: { BrandID: BrandId,UserID:UserID, Lang: $Lang },
                    success: function (data, status, xhr) {
                        ListPM = data.datalist.PaymentMethods;
                        options.success(data.datalist.Branches);
                    }
                });
            }
        }
        ,

        pageSize: 25,
        schema: {
            model: {
                id: "BranchID",
                fields: {
                    BranchID: { type: "number" },
                    CreateDate: { type: "date" },
                    CreateDateS: { type: "string" }
                }
            }
        }

    });
    
 //   var selectedRows = sessionStorage['selectedRows'] !== undefined && sessionStorage['selectedRows'] !== null ? JSON.parse(sessionStorage['selectedRows']) : [];
    var selectedItem = sessionStorage['selectedRows'] !== undefined && sessionStorage['selectedRows'] !== null ? sessionStorage['selectedRows'] : '';
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    var toolBar = [{ name: "search", text: DBSTRING['Search'] }];
    $Export = GetPermession(MenuID, 'export');
    $Add = GetPermession(MenuID, 'add');
    $Edit = GetPermession(MenuID, 'edit');

    $viewWorkStation = GetPermession(MenuID, 'viewWorkStation');
    $viewPreparationBranch = GetPermession(MenuID, 'viewPreparationBranch');

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
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        change: function (e, args) {

            var grid = $("#grid").getKendoGrid()
            selectedItem = grid.dataItem(grid.select()).BranchID;
            sessionStorage['selectedRows'] = selectedItem;

        },
        dataBound: function (e) {
            if (sessionStorage['selectedRows']) {

                var dataItem = this.dataSource.get(sessionStorage['selectedRows']);
                this.select($('[data-uid=' + dataItem.uid + ']'));
            }
        },
        excel: {
            allPages: true
        },
        search: {
            fields: [$Lang === 'ar' ? "CityNameAr" : "CityName", "BranchNum", "BranchName", "BranchNameAr", $Lang === 'ar' ? "StatusNameAr" : "StatusName", "LastName"]
        },
        columns: [{
            field: "BranchNum",
            title: DBSTRING['Num'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "BranchName",
            title: DBSTRING['NameEn'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }, {
            field: "BranchNameAr",
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
            field: $Lang === 'ar' ? "CityNameAr" : "CityName",
            title: DBSTRING['City'],
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
                    name: 'edit',
                    text: '',
                    className: "btn-primary",
                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var grid = $("#grid").data("kendoGrid");
                        grid.select(tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        LoadContentChild('CMBranches', data);
                    },
                    visible: function (dataItem) {
                        return (dataItem.StatusID !== $Pending) && $Edit
                        
                    }
                },
                {
                    name: 'Work',
                    text: "<span class='fa fa-tasks'></span>",
                    className: "btn-secondary",

                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var grid = $("#grid").data("kendoGrid");
                        grid.select(tr)

                        // get the data bound to the current table row
                        var data = this.dataItem(tr);

                        LoadContentChild('CMWorkStations', data.WorkStations);
                    },
                    visible: function (dataItem) {
                        return $viewWorkStation

                    }

                },
                {
                    name: 'PreBranch',
                    text: "<span class='fa fa-code-branch'></span>",
                    className: "btn-info",

                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var grid = $("#grid").data("kendoGrid");
                        grid.select(tr)

                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                      
                        LoadContentChild('CMPreBranch', ListPM);
                    },
                    visible: function (dataItem) {
                        return $viewPreparationBranch

                    }
                }

            ],

            title: $Add===true? "<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['New'] + "'> </span>":"",
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
        LoadContentChild('CMBranches');
    });

    $("#grid").kendoTooltip({
        filter: ".k-grid-Work",
        content: function (e) {
            return DBSTRING['WorkStation'];
        }
    });
    $("#grid").kendoTooltip({
        filter: ".k-grid-PreBranch",
        content: function (e) {
            return DBSTRING['PreparationBranch'];
        }
    });

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
