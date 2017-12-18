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
        // this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjdGl2aXR5LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBMEU7QUFHMUU7SUFBdUIsNEJBQW9CO0lBQTNDOztJQThDQSxDQUFDO0lBekNhLDJCQUFRLEdBQWxCLFVBQW1CLGtCQUFxQztRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQiw0QkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxpQkFBTSxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRVMsc0NBQW1CLEdBQTdCLFVBQThCLFFBQTJCO1FBQ3JELGtGQUFrRjtJQUN0RixDQUFDO0lBRVMsMEJBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsaUJBQU0sT0FBTyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBRVMseUJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsaUJBQU0sTUFBTSxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFUyw4QkFBVyxHQUFyQixVQUFzQixNQUE4QjtRQUNoRCxpQkFBTSxXQUFXLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVTLDRCQUFTLEdBQW5CO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxpQkFBTSxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sZ0NBQWEsR0FBcEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGlCQUFNLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUE3Q0MsUUFBUTtRQURiLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztPQUM5QixRQUFRLENBOENiO0lBQUQsZUFBQztDQUFBLEFBOUNELENBQXVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQThDMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXRBY3Rpdml0eUNhbGxiYWNrcywgQW5kcm9pZEFjdGl2aXR5Q2FsbGJhY2tzIH0gZnJvbSBcInVpL2ZyYW1lXCI7XG5cbkBKYXZhUHJveHkoXCJvcmcubXlBcHAuTWFpbkFjdGl2aXR5XCIpXG5jbGFzcyBBY3Rpdml0eSBleHRlbmRzIGFuZHJvaWQuYXBwLkFjdGl2aXR5IHtcbiAgICBwcml2YXRlIF9jYWxsYmFja3M6IEFuZHJvaWRBY3Rpdml0eUNhbGxiYWNrcztcbiAgICBwcml2YXRlIF9wdHRQcmVzc2VkOiBib29sZWFuO1xuICAgIHByaXZhdGUgZmlyc3RTdGFydDogYm9vbGVhbjtcblxuICAgIHByb3RlY3RlZCBvbkNyZWF0ZShzYXZlZEluc3RhbmNlU3RhdGU6IGFuZHJvaWQub3MuQnVuZGxlKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpbiBBY3Rpdml0eSBPTiBDUkVBVEVcIik7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBzZXRBY3Rpdml0eUNhbGxiYWNrcyh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5BY3Rpdml0eSBIRUxMTyBXT1JMRFwiKTtcblxuICAgICAgICB0aGlzLl9wdHRQcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmlyc3RTdGFydCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uQ3JlYXRlKHRoaXMsIHNhdmVkSW5zdGFuY2VTdGF0ZSwgc3VwZXIub25DcmVhdGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNhdmVJbnN0YW5jZVN0YXRlKG91dFN0YXRlOiBhbmRyb2lkLm9zLkJ1bmRsZSk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLl9jYWxsYmFja3Mub25TYXZlSW5zdGFuY2VTdGF0ZSh0aGlzLCBvdXRTdGF0ZSwgc3VwZXIub25TYXZlSW5zdGFuY2VTdGF0ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vblN0YXJ0KHRoaXMsIHN1cGVyLm9uU3RhcnQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5BY3Rpdml0eSAtIE9uU3RhcnQgZmlyc3RTdGFydDogKCVzKSBfcHR0UHJlc3NlZCAlc1wiLCB0aGlzLmZpcnN0U3RhcnQsIHRoaXMuX3B0dFByZXNzZWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblN0b3AoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vblN0b3AodGhpcywgc3VwZXIub25TdG9wKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluQWN0aXZpdHkgLSBPblN0b3BcIik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTmV3SW50ZW50KGludGVudDogYW5kcm9pZC5jb250ZW50LkludGVudCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbk5ld0ludGVudChpbnRlbnQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5BY3Rpdml0eSAtIG9uTmV3SW50ZW50OiBJbnRlbnQgKCVzKSwgRXh0cmFzICglcylcIiwgaW50ZW50LCBpbnRlbnQuZ2V0RXh0cmFzKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpbkFjdGl2aXR5IC0gb25EZXN0cm95XCIpO1xuICAgICAgICB0aGlzLl9jYWxsYmFja3Mub25EZXN0cm95KHRoaXMsIHN1cGVyLm9uRGVzdHJveSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQmFja1ByZXNzZWQoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpbkFjdGl2aXR5IC0gb25CYWNrUHJlc3NlZFwiKTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uQmFja1ByZXNzZWQodGhpcywgc3VwZXIub25CYWNrUHJlc3NlZCk7XG4gICAgfVxufSJdfQ==