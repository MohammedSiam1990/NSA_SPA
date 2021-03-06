
$(document).ready(function () {
    
    

    if ($('#SupplierID').val() === '') {
        addExtraControls();
        $('#ContactMobile').attr('disabled', true);
        var list_DueDate = GetLookup('Lookups');
        var list_District = GetLookup('DistrictID');
        list_DueDate = list_DueDate.filter(function (el) {
            return el.StatusID === $SupplierInvDueDate;
        })

        FillCountry('', function (r) {
            if (r) {
               // FillCountryCode('0');
                fillDropdown('DueDateTypeID', list_DueDate, '', true)
                fillDropdown('City', sessionStorage['City'], '', true)

                //fillDropdown('DistrictID', list_District, '', true);

                var dropdownCity = $("#City").data("kendoDropDownList");
                dropdownCity.setOptions({
                    change: onChangeCity
                });
            }
           
        });
        
    }
   
    FillDBSTRINGPage('CMSupplier');
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();

});

var addExtraControls = function () {
  //  var cont = '<div class="input-group-prepend " ><select name="CountryCode" class="form-control input-sm input-group-text" id="CountryCode" style="min-width:50px;width:100%; height: 35px;"></select ></div>'
    var mobile = '<div class="input-group-prepend "><div class="input-group-prepend " ><div class="input-group-text" id="Code" style="min-width:40px"></div></div ></div >'
    if ($Lang === 'ar') {
        $('#ContactMobile').after(mobile)
   //     $('#PhoneMobile').after(mobile)
    }
    else {
        $('#ContactMobile').before(mobile)
    //    $('#PhoneMobile').before(mobile)
    }
}

var onChangeCity = function (e) {

    var list_District = GetLookup('DistrictID');
    fillDropdown('DistrictID', list_District, '', true);

    var dropdownlist = $("#DistrictID").data("kendoDropDownList");
    dropdownlist.value('');
    $("#DistrictID").val('');

}
var FillCountry = function (CountryID, callbak) {
     
    var lang = sessionStorage['lang'];
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
                        //$("#City").data("kendoDropDownList").bind("select", onChangeCity)
                        //onChangeCity();
                        var element = $("#Country").find('option:selected');
                        var Code = element.attr('Code');
                        $('#Code').html(Item.Code)

                        var dropdownCity = $("#City").data("kendoDropDownList");
                        //dropdownCity.setOptions({
                        //    change: onChangeCity
                        //});
                    },
                    value: CountryID
                });

                callbak(true)
            }
            catch (ss) { alert(ss) }
        }
    });
}

//var FillCountryCode = function (CountryID) {

//    var lang = sessionStorage['lang'];
//    var URL = $URL_Lookup + "GetLookup?Lang=" + lang;
//    $.get(URL, function (data) {

//        if (data.success) {
//            var List = JSON.stringify(data.datalist.Country);
//            List = JSON.parse(List)
//            var objPlzSelect = { 'id': '0', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'],'Code':'000' };
//            List.unshift(objPlzSelect);

//            var DataSourceCountry = new kendo.data.DataSource({ data: List });
//            try {
//                $("#CountryCode").kendoDropDownList({
//                    dataTextField: "Code",
//                    dataValueField: "id",
//                    autoWidth: true,
//                    template: lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',

//                    dataSource: DataSourceCountry,
//                    filter: "contains",
//                    suggest: true,
//                    index: 3,
//                    change: function (e) {
//                        var Item = this.dataItem(); 
//                        if (Item.Code === '000') {
//                            $('#ContactMobile').val('').attr('disabled', true);
                            
//                        }
//                        else {
//                            $('#ContactMobile').attr('disabled', false);
//                        }
//                    },
//                    value: CountryID
//                });
//            }
//            catch (ss) { alert(ss) }
//        }
//    });
//}

var FillForm = function (data) {
    addExtraControls();
    var list_DueDate = GetLookup('Lookups');
    var list_District = GetLookup('DistrictID');

    list_DueDate = list_DueDate.filter(function (el) {
        return el.StatusID === $SupplierInvDueDate;
    })
    
    fillDropdown('DueDateTypeID', list_DueDate, data.DueDateTypeID, true)
    $('#SupplierID').val(data.SupplierID);
   // $('#AddressID').val(data.AddressID);
    $('#SupplierNum').val(data.SupplierNum);
    $('#SupplierName').val(data.SupplierName);
    $('#SupplierNameAr').val(data.SupplierNameAr);
    $('#ContactName').val(data.ContactName);
    $('#Remarks').val(data.Remarks);
    $('#ContactMobile').val(data.ContactMobile);
    $('#TaxNum').val(data.TaxNum);
    $('#DueDateDays').val(data.DueDateDays);
    $('#Email').val(data.Email);
    
    $('#Title').val(data.Title);
    $('#PhoneMobile').val(data.PhoneMobile);
    $('#Phone').val(data.Phone);
    $('#BuildingInf').val(data.BuildingInf);
   
   // $('#AddressDescription').val(data.AddressDescription);
    //$('#Street').val(data.Street);
    //$('#Area').val(data.Area);
  
    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }
    if (data.AcceptTermSale === true) {
     
        $('#AcceptTermSale').prop("checked", true);
    }
    else {
        $('#AcceptTermSale').prop("checked", false);
    }
    if (data.NoTax === true) {
        $('#NoTax').prop("checked", true);
    }
    else {
        $('#NoTax').prop("checked", false);
    }
    
    FillCountry(data.CountryID, function (r) {

        if (r) {
            var dropdown = $("#Country").data("kendoDropDownList");

            fillDropdown('City', sessionStorage['City'], data.CityID, true);
            //fillDropdown('DistrictID', list_District, data.DistrictID, true);
            var dropdownCity = $("#City").data("kendoDropDownList");
            dropdownCity.setOptions({
                change: onChangeCity
            });
            var dataItem = dropdown.dataItem();
            var Code = dataItem.Code;
            $('#Code').html(Code);
            //FillCountryCode(data.ContactCountryCodeID);
            $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
        }
    });
    
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMSupplier'))
        return false;

    var obj = {
        "SupplierID": "", "SupplierNum": "", "SupplierName": "", "SupplierNameAr": "", "ContactName": "",
        "ContactMobile": "", "AcceptTermSale": "", "NoTax": "", "TaxNum": "","Remarks":"",
        "InsertedBy": "", "ModifiedBy": "", "StatusID": "", "AddressID": "", "Email": "",
        "DueDateDays": "", "DueDateTypeID": "", "CompanyID": "",
        "CreateDate": "", "LastModifyDate": "", "CountryID": "", "CityID": "","Phone":""
    };

    obj.SupplierID = $('#SupplierID').val() === '' ? 0 : $('#SupplierID').val();
    obj.AddressID = $('#AddressID').val() === '' ? 0 : $('#AddressID').val();
    obj.SupplierNum = $('#SupplierNum').val();
    obj.SupplierName = $('#SupplierName').val();
    obj.SupplierNameAr = $('#SupplierNameAr').val();
    obj.CompanyID = sessionStorage['CompanyID'];
    obj.ContactName = $('#ContactName').val();
    obj.ContactMobile = $('#ContactMobile').val();
    obj.AcceptTermSale = $('#AcceptTermSale').is(':checked');
    obj.NoTax = $('#NoTax').is(':checked');
    obj.TaxNum = $('#TaxNum').val();
    obj.Remarks = $('#Remarks').val();
    obj.Email = $('#Email').val();
    
    obj.DueDateDays = $('#DueDateDays').val();  
    obj.DueDateTypeID = $('#DueDateTypeID').val();

    obj.CountryID = $('#Country').val();
    obj.CityID = $('#City').val();
    obj.Phone = $('#Phone').val();

    //objAddress = {
    //    "AddressID": "", "Title": "", "AddressDescription": "", "PhoneMobile": "",
    //    "Latitude": "", "Longitude": "", "CountryID": "", "CityID": "", "DistrictID": "", "Area": "",
    //    "Street": "", "BuildingInf": "", "CustomerID": "", "StatusID": ""
    //};

    //objAddress.AddressID = $('#AddressID').val() === '' ? 0 : $('#AddressID').val();
    //objAddress.Title = $('#Title').val();
    //objAddress.AddressDescription = $('#AddressDescription').val();
    //objAddress.PhoneMobile = $('#PhoneMobile').val();

    //objAddress.CountryID = $('#Country').val();
    //objAddress.CityID = $('#City').val();
    //objAddress.DistrictID = $('#DistrictID').val();
    //objAddress.Area = $('#Area').val();
    //objAddress.Street = $('#Street').val();
    //objAddress.BuildingInf = $('#BuildingInf').val();
    //objAddress.StatusID = $Active;

    //objAddress.Latitude =  0 ;
    //objAddress.Longitude = 0;

    //objAddress.CustomerID = null;

    //obj.Address = objAddress;
 

    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }
   // obj.ContactCountryCodeID = $('#CountryCode').val();
    obj.InsertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];
    //alert($('#CountryCode').val())

   //alert(JSON.stringify(obj))
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Supplier + "SaveSupplier?Lang=" + Lang;

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
                    $('#ResultCustomer').html(data.message);

                    setTimeout("$('#ResultMessage').removeClass('show')", 2000);

                    if ($('#SupplierID').val() === '') {
                        $(':input', '#CMSupplier')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                        resetKendoDropDownByForm('CMSupplier');
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
                    $('#ResultCustomer').html(data.message);
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
            $('#ResultCustomer').html(msg);
           // setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        }
    });

}

var Get_TypeUserDefined = function (CustTypeID, UserDefinedObjectsID, PlzSelect) {


    var lang = sessionStorage['lang'];
    var CompanyID = sessionStorage['CompanyID'];
    var TypeID = CustTypeID;
    if (TypeID === '' || TypeID === null || TypeID === undefined || isNaN(TypeID)) {
        TypeID = 0
    }
    var URL = $URL_UserDefined + "GetUserDefined?CompanyID=" + CompanyID + "&TypeID=" + TypeID + "&Lang=" + $Lang.toLowerCase();

    $.get(URL, function (data) {
        if (data.success) {

             

            var lang = sessionStorage['lang'];
            var $dropdown = $("#TypeID");
            $dropdown.empty();
            if (PlzSelect) {
                $dropdown.append($("<option UserDefinedObjectsID='' string='PleaseSelect'/>").val('').text(DBSTRING['PleaseSelect']));
            }


            for (var i = 0; i < data.datalist.UserDefinedObjects.length; i++) {

                if (parseInt(UserDefinedObjectsID) === data.datalist.UserDefinedObjects[i].UserDefinedObjectsID)
                    $dropdown.append($("<option type='button' tabindex='0' UserDefinedObjectsID='" + data.datalist.UserDefinedObjects[i].UserDefinedObjectsID + "' class='dropdown-item' selected='selected'/>").val(data.datalist.UserDefinedObjects[i].UserDefinedObjectsID).text(lang === 'ar' ? data.datalist.UserDefinedObjects[i].NameAr : data.datalist.UserDefinedObjects[i].Name));
                else
                    $dropdown.append($("<option type='button' tabindex='0' UserDefinedObjectsID='" + data.datalist.UserDefinedObjects[i].UserDefinedObjectsID + "' class='dropdown-item' />").val(data.datalist.UserDefinedObjects[i].UserDefinedObjectsID).text(lang === 'ar' ? data.datalist.UserDefinedObjects[i].NameAr : data.datalist.UserDefinedObjects[i].Name));

            }



            $dropdown.kendoDropDownList({
                filter: "contains",
                suggest: true,
                dataTextField: lang === 'ar' ? "NameAr" : "Name",
                dataValueField: "UserDefinedObjectsID",
                messages: {
                    noData: DBSTRING["NoMatchingData"]
                },
                index: 3
            });


        }

    });



}