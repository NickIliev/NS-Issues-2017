"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var combineLatest_1 = require("./combineLatest");
/**
 * Converts a higher-order Observable into a first-order Observable by waiting
 * for the outer Observable to complete, then applying {@link combineLatest}.
 *
 * <span class="informal">Flattens an Observable-of-Observables by applying
 * {@link combineLatest} when the Observable-of-Observables completes.</span>
 *
 * <img src="./img/combineAll.png" width="100%">
 *
 * Takes an Observable of Observables, and collects all Observables from it.
 * Once the outer Observable completes, it subscribes to all collected
 * Observables and combines their values using the {@link combineLatest}
 * strategy, such that:
 * - Every time an inner Observable emits, the output Observable emits.
 * - When the returned observable emits, it emits all of the latest values by:
 *   - If a `project` function is provided, it is called with each recent value
 *     from each inner Observable in whatever order they arrived, and the result
 *     of the `project` function is what is emitted by the output Observable.
 *   - If there is no `project` function, an array of all of the most recent
 *     values is emitted by the output Observable.
 *
 * @example <caption>Map two click events to a finite interval Observable, then apply combineAll</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev =>
 *   Rx.Observable.interval(Math.random()*2000).take(3)
 * ).take(2);
 * var result = higherOrder.combineAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 * @see {@link mergeAll}
 *
 * @param {function} [project] An optional function to map the most recent
 * values from each inner Observable into a new result. Takes each of the most
 * recent values from each collected inner Observable as arguments, in order.
 * @return {Observable} An Observable of projected results or arrays of recent
 * values.
 * @method combineAll
 * @owner Observable
 */
function combineAll(project) {
    return this.lift(new combineLatest_1.CombineLatestOperator(project));
}
exports.combineAll = combineAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbWJpbmVBbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBd0Q7QUFHeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUNILG9CQUFzRCxPQUFzQztJQUMxRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHFDQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUZELGdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tYmluZUxhdGVzdE9wZXJhdG9yIH0gZnJvbSAnLi9jb21iaW5lTGF0ZXN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlIGludG8gYSBmaXJzdC1vcmRlciBPYnNlcnZhYmxlIGJ5IHdhaXRpbmdcbiAqIGZvciB0aGUgb3V0ZXIgT2JzZXJ2YWJsZSB0byBjb21wbGV0ZSwgdGhlbiBhcHBseWluZyB7QGxpbmsgY29tYmluZUxhdGVzdH0uXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkZsYXR0ZW5zIGFuIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXMgYnkgYXBwbHlpbmdcbiAqIHtAbGluayBjb21iaW5lTGF0ZXN0fSB3aGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9jb21iaW5lQWxsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFRha2VzIGFuIE9ic2VydmFibGUgb2YgT2JzZXJ2YWJsZXMsIGFuZCBjb2xsZWN0cyBhbGwgT2JzZXJ2YWJsZXMgZnJvbSBpdC5cbiAqIE9uY2UgdGhlIG91dGVyIE9ic2VydmFibGUgY29tcGxldGVzLCBpdCBzdWJzY3JpYmVzIHRvIGFsbCBjb2xsZWN0ZWRcbiAqIE9ic2VydmFibGVzIGFuZCBjb21iaW5lcyB0aGVpciB2YWx1ZXMgdXNpbmcgdGhlIHtAbGluayBjb21iaW5lTGF0ZXN0fVxuICogc3RyYXRlZ3ksIHN1Y2ggdGhhdDpcbiAqIC0gRXZlcnkgdGltZSBhbiBpbm5lciBPYnNlcnZhYmxlIGVtaXRzLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMuXG4gKiAtIFdoZW4gdGhlIHJldHVybmVkIG9ic2VydmFibGUgZW1pdHMsIGl0IGVtaXRzIGFsbCBvZiB0aGUgbGF0ZXN0IHZhbHVlcyBieTpcbiAqICAgLSBJZiBhIGBwcm9qZWN0YCBmdW5jdGlvbiBpcyBwcm92aWRlZCwgaXQgaXMgY2FsbGVkIHdpdGggZWFjaCByZWNlbnQgdmFsdWVcbiAqICAgICBmcm9tIGVhY2ggaW5uZXIgT2JzZXJ2YWJsZSBpbiB3aGF0ZXZlciBvcmRlciB0aGV5IGFycml2ZWQsIGFuZCB0aGUgcmVzdWx0XG4gKiAgICAgb2YgdGhlIGBwcm9qZWN0YCBmdW5jdGlvbiBpcyB3aGF0IGlzIGVtaXR0ZWQgYnkgdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICogICAtIElmIHRoZXJlIGlzIG5vIGBwcm9qZWN0YCBmdW5jdGlvbiwgYW4gYXJyYXkgb2YgYWxsIG9mIHRoZSBtb3N0IHJlY2VudFxuICogICAgIHZhbHVlcyBpcyBlbWl0dGVkIGJ5IHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgdHdvIGNsaWNrIGV2ZW50cyB0byBhIGZpbml0ZSBpbnRlcnZhbCBPYnNlcnZhYmxlLCB0aGVuIGFwcGx5IGNvbWJpbmVBbGw8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGhpZ2hlck9yZGVyID0gY2xpY2tzLm1hcChldiA9PlxuICogICBSeC5PYnNlcnZhYmxlLmludGVydmFsKE1hdGgucmFuZG9tKCkqMjAwMCkudGFrZSgzKVxuICogKS50YWtlKDIpO1xuICogdmFyIHJlc3VsdCA9IGhpZ2hlck9yZGVyLmNvbWJpbmVBbGwoKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUxhdGVzdH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtwcm9qZWN0XSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byBtYXAgdGhlIG1vc3QgcmVjZW50XG4gKiB2YWx1ZXMgZnJvbSBlYWNoIGlubmVyIE9ic2VydmFibGUgaW50byBhIG5ldyByZXN1bHQuIFRha2VzIGVhY2ggb2YgdGhlIG1vc3RcbiAqIHJlY2VudCB2YWx1ZXMgZnJvbSBlYWNoIGNvbGxlY3RlZCBpbm5lciBPYnNlcnZhYmxlIGFzIGFyZ3VtZW50cywgaW4gb3JkZXIuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIHByb2plY3RlZCByZXN1bHRzIG9yIGFycmF5cyBvZiByZWNlbnRcbiAqIHZhbHVlcy5cbiAqIEBtZXRob2QgY29tYmluZUFsbFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVBbGw8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgcHJvamVjdD86ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpOiBPYnNlcnZhYmxlPFI+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgQ29tYmluZUxhdGVzdE9wZXJhdG9yKHByb2plY3QpKTtcbn1cbiJdfQ==