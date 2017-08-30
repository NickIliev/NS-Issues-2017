"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity.prototype.onCreate = function (savedInstanceState) {
        if (!this._callbacks) {
            frame_1.setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, _super.prototype.onCreate);
    };
    Activity.prototype.onSaveInstanceState = function (outState) {
        this._callbacks.onSaveInstanceState(this, outState, _super.prototype.onSaveInstanceState);
    };
    Activity.prototype.onStart = function () {
        this._callbacks.onStart(this, _super.prototype.onStart);
    };
    Activity.prototype.onStop = function () {
        this._callbacks.onStop(this, _super.prototype.onStop);
    };
    Activity.prototype.onDestroy = function () {
        this._callbacks.onDestroy(this, _super.prototype.onDestroy);
    };
    Activity.prototype.onBackPressed = function () {
        this._callbacks.onBackPressed(this, _super.prototype.onBackPressed);
    };
    Activity.prototype.onRequestPermissionsResult = function (requestCode, permissions, grantResults) {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    };
    Activity.prototype.onActivityResult = function (requestCode, resultCode, data) {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, _super.prototype.onActivityResult);
    };
    Activity.prototype.dispatchKeyEvent = function (event) {
        // Which direction did the key move (up/down)
        var action = event.getAction();
        // What keywas pressed
        var keyCode = event.getKeyCode();
        switch (keyCode) {
            case android.view.KeyEvent.KEYCODE_VOLUME_UP:
                // Check your event code (KeyEvent.ACTION_DOWN, KeyEvent.ACTION_UP etc)
                console.log("KEYCODE_VOLUME_UP");
                return true;
            case android.view.KeyEvent.KEYCODE_VOLUME_DOWN:
                // Check your event code (KeyEvent.ACTION_DOWN, KeyEvent.ACTION_UP etc)
                console.log("KEYCODE_VOLUME_DOWN");
                return true;
            default:
                // Let the system do what it wanted to do
                return _super.prototype.dispatchKeyEvent.call(this, event);
        }
    };
    return Activity;
}(android.app.Activity));
Activity = __decorate([
    JavaProxy("org.myApp.MainActivity")
], Activity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjdGl2aXR5LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBd0U7QUFHeEUsSUFBTSxRQUFRO0lBQVMsNEJBQW9CO0lBQTNDOztJQTREQSxDQUFDO0lBekRhLDJCQUFRLEdBQWxCLFVBQW1CLGtCQUFxQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25CLDRCQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsaUJBQU0sUUFBUSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVTLHNDQUFtQixHQUE3QixVQUE4QixRQUEyQjtRQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsaUJBQU0sbUJBQW1CLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRVMsMEJBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsaUJBQU0sT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVTLHlCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGlCQUFNLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFUyw0QkFBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxpQkFBTSxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sZ0NBQWEsR0FBcEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsaUJBQU0sYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLDZDQUEwQixHQUFqQyxVQUFrQyxXQUFtQixFQUFFLFdBQTBCLEVBQUUsWUFBMkI7UUFDMUcsSUFBSSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDbkksQ0FBQztJQUVTLG1DQUFnQixHQUExQixVQUEyQixXQUFtQixFQUFFLFVBQWtCLEVBQUUsSUFBNEI7UUFDNUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsaUJBQU0sZ0JBQWdCLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU0sbUNBQWdCLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsNkNBQTZDO1FBQzdDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUvQixzQkFBc0I7UUFDdEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQjtnQkFDeEMsdUVBQXVFO2dCQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUI7Z0JBQ3RDLHVFQUF1RTtnQkFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCO2dCQUNJLHlDQUF5QztnQkFDekMsTUFBTSxDQUFDLGlCQUFNLGdCQUFnQixZQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUE1REQsQ0FBdUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBNEQxQztBQTVESyxRQUFRO0lBRGIsU0FBUyxDQUFDLHdCQUF3QixDQUFDO0dBQzlCLFFBQVEsQ0E0RGIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NldEFjdGl2aXR5Q2FsbGJhY2tzLCBBbmRyb2lkQWN0aXZpdHlDYWxsYmFja3N9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5cclxuQEphdmFQcm94eShcIm9yZy5teUFwcC5NYWluQWN0aXZpdHlcIilcclxuY2xhc3MgQWN0aXZpdHkgZXh0ZW5kcyBhbmRyb2lkLmFwcC5BY3Rpdml0eSB7XHJcbiAgICBwcml2YXRlIF9jYWxsYmFja3M6IEFuZHJvaWRBY3Rpdml0eUNhbGxiYWNrcztcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DcmVhdGUoc2F2ZWRJbnN0YW5jZVN0YXRlOiBhbmRyb2lkLm9zLkJ1bmRsZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIHNldEFjdGl2aXR5Q2FsbGJhY2tzKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uQ3JlYXRlKHRoaXMsIHNhdmVkSW5zdGFuY2VTdGF0ZSwgc3VwZXIub25DcmVhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblNhdmVJbnN0YW5jZVN0YXRlKG91dFN0YXRlOiBhbmRyb2lkLm9zLkJ1bmRsZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vblNhdmVJbnN0YW5jZVN0YXRlKHRoaXMsIG91dFN0YXRlLCBzdXBlci5vblNhdmVJbnN0YW5jZVN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3Mub25TdGFydCh0aGlzLCBzdXBlci5vblN0YXJ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vblN0b3AodGhpcywgc3VwZXIub25TdG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vbkRlc3Ryb3kodGhpcywgc3VwZXIub25EZXN0cm95KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25CYWNrUHJlc3NlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3Mub25CYWNrUHJlc3NlZCh0aGlzLCBzdXBlci5vbkJhY2tQcmVzc2VkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25SZXF1ZXN0UGVybWlzc2lvbnNSZXN1bHQocmVxdWVzdENvZGU6IG51bWJlciwgcGVybWlzc2lvbnM6IEFycmF5PFN0cmluZz4sIGdyYW50UmVzdWx0czogQXJyYXk8bnVtYmVyPik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5vblJlcXVlc3RQZXJtaXNzaW9uc1Jlc3VsdCh0aGlzLCByZXF1ZXN0Q29kZSwgcGVybWlzc2lvbnMsIGdyYW50UmVzdWx0cywgdW5kZWZpbmVkIC8qVE9ETzogRW5hYmxlIGlmIG5lZWRlZCovKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25BY3Rpdml0eVJlc3VsdChyZXF1ZXN0Q29kZTogbnVtYmVyLCByZXN1bHRDb2RlOiBudW1iZXIsIGRhdGE6IGFuZHJvaWQuY29udGVudC5JbnRlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3Mub25BY3Rpdml0eVJlc3VsdCh0aGlzLCByZXF1ZXN0Q29kZSwgcmVzdWx0Q29kZSwgZGF0YSwgc3VwZXIub25BY3Rpdml0eVJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3BhdGNoS2V5RXZlbnQoZXZlbnQpIHtcclxuICAgICAgICAvLyBXaGljaCBkaXJlY3Rpb24gZGlkIHRoZSBrZXkgbW92ZSAodXAvZG93bilcclxuICAgICAgICBsZXQgYWN0aW9uID0gZXZlbnQuZ2V0QWN0aW9uKCk7XHJcbiAgICBcclxuICAgICAgICAvLyBXaGF0IGtleXdhcyBwcmVzc2VkXHJcbiAgICAgICAgbGV0IGtleUNvZGUgPSBldmVudC5nZXRLZXlDb2RlKCk7XHJcbiAgICBcclxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBhbmRyb2lkLnZpZXcuS2V5RXZlbnQuS0VZQ09ERV9WT0xVTUVfVVA6XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB5b3VyIGV2ZW50IGNvZGUgKEtleUV2ZW50LkFDVElPTl9ET1dOLCBLZXlFdmVudC5BQ1RJT05fVVAgZXRjKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJLRVlDT0RFX1ZPTFVNRV9VUFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBjYXNlIGFuZHJvaWQudmlldy5LZXlFdmVudC5LRVlDT0RFX1ZPTFVNRV9ET1dOOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHlvdXIgZXZlbnQgY29kZSAoS2V5RXZlbnQuQUNUSU9OX0RPV04sIEtleUV2ZW50LkFDVElPTl9VUCBldGMpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIktFWUNPREVfVk9MVU1FX0RPV05cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vIExldCB0aGUgc3lzdGVtIGRvIHdoYXQgaXQgd2FudGVkIHRvIGRvXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZGlzcGF0Y2hLZXlFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19