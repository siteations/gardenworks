var month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};



document.addEventListener('DOMContentLoaded', function() {

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
    $('.tip').tipr({ 'marginBelow': 10 });

    //animate numbers
    $('.count').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });


    //cards interactions - biography style for leadership page
    $('.bio').each(function() {
        $(this).click(function() {

            //image toggle
            ($(this).find('img').css('opacity') !== '1') ? $(this).find('img').css('opacity', '1'): $(this).find('img').css("opacity", '.1');

            //text position toggle
            ($(this).find('.text').css("top") === '-220px') ? $(this).find('.text').css("top", '0px').css("margin-bottom", '0px'): $(this).find('.text').css("top", '-220px').css("margin-bottom", '-220px');


            //text toggle
            var textWithin = [].slice.call($(this).find('p')).filter(p => p.attributes.data);
            var text = (textWithin.length === 1) ? textWithin[0].attributes.data.value : 'sorry, no longer entry';
            var textOld = textWithin[0].innerText;

            $(this).find('p')[1].remove();
            $(this).find('.text').append(`<p data="${textOld}">${text}</p>`);
        })
    })

    //cards interactions - news style for home page
    $('.news').each(function(i) {
        if (i >= 3) {
            $(this).toggle();
        };
    })
    //----------------------------------------------
    function plusSlides(a) { //issues with auto post loading, but loops
        var nhid = [];
        $('.news:visible').each(function(i) {
            nhid.push($(this).attr("id"));
            $(this).toggle(); // hide all
        })
        var limit = $('.news').length;

        var vis = (a > 0) ? [+nhid[0] + 1, +nhid[1] + 1, +nhid[2] + 1] : [+nhid[0] - 1, +nhid[1] - 1, +nhid[2] - 1];
        vis = vis.map(item => {
            if (item < 0) {
                return item + limit;
            } else if (item > limit - 1) {
                return item - limit;
            } else {
                return item;
            }
        });

        vis.forEach(item => {
            $('#' + item).toggle();
        })
    }

    $('#click-next').click(e => plusSlides(1));
    $('#click-back').click(e => plusSlides(-1));
    //----------------------------------------------
    $('#calendar').datepicker({
        inline: true,
        numberOfMonths: 3,
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });


    matchEvents(true);

    $('#calendar').click(e => setTimeout(matchEvents, 25));

    //----------------------------------------------
    function numbers(date) {
        if (typeof(date) === 'string') {
            var evDate = date.split(`-`);
            evDate[0] = month[evDate[0]];
            evDate[1] = +evDate[1];
            return evDate;
        } else {
            return date;
        }
    }

    //----------------------------------------------
    function mRange(start, stop) {
        var spread = []
        if (stop) {
            while (start <= stop) {
                spread.push(start);
                start++;
            }
        } else {
            spread = [start];
        }
        return spread;
    }

    //----------------------------------------------


    function matchEvents(enter) {
        //reset styles
        var dates = $("td").find("a")
            .click(function() { return false; }).addClass('ui-grey');

        //get event data from page and format
        var res = Array.from($('.event-data'));
        var resObj = res.map(item => {
            var item2 = Object.assign({}, item.dataset);
            return item2;
        }).map(item => {
            item.start = numbers(item.start);
            item.end = numbers(item.end);
            item.multi = (item.multi === 'true') ? true : false;
            item.range = mRange(item.start[1], item.end[1]);
            return item;
        });

        //multiple events per day?
        var resCluster = {};
        var resType = {}
        var arr = []
        resObj.forEach(item => {
            item.range.forEach(day => {
                if (resCluster[`${item.start[0]}-${day}-${item.start[2]}`]) {
                    resCluster[`${item.start[0]}-${day}-${item.start[2]}`].push(`.${item.class}`);
                    resType[`${item.start[0]}-${day}-${item.start[2]}`].push(item.type);
                    arr = arr.concat([`.${item.class}`]);
                } else {
                    resCluster[`${item.start[0]}-${day}-${item.start[2]}`] = [`.${item.class}`];
                    resType[`${item.start[0]}-${day}-${item.start[2]}`] = [item.type];
                    arr = arr.concat([`.${item.class}`]);
                }
            })
        });
        var arr2 = new Set(arr);
        var all = Array.from(arr2).join(',');

        //add that data to calendar and clicks
        for (var obj in resCluster) {
            var month = +(obj.split('-')[0]);
            var day = +(obj.split('-')[1]);
            var year = +(obj.split('-')[2]);
            var options = (resCluster[obj]).join(',');
            var cl = (resType[obj][0] === 'build') ? 'brown' : (resType[obj][0] === 'campaign') ? 'green' : 'beet';
            var weight = (resCluster[obj].length > 1) ? '-fill2' : '-fill';

            var date = $(`td[data-month='${month}'][data-year='${year}']`).find(`a:contains('${day}')`).first()
                .addClass(cl + weight)
                .attr('data-class', options)
                .attr('data-all', all)
                .click(function(ev) {
                    $(ev.target.dataset.all).hide();
                    $(ev.target.dataset.class).show();
                    return false;
                });
        };

        if (enter) {
            var today = new Date();
            var date = today.toLocaleDateString("en-US").split('/').map(num => +num).map((num, i) => {
                if (i === 0) { num--;} return num });
            var dates = Object.keys(resCluster).map(each=>each.split('-').map(num=>+num));

            var future = []
            var futureAlt =[];
            dates.forEach(item=>{
            	if (item[0]>=date[0] && item[1]>=date[1] && item[2]>=date[2]){
            		future.push(item.join('-'));
            	}
            	if (item[0]>=0 && item[1]>=1 && item[2]>=date[2]+1){
            		futureAlt.push(item.join('-'));
            	}
            })
            var events = (future.length >0)? resCluster[future[0]] : resCluster[futureAlt[0]];
            //now in 0-11 find in resObj values
            $(all).hide()
            $(events.join(',')).show();
        }
    }

});

//----------------------------------------------
