"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var aboutapp_service_1 = require("../aboutapp.service");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var global_1 = require("../../../shared/global");
var PolicyComponent = (function () {
    function PolicyComponent(globals, _routerExtensions, aboutAppService, page) {
        this.globals = globals;
        this._routerExtensions = _routerExtensions;
        this.aboutAppService = aboutAppService;
        this.page = page;
        this.title = "Privacy Policy";
    }
    PolicyComponent.prototype.ngOnInit = function () {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
            this.privacyGrid.nativeElement.height = "560";
        }
        this.privacyHtmlString = this.aboutAppService.getPrivacyPolicy().html1;
    };
    PolicyComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    return PolicyComponent;
}());
__decorate([
    core_1.ViewChild("privacyGrid"),
    __metadata("design:type", core_1.ElementRef)
], PolicyComponent.prototype, "privacyGrid", void 0);
PolicyComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./policy.component.html",
        styleUrls: ["../about.css"]
    }),
    __metadata("design:paramtypes", [global_1.Globals, router_1.RouterExtensions,
        aboutapp_service_1.AboutAppService,
        page_1.Page])
], PolicyComponent);
exports.PolicyComponent = PolicyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvbGljeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQStEO0FBRS9ELHdEQUFzRDtBQUN0RCxnQ0FBK0I7QUFDL0Isa0RBQW9EO0FBQ3BELGlEQUFpRDtBQVFqRCxJQUFhLGVBQWU7SUFNeEIseUJBQW1CLE9BQWdCLEVBQVUsaUJBQW1DLEVBQ3BFLGVBQWdDLEVBQ2hDLElBQVU7UUFGSCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNwRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1lBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEQsQ0FBQztRQUdELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQzNFLENBQUM7SUFDTSxnQ0FBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF2QjZCO0lBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDOzhCQUFjLGlCQUFVO29EQUFDO0FBRnpDLGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztLQUM5QixDQUFDO3FDQVE4QixnQkFBTyxFQUE2Qix5QkFBZ0I7UUFDbkQsa0NBQWU7UUFDMUIsV0FBSTtHQVJiLGVBQWUsQ0F5QjNCO0FBekJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBYm91dEFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vYWJvdXRhcHAuc2VydmljZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcG9saWN5LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuLi9hYm91dC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBQb2xpY3lDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZChcInByaXZhY3lHcmlkXCIpIHByaXZhY3lHcmlkOiBFbGVtZW50UmVmO1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwcml2YWN5SHRtbFN0cmluZzogc3RyaW5nO1xuICAgIHB1YmxpYyBpc1VzZXJMb2dnZWRJbjogQm9vbGVhbjtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2xvYmFsczogR2xvYmFscywgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBhYm91dEFwcFNlcnZpY2U6IEFib3V0QXBwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBcIlByaXZhY3kgUG9saWN5XCI7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlzVXNlckxvZ2dlZEluID0gdGhpcy5nbG9iYWxzLmlzTG9nZ2VkSW47XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XG4gICAgICAgICAgICB0aGlzLnByaXZhY3lHcmlkLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gXCI1NjBcIjtcbiAgICAgICAgfVxuICAgICAgIFxuXG4gICAgICAgIHRoaXMucHJpdmFjeUh0bWxTdHJpbmcgPSB0aGlzLmFib3V0QXBwU2VydmljZS5nZXRQcml2YWN5UG9saWN5KCkuaHRtbDE7XG4gICAgfVxuICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxufVxuXG4iXX0=