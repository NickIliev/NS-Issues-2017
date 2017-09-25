"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscription_1 = require("../Subscription");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Buffers the source Observable values, using a factory function of closing
 * Observables to determine when to close, emit, and reset the buffer.
 *
 * <span class="informal">Collects values from the past as an array. When it
 * starts collecting values, it calls a function that returns an Observable that
 * tells when to close the buffer and restart collecting.</span>
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` function emits a value. When it closes
 * the buffer, it immediately opens a new buffer and repeats the process.
 *
 * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferWhen(() =>
 *   Rx.Observable.interval(1000 + Math.random() * 4000)
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link windowWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals buffer closure.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferWhen
 * @owner Observable
 */
function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}
exports.bufferWhen = bufferWhen;
var BufferWhenOperator = (function () {
    function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
    };
    return BufferWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferWhenSubscriber = (function (_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.closingSelector = closingSelector;
        _this.subscribing = false;
        _this.openBuffer();
        return _this;
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
            this.complete();
        }
        else {
            this.openBuffer();
        }
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            closingSubscription = new Subscription_1.Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
            this.subscribing = false;
        }
    };
    return BufferWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyV2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1ZmZlcldoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxnREFBK0M7QUFDL0MsNkNBQTRDO0FBQzVDLG1EQUFrRDtBQUVsRCxzREFBcUQ7QUFFckQsK0RBQThEO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILG9CQUFtRCxlQUFzQztJQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFFRSw0QkFBb0IsZUFBc0M7UUFBdEMsb0JBQWUsR0FBZixlQUFlLENBQXVCO0lBQzFELENBQUM7SUFFRCxpQ0FBSSxHQUFKLFVBQUssVUFBMkIsRUFBRSxNQUFXO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXNDLHdDQUF1QjtJQUszRCw4QkFBWSxXQUE0QixFQUFVLGVBQXNDO1FBQXhGLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBSGlELHFCQUFlLEdBQWYsZUFBZSxDQUF1QjtRQUhoRixpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUtuQyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7O0lBQ3BCLENBQUM7SUFFUyxvQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVTLHdDQUFTLEdBQW5CO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELGlCQUFNLFNBQVMsV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUFFUywyQ0FBWSxHQUF0QjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWUsRUFDOUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUFpQztRQUMxQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELDZDQUFjLEdBQWQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDSCxDQUFDO0lBRUQseUNBQVUsR0FBVjtRQUVRLElBQUEsOENBQW1CLENBQVU7UUFFbkMsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFakIsSUFBTSxlQUFlLEdBQUcsbUJBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUV6RCxFQUFFLENBQUMsQ0FBQyxlQUFlLEtBQUsseUJBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLG1CQUFtQixHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztZQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsbUJBQW1CLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBdEVELENBQXNDLGlDQUFlLEdBc0VwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogQnVmZmVycyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzLCB1c2luZyBhIGZhY3RvcnkgZnVuY3Rpb24gb2YgY2xvc2luZ1xuICogT2JzZXJ2YWJsZXMgdG8gZGV0ZXJtaW5lIHdoZW4gdG8gY2xvc2UsIGVtaXQsIGFuZCByZXNldCB0aGUgYnVmZmVyLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheS4gV2hlbiBpdFxuICogc3RhcnRzIGNvbGxlY3RpbmcgdmFsdWVzLCBpdCBjYWxscyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXRcbiAqIHRlbGxzIHdoZW4gdG8gY2xvc2UgdGhlIGJ1ZmZlciBhbmQgcmVzdGFydCBjb2xsZWN0aW5nLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2J1ZmZlcldoZW4ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogT3BlbnMgYSBidWZmZXIgaW1tZWRpYXRlbHksIHRoZW4gY2xvc2VzIHRoZSBidWZmZXIgd2hlbiB0aGUgb2JzZXJ2YWJsZVxuICogcmV0dXJuZWQgYnkgY2FsbGluZyBgY2xvc2luZ1NlbGVjdG9yYCBmdW5jdGlvbiBlbWl0cyBhIHZhbHVlLiBXaGVuIGl0IGNsb3Nlc1xuICogdGhlIGJ1ZmZlciwgaXQgaW1tZWRpYXRlbHkgb3BlbnMgYSBuZXcgYnVmZmVyIGFuZCByZXBlYXRzIHRoZSBwcm9jZXNzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgYW4gYXJyYXkgb2YgdGhlIGxhc3QgY2xpY2tzIGV2ZXJ5IFsxLTVdIHJhbmRvbSBzZWNvbmRzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBidWZmZXJlZCA9IGNsaWNrcy5idWZmZXJXaGVuKCgpID0+XG4gKiAgIFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA0MDAwKVxuICogKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dXaGVufVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogT2JzZXJ2YWJsZX0gY2xvc2luZ1NlbGVjdG9yIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBub1xuICogYXJndW1lbnRzIGFuZCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBzaWduYWxzIGJ1ZmZlciBjbG9zdXJlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fSBBbiBvYnNlcnZhYmxlIG9mIGFycmF5cyBvZiBidWZmZXJlZCB2YWx1ZXMuXG4gKiBAbWV0aG9kIGJ1ZmZlcldoZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJXaGVuPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGNsb3NpbmdTZWxlY3RvcjogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgQnVmZmVyV2hlbk9wZXJhdG9yPFQ+KGNsb3NpbmdTZWxlY3RvcikpO1xufVxuXG5jbGFzcyBCdWZmZXJXaGVuT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUW10+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VFtdPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBCdWZmZXJXaGVuU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmNsb3NpbmdTZWxlY3RvcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBCdWZmZXJXaGVuU3Vic2NyaWJlcjxUPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBhbnk+IHtcbiAgcHJpdmF0ZSBidWZmZXI6IFRbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpYmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGNsb3NpbmdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUW10+LCBwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMub3BlbkJ1ZmZlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgdGhpcy5idWZmZXIucHVzaCh2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIGlmIChidWZmZXIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChidWZmZXIpO1xuICAgIH1cbiAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5idWZmZXIgPSBudWxsO1xuICAgIHRoaXMuc3Vic2NyaWJpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogYW55LFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgYW55Pik6IHZvaWQge1xuICAgIHRoaXMub3BlbkJ1ZmZlcigpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaWJpbmcpIHtcbiAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuQnVmZmVyKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkJ1ZmZlcigpIHtcblxuICAgIGxldCB7IGNsb3NpbmdTdWJzY3JpcHRpb24gfSA9IHRoaXM7XG5cbiAgICBpZiAoY2xvc2luZ1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZW1vdmUoY2xvc2luZ1N1YnNjcmlwdGlvbik7XG4gICAgICBjbG9zaW5nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgaWYgKHRoaXMuYnVmZmVyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuXG4gICAgY29uc3QgY2xvc2luZ05vdGlmaWVyID0gdHJ5Q2F0Y2godGhpcy5jbG9zaW5nU2VsZWN0b3IpKCk7XG5cbiAgICBpZiAoY2xvc2luZ05vdGlmaWVyID09PSBlcnJvck9iamVjdCkge1xuICAgICAgdGhpcy5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvc2luZ1N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgIHRoaXMuY2xvc2luZ1N1YnNjcmlwdGlvbiA9IGNsb3NpbmdTdWJzY3JpcHRpb247XG4gICAgICB0aGlzLmFkZChjbG9zaW5nU3Vic2NyaXB0aW9uKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJpbmcgPSB0cnVlO1xuICAgICAgY2xvc2luZ1N1YnNjcmlwdGlvbi5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgY2xvc2luZ05vdGlmaWVyKSk7XG4gICAgICB0aGlzLnN1YnNjcmliaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=