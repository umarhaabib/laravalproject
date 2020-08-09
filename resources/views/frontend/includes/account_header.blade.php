
<head>
    <title>
        Account overview
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta content="" name="description">
    <meta content="" name="keywords">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta content="telephone=no" name="format-detection">
    <!-- This make sence for mobile browsers. It means, that content has been optimized for mobile browsers -->
    <meta name="HandheldFriendly" content="true">

    <!--Include css -->
    
<!--[if IE 8 ]><link rel="stylesheet" href="{{URL::to('')}}/public/assets/frontend/assets/css/main_ie8.min-f05b134c4c0748ec4f9cd0812d1990af.css"/><![endif]-->
    <!--[if IE 9 ]><link rel="stylesheet" href="{{URL::to('')}}/public/assets/frontend/assets/css/main_ie9.min-4ead3bf43cbf05725d93937e79a80475.css"/><![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!-->
<link rel="stylesheet" href="{{URL::to('')}}/public/assets/frontend/assets/css/main-150601cd852a549c5c3a3ae7bbd821b0.css">
<link rel="stylesheet" href="{{URL::to('')}}/public/assets/frontend/assets/application-2f53bda22f9e8e521967afdd3d284bb5.css">
<!--<![endif]-->

    <link rel="apple-touch-icon" sizes="180x180" type="layout/favicon/apple-touch-icon.png" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/apple-touch-icon-2e0d51cfdadf57fd5b1fc2cef0e9ee74.png">
    <link rel="icon" sizes="32x32" type="image/png" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/favicon-32x32-dc4e442efbef9ca5ec036fef36d74679.png">
    <link rel="icon" sizes="16x16" type="image/png" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/favicon-16x16-7af91eb9c1372b4ee5223b0a541fad66.png">


    <link rel="manifest" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/site-fc92a97c54827cb2264971644266106a.webmanifest">
    <link rel="mask-icon" color="#5bbad5" href="{{URL::to('')}}/public/assets/frontend/assets/layout/favicon/safari-pinned-tab-06ed1585ecb3b2a3dbc1d20e4918355f.svg">

    <meta name="apple-mobile-web-app-title" content="EstateGuru">
    <meta name="application-name" content="EstateGuru">
    <meta name="msapplication-TileColor" content="#071423">
    <meta name="theme-color" content="#031327">

    
        <meta name="google-signin-client_id" content="191150156239-q5jip48u5gub9n4hv3tnj386vt6bf3rc.apps.googleusercontent.com">

        <script type="text/javascript" async="" src="https://widget.intercom.io/widget/fxtll02n"></script><script src="https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en_US.WuHGBC70tdw.O/m=auth2/rt=j/sv=1/d=1/ed=1/am=wQc/rs=AGLTcCNpHoaMoiiRyTFOuGnNuTT-eiD9VA/cb=gapi.loaded_0" async=""></script><script type="text/javascript" async="" src="https://snap.licdn.com/li.lms-analytics/insight.min.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/gtm/js?id=GTM-K2FS4MT&amp;t=gtm22&amp;cid=174479622.1595487910&amp;aip=true"></script><script src="https://sc.lfeeder.com/lftracker_v1_lYNOR8xWkXgaWQJZ.js"></script><script type="text/javascript" async="" src="https://snap.licdn.com/li.lms-analytics/insight.min.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" src="https://static.hotjar.com/c/hotjar-79429.js?sv=7"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script src="https://connect.facebook.net/signals/config/969598869759226?v=2.9.23&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-59H29W"></script><script src="https://apis.google.com/js/platform.js" async="" defer="" gapi_processed="true"></script>
    

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
    <!--[if lt IE 9 ]><script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/html5shiv-3.7.2.min-2536f8ce6b48e154746d17e7c5c46694.js" ></script><meta content="no" http-equiv="imagetoolbar"><![endif]-->
    




    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/jquery-6e3b82f58f57b0f2ac1320f71a1eebc1.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/popper.min-5b4235e0ea04971937f5927a42b58ed3.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/bootstrap-material-design-f4a647ca8a81a7655e7e0525e6a99174.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/highcharts-fc5707f5431083a2304cd78550b47d99.js"></script>
    
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/plugins/select2-afd4c56153f1bc10c205cbbc55b0c132.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/plugins/jquery.dataTables-3b26741112153e36172f8b5b148ddb5b.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/plugins/jquery.validate-acde0199d64bc7d9812af7f09bd0ca0a.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/components/datatable-d86e7bcf6d4191931fa5fd4a0ba4925c.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/components/line-chart-dark-0f6467138a5c308836e54096671b812c.js"></script>
    
        <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/components/datepicker-gijgo-bd51780a29cc73670c7fc3089aeabc9a.js"></script>
    

    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/libraries/bootstrap-slider-05b3d2c39da0210d2c71441d9250dc54.js"></script>
    <script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/main-4e0d24fb0b3141b4dc1efd6c48c778a6.js"></script>


<script type="text/javascript" src="{{URL::to('')}}/public/assets/frontend/assets/layout/application-c23679cb153df488f4216c68a09bda7f.js"></script>




    





    
<script async="" src="https://script.hotjar.com/modules.9e0dfa53977fdaaa37e1.js" charset="utf-8"></script><style type="text/css">iframe#_hjRemoteVarsFrame {display: none !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important;}</style></head>
<nav class="navbar navbar-expand-lg bg-dark navbar-header">
            <div class="container">
                <a class="navbar-brand" href="{{URL::to('')}}/tetenter/account_overview">
                    <img src="{{URL::to('')}}/public/assets/frontend/assets/layout/general/logo-efc03232af49a93566f694b33b3bb107.svg" width="127" class="d-inline-block align-top img-fluid">
                </a>
                <div class="nav-item dropdown language-dropdown main-language-dropdown">
                    
<a class="nav-link dropdown-toggle " href="#" id="mobileLanguageDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="text-desc">EN</span>
</a><div class="dropdown-menu dropdown-menu-right" aria-labelledby="mobileLanguageDropdown3"><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=ee">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ee-70060470228ead2fb88a220e390e9558.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        EE
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=en">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/en-84696f8ba45a9deed582262815fab22f.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        EN
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=lv">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lv-4725326d6abcc7d9950541cbd8f3cdb2.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        LV
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=lt">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lt-89aff32d0cfd2c23000f3300fe629dab.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        LT
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=de">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/de-19e170b563605af0e2d06672587eb8b5.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        DE
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=ru">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ru-31de0f892b5931fb93c5304b88e24013.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        RU
    </span>
</a></div>

                </div>
                <button class="navbar-toggler collapsed main-navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="zmdi zmdi-menu show-menu"></span>
                    <span class="zmdi zmdi-close hide-menu"></span>
                </button>

                <div class="collapse navbar-collapse main-space" id="navbarNav">
                    @guest
                    <ul class="navbar-nav mr-auto navbar-left">
                        <li class="nav-item">
                            <a href="{{URL::to('')}}/tetenter/primery_market">
                                PRIMARY MARKET
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="{{URL::to('')}}/public/assets/frontend/portfolio/details" class="nav-link">
                                PORTFOLIO
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="{{URL::to('')}}/public/assets/frontend/portfolio/account" class="nav-link">
                                ACCOUNT BALANCE
                            </a>
                        </li>

                        <li class="nav-item  ">
                            <a href="{{URL::to('')}}/public/assets/frontend/autoInvest/index" class="nav-link">
                                AUTO INVEST
                            </a>
                        </li>

                        
                            <li class="nav-item">
                                <a href="{{URL::to('')}}/public/assets/frontend/secondaryMarket/index" class="nav-link">
                                    SECONDARY MARKET
                                </a>
                            </li>
                        

                    </ul>
                    
                    @else

    <div class="ml-auto">
        
            
<ul class="navbar-nav navbar-right navbar-righ-top">
    <li class="nav-item dropdown investor-dropdown">
        <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {{ Auth::user()->name }}, Tetenter{{ Auth::user()->id }}
    
        <span class="hidden-xs hidden-sm">(Investor)</span>
    
    
    
</a>

        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown5">
            
            

            
               <!--  <a class="dropdown-item logout-item not-href" tabindex="1" href="{{URL::to('')}}/public/assets/frontend/logout/index">
                    <span class="dropdown-item-name">
                        Logout<i class="zmdi zmdi-sign-in"></i>
                    </span>
                </a> -->
            <a class="dropdown-item logout-item not-href"  href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            <span class="dropdown-item-name">
                        Logout<i class="zmdi zmdi-sign-in"></i>
                    </span>
             </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
        </div>
    </li>
    @endguest
        <li class="nav-item dropdown currency-dropdown">
<span class="nav-link dropdown-toggle " aria-haspopup="true" aria-expanded="false">
    
        <span class="inner-text">€0</span>
    
    
</span></li>
    
<!--     <li class="nav-item dropdown">
        
<a class="nav-link dropdown-toggle " href="#" id="mobileLanguageDropdown7" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="text-desc">EN</span>
</a><div class="dropdown-menu dropdown-menu-right" aria-labelledby="mobileLanguageDropdown7"><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=ee">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ee-70060470228ead2fb88a220e390e9558.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        EE
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=en">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/en-84696f8ba45a9deed582262815fab22f.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        EN
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=lv">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lv-4725326d6abcc7d9950541cbd8f3cdb2.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        LV
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=lt">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/lt-89aff32d0cfd2c23000f3300fe629dab.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        LT
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=de">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/de-19e170b563605af0e2d06672587eb8b5.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        DE
    </span>
</a><a class="dropdown-item " href="{{URL::to('')}}/public/assets/frontend/veriff/auth?lang=ru">
    <span class="dropdown-item-flag">
        <img src="{{URL::to('')}}/public/assets/frontend/assets/flags/ru-31de0f892b5931fb93c5304b88e24013.png" alt="" width="20">
    </span>
    <span class="dropdown-item-name">
        RU
    </span>
</a></div>

    </li> -->
    
        <li class="top-logout-btn">
            <a href="{{URL::to('')}}/public/assets/frontend/logout/index">
                <img src="{{URL::to('')}}/public/assets/frontend/assets/content/logout-white-d43822bf9b72d550a7eef81529eba1a5.svg" alt="">
            </a>
        </li>
    

</ul>



        

        <ul class="navbar-nav navbar-right navbar-righ-top justify-content-end">
            <li class="nav-item">
                

    
        <a href="#" class="nav-link">
            Settings
            <span class="badge badge-danger">2</span>
        </a>
    



            </li>

            
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle no-arrow" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick="openPopUp()">
        <span class="text-desc">Updates</span>
    
    </a>
    <div class="dropdown-menu dropdown-menu-right dropdown-menu-center" aria-labelledby="navbarDropdown2">
        <div class="update" id="divUpdateNotification">
<div class="updates-section est-updates">
    <div class="updates-section-header">
        <h5>ESTATEGURU UPDATES</h5>
        <span>0 unread</span>
    </div>
    <div class="updates-section-content est-updates-section-content">
        
    </div>
</div>


<div class="updates-section pr-updates">
    <div class="updates-section-header">
        <h5>LOAN UPDATES</h5>
        <span>0 unread</span>
    </div>

    <div class="updates-section-content pr-updates-section-content">
        
    </div>
</div>

<div class="see-all">
    <a href="#">See all</a>
</div>
</div>

    </div>
</li>



            <li class="nav-item">
                <a href="{{URL::to('')}}/tetenter/help" class="nav-link">
                    Help
                </a>
            </li>
            <li class="nav-item">
                <a href="{{URL::to('')}}/tetenter/about" class="nav-link">
                    Info
                </a>
            </li>
        </ul>
    </div>




                </div>
            </div>
        </nav>
        <div class="page-content-wrapper">
        <div class="container">
            <div id="divEditCompanyProfile">

            </div>
            
<div class="error-wrapper small-z-index" id="divPopup" style="top: 100.5px;">
</div>
            
            <div class="main-content-wrapper">
                
<div class="sidebar sidebar-secondary">
    <ul class="sidebar-menu-list list-unstyled">
        <li class="active">
            
                <a href="/portal/account/index">
                    <span class="icon-wrapper">
                        <i class="icon icon-user-ring-2-24"></i>
                        
                            <span class="notify-box">2</span>
                        
                    </span>
                    My account
                </a>
            
        </li>
      
      
        
            
                
                    
                
                
            
        
    
        <li class="">
            <a href="{{URL::to('')}}/tetenter/funding">
                <span class="icon-wrapper">
                    <i class="icon icon-referral-24"></i>
                </span>
                Referral Program
            </a>
        </li>
    
        
    </ul>
    
        <div class="sidebar-action">
            <a href="#" class="btn btn-double-o">
                <label>Add funds</label>
                <span class="small light">
                    Available: €0.00
                </span>
            </a>

            <p>
                <a href="/portal/account/referrals">Invite a friend</a> and earn <strong>0.5%</strong> more
            </p>
        </div>
    

</div>