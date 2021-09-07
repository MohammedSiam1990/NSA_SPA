


$(document).ready(function () {
   
    $('#SavePermession').hide();
   
    FillDBSTRINGPage('ReportsPermissionsForm');
    $('#MainfixedBar').html('');
    $('#MainfixedBar').append($('#fixedBar>.innerRow'));
    $('#MainfixedBar').show()
    FillRoles('')
    var list_ReportCategory = GetLookup('ReportsCategories');
   
    fillDropdown('ReportCategory', list_ReportCategory, '', true);
    $("#ReportCategory").data("kendoDropDownList").bind("change", onChangeReportCategory)

    fillDropdown('ReportCategoryGroup', [], '', true);
   // $("#ReportCategoryGroup").data("kendoDropDownList").bind("change", onChangeReportCategoryGroup)
    successCallBack();
    //ReportCategoryID
});

var onChangeReportCategory = function (e) {

    var list_ReportCategoryGroup = GetLookup('ReportCategoryGroup');
    list_ReportCategoryGroup = list_ReportCategoryGroup.filter(function (el) {
        return el.ReportCategoryID.toString() === $('#ReportCategory').val();
    });

    fillDropdown('ReportCategoryGroup', list_ReportCategoryGroup, '', true);
    $("#ReportCategoryGroup").data("kendoDropDownList").bind("change", onChangeReportCategoryGroup)
    var list = $("#listView").data("kendoListView");
    list.dataSource.data([

    ]);
    successCallBack();
    var RolID = $("#RoleID").val();
    var ReportCategoryID = $('#ReportCategory').val();
   
    if (RolID === '' || ReportCategoryID === '') {
        $('#SavePermession').hide();
    }
    else {
        $('#SavePermession').show();
    }
}

var onChangeReportCategoryGroup = function (e) {
    var list = $("#listView").data("kendoListView");
    var GroupID = $('#ReportCategoryGroup').val();
    if (GroupID === '') {
        list.dataSource.filter({
          
        });
    }
    else {

        list.dataSource.filter({
            field: 'ReportCategoryGroupID',
            operator: 'eq',
            value: $('#ReportCategoryGroup').val()
        });
    }
}
var FillRoles = function (Selecte) {
    var token = sessionStorage['token'];
    var CompanyID = sessionStorage['CompanyID'];
    var URL = $URL_Roles + "GetRole";

    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { companyId: CompanyID, Lang: $Lang },
        success: function (data) {
            if (data.success) {
                var List = JSON.stringify(data.datalist.Role); 
                
                List = JSON.parse(List)
               
                var objPlzSelect = { 'Id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
                List.unshift(objPlzSelect);

                var DS = new kendo.data.DataSource({ data: List });
                try {
                    $("#RoleID").kendoDropDownList({
                        dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
                        dataValueField: "Id",
                        dataSource: DS,
                        filter: "contains",
                        suggest: true,
                        index: 3,
                        change: function (e) {
                            try {
                                var list = $("#listView").data("kendoListView");
                                list.dataSource.data([

                                ]);
                                successCallBack()
                                var RolID = $("#RoleID").val();
                                var ReportCategoryID = $('#ReportCategory').val();
                                if (RolID === '' || ReportCategoryID === '') {
                                    $('#SavePermession').hide(); 
                                }
                                else {
                                    $('#SavePermession').show(); 
                                }
                            } catch (ex) { alert(ex) }
                           // successCallBack();
                        },
                        value: Selecte
                    });


                }
                catch (ss) { alert(ss) }
            }
        }
    });
}

var successCallBack = function () {
   
    var token = sessionStorage['token'];
    var URL = $URL_ReportPermissions + "GetReportPermissions";
    //var URL = $URL_Permissions + "GetPermissions";
    var BrandID = sessionStorage['BrandsID'];
    var ReportCategoryID = $('#ReportCategory').val();
   
    var RolID = $("#RoleID").val();
   
    var DSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                
               
                if (RolID === '' || ReportCategoryID === '') {
                  
                    options.success([]);
                }
                else {
                    
                    $.ajax({
                        type: 'Get',
                        url: URL,
                        headers: {
                            Authorization: 'bearer ' + token
                        },
                        async: false,
                        data: { RoleID: RolID, ReportCategoryID:ReportCategoryID,BrandID: BrandID, Lang: $Lang },
                        success: function (data) {
                            
                            options.success(data.datalist.ReportPermissions);
                        }
                    });
                }
            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "PermissionLookupID",
                fields: {
                    PermissionLookupID: { type: "number" },
                    MenuID: { type: "number" },
                    MenuKeyName: { type: "string" },
                    JsonData: { type: "string" },
                    MenuKeyNameAr: { type: "string" }
                }
            }
        }
    });

    var listView = $("#listView").kendoListView({
        dataSource: DSource,
        template: kendo.template($("#templateLV").html()),
        selectable: "single",
        change: function (e) {
            // get ListView selection
            var selectedItems = e.sender.select();
            //alert('sss');
        },
        dataBound: function (e) {
            //var item = this.dataItem(e.node)
            //alert(JSON.stringify(item))
            var ele = this.element;
            $(".k-grid", this.element).each(function () {
                var dom = $(this);
                var strJS = (dom.data('js'));
                var js = [];
                try {
                    js = JSON.parse((strJS).replace(/'/g, '"'));

                } catch (ss) {
                    //alert(ss)
                }

                var DS = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {

                            options.success(js)
                        }
                    },
                    //pageSize:4 ,
                    schema: {
                        model: {
                            id: "name",
                            fields: {
                                name: { type: "string" },
                                value: { editable: true, type: "boolean" },
                                Caption: { type: "string" },
                                CaptionAr: { type: "string" }
                            }
                        }
                    }
                });
                var Igrid = dom.kendoGrid({
                    dataSource: DS,
                    scrollable: true,
                    sortable: true,
                    pageable: false,
                    height: '100%',
                    width: '100%',
                    dataBound: function (e) {
                        var Grid = e.sender;

                        var row = Grid.tbody.find('tr:first')
                        var data = Grid.dataItem(row);

                        var enabled = data.value;
                        Grid.tbody.find('.chkbx').not(':first').attr('disabled', !enabled)
                        $('.chkbx').unbind("click");
                        $('.chkbx').bind("click", function (e) {

                            $(".Permissions").removeClass('k-state-selected').attr('aria-selected', false)
                            $(this).closest(".Permissions").addClass('k-state-selected').attr('aria-selected', true)
                            if (!$(this).closest(".Permissions").hasClass('PermissionsChanged')) {
                                $(this).closest(".Permissions").addClass('PermissionsChanged');
                            }
                            //Permissions

                            var Grid = $(this).closest(".k-grid").data('kendoGrid');
                            var tr = $(this).closest("tr"); // get the current table row (tr)
                            var data = Grid.dataItem(tr);
                            data.set('value', $(this).is(':checked'));


                            var NChkBoxes = Grid.tbody.find('.chkbx').length;
                            var NChkChecked = Grid.tbody.find('.chkbx:checked').length;

                            if (NChkBoxes === NChkChecked && NChkBoxes > 0) {

                                Grid.thead.find('.header-checkbox').prop('checked', true);


                            }
                            else {
                                Grid.thead.find('.header-checkbox').prop('checked', false);
                            }
                        });
                        try {


                            //var NChkBoxes = $('#PTgrid .chkbx').length;
                            //var NChkChecked = $('#PTgrid .chkbx:checked').length;
                            var NChkBoxes = Grid.tbody.find('.chkbx').length;
                            var NChkChecked = Grid.tbody.find('.chkbx:checked').length;

                            if (NChkBoxes === NChkChecked && NChkBoxes > 0) {

                                //$('#headerPT-chb')[0].checked = true;
                                Grid.thead.find('.header-checkbox').prop('checked', true);
                            }
                            else {

                                //$('#headerPT-chb')[0].checked = false;
                                Grid.thead.find('.header-checkbox').prop('checked', false);
                            }
                        } catch (ex) { alert(ex) }
                    },
                    columns: [{
                        title: "<div class='form-group row'>" + "<label class='col-sm-9 col-form-label' >" + dom.data('name') + " </label> " + "<div class='col-md-2 Center' ><div class='form-group bttuncompany m-0'  > &nbsp;&nbsp;&nbsp; <input type='checkbox'  id='header-chb' class='k-checkbox header-checkbox'>  </div></div></div>",
                        columns: [{
                            field: "name",
                            width: "70%",
                            template: $Lang === 'ar' ? "#:CaptionAr#" : "#:Caption#",
                            headerAttributes: {
                                style: "display: none;"
                            },
                            attributes: {
                                "class": "Center"
                            }
                        },
                        {
                            field: "value",
                            // headerTemplate: "<input type='checkbox'  id='headerPT-chb' class='k-checkbox header-checkbox'>",
                            template: '<input type="checkbox" #= value ? \'checked="checked"\' : "" # class="chkbx k-checkbox" id="' + dom.data('id') + '" />',
                            headerAttributes: {
                                style: "display: none;"
                            },
                            attributes: {
                                "class": "Center"
                                //"class": "#=name === 'view'? 'Center k-state-disabled':'Center'#"
                            }
                        }]
                    }]
                });

                $(dom).find('.header-checkbox').change(function () {
                    $(".Permissions").removeClass('k-state-selected').attr('aria-selected', false)
                    $(this).closest(".Permissions").addClass('k-state-selected').attr('aria-selected', true)
                    if (!$(this).closest(".Permissions").hasClass('PermissionsChanged')) {
                        $(this).closest(".Permissions").addClass('PermissionsChanged');
                    }

                    var masterGrid = $(dom).data("kendoGrid");;
                    var view = masterGrid.dataSource.data();
                    var isCK = $(this).is(':checked')
                    $.map(view, function (item) {
                        item.set('value', isCK);
                    });

                });

            });
        }
    });
}

var UpdateReportPermissions = function () {

    var list = $("#listView").data("kendoListView");
    var data = list.dataSource.data();

    var selected = list.select();

    var listObj = [];
    var obj = {
        "ReportPermissionID": "", "ReportID": "", "RoleID": "", "JsonData": "",
        "BrandID": "", "InsertedBy": ""
    };

    var arrObj = [];
    var strObj = { 'name': '', 'value': false, 'Caption': '', 'CaptionAr': '' };

    if ($('.PermissionsChanged').length === 0) {
        return;
    }
    $('.PermissionsChanged').each(function (x) {

        obj = {
            "ReportPermissionID": "", "ReportID": "", "RoleID": "", "JsonData": "",
            "BrandID": "", "InsertedBy": ""
        };

        obj.ReportPermissionID = 0;
        obj.RoleID = $('#RoleID').val();
        obj.ReportID = $(this).attr('ReportID');

        var Grid = $(this).find(".k-grid").data('kendoGrid');
        var isView = false;

        view = Grid.dataSource.data();
        isView = view[0].value;
        $.map(view, function (it) {

            strObj.name = it.name;
            if (isView) {
                strObj.value = it.value;
            }
            else {
                strObj.value = false;
            }
            strObj.Caption = it.Caption;
            strObj.CaptionAr = it.CaptionAr;

            arrObj.push(strObj)
            strObj = { 'name': '', 'value': false, 'Caption': '', 'CaptionAr': '' };
        });

        var strJson = JSON.stringify(arrObj);

        obj.JsonData = strJson.replace(/"/g, "'");

        obj.MenuType = 1;
        obj.BrandID = sessionStorage['BrandsID'];
        obj.InsertedBy = sessionStorage['UserId'];
        obj.ModifiedBy = sessionStorage['UserId'];

        listObj.push(obj);
        obj = {
            "ReportPermissionID": "", "ReportID": "", "RoleID": "", "JsonData": "",
            "BrandID": "", "InsertedBy": ""
        };
        arrObj = [];
    });

    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_ReportPermissions + "SaveReportPermissions?Lang=" + Lang;

    $.ajax({
        type: "POST",
        url: URL,
        dataType: "Json",
        contentType: 'application/json',
        async: false,
        cache: false,
        headers: {
            Authorization: 'bearer ' + token
        },
        data: JSON.stringify(listObj),
        success: function (data) {

            if (data.success === true) {
                $('#ResultMessageIndex').addClass('alert-success show');
                $('#ResultTxtIndex').html(data.message);
                $(".Permissions").removeClass('k-state-selected').attr('aria-selected', false).removeClass('PermissionsChanged')
            }
            else {

                $('#ResultMessageIndex').addClass('alert-danger show');
                $('#ResultMessageIndex').removeClass('hide');
                $('#ResultTxtIndex').html(data.message);
            }
            setTimeout("$('#ResultMessageIndex').removeClass('show')", 5000);
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
            alert(msg);
        }
    });
}






