$(document).ready(function () {

    var reportName = "",
        hideOptions,
        largeMenuBound = false,
        sideMenuBound = false,
        reportViewer;
    try {
        reportViewer = $("#reportViewer1")
            .telerik_ReportViewer({
                reportServer: {
                    url: $HostURL,
                },
                reportSource: {
                    report: sessionStorage['ReportURL'],
                    parameters: { ComName: sessionStorage['CompanyName'], UserName: sessionStorage['UserName']  }

                },
                renderingEnd: onRenderingEnd,
                ready: function () {
                    $("[data-command*='telerik_ReportViewer_toggleSearchDialog']").parent().hide();
                    $("[data-command*='telerik_ReportViewer_refresh']").parent().hide();
                }

            }).data("telerik_ReportViewer");
    } catch (ex) { alert(ex); }
    // get report name from the reportSource
    function onRenderingEnd(e, args) {
        reportName = reportViewer.reportSource().report;

        if (reportName.indexOf("SampleReport") !== -1) {
            reportName = "SampleReport";
        }

        // bind menus if not already bound
        if (!sideMenuBound || !largeMenuBound) {
            setBindings();
        }
    }

    function setBindings() {
        var smallMenu = $(".trv-menu-small"),
            sideMenu = $(".trv-side-menu").children("ul").data('kendoPanelBar'),
            largeMenu = $(".trv-menu-large").data("kendoMenu");

        // bind to the 'open' event of the main menu
        if (!largeMenuBound && largeMenu) {
            largeMenu.bind("open", function (e) {
                hidingOptions();
            });

            largeMenuBound = true;
        }

        // bind to the 'expand' event of the side menu
        if (!sideMenuBound && smallMenu) {
            sideMenu.bind("expand", function (e) {
                hidingOptions();
            });

            sideMenuBound = true;
        }
    }

    // get the extensions to hide based on the report name
    function hidingOptions() {
        switch (reportName) {
            case "SampleReport":
                hideOptions = ["PDF", "XLS"];
                break;
            default:
                hideOptions = [];
                break;
        }

        // show all extensions
        $('[data-command-parameter]').show();

        // hide the specified extensions
        $.each(hideOptions, function (index, item) {
            var hiddenOption = $('[data-command-parameter="' + item + '"]');
            if (hiddenOption && hiddenOption.length) {
                hiddenOption.hide();
            }

        });
    }

    // bind menus in case of resizing
    $(window).resize(function () {
        setBindings();
    })
    FillDBSTRINGPage('CMReports');
});
