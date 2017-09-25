"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
var EmptyObservable_1 = require("../observable/EmptyObservable");
/**
 * Emits only the last `count` values emitted by the source Observable.
 *
 * <span class="informal">Remembers the latest `count` values, then emits those
 * only when the source completes.</span>
 *
 * <img src="./img/takeLast.png" width="100%">
 *
 * `takeLast` returns an Observable that emits at most the last `count` values
 * emitted by the source Observable. If the source emits fewer than `count`
 * values then all of its values are emitted. This operator must wait until the
 * `complete` notification emission from the source in order to emit the `next`
 * values on the output Observable, because otherwise it is impossible to know
 * whether or not more values will be emitted on the source. For this reason,
 * all values are emitted synchronously, followed by the complete notification.
 *
 * @example <caption>Take the last 3 values of an Observable with many values</caption>
 * var many = Rx.Observable.range(1, 100);
 * var lastThree = many.takeLast(3);
 * lastThree.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of values to emit from the end of
 * the sequence of values emitted by the source Observable.
 * @return {Observable<T>} An Observable that emits at most the last count
 * values emitted by the source Observable.
 * @method takeLast
 * @owner Observable
 */
function takeLast(count) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeLastOperator(count));
    }
}
exports.takeLast = takeLast;
var TakeLastOperator = (function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeLastSubscriber = (function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZUxhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWtlTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUEyQztBQUMzQywyRUFBMEU7QUFDMUUsaUVBQWdFO0FBSWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILGtCQUFpRCxLQUFhO0lBQzVELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLGlDQUFlLEVBQUssQ0FBQztJQUNsQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztBQUNILENBQUM7QUFORCw0QkFNQztBQUVEO0lBQ0UsMEJBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLElBQUksaURBQXVCLENBQUM7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFFRCwrQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksa0JBQWtCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQW9DLHNDQUFhO0lBSS9DLDRCQUFZLFdBQTBCLEVBQVUsS0FBYTtRQUE3RCxZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUYrQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBSHJELFVBQUksR0FBYSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzdCLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBSTFCLENBQUM7SUFFUyxrQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFUyxzQ0FBUyxHQUFuQjtRQUNFLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV2QixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDakUsSUFBTSxJQUFJLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQztZQUV4QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMvQixJQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDSCxDQUFDO1FBRUQsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFyQ0QsQ0FBb0MsdUJBQVUsR0FxQzdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvciB9IGZyb20gJy4uL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuaW1wb3J0IHsgRW1wdHlPYnNlcnZhYmxlIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9FbXB0eU9ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogRW1pdHMgb25seSB0aGUgbGFzdCBgY291bnRgIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+UmVtZW1iZXJzIHRoZSBsYXRlc3QgYGNvdW50YCB2YWx1ZXMsIHRoZW4gZW1pdHMgdGhvc2VcbiAqIG9ubHkgd2hlbiB0aGUgc291cmNlIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy90YWtlTGFzdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGFrZUxhc3RgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGF0IG1vc3QgdGhlIGxhc3QgYGNvdW50YCB2YWx1ZXNcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiB0aGUgc291cmNlIGVtaXRzIGZld2VyIHRoYW4gYGNvdW50YFxuICogdmFsdWVzIHRoZW4gYWxsIG9mIGl0cyB2YWx1ZXMgYXJlIGVtaXR0ZWQuIFRoaXMgb3BlcmF0b3IgbXVzdCB3YWl0IHVudGlsIHRoZVxuICogYGNvbXBsZXRlYCBub3RpZmljYXRpb24gZW1pc3Npb24gZnJvbSB0aGUgc291cmNlIGluIG9yZGVyIHRvIGVtaXQgdGhlIGBuZXh0YFxuICogdmFsdWVzIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSwgYmVjYXVzZSBvdGhlcndpc2UgaXQgaXMgaW1wb3NzaWJsZSB0byBrbm93XG4gKiB3aGV0aGVyIG9yIG5vdCBtb3JlIHZhbHVlcyB3aWxsIGJlIGVtaXR0ZWQgb24gdGhlIHNvdXJjZS4gRm9yIHRoaXMgcmVhc29uLFxuICogYWxsIHZhbHVlcyBhcmUgZW1pdHRlZCBzeW5jaHJvbm91c2x5LCBmb2xsb3dlZCBieSB0aGUgY29tcGxldGUgbm90aWZpY2F0aW9uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRha2UgdGhlIGxhc3QgMyB2YWx1ZXMgb2YgYW4gT2JzZXJ2YWJsZSB3aXRoIG1hbnkgdmFsdWVzPC9jYXB0aW9uPlxuICogdmFyIG1hbnkgPSBSeC5PYnNlcnZhYmxlLnJhbmdlKDEsIDEwMCk7XG4gKiB2YXIgbGFzdFRocmVlID0gbWFueS50YWtlTGFzdCgzKTtcbiAqIGxhc3RUaHJlZS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqIEBzZWUge0BsaW5rIHRha2VVbnRpbH1cbiAqIEBzZWUge0BsaW5rIHRha2VXaGlsZX1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHRocm93cyB7QXJndW1lbnRPdXRPZlJhbmdlRXJyb3J9IFdoZW4gdXNpbmcgYHRha2VMYXN0KGkpYCwgaXQgZGVsaXZlcnMgYW5cbiAqIEFyZ3VtZW50T3V0T3JSYW5nZUVycm9yIHRvIHRoZSBPYnNlcnZlcidzIGBlcnJvcmAgY2FsbGJhY2sgaWYgYGkgPCAwYC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnQgVGhlIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcyB0byBlbWl0IGZyb20gdGhlIGVuZCBvZlxuICogdGhlIHNlcXVlbmNlIG9mIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhdCBtb3N0IHRoZSBsYXN0IGNvdW50XG4gKiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHRha2VMYXN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGFrZUxhc3Q8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY291bnQ6IG51bWJlcik6IE9ic2VydmFibGU8VD4ge1xuICBpZiAoY291bnQgPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEVtcHR5T2JzZXJ2YWJsZTxUPigpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IFRha2VMYXN0T3BlcmF0b3IoY291bnQpKTtcbiAgfVxufVxuXG5jbGFzcyBUYWtlTGFzdE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvdGFsOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy50b3RhbCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcjtcbiAgICB9XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFRha2VMYXN0U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnRvdGFsKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFRha2VMYXN0U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIHJpbmc6IEFycmF5PFQ+ID0gbmV3IEFycmF5KCk7XG4gIHByaXZhdGUgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sIHByaXZhdGUgdG90YWw6IG51bWJlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IHJpbmcgPSB0aGlzLnJpbmc7XG4gICAgY29uc3QgdG90YWwgPSB0aGlzLnRvdGFsO1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jb3VudCsrO1xuXG4gICAgaWYgKHJpbmcubGVuZ3RoIDwgdG90YWwpIHtcbiAgICAgIHJpbmcucHVzaCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQgJSB0b3RhbDtcbiAgICAgIHJpbmdbaW5kZXhdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgbGV0IGNvdW50ID0gdGhpcy5jb3VudDtcblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIGNvbnN0IHRvdGFsID0gdGhpcy5jb3VudCA+PSB0aGlzLnRvdGFsID8gdGhpcy50b3RhbCA6IHRoaXMuY291bnQ7XG4gICAgICBjb25zdCByaW5nICA9IHRoaXMucmluZztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IChjb3VudCsrKSAlIHRvdGFsO1xuICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHJpbmdbaWR4XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxufVxuIl19