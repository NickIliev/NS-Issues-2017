"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
var SubscriptionLoggable_1 = require("./SubscriptionLoggable");
var applyMixins_1 = require("../util/applyMixins");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ColdObservable = (function (_super) {
    __extends(ColdObservable, _super);
    function ColdObservable(messages, scheduler) {
        var _this = _super.call(this, function (subscriber) {
            var observable = this;
            var index = observable.logSubscribedFrame();
            subscriber.add(new Subscription_1.Subscription(function () {
                observable.logUnsubscribedFrame(index);
            }));
            observable.scheduleMessages(subscriber);
            return subscriber;
        }) || this;
        _this.messages = messages;
        _this.subscriptions = [];
        _this.scheduler = scheduler;
        return _this;
    }
    ColdObservable.prototype.scheduleMessages = function (subscriber) {
        var messagesLength = this.messages.length;
        for (var i = 0; i < messagesLength; i++) {
            var message = this.messages[i];
            subscriber.add(this.scheduler.schedule(function (_a) {
                var message = _a.message, subscriber = _a.subscriber;
                message.notification.observe(subscriber);
            }, message.frame, { message: message, subscriber: subscriber }));
        }
    };
    return ColdObservable;
}(Observable_1.Observable));
exports.ColdObservable = ColdObservable;
applyMixins_1.applyMixins(ColdObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sZE9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb2xkT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUMzQyxnREFBK0M7QUFJL0MsK0RBQThEO0FBQzlELG1EQUFrRDtBQUdsRDs7OztHQUlHO0FBQ0g7SUFBdUMsa0NBQWE7SUFNbEQsd0JBQW1CLFFBQXVCLEVBQzlCLFNBQW9CO1FBRGhDLFlBRUUsa0JBQU0sVUFBbUMsVUFBMkI7WUFDbEUsSUFBTSxVQUFVLEdBQXNCLElBQUksQ0FBQztZQUMzQyxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM5QyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksMkJBQVksQ0FBQztnQkFDOUIsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixVQUFVLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQixDQUFDLENBQUMsU0FFSDtRQVprQixjQUFRLEdBQVIsUUFBUSxDQUFlO1FBTG5DLG1CQUFhLEdBQXNCLEVBQUUsQ0FBQztRQWdCM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0lBQzdCLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEIsVUFBaUIsVUFBMkI7UUFDMUMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDNUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFVBQVUsQ0FBQyxHQUFHLENBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBQyxFQUFxQjtvQkFBcEIsb0JBQU8sRUFBRSwwQkFBVTtnQkFBUSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUFDLENBQUMsRUFDOUYsT0FBTyxDQUFDLEtBQUssRUFDYixFQUFDLE9BQU8sU0FBQSxFQUFFLFVBQVUsWUFBQSxFQUFDLENBQUMsQ0FDekIsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBL0JELENBQXVDLHVCQUFVLEdBK0JoRDtBQS9CWSx3Q0FBYztBQWdDM0IseUJBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQywyQ0FBb0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IFRlc3RNZXNzYWdlIH0gZnJvbSAnLi9UZXN0TWVzc2FnZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25Mb2cgfSBmcm9tICcuL1N1YnNjcmlwdGlvbkxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25Mb2dnYWJsZSB9IGZyb20gJy4vU3Vic2NyaXB0aW9uTG9nZ2FibGUnO1xuaW1wb3J0IHsgYXBwbHlNaXhpbnMgfSBmcm9tICcuLi91dGlsL2FwcGx5TWl4aW5zJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xkT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4gaW1wbGVtZW50cyBTdWJzY3JpcHRpb25Mb2dnYWJsZSB7XG4gIHB1YmxpYyBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25Mb2dbXSA9IFtdO1xuICBzY2hlZHVsZXI6IFNjaGVkdWxlcjtcbiAgbG9nU3Vic2NyaWJlZEZyYW1lOiAoKSA9PiBudW1iZXI7XG4gIGxvZ1Vuc3Vic2NyaWJlZEZyYW1lOiAoaW5kZXg6IG51bWJlcikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZXM6IFRlc3RNZXNzYWdlW10sXG4gICAgICAgICAgICAgIHNjaGVkdWxlcjogU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoZnVuY3Rpb24gKHRoaXM6IENvbGRPYnNlcnZhYmxlPFQ+LCBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGFueT4pIHtcbiAgICAgIGNvbnN0IG9ic2VydmFibGU6IENvbGRPYnNlcnZhYmxlPFQ+ID0gdGhpcztcbiAgICAgIGNvbnN0IGluZGV4ID0gb2JzZXJ2YWJsZS5sb2dTdWJzY3JpYmVkRnJhbWUoKTtcbiAgICAgIHN1YnNjcmliZXIuYWRkKG5ldyBTdWJzY3JpcHRpb24oKCkgPT4ge1xuICAgICAgICBvYnNlcnZhYmxlLmxvZ1Vuc3Vic2NyaWJlZEZyYW1lKGluZGV4KTtcbiAgICAgIH0pKTtcbiAgICAgIG9ic2VydmFibGUuc2NoZWR1bGVNZXNzYWdlcyhzdWJzY3JpYmVyKTtcbiAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH0pO1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgc2NoZWR1bGVNZXNzYWdlcyhzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGFueT4pIHtcbiAgICBjb25zdCBtZXNzYWdlc0xlbmd0aCA9IHRoaXMubWVzc2FnZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZXNMZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMubWVzc2FnZXNbaV07XG4gICAgICBzdWJzY3JpYmVyLmFkZChcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIuc2NoZWR1bGUoKHttZXNzYWdlLCBzdWJzY3JpYmVyfSkgPT4geyBtZXNzYWdlLm5vdGlmaWNhdGlvbi5vYnNlcnZlKHN1YnNjcmliZXIpOyB9LFxuICAgICAgICAgIG1lc3NhZ2UuZnJhbWUsXG4gICAgICAgICAge21lc3NhZ2UsIHN1YnNjcmliZXJ9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbmFwcGx5TWl4aW5zKENvbGRPYnNlcnZhYmxlLCBbU3Vic2NyaXB0aW9uTG9nZ2FibGVdKTtcbiJdfQ==