"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platformModule = require("tns-core-modules/platform");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var appSettings = require("application-settings");
var drawer_service_1 = require("../../shared/services/drawer.service");
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
            "~/dummyData/1.png",
            "~/dummyData/2.png",
            "~/dummyData/3.png",
            "~/dummyData/4.png",
            "~/dummyData/5.png",
            "~/dummyData/6.png"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGVFZHVjYXRpb25Qcm9tby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlkZUVkdWNhdGlvblByb21vLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCwwREFBNEQ7QUFDNUQsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUVwRCxtRUFBNEU7QUFDNUUsa0RBQW9EO0FBQ3BELHVFQUFxRTtBQVFyRSxJQUFhLDRCQUE0QjtJQVdyQyxzQ0FBb0IsSUFBVSxFQUNsQixNQUF5QixFQUN6QixNQUFxQjtRQUZiLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQVhqQyxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNuRSxpQkFBWSxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyRSxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUU3RCxjQUFTLEdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxhQUFRLEdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6RCxnQkFBVyxHQUFhLElBQUksS0FBSyxDQUFDO1FBSzlCLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDZixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLG1CQUFtQjtTQUN0QixDQUFDO0lBQ04sQ0FBQztJQUVELCtDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsbUNBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLDRCQUE0QjtJQU54QyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDM0MsQ0FBQztxQ0FhNEIsV0FBSTtRQUNWLDJCQUFpQjtRQUNqQiw4QkFBYTtHQWJ4Qiw0QkFBNEIsQ0FtQ3hDO0FBbkNZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2RyYXdlci5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2d1aWRlRWR1Y2F0aW9uUHJvbW8uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9ndWlkZUVkdWNhdGlvblByb21vLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHNjcmVlbldpZHRoOiBudW1iZXIgPSBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi53aWR0aFBpeGVscztcclxuICAgIHNjcmVlbkhlaWdodDogbnVtYmVyID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0UGl4ZWxzO1xyXG4gICAgc2NyZWVuU2NhbGU6IG51bWJlciA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLnNjYWxlO1xyXG5cclxuICAgIHNjckhlaWdodDogbnVtYmVyID0gKHRoaXMuc2NyZWVuSGVpZ2h0IC8gdGhpcy5zY3JlZW5TY2FsZSk7XHJcbiAgICBzY3JXaWR0aDogbnVtYmVyID0gKHRoaXMuc2NyZWVuV2lkdGggLyB0aGlzLnNjcmVlblNjYWxlKTtcclxuXHJcbiAgICBndWlkZUltYWdlczogT2JqZWN0W10gPSBuZXcgQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcclxuICAgICAgICBwcml2YXRlIGRyYXdlcjogRHJhd2VyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuZ3VpZGVJbWFnZXMgPSBbXHJcbiAgICAgICAgICAgIFwifi9kdW1teURhdGEvMS5wbmdcIixcclxuICAgICAgICAgICAgXCJ+L2R1bW15RGF0YS8yLnBuZ1wiLFxyXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzMucG5nXCIsXHJcbiAgICAgICAgICAgIFwifi9kdW1teURhdGEvNC5wbmdcIixcclxuICAgICAgICAgICAgXCJ+L2R1bW15RGF0YS81LnBuZ1wiLFxyXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzYucG5nXCJcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcFBvcFVwKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxQb3B1cFwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIuZW5hYmxlR2VzdHVyZSh0cnVlKTtcclxuICAgIH1cclxufSJdfQ==