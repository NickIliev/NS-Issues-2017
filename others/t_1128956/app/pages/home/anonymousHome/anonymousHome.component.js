"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var global_1 = require("../../../shared/global");
var home_service_1 = require("../home.service");
var appSettings = require("application-settings");
var app = require("tns-core-modules/application");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var guideEducationPromo_component_1 = require("../../../shared/guideEducationPromo/guideEducationPromo.component");
var drawer_service_1 = require("../../../shared/services/drawer.service");
var page_1 = require("ui/page");
var AnonymousHomeComponent = (function () {
    function AnonymousHomeComponent(_router, _routerExtensions, _globals, _homeService, _changeDetectionRef, vcRef, drawerService, modalParams, page) {
        this._router = _router;
        this._routerExtensions = _routerExtensions;
        this._globals = _globals;
        this._homeService = _homeService;
        this._changeDetectionRef = _changeDetectionRef;
        this.vcRef = vcRef;
        this.drawerService = drawerService;
        this.modalParams = modalParams;
        this.page = page;
        this.isLoggedIn = false;
        this.isUnauthenticated = false;
        this.isUnauthenticatedClose = false;
        this.isanonymous = true;
        this.isAuthenticationSuccess = false;
        this.isBusy = false;
        this.showlogo = true;
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.healthyAricles = [{
                "title": "Healthy Living",
                "subtitle": "Tannings allure",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
                "category": "living",
                "imageURL": "~/images/redesign/article_healthyLiving.png",
                "titleImageURL": "~/images/redesign/healthy_living.png",
                "rowNum": 0
            },
            {
                "title": "Fitness",
                "subtitle": "Exercise program",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
                "category": "living",
                "imageURL": "~/images/redesign/article_fitness.png",
                "titleImageURL": "~/images/redesign/fitness.png",
                "rowNum": 1
            }
        ];
        this.heathyMainArticle = {
            "title": "How to design an exercise program",
            "date": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            "category": "living",
            "orderNum": 0,
            "imageURL": "~/images/Healthy_banner.png"
        };
        this.isTurnOff = false;
        this.pageStartTime = new Date().getTime();
        this.isLoggedIn = this._globals.isLoggedIn;
        this.isUnauthenticated = this._globals.isUnauthenticated;
        if (this.isUnauthenticated) {
            this.isUnauthenticatedClose = true;
        }
        if (this._globals.isTurnOff) {
            this.isTurnOff = true;
        }
        this.isanonymous = this._globals.isanonymous;
        this.isAuthenticationSuccess = this._globals.isAuthenticationSuccess;
    }
    AnonymousHomeComponent.prototype.ngOnInit = function () {
        // console.log('Anonymous Home Page : Start Time ',new Date().getTime());
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        // this._homeService.getHealthyLiving()
        //   .subscribe((data) => {
        //     this.healthyAricles = data.sub_articles;
        //     this.heathyMainArticle = data.main_article;
        //   },
        //   error => {
        //     console.dir(error)
        //   });
    };
    AnonymousHomeComponent.prototype.loadEducationContentAfterAuthenticationSuccess = function () {
        if (appSettings.getNumber("isFirstTimeOpened") === 0) {
            if (appSettings.getBoolean("isAuthenticated") && this.isLoggedIn) {
                this.showEducationContent();
                appSettings.setBoolean("isAuthenticated", false);
            }
            if (this.isLoggedIn) {
                appSettings.setNumber("isFirstTimeOpened", 1);
            }
        }
    };
    AnonymousHomeComponent.prototype.showEducationContent = function () {
        this.drawerService.enableGesture(false);
        var modalOptions = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modalParams.showModal(guideEducationPromo_component_1.GuideEducationPromoComponent, modalOptions).then(function (res) {
        });
    };
    AnonymousHomeComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectionRef.detectChanges();
        this.loadEducationContentAfterAuthenticationSuccess();
        if (appSettings.getBoolean("isFirstInstallPopup") === false) {
            // do nothing
        }
        else {
            appSettings.getBoolean("isFirstInstallPopup", true);
            this.showEducationContent();
        }
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    AnonymousHomeComponent.prototype.articleDetail = function () {
        this._routerExtensions.navigate(["/home/articleDetail"], {
            animated: false
        });
    };
    AnonymousHomeComponent.prototype.loginUser = function () {
        this._routerExtensions.navigate(["/login"], {
            animated: false
        });
    };
    AnonymousHomeComponent.prototype.registerUser = function () {
        this._routerExtensions.navigate(["/create"], {
            animated: false
        });
    };
    AnonymousHomeComponent.prototype.contactUs = function () {
        this._routerExtensions.navigate(["/contactUs"], {
            animated: false
        });
    };
    AnonymousHomeComponent.prototype.authenticateMe = function () {
        this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
            animated: false
        });
    };
    AnonymousHomeComponent.prototype.ngOnDestroy = function () {
        this._globals.isAuthenticationSuccess = false; // resetting to default state
    };
    return AnonymousHomeComponent;
}());
AnonymousHomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./anonymousHome.component.html",
        styleUrls: ["../home.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.RouterExtensions,
        global_1.Globals,
        home_service_1.HomeService,
        core_1.ChangeDetectorRef,
        core_1.ViewContainerRef,
        drawer_service_1.DrawerService,
        dialogs_1.ModalDialogService,
        page_1.Page])
], AnonymousHomeComponent);
exports.AnonymousHomeComponent = AnonymousHomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzSG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbm9ueW1vdXNIb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0SDtBQUM1SCwwQ0FBeUU7QUFDekUsc0RBQStEO0FBQy9ELGlEQUFpRDtBQUVqRCxnREFBOEM7QUFFOUMsa0RBQW9EO0FBQ3BELGtEQUFvRDtBQUNwRCxtRUFBNkU7QUFDN0UsbUhBQWlIO0FBQ2pILDBFQUF3RTtBQUN4RSxnQ0FBK0I7QUFRL0IsSUFBYSxzQkFBc0I7SUEyQ2pDLGdDQUFvQixPQUFlLEVBQ3pCLGlCQUFtQyxFQUNwQyxRQUFpQixFQUNqQixZQUF5QixFQUN4QixtQkFBc0MsRUFDdEMsS0FBdUIsRUFDdkIsYUFBNEIsRUFDNUIsV0FBK0IsRUFDaEMsSUFBVTtRQVJDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFoRG5CLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN4QyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qiw0QkFBdUIsR0FBWSxLQUFLLENBQUM7UUFDbEMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGdCQUFXLEdBQVcsQ0FBQyxDQUFD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QUNMLENBQUM7SUFFRCw2Q0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzlDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwrQ0FBYyxHQUFyQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUgsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxDQUFDLDZCQUE2QjtJQUM5RSxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBdkpELElBdUpDO0FBdkpZLHNCQUFzQjtJQU5sQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO0tBRTNCLENBQUM7cUNBNEM2QixlQUFNO1FBQ04seUJBQWdCO1FBQzFCLGdCQUFPO1FBQ0gsMEJBQVc7UUFDSCx3QkFBaUI7UUFDL0IsdUJBQWdCO1FBQ1IsOEJBQWE7UUFDZiw0QkFBa0I7UUFDMUIsV0FBSTtHQW5EUixzQkFBc0IsQ0F1SmxDO0FBdkpZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvbkVuZCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgSG9tZVNlcnZpY2UgfSBmcm9tIFwiLi4vaG9tZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFydGljbGUsIH0gZnJvbSBcIi4uL2hvbWUubW9kZWxcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2d1aWRlRWR1Y2F0aW9uUHJvbW8vZ3VpZGVFZHVjYXRpb25Qcm9tby5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vYW5vbnltb3VzSG9tZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi4vaG9tZS5jc3NcIl1cclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbm9ueW1vdXNIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBtZXNzYWdlQ291bnQ6IHN0cmluZztcclxuICBpc0xvZ2dlZEluOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaXNVbmF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBpc1VuYXV0aGVudGljYXRlZENsb3NlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaXNhbm9ueW1vdXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGlzQXV0aGVudGljYXRpb25TdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzQnVzeSA9IGZhbHNlO1xyXG4gIHNob3dsb2dvOiBib29sZWFuID0gdHJ1ZTtcclxuICBwYWdlU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xyXG4gIHBhZ2VFbmRUaW1lOiBudW1iZXIgPSAwO1xyXG4gIHBhZ2VUaW1lRGlmZmVyZW5jZTogbnVtYmVyID0gMDtcclxuXHJcbiAgaGVhbHRoeUFyaWNsZXM6IEFydGljbGVbXSA9IFt7XHJcbiAgICBcInRpdGxlXCI6IFwiSGVhbHRoeSBMaXZpbmdcIixcclxuICAgIFwic3VidGl0bGVcIjogXCJUYW5uaW5ncyBhbGx1cmVcIixcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdCBpcyBhIGxvbmcgZXN0YWJsaXNoZWQgZmFjdCB0aGF0IGEgcmVhZGVyIHdpbGwgYmUgZGlzdHJhY3RlZCBieSB0aGUgcmVhZGFibGUgY29udGVudCBvZiBhIHBhZ2UuXCIsXHJcbiAgICBcImNhdGVnb3J5XCI6IFwibGl2aW5nXCIsXHJcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vYXJ0aWNsZV9oZWFsdGh5TGl2aW5nLnBuZ1wiLFxyXG4gICAgXCJ0aXRsZUltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vaGVhbHRoeV9saXZpbmcucG5nXCIsXHJcbiAgICBcInJvd051bVwiOiAwXHJcbiAgfSxcclxuICB7XHJcbiAgICBcInRpdGxlXCI6IFwiRml0bmVzc1wiLFxyXG4gICAgXCJzdWJ0aXRsZVwiOiBcIkV4ZXJjaXNlIHByb2dyYW1cIixcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdCBpcyBhIGxvbmcgZXN0YWJsaXNoZWQgZmFjdCB0aGF0IGEgcmVhZGVyIHdpbGwgYmUgZGlzdHJhY3RlZCBieSB0aGUgcmVhZGFibGUgY29udGVudCBvZiBhIHBhZ2UuXCIsXHJcbiAgICBcImNhdGVnb3J5XCI6IFwibGl2aW5nXCIsXHJcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vYXJ0aWNsZV9maXRuZXNzLnBuZ1wiLFxyXG4gICAgXCJ0aXRsZUltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vZml0bmVzcy5wbmdcIixcclxuICAgIFwicm93TnVtXCI6IDFcclxuICB9XHJcbiAgXTtcclxuICBoZWF0aHlNYWluQXJ0aWNsZSA9IHtcclxuICAgIFwidGl0bGVcIjogXCJIb3cgdG8gZGVzaWduIGFuIGV4ZXJjaXNlIHByb2dyYW1cIixcclxuICAgIFwiZGF0ZVwiOiBcIkl0IGlzIGEgbG9uZyBlc3RhYmxpc2hlZCBmYWN0IHRoYXQgYSByZWFkZXIgd2lsbCBiZSBkaXN0cmFjdGVkIGJ5IHRoZSByZWFkYWJsZSBjb250ZW50IG9mIGEgcGFnZSB3aGVuIGxvb2tpbmcgYXQgaXRzIGxheW91dC5cIixcclxuICAgIFwiY2F0ZWdvcnlcIjogXCJsaXZpbmdcIixcclxuICAgIFwib3JkZXJOdW1cIjogMCxcclxuICAgIFwiaW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9IZWFsdGh5X2Jhbm5lci5wbmdcIlxyXG4gIH07XHJcblxyXG4gIGlzVHVybk9mZjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsXHJcbiAgICBwdWJsaWMgX2hvbWVTZXJ2aWNlOiBIb21lU2VydmljZSxcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHJpdmF0ZSBkcmF3ZXJTZXJ2aWNlOiBEcmF3ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHVibGljIHBhZ2U6IFBhZ2UpIHtcclxuICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluO1xyXG4gICAgdGhpcy5pc1VuYXV0aGVudGljYXRlZCA9IHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQ7XHJcbiAgICBpZiAodGhpcy5pc1VuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkQ2xvc2UgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XHJcbiAgICAgIHRoaXMuaXNUdXJuT2ZmID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNhbm9ueW1vdXMgPSB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzO1xyXG4gICAgdGhpcy5pc0F1dGhlbnRpY2F0aW9uU3VjY2VzcyA9IHRoaXMuX2dsb2JhbHMuaXNBdXRoZW50aWNhdGlvblN1Y2Nlc3M7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdBbm9ueW1vdXMgSG9tZSBQYWdlIDogU3RhcnQgVGltZSAnLG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgIH1cclxuICAgIC8vIHRoaXMuX2hvbWVTZXJ2aWNlLmdldEhlYWx0aHlMaXZpbmcoKVxyXG4gICAgLy8gICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAvLyAgICAgdGhpcy5oZWFsdGh5QXJpY2xlcyA9IGRhdGEuc3ViX2FydGljbGVzO1xyXG4gICAgLy8gICAgIHRoaXMuaGVhdGh5TWFpbkFydGljbGUgPSBkYXRhLm1haW5fYXJ0aWNsZTtcclxuICAgIC8vICAgfSxcclxuICAgIC8vICAgZXJyb3IgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUuZGlyKGVycm9yKVxyXG4gICAgLy8gICB9KTtcclxuICB9XHJcblxyXG5cclxuICBsb2FkRWR1Y2F0aW9uQ29udGVudEFmdGVyQXV0aGVudGljYXRpb25TdWNjZXNzKCkge1xyXG4gICAgaWYgKGFwcFNldHRpbmdzLmdldE51bWJlcihcImlzRmlyc3RUaW1lT3BlbmVkXCIpID09PSAwKSB7XHJcbiAgICAgIGlmIChhcHBTZXR0aW5ncy5nZXRCb29sZWFuKFwiaXNBdXRoZW50aWNhdGVkXCIpICYmIHRoaXMuaXNMb2dnZWRJbikge1xyXG4gICAgICAgIHRoaXMuc2hvd0VkdWNhdGlvbkNvbnRlbnQoKTtcclxuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNBdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5pc0xvZ2dlZEluKSB7XHJcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiaXNGaXJzdFRpbWVPcGVuZWRcIiwgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3dFZHVjYXRpb25Db250ZW50KCkge1xyXG4gICAgdGhpcy5kcmF3ZXJTZXJ2aWNlLmVuYWJsZUdlc3R1cmUoZmFsc2UpO1xyXG4gICAgbGV0IG1vZGFsT3B0aW9ucyA9IHtcclxuICAgICAgY29udGV4dDoge30sXHJcbiAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgIH07XHJcbiAgICB0aGlzLm1vZGFsUGFyYW1zLnNob3dNb2RhbChHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50LCBtb2RhbE9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICB0aGlzLmxvYWRFZHVjYXRpb25Db250ZW50QWZ0ZXJBdXRoZW50aWNhdGlvblN1Y2Nlc3MoKTtcclxuICAgIGlmIChhcHBTZXR0aW5ncy5nZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxQb3B1cFwiKSA9PT0gZmFsc2UpIHtcclxuICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsUG9wdXBcIiwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuc2hvd0VkdWNhdGlvbkNvbnRlbnQoKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcclxuICB9XHJcblxyXG4gIGFydGljbGVEZXRhaWwoKSB7XHJcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL2FydGljbGVEZXRhaWxcIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxvZ2luVXNlcigpIHtcclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlclVzZXIoKSB7XHJcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jcmVhdGVcIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnRhY3RVcygpIHtcclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NvbnRhY3RVc1wiXSwge1xyXG4gICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dGhlbnRpY2F0ZU1lKCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMuX2dsb2JhbHMucmVnaXN0cmF0aW9uX21vZGUsIHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eV0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZ2xvYmFscy5pc0F1dGhlbnRpY2F0aW9uU3VjY2VzcyA9IGZhbHNlOyAvLyByZXNldHRpbmcgdG8gZGVmYXVsdCBzdGF0ZVxyXG4gIH1cclxufVxyXG4iXX0=