var PieChart = function PieChart() {
	return {
		init: function(chartdiv, data, options) {
			options = $.extend(
				true,
				{
					chart: {
						type: "pie",
						style: {
							fontFamily: "Roboto",
							color: "#333",
							fontSize: "12px",
							fontWeight: "normal",
							fontStyle: "normal"
						},
						borderColor: "#335cad",
						spacing: [0, 0, 0, 0],
						backgroundColor: "transparent"
					},
					title: {
						text: ""
					},
					tooltip: {
						pointFormat: "<b>{point.percentage:.1f}%</b>",
						shared: false
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: "pointer",
							dataLabels: {
								format: "{point.name}, <b>{point.percentage:.1f}</b> %",
								style: {
									color: "black"
								}
							}
						},
						series: {
							animation: false,
							dataLabels: {
								style: {
									color: "rgba(3,19,39,0.87)",
									fontSize: "14px",
									fontWeight: "400",
									textOutline: "0"
								}
							}
						}
					},
					series: [
						{
							name: "value",
							turboThreshold: 0,
							colorByPoint: true,
							negativeColor: null,
							dashStyle: "Solid",
							type: "pie",
							color: null,
							data: []
						}
					],
					subtitle: {
						style: '{ "color": "#666666" }',
						text: ""
					},
					colors: [
						"#243241",
						"#33CDE8",
						"#051525",
						"#03a9f4",
						"#00bcd4",
						"#546e7a",
						"#2D8B9A",
						"#C2EFF4",
						"#163B41",
						"#91e8e1",
						"#254468"
					],
					lang: {},
					exporting: {
						enabled: false
					},
					legend: {
						enabled: false
					},
					credits: {
						enabled: false
					}
				},
				options
			)

			options.series[0].data = data
			Highcharts.chart(chartdiv, options)
		}
	}
}

