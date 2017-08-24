"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var async_1 = require("../scheduler/async");
/**
 * @param scheduler
 * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timeInterval
 * @owner Observable
 */
function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new TimeIntervalOperator(scheduler));
}
exports.timeInterval = timeInterval;
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
exports.TimeInterval = TimeInterval;
;
var TimeIntervalOperator = (function () {
    function TimeIntervalOperator(scheduler) {
        this.scheduler = scheduler;
    }
    TimeIntervalOperator.prototype.call = function (observer, source) {
        return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
    };
    return TimeIntervalOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeIntervalSubscriber = (function (_super) {
    __extends(TimeIntervalSubscriber, _super);
    function TimeIntervalSubscriber(destination, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.lastTime = 0;
        _this.lastTime = scheduler.now();
        return _this;
    }
    TimeIntervalSubscriber.prototype._next = function (value) {
        var now = this.scheduler.now();
        var span = now - this.lastTime;
        this.lastTime = now;
        this.destination.next(new TimeInterval(value, span));
    };
    return TimeIntervalSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZUludGVydmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBRTNDLDRDQUEyQztBQUUzQzs7Ozs7R0FLRztBQUNILHNCQUFxRCxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLHlCQUE2QjtJQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUZELG9DQUVDO0FBRUQ7SUFDRSxzQkFBbUIsS0FBUSxFQUFTLFFBQWdCO1FBQWpDLFVBQUssR0FBTCxLQUFLLENBQUc7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBRXBELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksb0NBQVk7QUFJeEIsQ0FBQztBQUVGO0lBQ0UsOEJBQW9CLFNBQXFCO1FBQXJCLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFFekMsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxRQUFxQyxFQUFFLE1BQVc7UUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFBd0MsMENBQWE7SUFHbkQsZ0NBQVksV0FBd0MsRUFBVSxTQUFxQjtRQUFuRixZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUduQjtRQUo2RCxlQUFTLEdBQVQsU0FBUyxDQUFZO1FBRjNFLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFLM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7O0lBQ2xDLENBQUM7SUFFUyxzQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBaEJELENBQXdDLHVCQUFVLEdBZ0JqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5cbi8qKlxuICogQHBhcmFtIHNjaGVkdWxlclxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUaW1lSW50ZXJ2YWw8YW55Pj58V2ViU29ja2V0U3ViamVjdDxUPnxPYnNlcnZhYmxlPFQ+fVxuICogQG1ldGhvZCB0aW1lSW50ZXJ2YWxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aW1lSW50ZXJ2YWw8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPFRpbWVJbnRlcnZhbDxUPj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBUaW1lSW50ZXJ2YWxPcGVyYXRvcihzY2hlZHVsZXIpKTtcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVJbnRlcnZhbDxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogVCwgcHVibGljIGludGVydmFsOiBudW1iZXIpIHtcblxuICB9XG59O1xuXG5jbGFzcyBUaW1lSW50ZXJ2YWxPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFRpbWVJbnRlcnZhbDxUPj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuXG4gIH1cblxuICBjYWxsKG9ic2VydmVyOiBTdWJzY3JpYmVyPFRpbWVJbnRlcnZhbDxUPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgVGltZUludGVydmFsU3Vic2NyaWJlcihvYnNlcnZlciwgdGhpcy5zY2hlZHVsZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgVGltZUludGVydmFsU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGxhc3RUaW1lOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFRpbWVJbnRlcnZhbDxUPj4sIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuXG4gICAgdGhpcy5sYXN0VGltZSA9IHNjaGVkdWxlci5ub3coKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIGxldCBub3cgPSB0aGlzLnNjaGVkdWxlci5ub3coKTtcbiAgICBsZXQgc3BhbiA9IG5vdyAtIHRoaXMubGFzdFRpbWU7XG4gICAgdGhpcy5sYXN0VGltZSA9IG5vdztcblxuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChuZXcgVGltZUludGVydmFsKHZhbHVlLCBzcGFuKSk7XG4gIH1cbn1cbiJdfQ==