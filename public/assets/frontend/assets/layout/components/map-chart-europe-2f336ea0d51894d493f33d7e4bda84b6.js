var MapChart = function MapChart() {
    return {
        init(chartdiv, data = []) {
            var colors = data.map(d => "rgba(5,141,199," + d.value / 100 + ")");

            // Initiate the chart
            Highcharts.mapChart(chartdiv, {
                chart: {
                    map: "custom/world",
                    position: {
                        align: "right",
                        verticalAlign: "middle"
                        // x: 10,
                        // y: -10
                    }
                },
                colors: colors,
                title: {
                    text: ""
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        align: "right"
                    }
                },
                legend: {
                    align: "left",
                    verticalAlign: "middle",
                    floating: false,
                    itemStyle: {
                        color: "#777F8A",
                        fontWeight: "normal"
                    },
                    layout: "vertical",
                    itemMarginTop: 20,
                    itemMarginBottom: 20,
                    symbolRadius: 24,
                    symbolHeight: 24,
                    symbolWidth: 24,
                    symbolPadding: 20,
                    useHTML: true
                },
                credits: {
                    enabled: false
                },
                series: data.map(d => ({
                        name: d.value + "%  " + d.name,
                        data: data.map((a, i) =>
                            Object.assign(a, {
                                color: colors[i]
                            })
                ),
                joinBy: ["iso-a3", "code"],
                states: {
                    hover: {
                        color: "#058DC7"
                    }
                },
                tooltip: {
                    headerFormat: "",
                    pointFormat: "{point.value}% <br> {point.name}"
                }
            }))
        });
        }
    };
};
