
 @extends('frontend/layouts/sidebar')

    @section('content')




<div class="main-content account-content info-ref-content">
                        <div class="section-header align-items-center justify-content-between mb-4 mb-md-5">
                            <h1 class="page-title pb-0 mb-0">Affiliate &#038; referrals program</h1>
                        </div>
                        <h2 class="info-ref-title">
                            <span>YOUR FINANCIAL FREEDOM</span> STARTS NOW!                        </h2>
                        <div class="section-earning-box">
                            <div class="earning-box" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2018/10/info-ref.png);">
                                <div class="earning-info-wrapper">
                                    <h3>Invite a friend and earn 0.5% more</h3>

                                    <a class="nav-link nav-login-link btn-login-popup" href="#">I want to earn 0.5% more</a>

                                    <!-- <a href="../index5aff.html" class="btn btn-cta">I want to earn 0.5% more!</a> -->                                </div>
                            </div>
                        </div>
                        <div class="section-how-it-work uni-list-content">
                            <h2>It works in two easy steps</h2>
                            <ul class="list-unstyled steps-list large-steps-list horizontal-large-steps">
                                <li class="active">
                                    <span class="icon-wrapper-box">
                                    <span class="icon-wrapper">
                                        <i class="step-point icon icon-eg-share"></i>
                                    </span>
                                    </span>
                                    <div class="desc-wrapper">
                                        <strong>1.</strong>
                                        <span>Share</span>
                                        <p>Share your personal referral link with as many people as you like in any way you choose. Make sure they submit your link when they register on EstateGuru.</p>
                                    </div>
                                </li>
                                <li class="flex-md-row-reverse">
                                    <span class="icon-wrapper-box pl-md-5">
                                    <span class="icon-wrapper ml-0 mr-md-auto">
                                        <i class="step-point icon icon-both-get"></i>
                                    </span>
                                    </span>
                                    <div class="desc-wrapper text-md-right pr-md-5">
                                        <strong>2.</strong>
                                        <span>Get rewards</span>
                                        <p>Your friend will receive additional funds equalling 0.5% of the amount they invest during the first three months of their EstateGuru membership. Better yet, we’ll reward you with a matching amount straight into your virtual account. The more friends you invite, the more money you’ll get to invest in your own portfolio.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="section-invite-friends text-center pt-4 pt-md-0">
                            <p class="pb-md-3 mb-4">
                                <span class="font-weight-bold">It's like a free investment for you, so start sharing now!</span>
                            </p>
                             <a class="nav-link nav-login-link btn-login-popup" href="#">I want to invite a friend</a>
                            
                        </div>
                                                    <div class="section-ref-info" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/lines.png);">
                                <div class="d-flex align-items-center justify-content-center flex-column flex-md-row">
                                    <div class="ref-info-item">
                                        <div class="info-wrapper">
                                            <i class="icon icon-invite-friend"></i>
                                        </div>
                                        <h2>22,648</h2>
                                        <p>Referred users</p>
                                    </div>
                                    <div class="ref-info-item">
                                        <div class="info-wrapper">
                                            <i class="icon icon-invest"></i>
                                        </div>
                                        <h2>&euro;270,823.85</h2>
                                        <p>Referral users have earned</p>
                                    </div>
                                </div>
                            </div>
                                                <div class="section-invite-friends text-center mb-0">
                            <p class="pb-md-3 mb-4">
                                <span class="font-weight-bold">It's like a free investment for you, so start sharing now!</span>
                            </p>
                            <a href="{{URL::to('')}}/tetenter/signup" class="btn btn-cta">I want to invite a friend</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @stop