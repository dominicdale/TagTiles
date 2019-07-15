$(function () {

    /* ==== init ====*/     
    ScrollReveal().reveal('.panel', {
        opacity: 1,
        afterReveal: function (el) {
            el.classList.add('panel--animating');
        }
    });

    $('.panel__col--content').paroller({
        factor: 0.07,
        type: 'foreground',
    });

    $('.download-bg__phone').paroller({
        factor: 0.07,
        type: 'foreground',
    });

    $('.main-banner').paroller({
        factor: 0.1,
        type: 'background',
        transition: 'transform 0.3s ease'
    });

    var lazyLoadInstance = new LazyLoad({
        elements_selector: 'img',
        class_loading: 'img--loading'
    });

    /* ==== Mobile nav ==== */
    $('.nav__icon').click(function () {
        $(this).toggleClass('nav__icon--active');
        $(this).parent().find('.nav__dropdown').toggleClass('nav__dropdown--active');
    });

    $('.nav-toggle').click(function () {
        $(this).toggleClass('nav-toggle--active');
        $('nav').toggleClass('nav--open');
        $('body').toggleClass('no-scroll');
    });


    /* ==== Add background to header on scroll ==== */
    $(window).on('load scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 1) {
            $("header").addClass('header--bg');
        } else {
            $("header").removeClass('header--bg');
        }
    });


    /* ==== Process panel ==== */
    $('.process__item').click(function(){
        process_id = $(this).data('id');
        process_item = $(this).closest('.panel--process').find('.process__item');
        process_description = $(this).closest('.panel--process').find('.process__description');

        process_item.removeClass('process__item--active');
        $(this).toggleClass('process__item--active');

        process_description.removeClass('process__description--active');
        process_description + $('#'+process_id).addClass('process__description--active');

    });


    /* ==== Recent mosaics ==== */
    gallery_img = $('.gallery-overlay .gallery-overlay__img');
    gallery_title = $('.gallery-overlay .gallery-overlay__sidebar-title');
    gallery_content = $('.gallery-overlay .gallery-overlay__sidebar-content');


    $('.gallery__item').click(function(){
        img_src = $(this).data('img');
        title_src = $(this).data('title');
        content_src = $(this).data('content');

        $('.gallery-overlay').toggleClass('gallery-overlay--show');
        gallery_img.attr('src', img_src).one('load', function(){
            setTimeout(function() {
                gallery_img.addClass('gallery-overlay__img--loaded');
               }, 1000);
        });
        gallery_title.html(title_src);
        gallery_content.html(content_src);
    });

    $('.gallery-overlay__close').click(function(){
        $('.gallery-overlay').removeClass('gallery-overlay--show');
        gallery_img.removeClass('gallery-overlay__img--loaded');
        gallery_title.html('');
        gallery_content.html('');
    });


});



$(window).on('load resize', function () {

    // Remove loading window
    setTimeout(function () {
        $('.loading-overlay').addClass('loading-overlay--hide');
        $('body').addClass('body--loaded');
    }, 500);


    // Add class if edge
    if (/Edge/.test(navigator.userAgent)) {
		$('body').addClass('ie ie--edge');
	}

    // Add class if IE
	if (navigator.userAgent.indexOf('MSIE') !== -1 ||
		navigator.appVersion.indexOf('Trident/') > -1) {
        $('body').addClass('ie ie--11');
        image_height();
    }
    
    // Add mobile class
    if ($(window).width() <= 480) {
        $('body').addClass('breakpoint--mobile');
    }

});
