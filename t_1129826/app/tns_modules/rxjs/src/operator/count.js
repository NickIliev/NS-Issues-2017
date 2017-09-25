"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Counts the number of emissions on the source and emits that number when the
 * source completes.
 *
 * <span class="informal">Tells how many values were emitted, when the source
 * completes.</span>
 *
 * <img src="./img/count.png" width="100%">
 *
 * `count` transforms an Observable that emits values into an Observable that
 * emits a single value that represents the number of values emitted by the
 * source Observable. If the source Observable terminates with an error, `count`
 * will pass this error notification along without emitting a value first. If
 * the source Observable does not terminate at all, `count` will neither emit
 * a value nor terminate. This operator takes an optional `predicate` function
 * as argument, in which case the output emission will represent the number of
 * source values that matched `true` with the `predicate`.
 *
 * @example <caption>Counts how many seconds have passed before the first click happened</caption>
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var secondsBeforeClick = seconds.takeUntil(clicks);
 * var result = secondsBeforeClick.count();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Counts how many odd numbers are there between 1 and 7</caption>
 * var numbers = Rx.Observable.range(1, 7);
 * var result = numbers.count(i => i % 2 === 1);
 * result.subscribe(x => console.log(x));
 *
 * // Results in:
 * // 4
 *
 * @see {@link max}
 * @see {@link min}
 * @see {@link reduce}
 *
 * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
 * boolean function to select what values are to be counted. It is provided with
 * arguments of:
 * - `value`: the value from the source Observable.
 * - `index`: the (zero-based) "index" of the value from the source Observable.
 * - `source`: the source Observable instance itself.
 * @return {Observable} An Observable of one number that represents the count as
 * described above.
 * @method count
 * @owner Observable
 */
function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
}
exports.count = count;
var CountOperator = (function () {
    function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CountSubscriber = (function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDRDQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ0c7QUFDSCxlQUE4QyxTQUF1RTtJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRkQsc0JBRUM7QUFFRDtJQUNFLHVCQUFvQixTQUF1RSxFQUN2RSxNQUFzQjtRQUR0QixjQUFTLEdBQVQsU0FBUyxDQUE4RDtRQUN2RSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUMxQyxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLFVBQThCLEVBQUUsTUFBVztRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFpQyxtQ0FBYTtJQUk1Qyx5QkFBWSxXQUE2QixFQUNyQixTQUF1RSxFQUN2RSxNQUFzQjtRQUYxQyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixlQUFTLEdBQVQsU0FBUyxDQUE4RDtRQUN2RSxZQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUxsQyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBTTFCLENBQUM7SUFFUywrQkFBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUVPLHVDQUFhLEdBQXJCLFVBQXNCLEtBQVE7UUFDNUIsSUFBSSxNQUFXLENBQUM7UUFFaEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBckNELENBQWlDLHVCQUFVLEdBcUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuLi9PYnNlcnZlcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbi8qKlxuICogQ291bnRzIHRoZSBudW1iZXIgb2YgZW1pc3Npb25zIG9uIHRoZSBzb3VyY2UgYW5kIGVtaXRzIHRoYXQgbnVtYmVyIHdoZW4gdGhlXG4gKiBzb3VyY2UgY29tcGxldGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5UZWxscyBob3cgbWFueSB2YWx1ZXMgd2VyZSBlbWl0dGVkLCB3aGVuIHRoZSBzb3VyY2VcbiAqIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9jb3VudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgY291bnRgIHRyYW5zZm9ybXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHZhbHVlcyBpbnRvIGFuIE9ic2VydmFibGUgdGhhdFxuICogZW1pdHMgYSBzaW5nbGUgdmFsdWUgdGhhdCByZXByZXNlbnRzIHRoZSBudW1iZXIgb2YgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRlcm1pbmF0ZXMgd2l0aCBhbiBlcnJvciwgYGNvdW50YFxuICogd2lsbCBwYXNzIHRoaXMgZXJyb3Igbm90aWZpY2F0aW9uIGFsb25nIHdpdGhvdXQgZW1pdHRpbmcgYSB2YWx1ZSBmaXJzdC4gSWZcbiAqIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBkb2VzIG5vdCB0ZXJtaW5hdGUgYXQgYWxsLCBgY291bnRgIHdpbGwgbmVpdGhlciBlbWl0XG4gKiBhIHZhbHVlIG5vciB0ZXJtaW5hdGUuIFRoaXMgb3BlcmF0b3IgdGFrZXMgYW4gb3B0aW9uYWwgYHByZWRpY2F0ZWAgZnVuY3Rpb25cbiAqIGFzIGFyZ3VtZW50LCBpbiB3aGljaCBjYXNlIHRoZSBvdXRwdXQgZW1pc3Npb24gd2lsbCByZXByZXNlbnQgdGhlIG51bWJlciBvZlxuICogc291cmNlIHZhbHVlcyB0aGF0IG1hdGNoZWQgYHRydWVgIHdpdGggdGhlIGBwcmVkaWNhdGVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvdW50cyBob3cgbWFueSBzZWNvbmRzIGhhdmUgcGFzc2VkIGJlZm9yZSB0aGUgZmlyc3QgY2xpY2sgaGFwcGVuZWQ8L2NhcHRpb24+XG4gKiB2YXIgc2Vjb25kcyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHNlY29uZHNCZWZvcmVDbGljayA9IHNlY29uZHMudGFrZVVudGlsKGNsaWNrcyk7XG4gKiB2YXIgcmVzdWx0ID0gc2Vjb25kc0JlZm9yZUNsaWNrLmNvdW50KCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvdW50cyBob3cgbWFueSBvZGQgbnVtYmVycyBhcmUgdGhlcmUgYmV0d2VlbiAxIGFuZCA3PC9jYXB0aW9uPlxuICogdmFyIG51bWJlcnMgPSBSeC5PYnNlcnZhYmxlLnJhbmdlKDEsIDcpO1xuICogdmFyIHJlc3VsdCA9IG51bWJlcnMuY291bnQoaSA9PiBpICUgMiA9PT0gMSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW46XG4gKiAvLyA0XG4gKlxuICogQHNlZSB7QGxpbmsgbWF4fVxuICogQHNlZSB7QGxpbmsgbWlufVxuICogQHNlZSB7QGxpbmsgcmVkdWNlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGk6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KTogYm9vbGVhbn0gW3ByZWRpY2F0ZV0gQVxuICogYm9vbGVhbiBmdW5jdGlvbiB0byBzZWxlY3Qgd2hhdCB2YWx1ZXMgYXJlIHRvIGJlIGNvdW50ZWQuIEl0IGlzIHByb3ZpZGVkIHdpdGhcbiAqIGFyZ3VtZW50cyBvZjpcbiAqIC0gYHZhbHVlYDogdGhlIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogLSBgaW5kZXhgOiB0aGUgKHplcm8tYmFzZWQpIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiAtIGBzb3VyY2VgOiB0aGUgc291cmNlIE9ic2VydmFibGUgaW5zdGFuY2UgaXRzZWxmLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiBvbmUgbnVtYmVyIHRoYXQgcmVwcmVzZW50cyB0aGUgY291bnQgYXNcbiAqIGRlc2NyaWJlZCBhYm92ZS5cbiAqIEBtZXRob2QgY291bnRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3VudDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IENvdW50T3BlcmF0b3IocHJlZGljYXRlLCB0aGlzKSk7XG59XG5cbmNsYXNzIENvdW50T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBudW1iZXI+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U/OiBPYnNlcnZhYmxlPFQ+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8bnVtYmVyPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBDb3VudFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcmVkaWNhdGUsIHRoaXMuc291cmNlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIENvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGNvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBPYnNlcnZlcjxudW1iZXI+LFxuICAgICAgICAgICAgICBwcml2YXRlIHByZWRpY2F0ZT86ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZT86IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wcmVkaWNhdGUpIHtcbiAgICAgIHRoaXMuX3RyeVByZWRpY2F0ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY291bnQrKztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cnlQcmVkaWNhdGUodmFsdWU6IFQpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG5cbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUodmFsdWUsIHRoaXMuaW5kZXgrKywgdGhpcy5zb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHRoaXMuY291bnQrKztcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh0aGlzLmNvdW50KTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==