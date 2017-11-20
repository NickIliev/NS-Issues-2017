"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity.prototype.onCreate = function (savedInstanceState) {
        console.log("Main Activity ON CREATE");
        if (!this._callbacks) {
            frame_1.setActivityCallbacks(this);
        }
        console.log("MainActivity HELLO WORLD");
        this._pttPressed = false;
        this.firstStart = true;
        this._callbacks.onCreate(this, savedInstanceState, _super.prototype.onCreate);
    };
    Activity.prototype.onSaveInstanceState = function (outState) {
        this._callbacks.onSaveInstanceState(this, outState, _super.prototype.onSaveInstanceState);
    };
    Activity.prototype.onStart = function () {
        this._callbacks.onStart(this, _super.prototype.onStart);
        console.log("MainActivity - OnStart firstStart: (%s) _pttPressed %s", this.firstStart, this._pttPressed);
    };
    Activity.prototype.onStop = function () {
        this._callbacks.onStop(this, _super.prototype.onStop);
        console.log("MainActivity - OnStop");
    };
    Activity.prototype.onNewIntent = function (intent) {
        _super.prototype.onNewIntent.call(this, intent);
        console.log("MainActivity - onNewIntent: Intent (%s), Extras (%s)", intent, intent.getExtras());
    };
    Activity.prototype.onDestroy = function () {
        console.log("MainActivity - onDestroy");
        this._callbacks.onDestroy(this, _super.prototype.onDestroy);
    };
    Activity.prototype.onBackPressed = function () {
        console.log("MainActivity - onBackPressed");
        this._callbacks.onBackPressed(this, _super.prototype.onBackPressed);
    };
    Activity = __decorate([
        JavaProxy("org.myApp.MainActivity")
    ], Activity);
    return Activity;
}(android.app.Activity));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjdGl2aXR5LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBMEU7QUFHMUU7SUFBdUIsNEJBQW9CO0lBQTNDOztJQThDQSxDQUFDO0lBekNhLDJCQUFRLEdBQWxCLFVBQW1CLGtCQUFxQztRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQiw0QkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxpQkFBTSxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRVMsc0NBQW1CLEdBQTdCLFVBQThCLFFBQTJCO1FBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxpQkFBTSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFUywwQkFBTyxHQUFqQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBTSxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFFUyx5QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxpQkFBTSxNQUFNLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVTLDhCQUFXLEdBQXJCLFVBQXNCLE1BQThCO1FBQ2hELGlCQUFNLFdBQVcsWUFBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLHNEQUFzRCxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRVMsNEJBQVMsR0FBbkI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFNLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxnQ0FBYSxHQUFwQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsaUJBQU0sYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQTdDQyxRQUFRO1FBRGIsU0FBUyxDQUFDLHdCQUF3QixDQUFDO09BQzlCLFFBQVEsQ0E4Q2I7SUFBRCxlQUFDO0NBQUEsQUE5Q0QsQ0FBdUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBOEMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldEFjdGl2aXR5Q2FsbGJhY2tzLCBBbmRyb2lkQWN0aXZpdHlDYWxsYmFja3MgfSBmcm9tIFwidWkvZnJhbWVcIjtcblxuQEphdmFQcm94eShcIm9yZy5teUFwcC5NYWluQWN0aXZpdHlcIilcbmNsYXNzIEFjdGl2aXR5IGV4dGVuZHMgYW5kcm9pZC5hcHAuQWN0aXZpdHkge1xuICAgIHByaXZhdGUgX2NhbGxiYWNrczogQW5kcm9pZEFjdGl2aXR5Q2FsbGJhY2tzO1xuICAgIHByaXZhdGUgX3B0dFByZXNzZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBmaXJzdFN0YXJ0OiBib29sZWFuO1xuXG4gICAgcHJvdGVjdGVkIG9uQ3JlYXRlKHNhdmVkSW5zdGFuY2VTdGF0ZTogYW5kcm9pZC5vcy5CdW5kbGUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluIEFjdGl2aXR5IE9OIENSRUFURVwiKTtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHNldEFjdGl2aXR5Q2FsbGJhY2tzKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpbkFjdGl2aXR5IEhFTExPIFdPUkxEXCIpO1xuXG4gICAgICAgIHRoaXMuX3B0dFByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5maXJzdFN0YXJ0ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9jYWxsYmFja3Mub25DcmVhdGUodGhpcywgc2F2ZWRJbnN0YW5jZVN0YXRlLCBzdXBlci5vbkNyZWF0ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2F2ZUluc3RhbmNlU3RhdGUob3V0U3RhdGU6IGFuZHJvaWQub3MuQnVuZGxlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vblNhdmVJbnN0YW5jZVN0YXRlKHRoaXMsIG91dFN0YXRlLCBzdXBlci5vblNhdmVJbnN0YW5jZVN0YXRlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uU3RhcnQodGhpcywgc3VwZXIub25TdGFydCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpbkFjdGl2aXR5IC0gT25TdGFydCBmaXJzdFN0YXJ0OiAoJXMpIF9wdHRQcmVzc2VkICVzXCIsIHRoaXMuZmlyc3RTdGFydCwgdGhpcy5fcHR0UHJlc3NlZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3RvcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uU3RvcCh0aGlzLCBzdXBlci5vblN0b3ApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5BY3Rpdml0eSAtIE9uU3RvcFwiKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25OZXdJbnRlbnQoaW50ZW50OiBhbmRyb2lkLmNvbnRlbnQuSW50ZW50KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uTmV3SW50ZW50KGludGVudCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpbkFjdGl2aXR5IC0gb25OZXdJbnRlbnQ6IEludGVudCAoJXMpLCBFeHRyYXMgKCVzKVwiLCBpbnRlbnQsIGludGVudC5nZXRFeHRyYXMoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluQWN0aXZpdHkgLSBvbkRlc3Ryb3lcIik7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vbkRlc3Ryb3kodGhpcywgc3VwZXIub25EZXN0cm95KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25CYWNrUHJlc3NlZCgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluQWN0aXZpdHkgLSBvbkJhY2tQcmVzc2VkXCIpO1xuICAgICAgICB0aGlzLl9jYWxsYmFja3Mub25CYWNrUHJlc3NlZCh0aGlzLCBzdXBlci5vbkJhY2tQcmVzc2VkKTtcbiAgICB9XG59Il19