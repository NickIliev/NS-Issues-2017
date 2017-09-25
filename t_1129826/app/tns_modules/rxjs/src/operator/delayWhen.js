"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var Observable_1 = require("../Observable");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Delays the emission of items from the source Observable by a given time span
 * determined by the emissions of another Observable.
 *
 * <span class="informal">It's like {@link delay}, but the time span of the
 * delay duration is determined by a second Observable.</span>
 *
 * <img src="./img/delayWhen.png" width="100%">
 *
 * `delayWhen` time shifts each emitted value from the source Observable by a
 * time span determined by another Observable. When the source emits a value,
 * the `delayDurationSelector` function is called with the source value as
 * argument, and should return an Observable, called the "duration" Observable.
 * The source value is emitted on the output Observable only when the duration
 * Observable emits a value or completes.
 *
 * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
 * is an Observable. When `subscriptionDelay` emits its first value or
 * completes, the source Observable is subscribed to and starts behaving like
 * described in the previous paragraph. If `subscriptionDelay` is not provided,
 * `delayWhen` will subscribe to the source Observable as soon as the output
 * Observable is subscribed.
 *
 * @example <caption>Delay each click by a random amount of time, between 0 and 5 seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delayWhen(event =>
 *   Rx.Observable.interval(Math.random() * 5000)
 * );
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounce}
 * @see {@link delay}
 *
 * @param {function(value: T): Observable} delayDurationSelector A function that
 * returns an Observable for each value emitted by the source Observable, which
 * is then used to delay the emission of that item on the output Observable
 * until the Observable returned from this function emits a value.
 * @param {Observable} subscriptionDelay An Observable that triggers the
 * subscription to the source Observable once it emits any value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by an amount of time specified by the Observable returned by
 * `delayDurationSelector`.
 * @method delayWhen
 * @owner Observable
 */
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return new SubscriptionDelayObservable(this, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
}
exports.delayWhen = delayWhen;
var DelayWhenOperator = (function () {
    function DelayWhenOperator(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    DelayWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    };
    return DelayWhenOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelayWhenSubscriber = (function (_super) {
    __extends(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.delayDurationSelector = delayDurationSelector;
        _this.completed = false;
        _this.delayNotifierSubscriptions = [];
        _this.values = [];
        return _this;
    }
    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        var value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function (value) {
        try {
            var delayNotifier = this.delayDurationSelector(value);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    };
    DelayWhenSubscriber.prototype._complete = function () {
        this.completed = true;
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        var value = null;
        if (subscriptionIdx !== -1) {
            value = this.values[subscriptionIdx];
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
            this.values.splice(subscriptionIdx, 1);
        }
        return value;
    };
    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
        var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
        if (notifierSubscription && !notifierSubscription.closed) {
            this.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
        }
        this.values.push(value);
    };
    DelayWhenSubscriber.prototype.tryComplete = function () {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    };
    return DelayWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubscriptionDelayObservable = (function (_super) {
    __extends(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subscriptionDelay = subscriptionDelay;
        return _this;
    }
    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
}(Observable_1.Observable));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubscriptionDelaySubscriber = (function (_super) {
    __extends(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.source = source;
        _this.sourceSubscribed = false;
        return _this;
    }
    SubscriptionDelaySubscriber.prototype._next = function (unused) {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function (err) {
        this.unsubscribe();
        this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function () {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    };
    return SubscriptionDelaySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXlXaGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVsYXlXaGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTJDO0FBQzNDLDRDQUEyQztBQUczQyxzREFBcUQ7QUFFckQsK0RBQThEO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILG1CQUFrRCxxQkFBb0QsRUFDekUsaUJBQW1DO0lBQzlELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUM7YUFDNUQsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBUEQsOEJBT0M7QUFFRDtJQUNFLDJCQUFvQixxQkFBb0Q7UUFBcEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUErQjtJQUN4RSxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXdDLHVDQUFxQjtJQUszRCw2QkFBWSxXQUEwQixFQUNsQixxQkFBb0Q7UUFEeEUsWUFFRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFGbUIsMkJBQXFCLEdBQXJCLHFCQUFxQixDQUErQjtRQUxoRSxlQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNC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QUFDO0lBRVMsK0NBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sdURBQWlCLEdBQXpCO1FBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUNILGtDQUFDO0FBQUQsQ0FBQyxBQTNCRCxDQUE2Qyx1QkFBVSxHQTJCdEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuLyoqXG4gKiBEZWxheXMgdGhlIGVtaXNzaW9uIG9mIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJ5IGEgZ2l2ZW4gdGltZSBzcGFuXG4gKiBkZXRlcm1pbmVkIGJ5IHRoZSBlbWlzc2lvbnMgb2YgYW5vdGhlciBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGRlbGF5fSwgYnV0IHRoZSB0aW1lIHNwYW4gb2YgdGhlXG4gKiBkZWxheSBkdXJhdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IGEgc2Vjb25kIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZGVsYXlXaGVuLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBkZWxheVdoZW5gIHRpbWUgc2hpZnRzIGVhY2ggZW1pdHRlZCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBhXG4gKiB0aW1lIHNwYW4gZGV0ZXJtaW5lZCBieSBhbm90aGVyIE9ic2VydmFibGUuIFdoZW4gdGhlIHNvdXJjZSBlbWl0cyBhIHZhbHVlLFxuICogdGhlIGBkZWxheUR1cmF0aW9uU2VsZWN0b3JgIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSBzb3VyY2UgdmFsdWUgYXNcbiAqIGFyZ3VtZW50LCBhbmQgc2hvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlLCBjYWxsZWQgdGhlIFwiZHVyYXRpb25cIiBPYnNlcnZhYmxlLlxuICogVGhlIHNvdXJjZSB2YWx1ZSBpcyBlbWl0dGVkIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBvbmx5IHdoZW4gdGhlIGR1cmF0aW9uXG4gKiBPYnNlcnZhYmxlIGVtaXRzIGEgdmFsdWUgb3IgY29tcGxldGVzLlxuICpcbiAqIE9wdGlvbmFsbHksIGBkZWxheVdoZW5gIHRha2VzIGEgc2Vjb25kIGFyZ3VtZW50LCBgc3Vic2NyaXB0aW9uRGVsYXlgLCB3aGljaFxuICogaXMgYW4gT2JzZXJ2YWJsZS4gV2hlbiBgc3Vic2NyaXB0aW9uRGVsYXlgIGVtaXRzIGl0cyBmaXJzdCB2YWx1ZSBvclxuICogY29tcGxldGVzLCB0aGUgc291cmNlIE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZCB0byBhbmQgc3RhcnRzIGJlaGF2aW5nIGxpa2VcbiAqIGRlc2NyaWJlZCBpbiB0aGUgcHJldmlvdXMgcGFyYWdyYXBoLiBJZiBgc3Vic2NyaXB0aW9uRGVsYXlgIGlzIG5vdCBwcm92aWRlZCxcbiAqIGBkZWxheVdoZW5gIHdpbGwgc3Vic2NyaWJlIHRvIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhcyBzb29uIGFzIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5EZWxheSBlYWNoIGNsaWNrIGJ5IGEgcmFuZG9tIGFtb3VudCBvZiB0aW1lLCBiZXR3ZWVuIDAgYW5kIDUgc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgZGVsYXllZENsaWNrcyA9IGNsaWNrcy5kZWxheVdoZW4oZXZlbnQgPT5cbiAqICAgUnguT2JzZXJ2YWJsZS5pbnRlcnZhbChNYXRoLnJhbmRvbSgpICogNTAwMClcbiAqICk7XG4gKiBkZWxheWVkQ2xpY2tzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQpOiBPYnNlcnZhYmxlfSBkZWxheUR1cmF0aW9uU2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0XG4gKiByZXR1cm5zIGFuIE9ic2VydmFibGUgZm9yIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHdoaWNoXG4gKiBpcyB0aGVuIHVzZWQgdG8gZGVsYXkgdGhlIGVtaXNzaW9uIG9mIHRoYXQgaXRlbSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGVcbiAqIHVudGlsIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGZyb20gdGhpcyBmdW5jdGlvbiBlbWl0cyBhIHZhbHVlLlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBzdWJzY3JpcHRpb25EZWxheSBBbiBPYnNlcnZhYmxlIHRoYXQgdHJpZ2dlcnMgdGhlXG4gKiBzdWJzY3JpcHRpb24gdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG9uY2UgaXQgZW1pdHMgYW55IHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgYW4gYW1vdW50IG9mIHRpbWUgc3BlY2lmaWVkIGJ5IHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5XG4gKiBgZGVsYXlEdXJhdGlvblNlbGVjdG9yYC5cbiAqIEBtZXRob2QgZGVsYXlXaGVuXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlXaGVuPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIGRlbGF5RHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBPYnNlcnZhYmxlPGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkRlbGF5PzogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIGlmIChzdWJzY3JpcHRpb25EZWxheSkge1xuICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uRGVsYXlPYnNlcnZhYmxlKHRoaXMsIHN1YnNjcmlwdGlvbkRlbGF5KVxuICAgICAgLmxpZnQobmV3IERlbGF5V2hlbk9wZXJhdG9yKGRlbGF5RHVyYXRpb25TZWxlY3RvcikpO1xuICB9XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IERlbGF5V2hlbk9wZXJhdG9yKGRlbGF5RHVyYXRpb25TZWxlY3RvcikpO1xufVxuXG5jbGFzcyBEZWxheVdoZW5PcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxheUR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IERlbGF5V2hlblN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kZWxheUR1cmF0aW9uU2VsZWN0b3IpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgRGVsYXlXaGVuU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgY29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZGVsYXlOb3RpZmllclN1YnNjcmlwdGlvbnM6IEFycmF5PFN1YnNjcmlwdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSB2YWx1ZXM6IEFycmF5PFQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGVsYXlEdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IE9ic2VydmFibGU8YW55Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogYW55LFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQob3V0ZXJWYWx1ZSk7XG4gICAgdGhpcy5yZW1vdmVTdWJzY3JpcHRpb24oaW5uZXJTdWIpO1xuICAgIHRoaXMudHJ5Q29tcGxldGUoKTtcbiAgfVxuXG4gIG5vdGlmeUVycm9yKGVycm9yOiBhbnksIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvcihlcnJvcik7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZShpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIFI+KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnJlbW92ZVN1YnNjcmlwdGlvbihpbm5lclN1Yik7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnRyeUNvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsYXlOb3RpZmllciA9IHRoaXMuZGVsYXlEdXJhdGlvblNlbGVjdG9yKHZhbHVlKTtcbiAgICAgIGlmIChkZWxheU5vdGlmaWVyKSB7XG4gICAgICAgIHRoaXMudHJ5RGVsYXkoZGVsYXlOb3RpZmllciwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIHRoaXMudHJ5Q29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbjogSW5uZXJTdWJzY3JpYmVyPFQsIFI+KTogVCB7XG4gICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb25JZHggPSB0aGlzLmRlbGF5Tm90aWZpZXJTdWJzY3JpcHRpb25zLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICBsZXQgdmFsdWU6IFQgPSBudWxsO1xuXG4gICAgaWYgKHN1YnNjcmlwdGlvbklkeCAhPT0gLTEpIHtcbiAgICAgIHZhbHVlID0gdGhpcy52YWx1ZXNbc3Vic2NyaXB0aW9uSWR4XTtcbiAgICAgIHRoaXMuZGVsYXlOb3RpZmllclN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbklkeCwgMSk7XG4gICAgICB0aGlzLnZhbHVlcy5zcGxpY2Uoc3Vic2NyaXB0aW9uSWR4LCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHRyeURlbGF5KGRlbGF5Tm90aWZpZXI6IE9ic2VydmFibGU8YW55PiwgdmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBub3RpZmllclN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIGRlbGF5Tm90aWZpZXIsIHZhbHVlKTtcblxuICAgIGlmIChub3RpZmllclN1YnNjcmlwdGlvbiAmJiAhbm90aWZpZXJTdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICB0aGlzLmFkZChub3RpZmllclN1YnNjcmlwdGlvbik7XG4gICAgICB0aGlzLmRlbGF5Tm90aWZpZXJTdWJzY3JpcHRpb25zLnB1c2gobm90aWZpZXJTdWJzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIHRoaXMudmFsdWVzLnB1c2godmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgJiYgdGhpcy5kZWxheU5vdGlmaWVyU3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFN1YnNjcmlwdGlvbkRlbGF5T2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc291cmNlOiBPYnNlcnZhYmxlPFQ+LCBwcml2YXRlIHN1YnNjcmlwdGlvbkRlbGF5OiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uRGVsYXkuc3Vic2NyaWJlKG5ldyBTdWJzY3JpcHRpb25EZWxheVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5zb3VyY2UpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgU3Vic2NyaXB0aW9uRGVsYXlTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgc291cmNlU3Vic2NyaWJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyZW50OiBTdWJzY3JpYmVyPFQ+LCBwcml2YXRlIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodW51c2VkOiBhbnkpIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvU291cmNlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucGFyZW50LmVycm9yKGVycik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Tb3VyY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Tb3VyY2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZVN1YnNjcmliZWQpIHtcbiAgICAgIHRoaXMuc291cmNlU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnNvdXJjZS5zdWJzY3JpYmUodGhpcy5wYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19