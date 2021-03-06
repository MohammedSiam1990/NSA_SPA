/**check if user login by token */
function isLoggedIn() {
    var sesToken = sessionStorage['token'];
    if (sesToken === null || sesToken === undefined || sesToken === '') { return false; }
    else { return true; }
}
/**redirect to login page if not login */
function autoRedirect() {
    var validLogin = isLoggedIn()
    if (!validLogin && location.pathname.indexOf('login') === -1) { 
        redirect('/Pages/Account/Account.html');
    }
    if (validLogin && location.pathname.indexOf('login') > -1) {
        redirect('/~/index.html');
    }
}
function redirect(url) {
    
    location.href = url;
}
$(document).ready(function () {
    //if (sessionStorage['IsSuperAdmin'] === 'true') {
        initApp();
    //}
    //else {
    //    LoadPermissions();
    //}
});

var LoadPermissions = function () {
    var token = sessionStorage['token'];
    var URL = $URL_Permissions + "GetPermissions";
    var BrandID = sessionStorage['BrandsID'];
    var MenuType = 1;
    var RolID = sessionStorage['RoleID'];
    if (sessionStorage['IsSuperAdmin'] === 'true') {
         RolID = 0;
    }
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { MenuType: MenuType, RoldID: RolID, BrandID: BrandID, Lang: $Lang },
        success: function (data, status, xhr) {
            sessionStorage['Permissions'] = JSON.stringify( data.datalist.Permissions);//.replace(/'/g, '"')
            //alert(JSON.stringify(data.datalist.Permissions))
            //initApp();
        }
    });
}

var GetPageConfig = function (callback) {

    var URL = $URL_Operations + "GetPageConfig";
    var BrandID = sessionStorage['BrandsID'];

    var ConfigKeyIds = sessionStorage['ConfigKeyIDs'];
    
    if (ConfigKeyIds !== undefined && ConfigKeyIds !== null && ConfigKeyIds !== '') {
        $.ajax({
            type: 'Get',
            url: URL,
            async: false,
            data: { BrandID: BrandID, ConfigKeyIds: ConfigKeyIds },
            success: function (data, status, xhr) {
                sessionStorage['PageConfig'] = JSON.stringify(data.datalist.Config);//.replace(/'/g, '"')
                callback(true);
            }
        });
    }
}

var initApp = function () {

    $('BODY').hide();
    $('.wrapperBody').removeClass('preload');

    var boot = 'assets/css/bootstrap.min.rtl.css';
    var styleCss = 'assets/css/Ar-StyleSheet.css';
    var MainStyle = 'assets/css/main-Ar.css';
    var cssTabClass = "col-md-2 pl-0";
    var Stylevaledation = 'assets/css/valadtion-ar.css';
  
    var lang = sessionStorage['lang'];
    $Lang = lang;
    if (lang === null || lang === '' || lang === undefined) {
        lang = 'ar';
    }
    $Lang = sessionStorage['lang'];
  
    $('#UserName').html(sessionStorage['UserName'])
    $('#UserName').html(sessionStorage['UserName'])
    var urlLang = 'Scripts/stringlang/AR.json';
    if ($Lang === 'ar') {
        $KendoLang = 'Scripts/StringLang/Kendo.ar-JO.js';
        $('BODY').addClass('k-rtl');
    }
    else {
        boot = 'assets/css/bootstrap.min.css';
        styleCss = 'assets/css/e-StyleSheet.css';
        Stylevaledation = 'assets/css/valadtion.css';
        MainStyle = 'assets/css/main.css';
        $KendoLang = 'Scripts/StringLang/kendo.en-US.js';
        $('BODY').removeClass('k-rtl');
        //<script id="KendoID" src="assets/js/kendo.all.min.js"></script>
    }
  
    //$('head').append('<script id="KendoID" src="assets/js/kendo.all.min.js"></script>')
    $("#bootstrap").attr('href', boot);
    $("#StyleSheet").attr('href', styleCss);
    
    $("#Stylevaledation").attr('href', Stylevaledation);
   
    $('#ReportsJS').attr('src', $HostURL + 'api/reports/resources/js/telerikReportViewer');
    $("#MainStyle").attr('href', MainStyle);
    $("HEAD").append('<script id="KendoLang" src="' + $KendoLang+'"></script>');
    FillBrandsDropDown(function (r) {
        if (r) {
           
                LoadPermissions();
           
            FillMainMenu();

            $('.app-sidebar__heading').each(function (x) {
                var len = $(this).next('li').find('a').length
                if (len === 0) {
                    $(this).hide()
                }
            });
            $('[id=ulMenuExpand]').each(function (x) {
                var len = $(this).find('li').length
                if (len === 0) {
                    $(this).parent().hide()
                }
            });
        }
    });
    
    //$(".mm-show").removeClass("mm-show");
    BindExecuteMenu();
    FillDBSTRING();
    
}

var BindExecuteMenu = function () {
    $('.execute').on("click", function () {
        $('#btnFormTitle').addClass('invisible')
        var $this = this;
        $ConfigKeyIDs = $($this).attr('ConfigKeyIDs');
        
        sessionStorage['ConfigKeyIDs'] = $ConfigKeyIDs;
        if ($dataForm === '') {
            $('a').removeClass('mm-active');
            LoadContent($($this).attr('actions'));
        }
        else {

            var nowdata = $('#' + sessionStorage['ChildlastPage']).serialize();
            if ($dataForm === nowdata || nowdata === '') {
                $('a').removeClass('mm-active');
                LoadContent($($this).attr('actions'));
            }
            else {
                showConfirmChange(function (r) {
                    if (r === true) {
                        $('a').removeClass('mm-active');
                        LoadContent($($this).attr('actions'));
                    }
                    else {
                        return false;
                    }
                });
            }
        }
    });

    $('.wrapperBody').addClass('loaded');
    setTimeout("$('BODY').show();LoadPageFirst();", 200);
    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');
        $('.side-nav').toggleClass('side-nav--show');
        $('.main').toggleClass('main--show');

    });
}
var LoadPageFirst = function () {
    try {
        var element = $("#grid");
        element.remove();
        $('#innerContainer_index').append(' <div id="grid"></div>')
        if (element.data("kendoGrid")) {
            element.data("kendoGrid").destroy();
            element.empty();
          
        }
    }
    catch (ex) {alert(ex) }
    var count = $('#MenuBarBranches  option').length;
  
    if (count === 0) {
        $("BODY").append(
            ' <div id="ChildpopModal" class="modal fad" >' +
            '<div class="modal-dialog modal-xl modal-lg modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-header  d-flex-button">' +
            ' <h4 class="modal-title" id="popup_title"></h4> </div>' +
            '<div class="modal-body" id="ChildModalContent"></div>' +
            '<div class="modal-footer" id="popup_message"></div>' +
            '</div ></div ></div >'
        );
       
        $('#ChildModalContent').load('/Pages/Brands/CMBrands.html',
            function (data, status, jqXGR) {
                $('.wrapper').addClass('loaded');
                $('#popup_title').html(DBSTRING['Brands'])
              
                if (status === "success") {
                    sessionStorage['IsModalContent'] = true;
                    $('#Close').hide();
                    $('#Cancelbtn').show();
                    $('#IsDefault').attr('checked', true);
                    $('#IsDefault').attr('disabled', true);
                    $('#InActiveDIV').hide();
                    $('#btnForm').removeClass('invisible');
                }

            });
    }
    else {
        if (sessionStorage['lastPage'] !== '' && sessionStorage['lastPage'] !== undefined) {
            LoadContent(sessionStorage['lastPage']);
        }
        else {
            LoadContent('Dashboard');
        }
    }
}


/**
 * fill all tags have attribute as string and keys in page */
function FillDBSTRING() {
   
    $('#UserName').html(sessionStorage['UserName']);
    if (sessionStorage['lang'] === 'ar') {
        $('#CompanyName').html(sessionStorage['CompanyNameAr']);
    }
    else {
        $('#CompanyName').html(sessionStorage['CompanyName']);
    }
    
    var items = [];
    $("[string]").each(function (sd) {
        $(this).html(DBSTRING[$(this).attr('string')]);
    });
    $("[placeholder]").each(function (sd) {
        $(this).attr('placeholder', DBSTRING[$(this).attr('placeholder')]);
    });
    $("[data-error]").each(function (sd) {
        $(this).attr('data-error', DBSTRING[$(this).attr('data-error')]);
    });
    $("[data-helper]").each(function (sd) {
        $(this).attr('data-helper', DBSTRING[$(this).attr('data-helper')]);
    });
    $("[title]").each(function (sd) {
        $(this).attr('title', DBSTRING[$(this).attr('title')]);
    });
   
}

/**
 * 
 * fill string inner form or specific area
 */
function FillDBSTRINGPage(ID) {
    if (ID !== 'ChangePasswordForm')
        if ($('#' + ID).find('#btnForm').length > 0) {
            $('#btnFormTitle').removeClass('invisible')
            if ($('#' + ID).find('#Save').length > 0) {
                $('#SaveTitle').show()
            }
            else {
                $('#SaveTitle').hide()
            }

            if ($('#' + ID).find('#Close').length > 0) {
                $('#CloseTitle').show()
            }
            else {
                $('#CloseTitle').hide()
            }
        }
        else {
            $('#btnFormTitle').addClass('invisible')
        }

    var items = [];
    $("#"+ID+ " [string]").each(function (sd) {
        $(this).html(DBSTRING[$(this).attr('string')]);
    });
    $("#" + ID + " [placeholder]").each(function (sd) {
        $(this).attr('placeholder', DBSTRING[$(this).attr('placeholder')]);
    });
    $("#" + ID + " [data-error]").each(function (sd) {
        $(this).attr('data-error', DBSTRING[$(this).attr('data-error')]);
    });
    $("#" + ID + " [data-helper]").each(function (sd) {
        $(this).attr('data-helper', DBSTRING[$(this).attr('data-helper')]);
    });
    $("#" + ID + " [title]").each(function (sd) {
        $(this).attr('title', DBSTRING[$(this).attr('title')]);
    });

}

/*
 * fill and build menu
 */
FillMainMenu = function () {
    var $menu = $("#mainMenu");
    var menuData = GetLookup('Menu');
    var result = FlatToComplexJson(menuData);
    $menu.empty();
    buildUL($menu, result);
   
}

/**
 * load page by action page
 * **/
LoadContent = function (page) {
    if (page === '') {
        page = 'Dashboard'
    }
    $('#SubpageTitle').parent().hide()
    $('.wrapper').removeClass('preload');
    $('.wrapper').removeClass('loaded');

  
    if (sessionStorage['lastPage'] !== page)
        sessionStorage['TypeID'] = '';
    try {
        //$('.mm-show').removeClass('mm-show');
        $('[actions="' + page + '"]').addClass('mm-active');
      // $('[actions="' + page + '"]').parent().addClass('mm-active');
        var ulExpand = $('[actions="' + page + '"]').closest("ul");
        $(ulExpand).parent().addClass('mm-active');
       
            $(ulExpand).prev().closest('a').attr('aria-expanded', true)
        if (!$(ulExpand).hasClass('mm-show')) {

            $(ulExpand).addClass("mm-show");
            $(ulExpand).attr('style', '');
        }
        

        var actionMenu = $('[actions="' + page + '"]');
        
        if ($(actionMenu).html().indexOf('images/icon-svg') > -1) {
            $('#imgIconTitle').attr('src', $(actionMenu).find('img').attr('src'))
            $('#imgIconTitle').show();
            $('#iIconTitle').hide();

        }
        else {
            $('#iIconTitle').attr('class', $(actionMenu).find('i').attr('class'))
            $('#imgIconTitle').hide();
            $('#iIconTitle').show();
        }

        $('#MainContent').load('/Pages/' + page +'/' + page + '.html', // url 
            function (data, status, jqXGR) {  // callback function 

                $('#MainfixedBar').html('');
                $('#MainfixedBar').hide()
                $('.wrapper').addClass('loaded');
                $('#ChildContent').empty().hide();
                $('#MainContent').show();
                if (status === "success") {
                    sessionStorage['lastPage'] = page;
                    $('#pageTitle').html(DBSTRING[page]);
                    
                    $('#cContent').show();
                    $('.header__pane').show();


                }
            }); 
       
    }
    catch (ss) { alert(ss)}

}


LoadContentChild = function (page, objData) {
    try {

        $('#ChildContent').load('/Pages/' + sessionStorage['lastPage'] + '/' + page + '.html', // url 
            function (data, status, jqXGR) {  // callback function 
                $('.wrapper').addClass('loaded');
                $('#MainContent').hide();
                $('#ChildContent').show();

                if (status === "success") {
                    sessionStorage['ChildlastPage'] = page;
                }

                if (objData !== null && objData !== undefined) {
                    FillForm(objData);
                }

                $('input[type=checkbox]').on('click', function () {
                   
                    if ($(this).prop('checked')) {
                        $(this).attr('value', 1);
                    } else {
                        
                        $(this).attr('value', 0);
                    }
                });
            });
    }
    catch (ss) { alert(ss); }
}

var LoadContentSid = function (page) {
   
    try {
        var url = '';
        if (page === 'ChangePassword') {
            url = '/Pages/Account/' + page + '.html';
        }
        else {
            url = page;
        }
        $('#MainContentSide').load(url, // url 
            function (data, status, jqXGR) {  // callback function 
                if (status === "success") {
                    
                    $('#pageTitleSide').html(DBSTRING[page]);
                    
                }
            });
    }
    catch (ss) {alert(ss) }

}
var ChangeBrands = function () {
    sessionStorage['lastPage'] = '';
    sessionStorage['BrandsID'] = $('#MenuBarBranches').val();
    sessionStorage['MajorServiceID'] = $('#MenuBarBranches  option:selected').attr('MajorServiceID');
    var page = sessionStorage['lastPage'];
    //$('.mm-active').removeClass('mm-active');
    //$('.mm-show').removeClass('mm-show');

    LoadPermissions();
    FillMainMenu();
   
    
    //LoadContent(page); 

    //$('.app-sidebar__heading').each(function (x) {
    //    var len = $(this).next('li').find('a').length
    //    if (len === 0) {
    //        $(this).hide()
    //    }
    //});
    //$('[id=ulMenuExpand]').each(function (x) {
    //    var len = $(this).find('li').length
    //    if (len === 0) {
    //        $(this).parent().hide()
    //    }
    //});
  
    GetLookupBrand('');
    BindExecuteMenu();
    reload_js('assets/js/main.js');
   
}

function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    cont = $('<script>').attr('src', src);
    $('#Globaljs').after(cont);
}

var ChangeLang = function ($val) {

    var urlLang = '';
    sessionStorage['lang'] = $val;
    $Lang = $val;
    if ($Lang === 'ar') {
        urlLang = '../../Scripts/stringlang/AR.json'
    }
    else {
        urlLang = '../../Scripts/stringlang/EN.json'
    }

    $.get(urlLang, function (data) {

        localStorage['DBSTRING'] = JSON.stringify(data);
        DBSTRING = JSON.parse(localStorage['DBSTRING'])
        //GetLookup('');
        //initApp();
        location.href = '/index.html';
    });
}

