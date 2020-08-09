
<!doctype html>
<html lang="en" class="no-js">

<!-- Mirrored from estateguru.co/portal/investment/show/DE6620-7?login=true&id=DE6620-7&lang=en by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 23 Jul 2020 08:02:55 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
    <title>Tetenter</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <meta content="" name="description">
    <meta content="" name="keywords">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta content="telephone=no" name="format-detection">
    <!-- This make sence for mobile browsers. It means, that content has been optimized for mobile browsers -->
    <meta name="HandheldFriendly" content="true">

    <!--Include css -->
    
<!--[if IE 8 ]><link rel="stylesheet" href="/portal/assets/css/main_ie8.min-e42bc5e3d9fb830d8cd6e63cced796a8.css"/><![endif]-->
    <!--[if IE 9 ]><link rel="stylesheet" href="/portal/assets/css/main_ie9.min-5543c584697182ed463d65d42dfc48aa.css"/><![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!-->
<link rel="stylesheet" href="{{URL::to('')}}/public/assets/frontend/assets/css/main-150601cd852a549c5c3a3ae7bbd821b0.css"/>
<link rel="stylesheet" href="{{URL::to('')}}/public/assets/frontend/assets/application-2f53bda22f9e8e521967afdd3d284bb5.css"/>
<!--<![endif]-->

    <link rel="apple-touch-icon" sizes="180x180" type="layout/favicon/apple-touch-icon.png" href="{{URL::to('')}}/public/assets/frontendsets/layout/favicon/apple-touch-icon-2e0d51cfdadf57fd5b1fc2cef0e9ee74.png"/>
    <link rel="icon" sizes="32x32" type="image/png" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/favicon-32x32-dc4e442efbef9ca5ec036fef36d74679.png"/>
    <link rel="icon" sizes="16x16" type="image/png" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/favicon-16x16-7af91eb9c1372b4ee5223b0a541fad66.png"/>


    <link rel="manifest" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/site-fc92a97c54827cb2264971644266106a.html"/>
    <link rel="mask-icon" color="#5bbad5" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/safari-pinned-tab-06ed1585ecb3b2a3dbc1d20e4918355f.svg"/>

    <meta name="apple-mobile-web-app-title" content="Tetenter">
    <meta name="application-name" content="Tetenter">
    <meta name="msapplication-TileColor" content="#071423">
    <meta name="theme-color" content="#031327">

    
        <meta name="google-signin-client_id" content="191150156239-q5jip48u5gub9n4hv3tnj386vt6bf3rc.apps.googleusercontent.com">

        <script src="apis.google.com/js/platform.js" async defer></script>
    

    <script>
        (function (H) {
            H.className = H.className.replace(/\bno-js\b/, 'js')
        })(document.documentElement);


        function onLoadGoogleCallback() {

            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    client_id: "191150156239-q5jip48u5gub9n4hv3tnj386vt6bf3rc.apps.googleusercontent.com",
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile'
                });

                auth2.attachClickHandler(element, {},
                    function (googleUser) {
                        let form = $('#loginForm');
                        let profile = googleUser.getBasicProfile();
                        let userEmail = profile.getEmail();

                        if (userEmail) {
                            console.log('userEmail is: ' + userEmail);
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'googleEmail',
                                name: 'googleEmail',
                                value: userEmail
                            }).appendTo(form);


                            $('#username').rules('remove', 'required');
                            $('#password').rules('remove', 'required');
                            form.attr('action', "/portal/login/loginByEmail");
                            form.submit();
                        }
                    }, function (error) {
                        console.log('Sign-in error', error);
                    }
                );
            });

            element = document.getElementById('googleSignIn');
        }

        function onLoadGoogleRegistrationCallback() {
            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    client_id: "191150156239-q5jip48u5gub9n4hv3tnj386vt6bf3rc.apps.googleusercontent.com",
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile'
                });

                auth2.attachClickHandler(element, {},
                    function (googleUser) {
                        let form = $('#registrationForm');
                        let profile = googleUser.getBasicProfile();

                        addGoogleElementToForm('userId', profile.getId(), form);
                        addGoogleElementToForm('userFullName', profile.getName(), form);
                        addGoogleElementToForm('userGivenName', profile.getGivenName(), form);
                        addGoogleElementToForm('userFamilyName', profile.getFamilyName(), form);
                        addGoogleElementToForm('userEmail', profile.getEmail(), form);
                        addGoogleElementToForm('userImageUrl', profile.getImageUrl(), form);
                        $('#regEmail').rules('remove', 'required');
                        $('#regPassword').rules('remove', 'required');
                        form.attr('action', "/portal/registration/registerByGoogle");
                        form.submit();
                    }, function (error) {
                        console.log('registration error', error);
                    }
                );
            });

            element = document.getElementById('googleSignIn');
        }

        function addGoogleElementToForm(elementId, elementValue, formElement) {
            if (elementValue) {
                $('<input>').attr({
                    type: 'hidden',
                    id: '' + elementId,
                    name: '' + elementId,
                    value: elementValue
                }).appendTo(formElement);
            }
        }
    </script>
    <!--[if lt IE 9 ]><script type="text/javascript" src="/portal/assets/layout/html5shiv-3.7.2.min-2536f8ce6b48e154746d17e7c5c46694.js" ></script><meta content="no" http-equiv="imagetoolbar"><![endif]-->
    




    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/jquery-6e3b82f58f57b0f2ac1320f71a1eebc1.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/popper.min-5b4235e0ea04971937f5927a42b58ed3.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/bootstrap-material-design-f4a647ca8a81a7655e7e0525e6a99174.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/highcharts-fc5707f5431083a2304cd78550b47d99.js" ></script>
    
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/plugins/select2-afd4c56153f1bc10c205cbbc55b0c132.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/plugins/jquery.dataTables-3b26741112153e36172f8b5b148ddb5b.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/plugins/jquery.validate-acde0199d64bc7d9812af7f09bd0ca0a.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/components/datatable-d86e7bcf6d4191931fa5fd4a0ba4925c.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/components/line-chart-dark-0f6467138a5c308836e54096671b812c.js" ></script>
    
        <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/components/datepicker-gijgo-bd51780a29cc73670c7fc3089aeabc9a.js" ></script>
    

    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/bootstrap-slider-05b3d2c39da0210d2c71441d9250dc54.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/main-4e0d24fb0b3141b4dc1efd6c48c778a6.js" ></script>


<script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/application-c23679cb153df488f4216c68a09bda7f.js" ></script>




    



    
        
<header>

    <nav class="navbar navbar-expand-lg bg-dark navbar-header">
        <div class="container">
            <a class="navbar-brand" href="{{URL::to('')}}/tetenter">
                <img src="{{URL::to('')}}/public/assets/frontend/assets/layout/general/logo-efc03232af49a93566f694b33b3bb107.svg" width="127" class="d-inline-block align-top img-fluid"/>
            </a>

            <div class="nav-item dropdown language-dropdown main-language-dropdown">
                
<a class="nav-link dropdown-toggle " href="#" id="mobileLanguageDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="text-desc">EN</span>
</a><div class="dropdown-menu dropdown-menu-right" aria-labelledby="mobileLanguageDropdown2"><a class="dropdown-item " href="DE6620-7b5c3.html?login=true&amp;id=DE6620-7&amp;lang=ee">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ee-70060470228ead2fb88a220e390e9558.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        EE
    </span>
</a><a class="dropdown-item " href="DE6620-78d1e.html?login=true&amp;id=DE6620-7&amp;lang=en">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/en-84696f8ba45a9deed582262815fab22f.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        EN
    </span>
</a><a class="dropdown-item " href="DE6620-7a394.html?login=true&amp;id=DE6620-7&amp;lang=lv">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lv-4725326d6abcc7d9950541cbd8f3cdb2.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        LV
    </span>
</a><a class="dropdown-item " href="DE6620-7089c.html?login=true&amp;id=DE6620-7&amp;lang=lt">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lt-89aff32d0cfd2c23000f3300fe629dab.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        LT
    </span>
</a><a class="dropdown-item " href="DE6620-74f76.html?login=true&amp;id=DE6620-7&amp;lang=de">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/de-19e170b563605af0e2d06672587eb8b5.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        DE
    </span>
</a><a class="dropdown-item " href="DE6620-7733d.html?login=true&amp;id=DE6620-7&amp;lang=ru">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ru-31de0f892b5931fb93c5304b88e24013.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        RU
    </span>
</a></div>

            </div>

            <button class="navbar-toggler collapsed main-navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="zmdi zmdi-menu show-menu"></span>
                <span class="zmdi zmdi-close hide-menu"></span>
            </button>

            <div class="collapse navbar-collapse main-space" id="navbarNav">
                <ul class="navbar-nav mr-auto navbar-left">
                    <li class="nav-item ">
                        <a href = "{{URL::to('')}}/tetenter/invester" class="nav-link">
                            Invest
                        </a>
                    </li>

                    <li class="nav-itemactive ">
                        <a href = "{{URL::to('')}}/tetenter/funding" class="nav-link btn btn-mini-o take-loan-btn">
                            Take A Loan
                            <span class="sr-only"></span>
                        </a>
                    </li>
                </ul>
                




    <ul class="navbar-nav ml-auto navbar-right navbar-right-lr">
        <li class="divider-mobile"></li>
        <li class="nav-item">
            <a href="{{URL::to('')}}/tetenter/blog" target="_blank" class="nav-link">
                Blog
            </a>
        </li>
        <li class=" nav-item">
            <a href ="{{URL::to('')}}/tetenter/help" class="nav-link ">
                Help
            </a>
        </li>

        <li class="nav-item">
            <a href ="{{URL::to('')}}/tetenter/about" class="nav-link ">
                Info
            </a>
        </li>
        <li class="divider-mobile"></li>
        @guest
                                <li class="nav-item  ">
                                    <a class="nav-link nav-login-link btn-login-popup" href="{{URL::to('')}}/tetenter#">Log In</a>
                                </li>
                                <li class="nav-item  ">
                                    <a class="btn  btn-mini small btn-register"  href="{{Url::to('')}}/tetenter/signup">Register</a>
                                </li>
                                @else

                                 <li class="nav-item  ">>
                                        <a class="btn  btn-mini small btn-register" href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            @csrf
                                        </form>
                                    </li>
                                    @endguest

       <!--  <li class="nav-item dropdown ">
            
<a class="nav-link dropdown-toggle " href="#" id="mobileLanguageDropdown6" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="text-desc">EN</span>
</a><div class="dropdown-menu dropdown-menu-right" aria-labelledby="mobileLanguageDropdown6"><a class="dropdown-item " href="DE6620-7b5c3.html?login=true&amp;id=DE6620-7&amp;lang=ee">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ee-70060470228ead2fb88a220e390e9558.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        EE
    </span>
</a><a class="dropdown-item " href="DE6620-78d1e.html?login=true&amp;id=DE6620-7&amp;lang=en">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/en-84696f8ba45a9deed582262815fab22f.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        EN
    </span>
</a><a class="dropdown-item " href="DE6620-7a394.html?login=true&amp;id=DE6620-7&amp;lang=lv">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lv-4725326d6abcc7d9950541cbd8f3cdb2.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        LV
    </span>
</a><a class="dropdown-item " href="DE6620-7089c.html?login=true&amp;id=DE6620-7&amp;lang=lt">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lt-89aff32d0cfd2c23000f3300fe629dab.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        LT
    </span>
</a><a class="dropdown-item " href="DE6620-74f76.html?login=true&amp;id=DE6620-7&amp;lang=de">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/de-19e170b563605af0e2d06672587eb8b5.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        DE
    </span>
</a><a class="dropdown-item " href="DE6620-7733d.html?login=true&amp;id=DE6620-7&amp;lang=ru">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ru-31de0f892b5931fb93c5304b88e24013.png" alt="" width="20"/>
    </span>
    <span class="dropdown-item-name">
        RU
    </span>
</a></div>

        </li> -->

    </ul>

            </div>
        </div>
    </nav>
   <div id="divPopupForm" class="log-popup-wrapper login-dialogue">
    <div class="container">
        <div class="log-popup">
            
                <button type="button" class="btn-close-log-popup">
                    <i class="zmdi zmdi-close"></i>
                </button>
            

            
                <div class="popup-item left-item">
                    <h2 class="mb-2">Welcome to Tetenter</h2>

                    <p>
                        Your account and a world of exciting investments await.<br/> Just log in to get started.
                    </p>
                </div>
            

            <div class="popup-item right-item" id="divLoginForm">
                
<form class="onboarding-form"  action="{{URL::to('')}}/tetenter" method="post">
                                  
                                    <div class="row">
                                      {{csrf_field()}}
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control main-input" name="email">
                                                <label class="bmd-label-floating main-label">E-mail</label>
                                                <em id="username-error" class="error bmd-help help-block" style="display:none;">This field is required.</em>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="password" class="form-control main-input login-pass" name="password">
                                                <label class="bmd-label-floating main-label long-label">Password (minimum 8 characters)</label>
                                                <em id="password-error" class="error bmd-help help-block" style="display:none;">This field is required.</em>
                                                <a href="#" class="show-pass-icon"><i class="zmdi zmdi-eye"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row pb-md-3 mb-4">
                                        <div class="col-md-6">
                                            <div class="login-item-wrapper checkbox-item-wrapper">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="remember-me">Remember me                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="login-item-wrapper">
                                                <a href="portal/registration/forgotPassword.html">Forgot password?</a>
                                                <button class="btn btn-regular" type="submit">LOG IN</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="login-item-wrapper justify-content-center justify-content-md-end">
                                                <p class="text-muted mb-3 mb-md-0">Or log in with:</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <ul class="onboarding-social">
                                                <li>
                                                    <a href="https://graph.facebook.com/oauth/authorize?client_id=1266055633433978&amp;redirect_uri=https://estateguru.co/portal/signIn/facebookCallBack?cmd=add&amp;scope=public_profile,email">
                                                        <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/icon/facebook.png" alt="">
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/icon/google.png" alt="" id="googleSignIn" class="googleSignIn" data-onsuccess="onGoogleSignIn"/>
                                                        <script src="{{URL::to('')}}/public/assets/frontend/../apis.google.com/js/platformf3bd.js?onload=onLoadGoogleCallback" async defer></script>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="portal/investment/main6aa9.html?smartId=true">
                                                        <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/icon/s-id.png" alt="">
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="portal/investment/main12ac.html?mobileId=true">
                                                        <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/icon/m-id.png" alt="">
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </form>
<script>
    onLoadGoogleCallback()
</script>
            </div>
        </div>
    </div>


<div class="modal mobile-ID-popup" id="divModalMobileID" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true"></div>

<script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/login/loginForm-946f739a918333e6a3c8fd10c5ae4beb.js" ></script>
<script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/login/loginValidation-0e9e14b782d311225a627e69469b0333.js" ></script>

<script>
    function logInMobilId(googleUser) {
        if (googleUser && googleUser !== undefined) {
            onLoadGoogleCallback(googleUser);
            return;
        }

        $("#errorDiv").css({'display': "none"});
        $("#responceDiv").html('');
        var url = "/portal/login/ajaxSendMobileIdRequest";
        var loginUrl = "../../login/ajaxLogIn.html";
        var updateDivId = "responceDiv";
        var phoneNumber = $("#phoneNumber").val();
        ajaxLogInMobilId(url, loginUrl, updateDivId, phoneNumber);
    }


    function loginFormSubmit() {
        if ($("#loginForm").valid()) {
            var formData = $("#loginForm").serialize();
            jQuery.ajax({
                url: "/portal/login/authenticate",
                type: "POST",
                data:formData,
                success: function (data) {
                    refreshLoginPage();

                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    $('#divLoginForm').html(XMLHttpRequest.responseText);
                }
            });
        }

        return false

    }
</script></div>

</header>




    




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

    

    


        

            

    <script>
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'fireRemarketingTag',
            'google_tag_params': {
                'dynx_itemid': 'DE6620-7-EN',  // string that includes product ID + language sufix (example: “3604-lv” or “3604-ee”)
                'dynx_pagetype': 'offerdetail' // this value must be 'offerdetail'
            }
        });
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
            '../../../../www.googletagmanager.com/gtm5445.html?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-59H29W');</script>
    <meta name="google-site-verification" content="giYz6Cyr-tVxCxUyv7UlbRb2MCRnCs2f5R47-ZTDJzk"/>
    <!-- End Google Tag Manager -->

        
    
    
    <meta name="layout" content="main"/>
    

    <meta name="description" content="Start investing with peer to peer lending. Invest in secured property loans."/>
    


    <meta property="og:url" content="https://estateguru.co/portal/investment/show/DE6620-7?lang=en"/>
    <meta property="og:title" content="#6620 Bridge loan - 7.stage (Germany)"/>
    <meta property="og:description" content="Money earns nothing at your bank deposit? Investing in this project can earn you 13.5% interest! More details here!"/>
    <meta property="og:image" content="https://s3-eu-west-1.amazonaws.com/eg-prod-public/loan/DE6620-7/DE6620-7.jpg"/>
    <meta property="og:image:width" content="400"/>
    <meta property="og:image:height" content="300"/>
    <meta property="og:type" content="website"/>
    <meta property="fb:app_id" content="1266055633433978"/>

    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/plugins/slick.min-2bb92ee9e51c7a143003339ac70135d3.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/project/projectDetails-fee38c77309254cfc9cee8652487da56.js" ></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/investment/investment-47c006b80b6ba2fc6782737185f6c74d.js" ></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuk5PQIbIFiGqoU6DN6UiuDCk_4xpigC8&amp;sensor=false"></script>


</head>
<body class="page page-notlogged page page-projects page-projects-guest">





    

<section class="page-wrapper">
    <div class="page-content-wrapper">
        <div class="container">
            <div class="main-content-wrapper">
                <div class="project-guest-sidebar d-none d-md-block">
    <div class="project-guest-title-wrapper active">
        <a href="{{url::to('')}}/tetenter/primery_market">
            <span class="icon-wrapper">
                <i class="icon icon-loans-24"></i>
            </span>
            Primary Market
        </a>
    </div>
    <div class="section-faq trasparent-bg">
        <div class="card">
            
                
                
                    
                        
                            
                        
                        
                            
                                
                            
                        
                    
                
            
        </div>
        
            
            <a href="{{url::to('')}}/tetenter/signup" href="#" class="btn btn-regular">
                Start investing
            </a>
        
    </div>
</div>