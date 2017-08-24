"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var AsyncSubject_1 = require("../AsyncSubject");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var BoundCallbackObservable = (function (_super) {
    __extends(BoundCallbackObservable, _super);
    function BoundCallbackObservable(callbackFunc, selector, args, context, scheduler) {
        var _this = _super.call(this) || this;
        _this.callbackFunc = callbackFunc;
        _this.selector = selector;
        _this.args = args;
        _this.context = context;
        _this.scheduler = scheduler;
        return _this;
    }
    /* tslint:enable:max-line-length */
    /**
     * Converts a callback API to a function that returns an Observable.
     *
     * <span class="informal">Give it a function `f` of type `f(x, callback)` and
     * it will return a function `g` that when called as `g(x)` will output an
     * Observable.</span>
     *
     * `bindCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done.
     *
     * The output of `bindCallback` is a function that takes the same parameters
     * as `func`, except the last one (the callback). When the output function
     * is called with arguments, it will return an Observable. If `func` function
     * calls its callback with one argument, the Observable will emit that value.
     * If on the other hand callback is called with multiple values, resulting
     * Observable will emit an array with these arguments.
     *
     * It is very important to remember, that input function `func` is not called
     * when output function is, but rather when Observable returned by output
     * function is subscribed. This means if `func` makes AJAX request, that request
     * will be made every time someone subscribes to resulting Observable, but not before.
     *
     * Optionally, selector function can be passed to `bindObservable`. That function
     * takes the same arguments as callback, and returns value
     * that will be emitted by Observable instead of callback parameters themselves.
     * Even though by default multiple arguments passed to callback appear in the stream as array,
     * selector function will be called with arguments directly, just as callback would.
     * This means you can imagine default selector (when one is not provided explicitly)
     * as function that aggregates all its arguments into array, or simply returns first argument,
     * if there is only one.
     *
     * Last optional parameter - {@link Scheduler} - can be used to control when call
     * to `func` happens after someone subscribes to Observable, as well as when results
     * passed to callback will be emitted. By default subscription to Observable calls `func`
     * synchronously, but using `Scheduler.async` as last parameter will defer call to input function,
     * just like wrapping that call in `setTimeout` with time `0` would. So if you use async Scheduler
     * and call `subscribe` on output Observable, all function calls that are currently executing,
     * will end before `func` is invoked.
     *
     * When it comes to emitting results passed to callback, by default they are emitted
     * immediately after `func` invokes callback. In particular, if callback is called synchronously,
     * then subscription to resulting Observable will call `next` function synchronously as well.
     * If you want to defer that call, using `Scheduler.async` will, again, do the job.
     * This means that by using `Scheduler.async` you can, in a sense, ensure that `func`
     * always calls its callback asynchronously, thus avoiding terrifying Zalgo.
     *
     * Note that Observable created by output function will always emit only one value
     * and then complete right after. Even if `func` calls callback multiple times, values from
     * second and following calls will never appear in the stream. If you need to
     * listen for multiple calls, you probably want to use {@link fromEvent} or
     * {@link fromEventPattern} instead.
     *
     * If `func` depends on some context (`this` property), that context will be set
     * to the same context that output function has at call time. In particular, if `func`
     * is called as method of some object, in order to preserve proper behaviour,
     * it is recommended to set context of output function to that object as well,
     * provided `func` is not already bound.
     *
     * If input function calls its callback in "node style" (i.e. first argument to callback is
     * optional error parameter signaling whether call failed or not), {@link bindNodeCallback}
     * provides convenient error handling and probably is a better choice.
     * `bindCallback` will treat such functions without any difference and error parameter
     * (whether passed or not) will always be interpreted as regular callback argument.
     *
     *
     * @example <caption>Convert jQuery's getJSON to an Observable API</caption>
     * // Suppose we have jQuery.getJSON('/my/url', callback)
     * var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
     * var result = getJSONAsObservable('/my/url');
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     *
     * @example <caption>Receive array of arguments passed to callback</caption>
     * someFunction((a, b, c) => {
     *   console.log(a); // 5
     *   console.log(b); // 'some string'
     *   console.log(c); // {someProperty: 'someValue'}
     * });
     *
     * const boundSomeFunction = Rx.Observable.bindCallback(someFunction);
     * boundSomeFunction().subscribe(values => {
     *   console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
     * });
     *
     *
     * @example <caption>Use bindCallback with selector function</caption>
     * someFunction((a, b, c) => {
     *   console.log(a); // 'a'
     *   console.log(b); // 'b'
     *   console.log(c); // 'c'
     * });
     *
     * const boundSomeFunction = Rx.Observable.bindCallback(someFunction, (a, b, c) => a + b + c);
     * boundSomeFunction().subscribe(value => {
     *   console.log(value) // 'abc'
     * });
     *
     *
     * @example <caption>Compare behaviour with and without async Scheduler</caption>
     * function iCallMyCallbackSynchronously(cb) {
     *   cb();
     * }
     *
     * const boundSyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously);
     * const boundAsyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously, null, Rx.Scheduler.async);
     *
     * boundSyncFn().subscribe(() => console.log('I was sync!'));
     * boundAsyncFn().subscribe(() => console.log('I was async!'));
     * console.log('This happened...');
     *
     * // Logs:
     * // I was sync!
     * // This happened...
     * // I was async!
     *
     *
     * @example <caption>Use bindCallback on object method</caption>
     * const boundMethod = Rx.Observable.bindCallback(someObject.methodWithCallback);
     * boundMethod.call(someObject) // make sure methodWithCallback has access to someObject
     * .subscribe(subscriber);
     *
     *
     * @see {@link bindNodeCallback}
     * @see {@link from}
     * @see {@link fromPromise}
     *
     * @param {function} func Function with a callback as the last parameter.
     * @param {function} [selector] A function which takes the arguments from the
     * callback and maps those to a value to emit on the output Observable.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * callbacks.
     * @return {function(...params: *): Observable} A function which returns the
     * Observable that delivers the same values the callback would deliver.
     * @static true
     * @name bindCallback
     * @owner Observable
     */
    BoundCallbackObservable.create = function (func, selector, scheduler) {
        if (selector === void 0) { selector = undefined; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new BoundCallbackObservable(func, selector, args, this, scheduler);
        };
    };
    BoundCallbackObservable.prototype._subscribe = function (subscriber) {
        var callbackFunc = this.callbackFunc;
        var args = this.args;
        var scheduler = this.scheduler;
        var subject = this.subject;
        if (!scheduler) {
            if (!subject) {
                subject = this.subject = new AsyncSubject_1.AsyncSubject();
                var handler = function handlerFn() {
                    var innerArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        innerArgs[_i] = arguments[_i];
                    }
                    var source = handlerFn.source;
                    var selector = source.selector, subject = source.subject;
                    if (selector) {
                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                        if (result_1 === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subject.next(result_1);
                            subject.complete();
                        }
                    }
                    else {
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    }
                };
                // use named function instance to avoid closure.
                handler.source = this;
                var result = tryCatch_1.tryCatch(callbackFunc).apply(this.context, args.concat(handler));
                if (result === errorObject_1.errorObject) {
                    subject.error(errorObject_1.errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(BoundCallbackObservable.dispatch, 0, { source: this, subscriber: subscriber, context: this.context });
        }
    };
    BoundCallbackObservable.dispatch = function (state) {
        var self = this;
        var source = state.source, subscriber = state.subscriber, context = state.context;
        var callbackFunc = source.callbackFunc, args = source.args, scheduler = source.scheduler;
        var subject = source.subject;
        if (!subject) {
            subject = source.subject = new AsyncSubject_1.AsyncSubject();
            var handler = function handlerFn() {
                var innerArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    innerArgs[_i] = arguments[_i];
                }
                var source = handlerFn.source;
                var selector = source.selector, subject = source.subject;
                if (selector) {
                    var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                    if (result_2 === errorObject_1.errorObject) {
                        self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                    }
                    else {
                        self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                    }
                }
                else {
                    var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                    self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
                }
            };
            // use named function to pass values in without closure
            handler.source = source;
            var result = tryCatch_1.tryCatch(callbackFunc).apply(context, args.concat(handler));
            if (result === errorObject_1.errorObject) {
                subject.error(errorObject_1.errorObject.e);
            }
        }
        self.add(subject.subscribe(subscriber));
    };
    return BoundCallbackObservable;
}(Observable_1.Observable));
exports.BoundCallbackObservable = BoundCallbackObservable;
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDYWxsYmFja09ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENhbGxiYWNrT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEyQztBQUkzQyw2Q0FBNEM7QUFDNUMsbURBQWtEO0FBQ2xELGdEQUErQztBQUUvQzs7OztHQUlHO0FBQ0g7SUFBZ0QsMkNBQWE7SUEwSzNELGlDQUFvQixZQUFzQixFQUN0QixRQUFrQixFQUNsQixJQUFXLEVBQ1gsT0FBWSxFQUNaLFNBQXFCO1FBSnpDLFlBS0UsaUJBQU8sU0FDUjtRQU5tQixrQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUN0QixjQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFVBQUksR0FBSixJQUFJLENBQU87UUFDWCxhQUFPLEdBQVAsT0FBTyxDQUFLO1FBQ1osZUFBUyxHQUFULFNBQVMsQ0FBWTs7SUFFekMsQ0FBQztJQTNKRCxtQ0FBbUM7SUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBJRztJQUNJLDhCQUFNLEdBQWIsVUFBaUIsSUFBYyxFQUNkLFFBQXFDLEVBQ3JDLFNBQXNCO1FBRHRCLHlCQUFBLEVBQUEsb0JBQXFDO1FBRXBELE1BQU0sQ0FBQztZQUFvQixjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixDQUFJLElBQUksRUFBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRixDQUFDLENBQUM7SUFDSixDQUFDO0lBVVMsNENBQVUsR0FBcEIsVUFBcUIsVUFBK0I7UUFDbEQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUUzQixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwyQkFBWSxFQUFLLENBQUM7Z0JBQy9DLElBQU0sT0FBTyxHQUFHO29CQUE4QixtQkFBbUI7eUJBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjt3QkFBbkIsOEJBQW1COztvQkFDL0QsSUFBTSxNQUFNLEdBQVMsU0FBVSxDQUFDLE1BQU0sQ0FBQztvQkFDL0IsSUFBQSwwQkFBUSxFQUFFLHdCQUFPLENBQVk7b0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ2IsSUFBTSxRQUFNLEdBQUcsbUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUN6RCxFQUFFLENBQUMsQ0FBQyxRQUFNLEtBQUsseUJBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQU0sQ0FBQyxDQUFDOzRCQUNyQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3JCLENBQUM7b0JBQ0gsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQzt3QkFDL0QsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQixDQUFDO2dCQUNILENBQUMsQ0FBQztnQkFDRixnREFBZ0Q7Z0JBQzFDLE9BQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUU3QixJQUFNLE1BQU0sR0FBRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDaEYsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO29CQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxZQUFBLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RILENBQUM7SUFDSCxDQUFDO0lBRU0sZ0NBQVEsR0FBZixVQUFtQixLQUFzRjtRQUN2RyxJQUFNLElBQUksR0FBdUIsSUFBSyxDQUFDO1FBQy9CLElBQUEscUJBQU0sRUFBRSw2QkFBVSxFQUFFLHVCQUFPLENBQVc7UUFDdEMsSUFBQSxrQ0FBWSxFQUFFLGtCQUFJLEVBQUUsNEJBQVMsQ0FBWTtRQUNqRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksMkJBQVksRUFBSyxDQUFDO1lBRWpELElBQU0sT0FBTyxHQUFHO2dCQUE4QixtQkFBbUI7cUJBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjtvQkFBbkIsOEJBQW1COztnQkFDL0QsSUFBTSxNQUFNLEdBQVMsU0FBVSxDQUFDLE1BQU0sQ0FBQztnQkFDL0IsSUFBQSwwQkFBUSxFQUFFLHdCQUFPLENBQVk7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsSUFBTSxRQUFNLEdBQUcsbUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN6RCxFQUFFLENBQUMsQ0FBQyxRQUFNLEtBQUsseUJBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLHlCQUFXLENBQUMsQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNsRixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQU0sRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDNUUsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7b0JBQy9ELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUM7WUFDSCxDQUFDLENBQUM7WUFDRix1REFBdUQ7WUFDakQsT0FBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFL0IsSUFBTSxNQUFNLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUsseUJBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUE1UEQsQ0FBZ0QsdUJBQVUsR0E0UHpEO0FBNVBZLDBEQUF1QjtBQWtRcEMsc0JBQXlCLEdBQXVCO0lBQ3RDLElBQUEsaUJBQUssRUFBRSxxQkFBTyxDQUFTO0lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFNRCx1QkFBMEIsR0FBd0I7SUFDeEMsSUFBQSxhQUFHLEVBQUUscUJBQU8sQ0FBUztJQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgSVNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCB9IGZyb20gJy4uL0FzeW5jU3ViamVjdCc7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgQm91bmRDYWxsYmFja09ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgc3ViamVjdDogQXN5bmNTdWJqZWN0PFQ+O1xuXG4gIC8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICBzdGF0aWMgY3JlYXRlKGNhbGxiYWNrRnVuYzogKGNhbGxiYWNrOiAoKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKCkgPT4gT2JzZXJ2YWJsZTx2b2lkPjtcbiAgc3RhdGljIGNyZWF0ZTxSPihjYWxsYmFja0Z1bmM6IChjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICgpID0+IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8VCwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIGNhbGxiYWNrOiAocmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKHYxOiBUKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgdjI6IFQyLCBjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCBjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMpID0+IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8VCwgVDIsIFQzLCBUNCwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIGNhbGxiYWNrOiAocmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFQ1LCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1LCBjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2LCBjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1LCB2NjogVDYpID0+IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8Uj4oY2FsbGJhY2tGdW5jOiAoY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAoKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCBjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gUiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMikgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCBjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gUiwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNiwgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQ+KGNhbGxiYWNrRnVuYzogRnVuY3Rpb24sIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIGNyZWF0ZTxUPihjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLCBzZWxlY3Rvcj86ICguLi5hcmdzOiBhbnlbXSkgPT4gVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuICAvKipcbiAgICogQ29udmVydHMgYSBjYWxsYmFjayBBUEkgdG8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkdpdmUgaXQgYSBmdW5jdGlvbiBgZmAgb2YgdHlwZSBgZih4LCBjYWxsYmFjaylgIGFuZFxuICAgKiBpdCB3aWxsIHJldHVybiBhIGZ1bmN0aW9uIGBnYCB0aGF0IHdoZW4gY2FsbGVkIGFzIGBnKHgpYCB3aWxsIG91dHB1dCBhblxuICAgKiBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAgICpcbiAgICogYGJpbmRDYWxsYmFja2AgaXMgbm90IGFuIG9wZXJhdG9yIGJlY2F1c2UgaXRzIGlucHV0IGFuZCBvdXRwdXQgYXJlIG5vdFxuICAgKiBPYnNlcnZhYmxlcy4gVGhlIGlucHV0IGlzIGEgZnVuY3Rpb24gYGZ1bmNgIHdpdGggc29tZSBwYXJhbWV0ZXJzLCBidXQgdGhlXG4gICAqIGxhc3QgcGFyYW1ldGVyIG11c3QgYmUgYSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGBmdW5jYCBjYWxscyB3aGVuIGl0IGlzXG4gICAqIGRvbmUuXG4gICAqXG4gICAqIFRoZSBvdXRwdXQgb2YgYGJpbmRDYWxsYmFja2AgaXMgYSBmdW5jdGlvbiB0aGF0IHRha2VzIHRoZSBzYW1lIHBhcmFtZXRlcnNcbiAgICogYXMgYGZ1bmNgLCBleGNlcHQgdGhlIGxhc3Qgb25lICh0aGUgY2FsbGJhY2spLiBXaGVuIHRoZSBvdXRwdXQgZnVuY3Rpb25cbiAgICogaXMgY2FsbGVkIHdpdGggYXJndW1lbnRzLCBpdCB3aWxsIHJldHVybiBhbiBPYnNlcnZhYmxlLiBJZiBgZnVuY2AgZnVuY3Rpb25cbiAgICogY2FsbHMgaXRzIGNhbGxiYWNrIHdpdGggb25lIGFyZ3VtZW50LCB0aGUgT2JzZXJ2YWJsZSB3aWxsIGVtaXQgdGhhdCB2YWx1ZS5cbiAgICogSWYgb24gdGhlIG90aGVyIGhhbmQgY2FsbGJhY2sgaXMgY2FsbGVkIHdpdGggbXVsdGlwbGUgdmFsdWVzLCByZXN1bHRpbmdcbiAgICogT2JzZXJ2YWJsZSB3aWxsIGVtaXQgYW4gYXJyYXkgd2l0aCB0aGVzZSBhcmd1bWVudHMuXG4gICAqXG4gICAqIEl0IGlzIHZlcnkgaW1wb3J0YW50IHRvIHJlbWVtYmVyLCB0aGF0IGlucHV0IGZ1bmN0aW9uIGBmdW5jYCBpcyBub3QgY2FsbGVkXG4gICAqIHdoZW4gb3V0cHV0IGZ1bmN0aW9uIGlzLCBidXQgcmF0aGVyIHdoZW4gT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBvdXRwdXRcbiAgICogZnVuY3Rpb24gaXMgc3Vic2NyaWJlZC4gVGhpcyBtZWFucyBpZiBgZnVuY2AgbWFrZXMgQUpBWCByZXF1ZXN0LCB0aGF0IHJlcXVlc3RcbiAgICogd2lsbCBiZSBtYWRlIGV2ZXJ5IHRpbWUgc29tZW9uZSBzdWJzY3JpYmVzIHRvIHJlc3VsdGluZyBPYnNlcnZhYmxlLCBidXQgbm90IGJlZm9yZS5cbiAgICpcbiAgICogT3B0aW9uYWxseSwgc2VsZWN0b3IgZnVuY3Rpb24gY2FuIGJlIHBhc3NlZCB0byBgYmluZE9ic2VydmFibGVgLiBUaGF0IGZ1bmN0aW9uXG4gICAqIHRha2VzIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBjYWxsYmFjaywgYW5kIHJldHVybnMgdmFsdWVcbiAgICogdGhhdCB3aWxsIGJlIGVtaXR0ZWQgYnkgT2JzZXJ2YWJsZSBpbnN0ZWFkIG9mIGNhbGxiYWNrIHBhcmFtZXRlcnMgdGhlbXNlbHZlcy5cbiAgICogRXZlbiB0aG91Z2ggYnkgZGVmYXVsdCBtdWx0aXBsZSBhcmd1bWVudHMgcGFzc2VkIHRvIGNhbGxiYWNrIGFwcGVhciBpbiB0aGUgc3RyZWFtIGFzIGFycmF5LFxuICAgKiBzZWxlY3RvciBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyBkaXJlY3RseSwganVzdCBhcyBjYWxsYmFjayB3b3VsZC5cbiAgICogVGhpcyBtZWFucyB5b3UgY2FuIGltYWdpbmUgZGVmYXVsdCBzZWxlY3RvciAod2hlbiBvbmUgaXMgbm90IHByb3ZpZGVkIGV4cGxpY2l0bHkpXG4gICAqIGFzIGZ1bmN0aW9uIHRoYXQgYWdncmVnYXRlcyBhbGwgaXRzIGFyZ3VtZW50cyBpbnRvIGFycmF5LCBvciBzaW1wbHkgcmV0dXJucyBmaXJzdCBhcmd1bWVudCxcbiAgICogaWYgdGhlcmUgaXMgb25seSBvbmUuXG4gICAqXG4gICAqIExhc3Qgb3B0aW9uYWwgcGFyYW1ldGVyIC0ge0BsaW5rIFNjaGVkdWxlcn0gLSBjYW4gYmUgdXNlZCB0byBjb250cm9sIHdoZW4gY2FsbFxuICAgKiB0byBgZnVuY2AgaGFwcGVucyBhZnRlciBzb21lb25lIHN1YnNjcmliZXMgdG8gT2JzZXJ2YWJsZSwgYXMgd2VsbCBhcyB3aGVuIHJlc3VsdHNcbiAgICogcGFzc2VkIHRvIGNhbGxiYWNrIHdpbGwgYmUgZW1pdHRlZC4gQnkgZGVmYXVsdCBzdWJzY3JpcHRpb24gdG8gT2JzZXJ2YWJsZSBjYWxscyBgZnVuY2BcbiAgICogc3luY2hyb25vdXNseSwgYnV0IHVzaW5nIGBTY2hlZHVsZXIuYXN5bmNgIGFzIGxhc3QgcGFyYW1ldGVyIHdpbGwgZGVmZXIgY2FsbCB0byBpbnB1dCBmdW5jdGlvbixcbiAgICoganVzdCBsaWtlIHdyYXBwaW5nIHRoYXQgY2FsbCBpbiBgc2V0VGltZW91dGAgd2l0aCB0aW1lIGAwYCB3b3VsZC4gU28gaWYgeW91IHVzZSBhc3luYyBTY2hlZHVsZXJcbiAgICogYW5kIGNhbGwgYHN1YnNjcmliZWAgb24gb3V0cHV0IE9ic2VydmFibGUsIGFsbCBmdW5jdGlvbiBjYWxscyB0aGF0IGFyZSBjdXJyZW50bHkgZXhlY3V0aW5nLFxuICAgKiB3aWxsIGVuZCBiZWZvcmUgYGZ1bmNgIGlzIGludm9rZWQuXG4gICAqXG4gICAqIFdoZW4gaXQgY29tZXMgdG8gZW1pdHRpbmcgcmVzdWx0cyBwYXNzZWQgdG8gY2FsbGJhY2ssIGJ5IGRlZmF1bHQgdGhleSBhcmUgZW1pdHRlZFxuICAgKiBpbW1lZGlhdGVseSBhZnRlciBgZnVuY2AgaW52b2tlcyBjYWxsYmFjay4gSW4gcGFydGljdWxhciwgaWYgY2FsbGJhY2sgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHksXG4gICAqIHRoZW4gc3Vic2NyaXB0aW9uIHRvIHJlc3VsdGluZyBPYnNlcnZhYmxlIHdpbGwgY2FsbCBgbmV4dGAgZnVuY3Rpb24gc3luY2hyb25vdXNseSBhcyB3ZWxsLlxuICAgKiBJZiB5b3Ugd2FudCB0byBkZWZlciB0aGF0IGNhbGwsIHVzaW5nIGBTY2hlZHVsZXIuYXN5bmNgIHdpbGwsIGFnYWluLCBkbyB0aGUgam9iLlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgYnkgdXNpbmcgYFNjaGVkdWxlci5hc3luY2AgeW91IGNhbiwgaW4gYSBzZW5zZSwgZW5zdXJlIHRoYXQgYGZ1bmNgXG4gICAqIGFsd2F5cyBjYWxscyBpdHMgY2FsbGJhY2sgYXN5bmNocm9ub3VzbHksIHRodXMgYXZvaWRpbmcgdGVycmlmeWluZyBaYWxnby5cbiAgICpcbiAgICogTm90ZSB0aGF0IE9ic2VydmFibGUgY3JlYXRlZCBieSBvdXRwdXQgZnVuY3Rpb24gd2lsbCBhbHdheXMgZW1pdCBvbmx5IG9uZSB2YWx1ZVxuICAgKiBhbmQgdGhlbiBjb21wbGV0ZSByaWdodCBhZnRlci4gRXZlbiBpZiBgZnVuY2AgY2FsbHMgY2FsbGJhY2sgbXVsdGlwbGUgdGltZXMsIHZhbHVlcyBmcm9tXG4gICAqIHNlY29uZCBhbmQgZm9sbG93aW5nIGNhbGxzIHdpbGwgbmV2ZXIgYXBwZWFyIGluIHRoZSBzdHJlYW0uIElmIHlvdSBuZWVkIHRvXG4gICAqIGxpc3RlbiBmb3IgbXVsdGlwbGUgY2FsbHMsIHlvdSBwcm9iYWJseSB3YW50IHRvIHVzZSB7QGxpbmsgZnJvbUV2ZW50fSBvclxuICAgKiB7QGxpbmsgZnJvbUV2ZW50UGF0dGVybn0gaW5zdGVhZC5cbiAgICpcbiAgICogSWYgYGZ1bmNgIGRlcGVuZHMgb24gc29tZSBjb250ZXh0IChgdGhpc2AgcHJvcGVydHkpLCB0aGF0IGNvbnRleHQgd2lsbCBiZSBzZXRcbiAgICogdG8gdGhlIHNhbWUgY29udGV4dCB0aGF0IG91dHB1dCBmdW5jdGlvbiBoYXMgYXQgY2FsbCB0aW1lLiBJbiBwYXJ0aWN1bGFyLCBpZiBgZnVuY2BcbiAgICogaXMgY2FsbGVkIGFzIG1ldGhvZCBvZiBzb21lIG9iamVjdCwgaW4gb3JkZXIgdG8gcHJlc2VydmUgcHJvcGVyIGJlaGF2aW91cixcbiAgICogaXQgaXMgcmVjb21tZW5kZWQgdG8gc2V0IGNvbnRleHQgb2Ygb3V0cHV0IGZ1bmN0aW9uIHRvIHRoYXQgb2JqZWN0IGFzIHdlbGwsXG4gICAqIHByb3ZpZGVkIGBmdW5jYCBpcyBub3QgYWxyZWFkeSBib3VuZC5cbiAgICpcbiAgICogSWYgaW5wdXQgZnVuY3Rpb24gY2FsbHMgaXRzIGNhbGxiYWNrIGluIFwibm9kZSBzdHlsZVwiIChpLmUuIGZpcnN0IGFyZ3VtZW50IHRvIGNhbGxiYWNrIGlzXG4gICAqIG9wdGlvbmFsIGVycm9yIHBhcmFtZXRlciBzaWduYWxpbmcgd2hldGhlciBjYWxsIGZhaWxlZCBvciBub3QpLCB7QGxpbmsgYmluZE5vZGVDYWxsYmFja31cbiAgICogcHJvdmlkZXMgY29udmVuaWVudCBlcnJvciBoYW5kbGluZyBhbmQgcHJvYmFibHkgaXMgYSBiZXR0ZXIgY2hvaWNlLlxuICAgKiBgYmluZENhbGxiYWNrYCB3aWxsIHRyZWF0IHN1Y2ggZnVuY3Rpb25zIHdpdGhvdXQgYW55IGRpZmZlcmVuY2UgYW5kIGVycm9yIHBhcmFtZXRlclxuICAgKiAod2hldGhlciBwYXNzZWQgb3Igbm90KSB3aWxsIGFsd2F5cyBiZSBpbnRlcnByZXRlZCBhcyByZWd1bGFyIGNhbGxiYWNrIGFyZ3VtZW50LlxuICAgKlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0IGpRdWVyeSdzIGdldEpTT04gdG8gYW4gT2JzZXJ2YWJsZSBBUEk8L2NhcHRpb24+XG4gICAqIC8vIFN1cHBvc2Ugd2UgaGF2ZSBqUXVlcnkuZ2V0SlNPTignL215L3VybCcsIGNhbGxiYWNrKVxuICAgKiB2YXIgZ2V0SlNPTkFzT2JzZXJ2YWJsZSA9IFJ4Lk9ic2VydmFibGUuYmluZENhbGxiYWNrKGpRdWVyeS5nZXRKU09OKTtcbiAgICogdmFyIHJlc3VsdCA9IGdldEpTT05Bc09ic2VydmFibGUoJy9teS91cmwnKTtcbiAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpLCBlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICAgKlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZWNlaXZlIGFycmF5IG9mIGFyZ3VtZW50cyBwYXNzZWQgdG8gY2FsbGJhY2s8L2NhcHRpb24+XG4gICAqIHNvbWVGdW5jdGlvbigoYSwgYiwgYykgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKGEpOyAvLyA1XG4gICAqICAgY29uc29sZS5sb2coYik7IC8vICdzb21lIHN0cmluZydcbiAgICogICBjb25zb2xlLmxvZyhjKTsgLy8ge3NvbWVQcm9wZXJ0eTogJ3NvbWVWYWx1ZSd9XG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zdCBib3VuZFNvbWVGdW5jdGlvbiA9IFJ4Lk9ic2VydmFibGUuYmluZENhbGxiYWNrKHNvbWVGdW5jdGlvbik7XG4gICAqIGJvdW5kU29tZUZ1bmN0aW9uKCkuc3Vic2NyaWJlKHZhbHVlcyA9PiB7XG4gICAqICAgY29uc29sZS5sb2codmFsdWVzKSAvLyBbNSwgJ3NvbWUgc3RyaW5nJywge3NvbWVQcm9wZXJ0eTogJ3NvbWVWYWx1ZSd9XVxuICAgKiB9KTtcbiAgICpcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIGJpbmRDYWxsYmFjayB3aXRoIHNlbGVjdG9yIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICAgKiBzb21lRnVuY3Rpb24oKGEsIGIsIGMpID0+IHtcbiAgICogICBjb25zb2xlLmxvZyhhKTsgLy8gJ2EnXG4gICAqICAgY29uc29sZS5sb2coYik7IC8vICdiJ1xuICAgKiAgIGNvbnNvbGUubG9nKGMpOyAvLyAnYydcbiAgICogfSk7XG4gICAqXG4gICAqIGNvbnN0IGJvdW5kU29tZUZ1bmN0aW9uID0gUnguT2JzZXJ2YWJsZS5iaW5kQ2FsbGJhY2soc29tZUZ1bmN0aW9uLCAoYSwgYiwgYykgPT4gYSArIGIgKyBjKTtcbiAgICogYm91bmRTb21lRnVuY3Rpb24oKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlKSAvLyAnYWJjJ1xuICAgKiB9KTtcbiAgICpcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q29tcGFyZSBiZWhhdmlvdXIgd2l0aCBhbmQgd2l0aG91dCBhc3luYyBTY2hlZHVsZXI8L2NhcHRpb24+XG4gICAqIGZ1bmN0aW9uIGlDYWxsTXlDYWxsYmFja1N5bmNocm9ub3VzbHkoY2IpIHtcbiAgICogICBjYigpO1xuICAgKiB9XG4gICAqXG4gICAqIGNvbnN0IGJvdW5kU3luY0ZuID0gUnguT2JzZXJ2YWJsZS5iaW5kQ2FsbGJhY2soaUNhbGxNeUNhbGxiYWNrU3luY2hyb25vdXNseSk7XG4gICAqIGNvbnN0IGJvdW5kQXN5bmNGbiA9IFJ4Lk9ic2VydmFibGUuYmluZENhbGxiYWNrKGlDYWxsTXlDYWxsYmFja1N5bmNocm9ub3VzbHksIG51bGwsIFJ4LlNjaGVkdWxlci5hc3luYyk7XG4gICAqXG4gICAqIGJvdW5kU3luY0ZuKCkuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdJIHdhcyBzeW5jIScpKTtcbiAgICogYm91bmRBc3luY0ZuKCkuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdJIHdhcyBhc3luYyEnKSk7XG4gICAqIGNvbnNvbGUubG9nKCdUaGlzIGhhcHBlbmVkLi4uJyk7XG4gICAqXG4gICAqIC8vIExvZ3M6XG4gICAqIC8vIEkgd2FzIHN5bmMhXG4gICAqIC8vIFRoaXMgaGFwcGVuZWQuLi5cbiAgICogLy8gSSB3YXMgYXN5bmMhXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBiaW5kQ2FsbGJhY2sgb24gb2JqZWN0IG1ldGhvZDwvY2FwdGlvbj5cbiAgICogY29uc3QgYm91bmRNZXRob2QgPSBSeC5PYnNlcnZhYmxlLmJpbmRDYWxsYmFjayhzb21lT2JqZWN0Lm1ldGhvZFdpdGhDYWxsYmFjayk7XG4gICAqIGJvdW5kTWV0aG9kLmNhbGwoc29tZU9iamVjdCkgLy8gbWFrZSBzdXJlIG1ldGhvZFdpdGhDYWxsYmFjayBoYXMgYWNjZXNzIHRvIHNvbWVPYmplY3RcbiAgICogLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICpcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgYmluZE5vZGVDYWxsYmFja31cbiAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICogQHNlZSB7QGxpbmsgZnJvbVByb21pc2V9XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgRnVuY3Rpb24gd2l0aCBhIGNhbGxiYWNrIGFzIHRoZSBsYXN0IHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW3NlbGVjdG9yXSBBIGZ1bmN0aW9uIHdoaWNoIHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGVcbiAgICogY2FsbGJhY2sgYW5kIG1hcHMgdGhvc2UgdG8gYSB2YWx1ZSB0byBlbWl0IG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXJdIFRoZSBzY2hlZHVsZXIgb24gd2hpY2ggdG8gc2NoZWR1bGUgdGhlXG4gICAqIGNhbGxiYWNrcy5cbiAgICogQHJldHVybiB7ZnVuY3Rpb24oLi4ucGFyYW1zOiAqKTogT2JzZXJ2YWJsZX0gQSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZVxuICAgKiBPYnNlcnZhYmxlIHRoYXQgZGVsaXZlcnMgdGhlIHNhbWUgdmFsdWVzIHRoZSBjYWxsYmFjayB3b3VsZCBkZWxpdmVyLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgYmluZENhbGxiYWNrXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KGZ1bmM6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBGdW5jdGlvbiB8IHZvaWQgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgIHJldHVybiBuZXcgQm91bmRDYWxsYmFja09ic2VydmFibGU8VD4oZnVuYywgPGFueT5zZWxlY3RvciwgYXJncywgdGhpcywgc2NoZWR1bGVyKTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhcmdzOiBhbnlbXSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb250ZXh0OiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VCB8IFRbXT4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IGNhbGxiYWNrRnVuYyA9IHRoaXMuY2FsbGJhY2tGdW5jO1xuICAgIGNvbnN0IGFyZ3MgPSB0aGlzLmFyZ3M7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgbGV0IHN1YmplY3QgPSB0aGlzLnN1YmplY3Q7XG5cbiAgICBpZiAoIXNjaGVkdWxlcikge1xuICAgICAgaWYgKCFzdWJqZWN0KSB7XG4gICAgICAgIHN1YmplY3QgPSB0aGlzLnN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0PFQ+KCk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyRm4odGhpczogYW55LCAuLi5pbm5lckFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlID0gKDxhbnk+aGFuZGxlckZuKS5zb3VyY2U7XG4gICAgICAgICAgY29uc3QgeyBzZWxlY3Rvciwgc3ViamVjdCB9ID0gc291cmNlO1xuICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goc2VsZWN0b3IpLmFwcGx5KHRoaXMsIGlubmVyQXJncyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN1YmplY3QubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YmplY3QubmV4dChpbm5lckFyZ3MubGVuZ3RoIDw9IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3MpO1xuICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gdXNlIG5hbWVkIGZ1bmN0aW9uIGluc3RhbmNlIHRvIGF2b2lkIGNsb3N1cmUuXG4gICAgICAgICg8YW55PmhhbmRsZXIpLnNvdXJjZSA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goY2FsbGJhY2tGdW5jKS5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3MuY29uY2F0KGhhbmRsZXIpKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoQm91bmRDYWxsYmFja09ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHsgc291cmNlOiB0aGlzLCBzdWJzY3JpYmVyLCBjb250ZXh0OiB0aGlzLmNvbnRleHQgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRpc3BhdGNoPFQ+KHN0YXRlOiB7IHNvdXJjZTogQm91bmRDYWxsYmFja09ic2VydmFibGU8VD4sIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIGNvbnRleHQ6IGFueSB9KSB7XG4gICAgY29uc3Qgc2VsZiA9ICg8U3Vic2NyaXB0aW9uPjxhbnk+dGhpcyk7XG4gICAgY29uc3QgeyBzb3VyY2UsIHN1YnNjcmliZXIsIGNvbnRleHQgfSA9IHN0YXRlO1xuICAgIGNvbnN0IHsgY2FsbGJhY2tGdW5jLCBhcmdzLCBzY2hlZHVsZXIgfSA9IHNvdXJjZTtcbiAgICBsZXQgc3ViamVjdCA9IHNvdXJjZS5zdWJqZWN0O1xuXG4gICAgaWYgKCFzdWJqZWN0KSB7XG4gICAgICBzdWJqZWN0ID0gc291cmNlLnN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0PFQ+KCk7XG5cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyRm4odGhpczogYW55LCAuLi5pbm5lckFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICg8YW55PmhhbmRsZXJGbikuc291cmNlO1xuICAgICAgICBjb25zdCB7IHNlbGVjdG9yLCBzdWJqZWN0IH0gPSBzb3VyY2U7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKHNlbGVjdG9yKS5hcHBseSh0aGlzLCBpbm5lckFyZ3MpO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnI6IGVycm9yT2JqZWN0LmUsIHN1YmplY3QgfSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlOiByZXN1bHQsIHN1YmplY3QgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlubmVyQXJncy5sZW5ndGggPD0gMSA/IGlubmVyQXJnc1swXSA6IGlubmVyQXJncztcbiAgICAgICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlLCBzdWJqZWN0IH0pKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIHVzZSBuYW1lZCBmdW5jdGlvbiB0byBwYXNzIHZhbHVlcyBpbiB3aXRob3V0IGNsb3N1cmVcbiAgICAgICg8YW55PmhhbmRsZXIpLnNvdXJjZSA9IHNvdXJjZTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goY2FsbGJhY2tGdW5jKS5hcHBseShjb250ZXh0LCBhcmdzLmNvbmNhdChoYW5kbGVyKSk7XG4gICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICBzdWJqZWN0LmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlbGYuYWRkKHN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hOZXh0QXJnPFQ+IHtcbiAgc3ViamVjdDogQXN5bmNTdWJqZWN0PFQ+O1xuICB2YWx1ZTogVDtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dDxUPihhcmc6IERpc3BhdGNoTmV4dEFyZzxUPikge1xuICBjb25zdCB7IHZhbHVlLCBzdWJqZWN0IH0gPSBhcmc7XG4gIHN1YmplY3QubmV4dCh2YWx1ZSk7XG4gIHN1YmplY3QuY29tcGxldGUoKTtcbn1cblxuaW50ZXJmYWNlIERpc3BhdGNoRXJyb3JBcmc8VD4ge1xuICBzdWJqZWN0OiBBc3luY1N1YmplY3Q8VD47XG4gIGVycjogYW55O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvcjxUPihhcmc6IERpc3BhdGNoRXJyb3JBcmc8VD4pIHtcbiAgY29uc3QgeyBlcnIsIHN1YmplY3QgfSA9IGFyZztcbiAgc3ViamVjdC5lcnJvcihlcnIpO1xufVxuIl19