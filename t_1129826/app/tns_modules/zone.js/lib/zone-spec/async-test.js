/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AsyncTestZoneSpec = (function () {
    function AsyncTestZoneSpec(finishCallback, failCallback, namePrefix) {
        this._pendingMicroTasks = false;
        this._pendingMacroTasks = false;
        this._alreadyErrored = false;
        this.runZone = Zone.current;
        this._finishCallback = finishCallback;
        this._failCallback = failCallback;
        this.name = 'asyncTestZone for ' + namePrefix;
    }
    AsyncTestZoneSpec.prototype._finishCallbackIfDone = function () {
        var _this = this;
        if (!(this._pendingMicroTasks || this._pendingMacroTasks)) {
            // We do this because we would like to catch unhandled rejected promises.
            this.runZone.run(function () {
                setTimeout(function () {
                    if (!_this._alreadyErrored && !(_this._pendingMicroTasks || _this._pendingMacroTasks)) {
                        _this._finishCallback();
                    }
                }, 0);
            });
        }
    };
    // Note - we need to use onInvoke at the moment to call finish when a test is
    // fully synchronous. TODO(juliemr): remove this when the logic for
    // onHasTask changes and it calls whenever the task queues are dirty.
    AsyncTestZoneSpec.prototype.onInvoke = function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
        try {
            return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
        }
        finally {
            this._finishCallbackIfDone();
        }
    };
    AsyncTestZoneSpec.prototype.onHandleError = function (parentZoneDelegate, currentZone, targetZone, error) {
        // Let the parent try to handle the error.
        var result = parentZoneDelegate.handleError(targetZone, error);
        if (result) {
            this._failCallback(error);
            this._alreadyErrored = true;
        }
        return false;
    };
    AsyncTestZoneSpec.prototype.onHasTask = function (delegate, current, target, hasTaskState) {
        delegate.hasTask(target, hasTaskState);
        if (hasTaskState.change == 'microTask') {
            this._pendingMicroTasks = hasTaskState.microTask;
            this._finishCallbackIfDone();
        }
        else if (hasTaskState.change == 'macroTask') {
            this._pendingMacroTasks = hasTaskState.macroTask;
            this._finishCallbackIfDone();
        }
    };
    return AsyncTestZoneSpec;
}());
// Export the class so that new instances can be created with proper
// constructor params.
Zone['AsyncTestZoneSpec'] = AsyncTestZoneSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzeW5jLXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7SUFRRSwyQkFBWSxjQUF3QixFQUFFLFlBQXNCLEVBQUUsVUFBa0I7UUFMaEYsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxZQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUdyQixJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixHQUFHLFVBQVUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsaURBQXFCLEdBQXJCO1FBQUEsaUJBV0M7UUFWQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCx5RUFBeUU7WUFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsVUFBVSxDQUFDO29CQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsS0FBSSxDQUFDLGtCQUFrQixJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkYsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN6QixDQUFDO2dCQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFNRCw2RUFBNkU7SUFDN0UsbUVBQW1FO0lBQ25FLHFFQUFxRTtJQUNyRSxvQ0FBUSxHQUFSLFVBQ0ksa0JBQWdDLEVBQUUsV0FBaUIsRUFBRSxVQUFnQixFQUFFLFFBQWtCLEVBQ3pGLFNBQWMsRUFBRSxTQUFnQixFQUFFLE1BQWM7UUFDbEQsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkYsQ0FBQztnQkFBUyxDQUFDO1lBQ1QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsa0JBQWdDLEVBQUUsV0FBaUIsRUFBRSxVQUFnQixFQUFFLEtBQVU7UUFFN0YsMENBQTBDO1FBQzFDLElBQU0sTUFBTSxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQscUNBQVMsR0FBVCxVQUFVLFFBQXNCLEVBQUUsT0FBYSxFQUFFLE1BQVksRUFBRSxZQUEwQjtRQUN2RixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDakQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDakQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFqRUQsSUFpRUM7QUFFRCxvRUFBb0U7QUFDcEUsc0JBQXNCO0FBQ3JCLElBQVksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jbGFzcyBBc3luY1Rlc3Rab25lU3BlYyBpbXBsZW1lbnRzIFpvbmVTcGVjIHtcbiAgX2ZpbmlzaENhbGxiYWNrOiBGdW5jdGlvbjtcbiAgX2ZhaWxDYWxsYmFjazogRnVuY3Rpb247XG4gIF9wZW5kaW5nTWljcm9UYXNrczogYm9vbGVhbiA9IGZhbHNlO1xuICBfcGVuZGluZ01hY3JvVGFza3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2FscmVhZHlFcnJvcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIHJ1blpvbmUgPSBab25lLmN1cnJlbnQ7XG5cbiAgY29uc3RydWN0b3IoZmluaXNoQ2FsbGJhY2s6IEZ1bmN0aW9uLCBmYWlsQ2FsbGJhY2s6IEZ1bmN0aW9uLCBuYW1lUHJlZml4OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maW5pc2hDYWxsYmFjayA9IGZpbmlzaENhbGxiYWNrO1xuICAgIHRoaXMuX2ZhaWxDYWxsYmFjayA9IGZhaWxDYWxsYmFjaztcbiAgICB0aGlzLm5hbWUgPSAnYXN5bmNUZXN0Wm9uZSBmb3IgJyArIG5hbWVQcmVmaXg7XG4gIH1cblxuICBfZmluaXNoQ2FsbGJhY2tJZkRvbmUoKSB7XG4gICAgaWYgKCEodGhpcy5fcGVuZGluZ01pY3JvVGFza3MgfHwgdGhpcy5fcGVuZGluZ01hY3JvVGFza3MpKSB7XG4gICAgICAvLyBXZSBkbyB0aGlzIGJlY2F1c2Ugd2Ugd291bGQgbGlrZSB0byBjYXRjaCB1bmhhbmRsZWQgcmVqZWN0ZWQgcHJvbWlzZXMuXG4gICAgICB0aGlzLnJ1blpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hbHJlYWR5RXJyb3JlZCAmJiAhKHRoaXMuX3BlbmRpbmdNaWNyb1Rhc2tzIHx8IHRoaXMuX3BlbmRpbmdNYWNyb1Rhc2tzKSkge1xuICAgICAgICAgICAgdGhpcy5fZmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gWm9uZVNwZWMgaW1wbGVtZW50YXRpb24gYmVsb3cuXG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8vIE5vdGUgLSB3ZSBuZWVkIHRvIHVzZSBvbkludm9rZSBhdCB0aGUgbW9tZW50IHRvIGNhbGwgZmluaXNoIHdoZW4gYSB0ZXN0IGlzXG4gIC8vIGZ1bGx5IHN5bmNocm9ub3VzLiBUT0RPKGp1bGllbXIpOiByZW1vdmUgdGhpcyB3aGVuIHRoZSBsb2dpYyBmb3JcbiAgLy8gb25IYXNUYXNrIGNoYW5nZXMgYW5kIGl0IGNhbGxzIHdoZW5ldmVyIHRoZSB0YXNrIHF1ZXVlcyBhcmUgZGlydHkuXG4gIG9uSW52b2tlKFxuICAgICAgcGFyZW50Wm9uZURlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLCBkZWxlZ2F0ZTogRnVuY3Rpb24sXG4gICAgICBhcHBseVRoaXM6IGFueSwgYXBwbHlBcmdzOiBhbnlbXSwgc291cmNlOiBzdHJpbmcpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gcGFyZW50Wm9uZURlbGVnYXRlLmludm9rZSh0YXJnZXRab25lLCBkZWxlZ2F0ZSwgYXBwbHlUaGlzLCBhcHBseUFyZ3MsIHNvdXJjZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX2ZpbmlzaENhbGxiYWNrSWZEb25lKCk7XG4gICAgfVxuICB9XG5cbiAgb25IYW5kbGVFcnJvcihwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsIGVycm9yOiBhbnkpOlxuICAgICAgYm9vbGVhbiB7XG4gICAgLy8gTGV0IHRoZSBwYXJlbnQgdHJ5IHRvIGhhbmRsZSB0aGUgZXJyb3IuXG4gICAgY29uc3QgcmVzdWx0ID0gcGFyZW50Wm9uZURlbGVnYXRlLmhhbmRsZUVycm9yKHRhcmdldFpvbmUsIGVycm9yKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB0aGlzLl9mYWlsQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgdGhpcy5fYWxyZWFkeUVycm9yZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvbkhhc1Rhc2soZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBoYXNUYXNrU3RhdGU6IEhhc1Rhc2tTdGF0ZSkge1xuICAgIGRlbGVnYXRlLmhhc1Rhc2sodGFyZ2V0LCBoYXNUYXNrU3RhdGUpO1xuICAgIGlmIChoYXNUYXNrU3RhdGUuY2hhbmdlID09ICdtaWNyb1Rhc2snKSB7XG4gICAgICB0aGlzLl9wZW5kaW5nTWljcm9UYXNrcyA9IGhhc1Rhc2tTdGF0ZS5taWNyb1Rhc2s7XG4gICAgICB0aGlzLl9maW5pc2hDYWxsYmFja0lmRG9uZSgpO1xuICAgIH0gZWxzZSBpZiAoaGFzVGFza1N0YXRlLmNoYW5nZSA9PSAnbWFjcm9UYXNrJykge1xuICAgICAgdGhpcy5fcGVuZGluZ01hY3JvVGFza3MgPSBoYXNUYXNrU3RhdGUubWFjcm9UYXNrO1xuICAgICAgdGhpcy5fZmluaXNoQ2FsbGJhY2tJZkRvbmUoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRXhwb3J0IHRoZSBjbGFzcyBzbyB0aGF0IG5ldyBpbnN0YW5jZXMgY2FuIGJlIGNyZWF0ZWQgd2l0aCBwcm9wZXJcbi8vIGNvbnN0cnVjdG9yIHBhcmFtcy5cbihab25lIGFzIGFueSlbJ0FzeW5jVGVzdFpvbmVTcGVjJ10gPSBBc3luY1Rlc3Rab25lU3BlYztcbiJdfQ==