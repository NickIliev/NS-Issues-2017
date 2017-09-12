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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGVFZHVjYXRpb25Qcm9tby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlkZUVkdWNhdGlvblByb21vLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCwwREFBNEQ7QUFDNUQsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUVwRCxtRUFBNEU7QUFDNUUsa0RBQW9EO0FBQ3BELDBFQUF3RTtBQVF4RSxJQUFhLDRCQUE0QjtJQVdyQyxzQ0FBb0IsSUFBVSxFQUNsQixNQUF5QixFQUN6QixNQUFxQjtRQUZiLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQVhqQyxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNuRSxpQkFBWSxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyRSxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUU3RCxjQUFTLEdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxhQUFRLEdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBRTtRQUUxRCxnQkFBVyxHQUFhLElBQUksS0FBSyxDQUFDO1FBSzFCLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDZixpQ0FBaUM7WUFDakMsaUNBQWlDO1lBQ2pDLGlDQUFpQztTQUNwQyxDQUFDO0lBQ1YsQ0FBQztJQUVELCtDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFFO1FBQ3RFLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUwsbUNBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDO0FBakNZLDRCQUE0QjtJQU54QyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDM0MsQ0FBQztxQ0FhNEIsV0FBSTtRQUNWLDJCQUFpQjtRQUNqQiw4QkFBYTtHQWJ4Qiw0QkFBNEIsQ0FpQ3hDO0FBakNZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ndWlkZUVkdWNhdGlvblByb21vLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vZ3VpZGVFZHVjYXRpb25Qcm9tby5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBzY3JlZW5XaWR0aDogbnVtYmVyID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhQaXhlbHM7XHJcbiAgICBzY3JlZW5IZWlnaHQ6IG51bWJlciA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcclxuICAgIHNjcmVlblNjYWxlOiBudW1iZXIgPSBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi5zY2FsZTtcclxuXHJcbiAgICBzY3JIZWlnaHQ6IG51bWJlciA9ICh0aGlzLnNjcmVlbkhlaWdodCAvIHRoaXMuc2NyZWVuU2NhbGUpO1xyXG4gICAgc2NyV2lkdGg6IG51bWJlciA9ICh0aGlzLnNjcmVlbldpZHRoIC8gdGhpcy5zY3JlZW5TY2FsZSkgO1xyXG5cclxuICAgIGd1aWRlSW1hZ2VzOiBPYmplY3RbXSA9IG5ldyBBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxyXG4gICAgICAgIHByaXZhdGUgZHJhd2VyOiBEcmF3ZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVJbWFnZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBcIn4vaW1hZ2VzL2VkdWNhdGlvbl9zY3JlZW5fMS5wbmdcIixcclxuICAgICAgICAgICAgICAgIFwifi9pbWFnZXMvZWR1Y2F0aW9uX3NjcmVlbl8yLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ+L2ltYWdlcy9lZHVjYXRpb25fc2NyZWVuXzMucG5nXCJcclxuICAgICAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCIgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBza2lwUG9wVXAoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc0ZpcnN0SW5zdGFsbFBvcHVwXCIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmRyYXdlci5lbmFibGVHZXN0dXJlKHRydWUpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==