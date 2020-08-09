var BorrowerHome = (function() {
    return {
        init: function() {
            var persentValue = 0.75;
            var xhr;

            jQuery("#objectSlider").slider({
                min: 50000,
                max: 3000000,
                value: 650000,
                step: 10000
            });

            jQuery("#objectSlider").on("slideStart", function(slideEvt) {
                sliding = 'objectSlider';
            });

            jQuery("#objectSlider").on("slideStop", function(slideEvt) {
                sliding = false;
            });

            jQuery("#objectSlider").on("change", function(slideEvt) {
                if (xhr != null) {
                    xhr.abort();
                }

                jQuery("#objectSliderVal").text(formatNumber(slideEvt.value.newValue));

                jQuery('form#loan-request-form button.get-offer').hide();
                jQuery('form#loan-request-form div.offer-content').fadeIn(300);

                var objectSliderVal = parseInt(jQuery('#objectSliderVal').text().replace(/,/g,''));
                var loanAmountSliderVal = parseInt(jQuery('#loanAmountSliderVal').text().replace(/,/g,''));

                var securityAmountValue = slideEvt.value.newValue;

                if ( securityAmountValue * persentValue <= loanAmountSliderVal ) {
                    var loanAmountSliderVal = securityAmountValue * persentValue;
                    loanAmountSliderVal = loanAmountSliderVal - loanAmountSliderVal % 10000;

                    loanAmountSliderVal = parseInt( loanAmountSliderVal );

                    jQuery("#loanAmountSlider").slider('setValue', loanAmountSliderVal, true);
                    jQuery("#loanAmountSliderVal").text(formatNumber(loanAmountSliderVal));
                }

                xhr = jQuery.ajax( {
                    type: 'POST',
                    url: estateguru.portal_url + '/home/ajaxCalculateFunded',
                    data: {
                        secAmount: objectSliderVal,
                        scrlLoanAmount: loanAmountSliderVal,
                        repaymentType: jQuery('input[name="quote_option"]:checked').val()
                    },
                    success: function(data) {
                        jQuery('#loan-request-form-payment').text(formatNumber(data));
                    }
                } );

                if ( objectSliderVal == 0 ) {
                    jQuery('#loan-request-form-ltv').text('0.00');
                } else {
                    jQuery('#loan-request-form-ltv').text((loanAmountSliderVal/objectSliderVal*100).toFixed(2));
                }
            });

            jQuery("#loanAmountSlider").slider({
                min: 20000,
                max: 2000000,
                value: 50000,
                step: 10000
            });

            jQuery("#loanAmountSlider").on("slideStart", function(slideEvt) {
                sliding = 'loanAmountSlider';
            });

            jQuery("#loanAmountSlider").on("slideStop", function(slideEvt) {
                sliding = false;
            });

            jQuery("#loanAmountSlider").on("change", function(slideEvt) {
                if (xhr != null) {
                    xhr.abort();
                }

                jQuery("#loanAmountSliderVal").text(formatNumber(slideEvt.value.newValue));

                jQuery('form#loan-request-form button.get-offer').hide();
                jQuery('form#loan-request-form div.offer-content').fadeIn(300);

                var objectSliderVal = parseInt(jQuery('#objectSliderVal').text().replace(/,/g,''));
                var loanAmountSliderVal = parseInt(jQuery('#loanAmountSliderVal').text().replace(/,/g,''));

                var loanAmountValue = slideEvt.value.newValue;

                if ( objectSliderVal * persentValue <= loanAmountValue ) {
                    var objectSliderVal = parseInt( loanAmountValue / persentValue );

                    jQuery("#objectSlider").slider('setValue', objectSliderVal, true);
                    jQuery("#objectSliderVal").text(formatNumber(objectSliderVal));

                }

                xhr = jQuery.ajax( {
                    type: 'POST',
                    url: estateguru.portal_url + '/home/ajaxCalculateFunded',
                    data: {
                        secAmount: objectSliderVal,
                        scrlLoanAmount: loanAmountSliderVal,
                        repaymentType: jQuery('input[name="quote_option"]:checked').val()
                    },
                    success: function(data) {
                        jQuery('#loan-request-form-payment').text(formatNumber(data));
                    }
                } );

                if ( objectSliderVal == 0 ) {
                    jQuery('#loan-request-form-ltv').text('0.00');
                } else {
                    jQuery('#loan-request-form-ltv').text((loanAmountSliderVal/objectSliderVal*100).toFixed(2));
                }
            });

            jQuery('input[name="quote_option"]').on('change',function(){
                if (xhr != null) {
                    xhr.abort();
                }

                var objectSliderVal = parseInt(jQuery('#objectSliderVal').text().replace(/,/g,''));
                var loanAmountSliderVal = parseInt(jQuery('#loanAmountSliderVal').text().replace(/,/g,''));

                xhr = jQuery.ajax( {
                    type: 'POST',
                    url: estateguru.portal_url + '/home/ajaxCalculateFunded',
                    data: {
                        secAmount: objectSliderVal,
                        scrlLoanAmount: loanAmountSliderVal,
                        repaymentType: jQuery('input[name="quote_option"]:checked').val()
                    },
                    success: function(data) {
                        jQuery('#loan-request-form-payment').text(formatNumber(data));
                    }
                } );

                if ( jQuery(this).val() == 'BULLET_COUPON_ZERO' ) {
                    jQuery('#loan-request-form-payment-row').hide();
                } else {
                    jQuery('#loan-request-form-payment-row').show();
                }
            });

            jQuery("#loanPeriodSlider").slider({
                min: 0,
                max: 36,
                value: 24
            });
            jQuery("#loanPeriodSlider").on("change", function(slideEvt) {
                jQuery("#loanPeriodSliderVal").text(slideEvt.value.newValue);

                jQuery('form#loan-request-form button.get-offer').hide();
                jQuery('form#loan-request-form div.offer-content').fadeIn(300);
            });

            jQuery(document).ready(function() {
                var testimonialsOpts = {
                    slidesToShow: 1,
                    slidesToScroll: 1
                };
                jQuery(".fundedCounting-slider").slick({
                    centerMode: true,
                    infinite: true,
                    slidesToShow: 1,
                    centerPadding: "19.6%",
                    asNavFor: ".fundedCounting-slider-content",
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                arrows: false,
                                centerPadding: "7.5%"
                            }
                        }
                    ]
                });
                jQuery(".fundedCounting-slider-content").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    // speed: 5000,
                    easing: "ease-in-out",
                    asNavFor: ".fundedCounting-slider"
                });

                jQuery('a[data-toggle="tab"]').on("show.bs.tab", function(e) {
                    if (e.target.id === "textimonials-tab") {
                        jQuery(".textimonials-slider").slick("unslick");
                    }
                });
                jQuery('a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
                    jQuery(".textimonials-slider").slick(testimonialsOpts);
                });
                jQuery(".textimonials-slider").slick(testimonialsOpts);
            });

            jQuery(document).on("click", ".js-videoPoster", function(e) {
                e.preventDefault();
                var poster = jQuery(this);
                var wrapper = poster.closest(".js-videoWrapper");
                videoPlay(wrapper);
            });

            function videoPlay(wrapper) {
                var iframe = wrapper.find(".js-videoIframe");
                var src = iframe.data("src");
                wrapper.addClass("videoWrapperActive");
                iframe.attr("src", src);
            }
        }
    };
})();
