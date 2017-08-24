"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var EmptyError_1 = require("../util/EmptyError");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {function} predicate - The condition any source emitted item has to satisfy.
 * @return {Observable} An Observable that emits only the last item satisfying the given condition
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @method last
 * @owner Observable
 */
function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}
exports.last = last;
var LastOperator = (function () {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    LastOperator.prototype.call = function (observer, source) {
        return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return LastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var LastSubscriber = (function (_super) {
    __extends(LastSubscriber, _super);
    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.resultSelector = resultSelector;
        _this.defaultValue = defaultValue;
        _this.source = source;
        _this.hasValue = false;
        _this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            _this.lastValue = defaultValue;
            _this.hasValue = true;
        }
        return _this;
    }
    LastSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.lastValue = result;
        this.hasValue = true;
    };
    LastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return LastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBMkM7QUFDM0MsaURBQWdEO0FBc0JoRCxtQ0FBbUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxjQUFnRCxTQUF1RSxFQUM1RixjQUF3RCxFQUN4RCxZQUFnQjtJQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3BGLENBQUM7QUFKRCxvQkFJQztBQUVEO0lBQ0Usc0JBQW9CLFNBQXVFLEVBQ3ZFLGNBQXdELEVBQ3hELFlBQWtCLEVBQ2xCLE1BQXNCO1FBSHRCLGNBQVMsR0FBVCxTQUFTLENBQThEO1FBQ3ZFLG1CQUFjLEdBQWQsY0FBYyxDQUEwQztRQUN4RCxpQkFBWSxHQUFaLFlBQVksQ0FBTTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUMxQyxDQUFDO0lBRUQsMkJBQUksR0FBSixVQUFLLFFBQXVCLEVBQUUsTUFBVztRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0gsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFBbUMsa0NBQWE7SUFLOUMsd0JBQVksV0FBMEIsRUFDbEIsU0FBdUUsRUFDdkUsY0FBd0QsRUFDeEQsWUFBa0IsRUFDbEIsTUFBc0I7UUFKMUMsWUFLRSxrQkFBTSxXQUFXLENBQUMsU0FLbkI7UUFUbUIsZUFBUyxHQUFULFNBQVMsQ0FBOEQ7UUFDdkUsb0JBQWMs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SSxDQUFDLENBQUM7WUFDTixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksdUJBQVUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBdEVELENBQW1DLHVCQUFVLEdBc0U1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgRW1wdHlFcnJvciB9IGZyb20gJy4uL3V0aWwvRW1wdHlFcnJvcic7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VCwgUyBleHRlbmRzIFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gdmFsdWUgaXMgUyk6IE9ic2VydmFibGU8Uz47XG5leHBvcnQgZnVuY3Rpb24gbGFzdDxULCBTIGV4dGVuZHMgVCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWNhdGU6ICh2YWx1ZTogVCB8IFMsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gdmFsdWUgaXMgUyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3RvcjogKHZhbHVlOiBTLCBpbmRleDogbnVtYmVyKSA9PiBSLCBkZWZhdWx0VmFsdWU/OiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQsIFMgZXh0ZW5kcyBUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHZhbHVlIGlzIFMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3I6IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPzogUyk6IE9ic2VydmFibGU8Uz47XG5leHBvcnQgZnVuY3Rpb24gbGFzdDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3Rvcj86ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT86IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VD4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3Rvcjogdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT86IFQpOiBPYnNlcnZhYmxlPFQ+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBvbmx5IHRoZSBsYXN0IGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBJdCBvcHRpb25hbGx5IHRha2VzIGEgcHJlZGljYXRlIGZ1bmN0aW9uIGFzIGEgcGFyYW1ldGVyLCBpbiB3aGljaCBjYXNlLCByYXRoZXIgdGhhbiBlbWl0dGluZ1xuICogdGhlIGxhc3QgaXRlbSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgdGhlIHJlc3VsdGluZyBPYnNlcnZhYmxlIHdpbGwgZW1pdCB0aGUgbGFzdCBpdGVtXG4gKiBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IHNhdGlzZmllcyB0aGUgcHJlZGljYXRlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbGFzdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAdGhyb3dzIHtFbXB0eUVycm9yfSBEZWxpdmVycyBhbiBFbXB0eUVycm9yIHRvIHRoZSBPYnNlcnZlcidzIGBlcnJvcmBcbiAqIGNhbGxiYWNrIGlmIHRoZSBPYnNlcnZhYmxlIGNvbXBsZXRlcyBiZWZvcmUgYW55IGBuZXh0YCBub3RpZmljYXRpb24gd2FzIHNlbnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgLSBUaGUgY29uZGl0aW9uIGFueSBzb3VyY2UgZW1pdHRlZCBpdGVtIGhhcyB0byBzYXRpc2Z5LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG9ubHkgdGhlIGxhc3QgaXRlbSBzYXRpc2Z5aW5nIHRoZSBnaXZlbiBjb25kaXRpb25cbiAqIGZyb20gdGhlIHNvdXJjZSwgb3IgYW4gTm9TdWNoRWxlbWVudEV4Y2VwdGlvbiBpZiBubyBzdWNoIGl0ZW1zIGFyZSBlbWl0dGVkLlxuICogQHRocm93cyAtIFRocm93cyBpZiBubyBpdGVtcyB0aGF0IG1hdGNoIHRoZSBwcmVkaWNhdGUgYXJlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBsYXN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFzdDxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yPzogKCh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gUikgfCB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPzogUik6IE9ic2VydmFibGU8VCB8IFI+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgTGFzdE9wZXJhdG9yKHByZWRpY2F0ZSwgcmVzdWx0U2VsZWN0b3IsIGRlZmF1bHRWYWx1ZSwgdGhpcykpO1xufVxuXG5jbGFzcyBMYXN0T3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJlZGljYXRlPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVzdWx0U2VsZWN0b3I/OiAoKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSKSB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgZGVmYXVsdFZhbHVlPzogYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZT86IE9ic2VydmFibGU8VD4pIHtcbiAgfVxuXG4gIGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgTGFzdFN1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMucHJlZGljYXRlLCB0aGlzLnJlc3VsdFNlbGVjdG9yLCB0aGlzLmRlZmF1bHRWYWx1ZSwgdGhpcy5zb3VyY2UpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgTGFzdFN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBsYXN0VmFsdWU6IFQgfCBSO1xuICBwcml2YXRlIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJlZGljYXRlPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVzdWx0U2VsZWN0b3I/OiAoKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSKSB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgZGVmYXVsdFZhbHVlPzogYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZT86IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmxhc3RWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIHRoaXMuaGFzVmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgIGlmICh0aGlzLnByZWRpY2F0ZSkge1xuICAgICAgdGhpcy5fdHJ5UHJlZGljYXRlKHZhbHVlLCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMuX3RyeVJlc3VsdFNlbGVjdG9yKHZhbHVlLCBpbmRleCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cnlQcmVkaWNhdGUodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJlZGljYXRlKHZhbHVlLCBpbmRleCwgdGhpcy5zb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAodGhpcy5yZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICB0aGlzLl90cnlSZXN1bHRTZWxlY3Rvcih2YWx1ZSwgaW5kZXgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHJ5UmVzdWx0U2VsZWN0b3IodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICg8YW55PnRoaXMpLnJlc3VsdFNlbGVjdG9yKHZhbHVlLCBpbmRleCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubGFzdFZhbHVlID0gcmVzdWx0O1xuICAgIHRoaXMuaGFzVmFsdWUgPSB0cnVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgaWYgKHRoaXMuaGFzVmFsdWUpIHtcbiAgICAgIGRlc3RpbmF0aW9uLm5leHQodGhpcy5sYXN0VmFsdWUpO1xuICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdGluYXRpb24uZXJyb3IobmV3IEVtcHR5RXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19