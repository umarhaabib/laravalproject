  @extends('frontend/layouts/sidebar')

  @section('content')
<div class="main-content job-openings-content job-desc-content subpage-content">
                    <div class="action-content-heading">
                        <h1 class="page-title pb-0 mb-0">
                            <a href="../index.html" class="btn-job-back">
                            	<i class="zmdi zmdi-arrow-left"></i>
                            </a>
                            <span>Join the team</span>
                        </h1>
                                                    <div class="btn-action-wrapper">
                                                                    <a href="../country-manager-united-kingdom/index.html" class="btn-job-next">
                                        <i class="zmdi zmdi-chevron-right"></i>
                                    </a>
                                                            </div>
                                            </div>
                    <div class="section-head card">
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-lg-9">
                                <i class="icon icon-est-icon icon-heading"></i>
                                <h6>Join Tetenter in  as</h6>
                                <h1>{{$job->title}} &#8211; {{$job->country}}</h1>
                                                                <a href="#" class="btn-apply-form">
                            		Apply now                            		<i class="icon icon-arrow-down-24"></i>
                            	</a>
                            </div>
                        </div>
                    </div>
                    <div class="section-regular-text">
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-lg-9">
                                <div class="card">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-9">
                                                                                        <div class="section-item" id="apply-block">
                                                <h3>Apply now and let's get in touch!</h3>
                                                <form role="form" method="post" action="{{URL::to('')}}/admin/acceptjob" enctype="multipart/form-data">
		                                          {{csrf_field()}}

                                                    <div class="form-group short-group">
                                                        <label class="bmd-label-floating main-label">My Email</label>
                                                        <input type="email" class="form-control" name="email" required>
                                                    </div>
                                                    <div class="form-group short-group">
                                                        <label class="bmd-label-floating main-label">My LinkedIn url</label>
                                                        <input type="text" class="form-control" name="linkedin_url" required>
                                                    </div>
                                                    <div class="form-group short-group pt-4">
                                                        <label class="bmd-label-floating main-label file-label">
                                                            <span class="file-label-text form-control not-read-only">Upload CV</span>
                                                            <input type="file"  class="form-control" name="image" required>
                                                            <span class="btn btn-mini-o">Browse</span>
                                                        </label>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="bmd-label-floating main-label">Additional info (optional)</label>
                                                        <input type="text" class="form-control" name="additional_info">
                                                    </div>
                                                    <div class="form-group pt-4">
                                                        <input type="submit" class="btn btn-regular">
                                                        
                                                    </div>
                                                    <p class="explanation-text">* Your information will be kept confidential, we will contact you for further requests.</p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section-perks-benefits">
                        <div class="row justify-content-center">
                            <div class="col-sm-8">
                                <h2></h2>
                                <div class="benefits-desc"></div>
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
                                            <p><span style="font-weight: 400;">If you work at Tetenter for at least two years, we&#8217;ll reward you with five additional winter vacation days between December and February.</span></p>
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
                    <div class="section-main-question card">
                        <div class="text-wrapper">
                            <h2>Why join Tetenter?</h2>
                            <p><span style="font-weight: 400;">We offer a great office environment, the opportunity for personal and career growth, and the chance to help change the real estate business across Europe and the world. We believe work should be challenging, exciting and, above all, rewarding. </span></p>
<p><span style="font-weight: 400;">Employees receive a range of benefits, a generous leave policy, and an alternative to the standard 9-5 grind, all while being part of a supportive, knowledgable, and friendly team. </span></p>
                            <a href="../../contact/index.html" class="btn btn-regular">contact us</a>
                        </div>
                        <div class="img-wrapper">
                            <div class="img" style="background-image: url(({{URL::to('')}}public/assets/frontend/wp-content/uploads/2019/08/Rectangle-Copy-32%402x-1024x1024.png);"></div>
                        </div>
                    </div>                       @foreach($jobs as $job)
                                                <a href="{{URL::to('')}}/admin/job_detail/{{$job->id}}" class="positons-box card">
                                <div class="pos-box-img-wrapper">
                                                                            <img src="{{URL::to('')}}/uploads/{{$job->image}}" width="32" alt="">
                                                                        <span class="position-title-desc d-sm-none"></span>
                                </div>
                                <div class="positons-descrption">
                                    <h5>
                                    	{{$job->title}} - <span class="position-title-desc d-none d-sm-inline-block">{{$job->country}}</span>
                                    </h5>
                                    <p></p>
                                </div>
                                <button class="btn btn-mini-o">View</button>
                            </a>
                            @endforeach
                                                    
                                        </div>
            </div>
        </div>
    </div>
</section>




@stop