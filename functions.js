/* global screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

( function( $ ) {
	var $body, $window, $sidebar, adminbarOffset, top = false,
	    bottom = false, windowWidth, windowHeight, lastWindowPos = 0,
	    topOffset = 0, bodyHeight, sidebarHeight, resizeTimer;

	// Add dropdown toggle that display child menu items.
	$( '.main-navigation .page_item_has_children > a, .main-navigation .menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' + screenReaderText.expand + '</button>' );

	$( '.dropdown-toggle' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		_this.toggleClass( 'toggle-on' );
		_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
		_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
		_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
	} );

	// Enable menu toggle for small screens.
	( function() {
		var secondary = $( '#secondary' ), button, menu, widgets, social;
		if ( ! secondary ) {
			return;
		}

		/*button = $( '.site-branding' ).find( '.secondary-toggle' );
		if ( ! button ) {
			return;
		}

		// Hide button if there are no widgets and the menus are missing or empty.
		menu    = secondary.find( '.nav-menu' );
		widgets = secondary.find( '#widget-area' );
		social  = secondary.find( '#social-navigation' );
		if ( ! widgets.length && ! social.length && ( ! menu || ! menu.children().length ) ) {
			button.hide();
			return;
		}
		*/


		$( '#sidebar' ).find( '.secondary-toggle' ).on( 'click.qd', function() {
			$( '#sidebar' ).toggleClass( 'toggled-fixed' );
			$( this ).toggleClass( 'toggled-fixed' );
		} );


		$( '.secondary-toggle' ).on( 'hover', function() {
			if (!$('#sidebar').hasClass('toggled-fixed')) {
				$( '#sidebar' ).addClass( 'toggled-on' );
				$( '.secondary-toggle' ).addClass( 'toggled-on' );
			}
		} );

		$( "#page" ).hover(function() {
			//if (!$('#sidebar').hasClass('toggled-fixed')) {
		  		$( '#sidebar' ).removeClass( 'toggled-on' );
				$( '.secondary-toggle' ).removeClass( 'toggled-on' );
				$( '#sidebar' ).removeClass( 'toggled-fixed' );
				$( '.secondary-toggle' ).removeClass( 'toggled-fixed' );
			//}
		});

	} )();

	// Sidebar scrolling.
	function resize() {
		windowWidth   = $window.width();
		windowHeight  = $window.height();
		bodyHeight    = $body.height();
		sidebarHeight = $sidebar.height();

		/*if ( 955 > windowWidth ) {
			top = bottom = false;
			$sidebar.removeAttr( 'style' );
		}*/
	}

	function scroll() {
		var windowPos = $window.scrollTop();

		/*if ( 955 > windowWidth ) {
			return;
		}*/

		if ( sidebarHeight + adminbarOffset > windowHeight ) {
			if ( windowPos > lastWindowPos ) {
				if ( top ) {
					top = false;
					topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top - adminbarOffset : 0;
					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! bottom && windowPos + windowHeight > sidebarHeight + $sidebar.offset().top && sidebarHeight + adminbarOffset < bodyHeight ) {
					bottom = true;
					$sidebar.attr( 'style', 'position: fixed; bottom: 0;' );
				}
			} else if ( windowPos < lastWindowPos ) {
				if ( bottom ) {
					bottom = false;
					topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top - adminbarOffset : 0;
					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! top && windowPos + adminbarOffset < $sidebar.offset().top ) {
					top = true;
					$sidebar.attr( 'style', 'position: fixed;' );
				}
			} else {
				top = bottom = false;
				topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top - adminbarOffset : 0;
				$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
			}
		} else if ( ! top ) {
			top = true;
			$sidebar.attr( 'style', 'position: fixed;' );
		}

		lastWindowPos = windowPos;
	}

	function resizeAndScroll() {
		resize();
		scroll();
	}

	//$( document ).ready( function() {
		$body          = $( document.body );
		$window        = $( window );
		$sidebar       = $( '#sidebar' ).first();
		adminbarOffset = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

		$window
			.on( 'scroll.qd', scroll )
			.on( 'resize.qd', function() {
				clearTimeout( resizeTimer );
				resizeTimer = setTimeout( resizeAndScroll, 500 );
			} );
		$sidebar.on( 'click keydown', 'button', resizeAndScroll );

		resizeAndScroll();

		for ( var i = 1; i < 6; i++ ) {
			setTimeout( resizeAndScroll, 100 * i );
		}
	//} );

	$.fn.scrollTo = function( target, options, callback ){
	  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
	  var settings = $.extend({
		scrollTarget  : target,
		offsetTop     : 50,
		duration      : 500,
		easing        : 'swing'
	  }, options);
	  return this.each(function(){
		var scrollPane = $(this);
		var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
		var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
		scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
		  if (typeof callback == 'function') { callback.call(this); }
		});
	  });
	}

	function get_scrollvalue_centering_element (the_element) {
		var $window = $(window),
		$element = the_element,
		elementTop = $element.offset().top,
		elementHeight = $element.height(),
		viewportHeight = $window.height(),
		scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);
		return scrollIt;
	}



	//__1__ Home
	var scroll_home = setInterval(function() {
	   var delta_time_last_scroll = Date.now()-$('body').attr('data-last-scrolltime');
	   if (delta_time_last_scroll>1000 && $('body').scrollTop()<$(window).height() && $('.scroll_down').length>0) {
		   $('.scroll_down').trigger('click');
	   }
   }, 5000);

	$('.scroll_down').click(function() {
		$('body').scrollTo('#slider',{duration:1500, easing: 'easeOutQuad'});
	});

	/*$('.scroll_down').hover(function() {
		var home_scroll_down;
		if (!$(this).hasClass('active')) {
			var home_scroll_down = setTimeout(function() {
				if ($('.scroll_down').hasClass('active')) {
					$('body').scrollTo('#home_slider',{duration:1500, easing: 'easeOutQuad'});
				}
			}, 1000);
		}
		$(this).addClass('active');
	}, function() {
		$(this).removeClass('active');
	});*/

	//__2__ Hero slider
	$(document).ready(function() {
		if ($( ".hero-container.has-slider" ).length) {

		// touch behaviours

		var beginPt=null;
		var lastPt=null;

		 $('.slider-image').on("touchstart", function(ev) {
			var e = ev.originalEvent;
			$( ".hero-container.has-slider" ).removeClass("playing");
			beginPt = {x:e.touches[0].pageX, y:e.touches[0].pageY};
		});

		$('.slider-image').on("touchmove", function(ev) {
			var e = ev.originalEvent;
			lastPt = {x:e.touches[0].pageX, y:e.touches[0].pageY};
		});

		$('.slider-image').on("touchend", function(ev) {
			var delta_x = lastPt.x-beginPt.x;

			// console.log(delta_x);
			if (delta_x<-200) {
				$('.hero-container.has-slider .previous-slide').trigger('click');
			}
			if (delta_x>200) {
				$('.hero-container.has-slider .next-slide').trigger('click');
			}
		});

		// set hover behaviours (stop sliding)
		$( ".hero-controls .previous-slide, .slider-selector, .slider-infos, .slider-link" ).hover(
		  function() {
			  //console.log("entro nell'hero");
			$( ".hero-container.has-slider" ).removeClass("playing");
		  }, function() {
			  //console.log("esco nell'hero");
			$( ".hero-container.has-slider" ).addClass("playing");
		  }
		);

		// main function
		function play_hero_slide (delta, cicling) {
			var next_slide;
			if (cicling=="a") {
				var class_hero = ".hero-container.has-slider.playing";
			}
			if (cicling=="m" || cicling=="s") {
				var class_hero = ".hero-container.has-slider";
			}

		var current_slide = $(class_hero+" li.active").attr("data-slide-num");
		var num_slides = $(class_hero+" li:first-child").attr("data-slide-num");
		if (cicling=="s") {
			next_slide = delta;
			delta_delta = delta-current_slide;
			delta = delta_delta;
		}
		var short_fade_time = 1;
		var long_fade_time = 500;
			if (current_slide && num_slides>0) {
				if (!next_slide) {
					next_slide=current_slide-(-delta);

					if (next_slide>num_slides) {
						next_slide=0;
					}
					if (next_slide==-1) {
						next_slide=num_slides;
					}
				}

				if (delta>0 && next_slide!=0) {
					fade_in_time = short_fade_time;
					fade_out_time = long_fade_time;
				} else {
					if (next_slide==num_slides) {
						fade_in_time = short_fade_time;
						fade_out_time = long_fade_time;
					} else {
						fade_in_time = long_fade_time;
						fade_out_time = short_fade_time;
					}
				}



				$(class_hero+" li[data-slide-num="+next_slide+"]").fadeIn(fade_in_time, function() {
					$('.slider-selector span[data-slide-num='+current_slide+']').removeClass('active');
					$('.slider-selector span[data-slide-num='+next_slide+']').addClass('active');
					$(class_hero+" li[data-slide-num="+current_slide+"]").fadeOut(fade_out_time, function() {
						$(class_hero+" li").removeClass('active');
						$(class_hero+" li[data-slide-num="+next_slide+"]").addClass('active');
						$(class_hero+" li[data-slide-num="+next_slide+"]").css('display','block');
					});
				});

			}
		}

		// button
		$('.hero-container.has-slider .previous-slide').click(function(event) {
			event.preventDefault();
			play_hero_slide(-1, "m");
		})
		$('.hero-container.has-slider .next-slide').click(function(event) {
			event.preventDefault();
			play_hero_slide(1, "m");
		})
		$('.hero-container.has-slider .slider-selector span').click(function(event) {
			event.preventDefault();
			play_hero_slide($(this).attr('data-slide-num'), "s");
		})

		// interval
		setInterval(function() {
			play_hero_slide(1, "a");
			}, 5000);

		}
	});

	//__3__ Maps

	if ($('#map-canvas').length>0) {
	var stylez = [
	  {
		"stylers": [
		  { "invert_lightness": true },
		  { "saturation": -100 }
		]
	  },{
		"featureType": "road.local",
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#231f20" }
		]
	  },{
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [
		  { "lightness": -12 },
		  { "visibility": "simplified" }
		]
	  },{
		"featureType": "road",
		"elementType": "labels.text.stroke",
		"stylers": [
		  { "color": "#23201f" }
		]
	  },{
		"featureType": "poi",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "transit",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "road.local",
		"elementType": "geometry.stroke",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "road.arterial",
		"elementType": "geometry.stroke",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
		  { "visibility": "simplified" }
		]
	  },{
		"featureType": "road.local",
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#141414" }
		]
	  },{
		"featureType": "landscape",
		"stylers": [
		  { "color": "#231f20" }
		]
	  },{
		"featureType": "water",
		"stylers": [
		  { "color": "#191414" }
		]
	  },{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
		  { "color": "#191414" }
		]
	  },{
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [
		  { "color": "#191414" }
		]
	  },{
		"featureType": "road",
		"elementType": "labels.text.stroke",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#191414" }
		]
	  },{
		"featureType": "administrative",
		"elementType": "labels.text.stroke",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "administrative",
		"elementType": "labels.text.fill",
		"stylers": [
		  { "color": "#ffffff" }
		]
	  },{
		"featureType": "road"  }
	]

	function initialize() {
        var mapCanvas = document.getElementById('map-canvas');

        var mapOptions = {
          center: new google.maps.LatLng(45.454762, 9.178317),
          zoom: 15,
		  styles: stylez,
          mapTypeControl: false,
		  navigationControl: false,
		  disableDefaultUI: true,
		  navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		  mapTypeId: google.maps.MapTypeId.ROADMAP
        }

		var map = new google.maps.Map(mapCanvas, mapOptions)

		var companyPos = new google.maps.LatLng(45.454762, 9.178317);

		//var companyLogo = new google.maps.MarkerImage('http://localhost:8888/WP_8/wp-content/themes/qd/images/marker.png',
		var companyLogo = new google.maps.MarkerImage('http://www.quincocesdrago.com/wp-content/themes/qd/images/marker.png',
			new google.maps.Size(34,51, "px", "px"),
			new google.maps.Point(0,0),
			new google.maps.Point(34,51)
		);


		var companyMarker = new google.maps.Marker({
			position: companyPos,
			map: map,
			icon: companyLogo,
			title:"Quincoces-Dragò & Partners"
		});

         google.maps.event.addListenerOnce(map, 'idle', function(){
		  console.log('map loaded');
		  setTimeout(function () {
			jQuery('#map-canvas .gm-style>div:nth-child(2) a').html('<span id="view-on-gmap">View on Google Maps</span>');
		  }, 100);
		   setTimeout(function () {
			jQuery('#map-canvas .gm-style>div:nth-child(2) a').css('display', 'inline-block');
		  }, 200);
			});



      }
      google.maps.event.addDomListener(window, 'load', initialize);
	}

	  //__4__ Image in Viewport

	  $('nav').hover(function() {
		$(this).addClass('hover');
		}, function() {
		$(this).removeClass('hover');
		});

	   $(document).ready(function() {
		  	$(".entry-content img").first().addClass('is-in-viewport');
			last_time_scrolled = Date.now();
			$('body').attr('data-last-scrolltime',last_time_scrolled);
			call_center_images ();
       });

	   $(window).scroll(function() {
		    $('body').addClass('body-scrolling');
			clearTimeout( $.data( this, "scrollCheck" ) );
			$.data( this, "scrollCheck", setTimeout(function() {
				$('body').removeClass('body-scrolling');
				call_center_images ();
				last_time_scrolled = Date.now();
				$('body').attr('data-last-scrolltime',last_time_scrolled);
			}, 250) );
			$('.entry-content img').removeClass('is-in-viewport');
		  	$('.entry-content img:in-viewport(300)').addClass('is-in-viewport');
       });

	   function call_center_images () {
		   var let_call_center_images = true;
			$('nav').each(function(index, element) {
				if ($(this).hasClass('hover')) {
					let_call_center_images = false;
				}
			});
			if (let_call_center_images) {
			   var center_image = setTimeout(function() {
				   var delta_time_last_scroll = Date.now()-$('body').attr('data-last-scrolltime');
				   if (!$('body').hasClass('body-scrolling') && !$('body').hasClass('archive') && $('.entry-content img.is-in-viewport').length>0 && delta_time_last_scroll>10000) {
					   //if (!$('.entry-content img.is-in-viewport').hasClass('is-in-center')) {
					var image_in_viewport_center_position = get_scrollvalue_centering_element ($('.entry-content img.is-in-viewport'));
						if ($('body').scrollTop() != image_in_viewport_center_position) {
						   $('.entry-content img').removeClass('is-in-center');
						   $('body').scrollTo(image_in_viewport_center_position, {
							   duration:1000,
							   easing: 'easeOutQuad',
						   }, function () {
							   $('.entry-content img.is-in-viewport').addClass('is-in-center');
						   });
					   }
				   }
			   }, 10000);
		   }
	   }

	   //__5__ Images

	   $(document).ready(function() {
		   $(".entry-content img").unveil(2000, function() {
			  $(this).load(function() {
				this.style.opacity = 1;
			  });
			});

			$(".entry-content img").first().trigger("unveil");
			$(".entry-content img").first().next().next().trigger("unveil");
			$(".entry-content img").first().next().next().next().next().trigger("unveil");

	   });

	   //__6__ Press
	   $(document).ready(function() {
		   $('.archive.post-type-archive-press a.archive-hentry-content').click(function(e) {
			   e.preventDefault();
			    $('.archive.post-type-archive-press .entry-content').slideUp(300, 'easeOutQuad', function() {
					$(this).prev().removeClass('active');
				});
				if (!$(this).hasClass('active')) {
					$(this).next().slideDown(300, 'easeOutQuad');
					$(this).addClass('active');
					setTimeout(function() {
						var active_y = $('.archive-hentry-content.active').offset()
						$('body').scrollTo(active_y.top-20,{duration:1000, easing: 'easeOutQuad'});
						}, 500);
				}
		   });
	   });

	   //__7__ Hide Back Page Link
	   $(document ).scroll(function() {
		  vertical_scroll = $(document).scrollTop();
		  var header_opacity = (100-vertical_scroll*2.5)/100;
		  if (header_opacity<0) {
			  header_opacity=0;
		  }
		  $('.to-cat-archive').css('opacity',header_opacity);
		  //
		  if($('.entry-content').length > 0) {
			  if ($(document).scrollTop()>$('.entry-content').offset().top) {
				  $('.secondary-toggle').addClass('white-toggle');
			  } else {
				  $('.secondary-toggle').removeClass('white-toggle');
			  }
		  }
	  });

	  //__8__ Orientation
		 $(document).ready(function() {
		   function get_orientation () {
			   if(window.innerHeight*0.9 > window.innerWidth){
					$('html').attr('data-viewport-orientation','portrait');
				} else {
					$('html').attr('data-viewport-orientation','landscape')
				}
		   }

		   $(window).bind("orientationchange", function(evt){
				get_orientation();
			});

			$(window).bind("resize", function(evt){
				get_orientation();
			});

			get_orientation();
		});

		//__9__ vw & vh crossbrowsing

} )( jQuery );
