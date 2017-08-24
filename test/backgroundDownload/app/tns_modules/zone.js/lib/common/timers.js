/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                if (typeof data.handleId === 'number') {
                    // Node returns complex objects as handleIds
                    delete tasksByHandleId[data.handleId];
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        if (typeof data.handleId === 'number') {
            // Node returns complex objects as handleIds -> no need to keep them around. Additionally,
            // this throws an
            // exception in older node versions and has no effect there, because of the stringified key.
            tasksByHandleId[data.handleId] = task;
        }
        return task;
    }
    function clearTask(task) {
        if (typeof task.data.handleId === 'number') {
            // Node returns complex objects as handleIds
            delete tasksByHandleId[task.data.handleId];
        }
        return clearNative(task.data.handleId);
    }
    setNative =
        utils_1.patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var zone = Zone.current;
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        utils_1.patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}
exports.patchTimer = patchTimer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsaUNBQW9DO0FBT3BDLG9CQUEyQixNQUFXLEVBQUUsT0FBZSxFQUFFLFVBQWtCLEVBQUUsVUFBa0I7SUFDN0YsSUFBSSxTQUFTLEdBQWEsSUFBSSxDQUFDO0lBQy9CLElBQUksV0FBVyxHQUFhLElBQUksQ0FBQztJQUNqQyxPQUFPLElBQUksVUFBVSxDQUFDO0lBQ3RCLFVBQVUsSUFBSSxVQUFVLENBQUM7SUFFekIsSUFBTSxlQUFlLEdBQXlCLEVBQUUsQ0FBQztJQUVqRCxzQkFBc0IsSUFBVTtRQUM5QixJQUFNLElBQUksR0FBaUIsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQztZQUNFLElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDckMsQ0FBQztvQkFBUyxDQUFDO2dCQUNULEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN0Qyw0Q0FBNEM7b0JBQzVDLE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEMsMEZBQTBGO1lBQzFGLGlCQUFpQjtZQUNqQiw0RkFBNEY7WUFDNUYsZUFBZSxDQUFDLElBQUks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Q0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxjQUFjO29CQUM3QixDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25FLDJDQUEyQztvQkFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04seUNBQXlDO2dCQUN6QyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQyxFQVp1RCxDQVl2RCxDQUFDLENBQUM7QUFDVCxDQUFDO0FBbkZELGdDQW1GQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtwYXRjaE1ldGhvZH0gZnJvbSAnLi91dGlscyc7XG5cbmludGVyZmFjZSBUaW1lck9wdGlvbnMgZXh0ZW5kcyBUYXNrRGF0YSB7XG4gIGhhbmRsZUlkOiBudW1iZXI7XG4gIGFyZ3M6IGFueVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hUaW1lcih3aW5kb3c6IGFueSwgc2V0TmFtZTogc3RyaW5nLCBjYW5jZWxOYW1lOiBzdHJpbmcsIG5hbWVTdWZmaXg6IHN0cmluZykge1xuICBsZXQgc2V0TmF0aXZlOiBGdW5jdGlvbiA9IG51bGw7XG4gIGxldCBjbGVhck5hdGl2ZTogRnVuY3Rpb24gPSBudWxsO1xuICBzZXROYW1lICs9IG5hbWVTdWZmaXg7XG4gIGNhbmNlbE5hbWUgKz0gbmFtZVN1ZmZpeDtcblxuICBjb25zdCB0YXNrc0J5SGFuZGxlSWQ6IHtbaWQ6IG51bWJlcl06IFRhc2t9ID0ge307XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGVUYXNrKHRhc2s6IFRhc2spIHtcbiAgICBjb25zdCBkYXRhID0gPFRpbWVyT3B0aW9ucz50YXNrLmRhdGE7XG4gICAgZnVuY3Rpb24gdGltZXIoKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0YXNrLmludm9rZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmhhbmRsZUlkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIC8vIE5vZGUgcmV0dXJucyBjb21wbGV4IG9iamVjdHMgYXMgaGFuZGxlSWRzXG4gICAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVJZFtkYXRhLmhhbmRsZUlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhLmFyZ3NbMF0gPSB0aW1lcjtcbiAgICBkYXRhLmhhbmRsZUlkID0gc2V0TmF0aXZlLmFwcGx5KHdpbmRvdywgZGF0YS5hcmdzKTtcbiAgICBpZiAodHlwZW9mIGRhdGEuaGFuZGxlSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAvLyBOb2RlIHJldHVybnMgY29tcGxleCBvYmplY3RzIGFzIGhhbmRsZUlkcyAtPiBubyBuZWVkIHRvIGtlZXAgdGhlbSBhcm91bmQuIEFkZGl0aW9uYWxseSxcbiAgICAgIC8vIHRoaXMgdGhyb3dzIGFuXG4gICAgICAvLyBleGNlcHRpb24gaW4gb2xkZXIgbm9kZSB2ZXJzaW9ucyBhbmQgaGFzIG5vIGVmZmVjdCB0aGVyZSwgYmVjYXVzZSBvZiB0aGUgc3RyaW5naWZpZWQga2V5LlxuICAgICAgdGFza3NCeUhhbmRsZUlkW2RhdGEuaGFuZGxlSWRdID0gdGFzaztcbiAgICB9XG4gICAgcmV0dXJuIHRhc2s7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclRhc2sodGFzazogVGFzaykge1xuICAgIGlmICh0eXBlb2YoPFRpbWVyT3B0aW9ucz50YXNrLmRhdGEpLmhhbmRsZUlkID09PSAnbnVtYmVyJykge1xuICAgICAgLy8gTm9kZSByZXR1cm5zIGNvbXBsZXggb2JqZWN0cyBhcyBoYW5kbGVJZHNcbiAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlSWRbKDxUaW1lck9wdGlvbnM+dGFzay5kYXRhKS5oYW5kbGVJZF07XG4gICAgfVxuICAgIHJldHVybiBjbGVhck5hdGl2ZSgoPFRpbWVyT3B0aW9ucz50YXNrLmRhdGEpLmhhbmRsZUlkKTtcbiAgfVxuXG4gIHNldE5hdGl2ZSA9XG4gICAgICBwYXRjaE1ldGhvZCh3aW5kb3csIHNldE5hbWUsIChkZWxlZ2F0ZTogRnVuY3Rpb24pID0+IGZ1bmN0aW9uKHNlbGY6IGFueSwgYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29uc3Qgem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgICBjb25zdCBvcHRpb25zOiBUaW1lck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoYW5kbGVJZDogbnVsbCxcbiAgICAgICAgICAgIGlzUGVyaW9kaWM6IG5hbWVTdWZmaXggPT09ICdJbnRlcnZhbCcsXG4gICAgICAgICAgICBkZWxheTogKG5hbWVTdWZmaXggPT09ICdUaW1lb3V0JyB8fCBuYW1lU3VmZml4ID09PSAnSW50ZXJ2YWwnKSA/IGFyZ3NbMV0gfHwgMCA6IG51bGwsXG4gICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCB0YXNrID0gem9uZS5zY2hlZHVsZU1hY3JvVGFzayhzZXROYW1lLCBhcmdzWzBdLCBvcHRpb25zLCBzY2hlZHVsZVRhc2ssIGNsZWFyVGFzayk7XG4gICAgICAgICAgaWYgKCF0YXNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGFzaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTm9kZS5qcyBtdXN0IGFkZGl0aW9uYWxseSBzdXBwb3J0IHRoZSByZWYgYW5kIHVucmVmIGZ1bmN0aW9ucy5cbiAgICAgICAgICBjb25zdCBoYW5kbGU6IGFueSA9ICg8VGltZXJPcHRpb25zPnRhc2suZGF0YSkuaGFuZGxlSWQ7XG4gICAgICAgICAgLy8gY2hlY2sgd2hldGhlciBoYW5kbGUgaXMgbnVsbCwgYmVjYXVzZSBzb21lIHBvbHlmaWxsIG9yIGJyb3dzZXJcbiAgICAgICAgICAvLyBtYXkgcmV0dXJuIHVuZGVmaW5lZCBmcm9tIHNldFRpbWVvdXQvc2V0SW50ZXJ2YWwvc2V0SW1tZWRpYXRlL3JlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICAgIGlmIChoYW5kbGUgJiYgaGFuZGxlLnJlZiAmJiBoYW5kbGUudW5yZWYgJiYgdHlwZW9mIGhhbmRsZS5yZWYgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIGhhbmRsZS51bnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgKDxhbnk+dGFzaykucmVmID0gKDxhbnk+aGFuZGxlKS5yZWYuYmluZChoYW5kbGUpO1xuICAgICAgICAgICAgKDxhbnk+dGFzaykudW5yZWYgPSAoPGFueT5oYW5kbGUpLnVucmVmLmJpbmQoaGFuZGxlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2F1c2UgYW4gZXJyb3IgYnkgY2FsbGluZyBpdCBkaXJlY3RseS5cbiAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgY2xlYXJOYXRpdmUgPVxuICAgICAgcGF0Y2hNZXRob2Qod2luZG93LCBjYW5jZWxOYW1lLCAoZGVsZWdhdGU6IEZ1bmN0aW9uKSA9PiBmdW5jdGlvbihzZWxmOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnN0IHRhc2s6IFRhc2sgPSB0eXBlb2YgYXJnc1swXSA9PT0gJ251bWJlcicgPyB0YXNrc0J5SGFuZGxlSWRbYXJnc1swXV0gOiBhcmdzWzBdO1xuICAgICAgICBpZiAodGFzayAmJiB0eXBlb2YgdGFzay50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0YXNrLnN0YXRlICE9PSAnbm90U2NoZWR1bGVkJyAmJlxuICAgICAgICAgICAgICAodGFzay5jYW5jZWxGbiAmJiB0YXNrLmRhdGEuaXNQZXJpb2RpYyB8fCB0YXNrLnJ1bkNvdW50ID09PSAwKSkge1xuICAgICAgICAgICAgLy8gRG8gbm90IGNhbmNlbCBhbHJlYWR5IGNhbmNlbGVkIGZ1bmN0aW9uc1xuICAgICAgICAgICAgdGFzay56b25lLmNhbmNlbFRhc2sodGFzayk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNhdXNlIGFuIGVycm9yIGJ5IGNhbGxpbmcgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgZGVsZWdhdGUuYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG4iXX0=