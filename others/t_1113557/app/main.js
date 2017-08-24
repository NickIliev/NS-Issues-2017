"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
var platform_2 = require("platform");
var application = require("application");
if (platform_2.isIOS) {
    var AppDelegate = (function (_super) {
        __extends(AppDelegate, _super);
        function AppDelegate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppDelegate.prototype.applicationDidEnterBackground = function (app) {
            var _this = this;
            console.log("applicaiton is in background");
            this.bgTask = app.beginBackgroundTaskWithNameExpirationHandler("My Task", function () {
                _this.endBackgroundTask();
            });
            this.timerCounter = 10;
            this.timer = NSTimer.scheduledTimerWithTimeIntervalTargetSelectorUserInfoRepeats(2, this, "runOnBackground", null, true);
        };
        AppDelegate.prototype.endBackgroundTask = function () {
            if (this.timer) {
                this.timer.invalidate();
                this.timer = null;
            }
            this.timerCounter = 10;
            UIApplication.sharedApplication().endBackgroundTask(this.bgTask);
            this.bgTask = UIBackgroundTaskInvalid;
        };
        AppDelegate.prototype.runOnBackground = function () {
            if (this.timerCounter == 10) {
                console.log("this code will be executed on the 10th tick"); // execute this code after 5 minutes or as your logic requires
                return;
            }
            console.log(this.timerCounter);
            this.timerCounter--;
        };
        return AppDelegate;
    }(NSObject));
    AppDelegate.ObjCProtocols = [UIApplicationDelegate];
    AppDelegate.ObjCExposedMethods = {
        "runOnBackground": { returns: interop.types.void }
    };
    application.ios.delegate = AppDelegate;
}
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBRTVFLDJDQUF5QztBQUV6QyxxQ0FBaUM7QUFDakMseUNBQTJDO0FBRTNDLEVBQUUsQ0FBQSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ1A7UUFBMEIsK0JBQVE7UUFBbEM7O1FBMENBLENBQUM7UUEvQkcsbURBQTZCLEdBQTdCLFVBQThCLEdBQWtCO1lBQWhELGlCQVNDO1lBUkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBRTVDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLFNBQVMsRUFBRTtnQkFDdEUsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQywyREFBMkQsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3SCxDQUFDO1FBRU8sdUNBQWlCLEdBQXpCO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQztZQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLGFBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsTUFBTSxHQUFHLHVCQUF1QixDQUFDO1FBQzFDLENBQUM7UUFFRCxxQ0FBZSxHQUFmO1lBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUMsQ0FBQyw4REFBOEQ7Z0JBQzFILE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQTFDRCxDQUEwQixRQUFRO0lBQ3ZCLHlCQUFhLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRXhDLDhCQUFrQixHQUFHO1FBQ3hCLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO0tBQ3JELENBQUM7SUF1Q04sV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0FBQzNDLENBQUM7QUFHRCxzQ0FBMkIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxzQkFBUyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGlzIGltcG9ydCBzaG91bGQgYmUgZmlyc3QgaW4gb3JkZXIgdG8gbG9hZCBzb21lIHJlcXVpcmVkIHNldHRpbmdzIChsaWtlIGdsb2JhbHMgYW5kIHJlZmxlY3QtbWV0YWRhdGEpXG5pbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcblxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSBcIi4vYXBwLm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbmlmKGlzSU9TKSB7XG4gICAgY2xhc3MgQXBwRGVsZWdhdGUgZXh0ZW5kcyBOU09iamVjdCBpbXBsZW1lbnRzIFVJQXBwbGljYXRpb25EZWxlZ2F0ZSB7XG4gICAgICAgIHN0YXRpYyBPYmpDUHJvdG9jb2xzID0gW1VJQXBwbGljYXRpb25EZWxlZ2F0ZV07XG5cbiAgICAgICAgc3RhdGljIE9iakNFeHBvc2VkTWV0aG9kcyA9IHtcbiAgICAgICAgICAgIFwicnVuT25CYWNrZ3JvdW5kXCI6IHsgcmV0dXJuczogaW50ZXJvcC50eXBlcy52b2lkIH1cbiAgICAgICAgfTtcblxuICAgICAgICBwcml2YXRlIHRpbWVyO1xuICAgICAgICBwcml2YXRlIHRpbWVyQ291bnRlcjtcbiAgICAgICAgcHJpdmF0ZSBiZ1Rhc2s7XG5cbiAgICAgICAgYXBwbGljYXRpb25EaWRFbnRlckJhY2tncm91bmQoYXBwOiBVSUFwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFwcGxpY2FpdG9uIGlzIGluIGJhY2tncm91bmRcIik7XG5cbiAgICAgICAgICAgIHRoaXMuYmdUYXNrID0gYXBwLmJlZ2luQmFja2dyb3VuZFRhc2tXaXRoTmFtZUV4cGlyYXRpb25IYW5kbGVyKFwiTXkgVGFza1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRCYWNrZ3JvdW5kVGFzaygpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy50aW1lckNvdW50ZXIgPSAxMDtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBOU1RpbWVyLnNjaGVkdWxlZFRpbWVyV2l0aFRpbWVJbnRlcnZhbFRhcmdldFNlbGVjdG9yVXNlckluZm9SZXBlYXRzKDIsIHRoaXMsIFwicnVuT25CYWNrZ3JvdW5kXCIsIG51bGwsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBlbmRCYWNrZ3JvdW5kVGFzaygpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lci5pbnZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGltZXJDb3VudGVyID0gMTA7XG4gICAgICAgICAgICAoPGFueT5VSUFwcGxpY2F0aW9uKS5zaGFyZWRBcHBsaWNhdGlvbigpLmVuZEJhY2tncm91bmRUYXNrKHRoaXMuYmdUYXNrKTtcbiAgICAgICAgICAgIHRoaXMuYmdUYXNrID0gVUlCYWNrZ3JvdW5kVGFza0ludmFsaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBydW5PbkJhY2tncm91bmQoKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLnRpbWVyQ291bnRlciA9PSAxMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBjb2RlIHdpbGwgYmUgZXhlY3V0ZWQgb24gdGhlIDEwdGggdGlja1wiKTsgLy8gZXhlY3V0ZSB0aGlzIGNvZGUgYWZ0ZXIgNSBtaW51dGVzIG9yIGFzIHlvdXIgbG9naWMgcmVxdWlyZXNcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGltZXJDb3VudGVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZXJDb3VudGVyLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBsaWNhdGlvbi5pb3MuZGVsZWdhdGUgPSBBcHBEZWxlZ2F0ZTtcbn1cblxuXG5wbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTtcbiJdfQ==