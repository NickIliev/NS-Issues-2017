/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone = (function (global) {
    var FUNCTION = 'function';
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var Zone = (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                throw Error('Already loaded patch: ' + name);
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== FUNCTION) {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            // we have to define an variable here, if not
            // typescript compiler will complain below
            var isNotScheduled = task.state === notScheduled;
            if (isNotScheduled && task.type === eventTask) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this
                            .name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) { return delegate.invokeTask(target, task, applyThis, applyArgs); },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                return this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            if (type === eventTask && options && options.isUsingGlobalCallback) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.apply(global, [self, this, arguments]);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                invoke: this.invoke,
                scheduleFn: this.scheduleFn,
                cancelFn: this.cancelFn,
                runCount: this.runCount,
                callback: this.callback
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                nativeMicroTaskQueuePromise[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            var showError = !Zone[__symbol__('ignoreConsoleErrorUncaughtError')];
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInpvbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBMm1CSCxJQUFNLElBQUksR0FBYSxDQUFDLFVBQVMsTUFBVztJQUMxQyxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFFNUIsSUFBTSxXQUFXLEdBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLGNBQWMsSUFBWTtRQUN4QixXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0QsNEJBQTRCLElBQVksRUFBRSxLQUFhO1FBQ3JELFdBQVcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEO1FBcURFLGNBQVksTUFBWSxFQUFFLFFBQWtCO1lBSHBDLGdCQUFXLEdBQXlCLElBQUksQ0FBQztZQUkvQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDOUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7WUFDekQsSUFBSSxDQUFDLGFBQWE7Z0JBQ2QsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkYsQ0FBQztRQXhETSxzQkFBaUIsR0FBeEI7WUFDRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLElBQUksS0FBSyxDQUNYLHVFQUF1RTtvQkFDdkUseUJBQXlCO29CQUN6QiwrREFBK0Q7b0JBQy9ELGtGQUFrRjtvQkFDbEYsc0RBQXNELENBQUMsQ0FBQztZQUM5RCxDQUFDO1FBQ0gsQ0FBQztRQUVELHNCQUFXLFlBQUk7aUJBQWY7Z0JBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDOzs7V0FBQTtRQUVELHNCQUFXLGVBQU87aUJBQWxCO2dCQUNFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDaEMsQ0FBQzs7O1dBQUE7UUFBQSxDQUFDO1FBQ0Ysc0JBQVcsbUJBQVc7aUJBQXRCO2dCQUNFLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDdEIsQ0FBQzs7O1dBQUE7UUFBQSxDQUFDO1FBRUssaUJBQVksR0FBbkIsVUFBb0IsSUFBWSxFQUFFLEVBQVk7WUFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFNLFFBQVEsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFFRCxzQkFBVyx3QkFBTTtpQkFBakI7Z0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdEIsQ0FBQzs7O1dBQUE7UUFBQSxDQUFDO1FBQ0Ysc0JBQVcsc0JBQUk7aUJBQWY7Z0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEIsQ0FBQzs7O1dBQUE7UUFBQSxDQUFDO1FBZ0JLLGtCQUFHLEdBQVYsVUFBVyxHQUFXO1lBQ3BCLElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFTLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFTSwwQkFBVyxHQUFsQixVQUFtQixHQUFXO1lBQzVCLElBQUksT0FBTyxHQUFTLElBQUksQ0FBQztZQUN6QixPQUFPLE9BQU8sRUFBRSxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsQ0FBQztnQkFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUM1QixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFTSxtQkFBSSxHQUFYLFVBQVksUUFBa0I7WUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVNLG1CQUFJLEdBQVgsVUFBZ0MsUUFBVyxFQUFFLE1BQWM7WUFDekQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RSxJQUFNLElBQUksR0FBUyxJQUFJLENBQUM7WUFDeEIsTUFBTSxDQUFDO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQU8sU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLENBQWEsQ0FBQztRQUNoQixDQUFDO1FBR00sa0JBQUcsR0FBVixVQUNJLFFBQStCLEVBQUUsU0FBMEIsRUFBRSxTQUF1QixFQUNwRixNQUFxQjtZQURZLDBCQUFBLEVBQUEscUJBQTBCO1lBQUUsMEJBQUEsRUFBQSxnQkFBdUI7WUFDcEYsdUJBQUEsRUFBQSxhQUFxQjtZQUN2QixpQkFBaUIsR0FBRyxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakYsQ0FBQztvQkFBUyxDQUFDO2dCQUNULGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUMvQyxDQUFDO1FBQ0gsQ0FBQztRQUdNLHlCQUFVLEdBQWpCLFVBQ0ksUUFBK0IsRUFBRSxTQUFxQixFQUFFLFNBQXVCLEVBQy9FLE1BQXFCO1lBRFksMEJBQUEsRUFBQSxnQkFBcUI7WUFBRSwwQkFBQSxFQUFBLGdCQUF1QjtZQUMvRSx1QkFBQSxFQUFBLGFBQXFCO1lBQ3ZCLGlCQUFpQixHQUFHLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxDQUFDO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxNQUFNLEtBQUssQ0FBQztvQkFDZCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO29CQUFTLENBQUM7Z0JBQ1QsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQy9DLENBQUM7UUFDSCxDQUFDO1FBR0Qsc0JBQU8sR0FBUCxVQUFRLElBQVUsRUFBRSxTQUFlLEVBQUUsU0FBZTtZQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQ1gsNkRBQTZEO29CQUM3RCxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFDRCxxRUFBcUU7WUFDckUsaUVBQWlFO1lBQ2pFLHdDQUF3QztZQUV4Qyw2Q0FBNkM7WUFDN0MsMENBQTBDO1lBQzFDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQztZQUNULENBQUM7WUFFRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQztZQUMzQyxZQUFZLElBQUssSUFBc0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFNLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDbEMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUNwQixpQkFBaUIsR0FBRyxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDO2dCQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixDQUFDO2dCQUNELElBQUksQ0FBQztvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3pFLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxNQUFNLEtBQUssQ0FBQztvQkFDZCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO29CQUFTLENBQUM7Z0JBQ1QscUZBQXFGO2dCQUNyRiw2Q0FBNkM7Z0JBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDMUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRSxZQUFZLElBQUssSUFBc0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1RSxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqRCxZQUFZOzRCQUNQLElBQXNCLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ2pGLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzdDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUM7UUFFRCwyQkFBWSxHQUFaLFVBQTZCLElBQU87WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLGlEQUFpRDtnQkFDakQsa0RBQWtEO2dCQUNsRCxJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUM7Z0JBQ3hCLE9BQU8sT0FBTyxFQUFFLENBQUM7b0JBQ2YsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixNQUFNLEtBQUssQ0FBQyxnQ0FBOEIsSUFBSTs2QkFDN0IsSUFBSSxtREFBOEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQztvQkFDdkYsQ0FBQztvQkFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsQ0FBQztZQUNILENBQUM7WUFDQSxJQUE2QixDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdkUsSUFBTSxhQUFhLEdBQW1CLEVBQUUsQ0FBQztZQUN4QyxJQUE2QixDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDN0QsSUFBNkIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQzVDLElBQUksQ0FBQztnQkFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBTSxDQUFDO1lBQzFELENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLG1FQUFtRTtnQkFDbkUsMkVBQTJFO2dCQUMxRSxJQUE2QixDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNoRixvRUFBb0U7Z0JBQ3BFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxHQUFHLENBQUM7WUFDWixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUUsSUFBNkIsQ0FBQyxjQUFjLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDcEUsNEVBQTRFO2dCQUM1RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBNEIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUUsSUFBNkIsQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBNkIsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELGdDQUFpQixHQUFqQixVQUNJLE1BQWMsRUFBRSxRQUFrQixFQUFFLElBQWUsRUFDbkQsY0FBcUM7WUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQ3BCLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQsZ0NBQWlCLEdBQWpCLFVBQ0ksTUFBYyxFQUFFLFFBQWtCLEVBQUUsSUFBYyxFQUFFLGNBQW9DLEVBQ3hGLFlBQWtDO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUNwQixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQztRQUVELGdDQUFpQixHQUFqQixVQUNJLE1BQWMsRUFBRSxRQUFrQixFQUFFLElBQWMsRUFBRSxjQUFvQyxFQUN4RixZQUFrQztZQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FDcEIsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7UUFFRCx5QkFBVSxHQUFWLFVBQVcsSUFBVTtZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFDcEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxtRUFBbUU7b0JBQ25FLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEUsSUFBc0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLGdFQUFnRTtnQkFDL0QsSUFBc0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sR0FBRyxDQUFDO1lBQ1osQ0FBQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBc0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRU8sK0JBQWdCLEdBQXhCLFVBQXlCLElBQW1CLEVBQUUsS0FBYTtZQUN6RCxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzdCLENBQUM7WUFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDOUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNILENBQUM7UUFyUU0sZUFBVSxHQUE2QixVQUFVLENBQUM7UUFzUTNELFdBQUM7S0FBQSxBQXZRRCxJQXVRQztJQUVELElBQU0sV0FBVyxHQUFhO1FBQzVCLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLFVBQUMsUUFBc0IsRUFBRSxDQUFPLEVBQUUsTUFBWSxFQUFFLFlBQTBCO1lBQ3RFLE9BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO1FBQXRDLENBQXNDO1FBQ3JELGNBQWMsRUFBRSxVQUFDLFFBQXNCLEVBQUUsQ0FBTyxFQUFFLE1BQVksRUFBRSxJQUFVO1lBQ3RELE9BQUEsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1FBQW5DLENBQW1DO1FBQ3ZELFlBQVksRUFBRSxVQUFDLFFBQXNCLEVBQUUsQ0FBTyxFQUFFLE1BQVksRUFBRSxJQUFVLEVBQUUsU0FBYyxFQUN6RSxTQUFjLElBQVUsT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUF2RCxDQUF1RDtRQUM5RixZQUFZLEVBQUUsVUFBQyxRQUFzQixFQUFFLENBQU8sRUFBRSxNQUFZLEVBQUUsSUFBVTtZQUN0RCxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztRQUFqQyxDQUFpQztLQUNwRCxDQUFDO0lBRUY7UUEwQ0Usc0JBQVksSUFBVSxFQUFFLGNBQTRCLEVBQUUsUUFBa0I7WUF2Q2hFLGdCQUFXLEdBRXdCLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUMsQ0FBQztZQXNDMUYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7WUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyRixJQUFJLENBQUMsWUFBWTtnQkFDYixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLFFBQVEsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLGNBQWM7Z0JBQ2YsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxjQUFjLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ25CLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLFdBQVc7Z0JBQ1osUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxjQUFjLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6RixJQUFJLENBQUMsY0FBYztnQkFDZixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLFFBQVEsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLGdCQUFnQjtnQkFDakIsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxjQUFjLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLG9CQUFvQjtnQkFDckIsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzRSxJQUFJLENBQUMsZUFBZTtnQkFDaEIsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxRQUFRLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ2xCLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxxQkFBcUI7Z0JBQ3RCLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUUsSUFBSSxDQUFDLGFBQWE7Z0JBQ2QsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxRQUFRLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxlQUFlO2dCQUNoQixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLG1CQUFtQjtnQkFDcEIsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxRSxJQUFJLENBQUMsYUFBYTtnQkFDZCxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLFFBQVEsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLGVBQWU7Z0JBQ2hCLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxRixJQUFJLENBQUMsbUJBQW1CO2dCQUNwQixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUU3QixJQUFNLGVBQWUsR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUN2RCxJQUFNLGFBQWEsR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUNsRSxFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDckMsd0ZBQXdGO2dCQUN4RiwyRkFBMkY7Z0JBQzNGLElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxHQUFHLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQzNELElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGNBQWMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO29CQUN0QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkMsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztvQkFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2QyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCwyQkFBSSxHQUFKLFVBQUssVUFBZ0IsRUFBRSxRQUFrQjtZQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQztnQkFDcEUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRCxnQ0FBUyxHQUFULFVBQVUsVUFBZ0IsRUFBRSxRQUFrQixFQUFFLE1BQWM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZO2dCQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQy9FLFFBQVEsQ0FBQztRQUNmLENBQUM7UUFFRCw2QkFBTSxHQUFOLFVBQU8sVUFBZ0IsRUFBRSxRQUFrQixFQUFFLFNBQWMsRUFBRSxTQUFnQixFQUFFLE1BQWM7WUFFM0YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFDbEYsTUFBTSxDQUFDO2dCQUNYLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxrQ0FBVyxHQUFYLFVBQVksVUFBZ0IsRUFBRSxLQUFVO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYztnQkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQzdCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQztnQkFDeEUsSUFBSSxDQUFDO1FBQ1gsQ0FBQztRQUVELG1DQUFZLEdBQVosVUFBYSxVQUFnQixFQUFFLElBQVU7WUFDdkMsSUFBSSxVQUFVLEdBQWtCLElBQXFCLENBQUM7WUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNwQixVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDekQsQ0FBQztnQkFDRCxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQzVDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBa0IsQ0FBQztnQkFDM0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7b0JBQUMsVUFBVSxHQUFHLElBQXFCLENBQUM7WUFDdEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLGlCQUFpQixDQUFZLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztnQkFDakQsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxpQ0FBVSxHQUFWLFVBQVcsVUFBZ0IsRUFBRSxJQUFVLEVBQUUsU0FBYyxFQUFFLFNBQWM7WUFDckUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FDM0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQzNFLFNBQVMsQ0FBQztnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELGlDQUFVLEdBQVYsVUFBVyxVQUFnQixFQUFFLElBQVU7WUFDckMsSUFBSSxLQUFVLENBQUM7WUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUNuQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsOEJBQU8sR0FBUCxVQUFRLFVBQWdCLEVBQUUsT0FBcUI7WUFDN0MsdURBQXVEO1lBQ3ZELHFDQUFxQztZQUNyQyxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVO29CQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pFLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7UUFDSCxDQUFDO1FBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLElBQWMsRUFBRSxLQUFhO1lBQzVDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDaEMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUM5RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBTSxPQUFPLEdBQWlCO29CQUM1QixTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7b0JBQ2xDLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztvQkFDbEMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO29CQUNsQyxNQUFNLEVBQUUsSUFBSTtpQkFDYixDQUFDO2dCQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuQyxDQUFDO1FBQ0gsQ0FBQztRQUNILG1CQUFDO0lBQUQsQ0FBQyxBQTlORCxJQThOQztJQUVEO1FBYUUsa0JBQ0ksSUFBTyxFQUFFLE1BQWMsRUFBRSxRQUFrQixFQUFFLE9BQWlCLEVBQzlELFVBQWdDLEVBQUUsUUFBOEI7WUFQcEUsVUFBSyxHQUFTLElBQUksQ0FBQztZQUNaLGFBQVEsR0FBVyxDQUFDLENBQUM7WUFDNUIsbUJBQWMsR0FBbUIsSUFBSSxDQUFDO1lBQ3RDLFdBQU0sR0FBYyxjQUFjLENBQUM7WUFLakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxJQUFLLE9BQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUNwQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRztvQkFDWixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBTyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUVNLG1CQUFVLEdBQWpCLFVBQWtCLElBQVMsRUFBRSxNQUFXLEVBQUUsSUFBUztZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNkLENBQUM7WUFDRCx5QkFBeUIsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9DLENBQUM7b0JBQVMsQ0FBQztnQkFDVCxFQUFFLENBQUMsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN4QixDQUFDO2dCQUNELHlCQUF5QixFQUFFLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUM7UUFFRCxzQkFBSSwwQkFBSTtpQkFBUjtnQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQixDQUFDOzs7V0FBQTtRQUVELHNCQUFJLDJCQUFLO2lCQUFUO2dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3JCLENBQUM7OztXQUFBO1FBRU0sd0NBQXFCLEdBQTVCO1lBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELGdDQUFhLEdBQWIsVUFBYyxPQUFrQixFQUFFLFVBQXFCLEVBQUUsVUFBc0I7WUFDN0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFBSSxLQUFLLENBQ1IsSUFBSSxDQUFDLElBQUksVUFBSyxJQUFJLENBQUMsTUFBTSxrQ0FBNkIsT0FBTyw0QkFDYixVQUFVLFVBQUksVUFBVTtvQkFDdkUsUUFBUSxHQUFHLFVBQVUsR0FBRyxJQUFJO29CQUM1QixFQUFFLGdCQUNRLElBQUksQ0FBQyxNQUFNLE9BQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDSCxDQUFDO1FBRU0sMkJBQVEsR0FBZjtZQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUNILENBQUM7UUFFRCxpREFBaUQ7UUFDakQsZ0NBQWdDO1FBQ3pCLHlCQUFNLEdBQWI7WUFDRSxNQUFNLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDO1FBQ0osQ0FBQztRQUNILGVBQUM7SUFBRCxDQUFDLEFBbkdELElBbUdDO0lBRUQsc0RBQXNEO0lBQ3RELHNEQUFzRDtJQUN0RCxvQkFBb0I7SUFDcEIsc0RBQXNEO0lBQ3RELHNEQUFzRDtJQUN0RCxJQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRCxJQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLElBQUksZUFBZSxHQUFXLEVBQUUsQ0FBQztJQUNqQyxJQUFJLHlCQUF5QixHQUFZLEtBQUssQ0FBQztJQUMvQyxJQUFJLDJCQUFnQyxDQUFDO0lBRXJDLDJCQUEyQixJQUFnQjtRQUN6QywrRUFBK0U7UUFDL0UsK0VBQStFO1FBQy9FLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixLQUFLLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsMkVBQTJFO1lBQzNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQiwyQkFBMkIsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxDQUFDO1lBQ0gsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztnQkFDaEMsMkJBQTJCLENBQUMsVUFBVSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUMvQix5QkFBeUIsR0FBRyxJQUFJLENBQUM7WUFDakMsT0FBTyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlCLElBQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQztnQkFDOUIsZUFBZSxHQUFHLEVBQUUsQ0FBQztnQkFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3RDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDO3dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLENBQUM7b0JBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQy9CLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFNLFNBQVMsR0FBWSxDQUFFLElBQVksQ0FBQyxVQUFVLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLHlCQUF5QixHQUFHLEtBQUssQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELHNEQUFzRDtJQUN0RCxzREFBc0Q7SUFDdEQsY0FBYztJQUNkLHNEQUFzRDtJQUN0RCxzREFBc0Q7SUFHdEQsSUFBTSxPQUFPLEdBQUcsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7SUFDbEMsSUFBTSxZQUFZLEdBQW1CLGNBQWMsRUFBRSxVQUFVLEdBQWlCLFlBQVksRUFDeEUsU0FBUyxHQUFnQixXQUFXLEVBQUUsT0FBTyxHQUFjLFNBQVMsRUFDcEUsU0FBUyxHQUFnQixXQUFXLEVBQUUsT0FBTyxHQUFjLFNBQVMsQ0FBQztJQUN6RixJQUFNLFNBQVMsR0FBZ0IsV0FBVyxFQUFFLFNBQVMsR0FBZ0IsV0FBVyxFQUMvRCxTQUFTLEdBQWdCLFdBQVcsQ0FBQztJQUV0RCxJQUFNLE9BQU8sR0FBeUIsRUFBRSxDQUFDO0lBQ3pDLElBQU0sSUFBSSxHQUFpQjtRQUN6QixNQUFNLEVBQUUsVUFBVTtRQUNsQixnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCO1FBQ3pDLGdCQUFnQixFQUFFLElBQUk7UUFDdEIsa0JBQWtCLEVBQUUsSUFBSTtRQUN4QixpQkFBaUIsRUFBRSxpQkFBaUI7UUFDcEMsaUJBQWlCLEVBQUUsY0FBTSxPQUFBLENBQUUsSUFBWSxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLEVBQTdELENBQTZEO1FBQ3RGLGdCQUFnQixFQUFFLGNBQU0sT0FBQSxFQUFFLEVBQUYsQ0FBRTtRQUMxQixpQkFBaUIsRUFBRSxJQUFJO1FBQ3ZCLFdBQVcsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7S0FDeEIsQ0FBQztJQUNGLElBQUksaUJBQWlCLEdBQWUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUMsQ0FBQztJQUMvRSxJQUFJLFlBQVksR0FBUyxJQUFJLENBQUM7SUFDOUIsSUFBSSx5QkFBeUIsR0FBRyxDQUFDLENBQUM7SUFFbEMsa0JBQWlCLENBQUM7SUFFbEIsb0JBQW9CLElBQVk7UUFDOUIsTUFBTSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBR0Qsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLypcbiAqIFN1cHByZXNzIGNsb3N1cmUgY29tcGlsZXIgZXJyb3JzIGFib3V0IHVua25vd24gJ2dsb2JhbCcgdmFyaWFibGVcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBzdXBwcmVzcyB7dW5kZWZpbmVkVmFyc31cbiAqL1xuXG4vKipcbiAqIFpvbmUgaXMgYSBtZWNoYW5pc20gZm9yIGludGVyY2VwdGluZyBhbmQga2VlcGluZyB0cmFjayBvZiBhc3luY2hyb25vdXMgd29yay5cbiAqXG4gKiBBIFpvbmUgaXMgYSBnbG9iYWwgb2JqZWN0IHdoaWNoIGlzIGNvbmZpZ3VyZWQgd2l0aCBydWxlcyBhYm91dCBob3cgdG8gaW50ZXJjZXB0IGFuZCBrZWVwIHRyYWNrXG4gKiBvZiB0aGUgYXN5bmNocm9ub3VzIGNhbGxiYWNrcy4gWm9uZSBoYXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcbiAqXG4gKiAxLiBJbnRlcmNlcHQgYXN5bmNocm9ub3VzIHRhc2sgc2NoZWR1bGluZ1xuICogMi4gV3JhcCBjYWxsYmFja3MgZm9yIGVycm9yLWhhbmRsaW5nIGFuZCB6b25lIHRyYWNraW5nIGFjcm9zcyBhc3luYyBvcGVyYXRpb25zLlxuICogMy4gUHJvdmlkZSBhIHdheSB0byBhdHRhY2ggZGF0YSB0byB6b25lc1xuICogNC4gUHJvdmlkZSBhIGNvbnRleHQgc3BlY2lmaWMgbGFzdCBmcmFtZSBlcnJvciBoYW5kbGluZ1xuICogNS4gKEludGVyY2VwdCBibG9ja2luZyBtZXRob2RzKVxuICpcbiAqIEEgem9uZSBieSBpdHNlbGYgZG9lcyBub3QgZG8gYW55dGhpbmcsIGluc3RlYWQgaXQgcmVsaWVzIG9uIHNvbWUgb3RoZXIgY29kZSB0byByb3V0ZSBleGlzdGluZ1xuICogcGxhdGZvcm0gQVBJIHRocm91Z2ggaXQuIChUaGUgem9uZSBsaWJyYXJ5IHNoaXBzIHdpdGggY29kZSB3aGljaCBtb25rZXkgcGF0Y2hlcyBhbGwgb2YgdGhlXG4gKiBicm93c2VycydzIGFzeW5jaHJvbm91cyBBUEkgYW5kIHJlZGlyZWN0cyB0aGVtIHRocm91Z2ggdGhlIHpvbmUgZm9yIGludGVyY2VwdGlvbi4pXG4gKlxuICogSW4gaXRzIHNpbXBsZXN0IGZvcm0gYSB6b25lIGFsbG93cyBvbmUgdG8gaW50ZXJjZXB0IHRoZSBzY2hlZHVsaW5nIGFuZCBjYWxsaW5nIG9mIGFzeW5jaHJvbm91c1xuICogb3BlcmF0aW9ucywgYW5kIGV4ZWN1dGUgYWRkaXRpb25hbCBjb2RlIGJlZm9yZSBhcyB3ZWxsIGFzIGFmdGVyIHRoZSBhc3luY2hyb25vdXMgdGFzay4gVGhlIHJ1bGVzXG4gKiBvZiBpbnRlcmNlcHRpb24gYXJlIGNvbmZpZ3VyZWQgdXNpbmcgW1pvbmVDb25maWddLiBUaGVyZSBjYW4gYmUgbWFueSBkaWZmZXJlbnQgem9uZSBpbnN0YW5jZXMgaW5cbiAqIGEgc3lzdGVtLCBidXQgb25seSBvbmUgem9uZSBpcyBhY3RpdmUgYXQgYW55IGdpdmVuIHRpbWUgd2hpY2ggY2FuIGJlIHJldHJpZXZlZCB1c2luZ1xuICogW1pvbmUjY3VycmVudF0uXG4gKlxuICpcbiAqXG4gKiAjIyBDYWxsYmFjayBXcmFwcGluZ1xuICpcbiAqIEFuIGltcG9ydGFudCBhc3BlY3Qgb2YgdGhlIHpvbmVzIGlzIHRoYXQgdGhleSBzaG91bGQgcGVyc2lzdCBhY3Jvc3MgYXN5bmNocm9ub3VzIG9wZXJhdGlvbnMuIFRvXG4gKiBhY2hpZXZlIHRoaXMsIHdoZW4gYSBmdXR1cmUgd29yayBpcyBzY2hlZHVsZWQgdGhyb3VnaCBhc3luYyBBUEksIGl0IGlzIG5lY2Vzc2FyeSB0byBjYXB0dXJlLCBhbmRcbiAqIHN1YnNlcXVlbnRseSByZXN0b3JlIHRoZSBjdXJyZW50IHpvbmUuIEZvciBleGFtcGxlIGlmIGEgY29kZSBpcyBydW5uaW5nIGluIHpvbmUgYGJgIGFuZCBpdFxuICogaW52b2tlcyBgc2V0VGltZW91dGAgdG8gc2NoZWR1bGVUYXNrIHdvcmsgbGF0ZXIsIHRoZSBgc2V0VGltZW91dGAgbWV0aG9kIG5lZWRzIHRvIDEpIGNhcHR1cmUgdGhlXG4gKiBjdXJyZW50IHpvbmUgYW5kIDIpIHdyYXAgdGhlIGB3cmFwQ2FsbGJhY2tgIGluIGNvZGUgd2hpY2ggd2lsbCByZXN0b3JlIHRoZSBjdXJyZW50IHpvbmUgYGJgIG9uY2VcbiAqIHRoZSB3cmFwQ2FsbGJhY2sgZXhlY3V0ZXMuIEluIHRoaXMgd2F5IHRoZSBydWxlcyB3aGljaCBnb3Zlcm4gdGhlIGN1cnJlbnQgY29kZSBhcmUgcHJlc2VydmVkIGluXG4gKiBhbGwgZnV0dXJlIGFzeW5jaHJvbm91cyB0YXNrcy4gVGhlcmUgY291bGQgYmUgYSBkaWZmZXJlbnQgem9uZSBgY2Agd2hpY2ggaGFzIGRpZmZlcmVudCBydWxlcyBhbmRcbiAqIGlzIGFzc29jaWF0ZWQgd2l0aCBkaWZmZXJlbnQgYXN5bmNocm9ub3VzIHRhc2tzLiBBcyB0aGVzZSB0YXNrcyBhcmUgcHJvY2Vzc2VkLCBlYWNoIGFzeW5jaHJvbm91c1xuICogd3JhcENhbGxiYWNrIGNvcnJlY3RseSByZXN0b3JlcyB0aGUgY29ycmVjdCB6b25lLCBhcyB3ZWxsIGFzIHByZXNlcnZlcyB0aGUgem9uZSBmb3IgZnV0dXJlXG4gKiBhc3luY2hyb25vdXMgY2FsbGJhY2tzLlxuICpcbiAqIEV4YW1wbGU6IFN1cHBvc2UgYSBicm93c2VyIHBhZ2UgY29uc2lzdCBvZiBhcHBsaWNhdGlvbiBjb2RlIGFzIHdlbGwgYXMgdGhpcmQtcGFydHlcbiAqIGFkdmVydGlzZW1lbnQgY29kZS4gKFRoZXNlIHR3byBjb2RlIGJhc2VzIGFyZSBpbmRlcGVuZGVudCwgZGV2ZWxvcGVkIGJ5IGRpZmZlcmVudCBtdXR1YWxseVxuICogdW5hd2FyZSBkZXZlbG9wZXJzLikgVGhlIGFwcGxpY2F0aW9uIGNvZGUgbWF5IGJlIGludGVyZXN0ZWQgaW4gZG9pbmcgZ2xvYmFsIGVycm9yIGhhbmRsaW5nIGFuZFxuICogc28gaXQgY29uZmlndXJlcyB0aGUgYGFwcGAgem9uZSB0byBzZW5kIGFsbCBvZiB0aGUgZXJyb3JzIHRvIHRoZSBzZXJ2ZXIgZm9yIGFuYWx5c2lzLCBhbmQgdGhlblxuICogZXhlY3V0ZXMgdGhlIGFwcGxpY2F0aW9uIGluIHRoZSBgYXBwYCB6b25lLiBUaGUgYWR2ZXJ0aXNpbmcgY29kZSBpcyBpbnRlcmVzdGVkIGluIHRoZSBzYW1lXG4gKiBlcnJvciBwcm9jZXNzaW5nIGJ1dCBpdCBuZWVkcyB0byBzZW5kIHRoZSBlcnJvcnMgdG8gYSBkaWZmZXJlbnQgdGhpcmQtcGFydHkuIFNvIGl0IGNyZWF0ZXMgdGhlXG4gKiBgYWRzYCB6b25lIHdpdGggYSBkaWZmZXJlbnQgZXJyb3IgaGFuZGxlci4gTm93IGJvdGggYWR2ZXJ0aXNpbmcgYXMgd2VsbCBhcyBhcHBsaWNhdGlvbiBjb2RlXG4gKiBjcmVhdGUgbWFueSBhc3luY2hyb25vdXMgb3BlcmF0aW9ucywgYnV0IHRoZSBbWm9uZV0gd2lsbCBlbnN1cmUgdGhhdCBhbGwgb2YgdGhlIGFzeW5jaHJvbm91c1xuICogb3BlcmF0aW9ucyBjcmVhdGVkIGZyb20gdGhlIGFwcGxpY2F0aW9uIGNvZGUgd2lsbCBleGVjdXRlIGluIGBhcHBgIHpvbmUgd2l0aCBpdHMgZXJyb3JcbiAqIGhhbmRsZXIgYW5kIGFsbCBvZiB0aGUgYWR2ZXJ0aXNlbWVudCBjb2RlIHdpbGwgZXhlY3V0ZSBpbiB0aGUgYGFkc2Agem9uZSB3aXRoIGl0cyBlcnJvciBoYW5kbGVyLlxuICogVGhpcyB3aWxsIG5vdCBvbmx5IHdvcmsgZm9yIHRoZSBhc3luYyBvcGVyYXRpb25zIGNyZWF0ZWQgZGlyZWN0bHksIGJ1dCBhbHNvIGZvciBhbGwgc3Vic2VxdWVudFxuICogYXN5bmNocm9ub3VzIG9wZXJhdGlvbnMuXG4gKlxuICogSWYgeW91IHRoaW5rIG9mIGNoYWluIG9mIGFzeW5jaHJvbm91cyBvcGVyYXRpb25zIGFzIGEgdGhyZWFkIG9mIGV4ZWN1dGlvbiAoYml0IG9mIGEgc3RyZXRjaClcbiAqIHRoZW4gW1pvbmUjY3VycmVudF0gd2lsbCBhY3QgYXMgYSB0aHJlYWQgbG9jYWwgdmFyaWFibGUuXG4gKlxuICpcbiAqXG4gKiAjIyBBc3luY2hyb25vdXMgb3BlcmF0aW9uIHNjaGVkdWxpbmdcbiAqXG4gKiBJbiBhZGRpdGlvbiB0byB3cmFwcGluZyB0aGUgY2FsbGJhY2tzIHRvIHJlc3RvcmUgdGhlIHpvbmUsIGFsbCBvcGVyYXRpb25zIHdoaWNoIGNhdXNlIGFcbiAqIHNjaGVkdWxpbmcgb2Ygd29yayBmb3IgbGF0ZXIgYXJlIHJvdXRlZCB0aHJvdWdoIHRoZSBjdXJyZW50IHpvbmUgd2hpY2ggaXMgYWxsb3dlZCB0byBpbnRlcmNlcHRcbiAqIHRoZW0gYnkgYWRkaW5nIHdvcmsgYmVmb3JlIG9yIGFmdGVyIHRoZSB3cmFwQ2FsbGJhY2sgYXMgd2VsbCBhcyB1c2luZyBkaWZmZXJlbnQgbWVhbnMgb2ZcbiAqIGFjaGlldmluZyB0aGUgcmVxdWVzdC4gKFVzZWZ1bCBmb3IgdW5pdCB0ZXN0aW5nLCBvciB0cmFja2luZyBvZiByZXF1ZXN0cykuIEluIHNvbWUgaW5zdGFuY2VzXG4gKiBzdWNoIGFzIGBzZXRUaW1lb3V0YCB0aGUgd3JhcHBpbmcgb2YgdGhlIHdyYXBDYWxsYmFjayBhbmQgc2NoZWR1bGluZyBpcyBkb25lIGluIHRoZSBzYW1lXG4gKiB3cmFwQ2FsbGJhY2ssIGJ1dCB0aGVyZSBhcmUgb3RoZXIgZXhhbXBsZXMgc3VjaCBhcyBgUHJvbWlzZXNgIHdoZXJlIHRoZSBgdGhlbmAgd3JhcENhbGxiYWNrIGlzXG4gKiB3cmFwcGVkLCBidXQgdGhlIGV4ZWN1dGlvbiBvZiBgdGhlbmAgaW4gdHJpZ2dlcmVkIGJ5IGBQcm9taXNlYCBzY2hlZHVsaW5nIGByZXNvbHZlYCB3b3JrLlxuICpcbiAqIEZ1bmRhbWVudGFsbHkgdGhlcmUgYXJlIHRocmVlIGtpbmRzIG9mIHRhc2tzIHdoaWNoIGNhbiBiZSBzY2hlZHVsZWQ6XG4gKlxuICogMS4gW01pY3JvVGFza10gdXNlZCBmb3IgZG9pbmcgd29yayByaWdodCBhZnRlciB0aGUgY3VycmVudCB0YXNrLiBUaGlzIGlzIG5vbi1jYW5jZWxhYmxlIHdoaWNoIGlzXG4gKiAgICBndWFyYW50ZWVkIHRvIHJ1biBleGFjdGx5IG9uY2UgYW5kIGltbWVkaWF0ZWx5LlxuICogMi4gW01hY3JvVGFza10gdXNlZCBmb3IgZG9pbmcgd29yayBsYXRlci4gU3VjaCBhcyBgc2V0VGltZW91dGAuIFRoaXMgaXMgdHlwaWNhbGx5IGNhbmNlbGFibGVcbiAqICAgIHdoaWNoIGlzIGd1YXJhbnRlZWQgdG8gZXhlY3V0ZSBhdCBsZWFzdCBvbmNlIGFmdGVyIHNvbWUgd2VsbCB1bmRlcnN0b29kIGRlbGF5LlxuICogMy4gW0V2ZW50VGFza10gdXNlZCBmb3IgbGlzdGVuaW5nIG9uIHNvbWUgZnV0dXJlIGV2ZW50LiBUaGlzIG1heSBleGVjdXRlIHplcm8gb3IgbW9yZSB0aW1lcywgd2l0aFxuICogICAgYW4gdW5rbm93biBkZWxheS5cbiAqXG4gKiBFYWNoIGFzeW5jaHJvbm91cyBBUEkgaXMgbW9kZWxlZCBhbmQgcm91dGVkIHRocm91Z2ggb25lIG9mIHRoZXNlIEFQSXMuXG4gKlxuICpcbiAqICMjIyBbTWljcm9UYXNrXVxuICpcbiAqIFtNaWNyb1Rhc2tdcyByZXByZXNlbnQgd29yayB3aGljaCB3aWxsIGJlIGRvbmUgaW4gY3VycmVudCBWTSB0dXJuIGFzIHNvb24gYXMgcG9zc2libGUsIGJlZm9yZSBWTVxuICogeWllbGRpbmcuXG4gKlxuICpcbiAqICMjIyBbVGltZXJUYXNrXVxuICpcbiAqIFtUaW1lclRhc2tdcyByZXByZXNlbnQgd29yayB3aGljaCB3aWxsIGJlIGRvbmUgYWZ0ZXIgc29tZSBkZWxheS4gKFNvbWV0aW1lcyB0aGUgZGVsYXkgaXNcbiAqIGFwcHJveGltYXRlIHN1Y2ggYXMgb24gbmV4dCBhdmFpbGFibGUgYW5pbWF0aW9uIGZyYW1lKS4gVHlwaWNhbGx5IHRoZXNlIG1ldGhvZHMgaW5jbHVkZTpcbiAqIGBzZXRUaW1lb3V0YCwgYHNldEltbWVkaWF0ZWAsIGBzZXRJbnRlcnZhbGAsIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLCBhbmQgYWxsIGJyb3dzZXIgc3BlY2lmXG4gKiB2YXJpYW50cy5cbiAqXG4gKlxuICogIyMjIFtFdmVudFRhc2tdXG4gKlxuICogW0V2ZW50VGFza11zIHJlcHJlc2VudCBhIHJlcXVlc3QgdG8gY3JlYXRlIGEgbGlzdGVuZXIgb24gYW4gZXZlbnQuIFVubGlrZSB0aGUgb3RoZXIgdGFza1xuICogZXZlbnRzIG1heSBuZXZlciBiZSBleGVjdXRlZCwgYnV0IHR5cGljYWxseSBleGVjdXRlIG1vcmUgdGhhbiBvbmNlLiBUaGVyZSBpcyBubyBxdWV1ZSBvZlxuICogZXZlbnRzLCByYXRoZXIgdGhlaXIgY2FsbGJhY2tzIGFyZSB1bnByZWRpY3RhYmxlIGJvdGggaW4gb3JkZXIgYW5kIHRpbWUuXG4gKlxuICpcbiAqICMjIEdsb2JhbCBFcnJvciBIYW5kbGluZ1xuICpcbiAqXG4gKiAjIyBDb21wb3NhYmlsaXR5XG4gKlxuICogWm9uZXMgY2FuIGJlIGNvbXBvc2VkIHRvZ2V0aGVyIHRocm91Z2ggW1pvbmUuZm9yaygpXS4gQSBjaGlsZCB6b25lIG1heSBjcmVhdGUgaXRzIG93biBzZXQgb2ZcbiAqIHJ1bGVzLiBBIGNoaWxkIHpvbmUgaXMgZXhwZWN0ZWQgdG8gZWl0aGVyOlxuICpcbiAqIDEuIERlbGVnYXRlIHRoZSBpbnRlcmNlcHRpb24gdG8gYSBwYXJlbnQgem9uZSwgYW5kIG9wdGlvbmFsbHkgYWRkIGJlZm9yZSBhbmQgYWZ0ZXIgd3JhcENhbGxiYWNrXG4gKiAgICBob29rLnNcbiAqIDIpIE9yIHByb2Nlc3MgdGhlIHJlcXVlc3QgaXRzZWxmIHdpdGhvdXQgZGVsZWdhdGlvbi5cbiAqXG4gKiBDb21wb3NhYmlsaXR5IGFsbG93cyB6b25lcyB0byBrZWVwIHRoZWlyIGNvbmNlcm5zIGNsZWFuLiBGb3IgZXhhbXBsZSBhIHRvcCBtb3N0IHpvbmUgbWF5IGNob3NlXG4gKiB0byBoYW5kbGUgZXJyb3IgaGFuZGxpbmcsIHdoaWxlIGNoaWxkIHpvbmVzIG1heSBjaG9zZSB0byBkbyB1c2VyIGFjdGlvbiB0cmFja2luZy5cbiAqXG4gKlxuICogIyMgUm9vdCBab25lXG4gKlxuICogQXQgdGhlIHN0YXJ0IHRoZSBicm93c2VyIHdpbGwgcnVuIGluIGEgc3BlY2lhbCByb290IHpvbmUsIHdoaWNoIGlzIGNvbmZpZ3VyZSB0byBiZWhhdmUgZXhhY3RseVxuICogbGlrZSB0aGUgcGxhdGZvcm0sIG1ha2luZyBhbnkgZXhpc3RpbmcgY29kZSB3aGljaCBpcyBub3Qtem9uZSBhd2FyZSBiZWhhdmUgYXMgZXhwZWN0ZWQuIEFsbFxuICogem9uZXMgYXJlIGNoaWxkcmVuIG9mIHRoZSByb290IHpvbmUuXG4gKlxuICovXG5pbnRlcmZhY2UgWm9uZSB7XG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Wm9uZX0gVGhlIHBhcmVudCBab25lLlxuICAgKi9cbiAgcGFyZW50OiBab25lO1xuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIFpvbmUgbmFtZSAodXNlZnVsIGZvciBkZWJ1Z2dpbmcpXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGBrZXlgLlxuICAgKlxuICAgKiBJZiB0aGUgY3VycmVudCB6b25lIGRvZXMgbm90IGhhdmUgYSBrZXksIHRoZSByZXF1ZXN0IGlzIGRlbGVnYXRlZCB0byB0aGUgcGFyZW50IHpvbmUuIFVzZVxuICAgKiBbWm9uZVNwZWMucHJvcGVydGllc10gdG8gY29uZmlndXJlIHRoZSBzZXQgb2YgcHJvcGVydGllcyBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgem9uZS5cbiAgICpcbiAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIHJldHJpZXZlLlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgdmFsdWUgZm9yIHRoZSBrZXksIG9yIGB1bmRlZmluZWRgIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGdldChrZXk6IHN0cmluZyk6IGFueTtcbiAgLyoqXG4gICAqIFJldHVybnMgYSBab25lIHdoaWNoIGRlZmluZXMgYSBga2V5YC5cbiAgICpcbiAgICogUmVjdXJzaXZlbHkgc2VhcmNoIHRoZSBwYXJlbnQgWm9uZSB1bnRpbCBhIFpvbmUgd2hpY2ggaGFzIGEgcHJvcGVydHkgYGtleWAgaXMgZm91bmQuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byB1c2UgZm9yIGlkZW50aWZpY2F0aW9uIG9mIHRoZSByZXR1cm5lZCB6b25lLlxuICAgKiBAcmV0dXJucyB7Wm9uZX0gVGhlIFpvbmUgd2hpY2ggZGVmaW5lcyB0aGUgYGtleWAsIGBudWxsYCBpZiBub3QgZm91bmQuXG4gICAqL1xuICBnZXRab25lV2l0aChrZXk6IHN0cmluZyk6IFpvbmU7XG4gIC8qKlxuICAgKiBVc2VkIHRvIGNyZWF0ZSBhIGNoaWxkIHpvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB6b25lU3BlYyBBIHNldCBvZiBydWxlcyB3aGljaCB0aGUgY2hpbGQgem9uZSBzaG91bGQgZm9sbG93LlxuICAgKiBAcmV0dXJucyB7Wm9uZX0gQSBuZXcgY2hpbGQgem9uZS5cbiAgICovXG4gIGZvcmsoem9uZVNwZWM6IFpvbmVTcGVjKTogWm9uZTtcbiAgLyoqXG4gICAqIFdyYXBzIGEgY2FsbGJhY2sgZnVuY3Rpb24gaW4gYSBuZXcgZnVuY3Rpb24gd2hpY2ggd2lsbCBwcm9wZXJseSByZXN0b3JlIHRoZSBjdXJyZW50IHpvbmUgdXBvblxuICAgKiBpbnZvY2F0aW9uLlxuICAgKlxuICAgKiBUaGUgd3JhcHBlZCBmdW5jdGlvbiB3aWxsIHByb3Blcmx5IGZvcndhcmQgYHRoaXNgIGFzIHdlbGwgYXMgYGFyZ3VtZW50c2AgdG8gdGhlIGBjYWxsYmFja2AuXG4gICAqXG4gICAqIEJlZm9yZSB0aGUgZnVuY3Rpb24gaXMgd3JhcHBlZCB0aGUgem9uZSBjYW4gaW50ZXJjZXB0IHRoZSBgY2FsbGJhY2tgIGJ5IGRlY2xhcmluZ1xuICAgKiBbWm9uZVNwZWMub25JbnRlcmNlcHRdLlxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgd3JhcHBlZCBpbiB0aGUgem9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBBIHVuaXF1ZSBkZWJ1ZyBsb2NhdGlvbiBvZiB0aGUgQVBJIGJlaW5nIHdyYXBwZWQuXG4gICAqIEByZXR1cm5zIHtmdW5jdGlvbigpOiAqfSBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaW52b2tlIHRoZSBgY2FsbGJhY2tgIHRocm91Z2ggW1pvbmUucnVuR3VhcmRlZF0uXG4gICAqL1xuICB3cmFwPEYgZXh0ZW5kcyBGdW5jdGlvbj4oY2FsbGJhY2s6IEYsIHNvdXJjZTogc3RyaW5nKTogRjtcbiAgLyoqXG4gICAqIEludm9rZXMgYSBmdW5jdGlvbiBpbiBhIGdpdmVuIHpvbmUuXG4gICAqXG4gICAqIFRoZSBpbnZvY2F0aW9uIG9mIGBjYWxsYmFja2AgY2FuIGJlIGludGVyY2VwdGVkIGJ5IGRlY2xhcmluZyBbWm9uZVNwZWMub25JbnZva2VdLlxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAgICogQHBhcmFtIGFwcGx5VGhpc1xuICAgKiBAcGFyYW0gYXBwbHlBcmdzXG4gICAqIEBwYXJhbSBzb3VyY2UgQSB1bmlxdWUgZGVidWcgbG9jYXRpb24gb2YgdGhlIEFQSSBiZWluZyBpbnZva2VkLlxuICAgKiBAcmV0dXJucyB7YW55fSBWYWx1ZSBmcm9tIHRoZSBgY2FsbGJhY2tgIGZ1bmN0aW9uLlxuICAgKi9cbiAgcnVuPFQ+KGNhbGxiYWNrOiBGdW5jdGlvbiwgYXBwbHlUaGlzPzogYW55LCBhcHBseUFyZ3M/OiBhbnlbXSwgc291cmNlPzogc3RyaW5nKTogVDtcbiAgLyoqXG4gICAqIEludm9rZXMgYSBmdW5jdGlvbiBpbiBhIGdpdmVuIHpvbmUgYW5kIGNhdGNoZXMgYW55IGV4Y2VwdGlvbnMuXG4gICAqXG4gICAqIEFueSBleGNlcHRpb25zIHRocm93biB3aWxsIGJlIGZvcndhcmRlZCB0byBbWm9uZS5IYW5kbGVFcnJvcl0uXG4gICAqXG4gICAqIFRoZSBpbnZvY2F0aW9uIG9mIGBjYWxsYmFja2AgY2FuIGJlIGludGVyY2VwdGVkIGJ5IGRlY2xhcmluZyBbWm9uZVNwZWMub25JbnZva2VdLiBUaGVcbiAgICogaGFuZGxpbmcgb2YgZXhjZXB0aW9ucyBjYW4gaW50ZXJjZXB0ZWQgYnkgZGVjbGFyaW5nIFtab25lU3BlYy5oYW5kbGVFcnJvcl0uXG4gICAqXG4gICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgKiBAcGFyYW0gYXBwbHlUaGlzXG4gICAqIEBwYXJhbSBhcHBseUFyZ3NcbiAgICogQHBhcmFtIHNvdXJjZSBBIHVuaXF1ZSBkZWJ1ZyBsb2NhdGlvbiBvZiB0aGUgQVBJIGJlaW5nIGludm9rZWQuXG4gICAqIEByZXR1cm5zIHthbnl9IFZhbHVlIGZyb20gdGhlIGBjYWxsYmFja2AgZnVuY3Rpb24uXG4gICAqL1xuICBydW5HdWFyZGVkPFQ+KGNhbGxiYWNrOiBGdW5jdGlvbiwgYXBwbHlUaGlzPzogYW55LCBhcHBseUFyZ3M/OiBhbnlbXSwgc291cmNlPzogc3RyaW5nKTogVDtcbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIFRhc2sgYnkgcmVzdG9yaW5nIHRoZSBbWm9uZS5jdXJyZW50VGFza10gaW4gdGhlIFRhc2sncyB6b25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFzayB0byBydW5cbiAgICogQHBhcmFtIGFwcGx5VGhpc1xuICAgKiBAcGFyYW0gYXBwbHlBcmdzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgcnVuVGFzayh0YXNrOiBUYXNrLCBhcHBseVRoaXM/OiBhbnksIGFwcGx5QXJncz86IGFueSk6IGFueTtcblxuICAvKipcbiAgICogU2NoZWR1bGUgYSBNaWNyb1Rhc2suXG4gICAqXG4gICAqIEBwYXJhbSBzb3VyY2VcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBjdXN0b21TY2hlZHVsZVxuICAgKi9cbiAgc2NoZWR1bGVNaWNyb1Rhc2soXG4gICAgICBzb3VyY2U6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBkYXRhPzogVGFza0RhdGEsXG4gICAgICBjdXN0b21TY2hlZHVsZT86ICh0YXNrOiBUYXNrKSA9PiB2b2lkKTogTWljcm9UYXNrO1xuXG4gIC8qKlxuICAgKiBTY2hlZHVsZSBhIE1hY3JvVGFzay5cbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGN1c3RvbVNjaGVkdWxlXG4gICAqIEBwYXJhbSBjdXN0b21DYW5jZWxcbiAgICovXG4gIHNjaGVkdWxlTWFjcm9UYXNrKFxuICAgICAgc291cmNlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgZGF0YTogVGFza0RhdGEsIGN1c3RvbVNjaGVkdWxlOiAodGFzazogVGFzaykgPT4gdm9pZCxcbiAgICAgIGN1c3RvbUNhbmNlbDogKHRhc2s6IFRhc2spID0+IHZvaWQpOiBNYWNyb1Rhc2s7XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlIGFuIEV2ZW50VGFzay5cbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGN1c3RvbVNjaGVkdWxlXG4gICAqIEBwYXJhbSBjdXN0b21DYW5jZWxcbiAgICovXG4gIHNjaGVkdWxlRXZlbnRUYXNrKFxuICAgICAgc291cmNlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgZGF0YTogVGFza0RhdGEsIGN1c3RvbVNjaGVkdWxlOiAodGFzazogVGFzaykgPT4gdm9pZCxcbiAgICAgIGN1c3RvbUNhbmNlbDogKHRhc2s6IFRhc2spID0+IHZvaWQpOiBFdmVudFRhc2s7XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlIGFuIGV4aXN0aW5nIFRhc2suXG4gICAqXG4gICAqIFVzZWZ1bCBmb3IgcmVzY2hlZHVsaW5nIGEgdGFzayB3aGljaCB3YXMgYWxyZWFkeSBjYW5jZWxlZC5cbiAgICpcbiAgICogQHBhcmFtIHRhc2tcbiAgICovXG4gIHNjaGVkdWxlVGFzazxUIGV4dGVuZHMgVGFzaz4odGFzazogVCk6IFQ7XG5cbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgem9uZSB0byBpbnRlcmNlcHQgY2FuY2VsaW5nIG9mIHNjaGVkdWxlZCBUYXNrLlxuICAgKlxuICAgKiBUaGUgaW50ZXJjZXB0aW9uIGlzIGNvbmZpZ3VyZWQgdXNpbmcgW1pvbmVTcGVjLm9uQ2FuY2VsVGFza10uIFRoZSBkZWZhdWx0IGNhbmNlbGVyIGludm9rZXNcbiAgICogdGhlIFtUYXNrLmNhbmNlbEZuXS5cbiAgICpcbiAgICogQHBhcmFtIHRhc2tcbiAgICogQHJldHVybnMge2FueX1cbiAgICovXG4gIGNhbmNlbFRhc2sodGFzazogVGFzayk6IGFueTtcbn1cblxuaW50ZXJmYWNlIFpvbmVUeXBlIHtcbiAgLyoqXG4gICAqIEByZXR1cm5zIHtab25lfSBSZXR1cm5zIHRoZSBjdXJyZW50IFtab25lXS4gUmV0dXJucyB0aGUgY3VycmVudCB6b25lLiBUaGUgb25seSB3YXkgdG8gY2hhbmdlXG4gICAqIHRoZSBjdXJyZW50IHpvbmUgaXMgYnkgaW52b2tpbmcgYSBydW4oKSBtZXRob2QsIHdoaWNoIHdpbGwgdXBkYXRlIHRoZSBjdXJyZW50IHpvbmUgZm9yIHRoZVxuICAgKiBkdXJhdGlvbiBvZiB0aGUgcnVuIG1ldGhvZCBjYWxsYmFjay5cbiAgICovXG4gIGN1cnJlbnQ6IFpvbmU7XG4gIC8qKlxuICAgKiBAcmV0dXJucyB7VGFza30gVGhlIHRhc2sgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IGV4ZWN1dGlvbi5cbiAgICovXG4gIGN1cnJlbnRUYXNrOiBUYXNrO1xuXG4gIC8qKlxuICAgKiBWZXJpZnkgdGhhdCBab25lIGhhcyBiZWVuIGNvcnJlY3RseSBwYXRjaGVkLiBTcGVjaWZpY2FsbHkgdGhhdCBQcm9taXNlIGlzIHpvbmUgYXdhcmUuXG4gICAqL1xuICBhc3NlcnRab25lUGF0Y2hlZCgpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiAgUmV0dXJuIHRoZSByb290IHpvbmUuXG4gICAqL1xuICByb290OiBab25lO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX19sb2FkX3BhdGNoKG5hbWU6IHN0cmluZywgZm46IF9QYXRjaEZuKTogdm9pZDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9fc3ltYm9sX18obmFtZTogc3RyaW5nKTogc3RyaW5nO1xufVxuXG4vKiogQGludGVybmFsICovXG50eXBlIF9QYXRjaEZuID0gKGdsb2JhbDogV2luZG93LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHZvaWQ7XG5cbi8qKiBAaW50ZXJuYWwgKi9cbmludGVyZmFjZSBfWm9uZVByaXZhdGUge1xuICBjdXJyZW50Wm9uZUZyYW1lOiAoKSA9PiBfWm9uZUZyYW1lO1xuICBzeW1ib2w6IChuYW1lOiBzdHJpbmcpID0+IHN0cmluZztcbiAgc2NoZWR1bGVNaWNyb1Rhc2s6ICh0YXNrPzogTWljcm9UYXNrKSA9PiB2b2lkO1xuICBvblVuaGFuZGxlZEVycm9yOiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkO1xuICBtaWNyb3Rhc2tEcmFpbkRvbmU6ICgpID0+IHZvaWQ7XG4gIHNob3dVbmNhdWdodEVycm9yOiAoKSA9PiBib29sZWFuO1xuICBwYXRjaEV2ZW50VGFyZ2V0OiAoZ2xvYmFsOiBhbnksIGFwaXM6IGFueVtdLCBvcHRpb25zPzogYW55KSA9PiBib29sZWFuW107XG4gIHBhdGNoT25Qcm9wZXJ0aWVzOiAob2JqOiBhbnksIHByb3BlcnRpZXM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICBwYXRjaE1ldGhvZDpcbiAgICAgICh0YXJnZXQ6IGFueSwgbmFtZTogc3RyaW5nLFxuICAgICAgIHBhdGNoRm46IChkZWxlZ2F0ZTogRnVuY3Rpb24sIGRlbGVnYXRlTmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgICAgIChzZWxmOiBhbnksIGFyZ3M6IGFueVtdKSA9PiBhbnkpID0+IEZ1bmN0aW9uO1xufVxuXG4vKiogQGludGVybmFsICovXG5pbnRlcmZhY2UgX1pvbmVGcmFtZSB7XG4gIHBhcmVudDogX1pvbmVGcmFtZTtcbiAgem9uZTogWm9uZTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIHdheSB0byBjb25maWd1cmUgdGhlIGludGVyY2VwdGlvbiBvZiB6b25lIGV2ZW50cy5cbiAqXG4gKiBPbmx5IHRoZSBgbmFtZWAgcHJvcGVydHkgaXMgcmVxdWlyZWQgKGFsbCBvdGhlciBhcmUgb3B0aW9uYWwpLlxuICovXG5pbnRlcmZhY2UgWm9uZVNwZWMge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHpvbmUuIFVzZWZ1bCB3aGVuIGRlYnVnZ2luZyBab25lcy5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogQSBzZXQgb2YgcHJvcGVydGllcyB0byBiZSBhc3NvY2lhdGVkIHdpdGggWm9uZS4gVXNlIFtab25lLmdldF0gdG8gcmV0cmlldmUgdGhlbS5cbiAgICovXG4gIHByb3BlcnRpZXM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcblxuICAvKipcbiAgICogQWxsb3dzIHRoZSBpbnRlcmNlcHRpb24gb2Ygem9uZSBmb3JraW5nLlxuICAgKlxuICAgKiBXaGVuIHRoZSB6b25lIGlzIGJlaW5nIGZvcmtlZCwgdGhlIHJlcXVlc3QgaXMgZm9yd2FyZGVkIHRvIHRoaXMgbWV0aG9kIGZvciBpbnRlcmNlcHRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnRab25lRGVsZWdhdGUgRGVsZWdhdGUgd2hpY2ggcGVyZm9ybXMgdGhlIHBhcmVudCBbWm9uZVNwZWNdIG9wZXJhdGlvbi5cbiAgICogQHBhcmFtIGN1cnJlbnRab25lIFRoZSBjdXJyZW50IFtab25lXSB3aGVyZSB0aGUgY3VycmVudCBpbnRlcmNlcHRvciBoYXMgYmVlbiBkZWNsYXJlZC5cbiAgICogQHBhcmFtIHRhcmdldFpvbmUgVGhlIFtab25lXSB3aGljaCBvcmlnaW5hbGx5IHJlY2VpdmVkIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gem9uZVNwZWMgVGhlIGFyZ3VtZW50IHBhc3NlZCBpbnRvIHRoZSBgZm9ya2AgbWV0aG9kLlxuICAgKi9cbiAgb25Gb3JrPzpcbiAgICAgIChwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsXG4gICAgICAgem9uZVNwZWM6IFpvbmVTcGVjKSA9PiBab25lO1xuXG4gIC8qKlxuICAgKiBBbGxvd3MgaW50ZXJjZXB0aW9uIG9mIHRoZSB3cmFwcGluZyBvZiB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnRab25lRGVsZWdhdGUgRGVsZWdhdGUgd2hpY2ggcGVyZm9ybXMgdGhlIHBhcmVudCBbWm9uZVNwZWNdIG9wZXJhdGlvbi5cbiAgICogQHBhcmFtIGN1cnJlbnRab25lIFRoZSBjdXJyZW50IFtab25lXSB3aGVyZSB0aGUgY3VycmVudCBpbnRlcmNlcHRvciBoYXMgYmVlbiBkZWNsYXJlZC5cbiAgICogQHBhcmFtIHRhcmdldFpvbmUgVGhlIFtab25lXSB3aGljaCBvcmlnaW5hbGx5IHJlY2VpdmVkIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gZGVsZWdhdGUgVGhlIGFyZ3VtZW50IHBhc3NlZCBpbnRvIHRoZSBgd2FycGAgbWV0aG9kLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSBhcmd1bWVudCBwYXNzZWQgaW50byB0aGUgYHdhcnBgIG1ldGhvZC5cbiAgICovXG4gIG9uSW50ZXJjZXB0PzpcbiAgICAgIChwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsIGRlbGVnYXRlOiBGdW5jdGlvbixcbiAgICAgICBzb3VyY2U6IHN0cmluZykgPT4gRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEFsbG93cyBpbnRlcmNlcHRpb24gb2YgdGhlIGNhbGxiYWNrIGludm9jYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnRab25lRGVsZWdhdGUgRGVsZWdhdGUgd2hpY2ggcGVyZm9ybXMgdGhlIHBhcmVudCBbWm9uZVNwZWNdIG9wZXJhdGlvbi5cbiAgICogQHBhcmFtIGN1cnJlbnRab25lIFRoZSBjdXJyZW50IFtab25lXSB3aGVyZSB0aGUgY3VycmVudCBpbnRlcmNlcHRvciBoYXMgYmVlbiBkZWNsYXJlZC5cbiAgICogQHBhcmFtIHRhcmdldFpvbmUgVGhlIFtab25lXSB3aGljaCBvcmlnaW5hbGx5IHJlY2VpdmVkIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gZGVsZWdhdGUgVGhlIGFyZ3VtZW50IHBhc3NlZCBpbnRvIHRoZSBgcnVuYCBtZXRob2QuXG4gICAqIEBwYXJhbSBhcHBseVRoaXMgVGhlIGFyZ3VtZW50IHBhc3NlZCBpbnRvIHRoZSBgcnVuYCBtZXRob2QuXG4gICAqIEBwYXJhbSBhcHBseUFyZ3MgVGhlIGFyZ3VtZW50IHBhc3NlZCBpbnRvIHRoZSBgcnVuYCBtZXRob2QuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIGFyZ3VtZW50IHBhc3NlZCBpbnRvIHRoZSBgcnVuYCBtZXRob2QuXG4gICAqL1xuICBvbkludm9rZT86XG4gICAgICAocGFyZW50Wm9uZURlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLCBkZWxlZ2F0ZTogRnVuY3Rpb24sXG4gICAgICAgYXBwbHlUaGlzOiBhbnksIGFwcGx5QXJnczogYW55W10sIHNvdXJjZTogc3RyaW5nKSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIEFsbG93cyBpbnRlcmNlcHRpb24gb2YgdGhlIGVycm9yIGhhbmRsaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50Wm9uZURlbGVnYXRlIERlbGVnYXRlIHdoaWNoIHBlcmZvcm1zIHRoZSBwYXJlbnQgW1pvbmVTcGVjXSBvcGVyYXRpb24uXG4gICAqIEBwYXJhbSBjdXJyZW50Wm9uZSBUaGUgY3VycmVudCBbWm9uZV0gd2hlcmUgdGhlIGN1cnJlbnQgaW50ZXJjZXB0b3IgaGFzIGJlZW4gZGVjbGFyZWQuXG4gICAqIEBwYXJhbSB0YXJnZXRab25lIFRoZSBbWm9uZV0gd2hpY2ggb3JpZ2luYWxseSByZWNlaXZlZCB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIGVycm9yIFRoZSBhcmd1bWVudCBwYXNzZWQgaW50byB0aGUgYGhhbmRsZUVycm9yYCBtZXRob2QuXG4gICAqL1xuICBvbkhhbmRsZUVycm9yPzpcbiAgICAgIChwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsXG4gICAgICAgZXJyb3I6IGFueSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQWxsb3dzIGludGVyY2VwdGlvbiBvZiB0YXNrIHNjaGVkdWxpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnRab25lRGVsZWdhdGUgRGVsZWdhdGUgd2hpY2ggcGVyZm9ybXMgdGhlIHBhcmVudCBbWm9uZVNwZWNdIG9wZXJhdGlvbi5cbiAgICogQHBhcmFtIGN1cnJlbnRab25lIFRoZSBjdXJyZW50IFtab25lXSB3aGVyZSB0aGUgY3VycmVudCBpbnRlcmNlcHRvciBoYXMgYmVlbiBkZWNsYXJlZC5cbiAgICogQHBhcmFtIHRhcmdldFpvbmUgVGhlIFtab25lXSB3aGljaCBvcmlnaW5hbGx5IHJlY2VpdmVkIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gdGFzayBUaGUgYXJndW1lbnQgcGFzc2VkIGludG8gdGhlIGBzY2hlZHVsZVRhc2tgIG1ldGhvZC5cbiAgICovXG4gIG9uU2NoZWR1bGVUYXNrPzpcbiAgICAgIChwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsIHRhc2s6IFRhc2spID0+IFRhc2s7XG5cbiAgb25JbnZva2VUYXNrPzpcbiAgICAgIChwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsIHRhc2s6IFRhc2ssXG4gICAgICAgYXBwbHlUaGlzOiBhbnksIGFwcGx5QXJnczogYW55KSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIEFsbG93cyBpbnRlcmNlcHRpb24gb2YgdGFzayBjYW5jZWxsYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnRab25lRGVsZWdhdGUgRGVsZWdhdGUgd2hpY2ggcGVyZm9ybXMgdGhlIHBhcmVudCBbWm9uZVNwZWNdIG9wZXJhdGlvbi5cbiAgICogQHBhcmFtIGN1cnJlbnRab25lIFRoZSBjdXJyZW50IFtab25lXSB3aGVyZSB0aGUgY3VycmVudCBpbnRlcmNlcHRvciBoYXMgYmVlbiBkZWNsYXJlZC5cbiAgICogQHBhcmFtIHRhcmdldFpvbmUgVGhlIFtab25lXSB3aGljaCBvcmlnaW5hbGx5IHJlY2VpdmVkIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gdGFzayBUaGUgYXJndW1lbnQgcGFzc2VkIGludG8gdGhlIGBjYW5jZWxUYXNrYCBtZXRob2QuXG4gICAqL1xuICBvbkNhbmNlbFRhc2s/OlxuICAgICAgKHBhcmVudFpvbmVEZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZTogWm9uZSwgdGFyZ2V0Wm9uZTogWm9uZSwgdGFzazogVGFzaykgPT4gYW55O1xuXG4gIC8qKlxuICAgKiBOb3RpZmllcyBvZiBjaGFuZ2VzIHRvIHRoZSB0YXNrIHF1ZXVlIGVtcHR5IHN0YXR1cy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmVudFpvbmVEZWxlZ2F0ZSBEZWxlZ2F0ZSB3aGljaCBwZXJmb3JtcyB0aGUgcGFyZW50IFtab25lU3BlY10gb3BlcmF0aW9uLlxuICAgKiBAcGFyYW0gY3VycmVudFpvbmUgVGhlIGN1cnJlbnQgW1pvbmVdIHdoZXJlIHRoZSBjdXJyZW50IGludGVyY2VwdG9yIGhhcyBiZWVuIGRlY2xhcmVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0Wm9uZSBUaGUgW1pvbmVdIHdoaWNoIG9yaWdpbmFsbHkgcmVjZWl2ZWQgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBoYXNUYXNrU3RhdGVcbiAgICovXG4gIG9uSGFzVGFzaz86XG4gICAgICAocGFyZW50Wm9uZURlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLFxuICAgICAgIGhhc1Rhc2tTdGF0ZTogSGFzVGFza1N0YXRlKSA9PiB2b2lkO1xufVxuXG5cbi8qKlxuICogIEEgZGVsZWdhdGUgd2hlbiBpbnRlcmNlcHRpbmcgem9uZSBvcGVyYXRpb25zLlxuICpcbiAqICBBIFpvbmVEZWxlZ2F0ZSBpcyBuZWVkZWQgYmVjYXVzZSBhIGNoaWxkIHpvbmUgY2FuJ3Qgc2ltcGx5IGludm9rZSBhIG1ldGhvZCBvbiBhIHBhcmVudCB6b25lLiBGb3JcbiAqICBleGFtcGxlIGEgY2hpbGQgem9uZSB3cmFwIGNhbid0IGp1c3QgY2FsbCBwYXJlbnQgem9uZSB3cmFwLiBEb2luZyBzbyB3b3VsZCBjcmVhdGUgYSBjYWxsYmFja1xuICogIHdoaWNoIGlzIGJvdW5kIHRvIHRoZSBwYXJlbnQgem9uZS4gV2hhdCB3ZSBhcmUgaW50ZXJlc3RlZCBpcyBpbnRlcmNlcHRpbmcgdGhlIGNhbGxiYWNrIGJlZm9yZSBpdFxuICogIGlzIGJvdW5kIHRvIGFueSB6b25lLiBGdXJ0aGVybW9yZSwgd2UgYWxzbyBuZWVkIHRvIHBhc3MgdGhlIHRhcmdldFpvbmUgKHpvbmUgd2hpY2ggcmVjZWl2ZWQgdGhlXG4gKiAgb3JpZ2luYWwgcmVxdWVzdCkgdG8gdGhlIGRlbGVnYXRlLlxuICpcbiAqICBUaGUgWm9uZURlbGVnYXRlIG1ldGhvZHMgbWlycm9yIHRob3NlIG9mIFpvbmUgd2l0aCBhbiBhZGRpdGlvbiBvZiBleHRyYSB0YXJnZXRab25lIGFyZ3VtZW50IGluXG4gKiAgdGhlIG1ldGhvZCBzaWduYXR1cmUuIChUaGUgb3JpZ2luYWwgWm9uZSB3aGljaCByZWNlaXZlZCB0aGUgcmVxdWVzdC4pIFNvbWUgbWV0aG9kcyBhcmUgcmVuYW1lZFxuICogIHRvIHByZXZlbnQgY29uZnVzaW9uLCBiZWNhdXNlIHRoZXkgaGF2ZSBzbGlnaHRseSBkaWZmZXJlbnQgc2VtYW50aWNzIGFuZCBhcmd1bWVudHMuXG4gKlxuICogIC0gYHdyYXBgID0+IGBpbnRlcmNlcHRgOiBUaGUgYHdyYXBgIG1ldGhvZCBkZWxlZ2F0ZXMgdG8gYGludGVyY2VwdGAuIFRoZSBgd3JhcGAgbWV0aG9kIHJldHVybnNcbiAqICAgICBhIGNhbGxiYWNrIHdoaWNoIHdpbGwgcnVuIGluIGEgZ2l2ZW4gem9uZSwgd2hlcmUgYXMgaW50ZXJjZXB0IGFsbG93cyB3cmFwcGluZyB0aGUgY2FsbGJhY2tcbiAqICAgICBzbyB0aGF0IGFkZGl0aW9uYWwgY29kZSBjYW4gYmUgcnVuIGJlZm9yZSBhbmQgYWZ0ZXIsIGJ1dCBkb2VzIG5vdCBhc3NvY2lhdGVkIHRoZSBjYWxsYmFja1xuICogICAgIHdpdGggdGhlIHpvbmUuXG4gKiAgLSBgcnVuYCA9PiBgaW52b2tlYDogVGhlIGBydW5gIG1ldGhvZCBkZWxlZ2F0ZXMgdG8gYGludm9rZWAgdG8gcGVyZm9ybSB0aGUgYWN0dWFsIGV4ZWN1dGlvbiBvZlxuICogICAgIHRoZSBjYWxsYmFjay4gVGhlIGBydW5gIG1ldGhvZCBzd2l0Y2hlcyB0byBuZXcgem9uZTsgc2F2ZXMgYW5kIHJlc3RvcmVzIHRoZSBgWm9uZS5jdXJyZW50YDtcbiAqICAgICBhbmQgb3B0aW9uYWxseSBwZXJmb3JtcyBlcnJvciBoYW5kbGluZy4gVGhlIGludm9rZSBpcyBub3QgcmVzcG9uc2libGUgZm9yIGVycm9yIGhhbmRsaW5nLFxuICogICAgIG9yIHpvbmUgbWFuYWdlbWVudC5cbiAqXG4gKiAgTm90IGV2ZXJ5IG1ldGhvZCBpcyB1c3VhbGx5IG92ZXJ3cml0dGVuIGluIHRoZSBjaGlsZCB6b25lLCBmb3IgdGhpcyByZWFzb24gdGhlIFpvbmVEZWxlZ2F0ZVxuICogIHN0b3JlcyB0aGUgY2xvc2VzdCB6b25lIHdoaWNoIG92ZXJ3cml0ZXMgdGhpcyBiZWhhdmlvciBhbG9uZyB3aXRoIHRoZSBjbG9zZXN0IFpvbmVTcGVjLlxuICpcbiAqICBOT1RFOiBXZSBoYXZlIHRyaWVkIHRvIG1ha2UgdGhpcyBBUEkgYW5hbG9nb3VzIHRvIEV2ZW50IGJ1YmJsaW5nIHdpdGggdGFyZ2V0IGFuZCBjdXJyZW50XG4gKiAgcHJvcGVydGllcy5cbiAqXG4gKiAgTm90ZTogVGhlIFpvbmVEZWxlZ2F0ZSB0cmVhdHMgWm9uZVNwZWMgYXMgY2xhc3MuIFRoaXMgYWxsb3dzIHRoZSBab25lU3BlYyB0byB1c2UgaXRzIGB0aGlzYCB0b1xuICogIHN0b3JlIGludGVybmFsIHN0YXRlLlxuICovXG5pbnRlcmZhY2UgWm9uZURlbGVnYXRlIHtcbiAgem9uZTogWm9uZTtcbiAgZm9yayh0YXJnZXRab25lOiBab25lLCB6b25lU3BlYzogWm9uZVNwZWMpOiBab25lO1xuICBpbnRlcmNlcHQodGFyZ2V0Wm9uZTogWm9uZSwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBzb3VyY2U6IHN0cmluZyk6IEZ1bmN0aW9uO1xuICBpbnZva2UodGFyZ2V0Wm9uZTogWm9uZSwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBhcHBseVRoaXM6IGFueSwgYXBwbHlBcmdzOiBhbnlbXSwgc291cmNlOiBzdHJpbmcpOlxuICAgICAgYW55O1xuICBoYW5kbGVFcnJvcih0YXJnZXRab25lOiBab25lLCBlcnJvcjogYW55KTogYm9vbGVhbjtcbiAgc2NoZWR1bGVUYXNrKHRhcmdldFpvbmU6IFpvbmUsIHRhc2s6IFRhc2spOiBUYXNrO1xuICBpbnZva2VUYXNrKHRhcmdldFpvbmU6IFpvbmUsIHRhc2s6IFRhc2ssIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueSk6IGFueTtcbiAgY2FuY2VsVGFzayh0YXJnZXRab25lOiBab25lLCB0YXNrOiBUYXNrKTogYW55O1xuICBoYXNUYXNrKHRhcmdldFpvbmU6IFpvbmUsIGlzRW1wdHk6IEhhc1Rhc2tTdGF0ZSk6IHZvaWQ7XG59XG5cbnR5cGUgSGFzVGFza1N0YXRlID0ge1xuICBtaWNyb1Rhc2s6IGJvb2xlYW47IG1hY3JvVGFzazogYm9vbGVhbjsgZXZlbnRUYXNrOiBib29sZWFuOyBjaGFuZ2U6IFRhc2tUeXBlO1xufTtcblxuLyoqXG4gKiBUYXNrIHR5cGU6IGBtaWNyb1Rhc2tgLCBgbWFjcm9UYXNrYCwgYGV2ZW50VGFza2AuXG4gKi9cbnR5cGUgVGFza1R5cGUgPSAnbWljcm9UYXNrJ3wnbWFjcm9UYXNrJ3wnZXZlbnRUYXNrJztcblxuLyoqXG4gKiBUYXNrIHR5cGU6IGBub3RTY2hlZHVsZWRgLCBgc2NoZWR1bGluZ2AsIGBzY2hlZHVsZWRgLCBgcnVubmluZ2AsIGBjYW5jZWxpbmdgLCAndW5rbm93bicuXG4gKi9cbnR5cGUgVGFza1N0YXRlID0gJ25vdFNjaGVkdWxlZCd8J3NjaGVkdWxpbmcnfCdzY2hlZHVsZWQnfCdydW5uaW5nJ3wnY2FuY2VsaW5nJ3wndW5rbm93bic7XG5cblxuLyoqXG4gKi9cbmludGVyZmFjZSBUYXNrRGF0YSB7XG4gIC8qKlxuICAgKiBBIHBlcmlvZGljIFtNYWNyb1Rhc2tdIGlzIHN1Y2ggd2hpY2ggZ2V0IGF1dG9tYXRpY2FsbHkgcmVzY2hlZHVsZWQgYWZ0ZXIgaXQgaXMgZXhlY3V0ZWQuXG4gICAqL1xuICBpc1BlcmlvZGljPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVsYXkgaW4gbWlsbGlzZWNvbmRzIHdoZW4gdGhlIFRhc2sgd2lsbCBydW4uXG4gICAqL1xuICBkZWxheT86IG51bWJlcjtcblxuICAvKipcbiAgICogaWRlbnRpZmllciByZXR1cm5lZCBieSB0aGUgbmF0aXZlIHNldFRpbWVvdXQuXG4gICAqL1xuICBoYW5kbGVJZD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHdvcmsgd2hpY2ggaXMgZXhlY3V0ZWQgd2l0aCBhIGNsZWFuIHN0YWNrLlxuICpcbiAqIFRhc2tzIGFyZSB1c2VkIGluIFpvbmVzIHRvIG1hcmsgd29yayB3aGljaCBpcyBwZXJmb3JtZWQgb24gY2xlYW4gc3RhY2sgZnJhbWUuIFRoZXJlIGFyZSB0aHJlZVxuICoga2luZHMgb2YgdGFzay4gW01pY3JvVGFza10sIFtNYWNyb1Rhc2tdLCBhbmQgW0V2ZW50VGFza10uXG4gKlxuICogQSBKUyBWTSBjYW4gYmUgbW9kZWxlZCBhcyBhIFtNaWNyb1Rhc2tdIHF1ZXVlLCBbTWFjcm9UYXNrXSBxdWV1ZSwgYW5kIFtFdmVudFRhc2tdIHNldC5cbiAqXG4gKiAtIFtNaWNyb1Rhc2tdIHF1ZXVlIHJlcHJlc2VudHMgYSBzZXQgb2YgdGFza3Mgd2hpY2ggYXJlIGV4ZWN1dGluZyByaWdodCBhZnRlciB0aGUgY3VycmVudCBzdGFja1xuICogICBmcmFtZSBiZWNvbWVzIGNsZWFuIGFuZCBiZWZvcmUgYSBWTSB5aWVsZC4gQWxsIFtNaWNyb1Rhc2tdcyBleGVjdXRlIGluIG9yZGVyIG9mIGluc2VydGlvblxuICogICBiZWZvcmUgVk0geWllbGQgYW5kIHRoZSBuZXh0IFtNYWNyb1Rhc2tdIGlzIGV4ZWN1dGVkLlxuICogLSBbTWFjcm9UYXNrXSBxdWV1ZSByZXByZXNlbnRzIGEgc2V0IG9mIHRhc2tzIHdoaWNoIGFyZSBleGVjdXRlZCBvbmUgYXQgYSB0aW1lIGFmdGVyIGVhY2ggVk1cbiAqICAgeWllbGQuIFRoZSBxdWV1ZSBpcyBvcmRlciBieSB0aW1lLCBhbmQgaW5zZXJ0aW9ucyBjYW4gaGFwcGVuIGluIGFueSBsb2NhdGlvbi5cbiAqIC0gW0V2ZW50VGFza10gaXMgYSBzZXQgb2YgdGFza3Mgd2hpY2ggY2FuIGF0IGFueSB0aW1lIGJlIGluc2VydGVkIHRvIHRoZSBlbmQgb2YgdGhlIFtNYWNyb1Rhc2tdXG4gKiAgIHF1ZXVlLiBUaGlzIGhhcHBlbnMgd2hlbiB0aGUgZXZlbnQgZmlyZXMuXG4gKlxuICovXG5pbnRlcmZhY2UgVGFzayB7XG4gIC8qKlxuICAgKiBUYXNrIHR5cGU6IGBtaWNyb1Rhc2tgLCBgbWFjcm9UYXNrYCwgYGV2ZW50VGFza2AuXG4gICAqL1xuICB0eXBlOiBUYXNrVHlwZTtcblxuICAvKipcbiAgICogVGFzayBzdGF0ZTogYG5vdFNjaGVkdWxlZGAsIGBzY2hlZHVsaW5nYCwgYHNjaGVkdWxlZGAsIGBydW5uaW5nYCwgYGNhbmNlbGluZ2AsIGB1bmtub3duYC5cbiAgICovXG4gIHN0YXRlOiBUYXNrU3RhdGU7XG5cbiAgLyoqXG4gICAqIERlYnVnIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIEFQSSB3aGljaCByZXF1ZXN0ZWQgdGhlIHNjaGVkdWxpbmcgb2YgdGhlIHRhc2suXG4gICAqL1xuICBzb3VyY2U6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIEZ1bmN0aW9uIHRvIGJlIHVzZWQgYnkgdGhlIFZNIG9uIGVudGVyaW5nIHRoZSBbVGFza10uIFRoaXMgZnVuY3Rpb24gd2lsbCBkZWxlZ2F0ZSB0b1xuICAgKiBbWm9uZS5ydW5UYXNrXSBhbmQgZGVsZWdhdGUgdG8gYGNhbGxiYWNrYC5cbiAgICovXG4gIGludm9rZTogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGJlIGV4ZWN1dGVkIGJ5IHRoZSBUYXNrIGFmdGVyIHRoZSBbWm9uZS5jdXJyZW50VGFza10gaGFzIGJlZW4gc2V0IHRvXG4gICAqIHRoZSBjdXJyZW50IHRhc2suXG4gICAqL1xuICBjYWxsYmFjazogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIFRhc2sgc3BlY2lmaWMgb3B0aW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgdGFzay4gVGhpcyBpcyBwYXNzZWQgdG8gdGhlIGBzY2hlZHVsZUZuYC5cbiAgICovXG4gIGRhdGE6IFRhc2tEYXRhO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIHRoZSBkZWZhdWx0IHdvcmsgd2hpY2ggbmVlZHMgdG8gYmUgZG9uZSB0byBzY2hlZHVsZSB0aGUgVGFzayBieSB0aGUgVk0uXG4gICAqXG4gICAqIEEgem9uZSBtYXkgY2hvc2UgdG8gaW50ZXJjZXB0IHRoaXMgZnVuY3Rpb24gYW5kIHBlcmZvcm0gaXRzIG93biBzY2hlZHVsaW5nLlxuICAgKi9cbiAgc2NoZWR1bGVGbjogKHRhc2s6IFRhc2spID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIGRlZmF1bHQgd29yayB3aGljaCBuZWVkcyB0byBiZSBkb25lIHRvIHVuLXNjaGVkdWxlIHRoZSBUYXNrIGZyb20gdGhlIFZNLiBOb3QgYWxsXG4gICAqIFRhc2tzIGFyZSBjYW5jZWxhYmxlLCBhbmQgdGhlcmVmb3JlIHRoaXMgbWV0aG9kIGlzIG9wdGlvbmFsLlxuICAgKlxuICAgKiBBIHpvbmUgbWF5IGNob3NlIHRvIGludGVyY2VwdCB0aGlzIGZ1bmN0aW9uIGFuZCBwZXJmb3JtIGl0cyBvd24gc2NoZWR1bGluZy5cbiAgICovXG4gIGNhbmNlbEZuOiAodGFzazogVGFzaykgPT4gdm9pZDtcblxuICAvKipcbiAgICogQHR5cGUge1pvbmV9IFRoZSB6b25lIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBpbnZva2UgdGhlIGBjYWxsYmFja2AuIFRoZSBab25lIGlzIGNhcHR1cmVkXG4gICAqIGF0IHRoZSB0aW1lIG9mIFRhc2sgY3JlYXRpb24uXG4gICAqL1xuICByZWFkb25seSB6b25lOiBab25lO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgdGltZXMgdGhlIHRhc2sgaGFzIGJlZW4gZXhlY3V0ZWQsIG9yIC0xIGlmIGNhbmNlbGVkLlxuICAgKi9cbiAgcnVuQ291bnQ6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2FuY2VsIHRoZSBzY2hlZHVsaW5nIHJlcXVlc3QuIFRoaXMgbWV0aG9kIGNhbiBiZSBjYWxsZWQgZnJvbSBgWm9uZVNwZWMub25TY2hlZHVsZVRhc2tgIHRvXG4gICAqIGNhbmNlbCB0aGUgY3VycmVudCBzY2hlZHVsaW5nIGludGVyY2VwdGlvbi4gT25jZSBjYW5jZWxlZCB0aGUgdGFzayBjYW4gYmUgZGlzY2FyZGVkIG9yXG4gICAqIHJlc2NoZWR1bGVkIHVzaW5nIGBab25lLnNjaGVkdWxlVGFza2Agb24gYSBkaWZmZXJlbnQgem9uZS5cbiAgICovXG4gIGNhbmNlbFNjaGVkdWxlUmVxdWVzdCgpOiB2b2lkO1xufVxuXG5pbnRlcmZhY2UgTWljcm9UYXNrIGV4dGVuZHMgVGFzayB7XG4gIHR5cGU6ICdtaWNyb1Rhc2snO1xufVxuXG5pbnRlcmZhY2UgTWFjcm9UYXNrIGV4dGVuZHMgVGFzayB7XG4gIHR5cGU6ICdtYWNyb1Rhc2snO1xufVxuXG5pbnRlcmZhY2UgRXZlbnRUYXNrIGV4dGVuZHMgVGFzayB7XG4gIHR5cGU6ICdldmVudFRhc2snO1xufVxuXG4vKiogQGludGVybmFsICovXG50eXBlIEFtYmllbnRab25lID0gWm9uZTtcbi8qKiBAaW50ZXJuYWwgKi9cbnR5cGUgQW1iaWVudFpvbmVEZWxlZ2F0ZSA9IFpvbmVEZWxlZ2F0ZTtcblxuY29uc3QgWm9uZTogWm9uZVR5cGUgPSAoZnVuY3Rpb24oZ2xvYmFsOiBhbnkpIHtcbiAgY29uc3QgRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuXG4gIGNvbnN0IHBlcmZvcm1hbmNlOiB7bWFyayhuYW1lOiBzdHJpbmcpOiB2b2lkOyBtZWFzdXJlKG5hbWU6IHN0cmluZywgbGFiZWw6IHN0cmluZyk6IHZvaWQ7fSA9XG4gICAgICBnbG9iYWxbJ3BlcmZvcm1hbmNlJ107XG4gIGZ1bmN0aW9uIG1hcmsobmFtZTogc3RyaW5nKSB7XG4gICAgcGVyZm9ybWFuY2UgJiYgcGVyZm9ybWFuY2VbJ21hcmsnXSAmJiBwZXJmb3JtYW5jZVsnbWFyayddKG5hbWUpO1xuICB9XG4gIGZ1bmN0aW9uIHBlcmZvcm1hbmNlTWVhc3VyZShuYW1lOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICBwZXJmb3JtYW5jZSAmJiBwZXJmb3JtYW5jZVsnbWVhc3VyZSddICYmIHBlcmZvcm1hbmNlWydtZWFzdXJlJ10obmFtZSwgbGFiZWwpO1xuICB9XG4gIG1hcmsoJ1pvbmUnKTtcbiAgaWYgKGdsb2JhbFsnWm9uZSddKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdab25lIGFscmVhZHkgbG9hZGVkLicpO1xuICB9XG5cbiAgY2xhc3MgWm9uZSBpbXBsZW1lbnRzIEFtYmllbnRab25lIHtcbiAgICBzdGF0aWMgX19zeW1ib2xfXzogKG5hbWU6IHN0cmluZykgPT4gc3RyaW5nID0gX19zeW1ib2xfXztcblxuICAgIHN0YXRpYyBhc3NlcnRab25lUGF0Y2hlZCgpIHtcbiAgICAgIGlmIChnbG9iYWxbJ1Byb21pc2UnXSAhPT0gcGF0Y2hlc1snWm9uZUF3YXJlUHJvbWlzZSddKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdab25lLmpzIGhhcyBkZXRlY3RlZCB0aGF0IFpvbmVBd2FyZVByb21pc2UgYCh3aW5kb3d8Z2xvYmFsKS5Qcm9taXNlYCAnICtcbiAgICAgICAgICAgICdoYXMgYmVlbiBvdmVyd3JpdHRlbi5cXG4nICtcbiAgICAgICAgICAgICdNb3N0IGxpa2VseSBjYXVzZSBpcyB0aGF0IGEgUHJvbWlzZSBwb2x5ZmlsbCBoYXMgYmVlbiBsb2FkZWQgJyArXG4gICAgICAgICAgICAnYWZ0ZXIgWm9uZS5qcyAoUG9seWZpbGxpbmcgUHJvbWlzZSBhcGkgaXMgbm90IG5lY2Vzc2FyeSB3aGVuIHpvbmUuanMgaXMgbG9hZGVkLiAnICtcbiAgICAgICAgICAgICdJZiB5b3UgbXVzdCBsb2FkIG9uZSwgZG8gc28gYmVmb3JlIGxvYWRpbmcgem9uZS5qcy4pJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCByb290KCk6IEFtYmllbnRab25lIHtcbiAgICAgIGxldCB6b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgd2hpbGUgKHpvbmUucGFyZW50KSB7XG4gICAgICAgIHpvbmUgPSB6b25lLnBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB6b25lO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY3VycmVudCgpOiBBbWJpZW50Wm9uZSB7XG4gICAgICByZXR1cm4gX2N1cnJlbnRab25lRnJhbWUuem9uZTtcbiAgICB9O1xuICAgIHN0YXRpYyBnZXQgY3VycmVudFRhc2soKTogVGFzayB7XG4gICAgICByZXR1cm4gX2N1cnJlbnRUYXNrO1xuICAgIH07XG5cbiAgICBzdGF0aWMgX19sb2FkX3BhdGNoKG5hbWU6IHN0cmluZywgZm46IF9QYXRjaEZuKTogdm9pZCB7XG4gICAgICBpZiAocGF0Y2hlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignQWxyZWFkeSBsb2FkZWQgcGF0Y2g6ICcgKyBuYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoIWdsb2JhbFsnX19ab25lX2Rpc2FibGVfJyArIG5hbWVdKSB7XG4gICAgICAgIGNvbnN0IHBlcmZOYW1lID0gJ1pvbmU6JyArIG5hbWU7XG4gICAgICAgIG1hcmsocGVyZk5hbWUpO1xuICAgICAgICBwYXRjaGVzW25hbWVdID0gZm4oZ2xvYmFsLCBab25lLCBfYXBpKTtcbiAgICAgICAgcGVyZm9ybWFuY2VNZWFzdXJlKHBlcmZOYW1lLCBwZXJmTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogQW1iaWVudFpvbmUge1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICB9O1xuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfTtcblxuXG4gICAgcHJpdmF0ZSBfcGFyZW50OiBab25lO1xuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9wcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfem9uZURlbGVnYXRlOiBab25lRGVsZWdhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQ6IFpvbmUsIHpvbmVTcGVjOiBab25lU3BlYykge1xuICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgdGhpcy5fbmFtZSA9IHpvbmVTcGVjID8gem9uZVNwZWMubmFtZSB8fCAndW5uYW1lZCcgOiAnPHJvb3Q+JztcbiAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB6b25lU3BlYyAmJiB6b25lU3BlYy5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgdGhpcy5fem9uZURlbGVnYXRlID1cbiAgICAgICAgICBuZXcgWm9uZURlbGVnYXRlKHRoaXMsIHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQuX3pvbmVEZWxlZ2F0ZSwgem9uZVNwZWMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgY29uc3Qgem9uZTogWm9uZSA9IHRoaXMuZ2V0Wm9uZVdpdGgoa2V5KSBhcyBab25lO1xuICAgICAgaWYgKHpvbmUpIHJldHVybiB6b25lLl9wcm9wZXJ0aWVzW2tleV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFpvbmVXaXRoKGtleTogc3RyaW5nKTogQW1iaWVudFpvbmUge1xuICAgICAgbGV0IGN1cnJlbnQ6IFpvbmUgPSB0aGlzO1xuICAgICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQuX3Byb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Ll9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZm9yayh6b25lU3BlYzogWm9uZVNwZWMpOiBBbWJpZW50Wm9uZSB7XG4gICAgICBpZiAoIXpvbmVTcGVjKSB0aHJvdyBuZXcgRXJyb3IoJ1pvbmVTcGVjIHJlcXVpcmVkIScpO1xuICAgICAgcmV0dXJuIHRoaXMuX3pvbmVEZWxlZ2F0ZS5mb3JrKHRoaXMsIHpvbmVTcGVjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JhcDxUIGV4dGVuZHMgRnVuY3Rpb24+KGNhbGxiYWNrOiBULCBzb3VyY2U6IHN0cmluZyk6IFQge1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gRlVOQ1RJT04pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RpbmcgZnVuY3Rpb24gZ290OiAnICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgY29uc3QgX2NhbGxiYWNrID0gdGhpcy5fem9uZURlbGVnYXRlLmludGVyY2VwdCh0aGlzLCBjYWxsYmFjaywgc291cmNlKTtcbiAgICAgIGNvbnN0IHpvbmU6IFpvbmUgPSB0aGlzO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gem9uZS5ydW5HdWFyZGVkKF9jYWxsYmFjaywgdGhpcywgPGFueT5hcmd1bWVudHMsIHNvdXJjZSk7XG4gICAgICB9IGFzIGFueSBhcyBUO1xuICAgIH1cblxuICAgIHB1YmxpYyBydW4oY2FsbGJhY2s6IEZ1bmN0aW9uLCBhcHBseVRoaXM/OiBhbnksIGFwcGx5QXJncz86IGFueVtdLCBzb3VyY2U/OiBzdHJpbmcpOiBhbnk7XG4gICAgcHVibGljIHJ1bjxUPihcbiAgICAgICAgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gVCwgYXBwbHlUaGlzOiBhbnkgPSB1bmRlZmluZWQsIGFwcGx5QXJnczogYW55W10gPSBudWxsLFxuICAgICAgICBzb3VyY2U6IHN0cmluZyA9IG51bGwpOiBUIHtcbiAgICAgIF9jdXJyZW50Wm9uZUZyYW1lID0ge3BhcmVudDogX2N1cnJlbnRab25lRnJhbWUsIHpvbmU6IHRoaXN9O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmVEZWxlZ2F0ZS5pbnZva2UodGhpcywgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgX2N1cnJlbnRab25lRnJhbWUgPSBfY3VycmVudFpvbmVGcmFtZS5wYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJ1bkd1YXJkZWQoY2FsbGJhY2s6IEZ1bmN0aW9uLCBhcHBseVRoaXM/OiBhbnksIGFwcGx5QXJncz86IGFueVtdLCBzb3VyY2U/OiBzdHJpbmcpOiBhbnk7XG4gICAgcHVibGljIHJ1bkd1YXJkZWQ8VD4oXG4gICAgICAgIGNhbGxiYWNrOiAoLi4uYXJnczogYW55W10pID0+IFQsIGFwcGx5VGhpczogYW55ID0gbnVsbCwgYXBwbHlBcmdzOiBhbnlbXSA9IG51bGwsXG4gICAgICAgIHNvdXJjZTogc3RyaW5nID0gbnVsbCkge1xuICAgICAgX2N1cnJlbnRab25lRnJhbWUgPSB7cGFyZW50OiBfY3VycmVudFpvbmVGcmFtZSwgem9uZTogdGhpc307XG4gICAgICB0cnkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl96b25lRGVsZWdhdGUuaW52b2tlKHRoaXMsIGNhbGxiYWNrLCBhcHBseVRoaXMsIGFwcGx5QXJncywgc291cmNlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAodGhpcy5fem9uZURlbGVnYXRlLmhhbmRsZUVycm9yKHRoaXMsIGVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBfY3VycmVudFpvbmVGcmFtZSA9IF9jdXJyZW50Wm9uZUZyYW1lLnBhcmVudDtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHJ1blRhc2sodGFzazogVGFzaywgYXBwbHlUaGlzPzogYW55LCBhcHBseUFyZ3M/OiBhbnkpOiBhbnkge1xuICAgICAgaWYgKHRhc2suem9uZSAhPSB0aGlzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdBIHRhc2sgY2FuIG9ubHkgYmUgcnVuIGluIHRoZSB6b25lIG9mIGNyZWF0aW9uISAoQ3JlYXRpb246ICcgK1xuICAgICAgICAgICAgKHRhc2suem9uZSB8fCBOT19aT05FKS5uYW1lICsgJzsgRXhlY3V0aW9uOiAnICsgdGhpcy5uYW1lICsgJyknKTtcbiAgICAgIH1cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzc3OCwgc29tZXRpbWVzIGV2ZW50VGFza1xuICAgICAgLy8gd2lsbCBydW4gaW4gbm90U2NoZWR1bGVkKGNhbmNlbGVkKSBzdGF0ZSwgd2Ugc2hvdWxkIG5vdCB0cnkgdG9cbiAgICAgIC8vIHJ1biBzdWNoIGtpbmQgb2YgdGFzayBidXQganVzdCByZXR1cm5cblxuICAgICAgLy8gd2UgaGF2ZSB0byBkZWZpbmUgYW4gdmFyaWFibGUgaGVyZSwgaWYgbm90XG4gICAgICAvLyB0eXBlc2NyaXB0IGNvbXBpbGVyIHdpbGwgY29tcGxhaW4gYmVsb3dcbiAgICAgIGNvbnN0IGlzTm90U2NoZWR1bGVkID0gdGFzay5zdGF0ZSA9PT0gbm90U2NoZWR1bGVkO1xuICAgICAgaWYgKGlzTm90U2NoZWR1bGVkICYmIHRhc2sudHlwZSA9PT0gZXZlbnRUYXNrKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVFbnRyeUd1YXJkID0gdGFzay5zdGF0ZSAhPSBydW5uaW5nO1xuICAgICAgcmVFbnRyeUd1YXJkICYmICh0YXNrIGFzIFpvbmVUYXNrPGFueT4pLl90cmFuc2l0aW9uVG8ocnVubmluZywgc2NoZWR1bGVkKTtcbiAgICAgIHRhc2sucnVuQ291bnQrKztcbiAgICAgIGNvbnN0IHByZXZpb3VzVGFzayA9IF9jdXJyZW50VGFzaztcbiAgICAgIF9jdXJyZW50VGFzayA9IHRhc2s7XG4gICAgICBfY3VycmVudFpvbmVGcmFtZSA9IHtwYXJlbnQ6IF9jdXJyZW50Wm9uZUZyYW1lLCB6b25lOiB0aGlzfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0YXNrLnR5cGUgPT0gbWFjcm9UYXNrICYmIHRhc2suZGF0YSAmJiAhdGFzay5kYXRhLmlzUGVyaW9kaWMpIHtcbiAgICAgICAgICB0YXNrLmNhbmNlbEZuID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl96b25lRGVsZWdhdGUuaW52b2tlVGFzayh0aGlzLCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3pvbmVEZWxlZ2F0ZS5oYW5kbGVFcnJvcih0aGlzLCBlcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgLy8gaWYgdGhlIHRhc2sncyBzdGF0ZSBpcyBub3RTY2hlZHVsZWQgb3IgdW5rbm93biwgdGhlbiBpdCBoYXMgYWxyZWFkeSBiZWVuIGNhbmNlbGxlZFxuICAgICAgICAvLyB3ZSBzaG91bGQgbm90IHJlc2V0IHRoZSBzdGF0ZSB0byBzY2hlZHVsZWRcbiAgICAgICAgaWYgKHRhc2suc3RhdGUgIT09IG5vdFNjaGVkdWxlZCAmJiB0YXNrLnN0YXRlICE9PSB1bmtub3duKSB7XG4gICAgICAgICAgaWYgKHRhc2sudHlwZSA9PSBldmVudFRhc2sgfHwgKHRhc2suZGF0YSAmJiB0YXNrLmRhdGEuaXNQZXJpb2RpYykpIHtcbiAgICAgICAgICAgIHJlRW50cnlHdWFyZCAmJiAodGFzayBhcyBab25lVGFzazxhbnk+KS5fdHJhbnNpdGlvblRvKHNjaGVkdWxlZCwgcnVubmluZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2sucnVuQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGFza0NvdW50KHRhc2sgYXMgWm9uZVRhc2s8YW55PiwgLTEpO1xuICAgICAgICAgICAgcmVFbnRyeUd1YXJkICYmXG4gICAgICAgICAgICAgICAgKHRhc2sgYXMgWm9uZVRhc2s8YW55PikuX3RyYW5zaXRpb25Ubyhub3RTY2hlZHVsZWQsIHJ1bm5pbmcsIG5vdFNjaGVkdWxlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9jdXJyZW50Wm9uZUZyYW1lID0gX2N1cnJlbnRab25lRnJhbWUucGFyZW50O1xuICAgICAgICBfY3VycmVudFRhc2sgPSBwcmV2aW91c1Rhc2s7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2NoZWR1bGVUYXNrPFQgZXh0ZW5kcyBUYXNrPih0YXNrOiBUKTogVCB7XG4gICAgICBpZiAodGFzay56b25lICYmIHRhc2suem9uZSAhPT0gdGhpcykge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgdGFzayB3YXMgcmVzY2hlZHVsZWQsIHRoZSBuZXdab25lXG4gICAgICAgIC8vIHNob3VsZCBub3QgYmUgdGhlIGNoaWxkcmVuIG9mIHRoZSBvcmlnaW5hbCB6b25lXG4gICAgICAgIGxldCBuZXdab25lOiBhbnkgPSB0aGlzO1xuICAgICAgICB3aGlsZSAobmV3Wm9uZSkge1xuICAgICAgICAgIGlmIChuZXdab25lID09PSB0YXNrLnpvbmUpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBjYW4gbm90IHJlc2NoZWR1bGUgdGFzayB0byAke3RoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubmFtZX0gd2hpY2ggaXMgZGVzY2VuZGFudHMgb2YgdGhlIG9yaWdpbmFsIHpvbmUgJHt0YXNrLnpvbmUubmFtZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3Wm9uZSA9IG5ld1pvbmUucGFyZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAodGFzayBhcyBhbnkgYXMgWm9uZVRhc2s8YW55PikuX3RyYW5zaXRpb25UbyhzY2hlZHVsaW5nLCBub3RTY2hlZHVsZWQpO1xuICAgICAgY29uc3Qgem9uZURlbGVnYXRlczogWm9uZURlbGVnYXRlW10gPSBbXTtcbiAgICAgICh0YXNrIGFzIGFueSBhcyBab25lVGFzazxhbnk+KS5fem9uZURlbGVnYXRlcyA9IHpvbmVEZWxlZ2F0ZXM7XG4gICAgICAodGFzayBhcyBhbnkgYXMgWm9uZVRhc2s8YW55PikuX3pvbmUgPSB0aGlzO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGFzayA9IHRoaXMuX3pvbmVEZWxlZ2F0ZS5zY2hlZHVsZVRhc2sodGhpcywgdGFzaykgYXMgVDtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBzaG91bGQgc2V0IHRhc2sncyBzdGF0ZSB0byB1bmtub3duIHdoZW4gc2NoZWR1bGVUYXNrIHRocm93IGVycm9yXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlIGVyciBtYXkgZnJvbSByZXNjaGVkdWxlLCBzbyB0aGUgZnJvbVN0YXRlIG1heWJlIG5vdFNjaGVkdWxlZFxuICAgICAgICAodGFzayBhcyBhbnkgYXMgWm9uZVRhc2s8YW55PikuX3RyYW5zaXRpb25Ubyh1bmtub3duLCBzY2hlZHVsaW5nLCBub3RTY2hlZHVsZWQpO1xuICAgICAgICAvLyBUT0RPOiBASmlhTGlQYXNzaW9uLCBzaG91bGQgd2UgY2hlY2sgdGhlIHJlc3VsdCBmcm9tIGhhbmRsZUVycm9yP1xuICAgICAgICB0aGlzLl96b25lRGVsZWdhdGUuaGFuZGxlRXJyb3IodGhpcywgZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgaWYgKCh0YXNrIGFzIGFueSBhcyBab25lVGFzazxhbnk+KS5fem9uZURlbGVnYXRlcyA9PT0gem9uZURlbGVnYXRlcykge1xuICAgICAgICAvLyB3ZSBoYXZlIHRvIGNoZWNrIGJlY2F1c2UgaW50ZXJuYWxseSB0aGUgZGVsZWdhdGUgY2FuIHJlc2NoZWR1bGUgdGhlIHRhc2suXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRhc2tDb3VudCh0YXNrIGFzIGFueSBhcyBab25lVGFzazxhbnk+LCAxKTtcbiAgICAgIH1cbiAgICAgIGlmICgodGFzayBhcyBhbnkgYXMgWm9uZVRhc2s8YW55Pikuc3RhdGUgPT0gc2NoZWR1bGluZykge1xuICAgICAgICAodGFzayBhcyBhbnkgYXMgWm9uZVRhc2s8YW55PikuX3RyYW5zaXRpb25UbyhzY2hlZHVsZWQsIHNjaGVkdWxpbmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuXG4gICAgc2NoZWR1bGVNaWNyb1Rhc2soXG4gICAgICAgIHNvdXJjZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIGRhdGE/OiBUYXNrRGF0YSxcbiAgICAgICAgY3VzdG9tU2NoZWR1bGU/OiAodGFzazogVGFzaykgPT4gdm9pZCk6IE1pY3JvVGFzayB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZVRhc2soXG4gICAgICAgICAgbmV3IFpvbmVUYXNrKG1pY3JvVGFzaywgc291cmNlLCBjYWxsYmFjaywgZGF0YSwgY3VzdG9tU2NoZWR1bGUsIG51bGwpKTtcbiAgICB9XG5cbiAgICBzY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgc291cmNlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgZGF0YTogVGFza0RhdGEsIGN1c3RvbVNjaGVkdWxlOiAodGFzazogVGFzaykgPT4gdm9pZCxcbiAgICAgICAgY3VzdG9tQ2FuY2VsOiAodGFzazogVGFzaykgPT4gdm9pZCk6IE1hY3JvVGFzayB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZVRhc2soXG4gICAgICAgICAgbmV3IFpvbmVUYXNrKG1hY3JvVGFzaywgc291cmNlLCBjYWxsYmFjaywgZGF0YSwgY3VzdG9tU2NoZWR1bGUsIGN1c3RvbUNhbmNlbCkpO1xuICAgIH1cblxuICAgIHNjaGVkdWxlRXZlbnRUYXNrKFxuICAgICAgICBzb3VyY2U6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBkYXRhOiBUYXNrRGF0YSwgY3VzdG9tU2NoZWR1bGU6ICh0YXNrOiBUYXNrKSA9PiB2b2lkLFxuICAgICAgICBjdXN0b21DYW5jZWw6ICh0YXNrOiBUYXNrKSA9PiB2b2lkKTogRXZlbnRUYXNrIHtcbiAgICAgIHJldHVybiB0aGlzLnNjaGVkdWxlVGFzayhcbiAgICAgICAgICBuZXcgWm9uZVRhc2soZXZlbnRUYXNrLCBzb3VyY2UsIGNhbGxiYWNrLCBkYXRhLCBjdXN0b21TY2hlZHVsZSwgY3VzdG9tQ2FuY2VsKSk7XG4gICAgfVxuXG4gICAgY2FuY2VsVGFzayh0YXNrOiBUYXNrKTogYW55IHtcbiAgICAgIGlmICh0YXNrLnpvbmUgIT0gdGhpcylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0EgdGFzayBjYW4gb25seSBiZSBjYW5jZWxsZWQgaW4gdGhlIHpvbmUgb2YgY3JlYXRpb24hIChDcmVhdGlvbjogJyArXG4gICAgICAgICAgICAodGFzay56b25lIHx8IE5PX1pPTkUpLm5hbWUgKyAnOyBFeGVjdXRpb246ICcgKyB0aGlzLm5hbWUgKyAnKScpO1xuICAgICAgKHRhc2sgYXMgWm9uZVRhc2s8YW55PikuX3RyYW5zaXRpb25UbyhjYW5jZWxpbmcsIHNjaGVkdWxlZCwgcnVubmluZyk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl96b25lRGVsZWdhdGUuY2FuY2VsVGFzayh0aGlzLCB0YXNrKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBpZiBlcnJvciBvY2N1cnMgd2hlbiBjYW5jZWxUYXNrLCB0cmFuc2l0IHRoZSBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgICh0YXNrIGFzIFpvbmVUYXNrPGFueT4pLl90cmFuc2l0aW9uVG8odW5rbm93biwgY2FuY2VsaW5nKTtcbiAgICAgICAgdGhpcy5fem9uZURlbGVnYXRlLmhhbmRsZUVycm9yKHRoaXMsIGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3VwZGF0ZVRhc2tDb3VudCh0YXNrIGFzIFpvbmVUYXNrPGFueT4sIC0xKTtcbiAgICAgICh0YXNrIGFzIFpvbmVUYXNrPGFueT4pLl90cmFuc2l0aW9uVG8obm90U2NoZWR1bGVkLCBjYW5jZWxpbmcpO1xuICAgICAgdGFzay5ydW5Db3VudCA9IDA7XG4gICAgICByZXR1cm4gdGFzaztcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVUYXNrQ291bnQodGFzazogWm9uZVRhc2s8YW55PiwgY291bnQ6IG51bWJlcikge1xuICAgICAgY29uc3Qgem9uZURlbGVnYXRlcyA9IHRhc2suX3pvbmVEZWxlZ2F0ZXM7XG4gICAgICBpZiAoY291bnQgPT0gLTEpIHtcbiAgICAgICAgdGFzay5fem9uZURlbGVnYXRlcyA9IG51bGw7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHpvbmVEZWxlZ2F0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgem9uZURlbGVnYXRlc1tpXS5fdXBkYXRlVGFza0NvdW50KHRhc2sudHlwZSwgY291bnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IERFTEVHQVRFX1pTOiBab25lU3BlYyA9IHtcbiAgICBuYW1lOiAnJyxcbiAgICBvbkhhc1Rhc2s6IChkZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBfOiBab25lLCB0YXJnZXQ6IFpvbmUsIGhhc1Rhc2tTdGF0ZTogSGFzVGFza1N0YXRlKTogdm9pZCA9PlxuICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlLmhhc1Rhc2sodGFyZ2V0LCBoYXNUYXNrU3RhdGUpLFxuICAgIG9uU2NoZWR1bGVUYXNrOiAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgXzogWm9uZSwgdGFyZ2V0OiBab25lLCB0YXNrOiBUYXNrKTogVGFzayA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUuc2NoZWR1bGVUYXNrKHRhcmdldCwgdGFzayksXG4gICAgb25JbnZva2VUYXNrOiAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgXzogWm9uZSwgdGFyZ2V0OiBab25lLCB0YXNrOiBUYXNrLCBhcHBseVRoaXM6IGFueSxcbiAgICAgICAgICAgICAgICAgICBhcHBseUFyZ3M6IGFueSk6IGFueSA9PiBkZWxlZ2F0ZS5pbnZva2VUYXNrKHRhcmdldCwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpLFxuICAgIG9uQ2FuY2VsVGFzazogKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIF86IFpvbmUsIHRhcmdldDogWm9uZSwgdGFzazogVGFzayk6IGFueSA9PlxuICAgICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlLmNhbmNlbFRhc2sodGFyZ2V0LCB0YXNrKVxuICB9O1xuXG4gIGNsYXNzIFpvbmVEZWxlZ2F0ZSBpbXBsZW1lbnRzIEFtYmllbnRab25lRGVsZWdhdGUge1xuICAgIHB1YmxpYyB6b25lOiBab25lO1xuXG4gICAgcHJpdmF0ZSBfdGFza0NvdW50czoge21pY3JvVGFzazogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYWNyb1Rhc2s6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUYXNrOiBudW1iZXJ9ID0geydtaWNyb1Rhc2snOiAwLCAnbWFjcm9UYXNrJzogMCwgJ2V2ZW50VGFzayc6IDB9O1xuXG4gICAgcHJpdmF0ZSBfcGFyZW50RGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZTtcblxuICAgIHByaXZhdGUgX2ZvcmtEbGd0OiBab25lRGVsZWdhdGU7XG4gICAgcHJpdmF0ZSBfZm9ya1pTOiBab25lU3BlYztcbiAgICBwcml2YXRlIF9mb3JrQ3VyclpvbmU6IFpvbmU7XG5cbiAgICBwcml2YXRlIF9pbnRlcmNlcHREbGd0OiBab25lRGVsZWdhdGU7XG4gICAgcHJpdmF0ZSBfaW50ZXJjZXB0WlM6IFpvbmVTcGVjO1xuICAgIHByaXZhdGUgX2ludGVyY2VwdEN1cnJab25lOiBab25lO1xuXG4gICAgcHJpdmF0ZSBfaW52b2tlRGxndDogWm9uZURlbGVnYXRlO1xuICAgIHByaXZhdGUgX2ludm9rZVpTOiBab25lU3BlYztcbiAgICBwcml2YXRlIF9pbnZva2VDdXJyWm9uZTogWm9uZTtcblxuICAgIHByaXZhdGUgX2hhbmRsZUVycm9yRGxndDogWm9uZURlbGVnYXRlO1xuICAgIHByaXZhdGUgX2hhbmRsZUVycm9yWlM6IFpvbmVTcGVjO1xuICAgIHByaXZhdGUgX2hhbmRsZUVycm9yQ3VyclpvbmU6IFpvbmU7XG5cbiAgICBwcml2YXRlIF9zY2hlZHVsZVRhc2tEbGd0OiBab25lRGVsZWdhdGU7XG4gICAgcHJpdmF0ZSBfc2NoZWR1bGVUYXNrWlM6IFpvbmVTcGVjO1xuICAgIHByaXZhdGUgX3NjaGVkdWxlVGFza0N1cnJab25lOiBab25lO1xuXG4gICAgcHJpdmF0ZSBfaW52b2tlVGFza0RsZ3Q6IFpvbmVEZWxlZ2F0ZTtcbiAgICBwcml2YXRlIF9pbnZva2VUYXNrWlM6IFpvbmVTcGVjO1xuICAgIHByaXZhdGUgX2ludm9rZVRhc2tDdXJyWm9uZTogWm9uZTtcblxuICAgIHByaXZhdGUgX2NhbmNlbFRhc2tEbGd0OiBab25lRGVsZWdhdGU7XG4gICAgcHJpdmF0ZSBfY2FuY2VsVGFza1pTOiBab25lU3BlYztcbiAgICBwcml2YXRlIF9jYW5jZWxUYXNrQ3VyclpvbmU6IFpvbmU7XG5cbiAgICBwcml2YXRlIF9oYXNUYXNrRGxndDogWm9uZURlbGVnYXRlO1xuICAgIHByaXZhdGUgX2hhc1Rhc2tEbGd0T3duZXI6IFpvbmVEZWxlZ2F0ZTtcbiAgICBwcml2YXRlIF9oYXNUYXNrWlM6IFpvbmVTcGVjO1xuICAgIHByaXZhdGUgX2hhc1Rhc2tDdXJyWm9uZTogWm9uZTtcblxuICAgIGNvbnN0cnVjdG9yKHpvbmU6IFpvbmUsIHBhcmVudERlbGVnYXRlOiBab25lRGVsZWdhdGUsIHpvbmVTcGVjOiBab25lU3BlYykge1xuICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICAgIHRoaXMuX3BhcmVudERlbGVnYXRlID0gcGFyZW50RGVsZWdhdGU7XG5cbiAgICAgIHRoaXMuX2ZvcmtaUyA9IHpvbmVTcGVjICYmICh6b25lU3BlYyAmJiB6b25lU3BlYy5vbkZvcmsgPyB6b25lU3BlYyA6IHBhcmVudERlbGVnYXRlLl9mb3JrWlMpO1xuICAgICAgdGhpcy5fZm9ya0RsZ3QgPSB6b25lU3BlYyAmJiAoem9uZVNwZWMub25Gb3JrID8gcGFyZW50RGVsZWdhdGUgOiBwYXJlbnREZWxlZ2F0ZS5fZm9ya0RsZ3QpO1xuICAgICAgdGhpcy5fZm9ya0N1cnJab25lID0gem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uRm9yayA/IHRoaXMuem9uZSA6IHBhcmVudERlbGVnYXRlLnpvbmUpO1xuXG4gICAgICB0aGlzLl9pbnRlcmNlcHRaUyA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW50ZXJjZXB0ID8gem9uZVNwZWMgOiBwYXJlbnREZWxlZ2F0ZS5faW50ZXJjZXB0WlMpO1xuICAgICAgdGhpcy5faW50ZXJjZXB0RGxndCA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW50ZXJjZXB0ID8gcGFyZW50RGVsZWdhdGUgOiBwYXJlbnREZWxlZ2F0ZS5faW50ZXJjZXB0RGxndCk7XG4gICAgICB0aGlzLl9pbnRlcmNlcHRDdXJyWm9uZSA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW50ZXJjZXB0ID8gdGhpcy56b25lIDogcGFyZW50RGVsZWdhdGUuem9uZSk7XG5cbiAgICAgIHRoaXMuX2ludm9rZVpTID0gem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlID8gem9uZVNwZWMgOiBwYXJlbnREZWxlZ2F0ZS5faW52b2tlWlMpO1xuICAgICAgdGhpcy5faW52b2tlRGxndCA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlID8gcGFyZW50RGVsZWdhdGUgOiBwYXJlbnREZWxlZ2F0ZS5faW52b2tlRGxndCk7XG4gICAgICB0aGlzLl9pbnZva2VDdXJyWm9uZSA9IHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkludm9rZSA/IHRoaXMuem9uZSA6IHBhcmVudERlbGVnYXRlLnpvbmUpO1xuXG4gICAgICB0aGlzLl9oYW5kbGVFcnJvclpTID1cbiAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25IYW5kbGVFcnJvciA/IHpvbmVTcGVjIDogcGFyZW50RGVsZWdhdGUuX2hhbmRsZUVycm9yWlMpO1xuICAgICAgdGhpcy5faGFuZGxlRXJyb3JEbGd0ID1cbiAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25IYW5kbGVFcnJvciA/IHBhcmVudERlbGVnYXRlIDogcGFyZW50RGVsZWdhdGUuX2hhbmRsZUVycm9yRGxndCk7XG4gICAgICB0aGlzLl9oYW5kbGVFcnJvckN1cnJab25lID1cbiAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25IYW5kbGVFcnJvciA/IHRoaXMuem9uZSA6IHBhcmVudERlbGVnYXRlLnpvbmUpO1xuXG4gICAgICB0aGlzLl9zY2hlZHVsZVRhc2taUyA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrID8gem9uZVNwZWMgOiBwYXJlbnREZWxlZ2F0ZS5fc2NoZWR1bGVUYXNrWlMpO1xuICAgICAgdGhpcy5fc2NoZWR1bGVUYXNrRGxndCA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrID8gcGFyZW50RGVsZWdhdGUgOiBwYXJlbnREZWxlZ2F0ZS5fc2NoZWR1bGVUYXNrRGxndCk7XG4gICAgICB0aGlzLl9zY2hlZHVsZVRhc2tDdXJyWm9uZSA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrID8gdGhpcy56b25lIDogcGFyZW50RGVsZWdhdGUuem9uZSk7XG5cbiAgICAgIHRoaXMuX2ludm9rZVRhc2taUyA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlVGFzayA/IHpvbmVTcGVjIDogcGFyZW50RGVsZWdhdGUuX2ludm9rZVRhc2taUyk7XG4gICAgICB0aGlzLl9pbnZva2VUYXNrRGxndCA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlVGFzayA/IHBhcmVudERlbGVnYXRlIDogcGFyZW50RGVsZWdhdGUuX2ludm9rZVRhc2tEbGd0KTtcbiAgICAgIHRoaXMuX2ludm9rZVRhc2tDdXJyWm9uZSA9XG4gICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlVGFzayA/IHRoaXMuem9uZSA6IHBhcmVudERlbGVnYXRlLnpvbmUpO1xuXG4gICAgICB0aGlzLl9jYW5jZWxUYXNrWlMgPVxuICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkNhbmNlbFRhc2sgPyB6b25lU3BlYyA6IHBhcmVudERlbGVnYXRlLl9jYW5jZWxUYXNrWlMpO1xuICAgICAgdGhpcy5fY2FuY2VsVGFza0RsZ3QgPVxuICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkNhbmNlbFRhc2sgPyBwYXJlbnREZWxlZ2F0ZSA6IHBhcmVudERlbGVnYXRlLl9jYW5jZWxUYXNrRGxndCk7XG4gICAgICB0aGlzLl9jYW5jZWxUYXNrQ3VyclpvbmUgPVxuICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkNhbmNlbFRhc2sgPyB0aGlzLnpvbmUgOiBwYXJlbnREZWxlZ2F0ZS56b25lKTtcblxuICAgICAgdGhpcy5faGFzVGFza1pTID0gbnVsbDtcbiAgICAgIHRoaXMuX2hhc1Rhc2tEbGd0ID0gbnVsbDtcbiAgICAgIHRoaXMuX2hhc1Rhc2tEbGd0T3duZXIgPSBudWxsO1xuICAgICAgdGhpcy5faGFzVGFza0N1cnJab25lID0gbnVsbDtcblxuICAgICAgY29uc3Qgem9uZVNwZWNIYXNUYXNrID0gem9uZVNwZWMgJiYgem9uZVNwZWMub25IYXNUYXNrO1xuICAgICAgY29uc3QgcGFyZW50SGFzVGFzayA9IHBhcmVudERlbGVnYXRlICYmIHBhcmVudERlbGVnYXRlLl9oYXNUYXNrWlM7XG4gICAgICBpZiAoem9uZVNwZWNIYXNUYXNrIHx8IHBhcmVudEhhc1Rhc2spIHtcbiAgICAgICAgLy8gSWYgd2UgbmVlZCB0byByZXBvcnQgaGFzVGFzaywgdGhhbiB0aGlzIFpTIG5lZWRzIHRvIGRvIHJlZiBjb3VudGluZyBvbiB0YXNrcy4gSW4gc3VjaFxuICAgICAgICAvLyBhIGNhc2UgYWxsIHRhc2sgcmVsYXRlZCBpbnRlcmNlcHRvcnMgbXVzdCBnbyB0aHJvdWdoIHRoaXMgWkQuIFdlIGNhbid0IHNob3J0IGNpcmN1aXQgaXQuXG4gICAgICAgIHRoaXMuX2hhc1Rhc2taUyA9IHpvbmVTcGVjSGFzVGFzayA/IHpvbmVTcGVjIDogREVMRUdBVEVfWlM7XG4gICAgICAgIHRoaXMuX2hhc1Rhc2tEbGd0ID0gcGFyZW50RGVsZWdhdGU7XG4gICAgICAgIHRoaXMuX2hhc1Rhc2tEbGd0T3duZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLl9oYXNUYXNrQ3VyclpvbmUgPSB6b25lO1xuICAgICAgICBpZiAoIXpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrKSB7XG4gICAgICAgICAgdGhpcy5fc2NoZWR1bGVUYXNrWlMgPSBERUxFR0FURV9aUztcbiAgICAgICAgICB0aGlzLl9zY2hlZHVsZVRhc2tEbGd0ID0gcGFyZW50RGVsZWdhdGU7XG4gICAgICAgICAgdGhpcy5fc2NoZWR1bGVUYXNrQ3VyclpvbmUgPSB0aGlzLnpvbmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF6b25lU3BlYy5vbkludm9rZVRhc2spIHtcbiAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrWlMgPSBERUxFR0FURV9aUztcbiAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrRGxndCA9IHBhcmVudERlbGVnYXRlO1xuICAgICAgICAgIHRoaXMuX2ludm9rZVRhc2tDdXJyWm9uZSA9IHRoaXMuem9uZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXpvbmVTcGVjLm9uQ2FuY2VsVGFzaykge1xuICAgICAgICAgIHRoaXMuX2NhbmNlbFRhc2taUyA9IERFTEVHQVRFX1pTO1xuICAgICAgICAgIHRoaXMuX2NhbmNlbFRhc2tEbGd0ID0gcGFyZW50RGVsZWdhdGU7XG4gICAgICAgICAgdGhpcy5fY2FuY2VsVGFza0N1cnJab25lID0gdGhpcy56b25lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yayh0YXJnZXRab25lOiBab25lLCB6b25lU3BlYzogWm9uZVNwZWMpOiBBbWJpZW50Wm9uZSB7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ya1pTID8gdGhpcy5fZm9ya1pTLm9uRm9yayh0aGlzLl9mb3JrRGxndCwgdGhpcy56b25lLCB0YXJnZXRab25lLCB6b25lU3BlYykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBab25lKHRhcmdldFpvbmUsIHpvbmVTcGVjKTtcbiAgICB9XG5cbiAgICBpbnRlcmNlcHQodGFyZ2V0Wm9uZTogWm9uZSwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBzb3VyY2U6IHN0cmluZyk6IEZ1bmN0aW9uIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbnRlcmNlcHRaUyA/XG4gICAgICAgICAgdGhpcy5faW50ZXJjZXB0WlMub25JbnRlcmNlcHQoXG4gICAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdERsZ3QsIHRoaXMuX2ludGVyY2VwdEN1cnJab25lLCB0YXJnZXRab25lLCBjYWxsYmFjaywgc291cmNlKSA6XG4gICAgICAgICAgY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgaW52b2tlKHRhcmdldFpvbmU6IFpvbmUsIGNhbGxiYWNrOiBGdW5jdGlvbiwgYXBwbHlUaGlzOiBhbnksIGFwcGx5QXJnczogYW55W10sIHNvdXJjZTogc3RyaW5nKTpcbiAgICAgICAgYW55IHtcbiAgICAgIHJldHVybiB0aGlzLl9pbnZva2VaUyA/XG4gICAgICAgICAgdGhpcy5faW52b2tlWlMub25JbnZva2UoXG4gICAgICAgICAgICAgIHRoaXMuX2ludm9rZURsZ3QsIHRoaXMuX2ludm9rZUN1cnJab25lLCB0YXJnZXRab25lLCBjYWxsYmFjaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MsXG4gICAgICAgICAgICAgIHNvdXJjZSkgOlxuICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KGFwcGx5VGhpcywgYXBwbHlBcmdzKTtcbiAgICB9XG5cbiAgICBoYW5kbGVFcnJvcih0YXJnZXRab25lOiBab25lLCBlcnJvcjogYW55KTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5faGFuZGxlRXJyb3JaUyA/XG4gICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3JaUy5vbkhhbmRsZUVycm9yKFxuICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvckRsZ3QsIHRoaXMuX2hhbmRsZUVycm9yQ3VyclpvbmUsIHRhcmdldFpvbmUsIGVycm9yKSA6XG4gICAgICAgICAgdHJ1ZTtcbiAgICB9XG5cbiAgICBzY2hlZHVsZVRhc2sodGFyZ2V0Wm9uZTogWm9uZSwgdGFzazogVGFzayk6IFRhc2sge1xuICAgICAgbGV0IHJldHVyblRhc2s6IFpvbmVUYXNrPGFueT4gPSB0YXNrIGFzIFpvbmVUYXNrPGFueT47XG4gICAgICBpZiAodGhpcy5fc2NoZWR1bGVUYXNrWlMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1Rhc2taUykge1xuICAgICAgICAgIHJldHVyblRhc2suX3pvbmVEZWxlZ2F0ZXMucHVzaCh0aGlzLl9oYXNUYXNrRGxndE93bmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5UYXNrID0gdGhpcy5fc2NoZWR1bGVUYXNrWlMub25TY2hlZHVsZVRhc2soXG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZVRhc2tEbGd0LCB0aGlzLl9zY2hlZHVsZVRhc2tDdXJyWm9uZSwgdGFyZ2V0Wm9uZSwgdGFzaykgYXMgWm9uZVRhc2s8YW55PjtcbiAgICAgICAgaWYgKCFyZXR1cm5UYXNrKSByZXR1cm5UYXNrID0gdGFzayBhcyBab25lVGFzazxhbnk+O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRhc2suc2NoZWR1bGVGbikge1xuICAgICAgICAgIHRhc2suc2NoZWR1bGVGbih0YXNrKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrLnR5cGUgPT0gbWljcm9UYXNrKSB7XG4gICAgICAgICAgc2NoZWR1bGVNaWNyb1Rhc2soPE1pY3JvVGFzaz50YXNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rhc2sgaXMgbWlzc2luZyBzY2hlZHVsZUZuLicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0dXJuVGFzaztcbiAgICB9XG5cbiAgICBpbnZva2VUYXNrKHRhcmdldFpvbmU6IFpvbmUsIHRhc2s6IFRhc2ssIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueSk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy5faW52b2tlVGFza1pTID9cbiAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrWlMub25JbnZva2VUYXNrKFxuICAgICAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrRGxndCwgdGhpcy5faW52b2tlVGFza0N1cnJab25lLCB0YXJnZXRab25lLCB0YXNrLCBhcHBseVRoaXMsXG4gICAgICAgICAgICAgIGFwcGx5QXJncykgOlxuICAgICAgICAgIHRhc2suY2FsbGJhY2suYXBwbHkoYXBwbHlUaGlzLCBhcHBseUFyZ3MpO1xuICAgIH1cblxuICAgIGNhbmNlbFRhc2sodGFyZ2V0Wm9uZTogWm9uZSwgdGFzazogVGFzayk6IGFueSB7XG4gICAgICBsZXQgdmFsdWU6IGFueTtcbiAgICAgIGlmICh0aGlzLl9jYW5jZWxUYXNrWlMpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLl9jYW5jZWxUYXNrWlMub25DYW5jZWxUYXNrKFxuICAgICAgICAgICAgdGhpcy5fY2FuY2VsVGFza0RsZ3QsIHRoaXMuX2NhbmNlbFRhc2tDdXJyWm9uZSwgdGFyZ2V0Wm9uZSwgdGFzayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRhc2suY2FuY2VsRm4pIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignVGFzayBpcyBub3QgY2FuY2VsYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdGFzay5jYW5jZWxGbih0YXNrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBoYXNUYXNrKHRhcmdldFpvbmU6IFpvbmUsIGlzRW1wdHk6IEhhc1Rhc2tTdGF0ZSkge1xuICAgICAgLy8gaGFzVGFzayBzaG91bGQgbm90IHRocm93IGVycm9yIHNvIG90aGVyIFpvbmVEZWxlZ2F0ZVxuICAgICAgLy8gY2FuIHN0aWxsIHRyaWdnZXIgaGFzVGFzayBjYWxsYmFja1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc1Rhc2taUyAmJlxuICAgICAgICAgICAgdGhpcy5faGFzVGFza1pTLm9uSGFzVGFzayhcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUYXNrRGxndCwgdGhpcy5faGFzVGFza0N1cnJab25lLCB0YXJnZXRab25lLCBpc0VtcHR5KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLmhhbmRsZUVycm9yKHRhcmdldFpvbmUsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZVRhc2tDb3VudCh0eXBlOiBUYXNrVHlwZSwgY291bnQ6IG51bWJlcikge1xuICAgICAgY29uc3QgY291bnRzID0gdGhpcy5fdGFza0NvdW50cztcbiAgICAgIGNvbnN0IHByZXYgPSBjb3VudHNbdHlwZV07XG4gICAgICBjb25zdCBuZXh0ID0gY291bnRzW3R5cGVdID0gcHJldiArIGNvdW50O1xuICAgICAgaWYgKG5leHQgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9yZSB0YXNrcyBleGVjdXRlZCB0aGVuIHdlcmUgc2NoZWR1bGVkLicpO1xuICAgICAgfVxuICAgICAgaWYgKHByZXYgPT0gMCB8fCBuZXh0ID09IDApIHtcbiAgICAgICAgY29uc3QgaXNFbXB0eTogSGFzVGFza1N0YXRlID0ge1xuICAgICAgICAgIG1pY3JvVGFzazogY291bnRzWydtaWNyb1Rhc2snXSA+IDAsXG4gICAgICAgICAgbWFjcm9UYXNrOiBjb3VudHNbJ21hY3JvVGFzayddID4gMCxcbiAgICAgICAgICBldmVudFRhc2s6IGNvdW50c1snZXZlbnRUYXNrJ10gPiAwLFxuICAgICAgICAgIGNoYW5nZTogdHlwZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhhc1Rhc2sodGhpcy56b25lLCBpc0VtcHR5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbGFzcyBab25lVGFzazxUIGV4dGVuZHMgVGFza1R5cGU+IGltcGxlbWVudHMgVGFzayB7XG4gICAgcHVibGljIHR5cGU6IFQ7XG4gICAgcHVibGljIHNvdXJjZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpbnZva2U6IEZ1bmN0aW9uO1xuICAgIHB1YmxpYyBjYWxsYmFjazogRnVuY3Rpb247XG4gICAgcHVibGljIGRhdGE6IFRhc2tEYXRhO1xuICAgIHB1YmxpYyBzY2hlZHVsZUZuOiAodGFzazogVGFzaykgPT4gdm9pZDtcbiAgICBwdWJsaWMgY2FuY2VsRm46ICh0YXNrOiBUYXNrKSA9PiB2b2lkO1xuICAgIF96b25lOiBab25lID0gbnVsbDtcbiAgICBwdWJsaWMgcnVuQ291bnQ6IG51bWJlciA9IDA7XG4gICAgX3pvbmVEZWxlZ2F0ZXM6IFpvbmVEZWxlZ2F0ZVtdID0gbnVsbDtcbiAgICBfc3RhdGU6IFRhc2tTdGF0ZSA9ICdub3RTY2hlZHVsZWQnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHR5cGU6IFQsIHNvdXJjZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM6IFRhc2tEYXRhLFxuICAgICAgICBzY2hlZHVsZUZuOiAodGFzazogVGFzaykgPT4gdm9pZCwgY2FuY2VsRm46ICh0YXNrOiBUYXNrKSA9PiB2b2lkKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aGlzLmRhdGEgPSBvcHRpb25zO1xuICAgICAgdGhpcy5zY2hlZHVsZUZuID0gc2NoZWR1bGVGbjtcbiAgICAgIHRoaXMuY2FuY2VsRm4gPSBjYW5jZWxGbjtcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgaWYgKHR5cGUgPT09IGV2ZW50VGFzayAmJiBvcHRpb25zICYmIChvcHRpb25zIGFzIGFueSkuaXNVc2luZ0dsb2JhbENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaW52b2tlID0gWm9uZVRhc2suaW52b2tlVGFzaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW52b2tlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIFpvbmVUYXNrLmludm9rZVRhc2suYXBwbHkoZ2xvYmFsLCBbc2VsZiwgdGhpcywgPGFueT5hcmd1bWVudHNdKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaW52b2tlVGFzayh0YXNrOiBhbnksIHRhcmdldDogYW55LCBhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgaWYgKCF0YXNrKSB7XG4gICAgICAgIHRhc2sgPSB0aGlzO1xuICAgICAgfVxuICAgICAgX251bWJlck9mTmVzdGVkVGFza0ZyYW1lcysrO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGFzay5ydW5Db3VudCsrO1xuICAgICAgICByZXR1cm4gdGFzay56b25lLnJ1blRhc2sodGFzaywgdGFyZ2V0LCBhcmdzKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfbnVtYmVyT2ZOZXN0ZWRUYXNrRnJhbWVzID09IDEpIHtcbiAgICAgICAgICBkcmFpbk1pY3JvVGFza1F1ZXVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgX251bWJlck9mTmVzdGVkVGFza0ZyYW1lcy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldCB6b25lKCk6IFpvbmUge1xuICAgICAgcmV0dXJuIHRoaXMuX3pvbmU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCk6IFRhc2tTdGF0ZSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbmNlbFNjaGVkdWxlUmVxdWVzdCgpIHtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25Ubyhub3RTY2hlZHVsZWQsIHNjaGVkdWxpbmcpO1xuICAgIH1cblxuICAgIF90cmFuc2l0aW9uVG8odG9TdGF0ZTogVGFza1N0YXRlLCBmcm9tU3RhdGUxOiBUYXNrU3RhdGUsIGZyb21TdGF0ZTI/OiBUYXNrU3RhdGUpIHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gZnJvbVN0YXRlMSB8fCB0aGlzLl9zdGF0ZSA9PT0gZnJvbVN0YXRlMikge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgIGlmICh0b1N0YXRlID09IG5vdFNjaGVkdWxlZCkge1xuICAgICAgICAgIHRoaXMuX3pvbmVEZWxlZ2F0ZXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgJHt0aGlzLnR5cGV9ICcke3RoaXMuc291cmNlfSc6IGNhbiBub3QgdHJhbnNpdGlvbiB0byAnJHt0b1N0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfScsIGV4cGVjdGluZyBzdGF0ZSAnJHtmcm9tU3RhdGUxfScke2Zyb21TdGF0ZTIgP1xuICAgICAgICAgICAgICAgICcgb3IgXFwnJyArIGZyb21TdGF0ZTIgKyAnXFwnJyA6XG4gICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICB9LCB3YXMgJyR7dGhpcy5fc3RhdGV9Jy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgICBpZiAodGhpcy5kYXRhICYmIHR5cGVvZiB0aGlzLmRhdGEuaGFuZGxlSWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuaGFuZGxlSWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCB0b0pTT04gbWV0aG9kIHRvIHByZXZlbnQgY3ljbGljIGVycm9yIHdoZW5cbiAgICAvLyBjYWxsIEpTT04uc3RyaW5naWZ5KHpvbmVUYXNrKVxuICAgIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICB6b25lOiB0aGlzLnpvbmUubmFtZSxcbiAgICAgICAgaW52b2tlOiB0aGlzLmludm9rZSxcbiAgICAgICAgc2NoZWR1bGVGbjogdGhpcy5zY2hlZHVsZUZuLFxuICAgICAgICBjYW5jZWxGbjogdGhpcy5jYW5jZWxGbixcbiAgICAgICAgcnVuQ291bnQ6IHRoaXMucnVuQ291bnQsXG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmNhbGxiYWNrXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vICBNSUNST1RBU0sgUVVFVUVcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBjb25zdCBzeW1ib2xTZXRUaW1lb3V0ID0gX19zeW1ib2xfXygnc2V0VGltZW91dCcpO1xuICBjb25zdCBzeW1ib2xQcm9taXNlID0gX19zeW1ib2xfXygnUHJvbWlzZScpO1xuICBjb25zdCBzeW1ib2xUaGVuID0gX19zeW1ib2xfXygndGhlbicpO1xuICBsZXQgX21pY3JvVGFza1F1ZXVlOiBUYXNrW10gPSBbXTtcbiAgbGV0IF9pc0RyYWluaW5nTWljcm90YXNrUXVldWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGV0IG5hdGl2ZU1pY3JvVGFza1F1ZXVlUHJvbWlzZTogYW55O1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlTWljcm9UYXNrKHRhc2s/OiBNaWNyb1Rhc2spIHtcbiAgICAvLyBpZiB3ZSBhcmUgbm90IHJ1bm5pbmcgaW4gYW55IHRhc2ssIGFuZCB0aGVyZSBoYXMgbm90IGJlZW4gYW55dGhpbmcgc2NoZWR1bGVkXG4gICAgLy8gd2UgbXVzdCBib290c3RyYXAgdGhlIGluaXRpYWwgdGFzayBjcmVhdGlvbiBieSBtYW51YWxseSBzY2hlZHVsaW5nIHRoZSBkcmFpblxuICAgIGlmIChfbnVtYmVyT2ZOZXN0ZWRUYXNrRnJhbWVzID09PSAwICYmIF9taWNyb1Rhc2tRdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIFdlIGFyZSBub3QgcnVubmluZyBpbiBUYXNrLCBzbyB3ZSBuZWVkIHRvIGtpY2tzdGFydCB0aGUgbWljcm90YXNrIHF1ZXVlLlxuICAgICAgaWYgKCFuYXRpdmVNaWNyb1Rhc2tRdWV1ZVByb21pc2UpIHtcbiAgICAgICAgaWYgKGdsb2JhbFtzeW1ib2xQcm9taXNlXSkge1xuICAgICAgICAgIG5hdGl2ZU1pY3JvVGFza1F1ZXVlUHJvbWlzZSA9IGdsb2JhbFtzeW1ib2xQcm9taXNlXS5yZXNvbHZlKDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobmF0aXZlTWljcm9UYXNrUXVldWVQcm9taXNlKSB7XG4gICAgICAgIG5hdGl2ZU1pY3JvVGFza1F1ZXVlUHJvbWlzZVtzeW1ib2xUaGVuXShkcmFpbk1pY3JvVGFza1F1ZXVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdsb2JhbFtzeW1ib2xTZXRUaW1lb3V0XShkcmFpbk1pY3JvVGFza1F1ZXVlLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFzayAmJiBfbWljcm9UYXNrUXVldWUucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYWluTWljcm9UYXNrUXVldWUoKSB7XG4gICAgaWYgKCFfaXNEcmFpbmluZ01pY3JvdGFza1F1ZXVlKSB7XG4gICAgICBfaXNEcmFpbmluZ01pY3JvdGFza1F1ZXVlID0gdHJ1ZTtcbiAgICAgIHdoaWxlIChfbWljcm9UYXNrUXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHF1ZXVlID0gX21pY3JvVGFza1F1ZXVlO1xuICAgICAgICBfbWljcm9UYXNrUXVldWUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHRhc2sgPSBxdWV1ZVtpXTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGFzay56b25lLnJ1blRhc2sodGFzaywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIF9hcGkub25VbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBzaG93RXJyb3I6IGJvb2xlYW4gPSAhKFpvbmUgYXMgYW55KVtfX3N5bWJvbF9fKCdpZ25vcmVDb25zb2xlRXJyb3JVbmNhdWdodEVycm9yJyldO1xuICAgICAgX2FwaS5taWNyb3Rhc2tEcmFpbkRvbmUoKTtcbiAgICAgIF9pc0RyYWluaW5nTWljcm90YXNrUXVldWUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLyAgQk9PVFNUUkFQXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4gIGNvbnN0IE5PX1pPTkUgPSB7bmFtZTogJ05PIFpPTkUnfTtcbiAgY29uc3Qgbm90U2NoZWR1bGVkOiAnbm90U2NoZWR1bGVkJyA9ICdub3RTY2hlZHVsZWQnLCBzY2hlZHVsaW5nOiAnc2NoZWR1bGluZycgPSAnc2NoZWR1bGluZycsXG4gICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiAnc2NoZWR1bGVkJyA9ICdzY2hlZHVsZWQnLCBydW5uaW5nOiAncnVubmluZycgPSAncnVubmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgY2FuY2VsaW5nOiAnY2FuY2VsaW5nJyA9ICdjYW5jZWxpbmcnLCB1bmtub3duOiAndW5rbm93bicgPSAndW5rbm93bic7XG4gIGNvbnN0IG1pY3JvVGFzazogJ21pY3JvVGFzaycgPSAnbWljcm9UYXNrJywgbWFjcm9UYXNrOiAnbWFjcm9UYXNrJyA9ICdtYWNyb1Rhc2snLFxuICAgICAgICAgICAgICAgICAgIGV2ZW50VGFzazogJ2V2ZW50VGFzaycgPSAnZXZlbnRUYXNrJztcblxuICBjb25zdCBwYXRjaGVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBjb25zdCBfYXBpOiBfWm9uZVByaXZhdGUgPSB7XG4gICAgc3ltYm9sOiBfX3N5bWJvbF9fLFxuICAgIGN1cnJlbnRab25lRnJhbWU6ICgpID0+IF9jdXJyZW50Wm9uZUZyYW1lLFxuICAgIG9uVW5oYW5kbGVkRXJyb3I6IG5vb3AsXG4gICAgbWljcm90YXNrRHJhaW5Eb25lOiBub29wLFxuICAgIHNjaGVkdWxlTWljcm9UYXNrOiBzY2hlZHVsZU1pY3JvVGFzayxcbiAgICBzaG93VW5jYXVnaHRFcnJvcjogKCkgPT4gIShab25lIGFzIGFueSlbX19zeW1ib2xfXygnaWdub3JlQ29uc29sZUVycm9yVW5jYXVnaHRFcnJvcicpXSxcbiAgICBwYXRjaEV2ZW50VGFyZ2V0OiAoKSA9PiBbXSxcbiAgICBwYXRjaE9uUHJvcGVydGllczogbm9vcCxcbiAgICBwYXRjaE1ldGhvZDogKCkgPT4gbm9vcCxcbiAgfTtcbiAgbGV0IF9jdXJyZW50Wm9uZUZyYW1lOiBfWm9uZUZyYW1lID0ge3BhcmVudDogbnVsbCwgem9uZTogbmV3IFpvbmUobnVsbCwgbnVsbCl9O1xuICBsZXQgX2N1cnJlbnRUYXNrOiBUYXNrID0gbnVsbDtcbiAgbGV0IF9udW1iZXJPZk5lc3RlZFRhc2tGcmFtZXMgPSAwO1xuXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4gIGZ1bmN0aW9uIF9fc3ltYm9sX18obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICdfX3pvbmVfc3ltYm9sX18nICsgbmFtZTtcbiAgfVxuXG5cbiAgcGVyZm9ybWFuY2VNZWFzdXJlKCdab25lJywgJ1pvbmUnKTtcbiAgcmV0dXJuIGdsb2JhbFsnWm9uZSddID0gWm9uZTtcbn0pKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyB8fCB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiB8fCBnbG9iYWwpO1xuIl19