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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZUludGVydmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBRTNDLDRDQUEyQztBQUUzQzs7Ozs7R0FLRztBQUNILHNCQUFxRCxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLFlBQXdCLGFBQUs7SUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFGRCxvQ0FFQztBQUVEO0lBQ0Usc0JBQW1CLEtBQVEsRUFBUyxRQUFnQjtRQUFqQyxVQUFLLEdBQUwsS0FBSyxDQUFHO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUVwRCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLG9DQUFZO0FBSXhCLENBQUM7QUFFRjtJQUNFLDhCQUFvQixTQUFxQjtRQUFyQixjQUFTLEdBQVQsU0FBUyxDQUFZO0lBRXpDLENBQUM7SUFFRCxtQ0FBSSxHQUFKLFVBQUssUUFBcUMsRUFBRSxNQUFXO1FBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXdDLDBDQUFhO0lBR25ELGdDQUFZLFdBQXdDLEVBQVUsU0FBcUI7UUFBbkYsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FHbkI7UUFKNkQsZUFBUyxHQUFULFNBQVMsQ0FBWTtRQUYzRSxjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSzNCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDOztJQUNsQyxDQUFDO0lBRVMsc0NBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFFcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQWhCRCxDQUF3Qyx1QkFBVSxHQWdCakQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuXG4vKipcbiAqIEBwYXJhbSBzY2hlZHVsZXJcbiAqIEByZXR1cm4ge09ic2VydmFibGU8VGltZUludGVydmFsPGFueT4+fFdlYlNvY2tldFN1YmplY3Q8VD58T2JzZXJ2YWJsZTxUPn1cbiAqIEBtZXRob2QgdGltZUludGVydmFsXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZUludGVydmFsPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHNjaGVkdWxlcjogSVNjaGVkdWxlciA9IGFzeW5jKTogT2JzZXJ2YWJsZTxUaW1lSW50ZXJ2YWw8VD4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgVGltZUludGVydmFsT3BlcmF0b3Ioc2NoZWR1bGVyKSk7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lSW50ZXJ2YWw8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFQsIHB1YmxpYyBpbnRlcnZhbDogbnVtYmVyKSB7XG5cbiAgfVxufTtcblxuY2xhc3MgVGltZUludGVydmFsT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUaW1lSW50ZXJ2YWw8VD4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcblxuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxUaW1lSW50ZXJ2YWw8VD4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFRpbWVJbnRlcnZhbFN1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMuc2NoZWR1bGVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFRpbWVJbnRlcnZhbFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBsYXN0VGltZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUaW1lSW50ZXJ2YWw8VD4+LCBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcblxuICAgIHRoaXMubGFzdFRpbWUgPSBzY2hlZHVsZXIubm93KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICBsZXQgbm93ID0gdGhpcy5zY2hlZHVsZXIubm93KCk7XG4gICAgbGV0IHNwYW4gPSBub3cgLSB0aGlzLmxhc3RUaW1lO1xuICAgIHRoaXMubGFzdFRpbWUgPSBub3c7XG5cbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQobmV3IFRpbWVJbnRlcnZhbCh2YWx1ZSwgc3BhbikpO1xuICB9XG59XG4iXX0=