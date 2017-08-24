"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../Subject");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Branch out the source Observable values as a nested Observable using a
 * factory function of closing Observables to determine when to start a new
 * window.
 *
 * <span class="informal">It's like {@link bufferWhen}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowWhen.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping windows.
 * It emits the current window and opens a new one whenever the Observable
 * produced by the specified `closingSelector` function emits an item. The first
 * window is opened immediately when subscribing to the output Observable.
 *
 * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks
 *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link bufferWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals (on either `next` or
 * `complete`) when to close the previous window and start a new one.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowWhen
 * @owner Observable
 */
function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
}
exports.windowWhen = windowWhen;
var WindowOperator = (function () {
    function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
    };
    return WindowOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WindowSubscriber = (function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.closingSelector = closingSelector;
        _this.openWindow();
        return _this;
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
        if (this.closingNotification) {
            this.closingNotification.unsubscribe();
        }
    };
    WindowSubscriber.prototype.openWindow = function (innerSub) {
        if (innerSub === void 0) { innerSub = null; }
        if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var window = this.window = new Subject_1.Subject();
        this.destination.next(window);
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            var err = errorObject_1.errorObject.e;
            this.destination.error(err);
            this.window.error(err);
        }
        else {
            this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
        }
    };
    return WindowSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93V2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndpbmRvd1doZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxzQ0FBcUM7QUFHckMsNkNBQTRDO0FBQzVDLG1EQUFrRDtBQUVsRCxzREFBcUQ7QUFFckQsK0RBQThEO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBQ0gsb0JBQW1ELGVBQXNDO0lBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFDRSx3QkFBb0IsZUFBc0M7UUFBdEMsb0JBQWUsR0FBZixlQUFlLENBQXVCO0lBQzFELENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssVUFBcUMsRUFBRSxNQUFXO1FBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQWtDLG9DQUF1QjtJQUl2RCwwQkFBc0IsV0FBc0MsRUFDeEMsZUFBc0M7UUFEMUQsWUFFRSxrQkFBTSxXQUFXLENBQUMsU0FFbkI7UUFKcUIsaUJBQVcsR0FBWCxXQUFXLENBQTJCO1FBQ3hDLHFCQUFlLEdBQWYsZUFBZSxDQUF1QjtRQUV4RCxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7O0lBQ3BCLENBQUM7SUFFRCxxQ0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWUsRUFDOUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUFpQztRQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksS0FBVSxFQUFFLFFBQWlDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELHlDQUFjLEdBQWQsVUFBZSxRQUFpQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFUyxnQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVTLGlDQUFNLEdBQWhCLFVBQWlCLEdBQVE7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVTLG9DQUFTLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyx5REFBOEIsR0FBdEM7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQztJQUVPLHFDQUFVLEdBQWxCLFVBQW1CLFFBQXdDO1FBQXhDLHlCQUFBLEVBQUEsZUFBd0M7UUFDekQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBTyxFQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUIsSUFBTSxlQUFlLEdBQUcsbUJBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxlQUFlLEtBQUsseUJBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBTSxHQUFHLEdBQUcseUJBQVcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcscUNBQWlCLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDaEYsQ0FBQztJQUNILENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFyRUQsQ0FBa0MsaUNBQWUsR0FxRWhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcblxuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKipcbiAqIEJyYW5jaCBvdXQgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBhcyBhIG5lc3RlZCBPYnNlcnZhYmxlIHVzaW5nIGFcbiAqIGZhY3RvcnkgZnVuY3Rpb24gb2YgY2xvc2luZyBPYnNlcnZhYmxlcyB0byBkZXRlcm1pbmUgd2hlbiB0byBzdGFydCBhIG5ld1xuICogd2luZG93LlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGJ1ZmZlcldoZW59LCBidXQgZW1pdHMgYSBuZXN0ZWRcbiAqIE9ic2VydmFibGUgaW5zdGVhZCBvZiBhbiBhcnJheS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy93aW5kb3dXaGVuLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgY29ubmVjdGVkLCBub24tb3ZlcmxhcHBpbmcgd2luZG93cy5cbiAqIEl0IGVtaXRzIHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgb3BlbnMgYSBuZXcgb25lIHdoZW5ldmVyIHRoZSBPYnNlcnZhYmxlXG4gKiBwcm9kdWNlZCBieSB0aGUgc3BlY2lmaWVkIGBjbG9zaW5nU2VsZWN0b3JgIGZ1bmN0aW9uIGVtaXRzIGFuIGl0ZW0uIFRoZSBmaXJzdFxuICogd2luZG93IGlzIG9wZW5lZCBpbW1lZGlhdGVseSB3aGVuIHN1YnNjcmliaW5nIHRvIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgdGhlIGZpcnN0IHR3byBjbGlja3MgZXZlbnRzIGluIGV2ZXJ5IHdpbmRvdyBvZiBbMS01XSByYW5kb20gc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzXG4gKiAgIC53aW5kb3dXaGVuKCgpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA0MDAwKSlcbiAqICAgLm1hcCh3aW4gPT4gd2luLnRha2UoMikpIC8vIGVhY2ggd2luZG93IGhhcyBhdCBtb3N0IDIgZW1pc3Npb25zXG4gKiAgIC5tZXJnZUFsbCgpOyAvLyBmbGF0dGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHdpbmRvd31cbiAqIEBzZWUge0BsaW5rIHdpbmRvd0NvdW50fVxuICogQHNlZSB7QGxpbmsgd2luZG93VGltZX1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RvZ2dsZX1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcldoZW59XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbigpOiBPYnNlcnZhYmxlfSBjbG9zaW5nU2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0IHRha2VzIG5vXG4gKiBhcmd1bWVudHMgYW5kIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IHNpZ25hbHMgKG9uIGVpdGhlciBgbmV4dGAgb3JcbiAqIGBjb21wbGV0ZWApIHdoZW4gdG8gY2xvc2UgdGhlIHByZXZpb3VzIHdpbmRvdyBhbmQgc3RhcnQgYSBuZXcgb25lLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+Pn0gQW4gb2JzZXJ2YWJsZSBvZiB3aW5kb3dzLCB3aGljaCBpbiB0dXJuXG4gKiBhcmUgT2JzZXJ2YWJsZXMuXG4gKiBAbWV0aG9kIHdpbmRvd1doZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dXaGVuPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGNsb3NpbmdTZWxlY3RvcjogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFdpbmRvd09wZXJhdG9yPFQ+KGNsb3NpbmdTZWxlY3RvcikpO1xufVxuXG5jbGFzcyBXaW5kb3dPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIE9ic2VydmFibGU8VD4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6ICgpID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFdpbmRvd1N1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5jbG9zaW5nU2VsZWN0b3IpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgV2luZG93U3Vic2NyaWJlcjxUPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBhbnk+IHtcbiAgcHJpdmF0ZSB3aW5kb3c6IFN1YmplY3Q8VD47XG4gIHByaXZhdGUgY2xvc2luZ05vdGlmaWNhdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxPYnNlcnZhYmxlPFQ+PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6ICgpID0+IE9ic2VydmFibGU8YW55Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLm9wZW5XaW5kb3coKTtcbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogYW55LFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgYW55Pik6IHZvaWQge1xuICAgIHRoaXMub3BlbldpbmRvdyhpbm5lclN1Yik7XG4gIH1cblxuICBub3RpZnlFcnJvcihlcnJvcjogYW55LCBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvcihlcnJvcik7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZShpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5XaW5kb3coaW5uZXJTdWIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cuZXJyb3IoZXJyKTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgdGhpcy51bnN1YnNjcmliZUNsb3NpbmdOb3RpZmljYXRpb24oKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cuY29tcGxldGUoKTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZUNsb3NpbmdOb3RpZmljYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVDbG9zaW5nTm90aWZpY2F0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsb3NpbmdOb3RpZmljYXRpb24pIHtcbiAgICAgIHRoaXMuY2xvc2luZ05vdGlmaWNhdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb3BlbldpbmRvdyhpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIGFueT4gPSBudWxsKTogdm9pZCB7XG4gICAgaWYgKGlubmVyU3ViKSB7XG4gICAgICB0aGlzLnJlbW92ZShpbm5lclN1Yik7XG4gICAgICBpbm5lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZXaW5kb3cgPSB0aGlzLndpbmRvdztcbiAgICBpZiAocHJldldpbmRvdykge1xuICAgICAgcHJldldpbmRvdy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMud2luZG93ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQod2luZG93KTtcblxuICAgIGNvbnN0IGNsb3NpbmdOb3RpZmllciA9IHRyeUNhdGNoKHRoaXMuY2xvc2luZ1NlbGVjdG9yKSgpO1xuICAgIGlmIChjbG9zaW5nTm90aWZpZXIgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICBjb25zdCBlcnIgPSBlcnJvck9iamVjdC5lO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgdGhpcy53aW5kb3cuZXJyb3IoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQodGhpcy5jbG9zaW5nTm90aWZpY2F0aW9uID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgY2xvc2luZ05vdGlmaWVyKSk7XG4gICAgfVxuICB9XG59XG4iXX0=