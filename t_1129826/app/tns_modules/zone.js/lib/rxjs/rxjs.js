"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/bindCallback");
require("rxjs/add/observable/bindNodeCallback");
require("rxjs/add/observable/defer");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/fromEventPattern");
require("rxjs/add/operator/multicast");
var Observable_1 = require("rxjs/Observable");
var asap_1 = require("rxjs/scheduler/asap");
var Subscriber_1 = require("rxjs/Subscriber");
var Subscription_1 = require("rxjs/Subscription");
var rxSubscriber_1 = require("rxjs/symbol/rxSubscriber");
Zone.__load_patch('rxjs', function (global, Zone, api) {
    var symbol = Zone.__symbol__;
    var subscribeSource = 'rxjs.subscribe';
    var nextSource = 'rxjs.Subscriber.next';
    var errorSource = 'rxjs.Subscriber.error';
    var completeSource = 'rxjs.Subscriber.complete';
    var unsubscribeSource = 'rxjs.Subscriber.unsubscribe';
    var teardownSource = 'rxjs.Subscriber.teardownLogic';
    var empty = {
        closed: true,
        next: function (value) { },
        error: function (err) { throw err; },
        complete: function () { }
    };
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber_1.Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
                return nextOrObserver[rxSubscriber_1.rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new Subscriber_1.Subscriber(empty);
        }
        return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
    }
    var patchObservable = function () {
        var ObservablePrototype = Observable_1.Observable.prototype;
        var symbolSubscribe = symbol('subscribe');
        var _symbolSubscribe = symbol('_subscribe');
        var _subscribe = ObservablePrototype[_symbolSubscribe] = ObservablePrototype._subscribe;
        var subscribe = ObservablePrototype[symbolSubscribe] = ObservablePrototype.subscribe;
        Object.defineProperties(Observable_1.Observable.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneSource: { value: null, writable: true, configurable: true },
            _zoneSubscribe: { value: null, writable: true, configurable: true },
            source: {
                configurable: true,
                get: function () {
                    return this._zoneSource;
                },
                set: function (source) {
                    this._zone = Zone.current;
                    this._zoneSource = source;
                }
            },
            _subscribe: {
                configurable: true,
                get: function () {
                    if (this._zoneSubscribe) {
                        return this._zoneSubscribe;
                    }
                    else if (this.constructor === Observable_1.Observable) {
                        return _subscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._subscribe;
                },
                set: function (subscribe) {
                    this._zone = Zone.current;
                    this._zoneSubscribe = subscribe;
                }
            },
            subscribe: {
                writable: true,
                configurable: true,
                value: function (observerOrNext, error, complete) {
                    // Only grab a zone if we Zone exists and it is different from the current zone.
                    var _zone = this._zone;
                    if (_zone && _zone !== Zone.current) {
                        // Current Zone is different from the intended zone.
                        // Restore the zone before invoking the subscribe callback.
                        return _zone.run(subscribe, this, [toSubscriber(observerOrNext, error, complete)]);
                    }
                    return subscribe.call(this, observerOrNext, error, complete);
                }
            }
        });
    };
    var patchSubscription = function () {
        var unsubscribeSymbol = symbol('unsubscribe');
        var unsubscribe = Subscription_1.Subscription.prototype[unsubscribeSymbol] =
            Subscription_1.Subscription.prototype.unsubscribe;
        Object.defineProperties(Subscription_1.Subscription.prototype, {
            _zone: { value: null, writable: true, configurable: true },
            _zoneUnsubscribe: { value: null, writable: true, configurable: true },
            _unsubscribe: {
                get: function () {
                    if (this._zoneUnsubscribe) {
                        return this._zoneUnsubscribe;
                    }
                    var proto = Object.getPrototypeOf(this);
                    return proto && proto._unsubscribe;
                },
                set: function (unsubscribe) {
                    this._zone = Zone.current;
                    this._zoneUnsubscribe = unsubscribe;
                }
            },
            unsubscribe: {
                writable: true,
                configurable: true,
                value: function () {
                    // Only grab a zone if we Zone exists and it is different from the current zone.
                    var _zone = this._zone;
                    if (_zone && _zone !== Zone.current) {
                        // Current Zone is different from the intended zone.
                        // Restore the zone before invoking the subscribe callback.
                        _zone.run(unsubscribe, this);
                    }
                    else {
                        unsubscribe.apply(this);
                    }
                }
            }
        });
    };
    var patchSubscriber = function () {
        var next = Subscriber_1.Subscriber.prototype.next;
        var error = Subscriber_1.Subscriber.prototype.error;
        var complete = Subscriber_1.Subscriber.prototype.complete;
        Object.defineProperty(Subscriber_1.Subscriber.prototype, 'destination', {
            configurable: true,
            get: function () {
                return this._zoneDestination;
            },
            set: function (destination) {
                this._zone = Zone.current;
                this._zoneDestination = destination;
            }
        });
        // patch Subscriber.next to make sure it run
        // into SubscriptionZone
        Subscriber_1.Subscriber.prototype.next = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(next, this, arguments, nextSource);
            }
            else {
                return next.apply(this, arguments);
            }
        };
        Subscriber_1.Subscriber.prototype.error = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(error, this, arguments, errorSource);
            }
            else {
                return error.apply(this, arguments);
            }
        };
        Subscriber_1.Subscriber.prototype.complete = function () {
            var currentZone = Zone.current;
            var subscriptionZone = this._zone;
            // for performance concern, check Zone.current
            // equal with this._zone(SubscriptionZone) or not
            if (subscriptionZone && subscriptionZone !== currentZone) {
                return subscriptionZone.run(complete, this, arguments, completeSource);
            }
            else {
                return complete.apply(this, arguments);
            }
        };
    };
    var patchObservableInstance = function (observable) {
        observable._zone = Zone.current;
    };
    var patchObservableFactoryCreator = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factoryCreator = obj[symbolFactory] = obj[factoryName];
        if (!factoryCreator) {
            return;
        }
        obj[factoryName] = function () {
            var factory = factoryCreator.apply(this, arguments);
            return function () {
                var observable = factory.apply(this, arguments);
                patchObservableInstance(observable);
                return observable;
            };
        };
    };
    var patchObservableFactory = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var observable = factory.apply(this, arguments);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchObservableFactoryArgs = function (obj, factoryName) {
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var initZone = Zone.current;
            var args = Array.prototype.slice.call(arguments);
            var _loop_1 = function (i) {
                var arg = args[i];
                if (typeof arg === 'function') {
                    args[i] = function () {
                        var argArgs = Array.prototype.slice.call(arguments);
                        var runningZone = Zone.current;
                        if (initZone && runningZone && initZone !== runningZone) {
                            return initZone.run(arg, this, argArgs);
                        }
                        else {
                            return arg.apply(this, argArgs);
                        }
                    };
                }
            };
            for (var i = 0; i < args.length; i++) {
                _loop_1(i);
            }
            var observable = factory.apply(this, args);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchMulticast = function () {
        var obj = Observable_1.Observable.prototype;
        var factoryName = 'multicast';
        var symbolFactory = symbol(factoryName);
        if (obj[symbolFactory]) {
            return;
        }
        var factory = obj[symbolFactory] = obj[factoryName];
        if (!factory) {
            return;
        }
        obj[factoryName] = function () {
            var _zone = Zone.current;
            var args = Array.prototype.slice.call(arguments);
            var subjectOrSubjectFactory = args.length > 0 ? args[0] : undefined;
            if (typeof subjectOrSubjectFactory !== 'function') {
                var originalFactory_1 = subjectOrSubjectFactory;
                subjectOrSubjectFactory = function () {
                    return originalFactory_1;
                };
            }
            args[0] = function () {
                var subject;
                if (_zone && _zone !== Zone.current) {
                    subject = _zone.run(subjectOrSubjectFactory, this, arguments);
                }
                else {
                    subject = subjectOrSubjectFactory.apply(this, arguments);
                }
                if (subject && _zone) {
                    subject._zone = _zone;
                }
                return subject;
            };
            var observable = factory.apply(this, args);
            patchObservableInstance(observable);
            return observable;
        };
    };
    var patchImmediate = function (asap) {
        if (!asap) {
            return;
        }
        var scheduleSymbol = symbol('scheduleSymbol');
        var flushSymbol = symbol('flushSymbol');
        var zoneSymbol = symbol('zone');
        if (asap[scheduleSymbol]) {
            return;
        }
        var schedule = asap[scheduleSymbol] = asap.schedule;
        asap.schedule = function () {
            var args = Array.prototype.slice.call(arguments);
            var work = args.length > 0 ? args[0] : undefined;
            var delay = args.length > 1 ? args[1] : 0;
            var state = (args.length > 2 ? args[2] : undefined) || {};
            state[zoneSymbol] = Zone.current;
            var patchedWork = function () {
                var workArgs = Array.prototype.slice.call(arguments);
                var action = workArgs.length > 0 ? workArgs[0] : undefined;
                var scheduleZone = action && action[zoneSymbol];
                if (scheduleZone && scheduleZone !== Zone.current) {
                    return scheduleZone.runGuarded(work, this, arguments);
                }
                else {
                    return work.apply(this, arguments);
                }
            };
            return schedule.apply(this, [patchedWork, delay, state]);
        };
    };
    patchObservable();
    patchSubscription();
    patchSubscriber();
    patchObservableFactoryCreator(Observable_1.Observable, 'bindCallback');
    patchObservableFactoryCreator(Observable_1.Observable, 'bindNodeCallback');
    patchObservableFactory(Observable_1.Observable, 'defer');
    patchObservableFactory(Observable_1.Observable, 'forkJoin');
    patchObservableFactoryArgs(Observable_1.Observable, 'fromEventPattern');
    patchMulticast();
    patchImmediate(asap_1.asap);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJ4anMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCw0Q0FBMEM7QUFDMUMsZ0RBQThDO0FBQzlDLHFDQUFtQztBQUNuQyx3Q0FBc0M7QUFDdEMsZ0RBQThDO0FBQzlDLHVDQUFxQztBQUVyQyw4Q0FBMkM7QUFDM0MsNENBQXlDO0FBQ3pDLDhDQUEyQztBQUMzQyxrREFBK0M7QUFDL0MseURBQXNEO0FBRXJELElBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFRO0lBQ3ZFLElBQU0sTUFBTSxHQUFzQyxJQUFZLENBQUMsVUFBVSxDQUFDO0lBQzFFLElBQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDO0lBQ3pDLElBQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDO0lBQzFDLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0lBQzVDLElBQU0sY0FBYyxHQUFHLDBCQUEwQixDQUFDO0lBQ2xELElBQU0saUJBQWlCLEdBQUcsNkJBQTZCLENBQUM7SUFDeEQsSUFBTSxjQUFjLEdBQUcsK0JBQStCLENBQUM7SUFFdkQsSUFBTSxLQUFLLEdBQUc7UUFDWixNQUFNLEVBQUUsSUFBSTtRQUNaLElBQUksRUFBSixVQUFLLEtBQVUsSUFBUSxDQUFDO1FBQ3hCLEtBQUssRUFBTCxVQUFNLEdBQVEsSUFBUSxNQUFNLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDakMsUUFBUSxFQUFSLGNBQWlCLENBQUM7S0FDbkIsQ0FBQztJQUVGLHNCQUNJLGNBQW9CLEVBQUUsS0FBNEIsRUFBRSxRQUFxQjtRQUMzRSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLGNBQWMsWUFBWSx1QkFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFpQixjQUFlLENBQUM7WUFDekMsQ0FBQztZ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LEdBQUcsU0FBUyxDQUFDO2dCQUM3RCxJQUFNLFlBQVksR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRCxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDckMsQ0FBQztZQUNILENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixlQUFlLEVBQUUsQ0FBQztJQUNsQixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLDZCQUE2QixDQUFDLHVCQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDMUQsNkJBQTZCLENBQUMsdUJBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlELHNCQUFzQixDQUFDLHVCQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsc0JBQXNCLENBQUMsdUJBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvQywwQkFBMEIsQ0FBQyx1QkFBVSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDM0QsY0FBYyxFQUFFLENBQUM7SUFDakIsY0FBYyxDQUFDLFdBQUksQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvYmluZENhbGxiYWNrJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9iaW5kTm9kZUNhbGxiYWNrJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9kZWZlcic7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZm9ya0pvaW4nO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudFBhdHRlcm4nO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tdWx0aWNhc3QnO1xuXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge2FzYXB9IGZyb20gJ3J4anMvc2NoZWR1bGVyL2FzYXAnO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICdyeGpzL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7cnhTdWJzY3JpYmVyfSBmcm9tICdyeGpzL3N5bWJvbC9yeFN1YnNjcmliZXInO1xuXG4oWm9uZSBhcyBhbnkpLl9fbG9hZF9wYXRjaCgncnhqcycsIChnbG9iYWw6IGFueSwgWm9uZTogWm9uZVR5cGUsIGFwaTogYW55KSA9PiB7XG4gIGNvbnN0IHN5bWJvbDogKHN5bWJvbFN0cmluZzogc3RyaW5nKSA9PiBzdHJpbmcgPSAoWm9uZSBhcyBhbnkpLl9fc3ltYm9sX187XG4gIGNvbnN0IHN1YnNjcmliZVNvdXJjZSA9ICdyeGpzLnN1YnNjcmliZSc7XG4gIGNvbnN0IG5leHRTb3VyY2UgPSAncnhqcy5TdWJzY3JpYmVyLm5leHQnO1xuICBjb25zdCBlcnJvclNvdXJjZSA9ICdyeGpzLlN1YnNjcmliZXIuZXJyb3InO1xuICBjb25zdCBjb21wbGV0ZVNvdXJjZSA9ICdyeGpzLlN1YnNjcmliZXIuY29tcGxldGUnO1xuICBjb25zdCB1bnN1YnNjcmliZVNvdXJjZSA9ICdyeGpzLlN1YnNjcmliZXIudW5zdWJzY3JpYmUnO1xuICBjb25zdCB0ZWFyZG93blNvdXJjZSA9ICdyeGpzLlN1YnNjcmliZXIudGVhcmRvd25Mb2dpYyc7XG5cbiAgY29uc3QgZW1wdHkgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQodmFsdWU6IGFueSk6IHZvaWR7fSxcbiAgICBlcnJvcihlcnI6IGFueSk6IHZvaWR7dGhyb3cgZXJyO30sXG4gICAgY29tcGxldGUoKTogdm9pZHt9XG4gIH07XG5cbiAgZnVuY3Rpb24gdG9TdWJzY3JpYmVyPFQ+KFxuICAgICAgbmV4dE9yT2JzZXJ2ZXI/OiBhbnksIGVycm9yPzogKGVycm9yOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IFN1YnNjcmliZXI8VD4ge1xuICAgIGlmIChuZXh0T3JPYnNlcnZlcikge1xuICAgICAgaWYgKG5leHRPck9ic2VydmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gKDxTdWJzY3JpYmVyPFQ+Pm5leHRPck9ic2VydmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl0pIHtcbiAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW5leHRPck9ic2VydmVyICYmICFlcnJvciAmJiAhY29tcGxldGUpIHtcbiAgICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcihlbXB0eSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpO1xuICB9XG5cbiAgY29uc3QgcGF0Y2hPYnNlcnZhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgT2JzZXJ2YWJsZVByb3RvdHlwZTogYW55ID0gT2JzZXJ2YWJsZS5wcm90b3R5cGU7XG4gICAgY29uc3Qgc3ltYm9sU3Vic2NyaWJlID0gc3ltYm9sKCdzdWJzY3JpYmUnKTtcbiAgICBjb25zdCBfc3ltYm9sU3Vic2NyaWJlID0gc3ltYm9sKCdfc3Vic2NyaWJlJyk7XG4gICAgY29uc3QgX3N1YnNjcmliZSA9IE9ic2VydmFibGVQcm90b3R5cGVbX3N5bWJvbFN1YnNjcmliZV0gPSBPYnNlcnZhYmxlUHJvdG90eXBlLl9zdWJzY3JpYmU7XG4gICAgY29uc3Qgc3Vic2NyaWJlID0gT2JzZXJ2YWJsZVByb3RvdHlwZVtzeW1ib2xTdWJzY3JpYmVdID0gT2JzZXJ2YWJsZVByb3RvdHlwZS5zdWJzY3JpYmU7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPYnNlcnZhYmxlLnByb3RvdHlwZSwge1xuICAgICAgX3pvbmU6IHt2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgICBfem9uZVNvdXJjZToge3ZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSxcbiAgICAgIF96b25lU3Vic2NyaWJlOiB7dmFsdWU6IG51bGwsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbih0aGlzOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMgYXMgYW55KS5fem9uZVNvdXJjZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih0aGlzOiBPYnNlcnZhYmxlPGFueT4sIHNvdXJjZTogYW55KSB7XG4gICAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lU291cmNlID0gc291cmNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX3N1YnNjcmliZToge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24odGhpczogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgICAgICAgaWYgKCh0aGlzIGFzIGFueSkuX3pvbmVTdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBhbnkpLl96b25lU3Vic2NyaWJlO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gT2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdWJzY3JpYmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xuICAgICAgICAgIHJldHVybiBwcm90byAmJiBwcm90by5fc3Vic2NyaWJlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHRoaXM6IE9ic2VydmFibGU8YW55Piwgc3Vic2NyaWJlOiBhbnkpIHtcbiAgICAgICAgICAodGhpcyBhcyBhbnkpLl96b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmVTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdWJzY3JpYmU6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKHRoaXM6IE9ic2VydmFibGU8YW55Piwgb2JzZXJ2ZXJPck5leHQ6IGFueSwgZXJyb3I6IGFueSwgY29tcGxldGU6IGFueSkge1xuICAgICAgICAgIC8vIE9ubHkgZ3JhYiBhIHpvbmUgaWYgd2UgWm9uZSBleGlzdHMgYW5kIGl0IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IHpvbmUuXG4gICAgICAgICAgY29uc3QgX3pvbmUgPSAodGhpcyBhcyBhbnkpLl96b25lO1xuICAgICAgICAgIGlmIChfem9uZSAmJiBfem9uZSAhPT0gWm9uZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBDdXJyZW50IFpvbmUgaXMgZGlmZmVyZW50IGZyb20gdGhlIGludGVuZGVkIHpvbmUuXG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSB6b25lIGJlZm9yZSBpbnZva2luZyB0aGUgc3Vic2NyaWJlIGNhbGxiYWNrLlxuICAgICAgICAgICAgcmV0dXJuIF96b25lLnJ1bihzdWJzY3JpYmUsIHRoaXMsIFt0b1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN1YnNjcmliZS5jYWxsKHRoaXMsIG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcGF0Y2hTdWJzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCB1bnN1YnNjcmliZVN5bWJvbCA9IHN5bWJvbCgndW5zdWJzY3JpYmUnKTtcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IChTdWJzY3JpcHRpb24ucHJvdG90eXBlIGFzIGFueSlbdW5zdWJzY3JpYmVTeW1ib2xdID1cbiAgICAgICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhTdWJzY3JpcHRpb24ucHJvdG90eXBlLCB7XG4gICAgICBfem9uZToge3ZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSxcbiAgICAgIF96b25lVW5zdWJzY3JpYmU6IHt2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgICBfdW5zdWJzY3JpYmU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbih0aGlzOiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICBpZiAoKHRoaXMgYXMgYW55KS5fem9uZVVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMgYXMgYW55KS5fem9uZVVuc3Vic2NyaWJlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcbiAgICAgICAgICByZXR1cm4gcHJvdG8gJiYgcHJvdG8uX3Vuc3Vic2NyaWJlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHRoaXM6IFN1YnNjcmlwdGlvbiwgdW5zdWJzY3JpYmU6IGFueSkge1xuICAgICAgICAgICh0aGlzIGFzIGFueSkuX3pvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZVVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1bnN1YnNjcmliZToge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24odGhpczogU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgLy8gT25seSBncmFiIGEgem9uZSBpZiB3ZSBab25lIGV4aXN0cyBhbmQgaXQgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgem9uZS5cbiAgICAgICAgICBjb25zdCBfem9uZTogWm9uZSA9ICh0aGlzIGFzIGFueSkuX3pvbmU7XG4gICAgICAgICAgaWYgKF96b25lICYmIF96b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIEN1cnJlbnQgWm9uZSBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgaW50ZW5kZWQgem9uZS5cbiAgICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIHpvbmUgYmVmb3JlIGludm9raW5nIHRoZSBzdWJzY3JpYmUgY2FsbGJhY2suXG4gICAgICAgICAgICBfem9uZS5ydW4odW5zdWJzY3JpYmUsIHRoaXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZS5hcHBseSh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwYXRjaFN1YnNjcmliZXIgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBuZXh0ID0gU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dDtcbiAgICBjb25zdCBlcnJvciA9IFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yO1xuICAgIGNvbnN0IGNvbXBsZXRlID0gU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGU7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3Vic2NyaWJlci5wcm90b3R5cGUsICdkZXN0aW5hdGlvbicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24odGhpczogU3Vic2NyaWJlcjxhbnk+KSB7XG4gICAgICAgIHJldHVybiAodGhpcyBhcyBhbnkpLl96b25lRGVzdGluYXRpb247XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih0aGlzOiBTdWJzY3JpYmVyPGFueT4sIGRlc3RpbmF0aW9uOiBhbnkpIHtcbiAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgKHRoaXMgYXMgYW55KS5fem9uZURlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBwYXRjaCBTdWJzY3JpYmVyLm5leHQgdG8gbWFrZSBzdXJlIGl0IHJ1blxuICAgIC8vIGludG8gU3Vic2NyaXB0aW9uWm9uZVxuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRab25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uWm9uZSA9IHRoaXMuX3pvbmU7XG5cbiAgICAgIC8vIGZvciBwZXJmb3JtYW5jZSBjb25jZXJuLCBjaGVjayBab25lLmN1cnJlbnRcbiAgICAgIC8vIGVxdWFsIHdpdGggdGhpcy5fem9uZShTdWJzY3JpcHRpb25ab25lKSBvciBub3RcbiAgICAgIGlmIChzdWJzY3JpcHRpb25ab25lICYmIHN1YnNjcmlwdGlvblpvbmUgIT09IGN1cnJlbnRab25lKSB7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25ab25lLnJ1bihuZXh0LCB0aGlzLCBhcmd1bWVudHMsIG5leHRTb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5leHQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRab25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uWm9uZSA9IHRoaXMuX3pvbmU7XG5cbiAgICAgIC8vIGZvciBwZXJmb3JtYW5jZSBjb25jZXJuLCBjaGVjayBab25lLmN1cnJlbnRcbiAgICAgIC8vIGVxdWFsIHdpdGggdGhpcy5fem9uZShTdWJzY3JpcHRpb25ab25lKSBvciBub3RcbiAgICAgIGlmIChzdWJzY3JpcHRpb25ab25lICYmIHN1YnNjcmlwdGlvblpvbmUgIT09IGN1cnJlbnRab25lKSB7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25ab25lLnJ1bihlcnJvciwgdGhpcywgYXJndW1lbnRzLCBlcnJvclNvdXJjZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZXJyb3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRab25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uWm9uZSA9IHRoaXMuX3pvbmU7XG5cbiAgICAgIC8vIGZvciBwZXJmb3JtYW5jZSBjb25jZXJuLCBjaGVjayBab25lLmN1cnJlbnRcbiAgICAgIC8vIGVxdWFsIHdpdGggdGhpcy5fem9uZShTdWJzY3JpcHRpb25ab25lKSBvciBub3RcbiAgICAgIGlmIChzdWJzY3JpcHRpb25ab25lICYmIHN1YnNjcmlwdGlvblpvbmUgIT09IGN1cnJlbnRab25lKSB7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25ab25lLnJ1bihjb21wbGV0ZSwgdGhpcywgYXJndW1lbnRzLCBjb21wbGV0ZVNvdXJjZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGxldGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHBhdGNoT2JzZXJ2YWJsZUluc3RhbmNlID0gZnVuY3Rpb24ob2JzZXJ2YWJsZTogYW55KSB7XG4gICAgb2JzZXJ2YWJsZS5fem9uZSA9IFpvbmUuY3VycmVudDtcbiAgfTtcblxuICBjb25zdCBwYXRjaE9ic2VydmFibGVGYWN0b3J5Q3JlYXRvciA9IGZ1bmN0aW9uKG9iajogYW55LCBmYWN0b3J5TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc3ltYm9sRmFjdG9yeTogc3RyaW5nID0gc3ltYm9sKGZhY3RvcnlOYW1lKTtcbiAgICBpZiAob2JqW3N5bWJvbEZhY3RvcnldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZhY3RvcnlDcmVhdG9yOiBhbnkgPSBvYmpbc3ltYm9sRmFjdG9yeV0gPSBvYmpbZmFjdG9yeU5hbWVdO1xuICAgIGlmICghZmFjdG9yeUNyZWF0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2JqW2ZhY3RvcnlOYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgZmFjdG9yeTogYW55ID0gZmFjdG9yeUNyZWF0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IGZhY3RvcnkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcGF0Y2hPYnNlcnZhYmxlSW5zdGFuY2Uob2JzZXJ2YWJsZSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHBhdGNoT2JzZXJ2YWJsZUZhY3RvcnkgPSBmdW5jdGlvbihvYmo6IGFueSwgZmFjdG9yeU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHN5bWJvbEZhY3Rvcnk6IHN0cmluZyA9IHN5bWJvbChmYWN0b3J5TmFtZSk7XG4gICAgaWYgKG9ialtzeW1ib2xGYWN0b3J5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5OiBhbnkgPSBvYmpbc3ltYm9sRmFjdG9yeV0gPSBvYmpbZmFjdG9yeU5hbWVdO1xuICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvYmpbZmFjdG9yeU5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBvYnNlcnZhYmxlID0gZmFjdG9yeS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcGF0Y2hPYnNlcnZhYmxlSW5zdGFuY2Uob2JzZXJ2YWJsZSk7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHBhdGNoT2JzZXJ2YWJsZUZhY3RvcnlBcmdzID0gZnVuY3Rpb24ob2JqOiBhbnksIGZhY3RvcnlOYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzeW1ib2xGYWN0b3J5OiBzdHJpbmcgPSBzeW1ib2woZmFjdG9yeU5hbWUpO1xuICAgIGlmIChvYmpbc3ltYm9sRmFjdG9yeV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmFjdG9yeTogYW55ID0gb2JqW3N5bWJvbEZhY3RvcnldID0gb2JqW2ZhY3RvcnlOYW1lXTtcbiAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2JqW2ZhY3RvcnlOYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgaW5pdFpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBhcmcgPSBhcmdzW2ldO1xuICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ0FyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgY29uc3QgcnVubmluZ1pvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoaW5pdFpvbmUgJiYgcnVubmluZ1pvbmUgJiYgaW5pdFpvbmUgIT09IHJ1bm5pbmdab25lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpbml0Wm9uZS5ydW4oYXJnLCB0aGlzLCBhcmdBcmdzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBhcmcuYXBwbHkodGhpcywgYXJnQXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvYnNlcnZhYmxlID0gZmFjdG9yeS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHBhdGNoT2JzZXJ2YWJsZUluc3RhbmNlKG9ic2VydmFibGUpO1xuICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBwYXRjaE11bHRpY2FzdCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG9iajogYW55ID0gT2JzZXJ2YWJsZS5wcm90b3R5cGU7XG4gICAgY29uc3QgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdtdWx0aWNhc3QnO1xuICAgIGNvbnN0IHN5bWJvbEZhY3Rvcnk6IHN0cmluZyA9IHN5bWJvbChmYWN0b3J5TmFtZSk7XG4gICAgaWYgKG9ialtzeW1ib2xGYWN0b3J5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5OiBhbnkgPSBvYmpbc3ltYm9sRmFjdG9yeV0gPSBvYmpbZmFjdG9yeU5hbWVdO1xuICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvYmpbZmFjdG9yeU5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBfem9uZTogYW55ID0gWm9uZS5jdXJyZW50O1xuICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBsZXQgc3ViamVjdE9yU3ViamVjdEZhY3Rvcnk6IGFueSA9IGFyZ3MubGVuZ3RoID4gMCA/IGFyZ3NbMF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZW9mIHN1YmplY3RPclN1YmplY3RGYWN0b3J5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRmFjdG9yeTogYW55ID0gc3ViamVjdE9yU3ViamVjdEZhY3Rvcnk7XG4gICAgICAgIHN1YmplY3RPclN1YmplY3RGYWN0b3J5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRmFjdG9yeTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGFyZ3NbMF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHN1YmplY3Q6IGFueTtcbiAgICAgICAgaWYgKF96b25lICYmIF96b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgICAgICBzdWJqZWN0ID0gX3pvbmUucnVuKHN1YmplY3RPclN1YmplY3RGYWN0b3J5LCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1YmplY3QgPSBzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWJqZWN0ICYmIF96b25lKSB7XG4gICAgICAgICAgc3ViamVjdC5fem9uZSA9IF96b25lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgICAgfTtcbiAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBmYWN0b3J5LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgcGF0Y2hPYnNlcnZhYmxlSW5zdGFuY2Uob2JzZXJ2YWJsZSk7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHBhdGNoSW1tZWRpYXRlID0gZnVuY3Rpb24oYXNhcDogYW55KSB7XG4gICAgaWYgKCFhc2FwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZWR1bGVTeW1ib2wgPSBzeW1ib2woJ3NjaGVkdWxlU3ltYm9sJyk7XG4gICAgY29uc3QgZmx1c2hTeW1ib2wgPSBzeW1ib2woJ2ZsdXNoU3ltYm9sJyk7XG4gICAgY29uc3Qgem9uZVN5bWJvbCA9IHN5bWJvbCgnem9uZScpO1xuICAgIGlmIChhc2FwW3NjaGVkdWxlU3ltYm9sXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVkdWxlID0gYXNhcFtzY2hlZHVsZVN5bWJvbF0gPSBhc2FwLnNjaGVkdWxlO1xuICAgIGFzYXAuc2NoZWR1bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgY29uc3Qgd29yayA9IGFyZ3MubGVuZ3RoID4gMCA/IGFyZ3NbMF0gOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBkZWxheSA9IGFyZ3MubGVuZ3RoID4gMSA/IGFyZ3NbMV0gOiAwO1xuICAgICAgY29uc3Qgc3RhdGUgPSAoYXJncy5sZW5ndGggPiAyID8gYXJnc1syXSA6IHVuZGVmaW5lZCkgfHwge307XG4gICAgICBzdGF0ZVt6b25lU3ltYm9sXSA9IFpvbmUuY3VycmVudDtcblxuICAgICAgY29uc3QgcGF0Y2hlZFdvcmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgd29ya0FyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBjb25zdCBhY3Rpb24gPSB3b3JrQXJncy5sZW5ndGggPiAwID8gd29ya0FyZ3NbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHNjaGVkdWxlWm9uZSA9IGFjdGlvbiAmJiBhY3Rpb25bem9uZVN5bWJvbF07XG4gICAgICAgIGlmIChzY2hlZHVsZVpvbmUgJiYgc2NoZWR1bGVab25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gc2NoZWR1bGVab25lLnJ1bkd1YXJkZWQod29yaywgdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gd29yay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHNjaGVkdWxlLmFwcGx5KHRoaXMsIFtwYXRjaGVkV29yaywgZGVsYXksIHN0YXRlXSk7XG4gICAgfTtcbiAgfTtcblxuICBwYXRjaE9ic2VydmFibGUoKTtcbiAgcGF0Y2hTdWJzY3JpcHRpb24oKTtcbiAgcGF0Y2hTdWJzY3JpYmVyKCk7XG4gIHBhdGNoT2JzZXJ2YWJsZUZhY3RvcnlDcmVhdG9yKE9ic2VydmFibGUsICdiaW5kQ2FsbGJhY2snKTtcbiAgcGF0Y2hPYnNlcnZhYmxlRmFjdG9yeUNyZWF0b3IoT2JzZXJ2YWJsZSwgJ2JpbmROb2RlQ2FsbGJhY2snKTtcbiAgcGF0Y2hPYnNlcnZhYmxlRmFjdG9yeShPYnNlcnZhYmxlLCAnZGVmZXInKTtcbiAgcGF0Y2hPYnNlcnZhYmxlRmFjdG9yeShPYnNlcnZhYmxlLCAnZm9ya0pvaW4nKTtcbiAgcGF0Y2hPYnNlcnZhYmxlRmFjdG9yeUFyZ3MoT2JzZXJ2YWJsZSwgJ2Zyb21FdmVudFBhdHRlcm4nKTtcbiAgcGF0Y2hNdWx0aWNhc3QoKTtcbiAgcGF0Y2hJbW1lZGlhdGUoYXNhcCk7XG59KTsiXX0=