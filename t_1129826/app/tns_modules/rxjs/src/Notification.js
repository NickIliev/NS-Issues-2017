"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("./Observable");
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTm90aWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSDtJQUdFLHNCQUFtQixJQUFZLEVBQVMsS0FBUyxFQUFTLEtBQVc7UUFBbEQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQUk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDhCQUFPLEdBQVAsVUFBUSxRQUE0QjtRQUNsQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLEdBQUc7Z0JBQ04sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsS0FBSyxHQUFHO2dCQUNOLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gseUJBQUUsR0FBRixVQUFHLElBQXdCLEVBQUUsS0FBMEIsRUFBRSxRQUFxQjtRQUM1RSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLEdBQUc7Z0JBQ04sTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsS0FBSyxHQUFHO2dCQUNOLE1BQU0sQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILDZCQUFNLEdBQU4sVUFBTyxjQUF5RCxFQUFFLEtBQTBCLEVBQUUsUUFBcUI7UUFDakgsRUFBRSxDQUFDLENBQUMsY0FBYyxJQUFJLE9BQTRCLGNBQWUsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBcUIsY0FBYyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQXFCLGNBQWMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsbUNBQVksR0FBWjtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLEVBQUssQ0FBQztRQUNqQyxDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFLRDs7Ozs7O09BTUc7SUFDSSx1QkFBVSxHQUFqQixVQUFxQixLQUFRO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksd0JBQVcsR0FBbEIsVUFBc0IsR0FBUztRQUM3QixNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMkJBQWMsR0FBckI7UUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDO0lBQzNDLENBQUM7SUFsQ2MsaUNBQW9CLEdBQXNCLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLHVDQUEwQixHQUFzQixJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFrQ2xHLG1CQUFDO0NBQUEsQUFqSEQsSUFpSEM7QUFqSFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXJ0aWFsT2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuL09ic2VydmFibGUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwdXNoLWJhc2VkIGV2ZW50IG9yIHZhbHVlIHRoYXQgYW4ge0BsaW5rIE9ic2VydmFibGV9IGNhbiBlbWl0LlxuICogVGhpcyBjbGFzcyBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBvcGVyYXRvcnMgdGhhdCBtYW5hZ2Ugbm90aWZpY2F0aW9ucyxcbiAqIGxpa2Uge0BsaW5rIG1hdGVyaWFsaXplfSwge0BsaW5rIGRlbWF0ZXJpYWxpemV9LCB7QGxpbmsgb2JzZXJ2ZU9ufSwgYW5kXG4gKiBvdGhlcnMuIEJlc2lkZXMgd3JhcHBpbmcgdGhlIGFjdHVhbCBkZWxpdmVyZWQgdmFsdWUsIGl0IGFsc28gYW5ub3RhdGVzIGl0XG4gKiB3aXRoIG1ldGFkYXRhIG9mLCBmb3IgaW5zdGFuY2UsIHdoYXQgdHlwZSBvZiBwdXNoIG1lc3NhZ2UgaXQgaXMgKGBuZXh0YCxcbiAqIGBlcnJvcmAsIG9yIGBjb21wbGV0ZWApLlxuICpcbiAqIEBzZWUge0BsaW5rIG1hdGVyaWFsaXplfVxuICogQHNlZSB7QGxpbmsgZGVtYXRlcmlhbGl6ZX1cbiAqIEBzZWUge0BsaW5rIG9ic2VydmVPbn1cbiAqXG4gKiBAY2xhc3MgTm90aWZpY2F0aW9uPFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb248VD4ge1xuICBoYXNWYWx1ZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMga2luZDogc3RyaW5nLCBwdWJsaWMgdmFsdWU/OiBULCBwdWJsaWMgZXJyb3I/OiBhbnkpIHtcbiAgICB0aGlzLmhhc1ZhbHVlID0ga2luZCA9PT0gJ04nO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIHRvIHRoZSBnaXZlbiBgb2JzZXJ2ZXJgIHRoZSB2YWx1ZSB3cmFwcGVkIGJ5IHRoaXMgTm90aWZpY2F0aW9uLlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZlclxuICAgKiBAcmV0dXJuXG4gICAqL1xuICBvYnNlcnZlKG9ic2VydmVyOiBQYXJ0aWFsT2JzZXJ2ZXI8VD4pOiBhbnkge1xuICAgIHN3aXRjaCAodGhpcy5raW5kKSB7XG4gICAgICBjYXNlICdOJzpcbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLm5leHQgJiYgb2JzZXJ2ZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IgJiYgb2JzZXJ2ZXIuZXJyb3IodGhpcy5lcnJvcik7XG4gICAgICBjYXNlICdDJzpcbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLmNvbXBsZXRlICYmIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIHNvbWUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFja3MsIGRlbGl2ZXIgdGhlIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZVxuICAgKiBjdXJyZW50IE5vdGlmaWNhdGlvbiB0byB0aGUgY29ycmVjdGx5IGNvcnJlc3BvbmRpbmcgY2FsbGJhY2suXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQpOiB2b2lkfSBuZXh0IEFuIE9ic2VydmVyIGBuZXh0YCBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtmdW5jdGlvbihlcnI6IGFueSk6IHZvaWR9IFtlcnJvcl0gQW4gT2JzZXJ2ZXIgYGVycm9yYCBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbY29tcGxldGVdIEFuIE9ic2VydmVyIGBjb21wbGV0ZWAgY2FsbGJhY2suXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICovXG4gIGRvKG5leHQ6ICh2YWx1ZTogVCkgPT4gdm9pZCwgZXJyb3I/OiAoZXJyOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgY29uc3Qga2luZCA9IHRoaXMua2luZDtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgJ04nOlxuICAgICAgICByZXR1cm4gbmV4dCAmJiBuZXh0KHRoaXMudmFsdWUpO1xuICAgICAgY2FzZSAnRSc6XG4gICAgICAgIHJldHVybiBlcnJvciAmJiBlcnJvcih0aGlzLmVycm9yKTtcbiAgICAgIGNhc2UgJ0MnOlxuICAgICAgICByZXR1cm4gY29tcGxldGUgJiYgY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYW4gT2JzZXJ2ZXIgb3IgaXRzIGluZGl2aWR1YWwgY2FsbGJhY2sgZnVuY3Rpb25zLCBhbmQgY2FsbHMgYG9ic2VydmVgXG4gICAqIG9yIGBkb2AgbWV0aG9kcyBhY2NvcmRpbmdseS5cbiAgICogQHBhcmFtIHtPYnNlcnZlcnxmdW5jdGlvbih2YWx1ZTogVCk6IHZvaWR9IG5leHRPck9ic2VydmVyIEFuIE9ic2VydmVyIG9yXG4gICAqIHRoZSBgbmV4dGAgY2FsbGJhY2suXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oZXJyOiBhbnkpOiB2b2lkfSBbZXJyb3JdIEFuIE9ic2VydmVyIGBlcnJvcmAgY2FsbGJhY2suXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBBbiBPYnNlcnZlciBgY29tcGxldGVgIGNhbGxiYWNrLlxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqL1xuICBhY2NlcHQobmV4dE9yT2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxUPiB8ICgodmFsdWU6IFQpID0+IHZvaWQpLCBlcnJvcj86IChlcnI6IGFueSkgPT4gdm9pZCwgY29tcGxldGU/OiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyICYmIHR5cGVvZiAoPFBhcnRpYWxPYnNlcnZlcjxUPj5uZXh0T3JPYnNlcnZlcikubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2ZSg8UGFydGlhbE9ic2VydmVyPFQ+Pm5leHRPck9ic2VydmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZG8oPCh2YWx1ZTogVCkgPT4gdm9pZD5uZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHNpbXBsZSBPYnNlcnZhYmxlIHRoYXQganVzdCBkZWxpdmVycyB0aGUgbm90aWZpY2F0aW9uIHJlcHJlc2VudGVkXG4gICAqIGJ5IHRoaXMgTm90aWZpY2F0aW9uIGluc3RhbmNlLlxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqL1xuICB0b09ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3Qga2luZCA9IHRoaXMua2luZDtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgJ04nOlxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLnZhbHVlKTtcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyh0aGlzLmVycm9yKTtcbiAgICAgIGNhc2UgJ0MnOlxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5lbXB0eTxUPigpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgbm90aWZpY2F0aW9uIGtpbmQgdmFsdWUnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNvbXBsZXRlTm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb248YW55PiA9IG5ldyBOb3RpZmljYXRpb24oJ0MnKTtcbiAgcHJpdmF0ZSBzdGF0aWMgdW5kZWZpbmVkVmFsdWVOb3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjxhbnk+ID0gbmV3IE5vdGlmaWNhdGlvbignTicsIHVuZGVmaW5lZCk7XG5cbiAgLyoqXG4gICAqIEEgc2hvcnRjdXQgdG8gY3JlYXRlIGEgTm90aWZpY2F0aW9uIGluc3RhbmNlIG9mIHRoZSB0eXBlIGBuZXh0YCBmcm9tIGFcbiAgICogZ2l2ZW4gdmFsdWUuXG4gICAqIEBwYXJhbSB7VH0gdmFsdWUgVGhlIGBuZXh0YCB2YWx1ZS5cbiAgICogQHJldHVybiB7Tm90aWZpY2F0aW9uPFQ+fSBUaGUgXCJuZXh0XCIgTm90aWZpY2F0aW9uIHJlcHJlc2VudGluZyB0aGVcbiAgICogYXJndW1lbnQuXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlTmV4dDxUPih2YWx1ZTogVCk6IE5vdGlmaWNhdGlvbjxUPiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKCdOJywgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gTm90aWZpY2F0aW9uLnVuZGVmaW5lZFZhbHVlTm90aWZpY2F0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2hvcnRjdXQgdG8gY3JlYXRlIGEgTm90aWZpY2F0aW9uIGluc3RhbmNlIG9mIHRoZSB0eXBlIGBlcnJvcmAgZnJvbSBhXG4gICAqIGdpdmVuIGVycm9yLlxuICAgKiBAcGFyYW0ge2FueX0gW2Vycl0gVGhlIGBlcnJvcmAgZXJyb3IuXG4gICAqIEByZXR1cm4ge05vdGlmaWNhdGlvbjxUPn0gVGhlIFwiZXJyb3JcIiBOb3RpZmljYXRpb24gcmVwcmVzZW50aW5nIHRoZVxuICAgKiBhcmd1bWVudC5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVFcnJvcjxUPihlcnI/OiBhbnkpOiBOb3RpZmljYXRpb248VD4ge1xuICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKCdFJywgdW5kZWZpbmVkLCBlcnIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2hvcnRjdXQgdG8gY3JlYXRlIGEgTm90aWZpY2F0aW9uIGluc3RhbmNlIG9mIHRoZSB0eXBlIGBjb21wbGV0ZWAuXG4gICAqIEByZXR1cm4ge05vdGlmaWNhdGlvbjxhbnk+fSBUaGUgdmFsdWVsZXNzIFwiY29tcGxldGVcIiBOb3RpZmljYXRpb24uXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQ29tcGxldGUoKTogTm90aWZpY2F0aW9uPGFueT4ge1xuICAgIHJldHVybiBOb3RpZmljYXRpb24uY29tcGxldGVOb3RpZmljYXRpb247XG4gIH1cbn1cbiJdfQ==