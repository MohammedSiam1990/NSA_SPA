$(document).ready(function () {
    var Lang = sessionStorage['lang'];
    $folderImg = 'Branch'
    if ($('#BranchID').val() === '') {
        var list_Country = GetLookup('Country');
        var list_Currency = GetLookup('Currency');
        var list_District = GetLookup('DistrictID');
        var list_BranchType = GetLookup('Lookups');
        var list_MST = GetLookup('MajorServiceTypes');
       
        list_BranchType = list_BranchType.filter(function (el) {
            return el.StatusID === $BranchType
        });

        list_MST = list_MST.filter(function (el) {

            return el.MajorServiceID.toString() === sessionStorage['MajorServiceID'].toString();
        })

        fillDropdown('TypeID', list_BranchType, '', true)
        fillDropdown('Currency', list_Currency, '', true);

        var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
        list_Country.unshift(objPlzSelect);
        var DataSourceCountry = new kendo.data.DataSource({ data: list_Country });
        var DataSourceMST = new kendo.data.DataSource({ data: list_MST });
        
        $("#Country").kendoDropDownList({
            dataTextField: Lang === 'ar' ? "NameAr" : "Name",
            dataValueField: "id",
            template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',

            dataSource: DataSourceCountry,
            filter: "contains",
            suggest: true,
            index: 3,
            placeholder: DBSTRING['PleaseSelect'],
            change: function (e) {
                var Item = this.dataItem();          // <---- Here is your json item
                fillDropdown('City', sessionStorage['City'], '', true)
                $("#City").data("kendoDropDownList").bind("select", onChangeCity)
                onChangeCity();
                var element = $('#Country').find('option:selected');
                var Code = element.attr('Code');
                $('#Code').html(Item.Code)
                fillDropdown('Currency', list_Currency, Item.CurrencyId, false);

                var dropdownCity = $("#City").data("kendoDropDownList");
                dropdownCity.setOptions({
                    change: onChangeCity
                });
            }
        });


        fillDropdown('City', sessionStorage['City'], '', true)

        fillDropdown('DistrictID', list_District,'', true);

        var dropdownCity = $("#City").data("kendoDropDownList");
        dropdownCity.setOptions({
            change: onChangeCity
        });

        $("#MST").kendoMultiSelect({
            dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
            dataValueField: "id",
            dataSource: DataSourceMST,
            filter: "contains",
            suggest: true
        });
        $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
    }

    BindFileUploaderkendo();

    FillDBSTRINGPage('CMBranches');
});

var FillForm = function (data) {
    
    $('#BranchID').val(data.BranchID);
    var list_Country = GetLookup('Country');
    var list_Currency = GetLookup('Currency');
    var list_BranchType = GetLookup('Lookups');
    var list_MST = GetLookup('MajorServiceTypes');

    var list_District = GetLookup('DistrictID');

    list_BranchType = list_BranchType.filter(function (el) {
        return el.StatusID === $BranchType;
    })

 

    list_MST = list_MST.filter(function (el) {

        return el.MajorServiceID.toString() === sessionStorage['MajorServiceID'].toString();
    })

    fillDropdown('TypeID', list_BranchType, data.TypeID, true)
    fillDropdown('Currency', list_Currency, data.CurrencyID, true);

    var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
    list_Country.unshift(objPlzSelect);

    var DataSourceCountry = new kendo.data.DataSource({ data: list_Country });
    var DataSourceMST = new kendo.data.DataSource({ data: list_MST });

    $("#Country").kendoDropDownList({
        dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        template: $Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',

        dataSource: DataSourceCountry,
        filter: "contains",
        suggest: true,
        index: 3,
        placeholder: DBSTRING['PleaseSelect'],
        change: function (e) {
            var Item = this.dataItem();          // <---- Here is your json item

            fillDropdown('City', sessionStorage['City'], '', true)
           
            onChangeCity();
            var element = $('#Country').find('option:selected');
            var Code = element.attr('Code');
            $('#Code').html(Item.Code)
            fillDropdown('Currency', list_Currency, Item.CurrencyId, true);
            var dropdownCity = $("#City").data("kendoDropDownList");
            dropdownCity.setOptions({
                change: onChangeCity
            });
        }
    });

    $("#MST").kendoMultiSelect({
        dataTextField: $Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",

        dataSource: DataSourceMST,
        filter: "contains",
        suggest: true
    });

    var dropdownlist = $("#Country").data("kendoDropDownList");
    var CountryID = data.CountryID === null ? '' : data.CountryID;
    dropdownlist.value(CountryID);


    var dropdownlistMST = $("#MST").data("kendoMultiSelect");
    var MSTID = data.ServiceTypeID;//=== '' ? null : data.serviceTypeID;
    var arrMST = MSTID.split(',');
    dropdownlistMST.value(arrMST);

    fillDropdown('City', sessionStorage['City'], data.CityID, true);
    fillDropdown('DistrictID', list_District, data.DistrictID, true);
    var dropdownCity = $("#City").data("kendoDropDownList");
    dropdownCity.setOptions({
        change: onChangeCity
    });
    var dataItem = dropdownlist.dataItem();
    var Code = dataItem.Code;
    $('#Code').html(Code);

    $('#BranchNum').val(data.BranchNum);
    $('#BranchName').val(data.BranchName);
    $('#BranchNameAr').val(data.BranchNameAr);
    
    $('#Address').val(data.Address);
    $('#Longitude').val(data.Longitude);
    $('#Latitude').val(data.Latitude);
    $('#StatusID').val(data.StatusID);
    
    if (data.ImageName !== '' && data.ImageName !== null) {
        var img_url = data.ImageName;
        $("#preview").attr("src", img_url);
        var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);
        $('#ImageName').val(ImageName);
    }

    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var onChangeCity = function (e) {
   
    var list_District = GetLookup('DistrictID');
    fillDropdown('DistrictID', list_District, '', true);

    var dropdownlist = $("#DistrictID").data("kendoDropDownList");
    dropdownlist.value('');
    $("#DistrictID").val('');
  
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMBranches'))
        return false;
    var obj = {

        "BranchId": "", "BranchNum": "", "BranchName": "", "BranchNameAr": "",
        "BrandId": "", "StatusID": "", "TypeId": "", "Address": "", "CountryID": "",
        "CityID": "", "CurrencyId": "", "ImageName": "", "Latitude": "", "Longitude": "",
        "InsertedBy": "", "CreateDate": "", "ModifiedBy": "",
        "LastModifyDate": "", "DeletedBy": "", "DeletedDate": "", "ServiceTypeID": "", "DistrictID": ""
    };

    obj.BranchId = $('#BranchID').val() === '' ? 0 : $('#BranchID').val();
    obj.BranchNum = $('#BranchNum').val();
    obj.BranchName = $('#BranchName').val();
    obj.BranchNameAr = $('#BranchNameAr').val();
    obj.BrandId = sessionStorage['BrandsID'];
    // if ($('#InActive').is(':checked')) {
    if (obj.BranchId === 0) {
        obj.StatusID = $Pending;
    }
    //else {
    //    obj.StatusID = $Active;
    //}
    obj.DistrictID = $('#DistrictID').val();
    obj.TypeId = $('#TypeID').val();
    obj.Address = $('#Address').val();
    obj.CountryID = $('#Country').val();
    obj.ServiceTypeID = $('#MST').val().toString();
    obj.CityID = $('#City').val();
    obj.CurrencyId = $('#Currency').val();
    obj.ImageName = $('#ImageName').val();
    obj.Latitude = $('#Latitude').val();
    obj.Longitude = $('#Longitude').val();
    obj.InsertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];
    //obj.StatusID = $('#StatusID').val();


    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Branches + "Save_Branches?Lang=" + Lang;

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
                $("#grid").data("kendoGrid").dataSource.read();
                if (IsComeFromDestroy) {
                    $dataForm = '';
                    $('#ChildContent').hide();
                    $('#MainContent').show();
                }
                else {
                    $('#ResultMessage').addClass('alert-success show');
                    $('#ResultTxt').html(data.message);

                    setTimeout("$('#ResultMessage').removeClass('show')", 2000);

                    if ($('#BranchID').val() === '') {
                        $(':input ', '#CMBranches')
                            .not(':button, :submit, :reset')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                        $("#preview").attr("src", "assets/images/bg1.png");
                        resetKendoDropDownByForm('CMBranches');

                        var dropdownlistMST = $("#MST").data("kendoMultiSelect");
                        dropdownlistMST.value([]);
                    }

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