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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vic2NyaWJlT25PYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3Vic2NyaWJlT25PYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsNENBQTJDO0FBQzNDLDBDQUF5QztBQUN6QywrQ0FBOEM7QUFPOUM7Ozs7R0FJRztBQUNIO0lBQThDLHlDQUFhO0lBVXpELCtCQUFtQixNQUFxQixFQUNwQixTQUFxQixFQUNyQixTQUE0QjtRQUQ1QiwwQkFBQSxFQUFBLGFBQXFCO1FBQ3JCLDBCQUFBLEVBQUEsWUFBd0IsV0FBSTtRQUZoRCxZQUdFLGlCQUFPLFNBT1I7UUFWa0IsWUFBTSxHQUFOLE1BQU0sQ0FBZTtRQUNwQixlQUFTLEdBQVQsU0FBUyxDQUFZO1FBQ3JCLGVBQVMsR0FBVCxTQUFTLENBQW1CO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0QsS0FBSSxDQUFDLFNBQVMsR0FBRyxXQUFJLENBQUM7UUFDeEIsQ0FBQzs7SUFDSCxDQUFDO0lBbkJNLDRCQUFNLEdBQWIsVUFBaUIsTUFBcUIsRUFBRSxLQUFpQixFQUFFLFNBQTRCO1FBQS9DLHNCQUFBLEVBQUEsU0FBaUI7UUFBRSwwQkFBQSxFQUFBLFlBQXdCLFdBQUk7UUFDckYsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFvQyxHQUFtQjtRQUM3QyxJQUFBLG1CQUFNLEVBQUUsMkJBQVUsQ0FBUztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQWNTLDBDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDL0QsTUFBTSxRQUFBLEVBQUUsVUFBVSxZQUFBO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUEvQkQsQ0FBOEMsdUJBQVUsR0ErQnZEO0FBL0JZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uL3NjaGVkdWxlci9BY3Rpb24nO1xuaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgYXNhcCB9IGZyb20gJy4uL3NjaGVkdWxlci9hc2FwJztcbmltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gJy4uL3V0aWwvaXNOdW1lcmljJztcblxuZXhwb3J0IGludGVyZmFjZSBEaXNwYXRjaEFyZzxUPiB7XG4gIHNvdXJjZTogT2JzZXJ2YWJsZTxUPjtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPjtcbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmVPbk9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgc3RhdGljIGNyZWF0ZTxUPihzb3VyY2U6IE9ic2VydmFibGU8VD4sIGRlbGF5OiBudW1iZXIgPSAwLCBzY2hlZHVsZXI6IElTY2hlZHVsZXIgPSBhc2FwKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVPbk9ic2VydmFibGUoc291cmNlLCBkZWxheSwgc2NoZWR1bGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBkaXNwYXRjaDxUPih0aGlzOiBBY3Rpb248VD4sIGFyZzogRGlzcGF0Y2hBcmc8VD4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IHsgc291cmNlLCBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gICAgcmV0dXJuIHRoaXMuYWRkKHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkZWxheVRpbWU6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXNhcCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKCFpc051bWVyaWMoZGVsYXlUaW1lKSB8fCBkZWxheVRpbWUgPCAwKSB7XG4gICAgICB0aGlzLmRlbGF5VGltZSA9IDA7XG4gICAgfVxuICAgIGlmICghc2NoZWR1bGVyIHx8IHR5cGVvZiBzY2hlZHVsZXIuc2NoZWR1bGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuc2NoZWR1bGVyID0gYXNhcDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgY29uc3QgZGVsYXkgPSB0aGlzLmRlbGF5VGltZTtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcblxuICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoU3Vic2NyaWJlT25PYnNlcnZhYmxlLmRpc3BhdGNoLCBkZWxheSwge1xuICAgICAgc291cmNlLCBzdWJzY3JpYmVyXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==