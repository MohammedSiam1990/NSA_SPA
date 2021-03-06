

var InitilaLoad = function () {


    try {
         

    var list_Country = GetLookup('Country');
    var list_District = GetLookup('DistrictID');
    var list_BranchType = GetLookup('Lookups');

    list_BranchType = list_BranchType.filter(function (el) {
        return el.StatusID === $BranchType
    });


    fillDropdown('TypeID', list_BranchType, '', true)

    var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
    list_Country.unshift(objPlzSelect);
    var DataSourceCountry = new kendo.data.DataSource({ data: list_Country });

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
            $("#City").data("kendoDropDownList").bind("select", onChangeCity)
            onChangeCity();
            var element = $("#Country").find('option:selected');
            var Code = element.attr('Code');
            $('#Code').html(Item.Code)

            var dropdownCity = $("#City").data("kendoDropDownList");
            dropdownCity.setOptions({
                change: onChangeCity
            });
        },
        value: ''
    });


    fillDropdown('City', sessionStorage['City'], '', true)

    fillDropdown('DistrictID', list_District, '', true);

    var dropdownCity = $("#City").data("kendoDropDownList");
    dropdownCity.setOptions({
        change: onChangeCity
    });




    } catch (e) {
        alert(e)
    }

}


$(document).ready(function () {


    $('#SubpageTitle').parent().show();
    $('#SubpageTitle').html(DBSTRING['Addresses']);
    var Lang = sessionStorage['lang'];

    if ($('#AddressID').val() === '') {
        InitilaLoad();

    }

    FillDBSTRINGPage('CMAddress');
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();

    if ($('#CustomerID').val() === '') {
        BindRDGrid(CustomerID);
    }

    //if (!IsAdd) {
        $('#SaveTitle').hide();
    //}
});

var IsAdd = false;
var BindRDGrid = function (CustomerID) {

    var token = sessionStorage['token'];
    var URL = $URL_Customer + "GetAddress";
    var CustomerID = CustomerID;
    ListAddress = [];

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {

                $.ajax({
                    type: 'Get',
                    url: URL,
                    headers: {
                        Authorization: 'bearer ' + token
                    },
                    async: false,
                    data: { CustomerID: CustomerID, Lang: $Lang },
                    success: function (data) {
                     
                        options.success(data.datalist.Address);

                    }
                });
            }
        },
        pageSize: 25,
        schema: {
            model: {
                id: "AddressID",
                fields: {
                    AddressID: { type: "number" },
                    CustomerID: { number: "number" }
                }
            }
        }
    }); 
   
    var btn = [{ name: "search", text: DBSTRING['Search'] }]
    if (sessionStorage['CustTypeID'] === '1' && $exportAddressCustomers) {    
        btn.push({
            name: "excel", template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'//k-state-disabled
        });
    }
    else if (sessionStorage['CustTypeID'] === '2' && $exportAddressCompanies) {
        btn.push({
            name: "excel", template: '<div class="d-flex flex-column"><a  class="k-grid-excel icons-tables button1 spin circle" ><img class="" src="../../assets/images/icon/export-excel.svg" width="40" height="40"></img></a><span style ="width:100px;" class="title-table mt-1"  > ' + DBSTRING['ExporttoExcel'] + '</span></div>'//k-state-disabled
        });
    }
    //alert()
    IsAdd = false; 
    try {
        if ((sessionStorage['CustTypeID'] === '1' && $addAddressCustomers)) {
            IsAdd = $addAddressCustomers
            
        }
        else if ((sessionStorage['CustTypeID'] === '2' && $addAddressCompanies)) { 
            IsAdd = $addAddressCompanies
        }
       
    }
    catch (ex) {
        alert(ex)
    }
    
    grid = $("#Addgrid").kendoGrid({
        dataSource: dataSource,
        height: 550,
        groupable: false,
        sortable: true,
        toolbar: btn,
        excel: {
            allPages: true
        },
        search: {
            fields: ["Title", "PhoneMobile", $Lang === 'ar' ? "DistrictNameAr" : "DistrictName", $Lang === 'ar' ? "StatusNameAr" : "StatusName", "LastName"]
        },
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: $pageSizes
        },
        columns: [{
            field: "Title",
            title: DBSTRING['Address'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }
            , {
            field: "PhoneMobile",
            title: DBSTRING['PhoneNumber'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },

        {
            field: $Lang === 'ar' ? "DistrictNameAr" : "DistrictName",
            title: DBSTRING['District'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        },
        {
            field: $Lang === 'ar' ? "StatusNameAr" : "StatusName",
            title: DBSTRING['Status'],
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }

            , {
            command: [
                {
                    name: 'edit',
                    text: '',
                    className: "btn-primary ",
                    click: function (e) {
                        // e.target is the DOM element which represents the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        FillDataForm(data)
                        //FillForm(data);
                        //LoadContentChild('CMCustomer', data);
                    },
                    visible: function (dataItem) {

                        var Show = false;
                        if ((sessionStorage['CustTypeID'] === '1' && $editAddressCustomers)) {
                            Show = $editAddressCustomers
                        }
                        else if ((sessionStorage['CustTypeID'] === '2' && $editAddressCompanies)) {
                            Show = $editAddressCompanies
                        }
                       // alert(IsAdd)
                        return Show;
                    }
                }
            ],
                title: IsAdd?"<span class='fa btn btn-success fa-plus-addNew k-icon k-i-plus' title='" + DBSTRING['Clear'] + "'> </span>" :"",
            width: "260px",
            headerAttributes: {
                "class": "Center",
                style: "text-align: center;"
            },
            attributes: {
                "class": "Center"
            }
        }
        ]
    });

    grid.on("click", ".fa-plus-addNew", function (e) {
       
        $('#AddressID').val('');
        InitilaLoad();
        
        restControl(); 
       
        $('#AddressDetails').show()
        $('#SaveTitle').show();
    });

}

var restControl = function () {


    $('#Title').val('');
    $('#PhoneMobile').val('');
    $('#AddressDescription').val('');


    $('#Longitude').val('');
    $('#Latitude').val('');

    

    $('#Area').val('');
    $('#Street').val(''); 
    $('#BuildingInf').val('');

    $('#AddressID').val('');


    var dropdownlist = $("#Country").data("kendoDropDownList"); 
    dropdownlist.value('');



    var dropdownlist = $("#City").data("kendoDropDownList"); 
    dropdownlist.value('');



    var dropdownlist = $("#DistrictID").data("kendoDropDownList"); 
    dropdownlist.value('');
    //if (!IsAdd) {

        $('#SaveTitle').hide();
    //}
    $('#AddressDetails').hide();
}

var FillDataForm = function (data) {
  
    var list_Country = GetLookup('Country');
    var list_District = GetLookup('DistrictID');
    $('#Title').val(data.Title);
    $('#PhoneMobile').val(data.PhoneMobile);
    $('#AddressDescription').val(data.AddressDescription);


    $('#Longitude').val(data.Longitude);
    $('#Latitude').val(data.Latitude);
    $('#CustomerID').val(data.CustomerID);



    $('#Area').val(data.Area);
    $('#Street').val(data.Street);
    $('#BuildingInf').val(data.BuildingInf);

    $('#AddressID').val(data.AddressID);


    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
    }

    

    var Country = data.CountryID === null ? '' : data.CountryID;
    var dropdownlist = $("#Country").data("kendoDropDownList");
    dropdownlist.value(Country);

    var dataItem = dropdownlist.dataItem();
    var Code = dataItem.Code;
    $('#Code').html(Code);


    fillDropdown('City', sessionStorage['City'], data.CityID, true);
  
    var dropdownCity = $("#City").data("kendoDropDownList");
    dropdownCity.setOptions({
        change: onChangeCity
    });
    fillDropdown('DistrictID', list_District, data.DistrictID, true);
    $('#SaveTitle').show();
    $('#AddressDetails').show();
    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
}

var FillForm = function (data) {
    
    var MenuID = $('[actions="' + sessionStorage['lastPage'] + '"]').attr('id');
    $exportAddressCompanies = GetPermession(MenuID, 'exportAddressCompanies');
    $editAddressCompanies = GetPermession(MenuID, 'editAddressCompanies');
    $exportAddressCustomers = GetPermession(MenuID, 'exportAddressCustomers');
    $editAddressCustomers = GetPermession(MenuID, 'editAddressCustomers');
    $addAddressCustomers = GetPermession(MenuID, 'addAddressCustomers');
    $addAddressCompanies = GetPermession(MenuID, 'addAddressCompanies');




    BindRDGrid(data.CustomerID);
    var list_Country = GetLookup('Country');
    var list_District = GetLookup('DistrictID');

    var objPlzSelect = { 'id': '', 'Name': DBSTRING['PleaseSelect'], 'NameAr': DBSTRING['PleaseSelect'] };
    list_Country.unshift(objPlzSelect);

    var DataSourceCountry = new kendo.data.DataSource({ data: list_Country });

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
            var element = $("#Country").find('option:selected');
            var Code = element.attr('Code');
            $('#Code').html(Item.Code)
            var dropdownCity = $("#City").data("kendoDropDownList");
            dropdownCity.setOptions({
                change: onChangeCity
            });
        }
    });



    var dropdownlist = $("#Country").data("kendoDropDownList");
    var Country = data.CountryID === null ? '' : data.CountryID;
    dropdownlist.value(Country);



    fillDropdown('City', sessionStorage['City'], data.CityID, true);
    fillDropdown('DistrictID', list_District, data.DistrictID, true);
    var dropdownCity = $("#City").data("kendoDropDownList");
    dropdownCity.setOptions({
        change: onChangeCity
    });
    var dataItem = dropdownlist.dataItem();
    var Code = dataItem.Code;
    $('#Code').html(Code);

    $('#Title').val(data.Title);
    $('#PhoneMobile').val(data.PhoneMobile);
    $('#AddressDescription').val(data.AddressDescription);


    $('#Longitude').val(data.Longitude);
    $('#Latitude').val(data.Latitude);
    $('#CustomerID').val(data.CustomerID);



    $('#Area').val(data.Area);
    $('#Street').val(data.Street);
    $('#BuildingInf').val(data.BuildingInf);

    $('#AddressID').val(data.AddressID);
    

    if (data.StatusID === $InActive) {
        $('#InActive').prop("checked", true);
    }
    else {
        $('#InActive').prop("checked", false);
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


    if (!ValidateForm('CMAddress'))
        return false;
    var obj = {
        "AddressID": "", "Title": "", "AddressDescription": "", "PhoneMobile": "",
        "Latitude": "", "Longitude": "", "CountryID": "", "CityID": "", "DistrictID": "", "Area": "",
        "Street": "", "BuildingInf": "", "CustomerID": "", "StatusID": ""
    };

    obj.AddressID = $('#AddressID').val() === '' ? 0 : $('#AddressID').val();
    obj.Title = $('#Title').val();
    obj.AddressDescription = $('#AddressDescription').val();
    obj.PhoneMobile = parseInt($('#PhoneMobile').val() === '' ? null : $('#PhoneMobile').val());
    obj.Latitude = parseInt($('#Latitude').val() === '' ? 0 : $('#Latitude').val());
    obj.Longitude = parseInt($('#Longitude').val() === '' ? 0 : $('#Longitude').val());
    obj.CountryID = parseInt($('#Country').val() === '' ? null : $('#Country').val());
    obj.CityID = parseInt($('#City').val() === '' ? null : $('#City').val());
    obj.DistrictID = parseInt($('#DistrictID').val() === '' ? null : $('#DistrictID').val());
    obj.Area = $('#Area').val();
    obj.Street = $('#Street').val();
    obj.BuildingInf = $('#BuildingInf').val();
    obj.CustomerID = $('#CustomerID').val();



    if ($('#InActive').is(':checked')) {
        obj.StatusID = $InActive;
    }
    else {
        obj.StatusID = $Active;
    }



    var Lang = sessionStorage['lang'];
    var token = sessionStorage['token'];
    var URL = $URL_Customer + "SaveAddress?Lang=" + Lang;

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
                    $("#Addgrid").data("kendoGrid").dataSource.read();

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

                        $(':input', '#CMAddress')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .prop('checked', false)
                            .prop('selected', false);
                    
                    restControl()
                    $dataForm = $('#' + sessionStorage['ChildlastPage']).serialize();
                    //alert(JSON.stringify($dataForm))
                    //FillForm(data)
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


