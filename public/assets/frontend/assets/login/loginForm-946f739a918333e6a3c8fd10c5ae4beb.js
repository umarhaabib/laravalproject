
function initAjaxCall(url, isNotLogin) {
    jQuery.ajax({
        url: url,
        data :{isNotLogin:isNotLogin},
        type: "POST",
        success: function (data) {
            $('#divPopupForm').html(data);
            Estatguru.initAjax()


        }
    });
}
function refreshLoginPage() {
    window.location.href = window.location.href.replace("?logIn=true","").replace("?login=true","");
}

