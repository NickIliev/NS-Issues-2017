/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SyncTestZoneSpec = (function () {
    function SyncTestZoneSpec(namePrefix) {
        this.runZone = Zone.current;
        this.name = 'syncTestZone for ' + namePrefix;
    }
    SyncTestZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
        switch (task.type) {
            case 'microTask':
            case 'macroTask':
                throw new Error("Cannot call " + task.source + " from within a sync test.");
            case 'eventTask':
                task = delegate.scheduleTask(target, task);
                break;
        }
        return task;
    };
    return SyncTestZoneSpec;
}());
// Export the class so that new instances can be created with proper
// constructor params.
Zone['SyncTestZoneSpec'] = SyncTestZoneSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3luYy10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIO0lBR0UsMEJBQVksVUFBa0I7UUFGOUIsWUFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFHckIsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7SUFDL0MsQ0FBQztJQU1ELHlDQUFjLEdBQWQsVUFBZSxRQUFzQixFQUFFLE9BQWEsRUFBRSxNQUFZLEVBQUUsSUFBVTtRQUM1RSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLFdBQVcsQ0FBQztZQUNqQixLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBZSxJQUFJLENBQUMsTUFBTSw4QkFBMkIsQ0FBQyxDQUFDO1lBQ3pFLEtBQUssV0FBVztnQkFDZCxJQUFJLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLEtBQUssQ0FBQztRQUNWLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQUVELG9FQUFvRTtBQUNwRSxzQkFBc0I7QUFDckIsSUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmNsYXNzIFN5bmNUZXN0Wm9uZVNwZWMgaW1wbGVtZW50cyBab25lU3BlYyB7XG4gIHJ1blpvbmUgPSBab25lLmN1cnJlbnQ7XG5cbiAgY29uc3RydWN0b3IobmFtZVByZWZpeDogc3RyaW5nKSB7XG4gICAgdGhpcy5uYW1lID0gJ3N5bmNUZXN0Wm9uZSBmb3IgJyArIG5hbWVQcmVmaXg7XG4gIH1cblxuICAvLyBab25lU3BlYyBpbXBsZW1lbnRhdGlvbiBiZWxvdy5cblxuICBuYW1lOiBzdHJpbmc7XG5cbiAgb25TY2hlZHVsZVRhc2soZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCB0YXNrOiBUYXNrKTogVGFzayB7XG4gICAgc3dpdGNoICh0YXNrLnR5cGUpIHtcbiAgICAgIGNhc2UgJ21pY3JvVGFzayc6XG4gICAgICBjYXNlICdtYWNyb1Rhc2snOlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBjYWxsICR7dGFzay5zb3VyY2V9IGZyb20gd2l0aGluIGEgc3luYyB0ZXN0LmApO1xuICAgICAgY2FzZSAnZXZlbnRUYXNrJzpcbiAgICAgICAgdGFzayA9IGRlbGVnYXRlLnNjaGVkdWxlVGFzayh0YXJnZXQsIHRhc2spO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRhc2s7XG4gIH1cbn1cblxuLy8gRXhwb3J0IHRoZSBjbGFzcyBzbyB0aGF0IG5ldyBpbnN0YW5jZXMgY2FuIGJlIGNyZWF0ZWQgd2l0aCBwcm9wZXJcbi8vIGNvbnN0cnVjdG9yIHBhcmFtcy5cbihab25lIGFzIGFueSlbJ1N5bmNUZXN0Wm9uZVNwZWMnXSA9IFN5bmNUZXN0Wm9uZVNwZWM7XG4iXX0=