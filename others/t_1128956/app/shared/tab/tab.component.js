"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_1 = require("../../shared/global");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("nativescript-angular/router");
var restrictedAccess_component_1 = require("../../shared/restrictedAccess/restrictedAccess.component");
var router_2 = require("@angular/router");
var page_1 = require("ui/page");
var TabComponent = (function () {
    function TabComponent(_routerExtensions, promoModal, vcRef, _globals, _router, _page) {
        this._routerExtensions = _routerExtensions;
        this.promoModal = promoModal;
        this.vcRef = vcRef;
        this._globals = _globals;
        this._router = _router;
        this._page = _page;
        this.tabMenudisable = "enableText";
        this.currentPage = "";
    }
    TabComponent.prototype.ngOnInit = function () {
        if (this._globals.isTurnOff) {
            var layout = this._page.getViewById("accountLayout");
            this._globals.setIsUserInteractionEnabledRecursive(layout, false);
            this.tabMenudisable = "disableText";
        }
        this.currentPage = this._router.url.toString();
    };
    TabComponent.prototype.loginCheckNavigate = function (page) {
        if (this._globals.isLoggedIn) {
            this.currentPage = page;
            this._routerExtensions.navigate(["/" + page], {
                animated: false
            });
        }
        else if (this._globals.isUnauthenticated) {
            this.showRestrictedAccessPopup();
        }
        else {
            this._routerExtensions.navigate(["/login"], {
                animated: false
            });
        }
    };
    TabComponent.prototype.showRestrictedAccessPopup = function () {
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.promoModal.showModal(restrictedAccess_component_1.RestrictedAccessComponent, options).then(function (res) {
        });
    };
    TabComponent.prototype.home = function () {
        if (this._globals.isLoggedIn) {
            this._routerExtensions.navigate(["/home/signedHome"], {
                animated: false
            });
        }
        else {
            this._routerExtensions.navigate(["/home/anonymousHome"], {
                animated: false
            });
        }
    };
    return TabComponent;
}());
TabComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "mb-tab",
        templateUrl: "./tab.component.html",
        styleUrls: ["tab.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        dialogs_1.ModalDialogService,
        core_1.ViewContainerRef,
        global_1.Globals,
        router_2.Router,
        page_1.Page])
], TabComponent);
exports.TabComponent = TabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUg7QUFDckgsOENBQThDO0FBQzlDLG1FQUE2RTtBQUM3RSxzREFBK0Q7QUFDL0QsdUdBQXFHO0FBQ3JHLDBDQUF5QztBQUV6QyxnQ0FBK0I7QUFRL0IsSUFBYSxZQUFZO0lBSXJCLHNCQUFvQixpQkFBbUMsRUFDM0MsVUFBOEIsRUFDOUIsS0FBdUIsRUFDeEIsUUFBaUIsRUFDakIsT0FBZSxFQUNmLEtBQVc7UUFMRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQU07UUFSdEIsbUJBQWMsR0FBVyxZQUFZLENBQUM7UUFDdEMsZ0JBQVcsR0FBVyxFQUFFLENBQUM7SUFTekIsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxNQUFNLEdBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsb0NBQW9DLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsSUFBWTtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDMUMsUUFBUSxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hDLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQXlCLEdBQXpCO1FBQ0ksSUFBSSxPQUFPLEdBQUc7WUFDVixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxzREFBeUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFDTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ2xELFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQztRQUNELENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUM1RCxRQUFRLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUM7UUFDRCxDQUFDO0lBQ1AsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQTlERCxJQThEQztBQTlEWSxZQUFZO0lBTnhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLHNCQUFzQjtRQUNuQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDekIsQ0FBQztxQ0FLeUMseUJBQWdCO1FBQy9CLDRCQUFrQjtRQUN2Qix1QkFBZ0I7UUFDZCxnQkFBTztRQUNSLGVBQU07UUFDUixXQUFJO0dBVGIsWUFBWSxDQThEeEI7QUE5RFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9yZXN0cmljdGVkQWNjZXNzL3Jlc3RyaWN0ZWRBY2Nlc3MuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibWItdGFiXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJ0YWIuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdGFiTWVudWRpc2FibGU6IHN0cmluZyA9IFwiZW5hYmxlVGV4dFwiO1xyXG4gICAgY3VycmVudFBhZ2U6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHByb21vTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcclxuICAgICAgICBwdWJsaWMgX3JvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHB1YmxpYyBfcGFnZTogUGFnZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dDogR3JpZExheW91dCA9IDxHcmlkTGF5b3V0PnRoaXMuX3BhZ2UuZ2V0Vmlld0J5SWQoXCJhY2NvdW50TGF5b3V0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnNldElzVXNlckludGVyYWN0aW9uRW5hYmxlZFJlY3Vyc2l2ZShsYXlvdXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy50YWJNZW51ZGlzYWJsZSA9IFwiZGlzYWJsZVRleHRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX3JvdXRlci51cmwudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbkNoZWNrTmF2aWdhdGUocGFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvXCIgKyBwYWdlXSwge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3RyaWN0ZWRBY2Nlc3NQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Jlc3RyaWN0ZWRBY2Nlc3NQb3B1cCgpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucHJvbW9Nb2RhbC5zaG93TW9kYWwoUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCwgb3B0aW9ucykudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaG9tZSgpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4pe1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvYW5vbnltb3VzSG9tZVwiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=