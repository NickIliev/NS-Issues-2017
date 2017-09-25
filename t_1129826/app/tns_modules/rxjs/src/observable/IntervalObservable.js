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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJ2YWxPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJ2YWxPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0NBQThDO0FBRTlDLDRDQUEyQztBQUMzQyw0Q0FBMkM7QUFFM0M7Ozs7R0FJRztBQUNIO0lBQXdDLHNDQUFrQjtJQXFEeEQsNEJBQW9CLE1BQWtCLEVBQ2xCLFNBQTZCO1FBRDdCLHVCQUFBLEVBQUEsVUFBa0I7UUFDbEIsMEJBQUEsRUFBQSxZQUF3QixhQUFLO1FBRGpELFlBRUUsaUJBQU8sU0FPUjtRQVRtQixZQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVMsR0FBVCxTQUFTLENBQW9CO1FBRS9DLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0QsS0FBSSxDQUFDLFNBQVMsR0FBRyxhQUFLLENBQUM7UUFDekIsQ0FBQzs7SUFDSCxDQUFDO0lBN0REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNJLHlCQUFNLEdBQWIsVUFBYyxNQUFrQixFQUNsQixTQUE2QjtRQUQ3Qix1QkFBQSxFQUFBLFVBQWtCO1FBQ2xCLDBCQUFBLEVBQUEsWUFBd0IsYUFBSztRQUN6QyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLDJCQUFRLEdBQWYsVUFBZ0IsS0FBVTtRQUNoQixJQUFBLG1CQUFLLEVBQUUsNkJBQVUsRUFBRSxxQkFBTSxDQUFXO1FBRTVDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBRVYsSUFBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQWFTLHVDQUFVLEdBQXBCLFVBQXFCLFVBQThCO1FBQ2pELElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFakMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUU7WUFDckUsS0FBSyxPQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsTUFBTSxRQUFBO1NBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXpFRCxDQUF3Qyx1QkFBVSxHQXlFakQ7QUF6RVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgaXNOdW1lcmljIH0gZnJvbSAnLi4vdXRpbC9pc051bWVyaWMnO1xuaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgSW50ZXJ2YWxPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHNlcXVlbnRpYWwgbnVtYmVycyBldmVyeSBzcGVjaWZpZWRcbiAgICogaW50ZXJ2YWwgb2YgdGltZSwgb24gYSBzcGVjaWZpZWQgSVNjaGVkdWxlci5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVtaXRzIGluY3JlbWVudGFsIG51bWJlcnMgcGVyaW9kaWNhbGx5IGluIHRpbWUuXG4gICAqIDwvc3Bhbj5cbiAgICpcbiAgICogPGltZyBzcmM9XCIuL2ltZy9pbnRlcnZhbC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogYGludGVydmFsYCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhbiBpbmZpbml0ZSBzZXF1ZW5jZSBvZlxuICAgKiBhc2NlbmRpbmcgaW50ZWdlcnMsIHdpdGggYSBjb25zdGFudCBpbnRlcnZhbCBvZiB0aW1lIG9mIHlvdXIgY2hvb3NpbmdcbiAgICogYmV0d2VlbiB0aG9zZSBlbWlzc2lvbnMuIFRoZSBmaXJzdCBlbWlzc2lvbiBpcyBub3Qgc2VudCBpbW1lZGlhdGVseSwgYnV0XG4gICAqIG9ubHkgYWZ0ZXIgdGhlIGZpcnN0IHBlcmlvZCBoYXMgcGFzc2VkLiBCeSBkZWZhdWx0LCB0aGlzIG9wZXJhdG9yIHVzZXMgdGhlXG4gICAqIGBhc3luY2AgSVNjaGVkdWxlciB0byBwcm92aWRlIGEgbm90aW9uIG9mIHRpbWUsIGJ1dCB5b3UgbWF5IHBhc3MgYW55XG4gICAqIElTY2hlZHVsZXIgdG8gaXQuXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXRzIGFzY2VuZGluZyBudW1iZXJzLCBvbmUgZXZlcnkgc2Vjb25kICgxMDAwbXMpPC9jYXB0aW9uPlxuICAgKiB2YXIgbnVtYmVycyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gICAqIG51bWJlcnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiBAc2VlIHtAbGluayB0aW1lcn1cbiAgICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcGVyaW9kPTBdIFRoZSBpbnRlcnZhbCBzaXplIGluIG1pbGxpc2Vjb25kcyAoYnkgZGVmYXVsdClcbiAgICogb3IgdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkIGJ5IHRoZSBzY2hlZHVsZXIncyBjbG9jay5cbiAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9YXN5bmNdIFRoZSBJU2NoZWR1bGVyIHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICAgKiB0aGUgZW1pc3Npb24gb2YgdmFsdWVzLCBhbmQgcHJvdmlkaW5nIGEgbm90aW9uIG9mIFwidGltZVwiLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBzZXF1ZW50aWFsIG51bWJlciBlYWNoIHRpbWVcbiAgICogaW50ZXJ2YWwuXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBpbnRlcnZhbFxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZShwZXJpb2Q6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWxPYnNlcnZhYmxlKHBlcmlvZCwgc2NoZWR1bGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBkaXNwYXRjaChzdGF0ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgeyBpbmRleCwgc3Vic2NyaWJlciwgcGVyaW9kIH0gPSBzdGF0ZTtcblxuICAgIHN1YnNjcmliZXIubmV4dChpbmRleCk7XG5cbiAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdGF0ZS5pbmRleCArPSAxO1xuXG4gICAgKDxhbnk+IHRoaXMpLnNjaGVkdWxlKHN0YXRlLCBwZXJpb2QpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwZXJpb2Q6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXN5bmMpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICghaXNOdW1lcmljKHBlcmlvZCkgfHwgcGVyaW9kIDwgMCkge1xuICAgICAgdGhpcy5wZXJpb2QgPSAwO1xuICAgIH1cbiAgICBpZiAoIXNjaGVkdWxlciB8fCB0eXBlb2Ygc2NoZWR1bGVyLnNjaGVkdWxlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnNjaGVkdWxlciA9IGFzeW5jO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8bnVtYmVyPikge1xuICAgIGNvbnN0IGluZGV4ID0gMDtcbiAgICBjb25zdCBwZXJpb2QgPSB0aGlzLnBlcmlvZDtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcblxuICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShJbnRlcnZhbE9ic2VydmFibGUuZGlzcGF0Y2gsIHBlcmlvZCwge1xuICAgICAgaW5kZXgsIHN1YnNjcmliZXIsIHBlcmlvZFxuICAgIH0pKTtcbiAgfVxufVxuIl19