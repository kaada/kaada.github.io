$(function() {
  var isSmoothScrolling = false;
  var scrollOffset = $('.header').height();
  $('a[href^="#"]').click(
    function(event) {
      event.preventDefault();

      destination = $(this.hash).offset().top > $(document).height() - $(window).height() + scrollOffset ?
              $(document).height() - $(window).height() : $(this.hash).offset().top - scrollOffset;

    $('html,body').animate({
      scrollTop: Math.ceil(destination)}, 500, 'swing');
    isSmoothScrolling = true;
    setTimeout(function() {
      isSmoothScrolling = false;
      checkPage();
    }, 500);
  }); /* Animated scroll */

  const menuItems = [$('.to-home'), $('.to-about'), $('.to-projects'), $('.to-contact')];

  var cur_active = -1;

  function checkPage() {
    if (!isSmoothScrolling) {

      var scrollAmount = $(window).scrollTop() + scrollOffset;
      var pagePositions = [$('#about').offset().top, $('#projects').offset().top, $('#contact').offset().top];
      var temp_active;

      if (scrollAmount < pagePositions[0]) {
        temp_active = 0;
      }
      if (scrollAmount >= pagePositions[0] && scrollAmount < pagePositions[1]) {
        temp_active = 1;
      }
      if (scrollAmount >= pagePositions[1] && scrollAmount < pagePositions[2]) {
        temp_active = 2;
      }
      if (scrollAmount >= pagePositions[2] || scrollAmount == $(document).height() - $(window).height() + scrollOffset) {
        temp_active = 3;
      }
      update(temp_active);
    }
  }

  function update(item) {
    if (cur_active != item) {
      flush();
      activate(menuItems[item]);
     }
  }

  function flush() {
    $.each(menuItems, function() {
      if (this.hasClass("active")) {
        this.removeClass("active");
      }
    });
  }

  function activate(item) {
    if (!item.hasClass("active")) {
      item.addClass("active");
    }
  }

  $(window).scroll(
  /* Changing the active object in the navigation bar */
    function() {
      checkPage();
    });
  checkPage();
});
