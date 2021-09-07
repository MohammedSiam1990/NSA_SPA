var upload = '';
$(document).ready(function () {
    var Lang = sessionStorage['lang'];
    $folderImg = 'Company';
    var list_Country = GetLookup('Country');
    
    var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
    list_Country.unshift(objPlzSelect);
    var DataSourceCountry = new kendo.data.DataSource({ data: list_Country });
   
   
    if ($('#CompanyId').val() === '') {
        var list_Currency = GetLookup('Currency');
        fillDropdown('Currency', list_Currency, '', true);
    }

    $("#Country").kendoDropDownList({
        dataTextField: Lang === 'ar' ? "NameAr":"Name",
        dataValueField: "id",
        template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',
        
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
            fillDropdown('Currency', list_Currency, Item.CurrencyId, true);
        }
    });

    BindFileUploaderkendo();
    api_call();
    FillDBSTRINGPage('CompanyForm');
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    var changeLogo = GetPermession(MenuID, 'changeLogo');
    var Edit = GetPermession(MenuID, 'edit');

    if (!changeLogo) {
        $('#photos').parent().hide();
        $('#delete-image').hide();
    }
    if (!Edit) {
        $('#UpdateCompany').hide();
        $(':input, select ', '#CompanyForm').attr('disabled', true);
        DisabledEnableKendoDropDownByForm('CompanyForm',false)
    }
});

function api_call() {
  
    var token = sessionStorage['token'];
    var companyID = sessionStorage['CompanyID'];
   
    var Lang = sessionStorage['lang'];
    var URL = $URL_Companies + "GetCompany?CompanyId=" + companyID;
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { Lang: Lang },
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
    var list_Currency = GetLookup('Currency');

    $('#CompanyId').val(data.datalist.companyId);
    $('#ApprovedBy').val(data.datalist.approvedBy);
    $('#ApprovedDate').val(data.datalist.approvedDate);
    //alert(JSON.stringify(data.datalist))
    $('#StatusId').val(data.datalist.statusId);
    $('#CreationDate').val(data.datalist.creationDate);

    $('#Email').val(data.datalist.companyEmail);
    $('#Address').val(data.datalist.companyAddress);
    $('#NameAr').val(data.datalist.companyNameAr);
    $('#Name').val(data.datalist.companyName);
    $('#Phone').val(data.datalist.phone);
    $('#Fax').val(data.datalist.faxNo);
    //alert(data.datalist.CurrencyId)
    //$('#Currency').val(data.datalist.currencyId);
    var dropdownlist = $("#Country").data("kendoDropDownList");
    dropdownlist.value(data.datalist.countryId);


    // get the dataItem corresponding to the selectedIndex.
    var dataItem = dropdownlist.dataItem();
   
    var Code = dataItem.Code;
    $('#Code').html(Code);

    fillDropdown('City', sessionStorage['City'], data.datalist.cityId, true);
    fillDropdown('Currency', list_Currency, data.datalist.currencyId, true);
    if (data.datalist.imageName !== '') {
        var img_url = data.datalist.imageName;
        $("#preview").attr("src", img_url);
        var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1); 
        $('#ImageName').val(ImageName);
    }
    $dataForm = $('#CompanyForm').serializeArray();
}

var ImageChange = function (input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
            $('#lblImage').html(input.files[0].name)
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function validFrm() {
    if ($('.error-message').length === 0)
        return true;
    else
        return false;
}

var UpdateCompany = function () {

    //if (!validFrm()) {
    //    return false;
    //}
    if (!ValidateForm('CompanyForm'))
        return false;
   
    var obj = {
        "CompanyId": "", "CompanyName": "", "CompanyNameAr": "","CompanyAddress":"",
        "CompanyEmail": "", "ImageName": "", "Phone": "", "CountryId": "",
        "CityId": "", "CurrencyId": "", "ModifiedBy": "", "ApprovedBy": "", "ApprovedDate": "",
        "StatusId": "", "CreationDate": ""
    };

    obj.CompanyId = $('#CompanyId').val();
    obj.CompanyName = $('#Name').val();
    obj.CompanyNameAr = $('#NameAr').val();
    obj.CompanyAddress = $('#Address').val();
    obj.CompanyEmail = $('#Email').val();
    obj.ImageName = $('#ImageName').val();
    obj.Phone = $('#Phone').val();
    
    obj.CountryId = $('#Country').val();
    obj.CityId = $('#City').val();
    obj.CurrencyId = $('#Currency').val();

    
    obj.ModifiedBy = sessionStorage['UserId'];
    obj.ApprovedBy = $('#ApprovedBy').val();
    obj.ApprovedDate = $('#ApprovedDate').val();
    obj.StatusId = $('#StatusId').val();
    obj.CreationDate = $('#CreationDate').val();

    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Companies + "UpdateCompany?Lang=" + Lang;
    
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
        data:JSON.stringify( obj),
        success: function (data) {
         
            if (data.success === true) {
                $('#ResultMessage').addClass('alert-success show');
                $('#ResultTxt').html(data.message);
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