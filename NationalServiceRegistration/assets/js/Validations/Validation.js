// Heavily commented so you can you whichever chunks you need
// Please use and improve your forms 

var $inputWrapper = '.input-wrap',
    $invalidClass = 'is-invalid',
    $validClass = 'is-valid',
    $optionalClass = 'is-optional',
    $requiredClass = 'is-required',
    $helperClass = '.is-helpful',
    $errorClass = 'error-message',

    $validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,13}$/i,
    $validWebsite = /^[A-Z._-]+.[A-Z0-9.-]+\.[A-Z]{2,13}$/i,
    $validPhone = /^\d{9}$/,///^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}$/,///^[0-9-.()]{3,15}$/,
    $validFax = /^\+?[0-9]{7,}$/,
    $date = new Date();

/*
 * Validation Functions
 */

function markValid(field) {
    var $field_wrapper = field.parents($inputWrapper);

    $field_wrapper.addClass($validClass).removeClass($invalidClass);

    $(field).parents($inputWrapper).siblings('.error-message').slideUp(200, function () {
        $(this).addClass('hide');
    });

    field.parents($inputWrapper).siblings($helperClass).removeClass($errorClass);
    field.parents($inputWrapper).siblings('.error-message').removeClass($errorClass);

    setIcon(field, 'valid');
    setField(field, $field_wrapper, 'valid');
    helperUp(field);
}

function markInvalid(field, error_message) {
    try {
        var $field_wrapper = field.parents($inputWrapper);

       // if ($field_wrapper.hasClass($requiredClass) || ($field_wrapper.hasClass($optionalClass) && field.val() !== '')) {
            //setIcon(field, 'invalid');
            setError(field, error_message);
        setField(field, $field_wrapper, 'invalid');

        setTimeout(function () {
            markValid(field)
        }, 8000);
        //}
    }
    catch (es) {alert(es)}
}

function markNeutral(field) {
    $(field).closest($inputWrapper).addClass($validClass).removeClass($invalidClass);
    $('label[for="' + field.attr('id') + '"]').addClass($validClass).removeClass($invalidClass);
    $(field).siblings('.icon.success').removeClass('show').addClass('hide');
    $(field).siblings('.icon.error').removeClass('show').addClass('hide');
}

function setIcon(field, validation_type) {
    var $iconSuccess = $(field).siblings('.icon.success');
    var $iconError = $(field).siblings('.icon.error');

    if (validation_type === 'valid') {
        $iconSuccess.removeClass('hide');
        $iconError.addClass('hide');
    } else if (validation_type === 'invalid') {
        $iconSuccess.addClass('hide');
        $iconError.removeClass('hide');
    }
}

// Used for selects because the icons are in a different location

function setIconMulti(iconSuccess, iconError, validation_type) {
    if (validation_type === 'valid') {
        iconSuccess.removeClass('hide');
        iconError.addClass('hide');
    } else if (validation_type === 'invalid') {
        iconSuccess.addClass('hide');
        iconError.removeClass('hide');
    }
}

function setError(field, error_message) {
    var $helpText =field.closest($inputWrapper).siblings($helperClass);
     field.closest($inputWrapper).siblings($helperClass).html(error_message);
    field.closest($inputWrapper).siblings($helperClass).addClass('error-message').removeClass('hide');
    helperDown(field, $helpText, error_message);
}

function setField(field, field_wrapper, validation_type) {
    if (validation_type === 'valid') {
        field_wrapper.addClass($validClass).removeClass($invalidClass);
        field_wrapper.siblings('label').addClass($validClass).removeClass($invalidClass);
    } else if (validation_type === 'invalid') {
        field_wrapper.addClass($invalidClass).removeClass($validClass);
        field_wrapper.siblings('label').addClass($invalidClass).removeClass($validClass);
    }
}

/*
 * Specific Checker Functions
 */

function checkPasswordRequirements(input, event) {
    var errors = 1;
   
    if (input.val().length >= 6) {
        errors--;
        $('.help_text_pwd4').addClass('success');
    } else if (input.val().length < 6) {
        errors++;
        $('.help_text_pwd4').removeClass('success');
    }

    if (errors > 0) {
       
            markInvalid($(input), DBSTRING['Please_enter_valid_password']);

    } else if (errors <= 0) {
        markValid(input);
    }
    return errors;
}

function validatePasswordPair(first, second) {
    var noError = true;
  
    if (first.val() !== second.val()) {
        //markValid(second);  
       
        markInvalid($(second), DBSTRING['Both_passwords_must_match']);
        noError = false;
    } else if (second.val().length < 6) {
        markInvalid($(second), DBSTRING['Please_enter_valid_password']);
        noError = false;
    }
    else {
        markValid(second);
        noError = true;
    }
    
    return noError;
}


/*
 * Helper Text
 */

function helperDown(field, help_div, message) {
    help_div.html(message);
    //help_div.removeClass($errorClass);
    help_div.slideDown(400);

}

function helperUp(field) {
    field.parents($inputWrapper).siblings($helperClass).slideUp(400);
}


/*
 * Event Triggers
 */

//$('input, textarea').on('focus', function () {
//    markNeutral($(this));
//    var $helpText = $(this).closest($inputWrapper).siblings($helperClass);

//    if ($(this).closest($inputWrapper).hasClass('password-set')) {
//        var $message = '<ul>' +
//            '<li><div class="help_text_pwd1">(a-z) lowercase</div></li>' +
//            '<li><div class="help_text_pwd2">(A-Z) UPPERCASE</div></li>' +
//            '<li><div class="help_text_pwd3">(0-9) number</div></li>' +
//            '<li><div class="help_text_pwd4">8 characters</div></li>' +
//            '</ul>';
//    } else {
//        var $message = $helpText.attr('data-helper');
//    }

//    helperDown($(this), $helpText, $message);
//});

//$('input:not("input[type=url], input[type=password], input[name=email], input[type=tel]"), textarea').on('blur', function () {
//    if ($(this).val() === '' && $(this).closest($inputWrapper).hasClass($requiredClass)) {
//        markInvalid($(this), $(this).closest($inputWrapper).siblings($helperClass).attr('data-error'));
//    } else {
//        helperUp($(this));
//    }
//});

//$('input:not("input[type=url], input[type=password], input[name=email], input[type=tel]"), textarea').on('keyup', function (event) {
//    if ($(this).val() !== '') {
//        markValid($(this));
//    }
//});


$('select').on('change', function () {

    var $currentSelect = $(this),
        $selects = $('select ', $currentSelect.closest($inputWrapper)),
        $numSelects = $selects.length;

    if ($numSelects > 1) { // handle multiple selects
        if (!$currentSelect.hasClass('changed')) {
            $currentSelect.addClass('changed');
        }

        var $selectsValues = [];
        var $numChanges = $('.changed ', $currentSelect.closest($inputWrapper)).length;

        if ($numChanges === $numSelects) {
            $selects.each(function () {
                if ($(this).val() === '') {
                    $selectsValues.push('empty'); // need a value to push to the array (can't use 'empty' in markup if '' is needed elsewhere)
                } else {
                    $selectsValues.push($(this).val());
                }
            });

            var $numEmpty = 0;

            for (i = 0; i < $selectsValues.length; i++) {
                if ($selectsValues[i] === 'empty') {
                    $numEmpty++;
                }
            }

            var $iconSuccess = $('.icon.success', $(this).closest($inputWrapper)),
                $iconError = $('.icon.error', $(this).closest($inputWrapper));

            if ($numEmpty > 0) {
                setIconMulti($iconSuccess, $iconError, 'invalid');
                setField($currentSelect, $currentSelect.closest($inputWrapper), 'invalid');
            } else {
                setIconMulti($iconSuccess, $iconError, 'valid');
                setField($currentSelect, $currentSelect.closest($inputWrapper), 'valid');
            }
        }

    } else { // handle single selects
        if ($(this).val() === '') {
            markInvalid($(this), DBSTRING['Please_make_selection']);
        } else {
            markValid($(this));
        }
    }
});

// Email validation
//$('input[name=email]').on('keyup blur', function (event) {
//    if ($(this).parents($inputWrapper).hasClass($optionalClass) && $(this).val() === '') {
//        markNeutral($(this));
//    } else {
//        var $checkEmail = $(this).val().match($validEmail);

//        if (event.type === 'blur') {
//            if ($(this).val() === '') {
//                markInvalid($(this), $(this).parents($inputWrapper).siblings($helperClass).attr('data-error'));
//            } else if ($checkEmail === null) {
//                markInvalid($(this), DBSTRING['Please_enter_valid_email']);
//            } else {
//                markValid($(this));
//                helperText($(this), $helpText, $message, event);
//            }
//        } else {
//            if ($checkEmail !== null) {
//                markValid($(this));
//            }
//        }
//    }
//});

// PASSWORDS

//$('input[name=password1]').on('blur', function (event) {
//    if ($(this).val().length === 0) {
//        markInvalid($(this), DBSTRING['Please_enter_password']);
//    } else {
//        checkPasswordRequirements($(this), event);
//    }
//});

// Bind initial password choice while typing
//$('input[name=password1]').on('keyup change', function (event) {
//    if ($(this).val().length === 0) {
//        markInvalid($(this), DBSTRING['Please_enter_password']);
//    } else {
//        checkPasswordRequirements($(this), event);
//    }
//});

// Bind password confirmation field on blur
//$('input[name=password2]').on('blur', function (event) {
//    if ($(this).val().length === 0) {
//        markInvalid($(this), DBSTRING['Please_confirm_your_password']);
//    } else {
//        validatePasswordPair($('.password-set').children('input[type="password"]'), $(this));
//    }
//});

// Bind password confirmation field while typing
//$('input[name=password2]').on('keyup change', function (event) {
//    if ($('.password-set').hasClass('is-invalid')) {
//        markInvalid($(this), DBSTRING['fix_before_confirming_pass']);
//    } else {
//        validatePasswordPair($('.password-set').children('input[type="password"]'), $(this));
//    }
//});

// Bind current password on blur
$('input[name=password-old]').on('blur', function (event) {
    if ($(this).val().length === 0) {
        markInvalid($(this), DBSTRING['Please_enter_password']);
    } else if ($(this).val().length < 8) {
        markInvalid($(this), DBSTRING['Please_enter_valid_email']);
    }
});

// Bind current password while typing
$('input[name=password-old]').on('keyup change', function (event) {
    if ($(this).val().length >= 6) {
        markValid($(this));
    }
});

// URLs
//$('input[name=website]').on('keyup blur', function (event) {
//    if ($(this).parents($inputWrapper).hasClass($optionalClass) && $(this).val() === '') {
//        markNeutral($(this));
//        helperUp($(this));
//    } else {
//        var $checkWebsite = $(this).val().match($validWebsite);

//        if (event.type === 'blur') {
//            if ($checkWebsite === null) {
//                markInvalid($(this), 'Please enter a valid website address (www.example.com)');
//            } else {
//                markValid($(this));
//            }
//        } else {
//            if ($checkWebsite !== null) {
//                markValid($(this));
//            }
//        }
//    }
//});

// Phone
//$('input[type=tel]').on('keyup blur', function (event) {
//    if ($(this).parents($inputWrapper).hasClass($optionalClass) && $(this).val() === '') {
//        markNeutral($(this));
//    } else {
//        var $checkPhone = $(this).val().match($validPhone);

//        if (event.type === 'blur') {
//            if ($checkPhone === null) {
//                markInvalid($(this), DBSTRING['valid_phone_number']);
//            } else {
//                markValid($(this));
//                helperText($(this), $helpText, $message, event);
//            }
//        } else {
//            if ($checkPhone != null) {
//                markValid($(this));
//            }
//        }
//    }
//});

// Fax
$('input[type=fax]').on('keyup blur', function (event) {
    if ($(this).parents($inputWrapper).hasClass($optionalClass) && $(this).val() === '') {
        markNeutral($(this));
    } else {
        var $checkPhone = $(this).val().match($validFax);

        if (event.type === 'blur') {
            if ($checkPhone === null) {
                markInvalid($(this), DBSTRING['valid_fax_number']);
            } else {
                markValid($(this));
                helperText($(this), $helpText, $message, event);
            }
        } else {
            if ($checkPhone != null) {
                markValid($(this));
            }
        }
    }
});

// Make sure they are at least 13 years old
$('input[name=birthdate]').on('blur', function () {
    var $year = parseInt($(this).val().substr(0, 4));
    var $month = parseInt($(this).val().substr(5, 2));
    var $day = parseInt($(this).val().substr(8, 2));

    if (($year + 13) > parseInt($date.getFullYear())) {
        if ($month < (parseInt($date.getMonth()) + 1)) {
            if ($day < parseInt($date.getFullYear())) {
                markInvalid($(this), 'Sorry, you must be at least 13')
            } else {
                markValid($(this));
            }
        } else {
            markValid($(this));
        }
    } else {
        markValid($(this));
    }
});

// Set the default date to January 1st, 13 years ago
$(function () {
    var $thirteen = $date.getFullYear() - 13;
    $('input[name=birthdate]').val($thirteen + '-01-01');
});

$('input[type=color]').on('click change focus hover', function () {
    markValid($(this));
});

var ValidateForm = function ($form) {
   
    var noErrors = true;
    

    var fields = $('#' + $form + " .is-required")
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
    
    noErrors = ValidateFormData($form);


  
    return noErrors;
    
}

var ValidateFormData = function ($form) {
    
    var noErrors = true;

    var fields = $('#' + $form)
        .find("select, textarea, input");

    $.each(fields, function (i, field) {

        if (field.type === 'email') {
            if ($(field).val() !== '') {
                var $checkEmail = $(this).val().match($validEmail);
                if ($checkEmail === null) {
                    noErrors = false;
                    markInvalid($(field), DBSTRING['Please_enter_valid_email']);
                } else {
                    markValid($(field));
                    try { helperText($(field), $helpText, $message, event); } catch (ss) { }
                }
            }
            else {
                markValid($(field));
                try { helperText($(field), $helpText, $message, event); } catch (ss) { }
            }
        }
        else if (field.type === 'password') {

            if (field.name === 'password1' || field.name === 'OldPassword') {

                if ($(field).val().length === 0) {

                    noErrors = false;
                    markInvalid($(field), DBSTRING['Please_enter_password']);
                } else {

                    var error = checkPasswordRequirements($(field));
                    if (error > 0) {
                        noErrors = false;
                    }
                }
            }
            else if (field.name === 'password2') {
                if ($(field).val().length === 0) {
                    noErrors = false;
                    markInvalid($(field), DBSTRING['Please_confirm_your_password']);
                } else if ($('#Password').hasClass('is-invalid')) {
                    noErrors = false;
                    markInvalid($(field), DBSTRING['fix_before_confirming_pass']);
                } else {
                    noErrors = validatePasswordPair($('#Password'), $(field));

                }

            }
        }
        else if (field.type === 'tel') {
            if ($(field).val() !== '') {


                var $checkPhone = $(field).val().match($validPhone);

                if ($checkPhone === null) {
                    noErrors = false;
                    markInvalid($(this), DBSTRING['valid_phone_number']);
                } else {
                    markValid($(field));
                }
            }
            else {
                markValid($(field));
            }

        }


        else if (field.type === 'text') {

            if (isValid($(field).val())  ) {
                noErrors = false;
                markInvalid($(field), DBSTRING["SymbolcantUsed"]);
            }
            else {
                markValid($(field));
            }

            //if ($(field).val() === '' ) {
            //    markInvalid($(field), $(field).closest($inputWrapper).siblings($helperClass).attr('data-error'));
            //} else {
            //    helperUp($(field));
            //}
        }
    });

    return noErrors;
}

function isValid(str) {
    var reg = /['"\\]/g;
    return reg.test(str);
}