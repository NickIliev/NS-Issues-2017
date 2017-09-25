"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduce_1 = require("./reduce");
/**
 * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
 * and when source Observable completes it emits a single item: the item with the largest value.
 *
 * <img src="./img/max.png" width="100%">
 *
 * @example <caption>Get the maximal value of a series of numbers</caption>
 * Rx.Observable.of(5, 4, 7, 2, 8)
 *   .max()
 *   .subscribe(x => console.log(x)); // -> 8
 *
 * @example <caption>Use a comparer function to get the maximal item</caption>
 * interface Person {
 *   age: number,
 *   name: string
 * }
 * Observable.of<Person>({age: 7, name: 'Foo'},
 *                       {age: 5, name: 'Bar'},
 *                       {age: 9, name: 'Beer'})
 *           .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
 *           .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
 * }
 *
 * @see {@link min}
 *
 * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
 * value of two items.
 * @return {Observable} An Observable that emits item with the largest value.
 * @method max
 * @owner Observable
 */
function max(comparer) {
    var max = (typeof comparer === 'function')
        ? function (x, y) { return comparer(x, y) > 0 ? x : y; }
        : function (x, y) { return x > y ? x : y; };
    return this.lift(new reduce_1.ReduceOperator(max));
}
exports.max = max;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxhQUE0QyxRQUFpQztJQUMzRSxJQUFNLEdBQUcsR0FBc0IsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLENBQUM7VUFDM0QsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBMUIsQ0FBMEI7VUFDcEMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFiLENBQWEsQ0FBQztJQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBTEQsa0JBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSZWR1Y2VPcGVyYXRvciB9IGZyb20gJy4vcmVkdWNlJztcblxuLyoqXG4gKiBUaGUgTWF4IG9wZXJhdG9yIG9wZXJhdGVzIG9uIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBudW1iZXJzIChvciBpdGVtcyB0aGF0IGNhbiBiZSBjb21wYXJlZCB3aXRoIGEgcHJvdmlkZWQgZnVuY3Rpb24pLFxuICogYW5kIHdoZW4gc291cmNlIE9ic2VydmFibGUgY29tcGxldGVzIGl0IGVtaXRzIGEgc2luZ2xlIGl0ZW06IHRoZSBpdGVtIHdpdGggdGhlIGxhcmdlc3QgdmFsdWUuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tYXgucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IHRoZSBtYXhpbWFsIHZhbHVlIG9mIGEgc2VyaWVzIG9mIG51bWJlcnM8L2NhcHRpb24+XG4gKiBSeC5PYnNlcnZhYmxlLm9mKDUsIDQsIDcsIDIsIDgpXG4gKiAgIC5tYXgoKVxuICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpOyAvLyAtPiA4XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIGEgY29tcGFyZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSBtYXhpbWFsIGl0ZW08L2NhcHRpb24+XG4gKiBpbnRlcmZhY2UgUGVyc29uIHtcbiAqICAgYWdlOiBudW1iZXIsXG4gKiAgIG5hbWU6IHN0cmluZ1xuICogfVxuICogT2JzZXJ2YWJsZS5vZjxQZXJzb24+KHthZ2U6IDcsIG5hbWU6ICdGb28nfSxcbiAqICAgICAgICAgICAgICAgICAgICAgICB7YWdlOiA1LCBuYW1lOiAnQmFyJ30sXG4gKiAgICAgICAgICAgICAgICAgICAgICAge2FnZTogOSwgbmFtZTogJ0JlZXInfSlcbiAqICAgICAgICAgICAubWF4PFBlcnNvbj4oKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiBhLmFnZSA8IGIuYWdlID8gLTEgOiAxKVxuICogICAgICAgICAgIC5zdWJzY3JpYmUoKHg6IFBlcnNvbikgPT4gY29uc29sZS5sb2coeC5uYW1lKSk7IC8vIC0+ICdCZWVyJ1xuICogfVxuICpcbiAqIEBzZWUge0BsaW5rIG1pbn1cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyZXJdIC0gT3B0aW9uYWwgY29tcGFyZXIgZnVuY3Rpb24gdGhhdCBpdCB3aWxsIHVzZSBpbnN0ZWFkIG9mIGl0cyBkZWZhdWx0IHRvIGNvbXBhcmUgdGhlXG4gKiB2YWx1ZSBvZiB0d28gaXRlbXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbSB3aXRoIHRoZSBsYXJnZXN0IHZhbHVlLlxuICogQG1ldGhvZCBtYXhcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXg8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY29tcGFyZXI/OiAoeDogVCwgeTogVCkgPT4gbnVtYmVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gIGNvbnN0IG1heDogKHg6IFQsIHk6IFQpID0+IFQgPSAodHlwZW9mIGNvbXBhcmVyID09PSAnZnVuY3Rpb24nKVxuICAgID8gKHgsIHkpID0+IGNvbXBhcmVyKHgsIHkpID4gMCA/IHggOiB5XG4gICAgOiAoeCwgeSkgPT4geCA+IHkgPyB4IDogeTtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgUmVkdWNlT3BlcmF0b3IobWF4KSk7XG59XG4iXX0=