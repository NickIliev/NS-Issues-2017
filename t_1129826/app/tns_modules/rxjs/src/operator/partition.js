"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_1 = require("../util/not");
var filter_1 = require("./filter");
/**
 * Splits the source Observable into two, one with values that satisfy a
 * predicate, and another with values that don't satisfy the predicate.
 *
 * <span class="informal">It's like {@link filter}, but returns two Observables:
 * one like the output of {@link filter}, and the other with values that did not
 * pass the condition.</span>
 *
 * <img src="./img/partition.png" width="100%">
 *
 * `partition` outputs an array with two Observables that partition the values
 * from the source Observable through the given `predicate` function. The first
 * Observable in that array emits source values for which the predicate argument
 * returns true. The second Observable emits source values for which the
 * predicate returns false. The first behaves like {@link filter} and the second
 * behaves like {@link filter} with the predicate negated.
 *
 * @example <caption>Partition click events into those on DIV elements and those elsewhere</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
 * var clicksOnDivs = parts[0];
 * var clicksElsewhere = parts[1];
 * clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
 * clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
 *
 * @see {@link filter}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted on the first Observable in the returned array, if
 * `false` the value is emitted on the second Observable in the array. The
 * `index` parameter is the number `i` for the i-th source emission that has
 * happened since the subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
 * with values that passed the predicate, and another with values that did not
 * pass the predicate.
 * @method partition
 * @owner Observable
 */
function partition(predicate, thisArg) {
    return [
        filter_1.filter.call(this, predicate, thisArg),
        filter_1.filter.call(this, not_1.not(predicate, thisArg))
    ];
}
exports.partition = partition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFydGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWtDO0FBQ2xDLG1DQUFrQztBQUdsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUNILG1CQUFrRCxTQUFnQyxFQUFFLE9BQWE7SUFDL0YsTUFBTSxDQUFDO1FBQ0wsZUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQztRQUNyQyxlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNDLENBQUM7QUFDSixDQUFDO0FBTEQsOEJBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBub3QgfSBmcm9tICcuLi91dGlsL25vdCc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICcuL2ZpbHRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogU3BsaXRzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBpbnRvIHR3bywgb25lIHdpdGggdmFsdWVzIHRoYXQgc2F0aXNmeSBhXG4gKiBwcmVkaWNhdGUsIGFuZCBhbm90aGVyIHdpdGggdmFsdWVzIHRoYXQgZG9uJ3Qgc2F0aXNmeSB0aGUgcHJlZGljYXRlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGZpbHRlcn0sIGJ1dCByZXR1cm5zIHR3byBPYnNlcnZhYmxlczpcbiAqIG9uZSBsaWtlIHRoZSBvdXRwdXQgb2Yge0BsaW5rIGZpbHRlcn0sIGFuZCB0aGUgb3RoZXIgd2l0aCB2YWx1ZXMgdGhhdCBkaWQgbm90XG4gKiBwYXNzIHRoZSBjb25kaXRpb24uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcGFydGl0aW9uLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBwYXJ0aXRpb25gIG91dHB1dHMgYW4gYXJyYXkgd2l0aCB0d28gT2JzZXJ2YWJsZXMgdGhhdCBwYXJ0aXRpb24gdGhlIHZhbHVlc1xuICogZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgdGhyb3VnaCB0aGUgZ2l2ZW4gYHByZWRpY2F0ZWAgZnVuY3Rpb24uIFRoZSBmaXJzdFxuICogT2JzZXJ2YWJsZSBpbiB0aGF0IGFycmF5IGVtaXRzIHNvdXJjZSB2YWx1ZXMgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgYXJndW1lbnRcbiAqIHJldHVybnMgdHJ1ZS4gVGhlIHNlY29uZCBPYnNlcnZhYmxlIGVtaXRzIHNvdXJjZSB2YWx1ZXMgZm9yIHdoaWNoIHRoZVxuICogcHJlZGljYXRlIHJldHVybnMgZmFsc2UuIFRoZSBmaXJzdCBiZWhhdmVzIGxpa2Uge0BsaW5rIGZpbHRlcn0gYW5kIHRoZSBzZWNvbmRcbiAqIGJlaGF2ZXMgbGlrZSB7QGxpbmsgZmlsdGVyfSB3aXRoIHRoZSBwcmVkaWNhdGUgbmVnYXRlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5QYXJ0aXRpb24gY2xpY2sgZXZlbnRzIGludG8gdGhvc2Ugb24gRElWIGVsZW1lbnRzIGFuZCB0aG9zZSBlbHNld2hlcmU8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBhcnRzID0gY2xpY2tzLnBhcnRpdGlvbihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogdmFyIGNsaWNrc09uRGl2cyA9IHBhcnRzWzBdO1xuICogdmFyIGNsaWNrc0Vsc2V3aGVyZSA9IHBhcnRzWzFdO1xuICogY2xpY2tzT25EaXZzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKCdESVYgY2xpY2tlZDogJywgeCkpO1xuICogY2xpY2tzRWxzZXdoZXJlLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKCdPdGhlciBjbGlja2VkOiAnLCB4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZmlsdGVyfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBib29sZWFufSBwcmVkaWNhdGUgQSBmdW5jdGlvbiB0aGF0XG4gKiBldmFsdWF0ZXMgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgaXQgcmV0dXJucyBgdHJ1ZWAsXG4gKiB0aGUgdmFsdWUgaXMgZW1pdHRlZCBvbiB0aGUgZmlyc3QgT2JzZXJ2YWJsZSBpbiB0aGUgcmV0dXJuZWQgYXJyYXksIGlmXG4gKiBgZmFsc2VgIHRoZSB2YWx1ZSBpcyBlbWl0dGVkIG9uIHRoZSBzZWNvbmQgT2JzZXJ2YWJsZSBpbiB0aGUgYXJyYXkuIFRoZVxuICogYGluZGV4YCBwYXJhbWV0ZXIgaXMgdGhlIG51bWJlciBgaWAgZm9yIHRoZSBpLXRoIHNvdXJjZSBlbWlzc2lvbiB0aGF0IGhhc1xuICogaGFwcGVuZWQgc2luY2UgdGhlIHN1YnNjcmlwdGlvbiwgc3RhcnRpbmcgZnJvbSB0aGUgbnVtYmVyIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge1tPYnNlcnZhYmxlPFQ+LCBPYnNlcnZhYmxlPFQ+XX0gQW4gYXJyYXkgd2l0aCB0d28gT2JzZXJ2YWJsZXM6IG9uZVxuICogd2l0aCB2YWx1ZXMgdGhhdCBwYXNzZWQgdGhlIHByZWRpY2F0ZSwgYW5kIGFub3RoZXIgd2l0aCB2YWx1ZXMgdGhhdCBkaWQgbm90XG4gKiBwYXNzIHRoZSBwcmVkaWNhdGUuXG4gKiBAbWV0aG9kIHBhcnRpdGlvblxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnRpdGlvbjxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcmVkaWNhdGU6ICh2YWx1ZTogVCkgPT4gYm9vbGVhbiwgdGhpc0FyZz86IGFueSk6IFtPYnNlcnZhYmxlPFQ+LCBPYnNlcnZhYmxlPFQ+XSB7XG4gIHJldHVybiBbXG4gICAgZmlsdGVyLmNhbGwodGhpcywgcHJlZGljYXRlLCB0aGlzQXJnKSxcbiAgICBmaWx0ZXIuY2FsbCh0aGlzLCBub3QocHJlZGljYXRlLCB0aGlzQXJnKSlcbiAgXTtcbn1cbiJdfQ==