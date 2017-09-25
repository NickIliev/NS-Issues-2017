"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var tryCatch_1 = require("../util/tryCatch");
var isFunction_1 = require("../util/isFunction");
var errorObject_1 = require("../util/errorObject");
var Subscription_1 = require("../Subscription");
var toString = Object.prototype.toString;
function isNodeStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        var _this = _super.call(this) || this;
        _this.sourceObj = sourceObj;
        _this.eventName = eventName;
        _this.selector = selector;
        _this.options = options;
        return _this;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console everytime a click
     * // occurs on the document.
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJvbUV2ZW50T2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZyb21FdmVudE9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBMkM7QUFDM0MsNkNBQTRDO0FBQzVDLGlEQUFnRDtBQUNoRCxtREFBa0Q7QUFDbEQsZ0RBQStDO0FBRy9DLElBQU0sUUFBUSxHQUFhLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBTXJELGlDQUFpQyxTQUFjO0lBQzdDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sU0FBUyxDQUFDLFdBQVcsS0FBSyxVQUFVLElBQUksT0FBTyxTQUFTLENBQUMsY0FBYyxLQUFLLFVBQVUsQ0FBQztBQUN0SCxDQUFDO0FBTUQsbUNBQW1DLFNBQWM7SUFDL0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsRUFBRSxLQUFLLFVBQVUsSUFBSSxPQUFPLFNBQVMsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDO0FBQ2xHLENBQUM7QUFFRCxvQkFBb0IsU0FBYztJQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLG1CQUFtQixDQUFDO0FBQ3pFLENBQUM7QUFFRCwwQkFBMEIsU0FBYztJQUN0QyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLHlCQUF5QixDQUFDO0FBQy9FLENBQUM7QUFFRCx1QkFBdUIsU0FBYztJQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLElBQUksT0FBTyxTQUFTLENBQUMsbUJBQW1CLEtBQUssVUFBVSxDQUFDO0FBQ2hJLENBQUM7QUFZRDs7OztHQUlHO0FBQ0g7SUFBNEMsdUNBQWE7SUE0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WSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVTLHdDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxPQUFPLEdBQUcsUUFBUSxHQUFHO1lBQUMsY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO2dCQUFkLHlCQUFjOztZQUN0QyxJQUFJLE1BQU0sR0FBRyxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFJLElBQUksQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyx5QkFBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsVUFBVSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDSCxDQUFDLEdBQUcsVUFBQyxDQUFNLElBQUssT0FBQSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFsQixDQUFrQixDQUFDO1FBRW5DLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBaEhELENBQTRDLHVCQUFVLEdBZ0hyRDtBQWhIWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcblxuY29uc3QgdG9TdHJpbmc6IEZ1bmN0aW9uID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZXhwb3J0IHR5cGUgTm9kZVN0eWxlRXZlbnRFbWl0dGVyID0ge1xuICBhZGRMaXN0ZW5lcjogKGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbikgPT4gdm9pZDtcbiAgcmVtb3ZlTGlzdGVuZXI6IChldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pID0+IHZvaWQ7XG59O1xuZnVuY3Rpb24gaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqOiBhbnkpOiBzb3VyY2VPYmogaXMgTm9kZVN0eWxlRXZlbnRFbWl0dGVyIHtcbiAgcmV0dXJuICEhc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IHR5cGUgSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIgPSB7XG4gIG9uOiAoZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuICBvZmY6IChldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pID0+IHZvaWQ7XG59O1xuZnVuY3Rpb24gaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmo6IGFueSk6IHNvdXJjZU9iaiBpcyBKUXVlcnlTdHlsZUV2ZW50RW1pdHRlciB7XG4gIHJldHVybiAhIXNvdXJjZU9iaiAmJiB0eXBlb2Ygc291cmNlT2JqLm9uID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoub2ZmID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc05vZGVMaXN0KHNvdXJjZU9iajogYW55KTogc291cmNlT2JqIGlzIE5vZGVMaXN0IHtcbiAgcmV0dXJuICEhc291cmNlT2JqICYmIHRvU3RyaW5nLmNhbGwoc291cmNlT2JqKSA9PT0gJ1tvYmplY3QgTm9kZUxpc3RdJztcbn1cblxuZnVuY3Rpb24gaXNIVE1MQ29sbGVjdGlvbihzb3VyY2VPYmo6IGFueSk6IHNvdXJjZU9iaiBpcyBIVE1MQ29sbGVjdGlvbiB7XG4gIHJldHVybiAhIXNvdXJjZU9iaiAmJiB0b1N0cmluZy5jYWxsKHNvdXJjZU9iaikgPT09ICdbb2JqZWN0IEhUTUxDb2xsZWN0aW9uXSc7XG59XG5cbmZ1bmN0aW9uIGlzRXZlbnRUYXJnZXQoc291cmNlT2JqOiBhbnkpOiBzb3VyY2VPYmogaXMgRXZlbnRUYXJnZXQge1xuICByZXR1cm4gISFzb3VyY2VPYmogJiYgdHlwZW9mIHNvdXJjZU9iai5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRUYXJnZXRMaWtlID0gRXZlbnRUYXJnZXQgfCBOb2RlU3R5bGVFdmVudEVtaXR0ZXIgfCBKUXVlcnlTdHlsZUV2ZW50RW1pdHRlciB8IE5vZGVMaXN0IHwgSFRNTENvbGxlY3Rpb247XG5cbmV4cG9ydCB0eXBlIEV2ZW50TGlzdGVuZXJPcHRpb25zID0ge1xuICBjYXB0dXJlPzogYm9vbGVhbjtcbiAgcGFzc2l2ZT86IGJvb2xlYW47XG4gIG9uY2U/OiBib29sZWFuO1xufSB8IGJvb2xlYW47XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yTWV0aG9kU2lnbmF0dXJlPFQ+ID0gKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IFQ7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgRnJvbUV2ZW50T2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIC8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KHRhcmdldDogRXZlbnRUYXJnZXRMaWtlLCBldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8VD47XG4gIHN0YXRpYyBjcmVhdGU8VD4odGFyZ2V0OiBFdmVudFRhcmdldExpa2UsIGV2ZW50TmFtZTogc3RyaW5nLCBzZWxlY3RvcjogU2VsZWN0b3JNZXRob2RTaWduYXR1cmU8VD4pOiBPYnNlcnZhYmxlPFQ+O1xuICBzdGF0aWMgY3JlYXRlPFQ+KHRhcmdldDogRXZlbnRUYXJnZXRMaWtlLCBldmVudE5hbWU6IHN0cmluZywgb3B0aW9uczogRXZlbnRMaXN0ZW5lck9wdGlvbnMpOiBPYnNlcnZhYmxlPFQ+O1xuICBzdGF0aWMgY3JlYXRlPFQ+KHRhcmdldDogRXZlbnRUYXJnZXRMaWtlLCBldmVudE5hbWU6IHN0cmluZywgb3B0aW9uczogRXZlbnRMaXN0ZW5lck9wdGlvbnMsIHNlbGVjdG9yOiBTZWxlY3Rvck1ldGhvZFNpZ25hdHVyZTxUPik6IE9ic2VydmFibGU8VD47XG4gIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGV2ZW50cyBvZiBhIHNwZWNpZmljIHR5cGUgY29taW5nIGZyb20gdGhlXG4gICAqIGdpdmVuIGV2ZW50IHRhcmdldC5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNyZWF0ZXMgYW4gT2JzZXJ2YWJsZSBmcm9tIERPTSBldmVudHMsIG9yIE5vZGVcbiAgICogRXZlbnRFbWl0dGVyIGV2ZW50cyBvciBvdGhlcnMuPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL2Zyb21FdmVudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGJ5IGF0dGFjaGluZyBhbiBldmVudCBsaXN0ZW5lciB0byBhbiBcImV2ZW50IHRhcmdldFwiLFxuICAgKiB3aGljaCBtYXkgYmUgYW4gb2JqZWN0IHdpdGggYGFkZEV2ZW50TGlzdGVuZXJgIGFuZCBgcmVtb3ZlRXZlbnRMaXN0ZW5lcmAsXG4gICAqIGEgTm9kZS5qcyBFdmVudEVtaXR0ZXIsIGEgalF1ZXJ5IHN0eWxlIEV2ZW50RW1pdHRlciwgYSBOb2RlTGlzdCBmcm9tIHRoZVxuICAgKiBET00sIG9yIGFuIEhUTUxDb2xsZWN0aW9uIGZyb20gdGhlIERPTS4gVGhlIGV2ZW50IGhhbmRsZXIgaXMgYXR0YWNoZWQgd2hlblxuICAgKiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZCwgYW5kIHJlbW92ZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIGlzXG4gICAqIHVuc3Vic2NyaWJlZC5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgY2xpY2tzIGhhcHBlbmluZyBvbiB0aGUgRE9NIGRvY3VtZW50PC9jYXB0aW9uPlxuICAgKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICAgKiBjbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiAvLyBSZXN1bHRzIGluOlxuICAgKiAvLyBNb3VzZUV2ZW50IG9iamVjdCBsb2dnZWQgdG8gY29uc29sZSBldmVyeXRpbWUgYSBjbGlja1xuICAgKiAvLyBvY2N1cnMgb24gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgKiBAc2VlIHtAbGluayBmcm9tRXZlbnRQYXR0ZXJufVxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0TGlrZX0gdGFyZ2V0IFRoZSBET01FbGVtZW50LCBldmVudCB0YXJnZXQsIE5vZGUuanNcbiAgICogRXZlbnRFbWl0dGVyLCBOb2RlTGlzdCBvciBIVE1MQ29sbGVjdGlvbiB0byBhdHRhY2ggdGhlIGV2ZW50IGhhbmRsZXIgdG8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgb2YgaW50ZXJlc3QsIGJlaW5nIGVtaXR0ZWQgYnkgdGhlXG4gICAqIGB0YXJnZXRgLlxuICAgKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJPcHRpb25zfSBbb3B0aW9uc10gT3B0aW9ucyB0byBwYXNzIHRocm91Z2ggdG8gYWRkRXZlbnRMaXN0ZW5lclxuICAgKiBAcGFyYW0ge1NlbGVjdG9yTWV0aG9kU2lnbmF0dXJlPFQ+fSBbc2VsZWN0b3JdIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gICAqIHBvc3QtcHJvY2VzcyByZXN1bHRzLiBJdCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlIGV2ZW50IGhhbmRsZXIgYW5kXG4gICAqIHNob3VsZCByZXR1cm4gYSBzaW5nbGUgdmFsdWUuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBmcm9tRXZlbnRcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4odGFyZ2V0OiBFdmVudFRhcmdldExpa2UsXG4gICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgb3B0aW9ucz86IEV2ZW50TGlzdGVuZXJPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yPzogU2VsZWN0b3JNZXRob2RTaWduYXR1cmU8VD4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgc2VsZWN0b3IgPSA8YW55Pm9wdGlvbnM7XG4gICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEZyb21FdmVudE9ic2VydmFibGUodGFyZ2V0LCBldmVudE5hbWUsIHNlbGVjdG9yLCBvcHRpb25zKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc291cmNlT2JqOiBFdmVudFRhcmdldExpa2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VsZWN0b3I/OiBTZWxlY3Rvck1ldGhvZFNpZ25hdHVyZTxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBvcHRpb25zPzogRXZlbnRMaXN0ZW5lck9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBTdWJzY3JpcHRpb248VD4oc291cmNlT2JqOiBFdmVudFRhcmdldExpa2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz86IEV2ZW50TGlzdGVuZXJPcHRpb25zKSB7XG4gICAgbGV0IHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkO1xuICAgIGlmIChpc05vZGVMaXN0KHNvdXJjZU9iaikgfHwgaXNIVE1MQ29sbGVjdGlvbihzb3VyY2VPYmopKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc291cmNlT2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIEZyb21FdmVudE9ic2VydmFibGUuc2V0dXBTdWJzY3JpcHRpb24oc291cmNlT2JqW2ldLCBldmVudE5hbWUsIGhhbmRsZXIsIHN1YnNjcmliZXIsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFdmVudFRhcmdldChzb3VyY2VPYmopKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VPYmo7XG4gICAgICBzb3VyY2VPYmouYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIDxFdmVudExpc3RlbmVyPmhhbmRsZXIsIDxib29sZWFuPm9wdGlvbnMpO1xuICAgICAgdW5zdWJzY3JpYmUgPSAoKSA9PiBzb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIDxFdmVudExpc3RlbmVyPmhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAoaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmopKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VPYmo7XG4gICAgICBzb3VyY2VPYmoub24oZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIHVuc3Vic2NyaWJlID0gKCkgPT4gc291cmNlLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAoaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSkge1xuICAgICAgY29uc3Qgc291cmNlID0gc291cmNlT2JqO1xuICAgICAgc291cmNlT2JqLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB1bnN1YnNjcmliZSA9ICgpID0+IHNvdXJjZS5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHRhcmdldCcpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZXIuYWRkKG5ldyBTdWJzY3JpcHRpb24odW5zdWJzY3JpYmUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pIHtcbiAgICBjb25zdCBzb3VyY2VPYmogPSB0aGlzLnNvdXJjZU9iajtcbiAgICBjb25zdCBldmVudE5hbWUgPSB0aGlzLmV2ZW50TmFtZTtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICBsZXQgaGFuZGxlciA9IHNlbGVjdG9yID8gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gdHJ5Q2F0Y2goc2VsZWN0b3IpKC4uLmFyZ3MpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQpO1xuICAgICAgfVxuICAgIH0gOiAoZTogYW55KSA9PiBzdWJzY3JpYmVyLm5leHQoZSk7XG5cbiAgICBGcm9tRXZlbnRPYnNlcnZhYmxlLnNldHVwU3Vic2NyaXB0aW9uKHNvdXJjZU9iaiwgZXZlbnROYW1lLCBoYW5kbGVyLCBzdWJzY3JpYmVyLCBvcHRpb25zKTtcbiAgfVxufVxuIl19