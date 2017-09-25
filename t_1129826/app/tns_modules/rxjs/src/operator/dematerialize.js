"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Converts an Observable of {@link Notification} objects into the emissions
 * that they represent.
 *
 * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
 * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
 *
 * <img src="./img/dematerialize.png" width="100%">
 *
 * `dematerialize` is assumed to operate an Observable that only emits
 * {@link Notification} objects as `next` emissions, and does not emit any
 * `error`. Such Observable is the output of a `materialize` operation. Those
 * notifications are then unwrapped using the metadata they contain, and emitted
 * as `next`, `error`, and `complete` on the output Observable.
 *
 * Use this operator in conjunction with {@link materialize}.
 *
 * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
 * var notifA = new Rx.Notification('N', 'A');
 * var notifB = new Rx.Notification('N', 'B');
 * var notifE = new Rx.Notification('E', void 0,
 *   new TypeError('x.toUpperCase is not a function')
 * );
 * var materialized = Rx.Observable.of(notifA, notifB, notifE);
 * var upperCase = materialized.dematerialize();
 * upperCase.subscribe(x => console.log(x), e => console.error(e));
 *
 * // Results in:
 * // A
 * // B
 * // TypeError: x.toUpperCase is not a function
 *
 * @see {@link Notification}
 * @see {@link materialize}
 *
 * @return {Observable} An Observable that emits items and notifications
 * embedded in Notification objects emitted by the source Observable.
 * @method dematerialize
 * @owner Observable
 */
function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}
exports.dematerialize = dematerialize;
var DeMaterializeOperator = (function () {
    function DeMaterializeOperator() {
    }
    DeMaterializeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DeMaterializeSubscriber(subscriber));
    };
    return DeMaterializeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DeMaterializeSubscriber = (function (_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtYXRlcmlhbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbWF0ZXJpYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBMkM7QUFHM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUNIO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELHNDQUVDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFIQyxvQ0FBSSxHQUFKLFVBQUssVUFBMkIsRUFBRSxNQUFXO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFtRSwyQ0FBYTtJQUM5RSxpQ0FBWSxXQUE0QjtlQUN0QyxrQkFBTSxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVTLHVDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBbUUsdUJBQVUsR0FRNUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL05vdGlmaWNhdGlvbic7XG5cbi8qKlxuICogQ29udmVydHMgYW4gT2JzZXJ2YWJsZSBvZiB7QGxpbmsgTm90aWZpY2F0aW9ufSBvYmplY3RzIGludG8gdGhlIGVtaXNzaW9uc1xuICogdGhhdCB0aGV5IHJlcHJlc2VudC5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VW53cmFwcyB7QGxpbmsgTm90aWZpY2F0aW9ufSBvYmplY3RzIGFzIGFjdHVhbCBgbmV4dGAsXG4gKiBgZXJyb3JgIGFuZCBgY29tcGxldGVgIGVtaXNzaW9ucy4gVGhlIG9wcG9zaXRlIG9mIHtAbGluayBtYXRlcmlhbGl6ZX0uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZGVtYXRlcmlhbGl6ZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgZGVtYXRlcmlhbGl6ZWAgaXMgYXNzdW1lZCB0byBvcGVyYXRlIGFuIE9ic2VydmFibGUgdGhhdCBvbmx5IGVtaXRzXG4gKiB7QGxpbmsgTm90aWZpY2F0aW9ufSBvYmplY3RzIGFzIGBuZXh0YCBlbWlzc2lvbnMsIGFuZCBkb2VzIG5vdCBlbWl0IGFueVxuICogYGVycm9yYC4gU3VjaCBPYnNlcnZhYmxlIGlzIHRoZSBvdXRwdXQgb2YgYSBgbWF0ZXJpYWxpemVgIG9wZXJhdGlvbi4gVGhvc2VcbiAqIG5vdGlmaWNhdGlvbnMgYXJlIHRoZW4gdW53cmFwcGVkIHVzaW5nIHRoZSBtZXRhZGF0YSB0aGV5IGNvbnRhaW4sIGFuZCBlbWl0dGVkXG4gKiBhcyBgbmV4dGAsIGBlcnJvcmAsIGFuZCBgY29tcGxldGVgIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBVc2UgdGhpcyBvcGVyYXRvciBpbiBjb25qdW5jdGlvbiB3aXRoIHtAbGluayBtYXRlcmlhbGl6ZX0uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q29udmVydCBhbiBPYnNlcnZhYmxlIG9mIE5vdGlmaWNhdGlvbnMgdG8gYW4gYWN0dWFsIE9ic2VydmFibGU8L2NhcHRpb24+XG4gKiB2YXIgbm90aWZBID0gbmV3IFJ4Lk5vdGlmaWNhdGlvbignTicsICdBJyk7XG4gKiB2YXIgbm90aWZCID0gbmV3IFJ4Lk5vdGlmaWNhdGlvbignTicsICdCJyk7XG4gKiB2YXIgbm90aWZFID0gbmV3IFJ4Lk5vdGlmaWNhdGlvbignRScsIHZvaWQgMCxcbiAqICAgbmV3IFR5cGVFcnJvcigneC50b1VwcGVyQ2FzZSBpcyBub3QgYSBmdW5jdGlvbicpXG4gKiApO1xuICogdmFyIG1hdGVyaWFsaXplZCA9IFJ4Lk9ic2VydmFibGUub2Yobm90aWZBLCBub3RpZkIsIG5vdGlmRSk7XG4gKiB2YXIgdXBwZXJDYXNlID0gbWF0ZXJpYWxpemVkLmRlbWF0ZXJpYWxpemUoKTtcbiAqIHVwcGVyQ2FzZS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluOlxuICogLy8gQVxuICogLy8gQlxuICogLy8gVHlwZUVycm9yOiB4LnRvVXBwZXJDYXNlIGlzIG5vdCBhIGZ1bmN0aW9uXG4gKlxuICogQHNlZSB7QGxpbmsgTm90aWZpY2F0aW9ufVxuICogQHNlZSB7QGxpbmsgbWF0ZXJpYWxpemV9XG4gKlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIGFuZCBub3RpZmljYXRpb25zXG4gKiBlbWJlZGRlZCBpbiBOb3RpZmljYXRpb24gb2JqZWN0cyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgZGVtYXRlcmlhbGl6ZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbWF0ZXJpYWxpemU8VD4odGhpczogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8YW55PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IERlTWF0ZXJpYWxpemVPcGVyYXRvcigpKTtcbn1cblxuY2xhc3MgRGVNYXRlcmlhbGl6ZU9wZXJhdG9yPFQgZXh0ZW5kcyBOb3RpZmljYXRpb248YW55PiwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IERlTWF0ZXJpYWxpemVTdWJzY3JpYmVyKHN1YnNjcmliZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgRGVNYXRlcmlhbGl6ZVN1YnNjcmliZXI8VCBleHRlbmRzIE5vdGlmaWNhdGlvbjxhbnk+PiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgdmFsdWUub2JzZXJ2ZSh0aGlzLmRlc3RpbmF0aW9uKTtcbiAgfVxufVxuIl19