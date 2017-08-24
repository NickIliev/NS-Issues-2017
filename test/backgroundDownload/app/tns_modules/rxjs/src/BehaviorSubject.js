"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("./Subject");
var ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
/**
 * @class BehaviorSubject<T>
 */
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmVoYXZpb3JTdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQmVoYXZpb3JTdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQW9DO0FBR3BDLDBFQUF5RTtBQUV6RTs7R0FFRztBQUNIO0lBQXdDLG1DQUFVO0lBRWhELHlCQUFvQixNQUFTO1FBQTdCLFlBQ0UsaUJBQU8sU0FDUjtRQUZtQixZQUFNLEdBQU4sTUFBTSxDQUFHOztJQUU3QixDQUFDO0lBRUQsc0JBQUksa0NBQUs7YUFBVDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFUyxvQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtRQUM1QyxJQUFNLFlBQVksR0FBRyxpQkFBTSxVQUFVLFlBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQWlCLFlBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxJQUFJLGlEQUF1QixFQUFFLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssS0FBUTtRQUNYLGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEvQkQsQ0FBd0MsaUJBQU8sR0ErQjlDO0FBL0JZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgSVN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIH0gZnJvbSAnLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcblxuLyoqXG4gKiBAY2xhc3MgQmVoYXZpb3JTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBCZWhhdmlvclN1YmplY3Q8VD4gZXh0ZW5kcyBTdWJqZWN0PFQ+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHN1cGVyLl9zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgaWYgKHN1YnNjcmlwdGlvbiAmJiAhKDxJU3Vic2NyaXB0aW9uPnN1YnNjcmlwdGlvbikuY2xvc2VkKSB7XG4gICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0VmFsdWUoKTogVCB7XG4gICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcbiAgICAgIHRocm93IHRoaXMudGhyb3duRXJyb3I7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgc3VwZXIubmV4dCh0aGlzLl92YWx1ZSA9IHZhbHVlKTtcbiAgfVxufVxuIl19