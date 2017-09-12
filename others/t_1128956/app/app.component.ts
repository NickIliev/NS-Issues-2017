import { ChangeDetectorRef, OnInit, AfterViewInit, Component, NgZone } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("CheckBox", () => require("nativescript-checkbox").CheckBox);
import { NavigationEnd } from "@angular/router";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { Globals } from "./shared/global";
import { Router, NavigationStart } from "@angular/router";
import { Observable } from "data/observable";
import { getBoolean, setBoolean, setNumber } from "application-settings";
import { TestFairySDK } from "nativescript-testfairy";
import { Color } from "color";
import { isAndroid } from "platform";
import { AdobeAnalytics } from "nativescript-adobe-analytics";
import { AnalyticsService } from "./analytics.service";
import "rxjs/add/operator/filter";
import { topmost } from "ui/frame";
import { ios } from "utils/utils";
import * as application from "application";
import { getConnectionType, connectionType as netConnectionType, startMonitoring } from "connectivity";
import { ios as iosApp, android } from "application";
import * as platform from "tns-core-modules/platform";
import { device } from "platform";
import * as appSettings from "application-settings";
import * as utils from "utils/utils";
import * as frame from "ui/frame";
import * as connectivity from "connectivity";
import * as app from "tns-core-modules/application";
// import 'rxjs/add/operator/filter';
declare var UIViewAutoresizingFlexibleWidth: any;
declare var UIViewAutoresizingFlexibleBottomMargin: any;
import { LoadingIndicator } from "nativescript-loading-indicator";

declare var MBProgressHUDModeDeterminate;

let options = {
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
  ios: {
    // details: "Additional detail note!",
    // margin: 10,
    // dimBackground: true,
    // color: "#4B9ED6", // color of indicator and labels
    // // background box around indicator
    // // hideBezel will override this if true
    // backgroundColor: "yellow",
    // hideBezel: true, // default false, can hide the surrounding bezel
    // view: UIView, // Target view to show on top of (Defaults to entire window)
    //  mode:MBProgressHUDModeDeterminate // see iOS specific options below
  }
};

@Component({
  moduleId: module.id,
  selector: "mb-my-app",
  templateUrl: "./app.component.html"
})

export class AppComponent implements OnInit, AfterViewInit {
  private iqKeyboard: IQKeyboardManager;
  public iqKeyboardEnabled: boolean = true;
  public iqKeyboardToolbarEnabled: boolean = true;
  public keepKeyboardOpenOnTouchOutside: boolean = true;
  public showHintInToolbar: boolean = true;
  public keyboardAppearanceDark: boolean = false;
  public toggleDoneButtonTextChanged: boolean = false;
  public increaseKeyboardDistanceFromTextField: boolean = false;
  isLoggedIn: boolean;
  isUnauthenticated: boolean;
  isExit: boolean = true;
  counter: number = 0;

  loader: LoadingIndicator = new LoadingIndicator();

  backCallback: (data: application.AndroidActivityBackPressedEventData) => void;

  constructor(private routerExtensions: RouterExtensions,
    public _globals: Globals,
    public _router: Router,
    private _changeDetectionRef: ChangeDetectorRef,
    // public _analytics: AnalyticsService,
    private zone: NgZone,
    private page: Page) {

_router.events.subscribe(event => {
  if (event instanceof NavigationStart) {
    this.zone.run(() => {
      this.loader.show(options);
    });
  }
  if (event instanceof NavigationEnd) {
    setTimeout(() => {
      this.zone.run(() => {
        this.loader.hide();
      });
    }, 500);
  }
});
    let newColor = new Color("#1866a3");

    if (isAndroid) {
      if (platform.device.sdkVersion >= "21") {
        let window = app.android.startActivity.getWindow();
        window.setStatusBarColor(newColor.android);
        AdobeAnalytics.configure({ sample: "Testing Android" }, true);
      }
    }
    else {
      let statusBarFrame = utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarFrame;
      let StatusBarView = UIView.alloc().initWithFrame(statusBarFrame);
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


  ngOnInit() {
    if (this._globals.releaseVersion === "release") {
      TestFairySDK.setServerEndpoint("https://bcbsma.testFairy.com/services/");
      TestFairySDK.begin("533cf9eff8ed8b99850466eff22151b79994a839");
    } else {
      // do nothing
    }

    appSettings.setNumber("isFirstTimeOpened", 0);
    appSettings.setBoolean("isTouchIDdisableNotification", false);
    if (appSettings.getBoolean("isFirstInstall") === false) {
      // do notsdfhing
    } else {
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
    this.backCallback = (data: application.AndroidActivityBackPressedEventData) => {
      if (!(this.routerExtensions.canGoBack())) {
        if (this.isExit) {
          this._globals.showToastMessage("Press once again to exit", "long");
          data.cancel = true; // It makes the app to stay idle without minimizing
          this.isExit = false;
        }
        else {
          data.cancel = false; // It minimizes the app
          application.android.off(application.AndroidApplication.activityBackPressedEvent, this.backCallback);
          this.isExit = true;
        }
        setTimeout(() => {
          this.isExit = true;
        }, 3000);
      }
      // true if there are pages to go back to, and false if there are no pages in the router history
    };
    if (app.android) {
      application.android.on(application.AndroidApplication.activityBackPressedEvent, this.backCallback);
    }
  }




  ngAfterViewInit() {
    // this.drawerService.drawer = this.drawerComponent.sideDrawer;
    let connectionType = connectivity.getConnectionType();
    connectivity.startMonitoring((newConnectionType: number) => {
      switch (newConnectionType) {
        case connectivity.connectionType.none:
          this._globals.showToastMessage("No internet available, please connect!!", "longer");
          // this.routerExtensions.navigate(["/offline"], {
          //    animated: false
          // });
          break;
        default:
          break;
      }
    });
  }



}


// app.on(app.launchEvent, (args) => {
//     TestFairySDK.begin("533cf9eff8ed8b99850466eff22151b79994a839");
// });

// app.start({ moduleName: "main-page" });