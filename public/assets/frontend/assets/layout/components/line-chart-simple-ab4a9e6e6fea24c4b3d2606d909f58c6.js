var LineChart = function LineChart() {
    return {
        init: function (chartdiv, data = []) {
            let colors = ["#031327", "#00CDEC"];
            Highcharts.chart(chartdiv, {
                chart: {
                    backgroundColor: "transparent",
                    type: "line"
                },
                title: {
                    text: ""
                },
                yAxis: [
                    {
                        gridLineWidth: 1,
                        gridLineColor: "#E0E2E5",
                        title: {
                            text: ""
                        },
                        labels: {
                            overflow: false,
                            style: {
                                color: "rgba(3,19,39,0.54)"
                            },
                            align: "right",
                            x: -10,
                            y: 3,
                            format: data[0].prefix + " {value:.,0f}"
                        },
                        showFirstLabel: false
                    },

                    {
                        title: {
                            text: ""
                        },
                        gridLineColor: "#E0E2E5",
                        opposite: true,
                        labels: {
                            align: "left",
                            style: {
                                color: "#00CDEC"
                            },
                            overflow: false,
                            x: 10,
                            y: 3,
                            format: data[1].prefix + " {value:.,0f}"
                        },
                        showFirstLabel: false
                    }
                ],
                legend: {
                    align: "center",
                    verticalAlign: "bottom",
                    symbolRadius: 24,
                    symbolHeight: 24,
                    symbolWidth: 24
                },
                xAxis: {
                    type: 'datetime',
                    tickInterval: 1000 * 3600 * 24 * 61, // 2 month
                    labels: {
                        rotation: 45
                    }
                },
                tooltip: {
                    xDateFormat: '%Y-%b'
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                series: [
                    JSON.parse(data[0].data),
                    JSON.parse(data[1].data)
                ],
                colors: colors,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }
            })
        }
    }
};

