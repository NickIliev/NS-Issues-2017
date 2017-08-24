"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var asap_1 = require("../scheduler/asap");
var isNumeric_1 = require("../util/isNumeric");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var SubscribeOnObservable = (function (_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) { delayTime = 0; }
        if (scheduler === void 0) { scheduler = asap_1.asap; }
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = asap_1.asap;
        }
        return _this;
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) { delay = 0; }
        if (scheduler === void 0) { scheduler = asap_1.asap; }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source, subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(Observable_1.Observable));
exports.SubscribeOnObservable = SubscribeOnObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vic2NyaWJlT25PYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3Vic2NyaWJlT25PYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsNENBQTJDO0FBQzNDLDBDQUF5QztBQUN6QywrQ0FBOEM7QUFPOUM7Ozs7R0FJRztBQUNIO0lBQThDLHlDQUFhO0lBVXpELCtCQUFtQixNQUFxQixFQUNwQixTQUFxQixFQUNyQixTQUE0QjtRQUQ1QiwwQkFBQSxFQUFBLGFBQXFCO1FBQ3JCLDBCQUFBLEVBQUEsdUJBQTRCO1FBRmhELFlBR0UsaUJBQU8sU0FPUjtRQVZrQixZQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3BCLGVBQVMsR0FBVCxTQUFTLENBQVk7UUFDckIsZUFBUyxHQUFULFNBQVMsQ0FBbUI7UUFFOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsU0FBUyxHQUFHLFdBQUksQ0FBQztRQUN4QixDQUFDOztJQUNILENBQUM7SUFuQk0sNEJBQU0sR0FBYixVQUFpQixNQUFxQixFQUFFLEtBQWlCLEVBQUUsU0FBNEI7UUFBL0Msc0JBQUEsRUFBQSxTQUFpQjtRQUFFLDBCQUFBLEVBQUEsdUJBQTRCO1FBQ3JGLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLDhCQUFRLEdBQWYsVUFBb0MsR0FBbUI7UUFDN0MsSUFBQSxtQkFBTSxFQUFFLDJCQUFVLENBQVM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFjUywwQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUM1QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVqQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQy9ELE1BQU0sUUFBQSxFQUFFLFVBQVUsWUFBQTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBL0JELENBQThDLHVCQUFVLEdBK0J2RDtBQS9CWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi9zY2hlZHVsZXIvQWN0aW9uJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGFzYXAgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXNhcCc7XG5pbXBvcnQgeyBpc051bWVyaWMgfSBmcm9tICcuLi91dGlsL2lzTnVtZXJpYyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGF0Y2hBcmc8VD4ge1xuICBzb3VyY2U6IE9ic2VydmFibGU8VD47XG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD47XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgU3Vic2NyaWJlT25PYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIHN0YXRpYyBjcmVhdGU8VD4oc291cmNlOiBPYnNlcnZhYmxlPFQ+LCBkZWxheTogbnVtYmVyID0gMCwgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXNhcCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlT25PYnNlcnZhYmxlKHNvdXJjZSwgZGVsYXksIHNjaGVkdWxlcik7XG4gIH1cblxuICBzdGF0aWMgZGlzcGF0Y2g8VD4odGhpczogQWN0aW9uPFQ+LCBhcmc6IERpc3BhdGNoQXJnPFQ+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCB7IHNvdXJjZSwgc3Vic2NyaWJlciB9ID0gYXJnO1xuICAgIHJldHVybiB0aGlzLmFkZChzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGVsYXlUaW1lOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlciA9IGFzYXApIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICghaXNOdW1lcmljKGRlbGF5VGltZSkgfHwgZGVsYXlUaW1lIDwgMCkge1xuICAgICAgdGhpcy5kZWxheVRpbWUgPSAwO1xuICAgIH1cbiAgICBpZiAoIXNjaGVkdWxlciB8fCB0eXBlb2Ygc2NoZWR1bGVyLnNjaGVkdWxlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnNjaGVkdWxlciA9IGFzYXA7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5kZWxheVRpbWU7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG5cbiAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKFN1YnNjcmliZU9uT2JzZXJ2YWJsZS5kaXNwYXRjaCwgZGVsYXksIHtcbiAgICAgIHNvdXJjZSwgc3Vic2NyaWJlclxuICAgIH0pO1xuICB9XG59XG4iXX0=