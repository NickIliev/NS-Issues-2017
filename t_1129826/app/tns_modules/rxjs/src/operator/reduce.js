"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {@link scan} followed by operator {@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link count}
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link scan}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
 * called on each source value.
 * @param {R} [seed] The initial accumulation value.
 * @return {Observable<R>} An Observable that emits a single value that is the
 * result of accumulating the values emitted by the source Observable.
 * @method reduce
 * @owner Observable
 */
function reduce(accumulator, seed) {
    var hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
}
exports.reduce = reduce;
var ReduceOperator = (function () {
    function ReduceOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ReduceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ReduceOperator;
}());
exports.ReduceOperator = ReduceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ReduceSubscriber = (function (_super) {
    __extends(ReduceSubscriber, _super);
    function ReduceSubscriber(destination, accumulator, seed, hasSeed) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        _this.hasValue = false;
        _this.acc = seed;
        if (!_this.hasSeed) {
            _this.index++;
        }
        return _this;
    }
    ReduceSubscriber.prototype._next = function (value) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            this._tryReduce(value);
        }
        else {
            this.acc = value;
            this.hasValue = true;
        }
    };
    ReduceSubscriber.prototype._tryReduce = function (value) {
        var result;
        try {
            result = this.accumulator(this.acc, value, this.index++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.acc = result;
    };
    ReduceSubscriber.prototype._complete = function () {
        if (this.hasValue || this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    };
    return ReduceSubscriber;
}(Subscriber_1.Subscriber));
exports.ReduceSubscriber = ReduceSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVkdWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBTTNDLG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUNILGdCQUFrRCxXQUFvRCxFQUFFLElBQVE7SUFDOUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLGdFQUFnRTtJQUNoRSxxREFBcUQ7SUFDckQsc0VBQXNFO0lBQ3RFLG9FQUFvRTtJQUNwRSwrRUFBK0U7SUFDL0UsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBWkQsd0JBWUM7QUFFRDtJQUNFLHdCQUFvQixXQUFvRCxFQUFVLElBQVEsRUFBVSxPQUF3QjtRQUF4Qix3QkFBQSxFQUFBLGVBQXdCO1FBQXhHLGdCQUFXLEdBQVgsV0FBVyxDQUF5QztRQUFVLFNBQUksR0FBSixJQUFJLENBQUk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtJQUFHLENBQUM7SUFFaEksNkJBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkcsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSx3Q0FBYztBQVEzQjs7OztHQUlHO0FBQ0g7SUFBNEMsb0NBQWE7SUFLdkQsMEJBQVksV0FBMEIsRUFDbEIsV0FBb0QsRUFDNUQsSUFBTyxFQUNDLE9BQWdCO1FBSHBDLFlBSUUsa0JBQU0sV0FBVyxDQUFDLFNBTW5CO1FBVG1CLGlCQUFXLEdBQVgsV0FBVyxDQUF5QztRQUVwRCxhQUFPLEdBQVAsT0FBTyxDQUFTO1FBUDVCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQU9oQyxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUVoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7O0lBQ0gsQ0FBQztJQUVTLGdDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFFTyxxQ0FBVSxHQUFsQixVQUFtQixLQUFRO1FBQ3pCLElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxvQ0FBUyxHQUFuQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUEzQ0QsQ0FBNEMsdUJBQVUsR0EyQ3JEO0FBM0NZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2U8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgYWNjdW11bGF0b3I6IChhY2M6IFQsIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBULCBzZWVkPzogVCk6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGFjY3VtdWxhdG9yOiAoYWNjOiBUW10sIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBUW10sIHNlZWQ6IFRbXSk6IE9ic2VydmFibGU8VFtdPjtcbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2U8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgYWNjdW11bGF0b3I6IChhY2M6IFIsIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSLCBzZWVkOiBSKTogT2JzZXJ2YWJsZTxSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogQXBwbGllcyBhbiBhY2N1bXVsYXRvciBmdW5jdGlvbiBvdmVyIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYW5kIHJldHVybnMgdGhlXG4gKiBhY2N1bXVsYXRlZCByZXN1bHQgd2hlbiB0aGUgc291cmNlIGNvbXBsZXRlcywgZ2l2ZW4gYW4gb3B0aW9uYWwgc2VlZCB2YWx1ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29tYmluZXMgdG9nZXRoZXIgYWxsIHZhbHVlcyBlbWl0dGVkIG9uIHRoZSBzb3VyY2UsXG4gKiB1c2luZyBhbiBhY2N1bXVsYXRvciBmdW5jdGlvbiB0aGF0IGtub3dzIGhvdyB0byBqb2luIGEgbmV3IHNvdXJjZSB2YWx1ZSBpbnRvXG4gKiB0aGUgYWNjdW11bGF0aW9uIGZyb20gdGhlIHBhc3QuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmVkdWNlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIExpa2VcbiAqIFtBcnJheS5wcm90b3R5cGUucmVkdWNlKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSksXG4gKiBgcmVkdWNlYCBhcHBsaWVzIGFuIGBhY2N1bXVsYXRvcmAgZnVuY3Rpb24gYWdhaW5zdCBhbiBhY2N1bXVsYXRpb24gYW5kIGVhY2hcbiAqIHZhbHVlIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSAoZnJvbSB0aGUgcGFzdCkgdG8gcmVkdWNlIGl0IHRvIGEgc2luZ2xlXG4gKiB2YWx1ZSwgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuIE5vdGUgdGhhdCBgcmVkdWNlYCB3aWxsIG9ubHkgZW1pdFxuICogb25lIHZhbHVlLCBvbmx5IHdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGNvbXBsZXRlcy4gSXQgaXMgZXF1aXZhbGVudCB0b1xuICogYXBwbHlpbmcgb3BlcmF0b3Ige0BsaW5rIHNjYW59IGZvbGxvd2VkIGJ5IG9wZXJhdG9yIHtAbGluayBsYXN0fS5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBhcHBsaWVzIGEgc3BlY2lmaWVkIGBhY2N1bXVsYXRvcmAgZnVuY3Rpb24gdG8gZWFjaFxuICogaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgYSBgc2VlZGAgdmFsdWUgaXMgc3BlY2lmaWVkLCB0aGVuXG4gKiB0aGF0IHZhbHVlIHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIGFjY3VtdWxhdG9yLiBJZiBubyBzZWVkXG4gKiB2YWx1ZSBpcyBzcGVjaWZpZWQsIHRoZSBmaXJzdCBpdGVtIG9mIHRoZSBzb3VyY2UgaXMgdXNlZCBhcyB0aGUgc2VlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db3VudCB0aGUgbnVtYmVyIG9mIGNsaWNrIGV2ZW50cyB0aGF0IGhhcHBlbmVkIGluIDUgc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3NJbkZpdmVTZWNvbmRzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpXG4gKiAgIC50YWtlVW50aWwoUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDAwKSk7XG4gKiB2YXIgb25lcyA9IGNsaWNrc0luRml2ZVNlY29uZHMubWFwVG8oMSk7XG4gKiB2YXIgc2VlZCA9IDA7XG4gKiB2YXIgY291bnQgPSBvbmVzLnJlZHVjZSgoYWNjLCBvbmUpID0+IGFjYyArIG9uZSwgc2VlZCk7XG4gKiBjb3VudC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY291bnR9XG4gKiBAc2VlIHtAbGluayBleHBhbmR9XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKiBAc2VlIHtAbGluayBzY2FufVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYWNjOiBSLCB2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IFJ9IGFjY3VtdWxhdG9yIFRoZSBhY2N1bXVsYXRvciBmdW5jdGlvblxuICogY2FsbGVkIG9uIGVhY2ggc291cmNlIHZhbHVlLlxuICogQHBhcmFtIHtSfSBbc2VlZF0gVGhlIGluaXRpYWwgYWNjdW11bGF0aW9uIHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2luZ2xlIHZhbHVlIHRoYXQgaXMgdGhlXG4gKiByZXN1bHQgb2YgYWNjdW11bGF0aW5nIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHJlZHVjZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZTxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBhY2N1bXVsYXRvcjogKGFjYzogUiwgdmFsdWU6IFQsIGluZGV4PzogbnVtYmVyKSA9PiBSLCBzZWVkPzogUik6IE9ic2VydmFibGU8Uj4ge1xuICBsZXQgaGFzU2VlZCA9IGZhbHNlO1xuICAvLyBwcm92aWRpbmcgYSBzZWVkIG9mIGB1bmRlZmluZWRgICpzaG91bGQqIGJlIHZhbGlkIGFuZCB0cmlnZ2VyXG4gIC8vIGhhc1NlZWQhIHNvIGRvbid0IHVzZSBgc2VlZCAhPT0gdW5kZWZpbmVkYCBjaGVja3MhXG4gIC8vIEZvciB0aGlzIHJlYXNvbiwgd2UgaGF2ZSB0byBjaGVjayBpdCBoZXJlIGF0IHRoZSBvcmlnaW5hbCBjYWxsIHNpdGVcbiAgLy8gb3RoZXJ3aXNlIGluc2lkZSBPcGVyYXRvci9TdWJzY3JpYmVyIHdlIHdvbid0IGtub3cgaWYgYHVuZGVmaW5lZGBcbiAgLy8gbWVhbnMgdGhleSBkaWRuJ3QgcHJvdmlkZSBhbnl0aGluZyBvciBpZiB0aGV5IGxpdGVyYWxseSBwcm92aWRlZCBgdW5kZWZpbmVkYFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgaGFzU2VlZCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZWR1Y2VPcGVyYXRvcihhY2N1bXVsYXRvciwgc2VlZCwgaGFzU2VlZCkpO1xufVxuXG5leHBvcnQgY2xhc3MgUmVkdWNlT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWNjdW11bGF0b3I6IChhY2M6IFIsIHZhbHVlOiBULCBpbmRleD86IG51bWJlcikgPT4gUiwgcHJpdmF0ZSBzZWVkPzogUiwgcHJpdmF0ZSBoYXNTZWVkOiBib29sZWFuID0gZmFsc2UpIHt9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFI+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFJlZHVjZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5hY2N1bXVsYXRvciwgdGhpcy5zZWVkLCB0aGlzLmhhc1NlZWQpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZHVjZVN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBhY2M6IFQgfCBSO1xuICBwcml2YXRlIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgYWNjdW11bGF0b3I6IChhY2M6IFIsIHZhbHVlOiBULCBpbmRleD86IG51bWJlcikgPT4gUixcbiAgICAgICAgICAgICAgc2VlZDogUixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBoYXNTZWVkOiBib29sZWFuKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWNjID0gc2VlZDtcblxuICAgIGlmICghdGhpcy5oYXNTZWVkKSB7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgaWYgKHRoaXMuaGFzVmFsdWUgfHwgKHRoaXMuaGFzVmFsdWUgPSB0aGlzLmhhc1NlZWQpKSB7XG4gICAgICB0aGlzLl90cnlSZWR1Y2UodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjYyA9IHZhbHVlO1xuICAgICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHJ5UmVkdWNlKHZhbHVlOiBUKSB7XG4gICAgbGV0IHJlc3VsdDogYW55O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmFjY3VtdWxhdG9yKDxSPnRoaXMuYWNjLCB2YWx1ZSwgdGhpcy5pbmRleCsrKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hY2MgPSByZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGlmICh0aGlzLmhhc1ZhbHVlIHx8IHRoaXMuaGFzU2VlZCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHRoaXMuYWNjKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=