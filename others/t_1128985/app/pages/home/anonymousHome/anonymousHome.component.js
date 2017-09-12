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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzSG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbm9ueW1vdXNIb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0SDtBQUM1SCwwQ0FBeUU7QUFDekUsc0RBQStEO0FBQy9ELGlEQUFpRDtBQUVqRCxnREFBOEM7QUFFOUMsa0RBQW9EO0FBQ3BELGtEQUFvRDtBQUNwRCxtRUFBNkU7QUFDN0UsbUhBQWlIO0FBQ2pILDBFQUF3RTtBQUN4RSxnQ0FBK0I7QUFRL0IsSUFBYSxzQkFBc0I7SUEyQ2pDLGdDQUFvQixPQUFlLEVBQ3pCLGlCQUFtQyxFQUNwQyxRQUFpQixFQUNqQixZQUF5QixFQUN4QixtQkFBc0MsRUFDdEMsS0FBdUIsRUFDdkIsYUFBNEIsRUFDNUIsV0FBK0IsRUFDaEMsSUFBVTtRQVJDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFoRG5CLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN4QyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qiw0QkFBdUIsR0FBWSxLQUFLLENBQUM7UUFDbEMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGdCQUFXLEdBQVcsQ0FBQyxDQUFD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QUNMLENBQUM7SUFFRCw2Q0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzlDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwrQ0FBYyxHQUFyQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUgsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxDQUFDLDZCQUE2QjtJQUM5RSxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBdkpELElBdUpDO0FBdkpZLHNCQUFzQjtJQU5sQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO0tBRTNCLENBQUM7cUNBNEM2QixlQUFNO1FBQ04seUJBQWdCO1FBQzFCLGdCQUFPO1FBQ0gsMEJBQVc7UUFDSCx3QkFBaUI7UUFDL0IsdUJBQWdCO1FBQ1IsOEJBQWE7UUFDZiw0QkFBa0I7UUFDMUIsV0FBSTtHQW5EUixzQkFBc0IsQ0F1SmxDO0FBdkpZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25FbmQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBIb21lU2VydmljZSB9IGZyb20gXCIuLi9ob21lLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFydGljbGUsIH0gZnJvbSBcIi4uL2hvbWUubW9kZWxcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9ndWlkZUVkdWNhdGlvblByb21vL2d1aWRlRWR1Y2F0aW9uUHJvbW8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2Fub255bW91c0hvbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuLi9ob21lLmNzc1wiXVxuXG59KVxuZXhwb3J0IGNsYXNzIEFub255bW91c0hvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgbWVzc2FnZUNvdW50OiBzdHJpbmc7XG4gIGlzTG9nZ2VkSW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNVbmF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNVbmF1dGhlbnRpY2F0ZWRDbG9zZTogYm9vbGVhbiA9IGZhbHNlO1xuICBpc2Fub255bW91czogYm9vbGVhbiA9IHRydWU7XG4gIGlzQXV0aGVudGljYXRpb25TdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc0J1c3kgPSBmYWxzZTtcbiAgc2hvd2xvZ286IGJvb2xlYW4gPSB0cnVlO1xuICBwYWdlU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xuICBwYWdlRW5kVGltZTogbnVtYmVyID0gMDtcbiAgcGFnZVRpbWVEaWZmZXJlbmNlOiBudW1iZXIgPSAwO1xuXG4gIGhlYWx0aHlBcmljbGVzOiBBcnRpY2xlW10gPSBbe1xuICAgIFwidGl0bGVcIjogXCJIZWFsdGh5IExpdmluZ1wiLFxuICAgIFwic3VidGl0bGVcIjogXCJUYW5uaW5ncyBhbGx1cmVcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSXQgaXMgYSBsb25nIGVzdGFibGlzaGVkIGZhY3QgdGhhdCBhIHJlYWRlciB3aWxsIGJlIGRpc3RyYWN0ZWQgYnkgdGhlIHJlYWRhYmxlIGNvbnRlbnQgb2YgYSBwYWdlLlwiLFxuICAgIFwiY2F0ZWdvcnlcIjogXCJsaXZpbmdcIixcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vYXJ0aWNsZV9oZWFsdGh5TGl2aW5nLnBuZ1wiLFxuICAgIFwidGl0bGVJbWFnZVVSTFwiOiBcIn4vaW1hZ2VzL3JlZGVzaWduL2hlYWx0aHlfbGl2aW5nLnBuZ1wiLFxuICAgIFwicm93TnVtXCI6IDBcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJGaXRuZXNzXCIsXG4gICAgXCJzdWJ0aXRsZVwiOiBcIkV4ZXJjaXNlIHByb2dyYW1cIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSXQgaXMgYSBsb25nIGVzdGFibGlzaGVkIGZhY3QgdGhhdCBhIHJlYWRlciB3aWxsIGJlIGRpc3RyYWN0ZWQgYnkgdGhlIHJlYWRhYmxlIGNvbnRlbnQgb2YgYSBwYWdlLlwiLFxuICAgIFwiY2F0ZWdvcnlcIjogXCJsaXZpbmdcIixcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vYXJ0aWNsZV9maXRuZXNzLnBuZ1wiLFxuICAgIFwidGl0bGVJbWFnZVVSTFwiOiBcIn4vaW1hZ2VzL3JlZGVzaWduL2ZpdG5lc3MucG5nXCIsXG4gICAgXCJyb3dOdW1cIjogMVxuICB9XG4gIF07XG4gIGhlYXRoeU1haW5BcnRpY2xlID0ge1xuICAgIFwidGl0bGVcIjogXCJIb3cgdG8gZGVzaWduIGFuIGV4ZXJjaXNlIHByb2dyYW1cIixcbiAgICBcImRhdGVcIjogXCJJdCBpcyBhIGxvbmcgZXN0YWJsaXNoZWQgZmFjdCB0aGF0IGEgcmVhZGVyIHdpbGwgYmUgZGlzdHJhY3RlZCBieSB0aGUgcmVhZGFibGUgY29udGVudCBvZiBhIHBhZ2Ugd2hlbiBsb29raW5nIGF0IGl0cyBsYXlvdXQuXCIsXG4gICAgXCJjYXRlZ29yeVwiOiBcImxpdmluZ1wiLFxuICAgIFwib3JkZXJOdW1cIjogMCxcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvSGVhbHRoeV9iYW5uZXIucG5nXCJcbiAgfTtcblxuICBpc1R1cm5PZmY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcbiAgICBwdWJsaWMgX2hvbWVTZXJ2aWNlOiBIb21lU2VydmljZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBkcmF3ZXJTZXJ2aWNlOiBEcmF3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kYWxQYXJhbXM6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICBwdWJsaWMgcGFnZTogUGFnZSkge1xuICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuaXNMb2dnZWRJbiA9IHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbjtcbiAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkID0gdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZDtcbiAgICBpZiAodGhpcy5pc1VuYXV0aGVudGljYXRlZCkge1xuICAgICAgdGhpcy5pc1VuYXV0aGVudGljYXRlZENsb3NlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XG4gICAgICB0aGlzLmlzVHVybk9mZiA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaXNhbm9ueW1vdXMgPSB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzO1xuICAgIHRoaXMuaXNBdXRoZW50aWNhdGlvblN1Y2Nlc3MgPSB0aGlzLl9nbG9iYWxzLmlzQXV0aGVudGljYXRpb25TdWNjZXNzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ0Fub255bW91cyBIb21lIFBhZ2UgOiBTdGFydCBUaW1lICcsbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XG4gICAgfVxuICAgIC8vIHRoaXMuX2hvbWVTZXJ2aWNlLmdldEhlYWx0aHlMaXZpbmcoKVxuICAgIC8vICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgIC8vICAgICB0aGlzLmhlYWx0aHlBcmljbGVzID0gZGF0YS5zdWJfYXJ0aWNsZXM7XG4gICAgLy8gICAgIHRoaXMuaGVhdGh5TWFpbkFydGljbGUgPSBkYXRhLm1haW5fYXJ0aWNsZTtcbiAgICAvLyAgIH0sXG4gICAgLy8gICBlcnJvciA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUuZGlyKGVycm9yKVxuICAgIC8vICAgfSk7XG4gIH1cblxuXG4gIGxvYWRFZHVjYXRpb25Db250ZW50QWZ0ZXJBdXRoZW50aWNhdGlvblN1Y2Nlc3MoKSB7XG4gICAgaWYgKGFwcFNldHRpbmdzLmdldE51bWJlcihcImlzRmlyc3RUaW1lT3BlbmVkXCIpID09PSAwKSB7XG4gICAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzQXV0aGVudGljYXRlZFwiKSAmJiB0aGlzLmlzTG9nZ2VkSW4pIHtcbiAgICAgICAgdGhpcy5zaG93RWR1Y2F0aW9uQ29udGVudCgpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNBdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzTG9nZ2VkSW4pIHtcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiaXNGaXJzdFRpbWVPcGVuZWRcIiwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvd0VkdWNhdGlvbkNvbnRlbnQoKSB7XG4gICAgdGhpcy5kcmF3ZXJTZXJ2aWNlLmVuYWJsZUdlc3R1cmUoZmFsc2UpO1xuICAgIGxldCBtb2RhbE9wdGlvbnMgPSB7XG4gICAgICBjb250ZXh0OiB7fSxcbiAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXG4gICAgfTtcbiAgICB0aGlzLm1vZGFsUGFyYW1zLnNob3dNb2RhbChHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50LCBtb2RhbE9wdGlvbnMpLnRoZW4ocmVzID0+IHtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgdGhpcy5sb2FkRWR1Y2F0aW9uQ29udGVudEFmdGVyQXV0aGVudGljYXRpb25TdWNjZXNzKCk7XG4gICAgaWYgKGFwcFNldHRpbmdzLmdldEJvb2xlYW4oXCJpc0ZpcnN0SW5zdGFsbFBvcHVwXCIpID09PSBmYWxzZSkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBTZXR0aW5ncy5nZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxQb3B1cFwiLCB0cnVlKTtcbiAgICAgIHRoaXMuc2hvd0VkdWNhdGlvbkNvbnRlbnQoKTtcbiAgICB9XG4gICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgfVxuXG4gIGFydGljbGVEZXRhaWwoKSB7XG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9hcnRpY2xlRGV0YWlsXCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIGxvZ2luVXNlcigpIHtcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICByZWdpc3RlclVzZXIoKSB7XG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlXCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnRhY3RVcygpIHtcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jb250YWN0VXNcIl0sIHtcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGF1dGhlbnRpY2F0ZU1lKCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcGVyc29uYWxfaW5mb1wiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHldLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2dsb2JhbHMuaXNBdXRoZW50aWNhdGlvblN1Y2Nlc3MgPSBmYWxzZTsgLy8gcmVzZXR0aW5nIHRvIGRlZmF1bHQgc3RhdGVcbiAgfVxufVxuIl19