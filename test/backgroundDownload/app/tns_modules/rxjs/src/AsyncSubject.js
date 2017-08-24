"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("./Subject");
var Subscription_1 = require("./Subscription");
/**
 * @class AsyncSubject<T>
 */
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXN5bmNTdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXN5bmNTdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQW9DO0FBRXBDLCtDQUE4QztBQUU5Qzs7R0FFRztBQUNIO0lBQXFDLGdDQUFVO0lBQS9DO1FBQUEscUVBcUNDO1FBcENTLFdBQUssR0FBTSxJQUFJLENBQUM7UUFDaEIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBWSxHQUFZLEtBQUssQ0FBQzs7SUFrQ3hDLENBQUM7SUFoQ1csaUNBQVUsR0FBcEIsVUFBcUIsVUFBMkI7UUFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLDJCQUFZLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3QyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDLDJCQUFZLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7UUFDRCxNQUFNLENBQUMsaUJBQU0sVUFBVSxZQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCwyQkFBSSxHQUFKLFVBQUssS0FBUTtRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFRCw0QkFBSyxHQUFMLFVBQU0sS0FBVTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkIsaUJBQU0sS0FBSyxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNELGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFyQ0QsQ0FBcUMsaUJBQU8sR0FxQzNDO0FBckNZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBAY2xhc3MgQXN5bmNTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBBc3luY1N1YmplY3Q8VD4gZXh0ZW5kcyBTdWJqZWN0PFQ+IHtcbiAgcHJpdmF0ZSB2YWx1ZTogVCA9IG51bGw7XG4gIHByaXZhdGUgaGFzTmV4dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGhhc0NvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55Pik6IFN1YnNjcmlwdGlvbiB7XG4gICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcbiAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhpcy50aHJvd25FcnJvcik7XG4gICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNDb21wbGV0ZWQgJiYgdGhpcy5oYXNOZXh0KSB7XG4gICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy52YWx1ZSk7XG4gICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuX3N1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIG5leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzQ29tcGxldGVkKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLmhhc05leHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yKGVycm9yOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzQ29tcGxldGVkKSB7XG4gICAgICBzdXBlci5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5oYXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmhhc05leHQpIHtcbiAgICAgIHN1cGVyLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIHN1cGVyLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==