/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global) {
    var Scheduler = (function () {
        function Scheduler() {
            // Next scheduler id.
            this.nextId = 0;
            // Scheduler queue with the tuple of end time and callback function - sorted by end time.
            this._schedulerQueue = [];
            // Current simulated time in millis.
            this._currentTime = 0;
        }
        Scheduler.prototype.scheduleFunction = function (cb, delay, args, isPeriodic, isRequestAnimationFrame, id) {
            if (args === void 0) { args = []; }
            if (isPeriodic === void 0) { isPeriodic = false; }
            if (isRequestAnimationFrame === void 0) { isRequestAnimationFrame = false; }
            if (id === void 0) { id = -1; }
            var currentId = id < 0 ? this.nextId++ : id;
            var endTime = this._currentTime + delay;
            // Insert so that scheduler queue remains sorted by end time.
            var newEntry = {
                endTime: endTime,
                id: currentId,
                func: cb,
                args: args,
                delay: delay,
                isPeriodic: isPeriodic,
                isRequestAnimationFrame: isRequestAnimationFrame
            };
            var i = 0;
            for (; i < this._schedulerQueue.length; i++) {
                var currentEntry = this._schedulerQueue[i];
                if (newEntry.endTime < currentEntry.endTime) {
                    break;
                }
            }
            this._schedulerQueue.splice(i, 0, newEntry);
            return currentId;
        };
        Scheduler.prototype.removeScheduledFunctionWithId = function (id) {
            for (var i = 0; i < this._schedulerQueue.length; i++) {
                if (this._schedulerQueue[i].id == id) {
                    this._schedulerQueue.splice(i, 1);
                    break;
                }
            }
        };
        Scheduler.prototype.tick = function (millis, doTick) {
            if (millis === void 0) { millis = 0; }
            var finalTime = this._currentTime + millis;
            var lastCurrentTime = 0;
            if (this._schedulerQueue.length === 0 && doTick) {
                doTick(millis);
                return;
            }
            while (this._schedulerQueue.length > 0) {
                var current = this._schedulerQueue[0];
                if (finalTime < current.endTime) {
                    // Done processing the queue since it's sorted by endTime.
                    break;
                }
                else {
                    // Time to run scheduled function. Remove it from the head of queue.
                    var current_1 = this._schedulerQueue.shift();
                    lastCurrentTime = this._currentTime;
                    this._currentTime = current_1.endTime;
                    if (doTick) {
                        doTick(this._currentTime - lastCurrentTime);
                    }
                    var retval = current_1.func.apply(global, current_1.args);
                    if (!retval) {
                        // Uncaught exception in the current scheduled function. Stop processing the queue.
                        break;
                    }
                }
            }
            this._currentTime = finalTime;
        };
        Scheduler.prototype.flush = function (limit, flushPeriodic, doTick) {
            if (limit === void 0) { limit = 20; }
            if (flushPeriodic === void 0) { flushPeriodic = false; }
            if (flushPeriodic) {
                return this.flushPeriodic(doTick);
            }
            else {
                return this.flushNonPeriodic(limit, doTick);
            }
        };
        Scheduler.prototype.flushPeriodic = function (doTick) {
            if (this._schedulerQueue.length === 0) {
                return 0;
            }
            // Find the last task currently queued in the scheduler queue and tick
            // till that time.
            var startTime = this._currentTime;
            var lastTask = this._schedulerQueue[this._schedulerQueue.length - 1];
            this.tick(lastTask.endTime - startTime, doTick);
            return this._currentTime - startTime;
        };
        Scheduler.prototype.flushNonPeriodic = function (limit, doTick) {
            var startTime = this._currentTime;
            var lastCurrentTime = 0;
            var count = 0;
            while (this._schedulerQueue.length > 0) {
                count++;
                if (count > limit) {
                    throw new Error('flush failed after reaching the limit of ' + limit +
                        ' tasks. Does your code use a polling timeout?');
                }
                // flush only non-periodic timers.
                // If the only remaining tasks are periodic(or requestAnimationFrame), finish flushing.
                if (this._schedulerQueue.filter(function (task) { return !task.isPeriodic && !task.isRequestAnimationFrame; })
                    .length === 0) {
                    break;
                }
                var current = this._schedulerQueue.shift();
                lastCurrentTime = this._currentTime;
                this._currentTime = current.endTime;
                if (doTick) {
                    // Update any secondary schedulers like Jasmine mock Date.
                    doTick(this._currentTime - lastCurrentTime);
                }
                var retval = current.func.apply(global, current.args);
                if (!retval) {
                    // Uncaught exception in the current scheduled function. Stop processing the queue.
                    break;
                }
            }
            return this._currentTime - startTime;
        };
        return Scheduler;
    }());
    var FakeAsyncTestZoneSpec = (function () {
        function FakeAsyncTestZoneSpec(namePrefix, trackPendingRequestAnimationFrame) {
            if (trackPendingRequestAnimationFrame === void 0) { trackPendingRequestAnimationFrame = false; }
            this.trackPendingRequestAnimationFrame = trackPendingRequestAnimationFrame;
            this._scheduler = new Scheduler();
            this._microtasks = [];
            this._lastError = null;
            this._uncaughtPromiseErrors = Promise[Zone.__symbol__('uncaughtPromiseErrors')];
            this.pendingPeriodicTimers = [];
            this.pendingTimers = [];
            this.properties = { 'FakeAsyncTestZoneSpec': this };
            this.name = 'fakeAsyncTestZone for ' + namePrefix;
        }
        FakeAsyncTestZoneSpec.assertInZone = function () {
            if (Zone.current.get('FakeAsyncTestZoneSpec') == null) {
                throw new Error('The code should be running in the fakeAsync zone to call this function');
            }
        };
        FakeAsyncTestZoneSpec.prototype._fnAndFlush = function (fn, completers) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                fn.apply(global, args);
                if (_this._lastError === null) {
                    if (completers.onSuccess != null) {
                        completers.onSuccess.apply(global);
                    }
                    // Flush microtasks only on success.
                    _this.flushMicrotasks();
                }
                else {
                    if (completers.onError != null) {
                        completers.onError.apply(global);
                    }
                }
                // Return true if there were no errors, false otherwise.
                return _this._lastError === null;
            };
        };
        FakeAsyncTestZoneSpec._removeTimer = function (timers, id) {
            var index = timers.indexOf(id);
            if (index > -1) {
                timers.splice(index, 1);
            }
        };
        FakeAsyncTestZoneSpec.prototype._dequeueTimer = function (id) {
            var _this = this;
            return function () {
                FakeAsyncTestZoneSpec._removeTimer(_this.pendingTimers, id);
            };
        };
        FakeAsyncTestZoneSpec.prototype._requeuePeriodicTimer = function (fn, interval, args, id) {
            var _this = this;
            return function () {
                // Requeue the timer callback if it's not been canceled.
                if (_this.pendingPeriodicTimers.indexOf(id) !== -1) {
                    _this._scheduler.scheduleFunction(fn, interval, args, true, false, id);
                }
            };
        };
        FakeAsyncTestZoneSpec.prototype._dequeuePeriodicTimer = function (id) {
            var _this = this;
            return function () {
                FakeAsyncTestZoneSpec._removeTimer(_this.pendingPeriodicTimers, id);
            };
        };
        FakeAsyncTestZoneSpec.prototype._setTimeout = function (fn, delay, args, isTimer) {
            if (isTimer === void 0) { isTimer = true; }
            var removeTimerFn = this._dequeueTimer(this._scheduler.nextId);
            // Queue the callback and dequeue the timer on success and error.
            var cb = this._fnAndFlush(fn, { onSuccess: removeTimerFn, onError: removeTimerFn });
            var id = this._scheduler.scheduleFunction(cb, delay, args, false, !isTimer);
            if (isTimer) {
                this.pendingTimers.push(id);
            }
            return id;
        };
        FakeAsyncTestZoneSpec.prototype._clearTimeout = function (id) {
            FakeAsyncTestZoneSpec._removeTimer(this.pendingTimers, id);
            this._scheduler.removeScheduledFunctionWithId(id);
        };
        FakeAsyncTestZoneSpec.prototype._setInterval = function (fn, interval) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var id = this._scheduler.nextId;
            var completers = { onSuccess: null, onError: this._dequeuePeriodicTimer(id) };
            var cb = this._fnAndFlush(fn, completers);
            // Use the callback created above to requeue on success.
            completers.onSuccess = this._requeuePeriodicTimer(cb, interval, args, id);
            // Queue the callback and dequeue the periodic timer only on error.
            this._scheduler.scheduleFunction(cb, interval, args, true);
            this.pendingPeriodicTimers.push(id);
            return id;
        };
        FakeAsyncTestZoneSpec.prototype._clearInterval = function (id) {
            FakeAsyncTestZoneSpec._removeTimer(this.pendingPeriodicTimers, id);
            this._scheduler.removeScheduledFunctionWithId(id);
        };
        FakeAsyncTestZoneSpec.prototype._resetLastErrorAndThrow = function () {
            var error = this._lastError || this._uncaughtPromiseErrors[0];
            this._uncaughtPromiseErrors.length = 0;
            this._lastError = null;
            throw error;
        };
        FakeAsyncTestZoneSpec.prototype.tick = function (millis, doTick) {
            if (millis === void 0) { millis = 0; }
            FakeAsyncTestZoneSpec.assertInZone();
            this.flushMicrotasks();
            this._scheduler.tick(millis, doTick);
            if (this._lastError !== null) {
                this._resetLastErrorAndThrow();
            }
        };
        FakeAsyncTestZoneSpec.prototype.flushMicrotasks = function () {
            var _this = this;
            FakeAsyncTestZoneSpec.assertInZone();
            var flushErrors = function () {
                if (_this._lastError !== null || _this._uncaughtPromiseErrors.length) {
                    // If there is an error stop processing the microtask queue and rethrow the error.
                    _this._resetLastErrorAndThrow();
                }
            };
            while (this._microtasks.length > 0) {
                var microtask = this._microtasks.shift();
                microtask.func.apply(microtask.target, microtask.args);
            }
            flushErrors();
        };
        FakeAsyncTestZoneSpec.prototype.flush = function (limit, flushPeriodic, doTick) {
            FakeAsyncTestZoneSpec.assertInZone();
            this.flushMicrotasks();
            var elapsed = this._scheduler.flush(limit, flushPeriodic, doTick);
            if (this._lastError !== null) {
                this._resetLastErrorAndThrow();
            }
            return elapsed;
        };
        FakeAsyncTestZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
            switch (task.type) {
                case 'microTask':
                    var args = task.data && task.data.args;
                    // should pass additional arguments to callback if have any
                    // currently we know process.nextTick will have such additional
                    // arguments
                    var addtionalArgs = void 0;
                    if (args) {
                        var callbackIndex = task.data.callbackIndex;
                        if (typeof args.length === 'number' && args.length > callbackIndex + 1) {
                            addtionalArgs = Array.prototype.slice.call(args, callbackIndex + 1);
                        }
                    }
                    this._microtasks.push({
                        func: task.invoke,
                        args: addtionalArgs,
                        target: task.data && task.data.target
                    });
                    break;
                case 'macroTask':
                    switch (task.source) {
                        case 'setTimeout':
                            task.data['handleId'] =
                                this._setTimeout(task.invoke, task.data['delay'], task.data['args']);
                            break;
                        case 'setInterval':
                            task.data['handleId'] =
                                this._setInterval(task.invoke, task.data['delay'], task.data['args']);
                            break;
                        case 'XMLHttpRequest.send':
                            throw new Error('Cannot make XHRs from within a fake async test.');
                        case 'requestAnimationFrame':
                        case 'webkitRequestAnimationFrame':
                        case 'mozRequestAnimationFrame':
                            // Simulate a requestAnimationFrame by using a setTimeout with 16 ms.
                            // (60 frames per second)
                            task.data['handleId'] = this._setTimeout(task.invoke, 16, task.data['args'], this.trackPendingRequestAnimationFrame);
                            break;
                        default:
                            throw new Error('Unknown macroTask scheduled in fake async test: ' + task.source);
                    }
                    break;
                case 'eventTask':
                    task = delegate.scheduleTask(target, task);
                    break;
            }
            return task;
        };
        FakeAsyncTestZoneSpec.prototype.onCancelTask = function (delegate, current, target, task) {
            switch (task.source) {
                case 'setTimeout':
                case 'requestAnimationFrame':
                case 'webkitRequestAnimationFrame':
                case 'mozRequestAnimationFrame':
                    return this._clearTimeout(task.data['handleId']);
                case 'setInterval':
                    return this._clearInterval(task.data['handleId']);
                default:
                    return delegate.cancelTask(target, task);
            }
        };
        FakeAsyncTestZoneSpec.prototype.onHandleError = function (parentZoneDelegate, currentZone, targetZone, error) {
            this._lastError = error;
            return false; // Don't propagate error to parent zone.
        };
        return FakeAsyncTestZoneSpec;
    }());
    // Export the class so that new instances can be created with proper
    // constructor params.
    Zone['FakeAsyncTestZoneSpec'] = FakeAsyncTestZoneSpec;
})(typeof window === 'object' && window || typeof self === 'object' && self || global);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1hc3luYy10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFrZS1hc3luYy10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILENBQUMsVUFBUyxNQUFXO0lBaUJuQjtRQVNFO1lBUkEscUJBQXFCO1lBQ2QsV0FBTSxHQUFXLENBQUMsQ0FBQztZQUUxQix5RkFBeUY7WUFDakYsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO1lBQ2xELG9DQUFvQztZQUM1QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUVsQixDQUFDO1FBRWhCLG9DQUFnQixHQUFoQixVQUNJLEVBQVksRUFBRSxLQUFhLEVBQUUsSUFBZ0IsRUFBRSxVQUEyQixFQUMxRSx1QkFBd0MsRUFBRSxFQUFlO1lBRDVCLHFCQUFBLEVBQUEsU0FBZ0I7WUFBRSwyQkFBQSxFQUFBLGtCQUEyQjtZQUMxRSx3Q0FBQSxFQUFBLCtCQUF3QztZQUFFLG1CQUFBLEVBQUEsTUFBYyxDQUFDO1lBQzNELElBQUksU0FBUyxHQUFXLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUV4Qyw2REFBNkQ7WUFDN0QsSUFBSSxRQUFRLEdBQXNCO2dCQUNoQyxPQUFPLEVBQUUsT0FBTztnQkFDaEIsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLHVCQUF1QixFQUFFLHVCQUF1QjthQUNqRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFF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LENBQUMsR0FBRyxxQkFBcUIsQ0FBQztBQUNqRSxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbihmdW5jdGlvbihnbG9iYWw6IGFueSkge1xuICBpbnRlcmZhY2UgU2NoZWR1bGVkRnVuY3Rpb24ge1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgICBpZDogbnVtYmVyO1xuICAgIGZ1bmM6IEZ1bmN0aW9uO1xuICAgIGFyZ3M6IGFueVtdO1xuICAgIGRlbGF5OiBudW1iZXI7XG4gICAgaXNQZXJpb2RpYzogYm9vbGVhbjtcbiAgICBpc1JlcXVlc3RBbmltYXRpb25GcmFtZTogYm9vbGVhbjtcbiAgfVxuXG4gIGludGVyZmFjZSBNaWNyb1Rhc2tTY2hlZHVsZWRGdW5jdGlvbiB7XG4gICAgZnVuYzogRnVuY3Rpb247XG4gICAgYXJnczogYW55W107XG4gICAgdGFyZ2V0OiBhbnk7XG4gIH1cblxuICBjbGFzcyBTY2hlZHVsZXIge1xuICAgIC8vIE5leHQgc2NoZWR1bGVyIGlkLlxuICAgIHB1YmxpYyBuZXh0SWQ6IG51bWJlciA9IDA7XG5cbiAgICAvLyBTY2hlZHVsZXIgcXVldWUgd2l0aCB0aGUgdHVwbGUgb2YgZW5kIHRpbWUgYW5kIGNhbGxiYWNrIGZ1bmN0aW9uIC0gc29ydGVkIGJ5IGVuZCB0aW1lLlxuICAgIHByaXZhdGUgX3NjaGVkdWxlclF1ZXVlOiBTY2hlZHVsZWRGdW5jdGlvbltdID0gW107XG4gICAgLy8gQ3VycmVudCBzaW11bGF0ZWQgdGltZSBpbiBtaWxsaXMuXG4gICAgcHJpdmF0ZSBfY3VycmVudFRpbWU6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBzY2hlZHVsZUZ1bmN0aW9uKFxuICAgICAgICBjYjogRnVuY3Rpb24sIGRlbGF5OiBudW1iZXIsIGFyZ3M6IGFueVtdID0gW10sIGlzUGVyaW9kaWM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgaXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IGJvb2xlYW4gPSBmYWxzZSwgaWQ6IG51bWJlciA9IC0xKTogbnVtYmVyIHtcbiAgICAgIGxldCBjdXJyZW50SWQ6IG51bWJlciA9IGlkIDwgMCA/IHRoaXMubmV4dElkKysgOiBpZDtcbiAgICAgIGxldCBlbmRUaW1lID0gdGhpcy5fY3VycmVudFRpbWUgKyBkZWxheTtcblxuICAgICAgLy8gSW5zZXJ0IHNvIHRoYXQgc2NoZWR1bGVyIHF1ZXVlIHJlbWFpbnMgc29ydGVkIGJ5IGVuZCB0aW1lLlxuICAgICAgbGV0IG5ld0VudHJ5OiBTY2hlZHVsZWRGdW5jdGlvbiA9IHtcbiAgICAgICAgZW5kVGltZTogZW5kVGltZSxcbiAgICAgICAgaWQ6IGN1cnJlbnRJZCxcbiAgICAgICAgZnVuYzogY2IsXG4gICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgIGRlbGF5OiBkZWxheSxcbiAgICAgICAgaXNQZXJpb2RpYzogaXNQZXJpb2RpYyxcbiAgICAgICAgaXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IGlzUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICB9O1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgZm9yICg7IGkgPCB0aGlzLl9zY2hlZHVsZXJRdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgY3VycmVudEVudHJ5ID0gdGhpcy5fc2NoZWR1bGVyUXVldWVbaV07XG4gICAgICAgIGlmIChuZXdFbnRyeS5lbmRUaW1lIDwgY3VycmVudEVudHJ5LmVuZFRpbWUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fc2NoZWR1bGVyUXVldWUuc3BsaWNlKGksIDAsIG5ld0VudHJ5KTtcbiAgICAgIHJldHVybiBjdXJyZW50SWQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2NoZWR1bGVkRnVuY3Rpb25XaXRoSWQoaWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zY2hlZHVsZXJRdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5fc2NoZWR1bGVyUXVldWVbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICB0aGlzLl9zY2hlZHVsZXJRdWV1ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aWNrKG1pbGxpczogbnVtYmVyID0gMCwgZG9UaWNrPzogKGVsYXBzZWQ6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgbGV0IGZpbmFsVGltZSA9IHRoaXMuX2N1cnJlbnRUaW1lICsgbWlsbGlzO1xuICAgICAgbGV0IGxhc3RDdXJyZW50VGltZSA9IDA7XG4gICAgICBpZiAodGhpcy5fc2NoZWR1bGVyUXVldWUubGVuZ3RoID09PSAwICYmIGRvVGljaykge1xuICAgICAgICBkb1RpY2sobWlsbGlzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHRoaXMuX3NjaGVkdWxlclF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9zY2hlZHVsZXJRdWV1ZVswXTtcbiAgICAgICAgaWYgKGZpbmFsVGltZSA8IGN1cnJlbnQuZW5kVGltZSkge1xuICAgICAgICAgIC8vIERvbmUgcHJvY2Vzc2luZyB0aGUgcXVldWUgc2luY2UgaXQncyBzb3J0ZWQgYnkgZW5kVGltZS5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUaW1lIHRvIHJ1biBzY2hlZHVsZWQgZnVuY3Rpb24uIFJlbW92ZSBpdCBmcm9tIHRoZSBoZWFkIG9mIHF1ZXVlLlxuICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5fc2NoZWR1bGVyUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICBsYXN0Q3VycmVudFRpbWUgPSB0aGlzLl9jdXJyZW50VGltZTtcbiAgICAgICAgICB0aGlzLl9jdXJyZW50VGltZSA9IGN1cnJlbnQuZW5kVGltZTtcbiAgICAgICAgICBpZiAoZG9UaWNrKSB7XG4gICAgICAgICAgICBkb1RpY2sodGhpcy5fY3VycmVudFRpbWUgLSBsYXN0Q3VycmVudFRpbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgcmV0dmFsID0gY3VycmVudC5mdW5jLmFwcGx5KGdsb2JhbCwgY3VycmVudC5hcmdzKTtcbiAgICAgICAgICBpZiAoIXJldHZhbCkge1xuICAgICAgICAgICAgLy8gVW5jYXVnaHQgZXhjZXB0aW9uIGluIHRoZSBjdXJyZW50IHNjaGVkdWxlZCBmdW5jdGlvbi4gU3RvcCBwcm9jZXNzaW5nIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fY3VycmVudFRpbWUgPSBmaW5hbFRpbWU7XG4gICAgfVxuXG4gICAgZmx1c2gobGltaXQgPSAyMCwgZmx1c2hQZXJpb2RpYyA9IGZhbHNlLCBkb1RpY2s/OiAoZWxhcHNlZDogbnVtYmVyKSA9PiB2b2lkKTogbnVtYmVyIHtcbiAgICAgIGlmIChmbHVzaFBlcmlvZGljKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZsdXNoUGVyaW9kaWMoZG9UaWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZsdXNoTm9uUGVyaW9kaWMobGltaXQsIGRvVGljayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmbHVzaFBlcmlvZGljKGRvVGljaz86IChlbGFwc2VkOiBudW1iZXIpID0+IHZvaWQpOiBudW1iZXIge1xuICAgICAgaWYgKHRoaXMuX3NjaGVkdWxlclF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIC8vIEZpbmQgdGhlIGxhc3QgdGFzayBjdXJyZW50bHkgcXVldWVkIGluIHRoZSBzY2hlZHVsZXIgcXVldWUgYW5kIHRpY2tcbiAgICAgIC8vIHRpbGwgdGhhdCB0aW1lLlxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gdGhpcy5fY3VycmVudFRpbWU7XG4gICAgICBjb25zdCBsYXN0VGFzayA9IHRoaXMuX3NjaGVkdWxlclF1ZXVlW3RoaXMuX3NjaGVkdWxlclF1ZXVlLmxlbmd0aCAtIDFdO1xuICAgICAgdGhpcy50aWNrKGxhc3RUYXNrLmVuZFRpbWUgLSBzdGFydFRpbWUsIGRvVGljayk7XG4gICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmbHVzaE5vblBlcmlvZGljKGxpbWl0OiBudW1iZXIsIGRvVGljaz86IChlbGFwc2VkOiBudW1iZXIpID0+IHZvaWQpOiBudW1iZXIge1xuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gdGhpcy5fY3VycmVudFRpbWU7XG4gICAgICBsZXQgbGFzdEN1cnJlbnRUaW1lID0gMDtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICB3aGlsZSAodGhpcy5fc2NoZWR1bGVyUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICBpZiAoY291bnQgPiBsaW1pdCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgJ2ZsdXNoIGZhaWxlZCBhZnRlciByZWFjaGluZyB0aGUgbGltaXQgb2YgJyArIGxpbWl0ICtcbiAgICAgICAgICAgICAgJyB0YXNrcy4gRG9lcyB5b3VyIGNvZGUgdXNlIGEgcG9sbGluZyB0aW1lb3V0PycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmx1c2ggb25seSBub24tcGVyaW9kaWMgdGltZXJzLlxuICAgICAgICAvLyBJZiB0aGUgb25seSByZW1haW5pbmcgdGFza3MgYXJlIHBlcmlvZGljKG9yIHJlcXVlc3RBbmltYXRpb25GcmFtZSksIGZpbmlzaCBmbHVzaGluZy5cbiAgICAgICAgaWYgKHRoaXMuX3NjaGVkdWxlclF1ZXVlLmZpbHRlcih0YXNrID0+ICF0YXNrLmlzUGVyaW9kaWMgJiYgIXRhc2suaXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICAgICAgICAgICAgLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuX3NjaGVkdWxlclF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGxhc3RDdXJyZW50VGltZSA9IHRoaXMuX2N1cnJlbnRUaW1lO1xuICAgICAgICB0aGlzLl9jdXJyZW50VGltZSA9IGN1cnJlbnQuZW5kVGltZTtcbiAgICAgICAgaWYgKGRvVGljaykge1xuICAgICAgICAgIC8vIFVwZGF0ZSBhbnkgc2Vjb25kYXJ5IHNjaGVkdWxlcnMgbGlrZSBKYXNtaW5lIG1vY2sgRGF0ZS5cbiAgICAgICAgICBkb1RpY2sodGhpcy5fY3VycmVudFRpbWUgLSBsYXN0Q3VycmVudFRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJldHZhbCA9IGN1cnJlbnQuZnVuYy5hcHBseShnbG9iYWwsIGN1cnJlbnQuYXJncyk7XG4gICAgICAgIGlmICghcmV0dmFsKSB7XG4gICAgICAgICAgLy8gVW5jYXVnaHQgZXhjZXB0aW9uIGluIHRoZSBjdXJyZW50IHNjaGVkdWxlZCBmdW5jdGlvbi4gU3RvcCBwcm9jZXNzaW5nIHRoZSBxdWV1ZS5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIEZha2VBc3luY1Rlc3Rab25lU3BlYyBpbXBsZW1lbnRzIFpvbmVTcGVjIHtcbiAgICBzdGF0aWMgYXNzZXJ0SW5ab25lKCk6IHZvaWQge1xuICAgICAgaWYgKFpvbmUuY3VycmVudC5nZXQoJ0Zha2VBc3luY1Rlc3Rab25lU3BlYycpID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY29kZSBzaG91bGQgYmUgcnVubmluZyBpbiB0aGUgZmFrZUFzeW5jIHpvbmUgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2NoZWR1bGVyOiBTY2hlZHVsZXIgPSBuZXcgU2NoZWR1bGVyKCk7XG4gICAgcHJpdmF0ZSBfbWljcm90YXNrczogTWljcm9UYXNrU2NoZWR1bGVkRnVuY3Rpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgX2xhc3RFcnJvcjogRXJyb3IgPSBudWxsO1xuICAgIHByaXZhdGUgX3VuY2F1Z2h0UHJvbWlzZUVycm9yczoge3JlamVjdGlvbjogYW55fVtdID1cbiAgICAgICAgKFByb21pc2UgYXMgYW55KVsoWm9uZSBhcyBhbnkpLl9fc3ltYm9sX18oJ3VuY2F1Z2h0UHJvbWlzZUVycm9ycycpXTtcblxuICAgIHBlbmRpbmdQZXJpb2RpY1RpbWVyczogbnVtYmVyW10gPSBbXTtcbiAgICBwZW5kaW5nVGltZXJzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IobmFtZVByZWZpeDogc3RyaW5nLCBwcml2YXRlIHRyYWNrUGVuZGluZ1JlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZhbHNlKSB7XG4gICAgICB0aGlzLm5hbWUgPSAnZmFrZUFzeW5jVGVzdFpvbmUgZm9yICcgKyBuYW1lUHJlZml4O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZuQW5kRmx1c2goZm46IEZ1bmN0aW9uLCBjb21wbGV0ZXJzOiB7b25TdWNjZXNzPzogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbn0pOlxuICAgICAgICBGdW5jdGlvbiB7XG4gICAgICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGZuLmFwcGx5KGdsb2JhbCwgYXJncyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xhc3RFcnJvciA9PT0gbnVsbCkgeyAgLy8gU3VjY2Vzc1xuICAgICAgICAgIGlmIChjb21wbGV0ZXJzLm9uU3VjY2VzcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wbGV0ZXJzLm9uU3VjY2Vzcy5hcHBseShnbG9iYWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBGbHVzaCBtaWNyb3Rhc2tzIG9ubHkgb24gc3VjY2Vzcy5cbiAgICAgICAgICB0aGlzLmZsdXNoTWljcm90YXNrcygpO1xuICAgICAgICB9IGVsc2UgeyAgLy8gRmFpbHVyZVxuICAgICAgICAgIGlmIChjb21wbGV0ZXJzLm9uRXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcGxldGVycy5vbkVycm9yLmFwcGx5KGdsb2JhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybiB0cnVlIGlmIHRoZXJlIHdlcmUgbm8gZXJyb3JzLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0RXJyb3IgPT09IG51bGw7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIF9yZW1vdmVUaW1lcih0aW1lcnM6IG51bWJlcltdLCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBsZXQgaW5kZXggPSB0aW1lcnMuaW5kZXhPZihpZCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aW1lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZXF1ZXVlVGltZXIoaWQ6IG51bWJlcik6IEZ1bmN0aW9uIHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIEZha2VBc3luY1Rlc3Rab25lU3BlYy5fcmVtb3ZlVGltZXIodGhpcy5wZW5kaW5nVGltZXJzLCBpZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVldWVQZXJpb2RpY1RpbWVyKGZuOiBGdW5jdGlvbiwgaW50ZXJ2YWw6IG51bWJlciwgYXJnczogYW55W10sIGlkOiBudW1iZXIpOlxuICAgICAgICBGdW5jdGlvbiB7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvLyBSZXF1ZXVlIHRoZSB0aW1lciBjYWxsYmFjayBpZiBpdCdzIG5vdCBiZWVuIGNhbmNlbGVkLlxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nUGVyaW9kaWNUaW1lcnMuaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlRnVuY3Rpb24oZm4sIGludGVydmFsLCBhcmdzLCB0cnVlLCBmYWxzZSwgaWQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RlcXVldWVQZXJpb2RpY1RpbWVyKGlkOiBudW1iZXIpOiBGdW5jdGlvbiB7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBGYWtlQXN5bmNUZXN0Wm9uZVNwZWMuX3JlbW92ZVRpbWVyKHRoaXMucGVuZGluZ1BlcmlvZGljVGltZXJzLCBpZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldFRpbWVvdXQoZm46IEZ1bmN0aW9uLCBkZWxheTogbnVtYmVyLCBhcmdzOiBhbnlbXSwgaXNUaW1lciA9IHRydWUpOiBudW1iZXIge1xuICAgICAgbGV0IHJlbW92ZVRpbWVyRm4gPSB0aGlzLl9kZXF1ZXVlVGltZXIodGhpcy5fc2NoZWR1bGVyLm5leHRJZCk7XG4gICAgICAvLyBRdWV1ZSB0aGUgY2FsbGJhY2sgYW5kIGRlcXVldWUgdGhlIHRpbWVyIG9uIHN1Y2Nlc3MgYW5kIGVycm9yLlxuICAgICAgbGV0IGNiID0gdGhpcy5fZm5BbmRGbHVzaChmbiwge29uU3VjY2VzczogcmVtb3ZlVGltZXJGbiwgb25FcnJvcjogcmVtb3ZlVGltZXJGbn0pO1xuICAgICAgbGV0IGlkID0gdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlRnVuY3Rpb24oY2IsIGRlbGF5LCBhcmdzLCBmYWxzZSwgIWlzVGltZXIpO1xuICAgICAgaWYgKGlzVGltZXIpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nVGltZXJzLnB1c2goaWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFyVGltZW91dChpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBGYWtlQXN5bmNUZXN0Wm9uZVNwZWMuX3JlbW92ZVRpbWVyKHRoaXMucGVuZGluZ1RpbWVycywgaWQpO1xuICAgICAgdGhpcy5fc2NoZWR1bGVyLnJlbW92ZVNjaGVkdWxlZEZ1bmN0aW9uV2l0aElkKGlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRJbnRlcnZhbChmbjogRnVuY3Rpb24sIGludGVydmFsOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogbnVtYmVyIHtcbiAgICAgIGxldCBpZCA9IHRoaXMuX3NjaGVkdWxlci5uZXh0SWQ7XG4gICAgICBsZXQgY29tcGxldGVycyA9IHtvblN1Y2Nlc3M6IG51bGwgYXMgRnVuY3Rpb24sIG9uRXJyb3I6IHRoaXMuX2RlcXVldWVQZXJpb2RpY1RpbWVyKGlkKX07XG4gICAgICBsZXQgY2IgPSB0aGlzLl9mbkFuZEZsdXNoKGZuLCBjb21wbGV0ZXJzKTtcblxuICAgICAgLy8gVXNlIHRoZSBjYWxsYmFjayBjcmVhdGVkIGFib3ZlIHRvIHJlcXVldWUgb24gc3VjY2Vzcy5cbiAgICAgIGNvbXBsZXRlcnMub25TdWNjZXNzID0gdGhpcy5fcmVxdWV1ZVBlcmlvZGljVGltZXIoY2IsIGludGVydmFsLCBhcmdzLCBpZCk7XG5cbiAgICAgIC8vIFF1ZXVlIHRoZSBjYWxsYmFjayBhbmQgZGVxdWV1ZSB0aGUgcGVyaW9kaWMgdGltZXIgb25seSBvbiBlcnJvci5cbiAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZUZ1bmN0aW9uKGNiLCBpbnRlcnZhbCwgYXJncywgdHJ1ZSk7XG4gICAgICB0aGlzLnBlbmRpbmdQZXJpb2RpY1RpbWVycy5wdXNoKGlkKTtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhckludGVydmFsKGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIEZha2VBc3luY1Rlc3Rab25lU3BlYy5fcmVtb3ZlVGltZXIodGhpcy5wZW5kaW5nUGVyaW9kaWNUaW1lcnMsIGlkKTtcbiAgICAgIHRoaXMuX3NjaGVkdWxlci5yZW1vdmVTY2hlZHVsZWRGdW5jdGlvbldpdGhJZChpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzZXRMYXN0RXJyb3JBbmRUaHJvdygpOiB2b2lkIHtcbiAgICAgIGxldCBlcnJvciA9IHRoaXMuX2xhc3RFcnJvciB8fCB0aGlzLl91bmNhdWdodFByb21pc2VFcnJvcnNbMF07XG4gICAgICB0aGlzLl91bmNhdWdodFByb21pc2VFcnJvcnMubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuX2xhc3RFcnJvciA9IG51bGw7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICB0aWNrKG1pbGxpczogbnVtYmVyID0gMCwgZG9UaWNrPzogKGVsYXBzZWQ6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgRmFrZUFzeW5jVGVzdFpvbmVTcGVjLmFzc2VydEluWm9uZSgpO1xuICAgICAgdGhpcy5mbHVzaE1pY3JvdGFza3MoKTtcbiAgICAgIHRoaXMuX3NjaGVkdWxlci50aWNrKG1pbGxpcywgZG9UaWNrKTtcbiAgICAgIGlmICh0aGlzLl9sYXN0RXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVzZXRMYXN0RXJyb3JBbmRUaHJvdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZsdXNoTWljcm90YXNrcygpOiB2b2lkIHtcbiAgICAgIEZha2VBc3luY1Rlc3Rab25lU3BlYy5hc3NlcnRJblpvbmUoKTtcbiAgICAgIGNvbnN0IGZsdXNoRXJyb3JzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fbGFzdEVycm9yICE9PSBudWxsIHx8IHRoaXMuX3VuY2F1Z2h0UHJvbWlzZUVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBzdG9wIHByb2Nlc3NpbmcgdGhlIG1pY3JvdGFzayBxdWV1ZSBhbmQgcmV0aHJvdyB0aGUgZXJyb3IuXG4gICAgICAgICAgdGhpcy5fcmVzZXRMYXN0RXJyb3JBbmRUaHJvdygpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd2hpbGUgKHRoaXMuX21pY3JvdGFza3MubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgbWljcm90YXNrID0gdGhpcy5fbWljcm90YXNrcy5zaGlmdCgpO1xuICAgICAgICBtaWNyb3Rhc2suZnVuYy5hcHBseShtaWNyb3Rhc2sudGFyZ2V0LCBtaWNyb3Rhc2suYXJncyk7XG4gICAgICB9XG4gICAgICBmbHVzaEVycm9ycygpO1xuICAgIH1cblxuICAgIGZsdXNoKGxpbWl0PzogbnVtYmVyLCBmbHVzaFBlcmlvZGljPzogYm9vbGVhbiwgZG9UaWNrPzogKGVsYXBzZWQ6IG51bWJlcikgPT4gdm9pZCk6IG51bWJlciB7XG4gICAgICBGYWtlQXN5bmNUZXN0Wm9uZVNwZWMuYXNzZXJ0SW5ab25lKCk7XG4gICAgICB0aGlzLmZsdXNoTWljcm90YXNrcygpO1xuICAgICAgY29uc3QgZWxhcHNlZCA9IHRoaXMuX3NjaGVkdWxlci5mbHVzaChsaW1pdCwgZmx1c2hQZXJpb2RpYywgZG9UaWNrKTtcbiAgICAgIGlmICh0aGlzLl9sYXN0RXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVzZXRMYXN0RXJyb3JBbmRUaHJvdygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsYXBzZWQ7XG4gICAgfVxuXG4gICAgLy8gWm9uZVNwZWMgaW1wbGVtZW50YXRpb24gYmVsb3cuXG5cbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICBwcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHsnRmFrZUFzeW5jVGVzdFpvbmVTcGVjJzogdGhpc307XG5cbiAgICBvblNjaGVkdWxlVGFzayhkZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50OiBab25lLCB0YXJnZXQ6IFpvbmUsIHRhc2s6IFRhc2spOiBUYXNrIHtcbiAgICAgIHN3aXRjaCAodGFzay50eXBlKSB7XG4gICAgICAgIGNhc2UgJ21pY3JvVGFzayc6XG4gICAgICAgICAgbGV0IGFyZ3MgPSB0YXNrLmRhdGEgJiYgKHRhc2suZGF0YSBhcyBhbnkpLmFyZ3M7XG4gICAgICAgICAgLy8gc2hvdWxkIHBhc3MgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gY2FsbGJhY2sgaWYgaGF2ZSBhbnlcbiAgICAgICAgICAvLyBjdXJyZW50bHkgd2Uga25vdyBwcm9jZXNzLm5leHRUaWNrIHdpbGwgaGF2ZSBzdWNoIGFkZGl0aW9uYWxcbiAgICAgICAgICAvLyBhcmd1bWVudHNcbiAgICAgICAgICBsZXQgYWRkdGlvbmFsQXJnczogYW55W107XG4gICAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgIGxldCBjYWxsYmFja0luZGV4ID0gKHRhc2suZGF0YSBhcyBhbnkpLmNhbGxiYWNrSW5kZXg7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MubGVuZ3RoID09PSAnbnVtYmVyJyAmJiBhcmdzLmxlbmd0aCA+IGNhbGxiYWNrSW5kZXggKyAxKSB7XG4gICAgICAgICAgICAgIGFkZHRpb25hbEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCBjYWxsYmFja0luZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX21pY3JvdGFza3MucHVzaCh7XG4gICAgICAgICAgICBmdW5jOiB0YXNrLmludm9rZSxcbiAgICAgICAgICAgIGFyZ3M6IGFkZHRpb25hbEFyZ3MsXG4gICAgICAgICAgICB0YXJnZXQ6IHRhc2suZGF0YSAmJiAodGFzay5kYXRhIGFzIGFueSkudGFyZ2V0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21hY3JvVGFzayc6XG4gICAgICAgICAgc3dpdGNoICh0YXNrLnNvdXJjZSkge1xuICAgICAgICAgICAgY2FzZSAnc2V0VGltZW91dCc6XG4gICAgICAgICAgICAgIHRhc2suZGF0YVsnaGFuZGxlSWQnXSA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaW1lb3V0KHRhc2suaW52b2tlLCB0YXNrLmRhdGFbJ2RlbGF5J10sICh0YXNrLmRhdGEgYXMgYW55KVsnYXJncyddKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzZXRJbnRlcnZhbCc6XG4gICAgICAgICAgICAgIHRhc2suZGF0YVsnaGFuZGxlSWQnXSA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbnRlcnZhbCh0YXNrLmludm9rZSwgdGFzay5kYXRhWydkZWxheSddLCAodGFzay5kYXRhIGFzIGFueSlbJ2FyZ3MnXSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnWE1MSHR0cFJlcXVlc3Quc2VuZCc6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IG1ha2UgWEhScyBmcm9tIHdpdGhpbiBhIGZha2UgYXN5bmMgdGVzdC4nKTtcbiAgICAgICAgICAgIGNhc2UgJ3JlcXVlc3RBbmltYXRpb25GcmFtZSc6XG4gICAgICAgICAgICBjYXNlICd3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnOlxuICAgICAgICAgICAgY2FzZSAnbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lJzpcbiAgICAgICAgICAgICAgLy8gU2ltdWxhdGUgYSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYnkgdXNpbmcgYSBzZXRUaW1lb3V0IHdpdGggMTYgbXMuXG4gICAgICAgICAgICAgIC8vICg2MCBmcmFtZXMgcGVyIHNlY29uZClcbiAgICAgICAgICAgICAgdGFzay5kYXRhWydoYW5kbGVJZCddID0gdGhpcy5fc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAgIHRhc2suaW52b2tlLCAxNiwgKHRhc2suZGF0YSBhcyBhbnkpWydhcmdzJ10sXG4gICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrUGVuZGluZ1JlcXVlc3RBbmltYXRpb25GcmFtZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG1hY3JvVGFzayBzY2hlZHVsZWQgaW4gZmFrZSBhc3luYyB0ZXN0OiAnICsgdGFzay5zb3VyY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXZlbnRUYXNrJzpcbiAgICAgICAgICB0YXNrID0gZGVsZWdhdGUuc2NoZWR1bGVUYXNrKHRhcmdldCwgdGFzayk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFzaztcbiAgICB9XG5cbiAgICBvbkNhbmNlbFRhc2soZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCB0YXNrOiBUYXNrKTogYW55IHtcbiAgICAgIHN3aXRjaCAodGFzay5zb3VyY2UpIHtcbiAgICAgICAgY2FzZSAnc2V0VGltZW91dCc6XG4gICAgICAgIGNhc2UgJ3JlcXVlc3RBbmltYXRpb25GcmFtZSc6XG4gICAgICAgIGNhc2UgJ3dlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSc6XG4gICAgICAgIGNhc2UgJ21velJlcXVlc3RBbmltYXRpb25GcmFtZSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NsZWFyVGltZW91dCh0YXNrLmRhdGFbJ2hhbmRsZUlkJ10pO1xuICAgICAgICBjYXNlICdzZXRJbnRlcnZhbCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NsZWFySW50ZXJ2YWwodGFzay5kYXRhWydoYW5kbGVJZCddKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuY2FuY2VsVGFzayh0YXJnZXQsIHRhc2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uSGFuZGxlRXJyb3IoXG4gICAgICAgIHBhcmVudFpvbmVEZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZTogWm9uZSwgdGFyZ2V0Wm9uZTogWm9uZSxcbiAgICAgICAgZXJyb3I6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgdGhpcy5fbGFzdEVycm9yID0gZXJyb3I7XG4gICAgICByZXR1cm4gZmFsc2U7ICAvLyBEb24ndCBwcm9wYWdhdGUgZXJyb3IgdG8gcGFyZW50IHpvbmUuXG4gICAgfVxuICB9XG5cbiAgLy8gRXhwb3J0IHRoZSBjbGFzcyBzbyB0aGF0IG5ldyBpbnN0YW5jZXMgY2FuIGJlIGNyZWF0ZWQgd2l0aCBwcm9wZXJcbiAgLy8gY29uc3RydWN0b3IgcGFyYW1zLlxuICAoWm9uZSBhcyBhbnkpWydGYWtlQXN5bmNUZXN0Wm9uZVNwZWMnXSA9IEZha2VBc3luY1Rlc3Rab25lU3BlYztcbn0pKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdyB8fCB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcgJiYgc2VsZiB8fCBnbG9iYWwpO1xuIl19