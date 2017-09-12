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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvYmUuZGVsZWdhdGUuaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRvYmUuZGVsZWdhdGUuaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkVBQThEO0FBRTlELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztBQUV4QjtJQUEwQyx3Q0FBVztJQUFyRDs7SUFlQSxDQUFDO0lBWlUsdUVBQXdDLEdBQS9DLFVBQWdELFdBQVcsRUFBRSxhQUFhO1FBQ3RFLDZDQUFjLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0seURBQTBCLEdBQWpDLFVBQWtDLFdBQVc7UUFDekMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFNUIsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQWZELENBQTBDLFdBQVc7QUFDbkMsa0NBQWEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFEN0Msb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tICduYXRpdmVzY3JpcHQtYWRvYmUtYW5hbHl0aWNzJztcblxubGV0IEZSRVNIX0xBVU5DSCA9IHRydWU7XG5cbmV4cG9ydCBjbGFzcyBBZG9iZURlbW9BcHBEZWxlZ2F0ZSBleHRlbmRzIFVJUmVzcG9uZGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIE9iakNQcm90b2NvbHMgPSBbVUlBcHBsaWNhdGlvbkRlbGVnYXRlXTtcblxuICAgIHB1YmxpYyBhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zKGFwcGxpY2F0aW9uLCBsYXVuY2hPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgICAgIEFkb2JlQW5hbHl0aWNzLmNvbmZpZ3VyZSh7bmFtZTogJ01vaGFtbWFkIHRlc3RpbmcnfSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBsaWNhdGlvbkRpZEJlY29tZUFjdGl2ZShhcHBsaWNhdGlvbik6IHZvaWQge1xuICAgICAgICBpZiAoRlJFU0hfTEFVTkNIKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRlJFU0hfTEFVTkNIYCk7XG5cbiAgICAgICAgICAgIEZSRVNIX0xBVU5DSCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==