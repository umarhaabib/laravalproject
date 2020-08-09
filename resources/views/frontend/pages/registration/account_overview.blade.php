@extends('frontend/layouts/account_layout')


@section('content')
<div class="page-content-wrapper">
        <div class="container">
            
            <div class="main-content-wrapper">
                
<script>
    openCloseSiteBar();
</script>
<div class="sidebar">
    <button class="btn-sidebar">
        <i class="icon"></i>
    </button>
    <ul class="sidebar-menu-list list-unstyled">
        <li class="active">
            <a href="/portal/portfolio/overview">
                <span class="icon-wrapper">
                    <i class="icon icon-dashboard-24"></i>
                </span>
                Account overview
            </a>
        </li>

        <li>
                <a href="/portal/portfolio/messages?tab=Messages">
                    <span class="icon-wrapper">
                        <i class="icon icon-messages-24"></i>
                        
                    </span>
                    Messages
                </a>
        </li>
    </ul>
    <h4 class="small">
        <span>Investing</span>
    </h4>
    <ul class="sidebar-menu-list list-unstyled">
        <li>
            <a href="/portal/investment/main">
                <span class="icon-wrapper">
                    <i class="icon icon-loans-24"></i>
                </span>
                Primary Market
            </a>
        </li>
        
            
                

                <li>
                    <a href="/portal/secondaryMarket/index">
                        <span class="icon-wrapper">
                            <i class="icon icon-aftermarket-24"></i>
                        </span>
                        Secondary Market
                    </a>
                    <span class="badge badge-disabled main-side-badge">
                        InActive
                    </span>
                </li>
            

            <li>
                <a href="/portal/autoInvest/index">
                    <span class="icon-wrapper">
                        <i class="icon icon-autoinvest-24"></i>
                    </span>
                    Auto Invest
                </a>
                
                <span id="autoinvestStatus" class="badge badge-paused main-side-badge">
                        Disabled
                </span>

            </li>
        
    </ul>
    <h4 class="small">
        <span>My portfolio</span>
    </h4>
    <ul class="sidebar-menu-list list-unstyled">
        <li>
            <a href="/portal/portfolio/details">
                <span class="icon-wrapper">
                    <i class="icon icon-portfolio-24"></i>
                </span>
                Portfolio overview
            </a>
        </li>
        <li>
            <a href="/portal/investment/documents">
                <span class="icon-wrapper">
                    <i class="icon icon-folder-24"></i>
                </span>
                Documents
            </a>
        </li>
    </ul>
    <h4 class="small">
        <span>Account balance</span>
    </h4>
    <ul class="sidebar-menu-list list-unstyled">
        <li>
            <a href="/portal/portfolio/account">
                <span class="icon-wrapper">
                    <i class="icon icon-account-balance-24"></i>
                </span>
                Account balance overview
            </a>
        </li>
        <li>
            <a href="/portal/portfolio/deposit">
                <span class="icon-wrapper">
                    <i class="icon icon-depo-24"></i>
                </span>
                Deposit / Withdraw
            </a>
        </li>
    </ul>

    <div class="sidebar-action">
        <a href="/portal/portfolio/deposit" class="btn btn-double-o">
            <label>Add funds</label>
            <span class="small light">
                Available: €0.00
            </span>
        </a>

        <p>
            <a href="/portal/account/referrals">Invite a friend</a> and earn <strong>0.5%</strong> more
        </p>
    </div>
</div>

                <div class="main-content">
                
                


                    <h1 class="page-title">Account overview
                    



                    </h1>
                    <section class="section">
                        <div class="section-content">
                            <div class="row cards-row">
    <div class="col-12 col-lg-4">
        <div id="divMyLoansPortfolio" class="card">
    <div class="card-header">
        <h5 class="card-subtitle">
            Outstanding Portfolio
        </h5>
        <h4 class="card-title">
            
                0
            

        </h4>
        <div class="action-dropdown dropdown">
            <button class="btn btn-link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="zmdi zmdi-more-vert"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
                <a onclick="changeLoanPortfolioViewMode('1', '57969')" class="dropdown-item" href="#">Number</a>
                <a onclick="changeLoanPortfolioViewMode('0', '57969')" class="dropdown-item" href="#">Amount</a>
            </div>
        </div>
    </div>
    <hr>
    
        <div class="card-body">
    <ul class="details-list">
        <li class="detail-item ">
            <div class="detail-item-header">
                
    Current


                <span class="item-value">0</span>
            </div>
        </li>
        <li class="detail-item ">
            <div class="detail-item-header">
                
    4-15 days late


                <span class="item-value">0</span>
            </div>
        </li>
        <li class="detail-item ">
            <div class="detail-item-header">
                
    16-30 days late


                <span class="item-value">0</span>
            </div>
        </li>
        <li class="detail-item ">
            <div class="detail-item-header">
                
    31-60 days late


                <span class="item-value">0</span>
            </div>
        </li>
        <li class="detail-item ">
            <div class="detail-item-header">
                
    60+ days late


                <span class="item-value">0</span>
            </div>
        </li>
        <li class="detail-item ">
            <div class="detail-item-header">
                
    In default


                <span class="item-value">0</span>
            </div>
            





        </li><li class="detail-item ">
            <div class="detail-item-header">
                
    Total


                <span class="item-value">0</span>
            </div>
        </li>
    </ul>
</div>
<div class="card-header">
    <h5 class="card-subtitle">
        Historical Portfolio
    </h5>
</div>
<hr>
<div class="card-body">
    <ul class="details-list">
        <li class="detail-item ">
            <div class="detail-item-header">
                
    Repaid


                <span class="item-value">0</span>
            </div>
        </li>
    </ul>
</div>
    

    
    
        <div class="card-footer">
            <a href="/portal/portfolio/details" class="btn btn-block btn-cta-o">Details</a>
        </div>
    
    
</div>

<script>

    jQuery(document).ready(function () {
        setCookie("num_amnt", '1',1000);
    });

    function changeLoanPortfolioViewMode(viewMode, userId) {

        setCookie("num_amnt", viewMode,1000);
        jQuery.ajax({
            url: "/portal/portfolio/ajaxMyLoansPortfolio?prevAction=overview",
            type: "POST",
            dataType: 'text',
            data: {viewMode: viewMode, userId: userId},
            success: function (result) {
                $("#divMyLoansPortfolio").html(result);
            }
        });
    }

</script>
    </div>
    <div class="col-12 col-lg-4">
        
<div class="card">
    <div class="card-header">
        <h5 class="card-subtitle">
            Annual Return
            <button type="button" class="btn-action btn-action-primary tooltips-initialized" style="pointer-events: visible;" data-toggle="tooltip" data-placement="top" title="" data-original-title="The annual return is calculated from repaid loans and considers all income from your investment - interest, penalties, indemnities plus the borrower's bonus, cash-back bonus and referral bonus. The annualised return does not consider secondary market profit, loss or fees.">
                <i class="zmdi zmdi-info-outline"></i>
            </button>
        </h5>
        <h4 class="card-title">0.00%</h4>
    </div>
    <hr>
    <div class="card-body">
        <ul class="details-list">
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Interest</span>
                    <span class="item-value">€0.00</span>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Penalties</span>
                    <span class="item-value">€0.00</span>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Referrals</span>
                    <span class="item-value">€0.00</span>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Bonus</span>
                    <span class="item-value">€0.00</span>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Cashback</span>
                    <span class="item-value">€0.00</span>
                </div>
            </li>
            <li class="detail-item">
                <div class="detail-item-header">
                    <span class="item-label">Secondary market profit/loss</span>
                    <span class="item-value">
                        €0.00
                    </span>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Total</span>
                    <span class="item-value">€0.00</span>
                </div>
            </li>
            
                <li class="detail-item ">
                    <div class="detail-item-header collapse-toggle collapsed" data-toggle="collapse" data-target="#collapseFees" aria-expanded="false" aria-controls="collapseFees">
                        <span class="item-label">Total Fees</span>
                        <span class="item-value">
                            €0.00
                        </span>
                    </div>
                    <div class="collapse" id="collapseFees">
                        <ul class="details-list">
                            <li class="detail-item">
                                <div class="detail-item-header">
                                    <span class="item-label">Secondary market seller fees</span>
                                    <span class="item-value">
                                        €0.00
                                    </span>
                                </div>
                            </li>
                            <li class="detail-item">
                                <div class="detail-item-header">
                                    <span class="item-label">Withdrawal fees</span>
                                    <span class="item-value">
                                        €0.00
                                    </span>
                                </div>
                            </li>
                            <li class="detail-item">
                                <div class="detail-item-header">
                                    <span class="item-label">Trustly fees</span>
                                    <span class="item-value">
                                        €0.00
                                    </span>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </li>
            
        </ul>
    </div>
    
        <div class="card-footer">
            
                <p class="card-footer-text">1 loan available </p>
            
            <a href="/portal/investment/main" class="btn btn-block btn-cta-o">Invest</a>
        </div>
    
</div>

    </div>
    <div class="col-12 col-lg-4">
        <div class="card">
    <div class="card-header">
        <h5 class="card-subtitle">Account Balance</h5>
        <h4 class="card-title">
            €0.00
        </h4>
    </div>
    <hr>
    <div class="card-body">
        <ul class="details-list">
            <li class="detail-item ">
                <div class="detail-item-header collapse-toggle collapsed" data-toggle="collapse" data-target="#collapse0" aria-expanded="false" aria-controls="collapse0">
                    <span class="item-label">Total Account Value</span>
                    <span class="item-value">
                        €0.00
                    </span>
                </div>
                <div class="collapse" id="collapse0">
                    <ul class="details-list">
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Deposit</span>
                                <span class="item-value">
                                    €0.00
                                </span>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header collapse-toggle collapsed" data-toggle="collapse" data-target="#collapseIncome" aria-expanded="false" aria-controls="collapseIncome">
                                <span class="item-label">Income/revenue</span>
                                <span class="item-value">
                                    €0.00
                                </span>
                            </div>
                            <div class="collapse" id="collapseIncome">
                                <ul class="details-list">
                                    <li class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="item-label">Interest earned</span>
                                            <span class="item-value">
                                                €0.00
                                            </span>
                                        </div>
                                    </li>
                                    <li class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="item-label">Penalties Received</span>
                                            <span class="item-value">
                                                €0.00
                                            </span>
                                        </div>
                                    </li>
                                    <li class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="item-label">Referrals</span>
                                            <span class="item-value">
                                                €0.00
                                            </span>
                                        </div>
                                    </li>
                                    <li class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="item-label">Bonus</span>
                                            <span class="item-value">
                                                €0.00
                                            </span>
                                        </div>
                                    </li>
                                    <li class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="item-label">Cashback</span>
                                            <span class="item-value">
                                                €0.00
                                            </span>
                                        </div>
                                    </li>
                                    <li class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="item-label">Secondary market profit/loss</span>
                                            <span class="item-value">
                                                €0.00
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header collapse-toggle collapsed" data-toggle="collapse" data-target="#collapseWithdraw" aria-expanded="false" aria-controls="collapseWithdraw">
                                <span class="item-label">Withdrawals</span>
                                <span class="item-value">
                                    - €0.00
                                </span>
                            </div>
                            <div class="collapse" id="collapseWithdraw">
                                <ul class="details-list">
                                    <li class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="item-label">In payment</span>
                                            <span class="item-value">
                                                - €0.00
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Fees</span>
                                <span class="item-value">
                                    - €0.00
                                </span>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Pending incoming
                                    <button type="button" class="btn-action btn-action-primary tooltips-initialized" style="pointer-events: visible;" data-toggle="tooltip" data-placement="top" title="" data-original-title="Secondary market outgoing and incoming transactions are initially marked as “pending” and confirming these transactions might acquire up to 1 business day.">
                                        <i class="zmdi zmdi-info-outline"></i>
                                    </button>
                                </span>
                                <span class="item-value">
                                    €0.00
                                </span>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Pending outgoing
                                    <button type="button" class="btn-action btn-action-primary tooltips-initialized" style="pointer-events: visible;" data-toggle="tooltip" data-placement="top" title="" data-original-title="Secondary market outgoing and incoming transactions are initially marked as “pending” and confirming these transactions might acquire up to 1 business day.">
                                        <i class="zmdi zmdi-info-outline"></i>
                                    </button>
                                </span>
                                <span class="item-value">
                                    - €0.00
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header collapse-toggle collapsed" data-toggle="collapse" data-target="#collapseInvested" aria-expanded="false" aria-controls="collapseInvested">
                    <span class="item-label">Invested</span>
                    <span class="item-value">
                        - €0.00
                    </span>
                </div>
                <div class="collapse" id="collapseInvested">
                    <ul class="details-list">
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Total Investments</span>
                                <span class="item-value">
                                    - €0.00
                                </span>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Principal Returned</span>
                                <span class="item-value">
                                    €0.00
                                </span>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Purchased Investments</span>
                                <span class="item-value">
                                    - €0.00
                                </span>
                            </div>
                        </li>
                        <li class="detail-item">
                            <div class="detail-item-header">
                                <span class="item-label">Sold Investments</span>
                                <span class="item-value">
                                    €0.00
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="detail-item ">
                 <div class="detail-item-header">
                    <span class="item-label">
                        Reserved
                         <button type="button" class="btn-action btn-action-primary tooltips-initialized" style="pointer-events: visible;" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reserved balance indicates investments that are not funded yet. Funding process can take up to 15 calendar days + 10 working days. See user &amp; loan terms for further details.">
                             <i class="zmdi zmdi-info-outline"></i>
                         </button>
                    </span>
                    <span class="item-value">
                        - €0.00
                    </span>
                </div>
            </li>
            <li class="detail-item total-item">
                <div class="detail-item-header">
                    <span class="item-label">Available Amount</span>
                    <span class="item-value">
                        €0.00
                    </span>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Pending outgoing
                        <button type="button" class="btn-action btn-action-primary tooltips-initialized" style="pointer-events: visible;" data-toggle="tooltip" data-placement="top" title="" data-original-title="Secondary market outgoing and incoming transactions are initially marked as “pending” and confirming these transactions might acquire up to 1 business day.">
                            <i class="zmdi zmdi-info-outline"></i>
                        </button>
                    </span>
                    <span class="item-value">
                        - €0.00
                    </span>
                </div>
            </li>
            <li class="detail-item ">
                <div class="detail-item-header">
                    <span class="item-label">Pending incoming
                        <button type="button" class="btn-action btn-action-primary tooltips-initialized" style="pointer-events: visible;" data-toggle="tooltip" data-placement="top" title="" data-original-title="Secondary market outgoing and incoming transactions are initially marked as “pending” and confirming these transactions might acquire up to 1 business day.">
                            <i class="zmdi zmdi-info-outline"></i>
                        </button>
                    </span>
                    <span class="item-value">
                        €0.00
                    </span>
                </div>
            </li>
        </ul>
    </div>
    
        <div class="card-footer">
            <a href="/portal/portfolio/deposit" class="btn btn-block btn-cta">Add Funds</a>
        </div>
    

</div>

    </div>
</div>
                        </div>
                    </section>
                    <section class="section secion-promotion">
                        

                    </section>
                     <section class="section section-key-statistics" id="divKeyStatistics">
                         <div class="card mb-5">
    <div class="btn-wrapper px-4">
        <button class="btn btn-link btn-main-collapse" type="button" data-toggle="collapse" data-target="#sectionKeyStatistics" aria-expanded="false" aria-controls="sectionKeyStatistics">
            Key statistics
            <i class="zmdi zmdi-chevron-down"></i>
            <i class="zmdi zmdi-chevron-up"></i>
        </button>
    </div>

    <div class="collapse px-md-4 show" id="sectionKeyStatistics">
        <div class="section-content">
            <ul class="nav nav-tabs justify-content-end mb-3 mr-3" role="tablist">
                <li class="nav-item">
                    <a onclick="ajaxSwitchKeyStatisticsTab(this.id,'/portal/portfolio/ajaxGetAllKeyStatsOverview');" class="nav-link active not-href" id="linkKeyStatisticsAll" tabindex="1">
                        All Loans
                    </a>
                </li>
                <li class="nav-item">
                    <a onclick="ajaxSwitchKeyStatisticsTab(this.id, '/portal/portfolio/ajaxGetOutstandingKeyStatsOverview');" class="nav-link not-href" id="linkKeyStatisticsOutstanding" tabindex="2">
                        Outstanding Loans
                    </a>
                </li>
            </ul>
            <div class="card section_key_statistics-no-box">
                <div class="card-body">
                    <div class="charts-row">
                        
                            <table class="table text-md-nowrap no-data-table">
    <thead>
    <tr>
        <th></th>
    </tr>
    </thead>
    <tbody><tr>
    <td colspan="1" rowspan="3" class="text-center">
        <div class="no-data-inner">
            <span>
                <i class="zmdi zmdi-folder"></i>
            </span>
            <p>No data here</p>
        </div>
    </td>
</tr>
</tbody></table>

                        
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<script>
    
    function ajaxSwitchKeyStatisticsTab(id,url){
        $(".nav-link").removeClass('active');
        jQuery.ajax({
            url: url,
            type: "GET",
            success: function (result) {
                $("#divKeyStatistics").html(result);
                addRemoveActiveClassFromKey(id);
            }
        })
    }

    function addRemoveActiveClassFromKey(id) {
        $(".nav-link").removeClass('active');
        $("#" + id).addClass('active');
    }

</script>
                     </section>

                    <section class="section">
                        
    
    
        
        
        
    


    
        

            
                
            
            
                
            
        
    


<div class="card mb-5">
    <div class="btn-wrapper px-4">
        <button class="btn btn-link btn-main-collapse expanded" type="button" data-toggle="collapse" data-target="#sectionNewsUpdates" aria-expanded="false" aria-controls="collapseFAQ">
            News
            <i class="zmdi zmdi-chevron-down"></i>
            <i class="zmdi zmdi-chevron-up"></i>
        </button>
    </div>

    <div class="show px-md-4" id="sectionNewsUpdates">
        <div class="section-content">
            <div class="row cards-row">

                <div class="col-md-12 col-lg-12 mb-md-4 mb-xl-0">
                    
<div class="card section_key_statistics-no-box">
    <div class="card-body news-card-body">
        <ul class="list-unstyled">
            
                <li class="">
                    <a class="media" href="https://blog.estateguru.co/video-case-study-raising-money-for-a-new-development-in-just-a-few-hours/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://blog.estateguru.co/wp-content/uploads/2020/07/Header-image.jpg" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                Video Case Study: Raising money for a new development in just a few hours
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">24/07/2020</h5>
                        </div>
                    </a>
                </li>
            
                <li class="">
                    <a class="media" href="https://blog.estateguru.co/how-our-diversification-works-for-you/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://blog.estateguru.co/wp-content/uploads/2020/07/Header.jpg" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                How our diversification works for you
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">21/07/2020</h5>
                        </div>
                    </a>
                </li>
            
                <li class="">
                    <a class="media" href="https://estateguru.co/news-and-press/second-quarter-results-2020-estateguru-increased-its-revenues-in-h1-by-65/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://estateguru.co/wp-content/uploads/2020/07/H1-Site-300x169.jpg" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                Second Quarter Results 2020: EstateGuru increased its revenues in H1 by 65%
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">15/07/2020</h5>
                        </div>
                    </a>
                </li>
            
                <li class="">
                    <a class="media" href="https://blog.estateguru.co/loan-portfolio-overview-june-2020/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://blog.estateguru.co/wp-content/uploads/2020/07/English-blog-1.jpg" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                Loan portfolio overview – June 2020
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">13/07/2020</h5>
                        </div>
                    </a>
                </li>
            
                <li class="">
                    <a class="media" href="https://blog.estateguru.co/estategurus-audited-annual-report-2019/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://blog.estateguru.co/wp-content/uploads/2020/07/English-blog.jpg" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                EstateGuru’s audited annual report – 2019
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">03/07/2020</h5>
                        </div>
                    </a>
                </li>
            
                <li class="">
                    <a class="media" href="https://blog.estateguru.co/borrower-case-study-e760-000-development-loan-in-five-days/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://blog.estateguru.co/wp-content/uploads/2020/06/ENG.jpg" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                Borrower case study – €760 000 development loan in five days
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">29/06/2020</h5>
                        </div>
                    </a>
                </li>
            
                <li class="">
                    <a class="media" href="https://estateguru.co/news-and-press/estateguru-exceeds-e350k-funding-target-by-252/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://estateguru.co/wp-content/uploads/2019/11/Logo1200x1200-300x300.jpg" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                EstateGuru exceeds €350K funding target by 252 %
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">08/06/2020</h5>
                        </div>
                    </a>
                </li>
            
                <li class="">
                    <a class="media" href="https://estateguru.co/news-and-press/estateguru-funding-campaign-oversubscribed-within-two-weeks/" target="_blank">
                        <div class="img" style="background-image: url('/portal/news/showPressPhoto');"></div>
                        <img class="mr-3" src="https://estateguru.co/wp-content/uploads/2020/05/seedrsroppe-300x178.png" width="80px" alt="Generic placeholder image">
                        <div class="media-body">
                            <h3 class="text-clamp-2">
                                EstateGuru’s funding campaign on Seedrs is oversubscribed 180% within two weeks
                            </h3>
                            <h5 class="mt-0 mb-1 card-date-title">20/05/2020</h5>
                        </div>
                    </a>
                </li>
            
        </ul>
    </div>
    <div class="card-footer text-right">
        <a href="https://estateguru.co/news-and-press">
            See all news<i class="zmdi zmdi-chevron-right"></i>
        </a>
    </div>
</div>
                </div>
            </div>
        </div>
    </div>
</div>
                    </section>
                    
    <div class="card ">
        <div class="btn-wrapper px-4">
            <button class="btn btn-link btn-main-collapse expanded" type="button" data-toggle="collapse" data-target="#collapseFAQ" aria-expanded="false" aria-controls="collapseFAQ">
                Getting Started
                <i class="zmdi zmdi-chevron-down"></i>
                <i class="zmdi zmdi-chevron-up"></i>
            </button>
        </div>
        <div class="show collapseFAQ px-md-4" id="collapseFAQ">
            <div class="collapse-account-info">
                <section class="section-faq">
                    <ul class="faq-list accordion" id="faqListAccordion">
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse0" role="button" aria-expanded="false" aria-controls="FAQcollapse0">
                                    <i class="zmdi"></i>How to change your account details?</a>
                                <div class="collapse" id="FAQcollapse0" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        In order to change your account details such as bank account details, e-mail account or your name, please contact EstateGuru support via info@estateguru.co and we will do the change for you.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse1" role="button" aria-expanded="false" aria-controls="FAQcollapse1">
                                    <i class="zmdi"></i>How to share your account with other selected users?</a>
                                <div class="collapse" id="FAQcollapse1" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        In order to share your account with family members or your third party service providers, please go to "My account" sheet and enter the invitee's e-mail under "Account sharing" tab. After sending the invitation, the invited person needs to accept the invitation via their e-mail. After accepting the invitation they can view your account details. Please be aware that the invited person needs to have a registered account on the EstateGuru.co marketplace.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse2" role="button" aria-expanded="false" aria-controls="FAQcollapse2">
                                    <i class="zmdi"></i>What is a Referral Bonus?</a>
                                <div class="collapse" id="FAQcollapse2" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        EstateGuru investors can earn an extra bonus by inviting their friends, acquaintances, and family members to join the platform. To receive your bonus, you should share your personal referral code (your EGU code) with the potential new investor. You can find your code at the top of your virtual account page or under the referral program sub-menu in the account settings section. For each new investor who joins and provides your code, we will give you a 0.5% bonus on any investment they make in the first three months after their account activation. This bonus will be credited to your investment account after the project the friend invested in gets funded. The same bonus is given to your friend, who also earns a 0.5% bonus on their first three months of investment.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3" role="button" aria-expanded="false" aria-controls="FAQcollapse3">
                                    <i class="zmdi"></i>What is EstateGuru?</a>
                                <div class="collapse" id="FAQcollapse3" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        We are an online peer-to-peer (p2p) debt funding platform where property developers and entrepreneurs can borrow funds from abroad international investor base and investors can invest in secured property loans. Currently, the borrowers and properties are in Estonia, Latvia, Lithuania, Finland, Germany, Portugal and Spain whereas investments reach us from 108 countries.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse4" role="button" aria-expanded="false" aria-controls="FAQcollapse4">
                                    <i class="zmdi"></i>What payment options are accepted by EstateGuru?</a>
                                <div class="collapse" id="FAQcollapse4" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        Users are welcome to make their deposits to EstateGuru via SEPA payments, LHV bank link, but also through third party service providers such as Transferwise, Lemonway and Paysera. A user's first deposit is the means to verify the bank account, hence the first deposit needs to be done from the investor's personal bank account!
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse5" role="button" aria-expanded="false" aria-controls="FAQcollapse5">
                                    <i class="zmdi"></i>How is my investment secured?</a>
                                <div class="collapse" id="FAQcollapse5" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        All the loans are backed with a mortgage. 

Once the loan is fully invested, the borrower has to go to the notary office and enter into an agreement with the Security Agent to create a mortgage. The mortgage will then be registered at the Land Register (with the Security Agent as mortgagee on behalf of the investors). 

The Security Agent is a separate limited liability company whose primary purpose is to hold securities for the benefit of investors making investments via EstateGuru. The name of the entity is EstateGuru Tagatisagent OÜ. The entity is controlled by the leading Baltic law office of Triniti
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse6" role="button" aria-expanded="false" aria-controls="FAQcollapse6">
                                    <i class="zmdi"></i>What is the EstateGuru referral program and how does it work?</a>
                                <div class="collapse" id="FAQcollapse6" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        The EstateGuru referral program allows our users to earn extra money. In order to become a part of our referral program, you'll have to register with us. Once registered, you can share your personal referral code with your friends. If your friend registers using your referral code and makes an investment, we will add a 0.5% bonus of the total confirmed investments made by your friend into successfully funded projects to your and your friend's accounts for the first three months of their EstateGuru membership. With this money, you can make investments, pay back loan repayments or withdraw it to your bank account!
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse7" role="button" aria-expanded="false" aria-controls="FAQcollapse7">
                                    <i class="zmdi"></i>What are the benefits of investing via EstateGuru?</a>
                                <div class="collapse" id="FAQcollapse7" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        EstateGuru makes it easy for investors to access a variety of real estate investments with a relatively small amount of capital. The minimum amount for investment is €50, which enables investors to create a diversified portfolio. All loans are secured with a mortgage.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse8" role="button" aria-expanded="false" aria-controls="FAQcollapse8">
                                    <i class="zmdi"></i>I have registered, but have not received my confirmation email.</a>
                                <div class="collapse" id="FAQcollapse8" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        If you have not received the confirmation email after registration, please check your spam folder first. In most cases, you will find the email there. If you still have not received the letter, please send us an email to info@estateguru.co
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse9" role="button" aria-expanded="false" aria-controls="FAQcollapse9">
                                    <i class="zmdi"></i>What happens to my established contracts if EstateGuru goes into bankruptcy?</a>
                                <div class="collapse" id="FAQcollapse9" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        EstateGuru is a facilitator of real investments, we do not offer the management of assets. All investment contracts are signed between the borrower and the investor, EstateGuru simply facilitates this transaction. All client funds are separated from EstateGuru’s operational funds. Should EstateGuru suffer financial difficulties or go bankrupt, client funds are safe and can still be accessed. In such an unlikely event, a contractual entity will be appointed to take over the role of EstateGuru to serve all the investments.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse10" role="button" aria-expanded="false" aria-controls="FAQcollapse10">
                                    <i class="zmdi"></i>Does EstateGuru guarantee my loans?</a>
                                <div class="collapse" id="FAQcollapse10" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        EstateGuru is not a bank, thus we do not fall under the scope of banking laws and regulations. Like with most forms of investing, peer-to-peer lending carries a degree of risk. We reduce this risk to our investors by conducting thorough due diligence and by taking asset security on every loan, in case the borrower is unable to repay their loan. EstateGuru does not guarantee your loans.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse11" role="button" aria-expanded="false" aria-controls="FAQcollapse11">
                                    <i class="zmdi"></i>If all loans are secured, why don't the borrowers approach banks?</a>
                                <div class="collapse" id="FAQcollapse11" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        After the credit crunch and the resultant recession, the risk appetite of banks was reduced significantly, which means that banks have tightened their lending criteria. Banks have strict criteria, which is not borrower friendly and thus many loan applications are rejected by banks. 

EstateGuru is a small and flexible organization which is willing to help companies that are denied financing by banks despite their strong business plan and solid collateral.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse12" role="button" aria-expanded="false" aria-controls="FAQcollapse12">
                                    <i class="zmdi"></i>What is the difference between secured and unsecured lending and why is secured lending better?</a>
                                <div class="collapse" id="FAQcollapse12" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        An unsecured loan is a loan which does not have any collateral in place, such as land or apartment, and is solely based on a borrower’s credit history and potential ability to repay. Secured loans have assets as collateral so that if a borrower cannot repay the loan, EstateGuru's security agent represented by a law firm Triniti will start the asset sales process. Hereby, the risk of losing the money is minimized..
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse13" role="button" aria-expanded="false" aria-controls="FAQcollapse13">
                                    <i class="zmdi"></i>How do I start investing in EstateGuru?</a>
                                <div class="collapse" id="FAQcollapse13" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        First you need to sign up as an investor on our platform.
    Then you need to visit your email account and activate your user account.
    Before you are allowed to start investing, you are required to send us an accurate copy of your government-issued identification document, fill in the required AML information and an appropriateness questionnaire.
    Transfer money to your EstateGuru virtual account. 
    Choose a loan you would like to invest in. 
    All loan repayments and interest accrued is held on your EstateGuru account.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse14" role="button" aria-expanded="false" aria-controls="FAQcollapse14">
                                    <i class="zmdi"></i>What are the fees for investors?</a>
                                <div class="collapse" id="FAQcollapse14" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        Majority of the fees are covered by the borrowers. However, EstateGuru charges a 2% fee for selling claims via the secondary market function (the fee is applied to the seller) and a €1 service fee which is calculated and charged every time an investor withdraws funds from the virtual account.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse15" role="button" aria-expanded="false" aria-controls="FAQcollapse15">
                                    <i class="zmdi"></i>Where is the investors' money held?</a>
                                <div class="collapse" id="FAQcollapse15" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        Investors' money is held in a separate client money bank account. The account is separate from EstateGuru’s operational bank account and is protected in the unlikely event that anything happens with EstateGuru. Any uninvested money that is in your account can be withdrawn instantly.
Disclaimer: during 2020 we are importing all user accounts to a third party service provider Lemonway. As a result, each investor will receive a personal IBAN code to use for your payments.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse16" role="button" aria-expanded="false" aria-controls="FAQcollapse16">
                                    <i class="zmdi"></i>Is it possible to invest though a company?</a>
                                <div class="collapse" id="FAQcollapse16" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        Yes. You need to create an investor account with your own name and in the end of the registration form, you have to choose “Select this if you represent a company”. Make sure to add the full name of your business and the correct registry code. Before investing you are required to send us an accurate copy of your government-issued identification document.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse17" role="button" aria-expanded="false" aria-controls="FAQcollapse17">
                                    <i class="zmdi"></i>Is the interest rate fixed?</a>
                                <div class="collapse" id="FAQcollapse17" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        Yes, the interest rate paid by the borrower is fixed throughout the loan period. The payment frequency and interest rate can vary depending on the loan type.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse18" role="button" aria-expanded="false" aria-controls="FAQcollapse18">
                                    <i class="zmdi"></i>Am I obligated to pay tax on interest that I receive?</a>
                                <div class="collapse" id="FAQcollapse18" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        The interest that you receive from borrowers is gross income, which means that EstateGuru does not deduct any tax from the amount. All interest earned from loans is treated by tax authorities as investment income and thus subject to income tax. Investors have the possibility to postpone paying the income tax by investing through a juridical entity, but will still be liable for tax. EstateGuru does not provide tax-related advice and recommend that you turn to a local tax advisor for additional information.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse19" role="button" aria-expanded="false" aria-controls="FAQcollapse19">
                                    <i class="zmdi"></i>Which documents are required to apply for a loan?</a>
                                <div class="collapse" id="FAQcollapse19" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        Requested loan amount, period, interest and repayment schedule
    Description of the project – how will be the money used; description of the mortgage (location, condition).
    Appraisal report
    Business plan
    Pictures
    If applicable, information about previous projects and introduction of the borrower.

All documents can be uploaded in the loan application form. Additional documents can be sent to info@estateguru.co
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse20" role="button" aria-expanded="false" aria-controls="FAQcollapse20">
                                    <i class="zmdi"></i>Once I apply for a loan, how long will it take to get processed?</a>
                                <div class="collapse" id="FAQcollapse20" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        We will make contact with potential borrowers soon after an enquiry or application has been made. 

We will go through the loan application in detail and ask more questions or for additional documentation where necessary. It will take approximately 2-3 days to evaluate the application and write the loan application, assuming all paperwork is in place. After the final examination is made the loan will be opened for investing on the platform. 

The syndication process can take anything from a few minutes up to 2 weeks. How fast the project is funded depends mostly on the attractiveness of the project.
                                    </div>
                                </div>
                            </li>
                        
                            <li>
                                <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse21" role="button" aria-expanded="false" aria-controls="FAQcollapse21">
                                    <i class="zmdi"></i>What are the fees for the borrower?</a>
                                <div class="collapse" id="FAQcollapse21" data-parent="#faqListAccordion">
                                    <div class="collapse-inner-text">
                                        EstateGuru charges 3-4% of the total loan amount in case of the successful funding process and a 0-2% annual administration fee. In case of a delay in the loan repayment, several penalty fees need to be paid by the borrower.
                                    </div>
                                </div>
                            </li>
                        
                    </ul>
                </section>
            </div>
        </div>
    </div>


                </div>
        </div>
        </div>
    </div>
@stop