"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../Subject");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
 * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
 * subscription. Otherwise this method will resubscribe to the source Observable.
 *
 * <img src="./img/retryWhen.png" width="100%">
 *
 * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
 * user can `complete` or `error`, aborting the retry.
 * @return {Observable} The source Observable modified with retry logic.
 * @method retryWhen
 * @owner Observable
 */
function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}
exports.retryWhen = retryWhen;
var RetryWhenOperator = (function () {
    function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RetryWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RetryWhenSubscriber = (function (_super) {
    __extends(RetryWhenSubscriber, _super);
    function RetryWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        return _this;
    }
    RetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var errors = this.errors;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
                errors = new Subject_1.Subject();
                retries = tryCatch_1.tryCatch(this.notifier)(errors);
                if (retries === errorObject_1.errorObject) {
                    return _super.prototype.error.call(this, errorObject_1.errorObject.e);
                }
                retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
            }
            else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this._unsubscribeAndRecycle();
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
        }
    };
    RetryWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
        if (errors) {
            errors.unsubscribe();
            this.errors = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, errors = _a.errors, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
        this.errors = null;
        this.retries = null;
        this.retriesSubscription = null;
        this._unsubscribeAndRecycle();
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
    };
    return RetryWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnlXaGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV0cnlXaGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esc0NBQXFDO0FBRXJDLDZDQUE0QztBQUM1QyxtREFBa0Q7QUFFbEQsc0RBQXFEO0FBRXJELCtEQUE4RDtBQUU5RDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsbUJBQWtELFFBQXNEO0lBQ3RHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUZELDhCQUVDO0FBRUQ7SUFDRSwyQkFBc0IsUUFBc0QsRUFDdEQsTUFBcUI7UUFEckIsYUFBUSxHQUFSLFFBQVEsQ0FBOEM7UUFDdEQsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUMzQyxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXdDLHVDQUFxQjtJQU0zRCw2QkFBWSxXQUEwQixFQUNsQixRQUFzRCxFQUN0RCxNQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUE4QztRQUN0RCxZQUFNLEdBQU4sTUFBTSxDQUFlOztJQUV6QyxDQUFDO0lBRUQsbUNBQUssR0FBTCxVQUFNLEdBQVE7UUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRXBCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekIsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNoQyxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUVuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO2dCQUN2QixPQUFPLEdBQUcsbUJBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyx5QkFBVyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxDQUFDLGlCQUFNLEtBQUssWUFBQyx5QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2dCQUNELG1CQUFtQixHQUFHLHFDQUFpQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDbEMsQ0FBQztZQUVELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBRTlCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztZQUUvQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBRVMsMENBQVksR0FBdEI7UUFDUSxJQUFBLFNBQXNDLEVBQXBDLGtCQUFNLEVBQUUsNENBQW1CLENBQVU7UUFDN0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFDNUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtRQUNsQyxJQUFBLFNBQStDLEVBQTdDLGtCQUFNLEVBQUUsb0JBQU8sRUFBRSw0Q0FBbUIsQ0FBVTtRQUN0RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBRWhDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUUvQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBdEVELENBQXdDLGlDQUFlLEdBc0V0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aCB0aGUgZXhjZXB0aW9uIG9mIGFuIGBlcnJvcmAuIElmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZVxuICogY2FsbHMgYGVycm9yYCwgdGhpcyBtZXRob2Qgd2lsbCBlbWl0IHRoZSBUaHJvd2FibGUgdGhhdCBjYXVzZWQgdGhlIGVycm9yIHRvIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGZyb20gYG5vdGlmaWVyYC5cbiAqIElmIHRoYXQgT2JzZXJ2YWJsZSBjYWxscyBgY29tcGxldGVgIG9yIGBlcnJvcmAgdGhlbiB0aGlzIG1ldGhvZCB3aWxsIGNhbGwgYGNvbXBsZXRlYCBvciBgZXJyb3JgIG9uIHRoZSBjaGlsZFxuICogc3Vic2NyaXB0aW9uLiBPdGhlcndpc2UgdGhpcyBtZXRob2Qgd2lsbCByZXN1YnNjcmliZSB0byB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9yZXRyeVdoZW4ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbihlcnJvcnM6IE9ic2VydmFibGUpOiBPYnNlcnZhYmxlfSBub3RpZmllciAtIFJlY2VpdmVzIGFuIE9ic2VydmFibGUgb2Ygbm90aWZpY2F0aW9ucyB3aXRoIHdoaWNoIGFcbiAqIHVzZXIgY2FuIGBjb21wbGV0ZWAgb3IgYGVycm9yYCwgYWJvcnRpbmcgdGhlIHJldHJ5LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gVGhlIHNvdXJjZSBPYnNlcnZhYmxlIG1vZGlmaWVkIHdpdGggcmV0cnkgbG9naWMuXG4gKiBAbWV0aG9kIHJldHJ5V2hlblxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldHJ5V2hlbjxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBub3RpZmllcjogKGVycm9yczogT2JzZXJ2YWJsZTxhbnk+KSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgUmV0cnlXaGVuT3BlcmF0b3Iobm90aWZpZXIsIHRoaXMpKTtcbn1cblxuY2xhc3MgUmV0cnlXaGVuT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBub3RpZmllcjogKGVycm9yczogT2JzZXJ2YWJsZTxhbnk+KSA9PiBPYnNlcnZhYmxlPGFueT4sXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBzb3VyY2U6IE9ic2VydmFibGU8VD4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgUmV0cnlXaGVuU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLm5vdGlmaWVyLCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBSZXRyeVdoZW5TdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFI+IHtcblxuICBwcml2YXRlIGVycm9yczogU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIHJldHJpZXM6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSByZXRyaWVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpZXI6IChlcnJvcnM6IE9ic2VydmFibGU8YW55PikgPT4gT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuXG4gICAgICBsZXQgZXJyb3JzID0gdGhpcy5lcnJvcnM7XG4gICAgICBsZXQgcmV0cmllczogYW55ID0gdGhpcy5yZXRyaWVzO1xuICAgICAgbGV0IHJldHJpZXNTdWJzY3JpcHRpb24gPSB0aGlzLnJldHJpZXNTdWJzY3JpcHRpb247XG5cbiAgICAgIGlmICghcmV0cmllcykge1xuICAgICAgICBlcnJvcnMgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICByZXRyaWVzID0gdHJ5Q2F0Y2godGhpcy5ub3RpZmllcikoZXJyb3JzKTtcbiAgICAgICAgaWYgKHJldHJpZXMgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHJpZXNTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCByZXRyaWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZXRyaWVzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbmRSZWN5Y2xlKCk7XG5cbiAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgdGhpcy5yZXRyaWVzID0gcmV0cmllcztcbiAgICAgIHRoaXMucmV0cmllc1N1YnNjcmlwdGlvbiA9IHJldHJpZXNTdWJzY3JpcHRpb247XG5cbiAgICAgIGVycm9ycy5uZXh0KGVycik7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF91bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCB7IGVycm9ycywgcmV0cmllc1N1YnNjcmlwdGlvbiB9ID0gdGhpcztcbiAgICBpZiAoZXJyb3JzKSB7XG4gICAgICBlcnJvcnMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZXJyb3JzID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHJldHJpZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHJldHJpZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucmV0cmllc1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMucmV0cmllcyA9IG51bGw7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIGNvbnN0IHsgZXJyb3JzLCByZXRyaWVzLCByZXRyaWVzU3Vic2NyaXB0aW9uIH0gPSB0aGlzO1xuICAgIHRoaXMuZXJyb3JzID0gbnVsbDtcbiAgICB0aGlzLnJldHJpZXMgPSBudWxsO1xuICAgIHRoaXMucmV0cmllc1N1YnNjcmlwdGlvbiA9IG51bGw7XG5cbiAgICB0aGlzLl91bnN1YnNjcmliZUFuZFJlY3ljbGUoKTtcblxuICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIHRoaXMucmV0cmllcyA9IHJldHJpZXM7XG4gICAgdGhpcy5yZXRyaWVzU3Vic2NyaXB0aW9uID0gcmV0cmllc1N1YnNjcmlwdGlvbjtcblxuICAgIHRoaXMuc291cmNlLnN1YnNjcmliZSh0aGlzKTtcbiAgfVxufVxuIl19