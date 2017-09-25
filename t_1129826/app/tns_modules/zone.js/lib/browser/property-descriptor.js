"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
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
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
exports.eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    utils_1.patchOnProperties(target, filteredProperties, prototype);
}
exports.patchFilteredProperties = patchFilteredProperties;
function propertyDescriptorPatch(api, _global) {
    if (utils_1.isNode && !utils_1.isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global.__Zone_ignore_on_properties;
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (utils_1.isBrowser) {
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(window, exports.eventNames.concat(['messageerror']), ignoreProperties, Object.getPrototypeOf(window));
            patchFilteredProperties(Document.prototype, exports.eventNames, ignoreProperties);
            if (typeof window['SVGElement'] !== 'undefined') {
                patchFilteredProperties(window['SVGElement'].prototype, exports.eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, exports.eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, exports.eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = window['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        utils_1.patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            webSocketPatch.apply(api, _global);
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
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = utils_1.zoneSymbol('fakeonreadystatechange');
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
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
        var property = exports.eventNames[i];
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
    for (var i = 0; i < exports.eventNames.length; i++) {
        _loop_1(i);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5LWRlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUNIOzs7R0FHRzs7QUFFSCx5Q0FBb0c7QUFFcEcsNENBQThDO0FBRTlDLElBQU0sNkJBQTZCLEdBQUc7SUFDcEMsT0FBTztJQUNQLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixhQUFhO0lBQ2IsTUFBTTtJQUNOLFFBQVE7SUFDUixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFVBQVU7SUFDVixNQUFNO0lBQ04sU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLFNBQVM7SUFDVCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxTQUFTO0lBQ1QsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixPQUFPO0lBQ1AsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0lBQ1YsT0FBTztJQUNQLE1BQU07SUFDTixXQUFXO0lBQ1gsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0lBQ1osV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsU0FBUztJQUNULFlBQVk7SUFDWixPQUFPO0lBQ1AsTUFBTTtJQUNOLFNBQVM7SUFDVCxlQUFlO0lBQ2YsYUFBYTtJQUNiLGNBQWM7SUFDZCxjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQix3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QUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDcEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsQ0FBQztnQkFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQW5CRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGtCQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFBakMsQ0FBQztLQW1CVDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBzdXBwcmVzcyB7Z2xvYmFsVGhpc31cbiAqL1xuXG5pbXBvcnQge2lzQnJvd3NlciwgaXNNaXgsIGlzTm9kZSwgcGF0Y2hDbGFzcywgcGF0Y2hPblByb3BlcnRpZXMsIHpvbmVTeW1ib2x9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmltcG9ydCAqIGFzIHdlYlNvY2tldFBhdGNoIGZyb20gJy4vd2Vic29ja2V0JztcblxuY29uc3QgZ2xvYmFsRXZlbnRIYW5kbGVyc0V2ZW50TmFtZXMgPSBbXG4gICdhYm9ydCcsXG4gICdhbmltYXRpb25jYW5jZWwnLFxuICAnYW5pbWF0aW9uZW5kJyxcbiAgJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICdhdXhjbGljaycsXG4gICdiZWZvcmVpbnB1dCcsXG4gICdibHVyJyxcbiAgJ2NhbmNlbCcsXG4gICdjYW5wbGF5JyxcbiAgJ2NhbnBsYXl0aHJvdWdoJyxcbiAgJ2NoYW5nZScsXG4gICdjb21wb3NpdGlvbnN0YXJ0JyxcbiAgJ2NvbXBvc2l0aW9udXBkYXRlJyxcbiAgJ2NvbXBvc2l0aW9uZW5kJyxcbiAgJ2N1ZWNoYW5nZScsXG4gICdjbGljaycsXG4gICdjbG9zZScsXG4gICdjb250ZXh0bWVudScsXG4gICdjdXJlY2hhbmdlJyxcbiAgJ2RibGNsaWNrJyxcbiAgJ2RyYWcnLFxuICAnZHJhZ2VuZCcsXG4gICdkcmFnZW50ZXInLFxuICAnZHJhZ2V4aXQnLFxuICAnZHJhZ2xlYXZlJyxcbiAgJ2RyYWdvdmVyJyxcbiAgJ2Ryb3AnLFxuICAnZHVyYXRpb25jaGFuZ2UnLFxuICAnZW1wdGllZCcsXG4gICdlbmRlZCcsXG4gICdlcnJvcicsXG4gICdmb2N1cycsXG4gICdmb2N1c2luJyxcbiAgJ2ZvY3Vzb3V0JyxcbiAgJ2dvdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ2lucHV0JyxcbiAgJ2ludmFsaWQnLFxuICAna2V5ZG93bicsXG4gICdrZXlwcmVzcycsXG4gICdrZXl1cCcsXG4gICdsb2FkJyxcbiAgJ2xvYWRzdGFydCcsXG4gICdsb2FkZWRkYXRhJyxcbiAgJ2xvYWRlZG1ldGFkYXRhJyxcbiAgJ2xvc3Rwb2ludGVyY2FwdHVyZScsXG4gICdtb3VzZWRvd24nLFxuICAnbW91c2VlbnRlcicsXG4gICdtb3VzZWxlYXZlJyxcbiAgJ21vdXNlbW92ZScsXG4gICdtb3VzZW91dCcsXG4gICdtb3VzZW92ZXInLFxuICAnbW91c2V1cCcsXG4gICdtb3VzZXdoZWVsJyxcbiAgJ3BhdXNlJyxcbiAgJ3BsYXknLFxuICAncGxheWluZycsXG4gICdwb2ludGVyY2FuY2VsJyxcbiAgJ3BvaW50ZXJkb3duJyxcbiAgJ3BvaW50ZXJlbnRlcicsXG4gICdwb2ludGVybGVhdmUnLFxuICAncG9pbnRlcmxvY2tjaGFuZ2UnLFxuICAnbW96cG9pbnRlcmxvY2tjaGFuZ2UnLFxuICAnd2Via2l0cG9pbnRlcmxvY2tlcmNoYW5nZScsXG4gICdwb2ludGVybG9ja2Vycm9yJyxcbiAgJ21venBvaW50ZXJsb2NrZXJyb3InLFxuICAnd2Via2l0cG9pbnRlcmxvY2tlcnJvcicsXG4gICdwb2ludGVybW92ZScsXG4gICdwb2ludG91dCcsXG4gICdwb2ludGVyb3ZlcicsXG4gICdwb2ludGVydXAnLFxuICAncHJvZ3Jlc3MnLFxuICAncmF0ZWNoYW5nZScsXG4gICdyZXNldCcsXG4gICdyZXNpemUnLFxuICAnc2Nyb2xsJyxcbiAgJ3NlZWtlZCcsXG4gICdzZWVraW5nJyxcbiAgJ3NlbGVjdCcsXG4gICdzZWxlY3Rpb25jaGFuZ2UnLFxuICAnc2VsZWN0c3RhcnQnLFxuICAnc2hvdycsXG4gICdzb3J0JyxcbiAgJ3N0YWxsZWQnLFxuICAnc3VibWl0JyxcbiAgJ3N1c3BlbmQnLFxuICAndGltZXVwZGF0ZScsXG4gICd2b2x1bWVjaGFuZ2UnLFxuICAndG91Y2hjYW5jZWwnLFxuICAndG91Y2htb3ZlJyxcbiAgJ3RvdWNoc3RhcnQnLFxuICAndHJhbnNpdGlvbmNhbmNlbCcsXG4gICd0cmFuc2l0aW9uZW5kJyxcbiAgJ3dhaXRpbmcnLFxuICAnd2hlZWwnXG5dO1xuY29uc3QgZG9jdW1lbnRFdmVudE5hbWVzID0gW1xuICAnYWZ0ZXJzY3JpcHRleGVjdXRlJywgJ2JlZm9yZXNjcmlwdGV4ZWN1dGUnLCAnRE9NQ29udGVudExvYWRlZCcsICdmdWxsc2NyZWVuY2hhbmdlJyxcbiAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsICdtc2Z1bGxzY3JlZW5jaGFuZ2UnLCAnZnVsbHNjcmVlbmVycm9yJyxcbiAgJ21vemZ1bGxzY3JlZW5lcnJvcicsICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InLCAnbXNmdWxsc2NyZWVuZXJyb3InLCAncmVhZHlzdGF0ZWNoYW5nZSdcbl07XG5jb25zdCB3aW5kb3dFdmVudE5hbWVzID0gW1xuICAnYWJzb2x1dGVkZXZpY2VvcmllbnRhdGlvbicsXG4gICdhZnRlcmlucHV0JyxcbiAgJ2FmdGVycHJpbnQnLFxuICAnYXBwaW5zdGFsbGVkJyxcbiAgJ2JlZm9yZWluc3RhbGxwcm9tcHQnLFxuICAnYmVmb3JlcHJpbnQnLFxuICAnYmVmb3JldW5sb2FkJyxcbiAgJ2RldmljZWxpZ2h0JyxcbiAgJ2RldmljZW1vdGlvbicsXG4gICdkZXZpY2VvcmllbnRhdGlvbicsXG4gICdkZXZpY2VvcmllbnRhdGlvbmFic29sdXRlJyxcbiAgJ2RldmljZXByb3hpbWl0eScsXG4gICdoYXNoY2hhbmdlJyxcbiAgJ2xhbmd1YWdlY2hhbmdlJyxcbiAgJ21lc3NhZ2UnLFxuICAnbW96YmVmb3JlcGFpbnQnLFxuICAnb2ZmbGluZScsXG4gICdvbmxpbmUnLFxuICAncGFpbnQnLFxuICAncGFnZXNob3cnLFxuICAncGFnZWhpZGUnLFxuICAncG9wc3RhdGUnLFxuICAncmVqZWN0aW9uaGFuZGxlZCcsXG4gICdzdG9yYWdlJyxcbiAgJ3VuaGFuZGxlZHJlamVjdGlvbicsXG4gICd1bmxvYWQnLFxuICAndXNlcnByb3hpbWl0eScsXG4gICd2cmRpc3BseWNvbm5lY3RlZCcsXG4gICd2cmRpc3BsYXlkaXNjb25uZWN0ZWQnLFxuICAndnJkaXNwbGF5cHJlc2VudGNoYW5nZSdcbl07XG5jb25zdCBodG1sRWxlbWVudEV2ZW50TmFtZXMgPSBbXG4gICdiZWZvcmVjb3B5JywgJ2JlZm9yZWN1dCcsICdiZWZvcmVwYXN0ZScsICdjb3B5JywgJ2N1dCcsICdwYXN0ZScsICdkcmFnc3RhcnQnLCAnbG9hZGVuZCcsXG4gICdhbmltYXRpb25zdGFydCcsICdzZWFyY2gnLCAndHJhbnNpdGlvbnJ1bicsICd0cmFuc2l0aW9uc3RhcnQnLCAnd2Via2l0YW5pbWF0aW9uZW5kJyxcbiAgJ3dlYmtpdGFuaW1hdGlvbml0ZXJhdGlvbicsICd3ZWJraXRhbmltYXRpb25zdGFydCcsICd3ZWJraXR0cmFuc2l0aW9uZW5kJ1xuXTtcbmNvbnN0IG1lZGlhRWxlbWVudEV2ZW50TmFtZXMgPVxuICAgIFsnZW5jcnlwdGVkJywgJ3dhaXRpbmdmb3JrZXknLCAnbXNuZWVka2V5JywgJ21vemludGVycnVwdGJlZ2luJywgJ21vemludGVycnVwdGVuZCddO1xuY29uc3QgaWVFbGVtZW50RXZlbnROYW1lcyA9IFtcbiAgJ2FjdGl2YXRlJyxcbiAgJ2FmdGVydXBkYXRlJyxcbiAgJ2FyaWFyZXF1ZXN0JyxcbiAgJ2JlZm9yZWFjdGl2YXRlJyxcbiAgJ2JlZm9yZWRlYWN0aXZhdGUnLFxuICAnYmVmb3JlZWRpdGZvY3VzJyxcbiAgJ2JlZm9yZXVwZGF0ZScsXG4gICdjZWxsY2hhbmdlJyxcbiAgJ2NvbnRyb2xzZWxlY3QnLFxuICAnZGF0YWF2YWlsYWJsZScsXG4gICdkYXRhc2V0Y2hhbmdlZCcsXG4gICdkYXRhc2V0Y29tcGxldGUnLFxuICAnZXJyb3J1cGRhdGUnLFxuICAnZmlsdGVyY2hhbmdlJyxcbiAgJ2xheW91dGNvbXBsZXRlJyxcbiAgJ2xvc2VjYXB0dXJlJyxcbiAgJ21vdmUnLFxuICAnbW92ZWVuZCcsXG4gICdtb3Zlc3RhcnQnLFxuICAncHJvcGVydHljaGFuZ2UnLFxuICAncmVzaXplZW5kJyxcbiAgJ3Jlc2l6ZXN0YXJ0JyxcbiAgJ3Jvd2VudGVyJyxcbiAgJ3Jvd2V4aXQnLFxuICAncm93c2RlbGV0ZScsXG4gICdyb3dzaW5zZXJ0ZWQnLFxuICAnY29tbWFuZCcsXG4gICdjb21wYXNzbmVlZHNjYWxpYnJhdGlvbicsXG4gICdkZWFjdGl2YXRlJyxcbiAgJ2hlbHAnLFxuICAnbXNjb250ZW50em9vbScsXG4gICdtc21hbmlwdWxhdGlvbnN0YXRlY2hhbmdlZCcsXG4gICdtc2dlc3R1cmVjaGFuZ2UnLFxuICAnbXNnZXN0dXJlZG91YmxldGFwJyxcbiAgJ21zZ2VzdHVyZWVuZCcsXG4gICdtc2dlc3R1cmVob2xkJyxcbiAgJ21zZ2VzdHVyZXN0YXJ0JyxcbiAgJ21zZ2VzdHVyZXRhcCcsXG4gICdtc2dvdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ21zaW5lcnRpYXN0YXJ0JyxcbiAgJ21zbG9zdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ21zcG9pbnRlcmNhbmNlbCcsXG4gICdtc3BvaW50ZXJkb3duJyxcbiAgJ21zcG9pbnRlcmVudGVyJyxcbiAgJ21zcG9pbnRlcmhvdmVyJyxcbiAgJ21zcG9pbnRlcmxlYXZlJyxcbiAgJ21zcG9pbnRlcm1vdmUnLFxuICAnbXNwb2ludGVyb3V0JyxcbiAgJ21zcG9pbnRlcm92ZXInLFxuICAnbXNwb2ludGVydXAnLFxuICAncG9pbnRlcm91dCcsXG4gICdtc3NpdGVtb2RlanVtcGxpc3RpdGVtcmVtb3ZlZCcsXG4gICdtc3RodW1ibmFpbGNsaWNrJyxcbiAgJ3N0b3AnLFxuICAnc3RvcmFnZWNvbW1pdCdcbl07XG5jb25zdCB3ZWJnbEV2ZW50TmFtZXMgPSBbJ3dlYmdsY29udGV4dHJlc3RvcmVkJywgJ3dlYmdsY29udGV4dGxvc3QnLCAnd2ViZ2xjb250ZXh0Y3JlYXRpb25lcnJvciddO1xuY29uc3QgZm9ybUV2ZW50TmFtZXMgPSBbJ2F1dG9jb21wbGV0ZScsICdhdXRvY29tcGxldGVlcnJvciddO1xuY29uc3QgZGV0YWlsRXZlbnROYW1lcyA9IFsndG9nZ2xlJ107XG5jb25zdCBmcmFtZUV2ZW50TmFtZXMgPSBbJ2xvYWQnXTtcbmNvbnN0IGZyYW1lU2V0RXZlbnROYW1lcyA9IFsnYmx1cicsICdlcnJvcicsICdmb2N1cycsICdsb2FkJywgJ3Jlc2l6ZScsICdzY3JvbGwnLCAnbWVzc2FnZWVycm9yJ107XG5jb25zdCBtYXJxdWVlRXZlbnROYW1lcyA9IFsnYm91bmNlJywgJ2ZpbmlzaCcsICdzdGFydCddO1xuXG5jb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50TmFtZXMgPSBbXG4gICdsb2Fkc3RhcnQnLCAncHJvZ3Jlc3MnLCAnYWJvcnQnLCAnZXJyb3InLCAnbG9hZCcsICdwcm9ncmVzcycsICd0aW1lb3V0JywgJ2xvYWRlbmQnLFxuICAncmVhZHlzdGF0ZWNoYW5nZSdcbl07XG5jb25zdCBJREJJbmRleEV2ZW50TmFtZXMgPVxuICAgIFsndXBncmFkZW5lZWRlZCcsICdjb21wbGV0ZScsICdhYm9ydCcsICdzdWNjZXNzJywgJ2Vycm9yJywgJ2Jsb2NrZWQnLCAndmVyc2lvbmNoYW5nZScsICdjbG9zZSddO1xuY29uc3Qgd2Vic29ja2V0RXZlbnROYW1lcyA9IFsnY2xvc2UnLCAnZXJyb3InLCAnb3BlbicsICdtZXNzYWdlJ107XG5cbmV4cG9ydCBjb25zdCBldmVudE5hbWVzID0gZ2xvYmFsRXZlbnRIYW5kbGVyc0V2ZW50TmFtZXMuY29uY2F0KFxuICAgIHdlYmdsRXZlbnROYW1lcywgZm9ybUV2ZW50TmFtZXMsIGRldGFpbEV2ZW50TmFtZXMsIGRvY3VtZW50RXZlbnROYW1lcywgd2luZG93RXZlbnROYW1lcyxcbiAgICBodG1sRWxlbWVudEV2ZW50TmFtZXMsIGllRWxlbWVudEV2ZW50TmFtZXMpO1xuXG5leHBvcnQgaW50ZXJmYWNlIElnbm9yZVByb3BlcnR5IHtcbiAgdGFyZ2V0OiBhbnk7XG4gIGlnbm9yZVByb3BlcnRpZXM6IHN0cmluZ1tdO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJQcm9wZXJ0aWVzKFxuICAgIHRhcmdldDogYW55LCBvblByb3BlcnRpZXM6IHN0cmluZ1tdLCBpZ25vcmVQcm9wZXJ0aWVzOiBJZ25vcmVQcm9wZXJ0eVtdKTogc3RyaW5nW10ge1xuICBpZiAoIWlnbm9yZVByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gb25Qcm9wZXJ0aWVzO1xuICB9XG5cbiAgY29uc3QgdGlwOiBJZ25vcmVQcm9wZXJ0eVtdID0gaWdub3JlUHJvcGVydGllcy5maWx0ZXIoaXAgPT4gaXAudGFyZ2V0ID09PSB0YXJnZXQpO1xuICBpZiAoIXRpcCB8fCB0aXAubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9uUHJvcGVydGllcztcbiAgfVxuXG4gIGNvbnN0IHRhcmdldElnbm9yZVByb3BlcnRpZXM6IHN0cmluZ1tdID0gdGlwWzBdLmlnbm9yZVByb3BlcnRpZXM7XG4gIHJldHVybiBvblByb3BlcnRpZXMuZmlsdGVyKG9wID0+IHRhcmdldElnbm9yZVByb3BlcnRpZXMuaW5kZXhPZihvcCkgPT09IC0xKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFxuICAgIHRhcmdldDogYW55LCBvblByb3BlcnRpZXM6IHN0cmluZ1tdLCBpZ25vcmVQcm9wZXJ0aWVzOiBJZ25vcmVQcm9wZXJ0eVtdLCBwcm90b3R5cGU/OiBhbnkpIHtcbiAgY29uc3QgZmlsdGVyZWRQcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IGZpbHRlclByb3BlcnRpZXModGFyZ2V0LCBvblByb3BlcnRpZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICBwYXRjaE9uUHJvcGVydGllcyh0YXJnZXQsIGZpbHRlcmVkUHJvcGVydGllcywgcHJvdG90eXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5RGVzY3JpcHRvclBhdGNoKGFwaTogX1pvbmVQcml2YXRlLCBfZ2xvYmFsOiBhbnkpIHtcbiAgaWYgKGlzTm9kZSAmJiAhaXNNaXgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c1dlYlNvY2tldCA9IHR5cGVvZiBXZWJTb2NrZXQgIT09ICd1bmRlZmluZWQnO1xuICBpZiAoY2FuUGF0Y2hWaWFQcm9wZXJ0eURlc2NyaXB0b3IoKSkge1xuICAgIGNvbnN0IGlnbm9yZVByb3BlcnRpZXM6IElnbm9yZVByb3BlcnR5W10gPSBfZ2xvYmFsLl9fWm9uZV9pZ25vcmVfb25fcHJvcGVydGllcztcbiAgICAvLyBmb3IgYnJvd3NlcnMgdGhhdCB3ZSBjYW4gcGF0Y2ggdGhlIGRlc2NyaXB0b3I6ICBDaHJvbWUgJiBGaXJlZm94XG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgLy8gaW4gSUUvRWRnZSwgb25Qcm9wIG5vdCBleGlzdCBpbiB3aW5kb3cgb2JqZWN0LCBidXQgaW4gV2luZG93UHJvdG90eXBlXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIHBhc3MgV2luZG93UHJvdG90eXBlIHRvIGNoZWNrIG9uUHJvcCBleGlzdCBvciBub3RcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgIHdpbmRvdywgZXZlbnROYW1lcy5jb25jYXQoWydtZXNzYWdlZXJyb3InXSksIGlnbm9yZVByb3BlcnRpZXMsXG4gICAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdykpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoRG9jdW1lbnQucHJvdG90eXBlLCBldmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcblxuICAgICAgaWYgKHR5cGVvZig8YW55PndpbmRvdylbJ1NWR0VsZW1lbnQnXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoXG4gICAgICAgICAgICAoPGFueT53aW5kb3cpWydTVkdFbGVtZW50J10ucHJvdG90eXBlLCBldmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIH1cbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKEVsZW1lbnQucHJvdG90eXBlLCBldmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKEhUTUxFbGVtZW50LnByb3RvdHlwZSwgZXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhIVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgbWVkaWFFbGVtZW50RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhcbiAgICAgICAgICBIVE1MRnJhbWVTZXRFbGVtZW50LnByb3RvdHlwZSwgd2luZG93RXZlbnROYW1lcy5jb25jYXQoZnJhbWVTZXRFdmVudE5hbWVzKSxcbiAgICAgICAgICBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgIEhUTUxCb2R5RWxlbWVudC5wcm90b3R5cGUsIHdpbmRvd0V2ZW50TmFtZXMuY29uY2F0KGZyYW1lU2V0RXZlbnROYW1lcyksIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSFRNTEZyYW1lRWxlbWVudC5wcm90b3R5cGUsIGZyYW1lRXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhIVE1MSUZyYW1lRWxlbWVudC5wcm90b3R5cGUsIGZyYW1lRXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG5cbiAgICAgIGNvbnN0IEhUTUxNYXJxdWVlRWxlbWVudCA9ICh3aW5kb3cgYXMgYW55KVsnSFRNTE1hcnF1ZWVFbGVtZW50J107XG4gICAgICBpZiAoSFRNTE1hcnF1ZWVFbGVtZW50KSB7XG4gICAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKEhUTUxNYXJxdWVlRWxlbWVudC5wcm90b3R5cGUsIG1hcnF1ZWVFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCBYTUxIdHRwUmVxdWVzdEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgIGNvbnN0IFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQgPSBfZ2xvYmFsWydYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0J107XG4gICAgaWYgKFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQpIHtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgIFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQgJiYgWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldC5wcm90b3R5cGUsXG4gICAgICAgICAgWE1MSHR0cFJlcXVlc3RFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBJREJJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKElEQkluZGV4LnByb3RvdHlwZSwgSURCSW5kZXhFdmVudE5hbWVzLCBpZ25vcmVQcm9wZXJ0aWVzKTtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKElEQlJlcXVlc3QucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgICAgcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXMoSURCT3BlbkRCUmVxdWVzdC5wcm90b3R5cGUsIElEQkluZGV4RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhJREJEYXRhYmFzZS5wcm90b3R5cGUsIElEQkluZGV4RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUsIElEQkluZGV4RXZlbnROYW1lcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgICBwYXRjaEZpbHRlcmVkUHJvcGVydGllcyhJREJDdXJzb3IucHJvdG90eXBlLCBJREJJbmRleEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgIH1cbiAgICBpZiAoc3VwcG9ydHNXZWJTb2NrZXQpIHtcbiAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKFdlYlNvY2tldC5wcm90b3R5cGUsIHdlYnNvY2tldEV2ZW50TmFtZXMsIGlnbm9yZVByb3BlcnRpZXMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBTYWZhcmksIEFuZHJvaWQgYnJvd3NlcnMgKEplbGx5IEJlYW4pXG4gICAgcGF0Y2hWaWFDYXB0dXJpbmdBbGxUaGVFdmVudHMoKTtcbiAgICBwYXRjaENsYXNzKCdYTUxIdHRwUmVxdWVzdCcpO1xuICAgIGlmIChzdXBwb3J0c1dlYlNvY2tldCkge1xuICAgICAgd2ViU29ja2V0UGF0Y2guYXBwbHkoYXBpLCBfZ2xvYmFsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FuUGF0Y2hWaWFQcm9wZXJ0eURlc2NyaXB0b3IoKSB7XG4gIGlmICgoaXNCcm93c2VyIHx8IGlzTWl4KSAmJiAhT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihIVE1MRWxlbWVudC5wcm90b3R5cGUsICdvbmNsaWNrJykgJiZcbiAgICAgIHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIFdlYktpdCBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM0MzY0XG4gICAgLy8gSURMIGludGVyZmFjZSBhdHRyaWJ1dGVzIGFyZSBub3QgY29uZmlndXJhYmxlXG4gICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudC5wcm90b3R5cGUsICdvbmNsaWNrJyk7XG4gICAgaWYgKGRlc2MgJiYgIWRlc2MuY29uZmlndXJhYmxlKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB4aHJEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnKTtcblxuICAvLyBhZGQgZW51bWVyYWJsZSBhbmQgY29uZmlndXJhYmxlIGhlcmUgYmVjYXVzZSBpbiBvcGVyYVxuICAvLyBieSBkZWZhdWx0IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vbnJlYWR5c3RhdGVjaGFuZ2UgaXMgdW5kZWZpbmVkXG4gIC8vIHdpdGhvdXQgYWRkaW5nIGVudW1lcmFibGUgYW5kIGNvbmZpZ3VyYWJsZSB3aWxsIGNhdXNlIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyBub24tY29uZmlndXJhYmxlXG4gIC8vIGFuZCBpZiBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub25yZWFkeXN0YXRlY2hhbmdlIGlzIHVuZGVmaW5lZCxcbiAgLy8gd2Ugc2hvdWxkIHNldCBhIHJlYWwgZGVzYyBpbnN0ZWFkIGEgZmFrZSBvbmVcbiAgaWYgKHhockRlc2MpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCAnb25yZWFkeXN0YXRlY2hhbmdlJywge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9ICEhcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZTtcbiAgICAvLyByZXN0b3JlIG9yaWdpbmFsIGRlc2NcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCAnb25yZWFkeXN0YXRlY2hhbmdlJywgeGhyRGVzYyB8fCB7fSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBTWU1CT0xfRkFLRV9PTlJFQURZU1RBVEVDSEFOR0UgPSB6b25lU3ltYm9sKCdmYWtlb25yZWFkeXN0YXRlY2hhbmdlJyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgJ29ucmVhZHlzdGF0ZWNoYW5nZScsIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tTWU1CT0xfRkFLRV9PTlJFQURZU1RBVEVDSEFOR0VdO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdGhpc1tTWU1CT0xfRkFLRV9PTlJFQURZU1RBVEVDSEFOR0VdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgZGV0ZWN0RnVuYyA9ICgpID0+IHt9O1xuICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBkZXRlY3RGdW5jO1xuICAgIGNvbnN0IHJlc3VsdCA9IChyZXEgYXMgYW55KVtTWU1CT0xfRkFLRV9PTlJFQURZU1RBVEVDSEFOR0VdID09PSBkZXRlY3RGdW5jO1xuICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmNvbnN0IHVuYm91bmRLZXkgPSB6b25lU3ltYm9sKCd1bmJvdW5kJyk7XG5cbi8vIFdoZW5ldmVyIGFueSBldmVudExpc3RlbmVyIGZpcmVzLCB3ZSBjaGVjayB0aGUgZXZlbnRMaXN0ZW5lciB0YXJnZXQgYW5kIGFsbCBwYXJlbnRzXG4vLyBmb3IgYG9ud2hhdGV2ZXJgIHByb3BlcnRpZXMgYW5kIHJlcGxhY2UgdGhlbSB3aXRoIHpvbmUtYm91bmQgZnVuY3Rpb25zXG4vLyAtIENocm9tZSAoZm9yIG5vdylcbmZ1bmN0aW9uIHBhdGNoVmlhQ2FwdHVyaW5nQWxsVGhlRXZlbnRzKCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm9wZXJ0eSA9IGV2ZW50TmFtZXNbaV07XG4gICAgY29uc3Qgb25wcm9wZXJ0eSA9ICdvbicgKyBwcm9wZXJ0eTtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIocHJvcGVydHksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBsZXQgZWx0OiBhbnkgPSA8Tm9kZT5ldmVudC50YXJnZXQsIGJvdW5kLCBzb3VyY2U7XG4gICAgICBpZiAoZWx0KSB7XG4gICAgICAgIHNvdXJjZSA9IGVsdC5jb25zdHJ1Y3RvclsnbmFtZSddICsgJy4nICsgb25wcm9wZXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvdXJjZSA9ICd1bmtub3duLicgKyBvbnByb3BlcnR5O1xuICAgICAgfVxuICAgICAgd2hpbGUgKGVsdCkge1xuICAgICAgICBpZiAoZWx0W29ucHJvcGVydHldICYmICFlbHRbb25wcm9wZXJ0eV1bdW5ib3VuZEtleV0pIHtcbiAgICAgICAgICBib3VuZCA9IFpvbmUuY3VycmVudC53cmFwKGVsdFtvbnByb3BlcnR5XSwgc291cmNlKTtcbiAgICAgICAgICBib3VuZFt1bmJvdW5kS2V5XSA9IGVsdFtvbnByb3BlcnR5XTtcbiAgICAgICAgICBlbHRbb25wcm9wZXJ0eV0gPSBib3VuZDtcbiAgICAgICAgfVxuICAgICAgICBlbHQgPSBlbHQucGFyZW50RWxlbWVudDtcbiAgICAgIH1cbiAgICB9LCB0cnVlKTtcbiAgfVxufVxuIl19