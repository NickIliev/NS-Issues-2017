"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.add(subscribeToResult_1.subscribeToResult(_this, notifier));
        return _this;
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZVVudGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFrZVVudGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0Esc0RBQXFEO0FBRXJELCtEQUE4RDtBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFDSCxtQkFBa0QsUUFBeUI7SUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFGRCw4QkFFQztBQUVEO0lBQ0UsMkJBQW9CLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO0lBQzdDLENBQUM7SUFFRCxnQ0FBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXdDLHVDQUFxQjtJQUUzRCw2QkFBWSxXQUE0QixFQUNwQixRQUF5QjtRQUQ3QyxZQUVFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUUzQyxLQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFDLEtBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDOztJQUM5QyxDQUFDO0lBRUQsd0NBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFhLEVBQzVCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBK0I7UUFDeEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw0Q0FBYyxHQUFkO1FBQ0UsT0FBTztJQUNULENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBd0MsaUNBQWUsR0FpQnREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKipcbiAqIEVtaXRzIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgdW50aWwgYSBgbm90aWZpZXJgXG4gKiBPYnNlcnZhYmxlIGVtaXRzIGEgdmFsdWUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxldHMgdmFsdWVzIHBhc3MgdW50aWwgYSBzZWNvbmQgT2JzZXJ2YWJsZSxcbiAqIGBub3RpZmllcmAsIGVtaXRzIHNvbWV0aGluZy4gVGhlbiwgaXQgY29tcGxldGVzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3Rha2VVbnRpbC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGFrZVVudGlsYCBzdWJzY3JpYmVzIGFuZCBiZWdpbnMgbWlycm9yaW5nIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSXQgYWxzb1xuICogbW9uaXRvcnMgYSBzZWNvbmQgT2JzZXJ2YWJsZSwgYG5vdGlmaWVyYCB0aGF0IHlvdSBwcm92aWRlLiBJZiB0aGUgYG5vdGlmaWVyYFxuICogZW1pdHMgYSB2YWx1ZSBvciBhIGNvbXBsZXRlIG5vdGlmaWNhdGlvbiwgdGhlIG91dHB1dCBPYnNlcnZhYmxlIHN0b3BzXG4gKiBtaXJyb3JpbmcgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFuZCBjb21wbGV0ZXMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VGljayBldmVyeSBzZWNvbmQgdW50aWwgdGhlIGZpcnN0IGNsaWNrIGhhcHBlbnM8L2NhcHRpb24+XG4gKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBpbnRlcnZhbC50YWtlVW50aWwoY2xpY2tzKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqIEBzZWUge0BsaW5rIHRha2VMYXN0fVxuICogQHNlZSB7QGxpbmsgdGFrZVdoaWxlfVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IG5vdGlmaWVyIFRoZSBPYnNlcnZhYmxlIHdob3NlIGZpcnN0IGVtaXR0ZWQgdmFsdWUgd2lsbFxuICogY2F1c2UgdGhlIG91dHB1dCBPYnNlcnZhYmxlIG9mIGB0YWtlVW50aWxgIHRvIHN0b3AgZW1pdHRpbmcgdmFsdWVzIGZyb20gdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgdmFsdWVzIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB1bnRpbCBzdWNoIHRpbWUgYXMgYG5vdGlmaWVyYCBlbWl0cyBpdHMgZmlyc3QgdmFsdWUuXG4gKiBAbWV0aG9kIHRha2VVbnRpbFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRha2VVbnRpbDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBub3RpZmllcjogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFRha2VVbnRpbE9wZXJhdG9yKG5vdGlmaWVyKSk7XG59XG5cbmNsYXNzIFRha2VVbnRpbE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWVyOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgVGFrZVVudGlsU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLm5vdGlmaWVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFRha2VVbnRpbFN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpZXI6IE9ic2VydmFibGU8YW55Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBub3RpZmllcikpO1xuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICAvLyBub29wXG4gIH1cbn1cbiJdfQ==