
$(document).ready(function () {
    sessionStorage['CustTypeID'] = '';
    sessionStorage['selectedRows'] = '';
    FillDBSTRINGPage('CustomerForm');
    successCallBack('');

});

var successCallBack = function (data) {

    var token = sessionStorage['token'];
    var URL = $URL_Customer + "GetCustomer";
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


                        options.success(data.datalist.Customer);
                        var i;
                        var TypeIDs = [];
                        var GenderIDs = [];
                        for (i = 0; i < data.datalist.Customer.length; i++) {

                             
                            if (data.datalist[i].GenderID !== null) {
                                GenderIDs.push(data.datalist.Customer[i].GenderID)
                            }
                        }
                        
                        localStorage.setItem("GenderIDs", GenderIDs); 

                    }
                });
            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "CustomerID",
                fields: {
                    CustomerID: { type: "number" },
                    CreateDate: { type: "date" },
                    CreateDateS: { type: "string" },
                }
            }
        }
    });
   

    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $viewCustomers = GetPermession(MenuID, 'viewCustomers');
    $viewCompanies = GetPermession(MenuID, 'viewCompanies');
    $exportCustomers = GetPermession(MenuID, 'exportCustomers');
    $exportCompanies = GetPermession(MenuID, 'exportCompanies');
    $addCustomers = GetPermession(MenuID, 'addCustomers');
    $addCompanies = GetPermession(MenuID, 'addCompanies');
    $editCustomers = GetPermession(MenuID, 'editCustomers');
    $editCompanies = GetPermession(MenuID, 'editCompanies');
    $editCompanies = GetPermession(MenuID, 'editCompanies');
    $viewAddressCustomers = GetPermession(MenuID, 'viewAddressCustomers');
    $viewAddressCompanies = GetPermession(MenuID, 'viewAddressCompanies');
    if ((sessionStorage['CustTypeID'] === undefined || sessionStorage['CustTypeID'] === null ||
        sessionStorage['CustTypeID'] === '0' || sessionStorage['CustTypeID'] === '' )) {
        sessionStorage['CustTypeID'] = $viewCustomers ? 1 : $viewCompanies ? 2 : -1;
    }
    
    var toolBarBtn = [];
    toolBarBtn.push({
        name: "search", text: DBSTRING['Search']
    });
        toolBarBtn.push({
            name: "excel", template: '<div class="d-flex-grid-excel d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="k-grid-excel title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'//k-state-disabled
        });
    

    var obj = { "text": "" };

    var list_CustomerTypes = GetLookup('Lookups');//ItemComponentType
    list_CustomerTypes = list_CustomerTypes.filter(function (el) {
        return el.StatusID === $CustomerTypes
    });

    var strtemplateBtn = '<div id="DivBtn2" class="div-icons">';
    $.each(list_CustomerTypes, function () {
        var isTrue = false, selected = ''; 
        if (this.Name === 'Customers') {
            isTrue = $viewCustomers;
        }
        else if (this.Name === 'Companies') {
            isTrue = $viewCompanies;
        }

        
        if (this.id.toString() === sessionStorage['CustTypeID'].toString()) {
            selected = "btn-disabled";
            $('#pageTitle').html($Lang === 'ar' ? this.NameAr : this.Name);
            //obj.className = "btnActive";
        }

        if (isTrue)
            strtemplateBtn += '<div class=" d-flex flex-column align-items-center mr-3 ml-3"><a class="' + selected + ' TypeIdClass k-grid-' + this.id + ' icons-tables  button1 spin circle " ><img class="" src="../../assets/images/icon/' + this.Name + '.svg" width="40" height="40"></img>  </a> <span class="title-table mt-1"  > ' + ($Lang === 'ar' ? this.NameAr : this.Name) + '</span></div>';
        
    });
    obj = { "name": "", template: "" };//"text": "", "className": "" };
    obj.text = 'Group';

    obj.name = 'Group';
    obj.template = strtemplateBtn
    toolBarBtn.push(obj)

    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: true,
        sortable: true,
        change: function (e, args) {

            var grid = $("#grid").getKendoGrid()
            selectedItem = grid.dataItem(grid.select()).ItemID;

            sessionStorage['selectedRows'] = selectedItem;

        },
        toolbar: toolBarBtn,

        dataBound: function (e) {
            dataBound_Grid(e); 
        }, 
        
        excel: {
            allPages: true
        },
        search: {
            fields: ["CreateDateS", "CustomerName",  ($Lang === 'ar' ? "TypeNameAr" : "TypeName"), $Lang === 'ar' ? "StatusNameAr" : "StatusName", "LastName"]
        },
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        columns: [{
            field: "CustomerName",
            title: DBSTRING['lblCustomerName'] ,
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        //    {
        //    field: "CustomerNameAr",
        //    title: DBSTRING['NameAr'],
        //    headerAttributes: {
        //        "class": "Center",
        //        style: "text-align: center;"
        //    },
        //    attributes: {
        //        "class": "Center"
        //    }
        //},

        {
            field: $Lang === 'ar' ? "TypeNameAr" : "TypeName",
            title: DBSTRING['Types'],
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
                        sessionStorage['CustTypeID'] = data.CustTypeID 
                        LoadContentChild('CMCustomer', data);
                    },
                    visible: function (dataItem) {
                       
                        var Show = false, ItemsFilter = $('.btnActive').length;
                        if ((sessionStorage['CustTypeID'] === '1' && $editCustomers)) {
                            Show = $editCustomers
                        }
                        else if ((sessionStorage['CustTypeID'] === '2' && $editCompanies)) {
                            Show = $editCompanies
                        }
                        return  Show
                    }
                }, 
                {
                    name: 'Address',
                    text: "<span class='fa fa-code-branch'></span>",
                    className: "btn-info",

                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var grid = $("#grid").data("kendoGrid");
                        grid.select(tr)

                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        LoadContentChild('CMAddress', data);
                    },
                    visible: function (dataItem) {

                        var Show = false, ItemsFilter = $('.btnActive').length;
                        if ((sessionStorage['CustTypeID'] === '1' && $viewAddressCustomers)) {
                            Show = $viewAddressCustomers
                        }
                        else if ((sessionStorage['CustTypeID'] === '2' && $viewAddressCompanies)) {
                            Show = $viewAddressCompanies
                        }
                        return Show
                    }
                }
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
        LoadContentChild('CMCustomer');
    });
    var gridIG = $("#grid").data("kendoGrid");
    var dataSourceIG = gridIG.dataSource;
    var filter = SetFilterCustBtn();
    dataSourceIG.filter(filter);

}

var dataBound_Grid = function (e) {
    if (sessionStorage['CustTypeID'] === '-1') {
        $('.k-grid-excel').hide();
        $('.fa-plus-addNew').hide();
    }
    else if ((sessionStorage['CustTypeID'] === '1' && !$exportCustomers)) {
        $('.k-grid-excel').hide()

    }
    else if ((sessionStorage['CustTypeID'] === '2' && !$exportCompanies)) {
        $('.k-grid-excel').hide()
    }
    else {
        $('.k-grid-excel').show()
    }

    if ((sessionStorage['CustTypeID'] === '1' && !$addCustomers)) {
        $('.fa-plus-addNew').hide()

    }
    else if ((sessionStorage['CustTypeID'] === '2' && !$addCompanies)) {
        $('.fa-plus-addNew').hide()
    }
    else {
        $('.fa-plus-addNew').show()
    }

    $('.TypeIdClass').unbind("click");
    $('.TypeIdClass').bind("click", function () {
        $('.TypeIdClass').removeClass("btn-disabled");
        $(this).addClass("btn-disabled");
        var filterValue = -1;

        if ($(this).hasClass('k-grid-1')) {
            filterValue = 1;
            $('#pageTitle').html($(this).parent().find('span').html());
            $("#grid thead [data-field=CustomerName] .k-link").html(DBSTRING['lblCustomerName'])
        }
        else if ($(this).hasClass('k-grid-2')) {
            filterValue = 2;
            $('#pageTitle').html($(this).parent().find('span').html());
            $("#grid thead [data-field=CustomerName] .k-link").html(DBSTRING['lblCompanyName'])
        }
        else {

            filterValue = -1;
        }

        sessionStorage['CustTypeID'] = filterValue;
        valueSearch = $(".k-grid-toolbar .k-grid-search input").val();
        if (valueSearch !== '') {
            $(".k-grid-toolbar .k-grid-search input").val(valueSearch).trigger("input")
        }
        else {

            var gridIG = $("#grid").data("kendoGrid");
            var dataSourceIG = gridIG.dataSource;

            dataSourceIG.filter(
                {
                    field: "CustTypeID",
                    operator: "eq",
                    value: filterValue
                });
        }
    });

    if (sessionStorage['selectedRows']) {
        var dataItem = this.dataSource.get(sessionStorage['selectedRows']);
        this.select($('[data-uid=' + dataItem.uid + ']'));
    }
}

var SetFilterCustBtn = function () {
   
    var filterValue = parseInt(sessionStorage['CustTypeID']);
    var filter = {};
//    if (filterValue === 1) {

        filter =
        {
            logic: "and",
            filters: [
                {
                    field: "CustTypeID",
                    operator: "eq",
                    value: filterValue
                }
            ]
        }
    //}
    //else if (filterValue === 2) {
    //    filter =
    //    {
    //        logic: "and",
    //        filters: [
    //            {
    //                field: "CustTypeID",
    //                operator: "eq",
    //                value: 2
    //            }
    //        ]
    //    }
    //}
    //else {
    //    filter =
    //    {
    //        logic: "and",
    //        filters: [
    //            {
    //                field: "CustTypeID",
    //                operator: "eq",
    //                value: 1
    //            }
    //        ]
    //    }
    //}  


    return filter;
}

