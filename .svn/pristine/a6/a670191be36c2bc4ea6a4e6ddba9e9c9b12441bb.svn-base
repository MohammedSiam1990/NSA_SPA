
$(document).ready(function () {
    FillDBSTRINGPage('CMTax');
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
});

var FillForm = function (data) {
    
    $('#TaxID').val(data.TaxID);
   
    $('#TaxName').val(data.TaxName);
    $('#TaxNameAr').val(data.TaxNameAr);
    $('#TaxVal').val(data.TaxVal);
   
    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }
 
    if (data.SpecialTax ) {
        $('#SpecialTax').prop("checked", true);
    }
    else {
        $('#SpecialTax').prop("checked", false);
    }
  
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMTax'))
        return false;

    var obj = {
        "TaxID": "", "TaxName": "", "TaxNameAr": "", "TaxVal": "", "SpecialTax":"",
        "StatusID": "", "CompanyID": "" , "modifiedBy": "",
        "lastModifyDate": "", "CreateDate": "", "insertedBy": ""
    };

    obj.TaxID = $('#TaxID').val() === '' ? 0 : $('#TaxID').val();
    obj.TaxName = $('#TaxName').val();
    obj.TaxNameAr = $('#TaxNameAr').val();
    obj.TaxVal = $('#TaxVal').val();
    obj.SpecialTax = $('#SpecialTax').is(':checked');
    obj.CompanyID= sessionStorage['CompanyID'];
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
    var URL = $URL_Tax + "Save_Tax?Lang=" + Lang;
  
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
                   
                    if ($('#TaxID').val() === '') {
                        $(':input', '#CMTax')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
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