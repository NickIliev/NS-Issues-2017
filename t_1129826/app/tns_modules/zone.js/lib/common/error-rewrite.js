/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis,undefinedVars}
 */
Zone.__load_patch('Error', function (global, Zone, api) {
    /*
     * This code patches Error so that:
     *   - It ignores un-needed stack frames.
     *   - It Shows the associated Zone for reach frame.
     */
    var blacklistedStackFramesSymbol = api.symbol('blacklistedStackFrames');
    var NativeError = global[api.symbol('Error')] = global['Error'];
    // Store the frames which should be removed from the stack frames
    var blackListedStackFrames = {};
    // We must find the frame where Error was created, otherwise we assume we don't understand stack
    var zoneAwareFrame1;
    var zoneAwareFrame2;
    global['Error'] = ZoneAwareError;
    var stackRewrite = 'stackRewrite';
    /**
     * This is ZoneAwareError which processes the stack frame and cleans up extra frames as well as
     * adds zone information to it.
     */
    function ZoneAwareError() {
        var _this = this;
        // We always have to return native error otherwise the browser console will not work.
        var error = NativeError.apply(this, arguments);
        // Save original stack trace
        var originalStack = error['originalStack'] = error.stack;
        // Process the stack trace and rewrite the frames.
        if (ZoneAwareError[stackRewrite] && originalStack) {
            var frames_1 = originalStack.split('\n');
            var zoneFrame = api.currentZoneFrame();
            var i = 0;
            // Find the first frame
            while (!(frames_1[i] === zoneAwareFrame1 || frames_1[i] === zoneAwareFrame2) &&
                i < frames_1.length) {
                i++;
            }
            for (; i < frames_1.length && zoneFrame; i++) {
                var frame = frames_1[i];
                if (frame.trim()) {
                    switch (blackListedStackFrames[frame]) {
                        case 0 /* blackList */:
                            frames_1.splice(i, 1);
                            i--;
                            break;
                        case 1 /* transition */:
                            if (zoneFrame.parent) {
                                // This is the special frame where zone changed. Print and process it accordingly
                                zoneFrame = zoneFrame.parent;
                            }
                            else {
                                zoneFrame = null;
                            }
                            frames_1.splice(i, 1);
                            i--;
                            break;
                        default:
                            frames_1[i] += " [" + zoneFrame.zone.name + "]";
                    }
                }
            }
            try {
                error.stack = error.zoneAwareStack = frames_1.join('\n');
            }
            catch (e) {
                // ignore as some browsers don't allow overriding of stack
            }
        }
        if (this instanceof NativeError && this.constructor != NativeError) {
            // We got called with a `new` operator AND we are subclass of ZoneAwareError
            // in that case we have to copy all of our properties to `this`.
            Object.keys(error).concat('stack', 'message').forEach(function (key) {
                var value = error[key];
                if (value !== undefined) {
                    try {
                        _this[key] = value;
                    }
                    catch (e) {
                        // ignore the assignment in case it is a setter and it throws.
                    }
                }
            });
            return this;
        }
        return error;
    }
    // Copy the prototype so that instanceof operator works as expected
    ZoneAwareError.prototype = NativeError.prototype;
    ZoneAwareError[blacklistedStackFramesSymbol] = blackListedStackFrames;
    ZoneAwareError[stackRewrite] = false;
    // those properties need special handling
    var specialPropertyNames = ['stackTraceLimit', 'captureStackTrace', 'prepareStackTrace'];
    // those properties of NativeError should be set to ZoneAwareError
    var nativeErrorProperties = Object.keys(NativeError);
    if (nativeErrorProperties) {
        nativeErrorProperties.forEach(function (prop) {
            if (specialPropertyNames.filter(function (sp) { return sp === prop; }).length === 0) {
                Object.defineProperty(ZoneAwareError, prop, {
                    get: function () {
                        return NativeError[prop];
                    },
                    set: function (value) {
                        NativeError[prop] = value;
                    }
                });
            }
        });
    }
    if (NativeError.hasOwnProperty('stackTraceLimit')) {
        // Extend default stack limit as we will be removing few frames.
        NativeError.stackTraceLimit = Math.max(NativeError.stackTraceLimit, 15);
        // make sure that ZoneAwareError has the same property which forwards to NativeError.
        Object.defineProperty(ZoneAwareError, 'stackTraceLimit', {
            get: function () {
                return NativeError.stackTraceLimit;
            },
            set: function (value) {
                return NativeError.stackTraceLimit = value;
            }
        });
    }
    if (NativeError.hasOwnProperty('captureStackTrace')) {
        Object.defineProperty(ZoneAwareError, 'captureStackTrace', {
            // add named function here because we need to remove this
            // stack frame when prepareStackTrace below
            value: function zoneCaptureStackTrace(targetObject, constructorOpt) {
                NativeError.captureStackTrace(targetObject, constructorOpt);
            }
        });
    }
    var ZONE_CAPTURESTACKTRACE = 'zoneCaptureStackTrace';
    Object.defineProperty(ZoneAwareError, 'prepareStackTrace', {
        get: function () {
            return NativeError.prepareStackTrace;
        },
        set: function (value) {
            if (!value || typeof value !== 'function') {
                return NativeError.prepareStackTrace = value;
            }
            return NativeError.prepareStackTrace = function (error, structuredStackTrace) {
                // remove additional stack information from ZoneAwareError.captureStackTrace
                if (structuredStackTrace) {
                    for (var i = 0; i < structuredStackTrace.length; i++) {
                        var st = structuredStackTrace[i];
                        // remove the first function which name is zoneCaptureStackTrace
                        if (st.getFunctionName() === ZONE_CAPTURESTACKTRACE) {
                            structuredStackTrace.splice(i, 1);
                            break;
                        }
                    }
                }
                return value.apply(this, [error, structuredStackTrace]);
            };
        }
    });
    // Now we need to populate the `blacklistedStackFrames` as well as find the
    // run/runGuarded/runTask frames. This is done by creating a detect zone and then threading
    // the execution through all of the above methods so that we can look at the stack trace and
    // find the frames of interest.
    var ZONE_AWARE_ERROR = 'ZoneAwareError';
    var ERROR_DOT = 'Error.';
    var EMPTY = '';
    var RUN_GUARDED = 'runGuarded';
    var RUN_TASK = 'runTask';
    var RUN = 'run';
    var BRACKETS = '(';
    var AT = '@';
    var detectZone = Zone.current.fork({
        name: 'detect',
        onHandleError: function (parentZD, current, target, error) {
            if (error.originalStack && Error === ZoneAwareError) {
                var frames_2 = error.originalStack.split(/\n/);
                var runFrame = false, runGuardedFrame = false, runTaskFrame = false;
                while (frames_2.length) {
                    var frame = frames_2.shift();
                    // On safari it is possible to have stack frame with no line number.
                    // This check makes sure that we don't filter frames on name only (must have
                    // linenumber)
                    if (/:\d+:\d+/.test(frame)) {
                        // Get rid of the path so that we don't accidentally find function name in path.
                        // In chrome the separator is `(` and `@` in FF and safari
                        // Chrome: at Zone.run (zone.js:100)
                        // Chrome: at Zone.run (http://localhost:9876/base/build/lib/zone.js:100:24)
                        // FireFox: Zone.prototype.run@http://localhost:9876/base/build/lib/zone.js:101:24
                        // Safari: run@http://localhost:9876/base/build/lib/zone.js:101:24
                        var fnName = frame.split(BRACKETS)[0].split(AT)[0];
                        var frameType = 1 /* transition */;
                        if (fnName.indexOf(ZONE_AWARE_ERROR) !== -1) {
                            zoneAwareFrame1 = frame;
                            zoneAwareFrame2 = frame.replace(ERROR_DOT, EMPTY);
                            blackListedStackFrames[zoneAwareFrame2] = 0 /* blackList */;
                        }
                        if (fnName.indexOf(RUN_GUARDED) !== -1) {
                            runGuardedFrame = true;
                        }
                        else if (fnName.indexOf(RUN_TASK) !== -1) {
                            runTaskFrame = true;
                        }
                        else if (fnName.indexOf(RUN) !== -1) {
                            runFrame = true;
                        }
                        else {
                            frameType = 0 /* blackList */;
                        }
                        blackListedStackFrames[frame] = frameType;
                        // Once we find all of the frames we can stop looking.
                        if (runFrame && runGuardedFrame && runTaskFrame) {
                            ZoneAwareError[stackRewrite] = true;
                            break;
                        }
                    }
                }
            }
            return false;
        }
    });
    // carefully constructor a stack frame which contains all of the frames of interest which
    // need to be detected and blacklisted.
    var childDetectZone = detectZone.fork({
        name: 'child',
        onScheduleTask: function (delegate, curr, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, curr, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function (delegate, curr, target, task) {
            return delegate.cancelTask(target, task);
        },
        onInvoke: function (delegate, curr, target, callback, applyThis, applyArgs, source) {
            return delegate.invoke(target, callback, applyThis, applyArgs, source);
        }
    });
    // we need to detect all zone related frames, it will
    // exceed default stackTraceLimit, so we set it to
    // larger number here, and restore it after detect finish.
    var originalStackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 100;
    // we schedule event/micro/macro task, and invoke them
    // when onSchedule, so we can get all stack traces for
    // all kinds of tasks with one error thrown.
    childDetectZone.run(function () {
        childDetectZone.runGuarded(function () {
            var fakeTransitionTo = function (toState, fromState1, fromState2) { };
            childDetectZone.scheduleEventTask(blacklistedStackFramesSymbol, function () {
                childDetectZone.scheduleMacroTask(blacklistedStackFramesSymbol, function () {
                    childDetectZone.scheduleMicroTask(blacklistedStackFramesSymbol, function () {
                        throw new ZoneAwareError(ZoneAwareError, NativeError);
                    }, null, function (t) {
                        t._transitionTo = fakeTransitionTo;
                        t.invoke();
                    });
                }, null, function (t) {
                    t._transitionTo = fakeTransitionTo;
                    t.invoke();
                }, function () { });
            }, null, function (t) {
                t._transitionTo = fakeTransitionTo;
                t.invoke();
            }, function () { });
        });
    });
    Error.stackTraceLimit = originalStackTraceLimit;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmV3cml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9yLXJld3JpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0g7OztHQUdHO0FBaUJILElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFpQjtJQUN4RTs7OztPQUlHO0lBU0gsSUFBTSw0QkFBNEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDMUUsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEUsaUVBQWlFO0lBQ2pFLElBQU0sc0JBQXNCLEdBQWlDLEVBQUUsQ0FBQztJQUNoRSxnR0FBZ0c7SUFDaEcsSUFBSSxlQUF1QixDQUFDO0lBQzVCLElBQUksZUFBdUIsQ0FBQztJQUU1QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDO0lBQ2pDLElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztJQUVwQzs7O09BR0c7SUFDSDtRQUFBLGlCQThEQztRQTdEQyxxRkFBcUY7UUFDckYsSUFBSSxLQUFLLEdBQVUsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsNEJBQTRCO1FBQzVCLElBQU0sYUFBYSxHQUFJLEtBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRXBFLGtEQUFrRDtRQUNsRCxFQUFFLENBQUMsQ0FBRSxjQUFzQixDQUFDLFlBQVksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxRQUFNLEdBQWEsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENB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Q0FBQzt3QkFDNUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNiLENBQUMsQ0FBQyxDQUFDO2dCQUNULENBQUMsRUFDRCxJQUFJLEVBQ0osVUFBQyxDQUFDO29CQUNDLENBQVMsQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUM7b0JBQzVDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDYixDQUFDLEVBQ0QsY0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixDQUFDLEVBQ0QsSUFBSSxFQUNKLFVBQUMsQ0FBQztnQkFDQyxDQUFTLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDO2dCQUM1QyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDYixDQUFDLEVBQ0QsY0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHtnbG9iYWxUaGlzLHVuZGVmaW5lZFZhcnN9XG4gKi9cblxuLyoqXG4gKiBFeHRlbmQgdGhlIEVycm9yIHdpdGggYWRkaXRpb25hbCBmaWVsZHMgZm9yIHJld3JpdHRlbiBzdGFjayBmcmFtZXNcbiAqL1xuaW50ZXJmYWNlIEVycm9yIHtcbiAgLyoqXG4gICAqIFN0YWNrIHRyYWNlIHdoZXJlIGV4dHJhIGZyYW1lcyBoYXZlIGJlZW4gcmVtb3ZlZCBhbmQgem9uZSBuYW1lcyBhZGRlZC5cbiAgICovXG4gIHpvbmVBd2FyZVN0YWNrPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBPcmlnaW5hbCBzdGFjayB0cmFjZSB3aXRoIG5vIG1vZGlmaWNhdGlvbnNcbiAgICovXG4gIG9yaWdpbmFsU3RhY2s/OiBzdHJpbmc7XG59XG5cblpvbmUuX19sb2FkX3BhdGNoKCdFcnJvcicsIChnbG9iYWw6IGFueSwgWm9uZTogWm9uZVR5cGUsIGFwaTogX1pvbmVQcml2YXRlKSA9PiB7XG4gIC8qXG4gICAqIFRoaXMgY29kZSBwYXRjaGVzIEVycm9yIHNvIHRoYXQ6XG4gICAqICAgLSBJdCBpZ25vcmVzIHVuLW5lZWRlZCBzdGFjayBmcmFtZXMuXG4gICAqICAgLSBJdCBTaG93cyB0aGUgYXNzb2NpYXRlZCBab25lIGZvciByZWFjaCBmcmFtZS5cbiAgICovXG5cbiAgY29uc3QgZW51bSBGcmFtZVR5cGUge1xuICAgIC8vLyBTa2lwIHRoaXMgZnJhbWUgd2hlbiBwcmludGluZyBvdXQgc3RhY2tcbiAgICBibGFja0xpc3QsXG4gICAgLy8vIFRoaXMgZnJhbWUgbWFya3Mgem9uZSB0cmFuc2l0aW9uXG4gICAgdHJhbnNpdGlvblxuICB9XG5cbiAgY29uc3QgYmxhY2tsaXN0ZWRTdGFja0ZyYW1lc1N5bWJvbCA9IGFwaS5zeW1ib2woJ2JsYWNrbGlzdGVkU3RhY2tGcmFtZXMnKTtcbiAgY29uc3QgTmF0aXZlRXJyb3IgPSBnbG9iYWxbYXBpLnN5bWJvbCgnRXJyb3InKV0gPSBnbG9iYWxbJ0Vycm9yJ107XG4gIC8vIFN0b3JlIHRoZSBmcmFtZXMgd2hpY2ggc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgc3RhY2sgZnJhbWVzXG4gIGNvbnN0IGJsYWNrTGlzdGVkU3RhY2tGcmFtZXM6IHtbZnJhbWU6IHN0cmluZ106IEZyYW1lVHlwZX0gPSB7fTtcbiAgLy8gV2UgbXVzdCBmaW5kIHRoZSBmcmFtZSB3aGVyZSBFcnJvciB3YXMgY3JlYXRlZCwgb3RoZXJ3aXNlIHdlIGFzc3VtZSB3ZSBkb24ndCB1bmRlcnN0YW5kIHN0YWNrXG4gIGxldCB6b25lQXdhcmVGcmFtZTE6IHN0cmluZztcbiAgbGV0IHpvbmVBd2FyZUZyYW1lMjogc3RyaW5nO1xuXG4gIGdsb2JhbFsnRXJyb3InXSA9IFpvbmVBd2FyZUVycm9yO1xuICBjb25zdCBzdGFja1Jld3JpdGUgPSAnc3RhY2tSZXdyaXRlJztcblxuICAvKipcbiAgICogVGhpcyBpcyBab25lQXdhcmVFcnJvciB3aGljaCBwcm9jZXNzZXMgdGhlIHN0YWNrIGZyYW1lIGFuZCBjbGVhbnMgdXAgZXh0cmEgZnJhbWVzIGFzIHdlbGwgYXNcbiAgICogYWRkcyB6b25lIGluZm9ybWF0aW9uIHRvIGl0LlxuICAgKi9cbiAgZnVuY3Rpb24gWm9uZUF3YXJlRXJyb3IoKTogRXJyb3Ige1xuICAgIC8vIFdlIGFsd2F5cyBoYXZlIHRvIHJldHVybiBuYXRpdmUgZXJyb3Igb3RoZXJ3aXNlIHRoZSBicm93c2VyIGNvbnNvbGUgd2lsbCBub3Qgd29yay5cbiAgICBsZXQgZXJyb3I6IEVycm9yID0gTmF0aXZlRXJyb3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAvLyBTYXZlIG9yaWdpbmFsIHN0YWNrIHRyYWNlXG4gICAgY29uc3Qgb3JpZ2luYWxTdGFjayA9IChlcnJvciBhcyBhbnkpWydvcmlnaW5hbFN0YWNrJ10gPSBlcnJvci5zdGFjaztcblxuICAgIC8vIFByb2Nlc3MgdGhlIHN0YWNrIHRyYWNlIGFuZCByZXdyaXRlIHRoZSBmcmFtZXMuXG4gICAgaWYgKChab25lQXdhcmVFcnJvciBhcyBhbnkpW3N0YWNrUmV3cml0ZV0gJiYgb3JpZ2luYWxTdGFjaykge1xuICAgICAgbGV0IGZyYW1lczogc3RyaW5nW10gPSBvcmlnaW5hbFN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIGxldCB6b25lRnJhbWUgPSBhcGkuY3VycmVudFpvbmVGcmFtZSgpO1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgLy8gRmluZCB0aGUgZmlyc3QgZnJhbWVcbiAgICAgIHdoaWxlICghKGZyYW1lc1tpXSA9PT0gem9uZUF3YXJlRnJhbWUxIHx8IGZyYW1lc1tpXSA9PT0gem9uZUF3YXJlRnJhbWUyKSAmJlxuICAgICAgICAgICAgIGkgPCBmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICAgIGZvciAoOyBpIDwgZnJhbWVzLmxlbmd0aCAmJiB6b25lRnJhbWU7IGkrKykge1xuICAgICAgICBsZXQgZnJhbWUgPSBmcmFtZXNbaV07XG4gICAgICAgIGlmIChmcmFtZS50cmltKCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGJsYWNrTGlzdGVkU3RhY2tGcmFtZXNbZnJhbWVdKSB7XG4gICAgICAgICAgICBjYXNlIEZyYW1lVHlwZS5ibGFja0xpc3Q6XG4gICAgICAgICAgICAgIGZyYW1lcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZyYW1lVHlwZS50cmFuc2l0aW9uOlxuICAgICAgICAgICAgICBpZiAoem9uZUZyYW1lLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIHNwZWNpYWwgZnJhbWUgd2hlcmUgem9uZSBjaGFuZ2VkLiBQcmludCBhbmQgcHJvY2VzcyBpdCBhY2NvcmRpbmdseVxuICAgICAgICAgICAgICAgIHpvbmVGcmFtZSA9IHpvbmVGcmFtZS5wYXJlbnQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgem9uZUZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmcmFtZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgZnJhbWVzW2ldICs9IGAgWyR7em9uZUZyYW1lLnpvbmUubmFtZX1dYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGVycm9yLnN0YWNrID0gZXJyb3Iuem9uZUF3YXJlU3RhY2sgPSBmcmFtZXMuam9pbignXFxuJyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlnbm9yZSBhcyBzb21lIGJyb3dzZXJzIGRvbid0IGFsbG93IG92ZXJyaWRpbmcgb2Ygc3RhY2tcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIE5hdGl2ZUVycm9yICYmIHRoaXMuY29uc3RydWN0b3IgIT0gTmF0aXZlRXJyb3IpIHtcbiAgICAgIC8vIFdlIGdvdCBjYWxsZWQgd2l0aCBhIGBuZXdgIG9wZXJhdG9yIEFORCB3ZSBhcmUgc3ViY2xhc3Mgb2YgWm9uZUF3YXJlRXJyb3JcbiAgICAgIC8vIGluIHRoYXQgY2FzZSB3ZSBoYXZlIHRvIGNvcHkgYWxsIG9mIG91ciBwcm9wZXJ0aWVzIHRvIGB0aGlzYC5cbiAgICAgIE9iamVjdC5rZXlzKGVycm9yKS5jb25jYXQoJ3N0YWNrJywgJ21lc3NhZ2UnKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSAoZXJyb3IgYXMgYW55KVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgdGhlIGFzc2lnbm1lbnQgaW4gY2FzZSBpdCBpcyBhIHNldHRlciBhbmQgaXQgdGhyb3dzLlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG5cbiAgLy8gQ29weSB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaW5zdGFuY2VvZiBvcGVyYXRvciB3b3JrcyBhcyBleHBlY3RlZFxuICBab25lQXdhcmVFcnJvci5wcm90b3R5cGUgPSBOYXRpdmVFcnJvci5wcm90b3R5cGU7XG4gIChab25lQXdhcmVFcnJvciBhcyBhbnkpW2JsYWNrbGlzdGVkU3RhY2tGcmFtZXNTeW1ib2xdID0gYmxhY2tMaXN0ZWRTdGFja0ZyYW1lcztcbiAgKFpvbmVBd2FyZUVycm9yIGFzIGFueSlbc3RhY2tSZXdyaXRlXSA9IGZhbHNlO1xuXG4gIC8vIHRob3NlIHByb3BlcnRpZXMgbmVlZCBzcGVjaWFsIGhhbmRsaW5nXG4gIGNvbnN0IHNwZWNpYWxQcm9wZXJ0eU5hbWVzID0gWydzdGFja1RyYWNlTGltaXQnLCAnY2FwdHVyZVN0YWNrVHJhY2UnLCAncHJlcGFyZVN0YWNrVHJhY2UnXTtcbiAgLy8gdGhvc2UgcHJvcGVydGllcyBvZiBOYXRpdmVFcnJvciBzaG91bGQgYmUgc2V0IHRvIFpvbmVBd2FyZUVycm9yXG4gIGNvbnN0IG5hdGl2ZUVycm9yUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKE5hdGl2ZUVycm9yKTtcbiAgaWYgKG5hdGl2ZUVycm9yUHJvcGVydGllcykge1xuICAgIG5hdGl2ZUVycm9yUHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgaWYgKHNwZWNpYWxQcm9wZXJ0eU5hbWVzLmZpbHRlcihzcCA9PiBzcCA9PT0gcHJvcCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShab25lQXdhcmVFcnJvciwgcHJvcCwge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTmF0aXZlRXJyb3JbcHJvcF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBOYXRpdmVFcnJvcltwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoTmF0aXZlRXJyb3IuaGFzT3duUHJvcGVydHkoJ3N0YWNrVHJhY2VMaW1pdCcpKSB7XG4gICAgLy8gRXh0ZW5kIGRlZmF1bHQgc3RhY2sgbGltaXQgYXMgd2Ugd2lsbCBiZSByZW1vdmluZyBmZXcgZnJhbWVzLlxuICAgIE5hdGl2ZUVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IE1hdGgubWF4KE5hdGl2ZUVycm9yLnN0YWNrVHJhY2VMaW1pdCwgMTUpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgWm9uZUF3YXJlRXJyb3IgaGFzIHRoZSBzYW1lIHByb3BlcnR5IHdoaWNoIGZvcndhcmRzIHRvIE5hdGl2ZUVycm9yLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShab25lQXdhcmVFcnJvciwgJ3N0YWNrVHJhY2VMaW1pdCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBOYXRpdmVFcnJvci5zdGFja1RyYWNlTGltaXQ7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTmF0aXZlRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoTmF0aXZlRXJyb3IuaGFzT3duUHJvcGVydHkoJ2NhcHR1cmVTdGFja1RyYWNlJykpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWm9uZUF3YXJlRXJyb3IsICdjYXB0dXJlU3RhY2tUcmFjZScsIHtcbiAgICAgIC8vIGFkZCBuYW1lZCBmdW5jdGlvbiBoZXJlIGJlY2F1c2Ugd2UgbmVlZCB0byByZW1vdmUgdGhpc1xuICAgICAgLy8gc3RhY2sgZnJhbWUgd2hlbiBwcmVwYXJlU3RhY2tUcmFjZSBiZWxvd1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHpvbmVDYXB0dXJlU3RhY2tUcmFjZSh0YXJnZXRPYmplY3Q6IE9iamVjdCwgY29uc3RydWN0b3JPcHQ/OiBGdW5jdGlvbikge1xuICAgICAgICBOYXRpdmVFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0YXJnZXRPYmplY3QsIGNvbnN0cnVjdG9yT3B0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IFpPTkVfQ0FQVFVSRVNUQUNLVFJBQ0UgPSAnem9uZUNhcHR1cmVTdGFja1RyYWNlJztcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFpvbmVBd2FyZUVycm9yLCAncHJlcGFyZVN0YWNrVHJhY2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBOYXRpdmVFcnJvci5wcmVwYXJlU3RhY2tUcmFjZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBOYXRpdmVFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hdGl2ZUVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gZnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgIGVycm9yOiBFcnJvciwgc3RydWN0dXJlZFN0YWNrVHJhY2U6IHtnZXRGdW5jdGlvbk5hbWU6IEZ1bmN0aW9ufVtdKSB7XG4gICAgICAgIC8vIHJlbW92ZSBhZGRpdGlvbmFsIHN0YWNrIGluZm9ybWF0aW9uIGZyb20gWm9uZUF3YXJlRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2VcbiAgICAgICAgaWYgKHN0cnVjdHVyZWRTdGFja1RyYWNlKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJ1Y3R1cmVkU3RhY2tUcmFjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3QgPSBzdHJ1Y3R1cmVkU3RhY2tUcmFjZVtpXTtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZmlyc3QgZnVuY3Rpb24gd2hpY2ggbmFtZSBpcyB6b25lQ2FwdHVyZVN0YWNrVHJhY2VcbiAgICAgICAgICAgIGlmIChzdC5nZXRGdW5jdGlvbk5hbWUoKSA9PT0gWk9ORV9DQVBUVVJFU1RBQ0tUUkFDRSkge1xuICAgICAgICAgICAgICBzdHJ1Y3R1cmVkU3RhY2tUcmFjZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUuYXBwbHkodGhpcywgW2Vycm9yLCBzdHJ1Y3R1cmVkU3RhY2tUcmFjZV0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE5vdyB3ZSBuZWVkIHRvIHBvcHVsYXRlIHRoZSBgYmxhY2tsaXN0ZWRTdGFja0ZyYW1lc2AgYXMgd2VsbCBhcyBmaW5kIHRoZVxuICAvLyBydW4vcnVuR3VhcmRlZC9ydW5UYXNrIGZyYW1lcy4gVGhpcyBpcyBkb25lIGJ5IGNyZWF0aW5nIGEgZGV0ZWN0IHpvbmUgYW5kIHRoZW4gdGhyZWFkaW5nXG4gIC8vIHRoZSBleGVjdXRpb24gdGhyb3VnaCBhbGwgb2YgdGhlIGFib3ZlIG1ldGhvZHMgc28gdGhhdCB3ZSBjYW4gbG9vayBhdCB0aGUgc3RhY2sgdHJhY2UgYW5kXG4gIC8vIGZpbmQgdGhlIGZyYW1lcyBvZiBpbnRlcmVzdC5cbiAgY29uc3QgWk9ORV9BV0FSRV9FUlJPUiA9ICdab25lQXdhcmVFcnJvcic7XG4gIGNvbnN0IEVSUk9SX0RPVCA9ICdFcnJvci4nO1xuICBjb25zdCBFTVBUWSA9ICcnO1xuICBjb25zdCBSVU5fR1VBUkRFRCA9ICdydW5HdWFyZGVkJztcbiAgY29uc3QgUlVOX1RBU0sgPSAncnVuVGFzayc7XG4gIGNvbnN0IFJVTiA9ICdydW4nO1xuICBjb25zdCBCUkFDS0VUUyA9ICcoJztcbiAgY29uc3QgQVQgPSAnQCc7XG5cbiAgbGV0IGRldGVjdFpvbmU6IFpvbmUgPSBab25lLmN1cnJlbnQuZm9yayh7XG4gICAgbmFtZTogJ2RldGVjdCcsXG4gICAgb25IYW5kbGVFcnJvcjogZnVuY3Rpb24ocGFyZW50WkQ6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBlcnJvcjogYW55KTpcbiAgICAgICAgYm9vbGVhbiB7XG4gICAgICAgICAgaWYgKGVycm9yLm9yaWdpbmFsU3RhY2sgJiYgRXJyb3IgPT09IFpvbmVBd2FyZUVycm9yKSB7XG4gICAgICAgICAgICBsZXQgZnJhbWVzID0gZXJyb3Iub3JpZ2luYWxTdGFjay5zcGxpdCgvXFxuLyk7XG4gICAgICAgICAgICBsZXQgcnVuRnJhbWUgPSBmYWxzZSwgcnVuR3VhcmRlZEZyYW1lID0gZmFsc2UsIHJ1blRhc2tGcmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgbGV0IGZyYW1lID0gZnJhbWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgIC8vIE9uIHNhZmFyaSBpdCBpcyBwb3NzaWJsZSB0byBoYXZlIHN0YWNrIGZyYW1lIHdpdGggbm8gbGluZSBudW1iZXIuXG4gICAgICAgICAgICAgIC8vIFRoaXMgY2hlY2sgbWFrZXMgc3VyZSB0aGF0IHdlIGRvbid0IGZpbHRlciBmcmFtZXMgb24gbmFtZSBvbmx5IChtdXN0IGhhdmVcbiAgICAgICAgICAgICAgLy8gbGluZW51bWJlcilcbiAgICAgICAgICAgICAgaWYgKC86XFxkKzpcXGQrLy50ZXN0KGZyYW1lKSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCByaWQgb2YgdGhlIHBhdGggc28gdGhhdCB3ZSBkb24ndCBhY2NpZGVudGFsbHkgZmluZCBmdW5jdGlvbiBuYW1lIGluIHBhdGguXG4gICAgICAgICAgICAgICAgLy8gSW4gY2hyb21lIHRoZSBzZXBhcmF0b3IgaXMgYChgIGFuZCBgQGAgaW4gRkYgYW5kIHNhZmFyaVxuICAgICAgICAgICAgICAgIC8vIENocm9tZTogYXQgWm9uZS5ydW4gKHpvbmUuanM6MTAwKVxuICAgICAgICAgICAgICAgIC8vIENocm9tZTogYXQgWm9uZS5ydW4gKGh0dHA6Ly9sb2NhbGhvc3Q6OTg3Ni9iYXNlL2J1aWxkL2xpYi96b25lLmpzOjEwMDoyNClcbiAgICAgICAgICAgICAgICAvLyBGaXJlRm94OiBab25lLnByb3RvdHlwZS5ydW5AaHR0cDovL2xvY2FsaG9zdDo5ODc2L2Jhc2UvYnVpbGQvbGliL3pvbmUuanM6MTAxOjI0XG4gICAgICAgICAgICAgICAgLy8gU2FmYXJpOiBydW5AaHR0cDovL2xvY2FsaG9zdDo5ODc2L2Jhc2UvYnVpbGQvbGliL3pvbmUuanM6MTAxOjI0XG4gICAgICAgICAgICAgICAgbGV0IGZuTmFtZTogc3RyaW5nID0gZnJhbWUuc3BsaXQoQlJBQ0tFVFMpWzBdLnNwbGl0KEFUKVswXTtcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWVUeXBlID0gRnJhbWVUeXBlLnRyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgaWYgKGZuTmFtZS5pbmRleE9mKFpPTkVfQVdBUkVfRVJST1IpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgem9uZUF3YXJlRnJhbWUxID0gZnJhbWU7XG4gICAgICAgICAgICAgICAgICB6b25lQXdhcmVGcmFtZTIgPSBmcmFtZS5yZXBsYWNlKEVSUk9SX0RPVCwgRU1QVFkpO1xuICAgICAgICAgICAgICAgICAgYmxhY2tMaXN0ZWRTdGFja0ZyYW1lc1t6b25lQXdhcmVGcmFtZTJdID0gRnJhbWVUeXBlLmJsYWNrTGlzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZuTmFtZS5pbmRleE9mKFJVTl9HVUFSREVEKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHJ1bkd1YXJkZWRGcmFtZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmbk5hbWUuaW5kZXhPZihSVU5fVEFTSykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBydW5UYXNrRnJhbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm5OYW1lLmluZGV4T2YoUlVOKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHJ1bkZyYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZnJhbWVUeXBlID0gRnJhbWVUeXBlLmJsYWNrTGlzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYmxhY2tMaXN0ZWRTdGFja0ZyYW1lc1tmcmFtZV0gPSBmcmFtZVR5cGU7XG4gICAgICAgICAgICAgICAgLy8gT25jZSB3ZSBmaW5kIGFsbCBvZiB0aGUgZnJhbWVzIHdlIGNhbiBzdG9wIGxvb2tpbmcuXG4gICAgICAgICAgICAgICAgaWYgKHJ1bkZyYW1lICYmIHJ1bkd1YXJkZWRGcmFtZSAmJiBydW5UYXNrRnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgIChab25lQXdhcmVFcnJvciBhcyBhbnkpW3N0YWNrUmV3cml0ZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICB9KSBhcyBab25lO1xuICAvLyBjYXJlZnVsbHkgY29uc3RydWN0b3IgYSBzdGFjayBmcmFtZSB3aGljaCBjb250YWlucyBhbGwgb2YgdGhlIGZyYW1lcyBvZiBpbnRlcmVzdCB3aGljaFxuICAvLyBuZWVkIHRvIGJlIGRldGVjdGVkIGFuZCBibGFja2xpc3RlZC5cblxuICBjb25zdCBjaGlsZERldGVjdFpvbmUgPSBkZXRlY3Rab25lLmZvcmsoe1xuICAgIG5hbWU6ICdjaGlsZCcsXG4gICAgb25TY2hlZHVsZVRhc2s6IGZ1bmN0aW9uKGRlbGVnYXRlLCBjdXJyLCB0YXJnZXQsIHRhc2spIHtcbiAgICAgIHJldHVybiBkZWxlZ2F0ZS5zY2hlZHVsZVRhc2sodGFyZ2V0LCB0YXNrKTtcbiAgICB9LFxuICAgIG9uSW52b2tlVGFzazogZnVuY3Rpb24oZGVsZWdhdGUsIGN1cnIsIHRhcmdldCwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpIHtcbiAgICAgIHJldHVybiBkZWxlZ2F0ZS5pbnZva2VUYXNrKHRhcmdldCwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpO1xuICAgIH0sXG4gICAgb25DYW5jZWxUYXNrOiBmdW5jdGlvbihkZWxlZ2F0ZSwgY3VyciwgdGFyZ2V0LCB0YXNrKSB7XG4gICAgICByZXR1cm4gZGVsZWdhdGUuY2FuY2VsVGFzayh0YXJnZXQsIHRhc2spO1xuICAgIH0sXG4gICAgb25JbnZva2U6IGZ1bmN0aW9uKGRlbGVnYXRlLCBjdXJyLCB0YXJnZXQsIGNhbGxiYWNrLCBhcHBseVRoaXMsIGFwcGx5QXJncywgc291cmNlKSB7XG4gICAgICByZXR1cm4gZGVsZWdhdGUuaW52b2tlKHRhcmdldCwgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gd2UgbmVlZCB0byBkZXRlY3QgYWxsIHpvbmUgcmVsYXRlZCBmcmFtZXMsIGl0IHdpbGxcbiAgLy8gZXhjZWVkIGRlZmF1bHQgc3RhY2tUcmFjZUxpbWl0LCBzbyB3ZSBzZXQgaXQgdG9cbiAgLy8gbGFyZ2VyIG51bWJlciBoZXJlLCBhbmQgcmVzdG9yZSBpdCBhZnRlciBkZXRlY3QgZmluaXNoLlxuICBjb25zdCBvcmlnaW5hbFN0YWNrVHJhY2VMaW1pdCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdDtcbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMTAwO1xuICAvLyB3ZSBzY2hlZHVsZSBldmVudC9taWNyby9tYWNybyB0YXNrLCBhbmQgaW52b2tlIHRoZW1cbiAgLy8gd2hlbiBvblNjaGVkdWxlLCBzbyB3ZSBjYW4gZ2V0IGFsbCBzdGFjayB0cmFjZXMgZm9yXG4gIC8vIGFsbCBraW5kcyBvZiB0YXNrcyB3aXRoIG9uZSBlcnJvciB0aHJvd24uXG4gIGNoaWxkRGV0ZWN0Wm9uZS5ydW4oKCkgPT4ge1xuICAgIGNoaWxkRGV0ZWN0Wm9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VUcmFuc2l0aW9uVG8gPVxuICAgICAgICAgICh0b1N0YXRlOiBUYXNrU3RhdGUsIGZyb21TdGF0ZTE6IFRhc2tTdGF0ZSwgZnJvbVN0YXRlMjogVGFza1N0YXRlKSA9PiB7fTtcbiAgICAgIGNoaWxkRGV0ZWN0Wm9uZS5zY2hlZHVsZUV2ZW50VGFzayhcbiAgICAgICAgICBibGFja2xpc3RlZFN0YWNrRnJhbWVzU3ltYm9sLFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGNoaWxkRGV0ZWN0Wm9uZS5zY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgICAgICAgICBibGFja2xpc3RlZFN0YWNrRnJhbWVzU3ltYm9sLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNoaWxkRGV0ZWN0Wm9uZS5zY2hlZHVsZU1pY3JvVGFzayhcbiAgICAgICAgICAgICAgICAgICAgICBibGFja2xpc3RlZFN0YWNrRnJhbWVzU3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyAoWm9uZUF3YXJlRXJyb3IgYXMgYW55KShab25lQXdhcmVFcnJvciwgTmF0aXZlRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAodDogVGFzaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgKHQgYXMgYW55KS5fdHJhbnNpdGlvblRvID0gZmFrZVRyYW5zaXRpb25UbztcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuaW52b2tlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAodCBhcyBhbnkpLl90cmFuc2l0aW9uVG8gPSBmYWtlVHJhbnNpdGlvblRvO1xuICAgICAgICAgICAgICAgICAgdC5pbnZva2UoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICgpID0+IHt9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgKHQpID0+IHtcbiAgICAgICAgICAgICh0IGFzIGFueSkuX3RyYW5zaXRpb25UbyA9IGZha2VUcmFuc2l0aW9uVG87XG4gICAgICAgICAgICB0Lmludm9rZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4ge30pO1xuICAgIH0pO1xuICB9KTtcbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gb3JpZ2luYWxTdGFja1RyYWNlTGltaXQ7XG59KTtcbiJdfQ==