
$(document).ready(function () {

    if ($('#CustomerID').val() === '') {
        Get_TypeUserDefined(sessionStorage['CustTypeID'], 0, true);
        var list_GenderType = GetLookup('Lookups');

        //for (i = 0; i <= list_GenderType.length; i++) {
        //  list_GenderType = list_GenderType.filter(el => el.Value !== parseInt(localStorage.getItem("GenderIDs")[i]))
        //} 

        list_GenderType = list_GenderType.filter(function (el) {
            return el.StatusID === $GenderTypes
        });

        fillDropdown('GenderID', list_GenderType, '', true)


        HidenDivByCutomerType(sessionStorage['CustTypeID'])
        FillCountry('');
    }

    if (sessionStorage['CustTypeID'] === '1') {
        $('#lblName').html(DBSTRING['lblCustomerName'])
    } else {
        $('#lblName').html(DBSTRING['lblCompanyName'])
    }

    FillDBSTRINGPage('CMCustomer');

});

var FillCountry = function (CountryID) {
     
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

                      
                        var element = $('#Country').find('option:selected');
                        var Code = element.attr('Code');
                        $('#Code').val(Item.Code)
                    },
                    value: CountryID
                });
                $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();    
            }
            catch (ss) { alert(ss) }
        }
    });
}

function ChangeCountry() {

    var element = $('#Country').find('option:selected');

    var Code = element.attr('Code');
    $('#Code').val(Code);
}

var HidenDivByCutomerType = function (CustTypeID) {
     

    if (CustTypeID == 1) {
        $("#div_AllowTermSale").addClass('d-none');
        $("#div_TermSaleLimit").addClass('d-none');
        $("#div_CreditOpenBalance").addClass('d-none');
        $("#div_IsCreditor").addClass('d-none');
        $("#div_Credit").addClass('d-none');
        $("#div_deposit").addClass('d-none');
    }
    else {
        $("#div_AllowTermSale").removeClass('d-none');
        $("#div_TermSaleLimit").removeClass('d-none');
        $("#div_CreditOpenBalance").removeClass('d-none');
        $("#div_IsCreditor").removeClass('d-none');
        $("#div_Credit").removeClass('d-none');
        $("#div_deposit").removeClass('d-none');

        
    }


    if (CustTypeID == 2) {
        $("#Div_Gender").addClass('d-none');
        $("#Div_blackList").addClass('d-none');
        $("#Div_Points").addClass('d-none');
        $("#Div_PointOpenBalance").addClass('d-none');
    }
    else {

        $("#Div_Gender").removeClass('d-none');
        $("#Div_blackList").removeClass('d-none');
        $("#Div_Points").removeClass('d-none');
        $("#Div_PointOpenBalance").removeClass('d-none');
    }

}
var FillForm = function (data) {
     
   

   

    HidenDivByCutomerType(data.CustTypeID);
  

    var list_GenderType = GetLookup('Lookups');

 

    list_GenderType = list_GenderType.filter(function (el) {
        return el.StatusID === $GenderTypes;
    })

   
    fillDropdown('GenderID', list_GenderType, data.GenderID, true)
    $('#CustomerID').val(data.CustomerID);
    $('#CustomerNum').val(data.CustomerNum);
    $('#CustomerName').val(data.CustomerName);
    $('#CustomerNameAr').val(data.CustomerNameAr);
    $('#Phone').val(data.Phone);
    $('#Mobile').val(data.Mobile);
    $('#Remarks').val(data.Remarks);
    $('#TermSaleLimit').val(data.TermSaleLimit);
    $('#Credit').val(data.Credit);
    $('#CreditOpenBalance').val(data.CreditOpenBalance);
    $('#Email').val(data.Email);
    $('#DiscountPrcnt').val(data.DiscountPrcnt);
    $('#Points').val(data.Points);
    $('#PointsOpenBalance').val(data.PointsOpenBalance);
    $('#Latitude').val(data.Latitude);
    $('#Longitude').val(data.Longitude);
    $('#CreateDateS').val(data.CreateDateS);
    $('#CustTypeID').val(data.CustTypeID);
    $('#DeliveryFee').val(data.DeliveryFee);
    $('#deposit').val(data.deposit);
    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }
  
   
    FillCountry(data.CountryID);

    
    $('#Code').val(data.Code) 


   
    if (data.AllowTermSale === true) {
        $('#AllowTermSale').prop("checked", true);
    }
    else {
        $('#AllowTermSale').prop("checked", false);
        $('#TermSaleLimit').prop('disabled', true);
    }
    if (data.IsCreditor === true) {
        $('#IsCreditor').prop("checked", true);
    }
    else {
        $('#IsCreditor').prop("checked", false);
    }
    

    if (data.BlackListed === true) {
        $('#BlackListed').prop("checked", true);
    }
    else {
        $('#BlackListed').prop("checked", false);
    }



    


    if (data.FreeDelivery === true) {
        $('#FreeDelivery').prop("checked", true);
    }
    else {
        $('#FreeDelivery').prop("checked", false);
    }

    Get_TypeUserDefined( data.CustTypeID, data.TypeID,true);
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}


function onchange_AllowTermSale() {
    $('#TermSaleLimit').val('');
    if ($('#AllowTermSale').is(':checked') === true) { 
        $("#TermSaleLimit").removeAttr('disabled', 'disabled');
        
    }
    else { 
        $("#TermSaleLimit").attr('disabled', 'disabled');
    }
}
var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMCustomer'))
        return false;

    var obj = {
        "CustomerID": "", "CustomerNum": "", "CustomerName": "", "CustomerNameAr": "",
        "CompanyID": "",  "TypeID": "", "Phone": "", "Mobile": "", "GenderID": "", "Remarks": "",
        "InsertSourceID": "", "AllowTermSale": "", "TermSaleLimit": "", "Credit": "", "CreditOpenBalance": "",
        "InsertedBy": "",   "ModifiedBy": "",  "StatusID": "", "BlackListed": "", "Email": "",
        "DeliveryFee": "", "FreeDelivery": "", "DiscountPrcnt": "", "Points": "", "PointsOpenBalance": "",
        "CreateDate": "", "LastModifyDate": "",
        "IsCreditor": "", "CustTypeID": "", "Latitude": "", "Longitude": "", "deposit": "", "CountryID": ""
    };

    obj.CustomerID = $('#CustomerID').val() === '' ? 0 : $('#CustomerID').val();
    obj.CustomerNum = $('#CustomerNum').val();
    obj.CustomerName = $('#CustomerName').val();
    obj.CustomerNameAr = $('#CustomerName').val();//$('#CustomerNameAr').val();
    obj.CompanyID = sessionStorage['CompanyID'];
    obj.TypeID = parseInt($('#TypeID').val() === '' ? null : $('#TypeID').val());
    obj.Phone = parseInt($('#Phone').val() === '' ? null : $('#Phone').val());
    obj.Mobile = parseInt($('#Mobile').val() === '' ? null : $('#Mobile').val());
    obj.GenderID = parseInt($('#GenderID').val() === '' ? null : $('#GenderID').val());
    obj.Remarks = $('#Remarks').val() === '' ? null : $('#Remarks').val();
    obj.InsertSourceID =  2;
    obj.AllowTermSale = $('#AllowTermSale').is(':checked');
    obj.TermSaleLimit = parseInt($('#TermSaleLimit').val() === '' ? null : $('#TermSaleLimit').val());
    obj.Credit = parseInt($('#Credit').val() === '' ? null : $('#Credit').val());
    obj.CreditOpenBalance = parseInt($('#CreditOpenBalance').val() === '' ? null : $('#CreditOpenBalance').val());
    obj.BlackListed = $('#BlackListed').is(':checked');
    obj.Email = $('#Email').val() ;
    obj.DeliveryFee = parseInt($('#DeliveryFee').val() === '' ? null : $('#DeliveryFee').val());
    obj.FreeDelivery = $('#FreeDelivery').is(':checked');
    obj.DiscountPrcnt = parseInt($('#DiscountPrcnt').val() === '' ? null : $('#DiscountPrcnt').val());
    obj.Points = parseInt($('#Points').val() === '' ? null : $('#Points').val());
    obj.PointsOpenBalance = parseInt($('#PointsOpenBalance').val() === '' ? null : $('#PointsOpenBalance').val());
    obj.deposit = parseInt($('#deposit').val() === '' ? null : $('#deposit').val());
    
    obj.IsCreditor = $('#IsCreditor').is(':checked');  
    obj.CustTypeID = parseInt($('#CustTypeID').val() === '' ? sessionStorage['CustTypeID'] : $('#CustTypeID').val());
    obj.Latitude = $('#Latitude').val();
    obj.Longitude = $('#Longitude').val();
    obj.CountryID = $('#Country').val();
 

    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }
    obj.InsertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;



    obj.CreateDate = today;
    obj.LastModifyDate = today;

    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Customer + "SaveCustomer?Lang=" + Lang;

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

                    if ($('#CustomerID').val() === '') {
                        $(':input', '#CMCustomer')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                        resetKendoDropDownByForm('CMCustomer');
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
            setTimeout("$('#ResultMessage').removeClass('show')", 5000);
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