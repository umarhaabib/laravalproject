        @extends('frontend/layouts/nav')


@section('content')




<script>
    

    Estatguru.initTriggerAdminNavPopup();
</script>

    <script type="application/javascript">
    var thousandSign = '';
    var decimalSign = '.';
    var thousandSignInvest = ',';
    var decimalSignInvest = '.';
    if (thousandSignInvest === "space") {
        thousandSignInvest = " "
    }

    function getOriginalNumber(value) {
        if (value) {
            var realNumber = value.toString();
            if (thousandSign) {
                return realNumber.replaceAll(thousandSign, '').replaceAll(decimalSign, '.');
            } else {
                return realNumber.replaceAll(decimalSign, '.');
            }
        }
    }
    function getOriginalNumberInvest(value) {
        if (value) {

            var realNumber = value.toString();
            if (thousandSignInvest) {
                realNumber =  realNumber.replaceAll(thousandSignInvest, '').replaceAll(decimalSignInvest, '.');
            } else {
                realNumber = realNumber.replaceAll(decimalSignInvest, '.');
            }
            if (isNumber(realNumber)) {
                return realNumber
            }
            return 0
        }
    }

    function formatInputNumber(value, id, decimalCount) {
        if (value) {
            var realNumber = getOriginalNumber(value);
            if (!isNumber(realNumber)) {
                $('#' + id).val("").addClass('state-error')
            } else {
                $('#' + id).val(parseFloat(realNumber).formatNumber(decimalCount, thousandSign, decimalSign)).removeClass('state-error')
            }
        }
    }
    function formatInputNumberInvest(value, id, decimalCount) {

        if (value) {
            var realNumber = getOriginalNumberInvest(value);
            if (!isNumber(realNumber)) {
                $('#' + id).val("").addClass('state-error').attr("type","number")
            } else {
                $('#' + id).attr("type","text").val(parseFloat(realNumber).formatNumber(decimalCount, thousandSignInvest, decimalSignInvest)).removeClass('state-error')
            }
        } else {
            $('#' + id).attr("type","number")
        }
    }

    function formatInputNumberLoading(realNumber, id, decimalCount) {
        if (realNumber) {

            if (!isNumber(realNumber)) {
                $('#' + id).val("").addClass('state-error')
            } else {
                $('#' + id).val(parseFloat(realNumber).formatNumber(decimalCount, thousandSign, decimalSign)).removeClass('state-error')
            }
        }
    }
    function formatInputNumberLoadingInvest(realNumber, id, decimalCount) {
        if (realNumber) {
            var object = $("#" + id);
            var originalNumber = getOriginalNumber(realNumber);
            if (!isNumber(originalNumber)) {
                $('#' + id).val("").addClass('state-error')
            } else {
                $('#' + id).val(parseFloat(originalNumber).formatNumber(decimalCount, thousandSignInvest, decimalSignInvest)).removeClass('state-error')
            }


        }
    }
    function formatLabelNumberLoading(realNumber, id, decimalCount) {
        if (realNumber) {

            if (!isNumber(realNumber)) {
                $('#' + id).html("").addClass('state-error')
            } else {
                $('#' + id).html(parseFloat(realNumber).formatNumber(decimalCount, thousandSign, decimalSign)).removeClass('state-error')
            }
        }
    }
    window.onload = function () {

        formatNumbers();

        $(".numberValue").blur(function () {
            formatInputNumber(this.value, this.id, '0');
        });
        $(".numberValueInvest").blur(function () {
            formatInputNumberInvest(this.value, this.id, '0');
            copyOriginalNumberToHidden(this.id);
        }).change(function () {
            copyOriginalNumberToHidden(this.id)
        });
        $(".doubleValue").blur(function () {
            formatInputNumber(this.value, this.id, '2');
        });
        $(".doubleValue2").blur(function () {
            formatInputNumber(this.value, this.id, '2');
        });
    };

    function formatNumbers() {
        $(".numberValue").each(function () {
            if ($(this).val()) {
                formatInputNumberLoading($(this).val(), this.id, '0');
            }
        });

        $(".numberValueInvest").each(function () {
            var  value = $(this).val();
            if ($(this).val()) {
                formatInputNumberLoadingInvest(value, this.id, '0');
            }
            createCopyHiddenForInput($(this));
        });

        $(".doubleValue").each(function () {
            if ($(this).val()) {
                formatInputNumberLoading($(this).val(), this.id, '2');
            }
        });
        $(".doubleValue2").each(function () {
            if ($(this).val()) {
                formatInputNumberLoading($(this).val(), this.id, '2');
            }
        });

    }
    function copyOriginalNumberToHidden(hiddenId) {
        var value  = $("#" + hiddenId).val();
        $("#totalAmountSpan").html("€" + value);
        $("#" +hiddenId.replace("formated_","")).val(getOriginalNumberInvest(value));

    }

    function createCopyHiddenForInput(object) {
        var value = getOriginalNumberInvest(object.val());
        if (!value || value === undefined) {
            value = 0
        }
        object.parent().append("<input type=\"hidden\" id=\"" + object.attr('id') + "\" name=\"" + object.attr('name') + "\" value=\"" + value + "\" />");
        object.attr('id',"formated_" + object.attr('id'));
        object.attr('name',"formated_" + object.attr('name'));
    }
</script>

    

    


        

            

    



    <!-- Google Tag Manager -->
    <noscript><iframe src="http://www.googletagmanager.com/ns.html?id=GTM-59H29W"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script>(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            '../../../www.googletagmanager.com/gtm5445.html?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-59H29W');</script>
    <meta name="google-site-verification" content="giYz6Cyr-tVxCxUyv7UlbRb2MCRnCs2f5R47-ZTDJzk"/>
    <!-- End Google Tag Manager -->

        
    
    
    <meta name="layout" content="main"/>
    
    <script src="../../../www.google.com/recaptcha/api01dd.js?render=6Lfz0d8UAAAAADuFBqYLy9sR3XIqg5yjtB6vTdQm"></script>
    <script type="text/javascript" src="../assets/login/loginValidation-0e9e14b782d311225a627e69469b0333.js" ></script>

</head>

<body class="page page-notlogged page auth-page">


<input type="hidden" name="locale" value="en" disabled="disabled" id="locale" />
<input type="hidden" name="heartBeatInterval" value="300" id="heartBeatInterval" />
<input type="hidden" name="heartBeatEndpoint" value="/portal/heartBeat/checkPoint" id="heartBeatEndpoint" />
<input type="hidden" name="authEndpoint" value="https://estateguru.co/" id="authEndpoint" />


<section class="">
    <input type="hidden" name="ignoreHeartBeat" id="ignoreHeartBeat" value="true" />
    <div class="register-new-wrapper" style="background-image: url('{{URL::to('')}}/public/assets/frontend/assets/layout/content/reg-new-bg-6d3c3d47e2425e64c6c337972deeafa0.jpg')" >
        <div class="container">
            <div class="row register-new-row">
                <div class="col-sm-12 col-md-6 col-lg-7">
                    <div class="register-desc">
    
                        <h1>Register </h1>
                        <h2> </h2>
                        <p>You’re a few simple steps away from joining over 53,000 happy, successful investors. Congratulations on making this wise decision and taking charge of your financial destiny. </p>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-5">
                    

<div class="register-form-wrapper">
    

    <ul class="nav nav-tabs onboarding-tab" role="tablist">

        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#registerForm" role="tab"
               aria-controls="registerForm" aria-selected="true"
               onclick="updateTabIndex('INVESTOR');">
                Investor
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link " data-toggle="tab" href="#registerForm" aria-controls="registerForm" role="tab"
               aria-selected="" onclick="updateTabIndex('BORROWER');">
                Borrower
            </a>
        </li>
    </ul>


    <div class="tab-content">
        <div class="tab-pane fade show active" id="registerForm" role="tabpanel" aria-labelledby="registerForm">

           <form action="{{URL::to('')}}/tetenter/save" method="post" class="onboarding-form" name="registrationForm" id="registrationForm" >
                
                <div class="form-group">
                    <input type="text" name="name" class="form-control main-input" required />
                    <label class="bmd-label-floating main-label">
                        Name
                    </label>
                </div>
                <div class="form-group">
                    <input type="text" name="email" class="form-control main-input" required />
                    <label class="bmd-label-floating main-label">
                        E-mail
                    </label>
                </div>

                <div class="form-group">
                    <input type="password" name="password" class="form-control main-input" required/>
                    <label class="bmd-label-floating main-label">
                        Password (minimum 8 characters)
                    </label>
                    <a onclick="togglePassword();" class="show-pass-icon"><i class="zmdi zmdi-eye"></i></a>
                </div>

                <div class="form-group text-center pt-2 mb-4">
                    <p class="mb-2">
                        By clicking Register you accept EstateGuru's 
                    </p>

                    <div class="">
                        <a href = "{{URL::to('')}}/tetenter/user_terms" class = color-green target = _blank>Tetenter User Terms</a> and <a href = "{{URL::to('')}}/tetenter/privacy_policy" class = color-green target = _blank>Tetenter Privacy Rules </a> 
                    </div>
                </div>

                <div class="form-group text-center mt-4 mb-3">
                    <input type="submit" name="register" onclick="return checkIfUserIsBot();" value="REGISTER" class="btn btn-regular" autocomplete="off" id="register" />
                    <div class="message-box warning-message-box alert alert-dismissible mt-3" hidden="hidden" id="divRecaptchaBotDetected">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="position: relative">
                            <span aria-hidden="true">×</span>
                        </button>

                        <div class="message-box-top">
                            <img src="../assets/layout/content/icon/warning-b67b55afcf2d39df383f37456424b410.png" alt=""/>
                            <h3 style="padding-top: 0">Oops.</h3>
                        </div>

                        <p>
                            If you're sure you're human, please contact info@tetenter.co, and our support team will help you to get back into your account.
                        </p>
                    </div>
                </div>
                <p class="text-center text-muted mb-3">
                   I’m already a user, <a class="nav-link nav-login-link btn-login-popup" href="#">Log In</a>
                </p>
                <!-- <p class="text-center text-muted mb-4">
                    Or register using:
                </p> -->
                
<!-- <ul class="onboarding-social ">
    <li>
        <a href="#" onclick="connectFacebook();">
            <img src="{{URL::to('')}}/public/assets/frontend/assets/layout/content/icon/facebook-092fd33cfcdaba140dc0ce414eee000b.png" alt=""/>
        </a>
    </li>

    
        <li>
            <a href="#"><img src="{{URL::to('')}}/public/assets/frontend/assets/layout/content/icon/google-be5bf84eafea75ac93b860740b9dee7c.png" alt="" id="googleSignIn" data-onsuccess="onGoogleSignIn"/>
                <script src="apis.google.com/js/platformfbd5.js?onload=onLoadGoogleRegistrationCallback" async defer></script>
            </a>
        </li>
    
</ul> -->
            </form>

        </div>

    </div>
</div>

<script type="text/javascript">
    function updateTabIndex(userType) {
        $('#userType').val(userType);
        $("#divValidationError").remove();
    }
    function connectFacebook() {

        var userType = $('#userType').val();
        window.location.href = '/portal/signIn/connectFacebook' + "?userType=" + userType;
    }

    function togglePassword() {
        if($("#regPassword").attr('type') == 'password') {
            $("#regPassword").attr('type','text');
        } else {
            $("#regPassword").attr('type','password');
        }

    }
</script>
                </div>
            </div>
        </div>
    </div>
</section>
<script>
    $(".page").addClass('auth-page')
    // login.init();
</script>
<script>
    function checkIfUserIsBot() {
        
        grecaptcha.ready(function() {
            grecaptcha.execute('6Lfz0d8UAAAAADuFBqYLy9sR3XIqg5yjtB6vTdQm', {action: 'signup'}).then(function(token) {
                jQuery.ajax({
                    url: "/portal/recaptcha/sendRequest",
                    data: {token: token},
                    method: 'POST',
                    success: function (response) {
                        console.log("Recaptcha result:"+response);
                        $("#registrationForm").submit();
                    },
                    error: function (response) {
                        $("#divRecaptchaBotDetected").removeAttr('hidden');
                    }
                })
            });
        });
        return false;
        
    }
</script>


@stop
