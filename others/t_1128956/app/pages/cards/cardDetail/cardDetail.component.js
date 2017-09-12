"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platformModule = require("tns-core-modules/platform");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var drawer_service_1 = require("../../../shared/services/drawer.service");
var global_1 = require("../../../shared/global");
var cards_service_1 = require("../cards.service");
var CardDetailComponent = (function () {
    function CardDetailComponent(page, params, drawer, _cardService, _globals) {
        this.page = page;
        this.params = params;
        this.drawer = drawer;
        this._cardService = _cardService;
        this._globals = _globals;
        this.screenWidth = platformModule.screen.mainScreen.widthPixels;
        this.screenHeight = platformModule.screen.mainScreen.heightPixels;
        this.screenScale = platformModule.screen.mainScreen.scale;
        this.scrHeight = (this.screenHeight / this.screenScale);
        this.scrWidth = (this.screenWidth / this.screenScale);
        // this.guideImages = [
        //     "~/jhg/.dfdsfasdsapng",
        //     h"~//adsfsd."sadsfdssdfdsfgfdasdsasdsadfds,
        //     "~//.png"asdsa
        // ];
        this.selectedMember = this._cardService.selectedMember;
        this.cardDetails = this._cardService.selectedMember.cardDetails;
    }
    CardDetailComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    };
    CardDetailComponent.prototype.closeCard = function () {
        this._cardService.isCardsPopUp = true;
        this.params.closeCallback();
        this.drawer.enableGesture(true);
    };
    CardDetailComponent.prototype.callPhone = function (phoneNo) {
        this._globals.callPhone(phoneNo);
    };
    return CardDetailComponent;
}());
CardDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./cardDetail.component.html",
        styleUrls: ["./cardDetail.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page,
        dialogs_1.ModalDialogParams,
        drawer_service_1.DrawerService,
        cards_service_1.CardsService,
        global_1.Globals])
], CardDetailComponent);
exports.CardDetailComponent = CardDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZERldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJkRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCwwREFBNEQ7QUFDNUQsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUVwRCxtRUFBNEU7QUFFNUUsMEVBQXdFO0FBQ3hFLGlEQUFpRDtBQUNqRCxrREFBZ0Q7QUFTaEQsSUFBYSxtQkFBbUI7SUFVNUIsNkJBQW9CLElBQVUsRUFDbEIsTUFBeUIsRUFDekIsTUFBcUIsRUFDckIsWUFBMEIsRUFDM0IsUUFBaUI7UUFKUixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDM0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQVY1QixnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNuRSxpQkFBWSxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyRSxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM3RCxjQUFTLEdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxhQUFRLEdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQU9yRCx1QkFBdUI7UUFDdkIsOEJBQThCO1FBQzlCLGtEQUFrRDtRQUNsRCxxQkFBcUI7UUFDckIsS0FBSztRQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDcEUsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUNLLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx1Q0FBUyxHQUFULFVBQVUsT0FBTztRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTCwwQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztLQUNsQyxDQUFDO3FDQVk0QixXQUFJO1FBQ1YsMkJBQWlCO1FBQ2pCLDhCQUFhO1FBQ1AsNEJBQVk7UUFDakIsZ0JBQU87R0FkbkIsbUJBQW1CLENBd0MvQjtBQXhDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0IHsgQ2FyZHNTZXJ2aWNlIH0gZnJvbSBcIi4uL2NhcmRzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTWVtYmVyTGlzdE1vZGVsLCBDYXJkTW9kZWwsIENvcGF5IH0gZnJvbSBcIi4uL21lbWJlckxpc3QubW9kZWxcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2FyZERldGFpbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2NhcmREZXRhaWwuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FyZERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgc2VsZWN0ZWRNZW1iZXI6IE1lbWJlckxpc3RNb2RlbDtcclxuICAgIGNhcmREZXRhaWxzOiBDYXJkTW9kZWw7XHJcbiAgICBzY3JlZW5XaWR0aDogbnVtYmVyID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhQaXhlbHM7XHJcbiAgICBzY3JlZW5IZWlnaHQ6IG51bWJlciA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcclxuICAgIHNjcmVlblNjYWxlOiBudW1iZXIgPSBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi5zY2FsZTtcclxuICAgIHNjckhlaWdodDogbnVtYmVyID0gKHRoaXMuc2NyZWVuSGVpZ2h0IC8gdGhpcy5zY3JlZW5TY2FsZSk7XHJcbiAgICBzY3JXaWR0aDogbnVtYmVyID0gKHRoaXMuc2NyZWVuV2lkdGggLyB0aGlzLnNjcmVlblNjYWxlKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxyXG4gICAgICAgIHByaXZhdGUgZHJhd2VyOiBEcmF3ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2NhcmRTZXJ2aWNlOiBDYXJkc1NlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ndWlkZUltYWdlcyA9IFtcclxuICAgICAgICAvLyAgICAgXCJ+L2poZy8uZGZkc2Zhc2RzYXBuZ1wiLFxyXG4gICAgICAgIC8vICAgICBoXCJ+Ly9hZHNmc2QuXCJzYWRzZmRzc2RmZHNmZ2ZkYXNkc2FzZHNhZGZkcyxcclxuICAgICAgICAvLyAgICAgXCJ+Ly8ucG5nXCJhc2RzYVxyXG4gICAgICAgIC8vIF07XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IHRoaXMuX2NhcmRTZXJ2aWNlLnNlbGVjdGVkTWVtYmVyO1xyXG4gICAgICAgIHRoaXMuY2FyZERldGFpbHMgPSB0aGlzLl9jYXJkU2VydmljZS5zZWxlY3RlZE1lbWJlci5jYXJkRGV0YWlscztcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgICAgICAgXHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUNhcmQoKSB7XHJcbiAgICAgICAgIHRoaXMuX2NhcmRTZXJ2aWNlLmlzQ2FyZHNQb3BVcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmVuYWJsZUdlc3R1cmUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbFBob25lKHBob25lTm8pIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmNhbGxQaG9uZShwaG9uZU5vKTtcclxuICAgIH1cclxuXHJcbn0iXX0=