var lazyLoadInstance = new LazyLoad({
		elements_selector: '.lazy'
	}

);

var addEvent = function(object, type, callback) {
	if (object == null || typeof(object) == 'undefined') return;

	if (object.addEventListener) {
		object.addEventListener(type, callback, false);
	} else if (object.attachEvent) {
		object.attachEvent("on" + type, callback);
	} else {
		object["on" + type] = callback;
	}
}

;

if (window.innerWidth < 768) {

	if (document.querySelector('.suggestions') !== null) {

		// Dinamically create bullets
		var glideBullets = '';

		// For each slide
		var elements = document.querySelectorAll('.suggestions .glide__slide');
		for (var i = 0; i < elements.length; i++) {
			// Get slide index
			var slideIndex = Array.prototype.indexOf.call(elements[i].parentElement.children, elements[i]);
			// Build bullet HTML
			glideBullets += '<button class="glide__bullet" data-glide-dir="=' + slideIndex + '"></button>';
		}
		// Wrap bullets
		glideBullets = '<div class="glide__bullets" data-glide-el="controls[nav]">' + glideBullets + '</div>';
		// Set bullets HTML
		//document.querySelector('.suggestions').insertAdjacentHTML('beforeend', glideBullets);
		if (elements.length > 1) {
			var suggestions = new Glide('.suggestions', {

					type: 'slider',
					gap: 15,
					perView: 1,
					rewind: false,
					peek: {
						before: 0,
						after: 100
					}
				}

			);
		
			suggestions.mount();
		}else{
			var elementsBullets = document.querySelectorAll('.suggestions .glide__bullets');
			if (elementsBullets)
				elementsBullets[0].style.display = "none";
		}
	}
}

if (document.querySelector('.news-carousel') !== null && document.querySelector('.news-carousel .glide__slide')) {
	var newsCarousel = new Glide('.news-carousel', {
			type: 'carousel',
			gap: 0,
			autoplay: 3000
		}
	);
	newsCarousel.mount();
}

if (document.querySelector('.multirow-carousel') !== null) {

	var multirowCarouselEl = document.querySelector('.multirow-carousel');

	

	var sliders = document.querySelectorAll('.multirow-carousel');

	for (var i = 0; i < sliders.length; i++) {
		if (window.innerWidth >= 1024) {
			//params: 1:selector, 2:number of elements per multirow slide
			buildMultirowCarousel(sliders[i], 6);
		}

		var multirowCarousel = new Glide(sliders[i], {
			type: 'carousel',
			perView: 1,
			peek: {
				before: 0,
				after: 0
			},
			breakpoints: {
				1023: {
					gap: 4,
					perView: 2,
					peek: {
						before: 0,
						after: 102
					}
				},
				767: {
					perView: 1,
					peek: {
						before: 0,
						after: 60
					}
				}
			}
		});
		multirowCarousel.mount();
	}
}

function buildMultirowCarousel(elem, elementsPerSlide) {var numberOfContainers = Math.ceil(elem.querySelector('.glide__slides').childElementCount / elementsPerSlide);
	var wrapper = '';

	var elements = elem.querySelectorAll('.glide__slide');
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.remove('glide__slide');
	}

	for (var i = 0; i < numberOfContainers; i++) {
		var container = document.createElement('div');
		container.className = 'glide__slide';

		for (var m = 0; m < 6; m++) {
				slides = Array.prototype.slice.call(elem.querySelector('.glide__slides').childNodes).filter(function(element) { return element.nodeType == 1; });
			if (slides.length) {
				container.appendChild(elem.querySelector('.glide__slides').firstElementChild);
			}
			else {
				break;
			}
		}

		wrapper += container.outerHTML;
	}

	elem.querySelector('.glide__slides').innerHTML = wrapper;
}


var searchField = document.querySelector('.hamburger-menu .search-field');
searchField.addEventListener('input', typeHandler);
searchField.addEventListener('focus', typeHandler);
searchField.addEventListener('focusout', searchFocusOutHandler);

function typeHandler(e) {
	if (e.target.value != '') {
		searchField.parentNode.classList.add('active');
	}
}

function searchFocusOutHandler(e) {
	if (e.target.value == '') {
		searchField.parentNode.classList.remove('active');
	}
}

if (document.querySelector('.situation-in-motion') !== null && document.querySelector('.situation-in-motion .glide__slide') !== null) {
	var situationInMotion = new Glide('.situation-in-motion', {
			type: 'slider',
			rewind: true,
			gap: 0
		}
	);
	situationInMotion.mount();
}

if (document.querySelector('.the-diary') !== null && document.querySelector('.the-diary .glide__slide') !== null) {
	var theDiary = new Glide('.the-diary', {
			type: 'carousel',
			gap: 0
		}
	);
	theDiary.mount();
}

if (document.querySelector('.video-news') !== null && document.querySelector('.video-news .glide__slide') !== null) {
	var videoNews = new Glide('.video-news', {
			type: 'carousel',
			gap: 0
		}
	);
	videoNews.mount();
}

if (!LIB_ismobile && !LIB_istablet) {
	if (document.querySelector('body.article.video.type-2') !== null) {
		document.querySelector('.video-player').appendChild(document.querySelector('.similar-videos'));
	}
}

function setControlsPosition() {
	if ($('body.article-gallery.full').length && $(window).width() > 480 && $(window).height() > 480) {
		$('.controls').css('bottom', $('.gallery-box section.gallery > article:visible > header').height() + 50);
	}
	else {
		$('.controls').css('bottom', $('.gallery-box section.gallery > article:visible > header').height() + 70);
	}
}
setControlsPosition();

if (document.querySelector('body.article .controls') !== null) {
	var BreakException = {};

	document.querySelector('.controls .arrow.right').onclick = function() {
		try {
			var elements = document.querySelectorAll('.gallery article');
			for (var i = 0; i < elements.length; i++) {
				var currentElement = elements[i];

				elements[i].classList.remove('glide__slide');

				if (currentElement.offsetParent !== null) {
					currentElement.style.display = 'none';

					if (currentElement.nextElementSibling.tagName != 'ARTICLE') {
						$(currentElement).siblings().first().show();
						$('.controls .counter').text($(currentElement).siblings().first().index() + 1 + ' / ' + elements.length);
					} else {
						currentElement.nextElementSibling.style.display = 'block';
						$('.controls .counter').text($(currentElement.nextElementSibling).index() + 1 + ' / ' + elements.length);
					}

					setControlsPosition();

					throw BreakException;
				}
			}
		} catch (e) {
			if (e !== BreakException) throw e;
		}

	};

	document.querySelector('.controls .arrow.left').onclick = function() {
		try {
			var elements = document.querySelectorAll('.gallery article');
			for (var i = 0; i < elements.length; i++) {
				var currentElement = elements[i];

				if (currentElement.offsetParent !== null) {
					currentElement.style.display = 'none';

					if (currentElement.previousElementSibling === null) {
						$(currentElement).siblings().last().prev().show();
						$('.controls .counter').text($(currentElement).siblings().last().prev().index() + 1 + ' / ' + elements.length);
					}
					else {
						currentElement.previousElementSibling.style.display = 'block';
						$('.controls .counter').text($(currentElement.previousElementSibling).index() + 1 + ' / ' + elements.length);
					}

					setControlsPosition();

					throw BreakException;
				}
			}
		} catch (e) {
			if (e !== BreakException) throw e;
		}

	};

	const _C = document.querySelector('.gallery'), N = _C.children.length - 1;
	let i = 0, x0 = null;
	function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };
	function lock(e) { x0 = unify(e).clientX };
	function move(e) {
		if ($(e.composedPath().indexOf(document.querySelector('.controls')))['0'] < 0) {
			if (x0 || x0 === 0) {
				let dx = unify(e).clientX - x0, s = Math.sign(dx);

				if (s > 0) {
					$('.controls .arrow.right').trigger('click');
				}
				else {
					$('.controls .arrow.left').trigger('click');
				}
				x0 = null
			}
		}
	};

	_C.addEventListener('touchstart', lock, false);
	_C.addEventListener('touchend', move, false);
}

$('.gallery-box .controls').on('click', '.full-screen', function(event) {
	$('.gallery-box').toggleClass('full');

	setControlsPosition();
});

$('.gallery-box').on('click', '.close', function(event) {
	$('.gallery-box').removeClass('full');
	setControlsPosition();
});

$(document).ready(function() {

		// Poll widget
		if (document.querySelector('body.poll') !== null) {
			var pollOptions = document.querySelectorAll('.poll-widget ul li a');

			for (var i = 0; i < pollOptions.length; i++) {
				pollOptions[i].addEventListener('click', function(event) {
						event.preventDefault();

						if (this.parentElement.parentElement.className != 'results') {
							var pollSelection = this.parentElement.parentElement.querySelector('.active');

							if (pollSelection !== null) {
								pollSelection.classList.remove('active');
							}

							this.classList.add('active');
						}
					}
				);
			}
		}

		$('.text-size-widget > li').on('click', 'span:not(.active)', function() {
				$this = $(this);

				if ($('body').hasClass('article')) {
					$('.main-wrapper').attr('data-text-size', $this.attr('class'));
				}

				$this.addClass('active').parent().siblings().children('span').removeClass('active');
			}

		);

		$('.news-horizontal-carousel ul').slick({
				infinite: true,
				slidesToScroll: 1,
				variableWidth: true,
				lazyLoad: 'ondemand'
			}

		);

		$('.back-to-top').click(function() {
				$('html, body').animate({
						scrollTop: 0
					}

					, 1000);
			}
		);

		$('body').on('click', '.search', function(event) {
				event.preventDefault();
				$('.hamburger-menu').addClass('search').fadeIn(200);

				if ($(window).width() <= 768) {
					$('html').addClass('hamburger-active-mobile');
				}
			}
		);

		$('body').on('click', '.icon-hamburger', function(event) {
				$('.hamburger-menu').fadeIn(200);
				$('.hamburger-menu .lazytoload').each(function(){
					$(this).addClass('lazy');
					$(this).removeClass('lazytoload');
				})
				lazyLoadInstance.update();

				if ($(window).width() <= 768) {
					$('html').addClass('hamburger-active-mobile');
				}
			}
		);

		$('.hamburger-menu .close').click(function(event) {
				if ($('.hamburger-menu').hasClass('search')) {
					$('.hamburger-menu').removeClass('search');
				}

				$('.hamburger-menu').fadeOut(100, function() {
						$('html').removeClass('hamburger-active-mobile');
					}

				);
			}
		);

		$('.hamburger.desktop .close-hamburger').click(function(event) {
				$('.hamburger').fadeOut(100, function() {
						$('body').removeClass('hamburger-active');
					}

				);
			}
		);

		$('.hamburger.mobile .close-hamburger').click(function(event) {
				$('.hamburger.mobile').removeClass('active');
				$('body').removeClass('hamburger-active-mobile');

			}
		);
	}

);

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 100;

window.addEventListener('scroll', function() {
		didScroll = true;
	}
);

setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}

	, 250);

function hasScrolled() {
	var doc = document.documentElement;
	var st = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

	// Make sure they scroll more than delta
	if (Math.abs(lastScrollTop - st) <= delta) return;

	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight) {
		document.querySelector('body > header').classList.add('scroll-down');

		// Scroll Down
		if (window.innerWidth >= 768) {
			document.querySelector('body > header').classList.add('sticky');
			document.querySelector('body > header').classList.remove('scroll-up');
		}
	} else {
		// Scroll Up

		var body = document.body,
			html = document.documentElement;
		var documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
			html.clientHeight, html.scrollHeight, html.offsetHeight);

		if (window.innerWidth >= 768) {
			if (st + window.innerHeight < documentHeight) {
				document.querySelector('body > header').classList.add('scroll-up');

				if (st < 185) {
					document.querySelector('body > header').classList.remove('sticky', 'scroll-up');
				}
			}
		} else {
			if (st + window.innerHeight < documentHeight) {
				document.querySelector('body > header').classList.add('scroll-up');
				document.querySelector('body > header').classList.remove('scroll-down');

				if (st < 185) {
					document.querySelector('body > header').classList.remove('scroll-up');
				}
			}
		}

	}

	lastScrollTop = st;
}