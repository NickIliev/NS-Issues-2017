"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNumeric_1 = require("../util/isNumeric");
var Observable_1 = require("../Observable");
var async_1 = require("../scheduler/async");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IntervalObservable = (function (_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        var _this = _super.call(this) || this;
        _this.period = period;
        _this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
            _this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = async_1.async;
        }
        return _this;
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified IScheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` IScheduler to provide a notion of time, but you may pass any
     * IScheduler to it.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link delay}
     *
     * @param {number} [period=0] The interval size in milliseconds (by default)
     * or the time unit determined by the scheduler's clock.
     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a sequential number each time
     * interval.
     * @static true
     * @name interval
     * @owner Observable
     */
    IntervalObservable.create = function (period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
        var index = state.index, subscriber = state.subscriber, period = state.period;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };
    return IntervalObservable;
}(Observable_1.Observable));
exports.IntervalObservable = IntervalObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJ2YWxPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJ2YWxPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0NBQThDO0FBRTlDLDRDQUEyQztBQUMzQyw0Q0FBMkM7QUFFM0M7Ozs7R0FJRztBQUNIO0lBQXdDLHNDQUFrQjtJQXFEeEQsNEJBQW9CLE1BQWtCLEVBQ2xCLFNBQTZCO1FBRDdCLHVCQUFBLEVBQUEsVUFBa0I7UUFDbEIsMEJBQUEsRUFBQSx5QkFBNkI7UUFEakQsWUFFRSxpQkFBTyxTQU9SO1FBVG1CLFlBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsZUFBUyxHQUFULFNBQVMsQ0FBb0I7UUFFL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsU0FBUyxHQUFHLGFBQUssQ0FBQztRQUN6QixDQUFDOztJQUNILENBQUM7SUE3REQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBQ0kseUJBQU0sR0FBYixVQUFjLE1BQWtCLEVBQ2xCLFNBQTZCO1FBRDdCLHVCQUFBLEVBQUEsVUFBa0I7UUFDbEIsMEJBQUEsRUFBQSx5QkFBNkI7UUFDekMsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLEtBQVU7UUFDaEIsSUFBQSxtQkFBSyxFQUFFLDZCQUFVLEVBQUUscUJBQU0sQ0FBVztRQUU1QyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUVWLElBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFhUyx1Q0FBVSxHQUFwQixVQUFxQixVQUE4QjtRQUNqRCxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWpDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFO1lBQ3JFLEtBQUssT0FBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLE1BQU0sUUFBQTtTQUMxQixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF6RUQsQ0FBd0MsdUJBQVUsR0F5RWpEO0FBekVZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gJy4uL3V0aWwvaXNOdW1lcmljJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEludGVydmFsT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8bnVtYmVyPiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBzZXF1ZW50aWFsIG51bWJlcnMgZXZlcnkgc3BlY2lmaWVkXG4gICAqIGludGVydmFsIG9mIHRpbWUsIG9uIGEgc3BlY2lmaWVkIElTY2hlZHVsZXIuXG4gICAqXG4gICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyBpbmNyZW1lbnRhbCBudW1iZXJzIHBlcmlvZGljYWxseSBpbiB0aW1lLlxuICAgKiA8L3NwYW4+XG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvaW50ZXJ2YWwucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIGBpbnRlcnZhbGAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYW4gaW5maW5pdGUgc2VxdWVuY2Ugb2ZcbiAgICogYXNjZW5kaW5nIGludGVnZXJzLCB3aXRoIGEgY29uc3RhbnQgaW50ZXJ2YWwgb2YgdGltZSBvZiB5b3VyIGNob29zaW5nXG4gICAqIGJldHdlZW4gdGhvc2UgZW1pc3Npb25zLiBUaGUgZmlyc3QgZW1pc3Npb24gaXMgbm90IHNlbnQgaW1tZWRpYXRlbHksIGJ1dFxuICAgKiBvbmx5IGFmdGVyIHRoZSBmaXJzdCBwZXJpb2QgaGFzIHBhc3NlZC4gQnkgZGVmYXVsdCwgdGhpcyBvcGVyYXRvciB1c2VzIHRoZVxuICAgKiBgYXN5bmNgIElTY2hlZHVsZXIgdG8gcHJvdmlkZSBhIG5vdGlvbiBvZiB0aW1lLCBidXQgeW91IG1heSBwYXNzIGFueVxuICAgKiBJU2NoZWR1bGVyIHRvIGl0LlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0cyBhc2NlbmRpbmcgbnVtYmVycywgb25lIGV2ZXJ5IHNlY29uZCAoMTAwMG1zKTwvY2FwdGlvbj5cbiAgICogdmFyIG51bWJlcnMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgKiBudW1iZXJzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgdGltZXJ9XG4gICAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3BlcmlvZD0wXSBUaGUgaW50ZXJ2YWwgc2l6ZSBpbiBtaWxsaXNlY29uZHMgKGJ5IGRlZmF1bHQpXG4gICAqIG9yIHRoZSB0aW1lIHVuaXQgZGV0ZXJtaW5lZCBieSB0aGUgc2NoZWR1bGVyJ3MgY2xvY2suXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jXSBUaGUgSVNjaGVkdWxlciB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICogdGhlIGVtaXNzaW9uIG9mIHZhbHVlcywgYW5kIHByb3ZpZGluZyBhIG5vdGlvbiBvZiBcInRpbWVcIi5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2VxdWVudGlhbCBudW1iZXIgZWFjaCB0aW1lXG4gICAqIGludGVydmFsLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgaW50ZXJ2YWxcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUocGVyaW9kOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgIHNjaGVkdWxlcjogSVNjaGVkdWxlciA9IGFzeW5jKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gbmV3IEludGVydmFsT2JzZXJ2YWJsZShwZXJpb2QsIHNjaGVkdWxlcik7XG4gIH1cblxuICBzdGF0aWMgZGlzcGF0Y2goc3RhdGU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHsgaW5kZXgsIHN1YnNjcmliZXIsIHBlcmlvZCB9ID0gc3RhdGU7XG5cbiAgICBzdWJzY3JpYmVyLm5leHQoaW5kZXgpO1xuXG4gICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUuaW5kZXggKz0gMTtcblxuICAgICg8YW55PiB0aGlzKS5zY2hlZHVsZShzdGF0ZSwgcGVyaW9kKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGVyaW9kOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlciA9IGFzeW5jKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoIWlzTnVtZXJpYyhwZXJpb2QpIHx8IHBlcmlvZCA8IDApIHtcbiAgICAgIHRoaXMucGVyaW9kID0gMDtcbiAgICB9XG4gICAgaWYgKCFzY2hlZHVsZXIgfHwgdHlwZW9mIHNjaGVkdWxlci5zY2hlZHVsZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zY2hlZHVsZXIgPSBhc3luYztcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPG51bWJlcj4pIHtcbiAgICBjb25zdCBpbmRleCA9IDA7XG4gICAgY29uc3QgcGVyaW9kID0gdGhpcy5wZXJpb2Q7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG5cbiAgICBzdWJzY3JpYmVyLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoSW50ZXJ2YWxPYnNlcnZhYmxlLmRpc3BhdGNoLCBwZXJpb2QsIHtcbiAgICAgIGluZGV4LCBzdWJzY3JpYmVyLCBwZXJpb2RcbiAgICB9KSk7XG4gIH1cbn1cbiJdfQ==