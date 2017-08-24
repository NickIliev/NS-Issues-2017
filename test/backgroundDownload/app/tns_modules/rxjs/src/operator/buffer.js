"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Buffers the source Observable values until `closingNotifier` emits.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when another Observable emits.</span>
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * Buffers the incoming Observable values until the given `closingNotifier`
 * Observable emits a value, at which point it emits the buffer on the output
 * Observable and starts a new buffer internally, awaiting the next time
 * `closingNotifier` emits.
 *
 * @example <caption>On every click, emit array of most recent interval events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var buffered = interval.buffer(clicks);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link window}
 *
 * @param {Observable<any>} closingNotifier An Observable that signals the
 * buffer to be emitted on the output Observable.
 * @return {Observable<T[]>} An Observable of buffers, which are arrays of
 * values.
 * @method buffer
 * @owner Observable
 */
function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}
exports.buffer = buffer;
var BufferOperator = (function () {
    function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    BufferOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
    };
    return BufferOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var BufferSubscriber = (function (_super) {
    __extends(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
        var _this = _super.call(this, destination) || this;
        _this.buffer = [];
        _this.add(subscribeToResult_1.subscribeToResult(_this, closingNotifier));
        return _this;
    }
    BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };
    return BufferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsc0RBQXFEO0FBRXJELCtEQUE4RDtBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILGdCQUErQyxlQUFnQztJQUM3RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBSSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCx3QkFFQztBQUVEO0lBRUUsd0JBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUNwRCxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLFVBQTJCLEVBQUUsTUFBVztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFrQyxvQ0FBdUI7SUFHdkQsMEJBQVksV0FBNEIsRUFBRSxlQUFnQztRQUExRSxZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUxPLFlBQU0sR0FBUSxFQUFFLENBQUM7UUFJdkIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxxQ0FBaUIsQ0FBQyxLQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQzs7SUFDckQsQ0FBQztJQUVTLGdDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQscUNBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFlLEVBQzlCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBaUM7UUFDMUMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbkJELENBQWtDLGlDQUFlLEdBbUJoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogQnVmZmVycyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIHVudGlsIGBjbG9zaW5nTm90aWZpZXJgIGVtaXRzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheSwgYW5kIGVtaXRzXG4gKiB0aGF0IGFycmF5IG9ubHkgd2hlbiBhbm90aGVyIE9ic2VydmFibGUgZW1pdHMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvYnVmZmVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEJ1ZmZlcnMgdGhlIGluY29taW5nIE9ic2VydmFibGUgdmFsdWVzIHVudGlsIHRoZSBnaXZlbiBgY2xvc2luZ05vdGlmaWVyYFxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCBhdCB3aGljaCBwb2ludCBpdCBlbWl0cyB0aGUgYnVmZmVyIG9uIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgYW5kIHN0YXJ0cyBhIG5ldyBidWZmZXIgaW50ZXJuYWxseSwgYXdhaXRpbmcgdGhlIG5leHQgdGltZVxuICogYGNsb3NpbmdOb3RpZmllcmAgZW1pdHMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+T24gZXZlcnkgY2xpY2ssIGVtaXQgYXJyYXkgb2YgbW9zdCByZWNlbnQgaW50ZXJ2YWwgZXZlbnRzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBpbnRlcnZhbCA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgYnVmZmVyZWQgPSBpbnRlcnZhbC5idWZmZXIoY2xpY2tzKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJXaGVufVxuICogQHNlZSB7QGxpbmsgd2luZG93fVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZTxhbnk+fSBjbG9zaW5nTm90aWZpZXIgQW4gT2JzZXJ2YWJsZSB0aGF0IHNpZ25hbHMgdGhlXG4gKiBidWZmZXIgdG8gYmUgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59IEFuIE9ic2VydmFibGUgb2YgYnVmZmVycywgd2hpY2ggYXJlIGFycmF5cyBvZlxuICogdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXI8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY2xvc2luZ05vdGlmaWVyOiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBCdWZmZXJPcGVyYXRvcjxUPihjbG9zaW5nTm90aWZpZXIpKTtcbn1cblxuY2xhc3MgQnVmZmVyT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUW10+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsb3NpbmdOb3RpZmllcjogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VFtdPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBCdWZmZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuY2xvc2luZ05vdGlmaWVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEJ1ZmZlclN1YnNjcmliZXI8VD4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgYW55PiB7XG4gIHByaXZhdGUgYnVmZmVyOiBUW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUW10+LCBjbG9zaW5nTm90aWZpZXI6IE9ic2VydmFibGU8YW55Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBjbG9zaW5nTm90aWZpZXIpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMuYnVmZmVyLnB1c2godmFsdWUpO1xuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBhbnksXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBhbnk+KTogdm9pZCB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgfVxufVxuIl19