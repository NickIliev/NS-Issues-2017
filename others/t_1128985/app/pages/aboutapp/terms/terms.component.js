"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var aboutapp_service_1 = require("../aboutapp.service");
var global_1 = require("../../../shared/global");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var TermsComponent = (function () {
    function TermsComponent(globals, _routerExtensions, aboutAppService, page) {
        this.globals = globals;
        this._routerExtensions = _routerExtensions;
        this.aboutAppService = aboutAppService;
        this.page = page;
        this.title = "Terms & Conditions";
    }
    TermsComponent.prototype.ngOnInit = function () {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
            this.termsGrid.nativeElement.height = "560";
        }
        this.termsHtmlString = this.aboutAppService.getTerms().html1;
    };
    TermsComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    return TermsComponent;
}());
__decorate([
    core_1.ViewChild("termsGrid"),
    __metadata("design:type", core_1.ElementRef)
], TermsComponent.prototype, "termsGrid", void 0);
TermsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./terms.component.html",
        styleUrls: ["../about.css"]
    }),
    __metadata("design:paramtypes", [global_1.Globals, router_1.RouterExtensions,
        aboutapp_service_1.AboutAppService,
        page_1.Page])
], TermsComponent);
exports.TermsComponent = TermsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVybXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLHNEQUErRDtBQUUvRCx3REFBc0Q7QUFDdEQsaURBQWlEO0FBQ2pELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSxjQUFjO0lBTXZCLHdCQUFtQixPQUFnQixFQUFVLGlCQUFtQyxFQUNwRSxlQUFnQyxFQUNoQyxJQUFVO1FBRkgsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDcEUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hELENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2pFLENBQUM7SUFFTSwrQkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF0QjJCO0lBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDOzhCQUFZLGlCQUFVO2lEQUFDO0FBRnJDLGNBQWM7SUFOMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztLQUM5QixDQUFDO3FDQVE4QixnQkFBTyxFQUE2Qix5QkFBZ0I7UUFDbkQsa0NBQWU7UUFDMUIsV0FBSTtHQVJiLGNBQWMsQ0F3QjFCO0FBeEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBYm91dEFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vYWJvdXRhcHAuc2VydmljZVwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVybXMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4uL2Fib3V0LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFRlcm1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoXCJ0ZXJtc0dyaWRcIikgdGVybXNHcmlkOiBFbGVtZW50UmVmO1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyB0ZXJtc0h0bWxTdHJpbmc6IHN0cmluZztcbiAgICBwdWJsaWMgaXNVc2VyTG9nZ2VkSW46IEJvb2xlYW47XG4gICAgY29uc3RydWN0b3IocHVibGljIGdsb2JhbHM6IEdsb2JhbHMsIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgYWJvdXRBcHBTZXJ2aWNlOiBBYm91dEFwcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJUZXJtcyAmIENvbmRpdGlvbnNcIjtcbiAgICB9XG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNVc2VyTG9nZ2VkSW4gPSB0aGlzLmdsb2JhbHMuaXNMb2dnZWRJbjtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgICAgIHRoaXMudGVybXNHcmlkLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gXCI1NjBcIjtcbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy50ZXJtc0h0bWxTdHJpbmcgPSB0aGlzLmFib3V0QXBwU2VydmljZS5nZXRUZXJtcygpLmh0bWwxO1xuICAgIH1cblxuICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxufVxuXG4iXX0=