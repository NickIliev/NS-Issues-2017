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
var options = {
    message: "Loading...",
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
        zone, page) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this._globals = _globals;
        this._router = _router;
        this._changeDetectionRef = _changeDetectionRef;
        this.zone = zone;
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
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
        _router.events.subscribe(function (event) {
            if (event instanceof router_2.NavigationStart) {
                _this.zone.run(function () {
                    _this.loader.show(options);
                });
            }
            if (event instanceof router_1.NavigationEnd) {
                setTimeout(function () {
                    _this.zone.run(function () {
                        _this.loader.hide();
                    });
                }, 500);
            }
        });
        var newColor = new color_1.Color("#1866a3");
        if (platform_1.isAndroid) {
            if (platform.device.sdkVersion >= "21") {
                var window_1 = app.android.startActivity.getWindow();
                window_1.setStatusBarColor(newColor.android);
                nativescript_adobe_analytics_1.AdobeAnalytics.configure({ sample: "Testing Android" }, true);
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
        if (this._globals.releaseVersion === "release") {
            nativescript_testfairy_1.TestFairySDK.setServerEndpoint("https://bcbsma.testFairy.com/services/");
            nativescript_testfairy_1.TestFairySDK.begin("533cf9eff8ed8b99850466eff22151b79994a839");
        }
        else {
            // do nothing
        }
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
        core_1.NgZone,
        page_1.Page])
], AppComponent);
exports.AppComponent = AppComponent;
// app.on(app.launchEvent, (args) => {
//     TestFairySDK.begin("533cf9eff8ed8b99850466eff22151b79994a839");
// });
// app.start({ moduleName: "main-page" }); 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEY7QUFDNUYsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQUM3RSxrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDN0UsMENBQWdEO0FBQ2hELGdDQUErQjtBQUMvQiw2REFBd0Q7QUFDeEQsMENBQTBDO0FBQzFDLDBDQUEwRDtBQUcxRCxpRUFBc0Q7QUFDdEQsK0JBQThCO0FBQzlCLHFDQUFxQztBQUNyQyw2RUFBOEQ7QUFFOUQsb0NBQWtDO0FBR2xDLHlDQUEyQztBQUczQyxvREFBc0Q7QUFFdEQsa0RBQW9EO0FBQ3BELG1DQUFxQztBQUNyQyxnQ0FBa0M7QUFDbEMsMkNBQTZDO0FBQzdDLGtEQUFvRDtBQUlwRCxpRkFBa0U7QUFJbEUsSUFBSSxPQUFPLEdBQUc7SUFDWixPQUFPLEVBQUUsWUFBWTtJQUNyQixRQUFRLEVBQUUsSUFBSTtJQUNkLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLEdBQUcsRUFBRSxHQUFHO1FBQ1Isb0JBQW9CLEVBQUUsU0FBUztRQUMvQixxQkFBcUIsRUFBRSxJQUFJO1FBQzNCLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLGlCQUFpQixFQUFFLENBQUM7S0FDckI7SUFDRCxHQUFHLEVBQUUsRUFXSjtDQUNGLENBQUM7QUFRRixJQUFhLFlBQVk7SUFrQnZCLHNCQUFvQixnQkFBa0MsRUFDN0MsUUFBaUIsRUFDakIsT0FBZSxFQUNkLG1CQUFzQztRQUM5Qyx1Q0FBdUM7UUFDL0IsSUFBWSxFQUNaLElBQVU7UUFOcEIsaUJBb0RDO1FBcERtQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFFdEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFNBQUksR0FBSixJQUFJLENBQU07UUF0QmIsc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLDZCQUF3QixHQUFZLElBQUksQ0FBQztRQUN6QyxtQ0FBOEIsR0FBWSxJQUFJLENBQUM7UUFDL0Msc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN4QyxnQ0FBMkIsR0FBWSxLQUFLLENBQUM7UUFDN0MsMENBQXFDLEdBQVksS0FBSyxDQUFDO1FBRzlELFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixXQUFNLEdBQXFCLElBQUksaURBQWdCLEVBQUUsQ0FBQztRQVloRCxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLHdCQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDWixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLHNCQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxVQUFVLENBQUM7b0JBQ1QsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQ1osS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxRQUFRLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEMsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFFBQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkQsUUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0MsNkNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRSxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUNyRyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2pFLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLCtCQUErQixHQUFHLHNDQUFzQyxDQUFDLENBQUM7WUFDNUcsYUFBYSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUN6QyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RSxhQUFhLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RELENBQUM7UUFFRCw4RkFBOEY7UUFDOUYsaUJBQWlCO1FBQ2pCLDZDQUE2QztRQUM3Qyx1Q0FBdUM7UUFDdkMsZ0dBQWdHO1FBQ2hHLFFBQVE7SUFFVixDQUFDO0lBR0QsK0JBQVEsR0FBUjtRQUFBLGlCQStDQztRQTlDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9DLHFDQUFZLENBQUMsaUJBQWlCLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN6RSxxQ0FBWSxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGFBQWE7UUFDZixDQUFDO1FBRUQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxXQUFXLENBQUMsVUFBVSxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELGdCQUFnQjtRQUNsQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixXQUFXLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxnQ0FBZ0M7UUFDaEMseUJBQXlCO1FBQ3pCLDhCQUE4QjtRQUM5QixRQUFRO1FBQ1IsMENBQTBDO1FBQzFDLHlCQUF5QjtRQUN6QixxQ0FBcUM7UUFDckMsUUFBUTtRQUNSLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7UUFDbkUsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBQyxJQUFxRDtZQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxtREFBbUQ7b0JBQ3ZFLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsdUJBQXVCO29CQUM1QyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNwRyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFDRCxVQUFVLENBQUM7b0JBQ1QsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNYLENBQUM7WUFDRCwrRkFBK0Y7UUFDakcsQ0FBQyxDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRyxDQUFDO0lBQ0gsQ0FBQztJQUtELHNDQUFlLEdBQWY7UUFBQSxpQkFlQztRQWRDLCtEQUErRDtRQUMvRCxJQUFJLGNBQWMsR0FBRyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0RCxZQUFZLENBQUMsZUFBZSxDQUFDLFVBQUMsaUJBQXlCO1lBQ3JELE1BQU0sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7b0JBQ25DLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3BGLGlEQUFpRDtvQkFDakQscUJBQXFCO29CQUNyQixNQUFNO29CQUNOLEtBQUssQ0FBQztnQkFDUjtvQkFDRSxLQUFLLENBQUM7WUFDVixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBSUgsbUJBQUM7QUFBRCxDQUFDLEFBaEpELElBZ0pDO0FBaEpZLFlBQVk7SUFOeEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsc0JBQXNCO0tBQ3BDLENBQUM7cUNBb0JzQyx1Q0FBZ0I7UUFDbkMsZ0JBQU87UUFDUixlQUFNO1FBQ08sd0JBQWlCO1FBRWhDLGFBQU07UUFDTixXQUFJO0dBeEJULFlBQVksQ0FnSnhCO0FBaEpZLG9DQUFZO0FBbUp6QixzQ0FBc0M7QUFDdEMsc0VBQXNFO0FBQ3RFLE1BQU07QUFFTiwwQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpO1xyXG5yZWdpc3RlckVsZW1lbnQoXCJDaGVja0JveFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWNoZWNrYm94XCIpLkNoZWNrQm94KTtcclxuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIHNldE51bWJlciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBUZXN0RmFpcnlTREsgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlc3RmYWlyeVwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFkb2JlLWFuYWx5dGljc1wiO1xyXG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSBcIi4vYW5hbHl0aWNzLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyXCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgaW9zIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBnZXRDb25uZWN0aW9uVHlwZSwgY29ubmVjdGlvblR5cGUgYXMgbmV0Q29ubmVjdGlvblR5cGUsIHN0YXJ0TW9uaXRvcmluZyB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgaW9zIGFzIGlvc0FwcCwgYW5kcm9pZCB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5pbXBvcnQgKiBhcyBmcmFtZSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcclxuZGVjbGFyZSB2YXIgVUlWaWV3QXV0b3Jlc2l6aW5nRmxleGlibGVXaWR0aDogYW55O1xyXG5kZWNsYXJlIHZhciBVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZUJvdHRvbU1hcmdpbjogYW55O1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5cclxuZGVjbGFyZSB2YXIgTUJQcm9ncmVzc0hVRE1vZGVEZXRlcm1pbmF0ZTtcclxuXHJcbmxldCBvcHRpb25zID0ge1xyXG4gIG1lc3NhZ2U6IFwiTG9hZGluZy4uLlwiLFxyXG4gIHByb2dyZXNzOiAwLjY1LFxyXG4gIGFuZHJvaWQ6IHtcclxuICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgIG1heDogMTAwLFxyXG4gICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxyXG4gICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgIHNlY29uZGFyeVByb2dyZXNzOiAxXHJcbiAgfSxcclxuICBpb3M6IHtcclxuICAgIC8vIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICAgIC8vIG1hcmdpbjogMTAsXHJcbiAgICAvLyBkaW1CYWNrZ3JvdW5kOiB0cnVlLFxyXG4gICAgLy8gY29sb3I6IFwiIzRCOUVENlwiLCAvLyBjb2xvciBvZiBpbmRpY2F0b3IgYW5kIGxhYmVsc1xyXG4gICAgLy8gLy8gYmFja2dyb3VuZCBib3ggYXJvdW5kIGluZGljYXRvclxyXG4gICAgLy8gLy8gaGlkZUJlemVsIHdpbGwgb3ZlcnJpZGUgdGhpcyBpZiB0cnVlXHJcbiAgICAvLyBiYWNrZ3JvdW5kQ29sb3I6IFwieWVsbG93XCIsXHJcbiAgICAvLyBoaWRlQmV6ZWw6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2UsIGNhbiBoaWRlIHRoZSBzdXJyb3VuZGluZyBiZXplbFxyXG4gICAgLy8gdmlldzogVUlWaWV3LCAvLyBUYXJnZXQgdmlldyB0byBzaG93IG9uIHRvcCBvZiAoRGVmYXVsdHMgdG8gZW50aXJlIHdpbmRvdylcclxuICAgIC8vICBtb2RlOk1CUHJvZ3Jlc3NIVURNb2RlRGV0ZXJtaW5hdGUgLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XHJcbiAgfVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogXCJtYi1teS1hcHBcIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL2FwcC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBwcml2YXRlIGlxS2V5Ym9hcmQ6IElRS2V5Ym9hcmRNYW5hZ2VyO1xyXG4gIHB1YmxpYyBpcUtleWJvYXJkRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGlxS2V5Ym9hcmRUb29sYmFyRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGtlZXBLZXlib2FyZE9wZW5PblRvdWNoT3V0c2lkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIHNob3dIaW50SW5Ub29sYmFyOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMga2V5Ym9hcmRBcHBlYXJhbmNlRGFyazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyB0b2dnbGVEb25lQnV0dG9uVGV4dENoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgaW5jcmVhc2VLZXlib2FyZERpc3RhbmNlRnJvbVRleHRGaWVsZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGlzTG9nZ2VkSW46IGJvb2xlYW47XHJcbiAgaXNVbmF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XHJcbiAgaXNFeGl0OiBib29sZWFuID0gdHJ1ZTtcclxuICBjb3VudGVyOiBudW1iZXIgPSAwO1xyXG5cclxuICBsb2FkZXI6IExvYWRpbmdJbmRpY2F0b3IgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5cclxuICBiYWNrQ2FsbGJhY2s6IChkYXRhOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgcHVibGljIF9yb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAvLyBwdWJsaWMgX2FuYWx5dGljczogQW5hbHl0aWNzU2VydmljZSxcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcblxyXG4gICAgX3JvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBuZXdDb2xvciA9IG5ldyBDb2xvcihcIiMxODY2YTNcIik7XHJcblxyXG4gICAgaWYgKGlzQW5kcm9pZCkge1xyXG4gICAgICBpZiAocGxhdGZvcm0uZGV2aWNlLnNka1ZlcnNpb24gPj0gXCIyMVwiKSB7XHJcbiAgICAgICAgbGV0IHdpbmRvdyA9IGFwcC5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkuZ2V0V2luZG93KCk7XHJcbiAgICAgICAgd2luZG93LnNldFN0YXR1c0JhckNvbG9yKG5ld0NvbG9yLmFuZHJvaWQpO1xyXG4gICAgICAgIEFkb2JlQW5hbHl0aWNzLmNvbmZpZ3VyZSh7IHNhbXBsZTogXCJUZXN0aW5nIEFuZHJvaWRcIiB9LCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBzdGF0dXNCYXJGcmFtZSA9IHV0aWxzLmlvcy5nZXR0ZXIoVUlBcHBsaWNhdGlvbiwgVUlBcHBsaWNhdGlvbi5zaGFyZWRBcHBsaWNhdGlvbikuc3RhdHVzQmFyRnJhbWU7XHJcbiAgICAgIGxldCBTdGF0dXNCYXJWaWV3ID0gVUlWaWV3LmFsbG9jKCkuaW5pdFdpdGhGcmFtZShzdGF0dXNCYXJGcmFtZSk7XHJcbiAgICAgIFN0YXR1c0JhclZpZXcuYXV0b3Jlc2l6aW5nTWFzayA9IChVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZVdpZHRoIHwgVUlWaWV3QXV0b3Jlc2l6aW5nRmxleGlibGVCb3R0b21NYXJnaW4pO1xyXG4gICAgICBTdGF0dXNCYXJWaWV3LmF1dG9yZXNpemVzU3Vidmlld3MgPSB0cnVlO1xyXG4gICAgICBmcmFtZS50b3Btb3N0KCkuaW9zLmNvbnRyb2xsZXIudmlldy5zdXBlcnZpZXcuYWRkU3VidmlldyhTdGF0dXNCYXJWaWV3KTtcclxuICAgICAgU3RhdHVzQmFyVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvci5pb3M7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW47XHJcbiAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkID0gdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZDtcclxuICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgIHRoaXMuaXFLZXlib2FyZCA9IElRS2V5Ym9hcmRNYW5hZ2VyLnNoYXJlZE1hbmFnZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUZXN0aW5nIEFkb2JlIEFuYWx5dGljcyAobWF5IG5lZWQgdG8gcmVtb3ZlIGZvciB5b3VyIHB1cnBvc2VzIGlmIHlvdSBhcmVuJ3QgdHJhY2tpbmcgc3RhdGUpXHJcbiAgICAvLyBfcm91dGVyLmV2ZW50c1xyXG4gICAgLy8gICAuZmlsdGVyKGUgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXHJcbiAgICAvLyAgIC5zdWJzY3JpYmUoKGU6IE5hdmlnYXRpb25FbmQpID0+IHtcclxuICAgIC8vICAgICAvLyB0aGlzLl9hbmFseXRpY3MucGx1Z2luLnRyYWNrU3RhdGUoYEZyb20gJHshaXNBbmRyb2lkID8gJ2lPUycgOiAnQW5kcm9pZCd9OiAke2UudXJsfWApO1xyXG4gICAgLy8gICB9KTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fZ2xvYmFscy5yZWxlYXNlVmVyc2lvbiA9PT0gXCJyZWxlYXNlXCIpIHtcclxuICAgICAgVGVzdEZhaXJ5U0RLLnNldFNlcnZlckVuZHBvaW50KFwiaHR0cHM6Ly9iY2JzbWEudGVzdEZhaXJ5LmNvbS9zZXJ2aWNlcy9cIik7XHJcbiAgICAgIFRlc3RGYWlyeVNESy5iZWdpbihcIjUzM2NmOWVmZjhlZDhiOTk4NTA0NjZlZmYyMjE1MWI3OTk5NGE4MzlcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICB9XHJcblxyXG4gICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiaXNGaXJzdFRpbWVPcGVuZWRcIiwgMCk7XHJcbiAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvblwiLCBmYWxzZSk7XHJcbiAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsXCIpID09PSBmYWxzZSkge1xyXG4gICAgICAvLyBkbyBub3RzZGZoaW5nXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLl9nbG9iYWxzLmdldGxvZ2luVmFsdWUoKVxyXG4gICAgLy8gICAuc3Vic2NyaWJlKGl0ZW0gPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuaXNMb2dnZWRJbiA9IGl0ZW07XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gdGhpcy5fZ2xvYmFscy5nZXRVbmF1dGhlbnRpY2F0ZWRWYWx1ZSgpXHJcbiAgICAvLyAgIC5zdWJzY3JpYmUoaXRlbSA9PiB7XHJcbiAgICAvLyAgICAgdGhpcy5pc1VuYXV0aGVudGljYXRlZCA9IGl0ZW07XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5iYWNrQ2FsbGJhY2sgPSAoZGF0YTogYXBwbGljYXRpb24uQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcclxuICAgICAgaWYgKCEodGhpcy5yb3V0ZXJFeHRlbnNpb25zLmNhbkdvQmFjaygpKSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRXhpdCkge1xyXG4gICAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiUHJlc3Mgb25jZSBhZ2FpbiB0byBleGl0XCIsIFwibG9uZ1wiKTtcclxuICAgICAgICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gSXQgbWFrZXMgdGhlIGFwcCB0byBzdGF5IGlkbGUgd2l0aG91dCBtaW5pbWl6aW5nXHJcbiAgICAgICAgICB0aGlzLmlzRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGRhdGEuY2FuY2VsID0gZmFsc2U7IC8vIEl0IG1pbmltaXplcyB0aGUgYXBwXHJcbiAgICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9mZihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tDYWxsYmFjayk7XHJcbiAgICAgICAgICB0aGlzLmlzRXhpdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc0V4aXQgPSB0cnVlO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRydWUgaWYgdGhlcmUgYXJlIHBhZ2VzIHRvIGdvIGJhY2sgdG8sIGFuZCBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gcGFnZXMgaW4gdGhlIHJvdXRlciBoaXN0b3J5XHJcbiAgICB9O1xyXG4gICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLy8gdGhpcy5kcmF3ZXJTZXJ2aWNlLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XHJcbiAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBjb25uZWN0aXZpdHkuZ2V0Q29ubmVjdGlvblR5cGUoKTtcclxuICAgIGNvbm5lY3Rpdml0eS5zdGFydE1vbml0b3JpbmcoKG5ld0Nvbm5lY3Rpb25UeXBlOiBudW1iZXIpID0+IHtcclxuICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNob3dUb2FzdE1lc3NhZ2UoXCJObyBpbnRlcm5ldCBhdmFpbGFibGUsIHBsZWFzZSBjb25uZWN0ISFcIiwgXCJsb25nZXJcIik7XHJcbiAgICAgICAgICAvLyB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL29mZmxpbmVcIl0sIHtcclxuICAgICAgICAgIC8vICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcbi8vIGFwcC5vbihhcHAubGF1bmNoRXZlbnQsIChhcmdzKSA9PiB7XHJcbi8vICAgICBUZXN0RmFpcnlTREsuYmVnaW4oXCI1MzNjZjllZmY4ZWQ4Yjk5ODUwNDY2ZWZmMjIxNTFiNzk5OTRhODM5XCIpO1xyXG4vLyB9KTtcclxuXHJcbi8vIGFwcC5zdGFydCh7IG1vZHVsZU5hbWU6IFwibWFpbi1wYWdlXCIgfSk7Il19