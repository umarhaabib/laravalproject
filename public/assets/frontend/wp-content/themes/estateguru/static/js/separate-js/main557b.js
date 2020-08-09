jQuery( function( $ ) {
/**
Core script to handle core functions
**/

var Estatguru = (function() {
	// IE mode
	var isIE8 = false;
	var isIE9 = false;
	var isIE10 = false;
	var isIE11 = false;

    var resizeHandlers = [];

    // initializes main settings
    var handleVariable = function() {
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

    var _startResizeHandlers = function() {
        // reinitialize other subscribed elements
        for (var i = 0; i < resizeHandlers.length; i++) {
            var each = resizeHandlers[i];
            each.call();
        }
    };

    // handle the layout reinitialization on window resize
    var handleOnResize = function() {
        var resize;
        if (isIE8) {
            var currheight;
            $(window).resize(function() {
                if (currheight == document.documentElement.clientHeight) {
                    return; //quite event since only body resized not window.
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
                    clearTimeout(resize);
                }
                resize = setTimeout(function() {
                    _startResizeHandlers();
                }, 50); // wait 50ms until window resize finishes.
            });
        }
    };

    var handleMaterialize = function() {
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
    var handleDropdowns = function() {
        /* Hold dropdown on click */
        $("body").on("click", ".dropdown-menu.hold-on-click", function(e) {
            e.stopPropagation();
        });
    };

    var handleMobileNavbar = function() {
        $("#mobileNavbarNav,#navbarNav").on("show.bs.collapse", function() {
            $("nav.navbar").addClass("navbar-opened");
            $("body").addClass("o-hidden");
        });
        $("#mobileNavbarNav,#navbarNav").on("hide.bs.collapse", function() {
            $("nav.navbar").removeClass("navbar-opened");
            $("body").removeClass("o-hidden");
        });
    };

    var mobileDropdownSlide = function() {
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

    var handleTooltips = function() {
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

    var tableColHover = function() {
        var allCells = $(".column-hovered-table thead th,.column-hovered-table tbody td");
        allCells
            .on("mouseover", function() {
                var el = $(this);
                var cols = el
                    .parents(".column-hovered-table")
                    .find("thead,tbody")
                    .find("th,td");
                var pos = el.index();
                cols = cols.filter(":nth-child(" + (pos + 1) + ")");
                var sortable = cols.find(".sortable-header");
                if (sortable.length > 0) {
                    cols.addClass("table-column-hover");
                }
            })
            .on("mouseout", function() {
                allCells.removeClass("table-column-hover");
            });
    };

    var handlePopover = function() {
        $('[data-toggle="popover"]').popover({
            trigger: "focus"
        });
    };

    var handlePopoverBottomLeft = function() {
        $('[data-toggle="popoverTopLeft"]').popover({
            // trigger: "focus",
            offset: 100
        });
    };
    var handlePopoverLeftTop = function() {
        $('[data-toggle="popoverLeftTop"]').popover({
            // trigger: "focus",
            // offset: "10px 100px",
            // placements: "right-start"
        });
    };
    var handleSelect2 = function() {
        if (!jQuery().select2) {
            return;
        }

        $(".select2me, .dataTables_length select")
            .not(".select2-initialized")
            .each(function(index, element) {
                $(element)
                    .select2({
                        theme: "bootstrap"
                        // minimumResultsForSearch: -1
                    })
                    .addClass("select2-initialized");
            });
        $(".select2-search input").prop("readonly", true);
    };

    var handleSidebarToggler = function() {
        var body = $("body");
        $("body").on("click", ".btn-sidebar", function(e) {
            e.preventDefault();
            $(".main-content-wrapper").toggleClass("sidebar-closed");
        });
    };

	var handleErrorPositioning = function() {
		var headerHeigth = $("header").height();
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

    var openPageInfoBox = function(id) {
        var elem = $("#"+id);
        var headerHeigth = $("header").height();
        elem.css("top", headerHeigth);
        elem.show();
        setTimeout(function() {
            elem.find(".dialogue-error-popup").slideDown(300);
            elem.find(".dialogue-info-message-popup").slideDown(300);
        }, 100);
    };

    var closePageInfoBox = function(id) {
        var elem = $("#"+id);
        elem.hide();
        elem.find(".dialogue-error-popup").slideDown(300);
        elem.find(".dialogue-info-message-popup").slideDown(300);
    };

    // var initDateFilter = function() {
    // 	$(".filter-datepicker").datepicker({
    // 		calendarWeeks: true
    // 	});
    // };

    var handleTableDetails = function() {
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

    var triggerLoginPopup = function() {
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

    var select2PagingDropMenu = function() {
        if (!jQuery().select2) {
            return;
        }

        $(".paging-select")
            .not(".select2-initialized")
            .each(function(index, element) {
                $(element)
                    .select2({
                        dropdownCssClass: "table-paging-select",
                        theme: "bootstrap",
                        minimumResultsForSearch: -1
                    })
                    .addClass("select2-initialized");
            });
        // $(".paging-select")
        // 	.data("select2")
        // 	.$dropdown.addClass("paging-select-dropdown");
    };

    var initAutoresize = function() {
        // $("textarea").bind("input");
        $("textarea").on("input", function(e) {
            var el = e.target;
            el.style.height = "28px";
            el.style.height = el.scrollHeight + "px";
        });
    };
    

    var showHidaPass = function() {

        $('a.show-pass-icon').on('click', function(e) {
            e.preventDefault();

            var $passwordInput = $(this).parent().find('input[name="password"]');

            


            if ($passwordInput.attr('type') == 'password') {
                $passwordInput.replaceWith($passwordInput.clone(true, true).attr('type', 'text'));
            } else {
                $passwordInput.replaceWith($passwordInput.clone(true, true).attr('type', 'password'));
            }

        });
        

    };

    var toggleFilter = function() {
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

    var toggleColCustom = function() {
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


    var tableActionDropdown = function() {
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

    var getFileUploadName = function() {
        $("#browse-input").on("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                $(".file-label-text").html('<span class="upload-file-name">' + file.name + "</span>");
            } else {
                $(".file-label-text").html("Browse");
            }
        });
    };

    var searchOpening = function() {
        $(".btn-mob-search").on("click", function(e) {
            e.preventDefault();
            if ($(".search-wrapper").hasClass("open")) {
                $(".search-wrapper").removeClass("open");
            } else {
                $(".search-wrapper").addClass("open");
            }
        });
    };

    var faqToggleLink = function() {
        var isMobile = Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
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

    var toggleHelpVideoList = function() {
        $(".btn-open-nav-list").on("click", function(e) {
            e.preventDefault();
            $(".section-videos .faq-nav-tabs").toggle(300);
        });
    };

    var openDateWrapperBox = function() {
        $(".btn-open-calendar-box").on("click", function(e) {
            e.preventDefault();
            if ($(".date-filter-tab-box").hasClass("open")) {
                $(".date-filter-tab-box").removeClass("open");
            } else {
                $(".date-filter-tab-box").addClass("open");
            }
        });
    };

    var accountInfoEdit = function() {
        $(".btn-action-edit").on("click", function(e) {
            e.preventDefault();
            var element_parent = $(this).parents(".account-info-item");
            var element = element_parent.find($(".form-account-info"));
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

    var accountAddInfo = function() {
        $(".btn-add").on("click", function(e) {
            e.preventDefault();
            var element = $(this)
                .parents(".account-info-item")
                .find($(".form-add-info"));
            if ($(".form-account-info").hasClass("show")) {
                element.removeClass("show");
            } else {
                element.addClass("show");
            }
        });
    };

    var openpageHeaderOffset = function() {
        var offset = $("header").outerHeight();

        // $(".page:not(.auth-page) .page-wrapper").css({
        // 	"padding-top": offset
        // });
    };

    var handleAjaxCompleate = function() {
        $(document).ajaxComplete(function() {
            Estatguru.reinitMaterialize();
        });
    };

    var documentTriggerClick = function() {
        $(document).click();
    };

    var dragSorting = function() {
        // if (!jQuery().sortable) {
        // 	return;
        // }
        // sortable('.dragSorting-box', {
        // 	forcePlaceholderSize: true,
        // 	placeholderClass: 'ph-class',
        // 	hoverClass: 'bg-maroon yellow',
        // 	handle: 'i.icon-drag'
        // });
        if ($(".dragSorting-box").length) {
            $(".dragSorting-box").sortable({
                handle: "i.icon-drag",
                containment: $('#filterForm')
            });
            $(".dragSorting-box").disableSelection();
        };
    };

    var toggleHowToStart = function() {
        $(".btn-how-to-start").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").addClass("show")
            $(this).hide();
        });
        $(".btn-back-comarison").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").removeClass("show")
            $(".btn-how-to-start").show();
        });
    };

    var toggleHowToStartMob = function() {
        $(".btn-how-to-start-mob").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").addClass("show");
            $(".main-content-right").addClass("mob-top");
            $(".hide-in-mob").hide();
            $(".comarison-right-content").hide();
            $('html, body').animate({
                scrollTop: $("#main-comarison-top").offset().top - 70
            }, 500);
        });
        $(".btn-join-mob").on("click", function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $("#main-comarison-bottom").offset().top - 70
            }, 500);
        });
        $(".btn-back-comarison-mob").on("click", function(e) {
            e.preventDefault();
            $(".how-to-start-content").removeClass("show");
            $(".main-content-right").removeClass("mob-top");
            $(".hide-in-mob").show();
            $(".comarison-right-content").show();
            $('html, body').animate({
                scrollTop: $("#main-comarison-bottom").offset().top - 70
            }, 500);
        });
    };

    var goToSelectedId = function() {
        var isMobile = Estatguru.getViewPort().width <= Estatguru.getResponsiveBreakpoint("sm");
        $(".btn-apply-form").on("click", function(e) {
            e.preventDefault();
            console.log(isMobile);
            if (isMobile) {
                    $('html, body').animate({
                    scrollTop: $("#apply-block").offset().top - 70
                }, 500);
            } else {
                $('html, body').animate({
                    scrollTop: $("#apply-block").offset().top - 120
                }, 500);
            }
        });
    };

    var popOverInit = function() {
        $('[data-toggle="popover"]').popover({
            html: true,
            content: function() {
                return $('#popover-content').html();
            }
        })
    }

    var actionDropdownMenu = function() {
        $('.filter-form').on('click', function(e) {
            e.stopPropagation()
        });
        $('#dropdownmenu-sortable .btn-submit-col').on('click', function(e) {
            $('#dropdownmenu-sortable').dropdown('toggle')
        })
    }

    var actionMainHeaderMenu = function() {
        $('.btn-main-header').on('click', function(e) {
            e.preventDefault();
            $("body").toggleClass("ovHidden");
            $(this).toggleClass("close-menu");
            $(this).parents(".header-main").find(".menu-wrapper").toggleClass("open");
        })
    }

    var collapseToggleEvent = function() {
        $('.accordion .collapse').on('shown.bs.collapse', function() {
            if ($(this).hasClass("show")) {
                $(this).parents(".main-box").addClass("openCollapse")
            } else {
                $(this).parents(".main-box").removeClass("openCollapse")
            };
        })
        $('.accordion .collapse').on('hidden.bs.collapse', function() {
            if ($(this).hasClass("show")) {
                $(this).parents(".main-box").addClass("openCollapse")
            } else {
                $(this).parents(".main-box").removeClass("openCollapse")
            };
        })
    }

    var headerSmoothScroll = function() {
        $(document).on("scroll", function(){
            var scroll_top = $(document).scrollTop();
            if (scroll_top >= 200) {
                $(".page-main-openpage").find(".navbar").addClass("bgFull");
            } else {
                $(".page-main-openpage").find(".navbar").removeClass("bgFull");
            };
        })
    }

    return {
        //main function to initiate the theme
        init: function() {
            //IMPORTANT!!!: Do not modify the core handlers call order.
            //Core handler
            handleVariable(); // initialize core variables
            handleOnResize(); // set and handle responsive

            //UI Component handlers
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
            // handleDateTimePicker();

			handleErrorPositioning();
			// initDateFilter();

            getFileUploadName();
            accountInfoEdit();
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

            // click events
            handleTableDetails();
            handleMobileNavbar();
            tableActionDropdown();
            triggerLoginPopup();
            goToSelectedId();
            actionMainHeaderMenu();
            headerSmoothScroll();
            // handleCopyTooltip();

            // ajaxCompleate
            handleAjaxCompleate();
        },

        //main function to initiate core javascript after ajax complete
        initAjax: function() {
            handleTooltips();
            handlePopover();
            handleSelect2();
            // handleDateTimePicker();
            handleDropdowns(); // handle dropdowns
            // handleAjaxCompleate();
            // toggleColCustom();
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

        //init main components
        initComponents: function() {
            this.initAjax();
        },

        reinitMaterialize: function() {
            handleMaterialize();
        },
        //public function to add callback a function which will be called on window resize
        addResizeHandler: function(func) {
            resizeHandlers.push(func);
        },

        //public functon to call _startresizeHandlers
        runResizeHandlers: function() {
            _startResizeHandlers();
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
            var e = window,
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
            var sizes = {
                xs: 480, // extra small
                sm: 768, // small
                md: 992, // medium
                lg: 1200 // large
            };

            return sizes[size] ? sizes[size] : 0;
        },

        generateID: function() {
            var id = ("0000" + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)).slice(-5);
            return id;
        }
    };
})();

$(document).ready(function() {
        Estatguru.init();

        if ( typeof about != 'undefined' ) {
                about.init();
        }

    showHideCookiesPopup();

        if ( $('div.log-backdrop').length == 0 ) {
                setInterval(function() {
                        $.ajax({
                                url: estateguru.ajax_url,
                                type: 'POST',
                                data: {
                                        action: 'check_active_session'
                                },
                                success: function(response) {
                                        if ( response == 'expired' ) {
                                                //window.location = estateguru.home_url + '?heartBeatTriggered=true';
                                        }
                                }
                        });
                }, 5*60*1000);
        }

    $(".to-get-offer").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $("#loan-request-form").offset().top - 120
            },
            500
        );
    });

    $('form#loan-request-form button.get-offer').on('click',function(){
        $(this).hide();

        $('form#loan-request-form div.offer-content').fadeIn(300);
    });

        $loginForm = $("form#loginForm");

        if ( $loginForm.length > 0 ) {
                $loginForm.find('a.show-pass-icon').on('click',function(e){
                        e.preventDefault();

                        var $passwordInput = $(this).parent().find('input[name="password"]');

                        if ($passwordInput[0].value) {
                                $(this).parent().addClass('is-filled');
                    } else {
                                $(this).parent().removeClass('is-filled');
                    }

                    $($passwordInput[0]).on('blur', function (e) {
                                if(e.target.value) {
                                            $(this).parent().addClass('is-filled');
                                } else {
                                            $(this).parent().removeClass('is-filled');
                                }
                    });

                        Estatguru.reinitMaterialize();
                });

                var options = {
                        type: 'POST',
                        beforeSubmit: function() {
                                if ( $loginForm.attr('action').indexOf('/login/loginByEmail') > 0 ) {
                                        return true;
                                }

                                var validFields = true;

                                if ( $loginForm.find('input[name="username"]').val() == '' ) {
                                        $loginForm.find('em#username-error').show();

                                        validFields = false;
                                } else {
                                        $loginForm.find('em#username-error').hide();
                                }

                                if ( $loginForm.find('input[name="password"]').val() == '' ) {
                                        $loginForm.find('em#password-error').show();

                                        validFields = false;
                                } else {
                                        $loginForm.find('em#password-error').hide();
                                }

                                if ( ! validFields ) {
                                        return false;
                                }

                                $loginForm.find("input,button").attr("disabled", true);
                        },
                        success: function(response) {
                                window.location = $loginForm.data('redirect');
                        },
                        complete: function(request, textStatus) {
                                if ( request.status == 406 ) {
                                        $('#divErrorMessage span#error-text').text(request.getResponseHeader('error'));
                                        $('#divErrorMessage').show();

                                        $loginForm.find('input[name="password"]').val('');
                                }

                                if ( request.status != 200 ) {
                                        $loginForm.find("input,button").removeAttr("disabled");
                                }
                        }
                };

                $loginForm.ajaxForm(options);
        }

        $jobApplyForm = $("form#job-apply-form");

        if ($jobApplyForm.length > 0) {
                var options = {
                        type: "POST",
                        dataType: "json",
                        url: estateguru.ajax_url,
                        data: {
                                action: "apply_job"
                        },
                        beforeSubmit: function() {
                                $jobApplyForm.find("input,button").attr("disabled", true);
                                $jobApplyForm.find('button[type="submit"]').html("Sending");
                        },
                        success: function(response) {
                                $jobApplyForm.find(".invalid").removeClass("invalid");

                                $jobApplyForm.find("small.error").remove();

                                if (response.errors.length == 0) {
                                        $("#apply-block").html("<p>" + response.text + "</p>");
                                } else {
                                        $jobApplyForm.find("input,button").removeAttr("disabled");
                                        $jobApplyForm.find('button[type="submit"]').html("Apply");

                                        jQuery.each(response.errors, function(i, error) {
                                                $jobApplyForm
                                                        .find('input[name="' + error.name + '"]')
                                                        .addClass("invalid")
                                                        .after('<small class="error">' + error.message + "</small>");
                                        });
                                }
                        }
                };

                $jobApplyForm.ajaxForm(options);
        }

        $emailUsForm = $("form#email-us-form");

        if ($emailUsForm.length > 0) {
                $emailUsForm.find('select[name="topic"]').on('change',function(){
                    if ( $(this).val() == '' ) {
                            $emailUsForm.find('button[type="submit"]').attr("disabled", true);
                    } else {
                            $emailUsForm.find('button[type="submit"]').removeAttr("disabled");
                    }
                });

            var options = {
                type: "POST",
                url: 'https://estateguru.co/portal/contact/sendContactEmail',
                data: {
                    action: "send_email"
                },
                beforeSubmit: function() {
                    $emailUsForm.find("input,textarea,select,button").attr("disabled", true);
                    $emailUsForm.find('button[type="submit"]').html("Sending");
                },
                success: function(response) {
                    $("#emailUs").html('<p><div class="message-box success-message-box"><p>' + estateguru.email.thanks + '</p></div></p>');
                },
                error: function() {
                    $emailUsForm.find("input,textarea,select,button").removeAttr("disabled");
                    $emailUsForm.find('button[type="submit"]').html("Send");

                    if ( $emailUsForm.find("em.error").length == 0 ) {
                        $emailUsForm
                            .find('input[name="email"]')
                            .addClass("invalid")
                            .after('<em class="error bmd-help help-block" style="display: block;">' + estateguru.email.error.required + "</em>");
                    }
                }
            };

                $emailUsForm.ajaxForm(options);
        }

    $callBackForm = $("form#call-back-form");

    if ($callBackForm.length > 0) {
        var options = {
            type: "POST",
            dataType: 'json',
            //url: estateguru.home_url + '',
            url: estateguru.ajax_url,
            data: {
                action: "send_call_back_request"
            },
            beforeSubmit: function() {
                $callBackForm.find("input,button").attr("disabled", true);
            },
            success: function(response) {
                if (response.errors.length == 0) {
                    var thankYouMessage = $callBackForm.find('p.submit-text').clone();

                    thankYouMessage.show();

                    $callBackForm.html(thankYouMessage);
                } else {
                    $callBackForm.find('input,button').removeAttr('disabled');
                }
            },
            error: function() {
                $callBackForm.find("input,button").removeAttr("disabled");
            }
        };

        $callBackForm.ajaxForm(options);
    }

    $('form#loan-request-form select[name="country"]').on('change',function(){
        if ( $(this).val() == '' ) {
            $('form#loan-request-form button[type="submit"]').attr('disabled','disabled');
        } else {
            $('form#loan-request-form button[type="submit"]').removeAttr('disabled');
        }
    });

    $('form#loan-request-form').on('submit',function(){
        var valid = true;

        $(this).find('.error').remove();

        var $companyName = $.trim( $(this).find('input[name="company_name"]').val() );
        var $companyEmail = $.trim( $(this).find('input[name="company_email"]').val() );


        if ( $companyName == '' ) {
            $(this).find('input[name="company_name"]').after('<em class="error bmd-help help-block" style="display: block;">' + estateguru.email.error.required + '</em>');

            valid = false;
        }

        if ( $companyEmail == '' ) {
            $(this).find('input[name="company_email"]').after('<em class="error bmd-help help-block" style="display: block;">' + estateguru.email.error.required + '</em>');

            valid = false;
        } else {
            if ( ! validateEmail( $companyEmail ) ) {
                $(this).find('input[name="company_email"]').after('<em class="error bmd-help help-block" style="display: block;">' + estateguru.email.error.invalid_email + '</em>');

                valid = false;
            }
        }

        return valid;
    });

        $ambassadorContactForm = $('form#ambassador-contact-form');

        if ($ambassadorContactForm.length > 0) {
            var options = {
                type: 'POST',
                dataType: 'json',
                url: estateguru.ajax_url,
                data: {
                    action: 'send_ambassador_contact'
                },
                beforeSubmit: function() {
                    $ambassadorContactForm.find('input,textarea,select,button').attr('disabled', true);
                },
                success: function(response) {
                    $ambassadorContactForm.find('.invalid').removeClass('invalid');

                    $ambassadorContactForm.find('small.error').remove();

                    if (response.errors.length == 0) {
                        $ambassadorContactForm.find('.form-group,.pt-3').remove();
                        $ambassadorContactForm.find('h6').html(response.text);
                    } else {
                        $ambassadorContactForm.find('input,textarea,select,button').removeAttr('disabled');

                        jQuery.each(response.errors, function(i, error) {
                            $ambassadorContactForm
                                .find('input[name="' + error.name + '"]')
                                .addClass('invalid')
                                .after('<small class="error">' + error.message + '</small>');
                        });
                    }
                }
            };

            $ambassadorContactForm.ajaxForm(options);
        }

        $ambassadorContactFormFooter = $('form#ambassador-contact-form-footer');

        if ($ambassadorContactFormFooter.length > 0) {
            var options = {
                type: 'POST',
                dataType: 'json',
                url: estateguru.ajax_url,
                data: {
                    action: 'send_ambassador_contact'
                },
                beforeSubmit: function() {
                    $ambassadorContactFormFooter.find('input,textarea,select,button').attr('disabled', true);
                },
                success: function(response) {
                    $ambassadorContactFormFooter.find('.invalid').removeClass('invalid');

                    $ambassadorContactFormFooter.find('small.error').remove();

                    if (response.errors.length == 0) {
                        $ambassadorContactFormFooter.parent().html('<div class="row"><div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3"><h2 class="main-section-title">' + response.text + '</h2></div></div>');
                    } else {
                        $ambassadorContactFormFooter.find('input,textarea,select,button').removeAttr('disabled');

                        jQuery.each(response.errors, function(i, error) {
                            $ambassadorContactFormFooter
                                .find('input[name="' + error.name + '"]')
                                .addClass('invalid')
                                .after('<small class="error">' + error.message + '</small>');
                        });
                    }
                }
            };

            $ambassadorContactFormFooter.ajaxForm(options);
        }
});
} );