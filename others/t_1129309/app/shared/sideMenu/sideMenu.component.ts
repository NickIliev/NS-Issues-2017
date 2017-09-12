
import {
  ViewChild, ChangeDetectorRef, OnInit, AfterViewInit,
  ChangeDetectionStrategy, Component, ViewContainerRef
} from "@angular/core";


import { Page } from "ui/page";
import sideDrawerModule = require("nativescript-telerik-ui-pro/sidedrawer");
import { RadSideDrawerComponent } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { DrawerTransitionBase, SlideInOnTopTransition, SideDrawerLocation, RadSideDrawer } from "nativescript-telerik-ui-pro/sidedrawer";
import { RouterExtensions } from "nativescript-angular";
import { Globals } from "../global";
import { Router, NavigationStart } from "@angular/router";
import { DrawerService } from "../services/drawer.service";
import * as appSettings from "application-settings";
import * as app from "tns-core-modules/application";
import { RestrictedAccessComponent } from "../restrictedAccess/restrictedAccess.component";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
//import { StackLayout } from "ui/layouts/stack-layout"; Commented because no my accounts & find a docor in side menu 
import { Color } from "color";
import * as frame from "ui/frame";
import * as utils from "utils/utils";
declare var UIViewAutoresizingFlexibleWidth: any;
declare var UIViewAutoresizingFlexibleBottomMargin: any;


@Component({
  moduleId: module.id,
  styleUrls: ["sideMenu.css"],
  selector: "mb-side-menu",
  templateUrl: "./sideMenu.component.html"
})
export class SideMenuComponent implements OnInit, AfterViewInit {


  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

  private _sideDrawerLocation: SideDrawerLocation;
  private drawer: RadSideDrawer;
  private _currentLocation: SideDrawerLocation;
  private _sideDrawerTransition: DrawerTransitionBase;

  isLoggedIn: boolean;
  isUnauthenticated: boolean;

  public stubbed_username: string;


  constructor(private _routerExtensions: RouterExtensions,
    public _globals: Globals,
    public _router: Router,
    private _changeDetectionRef: ChangeDetectorRef,
    private page: Page,
    private drawerService: DrawerService,
    private promoModal: ModalDialogService,
    private vcRef: ViewContainerRef) {
    this.page.on("loaded", this.onLoaded, this);
    this.page.on("navigatedTo", () => {
      this.drawerService.drawer = this.drawerComponent.sideDrawer;
      //  this.drawerService.drawer.closeDrawer();
      this._changeDetectionRef.detectChanges();
    });
    
    this.isLoggedIn = this._globals.isLoggedIn;
    this.isUnauthenticated = this._globals.isUnauthenticated;
  }

public onLoaded() {
  console.log("onLoaded sideMenu");
  this.drawer = this.drawerComponent.sideDrawer;

  if (this.drawer.android) {
    this.drawer.android.setDrawerCloseThreshold(20);
  }
}

ngOnInit() {
  console.log("ngOnInit sideMenu");
  this.stubbed_username = "Gretchen Sorenson";
  this.currentLocation = SideDrawerLocation.Right;
}

  ngAfterViewInit() {
    this.drawerService.drawer = this.drawerComponent.sideDrawer;
  }

  onDrawerClosed() {
    if (app.ios) {
      var newColor = new Color("#1866a3");
      var statusBarFrame = utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarFrame;
      var StatusBarView = UIView.alloc().initWithFrame(statusBarFrame);
      StatusBarView.autoresizingMask = (UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleBottomMargin);
      StatusBarView.autoresizesSubviews = true;
      frame.topmost().ios.controller.view.superview.addSubview(StatusBarView);
      StatusBarView.backgroundColor = newColor.ios;
    }
  }

  get currentLocation(): SideDrawerLocation {
    return this._currentLocation;
  }

  set currentLocation(value: SideDrawerLocation) {
    this._currentLocation = value;
  }

  logOff() {
    this.closeSideDrawer("/login");
    this._globals.currentPage = "";
    appSettings.setNumber("isFirstTimeOpened", 0);
    this._globals.isLoggedIn = false;
    this._globals.isUnauthenticated = false;
    this._globals.isShowTouchID = false;
    this.isLoggedIn = false;
    this.isUnauthenticated = false;
    this._globals.isanonymous = true;
    this._routerExtensions.navigate(["/login"], {
      animated: false
    });
  }

  loginCheckNavigate(toPage) {
    //this.drawer.closeDrawer();
    this.closeSideDrawer("/" + toPage);
    //setTimeout(() => {
    if (this._globals.isLoggedIn) {
      this._routerExtensions.navigate(["/" + toPage], {
        animated: false
      });
    } else if (this._globals.isUnauthenticated) {
      this.showRestrictedAccessPopup();
    } else {
      this._routerExtensions.navigate(["/login"], {
        animated: false
      });
    }
    //}, 200);
  }

  directNaviagte(toPage) {
    this.closeSideDrawer("/" + toPage);

    this._routerExtensions.navigate(["/" + toPage], {
      animated: false
    });
  }

  nav() {
    this.closeSideDrawer("/login");

    if (this._globals.isLoggedIn)
      this._routerExtensions.navigate(["/happy"], {
        animated: false
      });
    else if (this._globals.isUnauthenticated)
      this.showRestrictedAccessPopup();
    else
      this._routerExtensions.navigate(["/login"], {
        animated: false
      });
  }

  showRestrictedAccessPopup() {
    let options = {
      context: {},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    this.promoModal.showModal(RestrictedAccessComponent, options).then((res) => {

    });
  }

  homeNav() {
    if (this._globals.isLoggedIn) {
      this.closeSideDrawer("/home/signedHome");
      this._routerExtensions.navigate(["/home/signedHome"], {
        animated: false
      });
    }
    else {
      this.closeSideDrawer("/home/anonymousHome");
      this._routerExtensions.navigate(["/home/anonymousHome"], {
        animated: false
      });
    }
  }

  closeSideDrawer(url) {

    // if (this._router.url.toString() === url ||
    //   this._router.url.toString() === "/login") {
    //   this.drawer.closeDrawer();
    // }

    this.drawer.closeDrawer();

  }

}
