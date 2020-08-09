var estateguruStatistics = (function estateguruStatistics() {
    var that;
    var the;

    var format = function format(i, html) {
        return $('<div id="portfolioOverviewRow_' + i + '"></div>').html(html);
    };

    var dataTablePerfomance;
    var dataTableLoans;
    return {
        init: function init() {
            that = this;
            the = this;
            this.tableInit();
            this.dataTableLoansInit();
            this.initTableClickEvt();
        },
        chartsInit: {
            mapChart: function(element, data) {
                var mapchart = new MapChart();

                mapchart.init(element, data);
            },
            dountChart: function(element, data) {
                var Dount = new DountChart();
                var options = {
                    chart: {
                        height: 280
                    },
                    plotOptions: {
                        pie: {
                            center: [100, 100],
                            innerSize: "55%",
                            size: "80%",
                            showInLegend: true
                        }
                    },
                    legend: {
                        layout: "vertical",
                        align: "right",
                        verticalAlign: "middle"
                    }
                };
                Dount.init(element, options, data, "{name}, {y}%");
            },
            dountChartInverse: function(element, data) {
                var Dount = new DountChart();
                var options = {
                    // chart: {
                    // 	height: 280
                    // },
                    plotOptions: {
                        pie: {
                            // center: [100, 100],
                            innerSize: "55%",
                            size: "50%"
                            // showInLegend: false
                        }
                    },
                    colors: ["#FFFFFF", "#75E4F4", "#E0F9FC", "#00CDEC"],
                    legend: {
                        // layout: "vertical",
                        // align: "right",
                        // verticalAlign: "middle",
                        itemStyle: {
                            color: "#9FA5AD"
                        }
                    }
                };
                Dount.init(element, options, data, "{name}, {y}%");
            },
            lineChart: function(element, data) {
                var lineChart = new LineChart();
                lineChart.init(element, data);
            },
            pieChart: function(element, data) {
                var Pie = new PieChart();
                Pie.init(element, data);
            }
        },

        initTableClickEvt: function initTableClickEvt() {
            var perfTable = dataTablePerfomance.getTable();

            $(perfTable).on("click", ".perfomance-name", function() {
                the.toggleSubRow.call(this, the.getPerformanceTableSubRow, dataTablePerfomance.getDataTable());
            });

            $(perfTable).on("click", ".perfomance-details", function() {
                var dTable = $(this)
                    .closest("table")
                    .DataTable();
                the.toggleSubRow.call(this, the.getPerformanceDetailsSubRow, dTable);
            });
        },

        toggleSubRow: function(ajax, datatable) {
            var tr = $(this).closest("tr");
            var row = datatable.row(tr);

            if (row.child.isShown()) {
                the.hideTableSubRow(row);
                tr.removeClass("shown");
            } else {
                the.getAndShowSubRow(tr, row, ajax);
            }
        },

        getAndShowSubRow: function getAndShowSubRow(tr, row, getRequest) {
            // use ajax returns data here
            getRequest()
                .then(function(rtn) {
                    var childWrapper = format(row.index(), rtn);
                    row.child(childWrapper).show();
                    tr.addClass("shown");

                    var id = "perf_details_" + Estatguru.generateID();
                    $("table", childWrapper).attr("id", id);
                    the.datatablePerformanceDetails(id);

                    // use this function after any ajax request
                    Estatguru.initComponents();
                })
                .fail(function(err) {
                    console.log(err);
                });
        },

        hideTableSubRow: function hideTableSubRow(row) {
            row.child.remove();
        },

        getPerformanceTableSubRow: function() {
            // use ajax request here to get table html
            return $.get("./components/portfolioOverview_details.html");
        },

        getPerformanceDetailsSubRow: function() {
            // use ajax request here to get table html
            return $.get("./components/portfolioOverview_details.html");
        },

        tableInit: function tableInit() {
            dataTablePerfomance = new Datatable();
            dataTableLoans = new Datatable();
            var isMobile = Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");

            // START Average plugin js code
            jQuery.fn.dataTable.Api.register("average()", function() {
                var data = this.flatten();
                var sum = data.reduce(function(a, b) {
                    return a * 1 + b * 1; // cast values in-case they are strings
                }, 0);

                return sum / data.length;
            });
            //END Average plugin js code

            dataTablePerfomance.init({
                src: "#dataTablePerfomance",
                dataTable: {
                    bFilter: false,
                    bLengthChange: false,
                    paging: false,
                    info: false,
                    ordering: false,
                    scrollX: isMobile,
                    fixedColumns: isMobile
                        ? {
                            leftColumns: 1
                        }
                        : null
                }
            });

            dataTableLoans.init({
                src: "#dataTableLoans",
                dataTable: {
                    // bFilter: false,
                    pageLength: 5,
                    columnDefs: [
                        {
                            targets: [0],
                            orderable: true,
                            orderData: [0, 1]
                        },
                        {
                            targets: [1],
                            visible: true,
                            searchable: true,
                            type: "string"
                        }
                    ],
                    lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    footerCallback: function(row, data, start, end, display) {
                        var api = this.api(),
                            data;

                        // Remove the formatting to get integer data for summation
                        var intVal = function(i) {
                            return typeof i === "string" ? i.replace(/[\$,\€]/g, "") * 1 : typeof i === "number" ? i : 0;
                        };

                        // Total over all pages
                        var totalInterest = api
                            .column(5)
                            .data()
                            .average();
                        // .reduce(function(a, b) {
                        // 	return intVal(a) + intVal(b);
                        // }, 0);

                        // Total over all pages
                        var totalInitial = api
                            .column(8)
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over all pages
                        var totalPrincipal = api
                            .column(9)
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over all pages
                        var totalRevenue = api
                            .column(10)
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        // var totalInitial = api
                        // 	.column(8, { page: "current" })
                        // 	.data()
                        // 	.reduce(function(a, b) {
                        // 		return intVal(a) + intVal(b);
                        // 	}, 0);

                        // Update footer
                        $(api.column(8).footer()).html("€" + totalInitial + "<span class='valueInfo small'>Total of all</span>");
                        $(api.column(9).footer()).html("€" + totalPrincipal + "<span class='valueInfo small'>Total of all</span>");
                        $(api.column(10).footer()).html("€" + totalRevenue + "<span class='valueInfo small'>Total of all</span>");
                        $(api.column(5).footer()).html(totalInterest + "<span class='valueInfo small'>Average of all</span>");
                    },
                    dom: "<'table-scrollable't><<'table-info-wrapper'li<'custom-pagination'>p>>" // datatable layout
                }
            });
        },

        datatablePerformanceDetails: function(tableId) {
            var isMobile = Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
            var table = new Datatable();
            table.init({
                src: "#" + tableId,
                dataTable: {
                    bFilter: false,
                    bLengthChange: false,
                    paging: false,
                    info: false,
                    ordering: false,
                    scrollX: isMobile,
                    fixedColumns: isMobile ? { leftColumns: 1 } : null
                }
            });
            return table;
        },

        dataTableLoansInit: function dataTableLoansInit() {
            $(".customRadioButton").on("change", function() {
                dataTableLoans
                    .getDataTable()
                    .columns(1)
                    .search(this.value)
                    .draw();
            });
        }
    };
})();
