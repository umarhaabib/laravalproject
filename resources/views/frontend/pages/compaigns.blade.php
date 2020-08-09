 @extends('frontend/layouts/sidebar')

    @section('content')



<div class="main-content campaignes-list-content">
                    <section class="section section-project-update">
                        <div class="section-header align-items-center justify-content-between">
                            <h1 class="page-title">Campaigns</h1>
                            <!--div class="btn-wrapper text-right">
                                <button class="btn btn-mini-o btn-update-filter">
                                    <i class="icon icon-filter d-inline-block d-md-none"></i>
                                    <span class="d-none d-md-inline">Filter</span>
                                </button>
                            </div-->
                        </div>
                        <div class="section-content">
                            <div class="table-responsive">
                                <div class="mob-table-title d-flex d-md-none">
                                    <small>Campaign</small>
                                    <small>End Date</small>
                                </div>
                                <table class="table data-table table-campaignes responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Campaign</th>
                                            <th>Status</th>
                                            <th>End Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-nowrap">
                                                                                        <tr class="flex-row-wrap">
                                                    <td class="td-main pl-md-0">Change the way you look at saving &#8211; change to Tetenter</td>
                                                    <td class="status abs-top-left-not-td">
                                                        <span>Ended</span>
                                                    </td>
                                                    <td class="abs-top-right">30/06/2020</td>
                                                    <td class="td-details">
                                                        <a href="#">Details</a>
                                                    </td>
                                                </tr>
                                                                                            <tr class="flex-row-wrap">
                                                    <td class="td-main pl-md-0">Invite a friend in April and double your bonus!</td>
                                                    <td class="status abs-top-left-not-td">
                                                        <span>Ended</span>
                                                    </td>
                                                    <td class="abs-top-right">30/04/2020</td>
                                                    <td class="td-details">
                                                        <a href="#">Details</a>
                                                    </td>
                                                </tr>
                                                                                            <tr class="flex-row-wrap">
                                                    <td class="td-main pl-md-0">Introducing our new Referral Rewards program</td>
                                                    <td class="status abs-top-left-not-td">
                                                        <span>Ended</span>
                                                    </td>
                                                    <td class="abs-top-right">31/03/2020</td>
                                                    <td class="td-details">
                                                        <a href="#">Details</a>
                                                    </td>
                                                </tr>
                                                                                </tbody>
                                </table>
                                <!--div class="main-pagination">
                                    <div class="paging-item rows-limit">
                                        <label class="label-paging-item small">
                                            <span class="d-none d-md-inline">Show</span> Rows
                                        </label>
                                        <span class="bmd-form-group is-filled"><select class="form-control select2me paging-select select2-hidden-accessible select2-initialized" data-select2-id="1" tabindex="-1" aria-hidden="true">
                                            <option data-select2-id="3">1</option>
                                            <option>2</option>
                                        </select><span class="select2 select2-container select2-container--bootstrap" dir="ltr" data-select2-id="2" style="width: 36px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-f3qo-container"><span class="select2-selection__rendered" id="select2-f3qo-container" role="textbox" aria-readonly="true" title="1">1</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></span>
                                    </div>
                                    <div class="paging-item go-to-input">
                                        <label class="label-paging-item small">Go to</label>
                                        <span class="bmd-form-group is-filled"><input type="number" class="form-control number-control" min="1" max="25" step="1" value="1"></span>
                                    </div>
                                    <p class="page-info small">1-10 of 25</p>
                                    <div class="paging-arrows">
                                        <a href="#" class="arrow arrow-prev">
                                            <i class="zmdi zmdi-chevron-left"></i>
                                        </a>
                                        <a href="#" class="arrow arrow-next">
                                            <i class="zmdi zmdi-chevron-right"></i>
                                        </a>
                                    </div>
                                </div-->
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>

    @stop