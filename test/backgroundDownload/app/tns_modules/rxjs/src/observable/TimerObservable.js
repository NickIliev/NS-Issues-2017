"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNumeric_1 = require("../util/isNumeric");
var Observable_1 = require("../Observable");
var async_1 = require("../scheduler/async");
var isScheduler_1 = require("../util/isScheduler");
var isDate_1 = require("../util/isDate");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var TimerObservable = (function (_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        var _this = _super.call(this) || this;
        _this.period = -1;
        _this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
            _this.period = Number(period) < 1 && 1 || Number(period);
        }
        else if (isScheduler_1.isScheduler(period)) {
            scheduler = period;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
            scheduler = async_1.async;
        }
        _this.scheduler = scheduler;
        _this.dueTime = isDate_1.isDate(dueTime) ?
            (+dueTime - _this.scheduler.now()) :
            dueTime;
        return _this;
    }
    /**
     * Creates an Observable that starts emitting after an `initialDelay` and
     * emits ever increasing numbers after each `period` of time thereafter.
     *
     * <span class="informal">Its like {@link interval}, but you can specify when
     * should the emissions start.</span>
     *
     * <img src="./img/timer.png" width="100%">
     *
     * `timer` returns an Observable that emits an infinite sequence of ascending
     * integers, with a constant interval of time, `period` of your choosing
     * between those emissions. The first emission happens after the specified
     * `initialDelay`. The initial delay may be a {@link Date}. By default, this
     * operator uses the `async` IScheduler to provide a notion of time, but you
     * may pass any IScheduler to it. If `period` is not specified, the output
     * Observable emits only one value, `0`. Otherwise, it emits an infinite
     * sequence.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
     * var numbers = Rx.Observable.timer(3000, 1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @example <caption>Emits one number after five seconds</caption>
     * var numbers = Rx.Observable.timer(5000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link interval}
     * @see {@link delay}
     *
     * @param {number|Date} initialDelay The initial delay time to wait before
     * emitting the first value of `0`.
     * @param {number} [period] The period of time between emissions of the
     * subsequent numbers.
     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a `0` after the
     * `initialDelay` and ever increasing numbers after each `period` of time
     * thereafter.
     * @static true
     * @name timer
     * @owner Observable
     */
    TimerObservable.create = function (initialDelay, period, scheduler) {
        if (initialDelay === void 0) { initialDelay = 0; }
        return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function (state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        else if (period === -1) {
            return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, period = _a.period, dueTime = _a.dueTime, scheduler = _a.scheduler;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
            index: index, period: period, subscriber: subscriber
        });
    };
    return TimerObservable;
}(Observable_1.Observable));
exports.TimerObservable = TimerObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZXJPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGltZXJPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQThDO0FBRTlDLDRDQUEyQztBQUMzQyw0Q0FBMkM7QUFDM0MsbURBQWtEO0FBQ2xELHlDQUF3QztBQUl4Qzs7OztHQUlHO0FBQ0g7SUFBcUMsbUNBQWtCO0lBdUVyRCx5QkFBWSxPQUEwQixFQUMxQixNQUE0QixFQUM1QixTQUFzQjtRQUZ0Qix3QkFBQSxFQUFBLFdBQTBCO1FBQXRDLFlBR0UsaUJBQU8sU0FnQlI7UUF2Qk8sWUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFRMUIsRUFBRSxDQUFDLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyx5QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixTQUFTLEdBQWdCLE1BQU0sQ0FBQztRQUNsQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixTQUFTLEdBQUcsYUFBSyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLGVBQU0sQ0FBQyxPQUFPLENBQUM7WUFDNUIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLE9BQVEsQ0FBQzs7SUFDdkIsQ0FBQztJQXhGRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSSxzQkFBTSxHQUFiLFVBQWMsWUFBK0IsRUFDL0IsTUFBNEIsRUFDNUIsU0FBc0I7UUFGdEIsNkJBQUEsRUFBQSxnQkFBK0I7UUFHM0MsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsS0FBVTtRQUVoQixJQUFBLG1CQUFLLEVBQUUscUJBQU0sRUFBRSw2QkFBVSxDQUFXO1FBQzVDLElBQU0sTUFBTSxHQUFVLElBQUssQ0FBQztRQUU1QixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFFRCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQTJCUyxvQ0FBVSxHQUFwQixVQUFxQixVQUE4QjtRQUNqRCxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDVixJQUFBLFNBQXFDLEVBQW5DLGtCQUFNLEVBQUUsb0JBQU8sRUFBRSx3QkFBUyxDQUFVO1FBRTVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFO1lBQzNELEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLFVBQVUsWUFBQTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBcEdELENBQXFDLHVCQUFVLEdBb0c5QztBQXBHWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gJy4uL3V0aWwvaXNOdW1lcmljJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHsgaXNTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7IGlzRGF0ZSB9IGZyb20gJy4uL3V0aWwvaXNEYXRlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWVyT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8bnVtYmVyPiB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IHN0YXJ0cyBlbWl0dGluZyBhZnRlciBhbiBgaW5pdGlhbERlbGF5YCBhbmRcbiAgICogZW1pdHMgZXZlciBpbmNyZWFzaW5nIG51bWJlcnMgYWZ0ZXIgZWFjaCBgcGVyaW9kYCBvZiB0aW1lIHRoZXJlYWZ0ZXIuXG4gICAqXG4gICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdHMgbGlrZSB7QGxpbmsgaW50ZXJ2YWx9LCBidXQgeW91IGNhbiBzcGVjaWZ5IHdoZW5cbiAgICogc2hvdWxkIHRoZSBlbWlzc2lvbnMgc3RhcnQuPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL3RpbWVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgKlxuICAgKiBgdGltZXJgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGFuIGluZmluaXRlIHNlcXVlbmNlIG9mIGFzY2VuZGluZ1xuICAgKiBpbnRlZ2Vycywgd2l0aCBhIGNvbnN0YW50IGludGVydmFsIG9mIHRpbWUsIGBwZXJpb2RgIG9mIHlvdXIgY2hvb3NpbmdcbiAgICogYmV0d2VlbiB0aG9zZSBlbWlzc2lvbnMuIFRoZSBmaXJzdCBlbWlzc2lvbiBoYXBwZW5zIGFmdGVyIHRoZSBzcGVjaWZpZWRcbiAgICogYGluaXRpYWxEZWxheWAuIFRoZSBpbml0aWFsIGRlbGF5IG1heSBiZSBhIHtAbGluayBEYXRlfS4gQnkgZGVmYXVsdCwgdGhpc1xuICAgKiBvcGVyYXRvciB1c2VzIHRoZSBgYXN5bmNgIElTY2hlZHVsZXIgdG8gcHJvdmlkZSBhIG5vdGlvbiBvZiB0aW1lLCBidXQgeW91XG4gICAqIG1heSBwYXNzIGFueSBJU2NoZWR1bGVyIHRvIGl0LiBJZiBgcGVyaW9kYCBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgb3V0cHV0XG4gICAqIE9ic2VydmFibGUgZW1pdHMgb25seSBvbmUgdmFsdWUsIGAwYC4gT3RoZXJ3aXNlLCBpdCBlbWl0cyBhbiBpbmZpbml0ZVxuICAgKiBzZXF1ZW5jZS5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgYXNjZW5kaW5nIG51bWJlcnMsIG9uZSBldmVyeSBzZWNvbmQgKDEwMDBtcyksIHN0YXJ0aW5nIGFmdGVyIDMgc2Vjb25kczwvY2FwdGlvbj5cbiAgICogdmFyIG51bWJlcnMgPSBSeC5PYnNlcnZhYmxlLnRpbWVyKDMwMDAsIDEwMDApO1xuICAgKiBudW1iZXJzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgb25lIG51bWJlciBhZnRlciBmaXZlIHNlY29uZHM8L2NhcHRpb24+XG4gICAqIHZhciBudW1iZXJzID0gUnguT2JzZXJ2YWJsZS50aW1lcig1MDAwKTtcbiAgICogbnVtYmVycy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGludGVydmFsfVxuICAgKiBAc2VlIHtAbGluayBkZWxheX1cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ8RGF0ZX0gaW5pdGlhbERlbGF5IFRoZSBpbml0aWFsIGRlbGF5IHRpbWUgdG8gd2FpdCBiZWZvcmVcbiAgICogZW1pdHRpbmcgdGhlIGZpcnN0IHZhbHVlIG9mIGAwYC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtwZXJpb2RdIFRoZSBwZXJpb2Qgb2YgdGltZSBiZXR3ZWVuIGVtaXNzaW9ucyBvZiB0aGVcbiAgICogc3Vic2VxdWVudCBudW1iZXJzLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIElTY2hlZHVsZXIgdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gICAqIHRoZSBlbWlzc2lvbiBvZiB2YWx1ZXMsIGFuZCBwcm92aWRpbmcgYSBub3Rpb24gb2YgXCJ0aW1lXCIuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhIGAwYCBhZnRlciB0aGVcbiAgICogYGluaXRpYWxEZWxheWAgYW5kIGV2ZXIgaW5jcmVhc2luZyBudW1iZXJzIGFmdGVyIGVhY2ggYHBlcmlvZGAgb2YgdGltZVxuICAgKiB0aGVyZWFmdGVyLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgdGltZXJcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUoaW5pdGlhbERlbGF5OiBudW1iZXIgfCBEYXRlID0gMCxcbiAgICAgICAgICAgICAgICBwZXJpb2Q/OiBudW1iZXIgfCBJU2NoZWR1bGVyLFxuICAgICAgICAgICAgICAgIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiBuZXcgVGltZXJPYnNlcnZhYmxlKGluaXRpYWxEZWxheSwgcGVyaW9kLCBzY2hlZHVsZXIpO1xuICB9XG5cbiAgc3RhdGljIGRpc3BhdGNoKHN0YXRlOiBhbnkpIHtcblxuICAgIGNvbnN0IHsgaW5kZXgsIHBlcmlvZCwgc3Vic2NyaWJlciB9ID0gc3RhdGU7XG4gICAgY29uc3QgYWN0aW9uID0gKDxhbnk+IHRoaXMpO1xuXG4gICAgc3Vic2NyaWJlci5uZXh0KGluZGV4KTtcblxuICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAocGVyaW9kID09PSAtMSkge1xuICAgICAgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICBhY3Rpb24uc2NoZWR1bGUoc3RhdGUsIHBlcmlvZCk7XG4gIH1cblxuICBwcml2YXRlIHBlcmlvZDogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgZHVlVGltZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXI7XG5cbiAgY29uc3RydWN0b3IoZHVlVGltZTogbnVtYmVyIHwgRGF0ZSA9IDAsXG4gICAgICAgICAgICAgIHBlcmlvZD86IG51bWJlciB8IElTY2hlZHVsZXIsXG4gICAgICAgICAgICAgIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKGlzTnVtZXJpYyhwZXJpb2QpKSB7XG4gICAgICB0aGlzLnBlcmlvZCA9IE51bWJlcihwZXJpb2QpIDwgMSAmJiAxIHx8IE51bWJlcihwZXJpb2QpO1xuICAgIH0gZWxzZSBpZiAoaXNTY2hlZHVsZXIocGVyaW9kKSkge1xuICAgICAgc2NoZWR1bGVyID0gPElTY2hlZHVsZXI+IHBlcmlvZDtcbiAgICB9XG5cbiAgICBpZiAoIWlzU2NoZWR1bGVyKHNjaGVkdWxlcikpIHtcbiAgICAgIHNjaGVkdWxlciA9IGFzeW5jO1xuICAgIH1cblxuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgIHRoaXMuZHVlVGltZSA9IGlzRGF0ZShkdWVUaW1lKSA/XG4gICAgICAoK2R1ZVRpbWUgLSB0aGlzLnNjaGVkdWxlci5ub3coKSkgOlxuICAgICAgKDxudW1iZXI+IGR1ZVRpbWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxudW1iZXI+KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgY29uc3QgaW5kZXggPSAwO1xuICAgIGNvbnN0IHsgcGVyaW9kLCBkdWVUaW1lLCBzY2hlZHVsZXIgfSA9IHRoaXM7XG5cbiAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKFRpbWVyT2JzZXJ2YWJsZS5kaXNwYXRjaCwgZHVlVGltZSwge1xuICAgICAgaW5kZXgsIHBlcmlvZCwgc3Vic2NyaWJlclxuICAgIH0pO1xuICB9XG59XG4iXX0=