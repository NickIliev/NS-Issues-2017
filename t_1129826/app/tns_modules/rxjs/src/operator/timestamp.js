"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var async_1 = require("../scheduler/async");
/**
 * @param scheduler
 * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timestamp
 * @owner Observable
 */
function timestamp(scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new TimestampOperator(scheduler));
}
exports.timestamp = timestamp;
var Timestamp = (function () {
    function Timestamp(value, timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }
    return Timestamp;
}());
exports.Timestamp = Timestamp;
;
var TimestampOperator = (function () {
    function TimestampOperator(scheduler) {
        this.scheduler = scheduler;
    }
    TimestampOperator.prototype.call = function (observer, source) {
        return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
    };
    return TimestampOperator;
}());
var TimestampSubscriber = (function (_super) {
    __extends(TimestampSubscriber, _super);
    function TimestampSubscriber(destination, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        return _this;
    }
    TimestampSubscriber.prototype._next = function (value) {
        var now = this.scheduler.now();
        this.destination.next(new Timestamp(value, now));
    };
    return TimestampSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXN0YW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZXN0YW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBRTNDLDRDQUEyQztBQUUzQzs7Ozs7R0FLRztBQUNILG1CQUFrRCxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLFlBQXdCLGFBQUs7SUFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFGRCw4QkFFQztBQUVEO0lBQ0UsbUJBQW1CLEtBQVEsRUFBUyxTQUFpQjtRQUFsQyxVQUFLLEdBQUwsS0FBSyxDQUFHO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUNyRCxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLDhCQUFTO0FBR3JCLENBQUM7QUFFRjtJQUNFLDJCQUFvQixTQUFxQjtRQUFyQixjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQ3pDLENBQUM7SUFFRCxnQ0FBSSxHQUFKLFVBQUssUUFBa0MsRUFBRSxNQUFXO1FBQ2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7SUFBcUMsdUNBQWE7SUFDaEQsNkJBQVksV0FBcUMsRUFBVSxTQUFxQjtRQUFoRixZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUYwRCxlQUFTLEdBQVQsU0FBUyxDQUFZOztJQUVoRixDQUFDO0lBRVMsbUNBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVZELENBQXFDLHVCQUFVLEdBVTlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcblxuLyoqXG4gKiBAcGFyYW0gc2NoZWR1bGVyXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRpbWVzdGFtcDxhbnk+PnxXZWJTb2NrZXRTdWJqZWN0PFQ+fE9ic2VydmFibGU8VD59XG4gKiBAbWV0aG9kIHRpbWVzdGFtcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVzdGFtcDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBzY2hlZHVsZXI6IElTY2hlZHVsZXIgPSBhc3luYyk6IE9ic2VydmFibGU8VGltZXN0YW1wPFQ+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFRpbWVzdGFtcE9wZXJhdG9yKHNjaGVkdWxlcikpO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZXN0YW1wPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBULCBwdWJsaWMgdGltZXN0YW1wOiBudW1iZXIpIHtcbiAgfVxufTtcblxuY2xhc3MgVGltZXN0YW1wT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUaW1lc3RhbXA8VD4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgfVxuXG4gIGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8VGltZXN0YW1wPFQ+Piwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBUaW1lc3RhbXBTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnNjaGVkdWxlcikpO1xuICB9XG59XG5cbmNsYXNzIFRpbWVzdGFtcFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VGltZXN0YW1wPFQ+PiwgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSB0aGlzLnNjaGVkdWxlci5ub3coKTtcblxuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChuZXcgVGltZXN0YW1wKHZhbHVlLCBub3cpKTtcbiAgfVxufVxuIl19