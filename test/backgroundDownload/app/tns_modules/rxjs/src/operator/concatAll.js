"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mergeAll_1 = require("./mergeAll");
/* tslint:enable:max-line-length */
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return this.lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatAll = concatAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0QWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uY2F0QWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsdUNBQThDO0FBSzlDLG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ0c7QUFDSDtJQUNFLE1BQU0sQ0FBTSxJQUFJLENBQUMsSUFBSSxDQUFNLElBQUksMkJBQWdCLENBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRkQsOEJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1lcmdlQWxsT3BlcmF0b3IgfSBmcm9tICcuL21lcmdlQWxsJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0QWxsPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4pOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdEFsbDxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+KTogU3Vic2NyaWJhYmxlPFI+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlIGludG8gYSBmaXJzdC1vcmRlciBPYnNlcnZhYmxlIGJ5XG4gKiBjb25jYXRlbmF0aW5nIHRoZSBpbm5lciBPYnNlcnZhYmxlcyBpbiBvcmRlci5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgYW4gT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlcyBieSBwdXR0aW5nIG9uZVxuICogaW5uZXIgT2JzZXJ2YWJsZSBhZnRlciB0aGUgb3RoZXIuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvY29uY2F0QWxsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEpvaW5zIGV2ZXJ5IE9ic2VydmFibGUgZW1pdHRlZCBieSB0aGUgc291cmNlIChhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlKSwgaW5cbiAqIGEgc2VyaWFsIGZhc2hpb24uIEl0IHN1YnNjcmliZXMgdG8gZWFjaCBpbm5lciBPYnNlcnZhYmxlIG9ubHkgYWZ0ZXIgdGhlXG4gKiBwcmV2aW91cyBpbm5lciBPYnNlcnZhYmxlIGhhcyBjb21wbGV0ZWQsIGFuZCBtZXJnZXMgYWxsIG9mIHRoZWlyIHZhbHVlcyBpbnRvXG4gKiB0aGUgcmV0dXJuZWQgb2JzZXJ2YWJsZS5cbiAqXG4gKiBfX1dhcm5pbmc6X18gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzIE9ic2VydmFibGVzIHF1aWNrbHkgYW5kXG4gKiBlbmRsZXNzbHksIGFuZCB0aGUgaW5uZXIgT2JzZXJ2YWJsZXMgaXQgZW1pdHMgZ2VuZXJhbGx5IGNvbXBsZXRlIHNsb3dlciB0aGFuXG4gKiB0aGUgc291cmNlIGVtaXRzLCB5b3UgY2FuIHJ1biBpbnRvIG1lbW9yeSBpc3N1ZXMgYXMgdGhlIGluY29taW5nIE9ic2VydmFibGVzXG4gKiBjb2xsZWN0IGluIGFuIHVuYm91bmRlZCBidWZmZXIuXG4gKlxuICogTm90ZTogYGNvbmNhdEFsbGAgaXMgZXF1aXZhbGVudCB0byBgbWVyZ2VBbGxgIHdpdGggY29uY3VycmVuY3kgcGFyYW1ldGVyIHNldFxuICogdG8gYDFgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkZvciBlYWNoIGNsaWNrIGV2ZW50LCB0aWNrIGV2ZXJ5IHNlY29uZCBmcm9tIDAgdG8gMywgd2l0aCBubyBjb25jdXJyZW5jeTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgaGlnaGVyT3JkZXIgPSBjbGlja3MubWFwKGV2ID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSg0KSk7XG4gKiB2YXIgZmlyc3RPcmRlciA9IGhpZ2hlck9yZGVyLmNvbmNhdEFsbCgpO1xuICogZmlyc3RPcmRlci5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nOlxuICogLy8gKHJlc3VsdHMgYXJlIG5vdCBjb25jdXJyZW50KVxuICogLy8gRm9yIGV2ZXJ5IGNsaWNrIG9uIHRoZSBcImRvY3VtZW50XCIgaXQgd2lsbCBlbWl0IHZhbHVlcyAwIHRvIDMgc3BhY2VkXG4gKiAvLyBvbiBhIDEwMDBtcyBpbnRlcnZhbFxuICogLy8gb25lIGNsaWNrID0gMTAwMG1zLT4gMCAtMTAwMG1zLT4gMSAtMTAwMG1zLT4gMiAtMTAwMG1zLT4gM1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXR9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXBUb31cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3R9XG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaH1cbiAqIEBzZWUge0BsaW5rIHppcEFsbH1cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIGVtaXR0aW5nIHZhbHVlcyBmcm9tIGFsbCB0aGUgaW5uZXJcbiAqIE9ic2VydmFibGVzIGNvbmNhdGVuYXRlZC5cbiAqIEBtZXRob2QgY29uY2F0QWxsXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0QWxsPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4pOiBUIHtcbiAgcmV0dXJuIDxhbnk+dGhpcy5saWZ0PGFueT4obmV3IE1lcmdlQWxsT3BlcmF0b3I8VD4oMSkpO1xufVxuIl19