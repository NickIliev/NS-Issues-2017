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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQU0xQyxJQUFhLFlBQVk7SUFKekI7UUFNVyxZQUFPLEdBQVcsRUFBRSxDQUFDO0lBY2hDLENBQUM7SUFaRyxzQkFBVyxpQ0FBTzthQUFsQjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3ZDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsK0NBQStDLENBQUM7WUFDM0QsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBRU0sNEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLFlBQVk7SUFKeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7S0FDcEMsQ0FBQztHQUNXLFlBQVksQ0FnQnhCO0FBaEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7IFxyXG4gXHJcbiAgICBwdWJsaWMgY291bnRlcjogbnVtYmVyID0gMTY7XHJcbiBcclxuICAgIHB1YmxpYyBnZXQgbWVzc2FnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmNvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50ZXIgKyBcIiB0YXBzIGxlZnRcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJIb29ycmFhYXkhIFxcbllvdSBhcmUgcmVhZHkgdG8gc3RhcnQgYnVpbGRpbmchXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgb25UYXAoKSB7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyLS07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==