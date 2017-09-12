import {
  ViewChild, ChangeDetectorRef, OnInit, AfterViewInit,
  ChangeDetectionStrategy, Component
} from "@angular/core";
import * as elementRegistryModule from "nativescript-angular/element-registry";
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
elementRegistryModule.registerElement("CheckBox", () => require("nativescript-checkbox").CheckBox);
import { NavigationEnd } from "@angular/router";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { Globals } from "./shared/global";
import { Router, NavigationStart } from "@angular/router";
import { Observable } from "data/observable";
import { getBoolean, setBoolean, getNumber, setNumber, getString, setString, hasKey, remove, clear } from "application-settings";
import { knownFolders, File, Folder } from "file-system";
import { TestFairySDK } from 'nativescript-testfairy';
import { Color } from "color";
import { isAndroid } from "platform";
import { AdobeAnalytics } from 'nativescript-adobe-analytics';
import { AnalyticsService } from "./analytics.service";
import 'rxjs/add/operator/filter';
import * as frame from "ui/frame";
import * as utils from "utils/utils";
import * as application from "application";
import * as appSettingsModule from "application-settings";
import * as connectivity from "connectivity";
import * as appSettings from "application-settings";
import * as fs from "file-system";
import * as app from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";
declare var UIViewAutoresizingFlexibleWidth: any;
declare var UIViewAutoresizingFlexibleBottomMargin: any;

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
  backCallback: (data: application.AndroidActivityBackPressedEventData) => void;

  constructor(private routerExtensions: RouterExtensions,
    public _globals: Globals,
    public _router: Router,
    private _changeDetectionRef: ChangeDetectorRef,
    public _analytics: AnalyticsService,
    private page: Page) {
    var newColor = new Color("#1866a3");

    if (isAndroid) {
      if (platform.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow();
        window.setStatusBarColor(newColor.android);
        AdobeAnalytics.configure({ sample: 'Testing Android' }, true);
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
    _router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => {
        this._analytics.plugin.trackState(`From ${!isAndroid ? 'iOS' : 'Android'}: ${e.url}`);
      });

  }


  ngOnInit() {
    TestFairySDK.setServerEndpoint("https://bcbsma.testFairy.com/services/");
    TestFairySDK.begin("533cf9eff8ed8b99850466eff22151b79994a839");

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
    }

    application.android.on(application.AndroidApplication.activityBackPressedEvent, this.backCallback);
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