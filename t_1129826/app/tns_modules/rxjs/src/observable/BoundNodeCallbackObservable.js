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
var BoundNodeCallbackObservable = (function (_super) {
    __extends(BoundNodeCallbackObservable, _super);
    function BoundNodeCallbackObservable(callbackFunc, selector, args, context, scheduler) {
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
     * Converts a Node.js-style callback API to a function that returns an
     * Observable.
     *
     * <span class="informal">It's just like {@link bindCallback}, but the
     * callback is expected to be of type `callback(error, result)`.</span>
     *
     * `bindNodeCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done. The callback function is expected to follow Node.js conventions,
     * where the first argument to the callback is an error object, signaling
     * whether call was successful. If that object is passed to callback, it means
     * something went wrong.
     *
     * The output of `bindNodeCallback` is a function that takes the same
     * parameters as `func`, except the last one (the callback). When the output
     * function is called with arguments, it will return an Observable.
     * If `func` calls its callback with error parameter present, Observable will
     * error with that value as well. If error parameter is not passed, Observable will emit
     * second parameter. If there are more parameters (third and so on),
     * Observable will emit an array with all arguments, except first error argument.
     *
     * Optionally `bindNodeCallback` accepts selector function, which allows you to
     * make resulting Observable emit value computed by selector, instead of regular
     * callback arguments. It works similarly to {@link bindCallback} selector, but
     * Node.js-style error argument will never be passed to that function.
     *
     * Note that `func` will not be called at the same time output function is,
     * but rather whenever resulting Observable is subscribed. By default call to
     * `func` will happen synchronously after subscription, but that can be changed
     * with proper {@link Scheduler} provided as optional third parameter. Scheduler
     * can also control when values from callback will be emitted by Observable.
     * To find out more, check out documentation for {@link bindCallback}, where
     * Scheduler works exactly the same.
     *
     * As in {@link bindCallback}, context (`this` property) of input function will be set to context
     * of returned function, when it is called.
     *
     * After Observable emits value, it will complete immediately. This means
     * even if `func` calls callback again, values from second and consecutive
     * calls will never appear on the stream. If you need to handle functions
     * that call callbacks multiple times, check out {@link fromEvent} or
     * {@link fromEventPattern} instead.
     *
     * Note that `bindNodeCallback` can be used in non-Node.js environments as well.
     * "Node.js-style" callbacks are just a convention, so if you write for
     * browsers or any other environment and API you use implements that callback style,
     * `bindNodeCallback` can be safely used on that API functions as well.
     *
     * Remember that Error object passed to callback does not have to be an instance
     * of JavaScript built-in `Error` object. In fact, it does not even have to an object.
     * Error parameter of callback function is interpreted as "present", when value
     * of that parameter is truthy. It could be, for example, non-zero number, non-empty
     * string or boolean `true`. In all of these cases resulting Observable would error
     * with that value. This means usually regular style callbacks will fail very often when
     * `bindNodeCallback` is used. If your Observable errors much more often then you
     * would expect, check if callback really is called in Node.js-style and, if not,
     * switch to {@link bindCallback} instead.
     *
     * Note that even if error parameter is technically present in callback, but its value
     * is falsy, it still won't appear in array emitted by Observable or in selector function.
     *
     *
     * @example <caption>Read a file from the filesystem and get the data as an Observable</caption>
     * import * as fs from 'fs';
     * var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
     * var result = readFileAsObservable('./roadNames.txt', 'utf8');
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     *
     * @example <caption>Use on function calling callback with multiple arguments</caption>
     * someFunction((err, a, b) => {
     *   console.log(err); // null
     *   console.log(a); // 5
     *   console.log(b); // "some string"
     * });
     * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction);
     * boundSomeFunction()
     * .subscribe(value => {
     *   console.log(value); // [5, "some string"]
     * });
     *
     *
     * @example <caption>Use with selector function</caption>
     * someFunction((err, a, b) => {
     *   console.log(err); // undefined
     *   console.log(a); // "abc"
     *   console.log(b); // "DEF"
     * });
     * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction, (a, b) => a + b);
     * boundSomeFunction()
     * .subscribe(value => {
     *   console.log(value); // "abcDEF"
     * });
     *
     *
     * @example <caption>Use on function calling callback in regular style</caption>
     * someFunction(a => {
     *   console.log(a); // 5
     * });
     * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction);
     * boundSomeFunction()
     * .subscribe(
     *   value => {}             // never gets called
     *   err => console.log(err) // 5
     *);
     *
     *
     * @see {@link bindCallback}
     * @see {@link from}
     * @see {@link fromPromise}
     *
     * @param {function} func Function with a Node.js-style callback as the last parameter.
     * @param {function} [selector] A function which takes the arguments from the
     * callback and maps those to a value to emit on the output Observable.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * callbacks.
     * @return {function(...params: *): Observable} A function which returns the
     * Observable that delivers the same values the Node.js callback would
     * deliver.
     * @static true
     * @name bindNodeCallback
     * @owner Observable
     */
    BoundNodeCallbackObservable.create = function (func, selector, scheduler) {
        if (selector === void 0) { selector = undefined; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new BoundNodeCallbackObservable(func, selector, args, this, scheduler);
        };
    };
    BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
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
                    var err = innerArgs.shift();
                    if (err) {
                        subject.error(err);
                    }
                    else if (selector) {
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
            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber, context: this.context });
        }
    };
    return BoundNodeCallbackObservable;
}(Observable_1.Observable));
exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
function dispatch(state) {
    var self = this;
    var source = state.source, subscriber = state.subscriber, context = state.context;
    // XXX: cast to `any` to access to the private field in `source`.
    var _a = source, callbackFunc = _a.callbackFunc, args = _a.args, scheduler = _a.scheduler;
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
            var err = innerArgs.shift();
            if (err) {
                self.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
            }
            else if (selector) {
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
            self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
        }
    }
    self.add(subject.subscribe(subscriber));
}
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTJDO0FBSzNDLDZDQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsZ0RBQStDO0FBRS9DOzs7O0dBSUc7QUFDSDtJQUFvRCwrQ0FBYTtJQW9KL0QscUNBQW9CLFlBQXNCLEVBQ3RCLFFBQWtCLEVBQ2xCLElBQVcsRUFDWCxPQUFZLEVBQ2IsU0FBcUI7UUFKeEMsWUFLRSxpQkFBTyxTQUNSO1FBTm1CLGtCQUFZLEdBQVosWUFBWSxDQUFVO1FBQ3RCLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsVUFBSSxHQUFKLElBQUksQ0FBTztRQUNYLGFBQU8sR0FBUCxPQUFPLENBQUs7UUFDYixlQUFTLEdBQVQsU0FBUyxDQUFZOztJQUV4QyxDQUFDO0lBN0lELG1DQUFtQztJQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRIRztJQUNJLGtDQUFNLEdBQWIsVUFBaUIsSUFBYyxFQUNkLFFBQXFDLEVBQ3JDLFNBQXNCO1FBRHRCLHlCQUFBLEVBQUEsb0JBQXFDO1FBRXBELE1BQU0sQ0FBQztZQUFvQixjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLDJCQUEyQixDQUFJLElBQUksRUFBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RixDQUFDLENBQUM7SUFDSixDQUFDO0lBVVMsZ0RBQVUsR0FBcEIsVUFBcUIsVUFBK0I7UUFDbEQsSUFBTSxZQUFZ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Q0FBQztBQU1ELHNCQUF5QixHQUF1QjtJQUN0QyxJQUFBLGlCQUFLLEVBQUUscUJBQU8sQ0FBUztJQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBTUQsdUJBQTBCLEdBQXdCO0lBQ3hDLElBQUEsYUFBRyxFQUFFLHFCQUFPLENBQVM7SUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IElTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vc2NoZWR1bGVyL0FjdGlvbic7XG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCB9IGZyb20gJy4uL0FzeW5jU3ViamVjdCc7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIHN1YmplY3Q6IEFzeW5jU3ViamVjdDxUPjtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbiAgc3RhdGljIGNyZWF0ZTxSPihjYWxsYmFja0Z1bmM6IChjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAoKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQpID0+IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8VCwgVDIsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIGNhbGxiYWNrOiAoZXJyOiBhbnksIHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQpID0+IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8VCwgVDIsIFQzLCBUNCwgVDUsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIGNhbGxiYWNrOiAoZXJyOiBhbnksIHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2LCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQ+KGNhbGxiYWNrRnVuYzogRnVuY3Rpb24sIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIGNyZWF0ZTxUPihjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLCBzZWxlY3Rvcj86ICguLi5hcmdzOiBhbnlbXSkgPT4gVCwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuICAvKipcbiAgICogQ29udmVydHMgYSBOb2RlLmpzLXN0eWxlIGNhbGxiYWNrIEFQSSB0byBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhblxuICAgKiBPYnNlcnZhYmxlLlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBqdXN0IGxpa2Uge0BsaW5rIGJpbmRDYWxsYmFja30sIGJ1dCB0aGVcbiAgICogY2FsbGJhY2sgaXMgZXhwZWN0ZWQgdG8gYmUgb2YgdHlwZSBgY2FsbGJhY2soZXJyb3IsIHJlc3VsdClgLjwvc3Bhbj5cbiAgICpcbiAgICogYGJpbmROb2RlQ2FsbGJhY2tgIGlzIG5vdCBhbiBvcGVyYXRvciBiZWNhdXNlIGl0cyBpbnB1dCBhbmQgb3V0cHV0IGFyZSBub3RcbiAgICogT2JzZXJ2YWJsZXMuIFRoZSBpbnB1dCBpcyBhIGZ1bmN0aW9uIGBmdW5jYCB3aXRoIHNvbWUgcGFyYW1ldGVycywgYnV0IHRoZVxuICAgKiBsYXN0IHBhcmFtZXRlciBtdXN0IGJlIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBgZnVuY2AgY2FsbHMgd2hlbiBpdCBpc1xuICAgKiBkb25lLiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgZXhwZWN0ZWQgdG8gZm9sbG93IE5vZGUuanMgY29udmVudGlvbnMsXG4gICAqIHdoZXJlIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgY2FsbGJhY2sgaXMgYW4gZXJyb3Igb2JqZWN0LCBzaWduYWxpbmdcbiAgICogd2hldGhlciBjYWxsIHdhcyBzdWNjZXNzZnVsLiBJZiB0aGF0IG9iamVjdCBpcyBwYXNzZWQgdG8gY2FsbGJhY2ssIGl0IG1lYW5zXG4gICAqIHNvbWV0aGluZyB3ZW50IHdyb25nLlxuICAgKlxuICAgKiBUaGUgb3V0cHV0IG9mIGBiaW5kTm9kZUNhbGxiYWNrYCBpcyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIHNhbWVcbiAgICogcGFyYW1ldGVycyBhcyBgZnVuY2AsIGV4Y2VwdCB0aGUgbGFzdCBvbmUgKHRoZSBjYWxsYmFjaykuIFdoZW4gdGhlIG91dHB1dFxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBhcmd1bWVudHMsIGl0IHdpbGwgcmV0dXJuIGFuIE9ic2VydmFibGUuXG4gICAqIElmIGBmdW5jYCBjYWxscyBpdHMgY2FsbGJhY2sgd2l0aCBlcnJvciBwYXJhbWV0ZXIgcHJlc2VudCwgT2JzZXJ2YWJsZSB3aWxsXG4gICAqIGVycm9yIHdpdGggdGhhdCB2YWx1ZSBhcyB3ZWxsLiBJZiBlcnJvciBwYXJhbWV0ZXIgaXMgbm90IHBhc3NlZCwgT2JzZXJ2YWJsZSB3aWxsIGVtaXRcbiAgICogc2Vjb25kIHBhcmFtZXRlci4gSWYgdGhlcmUgYXJlIG1vcmUgcGFyYW1ldGVycyAodGhpcmQgYW5kIHNvIG9uKSxcbiAgICogT2JzZXJ2YWJsZSB3aWxsIGVtaXQgYW4gYXJyYXkgd2l0aCBhbGwgYXJndW1lbnRzLCBleGNlcHQgZmlyc3QgZXJyb3IgYXJndW1lbnQuXG4gICAqXG4gICAqIE9wdGlvbmFsbHkgYGJpbmROb2RlQ2FsbGJhY2tgIGFjY2VwdHMgc2VsZWN0b3IgZnVuY3Rpb24sIHdoaWNoIGFsbG93cyB5b3UgdG9cbiAgICogbWFrZSByZXN1bHRpbmcgT2JzZXJ2YWJsZSBlbWl0IHZhbHVlIGNvbXB1dGVkIGJ5IHNlbGVjdG9yLCBpbnN0ZWFkIG9mIHJlZ3VsYXJcbiAgICogY2FsbGJhY2sgYXJndW1lbnRzLiBJdCB3b3JrcyBzaW1pbGFybHkgdG8ge0BsaW5rIGJpbmRDYWxsYmFja30gc2VsZWN0b3IsIGJ1dFxuICAgKiBOb2RlLmpzLXN0eWxlIGVycm9yIGFyZ3VtZW50IHdpbGwgbmV2ZXIgYmUgcGFzc2VkIHRvIHRoYXQgZnVuY3Rpb24uXG4gICAqXG4gICAqIE5vdGUgdGhhdCBgZnVuY2Agd2lsbCBub3QgYmUgY2FsbGVkIGF0IHRoZSBzYW1lIHRpbWUgb3V0cHV0IGZ1bmN0aW9uIGlzLFxuICAgKiBidXQgcmF0aGVyIHdoZW5ldmVyIHJlc3VsdGluZyBPYnNlcnZhYmxlIGlzIHN1YnNjcmliZWQuIEJ5IGRlZmF1bHQgY2FsbCB0b1xuICAgKiBgZnVuY2Agd2lsbCBoYXBwZW4gc3luY2hyb25vdXNseSBhZnRlciBzdWJzY3JpcHRpb24sIGJ1dCB0aGF0IGNhbiBiZSBjaGFuZ2VkXG4gICAqIHdpdGggcHJvcGVyIHtAbGluayBTY2hlZHVsZXJ9IHByb3ZpZGVkIGFzIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlci4gU2NoZWR1bGVyXG4gICAqIGNhbiBhbHNvIGNvbnRyb2wgd2hlbiB2YWx1ZXMgZnJvbSBjYWxsYmFjayB3aWxsIGJlIGVtaXR0ZWQgYnkgT2JzZXJ2YWJsZS5cbiAgICogVG8gZmluZCBvdXQgbW9yZSwgY2hlY2sgb3V0IGRvY3VtZW50YXRpb24gZm9yIHtAbGluayBiaW5kQ2FsbGJhY2t9LCB3aGVyZVxuICAgKiBTY2hlZHVsZXIgd29ya3MgZXhhY3RseSB0aGUgc2FtZS5cbiAgICpcbiAgICogQXMgaW4ge0BsaW5rIGJpbmRDYWxsYmFja30sIGNvbnRleHQgKGB0aGlzYCBwcm9wZXJ0eSkgb2YgaW5wdXQgZnVuY3Rpb24gd2lsbCBiZSBzZXQgdG8gY29udGV4dFxuICAgKiBvZiByZXR1cm5lZCBmdW5jdGlvbiwgd2hlbiBpdCBpcyBjYWxsZWQuXG4gICAqXG4gICAqIEFmdGVyIE9ic2VydmFibGUgZW1pdHMgdmFsdWUsIGl0IHdpbGwgY29tcGxldGUgaW1tZWRpYXRlbHkuIFRoaXMgbWVhbnNcbiAgICogZXZlbiBpZiBgZnVuY2AgY2FsbHMgY2FsbGJhY2sgYWdhaW4sIHZhbHVlcyBmcm9tIHNlY29uZCBhbmQgY29uc2VjdXRpdmVcbiAgICogY2FsbHMgd2lsbCBuZXZlciBhcHBlYXIgb24gdGhlIHN0cmVhbS4gSWYgeW91IG5lZWQgdG8gaGFuZGxlIGZ1bmN0aW9uc1xuICAgKiB0aGF0IGNhbGwgY2FsbGJhY2tzIG11bHRpcGxlIHRpbWVzLCBjaGVjayBvdXQge0BsaW5rIGZyb21FdmVudH0gb3JcbiAgICoge0BsaW5rIGZyb21FdmVudFBhdHRlcm59IGluc3RlYWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBgYmluZE5vZGVDYWxsYmFja2AgY2FuIGJlIHVzZWQgaW4gbm9uLU5vZGUuanMgZW52aXJvbm1lbnRzIGFzIHdlbGwuXG4gICAqIFwiTm9kZS5qcy1zdHlsZVwiIGNhbGxiYWNrcyBhcmUganVzdCBhIGNvbnZlbnRpb24sIHNvIGlmIHlvdSB3cml0ZSBmb3JcbiAgICogYnJvd3NlcnMgb3IgYW55IG90aGVyIGVudmlyb25tZW50IGFuZCBBUEkgeW91IHVzZSBpbXBsZW1lbnRzIHRoYXQgY2FsbGJhY2sgc3R5bGUsXG4gICAqIGBiaW5kTm9kZUNhbGxiYWNrYCBjYW4gYmUgc2FmZWx5IHVzZWQgb24gdGhhdCBBUEkgZnVuY3Rpb25zIGFzIHdlbGwuXG4gICAqXG4gICAqIFJlbWVtYmVyIHRoYXQgRXJyb3Igb2JqZWN0IHBhc3NlZCB0byBjYWxsYmFjayBkb2VzIG5vdCBoYXZlIHRvIGJlIGFuIGluc3RhbmNlXG4gICAqIG9mIEphdmFTY3JpcHQgYnVpbHQtaW4gYEVycm9yYCBvYmplY3QuIEluIGZhY3QsIGl0IGRvZXMgbm90IGV2ZW4gaGF2ZSB0byBhbiBvYmplY3QuXG4gICAqIEVycm9yIHBhcmFtZXRlciBvZiBjYWxsYmFjayBmdW5jdGlvbiBpcyBpbnRlcnByZXRlZCBhcyBcInByZXNlbnRcIiwgd2hlbiB2YWx1ZVxuICAgKiBvZiB0aGF0IHBhcmFtZXRlciBpcyB0cnV0aHkuIEl0IGNvdWxkIGJlLCBmb3IgZXhhbXBsZSwgbm9uLXplcm8gbnVtYmVyLCBub24tZW1wdHlcbiAgICogc3RyaW5nIG9yIGJvb2xlYW4gYHRydWVgLiBJbiBhbGwgb2YgdGhlc2UgY2FzZXMgcmVzdWx0aW5nIE9ic2VydmFibGUgd291bGQgZXJyb3JcbiAgICogd2l0aCB0aGF0IHZhbHVlLiBUaGlzIG1lYW5zIHVzdWFsbHkgcmVndWxhciBzdHlsZSBjYWxsYmFja3Mgd2lsbCBmYWlsIHZlcnkgb2Z0ZW4gd2hlblxuICAgKiBgYmluZE5vZGVDYWxsYmFja2AgaXMgdXNlZC4gSWYgeW91ciBPYnNlcnZhYmxlIGVycm9ycyBtdWNoIG1vcmUgb2Z0ZW4gdGhlbiB5b3VcbiAgICogd291bGQgZXhwZWN0LCBjaGVjayBpZiBjYWxsYmFjayByZWFsbHkgaXMgY2FsbGVkIGluIE5vZGUuanMtc3R5bGUgYW5kLCBpZiBub3QsXG4gICAqIHN3aXRjaCB0byB7QGxpbmsgYmluZENhbGxiYWNrfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgZXZlbiBpZiBlcnJvciBwYXJhbWV0ZXIgaXMgdGVjaG5pY2FsbHkgcHJlc2VudCBpbiBjYWxsYmFjaywgYnV0IGl0cyB2YWx1ZVxuICAgKiBpcyBmYWxzeSwgaXQgc3RpbGwgd29uJ3QgYXBwZWFyIGluIGFycmF5IGVtaXR0ZWQgYnkgT2JzZXJ2YWJsZSBvciBpbiBzZWxlY3RvciBmdW5jdGlvbi5cbiAgICpcbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UmVhZCBhIGZpbGUgZnJvbSB0aGUgZmlsZXN5c3RlbSBhbmQgZ2V0IHRoZSBkYXRhIGFzIGFuIE9ic2VydmFibGU8L2NhcHRpb24+XG4gICAqIGltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbiAgICogdmFyIHJlYWRGaWxlQXNPYnNlcnZhYmxlID0gUnguT2JzZXJ2YWJsZS5iaW5kTm9kZUNhbGxiYWNrKGZzLnJlYWRGaWxlKTtcbiAgICogdmFyIHJlc3VsdCA9IHJlYWRGaWxlQXNPYnNlcnZhYmxlKCcuL3JvYWROYW1lcy50eHQnLCAndXRmOCcpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBvbiBmdW5jdGlvbiBjYWxsaW5nIGNhbGxiYWNrIHdpdGggbXVsdGlwbGUgYXJndW1lbnRzPC9jYXB0aW9uPlxuICAgKiBzb21lRnVuY3Rpb24oKGVyciwgYSwgYikgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKGVycik7IC8vIG51bGxcbiAgICogICBjb25zb2xlLmxvZyhhKTsgLy8gNVxuICAgKiAgIGNvbnNvbGUubG9nKGIpOyAvLyBcInNvbWUgc3RyaW5nXCJcbiAgICogfSk7XG4gICAqIHZhciBib3VuZFNvbWVGdW5jdGlvbiA9IFJ4Lk9ic2VydmFibGUuYmluZE5vZGVDYWxsYmFjayhzb21lRnVuY3Rpb24pO1xuICAgKiBib3VuZFNvbWVGdW5jdGlvbigpXG4gICAqIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlKTsgLy8gWzUsIFwic29tZSBzdHJpbmdcIl1cbiAgICogfSk7XG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSB3aXRoIHNlbGVjdG9yIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICAgKiBzb21lRnVuY3Rpb24oKGVyciwgYSwgYikgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKGVycik7IC8vIHVuZGVmaW5lZFxuICAgKiAgIGNvbnNvbGUubG9nKGEpOyAvLyBcImFiY1wiXG4gICAqICAgY29uc29sZS5sb2coYik7IC8vIFwiREVGXCJcbiAgICogfSk7XG4gICAqIHZhciBib3VuZFNvbWVGdW5jdGlvbiA9IFJ4Lk9ic2VydmFibGUuYmluZE5vZGVDYWxsYmFjayhzb21lRnVuY3Rpb24sIChhLCBiKSA9PiBhICsgYik7XG4gICAqIGJvdW5kU29tZUZ1bmN0aW9uKClcbiAgICogLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAqICAgY29uc29sZS5sb2codmFsdWUpOyAvLyBcImFiY0RFRlwiXG4gICAqIH0pO1xuICAgKlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2Ugb24gZnVuY3Rpb24gY2FsbGluZyBjYWxsYmFjayBpbiByZWd1bGFyIHN0eWxlPC9jYXB0aW9uPlxuICAgKiBzb21lRnVuY3Rpb24oYSA9PiB7XG4gICAqICAgY29uc29sZS5sb2coYSk7IC8vIDVcbiAgICogfSk7XG4gICAqIHZhciBib3VuZFNvbWVGdW5jdGlvbiA9IFJ4Lk9ic2VydmFibGUuYmluZE5vZGVDYWxsYmFjayhzb21lRnVuY3Rpb24pO1xuICAgKiBib3VuZFNvbWVGdW5jdGlvbigpXG4gICAqIC5zdWJzY3JpYmUoXG4gICAqICAgdmFsdWUgPT4ge30gICAgICAgICAgICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICogICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSAvLyA1XG4gICAqKTtcbiAgICpcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgYmluZENhbGxiYWNrfVxuICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgKiBAc2VlIHtAbGluayBmcm9tUHJvbWlzZX1cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB3aXRoIGEgTm9kZS5qcy1zdHlsZSBjYWxsYmFjayBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtzZWxlY3Rvcl0gQSBmdW5jdGlvbiB3aGljaCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlXG4gICAqIGNhbGxiYWNrIGFuZCBtYXBzIHRob3NlIHRvIGEgdmFsdWUgdG8gZW1pdCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBUaGUgc2NoZWR1bGVyIG9uIHdoaWNoIHRvIHNjaGVkdWxlIHRoZVxuICAgKiBjYWxsYmFja3MuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9uKC4uLnBhcmFtczogKik6IE9ic2VydmFibGV9IEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGVcbiAgICogT2JzZXJ2YWJsZSB0aGF0IGRlbGl2ZXJzIHRoZSBzYW1lIHZhbHVlcyB0aGUgTm9kZS5qcyBjYWxsYmFjayB3b3VsZFxuICAgKiBkZWxpdmVyLlxuICAgKiBAc3RhdGljIHRydWVcbiAgICogQG5hbWUgYmluZE5vZGVDYWxsYmFja1xuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPihmdW5jOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogRnVuY3Rpb24gfCB2b2lkID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiAoLi4uYXJnczogYW55W10pID0+IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBmdW5jdGlvbih0aGlzOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICByZXR1cm4gbmV3IEJvdW5kTm9kZUNhbGxiYWNrT2JzZXJ2YWJsZTxUPihmdW5jLCA8YW55PnNlbGVjdG9yLCBhcmdzLCB0aGlzLCBzY2hlZHVsZXIpO1xuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGxiYWNrRnVuYzogRnVuY3Rpb24sXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VsZWN0b3I6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICBwcml2YXRlIGFyZ3M6IGFueVtdLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbnRleHQ6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIHNjaGVkdWxlcjogSVNjaGVkdWxlcikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQgfCBUW10+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBjYWxsYmFja0Z1bmMgPSB0aGlzLmNhbGxiYWNrRnVuYztcbiAgICBjb25zdCBhcmdzID0gdGhpcy5hcmdzO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgIGxldCBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuXG4gICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgIGlmICghc3ViamVjdCkge1xuICAgICAgICBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0ID0gbmV3IEFzeW5jU3ViamVjdDxUPigpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlckZuKHRoaXM6IGFueSwgLi4uaW5uZXJBcmdzOiBhbnlbXSkge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9ICg8YW55PmhhbmRsZXJGbikuc291cmNlO1xuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0b3IsIHN1YmplY3QgfSA9IHNvdXJjZTtcbiAgICAgICAgICBjb25zdCBlcnIgPSBpbm5lckFyZ3Muc2hpZnQoKTtcblxuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChzZWxlY3RvcikuYXBwbHkodGhpcywgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdWJqZWN0Lm5leHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWJqZWN0Lm5leHQoaW5uZXJBcmdzLmxlbmd0aCA8PSAxID8gaW5uZXJBcmdzWzBdIDogaW5uZXJBcmdzKTtcbiAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIHVzZSBuYW1lZCBmdW5jdGlvbiBpbnN0YW5jZSB0byBhdm9pZCBjbG9zdXJlLlxuICAgICAgICAoPGFueT5oYW5kbGVyKS5zb3VyY2UgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKGNhbGxiYWNrRnVuYykuYXBwbHkodGhpcy5jb250ZXh0LCBhcmdzLmNvbmNhdChoYW5kbGVyKSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgc3ViamVjdC5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCAwLCB7IHNvdXJjZTogdGhpcywgc3Vic2NyaWJlciwgY29udGV4dDogdGhpcy5jb250ZXh0IH0pO1xuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hTdGF0ZTxUPiB7XG4gIHNvdXJjZTogQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlPFQ+O1xuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+O1xuICBjb250ZXh0OiBhbnk7XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoPFQ+KHRoaXM6IEFjdGlvbjxEaXNwYXRjaFN0YXRlPFQ+Piwgc3RhdGU6IERpc3BhdGNoU3RhdGU8VD4pIHtcbiAgY29uc3Qgc2VsZiA9ICg8U3Vic2NyaXB0aW9uPiB0aGlzKTtcbiAgY29uc3QgeyBzb3VyY2UsIHN1YnNjcmliZXIsIGNvbnRleHQgfSA9IHN0YXRlO1xuICAvLyBYWFg6IGNhc3QgdG8gYGFueWAgdG8gYWNjZXNzIHRvIHRoZSBwcml2YXRlIGZpZWxkIGluIGBzb3VyY2VgLlxuICBjb25zdCB7IGNhbGxiYWNrRnVuYywgYXJncywgc2NoZWR1bGVyIH0gPSBzb3VyY2UgYXMgYW55O1xuICBsZXQgc3ViamVjdCA9IHNvdXJjZS5zdWJqZWN0O1xuXG4gIGlmICghc3ViamVjdCkge1xuICAgIHN1YmplY3QgPSBzb3VyY2Uuc3ViamVjdCA9IG5ldyBBc3luY1N1YmplY3Q8VD4oKTtcblxuICAgIGNvbnN0IGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyRm4odGhpczogYW55LCAuLi5pbm5lckFyZ3M6IGFueVtdKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSAoPGFueT5oYW5kbGVyRm4pLnNvdXJjZTtcbiAgICAgIGNvbnN0IHsgc2VsZWN0b3IsIHN1YmplY3QgfSA9IHNvdXJjZTtcbiAgICAgIGNvbnN0IGVyciA9IGlubmVyQXJncy5zaGlmdCgpO1xuXG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHNlbGYuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaEVycm9yLCAwLCB7IGVyciwgc3ViamVjdCB9KSk7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKHNlbGVjdG9yKS5hcHBseSh0aGlzLCBpbm5lckFyZ3MpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgIHNlbGYuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaEVycm9yLCAwLCB7IGVycjogZXJyb3JPYmplY3QuZSwgc3ViamVjdCB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTmV4dCwgMCwgeyB2YWx1ZTogcmVzdWx0LCBzdWJqZWN0IH0pKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbm5lckFyZ3MubGVuZ3RoIDw9IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3M7XG4gICAgICAgIHNlbGYuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWUsIHN1YmplY3QgfSkpO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8gdXNlIG5hbWVkIGZ1bmN0aW9uIHRvIHBhc3MgdmFsdWVzIGluIHdpdGhvdXQgY2xvc3VyZVxuICAgICg8YW55PmhhbmRsZXIpLnNvdXJjZSA9IHNvdXJjZTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKGNhbGxiYWNrRnVuYykuYXBwbHkoY29udGV4dCwgYXJncy5jb25jYXQoaGFuZGxlcikpO1xuICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnI6IGVycm9yT2JqZWN0LmUsIHN1YmplY3QgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGYuYWRkKHN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbn1cblxuaW50ZXJmYWNlIERpc3BhdGNoTmV4dEFyZzxUPiB7XG4gIHN1YmplY3Q6IEFzeW5jU3ViamVjdDxUPjtcbiAgdmFsdWU6IFQ7XG59XG5mdW5jdGlvbiBkaXNwYXRjaE5leHQ8VD4oYXJnOiBEaXNwYXRjaE5leHRBcmc8VD4pIHtcbiAgY29uc3QgeyB2YWx1ZSwgc3ViamVjdCB9ID0gYXJnO1xuICBzdWJqZWN0Lm5leHQodmFsdWUpO1xuICBzdWJqZWN0LmNvbXBsZXRlKCk7XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaEVycm9yQXJnPFQ+IHtcbiAgc3ViamVjdDogQXN5bmNTdWJqZWN0PFQ+O1xuICBlcnI6IGFueTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoRXJyb3I8VD4oYXJnOiBEaXNwYXRjaEVycm9yQXJnPFQ+KSB7XG4gIGNvbnN0IHsgZXJyLCBzdWJqZWN0IH0gPSBhcmc7XG4gIHN1YmplY3QuZXJyb3IoZXJyKTtcbn1cbiJdfQ==