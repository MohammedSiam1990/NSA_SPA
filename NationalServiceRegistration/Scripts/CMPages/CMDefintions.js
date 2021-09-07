
$(document).ready(function () {
   
    if ($('#UserDefinedObjectsID').val() === '') {
        fillFormControls(function (r) { });
    }
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
});

var fillFormControls = function (callback) {
    var listDef = GetLookup('Lookups');

   
    var data = listDef.filter(function (el) {
        return el.StatusID === $UserDefinedObjects && el.Value.toString() === sessionStorage['RowTypeID']
    });

    var JsonLookUp = JSON.parse((data[0].JsonLookUp).replace(/'/g, '"'));

    $.map(JsonLookUp, function (x) {
        var el = '';
        var IsReq = '', lblReq = '';

        if (x.required) {
            IsReq = 'is-required';
            lblReq = 'required-label'
        }
        if (x.dataType === 'checkbox') {
            var checked = '';
            if (x.value) {
                checked = 'checked="true"'
            }
            el = '<div class=" col-md-12 col-lg-2"><div class="form-check form-check-inline"><input class="form-check-input"  ' + checked + ' type="checkbox" id="' + x.id + '" value = "' + '' + '" caption="' + x.caption + '" captionAr="' + x.captionAr + '">';
            if ($Lang === 'ar')
                el = el + '<label class="form-check-label" for="' + x.id + '">' + x.captionAr + '</label>';
            else
                el = el + '<label class="form-check-label" for="' + x.id + '">' + x.caption + '</label>';

            el = el + '</div ></div >'

            $('#chkDivRow').append(el);

        }
        else if (x.dataType === 'textbox') {
            el = '<div class="form-group col-md-6" ><div class=" text-left form-group"><div class="input-wrap ' + IsReq + '">'
            el = el + '<label class="label-input-pos ' + lblReq + '" >' + x.captionAr + '</label>';
            el = el + '<input type="text" name="' + x.id + '" class="form-control input-sm" id="' + x.id + '" caption="' + x.caption + '" captionAr="' + x.captionAr + '" value = "' + x.value + '"/>';
            el = el + '</div></div></div>';

            $('#txtDivRow').append(el);
        }
        else if (x.dataType === 'select-one') {
            
            el = '<div class="form-group col-md-6" ><div class=" text-left form-group"><div class="input-wrap ' + IsReq + '">'
            el = el + '<label class="label-input-pos ' + lblReq + '" >' + x.captionAr + '</label>';
            if (x.LookupsID !== undefined) {
                el = el + '<select  LookupsID="' + x.LookupsID + '" name="' + x.id + '" class="form-control input-sm" id="' + x.id + '" caption="' + x.caption + '" captionAr="' + x.captionAr + '" value = "' + x.value + '"/>';
            } else {
                el = el + '<select  name="' + x.id + '" class="form-control input-sm" id="' + x.id + '" caption="' + x.caption + '" captionAr="' + x.captionAr + '" value = "' + x.value + '"/>';
            }
            
            el = el + '</div></div></div>';

            $('#listDivRow').append(el);
            if (x.LookupsID !== undefined) {
                var List = GetLookupBrand(x.LookupsID);
                fillDropdown(x.id, List, '', true);
            }
            
        }
    });

    callback(true)
    
    FillDBSTRINGPage('CMDefintions');
}

var FillForm = function (data) {
    sessionStorage['RowTypeID'] = data.TypeID;
    fillFormControls(function (r) {
        if (r) {
            
            $('#UserDefinedObjectsID').val(data.UserDefinedObjectsID);
            $('#TypeID').val(data.TypeID);

            if (data.StatusID === $InActive) {
                $('#InActive').prop("checked", true);
            }
            else {
                $('#InActive').prop("checked", false);
            }

            var fillData = data.JsonValues;
          
            $.map(fillData, function (x) {
             
                var control = $('#' + x.id);
                if (control.prop('type') === 'checkbox') {
                    if (x.value === true) {
                        control.prop('checked', true);
                    }
                    else {
                        control.prop('checked', false)
                    }
                }
                else if (control.prop('type') === 'text') {

                    $('#' + x.id).val(x.value);
                }
                else if (control.prop('type') === 'select-one') {
                    var dropdownlist = $("#" + x.id).data("kendoDropDownList");
                    dropdownlist.value(x.value);
                }
                
            });

            $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
        }
    });
   
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');

    if (!ValidateForm('CMDefintions'))
        return false;

    var arrObj = [];
    var strObj = { "id": "", "caption": "","captionAr": "", "dataType": "", "value": "" };
    var obj = {
        'UserDefinedObjectsID': '', 'TypeID': sessionStorage['RowTypeID'], 'JsonValues': '', 'StatusID': '', 'CompanyID': '', 'BrandID': '', 'InsertedBy': '', 'ModifiedBy': ''
    };

    obj.UserDefinedObjectsID = $('#UserDefinedObjectsID').val() === '' ? 0 : $('#UserDefinedObjectsID').val();
    
    obj.CompanyID = sessionStorage['CompanyID'];
    obj.BrandID = sessionStorage['BrandsID'];
    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }

    if (obj.UserDefinedObjectsID === 0)
        obj.InsertedBy = sessionStorage['UserId'];
    else
        obj.ModifiedBy = sessionStorage['UserId'];

   
    $('#CMDefintions :input').not('#InActive,:button, :submit, :reset, :hidden').each(function () {
        var elem = $(this);

        strObj.id = elem.attr('id');
        strObj.caption = elem.attr('caption');
        strObj.captionAr = elem.attr('captionAr');
      
        if ($(elem)[0].type === 'checkbox') {
            strObj.value = $(elem).is(':checked')
            
        }
        else {
            strObj.value = elem.val();
        }
        strObj.dataType = $(elem)[0].type

        arrObj.push(strObj)
        strObj = { "id": "", "caption": "", "captionAr": "", "dataType": "", "value": "" };

    });

    var dropDownDOMelements = $(".k-dropdown", '#CMDefintions');
    dropDownDOMelements.each(function (ddl) {
       
        var id = $(this).parent().find('select')[0].id;
       
        var elem = $('#'+id);
        var dropdownlist = $("#" + id).data("kendoDropDownList");

        strObj.id = elem.attr('id');
        strObj.caption = elem.attr('caption');
        strObj.captionAr = elem.attr('captionAr');

        
        strObj.value = dropdownlist.value();
        strObj.dataType = $(elem)[0].type

        arrObj.push(strObj)
        strObj = { "id": "", "caption": "", "captionAr": "", "dataType": "", "value": "" };

        
    });

    var strJson = JSON.stringify(arrObj);
    obj.JsonValues = strJson;
    
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_UserDefined + "SaveUserDefined?Lang=" + Lang;
  
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
        data: JSON.stringify(obj),
        success: function (data) {
            if (data.success === true) {
                try {
                    var grid = $("#grid").data("kendoGrid");
                    var expandedRows = grid.tbody.find('.k-i-collapse').first().closest('tr');
                    var detailGrid = $(expandedRows).next('tr').find('.k-grid').data('kendoGrid');
                    detailGrid.dataSource.read();
                }
                catch (ex) {alert(ex) }
                if (IsComeFromDestroy) {
                    $dataForm = '';
                    $('#ChildContent').hide();
                    $('#MainContent').show();
                }
                else {
                    $('#ResultMessage').addClass('alert-success show');
                    $('#ResultTxt').html(data.message);

                    setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                   
                    if ($('#UserDefinedObjectsID').val() === '') {
                        $(':input', '#CMDefintions')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                        resetKendoDropDownByForm('CMDefintions')
                    }
                    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                }
            }
            else {
                
                if (data.repeated !== null && data.repeated !== undefined) {
                    markInvalid($('#' + data.repeated), data.message);
                    $('#ResultMessage').addClass('alert-danger show');
                    $('#ResultMessage').removeClass('hide');
                    $('#ResultTxt').html(data.message);
                    setTimeout("$('#ResultMessage').removeClass('show')", 5000);
                }
                else {
                    
                    $('#ResultMessage').addClass('alert-danger show');
                    $('#ResultMessage').removeClass('hide');
                    $('#ResultTxt').html(data.message);
                    setTimeout("$('#ResultMessage').removeClass('show')", 5000);
                }
            }
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
            $('#ResultMessage').addClass('alert-danger show');
            $('#ResultMessage').removeClass('hide');
            $('#ResultTxt').html(msg);
            setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        }
    });

}