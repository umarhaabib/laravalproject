var Openpage = (function() {
	return {
		init: function() {

			var getViewPort = function() {
          var e = window,
              a = "inner";
          if (!("innerWidth" in window)) {
              a = "client";
              e = document.documentElement || document.body;
          }

          return {
              width: e[a + "Width"],
              height: e[a + "Height"]
          };
      };

      var getResponsiveBreakpoint = function(size) {
          // bootstrap responsive breakpoints
          var sizes = {
              xs: 480, // extra small
              sm: 768, // small
              md: 992, // medium
              lg: 1200 // large
          };

          return sizes[size] ? sizes[size] : 0;
      };

      var isMobile = getViewPort().width <= getResponsiveBreakpoint("sm");

      if (isMobile) {
        jQuery(".mob-slider-stats").slick({
          // slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
          slidesToShow: 1,
          draggable: true,
          swipe: true,
          touchMove: true,
          autoplay: true,
          autoplaySpeed: 3000,
          centerPadding: '88px'
        });
      }

			jQuery("#amountInut").on("input", function(e) {
				var val = e.target.value.replace(/\D/g, "");
				e.target.value = Math.round(Number(val)).toLocaleString("en", {
					style: "currency",
					currency: "EUR",
					maximumFractionDigits: 0,
					minimumFractionDigits: 0
				});
			});

			jQuery("#amountSlider").slider({
        min: 50,
        max: 25000,
        value: 10000
      });
      jQuery("#amountSlider").on("slide", function(slideEvt) {
        jQuery("#amountSliderVal").text(slideEvt.value);
      });
      jQuery("#amountSlider").on("slideStop", function(slideEvt) {
        jQuery.ajax( {
            type: 'POST',
            url: estateguru.ajax_url,
            data: {
                action: 'get_expected_return',
                loan_amount: slideEvt.value,
                interest_rate: jQuery("#monthSliderVal").text(),
                period: jQuery("#returnSliderVal").text(),
            },
            success: function(data) {
                jQuery('#expected-return').text(data);
            }
        } );
      });

      jQuery("#monthSlider").slider({
        min: 9,
        max: 24,
        value: 12
      });
      jQuery("#monthSlider").on("slide", function(slideEvt) {
        jQuery("#monthSliderVal").text(slideEvt.value);
      });
      jQuery("#monthSlider").on("slideStop", function(slideEvt) {
        jQuery.ajax( {
            type: 'POST',
            url: estateguru.ajax_url,
            data: {
                action: 'get_expected_return',
                loan_amount: jQuery("#amountSliderVal").text(),
                interest_rate: slideEvt.value,
                period: jQuery("#returnSliderVal").text(),
            },
            success: function(data) {
                jQuery('#expected-return').text(data);
            }
        } );
      });

      jQuery("#returnSlider").slider({
        min: 7,
        max: 13,
        value: 10
      });
      jQuery("#returnSlider").on("slide", function(slideEvt) {
        jQuery("#returnSliderVal").text(slideEvt.value);
      });
      jQuery("#returnSlider").on("slideStop", function(slideEvt) {
        jQuery.ajax( {
            type: 'POST',
            url: estateguru.ajax_url,
            data: {
                action: 'get_expected_return',
                loan_amount: jQuery("#amountSliderVal").text(),
                interest_rate: jQuery("#monthSliderVal").text(),
                period: slideEvt.value,
            },
            success: function(data) {
                jQuery('#expected-return').text(data);
            }
        } );
      });

		}
	};
})();
