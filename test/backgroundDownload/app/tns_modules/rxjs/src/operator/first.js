"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var EmptyError_1 = require("../util/EmptyError");
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}
exports.first = first;
var FirstOperator = (function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    FirstOperator.prototype.call = function (observer, source) {
        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FirstSubscriber = (function (_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.resultSelector = resultSelector;
        _this.defaultValue = defaultValue;
        _this.source = source;
        _this.index = 0;
        _this.hasCompleted = false;
        _this._emitted = false;
        return _this;
    }
    FirstSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._emit = function (value, index) {
        if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
        }
        this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function (value) {
        var destination = this.destination;
        if (!this._emitted) {
            this._emitted = true;
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
        }
    };
    FirstSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return FirstSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaXJzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDRDQUEyQztBQUMzQyxpREFBZ0Q7QUF1QmhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnREc7QUFDSCxlQUFpRCxTQUF1RSxFQUM1RixjQUF3RCxFQUN4RCxZQUFnQjtJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7QUFKRCxzQkFJQztBQUVEO0lBQ0UsdUJBQW9CLFNBQXVFLEVBQ3ZFLGNBQXdELEVBQ3hELFlBQWtCLEVBQ2xCLE1BQXNCO1FBSHRCLGNBQVMsR0FBVCxTQUFTLENBQThEO1FBQ3ZFLG1CQUFjLEdBQWQsY0FBYyxDQUEwQztRQUN4RCxpQkFBWSxHQUFaLFlBQVksQ0FBTTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUMxQyxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLFFBQXVCLEVBQUUsTUFBVztRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDOUgsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFBb0MsbUNBQWE7SUFLL0MseUJBQVksV0FBMEIsRUFDbEIsU0FBdUUsRUFDdkUsY0FBd0QsRUFDeEQsWUFBa0IsRUFDbEIsTUFBc0I7UUFKMUMsWUFLRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFMbUIsZUFBUyxHQUFULFNBQVMsQ0FBOEQ7UUFDdkUsb0JBQWMsR0FBZCxjQUFjLENBQTBDO1FBQ3hELGtCQUFZLEdBQVosWUFBWSxDQUFNO1FBQ2xCLFlBQU0sR0FBTixNQUFNLENBQWdCO1FBUmxDLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUFRbEMsQ0FBQztJQUVTLCtCQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFTyx1Q0FBYSxHQUFyQixVQUFzQixLQUFRLEVBQUUsS0FBYTtRQUMzQyxJQUFJLE1BQVcsQ0FBQztRQUNoQixJQUFJLENBQUM7WUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFTywrQkFBSyxHQUFiLFVBQWMsS0FBVSxFQUFFLEtBQWE7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU8sNENBQWtCLEdBQTFCLFVBQTJCLEtBQVEsRUFBRSxLQUFhO1FBQ2hELElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBUyxJQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxvQ0FBVSxHQUFsQixVQUFtQixLQUFVO1FBQzNCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0UsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM5QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksdUJBQVUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBekVELENBQW9DLHVCQUFVLEdBeUU3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgRW1wdHlFcnJvciB9IGZyb20gJy4uL3V0aWwvRW1wdHlFcnJvcic7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQsIFMgZXh0ZW5kcyBUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiB2YWx1ZSBpcyBTKTogT2JzZXJ2YWJsZTxTPjtcbmV4cG9ydCBmdW5jdGlvbiBmaXJzdDxULCBTIGV4dGVuZHMgVCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlOiAodmFsdWU6IFQgfCBTLCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHZhbHVlIGlzIFMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yOiAodmFsdWU6IFMsIGluZGV4OiBudW1iZXIpID0+IFIsIGRlZmF1bHRWYWx1ZT86IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQsIFMgZXh0ZW5kcyBUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiB2YWx1ZSBpcyBTLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3Rvcjogdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPzogUyk6IE9ic2VydmFibGU8Uz47XG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VD4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbik6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT86IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3Rvcjogdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU/OiBUKTogT2JzZXJ2YWJsZTxUPjtcblxuLyoqXG4gKiBFbWl0cyBvbmx5IHRoZSBmaXJzdCB2YWx1ZSAob3IgdGhlIGZpcnN0IHZhbHVlIHRoYXQgbWVldHMgc29tZSBjb25kaXRpb24pXG4gKiBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RW1pdHMgb25seSB0aGUgZmlyc3QgdmFsdWUuIE9yIGVtaXRzIG9ubHkgdGhlIGZpcnN0XG4gKiB2YWx1ZSB0aGF0IHBhc3NlcyBzb21lIHRlc3QuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZmlyc3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogSWYgY2FsbGVkIHdpdGggbm8gYXJndW1lbnRzLCBgZmlyc3RgIGVtaXRzIHRoZSBmaXJzdCB2YWx1ZSBvZiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLCB0aGVuIGNvbXBsZXRlcy4gSWYgY2FsbGVkIHdpdGggYSBgcHJlZGljYXRlYCBmdW5jdGlvbiwgYGZpcnN0YFxuICogZW1pdHMgdGhlIGZpcnN0IHZhbHVlIG9mIHRoZSBzb3VyY2UgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgY29uZGl0aW9uLiBJdFxuICogbWF5IGFsc28gdGFrZSBhIGByZXN1bHRTZWxlY3RvcmAgZnVuY3Rpb24gdG8gcHJvZHVjZSB0aGUgb3V0cHV0IHZhbHVlIGZyb21cbiAqIHRoZSBpbnB1dCB2YWx1ZSwgYW5kIGEgYGRlZmF1bHRWYWx1ZWAgdG8gZW1pdCBpbiBjYXNlIHRoZSBzb3VyY2UgY29tcGxldGVzXG4gKiBiZWZvcmUgaXQgaXMgYWJsZSB0byBlbWl0IGEgdmFsaWQgdmFsdWUuIFRocm93cyBhbiBlcnJvciBpZiBgZGVmYXVsdFZhbHVlYFxuICogd2FzIG5vdCBwcm92aWRlZCBhbmQgYSBtYXRjaGluZyBlbGVtZW50IGlzIG5vdCBmb3VuZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgdGhlIGZpcnN0IGNsaWNrIHRoYXQgaGFwcGVucyBvbiB0aGUgRE9NPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MuZmlyc3QoKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgdGhlIGZpcnN0IGNsaWNrIHRoYXQgaGFwcGVucyBvbiBhIERJVjwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmZpcnN0KGV2ID0+IGV2LnRhcmdldC50YWdOYW1lID09PSAnRElWJyk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGZpbHRlcn1cbiAqIEBzZWUge0BsaW5rIGZpbmR9XG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICpcbiAqIEB0aHJvd3Mge0VtcHR5RXJyb3J9IERlbGl2ZXJzIGFuIEVtcHR5RXJyb3IgdG8gdGhlIE9ic2VydmVyJ3MgYGVycm9yYFxuICogY2FsbGJhY2sgaWYgdGhlIE9ic2VydmFibGUgY29tcGxldGVzIGJlZm9yZSBhbnkgYG5leHRgIG5vdGlmaWNhdGlvbiB3YXMgc2VudC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pOiBib29sZWFufSBbcHJlZGljYXRlXVxuICogQW4gb3B0aW9uYWwgZnVuY3Rpb24gY2FsbGVkIHdpdGggZWFjaCBpdGVtIHRvIHRlc3QgZm9yIGNvbmRpdGlvbiBtYXRjaGluZy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBSfSBbcmVzdWx0U2VsZWN0b3JdIEEgZnVuY3Rpb24gdG9cbiAqIHByb2R1Y2UgdGhlIHZhbHVlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBiYXNlZCBvbiB0aGUgdmFsdWVzXG4gKiBhbmQgdGhlIGluZGljZXMgb2YgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBUaGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGlzXG4gKiBmdW5jdGlvbiBhcmU6XG4gKiAtIGB2YWx1ZWA6IHRoZSB2YWx1ZSB0aGF0IHdhcyBlbWl0dGVkIG9uIHRoZSBzb3VyY2UuXG4gKiAtIGBpbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIGZyb20gdGhlIHNvdXJjZS5cbiAqIEBwYXJhbSB7Un0gW2RlZmF1bHRWYWx1ZV0gVGhlIGRlZmF1bHQgdmFsdWUgZW1pdHRlZCBpbiBjYXNlIG5vIHZhbGlkIHZhbHVlXG4gKiB3YXMgZm91bmQgb24gdGhlIHNvdXJjZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VHxSPn0gQW4gT2JzZXJ2YWJsZSBvZiB0aGUgZmlyc3QgaXRlbSB0aGF0IG1hdGNoZXMgdGhlXG4gKiBjb25kaXRpb24uXG4gKiBAbWV0aG9kIGZpcnN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgcHJlZGljYXRlPzogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3I/OiAoKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSKSB8IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPzogUik6IE9ic2VydmFibGU8VCB8IFI+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRmlyc3RPcGVyYXRvcihwcmVkaWNhdGUsIHJlc3VsdFNlbGVjdG9yLCBkZWZhdWx0VmFsdWUsIHRoaXMpKTtcbn1cblxuY2xhc3MgRmlyc3RPcGVyYXRvcjxULCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFI+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZXN1bHRTZWxlY3Rvcj86ICgodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IFIpIHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkZWZhdWx0VmFsdWU/OiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBGaXJzdFN1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMucHJlZGljYXRlLCB0aGlzLnJlc3VsdFNlbGVjdG9yLCB0aGlzLmRlZmF1bHRWYWx1ZSwgdGhpcy5zb3VyY2UpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgRmlyc3RTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgaGFzQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2VtaXR0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZXN1bHRTZWxlY3Rvcj86ICgodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IFIpIHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkZWZhdWx0VmFsdWU/OiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgIGlmICh0aGlzLnByZWRpY2F0ZSkge1xuICAgICAgdGhpcy5fdHJ5UHJlZGljYXRlKHZhbHVlLCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQodmFsdWUsIGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cnlQcmVkaWNhdGUodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJlZGljYXRlKHZhbHVlLCBpbmRleCwgdGhpcy5zb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB0aGlzLl9lbWl0KHZhbHVlLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZW1pdCh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuX3RyeVJlc3VsdFNlbGVjdG9yKHZhbHVlLCBpbmRleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VtaXRGaW5hbCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF90cnlSZXN1bHRTZWxlY3Rvcih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikge1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gKDxhbnk+dGhpcykucmVzdWx0U2VsZWN0b3IodmFsdWUsIGluZGV4KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZW1pdEZpbmFsKHJlc3VsdCk7XG4gIH1cblxuICBwcml2YXRlIF9lbWl0RmluYWwodmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBpZiAoIXRoaXMuX2VtaXR0ZWQpIHtcbiAgICAgIHRoaXMuX2VtaXR0ZWQgPSB0cnVlO1xuICAgICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5oYXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgIGlmICghdGhpcy5oYXNDb21wbGV0ZWQgJiYgdHlwZW9mIHRoaXMuZGVmYXVsdFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZGVzdGluYXRpb24ubmV4dCh0aGlzLmRlZmF1bHRWYWx1ZSk7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaGFzQ29tcGxldGVkKSB7XG4gICAgICBkZXN0aW5hdGlvbi5lcnJvcihuZXcgRW1wdHlFcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=