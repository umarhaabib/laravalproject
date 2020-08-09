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
        <li>
            <a href="/portal/portfolio/overview">
                <span class="icon-wrapper">
                    <i class="icon icon-dashboard-24"></i>
                </span>
                Account overview
            </a>
        </li>

        <li class="active">
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

                <div class="main-content projects-content">
                    <div class="card main-box transparent-mob separated-row-item p-0">
                        <button class="btn btn-link btn-main-collapse expanded" type="button" data-toggle="collapse" data-target="#collapseMessages" aria-expanded="false" aria-controls="collapseMarketDeals">
                            Messages
                            <i class="zmdi zmdi-chevron-down"></i>
                            <i class="zmdi zmdi-chevron-up"></i>
                        </button>
                        <div class="has-table-collapse collapse show" id="collapseMessages">
                            <div class="collapse-account-info divProjectList scrollable-table-wrapper">
                                
<div class="table-responsive">

    <h2 class=" page-title pb-0 mb-0">

        
    </h2>


    
        <table class="table data-table table-update no-data-table ordered">
    <tbody class="text-nowrap">
    <tr>
    <td colspan="4" rowspan="3" class="text-center">
        <div class="no-data-inner">
            <span>
                <i class="zmdi zmdi-folder"></i>
            </span>
            <p>No data here</p>
        </div>
    </td>
</tr>
    </tbody>
</table>
    

</div>
<script>
    function showDetails(messageId, loanCode) {
        window.location.href = '/portal/portfolio/messageDetails' + '?messageId=' + messageId;
    }
</script>
                            </div>
                        </div>
                    </div>
                    <div class="section-table mb-4 mb-md-5">

                    </div>
                </div>
            </div>
        </div>
    </div>
        @stop