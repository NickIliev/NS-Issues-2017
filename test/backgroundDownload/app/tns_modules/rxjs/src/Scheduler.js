"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    return Scheduler;
}());
Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
exports.Scheduler = Scheduler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZWR1bGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2NoZWR1bGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0E7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0g7SUFJRSxtQkFBb0IsZUFBOEIsRUFDdEMsR0FBaUM7UUFBakMsb0JBQUEsRUFBQSxNQUFvQixTQUFTLENBQUMsR0FBRztRQUR6QixvQkFBZSxHQUFmLGVBQWUsQ0FBZTtRQUVoRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBWUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSSw0QkFBUSxHQUFmLFVBQW1CLElBQTBDLEVBQUUsS0FBaUIsRUFBRSxLQUFTO1FBQTVCLHNCQUFBLEVBQUEsU0FBaUI7UUFDOUUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBdkNEO0FBRWdCLGFBQUcsR0FBaUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLGNBQU0sT0FBQSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQVgsQ0FBVyxDQUFDO0FBRi9ELDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9zY2hlZHVsZXIvQWN0aW9uJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJU2NoZWR1bGVyIHtcbiAgbm93KCk6IG51bWJlcjtcbiAgc2NoZWR1bGU8VD4od29yazogKHRoaXM6IEFjdGlvbjxUPiwgc3RhdGU/OiBUKSA9PiB2b2lkLCBkZWxheT86IG51bWJlciwgc3RhdGU/OiBUKTogU3Vic2NyaXB0aW9uO1xufVxuLyoqXG4gKiBBbiBleGVjdXRpb24gY29udGV4dCBhbmQgYSBkYXRhIHN0cnVjdHVyZSB0byBvcmRlciB0YXNrcyBhbmQgc2NoZWR1bGUgdGhlaXJcbiAqIGV4ZWN1dGlvbi4gUHJvdmlkZXMgYSBub3Rpb24gb2YgKHBvdGVudGlhbGx5IHZpcnR1YWwpIHRpbWUsIHRocm91Z2ggdGhlXG4gKiBgbm93KClgIGdldHRlciBtZXRob2QuXG4gKlxuICogRWFjaCB1bml0IG9mIHdvcmsgaW4gYSBTY2hlZHVsZXIgaXMgY2FsbGVkIGFuIHtAbGluayBBY3Rpb259LlxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBTY2hlZHVsZXIge1xuICogICBub3coKTogbnVtYmVyO1xuICogICBzY2hlZHVsZSh3b3JrLCBkZWxheT8sIHN0YXRlPyk6IFN1YnNjcmlwdGlvbjtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBjbGFzcyBTY2hlZHVsZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFNjaGVkdWxlciBpbXBsZW1lbnRzIElTY2hlZHVsZXIge1xuXG4gIHB1YmxpYyBzdGF0aWMgbm93OiAoKSA9PiBudW1iZXIgPSBEYXRlLm5vdyA/IERhdGUubm93IDogKCkgPT4gK25ldyBEYXRlKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBTY2hlZHVsZXJBY3Rpb246IHR5cGVvZiBBY3Rpb24sXG4gICAgICAgICAgICAgIG5vdzogKCkgPT4gbnVtYmVyID0gU2NoZWR1bGVyLm5vdykge1xuICAgIHRoaXMubm93ID0gbm93O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZ2V0dGVyIG1ldGhvZCB0aGF0IHJldHVybnMgYSBudW1iZXIgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHRpbWVcbiAgICogKGF0IHRoZSB0aW1lIHRoaXMgZnVuY3Rpb24gd2FzIGNhbGxlZCkgYWNjb3JkaW5nIHRvIHRoZSBzY2hlZHVsZXIncyBvd25cbiAgICogaW50ZXJuYWwgY2xvY2suXG4gICAqIEByZXR1cm4ge251bWJlcn0gQSBudW1iZXIgdGhhdCByZXByZXNlbnRzIHRoZSBjdXJyZW50IHRpbWUuIE1heSBvciBtYXkgbm90XG4gICAqIGhhdmUgYSByZWxhdGlvbiB0byB3YWxsLWNsb2NrIHRpbWUuIE1heSBvciBtYXkgbm90IHJlZmVyIHRvIGEgdGltZSB1bml0XG4gICAqIChlLmcuIG1pbGxpc2Vjb25kcykuXG4gICAqL1xuICBwdWJsaWMgbm93OiAoKSA9PiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlcyBhIGZ1bmN0aW9uLCBgd29ya2AsIGZvciBleGVjdXRpb24uIE1heSBoYXBwZW4gYXQgc29tZSBwb2ludCBpblxuICAgKiB0aGUgZnV0dXJlLCBhY2NvcmRpbmcgdG8gdGhlIGBkZWxheWAgcGFyYW1ldGVyLCBpZiBzcGVjaWZpZWQuIE1heSBiZSBwYXNzZWRcbiAgICogc29tZSBjb250ZXh0IG9iamVjdCwgYHN0YXRlYCwgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGB3b3JrYCBmdW5jdGlvbi5cbiAgICpcbiAgICogVGhlIGdpdmVuIGFyZ3VtZW50cyB3aWxsIGJlIHByb2Nlc3NlZCBhbiBzdG9yZWQgYXMgYW4gQWN0aW9uIG9iamVjdCBpbiBhXG4gICAqIHF1ZXVlIG9mIGFjdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RhdGU6ID9UKTogP1N1YnNjcmlwdGlvbn0gd29yayBBIGZ1bmN0aW9uIHJlcHJlc2VudGluZyBhXG4gICAqIHRhc2ssIG9yIHNvbWUgdW5pdCBvZiB3b3JrIHRvIGJlIGV4ZWN1dGVkIGJ5IHRoZSBTY2hlZHVsZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZGVsYXldIFRpbWUgdG8gd2FpdCBiZWZvcmUgZXhlY3V0aW5nIHRoZSB3b3JrLCB3aGVyZSB0aGVcbiAgICogdGltZSB1bml0IGlzIGltcGxpY2l0IGFuZCBkZWZpbmVkIGJ5IHRoZSBTY2hlZHVsZXIgaXRzZWxmLlxuICAgKiBAcGFyYW0ge1R9IFtzdGF0ZV0gU29tZSBjb250ZXh0dWFsIGRhdGEgdGhhdCB0aGUgYHdvcmtgIGZ1bmN0aW9uIHVzZXMgd2hlblxuICAgKiBjYWxsZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBBIHN1YnNjcmlwdGlvbiBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHVuc3Vic2NyaWJlXG4gICAqIHRoZSBzY2hlZHVsZWQgd29yay5cbiAgICovXG4gIHB1YmxpYyBzY2hlZHVsZTxUPih3b3JrOiAodGhpczogQWN0aW9uPFQ+LCBzdGF0ZT86IFQpID0+IHZvaWQsIGRlbGF5OiBudW1iZXIgPSAwLCBzdGF0ZT86IFQpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiBuZXcgdGhpcy5TY2hlZHVsZXJBY3Rpb248VD4odGhpcywgd29yaykuc2NoZWR1bGUoc3RhdGUsIGRlbGF5KTtcbiAgfVxufVxuIl19