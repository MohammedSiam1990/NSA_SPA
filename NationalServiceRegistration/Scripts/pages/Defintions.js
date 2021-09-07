
$(document).ready(function () {
    
    FillDBSTRINGPage('DefinitionForm');
    successCallBack();
    
});

var successCallBack = function () {
    var listDef = GetLookup('Lookups');

    var data = listDef.filter(function (el) {
        return el.StatusID === $UserDefinedObjects
    });


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {

                e.success(data);
            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { editable: false, type: "number" },
                    Name: { type: "string", editable: false },
                    NameAr: { type: "string", editable: false },
                    Value: { type: "number", editable: false },
                    JsonLookUp: { type: "string", editable: false }
                }
            }
        }
    });

    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        // height: 550,
        groupable: false,
        sortable: false,
        detailInit: detailInit,
        pageable: false,
        detailExpand: function (e) {
            e.sender.tbody.find('.k-detail-row').each(function (idx, item) {
                if (item !== e.detailRow[0]) {
                    e.sender.collapseRow($(item).prev());
                }
            })
        },
        dataBound: function (e) {
            var grid = e.sender;

            grid.tbody.find("tr.k-master-row").dblclick(function (e) {
                var target = $(e.target);
                if ((target.hasClass("k-i-expand")) || (target.hasClass("k-i-collapse"))) {
                    return;
                }

                var row = target.closest("tr.k-master-row");
                var icon = row.find(".k-i-expand");

                if (icon.length) {
                    grid.expandRow(row);
                } else {
                    grid.collapseRow(row);
                }
            })

        },
        columns: [{
            field: "id",
            template: $Lang === 'ar' ? "#:NameAr#" : "#:Name#",
            headerAttributes: {
                style: "display: none"
            }
        }
        ]
    });
}


var detailInit = function (e) {
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $Add = GetPermession(MenuID, 'add');
    $Edit = GetPermession(MenuID, 'edit');

    var token = sessionStorage['token'];
    var URL = $URL_UserDefined + "GetUserDefined";
    var CompanyID = sessionStorage['CompanyID'];
    var BrandID = sessionStorage['BrandsID'];
    var TypeID = e.data.Value;
    //sessionStorage['RowTypeID'] = TypeID;
     $("<div  />").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    try {
                        $.ajax({
                            type: 'Get',
                            url: URL,
                            headers: {
                                Authorization: 'bearer ' + token
                            },
                            async: false,
                            data: { BrandID: BrandID,CompanyID: CompanyID, TypeID: TypeID, Lang: $Lang },
                            success: function (data, status, xhr) {
                                $.map(data.datalist.UserDefinedObjects, function (x) {
                                    x.JsonValues = JSON.parse(x.JsonValues) 
                                });
                                options.success(data.datalist.UserDefinedObjects);
                            }
                            , error: function (jqXHR, exception) {
                                alert(jqXHR.responseText)
                            }
                        });
                    }
                    catch (ss) { alert(ss) }
                }
            },
             batch: true,
             pageSize: 20,
            schema: {
                model: {
                    id: "UserDefinedObjectsID",
                    fields: {
                        UserDefinedObjectsID: { editable: false },
                        TypeID: { editable: false },
                        JsonValues: { type: "array", editable: false }
                    }
                }
            }
        },
        editable: false,
        navigatable: true,
        sortable: true,
         height: 400,
         toolbar: [
             { name: "search", text: DBSTRING['Search'] }
         ],
        dataBound: function (e) {
            $('.fa-plus-addNew').unbind("click");
            $('.fa-plus-addNew').bind("click", function () {
                sessionStorage['RowTypeID'] = $(this).attr('id');
                
                LoadContentChild('CMDefintions');
            });
        }
        , pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        columns: [
            {
                title: DBSTRING['NameEn'],
                field: "Name",
                width: "20%",
                height: "200px",
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            },
            {
                title: DBSTRING['NameAr'],
                field: "NameAr",
                width: "20%",
                height: "200px",
                headerAttributes: {
                    "class": "Center",
                    style: "text-align: center;"
                },
                attributes: {
                    "class": "Center"
                }
            } , {
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
                            // alert(JSON.stringify(data))
                         
                            LoadContentChild('CMDefintions', data);

                        },
                        visible: function (dataItem) {

                            return $Edit
                        }
                    }

                ],

                title: $Add ? "<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['New'] + "' id='"+TypeID+"'> </span>":"",
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
    }).data("kendoGrid");
  
}
