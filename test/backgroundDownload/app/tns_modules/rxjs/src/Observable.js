"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("./util/root");
var toSubscriber_1 = require("./util/toSubscriber");
var observable_1 = require("./symbol/observable");
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    return Observable;
}());
// HACK: Since TypeScript inherits static properties too, we have to
// fight against TypeScript here so Subject can have a different static create signature
/**
 * Creates a new cold Observable by calling the Observable constructor
 * @static true
 * @owner Observable
 * @method create
 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
 * @return {Observable} a new cold observable
 */
Observable.create = function (subscribe) {
    return new Observable(subscribe);
};
exports.Observable = Observable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxvQ0FBbUM7QUFDbkMsb0RBQW1EO0FBR25ELGtEQUFzRTtBQVd0RTs7Ozs7R0FLRztBQUNIO0lBT0U7Ozs7OztPQU1HO0lBQ0gsb0JBQVksU0FBNkU7UUFabEYsY0FBUyxHQUFZLEtBQUssQ0FBQztRQWFoQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFnQkQ7Ozs7OztPQU1HO0lBQ0gseUJBQUksR0FBSixVQUFRLFFBQXdCO1FBQzlCLElBQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFLLENBQUM7UUFDdkMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDekIsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBZ0JELDhCQUFTLEdBQVQsVUFBVSxjQUEwRCxFQUMxRCxLQUE0QixFQUM1QixRQUFxQjtRQUVyQixJQUFBLHdCQUFRLENBQVU7UUFDMUIsSUFBTSxJQUFJLEdBQUcsMkJBQVksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FB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QUNkLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFoS0Q7QUFvQkUsb0VBQW9FO0FBQ3BFLHdGQUF3RjtBQUN4Rjs7Ozs7OztHQU9HO0FBQ0ksaUJBQU0sR0FBYSxVQUFJLFNBQXdEO0lBQ3BGLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBSSxTQUFTLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUE7QUFoQ1UsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXJ0aWFsT2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgQW5vbnltb3VzU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4vdXRpbC9yb290JztcbmltcG9ydCB7IHRvU3Vic2NyaWJlciB9IGZyb20gJy4vdXRpbC90b1N1YnNjcmliZXInO1xuaW1wb3J0IHsgSWZPYnNlcnZhYmxlIH0gZnJvbSAnLi9vYnNlcnZhYmxlL0lmT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBFcnJvck9ic2VydmFibGUgfSBmcm9tICcuL29ic2VydmFibGUvRXJyb3JPYnNlcnZhYmxlJztcbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuL3N5bWJvbC9vYnNlcnZhYmxlJztcblxuZXhwb3J0IGludGVyZmFjZSBTdWJzY3JpYmFibGU8VD4ge1xuICBzdWJzY3JpYmUob2JzZXJ2ZXJPck5leHQ/OiBQYXJ0aWFsT2JzZXJ2ZXI8VD4gfCAoKHZhbHVlOiBUKSA9PiB2b2lkKSxcbiAgICAgICAgICAgIGVycm9yPzogKGVycm9yOiBhbnkpID0+IHZvaWQsXG4gICAgICAgICAgICBjb21wbGV0ZT86ICgpID0+IHZvaWQpOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG59XG5cbmV4cG9ydCB0eXBlIFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiA9IFN1YnNjcmliYWJsZTxUPiB8IFByb21pc2VMaWtlPFQ+O1xuZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUlucHV0PFQ+ID0gU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+IHwgQXJyYXlMaWtlPFQ+O1xuXG4vKipcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgYW55IHNldCBvZiB2YWx1ZXMgb3ZlciBhbnkgYW1vdW50IG9mIHRpbWUuIFRoaXMgdGhlIG1vc3QgYmFzaWMgYnVpbGRpbmcgYmxvY2tcbiAqIG9mIFJ4SlMuXG4gKlxuICogQGNsYXNzIE9ic2VydmFibGU8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGU8VD4gaW1wbGVtZW50cyBTdWJzY3JpYmFibGU8VD4ge1xuXG4gIHB1YmxpYyBfaXNTY2FsYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgc291cmNlOiBPYnNlcnZhYmxlPGFueT47XG4gIHByb3RlY3RlZCBvcGVyYXRvcjogT3BlcmF0b3I8YW55LCBUPjtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1YnNjcmliZSB0aGUgZnVuY3Rpb24gdGhhdCBpcyAgY2FsbGVkIHdoZW4gdGhlIE9ic2VydmFibGUgaXNcbiAgICogaW5pdGlhbGx5IHN1YnNjcmliZWQgdG8uIFRoaXMgZnVuY3Rpb24gaXMgZ2l2ZW4gYSBTdWJzY3JpYmVyLCB0byB3aGljaCBuZXcgdmFsdWVzXG4gICAqIGNhbiBiZSBgbmV4dGBlZCwgb3IgYW4gYGVycm9yYCBtZXRob2QgY2FuIGJlIGNhbGxlZCB0byByYWlzZSBhbiBlcnJvciwgb3JcbiAgICogYGNvbXBsZXRlYCBjYW4gYmUgY2FsbGVkIHRvIG5vdGlmeSBvZiBhIHN1Y2Nlc3NmdWwgY29tcGxldGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHN1YnNjcmliZT86ICh0aGlzOiBPYnNlcnZhYmxlPFQ+LCBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSA9PiBUZWFyZG93bkxvZ2ljKSB7XG4gICAgaWYgKHN1YnNjcmliZSkge1xuICAgICAgdGhpcy5fc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhBQ0s6IFNpbmNlIFR5cGVTY3JpcHQgaW5oZXJpdHMgc3RhdGljIHByb3BlcnRpZXMgdG9vLCB3ZSBoYXZlIHRvXG4gIC8vIGZpZ2h0IGFnYWluc3QgVHlwZVNjcmlwdCBoZXJlIHNvIFN1YmplY3QgY2FuIGhhdmUgYSBkaWZmZXJlbnQgc3RhdGljIGNyZWF0ZSBzaWduYXR1cmVcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29sZCBPYnNlcnZhYmxlIGJ5IGNhbGxpbmcgdGhlIE9ic2VydmFibGUgY29uc3RydWN0b3JcbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1YnNjcmliZT8gdGhlIHN1YnNjcmliZXIgZnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIHRoZSBPYnNlcnZhYmxlIGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IGNvbGQgb2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTogRnVuY3Rpb24gPSA8VD4oc3Vic2NyaWJlPzogKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pID0+IFRlYXJkb3duTG9naWMpID0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IE9ic2VydmFibGUsIHdpdGggdGhpcyBPYnNlcnZhYmxlIGFzIHRoZSBzb3VyY2UsIGFuZCB0aGUgcGFzc2VkXG4gICAqIG9wZXJhdG9yIGRlZmluZWQgYXMgdGhlIG5ldyBvYnNlcnZhYmxlJ3Mgb3BlcmF0b3IuXG4gICAqIEBtZXRob2QgbGlmdFxuICAgKiBAcGFyYW0ge09wZXJhdG9yfSBvcGVyYXRvciB0aGUgb3BlcmF0b3IgZGVmaW5pbmcgdGhlIG9wZXJhdGlvbiB0byB0YWtlIG9uIHRoZSBvYnNlcnZhYmxlXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IG9ic2VydmFibGUgd2l0aCB0aGUgT3BlcmF0b3IgYXBwbGllZFxuICAgKi9cbiAgbGlmdDxSPihvcGVyYXRvcjogT3BlcmF0b3I8VCwgUj4pOiBPYnNlcnZhYmxlPFI+IHtcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8Uj4oKTtcbiAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBoYW5kbGVycyBmb3IgaGFuZGxpbmcgZW1pdHRlZCB2YWx1ZXMsIGVycm9yIGFuZCBjb21wbGV0aW9ucyBmcm9tIHRoZSBvYnNlcnZhYmxlLCBhbmRcbiAgICogIGV4ZWN1dGVzIHRoZSBvYnNlcnZhYmxlJ3Mgc3Vic2NyaWJlciBmdW5jdGlvbiwgd2hpY2ggd2lsbCB0YWtlIGFjdGlvbiB0byBzZXQgdXAgdGhlIHVuZGVybHlpbmcgZGF0YSBzdHJlYW1cbiAgICogQG1ldGhvZCBzdWJzY3JpYmVcbiAgICogQHBhcmFtIHtQYXJ0aWFsT2JzZXJ2ZXJ8RnVuY3Rpb259IG9ic2VydmVyT3JOZXh0IChvcHRpb25hbCkgZWl0aGVyIGFuIG9ic2VydmVyIGRlZmluaW5nIGFsbCBmdW5jdGlvbnMgdG8gYmUgY2FsbGVkLFxuICAgKiAgb3IgdGhlIGZpcnN0IG9mIHRocmVlIHBvc3NpYmxlIGhhbmRsZXJzLCB3aGljaCBpcyB0aGUgaGFuZGxlciBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yIChvcHRpb25hbCkgYSBoYW5kbGVyIGZvciBhIHRlcm1pbmFsIGV2ZW50IHJlc3VsdGluZyBmcm9tIGFuIGVycm9yLiBJZiBubyBlcnJvciBoYW5kbGVyIGlzIHByb3ZpZGVkLFxuICAgKiAgdGhlIGVycm9yIHdpbGwgYmUgdGhyb3duIGFzIHVuaGFuZGxlZFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZSAob3B0aW9uYWwpIGEgaGFuZGxlciBmb3IgYSB0ZXJtaW5hbCBldmVudCByZXN1bHRpbmcgZnJvbSBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAqIEByZXR1cm4ge0lTdWJzY3JpcHRpb259IGEgc3Vic2NyaXB0aW9uIHJlZmVyZW5jZSB0byB0aGUgcmVnaXN0ZXJlZCBoYW5kbGVyc1xuICAgKi9cbiAgc3Vic2NyaWJlKCk6IFN1YnNjcmlwdGlvbjtcbiAgc3Vic2NyaWJlKG9ic2VydmVyOiBQYXJ0aWFsT2JzZXJ2ZXI8VD4pOiBTdWJzY3JpcHRpb247XG4gIHN1YnNjcmliZShuZXh0PzogKHZhbHVlOiBUKSA9PiB2b2lkLCBlcnJvcj86IChlcnJvcjogYW55KSA9PiB2b2lkLCBjb21wbGV0ZT86ICgpID0+IHZvaWQpOiBTdWJzY3JpcHRpb247XG4gIHN1YnNjcmliZShvYnNlcnZlck9yTmV4dD86IFBhcnRpYWxPYnNlcnZlcjxUPiB8ICgodmFsdWU6IFQpID0+IHZvaWQpLFxuICAgICAgICAgICAgZXJyb3I/OiAoZXJyb3I6IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbiB7XG5cbiAgICBjb25zdCB7IG9wZXJhdG9yIH0gPSB0aGlzO1xuICAgIGNvbnN0IHNpbmsgPSB0b1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG5cbiAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgIG9wZXJhdG9yLmNhbGwoc2luaywgdGhpcy5zb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaW5rLmFkZCh0aGlzLl90cnlTdWJzY3JpYmUoc2luaykpO1xuICAgIH1cblxuICAgIGlmIChzaW5rLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgc2luay5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgIGlmIChzaW5rLnN5bmNFcnJvclRocm93bikge1xuICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzaW5rO1xuICB9XG5cbiAgcHJvdGVjdGVkIF90cnlTdWJzY3JpYmUoc2luazogU3Vic2NyaWJlcjxUPik6IFRlYXJkb3duTG9naWMge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2luay5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgc2luay5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgIHNpbmsuZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBmb3JFYWNoXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHQgYSBoYW5kbGVyIGZvciBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIG9ic2VydmFibGVcbiAgICogQHBhcmFtIHtQcm9taXNlQ29uc3RydWN0b3J9IFtQcm9taXNlQ3Rvcl0gYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB1c2VkIHRvIGluc3RhbnRpYXRlIHRoZSBQcm9taXNlXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IGVpdGhlciByZXNvbHZlcyBvbiBvYnNlcnZhYmxlIGNvbXBsZXRpb24gb3JcbiAgICogIHJlamVjdHMgd2l0aCB0aGUgaGFuZGxlZCBlcnJvclxuICAgKi9cbiAgZm9yRWFjaChuZXh0OiAodmFsdWU6IFQpID0+IHZvaWQsIFByb21pc2VDdG9yPzogdHlwZW9mIFByb21pc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICBpZiAocm9vdC5SeCAmJiByb290LlJ4LmNvbmZpZyAmJiByb290LlJ4LmNvbmZpZy5Qcm9taXNlKSB7XG4gICAgICAgIFByb21pc2VDdG9yID0gcm9vdC5SeC5jb25maWcuUHJvbWlzZTtcbiAgICAgIH0gZWxzZSBpZiAocm9vdC5Qcm9taXNlKSB7XG4gICAgICAgIFByb21pc2VDdG9yID0gcm9vdC5Qcm9taXNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gUHJvbWlzZSBpbXBsIGZvdW5kJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlQ3Rvcjx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBNdXN0IGJlIGRlY2xhcmVkIGluIGEgc2VwYXJhdGUgc3RhdGVtZW50IHRvIGF2b2lkIGEgUmVmZXJuY2VFcnJvciB3aGVuXG4gICAgICAvLyBhY2Nlc3Npbmcgc3Vic2NyaXB0aW9uIGJlbG93IGluIHRoZSBjbG9zdXJlIGR1ZSB0byBUZW1wb3JhbCBEZWFkIFpvbmUuXG4gICAgICBsZXQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc3Vic2NyaXB0aW9uLCB0aGVuIHdlIGNhbiBzdXJtaXNlXG4gICAgICAgICAgLy8gdGhlIG5leHQgaGFuZGxpbmcgaXMgYXN5bmNocm9ub3VzLiBBbnkgZXJyb3JzIHRocm93blxuICAgICAgICAgIC8vIG5lZWQgdG8gYmUgcmVqZWN0ZWQgZXhwbGljaXRseSBhbmQgdW5zdWJzY3JpYmUgbXVzdCBiZVxuICAgICAgICAgIC8vIGNhbGxlZCBtYW51YWxseVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIE5PIHN1YnNjcmlwdGlvbiwgdGhlbiB3ZSdyZSBnZXR0aW5nIGEgbmV4dGVkXG4gICAgICAgICAgLy8gdmFsdWUgc3luY2hyb25vdXNseSBkdXJpbmcgc3Vic2NyaXB0aW9uLiBXZSBjYW4ganVzdCBjYWxsIGl0LlxuICAgICAgICAgIC8vIElmIGl0IGVycm9ycywgT2JzZXJ2YWJsZSdzIGBzdWJzY3JpYmVgIHdpbGwgZW5zdXJlIHRoZVxuICAgICAgICAgIC8vIHVuc3Vic2NyaXB0aW9uIGxvZ2ljIGlzIGNhbGxlZCwgdGhlbiBzeW5jaHJvbm91c2x5IHJldGhyb3cgdGhlIGVycm9yLlxuICAgICAgICAgIC8vIEFmdGVyIHRoYXQsIFByb21pc2Ugd2lsbCB0cmFwIHRoZSBlcnJvciBhbmQgc2VuZCBpdFxuICAgICAgICAgIC8vIGRvd24gdGhlIHJlamVjdGlvbiBwYXRoLlxuICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIC8vIGBpZmAgYW5kIGB0aHJvd2AgYXJlIHNwZWNpYWwgc25vdyBmbGFrZXMsIHRoZSBjb21waWxlciBzZWVzIHRoZW0gYXMgcmVzZXJ2ZWQgd29yZHNcbiAgc3RhdGljIGlmOiB0eXBlb2YgSWZPYnNlcnZhYmxlLmNyZWF0ZTtcbiAgc3RhdGljIHRocm93OiB0eXBlb2YgRXJyb3JPYnNlcnZhYmxlLmNyZWF0ZTtcblxuICAvKipcbiAgICogQW4gaW50ZXJvcCBwb2ludCBkZWZpbmVkIGJ5IHRoZSBlczctb2JzZXJ2YWJsZSBzcGVjIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICogQG1ldGhvZCBTeW1ib2wub2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSB0aGlzIGluc3RhbmNlIG9mIHRoZSBvYnNlcnZhYmxlXG4gICAqL1xuICBbU3ltYm9sX29ic2VydmFibGVdKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXX0=