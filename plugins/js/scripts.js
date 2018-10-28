
document.addEventListener('DOMContentLoaded', function(){

//animations for visibility
  var trigger = new ScrollTrigger({
    offset: {
      x: 0,
      y: 50
    },
    addHeight: true,
  },
  document.body, window);

 //tooltips
 $('.tip').tipr({'marginBelow': 10});

//animate numbers
	$('.count').each(function () {
	    $(this).prop('Counter',0).animate({
	        Counter: $(this).text()
	    }, {
	        duration: 4000,
	        easing: 'swing',
	        step: function (now) {
	            $(this).text(Math.ceil(now));
	        }
	    });
	});



});
