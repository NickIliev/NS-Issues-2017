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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1EZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhaW1EZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBRWpFLG9EQUFpRDtBQUVqRCxpREFBaUQ7QUFDakQsc0RBQStEO0FBQy9ELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSxvQkFBb0I7SUFXN0IsOEJBQTBCLE9BQWdCLEVBQVMsYUFBMkIsRUFDbEUsaUJBQW1DLEVBQ25DLElBQVU7UUFGSSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDbEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBWGYsVUFBSyxHQUFHLGVBQWUsQ0FBQztRQUV4QixzQkFBaUIsR0FBVyxxWkFBcVosQ0FBQztRQUNsYixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFMUMsa0JBQWEsR0FBWSxDQUFDLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxDQUFDLENBQUM7UUFDekIsdUJBQWtCLEdBQVksQ0FBQyxDQUFDO1FBSzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUMxRCxDQUFDO0lBRUMsOENBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xFLENBQUM7SUFFSCxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFDTSx1REFBd0IsR0FBL0I7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDckQsQ0FBQztJQUtMLDJCQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxvQkFBb0I7SUFMaEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDLENBQUM7cUNBWXFDLGdCQUFPLEVBQXdCLDZCQUFZO1FBQy9DLHlCQUFnQjtRQUM3QixXQUFJO0dBYmIsb0JBQW9CLENBeUNoQztBQXpDWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IENsYWltU2VydmljZSB9IGZyb20gXCIuLi9jbGFpbXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ2xhaW1Nb2RlbCB9IGZyb20gXCIuLi9jbGFpbXMubW9kZWxcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NsYWltRGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJjbGFpbURldGFpbC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ2xhaW1EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgcHVibGljIHRpdGxlID0gXCJDbGFpbSBEZXRhaWxzXCI7XG4gICAgcHVibGljIHNlbGVjdGVkQ2xhaW06IENsYWltTW9kZWw7XG4gICAgcHVibGljIGNsYWltSGVscEluZm9IdG1sOiBzdHJpbmcgPSBcIjwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPjx0aXRsZT5NeVRpdGxlPC90aXRsZT48bWV0YSBjaGFyc2V0PVxcXCJ1dGYtOFxcXCIgLz48c3R5bGU+IGJvZHl7YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtmb250LWZhbWlseTogQXJpYWw7fTwvc3R5bGU+PC9oZWFkPjxib2R5PjxkaXY+PHNwYW4gc3R5bGU9J2NvbG9yOiMwMDAwMDA7Zm9udC13ZWlnaHQ6Ym9sZDsnPldoYXQgaXMgYSBEZW5pZWQgQ2xhaW0/PC9zcGFuPjwvYnI+TnVsbGFtIG1vbGxpcywgbGVjdHVzIGF0IGVsZWlmZW5kIHRpbmNpZHVudCwgcHVydXMgdG9ydG9yIGFsaXF1ZXQgZmVsaXMsIHNpdCBhbWV0IGludGVyZHVtIHZlbGl0IGxpZ3VsYSBuZWMgZXJhdCBsZWlmZW5kIHRpbmNpZHVudCwgcHVydXMgdG9ydG9yIGFsaXF1ZXQgZmVsaXMuPC9kaXY+XCI7XG4gICAgcHVibGljIGlzSGVscEluZm9WaXNpYmxlOiBCb29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzVXNlckxvZ2dlZEluOiBCb29sZWFuO1xuICAgIHBhZ2VTdGFydFRpbWUgOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VFbmRUaW1lIDogbnVtYmVyID0gMDtcbiAgICBwYWdlVGltZURpZmZlcmVuY2UgOiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBnbG9iYWxzOiBHbG9iYWxzLCBwdWJsaWMgX2NsYWltU2VydmljZTogQ2xhaW1TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaXNVc2VyTG9nZ2VkSW4gPSB0aGlzLmdsb2JhbHMuaXNMb2dnZWRJbjtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDbGFpbSA9IHRoaXMuX2NsYWltU2VydmljZS5zZWxlY3RlZENsYWltO1xuICAgIH1cblxuICAgICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuICAgIHB1YmxpYyBzaG93T3JIaWRlQ29udGV4dHVhbEhlbHAoKSB7XG4gICAgICAgIHRoaXMuaXNIZWxwSW5mb1Zpc2libGUgPSAhdGhpcy5pc0hlbHBJbmZvVmlzaWJsZTtcbiAgICB9XG5cblxuXG5cbn0iXX0=