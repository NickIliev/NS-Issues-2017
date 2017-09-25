"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
 *   .distinctUntilChanged()
 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
 *
 * @example <caption>An example using a compare function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.hasKey = false;
        if (typeof compare === 'function') {
            _this.compare = compare;
        }
        return _this;
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdGluY3RVbnRpbENoYW5nZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXN0aW5jdFVudGlsQ2hhbmdlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUEyQztBQUMzQyw2Q0FBNEM7QUFDNUMsbURBQWtEO0FBT2xELG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFDSCw4QkFBZ0UsT0FBaUMsRUFBRSxXQUF5QjtJQUMxSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLDRCQUE0QixDQUFPLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ2pGLENBQUM7QUFGRCxvREFFQztBQUVEO0lBQ0Usc0NBQW9CLE9BQWdDLEVBQ2hDLFdBQXdCO1FBRHhCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQzVDLENBQUM7SUFFRCwyQ0FBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksOEJBQThCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFBbUQsa0RBQWE7SUFJOUQsd0NBQVksV0FBMEIsRUFDMUIsT0FBZ0MsRUFDeEIsV0FBd0I7UUFGNUMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FJbkI7UUFMbUIsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFKcEMsWUFBTSxHQUFZLEtBQUssQ0FBQztRQU05QixFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUM7O0lBQ0gsQ0FBQztJQUVPLGdEQUFPLEdBQWYsVUFBZ0IsQ0FBTSxFQUFFLENBQU07UUFDNUIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVTLDhDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUV0QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksR0FBRyxHQUFRLEtBQUssQ0FBQztRQUVyQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUsseUJBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDSCxDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQVEsS0FBSyxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyx5QkFBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBQ0gscUNBQUM7QUFBRCxDQUFDLEFBN0NELENBQW1ELHVCQUFVLEdBNkM1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9lcnJvck9iamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gZGlzdGluY3RVbnRpbENoYW5nZWQ8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgY29tcGFyZT86ICh4OiBULCB5OiBUKSA9PiBib29sZWFuKTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBkaXN0aW5jdFVudGlsQ2hhbmdlZDxULCBLPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBjb21wYXJlOiAoeDogSywgeTogSykgPT4gYm9vbGVhbiwga2V5U2VsZWN0b3I6ICh4OiBUKSA9PiBLKTogT2JzZXJ2YWJsZTxUPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYWxsIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgYXJlIGRpc3RpbmN0IGJ5IGNvbXBhcmlzb24gZnJvbSB0aGUgcHJldmlvdXMgaXRlbS5cbiAqXG4gKiBJZiBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggaXRlbSB0byB0ZXN0IGZvciB3aGV0aGVyIG9yIG5vdCB0aGF0IHZhbHVlIHNob3VsZCBiZSBlbWl0dGVkLlxuICpcbiAqIElmIGEgY29tcGFyYXRvciBmdW5jdGlvbiBpcyBub3QgcHJvdmlkZWQsIGFuIGVxdWFsaXR5IGNoZWNrIGlzIHVzZWQgYnkgZGVmYXVsdC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BIHNpbXBsZSBleGFtcGxlIHdpdGggbnVtYmVyczwvY2FwdGlvbj5cbiAqIE9ic2VydmFibGUub2YoMSwgMSwgMiwgMiwgMiwgMSwgMSwgMiwgMywgMywgNClcbiAqICAgLmRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTsgLy8gMSwgMiwgMSwgMiwgMywgNFxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFuIGV4YW1wbGUgdXNpbmcgYSBjb21wYXJlIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICogaW50ZXJmYWNlIFBlcnNvbiB7XG4gKiAgICBhZ2U6IG51bWJlcixcbiAqICAgIG5hbWU6IHN0cmluZ1xuICogfVxuICpcbiAqIE9ic2VydmFibGUub2Y8UGVyc29uPihcbiAqICAgICB7IGFnZTogNCwgbmFtZTogJ0Zvbyd9LFxuICogICAgIHsgYWdlOiA3LCBuYW1lOiAnQmFyJ30sXG4gKiAgICAgeyBhZ2U6IDUsIG5hbWU6ICdGb28nfSlcbiAqICAgICB7IGFnZTogNiwgbmFtZTogJ0Zvbyd9KVxuICogICAgIC5kaXN0aW5jdFVudGlsQ2hhbmdlZCgocDogUGVyc29uLCBxOiBQZXJzb24pID0+IHAubmFtZSA9PT0gcS5uYW1lKVxuICogICAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gZGlzcGxheXM6XG4gKiAvLyB7IGFnZTogNCwgbmFtZTogJ0ZvbycgfVxuICogLy8geyBhZ2U6IDcsIG5hbWU6ICdCYXInIH1cbiAqIC8vIHsgYWdlOiA1LCBuYW1lOiAnRm9vJyB9XG4gKlxuICogQHNlZSB7QGxpbmsgZGlzdGluY3R9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY29tcGFyZV0gT3B0aW9uYWwgY29tcGFyaXNvbiBmdW5jdGlvbiBjYWxsZWQgdG8gdGVzdCBpZiBhbiBpdGVtIGlzIGRpc3RpbmN0IGZyb20gdGhlIHByZXZpb3VzIGl0ZW0gaW4gdGhlIHNvdXJjZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoIGRpc3RpbmN0IHZhbHVlcy5cbiAqIEBtZXRob2QgZGlzdGluY3RVbnRpbENoYW5nZWRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXN0aW5jdFVudGlsQ2hhbmdlZDxULCBLPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBjb21wYXJlPzogKHg6IEssIHk6IEspID0+IGJvb2xlYW4sIGtleVNlbGVjdG9yPzogKHg6IFQpID0+IEspOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRGlzdGluY3RVbnRpbENoYW5nZWRPcGVyYXRvcjxULCBLPihjb21wYXJlLCBrZXlTZWxlY3RvcikpO1xufVxuXG5jbGFzcyBEaXN0aW5jdFVudGlsQ2hhbmdlZE9wZXJhdG9yPFQsIEs+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBhcmU6ICh4OiBLLCB5OiBLKSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIGtleVNlbGVjdG9yOiAoeDogVCkgPT4gSykge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBEaXN0aW5jdFVudGlsQ2hhbmdlZFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5jb21wYXJlLCB0aGlzLmtleVNlbGVjdG9yKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIERpc3RpbmN0VW50aWxDaGFuZ2VkU3Vic2NyaWJlcjxULCBLPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGtleTogSztcbiAgcHJpdmF0ZSBoYXNLZXk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgY29tcGFyZTogKHg6IEssIHk6IEspID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUga2V5U2VsZWN0b3I6ICh4OiBUKSA9PiBLKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIGlmICh0eXBlb2YgY29tcGFyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5jb21wYXJlID0gY29tcGFyZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbXBhcmUoeDogYW55LCB5OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4geCA9PT0geTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuXG4gICAgY29uc3Qga2V5U2VsZWN0b3IgPSB0aGlzLmtleVNlbGVjdG9yO1xuICAgIGxldCBrZXk6IGFueSA9IHZhbHVlO1xuXG4gICAgaWYgKGtleVNlbGVjdG9yKSB7XG4gICAgICBrZXkgPSB0cnlDYXRjaCh0aGlzLmtleVNlbGVjdG9yKSh2YWx1ZSk7XG4gICAgICBpZiAoa2V5ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0OiBhbnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmhhc0tleSkge1xuICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2godGhpcy5jb21wYXJlKSh0aGlzLmtleSwga2V5KTtcbiAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0tleSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKEJvb2xlYW4ocmVzdWx0KSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==