 
@extends('frontend/layouts/layout')


@section('content')


 <div class="log-popup-wrapper login-dialogue">
                    <div class="container">
                        <div class="log-popup">
                            <button type="button" class="btn-close-log-popup">
                                <i class="zmdi zmdi-close"></i>
                            </button>
                            <div class="popup-item left-item">
                                                                    <h2 class="mb-2">Welcome!</h2>
                                    <p>Brave start is half a win,<br>don't waste your time, just log-in.</p>
                                                            </div>
                            <div class="popup-item right-item">
                                <div id="divErrorMessage" style="display:none;">
                                    <div class="message-box error-message-box alert alert-dismissible" role="alert">
                                        <div class="clearfix">
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">x</span>
                                            </button>
                                            <span id="error-text"></span>
                                        </div>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>

                @stop