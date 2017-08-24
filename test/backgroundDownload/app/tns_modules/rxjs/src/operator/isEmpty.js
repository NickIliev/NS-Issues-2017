"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
 *
 * <img src="./img/isEmpty.png" width="100%">
 *
 * @return {Observable} An Observable that emits a Boolean.
 * @method isEmpty
 * @owner Observable
 */
function isEmpty() {
    return this.lift(new IsEmptyOperator());
}
exports.isEmpty = isEmpty;
var IsEmptyOperator = (function () {
    function IsEmptyOperator() {
    }
    IsEmptyOperator.prototype.call = function (observer, source) {
        return source.subscribe(new IsEmptySubscriber(observer));
    };
    return IsEmptyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var IsEmptySubscriber = (function (_super) {
    __extends(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    };
    IsEmptySubscriber.prototype._next = function (value) {
        this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return IsEmptySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbXB0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzRW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBMkM7QUFHM0M7Ozs7Ozs7O0dBUUc7QUFDSDtJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRkQsMEJBRUM7QUFFRDtJQUFBO0lBSUEsQ0FBQztJQUhDLDhCQUFJLEdBQUosVUFBTSxRQUE2QixFQUFFLE1BQVc7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQWdDLHFDQUFlO0lBQzdDLDJCQUFZLFdBQWdDO2VBQzFDLGtCQUFNLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRU8sMENBQWMsR0FBdEIsVUFBdUIsT0FBZ0I7UUFDckMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVyQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMsaUNBQUssR0FBZixVQUFnQixLQUFjO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVTLHFDQUFTLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBbkJELENBQWdDLHVCQUFVLEdBbUJ6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKipcbiAqIElmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBpcyBlbXB0eSBpdCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0cnVlLCBvdGhlcndpc2UgaXQgZW1pdHMgZmFsc2UuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9pc0VtcHR5LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhIEJvb2xlYW4uXG4gKiBAbWV0aG9kIGlzRW1wdHlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgSXNFbXB0eU9wZXJhdG9yKCkpO1xufVxuXG5jbGFzcyBJc0VtcHR5T3BlcmF0b3IgaW1wbGVtZW50cyBPcGVyYXRvcjxhbnksIGJvb2xlYW4+IHtcbiAgY2FsbCAob2JzZXJ2ZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgSXNFbXB0eVN1YnNjcmliZXIob2JzZXJ2ZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgSXNFbXB0eVN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyPGFueT4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxib29sZWFuPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5Q29tcGxldGUoaXNFbXB0eTogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcblxuICAgIGRlc3RpbmF0aW9uLm5leHQoaXNFbXB0eSk7XG4gICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMubm90aWZ5Q29tcGxldGUoZmFsc2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICB0aGlzLm5vdGlmeUNvbXBsZXRlKHRydWUpO1xuICB9XG59XG4iXX0=