/***
Main Datatable class
***/

var Datatable = function() {
	var tableOptions; // main options
	var dataTable; // datatable object
	var table; // actual table jquery object
	var tableContainer; // actual table container object
	var tableWrapper; // actual table wrapper jquery object
	var tableInitialized = false;
	var ajaxParams = {}; // set filter mode
	var the;

	return {
		//main function to initiate the module
		init: function(options) {
			if (!$().dataTable) {
				return;
			}

			the = this;

			// default settings
			options = $.extend(
				true,
				{
					src: "", // actual table
					filterApplyAction: "filter",
					filterCancelAction: "filter_cancel",
					resetGroupActionInputOnSuccess: true,
					loadingMessage: "Loading...",
					dataTable: {
						responsive: true,
						bAutoWidth: true,
						bFilter: true,
						fixedHeader: false,
						pageLength: 10, // default records per page
						language: {
							decimal: "",
							emptyTable: "No data available in table",
							info: "_START_ - _END_ of _TOTAL_",
							infoEmpty: "Showing 0 to 0 of 0 entries",
							infoFiltered: "(filtered from _MAX_ total entries)",
							infoPostFix: "",
							thousands: ",",
							lengthMenu: "Show rows _MENU_",
							loadingRecords: "Loading...",
							processing: "Processing...",
							search: "Search:",
							zeroRecords: "No matching records found",
							paginate: {
								first: "First",
								last: "Last",
								next: '<i class="zmdi zmdi-chevron-right"></i>',
								previous: '<i class="zmdi zmdi-chevron-left"></i>'
							},
							aria: {
								sortAscending: ": activate to sort column ascending",
								sortDescending: ": activate to sort column descending"
							}
						},
						pagingType: "simple",
						columnDefs: [
							{
								// define columns sorting options(by default all columns are sortable extept the first checkbox column)
								// 'orderable': true
								// 'targets': [0]
							}
						],

						drawCallback: function(oSettings) {
							// run some code on table redraw
							if (tableInitialized === false) {
								// check if table has been initialized
								tableInitialized = true; // set table initialized
								table.show(); // display table
							}
						},
						initComplete: function() {
							Estatguru.initComponents();
						}
					}
				},
				options
			);

			tableOptions = options;

			// create table's jquery object
			table = $(options.src);
			tableContainer = table.parents(".table-container");

			// initialize a datatable
			dataTable = table.DataTable(options.dataTable);

			// get table wrapper
			tableWrapper = table.parents(".dataTables_wrapper");

			$('tbody > tr > td:nth-child(1) input[type="checkbox"]', table).change(function() {
				var checked = $(this).is(":checked");
				if (checked) {
					$(this)
						.closest("tr")
						.addClass("active");
				} else {
					$(this)
						.closest("tr")
						.removeClass("active");
					tableContainer.find(".group-checkable").prop("checked", false);
				}
			});

			$(".search-filter", tableContainer).on("input", function() {
				var value = $(this).val();
				var colIndex = table.find("th[data-column=" + $(this).attr("data-search-column") + "]").index();
				dataTable
					.column(colIndex)
					.search(value)
					.draw();
			});
		},

		getSelectedRowsCount: function() {
			return $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
		},

		getSelectedRows: function() {
			var rows = [];
			$('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).each(function() {
				rows.push($(this).val());
			});

			return rows;
		},

		getDataTable: function() {
			return dataTable;
		},

		getTableWrapper: function() {
			return tableWrapper;
		},

		gettableContainer: function() {
			return tableContainer;
		},

		getTable: function() {
			return table;
		}
	};
};

