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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZERldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJkRGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCwwREFBNEQ7QUFDNUQsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUVwRCxtRUFBNEU7QUFFNUUsMEVBQXdFO0FBQ3hFLGlEQUFpRDtBQUNqRCxrREFBZ0Q7QUFTaEQsSUFBYSxtQkFBbUI7SUFVNUIsNkJBQW9CLElBQVUsRUFDbEIsTUFBeUIsRUFDekIsTUFBcUIsRUFDckIsWUFBMEIsRUFDM0IsUUFBaUI7UUFKUixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDM0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQVY1QixnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNuRSxpQkFBWSxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNyRSxnQkFBVyxHQUFXLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM3RCxjQUFTLEdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxhQUFRLEdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQU9yRCx1QkFBdUI7UUFDdkIsOEJBQThCO1FBQzlCLGtEQUFrRDtRQUNsRCxxQkFBcUI7UUFDckIsS0FBSztRQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDcEUsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUNLLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx1Q0FBUyxHQUFULFVBQVUsT0FBTztRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTCwwQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztLQUNsQyxDQUFDO3FDQVk0QixXQUFJO1FBQ1YsMkJBQWlCO1FBQ2pCLDhCQUFhO1FBQ1AsNEJBQVk7UUFDakIsZ0JBQU87R0FkbkIsbUJBQW1CLENBd0MvQjtBQXhDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IERyYXdlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2RyYXdlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcbmltcG9ydCB7IENhcmRzU2VydmljZSB9IGZyb20gXCIuLi9jYXJkcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBNZW1iZXJMaXN0TW9kZWwsIENhcmRNb2RlbCwgQ29wYXkgfSBmcm9tIFwiLi4vbWVtYmVyTGlzdC5tb2RlbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2FyZERldGFpbC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9jYXJkRGV0YWlsLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIENhcmREZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgc2VsZWN0ZWRNZW1iZXI6IE1lbWJlckxpc3RNb2RlbDtcbiAgICBjYXJkRGV0YWlsczogQ2FyZE1vZGVsO1xuICAgIHNjcmVlbldpZHRoOiBudW1iZXIgPSBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi53aWR0aFBpeGVscztcbiAgICBzY3JlZW5IZWlnaHQ6IG51bWJlciA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcbiAgICBzY3JlZW5TY2FsZTogbnVtYmVyID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4uc2NhbGU7XG4gICAgc2NySGVpZ2h0OiBudW1iZXIgPSAodGhpcy5zY3JlZW5IZWlnaHQgLyB0aGlzLnNjcmVlblNjYWxlKTtcbiAgICBzY3JXaWR0aDogbnVtYmVyID0gKHRoaXMuc2NyZWVuV2lkdGggLyB0aGlzLnNjcmVlblNjYWxlKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgICAgICBwcml2YXRlIGRyYXdlcjogRHJhd2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY2FyZFNlcnZpY2U6IENhcmRzU2VydmljZSxcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzKSB7XG4gICAgICAgIC8vIHRoaXMuZ3VpZGVJbWFnZXMgPSBbXG4gICAgICAgIC8vICAgICBcIn4vamhnLy5kZmRzZmFzZHNhcG5nXCIsXG4gICAgICAgIC8vICAgICBoXCJ+Ly9hZHNmc2QuXCJzYWRzZmRzc2RmZHNmZ2ZkYXNkc2FzZHNhZGZkcyxcbiAgICAgICAgLy8gICAgIFwifi8vLnBuZ1wiYXNkc2FcbiAgICAgICAgLy8gXTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IHRoaXMuX2NhcmRTZXJ2aWNlLnNlbGVjdGVkTWVtYmVyO1xuICAgICAgICB0aGlzLmNhcmREZXRhaWxzID0gdGhpcy5fY2FyZFNlcnZpY2Uuc2VsZWN0ZWRNZW1iZXIuY2FyZERldGFpbHM7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7ICAgICAgIFxuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VDYXJkKCkge1xuICAgICAgICAgdGhpcy5fY2FyZFNlcnZpY2UuaXNDYXJkc1BvcFVwID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICB0aGlzLmRyYXdlci5lbmFibGVHZXN0dXJlKHRydWUpO1xuICAgIH1cblxuICAgIGNhbGxQaG9uZShwaG9uZU5vKSB7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuY2FsbFBob25lKHBob25lTm8pO1xuICAgIH1cblxufSJdfQ==