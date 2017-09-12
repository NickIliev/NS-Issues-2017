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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVybXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLHNEQUErRDtBQUUvRCx3REFBc0Q7QUFDdEQsaURBQWlEO0FBQ2pELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSxjQUFjO0lBTXZCLHdCQUFtQixPQUFnQixFQUFVLGlCQUFtQyxFQUNwRSxlQUFnQyxFQUNoQyxJQUFVO1FBRkgsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDcEUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hELENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2pFLENBQUM7SUFFTSwrQkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF0QjJCO0lBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDOzhCQUFZLGlCQUFVO2lEQUFDO0FBRnJDLGNBQWM7SUFOMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztLQUM5QixDQUFDO3FDQVE4QixnQkFBTyxFQUE2Qix5QkFBZ0I7UUFDbkQsa0NBQWU7UUFDMUIsV0FBSTtHQVJiLGNBQWMsQ0F3QjFCO0FBeEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0IH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBYm91dEFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vYWJvdXRhcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZXJtcy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuLi9hYm91dC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXJtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcInRlcm1zR3JpZFwiKSB0ZXJtc0dyaWQ6IEVsZW1lbnRSZWY7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyB0ZXJtc0h0bWxTdHJpbmc6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1VzZXJMb2dnZWRJbjogQm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnbG9iYWxzOiBHbG9iYWxzLCBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgYWJvdXRBcHBTZXJ2aWNlOiBBYm91dEFwcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiVGVybXMgJiBDb25kaXRpb25zXCI7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzVXNlckxvZ2dlZEluID0gdGhpcy5nbG9iYWxzLmlzTG9nZ2VkSW47XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgICAgICAgICB0aGlzLnRlcm1zR3JpZC5uYXRpdmVFbGVtZW50LmhlaWdodCA9IFwiNTYwXCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLnRlcm1zSHRtbFN0cmluZyA9IHRoaXMuYWJvdXRBcHBTZXJ2aWNlLmdldFRlcm1zKCkuaHRtbDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==