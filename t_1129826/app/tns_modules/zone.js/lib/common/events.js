"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var utils_1 = require("./utils");
exports.TRUE_STR = 'true';
exports.FALSE_STR = 'false';
// an identifier to tell ZoneTask do not create a new invoke closure
exports.OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    isUsingGlobalCallback: true
};
exports.zoneSymbolEventNames = {};
exports.globalSources = {};
exports.CONSTRUCTOR_NAME = 'name';
exports.FUNCTION_TYPE = 'function';
exports.OBJECT_TYPE = 'object';
exports.ZONE_SYMBOL_PREFIX = '__zone_symbol__';
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.addEventListenerFnName) || 'addEventListener';
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.removeEventListenerFnName) || 'removeEventListener';
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listenersFnName) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.removeAllFnName) || 'removeAllListeners';
    var zoneSymbolAddEventListener = utils_1.zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === exports.OBJECT_TYPE && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].apply(target, [event.type, delegate_1, options]);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        var target = this || _global;
        var tasks = target[exports.zoneSymbolEventNames[event.type][exports.FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        var target = this || _global;
        var tasks = target[exports.zoneSymbolEventNames[event.type][exports.TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useGlobalCallback !== undefined) {
            useGlobalCallback = patchOptions.useGlobalCallback;
        }
        var validateHandler = patchOptions && patchOptions.validateHandler;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.checkDuplicate !== undefined) {
            checkDuplicate = patchOptions.checkDuplicate;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.returnTarget !== undefined) {
            returnTarget = patchOptions.returnTarget;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = Object.getPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[utils_1.zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[utils_1.zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[utils_1.zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prependEventListenerFnName) {
            nativePrependEventListener = proto[utils_1.zoneSymbol(patchOptions.prependEventListenerFnName)] =
                proto[patchOptions.prependEventListenerFnName];
        }
        var customScheduleGlobal = function (task) {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            return nativeAddEventListener.apply(taskData.target, [
                taskData.eventName,
                taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback,
                taskData.options
            ]);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = exports.zoneSymbolEventNames[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? exports.TRUE_STR : exports.FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.apply(task.target, [
                task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback,
                task.options
            ]);
        };
        var customScheduleNonGlobal = function (task) {
            return nativeAddEventListener.apply(taskData.target, [taskData.eventName, task.invoke, taskData.options]);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.apply(taskData.target, [taskData.eventName, task.invoke, taskData.options]);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.apply(task.target, [task.eventName, task.invoke, task.options]);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            if ((typeOfDelegate === exports.FUNCTION_TYPE && task.callback === delegate) ||
                (typeOfDelegate === exports.OBJECT_TYPE && task.originalDelegate === delegate)) {
                // same callback, same capture, same event name, just return
                return true;
            }
            return false;
        };
        var compare = (patchOptions && patchOptions.compareTaskCallbackVsDelegate) ?
            patchOptions.compareTaskCallbackVsDelegate :
            compareTaskCallbackVsDelegate;
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var targetZone = Zone.current;
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== exports.FUNCTION_TYPE) {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var eventName = arguments[0];
                var options = arguments[2];
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = exports.zoneSymbolEventNames[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = eventName + exports.FALSE_STR;
                    var trueEventName = eventName + exports.TRUE_STR;
                    var symbol = exports.ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = exports.ZONE_SYMBOL_PREFIX + trueEventName;
                    exports.zoneSymbolEventNames[eventName] = {};
                    exports.zoneSymbolEventNames[eventName][exports.FALSE_STR] = symbol;
                    exports.zoneSymbolEventNames[eventName][exports.TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? exports.TRUE_STR : exports.FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor[exports.CONSTRUCTOR_NAME];
                var targetSource = exports.globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource + eventName;
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? exports.OPTIMIZED_ZONE_EVENT_TASK_DATA : null;
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                task.options = options;
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = exports.zoneSymbolEventNames[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? exports.TRUE_STR : exports.FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    var typeOfDelegate = typeof delegate;
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        return;
                    }
                }
            }
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].apply(this, [evtName]);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].apply(this, ['removeListener']);
            }
            else {
                var symbolEventNames = exports.zoneSymbolEventNames[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[exports.FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[exports.TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].apply(this, [eventName, delegate, task.options]);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].apply(this, [eventName, delegate, task.options]);
                        }
                    }
                }
            }
        };
        // for native toString patch
        utils_1.attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        utils_1.attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            utils_1.attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            utils_1.attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
exports.patchEventTarget = patchEventTarget;
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
exports.findEventTasks = findEventTasks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0g7OztHQUdHO0FBQ0gsaUNBQTBEO0FBRTdDLFFBQUEsUUFBUSxHQUFHLE1BQU0sQ0FBQztBQUNsQixRQUFBLFNBQVMsR0FBRyxPQUFPLENBQUM7QUFJakMsb0VBQW9FO0FBQ3ZELFFBQUEsOEJBQThCLEdBQWtCO0lBQzNELHFCQUFxQixFQUFFLElBQUk7Q0FDNUIsQ0FBQztBQUVXLFFBQUEsb0JBQW9CLEdBQVEsRUFBRSxDQUFDO0FBQy9CLFFBQUEsYUFBYSxHQUFRLEVBQUUsQ0FBQztBQUV4QixRQUFBLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztBQUUxQixRQUFBLGFBQWEsR0FBRyxVQUFVLENBQUM7QUFDM0IsUUFBQSxXQUFXLEdBQUcsUUFBUSxDQUFDO0FBRXZCLFFBQUEsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7QUFFcEQsSUFBTSxzQkFBc0IsR0FBRyxvQ0FBb0MsQ0FBQztBQWVwRSwwQkFDSSxPQUFZLEVBQUUsSUFBVyxFQUFFLFlBQXNDO0lBQ25FLElBQU0sa0JBQWtCLEdBQ3BCLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLGtCQUFrQixDQUFDO0lBQ2hGLElBQU0scUJBQXFCLEdBQ3ZCLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLHFCQUFxQixDQUFDO0lBRXRGLElBQU0sd0JBQXdCLEdBQzFCLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztJQUN2RSxJQUFNLG1DQUFtQyxHQUNyQyxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksb0JBQW9CLENBQUM7SUFFM0UsSUFBTSwwQkFBMEIsR0FBRyxrQkFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFbEUsSUFBTSx5QkFBeUIsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0lBRWpFLElBQU0sc0JBQXNCLEdBQUcsaUJBQWlCLENBQUM7SUFDakQsSUFBTSw2QkFBNkIsR0FBRyxHQUFHLEdBQUcsc0JBQXNCLEdBQUcsR0FBRyxDQUFDO0lBRXpFLElBQU0sVUFBVSxHQUFHLFVBQVMsSUFBUyxFQUFFLE1BQVcsRUFBRSxLQUFZO1FBQzlELHVEQUF1RDtRQUN2RCx5QkFBeUI7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssbUJBQVcsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM1RCxxREFBcUQ7WUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFDLEtBQVksSUFBSyxPQUFBLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNELGtFQUFrRTtZQUNsRSw0RUFBNEU7WUFDNUUsMkJBQTJCO1lBQzNCLElBQU0sVUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvRSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsb0ZBQW9GO0lBQ3BGLElBQU0sdUJBQXVCLEdBQUcsVUFBUyxLQUFZO1FBQ25ELElBQU0sTUFBTSxHQUFHLElBQUksSUFBSSxPQUFPLENBQUM7UUFFL0IsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLDRCQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBUyxDQUFDLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsOEZBQThGO1lBQzlGLDZEQUE2RDtZQUM3RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixnREFBZ0Q7Z0JBQ2hELCtDQUErQztnQkFDL0Msb0RBQW9EO2dCQUNwRCxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUMxQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsbUZBQW1GO0lBQ25GLElBQU0sOEJBQThCLEdBQUcsVUFBUyxLQUFZO1FBQzFELElBQU0sTUFBTSxHQUFHLElBQUksSUFBSSxPQUFPLENBQUM7UUFFL0IsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLDRCQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQztRQUNqRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsOEZBQThGO1lBQzlGLDZEQUE2RDtZQUM3RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixnREFBZ0Q7Z0JBQ2hELCtDQUErQztnQkFDL0Msb0RBQW9EO2dCQUNwRCxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUMxQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsaUNBQWlDLEdBQVEsRUFBRSxZQUFzQztRQUMvRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsaUJBQWlCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqRSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUM7UUFDckQsQ0FBQztRQUNELElBQU0sZUFBZSxHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDO1FBRXJFLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzlELGNBQWMsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDO1FBQy9DLENBQUM7UUFFRCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1RCxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUMzQyxDQUFDO1FBRUQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7WUFDMUQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QywyRkFBMkY7WUFDM0YsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNkLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELDhEQUE4RDtRQUM5RCxtRUFBbUU7UUFDbkUsSUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO1FBRXpCLElBQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0YsSUFBTSx5QkFBeUIsR0FBRyxLQUFLLENBQUMsa0JBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3RFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRWpDLElBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxrQkFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDL0QsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDcEMsSUFBTSx3QkFBd0IsR0FBRyxLQUFLLENBQUMsa0JBQVUsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ25GLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksMEJBQStCLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7WUFDNUQsMEJBQTBCLEdBQUcsS0FBSyxDQUFDLGtCQUFVLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ25GLEtBQUssQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQsSUFBTSxvQkFBb0IsR0FBRyxVQUFTLElBQVU7WUFDOUMsMERBQTBEO1lBQzFELHVFQUF1RTtZQUN2RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDbkQsUUFBUSxDQUFDLFNBQVM7Z0JBQ2xCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsOEJBQThCLEdBQUcsdUJBQXVCO2dCQUMzRSxRQUFRLENBQUMsT0FBTzthQUNqQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFNLGtCQUFrQixHQUFHLFVBQVMsSUFBUztZQUMzQyw0REFBNEQ7WUFDNUQsNERBQTREO1lBQzVELGlDQUFpQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFNLGdCQUFnQixHQUFHLDRCQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxlQUFlLFNBQUEsQ0FBQztnQkFDcEIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNyQixlQUFlLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBUSxHQUFHLGlCQUFTLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztnQkFDRCxJQUFNLGFBQWEsR0FBRyxlQUFlLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDdEUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzlDLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQzFCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixvREFBb0Q7NEJBQ3BELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQy9CLG1EQUFtRDtnQ0FDbkQsdUVBQXVFO2dDQUN2RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQ0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUM7NEJBQ3RDLENBQUM7NEJBQ0QsS0FBSyxDQUFDO3dCQUNSLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUNELHNEQUFzRDtZQUN0RCxtREFBbUQ7WUFDbkQsaUJBQWlCO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxNQUFNLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsR0FBRyx1QkFBdUI7Z0JBQ3ZGLElBQUksQ0FBQyxPQUFPO2FBQ2IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsSUFBTSx1QkFBdUIsR0FBRyxVQUFTLElBQVU7WUFDakQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FDL0IsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUM7UUFFRixJQUFNLHFCQUFxQixHQUFHLFVBQVMsSUFBVTtZQUMvQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUNuQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQztRQUVGLElBQU0scUJBQXFCLEdBQUcsVUFBUyxJQUFTO1lBQzlDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDO1FBRUYsSUFBTSxjQUFjLEdBQUcsaUJBQWlCLEdBQUcsb0JBQW9CLEdBQUcsdUJBQXVCLENBQUM7UUFDMUYsSUFBTSxZQUFZLEdBQUcsaUJBQWlCLEdBQUcsa0JBQWtCLEdBQUcscUJBQXFCLENBQUM7UUFFcEYsSUFBTSw2QkFBNkIsR0FBRyxVQUFTLElBQVMsRUFBRSxRQUFhO1lBQ3JFLElBQU0sY0FBYyxHQUFHLE9BQU8sUUFBUSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxLQUFLLHFCQUFhLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUM7Z0JBQ2hFLENBQUMsY0FBYyxLQUFLLG1CQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsNERBQTREO2dCQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUM7UUFFRixJQUFNLE9BQU8sR0FBRyxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsNkJBQTZCLENBQUM7WUFDeEUsWUFBWSxDQUFDLDZCQUE2QjtZQUMxQyw2QkFBNkIsQ0FBQztRQUVsQyxJQUFNLGVBQWUsR0FBRyxVQUNwQixjQUFtQixFQUFFLFNBQWlCLEVBQUUsZ0JBQXFCLEVBQUUsY0FBbUIsRUFDbEYsWUFBb0IsRUFBRSxPQUFlO1lBQXJDLDZCQUFBLEVBQUEsb0JBQW9CO1lBQUUsd0JBQUEsRUFBQSxlQUFlO1lBQ3ZDLE1BQU0sQ0FBQztnQkFDTCxJQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksT0FBTyxDQUFDO2dCQUMvQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNoQyxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDZCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQy9DLENBQUM7Z0JBRUQsMERBQTBEO2dCQUMxRCxvREFBb0Q7Z0JBQ3BELCtDQUErQztnQkFDL0MsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxxQkFBYSxDQUFDLENBQUMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMvQyxDQUFDO29CQUNELGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsZUFBZSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckYsTUFBTSxDQUFDO2dCQUNULENBQUM7Z0JBRUQsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdCLElBQUksT0FBTyxDQUFDO2dCQUNaLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1QixPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDOUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDMUIsSUFBTSxnQkFBZ0IsR0FBRyw0QkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekQsSUFBSSxlQUFlLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUN0Qix3RUFBd0U7b0JBQ3hFLElBQU0sY0FBYyxHQUFHLFNBQVMsR0FBRyxpQkFBUyxDQUFDO29CQUM3QyxJQUFNLGFBQWEsR0FBRyxTQUFTLEdBQUcsZ0JBQVEsQ0FBQztvQkFDM0MsSUFBTSxNQUFNLEdBQUcsMEJBQWtCLEdBQUcsY0FBYyxDQUFDO29CQUNuRCxJQUFNLGFBQWEsR0FBRywwQkFBa0IsR0FBRyxhQUFhLENBQUM7b0JBQ3pELDRCQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDckMsNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUMsaUJBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDcEQsNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLGFBQWEsQ0FBQztvQkFDMUQsZUFBZSxHQUFHLE9BQU8sR0FBRyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUNyRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsZ0JBQVEsR0FBRyxpQkFBUyxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBQ0QsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLCtCQUErQjtvQkFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDbEIsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN4Qyw0REFBNEQ7Z0NBQzVELE1BQU0sQ0FBQzs0QkFDVCxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLGFBQWEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMvQyxDQUFDO2dCQUNELElBQUksTUFBTSxDQUFDO2dCQUNYLElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsd0JBQWdCLENBQUMsQ0FBQztnQkFDN0QsSUFBTSxZQUFZLEdBQUcscUJBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDakIsTUFBTSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1osTUFBTSxHQUFHLGVBQWUsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUNuRCxDQUFDO2dCQUNELCtEQUErRDtnQkFDL0QsaUNBQWlDO2dCQUNqQyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVCw2REFBNkQ7b0JBQzdELDREQUE0RDtvQkFDNUQsd0JBQXdCO29CQUN4QixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2hDLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUMzQixRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDL0IsUUFBUSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBRWpDLElBQU0sSUFBSSxHQUFHLGlCQUFpQixHQUFHLHNDQUE4QixHQUFHLElBQUksQ0FBQztnQkFDdkUsSUFBTSxJQUFJLEdBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUVyRixpREFBaUQ7Z0JBQ2pELHVEQUF1RDtnQkFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDdEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsd0RBQXdEO29CQUN2RCxJQUFZLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO2dCQUM1QyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDYixhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztZQUNILENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGVBQWUsQ0FDdkMsc0JBQXNCLEVBQUUseUJBQXlCLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFDL0UsWUFBWSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLGVBQWUsQ0FDM0MsMEJBQTBCLEVBQUUsNkJBQTZCLEVBQUUscUJBQXFCLEVBQ2hGLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHO1lBQzdCLElBQU0sTUFBTSxHQUFHLElBQUksSUFBSSxPQUFPLENBQUM7WUFDL0IsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3QixJQUFJLE9BQU8sQ0FBQztZQUNaLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDakIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEQsQ0FBQztZQUVELElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDMUQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLGVBQWU7Z0JBQ2YsQ0FBQyxlQUFlLENBQUMseUJBQXlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sQ0FBQztZQUNULENBQUM7WUFFRCxJQUFNLGdCQUFnQixHQUFHLDRCQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELElBQUksZUFBZSxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDckIsZUFBZSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxnQkFBUSxHQUFHLGlCQUFTLENBQUMsQ0FBQztZQUNyRSxDQUFDO1lBQ0QsSUFBTSxhQUFhLEdBQUcsZUFBZSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDOUMsSUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxJQUFNLGNBQWMsR0FBRyxPQUFPLFFBQVEsQ0FBQztvQkFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixvREFBb0Q7d0JBQ25ELFlBQW9CLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDdkMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixtREFBbUQ7NEJBQ25ELHVFQUF1RTs0QkFDdEUsWUFBb0IsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzRCQUN4QyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUNqQyxDQUFDO3dCQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUMzQyxNQUFNLENBQUM7b0JBQ1QsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHO1lBQ2hDLElBQU0sTUFBTSxHQUFHLElBQUksSUFBSSxPQUFPLENBQUM7WUFDL0IsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9CLElBQU0sU0FBUyxHQUFVLEVBQUUsQ0FBQztZQUM1QixJQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRWhELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN0QyxJQUFNLElBQUksR0FBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0UsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUM7UUFFRixLQUFLLENBQUMsbUNBQW1DLENBQUMsR0FBRztZQUMzQyxJQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksT0FBTyxDQUFDO1lBRS9CLElBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3JDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsSUFBTSxLQUFLLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRCxJQUFJLE9BQU8sR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxrREFBa0Q7b0JBQ2xELCtDQUErQztvQkFDL0Msa0RBQWtEO29CQUNsRCx1Q0FBdUM7b0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDbkUsQ0FBQztnQkFDSCxDQUFDO2dCQUNELHlDQUF5QztnQkFDekMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUM1RSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBTSxnQkFBZ0IsR0FBRyw0QkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFNLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxpQkFBUyxDQUFDLENBQUM7b0JBQ3BELElBQU0sc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO29CQUUxRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3RDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUVwRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNWLElBQU0sV0FBVyxHQUFPLEtBQUssUUFBQyxDQUFDO3dCQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDNUMsSUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7NEJBQzdFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUMvRSxDQUFDO29CQUNILENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDakIsSUFBTSxXQUFXLEdBQU8sWUFBWSxRQUFDLENBQUM7d0JBQ3RDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUM1QyxJQUFNLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs0QkFDN0UsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQy9FLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLDRCQUE0QjtRQUM1Qiw2QkFBcUIsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3pFLDZCQUFxQixDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDL0UsRUFBRSxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1lBQzdCLDZCQUFxQixDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDOUYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsNkJBQXFCLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBSSxPQUFPLEdBQVUsRUFBRSxDQUFDO0lBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQXBmRCw0Q0FvZkM7QUFFRCx3QkFBK0IsTUFBVyxFQUFFLFNBQWlCO0lBQzNELElBQU0sVUFBVSxHQUFVLEVBQUUsQ0FBQztJQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQU0sS0FBSyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLE9BQU8sR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBTSxLQUFLLEdBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3RDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFmRCx3Q0FlQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHttaXNzaW5nUmVxdWlyZX1cbiAqL1xuaW1wb3J0IHthdHRhY2hPcmlnaW5Ub1BhdGNoZWQsIHpvbmVTeW1ib2x9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVFJVRV9TVFIgPSAndHJ1ZSc7XG5leHBvcnQgY29uc3QgRkFMU0VfU1RSID0gJ2ZhbHNlJztcblxuZXhwb3J0IGludGVyZmFjZSBFdmVudFRhc2tEYXRhIGV4dGVuZHMgVGFza0RhdGEgeyByZWFkb25seSBpc1VzaW5nR2xvYmFsQ2FsbGJhY2s/OiBib29sZWFuOyB9XG5cbi8vIGFuIGlkZW50aWZpZXIgdG8gdGVsbCBab25lVGFzayBkbyBub3QgY3JlYXRlIGEgbmV3IGludm9rZSBjbG9zdXJlXG5leHBvcnQgY29uc3QgT1BUSU1JWkVEX1pPTkVfRVZFTlRfVEFTS19EQVRBOiBFdmVudFRhc2tEYXRhID0ge1xuICBpc1VzaW5nR2xvYmFsQ2FsbGJhY2s6IHRydWVcbn07XG5cbmV4cG9ydCBjb25zdCB6b25lU3ltYm9sRXZlbnROYW1lczogYW55ID0ge307XG5leHBvcnQgY29uc3QgZ2xvYmFsU291cmNlczogYW55ID0ge307XG5cbmV4cG9ydCBjb25zdCBDT05TVFJVQ1RPUl9OQU1FID0gJ25hbWUnO1xuXG5leHBvcnQgY29uc3QgRlVOQ1RJT05fVFlQRSA9ICdmdW5jdGlvbic7XG5leHBvcnQgY29uc3QgT0JKRUNUX1RZUEUgPSAnb2JqZWN0JztcblxuZXhwb3J0IGNvbnN0IFpPTkVfU1lNQk9MX1BSRUZJWCA9ICdfX3pvbmVfc3ltYm9sX18nO1xuXG5jb25zdCBFVkVOVF9OQU1FX1NZTUJPTF9SRUdYID0gL15fX3pvbmVfc3ltYm9sX18oXFx3KykodHJ1ZXxmYWxzZSkkLztcblxuZXhwb3J0IGludGVyZmFjZSBQYXRjaEV2ZW50VGFyZ2V0T3B0aW9ucyB7XG4gIHZhbGlkYXRlSGFuZGxlcj86IChuYXRpdmVEZWxlZ2F0ZTogYW55LCBkZWxlZ2F0ZTogYW55LCB0YXJnZXQ6IGFueSwgYXJnczogYW55KSA9PiBib29sZWFuO1xuICBhZGRFdmVudExpc3RlbmVyRm5OYW1lPzogc3RyaW5nO1xuICByZW1vdmVFdmVudExpc3RlbmVyRm5OYW1lPzogc3RyaW5nO1xuICBwcmVwZW5kRXZlbnRMaXN0ZW5lckZuTmFtZT86IHN0cmluZztcbiAgbGlzdGVuZXJzRm5OYW1lPzogc3RyaW5nO1xuICByZW1vdmVBbGxGbk5hbWU/OiBzdHJpbmc7XG4gIHVzZUdsb2JhbENhbGxiYWNrPzogYm9vbGVhbjtcbiAgY2hlY2tEdXBsaWNhdGU/OiBib29sZWFuO1xuICByZXR1cm5UYXJnZXQ/OiBib29sZWFuO1xuICBjb21wYXJlVGFza0NhbGxiYWNrVnNEZWxlZ2F0ZT86ICh0YXNrOiBhbnksIGRlbGVnYXRlOiBhbnkpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaEV2ZW50VGFyZ2V0KFxuICAgIF9nbG9iYWw6IGFueSwgYXBpczogYW55W10sIHBhdGNoT3B0aW9ucz86IFBhdGNoRXZlbnRUYXJnZXRPcHRpb25zKSB7XG4gIGNvbnN0IEFERF9FVkVOVF9MSVNURU5FUiA9XG4gICAgICAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy5hZGRFdmVudExpc3RlbmVyRm5OYW1lKSB8fCAnYWRkRXZlbnRMaXN0ZW5lcic7XG4gIGNvbnN0IFJFTU9WRV9FVkVOVF9MSVNURU5FUiA9XG4gICAgICAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy5yZW1vdmVFdmVudExpc3RlbmVyRm5OYW1lKSB8fCAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cbiAgY29uc3QgTElTVEVORVJTX0VWRU5UX0xJU1RFTkVSID1cbiAgICAgIChwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLmxpc3RlbmVyc0ZuTmFtZSkgfHwgJ2V2ZW50TGlzdGVuZXJzJztcbiAgY29uc3QgUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVIgPVxuICAgICAgKHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMucmVtb3ZlQWxsRm5OYW1lKSB8fCAncmVtb3ZlQWxsTGlzdGVuZXJzJztcblxuICBjb25zdCB6b25lU3ltYm9sQWRkRXZlbnRMaXN0ZW5lciA9IHpvbmVTeW1ib2woQUREX0VWRU5UX0xJU1RFTkVSKTtcblxuICBjb25zdCBBRERfRVZFTlRfTElTVEVORVJfU09VUkNFID0gJy4nICsgQUREX0VWRU5UX0xJU1RFTkVSICsgJzonO1xuXG4gIGNvbnN0IFBSRVBFTkRfRVZFTlRfTElTVEVORVIgPSAncHJlcGVuZExpc3RlbmVyJztcbiAgY29uc3QgUFJFUEVORF9FVkVOVF9MSVNURU5FUl9TT1VSQ0UgPSAnLicgKyBQUkVQRU5EX0VWRU5UX0xJU1RFTkVSICsgJzonO1xuXG4gIGNvbnN0IGludm9rZVRhc2sgPSBmdW5jdGlvbih0YXNrOiBhbnksIHRhcmdldDogYW55LCBldmVudDogRXZlbnQpIHtcbiAgICAvLyBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLCBjaGVjayBpc1JlbW92ZWQgd2hpY2ggaXMgc2V0XG4gICAgLy8gYnkgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgIGlmICh0YXNrLmlzUmVtb3ZlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkZWxlZ2F0ZSA9IHRhc2suY2FsbGJhY2s7XG4gICAgaWYgKHR5cGVvZiBkZWxlZ2F0ZSA9PT0gT0JKRUNUX1RZUEUgJiYgZGVsZWdhdGUuaGFuZGxlRXZlbnQpIHtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgYmluZCB2ZXJzaW9uIG9mIGhhbmRsZUV2ZW50IHdoZW4gaW52b2tlXG4gICAgICB0YXNrLmNhbGxiYWNrID0gKGV2ZW50OiBFdmVudCkgPT4gZGVsZWdhdGUuaGFuZGxlRXZlbnQoZXZlbnQpO1xuICAgICAgdGFzay5vcmlnaW5hbERlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgfVxuICAgIC8vIGludm9rZSBzdGF0aWMgdGFzay5pbnZva2VcbiAgICB0YXNrLmludm9rZSh0YXNrLCB0YXJnZXQsIFtldmVudF0pO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0YXNrLm9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIG9wdGlvbnMub25jZSkge1xuICAgICAgLy8gaWYgb3B0aW9ucy5vbmNlIGlzIHRydWUsIGFmdGVyIGludm9rZSBvbmNlIHJlbW92ZSBsaXN0ZW5lciBoZXJlXG4gICAgICAvLyBvbmx5IGJyb3dzZXIgbmVlZCB0byBkbyB0aGlzLCBub2RlanMgZXZlbnRFbWl0dGVyIHdpbGwgY2FsIHJlbW92ZUxpc3RlbmVyXG4gICAgICAvLyBpbnNpZGUgRXZlbnRFbWl0dGVyLm9uY2VcbiAgICAgIGNvbnN0IGRlbGVnYXRlID0gdGFzay5vcmlnaW5hbERlbGVnYXRlID8gdGFzay5vcmlnaW5hbERlbGVnYXRlIDogdGFzay5jYWxsYmFjaztcbiAgICAgIHRhcmdldFtSRU1PVkVfRVZFTlRfTElTVEVORVJdLmFwcGx5KHRhcmdldCwgW2V2ZW50LnR5cGUsIGRlbGVnYXRlLCBvcHRpb25zXSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGdsb2JhbCBzaGFyZWQgem9uZUF3YXJlQ2FsbGJhY2sgdG8gaGFuZGxlIGFsbCBldmVudCBjYWxsYmFjayB3aXRoIGNhcHR1cmUgPSBmYWxzZVxuICBjb25zdCBnbG9iYWxab25lQXdhcmVDYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMgfHwgX2dsb2JhbDtcblxuICAgIGNvbnN0IHRhc2tzID0gdGFyZ2V0W3pvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50LnR5cGVdW0ZBTFNFX1NUUl1dO1xuICAgIGlmICh0YXNrcykge1xuICAgICAgLy8gaW52b2tlIGFsbCB0YXNrcyB3aGljaCBhdHRhY2hlZCB0byBjdXJyZW50IHRhcmdldCB3aXRoIGdpdmVuIGV2ZW50LnR5cGUgYW5kIGNhcHR1cmUgPSBmYWxzZVxuICAgICAgLy8gZm9yIHBlcmZvcm1hbmNlIGNvbmNlcm4sIGlmIHRhc2subGVuZ3RoID09PSAxLCBqdXN0IGludm9rZVxuICAgICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpbnZva2VUYXNrKHRhc2tzWzBdLCB0YXJnZXQsIGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzgzNlxuICAgICAgICAvLyBjb3B5IHRoZSB0YXNrcyBhcnJheSBiZWZvcmUgaW52b2tlLCB0byBhdm9pZFxuICAgICAgICAvLyB0aGUgY2FsbGJhY2sgd2lsbCByZW1vdmUgaXRzZWxmIG9yIG90aGVyIGxpc3RlbmVyXG4gICAgICAgIGNvbnN0IGNvcHlUYXNrcyA9IHRhc2tzLnNsaWNlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29weVRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaW52b2tlVGFzayhjb3B5VGFza3NbaV0sIHRhcmdldCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGdsb2JhbCBzaGFyZWQgem9uZUF3YXJlQ2FsbGJhY2sgdG8gaGFuZGxlIGFsbCBldmVudCBjYWxsYmFjayB3aXRoIGNhcHR1cmUgPSB0cnVlXG4gIGNvbnN0IGdsb2JhbFpvbmVBd2FyZUNhcHR1cmVDYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMgfHwgX2dsb2JhbDtcblxuICAgIGNvbnN0IHRhc2tzID0gdGFyZ2V0W3pvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50LnR5cGVdW1RSVUVfU1RSXV07XG4gICAgaWYgKHRhc2tzKSB7XG4gICAgICAvLyBpbnZva2UgYWxsIHRhc2tzIHdoaWNoIGF0dGFjaGVkIHRvIGN1cnJlbnQgdGFyZ2V0IHdpdGggZ2l2ZW4gZXZlbnQudHlwZSBhbmQgY2FwdHVyZSA9IGZhbHNlXG4gICAgICAvLyBmb3IgcGVyZm9ybWFuY2UgY29uY2VybiwgaWYgdGFzay5sZW5ndGggPT09IDEsIGp1c3QgaW52b2tlXG4gICAgICBpZiAodGFza3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGludm9rZVRhc2sodGFza3NbMF0sIHRhcmdldCwgZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvODM2XG4gICAgICAgIC8vIGNvcHkgdGhlIHRhc2tzIGFycmF5IGJlZm9yZSBpbnZva2UsIHRvIGF2b2lkXG4gICAgICAgIC8vIHRoZSBjYWxsYmFjayB3aWxsIHJlbW92ZSBpdHNlbGYgb3Igb3RoZXIgbGlzdGVuZXJcbiAgICAgICAgY29uc3QgY29weVRhc2tzID0gdGFza3Muc2xpY2UoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3B5VGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpbnZva2VUYXNrKGNvcHlUYXNrc1tpXSwgdGFyZ2V0LCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gcGF0Y2hFdmVudFRhcmdldE1ldGhvZHMob2JqOiBhbnksIHBhdGNoT3B0aW9ucz86IFBhdGNoRXZlbnRUYXJnZXRPcHRpb25zKSB7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdXNlR2xvYmFsQ2FsbGJhY2sgPSB0cnVlO1xuICAgIGlmIChwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLnVzZUdsb2JhbENhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHVzZUdsb2JhbENhbGxiYWNrID0gcGF0Y2hPcHRpb25zLnVzZUdsb2JhbENhbGxiYWNrO1xuICAgIH1cbiAgICBjb25zdCB2YWxpZGF0ZUhhbmRsZXIgPSBwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLnZhbGlkYXRlSGFuZGxlcjtcblxuICAgIGxldCBjaGVja0R1cGxpY2F0ZSA9IHRydWU7XG4gICAgaWYgKHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMuY2hlY2tEdXBsaWNhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2hlY2tEdXBsaWNhdGUgPSBwYXRjaE9wdGlvbnMuY2hlY2tEdXBsaWNhdGU7XG4gICAgfVxuXG4gICAgbGV0IHJldHVyblRhcmdldCA9IGZhbHNlO1xuICAgIGlmIChwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLnJldHVyblRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm5UYXJnZXQgPSBwYXRjaE9wdGlvbnMucmV0dXJuVGFyZ2V0O1xuICAgIH1cblxuICAgIGxldCBwcm90byA9IG9iajtcbiAgICB3aGlsZSAocHJvdG8gJiYgIXByb3RvLmhhc093blByb3BlcnR5KEFERF9FVkVOVF9MSVNURU5FUikpIHtcbiAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICB9XG4gICAgaWYgKCFwcm90byAmJiBvYmpbQUREX0VWRU5UX0xJU1RFTkVSXSkge1xuICAgICAgLy8gc29tZWhvdyB3ZSBkaWQgbm90IGZpbmQgaXQsIGJ1dCB3ZSBjYW4gc2VlIGl0LiBUaGlzIGhhcHBlbnMgb24gSUUgZm9yIFdpbmRvdyBwcm9wZXJ0aWVzLlxuICAgICAgcHJvdG8gPSBvYmo7XG4gICAgfVxuXG4gICAgaWYgKCFwcm90bykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAocHJvdG9bem9uZVN5bWJvbEFkZEV2ZW50TGlzdGVuZXJdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gYSBzaGFyZWQgZ2xvYmFsIHRhc2tEYXRhIHRvIHBhc3MgZGF0YSBmb3Igc2NoZWR1bGVFdmVudFRhc2tcbiAgICAvLyBzbyB3ZSBkbyBub3QgbmVlZCB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGp1c3QgZm9yIHBhc3Mgc29tZSBkYXRhXG4gICAgY29uc3QgdGFza0RhdGE6IGFueSA9IHt9O1xuXG4gICAgY29uc3QgbmF0aXZlQWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvW3pvbmVTeW1ib2xBZGRFdmVudExpc3RlbmVyXSA9IHByb3RvW0FERF9FVkVOVF9MSVNURU5FUl07XG4gICAgY29uc3QgbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHByb3RvW3pvbmVTeW1ib2woUkVNT1ZFX0VWRU5UX0xJU1RFTkVSKV0gPVxuICAgICAgICBwcm90b1tSRU1PVkVfRVZFTlRfTElTVEVORVJdO1xuXG4gICAgY29uc3QgbmF0aXZlTGlzdGVuZXJzID0gcHJvdG9bem9uZVN5bWJvbChMSVNURU5FUlNfRVZFTlRfTElTVEVORVIpXSA9XG4gICAgICAgIHByb3RvW0xJU1RFTkVSU19FVkVOVF9MSVNURU5FUl07XG4gICAgY29uc3QgbmF0aXZlUmVtb3ZlQWxsTGlzdGVuZXJzID0gcHJvdG9bem9uZVN5bWJvbChSRU1PVkVfQUxMX0xJU1RFTkVSU19FVkVOVF9MSVNURU5FUildID1cbiAgICAgICAgcHJvdG9bUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdO1xuXG4gICAgbGV0IG5hdGl2ZVByZXBlbmRFdmVudExpc3RlbmVyOiBhbnk7XG4gICAgaWYgKHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMucHJlcGVuZEV2ZW50TGlzdGVuZXJGbk5hbWUpIHtcbiAgICAgIG5hdGl2ZVByZXBlbmRFdmVudExpc3RlbmVyID0gcHJvdG9bem9uZVN5bWJvbChwYXRjaE9wdGlvbnMucHJlcGVuZEV2ZW50TGlzdGVuZXJGbk5hbWUpXSA9XG4gICAgICAgICAgcHJvdG9bcGF0Y2hPcHRpb25zLnByZXBlbmRFdmVudExpc3RlbmVyRm5OYW1lXTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXN0b21TY2hlZHVsZUdsb2JhbCA9IGZ1bmN0aW9uKHRhc2s6IFRhc2spIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGFscmVhZHkgYSB0YXNrIGZvciB0aGUgZXZlbnROYW1lICsgY2FwdHVyZSxcbiAgICAgIC8vIGp1c3QgcmV0dXJuLCBiZWNhdXNlIHdlIHVzZSB0aGUgc2hhcmVkIGdsb2JhbFpvbmVBd2FyZUNhbGxiYWNrIGhlcmUuXG4gICAgICBpZiAodGFza0RhdGEuaXNFeGlzdGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0YXNrRGF0YS50YXJnZXQsIFtcbiAgICAgICAgdGFza0RhdGEuZXZlbnROYW1lLFxuICAgICAgICB0YXNrRGF0YS5jYXB0dXJlID8gZ2xvYmFsWm9uZUF3YXJlQ2FwdHVyZUNhbGxiYWNrIDogZ2xvYmFsWm9uZUF3YXJlQ2FsbGJhY2ssXG4gICAgICAgIHRhc2tEYXRhLm9wdGlvbnNcbiAgICAgIF0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjdXN0b21DYW5jZWxHbG9iYWwgPSBmdW5jdGlvbih0YXNrOiBhbnkpIHtcbiAgICAgIC8vIGlmIHRhc2sgaXMgbm90IG1hcmtlZCBhcyBpc1JlbW92ZWQsIHRoaXMgY2FsbCBpcyBkaXJlY3RseVxuICAgICAgLy8gZnJvbSBab25lLnByb3RvdHlwZS5jYW5jZWxUYXNrLCB3ZSBzaG91bGQgcmVtb3ZlIHRoZSB0YXNrXG4gICAgICAvLyBmcm9tIHRhc2tzTGlzdCBvZiB0YXJnZXQgZmlyc3RcbiAgICAgIGlmICghdGFzay5pc1JlbW92ZWQpIHtcbiAgICAgICAgY29uc3Qgc3ltYm9sRXZlbnROYW1lcyA9IHpvbmVTeW1ib2xFdmVudE5hbWVzW3Rhc2suZXZlbnROYW1lXTtcbiAgICAgICAgbGV0IHN5bWJvbEV2ZW50TmFtZTtcbiAgICAgICAgaWYgKHN5bWJvbEV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBzeW1ib2xFdmVudE5hbWUgPSBzeW1ib2xFdmVudE5hbWVzW3Rhc2suY2FwdHVyZSA/IFRSVUVfU1RSIDogRkFMU0VfU1RSXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBleGlzdGluZ1Rhc2tzID0gc3ltYm9sRXZlbnROYW1lICYmIHRhc2sudGFyZ2V0W3N5bWJvbEV2ZW50TmFtZV07XG4gICAgICAgIGlmIChleGlzdGluZ1Rhc2tzKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleGlzdGluZ1Rhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1Rhc2sgPSBleGlzdGluZ1Rhc2tzW2ldO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nVGFzayA9PT0gdGFzaykge1xuICAgICAgICAgICAgICBleGlzdGluZ1Rhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgLy8gc2V0IGlzUmVtb3ZlZCB0byBkYXRhIGZvciBmYXN0ZXIgaW52b2tlVGFzayBjaGVja1xuICAgICAgICAgICAgICB0YXNrLmlzUmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGlmIChleGlzdGluZ1Rhc2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGFsbCB0YXNrcyBmb3IgdGhlIGV2ZW50TmFtZSArIGNhcHR1cmUgaGF2ZSBnb25lLFxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBnbG9iYWxab25lQXdhcmVDYWxsYmFjayBhbmQgcmVtb3ZlIHRoZSB0YXNrIGNhY2hlIGZyb20gdGFyZ2V0XG4gICAgICAgICAgICAgICAgdGFzay5hbGxSZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXNrLnRhcmdldFtzeW1ib2xFdmVudE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGlmIGFsbCB0YXNrcyBmb3IgdGhlIGV2ZW50TmFtZSArIGNhcHR1cmUgaGF2ZSBnb25lLFxuICAgICAgLy8gd2Ugd2lsbCByZWFsbHkgcmVtb3ZlIHRoZSBnbG9iYWwgZXZlbnQgY2FsbGJhY2ssXG4gICAgICAvLyBpZiBub3QsIHJldHVyblxuICAgICAgaWYgKCF0YXNrLmFsbFJlbW92ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGFzay50YXJnZXQsIFtcbiAgICAgICAgdGFzay5ldmVudE5hbWUsIHRhc2suY2FwdHVyZSA/IGdsb2JhbFpvbmVBd2FyZUNhcHR1cmVDYWxsYmFjayA6IGdsb2JhbFpvbmVBd2FyZUNhbGxiYWNrLFxuICAgICAgICB0YXNrLm9wdGlvbnNcbiAgICAgIF0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjdXN0b21TY2hlZHVsZU5vbkdsb2JhbCA9IGZ1bmN0aW9uKHRhc2s6IFRhc2spIHtcbiAgICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KFxuICAgICAgICAgIHRhc2tEYXRhLnRhcmdldCwgW3Rhc2tEYXRhLmV2ZW50TmFtZSwgdGFzay5pbnZva2UsIHRhc2tEYXRhLm9wdGlvbnNdKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3VzdG9tU2NoZWR1bGVQcmVwZW5kID0gZnVuY3Rpb24odGFzazogVGFzaykge1xuICAgICAgcmV0dXJuIG5hdGl2ZVByZXBlbmRFdmVudExpc3RlbmVyLmFwcGx5KFxuICAgICAgICAgIHRhc2tEYXRhLnRhcmdldCwgW3Rhc2tEYXRhLmV2ZW50TmFtZSwgdGFzay5pbnZva2UsIHRhc2tEYXRhLm9wdGlvbnNdKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3VzdG9tQ2FuY2VsTm9uR2xvYmFsID0gZnVuY3Rpb24odGFzazogYW55KSB7XG4gICAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseShcbiAgICAgICAgICB0YXNrLnRhcmdldCwgW3Rhc2suZXZlbnROYW1lLCB0YXNrLmludm9rZSwgdGFzay5vcHRpb25zXSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGN1c3RvbVNjaGVkdWxlID0gdXNlR2xvYmFsQ2FsbGJhY2sgPyBjdXN0b21TY2hlZHVsZUdsb2JhbCA6IGN1c3RvbVNjaGVkdWxlTm9uR2xvYmFsO1xuICAgIGNvbnN0IGN1c3RvbUNhbmNlbCA9IHVzZUdsb2JhbENhbGxiYWNrID8gY3VzdG9tQ2FuY2VsR2xvYmFsIDogY3VzdG9tQ2FuY2VsTm9uR2xvYmFsO1xuXG4gICAgY29uc3QgY29tcGFyZVRhc2tDYWxsYmFja1ZzRGVsZWdhdGUgPSBmdW5jdGlvbih0YXNrOiBhbnksIGRlbGVnYXRlOiBhbnkpIHtcbiAgICAgIGNvbnN0IHR5cGVPZkRlbGVnYXRlID0gdHlwZW9mIGRlbGVnYXRlO1xuICAgICAgaWYgKCh0eXBlT2ZEZWxlZ2F0ZSA9PT0gRlVOQ1RJT05fVFlQRSAmJiB0YXNrLmNhbGxiYWNrID09PSBkZWxlZ2F0ZSkgfHxcbiAgICAgICAgICAodHlwZU9mRGVsZWdhdGUgPT09IE9CSkVDVF9UWVBFICYmIHRhc2sub3JpZ2luYWxEZWxlZ2F0ZSA9PT0gZGVsZWdhdGUpKSB7XG4gICAgICAgIC8vIHNhbWUgY2FsbGJhY2ssIHNhbWUgY2FwdHVyZSwgc2FtZSBldmVudCBuYW1lLCBqdXN0IHJldHVyblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tcGFyZSA9IChwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLmNvbXBhcmVUYXNrQ2FsbGJhY2tWc0RlbGVnYXRlKSA/XG4gICAgICAgIHBhdGNoT3B0aW9ucy5jb21wYXJlVGFza0NhbGxiYWNrVnNEZWxlZ2F0ZSA6XG4gICAgICAgIGNvbXBhcmVUYXNrQ2FsbGJhY2tWc0RlbGVnYXRlO1xuXG4gICAgY29uc3QgbWFrZUFkZExpc3RlbmVyID0gZnVuY3Rpb24oXG4gICAgICAgIG5hdGl2ZUxpc3RlbmVyOiBhbnksIGFkZFNvdXJjZTogc3RyaW5nLCBjdXN0b21TY2hlZHVsZUZuOiBhbnksIGN1c3RvbUNhbmNlbEZuOiBhbnksXG4gICAgICAgIHJldHVyblRhcmdldCA9IGZhbHNlLCBwcmVwZW5kID0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcyB8fCBfZ2xvYmFsO1xuICAgICAgICBjb25zdCB0YXJnZXRab25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgICBsZXQgZGVsZWdhdGUgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIGlmICghZGVsZWdhdGUpIHtcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvbid0IGNyZWF0ZSB0aGUgYmluZCBkZWxlZ2F0ZSBmdW5jdGlvbiBmb3IgaGFuZGxlRXZlbnRcbiAgICAgICAgLy8gY2FzZSBoZXJlIHRvIGltcHJvdmUgYWRkRXZlbnRMaXN0ZW5lciBwZXJmb3JtYW5jZVxuICAgICAgICAvLyB3ZSB3aWxsIGNyZWF0ZSB0aGUgYmluZCBkZWxlZ2F0ZSB3aGVuIGludm9rZVxuICAgICAgICBsZXQgaXNIYW5kbGVFdmVudCA9IGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGRlbGVnYXRlICE9PSBGVU5DVElPTl9UWVBFKSB7XG4gICAgICAgICAgaWYgKCFkZWxlZ2F0ZS5oYW5kbGVFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzSGFuZGxlRXZlbnQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlSGFuZGxlciAmJiAhdmFsaWRhdGVIYW5kbGVyKG5hdGl2ZUxpc3RlbmVyLCBkZWxlZ2F0ZSwgdGFyZ2V0LCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgIGxldCBjYXB0dXJlO1xuICAgICAgICBsZXQgb25jZSA9IGZhbHNlO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgPT09IHRydWUpIHtcbiAgICAgICAgICBjYXB0dXJlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXB0dXJlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5jYXB0dXJlIDogZmFsc2U7XG4gICAgICAgICAgb25jZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMub25jZSA6IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgY29uc3Qgc3ltYm9sRXZlbnROYW1lcyA9IHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50TmFtZV07XG4gICAgICAgIGxldCBzeW1ib2xFdmVudE5hbWU7XG4gICAgICAgIGlmICghc3ltYm9sRXZlbnROYW1lcykge1xuICAgICAgICAgIC8vIHRoZSBjb2RlIGlzIGR1cGxpY2F0ZSwgYnV0IEkganVzdCB3YW50IHRvIGdldCBzb21lIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICAgIGNvbnN0IGZhbHNlRXZlbnROYW1lID0gZXZlbnROYW1lICsgRkFMU0VfU1RSO1xuICAgICAgICAgIGNvbnN0IHRydWVFdmVudE5hbWUgPSBldmVudE5hbWUgKyBUUlVFX1NUUjtcbiAgICAgICAgICBjb25zdCBzeW1ib2wgPSBaT05FX1NZTUJPTF9QUkVGSVggKyBmYWxzZUV2ZW50TmFtZTtcbiAgICAgICAgICBjb25zdCBzeW1ib2xDYXB0dXJlID0gWk9ORV9TWU1CT0xfUFJFRklYICsgdHJ1ZUV2ZW50TmFtZTtcbiAgICAgICAgICB6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudE5hbWVdID0ge307XG4gICAgICAgICAgem9uZVN5bWJvbEV2ZW50TmFtZXNbZXZlbnROYW1lXVtGQUxTRV9TVFJdID0gc3ltYm9sO1xuICAgICAgICAgIHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50TmFtZV1bVFJVRV9TVFJdID0gc3ltYm9sQ2FwdHVyZTtcbiAgICAgICAgICBzeW1ib2xFdmVudE5hbWUgPSBjYXB0dXJlID8gc3ltYm9sQ2FwdHVyZSA6IHN5bWJvbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzeW1ib2xFdmVudE5hbWUgPSBzeW1ib2xFdmVudE5hbWVzW2NhcHR1cmUgPyBUUlVFX1NUUiA6IEZBTFNFX1NUUl07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGV4aXN0aW5nVGFza3MgPSB0YXJnZXRbc3ltYm9sRXZlbnROYW1lXTtcbiAgICAgICAgbGV0IGlzRXhpc3RpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKGV4aXN0aW5nVGFza3MpIHtcbiAgICAgICAgICAvLyBhbHJlYWR5IGhhdmUgdGFzayByZWdpc3RlcmVkXG4gICAgICAgICAgaXNFeGlzdGluZyA9IHRydWU7XG4gICAgICAgICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4aXN0aW5nVGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoZXhpc3RpbmdUYXNrc1tpXSwgZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gc2FtZSBjYWxsYmFjaywgc2FtZSBjYXB0dXJlLCBzYW1lIGV2ZW50IG5hbWUsIGp1c3QgcmV0dXJuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4aXN0aW5nVGFza3MgPSB0YXJnZXRbc3ltYm9sRXZlbnROYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzb3VyY2U7XG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yTmFtZSA9IHRhcmdldC5jb25zdHJ1Y3RvcltDT05TVFJVQ1RPUl9OQU1FXTtcbiAgICAgICAgY29uc3QgdGFyZ2V0U291cmNlID0gZ2xvYmFsU291cmNlc1tjb25zdHJ1Y3Rvck5hbWVdO1xuICAgICAgICBpZiAodGFyZ2V0U291cmNlKSB7XG4gICAgICAgICAgc291cmNlID0gdGFyZ2V0U291cmNlW2V2ZW50TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICBzb3VyY2UgPSBjb25zdHJ1Y3Rvck5hbWUgKyBhZGRTb3VyY2UgKyBldmVudE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZG8gbm90IGNyZWF0ZSBhIG5ldyBvYmplY3QgYXMgdGFzay5kYXRhIHRvIHBhc3MgdGhvc2UgdGhpbmdzXG4gICAgICAgIC8vIGp1c3QgdXNlIHRoZSBnbG9iYWwgc2hhcmVkIG9uZVxuICAgICAgICB0YXNrRGF0YS5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgaWYgKG9uY2UpIHtcbiAgICAgICAgICAvLyBpZiBhZGRFdmVudExpc3RlbmVyIHdpdGggb25jZSBvcHRpb25zLCB3ZSBkb24ndCBwYXNzIGl0IHRvXG4gICAgICAgICAgLy8gbmF0aXZlIGFkZEV2ZW50TGlzdGVuZXIsIGluc3RlYWQgd2Uga2VlcCB0aGUgb25jZSBzZXR0aW5nXG4gICAgICAgICAgLy8gYW5kIGhhbmRsZSBvdXJzZWx2ZXMuXG4gICAgICAgICAgdGFza0RhdGEub3B0aW9ucy5vbmNlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGFza0RhdGEudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0YXNrRGF0YS5jYXB0dXJlID0gY2FwdHVyZTtcbiAgICAgICAgdGFza0RhdGEuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB0YXNrRGF0YS5pc0V4aXN0aW5nID0gaXNFeGlzdGluZztcblxuICAgICAgICBjb25zdCBkYXRhID0gdXNlR2xvYmFsQ2FsbGJhY2sgPyBPUFRJTUlaRURfWk9ORV9FVkVOVF9UQVNLX0RBVEEgOiBudWxsO1xuICAgICAgICBjb25zdCB0YXNrOiBhbnkgPVxuICAgICAgICAgICAgem9uZS5zY2hlZHVsZUV2ZW50VGFzayhzb3VyY2UsIGRlbGVnYXRlLCBkYXRhLCBjdXN0b21TY2hlZHVsZUZuLCBjdXN0b21DYW5jZWxGbik7XG5cbiAgICAgICAgLy8gaGF2ZSB0byBzYXZlIHRob3NlIGluZm9ybWF0aW9uIHRvIHRhc2sgaW4gY2FzZVxuICAgICAgICAvLyBhcHBsaWNhdGlvbiBtYXkgY2FsbCB0YXNrLnpvbmUuY2FuY2VsVGFzaygpIGRpcmVjdGx5XG4gICAgICAgIGlmIChvbmNlKSB7XG4gICAgICAgICAgb3B0aW9ucy5vbmNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0YXNrLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0YXNrLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGFzay5jYXB0dXJlID0gY2FwdHVyZTtcbiAgICAgICAgdGFzay5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIGlmIChpc0hhbmRsZUV2ZW50KSB7XG4gICAgICAgICAgLy8gc2F2ZSBvcmlnaW5hbCBkZWxlZ2F0ZSBmb3IgY29tcGFyZSB0byBjaGVjayBkdXBsaWNhdGVcbiAgICAgICAgICAodGFzayBhcyBhbnkpLm9yaWdpbmFsRGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByZXBlbmQpIHtcbiAgICAgICAgICBleGlzdGluZ1Rhc2tzLnB1c2godGFzayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhpc3RpbmdUYXNrcy51bnNoaWZ0KHRhc2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJldHVyblRhcmdldCkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIHByb3RvW0FERF9FVkVOVF9MSVNURU5FUl0gPSBtYWtlQWRkTGlzdGVuZXIoXG4gICAgICAgIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIsIEFERF9FVkVOVF9MSVNURU5FUl9TT1VSQ0UsIGN1c3RvbVNjaGVkdWxlLCBjdXN0b21DYW5jZWwsXG4gICAgICAgIHJldHVyblRhcmdldCk7XG4gICAgaWYgKG5hdGl2ZVByZXBlbmRFdmVudExpc3RlbmVyKSB7XG4gICAgICBwcm90b1tQUkVQRU5EX0VWRU5UX0xJU1RFTkVSXSA9IG1ha2VBZGRMaXN0ZW5lcihcbiAgICAgICAgICBuYXRpdmVQcmVwZW5kRXZlbnRMaXN0ZW5lciwgUFJFUEVORF9FVkVOVF9MSVNURU5FUl9TT1VSQ0UsIGN1c3RvbVNjaGVkdWxlUHJlcGVuZCxcbiAgICAgICAgICBjdXN0b21DYW5jZWwsIHJldHVyblRhcmdldCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJvdG9bUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcyB8fCBfZ2xvYmFsO1xuICAgICAgY29uc3QgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgbGV0IGNhcHR1cmU7XG4gICAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucyA9PT0gdHJ1ZSkge1xuICAgICAgICBjYXB0dXJlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FwdHVyZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuY2FwdHVyZSA6IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWxlZ2F0ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmICghZGVsZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbGlkYXRlSGFuZGxlciAmJlxuICAgICAgICAgICF2YWxpZGF0ZUhhbmRsZXIobmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciwgZGVsZWdhdGUsIHRhcmdldCwgYXJndW1lbnRzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN5bWJvbEV2ZW50TmFtZXMgPSB6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudE5hbWVdO1xuICAgICAgbGV0IHN5bWJvbEV2ZW50TmFtZTtcbiAgICAgIGlmIChzeW1ib2xFdmVudE5hbWVzKSB7XG4gICAgICAgIHN5bWJvbEV2ZW50TmFtZSA9IHN5bWJvbEV2ZW50TmFtZXNbY2FwdHVyZSA/IFRSVUVfU1RSIDogRkFMU0VfU1RSXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGV4aXN0aW5nVGFza3MgPSBzeW1ib2xFdmVudE5hbWUgJiYgdGFyZ2V0W3N5bWJvbEV2ZW50TmFtZV07XG4gICAgICBpZiAoZXhpc3RpbmdUYXNrcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4aXN0aW5nVGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ1Rhc2sgPSBleGlzdGluZ1Rhc2tzW2ldO1xuICAgICAgICAgIGNvbnN0IHR5cGVPZkRlbGVnYXRlID0gdHlwZW9mIGRlbGVnYXRlO1xuICAgICAgICAgIGlmIChjb21wYXJlKGV4aXN0aW5nVGFzaywgZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBleGlzdGluZ1Rhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIC8vIHNldCBpc1JlbW92ZWQgdG8gZGF0YSBmb3IgZmFzdGVyIGludm9rZVRhc2sgY2hlY2tcbiAgICAgICAgICAgIChleGlzdGluZ1Rhc2sgYXMgYW55KS5pc1JlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nVGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIC8vIGFsbCB0YXNrcyBmb3IgdGhlIGV2ZW50TmFtZSArIGNhcHR1cmUgaGF2ZSBnb25lLFxuICAgICAgICAgICAgICAvLyByZW1vdmUgZ2xvYmFsWm9uZUF3YXJlQ2FsbGJhY2sgYW5kIHJlbW92ZSB0aGUgdGFzayBjYWNoZSBmcm9tIHRhcmdldFxuICAgICAgICAgICAgICAoZXhpc3RpbmdUYXNrIGFzIGFueSkuYWxsUmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHRhcmdldFtzeW1ib2xFdmVudE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4aXN0aW5nVGFzay56b25lLmNhbmNlbFRhc2soZXhpc3RpbmdUYXNrKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJvdG9bTElTVEVORVJTX0VWRU5UX0xJU1RFTkVSXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcyB8fCBfZ2xvYmFsO1xuICAgICAgY29uc3QgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICBjb25zdCBsaXN0ZW5lcnM6IGFueVtdID0gW107XG4gICAgICBjb25zdCB0YXNrcyA9IGZpbmRFdmVudFRhc2tzKHRhcmdldCwgZXZlbnROYW1lKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0YXNrOiBhbnkgPSB0YXNrc1tpXTtcbiAgICAgICAgbGV0IGRlbGVnYXRlID0gdGFzay5vcmlnaW5hbERlbGVnYXRlID8gdGFzay5vcmlnaW5hbERlbGVnYXRlIDogdGFzay5jYWxsYmFjaztcbiAgICAgICAgbGlzdGVuZXJzLnB1c2goZGVsZWdhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxpc3RlbmVycztcbiAgICB9O1xuXG4gICAgcHJvdG9bUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzIHx8IF9nbG9iYWw7XG5cbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIGlmICghZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBwcm9wID0ga2V5c1tpXTtcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IEVWRU5UX05BTUVfU1lNQk9MX1JFR1guZXhlYyhwcm9wKTtcbiAgICAgICAgICBsZXQgZXZ0TmFtZSA9IG1hdGNoICYmIG1hdGNoWzFdO1xuICAgICAgICAgIC8vIGluIG5vZGVqcyBFdmVudEVtaXR0ZXIsIHJlbW92ZUxpc3RlbmVyIGV2ZW50IGlzXG4gICAgICAgICAgLy8gdXNlZCBmb3IgbW9uaXRvcmluZyB0aGUgcmVtb3ZlTGlzdGVuZXIgY2FsbCxcbiAgICAgICAgICAvLyBzbyBqdXN0IGtlZXAgcmVtb3ZlTGlzdGVuZXIgZXZlbnRMaXN0ZW5lciB1bnRpbFxuICAgICAgICAgIC8vIGFsbCBvdGhlciBldmVudExpc3RlbmVycyBhcmUgcmVtb3ZlZFxuICAgICAgICAgIGlmIChldnROYW1lICYmIGV2dE5hbWUgIT09ICdyZW1vdmVMaXN0ZW5lcicpIHtcbiAgICAgICAgICAgIHRoaXNbUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdLmFwcGx5KHRoaXMsIFtldnROYW1lXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSByZW1vdmVMaXN0ZW5lciBsaXN0ZW5lciBmaW5hbGx5XG4gICAgICAgIHRoaXNbUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdLmFwcGx5KHRoaXMsIFsncmVtb3ZlTGlzdGVuZXInXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzeW1ib2xFdmVudE5hbWVzID0gem9uZVN5bWJvbEV2ZW50TmFtZXNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKHN5bWJvbEV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBjb25zdCBzeW1ib2xFdmVudE5hbWUgPSBzeW1ib2xFdmVudE5hbWVzW0ZBTFNFX1NUUl07XG4gICAgICAgICAgY29uc3Qgc3ltYm9sQ2FwdHVyZUV2ZW50TmFtZSA9IHN5bWJvbEV2ZW50TmFtZXNbVFJVRV9TVFJdO1xuXG4gICAgICAgICAgY29uc3QgdGFza3MgPSB0YXJnZXRbc3ltYm9sRXZlbnROYW1lXTtcbiAgICAgICAgICBjb25zdCBjYXB0dXJlVGFza3MgPSB0YXJnZXRbc3ltYm9sQ2FwdHVyZUV2ZW50TmFtZV07XG5cbiAgICAgICAgICBpZiAodGFza3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZVRhc2tzID0gWy4uLnRhc2tzXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlVGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFzayA9IHJlbW92ZVRhc2tzW2ldO1xuICAgICAgICAgICAgICBsZXQgZGVsZWdhdGUgPSB0YXNrLm9yaWdpbmFsRGVsZWdhdGUgPyB0YXNrLm9yaWdpbmFsRGVsZWdhdGUgOiB0YXNrLmNhbGxiYWNrO1xuICAgICAgICAgICAgICB0aGlzW1JFTU9WRV9FVkVOVF9MSVNURU5FUl0uYXBwbHkodGhpcywgW2V2ZW50TmFtZSwgZGVsZWdhdGUsIHRhc2sub3B0aW9uc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjYXB0dXJlVGFza3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZVRhc2tzID0gWy4uLmNhcHR1cmVUYXNrc107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbW92ZVRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSByZW1vdmVUYXNrc1tpXTtcbiAgICAgICAgICAgICAgbGV0IGRlbGVnYXRlID0gdGFzay5vcmlnaW5hbERlbGVnYXRlID8gdGFzay5vcmlnaW5hbERlbGVnYXRlIDogdGFzay5jYWxsYmFjaztcbiAgICAgICAgICAgICAgdGhpc1tSRU1PVkVfRVZFTlRfTElTVEVORVJdLmFwcGx5KHRoaXMsIFtldmVudE5hbWUsIGRlbGVnYXRlLCB0YXNrLm9wdGlvbnNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZm9yIG5hdGl2ZSB0b1N0cmluZyBwYXRjaFxuICAgIGF0dGFjaE9yaWdpblRvUGF0Y2hlZChwcm90b1tBRERfRVZFTlRfTElTVEVORVJdLCBuYXRpdmVBZGRFdmVudExpc3RlbmVyKTtcbiAgICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQocHJvdG9bUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXSwgbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lcik7XG4gICAgaWYgKG5hdGl2ZVJlbW92ZUFsbExpc3RlbmVycykge1xuICAgICAgYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHByb3RvW1JFTU9WRV9BTExfTElTVEVORVJTX0VWRU5UX0xJU1RFTkVSXSwgbmF0aXZlUmVtb3ZlQWxsTGlzdGVuZXJzKTtcbiAgICB9XG4gICAgaWYgKG5hdGl2ZUxpc3RlbmVycykge1xuICAgICAgYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHByb3RvW0xJU1RFTkVSU19FVkVOVF9MSVNURU5FUl0sIG5hdGl2ZUxpc3RlbmVycyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXBpcy5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdHNbaV0gPSBwYXRjaEV2ZW50VGFyZ2V0TWV0aG9kcyhhcGlzW2ldLCBwYXRjaE9wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRXZlbnRUYXNrcyh0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcpOiBUYXNrW10ge1xuICBjb25zdCBmb3VuZFRhc2tzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGxldCBwcm9wIGluIHRhcmdldCkge1xuICAgIGNvbnN0IG1hdGNoID0gRVZFTlRfTkFNRV9TWU1CT0xfUkVHWC5leGVjKHByb3ApO1xuICAgIGxldCBldnROYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV07XG4gICAgaWYgKGV2dE5hbWUgJiYgKCFldmVudE5hbWUgfHwgZXZ0TmFtZSA9PT0gZXZlbnROYW1lKSkge1xuICAgICAgY29uc3QgdGFza3M6IGFueSA9IHRhcmdldFtwcm9wXTtcbiAgICAgIGlmICh0YXNrcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm91bmRUYXNrcy5wdXNoKHRhc2tzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZm91bmRUYXNrcztcbn1cbiJdfQ==