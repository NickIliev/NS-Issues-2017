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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXN0YW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZXN0YW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBRTNDLDRDQUEyQztBQUUzQzs7Ozs7R0FLRztBQUNILG1CQUFrRCxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLHlCQUE2QjtJQUM3RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUZELDhCQUVDO0FBRUQ7SUFDRSxtQkFBbUIsS0FBUSxFQUFTLFNBQWlCO1FBQWxDLFVBQUssR0FBTCxLQUFLLENBQUc7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQ3JELENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksOEJBQVM7QUFHckIsQ0FBQztBQUVGO0lBQ0UsMkJBQW9CLFNBQXFCO1FBQXJCLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDekMsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxRQUFrQyxFQUFFLE1BQVc7UUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFFRDtJQUFxQyx1Q0FBYTtJQUNoRCw2QkFBWSxXQUFxQyxFQUFVLFNBQXFCO1FBQWhGLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBRjBELGVBQVMsR0FBVCxTQUFTLENBQVk7O0lBRWhGLENBQUM7SUFFUyxtQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBcUMsdUJBQVUsR0FVOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuXG4vKipcbiAqIEBwYXJhbSBzY2hlZHVsZXJcbiAqIEByZXR1cm4ge09ic2VydmFibGU8VGltZXN0YW1wPGFueT4+fFdlYlNvY2tldFN1YmplY3Q8VD58T2JzZXJ2YWJsZTxUPn1cbiAqIEBtZXRob2QgdGltZXN0YW1wXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZXN0YW1wPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHNjaGVkdWxlcjogSVNjaGVkdWxlciA9IGFzeW5jKTogT2JzZXJ2YWJsZTxUaW1lc3RhbXA8VD4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgVGltZXN0YW1wT3BlcmF0b3Ioc2NoZWR1bGVyKSk7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lc3RhbXA8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFQsIHB1YmxpYyB0aW1lc3RhbXA6IG51bWJlcikge1xuICB9XG59O1xuXG5jbGFzcyBUaW1lc3RhbXBPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFRpbWVzdGFtcDxUPj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxUaW1lc3RhbXA8VD4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFRpbWVzdGFtcFN1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMuc2NoZWR1bGVyKSk7XG4gIH1cbn1cblxuY2xhc3MgVGltZXN0YW1wU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUaW1lc3RhbXA8VD4+LCBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IG5vdyA9IHRoaXMuc2NoZWR1bGVyLm5vdygpO1xuXG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KG5ldyBUaW1lc3RhbXAodmFsdWUsIG5vdykpO1xuICB9XG59XG4iXX0=