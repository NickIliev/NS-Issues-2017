"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var Notification_1 = require("../Notification");
/**
 * Represents all of the notifications from the source Observable as `next`
 * emissions marked with their original types within {@link Notification}
 * objects.
 *
 * <span class="informal">Wraps `next`, `error` and `complete` emissions in
 * {@link Notification} objects, emitted as `next` on the output Observable.
 * </span>
 *
 * <img src="./img/materialize.png" width="100%">
 *
 * `materialize` returns an Observable that emits a `next` notification for each
 * `next`, `error`, or `complete` emission of the source Observable. When the
 * source Observable emits `complete`, the output Observable will emit `next` as
 * a Notification of type "complete", and then it will emit `complete` as well.
 * When the source Observable emits `error`, the output will emit `next` as a
 * Notification of type "error", and then `complete`.
 *
 * This operator is useful for producing metadata of the source Observable, to
 * be consumed as `next` emissions. Use it in conjunction with
 * {@link dematerialize}.
 *
 * @example <caption>Convert a faulty Observable to an Observable of Notifications</caption>
 * var letters = Rx.Observable.of('a', 'b', 13, 'd');
 * var upperCase = letters.map(x => x.toUpperCase());
 * var materialized = upperCase.materialize();
 * materialized.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
 * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
 * // - Notification {kind: "E", value: undefined, error: TypeError:
 * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
 * //   [as project] (http://1…, hasValue: false}
 *
 * @see {@link Notification}
 * @see {@link dematerialize}
 *
 * @return {Observable<Notification<T>>} An Observable that emits
 * {@link Notification} objects that wrap the original emissions from the source
 * Observable with metadata.
 * @method materialize
 * @owner Observable
 */
function materialize() {
    return this.lift(new MaterializeOperator());
}
exports.materialize = materialize;
var MaterializeOperator = (function () {
    function MaterializeOperator() {
    }
    MaterializeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MaterializeSubscriber = (function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification_1.Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRlcmlhbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDRDQUEyQztBQUMzQyxnREFBK0M7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFDSDtJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFGRCxrQ0FFQztBQUVEO0lBQUE7SUFJQSxDQUFDO0lBSEMsa0NBQUksR0FBSixVQUFLLFVBQXVDLEVBQUUsTUFBVztRQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFBdUMseUNBQWE7SUFDbEQsK0JBQVksV0FBd0M7ZUFDbEQsa0JBQU0sV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFFUyxxQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRVMsc0NBQU0sR0FBaEIsVUFBaUIsR0FBUTtRQUN2QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRCxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVTLHlDQUFTLEdBQW5CO1FBQ0UsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxXQUFXLENBQUMsSUFBSSxDQUFDLDJCQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNoRCxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUF1Qyx1QkFBVSxHQW9CaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL05vdGlmaWNhdGlvbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbGwgb2YgdGhlIG5vdGlmaWNhdGlvbnMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgYXMgYG5leHRgXG4gKiBlbWlzc2lvbnMgbWFya2VkIHdpdGggdGhlaXIgb3JpZ2luYWwgdHlwZXMgd2l0aGluIHtAbGluayBOb3RpZmljYXRpb259XG4gKiBvYmplY3RzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XcmFwcyBgbmV4dGAsIGBlcnJvcmAgYW5kIGBjb21wbGV0ZWAgZW1pc3Npb25zIGluXG4gKiB7QGxpbmsgTm90aWZpY2F0aW9ufSBvYmplY3RzLCBlbWl0dGVkIGFzIGBuZXh0YCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKiA8L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tYXRlcmlhbGl6ZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgbWF0ZXJpYWxpemVgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgYG5leHRgIG5vdGlmaWNhdGlvbiBmb3IgZWFjaFxuICogYG5leHRgLCBgZXJyb3JgLCBvciBgY29tcGxldGVgIGVtaXNzaW9uIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gV2hlbiB0aGVcbiAqIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzIGBjb21wbGV0ZWAsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSB3aWxsIGVtaXQgYG5leHRgIGFzXG4gKiBhIE5vdGlmaWNhdGlvbiBvZiB0eXBlIFwiY29tcGxldGVcIiwgYW5kIHRoZW4gaXQgd2lsbCBlbWl0IGBjb21wbGV0ZWAgYXMgd2VsbC5cbiAqIFdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzIGBlcnJvcmAsIHRoZSBvdXRwdXQgd2lsbCBlbWl0IGBuZXh0YCBhcyBhXG4gKiBOb3RpZmljYXRpb24gb2YgdHlwZSBcImVycm9yXCIsIGFuZCB0aGVuIGBjb21wbGV0ZWAuXG4gKlxuICogVGhpcyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIHByb2R1Y2luZyBtZXRhZGF0YSBvZiB0aGUgc291cmNlIE9ic2VydmFibGUsIHRvXG4gKiBiZSBjb25zdW1lZCBhcyBgbmV4dGAgZW1pc3Npb25zLiBVc2UgaXQgaW4gY29uanVuY3Rpb24gd2l0aFxuICoge0BsaW5rIGRlbWF0ZXJpYWxpemV9LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnQgYSBmYXVsdHkgT2JzZXJ2YWJsZSB0byBhbiBPYnNlcnZhYmxlIG9mIE5vdGlmaWNhdGlvbnM8L2NhcHRpb24+XG4gKiB2YXIgbGV0dGVycyA9IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsIDEzLCAnZCcpO1xuICogdmFyIHVwcGVyQ2FzZSA9IGxldHRlcnMubWFwKHggPT4geC50b1VwcGVyQ2FzZSgpKTtcbiAqIHZhciBtYXRlcmlhbGl6ZWQgPSB1cHBlckNhc2UubWF0ZXJpYWxpemUoKTtcbiAqIG1hdGVyaWFsaXplZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nOlxuICogLy8gLSBOb3RpZmljYXRpb24ge2tpbmQ6IFwiTlwiLCB2YWx1ZTogXCJBXCIsIGVycm9yOiB1bmRlZmluZWQsIGhhc1ZhbHVlOiB0cnVlfVxuICogLy8gLSBOb3RpZmljYXRpb24ge2tpbmQ6IFwiTlwiLCB2YWx1ZTogXCJCXCIsIGVycm9yOiB1bmRlZmluZWQsIGhhc1ZhbHVlOiB0cnVlfVxuICogLy8gLSBOb3RpZmljYXRpb24ge2tpbmQ6IFwiRVwiLCB2YWx1ZTogdW5kZWZpbmVkLCBlcnJvcjogVHlwZUVycm9yOlxuICogLy8gICB4LnRvVXBwZXJDYXNlIGlzIG5vdCBhIGZ1bmN0aW9uIGF0IE1hcFN1YnNjcmliZXIubGV0dGVycy5tYXAueFxuICogLy8gICBbYXMgcHJvamVjdF0gKGh0dHA6Ly8x4oCmLCBoYXNWYWx1ZTogZmFsc2V9XG4gKlxuICogQHNlZSB7QGxpbmsgTm90aWZpY2F0aW9ufVxuICogQHNlZSB7QGxpbmsgZGVtYXRlcmlhbGl6ZX1cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbjxUPj59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0c1xuICoge0BsaW5rIE5vdGlmaWNhdGlvbn0gb2JqZWN0cyB0aGF0IHdyYXAgdGhlIG9yaWdpbmFsIGVtaXNzaW9ucyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgd2l0aCBtZXRhZGF0YS5cbiAqIEBtZXRob2QgbWF0ZXJpYWxpemVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRlcmlhbGl6ZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb248VD4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgTWF0ZXJpYWxpemVPcGVyYXRvcigpKTtcbn1cblxuY2xhc3MgTWF0ZXJpYWxpemVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIE5vdGlmaWNhdGlvbjxUPj4ge1xuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Tm90aWZpY2F0aW9uPFQ+Piwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBNYXRlcmlhbGl6ZVN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBNYXRlcmlhbGl6ZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Tm90aWZpY2F0aW9uPFQ+Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChOb3RpZmljYXRpb24uY3JlYXRlTmV4dCh2YWx1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSkge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KE5vdGlmaWNhdGlvbi5jcmVhdGVFcnJvcihlcnIpKTtcbiAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgZGVzdGluYXRpb24ubmV4dChOb3RpZmljYXRpb24uY3JlYXRlQ29tcGxldGUoKSk7XG4gICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxufVxuIl19