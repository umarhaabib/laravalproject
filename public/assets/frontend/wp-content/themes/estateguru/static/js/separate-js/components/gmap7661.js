var Gmap = function Gmap() {
	var the;
	var map;
	var markers;
	var bounds;
	var markerCluster;
	var isMobile = Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
	var styles = [
		{
			elementType: "geometry",
			stylers: [
				{
					color: "#f5f5f5"
				}
			]
		},
		{
			elementType: "geometry.fill",
			stylers: [
				{
					color: "#ffffff"
				}
			]
		},
		{
			elementType: "labels",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161"
				}
			]
		},
		{
			elementType: "labels.text.stroke",
			stylers: [
				{
					color: "#f5f5f5"
				}
			]
		},
		{
			featureType: "administrative",
			elementType: "geometry",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "administrative.land_parcel",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "administrative.land_parcel",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#bdbdbd"
				}
			]
		},
		{
			featureType: "administrative.neighborhood",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "poi",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "poi",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee"
				}
			]
		},
		{
			featureType: "poi",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575"
				}
			]
		},
		{
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [
				{
					color: "#E5E6E8"
				}
			]
		},
		{
			featureType: "poi.park",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e"
				}
			]
		},
		{
			featureType: "road",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "road",
			elementType: "geometry",
			stylers: [
				{
					color: "#ffffff"
				}
			]
		},
		{
			featureType: "road",
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "road.arterial",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575"
				}
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
				{
					color: "#dadada"
				}
			]
		},
		{
			featureType: "road.highway",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161"
				}
			]
		},
		{
			featureType: "road.local",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e"
				}
			]
		},
		{
			featureType: "transit",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "transit.line",
			elementType: "geometry",
			stylers: [
				{
					color: "#E5E6E8"
				}
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee"
				}
			]
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{
					color: "#c9c9c9"
				}
			]
		},
		{
			featureType: "water",
			elementType: "geometry.fill",
			stylers: [
				{
					color: "#ebecee"
				}
			]
		},
		{
			featureType: "water",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e"
				}
			]
		}
	];

	return {
		init: function(options) {
			the = this;
			map = new google.maps.Map(document.getElementById(options.id), {
				center: {
					lat: 46.76386788994407,
					lng: 9.151742137500037
				},
				zoom: isMobile ? 3 : 4,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: styles,
				disableDefaultUI: true
			});
		},

		setMarkers: function(data) {
			the.clearMap();
			bounds = new google.maps.LatLngBounds();

			markers = data.map(function(obj, i) {
				var content = the.getMarkerContent(obj);
				var marker = new google.maps.Marker({
					map: map,
					position: obj.geo,
					icon: {
						path:
							"M7.5,11.311c-2.09,0-3.811-1.721-3.811-3.811S5.41,3.689,7.5,3.689S11.311,5.41,11.311,7.5S9.59,11.311,7.5,11.311z",
						fillOpacity: 1,
						fillColor: obj.color,
						anchor: new google.maps.Point(10, 10),
						strokeWeight: 12,
						labelOrigin: new google.maps.Point(7.6, 7.8),
						strokeColor: obj.color,
						strokeOpacity: 0.3
					}
				});

				var infowindow = new google.maps.InfoWindow({
					pixelOffset: new google.maps.Size(96, 65),
					position: marker.position,
					content: content
				});

				bounds.extend(marker.position);

				google.maps.event.addListener(infowindow, "domready", function() {
					var iwOuter = $(".gm-style-iw");
					var iwBackground = iwOuter.prev();
					iwOuter.next().css({ display: "none" });
					iwBackground.css({ display: "none" });
				});

				infowindow.open(map, marker);

				return marker;
			});
			// map.fitBounds(bounds);
		},

		markerClick: function(marker, infowindow, content) {
			infowindow.close();
			infowindow.setContent(content);
			infowindow.open(map, marker);
		},

		clearMap: function() {
			if (markers) {
				if (markerCluster) {
					markerCluster.removeMarkers(markers);
				}
				markers.forEach(function(marker) {
					marker.setMap(null);
				});
				markers = [];
			}
		},

		refreshMap: function() {
			map.fitBounds(bounds);
		},

		getMarkerContent: function(data) {
			var content = "";
			content =
				'<div class="loans-info-window" style="background-color:' +
				data.color +
				"; color: " +
				data.color +
				';">' +
				"<h4>" +
				data.title +
				"</h4>" +
				"<span>" +
				(data.currency + " " + data.amount) +
				"</span>";
			("</div>");
			return content;
		},

		getMap: function() {
			return map;
		},

		getMarkers: function() {
			return markers;
		}
	};
};
