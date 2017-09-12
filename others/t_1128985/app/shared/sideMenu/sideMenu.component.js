"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var angular_1 = require("nativescript-telerik-ui-pro/sidedrawer/angular");
var sidedrawer_1 = require("nativescript-telerik-ui-pro/sidedrawer");
var nativescript_angular_1 = require("nativescript-angular");
var global_1 = require("../global");
var router_1 = require("@angular/router");
var drawer_service_1 = require("../services/drawer.service");
var appSettings = require("application-settings");
var app = require("tns-core-modules/application");
var restrictedAccess_component_1 = require("../restrictedAccess/restrictedAccess.component");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
//import { StackLayout } from "ui/layouts/stack-layout"; Commented because no my accounts & find a docor in side menu 
var color_1 = require("color");
var frame = require("ui/frame");
var utils = require("utils/utils");
var SideMenuComponent = (function () {
    function SideMenuComponent(_routerExtensions, _globals, _router, _changeDetectionRef, page, drawerService, promoModal, vcRef) {
        var _this = this;
        this._routerExtensions = _routerExtensions;
        this._globals = _globals;
        this._router = _router;
        this._changeDetectionRef = _changeDetectionRef;
        this.page = page;
        this.drawerService = drawerService;
        this.promoModal = promoModal;
        this.vcRef = vcRef;
        this.page.on("loaded", this.onLoaded, this);
        this.page.on("navigatedTo", function () {
            _this.drawerService.drawer = _this.drawerComponent.sideDrawer;
            //  this.drawerService.drawer.closeDrawer();
            _this._changeDetectionRef.detectChanges();
        });
        this.isLoggedIn = this._globals.isLoggedIn;
        this.isUnauthenticated = this._globals.isUnauthenticated;
    }
    SideMenuComponent.prototype.onLoaded = function () {
        if (this.drawer.android) {
            this.drawer.android.setDrawerCloseThreshold(20);
        }
    };
    SideMenuComponent.prototype.ngOnInit = function () {
        this.stubbed_username = "Gretchen Sorenson";
        this.drawer = this.drawerComponent.sideDrawer;
        this.currentLocation = sidedrawer_1.SideDrawerLocation.Right;
        //Commented because no my accounts & find a docor in side menu 
        // if (this._globals.isTurnOff) {
        //   let FADlayout: StackLayout = <StackLayout>this.page.getViewById("FADLayout");
        //   this._globals.setIsUserInteractionEnabledRecursive(FADlayout, false);
        //   let Financiallayout: StackLayout = <StackLayout>this.page.getViewById("FinancialLayout");
        //   this._globals.setIsUserInteractionEnabledRecursive(Financiallayout, false);
        //   this.sideMenudisable = "sidemenu-item-disabled";
        // }
    };
    SideMenuComponent.prototype.ngAfterViewInit = function () {
        this.drawerService.drawer = this.drawerComponent.sideDrawer;
    };
    SideMenuComponent.prototype.onDrawerClosed = function () {
        if (app.ios) {
            var newColor = new color_1.Color("#1866a3");
            var statusBarFrame = utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarFrame;
            var StatusBarView = UIView.alloc().initWithFrame(statusBarFrame);
            StatusBarView.autoresizingMask = (UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleBottomMargin);
            StatusBarView.autoresizesSubviews = true;
            frame.topmost().ios.controller.view.superview.addSubview(StatusBarView);
            StatusBarView.backgroundColor = newColor.ios;
        }
    };
    Object.defineProperty(SideMenuComponent.prototype, "currentLocation", {
        get: function () {
            return this._currentLocation;
        },
        set: function (value) {
            this._currentLocation = value;
        },
        enumerable: true,
        configurable: true
    });
    SideMenuComponent.prototype.logOff = function () {
        this.closeSideDrawer("/login");
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
    };
    SideMenuComponent.prototype.loginCheckNavigate = function (toPage) {
        //this.drawer.closeDrawer();
        this.closeSideDrawer("/" + toPage);
        //setTimeout(() => {
        if (this._globals.isLoggedIn) {
            this._routerExtensions.navigate(["/" + toPage], {
                animated: false
            });
        }
        else if (this._globals.isUnauthenticated) {
            this.showRestrictedAccessPopup();
        }
        else {
            this._routerExtensions.navigate(["/login"], {
                animated: false
            });
        }
        //}, 200);
    };
    SideMenuComponent.prototype.directNaviagte = function (toPage) {
        this.closeSideDrawer("/" + toPage);
        this._routerExtensions.navigate(["/" + toPage], {
            animated: false
        });
    };
    SideMenuComponent.prototype.nav = function () {
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
    };
    //Commented because no  find a docor in side menu 
    // FADNav() {
    //   if (!this._globals.isTurnOff) {
    //     this.closeSideDrawer("/login");
    //     if (this._globals.isLoggedIn)
    //       this._routerExtensions.navigate(["/happy"], {
    //         animated: false
    //       });
    //     else if (this._globals.isUnauthenticated)
    //       this.showRestrictedAccessPopup();
    //     else
    //       this._routerExtensions.navigate(["/login"], {
    //         animated: false
    //       });
    //   }
    // }
    SideMenuComponent.prototype.showRestrictedAccessPopup = function () {
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.promoModal.showModal(restrictedAccess_component_1.RestrictedAccessComponent, options).then(function (res) {
        });
    };
    SideMenuComponent.prototype.homeNav = function () {
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
    };
    SideMenuComponent.prototype.closeSideDrawer = function (url) {
        // if (this._router.url.toString() === url ||
        //   this._router.url.toString() === "/login") {
        //   this.drawer.closeDrawer();
        // }
        this.drawer.closeDrawer();
    };
    return SideMenuComponent;
}());
__decorate([
    core_1.ViewChild(angular_1.RadSideDrawerComponent),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], SideMenuComponent.prototype, "drawerComponent", void 0);
SideMenuComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        styleUrls: ["sideMenu.css"],
        selector: "mb-side-menu",
        templateUrl: "./sideMenu.component.html"
    }),
    __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions,
        global_1.Globals,
        router_1.Router,
        core_1.ChangeDetectorRef,
        page_1.Page,
        drawer_service_1.DrawerService,
        dialogs_1.ModalDialogService,
        core_1.ViewContainerRef])
], SideMenuComponent);
exports.SideMenuComponent = SideMenuComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZU1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lkZU1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBR3VCO0FBR3ZCLGdDQUErQjtBQUUvQiwwRUFBd0Y7QUFDeEYscUVBQXlJO0FBQ3pJLDZEQUF3RDtBQUN4RCxvQ0FBb0M7QUFDcEMsMENBQTBEO0FBQzFELDZEQUEyRDtBQUMzRCxrREFBb0Q7QUFDcEQsa0RBQW9EO0FBQ3BELDZGQUEyRjtBQUMzRixtRUFBNkU7QUFDN0Usc0hBQXNIO0FBQ3RILCtCQUE4QjtBQUM5QixnQ0FBa0M7QUFDbEMsbUNBQXFDO0FBV3JDLElBQWEsaUJBQWlCO0lBZ0I1QiwyQkFBb0IsaUJBQW1DLEVBQzlDLFFBQWlCLEVBQ2pCLE9BQWUsRUFDZCxtQkFBc0MsRUFDdEMsSUFBVSxFQUNWLGFBQTRCLEVBQzVCLFVBQThCLEVBQzlCLEtBQXVCO1FBUGpDLGlCQWlCQztRQWpCbUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUM5QyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFvQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDMUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7WUFDNUQsNENBQTRDO1lBQzVDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7SUFDM0QsQ0FBQztJQUVNLG9DQUFRLEdBQWY7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNILENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLGVBQWUsR0FBRywrQkFBa0IsQ0FBQyxLQUFLLENBQUM7UUFFaEQsK0RBQStEO1FBQy9ELGlDQUFpQztRQUNqQyxrRkFBa0Y7UUFDbEYsMEVBQTBFO1FBRTFFLDhGQUE4RjtRQUM5RixnRkFBZ0Y7UUFDaEYscURBQXFEO1FBQ3JELElBQUk7SUFDTixDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO0lBQzlELENBQUM7SUFFRCwwQ0FBYyxHQUFkO1FBQ0UsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ3JHLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakUsYUFBYSxDQUFDLGdCQUFnQixHQUFHLENBQUMsK0JBQStCLEdBQUcsc0NBQXNDLENBQUMsQ0FBQztZQUM1RyxhQUFhLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3hFLGFBQWEsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMvQyxDQUFDO0lBQ0gsQ0FBQztJQUVELHNCQUFJLDhDQUFlO2FBQW5CO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDO2FBRUQsVUFBb0IsS0FBeUI7WUFDM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDOzs7T0FKQTtJQU1ELGtDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUMsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhDQUFrQixHQUFsQixVQUFtQixNQUFNO1FBQ3ZCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNuQyxvQkFBb0I7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEVBQUU7Z0JBQzlDLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMxQyxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsVUFBVTtJQUNaLENBQUM7SUFFRCwwQ0FBYyxHQUFkLFVBQWUsTUFBTTtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFO1lBQzlDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQkFBRyxHQUFIO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzFDLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ25DLElBQUk7WUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzFDLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxrREFBa0Q7SUFDbEQsYUFBYTtJQUNiLG9DQUFvQztJQUVwQyxzQ0FBc0M7SUFFdEMsb0NBQW9DO0lBQ3BDLHNEQUFzRDtJQUN0RCwwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLGdEQUFnRDtJQUNoRCwwQ0FBMEM7SUFDMUMsV0FBVztJQUNYLHNEQUFzRDtJQUN0RCwwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLE1BQU07SUFDTixJQUFJO0lBRUoscURBQXlCLEdBQXpCO1FBQ0UsSUFBSSxPQUFPLEdBQUc7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQzdCLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxzREFBeUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1FBRXZFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFPLEdBQVA7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNwRCxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ3ZELFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsMkNBQWUsR0FBZixVQUFnQixHQUFHO1FBRWpCLDZDQUE2QztRQUM3QyxnREFBZ0Q7UUFDaEQsK0JBQStCO1FBQy9CLElBQUk7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUFoTUQsSUFnTUM7QUE3TG9DO0lBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7OEJBQXlCLGdDQUFzQjswREFBQztBQUh2RSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDM0IsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDJCQUEyQjtLQUN6QyxDQUFDO3FDQWlCdUMsdUNBQWdCO1FBQ3BDLGdCQUFPO1FBQ1IsZUFBTTtRQUNPLHdCQUFpQjtRQUNoQyxXQUFJO1FBQ0ssOEJBQWE7UUFDaEIsNEJBQWtCO1FBQ3ZCLHVCQUFnQjtHQXZCdEIsaUJBQWlCLENBZ003QjtBQWhNWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG4gIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHNpZGVEcmF3ZXJNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL3NpZGVkcmF3ZXJcIik7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uLCBTaWRlRHJhd2VyTG9jYXRpb24sIFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4uL3Jlc3RyaWN0ZWRBY2Nlc3MvcmVzdHJpY3RlZEFjY2Vzcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbi8vaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjsgQ29tbWVudGVkIGJlY2F1c2Ugbm8gbXkgYWNjb3VudHMgJiBmaW5kIGEgZG9jb3IgaW4gc2lkZSBtZW51IFxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCAqIGFzIGZyYW1lIGZyb20gXCJ1aS9mcmFtZVwiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XG5kZWNsYXJlIHZhciBVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZVdpZHRoOiBhbnk7XG5kZWNsYXJlIHZhciBVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZUJvdHRvbU1hcmdpbjogYW55O1xuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzdHlsZVVybHM6IFtcInNpZGVNZW51LmNzc1wiXSxcbiAgc2VsZWN0b3I6IFwibWItc2lkZS1tZW51XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vc2lkZU1lbnUuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBTaWRlTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cblxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIC8vIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgcHJpdmF0ZSBfc2lkZURyYXdlckxvY2F0aW9uOiBTaWRlRHJhd2VyTG9jYXRpb247XG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xuICBwcml2YXRlIF9jdXJyZW50TG9jYXRpb246IFNpZGVEcmF3ZXJMb2NhdGlvbjtcbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuXG4gIGlzTG9nZ2VkSW46IGJvb2xlYW47XG4gIGlzVW5hdXRoZW50aWNhdGVkOiBib29sZWFuO1xuICAvLyBzaWRlTWVudWRpc2FibGU6IHN0cmluZztcbiAgcHVibGljIHN0dWJiZWRfdXNlcm5hbWU6IHN0cmluZztcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxuICAgIHB1YmxpYyBfcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBkcmF3ZXJTZXJ2aWNlOiBEcmF3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcHJvbW9Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgdGhpcy5vbkxvYWRlZCwgdGhpcyk7XG4gICAgdGhpcy5wYWdlLm9uKFwibmF2aWdhdGVkVG9cIiwgKCkgPT4ge1xuICAgICAgdGhpcy5kcmF3ZXJTZXJ2aWNlLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gICAgICAvLyAgdGhpcy5kcmF3ZXJTZXJ2aWNlLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXNMb2dnZWRJbiA9IHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbjtcbiAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkID0gdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZDtcbiAgfVxuXG4gIHB1YmxpYyBvbkxvYWRlZCgpIHtcbiAgICBpZiAodGhpcy5kcmF3ZXIuYW5kcm9pZCkge1xuICAgICAgdGhpcy5kcmF3ZXIuYW5kcm9pZC5zZXREcmF3ZXJDbG9zZVRocmVzaG9sZCgyMCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdHViYmVkX3VzZXJuYW1lID0gXCJHcmV0Y2hlbiBTb3JlbnNvblwiO1xuICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IFNpZGVEcmF3ZXJMb2NhdGlvbi5SaWdodDtcblxuICAgIC8vQ29tbWVudGVkIGJlY2F1c2Ugbm8gbXkgYWNjb3VudHMgJiBmaW5kIGEgZG9jb3IgaW4gc2lkZSBtZW51IFxuICAgIC8vIGlmICh0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xuICAgIC8vICAgbGV0IEZBRGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiRkFETGF5b3V0XCIpO1xuICAgIC8vICAgdGhpcy5fZ2xvYmFscy5zZXRJc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWRSZWN1cnNpdmUoRkFEbGF5b3V0LCBmYWxzZSk7XG5cbiAgICAvLyAgIGxldCBGaW5hbmNpYWxsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcIkZpbmFuY2lhbExheW91dFwiKTtcbiAgICAvLyAgIHRoaXMuX2dsb2JhbHMuc2V0SXNVc2VySW50ZXJhY3Rpb25FbmFibGVkUmVjdXJzaXZlKEZpbmFuY2lhbGxheW91dCwgZmFsc2UpO1xuICAgIC8vICAgdGhpcy5zaWRlTWVudWRpc2FibGUgPSBcInNpZGVtZW51LWl0ZW0tZGlzYWJsZWRcIjtcbiAgICAvLyB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcmF3ZXJTZXJ2aWNlLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gIH1cblxuICBvbkRyYXdlckNsb3NlZCgpIHtcbiAgICBpZiAoYXBwLmlvcykge1xuICAgICAgdmFyIG5ld0NvbG9yID0gbmV3IENvbG9yKFwiIzE4NjZhM1wiKTtcbiAgICAgIHZhciBzdGF0dXNCYXJGcmFtZSA9IHV0aWxzLmlvcy5nZXR0ZXIoVUlBcHBsaWNhdGlvbiwgVUlBcHBsaWNhdGlvbi5zaGFyZWRBcHBsaWNhdGlvbikuc3RhdHVzQmFyRnJhbWU7XG4gICAgICB2YXIgU3RhdHVzQmFyVmlldyA9IFVJVmlldy5hbGxvYygpLmluaXRXaXRoRnJhbWUoc3RhdHVzQmFyRnJhbWUpO1xuICAgICAgU3RhdHVzQmFyVmlldy5hdXRvcmVzaXppbmdNYXNrID0gKFVJVmlld0F1dG9yZXNpemluZ0ZsZXhpYmxlV2lkdGggfCBVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZUJvdHRvbU1hcmdpbik7XG4gICAgICBTdGF0dXNCYXJWaWV3LmF1dG9yZXNpemVzU3Vidmlld3MgPSB0cnVlO1xuICAgICAgZnJhbWUudG9wbW9zdCgpLmlvcy5jb250cm9sbGVyLnZpZXcuc3VwZXJ2aWV3LmFkZFN1YnZpZXcoU3RhdHVzQmFyVmlldyk7XG4gICAgICBTdGF0dXNCYXJWaWV3LmJhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yLmlvcztcbiAgICB9XG4gIH1cblxuICBnZXQgY3VycmVudExvY2F0aW9uKCk6IFNpZGVEcmF3ZXJMb2NhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRMb2NhdGlvbjtcbiAgfVxuXG4gIHNldCBjdXJyZW50TG9jYXRpb24odmFsdWU6IFNpZGVEcmF3ZXJMb2NhdGlvbikge1xuICAgIHRoaXMuX2N1cnJlbnRMb2NhdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgbG9nT2ZmKCkge1xuICAgIHRoaXMuY2xvc2VTaWRlRHJhd2VyKFwiL2xvZ2luXCIpO1xuXG4gICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiaXNGaXJzdFRpbWVPcGVuZWRcIiwgMCk7XG4gICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XG4gICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2dsb2JhbHMuaXNTaG93VG91Y2hJRCA9IGZhbHNlO1xuICAgIHRoaXMuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgIHRoaXMuaXNVbmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gdHJ1ZTtcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICBsb2dpbkNoZWNrTmF2aWdhdGUodG9QYWdlKSB7XG4gICAgLy90aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIHRoaXMuY2xvc2VTaWRlRHJhd2VyKFwiL1wiICsgdG9QYWdlKTtcbiAgICAvL3NldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4pIHtcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiICsgdG9QYWdlXSwge1xuICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCkge1xuICAgICAgdGhpcy5zaG93UmVzdHJpY3RlZEFjY2Vzc1BvcHVwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vfSwgMjAwKTtcbiAgfVxuXG4gIGRpcmVjdE5hdmlhZ3RlKHRvUGFnZSkge1xuICAgIHRoaXMuY2xvc2VTaWRlRHJhd2VyKFwiL1wiICsgdG9QYWdlKTtcblxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiICsgdG9QYWdlXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICBuYXYoKSB7XG4gICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvbG9naW5cIik7XG5cbiAgICBpZiAodGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluKVxuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaGFwcHlcIl0sIHtcbiAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICBlbHNlIGlmICh0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkKVxuICAgICAgdGhpcy5zaG93UmVzdHJpY3RlZEFjY2Vzc1BvcHVwKCk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICB9KTtcbiAgfVxuICAvL0NvbW1lbnRlZCBiZWNhdXNlIG5vICBmaW5kIGEgZG9jb3IgaW4gc2lkZSBtZW51IFxuICAvLyBGQUROYXYoKSB7XG4gIC8vICAgaWYgKCF0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xuXG4gIC8vICAgICB0aGlzLmNsb3NlU2lkZURyYXdlcihcIi9sb2dpblwiKTtcblxuICAvLyAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbilcbiAgLy8gICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaGFwcHlcIl0sIHtcbiAgLy8gICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgICBlbHNlIGlmICh0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkKVxuICAvLyAgICAgICB0aGlzLnNob3dSZXN0cmljdGVkQWNjZXNzUG9wdXAoKTtcbiAgLy8gICAgIGVsc2VcbiAgLy8gICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgLy8gICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgc2hvd1Jlc3RyaWN0ZWRBY2Nlc3NQb3B1cCgpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICB9O1xuICAgIHRoaXMucHJvbW9Nb2RhbC5zaG93TW9kYWwoUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCwgb3B0aW9ucykudGhlbigocmVzKSA9PiB7XG5cbiAgICB9KTtcbiAgfVxuXG4gIGhvbWVOYXYoKSB7XG4gICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbikge1xuICAgICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvaG9tZS9zaWduZWRIb21lXCIpO1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvaG9tZS9hbm9ueW1vdXNIb21lXCIpO1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9hbm9ueW1vdXNIb21lXCJdLCB7XG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VTaWRlRHJhd2VyKHVybCkge1xuXG4gICAgLy8gaWYgKHRoaXMuX3JvdXRlci51cmwudG9TdHJpbmcoKSA9PT0gdXJsIHx8XG4gICAgLy8gICB0aGlzLl9yb3V0ZXIudXJsLnRvU3RyaW5nKCkgPT09IFwiL2xvZ2luXCIpIHtcbiAgICAvLyAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgLy8gfVxuICAgIFxuICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICBcbiAgfVxuXG59XG4iXX0=