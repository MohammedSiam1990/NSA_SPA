


$(document).ready(function () {
    //$('#fixedBar').html()
    $('#MainfixedBar').html('')
    $('#MainfixedBar').append($('#fixedBar>.innerRow'));
    $('#MainfixedBar').show()

    $('#Save').hide();
    FillRoles('')
    FillDBSTRINGPage('PermissionsForm');
    successCallBack()
});

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
                            var list = $("#listView").data("kendoListView");
                            list.dataSource.data([
                                
                            ]);

                            var RolID = $("#RoleID").val();
                            if (RolID === '') {
                                $('#Save').hide();
                            }
                            else {
                                $('#Save').show();
                            }

                            successCallBack();
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
    var URL = $URL_Permissions + "GetPermissions";
    var BrandID = sessionStorage['BrandsID'];
    var MenuType = 1;
    var RolID = $("#RoleID").val();
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                if (RolID === '') {
                    options.success([]);
                }
                else {

                    $.ajax({
                        type: 'Get',
                        url: URL,
                       
                        async: false,
                        data: { MenuType: MenuType, RoldID: RolID, BrandID: BrandID, Lang: $Lang },
                        success: function (data, status, xhr) {
                           
                            options.success(data.datalist.Permissions);
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
        dataSource: dataSource,
        template: kendo.template($("#templateLV").html()),
        selectable: "single",
        change: function (e) {
            // get ListView selection
            //var selectedItems = e.sender.select();
            //alert('sss');
        },
        dataBound: function (e) {
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
                    }
                });

               var Igrid= dom.kendoGrid({
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
                        Grid.tbody.find('.chkbx').not(':first').attr('disabled',!enabled)
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
                        title: "<div class='form-group row'>" + "<label class='col-sm-9 col-form-label' >" + dom.data('name') + " </label> " + "<div class='col-md-2 Center' ><div class='form-group bttuncompany m-0'  > &nbsp;&nbsp;&nbsp;&nbsp; <input type='checkbox'  id='header-chb' class='k-checkbox header-checkbox'></div></div></div>",
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
                            template: '<input type="checkbox" #= value ? \'checked="checked"\' : "" # class="chkbx k-checkbox" id="' + dom.data('id')+'" />',
                            headerAttributes: {
                                 style: "display: none;"
                            },
                            attributes: { 
                                "class":"Center"
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

var UpdatePermissions = function () {
  
    var list = $("#listView").data("kendoListView");
    var data = list.dataSource.data();

    var selected = list.select();
    //alert(JSON.stringify(selected));
    
    //$.map(data, function (x) {
    //    alert(JSON.stringify(x))
      
    //});

      
    //if (!ValidateForm('PermissionsForm'))
    //    return false;
    var listObj = [];
    var obj = {
        "PermissionID": "", "MenuID": "", "RoleID": "", "JsonData": "",
        "BrandID": "", "MenuType": "", "InsertedBy": ""
    };

    var arrObj = [];
    var strObj = { 'name': '', 'value': false, 'Caption': '', 'CaptionAr': '' };
    var strObjReports = {'id':'', 'name': '', 'value': false, 'Caption': '', 'CaptionAr': '' };

    if ($('.PermissionsChanged').length === 0) {
        return;
    }
    $('.PermissionsChanged').each(function (x) {

        obj = {
            "PermissionID": "", "MenuID": "", "RoleID": "", "JsonData": "",
            "BrandID": "", "MenuType": "", "InsertedBy": ""
        };

        obj.PermissionID = 0;
        obj.RoleID = $('#RoleID').val();
        obj.MenuID = $(this).attr('MenuID');
       
        var Grid = $(this).find(".k-grid").data('kendoGrid');
        var isView = false;

        view = Grid.dataSource.data();
      
        isView = view[0].value;
        $.map(view, function (it) {
            if (it.id !== undefined) {
                strObjReports.id = it.id;
                strObjReports.name = it.name;
                if (isView) {
                    strObjReports.value = it.value;
                }
                else {
                    strObjReports.value = false;
                }
                strObjReports.Caption = it.Caption;
                strObjReports.CaptionAr = it.CaptionAr;

                arrObj.push(strObjReports)
                strObjReports = { 'id': '', 'name': '', 'value': false, 'Caption': '', 'CaptionAr': '' };
            }
            else {
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
            }
        });

        var strJson = JSON.stringify(arrObj);
        
        obj.JsonData = strJson.replace(/"/g, "'");

        obj.MenuType = 1;
        obj.BrandID = sessionStorage['BrandsID'];
        obj.InsertedBy = sessionStorage['UserId'];
        obj.ModifiedBy = sessionStorage['UserId'];

        listObj.push(obj);
        obj = {
            "PermissionID": "", "MenuID": "", "RoleID": "", "JsonData": "",
            "BrandID": "", "MenuType": "", "InsertedBy": ""
        };
        arrObj = [];
    });

  
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Permissions + "SavePermissions?Lang=" + Lang;

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
