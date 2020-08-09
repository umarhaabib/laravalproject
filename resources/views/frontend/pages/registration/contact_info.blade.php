@extends('frontend/layouts/account_layout')


@section('content')


<div class="onboard-wrapper main-step-wrapper">
        
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
        
            

            <li class="current">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Contact info</span>
                
            </li>
        
            

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Identity verification</span>
                
            </li>
        
            

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Investor profile</span>
                
            </li>
        
            

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Appropriateness Questionnaire</span>
                
            </li>
        
    </ul>
</div>

        <div class="container verify-container">
            <h1 class="mb-md-5">Contact info </h1>
            <h4 class="two-step-subtitle">Please choose your investor profile type to continue:</h4>

            <div class="row justify-content-center">
                <div class="col-lg-5 col-xl-4 mb-3 mb-lg-0">
                    <div class="card verify-card h-100">
                        <div class="icon-wrapper">
                            <i class="icon icon-assignment-24 contact-info-box-icon"></i>
                        </div>
                        <a href="{{URL::to('')}}/tetenter/private_investor" class="btn btn-cta-o text-truncate">
                            Private investor
                        </a>

                        <p> You can also add company to your profile in later stage.</p>
                    </div>
                </div>

                <div class="col-lg-5 col-xl-4">
                    <div class="card verify-card h-100">
                        <div class="icon-wrapper">
                            <i class="icon icon-portfolio-24 contact-info-box-icon"></i>
                        </div>
                        <a href="{{URL::to('')}}/tetenter/company_representer" class="btn btn-cta-o text-truncate">
                            Company representative
                        </a>
                        <p>If you are planning to invest as a company/institution. You can also create your personal portfolio later.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>


@stop