$(document).ready(function () {
    var Lang = sessionStorage['lang'];
    $folderImg = 'Brand'
    if ($('#BrandID').val() === '') {

        var list_MajorService = GetLookup('MajorServices');
        var list_Country = GetLookup('Country');
        var list_Currency = GetLookup('Currency');


        fillDropdown('MajorService', list_MajorService, '', true);
        //fillDropdownCountry('Country', list_Company, '', true);
        fillDropdown('Currency', list_Currency, '', true);

        var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
        list_Country.unshift(objPlzSelect);
        //fillDropdownCountry('Country', list_Country, '', false);
        var DataSourceCountry = new kendo.data.DataSource({ data: list_Country });

        $("#Country").kendoDropDownList({
            dataTextField: Lang === 'ar' ? "NameAr" : "Name",
            dataValueField: "id",

            //valueTemplate: '',
            template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',

            dataSource: DataSourceCountry,
            filter: "contains",
            suggest: true,
            index: 3,
            placeholder: DBSTRING['PleaseSelect'],
            change: function (e) {
                var Item = this.dataItem();          // <---- Here is your json item
                var list_Currency = GetLookup('Currency');

                fillDropdown('City', sessionStorage['City'], '', true)
                var element = $('#Country').find('option:selected');
                var Code = element.attr('Code');
                $('#Code').html(Item.Code)
                //alert(JSON.stringify(Item));
                fillDropdown('Currency', list_Currency, Item.CurrencyId, true);
            }
        });
       
        $('#City').kendoDropDownList({
            filter: "contains",
            suggest: true,
            index: 3
        });


        $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
    }

    BindFileUploaderkendo();

    FillDBSTRINGPage('CMBrands');

});

var changeChkBrands = function ($this) {
    if ($($this).is(":checked")) {

        if ($($this).attr('id') === 'IsDefault') {
            $('#InActive').prop("checked", false)
            $('#InActive').prop('disabled', true);
        }
        else {
            $('#IsDefault').prop('disabled', true);
        }
    }
    else {
        if ($($this).attr('id') === 'IsDefault') {
            $('#InActive').prop("checked", false)
            $('#InActive').prop('disabled', false);
        }
        else {
            $('#IsDefault').prop('disabled', false);
        }
    }
}

var FillForm = function (data) {

    $('#BrandID').val(data.BrandID);
    var list_MajorService = GetLookup('MajorServices');
    var list_Country = GetLookup('Country');
    var list_Currency = GetLookup('Currency');

    fillDropdown('MajorService', list_MajorService, data.MajorServiceID, true);
    var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
    list_Country.unshift(objPlzSelect);
    //fillDropdownCountry('Country', list_Country, '', false);
    var DataSourceCountry = new kendo.data.DataSource({ data: list_Country });
    $('#MajorService').val(data.MajorServiceID);

    if (data.MajorServiceID !== '' && data.MajorServiceID !== null) {
        $('#MajorService').attr('disabled', true);
    }

    $("#Country").kendoDropDownList({
        dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",

        //valueTemplate: '',
        template: $Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',

        dataSource: DataSourceCountry,
        filter: "contains",
        suggest: true,
        index: 3,
        placeholder: DBSTRING['PleaseSelect'],
        change: function (e) {
            var Item = this.dataItem();          // <---- Here is your json item

            fillDropdown('City', sessionStorage['City'], '', true)
            var element = $('#Country').find('option:selected');
            var Code = element.attr('Code');
            $('#Code').html(Item.Code)

            fillDropdown('Currency', list_Currency, Item.CurrencyId, true);
        }
    });

    var dropdownlist = $("#Country").data("kendoDropDownList");

    var CountryID = data.countryId === null ? '' : data.CountryID;
    dropdownlist.value(CountryID);

    fillDropdown('Currency', list_Currency, data.CurrencyID, true);
    fillDropdown('City', sessionStorage['City'], data.CityID, true);

    $('#City').val(data.CityID)

    $('#BrandName').val(data.BrandName);
    $('#BrandNameAr').val(data.BrandNameAr);
    $('#StatusID').val(data.StatusID);

    $('#TaxNo').val(data.TaxNo);

    if (data.ImageName !== '' && data.ImageName !== null) {
        var img_url = data.ImageName;
        $("#preview").attr("src", img_url);
        var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);
        $('#ImageName').val(ImageName);
    }

    if (data.IsDefault) {
        $('#IsDefault').prop("checked", true);
        $('#IsDefault').prop('disabled', true);
        $('#InActive').prop('disabled', true);
    }
    else {
        $('#IsDefault').prop("checked", false);
    }

    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }

    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMBrands'))
        return false;

   
    var obj = {
        "BrandID": "", "BrandName": "", "BrandNameAr": "", "StatusID": "","MajorServiceID":"",
        "ImageName": "", "TaxNo": "", "CountryId": "", "CityId": "", "CurrencyId": "",
        "CompanyId": "", "IsDefault": "", "deletedDate": "", "deletedBy": "", "modifiedBy": "",
        "lastModifyDate": "", "createDate": "","insertedBy":""
    };

    obj.BrandID = $('#BrandID').val() === '' ? 0 : $('#BrandID').val();
    obj.BrandName = $('#BrandName').val();
    obj.BrandNameAr = $('#BrandNameAr').val();
    obj.MajorServiceID = $('#MajorService').val();
   
    obj.CountryId = $('#Country').val();
    obj.ImageName = $('#ImageName').val();
    obj.TaxNo = $('#TaxNo').val();
    obj.CityId = $('#City').val();
    obj.CurrencyId = $('#Currency').val();
    obj.CompanyId = sessionStorage['CompanyID'];
    obj.IsDefault = $('#IsDefault').is(':checked');
    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }

    obj.insertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];

    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Brands + "Save_Brand?Lang=" + Lang + '&rand='+Math.random();
    
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "Json",
        contentType: 'application/json',
        async: false,
        //cache: false,
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
                FillBrandsDropDown();

                if (sessionStorage['IsModalContent'] === true || sessionStorage['IsModalContent'] === 'true') {

                    sessionStorage['IsModalContent'] = false;
                    $('#ChildpopModal').remove();
                    LoadContent('Dashboard');
                }
                else if (IsComeFromDestroy) {
                    $dataForm = ''
                    $('#ChildContent').hide();
                    $('#MainContent').show();
                }
                else {
                    $('#ResultMessage').addClass('alert-success show');
                    $('#ResultTxt').html(data.message);

                    setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                   
                    if ($('#BrandID').val() === '') {
                        $(':input, select option:selected', '#CMBrands')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                    }
                    resetKendoDropDownByForm('CMBrands')
                    
                    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                }
            }
            else {
                if (data.repeated !== null) {
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