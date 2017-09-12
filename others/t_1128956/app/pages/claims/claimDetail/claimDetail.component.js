"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var claims_service_1 = require("../claims.service");
var global_1 = require("../../../shared/global");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var ClaimDetailComponent = (function () {
    function ClaimDetailComponent(globals, _claimService, _routerExtensions, page) {
        this.globals = globals;
        this._claimService = _claimService;
        this._routerExtensions = _routerExtensions;
        this.page = page;
        this.title = "Claim Details";
        this.claimHelpInfoHtml = "<!DOCTYPE html><html><head><title>MyTitle</title><meta charset=\"utf-8\" /><style> body{background-color: #fff;font-family: Arial;}</style></head><body><div><span style='color:#000000;font-weight:bold;'>What is a Denied Claim?</span></br>Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat leifend tincidunt, purus tortor aliquet felis.</div>";
        this.isHelpInfoVisible = false;
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.pageStartTime = new Date().getTime();
    }
    ClaimDetailComponent.prototype.ngOnInit = function () {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.selectedClaim = this._claimService.selectedClaim;
    };
    ClaimDetailComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    ClaimDetailComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    ClaimDetailComponent.prototype.showOrHideContextualHelp = function () {
        this.isHelpInfoVisible = !this.isHelpInfoVisible;
    };
    return ClaimDetailComponent;
}());
ClaimDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./claimDetail.component.html",
        styleUrls: ["claimDetail.css"]
    }),
    __metadata("design:paramtypes", [global_1.Globals, claims_service_1.ClaimService,
        router_1.RouterExtensions,
        page_1.Page])
], ClaimDetailComponent);
exports.ClaimDetailComponent = ClaimDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1EZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhaW1EZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBRWpFLG9EQUFpRDtBQUVqRCxpREFBaUQ7QUFDakQsc0RBQStEO0FBQy9ELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSxvQkFBb0I7SUFXN0IsOEJBQTBCLE9BQWdCLEVBQVMsYUFBMkIsRUFDbEUsaUJBQW1DLEVBQ25DLElBQVU7UUFGSSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDbEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBWGYsVUFBSyxHQUFHLGVBQWUsQ0FBQztRQUV4QixzQkFBaUIsR0FBVyxxWkFBcVosQ0FBQztRQUNsYixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFMUMsa0JBQWEsR0FBWSxDQUFDLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxDQUFDLENBQUM7UUFDekIsdUJBQWtCLEdBQVksQ0FBQyxDQUFDO1FBSzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUMxRCxDQUFDO0lBRUMsOENBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xFLENBQUM7SUFFSCxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFDTSx1REFBd0IsR0FBL0I7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDckQsQ0FBQztJQUtMLDJCQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxvQkFBb0I7SUFMaEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDLENBQUM7cUNBWXFDLGdCQUFPLEVBQXdCLDZCQUFZO1FBQy9DLHlCQUFnQjtRQUM3QixXQUFJO0dBYmIsb0JBQW9CLENBeUNoQztBQXpDWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBDbGFpbVNlcnZpY2UgfSBmcm9tIFwiLi4vY2xhaW1zLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1Nb2RlbCB9IGZyb20gXCIuLi9jbGFpbXMubW9kZWxcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NsYWltRGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImNsYWltRGV0YWlsLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xhaW1EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIHB1YmxpYyB0aXRsZSA9IFwiQ2xhaW0gRGV0YWlsc1wiO1xyXG4gICAgcHVibGljIHNlbGVjdGVkQ2xhaW06IENsYWltTW9kZWw7XHJcbiAgICBwdWJsaWMgY2xhaW1IZWxwSW5mb0h0bWw6IHN0cmluZyA9IFwiPCFET0NUWVBFIGh0bWw+PGh0bWw+PGhlYWQ+PHRpdGxlPk15VGl0bGU8L3RpdGxlPjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIiAvPjxzdHlsZT4gYm9keXtiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO2ZvbnQtZmFtaWx5OiBBcmlhbDt9PC9zdHlsZT48L2hlYWQ+PGJvZHk+PGRpdj48c3BhbiBzdHlsZT0nY29sb3I6IzAwMDAwMDtmb250LXdlaWdodDpib2xkOyc+V2hhdCBpcyBhIERlbmllZCBDbGFpbT88L3NwYW4+PC9icj5OdWxsYW0gbW9sbGlzLCBsZWN0dXMgYXQgZWxlaWZlbmQgdGluY2lkdW50LCBwdXJ1cyB0b3J0b3IgYWxpcXVldCBmZWxpcywgc2l0IGFtZXQgaW50ZXJkdW0gdmVsaXQgbGlndWxhIG5lYyBlcmF0IGxlaWZlbmQgdGluY2lkdW50LCBwdXJ1cyB0b3J0b3IgYWxpcXVldCBmZWxpcy48L2Rpdj5cIjtcclxuICAgIHB1YmxpYyBpc0hlbHBJbmZvVmlzaWJsZTogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzVXNlckxvZ2dlZEluOiBCb29sZWFuO1xyXG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlRW5kVGltZSA6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlVGltZURpZmZlcmVuY2UgOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgZ2xvYmFsczogR2xvYmFscywgcHVibGljIF9jbGFpbVNlcnZpY2U6IENsYWltU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaXNVc2VyTG9nZ2VkSW4gPSB0aGlzLmdsb2JhbHMuaXNMb2dnZWRJbjtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2xhaW0gPSB0aGlzLl9jbGFpbVNlcnZpY2Uuc2VsZWN0ZWRDbGFpbTtcclxuICAgIH1cclxuXHJcbiAgICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xyXG4gICAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dPckhpZGVDb250ZXh0dWFsSGVscCgpIHtcclxuICAgICAgICB0aGlzLmlzSGVscEluZm9WaXNpYmxlID0gIXRoaXMuaXNIZWxwSW5mb1Zpc2libGU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59Il19