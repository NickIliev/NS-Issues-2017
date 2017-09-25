"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../Subject");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
 * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
 * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
 * this method will resubscribe to the source Observable.
 *
 * <img src="./img/repeatWhen.png" width="100%">
 *
 * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
 * which a user can `complete` or `error`, aborting the repetition.
 * @return {Observable} The source Observable modified with repeat logic.
 * @method repeatWhen
 * @owner Observable
 */
function repeatWhen(notifier) {
    return this.lift(new RepeatWhenOperator(notifier));
}
exports.repeatWhen = repeatWhen;
var RepeatWhenOperator = (function () {
    function RepeatWhenOperator(notifier) {
        this.notifier = notifier;
    }
    RepeatWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
    };
    return RepeatWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RepeatWhenSubscriber = (function (_super) {
    __extends(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        _this.sourceIsBeingSubscribedTo = true;
        return _this;
    }
    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
    };
    RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        if (this.sourceIsBeingSubscribedTo === false) {
            return _super.prototype.complete.call(this);
        }
    };
    RepeatWhenSubscriber.prototype.complete = function () {
        this.sourceIsBeingSubscribedTo = false;
        if (!this.isStopped) {
            if (!this.retries) {
                this.subscribeToRetries();
            }
            else if (this.retriesSubscription.closed) {
                return _super.prototype.complete.call(this);
            }
            this._unsubscribeAndRecycle();
            this.notifications.next();
        }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, notifications = _a.notifications, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
        this.notifications = null;
        this.retries = null;
        this.retriesSubscription = null;
        _super.prototype._unsubscribeAndRecycle.call(this);
        this.notifications = notifications;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        return this;
    };
    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
        this.notifications = new Subject_1.Subject();
        var retries = tryCatch_1.tryCatch(this.notifier)(this.notifications);
        if (retries === errorObject_1.errorObject) {
            return _super.prototype.complete.call(this);
        }
        this.retries = retries;
        this.retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
    };
    return RepeatWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0V2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcGVhdFdoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxzQ0FBcUM7QUFFckMsNkNBQTRDO0FBQzVDLG1EQUFrRDtBQUVsRCxzREFBcUQ7QUFFckQsK0RBQThEO0FBRTlEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxvQkFBbUQsUUFBNkQ7SUFDOUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFGRCxnQ0FFQztBQUVEO0lBQ0UsNEJBQXNCLFFBQTZEO1FBQTdELGFBQVEsR0FBUixRQUFRLENBQXFEO0lBQ25GLENBQUM7SUFFRCxpQ0FBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEOzs7O0dBSUc7QUFDSDtJQUF5Qyx3Q0FBcUI7SUFPNUQsOEJBQVksV0FBMEIsRUFDbEIsUUFBNkQsRUFDN0QsTUFBcUI7UUFGekMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIbUIsY0FBUSxHQUFSLFFBQVEsQ0FBcUQ7UUFDN0QsWUFBTSxHQUFOLE1BQU0sQ0FBZTtRQUpqQywrQkFBeUIsR0FBWSxJQUFJLENBQUM7O0lBTWxELENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFDNUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtRQUN4QyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCw2Q0FBYyxHQUFkLFVBQWUsUUFBK0I7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsaUJBQU0sUUFBUSxXQUFFLENBQUM7WUFDMUIsQ0FBQztZQUVELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsQ0FBQztJQUNILENBQUM7SUFFUywyQ0FBWSxHQUF0QjtRQUNRLElBQUEsU0FBNkMsRUFBM0MsZ0NBQWEsRUFBRSw0Q0FBbUIsQ0FBVTtRQUNwRCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFUyxxREFBc0IsR0FBaEM7UUFDUSxJQUFBLFNBQXNELEVBQXBELGdDQUFhLEVBQUUsb0JBQU8sRUFBRSw0Q0FBbUIsQ0FBVTtRQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLGlCQUFNLHNCQUFzQixXQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8saURBQWtCLEdBQTFCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUNuQyxJQUFNLE9BQU8sR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUMxQixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLHFDQUFpQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBM0VELENBQXlDLGlDQUFlLEdBMkV2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aCB0aGUgZXhjZXB0aW9uIG9mIGEgYGNvbXBsZXRlYC4gSWYgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBjYWxscyBgY29tcGxldGVgLCB0aGlzIG1ldGhvZCB3aWxsIGVtaXQgdG8gdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgZnJvbSBgbm90aWZpZXJgLiBJZiB0aGF0IE9ic2VydmFibGVcbiAqIGNhbGxzIGBjb21wbGV0ZWAgb3IgYGVycm9yYCwgdGhlbiB0aGlzIG1ldGhvZCB3aWxsIGNhbGwgYGNvbXBsZXRlYCBvciBgZXJyb3JgIG9uIHRoZSBjaGlsZCBzdWJzY3JpcHRpb24uIE90aGVyd2lzZVxuICogdGhpcyBtZXRob2Qgd2lsbCByZXN1YnNjcmliZSB0byB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9yZXBlYXRXaGVuLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24obm90aWZpY2F0aW9uczogT2JzZXJ2YWJsZSk6IE9ic2VydmFibGV9IG5vdGlmaWVyIC0gUmVjZWl2ZXMgYW4gT2JzZXJ2YWJsZSBvZiBub3RpZmljYXRpb25zIHdpdGhcbiAqIHdoaWNoIGEgdXNlciBjYW4gYGNvbXBsZXRlYCBvciBgZXJyb3JgLCBhYm9ydGluZyB0aGUgcmVwZXRpdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IFRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBtb2RpZmllZCB3aXRoIHJlcGVhdCBsb2dpYy5cbiAqIEBtZXRob2QgcmVwZWF0V2hlblxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdFdoZW48VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgbm90aWZpZXI6IChub3RpZmljYXRpb25zOiBPYnNlcnZhYmxlPGFueT4pID0+IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZXBlYXRXaGVuT3BlcmF0b3Iobm90aWZpZXIpKTtcbn1cblxuY2xhc3MgUmVwZWF0V2hlbk9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbm90aWZpZXI6IChub3RpZmljYXRpb25zOiBPYnNlcnZhYmxlPGFueT4pID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBSZXBlYXRXaGVuU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLm5vdGlmaWVyLCBzb3VyY2UpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgUmVwZWF0V2hlblN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuXG4gIHByaXZhdGUgbm90aWZpY2F0aW9uczogU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIHJldHJpZXM6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSByZXRyaWVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc291cmNlSXNCZWluZ1N1YnNjcmliZWRUbzogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpZXI6IChub3RpZmljYXRpb25zOiBPYnNlcnZhYmxlPGFueT4pID0+IE9ic2VydmFibGU8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U6IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuc291cmNlSXNCZWluZ1N1YnNjcmliZWRUbyA9IHRydWU7XG4gICAgdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHRoaXMpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIGlmICh0aGlzLnNvdXJjZUlzQmVpbmdTdWJzY3JpYmVkVG8gPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gc3VwZXIuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICB0aGlzLnNvdXJjZUlzQmVpbmdTdWJzY3JpYmVkVG8gPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgIGlmICghdGhpcy5yZXRyaWVzKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9SZXRyaWVzKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmV0cmllc1N1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNvbXBsZXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSgpO1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25zLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHsgbm90aWZpY2F0aW9ucywgcmV0cmllc1N1YnNjcmlwdGlvbiB9ID0gdGhpcztcbiAgICBpZiAobm90aWZpY2F0aW9ucykge1xuICAgICAgbm90aWZpY2F0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25zID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHJldHJpZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHJldHJpZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucmV0cmllc1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMucmV0cmllcyA9IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSgpOiBTdWJzY3JpYmVyPFQ+IHtcbiAgICBjb25zdCB7IG5vdGlmaWNhdGlvbnMsIHJldHJpZXMsIHJldHJpZXNTdWJzY3JpcHRpb24gfSA9IHRoaXM7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zID0gbnVsbDtcbiAgICB0aGlzLnJldHJpZXMgPSBudWxsO1xuICAgIHRoaXMucmV0cmllc1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgc3VwZXIuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSgpO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IG5vdGlmaWNhdGlvbnM7XG4gICAgdGhpcy5yZXRyaWVzID0gcmV0cmllcztcbiAgICB0aGlzLnJldHJpZXNTdWJzY3JpcHRpb24gPSByZXRyaWVzU3Vic2NyaXB0aW9uO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1JldHJpZXMoKSB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zID0gbmV3IFN1YmplY3QoKTtcbiAgICBjb25zdCByZXRyaWVzID0gdHJ5Q2F0Y2godGhpcy5ub3RpZmllcikodGhpcy5ub3RpZmljYXRpb25zKTtcbiAgICBpZiAocmV0cmllcyA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgIHJldHVybiBzdXBlci5jb21wbGV0ZSgpO1xuICAgIH1cbiAgICB0aGlzLnJldHJpZXMgPSByZXRyaWVzO1xuICAgIHRoaXMucmV0cmllc1N1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIHJldHJpZXMpO1xuICB9XG59XG4iXX0=