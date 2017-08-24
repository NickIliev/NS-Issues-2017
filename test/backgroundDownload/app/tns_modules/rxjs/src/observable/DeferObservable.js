"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var subscribeToResult_1 = require("../util/subscribeToResult");
var OuterSubscriber_1 = require("../OuterSubscriber");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var DeferObservable = (function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
        var _this = _super.call(this) || this;
        _this.observableFactory = observableFactory;
        return _this;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * // Results in the following behavior:
     * // If the result of Math.random() is greater than 0.5 it will listen
     * // for clicks anywhere on the "document"; when document is clicked it
     * // will log a MouseEvent object to the console. If the result is less
     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
     *
     * @see {@link create}
     *
     * @param {function(): SubscribableOrPromise} observableFactory The Observable
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * @return {Observable} An Observable whose Observers' subscriptions trigger
     * an invocation of the given Observable factory function.
     * @static true
     * @name defer
     * @owner Observable
     */
    DeferObservable.create = function (observableFactory) {
        return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
}(Observable_1.Observable));
exports.DeferObservable = DeferObservable;
var DeferSubscriber = (function (_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
        var _this = _super.call(this, destination) || this;
        _this.factory = factory;
        _this.tryDefer();
        return _this;
    }
    DeferSubscriber.prototype.tryDefer = function () {
        try {
            this._callFactory();
        }
        catch (err) {
            this._error(err);
        }
    };
    DeferSubscriber.prototype._callFactory = function () {
        var result = this.factory();
        if (result) {
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return DeferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmZXJPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRGVmZXJPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWtFO0FBSWxFLCtEQUE4RDtBQUM5RCxzREFBcUQ7QUFDckQ7Ozs7R0FJRztBQUNIO0lBQXdDLG1DQUFhO0lBb0RuRCx5QkFBb0IsaUJBQXdEO1FBQTVFLFlBQ0UsaUJBQU8sU0FDUjtRQUZtQix1QkFBaUIsR0FBakIsaUJBQWlCLENBQXVDOztJQUU1RSxDQUFDO0lBcEREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Q0c7SUFDSSxzQkFBTSxHQUFiLFVBQWlCLGlCQUF3RDtRQUN2RSxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBTVMsb0NBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFDNUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBM0RELENBQXdDLHVCQUFVLEdBMkRqRDtBQTNEWSwwQ0FBZTtBQTZENUI7SUFBaUMsbUNBQXFCO0lBQ3BELHlCQUFZLFdBQTBCLEVBQ2xCLE9BQThDO1FBRGxFLFlBRUUsa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBSG1CLGFBQU8sR0FBUCxPQUFPLENBQXVDO1FBRWhFLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7SUFDbEIsQ0FBQztJQUVPLGtDQUFRLEdBQWhCO1FBQ0UsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUVPLHNDQUFZLEdBQXBCO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBckJELENBQWlDLGlDQUFlLEdBcUIvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliYWJsZU9yUHJvbWlzZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmVyT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCwgb24gc3Vic2NyaWJlLCBjYWxscyBhbiBPYnNlcnZhYmxlIGZhY3RvcnkgdG9cbiAgICogbWFrZSBhbiBPYnNlcnZhYmxlIGZvciBlYWNoIG5ldyBPYnNlcnZlci5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNyZWF0ZXMgdGhlIE9ic2VydmFibGUgbGF6aWx5LCB0aGF0IGlzLCBvbmx5IHdoZW4gaXRcbiAgICogaXMgc3Vic2NyaWJlZC5cbiAgICogPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL2RlZmVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgKlxuICAgKiBgZGVmZXJgIGFsbG93cyB5b3UgdG8gY3JlYXRlIHRoZSBPYnNlcnZhYmxlIG9ubHkgd2hlbiB0aGUgT2JzZXJ2ZXJcbiAgICogc3Vic2NyaWJlcywgYW5kIGNyZWF0ZSBhIGZyZXNoIE9ic2VydmFibGUgZm9yIGVhY2ggT2JzZXJ2ZXIuIEl0IHdhaXRzIHVudGlsXG4gICAqIGFuIE9ic2VydmVyIHN1YnNjcmliZXMgdG8gaXQsIGFuZCB0aGVuIGl0IGdlbmVyYXRlcyBhbiBPYnNlcnZhYmxlLFxuICAgKiB0eXBpY2FsbHkgd2l0aCBhbiBPYnNlcnZhYmxlIGZhY3RvcnkgZnVuY3Rpb24uIEl0IGRvZXMgdGhpcyBhZnJlc2ggZm9yIGVhY2hcbiAgICogc3Vic2NyaWJlciwgc28gYWx0aG91Z2ggZWFjaCBzdWJzY3JpYmVyIG1heSB0aGluayBpdCBpcyBzdWJzY3JpYmluZyB0byB0aGVcbiAgICogc2FtZSBPYnNlcnZhYmxlLCBpbiBmYWN0IGVhY2ggc3Vic2NyaWJlciBnZXRzIGl0cyBvd24gaW5kaXZpZHVhbFxuICAgKiBPYnNlcnZhYmxlLlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5TdWJzY3JpYmUgdG8gZWl0aGVyIGFuIE9ic2VydmFibGUgb2YgY2xpY2tzIG9yIGFuIE9ic2VydmFibGUgb2YgaW50ZXJ2YWwsIGF0IHJhbmRvbTwvY2FwdGlvbj5cbiAgICogdmFyIGNsaWNrc09ySW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICogICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgKiAgICAgcmV0dXJuIFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAgICogICB9IGVsc2Uge1xuICAgKiAgICAgcmV0dXJuIFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gICAqICAgfVxuICAgKiB9KTtcbiAgICogY2xpY2tzT3JJbnRlcnZhbC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAqXG4gICAqIC8vIFJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZyBiZWhhdmlvcjpcbiAgICogLy8gSWYgdGhlIHJlc3VsdCBvZiBNYXRoLnJhbmRvbSgpIGlzIGdyZWF0ZXIgdGhhbiAwLjUgaXQgd2lsbCBsaXN0ZW5cbiAgICogLy8gZm9yIGNsaWNrcyBhbnl3aGVyZSBvbiB0aGUgXCJkb2N1bWVudFwiOyB3aGVuIGRvY3VtZW50IGlzIGNsaWNrZWQgaXRcbiAgICogLy8gd2lsbCBsb2cgYSBNb3VzZUV2ZW50IG9iamVjdCB0byB0aGUgY29uc29sZS4gSWYgdGhlIHJlc3VsdCBpcyBsZXNzXG4gICAqIC8vIHRoYW4gMC41IGl0IHdpbGwgZW1pdCBhc2NlbmRpbmcgbnVtYmVycywgb25lIGV2ZXJ5IHNlY29uZCgxMDAwbXMpLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogU3Vic2NyaWJhYmxlT3JQcm9taXNlfSBvYnNlcnZhYmxlRmFjdG9yeSBUaGUgT2JzZXJ2YWJsZVxuICAgKiBmYWN0b3J5IGZ1bmN0aW9uIHRvIGludm9rZSBmb3IgZWFjaCBPYnNlcnZlciB0aGF0IHN1YnNjcmliZXMgdG8gdGhlIG91dHB1dFxuICAgKiBPYnNlcnZhYmxlLiBNYXkgYWxzbyByZXR1cm4gYSBQcm9taXNlLCB3aGljaCB3aWxsIGJlIGNvbnZlcnRlZCBvbiB0aGUgZmx5XG4gICAqIHRvIGFuIE9ic2VydmFibGUuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgd2hvc2UgT2JzZXJ2ZXJzJyBzdWJzY3JpcHRpb25zIHRyaWdnZXJcbiAgICogYW4gaW52b2NhdGlvbiBvZiB0aGUgZ2l2ZW4gT2JzZXJ2YWJsZSBmYWN0b3J5IGZ1bmN0aW9uLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgZGVmZXJcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4ob2JzZXJ2YWJsZUZhY3Rvcnk6ICgpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiB8IHZvaWQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IERlZmVyT2JzZXJ2YWJsZShvYnNlcnZhYmxlRmFjdG9yeSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9ic2VydmFibGVGYWN0b3J5OiAoKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8VD4gfCB2b2lkKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiBuZXcgRGVmZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMub2JzZXJ2YWJsZUZhY3RvcnkpO1xuICB9XG59XG5cbmNsYXNzIERlZmVyU3Vic2NyaWJlcjxUPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGZhY3Rvcnk6ICgpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiB8IHZvaWQpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy50cnlEZWZlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlEZWZlcigpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fY2FsbEZhY3RvcnkoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FsbEZhY3RvcnkoKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5mYWN0b3J5KCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgcmVzdWx0KSk7XG4gICAgfVxuICB9XG59XG4iXX0=