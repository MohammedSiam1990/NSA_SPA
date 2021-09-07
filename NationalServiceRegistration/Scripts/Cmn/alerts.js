
(function ($) {
    //    _InitialValuOPOS();
    $.alerts = {

        // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .01,                // transparency level of overlay
        overlayColor: '#FFF',               // base color of overlay
        draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '&nbsp;' + DBSTRING['Ok'] + '&nbsp;',         // text for the OK button  1
        closeButton: '&nbsp;' + DBSTRING['Close'] + '&nbsp;',
        cancelButton: '&nbsp;' + DBSTRING['Cancel'] + '&nbsp;', // text for the Cancel button 2
        yesButton: '&nbsp;' + DBSTRING['Save'] + '&nbsp;',
        noButton: '&nbsp;' + DBSTRING['No'] + '&nbsp;',
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods

        alert: function (message, title, callback) {
            if (title === null) title = 'Alert';
            $.alerts._show(title, message, null, 'alert', function (result) {
                if (callback) callback(result);
            });
        },

        confirm: function (message, title, callback) {
            if (title === null) title = 'Confirm';
            $.alerts._show(title, message, null, 'confirm', function (result) {
                if (callback) callback(result);
            });
        },
        confirmSave: function (message, title, callback) {
            if (title === null) title = 'confirmSave';

            $.alerts._show(title, message, null, 'confirmSave', function (result) {
                if (callback) callback(result);
            });
        },

        prompt: function (message, value, title, callback) {
            if (title === null) title = 'Prompt';
            $.alerts._show(title, message, value, 'prompt', function (result) {
                if (callback) callback(result);
            });
        },

        // Private methods

        _show: function (title, msg, value, type, callback) {

            //$.alerts._hide();
            //$.alerts._overlay('show');

            $("BODY").append(
                ' <div id="deleteModal" class="modal fad" >' +
                '<div class="modal-dialog  modal-sm">' +
                '<div class="modal-content">' +
                '<form ><div class="modal-header  d-flex-button">' +
                ' <h4 class="modal-title" id="popup_title"></h4>' +
                '<button type="button" class="close" onclick=" $.alerts._hide();">&times;</button></div>'+
                '<div class="modal-body" id="popup_content"></div>' +
                '<div class="modal-footer" id="popup_message"></div>' +
                '</form></div ></div ></div >' 
                );

         
            //$("#deleteModal").css({
            //    //position: fixed,
            //    top: 0,
            //    right: 0,
                
            //    //display: none,
            //    //width: "100%",
            //    //height: "100%",
            //    //overflow: hidden,
            //    //outline: 0
            //    position: pos
            //    //zIndex: 99999,
            //    //padding: 0,
            //    //margin: 0
            //});
          
            $("#popup_title").text(title);
           
            $("#popup_content").text(msg.replace('**||{}', ''));
           

            switch (type) {
                case 'alert':
                    $("#popup_message").append('<input type="button" value="' + $.alerts.okButton + '" id="popup_ok" />');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        callback(true);
                    });
                    $("#popup_ok").focus().keypress(function (e) {
                        if (e.keyCode === 13 || e.keyCode === 27) $("#popup_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    $("#popup_message").append('<input type="button" class="btn btn-danger d-flex-button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" class="btn btn-default d-flex-button" value="' + $.alerts.cancelButton + '" id="popup_cancel" />');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        if (callback) callback(true);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(false);
                    });
                    $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode === 13) $("#popup_ok").trigger('click');
                        if (e.keyCode === 27) $("#popup_cancel").trigger('click');
                    });
                    break;
                case 'confirmSave':
                   
                    $("#popup_message").append('<input type="button" class="btn btn-primary d-flex-button" value="' + $.alerts.yesButton + '" id="popup_ok" /> <input type="button" class="btn btn-danger d-flex-button" value="' + $.alerts.noButton + '" id="popup_No" />'
                       /* + '< input type = "button" class= "btn btn-info d-flex-button" value = "' + $.alerts.cancelButton + '" id = "popup_cancel" />'*/
                         );
                    
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        if (callback) callback(1);
                    });
                    $("#popup_No").click(function () {
                        $.alerts._hide();
                        if (callback) callback(0);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(2);
                    });
                    $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode === 13) $("#popup_ok").trigger('click');
                        if (e.keyCode === 27) $("#popup_cancel").trigger('click');
                    });
                    break;
                case 'prompt':
                    $("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $("#popup_prompt").width($("#popup_message").width());
                    $("#popup_ok").click(function () {
                        var val = $("#popup_prompt").val();
                        $.alerts._hide();
                        if (callback) callback(val);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(null);
                    });
                    $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode === 13) $("#popup_ok").trigger('click');
                        if (e.keyCode === 27) $("#popup_cancel").trigger('click');
                    });
                    if (value) $("#popup_prompt").val(value);
                    $("#popup_prompt").focus().select();
                    break;
            }
            // Make draggable
            if ($.alerts.draggable) {
                try {
                    $("#deleteModal").draggable({ handle: $("#popup_title") });
                    $("#popup_title").css({ cursor: 'move' });
                } catch (e) { /* requires jQuery UI draggables */ }
            }
        },
        _hide: function () {
            $("#deleteModal").remove();
            $.alerts._overlay('hide');
            $.alerts._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $.alerts._overlay('hide');
                    $("BODY").append('<div id="popup_overlay"></div>');
                    $("#popup_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(document).height(),
                        background: $.alerts.overlayColor,
                        opacity: $.alerts.overlayOpacity
                    });
                    break;
                case 'hide':
                    $("#popup_overlay").remove();
                    break;
            }
        },

        _reposition: function () {
            var top = (($(window).height() / 2) - ($("#deleteModal").outerHeight() / 2)) + $.alerts.verticalOffset;
            var left = (($(window).width() / 2) - ($("#deleteModal").outerWidth() / 2)) + $.alerts.horizontalOffset;
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
           // if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#deleteModal").css({
                top: top + 'px',
                left: left + 'px'
            });
            //$("#popup_overlay").height($(document).height());
        },

        _maintainPosition: function (status) {
            if ($.alerts.repositionOnResize) {
                switch (status) {
                    case true:
                        $(window).bind('resize', $.alerts._reposition);
                        break;
                    case false:
                        $(window).unbind('resize', $.alerts._reposition);
                        break;
                }
            }
        }
    }

    // Shortuct functions
    jAlert = function (message, title, callback) {
        $.alerts.alert(message, title, callback);
    }

    jConfirm = function (message, title, callback) {
        
        $.alerts.confirm(message, title, callback);
    };

    jconfirmSave = function (message, title, callback) {
        $.alerts.confirmSave(message, title, callback);
    };

    jPrompt = function (message, value, title, callback) {
        $.alerts.prompt(message, value, title, callback);
    };

})(jQuery);