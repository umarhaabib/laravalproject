var DountChart = function DountChart() {
    return {
        init: function (chartdiv, options, data, labelFormat) {
            const isMobile = Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
            const initialColors = [
                "#33CDE8",
                "#259EB6",
                "#16687F",
                "#082C3E",
                "#00bcd4",
                "#546e7a",
                "#2D8B9A",
                "#C2EFF4",
                "#163B41",
                "#91e8e1",
                "#254468"
            ];
            options = $.extend(
                true,
                {
                    chart: {
                        backgroundColor: "transparent",
                        padding: [15, 0, 0, 0],
                        align: "top",
                        height: 450,
                        type: "pie"
                    },
                    title: {
                        text: ""
                    },
                    subtitle: {},
                    plotOptions: {
                        pie: {
                            center: isMobile ? [null, null] : [null, 100],
                            borderWidth: 0,
                            innerSize: "55%",
                            size: "80%",
                            showInLegend: true
                        }
                    },
                    colors: initialColors,
                    series: [
                        {
                            name: TranslationMessages.get('deliveredAmount'),
                            dataLabels: {
                                enabled: false
                            },
                            data: []
                        }
                    ],
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                    },
                    legend: {
                        floating: true,
                        maxHeight: 180,
                        layout: "vertical",
                        symbolHeight: 24,
                        symbolWidth: 24,
                        symbolPadding: 15,
                        itemMarginTop: 12,
                        itemMarginBottom: 12,
                        labelFormat: labelFormat || "{name}",
                        itemStyle: {
                            color: "#777F8A",
                            fontSize: "12px",
                            fontWeight: "300"
                        },
                        itemHoverStyle: {
                            color: "#777F8A"
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                options
            );
            options.series[0].data = data;

            Highcharts.chart(chartdiv, options);
        }
    };
};
