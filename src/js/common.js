var $WINDOW = $(window),
  $HTML = $('html'),
  $BODY = $('body');

/**
 * Change font size on resize
 */
// function changeFontSize() {
//   var step = 0.0499;
//   var fontSize = Math.round(window.innerWidth * step * 10) / 10;
//   $HTML.css('font-size', fontSize + '%');
// }
// changeFontSize();

/**
 * !Detects overlay scrollbars (when scrollbars on overflowed blocks are visible).
 * This is found most commonly on mobile and OS X.
 * */
var HIDDEN_SCROLL = Modernizr.hiddenscroll;
var NO_HIDDEN_SCROLL = !HIDDEN_SCROLL;
var TOUCHEVENTS = ("ontouchstart" in document.documentElement);

/**
 * Mobile detect
 */
var md = new MobileDetect(window.navigator.userAgent);
var DEVICE = !!md.mobile() || !!md.tablet();
if (DEVICE) {

  $HTML.addClass('mobile-device');
  $('section').addClass('s-ready s-visible');

}

/**
 * !Add touchscreen classes
 * */
function addTouchClasses() {
  if (TOUCHEVENTS) {
    document.documentElement.className += " touchevents";
  } else {
    document.documentElement.className += " no-touchevents";
  }
}

/**
 * !Initial full page scroll plugin
 * */
function fullPageInitial() {
  var $fpSections = $('.fp-sections-js');

  // if (!DEVICE && window.innerWidth >= 992) {
  //
  // }
  if ($fpSections.length) {
    var fpSectionSelector = '.fp-section-js';
    var $fpSection = $(fpSectionSelector);
    var $word = $('.js-word-bg .wbg__word');
    var parallaxValue = 0.2;
    var duration = 750;
    // var breakpointWidth = 992;
    // var breakpointHeight = 400;

    function historyAnchors() {
      var anchors = [];

      $.each($fpSection, function (i, el) {
        anchors.push('section' + (i + 1));
      });

      return anchors;
    }

    function sectionReady(destination) {
      var $section = $(destination.item);
      $section.addClass('s-ready');
      if (destination.isLast) {
        $section.prev().addClass('s-ready');
      }
    }

    function sectionVisible(destination) {
      var $section = $(destination.item);
      $fpSections.removeClass('s-visible');
      $section.addClass('s-visible');
      if (destination.isLast) {
        $section.prev().addClass('s-visible');
      }
    }

    function toggleLogoTheme(destination) {
      var $section = $(destination.item);

      $HTML.removeClass('logo-theme-light');

      if (!$HTML.hasClass('logo-theme-light') && $section.attr('data-logo-theme') === "light") {
        $HTML.addClass('logo-theme-light');
      }

      if ($section.attr('data-wbg') === "main") {
        $('.wbg__item').removeClass('first');
      }
      if ($section.attr('data-wbg') === "first") {
        $('.wbg__item').addClass('first');
        $('.wbg__item').removeClass('second');
      }
      if ($section.attr('data-wbg') === "second") {
        $('.wbg__item').addClass('second');
        $('.wbg__item').removeClass('first');
        $('.wbg__item').removeClass('third');
      }
      if ($section.attr('data-wbg') === "third") {
        $('.wbg__item').addClass('third');
        $('.wbg__item').removeClass('second');
        $('.wbg__item').removeClass('fourth');
      }
      if ($section.attr('data-wbg') === "fourth") {
        $('.wbg__item').addClass('fourth');
        $('.wbg__item').removeClass('third');
        $('.wbg__item').removeClass('fifth');
      }
      if ($section.attr('data-wbg') === "fifth") {
        $('.wbg__item').addClass('fifth');
        $('.wbg__item').removeClass('fourth');
        $('.wbg__item').removeClass('sixth');
      }
      if ($section.attr('data-wbg') === "sixth") {
        $('.wbg__item').addClass('sixth');
        $('.wbg__item').removeClass('fifth');
        $('.wbg__item').removeClass('seventh');
      }
      if ($section.attr('data-wbg') === "seventh") {
        $('.wbg__item').addClass('seventh');
        $('.wbg__item').removeClass('sixth');
        $('.wbg__item').removeClass('eighth');
      }
      if ($section.attr('data-wbg') === "eighth") {
        $('.wbg__item').addClass('eighth');
        $('.wbg__item').removeClass('seventh');
        $('.wbg__item').removeClass('ninth');
      }
      if ($section.attr('data-wbg') === "ninth") {
        $('.wbg__item').addClass('ninth');
        $('.wbg__item').removeClass('eighth');
        $('.wbg__item').removeClass('tenth');
      }
      if ($section.attr('data-wbg') === "tenth") {
        $('.wbg__item').addClass('tenth');
        $('.wbg__item').removeClass('ninth');
        $('.wbg__item').removeClass('eleventh');
      }
      if ($section.attr('data-wbg') === "eleventh") {
        $('.wbg__item').addClass('eleventh');
        $('.wbg__item').removeClass('tenth');
        $('.wbg__item').removeClass('twelfth');
      }
      if ($section.attr('data-wbg') === "twelfth") {
        $('.wbg__item').addClass('twelfth');
        $('.wbg__item').removeClass('eleventh');
      }
      if ($section.attr('data-wbg') === "footer") {
        $('.wbg__item').removeClass('twelfth');
      }

    }


    $fpSections.fullpage({
      css3: true,
      licenseKey: '11111111-11111111-11111111-11111111',
      verticalCentered: false,
      anchors: historyAnchors(),
      recordHistory: false,
      scrollingSpeed: duration,
      sectionSelector: fpSectionSelector,
      // responsiveWidth: breakpointWidth, // and add css rule .fp-enabled
      // responsiveHeight: breakpointHeight, // and add css rule .fp-enabled
      navigation: false,
      onLeave: function (origin, destination, direction) {
        sectionReady(destination);

        sectionVisible(destination);

        var $spaceTop = destination.item.offsetTop + destination.item.clientHeight - window.innerHeight;
        var scrollValue = -$spaceTop * parallaxValue;

        if ($word.length) {
          $word.css({
            'transform': 'translate3d(' + scrollValue + 'px, 0px, 0px)',
            'transition': 'all ' + duration / 1000 + 's'
          });
        }

        // Добавлять класс светлой темы
        toggleLogoTheme(destination);

        // Менять цвет фона
        var bgColor = $(destination.item).attr('data-bg-color');
        if (bgColor && bgColor.length) {
          $BODY.css('background-color', bgColor);
        } else {
          $BODY.css('background-color', '');
        }

      },
      afterLoad: function (origin, destination, direction) {
        sectionReady(destination);
        $('.logo-js').on('click', function (e) {
          fullpage_api.moveTo(1);
          e.preventDefault();
        })
      },
    });

    $('.btn-next-section-js').on('click', function (e) {
      if ($fpSections.length) {
        fullpage_api.moveSectionDown();
      }
      e.preventDefault();
    });

    $('.btn-to-section-js').on('click', function (e) {
      var $thisBtn = $(this);
      if ($fpSections.length) {
        fullpage_api.moveTo($($thisBtn.attr('href')).index() + 1);
      }
      e.preventDefault();
    });
  }
}

/**
 * !Add placeholder for old browsers
 * */
function placeholderInit() {
  $('[placeholder]').placeholder();
}

/**
 * !Add classes to form elements
 * if they has a value or they are in focus
 * */
function formElementState() {
  var $elem = $('.field-js');

  if ($elem.length) {
    function toggleStateClass(mod, cond) {
      var $this = $(this);
      $this.add($this.prev('label')).toggleClass(mod, cond);
    }

    // Focus
    $elem.on('focus blur', function (e) {
      toggleStateClass.call(this, 'focused', e.handleObj.origType === "focus");
    });

    // Has value
    $.each($elem, function () {
      toggleStateClass.call(this, 'filled', $(this).val().length !== 0);
    });

    $elem.on('keyup change', function () {
      toggleStateClass.call(this, 'filled', $(this).val().length !== 0);
    });
  }
}

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect() {
  var $select = $('select.cselect');

  if ($select.length) {
    $.each($select, function () {
      var $thisSelect = $(this);
      $thisSelect.select2({
        theme: 'custom',
        language: 'ru',
        width: '100%',
        containerCssClass: 'cselect-head',
        dropdownCssClass: 'cselect-drop'
      });
    })
  }
}

/**
 * !Main navigation
 */
function mainNavigation() {
  var $nav = $('.nav-js');
  if ($nav.length) {

    $nav.nav({
      submenuPosition: false,
    });
  }
}

$('.nav-opener-js').on('click', function (e) {
  var $curBtn = $(this);

  $curBtn.add($($curBtn.attr('href'))).addClass('is-open');

  $HTML.addClass('css-scroll-fixed open-only-mob');

  e.preventDefault();
});

function hideNav() {
  $('.is-open').removeClass('is-open');
  $HTML.removeClass('css-scroll-fixed open-only-mob');
}

$('.nav-close-btn-js').on('click', function (e) {
  hideNav();

  e.preventDefault();
});

$('.nav-overlay').on('click', function () {
  hideNav();
});

$HTML.keyup(function (event) {
  if (event.keyCode === 27) {
    hideNav();
  }
});

/**
 * !Main menu toggle active class
 */
// function toggleActiveMenuItem() {
//   var $menu = $('.js-menu');
//   var $menuItem = $('.js-menu-item');
//   var $wordBg = $('.js-word-bg');
//   var activeClass = 'm-active';

//   if ($menu.length) {
//     if (!$menu.has('.' + activeClass).length) {
//       $menuItem.eq(0).addClass(activeClass);
//     }

//     $menu.on('mouseenter touchend', '.js-menu-anchor', function (e) {
//       // if (window.innerWidth < 992) return;

//       var $curAnchor = $(this);
//       var $curItem = $curAnchor.closest($menuItem);

//       if (e.handleObj.origType === 'touchend') {
//         if (!$curItem.hasClass(activeClass)) {
//           e.preventDefault();
//         }
//       }

//       if ($curItem.hasClass(activeClass)) return;

//       var $allItems = $curAnchor.closest($menu).find($menuItem);
//       var index = $curItem.index();
//       var $curWordBg = $wordBg.eq(index);

//       $allItems.add($wordBg).removeClass(activeClass);
//       $curItem.add($curWordBg).addClass(activeClass);
//     });
//   }
// }

/**
 * !Form validation
 * */
function formValidation() {
  $.validator.setDefaults({
    submitHandler: function () {
      alert('Форма находится в тестовом режиме. Чтобы закрыть окно, нажмите ОК.');
      return false;
    }
  });

  var $form = $('.validate-js');

  if ($form.length) {
    var changeClasses = function (elem, remove, add) {
      // console.log('changeClasses');
      elem
        .removeClass(remove).addClass(add);
      elem
        .closest('form').find('label[for="' + elem.attr('id') + '"]')
        .removeClass(remove).addClass(add);
      elem
        .closest('.input-wrap')
        .removeClass(remove).addClass(add);
    };

    $.each($form, function (index, element) {
      $(element).validate({
        errorClass: "error",
        validClass: "success",
        errorElement: false,
        errorPlacement: function (error, element) {
          return true;
        },
        highlight: function (element, errorClass, successClass) {
          changeClasses($(element), successClass, errorClass);
        },
        unhighlight: function (element, errorClass, successClass) {
          changeClasses($(element), errorClass, successClass);
        }
      });
    });
  }
}

/**
 * !Parallax
 * */
function scrollBanner() {
  $(document).scroll(function () {
    var scrollPos = $(this).scrollTop();
    var transY = scrollPos / 2 + 'px';
    $('.bg-title').css({
      'transform': 'translateY(' + transY + ') rotate(90deg) '
    });
  });
}

function scrollBannerUX() {
  $(document).scroll(function () {
    var scrollPos = $(this).scrollTop();
    var transY = scrollPos / 3 + 'px';
    $('.bg-title-ux').css({
      'transform': 'translateY(' + transY + ') rotate(90deg) '
    });
  });
}

let arr = [];
$('a[href^="#"]').click(function () {
  var target = $(this).attr('href');
  let a = $(this);
  arr.push(a);

  $(this).css({
    "background-color": "#000",
    "color": "#fff"
  });
  arr[arr.length - 2].css({
    "background-color": "#fff",
    "color": "#000"
  });
  $('html, body').animate({
    scrollTop: $(target).offset().top
  }, 600);
  return false;
});

// $WINDOW.on('resize', function () {
//   changeFontSize();
// });

$WINDOW.on('load', function () {
  // changeFontSize();
  $HTML.addClass('page-loaded');
  $('.js-p-preloader').addClass('p-preloader_hide');
  $('.js-article').addClass('article-ready');
  $('.wrapper-hurkou').addClass('s-ready');
});

$(document).ready(function () {
  // changeFontSize();
  // Base
  addTouchClasses();
  fullPageInitial();
  placeholderInit();
  formElementState();
  customSelect();
  objectFitImages(); // object-fit-images initial
  // Common
  mainNavigation();
  // toggleActiveMenuItem();

  formValidation();

  //Parallax
  scrollBanner();
  scrollBannerUX();
});