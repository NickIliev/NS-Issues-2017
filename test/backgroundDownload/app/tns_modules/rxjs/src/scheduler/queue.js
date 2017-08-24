"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueueAction_1 = require("./QueueAction");
var QueueScheduler_1 = require("./QueueScheduler");
/**
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * @examples <caption>Schedule recursively first, then do something</caption>
 *
 * Rx.Scheduler.queue.schedule(() => {
 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 *
 *
 * @example <caption>Reschedule itself recursively</caption>
 *
 * Rx.Scheduler.queue.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 *
 *
 * @static true
 * @name queue
 * @owner Scheduler
 */
exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWV1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUM1QyxtREFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRERztBQUVVLFFBQUEsS0FBSyxHQUFHLElBQUksK0JBQWMsQ0FBQyx5QkFBVyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZUFjdGlvbiB9IGZyb20gJy4vUXVldWVBY3Rpb24nO1xuaW1wb3J0IHsgUXVldWVTY2hlZHVsZXIgfSBmcm9tICcuL1F1ZXVlU2NoZWR1bGVyJztcblxuLyoqXG4gKlxuICogUXVldWUgU2NoZWR1bGVyXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlB1dCBldmVyeSBuZXh0IHRhc2sgb24gYSBxdWV1ZSwgaW5zdGVhZCBvZiBleGVjdXRpbmcgaXQgaW1tZWRpYXRlbHk8L3NwYW4+XG4gKlxuICogYHF1ZXVlYCBzY2hlZHVsZXIsIHdoZW4gdXNlZCB3aXRoIGRlbGF5LCBiZWhhdmVzIHRoZSBzYW1lIGFzIHtAbGluayBhc3luY30gc2NoZWR1bGVyLlxuICpcbiAqIFdoZW4gdXNlZCB3aXRob3V0IGRlbGF5LCBpdCBzY2hlZHVsZXMgZ2l2ZW4gdGFzayBzeW5jaHJvbm91c2x5IC0gZXhlY3V0ZXMgaXQgcmlnaHQgd2hlblxuICogaXQgaXMgc2NoZWR1bGVkLiBIb3dldmVyIHdoZW4gY2FsbGVkIHJlY3Vyc2l2ZWx5LCB0aGF0IGlzIHdoZW4gaW5zaWRlIHRoZSBzY2hlZHVsZWQgdGFzayxcbiAqIGFub3RoZXIgdGFzayBpcyBzY2hlZHVsZWQgd2l0aCBxdWV1ZSBzY2hlZHVsZXIsIGluc3RlYWQgb2YgZXhlY3V0aW5nIGltbWVkaWF0ZWx5IGFzIHdlbGwsXG4gKiB0aGF0IHRhc2sgd2lsbCBiZSBwdXQgb24gYSBxdWV1ZSBhbmQgd2FpdCBmb3IgY3VycmVudCBvbmUgdG8gZmluaXNoLlxuICpcbiAqIFRoaXMgbWVhbnMgdGhhdCB3aGVuIHlvdSBleGVjdXRlIHRhc2sgd2l0aCBgcXVldWVgIHNjaGVkdWxlciwgeW91IGFyZSBzdXJlIGl0IHdpbGwgZW5kXG4gKiBiZWZvcmUgYW55IG90aGVyIHRhc2sgc2NoZWR1bGVkIHdpdGggdGhhdCBzY2hlZHVsZXIgd2lsbCBzdGFydC5cbiAqXG4gKiBAZXhhbXBsZXMgPGNhcHRpb24+U2NoZWR1bGUgcmVjdXJzaXZlbHkgZmlyc3QsIHRoZW4gZG8gc29tZXRoaW5nPC9jYXB0aW9uPlxuICpcbiAqIFJ4LlNjaGVkdWxlci5xdWV1ZS5zY2hlZHVsZSgoKSA9PiB7XG4gKiAgIFJ4LlNjaGVkdWxlci5xdWV1ZS5zY2hlZHVsZSgoKSA9PiBjb25zb2xlLmxvZygnc2Vjb25kJykpOyAvLyB3aWxsIG5vdCBoYXBwZW4gbm93LCBidXQgd2lsbCBiZSBwdXQgb24gYSBxdWV1ZVxuICpcbiAqICAgY29uc29sZS5sb2coJ2ZpcnN0Jyk7XG4gKiB9KTtcbiAqXG4gKiAvLyBMb2dzOlxuICogLy8gXCJmaXJzdFwiXG4gKiAvLyBcInNlY29uZFwiXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlJlc2NoZWR1bGUgaXRzZWxmIHJlY3Vyc2l2ZWx5PC9jYXB0aW9uPlxuICpcbiAqIFJ4LlNjaGVkdWxlci5xdWV1ZS5zY2hlZHVsZShmdW5jdGlvbihzdGF0ZSkge1xuICogICBpZiAoc3RhdGUgIT09IDApIHtcbiAqICAgICBjb25zb2xlLmxvZygnYmVmb3JlJywgc3RhdGUpO1xuICogICAgIHRoaXMuc2NoZWR1bGUoc3RhdGUgLSAxKTsgLy8gYHRoaXNgIHJlZmVyZW5jZXMgY3VycmVudGx5IGV4ZWN1dGluZyBBY3Rpb24sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCB3ZSByZXNjaGVkdWxlIHdpdGggbmV3IHN0YXRlXG4gKiAgICAgY29uc29sZS5sb2coJ2FmdGVyJywgc3RhdGUpO1xuICogICB9XG4gKiB9LCAwLCAzKTtcbiAqXG4gKiAvLyBJbiBzY2hlZHVsZXIgdGhhdCBydW5zIHJlY3Vyc2l2ZWx5LCB5b3Ugd291bGQgZXhwZWN0OlxuICogLy8gXCJiZWZvcmVcIiwgM1xuICogLy8gXCJiZWZvcmVcIiwgMlxuICogLy8gXCJiZWZvcmVcIiwgMVxuICogLy8gXCJhZnRlclwiLCAxXG4gKiAvLyBcImFmdGVyXCIsIDJcbiAqIC8vIFwiYWZ0ZXJcIiwgM1xuICpcbiAqIC8vIEJ1dCB3aXRoIHF1ZXVlIGl0IGxvZ3M6XG4gKiAvLyBcImJlZm9yZVwiLCAzXG4gKiAvLyBcImFmdGVyXCIsIDNcbiAqIC8vIFwiYmVmb3JlXCIsIDJcbiAqIC8vIFwiYWZ0ZXJcIiwgMlxuICogLy8gXCJiZWZvcmVcIiwgMVxuICogLy8gXCJhZnRlclwiLCAxXG4gKlxuICpcbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgcXVldWVcbiAqIEBvd25lciBTY2hlZHVsZXJcbiAqL1xuXG5leHBvcnQgY29uc3QgcXVldWUgPSBuZXcgUXVldWVTY2hlZHVsZXIoUXVldWVBY3Rpb24pO1xuIl19