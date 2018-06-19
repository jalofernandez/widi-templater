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
