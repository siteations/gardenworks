webshims.register("form-core",function(e,t,i,r,n,a){"use strict";t.capturingEventPrevented=function(t){if(!t._isPolyfilled){var i=t.isDefaultPrevented,r=t.preventDefault;t.preventDefault=function(){return clearTimeout(e.data(t.target,t.type+"DefaultPrevented")),e.data(t.target,t.type+"DefaultPrevented",setTimeout(function(){e.removeData(t.target,t.type+"DefaultPrevented")},30)),r.apply(this,arguments)},t.isDefaultPrevented=function(){return!(!i.apply(this,arguments)&&!e.data(t.target,t.type+"DefaultPrevented"))},t._isPolyfilled=!0}},Modernizr.formvalidation&&!t.bugs.bustedValidity&&t.capturingEvents(["invalid"],!0);var o=function(t){return(e.prop(t,"validity")||{valid:1}).valid},s=function(){var i=["form-validation"];a.lazyCustomMessages&&(a.customMessages=!0,i.push("form-message")),a.addValidators&&i.push("form-validators"),t.reTest(i),e(r).off(".lazyloadvalidation")},l=function(t){var i=!1;return e(t).jProp("elements").each(function(){if(i=e(this).is(":invalid"))return!1}),i},d=/^(?:form)$/i;e.extend(e.expr[":"],{"valid-element":function(t){return d.test(t.nodeName||"")?!l(t):!(!e.prop(t,"willValidate")||!o(t))},"invalid-element":function(t){return d.test(t.nodeName||"")?l(t):!(!e.prop(t,"willValidate")||o(t))},"required-element":function(t){return!(!e.prop(t,"willValidate")||!e.prop(t,"required"))},"user-error":function(t){return e.prop(t,"willValidate")&&e(t).hasClass("user-error")},"optional-element":function(t){return!(!e.prop(t,"willValidate")||!1!==e.prop(t,"required"))}}),["valid","invalid","required","optional"].forEach(function(t){e.expr[":"][t]=e.expr.filters[t+"-element"]}),e.expr[":"].focus=function(e){try{var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())}catch(i){}return!1},t.triggerInlineForm=function(t,i){e(t).trigger(i)};var u,v,f,p=function(e,i,r){s(),t.ready("form-validation",function(){e[i].apply(e,r)})};t.wsPopover={id:0,_create:function(){this.options=e.extend({},t.cfg.wspopover,this.options),this.id=t.wsPopover.id++,this.eventns=".wsoverlay"+this.id,this.timers={},this.element=e('<div class="ws-popover" tabindex="-1"><div class="ws-po-outerbox"><div class="ws-po-arrow"><div class="ws-po-arrowbox" /></div><div class="ws-po-box" /></div></div>'),this.contentElement=e(".ws-po-box",this.element),this.lastElement=e([]),this.bindElement(),this.element.data("wspopover",this)},options:{},content:function(e){this.contentElement.html(e)},bindElement:function(){var e=this,t=function(){e.stopBlur=!1};this.preventBlur=function(){e.stopBlur=!0,clearTimeout(e.timers.stopBlur),e.timers.stopBlur=setTimeout(t,9)},this.element.on({mousedown:this.preventBlur})},show:function(){p(this,"show",arguments)}},t.validityAlert={showFor:function(){p(this,"showFor",arguments)}},f=[],e(r).on("invalid",function(t){if(!t.wrongWebkitInvalid){var i=e(t.target);if(!u){(u=e.Event("firstinvalid")).isInvalidUIPrevented=t.isDefaultPrevented;var n=e.Event("firstinvalidsystem");e(r).triggerHandler(n,{element:t.target,form:t.target.form,isInvalidUIPrevented:t.isDefaultPrevented}),i.trigger(u)}u&&u.isDefaultPrevented()&&t.preventDefault(),f.push(t.target),t.extraData="fix",clearTimeout(v),v=setTimeout(function(){var i={type:"lastinvalid",cancelable:!1,invalidlist:e(f)};u=!1,f=[],e(t.target).trigger(i,i)},9),i=null}}),t.getContentValidationMessage=function(t,i,r){var n=e(t).data("errormessage")||t.getAttribute("x-moz-errormessage")||"";return r&&n[r]&&(n=n[r]),"object"==typeof n&&((i=i||e.prop(t,"validity")||{valid:1}).valid||e.each(i,function(e,t){if(t&&"valid"!=e&&n[e])return n=n[e],!1})),"object"==typeof n&&(n=n.defaultMessage),n||""},e.fn.getErrorMessage=function(i){var r="",n=this[0];return n&&(r=t.getContentValidationMessage(n,!1,i)||e.prop(n,"customValidationMessage")||e.prop(n,"validationMessage")),r},t.ready("forms",function(){e(r).on("focusin.lazyloadvalidation",function(t){"form"in t.target&&e(t.target).is(":invalid")&&s()})}),t.ready("WINDOWLOAD",s),a.overrideMessages&&(a.customMessages=!0,t.reTest("form-message"),t.error("overrideMessages is deprecated. use customMessages instead.")),a.replaceValidationUI&&t.ready("DOM forms",function(){e(r).on("firstinvalid",function(e){e.isInvalidUIPrevented()||(e.preventDefault(),t.validityAlert.showFor(e.target))})})});