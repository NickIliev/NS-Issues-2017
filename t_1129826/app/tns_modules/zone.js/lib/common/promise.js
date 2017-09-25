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
            else {
                console.error(e);
            }
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
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
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
    var TYPE_ERROR = 'Promise resolved with itself';
    var OBJECT = 'object';
    var FUNCTION = 'function';
    var CURRENT_TASK_SYMBOL = __symbol__('currentTask');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === OBJECT || typeof value === FUNCTION) {
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
            else if (state !== REJECTED && typeof then === FUNCTION) {
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
                    value[CURRENT_TASK_SYMBOL] = Zone.currentTask;
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
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === FUNCTION) {
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
            (typeof onFulfilled === FUNCTION) ? onFulfilled : forwardResolution :
            (typeof onRejected === FUNCTION) ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, undefined, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
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
            return ZONE_AWARE_PROMISE_TO_STRING;
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
        // check Ctor.prototype.then propertyDescritor is writable or not
        // in meteor env, writable is false, we have to make it to be true.
        var prop = Object.getOwnPropertyDescriptor(Ctor.prototype, 'then');
        if (prop && prop.writable === false && prop.configurable) {
            Object.defineProperty(Ctor.prototype, 'then', { writable: true });
        }
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
        if (typeof fetch_1 == FUNCTION) {
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb21pc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLE1BQVcsRUFBRSxJQUFjLEVBQUUsR0FBaUI7SUFRbkYsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM5QixJQUFNLHNCQUFzQixHQUEyQixFQUFFLENBQUM7SUFDMUQsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV0QyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxDQUFNO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQ1QsOEJBQThCLEVBQzlCLFNBQVMsWUFBWSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLEVBQUUsU0FBUyxFQUM5RCxDQUFDLENBQUMsSUFBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBVyxDQUFDLENBQUMsSUFBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUN0RixTQUFTLFlBQVksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7SUFDSCxD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RCwrRUFBK0U7SUFDOUUsT0FBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFDO0lBQ3BGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblpvbmUuX19sb2FkX3BhdGNoKCdab25lQXdhcmVQcm9taXNlJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgaW50ZXJmYWNlIFVuY2F1Z2h0UHJvbWlzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIHpvbmU6IEFtYmllbnRab25lO1xuICAgIHRhc2s6IFRhc2s7XG4gICAgcHJvbWlzZTogWm9uZUF3YXJlUHJvbWlzZTxhbnk+O1xuICAgIHJlamVjdGlvbjogYW55O1xuICB9XG5cbiAgY29uc3QgX19zeW1ib2xfXyA9IGFwaS5zeW1ib2w7XG4gIGNvbnN0IF91bmNhdWdodFByb21pc2VFcnJvcnM6IFVuY2F1Z2h0UHJvbWlzZUVycm9yW10gPSBbXTtcbiAgY29uc3Qgc3ltYm9sUHJvbWlzZSA9IF9fc3ltYm9sX18oJ1Byb21pc2UnKTtcbiAgY29uc3Qgc3ltYm9sVGhlbiA9IF9fc3ltYm9sX18oJ3RoZW4nKTtcblxuICBhcGkub25VbmhhbmRsZWRFcnJvciA9IChlOiBhbnkpID0+IHtcbiAgICBpZiAoYXBpLnNob3dVbmNhdWdodEVycm9yKCkpIHtcbiAgICAgIGNvbnN0IHJlamVjdGlvbiA9IGUgJiYgZS5yZWplY3Rpb247XG4gICAgICBpZiAocmVqZWN0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAnVW5oYW5kbGVkIFByb21pc2UgcmVqZWN0aW9uOicsXG4gICAgICAgICAgICByZWplY3Rpb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlamVjdGlvbi5tZXNzYWdlIDogcmVqZWN0aW9uLCAnOyBab25lOicsXG4gICAgICAgICAgICAoPFpvbmU+ZS56b25lKS5uYW1lLCAnOyBUYXNrOicsIGUudGFzayAmJiAoPFRhc2s+ZS50YXNrKS5zb3VyY2UsICc7IFZhbHVlOicsIHJlamVjdGlvbixcbiAgICAgICAgICAgIHJlamVjdGlvbiBpbnN0YW5jZW9mIEVycm9yID8gcmVqZWN0aW9uLnN0YWNrIDogdW5kZWZpbmVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGFwaS5taWNyb3Rhc2tEcmFpbkRvbmUgPSAoKSA9PiB7XG4gICAgd2hpbGUgKF91bmNhdWdodFByb21pc2VFcnJvcnMubGVuZ3RoKSB7XG4gICAgICB3aGlsZSAoX3VuY2F1Z2h0UHJvbWlzZUVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgdW5jYXVnaHRQcm9taXNlRXJyb3I6IFVuY2F1Z2h0UHJvbWlzZUVycm9yID0gX3VuY2F1Z2h0UHJvbWlzZUVycm9ycy5zaGlmdCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHVuY2F1Z2h0UHJvbWlzZUVycm9yLnpvbmUucnVuR3VhcmRlZCgoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyB1bmNhdWdodFByb21pc2VFcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRSZWplY3Rpb24oZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IFVOSEFORExFRF9QUk9NSVNFX1JFSkVDVElPTl9IQU5ETEVSX1NZTUJPTCA9IF9fc3ltYm9sX18oJ3VuaGFuZGxlZFByb21pc2VSZWplY3Rpb25IYW5kbGVyJyk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlVW5oYW5kbGVkUmVqZWN0aW9uKGU6IGFueSkge1xuICAgIGFwaS5vblVuaGFuZGxlZEVycm9yKGUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gKFpvbmUgYXMgYW55KVtVTkhBTkRMRURfUFJPTUlTRV9SRUpFQ1RJT05fSEFORExFUl9TWU1CT0xdO1xuICAgICAgaWYgKGhhbmRsZXIgJiYgdHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBbZV0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVGhlbmFibGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS50aGVuO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yd2FyZFJlc29sdXRpb24odmFsdWU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yd2FyZFJlamVjdGlvbihyZWplY3Rpb246IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIFpvbmVBd2FyZVByb21pc2UucmVqZWN0KHJlamVjdGlvbik7XG4gIH1cblxuICBjb25zdCBzeW1ib2xTdGF0ZTogc3RyaW5nID0gX19zeW1ib2xfXygnc3RhdGUnKTtcbiAgY29uc3Qgc3ltYm9sVmFsdWU6IHN0cmluZyA9IF9fc3ltYm9sX18oJ3ZhbHVlJyk7XG4gIGNvbnN0IHNvdXJjZTogc3RyaW5nID0gJ1Byb21pc2UudGhlbic7XG4gIGNvbnN0IFVOUkVTT0xWRUQ6IG51bGwgPSBudWxsO1xuICBjb25zdCBSRVNPTFZFRCA9IHRydWU7XG4gIGNvbnN0IFJFSkVDVEVEID0gZmFsc2U7XG4gIGNvbnN0IFJFSkVDVEVEX05PX0NBVENIID0gMDtcblxuICBmdW5jdGlvbiBtYWtlUmVzb2x2ZXIocHJvbWlzZTogWm9uZUF3YXJlUHJvbWlzZTxhbnk+LCBzdGF0ZTogYm9vbGVhbik6ICh2YWx1ZTogYW55KSA9PiB2b2lkIHtcbiAgICByZXR1cm4gKHYpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVQcm9taXNlKHByb21pc2UsIHN0YXRlLCB2KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXNvbHZlUHJvbWlzZShwcm9taXNlLCBmYWxzZSwgZXJyKTtcbiAgICAgIH1cbiAgICAgIC8vIERvIG5vdCByZXR1cm4gdmFsdWUgb3IgeW91IHdpbGwgYnJlYWsgdGhlIFByb21pc2Ugc3BlYy5cbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgb25jZSA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCB3YXNDYWxsZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyKHdyYXBwZWRGdW5jdGlvbjogRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdhc0NhbGxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3YXNDYWxsZWQgPSB0cnVlO1xuICAgICAgICB3cmFwcGVkRnVuY3Rpb24uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBUWVBFX0VSUk9SID0gJ1Byb21pc2UgcmVzb2x2ZWQgd2l0aCBpdHNlbGYnO1xuICBjb25zdCBPQkpFQ1QgPSAnb2JqZWN0JztcbiAgY29uc3QgRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuICBjb25zdCBDVVJSRU5UX1RBU0tfU1lNQk9MID0gX19zeW1ib2xfXygnY3VycmVudFRhc2snKTtcblxuICAvLyBQcm9taXNlIFJlc29sdXRpb25cbiAgZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UoXG4gICAgICBwcm9taXNlOiBab25lQXdhcmVQcm9taXNlPGFueT4sIHN0YXRlOiBib29sZWFuLCB2YWx1ZTogYW55KTogWm9uZUF3YXJlUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBvbmNlV3JhcHBlciA9IG9uY2UoKTtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoVFlQRV9FUlJPUik7XG4gICAgfVxuICAgIGlmICgocHJvbWlzZSBhcyBhbnkpW3N5bWJvbFN0YXRlXSA9PT0gVU5SRVNPTFZFRCkge1xuICAgICAgLy8gc2hvdWxkIG9ubHkgZ2V0IHZhbHVlLnRoZW4gb25jZSBiYXNlZCBvbiBwcm9taXNlIHNwZWMuXG4gICAgICBsZXQgdGhlbjogYW55ID0gbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IE9CSkVDVCB8fCB0eXBlb2YgdmFsdWUgPT09IEZVTkNUSU9OKSB7XG4gICAgICAgICAgdGhlbiA9IHZhbHVlICYmIHZhbHVlLnRoZW47XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBvbmNlV3JhcHBlcigoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgZmFsc2UsIGVycik7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgLy8gaWYgKHZhbHVlIGluc3RhbmNlb2YgWm9uZUF3YXJlUHJvbWlzZSkge1xuICAgICAgaWYgKHN0YXRlICE9PSBSRUpFQ1RFRCAmJiB2YWx1ZSBpbnN0YW5jZW9mIFpvbmVBd2FyZVByb21pc2UgJiZcbiAgICAgICAgICB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShzeW1ib2xTdGF0ZSkgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoc3ltYm9sVmFsdWUpICYmXG4gICAgICAgICAgKHZhbHVlIGFzIGFueSlbc3ltYm9sU3RhdGVdICE9PSBVTlJFU09MVkVEKSB7XG4gICAgICAgIGNsZWFyUmVqZWN0ZWROb0NhdGNoKDxQcm9taXNlPGFueT4+dmFsdWUpO1xuICAgICAgICByZXNvbHZlUHJvbWlzZShwcm9taXNlLCAodmFsdWUgYXMgYW55KVtzeW1ib2xTdGF0ZV0sICh2YWx1ZSBhcyBhbnkpW3N5bWJvbFZhbHVlXSk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlICE9PSBSRUpFQ1RFRCAmJiB0eXBlb2YgdGhlbiA9PT0gRlVOQ1RJT04pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmFwcGx5KHZhbHVlLCBbXG4gICAgICAgICAgICBvbmNlV3JhcHBlcihtYWtlUmVzb2x2ZXIocHJvbWlzZSwgc3RhdGUpKSwgb25jZVdyYXBwZXIobWFrZVJlc29sdmVyKHByb21pc2UsIGZhbHNlKSlcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgb25jZVdyYXBwZXIoKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgZmFsc2UsIGVycik7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHByb21pc2UgYXMgYW55KVtzeW1ib2xTdGF0ZV0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3QgcXVldWUgPSAocHJvbWlzZSBhcyBhbnkpW3N5bWJvbFZhbHVlXTtcbiAgICAgICAgKHByb21pc2UgYXMgYW55KVtzeW1ib2xWYWx1ZV0gPSB2YWx1ZTtcblxuICAgICAgICAvLyByZWNvcmQgdGFzayBpbmZvcm1hdGlvbiBpbiB2YWx1ZSB3aGVuIGVycm9yIG9jY3Vycywgc28gd2UgY2FuXG4gICAgICAgIC8vIGRvIHNvbWUgYWRkaXRpb25hbCB3b3JrIHN1Y2ggYXMgcmVuZGVyIGxvbmdTdGFja1RyYWNlXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gUkVKRUNURUQgJiYgdmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICh2YWx1ZSBhcyBhbnkpW0NVUlJFTlRfVEFTS19TWU1CT0xdID0gWm9uZS5jdXJyZW50VGFzaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOykge1xuICAgICAgICAgIHNjaGVkdWxlUmVzb2x2ZU9yUmVqZWN0KHByb21pc2UsIHF1ZXVlW2krK10sIHF1ZXVlW2krK10sIHF1ZXVlW2krK10sIHF1ZXVlW2krK10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPT0gMCAmJiBzdGF0ZSA9PSBSRUpFQ1RFRCkge1xuICAgICAgICAgIChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID0gUkVKRUNURURfTk9fQ0FUQ0g7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAnVW5jYXVnaHQgKGluIHByb21pc2UpOiAnICsgdmFsdWUgK1xuICAgICAgICAgICAgICAgICh2YWx1ZSAmJiB2YWx1ZS5zdGFjayA/ICdcXG4nICsgdmFsdWUuc3RhY2sgOiAnJykpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3I6IFVuY2F1Z2h0UHJvbWlzZUVycm9yID0gZXJyO1xuICAgICAgICAgICAgZXJyb3IucmVqZWN0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICBlcnJvci5wcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgICAgIGVycm9yLnpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICAgICBlcnJvci50YXNrID0gWm9uZS5jdXJyZW50VGFzaztcbiAgICAgICAgICAgIF91bmNhdWdodFByb21pc2VFcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgICBhcGkuc2NoZWR1bGVNaWNyb1Rhc2soKTsgIC8vIHRvIG1ha2Ugc3VyZSB0aGF0IGl0IGlzIHJ1bm5pbmdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVzb2x2aW5nIGFuIGFscmVhZHkgcmVzb2x2ZWQgcHJvbWlzZSBpcyBhIG5vb3AuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBjb25zdCBSRUpFQ1RJT05fSEFORExFRF9IQU5ETEVSID0gX19zeW1ib2xfXygncmVqZWN0aW9uSGFuZGxlZEhhbmRsZXInKTtcbiAgZnVuY3Rpb24gY2xlYXJSZWplY3RlZE5vQ2F0Y2gocHJvbWlzZTogWm9uZUF3YXJlUHJvbWlzZTxhbnk+KTogdm9pZCB7XG4gICAgaWYgKChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID09PSBSRUpFQ1RFRF9OT19DQVRDSCkge1xuICAgICAgLy8gaWYgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgbm8gY2F0Y2ggc3RhdHVzXG4gICAgICAvLyBhbmQgcXVldWUubGVuZ3RoID4gMCwgbWVhbnMgdGhlcmUgaXMgYSBlcnJvciBoYW5kbGVyXG4gICAgICAvLyBoZXJlIHRvIGhhbmRsZSB0aGUgcmVqZWN0ZWQgcHJvbWlzZSwgd2Ugc2hvdWxkIHRyaWdnZXJcbiAgICAgIC8vIHdpbmRvd3MucmVqZWN0aW9uaGFuZGxlZCBldmVudEhhbmRsZXIgb3Igbm9kZWpzIHJlamVjdGlvbkhhbmRsZWRcbiAgICAgIC8vIGV2ZW50SGFuZGxlclxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChab25lIGFzIGFueSlbUkVKRUNUSU9OX0hBTkRMRURfSEFORExFUl07XG4gICAgICAgIGlmIChoYW5kbGVyICYmIHR5cGVvZiBoYW5kbGVyID09PSBGVU5DVElPTikge1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgW3tyZWplY3Rpb246IChwcm9taXNlIGFzIGFueSlbc3ltYm9sVmFsdWVdLCBwcm9taXNlOiBwcm9taXNlfV0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIH1cbiAgICAgIChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID0gUkVKRUNURUQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF91bmNhdWdodFByb21pc2VFcnJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb21pc2UgPT09IF91bmNhdWdodFByb21pc2VFcnJvcnNbaV0ucHJvbWlzZSkge1xuICAgICAgICAgIF91bmNhdWdodFByb21pc2VFcnJvcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGVSZXNvbHZlT3JSZWplY3Q8UiwgVT4oXG4gICAgICBwcm9taXNlOiBab25lQXdhcmVQcm9taXNlPGFueT4sIHpvbmU6IEFtYmllbnRab25lLCBjaGFpblByb21pc2U6IFpvbmVBd2FyZVByb21pc2U8YW55PixcbiAgICAgIG9uRnVsZmlsbGVkPzogKHZhbHVlOiBSKSA9PiBVLCBvblJlamVjdGVkPzogKGVycm9yOiBhbnkpID0+IFUpOiB2b2lkIHtcbiAgICBjbGVhclJlamVjdGVkTm9DYXRjaChwcm9taXNlKTtcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID9cbiAgICAgICAgKHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gRlVOQ1RJT04pID8gb25GdWxmaWxsZWQgOiBmb3J3YXJkUmVzb2x1dGlvbiA6XG4gICAgICAgICh0eXBlb2Ygb25SZWplY3RlZCA9PT0gRlVOQ1RJT04pID8gb25SZWplY3RlZCA6IGZvcndhcmRSZWplY3Rpb247XG4gICAgem9uZS5zY2hlZHVsZU1pY3JvVGFzayhzb3VyY2UsICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVQcm9taXNlKFxuICAgICAgICAgICAgY2hhaW5Qcm9taXNlLCB0cnVlLCB6b25lLnJ1bihkZWxlZ2F0ZSwgdW5kZWZpbmVkLCBbKHByb21pc2UgYXMgYW55KVtzeW1ib2xWYWx1ZV1dKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXNvbHZlUHJvbWlzZShjaGFpblByb21pc2UsIGZhbHNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBaT05FX0FXQVJFX1BST01JU0VfVE9fU1RSSU5HID0gJ2Z1bmN0aW9uIFpvbmVBd2FyZVByb21pc2UoKSB7IFtuYXRpdmUgY29kZV0gfSc7XG5cbiAgY2xhc3MgWm9uZUF3YXJlUHJvbWlzZTxSPiBpbXBsZW1lbnRzIFByb21pc2U8Uj4ge1xuICAgIHN0YXRpYyB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBaT05FX0FXQVJFX1BST01JU0VfVE9fU1RSSU5HO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXNvbHZlPFI+KHZhbHVlOiBSKTogUHJvbWlzZTxSPiB7XG4gICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2UoPFpvbmVBd2FyZVByb21pc2U8Uj4+bmV3IHRoaXMobnVsbCksIFJFU09MVkVELCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlamVjdDxVPihlcnJvcjogVSk6IFByb21pc2U8VT4ge1xuICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlKDxab25lQXdhcmVQcm9taXNlPFU+Pm5ldyB0aGlzKG51bGwpLCBSRUpFQ1RFRCwgZXJyb3IpO1xuICAgIH1cblxuICAgIHN0YXRpYyByYWNlPFI+KHZhbHVlczogUHJvbWlzZUxpa2U8YW55PltdKTogUHJvbWlzZTxSPiB7XG4gICAgICBsZXQgcmVzb2x2ZTogKHY6IGFueSkgPT4gdm9pZDtcbiAgICAgIGxldCByZWplY3Q6ICh2OiBhbnkpID0+IHZvaWQ7XG4gICAgICBsZXQgcHJvbWlzZTogYW55ID0gbmV3IHRoaXMoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgIFtyZXNvbHZlLCByZWplY3RdID0gW3JlcywgcmVqXTtcbiAgICAgIH0pO1xuICAgICAgZnVuY3Rpb24gb25SZXNvbHZlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcHJvbWlzZSAmJiAocHJvbWlzZSA9IG51bGwgfHwgcmVzb2x2ZSh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gb25SZWplY3QoZXJyb3I6IGFueSkge1xuICAgICAgICBwcm9taXNlICYmIChwcm9taXNlID0gbnVsbCB8fCByZWplY3QoZXJyb3IpKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgIGlmICghaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUudGhlbihvblJlc29sdmUsIG9uUmVqZWN0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBhbGw8Uj4odmFsdWVzOiBhbnkpOiBQcm9taXNlPFI+IHtcbiAgICAgIGxldCByZXNvbHZlOiAodjogYW55KSA9PiB2b2lkO1xuICAgICAgbGV0IHJlamVjdDogKHY6IGFueSkgPT4gdm9pZDtcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IHRoaXMoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgIHJlc29sdmUgPSByZXM7XG4gICAgICAgIHJlamVjdCA9IHJlajtcbiAgICAgIH0pO1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIGNvbnN0IHJlc29sdmVkVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgIGlmICghaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUudGhlbihcbiAgICAgICAgICAgICgoaW5kZXgpID0+ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmVkVmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICBpZiAoIWNvdW50KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNvbHZlZFZhbHVlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKGNvdW50KSxcbiAgICAgICAgICAgIHJlamVjdCk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgICBpZiAoIWNvdW50KSByZXNvbHZlKHJlc29sdmVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBleGVjdXRvcjpcbiAgICAgICAgICAgIChyZXNvbHZlOiAodmFsdWU/OiBSfFByb21pc2VMaWtlPFI+KSA9PiB2b2lkLCByZWplY3Q6IChlcnJvcj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCkge1xuICAgICAgY29uc3QgcHJvbWlzZTogWm9uZUF3YXJlUHJvbWlzZTxSPiA9IHRoaXM7XG4gICAgICBpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgWm9uZUF3YXJlUHJvbWlzZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGJlIGFuIGluc3RhbmNlb2YgUHJvbWlzZS4nKTtcbiAgICAgIH1cbiAgICAgIChwcm9taXNlIGFzIGFueSlbc3ltYm9sU3RhdGVdID0gVU5SRVNPTFZFRDtcbiAgICAgIChwcm9taXNlIGFzIGFueSlbc3ltYm9sVmFsdWVdID0gW107ICAvLyBxdWV1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4ZWN1dG9yICYmIGV4ZWN1dG9yKG1ha2VSZXNvbHZlcihwcm9taXNlLCBSRVNPTFZFRCksIG1ha2VSZXNvbHZlcihwcm9taXNlLCBSRUpFQ1RFRCkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgZmFsc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGVuPFIsIFU+KFxuICAgICAgICBvbkZ1bGZpbGxlZD86ICh2YWx1ZTogUikgPT4gVSB8IFByb21pc2VMaWtlPFU+LFxuICAgICAgICBvblJlamVjdGVkPzogKGVycm9yOiBhbnkpID0+IFUgfCBQcm9taXNlTGlrZTxVPik6IFByb21pc2U8Uj4ge1xuICAgICAgY29uc3QgY2hhaW5Qcm9taXNlOiBQcm9taXNlPFI+ID0gbmV3ICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBab25lQXdhcmVQcm9taXNlKShudWxsKTtcbiAgICAgIGNvbnN0IHpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICBpZiAoKHRoaXMgYXMgYW55KVtzeW1ib2xTdGF0ZV0gPT0gVU5SRVNPTFZFRCkge1xuICAgICAgICAoPGFueVtdPih0aGlzIGFzIGFueSlbc3ltYm9sVmFsdWVdKS5wdXNoKHpvbmUsIGNoYWluUHJvbWlzZSwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NoZWR1bGVSZXNvbHZlT3JSZWplY3QodGhpcywgem9uZSwgY2hhaW5Qcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hhaW5Qcm9taXNlO1xuICAgIH1cblxuICAgIGNhdGNoPFU+KG9uUmVqZWN0ZWQ/OiAoZXJyb3I6IGFueSkgPT4gVSB8IFByb21pc2VMaWtlPFU+KTogUHJvbWlzZTxSPiB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfVxuICAvLyBQcm90ZWN0IGFnYWluc3QgYWdncmVzc2l2ZSBvcHRpbWl6ZXJzIGRyb3BwaW5nIHNlZW1pbmdseSB1bnVzZWQgcHJvcGVydGllcy5cbiAgLy8gRS5nLiBDbG9zdXJlIENvbXBpbGVyIGluIGFkdmFuY2VkIG1vZGUuXG4gIFpvbmVBd2FyZVByb21pc2VbJ3Jlc29sdmUnXSA9IFpvbmVBd2FyZVByb21pc2UucmVzb2x2ZTtcbiAgWm9uZUF3YXJlUHJvbWlzZVsncmVqZWN0J10gPSBab25lQXdhcmVQcm9taXNlLnJlamVjdDtcbiAgWm9uZUF3YXJlUHJvbWlzZVsncmFjZSddID0gWm9uZUF3YXJlUHJvbWlzZS5yYWNlO1xuICBab25lQXdhcmVQcm9taXNlWydhbGwnXSA9IFpvbmVBd2FyZVByb21pc2UuYWxsO1xuXG4gIGNvbnN0IE5hdGl2ZVByb21pc2UgPSBnbG9iYWxbc3ltYm9sUHJvbWlzZV0gPSBnbG9iYWxbJ1Byb21pc2UnXTtcbiAgZ2xvYmFsWydQcm9taXNlJ10gPSBab25lQXdhcmVQcm9taXNlO1xuXG4gIGNvbnN0IHN5bWJvbFRoZW5QYXRjaGVkID0gX19zeW1ib2xfXygndGhlblBhdGNoZWQnKTtcblxuICBmdW5jdGlvbiBwYXRjaFRoZW4oQ3RvcjogRnVuY3Rpb24pIHtcbiAgICBjb25zdCBwcm90byA9IEN0b3IucHJvdG90eXBlO1xuICAgIGNvbnN0IG9yaWdpbmFsVGhlbiA9IHByb3RvLnRoZW47XG4gICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgIHByb3RvW3N5bWJvbFRoZW5dID0gb3JpZ2luYWxUaGVuO1xuXG4gICAgLy8gY2hlY2sgQ3Rvci5wcm90b3R5cGUudGhlbiBwcm9wZXJ0eURlc2NyaXRvciBpcyB3cml0YWJsZSBvciBub3RcbiAgICAvLyBpbiBtZXRlb3IgZW52LCB3cml0YWJsZSBpcyBmYWxzZSwgd2UgaGF2ZSB0byBtYWtlIGl0IHRvIGJlIHRydWUuXG4gICAgY29uc3QgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoQ3Rvci5wcm90b3R5cGUsICd0aGVuJyk7XG4gICAgaWYgKHByb3AgJiYgcHJvcC53cml0YWJsZSA9PT0gZmFsc2UgJiYgcHJvcC5jb25maWd1cmFibGUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDdG9yLnByb3RvdHlwZSwgJ3RoZW4nLCB7d3JpdGFibGU6IHRydWV9KTtcbiAgICB9XG5cbiAgICBDdG9yLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25SZXNvbHZlOiBhbnksIG9uUmVqZWN0OiBhbnkpIHtcbiAgICAgIGNvbnN0IHdyYXBwZWQgPSBuZXcgWm9uZUF3YXJlUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG9yaWdpbmFsVGhlbi5jYWxsKHRoaXMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB3cmFwcGVkLnRoZW4ob25SZXNvbHZlLCBvblJlamVjdCk7XG4gICAgfTtcbiAgICAoQ3RvciBhcyBhbnkpW3N5bWJvbFRoZW5QYXRjaGVkXSA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiB6b25laWZ5KGZuOiBGdW5jdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGxldCByZXN1bHRQcm9taXNlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmIChyZXN1bHRQcm9taXNlIGluc3RhbmNlb2YgWm9uZUF3YXJlUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIGxldCBjdG9yID0gcmVzdWx0UHJvbWlzZS5jb25zdHJ1Y3RvcjtcbiAgICAgIGlmICghY3RvcltzeW1ib2xUaGVuUGF0Y2hlZF0pIHtcbiAgICAgICAgcGF0Y2hUaGVuKGN0b3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFByb21pc2U7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChOYXRpdmVQcm9taXNlKSB7XG4gICAgcGF0Y2hUaGVuKE5hdGl2ZVByb21pc2UpO1xuXG4gICAgbGV0IGZldGNoID0gZ2xvYmFsWydmZXRjaCddO1xuICAgIGlmICh0eXBlb2YgZmV0Y2ggPT0gRlVOQ1RJT04pIHtcbiAgICAgIGdsb2JhbFsnZmV0Y2gnXSA9IHpvbmVpZnkoZmV0Y2gpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRoaXMgaXMgbm90IHBhcnQgb2YgcHVibGljIEFQSSwgYnV0IGl0IGlzIHVzZWZ1bCBmb3IgdGVzdHMsIHNvIHdlIGV4cG9zZSBpdC5cbiAgKFByb21pc2UgYXMgYW55KVtab25lLl9fc3ltYm9sX18oJ3VuY2F1Z2h0UHJvbWlzZUVycm9ycycpXSA9IF91bmNhdWdodFByb21pc2VFcnJvcnM7XG4gIHJldHVybiBab25lQXdhcmVQcm9taXNlO1xufSk7XG4iXX0=