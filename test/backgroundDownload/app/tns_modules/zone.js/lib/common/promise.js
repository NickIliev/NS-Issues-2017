/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            console.error(e);
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[__symbol__('unhandledPromiseRejectionHandler')];
            if (handler && typeof handler === 'function') {
                handler.apply(this, [e]);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError('Promise resolved with itself');
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.apply(value, [
                        onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false))
                    ]);
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    value[__symbol__('currentTask')] = Zone.currentTask;
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        throw new Error('Uncaught (in promise): ' + value +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error = err;
                        error.rejection = value;
                        error.promise = promise;
                        error.zone = Zone.current;
                        error.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[__symbol__('rejectionHandledHandler')];
                if (handler && typeof handler === 'function') {
                    handler.apply(this, [{ rejection: promise[symbolValue], promise: promise }]);
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, undefined, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZoneAwarePromise = (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return 'function ZoneAwarePromise() { [native code] }';
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                _a = [res, rej], resolve = _a[0], reject = _a[1];
                var _a;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch_1 = global['fetch'];
        if (typeof fetch_1 == 'function') {
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb21pc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLE1BQVcsRUFBRSxJQUFjLEVBQUUsR0FBaUI7SUFRbkYsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM5QixJQUFNLHNCQUFzQixHQUEyQixFQUFFLENBQUM7SUFDMUQsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV0QyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxDQUFNO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQ1QsOEJBQThCLEVBQzlCLFNBQVMsWUFBWSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLEVBQUUsU0FBUyxFQUM5RCxDQUFDLENBQUMsSUFBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBVyxDQUFDLENBQUMsSUFBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUN0RixTQUFTLFlBQVksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLEdBQUcsQ0FBQyxrQkFBa0Is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U0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV6QixJQUFJLE9BQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFLLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRUQsK0VBQStFO0lBQzlFLE9BQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUMsR0FBRyxzQkFBc0IsQ0FBQztJQUNwRixNQUFNLENBQUMsZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5ab25lLl9fbG9hZF9wYXRjaCgnWm9uZUF3YXJlUHJvbWlzZScsIChnbG9iYWw6IGFueSwgWm9uZTogWm9uZVR5cGUsIGFwaTogX1pvbmVQcml2YXRlKSA9PiB7XG4gIGludGVyZmFjZSBVbmNhdWdodFByb21pc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICB6b25lOiBBbWJpZW50Wm9uZTtcbiAgICB0YXNrOiBUYXNrO1xuICAgIHByb21pc2U6IFpvbmVBd2FyZVByb21pc2U8YW55PjtcbiAgICByZWplY3Rpb246IGFueTtcbiAgfVxuXG4gIGNvbnN0IF9fc3ltYm9sX18gPSBhcGkuc3ltYm9sO1xuICBjb25zdCBfdW5jYXVnaHRQcm9taXNlRXJyb3JzOiBVbmNhdWdodFByb21pc2VFcnJvcltdID0gW107XG4gIGNvbnN0IHN5bWJvbFByb21pc2UgPSBfX3N5bWJvbF9fKCdQcm9taXNlJyk7XG4gIGNvbnN0IHN5bWJvbFRoZW4gPSBfX3N5bWJvbF9fKCd0aGVuJyk7XG5cbiAgYXBpLm9uVW5oYW5kbGVkRXJyb3IgPSAoZTogYW55KSA9PiB7XG4gICAgaWYgKGFwaS5zaG93VW5jYXVnaHRFcnJvcigpKSB7XG4gICAgICBjb25zdCByZWplY3Rpb24gPSBlICYmIGUucmVqZWN0aW9uO1xuICAgICAgaWYgKHJlamVjdGlvbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgJ1VuaGFuZGxlZCBQcm9taXNlIHJlamVjdGlvbjonLFxuICAgICAgICAgICAgcmVqZWN0aW9uIGluc3RhbmNlb2YgRXJyb3IgPyByZWplY3Rpb24ubWVzc2FnZSA6IHJlamVjdGlvbiwgJzsgWm9uZTonLFxuICAgICAgICAgICAgKDxab25lPmUuem9uZSkubmFtZSwgJzsgVGFzazonLCBlLnRhc2sgJiYgKDxUYXNrPmUudGFzaykuc291cmNlLCAnOyBWYWx1ZTonLCByZWplY3Rpb24sXG4gICAgICAgICAgICByZWplY3Rpb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlamVjdGlvbi5zdGFjayA6IHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfTtcblxuICBhcGkubWljcm90YXNrRHJhaW5Eb25lID0gKCkgPT4ge1xuICAgIHdoaWxlIChfdW5jYXVnaHRQcm9taXNlRXJyb3JzLmxlbmd0aCkge1xuICAgICAgd2hpbGUgKF91bmNhdWdodFByb21pc2VFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHVuY2F1Z2h0UHJvbWlzZUVycm9yOiBVbmNhdWdodFByb21pc2VFcnJvciA9IF91bmNhdWdodFByb21pc2VFcnJvcnMuc2hpZnQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB1bmNhdWdodFByb21pc2VFcnJvci56b25lLnJ1bkd1YXJkZWQoKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgdW5jYXVnaHRQcm9taXNlRXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaGFuZGxlVW5oYW5kbGVkUmVqZWN0aW9uKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBoYW5kbGVVbmhhbmRsZWRSZWplY3Rpb24oZTogYW55KSB7XG4gICAgYXBpLm9uVW5oYW5kbGVkRXJyb3IoZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSAoWm9uZSBhcyBhbnkpW19fc3ltYm9sX18oJ3VuaGFuZGxlZFByb21pc2VSZWplY3Rpb25IYW5kbGVyJyldO1xuICAgICAgaWYgKGhhbmRsZXIgJiYgdHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBbZV0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVGhlbmFibGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS50aGVuO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yd2FyZFJlc29sdXRpb24odmFsdWU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yd2FyZFJlamVjdGlvbihyZWplY3Rpb246IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIFpvbmVBd2FyZVByb21pc2UucmVqZWN0KHJlamVjdGlvbik7XG4gIH1cblxuICBjb25zdCBzeW1ib2xTdGF0ZTogc3RyaW5nID0gX19zeW1ib2xfXygnc3RhdGUnKTtcbiAgY29uc3Qgc3ltYm9sVmFsdWU6IHN0cmluZyA9IF9fc3ltYm9sX18oJ3ZhbHVlJyk7XG4gIGNvbnN0IHNvdXJjZTogc3RyaW5nID0gJ1Byb21pc2UudGhlbic7XG4gIGNvbnN0IFVOUkVTT0xWRUQ6IG51bGwgPSBudWxsO1xuICBjb25zdCBSRVNPTFZFRCA9IHRydWU7XG4gIGNvbnN0IFJFSkVDVEVEID0gZmFsc2U7XG4gIGNvbnN0IFJFSkVDVEVEX05PX0NBVENIID0gMDtcblxuICBmdW5jdGlvbiBtYWtlUmVzb2x2ZXIocHJvbWlzZTogWm9uZUF3YXJlUHJvbWlzZTxhbnk+LCBzdGF0ZTogYm9vbGVhbik6ICh2YWx1ZTogYW55KSA9PiB2b2lkIHtcbiAgICByZXR1cm4gKHYpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVQcm9taXNlKHByb21pc2UsIHN0YXRlLCB2KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXNvbHZlUHJvbWlzZShwcm9taXNlLCBmYWxzZSwgZXJyKTtcbiAgICAgIH1cbiAgICAgIC8vIERvIG5vdCByZXR1cm4gdmFsdWUgb3IgeW91IHdpbGwgYnJlYWsgdGhlIFByb21pc2Ugc3BlYy5cbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgb25jZSA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCB3YXNDYWxsZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyKHdyYXBwZWRGdW5jdGlvbjogRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdhc0NhbGxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3YXNDYWxsZWQgPSB0cnVlO1xuICAgICAgICB3cmFwcGVkRnVuY3Rpb24uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICAvLyBQcm9taXNlIFJlc29sdXRpb25cbiAgZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UoXG4gICAgICBwcm9taXNlOiBab25lQXdhcmVQcm9taXNlPGFueT4sIHN0YXRlOiBib29sZWFuLCB2YWx1ZTogYW55KTogWm9uZUF3YXJlUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBvbmNlV3JhcHBlciA9IG9uY2UoKTtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2UgcmVzb2x2ZWQgd2l0aCBpdHNlbGYnKTtcbiAgICB9XG4gICAgaWYgKChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID09PSBVTlJFU09MVkVEKSB7XG4gICAgICAvLyBzaG91bGQgb25seSBnZXQgdmFsdWUudGhlbiBvbmNlIGJhc2VkIG9uIHByb21pc2Ugc3BlYy5cbiAgICAgIGxldCB0aGVuOiBhbnkgPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhlbiA9IHZhbHVlICYmIHZhbHVlLnRoZW47XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBvbmNlV3JhcHBlcigoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgZmFsc2UsIGVycik7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgLy8gaWYgKHZhbHVlIGluc3RhbmNlb2YgWm9uZUF3YXJlUHJvbWlzZSkge1xuICAgICAgaWYgKHN0YXRlICE9PSBSRUpFQ1RFRCAmJiB2YWx1ZSBpbnN0YW5jZW9mIFpvbmVBd2FyZVByb21pc2UgJiZcbiAgICAgICAgICB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShzeW1ib2xTdGF0ZSkgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoc3ltYm9sVmFsdWUpICYmXG4gICAgICAgICAgKHZhbHVlIGFzIGFueSlbc3ltYm9sU3RhdGVdICE9PSBVTlJFU09MVkVEKSB7XG4gICAgICAgIGNsZWFyUmVqZWN0ZWROb0NhdGNoKDxQcm9taXNlPGFueT4+dmFsdWUpO1xuICAgICAgICByZXNvbHZlUHJvbWlzZShwcm9taXNlLCAodmFsdWUgYXMgYW55KVtzeW1ib2xTdGF0ZV0sICh2YWx1ZSBhcyBhbnkpW3N5bWJvbFZhbHVlXSk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlICE9PSBSRUpFQ1RFRCAmJiB0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uYXBwbHkodmFsdWUsIFtcbiAgICAgICAgICAgIG9uY2VXcmFwcGVyKG1ha2VSZXNvbHZlcihwcm9taXNlLCBzdGF0ZSkpLCBvbmNlV3JhcHBlcihtYWtlUmVzb2x2ZXIocHJvbWlzZSwgZmFsc2UpKVxuICAgICAgICAgIF0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBvbmNlV3JhcHBlcigoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShwcm9taXNlLCBmYWxzZSwgZXJyKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAocHJvbWlzZSBhcyBhbnkpW3N5bWJvbFN0YXRlXSA9IHN0YXRlO1xuICAgICAgICBjb25zdCBxdWV1ZSA9IChwcm9taXNlIGFzIGFueSlbc3ltYm9sVmFsdWVdO1xuICAgICAgICAocHJvbWlzZSBhcyBhbnkpW3N5bWJvbFZhbHVlXSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIHJlY29yZCB0YXNrIGluZm9ybWF0aW9uIGluIHZhbHVlIHdoZW4gZXJyb3Igb2NjdXJzLCBzbyB3ZSBjYW5cbiAgICAgICAgLy8gZG8gc29tZSBhZGRpdGlvbmFsIHdvcmsgc3VjaCBhcyByZW5kZXIgbG9uZ1N0YWNrVHJhY2VcbiAgICAgICAgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCAmJiB2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgKHZhbHVlIGFzIGFueSlbX19zeW1ib2xfXygnY3VycmVudFRhc2snKV0gPSBab25lLmN1cnJlbnRUYXNrO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7KSB7XG4gICAgICAgICAgc2NoZWR1bGVSZXNvbHZlT3JSZWplY3QocHJvbWlzZSwgcXVldWVbaSsrXSwgcXVldWVbaSsrXSwgcXVldWVbaSsrXSwgcXVldWVbaSsrXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PSAwICYmIHN0YXRlID09IFJFSkVDVEVEKSB7XG4gICAgICAgICAgKHByb21pc2UgYXMgYW55KVtzeW1ib2xTdGF0ZV0gPSBSRUpFQ1RFRF9OT19DQVRDSDtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdVbmNhdWdodCAoaW4gcHJvbWlzZSk6ICcgKyB2YWx1ZSArXG4gICAgICAgICAgICAgICAgKHZhbHVlICYmIHZhbHVlLnN0YWNrID8gJ1xcbicgKyB2YWx1ZS5zdGFjayA6ICcnKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvcjogVW5jYXVnaHRQcm9taXNlRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICBlcnJvci5yZWplY3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIGVycm9yLnByb21pc2UgPSBwcm9taXNlO1xuICAgICAgICAgICAgZXJyb3Iuem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgICAgIGVycm9yLnRhc2sgPSBab25lLmN1cnJlbnRUYXNrO1xuICAgICAgICAgICAgX3VuY2F1Z2h0UHJvbWlzZUVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICAgIGFwaS5zY2hlZHVsZU1pY3JvVGFzaygpOyAgLy8gdG8gbWFrZSBzdXJlIHRoYXQgaXQgaXMgcnVubmluZ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXNvbHZpbmcgYW4gYWxyZWFkeSByZXNvbHZlZCBwcm9taXNlIGlzIGEgbm9vcC5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyUmVqZWN0ZWROb0NhdGNoKHByb21pc2U6IFpvbmVBd2FyZVByb21pc2U8YW55Pik6IHZvaWQge1xuICAgIGlmICgocHJvbWlzZSBhcyBhbnkpW3N5bWJvbFN0YXRlXSA9PT0gUkVKRUNURURfTk9fQ0FUQ0gpIHtcbiAgICAgIC8vIGlmIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIG5vIGNhdGNoIHN0YXR1c1xuICAgICAgLy8gYW5kIHF1ZXVlLmxlbmd0aCA+IDAsIG1lYW5zIHRoZXJlIGlzIGEgZXJyb3IgaGFuZGxlclxuICAgICAgLy8gaGVyZSB0byBoYW5kbGUgdGhlIHJlamVjdGVkIHByb21pc2UsIHdlIHNob3VsZCB0cmlnZ2VyXG4gICAgICAvLyB3aW5kb3dzLnJlamVjdGlvbmhhbmRsZWQgZXZlbnRIYW5kbGVyIG9yIG5vZGVqcyByZWplY3Rpb25IYW5kbGVkXG4gICAgICAvLyBldmVudEhhbmRsZXJcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoWm9uZSBhcyBhbnkpW19fc3ltYm9sX18oJ3JlamVjdGlvbkhhbmRsZWRIYW5kbGVyJyldO1xuICAgICAgICBpZiAoaGFuZGxlciAmJiB0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgW3tyZWplY3Rpb246IChwcm9taXNlIGFzIGFueSlbc3ltYm9sVmFsdWVdLCBwcm9taXNlOiBwcm9taXNlfV0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIH1cbiAgICAgIChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID0gUkVKRUNURUQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF91bmNhdWdodFByb21pc2VFcnJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb21pc2UgPT09IF91bmNhdWdodFByb21pc2VFcnJvcnNbaV0ucHJvbWlzZSkge1xuICAgICAgICAgIF91bmNhdWdodFByb21pc2VFcnJvcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGVSZXNvbHZlT3JSZWplY3Q8UiwgVT4oXG4gICAgICBwcm9taXNlOiBab25lQXdhcmVQcm9taXNlPGFueT4sIHpvbmU6IEFtYmllbnRab25lLCBjaGFpblByb21pc2U6IFpvbmVBd2FyZVByb21pc2U8YW55PixcbiAgICAgIG9uRnVsZmlsbGVkPzogKHZhbHVlOiBSKSA9PiBVLCBvblJlamVjdGVkPzogKGVycm9yOiBhbnkpID0+IFUpOiB2b2lkIHtcbiAgICBjbGVhclJlamVjdGVkTm9DYXRjaChwcm9taXNlKTtcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID9cbiAgICAgICAgKHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJykgPyBvbkZ1bGZpbGxlZCA6IGZvcndhcmRSZXNvbHV0aW9uIDpcbiAgICAgICAgKHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nKSA/IG9uUmVqZWN0ZWQgOiBmb3J3YXJkUmVqZWN0aW9uO1xuICAgIHpvbmUuc2NoZWR1bGVNaWNyb1Rhc2soc291cmNlLCAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXNvbHZlUHJvbWlzZShcbiAgICAgICAgICAgIGNoYWluUHJvbWlzZSwgdHJ1ZSwgem9uZS5ydW4oZGVsZWdhdGUsIHVuZGVmaW5lZCwgWyhwcm9taXNlIGFzIGFueSlbc3ltYm9sVmFsdWVdXSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVzb2x2ZVByb21pc2UoY2hhaW5Qcm9taXNlLCBmYWxzZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2xhc3MgWm9uZUF3YXJlUHJvbWlzZTxSPiBpbXBsZW1lbnRzIFByb21pc2U8Uj4ge1xuICAgIHN0YXRpYyB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiAnZnVuY3Rpb24gWm9uZUF3YXJlUHJvbWlzZSgpIHsgW25hdGl2ZSBjb2RlXSB9JztcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVzb2x2ZTxSPih2YWx1ZTogUik6IFByb21pc2U8Uj4ge1xuICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlKDxab25lQXdhcmVQcm9taXNlPFI+Pm5ldyB0aGlzKG51bGwpLCBSRVNPTFZFRCwgdmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZWplY3Q8VT4oZXJyb3I6IFUpOiBQcm9taXNlPFU+IHtcbiAgICAgIHJldHVybiByZXNvbHZlUHJvbWlzZSg8Wm9uZUF3YXJlUHJvbWlzZTxVPj5uZXcgdGhpcyhudWxsKSwgUkVKRUNURUQsIGVycm9yKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmFjZTxSPih2YWx1ZXM6IFByb21pc2VMaWtlPGFueT5bXSk6IFByb21pc2U8Uj4ge1xuICAgICAgbGV0IHJlc29sdmU6ICh2OiBhbnkpID0+IHZvaWQ7XG4gICAgICBsZXQgcmVqZWN0OiAodjogYW55KSA9PiB2b2lkO1xuICAgICAgbGV0IHByb21pc2U6IGFueSA9IG5ldyB0aGlzKChyZXMsIHJlaikgPT4ge1xuICAgICAgICBbcmVzb2x2ZSwgcmVqZWN0XSA9IFtyZXMsIHJlal07XG4gICAgICB9KTtcbiAgICAgIGZ1bmN0aW9uIG9uUmVzb2x2ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHByb21pc2UgJiYgKHByb21pc2UgPSBudWxsIHx8IHJlc29sdmUodmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG9uUmVqZWN0KGVycm9yOiBhbnkpIHtcbiAgICAgICAgcHJvbWlzZSAmJiAocHJvbWlzZSA9IG51bGwgfHwgcmVqZWN0KGVycm9yKSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICBpZiAoIWlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnJlc29sdmUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlLnRoZW4ob25SZXNvbHZlLCBvblJlamVjdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWxsPFI+KHZhbHVlczogYW55KTogUHJvbWlzZTxSPiB7XG4gICAgICBsZXQgcmVzb2x2ZTogKHY6IGFueSkgPT4gdm9pZDtcbiAgICAgIGxldCByZWplY3Q6ICh2OiBhbnkpID0+IHZvaWQ7XG4gICAgICBsZXQgcHJvbWlzZSA9IG5ldyB0aGlzKChyZXMsIHJlaikgPT4ge1xuICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICByZWplY3QgPSByZWo7XG4gICAgICB9KTtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBjb25zdCByZXNvbHZlZFZhbHVlczogYW55W10gPSBbXTtcbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICBpZiAoIWlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnJlc29sdmUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlLnRoZW4oXG4gICAgICAgICAgICAoKGluZGV4KSA9PiAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlZFZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgICAgaWYgKCFjb3VudCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzb2x2ZWRWYWx1ZXMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShjb3VudCksXG4gICAgICAgICAgICByZWplY3QpO1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgICAgaWYgKCFjb3VudCkgcmVzb2x2ZShyZXNvbHZlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZXhlY3V0b3I6XG4gICAgICAgICAgICAocmVzb2x2ZTogKHZhbHVlPzogUnxQcm9taXNlTGlrZTxSPikgPT4gdm9pZCwgcmVqZWN0OiAoZXJyb3I/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQpIHtcbiAgICAgIGNvbnN0IHByb21pc2U6IFpvbmVBd2FyZVByb21pc2U8Uj4gPSB0aGlzO1xuICAgICAgaWYgKCEocHJvbWlzZSBpbnN0YW5jZW9mIFpvbmVBd2FyZVByb21pc2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBiZSBhbiBpbnN0YW5jZW9mIFByb21pc2UuJyk7XG4gICAgICB9XG4gICAgICAocHJvbWlzZSBhcyBhbnkpW3N5bWJvbFN0YXRlXSA9IFVOUkVTT0xWRUQ7XG4gICAgICAocHJvbWlzZSBhcyBhbnkpW3N5bWJvbFZhbHVlXSA9IFtdOyAgLy8gcXVldWU7XG4gICAgICB0cnkge1xuICAgICAgICBleGVjdXRvciAmJiBleGVjdXRvcihtYWtlUmVzb2x2ZXIocHJvbWlzZSwgUkVTT0xWRUQpLCBtYWtlUmVzb2x2ZXIocHJvbWlzZSwgUkVKRUNURUQpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlc29sdmVQcm9taXNlKHByb21pc2UsIGZhbHNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhlbjxSLCBVPihcbiAgICAgICAgb25GdWxmaWxsZWQ/OiAodmFsdWU6IFIpID0+IFUgfCBQcm9taXNlTGlrZTxVPixcbiAgICAgICAgb25SZWplY3RlZD86IChlcnJvcjogYW55KSA9PiBVIHwgUHJvbWlzZUxpa2U8VT4pOiBQcm9taXNlPFI+IHtcbiAgICAgIGNvbnN0IGNoYWluUHJvbWlzZTogUHJvbWlzZTxSPiA9IG5ldyAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgWm9uZUF3YXJlUHJvbWlzZSkobnVsbCk7XG4gICAgICBjb25zdCB6b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgaWYgKCh0aGlzIGFzIGFueSlbc3ltYm9sU3RhdGVdID09IFVOUkVTT0xWRUQpIHtcbiAgICAgICAgKDxhbnlbXT4odGhpcyBhcyBhbnkpW3N5bWJvbFZhbHVlXSkucHVzaCh6b25lLCBjaGFpblByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjaGVkdWxlUmVzb2x2ZU9yUmVqZWN0KHRoaXMsIHpvbmUsIGNoYWluUHJvbWlzZSwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYWluUHJvbWlzZTtcbiAgICB9XG5cbiAgICBjYXRjaDxVPihvblJlamVjdGVkPzogKGVycm9yOiBhbnkpID0+IFUgfCBQcm9taXNlTGlrZTxVPik6IFByb21pc2U8Uj4ge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH1cbiAgLy8gUHJvdGVjdCBhZ2FpbnN0IGFnZ3Jlc3NpdmUgb3B0aW1pemVycyBkcm9wcGluZyBzZWVtaW5nbHkgdW51c2VkIHByb3BlcnRpZXMuXG4gIC8vIEUuZy4gQ2xvc3VyZSBDb21waWxlciBpbiBhZHZhbmNlZCBtb2RlLlxuICBab25lQXdhcmVQcm9taXNlWydyZXNvbHZlJ10gPSBab25lQXdhcmVQcm9taXNlLnJlc29sdmU7XG4gIFpvbmVBd2FyZVByb21pc2VbJ3JlamVjdCddID0gWm9uZUF3YXJlUHJvbWlzZS5yZWplY3Q7XG4gIFpvbmVBd2FyZVByb21pc2VbJ3JhY2UnXSA9IFpvbmVBd2FyZVByb21pc2UucmFjZTtcbiAgWm9uZUF3YXJlUHJvbWlzZVsnYWxsJ10gPSBab25lQXdhcmVQcm9taXNlLmFsbDtcblxuICBjb25zdCBOYXRpdmVQcm9taXNlID0gZ2xvYmFsW3N5bWJvbFByb21pc2VdID0gZ2xvYmFsWydQcm9taXNlJ107XG4gIGdsb2JhbFsnUHJvbWlzZSddID0gWm9uZUF3YXJlUHJvbWlzZTtcblxuICBjb25zdCBzeW1ib2xUaGVuUGF0Y2hlZCA9IF9fc3ltYm9sX18oJ3RoZW5QYXRjaGVkJyk7XG5cbiAgZnVuY3Rpb24gcGF0Y2hUaGVuKEN0b3I6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3QgcHJvdG8gPSBDdG9yLnByb3RvdHlwZTtcbiAgICBjb25zdCBvcmlnaW5hbFRoZW4gPSBwcm90by50aGVuO1xuICAgIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIG1ldGhvZC5cbiAgICBwcm90b1tzeW1ib2xUaGVuXSA9IG9yaWdpbmFsVGhlbjtcblxuICAgIEN0b3IucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvblJlc29sdmU6IGFueSwgb25SZWplY3Q6IGFueSkge1xuICAgICAgY29uc3Qgd3JhcHBlZCA9IG5ldyBab25lQXdhcmVQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgb3JpZ2luYWxUaGVuLmNhbGwodGhpcywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHdyYXBwZWQudGhlbihvblJlc29sdmUsIG9uUmVqZWN0KTtcbiAgICB9O1xuICAgIChDdG9yIGFzIGFueSlbc3ltYm9sVGhlblBhdGNoZWRdID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHpvbmVpZnkoZm46IEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IHJlc3VsdFByb21pc2UgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKHJlc3VsdFByb21pc2UgaW5zdGFuY2VvZiBab25lQXdhcmVQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgICAgfVxuICAgICAgbGV0IGN0b3IgPSByZXN1bHRQcm9taXNlLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKCFjdG9yW3N5bWJvbFRoZW5QYXRjaGVkXSkge1xuICAgICAgICBwYXRjaFRoZW4oY3Rvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKE5hdGl2ZVByb21pc2UpIHtcbiAgICBwYXRjaFRoZW4oTmF0aXZlUHJvbWlzZSk7XG5cbiAgICBsZXQgZmV0Y2ggPSBnbG9iYWxbJ2ZldGNoJ107XG4gICAgaWYgKHR5cGVvZiBmZXRjaCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBnbG9iYWxbJ2ZldGNoJ10gPSB6b25laWZ5KGZldGNoKTtcbiAgICB9XG4gIH1cblxuICAvLyBUaGlzIGlzIG5vdCBwYXJ0IG9mIHB1YmxpYyBBUEksIGJ1dCBpdCBpcyB1c2VmdWwgZm9yIHRlc3RzLCBzbyB3ZSBleHBvc2UgaXQuXG4gIChQcm9taXNlIGFzIGFueSlbWm9uZS5fX3N5bWJvbF9fKCd1bmNhdWdodFByb21pc2VFcnJvcnMnKV0gPSBfdW5jYXVnaHRQcm9taXNlRXJyb3JzO1xuICByZXR1cm4gWm9uZUF3YXJlUHJvbWlzZTtcbn0pO1xuIl19