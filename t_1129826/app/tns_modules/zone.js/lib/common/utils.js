"use strict";
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
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneSymbol = Zone.__symbol__;
var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
var FUNCTION = 'function';
var UNDEFINED = 'undefined';
var REMOVE_ATTRIBUTE = 'removeAttribute';
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === FUNCTION) {
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
            var prototypeDesc = Object.getOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
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
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    if (typeof propertyDesc.get === FUNCTION && typeof propertyDesc.set === UNDEFINED) {
        return false;
    }
    return true;
}
exports.isPropertyWritable = isPropertyWritable;
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
var ON_PROPERTY_HANDLER_SYMBOL = exports.zoneSymbol('onPropertyHandler');
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = exports.zoneSymbol('ON_PROPERTY' + event.type);
    }
    var listener = this[eventNameSymbol];
    var result = listener && listener.apply(this, arguments);
    if (result != undefined && !result) {
        event.preventDefault();
    }
    return result;
};
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
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = exports.zoneSymbol('ON_PROPERTY' + eventName);
    }
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
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
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
        if (target[eventNameSymbol]) {
            return wrapFn;
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
                if (typeof target[REMOVE_ATTRIBUTE] === FUNCTION) {
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
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && Object.getOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
        }
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
function attachOriginToPatched(patched, original) {
    patched[exports.zoneSymbol('OriginalDelegate')] = original;
}
exports.attachOriginToPatched = attachOriginToPatched;
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
        return ieOrEdge;
    }
    catch (error) {
    }
}
exports.isIEOrEdge = isIEOrEdge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBQ0g7Ozs7R0FJRzs7QUFLVSxRQUFBLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzFDLElBQU0sT0FBTyxHQUNULE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUM7QUFFdkYsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQzVCLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUM5QixJQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0FBRTNDLHVCQUE4QixJQUFXLEVBQUUsTUFBYztJQUN2RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVBELHNDQU9DO0FBRUQsd0JBQStCLFNBQWMsRUFBRSxPQUFpQjtJQUM5RCxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxDQUFDO1FBQ1IsSUFBTSxNQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hC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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlGLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUFoQkQsZ0NBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBTdXBwcmVzcyBjbG9zdXJlIGNvbXBpbGVyIGVycm9ycyBhYm91dCB1bmtub3duICdab25lJyB2YXJpYWJsZVxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHt1bmRlZmluZWRWYXJzLGdsb2JhbFRoaXMsbWlzc2luZ1JlcXVpcmV9XG4gKi9cblxuLy8gSGFjayBzaW5jZSBUeXBlU2NyaXB0IGlzbid0IGNvbXBpbGluZyB0aGlzIGZvciBhIHdvcmtlci5cbmRlY2xhcmUgY29uc3QgV29ya2VyR2xvYmFsU2NvcGU6IGFueTtcblxuZXhwb3J0IGNvbnN0IHpvbmVTeW1ib2wgPSBab25lLl9fc3ltYm9sX187XG5jb25zdCBfZ2xvYmFsOiBhbnkgPVxuICAgIHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdyB8fCB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcgJiYgc2VsZiB8fCBnbG9iYWw7XG5cbmNvbnN0IEZVTkNUSU9OID0gJ2Z1bmN0aW9uJztcbmNvbnN0IFVOREVGSU5FRCA9ICd1bmRlZmluZWQnO1xuY29uc3QgUkVNT1ZFX0FUVFJJQlVURSA9ICdyZW1vdmVBdHRyaWJ1dGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZEFyZ3VtZW50cyhhcmdzOiBhbnlbXSwgc291cmNlOiBzdHJpbmcpOiBhbnlbXSB7XG4gIGZvciAobGV0IGkgPSBhcmdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKHR5cGVvZiBhcmdzW2ldID09PSBGVU5DVElPTikge1xuICAgICAgYXJnc1tpXSA9IFpvbmUuY3VycmVudC53cmFwKGFyZ3NbaV0sIHNvdXJjZSArICdfJyArIGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJncztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoUHJvdG90eXBlKHByb3RvdHlwZTogYW55LCBmbk5hbWVzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzb3VyY2UgPSBwcm90b3R5cGUuY29uc3RydWN0b3JbJ25hbWUnXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbk5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbmFtZSA9IGZuTmFtZXNbaV07XG4gICAgY29uc3QgZGVsZWdhdGUgPSBwcm90b3R5cGVbbmFtZV07XG4gICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICBjb25zdCBwcm90b3R5cGVEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIG5hbWUpO1xuICAgICAgaWYgKCFpc1Byb3BlcnR5V3JpdGFibGUocHJvdG90eXBlRGVzYykpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBwcm90b3R5cGVbbmFtZV0gPSAoKGRlbGVnYXRlOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBwYXRjaGVkOiBhbnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuYXBwbHkodGhpcywgYmluZEFyZ3VtZW50cyg8YW55PmFyZ3VtZW50cywgc291cmNlICsgJy4nICsgbmFtZSkpO1xuICAgICAgICB9O1xuICAgICAgICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQocGF0Y2hlZCwgZGVsZWdhdGUpO1xuICAgICAgICByZXR1cm4gcGF0Y2hlZDtcbiAgICAgIH0pKGRlbGVnYXRlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvcGVydHlXcml0YWJsZShwcm9wZXJ0eURlc2M6IGFueSkge1xuICBpZiAoIXByb3BlcnR5RGVzYykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHByb3BlcnR5RGVzYy53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHByb3BlcnR5RGVzYy5nZXQgPT09IEZVTkNUSU9OICYmIHR5cGVvZiBwcm9wZXJ0eURlc2Muc2V0ID09PSBVTkRFRklORUQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGlzV2ViV29ya2VyOiBib29sZWFuID1cbiAgICAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpO1xuXG4vLyBNYWtlIHN1cmUgdG8gYWNjZXNzIGBwcm9jZXNzYCB0aHJvdWdoIGBfZ2xvYmFsYCBzbyB0aGF0IFdlYlBhY2sgZG9lcyBub3QgYWNjaWRlbnRseSBicm93c2VyaWZ5XG4vLyB0aGlzIGNvZGUuXG5leHBvcnQgY29uc3QgaXNOb2RlOiBib29sZWFuID1cbiAgICAoISgnbncnIGluIF9nbG9iYWwpICYmIHR5cGVvZiBfZ2xvYmFsLnByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgIHt9LnRvU3RyaW5nLmNhbGwoX2dsb2JhbC5wcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKTtcblxuZXhwb3J0IGNvbnN0IGlzQnJvd3NlcjogYm9vbGVhbiA9XG4gICAgIWlzTm9kZSAmJiAhaXNXZWJXb3JrZXIgJiYgISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHdpbmRvdyBhcyBhbnkpWydIVE1MRWxlbWVudCddKTtcblxuLy8gd2UgYXJlIGluIGVsZWN0cm9uIG9mIG53LCBzbyB3ZSBhcmUgYm90aCBicm93c2VyIGFuZCBub2RlanNcbi8vIE1ha2Ugc3VyZSB0byBhY2Nlc3MgYHByb2Nlc3NgIHRocm91Z2ggYF9nbG9iYWxgIHNvIHRoYXQgV2ViUGFjayBkb2VzIG5vdCBhY2NpZGVudGx5IGJyb3dzZXJpZnlcbi8vIHRoaXMgY29kZS5cbmV4cG9ydCBjb25zdCBpc01peDogYm9vbGVhbiA9IHR5cGVvZiBfZ2xvYmFsLnByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAge30udG9TdHJpbmcuY2FsbChfZ2xvYmFsLnByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScgJiYgIWlzV2ViV29ya2VyICYmXG4gICAgISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHdpbmRvdyBhcyBhbnkpWydIVE1MRWxlbWVudCddKTtcblxuY29uc3QgT05fUFJPUEVSVFlfSEFORExFUl9TWU1CT0wgPSB6b25lU3ltYm9sKCdvblByb3BlcnR5SGFuZGxlcicpO1xuY29uc3Qgem9uZVN5bWJvbEV2ZW50TmFtZXM6IHtbZXZlbnROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5jb25zdCB3cmFwRm4gPSBmdW5jdGlvbihldmVudDogRXZlbnQpIHtcbiAgbGV0IGV2ZW50TmFtZVN5bWJvbCA9IHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50LnR5cGVdO1xuICBpZiAoIWV2ZW50TmFtZVN5bWJvbCkge1xuICAgIGV2ZW50TmFtZVN5bWJvbCA9IHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50LnR5cGVdID0gem9uZVN5bWJvbCgnT05fUFJPUEVSVFknICsgZXZlbnQudHlwZSk7XG4gIH1cbiAgY29uc3QgbGlzdGVuZXIgPSB0aGlzW2V2ZW50TmFtZVN5bWJvbF07XG4gIGxldCByZXN1bHQgPSBsaXN0ZW5lciAmJiBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gIGlmIChyZXN1bHQgIT0gdW5kZWZpbmVkICYmICFyZXN1bHQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hQcm9wZXJ0eShvYmo6IGFueSwgcHJvcDogc3RyaW5nLCBwcm90b3R5cGU/OiBhbnkpIHtcbiAgbGV0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XG4gIGlmICghZGVzYyAmJiBwcm90b3R5cGUpIHtcbiAgICAvLyB3aGVuIHBhdGNoIHdpbmRvdyBvYmplY3QsIHVzZSBwcm90b3R5cGUgdG8gY2hlY2sgcHJvcCBleGlzdCBvciBub3RcbiAgICBjb25zdCBwcm90b3R5cGVEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3ApO1xuICAgIGlmIChwcm90b3R5cGVEZXNjKSB7XG4gICAgICBkZXNjID0ge2VudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX07XG4gICAgfVxuICB9XG4gIC8vIGlmIHRoZSBkZXNjcmlwdG9yIG5vdCBleGlzdHMgb3IgaXMgbm90IGNvbmZpZ3VyYWJsZVxuICAvLyBqdXN0IHJldHVyblxuICBpZiAoIWRlc2MgfHwgIWRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGNhbm5vdCBoYXZlIGdldHRlci9zZXR0ZXIgYW5kIGJlIHdyaXRhYmxlXG4gIC8vIGRlbGV0aW5nIHRoZSB3cml0YWJsZSBhbmQgdmFsdWUgcHJvcGVydGllcyBhdm9pZHMgdGhpcyBlcnJvcjpcbiAgLy9cbiAgLy8gVHlwZUVycm9yOiBwcm9wZXJ0eSBkZXNjcmlwdG9ycyBtdXN0IG5vdCBzcGVjaWZ5IGEgdmFsdWUgb3IgYmUgd3JpdGFibGUgd2hlbiBhXG4gIC8vIGdldHRlciBvciBzZXR0ZXIgaGFzIGJlZW4gc3BlY2lmaWVkXG4gIGRlbGV0ZSBkZXNjLndyaXRhYmxlO1xuICBkZWxldGUgZGVzYy52YWx1ZTtcbiAgY29uc3Qgb3JpZ2luYWxEZXNjR2V0ID0gZGVzYy5nZXQ7XG5cbiAgLy8gc3Vic3RyKDIpIGN1eiAnb25jbGljaycgLT4gJ2NsaWNrJywgZXRjXG4gIGNvbnN0IGV2ZW50TmFtZSA9IHByb3Auc3Vic3RyKDIpO1xuXG4gIGxldCBldmVudE5hbWVTeW1ib2wgPSB6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudE5hbWVdO1xuICBpZiAoIWV2ZW50TmFtZVN5bWJvbCkge1xuICAgIGV2ZW50TmFtZVN5bWJvbCA9IHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50TmFtZV0gPSB6b25lU3ltYm9sKCdPTl9QUk9QRVJUWScgKyBldmVudE5hbWUpO1xuICB9XG5cbiAgZGVzYy5zZXQgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgIC8vIGluIHNvbWUgb2Ygd2luZG93cydzIG9ucHJvcGVydHkgY2FsbGJhY2ssIHRoaXMgaXMgdW5kZWZpbmVkXG4gICAgLy8gc28gd2UgbmVlZCB0byBjaGVjayBpdFxuICAgIGxldCB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICghdGFyZ2V0ICYmIG9iaiA9PT0gX2dsb2JhbCkge1xuICAgICAgdGFyZ2V0ID0gX2dsb2JhbDtcbiAgICB9XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByZXZpb3VzVmFsdWUgPSB0YXJnZXRbZXZlbnROYW1lU3ltYm9sXTtcbiAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwRm4pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRhcmdldFtldmVudE5hbWVTeW1ib2xdID0gbmV3VmFsdWU7XG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHdyYXBGbiwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXRbZXZlbnROYW1lU3ltYm9sXSA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFRoZSBnZXR0ZXIgd291bGQgcmV0dXJuIHVuZGVmaW5lZCBmb3IgdW5hc3NpZ25lZCBwcm9wZXJ0aWVzIGJ1dCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhblxuICAvLyB1bmFzc2lnbmVkIHByb3BlcnR5IGlzIG51bGxcbiAgZGVzYy5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBpbiBzb21lIG9mIHdpbmRvd3MncyBvbnByb3BlcnR5IGNhbGxiYWNrLCB0aGlzIGlzIHVuZGVmaW5lZFxuICAgIC8vIHNvIHdlIG5lZWQgdG8gY2hlY2sgaXRcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAoIXRhcmdldCAmJiBvYmogPT09IF9nbG9iYWwpIHtcbiAgICAgIHRhcmdldCA9IF9nbG9iYWw7XG4gICAgfVxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRhcmdldFtldmVudE5hbWVTeW1ib2xdKSB7XG4gICAgICByZXR1cm4gd3JhcEZuO1xuICAgIH0gZWxzZSBpZiAob3JpZ2luYWxEZXNjR2V0KSB7XG4gICAgICAvLyByZXN1bHQgd2lsbCBiZSBudWxsIHdoZW4gdXNlIGlubGluZSBldmVudCBhdHRyaWJ1dGUsXG4gICAgICAvLyBzdWNoIGFzIDxidXR0b24gb25jbGljaz1cImZ1bmMoKTtcIj5PSzwvYnV0dG9uPlxuICAgICAgLy8gYmVjYXVzZSB0aGUgb25jbGljayBmdW5jdGlvbiBpcyBpbnRlcm5hbCByYXcgdW5jb21waWxlZCBoYW5kbGVyXG4gICAgICAvLyB0aGUgb25jbGljayB3aWxsIGJlIGV2YWx1YXRlZCB3aGVuIGZpcnN0IHRpbWUgZXZlbnQgd2FzIHRyaWdnZXJlZCBvclxuICAgICAgLy8gdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkLCBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci96b25lLmpzL2lzc3Vlcy81MjVcbiAgICAgIC8vIHNvIHdlIHNob3VsZCB1c2Ugb3JpZ2luYWwgbmF0aXZlIGdldCB0byByZXRyaWV2ZSB0aGUgaGFuZGxlclxuICAgICAgbGV0IHZhbHVlID0gb3JpZ2luYWxEZXNjR2V0ICYmIG9yaWdpbmFsRGVzY0dldC5hcHBseSh0aGlzKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBkZXNjLnNldC5hcHBseSh0aGlzLCBbdmFsdWVdKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbUkVNT1ZFX0FUVFJJQlVURV0gPT09IEZVTkNUSU9OKSB7XG4gICAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hPblByb3BlcnRpZXMob2JqOiBhbnksIHByb3BlcnRpZXM6IHN0cmluZ1tdLCBwcm90b3R5cGU/OiBhbnkpIHtcbiAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhdGNoUHJvcGVydHkob2JqLCAnb24nICsgcHJvcGVydGllc1tpXSwgcHJvdG90eXBlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgb25Qcm9wZXJ0aWVzID0gW107XG4gICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikge1xuICAgICAgaWYgKHByb3Auc3Vic3RyKDAsIDIpID09ICdvbicpIHtcbiAgICAgICAgb25Qcm9wZXJ0aWVzLnB1c2gocHJvcCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgb25Qcm9wZXJ0aWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBwYXRjaFByb3BlcnR5KG9iaiwgb25Qcm9wZXJ0aWVzW2pdLCBwcm90b3R5cGUpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBvcmlnaW5hbEluc3RhbmNlS2V5ID0gem9uZVN5bWJvbCgnb3JpZ2luYWxJbnN0YW5jZScpO1xuXG4vLyB3cmFwIHNvbWUgbmF0aXZlIEFQSSBvbiBgd2luZG93YFxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgT3JpZ2luYWxDbGFzcyA9IF9nbG9iYWxbY2xhc3NOYW1lXTtcbiAgaWYgKCFPcmlnaW5hbENsYXNzKSByZXR1cm47XG4gIC8vIGtlZXAgb3JpZ2luYWwgY2xhc3MgaW4gZ2xvYmFsXG4gIF9nbG9iYWxbem9uZVN5bWJvbChjbGFzc05hbWUpXSA9IE9yaWdpbmFsQ2xhc3M7XG5cbiAgX2dsb2JhbFtjbGFzc05hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYSA9IGJpbmRBcmd1bWVudHMoPGFueT5hcmd1bWVudHMsIGNsYXNzTmFtZSk7XG4gICAgc3dpdGNoIChhLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldID0gbmV3IE9yaWdpbmFsQ2xhc3MoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdLCBhWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdLCBhWzFdLCBhWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdLCBhWzFdLCBhWzJdLCBhWzNdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZyBsaXN0IHRvbyBsb25nLicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBhdHRhY2ggb3JpZ2luYWwgZGVsZWdhdGUgdG8gcGF0Y2hlZCBmdW5jdGlvblxuICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQoX2dsb2JhbFtjbGFzc05hbWVdLCBPcmlnaW5hbENsYXNzKTtcblxuICBjb25zdCBpbnN0YW5jZSA9IG5ldyBPcmlnaW5hbENsYXNzKGZ1bmN0aW9uKCkge30pO1xuXG4gIGxldCBwcm9wO1xuICBmb3IgKHByb3AgaW4gaW5zdGFuY2UpIHtcbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDQ3MjFcbiAgICBpZiAoY2xhc3NOYW1lID09PSAnWE1MSHR0cFJlcXVlc3QnICYmIHByb3AgPT09ICdyZXNwb25zZUJsb2InKSBjb250aW51ZTtcbiAgICAoZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZVtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBfZ2xvYmFsW2NsYXNzTmFtZV0ucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0uYXBwbHkodGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfZ2xvYmFsW2NsYXNzTmFtZV0ucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdID0gWm9uZS5jdXJyZW50LndyYXAoZm4sIGNsYXNzTmFtZSArICcuJyArIHByb3ApO1xuICAgICAgICAgICAgICAvLyBrZWVwIGNhbGxiYWNrIGluIHdyYXBwZWQgZnVuY3Rpb24gc28gd2UgY2FuXG4gICAgICAgICAgICAgIC8vIHVzZSBpdCBpbiBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgdG8gcmV0dXJuXG4gICAgICAgICAgICAgIC8vIHRoZSBuYXRpdmUgb25lLlxuICAgICAgICAgICAgICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQodGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXSwgZm4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXSA9IGZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfShwcm9wKSk7XG4gIH1cblxuICBmb3IgKHByb3AgaW4gT3JpZ2luYWxDbGFzcykge1xuICAgIGlmIChwcm9wICE9PSAncHJvdG90eXBlJyAmJiBPcmlnaW5hbENsYXNzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICBfZ2xvYmFsW2NsYXNzTmFtZV1bcHJvcF0gPSBPcmlnaW5hbENsYXNzW3Byb3BdO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hNZXRob2QoXG4gICAgdGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZyxcbiAgICBwYXRjaEZuOiAoZGVsZWdhdGU6IEZ1bmN0aW9uLCBkZWxlZ2F0ZU5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT5cbiAgICAgICAgYW55KTogRnVuY3Rpb24ge1xuICBsZXQgcHJvdG8gPSB0YXJnZXQ7XG4gIHdoaWxlIChwcm90byAmJiAhcHJvdG8uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gIH1cbiAgaWYgKCFwcm90byAmJiB0YXJnZXRbbmFtZV0pIHtcbiAgICAvLyBzb21laG93IHdlIGRpZCBub3QgZmluZCBpdCwgYnV0IHdlIGNhbiBzZWUgaXQuIFRoaXMgaGFwcGVucyBvbiBJRSBmb3IgV2luZG93IHByb3BlcnRpZXMuXG4gICAgcHJvdG8gPSB0YXJnZXQ7XG4gIH1cblxuICBjb25zdCBkZWxlZ2F0ZU5hbWUgPSB6b25lU3ltYm9sKG5hbWUpO1xuICBsZXQgZGVsZWdhdGU6IEZ1bmN0aW9uO1xuICBpZiAocHJvdG8gJiYgIShkZWxlZ2F0ZSA9IHByb3RvW2RlbGVnYXRlTmFtZV0pKSB7XG4gICAgZGVsZWdhdGUgPSBwcm90b1tkZWxlZ2F0ZU5hbWVdID0gcHJvdG9bbmFtZV07XG4gICAgLy8gY2hlY2sgd2hldGhlciBwcm90b1tuYW1lXSBpcyB3cml0YWJsZVxuICAgIC8vIHNvbWUgcHJvcGVydHkgaXMgcmVhZG9ubHkgaW4gc2FmYXJpLCBzdWNoIGFzIEh0bWxDYW52YXNFbGVtZW50LnByb3RvdHlwZS50b0Jsb2JcbiAgICBjb25zdCBkZXNjID0gcHJvdG8gJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbmFtZSk7XG4gICAgaWYgKGlzUHJvcGVydHlXcml0YWJsZShkZXNjKSkge1xuICAgICAgY29uc3QgcGF0Y2hEZWxlZ2F0ZSA9IHBhdGNoRm4oZGVsZWdhdGUsIGRlbGVnYXRlTmFtZSwgbmFtZSk7XG4gICAgICBwcm90b1tuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0Y2hEZWxlZ2F0ZSh0aGlzLCBhcmd1bWVudHMgYXMgYW55KTtcbiAgICAgIH07XG4gICAgICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQocHJvdG9bbmFtZV0sIGRlbGVnYXRlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlbGVnYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hY3JvVGFza01ldGEgZXh0ZW5kcyBUYXNrRGF0YSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdGFyZ2V0OiBhbnk7XG4gIGNhbGxiYWNrSW5kZXg6IG51bWJlcjtcbiAgYXJnczogYW55W107XG59XG5cbi8vIFRPRE86IEBKaWFMaVBhc3Npb24sIHN1cHBvcnQgY2FuY2VsIHRhc2sgbGF0ZXIgaWYgbmVjZXNzYXJ5XG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hNYWNyb1Rhc2soXG4gICAgb2JqOiBhbnksIGZ1bmNOYW1lOiBzdHJpbmcsIG1ldGFDcmVhdG9yOiAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT4gTWFjcm9UYXNrTWV0YSkge1xuICBsZXQgc2V0TmF0aXZlOiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGVUYXNrKHRhc2s6IFRhc2spIHtcbiAgICBjb25zdCBkYXRhID0gPE1hY3JvVGFza01ldGE+dGFzay5kYXRhO1xuICAgIGRhdGEuYXJnc1tkYXRhLmNhbGxiYWNrSW5kZXhdID0gZnVuY3Rpb24oKSB7XG4gICAgICB0YXNrLmludm9rZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgc2V0TmF0aXZlLmFwcGx5KGRhdGEudGFyZ2V0LCBkYXRhLmFyZ3MpO1xuICAgIHJldHVybiB0YXNrO1xuICB9XG5cbiAgc2V0TmF0aXZlID0gcGF0Y2hNZXRob2Qob2JqLCBmdW5jTmFtZSwgKGRlbGVnYXRlOiBGdW5jdGlvbikgPT4gZnVuY3Rpb24oc2VsZjogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgIGNvbnN0IG1ldGEgPSBtZXRhQ3JlYXRvcihzZWxmLCBhcmdzKTtcbiAgICBpZiAobWV0YS5jYWxsYmFja0luZGV4ID49IDAgJiYgdHlwZW9mIGFyZ3NbbWV0YS5jYWxsYmFja0luZGV4XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdGFzayA9IFpvbmUuY3VycmVudC5zY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgICBtZXRhLm5hbWUsIGFyZ3NbbWV0YS5jYWxsYmFja0luZGV4XSwgbWV0YSwgc2NoZWR1bGVUYXNrLCBudWxsKTtcbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjYXVzZSBhbiBlcnJvciBieSBjYWxsaW5nIGl0IGRpcmVjdGx5LlxuICAgICAgcmV0dXJuIGRlbGVnYXRlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWljcm9UYXNrTWV0YSBleHRlbmRzIFRhc2tEYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0YXJnZXQ6IGFueTtcbiAgY2FsbGJhY2tJbmRleDogbnVtYmVyO1xuICBhcmdzOiBhbnlbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoTWljcm9UYXNrKFxuICAgIG9iajogYW55LCBmdW5jTmFtZTogc3RyaW5nLCBtZXRhQ3JlYXRvcjogKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IE1pY3JvVGFza01ldGEpIHtcbiAgbGV0IHNldE5hdGl2ZTogRnVuY3Rpb24gPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlVGFzayh0YXNrOiBUYXNrKSB7XG4gICAgY29uc3QgZGF0YSA9IDxNYWNyb1Rhc2tNZXRhPnRhc2suZGF0YTtcbiAgICBkYXRhLmFyZ3NbZGF0YS5jYWxsYmFja0luZGV4XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGFzay5pbnZva2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIHNldE5hdGl2ZS5hcHBseShkYXRhLnRhcmdldCwgZGF0YS5hcmdzKTtcbiAgICByZXR1cm4gdGFzaztcbiAgfVxuXG4gIHNldE5hdGl2ZSA9IHBhdGNoTWV0aG9kKG9iaiwgZnVuY05hbWUsIChkZWxlZ2F0ZTogRnVuY3Rpb24pID0+IGZ1bmN0aW9uKHNlbGY6IGFueSwgYXJnczogYW55W10pIHtcbiAgICBjb25zdCBtZXRhID0gbWV0YUNyZWF0b3Ioc2VsZiwgYXJncyk7XG4gICAgaWYgKG1ldGEuY2FsbGJhY2tJbmRleCA+PSAwICYmIHR5cGVvZiBhcmdzW21ldGEuY2FsbGJhY2tJbmRleF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHRhc2sgPVxuICAgICAgICAgIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzayhtZXRhLm5hbWUsIGFyZ3NbbWV0YS5jYWxsYmFja0luZGV4XSwgbWV0YSwgc2NoZWR1bGVUYXNrKTtcbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjYXVzZSBhbiBlcnJvciBieSBjYWxsaW5nIGl0IGRpcmVjdGx5LlxuICAgICAgcmV0dXJuIGRlbGVnYXRlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQocGF0Y2hlZDogRnVuY3Rpb24sIG9yaWdpbmFsOiBhbnkpIHtcbiAgKHBhdGNoZWQgYXMgYW55KVt6b25lU3ltYm9sKCdPcmlnaW5hbERlbGVnYXRlJyldID0gb3JpZ2luYWw7XG59XG5cbmxldCBpc0RldGVjdGVkSUVPckVkZ2UgPSBmYWxzZTtcbmxldCBpZU9yRWRnZSA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJRU9yRWRnZSgpIHtcbiAgaWYgKGlzRGV0ZWN0ZWRJRU9yRWRnZSkge1xuICAgIHJldHVybiBpZU9yRWRnZTtcbiAgfVxuXG4gIGlzRGV0ZWN0ZWRJRU9yRWRnZSA9IHRydWU7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIGNvbnN0IG1zaWUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xuICAgIGlmICh1YS5pbmRleE9mKCdNU0lFICcpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdFZGdlLycpICE9PSAtMSkge1xuICAgICAgaWVPckVkZ2UgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaWVPckVkZ2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gIH1cbn1cbiJdfQ==