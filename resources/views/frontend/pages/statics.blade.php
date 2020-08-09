@extends('frontend/layouts/sidebar')


@section('content')

<div class="top-stats-boxmain-content job-openings-content main-content">
                    <input type="hidden" name="ignoreHeartBeat" id="ignoreHeartBeat" value="true" />

                    <div class="d-flex justify-content-between">
                        <h1 class="page-title pb-0 mb-4">
                            Tetenter statistics <br>
                            <small class="small_subtitle">Updated: 23.07.2020</small>
                        </h1>

                        
                            
                            
                                <div data-toggle="tooltip" data-placement="top"
                                     title="In order to download the loan book, please log in">
                                    <a class="btn btn-regular disabled">
                                        Download loan book
                                    </a>
                                </div>
                            
                        
                    </div>

                    <p>
                        Since founding Tetenter in 2014, we’ve helped property developers all over Europe borrow money quickly and easily, giving them access to reliable capital when they need it most. In parallel, our investors have earned market-leading returns on short-term property-backed loans.
                    </p>

                    <div class="main-stats-box estStat-main-stats-box">
                        <div class="stats-list bdrs0 list-unstyled">
                            <div class="stats-item">
                                <h3>€219,685,716</h3>
                                <span>Total money lent</span>
                            </div>

                            <div class="stats-item">
                                <h3>1,600</h3>
                                <span>Number of Loans Funded</span>
                            </div>

                            <div class="stats-item">
                                <h3>€137,304</h3>
                                <span>Average loan size</span>
                            </div>
                        </div>
                    </div>

                    <div class="main-stats-box estStat-main-stats-box">
                        <div class="stats-list bdrs0 list-unstyled">
                            <div class="stats-item">
                                <h3>58.69%</h3>
                                <span>Average loan to value</span>
                            </div>

                            <div class="stats-item">
                                <h3>14.2 months</h3>
                                <span>Average loan term of issued loans</span>
                            </div>

                            <div class="stats-item">
                                <h3>11.0 months</h3>
                                <span>Average loan term of repaid loans</span>
                            </div>
                        </div>
                    </div>

                    <div class="main-stats-box estStat-main-stats-box">
                        <div class="stats-list bdrs0 list-unstyled">
                            <div class="stats-item">
                                <h3>€16,490,198</h3>
                                <span>Investors total earnings</span>
                            </div>

                            <div class="stats-item">
                                <h3>53,594</h3>
                                <span>Investors from 106 countries</span>
                            </div>

                            <div class="stats-item">
                                <h3>11.77%</h3>
                                <span>Historical return</span>
                            </div>
                        </div>
                    </div>

                    <h2 class="mb-4">The leading marketplace for short-term property loans in Continental Europe</h2>

                    <p>Tetenter is the largest platform of its kind in Europe and already operates in five countries, with more to come. This cross-border activity offers our investors more choice, more opportunity, and better returns.</p>

                    <div class="country-chart-wrapper" id="divMapChart">
                        <div class="statics-type-chart-header justify-content-end">
                            <ul class="nav nav-tabs justify-content-end mb-3 statistics-margin-70" role="tablist">
                                
<div class="custom-checkbox-wrapper mr-3" id="divNotCheckedMapChart">
    <label onclick="updateAndRedirect('MapChart',true);">
        <input type="checkbox" disabled="disabled">
        <span class="custom-toggle-checkbox  ">
            <small class="pending">
                <span class="pending-item statistics-checkbox-en" >All</span>
            </small>
            <small class="enabled"><span class="statistics-checkbox-en" >Outstanding</span></small>
        </span>
    </label>
</div>
<div class="custom-checkbox-wrapper mr-3" id="divCheckedMapChart" style="display: none;">
    <label onclick="updateAndRedirect('MapChart',false);">
        <input type="checkbox" disabled="disabled" checked="checked">
        <span class="custom-toggle-checkbox ">
            <small class="disabled"><span >All</span></small>
            <small class="enabled"><span >Outstanding</span></small>
        </span>
    </label>
</div>
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#number" data-chartid="numberChart"
                                       role="tab" aria-controls="number" aria-selected="true">Number</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#amount" data-chartid="amountChart"
                                       role="tab" aria-controls="amount" aria-selected="true">Amount</a>
                                </li>
                            </ul>
                        </div>

                        <div class="tab-content">

                            <div class="tab-pane fade show active" id="number" role="tabpanel" aria-labelledby="number">
                                <div class="country-chart">
                                    <div class="chart-wrapper map-chart">
                                        <div id="numberChart" class="chart-container"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="amount" role="tabpanel" aria-labelledby="amount">
                                <div class="country-chart">
                                    <div class="chart-wrapper map-chart">
                                        <div id="amountChart" class="chart-container"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="growth-section">
        <div class="page-content-wrapper">
            <div class="container">
                <div class="main-content-wrapper stats-inner-content-wrapper">
                    <div class="stats-inner-content">
                        <div class="growth-chart-wrapper">
                            <h2 class="mb-4 mt-5">Growth (Loans vs Users)</h2>

                            <p class="mb-4">
                                We’ve managed to consistently grow our user base, which in turn has lead to a reliable increase in the number of loans serviced. On average, a single loan attracts 536 investors.
                            </p>

                            <ul class="nav nav-tabs justify-content-end mb-3" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#cumulative"
                                       role="tab" aria-controls="cumulative" aria-selected="true">Cumulative</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#yeartoyear"
                                       role="tab" aria-controls="yeartoyear" aria-selected="true">Monthly</a>
                                </li>
                            </ul>

                            <div class="tab-content">

                                <div class="tab-pane fade show active" id="cumulative" role="tabpanel"
                                     aria-labelledby="cumulative">
                                    <div class="country-chart">
                                        <div class="chart-wrapper line-chart-fluid">
                                            <div id="growthCumulative" class="chart-container"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade" id="yeartoyear" role="tabpanel" aria-labelledby="yeartoyear">
                                    <div class="country-chart">
                                        <div class="chart-wrapper line-chart-fluid">
                                            <div id="growthYear" class="chart-container"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="invest-type-section">
        <div class="page-content-wrapper">
            <div class="container">
                <div class="main-content-wrapper stats-inner-content-wrapper">
                    <div class="stats-inner-content">
                        <div class="invest-type-chart-wrapper">
                            <h2 class="mb-5 mt-4">
                                Each Tetenter investment opportunity is backed by collateral
                                We are currently holding €223,195,229 in collateral.
                            </h2>

                            <div class="row">
                                <div class="col-md-5 statistic-donut">
                                    <div class="statics-type-chart-header mb-4">
                                        <h3>Collateral type</h3>
                                        <ul class="nav nav-tabs light-nav-tabs justify-content-end mb-3" role="tablist">
                                            
<div class="custom-checkbox-wrapper mr-3" id="divNotCheckedDonutChart2">
    <label onclick="updateAndRedirect('DonutChart2',true);">
        <input type="checkbox" disabled="disabled">
        <span class="custom-toggle-checkbox  ">
            <small class="pending">
                <span class="pending-item statistics-checkbox-en"  style="color: white;" >All</span>
            </small>
            <small class="enabled"><span class="statistics-checkbox-en"  style="color: white;" >Outstanding</span></small>
        </span>
    </label>
</div>
<div class="custom-checkbox-wrapper mr-3" id="divCheckedDonutChart2" style="display: none;">
    <label onclick="updateAndRedirect('DonutChart2',false);">
        <input type="checkbox" disabled="disabled" checked="checked">
        <span class="custom-toggle-checkbox ">
            <small class="disabled"><span  style="color: white;" >All</span></small>
            <small class="enabled"><span  style="color: white;" >Outstanding</span></small>
        </span>
    </label>
</div>
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#coll-total"
                                                   role="tab" aria-controls="coll-total" aria-selected="true">Number</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#coll-current" role="tab"
                                                   aria-controls="coll-current" aria-selected="true">Amount</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="coll-total" role="tabpanel"
                                             aria-labelledby="coll-total">
                                            <div class="country-chart">
                                                <div class="chart-wrapper height-auto">
                                                    <div id="dountChart2CollateralTotal" class="chart-container"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane" id="coll-current" role="tabpanel"
                                             aria-labelledby="coll-current">
                                            <div class="country-chart">
                                                <div class="chart-wrapper height-auto">
                                                    <div id="dountChart2CollateralCurrent"
                                                         class="chart-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-5 statistic-donut">
                                    <div class="statics-type-chart-header mb-4">
                                        <h3>Security type</h3>
                                        <ul class="nav nav-tabs light-nav-tabs justify-content-end mb-3" role="tablist">
                                            
<div class="custom-checkbox-wrapper mr-3" id="divNotCheckedDonutChart3">
    <label onclick="updateAndRedirect('DonutChart3',true);">
        <input type="checkbox" disabled="disabled">
        <span class="custom-toggle-checkbox  ">
            <small class="pending">
                <span class="pending-item statistics-checkbox-en"  style="color: white;" >All</span>
            </small>
            <small class="enabled"><span class="statistics-checkbox-en"  style="color: white;" >Outstanding</span></small>
        </span>
    </label>
</div>
<div class="custom-checkbox-wrapper mr-3" id="divCheckedDonutChart3" style="display: none;">
    <label onclick="updateAndRedirect('DonutChart3',false);">
        <input type="checkbox" disabled="disabled" checked="checked">
        <span class="custom-toggle-checkbox ">
            <small class="disabled"><span  style="color: white;" >All</span></small>
            <small class="enabled"><span  style="color: white;" >Outstanding</span></small>
        </span>
    </label>
</div>
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#sec-total"
                                                   role="tab" aria-controls="sec-total" aria-selected="true">Number</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#sec-current" role="tab"
                                                   aria-controls="sec-current" aria-selected="true">Amount</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="sec-total" role="tabpanel"
                                             aria-labelledby="sec-total">
                                            <div class="country-chart">
                                                <div class="chart-wrapper height-auto">
                                                    <div id="dountChart3CollateralTotal" class="chart-container"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane" id="sec-current" role="tabpanel"
                                             aria-labelledby="sec-current">
                                            <div class="country-chart">
                                                <div class="chart-wrapper height-auto">
                                                    <div id="dountChart3CollateralCurrent"
                                                         class="chart-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>




    <section class="loan-type-section">
        <div class="page-content-wrapper">
            <div class="container">
                <div class="main-content-wrapper stats-inner-content-wrapper">
                    <div class="stats-inner-content">
                        <div class="loan-type-chart-wrapper">
                            <h2 class="mb-5 mt-4">
                                Why do people borrow from Tetenter?
                            </h2>

                            <p class="mb-4">
                                A short-term loan from Tetenter is designed to serve a variety of niche needs with which traditional financial institutions are often unwilling or unable to assist property developers. Due to our in-depth due diligence and strict risk analysis, Tetenter approves only around 10% of all loan applications.
                            </p>

                            <div class="row justify-content-center">
                                <div class="col-md-7">
                                    <div class="statics-type-chart-header mb-4">
                                        <h3>Loan type</h3>
                                        <ul class="nav nav-tabs justify-content-end mb-3" role="tablist">
                                            
<div class="custom-checkbox-wrapper mr-3" id="divNotCheckedDonutChart1">
    <label onclick="updateAndRedirect('DonutChart1',true);">
        <input type="checkbox" disabled="disabled">
        <span class="custom-toggle-checkbox  ">
            <small class="pending">
                <span class="pending-item statistics-checkbox-en" >All</span>
            </small>
            <small class="enabled"><span class="statistics-checkbox-en" >Outstanding</span></small>
        </span>
    </label>
</div>
<div class="custom-checkbox-wrapper mr-3" id="divCheckedDonutChart1" style="display: none;">
    <label onclick="updateAndRedirect('DonutChart1',false);">
        <input type="checkbox" disabled="disabled" checked="checked">
        <span class="custom-toggle-checkbox ">
            <small class="disabled"><span >All</span></small>
            <small class="enabled"><span >Outstanding</span></small>
        </span>
    </label>
</div>
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#loan-total"
                                                   role="tab" aria-controls="loan-total" aria-selected="true">Number</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#loan-current" role="tab"
                                                   aria-controls="loan-current" aria-selected="true">Amount</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="loan-total" role="tabpanel"
                                             aria-labelledby="loan-total">
                                            <div class="country-chart">
                                                <div class="chart-wrapper height-auto">
                                                    <div id="dountChart1" class="chart-container"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane" id="loan-current" role="tabpanel"
                                             aria-labelledby="loan-current">
                                            <div class="country-chart">
                                                <div class="chart-wrapper height-auto">
                                                    <div id="dountChartCurrent1" class="chart-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <section class="jobs-created-section"
             style="background-image: url('{{URL::to('')}}/public/assets/frontend/assets/statisticsPage/cd-img-7402a343e5aa38c0904507b5f51f84a1.jpg');">
        <div class="page-content-wrapper">
            <div class="container">
                <div class="main-content-wrapper stats-inner-content-wrapper">
                    <div class="stats-inner-content">
                        <div class="row">
                            <div class="col-md-5">
                                <h2 class="mb-4 mt-5">
                                    Jobs created
                                </h2>

                                <p class="mb-4">
                                    We’re extremely proud of the fact that our loans not only finance the building of property but also change the lives of many people across Europe. To date, we’ve helped create a significant number of jobs, and we aim to keep going
                                </p>

                                <div class="count-wrapper">
                                    

                                    
                                        <span>1</span>
                                    
                                        <span>2</span>
                                    
                                        <span>8</span>
                                    
                                        <span>0</span>
                                    
                                        <span>0</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="default-arrers-section">
        <div class="page-content-wrapper">
            <div class="container">
                <div class="main-content-wrapper stats-inner-content-wrapper">
                    <div class="stats-inner-content">
                        <div class="row">
                            <div class="col-md-5">
                                <h3 class="mb-5">Loan Portfolio</h3>

                                <p class="pt-5">
                                    Our approach to reliability is twofold. All loans are secured through mortgages, while our team of seasoned real estate professionals deeply investigate the viability of each project before we release it to our investors. This extreme diligence allows us to keep both payment arrears and loan defaults to an absolute minimum.
                                </p>
                            </div>

                            <div class="col-md-6">
                                <div class="justify-content-end mb-4">
                                    <div class="statics-type-chart-header justify-content-end">
                                        <ul class="nav nav-tabs justify-content-end mb-3 statistics-margin-70" role="tablist">
                                            
<div class="custom-checkbox-wrapper mr-3" id="divNotCheckedDefaultsAreas">
    <label onclick="updateAndRedirect('DefaultsAreas',true);">
        <input type="checkbox" disabled="disabled">
        <span class="custom-toggle-checkbox  ">
            <small class="pending">
                <span class="pending-item statistics-checkbox-en" >All</span>
            </small>
            <small class="enabled"><span class="statistics-checkbox-en" >Outstanding</span></small>
        </span>
    </label>
</div>
<div class="custom-checkbox-wrapper mr-3" id="divCheckedDefaultsAreas" style="display: none;">
    <label onclick="updateAndRedirect('DefaultsAreas',false);">
        <input type="checkbox" disabled="disabled" checked="checked">
        <span class="custom-toggle-checkbox ">
            <small class="disabled"><span >All</span></small>
            <small class="enabled"><span >Outstanding</span></small>
        </span>
    </label>
</div>
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#arrears-number"
                                                   role="tab" aria-controls="arrears-number" aria-selected="true">Number</a>
                                            </li>

                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#arrears-amount" role="tab"
                                                   aria-controls="arrears-amount" aria-selected="true">Amount</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="arrears-number" role="tabpanel"
                                         aria-labelledby="arrears-number">
                                        <div class="country-chart">
                                            <div class="chart-wrapper height-auto">
                                                <div id="defaultsAreasNumber" class="chart-container"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane" id="arrears-amount" role="tabpanel"
                                         aria-labelledby="arrears-amount">
                                        <div class="country-chart">
                                            <div class="chart-wrapper height-auto">
                                                <div id="defaultsAreasAmount" class="chart-container">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

@stop