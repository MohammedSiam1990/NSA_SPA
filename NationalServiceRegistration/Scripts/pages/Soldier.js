var upload_Passport = '';
var upload_militarycard = '';
var upload_Certificates = '';
var upload_Clearance = '';
var upload_person = '';
var upload_other = '';



var current_fs, next_fs, previous_fs; //fieldsets
var opacity;
var current = 1;




var data_Ministry = [
    { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] },
    { 'id': '1', 'Name': "وزاره العمل", 'NameAr': "وزاره العمل" },
    { 'id': '2', 'Name': 'وزاره الصحه', 'NameAr': 'وزاره الصحه' },
    { 'id': '3', 'Name': 'وزاره التربيه والتعليم', 'NameAr': 'وزاره التربيه والتعليم' },
    { 'id': '4', 'Name': 'وزاره الدفاع', 'NameAr': 'وزاره الدفاع' },
    { 'id': '5', 'Name': 'وزاره الداخليه', 'NameAr': 'وزاره الداخليه' },
    { 'id': '6', 'Name': 'وزاره التعليم العالي', 'NameAr': 'وزاره التعليم العالي' },
    { 'id': '7', 'Name': 'وزاره التخطيط', 'NameAr': 'وزاره التخطيط' },
    { 'id': '8', 'Name': 'وزاره الطاقه', 'NameAr': 'وزاره الطاقه' },
];



var data_ManagementAction = [
    { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] },
    { 'id': '4', 'Name': DBSTRING['Approved'], 'NameAr': DBSTRING['Approved'] },
    { 'id': '6', 'Name': DBSTRING['Reject'], 'NameAr': DBSTRING['Reject'] }
];

var data_SoldierSocialStatus = [
    { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] },
    { 'id': '1', 'Name': DBSTRING['Married'], 'NameAr': DBSTRING['Married'] },
    { 'id': '2', 'Name': DBSTRING['single'], 'NameAr': DBSTRING['single'] }
];




var data_Jobs = [
    { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] },
    { 'id': '1', 'Name': DBSTRING['Employee'], 'NameAr': DBSTRING['Employee'] },
    { 'id': '2', 'Name': DBSTRING['UnEmployee'], 'NameAr': DBSTRING['UnEmployee'] }
];



var data_SoldierBloodType = [
    { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] },
    { 'id': '1', 'Name': '+O', 'NameAr': '+O' },
    { 'id': '2', 'Name': '-O', 'NameAr': '-O' },
    { 'id': '3', 'Name': '+A', 'NameAr': '+A' },
    { 'id': '4', 'Name': '-A', 'NameAr': '-A' },
    { 'id': '5', 'Name': '+B', 'NameAr': '+B' },
    { 'id': '6', 'Name': '-B', 'NameAr': '-B' },
    { 'id': '7', 'Name': '+AB', 'NameAr': '+AB' },
    { 'id': '8', 'Name': '-AB', 'NameAr': '-AB' },
];




var data_Reasons_Postponement_Exemption_Requirements = [
    { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] },
    { 'id': '1', 'Name': "غير لايق صحيا", 'NameAr': "غير لايق صحيا" },
    { 'id': '2', 'Name': 'العائل من أبناء العسكريين', 'NameAr': 'العائل من أبناء العسكريين' },
    { 'id': '3', 'Name': 'العائل من أبناء المجند', 'NameAr': 'العائل من أبناء المجند' },
    { 'id': '4', 'Name': 'العائل من أبناء الشهيد', 'NameAr': 'العائل من أبناء الشهيد' },
    { 'id': '5', 'Name': 'العائل  من أبناء المفقود الذى قضى بوفاتة حكماَ', 'NameAr': 'العائل  من أبناء المفقود الذى قضى بوفاتة حكماَ' },
    { 'id': '6', 'Name': "الاعتبارات الإنسانية", 'NameAr': "الاعتبارات الإنسانية" },
    { 'id': '7', 'Name': "للمصلحة العامة", 'NameAr': "للمصلحة العامة" },
    { 'id': '8', 'Name': "عسكرى على راس عملة", 'NameAr': "عسكرى على راس عملة" },
    { 'id': '9', 'Name': "عسكرى سابق", 'NameAr': "عسكرى سابق" },
    { 'id': '10', 'Name': "مستثنى على راس عملة", 'NameAr': "مستثنى على راس عملة" },
    { 'id': '11', 'Name': "مستثنى عسكرى سابق", 'NameAr': "مستثنى عسكرى سابق" },
    { 'id': '12', 'Name': "متوفى", 'NameAr': "متوفى", },
    { 'id': '13', 'Name': "طالب في احدى الكليات او المعاهد او المدارس العسكرية", 'NameAr': "طالب في احدى الكليات او المعاهد او المدارس العسكرية" },
    { 'id': '14', 'Name': "طالب في احدى الكليات او المعاهد او المدارس العسكرية سابقا", 'NameAr': "طالب في احدى الكليات او المعاهد او المدارس العسكرية سابقا" },
    { 'id': '15', 'Name': "غير لايق صحيا(موقت)", 'NameAr': "غير لايق صحيا(موقت)" },
    { 'id': '16', 'Name': "العائل الوحيد لاخوته او لاخواتة العاجزين", 'NameAr': "العائل الوحيد لاخوته او لاخواتة العاجزين" },
    { 'id': '17', 'Name': "العائل الوحيد لاخواتة الذين لم يتمو سن الثامنة عشرة", 'NameAr': "العائل الوحيد لاخواتة الذين لم يتمو سن الثامنة عشرة" },
    { 'id': '18', 'Name': "العائل الوحيد لأمه", 'NameAr': "العائل الوحيد لأمه" },
    { 'id': '19', 'Name': "العائل الوحيد لأبوية او لأبية", 'NameAr': "العائل الوحيد لأبوية او لأبية" },
    { 'id': '20', 'Name': "العائل الوحيد لاخواتة الغير متزوجات", 'NameAr': "العائل الوحيد لاخواتة الغير متزوجات" },
    { 'id': '21', 'Name': "العائل من أبناء الأسير", 'NameAr': "العائل من أبناء الأسير" },
    { 'id': '22', 'Name': "العائل من أبناء المفقود", 'NameAr': "العائل من أبناء المفقود" },
    { 'id': '23', 'Name': "الابن الوحيد لابوين", 'NameAr': "الابن الوحيد لابوين" },
    { 'id': '24', 'Name': "الابن الوحيد لام", 'NameAr': "الابن الوحيد لام" },
    { 'id': '25', 'Name': "وحد الولدين لاب", 'NameAr': "وحد الولدين لاب" },
    { 'id': '26', 'Name': "وحدالولدين لام", 'NameAr': "وحدالولدين لام" },
    { 'id': '27', 'Name': "يعتبر في حكم الابن الوحيد", 'NameAr': "يعتبر في حكم الابن الوحيد" },
    { 'id': '28', 'Name': "من توفت زوجتة الوحيده ولدية أبناء قصر", 'NameAr': "من توفت زوجتة الوحيده ولدية أبناء قصر" },
    { 'id': '29', 'Name': "محكوم عليه بعقوبة سالبة للحرية", 'NameAr': "محكوم عليه بعقوبة سالبة للحرية" },
    { 'id': '30', 'Name': "محبوس احتياطياَ", 'NameAr': "محبوس احتياطياَ" },
    { 'id': '31', 'Name': "طالب في الثانوية او مايعادلها", 'NameAr': "طالب في الثانوية او مايعادلها" },
    { 'id': '32', 'Name': "مبتعث ضمن برنامج البعثة الاميرية", 'NameAr': "مبتعث ضمن برنامج البعثة الاميرية" },
    { 'id': '33', 'Name': "مقبول للدراسة في احدى كليات الطب المعتمدة لدى وزارة التعليم والتعليم العالى(قبول غير مشروط)", 'NameAr': "مقبول للدراسة في احدى كليات الطب المعتمدة لدى وزارة التعليم والتعليم العالى(قبول غير مشروط)" },
    { 'id': '34', 'Name': "طالب في احدى كليات الطب المعتمدة لدى وزارة التعليم والتعليم العالى(قبول غير مشروط)", 'NameAr': "طالب في احدى كليات الطب المعتمدة لدى وزارة التعليم والتعليم العالى(قبول غير مشروط)" },
    { 'id': '35', 'Name': "ملتحق بالدراسة في احدى كليات دون المستوى الجامعى قبل سريان اجكام القانون", 'NameAr': "ملتحق بالدراسة في احدى كليات دون المستوى الجامعى قبل سريان اجكام القانون" },
    { 'id': '36', 'Name': "ملتحق بالدراسة في احدى الجامعات او المعاهد العليا قبل سريان   اجكام القانون", 'NameAr': "ملتحق بالدراسة في احدى الجامعات او المعاهد العليا قبل سريان   اجكام القانون" },
    { 'id': '37', 'Name': "خريج تقضى طبيعة دراسة قضاء فترة تدريبية بعد الحصول على المؤهل", 'NameAr': "خريج تقضى طبيعة دراسة قضاء فترة تدريبية بعد الحصول على المؤهل" },
    { 'id': '38', 'Name': "مرافق لزوجتة للعمل في الخارج", 'NameAr': "مرافق لزوجتة للعمل في الخارج" },
    { 'id': '39', 'Name': "مرافق لزوجتة للدراسة في الخارج", 'NameAr': "مرافق لزوجتة للدراسة في الخارج" },
    { 'id': '40', 'Name': "مرافق لزوجتة للعلاج في الخارج", 'NameAr': "مرافق لزوجتة للعلاج في الخارج" },
    { 'id': '41', 'Name': "مرافق لاحد اقاربة للعمل في الخارج", 'NameAr': "مرافق لاحد اقاربة للعمل في الخارج" },
    { 'id': '42', 'Name': "مرافق لاحد اقاربة  للدراسة في الخارج", 'NameAr': "مرافق لاحد اقاربة  للدراسة في الخارج" },
    { 'id': '43', 'Name': "مرافق لاحد اقاربة للعلاج في الخارج", 'NameAr': "مرافق لاحد اقاربة للعلاج في الخارج" },
    { 'id': '44', 'Name': "مرشح للتعين لدى إحدى الجهات العسكرية", 'NameAr': "مرشح للتعين لدى إحدى الجهات العسكرية" },
    { 'id': '45', 'Name': "اسباب اخرى", 'NameAr': "اسباب اخرى" }
];





function fill_Ministry() {


    var Lang = sessionStorage['lang'];

    var DataSource_Ministry = new kendo.data.DataSource({ data: data_Ministry });

    $("#Ministry").kendoDropDownList({
        dataTextField: Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',
        dataSource: DataSource_Ministry,
        filter: "contains",
        suggest: true



    });
}



function fill_ManagementAction() {


    var Lang = sessionStorage['lang'];

    var DataSource_ManagementAction = new kendo.data.DataSource({ data: data_ManagementAction });

    $("#ManagementAction").kendoDropDownList({
        dataTextField: Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',
        dataSource: DataSource_ManagementAction,
        filter: "contains",
        suggest: true



    });
}


function Fill_SoldierSocialStatus() {

    var Lang = sessionStorage['lang'];

    var DataSource_SoldierSocialStatus = new kendo.data.DataSource({ data: data_SoldierSocialStatus });
    try {


        $("#SoldierSocialStatus").kendoDropDownList({
            dataTextField: Lang === 'ar' ? "NameAr" : "Name",
            dataValueField: "id",
            template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',
            dataSource: DataSource_SoldierSocialStatus,
            filter: "contains",
            suggest: true,
            index: 3


        });

    } catch (e) {
        alert(e);
    }




}

function Fill_Jobs() {


    var Lang = sessionStorage['lang'];
    var DataSource_Jobs = new kendo.data.DataSource({ data: data_Jobs });

    $("#IsEmployee").kendoDropDownList({
        dataTextField: Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',
        dataSource: DataSource_Jobs,
        change: dropdownlist_changeJobs,
        filter: "contains",
        suggest: true


    });

    var dropdownlist_Jobs = $("#IsEmployee").data("kendoDropDownList");
    dropdownlist_Jobs.select(0);


}


function Fill_SoldierBloodType() {



    var Lang = sessionStorage['lang'];


    var DataSource_SoldierBloodType = new kendo.data.DataSource({ data: data_SoldierBloodType });

    $("#SoldierBloodType").kendoDropDownList({
        dataTextField: Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',
        dataSource: DataSource_SoldierBloodType,
        filter: "contains",
        suggest: true,
        index: 3

    });


}

function Fill_Reasons_Postponement_Exemption_Requirements() {





    var Lang = sessionStorage['lang'];


    var DataSource_Reasons_Postponement_Exemption_Requirements = new kendo.data.DataSource({ data: data_Reasons_Postponement_Exemption_Requirements });

    $("#Soldier_Delay_Exemption_Exception").kendoDropDownList({
        dataTextField: Lang === 'ar' ? "NameAr" : "Name",
        dataValueField: "id",
        template: Lang === 'ar' ? '<i class="#:data.Flag # flag"></i> ' + '#:data.NameAr #' : '<i class="#:data.Flag # flag"></i> ' + '#:data.Name #',
        dataSource: DataSource_Reasons_Postponement_Exemption_Requirements,
        filter: "contains",
        suggest: true,
        change: dropdownlist_change,
        index: 3


    });



}




function setProgressBar(curStep) {
    var steps = $("fieldset").length;
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
        .css("width", percent + "%")
}



var ValidatefieldsData = function ($form) {

    var noErrors = true;


    var fields = $('#fs_' + $form[0].id + " .is-required")
        .find("select, textarea, input");

    $.each(fields, function (i, field) {

        if (!field.value) {
            if ($(field).hasClass('k-input')) {
                if ($(field).parent()[0].innerText === '') {
                    noErrors = false;

                    markInvalid($(field), $(field).closest($inputWrapper).siblings($helperClass).attr('data-error'));

                    return noError;
                }
                else {
                    markValid($(field));
                }
            }
            else {
                noErrors = false;

                markInvalid($(field), $(field).closest($inputWrapper).siblings($helperClass).attr('data-error'));

                return noError;
            }

        }
        else {
            markValid($(field));
        }
    });

    noErrors = ValidateFormData('fs_' + $form[0].id);


    return noErrors;
}



function ready_Page() {



    $("#panelbar_Postponement_exemption").kendoPanelBar({
        expandMode: "multiple"
    });

    $("#panelbar_InfoWrokCurrent").kendoPanelBar({
        expandMode: "multiple"
    });


    var panelBar = $("#panelbar_InfoWrokCurrent").data("kendoPanelBar");
    // expand the element with ID, "item1"
    panelBar.expand($("#InfoWrokCurrentPanel"));


    if (sessionStorage['IsSuperAdmin'] != 'true') {


        document.getElementsByName("next1")[0].value = DBSTRING['Next'];
        document.getElementsByName("previous1")[0].value = DBSTRING['Previous'];

        document.getElementsByName("next2")[0].value = DBSTRING['Next'];
        document.getElementsByName("previous2")[0].value = DBSTRING['Previous'];

        document.getElementsByName("next3")[0].value = DBSTRING['Next'];
        document.getElementsByName("previous3")[0].value = DBSTRING['Previous'];

        document.getElementsByName("next4")[0].value = DBSTRING['Next'];
        document.getElementsByName("previous4")[0].value = DBSTRING['Previous'];

        document.getElementsByName("next5")[0].value = DBSTRING['Next'];
        document.getElementsByName("previous5")[0].value = DBSTRING['Previous'];


        document.getElementsByName("next6")[0].value = DBSTRING['Next'];
        document.getElementsByName("previous6")[0].value = DBSTRING['Previous'];
        document.getElementsByName("submit")[0].value = DBSTRING['submit'];





        setProgressBar(current);

        $(".next").click(function () {



            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            if (!ValidatefieldsData($("#progressbar li").eq($("fieldset").index(current_fs))))
                return false;

            if (current == 6 && $('#ImageName_Passport').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_Passport']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }

            if (current == 6 && $('#ImageName_QID').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_QID']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }

            if (current == 6 && $('#ImageName_person').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_person']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }

            if (current == 6 && $('#ImageName_Certificates').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_CertificationUniversity']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }

            if (current == 6 && $('#ImageName_workletter_MinistryDevelopment').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_workletter_MinistryDevelopment']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }


            if (current == 6 && $('#ImageName_married').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_married']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }


            if (current == 6 && $('#ImageName_Health').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_Health']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }



            if (current == 6 && $('#ImageName_Transcript').val() == "") {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_Transcript']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }


            if (current == 7 && $('#IsAddDelay_Exemption_Exception').is(':checked') == true && ($('#Soldier_Delay_Exemption_Exception').val() == '' || $('#ImageName_other').val() == '')) {

                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultTxt').html(DBSTRING['lblphotos_Soldier_Delay_Exemption_Exception']);
                setTimeout("$('#ResultMessage').removeClass('show')", 2000);
                return false;
            }

            if (current == 7) {


                try {
                    SaveSoldier(this);
                } catch (e) {

                }
            } else {



                //Add Class Active
                $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

                //show the next fieldset
                next_fs.show();
                //hide the current fieldset with style
                current_fs.animate({ opacity: 0 }, {
                    step: function (now) {
                        // for making fielset appear animation
                        opacity = 1 - now;

                        current_fs.css({
                            'display': 'none',
                            'position': 'relative'
                        });
                        next_fs.css({ 'opacity': opacity });
                    },
                    duration: 300
                });
                setProgressBar(++current);

            }

        });

        $(".previous").click(function () {




            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({ 'opacity': opacity });
                },
                duration: 300
            });
            setProgressBar(--current);
        });



        if ((CheckPageUniversity() == true || CheckPageSchool() == true)) {
            LoadContent('Dashboard');
            return false;
        }

        var Lang = sessionStorage['lang'];
        $folderImg = 'Soldier';



        $("#SoldierBrithDayDate").kendoDatePicker({

        });




        Fill_SoldierSocialStatus()
        Fill_Jobs();
        Fill_SoldierBloodType();
        fill_Ministry();
        Fill_Reasons_Postponement_Exemption_Requirements();


        api_call();




        var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
        var changeLogo = GetPermession(MenuID, 'changeLogo');
        var Edit = GetPermession(MenuID, 'edit');




        var Edit = GetPermession(MenuID, 'edit');
        if (!Edit) {
            $('#SaveSoldier').hide();
            $(':input, select ', '#SoldierForm').attr('disabled', true);
            DisabledEnableKendoDropDownByForm('SoldierForm', false)

            $('#photos_Passport').parent().hide();
            $('#delete-image-Passport').hide();

            $('#photos_person').parent().hide();
            $('#delete-image-person').hide();

            $('#photos_Certificates').parent().hide();
            $('#delete-image-Certificates').hide();


            $('#photos_militarycard').parent().hide();
            $('#delete-image-militarycard').hide();

            $('#photos_Clearance').parent().hide();
            $('#delete-image-Clearance').hide();


            $('#photos_other').parent().hide();
            $('#delete-image-other').hide();
        }
    }





    BindFileUploaderkendoSoldier();
    FillDBSTRINGPage('SoldierForm');

}

$(document).ready(function () {

    ready_Page();
});


function FillLabel_lblphotos_Soldier_Delay_Exemption_Exception(value) {
    switch (value) {
        case "1":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'قرار من اللجنة الطبية العسكرية';
            break;
        case "6" || "7":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'من عند الوزير او من يوفوضه';
            break;
        case "8":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهادة دورة تاسيسية + اثبات عمل';
            break;
        case "9":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهادة دورة تاسيسية + اخلاء طرف من الجهة العسكرية موضح عدد سنوات الخدمة';
            break;
        case "10":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهادة دورة تاسيسية + اثبات عمل ';
            break;
        case "11":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهادة دورة تاسيسية + اخلاء طرف من الجهة العسكرية موضح عدد سنوات الخدمة';
            break;
        case "12":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهادة وفاه من وزارة الصحة';
            break;
        case "13":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'موافقه او صلاحية تجنيد من الوزير او الجهه العسكرية';
            break;
        case "14":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهادة دورة تاسيسية + اخلاء طرف من الجهة العسكرية موضح عدد سنوات الخدمة';
            break;
        case "15":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'قرار من اللجنة الطبية العسكرية';
            break;
        case "16":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات عدم زواج الاخوات اثبات عدم وجود رب للاسره';
            break;
        case "17":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'إذا كانت ارملة او مطلقةبائناً او كان زوجها عاجز عن الكسب';
            break;
        case "18":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'بشرط يكون الاب عاجزاً صحياً او عاجزاً عن الكسب';
            break;
        case "19":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات عدم زواج الاخوات اثبات عدم وجود عائل للاسره';
            break;
        case "20":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات من الجهة المختصة بأسر الاب + اثبات عدم عمل الاخوه';
            break;
        case "21":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات من المحكمة بفقدان الاب + اثبات عدم عمل الاخوه';
            break;
        case "22" || "23" || "24" || "25":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'كتاب من الجوازات موضح فية عدد افراد الاسره';
            break;
        case "26":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اذا كان لدية اخ مقعد غير قادر على خدمة نفسه';
            break;
        case "27":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهادة وفاه الزوحة + كتاب من الجوازات موضح فية عدد افراد الاسره';
            break;
        case "28" || "29":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات من المحكمة';
            break;
        case "30":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'كتاب من مركز معلومات الطلبة / ن لا يزيد21 سنة';
            break;
        case "31":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'قبول غير مشروط / ن لا يزيد28 سنة';
            break;
        case "32":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'قبول غير مشروط';
            break;
        case "33":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'قبول طب غير مشروط';
            break;
        case "34":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'شهاده قيد من الجامعة + كشف درجات ';
            break;
        case "35":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات بالدراسة قبل سريان احكام القانون ان لا يزيد 25 سنة ';
            break;
        case "36":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات بالدراسة قبل سريان احكام القانون ان لا يزيد 28 سنة ';
            break;
        case "37":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات من التعليم او الجامعة';
            break;
        case "38" || "40":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات من وزارة العمل';
            break;
        case "39" || "42":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات من وزارة التعليم والتعليم العالى';
            break;
        case "41" || "43" || "44":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'اثبات من وزارة الصحة';
            break;
        case "45":
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'مرفقات اخرى';
            $('#Notes_Other').attr('disabled', false);
            break;
        default:
            document.getElementById("lblphotos_Soldier_Delay_Exemption_Exception").innerHTML = 'لايوجد مرفق';
            break;
    }
}


var changeChkDelay_Exemption_Exception = function ($this) {
    changeDelay_Exemption_Exception($($this).is(":checked"));

}


function changeDelay_Exemption_Exception(value) {

    var panelbar_Postponement_exemption = $("#panelbar_Postponement_exemption").data("kendoPanelBar");
    if (value) {

        panelbar_Postponement_exemption.expand($("#Postponement_exemptionPanel"));
        $('#lblPostponement_Exemption_Requirements').addClass('required-label')
        $('#divPostponement_Exemption_Requirements').addClass('is-required')



    }
    else {

        panelbar_Postponement_exemption.collapse($("#Postponement_exemptionPanel"));
        $('#lblPostponement_Exemption_Requirements').removeClass('required-label')
        $('#divPostponement_Exemption_Requirements').removeClass('is-required')


    }
}

function changeJobs(value) {

    var panelBar = $("#panelbar_InfoWrokCurrent").data("kendoPanelBar");
    // expand the element with ID, "item1"

    if (value == 1) {


        panelBar.expand($("#InfoWrokCurrentPanel"));

        $('#lblEmployer').addClass('required-label')
        $('#divEmployer').addClass('is-required')



        $('#lblMinistry').addClass('required-label')
        $('#divMinistry').addClass('is-required')


        $('#lblTypeWork').addClass('required-label')
        $('#divTypeWork').addClass('is-required')

        $('#lblPhoneWork').addClass('required-label')
        $('#divPhoneWork').addClass('is-required')

        $('#lblAddressWork').addClass('required-label')
        $('#divAddressWork').addClass('is-required')

    }
    else {

        panelBar.collapse($("#InfoWrokCurrentPanel"));

        $('#lblEmployer').removeClass('required-label')
        $('#divEmployer').removeClass('is-required')



        $('#lblMinistry').removeClass('required-label')
        $('#divMinistry').removeClass('is-required')

        $('#lblTypeWork').removeClass('required-label')
        $('#divTypeWork').removeClass('is-required')

        $('#lblPhoneWork').removeClass('required-label')
        $('#divPhoneWork').removeClass('is-required')

        $('#lblAddressWork').removeClass('required-label')
        $('#divAddressWork').removeClass('is-required')
    }
}

function dropdownlist_changeJobs(e) {
    var value = this.value();
    changeJobs(value)


}


function dropdownlist_change(e) {
    var value = this.value();
    // Use the value of the widget
    FillLabel_lblphotos_Soldier_Delay_Exemption_Exception(value);

}
function api_call() {

    var token = sessionStorage['token'];
    var InsertedBy = sessionStorage['UserId'];

    var Lang = sessionStorage['lang'];
    var URL = $URL_Soldier + "GetSoldierById?InsertedBy=" + InsertedBy + "&&Lang=" + Lang;
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { Lang: Lang },
        success: function (data, status, xhr) {


            if (data.success === true) {
                successCallBack(data);
            }
            else {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(data.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);

            }
        }
    }).fail(function (xhr, status) {
        if (status === "error") {
            return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
    });
}





function api_callAddmin(data) {





    $('#ApprovedBy').val(data.datalist.approvedBy);
    $('#ModifiedBy').val(data.datalist.modifiedBy);
    $('#InsertedBy').val(data.datalist.insertedBy);
    $('#ApprovedDate').val(data.datalist.approvedDate);
    $('#CreateDate').val(data.datalist.createDate);
    $('#LastModifyDate').val(data.datalist.lastModifyDate);



    $("#panelbar_Postponement_exemption").kendoPanelBar({
        expandMode: "multiple"
    });

    $("#panelbar_InfoWrokCurrent").kendoPanelBar({
        expandMode: "multiple"
    });


    var panelBar = $("#panelbar_InfoWrokCurrent").data("kendoPanelBar");
    // expand the element with ID, "item1"
    panelBar.expand($("#InfoWrokCurrentPanel"));

    $(':input, select ', '#SoldierForm').attr('disabled', true);
    DisabledEnableKendoDropDownByForm('SoldierForm', false)

    $('#UpdateCompany').attr('disabled', false);



    $('#photos_Passport').parent().hide();
    $('#delete-image-Passport').hide();

    $('#photos_QID').parent().hide();
    $('#delete-image-QID').hide();

    $('#photos_person').parent().hide();
    $('#delete-image-person').hide();

    $('#photos_Certificates').parent().hide();
    $('#delete-image-Certificates').hide();

    $('#photos_workletter_MinistryDevelopment').parent().hide();
    $('#delete-image-workletter_MinistryDevelopment').hide();

    $('#photos_married').parent().hide();
    $('#delete-image-married').hide();

    $('#photos_Health').parent().hide();
    $('#delete-image-Health').hide();


    $('#photos_other').parent().hide();
    $('#delete-image-other').hide();


    $('#SoldierForm').attr('disabled', false);


    fillDropdown('ManagementAction', data_ManagementAction, data.datalist.managementAction, false)
    fillDropdown('SoldierSocialStatus', data_SoldierSocialStatus, data.datalist.soldierSocialStatus, false)
    fillDropdown('IsEmployee', data_Jobs, data.datalist.isEmployee, false)
    fillDropdown('Ministry', data_Jobs, data.datalist.ministry, false)
    fillDropdown('SoldierBloodType', data_SoldierBloodType, data.datalist.soldierBloodType, false)
    fillDropdown('Soldier_Delay_Exemption_Exception', data_Reasons_Postponement_Exemption_Requirements, data.datalist.soldier_Delay_Exemption_Exception, false)

    changeJobs(data.datalist.isEmployee)
    if (data.datalist.soldier_Delay_Exemption_Exception == '45') {
        $('#Notes_Other').attr('disabled', false);
    }

    var dropdownlist_ManagementAction = $("#ManagementAction").data("kendoDropDownList");
    dropdownlist_ManagementAction.enable(true);

    $('#Management_Notes').attr('disabled', false);


    if (data.datalist.isAddDelay_Exemption_Exception == true) {
        $('#ChkDelay_Exemption_Exception').prop("checked", true);
    } else {
        $('#ChkDelay_Exemption_Exception').prop("checked", false);
    }


    if (data.datalist.isMedicalTest === true) {
        $('#IsMedicalTest').prop("checked", true);
    }
    else {
        $('#IsMedicalTest').prop("checked", false);
    }


    changeDelay_Exemption_Exception(data.datalist.isAddDelay_Exemption_Exception)

    $('#ManagementAction').val(data.datalist.managementAction);
    $('#Management_Notes').val(data.datalist.management_Notes);



    $('#SoldierId').val(data.datalist.soldierId);
    $('#SoldierName1').val(data.datalist.soldierName1);
    $('#SoldierName2').val(data.datalist.soldierName2);
    $('#SoldierName3').val(data.datalist.soldierName3);
    $('#SoldierName4').val(data.datalist.soldierName4);
    $('#SoldierNameEN').val(data.datalist.soldierNameEN);
    $('#SoldierQID').val(data.datalist.soldierQID);
    $('#SoldierCertificateDegree').val(data.datalist.soldierCertificateDegree);
    $('#SoldierCertificateDegreeDate').val(data.datalist.soldierCertificateDegreeDate);
    $('#SoldierMobile1').val(data.datalist.soldierMobile1);
    $('#SoldierMobile2').val(data.datalist.soldierMobile2);
    $('#SoldierPhoneHome').val(data.datalist.soldierPhoneHome);
    $('#SoldierFax').val(data.datalist.soldierFax);
    $('#SoldierMobileFriend').val(data.datalist.soldierMobileFriend);

    $("#SoldierBrithDayDate").kendoDatePicker({ value: data.datalist.soldierBrithDayDate });

    var ddlMinistry = $("#Ministry").data("kendoDropDownList");
    ddlMinistry.value(data.datalist.ministry);

    var ddlIsEmployee = $("#IsEmployee").data("kendoDropDownList");
    ddlIsEmployee.value(data.datalist.isEmployee);

    $('#Notes_Other').val(data.datalist.notes_Other);
    $('#SoldierEmployer').val(data.datalist.soldierEmployer);
    $('#SoldierTypeWork').val(data.datalist.soldierTypeWork);
    $('#SoldierPhoneWork').val(data.datalist.soldierPhoneWork);
    $('#SoldierFaxWork').val(data.datalist.soldierFaxWork);
    $('#SoldierAddressWork').val(data.datalist.soldierAddressWork);
    $('#SoldierZone').val(data.datalist.soldierZone);
    $('#SoldierStreetName').val(data.datalist.soldierStreetName);
    $('#SoliderHomeNo').val(data.datalist.soliderHomeNo);

    FillLabel_lblphotos_Soldier_Delay_Exemption_Exception(JSON.stringify(data.datalist.soldier_Delay_Exemption_Exception));




    var img_url_Passport = data.img_url_Passport;
    var imageName_Passport = data.datalist.imageName_Passport;
    if (img_url_Passport !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_Passport").attr("src", img_url_Passport);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_Passport').val(imageName_Passport);
    }


    var img_url_person = data.img_url_person;
    var imageName_person = data.datalist.imageName_person;
    if (img_url_person !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_person").attr("src", img_url_person);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_person').val(imageName_person);
    }


    var img_url_militarycard = data.img_url_militarycard;
    var imageName_militarycard = data.datalist.imageName_militarycard;
    if (img_url_militarycard !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_militarycard").attr("src", img_url_militarycard);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_militarycard').val(imageName_militarycard);
    }


    var img_url_Certificates = data.img_url_Certificates;
    var imageName_Certificates = data.datalist.imageName_Certificates;
    if (img_url_Certificates !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_Certificates").attr("src", img_url_Certificates);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_Certificates').val(imageName_Certificates);
    }


    var img_url_Clearance = data.img_url_Clearance;
    var imageName_Clearance = data.datalist.imageName_Clearance;
    if (img_url_Clearance !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_Clearance").attr("src", img_url_Clearance);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_Clearance').val(imageName_Clearance);
    }



    var img_url_other = data.img_url_other;
    var ImageName_other = data.datalist.imageName_other;
    if (img_url_other !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_other").attr("src", img_url_other);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_other').val(ImageName_other);
    }


    try {


        $('#lblPassport').attr({
            target: '_blank',
            href: img_url_Passport
        });

        $('#lblperson').attr({
            target: '_blank',
            href: img_url_person
        });
        $('#lblmilitarycard').attr({
            target: '_blank',
            href: img_url_militarycard
        });
        $('#lblCertificates').attr({
            target: '_blank',
            href: img_url_Certificates
        });
        $('#lblClearance').attr({
            target: '_blank',
            href: img_url_Clearance
        });
       
        $('#lbl__other').attr({
            target: '_blank',
            href: img_url_other
        });

    } catch (e) {
        alert(e)
    }

    $dataForm = $('#SoldierForm').serializeArray();

}






var FillForm = function (data) {




    var token = sessionStorage['token'];
    var InsertedBy = sessionStorage['UserId'];
    var SoldierId = data.SoldierId;


    var Lang = sessionStorage['lang'];
    var URL = $URL_Soldier + "GetSoldierBySoldierID?SoldierId=" + SoldierId + "&&Lang=" + Lang;
    $.ajax({
        type: 'Get',
        url: URL,
        headers: {
            Authorization: 'bearer ' + token
        },
        async: false,
        data: { Lang: Lang },
        success: function (data, status, xhr) {


            if (data.success === true) {
                api_callAddmin(data);
                $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
            }
            else {
                $('#ResultMessage').addClass('alert-danger show');
                $('#ResultMessage').removeClass('hide');
                $('#ResultTxt').html(data.message);
                setTimeout("$('#ResultMessage').removeClass('show')", 5000);

            }
        }
    }).fail(function (xhr, status) {
        if (status === "error") {
            return "Sorry but there was an error: " + xhr.status + " " + xhr.statusText;
        }
    });






}







var successCallBack = function (data) {



    $('#ApprovedBy').val(data.datalist.approvedBy);
    $('#ModifiedBy').val(data.datalist.modifiedBy);
    $('#InsertedBy').val(data.datalist.insertedBy);
    $('#ApprovedDate').val(data.datalist.approvedDate);
    $('#CreateDate').val(data.datalist.createDate);
    $('#LastModifyDate').val(data.datalist.lastModifyDate);






    changeJobs(data.datalist.isEmployee)
    if (data.datalist.isAddDelay_Exemption_Exception === true) {
        $('#ChkDelay_Exemption_Exception').prop("checked", true);
    }
    else {
        $('#ChkDelay_Exemption_Exception').prop("checked", false);
    }
    if (data.datalist.isMedicalTest === true) {
        $('#IsMedicalTest').prop("checked", true);
    }
    else {
        $('#IsMedicalTest').prop("checked", false);
    }


    

    changeDelay_Exemption_Exception(data.datalist.isAddDelay_Exemption_Exception)



    $('#SoldierId').val(data.datalist.soldierId);
    $('#SoldierName1').val(data.datalist.soldierName1);
    $('#SoldierName2').val(data.datalist.soldierName2);
    $('#SoldierName3').val(data.datalist.soldierName3);
    $('#SoldierName4').val(data.datalist.soldierName4);
    $('#SoldierNameEN').val(data.datalist.soldierNameEN);
    $('#SoldierQID').val(data.datalist.soldierQID);
    $('#SoldierCertificateDegree').val(data.datalist.soldierCertificateDegree);
    $('#SoldierCertificateDegreeDate').val(data.datalist.soldierCertificateDegreeDate);
    $('#SoldierMobile1').val(data.datalist.soldierMobile1);
    $('#SoldierMobile2').val(data.datalist.soldierMobile2);
    $('#SoldierPhoneHome').val(data.datalist.soldierPhoneHome);
    $('#SoldierFax').val(data.datalist.soldierFax);
    $('#SoldierMobileFriend').val(data.datalist.soldierMobileFriend);

    $("#SoldierBrithDayDate").kendoDatePicker({ value: data.datalist.soldierBrithDayDate });

    var dropdownlist = $("#SoldierSocialStatus").data("kendoDropDownList");
    dropdownlist.value(data.datalist.soldierSocialStatus);

    var ddlSoldierBloodType = $("#SoldierBloodType").data("kendoDropDownList");
    ddlSoldierBloodType.value(data.datalist.soldierBloodType);

    var ddlMinistry = $("#Ministry").data("kendoDropDownList");
    ddlMinistry.value(data.datalist.ministry);

    var ddlIsEmployee = $("#IsEmployee").data("kendoDropDownList");
    ddlIsEmployee.value(data.datalist.isEmployee);


    $('#Notes_Other').val(data.datalist.notes_Other);
    $('#SoldierEmployer').val(data.datalist.soldierEmployer);
    $('#SoldierTypeWork').val(data.datalist.soldierTypeWork);
    $('#SoldierPhoneWork').val(data.datalist.soldierPhoneWork);
    $('#SoldierFaxWork').val(data.datalist.soldierFaxWork);
    $('#SoldierAddressWork').val(data.datalist.soldierAddressWork);
    $('#SoldierZone').val(data.datalist.soldierZone);
    $('#SoldierStreetName').val(data.datalist.soldierStreetName);
    $('#SoliderHomeNo').val(data.datalist.soliderHomeNo);



    var ddlSoldier_Delay_Exemption_Exception = $("#Soldier_Delay_Exemption_Exception").data("kendoDropDownList");
    ddlSoldier_Delay_Exemption_Exception.value(data.datalist.soldier_Delay_Exemption_Exception);


    FillLabel_lblphotos_Soldier_Delay_Exemption_Exception(JSON.stringify(data.datalist.soldier_Delay_Exemption_Exception));
    //InsertedBy
    //CreateDate
    //LastModifyDate
    //ModifiedBy
    //ImageName
    //ApprovedBy
    //ApprovedDate
    //StatusID



    //$('#ApprovedBy').val(data.datalist.approvedBy);
    //$('#ApprovedDate').val(data.datalist.approvedDate);
    //alert(JSON.stringify(data.datalist))
    //$('#StatusId').val(data.datalist.statusId);
    //$('#CreationDate').val(data.datalist.creationDate);




    //fillDropdown('City', sessionStorage['City'], data.datalist.cityId, true);
    //fillDropdown('Currency', list_Currency, data.datalist.currencyId, true);


    var img_url_Passport = data.img_url_Passport;
    var imageName_Passport = data.datalist.imageName_Passport;
    if (img_url_Passport !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_Passport").attr("src", img_url_Passport);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_Passport').val(imageName_Passport);
    }


    var img_url_person = data.img_url_person;
    var imageName_person = data.datalist.imageName_person;
    if (img_url_person !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_person").attr("src", img_url_person);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_person').val(imageName_person);
    }


    var img_url_militarycard = data.img_url_militarycard;
    var imageName_militarycard = data.datalist.imageName_militarycard;
    if (img_url_militarycard !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_militarycard").attr("src", img_url_militarycard);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_militarycard').val(imageName_militarycard);
    }


    var img_url_Certificates = data.img_url_Certificates;
    var imageName_Certificates = data.datalist.imageName_Certificates;
    if (img_url_Certificates !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_Certificates").attr("src", img_url_Certificates);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_Certificates').val(imageName_Certificates);
    }


    var img_url_Clearance = data.img_url_Clearance;
    var imageName_Clearance = data.datalist.imageName_Clearance;
    if (img_url_Clearance !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_Clearance").attr("src", img_url_Clearance);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_Clearance').val(imageName_Clearance);
    }



    var img_url_other = data.img_url_other;
    var ImageName_other = data.datalist.imageName_other;
    if (img_url_other !== '') {
        /*var img_url = data.datalist.imageName;*/
        $("#preview_other").attr("src", img_url_other);
        /*   var ImageName = img_url.substring(img_url.lastIndexOf('/') + 1);*/
        $('#ImageName_other').val(ImageName_other);
    }


    $dataForm = $('#SoldierForm').serializeArray();
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

function validFrm() {
    if ($('.error-message').length === 0)
        return true;
    else
        return false;
}




var SaveSoldier = function (next) {
    //if (!validFrm()) {
    //    return false;
    //}



    jconfirmSave(DBSTRING['MadeChangeFormNotSave'], DBSTRING['Save'], function (r) {
        if (r === 1) { //Ok
            if (!ValidateForm('SoldierForm'))
                return false;




            var obj = {
                "SoldierId": "", "SoldierName1": "", "SoldierName2": "", "SoldierName3": "", "SoldierName4": "", "SoldierNameEN": "",
                "SoldierQID": "", "SoldierCertificateDegree": "", "SoldierCertificateDegreeDate": "", "SoldierMobile1": "", "SoldierMobile2": "",
                "SoldierPhoneHome": "", "SoldierFax": "", "SoldierMobileFriend": "", "SoldierBrithDayDate": "", "SoldierSocialStatus": "",
                "SoldierBloodType": "", "SoldierEmployer": "", "SoldierTypeWork": "", "SoldierPhoneWork": "",
                "SoldierFaxWork": "", "SoldierAddressWork": "", "SoldierZone": "", "SoldierStreetName": "", "SoliderHomeNo": "",
                "ModifiedBy": "", "InsertedBy": "", "LastModifyDate": "", "ApprovedBy": "", "ApprovedDate": "",
                "StatusId": "", "CreateDate": "",
                "ImageName_Passport": "", "ImageName_Clearance": "", "ImageName_Certificates": "", "ImageName_person": "", "ImageName_militarycard": "", "ImageName_other": "",
                "Soldier_Delay_Exemption_Exception": "", "IsEmployee": "", "IsAddDelay_Exemption_Exception": "", "ManagementAction": "", "Management_Notes": "", "Ministry": "",
                "Notes_Other": "", "IsMedicalTest": ""
            };



            obj.Notes_Other = $('#Notes_Other').val();
            obj.Ministry = $('#Ministry').val();
            obj.IsEmployee = $('#IsEmployee').val();
            obj.IsAddDelay_Exemption_Exception = $('#IsAddDelay_Exemption_Exception').is(':checked');
            obj.IsMedicalTest = $('#IsMedicalTest').is(':checked');
            

            obj.ImageName_Passport = $('#ImageName_Passport').val();
            obj.ImageName_Clearance = $('#ImageName_Clearance').val();
            obj.ImageName_Certificates = $('#ImageName_Certificates').val();
            obj.ImageName_person = $('#ImageName_person').val();
            obj.ImageName_militarycard = $('#ImageName_militarycard').val();
            obj.ImageName_other = $('#ImageName_other').val();

            obj.SoldierName1 = $('#SoldierName1').val();
            obj.SoldierName2 = $('#SoldierName2').val();
            obj.SoldierName3 = $('#SoldierName3').val();
            obj.SoldierName4 = $('#SoldierName4').val();
            obj.SoldierNameEN = $('#SoldierNameEN').val();
            obj.SoldierQID = $('#SoldierQID').val();
            obj.SoldierBrithDayDate = $('#SoldierBrithDayDate').val();
            obj.SoldierSocialStatus = $('#SoldierSocialStatus').val();
            obj.SoldierBloodType = $('#SoldierBloodType').val();


            obj.SoldierCertificateDegree = $('#SoldierCertificateDegree').val();
            obj.SoldierCertificateDegreeDate = $('#SoldierCertificateDegreeDate').val();


            obj.SoldierMobile1 = $('#SoldierMobile1').val();
            obj.SoldierMobile2 = $('#SoldierMobile2').val();
            obj.SoldierPhoneHome = $('#SoldierPhoneHome').val();
            obj.SoldierFax = $('#SoldierFax').val();
            obj.SoldierMobileFriend = $('#SoldierMobileFriend').val();



            obj.SoldierEmployer = $('#SoldierEmployer').val();
            obj.SoldierTypeWork = $('#SoldierTypeWork').val();
            obj.SoldierPhoneWork = $('#SoldierPhoneWork').val();
            obj.SoldierFaxWork = $('#SoldierFaxWork').val();
            obj.SoldierAddressWork = $('#SoldierAddressWork').val();


            obj.SoldierZone = $('#SoldierZone').val();
            obj.SoldierStreetName = $('#SoldierStreetName').val();
            obj.SoliderHomeNo = $('#SoliderHomeNo').val();




            obj.Soldier_Delay_Exemption_Exception = $('#Soldier_Delay_Exemption_Exception').val();





            obj.ApprovedBy = $('#ApprovedBy').val();
            obj.ModifiedBy = $('#ModifiedBy').val();
            obj.InsertedBy = $('#InsertedBy').val();
            obj.ApprovedDate = $('#ApprovedDate').val();
            obj.CreateDate = $('#CreateDate').val();
            obj.LastModifyDate = $('#LastModifyDate').val();





            var Lang = sessionStorage['lang'];
            var token = sessionStorage['token'];

            if (sessionStorage['IsSuperAdmin'] == 'true') {
                obj.ManagementAction = $('#ManagementAction').val();
                obj.Management_Notes = $('#Management_Notes').val();


                if ($('#ManagementAction').val() == 4) {
                    obj.ApprovedBy = sessionStorage['UserId'];
                }


                obj.StatusId = $('#ManagementAction').val();
                obj.SoldierId = $('#SoldierId').val();
                var URL = $URL_Soldier + "SaveSoldier?Lang=" + Lang;

            }
            else {
                if ($('#SoldierId').val() != null && $('#SoldierId').val() != '') {
                    obj.SoldierId = $('#SoldierId').val();
                    obj.ModifiedBy = sessionStorage['UserId'];
                    obj.StatusId = 5;




                    var URL = $URL_Soldier + "UpdateSoldier?Lang=" + Lang;
                } else {
                    obj.StatusId = 1;
                    obj.SoldierId = 0;
                    obj.InsertedBy = sessionStorage['UserId'];
                    var URL = $URL_Soldier + "AddSoldier?Lang=" + Lang;
                }
            }
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

                    if (sessionStorage['IsSuperAdmin'] == 'true') {
                        if (data.success === true) {
                            try {



                                $("#grid").data("kendoGrid").dataSource.read();


                                $('#ResultMessage').addClass('alert-success show');
                                $('#ResultTxt').html(data.message);
                                setTimeout("$('#ResultMessage').removeClass('show')", 5000);
                                callback(true);
                            }
                            catch (ex) { }
                            if (IsComeFromDestroy) {
                                $dataForm = '';
                                $('#ChildContent').hide();
                                $('#MainContent').show();
                            }


                        }
                        else {
                            $('#ResultMessage').addClass('alert-success show');
                            $('#ResultTxt').html(data.message);

                            setTimeout("$('#ResultMessage').removeClass('show')", 2000);

                            if ($('#SoldierId').val() === '') {
                                $(':input', '#UniversityForm')
                                    .not(':button, :submit, :reset, :hidden')
                                    .val('')
                                    .prop('checked', false)
                                    .prop('selected', false);
                            }
                            $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                        }

                    } else {
                        if (data.success === true) {



                            current_fs = $(next).parent();
                            next_fs = $(next).parent().next();


                            //Add Class Active
                            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

                            //show the next fieldset
                            next_fs.show();
                            //hide the current fieldset with style
                            current_fs.animate({ opacity: 0 }, {
                                step: function (now) {
                                    // for making fielset appear animation
                                    opacity = 1 - now;

                                    current_fs.css({
                                        'display': 'none',
                                        'position': 'relative'
                                    });
                                    next_fs.css({ 'opacity': opacity });
                                },
                                duration: 300
                            });

                            try {
                                setProgressBar(++current);
                            } catch (e) {
                                alert(e)
                            }



                            //$('#ResultMessage').addClass('alert-success show');
                            //$('#ResultTxt').html(data.message);
                        }
                        else {

                            $('#ResultMessage').addClass('alert-danger show');
                            $('#ResultMessage').removeClass('hide');
                            $('#ResultTxt').html(data.message);
                        }

                        setTimeout("$('#ResultMessage').removeClass('show')", 5000);
                        callback(true);

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
                    alert(msg);
                }
            });

        }
        else if (r === 0) { //No
            $dataForm = ''
            callback(false);
        }
        else { //r===2   cancel
            callback(false);
        }
    });



}