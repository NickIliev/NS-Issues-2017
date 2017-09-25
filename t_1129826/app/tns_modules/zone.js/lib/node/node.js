"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./events");
require("./fs");
var events_1 = require("../common/events");
var timers_1 = require("../common/timers");
var utils_1 = require("../common/utils");
var set = 'set';
var clear = 'clear';
Zone.__load_patch('node_timers', function (global, Zone, api) {
    // Timers
    var globalUseTimeoutFromTimer = false;
    try {
        var timers = require('timers');
        var globalEqualTimersTimeout = global.setTimeout === timers.setTimeout;
        if (!globalEqualTimersTimeout && !utils_1.isMix) {
            // 1. if isMix, then we are in mix environment such as Electron
            // we should only patch timers.setTimeout because global.setTimeout
            // have been patched
            // 2. if global.setTimeout not equal timers.setTimeout, check
            // whether global.setTimeout use timers.setTimeout or not
            var originSetTimeout_1 = timers.setTimeout;
            timers.setTimeout = function () {
                globalUseTimeoutFromTimer = true;
                return originSetTimeout_1.apply(this, arguments);
            };
            var detectTimeout = global.setTimeout(function () { }, 100);
            clearTimeout(detectTimeout);
            timers.setTimeout = originSetTimeout_1;
        }
        timers_1.patchTimer(timers, set, clear, 'Timeout');
        timers_1.patchTimer(timers, set, clear, 'Interval');
        timers_1.patchTimer(timers, set, clear, 'Immediate');
    }
    catch (error) {
        // timers module not exists, for example, when we using nativescript
        // timers is not available
    }
    if (utils_1.isMix) {
        // if we are in mix environment, such as Electron,
        // the global.setTimeout has already been patched,
        // so we just patch timers.setTimeout
        return;
    }
    if (!globalUseTimeoutFromTimer) {
        // 1. global setTimeout equals timers setTimeout
        // 2. or global don't use timers setTimeout(maybe some other library patch setTimeout)
        // 3. or load timers module error happens, we should patch global setTimeout
        timers_1.patchTimer(global, set, clear, 'Timeout');
        timers_1.patchTimer(global, set, clear, 'Interval');
        timers_1.patchTimer(global, set, clear, 'Immediate');
    }
    else {
        // global use timers setTimeout, but not equals
        // this happenes when use nodejs v0.10.x, global setTimeout will
        // use a lazy load version of timers setTimeout
        // we should not double patch timer's setTimeout
        // so we only store the __symbol__ for consistency
        global[Zone.__symbol__('setTimeout')] = global.setTimeout;
        global[Zone.__symbol__('setInterval')] = global.setInterval;
        global[Zone.__symbol__('setImmediate')] = global.setImmediate;
    }
});
// patch process related methods
Zone.__load_patch('nextTick', function (global, Zone, api) {
    // patch nextTick as microTask
    utils_1.patchMicroTask(process, 'nextTick', function (self, args) {
        return {
            name: 'process.nextTick',
            args: args,
            callbackIndex: (args.length > 0 && typeof args[0] === 'function') ? 0 : -1,
            target: process
        };
    });
});
Zone.__load_patch('handleUnhandledPromiseRejection', function (global, Zone, api) {
    Zone[api.symbol('unhandledPromiseRejectionHandler')] =
        findProcessPromiseRejectionHandler('unhandledRejection');
    Zone[api.symbol('rejectionHandledHandler')] =
        findProcessPromiseRejectionHandler('rejectionHandled');
    // handle unhandled promise rejection
    function findProcessPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = events_1.findEventTasks(process, evtName);
            eventTasks.forEach(function (eventTask) {
                // process has added unhandledrejection event listener
                // trigger the event listener
                if (evtName === 'unhandledRejection') {
                    eventTask.invoke(e.rejection, e.promise);
                }
                else if (evtName === 'rejectionHandled') {
                    eventTask.invoke(e.promise);
                }
            });
        };
    }
});
// Crypto
Zone.__load_patch('crypto', function (global, Zone, api) {
    var crypto;
    try {
        crypto = require('crypto');
    }
    catch (err) {
    }
    // use the generic patchMacroTask to patch crypto
    if (crypto) {
        var methodNames = ['randomBytes', 'pbkdf2'];
        methodNames.forEach(function (name) {
            utils_1.patchMacroTask(crypto, name, function (self, args) {
                return {
                    name: 'crypto.' + name,
                    args: args,
                    callbackIndex: (args.length > 0 && typeof args[args.length - 1] === 'function') ?
                        args.length - 1 :
                        -1,
                    target: crypto
                };
            });
        });
    }
});
Zone.__load_patch('console', function (global, Zone, api) {
    var consoleMethods = ['dir', 'log', 'info', 'error', 'warn', 'assert', 'debug', 'timeEnd', 'trace'];
    consoleMethods.forEach(function (m) {
        var originalMethod = console[Zone.__symbol__(m)] = console[m];
        if (originalMethod) {
            console[m] = function () {
                var args = Array.prototype.slice.call(arguments);
                if (Zone.current === Zone.root) {
                    return originalMethod.apply(this, args);
                }
                else {
                    return Zone.root.run(originalMethod, this, args);
                }
            };
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCxvQkFBa0I7QUFDbEIsZ0JBQWM7QUFFZCwyQ0FBZ0Q7QUFDaEQsMkNBQTRDO0FBQzVDLHlDQUFzRTtBQUV0RSxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDbEIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBRXRCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFpQjtJQUM5RSxTQUFTO0lBQ1QsSUFBSSx5QkFBeUIsR0FBRyxLQUFLLENBQUM7SUFDdEMsSUFBSSxDQUFDO1FBQ0gsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLElBQUksQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLCtEQUErRDtZQUMvRCxtRUFBbUU7WUFDbkUsb0JBQW9CO1lBQ3BCLDZEQUE2RDtZQUM3RCx5REFBeUQ7WUFDekQsSUFBTSxrQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxVQUFVLEdBQUc7Z0JBQ2xCLHlCQUF5QixHQUFHLElBQUksQ0FBQztnQkFDakMsTUFBTSxDQUFDLGtCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDO1lBQ0YsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2RCxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxr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QUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztZQUNILENBQUMsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgJy4vZXZlbnRzJztcbmltcG9ydCAnLi9mcyc7XG5cbmltcG9ydCB7ZmluZEV2ZW50VGFza3N9IGZyb20gJy4uL2NvbW1vbi9ldmVudHMnO1xuaW1wb3J0IHtwYXRjaFRpbWVyfSBmcm9tICcuLi9jb21tb24vdGltZXJzJztcbmltcG9ydCB7aXNNaXgsIHBhdGNoTWFjcm9UYXNrLCBwYXRjaE1pY3JvVGFza30gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuY29uc3Qgc2V0ID0gJ3NldCc7XG5jb25zdCBjbGVhciA9ICdjbGVhcic7XG5cblpvbmUuX19sb2FkX3BhdGNoKCdub2RlX3RpbWVycycsIChnbG9iYWw6IGFueSwgWm9uZTogWm9uZVR5cGUsIGFwaTogX1pvbmVQcml2YXRlKSA9PiB7XG4gIC8vIFRpbWVyc1xuICBsZXQgZ2xvYmFsVXNlVGltZW91dEZyb21UaW1lciA9IGZhbHNlO1xuICB0cnkge1xuICAgIGNvbnN0IHRpbWVycyA9IHJlcXVpcmUoJ3RpbWVycycpO1xuICAgIGxldCBnbG9iYWxFcXVhbFRpbWVyc1RpbWVvdXQgPSBnbG9iYWwuc2V0VGltZW91dCA9PT0gdGltZXJzLnNldFRpbWVvdXQ7XG4gICAgaWYgKCFnbG9iYWxFcXVhbFRpbWVyc1RpbWVvdXQgJiYgIWlzTWl4KSB7XG4gICAgICAvLyAxLiBpZiBpc01peCwgdGhlbiB3ZSBhcmUgaW4gbWl4IGVudmlyb25tZW50IHN1Y2ggYXMgRWxlY3Ryb25cbiAgICAgIC8vIHdlIHNob3VsZCBvbmx5IHBhdGNoIHRpbWVycy5zZXRUaW1lb3V0IGJlY2F1c2UgZ2xvYmFsLnNldFRpbWVvdXRcbiAgICAgIC8vIGhhdmUgYmVlbiBwYXRjaGVkXG4gICAgICAvLyAyLiBpZiBnbG9iYWwuc2V0VGltZW91dCBub3QgZXF1YWwgdGltZXJzLnNldFRpbWVvdXQsIGNoZWNrXG4gICAgICAvLyB3aGV0aGVyIGdsb2JhbC5zZXRUaW1lb3V0IHVzZSB0aW1lcnMuc2V0VGltZW91dCBvciBub3RcbiAgICAgIGNvbnN0IG9yaWdpblNldFRpbWVvdXQgPSB0aW1lcnMuc2V0VGltZW91dDtcbiAgICAgIHRpbWVycy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGdsb2JhbFVzZVRpbWVvdXRGcm9tVGltZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gb3JpZ2luU2V0VGltZW91dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IGRldGVjdFRpbWVvdXQgPSBnbG9iYWwuc2V0VGltZW91dCgoKSA9PiB7fSwgMTAwKTtcbiAgICAgIGNsZWFyVGltZW91dChkZXRlY3RUaW1lb3V0KTtcbiAgICAgIHRpbWVycy5zZXRUaW1lb3V0ID0gb3JpZ2luU2V0VGltZW91dDtcbiAgICB9XG4gICAgcGF0Y2hUaW1lcih0aW1lcnMsIHNldCwgY2xlYXIsICdUaW1lb3V0Jyk7XG4gICAgcGF0Y2hUaW1lcih0aW1lcnMsIHNldCwgY2xlYXIsICdJbnRlcnZhbCcpO1xuICAgIHBhdGNoVGltZXIodGltZXJzLCBzZXQsIGNsZWFyLCAnSW1tZWRpYXRlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gdGltZXJzIG1vZHVsZSBub3QgZXhpc3RzLCBmb3IgZXhhbXBsZSwgd2hlbiB3ZSB1c2luZyBuYXRpdmVzY3JpcHRcbiAgICAvLyB0aW1lcnMgaXMgbm90IGF2YWlsYWJsZVxuICB9XG4gIGlmIChpc01peCkge1xuICAgIC8vIGlmIHdlIGFyZSBpbiBtaXggZW52aXJvbm1lbnQsIHN1Y2ggYXMgRWxlY3Ryb24sXG4gICAgLy8gdGhlIGdsb2JhbC5zZXRUaW1lb3V0IGhhcyBhbHJlYWR5IGJlZW4gcGF0Y2hlZCxcbiAgICAvLyBzbyB3ZSBqdXN0IHBhdGNoIHRpbWVycy5zZXRUaW1lb3V0XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZ2xvYmFsVXNlVGltZW91dEZyb21UaW1lcikge1xuICAgIC8vIDEuIGdsb2JhbCBzZXRUaW1lb3V0IGVxdWFscyB0aW1lcnMgc2V0VGltZW91dFxuICAgIC8vIDIuIG9yIGdsb2JhbCBkb24ndCB1c2UgdGltZXJzIHNldFRpbWVvdXQobWF5YmUgc29tZSBvdGhlciBsaWJyYXJ5IHBhdGNoIHNldFRpbWVvdXQpXG4gICAgLy8gMy4gb3IgbG9hZCB0aW1lcnMgbW9kdWxlIGVycm9yIGhhcHBlbnMsIHdlIHNob3VsZCBwYXRjaCBnbG9iYWwgc2V0VGltZW91dFxuICAgIHBhdGNoVGltZXIoZ2xvYmFsLCBzZXQsIGNsZWFyLCAnVGltZW91dCcpO1xuICAgIHBhdGNoVGltZXIoZ2xvYmFsLCBzZXQsIGNsZWFyLCAnSW50ZXJ2YWwnKTtcbiAgICBwYXRjaFRpbWVyKGdsb2JhbCwgc2V0LCBjbGVhciwgJ0ltbWVkaWF0ZScpO1xuICB9IGVsc2Uge1xuICAgIC8vIGdsb2JhbCB1c2UgdGltZXJzIHNldFRpbWVvdXQsIGJ1dCBub3QgZXF1YWxzXG4gICAgLy8gdGhpcyBoYXBwZW5lcyB3aGVuIHVzZSBub2RlanMgdjAuMTAueCwgZ2xvYmFsIHNldFRpbWVvdXQgd2lsbFxuICAgIC8vIHVzZSBhIGxhenkgbG9hZCB2ZXJzaW9uIG9mIHRpbWVycyBzZXRUaW1lb3V0XG4gICAgLy8gd2Ugc2hvdWxkIG5vdCBkb3VibGUgcGF0Y2ggdGltZXIncyBzZXRUaW1lb3V0XG4gICAgLy8gc28gd2Ugb25seSBzdG9yZSB0aGUgX19zeW1ib2xfXyBmb3IgY29uc2lzdGVuY3lcbiAgICBnbG9iYWxbWm9uZS5fX3N5bWJvbF9fKCdzZXRUaW1lb3V0JyldID0gZ2xvYmFsLnNldFRpbWVvdXQ7XG4gICAgZ2xvYmFsW1pvbmUuX19zeW1ib2xfXygnc2V0SW50ZXJ2YWwnKV0gPSBnbG9iYWwuc2V0SW50ZXJ2YWw7XG4gICAgZ2xvYmFsW1pvbmUuX19zeW1ib2xfXygnc2V0SW1tZWRpYXRlJyldID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbiAgfVxufSk7XG5cbi8vIHBhdGNoIHByb2Nlc3MgcmVsYXRlZCBtZXRob2RzXG5ab25lLl9fbG9hZF9wYXRjaCgnbmV4dFRpY2snLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICAvLyBwYXRjaCBuZXh0VGljayBhcyBtaWNyb1Rhc2tcbiAgcGF0Y2hNaWNyb1Rhc2socHJvY2VzcywgJ25leHRUaWNrJywgKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ3Byb2Nlc3MubmV4dFRpY2snLFxuICAgICAgYXJnczogYXJncyxcbiAgICAgIGNhbGxiYWNrSW5kZXg6IChhcmdzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpID8gMCA6IC0xLFxuICAgICAgdGFyZ2V0OiBwcm9jZXNzXG4gICAgfTtcbiAgfSk7XG59KTtcblxuWm9uZS5fX2xvYWRfcGF0Y2goXG4gICAgJ2hhbmRsZVVuaGFuZGxlZFByb21pc2VSZWplY3Rpb24nLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICAgICAgKFpvbmUgYXMgYW55KVthcGkuc3ltYm9sKCd1bmhhbmRsZWRQcm9taXNlUmVqZWN0aW9uSGFuZGxlcicpXSA9XG4gICAgICAgICAgZmluZFByb2Nlc3NQcm9taXNlUmVqZWN0aW9uSGFuZGxlcigndW5oYW5kbGVkUmVqZWN0aW9uJyk7XG5cbiAgICAgIChab25lIGFzIGFueSlbYXBpLnN5bWJvbCgncmVqZWN0aW9uSGFuZGxlZEhhbmRsZXInKV0gPVxuICAgICAgICAgIGZpbmRQcm9jZXNzUHJvbWlzZVJlamVjdGlvbkhhbmRsZXIoJ3JlamVjdGlvbkhhbmRsZWQnKTtcblxuICAgICAgLy8gaGFuZGxlIHVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvblxuICAgICAgZnVuY3Rpb24gZmluZFByb2Nlc3NQcm9taXNlUmVqZWN0aW9uSGFuZGxlcihldnROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGU6IGFueSkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50VGFza3MgPSBmaW5kRXZlbnRUYXNrcyhwcm9jZXNzLCBldnROYW1lKTtcbiAgICAgICAgICBldmVudFRhc2tzLmZvckVhY2goZXZlbnRUYXNrID0+IHtcbiAgICAgICAgICAgIC8vIHByb2Nlc3MgaGFzIGFkZGVkIHVuaGFuZGxlZHJlamVjdGlvbiBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgIGlmIChldnROYW1lID09PSAndW5oYW5kbGVkUmVqZWN0aW9uJykge1xuICAgICAgICAgICAgICBldmVudFRhc2suaW52b2tlKGUucmVqZWN0aW9uLCBlLnByb21pc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldnROYW1lID09PSAncmVqZWN0aW9uSGFuZGxlZCcpIHtcbiAgICAgICAgICAgICAgZXZlbnRUYXNrLmludm9rZShlLnByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgfSk7XG5cblxuLy8gQ3J5cHRvXG5ab25lLl9fbG9hZF9wYXRjaCgnY3J5cHRvJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgbGV0IGNyeXB0bzogYW55O1xuICB0cnkge1xuICAgIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgfVxuXG4gIC8vIHVzZSB0aGUgZ2VuZXJpYyBwYXRjaE1hY3JvVGFzayB0byBwYXRjaCBjcnlwdG9cbiAgaWYgKGNyeXB0bykge1xuICAgIGNvbnN0IG1ldGhvZE5hbWVzID0gWydyYW5kb21CeXRlcycsICdwYmtkZjInXTtcbiAgICBtZXRob2ROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgcGF0Y2hNYWNyb1Rhc2soY3J5cHRvLCBuYW1lLCAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6ICdjcnlwdG8uJyArIG5hbWUsXG4gICAgICAgICAgYXJnczogYXJncyxcbiAgICAgICAgICBjYWxsYmFja0luZGV4OiAoYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpID9cbiAgICAgICAgICAgICAgYXJncy5sZW5ndGggLSAxIDpcbiAgICAgICAgICAgICAgLTEsXG4gICAgICAgICAgdGFyZ2V0OiBjcnlwdG9cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KTtcblxuWm9uZS5fX2xvYWRfcGF0Y2goJ2NvbnNvbGUnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICBjb25zdCBjb25zb2xlTWV0aG9kcyA9XG4gICAgICBbJ2RpcicsICdsb2cnLCAnaW5mbycsICdlcnJvcicsICd3YXJuJywgJ2Fzc2VydCcsICdkZWJ1ZycsICd0aW1lRW5kJywgJ3RyYWNlJ107XG4gIGNvbnNvbGVNZXRob2RzLmZvckVhY2goKG06IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gKGNvbnNvbGUgYXMgYW55KVtab25lLl9fc3ltYm9sX18obSldID0gKGNvbnNvbGUgYXMgYW55KVttXTtcbiAgICBpZiAob3JpZ2luYWxNZXRob2QpIHtcbiAgICAgIChjb25zb2xlIGFzIGFueSlbbV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChab25lLmN1cnJlbnQgPT09IFpvbmUucm9vdCkge1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbE1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gWm9uZS5yb290LnJ1bihvcmlnaW5hbE1ldGhvZCwgdGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn0pO1xuIl19