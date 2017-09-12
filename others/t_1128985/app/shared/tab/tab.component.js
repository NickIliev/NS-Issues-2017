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
        console.log(this._router.url.toString());
        console.log(this._routerExtensions.router.url.toString());
        this.currentPage = this._router.url.toString();
    };
    TabComponent.prototype.loginCheckNavigate = function (page) {
        if (this._globals.isLoggedIn) {
            // this.currentPage = page; // REMOVE THIS LINE so that each unique instance of TabComponent will always load the default highlighted button
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUg7QUFDckgsOENBQThDO0FBQzlDLG1FQUE2RTtBQUM3RSxzREFBK0Q7QUFDL0QsdUdBQXFHO0FBQ3JHLDBDQUF3RDtBQUV4RCxnQ0FBK0I7QUFRL0IsSUFBYSxZQUFZO0lBSXJCLHNCQUFvQixpQkFBbUMsRUFDM0MsVUFBOEIsRUFDOUIsS0FBdUIsRUFDeEIsUUFBaUIsRUFDakIsT0FBZSxFQUNmLEtBQVc7UUFMRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQU07UUFSdEIsbUJBQWMsR0FBVyxZQUFZLENBQUM7UUFDdEMsZ0JBQVcsR0FBVyxFQUFFLENBQUM7SUFRekIsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxNQUFNLEdBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsb0NBQW9DLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELHlDQUFrQixHQUFsQixVQUFtQixJQUFZO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzQiw0SUFBNEk7WUFDNUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDMUMsUUFBUSxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hDLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQXlCLEdBQXpCO1FBQ0ksSUFBSSxPQUFPLEdBQUc7WUFDVixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxzREFBeUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ2xELFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUNyRCxRQUFRLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQWhFRCxJQWdFQztBQWhFWSxZQUFZO0lBTnhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLHNCQUFzQjtRQUNuQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDekIsQ0FBQztxQ0FLeUMseUJBQWdCO1FBQy9CLDRCQUFrQjtRQUN2Qix1QkFBZ0I7UUFDZCxnQkFBTztRQUNSLGVBQU07UUFDUixXQUFJO0dBVGIsWUFBWSxDQWdFeEI7QUFoRVksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvcmVzdHJpY3RlZEFjY2Vzcy9yZXN0cmljdGVkQWNjZXNzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJtYi10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1widGFiLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHRhYk1lbnVkaXNhYmxlOiBzdHJpbmcgPSBcImVuYWJsZVRleHRcIjtcbiAgICBjdXJyZW50UGFnZTogc3RyaW5nID0gXCJcIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgcHJvbW9Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsXG4gICAgICAgIHB1YmxpYyBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHB1YmxpYyBfcGFnZTogUGFnZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcbiAgICAgICAgICAgIGxldCBsYXlvdXQ6IEdyaWRMYXlvdXQgPSA8R3JpZExheW91dD50aGlzLl9wYWdlLmdldFZpZXdCeUlkKFwiYWNjb3VudExheW91dFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuc2V0SXNVc2VySW50ZXJhY3Rpb25FbmFibGVkUmVjdXJzaXZlKGxheW91dCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy50YWJNZW51ZGlzYWJsZSA9IFwiZGlzYWJsZVRleHRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3JvdXRlci51cmwudG9TdHJpbmcoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3JvdXRlckV4dGVuc2lvbnMucm91dGVyLnVybC50b1N0cmluZygpKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fcm91dGVyLnVybC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxvZ2luQ2hlY2tOYXZpZ2F0ZShwYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbikge1xuICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7IC8vIFJFTU9WRSBUSElTIExJTkUgc28gdGhhdCBlYWNoIHVuaXF1ZSBpbnN0YW5jZSBvZiBUYWJDb21wb25lbnQgd2lsbCBhbHdheXMgbG9hZCB0aGUgZGVmYXVsdCBoaWdobGlnaHRlZCBidXR0b25cbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL1wiICsgcGFnZV0sIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3RyaWN0ZWRBY2Nlc3NQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1Jlc3RyaWN0ZWRBY2Nlc3NQb3B1cCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJvbW9Nb2RhbC5zaG93TW9kYWwoUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCwgb3B0aW9ucykudGhlbigocmVzKSA9PiB7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhvbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL2Fub255bW91c0hvbWVcIl0sIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19