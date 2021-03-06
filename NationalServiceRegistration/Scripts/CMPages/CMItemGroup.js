
$(document).ready(function () {
    
    var strFilter;
    //var TypeID = sessionStorage['TypeID'].toString();
    //if (TypeID === '1') {
    //    strFilter = DBSTRING['ItemGroup']
    //}
    //else if (TypeID === '2') {
    //    strFilter = DBSTRING['Department']
    //}
    //else if(TypeID=== '3'){
    //    strFilter = DBSTRING['SaleGroup']
    //}

    //$('#TitleItemGroup').html(DBSTRING['ItemGroups']);
    //$('#subTitleItemGroup').html(strFilter);
    

    $folderImg = 'ItemGroup'
    if (sessionStorage['TypeID'].toString() !== "3") {
        $('.NameMobile').hide();
    }
   
    var Lang = sessionStorage['lang'];
   
    if ($('#ItemGroupID').val() === '') {
        try {
            $("#GroupColor").kendoColorPicker({ buttons: false });

            var listIcon = GetLookup('SalesGroupsIcons');
            listIcon = $.map(listIcon, function (item) {
                var obj = {
                    "url": "", "select": ""
                };
                obj.url = item;
                obj.select = '';
                return obj;
            });
            var template = kendo.template($("#template").html());

            $("#ImageView").html(kendo.render(template, listIcon));
        }
        catch (ee) {alert(ee)}
    }
    
    BindFileUploaderkendo();
    FillDBSTRINGPage('CMItemGroups');

    $('.ImageView').on('click', function () {
        $(this).toggleClass('selected');
        $('.selected').not(this).removeClass('selected')
    });
    
    if (sessionStorage['TypeID'].toString() === '3') {
        $('.imageSelect').show();
        $('.imgUpload').hide();
    }
    else {
        $('.imageSelect').hide();
        $('.imgUpload').show();
    }

    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
});

var FillForm = function (data) {

    $('#ItemGroupID').val(data.ItemGroupID);

    $('#ItemGroupNum').val(data.ItemGroupNum);
    $('#ItemGroupName').val(data.ItemGroupName);
    $('#ItemGroupNameAr').val(data.ItemGroupNameAr);
    $('#ItemGroupMobileName').val(data.ItemGroupMobileName);
    $('#ItemGroupMobileNameAr').val(data.ItemGroupMobileNameAr);


    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }
    var ImageName = '';
    if (data.ImageName !== '' && data.ImageName !== null) {
        var img_url = data.ImageName;
        $("#preview").attr("src", img_url);
        ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);
        $('#ImageName').val(ImageName);
    }

    $("#GroupColor").kendoColorPicker();
    var colorpicker = $("#GroupColor").data("kendoColorPicker");

    // set picker value
    colorpicker.value(data.GroupColor);

    var listIcon = GetLookup('SalesGroupsIcons');

    listIcon = $.map(listIcon, function (item) {
        var obj = { "url": "", "select": "" };
        var img_name = item.substring(item.lastIndexOf('/') + 1, item.length);
        if (ImageName === img_name) {
            obj.select = 'selected';
        }
        else {
            obj.select = '';
        }
        obj.url = item;
        return obj;
    });
    var template = kendo.template($("#template").html());

    $("#ImageView").html(kendo.render(template, listIcon))
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var SaveUpdate = function (IsComeFromDestroy) {
    $('#ResultMessage').removeClass('alert-success');
    $('#ResultMessage').removeClass('alert-danger');
    if (!ValidateForm('CMItemGroups'))
        return false;

    var obj = {

        "ItemGroupID": "", "ItemGroupNum": "", "ItemGroupName": "", "ItemGroupNameAr": "", 
        "ItemGroupMobileName": "", "ItemGroupMobileNameAr": "", "BrandID": "", "StatusID": "",
        "TypeID": "", "ImageName": "", "GroupColor": "" , "deletedDate": "", "deletedBy": "", "modifiedBy": "",
        "lastModifyDate": "", "CreateDate": "", "insertedBy": ""
    };

    obj.ItemGroupID = $('#ItemGroupID').val() === '' ? 0 : $('#ItemGroupID').val();
    obj.ItemGroupNum = $('#ItemGroupNum').val();
    obj.ItemGroupName = $('#ItemGroupName').val();
    obj.ItemGroupNameAr = $('#ItemGroupNameAr').val();
    obj.ItemGroupMobileName = $('#ItemGroupMobileName').val();
    obj.ItemGroupMobileNameAr = $('#ItemGroupMobileNameAr').val();
    obj.GroupColor = $('#GroupColor').val();
    obj.BrandID = sessionStorage['BrandsID'];
    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }
   
    obj.TypeID = sessionStorage['TypeID'];
    var ImageNme = '';
    if (sessionStorage['TypeID'].toString() === '3') {
        if ($('.selected').length > 0) {
            var urlImg = $($('.selected').find('img')).attr('src');
            ImageNme = urlImg.substring(urlImg.lastIndexOf('/') + 1, urlImg.length)
        }
        obj.ImageName = ImageNme;
    }
    else {
        obj.ImageName = $('#ImageName').val();
    }
    obj.InsertedBy = sessionStorage['UserId'];
    obj.ModifiedBy = sessionStorage['UserId'];

    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_ItemGroups + "SaveItemGroups?Lang=" + Lang;
   
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
                   
                    if ($('#ItemGroupID').val() === '') {
                        $(':input', '#CMItemGroups')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                        resetKendoDropDownByForm('CMItemGroups');
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