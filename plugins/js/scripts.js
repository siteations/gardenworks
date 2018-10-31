
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

	//cards interactions - biography style for leadership page
	$('.bio').each(function(){
			$(this).click(function(){

				//image toggle
				($(this).find('img').css('opacity')!=='1')? $(this).find('img').css('opacity', '1') : $(this).find('img').css("opacity", '.1');

				//text position toggle
				($(this).find('.text').css("top")==='-220px')? $(this).find('.text').css("top", '0px').css("margin-bottom", '0px') : $(this).find('.text').css("top", '-220px').css("margin-bottom", '-220px');


				//text toggle
				var textWithin =[].slice.call($(this).find('p')).filter(p=>p.attributes.data);
				var text = (textWithin.length===1)? textWithin[0].attributes.data.value: 'sorry, no longer entry' ;
				var textOld = textWithin[0].innerText;

				$(this).find('p')[1].remove();
				$(this).find('.text').append(`<p data="${textOld}">${text}</p>`);
			})
	})



});
