"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/* tslint:enable:max-line-length */
/**
 * Emits only the first value emitted by the source Observable that meets some
 * condition.
 *
 * <span class="informal">Finds the first value that passes some test and emits
 * that.</span>
 *
 * <img src="./img/find.png" width="100%">
 *
 * `find` searches for the first item in the source Observable that matches the
 * specified condition embodied by the `predicate`, and returns the first
 * occurrence in the source. Unlike {@link first}, the `predicate` is required
 * in `find`, and does not emit an error if a valid value is not found.
 *
 * @example <caption>Find and emit the first click that happens on a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.find(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link first}
 * @see {@link findIndex}
 * @see {@link take}
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
 * A function called with each item to test for condition matching.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable<T>} An Observable of the first item that matches the
 * condition.
 * @method find
 * @owner Observable
 */
function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate is not a function');
    }
    return this.lift(new FindValueOperator(predicate, this, false, thisArg));
}
exports.find = find;
var FindValueOperator = (function () {
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
    }
    FindValueOperator.prototype.call = function (observer, source) {
        return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
    };
    return FindValueOperator;
}());
exports.FindValueOperator = FindValueOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FindValueSubscriber = (function (_super) {
    __extends(FindValueSubscriber, _super);
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.yieldIndex = yieldIndex;
        _this.thisArg = thisArg;
        _this.index = 0;
        return _this;
    }
    FindValueSubscriber.prototype.notifyComplete = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    FindValueSubscriber.prototype._next = function (value) {
        var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
        var index = this.index++;
        try {
            var result = predicate.call(thisArg || this, value, index, this.source);
            if (result) {
                this.notifyComplete(this.yieldIndex ? index : value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    FindValueSubscriber.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };
    return FindValueSubscriber;
}(Subscriber_1.Subscriber));
exports.FindValueSubscriber = FindValueSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBMkM7QUFTM0MsbUNBQW1DO0FBRW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILGNBQTZDLFNBQXNFLEVBQzNGLE9BQWE7SUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLElBQUksU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELE1BQU0sQ0FBTSxJQUFJLENBQUMsSUFBSSxDQUFNLElBQUksaUJBQWlCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBTkQsb0JBTUM7QUFFRDtJQUNFLDJCQUFvQixTQUFzRSxFQUN0RSxNQUFxQixFQUNyQixVQUFtQixFQUNuQixPQUFhO1FBSGIsY0FBUyxHQUFULFNBQVMsQ0FBNkQ7UUFDdEUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQU07SUFDakMsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxRQUF1QixFQUFFLE1BQVc7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSw4Q0FBaUI7QUFZOUI7Ozs7R0FJRztBQUNIO0lBQTRDLHVDQUFhO0lBR3ZELDZCQUFZLFdBQTBCLEVBQ2xCLFNBQXNFLEVBQ3RFLE1BQXFCLEVBQ3JCLFVBQW1CLEVBQ25CLE9BQWE7UUFKakMsWUFLRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFMbUIsZUFBUyxHQUFULFNBQVMsQ0FBNkQ7UUFDdEUsWUFBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixnQkFBVSxHQUFWLFVBQVUsQ0FBUztRQUNuQixhQUFPLEdBQVAsT0FBTyxDQUFNO1FBTnpCLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBUTFCLENBQUM7SUFFTyw0Q0FBYyxHQUF0QixVQUF1QixLQUFVO1FBQy9CLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFckMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVTLG1DQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUNoQixJQUFBLFNBQTZCLEVBQTNCLHdCQUFTLEVBQUUsb0JBQU8sQ0FBVTtRQUNwQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDO1lBQ0gsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0gsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVTLHVDQUFTLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFsQ0QsQ0FBNEMsdUJBQVUsR0FrQ3JEO0FBbENZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kPFQsIFMgZXh0ZW5kcyBUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiB2YWx1ZSBpcyBTLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmQ8VD4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0FyZz86IGFueSk6IE9ic2VydmFibGU8VD47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGZpcnN0IHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgbWVldHMgc29tZVxuICogY29uZGl0aW9uLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5GaW5kcyB0aGUgZmlyc3QgdmFsdWUgdGhhdCBwYXNzZXMgc29tZSB0ZXN0IGFuZCBlbWl0c1xuICogdGhhdC48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9maW5kLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBmaW5kYCBzZWFyY2hlcyBmb3IgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgbWF0Y2hlcyB0aGVcbiAqIHNwZWNpZmllZCBjb25kaXRpb24gZW1ib2RpZWQgYnkgdGhlIGBwcmVkaWNhdGVgLCBhbmQgcmV0dXJucyB0aGUgZmlyc3RcbiAqIG9jY3VycmVuY2UgaW4gdGhlIHNvdXJjZS4gVW5saWtlIHtAbGluayBmaXJzdH0sIHRoZSBgcHJlZGljYXRlYCBpcyByZXF1aXJlZFxuICogaW4gYGZpbmRgLCBhbmQgZG9lcyBub3QgZW1pdCBhbiBlcnJvciBpZiBhIHZhbGlkIHZhbHVlIGlzIG5vdCBmb3VuZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5GaW5kIGFuZCBlbWl0IHRoZSBmaXJzdCBjbGljayB0aGF0IGhhcHBlbnMgb24gYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmZpbmQoZXYgPT4gZXYudGFyZ2V0LnRhZ05hbWUgPT09ICdESVYnKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZmlsdGVyfVxuICogQHNlZSB7QGxpbmsgZmlyc3R9XG4gKiBAc2VlIHtAbGluayBmaW5kSW5kZXh9XG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IGJvb2xlYW59IHByZWRpY2F0ZVxuICogQSBmdW5jdGlvbiBjYWxsZWQgd2l0aCBlYWNoIGl0ZW0gdG8gdGVzdCBmb3IgY29uZGl0aW9uIG1hdGNoaW5nLlxuICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIGB0aGlzYFxuICogaW4gdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSBvZiB0aGUgZmlyc3QgaXRlbSB0aGF0IG1hdGNoZXMgdGhlXG4gKiBjb25kaXRpb24uXG4gKiBAbWV0aG9kIGZpbmRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzQXJnPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgcmV0dXJuIDxhbnk+dGhpcy5saWZ0PGFueT4obmV3IEZpbmRWYWx1ZU9wZXJhdG9yKHByZWRpY2F0ZSwgdGhpcywgZmFsc2UsIHRoaXNBcmcpKTtcbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRWYWx1ZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHlpZWxkSW5kZXg6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdGhpc0FyZz86IGFueSkge1xuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBGaW5kVmFsdWVTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy5zb3VyY2UsIHRoaXMueWllbGRJbmRleCwgdGhpcy50aGlzQXJnKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBGaW5kVmFsdWVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgeWllbGRJbmRleDogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzQXJnPzogYW55KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnlDb21wbGV0ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuXG4gICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcHJlZGljYXRlLCB0aGlzQXJnIH0gPSB0aGlzO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBwcmVkaWNhdGUuY2FsbCh0aGlzQXJnIHx8IHRoaXMsIHZhbHVlLCBpbmRleCwgdGhpcy5zb3VyY2UpO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLm5vdGlmeUNvbXBsZXRlKHRoaXMueWllbGRJbmRleCA/IGluZGV4IDogdmFsdWUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZnlDb21wbGV0ZSh0aGlzLnlpZWxkSW5kZXggPyAtMSA6IHVuZGVmaW5lZCk7XG4gIH1cbn1cbiJdfQ==