$(document).ready(function () {
 
    FillCountry();

    $('#Code').html('974');

});



function onchange_CompanyName(textbox) {
    $('#Name').val(textbox.value); 
}
function ChangeCountry() {

    var element = $('#Country').find('option:selected');
  
    var Code = element.attr('Code');
    $('#Code').html(Code);
}

function validFrm() {
    if ($('.error-message').length === 0)
        return true;
    else
        return false;
}

Register = function () {
   
    var response = grecaptcha.getResponse();
    //recaptcha failed validation
    if (response.length === 0) {

        $('#ResultMessage').addClass('alert-danger show');
        $('#ResultMessage').removeClass('hide');
        $('#ResultTxt').html(DBSTRING['PleaseclickCaptcha']);

        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        return false;
    }
   
    if (!ValidateForm('registerform'))
        return false;
    
    var obj = {
        "Email": "", "Username": "", "Lang": "", "Password": "","ConfirmPassword":"",
        "PhoneNumber": "", "Name": "", "CompanyName": "", "CompanyNameAr": "", "CountryId": "",
        "UserType":""
    };



    obj.Lang = $('#selLang').val();
    obj.Email = $('#Email').val();
    obj.Password = $('#Password').val();
    obj.ConfirmPassword = $('#Password').val();
    obj.Username = $('#Email').val();
    obj.PhoneNumber = $('#Mobile').val();
    obj.Name = $('#Name').val();
    obj.CompanyName = $('#CompanyName').val();
    obj.CompanyNameAr = $('#CompanyName').val();
    obj.CountryId = 5/* $('#Country').val();*/
    obj.UserType = 1;
    var URL = $URL_Auth + "Register";
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "Json",
        contentType: 'application/json',
        async: false,
        cache: false,
        data: JSON.stringify(obj),
        success: function (data) {
            if (data.success === true) {
                //$('#ResultMessage').addClass('alert-success show');
                //$('#ResultTxt').html(data.message);
                LoadContent('register-confirmed')
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
            }
            else if (exception === 'error') {
                var obj = JSON.parse(jqXHR.responseText);
                msg = jqXHR.responseText;
                
            }
            else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#ResultMessage').addClass('alert-danger show');
            $('#ResultMessage').removeClass('hide');
            $('#ResultTxt').html(msg);
            setTimeout("$('#ResultMessage').removeClass('show')", 5000);
           
        }
    });

}

