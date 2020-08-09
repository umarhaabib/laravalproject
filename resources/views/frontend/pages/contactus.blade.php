   @extends('frontend/layouts/sidebar')

   @section('content')

<div class="main-content contact-content">
                        <h1 class="page-title pb-0 mb-4 mb-md-5">Contact</h1>
                        <h2 class="mb-3 mb-md-4">We’re here to help</h2><p><span style="font-weight: 400;">At tetenter we understand the value of giving investors and borrowers a personalized experience, which is why we’re always available to help should you have any questions regarding our marketplace, your account, and how to get the best out of both.</span></p>
<p>&nbsp;</p>
                            <div class="hero-section pb-img-section">
                                <div class="img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2018/10/rawpixel-652547-unsplash-e1539937324961.jpg);"></div>
                            </div>
                                                <div class="tab-content mb-4">
                            <div class="tab-pane fade show active" id="helpDesk" role="tabpanel" aria-labelledby="helpDesk">
                                <h3 class="mb-4">Our team is standing by to assist you should you have any questions or issues</h3><p>The help desk is available <b data-stringify-type="bold">Mo-Fri, 9 am to 6 pm (EET)</b><b data-stringify-type="bold"><br />
</b>Alternatively, use the chat widget in the bottom right corner of the page or send an email to <a class="c-link" href="mailto:info@tetenter.co" target="_blank" rel="noopener noreferrer" aria-describedby="slack-kit-tooltip">info@tetenter.co</a><br />
HQ Office phone number: <b data-stringify-type="bold"><a class="c-link" href="tel:+3726412777" target="_blank" rel="noopener noreferrer" aria-describedby="slack-kit-tooltip">+372 6412 777</a></b></p>
                            </div>
                        </div>
                                                    <div class="card">
                                <div class="btn-wrapper px-4">
                                    <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapseFAQ" aria-expanded="false" aria-controls="collapseFAQ">
                                        Most asked                                        <i class="zmdi zmdi-chevron-down"></i>
                                        <i class="zmdi zmdi-chevron-up"></i>
                                    </button>
                                </div>
                                <div class="collapseFAQ px-md-4 collapse" id="collapseFAQ" style="">
                                    <div class="collapse-account-info">
                                        <section class="section-faq">
                                            <ul class="faq-list accordion" id="faqListAccordion">
                                                                                                    <li>
                                                        <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3659" role="button" aria-expanded="false" aria-controls="FAQcollapse3659">
                                                            <i class="zmdi"></i> How can I change my bank account?                                                        </a>
                                                        <div class="collapse" id="FAQcollapse3659" data-parent="#faqListAccordion">
                                                            <div class="collapse-inner-text">To change your bank account on the virtual platform you need to make a deposit from the new bank account first. This will enable us to verify your bank account. If the verified bank account belongs to the investor, the new bank account details are automatically saved on the virtual platform. When making future withdrawals, you can choose to which linked bank account you wish to conduct withdrawals.</div>
                                                        </div>
                                                    </li>
                                                                                                    <li>
                                                        <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3666" role="button" aria-expanded="false" aria-controls="FAQcollapse3666">
                                                            <i class="zmdi"></i> What is the difference between development, bridge and business loan?                                                        </a>
                                                        <div class="collapse" id="FAQcollapse3666" data-parent="#faqListAccordion">
                                                            <div class="collapse-inner-text">Development loan is a loan used to finance the development's planning process or the development/construction of the property itself.
A bridge loan is a short-term loan used to meet current obligations before securing a permanent financing option, enhancing the value of the property or selling the underlying asset.
A business loan is a loan used to raise capital for supporting the day-to-day activities of the firm, business expansion, acquisition of equipment or goods, cover pending obligations (taxes, etc.). Despite the loan type, all tetenter's loans are secured with a mortgage.</div>
                                                        </div>
                                                    </li>
                                                                                                    <li>
                                                        <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3675" role="button" aria-expanded="false" aria-controls="FAQcollapse3675">
                                                            <i class="zmdi"></i> What is projected LTV?                                                        </a>
                                                        <div class="collapse" id="FAQcollapse3675" data-parent="#faqListAccordion">
                                                            <div class="collapse-inner-text">Projected LTV represents an LTV figure that tetenter's team is willing to offer for this particular project as a maximum. This indicates that within the next upcoming stages of the loan the LTV of the loan might increase up to the projected LTV figure.</div>
                                                        </div>
                                                    </li>
                                                                                                    <li>
                                                        <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3681" role="button" aria-expanded="false" aria-controls="FAQcollapse3681">
                                                            <i class="zmdi"></i> Why is my investment in "pending" status?                                                        </a>
                                                        <div class="collapse" id="FAQcollapse3681" data-parent="#faqListAccordion">
                                                            <div class="collapse-inner-text">"Pending" status indicates that the funds have been raised to finance the loan, however the notary transaction has not occurred yet. Normally the notary transaction will occur within 1 week from the end of the syndication period, however according to tetenter's loan terms the interest calculation will begin by end of 15 calendar days + 10 working days from the end of the syndication period.</div>
                                                        </div>
                                                    </li>
                                                                                                    <li>
                                                        <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3684" role="button" aria-expanded="false" aria-controls="FAQcollapse3684">
                                                            <i class="zmdi"></i> What is calculated under "reserved balance"?                                                        </a>
                                                        <div class="collapse" id="FAQcollapse3684" data-parent="#faqListAccordion">
                                                            <div class="collapse-inner-text">Once a loan is in "fully invested" status and has not reached the notary transaction just yet, then all adequate investments are marked in investors' portfolios as "reserved" funds.</div>
                                                        </div>
                                                    </li>
                                                                                                    <li>
                                                        <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3692" role="button" aria-expanded="false" aria-controls="FAQcollapse3692">
                                                            <i class="zmdi"></i> I have made a deposit to my virtual account but cannot make investments?                                                        </a>
                                                        <div class="collapse" id="FAQcollapse3692" data-parent="#faqListAccordion">
                                                            <div class="collapse-inner-text">To invest on the platform your bank account needs to be verified. Hence, the first deposit needs to be done from the investor's personal bank account (SEPA payment). If you have made the first deposit from your personal bank account but investing is still not possible, please contact tetenter customer support.</div>
                                                        </div>
                                                    </li>
                                                                                                    <li>
                                                        <a class="btn-faq collapsed" data-toggle="collapse" href="#FAQcollapse3698" role="button" aria-expanded="false" aria-controls="FAQcollapse3698">
                                                            <i class="zmdi"></i> What is an "open" loan?                                                        </a>
                                                        <div class="collapse" id="FAQcollapse3698" data-parent="#faqListAccordion">
                                                            <div class="collapse-inner-text">The loan is in "open" status if the syndication period is ongoing and investing in the loan is still possible. Once the loan is full, the loan is placed to "fully invested" status.</div>
                                                        </div>
                                                    </li>
                                                                                            </ul>
                                        </section>
                                    </div>
                                </div>
                            </div>
                                                    <h2 class="pb-0 pb-md-3 mb-1 mt-5">Business contacts</h2>
                            <div class="map-wrapper pb-0 pb-md-3 mb-4">
                                <div class="map-box">
                                    <div id="map" data-locations="[{&quot;latitude&quot;:&quot;59.434680&quot;,&quot;longitude&quot;:&quot;24.758430&quot;},{&quot;latitude&quot;:&quot;56.954050&quot;,&quot;longitude&quot;:&quot;24.120710&quot;}]"></div>
                                </div>
                            </div>
                            <ul class="nav nav-tabs mob-nav-slide justify-content-start" role="tablist">
                                                                    <li class="nav-item">
                                        <a class="nav-link px-0 active" data-toggle="tab" href="#location-0" role="tab" aria-controls="location-0" aria-selected="true">Estonia</a>
                                    </li>
                                                                        <li class="nav-item">
                                        <a class="nav-link px-0" data-toggle="tab" href="#location-1" role="tab" aria-controls="location-1" aria-selected="">Latvia</a>
                                    </li>
                                                                </ul>
                            <div class="tab-content info-tab-content">
                                                                    <div class="tab-pane fade show active" id="location-0" role="tabpanel" aria-labelledby="location-0">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 class="mb-3 mb-md-4">Company</h5>
                                                        <p class="mb-4">
                                                            <span class="d-block"><strong>tetenter OÜ</strong></span><span class="d-block">Tartu mnt 10/Pääsukese 2 Tallinn 10145, ESTONIA<br />
<br />
</span>                                                        </p>
                                                        <p class="pb-3 pb-md-0 mb-4">
                                                            <span class="d-block">Registration code: 12558919</span><span class="d-block">IBAN: EE937700771001282091</span><span class="d-block">SWIFT/BIC: LHVBEE22</span>LHV Bank                                                        </p>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <h5 class="mb-3 mb-md-4">Business Hours</h5>
                                                        <p class="pb-3 pb-md-0 mb-4">Monday-Friday: 09.00 - 18.00<br />
Saturday: Closed<br />
Sunday: Closed</p>                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 d-flex justify-content-between">
                                                <div class="info-manager">
                                                    <h5 class="mb-3 mb-md-4">Contact Us</h5>
                                                    <p class="pb-0 mb-0 mb-md-4">
                                                        <span class="d-block">Tel. +372 6412 777</span><span class="d-block"><a rel="nofollow" href="mailto:info@tetenter.co">info@tetenter.co</a></span><a href="../index.html" target="_blank">www.tetenter.co</a>                                                    </p>
                                                </div>
                                                <div class="country-manager">
                                                                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                                                        <div class="tab-pane fade" id="location-1" role="tabpanel" aria-labelledby="location-1">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 class="mb-3 mb-md-4">Company</h5>
                                                        <p class="mb-4">
                                                            <span class="d-block"><strong>tetenter OÜ</strong></span><span class="d-block">Ģertrūdes iela 10 - 19, Rīga, Latvia, LV-1010</span>                                                        </p>
                                                        <p class="pb-3 pb-md-0 mb-4">
                                                            <span class="d-block">Registration code: 12558919</span><span class="d-block">IBAN: EE937700771001282091</span><span class="d-block">SWIFT/BIC: LHVBEE22</span>LHV Bank                                                        </p>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <h5 class="mb-3 mb-md-4">Business Hours</h5>
                                                        <p class="pb-3 pb-md-0 mb-4">Monday-Friday: 09.00 - 18.00<br />
Saturday: Closed<br />
Sunday: Closed</p>                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 d-flex justify-content-between">
                                                <div class="info-manager">
                                                    <h5 class="mb-3 mb-md-4">Contact Us</h5>
                                                    <p class="pb-0 mb-0 mb-md-4">
                                                        <span class="d-block"><strong>Dainis Rupainis</strong></span><span class="d-block">Tel. +371 2936 7330</span><span class="d-block"><a rel="nofollow" href="mailto:dainis@tetenter.co">dainis@tetenter.co</a></span><a href="http://www.tetenter.lv/" target="_blank">www.tetenter.lv</a>                                                    </p>
                                                </div>
                                                <div class="country-manager">
                                                    <div class="img" style="background-image: url({{URL::to('')}}/public/assets/frontend/wp-content/uploads/2018/10/manager-img.png);"></div>                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                                                </div>
                                            </div>
                </div>
            </div>
        </div>
    </section>
    <script>
    var initMap = function() {
        var locations = jQuery('#map').data('locations');

        if ( locations != '' ) {
            var mapOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl:false,
                scrollwheel:false
            };

            var map = new google.maps.Map(jQuery('#map')[0],mapOptions);

            var bounds = new google.maps.LatLngBounds();

            for ( var key in locations ) {
                var latitude = locations[key].latitude;
                var longitude = locations[key].longitude;

                var latlng = new google.maps.LatLng( latitude, longitude );

                marker = new google.maps.Marker( {
                    position: latlng,
                    map: map
                } );

                bounds.extend( marker.position );

                marker.setIcon( tetenter.theme_url + '{{URL::to('')}}/static/img/content/map-pin.png' );
            }

            map.fitBounds( bounds );
        }
  };

    initMap();
    </script>


   @stop