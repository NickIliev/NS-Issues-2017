/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis}
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneSymbol = function (n) { return "__zone_symbol__" + n; };
var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = Zone.current.wrap(args[i], source + '_' + i);
        }
    }
    return args;
}
exports.bindArguments = bindArguments;
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
exports.patchPrototype = patchPrototype;
exports.isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidently browserify
// this code.
exports.isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
exports.isBrowser = !exports.isNode && !exports.isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidently browserify
// this code.
exports.isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !exports.isWebWorker &&
    !!(typeof window !== 'undefined' && window['HTMLElement']);
function patchProperty(obj, prop, prototype) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = Object.getOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var _prop = exports.zoneSymbol('_' + prop);
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[_prop];
        if (previousValue) {
            target.removeEventListener(eventName, previousValue);
        }
        if (typeof newValue === 'function') {
            var wrapFn = function (event) {
                var result = newValue.apply(this, arguments);
                if (result != undefined && !result) {
                    event.preventDefault();
                }
                return result;
            };
            target[_prop] = wrapFn;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[_prop] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        if (target.hasOwnProperty(_prop)) {
            return target[_prop];
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.apply(this);
            if (value) {
                desc.set.apply(this, [value]);
                if (typeof target['removeAttribute'] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    Object.defineProperty(obj, prop, desc);
}
exports.patchProperty = patchProperty;
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
exports.patchOnProperties = patchOnProperties;
var EVENT_TASKS = exports.zoneSymbol('eventTasks');
// For EventTarget
var ADD_EVENT_LISTENER = 'addEventListener';
var REMOVE_EVENT_LISTENER = 'removeEventListener';
// compare the EventListenerOptionsOrCapture
// 1. if the options is usCapture: boolean, compare the useCpature values directly
// 2. if the options is EventListerOptions, only compare the capture
function compareEventListenerOptions(left, right) {
    var leftCapture = (typeof left === 'boolean') ?
        left :
        ((typeof left === 'object') ? (left && left.capture) : false);
    var rightCapture = (typeof right === 'boolean') ?
        right :
        ((typeof right === 'object') ? (right && right.capture) : false);
    return !!leftCapture === !!rightCapture;
}
function findExistingRegisteredTask(target, handler, name, options, remove) {
    var eventTasks = target[EVENT_TASKS];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var listener = data.handler;
            if ((data.handler === handler || listener.listener === handler) &&
                compareEventListenerOptions(data.options, options) && data.eventName === name) {
                if (remove) {
                    eventTasks.splice(i, 1);
                }
                return eventTask;
            }
        }
    }
    return null;
}
function findAllExistingRegisteredTasks(target, name, remove) {
    var eventTasks = target[EVENT_TASKS];
    if (eventTasks) {
        var result = [];
        for (var i = eventTasks.length - 1; i >= 0; i--) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            if (data.eventName === name) {
                result.push(eventTask);
                if (remove) {
                    eventTasks.splice(i, 1);
                }
            }
        }
        return result;
    }
    return null;
}
function attachRegisteredEvent(target, eventTask, isPrepend) {
    var eventTasks = target[EVENT_TASKS];
    if (!eventTasks) {
        eventTasks = target[EVENT_TASKS] = [];
    }
    if (isPrepend) {
        eventTasks.unshift(eventTask);
    }
    else {
        eventTasks.push(eventTask);
    }
}
var defaultListenerMetaCreator = function (self, args) {
    return {
        options: args[2],
        eventName: args[0],
        handler: args[1],
        target: self || _global,
        name: args[0],
        crossContext: false,
        invokeAddFunc: function (addFnSymbol, delegate) {
            // check if the data is cross site context, if it is, fallback to
            // remove the delegate directly and try catch error
            if (!this.crossContext) {
                if (delegate && delegate.invoke) {
                    return this.target[addFnSymbol](this.eventName, delegate.invoke, this.options);
                }
                else {
                    return this.target[addFnSymbol](this.eventName, delegate, this.options);
                }
            }
            else {
                // add a if/else branch here for performance concern, for most times
                // cross site context is false, so we don't need to try/catch
                try {
                    return this.target[addFnSymbol](this.eventName, delegate, this.options);
                }
                catch (err) {
                    // do nothing here is fine, because objects in a cross-site context are unusable
                }
            }
        },
        invokeRemoveFunc: function (removeFnSymbol, delegate) {
            // check if the data is cross site context, if it is, fallback to
            // remove the delegate directly and try catch error
            if (!this.crossContext) {
                if (delegate && delegate.invoke) {
                    return this.target[removeFnSymbol](this.eventName, delegate.invoke, this.options);
                }
                else {
                    return this.target[removeFnSymbol](this.eventName, delegate, this.options);
                }
            }
            else {
                // add a if/else branch here for performance concern, for most times
                // cross site context is false, so we don't need to try/catch
                try {
                    return this.target[removeFnSymbol](this.eventName, delegate, this.options);
                }
                catch (err) {
                    // do nothing here is fine, because objects in a cross-site context are unusable
                }
            }
        }
    };
};
function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates, isPrepend, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (allowDuplicates === void 0) { allowDuplicates = false; }
    if (isPrepend === void 0) { isPrepend = false; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var addFnSymbol = exports.zoneSymbol(addFnName);
    var removeFnSymbol = exports.zoneSymbol(removeFnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    function scheduleEventListener(eventTask) {
        var meta = eventTask.data;
        attachRegisteredEvent(meta.target, eventTask, isPrepend);
        return meta.invokeAddFunc(addFnSymbol, eventTask);
    }
    function cancelEventListener(eventTask) {
        var meta = eventTask.data;
        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.options, true);
        return meta.invokeRemoveFunc(removeFnSymbol, eventTask);
    }
    return function zoneAwareAddListener(self, args) {
        var data = metaCreator(self, args);
        data.options = data.options || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var delegate = null;
        if (typeof data.handler == 'function') {
            delegate = data.handler;
        }
        else if (data.handler && data.handler.handleEvent) {
            delegate = function (event) { return data.handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
        }
        catch (error) {
            // we can still try to add the data.handler even we are in cross site context
            data.crossContext = true;
            return data.invokeAddFunc(addFnSymbol, data.handler);
        }
        // Ignore special listeners of IE11 & Edge dev tools, see
        // https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return data.invokeAddFunc(addFnSymbol, data.handler);
        }
        if (!allowDuplicates) {
            var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.options, false);
            if (eventTask) {
                // we already registered, so this will have noop.
                return data.invokeAddFunc(addFnSymbol, eventTask);
            }
        }
        var zone = Zone.current;
        var source = data.target.constructor['name'] + '.' + addFnName + ':' + data.eventName;
        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
    };
}
exports.makeZoneAwareAddListener = makeZoneAwareAddListener;
function makeZoneAwareRemoveListener(fnName, useCapturingParam, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var symbol = exports.zoneSymbol(fnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    return function zoneAwareRemoveListener(self, args) {
        var data = metaCreator(self, args);
        data.options = data.options || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var delegate = null;
        if (typeof data.handler == 'function') {
            delegate = data.handler;
        }
        else if (data.handler && data.handler.handleEvent) {
            delegate = function (event) { return data.handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
        }
        catch (error) {
            data.crossContext = true;
            return data.invokeRemoveFunc(symbol, data.handler);
        }
        // Ignore special listeners of IE11 & Edge dev tools, see
        // https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return data.invokeRemoveFunc(symbol, data.handler);
        }
        var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.options, true);
        if (eventTask) {
            eventTask.zone.cancelTask(eventTask);
        }
        else {
            data.invokeRemoveFunc(symbol, data.handler);
        }
    };
}
exports.makeZoneAwareRemoveListener = makeZoneAwareRemoveListener;
function makeZoneAwareRemoveAllListeners(fnName) {
    var symbol = exports.zoneSymbol(fnName);
    return function zoneAwareRemoveAllListener(self, args) {
        var target = self || _global;
        if (args.length === 0) {
            // remove all listeners without eventName
            target[EVENT_TASKS] = [];
            // we don't cancel Task either, because call native eventEmitter.removeAllListeners will
            // will do remove listener(cancelTask) for us
            target[symbol]();
            return;
        }
        var eventName = args[0];
        // call this function just remove the related eventTask from target[EVENT_TASKS]
        // we don't need useCapturing here because useCapturing is just for DOM, and
        // removeAllListeners should only be called by node eventEmitter
        // and we don't cancel Task either, because call native eventEmitter.removeAllListeners will
        // will do remove listener(cancelTask) for us
        findAllExistingRegisteredTasks(target, eventName, true);
        target[symbol](eventName);
    };
}
exports.makeZoneAwareRemoveAllListeners = makeZoneAwareRemoveAllListeners;
function makeZoneAwareListeners(fnName) {
    return function zoneAwareEventListeners(self, args) {
        var eventName = args[0];
        var target = self || _global;
        if (!target[EVENT_TASKS]) {
            return [];
        }
        return target[EVENT_TASKS]
            .filter(function (task) { return task.data['eventName'] === eventName; })
            .map(function (task) { return task.data['handler']; });
    };
}
exports.makeZoneAwareListeners = makeZoneAwareListeners;
function patchEventTargetMethods(obj, addFnName, removeFnName, metaCreator) {
    if (addFnName === void 0) { addFnName = ADD_EVENT_LISTENER; }
    if (removeFnName === void 0) { removeFnName = REMOVE_EVENT_LISTENER; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    if (obj && obj[addFnName]) {
        patchMethod(obj, addFnName, function () { return makeZoneAwareAddListener(addFnName, removeFnName, true, false, false, metaCreator); });
        patchMethod(obj, removeFnName, function () { return makeZoneAwareRemoveListener(removeFnName, true, metaCreator); });
        return true;
    }
    else {
        return false;
    }
}
exports.patchEventTargetMethods = patchEventTargetMethods;
var originalInstanceKey = exports.zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[exports.zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                Object.defineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
exports.patchClass = patchClass;
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = Object.getPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = exports.zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        var patchDelegate_1 = patchFn(delegate, delegateName, name);
        proto[name] = function () {
            return patchDelegate_1(this, arguments);
        };
        attachOriginToPatched(proto[name], delegate);
    }
    return delegate;
}
exports.patchMethod = patchMethod;
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.callbackIndex] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.callbackIndex >= 0 && typeof args[meta.callbackIndex] === 'function') {
            var task = Zone.current.scheduleMacroTask(meta.name, args[meta.callbackIndex], meta, scheduleTask, null);
            return task;
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}
exports.patchMacroTask = patchMacroTask;
function patchMicroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.callbackIndex] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.callbackIndex >= 0 && typeof args[meta.callbackIndex] === 'function') {
            var task = Zone.current.scheduleMicroTask(meta.name, args[meta.callbackIndex], meta, scheduleTask);
            return task;
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}
exports.patchMicroTask = patchMicroTask;
function findEventTask(target, evtName) {
    var eventTasks = target[exports.zoneSymbol('eventTasks')];
    var result = [];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var eventName = data && data.eventName;
            if (eventName === evtName) {
                result.push(eventTask);
            }
        }
    }
    return result;
}
exports.findEventTask = findEventTask;
function attachOriginToPatched(patched, original) {
    patched[exports.zoneSymbol('OriginalDelegate')] = original;
}
exports.attachOriginToPatched = attachOriginToPatched;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSDs7OztHQUlHOzs7QUFLVSxRQUFBLFVBQVUsR0FBNkIsVUFBQyxDQUFDLElBQUssT0FBQSxvQkFBa0IsQ0FBRyxFQUFyQixDQUFxQixDQUFDO0FBQ2pGLElBQU0sT0FBTyxHQUNULE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUM7QUFFdkYsdUJBQThCLElBQVcsRUFBRSxNQUFjO0lBQ3ZELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBUEQsc0NBT0M7QUFFRCx3QkFBK0IsU0FBYyxFQUFFLE9BQWlCO0lBQzlELElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3BDLENBQUM7UUFDUixJQUFNLE1BQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQUksQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLFFBQVEs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R0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0MsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDNUIsSUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFVLElBQUssQ0FBQyxTQUFTLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBZEQsc0NBY0M7QUFFRCwrQkFBc0MsT0FBaUIsRUFBRSxRQUFhO0lBQ25FLE9BQWUsQ0FBQyxrQkFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDOUQsQ0FBQztBQUZELHNEQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBTdXBwcmVzcyBjbG9zdXJlIGNvbXBpbGVyIGVycm9ycyBhYm91dCB1bmtub3duICdab25lJyB2YXJpYWJsZVxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHt1bmRlZmluZWRWYXJzLGdsb2JhbFRoaXN9XG4gKi9cblxuLy8gSGFjayBzaW5jZSBUeXBlU2NyaXB0IGlzbid0IGNvbXBpbGluZyB0aGlzIGZvciBhIHdvcmtlci5cbmRlY2xhcmUgY29uc3QgV29ya2VyR2xvYmFsU2NvcGU6IGFueTtcblxuZXhwb3J0IGNvbnN0IHpvbmVTeW1ib2w6IChuYW1lOiBzdHJpbmcpID0+IHN0cmluZyA9IChuKSA9PiBgX196b25lX3N5bWJvbF9fJHtufWA7XG5jb25zdCBfZ2xvYmFsOiBhbnkgPVxuICAgIHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdyB8fCB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcgJiYgc2VsZiB8fCBnbG9iYWw7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQXJndW1lbnRzKGFyZ3M6IGFueVtdLCBzb3VyY2U6IHN0cmluZyk6IGFueVtdIHtcbiAgZm9yIChsZXQgaSA9IGFyZ3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAodHlwZW9mIGFyZ3NbaV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFyZ3NbaV0gPSBab25lLmN1cnJlbnQud3JhcChhcmdzW2ldLCBzb3VyY2UgKyAnXycgKyBpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFyZ3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaFByb3RvdHlwZShwcm90b3R5cGU6IGFueSwgZm5OYW1lczogc3RyaW5nW10pIHtcbiAgY29uc3Qgc291cmNlID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yWyduYW1lJ107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm5OYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG5hbWUgPSBmbk5hbWVzW2ldO1xuICAgIGNvbnN0IGRlbGVnYXRlID0gcHJvdG90eXBlW25hbWVdO1xuICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgcHJvdG90eXBlW25hbWVdID0gKChkZWxlZ2F0ZTogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgcGF0Y2hlZDogYW55ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLmFwcGx5KHRoaXMsIGJpbmRBcmd1bWVudHMoPGFueT5hcmd1bWVudHMsIHNvdXJjZSArICcuJyArIG5hbWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHBhdGNoZWQsIGRlbGVnYXRlKTtcbiAgICAgICAgcmV0dXJuIHBhdGNoZWQ7XG4gICAgICB9KShkZWxlZ2F0ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBpc1dlYldvcmtlcjogYm9vbGVhbiA9XG4gICAgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKTtcblxuLy8gTWFrZSBzdXJlIHRvIGFjY2VzcyBgcHJvY2Vzc2AgdGhyb3VnaCBgX2dsb2JhbGAgc28gdGhhdCBXZWJQYWNrIGRvZXMgbm90IGFjY2lkZW50bHkgYnJvd3NlcmlmeVxuLy8gdGhpcyBjb2RlLlxuZXhwb3J0IGNvbnN0IGlzTm9kZTogYm9vbGVhbiA9XG4gICAgKCEoJ253JyBpbiBfZ2xvYmFsKSAmJiB0eXBlb2YgX2dsb2JhbC5wcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICB7fS50b1N0cmluZy5jYWxsKF9nbG9iYWwucHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJyk7XG5cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXI6IGJvb2xlYW4gPVxuICAgICFpc05vZGUgJiYgIWlzV2ViV29ya2VyICYmICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICh3aW5kb3cgYXMgYW55KVsnSFRNTEVsZW1lbnQnXSk7XG5cbi8vIHdlIGFyZSBpbiBlbGVjdHJvbiBvZiBudywgc28gd2UgYXJlIGJvdGggYnJvd3NlciBhbmQgbm9kZWpzXG4vLyBNYWtlIHN1cmUgdG8gYWNjZXNzIGBwcm9jZXNzYCB0aHJvdWdoIGBfZ2xvYmFsYCBzbyB0aGF0IFdlYlBhY2sgZG9lcyBub3QgYWNjaWRlbnRseSBicm93c2VyaWZ5XG4vLyB0aGlzIGNvZGUuXG5leHBvcnQgY29uc3QgaXNNaXg6IGJvb2xlYW4gPSB0eXBlb2YgX2dsb2JhbC5wcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHt9LnRvU3RyaW5nLmNhbGwoX2dsb2JhbC5wcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nICYmICFpc1dlYldvcmtlciAmJlxuICAgICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICh3aW5kb3cgYXMgYW55KVsnSFRNTEVsZW1lbnQnXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaFByb3BlcnR5KG9iajogYW55LCBwcm9wOiBzdHJpbmcsIHByb3RvdHlwZT86IGFueSkge1xuICBsZXQgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcbiAgaWYgKCFkZXNjICYmIHByb3RvdHlwZSkge1xuICAgIC8vIHdoZW4gcGF0Y2ggd2luZG93IG9iamVjdCwgdXNlIHByb3RvdHlwZSB0byBjaGVjayBwcm9wIGV4aXN0IG9yIG5vdFxuICAgIGNvbnN0IHByb3RvdHlwZURlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvcCk7XG4gICAgaWYgKHByb3RvdHlwZURlc2MpIHtcbiAgICAgIGRlc2MgPSB7ZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfTtcbiAgICB9XG4gIH1cbiAgLy8gaWYgdGhlIGRlc2NyaXB0b3Igbm90IGV4aXN0cyBvciBpcyBub3QgY29uZmlndXJhYmxlXG4gIC8vIGp1c3QgcmV0dXJuXG4gIGlmICghZGVzYyB8fCAhZGVzYy5jb25maWd1cmFibGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBBIHByb3BlcnR5IGRlc2NyaXB0b3IgY2Fubm90IGhhdmUgZ2V0dGVyL3NldHRlciBhbmQgYmUgd3JpdGFibGVcbiAgLy8gZGVsZXRpbmcgdGhlIHdyaXRhYmxlIGFuZCB2YWx1ZSBwcm9wZXJ0aWVzIGF2b2lkcyB0aGlzIGVycm9yOlxuICAvL1xuICAvLyBUeXBlRXJyb3I6IHByb3BlcnR5IGRlc2NyaXB0b3JzIG11c3Qgbm90IHNwZWNpZnkgYSB2YWx1ZSBvciBiZSB3cml0YWJsZSB3aGVuIGFcbiAgLy8gZ2V0dGVyIG9yIHNldHRlciBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgZGVsZXRlIGRlc2Mud3JpdGFibGU7XG4gIGRlbGV0ZSBkZXNjLnZhbHVlO1xuICBjb25zdCBvcmlnaW5hbERlc2NHZXQgPSBkZXNjLmdldDtcblxuICAvLyBzdWJzdHIoMikgY3V6ICdvbmNsaWNrJyAtPiAnY2xpY2snLCBldGNcbiAgY29uc3QgZXZlbnROYW1lID0gcHJvcC5zdWJzdHIoMik7XG4gIGNvbnN0IF9wcm9wID0gem9uZVN5bWJvbCgnXycgKyBwcm9wKTtcblxuICBkZXNjLnNldCA9IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgLy8gaW4gc29tZSBvZiB3aW5kb3dzJ3Mgb25wcm9wZXJ0eSBjYWxsYmFjaywgdGhpcyBpcyB1bmRlZmluZWRcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIGNoZWNrIGl0XG4gICAgbGV0IHRhcmdldCA9IHRoaXM7XG4gICAgaWYgKCF0YXJnZXQgJiYgb2JqID09PSBfZ2xvYmFsKSB7XG4gICAgICB0YXJnZXQgPSBfZ2xvYmFsO1xuICAgIH1cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJldmlvdXNWYWx1ZSA9IHRhcmdldFtfcHJvcF07XG4gICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgcHJldmlvdXNWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgd3JhcEZuID0gZnVuY3Rpb24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXdWYWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgIGlmIChyZXN1bHQgIT0gdW5kZWZpbmVkICYmICFyZXN1bHQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuXG4gICAgICB0YXJnZXRbX3Byb3BdID0gd3JhcEZuO1xuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwRm4sIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0W19wcm9wXSA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFRoZSBnZXR0ZXIgd291bGQgcmV0dXJuIHVuZGVmaW5lZCBmb3IgdW5hc3NpZ25lZCBwcm9wZXJ0aWVzIGJ1dCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhblxuICAvLyB1bmFzc2lnbmVkIHByb3BlcnR5IGlzIG51bGxcbiAgZGVzYy5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBpbiBzb21lIG9mIHdpbmRvd3MncyBvbnByb3BlcnR5IGNhbGxiYWNrLCB0aGlzIGlzIHVuZGVmaW5lZFxuICAgIC8vIHNvIHdlIG5lZWQgdG8gY2hlY2sgaXRcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAoIXRhcmdldCAmJiBvYmogPT09IF9nbG9iYWwpIHtcbiAgICAgIHRhcmdldCA9IF9nbG9iYWw7XG4gICAgfVxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eShfcHJvcCkpIHtcbiAgICAgIHJldHVybiB0YXJnZXRbX3Byb3BdO1xuICAgIH0gZWxzZSBpZiAob3JpZ2luYWxEZXNjR2V0KSB7XG4gICAgICAvLyByZXN1bHQgd2lsbCBiZSBudWxsIHdoZW4gdXNlIGlubGluZSBldmVudCBhdHRyaWJ1dGUsXG4gICAgICAvLyBzdWNoIGFzIDxidXR0b24gb25jbGljaz1cImZ1bmMoKTtcIj5PSzwvYnV0dG9uPlxuICAgICAgLy8gYmVjYXVzZSB0aGUgb25jbGljayBmdW5jdGlvbiBpcyBpbnRlcm5hbCByYXcgdW5jb21waWxlZCBoYW5kbGVyXG4gICAgICAvLyB0aGUgb25jbGljayB3aWxsIGJlIGV2YWx1YXRlZCB3aGVuIGZpcnN0IHRpbWUgZXZlbnQgd2FzIHRyaWdnZXJlZCBvclxuICAgICAgLy8gdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkLCBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci96b25lLmpzL2lzc3Vlcy81MjVcbiAgICAgIC8vIHNvIHdlIHNob3VsZCB1c2Ugb3JpZ2luYWwgbmF0aXZlIGdldCB0byByZXRyaWV2ZSB0aGUgaGFuZGxlclxuICAgICAgbGV0IHZhbHVlID0gb3JpZ2luYWxEZXNjR2V0ICYmIG9yaWdpbmFsRGVzY0dldC5hcHBseSh0aGlzKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBkZXNjLnNldC5hcHBseSh0aGlzLCBbdmFsdWVdKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbJ3JlbW92ZUF0dHJpYnV0ZSddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hPblByb3BlcnRpZXMob2JqOiBhbnksIHByb3BlcnRpZXM6IHN0cmluZ1tdLCBwcm90b3R5cGU/OiBhbnkpIHtcbiAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhdGNoUHJvcGVydHkob2JqLCAnb24nICsgcHJvcGVydGllc1tpXSwgcHJvdG90eXBlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgb25Qcm9wZXJ0aWVzID0gW107XG4gICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikge1xuICAgICAgaWYgKHByb3Auc3Vic3RyKDAsIDIpID09ICdvbicpIHtcbiAgICAgICAgb25Qcm9wZXJ0aWVzLnB1c2gocHJvcCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgb25Qcm9wZXJ0aWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBwYXRjaFByb3BlcnR5KG9iaiwgb25Qcm9wZXJ0aWVzW2pdLCBwcm90b3R5cGUpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBFVkVOVF9UQVNLUyA9IHpvbmVTeW1ib2woJ2V2ZW50VGFza3MnKTtcblxuLy8gRm9yIEV2ZW50VGFyZ2V0XG5jb25zdCBBRERfRVZFTlRfTElTVEVORVIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5jb25zdCBSRU1PVkVfRVZFTlRfTElTVEVORVIgPSAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmVzdGVkRXZlbnRMaXN0ZW5lciB7IGxpc3RlbmVyPzogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDsgfVxuXG5leHBvcnQgZGVjbGFyZSB0eXBlIE5lc3RlZEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgPVxuICAgIE5lc3RlZEV2ZW50TGlzdGVuZXIgfCBFdmVudExpc3RlbmVyIHwgRXZlbnRMaXN0ZW5lck9iamVjdDtcblxuZXhwb3J0IGludGVyZmFjZSBFdmVudExpc3RlbmVyT3B0aW9ucyB7IGNhcHR1cmU/OiBib29sZWFuOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMgZXh0ZW5kcyBFdmVudExpc3RlbmVyT3B0aW9ucyB7XG4gIHBhc3NpdmU/OiBib29sZWFuO1xuICBvbmNlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgdHlwZSBFdmVudExpc3RlbmVyT3B0aW9uc09yQ2FwdHVyZSA9XG4gICAgRXZlbnRMaXN0ZW5lck9wdGlvbnMgfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlzdGVuZXJUYXNrTWV0YSBleHRlbmRzIFRhc2tEYXRhIHtcbiAgb3B0aW9uczogRXZlbnRMaXN0ZW5lck9wdGlvbnNPckNhcHR1cmU7XG4gIGV2ZW50TmFtZTogc3RyaW5nO1xuICBoYW5kbGVyOiBOZXN0ZWRFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xuICB0YXJnZXQ6IGFueTtcbiAgbmFtZTogc3RyaW5nO1xuICBjcm9zc0NvbnRleHQ6IGJvb2xlYW47XG4gIGludm9rZUFkZEZ1bmM6IChhZGRGblN5bWJvbDogYW55LCBkZWxlZ2F0ZTogVGFza3xOZXN0ZWRFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSA9PiBhbnk7XG4gIGludm9rZVJlbW92ZUZ1bmM6XG4gICAgICAocmVtb3ZlRm5TeW1ib2w6IGFueSwgZGVsZWdhdGU6IFRhc2t8TmVzdGVkRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCkgPT4gYW55O1xufVxuXG4vLyBjb21wYXJlIHRoZSBFdmVudExpc3RlbmVyT3B0aW9uc09yQ2FwdHVyZVxuLy8gMS4gaWYgdGhlIG9wdGlvbnMgaXMgdXNDYXB0dXJlOiBib29sZWFuLCBjb21wYXJlIHRoZSB1c2VDcGF0dXJlIHZhbHVlcyBkaXJlY3RseVxuLy8gMi4gaWYgdGhlIG9wdGlvbnMgaXMgRXZlbnRMaXN0ZXJPcHRpb25zLCBvbmx5IGNvbXBhcmUgdGhlIGNhcHR1cmVcbmZ1bmN0aW9uIGNvbXBhcmVFdmVudExpc3RlbmVyT3B0aW9ucyhcbiAgICBsZWZ0OiBFdmVudExpc3RlbmVyT3B0aW9uc09yQ2FwdHVyZSwgcmlnaHQ6IEV2ZW50TGlzdGVuZXJPcHRpb25zT3JDYXB0dXJlKTogYm9vbGVhbiB7XG4gIGNvbnN0IGxlZnRDYXB0dXJlOiBhbnkgPSAodHlwZW9mIGxlZnQgPT09ICdib29sZWFuJykgP1xuICAgICAgbGVmdCA6XG4gICAgICAoKHR5cGVvZiBsZWZ0ID09PSAnb2JqZWN0JykgPyAobGVmdCAmJiBsZWZ0LmNhcHR1cmUpIDogZmFsc2UpO1xuICBjb25zdCByaWdodENhcHR1cmU6IGFueSA9ICh0eXBlb2YgcmlnaHQgPT09ICdib29sZWFuJykgP1xuICAgICAgcmlnaHQgOlxuICAgICAgKCh0eXBlb2YgcmlnaHQgPT09ICdvYmplY3QnKSA/IChyaWdodCAmJiByaWdodC5jYXB0dXJlKSA6IGZhbHNlKTtcbiAgcmV0dXJuICEhbGVmdENhcHR1cmUgPT09ICEhcmlnaHRDYXB0dXJlO1xufVxuXG5mdW5jdGlvbiBmaW5kRXhpc3RpbmdSZWdpc3RlcmVkVGFzayhcbiAgICB0YXJnZXQ6IGFueSwgaGFuZGxlcjogYW55LCBuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IEV2ZW50TGlzdGVuZXJPcHRpb25zT3JDYXB0dXJlLFxuICAgIHJlbW92ZTogYm9vbGVhbik6IFRhc2sge1xuICBjb25zdCBldmVudFRhc2tzOiBUYXNrW10gPSB0YXJnZXRbRVZFTlRfVEFTS1NdO1xuICBpZiAoZXZlbnRUYXNrcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRUYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZXZlbnRUYXNrID0gZXZlbnRUYXNrc1tpXTtcbiAgICAgIGNvbnN0IGRhdGEgPSA8TGlzdGVuZXJUYXNrTWV0YT5ldmVudFRhc2suZGF0YTtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gPE5lc3RlZEV2ZW50TGlzdGVuZXI+ZGF0YS5oYW5kbGVyO1xuICAgICAgaWYgKChkYXRhLmhhbmRsZXIgPT09IGhhbmRsZXIgfHwgbGlzdGVuZXIubGlzdGVuZXIgPT09IGhhbmRsZXIpICYmXG4gICAgICAgICAgY29tcGFyZUV2ZW50TGlzdGVuZXJPcHRpb25zKGRhdGEub3B0aW9ucywgb3B0aW9ucykgJiYgZGF0YS5ldmVudE5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgIGV2ZW50VGFza3Muc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudFRhc2s7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxsRXhpc3RpbmdSZWdpc3RlcmVkVGFza3ModGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZywgcmVtb3ZlOiBib29sZWFuKTogVGFza1tdIHtcbiAgY29uc3QgZXZlbnRUYXNrczogVGFza1tdID0gdGFyZ2V0W0VWRU5UX1RBU0tTXTtcbiAgaWYgKGV2ZW50VGFza3MpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gZXZlbnRUYXNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgZXZlbnRUYXNrID0gZXZlbnRUYXNrc1tpXTtcbiAgICAgIGNvbnN0IGRhdGEgPSA8TGlzdGVuZXJUYXNrTWV0YT5ldmVudFRhc2suZGF0YTtcbiAgICAgIGlmIChkYXRhLmV2ZW50TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXN1bHQucHVzaChldmVudFRhc2spO1xuICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgZXZlbnRUYXNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gYXR0YWNoUmVnaXN0ZXJlZEV2ZW50KHRhcmdldDogYW55LCBldmVudFRhc2s6IFRhc2ssIGlzUHJlcGVuZDogYm9vbGVhbik6IHZvaWQge1xuICBsZXQgZXZlbnRUYXNrczogVGFza1tdID0gdGFyZ2V0W0VWRU5UX1RBU0tTXTtcbiAgaWYgKCFldmVudFRhc2tzKSB7XG4gICAgZXZlbnRUYXNrcyA9IHRhcmdldFtFVkVOVF9UQVNLU10gPSBbXTtcbiAgfVxuICBpZiAoaXNQcmVwZW5kKSB7XG4gICAgZXZlbnRUYXNrcy51bnNoaWZ0KGV2ZW50VGFzayk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnRUYXNrcy5wdXNoKGV2ZW50VGFzayk7XG4gIH1cbn1cblxuY29uc3QgZGVmYXVsdExpc3RlbmVyTWV0YUNyZWF0b3IgPSAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9wdGlvbnM6IGFyZ3NbMl0sXG4gICAgZXZlbnROYW1lOiBhcmdzWzBdLFxuICAgIGhhbmRsZXI6IGFyZ3NbMV0sXG4gICAgdGFyZ2V0OiBzZWxmIHx8IF9nbG9iYWwsXG4gICAgbmFtZTogYXJnc1swXSxcbiAgICBjcm9zc0NvbnRleHQ6IGZhbHNlLFxuICAgIGludm9rZUFkZEZ1bmM6IGZ1bmN0aW9uKFxuICAgICAgICBhZGRGblN5bWJvbDogYW55LCBkZWxlZ2F0ZTogVGFza3xOZXN0ZWRFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgZGF0YSBpcyBjcm9zcyBzaXRlIGNvbnRleHQsIGlmIGl0IGlzLCBmYWxsYmFjayB0b1xuICAgICAgLy8gcmVtb3ZlIHRoZSBkZWxlZ2F0ZSBkaXJlY3RseSBhbmQgdHJ5IGNhdGNoIGVycm9yXG4gICAgICBpZiAoIXRoaXMuY3Jvc3NDb250ZXh0KSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSAmJiAoPFRhc2s+ZGVsZWdhdGUpLmludm9rZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldFthZGRGblN5bWJvbF0odGhpcy5ldmVudE5hbWUsICg8VGFzaz5kZWxlZ2F0ZSkuaW52b2tlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldFthZGRGblN5bWJvbF0odGhpcy5ldmVudE5hbWUsIGRlbGVnYXRlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgYSBpZi9lbHNlIGJyYW5jaCBoZXJlIGZvciBwZXJmb3JtYW5jZSBjb25jZXJuLCBmb3IgbW9zdCB0aW1lc1xuICAgICAgICAvLyBjcm9zcyBzaXRlIGNvbnRleHQgaXMgZmFsc2UsIHNvIHdlIGRvbid0IG5lZWQgdG8gdHJ5L2NhdGNoXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0W2FkZEZuU3ltYm9sXSh0aGlzLmV2ZW50TmFtZSwgZGVsZWdhdGUsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmcgaGVyZSBpcyBmaW5lLCBiZWNhdXNlIG9iamVjdHMgaW4gYSBjcm9zcy1zaXRlIGNvbnRleHQgYXJlIHVudXNhYmxlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGludm9rZVJlbW92ZUZ1bmM6IGZ1bmN0aW9uKFxuICAgICAgICByZW1vdmVGblN5bWJvbDogYW55LCBkZWxlZ2F0ZTogVGFza3xOZXN0ZWRFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgZGF0YSBpcyBjcm9zcyBzaXRlIGNvbnRleHQsIGlmIGl0IGlzLCBmYWxsYmFjayB0b1xuICAgICAgLy8gcmVtb3ZlIHRoZSBkZWxlZ2F0ZSBkaXJlY3RseSBhbmQgdHJ5IGNhdGNoIGVycm9yXG4gICAgICBpZiAoIXRoaXMuY3Jvc3NDb250ZXh0KSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSAmJiAoPFRhc2s+ZGVsZWdhdGUpLmludm9rZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldFtyZW1vdmVGblN5bWJvbF0odGhpcy5ldmVudE5hbWUsICg8VGFzaz5kZWxlZ2F0ZSkuaW52b2tlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldFtyZW1vdmVGblN5bWJvbF0odGhpcy5ldmVudE5hbWUsIGRlbGVnYXRlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgYSBpZi9lbHNlIGJyYW5jaCBoZXJlIGZvciBwZXJmb3JtYW5jZSBjb25jZXJuLCBmb3IgbW9zdCB0aW1lc1xuICAgICAgICAvLyBjcm9zcyBzaXRlIGNvbnRleHQgaXMgZmFsc2UsIHNvIHdlIGRvbid0IG5lZWQgdG8gdHJ5L2NhdGNoXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0W3JlbW92ZUZuU3ltYm9sXSh0aGlzLmV2ZW50TmFtZSwgZGVsZWdhdGUsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmcgaGVyZSBpcyBmaW5lLCBiZWNhdXNlIG9iamVjdHMgaW4gYSBjcm9zcy1zaXRlIGNvbnRleHQgYXJlIHVudXNhYmxlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVpvbmVBd2FyZUFkZExpc3RlbmVyKFxuICAgIGFkZEZuTmFtZTogc3RyaW5nLCByZW1vdmVGbk5hbWU6IHN0cmluZywgdXNlQ2FwdHVyaW5nUGFyYW06IGJvb2xlYW4gPSB0cnVlLFxuICAgIGFsbG93RHVwbGljYXRlczogYm9vbGVhbiA9IGZhbHNlLCBpc1ByZXBlbmQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBtZXRhQ3JlYXRvcjogKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IExpc3RlbmVyVGFza01ldGEgPSBkZWZhdWx0TGlzdGVuZXJNZXRhQ3JlYXRvcikge1xuICBjb25zdCBhZGRGblN5bWJvbCA9IHpvbmVTeW1ib2woYWRkRm5OYW1lKTtcbiAgY29uc3QgcmVtb3ZlRm5TeW1ib2wgPSB6b25lU3ltYm9sKHJlbW92ZUZuTmFtZSk7XG4gIGNvbnN0IGRlZmF1bHRVc2VDYXB0dXJpbmcgPSB1c2VDYXB0dXJpbmdQYXJhbSA/IGZhbHNlIDogdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlRXZlbnRMaXN0ZW5lcihldmVudFRhc2s6IFRhc2spOiBhbnkge1xuICAgIGNvbnN0IG1ldGEgPSA8TGlzdGVuZXJUYXNrTWV0YT5ldmVudFRhc2suZGF0YTtcbiAgICBhdHRhY2hSZWdpc3RlcmVkRXZlbnQobWV0YS50YXJnZXQsIGV2ZW50VGFzaywgaXNQcmVwZW5kKTtcbiAgICByZXR1cm4gbWV0YS5pbnZva2VBZGRGdW5jKGFkZEZuU3ltYm9sLCBldmVudFRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsRXZlbnRMaXN0ZW5lcihldmVudFRhc2s6IFRhc2spOiB2b2lkIHtcbiAgICBjb25zdCBtZXRhID0gPExpc3RlbmVyVGFza01ldGE+ZXZlbnRUYXNrLmRhdGE7XG4gICAgZmluZEV4aXN0aW5nUmVnaXN0ZXJlZFRhc2sobWV0YS50YXJnZXQsIGV2ZW50VGFzay5pbnZva2UsIG1ldGEuZXZlbnROYW1lLCBtZXRhLm9wdGlvbnMsIHRydWUpO1xuICAgIHJldHVybiBtZXRhLmludm9rZVJlbW92ZUZ1bmMocmVtb3ZlRm5TeW1ib2wsIGV2ZW50VGFzayk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gem9uZUF3YXJlQWRkTGlzdGVuZXIoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIGNvbnN0IGRhdGE6IExpc3RlbmVyVGFza01ldGEgPSBtZXRhQ3JlYXRvcihzZWxmLCBhcmdzKTtcblxuICAgIGRhdGEub3B0aW9ucyA9IGRhdGEub3B0aW9ucyB8fCBkZWZhdWx0VXNlQ2FwdHVyaW5nO1xuICAgIC8vIC0gSW5zaWRlIGEgV2ViIFdvcmtlciwgYHRoaXNgIGlzIHVuZGVmaW5lZCwgdGhlIGNvbnRleHQgaXMgYGdsb2JhbGBcbiAgICAvLyAtIFdoZW4gYGFkZEV2ZW50TGlzdGVuZXJgIGlzIGNhbGxlZCBvbiB0aGUgZ2xvYmFsIGNvbnRleHQgaW4gc3RyaWN0IG1vZGUsIGB0aGlzYCBpcyB1bmRlZmluZWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvMTkwXG4gICAgbGV0IGRlbGVnYXRlOiBFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIGRhdGEuaGFuZGxlciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkZWxlZ2F0ZSA9IDxFdmVudExpc3RlbmVyPmRhdGEuaGFuZGxlcjtcbiAgICB9IGVsc2UgaWYgKGRhdGEuaGFuZGxlciAmJiAoPEV2ZW50TGlzdGVuZXJPYmplY3Q+ZGF0YS5oYW5kbGVyKS5oYW5kbGVFdmVudCkge1xuICAgICAgZGVsZWdhdGUgPSAoZXZlbnQpID0+ICg8RXZlbnRMaXN0ZW5lck9iamVjdD5kYXRhLmhhbmRsZXIpLmhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICB9XG4gICAgbGV0IHZhbGlkWm9uZUhhbmRsZXIgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgLy8gSW4gY3Jvc3Mgc2l0ZSBjb250ZXh0cyAoc3VjaCBhcyBXZWJEcml2ZXIgZnJhbWV3b3JrcyBsaWtlIFNlbGVuaXVtKSxcbiAgICAgIC8vIGFjY2Vzc2luZyB0aGUgaGFuZGxlciBvYmplY3QgaGVyZSB3aWxsIGNhdXNlIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gd2hpY2hcbiAgICAgIC8vIHdpbGwgZmFpbCB0ZXN0cyBwcmVtYXR1cmVseS5cbiAgICAgIHZhbGlkWm9uZUhhbmRsZXIgPSBkYXRhLmhhbmRsZXIgJiYgZGF0YS5oYW5kbGVyLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uV3JhcHBlcl0nO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyB3ZSBjYW4gc3RpbGwgdHJ5IHRvIGFkZCB0aGUgZGF0YS5oYW5kbGVyIGV2ZW4gd2UgYXJlIGluIGNyb3NzIHNpdGUgY29udGV4dFxuICAgICAgZGF0YS5jcm9zc0NvbnRleHQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGRhdGEuaW52b2tlQWRkRnVuYyhhZGRGblN5bWJvbCwgZGF0YS5oYW5kbGVyKTtcbiAgICB9XG4gICAgLy8gSWdub3JlIHNwZWNpYWwgbGlzdGVuZXJzIG9mIElFMTEgJiBFZGdlIGRldiB0b29scywgc2VlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvMTUwXG4gICAgaWYgKCFkZWxlZ2F0ZSB8fCB2YWxpZFpvbmVIYW5kbGVyKSB7XG4gICAgICByZXR1cm4gZGF0YS5pbnZva2VBZGRGdW5jKGFkZEZuU3ltYm9sLCBkYXRhLmhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlmICghYWxsb3dEdXBsaWNhdGVzKSB7XG4gICAgICBjb25zdCBldmVudFRhc2s6IFRhc2sgPSBmaW5kRXhpc3RpbmdSZWdpc3RlcmVkVGFzayhcbiAgICAgICAgICBkYXRhLnRhcmdldCwgZGF0YS5oYW5kbGVyLCBkYXRhLmV2ZW50TmFtZSwgZGF0YS5vcHRpb25zLCBmYWxzZSk7XG4gICAgICBpZiAoZXZlbnRUYXNrKSB7XG4gICAgICAgIC8vIHdlIGFscmVhZHkgcmVnaXN0ZXJlZCwgc28gdGhpcyB3aWxsIGhhdmUgbm9vcC5cbiAgICAgICAgcmV0dXJuIGRhdGEuaW52b2tlQWRkRnVuYyhhZGRGblN5bWJvbCwgZXZlbnRUYXNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB6b25lOiBab25lID0gWm9uZS5jdXJyZW50O1xuICAgIGNvbnN0IHNvdXJjZSA9IGRhdGEudGFyZ2V0LmNvbnN0cnVjdG9yWyduYW1lJ10gKyAnLicgKyBhZGRGbk5hbWUgKyAnOicgKyBkYXRhLmV2ZW50TmFtZTtcblxuICAgIHpvbmUuc2NoZWR1bGVFdmVudFRhc2soc291cmNlLCBkZWxlZ2F0ZSwgZGF0YSwgc2NoZWR1bGVFdmVudExpc3RlbmVyLCBjYW5jZWxFdmVudExpc3RlbmVyKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2Vab25lQXdhcmVSZW1vdmVMaXN0ZW5lcihcbiAgICBmbk5hbWU6IHN0cmluZywgdXNlQ2FwdHVyaW5nUGFyYW06IGJvb2xlYW4gPSB0cnVlLFxuICAgIG1ldGFDcmVhdG9yOiAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT4gTGlzdGVuZXJUYXNrTWV0YSA9IGRlZmF1bHRMaXN0ZW5lck1ldGFDcmVhdG9yKSB7XG4gIGNvbnN0IHN5bWJvbCA9IHpvbmVTeW1ib2woZm5OYW1lKTtcbiAgY29uc3QgZGVmYXVsdFVzZUNhcHR1cmluZyA9IHVzZUNhcHR1cmluZ1BhcmFtID8gZmFsc2UgOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHpvbmVBd2FyZVJlbW92ZUxpc3RlbmVyKHNlbGY6IGFueSwgYXJnczogYW55W10pIHtcbiAgICBjb25zdCBkYXRhID0gbWV0YUNyZWF0b3Ioc2VsZiwgYXJncyk7XG5cbiAgICBkYXRhLm9wdGlvbnMgPSBkYXRhLm9wdGlvbnMgfHwgZGVmYXVsdFVzZUNhcHR1cmluZztcbiAgICAvLyAtIEluc2lkZSBhIFdlYiBXb3JrZXIsIGB0aGlzYCBpcyB1bmRlZmluZWQsIHRoZSBjb250ZXh0IGlzIGBnbG9iYWxgXG4gICAgLy8gLSBXaGVuIGBhZGRFdmVudExpc3RlbmVyYCBpcyBjYWxsZWQgb24gdGhlIGdsb2JhbCBjb250ZXh0IGluIHN0cmljdCBtb2RlLCBgdGhpc2AgaXMgdW5kZWZpbmVkXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzE5MFxuICAgIGxldCBkZWxlZ2F0ZTogRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBkYXRhLmhhbmRsZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZGVsZWdhdGUgPSA8RXZlbnRMaXN0ZW5lcj5kYXRhLmhhbmRsZXI7XG4gICAgfSBlbHNlIGlmIChkYXRhLmhhbmRsZXIgJiYgKDxFdmVudExpc3RlbmVyT2JqZWN0PmRhdGEuaGFuZGxlcikuaGFuZGxlRXZlbnQpIHtcbiAgICAgIGRlbGVnYXRlID0gKGV2ZW50KSA9PiAoPEV2ZW50TGlzdGVuZXJPYmplY3Q+ZGF0YS5oYW5kbGVyKS5oYW5kbGVFdmVudChldmVudCk7XG4gICAgfVxuICAgIGxldCB2YWxpZFpvbmVIYW5kbGVyID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEluIGNyb3NzIHNpdGUgY29udGV4dHMgKHN1Y2ggYXMgV2ViRHJpdmVyIGZyYW1ld29ya3MgbGlrZSBTZWxlbml1bSksXG4gICAgICAvLyBhY2Nlc3NpbmcgdGhlIGhhbmRsZXIgb2JqZWN0IGhlcmUgd2lsbCBjYXVzZSBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duIHdoaWNoXG4gICAgICAvLyB3aWxsIGZhaWwgdGVzdHMgcHJlbWF0dXJlbHkuXG4gICAgICB2YWxpZFpvbmVIYW5kbGVyID0gZGF0YS5oYW5kbGVyICYmIGRhdGEuaGFuZGxlci50b1N0cmluZygpID09PSAnW29iamVjdCBGdW5jdGlvbldyYXBwZXJdJztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YS5jcm9zc0NvbnRleHQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGRhdGEuaW52b2tlUmVtb3ZlRnVuYyhzeW1ib2wsIGRhdGEuaGFuZGxlcik7XG4gICAgfVxuICAgIC8vIElnbm9yZSBzcGVjaWFsIGxpc3RlbmVycyBvZiBJRTExICYgRWRnZSBkZXYgdG9vbHMsIHNlZVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzE1MFxuICAgIGlmICghZGVsZWdhdGUgfHwgdmFsaWRab25lSGFuZGxlcikge1xuICAgICAgcmV0dXJuIGRhdGEuaW52b2tlUmVtb3ZlRnVuYyhzeW1ib2wsIGRhdGEuaGFuZGxlcik7XG4gICAgfVxuICAgIGNvbnN0IGV2ZW50VGFzayA9XG4gICAgICAgIGZpbmRFeGlzdGluZ1JlZ2lzdGVyZWRUYXNrKGRhdGEudGFyZ2V0LCBkYXRhLmhhbmRsZXIsIGRhdGEuZXZlbnROYW1lLCBkYXRhLm9wdGlvbnMsIHRydWUpO1xuICAgIGlmIChldmVudFRhc2spIHtcbiAgICAgIGV2ZW50VGFzay56b25lLmNhbmNlbFRhc2soZXZlbnRUYXNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5pbnZva2VSZW1vdmVGdW5jKHN5bWJvbCwgZGF0YS5oYW5kbGVyKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlWm9uZUF3YXJlUmVtb3ZlQWxsTGlzdGVuZXJzKGZuTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN5bWJvbCA9IHpvbmVTeW1ib2woZm5OYW1lKTtcblxuICByZXR1cm4gZnVuY3Rpb24gem9uZUF3YXJlUmVtb3ZlQWxsTGlzdGVuZXIoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHNlbGYgfHwgX2dsb2JhbDtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIHdpdGhvdXQgZXZlbnROYW1lXG4gICAgICB0YXJnZXRbRVZFTlRfVEFTS1NdID0gW107XG4gICAgICAvLyB3ZSBkb24ndCBjYW5jZWwgVGFzayBlaXRoZXIsIGJlY2F1c2UgY2FsbCBuYXRpdmUgZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycyB3aWxsXG4gICAgICAvLyB3aWxsIGRvIHJlbW92ZSBsaXN0ZW5lcihjYW5jZWxUYXNrKSBmb3IgdXNcbiAgICAgIHRhcmdldFtzeW1ib2xdKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGFyZ3NbMF07XG4gICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIGp1c3QgcmVtb3ZlIHRoZSByZWxhdGVkIGV2ZW50VGFzayBmcm9tIHRhcmdldFtFVkVOVF9UQVNLU11cbiAgICAvLyB3ZSBkb24ndCBuZWVkIHVzZUNhcHR1cmluZyBoZXJlIGJlY2F1c2UgdXNlQ2FwdHVyaW5nIGlzIGp1c3QgZm9yIERPTSwgYW5kXG4gICAgLy8gcmVtb3ZlQWxsTGlzdGVuZXJzIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBieSBub2RlIGV2ZW50RW1pdHRlclxuICAgIC8vIGFuZCB3ZSBkb24ndCBjYW5jZWwgVGFzayBlaXRoZXIsIGJlY2F1c2UgY2FsbCBuYXRpdmUgZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycyB3aWxsXG4gICAgLy8gd2lsbCBkbyByZW1vdmUgbGlzdGVuZXIoY2FuY2VsVGFzaykgZm9yIHVzXG4gICAgZmluZEFsbEV4aXN0aW5nUmVnaXN0ZXJlZFRhc2tzKHRhcmdldCwgZXZlbnROYW1lLCB0cnVlKTtcbiAgICB0YXJnZXRbc3ltYm9sXShldmVudE5hbWUpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVpvbmVBd2FyZUxpc3RlbmVycyhmbk5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gem9uZUF3YXJlRXZlbnRMaXN0ZW5lcnMoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIGNvbnN0IGV2ZW50TmFtZTogc3RyaW5nID0gYXJnc1swXTtcbiAgICBjb25zdCB0YXJnZXQgPSBzZWxmIHx8IF9nbG9iYWw7XG4gICAgaWYgKCF0YXJnZXRbRVZFTlRfVEFTS1NdKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRbRVZFTlRfVEFTS1NdXG4gICAgICAgIC5maWx0ZXIoKHRhc2s6IFRhc2spID0+ICh0YXNrLmRhdGEgYXMgYW55KVsnZXZlbnROYW1lJ10gPT09IGV2ZW50TmFtZSlcbiAgICAgICAgLm1hcCgodGFzazogVGFzaykgPT4gKHRhc2suZGF0YSBhcyBhbnkpWydoYW5kbGVyJ10pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hFdmVudFRhcmdldE1ldGhvZHMoXG4gICAgb2JqOiBhbnksIGFkZEZuTmFtZTogc3RyaW5nID0gQUREX0VWRU5UX0xJU1RFTkVSLCByZW1vdmVGbk5hbWU6IHN0cmluZyA9IFJFTU9WRV9FVkVOVF9MSVNURU5FUixcbiAgICBtZXRhQ3JlYXRvcjogKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IExpc3RlbmVyVGFza01ldGEgPVxuICAgICAgICBkZWZhdWx0TGlzdGVuZXJNZXRhQ3JlYXRvcik6IGJvb2xlYW4ge1xuICBpZiAob2JqICYmIG9ialthZGRGbk5hbWVdKSB7XG4gICAgcGF0Y2hNZXRob2QoXG4gICAgICAgIG9iaiwgYWRkRm5OYW1lLFxuICAgICAgICAoKSA9PiBtYWtlWm9uZUF3YXJlQWRkTGlzdGVuZXIoYWRkRm5OYW1lLCByZW1vdmVGbk5hbWUsIHRydWUsIGZhbHNlLCBmYWxzZSwgbWV0YUNyZWF0b3IpKTtcbiAgICBwYXRjaE1ldGhvZChcbiAgICAgICAgb2JqLCByZW1vdmVGbk5hbWUsICgpID0+IG1ha2Vab25lQXdhcmVSZW1vdmVMaXN0ZW5lcihyZW1vdmVGbk5hbWUsIHRydWUsIG1ldGFDcmVhdG9yKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmNvbnN0IG9yaWdpbmFsSW5zdGFuY2VLZXkgPSB6b25lU3ltYm9sKCdvcmlnaW5hbEluc3RhbmNlJyk7XG5cbi8vIHdyYXAgc29tZSBuYXRpdmUgQVBJIG9uIGB3aW5kb3dgXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hDbGFzcyhjbGFzc05hbWU6IHN0cmluZykge1xuICBjb25zdCBPcmlnaW5hbENsYXNzID0gX2dsb2JhbFtjbGFzc05hbWVdO1xuICBpZiAoIU9yaWdpbmFsQ2xhc3MpIHJldHVybjtcbiAgLy8ga2VlcCBvcmlnaW5hbCBjbGFzcyBpbiBnbG9iYWxcbiAgX2dsb2JhbFt6b25lU3ltYm9sKGNsYXNzTmFtZSldID0gT3JpZ2luYWxDbGFzcztcblxuICBfZ2xvYmFsW2NsYXNzTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBhID0gYmluZEFyZ3VtZW50cyg8YW55PmFyZ3VtZW50cywgY2xhc3NOYW1lKTtcbiAgICBzd2l0Y2ggKGEubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKGFbMF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKGFbMF0sIGFbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKGFbMF0sIGFbMV0sIGFbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKGFbMF0sIGFbMV0sIGFbMl0sIGFbM10pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXJnIGxpc3QgdG9vIGxvbmcuJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGF0dGFjaCBvcmlnaW5hbCBkZWxlZ2F0ZSB0byBwYXRjaGVkIGZ1bmN0aW9uXG4gIGF0dGFjaE9yaWdpblRvUGF0Y2hlZChfZ2xvYmFsW2NsYXNzTmFtZV0sIE9yaWdpbmFsQ2xhc3MpO1xuXG4gIGNvbnN0IGluc3RhbmNlID0gbmV3IE9yaWdpbmFsQ2xhc3MoZnVuY3Rpb24oKSB7fSk7XG5cbiAgbGV0IHByb3A7XG4gIGZvciAocHJvcCBpbiBpbnN0YW5jZSkge1xuICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD00NDcyMVxuICAgIGlmIChjbGFzc05hbWUgPT09ICdYTUxIdHRwUmVxdWVzdCcgJiYgcHJvcCA9PT0gJ3Jlc3BvbnNlQmxvYicpIGNvbnRpbnVlO1xuICAgIChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBpZiAodHlwZW9mIGluc3RhbmNlW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIF9nbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXS5hcHBseSh0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9nbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0gPSBab25lLmN1cnJlbnQud3JhcChmbiwgY2xhc3NOYW1lICsgJy4nICsgcHJvcCk7XG4gICAgICAgICAgICAgIC8vIGtlZXAgY2FsbGJhY2sgaW4gd3JhcHBlZCBmdW5jdGlvbiBzbyB3ZSBjYW5cbiAgICAgICAgICAgICAgLy8gdXNlIGl0IGluIEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyB0byByZXR1cm5cbiAgICAgICAgICAgICAgLy8gdGhlIG5hdGl2ZSBvbmUuXG4gICAgICAgICAgICAgIGF0dGFjaE9yaWdpblRvUGF0Y2hlZCh0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdLCBmbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdID0gZm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KHByb3ApKTtcbiAgfVxuXG4gIGZvciAocHJvcCBpbiBPcmlnaW5hbENsYXNzKSB7XG4gICAgaWYgKHByb3AgIT09ICdwcm90b3R5cGUnICYmIE9yaWdpbmFsQ2xhc3MuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIF9nbG9iYWxbY2xhc3NOYW1lXVtwcm9wXSA9IE9yaWdpbmFsQ2xhc3NbcHJvcF07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaE1ldGhvZChcbiAgICB0YXJnZXQ6IGFueSwgbmFtZTogc3RyaW5nLFxuICAgIHBhdGNoRm46IChkZWxlZ2F0ZTogRnVuY3Rpb24sIGRlbGVnYXRlTmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IChzZWxmOiBhbnksIGFyZ3M6IGFueVtdKSA9PlxuICAgICAgICBhbnkpOiBGdW5jdGlvbiB7XG4gIGxldCBwcm90byA9IHRhcmdldDtcbiAgd2hpbGUgKHByb3RvICYmICFwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgfVxuICBpZiAoIXByb3RvICYmIHRhcmdldFtuYW1lXSkge1xuICAgIC8vIHNvbWVob3cgd2UgZGlkIG5vdCBmaW5kIGl0LCBidXQgd2UgY2FuIHNlZSBpdC4gVGhpcyBoYXBwZW5zIG9uIElFIGZvciBXaW5kb3cgcHJvcGVydGllcy5cbiAgICBwcm90byA9IHRhcmdldDtcbiAgfVxuICBjb25zdCBkZWxlZ2F0ZU5hbWUgPSB6b25lU3ltYm9sKG5hbWUpO1xuICBsZXQgZGVsZWdhdGU6IEZ1bmN0aW9uO1xuICBpZiAocHJvdG8gJiYgIShkZWxlZ2F0ZSA9IHByb3RvW2RlbGVnYXRlTmFtZV0pKSB7XG4gICAgZGVsZWdhdGUgPSBwcm90b1tkZWxlZ2F0ZU5hbWVdID0gcHJvdG9bbmFtZV07XG4gICAgY29uc3QgcGF0Y2hEZWxlZ2F0ZSA9IHBhdGNoRm4oZGVsZWdhdGUsIGRlbGVnYXRlTmFtZSwgbmFtZSk7XG4gICAgcHJvdG9bbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwYXRjaERlbGVnYXRlKHRoaXMsIGFyZ3VtZW50cyBhcyBhbnkpO1xuICAgIH07XG4gICAgYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHByb3RvW25hbWVdLCBkZWxlZ2F0ZSk7XG4gIH1cbiAgcmV0dXJuIGRlbGVnYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hY3JvVGFza01ldGEgZXh0ZW5kcyBUYXNrRGF0YSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdGFyZ2V0OiBhbnk7XG4gIGNhbGxiYWNrSW5kZXg6IG51bWJlcjtcbiAgYXJnczogYW55W107XG59XG5cbi8vIFRPRE86IEBKaWFMaVBhc3Npb24sIHN1cHBvcnQgY2FuY2VsIHRhc2sgbGF0ZXIgaWYgbmVjZXNzYXJ5XG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hNYWNyb1Rhc2soXG4gICAgb2JqOiBhbnksIGZ1bmNOYW1lOiBzdHJpbmcsIG1ldGFDcmVhdG9yOiAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT4gTWFjcm9UYXNrTWV0YSkge1xuICBsZXQgc2V0TmF0aXZlOiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGVUYXNrKHRhc2s6IFRhc2spIHtcbiAgICBjb25zdCBkYXRhID0gPE1hY3JvVGFza01ldGE+dGFzay5kYXRhO1xuICAgIGRhdGEuYXJnc1tkYXRhLmNhbGxiYWNrSW5kZXhdID0gZnVuY3Rpb24oKSB7XG4gICAgICB0YXNrLmludm9rZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgc2V0TmF0aXZlLmFwcGx5KGRhdGEudGFyZ2V0LCBkYXRhLmFyZ3MpO1xuICAgIHJldHVybiB0YXNrO1xuICB9XG5cbiAgc2V0TmF0aXZlID0gcGF0Y2hNZXRob2Qob2JqLCBmdW5jTmFtZSwgKGRlbGVnYXRlOiBGdW5jdGlvbikgPT4gZnVuY3Rpb24oc2VsZjogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIGNvbnN0IG1ldGEgPSBtZXRhQ3JlYXRvcihzZWxmLCBhcmdzKTtcbiAgICBpZiAobWV0YS5jYWxsYmFja0luZGV4ID49IDAgJiYgdHlwZW9mIGFyZ3NbbWV0YS5jYWxsYmFja0luZGV4XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdGFzayA9IFpvbmUuY3VycmVudC5zY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgICBtZXRhLm5hbWUsIGFyZ3NbbWV0YS5jYWxsYmFja0luZGV4XSwgbWV0YSwgc2NoZWR1bGVUYXNrLCBudWxsKTtcbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjYXVzZSBhbiBlcnJvciBieSBjYWxsaW5nIGl0IGRpcmVjdGx5LlxuICAgICAgcmV0dXJuIGRlbGVnYXRlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWljcm9UYXNrTWV0YSBleHRlbmRzIFRhc2tEYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0YXJnZXQ6IGFueTtcbiAgY2FsbGJhY2tJbmRleDogbnVtYmVyO1xuICBhcmdzOiBhbnlbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoTWljcm9UYXNrKFxuICAgIG9iajogYW55LCBmdW5jTmFtZTogc3RyaW5nLCBtZXRhQ3JlYXRvcjogKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IE1pY3JvVGFza01ldGEpIHtcbiAgbGV0IHNldE5hdGl2ZTogRnVuY3Rpb24gPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlVGFzayh0YXNrOiBUYXNrKSB7XG4gICAgY29uc3QgZGF0YSA9IDxNYWNyb1Rhc2tNZXRhPnRhc2suZGF0YTtcbiAgICBkYXRhLmFyZ3NbZGF0YS5jYWxsYmFja0luZGV4XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGFzay5pbnZva2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIHNldE5hdGl2ZS5hcHBseShkYXRhLnRhcmdldCwgZGF0YS5hcmdzKTtcbiAgICByZXR1cm4gdGFzaztcbiAgfVxuXG4gIHNldE5hdGl2ZSA9IHBhdGNoTWV0aG9kKG9iaiwgZnVuY05hbWUsIChkZWxlZ2F0ZTogRnVuY3Rpb24pID0+IGZ1bmN0aW9uKHNlbGY6IGFueSwgYXJnczogYW55W10pIHtcbiAgICBjb25zdCBtZXRhID0gbWV0YUNyZWF0b3Ioc2VsZiwgYXJncyk7XG4gICAgaWYgKG1ldGEuY2FsbGJhY2tJbmRleCA+PSAwICYmIHR5cGVvZiBhcmdzW21ldGEuY2FsbGJhY2tJbmRleF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHRhc2sgPVxuICAgICAgICAgIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzayhtZXRhLm5hbWUsIGFyZ3NbbWV0YS5jYWxsYmFja0luZGV4XSwgbWV0YSwgc2NoZWR1bGVUYXNrKTtcbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjYXVzZSBhbiBlcnJvciBieSBjYWxsaW5nIGl0IGRpcmVjdGx5LlxuICAgICAgcmV0dXJuIGRlbGVnYXRlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRXZlbnRUYXNrKHRhcmdldDogYW55LCBldnROYW1lOiBzdHJpbmcpOiBUYXNrW10ge1xuICBjb25zdCBldmVudFRhc2tzOiBUYXNrW10gPSB0YXJnZXRbem9uZVN5bWJvbCgnZXZlbnRUYXNrcycpXTtcbiAgY29uc3QgcmVzdWx0OiBUYXNrW10gPSBbXTtcbiAgaWYgKGV2ZW50VGFza3MpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50VGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGV2ZW50VGFzayA9IGV2ZW50VGFza3NbaV07XG4gICAgICBjb25zdCBkYXRhID0gZXZlbnRUYXNrLmRhdGE7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBkYXRhICYmICg8YW55PmRhdGEpLmV2ZW50TmFtZTtcbiAgICAgIGlmIChldmVudE5hbWUgPT09IGV2dE5hbWUpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZXZlbnRUYXNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaE9yaWdpblRvUGF0Y2hlZChwYXRjaGVkOiBGdW5jdGlvbiwgb3JpZ2luYWw6IGFueSkge1xuICAocGF0Y2hlZCBhcyBhbnkpW3pvbmVTeW1ib2woJ09yaWdpbmFsRGVsZWdhdGUnKV0gPSBvcmlnaW5hbDtcbn1cbiJdfQ==