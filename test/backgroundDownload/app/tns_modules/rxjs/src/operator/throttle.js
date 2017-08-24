"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link throttleTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/throttle.png" width="100%">
 *
 * `throttle` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled by calling the `durationSelector` function with the source value,
 * which returns the "duration" Observable. When the duration Observable emits a
 * value or completes, the timer is disabled, and this process repeats for the
 * next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttle
 * @owner Observable
 */
function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
}
exports.throttle = throttle;
var ThrottleOperator = (function () {
    function ThrottleOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
    };
    return ThrottleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ThrottleSubscriber = (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.durationSelector = durationSelector;
        return _this;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
            this.tryDurationSelector(value);
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        var duration = null;
        try {
            duration = this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.emitAndThrottle(value, duration);
    };
    ThrottleSubscriber.prototype.emitAndThrottle = function (value, duration) {
        this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
        this.destination.next(value);
    };
    ThrottleSubscriber.prototype._unsubscribe = function () {
        var throttled = this.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._unsubscribe();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this._unsubscribe();
    };
    return ThrottleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ0c7QUFDSCxrQkFBaUQsZ0JBQTZEO0lBQzVHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCw0QkFFQztBQUVEO0lBQ0UsMEJBQW9CLGdCQUE2RDtRQUE3RCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTZDO0lBQ2pGLENBQUM7SUFFRCwrQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksa0JBQWtCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFFRDs7OztHQUlHO0FBQ0g7SUFBdUMsc0NBQXFCO0lBRzFELDRCQUFzQixXQUEwQixFQUM1QixnQkFBNkQ7UUFEakYsWUFFRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIcUIsaUJBQVcsR0FBWCxXQUFXLENBQWU7UUFDNUIsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUE2Qzs7SUFFakYsQ0FBQztJQUVTLGtDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUVPLGdEQUFtQixHQUEzQixVQUE0QixLQUFRO1FBQ2xDLElBQUksUUFBUSxHQUFrQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxDQUFDO1lBQ0gsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sNENBQWUsR0FBdkIsVUFBd0IsS0FBUSxFQUFFLFFBQXVDO1FBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRVMseUNBQVksR0FBdEI7UUFDRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBVyxVQUFhLEVBQUUsVUFBYSxFQUM1QixVQUFrQixFQUFFLFVBQWtCLEVBQ3RDLFFBQStCO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBaERELENBQXVDLGlDQUFlLEdBZ0RyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlT3JQcm9taXNlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogRW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgdGhlbiBpZ25vcmVzIHN1YnNlcXVlbnQgc291cmNlXG4gKiB2YWx1ZXMgZm9yIGEgZHVyYXRpb24gZGV0ZXJtaW5lZCBieSBhbm90aGVyIE9ic2VydmFibGUsIHRoZW4gcmVwZWF0cyB0aGlzXG4gKiBwcm9jZXNzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIHRocm90dGxlVGltZX0sIGJ1dCB0aGUgc2lsZW5jaW5nXG4gKiBkdXJhdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IGEgc2Vjb25kIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGhyb3R0bGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHRocm90dGxlYCBlbWl0cyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICogd2hlbiBpdHMgaW50ZXJuYWwgdGltZXIgaXMgZGlzYWJsZWQsIGFuZCBpZ25vcmVzIHNvdXJjZSB2YWx1ZXMgd2hlbiB0aGUgdGltZXJcbiAqIGlzIGVuYWJsZWQuIEluaXRpYWxseSwgdGhlIHRpbWVyIGlzIGRpc2FibGVkLiBBcyBzb29uIGFzIHRoZSBmaXJzdCBzb3VyY2VcbiAqIHZhbHVlIGFycml2ZXMsIGl0IGlzIGZvcndhcmRlZCB0byB0aGUgb3V0cHV0IE9ic2VydmFibGUsIGFuZCB0aGVuIHRoZSB0aW1lclxuICogaXMgZW5hYmxlZCBieSBjYWxsaW5nIHRoZSBgZHVyYXRpb25TZWxlY3RvcmAgZnVuY3Rpb24gd2l0aCB0aGUgc291cmNlIHZhbHVlLFxuICogd2hpY2ggcmV0dXJucyB0aGUgXCJkdXJhdGlvblwiIE9ic2VydmFibGUuIFdoZW4gdGhlIGR1cmF0aW9uIE9ic2VydmFibGUgZW1pdHMgYVxuICogdmFsdWUgb3IgY29tcGxldGVzLCB0aGUgdGltZXIgaXMgZGlzYWJsZWQsIGFuZCB0aGlzIHByb2Nlc3MgcmVwZWF0cyBmb3IgdGhlXG4gKiBuZXh0IHNvdXJjZSB2YWx1ZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IGNsaWNrcyBhdCBhIHJhdGUgb2YgYXQgbW9zdCBvbmUgY2xpY2sgcGVyIHNlY29uZDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLnRocm90dGxlKGV2ID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBhdWRpdH1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlfVxuICogQHNlZSB7QGxpbmsgZGVsYXlXaGVufVxuICogQHNlZSB7QGxpbmsgc2FtcGxlfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGVUaW1lfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQpOiBTdWJzY3JpYmFibGVPclByb21pc2V9IGR1cmF0aW9uU2VsZWN0b3IgQSBmdW5jdGlvblxuICogdGhhdCByZWNlaXZlcyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBmb3IgY29tcHV0aW5nIHRoZSBzaWxlbmNpbmdcbiAqIGR1cmF0aW9uIGZvciBlYWNoIHNvdXJjZSB2YWx1ZSwgcmV0dXJuZWQgYXMgYW4gT2JzZXJ2YWJsZSBvciBhIFByb21pc2UuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgcGVyZm9ybXMgdGhlIHRocm90dGxlIG9wZXJhdGlvbiB0b1xuICogbGltaXQgdGhlIHJhdGUgb2YgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZS5cbiAqIEBtZXRob2QgdGhyb3R0bGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxudW1iZXI+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFRocm90dGxlT3BlcmF0b3IoZHVyYXRpb25TZWxlY3RvcikpO1xufVxuXG5jbGFzcyBUaHJvdHRsZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgVGhyb3R0bGVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZHVyYXRpb25TZWxlY3RvcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBUaHJvdHRsZVN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuICBwcml2YXRlIHRocm90dGxlZDogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxudW1iZXI+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRocm90dGxlZCkge1xuICAgICAgdGhpcy50cnlEdXJhdGlvblNlbGVjdG9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyeUR1cmF0aW9uU2VsZWN0b3IodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBsZXQgZHVyYXRpb246IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxudW1iZXI+ID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uU2VsZWN0b3IodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVtaXRBbmRUaHJvdHRsZSh2YWx1ZSwgZHVyYXRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0QW5kVGhyb3R0bGUodmFsdWU6IFQsIGR1cmF0aW9uOiBTdWJzY3JpYmFibGVPclByb21pc2U8bnVtYmVyPikge1xuICAgIHRoaXMuYWRkKHRoaXMudGhyb3R0bGVkID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgZHVyYXRpb24pKTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF91bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCB0aHJvdHRsZWQgPSB0aGlzLnRocm90dGxlZDtcbiAgICBpZiAodGhyb3R0bGVkKSB7XG4gICAgICB0aGlzLnJlbW92ZSh0aHJvdHRsZWQpO1xuICAgICAgdGhpcy50aHJvdHRsZWQgPSBudWxsO1xuICAgICAgdGhyb3R0bGVkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19