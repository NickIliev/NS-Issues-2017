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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXRUaW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXVkaXRUaW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTJDO0FBRzNDLDRDQUEyQztBQUkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxtQkFBa0QsUUFBZ0IsRUFBRSxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLFlBQXdCLGFBQUs7SUFDL0YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRkQsOEJBRUM7QUFFRDtJQUNFLDJCQUFvQixRQUFnQixFQUNoQixTQUFxQjtRQURyQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDekMsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFxQyx1Q0FBYTtJQU1oRCw2QkFBWSxXQUEwQixFQUNsQixRQUFnQixFQUNoQixTQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGVBQVMsR0FBVCxTQUFTLENBQVk7UUFMakMsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUFPbEMsQ0FBQztJQUVTLG1DQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7SUFDSCxDQUFDO0lBRUQsMkNBQWEsR0FBYjtRQUNRLElBQUEsU0FBcUMsRUFBbkMsZ0JBQUssRUFBRSxzQkFBUSxFQUFFLHdCQUFTLENBQVU7UUFDNUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFqQ0QsQ0FBcUMsdUJBQVUsR0FpQzlDO0FBRUQsc0JBQXlCLFVBQWtDO0lBQ3pELFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogSWdub3JlcyBzb3VyY2UgdmFsdWVzIGZvciBgZHVyYXRpb25gIG1pbGxpc2Vjb25kcywgdGhlbiBlbWl0cyB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB0aGVuIHJlcGVhdHMgdGhpcyBwcm9jZXNzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuIGl0IHNlZXMgYSBzb3VyY2UgdmFsdWVzLCBpdCBpZ25vcmVzIHRoYXQgcGx1c1xuICogdGhlIG5leHQgb25lcyBmb3IgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGl0IGVtaXRzIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWUgZnJvbSB0aGUgc291cmNlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2F1ZGl0VGltZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgYXVkaXRUaW1lYCBpcyBzaW1pbGFyIHRvIGB0aHJvdHRsZVRpbWVgLCBidXQgZW1pdHMgdGhlIGxhc3QgdmFsdWUgZnJvbSB0aGVcbiAqIHNpbGVuY2VkIHRpbWUgd2luZG93LCBpbnN0ZWFkIG9mIHRoZSBmaXJzdCB2YWx1ZS4gYGF1ZGl0VGltZWAgZW1pdHMgdGhlIG1vc3RcbiAqIHJlY2VudCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgYXMgc29vbiBhc1xuICogaXRzIGludGVybmFsIHRpbWVyIGJlY29tZXMgZGlzYWJsZWQsIGFuZCBpZ25vcmVzIHNvdXJjZSB2YWx1ZXMgd2hpbGUgdGhlXG4gKiB0aW1lciBpcyBlbmFibGVkLiBJbml0aWFsbHksIHRoZSB0aW1lciBpcyBkaXNhYmxlZC4gQXMgc29vbiBhcyB0aGUgZmlyc3RcbiAqIHNvdXJjZSB2YWx1ZSBhcnJpdmVzLCB0aGUgdGltZXIgaXMgZW5hYmxlZC4gQWZ0ZXIgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMgKG9yXG4gKiB0aGUgdGltZSB1bml0IGRldGVybWluZWQgaW50ZXJuYWxseSBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmApIGhhcyBwYXNzZWQsXG4gKiB0aGUgdGltZXIgaXMgZGlzYWJsZWQsIHRoZW4gdGhlIG1vc3QgcmVjZW50IHNvdXJjZSB2YWx1ZSBpcyBlbWl0dGVkIG9uIHRoZVxuICogb3V0cHV0IE9ic2VydmFibGUsIGFuZCB0aGlzIHByb2Nlc3MgcmVwZWF0cyBmb3IgdGhlIG5leHQgc291cmNlIHZhbHVlLlxuICogT3B0aW9uYWxseSB0YWtlcyBhIHtAbGluayBJU2NoZWR1bGVyfSBmb3IgbWFuYWdpbmcgdGltZXJzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgY2xpY2tzIGF0IGEgcmF0ZSBvZiBhdCBtb3N0IG9uZSBjbGljayBwZXIgc2Vjb25kPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MuYXVkaXRUaW1lKDEwMDApO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBhdWRpdH1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICogQHNlZSB7QGxpbmsgc2FtcGxlVGltZX1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlVGltZX1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGltZSB0byB3YWl0IGJlZm9yZSBlbWl0dGluZyB0aGUgbW9zdCByZWNlbnQgc291cmNlXG4gKiB2YWx1ZSwgbWVhc3VyZWQgaW4gbWlsbGlzZWNvbmRzIG9yIHRoZSB0aW1lIHVuaXQgZGV0ZXJtaW5lZCBpbnRlcm5hbGx5XG4gKiBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmAuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIHtAbGluayBJU2NoZWR1bGVyfSB0byB1c2UgZm9yXG4gKiBtYW5hZ2luZyB0aGUgdGltZXJzIHRoYXQgaGFuZGxlIHRoZSByYXRlLWxpbWl0aW5nIGJlaGF2aW9yLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IHBlcmZvcm1zIHJhdGUtbGltaXRpbmcgb2ZcbiAqIGVtaXNzaW9ucyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgYXVkaXRUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXVkaXRUaW1lPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGR1cmF0aW9uOiBudW1iZXIsIHNjaGVkdWxlcjogSVNjaGVkdWxlciA9IGFzeW5jKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEF1ZGl0VGltZU9wZXJhdG9yKGR1cmF0aW9uLCBzY2hlZHVsZXIpKTtcbn1cblxuY2xhc3MgQXVkaXRUaW1lT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHVyYXRpb246IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgQXVkaXRUaW1lU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmR1cmF0aW9uLCB0aGlzLnNjaGVkdWxlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBBdWRpdFRpbWVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgcHJpdmF0ZSB2YWx1ZTogVDtcbiAgcHJpdmF0ZSBoYXNWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHRocm90dGxlZDogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGR1cmF0aW9uOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaGFzVmFsdWUgPSB0cnVlO1xuICAgIGlmICghdGhpcy50aHJvdHRsZWQpIHtcbiAgICAgIHRoaXMuYWRkKHRoaXMudGhyb3R0bGVkID0gdGhpcy5zY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCB0aGlzLmR1cmF0aW9uLCB0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJUaHJvdHRsZSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHZhbHVlLCBoYXNWYWx1ZSwgdGhyb3R0bGVkIH0gPSB0aGlzO1xuICAgIGlmICh0aHJvdHRsZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKHRocm90dGxlZCk7XG4gICAgICB0aGlzLnRocm90dGxlZCA9IG51bGw7XG4gICAgICB0aHJvdHRsZWQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dDxUPihzdWJzY3JpYmVyOiBBdWRpdFRpbWVTdWJzY3JpYmVyPFQ+KTogdm9pZCB7XG4gIHN1YnNjcmliZXIuY2xlYXJUaHJvdHRsZSgpO1xufVxuIl19