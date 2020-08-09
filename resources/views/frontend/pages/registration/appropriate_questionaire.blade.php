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
        
            

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>
                
                    <span class="steps-name">Investor profile</span>
                
            </li>
        
            

            <li class="current">
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
                    <h1 class="mb-md-5">Appropriateness Questionnaire </h1>
                    <h4 class="two-step-subtitle mb-3">As of last - to be compliant with laws on anti-money laundering and "know your client" principles please provide following information:</h4>

                    <p class="text-muted mb-4 mb-md-5">Note: records provided by the customer are confidential and are not made public to third parties without the customer’s written consent, except for the statutory cases of governmental authorities, when the data must be disclosed to the competent authorities or persons. </p>
                </div>
            </div>

            <div class="onboarding-tab-wrapper pb-1 mt-0 mb-5">
                
 <form action="{{URL::to('')}}/tetenter/questionaire" method="post" class="onboarding-form">
    <div class="form-group-item">

    <div class="mb-3">

        <div class="form-group bmd-form-group is-filled">

        <h4 class="title-bordered mb-4 lh-16">
            1.  Are you currently or have you previously been employed as a professional in the Financial Markets/Services industry?
        </h4>
            <div class="radio">
                <label class="mb-0">
                    <input type="radio" name="isWorkingFinMarket" value="Yes"><span class="bmd-radio"></span>
                    <span class="ml-1">Yes</span>
                </label>

                <label class="mb-0 ml-3">
                    <input type="radio" name="isWorkingFinMarket" value="No"><span class="bmd-radio"></span> <span class="ml-1">No</span>
                </label>

                

            </div>

        </div>

    </div>

        <div class="form-group bmd-form-group is-filled">
            <div class="mb-2">
                <h4 class="title-bordered mb-4 lh-16">2.  What's the current net worth of your whole investor portfolio?</h4>
                
                    <div class="radio">
                        <label class="mb-0 pt-3">
                            <input type="radio" name="investorDescribe" id="investorDescribe" value="LESS_THAN_100" class="ml-1"><span class="bmd-radio"></span>
                            <span class="ml-1">  Less than €100k</span>
                        </label>
                    </div>
                
                    <div class="radio">
                        <label class="mb-0 pt-3">
                            <input type="radio" name="investorDescribe" id="investorDescribe" value="FROM_100_TO_1M" class="ml-1"><span class="bmd-radio"></span>
                            <span class="ml-1">  €100k-€1 million</span>
                        </label>
                    </div>
                
                    <div class="radio">
                        <label class="mb-0 pt-3">
                            <input type="radio" name="investorDescribe" id="investorDescribe" value="MORE_THAN_1M" class="ml-1"><span class="bmd-radio"></span>
                            <span class="ml-1">  over €1 million</span>
                        </label>
                    </div>
                
                

            </div>
        </div>
        <div class="form-group bmd-form-group is-filled">
            <div class="mb-2">
                <h4 class="title-bordered mb-4 lh-16">3.  What is your main goal when investing through the Tetenter investment platform?</h4>
                
                    <div class="radio">
                        <label class="mb-0 pt-3">
                            <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="KNOW_INVESTING_IN_GENERAL" class="ml-1"><span class="bmd-radio"></span>
                            <span class="ml-1">  Using Tetenter to learn about investing in general and the risks associated with it</span>
                        </label>
                    </div>
                
                    <div class="radio">
                        <label class="mb-0 pt-3">
                            <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="MAXIMIZE_INDIVIDUAL_RETURNS" class="ml-1"><span class="bmd-radio"></span>
                            <span class="ml-1">  I'm looking to maximize the individual returns of my investments</span>
                        </label>
                    </div>
                
                    <div class="radio">
                        <label class="mb-0 pt-3">
                            <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="IMVESTMENT_INSTRUMENT_WITH_EXPOSURE" class="ml-1"><span class="bmd-radio"></span>
                            <span class="ml-1">  I'm looking for an investment instrument with exposure to real estate without the need to manage the properties on my own</span>
                        </label>
                    </div>
                
                    <div class="radio">
                        <label class="mb-0 pt-3">
                            <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="IMVESTMENT_INSTRUMENT_LOWER_RISKS" class="ml-1"><span class="bmd-radio"></span>
                            <span class="ml-1">  I'm looking for an investment instrument to lower risks through diversifying my portfolio</span>
                        </label>
                    </div>
                
                

        </div>
        </div>

         <div class="form-group bmd-form-group is-filled">
            <div class="mb-2">
                <h4 class="title-bordered mb-4 lh-16">4.  Please list investment instruments that you are currently using or have been using in the past:</h4>

                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Public stocks"><span class="checkbox-decorator"><span class="check"></span></span>
                            Public stocks
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Equity"><span class="checkbox-decorator"><span class="check"></span></span>
                            Equity
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Bonds"><span class="checkbox-decorator"><span class="check"></span></span>
                            Bonds
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Direct loans"><span class="checkbox-decorator"><span class="check"></span></span>
                            Direct loans
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="P2P financing"><span class="checkbox-decorator"><span class="check"></span></span>
                            P2P financing
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Real Estate"><span class="checkbox-decorator"><span class="check"></span></span>
                            Real Estate
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Savings products"><span class="checkbox-decorator"><span class="check"></span></span>
                            Savings products
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Real Estate crowdfunding"><span class="checkbox-decorator"><span class="check"></span></span>
                            Real Estate crowdfunding
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Equity crowdfunding"><span class="checkbox-decorator"><span class="check"></span></span>
                            Equity crowdfunding
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="REITs"><span class="checkbox-decorator"><span class="check"></span></span>
                            REITs
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="investmentInstrumentList[]" id="investmentInstrumentList[]" value="Index funds"><span class="checkbox-decorator"><span class="check"></span></span>
                            Index funds
                        </label>
                    </div>
                
                
            </div>
        </div>

        <div class="form-group bmd-form-group is-filled">

            <h4 class="title-bordered mb-4 lh-16">5.  What is the ratio of property-backed real estate loans in your portfolio?</h4>

            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_UP_TO_10" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  Less than 10% of my total investment portfolio</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_10_TO_50" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  10-50% of my total investment portfolio</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_50_TO_90" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  50-90% of my total investment portfolio</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_MORE_90" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  over 90% of my total investment portfolio</span>
                    </label>
                </div>
            
            
        </div>

        <div class="form-group bmd-form-group is-filled">
            <div class="mb-2">
                <h4 class="title-bordered mb-4 lh-16">6.  If a borrower takes a €100 000 Full Bullet loan for 12 months with 10% annual interest rate, which of the following statements are true?</h4>

                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="totalPayBackAmountList[]" id="totalPayBackAmountList[]" value="The total amount of money the borrower has to pay back is €120000"><span class="checkbox-decorator"><span class="check"></span></span>
                            The total amount of money the borrower has to pay back is €120000
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="totalPayBackAmountList[]" id="totalPayBackAmountList[]" value="The total amount of money the borrower has to pay back is €110000"><span class="checkbox-decorator"><span class="check"></span></span>
                            The total amount of money the borrower has to pay back is €110000
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="totalPayBackAmountList[]" id="totalPayBackAmountList[]" value="The borrower pays back the principal in equal amounts every month"><span class="checkbox-decorator"><span class="check"></span></span>
                            The borrower pays back the principal in equal amounts every month
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="totalPayBackAmountList[]" id="totalPayBackAmountList[]" value="The borrower pays back interest payments each month"><span class="checkbox-decorator"><span class="check"></span></span>
                            The borrower pays back interest payments each month
                        </label>
                    </div>
                
                
            </div>
        </div>


    <div class="form-group bmd-form-group is-filled">

        <h4 class="title-bordered mb-4 lh-16">7.  In the context of Tetenter’s financing platform choose the correct meaning of LTV (loan to value):</h4>

        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="BORROWER_LIFETIME_VALUE" class="ml-1"><span class="bmd-radio"></span>
                    <span class="ml-1">  Loan to value of the borrower for each individual platform investor</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="INVESTOR_LIFETIME_VALUE" class="ml-1"><span class="bmd-radio"></span>
                    <span class="ml-1">  Lifetime value of an average investor for Tetenter</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="LOAN_VALUE_AGAINST_COLLATERAL_VALUE" class="ml-1"><span class="bmd-radio"></span>
                    <span class="ml-1">  Loan to value for each loan means how big a loan is given out against the value of the collateral</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="LEVERAGE_TRUST_VALUE" class="ml-1"><span class="bmd-radio"></span>
                    <span class="ml-1">  Amount of all the loans (secured and non-secured) the borrower has taken minus the value of the collateral property</span>
                </label>
            </div>
        
        
    </div>
        <div class="form-group bmd-form-group is-filled">
            <div class="mb-2">
                <h4 class="title-bordered mb-4 lh-16">8.   Investors invest in a loan with an LTV of 75%. The loan goes into default and Tetenter sells the collateral object 20% cheaper than initially valued in the report. Choose the statements below that are correct about this loan.</h4>

                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="defaultLoanFundsList[]" id="defaultLoanFundsList[]" value="The funds received from the sales are still enough."><span class="checkbox-decorator"><span class="check"></span></span>
                            The funds received from the sales are still enough to cover the loan obligations for the investors
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="defaultLoanFundsList[]" id="defaultLoanFundsList[]" value="Selling a collateral object always comes with additional costs."><span class="check"></span></span>
                            Selling a collateral object always comes with additional costs. In this case, the investor may lose some capital or/and some of the earned interest
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="defaultLoanFundsList[]" id="defaultLoanFundsList[]" value="It doesn’t matter how much the sales price changes."><span class="check"></span></span>
                            It doesn’t matter how much the sales price changes from the initial price because the initial LTV is small enough to protect the investors
                        </label>
                    </div>
                
                    <div class="clearfix checkbox mb-2">
                        <label class="float-left">
                            <input type="checkbox" name="defaultLoanFundsList[]" id="defaultLoanFundsList[]" value="LTV should never be over 50%"><span class="checkbox-decorator"><span class="check"></span></span>
                            LTV should never be over 50%
                        </label>
                    </div>
                
                
            </div>
        </div>
        <div class="form-group bmd-form-group is-filled">

            <h4 class="title-bordered mb-4 lh-16">9.   Which of the following potential portfolio strategies would be the best to minimize the business and financial risks across your portfolio related to each individual borrower?</h4>

            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="riskMinimizeStrategy" id="riskMinimizeStrategy" value="DIVIDE_PORTFOLIO_MAX_10_DIFFERENT_INVESTMENT" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  You should divide your whole portfolio between 3-5 different investments</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="riskMinimizeStrategy" id="riskMinimizeStrategy" value="MORE_MONEY_IN_ONE_INVESTMENT" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  The more money you put into one investment the fewer investments you have and the fewer risks you will carry related to borrowers' business and financial risks</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="riskMinimizeStrategy" id="riskMinimizeStrategy" value="DIVERSIFY_INVESTMENTS" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  You should diversify the investments in your portfolio. It's said that having your portfolio divided between 25 investments is a good sign of well-diversified portfolio</span>
                    </label>
                </div>
            
            
        </div>

        <div class="form-group bmd-form-group is-filled">

            <h4 class="title-bordered mb-4 lh-16">10.   The holder of a first ranking mortgage is the lender that has which right to the proceeds from an enforced sale of the collateral property?</h4>

            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="firstRankingMortgageHolder" id="firstRankingMortgageHolder" value="FIRST_RANK" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  Second (the owner has always first)</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="firstRankingMortgageHolder" id="firstRankingMortgageHolder" value="SECOND_RANK" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  First</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="firstRankingMortgageHolder" id="firstRankingMortgageHolder" value="THIRD_RANK" class="ml-1"><span class="bmd-radio"></span>
                        <span class="ml-1">  Third (the owner and state always come first)</span>
                    </label>
                </div>
            
            
        </div>

    </div>
    
        <div class="form-group-item setup-btn-group">
            <div class="form-group">
                <input type="submit" name="_action_saveAppropriateProfileDraft" value="fill later" controller="registration" class="btn btn-regular-o btn-quick" autocomplete="off">
                <button type="submit" class="btn btn-regular float-right" value="">
                     
                        complete registration
                    
                </button>

            </div>
        </div>
        <p class="text-muted">Note: records provided by the customer are confidential and are not made public to third parties without the customer’s written consent, except for the statutory cases of governmental authorities, when the data must be disclosedto the competent authorities or persons. </p>
    
</form>

<script>
    function submitAppropriateFormAjax() {
        var formData = $("#formUserAppropriateProfile").serialize();
        jQuery.ajax({
            url: "/portal/registration/ajaxSaveUserAppropriateProfile",
            type: "POST",
            data:formData,
            success: function (data) {
                $('#userAppropriateProfile').html(data);
                $('html, body').animate({
                    scrollTop: 0

                }, 200);
                Estatguru.initAjax();
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                $('#userAppropraiteProfileMainForm').html(XMLHttpRequest.responseText);
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