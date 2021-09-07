
$(document).ready(function () {
    //alert();
    FillDBSTRINGPage('CMRoles');
    if ($('#Id').val() === '') {
        $("#BranchIDs").kendoMultiSelect({
            filter: "contains",
            suggest: true,
            dataTextField: $Lang === 'ar' ? "BranchNameAr" : "BranchName",
            dataValueField: "BranchID",
           
            groupTemplate: "#: data #",
            messages: {
                noData: DBSTRING["NoMatchingData"]
            },
            index: 3
           
        });
        FillBrand('')
    }
    
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
});

var FillForm = function (data) {

    $('#Id').val(data.Id);
    $('#CreateDate').val(data.CreateDate);
    $('#Name').val(data.Name);
    $('#NameAr').val(data.NameAr);
    //alert(data.BrandsIDs)
    var arrBrands = [];
    var arrBranches = [];
    try {
        if (data.BrandsIDs !== '') {
            arrBrands = data.BrandsIDs.split(',');
            arrBranches = data.BranchsIDs.split(',');
        }
    }
    catch (ee) {
        alert(ee)
    }

    $("#BranchIDs").kendoMultiSelect({
        filter: "contains",
        suggest: true,
        dataTextField: $Lang === 'ar' ? "BranchNameAr" : "BranchName",
        dataValueField: "BranchID",
        //fixedGroupTemplate: "LEFT ALIGNED, FULL ROW #=data#",
        groupTemplate: "#: data #",
        messages: {
            noData: DBSTRING["NoMatchingData"]
        },
        index: 3
    });
     
    FillBrand(arrBrands,arrBranches)
    
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var FillBrand = function (Selecte,SelecteBranches) {
    var lang = sessionStorage['lang'];
    var $dropdown = $("#BrandsIDs");

    var token = 'bearer ' + sessionStorage['token'];
    var CompID = sessionStorage['CompanyID'];
    var UserID = sessionStorage['UserId'];
    var URL = $URL_Brands + "GetBrands";
    sessionStorage['BrandPending'] = '';
    $.ajax({
        type: 'GET',
        url: URL,
        headers: {
            Authorization: token
        },
        async: false,
        contentType: 'application/json',
        data: { UserID: UserID, CompanyID: CompID, Lang: $Lang },
        success: function (data) {

            var ds = new kendo.data.DataSource.create({
                data: data.datalist
            });
            
            $dropdown.kendoMultiSelect({
                filter: "contains",
                suggest: true,
                dataTextField: lang === 'ar' ? "BrandNameAr" : "BrandName",
                dataValueField: "BrandID",
                dataSource: ds,
                
                messages: {
                    noData: DBSTRING["NoMatchingData"]
                }, 
                index: 3,
                value: Selecte,
                change: function (e) {  
                    FillBranchesData();
                }
            });
            FillBranchesData(SelecteBranches);
        }
    });
}

var FillBranchesData = function (SelecteBranches) {

    var $BrandsIDs = $("#BrandsIDs").data("kendoMultiSelect");
    var dataItem = $BrandsIDs.dataItems();
    var arr = [];
    _.map(dataItem, function (x) {
        _.map(x.Branches, function (it) {
            it.Brand = $Lang === 'ar' ? x.BrandNameAr : x.BrandName;
           
            arr.push(it);
        });
    });

    try {

        var $Branch = $("#BranchIDs").data("kendoMultiSelect");
        $Branch.setDataSource(new kendo.data.DataSource({ data: arr, group: { field: "Brand" }}))
        $Branch.value(SelecteBranches)
    }
    catch (ex) {
        alert(ex)
    }
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMRoles'))
        return false;

    var obj = {
        "Id": "", "Name": "", "NameAr": "", "CompanyId": "", "ModifiedBy": "",
        "LastModifyDate": "", "CreateDate": "", "InsertedBy": "", "BrandsIDs": "","BranchsIDs":""
    };

    obj.Id = $('#Id').val() === '' ? 0 : $('#Id').val();
    obj.Name = $('#Name').val();
    obj.NameAr = $('#NameAr').val();
    obj.CompanyId= sessionStorage['CompanyID'];

    obj.CreateDate = $('#CreateDate').val();
    //obj.LastModifyDate = Date.now
    obj.InsertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];
    obj.BrandsIDs = $('#BrandsIDs').val().toString();
    obj.BranchsIDs = $('#BranchIDs').val().toString();
   
    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Roles + "SaveRole?Lang=" + Lang;
  
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
                   
                    if ($('#Id').val() === '') {
                        $(':input', '#CMRoles')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                        resetKendoDropDownByForm('CMRoles');
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