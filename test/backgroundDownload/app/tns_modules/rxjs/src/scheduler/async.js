"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncAction_1 = require("./AsyncAction");
var AsyncScheduler_1 = require("./AsyncScheduler");
/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUM1QyxtREFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNHO0FBRVUsUUFBQSxLQUFLLEdBQUcsSUFBSSwrQkFBYyxDQUFDLHlCQUFXLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBBc3luY1NjaGVkdWxlciB9IGZyb20gJy4vQXN5bmNTY2hlZHVsZXInO1xuXG4vKipcbiAqXG4gKiBBc3luYyBTY2hlZHVsZXJcbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+U2NoZWR1bGUgdGFzayBhcyBpZiB5b3UgdXNlZCBzZXRUaW1lb3V0KHRhc2ssIGR1cmF0aW9uKTwvc3Bhbj5cbiAqXG4gKiBgYXN5bmNgIHNjaGVkdWxlciBzY2hlZHVsZXMgdGFza3MgYXN5bmNocm9ub3VzbHksIGJ5IHB1dHRpbmcgdGhlbSBvbiB0aGUgSmF2YVNjcmlwdFxuICogZXZlbnQgbG9vcCBxdWV1ZS4gSXQgaXMgYmVzdCB1c2VkIHRvIGRlbGF5IHRhc2tzIGluIHRpbWUgb3IgdG8gc2NoZWR1bGUgdGFza3MgcmVwZWF0aW5nXG4gKiBpbiBpbnRlcnZhbHMuXG4gKlxuICogSWYgeW91IGp1c3Qgd2FudCB0byBcImRlZmVyXCIgdGFzaywgdGhhdCBpcyB0byBwZXJmb3JtIGl0IHJpZ2h0IGFmdGVyIGN1cnJlbnRseVxuICogZXhlY3V0aW5nIHN5bmNocm9ub3VzIGNvZGUgZW5kcyAoY29tbW9ubHkgYWNoaWV2ZWQgYnkgYHNldFRpbWVvdXQoZGVmZXJyZWRUYXNrLCAwKWApLFxuICogYmV0dGVyIGNob2ljZSB3aWxsIGJlIHRoZSB7QGxpbmsgYXNhcH0gc2NoZWR1bGVyLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBhc3luYyBzY2hlZHVsZXIgdG8gZGVsYXkgdGFzazwvY2FwdGlvbj5cbiAqIGNvbnN0IHRhc2sgPSAoKSA9PiBjb25zb2xlLmxvZygnaXQgd29ya3MhJyk7XG4gKlxuICogUnguU2NoZWR1bGVyLmFzeW5jLnNjaGVkdWxlKHRhc2ssIDIwMDApO1xuICpcbiAqIC8vIEFmdGVyIDIgc2Vjb25kcyBsb2dzOlxuICogLy8gXCJpdCB3b3JrcyFcIlxuICpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2UgYXN5bmMgc2NoZWR1bGVyIHRvIHJlcGVhdCB0YXNrIGluIGludGVydmFsczwvY2FwdGlvbj5cbiAqIGZ1bmN0aW9uIHRhc2soc3RhdGUpIHtcbiAqICAgY29uc29sZS5sb2coc3RhdGUpO1xuICogICB0aGlzLnNjaGVkdWxlKHN0YXRlICsgMSwgMTAwMCk7IC8vIGB0aGlzYCByZWZlcmVuY2VzIGN1cnJlbnRseSBleGVjdXRpbmcgQWN0aW9uLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoaWNoIHdlIHJlc2NoZWR1bGUgd2l0aCBuZXcgc3RhdGUgYW5kIGRlbGF5XG4gKiB9XG4gKlxuICogUnguU2NoZWR1bGVyLmFzeW5jLnNjaGVkdWxlKHRhc2ssIDMwMDAsIDApO1xuICpcbiAqIC8vIExvZ3M6XG4gKiAvLyAwIGFmdGVyIDNzXG4gKiAvLyAxIGFmdGVyIDRzXG4gKiAvLyAyIGFmdGVyIDVzXG4gKiAvLyAzIGFmdGVyIDZzXG4gKlxuICogQHN0YXRpYyB0cnVlXG4gKiBAbmFtZSBhc3luY1xuICogQG93bmVyIFNjaGVkdWxlclxuICovXG5cbmV4cG9ydCBjb25zdCBhc3luYyA9IG5ldyBBc3luY1NjaGVkdWxlcihBc3luY0FjdGlvbik7XG4iXX0=