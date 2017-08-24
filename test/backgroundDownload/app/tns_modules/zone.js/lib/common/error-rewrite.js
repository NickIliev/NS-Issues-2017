/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
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
                if (error[key] !== undefined) {
                    try {
                        _this[key] = error[key];
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
                        if (st.getFunctionName() === 'zoneCaptureStackTrace') {
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
                        var fnName = frame.split('(')[0].split('@')[0];
                        var frameType = 1 /* transition */;
                        if (fnName.indexOf('ZoneAwareError') !== -1) {
                            zoneAwareFrame1 = frame;
                            zoneAwareFrame2 = frame.replace('Error.', '');
                            blackListedStackFrames[zoneAwareFrame2] = 0 /* blackList */;
                        }
                        if (fnName.indexOf('runGuarded') !== -1) {
                            runGuardedFrame = true;
                        }
                        else if (fnName.indexOf('runTask') !== -1) {
                            runTaskFrame = true;
                        }
                        else if (fnName.indexOf('run') !== -1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmV3cml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9yLXJld3JpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBaUJILElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFpQjtJQUN4RTs7OztPQUlHO0lBU0gsSUFBTSw0QkFBNEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDMUUsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEUsaUVBQWlFO0lBQ2pFLElBQU0sc0JBQXNCLEdBQWlDLEVBQUUsQ0FBQztJQUNoRSxnR0FBZ0c7SUFDaEcsSUFBSSxlQUF1QixDQUFDO0lBQzVCLElBQUksZUFBdUIsQ0FBQztJQUU1QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDO0lBQ2pDLElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztJQUVwQzs7O09BR0c7SUFDSDtRQUFBLGlCQTZEQztRQTVEQyxxRkFBcUY7UUFDckYsSUFBSSxLQUFLLEdBQVUsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsNEJBQTRCO1FBQzVCLElBQU0sYUFBYSxHQUFJLEtBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRXBFLGtEQUFrRDtRQUNsRCxFQUFFLENBQUMsQ0FBRSxjQUFzQixDQUFDLFlBQVksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxRQUFNLEdBQWEsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLEVB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Z0JBQzVDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNiLENBQUMsRUFDRCxjQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDO0FBQ2xELENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEV4dGVuZCB0aGUgRXJyb3Igd2l0aCBhZGRpdGlvbmFsIGZpZWxkcyBmb3IgcmV3cml0dGVuIHN0YWNrIGZyYW1lc1xuICovXG5pbnRlcmZhY2UgRXJyb3Ige1xuICAvKipcbiAgICogU3RhY2sgdHJhY2Ugd2hlcmUgZXh0cmEgZnJhbWVzIGhhdmUgYmVlbiByZW1vdmVkIGFuZCB6b25lIG5hbWVzIGFkZGVkLlxuICAgKi9cbiAgem9uZUF3YXJlU3RhY2s/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIE9yaWdpbmFsIHN0YWNrIHRyYWNlIHdpdGggbm8gbW9kaWZpY2F0aW9uc1xuICAgKi9cbiAgb3JpZ2luYWxTdGFjaz86IHN0cmluZztcbn1cblxuWm9uZS5fX2xvYWRfcGF0Y2goJ0Vycm9yJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgLypcbiAgICogVGhpcyBjb2RlIHBhdGNoZXMgRXJyb3Igc28gdGhhdDpcbiAgICogICAtIEl0IGlnbm9yZXMgdW4tbmVlZGVkIHN0YWNrIGZyYW1lcy5cbiAgICogICAtIEl0IFNob3dzIHRoZSBhc3NvY2lhdGVkIFpvbmUgZm9yIHJlYWNoIGZyYW1lLlxuICAgKi9cblxuICBjb25zdCBlbnVtIEZyYW1lVHlwZSB7XG4gICAgLy8vIFNraXAgdGhpcyBmcmFtZSB3aGVuIHByaW50aW5nIG91dCBzdGFja1xuICAgIGJsYWNrTGlzdCxcbiAgICAvLy8gVGhpcyBmcmFtZSBtYXJrcyB6b25lIHRyYW5zaXRpb25cbiAgICB0cmFuc2l0aW9uXG4gIH1cblxuICBjb25zdCBibGFja2xpc3RlZFN0YWNrRnJhbWVzU3ltYm9sID0gYXBpLnN5bWJvbCgnYmxhY2tsaXN0ZWRTdGFja0ZyYW1lcycpO1xuICBjb25zdCBOYXRpdmVFcnJvciA9IGdsb2JhbFthcGkuc3ltYm9sKCdFcnJvcicpXSA9IGdsb2JhbFsnRXJyb3InXTtcbiAgLy8gU3RvcmUgdGhlIGZyYW1lcyB3aGljaCBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzdGFjayBmcmFtZXNcbiAgY29uc3QgYmxhY2tMaXN0ZWRTdGFja0ZyYW1lczoge1tmcmFtZTogc3RyaW5nXTogRnJhbWVUeXBlfSA9IHt9O1xuICAvLyBXZSBtdXN0IGZpbmQgdGhlIGZyYW1lIHdoZXJlIEVycm9yIHdhcyBjcmVhdGVkLCBvdGhlcndpc2Ugd2UgYXNzdW1lIHdlIGRvbid0IHVuZGVyc3RhbmQgc3RhY2tcbiAgbGV0IHpvbmVBd2FyZUZyYW1lMTogc3RyaW5nO1xuICBsZXQgem9uZUF3YXJlRnJhbWUyOiBzdHJpbmc7XG5cbiAgZ2xvYmFsWydFcnJvciddID0gWm9uZUF3YXJlRXJyb3I7XG4gIGNvbnN0IHN0YWNrUmV3cml0ZSA9ICdzdGFja1Jld3JpdGUnO1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIFpvbmVBd2FyZUVycm9yIHdoaWNoIHByb2Nlc3NlcyB0aGUgc3RhY2sgZnJhbWUgYW5kIGNsZWFucyB1cCBleHRyYSBmcmFtZXMgYXMgd2VsbCBhc1xuICAgKiBhZGRzIHpvbmUgaW5mb3JtYXRpb24gdG8gaXQuXG4gICAqL1xuICBmdW5jdGlvbiBab25lQXdhcmVFcnJvcigpOiBFcnJvciB7XG4gICAgLy8gV2UgYWx3YXlzIGhhdmUgdG8gcmV0dXJuIG5hdGl2ZSBlcnJvciBvdGhlcndpc2UgdGhlIGJyb3dzZXIgY29uc29sZSB3aWxsIG5vdCB3b3JrLlxuICAgIGxldCBlcnJvcjogRXJyb3IgPSBOYXRpdmVFcnJvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIC8vIFNhdmUgb3JpZ2luYWwgc3RhY2sgdHJhY2VcbiAgICBjb25zdCBvcmlnaW5hbFN0YWNrID0gKGVycm9yIGFzIGFueSlbJ29yaWdpbmFsU3RhY2snXSA9IGVycm9yLnN0YWNrO1xuXG4gICAgLy8gUHJvY2VzcyB0aGUgc3RhY2sgdHJhY2UgYW5kIHJld3JpdGUgdGhlIGZyYW1lcy5cbiAgICBpZiAoKFpvbmVBd2FyZUVycm9yIGFzIGFueSlbc3RhY2tSZXdyaXRlXSAmJiBvcmlnaW5hbFN0YWNrKSB7XG4gICAgICBsZXQgZnJhbWVzOiBzdHJpbmdbXSA9IG9yaWdpbmFsU3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgbGV0IHpvbmVGcmFtZSA9IGFwaS5jdXJyZW50Wm9uZUZyYW1lKCk7XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICAvLyBGaW5kIHRoZSBmaXJzdCBmcmFtZVxuICAgICAgd2hpbGUgKCEoZnJhbWVzW2ldID09PSB6b25lQXdhcmVGcmFtZTEgfHwgZnJhbWVzW2ldID09PSB6b25lQXdhcmVGcmFtZTIpICYmXG4gICAgICAgICAgICAgaSA8IGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgZm9yICg7IGkgPCBmcmFtZXMubGVuZ3RoICYmIHpvbmVGcmFtZTsgaSsrKSB7XG4gICAgICAgIGxldCBmcmFtZSA9IGZyYW1lc1tpXTtcbiAgICAgICAgaWYgKGZyYW1lLnRyaW0oKSkge1xuICAgICAgICAgIHN3aXRjaCAoYmxhY2tMaXN0ZWRTdGFja0ZyYW1lc1tmcmFtZV0pIHtcbiAgICAgICAgICAgIGNhc2UgRnJhbWVUeXBlLmJsYWNrTGlzdDpcbiAgICAgICAgICAgICAgZnJhbWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnJhbWVUeXBlLnRyYW5zaXRpb246XG4gICAgICAgICAgICAgIGlmICh6b25lRnJhbWUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgc3BlY2lhbCBmcmFtZSB3aGVyZSB6b25lIGNoYW5nZWQuIFByaW50IGFuZCBwcm9jZXNzIGl0IGFjY29yZGluZ2x5XG4gICAgICAgICAgICAgICAgem9uZUZyYW1lID0gem9uZUZyYW1lLnBhcmVudDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB6b25lRnJhbWUgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZyYW1lcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBmcmFtZXNbaV0gKz0gYCBbJHt6b25lRnJhbWUuem9uZS5uYW1lfV1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgZXJyb3Iuc3RhY2sgPSBlcnJvci56b25lQXdhcmVTdGFjayA9IGZyYW1lcy5qb2luKCdcXG4nKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaWdub3JlIGFzIHNvbWUgYnJvd3NlcnMgZG9uJ3QgYWxsb3cgb3ZlcnJpZGluZyBvZiBzdGFja1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTmF0aXZlRXJyb3IgJiYgdGhpcy5jb25zdHJ1Y3RvciAhPSBOYXRpdmVFcnJvcikge1xuICAgICAgLy8gV2UgZ290IGNhbGxlZCB3aXRoIGEgYG5ld2Agb3BlcmF0b3IgQU5EIHdlIGFyZSBzdWJjbGFzcyBvZiBab25lQXdhcmVFcnJvclxuICAgICAgLy8gaW4gdGhhdCBjYXNlIHdlIGhhdmUgdG8gY29weSBhbGwgb2Ygb3VyIHByb3BlcnRpZXMgdG8gYHRoaXNgLlxuICAgICAgT2JqZWN0LmtleXMoZXJyb3IpLmNvbmNhdCgnc3RhY2snLCAnbWVzc2FnZScpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoKGVycm9yIGFzIGFueSlba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IChlcnJvciBhcyBhbnkpW2tleV07XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gaWdub3JlIHRoZSBhc3NpZ25tZW50IGluIGNhc2UgaXQgaXMgYSBzZXR0ZXIgYW5kIGl0IHRocm93cy5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG4gIC8vIENvcHkgdGhlIHByb3RvdHlwZSBzbyB0aGF0IGluc3RhbmNlb2Ygb3BlcmF0b3Igd29ya3MgYXMgZXhwZWN0ZWRcbiAgWm9uZUF3YXJlRXJyb3IucHJvdG90eXBlID0gTmF0aXZlRXJyb3IucHJvdG90eXBlO1xuICAoWm9uZUF3YXJlRXJyb3IgYXMgYW55KVtibGFja2xpc3RlZFN0YWNrRnJhbWVzU3ltYm9sXSA9IGJsYWNrTGlzdGVkU3RhY2tGcmFtZXM7XG4gIChab25lQXdhcmVFcnJvciBhcyBhbnkpW3N0YWNrUmV3cml0ZV0gPSBmYWxzZTtcblxuICAvLyB0aG9zZSBwcm9wZXJ0aWVzIG5lZWQgc3BlY2lhbCBoYW5kbGluZ1xuICBjb25zdCBzcGVjaWFsUHJvcGVydHlOYW1lcyA9IFsnc3RhY2tUcmFjZUxpbWl0JywgJ2NhcHR1cmVTdGFja1RyYWNlJywgJ3ByZXBhcmVTdGFja1RyYWNlJ107XG4gIC8vIHRob3NlIHByb3BlcnRpZXMgb2YgTmF0aXZlRXJyb3Igc2hvdWxkIGJlIHNldCB0byBab25lQXdhcmVFcnJvclxuICBjb25zdCBuYXRpdmVFcnJvclByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhOYXRpdmVFcnJvcik7XG4gIGlmIChuYXRpdmVFcnJvclByb3BlcnRpZXMpIHtcbiAgICBuYXRpdmVFcnJvclByb3BlcnRpZXMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGlmIChzcGVjaWFsUHJvcGVydHlOYW1lcy5maWx0ZXIoc3AgPT4gc3AgPT09IHByb3ApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWm9uZUF3YXJlRXJyb3IsIHByb3AsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZUVycm9yW3Byb3BdO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgTmF0aXZlRXJyb3JbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKE5hdGl2ZUVycm9yLmhhc093blByb3BlcnR5KCdzdGFja1RyYWNlTGltaXQnKSkge1xuICAgIC8vIEV4dGVuZCBkZWZhdWx0IHN0YWNrIGxpbWl0IGFzIHdlIHdpbGwgYmUgcmVtb3ZpbmcgZmV3IGZyYW1lcy5cbiAgICBOYXRpdmVFcnJvci5zdGFja1RyYWNlTGltaXQgPSBNYXRoLm1heChOYXRpdmVFcnJvci5zdGFja1RyYWNlTGltaXQsIDE1KTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IFpvbmVBd2FyZUVycm9yIGhhcyB0aGUgc2FtZSBwcm9wZXJ0eSB3aGljaCBmb3J3YXJkcyB0byBOYXRpdmVFcnJvci5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWm9uZUF3YXJlRXJyb3IsICdzdGFja1RyYWNlTGltaXQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTmF0aXZlRXJyb3Iuc3RhY2tUcmFjZUxpbWl0O1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE5hdGl2ZUVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKE5hdGl2ZUVycm9yLmhhc093blByb3BlcnR5KCdjYXB0dXJlU3RhY2tUcmFjZScpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFpvbmVBd2FyZUVycm9yLCAnY2FwdHVyZVN0YWNrVHJhY2UnLCB7XG4gICAgICAvLyBhZGQgbmFtZWQgZnVuY3Rpb24gaGVyZSBiZWNhdXNlIHdlIG5lZWQgdG8gcmVtb3ZlIHRoaXNcbiAgICAgIC8vIHN0YWNrIGZyYW1lIHdoZW4gcHJlcGFyZVN0YWNrVHJhY2UgYmVsb3dcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiB6b25lQ2FwdHVyZVN0YWNrVHJhY2UodGFyZ2V0T2JqZWN0OiBPYmplY3QsIGNvbnN0cnVjdG9yT3B0PzogRnVuY3Rpb24pIHtcbiAgICAgICAgTmF0aXZlRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGFyZ2V0T2JqZWN0LCBjb25zdHJ1Y3Rvck9wdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWm9uZUF3YXJlRXJyb3IsICdwcmVwYXJlU3RhY2tUcmFjZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE5hdGl2ZUVycm9yLnByZXBhcmVTdGFja1RyYWNlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIE5hdGl2ZUVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmF0aXZlRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBmdW5jdGlvbihcbiAgICAgICAgICAgICAgICAgZXJyb3I6IEVycm9yLCBzdHJ1Y3R1cmVkU3RhY2tUcmFjZToge2dldEZ1bmN0aW9uTmFtZTogRnVuY3Rpb259W10pIHtcbiAgICAgICAgLy8gcmVtb3ZlIGFkZGl0aW9uYWwgc3RhY2sgaW5mb3JtYXRpb24gZnJvbSBab25lQXdhcmVFcnJvci5jYXB0dXJlU3RhY2tUcmFjZVxuICAgICAgICBpZiAoc3RydWN0dXJlZFN0YWNrVHJhY2UpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cnVjdHVyZWRTdGFja1RyYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHN0cnVjdHVyZWRTdGFja1RyYWNlW2ldO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBmaXJzdCBmdW5jdGlvbiB3aGljaCBuYW1lIGlzIHpvbmVDYXB0dXJlU3RhY2tUcmFjZVxuICAgICAgICAgICAgaWYgKHN0LmdldEZ1bmN0aW9uTmFtZSgpID09PSAnem9uZUNhcHR1cmVTdGFja1RyYWNlJykge1xuICAgICAgICAgICAgICBzdHJ1Y3R1cmVkU3RhY2tUcmFjZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUuYXBwbHkodGhpcywgW2Vycm9yLCBzdHJ1Y3R1cmVkU3RhY2tUcmFjZV0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE5vdyB3ZSBuZWVkIHRvIHBvcHVsYXRlIHRoZSBgYmxhY2tsaXN0ZWRTdGFja0ZyYW1lc2AgYXMgd2VsbCBhcyBmaW5kIHRoZVxuICAvLyBydW4vcnVuR3VhcmRlZC9ydW5UYXNrIGZyYW1lcy4gVGhpcyBpcyBkb25lIGJ5IGNyZWF0aW5nIGEgZGV0ZWN0IHpvbmUgYW5kIHRoZW4gdGhyZWFkaW5nXG4gIC8vIHRoZSBleGVjdXRpb24gdGhyb3VnaCBhbGwgb2YgdGhlIGFib3ZlIG1ldGhvZHMgc28gdGhhdCB3ZSBjYW4gbG9vayBhdCB0aGUgc3RhY2sgdHJhY2UgYW5kXG4gIC8vIGZpbmQgdGhlIGZyYW1lcyBvZiBpbnRlcmVzdC5cbiAgbGV0IGRldGVjdFpvbmU6IFpvbmUgPSBab25lLmN1cnJlbnQuZm9yayh7XG4gICAgbmFtZTogJ2RldGVjdCcsXG4gICAgb25IYW5kbGVFcnJvcjogZnVuY3Rpb24ocGFyZW50WkQ6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBlcnJvcjogYW55KTpcbiAgICAgICAgYm9vbGVhbiB7XG4gICAgICAgICAgaWYgKGVycm9yLm9yaWdpbmFsU3RhY2sgJiYgRXJyb3IgPT09IFpvbmVBd2FyZUVycm9yKSB7XG4gICAgICAgICAgICBsZXQgZnJhbWVzID0gZXJyb3Iub3JpZ2luYWxTdGFjay5zcGxpdCgvXFxuLyk7XG4gICAgICAgICAgICBsZXQgcnVuRnJhbWUgPSBmYWxzZSwgcnVuR3VhcmRlZEZyYW1lID0gZmFsc2UsIHJ1blRhc2tGcmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgbGV0IGZyYW1lID0gZnJhbWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgIC8vIE9uIHNhZmFyaSBpdCBpcyBwb3NzaWJsZSB0byBoYXZlIHN0YWNrIGZyYW1lIHdpdGggbm8gbGluZSBudW1iZXIuXG4gICAgICAgICAgICAgIC8vIFRoaXMgY2hlY2sgbWFrZXMgc3VyZSB0aGF0IHdlIGRvbid0IGZpbHRlciBmcmFtZXMgb24gbmFtZSBvbmx5IChtdXN0IGhhdmVcbiAgICAgICAgICAgICAgLy8gbGluZW51bWJlcilcbiAgICAgICAgICAgICAgaWYgKC86XFxkKzpcXGQrLy50ZXN0KGZyYW1lKSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCByaWQgb2YgdGhlIHBhdGggc28gdGhhdCB3ZSBkb24ndCBhY2NpZGVudGFsbHkgZmluZCBmdW5jdGlvbiBuYW1lIGluIHBhdGguXG4gICAgICAgICAgICAgICAgLy8gSW4gY2hyb21lIHRoZSBzZXBhcmF0b3IgaXMgYChgIGFuZCBgQGAgaW4gRkYgYW5kIHNhZmFyaVxuICAgICAgICAgICAgICAgIC8vIENocm9tZTogYXQgWm9uZS5ydW4gKHpvbmUuanM6MTAwKVxuICAgICAgICAgICAgICAgIC8vIENocm9tZTogYXQgWm9uZS5ydW4gKGh0dHA6Ly9sb2NhbGhvc3Q6OTg3Ni9iYXNlL2J1aWxkL2xpYi96b25lLmpzOjEwMDoyNClcbiAgICAgICAgICAgICAgICAvLyBGaXJlRm94OiBab25lLnByb3RvdHlwZS5ydW5AaHR0cDovL2xvY2FsaG9zdDo5ODc2L2Jhc2UvYnVpbGQvbGliL3pvbmUuanM6MTAxOjI0XG4gICAgICAgICAgICAgICAgLy8gU2FmYXJpOiBydW5AaHR0cDovL2xvY2FsaG9zdDo5ODc2L2Jhc2UvYnVpbGQvbGliL3pvbmUuanM6MTAxOjI0XG4gICAgICAgICAgICAgICAgbGV0IGZuTmFtZTogc3RyaW5nID0gZnJhbWUuc3BsaXQoJygnKVswXS5zcGxpdCgnQCcpWzBdO1xuICAgICAgICAgICAgICAgIGxldCBmcmFtZVR5cGUgPSBGcmFtZVR5cGUudHJhbnNpdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoZm5OYW1lLmluZGV4T2YoJ1pvbmVBd2FyZUVycm9yJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB6b25lQXdhcmVGcmFtZTEgPSBmcmFtZTtcbiAgICAgICAgICAgICAgICAgIHpvbmVBd2FyZUZyYW1lMiA9IGZyYW1lLnJlcGxhY2UoJ0Vycm9yLicsICcnKTtcbiAgICAgICAgICAgICAgICAgIGJsYWNrTGlzdGVkU3RhY2tGcmFtZXNbem9uZUF3YXJlRnJhbWUyXSA9IEZyYW1lVHlwZS5ibGFja0xpc3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmbk5hbWUuaW5kZXhPZigncnVuR3VhcmRlZCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgcnVuR3VhcmRlZEZyYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZuTmFtZS5pbmRleE9mKCdydW5UYXNrJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBydW5UYXNrRnJhbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm5OYW1lLmluZGV4T2YoJ3J1bicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgcnVuRnJhbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmcmFtZVR5cGUgPSBGcmFtZVR5cGUuYmxhY2tMaXN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBibGFja0xpc3RlZFN0YWNrRnJhbWVzW2ZyYW1lXSA9IGZyYW1lVHlwZTtcbiAgICAgICAgICAgICAgICAvLyBPbmNlIHdlIGZpbmQgYWxsIG9mIHRoZSBmcmFtZXMgd2UgY2FuIHN0b3AgbG9va2luZy5cbiAgICAgICAgICAgICAgICBpZiAocnVuRnJhbWUgJiYgcnVuR3VhcmRlZEZyYW1lICYmIHJ1blRhc2tGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgKFpvbmVBd2FyZUVycm9yIGFzIGFueSlbc3RhY2tSZXdyaXRlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gIH0pIGFzIFpvbmU7XG4gIC8vIGNhcmVmdWxseSBjb25zdHJ1Y3RvciBhIHN0YWNrIGZyYW1lIHdoaWNoIGNvbnRhaW5zIGFsbCBvZiB0aGUgZnJhbWVzIG9mIGludGVyZXN0IHdoaWNoXG4gIC8vIG5lZWQgdG8gYmUgZGV0ZWN0ZWQgYW5kIGJsYWNrbGlzdGVkLlxuXG4gIGNvbnN0IGNoaWxkRGV0ZWN0Wm9uZSA9IGRldGVjdFpvbmUuZm9yayh7XG4gICAgbmFtZTogJ2NoaWxkJyxcbiAgICBvblNjaGVkdWxlVGFzazogZnVuY3Rpb24oZGVsZWdhdGUsIGN1cnIsIHRhcmdldCwgdGFzaykge1xuICAgICAgcmV0dXJuIGRlbGVnYXRlLnNjaGVkdWxlVGFzayh0YXJnZXQsIHRhc2spO1xuICAgIH0sXG4gICAgb25JbnZva2VUYXNrOiBmdW5jdGlvbihkZWxlZ2F0ZSwgY3VyciwgdGFyZ2V0LCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncykge1xuICAgICAgcmV0dXJuIGRlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0LCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gICAgfSxcbiAgICBvbkNhbmNlbFRhc2s6IGZ1bmN0aW9uKGRlbGVnYXRlLCBjdXJyLCB0YXJnZXQsIHRhc2spIHtcbiAgICAgIHJldHVybiBkZWxlZ2F0ZS5jYW5jZWxUYXNrKHRhcmdldCwgdGFzayk7XG4gICAgfSxcbiAgICBvbkludm9rZTogZnVuY3Rpb24oZGVsZWdhdGUsIGN1cnIsIHRhcmdldCwgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBkZWxlZ2F0ZS5pbnZva2UodGFyZ2V0LCBjYWxsYmFjaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MsIHNvdXJjZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyB3ZSBuZWVkIHRvIGRldGVjdCBhbGwgem9uZSByZWxhdGVkIGZyYW1lcywgaXQgd2lsbFxuICAvLyBleGNlZWQgZGVmYXVsdCBzdGFja1RyYWNlTGltaXQsIHNvIHdlIHNldCBpdCB0b1xuICAvLyBsYXJnZXIgbnVtYmVyIGhlcmUsIGFuZCByZXN0b3JlIGl0IGFmdGVyIGRldGVjdCBmaW5pc2guXG4gIGNvbnN0IG9yaWdpbmFsU3RhY2tUcmFjZUxpbWl0ID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0O1xuICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSAxMDA7XG4gIC8vIHdlIHNjaGVkdWxlIGV2ZW50L21pY3JvL21hY3JvIHRhc2ssIGFuZCBpbnZva2UgdGhlbVxuICAvLyB3aGVuIG9uU2NoZWR1bGUsIHNvIHdlIGNhbiBnZXQgYWxsIHN0YWNrIHRyYWNlcyBmb3JcbiAgLy8gYWxsIGtpbmRzIG9mIHRhc2tzIHdpdGggb25lIGVycm9yIHRocm93bi5cbiAgY2hpbGREZXRlY3Rab25lLnJ1bigoKSA9PiB7XG4gICAgY2hpbGREZXRlY3Rab25lLnJ1bkd1YXJkZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZVRyYW5zaXRpb25UbyA9XG4gICAgICAgICAgKHRvU3RhdGU6IFRhc2tTdGF0ZSwgZnJvbVN0YXRlMTogVGFza1N0YXRlLCBmcm9tU3RhdGUyOiBUYXNrU3RhdGUpID0+IHt9O1xuICAgICAgY2hpbGREZXRlY3Rab25lLnNjaGVkdWxlRXZlbnRUYXNrKFxuICAgICAgICAgIGJsYWNrbGlzdGVkU3RhY2tGcmFtZXNTeW1ib2wsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgY2hpbGREZXRlY3Rab25lLnNjaGVkdWxlTWFjcm9UYXNrKFxuICAgICAgICAgICAgICAgIGJsYWNrbGlzdGVkU3RhY2tGcmFtZXNTeW1ib2wsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY2hpbGREZXRlY3Rab25lLnNjaGVkdWxlTWljcm9UYXNrKFxuICAgICAgICAgICAgICAgICAgICAgIGJsYWNrbGlzdGVkU3RhY2tGcmFtZXNTeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IChab25lQXdhcmVFcnJvciBhcyBhbnkpKFpvbmVBd2FyZUVycm9yLCBOYXRpdmVFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICh0OiBUYXNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAodCBhcyBhbnkpLl90cmFuc2l0aW9uVG8gPSBmYWtlVHJhbnNpdGlvblRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgdC5pbnZva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgKHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICh0IGFzIGFueSkuX3RyYW5zaXRpb25UbyA9IGZha2VUcmFuc2l0aW9uVG87XG4gICAgICAgICAgICAgICAgICB0Lmludm9rZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKCkgPT4ge30pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICAodCkgPT4ge1xuICAgICAgICAgICAgKHQgYXMgYW55KS5fdHJhbnNpdGlvblRvID0gZmFrZVRyYW5zaXRpb25UbztcbiAgICAgICAgICAgIHQuaW52b2tlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7fSk7XG4gICAgfSk7XG4gIH0pO1xuICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBvcmlnaW5hbFN0YWNrVHJhY2VMaW1pdDtcbn0pO1xuIl19