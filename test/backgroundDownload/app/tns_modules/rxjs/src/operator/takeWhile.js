"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Emits values emitted by the source Observable so long as each value satisfies
 * the given `predicate`, and then completes as soon as this `predicate` is not
 * satisfied.
 *
 * <span class="informal">Takes values from the source only while they pass the
 * condition given. When the first value does not satisfy, it completes.</span>
 *
 * <img src="./img/takeWhile.png" width="100%">
 *
 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
 * emitted on the source is given to the `predicate` function which returns a
 * boolean, representing a condition to be satisfied by the source values. The
 * output Observable emits the source values until such time as the `predicate`
 * returns false, at which point `takeWhile` stops mirroring the source
 * Observable and completes the output Observable.
 *
 * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.takeWhile(ev => ev.clientX > 200);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates a value emitted by the source Observable and returns a boolean.
 * Also takes the (zero-based) index as the second argument.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable so long as each value satisfies the condition defined by the
 * `predicate`, then completes.
 * @method takeWhile
 * @owner Observable
 */
function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
}
exports.takeWhile = takeWhile;
var TakeWhileOperator = (function () {
    function TakeWhileOperator(predicate) {
        this.predicate = predicate;
    }
    TakeWhileOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
    };
    return TakeWhileOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeWhileSubscriber = (function (_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.index = 0;
        return _this;
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;
        try {
            result = this.predicate(value, this.index++);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        }
        else {
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZVdoaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFrZVdoaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBRzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILG1CQUFrRCxTQUErQztJQUMvRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUZELDhCQUVDO0FBRUQ7SUFDRSwyQkFBb0IsU0FBK0M7UUFBL0MsY0FBUyxHQUFULFNBQVMsQ0FBc0M7SUFDbkUsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFFRDs7OztHQUlHO0FBQ0g7SUFBcUMsdUNBQWE7SUFHaEQsNkJBQVksV0FBMEIsRUFDbEIsU0FBK0M7UUFEbkUsWUFFRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFGbUIsZUFBUyxHQUFULFNBQVMsQ0FBc0M7UUFIM0QsV0FBSyxHQUFXLENBQUMsQ0FBQzs7SUFLMUIsQ0FBQztJQUVTLG1DQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksTUFBZSxDQUFDO1FBQ3BCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyw0Q0FBYyxHQUF0QixVQUF1QixLQUFRLEVBQUUsZUFBd0I7UUFDdkQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBNUJELENBQXFDLHVCQUFVLEdBNEI5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogRW1pdHMgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHNvIGxvbmcgYXMgZWFjaCB2YWx1ZSBzYXRpc2ZpZXNcbiAqIHRoZSBnaXZlbiBgcHJlZGljYXRlYCwgYW5kIHRoZW4gY29tcGxldGVzIGFzIHNvb24gYXMgdGhpcyBgcHJlZGljYXRlYCBpcyBub3RcbiAqIHNhdGlzZmllZC5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VGFrZXMgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBvbmx5IHdoaWxlIHRoZXkgcGFzcyB0aGVcbiAqIGNvbmRpdGlvbiBnaXZlbi4gV2hlbiB0aGUgZmlyc3QgdmFsdWUgZG9lcyBub3Qgc2F0aXNmeSwgaXQgY29tcGxldGVzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3Rha2VXaGlsZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGFrZVdoaWxlYCBzdWJzY3JpYmVzIGFuZCBiZWdpbnMgbWlycm9yaW5nIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gRWFjaCB2YWx1ZVxuICogZW1pdHRlZCBvbiB0aGUgc291cmNlIGlzIGdpdmVuIHRvIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFcbiAqIGJvb2xlYW4sIHJlcHJlc2VudGluZyBhIGNvbmRpdGlvbiB0byBiZSBzYXRpc2ZpZWQgYnkgdGhlIHNvdXJjZSB2YWx1ZXMuIFRoZVxuICogb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgdGhlIHNvdXJjZSB2YWx1ZXMgdW50aWwgc3VjaCB0aW1lIGFzIHRoZSBgcHJlZGljYXRlYFxuICogcmV0dXJucyBmYWxzZSwgYXQgd2hpY2ggcG9pbnQgYHRha2VXaGlsZWAgc3RvcHMgbWlycm9yaW5nIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYW5kIGNvbXBsZXRlcyB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGljayBldmVudHMgb25seSB3aGlsZSB0aGUgY2xpZW50WCBwcm9wZXJ0eSBpcyBncmVhdGVyIHRoYW4gMjAwPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MudGFrZVdoaWxlKGV2ID0+IGV2LmNsaWVudFggPiAyMDApO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICogQHNlZSB7QGxpbmsgdGFrZUxhc3R9XG4gKiBAc2VlIHtAbGluayB0YWtlVW50aWx9XG4gKiBAc2VlIHtAbGluayBza2lwfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBib29sZWFufSBwcmVkaWNhdGUgQSBmdW5jdGlvbiB0aGF0XG4gKiBldmFsdWF0ZXMgYSB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgcmV0dXJucyBhIGJvb2xlYW4uXG4gKiBBbHNvIHRha2VzIHRoZSAoemVyby1iYXNlZCkgaW5kZXggYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgdmFsdWVzIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBzbyBsb25nIGFzIGVhY2ggdmFsdWUgc2F0aXNmaWVzIHRoZSBjb25kaXRpb24gZGVmaW5lZCBieSB0aGVcbiAqIGBwcmVkaWNhdGVgLCB0aGVuIGNvbXBsZXRlcy5cbiAqIEBtZXRob2QgdGFrZVdoaWxlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGFrZVdoaWxlPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBib29sZWFuKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFRha2VXaGlsZU9wZXJhdG9yKHByZWRpY2F0ZSkpO1xufVxuXG5jbGFzcyBUYWtlV2hpbGVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBUYWtlV2hpbGVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJlZGljYXRlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFRha2VXaGlsZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBsZXQgcmVzdWx0OiBib29sZWFuO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnByZWRpY2F0ZSh2YWx1ZSwgdGhpcy5pbmRleCsrKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubmV4dE9yQ29tcGxldGUodmFsdWUsIHJlc3VsdCk7XG4gIH1cblxuICBwcml2YXRlIG5leHRPckNvbXBsZXRlKHZhbHVlOiBULCBwcmVkaWNhdGVSZXN1bHQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgaWYgKEJvb2xlYW4ocHJlZGljYXRlUmVzdWx0KSkge1xuICAgICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=