function toggleCurrent (elem) {
  var parent_li = elem.closest('li');
  parent_li.siblings('li.current').removeClass('current');
  parent_li.siblings().find('li.current').removeClass('current');
  parent_li.find('> ul li.current').removeClass('current');
  parent_li.toggleClass('current');
}

$(document).ready(function() {
  // Nav menu link click operations
  $(document).on('click', ".nav-toc .current ul li a", function() {
    var target = $(this);
    // Close menu when you click a link.
    //// $("[data-toggle='nav-shift']").removeClass("shift");
    //// $("[data-toggle='rst-versions']").toggleClass("shift");
    // Handle dynamic display of l3 and l4 nav lists
    toggleCurrent(target);
    if (typeof(window.SphinxTheme) != 'undefined') {
      window.SphinxTheme.sticky_nav.hash_change();
    }
  });

  //// $(document).on('click', "[data-toggle='rst-current-version']", function() {
  ////   $("[data-toggle='rst-versions']").toggleClass("shift-up");
  //// });

  // Make tables responsive
  //// $("table.docutils:not(.field-list)").wrap("<div class='table-responsive'></div>");

  // Add expand links to all parents of nested ul
  $('.nav-toc ul').siblings('a').each(function () {
    var link = $(this);
    expand = $('<span class="toctree-expand"></span>');
    expand.on('click', function (ev) {
      toggleCurrent(link);
      ev.stopPropagation();
      return false;
    });
    link.prepend(expand);
  });
});

// Sphinx theme state
window.SphinxTheme = (function (jquery) {
  var sticky_nav = (function () {
    var nav_bar,
        win,
        win_scroll = false,
        link_scroll = false,
        win_position = 0,

        enable = function () {
          init();
          reset();
          win.on('hashchange', reset);

          // Set scrolling
          win.on('scroll', function () {
            if (!link_scroll) {
              win_scroll = true;
            }
          });

          setInterval(function () {
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
          nav_bar = jquery('nav.nav-side:first');
          win = jquery(window);
        },

        reset = function () {
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
          link_scroll = true;
          win.one('hashchange', function () {
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
