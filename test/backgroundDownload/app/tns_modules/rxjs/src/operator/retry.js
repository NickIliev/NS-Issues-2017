"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
/**
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
 * as a number parameter) rather than propagating the `error` call.
 *
 * <img src="./img/retry.png" width="100%">
 *
 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @param {number} count - Number of retry attempts before failing.
 * @return {Observable} The source Observable modified with the retry logic.
 * @method retry
 * @owner Observable
 */
function retry(count) {
    if (count === void 0) { count = -1; }
    return this.lift(new RetryOperator(count, this));
}
exports.retry = retry;
var RetryOperator = (function () {
    function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RetryOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
    };
    return RetryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RetrySubscriber = (function (_super) {
    __extends(RetrySubscriber, _super);
    function RetrySubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RetrySubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
                return _super.prototype.error.call(this, err);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RetrySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUEyQztBQUkzQzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxlQUE4QyxLQUFrQjtJQUFsQixzQkFBQSxFQUFBLFNBQWlCLENBQUM7SUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUZELHNCQUVDO0FBRUQ7SUFDRSx1QkFBb0IsS0FBYSxFQUNiLE1BQXFCO1FBRHJCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQ3pDLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQWlDLG1DQUFhO0lBQzVDLHlCQUFZLFdBQTRCLEVBQ3BCLEtBQWEsRUFDYixNQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixXQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsWUFBTSxHQUFOLE1BQU0sQ0FBZTs7SUFFekMsQ0FBQztJQUNELCtCQUFLLEdBQUwsVUFBTSxHQUFRO1FBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUEsU0FBd0IsRUFBdEIsa0JBQU0sRUFBRSxnQkFBSyxDQUFVO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsaUJBQU0sS0FBSyxZQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBaUMsdUJBQVUsR0FpQjFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoIHRoZSBleGNlcHRpb24gb2YgYW4gYGVycm9yYC4gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlXG4gKiBjYWxscyBgZXJyb3JgLCB0aGlzIG1ldGhvZCB3aWxsIHJlc3Vic2NyaWJlIHRvIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBmb3IgYSBtYXhpbXVtIG9mIGBjb3VudGAgcmVzdWJzY3JpcHRpb25zIChnaXZlblxuICogYXMgYSBudW1iZXIgcGFyYW1ldGVyKSByYXRoZXIgdGhhbiBwcm9wYWdhdGluZyB0aGUgYGVycm9yYCBjYWxsLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmV0cnkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQW55IGFuZCBhbGwgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgd2lsbCBiZSBlbWl0dGVkIGJ5IHRoZSByZXN1bHRpbmcgT2JzZXJ2YWJsZSwgZXZlbiB0aG9zZSBlbWl0dGVkXG4gKiBkdXJpbmcgZmFpbGVkIHN1YnNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCBpZiBhbiBPYnNlcnZhYmxlIGZhaWxzIGF0IGZpcnN0IGJ1dCBlbWl0cyBbMSwgMl0gdGhlbiBzdWNjZWVkcyB0aGUgc2Vjb25kXG4gKiB0aW1lIGFuZCBlbWl0czogWzEsIDIsIDMsIDQsIDVdIHRoZW4gdGhlIGNvbXBsZXRlIHN0cmVhbSBvZiBlbWlzc2lvbnMgYW5kIG5vdGlmaWNhdGlvbnNcbiAqIHdvdWxkIGJlOiBbMSwgMiwgMSwgMiwgMywgNCwgNSwgYGNvbXBsZXRlYF0uXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnQgLSBOdW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHMgYmVmb3JlIGZhaWxpbmcuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBUaGUgc291cmNlIE9ic2VydmFibGUgbW9kaWZpZWQgd2l0aCB0aGUgcmV0cnkgbG9naWMuXG4gKiBAbWV0aG9kIHJldHJ5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmV0cnk8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY291bnQ6IG51bWJlciA9IC0xKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFJldHJ5T3BlcmF0b3IoY291bnQsIHRoaXMpKTtcbn1cblxuY2xhc3MgUmV0cnlPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3VudDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBSZXRyeVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5jb3VudCwgdGhpcy5zb3VyY2UpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgUmV0cnlTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY291bnQ6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U6IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICBjb25zdCB7IHNvdXJjZSwgY291bnQgfSA9IHRoaXM7XG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmVycm9yKGVycik7XG4gICAgICB9IGVsc2UgaWYgKGNvdW50ID4gLTEpIHtcbiAgICAgICAgdGhpcy5jb3VudCA9IGNvdW50IC0gMTtcbiAgICAgIH1cbiAgICAgIHNvdXJjZS5zdWJzY3JpYmUodGhpcy5fdW5zdWJzY3JpYmVBbmRSZWN5Y2xlKCkpO1xuICAgIH1cbiAgfVxufVxuIl19