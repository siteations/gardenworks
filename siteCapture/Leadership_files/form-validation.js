webshims.register("form-validation",function(e,t,i,s,r,n){var a="webkitURL"in i,o=a&&Modernizr.formvalidation&&!t.bugs.bustedValidity,l=o&&parseFloat((navigator.userAgent.match(/Safari\/([\d\.]+)/)||["","999999"])[1],10),d="user-error",c="user-success",h={checkbox:1,radio:1},p=e([]),u=function(){return!e.prop(this,"form")},m=function(t){var i,r;t=e(t);var n=p;return"radio"==t[0].type&&(r=t.prop("form"),n=(n=(i=t[0].name)?r?e(r).jProp(i):e(s.getElementsByName(i)).filter(u):t).filter('[type="radio"]')),n},f=function(t,i){var s;return e.each(t,function(t,r){if(r)return s=t+e.prop(i,"validationMessage"),!1}),s},v=function(e){var t;try{t=s.activeElement.name===e}catch(i){}return t},g={radio:1,checkbox:1,"select-one":1,"select-multiple":1,file:1,date:1,month:1,week:1,text:1},y={time:1,date:1,month:1,datetime:1,week:1,"datetime-local":1},b=function(i){var s,r,n,a;if(i.target&&(s=e(i.target).getNativeElement()[0],n=e(s).getShadowElement(),"submit"!=s.type&&e.prop(s,"willValidate")&&("change"!=i.type||g[a=n.prop("type")]))){var p=function(){if(a||(a=n.prop("type")),!(o&&("change"==i.type||l<537.36)&&y[a]&&e(i.target).is(":focus")||"focusout"==i.type&&"radio"==s.type&&v(s.name))){var r,p,u,g,b,w=e.prop(s,"validity");t.refreshCustomValidityRules&&t.refreshCustomValidityRules(s),w.valid?n.hasClass(c)||(r=c,p=d,g="changedvaliditystate",u="changedvalid",h[s.type]&&s.checked&&m(s).not(s).removeClass(p).addClass(r).removeAttr("aria-invalid"),n.removeAttr("aria-invalid"),e.removeData(s,"webshimsinvalidcause")):(b=f(w,s),e.data(s,"webshimsinvalidcause")!=b&&(e.data(s,"webshimsinvalidcause",b),g="changedvaliditystate"),n.hasClass(d)||(r=d,p=c,h[s.type]&&!s.checked&&m(s).not(s).removeClass(p).addClass(r).attr("aria-invalid","true"),n.attr("aria-invalid","true"),u="changedinvalid")),r&&(n.addClass(r).removeClass(p),setTimeout(function(){e(s).trigger(u)},0)),g&&setTimeout(function(){e(s).trigger(g)},0),e.removeData(s,"webshimsswitchvalidityclass")}};(r=e.data(s,"webshimsswitchvalidityclass"))&&clearTimeout(r),"refreshvalidityui"==i.type?p():e.data(s,"webshimsswitchvalidityclass",setTimeout(p,9))}};e(s.body).on(n.validityUIEvents||"focusout change refreshvalidityui invalid",b).on("reset resetvalui",function(t){var i=e(t.target);"reset"==t.type&&(i=i.filter("form").jProp("elements")),i.filter(".user-error, .user-success").removeAttr("aria-invalid").removeClass("user-error").removeClass("user-success").getNativeElement().each(function(){e.removeData(this,"webshimsinvalidcause")}).trigger("resetvalidityui")});var w,E,V=function(){t.scrollRoot=a||"BackCompat"==s.compatMode?e(s.body):e(s.documentElement)},k=Modernizr.boxSizing||Modernizr["display-table"]||e.support.getSetAttribute?"minWidth":"width",C="transitionDelay"in s.documentElement.style;V(),t.ready("DOM",V),t.getRelOffset=function(t,i){t=e(t);var s,r=e(i).offset();return e.swap(e(t)[0],{visibility:"hidden",display:"inline-block",left:0,top:0},function(){s=t.offset()}),r.top-=s.top,r.left-=s.left,r},e.extend(t.wsPopover,{isInElement:function(t,i){return t==i||e.contains(t,i)},show:function(t){var r=e.Event("wspopoverbeforeshow");if(this.element.trigger(r),!r.isDefaultPrevented()&&!this.isVisible){this.isVisible=!0,t=e(t||this.options.prepareFor).getNativeElement();var n=this,a=e(t).getShadowElement();this.clear(),this.element.removeClass("ws-po-visible").css("display","none"),this.prepareFor(t,a),this.position(a),n.timers.show=setTimeout(function(){n.element.css("display",""),n.timers.show=setTimeout(function(){n.element.addClass("ws-po-visible").trigger("wspopovershow")},9)},9),this.element.on("remove",function(e){e.originalEvent||n.destroy()}),e(s).on("focusin"+this.eventns+" mousedown"+this.eventns,function(e){!n.options.hideOnBlur||n.stopBlur||n.isInElement(n.lastElement[0]||s.body,e.target)||n.isInElement(t[0]||s.body,e.target)||n.isInElement(n.element[0],e.target)||n.hide()}),e(i).on("resize"+this.eventns+" pospopover"+this.eventns,function(){clearTimeout(n.timers.repos),n.timers.repos=setTimeout(function(){n.position(a)},900)})}},prepareFor:function(t,i){var s,r=e.extend({},this.options,e(t.prop("form")||[]).data("wspopover")||{},t.data("wspopover")),n=this,a={};this.lastElement=e(t).getShadowFocusElement(),this.prepared&&this.options.prepareFor||("element"==r.appendTo?this.element.insertAfter(t):this.element.appendTo(r.appendTo)),this.element.attr({"data-class":t.prop("className"),"data-id":t.prop("id")}),a[k]=r.constrainWidth?i.outerWidth():"",this.element.css(a),r.hideOnBlur&&(s=function(e){n.stopBlur?e.stopImmediatePropagation():n.hide()},n.timers.bindBlur=setTimeout(function(){n.lastElement.off(n.eventns).on("focusout"+n.eventns+" blur"+n.eventns,s),n.lastElement.getNativeElement().off(n.eventns)},10)),!this.prepared&&e.fn.bgIframe&&this.element.bgIframe(),this.prepared=!0},clear:function(){e(i).off(this.eventns),e(s).off(this.eventns),this.element.off("transitionend"+this.eventns),this.stopBlur=!1,e.each(this.timers,function(e,t){clearTimeout(t)})},hide:function(){var t=e.Event("wspopoverbeforehide");if(this.element.trigger(t),!t.isDefaultPrevented()&&this.isVisible){this.isVisible=!1;var s=this,r=function(t){t&&"transitionend"==t.type&&(t=t.originalEvent)&&t.target==s.element[0]&&"hidden"==s.element.css("visibility")||(s.element.off("transitionend"+s.eventns).css("display","none").attr({"data-id":"","data-class":"",hidden:"hidden"}),clearTimeout(s.timers.forcehide),e(i).off("resize"+s.eventns))};this.clear(),this.element.removeClass("ws-po-visible").trigger("wspopoverhide"),e(i).on("resize"+this.eventns,r),C&&this.element.off("transitionend"+this.eventns).on("transitionend"+this.eventns,r),s.timers.forcehide=setTimeout(r,C?600:40)}},position:function(e){var i=t.getRelOffset(this.element.css({marginTop:0,marginLeft:0,marginRight:0,marginBottom:0}).removeAttr("hidden"),e);i.top+=e.outerHeight(),this.element.css({marginTop:"",marginLeft:"",marginRight:"",marginBottom:""}).css(i)}}),t.validityAlert=(w=t.objectCreate(t.wsPopover,{},n.messagePopover),E=w.hide.bind(w),w.element.addClass("validity-alert").attr({role:"alert"}),e.extend(w,{hideDelay:5e3,showFor:function(t,i,s,r){t=e(t).getNativeElement(),this.clear(),this.hide(),r||(this.getMessage(t,i),this.show(t),this.hideDelay&&(this.timers.delayedHide=setTimeout(E,this.hideDelay))),s||this.setFocus(t)},setFocus:function(s){var r=e(s).getShadowFocusElement(),n=t.scrollRoot.scrollTop(),a=r.offset().top-30,o=function(){try{r[0].focus()}catch(t){}e(i).triggerHandler("pospopover"+this.eventns)};n>a?t.scrollRoot.animate({scrollTop:a-5},{queue:!1,duration:Math.max(Math.min(600,1.5*(n-a)),80),complete:o}):o()},getMessage:function(e,t){t||(t=e.getErrorMessage()),t?w.contentElement.text(t):this.hide()}}),w);var x,T,F={slide:{show:"slideDown",hide:"slideUp"},fade:{show:"fadeIn",hide:"fadeOut"}};F[n.iVal.fx]||(n.iVal.fx="slide"),t.errorbox={create:function(t,i){i||(i=this.getFieldWrapper(t));var s=e("div.ws-errorbox",i);return s.length||(s=e('<div class="ws-errorbox" hidden="hidden">'),i.append(s)),i.data("errorbox",s),s},getFieldWrapper:function(i){var s;return n.iVal.fieldWrapper&&((s="function"==typeof n.iVal.fieldWrapper?n.iVal.fieldWrapper.apply(this,arguments):e(i).parent().closest(n.iVal.fieldWrapper)).length||(s=!1,t.error("could not find fieldwrapper: "+n.iVal.fieldWrapper))),s||(s=e(i).parent().closest(":not(span, label, em, strong, b, mark, p)")),s},get:function(t,i){i||(i=this.getFieldWrapper(t));var s=i.data("errorbox");return s?"string"==typeof s&&(s=e("#"+s),e.data(t,"errorbox",s)):s=this.create(t,i),s},addSuccess:function(t,i){var s=e.prop(t,"type"),r=function(){var r=h[s]?e.prop(t,"checked"):e(t).val();i[r?"addClass":"removeClass"]("ws-success")},n=g[s]?"change":"blur";e(t).off(".recheckvalid").on(n+".recheckinvalid",r),r()},hideError:function(t,i){var s=this.getFieldWrapper(t),r=s.data("errorbox");return r&&r.jquery&&(s.removeClass("ws-invalid"),r.message="",e(t).filter("input").off(".recheckinvalid"),r.slideUp(function(){e(this).attr({hidden:"hidden"})})),i||this.addSuccess(t,s),s},recheckInvalidInput:function(t){if(n.iVal.recheckDelay&&n.iVal.recheckDelay>90){var i,s=function(){b({type:"input",target:t})};e(t).filter('input:not([type="checkbox"], [type="radio"])').off(".recheckinvalid").on("input.recheckinvalid",function(){clearTimeout(i),i=setTimeout(s,n.iVal.recheckDelay)})}},showError:function(t,i){var s=this.getFieldWrapper(t),r=this.get(t,s);return r.message!=i&&(r.stop(!0,!0).html("<p>"+i+"</p>"),r.message=i,s.addClass("ws-invalid").removeClass("ws-success"),r.is("[hidden]")&&(this.recheckInvalidInput(t),r.css({display:"none"}).removeAttr("hidden")[F[n.iVal.fx].show]())),s.removeClass("ws-success"),e(t).off(".recheckvalid"),s},reset:function(e){this.hideError(e,!0).removeClass("ws-success")},toggle:function(t){var i=e(t).getErrorMessage();i?this.showError(t,i):this.hideError(t,i)}},e(s.body).on({changedvaliditystate:function(i){n.iVal.sel&&(e(i.target).jProp("form").is(n.iVal.sel)&&t.errorbox.toggle(i.target))},resetvalidityui:function(i){n.iVal.sel&&(e(i.target).jProp("form").is(n.iVal.sel)&&t.errorbox.reset(i.target))},firstinvalid:function(i){n.iVal.sel&&n.iVal.handleBubble&&(e(i.target).jProp("form").is(n.iVal.sel)&&(i.preventDefault(),"none"!=n.iVal.handleBubble&&t.validityAlert.showFor(i.target,!1,!1,"hide"==n.iVal.handleBubble)))},submit:function(t){if(n.iVal.sel&&e(t.target).is(n.iVal.sel)&&e.prop(t.target,"noValidate")&&!e(t.target).checkValidity())return!1}}),t.modules["form-core"].getGroupElements=m,o&&l<540&&(x=/^(?:textarea|input)$/i,T=!1,s.addEventListener("contextmenu",function(e){x.test(e.target.nodeName||"")&&(T=e.target.form)&&setTimeout(function(){T=!1},1)},!1),e(i).on("invalid",function(e){e.originalEvent&&T&&T==e.target.form&&(e.wrongWebkitInvalid=!0,e.stopImmediatePropagation())}))});