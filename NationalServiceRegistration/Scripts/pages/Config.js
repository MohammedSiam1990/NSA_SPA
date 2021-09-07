
$(document).ready(function () {
    var Lang = sessionStorage['lang'];
    $("#tabConfig").kendoTabStrip();
   

    var token = sessionStorage['token'];
    var URL = $URL_Branches + "GetBranches";
    var BrandId = sessionStorage['BrandsID'];
    var UserID = sessionStorage['UserId'];
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { BrandID: BrandId,UserID:UserID, Lang: $Lang },
        success: function (data, status, xhr) {
            if (data.success) {
                var list_Branch = data.datalist.Branches;
                objPlzSelect = { 'BranchID': '', 'BranchNameAr': DBSTRING['PleaseSelect'], 'BranchName': DBSTRING['PleaseSelect'] };
                list_Branch.unshift(objPlzSelect);
                sessionStorage['list_Branch'] = JSON.stringify(list_Branch);
                BuildTabsConfig();
                FillDBSTRINGPage('ConfigForm');
            }
        }
    });

    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $edit = GetPermession(MenuID, 'edit');
    
    if (!$edit) {
        $('#SaveTitle').hide();
    }
});

var onShow = function (e) {
    var selectedTabElem = $("#tabConfig").data('kendoTabStrip').select();
    var id = $(selectedTabElem).children(".k-link").find('span').attr('value');
    var IsFIlter = $(selectedTabElem).children(".k-link").find('span').attr('Isfilter');
    buildTabContent(id, IsFIlter);
    if (IsFIlter !== 'true') {
        api_call(id,IsFIlter);
    }
};

var BuildTabsConfig = function () {
    var SystemLookup = GetLookup('SystemLookup');
    var tabstrip = $('#tabConfig').data("kendoTabStrip");
    var TabIDs = [];
    sortColumnName = "OrderID";
    SystemLookup.sort(SortByName);

    TabIDs = _.filter(SystemLookup, function (el) { return el.ParentID === 0 })
    TabIDs.forEach(function (x) {
        
        tabstrip.append({

            text: '<span class="tab" value="' + x.SysID + '" Isfilter="' + (x.FilterdByBranch.toString() === '1'?'true':'false')+'">' + ($Lang === 'ar' ? x.NameAr : x.Name) + '</span>',
            encoded: false,
            content: "<div class='row'><div class='col-md-12' id='div-" + x.SysID + "'></div></div>"
        });
    });

    tabstrip.bind("show", onShow);
    tabstrip.select(0);
}

var cleareTabBranch = function () {
    
    $(':input', '#div-Branch')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
    resetKendoDropDownByForm('ConfigForm', 'configBranchFilter');
}

var buildTabContent = function (txt, IsFIlter) {

    var SystemLookup = GetLookup('SystemLookup');
    var Lookups = GetLookup('Lookups');
    var dataTab = [], count = 0;
    var Configs = [];
    dataTab = _.filter(SystemLookup, function (el) { return el.ParentID.toString() === txt })
    //Configs = _.filter(Lookups, function (el) { return el.StatusID === $ConfigGroups }) 

    var data = {
        'checkbox': [], 'List': [], 'number': [], 'textbox': '', 'radio': ''
    };
    var obj = {}

    var groupedData_Tag = _.groupBy(dataTab, function (d) { return d.TagID });

    //var init = ' <div class="row"><div class="col-md-4"></div><div class="col-md-4"></div><div class="col-md-4"></div></div>'
    var tabs = $("#tabConfig").data("kendoTabStrip").items();
    $.map(tabs, function (tab) {
        var tabID = $(tab).children(".k-link").find('span').attr('value');
        $('#div-' + tabID).html('')
    });

    var GroupingHtml = '';
    var init = '';
    init = init + '<div class="row" id="txtDivRow-' + txt + '"></div>';
    init = init + '<div class="row" id="listDivRow-' + txt + '"></div>';
    init = init + '<div class="row"><div class="col-md-12"><div class="row" id="chkDivRow-' + txt + '"></div></div>';

    Configs = _.filter(Lookups, function (el) { return el.StatusID === $ConfigGroups && (_.contains(_.pluck(dataTab, 'ConfigGroupID'), el.Value)) })
    _.map(Configs, function (x) {
        //GroupingHtml += '<div class="panel panel-primary"><div class="panel-body" ><h3 class="text-on-pannel text-primary"><strong class="text-uppercase"> ' + ($Lang === 'ar' ? x.NameAr : x.Name) + ' </strong></h3><div id="ContentPanel_' + x.Value + '">' + init + ' </div></div ></div >'
        //GroupingHtml += '<fieldset class="the-fieldset"><legend class="text-primary text-primary the-legend " ><h4>' + ($Lang === 'ar' ? x.NameAr : x.Name) + '</h4></legend ><div id="ContentPanel_' + x.Value + '">' + init + ' </div></fieldset >'
        GroupingHtml += '  <div class="row"><div class="col-md-12" ><div class="groupingfeilds " ><span class="groupingfeilds-title"> ' + ($Lang === 'ar' ? x.NameAr : x.Name) + '  </span><div  id="ContentPanel_' + x.Value + '">' + init + '</div></div ></div >'
    });
    if (IsFIlter === 'true') {
        var el = '<div class="row"><div class="form-group col-md-6" ><div class=" text-left form-group"><div class="  input-wrap ">'
        el = el + '<label class="label-input-pos " >' + DBSTRING['Branches'] + ' </label>';
        el = el + '<select name="configBranchFilter" class="w-100 input-sm p-0" id="configBranchFilter" ></select>';
        el = el + '</div></div></div></div>';
        GroupingHtml = el + GroupingHtml;

    }
    $('#div-' + txt).append(GroupingHtml);


    //    var init = '';

    if (IsFIlter === 'true') {

        //var el =  '<div class="row"><div class="form-group col-md-6" ><div class=" text-left form-group"><div class="  input-wrap ">'
        //el = el + '<label class="label-input-pos " >' + DBSTRING['Branches'] + ' </label>';
        //el = el + '<select name="configBranchFilter" class="w-100 input-sm p-0" id="configBranchFilter" ></select>';
        //el = el + '</div></div></div></div>';
        //el += '<div class="panel panel-primary"><div class="panel-body" ><h3 class="text-on-pannel text-primary"><strong class="text-uppercase"> Title </strong></h3><p> Your Code </p></div ></div >'
        //el += '<fieldset class="the-fieldset"><legend class="text-primary text-primary the-legend " ><h3>Title </h3></legend ></fieldset >'
        //init = el;

        //init = init + '<div class="row" id="txtDivRow-' + txt + '"></div>';
        //init = init + '<div class="row" id="listDivRow-' + txt + '"></div>';
        //init = init + '<div class="row"><div class="col-md-12"><div class="row" id="chkDivRow-' + txt + '"></div></div>';

        //$('#div-' + txt).append(init);

        var list_Branch = JSON.parse(sessionStorage['list_Branch']);
        var DataSourceBranch = new kendo.data.DataSource({ data: list_Branch });
        $('#configBranchFilter').kendoDropDownList({
            filter: "contains",
            suggest: true,
            dataTextField: $Lang === 'ar' ? "BranchNameAr" : "BranchName",
            dataValueField: "BranchID",
            dataSource: DataSourceBranch,
            change: function (e) {
                api_call(txt, IsFIlter);
            },
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            index: 3
        });

    }
    //else {
    //    init = init + '<div class="row" id="txtDivRow-' + txt + '"></div>';
    //    init = init + '<div class="row" id="listDivRow-' + txt + '"></div>';
    //    init = init + '<div class="row"><div class="col-md-12"><div class="row" id="chkDivRow-' + txt + '"></div></div></div>';
    // //   $('#div-' + txt).append(init);
    //}


    $.map(groupedData_Tag, function (x) {
        if (x[0].TagID === 0) {
            var groupedData_Type = _.groupBy(x, function (d) { return d.DataType });
            $.map(groupedData_Type, function (dt) {
                dt.forEach(function (item, index) {
                    var el = '';

                    if (item.DataType === 'checkbox') {
                      
                        el = '<div class=" col-md-12 col-lg-3"><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="' + item.id + '" value = "" >';
                        if ($Lang === 'ar')
                            el = el + '<label class="form-check-label" >' + item.NameAr + '</label>';
                        else
                            el = el + '<label class="form-check-label" >' + item.Name + '</label>';

                        el = el + '</div ></div >'

                        $('#ContentPanel_' + item.ConfigGroupID).find('#chkDivRow-' + txt).append(el);


                    }
                    else if (item.DataType === 'textbox') {
                        el = '<div class="form-group col-md-4" ><div class=" text-left form-group"><div class="  input-wrap ">'
                        el = el + '<label class="label-input-pos " >' + item.NameAr + '</label>';
                        el = el + '<input type="text" name="' + item.id + '" class="form-control input-sm" id="' + item.id + '" />';
                        el = el + '</div></div></div>';

                        $('#ContentPanel_' + item.ConfigGroupID).find('#txtDivRow-' + txt).append(el);
                    }
                    else if (item.DataType === 'number') {
                        el = '<div class="form-group col-md-4" ><div class=" text-left form-group"><div class="  input-wrap ">'
                        el = el + '<label class="label-input-pos " >' + item.NameAr + '</label>';
                        el = el + '<input type="number" name="' + item.id + '" class="form-control input-sm" id="' + item.id + '" oninput="OnInputNumber(this)" />';
                        el = el + '</div></div></div>';

                        $('#ContentPanel_' + item.ConfigGroupID).find('#txtDivRow-' + txt).append(el);
                    }

                });
            });
        }
        else {
            if (x[0].DataType === 'List') {
                el = '<div class="form-group col-md-4" ><div class=" text-left form-group"><div class="  input-wrap ">'
                el = el + '<label class="label-input-pos " >' + DBSTRING['config_' + x[0].TagID] + ' </label>';
                el = el + '<select name="' + x[0].TagID + '" class="w-100 input-sm p-0" id="config_' + x[0].TagID + '" ></select>';
                el = el + '</div></div></div>';

                $('#ContentPanel_' + x[0].ConfigGroupID).find('#listDivRow-' + txt).append(el);
                fillDropdown('config_' + x[0].TagID, x, '', true);
            }
            else if (x[0].DataType === 'multi') {
                el = '<div class="form-group col-md-4" ><div class=" text-left form-group"><div class="  input-wrap ">'
                el = el + '<label class="label-input-pos " >' + DBSTRING['config_' + x[0].TagID] + ' </label>';
                el = el + '<select  name="' + x[0].TagID + '" class="w-100 input-sm p-0" id="config_' + x[0].TagID + '" ></select>';
                el = el + '</div></div></div>';

                $('#ContentPanel_' + x[0].ConfigGroupID).find('#listDivRow-' + txt).append(el);

                fillMultiDropdown('config_' + x[0].TagID, x, '', false);
            }

        }
    });

    $('#div-' + txt + ' :input').each(function () {
        var elem = $(this);
        // Save current value of element
        if ($(elem)[0].type === 'checkbox') {
            elem.data('oldVal', $(elem).is(':checked'));
        }
        else {
            elem.data('oldVal', elem.val());
        }


        // Look for changes in the value
        elem.not('#configBranchFilter').bind("propertychange change click keyup input paste", function (event) {
            // If value has changed...
            if ($(elem)[0].type === 'checkbox') {
                elem.addClass('confChange');
            }
            else {

                elem.addClass('confChange');

            }
        });
    });
}

function api_call(TabID, IsFIlter) {

    var token = sessionStorage['token'];
    var BrandID = sessionStorage['BrandsID'];
    var Lang = sessionStorage['lang'];
    var BranchID = null;

    if (IsFIlter === 'true') {
        try {

            if ($('#configBranchFilter').val() !== '') {

                BranchID = $('#configBranchFilter').val();
                $('#configBranchFilter').data("kendoDropDownList").close();
                cleareTabBranch();
            }
            else {
                $('#configBranchFilter').data("kendoDropDownList").close();
                cleareTabBranch();
                return;
            }
        }
        catch (ex) { }
    }
    var URL = $URL_Config + "GetConfig";

    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { Lang: Lang, BranchID: BranchID, BrandID: BrandID,  TypeID: 1 },
        success: function (data, status, xhr) {

            if (data.success === true) {
                successCallBack(data);
            }
            else {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(data.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            }
        }
    }).fail(function (xhr, status) {

        if (status === "error") {
            return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
    });
}

var successCallBack = function (data) {
    var fillData = data.datalist.Config;
    $('option[ConfigID]').removeAttr('ConfigID')
    $.map(fillData, function (x) {

        if (x.TagID === 0) {
           
            var control = $('#' + x.ConfigKeyID);
          
            if (control.prop('type') === 'checkbox') {
               
                if (x.Value1 === true || x.Value1 === 'true') {
                    control.prop('checked', true);
                }
                else {
                    control.prop('checked', false)
                }
                control.attr('ConfigID', x.ConfigID);
            }
            else {
                $('#' + x.ConfigKeyID).val(x.Value1);
                $('#' + x.ConfigKeyID).attr('ConfigID', x.ConfigID);
            }
        }
        else {
            if (x.DataType === 'List') {
                $('option[value=' + x.ConfigKeyID + ']').attr('ConfigID', x.ConfigID);

                if (x.Value1 !== '') {
                    var dropdownlist = $('#config_' + x.TagID).data('kendoDropDownList');
                    $('#config_' + x.TagID).data('kendoDropDownList').value(x.ConfigKeyID)
                    $('#config_' + x.TagID).val(x.ConfigKeyID)
                }
            }
            else if (x.DataType === 'multi') {

                $('option[value=' + x.ConfigKeyID + ']').attr('ConfigID', x.ConfigID);

                if (x.Value1 !== '') {
                    //var dropdownlist = $('#config_' + x.TagID).data('kendoMultiSelect');
                    var arr = $('#config_' + x.TagID).val()
                    arr.push(x.ConfigKeyID)
                    $('#config_' + x.TagID).data('kendoMultiSelect').value(arr)

                }
            }
        }

    });

    $dataForm = $('#CompanyForm').serializeArray();
}

var SaveConfig = function () {

    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    try {
        var selectedTabElem = $("#tabConfig").data('kendoTabStrip').select();
        var currTab = $(selectedTabElem).children(".k-link").find('span').attr('value');
        var IsFIlter = $(selectedTabElem).children(".k-link").find('span').attr('Isfilter');
        if (IsFIlter === 'true') {
            if ($('#configBranchFilter').val() === '') {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(DBSTRING['PlzSelectBranch']);
                return;
            }
        }

        var Listobj = [];
        var obj = {
            "ConfigID": "", "ConfigKeyID": "", "BranchID": "", "BrandID": "",
            "Value1": "", "Value2": "", "InsertedBy": "", "ModifiedBy": ""
        };



        $('.confChange').each(function (cont) {

            if ($(this).attr('id').indexOf('config_') > -1) {
                var selected = $('#' + $(this).attr('id')).val()

                $(this).find('option').each(function () {

                    if ($(this).val() !== '' && $(this).val() !== '') {

                        id = this.id;
                        obj = {
                            "ConfigID": "", "ConfigKeyID": "", "BranchID": "", "BrandID": "",
                            "Value1": "", "Value2": "", "InsertedBy": "", "ModifiedBy": ""
                        };

                        obj.ConfigID = $(this).attr('ConfigID') === undefined ? 0 : $(this).attr('ConfigID');

                        obj.ConfigKeyID = $(this).val();

                        if (IsFIlter === 'true') {
                            try {
                                if ($('#configBranchFilter').val() !== '') {
                                    obj.BranchID = $('#configBranchFilter').val();
                                }
                                else {
                                    return;
                                }
                            }
                            catch (ex) { }
                        }
                        else {
                            obj.BranchID = null;
                        }

                        obj.BrandID = sessionStorage['BrandsID'];
                        //alert($.type(selected))
                        if ($.type(selected) === 'array') {
                            if ($.inArray($(this).val().toString(), selected) !== -1) {
                                obj.Value1 = 'selected';
                                obj.Value2 = '';

                            }
                            else {

                                obj.Value1 = '';
                                obj.Value2 = '';
                            }
                        }
                        else {
                            if ($(this).val().toString() === selected.toString() && selected !== '' && selected !== '') {
                                obj.Value1 = 'selected';
                                obj.Value2 = '';

                            }
                            else {
                                obj.Value1 = '';
                                obj.Value2 = '';
                            }
                        }


                        if (obj.ConfigID === 0) {
                            obj.InsertedBy = sessionStorage['UserId'];
                        }
                        else {
                            obj.ModifiedBy = sessionStorage['UserId'];
                        }

                        Listobj.push(obj);
                    }

                });
            }
            else {

                obj.ConfigID = $(this).attr('ConfigID') === undefined ? 0 : $(this).attr('ConfigID');
                obj.ConfigKeyID = $(this).attr('id');
                try {
                    if ($('#configBranchFilter').length > 0 && currTab === 'Branch') {

                        if ($('#configBranchFilter').val().toString() !== '') {
                            obj.BranchID = $('#configBranchFilter').val();
                        }
                        else {
                            return;
                        }

                    }
                    else {
                        obj.BranchID = null;
                    }
                }
                catch (ex) { alert(ex) }

                obj.BrandID = sessionStorage['BrandsID'];
                if ($(this).prop('type') === 'checkbox') {
                    obj.Value1 = $(this).is(':checked');
                    obj.Value2 = '';

                }
                else {
                    obj.Value1 = $(this).val();
                    obj.Value2 = '';
                }

                if (obj.ConfigID === 0) {
                    obj.InsertedBy = sessionStorage['UserId'];
                }
                else {
                    obj.ModifiedBy = sessionStorage['UserId'];
                }
                Listobj.push(obj);
            }
            obj = {
                "ConfigID": "", "ConfigKeyID": "", "BranchID": "", "BrandID": "",
                "Value1": "", "Value2": "", "InsertedBy": "", "ModifiedBy": ""
            };
        });

        var Lang = sessionStorage['lang'];
        var token = sessionStorage['token'];
        var URL = $URL_Config + "SaveConfig?Lang=" + Lang;

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
            data: JSON.stringify(Listobj),
            success: function (data) {

                if (data.success === true) {
                    $('#ResultMessage').addClass('alert-success show');
                    $('#ResultTxt').html(data.message);
                    //cleareTabBranch();
                    api_call(currTab)
                }
                else {

                    $('#ResultMessage').addClass('alert-danger show');
                    $('#ResultMessage').removeClass('hide');
                    $('#ResultTxt').html(data.message);
                }
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
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
    catch (ex) {
        alert(ex);
    }
}