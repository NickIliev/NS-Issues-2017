"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("./Observable");
require("./observable/dom/MiscJSDoc");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ObservableDoc = (function () {
    function ObservableDoc() {
    }
    /**
     * Creates a new Observable, that will execute the specified function when an
     * {@link Observer} subscribes to it.
     *
     * <span class="informal">Create custom Observable, that does whatever you like.</span>
     *
     * <img src="./img/create.png" width="100%">
     *
     * `create` converts an `onSubscription` function to an actual Observable.
     * Whenever someone subscribes to that Observable, the function will be called
     * with an {@link Observer} instance as a first and only parameter. `onSubscription` should
     * then invoke the Observers `next`, `error` and `complete` methods.
     *
     * Calling `next` with a value will emit that value to the observer. Calling `complete`
     * means that Observable finished emitting and will not do anything else.
     * Calling `error` means that something went wrong - value passed to `error` method should
     * provide details on what exactly happened.
     *
     * A well-formed Observable can emit as many values as it needs via `next` method,
     * but `complete` and `error` methods can be called only once and nothing else can be called
     * thereafter. If you try to invoke `next`, `complete` or `error` methods after created
     * Observable already completed or ended with an error, these calls will be ignored to
     * preserve so called *Observable Contract*. Note that you are not required to call
     * `complete` at any point - it is perfectly fine to create an Observable that never ends,
     * depending on your needs.
     *
     * `onSubscription` can optionally return either a function or an object with
     * `unsubscribe` method. In both cases function or method will be called when
     * subscription to Observable is being cancelled and should be used to clean up all
     * resources. So, for example, if you are using `setTimeout` in your custom
     * Observable, when someone unsubscribes, you can clear planned timeout, so that
     * it does not fire needlessly and browser (or other environment) does not waste
     * computing power on timing event that no one will listen to anyways.
     *
     * Most of the times you should not need to use `create`, because existing
     * operators allow you to create an Observable for most of the use cases.
     * That being said, `create` is low-level mechanism allowing you to create
     * any Observable, if you have very specific needs.
     *
     * **TypeScript signature issue**
     *
     * Because Observable extends class which already has defined static `create` function,
     * but with different type signature, it was impossible to assign proper signature to
     * `Observable.create`. Because of that, it has very general type `Function` and thus
     * function passed to `create` will not be type checked, unless you explicitly state
     * what signature it should have.
     *
     * When using TypeScript we recommend to declare type signature of function passed to
     * `create` as `(observer: Observer) => TeardownLogic`, where {@link Observer}
     * and {@link TeardownLogic} are interfaces provided by the library.
     *
     * @example <caption>Emit three numbers, then complete.</caption>
     * var observable = Rx.Observable.create(function (observer) {
     *   observer.next(1);
     *   observer.next(2);
     *   observer.next(3);
     *   observer.complete();
     * });
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('this is the end')
     * );
     *
     * // Logs
     * // 1
     * // 2
     * // 3
     * // "this is the end"
     *
     *
     * @example <caption>Emit an error</caption>
     * const observable = Rx.Observable.create((observer) => {
     *   observer.error('something went really wrong...');
     * });
     *
     * observable.subscribe(
     *   value => console.log(value), // will never be called
     *   err => console.log(err),
     *   () => console.log('complete') // will never be called
     * );
     *
     * // Logs
     * // "something went really wrong..."
     *
     *
     * @example <caption>Return unsubscribe function</caption>
     *
     * const observable = Rx.Observable.create(observer => {
     *   const id = setTimeout(() => observer.next('...'), 5000); // emit value after 5s
     *
     *   return () => { clearTimeout(id); console.log('cleared!'); };
     * });
     *
     * const subscription = observable.subscribe(value => console.log(value));
     *
     * setTimeout(() => subscription.unsubscribe(), 3000); // cancel subscription after 3s
     *
     * // Logs:
     * // "cleared!" after 3s
     *
     * // Never logs "..."
     *
     *
     * @see {@link empty}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {function(observer: Observer): TeardownLogic} onSubscription A
     * function that accepts an Observer, and invokes its `next`,
     * `error`, and `complete` methods as appropriate, and optionally returns some
     * logic for cleaning up resources.
     * @return {Observable} An Observable that, whenever subscribed, will execute the
     * specified function.
     * @static true
     * @name create
     * @owner Observable
     */
    ObservableDoc.create = function (onSubscription) {
        return new Observable_1.Observable(onSubscription);
    };
    ;
    return ObservableDoc;
}());
exports.ObservableDoc = ObservableDoc;
/**
 * An interface for a consumer of push-based notifications delivered by an
 * {@link Observable}.
 *
 * ```ts
 * interface Observer<T> {
 *   closed?: boolean;
 *   next: (value: T) => void;
 *   error: (err: any) => void;
 *   complete: () => void;
 * }
 * ```
 *
 * An object conforming to the Observer interface is usually
 * given to the `observable.subscribe(observer)` method, and the Observable will
 * call the Observer's `next(value)` method to provide notifications. A
 * well-behaved Observable will call an Observer's `complete()` method exactly
 * once or the Observer's `error(err)` method exactly once, as the last
 * notification delivered.
 *
 * @interface
 * @name Observer
 * @noimport true
 */
var ObserverDoc = (function () {
    function ObserverDoc() {
        /**
         * An optional flag to indicate whether this Observer, when used as a
         * subscriber, has already been unsubscribed from its Observable.
         * @type {boolean}
         */
        this.closed = false;
    }
    /**
     * The callback to receive notifications of type `next` from the Observable,
     * with a value. The Observable may call this method 0 or more times.
     * @param {T} value The `next` value.
     * @return {void}
     */
    ObserverDoc.prototype.next = function (value) {
        return void 0;
    };
    /**
     * The callback to receive notifications of type `error` from the Observable,
     * with an attached {@link Error}. Notifies the Observer that the Observable
     * has experienced an error condition.
     * @param {any} err The `error` exception.
     * @return {void}
     */
    ObserverDoc.prototype.error = function (err) {
        return void 0;
    };
    /**
     * The callback to receive a valueless notification of type `complete` from
     * the Observable. Notifies the Observer that the Observable has finished
     * sending push-based notifications.
     * @return {void}
     */
    ObserverDoc.prototype.complete = function () {
        return void 0;
    };
    return ObserverDoc;
}());
exports.ObserverDoc = ObserverDoc;
/**
 * `SubscribableOrPromise` interface describes values that behave like either
 * Observables or Promises. Every operator that accepts arguments annotated
 * with this interface, can be also used with parameters that are not necessarily
 * RxJS Observables.
 *
 * Following types of values might be passed to operators expecting this interface:
 *
 * ## Observable
 *
 * RxJS {@link Observable} instance.
 *
 * ## Observable-like (Subscribable)
 *
 * This might be any object that has `Symbol.observable` method. This method,
 * when called, should return object with `subscribe` method on it, which should
 * behave the same as RxJS `Observable.subscribe`.
 *
 * `Symbol.observable` is part of https://github.com/tc39/proposal-observable proposal.
 * Since currently it is not supported natively, and every symbol is equal only to itself,
 * you should use https://github.com/blesh/symbol-observable polyfill, when implementing
 * custom Observable-likes.
 *
 * **TypeScript Subscribable interface issue**
 *
 * Although TypeScript interface claims that Subscribable is an object that has `subscribe`
 * method declared directly on it, passing custom objects that have `subscribe`
 * method but not `Symbol.observable` method will fail at runtime. Conversely, passing
 * objects with `Symbol.observable` but without `subscribe` will fail at compile time
 * (if you use TypeScript).
 *
 * TypeScript has problem supporting interfaces with methods defined as symbol
 * properties. To get around that, you should implement `subscribe` directly on
 * passed object, and make `Symbol.observable` method simply return `this`. That way
 * everything will work as expected, and compiler will not complain. If you really
 * do not want to put `subscribe` directly on your object, you will have to type cast
 * it to `any`, before passing it to an operator.
 *
 * When this issue is resolved, Subscribable interface will only permit Observable-like
 * objects with `Symbol.observable` defined, no matter if they themselves implement
 * `subscribe` method or not.
 *
 * ## ES6 Promise
 *
 * Promise can be interpreted as Observable that emits value and completes
 * when it is resolved or errors when it is rejected.
 *
 * ## Promise-like (Thenable)
 *
 * Promises passed to operators do not have to be native ES6 Promises.
 * They can be implementations from popular Promise libraries, polyfills
 * or even custom ones. They just need to have `then` method that works
 * as the same as ES6 Promise `then`.
 *
 * @example <caption>Use merge and then map with non-RxJS observable</caption>
 * const nonRxJSObservable = {
 *   subscribe(observer) {
 *     observer.next(1000);
 *     observer.complete();
 *   },
 *   [Symbol.observable]() {
 *     return this;
 *   }
 * };
 *
 * Rx.Observable.merge(nonRxJSObservable)
 * .map(value => "This value is " + value)
 * .subscribe(result => console.log(result)); // Logs "This value is 1000"
 *
 *
 * @example <caption>Use combineLatest with ES6 Promise</caption>
 * Rx.Observable.combineLatest(Promise.resolve(5), Promise.resolve(10), Promise.resolve(15))
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('the end!')
 * );
 * // Logs
 * // [5, 10, 15]
 * // "the end!"
 *
 *
 * @interface
 * @name SubscribableOrPromise
 * @noimport true
 */
var SubscribableOrPromiseDoc = (function () {
    function SubscribableOrPromiseDoc() {
    }
    return SubscribableOrPromiseDoc;
}());
exports.SubscribableOrPromiseDoc = SubscribableOrPromiseDoc;
/**
 * `ObservableInput` interface describes all values that are either an
 * {@link SubscribableOrPromise} or some kind of collection of values that
 * can be transformed to Observable emitting that values. Every operator that
 * accepts arguments annotated with this interface, can be also used with
 * parameters that are not necessarily RxJS Observables.
 *
 * `ObservableInput` extends {@link SubscribableOrPromise} with following types:
 *
 * ## Array
 *
 * Arrays can be interpreted as observables that emit all values in array one by one,
 * from left to right, and then complete immediately.
 *
 * ## Array-like
 *
 * Arrays passed to operators do not have to be built-in JavaScript Arrays. They
 * can be also, for example, `arguments` property available inside every function,
 * [DOM NodeList](https://developer.mozilla.org/pl/docs/Web/API/NodeList),
 * or, actually, any object that has `length` property (which is a number)
 * and stores values under non-negative (zero and up) integers.
 *
 * ## ES6 Iterable
 *
 * Operators will accept both built-in and custom ES6 Iterables, by treating them as
 * observables that emit all its values in order of iteration and then complete
 * when iteration ends. Note that contrary to arrays, Iterables do not have to
 * necessarily be finite, so creating Observables that never complete is possible as well.
 *
 * Note that you can make iterator an instance of Iterable by having it return itself
 * in `Symbol.iterator` method. It means that every operator accepting Iterables accepts,
 * though indirectly, iterators themselves as well. All native ES6 iterators are instances
 * of Iterable by default, so you do not have to implement their `Symbol.iterator` method
 * yourself.
 *
 * **TypeScript Iterable interface issue**
 *
 * TypeScript `ObservableInput` interface actually lacks type signature for Iterables,
 * because of issues it caused in some projects (see [this issue](https://github.com/ReactiveX/rxjs/issues/2306)).
 * If you want to use Iterable as argument for operator, cast it to `any` first.
 * Remember of course that, because of casting, you have to yourself ensure that passed
 * argument really implements said interface.
 *
 *
 * @example <caption>Use merge with arrays</caption>
 * Rx.Observable.merge([1, 2], [4], [5, 6])
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('ta dam!')
 * );
 *
 * // Logs
 * // 1
 * // 2
 * // 3
 * // 4
 * // 5
 * // 6
 * // "ta dam!"
 *
 *
 * @example <caption>Use merge with array-like</caption>
 * Rx.Observable.merge({0: 1, 1: 2, length: 2}, {0: 3, length: 1})
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('nice, huh?')
 * );
 *
 * // Logs
 * // 1
 * // 2
 * // 3
 * // "nice, huh?"
 *
 * @example <caption>Use merge with an Iterable (Map)</caption>
 * const firstMap = new Map([[1, 'a'], [2, 'b']]);
 * const secondMap = new Map([[3, 'c'], [4, 'd']]);
 *
 * Rx.Observable.merge(
 *   firstMap,          // pass Iterable
 *   secondMap.values() // pass iterator, which is itself an Iterable
 * ).subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('yup!')
 * );
 *
 * // Logs
 * // [1, "a"]
 * // [2, "b"]
 * // "c"
 * // "d"
 * // "yup!"
 *
 * @example <caption>Use from with generator (returning infinite iterator)</caption>
 * // infinite stream of incrementing numbers
 * const infinite = function* () {
 *   let i = 0;
 *
 *   while (true) {
 *     yield i++;
 *   }
 * };
 *
 * Rx.Observable.from(infinite())
 * .take(3) // only take 3, cause this is infinite
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('ta dam!')
 * );
 *
 * // Logs
 * // 0
 * // 1
 * // 2
 * // "ta dam!"
 *
 * @interface
 * @name ObservableInput
 * @noimport true
 */
var ObservableInputDoc = (function () {
    function ObservableInputDoc() {
    }
    return ObservableInputDoc;
}());
exports.ObservableInputDoc = ObservableInputDoc;
/**
 *
 * This interface describes what should be returned by function passed to Observable
 * constructor or static {@link create} function. Value of that interface will be used
 * to cancel subscription for given Observable.
 *
 * `TeardownLogic` can be:
 *
 * ## Function
 *
 * Function that takes no parameters. When consumer of created Observable calls `unsubscribe`,
 * that function will be called
 *
 * ## AnonymousSubscription
 *
 * `AnonymousSubscription` is simply an object with `unsubscribe` method on it. That method
 * will work the same as function
 *
 * ## void
 *
 * If created Observable does not have any resources to clean up, function does not have to
 * return anything.
 *
 * @interface
 * @name TeardownLogic
 * @noimport true
 */
var TeardownLogicDoc = (function () {
    function TeardownLogicDoc() {
    }
    return TeardownLogicDoc;
}());
exports.TeardownLogicDoc = TeardownLogicDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzY0pTRG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWlzY0pTRG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsMkNBQTBDO0FBQzFDLHNDQUFvQztBQUdwQzs7OztHQUlHO0FBQ0g7SUFBQTtJQTJIQSxDQUFDO0lBMUhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0hHO0lBQ0ksb0JBQU0sR0FBYixVQUFpQixjQUEyRDtRQUMxRSxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFJLGNBQWMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFBQSxDQUFDO0lBQ0osb0JBQUM7QUFBRCxDQUFDLEFBM0hELElBMkhDO0FBM0hZLHNDQUFhO0FBNkgxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSDtJQUFBO1FBQ0U7Ozs7V0FJRztRQUNILFdBQU0sR0FBWSxLQUFLLENBQUM7SUE2QjFCLENBQUM7SUE1QkM7Ozs7O09BS0c7SUFDSCwwQkFBSSxHQUFKLFVBQUssS0FBUTtRQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0gsMkJBQUssR0FBTCxVQUFNLEdBQVE7UUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsOEJBQVEsR0FBUjtRQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLGtDQUFXO0FBcUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFGRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDREQUF3QjtBQUlyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkhHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksZ0RBQWtCO0FBSS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBUaGlzIGZpbGUgYW5kIGl0cyBkZWZpbml0aW9ucyBhcmUgbmVlZGVkIGp1c3Qgc28gdGhhdCBFU0RvYyBzZWVzIHRoZXNlXG4gKiBKU0RvYyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzLiBPcmlnaW5hbGx5IHRoZXkgd2VyZSBtZWFudCBmb3Igc29tZSBUeXBlU2NyaXB0XG4gKiBpbnRlcmZhY2VzLCBidXQgVHlwZVNjcmlwdCBzdHJpcHMgYXdheSBKU0RvYyBjb21tZW50cyBuZWFyIGludGVyZmFjZXMuIEhlbmNlLFxuICogd2UgbmVlZCB0aGVzZSBib2d1cyBjbGFzc2VzLCB3aGljaCBhcmUgbm90IHN0cmlwcGVkIGF3YXkuIFRoaXMgZmlsZSBvbiB0aGVcbiAqIG90aGVyIGhhbmQsIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgcmVsZWFzZSBidW5kbGUuXG4gKi9cbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi9PYnNlcnZhYmxlJztcbmltcG9ydCAnLi9vYnNlcnZhYmxlL2RvbS9NaXNjSlNEb2MnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlRG9jIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgT2JzZXJ2YWJsZSwgdGhhdCB3aWxsIGV4ZWN1dGUgdGhlIHNwZWNpZmllZCBmdW5jdGlvbiB3aGVuIGFuXG4gICAqIHtAbGluayBPYnNlcnZlcn0gc3Vic2NyaWJlcyB0byBpdC5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNyZWF0ZSBjdXN0b20gT2JzZXJ2YWJsZSwgdGhhdCBkb2VzIHdoYXRldmVyIHlvdSBsaWtlLjwvc3Bhbj5cbiAgICpcbiAgICogPGltZyBzcmM9XCIuL2ltZy9jcmVhdGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIGBjcmVhdGVgIGNvbnZlcnRzIGFuIGBvblN1YnNjcmlwdGlvbmAgZnVuY3Rpb24gdG8gYW4gYWN0dWFsIE9ic2VydmFibGUuXG4gICAqIFdoZW5ldmVyIHNvbWVvbmUgc3Vic2NyaWJlcyB0byB0aGF0IE9ic2VydmFibGUsIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZFxuICAgKiB3aXRoIGFuIHtAbGluayBPYnNlcnZlcn0gaW5zdGFuY2UgYXMgYSBmaXJzdCBhbmQgb25seSBwYXJhbWV0ZXIuIGBvblN1YnNjcmlwdGlvbmAgc2hvdWxkXG4gICAqIHRoZW4gaW52b2tlIHRoZSBPYnNlcnZlcnMgYG5leHRgLCBgZXJyb3JgIGFuZCBgY29tcGxldGVgIG1ldGhvZHMuXG4gICAqXG4gICAqIENhbGxpbmcgYG5leHRgIHdpdGggYSB2YWx1ZSB3aWxsIGVtaXQgdGhhdCB2YWx1ZSB0byB0aGUgb2JzZXJ2ZXIuIENhbGxpbmcgYGNvbXBsZXRlYFxuICAgKiBtZWFucyB0aGF0IE9ic2VydmFibGUgZmluaXNoZWQgZW1pdHRpbmcgYW5kIHdpbGwgbm90IGRvIGFueXRoaW5nIGVsc2UuXG4gICAqIENhbGxpbmcgYGVycm9yYCBtZWFucyB0aGF0IHNvbWV0aGluZyB3ZW50IHdyb25nIC0gdmFsdWUgcGFzc2VkIHRvIGBlcnJvcmAgbWV0aG9kIHNob3VsZFxuICAgKiBwcm92aWRlIGRldGFpbHMgb24gd2hhdCBleGFjdGx5IGhhcHBlbmVkLlxuICAgKlxuICAgKiBBIHdlbGwtZm9ybWVkIE9ic2VydmFibGUgY2FuIGVtaXQgYXMgbWFueSB2YWx1ZXMgYXMgaXQgbmVlZHMgdmlhIGBuZXh0YCBtZXRob2QsXG4gICAqIGJ1dCBgY29tcGxldGVgIGFuZCBgZXJyb3JgIG1ldGhvZHMgY2FuIGJlIGNhbGxlZCBvbmx5IG9uY2UgYW5kIG5vdGhpbmcgZWxzZSBjYW4gYmUgY2FsbGVkXG4gICAqIHRoZXJlYWZ0ZXIuIElmIHlvdSB0cnkgdG8gaW52b2tlIGBuZXh0YCwgYGNvbXBsZXRlYCBvciBgZXJyb3JgIG1ldGhvZHMgYWZ0ZXIgY3JlYXRlZFxuICAgKiBPYnNlcnZhYmxlIGFscmVhZHkgY29tcGxldGVkIG9yIGVuZGVkIHdpdGggYW4gZXJyb3IsIHRoZXNlIGNhbGxzIHdpbGwgYmUgaWdub3JlZCB0b1xuICAgKiBwcmVzZXJ2ZSBzbyBjYWxsZWQgKk9ic2VydmFibGUgQ29udHJhY3QqLiBOb3RlIHRoYXQgeW91IGFyZSBub3QgcmVxdWlyZWQgdG8gY2FsbFxuICAgKiBgY29tcGxldGVgIGF0IGFueSBwb2ludCAtIGl0IGlzIHBlcmZlY3RseSBmaW5lIHRvIGNyZWF0ZSBhbiBPYnNlcnZhYmxlIHRoYXQgbmV2ZXIgZW5kcyxcbiAgICogZGVwZW5kaW5nIG9uIHlvdXIgbmVlZHMuXG4gICAqXG4gICAqIGBvblN1YnNjcmlwdGlvbmAgY2FuIG9wdGlvbmFsbHkgcmV0dXJuIGVpdGhlciBhIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCB3aXRoXG4gICAqIGB1bnN1YnNjcmliZWAgbWV0aG9kLiBJbiBib3RoIGNhc2VzIGZ1bmN0aW9uIG9yIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aGVuXG4gICAqIHN1YnNjcmlwdGlvbiB0byBPYnNlcnZhYmxlIGlzIGJlaW5nIGNhbmNlbGxlZCBhbmQgc2hvdWxkIGJlIHVzZWQgdG8gY2xlYW4gdXAgYWxsXG4gICAqIHJlc291cmNlcy4gU28sIGZvciBleGFtcGxlLCBpZiB5b3UgYXJlIHVzaW5nIGBzZXRUaW1lb3V0YCBpbiB5b3VyIGN1c3RvbVxuICAgKiBPYnNlcnZhYmxlLCB3aGVuIHNvbWVvbmUgdW5zdWJzY3JpYmVzLCB5b3UgY2FuIGNsZWFyIHBsYW5uZWQgdGltZW91dCwgc28gdGhhdFxuICAgKiBpdCBkb2VzIG5vdCBmaXJlIG5lZWRsZXNzbHkgYW5kIGJyb3dzZXIgKG9yIG90aGVyIGVudmlyb25tZW50KSBkb2VzIG5vdCB3YXN0ZVxuICAgKiBjb21wdXRpbmcgcG93ZXIgb24gdGltaW5nIGV2ZW50IHRoYXQgbm8gb25lIHdpbGwgbGlzdGVuIHRvIGFueXdheXMuXG4gICAqXG4gICAqIE1vc3Qgb2YgdGhlIHRpbWVzIHlvdSBzaG91bGQgbm90IG5lZWQgdG8gdXNlIGBjcmVhdGVgLCBiZWNhdXNlIGV4aXN0aW5nXG4gICAqIG9wZXJhdG9ycyBhbGxvdyB5b3UgdG8gY3JlYXRlIGFuIE9ic2VydmFibGUgZm9yIG1vc3Qgb2YgdGhlIHVzZSBjYXNlcy5cbiAgICogVGhhdCBiZWluZyBzYWlkLCBgY3JlYXRlYCBpcyBsb3ctbGV2ZWwgbWVjaGFuaXNtIGFsbG93aW5nIHlvdSB0byBjcmVhdGVcbiAgICogYW55IE9ic2VydmFibGUsIGlmIHlvdSBoYXZlIHZlcnkgc3BlY2lmaWMgbmVlZHMuXG4gICAqXG4gICAqICoqVHlwZVNjcmlwdCBzaWduYXR1cmUgaXNzdWUqKlxuICAgKlxuICAgKiBCZWNhdXNlIE9ic2VydmFibGUgZXh0ZW5kcyBjbGFzcyB3aGljaCBhbHJlYWR5IGhhcyBkZWZpbmVkIHN0YXRpYyBgY3JlYXRlYCBmdW5jdGlvbixcbiAgICogYnV0IHdpdGggZGlmZmVyZW50IHR5cGUgc2lnbmF0dXJlLCBpdCB3YXMgaW1wb3NzaWJsZSB0byBhc3NpZ24gcHJvcGVyIHNpZ25hdHVyZSB0b1xuICAgKiBgT2JzZXJ2YWJsZS5jcmVhdGVgLiBCZWNhdXNlIG9mIHRoYXQsIGl0IGhhcyB2ZXJ5IGdlbmVyYWwgdHlwZSBgRnVuY3Rpb25gIGFuZCB0aHVzXG4gICAqIGZ1bmN0aW9uIHBhc3NlZCB0byBgY3JlYXRlYCB3aWxsIG5vdCBiZSB0eXBlIGNoZWNrZWQsIHVubGVzcyB5b3UgZXhwbGljaXRseSBzdGF0ZVxuICAgKiB3aGF0IHNpZ25hdHVyZSBpdCBzaG91bGQgaGF2ZS5cbiAgICpcbiAgICogV2hlbiB1c2luZyBUeXBlU2NyaXB0IHdlIHJlY29tbWVuZCB0byBkZWNsYXJlIHR5cGUgc2lnbmF0dXJlIG9mIGZ1bmN0aW9uIHBhc3NlZCB0b1xuICAgKiBgY3JlYXRlYCBhcyBgKG9ic2VydmVyOiBPYnNlcnZlcikgPT4gVGVhcmRvd25Mb2dpY2AsIHdoZXJlIHtAbGluayBPYnNlcnZlcn1cbiAgICogYW5kIHtAbGluayBUZWFyZG93bkxvZ2ljfSBhcmUgaW50ZXJmYWNlcyBwcm92aWRlZCBieSB0aGUgbGlicmFyeS5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aHJlZSBudW1iZXJzLCB0aGVuIGNvbXBsZXRlLjwvY2FwdGlvbj5cbiAgICogdmFyIG9ic2VydmFibGUgPSBSeC5PYnNlcnZhYmxlLmNyZWF0ZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICogICBvYnNlcnZlci5uZXh0KDEpO1xuICAgKiAgIG9ic2VydmVyLm5leHQoMik7XG4gICAqICAgb2JzZXJ2ZXIubmV4dCgzKTtcbiAgICogICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgKiB9KTtcbiAgICogb2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAqICAgdmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICAgKiAgIGVyciA9PiB7fSxcbiAgICogICAoKSA9PiBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgZW5kJylcbiAgICogKTtcbiAgICpcbiAgICogLy8gTG9nc1xuICAgKiAvLyAxXG4gICAqIC8vIDJcbiAgICogLy8gM1xuICAgKiAvLyBcInRoaXMgaXMgdGhlIGVuZFwiXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgYW4gZXJyb3I8L2NhcHRpb24+XG4gICAqIGNvbnN0IG9ic2VydmFibGUgPSBSeC5PYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXIpID0+IHtcbiAgICogICBvYnNlcnZlci5lcnJvcignc29tZXRoaW5nIHdlbnQgcmVhbGx5IHdyb25nLi4uJyk7XG4gICAqIH0pO1xuICAgKlxuICAgKiBvYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICogICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksIC8vIHdpbGwgbmV2ZXIgYmUgY2FsbGVkXG4gICAqICAgZXJyID0+IGNvbnNvbGUubG9nKGVyciksXG4gICAqICAgKCkgPT4gY29uc29sZS5sb2coJ2NvbXBsZXRlJykgLy8gd2lsbCBuZXZlciBiZSBjYWxsZWRcbiAgICogKTtcbiAgICpcbiAgICogLy8gTG9nc1xuICAgKiAvLyBcInNvbWV0aGluZyB3ZW50IHJlYWxseSB3cm9uZy4uLlwiXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlJldHVybiB1bnN1YnNjcmliZSBmdW5jdGlvbjwvY2FwdGlvbj5cbiAgICpcbiAgICogY29uc3Qgb2JzZXJ2YWJsZSA9IFJ4Lk9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICogICBjb25zdCBpZCA9IHNldFRpbWVvdXQoKCkgPT4gb2JzZXJ2ZXIubmV4dCgnLi4uJyksIDUwMDApOyAvLyBlbWl0IHZhbHVlIGFmdGVyIDVzXG4gICAqXG4gICAqICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KGlkKTsgY29uc29sZS5sb2coJ2NsZWFyZWQhJyk7IH07XG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zdCBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuICAgKlxuICAgKiBzZXRUaW1lb3V0KCgpID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpLCAzMDAwKTsgLy8gY2FuY2VsIHN1YnNjcmlwdGlvbiBhZnRlciAzc1xuICAgKlxuICAgKiAvLyBMb2dzOlxuICAgKiAvLyBcImNsZWFyZWQhXCIgYWZ0ZXIgM3NcbiAgICpcbiAgICogLy8gTmV2ZXIgbG9ncyBcIi4uLlwiXG4gICAqXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGVtcHR5fVxuICAgKiBAc2VlIHtAbGluayBuZXZlcn1cbiAgICogQHNlZSB7QGxpbmsgb2Z9XG4gICAqIEBzZWUge0BsaW5rIHRocm93fVxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKG9ic2VydmVyOiBPYnNlcnZlcik6IFRlYXJkb3duTG9naWN9IG9uU3Vic2NyaXB0aW9uIEFcbiAgICogZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGFuIE9ic2VydmVyLCBhbmQgaW52b2tlcyBpdHMgYG5leHRgLFxuICAgKiBgZXJyb3JgLCBhbmQgYGNvbXBsZXRlYCBtZXRob2RzIGFzIGFwcHJvcHJpYXRlLCBhbmQgb3B0aW9uYWxseSByZXR1cm5zIHNvbWVcbiAgICogbG9naWMgZm9yIGNsZWFuaW5nIHVwIHJlc291cmNlcy5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0LCB3aGVuZXZlciBzdWJzY3JpYmVkLCB3aWxsIGV4ZWN1dGUgdGhlXG4gICAqIHNwZWNpZmllZCBmdW5jdGlvbi5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGNyZWF0ZVxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPihvblN1YnNjcmlwdGlvbjogPFI+KG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4gVGVhcmRvd25Mb2dpYyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUPihvblN1YnNjcmlwdGlvbik7XG4gIH07XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBhIGNvbnN1bWVyIG9mIHB1c2gtYmFzZWQgbm90aWZpY2F0aW9ucyBkZWxpdmVyZWQgYnkgYW5cbiAqIHtAbGluayBPYnNlcnZhYmxlfS5cbiAqXG4gKiBgYGB0c1xuICogaW50ZXJmYWNlIE9ic2VydmVyPFQ+IHtcbiAqICAgY2xvc2VkPzogYm9vbGVhbjtcbiAqICAgbmV4dDogKHZhbHVlOiBUKSA9PiB2b2lkO1xuICogICBlcnJvcjogKGVycjogYW55KSA9PiB2b2lkO1xuICogICBjb21wbGV0ZTogKCkgPT4gdm9pZDtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEFuIG9iamVjdCBjb25mb3JtaW5nIHRvIHRoZSBPYnNlcnZlciBpbnRlcmZhY2UgaXMgdXN1YWxseVxuICogZ2l2ZW4gdG8gdGhlIGBvYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZlcilgIG1ldGhvZCwgYW5kIHRoZSBPYnNlcnZhYmxlIHdpbGxcbiAqIGNhbGwgdGhlIE9ic2VydmVyJ3MgYG5leHQodmFsdWUpYCBtZXRob2QgdG8gcHJvdmlkZSBub3RpZmljYXRpb25zLiBBXG4gKiB3ZWxsLWJlaGF2ZWQgT2JzZXJ2YWJsZSB3aWxsIGNhbGwgYW4gT2JzZXJ2ZXIncyBgY29tcGxldGUoKWAgbWV0aG9kIGV4YWN0bHlcbiAqIG9uY2Ugb3IgdGhlIE9ic2VydmVyJ3MgYGVycm9yKGVycilgIG1ldGhvZCBleGFjdGx5IG9uY2UsIGFzIHRoZSBsYXN0XG4gKiBub3RpZmljYXRpb24gZGVsaXZlcmVkLlxuICpcbiAqIEBpbnRlcmZhY2VcbiAqIEBuYW1lIE9ic2VydmVyXG4gKiBAbm9pbXBvcnQgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXJEb2M8VD4ge1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoaXMgT2JzZXJ2ZXIsIHdoZW4gdXNlZCBhcyBhXG4gICAqIHN1YnNjcmliZXIsIGhhcyBhbHJlYWR5IGJlZW4gdW5zdWJzY3JpYmVkIGZyb20gaXRzIE9ic2VydmFibGUuXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgY2xvc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYG5leHRgIGZyb20gdGhlIE9ic2VydmFibGUsXG4gICAqIHdpdGggYSB2YWx1ZS4gVGhlIE9ic2VydmFibGUgbWF5IGNhbGwgdGhpcyBtZXRob2QgMCBvciBtb3JlIHRpbWVzLlxuICAgKiBAcGFyYW0ge1R9IHZhbHVlIFRoZSBgbmV4dGAgdmFsdWUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBuZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIHRvIHJlY2VpdmUgbm90aWZpY2F0aW9ucyBvZiB0eXBlIGBlcnJvcmAgZnJvbSB0aGUgT2JzZXJ2YWJsZSxcbiAgICogd2l0aCBhbiBhdHRhY2hlZCB7QGxpbmsgRXJyb3J9LiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdCB0aGUgT2JzZXJ2YWJsZVxuICAgKiBoYXMgZXhwZXJpZW5jZWQgYW4gZXJyb3IgY29uZGl0aW9uLlxuICAgKiBAcGFyYW0ge2FueX0gZXJyIFRoZSBgZXJyb3JgIGV4Y2VwdGlvbi5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGVycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIHRvIHJlY2VpdmUgYSB2YWx1ZWxlc3Mgbm90aWZpY2F0aW9uIG9mIHR5cGUgYGNvbXBsZXRlYCBmcm9tXG4gICAqIHRoZSBPYnNlcnZhYmxlLiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdCB0aGUgT2JzZXJ2YWJsZSBoYXMgZmluaXNoZWRcbiAgICogc2VuZGluZyBwdXNoLWJhc2VkIG5vdGlmaWNhdGlvbnMuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjb21wbGV0ZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogYFN1YnNjcmliYWJsZU9yUHJvbWlzZWAgaW50ZXJmYWNlIGRlc2NyaWJlcyB2YWx1ZXMgdGhhdCBiZWhhdmUgbGlrZSBlaXRoZXJcbiAqIE9ic2VydmFibGVzIG9yIFByb21pc2VzLiBFdmVyeSBvcGVyYXRvciB0aGF0IGFjY2VwdHMgYXJndW1lbnRzIGFubm90YXRlZFxuICogd2l0aCB0aGlzIGludGVyZmFjZSwgY2FuIGJlIGFsc28gdXNlZCB3aXRoIHBhcmFtZXRlcnMgdGhhdCBhcmUgbm90IG5lY2Vzc2FyaWx5XG4gKiBSeEpTIE9ic2VydmFibGVzLlxuICpcbiAqIEZvbGxvd2luZyB0eXBlcyBvZiB2YWx1ZXMgbWlnaHQgYmUgcGFzc2VkIHRvIG9wZXJhdG9ycyBleHBlY3RpbmcgdGhpcyBpbnRlcmZhY2U6XG4gKlxuICogIyMgT2JzZXJ2YWJsZVxuICpcbiAqIFJ4SlMge0BsaW5rIE9ic2VydmFibGV9IGluc3RhbmNlLlxuICpcbiAqICMjIE9ic2VydmFibGUtbGlrZSAoU3Vic2NyaWJhYmxlKVxuICpcbiAqIFRoaXMgbWlnaHQgYmUgYW55IG9iamVjdCB0aGF0IGhhcyBgU3ltYm9sLm9ic2VydmFibGVgIG1ldGhvZC4gVGhpcyBtZXRob2QsXG4gKiB3aGVuIGNhbGxlZCwgc2hvdWxkIHJldHVybiBvYmplY3Qgd2l0aCBgc3Vic2NyaWJlYCBtZXRob2Qgb24gaXQsIHdoaWNoIHNob3VsZFxuICogYmVoYXZlIHRoZSBzYW1lIGFzIFJ4SlMgYE9ic2VydmFibGUuc3Vic2NyaWJlYC5cbiAqXG4gKiBgU3ltYm9sLm9ic2VydmFibGVgIGlzIHBhcnQgb2YgaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZSBwcm9wb3NhbC5cbiAqIFNpbmNlIGN1cnJlbnRseSBpdCBpcyBub3Qgc3VwcG9ydGVkIG5hdGl2ZWx5LCBhbmQgZXZlcnkgc3ltYm9sIGlzIGVxdWFsIG9ubHkgdG8gaXRzZWxmLFxuICogeW91IHNob3VsZCB1c2UgaHR0cHM6Ly9naXRodWIuY29tL2JsZXNoL3N5bWJvbC1vYnNlcnZhYmxlIHBvbHlmaWxsLCB3aGVuIGltcGxlbWVudGluZ1xuICogY3VzdG9tIE9ic2VydmFibGUtbGlrZXMuXG4gKlxuICogKipUeXBlU2NyaXB0IFN1YnNjcmliYWJsZSBpbnRlcmZhY2UgaXNzdWUqKlxuICpcbiAqIEFsdGhvdWdoIFR5cGVTY3JpcHQgaW50ZXJmYWNlIGNsYWltcyB0aGF0IFN1YnNjcmliYWJsZSBpcyBhbiBvYmplY3QgdGhhdCBoYXMgYHN1YnNjcmliZWBcbiAqIG1ldGhvZCBkZWNsYXJlZCBkaXJlY3RseSBvbiBpdCwgcGFzc2luZyBjdXN0b20gb2JqZWN0cyB0aGF0IGhhdmUgYHN1YnNjcmliZWBcbiAqIG1ldGhvZCBidXQgbm90IGBTeW1ib2wub2JzZXJ2YWJsZWAgbWV0aG9kIHdpbGwgZmFpbCBhdCBydW50aW1lLiBDb252ZXJzZWx5LCBwYXNzaW5nXG4gKiBvYmplY3RzIHdpdGggYFN5bWJvbC5vYnNlcnZhYmxlYCBidXQgd2l0aG91dCBgc3Vic2NyaWJlYCB3aWxsIGZhaWwgYXQgY29tcGlsZSB0aW1lXG4gKiAoaWYgeW91IHVzZSBUeXBlU2NyaXB0KS5cbiAqXG4gKiBUeXBlU2NyaXB0IGhhcyBwcm9ibGVtIHN1cHBvcnRpbmcgaW50ZXJmYWNlcyB3aXRoIG1ldGhvZHMgZGVmaW5lZCBhcyBzeW1ib2xcbiAqIHByb3BlcnRpZXMuIFRvIGdldCBhcm91bmQgdGhhdCwgeW91IHNob3VsZCBpbXBsZW1lbnQgYHN1YnNjcmliZWAgZGlyZWN0bHkgb25cbiAqIHBhc3NlZCBvYmplY3QsIGFuZCBtYWtlIGBTeW1ib2wub2JzZXJ2YWJsZWAgbWV0aG9kIHNpbXBseSByZXR1cm4gYHRoaXNgLiBUaGF0IHdheVxuICogZXZlcnl0aGluZyB3aWxsIHdvcmsgYXMgZXhwZWN0ZWQsIGFuZCBjb21waWxlciB3aWxsIG5vdCBjb21wbGFpbi4gSWYgeW91IHJlYWxseVxuICogZG8gbm90IHdhbnQgdG8gcHV0IGBzdWJzY3JpYmVgIGRpcmVjdGx5IG9uIHlvdXIgb2JqZWN0LCB5b3Ugd2lsbCBoYXZlIHRvIHR5cGUgY2FzdFxuICogaXQgdG8gYGFueWAsIGJlZm9yZSBwYXNzaW5nIGl0IHRvIGFuIG9wZXJhdG9yLlxuICpcbiAqIFdoZW4gdGhpcyBpc3N1ZSBpcyByZXNvbHZlZCwgU3Vic2NyaWJhYmxlIGludGVyZmFjZSB3aWxsIG9ubHkgcGVybWl0IE9ic2VydmFibGUtbGlrZVxuICogb2JqZWN0cyB3aXRoIGBTeW1ib2wub2JzZXJ2YWJsZWAgZGVmaW5lZCwgbm8gbWF0dGVyIGlmIHRoZXkgdGhlbXNlbHZlcyBpbXBsZW1lbnRcbiAqIGBzdWJzY3JpYmVgIG1ldGhvZCBvciBub3QuXG4gKlxuICogIyMgRVM2IFByb21pc2VcbiAqXG4gKiBQcm9taXNlIGNhbiBiZSBpbnRlcnByZXRlZCBhcyBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdmFsdWUgYW5kIGNvbXBsZXRlc1xuICogd2hlbiBpdCBpcyByZXNvbHZlZCBvciBlcnJvcnMgd2hlbiBpdCBpcyByZWplY3RlZC5cbiAqXG4gKiAjIyBQcm9taXNlLWxpa2UgKFRoZW5hYmxlKVxuICpcbiAqIFByb21pc2VzIHBhc3NlZCB0byBvcGVyYXRvcnMgZG8gbm90IGhhdmUgdG8gYmUgbmF0aXZlIEVTNiBQcm9taXNlcy5cbiAqIFRoZXkgY2FuIGJlIGltcGxlbWVudGF0aW9ucyBmcm9tIHBvcHVsYXIgUHJvbWlzZSBsaWJyYXJpZXMsIHBvbHlmaWxsc1xuICogb3IgZXZlbiBjdXN0b20gb25lcy4gVGhleSBqdXN0IG5lZWQgdG8gaGF2ZSBgdGhlbmAgbWV0aG9kIHRoYXQgd29ya3NcbiAqIGFzIHRoZSBzYW1lIGFzIEVTNiBQcm9taXNlIGB0aGVuYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2UgbWVyZ2UgYW5kIHRoZW4gbWFwIHdpdGggbm9uLVJ4SlMgb2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAqIGNvbnN0IG5vblJ4SlNPYnNlcnZhYmxlID0ge1xuICogICBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAqICAgICBvYnNlcnZlci5uZXh0KDEwMDApO1xuICogICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gKiAgIH0sXG4gKiAgIFtTeW1ib2wub2JzZXJ2YWJsZV0oKSB7XG4gKiAgICAgcmV0dXJuIHRoaXM7XG4gKiAgIH1cbiAqIH07XG4gKlxuICogUnguT2JzZXJ2YWJsZS5tZXJnZShub25SeEpTT2JzZXJ2YWJsZSlcbiAqIC5tYXAodmFsdWUgPT4gXCJUaGlzIHZhbHVlIGlzIFwiICsgdmFsdWUpXG4gKiAuc3Vic2NyaWJlKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQpKTsgLy8gTG9ncyBcIlRoaXMgdmFsdWUgaXMgMTAwMFwiXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBjb21iaW5lTGF0ZXN0IHdpdGggRVM2IFByb21pc2U8L2NhcHRpb24+XG4gKiBSeC5PYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3QoUHJvbWlzZS5yZXNvbHZlKDUpLCBQcm9taXNlLnJlc29sdmUoMTApLCBQcm9taXNlLnJlc29sdmUoMTUpKVxuICogLnN1YnNjcmliZShcbiAqICAgdmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogICBlcnIgPT4ge30sXG4gKiAgICgpID0+IGNvbnNvbGUubG9nKCd0aGUgZW5kIScpXG4gKiApO1xuICogLy8gTG9nc1xuICogLy8gWzUsIDEwLCAxNV1cbiAqIC8vIFwidGhlIGVuZCFcIlxuICpcbiAqXG4gKiBAaW50ZXJmYWNlXG4gKiBAbmFtZSBTdWJzY3JpYmFibGVPclByb21pc2VcbiAqIEBub2ltcG9ydCB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmFibGVPclByb21pc2VEb2M8VD4ge1xuXG59XG5cbi8qKlxuICogYE9ic2VydmFibGVJbnB1dGAgaW50ZXJmYWNlIGRlc2NyaWJlcyBhbGwgdmFsdWVzIHRoYXQgYXJlIGVpdGhlciBhblxuICoge0BsaW5rIFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gb3Igc29tZSBraW5kIG9mIGNvbGxlY3Rpb24gb2YgdmFsdWVzIHRoYXRcbiAqIGNhbiBiZSB0cmFuc2Zvcm1lZCB0byBPYnNlcnZhYmxlIGVtaXR0aW5nIHRoYXQgdmFsdWVzLiBFdmVyeSBvcGVyYXRvciB0aGF0XG4gKiBhY2NlcHRzIGFyZ3VtZW50cyBhbm5vdGF0ZWQgd2l0aCB0aGlzIGludGVyZmFjZSwgY2FuIGJlIGFsc28gdXNlZCB3aXRoXG4gKiBwYXJhbWV0ZXJzIHRoYXQgYXJlIG5vdCBuZWNlc3NhcmlseSBSeEpTIE9ic2VydmFibGVzLlxuICpcbiAqIGBPYnNlcnZhYmxlSW5wdXRgIGV4dGVuZHMge0BsaW5rIFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gd2l0aCBmb2xsb3dpbmcgdHlwZXM6XG4gKlxuICogIyMgQXJyYXlcbiAqXG4gKiBBcnJheXMgY2FuIGJlIGludGVycHJldGVkIGFzIG9ic2VydmFibGVzIHRoYXQgZW1pdCBhbGwgdmFsdWVzIGluIGFycmF5IG9uZSBieSBvbmUsXG4gKiBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCB0aGVuIGNvbXBsZXRlIGltbWVkaWF0ZWx5LlxuICpcbiAqICMjIEFycmF5LWxpa2VcbiAqXG4gKiBBcnJheXMgcGFzc2VkIHRvIG9wZXJhdG9ycyBkbyBub3QgaGF2ZSB0byBiZSBidWlsdC1pbiBKYXZhU2NyaXB0IEFycmF5cy4gVGhleVxuICogY2FuIGJlIGFsc28sIGZvciBleGFtcGxlLCBgYXJndW1lbnRzYCBwcm9wZXJ0eSBhdmFpbGFibGUgaW5zaWRlIGV2ZXJ5IGZ1bmN0aW9uLFxuICogW0RPTSBOb2RlTGlzdF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvcGwvZG9jcy9XZWIvQVBJL05vZGVMaXN0KSxcbiAqIG9yLCBhY3R1YWxseSwgYW55IG9iamVjdCB0aGF0IGhhcyBgbGVuZ3RoYCBwcm9wZXJ0eSAod2hpY2ggaXMgYSBudW1iZXIpXG4gKiBhbmQgc3RvcmVzIHZhbHVlcyB1bmRlciBub24tbmVnYXRpdmUgKHplcm8gYW5kIHVwKSBpbnRlZ2Vycy5cbiAqXG4gKiAjIyBFUzYgSXRlcmFibGVcbiAqXG4gKiBPcGVyYXRvcnMgd2lsbCBhY2NlcHQgYm90aCBidWlsdC1pbiBhbmQgY3VzdG9tIEVTNiBJdGVyYWJsZXMsIGJ5IHRyZWF0aW5nIHRoZW0gYXNcbiAqIG9ic2VydmFibGVzIHRoYXQgZW1pdCBhbGwgaXRzIHZhbHVlcyBpbiBvcmRlciBvZiBpdGVyYXRpb24gYW5kIHRoZW4gY29tcGxldGVcbiAqIHdoZW4gaXRlcmF0aW9uIGVuZHMuIE5vdGUgdGhhdCBjb250cmFyeSB0byBhcnJheXMsIEl0ZXJhYmxlcyBkbyBub3QgaGF2ZSB0b1xuICogbmVjZXNzYXJpbHkgYmUgZmluaXRlLCBzbyBjcmVhdGluZyBPYnNlcnZhYmxlcyB0aGF0IG5ldmVyIGNvbXBsZXRlIGlzIHBvc3NpYmxlIGFzIHdlbGwuXG4gKlxuICogTm90ZSB0aGF0IHlvdSBjYW4gbWFrZSBpdGVyYXRvciBhbiBpbnN0YW5jZSBvZiBJdGVyYWJsZSBieSBoYXZpbmcgaXQgcmV0dXJuIGl0c2VsZlxuICogaW4gYFN5bWJvbC5pdGVyYXRvcmAgbWV0aG9kLiBJdCBtZWFucyB0aGF0IGV2ZXJ5IG9wZXJhdG9yIGFjY2VwdGluZyBJdGVyYWJsZXMgYWNjZXB0cyxcbiAqIHRob3VnaCBpbmRpcmVjdGx5LCBpdGVyYXRvcnMgdGhlbXNlbHZlcyBhcyB3ZWxsLiBBbGwgbmF0aXZlIEVTNiBpdGVyYXRvcnMgYXJlIGluc3RhbmNlc1xuICogb2YgSXRlcmFibGUgYnkgZGVmYXVsdCwgc28geW91IGRvIG5vdCBoYXZlIHRvIGltcGxlbWVudCB0aGVpciBgU3ltYm9sLml0ZXJhdG9yYCBtZXRob2RcbiAqIHlvdXJzZWxmLlxuICpcbiAqICoqVHlwZVNjcmlwdCBJdGVyYWJsZSBpbnRlcmZhY2UgaXNzdWUqKlxuICpcbiAqIFR5cGVTY3JpcHQgYE9ic2VydmFibGVJbnB1dGAgaW50ZXJmYWNlIGFjdHVhbGx5IGxhY2tzIHR5cGUgc2lnbmF0dXJlIGZvciBJdGVyYWJsZXMsXG4gKiBiZWNhdXNlIG9mIGlzc3VlcyBpdCBjYXVzZWQgaW4gc29tZSBwcm9qZWN0cyAoc2VlIFt0aGlzIGlzc3VlXShodHRwczovL2dpdGh1Yi5jb20vUmVhY3RpdmVYL3J4anMvaXNzdWVzLzIzMDYpKS5cbiAqIElmIHlvdSB3YW50IHRvIHVzZSBJdGVyYWJsZSBhcyBhcmd1bWVudCBmb3Igb3BlcmF0b3IsIGNhc3QgaXQgdG8gYGFueWAgZmlyc3QuXG4gKiBSZW1lbWJlciBvZiBjb3Vyc2UgdGhhdCwgYmVjYXVzZSBvZiBjYXN0aW5nLCB5b3UgaGF2ZSB0byB5b3Vyc2VsZiBlbnN1cmUgdGhhdCBwYXNzZWRcbiAqIGFyZ3VtZW50IHJlYWxseSBpbXBsZW1lbnRzIHNhaWQgaW50ZXJmYWNlLlxuICpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2UgbWVyZ2Ugd2l0aCBhcnJheXM8L2NhcHRpb24+XG4gKiBSeC5PYnNlcnZhYmxlLm1lcmdlKFsxLCAyXSwgWzRdLCBbNSwgNl0pXG4gKiAuc3Vic2NyaWJlKFxuICogICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiAgIGVyciA9PiB7fSxcbiAqICAgKCkgPT4gY29uc29sZS5sb2coJ3RhIGRhbSEnKVxuICogKTtcbiAqXG4gKiAvLyBMb2dzXG4gKiAvLyAxXG4gKiAvLyAyXG4gKiAvLyAzXG4gKiAvLyA0XG4gKiAvLyA1XG4gKiAvLyA2XG4gKiAvLyBcInRhIGRhbSFcIlxuICpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2UgbWVyZ2Ugd2l0aCBhcnJheS1saWtlPC9jYXB0aW9uPlxuICogUnguT2JzZXJ2YWJsZS5tZXJnZSh7MDogMSwgMTogMiwgbGVuZ3RoOiAyfSwgezA6IDMsIGxlbmd0aDogMX0pXG4gKiAuc3Vic2NyaWJlKFxuICogICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiAgIGVyciA9PiB7fSxcbiAqICAgKCkgPT4gY29uc29sZS5sb2coJ25pY2UsIGh1aD8nKVxuICogKTtcbiAqXG4gKiAvLyBMb2dzXG4gKiAvLyAxXG4gKiAvLyAyXG4gKiAvLyAzXG4gKiAvLyBcIm5pY2UsIGh1aD9cIlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBtZXJnZSB3aXRoIGFuIEl0ZXJhYmxlIChNYXApPC9jYXB0aW9uPlxuICogY29uc3QgZmlyc3RNYXAgPSBuZXcgTWFwKFtbMSwgJ2EnXSwgWzIsICdiJ11dKTtcbiAqIGNvbnN0IHNlY29uZE1hcCA9IG5ldyBNYXAoW1szLCAnYyddLCBbNCwgJ2QnXV0pO1xuICpcbiAqIFJ4Lk9ic2VydmFibGUubWVyZ2UoXG4gKiAgIGZpcnN0TWFwLCAgICAgICAgICAvLyBwYXNzIEl0ZXJhYmxlXG4gKiAgIHNlY29uZE1hcC52YWx1ZXMoKSAvLyBwYXNzIGl0ZXJhdG9yLCB3aGljaCBpcyBpdHNlbGYgYW4gSXRlcmFibGVcbiAqICkuc3Vic2NyaWJlKFxuICogICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiAgIGVyciA9PiB7fSxcbiAqICAgKCkgPT4gY29uc29sZS5sb2coJ3l1cCEnKVxuICogKTtcbiAqXG4gKiAvLyBMb2dzXG4gKiAvLyBbMSwgXCJhXCJdXG4gKiAvLyBbMiwgXCJiXCJdXG4gKiAvLyBcImNcIlxuICogLy8gXCJkXCJcbiAqIC8vIFwieXVwIVwiXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIGZyb20gd2l0aCBnZW5lcmF0b3IgKHJldHVybmluZyBpbmZpbml0ZSBpdGVyYXRvcik8L2NhcHRpb24+XG4gKiAvLyBpbmZpbml0ZSBzdHJlYW0gb2YgaW5jcmVtZW50aW5nIG51bWJlcnNcbiAqIGNvbnN0IGluZmluaXRlID0gZnVuY3Rpb24qICgpIHtcbiAqICAgbGV0IGkgPSAwO1xuICpcbiAqICAgd2hpbGUgKHRydWUpIHtcbiAqICAgICB5aWVsZCBpKys7XG4gKiAgIH1cbiAqIH07XG4gKlxuICogUnguT2JzZXJ2YWJsZS5mcm9tKGluZmluaXRlKCkpXG4gKiAudGFrZSgzKSAvLyBvbmx5IHRha2UgMywgY2F1c2UgdGhpcyBpcyBpbmZpbml0ZVxuICogLnN1YnNjcmliZShcbiAqICAgdmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogICBlcnIgPT4ge30sXG4gKiAgICgpID0+IGNvbnNvbGUubG9nKCd0YSBkYW0hJylcbiAqICk7XG4gKlxuICogLy8gTG9nc1xuICogLy8gMFxuICogLy8gMVxuICogLy8gMlxuICogLy8gXCJ0YSBkYW0hXCJcbiAqXG4gKiBAaW50ZXJmYWNlXG4gKiBAbmFtZSBPYnNlcnZhYmxlSW5wdXRcbiAqIEBub2ltcG9ydCB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlSW5wdXREb2M8VD4ge1xuXG59XG5cbi8qKlxuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGRlc2NyaWJlcyB3aGF0IHNob3VsZCBiZSByZXR1cm5lZCBieSBmdW5jdGlvbiBwYXNzZWQgdG8gT2JzZXJ2YWJsZVxuICogY29uc3RydWN0b3Igb3Igc3RhdGljIHtAbGluayBjcmVhdGV9IGZ1bmN0aW9uLiBWYWx1ZSBvZiB0aGF0IGludGVyZmFjZSB3aWxsIGJlIHVzZWRcbiAqIHRvIGNhbmNlbCBzdWJzY3JpcHRpb24gZm9yIGdpdmVuIE9ic2VydmFibGUuXG4gKlxuICogYFRlYXJkb3duTG9naWNgIGNhbiBiZTpcbiAqXG4gKiAjIyBGdW5jdGlvblxuICpcbiAqIEZ1bmN0aW9uIHRoYXQgdGFrZXMgbm8gcGFyYW1ldGVycy4gV2hlbiBjb25zdW1lciBvZiBjcmVhdGVkIE9ic2VydmFibGUgY2FsbHMgYHVuc3Vic2NyaWJlYCxcbiAqIHRoYXQgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWRcbiAqXG4gKiAjIyBBbm9ueW1vdXNTdWJzY3JpcHRpb25cbiAqXG4gKiBgQW5vbnltb3VzU3Vic2NyaXB0aW9uYCBpcyBzaW1wbHkgYW4gb2JqZWN0IHdpdGggYHVuc3Vic2NyaWJlYCBtZXRob2Qgb24gaXQuIFRoYXQgbWV0aG9kXG4gKiB3aWxsIHdvcmsgdGhlIHNhbWUgYXMgZnVuY3Rpb25cbiAqXG4gKiAjIyB2b2lkXG4gKlxuICogSWYgY3JlYXRlZCBPYnNlcnZhYmxlIGRvZXMgbm90IGhhdmUgYW55IHJlc291cmNlcyB0byBjbGVhbiB1cCwgZnVuY3Rpb24gZG9lcyBub3QgaGF2ZSB0b1xuICogcmV0dXJuIGFueXRoaW5nLlxuICpcbiAqIEBpbnRlcmZhY2VcbiAqIEBuYW1lIFRlYXJkb3duTG9naWNcbiAqIEBub2ltcG9ydCB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZWFyZG93bkxvZ2ljRG9jIHtcblxufVxuIl19