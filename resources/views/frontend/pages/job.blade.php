    @extends('frontend/layouts/sidebar')

    @section('content')






 <div class="main-content job-openings-content">
                    <h1 class="page-title pb-0">Job openings</h1>
                                        <h2 class="subtitle-job-section">Open positions</h2>
                                        @foreach($jobs as $job)
                                                <a href="{{URL::to('')}}/admin/job_detail/{{$job->id}}" class="positons-box card">
                                <div class="pos-box-img-wrapper">
                                                                            <img src="{{URL::to('')}}/uploads/{{$job->image}}" width="32" alt="">
                                                                        <span class="position-title-desc d-sm-none"></span>
                                </div>
                                <div class="positons-descrption">
                                    <h5>
                                    	{{$job->title}} <span class="position-title-desc d-none d-sm-inline-block">{{$job->country}}</span>
                                    </h5>
                                    <p></p>
                                </div>
                                <button class="btn btn-mini-o">View</button>
                            </a>
                             @endforeach
                                                    <a href="german-country-manager/index.html" class="positons-box card">
                                <div class="pos-box-img-wrapper">
                                                                            <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/countries/de.png" width="32" alt="">
                                                                        <span class="position-title-desc d-sm-none">Germany</span>
                                </div>
                                <div class="positons-descrption">
                                    <h5>
                                    	German Country Manager <span class="position-title-desc d-none d-sm-inline-block">Germany</span>
                                    </h5>
                                    <p></p>
                                </div>
                                <button class="btn btn-mini-o">View</button>
                            </a>
                                                    <a href="spanish-country-manager/index.html" class="positons-box card">
                                <div class="pos-box-img-wrapper">
                                                                            <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/countries/es.png" width="32" alt="">
                                                                        <span class="position-title-desc d-sm-none">Barcelona, Spain</span>
                                </div>
                                <div class="positons-descrption">
                                    <h5>
                                    	Spanish Country Manager <span class="position-title-desc d-none d-sm-inline-block">Barcelona, Spain</span>
                                    </h5>
                                    <p></p>
                                </div>
                                <button class="btn btn-mini-o">View</button>
                            </a>
                                                    <a href="head-of-digital-marketing/index.html" class="positons-box card">
                                <div class="pos-box-img-wrapper">
                                                                            <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/countries/ee.png" width="32" alt="">
                                                                        <span class="position-title-desc d-sm-none">Tallinn</span>
                                </div>
                                <div class="positons-descrption">
                                    <h5>
                                    	Head of Digital Marketing <span class="position-title-desc d-none d-sm-inline-block">Tallinn</span>
                                    </h5>
                                    <p></p>
                                </div>
                                <button class="btn btn-mini-o">View</button>
                            </a>
                                                    <a href="country-manager-united-kingdom/index.html" class="positons-box card">
                                <div class="pos-box-img-wrapper">
                                                                            <img src="{{URL::to('')}}/public/assets/frontend/wp-content/themes/estateguru/static/img/content/countries/uk.png" width="32" alt="">
                                                                        <span class="position-title-desc d-sm-none">United Kingdom</span>
                                </div>
                                <div class="positons-descrption">
                                    <h5>
                                    	Country Manager United Kingdom <span class="position-title-desc d-none d-sm-inline-block">United Kingdom</span>
                                    </h5>
                                    <p></p>
                                </div>
                                <button class="btn btn-mini-o">View</button>
                            </a>
                                            <div class="section-contact-us">
                        <div class="row justify-content-center">
                            <div class="col-md-7">
                                <h2>Don't see the right position listed?</h2>
                                <p><span style="font-weight: 400;">We&#8217;re growing fast, and we&#8217;re always looking to innovate and add talented people to our team. So, even if you don&#8217;t see a suitable position listed, send us your CV and tell us why we simply must hire you and you may be in luck. Otherwise, check this page regularly, you could see your dream job listed soon.</span></p>
                                <a href="{{URL::to('')}}/tetenter/contact_us" class="btn btn-regular">contact us</a>
                            </div>
                        </div>
                    </div>
                    <div class="section-main-question card">
                        <div class="text-wrapper">
                            <h2>Why join Tetenter?</h2>
                            <p><span style="font-weight: 400;">We offer a great office environment, the opportunity for personal and career growth, and the chance to help change the real estate business across Europe and the world. We believe work should be challenging, exciting and, above all, rewarding. </span></p>
<p><span style="font-weight: 400;">Employees receive a range of benefits, a generous leave policy, and an alternative to the standard 9-5 grind, all while being part of a supportive, knowledgable, and friendly team. </span></p>
                            <a href="{{URL::to('')}}/tetenter/about">About the company</a>
                        </div>
                        <div class="img-wrapper">
                            <div class="img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2019/08/Rectangle-Copy-32%402x-1024x1024.png);"></div>
                        </div>
                    </div>
                    <div class="section-perks-benefits">
                        <div class="row justify-content-center">
                            <div class="col-sm-8">
                                <h2></h2>
                                                            </div>
                        </div>
                        <div class="row">
                                                                <div class="col-md-6 col-lg-4 mb-4">
                                        <div class="card">
                                            <div class="icon-wrapper">
                                                <i class="icon icon-member-group"></i>
                                            </div>
                                            <h5>Flexible Working</h5>
                                            <p><span style="font-weight: 400;">Short Fridays in summer and season-appropriate working hours means if you come in early, you get to leave early in summer and sleep later during the cold winter months. </span></p>
                                        </div>
                                    </div>
                                                                    <div class="col-md-6 col-lg-4 mb-4">
                                        <div class="card">
                                            <div class="icon-wrapper">
                                                <i class="icon icon-member-group"></i>
                                            </div>
                                            <h5>Extra Vacation Days</h5>
                                            <p><span style="font-weight: 400;">If you work at EstateGuru for at least two years, we&#8217;ll reward you with five additional winter vacation days between December and February.</span></p>
                                        </div>
                                    </div>
                                                                    <div class="col-md-6 col-lg-4 mb-4">
                                        <div class="card">
                                            <div class="icon-wrapper">
                                                <i class="icon icon-member-group"></i>
                                            </div>
                                            <h5>A Great Office</h5>
                                            <p><span style="font-weight: 400;">Our office in the heart of Tallinn is stocked with fruit, candy, tea, and the best coffee money can buy. We also run a winter office if you need to flee the snow and get some sun.</span></p>
                                        </div>
                                    </div>
                                                                    <div class="col-md-6 col-lg-4 mb-4">
                                        <div class="card">
                                            <div class="icon-wrapper">
                                                <i class="icon icon-member-group"></i>
                                            </div>
                                            <h5>Continued Personal Growth</h5>
                                            <p><span style="font-weight: 400;">Our annual training and education budget means you can keep growing your list of skills while you work.</span> <span style="font-weight: 400;">Each employee also gets a monthly sport and recreation bonus.</span></p>
                                        </div>
                                    </div>
                                                                    <div class="col-md-6 col-lg-4 mb-4">
                                        <div class="card">
                                            <div class="icon-wrapper">
                                                <i class="icon icon-member-group"></i>
                                            </div>
                                            <h5>International Team</h5>
                                            <p><span style="font-weight: 400;">With offices in five countries and plans to open more in the very near future, you&#8217;ll get to work with interesting, friendly people from across the globe and gain valued international experience.</span></p>
                                        </div>
                                    </div>
                                                                    <div class="col-md-6 col-lg-4 mb-4">
                                        <div class="card">
                                            <div class="icon-wrapper">
                                                <i class="icon icon-member-group"></i>
                                            </div>
                                            <h5>Career Opportunities</h5>
                                            <p><span style="font-weight: 400;">Our company policy is always to promote from within wherever possible, and we&#8217;re growing at a rapid pace. We want to offer people a career, not just a job.</span></p>
                                        </div>
                                    </div>
                                                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    </div>

    @stop