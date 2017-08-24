"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_1 = require("./find");
/**
 * Emits only the index of the first value emitted by the source Observable that
 * meets some condition.
 *
 * <span class="informal">It's like {@link find}, but emits the index of the
 * found value, not the value itself.</span>
 *
 * <img src="./img/findIndex.png" width="100%">
 *
 * `findIndex` searches for the first item in the source Observable that matches
 * the specified condition embodied by the `predicate`, and returns the
 * (zero-based) index of the first occurrence in the source. Unlike
 * {@link first}, the `predicate` is required in `findIndex`, and does not emit
 * an error if a valid value is not found.
 *
 * @example <caption>Emit the index of first click that happens on a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link first}
 * @see {@link take}
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
 * A function called with each item to test for condition matching.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of the index of the first item that
 * matches the condition.
 * @method find
 * @owner Observable
 */
function findIndex(predicate, thisArg) {
    return this.lift(new find_1.FindValueOperator(predicate, this, true, thisArg));
}
exports.findIndex = findIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmluZEluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0JBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxtQkFBa0QsU0FBc0UsRUFDM0YsT0FBYTtJQUN4QyxNQUFNLENBQU0sSUFBSSxDQUFDLElBQUksQ0FBTSxJQUFJLHdCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDcEYsQ0FBQztBQUhELDhCQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRmluZFZhbHVlT3BlcmF0b3IgfSBmcm9tICcuL2ZpbmQnO1xuXG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0XG4gKiBtZWV0cyBzb21lIGNvbmRpdGlvbi5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBmaW5kfSwgYnV0IGVtaXRzIHRoZSBpbmRleCBvZiB0aGVcbiAqIGZvdW5kIHZhbHVlLCBub3QgdGhlIHZhbHVlIGl0c2VsZi48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9maW5kSW5kZXgucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGZpbmRJbmRleGAgc2VhcmNoZXMgZm9yIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IG1hdGNoZXNcbiAqIHRoZSBzcGVjaWZpZWQgY29uZGl0aW9uIGVtYm9kaWVkIGJ5IHRoZSBgcHJlZGljYXRlYCwgYW5kIHJldHVybnMgdGhlXG4gKiAoemVyby1iYXNlZCkgaW5kZXggb2YgdGhlIGZpcnN0IG9jY3VycmVuY2UgaW4gdGhlIHNvdXJjZS4gVW5saWtlXG4gKiB7QGxpbmsgZmlyc3R9LCB0aGUgYHByZWRpY2F0ZWAgaXMgcmVxdWlyZWQgaW4gYGZpbmRJbmRleGAsIGFuZCBkb2VzIG5vdCBlbWl0XG4gKiBhbiBlcnJvciBpZiBhIHZhbGlkIHZhbHVlIGlzIG5vdCBmb3VuZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBpbmRleCBvZiBmaXJzdCBjbGljayB0aGF0IGhhcHBlbnMgb24gYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmZpbmRJbmRleChldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBmaWx0ZXJ9XG4gKiBAc2VlIHtAbGluayBmaW5kfVxuICogQHNlZSB7QGxpbmsgZmlyc3R9XG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IGJvb2xlYW59IHByZWRpY2F0ZVxuICogQSBmdW5jdGlvbiBjYWxsZWQgd2l0aCBlYWNoIGl0ZW0gdG8gdGVzdCBmb3IgY29uZGl0aW9uIG1hdGNoaW5nLlxuICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIGB0aGlzYFxuICogaW4gdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gdGhhdFxuICogbWF0Y2hlcyB0aGUgY29uZGl0aW9uLlxuICogQG1ldGhvZCBmaW5kXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICByZXR1cm4gPGFueT50aGlzLmxpZnQ8YW55PihuZXcgRmluZFZhbHVlT3BlcmF0b3IocHJlZGljYXRlLCB0aGlzLCB0cnVlLCB0aGlzQXJnKSk7XG59XG4iXX0=