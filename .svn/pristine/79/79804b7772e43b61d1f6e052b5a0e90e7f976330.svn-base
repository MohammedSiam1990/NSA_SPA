
$(document).ready(function () {
   
    if ($('#Id').val() === '') {
        FillRoles('');
    }

    FillDBSTRINGPage('CMUser');

    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();

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
                
                var DS= new kendo.data.DataSource({ data: List });
                try {
                    $("#RoleID").kendoDropDownList({
                        dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
                        dataValueField: "Id",
                        dataSource: DS,
                        filter: "contains",
                        suggest: true,
                        index: 3,
                        value: Selecte
                    });

                    
                }
                catch (ss) { alert(ss) }
            }
        }
    });

}

var FillForm = function (data) {
    
    FillRoles(data.RoleID)
    
    $('#Id').val(data.Id);
    $('#UserID').val(data.UserID);   
    $('#Name').val(data.Name);
    $('#UserNameEmail').val(data.UserName);
    $('#UserNameEmail').attr('disabled', true);
    $('#PhoneNumber').val(data.PhoneNumber);
   
    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }
 
    if (data.IsSuperAdmin ) {
        $('#IsSuperAdmin').prop("checked", true);
    }
    else {
        $('#IsSuperAdmin').prop("checked", false);
    }
    ClickIsSuperAdmin();

    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var ClickIsSuperAdmin = function () {
    var IsSuperAdmin = $('#IsSuperAdmin').is(':checked');
    var cont = $('#RoleID').parent().parent().parent();
   // alert($(cont).html())
    if (IsSuperAdmin) {
        $(cont).find('.label-input-pos').removeClass('required-label')
        $(cont).find('.input-wrap').removeClass('is-required')
      
    }
    else {
        $(cont).find('.label-input-pos').addClass('required-label')
        $(cont).find('.input-wrap').addClass('is-required')
    }
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');

    if (!ValidateForm('CMUser'))
        return false;

    var obj = {
        "Id": "", "Email": "", "Username": "", "PhoneNumber": "", "Lang": "","Name":"",
        "UserType": "", "IsSuperAdmin": "", "StatusID": "", "CompanyId": "", "ModifiedBy": "",
        "LastModifyDate": "", "CreateDate": "", "InsertedBy": "", "AppUrl": "", "RoleID": "","UserID":""
    };

    obj.Id = $('#Id').val() === '' ? 0 : $('#Id').val();
    obj.UserID = $('#UserID').val() === '' ? 0 : $('#UserID').val();
    obj.Email = $('#UserNameEmail').val();
    obj.Username = $('#UserNameEmail').val();
    obj.PhoneNumber = $('#PhoneNumber').val();
    obj.Lang = $Lang;
    obj.UserType = 1;
    obj.Name = $('#Name').val();
    obj.RoleID = $('#RoleID').val();
    obj.IsSuperAdmin = $('#IsSuperAdmin').is(':checked');
    obj.CompanyId= sessionStorage['CompanyID'];
    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }
    obj.LastModifyDate = Date.now
    obj.InsertedBy = sessionStorage['UserId'];
    //obj.UserID = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];
    obj.AppUrl = '';
 
    //var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Auth + "SaveUser";
  
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
                    $("#grid").data("kendoGrid").dataSource.read();
                }
                catch (ex) { }
                if (IsComeFromDestroy) {
                    $dataForm = '';
                    $('#ChildContent').hide();
                    $('#MainContent').show();
                }
                else {
                    $('#ResultMessage').addClass('alert-success show');
                    $('#ResultTxt').html(data.message);

                    setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                   
                    if ($('#Id').val() === '') {
                        $(':input', '#CMUser')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                        resetKendoDropDownByForm('CMUser');
                    }
                    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                }
            }
            else {
                
                if (data.repeated !== null && data.repeated !== undefined) {
                    markInvalid($('#' + data.repeated), data.message);
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