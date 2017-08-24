"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduce_1 = require("./reduce");
/**
 * The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
 * and when source Observable completes it emits a single item: the item with the smallest value.
 *
 * <img src="./img/min.png" width="100%">
 *
 * @example <caption>Get the minimal value of a series of numbers</caption>
 * Rx.Observable.of(5, 4, 7, 2, 8)
 *   .min()
 *   .subscribe(x => console.log(x)); // -> 2
 *
 * @example <caption>Use a comparer function to get the minimal item</caption>
 * interface Person {
 *   age: number,
 *   name: string
 * }
 * Observable.of<Person>({age: 7, name: 'Foo'},
 *                       {age: 5, name: 'Bar'},
 *                       {age: 9, name: 'Beer'})
 *           .min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1)
 *           .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
 * }
 *
 * @see {@link max}
 *
 * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
 * value of two items.
 * @return {Observable<R>} An Observable that emits item with the smallest value.
 * @method min
 * @owner Observable
 */
function min(comparer) {
    var min = (typeof comparer === 'function')
        ? function (x, y) { return comparer(x, y) < 0 ? x : y; }
        : function (x, y) { return x < y ? x : y; };
    return this.lift(new reduce_1.ReduceOperator(min));
}
exports.min = min;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxhQUE0QyxRQUFpQztJQUMzRSxJQUFNLEdBQUcsR0FBc0IsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLENBQUM7VUFDM0QsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBMUIsQ0FBMEI7VUFDcEMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFiLENBQWEsQ0FBQztJQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBTEQsa0JBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSZWR1Y2VPcGVyYXRvciB9IGZyb20gJy4vcmVkdWNlJztcblxuLyoqXG4gKiBUaGUgTWluIG9wZXJhdG9yIG9wZXJhdGVzIG9uIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBudW1iZXJzIChvciBpdGVtcyB0aGF0IGNhbiBiZSBjb21wYXJlZCB3aXRoIGEgcHJvdmlkZWQgZnVuY3Rpb24pLFxuICogYW5kIHdoZW4gc291cmNlIE9ic2VydmFibGUgY29tcGxldGVzIGl0IGVtaXRzIGEgc2luZ2xlIGl0ZW06IHRoZSBpdGVtIHdpdGggdGhlIHNtYWxsZXN0IHZhbHVlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWluLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkdldCB0aGUgbWluaW1hbCB2YWx1ZSBvZiBhIHNlcmllcyBvZiBudW1iZXJzPC9jYXB0aW9uPlxuICogUnguT2JzZXJ2YWJsZS5vZig1LCA0LCA3LCAyLCA4KVxuICogICAubWluKClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTsgLy8gLT4gMlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBhIGNvbXBhcmVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgbWluaW1hbCBpdGVtPC9jYXB0aW9uPlxuICogaW50ZXJmYWNlIFBlcnNvbiB7XG4gKiAgIGFnZTogbnVtYmVyLFxuICogICBuYW1lOiBzdHJpbmdcbiAqIH1cbiAqIE9ic2VydmFibGUub2Y8UGVyc29uPih7YWdlOiA3LCBuYW1lOiAnRm9vJ30sXG4gKiAgICAgICAgICAgICAgICAgICAgICAge2FnZTogNSwgbmFtZTogJ0Jhcid9LFxuICogICAgICAgICAgICAgICAgICAgICAgIHthZ2U6IDksIG5hbWU6ICdCZWVyJ30pXG4gKiAgICAgICAgICAgLm1pbjxQZXJzb24+KCAoYTogUGVyc29uLCBiOiBQZXJzb24pID0+IGEuYWdlIDwgYi5hZ2UgPyAtMSA6IDEpXG4gKiAgICAgICAgICAgLnN1YnNjcmliZSgoeDogUGVyc29uKSA9PiBjb25zb2xlLmxvZyh4Lm5hbWUpKTsgLy8gLT4gJ0JhcidcbiAqIH1cbiAqXG4gKiBAc2VlIHtAbGluayBtYXh9XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmVyXSAtIE9wdGlvbmFsIGNvbXBhcmVyIGZ1bmN0aW9uIHRoYXQgaXQgd2lsbCB1c2UgaW5zdGVhZCBvZiBpdHMgZGVmYXVsdCB0byBjb21wYXJlIHRoZVxuICogdmFsdWUgb2YgdHdvIGl0ZW1zLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW0gd2l0aCB0aGUgc21hbGxlc3QgdmFsdWUuXG4gKiBAbWV0aG9kIG1pblxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pbjxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBjb21wYXJlcj86ICh4OiBULCB5OiBUKSA9PiBudW1iZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgY29uc3QgbWluOiAoeDogVCwgeTogVCkgPT4gVCA9ICh0eXBlb2YgY29tcGFyZXIgPT09ICdmdW5jdGlvbicpXG4gICAgPyAoeCwgeSkgPT4gY29tcGFyZXIoeCwgeSkgPCAwID8geCA6IHlcbiAgICA6ICh4LCB5KSA9PiB4IDwgeSA/IHggOiB5O1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZWR1Y2VPcGVyYXRvcihtaW4pKTtcbn1cbiJdfQ==