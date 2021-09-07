
$(document).ready(function () {
    
    FillDBSTRINGPage('PriceTemplateForm');
    successCallBack('');
    
});

var successCallBack = function (data) {
   
    if (sessionStorage['TypeID'] === undefined || sessionStorage['TypeID'] === null ||
        sessionStorage['TypeID'] === '0' || sessionStorage['TypeID'] === '' || '1,2'.indexOf(sessionStorage['TypeID'])===-1) {
        sessionStorage['TypeID'] = 1
    }

    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $ViewPrices = GetPermession(MenuID, 'viewPrices');
    $ExportPrices = GetPermession(MenuID, 'exportPrices');
    $AddPrices = GetPermession(MenuID, 'addPrices');
    $EditPrices = GetPermession(MenuID, 'editPrices');
    $ViewDiscounts = GetPermession(MenuID, 'viewDiscounts');
    $ExportDiscounts = GetPermession(MenuID, 'exportDiscounts');
    $AddDiscounts = GetPermession(MenuID, 'addDiscounts');
    $EditDiscounts = GetPermession(MenuID, 'editDiscounts');


    var toolBarBtn = [];
    toolBarBtn.push({
        name: "search", text: DBSTRING['Search'], className: "k-searchFilter"
    });

    if (!$ViewPrices && !$ViewDiscounts) {
        sessionStorage['TypeID'] = -1
    } else {
        $('#SubpageTitle').parent().show();
       
    }
    toolBarBtn.push({
        name: "excel", template: '<div class="d-flex-grid-excel d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="k-grid-excel title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'//k-state-disabled
    });
    var strtemplateBtn = '<div id="DivBtn2" class="div-icons">';

    var selected = '';
    if ($ViewPrices) {
        if ('1' === sessionStorage['TypeID'].toString()) {
            selected = "btn-disabled";
            $('#SubpageTitle').html(DBSTRING['Price'])
        }
        strtemplateBtn += '<div class="d-flex flex-column align-items-center mr-3 ml-3"><a class="' + selected + ' TypeIdClass k-grid-1  icons-tables  button1 spin circle " ><img class="" src="../../assets/images/icon/Price.svg" width="40" height="40"></img>  </a> <span class="title-table mt-1"  > ' + DBSTRING['Price'] + '</span></div>'
    }
    selected = '';
    if ($ViewDiscounts) {
        if ('2' === sessionStorage['TypeID'].toString()) {
            selected = "btn-disabled";
            $('#SubpageTitle').html(DBSTRING['Discount'])
        }
        strtemplateBtn += '<div class="d-flex flex-column align-items-center mr-3 ml-3"><a class="' + selected + ' TypeIdClass k-grid-2  icons-tables  button1 spin circle " ><img class="" src="../../assets/images/icon/Discount.svg" width="40" height="40"></img>  </a> <span class="title-table mt-1"  > ' + DBSTRING['Discount'] + '</span></div>'
    }    
    
    obj = { "name": "", template: "" };//"text": "", "className": "" };
    obj.text = 'Group';
    obj.name = 'Group';
    obj.template = strtemplateBtn
    toolBarBtn.push(obj)

    var token = sessionStorage['token'];
    var URL = $URL_PriceTemplate + "GetPriceTemplate";
    var BrandID = sessionStorage['BrandsID'];
    
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
                    data: { BrandID: BrandID, Lang: $Lang },
                    success: function (data, status, xhr) {
                        //alert(JSON.stringify( data.datalist))
                        options.success(data.datalist.PriceTemplate);
                    }
                });
            }
        },
        pageSize: 25,
        filter: { field: "TypeID", operator: "eq", value: sessionStorage['TypeID'] },
        schema: {
            model: {
                id: "PriceTemplateID",
                fields: {
                    TaxID: { type: "number" },
                    CreateDate: { type: "date" },
                    Name: { type: "string" },
                    NameAr: { type: "string" },
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
        toolbar: toolBarBtn,
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
        dataBound: function (e) {
            try {
                if (sessionStorage['TypeID'].toString() === '-1') {
                    $('.k-grid-excel').hide();
                    $('.fa-plus-addNew').hide();
                }
                else if ((sessionStorage['TypeID'].toString() === '1' && !$ExportPrices)) {
                    $('.k-grid-excel').hide()
                }
                else if ((sessionStorage['TypeID'].toString() === '2' && !$ExportDiscounts)) {
                    $('.k-grid-excel').hide()
                }
                else {
                    $('.k-grid-excel').show()
                }

                if ((sessionStorage['TypeID'].toString() === '1' && !$AddPrices)) {
                    $('.fa-plus-addNew').hide()

                }
                else if ((sessionStorage['TypeID'].toString() === '2' && !$AddDiscounts)) {
                    $('.fa-plus-addNew').hide()
                }
                //else {
                //    $('.fa-plus-addNew').show()
                //}
            }
            catch (dd) {
                alert(dd)
            }

            $('.TypeIdClass').unbind("click");
            $('.TypeIdClass').bind("click", function () {
                $('.TypeIdClass').removeClass("btn-disabled");
                $(this).addClass("btn-disabled");
                var filterValue = -1;

                if ($(this).hasClass('k-grid-1')) {
                    filterValue = 1;
                    $('#SubpageTitle').html($(this).parent().find('span').html());
                }
                else if ($(this).hasClass('k-grid-2')) {
                    filterValue = 2;
                    $('#SubpageTitle').html($(this).parent().find('span').html());
                }


                sessionStorage['TypeID'] = filterValue;
                valueSearch = $(".k-grid-toolbar .k-grid-search input").val();
                if (valueSearch !== '') {
                    $(".k-grid-toolbar .k-grid-search input").val(valueSearch).trigger("input")
                }
                else {
                    var gridIG = $("#grid").data("kendoGrid");
                    var dataSourceIG = gridIG.dataSource;

                    dataSourceIG.filter(
                        {
                            field: "TypeID",
                            operator: "eq",
                            value: filterValue
                        });

                }

                //gridIG.dataSource.refresh();
                localStorage["kendo-grid-options"] = kendo.stringify(gridIG.getOptions());
            });
        },
        columns: [{
            field: "Name",
            title: DBSTRING['NameEn'],
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
            // template: "#= kendo.toString(kendo.parseDate(CreateDate, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
            //type: "",
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
                        LoadContentChild('CMPriceTemplate', data);

                    },
                    visible: function (dataItem) {
                       
                        var Show = false
                        if ((sessionStorage['TypeID'].toString() === '1' && $EditPrices)) {
                            Show = $EditPrices
                        }
                        else if ((sessionStorage['TypeID'].toString() === '2' && $EditDiscounts)) {
                            Show = $EditDiscounts
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
        LoadContentChild('CMPriceTemplate');
    });

}



