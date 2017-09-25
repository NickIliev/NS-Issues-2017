"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = require("../util/isArray");
var isArrayLike_1 = require("../util/isArrayLike");
var isPromise_1 = require("../util/isPromise");
var PromiseObservable_1 = require("./PromiseObservable");
var IteratorObservable_1 = require("./IteratorObservable");
var ArrayObservable_1 = require("./ArrayObservable");
var ArrayLikeObservable_1 = require("./ArrayLikeObservable");
var iterator_1 = require("../symbol/iterator");
var Observable_1 = require("../Observable");
var observeOn_1 = require("../operator/observeOn");
var observable_1 = require("../symbol/observable");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        var _this = _super.call(this, null) || this;
        _this.ish = ish;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable_1.observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike_1.isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJvbU9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGcm9tT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEwQztBQUMxQyxtREFBa0Q7QUFDbEQsK0NBQThDO0FBQzlDLHlEQUF3RDtBQUN4RCwyREFBeUQ7QUFDekQscURBQW9EO0FBQ3BELDZEQUE0RDtBQUc1RCwrQ0FBaUU7QUFDakUsNENBQTREO0FBRTVELG1EQUE0RDtBQUM1RCxtREFBdUU7QUFFdkU7Ozs7R0FJRztBQUNIO0lBQXVDLGtDQUFhO0lBQ2xELHdCQUFvQixHQUF1QixFQUFVLFNBQXNCO1FBQTNFLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBQ1o7UUFGbUIsU0FBRyxHQUFILEdBQUcsQ0FBb0I7UUFBVSxlQUFTLEdBQVQsU0FBUyxDQUFhOztJQUUzRSxDQUFDO0lBS0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1REc7SUFDSSxxQkFBTSxHQUFiLFVBQWlCLEdBQXVCLEVBQUUsU0FBc0I7UUFDOUQsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsdUJBQWlCLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksdUJBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsQ0FBQztnQkFDRCxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLGlDQUFlLENBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMscUJBQVMsQ0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLHFDQUFpQixDQUFJLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLG1CQUFlLENBQUMsS0FBSyxVQUFVLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDakYsTUFBTSxDQUFDLElBQUksdUNBQWtCLENBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMseUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxJQUFJLHlDQUFtQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVTLG1DQUFVLEdBQXBCLFVBQXFCLFVBQXlCO1FBQzVDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUFpQixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBaUIsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksK0JBQW1CLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9GLENBQUM7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBOUZELENBQXVDLHVCQUFVLEdBOEZoRDtBQTlGWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvaXNQcm9taXNlJztcbmltcG9ydCB7IFByb21pc2VPYnNlcnZhYmxlIH0gZnJvbSAnLi9Qcm9taXNlT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBJdGVyYXRvck9ic2VydmFibGUgfSBmcm9tJy4vSXRlcmF0b3JPYnNlcnZhYmxlJztcbmltcG9ydCB7IEFycmF5T2JzZXJ2YWJsZSB9IGZyb20gJy4vQXJyYXlPYnNlcnZhYmxlJztcbmltcG9ydCB7IEFycmF5TGlrZU9ic2VydmFibGUgfSBmcm9tICcuL0FycmF5TGlrZU9ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IGl0ZXJhdG9yIGFzIFN5bWJvbF9pdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXQgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmVPblN1YnNjcmliZXIgfSBmcm9tICcuLi9vcGVyYXRvci9vYnNlcnZlT24nO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBGcm9tT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlzaDogT2JzZXJ2YWJsZUlucHV0PFQ+LCBwcml2YXRlIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGU8VD4oaXNoOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFI+KGlzaDogQXJyYXlMaWtlPFQ+LCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxSPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGZyb20gYW4gQXJyYXksIGFuIGFycmF5LWxpa2Ugb2JqZWN0LCBhIFByb21pc2UsIGFuXG4gICAqIGl0ZXJhYmxlIG9iamVjdCwgb3IgYW4gT2JzZXJ2YWJsZS1saWtlIG9iamVjdC5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbnZlcnRzIGFsbW9zdCBhbnl0aGluZyB0byBhbiBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAgICpcbiAgICogPGltZyBzcmM9XCIuL2ltZy9mcm9tLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgKlxuICAgKiBDb252ZXJ0IHZhcmlvdXMgb3RoZXIgb2JqZWN0cyBhbmQgZGF0YSB0eXBlcyBpbnRvIE9ic2VydmFibGVzLiBgZnJvbWBcbiAgICogY29udmVydHMgYSBQcm9taXNlIG9yIGFuIGFycmF5LWxpa2Ugb3IgYW5cbiAgICogW2l0ZXJhYmxlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9JdGVyYXRpb25fcHJvdG9jb2xzI2l0ZXJhYmxlKVxuICAgKiBvYmplY3QgaW50byBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGl0ZW1zIGluIHRoYXQgcHJvbWlzZSBvciBhcnJheSBvclxuICAgKiBpdGVyYWJsZS4gQSBTdHJpbmcsIGluIHRoaXMgY29udGV4dCwgaXMgdHJlYXRlZCBhcyBhbiBhcnJheSBvZiBjaGFyYWN0ZXJzLlxuICAgKiBPYnNlcnZhYmxlLWxpa2Ugb2JqZWN0cyAoY29udGFpbnMgYSBmdW5jdGlvbiBuYW1lZCB3aXRoIHRoZSBFUzIwMTUgU3ltYm9sXG4gICAqIGZvciBPYnNlcnZhYmxlKSBjYW4gYWxzbyBiZSBjb252ZXJ0ZWQgdGhyb3VnaCB0aGlzIG9wZXJhdG9yLlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0cyBhbiBhcnJheSB0byBhbiBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICAgKiB2YXIgYXJyYXkgPSBbMTAsIDIwLCAzMF07XG4gICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLmZyb20oYXJyYXkpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiAvLyBSZXN1bHRzIGluIHRoZSBmb2xsb3dpbmc6XG4gICAqIC8vIDEwIDIwIDMwXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnQgYW4gaW5maW5pdGUgaXRlcmFibGUgKGZyb20gYSBnZW5lcmF0b3IpIHRvIGFuIE9ic2VydmFibGU8L2NhcHRpb24+XG4gICAqIGZ1bmN0aW9uKiBnZW5lcmF0ZURvdWJsZXMoc2VlZCkge1xuICAgKiAgIHZhciBpID0gc2VlZDtcbiAgICogICB3aGlsZSAodHJ1ZSkge1xuICAgKiAgICAgeWllbGQgaTtcbiAgICogICAgIGkgPSAyICogaTsgLy8gZG91YmxlIGl0XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHZhciBpdGVyYXRvciA9IGdlbmVyYXRlRG91YmxlcygzKTtcbiAgICogdmFyIHJlc3VsdCA9IFJ4Lk9ic2VydmFibGUuZnJvbShpdGVyYXRvcikudGFrZSgxMCk7XG4gICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAqXG4gICAqIC8vIFJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZzpcbiAgICogLy8gMyA2IDEyIDI0IDQ4IDk2IDE5MiAzODQgNzY4IDE1MzZcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgKiBAc2VlIHtAbGluayBmcm9tRXZlbnR9XG4gICAqIEBzZWUge0BsaW5rIGZyb21FdmVudFBhdHRlcm59XG4gICAqIEBzZWUge0BsaW5rIGZyb21Qcm9taXNlfVxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmFibGVJbnB1dDxUPn0gaXNoIEEgc3Vic2NyaWJhYmxlIG9iamVjdCwgYSBQcm9taXNlLCBhblxuICAgKiBPYnNlcnZhYmxlLWxpa2UsIGFuIEFycmF5LCBhbiBpdGVyYWJsZSBvciBhbiBhcnJheS1saWtlIG9iamVjdCB0byBiZVxuICAgKiBjb252ZXJ0ZWQuXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBUaGUgc2NoZWR1bGVyIG9uIHdoaWNoIHRvIHNjaGVkdWxlIHRoZVxuICAgKiBlbWlzc2lvbnMgb2YgdmFsdWVzLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBUaGUgT2JzZXJ2YWJsZSB3aG9zZSB2YWx1ZXMgYXJlIG9yaWdpbmFsbHkgZnJvbSB0aGVcbiAgICogaW5wdXQgb2JqZWN0IHRoYXQgd2FzIGNvbnZlcnRlZC5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGZyb21cbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oaXNoOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBpZiAoaXNoICE9IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgaXNoW1N5bWJvbF9vYnNlcnZhYmxlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoaXNoIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSAmJiAhc2NoZWR1bGVyKSB7XG4gICAgICAgICAgcmV0dXJuIGlzaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEZyb21PYnNlcnZhYmxlPFQ+KGlzaCwgc2NoZWR1bGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShpc2gpKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlPFQ+KGlzaCwgc2NoZWR1bGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQcm9taXNlPFQ+KGlzaCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlT2JzZXJ2YWJsZTxUPihpc2gsIHNjaGVkdWxlcik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpc2hbU3ltYm9sX2l0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgaXNoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yT2JzZXJ2YWJsZTxUPihpc2gsIHNjaGVkdWxlcik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlMaWtlKGlzaCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUxpa2VPYnNlcnZhYmxlKGlzaCwgc2NoZWR1bGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKChpc2ggIT09IG51bGwgJiYgdHlwZW9mIGlzaCB8fCBpc2gpICsgJyBpcyBub3Qgb2JzZXJ2YWJsZScpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIGNvbnN0IGlzaCA9IHRoaXMuaXNoO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgIGlmIChzY2hlZHVsZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGlzaFtTeW1ib2xfb2JzZXJ2YWJsZV0oKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc2hbU3ltYm9sX29ic2VydmFibGVdKCkuc3Vic2NyaWJlKG5ldyBPYnNlcnZlT25TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgMCkpO1xuICAgIH1cbiAgfVxufVxuIl19