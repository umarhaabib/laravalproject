   @extends('frontend/layouts/nav')


   @section('content')

   <div class="log-backdrop"></div>
            <section class="page-wrapper">
        <div class="section-hero-borrower" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/borrower-top-right.png);">
            <div class="text-center">
                <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/eg-arrow-down.svg" class="borrower-img-top" alt="">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-1">
                        <h1>Fast, flexible real estate business loans</h1><p><span style="font-weight: 400;">With tens of thousands of active investors on the platform, EstateGuru helps you get the money you need to finance your development project </span><b>five times faster</b><span style="font-weight: 400;"> than traditional financial institutions. We’ll also help you save money, as our loans are up to </span><b>50% cheaper</b><span style="font-weight: 400;"> than other non-bank lenders. </span></p>
<p><span style="font-weight: 400;">Our team will help you determine a repayment schedule that suits the needs of your project, </span><b>support you</b><span style="font-weight: 400;"> throughout the application process, promote your loan to our investors, and make sure you get the funds you need &#8211; fast.</span></p>
                        <a href="#" class="btn btn-cta-o to-get-offer">
                            Get your offer                            <i class="icon icon-arrow-right-24"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div id="get-offer" class="section-how-much">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <div class="how-much-content">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-4 offset-md-1">
                                            <div class="text-content">
                                                <h3>How much can I get?</h3><p><span style="font-weight: 400;">We know that each project is different and that you require flexibility to suit your specific needs. This calculator will let you see how much you can expect to borrow depending on the value of your proposed collateral. You can also check what your monthly repayment schedule would be by selecting the repayment type that works for you.</span></p>
                                            </div>
                                        </div>
                                        <div class="col-md-5 offset-md-1">
                                            <form id="loan-request-form" action="https://estateguru.co/borrower-quote-response/" method="post">
                                                <div class="action-content">
                                                    <div class="action_slider-wrapper">
                                                        <div class="action_slider-item">
                                                            <div class="action-info-wrapper">
                                                                <span class="action-label">Collateral object value</span>
                                                                    <span class="value-item" id="objectSliderValLabel">
                                                                    <span>€</span>
                                                                    <span id="objectSliderVal">650,000</span>
                                                                </span>
                                                            </div>
                                                            <input id="objectSlider" type="text" name="collateral_value" />
                                                        </div>
                                                        <div class="action_slider-item">
                                                            <div class="action-info-wrapper">
                                                                <span class="action-label">Desired loan amount</span>
                                                                <span class="value-item" id="loanAmountSliderValLabel">
                                                                    <span>€</span>
                                                                    <span id="loanAmountSliderVal">50,000</span>
                                                                </span>
                                                            </div>
                                                            <input id="loanAmountSlider" type="text" name="loan_amount" />
                                                        </div>
                                                        <div class="action_slider-item">
                                                            <div class="action-info-wrapper">
                                                                <span class="action-label">Loan period</span>
                                                                <span class="value-item" id="loanPeriodSliderValLabel">
                                                                    <span id="loanPeriodSliderVal">24</span>
                                                                    <span>months</span>
                                                                </span>
                                                            </div>
                                                            <input id="loanPeriodSlider" type="text" name="loan_term" />
                                                        </div>
                                                    </div>
                                                    <div class="radio">
                                                        <label class="mb-0">
                                                            <input type="radio" name="quote_option" value="BULLET_COUPON" checked> <span class="ml-1">Bullet</span>
                                                        </label>
                                                        <label class="mb-0">
                                                            <input type="radio" name="quote_option" value="BULLET_COUPON_ZERO"> <span class="ml-1">Full bullet</span>
                                                        </label>
                                                        <label class="mb-0">
                                                            <input type="radio" name="quote_option" value="ANNUITY"> <span class="ml-1">Annuity</span>
                                                        </label>
                                                    </div>
                                                    <p class="bullet-info"><p><strong>Please note:</strong> The amounts calculated and displayed here are for information purposes only and are an indicative offer based on a guideline interest rate. The actual deal you are offered may differ depending on the assessment of our risk team.</p>
</p>
                                                    <div class="btn-wrapper d-flex align-items-center justify-content-between">
                                                        <strong class="payment-value"><span id="loan-request-form-payment-row">Monthly payment: &euro;<span id="loan-request-form-payment">458.33</span></span><br>LTV: <span id="loan-request-form-ltv">7.69</span>%</strong>
                                                        <button class="btn btn-cta get-offer" type="button">Get an offer</button>
                                                    </div>
                                                    <div class="offer-content" style="display:none;">
                                                        <div class="form-group">
                                                            <label class="bmd-label-floating main-label">Project location country</label>
                                                            <select class="form-control select2me unsearchable" name="country" data-width="100%" data-placeholder="Please select...">
                                                                <option value="">Please select...</option>
                                                             <option value="Estonia|ee">Estonia</option>
                                                                                                                                                <option value="Latvia|lv">Latvia</option>
                                                                                                                                                <option value="Lithuania|lt">Lithuania</option>
                                                                                                                                                <option value="Finland|fi">Finland</option>
                                                                                                                                                <option value="Spain|es">Spain</option>
                                                                                                                                                <option value="Portugal|pt">Portugal</option>
                                                                                                                                                <option value="Other|other">Other</option>
                                                                                                                                    </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="bmd-label-floating main-label" id="yourName">Your name</label>
                                                            <input type="text" class="form-control" id="yourName" name="company_name" value="">
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="bmd-label-floating main-label" id="phone">Phone (with country suffix)</label>
                                                            <input type="text" class="form-control" id="phone" name="company_phone" value="">
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="bmd-label-floating main-label" id="email">Your business email</label>
                                                            <input type="text" class="form-control" id="email" name="company_email" value="">
                                                        </div>
                                                        <div class="text-right pt-3">
                                                            <input type="hidden" name="quote_number" value="5f193c5b260f1">
                                                            <button class="btn btn-cta" type="submit" disabled>Send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/eg-arrow-down.svg" width="360" alt="" class="section-arrow-img img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-financing" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/borrower-left.png);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <div class="title-wrapper">
                            <h6>Custom-tailored to suit your needs</h6><h2>Financing done the right way</h2><p>We understand how much time matters, so we give you personal feedback and advice on your application within a day or two, while our investor funding is often completed in a few hours. We can tailor your repayment schedule to suit your cash flow situation, meaning no additional pressure <span style="font-weight: 400;">when you least need it. Focus on delivering your development, not on paperwork or unnecessary admin.</span></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="financing-items">
                                                            <div class="icon-wrapper">
                                    <img src="{{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/03/fexible.png" class="item-icon" width="160" alt="">
                                </div>
                            <h5>Flexible terms</h5><p><span style="font-weight: 400;">Annuity payments, bullet, or full-bullet payments &#8211; the choice is yours. We also have no penalties if your project is so successful that you manage to pay your loan back early. You’ll pay only the interest on the actual loan period. </span></p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="financing-items">
                                                            <div class="icon-wrapper">
                                    <img src="{{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/03/ltvupto.png" class="item-icon" width="160" alt="">
                                </div>
                            <h5>Faster process</h5><p>We know the value of efficiency, so we ensure that borrowers can get funding in as little as a few days. Our huge investor pool also means most projects are fully funded within hours of syndication, while we keep admin to a minimum in order to allow you to focus on your business.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="financing-items">
                                                            <div class="icon-wrapper">
                                    <img src="{{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/03/fasterprocess.png" class="item-icon" width="160" alt="">
                                </div>
                            <h5>LTV up to 75%</h5><p>We understand the real estate business and what makes a great project, which is why we offer a Loan to Value ratio of up to 75%. Talk to our property investment professionals, not bankers and accountants, to get the maximum out of your loan and find the support you need.</p>
                        </div>
                    </div>
                </div>
                <div class="row simple-answer-box">
                    <div class="col-md-8 offset-md-2">
                        <h3><h3>Get access to thousands of investors</h3>
<p><span style="font-weight: 400;">Our platform is home to a mix of private and institutional investors with a keen appetite for the real estate market, and attractive projects are funded in record time. Over the years, we’ve helped thousands of developers achieve success. If the banks are too slow for your liking or unwilling to help at all, you’ve come to the right place.</span></p>
</h3>                        <a href="#" class="btn btn-cta-o to-get-offer">Get your offer <i class="icon icon-arrow-right-24"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-loans">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <h2 style="text-align: center;"><span style="font-weight: 400;">How can I use my loan?</span></h2>
<p><span style="font-weight: 400;">Whether you’re just starting your project or need some help getting it over the line, we have loans to support you during every stage of development. It’s never too early or too late to give your project the funding it needs to succeed. Here are the three loan types we offer:</span></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="loans-item-box">
                            <i class="icon icon-development-loan"></i>
                            <h5>Development loan</h5><p><span style="font-weight: 400;">Development loans can be used for anything from construction to excavation work or the development of area infrastructure like installing utilities or building roads. Typically used to finance residential or commercial developments like apartments or office premises, or to renovate existing properties.</span></p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="loans-item-box">
                            <i class="icon icon-business-loan"></i>
                            <h5>Business loan</h5><p>A business loan is used to raise capital for day-to-day expenses and activities, business expansion, the acquisition of equipment or goods, or to cover pending obligations like taxes and admin fees. A business loan can also be used to refinance a project or restructure assets.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="loans-item-box">
                            <i class="icon icon-bridge-loan-ico"></i>
                            <h5>Bridge loan</h5><p><span style="font-weight: 400;">A bridge loan is a short-term real estate loan that provides the owner with the necessary capital to continue their project until a permanent loan solution is acquired. Bridge loans are typically used to finance the preparation for development, to secure the purchase of a property, as a sale advance, or as a means to exit a development.</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-question">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 offset-xl-2">
                        <ul class="nav nav-tabs main-nav-tabs" id="questionTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="frequently-tab" data-toggle="tab" href="#frequently" role="tab" aria-controls="frequently" aria-selected="true">Frequently asked questions</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="HowItWorks-tab" data-toggle="tab" href="#HowItWorks" role="tab" aria-controls="HowItWorks" aria-selected="false">How it works</a>
                            </li>
                        </ul>
                        <div class="tab-content main-tab-content" id="questionTabContent">
                            <div class="tab-pane fade show active" id="frequently" role="tabpanel" aria-labelledby="frequently-tab">
                                <div class="accordion" id="accordionFrequently">
                                                                                <div class="card">
                                                <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapse-617" aria-expanded="false" aria-controls="collapse-617">
                                                    <span>Who can borrow on EstateGuru?</span>
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                </button>
                                                <div class="collapse collapse-617" id="collapse-617" data-parent="#accordionFrequently">
                                                    <p class="text-muted">Only companies registered in and with a bank account in Estonia, Latvia, Lithuania, Finland, Spain and Ireland can currently borrow through EstateGuru. We will have to perform "know your customer" checks and approve your real estate project before you are allowed to post your loan application on EstateGuru.</p>
                                                </div>
                                            </div>
                                                                                    <div class="card">
                                                <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapse-619" aria-expanded="false" aria-controls="collapse-619">
                                                    <span>How is my loan funded on EstateGuru?</span>
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                </button>
                                                <div class="collapse collapse-619" id="collapse-619" data-parent="#accordionFrequently">
                                                    <p class="text-muted">The borrower signs up on EstateGuru and fills in the loan request. 
   EstateGuru will assess the borrower’s creditworthiness, business plan, and the appraisal report of the collateral, to ensure the borrower is able to make the loan repayments and to avoid a situation, where investors' capital is at risk. 
   After approval of the loan request, the loan will be released on the EstateGuru platform, where investors can assess the risk and invest into the loan. 
   When the loan is funded, the pledge will be created and the loan will be paid out to the borrower. 
   In case the loan does not get funded, the contracts will end instantly and all the invested funds will be released to the respective investors' accounts. The borrower also has the option to accept only the amount that was raised. 
   The borrower is obliged to make the repayments according to the agreed repayment schedule. The investors can track all repayments on the portfolio page and withdraw or reinvest all the receivables.</p>
                                                </div>
                                            </div>
                                                                                    <div class="card">
                                                <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapse-646" aria-expanded="false" aria-controls="collapse-646">
                                                    <span>How can I apply for a loan?</span>
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                </button>
                                                <div class="collapse collapse-646" id="collapse-646" data-parent="#accordionFrequently">
                                                    <p class="text-muted">To apply for a loan you need to register as a borrower, fill in the loan application and provide us with documentation required in the application form. Do not hesitate to contact us if you have a question or concerns at info@estateguru.co.</p>
                                                </div>
                                            </div>
                                                                                    <div class="card">
                                                <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapse-649" aria-expanded="false" aria-controls="collapse-649">
                                                    <span>What are the fees for the borrower?</span>
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                </button>
                                                <div class="collapse collapse-649" id="collapse-649" data-parent="#accordionFrequently">
                                                    <p class="text-muted">EstateGuru charges 3-4% of the total loan amount in case of the successful funding process and a 0-2% annual administration fee. In case of a delay in the loan repayment, several penalty fees need to be paid by the borrower.</p>
                                                </div>
                                            </div>
                                                                                    <div class="card">
                                                <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapse-650" aria-expanded="false" aria-controls="collapse-650">
                                                    <span>What happens when the borrower wants to repay the loan earlier?</span>
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                </button>
                                                <div class="collapse collapse-650" id="collapse-650" data-parent="#accordionFrequently">
                                                    <p class="text-muted">Borrowers are able to repay the loan earlier and interest for the investors will be calculated and charged based on the number of days the funds were at the borrower’s possession.</p>
                                                </div>
                                            </div>
                                                                                    <div class="card">
                                                <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapse-651" aria-expanded="false" aria-controls="collapse-651">
                                                    <span>Can the borrower extend the loan period?</span>
                                                    <i class="zmdi zmdi-chevron-down"></i>
                                                    <i class="zmdi zmdi-chevron-up"></i>
                                                </button>
                                                <div class="collapse collapse-651" id="collapse-651" data-parent="#accordionFrequently">
                                                    <p class="text-muted">Yes, borrowers are able to extend the loan period. Before the loan is extended, EstateGuru will ask the reasons behind the decision. If the reasons are acceptable, the borrower is required to pay 100€ to update the contract.</p>
                                                </div>
                                            </div>
                                                                        </div>
                                <a href="../faq-category/about-loans/index.html" class="btn btn-mini-o w-auto">Show more</a>
                            </div>
                            <div class="tab-pane fade" id="HowItWorks" role="tabpanel" aria-labelledby="HowItWorks-tab">
                                <ul class="works-list list-unstyled">
                                                                                <li>
                                                <span class="list-number">1</span>
                                                <span class="arrow-style"></span>
                                                <div class="list-content">
                                                    <h4>Register or contact us and share your project
</h4>
                                                    <p>Create your EstateGuru account and submit details of your project along with a funding application. You’ll need to specify the target amount, your desired interest rate and a few other details related to the project.</p>
                                                </div>
                                            </li>
                                                                                        <li>
                                                <span class="list-number">2</span>
                                                <span class="arrow-style"></span>
                                                <div class="list-content">
                                                    <h4>We’ll contact you. Quickly
</h4>
                                                    <p>A loan manager from EstateGuru will get in touch with you as soon as possible and guide you through the entire process. As former property developers, we know that time is of the essence.</p>
                                                </div>
                                            </li>
                                                                                        <li>
                                                <span class="list-number">3</span>
                                                <span class="arrow-style"></span>
                                                <div class="list-content">
                                                    <h4>Project approval and syndication
</h4>
                                                    <p>Once we’ve helped you dot the I’s and cross the T’s we’ll agree on the key financing terms. Now we can publish your project on our investment page. In most cases, we fund the published loan in hours. On rare occasions, the financing round can be open for up to two weeks until your project target is reached.</p>
                                                </div>
                                            </li>
                                                                                        <li>
                                                <span class="list-number">4</span>
                                                <span class="arrow-style"></span>
                                                <div class="list-content">
                                                    <h4>Funding and payment
</h4>
                                                    <p>Once your project has hit the target and you’ve met all our drawdown conditions, we’ll release the funds. You’ll need to make repayments on the principal amount and any interest according to the agreed schedule. Once the loan is fully repaid the funds are released to the investors.</p>
                                                </div>
                                            </li>
                                                                            </ul>
                                <div class="text-center">
                                    <a href="#" class="btn btn-cta-o w-auto to-get-offer">
                                        Calculate your price                                        <i class="icon icon-arrow-right-24"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <div class="section-slider">
            <div class="section-img-up">
                <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/eg-arrow-up.svg" width="360" alt="" class="section-arrow-img img-fluid up-img">
            </div>
            <h3>1600 funded projects and counting</h3>
            <div class="fundedCounting-slider-wrapper">
              <!--   <div class="fundedCounting-slider">
                                                <div>
                                <div class="slide-img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/02/jo__e2-1024x682.jpg);"></div>
                            </div>
                                                    <div>
                                <div class="slide-img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/02/10-1024x683.jpg);"></div>
                            </div>
                                                    <div>
                                <div class="slide-img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/03/Klaussoni_yld_1.jpg-1-scaled-1.jpg);"></div>
                            </div>
                                        </div> -->
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fundedCounting-slider-content">
                                                                        <div><p><strong>Estonia.</strong> The borrower raised capital to renovate an old residential apartment building.</p>
<p><strong>Loan value €396 000. 12 months. Full bullet.</strong></p>
</div>
                                                                            <div><p><strong>Estonia. </strong>The borrower raised capital to develop land in the largest Estonian residential quarter near Tallinn – Veskimöldre.</p>
<div class="row">
<div class="col-lg-10 offset-lg-1"><strong>Loan value €570 000. 12 months. Full bullet.</strong></div>
</div>
</div>
                                                                            <div><p><strong>Estonia.</strong> Development in the most sought-after location in Tallinn City Centre, a total of 50 loft-type apartments. Capital is raised by stages, in tranches during the development period.<br />
<strong>Loan amount up to €6.4M.</strong></p>
</div>
                                                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-interviewTestimonials">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-8 offset-xl-2">
                            <ul class="nav nav-tabs main-nav-tabs" id="intTestTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="interview-tab" data-toggle="tab" href="#interview" role="tab" aria-controls="interview" aria-selected="true">An interview</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="textimonials-tab" data-toggle="tab" href="#textimonials" role="tab" aria-controls="textimonials" aria-selected="false">Testimonials</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tab-content main-tab-content" id="intTestTabContent">
                        <div class="tab-pane fade show active" id="interview" role="tabpanel" aria-labelledby="interview-tab">
                            <div class="row">
                                <div class="col-md-6 offset-md-3"><p>“Crowdfunding is a good financial leverage – when owning unutilized property you can take a short term loan and take action on it and develop your business. That’s what is needed to be successful in the real estate business.”</p>
</div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-md-8">
                                                                            <div class="video_wrapper js-videoWrapper">
                                            <div class="embed-responsive embed-responsive-16by9">
                                                <iframe class="embed-responsive-item videoIframe js-videoIframe" frameborder="0" allowTransparency="true" allowfullscreen src="www.youtube.com/embed/6e2Q94-4DXo?autoplay=0&amp;modestbranding=1&amp;rel=0&amp;hl=ru&amp;showinfo=0&amp;color=white"></iframe>
                                            </div>
                                            <div class="video-img-poster" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/interview-map.png);">
                                                <p>Watch the interview with entrepreneur Vilis Krištopans on opportunities with EstateGuru</p>
                                                <div class="person-img-wrapper">
                                                    <div class="person-img"  style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/03/interview_round-300x300.png);">
                                                        <button class="videoPoster js-videoPoster">
                                                            <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/play-button.svg" width="120" alt="">
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                                                    </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="textimonials" role="tabpanel" aria-labelledby="textimonials-tab">
                            <div class="row">
                                <div class="col-md-10 offset-md-1">
                                    <div class="textimonials-slider">
                                                                                        <div>
                                                    <div class="slider-item">
                                                                                                                    <div class="slider-item-img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/03/image-13-150x150.png);"></div>
                                                                                                                <h6>
                                                            <strong>Veljo Kuusk</strong>
                                                            <span>Real estate developer</span>
                                                        </h6>
                                                        <p>"EstateGuru is an efficient and proactive partner offering elaborate and well-thought-through financial solutions. For me personally, it’s of immense importance that they are with you, on the same side of the table as a partner, not in opposition to you. And they are experts in real estate. While a traditional bank is the best option in case of capital-intensive and longer projects, EstateGuru is an indispensable partner for projects up to €2-million."</p>
                                                    </div>
                                                </div>
                                                                                            <div>
                                                    <div class="slider-item">
                                                                                                                    <div class="slider-item-img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2020/03/Borrower-150x150.png);"></div>
                                                                                                                <h6>
                                                            <strong>Gert Roosaar</strong>
                                                            <span>Borrower of EstateGuru, real estate developer</span>
                                                        </h6>
                                                        <p>"Speed and flexibility are the core assets of EstateGuru. We have used crowdfunding finance to build around 90 apartments as well as commercial real estate. EstateGuru has always been just a phone-call away. In general, financing has been released even earlier than the set date. There are no hidden fees and you can pay back the loan early without any additional cost."</p>
                                                    </div>
                                                </div>
                                                                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-img-down">
                <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/eg-arrow-down.svg" width="360" alt="" class="section-arrow-img img-fluid down-img">
            </div>
        </div>
        <div class="section-have-question">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <div class="row justify-content-center">
                            <div class="col-md-7">
                                <h3>Have any questions?</h3><p>If you need any more information on loan terms or any other part of borrowing from EstateGuru, leave your contact information and our dedicated team will get back to you within two working days.</p>
<p><strong>If you’re in a hurry, you can also call us at +372 6412 777</strong></p>
                            </div>
                        </div>
                        <form id="call-back-form" class="secondary-form">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="bmd-label-floating main-label" id="yourNameQuestion">Your name</label>
                                        <input type="text" class="form-control" id="yourNameQuestion" name="name" value="">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="bmd-label-floating main-label" id="yourBusinessEmail">Your business email</label>
                                        <input type="email" class="form-control" id="yourBusinessEmail" name="email" value="">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="bmd-label-floating main-label" id="phoneQuestion">Phone (include country calling code)</label>
                                        <input type="text" class="form-control" id="phoneQuestion" name="phone" value="">
                                    </div>
                                </div>
                            </div>
                            <div class="text-center pt-md-3">
                                <button class="btn btn-cta w-auto" type="submit">Call me back!</button>
                            </div>
                            <p class="submit-text" style="display:none;"><strong>Thank you!</strong> Let's talk soon.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>



@stop