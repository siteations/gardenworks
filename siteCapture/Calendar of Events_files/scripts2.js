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

//------------------libraries--------------------------

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

//--------------------card interactions, show internal--------------------------
    function cardToggle(classFocus, p, offset){
        $(classFocus).each(function() {
        $(this).click(function(event) {
            console.log(event.target);

            //image toggle
            ($(this).find('img').css('opacity') !== '1') ? $(this).find('img').css('opacity', '1'): $(this).find('img').css("opacity", '.1');

            //text position toggle
            ($(this).find('.text').css("top") === offset) ? $(this).find('.text').css("top", '0px').css("margin-bottom", '0px'): $(this).find('.text').css("top", offset).css("margin-bottom", offset);


            //text toggle
            var textWithin = [].slice.call($(this).find('p')).filter(p => p.attributes.data);
            var text = (textWithin.length === 1) ? textWithin[0].attributes.data.value : 'sorry, no longer entry';
            var textOld = textWithin[0].innerText;

            $(this).find('p')[p].remove();
            if (classFocus !== '.partner'){
                            $(this).find('.text').append(`<p data="${textOld}">${text}</p>`);
                        } else {
            $(this).find('.text').append(`<p data="${textOld}" style="color:#666">${text}</p>`);
            }
        })
    })
    }

    var cards = {
        //class: p: offset
        '.bio': [1,'-220px'],
        '.sponsor': [0,'-120px'],
        '.partner': [1,'-0px']
    }

    for (var key in cards){
        cardToggle(key, cards[key][0], cards[key][1]);
    }



    //cards interactions - news style for home page
    $('.news').each(function(i) {
        if (i >= 3) {
            $(this).toggle();
        };
    })

    $('.partner').each(function(i) {
        if (i < 3) {
            $(this).toggle();
        };
    })
    //----------------------------------------------
    function plusSlides(type,a) { //issues with auto post loading, but loops
        var nhid = [];
        $(`.${type}:visible`).each(function(i) {
            nhid.push($(this).attr("id"));
            $(this).toggle(); // hide all
        })
        var limit = $(`.${type}`).length;

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

    function mapSlides(type,siteName) { //pull up selected site and sibling to left and right
        $(`.${type}`).hide();
        var sel = $(`.${type}:contains('${siteName}')`).show();
        var selNext = $(`.${type}:contains('${siteName}')`).next().show();
        var selPrev = $(`.${type}:contains('${siteName}')`).prev().show();
        console.log(sel, selNext, selPrev);

    }

    $('#click-next').click(e => plusSlides('news',1));
    $('#click-back').click(e => plusSlides('news',-1));
    $('#click-next').click(e => plusSlides('partner',1));
    $('#click-back').click(e => plusSlides('partner',-1));
    //----------------------------------------------


    var windowSize =$(window.outerWidth)[0];
    var months;

    if (windowSize < 700){
        months = 1
    } else if (windowSize < 1200){
        months = 2
    } else {
        months = 3
    };
    console.log(months,windowSize);

    $('#calendar').datepicker({
        inline: true,
        numberOfMonths: months,
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });


    matchEvents(true);

    $('#calendar').click(e => setTimeout(matchEvents, 25)); //reload, rematch

    //------------------------month conversions----------------------
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

    //-------------------------recurring events---------------------
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
        var type = "",
            opts = "";

        //add that data to calendar and clicks
        for (var obj in resCluster) {
            var month = +(obj.split('-')[0]);
            var day = +(obj.split('-')[1]);
            var year = +(obj.split('-')[2]);
            var options = (resCluster[obj]).join(',');
            var cl = (resType[obj][0] === 'build') ? 'brown' : (resType[obj][0] === 'campaign') ? 'green' : 'beet';
            var weight = (resCluster[obj].length > 1) ? '-fill2' : '-fill';
            type = resType[obj][0];
            opts = obj;



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
                if (i === 0) { num--; }
                return num
            });
            var dates = Object.keys(resCluster).map(each => each.split('-').map(num => +num));

            var future = []
            var futureAlt = [];
            dates.forEach(item => {
                if (item[0] >= date[0] && item[1] >= date[1] && item[2] >= date[2]) {
                    future.push(item.join('-'));
                }
                if (item[0] >= 0 && item[1] >= 1 && item[2] >= date[2] + 1) {
                    futureAlt.push(item.join('-'));
                }
            })
            var events = (future.length > 0) ? resCluster[future[0]] : resCluster[futureAlt[0]];

            $(all).hide()
            if (events) {
                $(events.join(',')).show();
            }
        }
    }

    //---------------------filtering volunteers-------------------------

    $('.vol').find('.volunteer-full').remove();
    $('.vol').find('.volunteer-excerpt').find('span').each(function(i) {
        $(this).parent().text($(this).text());
        $(this).remove();
    });
    $('.vol').find('.volunteer-excerpt').find('p').addClass('greyt');

    $('.filter').click(function(i) {
        if ($(this).attr('data-filter') === 'all') {
            $('.cards.vol').show();
        } else {
            $('.cards.vol').hide();
            $($(this).attr('data-filter')).show();
        }

    })

    //------------------content text redistribution (paired with internal ids)----------------------------

    function redistribute(idArr) {

        idArr.forEach(item => {
            $('.' + item).append($(`#` + item));
        });
    }

    var donateArr = ['donate-intro', 'donate-monthly', 'donate-impact', 'donate-effect'];
    var sponsorArr = ['sponsor-intro', 'sponsor-recog', 'sponsor-thanks'];
    var donateNetwork = ['donate-network'];

    redistribute(donateArr);
    redistribute(sponsorArr);
    redistribute(donateNetwork);

    //panels on partner page
    $('.panel').first().show();
    $('.opt').first().addClass('active');

    $('.opt').click(function (){
            $('.panel').hide();
            $('.active').removeClass('active');
            $(this).addClass('active');
            $('.' + $(this).attr('id')).show();
    });


    // panelsView.forEach(item=>{
    //     changeView(item);
    // })
    //------------------partner maps----------------------------

    //map styling: http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png

    if ($('#mapid')){


    var map = L.map('mapid').setView([41.8846801,-88.207283], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.circleMarker([41.8846801,-88.207283], {
                color: '#666', //should vary by type
                fillColor: '#666', //should vary by type
                fillOpacity: .25,
                radius: 10
            }).addTo(map).bindTooltip(`<p style="color:#666;"><strong>GardenWorks Resource Center</strong><br/>103 W. Washington St., West Chicago, IL</p>`)

    $('.partner').each(function(){
        var obj={}
        var data = $(this).find('h6').attr('data').split('\n').map(item=>item.split(':')).forEach(item=>obj[item[0]]=item[1].trim().replace(/\'/g, ''));
        obj.title = $(this).find('h6').text();
        obj.location = JSON.parse(obj.location);
        $(this).find('h6').after(`<p>${obj.type}</p>`)
        $(this).find('h6').wrap( `<a class="beet" href='http://${obj.link}' target='_blank'></a>` );

        L.circleMarker(obj.location, {

                color: (obj.type.includes('pantry'))? '#B80F6C' : (obj.type.includes('garden grant'))?'#4A9113':'#A67C52', //should vary by type
                fillColor: (obj.type.includes('pantry'))? '#B80F6C' : (obj.type.includes('garden grant'))?'#4A9113':'#A67C52', //should vary by type
                fillOpacity: .25,
                radius: 10
            }).addTo(map).bindTooltip(`<p style="color:${(obj.type.includes('pantry'))? '#B80F6C' : (obj.type.includes('garden grant'))?'#4A9113':'#A67C52'};"><strong>${obj.title}</strong><br/>${obj.address}</p>`).on('click', (e)=>{mapSlides('partner',obj.title)});
    })
}




})
