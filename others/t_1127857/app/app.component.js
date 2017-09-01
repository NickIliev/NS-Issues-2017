"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application = require("application");
var router_1 = require("nativescript-angular/router");
var AppComponent = (function () {
    function AppComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.isExit = true;
        this.counter = 0;
        console.log("-------->>>  AppComponent.constructor");
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("-------->>>  AppComponent.ngOnInit");
        this.backCallback = function (data) {
            console.log("-------->>>  EVENT");
            console.log(!(_this.routerExtensions.canGoBackToPreviousPage()) + " can go back");
            if (!(_this.routerExtensions.canGoBack())) {
                console.log("inside router");
                if (_this.isExit) {
                    console.log("Press once again to exit");
                    console.log("open");
                    data.cancel = true; // It makes the app to stay idle without minimizing
                    _this.isExit = false;
                }
                else {
                    console.log("-------->>>  CLOSE - will detach event");
                    data.cancel = false; // It minimizes the app
                    application.android.off(application.AndroidApplication.activityBackPressedEvent, _this.backCallback);
                    _this.isExit = true;
                }
                setTimeout(function () {
                    _this.isExit = true;
                }, 3000);
            }
            // true if there are pages to go back to, and false if there are no pages in the router history
        };
        application.android.on(application.AndroidApplication.activityBackPressedEvent, this.backCallback);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMseUNBQTJDO0FBRTNDLHNEQUErRDtBQU8vRDtJQU1JLHNCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUx0RCxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFLaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBNkJDO1FBNUJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQUMsSUFBcUQ7WUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDakYsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxtREFBbUQ7b0JBQ3ZFLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyx1QkFBdUI7b0JBQzVDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3BHLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUNELFVBQVUsQ0FBQztvQkFDVCxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1gsQ0FBQztZQUNELCtGQUErRjtRQUNqRyxDQUFDLENBQUE7UUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUF2Q1EsWUFBWTtRQUx4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNwQyxDQUFDO3lDQVF3Qyx5QkFBZ0I7T0FON0MsWUFBWSxDQXdDeEI7SUFBRCxtQkFBQztDQUFBLEFBeENELElBd0NDO0FBeENZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgeyBcbiAgICBpc0V4aXQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGNvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgICBiYWNrQ2FsbGJhY2s6IChkYXRhOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tPj4+ICBBcHBDb21wb25lbnQuY29uc3RydWN0b3JcIik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0+Pj4gIEFwcENvbXBvbmVudC5uZ09uSW5pdFwiKTtcblxuICAgICAgICB0aGlzLmJhY2tDYWxsYmFjayA9IChkYXRhOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLT4+PiAgRVZFTlRcIik7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coISh0aGlzLnJvdXRlckV4dGVuc2lvbnMuY2FuR29CYWNrVG9QcmV2aW91c1BhZ2UoKSkgKyBcIiBjYW4gZ28gYmFja1wiKTtcbiAgICAgICAgICAgIGlmICghKHRoaXMucm91dGVyRXh0ZW5zaW9ucy5jYW5Hb0JhY2soKSkpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgcm91dGVyXCIpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc0V4aXQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByZXNzIG9uY2UgYWdhaW4gdG8gZXhpdFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW5cIik7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7IC8vIEl0IG1ha2VzIHRoZSBhcHAgdG8gc3RheSBpZGxlIHdpdGhvdXQgbWluaW1pemluZ1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFeGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLT4+PiAgQ0xPU0UgLSB3aWxsIGRldGFjaCBldmVudFwiKTtcbiAgICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IGZhbHNlOyAvLyBJdCBtaW5pbWl6ZXMgdGhlIGFwcFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub2ZmKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0NhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRXhpdCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0V4aXQgPSB0cnVlO1xuICAgICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRydWUgaWYgdGhlcmUgYXJlIHBhZ2VzIHRvIGdvIGJhY2sgdG8sIGFuZCBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gcGFnZXMgaW4gdGhlIHJvdXRlciBoaXN0b3J5XG4gICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tDYWxsYmFjayk7XG4gICAgfVxufVxuIl19