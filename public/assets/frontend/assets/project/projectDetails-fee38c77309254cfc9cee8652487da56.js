var Popup;
function definePopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    Popup = function(position, content) {
        this.position = position;

        content.classList.add('popup-bubble-content');

        var pixelOffset = document.createElement('div');
        pixelOffset.classList.add('popup-bubble-anchor');
        pixelOffset.appendChild(content);

        this.anchor = document.createElement('div');
        this.anchor.classList.add('popup-tip-anchor');
        this.anchor.appendChild(pixelOffset);

        // Optionally stop clicks, etc., from bubbling up to the map.
        this.stopEventPropagation();
    };
    // NOTE: google.maps.OverlayView is only defined once the Maps API has
    // loaded. That is why Popup is defined inside initMap().
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function() {
        this.getPanes().floatPane.appendChild(this.anchor);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function() {
        if (this.anchor.parentElement) {
            this.anchor.parentElement.removeChild(this.anchor);
        }
    };

    /** Called when the popup needs to draw itself. */
    Popup.prototype.draw = function() {
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
        // Hide the popup when it is far out of view.
        var display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';

        if (display === 'block') {
            this.anchor.style.left = divPosition.x + 'px';
            this.anchor.style.top = divPosition.y + 'px';
        }
        if (this.anchor.style.display !== display) {
            this.anchor.style.display = display;
        }
    };

    /** Stops clicks/drags from bubbling up to the map. */
    Popup.prototype.stopEventPropagation = function() {
        var anchor = this.anchor;
        anchor.style.cursor = 'auto';

        ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
            'pointerdown']
            .forEach(function(event) {
                anchor.addEventListener(event, function(e) {
                    e.stopPropagation();
                });
            });
    };
}
var projectDetails = (function() {
    var tableDescription = function() {
        $(".td-collapse span").on("click", function(e) {
            e.preventDefault();
            if ($(".tr-description").hasClass("open")) {
                $(".tr-description").removeClass("open");
                $(".td-collapse").removeClass("open");
                $(this)
                    .parents("tr")
                    .removeClass("tr-collapse");
            } else {
                $(".tr-description").addClass("open");
                $(".td-collapse").addClass("open");
                $(this)
                    .parents("tr")
                    .addClass("tr-collapse");
            }
        });
    };

	var initMap = function(address, divId, zoom) {
		var isMobile = window.matchMedia("only screen and (max-width: 767px)");
        var geocoder = new google.maps.Geocoder();
		var map = new google.maps.Map(document.getElementById("map"), {
			zoom: zoom? zoom:isMobile.matches ? 3 : 15,
			center: new google.maps.LatLng(55.676098, 12.568337),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		if (address) {

			geocoder.geocode({'address': address}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);

                    // var infowindow = new google.maps.InfoWindow({
                    //     content: address
                    // });
					// var marker = new google.maps.Marker({
					// 	map: map,
					// 	position: results[0].geometry.location
					// });
                   var popup = new Popup(
                        results[0].geometry.location,
                       document.getElementById(divId));
                    popup.setMap(map);

                    // infowindow.open(map, marker);
				} else {

				}
			});
		}



        var icons = {
            location: {
                icon: "static/img/content/map-pin.png"
            }
        };
    };

	return {
		init: function(address) {
            // tableDescription();
            definePopupClass();
            this.initSlickCarousel();
			// initMap(address);
		},
		initAjax: function(address) {
            definePopupClass();
		},

        initMapAddress:function(address, divId, zoom) {
            initMap(address,divId, zoom);
        },

        initSlickCarousel: function() {
            $("#projectDetailsSlider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                adaptiveHeight: true,
                asNavFor: "#projectDetailsThumb",
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            dots: true
                        }
                    }
                ]
            });

            $("#projectDetailsThumb").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: "#projectDetailsSlider",
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                vertical: true,
                infinite: true
            });
        }
    };
})();

function changeActiveTab(tabName) {
    var tabId = 'tab' + tabName;
    $(".nav-link.not-href.active").removeClass('active');
    $("#" + tabId).addClass('active');
    $('html, body').animate({
        scrollTop: $("#" + tabId).offset().top - 150
    }, 500);
}

function ajaxUpdateTab(tabName,url, updateDiv) {
    var tabId = 'tab' + tabName;
    var className = 'params-' + tabName;

    $(".nav-link.not-href.active").removeClass('active');
    $("#" + tabId).addClass('active');

    var paramsValues = {};

    // Add params which are using on all tabs
    $('.params-ALL').each(function (i, obj) {
        paramsValues[obj.id] = obj.value
    });

    //Agg tab params
    $('.' + className).each(function (i, obj) {
        paramsValues[obj.id] = obj.value
    });

    var divIdForUpdate = updateDiv? updateDiv: 'divTabContent';

    jQuery.ajax({
        url: url,
        data:paramsValues,
        type: "POST",
        success: function (result) {
            $("#" + divIdForUpdate).html(result);
            Estatguru.initAjax();
        }
    });



}




