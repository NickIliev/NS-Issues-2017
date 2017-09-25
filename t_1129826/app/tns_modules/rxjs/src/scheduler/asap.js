"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsapAction_1 = require("./AsapAction");
var AsapScheduler_1 = require("./AsapScheduler");
/**
 *
 * Asap Scheduler
 *
 * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
 *
 * `asap` scheduler behaves the same as {@link async} scheduler when you use it to delay task
 * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
 * code to end and then it will try to execute given task as fast as possible.
 *
 * `asap` scheduler will do its best to minimize time between end of currently executing code
 * and start of scheduled task. This makes it best candidate for performing so called "deferring".
 * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
 * some (although minimal) unwanted delay.
 *
 * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
 * after currently executing code. In particular, if some task was also scheduled with `asap` before,
 * that task will execute first. That being said, if you need to schedule task asynchronously, but
 * as soon as possible, `asap` scheduler is your best bet.
 *
 * @example <caption>Compare async and asap scheduler</caption>
 *
 * Rx.Scheduler.async.schedule(() => console.log('async')); // scheduling 'async' first...
 * Rx.Scheduler.asap.schedule(() => console.log('asap'));
 *
 * // Logs:
 * // "asap"
 * // "async"
 * // ... but 'asap' goes first!
 *
 * @static true
 * @name asap
 * @owner Scheduler
 */
exports.asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMEM7QUFDMUMsaURBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFFVSxRQUFBLElBQUksR0FBRyxJQUFJLDZCQUFhLENBQUMsdUJBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNhcEFjdGlvbiB9IGZyb20gJy4vQXNhcEFjdGlvbic7XG5pbXBvcnQgeyBBc2FwU2NoZWR1bGVyIH0gZnJvbSAnLi9Bc2FwU2NoZWR1bGVyJztcblxuLyoqXG4gKlxuICogQXNhcCBTY2hlZHVsZXJcbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+UGVyZm9ybSB0YXNrIGFzIGZhc3QgYXMgaXQgY2FuIGJlIHBlcmZvcm1lZCBhc3luY2hyb25vdXNseTwvc3Bhbj5cbiAqXG4gKiBgYXNhcGAgc2NoZWR1bGVyIGJlaGF2ZXMgdGhlIHNhbWUgYXMge0BsaW5rIGFzeW5jfSBzY2hlZHVsZXIgd2hlbiB5b3UgdXNlIGl0IHRvIGRlbGF5IHRhc2tcbiAqIGluIHRpbWUuIElmIGhvd2V2ZXIgeW91IHNldCBkZWxheSB0byBgMGAsIGBhc2FwYCB3aWxsIHdhaXQgZm9yIGN1cnJlbnQgc3luY2hyb25vdXNseSBleGVjdXRpbmdcbiAqIGNvZGUgdG8gZW5kIGFuZCB0aGVuIGl0IHdpbGwgdHJ5IHRvIGV4ZWN1dGUgZ2l2ZW4gdGFzayBhcyBmYXN0IGFzIHBvc3NpYmxlLlxuICpcbiAqIGBhc2FwYCBzY2hlZHVsZXIgd2lsbCBkbyBpdHMgYmVzdCB0byBtaW5pbWl6ZSB0aW1lIGJldHdlZW4gZW5kIG9mIGN1cnJlbnRseSBleGVjdXRpbmcgY29kZVxuICogYW5kIHN0YXJ0IG9mIHNjaGVkdWxlZCB0YXNrLiBUaGlzIG1ha2VzIGl0IGJlc3QgY2FuZGlkYXRlIGZvciBwZXJmb3JtaW5nIHNvIGNhbGxlZCBcImRlZmVycmluZ1wiLlxuICogVHJhZGl0aW9uYWxseSB0aGlzIHdhcyBhY2hpZXZlZCBieSBjYWxsaW5nIGBzZXRUaW1lb3V0KGRlZmVycmVkVGFzaywgMClgLCBidXQgdGhhdCB0ZWNobmlxdWUgaW52b2x2ZXNcbiAqIHNvbWUgKGFsdGhvdWdoIG1pbmltYWwpIHVud2FudGVkIGRlbGF5LlxuICpcbiAqIE5vdGUgdGhhdCB1c2luZyBgYXNhcGAgc2NoZWR1bGVyIGRvZXMgbm90IG5lY2Vzc2FyaWx5IG1lYW4gdGhhdCB5b3VyIHRhc2sgd2lsbCBiZSBmaXJzdCB0byBwcm9jZXNzXG4gKiBhZnRlciBjdXJyZW50bHkgZXhlY3V0aW5nIGNvZGUuIEluIHBhcnRpY3VsYXIsIGlmIHNvbWUgdGFzayB3YXMgYWxzbyBzY2hlZHVsZWQgd2l0aCBgYXNhcGAgYmVmb3JlLFxuICogdGhhdCB0YXNrIHdpbGwgZXhlY3V0ZSBmaXJzdC4gVGhhdCBiZWluZyBzYWlkLCBpZiB5b3UgbmVlZCB0byBzY2hlZHVsZSB0YXNrIGFzeW5jaHJvbm91c2x5LCBidXRcbiAqIGFzIHNvb24gYXMgcG9zc2libGUsIGBhc2FwYCBzY2hlZHVsZXIgaXMgeW91ciBiZXN0IGJldC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db21wYXJlIGFzeW5jIGFuZCBhc2FwIHNjaGVkdWxlcjwvY2FwdGlvbj5cbiAqXG4gKiBSeC5TY2hlZHVsZXIuYXN5bmMuc2NoZWR1bGUoKCkgPT4gY29uc29sZS5sb2coJ2FzeW5jJykpOyAvLyBzY2hlZHVsaW5nICdhc3luYycgZmlyc3QuLi5cbiAqIFJ4LlNjaGVkdWxlci5hc2FwLnNjaGVkdWxlKCgpID0+IGNvbnNvbGUubG9nKCdhc2FwJykpO1xuICpcbiAqIC8vIExvZ3M6XG4gKiAvLyBcImFzYXBcIlxuICogLy8gXCJhc3luY1wiXG4gKiAvLyAuLi4gYnV0ICdhc2FwJyBnb2VzIGZpcnN0IVxuICpcbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgYXNhcFxuICogQG93bmVyIFNjaGVkdWxlclxuICovXG5cbmV4cG9ydCBjb25zdCBhc2FwID0gbmV3IEFzYXBTY2hlZHVsZXIoQXNhcEFjdGlvbik7XG4iXX0=