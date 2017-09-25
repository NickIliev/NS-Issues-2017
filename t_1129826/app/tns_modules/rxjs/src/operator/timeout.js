"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("../scheduler/async");
var isDate_1 = require("../util/isDate");
var Subscriber_1 = require("../Subscriber");
var TimeoutError_1 = require("../util/TimeoutError");
/**
 *
 * Errors if Observable does not emit a value in given time span.
 *
 * <span class="informal">Timeouts on Observable that doesn't emit values fast enough.</span>
 *
 * <img src="./img/timeout.png" width="100%">
 *
 * `timeout` operator accepts as an argument either a number or a Date.
 *
 * If number was provided, it returns an Observable that behaves like a source
 * Observable, unless there is a period of time where there is no value emitted.
 * So if you provide `100` as argument and first value comes after 50ms from
 * the moment of subscription, this value will be simply re-emitted by the resulting
 * Observable. If however after that 100ms passes without a second value being emitted,
 * stream will end with an error and source Observable will be unsubscribed.
 * These checks are performed throughout whole lifecycle of Observable - from the moment
 * it was subscribed to, until it completes or errors itself. Thus every value must be
 * emitted within specified period since previous value.
 *
 * If provided argument was Date, returned Observable behaves differently. It throws
 * if Observable did not complete before provided Date. This means that periods between
 * emission of particular values do not matter in this case. If Observable did not complete
 * before provided Date, source Observable will be unsubscribed. Other than that, resulting
 * stream behaves just as source Observable.
 *
 * `timeout` accepts also a Scheduler as a second parameter. It is used to schedule moment (or moments)
 * when returned Observable will check if source stream emitted value or completed.
 *
 * @example <caption>Check if ticks are emitted within certain timespan</caption>
 * const seconds = Rx.Observable.interval(1000);
 *
 * seconds.timeout(1100) // Let's use bigger timespan to be safe,
 *                       // since `interval` might fire a bit later then scheduled.
 * .subscribe(
 *     value => console.log(value), // Will emit numbers just as regular `interval` would.
 *     err => console.log(err) // Will never be called.
 * );
 *
 * seconds.timeout(900).subscribe(
 *     value => console.log(value), // Will never be called.
 *     err => console.log(err) // Will emit error before even first value is emitted,
 *                             // since it did not arrive within 900ms period.
 * );
 *
 * @example <caption>Use Date to check if Observable completed</caption>
 * const seconds = Rx.Observable.interval(1000);
 *
 * seconds.timeout(new Date("December 17, 2020 03:24:00"))
 * .subscribe(
 *     value => console.log(value), // Will emit values as regular `interval` would
 *                                  // until December 17, 2020 at 03:24:00.
 *     err => console.log(err) // On December 17, 2020 at 03:24:00 it will emit an error,
 *                             // since Observable did not complete by then.
 * );
 *
 * @see {@link timeoutWith}
 *
 * @param {number|Date} due Number specifying period within which Observable must emit values
 *                          or Date specifying before when Observable should complete
 * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
 * @return {Observable<T>} Observable that mirrors behaviour of source, unless timeout checks fail.
 * @method timeout
 * @owner Observable
 */
function timeout(due, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError_1.TimeoutError()));
}
exports.timeout = timeout;
var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
    }
    TimeoutOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
    };
    return TimeoutOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeoutSubscriber = (function (_super) {
    __extends(TimeoutSubscriber, _super);
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
        var _this = _super.call(this, destination) || this;
        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.scheduler = scheduler;
        _this.errorInstance = errorInstance;
        _this.action = null;
        _this.scheduleTimeout();
        return _this;
    }
    TimeoutSubscriber.dispatchTimeout = function (subscriber) {
        subscriber.error(subscriber.errorInstance);
    };
    TimeoutSubscriber.prototype.scheduleTimeout = function () {
        var action = this.action;
        if (action) {
            // Recycle the action if we've already scheduled one. All the production
            // Scheduler Actions mutate their state/delay time and return themeselves.
            // VirtualActions are immutable, so they create and return a clone. In this
            // case, we need to set the action reference to the most recent VirtualAction,
            // to ensure that's the one we clone from next time.
            this.action = action.schedule(this, this.waitFor);
        }
        else {
            this.add(this.action = this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, this));
        }
    };
    TimeoutSubscriber.prototype._next = function (value) {
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
        _super.prototype._next.call(this, value);
    };
    TimeoutSubscriber.prototype._unsubscribe = function () {
        this.action = null;
        this.scheduler = null;
        this.errorInstance = null;
    };
    return TimeoutSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBMkM7QUFDM0MseUNBQXdDO0FBRXhDLDRDQUEyQztBQUkzQyxxREFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRUc7QUFDSCxpQkFDMkIsR0FBa0IsRUFDbEIsU0FBNkI7SUFBN0IsMEJBQUEsRUFBQSxZQUF3QixhQUFLO0lBQ3RELElBQU0sZUFBZSxHQUFHLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxJQUFNLE9BQU8sR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLElBQUksMkJBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRyxDQUFDO0FBTkQsMEJBTUM7QUFFRDtJQUNFLHlCQUFvQixPQUFlLEVBQ2YsZUFBd0IsRUFDeEIsU0FBcUIsRUFDckIsYUFBMkI7UUFIM0IsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFDckIsa0JBQWEsR0FBYixhQUFhLENBQWM7SUFDL0MsQ0FBQztJQUVELDhCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxpQkFBaUIsQ0FDM0MsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQ25GLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQW1DLHFDQUFhO0lBSTlDLDJCQUFZLFdBQTBCLEVBQ2xCLGVBQXdCLEVBQ3hCLE9BQWUsRUFDZixTQUFxQixFQUNyQixhQUEyQjtRQUovQyxZQUtFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQU5tQixxQkFBZSxHQUFmLGVBQWUsQ0FBUztRQUN4QixhQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBUyxHQUFULFNBQVMsQ0FBWTtRQUNyQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQU52QyxZQUFNLEdBQWlDLElBQUksQ0FBQztRQVFsRCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O0lBQ3pCLENBQUM7SUFFYyxpQ0FBZSxHQUE5QixVQUFrQyxVQUFnQztRQUNoRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sMkNBQWUsR0FBdkI7UUFDVSxJQUFBLG9CQUFNLENBQVU7UUFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLHdFQUF3RTtZQUN4RSwwRUFBMEU7WUFDMUUsMkVBQTJFO1lBQzNFLDhFQUE4RTtZQUM5RSxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBbUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQ3JGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBbUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQzVFLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FDckQsQ0FBQyxDQUFDO1FBQ04sQ0FBQztJQUNILENBQUM7SUFFUyxpQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELGlCQUFNLEtBQUssWUFBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRVMsd0NBQVksR0FBdEI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBN0NELENBQW1DLHVCQUFVLEdBNkM1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uL3NjaGVkdWxlci9BY3Rpb24nO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSAnLi4vdXRpbC9pc0RhdGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgVGltZW91dEVycm9yIH0gZnJvbSAnLi4vdXRpbC9UaW1lb3V0RXJyb3InO1xuXG4vKipcbiAqXG4gKiBFcnJvcnMgaWYgT2JzZXJ2YWJsZSBkb2VzIG5vdCBlbWl0IGEgdmFsdWUgaW4gZ2l2ZW4gdGltZSBzcGFuLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5UaW1lb3V0cyBvbiBPYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBlbWl0IHZhbHVlcyBmYXN0IGVub3VnaC48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy90aW1lb3V0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGB0aW1lb3V0YCBvcGVyYXRvciBhY2NlcHRzIGFzIGFuIGFyZ3VtZW50IGVpdGhlciBhIG51bWJlciBvciBhIERhdGUuXG4gKlxuICogSWYgbnVtYmVyIHdhcyBwcm92aWRlZCwgaXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgYmVoYXZlcyBsaWtlIGEgc291cmNlXG4gKiBPYnNlcnZhYmxlLCB1bmxlc3MgdGhlcmUgaXMgYSBwZXJpb2Qgb2YgdGltZSB3aGVyZSB0aGVyZSBpcyBubyB2YWx1ZSBlbWl0dGVkLlxuICogU28gaWYgeW91IHByb3ZpZGUgYDEwMGAgYXMgYXJndW1lbnQgYW5kIGZpcnN0IHZhbHVlIGNvbWVzIGFmdGVyIDUwbXMgZnJvbVxuICogdGhlIG1vbWVudCBvZiBzdWJzY3JpcHRpb24sIHRoaXMgdmFsdWUgd2lsbCBiZSBzaW1wbHkgcmUtZW1pdHRlZCBieSB0aGUgcmVzdWx0aW5nXG4gKiBPYnNlcnZhYmxlLiBJZiBob3dldmVyIGFmdGVyIHRoYXQgMTAwbXMgcGFzc2VzIHdpdGhvdXQgYSBzZWNvbmQgdmFsdWUgYmVpbmcgZW1pdHRlZCxcbiAqIHN0cmVhbSB3aWxsIGVuZCB3aXRoIGFuIGVycm9yIGFuZCBzb3VyY2UgT2JzZXJ2YWJsZSB3aWxsIGJlIHVuc3Vic2NyaWJlZC5cbiAqIFRoZXNlIGNoZWNrcyBhcmUgcGVyZm9ybWVkIHRocm91Z2hvdXQgd2hvbGUgbGlmZWN5Y2xlIG9mIE9ic2VydmFibGUgLSBmcm9tIHRoZSBtb21lbnRcbiAqIGl0IHdhcyBzdWJzY3JpYmVkIHRvLCB1bnRpbCBpdCBjb21wbGV0ZXMgb3IgZXJyb3JzIGl0c2VsZi4gVGh1cyBldmVyeSB2YWx1ZSBtdXN0IGJlXG4gKiBlbWl0dGVkIHdpdGhpbiBzcGVjaWZpZWQgcGVyaW9kIHNpbmNlIHByZXZpb3VzIHZhbHVlLlxuICpcbiAqIElmIHByb3ZpZGVkIGFyZ3VtZW50IHdhcyBEYXRlLCByZXR1cm5lZCBPYnNlcnZhYmxlIGJlaGF2ZXMgZGlmZmVyZW50bHkuIEl0IHRocm93c1xuICogaWYgT2JzZXJ2YWJsZSBkaWQgbm90IGNvbXBsZXRlIGJlZm9yZSBwcm92aWRlZCBEYXRlLiBUaGlzIG1lYW5zIHRoYXQgcGVyaW9kcyBiZXR3ZWVuXG4gKiBlbWlzc2lvbiBvZiBwYXJ0aWN1bGFyIHZhbHVlcyBkbyBub3QgbWF0dGVyIGluIHRoaXMgY2FzZS4gSWYgT2JzZXJ2YWJsZSBkaWQgbm90IGNvbXBsZXRlXG4gKiBiZWZvcmUgcHJvdmlkZWQgRGF0ZSwgc291cmNlIE9ic2VydmFibGUgd2lsbCBiZSB1bnN1YnNjcmliZWQuIE90aGVyIHRoYW4gdGhhdCwgcmVzdWx0aW5nXG4gKiBzdHJlYW0gYmVoYXZlcyBqdXN0IGFzIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIGB0aW1lb3V0YCBhY2NlcHRzIGFsc28gYSBTY2hlZHVsZXIgYXMgYSBzZWNvbmQgcGFyYW1ldGVyLiBJdCBpcyB1c2VkIHRvIHNjaGVkdWxlIG1vbWVudCAob3IgbW9tZW50cylcbiAqIHdoZW4gcmV0dXJuZWQgT2JzZXJ2YWJsZSB3aWxsIGNoZWNrIGlmIHNvdXJjZSBzdHJlYW0gZW1pdHRlZCB2YWx1ZSBvciBjb21wbGV0ZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q2hlY2sgaWYgdGlja3MgYXJlIGVtaXR0ZWQgd2l0aGluIGNlcnRhaW4gdGltZXNwYW48L2NhcHRpb24+XG4gKiBjb25zdCBzZWNvbmRzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqXG4gKiBzZWNvbmRzLnRpbWVvdXQoMTEwMCkgLy8gTGV0J3MgdXNlIGJpZ2dlciB0aW1lc3BhbiB0byBiZSBzYWZlLFxuICogICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGBpbnRlcnZhbGAgbWlnaHQgZmlyZSBhIGJpdCBsYXRlciB0aGVuIHNjaGVkdWxlZC5cbiAqIC5zdWJzY3JpYmUoXG4gKiAgICAgdmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpLCAvLyBXaWxsIGVtaXQgbnVtYmVycyBqdXN0IGFzIHJlZ3VsYXIgYGludGVydmFsYCB3b3VsZC5cbiAqICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSAvLyBXaWxsIG5ldmVyIGJlIGNhbGxlZC5cbiAqICk7XG4gKlxuICogc2Vjb25kcy50aW1lb3V0KDkwMCkuc3Vic2NyaWJlKFxuICogICAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSwgLy8gV2lsbCBuZXZlciBiZSBjYWxsZWQuXG4gKiAgICAgZXJyID0+IGNvbnNvbGUubG9nKGVycikgLy8gV2lsbCBlbWl0IGVycm9yIGJlZm9yZSBldmVuIGZpcnN0IHZhbHVlIGlzIGVtaXR0ZWQsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2luY2UgaXQgZGlkIG5vdCBhcnJpdmUgd2l0aGluIDkwMG1zIHBlcmlvZC5cbiAqICk7XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIERhdGUgdG8gY2hlY2sgaWYgT2JzZXJ2YWJsZSBjb21wbGV0ZWQ8L2NhcHRpb24+XG4gKiBjb25zdCBzZWNvbmRzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqXG4gKiBzZWNvbmRzLnRpbWVvdXQobmV3IERhdGUoXCJEZWNlbWJlciAxNywgMjAyMCAwMzoyNDowMFwiKSlcbiAqIC5zdWJzY3JpYmUoXG4gKiAgICAgdmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpLCAvLyBXaWxsIGVtaXQgdmFsdWVzIGFzIHJlZ3VsYXIgYGludGVydmFsYCB3b3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW50aWwgRGVjZW1iZXIgMTcsIDIwMjAgYXQgMDM6MjQ6MDAuXG4gKiAgICAgZXJyID0+IGNvbnNvbGUubG9nKGVycikgLy8gT24gRGVjZW1iZXIgMTcsIDIwMjAgYXQgMDM6MjQ6MDAgaXQgd2lsbCBlbWl0IGFuIGVycm9yLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIE9ic2VydmFibGUgZGlkIG5vdCBjb21wbGV0ZSBieSB0aGVuLlxuICogKTtcbiAqXG4gKiBAc2VlIHtAbGluayB0aW1lb3V0V2l0aH1cbiAqXG4gKiBAcGFyYW0ge251bWJlcnxEYXRlfSBkdWUgTnVtYmVyIHNwZWNpZnlpbmcgcGVyaW9kIHdpdGhpbiB3aGljaCBPYnNlcnZhYmxlIG11c3QgZW1pdCB2YWx1ZXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBvciBEYXRlIHNwZWNpZnlpbmcgYmVmb3JlIHdoZW4gT2JzZXJ2YWJsZSBzaG91bGQgY29tcGxldGVcbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBTY2hlZHVsZXIgY29udHJvbGxpbmcgd2hlbiB0aW1lb3V0IGNoZWNrcyBvY2N1ci5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIGJlaGF2aW91ciBvZiBzb3VyY2UsIHVubGVzcyB0aW1lb3V0IGNoZWNrcyBmYWlsLlxuICogQG1ldGhvZCB0aW1lb3V0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZW91dDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlOiBudW1iZXIgfCBEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgY29uc3QgYWJzb2x1dGVUaW1lb3V0ID0gaXNEYXRlKGR1ZSk7XG4gIGNvbnN0IHdhaXRGb3IgPSBhYnNvbHV0ZVRpbWVvdXQgPyAoK2R1ZSAtIHNjaGVkdWxlci5ub3coKSkgOiBNYXRoLmFicyg8bnVtYmVyPmR1ZSk7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFRpbWVvdXRPcGVyYXRvcih3YWl0Rm9yLCBhYnNvbHV0ZVRpbWVvdXQsIHNjaGVkdWxlciwgbmV3IFRpbWVvdXRFcnJvcigpKSk7XG59XG5cbmNsYXNzIFRpbWVvdXRPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3YWl0Rm9yOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgYWJzb2x1dGVUaW1lb3V0OiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlcnJvckluc3RhbmNlOiBUaW1lb3V0RXJyb3IpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgVGltZW91dFN1YnNjcmliZXI8VD4oXG4gICAgICBzdWJzY3JpYmVyLCB0aGlzLmFic29sdXRlVGltZW91dCwgdGhpcy53YWl0Rm9yLCB0aGlzLnNjaGVkdWxlciwgdGhpcy5lcnJvckluc3RhbmNlXG4gICAgKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFRpbWVvdXRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgcHJpdmF0ZSBhY3Rpb246IEFjdGlvbjxUaW1lb3V0U3Vic2NyaWJlcjxUPj4gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGFic29sdXRlVGltZW91dDogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB3YWl0Rm9yOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVycm9ySW5zdGFuY2U6IFRpbWVvdXRFcnJvcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLnNjaGVkdWxlVGltZW91dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGlzcGF0Y2hUaW1lb3V0PFQ+KHN1YnNjcmliZXI6IFRpbWVvdXRTdWJzY3JpYmVyPFQ+KTogdm9pZCB7XG4gICAgc3Vic2NyaWJlci5lcnJvcihzdWJzY3JpYmVyLmVycm9ySW5zdGFuY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBzY2hlZHVsZVRpbWVvdXQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBhY3Rpb24gfSA9IHRoaXM7XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgLy8gUmVjeWNsZSB0aGUgYWN0aW9uIGlmIHdlJ3ZlIGFscmVhZHkgc2NoZWR1bGVkIG9uZS4gQWxsIHRoZSBwcm9kdWN0aW9uXG4gICAgICAvLyBTY2hlZHVsZXIgQWN0aW9ucyBtdXRhdGUgdGhlaXIgc3RhdGUvZGVsYXkgdGltZSBhbmQgcmV0dXJuIHRoZW1lc2VsdmVzLlxuICAgICAgLy8gVmlydHVhbEFjdGlvbnMgYXJlIGltbXV0YWJsZSwgc28gdGhleSBjcmVhdGUgYW5kIHJldHVybiBhIGNsb25lLiBJbiB0aGlzXG4gICAgICAvLyBjYXNlLCB3ZSBuZWVkIHRvIHNldCB0aGUgYWN0aW9uIHJlZmVyZW5jZSB0byB0aGUgbW9zdCByZWNlbnQgVmlydHVhbEFjdGlvbixcbiAgICAgIC8vIHRvIGVuc3VyZSB0aGF0J3MgdGhlIG9uZSB3ZSBjbG9uZSBmcm9tIG5leHQgdGltZS5cbiAgICAgIHRoaXMuYWN0aW9uID0gKDxBY3Rpb248VGltZW91dFN1YnNjcmliZXI8VD4+PiBhY3Rpb24uc2NoZWR1bGUodGhpcywgdGhpcy53YWl0Rm9yKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKHRoaXMuYWN0aW9uID0gKDxBY3Rpb248VGltZW91dFN1YnNjcmliZXI8VD4+PiB0aGlzLnNjaGVkdWxlci5zY2hlZHVsZShcbiAgICAgICAgVGltZW91dFN1YnNjcmliZXIuZGlzcGF0Y2hUaW1lb3V0LCB0aGlzLndhaXRGb3IsIHRoaXNcbiAgICAgICkpKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYWJzb2x1dGVUaW1lb3V0KSB7XG4gICAgICB0aGlzLnNjaGVkdWxlVGltZW91dCgpO1xuICAgIH1cbiAgICBzdXBlci5fbmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuYWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLnNjaGVkdWxlciA9IG51bGw7XG4gICAgdGhpcy5lcnJvckluc3RhbmNlID0gbnVsbDtcbiAgfVxufVxuIl19