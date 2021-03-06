// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 105
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });



  $(window).scroll(function () {
    var position = window.pageYOffset;
    $('.anchor-hitpoint').each(function () {
      var target = $(this).offset().top - 300;
      // var target = $(this).offset().top;
      var id = $(this).attr('id');
      var navLinks = $('#nav a');
      if (position >= target) {
        setTimeout(function(){
          navLinks.removeClass('nav__item--active');
          $('#nav a[href="#' + id + '"]').addClass('nav__item--active');
        }, 300)
      }
    });

    if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
      $('.nav__link').removeClass('nav__item--active');
      $('.nav__link:last-of-type').addClass('nav__item--active');
    }
 });
