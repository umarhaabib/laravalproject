var LineChartDark = function LineChartDark() {
	return {
		init: function(chartdiv, options) {
			options = $.extend(true, {
				chart: {
					backgroundColor: "transparent",
					style: {
						fontFamily: "Roboto"
					}
				},
				title: {
					text: ""
				},
				subtitle: {
					text: ""
				},
				yAxis: {
					gridLineColor: "rgba(255,255,255, 0.12)",
					title: {
						text: ""
					},
					labels: {
						style: {
							color: "#00CDEC"
						}
					}
				},
				xAxis: {
					lineColor: "#C0C4C9",
					categories: [
						"Jan '18",
						"Feb '18",
						"Mar '18",
						"Apr '18",
						"May '18",
						"Jun '18",
						"Jul '18",
						"Aug '18",
						"Sep '18",
						"Oct '18",
						"Nov '18",
						"Dec '18"
					],
					tickWidth: 0,
					title: {
						text: ""
					},
					labels: {
						style: {
							color: "rgba(255,255,255, 0.5)"
						}
					}
				},
				legend: {
					color: "red",
					layout: "horizontal",
					align: "center",
					verticalAlign: "bottom",
					symbolWidth: 40,
					symbolPadding: 15,
					itemStyle: {
						color: "rgba(255,255,255, 0.75)",
						fontSize: 12,
						fontWeight: 500
					}
				},

				plotOptions: {
					series: {
						states: {
							hover: {
								enabled: false
							}
						},
						label: {
							enabled: false
						},
						marker: {
							enabled: false
						}
					}
				},
				colors: ["#00CDEC", "#FF001F", "#FF001F"],
				series: [
					{
						name: "Investments",
						data: [43934, 52503, 57177, 69658, 97031, 119931]
					},
					{
						name: "Earnings",
						data: [11744, 17722, 16005, 19771, 20185, 24377]
					},
					{
						name: "Prediction",
						dashStyle: "ShortDash",
						data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
					}
				],
				exporting: {
					enabled: false
				},
				credits: {
					enabled: false
				}
			}, options);

			Highcharts.chart(chartdiv, options)
		}
	}
};
