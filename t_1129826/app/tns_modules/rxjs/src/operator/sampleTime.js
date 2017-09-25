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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNhbXBsZVRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBMkM7QUFHM0MsNENBQTJDO0FBRzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILG9CQUFtRCxNQUFjLEVBQUUsU0FBNkI7SUFBN0IsMEJBQUEsRUFBQSxZQUF3QixhQUFLO0lBQzlGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFDRSw0QkFBb0IsTUFBYyxFQUNkLFNBQXFCO1FBRHJCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQ3pDLENBQUM7SUFFRCxpQ0FBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFBc0Msd0NBQWE7SUFJakQsOEJBQVksV0FBMEIsRUFDbEIsTUFBYyxFQUNkLFNBQXFCO1FBRnpDLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBSm1CLFlBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFTLEdBQVQsU0FBUyxDQUFZO1FBSnpDLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFNeEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFJLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0lBQzNGLENBQUM7SUFFUyxvQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELHlDQUFVLEdBQVY7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUF0QkQsQ0FBc0MsdUJBQVUsR0FzQi9DO0FBRUQsOEJBQW9ELEtBQVU7SUFDdEQsSUFBQSw2QkFBVSxFQUFFLHFCQUFNLENBQVc7SUFDbkMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vc2NoZWR1bGVyL0FjdGlvbic7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBFbWl0cyB0aGUgbW9zdCByZWNlbnRseSBlbWl0dGVkIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpdGhpblxuICogcGVyaW9kaWMgdGltZSBpbnRlcnZhbHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlNhbXBsZXMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGF0IHBlcmlvZGljIHRpbWVcbiAqIGludGVydmFscywgZW1pdHRpbmcgd2hhdCBpdCBzYW1wbGVzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3NhbXBsZVRpbWUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHNhbXBsZVRpbWVgIHBlcmlvZGljYWxseSBsb29rcyBhdCB0aGUgc291cmNlIE9ic2VydmFibGUgYW5kIGVtaXRzIHdoaWNoZXZlclxuICogdmFsdWUgaXQgaGFzIG1vc3QgcmVjZW50bHkgZW1pdHRlZCBzaW5jZSB0aGUgcHJldmlvdXMgc2FtcGxpbmcsIHVubGVzcyB0aGVcbiAqIHNvdXJjZSBoYXMgbm90IGVtaXR0ZWQgYW55dGhpbmcgc2luY2UgdGhlIHByZXZpb3VzIHNhbXBsaW5nLiBUaGUgc2FtcGxpbmdcbiAqIGhhcHBlbnMgcGVyaW9kaWNhbGx5IGluIHRpbWUgZXZlcnkgYHBlcmlvZGAgbWlsbGlzZWNvbmRzIChvciB0aGUgdGltZSB1bml0XG4gKiBkZWZpbmVkIGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYCBhcmd1bWVudCkuIFRoZSBzYW1wbGluZyBzdGFydHMgYXMgc29vbiBhc1xuICogdGhlIG91dHB1dCBPYnNlcnZhYmxlIGlzIHN1YnNjcmliZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RXZlcnkgc2Vjb25kLCBlbWl0IHRoZSBtb3N0IHJlY2VudCBjbGljayBhdCBtb3N0IG9uY2U8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5zYW1wbGVUaW1lKDEwMDApO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBhdWRpdFRpbWV9XG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZVRpbWV9XG4gKiBAc2VlIHtAbGluayBkZWxheX1cbiAqIEBzZWUge0BsaW5rIHNhbXBsZX1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlVGltZX1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gcGVyaW9kIFRoZSBzYW1wbGluZyBwZXJpb2QgZXhwcmVzc2VkIGluIG1pbGxpc2Vjb25kcyBvciB0aGVcbiAqIHRpbWUgdW5pdCBkZXRlcm1pbmVkIGludGVybmFsbHkgYnkgdGhlIG9wdGlvbmFsIGBzY2hlZHVsZXJgLlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9YXN5bmNdIFRoZSB7QGxpbmsgSVNjaGVkdWxlcn0gdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgc2FtcGxpbmcuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdHMgb2Ygc2FtcGxpbmcgdGhlXG4gKiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYXQgdGhlIHNwZWNpZmllZCB0aW1lIGludGVydmFsLlxuICogQG1ldGhvZCBzYW1wbGVUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlVGltZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwZXJpb2Q6IG51bWJlciwgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgU2FtcGxlVGltZU9wZXJhdG9yKHBlcmlvZCwgc2NoZWR1bGVyKSk7XG59XG5cbmNsYXNzIFNhbXBsZVRpbWVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwZXJpb2Q6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgU2FtcGxlVGltZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wZXJpb2QsIHRoaXMuc2NoZWR1bGVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFNhbXBsZVRpbWVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGxhc3RWYWx1ZTogVDtcbiAgaGFzVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwZXJpb2Q6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTm90aWZpY2F0aW9uLCBwZXJpb2QsIHsgc3Vic2NyaWJlcjogdGhpcywgcGVyaW9kIH0pKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gIH1cblxuICBub3RpZnlOZXh0KCkge1xuICAgIGlmICh0aGlzLmhhc1ZhbHVlKSB7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodGhpcy5sYXN0VmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaE5vdGlmaWNhdGlvbjxUPih0aGlzOiBBY3Rpb248YW55Piwgc3RhdGU6IGFueSkge1xuICBsZXQgeyBzdWJzY3JpYmVyLCBwZXJpb2QgfSA9IHN0YXRlO1xuICBzdWJzY3JpYmVyLm5vdGlmeU5leHQoKTtcbiAgdGhpcy5zY2hlZHVsZShzdGF0ZSwgcGVyaW9kKTtcbn1cbiJdfQ==