"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = require("../util/isFunction");
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventPatternObservable = (function (_super) {
    __extends(FromEventPatternObservable, _super);
    function FromEventPatternObservable(addHandler, removeHandler, selector) {
        var _this = _super.call(this) || this;
        _this.addHandler = addHandler;
        _this.removeHandler = removeHandler;
        _this.selector = selector;
        return _this;
    }
    /**
     * Creates an Observable from an API based on addHandler/removeHandler
     * functions.
     *
     * <span class="informal">Converts any addHandler/removeHandler API to an
     * Observable.</span>
     *
     * <img src="./img/fromEventPattern.png" width="100%">
     *
     * Creates an Observable by using the `addHandler` and `removeHandler`
     * functions to add and remove the handlers, with an optional selector
     * function to project the event arguments to a result. The `addHandler` is
     * called when the output Observable is subscribed, and `removeHandler` is
     * called when the Subscription is unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * function addClickHandler(handler) {
     *   document.addEventListener('click', handler);
     * }
     *
     * function removeClickHandler(handler) {
     *   document.removeEventListener('click', handler);
     * }
     *
     * var clicks = Rx.Observable.fromEventPattern(
     *   addClickHandler,
     *   removeClickHandler
     * );
     * clicks.subscribe(x => console.log(x));
     *
     * @see {@link from}
     * @see {@link fromEvent}
     *
     * @param {function(handler: Function): any} addHandler A function that takes
     * a `handler` function as argument and attaches it somehow to the actual
     * source of events.
     * @param {function(handler: Function, signal?: any): void} [removeHandler] An optional function that
     * takes a `handler` function as argument and removes it in case it was
     * previously attached using `addHandler`. if addHandler returns signal to teardown when remove,
     * removeHandler function will forward it.
     * @param {function(...args: any): T} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEventPattern
     * @owner Observable
     */
    FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
    };
    FromEventPatternObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var removeHandler = this.removeHandler;
        var handler = !!this.selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this._callSelector(subscriber, args);
        } : function (e) { subscriber.next(e); };
        var retValue = this._callAddHandler(handler, subscriber);
        if (!isFunction_1.isFunction(removeHandler)) {
            return;
        }
        subscriber.add(new Subscription_1.Subscription(function () {
            //TODO: determine whether or not to forward to error handler
            removeHandler(handler, retValue);
        }));
    };
    FromEventPatternObservable.prototype._callSelector = function (subscriber, args) {
        try {
            var result = this.selector.apply(this, args);
            subscriber.next(result);
        }
        catch (e) {
            subscriber.error(e);
        }
    };
    FromEventPatternObservable.prototype._callAddHandler = function (handler, errorSubscriber) {
        try {
            return this.addHandler(handler) || null;
        }
        catch (e) {
            errorSubscriber.error(e);
        }
    };
    return FromEventPatternObservable;
}(Observable_1.Observable));
exports.FromEventPatternObservable = FromEventPatternObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJvbUV2ZW50UGF0dGVybk9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGcm9tRXZlbnRQYXR0ZXJuT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFnRDtBQUNoRCw0Q0FBMkM7QUFDM0MsZ0RBQStDO0FBRy9DOzs7O0dBSUc7QUFDSDtJQUFtRCw4Q0FBYTtJQXdEOUQsb0NBQW9CLFVBQXNDLEVBQ3RDLGFBQXlELEVBQ3pELFFBQXFDO1FBRnpELFlBR0UsaUJBQU8sU0FDUjtRQUptQixnQkFBVSxHQUFWLFVBQVUsQ0FBNEI7UUFDdEMsbUJBQWEsR0FBYixhQUFhLENBQTRDO1FBQ3pELGNBQVEsR0FBUixRQUFRLENBQTZCOztJQUV6RCxDQUFDO0lBMUREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStDRztJQUNJLGlDQUFNLEdBQWIsVUFBaUIsVUFBc0MsRUFDdEMsYUFBeUQsRUFDekQsUUFBcUM7UUFDcEQsTUFBTSxDQUFDLElBQUksMEJBQTBCLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBUVMsK0NBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFBOUMsaUJBaUJDO1FBaEJDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFekMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFBQyxjQUFtQjtpQkFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO2dCQUFuQix5QkFBbUI7O1lBQ3BELEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsR0FBRyxVQUFTLENBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTNELEVBQUUsQ0FBQyxDQUFDLENBQUMsdUJBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSwyQkFBWSxDQUFDO1lBQzlCLDREQUE0RDtZQUM1RCxhQUFhLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFFO1FBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRU8sa0RBQWEsR0FBckIsVUFBc0IsVUFBeUIsRUFBRSxJQUFnQjtRQUMvRCxJQUFJLENBQUM7WUFDSCxJQUFNLE1BQU0sR0FBTSxJQUFJLENBQUMsUUFBUSxPQUFiLElBQUksRUFBYSxJQUFJLENBQUMsQ0FBQztZQUN6QyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUVPLG9EQUFlLEdBQXZCLFVBQXdCLE9BQXlCLEVBQUUsZUFBOEI7UUFDL0UsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzFDLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUNILGlDQUFDO0FBQUQsQ0FBQyxBQW5HRCxDQUFtRCx1QkFBVSxHQW1HNUQ7QUFuR1ksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEZyb21FdmVudFBhdHRlcm5PYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSBmcm9tIGFuIEFQSSBiYXNlZCBvbiBhZGRIYW5kbGVyL3JlbW92ZUhhbmRsZXJcbiAgICogZnVuY3Rpb25zLlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29udmVydHMgYW55IGFkZEhhbmRsZXIvcmVtb3ZlSGFuZGxlciBBUEkgdG8gYW5cbiAgICogT2JzZXJ2YWJsZS48L3NwYW4+XG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvZnJvbUV2ZW50UGF0dGVybi5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGJ5IHVzaW5nIHRoZSBgYWRkSGFuZGxlcmAgYW5kIGByZW1vdmVIYW5kbGVyYFxuICAgKiBmdW5jdGlvbnMgdG8gYWRkIGFuZCByZW1vdmUgdGhlIGhhbmRsZXJzLCB3aXRoIGFuIG9wdGlvbmFsIHNlbGVjdG9yXG4gICAqIGZ1bmN0aW9uIHRvIHByb2plY3QgdGhlIGV2ZW50IGFyZ3VtZW50cyB0byBhIHJlc3VsdC4gVGhlIGBhZGRIYW5kbGVyYCBpc1xuICAgKiBjYWxsZWQgd2hlbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZCwgYW5kIGByZW1vdmVIYW5kbGVyYCBpc1xuICAgKiBjYWxsZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIGlzIHVuc3Vic2NyaWJlZC5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgY2xpY2tzIGhhcHBlbmluZyBvbiB0aGUgRE9NIGRvY3VtZW50PC9jYXB0aW9uPlxuICAgKiBmdW5jdGlvbiBhZGRDbGlja0hhbmRsZXIoaGFuZGxlcikge1xuICAgKiAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAqIH1cbiAgICpcbiAgICogZnVuY3Rpb24gcmVtb3ZlQ2xpY2tIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICogICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICAgKiB9XG4gICAqXG4gICAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudFBhdHRlcm4oXG4gICAqICAgYWRkQ2xpY2tIYW5kbGVyLFxuICAgKiAgIHJlbW92ZUNsaWNrSGFuZGxlclxuICAgKiApO1xuICAgKiBjbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgKiBAc2VlIHtAbGluayBmcm9tRXZlbnR9XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oaGFuZGxlcjogRnVuY3Rpb24pOiBhbnl9IGFkZEhhbmRsZXIgQSBmdW5jdGlvbiB0aGF0IHRha2VzXG4gICAqIGEgYGhhbmRsZXJgIGZ1bmN0aW9uIGFzIGFyZ3VtZW50IGFuZCBhdHRhY2hlcyBpdCBzb21laG93IHRvIHRoZSBhY3R1YWxcbiAgICogc291cmNlIG9mIGV2ZW50cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbihoYW5kbGVyOiBGdW5jdGlvbiwgc2lnbmFsPzogYW55KTogdm9pZH0gW3JlbW92ZUhhbmRsZXJdIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXRcbiAgICogdGFrZXMgYSBgaGFuZGxlcmAgZnVuY3Rpb24gYXMgYXJndW1lbnQgYW5kIHJlbW92ZXMgaXQgaW4gY2FzZSBpdCB3YXNcbiAgICogcHJldmlvdXNseSBhdHRhY2hlZCB1c2luZyBgYWRkSGFuZGxlcmAuIGlmIGFkZEhhbmRsZXIgcmV0dXJucyBzaWduYWwgdG8gdGVhcmRvd24gd2hlbiByZW1vdmUsXG4gICAqIHJlbW92ZUhhbmRsZXIgZnVuY3Rpb24gd2lsbCBmb3J3YXJkIGl0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLmFyZ3M6IGFueSk6IFR9IFtzZWxlY3Rvcl0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAgICogcG9zdC1wcm9jZXNzIHJlc3VsdHMuIEl0IHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGUgZXZlbnQgaGFuZGxlciBhbmRcbiAgICogc2hvdWxkIHJldHVybiBhIHNpbmdsZSB2YWx1ZS5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGZyb21FdmVudFBhdHRlcm5cbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oYWRkSGFuZGxlcjogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnksXG4gICAgICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcj86IChoYW5kbGVyOiBGdW5jdGlvbiwgc2lnbmFsPzogYW55KSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yPzogKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IFQpIHtcbiAgICByZXR1cm4gbmV3IEZyb21FdmVudFBhdHRlcm5PYnNlcnZhYmxlKGFkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXIsIHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWRkSGFuZGxlcjogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVtb3ZlSGFuZGxlcj86IChoYW5kbGVyOiBGdW5jdGlvbiwgc2lnbmFsPzogYW55KSA9PiB2b2lkLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yPzogKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIGNvbnN0IHJlbW92ZUhhbmRsZXIgPSB0aGlzLnJlbW92ZUhhbmRsZXI7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gISF0aGlzLnNlbGVjdG9yID8gKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHRoaXMuX2NhbGxTZWxlY3RvcihzdWJzY3JpYmVyLCBhcmdzKTtcbiAgICB9IDogZnVuY3Rpb24oZTogYW55KSB7IHN1YnNjcmliZXIubmV4dChlKTsgfTtcblxuICAgIGNvbnN0IHJldFZhbHVlID0gdGhpcy5fY2FsbEFkZEhhbmRsZXIoaGFuZGxlciwgc3Vic2NyaWJlcik7XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24ocmVtb3ZlSGFuZGxlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVyLmFkZChuZXcgU3Vic2NyaXB0aW9uKCgpID0+IHtcbiAgICAgIC8vVE9ETzogZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRvIGZvcndhcmQgdG8gZXJyb3IgaGFuZGxlclxuICAgICAgcmVtb3ZlSGFuZGxlcihoYW5kbGVyLCByZXRWYWx1ZSkgO1xuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGxTZWxlY3RvcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBhcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdDogVCA9IHRoaXMuc2VsZWN0b3IoLi4uYXJncyk7XG4gICAgICBzdWJzY3JpYmVyLm5leHQocmVzdWx0KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHN1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FsbEFkZEhhbmRsZXIoaGFuZGxlcjogKGU6IGFueSkgPT4gdm9pZCwgZXJyb3JTdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogYW55IHwgbnVsbCB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZEhhbmRsZXIoaGFuZGxlcikgfHwgbnVsbDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGVycm9yU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICB9XG4gIH1cbn0iXX0=