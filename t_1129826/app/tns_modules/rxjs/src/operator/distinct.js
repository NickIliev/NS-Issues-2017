"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
var Set_1 = require("../util/Set");
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 *
 * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
 * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
 * source observable directly with an equality check against previous values.
 *
 * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
 *
 * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
 * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
 * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
 * that the internal `Set` can be "flushed", basically clearing it of values.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
 *   .distinct()
 *   .subscribe(x => console.log(x)); // 1, 2, 3, 4
 *
 * @example <caption>An example using a keySelector function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     .distinct((p: Person) => p.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 *
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [keySelector] Optional function to select which value you want to check as distinct.
 * @param {Observable} [flushes] Optional Observable for flushing the internal HashSet of the operator.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinct
 * @owner Observable
 */
function distinct(keySelector, flushes) {
    return this.lift(new DistinctOperator(keySelector, flushes));
}
exports.distinct = distinct;
var DistinctOperator = (function () {
    function DistinctOperator(keySelector, flushes) {
        this.keySelector = keySelector;
        this.flushes = flushes;
    }
    DistinctOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
    };
    return DistinctOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctSubscriber = (function (_super) {
    __extends(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, keySelector, flushes) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.values = new Set_1.Set();
        if (flushes) {
            _this.add(subscribeToResult_1.subscribeToResult(_this, flushes));
        }
        return _this;
    }
    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
    };
    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DistinctSubscriber.prototype._next = function (value) {
        if (this.keySelector) {
            this._useKeySelector(value);
        }
        else {
            this._finalizeNext(value, value);
        }
    };
    DistinctSubscriber.prototype._useKeySelector = function (value) {
        var key;
        var destination = this.destination;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this._finalizeNext(key, value);
    };
    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
        var values = this.values;
        if (!values.has(key)) {
            values.add(key);
            this.destination.next(value);
        }
    };
    return DistinctSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.DistinctSubscriber = DistinctSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdGluY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXN0aW5jdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFDOUQsbUNBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILGtCQUMrQixXQUE2QixFQUM3QixPQUF5QjtJQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFKRCw0QkFJQztBQUVEO0lBQ0UsMEJBQW9CLFdBQTRCLEVBQVUsT0FBd0I7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7SUFDbEYsQ0FBQztJQUVELCtCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEOzs7O0dBSUc7QUFDSDtJQUE4QyxzQ0FBcUI7SUFHakUsNEJBQVksV0FBMEIsRUFBVSxXQUE0QixFQUFFLE9BQXdCO1FBQXRHLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBS25CO1FBTitDLGlCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUZwRSxZQUFNLEdBQVksSUFBSSxTQUFHLEVBQUssQ0FBQztRQUtyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osS0FBSSxDQUFDLEdBQUcsQ0FBQyxxQ0FBaUIsQ0FBQyxLQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDOztJQUNILENBQUM7SUFFRCx1Q0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFDNUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx3Q0FBVyxHQUFYLFVBQVksS0FBVSxFQUFFLFFBQStCO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVTLGtDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRU8sNENBQWUsR0FBdkIsVUFBd0IsS0FBUTtRQUM5QixJQUFJLEdBQU0sQ0FBQztRQUNILElBQUEsOEJBQVcsQ0FBVTtRQUM3QixJQUFJLENBQUM7WUFDSCxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTywwQ0FBYSxHQUFyQixVQUFzQixHQUFRLEVBQUUsS0FBUTtRQUM5QixJQUFBLG9CQUFNLENBQVU7UUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUgseUJBQUM7QUFBRCxDQUFDLEFBakRELENBQThDLGlDQUFlLEdBaUQ1RDtBQWpEWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgSVNldCwgU2V0IH0gZnJvbSAnLi4vdXRpbC9TZXQnO1xuXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGFsbCBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IGFyZSBkaXN0aW5jdCBieSBjb21wYXJpc29uIGZyb20gcHJldmlvdXMgaXRlbXMuXG4gKlxuICogSWYgYSBrZXlTZWxlY3RvciBmdW5jdGlvbiBpcyBwcm92aWRlZCwgdGhlbiBpdCB3aWxsIHByb2plY3QgZWFjaCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSBpbnRvIGEgbmV3IHZhbHVlIHRoYXQgaXQgd2lsbFxuICogY2hlY2sgZm9yIGVxdWFsaXR5IHdpdGggcHJldmlvdXNseSBwcm9qZWN0ZWQgdmFsdWVzLiBJZiBhIGtleVNlbGVjdG9yIGZ1bmN0aW9uIGlzIG5vdCBwcm92aWRlZCwgaXQgd2lsbCB1c2UgZWFjaCB2YWx1ZSBmcm9tIHRoZVxuICogc291cmNlIG9ic2VydmFibGUgZGlyZWN0bHkgd2l0aCBhbiBlcXVhbGl0eSBjaGVjayBhZ2FpbnN0IHByZXZpb3VzIHZhbHVlcy5cbiAqXG4gKiBJbiBKYXZhU2NyaXB0IHJ1bnRpbWVzIHRoYXQgc3VwcG9ydCBgU2V0YCwgdGhpcyBvcGVyYXRvciB3aWxsIHVzZSBhIGBTZXRgIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Ugb2YgdGhlIGRpc3RpbmN0IHZhbHVlIGNoZWNraW5nLlxuICpcbiAqIEluIG90aGVyIHJ1bnRpbWVzLCB0aGlzIG9wZXJhdG9yIHdpbGwgdXNlIGEgbWluaW1hbCBpbXBsZW1lbnRhdGlvbiBvZiBgU2V0YCB0aGF0IHJlbGllcyBvbiBhbiBgQXJyYXlgIGFuZCBgaW5kZXhPZmAgdW5kZXIgdGhlXG4gKiBob29kLCBzbyBwZXJmb3JtYW5jZSB3aWxsIGRlZ3JhZGUgYXMgbW9yZSB2YWx1ZXMgYXJlIGNoZWNrZWQgZm9yIGRpc3RpbmN0aW9uLiBFdmVuIGluIG5ld2VyIGJyb3dzZXJzLCBhIGxvbmctcnVubmluZyBgZGlzdGluY3RgXG4gKiB1c2UgbWlnaHQgcmVzdWx0IGluIG1lbW9yeSBsZWFrcy4gVG8gaGVscCBhbGxldmlhdGUgdGhpcyBpbiBzb21lIHNjZW5hcmlvcywgYW4gb3B0aW9uYWwgYGZsdXNoZXNgIHBhcmFtZXRlciBpcyBhbHNvIHByb3ZpZGVkIHNvXG4gKiB0aGF0IHRoZSBpbnRlcm5hbCBgU2V0YCBjYW4gYmUgXCJmbHVzaGVkXCIsIGJhc2ljYWxseSBjbGVhcmluZyBpdCBvZiB2YWx1ZXMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+QSBzaW1wbGUgZXhhbXBsZSB3aXRoIG51bWJlcnM8L2NhcHRpb24+XG4gKiBPYnNlcnZhYmxlLm9mKDEsIDEsIDIsIDIsIDIsIDEsIDIsIDMsIDQsIDMsIDIsIDEpXG4gKiAgIC5kaXN0aW5jdCgpXG4gKiAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7IC8vIDEsIDIsIDMsIDRcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BbiBleGFtcGxlIHVzaW5nIGEga2V5U2VsZWN0b3IgZnVuY3Rpb248L2NhcHRpb24+XG4gKiBpbnRlcmZhY2UgUGVyc29uIHtcbiAqICAgIGFnZTogbnVtYmVyLFxuICogICAgbmFtZTogc3RyaW5nXG4gKiB9XG4gKlxuICogT2JzZXJ2YWJsZS5vZjxQZXJzb24+KFxuICogICAgIHsgYWdlOiA0LCBuYW1lOiAnRm9vJ30sXG4gKiAgICAgeyBhZ2U6IDcsIG5hbWU6ICdCYXInfSxcbiAqICAgICB7IGFnZTogNSwgbmFtZTogJ0Zvbyd9KVxuICogICAgIC5kaXN0aW5jdCgocDogUGVyc29uKSA9PiBwLm5hbWUpXG4gKiAgICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBkaXNwbGF5czpcbiAqIC8vIHsgYWdlOiA0LCBuYW1lOiAnRm9vJyB9XG4gKiAvLyB7IGFnZTogNywgbmFtZTogJ0JhcicgfVxuICpcbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbEtleUNoYW5nZWR9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2tleVNlbGVjdG9yXSBPcHRpb25hbCBmdW5jdGlvbiB0byBzZWxlY3Qgd2hpY2ggdmFsdWUgeW91IHdhbnQgdG8gY2hlY2sgYXMgZGlzdGluY3QuXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IFtmbHVzaGVzXSBPcHRpb25hbCBPYnNlcnZhYmxlIGZvciBmbHVzaGluZyB0aGUgaW50ZXJuYWwgSGFzaFNldCBvZiB0aGUgb3BlcmF0b3IuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aCBkaXN0aW5jdCB2YWx1ZXMuXG4gKiBAbWV0aG9kIGRpc3RpbmN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzdGluY3Q8VCwgSz4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlTZWxlY3Rvcj86ICh2YWx1ZTogVCkgPT4gSyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbHVzaGVzPzogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IERpc3RpbmN0T3BlcmF0b3Ioa2V5U2VsZWN0b3IsIGZsdXNoZXMpKTtcbn1cblxuY2xhc3MgRGlzdGluY3RPcGVyYXRvcjxULCBLPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLCBwcml2YXRlIGZsdXNoZXM6IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBEaXN0aW5jdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5rZXlTZWxlY3RvciwgdGhpcy5mbHVzaGVzKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBEaXN0aW5jdFN1YnNjcmliZXI8VCwgSz4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgVD4ge1xuICBwcml2YXRlIHZhbHVlczogSVNldDxLPiA9IG5ldyBTZXQ8Sz4oKTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPiwgcHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLCBmbHVzaGVzOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG5cbiAgICBpZiAoZmx1c2hlcykge1xuICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgZmx1c2hlcykpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogVCxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIFQ+KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZXMuY2xlYXIoKTtcbiAgfVxuXG4gIG5vdGlmeUVycm9yKGVycm9yOiBhbnksIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgVD4pOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvcihlcnJvcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5rZXlTZWxlY3Rvcikge1xuICAgICAgdGhpcy5fdXNlS2V5U2VsZWN0b3IodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maW5hbGl6ZU5leHQodmFsdWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91c2VLZXlTZWxlY3Rvcih2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCBrZXk6IEs7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICB0cnkge1xuICAgICAga2V5ID0gdGhpcy5rZXlTZWxlY3Rvcih2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9maW5hbGl6ZU5leHQoa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5hbGl6ZU5leHQoa2V5OiBLfFQsIHZhbHVlOiBUKSB7XG4gICAgY29uc3QgeyB2YWx1ZXMgfSA9IHRoaXM7XG4gICAgaWYgKCF2YWx1ZXMuaGFzKDxLPmtleSkpIHtcbiAgICAgIHZhbHVlcy5hZGQoPEs+a2V5KTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==