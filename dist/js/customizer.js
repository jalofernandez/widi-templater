// Custom Scripts for Primal Template //

jQuery(function($) {
    "use strict";


        // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
        var mainbottom = $('#main').offset().top;

        // on scroll,
        $(window).on('scroll',function(){

        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('.navbar').addClass('past-main');
            $('.navbar').addClass('effect-main')
        } else {
            $('.navbar').removeClass('past-main');
       }

      });


  // Collapse navbar on click

   $(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
    $(this).removeClass('in').addClass('collapse');
   }
  });



    /*-----------------------------------
    ----------- Scroll To Top -----------
    ------------------------------------*/

    $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
          $('#back-top').fadeIn();
      } else {
          $('#back-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#back-top').on('click', function () {
      $('#back-top').tooltip('hide');
      $('body,html').animate({
          scrollTop: 0
      }, 1500);
      return false;
    });





  /*-------- Owl Carousel ---------- */
    $(".reviews").owlCarousel({

    slideSpeed : 200,
    items: 1,
    singleItem: true,
    autoPlay : true,
    pagination : false
    });


  /* ------ Clients Section Owl Carousel ----- */

    $(".clients").owlCarousel({
    slideSpeed : 200,
    items: 5,
    singleItem: false,
    autoPlay : true,
    pagination : false
    });


  /* ------ jQuery for Easing min -- */

    $(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
  });



/* --------- Wow Init ------ */

  new WOW().init();


  /* ----- Counter Up ----- */

$('.counter').counterUp({
		delay: 10,
		time: 1000
});

/* ----- Countdown ----- */

if($.find('#countdown')[0]) {
	 $('#countdown').countDown({
			 targetDate: {
					 'day': 		14,
					 'month': 	7,
					 'year': 	2017,
					 'hour': 	11,
					 'min': 		13,
					 'sec': 		0
			 },
			 omitWeeks: true
	 });
 //enter the count down date using the format year, month, day, time: hour, min, sec
 if( $('.day_field .top').html() == "0" ) $('.day_field').css('display','none');
}


/*----- Preloader ----- */

    $(window).load(function() {
  		setTimeout(function() {
        $('#loading').fadeOut('slow', function() {
        });
      }, 3000);
    });


/*----- Subscription Form ----- */

$(document).ready(function() {
  // jQuery Validation
  $("#signup").validate({
    // if valid, post data via AJAX
    submitHandler: function(form) {
      $.post("assets/php/subscribe.php", { email: $("#email").val() }, function(data) {
        $('#response').html(data);
      });
    },
    // all fields are required
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });
});

});



//- JS block (01)
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 1 * 1 * 29 * 60 * 1000);
initializeClock('countdown-clock', deadline);

//- JS block (02)
function scrollNav() {
    $('.nav a').click(function(){
      //- to remove all "active" classes
      $(".active").removeClass("active");
      //- to enable an "active" class in current link clicked
      $(this).closest('li').addClass("active");
      var theClass = $(this).attr("class");
      $('.'+theClass).parent('li').addClass('active');
      //- to enable smooth animation
      $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 160
      }, 400);
      //- TODO: check it!
      $(".navbar-collapse").removeClass("in");
        return false;
    });
    // to CTA btns with smooth scrolls to "Pricing" (section)
    $('#js-cta-scroll').click(function(){
      $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 160
      }, 400);
    });
    //- to go back to Top
    //$('.scrollTop a').scrollTop();
}
scrollNav();

//- JS block (03)
//- to enable "CTA" btn in all sections except "pricing" one!
//- only works in mobile (cause some CSS rules applied)
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 2500) {
        //$(".cta-btn-section").addClass("js-hide");
        $(".cta-btn-section").hide();
    } else {
        $(".cta-btn-section").show();
    }
});

/* TODO: only Docs
// (667) Este omite el tamaño de la Barra de Herramientas y las de Scroll...
console.log(window.innerHeight);
// (972) ...o este que incluye ambos valores
console.log(window.outerHeight);
*/
