"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("CardView", function () { return require("nativescript-cardview").CardView; });
element_registry_1.registerElement("CheckBox", function () { return require("nativescript-checkbox").CheckBox; });
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var nativescript_angular_1 = require("nativescript-angular");
var global_1 = require("./shared/global");
var router_2 = require("@angular/router");
var nativescript_testfairy_1 = require("nativescript-testfairy");
var color_1 = require("color");
var platform_1 = require("platform");
var nativescript_adobe_analytics_1 = require("nativescript-adobe-analytics");
require("rxjs/add/operator/filter");
var application = require("application");
var platform = require("tns-core-modules/platform");
var appSettings = require("application-settings");
var utils = require("utils/utils");
var frame = require("ui/frame");
var connectivity = require("connectivity");
var app = require("tns-core-modules/application");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: false,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    },
    ios: {}
};
var AppComponent = (function () {
    function AppComponent(routerExtensions, _globals, _router, _changeDetectionRef, 
        // public _analytics: AnalyticsService,
        page) {
        this.routerExtensions = routerExtensions;
        this._globals = _globals;
        this._router = _router;
        this._changeDetectionRef = _changeDetectionRef;
        this.page = page;
        this.iqKeyboardEnabled = true;
        this.iqKeyboardToolbarEnabled = true;
        this.keepKeyboardOpenOnTouchOutside = true;
        this.showHintInToolbar = true;
        this.keyboardAppearanceDark = false;
        this.toggleDoneButtonTextChanged = false;
        this.increaseKeyboardDistanceFromTextField = false;
        this.isExit = true;
        this.counter = 0;
        _router.events.subscribe(function (event) {
            if (event instanceof router_2.NavigationStart) {
                loader.show(options);
            }
            if (event instanceof router_1.NavigationEnd) {
                setTimeout(function () {
                    loader.hide();
                }, 500);
            }
        });
        var newColor = new color_1.Color("#1866a3");
        if (platform_1.isAndroid) {
            if (platform.device.sdkVersion >= "21") {
                var window = app.android.startActivity.getWindow();
                window.setStatusBarColor(newColor.android);
                nativescript_adobe_analytics_1.AdobeAnalytics.configure({ sample: 'Testing Android' }, true);
            }
        }
        else {
            var statusBarFrame = utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarFrame;
            var StatusBarView = UIView.alloc().initWithFrame(statusBarFrame);
            StatusBarView.autoresizingMask = (UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleBottomMargin);
            StatusBarView.autoresizesSubviews = true;
            frame.topmost().ios.controller.view.superview.addSubview(StatusBarView);
            StatusBarView.backgroundColor = newColor.ios;
        }
        this.isLoggedIn = this._globals.isLoggedIn;
        this.isUnauthenticated = this._globals.isUnauthenticated;
        if (app.ios) {
            this.iqKeyboard = IQKeyboardManager.sharedManager();
        }
        // Testing Adobe Analytics (may need to remove for your purposes if you aren't tracking state)
        // _router.events
        //   .filter(e => e instanceof NavigationEnd)
        //   .subscribe((e: NavigationEnd) => {
        //     // this._analytics.plugin.trackState(`From ${!isAndroid ? 'iOS' : 'Android'}: ${e.url}`);
        //   });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        nativescript_testfairy_1.TestFairySDK.setServerEndpoint("https://bcbsma.testFairy.com/services/");
        nativescript_testfairy_1.TestFairySDK.begin("533cf9eff8ed8b99850466eff22151b79994a839");
        appSettings.setNumber("isFirstTimeOpened", 0);
        appSettings.setBoolean("isTouchIDdisableNotification", false);
        if (appSettings.getBoolean("isFirstInstall") === false) {
            // do notsdfhing
        }
        else {
            appSettings.setBoolean("isFirstInstall", true);
        }
        // this._globals.getloginValue()
        //   .subscribe(item => {
        //     this.isLoggedIn = item;
        //   });
        // this._globals.getUnauthenticatedValue()
        //   .subscribe(item => {
        //     this.isUnauthenticated = item;
        //   });
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.backCallback = function (data) {
            if (!(_this.routerExtensions.canGoBack())) {
                if (_this.isExit) {
                    _this._globals.showToastMessage("Press once again to exit", "long");
                    data.cancel = true; // It makes the app to stay idle without minimizing
                    _this.isExit = false;
                }
                else {
                    data.cancel = false; // It minimizes the app
                    application.android.off(application.AndroidApplication.activityBackPressedEvent, _this.backCallback);
                    _this.isExit = true;
                }
                setTimeout(function () {
                    _this.isExit = true;
                }, 3000);
            }
            // true if there are pages to go back to, and false if there are no pages in the router history
        };
        if (app.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, this.backCallback);
        }
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // this.drawerService.drawer = this.drawerComponent.sideDrawer;
        var connectionType = connectivity.getConnectionType();
        connectivity.startMonitoring(function (newConnectionType) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    _this._globals.showToastMessage("No internet available, please connect!!", "longer");
                    // this.routerExtensions.navigate(["/offline"], {
                    //    animated: false
                    // });
                    break;
                default:
                    break;
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "mb-my-app",
        templateUrl: "./app.component.html"
    }),
    __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions,
        global_1.Globals,
        router_2.Router,
        core_1.ChangeDetectorRef,
        page_1.Page])
], AppComponent);
exports.AppComponent = AppComponent;
// app.on(app.launchEvent, (args) => {
//     TestFairySDK.begin("533cf9eff8ed8b99850466eff22151b79994a839");
// });
// app.start({ moduleName: "main-page" }); 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQUM3RSxrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDN0UsMENBQWdEO0FBQ2hELGdDQUErQjtBQUMvQiw2REFBd0Q7QUFDeEQsMENBQTBDO0FBQzFDLDBDQUEwRDtBQUcxRCxpRUFBc0Q7QUFDdEQsK0JBQThCO0FBQzlCLHFDQUFxQztBQUNyQyw2RUFBOEQ7QUFFOUQsb0NBQWtDO0FBR2xDLHlDQUEyQztBQUczQyxvREFBc0Q7QUFFdEQsa0RBQW9EO0FBQ3BELG1DQUFxQztBQUNyQyxnQ0FBa0M7QUFDbEMsMkNBQTZDO0FBQzdDLGtEQUFvRDtBQUlwRCxpRkFBa0U7QUFDbEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBR3BDLElBQUksT0FBTyxHQUFHO0lBQ1osT0FBTyxFQUFFLFlBQVk7SUFDckIsUUFBUSxFQUFFLElBQUk7SUFDZCxPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsSUFBSTtRQUNuQixVQUFVLEVBQUUsS0FBSztRQUNqQixHQUFHLEVBQUUsR0FBRztRQUNSLG9CQUFvQixFQUFFLFNBQVM7UUFDL0IscUJBQXFCLEVBQUUsSUFBSTtRQUMzQixhQUFhLEVBQUUsQ0FBQztRQUNoQixpQkFBaUIsRUFBRSxDQUFDO0tBQ3JCO0lBQ0QsR0FBRyxFQUFFLEVBV0o7Q0FDRixDQUFDO0FBUUYsSUFBYSxZQUFZO0lBZXZCLHNCQUFvQixnQkFBa0MsRUFDN0Ms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Q0FBQyxDQUFDO29CQUNwRixpREFBaUQ7b0JBQ2pELHFCQUFxQjtvQkFDckIsTUFBTTtvQkFDTixLQUFLLENBQUM7Z0JBQ1I7b0JBQ0UsS0FBSyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUlILG1CQUFDO0FBQUQsQ0FBQyxBQXJJRCxJQXFJQztBQXJJWSxZQUFZO0lBTnhCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHNCQUFzQjtLQUNwQyxDQUFDO3FDQWlCc0MsdUNBQWdCO1FBQ25DLGdCQUFPO1FBQ1IsZUFBTTtRQUNPLHdCQUFpQjtRQUVoQyxXQUFJO0dBcEJULFlBQVksQ0FxSXhCO0FBcklZLG9DQUFZO0FBd0l6QixzQ0FBc0M7QUFDdEMsc0VBQXNFO0FBQ3RFLE1BQU07QUFFTiwwQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpO1xucmVnaXN0ZXJFbGVtZW50KFwiQ2hlY2tCb3hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1jaGVja2JveFwiKS5DaGVja0JveCk7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgc2V0TnVtYmVyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBUZXN0RmFpcnlTREsgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlc3RmYWlyeVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tICduYXRpdmVzY3JpcHQtYWRvYmUtYW5hbHl0aWNzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tIFwiLi9hbmFseXRpY3Muc2VydmljZVwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyXCI7XG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XG5pbXBvcnQgeyBpb3MgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGlvblR5cGUsIGNvbm5lY3Rpb25UeXBlIGFzIG5ldENvbm5lY3Rpb25UeXBlLCBzdGFydE1vbml0b3JpbmcgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBpb3MgYXMgaW9zQXBwLCBhbmRyb2lkIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0IHsgZGV2aWNlIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xuaW1wb3J0ICogYXMgZnJhbWUgZnJvbSBcInVpL2ZyYW1lXCI7XG5pbXBvcnQgKiBhcyBjb25uZWN0aXZpdHkgZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG4vL2ltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcbmRlY2xhcmUgdmFyIFVJVmlld0F1dG9yZXNpemluZ0ZsZXhpYmxlV2lkdGg6IGFueTtcbmRlY2xhcmUgdmFyIFVJVmlld0F1dG9yZXNpemluZ0ZsZXhpYmxlQm90dG9tTWFyZ2luOiBhbnk7XG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5kZWNsYXJlIHZhciBNQlByb2dyZXNzSFVETW9kZURldGVybWluYXRlO1xuXG52YXIgb3B0aW9ucyA9IHtcbiAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxuICBwcm9ncmVzczogMC42NSxcbiAgYW5kcm9pZDoge1xuICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgbWF4OiAxMDAsXG4gICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxuICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcbiAgICBwcm9ncmVzc1N0eWxlOiAxLFxuICAgIHNlY29uZGFyeVByb2dyZXNzOiAxXG4gIH0sXG4gIGlvczoge1xuICAgIC8vIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcbiAgICAvLyBtYXJnaW46IDEwLFxuICAgIC8vIGRpbUJhY2tncm91bmQ6IHRydWUsXG4gICAgLy8gY29sb3I6IFwiIzRCOUVENlwiLCAvLyBjb2xvciBvZiBpbmRpY2F0b3IgYW5kIGxhYmVsc1xuICAgIC8vIC8vIGJhY2tncm91bmQgYm94IGFyb3VuZCBpbmRpY2F0b3JcbiAgICAvLyAvLyBoaWRlQmV6ZWwgd2lsbCBvdmVycmlkZSB0aGlzIGlmIHRydWVcbiAgICAvLyBiYWNrZ3JvdW5kQ29sb3I6IFwieWVsbG93XCIsXG4gICAgLy8gaGlkZUJlemVsOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcbiAgICAvLyB2aWV3OiBVSVZpZXcsIC8vIFRhcmdldCB2aWV3IHRvIHNob3cgb24gdG9wIG9mIChEZWZhdWx0cyB0byBlbnRpcmUgd2luZG93KVxuICAgIC8vICBtb2RlOk1CUHJvZ3Jlc3NIVURNb2RlRGV0ZXJtaW5hdGUgLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XG4gIH1cbn07XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogXCJtYi1teS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9hcHAuY29tcG9uZW50Lmh0bWxcIlxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHByaXZhdGUgaXFLZXlib2FyZDogSVFLZXlib2FyZE1hbmFnZXI7XG4gIHB1YmxpYyBpcUtleWJvYXJkRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBpcUtleWJvYXJkVG9vbGJhckVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMga2VlcEtleWJvYXJkT3Blbk9uVG91Y2hPdXRzaWRlOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIHNob3dIaW50SW5Ub29sYmFyOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGtleWJvYXJkQXBwZWFyYW5jZURhcms6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHRvZ2dsZURvbmVCdXR0b25UZXh0Q2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaW5jcmVhc2VLZXlib2FyZERpc3RhbmNlRnJvbVRleHRGaWVsZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0xvZ2dlZEluOiBib29sZWFuO1xuICBpc1VuYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbiAgaXNFeGl0OiBib29sZWFuID0gdHJ1ZTtcbiAgY291bnRlcjogbnVtYmVyID0gMDtcbiAgYmFja0NhbGxiYWNrOiAoZGF0YTogYXBwbGljYXRpb24uQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcbiAgICBwdWJsaWMgX3JvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgLy8gcHVibGljIF9hbmFseXRpY3M6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG5cbiAgICBfcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgIGxvYWRlci5zaG93KG9wdGlvbnMpO1xuXG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIG5ld0NvbG9yID0gbmV3IENvbG9yKFwiIzE4NjZhM1wiKTtcblxuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5kZXZpY2Uuc2RrVmVyc2lvbiA+PSBcIjIxXCIpIHtcbiAgICAgICAgdmFyIHdpbmRvdyA9IGFwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCk7XG4gICAgICAgIHdpbmRvdy5zZXRTdGF0dXNCYXJDb2xvcihuZXdDb2xvci5hbmRyb2lkKTtcbiAgICAgICAgQWRvYmVBbmFseXRpY3MuY29uZmlndXJlKHsgc2FtcGxlOiAnVGVzdGluZyBBbmRyb2lkJyB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgc3RhdHVzQmFyRnJhbWUgPSB1dGlscy5pb3MuZ2V0dGVyKFVJQXBwbGljYXRpb24sIFVJQXBwbGljYXRpb24uc2hhcmVkQXBwbGljYXRpb24pLnN0YXR1c0JhckZyYW1lO1xuICAgICAgdmFyIFN0YXR1c0JhclZpZXcgPSBVSVZpZXcuYWxsb2MoKS5pbml0V2l0aEZyYW1lKHN0YXR1c0JhckZyYW1lKTtcbiAgICAgIFN0YXR1c0JhclZpZXcuYXV0b3Jlc2l6aW5nTWFzayA9IChVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZVdpZHRoIHwgVUlWaWV3QXV0b3Jlc2l6aW5nRmxleGlibGVCb3R0b21NYXJnaW4pO1xuICAgICAgU3RhdHVzQmFyVmlldy5hdXRvcmVzaXplc1N1YnZpZXdzID0gdHJ1ZTtcbiAgICAgIGZyYW1lLnRvcG1vc3QoKS5pb3MuY29udHJvbGxlci52aWV3LnN1cGVydmlldy5hZGRTdWJ2aWV3KFN0YXR1c0JhclZpZXcpO1xuICAgICAgU3RhdHVzQmFyVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvci5pb3M7XG4gICAgfVxuICAgIHRoaXMuaXNMb2dnZWRJbiA9IHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbjtcbiAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkID0gdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZDtcbiAgICBpZiAoYXBwLmlvcykge1xuICAgICAgdGhpcy5pcUtleWJvYXJkID0gSVFLZXlib2FyZE1hbmFnZXIuc2hhcmVkTWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8vIFRlc3RpbmcgQWRvYmUgQW5hbHl0aWNzIChtYXkgbmVlZCB0byByZW1vdmUgZm9yIHlvdXIgcHVycG9zZXMgaWYgeW91IGFyZW4ndCB0cmFja2luZyBzdGF0ZSlcbiAgICAvLyBfcm91dGVyLmV2ZW50c1xuICAgIC8vICAgLmZpbHRlcihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgIC8vICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgIC8vICAgICAvLyB0aGlzLl9hbmFseXRpY3MucGx1Z2luLnRyYWNrU3RhdGUoYEZyb20gJHshaXNBbmRyb2lkID8gJ2lPUycgOiAnQW5kcm9pZCd9OiAke2UudXJsfWApO1xuICAgIC8vICAgfSk7XG5cbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgVGVzdEZhaXJ5U0RLLnNldFNlcnZlckVuZHBvaW50KFwiaHR0cHM6Ly9iY2JzbWEudGVzdEZhaXJ5LmNvbS9zZXJ2aWNlcy9cIik7XG4gICAgVGVzdEZhaXJ5U0RLLmJlZ2luKFwiNTMzY2Y5ZWZmOGVkOGI5OTg1MDQ2NmVmZjIyMTUxYjc5OTk0YTgzOVwiKTtcblxuICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImlzRmlyc3RUaW1lT3BlbmVkXCIsIDApO1xuICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc1RvdWNoSURkaXNhYmxlTm90aWZpY2F0aW9uXCIsIGZhbHNlKTtcbiAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsXCIpID09PSBmYWxzZSkge1xuICAgICAgLy8gZG8gbm90c2RmaGluZ1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxcIiwgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIHRoaXMuX2dsb2JhbHMuZ2V0bG9naW5WYWx1ZSgpXG4gICAgLy8gICAuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgIC8vICAgICB0aGlzLmlzTG9nZ2VkSW4gPSBpdGVtO1xuICAgIC8vICAgfSk7XG4gICAgLy8gdGhpcy5fZ2xvYmFscy5nZXRVbmF1dGhlbnRpY2F0ZWRWYWx1ZSgpXG4gICAgLy8gICAuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgIC8vICAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkID0gaXRlbTtcbiAgICAvLyAgIH0pO1xuICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XG4gICAgfVxuICAgIHRoaXMuYmFja0NhbGxiYWNrID0gKGRhdGE6IGFwcGxpY2F0aW9uLkFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XG4gICAgICBpZiAoISh0aGlzLnJvdXRlckV4dGVuc2lvbnMuY2FuR29CYWNrKCkpKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRXhpdCkge1xuICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIlByZXNzIG9uY2UgYWdhaW4gdG8gZXhpdFwiLCBcImxvbmdcIik7XG4gICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlOyAvLyBJdCBtYWtlcyB0aGUgYXBwIHRvIHN0YXkgaWRsZSB3aXRob3V0IG1pbmltaXppbmdcbiAgICAgICAgICB0aGlzLmlzRXhpdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRhdGEuY2FuY2VsID0gZmFsc2U7IC8vIEl0IG1pbmltaXplcyB0aGUgYXBwXG4gICAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vZmYoYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrQ2FsbGJhY2spO1xuICAgICAgICAgIHRoaXMuaXNFeGl0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzRXhpdCA9IHRydWU7XG4gICAgICAgIH0sIDMwMDApO1xuICAgICAgfVxuICAgICAgLy8gdHJ1ZSBpZiB0aGVyZSBhcmUgcGFnZXMgdG8gZ28gYmFjayB0bywgYW5kIGZhbHNlIGlmIHRoZXJlIGFyZSBubyBwYWdlcyBpbiB0aGUgcm91dGVyIGhpc3RvcnlcbiAgICB9XG4gICAgaWYgKGFwcC5hbmRyb2lkKSB7XG4gICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0NhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuXG5cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gdGhpcy5kcmF3ZXJTZXJ2aWNlLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gY29ubmVjdGl2aXR5LmdldENvbm5lY3Rpb25UeXBlKCk7XG4gICAgY29ubmVjdGl2aXR5LnN0YXJ0TW9uaXRvcmluZygobmV3Q29ubmVjdGlvblR5cGU6IG51bWJlcikgPT4ge1xuICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xuICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lOlxuICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIk5vIGludGVybmV0IGF2YWlsYWJsZSwgcGxlYXNlIGNvbm5lY3QhIVwiLCBcImxvbmdlclwiKTtcbiAgICAgICAgICAvLyB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL29mZmxpbmVcIl0sIHtcbiAgICAgICAgICAvLyAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cblxufVxuXG5cbi8vIGFwcC5vbihhcHAubGF1bmNoRXZlbnQsIChhcmdzKSA9PiB7XG4vLyAgICAgVGVzdEZhaXJ5U0RLLmJlZ2luKFwiNTMzY2Y5ZWZmOGVkOGI5OTg1MDQ2NmVmZjIyMTUxYjc5OTk0YTgzOVwiKTtcbi8vIH0pO1xuXG4vLyBhcHAuc3RhcnQoeyBtb2R1bGVOYW1lOiBcIm1haW4tcGFnZVwiIH0pOyJdfQ==