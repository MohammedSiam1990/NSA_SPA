
$(document).ready(function () {
    //alert()
    // Remove all saved data from sessionStorage
    //sessionStorage.clear();
    fillByMemory();
});

$(document).keypress(function (event) {
    if (event.keyCode === 13) {
        auth();
    }
});


function rememberMe() {
    $.cookie('lang', $('#selLang').val());
    $.cookie('id', $('#Username').val());
    $.cookie('pass', $('#Password').val());
    $.cookie('rem', $('#user_remember_me').val());
}

function CleareRemMe() {
    $.cookie('lang', '');
    $.cookie('id', '');
    $.cookie('pass', '');
    $.cookie('rem', '');
}

function fillByMemory() {
    if (!!$.cookie('lang'))
        $('#selLang').val($.cookie('lang'));

    if (!!$.cookie('id'))
        $('#Username').val($.cookie('id'));

    if (!!$.cookie('pass'))
        $('#Password').val($.cookie('pass'));

    if (!!$.cookie('rem'))
        $('#user_remember_me').prop("checked", $.cookie('rem'));
}

function validFrm() {
    ValidateFormData('LoginForm')
    //if ($('.error-message').length === 0)
    //    return true;
    //else
    //    return false;
}

auth = function () {
    if (!ValidateFormData('LoginForm')) {
        return false;
    }

    if ($('#user_remember_me').is(':checked')) {
        rememberMe();
    }
    else {
        CleareRemMe();
    }
    var obj = {
        "Username": "","Lang":"","Password": "" };

    obj.Username = $('#Username').val();
    obj.Lang = $('#selLang').val();
    obj.Password = $('#Password').val();
    obj.UserType = 1;

    var URL = $URL_Auth + "Login";
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "Json",
        contentType: 'application/json',
        async: false,
        cache: false,
        data: JSON.stringify(obj),
        success: function (data) {  
            if (data.status) {
                sessionStorage['token'] = data.token;
                sessionStorage['Email'] = data.email;
                sessionStorage['UserName'] = data.userName;
                sessionStorage['UserId'] = data.userId;
                sessionStorage['CompanyName'] = data.companyNameEn;
                sessionStorage['CompanyNameAr'] = data.companyNameAr;
                sessionStorage['CompanyID'] = data.companyId;
                sessionStorage['IsSuperAdmin'] = data.isSuperAdmin;
                sessionStorage['RoleID'] = data.roleID;
                //alert(data.roleID)
                //alert(JSON.stringify( data))
                autoRedirect();
            }
            else {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(data.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            }
        },
        error: function (jqXHR, exception) {
            
            if (jqXHR.status === true) {
                var result = JSON.parse(jqXHR.responseText);
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(result.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            }
            else {

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
                //alert(jqXHR.responseText)
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(msg);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
            }
        }
    });
}
