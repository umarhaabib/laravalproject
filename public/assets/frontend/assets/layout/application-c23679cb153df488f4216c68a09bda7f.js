// console.debug('application manifest loaded...');

$(document).ready(function () {
    Estatguru.init();
    initLoadingSpinnerEvents();
    scheduleUserStateCheck();
    setReadOnlyAttributes();
});


function initLoadingSpinnerEvents() {
    let t;

    $(document)
        .ajaxStart(function () {
            t = setTimeout(function () {
                $('#cover-spin').show();
            }, 500);
        })

        .ajaxStop(function () {
            clearTimeout(t);
            $('#cover-spin').hide();
        });
}

function scheduleUserStateCheck() {
    let isIgnorePage = $('#ignoreHeartBeat');

    if (isIgnorePage && isIgnorePage.val()) {
        return;
    }

    let interval = $('#heartBeatInterval').val();
    console.log('interval is: ' + interval);

    if (!interval || interval === undefined) {
        //assign by default 5 min if no config is specified
        interval = 300;
    }
    const endpoint = $('#heartBeatEndpoint').val();
    const authEndpoint = $('#authEndpoint').val();

    if (!endpoint || endpoint === undefined) {
        console.error('heartBeat endpoint is not defined, further execution is halted!');
        return
    }

    let timeout;

    $.ajax({
        url: endpoint,
        success: function () {
            timeout = setTimeout(scheduleUserStateCheck, interval * 1000);
        },

        error: function () {
            clearTimeout(timeout);
            let isIgnorePage = $('#ignoreHeartBeat');
            if (isIgnorePage && isIgnorePage.val()) {
                // do nothing..
            } else {
                window.location.replace(authEndpoint + '?heartBeatTriggered=true');
            }
        }
    });
}

function clearValidations() {
    $(".clear").css('display', 'none');
}

function removeValidations() {
    setTimeout(function() {
        $("#txtUninvestedAmount").focus().select();
    }, 500);

    $(".invalid").remove();
    $(".state-error").removeClass("state-error");
}

function removeBackDrop() {
    $('.modal').modal('hide');
    $('.modal-backdrop').remove();
    $('body').attr("style", "overflow:auto")
}

function removeBackDropByCheckBox() {
    if (!$('#isCreateAnotherPayment').prop('checked')) {
        $('.modal').modal('hide');
        $('.modal-backdrop').remove();
        $('body').attr("style", "overflow:auto")
    }

}
function hideSuccessAndErrorInNewPaymentModal() {
    $("#errorDiv").addClass("hide-div");
    $("#successDiv").addClass("hide-div");
}
function showSuccessInNewPaymentModal(successText) {
    $("#successDiv").removeClass("hide-div");
    $("#successContent").html(successText)
}
function showErrorInNewPaymentModal(errorText) {
    $("#errorDiv").removeClass("hide-div");
    $("#errorContent").html(errorText);
    $('html, body').animate({scrollTop: $(".modal-body").offset().top
    }, 500);
    $('#newPaymentModalBody').scrollTop(0);
}
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();


function goBack() {
    window.history.back();
}

function clearAllFilters() {
    window.location.href = window.location.href;
}

function ajaxLoadLoanNameAutoComplete(url, filterMethodName, filteredLoanId, updateUrl) {
    jQuery.ajax({
        url: url, // remote datasource
        data: '',
        success: function (data) {
            $("#loanAutocompleteField").autocomplete({
                source: data,
                minLength: 2, // triggered only after minimum 2 characters have been entered.
                select: function (event, ui) { // event handler when user selects a company from the list.
                    $("#" + filteredLoanId).val(ui.item.id); // update the hidden field.
                    $("#loanAutocompleteField").val(ui.item.value); // update the hidden field.
                    ajaxupdateLoanNameAutoCompletevalues(updateUrl, ui.item.id, ui.item.value);
                    window[filterMethodName](ui.item.id, ui.item.value);
                }
            }).keyup(function () {
                if ($("#loanAutocompleteField").val() === '') {
                    $("#" + filteredLoanId).val('');
                    ajaxupdateLoanNameAutoCompletevalues(updateUrl, '', '');
                    window[filterMethodName]('', '');
                }
            });
        },
        error: function () { // handle server errors
        }
    });
}

function ajaxupdateLoanNameAutoCompletevalues(url, valueId, controlId) {
    jQuery.ajax({
        url: url, // remote datasource
        data: {valueId: valueId, controlId: controlId},
        success: function (data) {

        },
        error: function () { // handle server errors
        }
    });

}

function resetLoanNameAutoCompletevalues(url, controlId) {
    $("#" + controlId).val("");
    $("#select2-" + controlId + "-container").html("Show All");

    $("#loanAutocompleteField").val("");
    ajaxupdateLoanNameAutoCompletevalues(url, '', controlId)
}


function updateJquerydatepicker() {
    $('.jquerydatepicker').each(function () {
        var value = $(this).val();
        $(this).datepicker();
        $(this).datepicker({
            format: 'dd.mm.yyyy',
            //minDate: today,
            showOtherMonths: true,
            calendarWeeks: true,
            header: true,
            footer: true,
            width: 185,
            size: "small"
        });
        $(this).val(value)
    });
}


function showHideCityDDl(obj) {

    if (obj.value == 1) {
        $(".city-text").attr('disabled', 'disabled').addClass('hide-city-ddl');
        $(".city-ddl").removeClass('hide-city-ddl');
        $("#divCadasterNumber").removeClass('hide-city-ddl');
        visibleOtherSettlement(document.getElementById("city"))
    } else {
        $(".city-ddl").addClass('hide-city-ddl');
        $("#divCadasterNumber").addClass('hide-city-ddl');
        $("#cadastreNumber").val('-');
        $("#cadastreNumber2").val('-');
        $(".city-text").removeClass('hide-city-ddl').removeAttr('disabled');
        $("#divOtherSettlement").css("display", "none");
        $("#city").val('');

        $("#divOtherSettlement input").attr('disabled', 'disabled')
    }
}

function visibleOtherSettlement(obj) {

    if (obj.selectedIndex == 0) {
        $("#divOtherSettlement").css("display", "block");
        $("#divOtherSettlement input").removeAttr('disabled')
    }
    else {
        $("#divOtherSettlement").css("display", "none");
        $("#divOtherSettlement input").attr('disabled', 'disabled')

    }
}


function onCountryDDLChange(obj) {
    showHideCityDDl(obj);
    $("#otherSettlement").val('');
    $("#divOtherSettlement input").val('');

}

function isNumber(o) {
    return !isNaN(o - 0);
}

String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var str, i = -1, _token;
    if ((str = this.toString()) && typeof token === "string") {
        _token = ignoreCase === true ? token.toLowerCase() : undefined;
        while ((i = (
            _token !== undefined ?
                str.toLowerCase().indexOf(
                    _token,
                    i >= 0 ? i + newToken.length : 0
                ) : str.indexOf(
                token,
                i >= 0 ? i + newToken.length : 0
                )
        )) !== -1) {
            str = str.substring(0, i)
                .concat(newToken)
                .concat(str.substring(i + token.length));
        }
    }
    return str;
};

Number.prototype.formatNumber = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

function formatDate(d) {

    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return curr_date + "/" + curr_month + "/" + curr_year;
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};


function openCloseSiteBar() {
    if (getCookie("sidebarClosed") === 'true') {
        $(".main-content-wrapper").addClass("sidebar-closed");
    }
}

function scrollTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 1);
}

function closePopup(id) {
    closeModalPopup(id)
}

function openPopup(id) {
    scrollTop();
   openModalPopup(id)
}

function showPassword() {
    $('input[type=password]').attr('type', 'text').attr('tabIndex', '1');

}
function addonClickForShowPassword() {
    $(".show-pass-icon").addClass('not-href').removeAttr('href').click(function () {
        showPassword();
    });
}

function initPassword(objId) {
    var x = document.getElementById(objId);
    if (x) {
        var style = window.getComputedStyle(x);
        console.log(style);

        if (style.webkitTextSecurity) {
            // Do nothing
        } else {
            x.setAttribute("type", "password");
        }
    }

}

function resetFilterControlsInForm(formId, resetFilterURL) {
    document.getElementById(formId).reset();
    if (resetFilterURL) {
        $(".filter-control-text").val("");
        $(".select2").val("");
        $(".filter-control-radio").prop('selected', false).removeAttr('checked');
        $(".select2-selection__rendered").html('');

        jQuery.ajax({
            url: resetFilterURL,
            success: function (data) {

            },
            error: function () { // handle server errors
            }
        });
    }
    return false;
}

function resetSMFilterControlsInForm(formId, resetFilterURL) {

    if (resetFilterURL) {
        jQuery.ajax({
            url: resetFilterURL,
            success: function (data) {
                $("#" +formId).html(data);
                Estatguru.initAjax();

            },
            error: function () { // handle server errors
            }
        });
    }
    return false
}

function addCountryCode() {

    var phoneNumber = $("#phoneNumber").val();

    if (phoneNumber !== "") {

        if (phoneNumber.indexOf("+") === -1 && phoneNumber.indexOf("+372") === -1 && phoneNumber.indexOf("372") === -1) {
            $("#phoneNumber").val("+372" + phoneNumber);
        } else if (phoneNumber.indexOf("+") === -1) {
            $("#phoneNumber").val("+" + phoneNumber);
        } else if (phoneNumber.indexOf("372") === -1) {
            $("#phoneNumber").val("+372" + phoneNumber);
        }
    }
}

function disableSubmissionButton(buttonId, formId) {
    var form = $('#' + formId);
    if (form && !form.valid()) {
        return;
    }
    console.log('disabling submit button: ' + buttonId);
    var submitButton = $('#' + buttonId);
    if (submitButton && submitButton !== undefined) {

        submitButton.prop("disabled", true).click(function () {
            console.log('disabling button: ' + buttonId);
            // do nothing
        })
    }

    return true;
}
function setSortedBackGroundColor(objId, tableId) {
    if (objId) {
        var parentTh = $("#" + objId).parent();
        if (parentTh) {
            // (".selCol").removeClass('selCol');
            parentTh.addClass('selCol');
            var colIndex = parentTh.index();
            // if (tableId) {
                $('table.' + tableId + ' tbody tr').each(function() {
                    $(this).find('td').each(function(i) {
                        if (i === colIndex) {
                            $(this).addClass('selCol');
                        } else {
                            $(this).removeClass('selCol');
                        }
                    });

                });


        }
    }
}
function setRemoteSortableColumnBackGroundColor(objId) {
    objId = objId.replace(".","");
    if (objId) {
        var parentTh = $("#" + objId);
        if (parentTh.parent()[0]) {
            var tableClassName  = parentTh.parent()[0].parentNode.parentNode.className;
            tableClassName = tableClassName.replace(/  /g, " ").replace(/ /g, ".");
            if (parentTh) {
                parentTh.addClass('selCol');
                var colIndex = parentTh.index();
                $('table.' + tableClassName +' tbody tr').each(function() {
                    $(this).find('td').each(function(i) {
                        if (i === colIndex) {
                            $(this).addClass('selCol');
                        } else {
                            $(this).removeClass('selCol');
                        }
                    });

                });
            }
        }


        $(".sortable.sorted.asc").attr("order","asc");
        $(".sortable.sorted.desc").attr("order","desc");
    }
    $(".sortable").addClass("sortable-header");
}

var interestRateDetails = (function() {
    var tableDescription = function () {
        $(".td-collapse span").on("click", function (e) {
            e.preventDefault();
            if ($(".tr-description").hasClass("open")) {
                $(".tr-description").removeClass("open");
                $(".td-collapse").removeClass("open");
                $(this)
                    .parents("tr")
                    .removeClass("tr-collapse");
            } else {
                $(".tr-description").addClass("open");
                $(".td-collapse").addClass("open");
                $(this)
                    .parents("tr")
                    .addClass("tr-collapse");
            }
        });
    };
    return {
        init: function () {
            tableDescription();
        }
    }
})();
function resetValues(className) {
    $("." + className).val("")
}

function activeProjectTabAndScrollDown (tabId) {
    $('html, body').animate({
        scrollTop: $("#divNavbarProjects").offset().top - 150
    }, 200);
    $('.filter-control-radio[type="checkbox"]:checked').trigger('click');
    if (tabId !== '') {
        $("#" + tabId).trigger('click');
    }

    $("#btnFilterByStatusLoan").trigger('click');
}



function scrollToDivById (divId) {
    $('html, body').animate({
        scrollTop: $("#" + divId ).offset().top - 150
    }, 200);

}

function changeGroupTypeContent(url, controlIndex, scopeSecurityInstanceId, selectedValue) {

    if (url && selectedValue) {
        var groupTypeValue = 'land';

        jQuery.ajax({
            url: url,
            type: "POST",
            data: {controlIndex:controlIndex, scopeSecurityInstanceId:scopeSecurityInstanceId, selectedValue:selectedValue},
            success: function (data) {
                if (data !== "NONE") {
                    $('#divLoanTemplateGroupType' + controlIndex).html(data);
                    Estatguru.initComponents();
                }
            }
        });
    }


}

function changeForOtherSelection (){

}
function checkCadastreNumber(index) {
    var href = "http://www.maaamet.ee/ky/FindKYbyT.asp?txtCU=" + $("#cadastreNumber" + index).val();
    document.getElementById("lnkCheckNumber" + index).href = href;

    if (document.getElementById("lnkLandRegister" + index)) {
        var hrefLand = "https://kinnistusraamat.rik.ee/detailparing/Avaleht.aspx?RecreateQuery=Jah&kt=" + $("#cadastreNumber" +index).val();
        document.getElementById("lnkLandRegister" +index).href = hrefLand;
    }

}
function openInNewTabWinBrowser(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function setReadOnlyAttributes () {
    $(".make-read-only").attr('readonly', 'readonly');
}
function showLoginPouup() {
    $("#divErrorMessage").html("");
    $(".log-popup-wrapper").slideDown();
    // $(".log-backdrop").slideToggle();
    if ($(".log-backdrop").is(":visible")) {
        setTimeout(function() {
            $(".log-backdrop").hide();
        }, 500);
    } else {
        $(".log-backdrop").show();
    }

}
function closeLoginPopup() {
    $(".log-popup-wrapper").slideUp();
    // $(".log-backdrop").slideUp();
    setTimeout(function() {
        $(".log-backdrop").hide();
    }, 500);

}
function refreshPage() {
    window.location.href = window.location.href;

}
function openModalPopup(id) {
    setTimeout(function () {
        Estatguru.openPopup(id);
    }, 100);
    setTimeout(function () {
    $("#" + id + " :input[type='password']").focus().keypress(function (e) {
        var key = e.which;
        if(key === 13)  // the enter key code
        {
            $('.submit-button').click();
            return false;
        }
    });
    $("#" + id + " :input[type='text']").focus().keypress(function (e) {
        var key = e.which;
        if(key === 13)  // the enter key code
        {
            $('.submit-button').click();
            return false;
        }
    });
    }, 300);
}
function closeModalPopup(id) {
    Estatguru.closePopup(id)
}
function checkUncheckDetailedStatement () {
    $("#hdnDetailedStatement").val($("#checkDetailedStatement").prop( "checked" ));
}
function showHideDivByRadioSelection(divId, selected) {
    $("#" + divId).removeClass('show-div');
    $("#" + divId + " :input").attr("disabled", 'disabled');
    if (selected) {
        $("#" + divId).addClass('show-div');
        $("#" + divId + " :input").removeAttr("disabled");

    }

}

function  showGeneralModal(id) {
    openModalPopup(id)
}
function cancelGeneralModal(id) {
    closeModalPopup(id)
}

function fillAllAmounts(currentValue) {

    $('.deposit-amount').keyup(function () {

        $('.deposit-amount').each(function () {
            $(this).val(currentValue);
            $(this).parent().addClass("is-filled");
        });


    });
}

function changeHdnFilterProjectValue(value) {
    $("#hdnFilterProjectValue").val(value)

}

function openConfirmPopup(id) {
    openModalPopup(id);
    return false;

}
function cancelConfirmPopup(id) {
    $("#responseInvestModalDiv").html("");
    closeModalPopup(id);
}

function getParametersByClassName(className) {
    var paramsValues = {};

    $('.' + className).each(function (i, obj) {
        paramsValues[obj.id] = obj.value
    });

    return paramsValues;
}

function closeAllFilterPopup() {
    $('.open').removeClass('open');
    return false;

}
function changeFixedColumn() {
    $('#divDataTableLoans div.table-shadow-helper.right').css('width',$('#fixed_loan_column').outerWidth());
    $('#divSecondaryMarketAjax div.table-shadow-helper.right').css('width',$('#fixed-SM-column').outerWidth());

    $('#divDataTableLoans div.table-shadow-helper.left').css('width',$('#fixed_loan_column_left').outerWidth() + $('#fixed_loan_column_left1').outerWidth());
    $('#divSecondaryMarketAjax div.table-shadow-helper.left').css('width',$('#fixed-SM-column_left').outerWidth() + $('#fixed-SM-column_left1').outerWidth() )
}
function countDecimals(value) {
    if (!isNumber(value)) {
        return 0;
    }
    if (parseInt(value) === value) return 0;
    if (value.toString().split(".")[1] !== undefined) {
        return value.toString().split(".")[1].length || 0;
    }
    return 0;
}

function makeAsRadioButton(className) {
    $("." + className +":checked").trigger("click");
}

function numberOnly(objectId) {
    $("#" + objectId) .keydown(function(e)
    {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal
        return (
            key === 8 ||
            key === 9 ||
            key === 13 ||
            key === 46 ||
            key === 110 ||
            key === 190 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
    });

}

function changeSMSliderTypeForFF() {
    if(typeof InstallTrigger !== 'undefined') {
        numberOnly('investmentInputStart');
        numberOnly('investmentInputEnd');

        numberOnly('periodInputStart');
        numberOnly('periodInputEnd');

        numberOnly('expectedInputStart');
        numberOnly('expectedInputEnd');

        $('#investmentInputStart').attr('type', 'text');
        $('#investmentInputEnd').attr('type', 'text');

        $('#periodInputStart').attr('type', 'text');
        $('#periodInputEnd').attr('type', 'text');

        $('#expectedInputStart').attr('type', 'text');
        $('#expectedInputEnd').attr('type', 'text');

    }

}

function replaceFooterLink(eguCode) {

    if (eguCode === '') {
        $("#divRef").text('').css('display','none');

    } else {
        $("#spanUserPromotionCode").text(eguCode);
        $( "div.dropdown.footer-lang-dropdown a.dropdown-item" ).each(function( index ) {
            var currentUrl = window.location.href;
            currentUrl = currentUrl.split("?lang=")[0];
            var href = $(this).attr("href");
            var language = href.split("=")[1];
            if (language === 'et') {
                language = 'ee'
            }
            href = currentUrl + "?lang=" + language;
            $(this).attr("href",  href)
        });
    }

}

