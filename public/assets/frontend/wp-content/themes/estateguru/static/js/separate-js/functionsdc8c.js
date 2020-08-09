function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function copyText(objectUrl) {
    / Get the text field /

    var copyText = document.getElementById(objectUrl);

    / Select the text field /
    copyText.select();

    / Copy the text inside the text field /
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}

function copyHiddenText(text) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input)
    return result;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function showHideCookiesPopup() {
    if (getCookie("cookies_popup") !== 'true') {
        jQuery("#divCookiesPopup").removeAttr('style');
    }
}
function hideCookiesPopup() {
    jQuery("#divCookiesPopup").css("display", "none");
}

function setCookiesAndHidePopup() {
    setCookie('cookies_popup', true,1000);
    jQuery("#divCookiesPopup").css("display", "none");
}