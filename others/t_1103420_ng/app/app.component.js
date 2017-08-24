"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
    }
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.onTap = function () {
        this.counter--;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        templateUrl: "app.component.html",
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQU0xQyxJQUFhLFlBQVk7SUFKekI7UUFNVyxZQUFPLEdBQVcsRUFBRSxDQUFDO0lBY2hDLENBQUM7SUFaRyxzQkFBVyxpQ0FBTzthQUFsQjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3ZDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsK0NBQStDLENBQUM7WUFDM0QsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBRU0sNEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLFlBQVk7SUFKeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7S0FDcEMsQ0FBQztHQUNXLFlBQVksQ0FnQnhCO0FBaEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7IFxuIFxuICAgIHB1YmxpYyBjb3VudGVyOiBudW1iZXIgPSAxNjtcbiBcbiAgICBwdWJsaWMgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuY291bnRlciA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50ZXIgKyBcIiB0YXBzIGxlZnRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIkhvb3JyYWFheSEgXFxuWW91IGFyZSByZWFkeSB0byBzdGFydCBidWlsZGluZyFcIjtcbiAgICAgICAgfVxuICAgIH1cbiBcbiAgICBwdWJsaWMgb25UYXAoKSB7XG4gICAgICAgIHRoaXMuY291bnRlci0tO1xuICAgIH1cblxufVxuIl19