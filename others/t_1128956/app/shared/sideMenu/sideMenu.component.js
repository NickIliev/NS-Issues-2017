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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZU1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lkZU1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBR3VCO0FBR3ZCLGdDQUErQjtBQUUvQiwwRUFBd0Y7QUFDeEYscUVBQXlJO0FBQ3pJLDZEQUF3RDtBQUN4RCxvQ0FBb0M7QUFDcEMsMENBQTBEO0FBQzFELDZEQUEyRDtBQUMzRCxrREFBb0Q7QUFDcEQsa0RBQW9EO0FBQ3BELDZGQUEyRjtBQUMzRixtRUFBNkU7QUFDN0Usc0hBQXNIO0FBQ3RILCtCQUE4QjtBQUM5QixnQ0FBa0M7QUFDbEMsbUNBQXFDO0FBV3JDLElBQWEsaUJBQWlCO0lBZ0I1QiwyQkFBb0IsaUJBQW1DLEVBQzlDLFFBQWlCLEVBQ2pCLE9BQWUsRUFDZCxtQkFBc0MsRUFDdEMsSUFBVSxFQUNWLGFBQTRCLEVBQzVCLFVBQThCLEVBQzlCLEtBQXVCO1FBUGpDLGlCQWlCQztRQWpCbUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUM5QyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFvQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDMUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7WUFDNUQsNENBQTRDO1lBQzVDLEtBQUks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Q0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNwRCxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ3ZELFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsMkNBQWUsR0FBZixVQUFnQixHQUFHO1FBRWpCLDZDQUE2QztRQUM3QyxnREFBZ0Q7UUFDaEQsK0JBQStCO1FBQy9CLElBQUk7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUFoTUQsSUFnTUM7QUE3TG9DO0lBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7OEJBQXlCLGdDQUFzQjswREFBQztBQUh2RSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDM0IsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDJCQUEyQjtLQUN6QyxDQUFDO3FDQWlCdUMsdUNBQWdCO1FBQ3BDLGdCQUFPO1FBQ1IsZUFBTTtRQUNPLHdCQUFpQjtRQUNoQyxXQUFJO1FBQ0ssOEJBQWE7UUFDaEIsNEJBQWtCO1FBQ3ZCLHVCQUFnQjtHQXZCdEIsaUJBQWlCLENBZ003QjtBQWhNWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCBzaWRlRHJhd2VyTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyXCIpO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24sIFNpZGVEcmF3ZXJMb2NhdGlvbiwgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0IH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2RyYXdlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCB9IGZyb20gXCIuLi9yZXN0cmljdGVkQWNjZXNzL3Jlc3RyaWN0ZWRBY2Nlc3MuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuLy9pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiOyBDb21tZW50ZWQgYmVjYXVzZSBubyBteSBhY2NvdW50cyAmIGZpbmQgYSBkb2NvciBpbiBzaWRlIG1lbnUgXHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCAqIGFzIGZyYW1lIGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuZGVjbGFyZSB2YXIgVUlWaWV3QXV0b3Jlc2l6aW5nRmxleGlibGVXaWR0aDogYW55O1xyXG5kZWNsYXJlIHZhciBVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZUJvdHRvbU1hcmdpbjogYW55O1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc3R5bGVVcmxzOiBbXCJzaWRlTWVudS5jc3NcIl0sXHJcbiAgc2VsZWN0b3I6IFwibWItc2lkZS1tZW51XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9zaWRlTWVudS5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWRlTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG5cclxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgLy8gcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gIHByaXZhdGUgX3NpZGVEcmF3ZXJMb2NhdGlvbjogU2lkZURyYXdlckxvY2F0aW9uO1xyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRMb2NhdGlvbjogU2lkZURyYXdlckxvY2F0aW9uO1xyXG4gIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgaXNMb2dnZWRJbjogYm9vbGVhbjtcclxuICBpc1VuYXV0aGVudGljYXRlZDogYm9vbGVhbjtcclxuICAvLyBzaWRlTWVudWRpc2FibGU6IHN0cmluZztcclxuICBwdWJsaWMgc3R1YmJlZF91c2VybmFtZTogc3RyaW5nO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcclxuICAgIHB1YmxpYyBfcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgcHJpdmF0ZSBkcmF3ZXJTZXJ2aWNlOiBEcmF3ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9tb01vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICB0aGlzLnBhZ2Uub24oXCJsb2FkZWRcIiwgdGhpcy5vbkxvYWRlZCwgdGhpcyk7XHJcbiAgICB0aGlzLnBhZ2Uub24oXCJuYXZpZ2F0ZWRUb1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZHJhd2VyU2VydmljZS5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgICAvLyAgdGhpcy5kcmF3ZXJTZXJ2aWNlLmRyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluO1xyXG4gICAgdGhpcy5pc1VuYXV0aGVudGljYXRlZCA9IHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Mb2FkZWQoKSB7XHJcbiAgICBpZiAodGhpcy5kcmF3ZXIuYW5kcm9pZCkge1xyXG4gICAgICB0aGlzLmRyYXdlci5hbmRyb2lkLnNldERyYXdlckNsb3NlVGhyZXNob2xkKDIwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdHViYmVkX3VzZXJuYW1lID0gXCJHcmV0Y2hlbiBTb3JlbnNvblwiO1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBTaWRlRHJhd2VyTG9jYXRpb24uUmlnaHQ7XHJcblxyXG4gICAgLy9Db21tZW50ZWQgYmVjYXVzZSBubyBteSBhY2NvdW50cyAmIGZpbmQgYSBkb2NvciBpbiBzaWRlIG1lbnUgXHJcbiAgICAvLyBpZiAodGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcclxuICAgIC8vICAgbGV0IEZBRGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiRkFETGF5b3V0XCIpO1xyXG4gICAgLy8gICB0aGlzLl9nbG9iYWxzLnNldElzVXNlckludGVyYWN0aW9uRW5hYmxlZFJlY3Vyc2l2ZShGQURsYXlvdXQsIGZhbHNlKTtcclxuXHJcbiAgICAvLyAgIGxldCBGaW5hbmNpYWxsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcIkZpbmFuY2lhbExheW91dFwiKTtcclxuICAgIC8vICAgdGhpcy5fZ2xvYmFscy5zZXRJc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWRSZWN1cnNpdmUoRmluYW5jaWFsbGF5b3V0LCBmYWxzZSk7XHJcbiAgICAvLyAgIHRoaXMuc2lkZU1lbnVkaXNhYmxlID0gXCJzaWRlbWVudS1pdGVtLWRpc2FibGVkXCI7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmRyYXdlclNlcnZpY2UuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcclxuICB9XHJcblxyXG4gIG9uRHJhd2VyQ2xvc2VkKCkge1xyXG4gICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgdmFyIG5ld0NvbG9yID0gbmV3IENvbG9yKFwiIzE4NjZhM1wiKTtcclxuICAgICAgdmFyIHN0YXR1c0JhckZyYW1lID0gdXRpbHMuaW9zLmdldHRlcihVSUFwcGxpY2F0aW9uLCBVSUFwcGxpY2F0aW9uLnNoYXJlZEFwcGxpY2F0aW9uKS5zdGF0dXNCYXJGcmFtZTtcclxuICAgICAgdmFyIFN0YXR1c0JhclZpZXcgPSBVSVZpZXcuYWxsb2MoKS5pbml0V2l0aEZyYW1lKHN0YXR1c0JhckZyYW1lKTtcclxuICAgICAgU3RhdHVzQmFyVmlldy5hdXRvcmVzaXppbmdNYXNrID0gKFVJVmlld0F1dG9yZXNpemluZ0ZsZXhpYmxlV2lkdGggfCBVSVZpZXdBdXRvcmVzaXppbmdGbGV4aWJsZUJvdHRvbU1hcmdpbik7XHJcbiAgICAgIFN0YXR1c0JhclZpZXcuYXV0b3Jlc2l6ZXNTdWJ2aWV3cyA9IHRydWU7XHJcbiAgICAgIGZyYW1lLnRvcG1vc3QoKS5pb3MuY29udHJvbGxlci52aWV3LnN1cGVydmlldy5hZGRTdWJ2aWV3KFN0YXR1c0JhclZpZXcpO1xyXG4gICAgICBTdGF0dXNCYXJWaWV3LmJhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yLmlvcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBjdXJyZW50TG9jYXRpb24oKTogU2lkZURyYXdlckxvY2F0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TG9jYXRpb247XHJcbiAgfVxyXG5cclxuICBzZXQgY3VycmVudExvY2F0aW9uKHZhbHVlOiBTaWRlRHJhd2VyTG9jYXRpb24pIHtcclxuICAgIHRoaXMuX2N1cnJlbnRMb2NhdGlvbiA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgbG9nT2ZmKCkge1xyXG4gICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvbG9naW5cIik7XHJcblxyXG4gICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiaXNGaXJzdFRpbWVPcGVuZWRcIiwgMCk7XHJcbiAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2dsb2JhbHMuaXNTaG93VG91Y2hJRCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gdHJ1ZTtcclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2dpbkNoZWNrTmF2aWdhdGUodG9QYWdlKSB7XHJcbiAgICAvL3RoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgICB0aGlzLmNsb3NlU2lkZURyYXdlcihcIi9cIiArIHRvUGFnZSk7XHJcbiAgICAvL3NldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9cIiArIHRvUGFnZV0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgdGhpcy5zaG93UmVzdHJpY3RlZEFjY2Vzc1BvcHVwKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xyXG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vfSwgMjAwKTtcclxuICB9XHJcblxyXG4gIGRpcmVjdE5hdmlhZ3RlKHRvUGFnZSkge1xyXG4gICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvXCIgKyB0b1BhZ2UpO1xyXG5cclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiICsgdG9QYWdlXSwge1xyXG4gICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmF2KCkge1xyXG4gICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvbG9naW5cIik7XHJcblxyXG4gICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbilcclxuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaGFwcHlcIl0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICBlbHNlIGlmICh0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkKVxyXG4gICAgICB0aGlzLnNob3dSZXN0cmljdGVkQWNjZXNzUG9wdXAoKTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIC8vQ29tbWVudGVkIGJlY2F1c2Ugbm8gIGZpbmQgYSBkb2NvciBpbiBzaWRlIG1lbnUgXHJcbiAgLy8gRkFETmF2KCkge1xyXG4gIC8vICAgaWYgKCF0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xyXG5cclxuICAvLyAgICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvbG9naW5cIik7XHJcblxyXG4gIC8vICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluKVxyXG4gIC8vICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hhcHB5XCJdLCB7XHJcbiAgLy8gICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAvLyAgICAgICB9KTtcclxuICAvLyAgICAgZWxzZSBpZiAodGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZClcclxuICAvLyAgICAgICB0aGlzLnNob3dSZXN0cmljdGVkQWNjZXNzUG9wdXAoKTtcclxuICAvLyAgICAgZWxzZVxyXG4gIC8vICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XHJcbiAgLy8gICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAvLyAgICAgICB9KTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcblxyXG4gIHNob3dSZXN0cmljdGVkQWNjZXNzUG9wdXAoKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgY29udGV4dDoge30sXHJcbiAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgIH07XHJcbiAgICB0aGlzLnByb21vTW9kYWwuc2hvd01vZGFsKFJlc3RyaWN0ZWRBY2Nlc3NDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaG9tZU5hdigpIHtcclxuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvaG9tZS9zaWduZWRIb21lXCIpO1xyXG4gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5jbG9zZVNpZGVEcmF3ZXIoXCIvaG9tZS9hbm9ueW1vdXNIb21lXCIpO1xyXG4gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL2Fub255bW91c0hvbWVcIl0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbG9zZVNpZGVEcmF3ZXIodXJsKSB7XHJcblxyXG4gICAgLy8gaWYgKHRoaXMuX3JvdXRlci51cmwudG9TdHJpbmcoKSA9PT0gdXJsIHx8XHJcbiAgICAvLyAgIHRoaXMuX3JvdXRlci51cmwudG9TdHJpbmcoKSA9PT0gXCIvbG9naW5cIikge1xyXG4gICAgLy8gICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgICBcclxuICB9XHJcblxyXG59XHJcbiJdfQ==