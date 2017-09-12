"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platformModule = require("tns-core-modules/platform");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var appSettings = require("application-settings");
var drawer_service_1 = require("../../../shared/services/drawer.service");
var GuideEducationPromoComponent = (function () {
    function GuideEducationPromoComponent(page, params, drawer) {
        this.page = page;
        this.params = params;
        this.drawer = drawer;
        this.screenWidth = platformModule.screen.mainScreen.widthPixels;
        this.screenHeight = platformModule.screen.mainScreen.heightPixels;
        this.screenScale = platformModule.screen.mainScreen.scale;
        this.scrHeight = (this.screenHeight / this.screenScale);
        this.scrWidth = (this.screenWidth / this.screenScale);
        this.guideImages = new Array;
        this.guideImages = [
            "~/images/education_screen_1.png",
            "~/images/education_screen_2.png",
            "~/images/education_screen_3.png"
        ];
    }
    GuideEducationPromoComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    };
    GuideEducationPromoComponent.prototype.skipPopUp = function () {
        this.params.closeCallback();
        appSettings.setBoolean("isFirstInstallPopup", false);
        this.drawer.enableGesture(true);
    };
    return GuideEducationPromoComponent;
}());
GuideEducationPromoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./guideEducationPromo.component.html",
        styleUrls: ["./guideEducationPromo.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page,
        dialogs_1.ModalDialogParams,
        drawer_service_1.DrawerService])
], GuideEducationPromoComponent);
exports.GuideEducationPromoComponent = GuideEducationPromoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGVFZHVjYXRpb25Qcm9tby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlkZUVkdWNhdGlvblByb21vLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCwwREFBNEQ7QUFDNUQsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUVwRCxtRUFBNEU7QUFDNUUsa0RBQW9EO0FBQ3BELDBFQUF3RTtBQVF4RSxJQUFhLDRCQUE0QjtJQVdyQyxzQ0FBb0IsSUFBVSxFQUNsQixNQUF5QixFQUN6QixNQUFxQjtRQUZiLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQVhqQyxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNuRSxpQkFBWSxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyRSxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUU3RCxjQUFTLEdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxhQUFRLEdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBRTtRQUUxRCxnQkFBVyxHQUFhLElBQUksS0FBSyxDQUFDO1FBSzFCLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDZixpQ0FBaUM7WUFDakMsaUNBQWlDO1lBQ2pDLGlDQUFpQztTQUNwQyxDQUFDO0lBQ1YsQ0FBQztJQUVELCtDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFFO1FBQ3RFLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUwsbUNBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDO0FBakNZLDRCQUE0QjtJQU54QyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDM0MsQ0FBQztxQ0FhNEIsV0FBSTtRQUNWLDJCQUFpQjtRQUNqQiw4QkFBYTtHQWJ4Qiw0QkFBNEIsQ0FpQ3hDO0FBakNZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZ3VpZGVFZHVjYXRpb25Qcm9tby5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9ndWlkZUVkdWNhdGlvblByb21vLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgc2NyZWVuV2lkdGg6IG51bWJlciA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLndpZHRoUGl4ZWxzO1xuICAgIHNjcmVlbkhlaWdodDogbnVtYmVyID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0UGl4ZWxzO1xuICAgIHNjcmVlblNjYWxlOiBudW1iZXIgPSBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi5zY2FsZTtcblxuICAgIHNjckhlaWdodDogbnVtYmVyID0gKHRoaXMuc2NyZWVuSGVpZ2h0IC8gdGhpcy5zY3JlZW5TY2FsZSk7XG4gICAgc2NyV2lkdGg6IG51bWJlciA9ICh0aGlzLnNjcmVlbldpZHRoIC8gdGhpcy5zY3JlZW5TY2FsZSkgO1xuXG4gICAgZ3VpZGVJbWFnZXM6IE9iamVjdFtdID0gbmV3IEFycmF5O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHByaXZhdGUgZHJhd2VyOiBEcmF3ZXJTZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLmd1aWRlSW1hZ2VzID0gW1xuICAgICAgICAgICAgICAgIFwifi9pbWFnZXMvZWR1Y2F0aW9uX3NjcmVlbl8xLnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwifi9pbWFnZXMvZWR1Y2F0aW9uX3NjcmVlbl8yLnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwifi9pbWFnZXMvZWR1Y2F0aW9uX3NjcmVlbl8zLnBuZ1wiXG4gICAgICAgICAgICBdO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiIDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNraXBQb3BVcCgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxQb3B1cFwiLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZHJhd2VyLmVuYWJsZUdlc3R1cmUodHJ1ZSk7XG4gICAgfVxuXG59Il19