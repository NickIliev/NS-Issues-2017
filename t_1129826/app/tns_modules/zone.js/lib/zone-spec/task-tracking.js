/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A `TaskTrackingZoneSpec` allows one to track all outstanding Tasks.
 *
 * This is useful in tests. For example to see which tasks are preventing a test from completing
 * or an automated way of releasing all of the event listeners at the end of the test.
 */
var TaskTrackingZoneSpec = (function () {
    function TaskTrackingZoneSpec() {
        this.name = 'TaskTrackingZone';
        this.microTasks = [];
        this.macroTasks = [];
        this.eventTasks = [];
        this.properties = { 'TaskTrackingZone': this };
    }
    TaskTrackingZoneSpec.get = function () {
        return Zone.current.get('TaskTrackingZone');
    };
    TaskTrackingZoneSpec.prototype.getTasksFor = function (type) {
        switch (type) {
            case 'microTask':
                return this.microTasks;
            case 'macroTask':
                return this.macroTasks;
            case 'eventTask':
                return this.eventTasks;
        }
        throw new Error('Unknown task format: ' + type);
    };
    TaskTrackingZoneSpec.prototype.onScheduleTask = function (parentZoneDelegate, currentZone, targetZone, task) {
        task['creationLocation'] = new Error("Task '" + task.type + "' from '" + task.source + "'.");
        var tasks = this.getTasksFor(task.type);
        tasks.push(task);
        return parentZoneDelegate.scheduleTask(targetZone, task);
    };
    TaskTrackingZoneSpec.prototype.onCancelTask = function (parentZoneDelegate, currentZone, targetZone, task) {
        var tasks = this.getTasksFor(task.type);
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i] == task) {
                tasks.splice(i, 1);
                break;
            }
        }
        return parentZoneDelegate.cancelTask(targetZone, task);
    };
    TaskTrackingZoneSpec.prototype.onInvokeTask = function (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
        if (task.type === 'eventTask')
            return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
        var tasks = this.getTasksFor(task.type);
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i] == task) {
                tasks.splice(i, 1);
                break;
            }
        }
        return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
    };
    TaskTrackingZoneSpec.prototype.clearEvents = function () {
        while (this.eventTasks.length) {
            Zone.current.cancelTask(this.eventTasks[0]);
        }
    };
    return TaskTrackingZoneSpec;
}());
// Export the class so that new instances can be created with proper
// constructor params.
Zone['TaskTrackingZoneSpec'] = TaskTrackingZoneSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay10cmFja2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhc2stdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7O0dBS0c7QUFDSDtJQUFBO1FBQ0UsU0FBSSxHQUFHLGtCQUFrQixDQUFDO1FBQzFCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBeUIsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQTBEaEUsQ0FBQztJQXhEUSx3QkFBRyxHQUFWO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLDBDQUFXLEdBQW5CLFVBQW9CLElBQVk7UUFDOUIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssV0FBVztnQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUN6QixLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDekIsS0FBSyxXQUFXO2dCQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCw2Q0FBYyxHQUFkLFVBQWUsa0JBQWdDLEVBQUUsV0FBaUIsRUFBRSxVQUFnQixFQUFFLElBQVU7UUFFN0YsSUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBUyxJQUFJLENBQUMsSUFBSSxnQkFBVyxJQUFJLENBQUMsTUFBTSxPQUFJLENBQUMsQ0FBQztRQUM1RixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCwyQ0FBWSxHQUFaLFVBQWEsa0JBQWdDLEVBQUUsV0FBaUIsRUFBRSxVQUFnQixFQUFFLElBQVU7UUFFNUYsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFLLENBQUM7WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCwyQ0FBWSxHQUFaLFVBQ0ksa0JBQWdDLEVBQUUsV0FBaUIsRUFBRSxVQUFnQixFQUFFLElBQVUsRUFDakYsU0FBYyxFQUFFLFNBQWM7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUM7WUFDNUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvRSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUssQ0FBQztZQUNSLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQztJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUEvREQsSUErREM7QUFFRCxvRUFBb0U7QUFDcEUsc0JBQXNCO0FBQ3JCLElBQVksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEEgYFRhc2tUcmFja2luZ1pvbmVTcGVjYCBhbGxvd3Mgb25lIHRvIHRyYWNrIGFsbCBvdXRzdGFuZGluZyBUYXNrcy5cbiAqXG4gKiBUaGlzIGlzIHVzZWZ1bCBpbiB0ZXN0cy4gRm9yIGV4YW1wbGUgdG8gc2VlIHdoaWNoIHRhc2tzIGFyZSBwcmV2ZW50aW5nIGEgdGVzdCBmcm9tIGNvbXBsZXRpbmdcbiAqIG9yIGFuIGF1dG9tYXRlZCB3YXkgb2YgcmVsZWFzaW5nIGFsbCBvZiB0aGUgZXZlbnQgbGlzdGVuZXJzIGF0IHRoZSBlbmQgb2YgdGhlIHRlc3QuXG4gKi9cbmNsYXNzIFRhc2tUcmFja2luZ1pvbmVTcGVjIGltcGxlbWVudHMgWm9uZVNwZWMge1xuICBuYW1lID0gJ1Rhc2tUcmFja2luZ1pvbmUnO1xuICBtaWNyb1Rhc2tzOiBUYXNrW10gPSBbXTtcbiAgbWFjcm9UYXNrczogVGFza1tdID0gW107XG4gIGV2ZW50VGFza3M6IFRhc2tbXSA9IFtdO1xuICBwcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHsnVGFza1RyYWNraW5nWm9uZSc6IHRoaXN9O1xuXG4gIHN0YXRpYyBnZXQoKSB7XG4gICAgcmV0dXJuIFpvbmUuY3VycmVudC5nZXQoJ1Rhc2tUcmFja2luZ1pvbmUnKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGFza3NGb3IodHlwZTogc3RyaW5nKTogVGFza1tdIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ21pY3JvVGFzayc6XG4gICAgICAgIHJldHVybiB0aGlzLm1pY3JvVGFza3M7XG4gICAgICBjYXNlICdtYWNyb1Rhc2snOlxuICAgICAgICByZXR1cm4gdGhpcy5tYWNyb1Rhc2tzO1xuICAgICAgY2FzZSAnZXZlbnRUYXNrJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRUYXNrcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHRhc2sgZm9ybWF0OiAnICsgdHlwZSk7XG4gIH1cblxuICBvblNjaGVkdWxlVGFzayhwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsIHRhc2s6IFRhc2spOlxuICAgICAgVGFzayB7XG4gICAgKHRhc2sgYXMgYW55KVsnY3JlYXRpb25Mb2NhdGlvbiddID0gbmV3IEVycm9yKGBUYXNrICcke3Rhc2sudHlwZX0nIGZyb20gJyR7dGFzay5zb3VyY2V9Jy5gKTtcbiAgICBjb25zdCB0YXNrcyA9IHRoaXMuZ2V0VGFza3NGb3IodGFzay50eXBlKTtcbiAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgIHJldHVybiBwYXJlbnRab25lRGVsZWdhdGUuc2NoZWR1bGVUYXNrKHRhcmdldFpvbmUsIHRhc2spO1xuICB9XG5cbiAgb25DYW5jZWxUYXNrKHBhcmVudFpvbmVEZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZTogWm9uZSwgdGFyZ2V0Wm9uZTogWm9uZSwgdGFzazogVGFzayk6XG4gICAgICBhbnkge1xuICAgIGNvbnN0IHRhc2tzID0gdGhpcy5nZXRUYXNrc0Zvcih0YXNrLnR5cGUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0YXNrc1tpXSA9PSB0YXNrKSB7XG4gICAgICAgIHRhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRab25lRGVsZWdhdGUuY2FuY2VsVGFzayh0YXJnZXRab25lLCB0YXNrKTtcbiAgfVxuXG4gIG9uSW52b2tlVGFzayhcbiAgICAgIHBhcmVudFpvbmVEZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZTogWm9uZSwgdGFyZ2V0Wm9uZTogWm9uZSwgdGFzazogVGFzayxcbiAgICAgIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueSk6IGFueSB7XG4gICAgaWYgKHRhc2sudHlwZSA9PT0gJ2V2ZW50VGFzaycpXG4gICAgICByZXR1cm4gcGFyZW50Wm9uZURlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0Wm9uZSwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpO1xuICAgIGNvbnN0IHRhc2tzID0gdGhpcy5nZXRUYXNrc0Zvcih0YXNrLnR5cGUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0YXNrc1tpXSA9PSB0YXNrKSB7XG4gICAgICAgIHRhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRab25lRGVsZWdhdGUuaW52b2tlVGFzayh0YXJnZXRab25lLCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gIH1cblxuICBjbGVhckV2ZW50cygpIHtcbiAgICB3aGlsZSAodGhpcy5ldmVudFRhc2tzLmxlbmd0aCkge1xuICAgICAgWm9uZS5jdXJyZW50LmNhbmNlbFRhc2sodGhpcy5ldmVudFRhc2tzWzBdKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRXhwb3J0IHRoZSBjbGFzcyBzbyB0aGF0IG5ldyBpbnN0YW5jZXMgY2FuIGJlIGNyZWF0ZWQgd2l0aCBwcm9wZXJcbi8vIGNvbnN0cnVjdG9yIHBhcmFtcy5cbihab25lIGFzIGFueSlbJ1Rhc2tUcmFja2luZ1pvbmVTcGVjJ10gPSBUYXNrVHJhY2tpbmdab25lU3BlYztcbiJdfQ==