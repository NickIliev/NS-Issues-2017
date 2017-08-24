"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("../scheduler/async");
var Subscriber_1 = require("../Subscriber");
/**
 * Ignores source values for `duration` milliseconds, then emits the most recent
 * value from the source Observable, then repeats this process.
 *
 * <span class="informal">When it sees a source values, it ignores that plus
 * the next ones for `duration` milliseconds, and then it emits the most recent
 * value from the source.</span>
 *
 * <img src="./img/auditTime.png" width="100%">
 *
 * `auditTime` is similar to `throttleTime`, but emits the last value from the
 * silenced time window, instead of the first value. `auditTime` emits the most
 * recent value from the source Observable on the output Observable as soon as
 * its internal timer becomes disabled, and ignores source values while the
 * timer is enabled. Initially, the timer is disabled. As soon as the first
 * source value arrives, the timer is enabled. After `duration` milliseconds (or
 * the time unit determined internally by the optional `scheduler`) has passed,
 * the timer is disabled, then the most recent source value is emitted on the
 * output Observable, and this process repeats for the next source value.
 * Optionally takes a {@link IScheduler} for managing timers.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.auditTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} duration Time to wait before emitting the most recent source
 * value, measured in milliseconds or the time unit determined internally
 * by the optional `scheduler`.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the rate-limiting behavior.
 * @return {Observable<T>} An Observable that performs rate-limiting of
 * emissions from the source Observable.
 * @method auditTime
 * @owner Observable
 */
function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new AuditTimeOperator(duration, scheduler));
}
exports.auditTime = auditTime;
var AuditTimeOperator = (function () {
    function AuditTimeOperator(duration, scheduler) {
        this.duration = duration;
        this.scheduler = scheduler;
    }
    AuditTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
    };
    return AuditTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AuditTimeSubscriber = (function (_super) {
    __extends(AuditTimeSubscriber, _super);
    function AuditTimeSubscriber(destination, duration, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.duration = duration;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        return _this;
    }
    AuditTimeSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, this));
        }
    };
    AuditTimeSubscriber.prototype.clearThrottle = function () {
        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    return AuditTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.clearThrottle();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXRUaW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXVkaXRUaW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTJDO0FBRzNDLDRDQUEyQztBQUkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxtQkFBa0QsUUFBZ0IsRUFBRSxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLHlCQUE2QjtJQUMvRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFGRCw4QkFFQztBQUVEO0lBQ0UsMkJBQW9CLFFBQWdCLEVBQ2hCLFNBQXFCO1FBRHJCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBWTtJQUN6QyxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXFDLHVDQUFhO0lBTWhELDZCQUFZLFdBQTBCLEVBQ2xCLFFBQWdCLEVBQ2hCLFNBQXFCO1FBRnpDLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBSG1CLGNBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZUFBUyxHQUFULFNBQVMsQ0FBWTtRQUxqQyxjQUFRLEdBQVksS0FBSyxDQUFDOztJQU9sQyxDQUFDO0lBRVMsbUNBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQztJQUNILENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQ1EsSUFBQSxTQUFxQyxFQUFuQyxnQkFBSyxFQUFFLHNCQUFRLEVBQUUsd0JBQVMsQ0FBVTtRQUM1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQWpDRCxDQUFxQyx1QkFBVSxHQWlDOUM7QUFFRCxzQkFBeUIsVUFBa0M7SUFDekQsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBJZ25vcmVzIHNvdXJjZSB2YWx1ZXMgZm9yIGBkdXJhdGlvbmAgbWlsbGlzZWNvbmRzLCB0aGVuIGVtaXRzIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHRoZW4gcmVwZWF0cyB0aGlzIHByb2Nlc3MuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPldoZW4gaXQgc2VlcyBhIHNvdXJjZSB2YWx1ZXMsIGl0IGlnbm9yZXMgdGhhdCBwbHVzXG4gKiB0aGUgbmV4dCBvbmVzIGZvciBgZHVyYXRpb25gIG1pbGxpc2Vjb25kcywgYW5kIHRoZW4gaXQgZW1pdHMgdGhlIG1vc3QgcmVjZW50XG4gKiB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvYXVkaXRUaW1lLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBhdWRpdFRpbWVgIGlzIHNpbWlsYXIgdG8gYHRocm90dGxlVGltZWAsIGJ1dCBlbWl0cyB0aGUgbGFzdCB2YWx1ZSBmcm9tIHRoZVxuICogc2lsZW5jZWQgdGltZSB3aW5kb3csIGluc3RlYWQgb2YgdGhlIGZpcnN0IHZhbHVlLiBgYXVkaXRUaW1lYCBlbWl0cyB0aGUgbW9zdFxuICogcmVjZW50IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBhcyBzb29uIGFzXG4gKiBpdHMgaW50ZXJuYWwgdGltZXIgYmVjb21lcyBkaXNhYmxlZCwgYW5kIGlnbm9yZXMgc291cmNlIHZhbHVlcyB3aGlsZSB0aGVcbiAqIHRpbWVyIGlzIGVuYWJsZWQuIEluaXRpYWxseSwgdGhlIHRpbWVyIGlzIGRpc2FibGVkLiBBcyBzb29uIGFzIHRoZSBmaXJzdFxuICogc291cmNlIHZhbHVlIGFycml2ZXMsIHRoZSB0aW1lciBpcyBlbmFibGVkLiBBZnRlciBgZHVyYXRpb25gIG1pbGxpc2Vjb25kcyAob3JcbiAqIHRoZSB0aW1lIHVuaXQgZGV0ZXJtaW5lZCBpbnRlcm5hbGx5IGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYCkgaGFzIHBhc3NlZCxcbiAqIHRoZSB0aW1lciBpcyBkaXNhYmxlZCwgdGhlbiB0aGUgbW9zdCByZWNlbnQgc291cmNlIHZhbHVlIGlzIGVtaXR0ZWQgb24gdGhlXG4gKiBvdXRwdXQgT2JzZXJ2YWJsZSwgYW5kIHRoaXMgcHJvY2VzcyByZXBlYXRzIGZvciB0aGUgbmV4dCBzb3VyY2UgdmFsdWUuXG4gKiBPcHRpb25hbGx5IHRha2VzIGEge0BsaW5rIElTY2hlZHVsZXJ9IGZvciBtYW5hZ2luZyB0aW1lcnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5hdWRpdFRpbWUoMTAwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0fVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2VUaW1lfVxuICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gKiBAc2VlIHtAbGluayBzYW1wbGVUaW1lfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGVUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaW1lIHRvIHdhaXQgYmVmb3JlIGVtaXR0aW5nIHRoZSBtb3N0IHJlY2VudCBzb3VyY2VcbiAqIHZhbHVlLCBtZWFzdXJlZCBpbiBtaWxsaXNlY29uZHMgb3IgdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkIGludGVybmFsbHlcbiAqIGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jXSBUaGUge0BsaW5rIElTY2hlZHVsZXJ9IHRvIHVzZSBmb3JcbiAqIG1hbmFnaW5nIHRoZSB0aW1lcnMgdGhhdCBoYW5kbGUgdGhlIHJhdGUtbGltaXRpbmcgYmVoYXZpb3IuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgcGVyZm9ybXMgcmF0ZS1saW1pdGluZyBvZlxuICogZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBhdWRpdFRpbWVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdWRpdFRpbWU8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgZHVyYXRpb246IG51bWJlciwgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgQXVkaXRUaW1lT3BlcmF0b3IoZHVyYXRpb24sIHNjaGVkdWxlcikpO1xufVxuXG5jbGFzcyBBdWRpdFRpbWVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkdXJhdGlvbjogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBBdWRpdFRpbWVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZHVyYXRpb24sIHRoaXMuc2NoZWR1bGVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEF1ZGl0VGltZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcblxuICBwcml2YXRlIHZhbHVlOiBUO1xuICBwcml2YXRlIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgdGhyb3R0bGVkOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZHVyYXRpb246IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gICAgaWYgKCF0aGlzLnRocm90dGxlZCkge1xuICAgICAgdGhpcy5hZGQodGhpcy50aHJvdHRsZWQgPSB0aGlzLnNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIHRoaXMuZHVyYXRpb24sIHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBjbGVhclRocm90dGxlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgdmFsdWUsIGhhc1ZhbHVlLCB0aHJvdHRsZWQgfSA9IHRoaXM7XG4gICAgaWYgKHRocm90dGxlZCkge1xuICAgICAgdGhpcy5yZW1vdmUodGhyb3R0bGVkKTtcbiAgICAgIHRoaXMudGhyb3R0bGVkID0gbnVsbDtcbiAgICAgIHRocm90dGxlZC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgdGhpcy5oYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hOZXh0PFQ+KHN1YnNjcmliZXI6IEF1ZGl0VGltZVN1YnNjcmliZXI8VD4pOiB2b2lkIHtcbiAgc3Vic2NyaWJlci5jbGVhclRocm90dGxlKCk7XG59XG4iXX0=