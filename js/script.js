var THEMEMASCOT = {};
(function ($) {
	"use strict";

	/* ---------------------------------------------------------------------- */
	/* --------------------------- Start Demo Switcher  --------------------- */
	/* ---------------------------------------------------------------------- */
	var showSwitcher = true;
	var $body = $("body");
	var $style_switcher = $("#style-switcher");
	if (!$style_switcher.length && showSwitcher) {
		$.ajax({
			url: "color-switcher/style-switcher.html",
			success: function (data) {
				$body.append(data);
			},
			dataType: "html",
		});
	}
	/* ---------------------------------------------------------------------- */
	/* ----------------------------- En Demo Switcher  ---------------------- */
	/* ---------------------------------------------------------------------- */

	THEMEMASCOT.isRTL = {
		check: function () {
			if ($("html").attr("dir") === "rtl") {
				return true;
			} else {
				return false;
			}
		},
	};

	THEMEMASCOT.isLTR = {
		check: function () {
			if ($("html").attr("dir") !== "rtl") {
				return true;
			} else {
				return false;
			}
		},
	};

	// Preloader area start here ***
	const loader = () => {
		$(window).on("load", function () {
			$("#preloader").addClass("loaded");
			$("#preloader").delay(500).fadeOut();
		});
	};
	loader();
	// Preloader area end here ***

	// Color mood area start here ***
	// function setThemeColor(color) {
	// 	const root = document.documentElement;
	// 	root.setAttribute("data-theme", color);
	// }
	// Color mood area end here ***

	// Header area start here ***
	// Mobile menu
	$(".header-area nav").meanmenu();

	// Menu Fixed
	var fixed_top = $(".header-area");
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 150) {
			fixed_top.addClass("menu-fixed animated fadeInDown");
		} else {
			fixed_top.removeClass("menu-fixed fadeInDown");
		}
	});
	// Header area end here ***

	// Banner two slider area start here ***
	var sliderActive1 = ".banner-two__slider";
	var sliderInit1 = new Swiper(sliderActive1, {
		loop: true,
		slidesPerView: 1,
		effect: "fade",
		speed: 3000,
		autoplay: {
			delay: 7000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".banner-two__arry-next",
			prevEl: ".banner-two__arry-prev",
		},
		pagination: {
			el: ".banner-two__pagination",
			clickable: true,
		},
	});
	function animated_swiper(selector, init) {
		var animated = function animated() {
			$(selector + " [data-animation]").each(function () {
				var anim = $(this).data("animation");
				var delay = $(this).data("delay");
				var duration = $(this).data("duration");
				$(this)
					.removeClass("anim" + anim)
					.addClass(anim + " animated")
					.css({
						webkitAnimationDelay: delay,
						animationDelay: delay,
						webkitAnimationDuration: duration,
						animationDuration: duration,
					})
					.one("animationend", function () {
						$(this).removeClass(anim + " animated");
					});
			});
		};
		animated();
		init.on("slideChange", function () {
			$(sliderActive1 + " [data-animation]").removeClass("animated");
		});
		init.on("slideChange", animated);
	}
	animated_swiper(sliderActive1, sliderInit1);
	// Banner two slider area end here ***

	// Banner four slider area start here ***
	var swiper = new Swiper(".banner-four__slider", {
		loop: true,
		spaceBetween: 10,
		speed: 800,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".banner-four__pagination",
			clickable: true,
		},
	});
	// Banner four slider area end here ***

	// Gsap Animation area start here ***
	gsap.utils.toArray(".gsap__parallax").forEach(function (container) {
		let image = container.querySelector("img");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: 1, // Increased scrub value for smoother scrolling response
				start: "top bottom", // Animation starts when the container's top hits the bottom of the viewport
				end: "bottom top", // Animation ends when the container's bottom hits the top of the viewport
			},
		});

		tl.fromTo(
			image,
			{ yPercent: -10 }, // Starting position
			{ yPercent: 10, ease: "power1.inOut" } // Ending position with a smoother easing curve
		);
	});

	gsap.utils.toArray(".gsap__parallax-zoom").forEach(function (container) {
		let image = container.querySelector("img");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: 1, // Smooth and slow scrolling
				start: "top bottom", // When the container's top hits the bottom of the viewport
				end: "bottom top", // When the container's bottom hits the top of the viewport
			},
		});

		tl.fromTo(
			image,
			{
				yPercent: -10, // Parallax start position
				scale: 1.2, // Zoom in at the start
			},
			{
				yPercent: 10, // Parallax end position
				scale: 1, // Zoom out to normal
				ease: "power1.inOut", // Smooth easing for both effects
			}
		);
	});
	// Gsap Animation area end here ***

	// Scroll Fade area start here ***
	$(window).scroll(function () {
		var scrolled = $(this).scrollTop();

		$(".parallaxScroll").css({
			transform:
				"translate3d(0, " +
				-(scrolled * 0.2) +
				"px, 0) rotateX(" +
				scrolled * 0.1 +
				"deg)",
			opacity: 1 - scrolled / 600,
		});

		$(".parallaxScaleScroll").css({
			transform: "scale(" + (1 + scrolled / 1500) + ")",
		});

		$(".parallaxRightScroll").css({
			transform: "translateX(" + scrolled / 2 + "px)", // Move the element to the right
		});

		$(".parallaxLeftScroll").css({
			transform: "translateX(" + -(scrolled / 2) + "px)", // Move the element to the left
		});

		$(".parallaxRightRotateScroll").css({
			transform:
				"translateX(" +
				scrolled / 2 +
				"px) rotate(" +
				scrolled / 2 +
				"deg)",
		});

		$(".parallaxRoteteYScroll").css({
			transform: "rotateY(" + scrolled * 0.2 + "deg)", // 3D rotate along Y-axis
			opacity: 1 - scrolled / 500, // Fade out slowly
		});

		$(".parallaxRotete360Scroll").css({
			transform: "rotate(" + scrolled + "deg)", // Rotate 360 degrees based on scroll
		});
	});
	// Scroll Fade area end here ***

	// Mouse move paralax area end here ***
	if ($(window).width() > 780) {
		$(".paralax__animation").mousemove(function (e) {
			$("[data-depth]").each(function () {
				var depth = $(this).data("depth");
				var amountMovedX = (e.pageX * -depth) / 4;
				var amountMovedY = (e.pageY * -depth) / 4;

				$(this).css({
					transform:
						"translate3d(" +
						amountMovedX +
						"px," +
						amountMovedY +
						"px, 0)",
				});
			});
		});
	}
	// Mouse move paralax area end here ***

	// FullScreen search area end here ***
	var $searchWrap = $(".search-wrap");
	var $navSearch = $(".nav-search");
	var $searchClose = $("#search-close");
	$(".search-trigger").on("click", function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: "toggle" }, 500);
		$navSearch.add($searchClose).addClass("open");
	});
	$(".search-close").on("click", function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: "toggle" }, 500);
		$navSearch.add($searchClose).removeClass("open");
	});
	function closeSearch() {
		$searchWrap.fadeOut(200);
		$navSearch.add($searchClose).removeClass("open");
	}
	$(document.body).on("click", function (e) {
		closeSearch();
	});
	$(".search-trigger, .main-search-input").on("click", function (e) {
		e.stopPropagation();
	});
	// FullScreen search area end here ***

	// Blog slider area start here ***
	var blogSlider = new Swiper(".blog-slider", {
		loop: "true",
		spaceBetween: 24,
		speed: 1000,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		breakpoints: {
			767: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 2,
			},
			1199: {
				slidesPerView: 3,
			},
		},
	});
	// Blog slider area end here ***

	// Feature slider area start here ***
	var swiper = new Swiper(".feature-slider", {
		spaceBetween: 24,
		speed: 1000,
		navigation: {
			nextEl: ".feature-arry-next",
			prevEl: ".feature-arry-prev",
		},
		breakpoints: {
			991: {
				slidesPerView: 3,
			},
		},
	});
	// Feature slider area end here ***

	// Product slider area start here ***
	var swiper = new Swiper(".product-slider", {
		spaceBetween: 24,
		speed: 1000,
		navigation: {
			nextEl: ".product-arry-next",
			prevEl: ".product-arry-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			767: {
				slidesPerView: 2,
			},
			1199: {
				slidesPerView: 3,
			},
		},
	});

	var swiper = new Swiper(".product-slider-three", {
		loop: true,
		spaceBetween: 24,
		speed: 1000,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".product-arry-next-three",
			prevEl: ".product-arry-prev-three",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			575: {
				slidesPerView: 2,
			},
			767: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 4,
			},
		},
	});
	// Product slider area end here ***

	// Service slider area start here ***
	var swiper = new Swiper(".service-slider-two", {
		spaceBetween: 24,
		speed: 1000,
		navigation: {
			nextEl: ".service-arry-next-two",
			prevEl: ".service-arry-prev-two",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			767: {
				slidesPerView: 2,
			},
			1199: {
				slidesPerView: 3,
			},
		},
	});

	var swiper = new Swiper(".service-slider-three", {
		spaceBetween: 24,
		speed: 1000,
		navigation: {
			nextEl: ".service-arry-next-three",
			prevEl: ".service-arry-prev-three",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			767: {
				slidesPerView: 2,
			},
			1199: {
				slidesPerView: 3,
			},
		},
	});
	// Service slider area end here ***

	// Gallery slider area start here ***
	var swiper = new Swiper(".gallery-slider-two", {
		spaceBetween: 24,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".gallery-arry-next-two",
			prevEl: ".gallery-arry-prev-two",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			575: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 3,
			},
			1199: {
				slidesPerView: 4,
			},
		},
	});
	// Gallery slider area end here ***

	// Team slider area start here ***
	var swiper = new Swiper(".team-slider", {
		spaceBetween: 15,
		speed: 1000,
		navigation: {
			nextEl: ".team-arry-next",
			prevEl: ".team-arry-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			575: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 3,
			},
			1199: {
				slidesPerView: 4,
			},
		},
	});
	// Team slider area end here ***

	// Testimonial slider area start here ***
	var swiper = new Swiper(".testimonial-slider", {
		loop: "true",
		spaceBetween: 24,
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".testimonial-arry-next",
			prevEl: ".testimonial-arry-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			767: {
				slidesPerView: 2,
			},
			1199: {
				slidesPerView: 3,
			},
		},
	});

	var swiperThumb = new Swiper(".testimonial-slider-thumb-two", {
		spaceBetween: 20,
		speed: 1000,
		freeMode: true,
		breakpoints: {
			320: {
				slidesPerView: 3,
			},
		},
	});
	var swiper = new Swiper(".testimonial-slider-two", {
		spaceBetween: 50,
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		thumbs: {
			swiper: swiperThumb,
		},
	});
	// Testimonial slider area end here ***

	// Swiper marqee area start here ***
	var instagramSlider = new Swiper(".instagram-slider", {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 5000,
		autoplay: {
			delay: 1,
			disableOnInteraction: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			575: {
				slidesPerView: 2,
			},
			767: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
			1300: {
				slidesPerView: 5,
			},
		},
	});
	// Swiper marqee area end here ***

	// Swiper marqee area start here ***
	var marqueeSlider = new Swiper(".marqueeSwiper__slider", {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 3000,
		autoplay: {
			delay: 1,
			disableOnInteraction: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			575: {
				slidesPerView: 2,
			},
			767: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
			1300: {
				slidesPerView: 5,
			},
		},
	});
	// Swiper marqee area end here ***

	//Progress Bar
	if ($('.progress-line').length) {
		$('.progress-line').appear(function () {
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width', percent + '%');
		}, { accY: 0 });
	}

	// count Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
					var el = $(this);
					var percent = el.data("percent");
					$(el).css("width", percent).addClass("counted");
				}, {
					accY: -50
			}
		);
	}

	// Project change background image area end here ***
	$(".project__slider .swiper-slide").on("mouseenter click", function () {
		var tab_id = $(this).attr("data-tab");
		$(".project__slider .swiper-slide").removeClass("active");
		$(this).addClass("active");

		$(".project__image .tab-img ").removeClass("active");
		$("#" + tab_id).addClass("active");

		if ($(this).hasClass("active")) {
			return false;
		}
	});
	$(".project__arry-next").on("click", function () {
		$(".project__arry-next").click();
	});
	$(".project__arry-prev").on("click", function () {
		$(".project__arry-prev").click();
	});
	// Project change background image area end here ***

	// Hover add & remove js area start here ***
	$(".hover-item").on("mouseenter", function () {
	    $(".hover-item").removeClass("active");
	    $(this).addClass("active");
	});
	// Hover add & remove js area end here ***

	// Horizontal accordion js area start here ***
	$(".hzAccordion__item").on("click", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
	// Horizontal accordion js area end here ***

	//Accordion Box
	if ($('.accordion-box').length) {
		$(".accordion-box").on('click', '.acc-btn', function () {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

	//Tabs Box
	if ($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

	//Fact Counter + Text Count
	if ($('.product-details .bxslider').length) {
		$('.product-details .bxslider').bxSlider({
        nextSelector: '.product-details #slider-next',
        prevSelector: '.product-details #slider-prev',
        nextText: '<i class="fa fa-angle-right"></i>',
        prevText: '<i class="fa fa-angle-left"></i>',
        mode: 'fade',
        auto: 'true',
        speed: '700',
        pagerCustom: '.product-details .slider-pager .thumb-box'
    });
	};

	//Distance Range Slider
	if ($('.distance-range-slider').length) {
		$(".distance-range-slider").slider({
			range: true,
			min: 0,
			max: 2000,
			values: [0, 1500],
			slide: function (event, ui) {
				$("input.range-amount").val(ui.values[0] + " - " + ui.values[1]);
			}
		});

		$("input.range-amount").val($(".distance-range-slider").slider("values", 0) + " - " + $(".distance-range-slider").slider("values", 1));
	}

	//Price Range Slider
	if($('.price-range-slider').length){
		$( ".price-range-slider" ).slider({
			range: true,
			min: 10,
			max: 99,
			values: [ 10, 60 ],
			slide: function( event, ui ) {
			$( "input.property-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
		
		$( "input.property-amount" ).val( $( ".price-range-slider" ).slider( "values", 0 ) + " - $" + $( ".price-range-slider" ).slider( "values", 1 ) );	
	}

  $(".quantity-box .add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".quantity-box .sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
  });

	// Background image area start here ***
	$("[data-background").each(function () {
		$(this).css(
			"background-image",
			"url( " + $(this).attr("data-background") + "  )"
		);
	});
	// Background image area end here ***

	// Background image hover change area start here ***
	$(".project__item").hover(function () {
		let newBackground = $(this).data("bg");
		$(".project__wrp")
			.attr("data-background", newBackground)
			.css("background-image", "url(" + newBackground + ")");
	});
	// Background image hover change area end here ***

	//LightBox / Fancybox
	if ($(".lightbox-image").length) {
		$(".lightbox-image").fancybox({
			openEffect: "fade",
			closeEffect: "fade",
			helpers: {
				media: {},
			},
		});
	}

	// Counter up area start here ***
	$(".stats-section").waypoint(function() {
		$(".count").counterUp({
			delay: 50,
			time: 1500,
		});
		this.destroy(); // Only trigger once
	}, {
		offset: '75%'
	});
	// Counter up area end here ***

	// Calender area start here ***
	$(document).on("ready", function () {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth();
		const $day = $(".calendar-dates");
		const $currDate = $(".calendar-current-date");
		const $prenexIcons = $(".calendar-header button");
		// Array of month names
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		// Function to generate the calendar
		const manipulate = () => {
			const dayOne = new Date(year, month, 1).getDay(); // First day of the month
			const lastDate = new Date(year, month + 1, 0).getDate(); // Last date of the month
			const dayEnd = new Date(year, month, lastDate).getDay(); // Day of the last date
			const monthLastDate = new Date(year, month, 0).getDate(); // Last date of previous month

			let lit = "";

			// Add the last dates of the previous month
			for (let i = dayOne; i > 0; i--) {
				lit += `<li class="inactive">${monthLastDate - i + 1}</li>`;
			}

			// Add the dates of the current month
			for (let i = 1; i <= lastDate; i++) {
				const isToday =
					i === date.getDate() &&
					month === new Date().getMonth() &&
					year === new Date().getFullYear()
						? "active"
						: "";
				lit += `<li class="${isToday}">${i}</li>`;
			}

			// Add the first dates of the next month
			for (let i = dayEnd; i < 6; i++) {
				lit += `<li class="inactive">${i - dayEnd + 1}</li>`;
			}

			// Update the current date and calendar dates
			$currDate.text(`${months[month]} ${year}`);
			$day.html(lit);
		};
		// Initial call to generate the calendar
		manipulate();
		// Add click event listeners to navigation icons
		$prenexIcons.on("click", function () {
			const isPrev = $(this).attr("id") === "calendar-prev";
			month = isPrev ? month - 1 : month + 1;

			// Handle month overflow/underflow
			if (month < 0 || month > 11) {
				date.setFullYear(year);
				date.setMonth(month);
				year = date.getFullYear();
				month = date.getMonth();
			} else {
				date.setDate(new Date().getDate());
			}

			// Update the calendar
			manipulate();
		});
	});
	// Calender area end here ***

	// Datetimepicker area start here ***
	$(document).on("ready", function () {
		const filterDate = $("#filter-date");
		if (filterDate.length) {
			filterDate.datetimepicker();
		}
	});
	// Datetimepicker area end here ***

	// Nice seclect area start here ***
	$(document).on("ready", function () {
		$("select").niceSelect();
	});
	// Nice seclect area end here ***

	//Gallery Filters
	if($('.filter-list').length){
	 	$('.filter-list').mixItUp({});
	}

	// Scroll to a Specific Div
	if ($(".scroll-to-target").length) {
		$(".scroll-to-target").on("click", function () {
			var target = $(this).attr("data-target");
			// animate
			$("html, body").animate({
				scrollTop: $(target).offset().top,
			});
		});
	}

	// Service Details Carousel
	const serviceCarousel = () => {
		if ($(".service-carousel .swiper-container").length) {
			const swiper = new Swiper(".service-carousel .swiper-container", {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".service-carousel .swiper-pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".service-carousel .swiper-button-next",
					prevEl: ".service-carousel .swiper-button-prev",
				},
			});
		}
	};
	serviceCarousel();

	// WOW Animatin area start here ***
	if ($(".wow").length) {
		var wow = new WOW({
			boxClass: "wow", // animated element css class (default is wow)
			animateClass: "animated", // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: false, // trigger animations on mobile devices (default is true)
			live: true, // act on asynchronously loaded content (default is true)
		});
		wow.init();
	}
	// WOW Animatin area start here ***
})(window.jQuery);
