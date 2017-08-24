/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var webSocketPatch = require("./websocket");
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function propertyDescriptorPatch(_global) {
    if (utils_1.isNode && !utils_1.isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (utils_1.isBrowser) {
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            utils_1.patchOnProperties(window, eventNames, Object.getPrototypeOf(window));
            utils_1.patchOnProperties(Document.prototype, eventNames);
            if (typeof window['SVGElement'] !== 'undefined') {
                utils_1.patchOnProperties(window['SVGElement'].prototype, eventNames);
            }
            utils_1.patchOnProperties(Element.prototype, eventNames);
            utils_1.patchOnProperties(HTMLElement.prototype, eventNames);
            utils_1.patchOnProperties(HTMLMediaElement.prototype, mediaElementEventNames);
            utils_1.patchOnProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames));
            utils_1.patchOnProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames));
            utils_1.patchOnProperties(HTMLFrameElement.prototype, frameEventNames);
            utils_1.patchOnProperties(HTMLIFrameElement.prototype, frameEventNames);
            var HTMLMarqueeElement_1 = window['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                utils_1.patchOnProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames);
            }
        }
        utils_1.patchOnProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames);
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            utils_1.patchOnProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames);
        }
        if (typeof IDBIndex !== 'undefined') {
            utils_1.patchOnProperties(IDBIndex.prototype, IDBIndexEventNames);
            utils_1.patchOnProperties(IDBRequest.prototype, IDBIndexEventNames);
            utils_1.patchOnProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames);
            utils_1.patchOnProperties(IDBDatabase.prototype, IDBIndexEventNames);
            utils_1.patchOnProperties(IDBTransaction.prototype, IDBIndexEventNames);
            utils_1.patchOnProperties(IDBCursor.prototype, IDBIndexEventNames);
        }
        if (supportsWebSocket) {
            utils_1.patchOnProperties(WebSocket.prototype, websocketEventNames);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        utils_1.patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            webSocketPatch.apply(_global);
        }
    }
}
exports.propertyDescriptorPatch = propertyDescriptorPatch;
function canPatchViaPropertyDescriptor() {
    if ((utils_1.isBrowser || utils_1.isMix) && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var xhrDesc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'onreadystatechange');
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
        return result;
    }
    else {
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[utils_1.zoneSymbol('fakeonreadystatechange')];
            },
            set: function (value) {
                this[utils_1.zoneSymbol('fakeonreadystatechange')] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[utils_1.zoneSymbol('fakeonreadystatechange')] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
;
var unboundKey = utils_1.zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = Zone.current.wrap(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5LWRlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7QUFFSCx5Q0FBb0c7QUFFcEcsNENBQThDO0FBRTlDLElBQU0sNkJBQTZCLEdBQUc7SUFDcEMsT0FBTztJQUNQLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixhQUFhO0lBQ2IsTUFBTTtJQUNOLFFBQVE7SUFDUixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFVBQVU7SUFDVixNQUFNO0lBQ04sU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLFNBQVM7SUFDVCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxTQUFTO0lBQ1QsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixPQUFPO0lBQ1AsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0lBQ1YsT0FBTztJQUNQLE1BQU07SUFDTixXQUFXO0lBQ1gsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0lBQ1osV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsU0FBUztJQUNULFlBQVk7SUFDWixPQUFPO0lBQ1AsTUFBTTtJQUNOLFNBQVM7SUFDVCxlQUFlO0lBQ2YsYUFBYTtJQUNiLGNBQWM7SUFDZCxjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQix3QkFBd0I7SUFDeEIs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QyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUFqQyxDQUFDO0tBbUJUO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpc0Jyb3dzZXIsIGlzTWl4LCBpc05vZGUsIHBhdGNoQ2xhc3MsIHBhdGNoT25Qcm9wZXJ0aWVzLCB6b25lU3ltYm9sfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5pbXBvcnQgKiBhcyB3ZWJTb2NrZXRQYXRjaCBmcm9tICcuL3dlYnNvY2tldCc7XG5cbmNvbnN0IGdsb2JhbEV2ZW50SGFuZGxlcnNFdmVudE5hbWVzID0gW1xuICAnYWJvcnQnLFxuICAnYW5pbWF0aW9uY2FuY2VsJyxcbiAgJ2FuaW1hdGlvbmVuZCcsXG4gICdhbmltYXRpb25pdGVyYXRpb24nLFxuICAnYXV4Y2xpY2snLFxuICAnYmVmb3JlaW5wdXQnLFxuICAnYmx1cicsXG4gICdjYW5jZWwnLFxuICAnY2FucGxheScsXG4gICdjYW5wbGF5dGhyb3VnaCcsXG4gICdjaGFuZ2UnLFxuICAnY29tcG9zaXRpb25zdGFydCcsXG4gICdjb21wb3NpdGlvbnVwZGF0ZScsXG4gICdjb21wb3NpdGlvbmVuZCcsXG4gICdjdWVjaGFuZ2UnLFxuICAnY2xpY2snLFxuICAnY2xvc2UnLFxuICAnY29udGV4dG1lbnUnLFxuICAnY3VyZWNoYW5nZScsXG4gICdkYmxjbGljaycsXG4gICdkcmFnJyxcbiAgJ2RyYWdlbmQnLFxuICAnZHJhZ2VudGVyJyxcbiAgJ2RyYWdleGl0JyxcbiAgJ2RyYWdsZWF2ZScsXG4gICdkcmFnb3ZlcicsXG4gICdkcm9wJyxcbiAgJ2R1cmF0aW9uY2hhbmdlJyxcbiAgJ2VtcHRpZWQnLFxuICAnZW5kZWQnLFxuICAnZXJyb3InLFxuICAnZm9jdXMnLFxuICAnZm9jdXNpbicsXG4gICdmb2N1c291dCcsXG4gICdnb3Rwb2ludGVyY2FwdHVyZScsXG4gICdpbnB1dCcsXG4gICdpbnZhbGlkJyxcbiAgJ2tleWRvd24nLFxuICAna2V5cHJlc3MnLFxuICAna2V5dXAnLFxuICAnbG9hZCcsXG4gICdsb2Fkc3RhcnQnLFxuICAnbG9hZGVkZGF0YScsXG4gICdsb2FkZWRtZXRhZGF0YScsXG4gICdsb3N0cG9pbnRlcmNhcHR1cmUnLFxuICAnbW91c2Vkb3duJyxcbiAgJ21vdXNlZW50ZXInLFxuICAnbW91c2VsZWF2ZScsXG4gICdtb3VzZW1vdmUnLFxuICAnbW91c2VvdXQnLFxuICAnbW91c2VvdmVyJyxcbiAgJ21vdXNldXAnLFxuICAnbW91c2V3aGVlbCcsXG4gICdwYXVzZScsXG4gICdwbGF5JyxcbiAgJ3BsYXlpbmcnLFxuICAncG9pbnRlcmNhbmNlbCcsXG4gICdwb2ludGVyZG93bicsXG4gICdwb2ludGVyZW50ZXInLFxuICAncG9pbnRlcmxlYXZlJyxcbiAgJ3BvaW50ZXJsb2NrY2hhbmdlJyxcbiAgJ21venBvaW50ZXJsb2NrY2hhbmdlJyxcbiAgJ3dlYmtpdHBvaW50ZXJsb2NrZXJjaGFuZ2UnLFxuICAncG9pbnRlcmxvY2tlcnJvcicsXG4gICdtb3pwb2ludGVybG9ja2Vycm9yJyxcbiAgJ3dlYmtpdHBvaW50ZXJsb2NrZXJyb3InLFxuICAncG9pbnRlcm1vdmUnLFxuICAncG9pbnRvdXQnLFxuICAncG9pbnRlcm92ZXInLFxuICAncG9pbnRlcnVwJyxcbiAgJ3Byb2dyZXNzJyxcbiAgJ3JhdGVjaGFuZ2UnLFxuICAncmVzZXQnLFxuICAncmVzaXplJyxcbiAgJ3Njcm9sbCcsXG4gICdzZWVrZWQnLFxuICAnc2Vla2luZycsXG4gICdzZWxlY3QnLFxuICAnc2VsZWN0aW9uY2hhbmdlJyxcbiAgJ3NlbGVjdHN0YXJ0JyxcbiAgJ3Nob3cnLFxuICAnc29ydCcsXG4gICdzdGFsbGVkJyxcbiAgJ3N1Ym1pdCcsXG4gICdzdXNwZW5kJyxcbiAgJ3RpbWV1cGRhdGUnLFxuICAndm9sdW1lY2hhbmdlJyxcbiAgJ3RvdWNoY2FuY2VsJyxcbiAgJ3RvdWNobW92ZScsXG4gICd0b3VjaHN0YXJ0JyxcbiAgJ3RyYW5zaXRpb25jYW5jZWwnLFxuICAndHJhbnNpdGlvbmVuZCcsXG4gICd3YWl0aW5nJyxcbiAgJ3doZWVsJ1xuXTtcbmNvbnN0IGRvY3VtZW50RXZlbnROYW1lcyA9IFtcbiAgJ2FmdGVyc2NyaXB0ZXhlY3V0ZScsICdiZWZvcmVzY3JpcHRleGVjdXRlJywgJ0RPTUNvbnRlbnRMb2FkZWQnLCAnZnVsbHNjcmVlbmNoYW5nZScsXG4gICdtb3pmdWxsc2NyZWVuY2hhbmdlJywgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCAnbXNmdWxsc2NyZWVuY2hhbmdlJywgJ2Z1bGxzY3JlZW5lcnJvcicsXG4gICdtb3pmdWxsc2NyZWVuZXJyb3InLCAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJywgJ21zZnVsbHNjcmVlbmVycm9yJywgJ3JlYWR5c3RhdGVjaGFuZ2UnXG5dO1xuY29uc3Qgd2luZG93RXZlbnROYW1lcyA9IFtcbiAgJ2Fic29sdXRlZGV2aWNlb3JpZW50YXRpb24nLFxuICAnYWZ0ZXJpbnB1dCcsXG4gICdhZnRlcnByaW50JyxcbiAgJ2FwcGluc3RhbGxlZCcsXG4gICdiZWZvcmVpbnN0YWxscHJvbXB0JyxcbiAgJ2JlZm9yZXByaW50JyxcbiAgJ2JlZm9yZXVubG9hZCcsXG4gICdkZXZpY2VsaWdodCcsXG4gICdkZXZpY2Vtb3Rpb24nLFxuICAnZGV2aWNlb3JpZW50YXRpb24nLFxuICAnZGV2aWNlb3JpZW50YXRpb25hYnNvbHV0ZScsXG4gICdkZXZpY2Vwcm94aW1pdHknLFxuICAnaGFzaGNoYW5nZScsXG4gICdsYW5ndWFnZWNoYW5nZScsXG4gICdtZXNzYWdlJyxcbiAgJ21vemJlZm9yZXBhaW50JyxcbiAgJ29mZmxpbmUnLFxuICAnb25saW5lJyxcbiAgJ3BhaW50JyxcbiAgJ3BhZ2VzaG93JyxcbiAgJ3BhZ2VoaWRlJyxcbiAgJ3BvcHN0YXRlJyxcbiAgJ3JlamVjdGlvbmhhbmRsZWQnLFxuICAnc3RvcmFnZScsXG4gICd1bmhhbmRsZWRyZWplY3Rpb24nLFxuICAndW5sb2FkJyxcbiAgJ3VzZXJwcm94aW1pdHknLFxuICAndnJkaXNwbHljb25uZWN0ZWQnLFxuICAndnJkaXNwbGF5ZGlzY29ubmVjdGVkJyxcbiAgJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnXG5dO1xuY29uc3QgaHRtbEVsZW1lbnRFdmVudE5hbWVzID0gW1xuICAnYmVmb3JlY29weScsICdiZWZvcmVjdXQnLCAnYmVmb3JlcGFzdGUnLCAnY29weScsICdjdXQnLCAncGFzdGUnLCAnZHJhZ3N0YXJ0JywgJ2xvYWRlbmQnLFxuICAnYW5pbWF0aW9uc3RhcnQnLCAnc2VhcmNoJywgJ3RyYW5zaXRpb25ydW4nLCAndHJhbnNpdGlvbnN0YXJ0JywgJ3dlYmtpdGFuaW1hdGlvbmVuZCcsXG4gICd3ZWJraXRhbmltYXRpb25pdGVyYXRpb24nLCAnd2Via2l0YW5pbWF0aW9uc3RhcnQnLCAnd2Via2l0dHJhbnNpdGlvbmVuZCdcbl07XG5jb25zdCBtZWRpYUVsZW1lbnRFdmVudE5hbWVzID1cbiAgICBbJ2VuY3J5cHRlZCcsICd3YWl0aW5nZm9ya2V5JywgJ21zbmVlZGtleScsICdtb3ppbnRlcnJ1cHRiZWdpbicsICdtb3ppbnRlcnJ1cHRlbmQnXTtcbmNvbnN0IGllRWxlbWVudEV2ZW50TmFtZXMgPSBbXG4gICdhY3RpdmF0ZScsXG4gICdhZnRlcnVwZGF0ZScsXG4gICdhcmlhcmVxdWVzdCcsXG4gICdiZWZvcmVhY3RpdmF0ZScsXG4gICdiZWZvcmVkZWFjdGl2YXRlJyxcbiAgJ2JlZm9yZWVkaXRmb2N1cycsXG4gICdiZWZvcmV1cGRhdGUnLFxuICAnY2VsbGNoYW5nZScsXG4gICdjb250cm9sc2VsZWN0JyxcbiAgJ2RhdGFhdmFpbGFibGUnLFxuICAnZGF0YXNldGNoYW5nZWQnLFxuICAnZGF0YXNldGNvbXBsZXRlJyxcbiAgJ2Vycm9ydXBkYXRlJyxcbiAgJ2ZpbHRlcmNoYW5nZScsXG4gICdsYXlvdXRjb21wbGV0ZScsXG4gICdsb3NlY2FwdHVyZScsXG4gICdtb3ZlJyxcbiAgJ21vdmVlbmQnLFxuICAnbW92ZXN0YXJ0JyxcbiAgJ3Byb3BlcnR5Y2hhbmdlJyxcbiAgJ3Jlc2l6ZWVuZCcsXG4gICdyZXNpemVzdGFydCcsXG4gICdyb3dlbnRlcicsXG4gICdyb3dleGl0JyxcbiAgJ3Jvd3NkZWxldGUnLFxuICAncm93c2luc2VydGVkJyxcbiAgJ2NvbW1hbmQnLFxuICAnY29tcGFzc25lZWRzY2FsaWJyYXRpb24nLFxuICAnZGVhY3RpdmF0ZScsXG4gICdoZWxwJyxcbiAgJ21zY29udGVudHpvb20nLFxuICAnbXNtYW5pcHVsYXRpb25zdGF0ZWNoYW5nZWQnLFxuICAnbXNnZXN0dXJlY2hhbmdlJyxcbiAgJ21zZ2VzdHVyZWRvdWJsZXRhcCcsXG4gICdtc2dlc3R1cmVlbmQnLFxuICAnbXNnZXN0dXJlaG9sZCcsXG4gICdtc2dlc3R1cmVzdGFydCcsXG4gICdtc2dlc3R1cmV0YXAnLFxuICAnbXNnb3Rwb2ludGVyY2FwdHVyZScsXG4gICdtc2luZXJ0aWFzdGFydCcsXG4gICdtc2xvc3Rwb2ludGVyY2FwdHVyZScsXG4gICdtc3BvaW50ZXJjYW5jZWwnLFxuICAnbXNwb2ludGVyZG93bicsXG4gICdtc3BvaW50ZXJlbnRlcicsXG4gICdtc3BvaW50ZXJob3ZlcicsXG4gICdtc3BvaW50ZXJsZWF2ZScsXG4gICdtc3BvaW50ZXJtb3ZlJyxcbiAgJ21zcG9pbnRlcm91dCcsXG4gICdtc3BvaW50ZXJvdmVyJyxcbiAgJ21zcG9pbnRlcnVwJyxcbiAgJ3BvaW50ZXJvdXQnLFxuICAnbXNzaXRlbW9kZWp1bXBsaXN0aXRlbXJlbW92ZWQnLFxuICAnbXN0aHVtYm5haWxjbGljaycsXG4gICdzdG9wJyxcbiAgJ3N0b3JhZ2Vjb21taXQnXG5dO1xuY29uc3Qgd2ViZ2xFdmVudE5hbWVzID0gWyd3ZWJnbGNvbnRleHRyZXN0b3JlZCcsICd3ZWJnbGNvbnRleHRsb3N0JywgJ3dlYmdsY29udGV4dGNyZWF0aW9uZXJyb3InXTtcbmNvbnN0IGZvcm1FdmVudE5hbWVzID0gWydhdXRvY29tcGxldGUnLCAnYXV0b2NvbXBsZXRlZXJyb3InXTtcbmNvbnN0IGRldGFpbEV2ZW50TmFtZXMgPSBbJ3RvZ2dsZSddO1xuY29uc3QgZnJhbWVFdmVudE5hbWVzID0gWydsb2FkJ107XG5jb25zdCBmcmFtZVNldEV2ZW50TmFtZXMgPSBbJ2JsdXInLCAnZXJyb3InLCAnZm9jdXMnLCAnbG9hZCcsICdyZXNpemUnLCAnc2Nyb2xsJ107XG5jb25zdCBtYXJxdWVlRXZlbnROYW1lcyA9IFsnYm91bmNlJywgJ2ZpbmlzaCcsICdzdGFydCddO1xuXG5jb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50TmFtZXMgPSBbXG4gICdsb2Fkc3RhcnQnLCAncHJvZ3Jlc3MnLCAnYWJvcnQnLCAnZXJyb3InLCAnbG9hZCcsICdwcm9ncmVzcycsICd0aW1lb3V0JywgJ2xvYWRlbmQnLFxuICAncmVhZHlzdGF0ZWNoYW5nZSdcbl07XG5jb25zdCBJREJJbmRleEV2ZW50TmFtZXMgPVxuICAgIFsndXBncmFkZW5lZWRlZCcsICdjb21wbGV0ZScsICdhYm9ydCcsICdzdWNjZXNzJywgJ2Vycm9yJywgJ2Jsb2NrZWQnLCAndmVyc2lvbmNoYW5nZScsICdjbG9zZSddO1xuY29uc3Qgd2Vic29ja2V0RXZlbnROYW1lcyA9IFsnY2xvc2UnLCAnZXJyb3InLCAnb3BlbicsICdtZXNzYWdlJ107XG5cbmNvbnN0IGV2ZW50TmFtZXMgPSBnbG9iYWxFdmVudEhhbmRsZXJzRXZlbnROYW1lcy5jb25jYXQoXG4gICAgd2ViZ2xFdmVudE5hbWVzLCBmb3JtRXZlbnROYW1lcywgZGV0YWlsRXZlbnROYW1lcywgZG9jdW1lbnRFdmVudE5hbWVzLCB3aW5kb3dFdmVudE5hbWVzLFxuICAgIGh0bWxFbGVtZW50RXZlbnROYW1lcywgaWVFbGVtZW50RXZlbnROYW1lcyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eURlc2NyaXB0b3JQYXRjaChfZ2xvYmFsOiBhbnkpIHtcbiAgaWYgKGlzTm9kZSAmJiAhaXNNaXgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c1dlYlNvY2tldCA9IHR5cGVvZiBXZWJTb2NrZXQgIT09ICd1bmRlZmluZWQnO1xuICBpZiAoY2FuUGF0Y2hWaWFQcm9wZXJ0eURlc2NyaXB0b3IoKSkge1xuICAgIC8vIGZvciBicm93c2VycyB0aGF0IHdlIGNhbiBwYXRjaCB0aGUgZGVzY3JpcHRvcjogIENocm9tZSAmIEZpcmVmb3hcbiAgICBpZiAoaXNCcm93c2VyKSB7XG4gICAgICAvLyBpbiBJRS9FZGdlLCBvblByb3Agbm90IGV4aXN0IGluIHdpbmRvdyBvYmplY3QsIGJ1dCBpbiBXaW5kb3dQcm90b3R5cGVcbiAgICAgIC8vIHNvIHdlIG5lZWQgdG8gcGFzcyBXaW5kb3dQcm90b3R5cGUgdG8gY2hlY2sgb25Qcm9wIGV4aXN0IG9yIG5vdFxuICAgICAgcGF0Y2hPblByb3BlcnRpZXMod2luZG93LCBldmVudE5hbWVzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93KSk7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhEb2N1bWVudC5wcm90b3R5cGUsIGV2ZW50TmFtZXMpO1xuXG4gICAgICBpZiAodHlwZW9mKDxhbnk+d2luZG93KVsnU1ZHRWxlbWVudCddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXRjaE9uUHJvcGVydGllcygoPGFueT53aW5kb3cpWydTVkdFbGVtZW50J10ucHJvdG90eXBlLCBldmVudE5hbWVzKTtcbiAgICAgIH1cbiAgICAgIHBhdGNoT25Qcm9wZXJ0aWVzKEVsZW1lbnQucHJvdG90eXBlLCBldmVudE5hbWVzKTtcbiAgICAgIHBhdGNoT25Qcm9wZXJ0aWVzKEhUTUxFbGVtZW50LnByb3RvdHlwZSwgZXZlbnROYW1lcyk7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhIVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgbWVkaWFFbGVtZW50RXZlbnROYW1lcyk7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhIVE1MRnJhbWVTZXRFbGVtZW50LnByb3RvdHlwZSwgd2luZG93RXZlbnROYW1lcy5jb25jYXQoZnJhbWVTZXRFdmVudE5hbWVzKSk7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhIVE1MQm9keUVsZW1lbnQucHJvdG90eXBlLCB3aW5kb3dFdmVudE5hbWVzLmNvbmNhdChmcmFtZVNldEV2ZW50TmFtZXMpKTtcbiAgICAgIHBhdGNoT25Qcm9wZXJ0aWVzKEhUTUxGcmFtZUVsZW1lbnQucHJvdG90eXBlLCBmcmFtZUV2ZW50TmFtZXMpO1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLCBmcmFtZUV2ZW50TmFtZXMpO1xuXG4gICAgICBjb25zdCBIVE1MTWFycXVlZUVsZW1lbnQgPSAod2luZG93IGFzIGFueSlbJ0hUTUxNYXJxdWVlRWxlbWVudCddO1xuICAgICAgaWYgKEhUTUxNYXJxdWVlRWxlbWVudCkge1xuICAgICAgICBwYXRjaE9uUHJvcGVydGllcyhIVE1MTWFycXVlZUVsZW1lbnQucHJvdG90eXBlLCBtYXJxdWVlRXZlbnROYW1lcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHBhdGNoT25Qcm9wZXJ0aWVzKFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgWE1MSHR0cFJlcXVlc3RFdmVudE5hbWVzKTtcbiAgICBjb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ID0gX2dsb2JhbFsnWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCddO1xuICAgIGlmIChYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0KSB7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhcbiAgICAgICAgICBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ICYmIFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQucHJvdG90eXBlLFxuICAgICAgICAgIFhNTEh0dHBSZXF1ZXN0RXZlbnROYW1lcyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgSURCSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhJREJJbmRleC5wcm90b3R5cGUsIElEQkluZGV4RXZlbnROYW1lcyk7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhJREJSZXF1ZXN0LnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzKTtcbiAgICAgIHBhdGNoT25Qcm9wZXJ0aWVzKElEQk9wZW5EQlJlcXVlc3QucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMpO1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoSURCRGF0YWJhc2UucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMpO1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoSURCVHJhbnNhY3Rpb24ucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMpO1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoSURCQ3Vyc29yLnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzKTtcbiAgICB9XG4gICAgaWYgKHN1cHBvcnRzV2ViU29ja2V0KSB7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhXZWJTb2NrZXQucHJvdG90eXBlLCB3ZWJzb2NrZXRFdmVudE5hbWVzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gU2FmYXJpLCBBbmRyb2lkIGJyb3dzZXJzIChKZWxseSBCZWFuKVxuICAgIHBhdGNoVmlhQ2FwdHVyaW5nQWxsVGhlRXZlbnRzKCk7XG4gICAgcGF0Y2hDbGFzcygnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICBpZiAoc3VwcG9ydHNXZWJTb2NrZXQpIHtcbiAgICAgIHdlYlNvY2tldFBhdGNoLmFwcGx5KF9nbG9iYWwpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYW5QYXRjaFZpYVByb3BlcnR5RGVzY3JpcHRvcigpIHtcbiAgaWYgKChpc0Jyb3dzZXIgfHwgaXNNaXgpICYmICFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEhUTUxFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snKSAmJlxuICAgICAgdHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gV2ViS2l0IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzQzNjRcbiAgICAvLyBJREwgaW50ZXJmYWNlIGF0dHJpYnV0ZXMgYXJlIG5vdCBjb25maWd1cmFibGVcbiAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snKTtcbiAgICBpZiAoZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHhockRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgJ29ucmVhZHlzdGF0ZWNoYW5nZScpO1xuXG4gIC8vIGFkZCBlbnVtZXJhYmxlIGFuZCBjb25maWd1cmFibGUgaGVyZSBiZWNhdXNlIGluIG9wZXJhXG4gIC8vIGJ5IGRlZmF1bHQgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9ucmVhZHlzdGF0ZWNoYW5nZSBpcyB1bmRlZmluZWRcbiAgLy8gd2l0aG91dCBhZGRpbmcgZW51bWVyYWJsZSBhbmQgY29uZmlndXJhYmxlIHdpbGwgY2F1c2Ugb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIG5vbi1jb25maWd1cmFibGVcbiAgLy8gYW5kIGlmIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vbnJlYWR5c3RhdGVjaGFuZ2UgaXMgdW5kZWZpbmVkLFxuICAvLyB3ZSBzaG91bGQgc2V0IGEgcmVhbCBkZXNjIGluc3RlYWQgYSBmYWtlIG9uZVxuICBpZiAoeGhyRGVzYykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgcmVzdWx0ID0gISFyZXEub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgZGVzY1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB4aHJEZXNjIHx8IHt9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2Uge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbem9uZVN5bWJvbCgnZmFrZW9ucmVhZHlzdGF0ZWNoYW5nZScpXTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXNbem9uZVN5bWJvbCgnZmFrZW9ucmVhZHlzdGF0ZWNoYW5nZScpXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IGRldGVjdEZ1bmMgPSAoKSA9PiB7fTtcbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZGV0ZWN0RnVuYztcbiAgICBjb25zdCByZXN1bHQgPSAocmVxIGFzIGFueSlbem9uZVN5bWJvbCgnZmFrZW9ucmVhZHlzdGF0ZWNoYW5nZScpXSA9PT0gZGV0ZWN0RnVuYztcbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5jb25zdCB1bmJvdW5kS2V5ID0gem9uZVN5bWJvbCgndW5ib3VuZCcpO1xuXG4vLyBXaGVuZXZlciBhbnkgZXZlbnRMaXN0ZW5lciBmaXJlcywgd2UgY2hlY2sgdGhlIGV2ZW50TGlzdGVuZXIgdGFyZ2V0IGFuZCBhbGwgcGFyZW50c1xuLy8gZm9yIGBvbndoYXRldmVyYCBwcm9wZXJ0aWVzIGFuZCByZXBsYWNlIHRoZW0gd2l0aCB6b25lLWJvdW5kIGZ1bmN0aW9uc1xuLy8gLSBDaHJvbWUgKGZvciBub3cpXG5mdW5jdGlvbiBwYXRjaFZpYUNhcHR1cmluZ0FsbFRoZUV2ZW50cygpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvcGVydHkgPSBldmVudE5hbWVzW2ldO1xuICAgIGNvbnN0IG9ucHJvcGVydHkgPSAnb24nICsgcHJvcGVydHk7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKHByb3BlcnR5LCBmdW5jdGlvbihldmVudCkge1xuICAgICAgbGV0IGVsdDogYW55ID0gPE5vZGU+ZXZlbnQudGFyZ2V0LCBib3VuZCwgc291cmNlO1xuICAgICAgaWYgKGVsdCkge1xuICAgICAgICBzb3VyY2UgPSBlbHQuY29uc3RydWN0b3JbJ25hbWUnXSArICcuJyArIG9ucHJvcGVydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzb3VyY2UgPSAndW5rbm93bi4nICsgb25wcm9wZXJ0eTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChlbHQpIHtcbiAgICAgICAgaWYgKGVsdFtvbnByb3BlcnR5XSAmJiAhZWx0W29ucHJvcGVydHldW3VuYm91bmRLZXldKSB7XG4gICAgICAgICAgYm91bmQgPSBab25lLmN1cnJlbnQud3JhcChlbHRbb25wcm9wZXJ0eV0sIHNvdXJjZSk7XG4gICAgICAgICAgYm91bmRbdW5ib3VuZEtleV0gPSBlbHRbb25wcm9wZXJ0eV07XG4gICAgICAgICAgZWx0W29ucHJvcGVydHldID0gYm91bmQ7XG4gICAgICAgIH1cbiAgICAgICAgZWx0ID0gZWx0LnBhcmVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==