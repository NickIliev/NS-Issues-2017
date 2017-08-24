"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("../scheduler/async");
var isDate_1 = require("../util/isDate");
var Subscriber_1 = require("../Subscriber");
var Notification_1 = require("../Notification");
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The IScheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
}
exports.delay = delay;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelaySubscriber = (function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.delay = delay;
        _this.scheduler = scheduler;
        _this.queue = [];
        _this.active = false;
        _this.errored = false;
        return _this;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_1.Subscriber));
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUMzQyx5Q0FBd0M7QUFHeEMsNENBQTJDO0FBRTNDLGdEQUErQztBQUsvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFDSCxlQUE4QyxLQUFrQixFQUN2QyxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLHlCQUE2QjtJQUNwRCxJQUFNLGFBQWEsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsSUFBTSxRQUFRLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBUyxLQUFLLENBQUMsQ0FBQztJQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBTEQsc0JBS0M7QUFFRDtJQUNFLHVCQUFvQixLQUFhLEVBQ2IsU0FBcUI7UUFEckIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDekMsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFRRDs7OztHQUlHO0FBQ0g7SUFBaUMsbUNBQWE7SUF1QjVDLHlCQUFZLFdBQTBCLEVBQ2xCLEtBQWEsRUFDYixTQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNu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QixDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsMkJBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEvREQsQ0FBaUMsdUJBQVUsR0ErRDFDO0FBRUQ7SUFDRSxzQkFBNEIsSUFBWSxFQUNaLFlBQTZCO1FBRDdCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7SUFDekQsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQUpELElBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBpc0RhdGUgfSBmcm9tICcuLi91dGlsL2lzRGF0ZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vc2NoZWR1bGVyL0FjdGlvbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuLi9Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFydGlhbE9ic2VydmVyIH0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogRGVsYXlzIHRoZSBlbWlzc2lvbiBvZiBpdGVtcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBhIGdpdmVuIHRpbWVvdXQgb3JcbiAqIHVudGlsIGEgZ2l2ZW4gRGF0ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VGltZSBzaGlmdHMgZWFjaCBpdGVtIGJ5IHNvbWUgc3BlY2lmaWVkIGFtb3VudCBvZlxuICogbWlsbGlzZWNvbmRzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2RlbGF5LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIElmIHRoZSBkZWxheSBhcmd1bWVudCBpcyBhIE51bWJlciwgdGhpcyBvcGVyYXRvciB0aW1lIHNoaWZ0cyB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGJ5IHRoYXQgYW1vdW50IG9mIHRpbWUgZXhwcmVzc2VkIGluIG1pbGxpc2Vjb25kcy4gVGhlIHJlbGF0aXZlXG4gKiB0aW1lIGludGVydmFscyBiZXR3ZWVuIHRoZSB2YWx1ZXMgYXJlIHByZXNlcnZlZC5cbiAqXG4gKiBJZiB0aGUgZGVsYXkgYXJndW1lbnQgaXMgYSBEYXRlLCB0aGlzIG9wZXJhdG9yIHRpbWUgc2hpZnRzIHRoZSBzdGFydCBvZiB0aGVcbiAqIE9ic2VydmFibGUgZXhlY3V0aW9uIHVudGlsIHRoZSBnaXZlbiBkYXRlIG9jY3Vycy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5EZWxheSBlYWNoIGNsaWNrIGJ5IG9uZSBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGRlbGF5ZWRDbGlja3MgPSBjbGlja3MuZGVsYXkoMTAwMCk7IC8vIGVhY2ggY2xpY2sgZW1pdHRlZCBhZnRlciAxIHNlY29uZFxuICogZGVsYXllZENsaWNrcy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RGVsYXkgYWxsIGNsaWNrcyB1bnRpbCBhIGZ1dHVyZSBkYXRlIGhhcHBlbnM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGRhdGUgPSBuZXcgRGF0ZSgnTWFyY2ggMTUsIDIwNTAgMTI6MDA6MDAnKTsgLy8gaW4gdGhlIGZ1dHVyZVxuICogdmFyIGRlbGF5ZWRDbGlja3MgPSBjbGlja3MuZGVsYXkoZGF0ZSk7IC8vIGNsaWNrIGVtaXR0ZWQgb25seSBhZnRlciB0aGF0IGRhdGVcbiAqIGRlbGF5ZWRDbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5V2hlbn1cbiAqXG4gKiBAcGFyYW0ge251bWJlcnxEYXRlfSBkZWxheSBUaGUgZGVsYXkgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIChhIGBudW1iZXJgKSBvclxuICogYSBgRGF0ZWAgdW50aWwgd2hpY2ggdGhlIGVtaXNzaW9uIG9mIHRoZSBzb3VyY2UgaXRlbXMgaXMgZGVsYXllZC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jXSBUaGUgSVNjaGVkdWxlciB0byB1c2UgZm9yXG4gKiBtYW5hZ2luZyB0aGUgdGltZXJzIHRoYXQgaGFuZGxlIHRoZSB0aW1lLXNoaWZ0IGZvciBlYWNoIGl0ZW0uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZGVsYXlzIHRoZSBlbWlzc2lvbnMgb2YgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBieSB0aGUgc3BlY2lmaWVkIHRpbWVvdXQgb3IgRGF0ZS5cbiAqIEBtZXRob2QgZGVsYXlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxheTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBkZWxheTogbnVtYmVyfERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgY29uc3QgYWJzb2x1dGVEZWxheSA9IGlzRGF0ZShkZWxheSk7XG4gIGNvbnN0IGRlbGF5Rm9yID0gYWJzb2x1dGVEZWxheSA/ICgrZGVsYXkgLSBzY2hlZHVsZXIubm93KCkpIDogTWF0aC5hYnMoPG51bWJlcj5kZWxheSk7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IERlbGF5T3BlcmF0b3IoZGVsYXlGb3IsIHNjaGVkdWxlcikpO1xufVxuXG5jbGFzcyBEZWxheU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlbGF5OiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IERlbGF5U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmRlbGF5LCB0aGlzLnNjaGVkdWxlcikpO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWxheVN0YXRlPFQ+IHtcbiAgc291cmNlOiBEZWxheVN1YnNjcmliZXI8VD47XG4gIGRlc3RpbmF0aW9uOiBQYXJ0aWFsT2JzZXJ2ZXI8VD47XG4gIHNjaGVkdWxlcjogSVNjaGVkdWxlcjtcbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIERlbGF5U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIHF1ZXVlOiBBcnJheTxEZWxheU1lc3NhZ2U8VD4+ID0gW107XG4gIHByaXZhdGUgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZXJyb3JlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3RhdGljIGRpc3BhdGNoPFQ+KHRoaXM6IEFjdGlvbjxEZWxheVN0YXRlPFQ+Piwgc3RhdGU6IERlbGF5U3RhdGU8VD4pOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2UgPSBzdGF0ZS5zb3VyY2U7XG4gICAgY29uc3QgcXVldWUgPSBzb3VyY2UucXVldWU7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gc3RhdGUuc2NoZWR1bGVyO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gc3RhdGUuZGVzdGluYXRpb247XG5cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCAmJiAocXVldWVbMF0udGltZSAtIHNjaGVkdWxlci5ub3coKSkgPD0gMCkge1xuICAgICAgcXVldWUuc2hpZnQoKS5ub3RpZmljYXRpb24ub2JzZXJ2ZShkZXN0aW5hdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGRlbGF5ID0gTWF0aC5tYXgoMCwgcXVldWVbMF0udGltZSAtIHNjaGVkdWxlci5ub3coKSk7XG4gICAgICB0aGlzLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvdXJjZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkZWxheTogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NjaGVkdWxlKHNjaGVkdWxlcjogSVNjaGVkdWxlcik6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmFkZChzY2hlZHVsZXIuc2NoZWR1bGU8RGVsYXlTdGF0ZTxUPj4oRGVsYXlTdWJzY3JpYmVyLmRpc3BhdGNoLCB0aGlzLmRlbGF5LCB7XG4gICAgICBzb3VyY2U6IHRoaXMsIGRlc3RpbmF0aW9uOiB0aGlzLmRlc3RpbmF0aW9uLCBzY2hlZHVsZXI6IHNjaGVkdWxlclxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb248VD4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lcnJvcmVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBEZWxheU1lc3NhZ2Uoc2NoZWR1bGVyLm5vdygpICsgdGhpcy5kZWxheSwgbm90aWZpY2F0aW9uKTtcbiAgICB0aGlzLnF1ZXVlLnB1c2gobWVzc2FnZSk7XG5cbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9zY2hlZHVsZShzY2hlZHVsZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMuc2NoZWR1bGVOb3RpZmljYXRpb24oTm90aWZpY2F0aW9uLmNyZWF0ZU5leHQodmFsdWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpIHtcbiAgICB0aGlzLmVycm9yZWQgPSB0cnVlO1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIHRoaXMuc2NoZWR1bGVOb3RpZmljYXRpb24oTm90aWZpY2F0aW9uLmNyZWF0ZUNvbXBsZXRlKCkpO1xuICB9XG59XG5cbmNsYXNzIERlbGF5TWVzc2FnZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0aW1lOiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjxUPikge1xuICB9XG59XG4iXX0=