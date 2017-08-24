"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../Subject");
var Subscription_1 = require("../Subscription");
var SubscriptionLoggable_1 = require("./SubscriptionLoggable");
var applyMixins_1 = require("../util/applyMixins");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var HotObservable = (function (_super) {
    __extends(HotObservable, _super);
    function HotObservable(messages, scheduler) {
        var _this = _super.call(this) || this;
        _this.messages = messages;
        _this.subscriptions = [];
        _this.scheduler = scheduler;
        return _this;
    }
    HotObservable.prototype._subscribe = function (subscriber) {
        var subject = this;
        var index = subject.logSubscribedFrame();
        subscriber.add(new Subscription_1.Subscription(function () {
            subject.logUnsubscribedFrame(index);
        }));
        return _super.prototype._subscribe.call(this, subscriber);
    };
    HotObservable.prototype.setup = function () {
        var subject = this;
        var messagesLength = subject.messages.length;
        /* tslint:disable:no-var-keyword */
        for (var i = 0; i < messagesLength; i++) {
            (function () {
                var message = subject.messages[i];
                /* tslint:enable */
                subject.scheduler.schedule(function () { message.notification.observe(subject); }, message.frame);
            })();
        }
    };
    return HotObservable;
}(Subject_1.Subject));
exports.HotObservable = HotObservable;
applyMixins_1.applyMixins(HotObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG90T2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhvdE9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUM7QUFFckMsZ0RBQStDO0FBSS9DLCtEQUE4RDtBQUM5RCxtREFBa0Q7QUFFbEQ7Ozs7R0FJRztBQUNIO0lBQXNDLGlDQUFVO0lBTTlDLHVCQUFtQixRQUF1QixFQUM5QixTQUFvQjtRQURoQyxZQUVFLGlCQUFPLFNBRVI7UUFKa0IsY0FBUSxHQUFSLFFBQVEsQ0FBZTtRQUxuQyxtQkFBYSxHQUFzQixFQUFFLENBQUM7UUFRM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0lBQzdCLENBQUM7SUFFUyxrQ0FBVSxHQUFwQixVQUFxQixVQUEyQjtRQUM5QyxJQUFNLE9BQU8sR0FBcUIsSUFBSSxDQUFDO1FBQ3ZDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzNDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSwyQkFBWSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLGlCQUFNLFVBQVUsWUFBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUNFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMvQyxtQ0FBbUM7UUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxDQUFDO2dCQUNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLG1CQUFtQjtnQkFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDeEIsY0FBUSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FDZCxDQUFDO1lBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLENBQUM7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBcENELENBQXNDLGlCQUFPLEdBb0M1QztBQXBDWSxzQ0FBYTtBQXFDMUIseUJBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQywyQ0FBb0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IFRlc3RNZXNzYWdlIH0gZnJvbSAnLi9UZXN0TWVzc2FnZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25Mb2cgfSBmcm9tICcuL1N1YnNjcmlwdGlvbkxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25Mb2dnYWJsZSB9IGZyb20gJy4vU3Vic2NyaXB0aW9uTG9nZ2FibGUnO1xuaW1wb3J0IHsgYXBwbHlNaXhpbnMgfSBmcm9tICcuLi91dGlsL2FwcGx5TWl4aW5zJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBIb3RPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgU3ViamVjdDxUPiBpbXBsZW1lbnRzIFN1YnNjcmlwdGlvbkxvZ2dhYmxlIHtcbiAgcHVibGljIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbkxvZ1tdID0gW107XG4gIHNjaGVkdWxlcjogU2NoZWR1bGVyO1xuICBsb2dTdWJzY3JpYmVkRnJhbWU6ICgpID0+IG51bWJlcjtcbiAgbG9nVW5zdWJzY3JpYmVkRnJhbWU6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlczogVGVzdE1lc3NhZ2VbXSxcbiAgICAgICAgICAgICAgc2NoZWR1bGVyOiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBzdWJqZWN0OiBIb3RPYnNlcnZhYmxlPFQ+ID0gdGhpcztcbiAgICBjb25zdCBpbmRleCA9IHN1YmplY3QubG9nU3Vic2NyaWJlZEZyYW1lKCk7XG4gICAgc3Vic2NyaWJlci5hZGQobmV3IFN1YnNjcmlwdGlvbigoKSA9PiB7XG4gICAgICBzdWJqZWN0LmxvZ1Vuc3Vic2NyaWJlZEZyYW1lKGluZGV4KTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIHN1cGVyLl9zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gIH1cblxuICBzZXR1cCgpIHtcbiAgICBjb25zdCBzdWJqZWN0ID0gdGhpcztcbiAgICBjb25zdCBtZXNzYWdlc0xlbmd0aCA9IHN1YmplY3QubWVzc2FnZXMubGVuZ3RoO1xuICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLXZhci1rZXl3b3JkICovXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAoKCkgPT4ge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IHN1YmplY3QubWVzc2FnZXNbaV07XG4gICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gICAgICAgIHN1YmplY3Quc2NoZWR1bGVyLnNjaGVkdWxlKFxuICAgICAgICAgICgpID0+IHsgbWVzc2FnZS5ub3RpZmljYXRpb24ub2JzZXJ2ZShzdWJqZWN0KTsgfSxcbiAgICAgICAgICBtZXNzYWdlLmZyYW1lXG4gICAgICAgICk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxufVxuYXBwbHlNaXhpbnMoSG90T2JzZXJ2YWJsZSwgW1N1YnNjcmlwdGlvbkxvZ2dhYmxlXSk7XG4iXX0=