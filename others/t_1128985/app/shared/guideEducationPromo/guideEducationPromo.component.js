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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGVFZHVjYXRpb25Qcm9tby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlkZUVkdWNhdGlvblByb21vLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCwwREFBNEQ7QUFDNUQsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUVwRCxtRUFBNEU7QUFDNUUsa0RBQW9EO0FBQ3BELHVFQUFxRTtBQVFyRSxJQUFhLDRCQUE0QjtJQVdyQyxzQ0FBb0IsSUFBVSxFQUNsQixNQUF5QixFQUN6QixNQUFxQjtRQUZiLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQVhqQyxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNuRSxpQkFBWSxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyRSxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUU3RCxjQUFTLEdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxhQUFRLEdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6RCxnQkFBVyxHQUFhLElBQUksS0FBSyxDQUFDO1FBSzlCLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDZixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLG1CQUFtQjtTQUN0QixDQUFDO0lBQ04sQ0FBQztJQUVELCtDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsbUNBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLDRCQUE0QjtJQU54QyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDM0MsQ0FBQztxQ0FhNEIsV0FBSTtRQUNWLDJCQUFpQjtRQUNqQiw4QkFBYTtHQWJ4Qiw0QkFBNEIsQ0FtQ3hDO0FBbkNZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2d1aWRlRWR1Y2F0aW9uUHJvbW8uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vZ3VpZGVFZHVjYXRpb25Qcm9tby5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHNjcmVlbldpZHRoOiBudW1iZXIgPSBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi53aWR0aFBpeGVscztcbiAgICBzY3JlZW5IZWlnaHQ6IG51bWJlciA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcbiAgICBzY3JlZW5TY2FsZTogbnVtYmVyID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4uc2NhbGU7XG5cbiAgICBzY3JIZWlnaHQ6IG51bWJlciA9ICh0aGlzLnNjcmVlbkhlaWdodCAvIHRoaXMuc2NyZWVuU2NhbGUpO1xuICAgIHNjcldpZHRoOiBudW1iZXIgPSAodGhpcy5zY3JlZW5XaWR0aCAvIHRoaXMuc2NyZWVuU2NhbGUpO1xuXG4gICAgZ3VpZGVJbWFnZXM6IE9iamVjdFtdID0gbmV3IEFycmF5O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHByaXZhdGUgZHJhd2VyOiBEcmF3ZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuZ3VpZGVJbWFnZXMgPSBbXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzEucG5nXCIsXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzIucG5nXCIsXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzMucG5nXCIsXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzQucG5nXCIsXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzUucG5nXCIsXG4gICAgICAgICAgICBcIn4vZHVtbXlEYXRhLzYucG5nXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNraXBQb3BVcCgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxQb3B1cFwiLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZHJhd2VyLmVuYWJsZUdlc3R1cmUodHJ1ZSk7XG4gICAgfVxufSJdfQ==