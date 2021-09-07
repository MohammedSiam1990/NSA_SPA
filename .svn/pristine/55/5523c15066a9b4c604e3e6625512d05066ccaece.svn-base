
$(document).ready(function () {


    if ($('#PaymentMethodID').val() === '') {
        $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();


        var list_PaymentMethodType = GetLookup('Lookups');
        var list_FreePaymentType = GetLookup('Lookups');

        var i;
        for (i = 0; i <= list_PaymentMethodType.length; i++) {
            list_PaymentMethodType = list_PaymentMethodType.filter(el => el.Value !== parseInt(localStorage.getItem("TypeIDs")[i]))
        }

        for (i = 0; i <= list_FreePaymentType.length; i++) {
            //alert(list_FreePaymentType.length)
            list_FreePaymentType = list_FreePaymentType.filter(el => el.Value !== parseInt(localStorage.getItem("FreeTypeIDs")[i]))
        }

        list_PaymentMethodType = list_PaymentMethodType.filter(function (el) {
            return el.StatusID === $PaymentMethodType 
        });


        list_FreePaymentType = list_FreePaymentType.filter(function (el) {
            return el.StatusID === $FreePaymentType
        });
        //alert(JSON.stringify(list_PaymentMethodType))
        fillDropdown('TypeID', list_PaymentMethodType, '', true)
        fillDropdown('FreePaymentTypeID', list_FreePaymentType, '', true)


        $("#div_FreePaymentType").addClass("hide");
        $("#div_CalcTaxOnFreePM").addClass("hide");
        $("#div_CommissionPrcnt").addClass("hide");
        $("#div_CommissionOnClient").addClass("hide");
        $("#div_CalcCommissionTax").addClass("hide");
    }
    FillDBSTRINGPage('CMPaymentMethod');
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
});



function getAr_En_PaymentMethodType(Tag) {

    if (Tag === '' || sessionStorage[Tag] === null || sessionStorage[Tag] === undefined || sessionStorage[Tag] === '') {

        var lang = sessionStorage['lang'];

        if (lang.toLowerCase() === 'ar') {
            lang = 'en';
        }

        var URL = $URL_Lookup + "GetLookup?Lang=" + lang.toLowerCase();

        $.get(URL, function (data) {
            if (data.success) {

                $.each(data.datalist, function (index, value) {
                    alert(JSON.stringify(value))
                    sessionStorage[index] = JSON.stringify(value);
                });
            }
        });
    }
    else {
        return JSON.parse(sessionStorage[Tag]);
    }

}
var FillForm = function (data) {


    var list_PaymentMethodType = GetLookup('Lookups');
    var list_FreePaymentType = GetLookup('Lookups');


    list_PaymentMethodType = list_PaymentMethodType.filter(function (el) {
        return el.StatusID === $PaymentMethodType;
    })

    list_FreePaymentType = list_FreePaymentType.filter(function (el) {
        return el.StatusID === $FreePaymentType;
    })

    $('#PaymentMethodID').val(data.PaymentMethodID);



    $('#PaymentMethodName').val(data.PaymentMethodName);
    $('#PaymentMethodNameAr').val(data.PaymentMethodNameAr);
    $('#CalcTaxOnFreePM').val(data.CalcTaxOnFreePM);
    fillDropdown('TypeID', list_PaymentMethodType, data.TypeID, true)
    fillDropdown('FreePaymentTypeID', list_FreePaymentType, data.FreePaymentTypeID, true)

    $('#TypeID').val(data.TypeID);
    $('#TypeID').data('kendoDropDownList').enable(false);

    $('#FreePaymentTypeID').val(data.FreePaymentTypeID);
    $('#FreePaymentTypeID').data('kendoDropDownList').enable(false);


    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }


    



    if (data.CalcTaxOnFreePM === true) {
        $('#CalcTaxOnFreePM').prop("checked", true);
    }
    else {
        $('#CalcTaxOnFreePM').prop("checked", false);
    }



    if (data.CalcCommissionTax === true) {
        $('#CalcCommissionTax').prop("checked", true);
    }
    else {
        $('#CalcCommissionTax').prop("checked", false);
    }


    if (data.CommissionOnClient === true) {
        $('#CommissionOnClient').prop("checked", true);
    }
    else {
        $('#CommissionOnClient').prop("checked", false);
    }

    $('#CommissionPrcnt').val(data.CommissionPrcnt);

    $("#div_FreePaymentType").addClass("hide");
    $("#div_CalcTaxOnFreePM").addClass("hide");
    $("#div_CommissionPrcnt").addClass("hide");
    $("#div_CommissionOnClient").addClass("hide");
    $("#div_CalcCommissionTax").addClass("hide");


    if ($('#TypeID').val() == 3) {
        $("#div_CalcTaxOnFreePM").removeClass("hide")
        $("#div_FreePaymentType").removeClass("hide");
    } else if ($('#TypeID').val() == 4) {
        $("#div_CommissionPrcnt").removeClass("hide");
        $("#div_CommissionOnClient").removeClass("hide");
        $("#div_CalcCommissionTax").removeClass("hide");
    }



    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}


function onchange_Type() {


    $('#PaymentMethodName').val('');
    $('#PaymentMethodNameAr').val('');

    try {
        $('#FreePaymentTypeID').val('')
    } catch (e) {

    }






    var list_PaymentMethodTypeAr_En = getAr_En_PaymentMethodType('Lookups');
    list_PaymentMethodTypeAr_En = list_PaymentMethodTypeAr_En.filter(function (el) {
        return el.StatusID === $PaymentMethodType
    });


    list_PaymentMethodTypeAr_En = list_PaymentMethodTypeAr_En.filter(function (el) {
        return el.Value === parseInt($('#TypeID').val())
    });


    if (list_PaymentMethodTypeAr_En.length > 0 && ($('#PaymentMethodID').val() === "" || $('#PaymentMethodID').val() === 0)) {
        $('#PaymentMethodName').val(list_PaymentMethodTypeAr_En[0].Name);
        $('#PaymentMethodNameAr').val(list_PaymentMethodTypeAr_En[0].NameAr);
    }



    $("#div_FreePaymentType").addClass("hide");
    $("#div_CalcTaxOnFreePM").addClass("hide");
    $("#div_CommissionPrcnt").addClass("hide");
    $("#div_CommissionOnClient").addClass("hide");
    $("#div_CalcCommissionTax").addClass("hide");


    if ($('#TypeID').val() == 3) {
        $("#div_CalcTaxOnFreePM").removeClass("hide")
        $("#div_FreePaymentType").removeClass("hide");
    } else if ($('#TypeID').val() == 4) {
        $("#div_CommissionPrcnt").removeClass("hide");
        $("#div_CommissionOnClient").removeClass("hide");
        $("#div_CalcCommissionTax").removeClass("hide");
    }

}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMPaymentMethod'))
        return false;

    var obj = {
        "PaymentMethodID": "", "CompanyID": "", "TypeID": "", "PaymentMethodName": "", "PaymentMethodNameAr": "", "CommissionPrcnt": "",
        "CalcCommissionTax": "", "CommissionOnClient": "", "FreePaymentTypeID": "", "CalcTaxOnFreePM": "",
        "InsertedBy": "", "ModifiedBy": "", "StatusID": ""
    };








    obj.PaymentMethodID = $('#PaymentMethodID').val() === '' ? 0 : $('#PaymentMethodID').val();
    obj.CompanyID = parseInt(sessionStorage['CompanyID']);
    obj.TypeID = parseInt($('#TypeID').val() === '' ? null : $('#TypeID').val());
    obj.PaymentMethodName = $('#PaymentMethodName').val();
    obj.PaymentMethodNameAr = $('#PaymentMethodNameAr').val();
    if ($('#TypeID').val() === "3") {
        obj.FreePaymentTypeID = $('#FreePaymentTypeID').val() === '' ? 0 : parseInt($('#FreePaymentTypeID').val());
        obj.CalcTaxOnFreePM = $('#CalcTaxOnFreePM').is(':checked');
    } else {
        obj.FreePaymentTypeID = 0;
        obj.CalcTaxOnFreePM = false;
    }

    if ($('#TypeID').val() === "4") {
        obj.CommissionPrcnt = $('#CommissionPrcnt').val() === '' ? 0 : parseFloat($('#CommissionPrcnt').val());
        obj.CalcCommissionTax = $('#CalcCommissionTax').is(':checked');
        obj.CommissionOnClient = $('#CommissionOnClient').is(':checked');

    } else {
        obj.CommissionPrcnt = 0;
        obj.CalcCommissionTax = false;
        obj.CommissionOnClient = false;

    }



    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }



    obj.InsertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];

    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_PaymentMethod + "SavePaymentMethods?Lang=" + Lang;

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
                    $('#ResultPaymentMethod').html(data.message);

                    setTimeout("$('#ResultMessage').removeClass('show')", 2000);

                    if ($('#PaymentMethodID').val() === '') {
                        $(':input', '#CMPaymentMethod')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                    }
                    resetKendoDropDownByForm('CMPaymentMethod')
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
                    $('#ResultPaymentMethod').html(data.message);
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
            $('#ResultPaymentMethod').html(msg);
            setTimeout("$('#ResultMessage').removeClass('show')", 5000);
        }
    });

}


