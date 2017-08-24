"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("../scheduler/async");
var isDate_1 = require("../util/isDate");
var Subscriber_1 = require("../Subscriber");
var TimeoutError_1 = require("../util/TimeoutError");
/**
 * @param {number} due
 * @param {Scheduler} [scheduler]
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method timeout
 * @owner Observable
 */
function timeout(due, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError_1.TimeoutError()));
}
exports.timeout = timeout;
var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
    }
    TimeoutOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
    };
    return TimeoutOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeoutSubscriber = (function (_super) {
    __extends(TimeoutSubscriber, _super);
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
        var _this = _super.call(this, destination) || this;
        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.scheduler = scheduler;
        _this.errorInstance = errorInstance;
        _this.action = null;
        _this.scheduleTimeout();
        return _this;
    }
    TimeoutSubscriber.dispatchTimeout = function (subscriber) {
        subscriber.error(subscriber.errorInstance);
    };
    TimeoutSubscriber.prototype.scheduleTimeout = function () {
        var action = this.action;
        if (action) {
            // Recycle the action if we've already scheduled one. All the production
            // Scheduler Actions mutate their state/delay time and return themeselves.
            // VirtualActions are immutable, so they create and return a clone. In this
            // case, we need to set the action reference to the most recent VirtualAction,
            // to ensure that's the one we clone from next time.
            this.action = action.schedule(this, this.waitFor);
        }
        else {
            this.add(this.action = this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, this));
        }
    };
    TimeoutSubscriber.prototype._next = function (value) {
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
        _super.prototype._next.call(this, value);
    };
    TimeoutSubscriber.prototype._unsubscribe = function () {
        this.action = null;
        this.scheduler = null;
        this.errorInstance = null;
    };
    return TimeoutSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBMkM7QUFDM0MseUNBQXdDO0FBRXhDLDRDQUEyQztBQUkzQyxxREFBb0Q7QUFFcEQ7Ozs7OztHQU1HO0FBQ0gsaUJBQzJCLEdBQWtCLEVBQ2xCLFNBQTZCO0lBQTdCLDBCQUFBLEVBQUEseUJBQTZCO0lBQ3RELElBQU0sZUFBZSxHQUFHLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxJQUFNLE9BQU8sR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLElBQUksMkJBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRyxDQUFDO0FBTkQsMEJBTUM7QUFFRDtJQUNFLHlCQUFvQixPQUFlLEVBQ2YsZUFBd0IsRUFDeEIsU0FBcUIsRUFDckIsYUFBMkI7UUFIM0IsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFDckIsa0JBQWEsR0FBYixhQUFhLENBQWM7SUFDL0MsQ0FBQztJQUVELDhCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxpQkFBaUIsQ0FDM0MsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQ25GLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQW1DLHFDQUFhO0lBSTlDLDJCQUFZLFdBQTBCLEVBQ2xCLGVBQXdCLEVBQ3hCLE9BQWUsRUFDZixTQUFxQixFQUNyQixhQUEyQjtRQUovQyxZQUtFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQU5tQixxQkFBZSxHQUFmLGVBQWUsQ0FBUztRQUN4QixhQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBUyxHQUFULFNBQVMsQ0FBWTtRQUNyQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQU52QyxZQUFNLEdBQWlDLElBQUksQ0FBQztRQVFsRCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O0lBQ3pCLENBQUM7SUFFYyxpQ0FBZSxHQUE5QixVQUFrQyxVQUFnQztRQUNoRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sMkNBQWUsR0FBdkI7UUFDVSxJQUFBLG9CQUFNLENBQVU7UUFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLHdFQUF3RTtZQUN4RSwwRUFBMEU7WUFDMUUsMkVBQTJFO1lBQzNFLDhFQUE4RTtZQUM5RSxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBbUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQ3JGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBbUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQzVFLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FDckQsQ0FBQyxDQUFDO1FBQ04sQ0FBQztJQUNILENBQUM7SUFFUyxpQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELGlCQUFNLEtBQUssWUFBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRVMsd0NBQVksR0FBdEI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBN0NELENBQW1DLHVCQUFVLEdBNkM1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uL3NjaGVkdWxlci9BY3Rpb24nO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSAnLi4vdXRpbC9pc0RhdGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgVGltZW91dEVycm9yIH0gZnJvbSAnLi4vdXRpbC9UaW1lb3V0RXJyb3InO1xuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdWVcbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXVxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPnxXZWJTb2NrZXRTdWJqZWN0PFQ+fE9ic2VydmFibGU8VD59XG4gKiBAbWV0aG9kIHRpbWVvdXRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aW1lb3V0PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkdWU6IG51bWJlciB8IERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXI6IElTY2hlZHVsZXIgPSBhc3luYyk6IE9ic2VydmFibGU8VD4ge1xuICBjb25zdCBhYnNvbHV0ZVRpbWVvdXQgPSBpc0RhdGUoZHVlKTtcbiAgY29uc3Qgd2FpdEZvciA9IGFic29sdXRlVGltZW91dCA/ICgrZHVlIC0gc2NoZWR1bGVyLm5vdygpKSA6IE1hdGguYWJzKDxudW1iZXI+ZHVlKTtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgVGltZW91dE9wZXJhdG9yKHdhaXRGb3IsIGFic29sdXRlVGltZW91dCwgc2NoZWR1bGVyLCBuZXcgVGltZW91dEVycm9yKCkpKTtcbn1cblxuY2xhc3MgVGltZW91dE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdhaXRGb3I6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhYnNvbHV0ZVRpbWVvdXQ6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVycm9ySW5zdGFuY2U6IFRpbWVvdXRFcnJvcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBUaW1lb3V0U3Vic2NyaWJlcjxUPihcbiAgICAgIHN1YnNjcmliZXIsIHRoaXMuYWJzb2x1dGVUaW1lb3V0LCB0aGlzLndhaXRGb3IsIHRoaXMuc2NoZWR1bGVyLCB0aGlzLmVycm9ySW5zdGFuY2VcbiAgICApKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgVGltZW91dFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcblxuICBwcml2YXRlIGFjdGlvbjogQWN0aW9uPFRpbWVvdXRTdWJzY3JpYmVyPFQ+PiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgYWJzb2x1dGVUaW1lb3V0OiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHdhaXRGb3I6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXJyb3JJbnN0YW5jZTogVGltZW91dEVycm9yKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuc2NoZWR1bGVUaW1lb3V0KCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBkaXNwYXRjaFRpbWVvdXQ8VD4oc3Vic2NyaWJlcjogVGltZW91dFN1YnNjcmliZXI8VD4pOiB2b2lkIHtcbiAgICBzdWJzY3JpYmVyLmVycm9yKHN1YnNjcmliZXIuZXJyb3JJbnN0YW5jZSk7XG4gIH1cblxuICBwcml2YXRlIHNjaGVkdWxlVGltZW91dCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGFjdGlvbiB9ID0gdGhpcztcbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAvLyBSZWN5Y2xlIHRoZSBhY3Rpb24gaWYgd2UndmUgYWxyZWFkeSBzY2hlZHVsZWQgb25lLiBBbGwgdGhlIHByb2R1Y3Rpb25cbiAgICAgIC8vIFNjaGVkdWxlciBBY3Rpb25zIG11dGF0ZSB0aGVpciBzdGF0ZS9kZWxheSB0aW1lIGFuZCByZXR1cm4gdGhlbWVzZWx2ZXMuXG4gICAgICAvLyBWaXJ0dWFsQWN0aW9ucyBhcmUgaW1tdXRhYmxlLCBzbyB0aGV5IGNyZWF0ZSBhbmQgcmV0dXJuIGEgY2xvbmUuIEluIHRoaXNcbiAgICAgIC8vIGNhc2UsIHdlIG5lZWQgdG8gc2V0IHRoZSBhY3Rpb24gcmVmZXJlbmNlIHRvIHRoZSBtb3N0IHJlY2VudCBWaXJ0dWFsQWN0aW9uLFxuICAgICAgLy8gdG8gZW5zdXJlIHRoYXQncyB0aGUgb25lIHdlIGNsb25lIGZyb20gbmV4dCB0aW1lLlxuICAgICAgdGhpcy5hY3Rpb24gPSAoPEFjdGlvbjxUaW1lb3V0U3Vic2NyaWJlcjxUPj4+IGFjdGlvbi5zY2hlZHVsZSh0aGlzLCB0aGlzLndhaXRGb3IpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQodGhpcy5hY3Rpb24gPSAoPEFjdGlvbjxUaW1lb3V0U3Vic2NyaWJlcjxUPj4+IHRoaXMuc2NoZWR1bGVyLnNjaGVkdWxlKFxuICAgICAgICBUaW1lb3V0U3Vic2NyaWJlci5kaXNwYXRjaFRpbWVvdXQsIHRoaXMud2FpdEZvciwgdGhpc1xuICAgICAgKSkpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hYnNvbHV0ZVRpbWVvdXQpIHtcbiAgICAgIHRoaXMuc2NoZWR1bGVUaW1lb3V0KCk7XG4gICAgfVxuICAgIHN1cGVyLl9uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5hY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuc2NoZWR1bGVyID0gbnVsbDtcbiAgICB0aGlzLmVycm9ySW5zdGFuY2UgPSBudWxsO1xuICB9XG59XG4iXX0=