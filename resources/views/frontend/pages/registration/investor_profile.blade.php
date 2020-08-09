@extends('frontend/layouts/account_layout')


@section('content')

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
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
        
            

            <li class="current">
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

        <div class="container p-mob-0">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center">
                    <h1 class="mb-md-5">Set up investor profile </h1>
                    <h4 class="two-step-subtitle mb-3">As of last - to be compliant with laws on anti-money laundering and "know your client" principles please provide following information:</h4>

                    <p class="text-muted mb-4 mb-md-5">Note: records provided by the customer are confidential and are not made public to third parties without the customer’s written consent, except for the statutory cases of governmental authorities, when the data must be disclosed to the competent authorities or persons. </p>
                </div>
            </div>

            <div class="onboarding-tab-wrapper pb-1 mt-0 mb-5">
                
<form action="{{URL::to('')}}/tetenter/profile" method="post" class="onboarding-form">
  
    <div class="form-group-item">
        <h6>Investors additional information</h6>

        <div class="form-group bmd-form-group is-filled">
            <label for="purposeInvestment" class="bmd-label-floating main-label">Purpose of investment</label>

            <select name="investment_purpose" class="form-control"required>
<option value="" >Please select...</option>
<option value="INVESTMENT_SECURED_LOANS" >Investment into secured loans</option>
<option value="COLLECT_FUNDS_FUTURE" >Collect funds for the future</option>
<option value="BOTH">Both</option>
</select>
            
        </div>

        <div class="form-group bmd-form-group is-filled">
            <label for="plannedInvested" class="bmd-label-floating main-label">Planned investment (per month)</label>
            <select name="planned_invested" class="form-control"required>
<option value="" data-select2-id="4">Please select...</option>
<option value="VALUE_UP_TO_1000" >Up to € 1000</option>
<option value="VALUE_1001_TO_10000" >€ 1001 – € 10 000</option>
<option value="VALUE_10001_50000">€ 10 001 – € 50 000</option>
<option value="VALUE_MORE_50000">More than € 50,000</option>
</select>
            <small class="text-muted">Amount of money planned to be invested in loans </small>
            
        </div>

        <div class="form-group bmd-form-group is-filled">
            <label for="occupation" class="bmd-label-floating main-label">Occupation</label>
            <select name="occupation" class="form-control"required>
<option value="" >Please select...</option>
<option value="EMPLOYEE" >Employee</option>
<option value="CIVIL_SERVANT">Civil servant</option>
<option value="MEMBER_MANAGEMENT_BODY" >Member of the management body</option>
<option value="BUSINESS_OWNER" >Business owner</option>
<option value="INDIVIDUAL_ACTIVITY_BUSINESS_CERTIFICATE" >Individual activity under a business certificate (including independent creative work)</option>
<option value="PENSIONER" >Pensioner</option>
<option value="UNEMPLOYED" >Unemployed</option>
<option value="STUDENT_PUPIL">Student / pupil</option>
<option value="OTHER" >Other</option>
</select>
            
        </div>

        <div class="form-group bmd-form-group is-filled">
            <label for="averageMonthlyIncome" class="bmd-label-floating main-label">Average monthly Income</label>
            <select name="average_income" class="form-control">
<option value="" >Please select...</option>
<option value="VALUE_UP_TO_1000">Up to € 1,000</option>
<option value="VALUE_1001_TO_5000">€ 1,001 – € 5,000</option>
<option value="VALUE_5001_10000">€ 5,001 – € 10,000</option>
<option value="VALUE_10001_15000">€ 10,001 – € 15,000</option>
<option value="VALUE_MORE_15000">more € 15,000</option>
</select>
            
        </div>

        <p class="pt-2">Main source of funds</p>

        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Salary"><span class="checkbox-decorator"><span class="check"></span></span>Salary
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Income from freelancing"><span class="checkbox-decorator"><span class="check"></span></span>Income from freelancing
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Pension"><span class="checkbox-decorator"><span class="check"></span></span>Pension
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Scholarship"><span class="checkbox-decorator"><span class="check"></span></span>Scholarship
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Social benefits"><span class="checkbox-decorator"><span class="check"></span></span>Social benefits
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Income from business"><span class="checkbox-decorator"><span class="check"></span></span>Income from business (including dividends)
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Parental support"><span class="checkbox-decorator"><span class="check"></span></span>Parental support
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Inheritance"><span class="checkbox-decorator"><span class="check"></span></span>Inheritance
                </label>
            </div></span>
        
            <span class="bmd-form-group is-filled"><div class="clearfix checkbox mb-2">
                <label class="float-left">
                    <input type="checkbox" name="fund_source[]"  value="Income from sale of the assets"><span class="checkbox-decorator"><span class="check"></span></span>Income from sale of the assets
                </label>
            </div></span>
        
        
    </div>

    <div class="form-group-item">
        <h6>Beneficial owners information </h6>

        <p>I hereby confirm that I am the actual owner (beneficiary) of funds in accounts. </p>

        <span class="bmd-form-group is-filled"><div class="radio">
            <label class="mb-0">
                <input type="radio" name="beneficial_information" value="Yes"><span class="bmd-radio"></span> <span class="ml-2">Yes</span>
            </label>
            <label class="mb-0 ml-5">
                <input type="radio" name="beneficial_information" value="No"><span class="bmd-radio"></span> <span class="ml-2">No</span>
            </label>
        </div></span>
        

        <div class="form-secondary-item " id="divOwnerInfo">
            <p>Please specify info of the final beneficiary: </p>

            <div class="form-group bmd-form-group">
                <label class="bmd-label-floating main-label">First name </label>
                <input type="text" value="" class="form-control main-input" name="ownerName" id="ownerName">
                

            </div>

            <div class="form-group bmd-form-group">
                <label class="bmd-label-floating main-label">Last name</label>
                <input type="text" value="" class="form-control main-input" name="ownerSname" id="ownerSname">
                

            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group date-form-group">
                        

<div class="form-group date-form-group bmd-form-group" data-provide="datepicker">
    
        <label class="bmd-label-floating main-label"> Birth date</label>
    

    <div role="wrapper" class="gj-datepicker gj-datepicker-md gj-unselectable small" style="width: 185px;"><input type="text" name="ownerBDate" id="ownerBDate" value="" class="gj-textbox-md" autocomplete="off" style="" data-type="datepicker" data-guid="0b722e62-021c-c897-2323-3a7052bdf5d2" data-datepicker="true" role="input"><i class="gj-icon" role="right-icon">event</i></div>
    
</div>




<script type="application/javascript">

    $(document).ready(function () {
        
        var field = "ownerBDate";
        var width = "185";
        

        var fieldElement = $('#' + field);
        if (fieldElement !== undefined) {
            fieldElement.datepicker({
                format: 'dd.mm.yyyy',
                //minDate: today,
                showOtherMonths: true,
                calendarWeeks: true,
                header: true,
                footer: true,
                width: width,
                size: "small"
            });
        } else {
            console.warn('unable to find fieldElement: ' + field);
        }
    });
</script>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="form-group-item">
        <h6>Politically exposed persons (PEPs)</h6>

        <p class="mb-0"></p><p>Do or did (no more than one year ago) you or your immediate family members or close associates have an important public position in your jurisdiction, in European Union, international or foreign institutions?</p><p>(Immediate family members – the spouse, the person from the registered partnership, parents, brothers, sisters, grandparents, grandchildren, children and children’s spouses, children cohabitants. close associate is a personwith whom you have a joint business or maintain other professional or business relations.)</p><p></p>

        <span class="bmd-form-group is-filled"><div class="radio">
            <label class="mb-0">
                <input type="radio" name="politically_persons" value="Yes" ><span class="bmd-radio"></span> <span class="ml-2">Yes</span>
            </label>
            <label class="mb-0 ml-5">
                <input type="radio" name="politically_persons" value="No" ><span class="bmd-radio"></span> <span class="ml-2">No</span>
            </label>
            
        </div></span>


        <div class="form-secondary-item " id="divExposedPersonsInfo">
            
                <span class="bmd-form-group is-filled"><div class="clearfix checkbox d-block">
                    <label class="float-left mb-3">
                        <input type="checkbox" name="politicallyExposed" value="1"><span class="checkbox-decorator"><span class="check"></span></span>
                        I myself
                    </label>
                </div></span>
            
                <span class="bmd-form-group is-filled"><div class="clearfix checkbox d-block">
                    <label class="float-left mb-3">
                        <input type="checkbox" name="politicallyExposed" value="2"><span class="checkbox-decorator"><span class="check"></span></span>
                        My immediate family member
                    </label>
                </div></span>
            
                <span class="bmd-form-group is-filled"><div class="clearfix checkbox d-block">
                    <label class="float-left mb-3">
                        <input type="checkbox" name="politicallyExposed" value="3"><span class="checkbox-decorator"><span class="check"></span></span>
                        My close associate
                    </label>
                </div></span>
            
            
        </div>
    </div>

    <div class="form-group-item">
        <h6>Statements and approvals</h6>

        <p class="mb-4">I, the undersigned, hereby certify that: the information provided on this questionnaire is true, complete and without any omissions reflects the actual situation. EstateGuru provided will not be used for illegal activities(including but not limited to money laundering and financing of terrorism). I undertake to inform estateguru in writing about any changes of the above mentioned information.</p>

        <span class="bmd-form-group is-filled"><div class="clearfix checkbox d-block mb-2">
            <label class="float-left">
                <input type="checkbox" name="statement_approvals" id="statementsApprovals" value="Yes"required><span class="checkbox-decorator"><span class="check"></span></span>I hereby confirm the authenticity of the above data
            </label>
        </div></span>
        

    </div>
    
        <div class="form-group-item setup-btn-group">
            <div class="form-group">
                <input type="submit" name="_action_saveProfileDraft" value="fill later" controller="registration" class="btn btn-regular-o btn-quick" autocomplete="off">
                <button type="submit" class="btn btn-regular float-right" value="">
                    
                        complete registration
                    
                </button>

            </div>
        </div>
        <p class="text-muted">Note: records provided by the customer are confidential and are not made public to third parties without the customer’s written consent, except for the statutory cases of governmental authorities, when the data must be disclosedto the competent authorities or persons. </p>
    
</form>
<script>
    function submitFormAjax() {
        var formData = $("#formUserProfile").serialize();
        jQuery.ajax({
            url: "/portal/registration/ajaxSaveProfile",
            type: "POST",
            data:formData,
            success: function (data) {
                $('#userProfile').html(data);
                $('html, body').animate({
                    scrollTop: 0

                }, 200);
                Estatguru.initAjax();
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                $('#userProfileMainForm').html(XMLHttpRequest.responseText);
                Estatguru.initAjax()
            }
        });

        return false

    }
</script>
            </div>

        </div>
    </div>



@stop