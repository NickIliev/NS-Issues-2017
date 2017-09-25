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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUMzQyx5Q0FBd0M7QUFHeEMsNENBQTJDO0FBRTNDLGdEQUErQztBQUsvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFDSCxlQUE4QyxLQUFrQixFQUN2QyxTQUE2QjtJQUE3QiwwQkFBQSxFQUFBLFlBQXdCLGFBQUs7SUFDcEQsSUFBTSxhQUFhLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLElBQU0sUUFBUSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQVMsS0FBSyxDQUFDLENBQUM7SUFDdEYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUxELHNCQUtDO0FBRUQ7SUFDRSx1QkFBb0IsS0FBYSxFQUNiLFNBQXFCO1FBRHJCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQ3pDLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUUQ7Ozs7R0FJRztBQUNIO0lBQWlDLG1DQUFhO0lBdUI1Qyx5QkFBWSxXQUEwQixFQUNsQixLQUFhLEVBQ2IsU0FBcUI7UUFGekMsWUFHRSxrQkFBTSxXQUFXLENBQUMs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SUFDOUIsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLDJCQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBL0RELENBQWlDLHVCQUFVLEdBK0QxQztBQUVEO0lBQ0Usc0JBQTRCLElBQVksRUFDWixZQUE2QjtRQUQ3QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osaUJBQVksR0FBWixZQUFZLENBQWlCO0lBQ3pELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFKRCxJQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSAnLi4vdXRpbC9pc0RhdGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uL3NjaGVkdWxlci9BY3Rpb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhcnRpYWxPYnNlcnZlciB9IGZyb20gJy4uL09ic2VydmVyJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIERlbGF5cyB0aGUgZW1pc3Npb24gb2YgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgYSBnaXZlbiB0aW1lb3V0IG9yXG4gKiB1bnRpbCBhIGdpdmVuIERhdGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlRpbWUgc2hpZnRzIGVhY2ggaXRlbSBieSBzb21lIHNwZWNpZmllZCBhbW91bnQgb2ZcbiAqIG1pbGxpc2Vjb25kcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWxheS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBJZiB0aGUgZGVsYXkgYXJndW1lbnQgaXMgYSBOdW1iZXIsIHRoaXMgb3BlcmF0b3IgdGltZSBzaGlmdHMgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBieSB0aGF0IGFtb3VudCBvZiB0aW1lIGV4cHJlc3NlZCBpbiBtaWxsaXNlY29uZHMuIFRoZSByZWxhdGl2ZVxuICogdGltZSBpbnRlcnZhbHMgYmV0d2VlbiB0aGUgdmFsdWVzIGFyZSBwcmVzZXJ2ZWQuXG4gKlxuICogSWYgdGhlIGRlbGF5IGFyZ3VtZW50IGlzIGEgRGF0ZSwgdGhpcyBvcGVyYXRvciB0aW1lIHNoaWZ0cyB0aGUgc3RhcnQgb2YgdGhlXG4gKiBPYnNlcnZhYmxlIGV4ZWN1dGlvbiB1bnRpbCB0aGUgZ2l2ZW4gZGF0ZSBvY2N1cnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RGVsYXkgZWFjaCBjbGljayBieSBvbmUgc2Vjb25kPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5KDEwMDApOyAvLyBlYWNoIGNsaWNrIGVtaXR0ZWQgYWZ0ZXIgMSBzZWNvbmRcbiAqIGRlbGF5ZWRDbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkRlbGF5IGFsbCBjbGlja3MgdW50aWwgYSBmdXR1cmUgZGF0ZSBoYXBwZW5zPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkYXRlID0gbmV3IERhdGUoJ01hcmNoIDE1LCAyMDUwIDEyOjAwOjAwJyk7IC8vIGluIHRoZSBmdXR1cmVcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5KGRhdGUpOyAvLyBjbGljayBlbWl0dGVkIG9ubHkgYWZ0ZXIgdGhhdCBkYXRlXG4gKiBkZWxheWVkQ2xpY2tzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZVRpbWV9XG4gKiBAc2VlIHtAbGluayBkZWxheVdoZW59XG4gKlxuICogQHBhcmFtIHtudW1iZXJ8RGF0ZX0gZGVsYXkgVGhlIGRlbGF5IGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoYSBgbnVtYmVyYCkgb3JcbiAqIGEgYERhdGVgIHVudGlsIHdoaWNoIHRoZSBlbWlzc2lvbiBvZiB0aGUgc291cmNlIGl0ZW1zIGlzIGRlbGF5ZWQuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIElTY2hlZHVsZXIgdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgdGltZS1zaGlmdCBmb3IgZWFjaCBpdGVtLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgdGhlIHNwZWNpZmllZCB0aW1lb3V0IG9yIERhdGUuXG4gKiBAbWV0aG9kIGRlbGF5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXk8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgZGVsYXk6IG51bWJlcnxEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcjogSVNjaGVkdWxlciA9IGFzeW5jKTogT2JzZXJ2YWJsZTxUPiB7XG4gIGNvbnN0IGFic29sdXRlRGVsYXkgPSBpc0RhdGUoZGVsYXkpO1xuICBjb25zdCBkZWxheUZvciA9IGFic29sdXRlRGVsYXkgPyAoK2RlbGF5IC0gc2NoZWR1bGVyLm5vdygpKSA6IE1hdGguYWJzKDxudW1iZXI+ZGVsYXkpO1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBEZWxheU9wZXJhdG9yKGRlbGF5Rm9yLCBzY2hlZHVsZXIpKTtcbn1cblxuY2xhc3MgRGVsYXlPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxheTogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBEZWxheVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kZWxheSwgdGhpcy5zY2hlZHVsZXIpKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGVsYXlTdGF0ZTxUPiB7XG4gIHNvdXJjZTogRGVsYXlTdWJzY3JpYmVyPFQ+O1xuICBkZXN0aW5hdGlvbjogUGFydGlhbE9ic2VydmVyPFQ+O1xuICBzY2hlZHVsZXI6IElTY2hlZHVsZXI7XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBEZWxheVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBxdWV1ZTogQXJyYXk8RGVsYXlNZXNzYWdlPFQ+PiA9IFtdO1xuICBwcml2YXRlIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGVycm9yZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIHN0YXRpYyBkaXNwYXRjaDxUPih0aGlzOiBBY3Rpb248RGVsYXlTdGF0ZTxUPj4sIHN0YXRlOiBEZWxheVN0YXRlPFQ+KTogdm9pZCB7XG4gICAgY29uc3Qgc291cmNlID0gc3RhdGUuc291cmNlO1xuICAgIGNvbnN0IHF1ZXVlID0gc291cmNlLnF1ZXVlO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHN0YXRlLnNjaGVkdWxlcjtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHN0YXRlLmRlc3RpbmF0aW9uO1xuXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDAgJiYgKHF1ZXVlWzBdLnRpbWUgLSBzY2hlZHVsZXIubm93KCkpIDw9IDApIHtcbiAgICAgIHF1ZXVlLnNoaWZ0KCkubm90aWZpY2F0aW9uLm9ic2VydmUoZGVzdGluYXRpb24pO1xuICAgIH1cblxuICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkZWxheSA9IE1hdGgubWF4KDAsIHF1ZXVlWzBdLnRpbWUgLSBzY2hlZHVsZXIubm93KCkpO1xuICAgICAgdGhpcy5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3VyY2UuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGVsYXk6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcml2YXRlIF9zY2hlZHVsZShzY2hlZHVsZXI6IElTY2hlZHVsZXIpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlPERlbGF5U3RhdGU8VD4+KERlbGF5U3Vic2NyaWJlci5kaXNwYXRjaCwgdGhpcy5kZWxheSwge1xuICAgICAgc291cmNlOiB0aGlzLCBkZXN0aW5hdGlvbjogdGhpcy5kZXN0aW5hdGlvbiwgc2NoZWR1bGVyOiBzY2hlZHVsZXJcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIHNjaGVkdWxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uPFQ+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXJyb3JlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgRGVsYXlNZXNzYWdlKHNjaGVkdWxlci5ub3coKSArIHRoaXMuZGVsYXksIG5vdGlmaWNhdGlvbik7XG4gICAgdGhpcy5xdWV1ZS5wdXNoKG1lc3NhZ2UpO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5fc2NoZWR1bGUoc2NoZWR1bGVyKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICB0aGlzLnNjaGVkdWxlTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbi5jcmVhdGVOZXh0KHZhbHVlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy5lcnJvcmVkID0gdHJ1ZTtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICB0aGlzLnNjaGVkdWxlTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBEZWxheU1lc3NhZ2U8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdGltZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb248VD4pIHtcbiAgfVxufVxuIl19