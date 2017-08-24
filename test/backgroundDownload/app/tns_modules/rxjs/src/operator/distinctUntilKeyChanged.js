"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distinctUntilChanged_1 = require("./distinctUntilChanged");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
 * using a property accessed by using the key provided to check if the two items are distinct.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>An example comparing the name of persons</caption>
 *
 *  interface Person {
 *     age: number,
 *     name: string
 *  }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'},
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilKeyChanged('name')
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @example <caption>An example comparing the first letters of the name</caption>
 *
 * interface Person {
 *     age: number,
 *     name: string
 *  }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo1'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo2'},
 *     { age: 6, name: 'Foo3'})
 *     .distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3))
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo1' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo2' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 *
 * @param {string} key String key for object property lookup on each item.
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values based on the key specified.
 * @method distinctUntilKeyChanged
 * @owner Observable
 */
function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged.call(this, function (x, y) {
        if (compare) {
            return compare(x[key], y[key]);
        }
        return x[key] === y[key];
    });
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdGluY3RVbnRpbEtleUNoYW5nZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQU05RCxtQ0FBbUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0RHO0FBQ0gsaUNBQWdFLEdBQVcsRUFBRSxPQUFpQztJQUM1RyxNQUFNLENBQUMsMkNBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFTLENBQUksRUFBRSxDQUFJO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBUEQsMERBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJy4vZGlzdGluY3RVbnRpbENoYW5nZWQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZDxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gZGlzdGluY3RVbnRpbEtleUNoYW5nZWQ8VCwgSz4odGhpczogT2JzZXJ2YWJsZTxUPiwga2V5OiBzdHJpbmcsIGNvbXBhcmU6ICh4OiBLLCB5OiBLKSA9PiBib29sZWFuKTogT2JzZXJ2YWJsZTxUPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYWxsIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgYXJlIGRpc3RpbmN0IGJ5IGNvbXBhcmlzb24gZnJvbSB0aGUgcHJldmlvdXMgaXRlbSxcbiAqIHVzaW5nIGEgcHJvcGVydHkgYWNjZXNzZWQgYnkgdXNpbmcgdGhlIGtleSBwcm92aWRlZCB0byBjaGVjayBpZiB0aGUgdHdvIGl0ZW1zIGFyZSBkaXN0aW5jdC5cbiAqXG4gKiBJZiBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggaXRlbSB0byB0ZXN0IGZvciB3aGV0aGVyIG9yIG5vdCB0aGF0IHZhbHVlIHNob3VsZCBiZSBlbWl0dGVkLlxuICpcbiAqIElmIGEgY29tcGFyYXRvciBmdW5jdGlvbiBpcyBub3QgcHJvdmlkZWQsIGFuIGVxdWFsaXR5IGNoZWNrIGlzIHVzZWQgYnkgZGVmYXVsdC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BbiBleGFtcGxlIGNvbXBhcmluZyB0aGUgbmFtZSBvZiBwZXJzb25zPC9jYXB0aW9uPlxuICpcbiAqICBpbnRlcmZhY2UgUGVyc29uIHtcbiAqICAgICBhZ2U6IG51bWJlcixcbiAqICAgICBuYW1lOiBzdHJpbmdcbiAqICB9XG4gKlxuICogT2JzZXJ2YWJsZS5vZjxQZXJzb24+KFxuICogICAgIHsgYWdlOiA0LCBuYW1lOiAnRm9vJ30sXG4gKiAgICAgeyBhZ2U6IDcsIG5hbWU6ICdCYXInfSxcbiAqICAgICB7IGFnZTogNSwgbmFtZTogJ0Zvbyd9LFxuICogICAgIHsgYWdlOiA2LCBuYW1lOiAnRm9vJ30pXG4gKiAgICAgLmRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkKCduYW1lJylcbiAqICAgICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIGRpc3BsYXlzOlxuICogLy8geyBhZ2U6IDQsIG5hbWU6ICdGb28nIH1cbiAqIC8vIHsgYWdlOiA3LCBuYW1lOiAnQmFyJyB9XG4gKiAvLyB7IGFnZTogNSwgbmFtZTogJ0ZvbycgfVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFuIGV4YW1wbGUgY29tcGFyaW5nIHRoZSBmaXJzdCBsZXR0ZXJzIG9mIHRoZSBuYW1lPC9jYXB0aW9uPlxuICpcbiAqIGludGVyZmFjZSBQZXJzb24ge1xuICogICAgIGFnZTogbnVtYmVyLFxuICogICAgIG5hbWU6IHN0cmluZ1xuICogIH1cbiAqXG4gKiBPYnNlcnZhYmxlLm9mPFBlcnNvbj4oXG4gKiAgICAgeyBhZ2U6IDQsIG5hbWU6ICdGb28xJ30sXG4gKiAgICAgeyBhZ2U6IDcsIG5hbWU6ICdCYXInfSxcbiAqICAgICB7IGFnZTogNSwgbmFtZTogJ0ZvbzInfSxcbiAqICAgICB7IGFnZTogNiwgbmFtZTogJ0ZvbzMnfSlcbiAqICAgICAuZGlzdGluY3RVbnRpbEtleUNoYW5nZWQoJ25hbWUnLCAoeDogc3RyaW5nLCB5OiBzdHJpbmcpID0+IHguc3Vic3RyaW5nKDAsIDMpID09PSB5LnN1YnN0cmluZygwLCAzKSlcbiAqICAgICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIGRpc3BsYXlzOlxuICogLy8geyBhZ2U6IDQsIG5hbWU6ICdGb28xJyB9XG4gKiAvLyB7IGFnZTogNywgbmFtZTogJ0JhcicgfVxuICogLy8geyBhZ2U6IDUsIG5hbWU6ICdGb28yJyB9XG4gKlxuICogQHNlZSB7QGxpbmsgZGlzdGluY3R9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsQ2hhbmdlZH1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0cmluZyBrZXkgZm9yIG9iamVjdCBwcm9wZXJ0eSBsb29rdXAgb24gZWFjaCBpdGVtLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2NvbXBhcmVdIE9wdGlvbmFsIGNvbXBhcmlzb24gZnVuY3Rpb24gY2FsbGVkIHRvIHRlc3QgaWYgYW4gaXRlbSBpcyBkaXN0aW5jdCBmcm9tIHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBzb3VyY2UuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aCBkaXN0aW5jdCB2YWx1ZXMgYmFzZWQgb24gdGhlIGtleSBzcGVjaWZpZWQuXG4gKiBAbWV0aG9kIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzdGluY3RVbnRpbEtleUNoYW5nZWQ8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwga2V5OiBzdHJpbmcsIGNvbXBhcmU/OiAoeDogVCwgeTogVCkgPT4gYm9vbGVhbik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gZGlzdGluY3RVbnRpbENoYW5nZWQuY2FsbCh0aGlzLCBmdW5jdGlvbih4OiBULCB5OiBUKSB7XG4gICAgaWYgKGNvbXBhcmUpIHtcbiAgICAgIHJldHVybiBjb21wYXJlKHhba2V5XSwgeVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHhba2V5XSA9PT0geVtrZXldO1xuICB9KTtcbn1cbiJdfQ==