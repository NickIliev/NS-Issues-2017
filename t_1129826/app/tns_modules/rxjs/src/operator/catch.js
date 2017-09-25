"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @name catch
 * @owner Observable
 */
function _catch(selector) {
    var operator = new CatchOperator(selector);
    var caught = this.lift(operator);
    return (operator.caught = caught);
}
exports._catch = _catch;
var CatchOperator = (function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CatchSubscriber = (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;
        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    // NOTE: overriding `error` instead of `_error` because we don't want
    // to have this flag this subscriber as `isStopped`. We can mimic the
    // behavior of the RetrySubscriber (from the `retry` operator), where
    // we unsubscribe from our source chain, reset our Subscriber flags,
    // then subscribe to the selector result.
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return CatchSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHNEQUFxRDtBQUNyRCwrREFBOEQ7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwREc7QUFDSCxnQkFBa0QsUUFBaUU7SUFDakgsSUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBSSxRQUFRLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFKRCx3QkFJQztBQUVEO0lBR0UsdUJBQW9CLFFBQXFFO1FBQXJFLGFBQVEsR0FBUixRQUFRLENBQTZEO0lBQ3pGLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQW9DLG1DQUF5QjtJQUMzRCx5QkFBWSxXQUE0QixFQUNwQixRQUFxRSxFQUNyRSxNQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUE2RDtRQUNyRSxZQUFNLEdBQU4sTUFBTSxDQUFlOztJQUV6QyxDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLHFFQUFxRTtJQUNyRSxxRUFBcUU7SUFDckUsb0VBQW9FO0lBQ3BFLHlDQUF5QztJQUN6QywrQkFBSyxHQUFMLFVBQU0sR0FBUTtRQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxNQUFNLFNBQUssQ0FBQztZQUNoQixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxpQkFBTSxLQUFLLFlBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBekJELENBQW9DLGlDQUFlLEdBeUJsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKipcbiAqIENhdGNoZXMgZXJyb3JzIG9uIHRoZSBvYnNlcnZhYmxlIHRvIGJlIGhhbmRsZWQgYnkgcmV0dXJuaW5nIGEgbmV3IG9ic2VydmFibGUgb3IgdGhyb3dpbmcgYW4gZXJyb3IuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9jYXRjaC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db250aW51ZXMgd2l0aCBhIGRpZmZlcmVudCBPYnNlcnZhYmxlIHdoZW4gdGhlcmUncyBhbiBlcnJvcjwvY2FwdGlvbj5cbiAqXG4gKiBPYnNlcnZhYmxlLm9mKDEsIDIsIDMsIDQsIDUpXG4gKiAgIC5tYXAobiA9PiB7XG4gKiBcdCAgIGlmIChuID09IDQpIHtcbiAqIFx0ICAgICB0aHJvdyAnZm91ciEnO1xuICogICAgIH1cbiAqXHQgICByZXR1cm4gbjtcbiAqICAgfSlcbiAqICAgLmNhdGNoKGVyciA9PiBPYnNlcnZhYmxlLm9mKCdJJywgJ0lJJywgJ0lJSScsICdJVicsICdWJykpXG4gKiAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiAgIC8vIDEsIDIsIDMsIEksIElJLCBJSUksIElWLCBWXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmV0cmllcyB0aGUgY2F1Z2h0IHNvdXJjZSBPYnNlcnZhYmxlIGFnYWluIGluIGNhc2Ugb2YgZXJyb3IsIHNpbWlsYXIgdG8gcmV0cnkoKSBvcGVyYXRvcjwvY2FwdGlvbj5cbiAqXG4gKiBPYnNlcnZhYmxlLm9mKDEsIDIsIDMsIDQsIDUpXG4gKiAgIC5tYXAobiA9PiB7XG4gKiBcdCAgIGlmIChuID09PSA0KSB7XG4gKiBcdCAgICAgdGhyb3cgJ2ZvdXIhJztcbiAqICAgICB9XG4gKiBcdCAgIHJldHVybiBuO1xuICogICB9KVxuICogICAuY2F0Y2goKGVyciwgY2F1Z2h0KSA9PiBjYXVnaHQpXG4gKiAgIC50YWtlKDMwKVxuICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogICAvLyAxLCAyLCAzLCAxLCAyLCAzLCAuLi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaHJvd3MgYSBuZXcgZXJyb3Igd2hlbiB0aGUgc291cmNlIE9ic2VydmFibGUgdGhyb3dzIGFuIGVycm9yPC9jYXB0aW9uPlxuICpcbiAqIE9ic2VydmFibGUub2YoMSwgMiwgMywgNCwgNSlcbiAqICAgLm1hcChuID0+IHtcbiAqICAgICBpZiAobiA9PSA0KSB7XG4gKiAgICAgICB0aHJvdyAnZm91ciEnO1xuICogICAgIH1cbiAqICAgICByZXR1cm4gbjtcbiAqICAgfSlcbiAqICAgLmNhdGNoKGVyciA9PiB7XG4gKiAgICAgdGhyb3cgJ2Vycm9yIGluIHNvdXJjZS4gRGV0YWlsczogJyArIGVycjtcbiAqICAgfSlcbiAqICAgLnN1YnNjcmliZShcbiAqICAgICB4ID0+IGNvbnNvbGUubG9nKHgpLFxuICogICAgIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpXG4gKiAgICk7XG4gKiAgIC8vIDEsIDIsIDMsIGVycm9yIGluIHNvdXJjZS4gRGV0YWlsczogZm91ciFcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzZWxlY3RvciBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYXMgYXJndW1lbnRzIGBlcnJgLCB3aGljaCBpcyB0aGUgZXJyb3IsIGFuZCBgY2F1Z2h0YCwgd2hpY2hcbiAqICBpcyB0aGUgc291cmNlIG9ic2VydmFibGUsIGluIGNhc2UgeW91J2QgbGlrZSB0byBcInJldHJ5XCIgdGhhdCBvYnNlcnZhYmxlIGJ5IHJldHVybmluZyBpdCBhZ2Fpbi4gV2hhdGV2ZXIgb2JzZXJ2YWJsZVxuICogIGlzIHJldHVybmVkIGJ5IHRoZSBgc2VsZWN0b3JgIHdpbGwgYmUgdXNlZCB0byBjb250aW51ZSB0aGUgb2JzZXJ2YWJsZSBjaGFpbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIG9ic2VydmFibGUgdGhhdCBvcmlnaW5hdGVzIGZyb20gZWl0aGVyIHRoZSBzb3VyY2Ugb3IgdGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlXG4gKiAgY2F0Y2ggYHNlbGVjdG9yYCBmdW5jdGlvbi5cbiAqIEBtZXRob2QgY2F0Y2hcbiAqIEBuYW1lIGNhdGNoXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NhdGNoPFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIHNlbGVjdG9yOiAoZXJyOiBhbnksIGNhdWdodDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZUlucHV0PFI+KTogT2JzZXJ2YWJsZTxUIHwgUj4ge1xuICBjb25zdCBvcGVyYXRvciA9IG5ldyBDYXRjaE9wZXJhdG9yKHNlbGVjdG9yKTtcbiAgY29uc3QgY2F1Z2h0ID0gdGhpcy5saWZ0PFQ+KG9wZXJhdG9yKTtcbiAgcmV0dXJuIChvcGVyYXRvci5jYXVnaHQgPSBjYXVnaHQpO1xufVxuXG5jbGFzcyBDYXRjaE9wZXJhdG9yPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVCB8IFI+IHtcbiAgY2F1Z2h0OiBPYnNlcnZhYmxlPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VsZWN0b3I6IChlcnI6IGFueSwgY2F1Z2h0OiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlSW5wdXQ8VCB8IFI+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgQ2F0Y2hTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuc2VsZWN0b3IsIHRoaXMuY2F1Z2h0KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIENhdGNoU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBUIHwgUj4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yOiAoZXJyOiBhbnksIGNhdWdodDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZUlucHV0PFQgfCBSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjYXVnaHQ6IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICAvLyBOT1RFOiBvdmVycmlkaW5nIGBlcnJvcmAgaW5zdGVhZCBvZiBgX2Vycm9yYCBiZWNhdXNlIHdlIGRvbid0IHdhbnRcbiAgLy8gdG8gaGF2ZSB0aGlzIGZsYWcgdGhpcyBzdWJzY3JpYmVyIGFzIGBpc1N0b3BwZWRgLiBXZSBjYW4gbWltaWMgdGhlXG4gIC8vIGJlaGF2aW9yIG9mIHRoZSBSZXRyeVN1YnNjcmliZXIgKGZyb20gdGhlIGByZXRyeWAgb3BlcmF0b3IpLCB3aGVyZVxuICAvLyB3ZSB1bnN1YnNjcmliZSBmcm9tIG91ciBzb3VyY2UgY2hhaW4sIHJlc2V0IG91ciBTdWJzY3JpYmVyIGZsYWdzLFxuICAvLyB0aGVuIHN1YnNjcmliZSB0byB0aGUgc2VsZWN0b3IgcmVzdWx0LlxuICBlcnJvcihlcnI6IGFueSkge1xuICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuc2VsZWN0b3IoZXJyLCB0aGlzLmNhdWdodCk7XG4gICAgICB9IGNhdGNoIChlcnIyKSB7XG4gICAgICAgIHN1cGVyLmVycm9yKGVycjIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl91bnN1YnNjcmliZUFuZFJlY3ljbGUoKTtcbiAgICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIHJlc3VsdCkpO1xuICAgIH1cbiAgfVxufVxuIl19