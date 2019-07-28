window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }


$(function () {


    /* ==== init ====*/     
    ScrollReveal().reveal('.anchor-hitpoint', {
        opacity: 1,
        afterReveal: function (el) {
            el.classList.add('panel--animating');
        }
    });

    ScrollReveal().reveal('.panel__col, .footer__col, .download-bg__phone', {
        opacity: 0
    });

    if ($(window).width() >= 769) {

        $('.panel__col--content').paroller({
            factor: 0.07,
            factorSm: 0,  
            type: 'foreground',
        });

        // $('.download-bg__phone').paroller({
        //     factor: 0.07,
        //     factorSm: 0,  
        //     type: 'foreground',
        // });

        $('.panel__img, .gallery').paroller({
            factor: 0.2,
            factorSm: 0,  
            type: 'foreground',
        });

        $('.main-banner__media').paroller({
            factor: 0.1,
            type: 'foreground',
            transition: 'transform 0.3s ease'
        });

    }

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
        process_line = $('.process__line');

        process_item.removeClass('process__item--active');
        $(this).toggleClass('process__item--active');

        process_line.css('top', $(this).position().top);
        process_line.css('height', $(this).height());

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
        body = $('body');

        $('.gallery-overlay').toggleClass('gallery-overlay--show');
        gallery_img.attr('src', img_src).one('load', function(){
            setTimeout(function() {
                gallery_img.addClass('gallery-overlay__img--loaded');
               }, 1000);
        });
        gallery_title.html(title_src);
        gallery_content.html(content_src);

        body.addClass('no-scroll');
    });

    $('.gallery-overlay__close').click(function(){
        $('.gallery-overlay').removeClass('gallery-overlay--show');
        gallery_img.removeClass('gallery-overlay__img--loaded');
        setTimeout(function() {
            gallery_title.html('');
            gallery_content.html('');
        }, 1000);
        body.removeClass('no-scroll');
    });


});



$(window).on('load resize', function () {

    // Remove loading window
    setTimeout(function () {
        $('.loading-overlay').addClass('loading-overlay--hide');
        $('body').addClass('body--loaded');
    }, 200);


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

    var lazyLoadInstance = new LazyLoad({
        elements_selector: 'img',
        class_loading: 'img--loading'
    });

});
