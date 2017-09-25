"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = require("../util/isArray");
var ArrayObservable_1 = require("../observable/ArrayObservable");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables.
 * @param {...Observables} ...observables Sources used to race for which Observable emits first.
 * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
 * @method race
 * @owner Observable
 */
function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return this.lift.call(raceStatic.apply(void 0, [this].concat(observables)));
}
exports.race = race;
function raceStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    // if the only argument is an array, it was most likely called with
    // `race([obs1, obs2, ...])`
    if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        else {
            return observables[0];
        }
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
}
exports.raceStatic = raceStatic;
var RaceOperator = (function () {
    function RaceOperator() {
    }
    RaceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RaceSubscriber(subscriber));
    };
    return RaceOperator;
}());
exports.RaceOperator = RaceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RaceSubscriber = (function (_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
                var observable = observables[i];
                var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.RaceSubscriber = RaceSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBMEM7QUFDMUMsaUVBQWdFO0FBSWhFLHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFPOUQsbUNBQW1DO0FBRW5DOzs7Ozs7O0dBT0c7QUFDSDtJQUE2QyxxQkFBMkQ7U0FBM0QsVUFBMkQsRUFBM0QscUJBQTJELEVBQTNELElBQTJEO1FBQTNELGdDQUEyRDs7SUFDdEcsbUVBQW1FO0lBQ25FLDRCQUE0QjtJQUM1QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxXQUFXLEdBQXlCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsZ0JBQUksSUFBSSxTQUFLLFdBQVcsR0FBRSxDQUFDO0FBQzdELENBQUM7QUFSRCxvQkFRQztBQWFEO0lBQThCLHFCQUErRDtTQUEvRCxVQUErRCxFQUEvRCxxQkFBK0QsRUFBL0QsSUFBK0Q7UUFBL0QsZ0NBQStEOztJQUMzRixtRUFBbUU7SUFDbkUsNEJBQTRCO0lBQzVCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixXQUFXLEdBQTJCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQWtCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0s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SUFDSCxxQkFBQztBQUFELENBQUMsQUFyREQsQ0FBdUMsaUNBQWUsR0FxRHJEO0FBckRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyBBcnJheU9ic2VydmFibGUgfSBmcm9tICcuLi9vYnNlcnZhYmxlL0FycmF5T2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2U8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgb2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8VD4+KTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiByYWNlPFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIG9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlPFQ+Pik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gcmFjZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCAuLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxUPiB8IEFycmF5PE9ic2VydmFibGU8VD4+Pik6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gcmFjZTxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCAuLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+IHwgQXJyYXk8T2JzZXJ2YWJsZTxhbnk+Pj4pOiBPYnNlcnZhYmxlPFI+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBmaXJzdCBzb3VyY2UgT2JzZXJ2YWJsZSB0byBlbWl0IGFuIGl0ZW1cbiAqIGZyb20gdGhlIGNvbWJpbmF0aW9uIG9mIHRoaXMgT2JzZXJ2YWJsZSBhbmQgc3VwcGxpZWQgT2JzZXJ2YWJsZXMuXG4gKiBAcGFyYW0gey4uLk9ic2VydmFibGVzfSAuLi5vYnNlcnZhYmxlcyBTb3VyY2VzIHVzZWQgdG8gcmFjZSBmb3Igd2hpY2ggT2JzZXJ2YWJsZSBlbWl0cyBmaXJzdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBvdXRwdXQgb2YgdGhlIGZpcnN0IE9ic2VydmFibGUgdG8gZW1pdCBhbiBpdGVtLlxuICogQG1ldGhvZCByYWNlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFjZTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCAuLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxUPiB8IEFycmF5PE9ic2VydmFibGU8VD4+Pik6IE9ic2VydmFibGU8VD4ge1xuICAvLyBpZiB0aGUgb25seSBhcmd1bWVudCBpcyBhbiBhcnJheSwgaXQgd2FzIG1vc3QgbGlrZWx5IGNhbGxlZCB3aXRoXG4gIC8vIGBwYWlyKFtvYnMxLCBvYnMyLCAuLi5dKWBcbiAgaWYgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG9ic2VydmFibGVzWzBdKSkge1xuICAgIG9ic2VydmFibGVzID0gPEFycmF5PE9ic2VydmFibGU8VD4+Pm9ic2VydmFibGVzWzBdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMubGlmdC5jYWxsKHJhY2VTdGF0aWM8VD4odGhpcywgLi4ub2JzZXJ2YWJsZXMpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBmaXJzdCBzb3VyY2UgT2JzZXJ2YWJsZSB0byBlbWl0IGFuIGl0ZW0uXG4gKiBAcGFyYW0gey4uLk9ic2VydmFibGVzfSAuLi5vYnNlcnZhYmxlcyBzb3VyY2VzIHVzZWQgdG8gcmFjZSBmb3Igd2hpY2ggT2JzZXJ2YWJsZSBlbWl0cyBmaXJzdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBvdXRwdXQgb2YgdGhlIGZpcnN0IE9ic2VydmFibGUgdG8gZW1pdCBhbiBpdGVtLlxuICogQHN0YXRpYyB0cnVlXG4gKiBAbmFtZSByYWNlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFjZVN0YXRpYzxUPihvYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZTxUPj4pOiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2VTdGF0aWM8VD4ob2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4pOiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2VTdGF0aWM8VD4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8VD4gfCBBcnJheTxPYnNlcnZhYmxlPFQ+Pj4pOiBPYnNlcnZhYmxlPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIHJhY2VTdGF0aWM8VD4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGU8YW55PiB8IEFycmF5PE9ic2VydmFibGU8YW55Pj4+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIC8vIGlmIHRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIGFycmF5LCBpdCB3YXMgbW9zdCBsaWtlbHkgY2FsbGVkIHdpdGhcbiAgLy8gYHJhY2UoW29iczEsIG9iczIsIC4uLl0pYFxuICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKGlzQXJyYXkob2JzZXJ2YWJsZXNbMF0pKSB7XG4gICAgICBvYnNlcnZhYmxlcyA9IDxBcnJheTxPYnNlcnZhYmxlPGFueT4+Pm9ic2VydmFibGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gPE9ic2VydmFibGU8YW55Pj5vYnNlcnZhYmxlc1swXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZTxUPig8YW55Pm9ic2VydmFibGVzKS5saWZ0KG5ldyBSYWNlT3BlcmF0b3I8VD4oKSk7XG59XG5cbmV4cG9ydCBjbGFzcyBSYWNlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgUmFjZVN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgUmFjZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgVD4ge1xuICBwcml2YXRlIGhhc0ZpcnN0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgb2JzZXJ2YWJsZXM6IE9ic2VydmFibGU8YW55PltdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dChvYnNlcnZhYmxlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9ic2VydmFibGVzLnB1c2gob2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IG9ic2VydmFibGVzID0gdGhpcy5vYnNlcnZhYmxlcztcbiAgICBjb25zdCBsZW4gPSBvYnNlcnZhYmxlcy5sZW5ndGg7XG5cbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuICYmICF0aGlzLmhhc0ZpcnN0OyBpKyspIHtcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBvYnNlcnZhYmxlc1tpXTtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG9ic2VydmFibGUsIG9ic2VydmFibGUsIGkpO1xuXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkKHN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLm9ic2VydmFibGVzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFQsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBUPik6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNGaXJzdCkge1xuICAgICAgdGhpcy5oYXNGaXJzdCA9IHRydWU7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpICE9PSBvdXRlckluZGV4KSB7XG4gICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaXB0aW9uc1tpXTtcblxuICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoaW5uZXJWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==