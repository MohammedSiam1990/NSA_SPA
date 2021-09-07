

function CheckPageUniversity( ) {



    var _return = false;
    try {
 
    var token = sessionStorage['token'];
    var InsertedBy = sessionStorage['UserId'];
    var companyID = sessionStorage['CompanyID'];

    var Lang = sessionStorage['lang'];
    var URL = $URL_University + "GetUniversityById?InsertedBy=" + InsertedBy + "&&CompanyId=" + companyID + "&&Lang=" + Lang;
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { Lang: Lang },
        success: function (data, status, xhr) {



            if (data != null) {
                if (data.success === true) {

                    if (data.datalist.universityId != "") {
                        _return = true;
                    }
                    else {
                        _return = false;
                    }

                } else {
                    _return = false;
                }
            }
            else {
                _return = false;
            }


        }

    });

} catch (e) {

}
    return _return;


}


function CheckPageSoldier( ) {



    var _return = false;
    try {

    
    var token = sessionStorage['token'];
    var InsertedBy = sessionStorage['UserId'];
    var companyID = sessionStorage['CompanyID'];

    var Lang = sessionStorage['lang'];
    var URL = $URL_Soldier + "GetSoldierById?InsertedBy=" + InsertedBy + "&&CompanyId=" + companyID + "&&Lang=" + Lang;
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { Lang: Lang },
        success: function (data, status, xhr) {

            if (data != null) {
                if (data.success === true) {

                    if (data.datalist.soldierId != "") {
                        _return = true;
                    }
                    else {
                        _return = false;
                    }

                } else {
                    _return = false;
                }
            }
            else {
                _return = false;
            }


        }

    });

} catch (e) {

}
    return _return;


}


function CheckPageSchool( ) {



    var _return = false;

    try {

   
    var token = sessionStorage['token'];
    var InsertedBy = sessionStorage['UserId'];
    var companyID = sessionStorage['CompanyID'];

    var Lang = sessionStorage['lang'];
    var URL = $URL_School + "GetSchoolById?InsertedBy=" + InsertedBy + "&&CompanyId=" + companyID + "&&Lang=" + Lang;
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { Lang: Lang },
        success: function (data, status, xhr) {

            if (data != null) {
                if (data.success === true) {
                    if (data.datalist != null) {
                        if (data.datalist.schoolId != "") {
                            _return = true;
                        }
                        else {
                            _return = false;
                        }
                    } else {
                        _return = false;
                    }
                   

                } else {
                    _return = false;
                }
            }
            else {
                _return = false;
            }


        }

    });



    } catch (e) {

    }


    return _return;

}




var GetPermession = function (MenuID, name, id) {
    try {
        var returnValue = false, js = [], MenuPerm = [];
        if (sessionStorage['IsSuperAdmin'] !== 'true') {

            data = JSON.parse(sessionStorage['Permissions']);

            _.map(data, function (x) {
                if (x.MenuID.toString() === MenuID) {
                    MenuPerm.push(x);
                }
            });

            if (MenuPerm.length > 0) {
                js = JSON.parse(MenuPerm[0].JsonData.replace(/'/g, '"'))
                _.map(js, function (o) {
                    if (o.id !== undefined) {
                        if (o.id === id) {
                            returnValue = o.value;
                        }
                    }
                    else {
                        if (o.name === name) {
                            returnValue = o.value;
                        }
                    }
                });
            }

            return returnValue;
        }
        else {

            data = JSON.parse(sessionStorage['Permissions']);
            _.map(data, function (x) {
                if (x.MenuID.toString() === MenuID) {
                    MenuPerm.push(x);
                }
            });

            if (MenuPerm.length > 0) {
                js = JSON.parse(MenuPerm[0].JsonData.replace(/'/g, '"'))
                _.map(js, function (o) {
                    if (o.id !== undefined) {
                        if (o.id === id) {
                            returnValue = o.show === undefined ? true : o.show;
                        }
                    }
                    else {
                        if (o.name === name) {
                            returnValue = o.show === undefined ? true : o.show;
                        }
                    }
                });
            }
            return returnValue;
        }
    }
    catch (ee) {
        //alert(ee)
    }
}

var GetConfig = function (KeyID) {
    try {
        var returnValue = false;

        data = JSON.parse(sessionStorage['PageConfig']);
        _.map(data, function (x) {
            if (x.ConfigKeyID.toString() === KeyID.toString()) {
                if (x.DataType === 'checkbox') {
                    returnValue = x.Value1 === "true";
                }
                else {
                    returnValue = x.Value1;
                }
            }
        });
        return returnValue;
    }
    catch (ee) {
        //alert(ee)
    }
}

/*
Sort any array By Column Name 
 */
/*  sort array column condition */
var sortColumnName = "MenuOrder";
function SortByName(x, y) {
    return ((x[sortColumnName] === y[sortColumnName]) ? 0 : ((x[sortColumnName] > y[sortColumnName]) ? 1 : -1));
}


/*****
 * 
 * create my custom clear function extending involved Kendo UI controls
 * 
 * */

kendo.ui.ComboBox.fn.clear = kendo.ui.AutoComplete.fn.clear = function () {
    if (this.text) {
        this.text("");
    }
    if (this.value) {
        this.value(null);
    }
    this._prev = this.oldIndex = this._old = this._last = undefined;
};

var OnInputNumber = function ($this) {
    return $this.value = $this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}
/**
 * *****
 * 
 * 
 */

function resetForm($form) {
    var form = $($form);
    if (form) {

        ////orginal reset
        //  form.trigger("reset");

        //custom reset
        $($form + " input[data-role='dropdownlist']").each(function () {
            var item = $(this).data("kendoDropDownList");
            if (item && $(this).attr('id') !== 'AllAnyType') {//$(this).attr('id') !== 'xxx' 
                item.value("");
                item.text("");
            }
        });

        $($form + " input.k-textbox").each(function () {
            $(this).val("");
        });

        $($form + " input[data-role='numerictextbox']").not("#TopNumber").each(function () {
            var item = $(this).data("kendoNumericTextBox");
            if (item) {
                item.value("");
            }
        });

        $($form + " textarea").each(function () {
            $(this).val("");
        });

        $($form + " :checkbox").each(function () {
            this.checked = !this.checked;
        });


        $($form + " input[type=text]").each(function () {
            $(this).val("");
        });


    }
}


/**
 * 
 * Convert flat array has parent and child to
 * complex json array
 */

var FlatToComplexJson = function (arr) {
    try {
        var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;


        // First map the nodes of the array to an object -> create a hash table.
        for (var i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['children'] = [];
        }

        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid !== '0' && mappedElem.parentid !== 0) {
                    mappedArr[mappedElem['parentid']]['children'].push(mappedElem);

                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
            }
        }

    }
    catch (er) { alert(er); }
    return tree;
}


/**
 * build Virtecal-menu
 * 
 * @param {Control id menu} ul
 * @param {Data to build } menu
 */

var buildUL = function (ul, menu) {
    menu.sort(SortByName)

    for (var i = 0; i < menu.length; i++) {
        var li = '', IsView = false, subul = '';
        var strKeyName = ($Lang === 'ar') ? menu[i].KeyNameAr : menu[i].KeyName
        if (menu[i].Header === '1' || menu[i].Header === 1) {
            li = $("<li aria-disabled='true'>" + strKeyName + "</li>");
            $(li).addClass('app-sidebar__heading');
            $(ul).append(li);
        }
        else if ((menu[i].Main === 1 || menu[i].Main === 1) && menu[i].URL !== '') {
            if (menu[i].ShowToAdmin === 1) {
                IsView = GetPermession(menu[i].id.toString(), 'view')
                if (sessionStorage['IsSuperAdmin'] === 'true' && IsView) {

                    if (menu[i].ClassName.indexOf('svg') > -1 || menu[i].ClassName.indexOf('png') > -1) {
                        $(ul).append('<a id="' + menu[i].id + '" class="execute" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '" aria-disabled="true" ><i class="metismenu-icon" aria-disabled="true"><img  src="../../assets/images/icon-svg/' + menu[i].ClassName + '" aria-disabled="true" width="25" height="30"></img></i>' + strKeyName + '</a>');
                    }
                    else {
                        $(ul).append('<a id="' + menu[i].id + '" class="execute" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '" aria-disabled="true"><i class="' + menu[i].ClassName + '"></i>' + strKeyName + '</a>');
                    }
                }
            }
            else {
                IsView = GetPermession(menu[i].id.toString(), 'view')
                if (IsView) {//|| sessionStorage['IsSuperAdmin'] === 'true'
                    if (menu[i].ClassName.indexOf('svg') > -1 || menu[i].ClassName.indexOf('png') > -1) {
                        $(ul).append('<a id="' + menu[i].id + '" class="execute" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '" aria-disabled="true"><i class="metismenu-icon" aria-disabled="true"><img  src="../../assets/images/icon-svg/' + menu[i].ClassName + '" aria-disabled="true" width="25" height="30"></img></i>' + strKeyName + '</a>');
                    }
                    else {
                        $(ul).append('<a id="' + menu[i].id + '" class="execute" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '" aria-disabled="true"><i class="' + menu[i].ClassName + '"></i>' + strKeyName + '</a>');
                    }
                }
            }
        }
        else if ((menu[i].Main === 1 || menu[i].Main === '1') && menu[i].URL === '') {
            var ili = $('<li></li>');
            var liMain = '';

            if (menu[i].ClassName.indexOf('svg') > -1 || menu[i].ClassName.indexOf('png') > -1) {
                liMain = ('<a aria-expanded="true"><i class="metismenu-icon" aria-disabled="true"><img  src="../../assets/images/icon-svg/' + menu[i].ClassName + '" aria-disabled="true" width="25" height="30"></img></i>' + strKeyName + '<i class="metismenu-state-icon pe-7s-angle-down caret-left"></i></a>');
            }
            else {
                liMain = ('<a aria-expanded="true"><i class="' + menu[i].ClassName + '" aria-disabled="true"></i>' + strKeyName + '<i class="metismenu-state-icon pe-7s-angle-down caret-left"></i></a>');
            }

            subul = $('<ul id="ulMenuExpand"></ul>');
            $(ili).append(liMain)
            $(ili).append(subul)
            $(ul).append(ili)
            buildUL($(subul), menu[i].children);
        }
        else {
            if (menu[i].ShowToAdmin === 1) {
                IsView = GetPermession(menu[i].id.toString(), 'view')
                if (sessionStorage['IsSuperAdmin'] === 'true' && IsView) {
                    if (sessionStorage['lastPage'] === menu[i].URL) {
                        $(ul).append(' <li><a id="' + menu[i].id + '" class="execute mm-active d-d-flex" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '"><div class="image-bg mr-2"><img  src="../../assets/images/icon-svg/' + menu[i].ClassName + '" aria-disabled="true" width="20" height="30"></img></div><div> ' + strKeyName + '  </div>   <div class="itemicon"><i class= "fa fa-long-arrow-right arrow1 iconanmy " ></i></div></a></li>');
                    }
                    else {
                        $(ul).append(' <li><a id="' + menu[i].id + '" class="execute d-d-flex" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '"><div class="image-bg mr-2"><img  src="../../assets/images/icon-svg/' + menu[i].ClassName + '" aria-disabled="true" width="20" height="20" ></img></div> <div> ' + strKeyName + '  </div>  <div class="itemicon"><i class= "fa fa-long-arrow-right arrow1 iconanmy "  ></i></div></a></li>');
                    }
                }
            }
            else {
                IsView = GetPermession(menu[i].id.toString(), 'view')
                if (IsView) {//|| sessionStorage['IsSuperAdmin'] === 'true'
                    if (sessionStorage['lastPage'] === menu[i].URL) {
                        $(ul).append(' <li><a id="' + menu[i].id + '" class="execute mm-active d-d-flex" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '"><div class="image-bg mr-2"><img  src="../../assets/images/icon-svg/' + menu[i].ClassName + '" aria-disabled="true" width="20" height="30"></img></div><div> ' + strKeyName + '  </div>   <div class="itemicon"><i class= "fa fa-long-arrow-right arrow1 iconanmy " ></i></div></a></li>');
                    }
                    else {
                        $(ul).append(' <li><a id="' + menu[i].id + '" class="execute d-d-flex" actions="' + menu[i].URL + '"  ConfigKeyIDs="' + menu[i].ConfigKeyIDs + '"><div class="image-bg mr-2"><img  src="../../assets/images/icon-svg/' + menu[i].ClassName + '" aria-disabled="true" width="20" height="20" ></img></div> <div> ' + strKeyName + '  </div>  <div class="itemicon"><i class= "fa fa-long-arrow-right arrow1 iconanmy "  ></i></div></a></li>');
                    }
                }
            }
        }

        menu[i].children.sort(SortByName)
        if (menu[i].children !== null && menu[i].children.length > 0) {
            var strChild = JSON.stringify(menu[i].children)
            if (menu[i].Header === 1 || menu[i].Header === '1') {
                if (strChild.indexOf(sessionStorage['lastPage']) > -1) {
                    ili = $("<li class='mm-active'></li>");
                }
                else {
                    ili = $("<li></li>");
                }

                $(ul).append(ili);
                buildUL($(ili), menu[i].children);
            }
            else {
                subul = $('<ul id="ulMenuExpand"></ul>');
                buildUL($(subul), menu[i].children);
            }
        }
    }
    $('.mat-app-background').show();

}



/**
 * tag = '' to load all lookup
 * 
 * if you want get specific lookup
 * ex(tag='Country') to get list all country
 * tag(Country,City,Menu,MajorService,Currency ....)
 */

var GetLookup = function (Tag) {

    if (Tag === '' || sessionStorage[Tag] === null || sessionStorage[Tag] === undefined || sessionStorage[Tag] === '') {

        var lang = sessionStorage['lang'];
        var URL = $URL_Lookup + "GetLookup?Lang=" + $Lang.toLowerCase();

        $.get(URL, function (data) {
            if (data.success) {

                $.each(data.datalist, function (index, value) {
                    sessionStorage[index] = JSON.stringify(value);
                });
            }
        });
    }
    else {
        return JSON.parse(sessionStorage[Tag]);
    }
}

/**
 * tag = '' to load all lookup By brand
 *
 * if you want get specific lookup
 * ex(tag='Country') to get list all country
 * tag(Country,City,Menu,MajorService,Currency ....)
 */
var GetLookupBrand = function (Tag) {

    if (Tag === '' || sessionStorage[Tag] === null || sessionStorage[Tag] === undefined || sessionStorage[Tag] === '') {
        var BrandID = sessionStorage['BrandsID'];
        var URL = $URL_Operations + "GetAllDataJsonByBrandID?BrandID=" + BrandID + "&Lang=" + $Lang.toLowerCase();

        $.get(URL, function (data) {
            if (data.success) {

                $.each(data.datalist, function (index, value) {
                    sessionStorage[index] = JSON.stringify(value);
                });
            }
        });
    }
    else {
        return JSON.parse(sessionStorage[Tag]);
    }
}


/**
 * cont => Country control select id to fill
 * data => list data 
 * Select => if selected value
 * PlzSelect => true/false to add option please select at first list
 */
var fillDropdownCountry = function (cont, data, Selecte, PlzSelect) {
    var lang = sessionStorage['lang'];
    var $dropdown = $("#" + cont);
    $dropdown.empty();
    if (PlzSelect) {
        $dropdown.append($("<option Code='' string='PleaseSelect'/>").val('').text(DBSTRING['PleaseSelect']));
    }

    $.each(data, function () {

        if (Selecte === this.id)
            $dropdown.append($("<option Code='" + this.Code + "' /><span class='flag-icon" + 'flag-icon-jo' + "'></span> ").val(this.id).text(lang === 'ar' ? this.NameAr : this.Name));
        else
            $dropdown.append($("<option Code='" + this.Code + "' />").val(this.id).text(lang === 'ar' ? this.NameAr : this.Name));
    });
}

//function that checks if an object is null
var isNull = function (obj) {
    return obj === null ? '' : obj;
}


/**
 * cont => any control select id to fill
 * data => list data
 * Select => if selected value
 * PlzSelect => true/false to add option please select at first list
 */
var fillDropdown = function (cont, data, Selecte, PlzSelect) {

    if (cont === 'City') {
        data = JSON.parse(data);
        data = data.filter(function (el) {
            return el.CountryId.toString() === $('#Country').val();
        });
    }
    else if (cont === 'DistrictID') {
        //data = JSON.parse(data);
        data = data.filter(function (el) {
            return el.CityID.toString() === $('#City').val().toString();
        });
    }


    var lang = sessionStorage['lang'];
    var $dropdown = $("#" + cont);
    $dropdown.empty();
    if (PlzSelect) {
        //$dropdown.append($("<option Code='' string='PleaseSelect'/>").val('').text(DBSTRING['PleaseSelect']));
        var id = ''

        var objPlzSelect = { 'id': id, 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
        data.unshift(objPlzSelect);
    }

    var ds = new kendo.data.DataSource.create({
        data: data
    });


    $dropdown.kendoDropDownList({
        filter: "contains",
        suggest: true,
        dataTextField: lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        dataSource: ds,
        // dataDefaultItem:data[2],
        messages: {
            noData: DBSTRING["NoMatchingData"]
        },
        // template: kendo.template($("#template").html()),
        index: 3,
        value: Selecte
    });



}

/**
 * cont => any control select id to fill
 * data => list data
 * Select => if selected value
 * PlzSelect => true/false to add option please select at first list
 */
var fillMultiDropdown = function (cont, data, Selecte, PlzSelect) {

    if (cont === 'City') {
        data = JSON.parse(data);
        data = data.filter(function (el) {
            return el.CountryId.toString() === $('#Country').val();
        });
    }
    else if (cont === 'DistrictID') {
        //data = JSON.parse(data);
        data = data.filter(function (el) {
            return el.CityID.toString() === $('#City').val().toString();
        });
    }


    var lang = sessionStorage['lang'];
    var $dropdown = $("#" + cont);
    $dropdown.empty();
    if (PlzSelect) {
        //$dropdown.append($("<option Code='' string='PleaseSelect'/>").val('').text(DBSTRING['PleaseSelect']));
        var id = ''

        var objPlzSelect = { 'id': id, 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
        data.unshift(objPlzSelect);
    }

    var ds = new kendo.data.DataSource.create({
        data: data
    });


    $dropdown.kendoMultiSelect({
        filter: "contains",
        suggest: true,
        dataTextField: lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        dataSource: ds,
        // dataDefaultItem:data[2],
        messages: {
            noData: DBSTRING["NoMatchingData"]
        },
        // template: kendo.template($("#template").html()),
        index: 3,
        value: Selecte
    });



}

/*
* bind file uploader kendo
* change lable in kendo file uploader
*/



var BindFileUploaderkendoSchool = function () {
    var Lang = sessionStorage['lang'];

    var URL_saveImg = $URL_Operations + "UploadImage?Lang=" + Lang + "&FolderName=" + $folderImg
    var URL_deleteImg_Passport;
    var URL_deleteImg_QID;
    var URL_deleteImg_person;
    var URL_deleteImg_Certificates;
    var URL_deleteImg_workletter_MinistryDevelopment;
    var URL_deleteImg_married;
    var URL_deleteImg_Health;
    var URL_deleteImg_other;



    URL_deleteImg_Passport = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Passport').val()
    URL_deleteImg_QID = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_QID').val()
    URL_deleteImg_person = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_person').val()
    URL_deleteImg_Certificates = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Certificates').val()
    URL_deleteImg_workletter_MinistryDevelopment = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_workletter_MinistryDevelopment').val()
    URL_deleteImg_married = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_married').val()
    URL_deleteImg_Health = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Health').val()
    URL_deleteImg_other = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_other').val()



    kendo.ui.Upload.fn._supportsDrop = function () { return false; }
    upload_Passport = $("#photos_Passport").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Passport
        },
        error: onErrorUpload_Passport,
        upload: onUpload_Passport,
        success: onSuccess_Passport,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Passport,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_QID = $("#photos_QID").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_QID
        },
        error: onErrorUpload_QID,
        upload: onUpload_QID,
        success: onSuccess_QID,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_militarycard,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_person = $("#photos_person").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_person
        },
        error: onErrorUpload_person,
        upload: onUpload_person,
        success: onSuccess_person,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_person,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });



    upload_Certificates = $("#photos_Certificates").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Certificates
        },
        error: onErrorUpload_Certificates,
        upload: onUpload_Certificates,
        success: onSuccess_Certificates,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Certificates,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });




    upload_workletter_MinistryDevelopment = $("#photos_workletter_MinistryDevelopment").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_workletter_MinistryDevelopment
        },
        error: onErrorUpload_workletter_MinistryDevelopmentClearance,
        upload: onUpload_workletter_MinistryDevelopment,
        success: onSuccess_workletter_MinistryDevelopment,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_workletter_MinistryDevelopment,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_married = $("#photos_married").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_married
        },
        error: onErrorUpload_married,
        upload: onUpload_married,
        success: onSuccess_married,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_married,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });



    upload_Health = $("#photos_Health").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Health
        },
        error: onErrorUpload_Health,
        upload: onUpload_Health,
        success: onSuccess_Health,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Health,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_other = $("#photos_other").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_other
        },
        error: onErrorUpload_other,
        upload: onUpload_other,
        success: onSuccess_other,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_other,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });

}


var BindFileUploaderkendoSoldier = function () {
    var Lang = sessionStorage['lang'];

    var URL_saveImg = $URL_Operations + "UploadImage?Lang=" + Lang + "&FolderName=" + $folderImg
    var URL_deleteImg_Passport;
    var URL_deleteImg_militarycard;
    var URL_deleteImg_person;
    var URL_deleteImg_Certificates;
    var URL_deleteImg_Clearance;
    var URL_deleteImg_other;



    URL_deleteImg_Passport = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Passport').val()
    URL_deleteImg_militarycard = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_militarycard').val()
    URL_deleteImg_person = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_person').val()
    URL_deleteImg_Certificates = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Certificates').val()
    URL_deleteImg_Clearance = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Clearance').val()
    URL_deleteImg_other = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_other').val()



    kendo.ui.Upload.fn._supportsDrop = function () { return false; }
    upload_Passport = $("#photos_Passport").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Passport
        },
        error: onErrorUpload_Passport,
        upload: onUpload_Passport,
        success: onSuccess_Passport,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Passport,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_militarycard = $("#photos_militarycard").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_militarycard
        },
        error: onErrorUpload_militarycard,
        upload: onUpload_militarycard,
        success: onSuccess_militarycard,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_militarycard,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_person = $("#photos_person").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_person
        },
        error: onErrorUpload_person,
        upload: onUpload_person,
        success: onSuccess_person,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_person,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });



    upload_Certificates = $("#photos_Certificates").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Certificates
        },
        error: onErrorUpload_Certificates,
        upload: onUpload_Certificates,
        success: onSuccess_Certificates,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Certificates,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });




    upload_Clearance = $("#photos_Clearance").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Clearance
        },
        error: onErrorUpload_Clearance,
        upload: onUpload_Clearance,
        success: onSuccess_Clearance,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Clearance,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });





    upload_other = $("#photos_other").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_other
        },
        error: onErrorUpload_other,
        upload: onUpload_other,
        success: onSuccess_other,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_other,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });

}


var BindFileUploaderkendoUniversity = function () {
    var Lang = sessionStorage['lang'];

    var URL_saveImg = $URL_Operations + "UploadImage?Lang=" + Lang + "&FolderName=" + $folderImg
    var URL_deleteImg_Passport;
    var URL_deleteImg_QID;
    var URL_deleteImg_person;
    var URL_deleteImg_Certificates;
    var URL_deleteImg_workletter_MinistryDevelopment;
    var URL_deleteImg_married;
    var URL_deleteImg_Health;
    var URL_deleteImg_Transcript;
    var URL_deleteImg_other;



    URL_deleteImg_Passport = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Passport').val()
    URL_deleteImg_QID = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_QID').val()
    URL_deleteImg_person = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_person').val()
    URL_deleteImg_Certificates = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Certificates').val()
    URL_deleteImg_workletter_MinistryDevelopment = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_workletter_MinistryDevelopment').val()
    URL_deleteImg_married = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_married').val()
    URL_deleteImg_Health = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Health').val()
    URL_deleteImg_Transcript = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_Transcript').val()
    URL_deleteImg_other = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName_other').val()



    kendo.ui.Upload.fn._supportsDrop = function () { return false; }
    upload_Passport = $("#photos_Passport").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Passport
        },
        error: onErrorUpload_Passport,
        upload: onUpload_Passport,
        success: onSuccess_Passport,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Passport,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_QID = $("#photos_QID").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_QID
        },
        error: onErrorUpload_QID,
        upload: onUpload_QID,
        success: onSuccess_QID,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_militarycard,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_person = $("#photos_person").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_person
        },
        error: onErrorUpload_person,
        upload: onUpload_person,
        success: onSuccess_person,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_person,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });



    upload_Certificates = $("#photos_Certificates").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Certificates
        },
        error: onErrorUpload_Certificates,
        upload: onUpload_Certificates,
        success: onSuccess_Certificates,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Certificates,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });




    upload_workletter_MinistryDevelopment = $("#photos_workletter_MinistryDevelopment").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_workletter_MinistryDevelopment
        },
        error: onErrorUpload_workletter_MinistryDevelopmentClearance,
        upload: onUpload_workletter_MinistryDevelopment,
        success: onSuccess_workletter_MinistryDevelopment,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_workletter_MinistryDevelopment,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_married = $("#photos_married").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_married
        },
        error: onErrorUpload_married,
        upload: onUpload_married,
        success: onSuccess_married,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_married,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });



    upload_Health = $("#photos_Health").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Health
        },
        error: onErrorUpload_Health,
        upload: onUpload_Health,
        success: onSuccess_Health,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Health,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });





    upload_Transcript = $("#photos_Transcript").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_Transcript
        },
        error: onErrorUpload_Transcript,
        upload: onUpload_Transcript,
        success: onSuccess_Transcript,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_Transcript,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });


    upload_other = $("#photos_other").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg_other
        },
        error: onErrorUpload_other,
        upload: onUpload_other,
        success: onSuccess_other,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove_other,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });

}

var onErrorUpload_Passport = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}




var onErrorUpload_militarycard = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}


var onErrorUpload_QID = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}



var onErrorUpload_workletter_MinistryDevelopmentClearance = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}


var onErrorUpload_person = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}


var onErrorUpload_Certificates = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}



var onErrorUpload_workletter_MinistryDevelopment = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}


var onErrorUpload_Clearance = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}



var onErrorUpload_married = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}


var onErrorUpload_Health = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}



var onErrorUpload_Transcript = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}

var onErrorUpload_other = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}





var onUpload_Passport = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}


var onUpload_militarycard = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}


var onUpload_married = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}



var onUpload_Health = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}




var onUpload_Transcript = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}


var onUpload_QID = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}

var onUpload_person = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}


var onUpload_Certificates = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}


var onUpload_Clearance = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}




var onUpload_workletter_MinistryDevelopment = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}

var onUpload_other = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}




var onSuccess_Passport = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_Passport').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_Passport').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_Passport = function (e) {
    $("#preview_Passport").attr("src", "assets/images/bg1.png");
    $('#ImageName_Passport').val(null);
}

var DeleteImg_Passport = function () {
    $("#preview_Passport").attr("src", "assets/images/bg1.png");
    $('#ImageName_Passport').val(null);
}




var onSuccess_militarycard = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_militarycard').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_militarycard').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_militarycard = function (e) {
    $("#preview_militarycard").attr("src", "assets/images/bg1.png");
    $('#ImageName_militarycard').val(null);
}

var DeleteImg_militarycard = function () {
    $("#preview_militarycard").attr("src", "assets/images/bg1.png");
    $('#ImageName_militarycard').val(null);
}







var onSuccess_QID = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_QID').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_QID').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_QID = function (e) {
    $("#preview_QID").attr("src", "assets/images/bg1.png");
    $('#ImageName_QID').val(null);
}

var DeleteImg_QID = function () {
    $("#preview_QID").attr("src", "assets/images/bg1.png");
    $('#ImageName_QID').val(null);
}



var onSuccess_person = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_person').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_person').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_person = function (e) {
    $("#preview_person").attr("src", "assets/images/bg1.png");
    $('#ImageName_person').val(null);
}

var DeleteImg_person = function () {
    $("#preview_person").attr("src", "assets/images/bg1.png");
    $('#ImageName_person').val(null);
}





var onSuccess_Certificates = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_Certificates').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_Certificates').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_Certificates = function (e) {
    $("#preview_Certificates").attr("src", "assets/images/bg1.png");
    $('#ImageName_Certificates').val(null);
}

var DeleteImg_Certificates = function () {
    $("#preview_Certificates").attr("src", "assets/images/bg1.png");
    $('#ImageName_Certificates_Certificates').val(null);
}




var onSuccess_Health = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_Health').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_Health').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_Health = function (e) {
    $("#preview_Health").attr("src", "assets/images/bg1.png");
    $('#ImageName_Health').val(null);
}

var DeleteImg_Health = function () {
    $("#preview_Health").attr("src", "assets/images/bg1.png");
    $('#ImageName_Health').val(null);
}








var onSuccess_Transcript = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_Transcript').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_Transcript').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_Transcript = function (e) {
    $("#preview_Transcript").attr("src", "assets/images/bg1.png");
    $('#ImageName_Transcript').val(null);
}

var DeleteImg_Transcript = function () {
    $("#preview_Transcript").attr("src", "assets/images/bg1.png");
    $('#ImageName_Transcript').val(null);
}






var onSuccess_married = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_married').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_married').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_married = function (e) {
    $("#preview_married").attr("src", "assets/images/bg1.png");
    $('#ImageName_married').val(null);
}

var DeleteImg_married = function () {
    $("#preview_married").attr("src", "assets/images/bg1.png");
    $('#ImageName_married').val(null);
}





var onSuccess_Clearance = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_Clearance').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_Clearance').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_Clearance = function (e) {
    $("#preview_Clearance").attr("src", "assets/images/bg1.png");
    $('#ImageName_Clearance').val(null);
}

var DeleteImg_Clearance = function () {
    $("#preview_Clearance").attr("src", "assets/images/bg1.png");
    $('#ImageName_Clearance').val(null);
}






var onSuccess_workletter_MinistryDevelopment = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_workletter_MinistryDevelopment').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_workletter_MinistryDevelopment').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_workletter_MinistryDevelopment = function (e) {
    $("#preview_workletter_MinistryDevelopment").attr("src", "assets/images/bg1.png");
    $('#ImageName_workletter_MinistryDevelopment').val(null);
}

var DeleteImg_workletter_MinistryDevelopment = function () {
    $("#preview_workletter_MinistryDevelopment").attr("src", "assets/images/bg1.png");
    $('#ImageName_workletter_MinistryDevelopment').val(null);
}


var onSuccess_other = function (e) {

    var name = e.response.imagesName;
    $('#ImageName_other').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview_other').attr('src', this.result);

                };
                reader.readAsDataURL(file);
            }
        }
    }

}

var onRemove_other = function (e) {
    $("#preview_other").attr("src", "assets/images/bg1.png");
    $('#ImageName_other').val(null);
}

var DeleteImg_other = function () {
    $("#preview_other").attr("src", "assets/images/bg1.png");
    $('#ImageName_other').val(null);
}






var BindFileUploaderkendo = function () {
    var Lang = sessionStorage['lang'];

    var URL_saveImg = $URL_Operations + "UploadImage?Lang=" + Lang + "&FolderName=" + $folderImg
    var URL_deleteImg = $URL_Operations + "DeleteImage?Lang=" + Lang + "&FolderName=" + $folderImg + "&ImageName=" + $('#ImageName').val()

    kendo.ui.Upload.fn._supportsDrop = function () { return false; }
    upload = $("#photos").kendoUpload({
        multiple: false,
        async: {
            withCredentials: false,
            saveUrl: URL_saveImg,
            removeUrl: URL_deleteImg
        },
        error: onErrorUpload,
        upload: onUpload,
        success: onSuccess,
        errorTemplate: "<span>#=123456#</span>",
        remove: onRemove,
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"],
            maxFileSize: 250000
        },
        localization: {
            select: DBSTRING['ChoosePicture'],
            remove: DBSTRING['Remove'],
            cancel: DBSTRING['Cancel'],
            dropFilesHere: DBSTRING['dropFilesHere'],
            invalidFiles: DBSTRING['InvalidFiles'],
            statusUploading: DBSTRING['statusUploading'],
            statusUploaded: DBSTRING['statusUploaded'],
            statusWarning: DBSTRING['statusWarning'],
            statusFailed: DBSTRING['statusFailed'],
            headerStatusUploading: DBSTRING['headerStatusUploading'],
            headerStatusPaused: DBSTRING['headerStatusPaused'],
            headerStatusUploaded: DBSTRING['headerStatusUploaded'],
            uploadSuccess: DBSTRING['uploadSuccess'],
            uploadFail: DBSTRING['uploadFail'],
            invalidMaxFileSize: DBSTRING['invalidMaxFileSize'],
            invalidFileExtension: DBSTRING['invalidFileExtension']
        }
    });

}
var onErrorUpload = function (e) {
    var resut = e.XMLHttpRequest.response
    resut = JSON.parse(resut);
    var err = resut.message;
    alert(err);
}


/**
 * upload to save img in server
 */
var onUpload = function (e) {
    var xhr = e.XMLHttpRequest;
    var token = sessionStorage['token'];
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState === 1 /* OPENED */) {

                xhr.setRequestHeader("Authorization", 'bearer ' + token);
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}

/**
 * success upload img and display in preview
 *
 */
var onSuccess = function (e) {

    var name = e.response.imagesName;
    $('#ImageName').val(name)

    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#preview').attr('src', this.result);
                    try {
                        if (sessionStorage['ChildlastPage'] === 'CMExpenses') {
                            var grid = $("#EDGrid").data("kendoGrid");
                            var DataItem = grid.dataItem(grid.select());

                            DataItem.ImageName = name;
                            DataItem.ImageURL = this.result;

                        }
                    }
                    catch (ee) {
                        var $x = 1;
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    }

}
/**
 * delete img if img save
 * @param {any} e
 */
var onRemove = function (e) {
    $("#preview").attr("src", "assets/images/bg1.png");
    $('#ImageName').val(null);
}

var DeleteImg = function () {
    $("#preview").attr("src", "assets/images/bg1.png");
    $('#ImageName').val(null);
}


var FillBrandsDropDown = function (calbak) {
    var lang = sessionStorage['lang'];
    var $dropdown = $("#MenuBarBranches");

    $dropdown.empty();

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

            var list = data.datalist;
            var BrandID = sessionStorage['BrandsID'];

            $.each(data.datalist, function (index, value) {
                if (this.StatusID !== $Deleted && this.StatusID !== $Pending) {
                    if (BrandID !== '' && BrandID !== null && BrandID !== "null" && BrandID !== undefined && BrandID !== 'undefined') {

                        if (parseInt(BrandID) === value.BrandID) {
                            sessionStorage['BrandsID'] = BrandID
                            sessionStorage['MajorServiceID'] = this.MajorServiceID
                            $dropdown.append($("<option type='button' tabindex='0' MajorServiceID='" + this.MajorServiceID + "' class='dropdown-item' selected='selected'/>").val(this.BrandID).text(lang === 'ar' ? this.BrandNameAr : this.BrandName));
                        }
                        else {
                            $dropdown.append($("<option type='button' tabindex='0' MajorServiceID='" + this.MajorServiceID + "' class='dropdown-item' />").val(this.BrandID).text(lang === 'ar' ? this.BrandNameAr : this.BrandName));
                        }
                    }
                    else {

                        if (this.IsDefault === 'true' || this.IsDefault === 'True' || this.IsDefault === true) {
                            sessionStorage['BrandsID'] = this.BrandID;
                            sessionStorage['MajorServiceID'] = this.MajorServiceID
                            $dropdown.append($("<option type='button' tabindex='0' MajorServiceID='" + this.MajorServiceID + "' class='dropdown-item' selected='selected'/>").val(this.BrandID).text(lang === 'ar' ? this.BrandNameAr : this.BrandName));
                        }
                        else {
                            $dropdown.append($("<option type='button' tabindex='0' MajorServiceID='" + this.MajorServiceID + "' class='dropdown-item' />").val(this.BrandID).text(lang === 'ar' ? this.BrandNameAr : this.BrandName));
                        }
                    }
                }
                else if (this.StatusID === $Pending) {
                    sessionStorage['BrandPending'] = "style='display:none'";
                }
            });
            var id = ''

            //var objPlzSelect = { 'BrandID': id, 'BrandName': DBSTRING['PleaseSelect'], 'BrandNameAr': DBSTRING['PleaseSelect'] };
            //list.unshift(objPlzSelect);

            var ds = new kendo.data.DataSource.create({
                data: list
            });
            $dropdown.kendoDropDownList({
                dataTextField: lang === 'ar' ? "BrandNameAr" : "BrandName",
                dataValueField: "BrandID",
                dataSource: ds,
                height: '100px'
            });

            sessionStorage['BrandsID'] = $dropdown.val();
            sessionStorage['MajorServiceID'] = $('#MenuBarBranches  option:selected').attr('MajorServiceID');
            GetLookupBrand('')
            calbak(true)
        }
    });
}

function LogOut() {
    var token = sessionStorage['token'];
    var URL = $URL_Auth + "LogOut"
    $.ajax({
        type: 'POST',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        success: function () {
            sessionStorage['token'] = '';
            sessionStorage['lastPage'] = '';
            autoRedirect();
        },
        error: function (ss) {
            alert(ss);
        }
    });
}

var showConfirmDelete = function (TableName, TableKey, RowID) {
    jConfirm(DBSTRING['AreYouSureDelete'], DBSTRING['Delete'], function (r) {
        if (r) {
            try {
                var token = sessionStorage['token'];
                var URL_Delete = $URL_Operations + "ChangeStatus?TableNme=" + TableName + '&TableKey=' + TableKey + '&RowID=' + RowID + '&Lang=' + $Lang + '&DeletedBy=' + sessionStorage['UserId']
                $.ajax({
                    type: 'POST',
                    url: URL_Delete,
                    //headers: {
                    //    Authorization: 'bearer ' + token
                    //},
                    success: function (data) {
                        //options.success(data.datalist);
                        $("#grid").data("kendoGrid").dataSource.read();
                        if (TableName === 'Brands') {
                            FillBrandsDropDown();
                        }

                        $('#ResultMessageIndex').addClass('alert-danger show');
                        $('#ResultMessageIndex').removeClass('hide');
                        $('#ResultTxtIndex').html(data.message);
                        setTimeout("$('#ResultMessageIndex').removeClass('show')", 5000);

                    },
                    error: function (ss) {
                        alert(ss);
                    }
                });
            }
            catch (sdd) { alert(sdd) }
        }
        else {

            return false;
        }
    });
}







var showConfirmChange = function (callback) {

    jconfirmSave(DBSTRING['MadeChangeFormNotSave'], DBSTRING['Save'], function (r) {
        if (r === 1) { //Ok

            SaveUpdate(true);
            $('#btnFormTitle').addClass('invisible')
            callback(true);

        }
        else if (r === 0) { //No
            $dataForm = ''
            $('#ChildContent').hide();
            $('#MainContent').show();
            $('#btnFormTitle').addClass('invisible')
            callback(false);
        }
        else { //r===2   cancel
            callback(false);
        }
    });
}

var Destroy = function () {

    var nowdata = $('#' + sessionStorage['ChildlastPage']).serialize();
    if ($dataForm === nowdata || sessionStorage['ChildlastPage'] === 'CMReports') {
        $('#ChildContent').hide();
        $('#MainContent').show();
        $('#btnFormTitle').addClass('invisible')
    }
    else {
        showConfirmChange();
    }

}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
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


var detailsGridRows = function (e) {

    var firstCell = e.sender.tbody.find("tr[role='row']:last" + " td:eq(0)");
    e.sender.editCell(firstCell);
    // e.sender.select(row);

}


var removeFilter = function (filter, searchFor) {
    if (filter === null)
        return [];

    for (var x = 0; x < filter.length; x++) {

        if (filter[x].filters !== null && filter[x].filters.length >= 0) {
            if (filter[x].filters.length === 0) {
                filter.splice(x, 1);
                return removeFilter(filter, searchFor);
            }
            filter[x].filters = removeFilter(filter[x].filters, searchFor);
        }
        else {
            if (filter[x].field === searchFor) {
                filter.splice(x, 1);
                return removeFilter(filter, searchFor);
            }
        }
    }

    return filter;
}

var resetKendoDropDownByForm = function (FormID, Exclud) {
    $('.confChange').removeClass('confChange')
    var dropDownDOMelements = $(".k-dropdown", '#' + FormID);
    dropDownDOMelements.each(function (ddl) {

        var id = $(this).parent().find('select')[0].id;
        var dropdownlist = $("#" + id).data("kendoDropDownList");
        if (id !== Exclud) {
            if (id === 'CountryCode') {
                dropdownlist.value('0');
            }
            else {
                dropdownlist.value('');
            }
        }
    });
    var Multielements = $(".k-multiselect", '#' + FormID);
    Multielements.each(function (ddl) {

        var id = $(this).parent().find('select')[0].id;
        var dropdownlist = $("#" + id).data("kendoMultiSelect");
        //if (id !== Exclud) {
        dropdownlist.value([]);
        //}
    });
    $('#ImageName').val(ImageName);
    $("#preview").attr("src", '../../assets/images/bg1.png');

    var colors = $(".k-colorpicker", '#' + FormID);
    colors.each(function () {
        var id = $(this).parent().find('input')[0].id;
        var color = $("#" + id).data("kendoColorPicker");
        color.value('#0d0d0d');
    });

    var upload = $("#photos").data("kendoUpload");
    upload.clearAllFiles();

}

var DisabledEnableKendoDropDownByForm = function (FormID, enable) {
    $('.confChange').removeClass('confChange')
    var dropDownDOMelements = $(".k-dropdown", '#' + FormID);
    dropDownDOMelements.each(function (ddl) {

        var id = $(this).parent().find('select')[0].id;
        var dropdownlist = $("#" + id).data("kendoDropDownList");
        dropdownlist.enable(enable);
    });
    var Multielements = $(".k-multiselect", '#' + FormID);
    Multielements.each(function (ddl) {

        var id = $(this).parent().find('select')[0].id;
        var dropdownlist = $("#" + id).data("kendoMultiSelect");
        dropdownlist.enable(enable);

    });

    var colors = $(".k-color", '#' + FormID);
    colors.each(function () {
        var id = $(this).parent().find('input')[0].id;
        var dropdownlist = $("#" + id).data("kendoColorPicker");
        dropdownlist.enable(enable);
    });

}

var BuildFilterItems = function (o) {
    var filterValue = parseInt(sessionStorage['TypeID']);
    var filter = {};
    if (filterValue === 1) {

        filter =
        {
            logic: "and",
            filters: [
                {
                    logic: "or",
                    filters: [
                        {
                            field: "ItemTypeID",
                            operator: "eq",
                            value: 3
                        },
                        {
                            field: "ItemTypeID",
                            operator: "eq",
                            value: 4
                        }
                    ]
                },
                {
                    filters: [], logic: "or"
                },
                {
                    field: "StatusID",
                    operator: "eq",
                    value: $('#sel-checkbox').is(':checked') ? 8 : 7
                }
            ]
        }
    }
    else if (filterValue === 2) {
        filter =
        {
            logic: "and",
            filters: [
                {
                    field: "ItemTypeID",
                    operator: "eq",
                    value: 2
                },
                {
                    filters: [], logic: "or"
                },
                {
                    field: "StatusID",
                    operator: "eq",
                    value: $('#sel-checkbox').is(':checked') ? 8 : 7
                }
            ]
        }
    }
    else {
        filter =
        {
            logic: "and",
            filters: [
                {
                    field: "StatusID",
                    operator: "eq",
                    value: $('#sel-checkbox').is(':checked') ? 8 : 7

                },
                {
                    filters: [], logic: "or"
                }

            ]
        }
    }

    $.map(o, function (x) {
        filter.filters[1].filters.push(x);
    });

    return filter;
}

var BuildFilterItemGroups = function (o) {
    var filter =
    {
        logic: "and",
        filters: [
            {
                field: "TypeID",
                operator: "eq",
                value: sessionStorage['TypeID']

            },
            {
                filters: [], logic: "or"
            }

        ]
    }

    $.map(o.filters, function (x) {
        filter.filters[1].filters.push(x);
    });

    return filter;
}

var BuildFilterCustomers = function (o) {
    var filter =
    {
        logic: "and",
        filters: [
            {
                field: "CustTypeID",
                operator: "eq",
                value: sessionStorage['CustTypeID']

            },
            {
                filters: [], logic: "or"
            }

        ]
    }

    $.map(o, function (x) {
        filter.filters[1].filters.push(x);
    });

    return filter;
}

var BuildFilterPriceTemplate = function (o) {
    var filter =
    {
        logic: "and",
        filters: [
            {
                field: "TypeID",
                operator: "eq",
                value: sessionStorage['TypeID']

            },
            {
                filters: [], logic: "or"
            }

        ]
    }

    $.map(o, function (x) {
        filter.filters[1].filters.push(x);
    });

    return filter;
}


var originalFilter = kendo.data.DataSource.fn.filter;

kendo.data.DataSource.fn.filter = function (e) {

    if (arguments.length > 0) {
        var o = arguments[0];
        if (sessionStorage['lastPage'] === 'ItemGroups') {
            if ((arguments[0].filters === undefined && o.field === "TypeID" && o.value !== arguments[0].value) ||
                (arguments[0].filters === undefined && o.field === undefined)) {

                arguments[0].field = "TypeID";
                arguments[0].operator = "eq";
                arguments[0].value = sessionStorage['TypeID'];

            }
            else if (arguments[0].filters !== undefined) {
                o = BuildFilterItemGroups(o);
                arguments[0].filters = [];
                arguments[0].filters.push(o)

            }
        }
        else if (sessionStorage['lastPage'] === 'Items') {
            if (arguments[0].filters !== undefined) {
                if (arguments[0].filters.length > 5) {
                    o = BuildFilterItems(o.filters);
                }

                else {
                    o = SetFilterItemBtn();
                }
            }
            else {
                o = SetFilterItemBtn();
            }
            arguments[0].filters = [];
            arguments[0].filters.push(o)
        }
        else if (sessionStorage['lastPage'] === 'PriceTemplate') {
            if (arguments[0].filters !== undefined) {

                if (arguments[0].filters.length > 2) {
                    o = BuildFilterPriceTemplate(o.filters);
                }

                else {
                    o = {
                        field: "TypeID",
                        operator: "eq",
                        value: sessionStorage['TypeID']
                    };
                }
            }
            else {
                o = {
                    field: "TypeID",
                    operator: "eq",
                    value: sessionStorage['TypeID']
                };
            }
            arguments[0].filters = [];
            arguments[0].filters.push(o)
        }
        else if (sessionStorage['lastPage'] === 'Customer') {
            if (arguments[0].filters !== undefined) {

                if (arguments[0].filters.length > 4) {
                    o = BuildFilterCustomers(o.filters);
                }

                else {
                    o = SetFilterCustBtn();
                }
            }
            else {
                o = SetFilterCustBtn();
            }
            arguments[0].filters = [];
            arguments[0].filters.push(o)
        }
    }

    return originalFilter.apply(this, arguments);
};

var MakeSortableMultiSelectKendo = function ($Control, it) {

    var listA = $("#grid .k-multiselect").find('ul').kendoSortable({

        placeholder: placeholder,
        hint: function (element) {
            var hint = $("<div class='sortable-hint'></div>");
            $(".state-selected").clone().css("display", "block").appendTo(hint);

            setTimeout(function () {
                hint.children().show();
            });

            return hint;
        },
        start: function (e) {
            $(".state-selected").hide();
        },
        end: function (e) {
            var items = this.element.find(".state-selected").not(e.item);
            items.insertAfter(this.placeholder).show();

        },
        change: function (e) {
            $(".state-selected").removeClass("state-selected");
            textSelected = e.item[0].innerText.trim();
            var multiSelect = $($Control).data("kendoMultiSelect")
            var indexItem, ItemID;
            var array = multiSelect.dataItems();
            if ($Lang === 'ar') {
                $.map(array, function (x) {
                    if (x.ItemNameAr === textSelected) {
                        ItemID = x.ItemID;
                    }
                })
            }
            else {
                $.map(array, function (x) {
                    if (x.ItemName === textSelected) {
                        ItemID = x.ItemID;
                    }
                })
            }

            var Values = multiSelect.value();
            Values.move(e.oldIndex, e.newIndex);

            multiSelect.value(Values)
            var dataItem = multiSelect.dataItems();

            it.model.ItemsIds = Values;
            var ItemsNameAr = [], ItemsName = [];
            $.map(Values, function (ID) {
                $.map(dataItem, function (di) {
                    if (ID === di.ItemID) {
                        ItemsName.push(di.ItemName)
                        ItemsNameAr.push(di.ItemNameAr)
                    }
                });
            });

            it.model.ItemsName = ItemsName;
            it.model.ItemsNameAr = ItemsNameAr;

        }
    }).data("kendoSortable");

    // As of Q3 2015, _draggable is changed to draggable (without underscore).
    listA.draggable.userEvents.bind("tap", function (e) {
        if (e.event.ctrlKey) {
            e.target.toggleClass("state-selected")
        } else {
            $(".state-selected").removeClass("state-selected");
            e.target.addClass("state-selected");
        }
    });
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
};

//function _isContains(json, keyname, value) {
//    var result = false;
//    json.some(function (key) {
//      return  result = JSON.stringify(json[key].indexOf(value) > -1
//    })
//    return result
//}


kendo.ui.Grid.fn.refresh = (function (refresh) {
    return function (e) {
        this._refreshing = true;

        refresh.call(this, e);

        this._refreshing = false;
    }
})(kendo.ui.Grid.fn.refresh);

kendo.ui.Grid.fn.current = (function (current) {
    return function (element) {
        // assuming element is td element, i.e. cell selection
        if (!this._refreshing && element) {
            this._lastFocusedCellIndex = $(element).index(); // note this might break with grouping cells etc, see grid.cellIndex() method
            this._lastFocusedUid = $(element).closest("tr").data("uid");
        }

        return current.call(this, element);
    }
})(kendo.ui.Grid.fn.current);

kendo.ui.Grid.fn.refocusLastEditedCell = function () {
    if (this._lastFocusedUid) {
        var row = $(this.tbody).find("tr[data-uid='" + this._lastFocusedUid + "']");
        var cell = $(row).children().eq(this._lastFocusedCellIndex);
        this.editCell(cell);
    }
};