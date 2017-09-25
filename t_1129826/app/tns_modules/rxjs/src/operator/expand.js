"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/* tslint:enable:max-line-length */
/**
 * Recursively projects each source value to an Observable which is merged in
 * the output Observable.
 *
 * <span class="informal">It's similar to {@link mergeMap}, but applies the
 * projection function to every source value as well as every output value.
 * It's recursive.</span>
 *
 * <img src="./img/expand.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger. *Expand* will re-emit on the output
 * Observable every source value. Then, each output value is given to the
 * `project` function which returns an inner Observable to be merged on the
 * output Observable. Those output values resulting from the projection are also
 * given to the `project` function to produce new output values. This is how
 * *expand* behaves recursively.
 *
 * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var powersOfTwo = clicks
 *   .mapTo(1)
 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
 *   .take(10);
 * powersOfTwo.subscribe(x => console.log(x));
 *
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 *
 * @param {function(value: T, index: number) => Observable} project A function
 * that, when applied to an item emitted by the source or the output Observable,
 * returns an Observable.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
 * each projected inner Observable.
 * @return {Observable} An Observable that emits the source values and also
 * result of applying the projection function to each value emitted on the
 * output Observable and and merging the results of the Observables obtained
 * from this transformation.
 * @method expand
 * @owner Observable
 */
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (scheduler === void 0) { scheduler = undefined; }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
}
exports.expand = expand;
var ExpandOperator = (function () {
    function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
}());
exports.ExpandOperator = ExpandOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ExpandSubscriber = (function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.scheduler = scheduler;
        _this.index = 0;
        _this.active = 0;
        _this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            _this.buffer = [];
        }
        return _this;
    }
    ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.closed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            var result = tryCatch_1.tryCatch(this.project)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            }
            else {
                var state = { subscriber: this, result: result, value: value, index: index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return ExpandSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.ExpandSubscriber = ExpandSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsNkNBQTRDO0FBQzVDLG1EQUFrRDtBQUVsRCxzREFBcUQ7QUFFckQsK0RBQThEO0FBSzlELG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxnQkFBa0QsT0FBbUQsRUFDeEUsVUFBNkMsRUFDN0MsU0FBaUM7SUFEakMsMkJBQUEsRUFBQSxhQUFxQixNQUFNLENBQUMsaUJBQWlCO0lBQzdDLDBCQUFBLEVBQUEscUJBQWlDO0lBQzVELFVBQVUsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztJQUUzRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQU5ELHdCQU1DO0FBRUQ7SUFDRSx3QkFBb0IsT0FBbUQsRUFDbkQsVUFBa0IsRUFDbEIsU0FBcUI7UUFGckIsWUFBTyxHQUFQLE9BQU8sQ0FBNEM7UUFDbkQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQ3pDLENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLHdDQUFjO0FBa0IzQjs7OztHQUlHO0FB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LElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRCxxQ0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFDNUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx5Q0FBYyxHQUFkLFVBQWUsUUFBc0I7UUFDbkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTNFRCxDQUE0QyxpQ0FBZSxHQTJFMUQ7QUEzRVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHByb2plY3Q6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxUPiwgY29uY3VycmVudD86IG51bWJlciwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kPFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIHByb2plY3Q6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxSPiwgY29uY3VycmVudD86IG51bWJlciwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IHByb2plY3RzIGVhY2ggc291cmNlIHZhbHVlIHRvIGFuIE9ic2VydmFibGUgd2hpY2ggaXMgbWVyZ2VkIGluXG4gKiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3Mgc2ltaWxhciB0byB7QGxpbmsgbWVyZ2VNYXB9LCBidXQgYXBwbGllcyB0aGVcbiAqIHByb2plY3Rpb24gZnVuY3Rpb24gdG8gZXZlcnkgc291cmNlIHZhbHVlIGFzIHdlbGwgYXMgZXZlcnkgb3V0cHV0IHZhbHVlLlxuICogSXQncyByZWN1cnNpdmUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZXhwYW5kLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIGJhc2VkIG9uIGFwcGx5aW5nIGEgZnVuY3Rpb24gdGhhdCB5b3VcbiAqIHN1cHBseSB0byBlYWNoIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHdoZXJlIHRoYXQgZnVuY3Rpb25cbiAqIHJldHVybnMgYW4gT2JzZXJ2YWJsZSwgYW5kIHRoZW4gbWVyZ2luZyB0aG9zZSByZXN1bHRpbmcgT2JzZXJ2YWJsZXMgYW5kXG4gKiBlbWl0dGluZyB0aGUgcmVzdWx0cyBvZiB0aGlzIG1lcmdlci4gKkV4cGFuZCogd2lsbCByZS1lbWl0IG9uIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgZXZlcnkgc291cmNlIHZhbHVlLiBUaGVuLCBlYWNoIG91dHB1dCB2YWx1ZSBpcyBnaXZlbiB0byB0aGVcbiAqIGBwcm9qZWN0YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIGlubmVyIE9ic2VydmFibGUgdG8gYmUgbWVyZ2VkIG9uIHRoZVxuICogb3V0cHV0IE9ic2VydmFibGUuIFRob3NlIG91dHB1dCB2YWx1ZXMgcmVzdWx0aW5nIGZyb20gdGhlIHByb2plY3Rpb24gYXJlIGFsc29cbiAqIGdpdmVuIHRvIHRoZSBgcHJvamVjdGAgZnVuY3Rpb24gdG8gcHJvZHVjZSBuZXcgb3V0cHV0IHZhbHVlcy4gVGhpcyBpcyBob3dcbiAqICpleHBhbmQqIGJlaGF2ZXMgcmVjdXJzaXZlbHkuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U3RhcnQgZW1pdHRpbmcgdGhlIHBvd2VycyBvZiB0d28gb24gZXZlcnkgY2xpY2ssIGF0IG1vc3QgMTAgb2YgdGhlbTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcG93ZXJzT2ZUd28gPSBjbGlja3NcbiAqICAgLm1hcFRvKDEpXG4gKiAgIC5leHBhbmQoeCA9PiBSeC5PYnNlcnZhYmxlLm9mKDIgKiB4KS5kZWxheSgxMDAwKSlcbiAqICAgLnRha2UoMTApO1xuICogcG93ZXJzT2ZUd28uc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VTY2FufVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IE9ic2VydmFibGV9IHByb2plY3QgQSBmdW5jdGlvblxuICogdGhhdCwgd2hlbiBhcHBsaWVkIHRvIGFuIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIG9yIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSxcbiAqIHJldHVybnMgYW4gT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlucHV0XG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPW51bGxdIFRoZSBJU2NoZWR1bGVyIHRvIHVzZSBmb3Igc3Vic2NyaWJpbmcgdG9cbiAqIGVhY2ggcHJvamVjdGVkIGlubmVyIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHNvdXJjZSB2YWx1ZXMgYW5kIGFsc29cbiAqIHJlc3VsdCBvZiBhcHBseWluZyB0aGUgcHJvamVjdGlvbiBmdW5jdGlvbiB0byBlYWNoIHZhbHVlIGVtaXR0ZWQgb24gdGhlXG4gKiBvdXRwdXQgT2JzZXJ2YWJsZSBhbmQgYW5kIG1lcmdpbmcgdGhlIHJlc3VsdHMgb2YgdGhlIE9ic2VydmFibGVzIG9idGFpbmVkXG4gKiBmcm9tIHRoaXMgdHJhbnNmb3JtYXRpb24uXG4gKiBAbWV0aG9kIGV4cGFuZFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZDxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcm9qZWN0OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IE9ic2VydmFibGU8Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmN1cnJlbnQ6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyOiBJU2NoZWR1bGVyID0gdW5kZWZpbmVkKTogT2JzZXJ2YWJsZTxSPiB7XG4gIGNvbmN1cnJlbnQgPSAoY29uY3VycmVudCB8fCAwKSA8IDEgPyBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgOiBjb25jdXJyZW50O1xuXG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEV4cGFuZE9wZXJhdG9yKHByb2plY3QsIGNvbmN1cnJlbnQsIHNjaGVkdWxlcikpO1xufVxuXG5leHBvcnQgY2xhc3MgRXhwYW5kT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvamVjdDogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPFI+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmN1cnJlbnQ6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IElTY2hlZHVsZXIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBFeHBhbmRTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJvamVjdCwgdGhpcy5jb25jdXJyZW50LCB0aGlzLnNjaGVkdWxlcikpO1xuICB9XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaEFyZzxULCBSPiB7XG4gIHN1YnNjcmliZXI6IEV4cGFuZFN1YnNjcmliZXI8VCwgUj47XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxSPjtcbiAgdmFsdWU6IGFueTtcbiAgaW5kZXg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBFeHBhbmRTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFI+IHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBhY3RpdmU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgaGFzQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYnVmZmVyOiBhbnlbXTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcm9qZWN0OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IE9ic2VydmFibGU8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uY3VycmVudDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICBpZiAoY29uY3VycmVudCA8IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBkaXNwYXRjaDxULCBSPihhcmc6IERpc3BhdGNoQXJnPFQsIFI+KTogdm9pZCB7XG4gICAgY29uc3Qge3N1YnNjcmliZXIsIHJlc3VsdCwgdmFsdWUsIGluZGV4fSA9IGFyZztcbiAgICBzdWJzY3JpYmVyLnN1YnNjcmliZVRvUHJvamVjdGlvbihyZXN1bHQsIHZhbHVlLCBpbmRleCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcblxuICAgIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4Kys7XG4gICAgaWYgKHRoaXMuYWN0aXZlIDwgdGhpcy5jb25jdXJyZW50KSB7XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgIGxldCByZXN1bHQgPSB0cnlDYXRjaCh0aGlzLnByb2plY3QpKHZhbHVlLCBpbmRleCk7XG4gICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc2NoZWR1bGVyKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9Qcm9qZWN0aW9uKHJlc3VsdCwgdmFsdWUsIGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHN0YXRlOiBEaXNwYXRjaEFyZzxULCBSPiA9IHsgc3Vic2NyaWJlcjogdGhpcywgcmVzdWx0LCB2YWx1ZSwgaW5kZXggfTtcbiAgICAgICAgdGhpcy5hZGQodGhpcy5zY2hlZHVsZXIuc2NoZWR1bGUoRXhwYW5kU3Vic2NyaWJlci5kaXNwYXRjaCwgMCwgc3RhdGUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Byb2plY3Rpb24ocmVzdWx0OiBhbnksIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmUrKztcbiAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdDxULCBSPih0aGlzLCByZXN1bHQsIHZhbHVlLCBpbmRleCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuaGFzQ29tcGxldGVkICYmIHRoaXMuYWN0aXZlID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLl9uZXh0KGlubmVyVmFsdWUpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMucmVtb3ZlKGlubmVyU3ViKTtcbiAgICB0aGlzLmFjdGl2ZS0tO1xuICAgIGlmIChidWZmZXIgJiYgYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX25leHQoYnVmZmVyLnNoaWZ0KCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oYXNDb21wbGV0ZWQgJiYgdGhpcy5hY3RpdmUgPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==