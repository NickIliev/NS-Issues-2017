"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/* tslint:enable:max-line-length */
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in the output Observable.
 *
 * <span class="informal">It's like {@link mergeMap}, but maps each value always
 * to the same inner Observable.</span>
 *
 * <img src="./img/mergeMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then merges those resulting Observables into one
 * single Observable, which is the output Observable.
 *
 * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 * @see {@link switchMapTo}
 *
 * @param {ObservableInput} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable.
 * @method mergeMapTo
 * @owner Observable
 */
function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
}
exports.mergeMapTo = mergeMapTo;
// TODO: Figure out correct signature here: an Operator<Observable<T>, R>
//       needs to implement call(observer: Subscriber<R>): Subscriber<Observable<T>>
var MergeMapToOperator = (function () {
    function MergeMapToOperator(ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapToOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
    };
    return MergeMapToOperator;
}());
exports.MergeMapToOperator = MergeMapToOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapToSubscriber = (function (_super) {
    __extends(MergeMapToSubscriber, _super);
    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        var _this = _super.call(this, destination) || this;
        _this.ish = ish;
        _this.resultSelector = resultSelector;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeMapToSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var resultSelector = this.resultSelector;
            var index_1 = this.index++;
            var ish = this.ish;
            var destination = this.destination;
            this.active++;
            this._innerSub(ish, destination, resultSelector, value, index_1);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapToSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    };
    MergeMapToSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        var result;
        try {
            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        destination.next(result);
    };
    MergeMapToSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapToSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapToSubscriber = MergeMapToSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VNYXBUby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lcmdlTWFwVG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxzREFBcUQ7QUFFckQsK0RBQThEO0FBSzlELG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENHO0FBQ0gsb0JBQXlELGVBQThCLEVBQ25ELGNBQXVHLEVBQ3ZHLFVBQTZDO0lBQTdDLDJCQUFBLEVBQUEsYUFBcUIsTUFBTSxDQUFDLGlCQUFpQjtJQUMvRSxFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQWMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsR0FBVyxjQUFjLENBQUM7UUFDcEMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxlQUFlLEVBQU8sY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQztBQVJELGdDQVFDO0FBRUQseUVBQXlFO0FBQ3pFLG9GQUFvRjtBQUNwRjtJQUNFLDRCQUFvQixHQUF1QixFQUN2QixjQUE0RixFQUM1RixVQUE2QztRQUE3QywyQkFBQSxFQUFBLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7UUFGN0MsUUFBRyxHQUFILEdBQUcsQ0FBb0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQThFO1FBQzVGLGVBQVUsR0FBVixVQUFVLENBQW1DO0lBQ2pFLENBQUM7SUFFRCxpQ0FBSSxHQUFKLFVBQUssUUFBdUIsRUFBRSxNQUFXO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lB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UUFDMUUsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCwwQ0FBVyxHQUFYLFVBQVksR0FBUTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFlLFFBQXNCO1FBQ25DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFqRkQsQ0FBbUQsaUNBQWUsR0FpRmpFO0FBakZZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmFibGVJbnB1dCB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBQYXJ0aWFsT2JzZXJ2ZXIgfSBmcm9tICcuLi9PYnNlcnZlcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU1hcFRvPFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIG9ic2VydmFibGU6IE9ic2VydmFibGVJbnB1dDxSPiwgY29uY3VycmVudD86IG51bWJlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNYXBUbzxULCBJLCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8ST4sIHJlc3VsdFNlbGVjdG9yOiAob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpID0+IFIsIGNvbmN1cnJlbnQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFI+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBQcm9qZWN0cyBlYWNoIHNvdXJjZSB2YWx1ZSB0byB0aGUgc2FtZSBPYnNlcnZhYmxlIHdoaWNoIGlzIG1lcmdlZCBtdWx0aXBsZVxuICogdGltZXMgaW4gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIG1lcmdlTWFwfSwgYnV0IG1hcHMgZWFjaCB2YWx1ZSBhbHdheXNcbiAqIHRvIHRoZSBzYW1lIGlubmVyIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWVyZ2VNYXBUby5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBNYXBzIGVhY2ggc291cmNlIHZhbHVlIHRvIHRoZSBnaXZlbiBPYnNlcnZhYmxlIGBpbm5lck9ic2VydmFibGVgIHJlZ2FyZGxlc3NcbiAqIG9mIHRoZSBzb3VyY2UgdmFsdWUsIGFuZCB0aGVuIG1lcmdlcyB0aG9zZSByZXN1bHRpbmcgT2JzZXJ2YWJsZXMgaW50byBvbmVcbiAqIHNpbmdsZSBPYnNlcnZhYmxlLCB3aGljaCBpcyB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Rm9yIGVhY2ggY2xpY2sgZXZlbnQsIHN0YXJ0IGFuIGludGVydmFsIE9ic2VydmFibGUgdGlja2luZyBldmVyeSAxIHNlY29uZDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLm1lcmdlTWFwVG8oUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbmNhdE1hcFRvfVxuICogQHNlZSB7QGxpbmsgbWVyZ2V9XG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VTY2FufVxuICogQHNlZSB7QGxpbmsgc3dpdGNoTWFwVG99XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlSW5wdXR9IGlubmVyT2JzZXJ2YWJsZSBBbiBPYnNlcnZhYmxlIHRvIHJlcGxhY2UgZWFjaCB2YWx1ZSBmcm9tXG4gKiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKTogYW55fSBbcmVzdWx0U2VsZWN0b3JdXG4gKiBBIGZ1bmN0aW9uIHRvIHByb2R1Y2UgdGhlIHZhbHVlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBiYXNlZCBvbiB0aGUgdmFsdWVzXG4gKiBhbmQgdGhlIGluZGljZXMgb2YgdGhlIHNvdXJjZSAob3V0ZXIpIGVtaXNzaW9uIGFuZCB0aGUgaW5uZXIgT2JzZXJ2YWJsZVxuICogZW1pc3Npb24uIFRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoaXMgZnVuY3Rpb24gYXJlOlxuICogLSBgb3V0ZXJWYWx1ZWA6IHRoZSB2YWx1ZSB0aGF0IGNhbWUgZnJvbSB0aGUgc291cmNlXG4gKiAtIGBpbm5lclZhbHVlYDogdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZVxuICogLSBgb3V0ZXJJbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBzb3VyY2VcbiAqIC0gYGlubmVySW5kZXhgOiB0aGUgXCJpbmRleFwiIG9mIHRoZSB2YWx1ZSBmcm9tIHRoZSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZVxuICogQHBhcmFtIHtudW1iZXJ9IFtjb25jdXJyZW50PU51bWJlci5QT1NJVElWRV9JTkZJTklUWV0gTWF4aW11bSBudW1iZXIgb2YgaW5wdXRcbiAqIE9ic2VydmFibGVzIGJlaW5nIHN1YnNjcmliZWQgdG8gY29uY3VycmVudGx5LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIGZyb20gdGhlIGdpdmVuXG4gKiBgaW5uZXJPYnNlcnZhYmxlYCAoYW5kIG9wdGlvbmFsbHkgdHJhbnNmb3JtZWQgdGhyb3VnaCBgcmVzdWx0U2VsZWN0b3JgKSBldmVyeVxuICogdGltZSBhIHZhbHVlIGlzIGVtaXR0ZWQgb24gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBtZXJnZU1hcFRvXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNYXBUbzxULCBJLCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBpbm5lck9ic2VydmFibGU6IE9ic2VydmFibGU8ST4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3Rvcj86ICgob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpID0+IFIpIHwgbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudDogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKTogT2JzZXJ2YWJsZTxSPiB7XG4gIGlmICh0eXBlb2YgcmVzdWx0U2VsZWN0b3IgPT09ICdudW1iZXInKSB7XG4gICAgY29uY3VycmVudCA9IDxudW1iZXI+cmVzdWx0U2VsZWN0b3I7XG4gICAgcmVzdWx0U2VsZWN0b3IgPSBudWxsO1xuICB9XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IE1lcmdlTWFwVG9PcGVyYXRvcihpbm5lck9ic2VydmFibGUsIDxhbnk+cmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpKTtcbn1cblxuLy8gVE9ETzogRmlndXJlIG91dCBjb3JyZWN0IHNpZ25hdHVyZSBoZXJlOiBhbiBPcGVyYXRvcjxPYnNlcnZhYmxlPFQ+LCBSPlxuLy8gICAgICAgbmVlZHMgdG8gaW1wbGVtZW50IGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8Uj4pOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+XG5leHBvcnQgY2xhc3MgTWVyZ2VNYXBUb09wZXJhdG9yPFQsIEksIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8T2JzZXJ2YWJsZTxUPiwgUj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlzaDogT2JzZXJ2YWJsZUlucHV0PEk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlc3VsdFNlbGVjdG9yPzogKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKSA9PiBSLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmN1cnJlbnQ6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBNZXJnZU1hcFRvU3Vic2NyaWJlcihvYnNlcnZlciwgdGhpcy5pc2gsIHRoaXMucmVzdWx0U2VsZWN0b3IsIHRoaXMuY29uY3VycmVudCkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgTWVyZ2VNYXBUb1N1YnNjcmliZXI8VCwgSSwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgST4ge1xuICBwcml2YXRlIGhhc0NvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGJ1ZmZlcjogVFtdID0gW107XG4gIHByaXZhdGUgYWN0aXZlOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgaXNoOiBPYnNlcnZhYmxlSW5wdXQ8ST4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVzdWx0U2VsZWN0b3I/OiAob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpID0+IFIsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uY3VycmVudDogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlIDwgdGhpcy5jb25jdXJyZW50KSB7XG4gICAgICBjb25zdCByZXN1bHRTZWxlY3RvciA9IHRoaXMucmVzdWx0U2VsZWN0b3I7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgrKztcbiAgICAgIGNvbnN0IGlzaCA9IHRoaXMuaXNoO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuXG4gICAgICB0aGlzLmFjdGl2ZSsrO1xuICAgICAgdGhpcy5faW5uZXJTdWIoaXNoLCBkZXN0aW5hdGlvbiwgcmVzdWx0U2VsZWN0b3IsIHZhbHVlLCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVmZmVyLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lubmVyU3ViKGlzaDogT2JzZXJ2YWJsZUlucHV0PEk+LFxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogUGFydGlhbE9ic2VydmVyPEk+LFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3RvcjogKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKSA9PiBSLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogVCxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0PFQsIEk+KHRoaXMsIGlzaCwgdmFsdWUsIGluZGV4KSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuaGFzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IDAgJiYgdGhpcy5idWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgST4pOiB2b2lkIHtcbiAgICBjb25zdCB7IHJlc3VsdFNlbGVjdG9yLCBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgIHRoaXMudHJ5U2VsZWN0UmVzdWx0KG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5U2VsZWN0UmVzdWx0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgeyByZXN1bHRTZWxlY3RvciwgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgbGV0IHJlc3VsdDogUjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0U2VsZWN0b3Iob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgfVxuXG4gIG5vdGlmeUVycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMucmVtb3ZlKGlubmVyU3ViKTtcbiAgICB0aGlzLmFjdGl2ZS0tO1xuICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fbmV4dChidWZmZXIuc2hpZnQoKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZSA9PT0gMCAmJiB0aGlzLmhhc0NvbXBsZXRlZCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19