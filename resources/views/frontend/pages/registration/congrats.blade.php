@extends('frontend/layouts/account_layout')


@section('content')


<div class="onboard-wrapper main-step-wrapper">
        
            
        
        <input type="hidden" name="userType" value="INVESTOR" id="userType">
        
        
        
        
            
<div class="container main-steps-container">
    <ul class="list-unstyled main-steps-list">
        
        
        
            

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Sign up</span>
                
            </li>
        
            

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Verify email</span>
                
            </li>
        
            

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Contact info</span>
                
            </li>
        
            

            <li class="done-skipped">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Identity verification</span>
                
            </li>
        
            

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Investor profile</span>
                
            </li>
        
            

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Appropriateness Questionnaire</span>
                
            </li>
        
    </ul>
</div>
        

        <div class="container text-center">
            <img src="{{URL::to('')}}/public/assets/frontend/assets/content/avatar-head-profile-silhouette-call-center-male-vector-21757545.jpg" class="mb-4" alt="" width="96">
            <h1 class="mt-2">Congratulations, you're done!</h1>
            <h4 class="text-center">You have successfully entered your personal information. Please complete the verification process in the "Settings" section to activate your account.</h4>
            <div class="btn-action-wrapper">
                
                
                    <a href="{{URL::to('')}}/tetenter/account_overview" class="btn btn-cta">
                        Go to dashboard
                    </a>
                
            </div>
        </div>

    </div>


@stop