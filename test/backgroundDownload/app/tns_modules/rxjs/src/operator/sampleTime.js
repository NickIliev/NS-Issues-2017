"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var async_1 = require("../scheduler/async");
/**
 * Emits the most recently emitted value from the source Observable within
 * periodic time intervals.
 *
 * <span class="informal">Samples the source Observable at periodic time
 * intervals, emitting what it samples.</span>
 *
 * <img src="./img/sampleTime.png" width="100%">
 *
 * `sampleTime` periodically looks at the source Observable and emits whichever
 * value it has most recently emitted since the previous sampling, unless the
 * source has not emitted anything since the previous sampling. The sampling
 * happens periodically in time every `period` milliseconds (or the time unit
 * defined by the optional `scheduler` argument). The sampling starts as soon as
 * the output Observable is subscribed.
 *
 * @example <caption>Every second, emit the most recent click at most once</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.sampleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {number} period The sampling period expressed in milliseconds or the
 * time unit determined internally by the optional `scheduler`.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the sampling.
 * @return {Observable<T>} An Observable that emits the results of sampling the
 * values emitted by the source Observable at the specified time interval.
 * @method sampleTime
 * @owner Observable
 */
function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new SampleTimeOperator(period, scheduler));
}
exports.sampleTime = sampleTime;
var SampleTimeOperator = (function () {
    function SampleTimeOperator(period, scheduler) {
        this.period = period;
        this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
    };
    return SampleTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SampleTimeSubscriber = (function (_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, period, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.period = period;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
        return _this;
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNotification(state) {
    var subscriber = state.subscriber, period = state.period;
    subscriber.notifyNext();
    this.schedule(state, period);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNhbXBsZVRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBMkM7QUFHM0MsNENBQTJDO0FBRzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILG9CQUFtRCxNQUFjLEVBQUUsU0FBNkI7SUFBN0IsMEJBQUEsRUFBQSx5QkFBNkI7SUFDOUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUNFLDRCQUFvQixNQUFjLEVBQ2QsU0FBcUI7UUFEckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDekMsQ0FBQztJQUVELGlDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFzQyx3Q0FBYTtJQUlqRCw4QkFBWSxXQUEwQixFQUNsQixNQUFjLEVBQ2QsU0FBcUI7UUFGekMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FFbkI7UUFKbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVMsR0FBVCxTQUFTLENBQVk7UUFKekMsY0FBUSxHQUFZLEtBQUssQ0FBQztRQU14QixLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUksRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFDM0YsQ0FBQztJQUVTLG9DQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQseUNBQVUsR0FBVjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQXRCRCxDQUFzQyx1QkFBVSxHQXNCL0M7QUFFRCw4QkFBb0QsS0FBVTtJQUN0RCxJQUFBLDZCQUFVLEVBQUUscUJBQU0sQ0FBVztJQUNuQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi9zY2hlZHVsZXIvQWN0aW9uJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIEVtaXRzIHRoZSBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aGluXG4gKiBwZXJpb2RpYyB0aW1lIGludGVydmFscy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+U2FtcGxlcyB0aGUgc291cmNlIE9ic2VydmFibGUgYXQgcGVyaW9kaWMgdGltZVxuICogaW50ZXJ2YWxzLCBlbWl0dGluZyB3aGF0IGl0IHNhbXBsZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2FtcGxlVGltZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgc2FtcGxlVGltZWAgcGVyaW9kaWNhbGx5IGxvb2tzIGF0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgZW1pdHMgd2hpY2hldmVyXG4gKiB2YWx1ZSBpdCBoYXMgbW9zdCByZWNlbnRseSBlbWl0dGVkIHNpbmNlIHRoZSBwcmV2aW91cyBzYW1wbGluZywgdW5sZXNzIHRoZVxuICogc291cmNlIGhhcyBub3QgZW1pdHRlZCBhbnl0aGluZyBzaW5jZSB0aGUgcHJldmlvdXMgc2FtcGxpbmcuIFRoZSBzYW1wbGluZ1xuICogaGFwcGVucyBwZXJpb2RpY2FsbHkgaW4gdGltZSBldmVyeSBgcGVyaW9kYCBtaWxsaXNlY29uZHMgKG9yIHRoZSB0aW1lIHVuaXRcbiAqIGRlZmluZWQgYnkgdGhlIG9wdGlvbmFsIGBzY2hlZHVsZXJgIGFyZ3VtZW50KS4gVGhlIHNhbXBsaW5nIHN0YXJ0cyBhcyBzb29uIGFzXG4gKiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FdmVyeSBzZWNvbmQsIGVtaXQgdGhlIG1vc3QgcmVjZW50IGNsaWNrIGF0IG1vc3Qgb25jZTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLnNhbXBsZVRpbWUoMTAwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0VGltZX1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICogQHNlZSB7QGxpbmsgc2FtcGxlfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGVUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBwZXJpb2QgVGhlIHNhbXBsaW5nIHBlcmlvZCBleHByZXNzZWQgaW4gbWlsbGlzZWNvbmRzIG9yIHRoZVxuICogdGltZSB1bml0IGRldGVybWluZWQgaW50ZXJuYWxseSBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmAuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIHtAbGluayBJU2NoZWR1bGVyfSB0byB1c2UgZm9yXG4gKiBtYW5hZ2luZyB0aGUgdGltZXJzIHRoYXQgaGFuZGxlIHRoZSBzYW1wbGluZy5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0cyBvZiBzYW1wbGluZyB0aGVcbiAqIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhdCB0aGUgc3BlY2lmaWVkIHRpbWUgaW50ZXJ2YWwuXG4gKiBAbWV0aG9kIHNhbXBsZVRpbWVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW1wbGVUaW1lPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHBlcmlvZDogbnVtYmVyLCBzY2hlZHVsZXI6IElTY2hlZHVsZXIgPSBhc3luYyk6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTYW1wbGVUaW1lT3BlcmF0b3IocGVyaW9kLCBzY2hlZHVsZXIpKTtcbn1cblxuY2xhc3MgU2FtcGxlVGltZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBlcmlvZDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTYW1wbGVUaW1lU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnBlcmlvZCwgdGhpcy5zY2hlZHVsZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgU2FtcGxlVGltZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgbGFzdFZhbHVlOiBUO1xuICBoYXNWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHBlcmlvZDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOb3RpZmljYXRpb24sIHBlcmlvZCwgeyBzdWJzY3JpYmVyOiB0aGlzLCBwZXJpb2QgfSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgdGhpcy5sYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmhhc1ZhbHVlID0gdHJ1ZTtcbiAgfVxuXG4gIG5vdGlmeU5leHQoKSB7XG4gICAgaWYgKHRoaXMuaGFzVmFsdWUpIHtcbiAgICAgIHRoaXMuaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh0aGlzLmxhc3RWYWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoTm90aWZpY2F0aW9uPFQ+KHRoaXM6IEFjdGlvbjxhbnk+LCBzdGF0ZTogYW55KSB7XG4gIGxldCB7IHN1YnNjcmliZXIsIHBlcmlvZCB9ID0gc3RhdGU7XG4gIHN1YnNjcmliZXIubm90aWZ5TmV4dCgpO1xuICB0aGlzLnNjaGVkdWxlKHN0YXRlLCBwZXJpb2QpO1xufVxuIl19