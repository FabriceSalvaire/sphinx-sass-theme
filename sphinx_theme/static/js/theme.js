function toggle_current (elem) {
  console.log("toggle_current", elem);
  var parent_li = elem.closest('li');
  parent_li.siblings('li.current').removeClass('current');
  parent_li.siblings().find('li.current').removeClass('current');
  parent_li.find('> ul li.current').removeClass('current');
  parent_li.toggleClass('current');
}

$(document).ready(function() {
  console.log("ready");
  // Nav menu link click operations
  $(document).on('click', ".nav-toc .current ul li a", function() {
    var target = $(this);
    // Close menu when you click a link.
    //// $("[data-toggle='nav-shift']").removeClass("shift");
    //// $("[data-toggle='rst-versions']").toggleClass("shift");
    // Handle dynamic display of l3 and l4 nav lists
    toggle_current(target);
    if (typeof(window.SphinxTheme) != 'undefined') {
      console.log("SphinxTheme defined");
      window.SphinxTheme.sticky_nav.hash_change();
    }
  });

  //// $(document).on('click', "[data-toggle='rst-current-version']", function() {
  ////   $("[data-toggle='rst-versions']").toggleClass("shift-up");
  //// });

  // Make tables responsive
  $("table.docutils:not(.field-list)").wrap("<div class='table-responsive'></div>");

  // Add expand links to all parents of nested ul
  $('.nav-toc ul').siblings('a').each(function () {
    var link = $(this);
    expand = $('<span class="toctree-expand"></span>');
    expand.on('click', function (ev) {
      console.log("ready click");
      toggle_current(link);
      ev.stopPropagation();
      return false;
    });
    link.prepend(expand);
  });
});

// Sphinx theme state
window.SphinxTheme = (function (jquery) {
  console.log("SphinxTheme");
  var sticky_nav = (function () {
    console.log("sticky_nav");
    var nav_bar,
        win,
        win_scroll = false,
        link_scroll = false,
        win_position = 0,

        enable = function () {
	  console.log("sticky_nav enable");
          init();
          reset();
          win.on('hashchange', reset);

          // Set scrolling
          win.on('scroll', function () {
	    console.log("sticky_nav scroll");
            if (!link_scroll) {
              win_scroll = true;
            }
          });

          setInterval(function () {
	    console.log("sticky_nav setInterval");
            if (win_scroll) {
              win_scroll = false;
              var new_win_position = win.scrollTop(),
                  nav_position = nav_bar.scrollTop(),
                  new_nav_position = nav_position + (new_win_position - win_position);
              nav_bar.scrollTop(new_nav_position);
              win_position = new_win_position;
            }
          }, 25);
        },

        init = function () {
	  console.log("sticky_nav init");
          nav_bar = jquery('nav.nav-side:first');
          win = jquery(window);
        },

        reset = function () {
	  console.log("sticky_nav reset");
          // Get anchor from URL and open up nested nav
          var anchor = encodeURI(window.location.hash);
          if (anchor) {
            try {
              var link = $('.nav-toc').find('[href="' + anchor + '"]');
              $('.nav-toc li.toctree-l1 li.current').removeClass('current');
              link.closest('li.toctree-l2').addClass('current');
              link.closest('li.toctree-l3').addClass('current');
              link.closest('li.toctree-l4').addClass('current');
            }
            catch (err) {
              console.log("Error expanding nav for anchor", err);
            }
          }
        },

        hash_change = function () {
	  console.log("sticky_nav hash_change");
          link_scroll = true;
          win.one('hashchange', function () {
	    console.log("sticky_nav hash_change one");
            link_scroll = false;
          });
        };

    jquery(init);

    return {
      enable: enable,
      hash_change: hash_change
    };
  }());

  return {
    sticky_nav: sticky_nav
  };
}($));
