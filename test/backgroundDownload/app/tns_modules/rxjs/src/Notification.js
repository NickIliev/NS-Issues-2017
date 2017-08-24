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
        return this.undefinedValueNotification;
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
        return this.completeNotification;
    };
    return Notification;
}());
Notification.completeNotification = new Notification('C');
Notification.undefinedValueNotification = new Notification('N', undefined);
exports.Notification = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTm90aWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSDtJQUdFLHNCQUFtQixJQUFZLEVBQVMsS0FBUyxFQUFTLEtBQVc7UUFBbEQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQUk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDhCQUFPLEdBQVAsVUFBUSxRQUE0QjtRQUNsQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLEdBQUc7Z0JBQ04sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsS0FBSyxHQUFHO2dCQUNOLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gseUJBQUUsR0FBRixVQUFHLElBQXdCLEVBQUUsS0FBMEIsRUFBRSxRQUFxQjtRQUM1RSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLEdBQUc7Z0JBQ04sTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsS0FBSyxHQUFHO2dCQUNOLE1BQU0sQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILDZCQUFNLEdBQU4sVUFBTyxjQUF5RCxFQUFFLEtBQTBCLEVBQUUsUUFBcUI7UUFDakgsRUFBRSxDQUFDLENBQUMsY0FBYyxJQUFJLE9BQTRCLGNBQWUsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBcUIsY0FBYyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQXFCLGNBQWMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsbUNBQVksR0FBWjtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLEVBQUssQ0FBQztRQUNqQyxDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFLRDs7Ozs7O09BTUc7SUFDSSx1QkFBVSxHQUFqQixVQUFxQixLQUFRO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksd0JBQVcsR0FBbEIsVUFBc0IsR0FBUztRQUM3QixNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMkJBQWMsR0FBckI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFqSEQ7QUE4RWlCLGlDQUFvQixHQUFzQixJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRSx1Q0FBMEIsR0FBc0IsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBL0VyRixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhcnRpYWxPYnNlcnZlciB9IGZyb20gJy4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4vT2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHB1c2gtYmFzZWQgZXZlbnQgb3IgdmFsdWUgdGhhdCBhbiB7QGxpbmsgT2JzZXJ2YWJsZX0gY2FuIGVtaXQuXG4gKiBUaGlzIGNsYXNzIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIG9wZXJhdG9ycyB0aGF0IG1hbmFnZSBub3RpZmljYXRpb25zLFxuICogbGlrZSB7QGxpbmsgbWF0ZXJpYWxpemV9LCB7QGxpbmsgZGVtYXRlcmlhbGl6ZX0sIHtAbGluayBvYnNlcnZlT259LCBhbmRcbiAqIG90aGVycy4gQmVzaWRlcyB3cmFwcGluZyB0aGUgYWN0dWFsIGRlbGl2ZXJlZCB2YWx1ZSwgaXQgYWxzbyBhbm5vdGF0ZXMgaXRcbiAqIHdpdGggbWV0YWRhdGEgb2YsIGZvciBpbnN0YW5jZSwgd2hhdCB0eXBlIG9mIHB1c2ggbWVzc2FnZSBpdCBpcyAoYG5leHRgLFxuICogYGVycm9yYCwgb3IgYGNvbXBsZXRlYCkuXG4gKlxuICogQHNlZSB7QGxpbmsgbWF0ZXJpYWxpemV9XG4gKiBAc2VlIHtAbGluayBkZW1hdGVyaWFsaXplfVxuICogQHNlZSB7QGxpbmsgb2JzZXJ2ZU9ufVxuICpcbiAqIEBjbGFzcyBOb3RpZmljYXRpb248VD5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbjxUPiB7XG4gIGhhc1ZhbHVlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBraW5kOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZT86IFQsIHB1YmxpYyBlcnJvcj86IGFueSkge1xuICAgIHRoaXMuaGFzVmFsdWUgPSBraW5kID09PSAnTic7XG4gIH1cblxuICAvKipcbiAgICogRGVsaXZlcnMgdG8gdGhlIGdpdmVuIGBvYnNlcnZlcmAgdGhlIHZhbHVlIHdyYXBwZWQgYnkgdGhpcyBOb3RpZmljYXRpb24uXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmVyXG4gICAqIEByZXR1cm5cbiAgICovXG4gIG9ic2VydmUob2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxUPik6IGFueSB7XG4gICAgc3dpdGNoICh0aGlzLmtpbmQpIHtcbiAgICAgIGNhc2UgJ04nOlxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIubmV4dCAmJiBvYnNlcnZlci5uZXh0KHRoaXMudmFsdWUpO1xuICAgICAgY2FzZSAnRSc6XG4gICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvciAmJiBvYnNlcnZlci5lcnJvcih0aGlzLmVycm9yKTtcbiAgICAgIGNhc2UgJ0MnOlxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuY29tcGxldGUgJiYgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gc29tZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrcywgZGVsaXZlciB0aGUgdmFsdWUgcmVwcmVzZW50ZWQgYnkgdGhlXG4gICAqIGN1cnJlbnQgTm90aWZpY2F0aW9uIHRvIHRoZSBjb3JyZWN0bHkgY29ycmVzcG9uZGluZyBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IHZvaWR9IG5leHQgQW4gT2JzZXJ2ZXIgYG5leHRgIGNhbGxiYWNrLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKGVycjogYW55KTogdm9pZH0gW2Vycm9yXSBBbiBPYnNlcnZlciBgZXJyb3JgIGNhbGxiYWNrLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gQW4gT2JzZXJ2ZXIgYGNvbXBsZXRlYCBjYWxsYmFjay5cbiAgICogQHJldHVybiB7YW55fVxuICAgKi9cbiAgZG8obmV4dDogKHZhbHVlOiBUKSA9PiB2b2lkLCBlcnJvcj86IChlcnI6IGFueSkgPT4gdm9pZCwgY29tcGxldGU/OiAoKSA9PiB2b2lkKTogYW55IHtcbiAgICBjb25zdCBraW5kID0gdGhpcy5raW5kO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSAnTic6XG4gICAgICAgIHJldHVybiBuZXh0ICYmIG5leHQodGhpcy52YWx1ZSk7XG4gICAgICBjYXNlICdFJzpcbiAgICAgICAgcmV0dXJuIGVycm9yICYmIGVycm9yKHRoaXMuZXJyb3IpO1xuICAgICAgY2FzZSAnQyc6XG4gICAgICAgIHJldHVybiBjb21wbGV0ZSAmJiBjb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhbiBPYnNlcnZlciBvciBpdHMgaW5kaXZpZHVhbCBjYWxsYmFjayBmdW5jdGlvbnMsIGFuZCBjYWxscyBgb2JzZXJ2ZWBcbiAgICogb3IgYGRvYCBtZXRob2RzIGFjY29yZGluZ2x5LlxuICAgKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9uKHZhbHVlOiBUKTogdm9pZH0gbmV4dE9yT2JzZXJ2ZXIgQW4gT2JzZXJ2ZXIgb3JcbiAgICogdGhlIGBuZXh0YCBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtmdW5jdGlvbihlcnI6IGFueSk6IHZvaWR9IFtlcnJvcl0gQW4gT2JzZXJ2ZXIgYGVycm9yYCBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbY29tcGxldGVdIEFuIE9ic2VydmVyIGBjb21wbGV0ZWAgY2FsbGJhY2suXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICovXG4gIGFjY2VwdChuZXh0T3JPYnNlcnZlcjogUGFydGlhbE9ic2VydmVyPFQ+IHwgKCh2YWx1ZTogVCkgPT4gdm9pZCksIGVycm9yPzogKGVycjogYW55KSA9PiB2b2lkLCBjb21wbGV0ZT86ICgpID0+IHZvaWQpIHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIgJiYgdHlwZW9mICg8UGFydGlhbE9ic2VydmVyPFQ+Pm5leHRPck9ic2VydmVyKS5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnNlcnZlKDxQYXJ0aWFsT2JzZXJ2ZXI8VD4+bmV4dE9yT2JzZXJ2ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5kbyg8KHZhbHVlOiBUKSA9PiB2b2lkPm5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBqdXN0IGRlbGl2ZXJzIHRoZSBub3RpZmljYXRpb24gcmVwcmVzZW50ZWRcbiAgICogYnkgdGhpcyBOb3RpZmljYXRpb24gaW5zdGFuY2UuXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICovXG4gIHRvT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBraW5kID0gdGhpcy5raW5kO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSAnTic6XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHRoaXMudmFsdWUpO1xuICAgICAgY2FzZSAnRSc6XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KHRoaXMuZXJyb3IpO1xuICAgICAgY2FzZSAnQyc6XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmVtcHR5PFQ+KCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCBub3RpZmljYXRpb24ga2luZCB2YWx1ZScpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY29tcGxldGVOb3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjxhbnk+ID0gbmV3IE5vdGlmaWNhdGlvbignQycpO1xuICBwcml2YXRlIHN0YXRpYyB1bmRlZmluZWRWYWx1ZU5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uPGFueT4gPSBuZXcgTm90aWZpY2F0aW9uKCdOJywgdW5kZWZpbmVkKTtcblxuICAvKipcbiAgICogQSBzaG9ydGN1dCB0byBjcmVhdGUgYSBOb3RpZmljYXRpb24gaW5zdGFuY2Ugb2YgdGhlIHR5cGUgYG5leHRgIGZyb20gYVxuICAgKiBnaXZlbiB2YWx1ZS5cbiAgICogQHBhcmFtIHtUfSB2YWx1ZSBUaGUgYG5leHRgIHZhbHVlLlxuICAgKiBAcmV0dXJuIHtOb3RpZmljYXRpb248VD59IFRoZSBcIm5leHRcIiBOb3RpZmljYXRpb24gcmVwcmVzZW50aW5nIHRoZVxuICAgKiBhcmd1bWVudC5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVOZXh0PFQ+KHZhbHVlOiBUKTogTm90aWZpY2F0aW9uPFQ+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBOb3RpZmljYXRpb24oJ04nLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnVuZGVmaW5lZFZhbHVlTm90aWZpY2F0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2hvcnRjdXQgdG8gY3JlYXRlIGEgTm90aWZpY2F0aW9uIGluc3RhbmNlIG9mIHRoZSB0eXBlIGBlcnJvcmAgZnJvbSBhXG4gICAqIGdpdmVuIGVycm9yLlxuICAgKiBAcGFyYW0ge2FueX0gW2Vycl0gVGhlIGBlcnJvcmAgZXJyb3IuXG4gICAqIEByZXR1cm4ge05vdGlmaWNhdGlvbjxUPn0gVGhlIFwiZXJyb3JcIiBOb3RpZmljYXRpb24gcmVwcmVzZW50aW5nIHRoZVxuICAgKiBhcmd1bWVudC5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVFcnJvcjxUPihlcnI/OiBhbnkpOiBOb3RpZmljYXRpb248VD4ge1xuICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKCdFJywgdW5kZWZpbmVkLCBlcnIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2hvcnRjdXQgdG8gY3JlYXRlIGEgTm90aWZpY2F0aW9uIGluc3RhbmNlIG9mIHRoZSB0eXBlIGBjb21wbGV0ZWAuXG4gICAqIEByZXR1cm4ge05vdGlmaWNhdGlvbjxhbnk+fSBUaGUgdmFsdWVsZXNzIFwiY29tcGxldGVcIiBOb3RpZmljYXRpb24uXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQ29tcGxldGUoKTogTm90aWZpY2F0aW9uPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlTm90aWZpY2F0aW9uO1xuICB9XG59XG4iXX0=