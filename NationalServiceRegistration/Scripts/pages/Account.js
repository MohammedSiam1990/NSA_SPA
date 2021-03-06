$(document).ready(function () {

    var UserID = $.urlParam('userId');
    var Resetcode = $.urlParam('Resetcode');

    if (UserID !== null) {
        var code, lang;
        code = $.urlParam('code');
        lang = $.urlParam('lang');
        var URL = $URL_Auth + 'ConfirmEmail?userId=' + UserID + '&code=' + code + '&lang=' + lang;

        $.ajax({
            type: "POST",
            url: URL,
            dataType: "Json",
            contentType: 'application/json',
            async: false,
            cache: false,

            success: function (data) {
                if (data.success === true) {
                    LoadContent('register-compleat');
                }
                else {
                    LoadContent('register-error');
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
                alert(msg);
            }
        });
    }
    else if (Resetcode !== null) {
        LoadContent('ResetPassword')
    }
    else {
        if (sessionStorage['PageAccount'] !== '' && sessionStorage['PageAccount'] !== undefined) {
            LoadContent(sessionStorage['PageAccount']);
        }
        else {
            LoadContent('Login');
        }
    }
});

LoadContent = function (page) {

    try {

        $('#AccountContent').load('/Pages/Account/' + page + '.html', // url 
            function (data, status, jqXGR) {  // callback function 
                //$('.wrapper').addClass('loaded');

                if (status === "success") {
                    
                    sessionStorage['PageAccount'] = page;
                    if (page === 'Login') {
                        $('#MainAccountCss').addClass('loginpage1')
                        $('#MainAccountCss').removeClass('loginpage')
                        $("[string=LoginTitle]").html(DBSTRING['Login'])
                    }
                    else {
                        $('#MainAccountCss').addClass('loginpage')
                        $('#MainAccountCss').removeClass('loginpage1')
                        $("[string=LoginTitle]").html(DBSTRING['Register']);

                    }
                    if (sessionStorage['lang'] !== '' && sessionStorage['lang'] !== null && sessionStorage['lang'] !== undefined) {
                        $('#selLang').val(sessionStorage['lang']);
                    }
                    else {
                        $('#selLang').val('ar');

                    }
                    $('.mat-app-background').hide();
                    sessionStorage['lang'] = $('#selLang').val();
                    $Lang = $('#selLang').val();
                    //window.location.href = window.location.href;
                    var boot = '../../assets/css/bootstrap.min.rtl.css';
                    var styleCss = '../../assets/css/Ar-StyleSheet.css';
                    var Stylevaledation = '../../assets/css/valadtion-ar.css';
                    var cssTabClass = "col-md-2 pl-0";
                    var recaptcha = ''
                    var urlLang = '';
                    if (sessionStorage['lang'] === 'ar') {
                        urlLang = '../../Scripts/stringlang/AR.json'
                        recaptcha = 'https://www.google.com/recaptcha/api.js?hl=ar'
                        $('BODY').addClass('k-rtl');
                    }
                    else {
                        urlLang = '../../Scripts/stringlang/EN.json'
                        boot = '../../assets/css/bootstrap.min.css';
                        styleCss = '../../assets/css/e-StyleSheet.css';
                        cssTabClass = "col-md-2 pr-0"
                        Stylevaledation = '../../assets/css/valadtion.css';
                        recaptcha = 'https://www.google.com/recaptcha/api.js'
                        $('BODY').removeClass('k-rtl');
                    }

                    $("#bootstrap").attr('href', boot);
                    $("#styleCss").attr('href', styleCss);
                    $("#Stylevaledation").attr('href', Stylevaledation);
                    $('#LogRegTab').attr('class', cssTabClass);
                    //$('#recaptcha').attr('src', recaptcha);
                    $('#recaptcha').remove();
                    $('body').append('<script id="recaptcha" src="'+recaptcha+'" async defer></script>')

                    FillFormLang(urlLang)
                    GetLookup('');
                    FillCountry();
                    setTimeout($('.mat-app-background').show(), 30000);
                    
                    $('.mat-app-background').show();
                }
            });
    }
    catch (ss) { }
}

var FillCountry = function () {
    
    var lang = $('#selLang').val();
    var URL = $URL_Lookup + "GetLookup?Lang=" + lang;
    $.get(URL, function (data) {
      
        if (data.success) {
            var List = JSON.stringify(data.datalist.Country);
            List = JSON.parse(List)
            var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
            List.unshift(objPlzSelect);

                var DataSourceCountry = new kendo.data.DataSource({ data: List });
            try {
                $("#Country").kendoDropDownList({
                    dataTextField: lang === 'ar' ? "NameAr" : "Name",
                    dataValueField: "id",

                    template: lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',

                    dataSource: DataSourceCountry,
                    filter: "contains",
                    suggest: true,
                    index: 3,
                    change: function (e) {
                        var Item = this.dataItem();          // <---- Here is your json item

                        fillDropdown('City', sessionStorage['City'], '', true)
                        var element = $('#Country').find('option:selected');
                        var Code = element.attr('Code');
                        $('#Code').html(Item.Code)
                    }
                });
                 
            }
            catch(ss){ alert(ss) }
        }
    });

}

var ChangeLang = function () {
    
    sessionStorage['lang'] = $('#selLang').val();
    redirect('/Pages/Account/Account.html');
}

var DBSTRING = '';
var FillFormLang = function (urlLang) {

    $.get(urlLang, function (data) {

        localStorage['DBSTRING'] = JSON.stringify(data);
        DBSTRING = JSON.parse(localStorage['DBSTRING']) 
        var items = [];
        $("[string]").each(function (sd) {
            $(this).html(data[$(this).attr('string')]);
        });
        $("[placeholder]").each(function (sd) {
            $(this).attr('placeholder', data[$(this).attr('placeholder')]);
        });
        $("[data-error]").each(function (sd) {
            $(this).attr('data-error', data[$(this).attr('data-error')]);
        });
        $("[data-helper]").each(function (sd) {
            $(this).attr('data-helper', data[$(this).attr('data-helper')]);
        });
    });
}


var isLoggedIn = function () {

    var token = localStorage['token'];
    var sesToken = sessionStorage['token'];

    if (sesToken === null || sesToken === undefined || sesToken === '') { return false; }
    else { return true; }
}

var autoRedirect = function () {
    var validLogin = isLoggedIn()

    if (!validLogin && location.pathname.indexOf('Account') > -1) {
        redirect('/Pages/Account/Account.html');
    }
    if (validLogin && location.pathname.indexOf('Account') > -1) {
        redirect(window.location.origin + '/index.html');
    }
}

var redirect = function (url) {
    //alert(url)
    window.location.href = url;
}

var ForgetSend = function () {
   
    if (!ValidateFormData('ForgetPassForm')) {
        return false;
    }
    var obj = { "Email": "", "Lang": "" };
    var Lang = $('#selLang').val();
    var Email = $('#Email').val();
   
    var URL = $URL_Auth + "ForgetPassword?Email=" + Email + '&Lang=' + Lang;
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "Json",
        contentType: 'application/json',
        async: false,
        cache: false,
        //data: JSON.parse(obj),
        success: function (data) {
            if (data.success === true) {
                LoadContent('Forget-confirmed');
               
            }
            else {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(data.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
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
            alert(msg);
        }
    });
}

var ResetPass = function () {

    if (!ValidateFormData('ResetForm')) {
        return false;
    }
   
    var ResetCode = $.urlParam('Resetcode');
    var obj = {
        "Email": "", "ResetCode": "", "Password": ""
    };

    obj.Email = $('#Email').val();
    obj.ResetCode = ResetCode;
    obj.Password = $('#Password').val();

    var URL = $URL_Auth + "ResetPassword?Lang=" + $('#selLang').val();
    
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "Json",
        contentType: 'application/json',
        async: false,
        cache: false,
        data:JSON.stringify(obj),
        success: function (data) {
            if (data.success === true) {
                
                LoadContent('Reset-confirmed');
               
            }
            else {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(data.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
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