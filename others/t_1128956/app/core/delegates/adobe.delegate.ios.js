"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_adobe_analytics_1 = require("nativescript-adobe-analytics");
var FRESH_LAUNCH = true;
var AdobeDemoAppDelegate = (function (_super) {
    __extends(AdobeDemoAppDelegate, _super);
    function AdobeDemoAppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdobeDemoAppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        nativescript_adobe_analytics_1.AdobeAnalytics.configure({ name: 'Mohammad testing' }, true);
        return true;
    };
    AdobeDemoAppDelegate.prototype.applicationDidBecomeActive = function (application) {
        if (FRESH_LAUNCH) {
            console.log("FRESH_LAUNCH");
            FRESH_LAUNCH = false;
        }
    };
    return AdobeDemoAppDelegate;
}(UIResponder));
AdobeDemoAppDelegate.ObjCProtocols = [UIApplicationDelegate];
exports.AdobeDemoAppDelegate = AdobeDemoAppDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvYmUuZGVsZWdhdGUuaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRvYmUuZGVsZWdhdGUuaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkVBQThEO0FBRTlELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztBQUV4QjtJQUEwQyx3Q0FBVztJQUFyRDs7SUFlQSxDQUFDO0lBWlUsdUVBQXdDLEdBQS9DLFVBQWdELFdBQVcsRUFBRSxhQUFhO1FBQ3RFLDZDQUFjLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0seURBQTBCLEdBQWpDLFVBQWtDLFdBQVc7UUFDekMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFNUIsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQWZELENBQTBDLFdBQVc7QUFDbkMsa0NBQWEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFEN0Msb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tICduYXRpdmVzY3JpcHQtYWRvYmUtYW5hbHl0aWNzJztcclxuXHJcbmxldCBGUkVTSF9MQVVOQ0ggPSB0cnVlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFkb2JlRGVtb0FwcERlbGVnYXRlIGV4dGVuZHMgVUlSZXNwb25kZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBPYmpDUHJvdG9jb2xzID0gW1VJQXBwbGljYXRpb25EZWxlZ2F0ZV07XHJcblxyXG4gICAgcHVibGljIGFwcGxpY2F0aW9uRGlkRmluaXNoTGF1bmNoaW5nV2l0aE9wdGlvbnMoYXBwbGljYXRpb24sIGxhdW5jaE9wdGlvbnMpOiBib29sZWFuIHtcclxuICAgICAgICBBZG9iZUFuYWx5dGljcy5jb25maWd1cmUoe25hbWU6ICdNb2hhbW1hZCB0ZXN0aW5nJ30sIHRydWUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhcHBsaWNhdGlvbkRpZEJlY29tZUFjdGl2ZShhcHBsaWNhdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChGUkVTSF9MQVVOQ0gpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEZSRVNIX0xBVU5DSGApO1xyXG5cclxuICAgICAgICAgICAgRlJFU0hfTEFVTkNIID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19