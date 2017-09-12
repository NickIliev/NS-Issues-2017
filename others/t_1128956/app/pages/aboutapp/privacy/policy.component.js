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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvbGljeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQStEO0FBRS9ELHdEQUFzRDtBQUN0RCxnQ0FBK0I7QUFDL0Isa0RBQW9EO0FBQ3BELGlEQUFpRDtBQVFqRCxJQUFhLGVBQWU7SUFNeEIseUJBQW1CLE9BQWdCLEVBQVUsaUJBQW1DLEVBQ3BFLGVBQWdDLEVBQ2hDLElBQVU7UUFGSCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNwRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1lBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEQsQ0FBQztRQUdELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQzNFLENBQUM7SUFDTSxnQ0FBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF2QjZCO0lBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDOzhCQUFjLGlCQUFVO29EQUFDO0FBRnpDLGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztLQUM5QixDQUFDO3FDQVE4QixnQkFBTyxFQUE2Qix5QkFBZ0I7UUFDbkQsa0NBQWU7UUFDMUIsV0FBSTtHQVJiLGVBQWUsQ0F5QjNCO0FBekJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0IH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBYm91dEFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vYWJvdXRhcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wb2xpY3kuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi4vYWJvdXQuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUG9saWN5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwicHJpdmFjeUdyaWRcIikgcHJpdmFjeUdyaWQ6IEVsZW1lbnRSZWY7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBwcml2YWN5SHRtbFN0cmluZzogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzVXNlckxvZ2dlZEluOiBCb29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdsb2JhbHM6IEdsb2JhbHMsIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBhYm91dEFwcFNlcnZpY2U6IEFib3V0QXBwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJQcml2YWN5IFBvbGljeVwiO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pc1VzZXJMb2dnZWRJbiA9IHRoaXMuZ2xvYmFscy5pc0xvZ2dlZEluO1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICAgICAgdGhpcy5wcml2YWN5R3JpZC5uYXRpdmVFbGVtZW50LmhlaWdodCA9IFwiNTYwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMucHJpdmFjeUh0bWxTdHJpbmcgPSB0aGlzLmFib3V0QXBwU2VydmljZS5nZXRQcml2YWN5UG9saWN5KCkuaHRtbDE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19