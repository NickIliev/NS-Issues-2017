"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
exports.defaultThrottleConfig = {
    leading: true,
    trailing: false
};
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link throttleTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/throttle.png" width="100%">
 *
 * `throttle` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled by calling the `durationSelector` function with the source value,
 * which returns the "duration" Observable. When the duration Observable emits a
 * value or completes, the timer is disabled, and this process repeats for the
 * next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * @param {Object} config a configuration object to define `leading` and `trailing` behavior. Defaults
 * to `{ leading: true, trailing: false }`.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttle
 * @owner Observable
 */
function throttle(durationSelector, config) {
    if (config === void 0) { config = exports.defaultThrottleConfig; }
    return this.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing));
}
exports.throttle = throttle;
var ThrottleOperator = (function () {
    function ThrottleOperator(durationSelector, leading, trailing) {
        this.durationSelector = durationSelector;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
    };
    return ThrottleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc
 * @ignore
 * @extends {Ignored}
 */
var ThrottleSubscriber = (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.durationSelector = durationSelector;
        _this._leading = _leading;
        _this._trailing = _trailing;
        _this._hasTrailingValue = false;
        return _this;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        if (this.throttled) {
            if (this._trailing) {
                this._hasTrailingValue = true;
                this._trailingValue = value;
            }
        }
        else {
            var duration = this.tryDurationSelector(value);
            if (duration) {
                this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
            }
            if (this._leading) {
                this.destination.next(value);
                if (this._trailing) {
                    this._hasTrailingValue = true;
                    this._trailingValue = value;
                }
            }
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        try {
            return this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return null;
        }
    };
    ThrottleSubscriber.prototype._unsubscribe = function () {
        var _a = this, throttled = _a.throttled, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue, _trailing = _a._trailing;
        this._trailingValue = null;
        this._hasTrailingValue = false;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
    };
    ThrottleSubscriber.prototype._sendTrailing = function () {
        var _a = this, destination = _a.destination, throttled = _a.throttled, _trailing = _a._trailing, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue;
        if (throttled && _trailing && _hasTrailingValue) {
            destination.next(_trailingValue);
            this._trailingValue = null;
            this._hasTrailingValue = false;
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._sendTrailing();
        this._unsubscribe();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this._sendTrailing();
        this._unsubscribe();
    };
    return ThrottleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFPakQsUUFBQSxxQkFBcUIsR0FBbUI7SUFDbkQsT0FBTyxFQUFFLElBQUk7SUFDYixRQUFRLEVBQUUsS0FBSztDQUNoQixDQUFDO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUNILGtCQUM0QixnQkFBNkQsRUFDN0QsTUFBOEM7SUFBOUMsdUJBQUEsRUFBQSxTQUF5Qiw2QkFBcUI7SUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzVGLENBQUM7QUFKRCw0QkFJQztBQUVEO0lBQ0UsMEJBQW9CLGdCQUE2RCxFQUM3RCxPQUFnQixFQUNoQixRQUFpQjtRQUZqQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTZDO1FBQzdELFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUztJQUNyQyxDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDckIsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN2RixDQUFDO0lBQ0osQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFFRDs7OztHQUlHO0FBQ0g7SUFBdUMsc0NBQXFCO0lBSzFELDRCQUFzQixXQUEwQixFQUM1QixnQkFBNkQsRUFDN0QsUUFBaUIsRUFDakIsU0FBa0I7UUFIdEMs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VUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtRQUN4QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwyQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBM0VELENBQXVDLGlDQUFlLEdBMkVyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlT3JQcm9taXNlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGhyb3R0bGVDb25maWcge1xuICBsZWFkaW5nPzogYm9vbGVhbjtcbiAgdHJhaWxpbmc/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFRocm90dGxlQ29uZmlnOiBUaHJvdHRsZUNvbmZpZyA9IHtcbiAgbGVhZGluZzogdHJ1ZSxcbiAgdHJhaWxpbmc6IGZhbHNlXG59O1xuXG4vKipcbiAqIEVtaXRzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHRoZW4gaWdub3JlcyBzdWJzZXF1ZW50IHNvdXJjZVxuICogdmFsdWVzIGZvciBhIGR1cmF0aW9uIGRldGVybWluZWQgYnkgYW5vdGhlciBPYnNlcnZhYmxlLCB0aGVuIHJlcGVhdHMgdGhpc1xuICogcHJvY2Vzcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayB0aHJvdHRsZVRpbWV9LCBidXQgdGhlIHNpbGVuY2luZ1xuICogZHVyYXRpb24gaXMgZGV0ZXJtaW5lZCBieSBhIHNlY29uZCBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3Rocm90dGxlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGB0aHJvdHRsZWAgZW1pdHMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGVcbiAqIHdoZW4gaXRzIGludGVybmFsIHRpbWVyIGlzIGRpc2FibGVkLCBhbmQgaWdub3JlcyBzb3VyY2UgdmFsdWVzIHdoZW4gdGhlIHRpbWVyXG4gKiBpcyBlbmFibGVkLiBJbml0aWFsbHksIHRoZSB0aW1lciBpcyBkaXNhYmxlZC4gQXMgc29vbiBhcyB0aGUgZmlyc3Qgc291cmNlXG4gKiB2YWx1ZSBhcnJpdmVzLCBpdCBpcyBmb3J3YXJkZWQgdG8gdGhlIG91dHB1dCBPYnNlcnZhYmxlLCBhbmQgdGhlbiB0aGUgdGltZXJcbiAqIGlzIGVuYWJsZWQgYnkgY2FsbGluZyB0aGUgYGR1cmF0aW9uU2VsZWN0b3JgIGZ1bmN0aW9uIHdpdGggdGhlIHNvdXJjZSB2YWx1ZSxcbiAqIHdoaWNoIHJldHVybnMgdGhlIFwiZHVyYXRpb25cIiBPYnNlcnZhYmxlLiBXaGVuIHRoZSBkdXJhdGlvbiBPYnNlcnZhYmxlIGVtaXRzIGFcbiAqIHZhbHVlIG9yIGNvbXBsZXRlcywgdGhlIHRpbWVyIGlzIGRpc2FibGVkLCBhbmQgdGhpcyBwcm9jZXNzIHJlcGVhdHMgZm9yIHRoZVxuICogbmV4dCBzb3VyY2UgdmFsdWUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy50aHJvdHRsZShldiA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYXVkaXR9XG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5V2hlbn1cbiAqIEBzZWUge0BsaW5rIHNhbXBsZX1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlVGltZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogU3Vic2NyaWJhYmxlT3JQcm9taXNlfSBkdXJhdGlvblNlbGVjdG9yIEEgZnVuY3Rpb25cbiAqIHRoYXQgcmVjZWl2ZXMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgZm9yIGNvbXB1dGluZyB0aGUgc2lsZW5jaW5nXG4gKiBkdXJhdGlvbiBmb3IgZWFjaCBzb3VyY2UgdmFsdWUsIHJldHVybmVkIGFzIGFuIE9ic2VydmFibGUgb3IgYSBQcm9taXNlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHRvIGRlZmluZSBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2AgYmVoYXZpb3IuIERlZmF1bHRzXG4gKiB0byBgeyBsZWFkaW5nOiB0cnVlLCB0cmFpbGluZzogZmFsc2UgfWAuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgcGVyZm9ybXMgdGhlIHRocm90dGxlIG9wZXJhdGlvbiB0b1xuICogbGltaXQgdGhlIHJhdGUgb2YgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZS5cbiAqIEBtZXRob2QgdGhyb3R0bGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBUaHJvdHRsZUNvbmZpZyA9IGRlZmF1bHRUaHJvdHRsZUNvbmZpZyk6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBUaHJvdHRsZU9wZXJhdG9yKGR1cmF0aW9uU2VsZWN0b3IsIGNvbmZpZy5sZWFkaW5nLCBjb25maWcudHJhaWxpbmcpKTtcbn1cblxuY2xhc3MgVGhyb3R0bGVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxudW1iZXI+LFxuICAgICAgICAgICAgICBwcml2YXRlIGxlYWRpbmc6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdHJhaWxpbmc6IGJvb2xlYW4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShcbiAgICAgIG5ldyBUaHJvdHRsZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yLCB0aGlzLmxlYWRpbmcsIHRoaXMudHJhaWxpbmcpXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2NcbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBUaHJvdHRsZVN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuICBwcml2YXRlIHRocm90dGxlZDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF90cmFpbGluZ1ZhbHVlOiBUO1xuICBwcml2YXRlIF9oYXNUcmFpbGluZ1ZhbHVlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX2xlYWRpbmc6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX3RyYWlsaW5nOiBib29sZWFuKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGhyb3R0bGVkKSB7XG4gICAgICBpZiAodGhpcy5fdHJhaWxpbmcpIHtcbiAgICAgICAgdGhpcy5faGFzVHJhaWxpbmdWYWx1ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3RyYWlsaW5nVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLnRyeUR1cmF0aW9uU2VsZWN0b3IodmFsdWUpO1xuICAgICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuYWRkKHRoaXMudGhyb3R0bGVkID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgZHVyYXRpb24pKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9sZWFkaW5nKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLl90cmFpbGluZykge1xuICAgICAgICAgIHRoaXMuX2hhc1RyYWlsaW5nVmFsdWUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuX3RyYWlsaW5nVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5RHVyYXRpb25TZWxlY3Rvcih2YWx1ZTogVCk6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuZHVyYXRpb25TZWxlY3Rvcih2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHsgdGhyb3R0bGVkLCBfdHJhaWxpbmdWYWx1ZSwgX2hhc1RyYWlsaW5nVmFsdWUsIF90cmFpbGluZyB9ID0gdGhpcztcblxuICAgIHRoaXMuX3RyYWlsaW5nVmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX2hhc1RyYWlsaW5nVmFsdWUgPSBmYWxzZTtcblxuICAgIGlmICh0aHJvdHRsZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKHRocm90dGxlZCk7XG4gICAgICB0aGlzLnRocm90dGxlZCA9IG51bGw7XG4gICAgICB0aHJvdHRsZWQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZW5kVHJhaWxpbmcoKSB7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvbiwgdGhyb3R0bGVkLCBfdHJhaWxpbmcsIF90cmFpbGluZ1ZhbHVlLCBfaGFzVHJhaWxpbmdWYWx1ZSB9ID0gdGhpcztcbiAgICBpZiAodGhyb3R0bGVkICYmIF90cmFpbGluZyAmJiBfaGFzVHJhaWxpbmdWYWx1ZSkge1xuICAgICAgZGVzdGluYXRpb24ubmV4dChfdHJhaWxpbmdWYWx1ZSk7XG4gICAgICB0aGlzLl90cmFpbGluZ1ZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuX2hhc1RyYWlsaW5nVmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuX3NlbmRUcmFpbGluZygpO1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZW5kVHJhaWxpbmcoKTtcbiAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=