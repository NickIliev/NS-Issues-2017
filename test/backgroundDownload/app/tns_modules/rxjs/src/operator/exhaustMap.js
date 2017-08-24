"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable only if the previous projected Observable has completed.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link exhaust}.</span>
 *
 * <img src="./img/exhaustMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. When it projects a source value to
 * an Observable, the output Observable begins emitting the items emitted by
 * that projected Observable. However, `exhaustMap` ignores every new projected
 * Observable if the previous projected Observable has not yet completed. Once
 * that one completes, it will accept and flatten the next projected Observable
 * and repeat this process.
 *
 * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaust}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable containing projected Observables
 * of each item of the source, ignoring projected Observables that start before
 * their preceding Observable has completed.
 * @method exhaustMap
 * @owner Observable
 */
function exhaustMap(project, resultSelector) {
    return this.lift(new SwitchFirstMapOperator(project, resultSelector));
}
exports.exhaustMap = exhaustMap;
var SwitchFirstMapOperator = (function () {
    function SwitchFirstMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchFirstMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchFirstMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchFirstMapSubscriber = (function (_super) {
    __extends(SwitchFirstMapSubscriber, _super);
    function SwitchFirstMapSubscriber(destination, project, resultSelector) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.resultSelector = resultSelector;
        _this.hasSubscription = false;
        _this.hasCompleted = false;
        _this.index = 0;
        return _this;
    }
    SwitchFirstMapSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.tryNext(value);
        }
    };
    SwitchFirstMapSubscriber.prototype.tryNext = function (value) {
        var index = this.index++;
        var destination = this.destination;
        try {
            var result = this.project(value, index);
            this.hasSubscription = true;
            this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
        }
        catch (err) {
            destination.error(err);
        }
    };
    SwitchFirstMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchFirstMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        if (resultSelector) {
            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    };
    SwitchFirstMapSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
        try {
            var result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            destination.next(result);
        }
        catch (err) {
            destination.error(err);
        }
    };
    SwitchFirstMapSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SwitchFirstMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchFirstMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhoYXVzdE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4aGF1c3RNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxzREFBcUQ7QUFFckQsK0RBQThEO0FBSzlELG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxvQkFBeUQsT0FBd0QsRUFDN0UsY0FBNEY7SUFDOUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBSEQsZ0NBR0M7QUFFRDtJQUNFLGdDQUFvQixPQUF3RCxFQUN4RCxjQUE0RjtRQUQ1RixZQUFPLEdBQVAsT0FBTyxDQUFpRDtRQUN4RCxtQkFBYyxHQUFkLGNBQWMsQ0FBOEU7SUFDaEgsQ0FBQztJQUVELHFDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQUVEOzs7O0dBSUc7QUFDSDtJQUFnRCw0Q0FBcUI7SUFLbkUsa0NBQVksV0FBMEIsRUFDbEIsT0FBd0QsRUFDeEQsY0FBNEY7UUFGaEgsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIbUIsYUFBTyxHQUFQLE9BQU8sQ0FBaUQ7UUFDeEQsb0JBQWMsR0FBZCxjQUFjLENBQThFO1FBTnhHLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBTTFCLENBQUM7SUFFUyx3Q0FBSyxHQUFmLFVBQWdC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dG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmFibGVJbnB1dCB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gZXhoYXVzdE1hcDxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcm9qZWN0OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IE9ic2VydmFibGVJbnB1dDxSPik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gZXhoYXVzdE1hcDxULCBJLCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcm9qZWN0OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IE9ic2VydmFibGVJbnB1dDxJPiwgcmVzdWx0U2VsZWN0b3I6IChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUik6IE9ic2VydmFibGU8Uj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIFByb2plY3RzIGVhY2ggc291cmNlIHZhbHVlIHRvIGFuIE9ic2VydmFibGUgd2hpY2ggaXMgbWVyZ2VkIGluIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgb25seSBpZiB0aGUgcHJldmlvdXMgcHJvamVjdGVkIE9ic2VydmFibGUgaGFzIGNvbXBsZXRlZC5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TWFwcyBlYWNoIHZhbHVlIHRvIGFuIE9ic2VydmFibGUsIHRoZW4gZmxhdHRlbnMgYWxsIG9mXG4gKiB0aGVzZSBpbm5lciBPYnNlcnZhYmxlcyB1c2luZyB7QGxpbmsgZXhoYXVzdH0uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZXhoYXVzdE1hcC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBiYXNlZCBvbiBhcHBseWluZyBhIGZ1bmN0aW9uIHRoYXQgeW91XG4gKiBzdXBwbHkgdG8gZWFjaCBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uXG4gKiByZXR1cm5zIGFuIChzby1jYWxsZWQgXCJpbm5lclwiKSBPYnNlcnZhYmxlLiBXaGVuIGl0IHByb2plY3RzIGEgc291cmNlIHZhbHVlIHRvXG4gKiBhbiBPYnNlcnZhYmxlLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgYmVnaW5zIGVtaXR0aW5nIHRoZSBpdGVtcyBlbWl0dGVkIGJ5XG4gKiB0aGF0IHByb2plY3RlZCBPYnNlcnZhYmxlLiBIb3dldmVyLCBgZXhoYXVzdE1hcGAgaWdub3JlcyBldmVyeSBuZXcgcHJvamVjdGVkXG4gKiBPYnNlcnZhYmxlIGlmIHRoZSBwcmV2aW91cyBwcm9qZWN0ZWQgT2JzZXJ2YWJsZSBoYXMgbm90IHlldCBjb21wbGV0ZWQuIE9uY2VcbiAqIHRoYXQgb25lIGNvbXBsZXRlcywgaXQgd2lsbCBhY2NlcHQgYW5kIGZsYXR0ZW4gdGhlIG5leHQgcHJvamVjdGVkIE9ic2VydmFibGVcbiAqIGFuZCByZXBlYXQgdGhpcyBwcm9jZXNzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlJ1biBhIGZpbml0ZSB0aW1lciBmb3IgZWFjaCBjbGljaywgb25seSBpZiB0aGVyZSBpcyBubyBjdXJyZW50bHkgYWN0aXZlIHRpbWVyPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MuZXhoYXVzdE1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0fVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgP2luZGV4OiBudW1iZXIpOiBPYnNlcnZhYmxlSW5wdXR9IHByb2plY3QgQSBmdW5jdGlvblxuICogdGhhdCwgd2hlbiBhcHBsaWVkIHRvIGFuIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHJldHVybnMgYW5cbiAqIE9ic2VydmFibGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKTogYW55fSBbcmVzdWx0U2VsZWN0b3JdXG4gKiBBIGZ1bmN0aW9uIHRvIHByb2R1Y2UgdGhlIHZhbHVlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBiYXNlZCBvbiB0aGUgdmFsdWVzXG4gKiBhbmQgdGhlIGluZGljZXMgb2YgdGhlIHNvdXJjZSAob3V0ZXIpIGVtaXNzaW9uIGFuZCB0aGUgaW5uZXIgT2JzZXJ2YWJsZVxuICogZW1pc3Npb24uIFRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoaXMgZnVuY3Rpb24gYXJlOlxuICogLSBgb3V0ZXJWYWx1ZWA6IHRoZSB2YWx1ZSB0aGF0IGNhbWUgZnJvbSB0aGUgc291cmNlXG4gKiAtIGBpbm5lclZhbHVlYDogdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZVxuICogLSBgb3V0ZXJJbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBzb3VyY2VcbiAqIC0gYGlubmVySW5kZXhgOiB0aGUgXCJpbmRleFwiIG9mIHRoZSB2YWx1ZSBmcm9tIHRoZSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZVxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBjb250YWluaW5nIHByb2plY3RlZCBPYnNlcnZhYmxlc1xuICogb2YgZWFjaCBpdGVtIG9mIHRoZSBzb3VyY2UsIGlnbm9yaW5nIHByb2plY3RlZCBPYnNlcnZhYmxlcyB0aGF0IHN0YXJ0IGJlZm9yZVxuICogdGhlaXIgcHJlY2VkaW5nIE9ic2VydmFibGUgaGFzIGNvbXBsZXRlZC5cbiAqIEBtZXRob2QgZXhoYXVzdE1hcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aGF1c3RNYXA8VCwgSSwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgcHJvamVjdDogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlSW5wdXQ8ST4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTZWxlY3Rvcj86IChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUik6IE9ic2VydmFibGU8Uj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTd2l0Y2hGaXJzdE1hcE9wZXJhdG9yKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSk7XG59XG5cbmNsYXNzIFN3aXRjaEZpcnN0TWFwT3BlcmF0b3I8VCwgSSwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvamVjdDogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlSW5wdXQ8ST4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVzdWx0U2VsZWN0b3I/OiAob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpID0+IFIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTd2l0Y2hGaXJzdE1hcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0LCB0aGlzLnJlc3VsdFNlbGVjdG9yKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFN3aXRjaEZpcnN0TWFwU3Vic2NyaWJlcjxULCBJLCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBJPiB7XG4gIHByaXZhdGUgaGFzU3Vic2NyaXB0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaGFzQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJvamVjdDogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlSW5wdXQ8ST4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVzdWx0U2VsZWN0b3I/OiAob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpID0+IFIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRyeU5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5TmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wcm9qZWN0KHZhbHVlLCBpbmRleCk7XG4gICAgICB0aGlzLmhhc1N1YnNjcmlwdGlvbiA9IHRydWU7XG4gICAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCByZXN1bHQsIHZhbHVlLCBpbmRleCkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuaGFzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMuaGFzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgST4pOiB2b2lkIHtcbiAgICBjb25zdCB7IHJlc3VsdFNlbGVjdG9yLCBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgIHRoaXMudHJ5U2VsZWN0UmVzdWx0KG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5U2VsZWN0UmVzdWx0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgeyByZXN1bHRTZWxlY3RvciwgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdFNlbGVjdG9yKG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpO1xuICAgICAgZGVzdGluYXRpb24ubmV4dChyZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlFcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKGlubmVyU3ViOiBTdWJzY3JpcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZShpbm5lclN1Yik7XG5cbiAgICB0aGlzLmhhc1N1YnNjcmlwdGlvbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhhc0NvbXBsZXRlZCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19