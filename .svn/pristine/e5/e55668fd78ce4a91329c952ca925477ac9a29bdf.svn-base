


$(document).ready(function () {
    successCallBack()
    BindingCategoriesGroups()
    FillDBSTRINGPage('ReportsForm');
    
});

var successCallBack = function () {

    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    //$Export = GetPermession(MenuID, 'export');
    //$Add = GetPermession(MenuID, 'add');
    //$Edit = GetPermession(MenuID, 'edit');

    var URL = $URL_ReportPermissions + "GetReportCategories";
    var BrandID = sessionStorage['BrandsID'];
    var RolID = $("#RoleID").val();

    var DSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: 'Get',
                    url: URL,
                    async: false,
                    data: { ModuleID: 1, BrandID: BrandID, RoleID: RolID, Lang: $Lang },
                    success: function (data) {
                        var List = data.datalist.ReportsCategories;
                        if (sessionStorage['IsSuperAdmin'] !== 'true') {
                            
                            List = _.filter(List, function (x) {
                                var perm = false;
                                if (!x.ShowToAdmin) {
                                    perm = GetPermession(MenuID, x.ReportCategoryName, x.ReportCategoryID);
                                }
                                return perm
                            });
                        }
                        
                        options.success(List);
                    }
                });

            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "ReportCategoryID",
                fields: {
                    ReportCategoryID: { type: "number" },
                    ReportCategoryName: { type: "string" },
                    ReportCategoryNameAr: { type: "string" }
                }
            }
        }
    });

    var listView = $("#listViewCategory").kendoListView({
        dataSource: DSource,
        template: kendo.template($("#templateCategory").html()),
        selectable: "single",
        change: function (e) {

            var list = $("#listViewCategoryGroup").data("kendoListView");

            // get ListView selection
            var selectedItems = e.sender.select();
           
            var index = this.select().index(),
                dataItem = this.dataSource.view()[index];
            list.dataSource.data(dataItem.ReportsCategoriesGroups);

            $('.main__cards').each(function (x) {
                if ($(this).html() === '') {
                    $(this).remove()
                }
            })
              
        },
        dataBound: function (e) {
            //var ele = this.element;
            //$(this).parent().addClass('main-overview');
            $("#listViewCategoryGroup").kendoListView()
        }
    });

    listView.find('.k-listview-content').addClass('main-overview')
  
}


var BindingCategoriesGroups = function () {
    try {

        var DS = new kendo.data.DataSource();

        DS.data([]);

        var listView = $("#listViewCategoryGroup").kendoListView({
            dataSource: DS,
            template: kendo.template($("#templateCategoryGroup").html()),
            change: function (e) {
                var index = this.select().index(),
                    dataItem = this.dataSource.view()[index];

            },
            dataBound: function (e) {
                //var ele = this.element;
                //$(this).parent().addClass('main-overview');
                var ele = this.element;
                //alert(JSON.stringify(this.dataSource.view()))
                var dataItem = this.dataSource.view();

                $(".documents", this.element).each(function (i, x) {
                    var dom = $(this);
                    var DSS = new kendo.data.DataSource();
                    var data = [];
                    if (dataItem[i].Report !== undefined) {
                        data = dataItem[i].Report

                        if (sessionStorage['IsSuperAdmin'] !== 'true') {

                            data = _.filter(data, function (x) {
                                var returnValue = false;
                                js = JSON.parse(x.JsonData.replace(/'/g, '"'))
                                _.map(js, function (o) {
                                    if (o.name === 'view') {
                                        returnValue = o.value;
                                    }
                                });
                                
                                return returnValue
                            });
                        }
                    }
                    DSS.data(data)

                    var lReprts = dom.kendoListView({
                        dataSource: DSS,
                        selectable: "single",
                        template: kendo.template($("#templateReports").html()),
                        change: function (e) {
                            $('.k-state-selected').not(this.select()).removeClass('k-state-selected');
                            var index = this.select().index(),
                                dataItem = this.dataSource.view()[index];
                            sessionStorage['ReportURL'] = dataItem.ReportAPIURL
                            LoadContentChild('CMReports');
                        }
                    });
                    lReprts.find('.k-listview-content').addClass('documents')
                });
            }
        });

        listView.find('.k-listview-content').addClass('main__cards')
        // get a reference to the ListView widget
        var listViews = $("#listViewCategory").data("kendoListView");
        // selects first ListView item
        listViews.select(listViews.content.children().first());
    }
    catch (ex) {
        alert(ex)
    }
}




