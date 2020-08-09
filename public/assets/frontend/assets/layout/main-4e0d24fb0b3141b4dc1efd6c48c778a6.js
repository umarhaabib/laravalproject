/**
 Core script to handle core functions
 **/

var Estatguru = (function() {
    // IE mode
    let isIE8 = false;
    let isIE9 = false;
    let isIE10 = false;
    let isIE11 = false;

    let resizeHandlers = [];

    // initializes main settings
    let handleVariable = function() {
        isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);
        isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

        if (isIE10) {
            $("html").addClass("ie10"); // detect IE10 version
        }

        if (isIE11 || isIE10 || isIE9 || isIE8) {
            $("html").addClass("ie"); // detect IE browser
        }
    };

    let _startResizeHandlers = function() {
        // reinitialize other subscribed elements
        for (let i = 0; i < resizeHandlers.length; i++) {
            let each = resizeHandlers[i];
            each.call();
        }
    };

    // handle the layout reinitialization on window resize
    let handleOnResize = function() {
        let resize;
        if (isIE8) {
            let currheight;
            $(window).resize(function() {
                if (currheight == document.documentElement.clientHeight) {
                    return; // quite event since only body resized not window.
                }
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function() {
                    _startResizeHandlers();
                }, 50); // wait 50ms until window resize finishes.
                currheight = document.documentElement.clientHeight; // store last body client height
            });
        } else {
            $(window).resize(function() {
                if (resize) {
                    resize = clearTimeout(resize);
                }
                resize = setTimeout(function() {
                    _startResizeHandlers();
                }, 50); // wait 50ms until window resize finishes.
            });
        }
    };

    let handleMaterialize = function() {
        if ($("body").data("bmd.bootstrapMaterialDesign")) {
            $("body")
                .data("bmd.bootstrapMaterialDesign")
                .dispose();
        }
        if ($("body").data("bmd.autofill")) {
            $("body")
                .data("bmd.autofill")
                .dispose();
        }
        $("body").bootstrapMaterialDesign();
    };

    // Handles Bootstrap Dropdowns
    let handleDropdowns = function() {
        /* Hold dropdown on click */
        $("body").on("click", ".dropdown-menu.hold-on-click", function(e) {
            e.stopPropagation();
        });
    };

    let dropdownCustomWidthLoan = function() {
        let isTablet =
            Estatguru.getViewPort().width <
            Estatguru.getResponsiveBreakpoint("md");
        let isMobile =
            Estatguru.getViewPort().width <
            Estatguru.getResponsiveBreakpoint("sm");

        let btn_offsetLeft = $(".btn-filter-dropdown1").offset();
        let window_width = Number($(window).outerWidth());
        let position_argument = window_width / 2;

        let parent = $(".customWidth");
        let content_width = Number($(".main-content").outerWidth());
        console.log(content_width);
        if (isMobile && btn_offsetLeft) {
            if (btn_offsetLeft.left <= position_argument) {
                parent.addClass("left-position");
            }
            parent.outerWidth(content_width - 48);
        } else if (isTablet) {
            parent.outerWidth(content_width / 2);
        } else {
            parent.outerWidth((content_width * 70) / 100);
        }
    };
    let handleMobileNavbar = function() {
        $("#mobileNavbarNav,#navbarNav").on("show.bs.collapse", function() {
            $("nav.navbar").addClass("navbar-opened");
            $("body").addClass("o-hidden");
        });
        $("#mobileNavbarNav,#navbarNav").on("hide.bs.collapse", function() {
            $("nav.navbar").removeClass("navbar-opened");
            $("body").removeClass("o-hidden");
        });
    };

    let mobileDropdownSlide = function() {
        // // Add slideDown animation to Bootstrap dropdown when expanding.
        // $('.dropdown').on('show.bs.dropdown', function() {
        // 	$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        // });
        // // Add slideUp animation to Bootstrap dropdown when collapsing.
        // $('.dropdown').on('hide.bs.dropdown', function() {
        // 	$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        // 	console.log(4)
        // });
    };

    let handleTooltips = function() {
        // global tooltips
        $('[data-toggle="tooltip"]')
            .not(".tooltips-initialized")
            .each(function() {
                $(this).tooltip({
                    delay: { show: 500, hide: 10 }
                });
                $(this).addClass("tooltips-initialized");
            });
    };

    let handleDisposeTooltips = function(parent) {
        $(".tooltips-initialized", $(parent)).each(function(i, el) {
            if ($(el) && $(el).data("bs.tooltip")) {
                $(el)
                    .tooltip("dispose")
                    .removeClass("tooltips-initialized");
            }
        });
    };

    let tableColHover = function() {
        let allCells = $(
            ".column-hovered-table thead th, .column-hovered-table tbody td"
        );
        let thCells = $(".column-hovered-table thead th");
        thCells
            .on("mouseover", function() {
                let el = $(this);
                let cols = el
                    .parents(".column-hovered-table")
                    .find("thead,tbody")
                    .find("th,td");
                let pos = el.index();
                cols = cols.filter(":nth-child(" + (pos + 1) + ")");
                let sortable = cols.filter(function(index, element) {
                    return $(element).is(".sortable-header");
                });

                if (sortable.length > 0) {
                    cols.addClass("table-column-hover");
                }
            })
            .on("mouseout", function() {
                allCells.removeClass("table-column-hover");
            });
    };

    let handlePopover = function() {
        $('[data-toggle="popover"]').popover({
            trigger: "focus"
        });
    };

    let handlePopoverBottomLeft = function() {
        $('[data-toggle="popoverTopLeft"]').popover({
            // trigger: "focus",
            offset: 100
        });
    };

    let handlePopoverLeftTop = function() {
        $('[data-toggle="popoverLeftTop"]').popover({
            // trigger: "focus",
            // offset: "10px 100px",
            // placements: "right-start"
        });
    };

    let handleSelect2 = function() {
        if (!jQuery().select2) {
            return;
        }
        var a = true;
        $(".select2me, .dataTables_length select")
            .not(".select2-initialized")
            .each(function(index, el) {
                $(el)
                    .select2({
                        theme: "bootstrap",
                        width: $(el).data("width"),
                        minimumResultsForSearch: el.classList.contains("unsearchable")
                            ? -1
                            : 0
                    })
                    .addClass("select2-initialized")
                    .on("select2:opening", function(e) {
                        if (a) {
                            e.preventDefault();
                        }
                        a = false;
                        setTimeout(() => {
                            $(el).select2("open");
                        a = true;
                    }, 200);
                    });
            });
        $(".select2-search input").prop("readonly", true);
    };

    let handleSidebarToggler = function() {
        let body = $("body");
        $("body").on("click", ".btn-sidebar", function(e) {
            e.preventDefault();
            $(".main-content-wrapper").toggleClass("sidebar-closed");
            var sidebarClosed = $('.sidebar-closed').length > 0;
            setCookie("sidebarClosed", sidebarClosed,1000)
        });
    };

    let handleErrorPositioning = function() {
        let headerHeigth = $("header").height();
        $(".error-wrapper,.info-message-wrapper").css("top", headerHeigth);
        // $( window ).on("load", function() {
        // 	if ($("body").hasClass("page-error") || $("body").hasClass("page-info-message")) {
        // 		$(".error-wrapper").show();
        // 		setTimeout(function() {
        // 			$(".dialogue-error-popup,.dialogue-info-message-popup").slideDown(300);
        // 		}, 300);
        // 	} else {
        // 		$(".error-wrapper").hide();
        // 		$(".dialogue-error-popup,.dialogue-info-message-popup").slideUp();
        // 	}
        // });
    };

    let openPageInfoBox = function(id) {
        let elem = $("#" + id);
        let headerHeigth = $("header").height();
        elem.css("top", headerHeigth);
        elem.show();
        setTimeout(function() {
            elem.find(".dialogue-error-popup").slideDown(300);
            elem.find(".dialogue-info-message-popup").slideDown(300);
        }, 100);
        $("body").addClass("hide-scrolling ")
    };

    let closePageInfoBox = function(id) {
        let elem = $("#" + id);
        elem.hide();
        elem.find(".dialogue-error-popup").slideDown(300);
        elem.find(".dialogue-info-message-popup").slideDown(300);
        $("body").removeClass("hide-scrolling ")
    };

    // var initDateFilter = function() {
    // 	$(".filter-datepicker").datepicker({
    // 		calendarWeeks: true
    // 	});
    // };

    let handleTableDetails = function() {
        $(document).on("click", ".btn-table-details", function(e) {
            e.preventDefault();
            $(this)
                .parent()
                .toggleClass("expanded");
            if (
                $(this)
                    .parent()
                    .hasClass("expanded")
            ) {
                $(this).text("Close");
            } else {
                $(this).text("Details");
            }
        });
    };

    let triggerLoginPopup = function() {
        $(document).on("click", ".btn-login-popup", function(e) {
            e.preventDefault();
            $(".log-popup-wrapper").slideToggle();
            // $(".log-backdrop").slideToggle();
            if ($(".log-backdrop").is(":visible")) {
                setTimeout(function() {
                    $(".log-backdrop").hide();
                }, 500);
            } else {
                $(".log-backdrop").show();
            }
        });
        $(document).on("click", ".btn-close-log-popup", function(e) {
            e.preventDefault();
            $(".log-popup-wrapper").slideUp();
            // $(".log-backdrop").slideUp();
            setTimeout(function() {
                $(".log-backdrop").hide();
            }, 500);
        });
        $(document).on("click", function(e) {
            if (
                !$(e.target).closest(".log-popup").length &&
                // $(".log-popup-wrapper").is(":visible") &&
                !$(e.target).closest(".btn-login-popup").length
            ) {
                $(".log-popup-wrapper").slideUp();
                setTimeout(function() {
                    $(".log-backdrop").hide();
                }, 500);
            }
        });
    };

    let triggerAdminNavPopup = function() {
        let isMobile =
            Estatguru.getViewPort().width < Estatguru.getResponsiveBreakpoint("sm");
        if (!isMobile) {
            $(document).on("click", ".btn-adminNav-popup", function(e) {
                e.preventDefault();
                $(".adminNav-popup-wrapper").slideToggle();
                if ($(".adminNav-backdrop").is(":visible")) {
                    setTimeout(function() {
                        $(".adminNav-backdrop").hide();
                    }, 500);
                } else {
                    $(".adminNav-backdrop").show();
                }
            });
            $(document).on("click", ".btn-close-adminNav-popup", function(e) {
                e.preventDefault();
                $(".adminNav-popup-wrapper").slideUp();
                setTimeout(function() {
                    $(".adminNav-backdrop").hide();
                }, 500);
            });
            $(document).on("click", function(e) {
                if (
                    !$(e.target).closest(".adminNav-popup").length &&
                    !$(e.target).closest(".btn-adminNav-popup").length
                ) {
                    $(".adminNav-popup-wrapper").slideUp();
                    setTimeout(function() {
                        $(".adminNav-backdrop").hide();
                    }, 500);
                }
            });
        } else {
            $(document).on("click", ".btn-adminNav-popup", function(e) {
                e.preventDefault();
                $(".adminNav-popup-wrapper").toggleClass("open");
                $(".adminNav-backdrop").toggleClass("bShown");
            });
            $(document).on("click", ".btn-close-adminNav-popup", function(e) {
                e.preventDefault();
                $(".adminNav-popup-wrapper").removeClass("open");
                $(".adminNav-backdrop").removeClass("bShown");
            });
            $(document).on("click", function(e) {
                if (
                    !$(e.target).closest(".adminNav-popup").length &&
                    !$(e.target).closest(".btn-adminNav-popup").length
                ) {
                    $(".adminNav-popup-wrapper").removeClass("open");
                    $(".adminNav-backdrop").removeClass("bShown");
                }
            });
        }
    };

    let select2PagingDropMenu = function() {
        if (!jQuery().select2) {
            return;
        }

        $(".paging-select")
            .not(".select2-initialized")
            .each(function(index, element) {
                $(element)
                    .select2({
                        theme: "bootstrap",
                        minimumResultsForSearch: -1
                    })
                    .addClass("select2-initialized");
            });
    };

    let initAutoresize = function() {
        // $("textarea").bind("input");
        $("textarea").on("input", function(e) {
            let el = e.target;
            el.style.height = "28px";
            el.style.height = el.scrollHeight + "px";
        });
    };

    let showHidaPass = function() {
        $("a.show-pass-icon").on("click", function(e) {
            e.preventDefault();

            let $passwordInput = $(this)
                .parent()
                .find('input[name="password"]');

            if ($passwordInput.attr("type") == "password") {
                $passwordInput.replaceWith(
                    $passwordInput.clone(true, true).attr("type", "text")
                );
            } else {
                $passwordInput.replaceWith(
                    $passwordInput.clone(true, true).attr("type", "password")
                );
            }
        });
    };

    let toggleFilter = function() {
        // This function is for closing the filter popup during AJAX call
        $(".btn-filter-go").on("click", function(e) {
            $(".project-filter-dropdown").removeClass("open");
        });
        // End AJAX call
        $(".btn-project-filter").on("click", function(e) {
            e.preventDefault();
            if ($(".project-filter-dropdown").hasClass("open")) {
                $(".project-filter-dropdown").removeClass("open");
            } else {
                $(".project-filter-dropdown").addClass("open");
            }
        });
        $(document).on("click", function(e) {
            if (
                !$(e.target).closest(".project-filter-dropdown").length &&
                $(".project-filter-dropdown").hasClass("open") &&
                !$(e.target).closest(".btn-project-filter").length
            ) {
                $(".project-filter-dropdown").removeClass("open");
            }
        });
    };

    let toggleFilterInit = function (divId) {


        let dropDownClassName = ".filter-dropdown-" + divId;
        // End AJAX call
        $('#' + divId).on('click', function (e) {
            e.preventDefault();
            if ($(dropDownClassName).hasClass('open')) {
                $(dropDownClassName).removeClass('open');
            } else {
                $(dropDownClassName).addClass('open');
            }
        });
        $(document).on('click', function (e) {
            if (
                !$(e.target).closest(dropDownClassName).length &&
                $(dropDownClassName).hasClass('open') &&
                !$(e.target).closest('#' + divId).length
            ) {
                $(dropDownClassName).removeClass('open');
            }
        });
    };


    let toggleColCustom = function() {
        // This function is for closing the filter popup during AJAX call
        $(".btn-filter-go").on("click", function(e) {
            $(".colCustom-filter").removeClass("open");
        });
        // End AJAX call
        $(".btn-col-custom").on("click", function(e) {
            e.preventDefault();
            if ($(".colCustom-filter").hasClass("open")) {
                $(".colCustom-filter").removeClass("open");
            } else {
                $(".colCustom-filter").addClass("open");
            }
        });
        $(document).on("click", function(e) {
            if (
                !$(e.target).closest(".colCustom-filter").length &&
                $(".colCustom-filter").hasClass("open") &&
                !$(e.target).closest(".btn-col-custom").length
            ) {
                $(".colCustom-filter").removeClass("open");
            }
        });
    };

    let toggleColCustomById = function (tableId) {
        // This function is for closing the filter popup during AJAX call

        $('.btn-filter-go').on('click', function (e) {
            $('.colCustom-filter').removeClass('open');
        });
        // End AJAX call
        $('.btn-col-custom-'  + tableId).on('click', function (e) {
            e.preventDefault();


            if ($('.colCustom-filter-' +  tableId).hasClass('open')) {
                $('.colCustom-filter-' + tableId).removeClass('open');
            } else {
                $('.filter-dropdown').removeClass('open').removeClass('show');
                $('.colCustom-filter-' + tableId).addClass('open');
            }
        });
        $(document).on('click', function (e) {
            if (
                !$(e.target).closest('.colCustom-filter-' + tableId).length &&
                $('.colCustom-filter-' + tableId).hasClass('open') &&
                !$(e.target).closest('.btn-col-custom-'  + tableId).length
            ) {
                $('.colCustom-filter-' + tableId).removeClass('open');

            }
        });
    };

    let tableActionDropdown = function() {
        $(".btn-table-action").on("click", function(e) {
            e.preventDefault();
            if ($(".dropdown-action-menu").hasClass("open")) {
                $(".dropdown-action-menu").removeClass("open");
            } else {
                $(".dropdown-action-menu").addClass("open");
            }
        });
        $(document).on("click", function(e) {
            if (
                !$(e.target).closest(".dropdown-action-menu").length &&
                $(".dropdown-action-menu").hasClass("open") &&
                !$(e.target).closest(".btn-table-action").length
            ) {
                $(".dropdown-action-menu").removeClass("open");
            }
        });
    };

    let getFileUploadName = function() {
        $("#browse-input").on("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                $(".file-label-text").html(
                    '<span class="upload-file-name">' + file.name + "</span>"
                );
            } else {
                $(".file-label-text").html("Browse");
            }
        });
    };

    let searchOpening = function() {
        $(".btn-mob-search").on("click", function(e) {
            e.preventDefault();
            if ($(".search-wrapper").hasClass("open")) {
                $(".search-wrapper").removeClass("open");
            } else {
                $(".search-wrapper").addClass("open");
            }
        });
    };

    let faqToggleLink = function() {
        let isMobile =
            Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
        if (isMobile) {
            $(".faq-nav-tabs .nav-link.active").on("click", function(e) {
                e.preventDefault();
                $(".tab-content").addClass("show");
                $("body").addClass("ovHidden");
            });
        }
        $(".btn-back-faq-list").on("click", function(e) {
            e.preventDefault();
            $(".tab-content").removeClass("show");
            $("body").removeClass("ovHidden");
        });
    };

    let toggleHelpVideoList = function() {
        $(".btn-open-nav-list").on("click", function(e) {
            e.preventDefault();
            $(".section-videos .faq-nav-tabs").toggle(300);
        });
    };

    let openDateWrapperBox = function() {
        $(".btn-open-calendar-box").on("click", function(e) {
            e.preventDefault();
            if ($(".date-filter-tab-box").hasClass("open")) {
                $(".date-filter-tab-box").removeClass("open");
            } else {
                $(".date-filter-tab-box").addClass("open");
            }
        });
    };

    let accountInfoEdit = function() {
        $(".btn-action-edit").on("click", function(e) {
            e.preventDefault();
            let element_parent = $(this).parents(".account-info-item");
            let element = element_parent.find($(".form-account-info"));
            if ($(".form-account-info").hasClass("show")) {
                element.removeClass("show");
            } else {
                element.addClass("show");
            }
            if (element_parent.hasClass("editable")) {
                element_parent.removeClass("editable");
            } else {
                element_parent.addClass("editable");
            }
        });
    };

    let accountAddInfo = function() {
        $(".btn-add").on("click", function(e) {
            e.preventDefault();
            let element = $(this)
                .parents(".account-info-item")
                .find($(".form-add-info"));
            if ($(".form-account-info").hasClass("show")) {
                element.removeClass("show");
            } else {
                element.addClass("show");
            }
        });
    };

    let openpageHeaderOffset = function() {
        let offset = $("header").outerHeight();

        // $(".page:not(.auth-page) .page-wrapper").css({
        // 	"padding-top": offset
        // });
    };

    let handleAjaxCompleate = function() {
        $(document).ajaxComplete(function() {
            Estatguru.reinitMaterialize();
        });
    };

    let documentTriggerClick = function() {
        $(document).click();
    };

    var  toggleMobTable = function (tableId) {

        if (!$(".mob-table-info").length) return;

        var extraClass = tableId? "." + tableId : "";
        $(".mob-table-info" + extraClass).on("click", function(e) {
            e.preventDefault();
            if ($(this).hasClass("btn-toggled")) {
                $(this).removeClass("btn-toggled") };
            if ($(this).parents('tr').hasClass("primary-table-expanded")) {
                $(this).parents('tr').removeClass("primary-table-expanded");
            } else {
                $(this).parents('tr').addClass("primary-table-expanded");
                $(this).addClass("btn-toggled");

            }
        });
    };

    var dragSorting = function() {
        if ($(".dragSorting-box-dataTableLoans").length) {

            $( ".dragSorting-box-dataTableLoans" ).sortable({
                handle: "i.icon-drag",
                containment: $('#filterForm_dataTableLoans')
            });

            $( ".dragSorting-box-dataTableLoans" ).disableSelection();
        };

        if ($(".dragSorting-box-dataTableMrketDeals").length) {
            $( ".dragSorting-box-dataTableMrketDeals").sortable({
                handle: "i.icon-drag",
                containment: $('#filterForm_dataTableMrketDeals')
            });

            $( ".dragSorting-box-dataTableMrketDeals" ).disableSelection();
        };
        if ($(".dragSorting-box-dataTableMrketList").length) {
            $( ".dragSorting-box-dataTableMrketList").sortable({
                handle: "i.icon-drag",
                containment: $('#filterForm_dataTableMrketList')
            });

            $( ".dragSorting-box-dataTableMrketList" ).disableSelection();
        };

    };

    let toggleHowToStart = function() {
        $(".btn-how-to-start").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").addClass("show");
            $(this).hide();
        });
        $(".btn-back-comarison").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").removeClass("show");
            $(".btn-how-to-start").show();
        });
    };

    let toggleHowToStartMob = function() {
        $(".btn-how-to-start-mob").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").addClass("show");
            $(".main-content-right").addClass("mob-top");
            $(".hide-in-mob").hide();
            $(".comarison-right-content").hide();
            $("html, body").animate(
                {
                    scrollTop: $("#main-comarison-top").offset().top - 70
                },
                500
            );
        });
        $(".btn-join-mob").on("click", function(e) {
            e.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: $("#main-comarison-bottom").offset().top - 70
                },
                500
            );
        });
        $(".btn-back-comarison-mob").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").removeClass("show");
            $(".main-content-right").removeClass("mob-top");
            $(".hide-in-mob").show();
            $(".comarison-right-content").show();
            $("html, body").animate(
                {
                    scrollTop: $("#main-comarison-bottom").offset().top - 70
                },
                500
            );
        });
    };

    let goToSelectedId = function() {
        let isMobile =
            Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
        $(".btn-apply-form").on("click", function(e) {
            e.preventDefault();
            console.log(isMobile);
            if (isMobile) {
                $("html, body").animate(
                    {
                        scrollTop: $("#apply-block").offset().top - 70
                    },
                    500
                );
            } else {
                $("html, body").animate(
                    {
                        scrollTop: $("#apply-block").offset().top - 120
                    },
                    500
                );
            }
        });
    };

    let popOverInit = function() {
        $('[data-toggle="popover"]').popover({
            html: true,
            content: function() {
                return $("#popover-content").html();
            }
        });
    };

    let actionDropdownMenu = function() {
        $(".filter-form").on("click", function(e) {
            e.stopPropagation();
        });
        $("#dropdownmenu-sortable .btn-submit-col").on("click", function(e) {
            $("#dropdownmenu-sortable").dropdown("toggle");
        });
    };

    let actionMainHeaderMenu = function() {
        $(".btn-main-header").on("click", function(e) {
            e.preventDefault();
            $("body").toggleClass("ovHidden");
            $(this).toggleClass("close-menu");
            $(this)
                .parents(".header-main")
                .find(".menu-wrapper")
                .toggleClass("open");
        });
    };

    let collapseToggleEvent = function() {
        $(".accordion .collapse").on("shown.bs.collapse", function() {
            if ($(this).hasClass("show")) {
                $(this)
                    .parents(".main-box")
                    .addClass("openCollapse");
            } else {
                $(this)
                    .parents(".main-box")
                    .removeClass("openCollapse");
            }
        });

        $(".accordion .collapse").on("hidden.bs.collapse", function() {
            if ($(this).hasClass("show")) {
                $(this)
                    .parents(".main-box")
                    .addClass("openCollapse");
            } else {
                $(this)
                    .parents(".main-box")
                    .removeClass("openCollapse");
            }
        });
    };

    let headerSmoothScroll = function() {
        $(document).on("scroll", function() {
            let scroll_top = $(document).scrollTop();
            if (scroll_top >= 200) {
                $(".page-main-openpage")
                    .find(".navbar")
                    .addClass("bgFull");
            } else {
                $(".page-main-openpage")
                    .find(".navbar")
                    .removeClass("bgFull");
            }
        });
    };

    let isScrollableTable = function(table) {
        let parent = $(table).parent();
        return $(table).outerWidth() > parent.outerWidth();
    };

    let getTableWrapperScrollPos = function(wrapper) {
        let scrollLeft = Math.round($(wrapper).scrollLeft());
        let rightPos = Math.round($("table", wrapper).width() - $(wrapper).width());
        return scrollLeft === 0
            ? "left"
            : scrollLeft > rightPos - 1
                ? "right"
                : "middle";
    };

    let sTableFixedColumn = function(el) {
        $("thead .fixed-on-scroll", el).each(function(i, el) {
            let table = $(el).closest("table");
            let wrapper = table.closest(".scrollable-table-wrapper");
            let pos = $(el).data("position");
            let colW = $(el).outerWidth();
            let index = $(this).index();
            // dispose all tooltips before clone
            handleDisposeTooltips(wrapper);

            let newTable = table.clone(true, true).addClass("clone");
            newTable.find("[id]").removeAttr("id");
            $('<div class="scrollable-table-clone-wrapper ' + pos + '"/>')
                .append(newTable)
                .appendTo(wrapper)
                .find("td:nth-child(" + (index + 1) + ")")
                .addClass("fix-side");

            // reenable tooltips after clone
            handleTooltips();

            $(".table-shadow-helper." + pos + " ").css({
                width: colW
            });
        });
    };

    let addScrollShadowHelpers = function(el) {
        let theadHeight = $("thead", el).innerHeight();
        let scrDivOffsetHeight = $(".table-responsive")[0].offsetHeight;
        let scrDivClientHeight = $(".table-responsive")[0].clientHeight;
        let scrollBarHeight = scrDivOffsetHeight - scrDivClientHeight;

        let left =
            "<div class='table-shadow-helper left' style='top: " +
            theadHeight +
            "px; bottom: " +
            scrollBarHeight +
            "px;'/>";
        let right =
            "<div class='table-shadow-helper right' style='top: " +
            theadHeight +
            "px; bottom: " +
            scrollBarHeight +
            "px;'/>";
        let wrapper = $(el).parents(".scrollable-table-wrapper");
        wrapper.prepend(left).append(right);
    };

    let handleScrollableTable = function() {
        let isMobile =
            Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
        let tables = $(".scrollable-table:not(.scroll-inited)");
        if (!isMobile) {
            tables.each(function(index, el) {
                let wrapper = $(el).parent();
                let isScrllable = isScrollableTable(el);
                if (isScrllable) {
                    let position = getTableWrapperScrollPos(wrapper);
                    addScrollShadowHelpers(el);
                    sTableFixedColumn(el);
                    $(el)
                        .closest(".scrollable-table-wrapper")
                        .attr("data-position", position);
                    wrapper.scroll(function(e) {
                        position = getTableWrapperScrollPos(e.currentTarget);
                        $(el)
                            .closest(".scrollable-table-wrapper")
                            .attr("data-position", position);
                    });
                    $(el).addClass("scroll-inited");
                }
            });
        }
    };

    let toggleSelectCheckboxes = function () {
        // This function is for closing the filter popup during AJAX call
        // $(".submit-button").on("click", function (e) {
        //     $(".selectCheckbox-dropdown").removeClass("open");
        // });
        // End AJAX call
        $(".btn-select-checkbox").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("active");
            if ($(".selectCheckbox-dropdown").hasClass("open")) {
                $(".selectCheckbox-dropdown").removeClass("open");
                $(".label-check input[type=checkbox]").removeAttr("disabled");
            } else {
                $(".selectCheckbox-dropdown").addClass("open");
            }
        });
        $(document).on("click", function (e) {
            let labelText = $(".select-checkbox-label").text();
            let buttonText = $(".text-select-checkbox");
            let checkItem = $(".label-check input[type=checkbox]");
            let arr = [];
            if (
                !$(e.target).closest(".selectCheckbox-dropdown").length &&
                $(".selectCheckbox-dropdown").hasClass("open") &&
                !$(e.target).closest(".btn-select-checkbox").length
            ) {

                $(".selectCheckbox-dropdown").removeClass("open");
                $(".btn-select-checkbox").removeClass("active");
                checkItem.each(function () {
                    let attr = $(this).filter(":checked").attr("data-label");
                    arr.push(attr);
                    let filteredArr = arr.filter(function (el) {
                        return el != null;
                    });
                    arr = filteredArr;
                    if (arr.length) {
                        buttonText.text(filteredArr.join(", "));
                    } else {
                        buttonText.text(labelText);
                    }
                });
                $(".label-check input[type=checkbox]").removeAttr("disabled");
            }
        });
    };

    let checkAllCheckbox = function() {
        $(document).ready(function () {
            let checkItem = $(".label-check input[type=checkbox]");

            $(".checkAll").change(function () {
                if (this.checked) {
                    checkItem.each(function () {
                        this.checked = true;
                    });
                } else {
                    checkItem.each(function () {
                        this.checked = false;
                    });
                }

            });

            checkItem.change(function () {
                if ($(this).is(":checked")) {
                    var isAllChecked = 0;
                    checkItem.each(function () {
                        if (!this.checked) isAllChecked = 1;
                    });
                    if (isAllChecked == 0) {
                        $(".checkAll").prop("checked", true);
                    }
                } else {
                    $(".checkAll").prop("checked", false);
                }
            });
        });
    }

    let handleCollapseShownEvt = function() {
        let isMobile =
            Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
        $(".has-table-collapse").on("shown.bs.collapse", function() {
            handleScrollableTable();
            let tables = $(".scrollable-table:not(.clone)");
            if (tables.length && !isMobile) {
                tables.each(function(i, el) {
                    let isScrllable = isScrollableTable(el);
                    if (!isScrllable) {
                        return;
                    }

                    let theadH = $("thead", el).height();
                    let wrapper = el.closest(".scrollable-table-wrapper");
                    $(".table-shadow-helper", wrapper).css({ top: theadH });
                    $(".fixed-on-scroll", el).each(function(i, element) {
                        let pos = $(element).data("position");
                        let colW = $(element).outerWidth();
                        $(".table-shadow-helper." + pos + " ", wrapper).css({
                            width: colW
                        });
                    });
                });
            }
        });
    };

    let initFileUploader = function() {
        if (!jQuery().dmUploader) {
            return;
        }
        var arr = [];
        $("#drop-area").dmUploader({
            url: "",
            auto: false,
            // multiple: false,
            queue: false,
            //... More settings here...

            onInit: function() {
                console.log("Callback: Plugin initialized");
            },
            onComplete: function() {
                console.log("testComplete");
            },
            onNewFile: function(id, file) {
                var fileList = "";
                arr.push(file);
                arr.forEach(function(item) {
                    fileList += `<li class="file-name">${item.name}</li>`;
                });
                $(".files-item-list").html(fileList);
                $(".dragable-area").addClass("added");
                $(".btn-fileUpload-wrapper").addClass("canSave");
            },
            onDragEnter: function() {
                this.addClass("active");
            },
            onDragLeave: function() {
                this.removeClass("active");
            }
        });
        $(document).on("click", ".btn-remove-files", function(e) {
            e.preventDefault();
            $("#drop-area").dmUploader("reset");
            $(".dragable-area").removeClass("added");
            $(".btn-fileUpload-wrapper").removeClass("canSave");
            arr = [];
        });
        $(document).on("click", ".btn-cancel-fileUpload", function(e) {
            e.preventDefault();
            $("#drop-area").dmUploader("cancel");
            $(".dragable-area").removeClass("added");
            $(".btn-fileUpload-wrapper").removeClass("canSave");
            arr = [];
        });
        $(document).on("click", ".btn-save-fileUpload", function(e) {
            e.preventDefault();
            $("#drop-area").dmUploader("start");
            $(".dragable-area").removeClass("added");
            $(".btn-fileUpload-wrapper").removeClass("canSave");
            arr = [];
        });
    };

    let avoidDropdown = function() {
        $(".dropdown-avoid .dropdown-menu").on("click", function(e) {
            e.stopPropagation();
        });
    };

    let dropdownCustomWidth = function() {
        let isDesktopSM =
            Estatguru.getViewPort().width < Estatguru.getResponsiveBreakpoint("lg");
        let isTablet =
            Estatguru.getViewPort().width < Estatguru.getResponsiveBreakpoint("md");
        let isMobile =
            Estatguru.getViewPort().width < Estatguru.getResponsiveBreakpoint("sm");

        let btn_offsetLeft = $(".btn-filter-dropdown").offset();
        let window_width = Number($(window).outerWidth());
        let position_argument = window_width / 2;

        let parent = $(".customWidth");
        let content_width = Number($(".main-content").outerWidth());
        let item_width = Number($(".customWidth .checkbox-group").outerWidth());

        let all_items_width = 0;
        $(".customWidth .checkbox-group").each(function(i, el) {
            all_items_width += el.offsetWidth;
        });

        parent.css({
            width: all_items_width
        });

        if (isMobile) {
            if (btn_offsetLeft <= position_argument) {
                parent.addClass("left-position");
            }
            parent.css({
                "max-width": content_width - 48
            });
        } else if (isTablet) {
            parent.css({
                "max-width": content_width / 2
            });
        } else if (isDesktopSM) {
            parent.css({
                "max-width": (content_width * 60) / 100
            });
        } else {
            parent.css({
                "max-width": (content_width * 70) / 100
            });
        }
    };

    let initMultiSelect = function() {
        if (!jQuery().select2) {
            return;
        }
        $(".multiSelect").select2({
            theme: "bootstrap",
            tags: true,
            tokenSeparators: [",", " "],
            multiple: true,
            containerCssClass: "multiSelectSelection",
            dropdownCssClass: "multiSelectDropdown"
        });
    };

    return {
        openPopup: function(id) {
            openPageInfoBox(id)
        },
        closePopup: function(id) {
            closePageInfoBox(id)
        },


        //main function to initiate the theme
        init: function() {
            // IMPORTANT!!!: Do not modify the core handlers call order.
            // Core handler
            handleVariable(); // initialize core variables
            handleOnResize(); // set and handle responsive

            // UI Component handlers
            handleMaterialize();
            actionDropdownMenu();
            handleSidebarToggler();
            handleDropdowns(); // handle dropdowns
            handleTooltips();
            handleSelect2();
            select2PagingDropMenu();
            initAutoresize();
            showHidaPass();
            toggleFilter();
            toggleColCustom();
            popOverInit();
            tableColHover();
            collapseToggleEvent();
            dropdownCustomWidth();
            initMultiSelect();
            // handleDateTimePicker();

            handleErrorPositioning();
            // initDateFilter();

            getFileUploadName();
            // accountInfoEdit();
            accountAddInfo();
            searchOpening();
            faqToggleLink();
            toggleHelpVideoList();
            openpageHeaderOffset();
            mobileDropdownSlide();
            openDateWrapperBox();
            documentTriggerClick();
            handlePopover();
            handlePopoverBottomLeft();
            handlePopoverLeftTop();
            dragSorting();
            toggleHowToStart();
            toggleHowToStartMob();
            initFileUploader();

            // click events
            handleTableDetails();
            handleMobileNavbar();
            tableActionDropdown();
            triggerLoginPopup();
            // triggerAdminNavPopup();
            goToSelectedId();
            actionMainHeaderMenu();
            headerSmoothScroll();
            avoidDropdown();
            // handleCopyTooltip();

            // ajaxCompleate
            handleAjaxCompleate();
            handleScrollableTable();
            handleCollapseShownEvt();
            Estatguru.addResizeHandler(handleScrollableTable);
        },

        // main function to initiate core javascript after ajax complete
        initAjax: function(tableId) {
            handleTooltips();
            handlePopover();
            handleSelect2();
            // handleDateTimePicker();
            handleDropdowns(); // handle dropdowns
            showHidaPass();
            toggleMobTable(tableId);
            handleErrorPositioning();
            tableColHover();
            // handleAjaxCompleate();
            // toggleColCustom();
            if (tableId) {
                handleScrollableTable();
            }
            toggleSelectCheckboxes();
            checkAllCheckbox();

        },
        initUpdatePopup: function() {
            handleErrorPositioning();
        },
        initTriggerAdminNavPopup: function() {
            triggerAdminNavPopup();
        },

        initDropdownCustomWidthLoan: function() {
            dropdownCustomWidthLoan();
        },


        toggleMobTable: function() {
            toggleMobTable();
        },
        initUpdateFilter: function() {
            toggleFilter();
        },
        toggleFilterInit: function(divId) {
            toggleFilterInit(divId);
        },
        initToggleColCustomById: function(tableId) {
            toggleColCustomById(tableId);
            dragSorting();
        },

        // initMap: function() {
        // 	var map;
        // 	$(document).ready(function() {
        // 		map = new GMaps({
        // 			div: "#map",
        // 			scrollwheel: false,
        // 			lat: 40.748866,
        // 			lng: -73.988366
        // 		});

        // 		var marker = map.addMarker({
        // 			lat: 40.748866,
        // 			lng: -73.988366,
        // 			title: "Company, Inc."
        // 		});
        // 	});
        // },

        // init main components
        initComponents: function() {
            this.initAjax();
        },

        reinitMaterialize: function() {
            handleMaterialize();
        },
        // public function to add callback a function which will be called on window resize
        addResizeHandler: function(func) {
            resizeHandlers.push(func);
        },

        // public functon to call _startresizeHandlers
        runResizeHandlers: function() {
            _startResizeHandlers();
            console.log("sadfsdfd");
        },

        // check for device touch support
        isTouchDevice: function() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },

        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        getViewPort: function() {
            let e = window,
                a = "inner";
            if (!("innerWidth" in window)) {
                a = "client";
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + "Width"],
                height: e[a + "Height"]
            };
        },

        tooltipsInit: function() {
            handleTooltips();
        },

        select2Init: function() {
            handleSelect2();
        },

        destroySelect2: function(element) {
            $(element).select2("destroy");
        },

        // check IE8 mode
        isIE8: function() {
            return isIE8;
        },

        // check IE9 mode
        isIE9: function() {
            return isIE9;
        },

        getResponsiveBreakpoint: function(size) {
            // bootstrap responsive breakpoints
            let sizes = {
                xs: 480, // extra small
                sm: 768, // small
                md: 992, // medium
                lg: 1200 // large
            };

            return sizes[size] ? sizes[size] : 0;
        },

        generateID: function() {
            let id = (
                "0000" + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)
            ).slice(-5);
            return id;
        }
    };
})();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function closeFilterPopup() {
    $('.filter-dropdown.project-filter-dropdown.open-popup').removeClass('open-popup').removeClass('open');
    return false;

}
