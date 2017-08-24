"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var async_1 = require("../scheduler/async");
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.dueTime = dueTime;
        _this.scheduler = scheduler;
        _this.debouncedSubscription = null;
        _this.lastValue = null;
        _this.hasValue = false;
        return _this;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVib3VuY2VUaW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVib3VuY2VUaW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTJDO0FBRzNDLDRDQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNHO0FBQ0gsc0JBQXFELE9BQWUsRUFBRSxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLHlCQUE2QjtJQUNqRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFGRCxvQ0FFQztBQUVEO0lBQ0UsOEJBQW9CLE9BQWUsRUFBVSxTQUFxQjtRQUE5QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtJQUNsRSxDQUFDO0lBRUQsbUNBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXdDLDBDQUFhO0lBS25ELGdDQUFZLFdBQTBCLEVBQ2xCLE9BQWUsRUFDZixTQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixhQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBUyxHQUFULFNBQVMsQ0FBWTtRQU5qQywyQkFBcUIsR0FBaUIsSUFBSSxDQUFDO1FBQzNDLGVBQVMsR0FBTSxJQUFJLENBQUM7UUFDcEIsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUFNbEMsQ0FBQztJQUVTLHNDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRVMsMENBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsOENBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFFTyw4Q0FBYSxHQUFyQjtRQUNFLElBQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBRXpELEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25DLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUExQ0QsQ0FBd0MsdUJBQVUsR0EwQ2pEO0FBRUQsc0JBQXNCLFVBQXVDO0lBQzNELFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5cbi8qKlxuICogRW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBvbmx5IGFmdGVyIGEgcGFydGljdWxhciB0aW1lIHNwYW5cbiAqIGhhcyBwYXNzZWQgd2l0aG91dCBhbm90aGVyIHNvdXJjZSBlbWlzc2lvbi5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBkZWxheX0sIGJ1dCBwYXNzZXMgb25seSB0aGUgbW9zdFxuICogcmVjZW50IHZhbHVlIGZyb20gZWFjaCBidXJzdCBvZiBlbWlzc2lvbnMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZGVib3VuY2VUaW1lLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBkZWJvdW5jZVRpbWVgIGRlbGF5cyB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCBkcm9wc1xuICogcHJldmlvdXMgcGVuZGluZyBkZWxheWVkIGVtaXNzaW9ucyBpZiBhIG5ldyB2YWx1ZSBhcnJpdmVzIG9uIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIFRoaXMgb3BlcmF0b3Iga2VlcHMgdHJhY2sgb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlIGZyb20gdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZSwgYW5kIGVtaXRzIHRoYXQgb25seSB3aGVuIGBkdWVUaW1lYCBlbm91Z2ggdGltZSBoYXMgcGFzc2VkXG4gKiB3aXRob3V0IGFueSBvdGhlciB2YWx1ZSBhcHBlYXJpbmcgb24gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiBhIG5ldyB2YWx1ZVxuICogYXBwZWFycyBiZWZvcmUgYGR1ZVRpbWVgIHNpbGVuY2Ugb2NjdXJzLCB0aGUgcHJldmlvdXMgdmFsdWUgd2lsbCBiZSBkcm9wcGVkXG4gKiBhbmQgd2lsbCBub3QgYmUgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogVGhpcyBpcyBhIHJhdGUtbGltaXRpbmcgb3BlcmF0b3IsIGJlY2F1c2UgaXQgaXMgaW1wb3NzaWJsZSBmb3IgbW9yZSB0aGFuIG9uZVxuICogdmFsdWUgdG8gYmUgZW1pdHRlZCBpbiBhbnkgdGltZSB3aW5kb3cgb2YgZHVyYXRpb24gYGR1ZVRpbWVgLCBidXQgaXQgaXMgYWxzb1xuICogYSBkZWxheS1saWtlIG9wZXJhdG9yIHNpbmNlIG91dHB1dCBlbWlzc2lvbnMgZG8gbm90IG9jY3VyIGF0IHRoZSBzYW1lIHRpbWUgYXNcbiAqIHRoZXkgZGlkIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gT3B0aW9uYWxseSB0YWtlcyBhIHtAbGluayBJU2NoZWR1bGVyfSBmb3JcbiAqIG1hbmFnaW5nIHRpbWVycy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBtb3N0IHJlY2VudCBjbGljayBhZnRlciBhIGJ1cnN0IG9mIGNsaWNrczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmRlYm91bmNlVGltZSgxMDAwKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYXVkaXRUaW1lfVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2V9XG4gKiBAc2VlIHtAbGluayBkZWxheX1cbiAqIEBzZWUge0BsaW5rIHNhbXBsZVRpbWV9XG4gKiBAc2VlIHtAbGluayB0aHJvdHRsZVRpbWV9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGR1ZVRpbWUgVGhlIHRpbWVvdXQgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIChvciB0aGUgdGltZVxuICogdW5pdCBkZXRlcm1pbmVkIGludGVybmFsbHkgYnkgdGhlIG9wdGlvbmFsIGBzY2hlZHVsZXJgKSBmb3IgdGhlIHdpbmRvdyBvZlxuICogdGltZSByZXF1aXJlZCB0byB3YWl0IGZvciBlbWlzc2lvbiBzaWxlbmNlIGJlZm9yZSBlbWl0dGluZyB0aGUgbW9zdCByZWNlbnRcbiAqIHNvdXJjZSB2YWx1ZS5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jXSBUaGUge0BsaW5rIElTY2hlZHVsZXJ9IHRvIHVzZSBmb3JcbiAqIG1hbmFnaW5nIHRoZSB0aW1lcnMgdGhhdCBoYW5kbGUgdGhlIHRpbWVvdXQgZm9yIGVhY2ggdmFsdWUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZGVsYXlzIHRoZSBlbWlzc2lvbnMgb2YgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBieSB0aGUgc3BlY2lmaWVkIGBkdWVUaW1lYCwgYW5kIG1heSBkcm9wIHNvbWUgdmFsdWVzIGlmIHRoZXkgb2NjdXJcbiAqIHRvbyBmcmVxdWVudGx5LlxuICogQG1ldGhvZCBkZWJvdW5jZVRpbWVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZVRpbWU8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgZHVlVGltZTogbnVtYmVyLCBzY2hlZHVsZXI6IElTY2hlZHVsZXIgPSBhc3luYyk6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBEZWJvdW5jZVRpbWVPcGVyYXRvcihkdWVUaW1lLCBzY2hlZHVsZXIpKTtcbn1cblxuY2xhc3MgRGVib3VuY2VUaW1lT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHVlVGltZTogbnVtYmVyLCBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBEZWJvdW5jZVRpbWVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZHVlVGltZSwgdGhpcy5zY2hlZHVsZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgRGVib3VuY2VUaW1lU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGRlYm91bmNlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgcHJpdmF0ZSBsYXN0VmFsdWU6IFQgPSBudWxsO1xuICBwcml2YXRlIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZHVlVGltZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMuY2xlYXJEZWJvdW5jZSgpO1xuICAgIHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gICAgdGhpcy5hZGQodGhpcy5kZWJvdW5jZWRTdWJzY3JpcHRpb24gPSB0aGlzLnNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIHRoaXMuZHVlVGltZSwgdGhpcykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICB0aGlzLmRlYm91bmNlZE5leHQoKTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBkZWJvdW5jZWROZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJEZWJvdW5jZSgpO1xuXG4gICAgaWYgKHRoaXMuaGFzVmFsdWUpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh0aGlzLmxhc3RWYWx1ZSk7XG4gICAgICB0aGlzLmxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckRlYm91bmNlKCk6IHZvaWQge1xuICAgIGNvbnN0IGRlYm91bmNlZFN1YnNjcmlwdGlvbiA9IHRoaXMuZGVib3VuY2VkU3Vic2NyaXB0aW9uO1xuXG4gICAgaWYgKGRlYm91bmNlZFN1YnNjcmlwdGlvbiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZW1vdmUoZGVib3VuY2VkU3Vic2NyaXB0aW9uKTtcbiAgICAgIGRlYm91bmNlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5kZWJvdW5jZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaE5leHQoc3Vic2NyaWJlcjogRGVib3VuY2VUaW1lU3Vic2NyaWJlcjxhbnk+KSB7XG4gIHN1YnNjcmliZXIuZGVib3VuY2VkTmV4dCgpO1xufVxuIl19