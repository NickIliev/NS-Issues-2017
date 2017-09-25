"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
/**
 * Skip the last `count` values emitted by the source Observable.
 *
 * <img src="./img/skipLast.png" width="100%">
 *
 * `skipLast` returns an Observable that accumulates a queue with a length
 * enough to store the first `count` values. As more values are received,
 * values are taken from the front of the queue and produced on the result
 * sequence. This causes values to be delayed.
 *
 * @example <caption>Skip the last 2 values of an Observable with many values</caption>
 * var many = Rx.Observable.range(1, 5);
 * var skipLastTwo = many.skipLast(2);
 * skipLastTwo.subscribe(x => console.log(x));
 *
 * // Results in:
 * // 1 2 3
 *
 * @see {@link skip}
 * @see {@link skipUntil}
 * @see {@link skipWhile}
 * @see {@link take}
 *
 * @throws {ArgumentOutOfRangeError} When using `skipLast(i)`, it throws
 * ArgumentOutOrRangeError if `i < 0`.
 *
 * @param {number} count Number of elements to skip from the end of the source Observable.
 * @returns {Observable<T>} An Observable that skips the last count values
 * emitted by the source Observable.
 * @method skipLast
 * @owner Observable
 */
function skipLast(count) {
    return this.lift(new SkipLastOperator(count));
}
exports.skipLast = skipLast;
var SkipLastOperator = (function () {
    function SkipLastOperator(_skipCount) {
        this._skipCount = _skipCount;
        if (this._skipCount < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    SkipLastOperator.prototype.call = function (subscriber, source) {
        if (this._skipCount === 0) {
            // If we don't want to skip any values then just subscribe
            // to Subscriber without any further logic.
            return source.subscribe(new Subscriber_1.Subscriber(subscriber));
        }
        else {
            return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
        }
    };
    return SkipLastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipLastSubscriber = (function (_super) {
    __extends(SkipLastSubscriber, _super);
    function SkipLastSubscriber(destination, _skipCount) {
        var _this = _super.call(this, destination) || this;
        _this._skipCount = _skipCount;
        _this._count = 0;
        _this._ring = new Array(_skipCount);
        return _this;
    }
    SkipLastSubscriber.prototype._next = function (value) {
        var skipCount = this._skipCount;
        var count = this._count++;
        if (count < skipCount) {
            this._ring[count] = value;
        }
        else {
            var currentIndex = count % skipCount;
            var ring = this._ring;
            var oldValue = ring[currentIndex];
            ring[currentIndex] = value;
            this.destination.next(oldValue);
        }
    };
    return SkipLastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcExhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJza2lwTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUEyQztBQUMzQywyRUFBMEU7QUFJMUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxrQkFBaUQsS0FBYTtJQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDRSwwQkFBb0IsVUFBa0I7UUFBbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxJQUFJLGlEQUF1QixDQUFDO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsMERBQTBEO1lBQzFELDJDQUEyQztZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFvQyxzQ0FBYTtJQUkvQyw0QkFBWSxXQUEwQixFQUFVLFVBQWtCO1FBQWxFLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBSCtDLGdCQUFVLEdBQVYsVUFBVSxDQUFRO1FBRjFELFlBQU0sR0FBVyxDQUFDLENBQUM7UUFJekIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBSSxVQUFVLENBQUMsQ0FBQzs7SUFDeEMsQ0FBQztJQUVTLGtDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU1QixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLFlBQVksR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF4QkQsQ0FBb0MsdUJBQVUsR0F3QjdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvciB9IGZyb20gJy4uL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogU2tpcCB0aGUgbGFzdCBgY291bnRgIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3NraXBMYXN0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBza2lwTGFzdGAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgYWNjdW11bGF0ZXMgYSBxdWV1ZSB3aXRoIGEgbGVuZ3RoXG4gKiBlbm91Z2ggdG8gc3RvcmUgdGhlIGZpcnN0IGBjb3VudGAgdmFsdWVzLiBBcyBtb3JlIHZhbHVlcyBhcmUgcmVjZWl2ZWQsXG4gKiB2YWx1ZXMgYXJlIHRha2VuIGZyb20gdGhlIGZyb250IG9mIHRoZSBxdWV1ZSBhbmQgcHJvZHVjZWQgb24gdGhlIHJlc3VsdFxuICogc2VxdWVuY2UuIFRoaXMgY2F1c2VzIHZhbHVlcyB0byBiZSBkZWxheWVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNraXAgdGhlIGxhc3QgMiB2YWx1ZXMgb2YgYW4gT2JzZXJ2YWJsZSB3aXRoIG1hbnkgdmFsdWVzPC9jYXB0aW9uPlxuICogdmFyIG1hbnkgPSBSeC5PYnNlcnZhYmxlLnJhbmdlKDEsIDUpO1xuICogdmFyIHNraXBMYXN0VHdvID0gbWFueS5za2lwTGFzdCgyKTtcbiAqIHNraXBMYXN0VHdvLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluOlxuICogLy8gMSAyIDNcbiAqXG4gKiBAc2VlIHtAbGluayBza2lwfVxuICogQHNlZSB7QGxpbmsgc2tpcFVudGlsfVxuICogQHNlZSB7QGxpbmsgc2tpcFdoaWxlfVxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqXG4gKiBAdGhyb3dzIHtBcmd1bWVudE91dE9mUmFuZ2VFcnJvcn0gV2hlbiB1c2luZyBgc2tpcExhc3QoaSlgLCBpdCB0aHJvd3NcbiAqIEFyZ3VtZW50T3V0T3JSYW5nZUVycm9yIGlmIGBpIDwgMGAuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGZyb20gdGhlIGVuZCBvZiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IHNraXBzIHRoZSBsYXN0IGNvdW50IHZhbHVlc1xuICogZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHNraXBMYXN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2tpcExhc3Q8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY291bnQ6IG51bWJlcik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTa2lwTGFzdE9wZXJhdG9yKGNvdW50KSk7XG59XG5cbmNsYXNzIFNraXBMYXN0T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NraXBDb3VudDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NraXBDb3VudCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcjtcbiAgICB9XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgaWYgKHRoaXMuX3NraXBDb3VudCA9PT0gMCkge1xuICAgICAgLy8gSWYgd2UgZG9uJ3Qgd2FudCB0byBza2lwIGFueSB2YWx1ZXMgdGhlbiBqdXN0IHN1YnNjcmliZVxuICAgICAgLy8gdG8gU3Vic2NyaWJlciB3aXRob3V0IGFueSBmdXJ0aGVyIGxvZ2ljLlxuICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgU2tpcExhc3RTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuX3NraXBDb3VudCkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgU2tpcExhc3RTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgX3Jpbmc6IFRbXTtcbiAgcHJpdmF0ZSBfY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sIHByaXZhdGUgX3NraXBDb3VudDogbnVtYmVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuX3JpbmcgPSBuZXcgQXJyYXk8VD4oX3NraXBDb3VudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBza2lwQ291bnQgPSB0aGlzLl9za2lwQ291bnQ7XG4gICAgY29uc3QgY291bnQgPSB0aGlzLl9jb3VudCsrO1xuXG4gICAgaWYgKGNvdW50IDwgc2tpcENvdW50KSB7XG4gICAgICB0aGlzLl9yaW5nW2NvdW50XSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBjb3VudCAlIHNraXBDb3VudDtcbiAgICAgIGNvbnN0IHJpbmcgPSB0aGlzLl9yaW5nO1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSByaW5nW2N1cnJlbnRJbmRleF07XG5cbiAgICAgIHJpbmdbY3VycmVudEluZGV4XSA9IHZhbHVlO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KG9sZFZhbHVlKTtcbiAgICB9XG4gIH1cbn0iXX0=