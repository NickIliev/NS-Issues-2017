"use strict";
var core_1 = require("@angular/core");
var orientation = require('nativescript-orientation');
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
    }
    AppComponent.prototype.ngOnInit = function () {
        orientation.enableRotation();
    };
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
        console.log(orientation.getOrientation());
    };
    AppComponent.prototype.setLandscapeOrientation = function () {
        orientation.setOrientation("landscape");
    };
    AppComponent.prototype.setPortraitOrientation = function () {
        orientation.setOrientation("portrait");
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUNsRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQU10RDtJQUFBO1FBQ1csWUFBTyxHQUFXLEVBQUUsQ0FBQztJQTBCaEMsQ0FBQztJQXhCRywrQkFBUSxHQUFSO1FBQ0ksV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQkFBVyxpQ0FBTzthQUFsQjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3ZDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsK0NBQStDLENBQUM7WUFDM0QsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBRU0sNEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLDhDQUF1QixHQUE5QjtRQUNJLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLDZDQUFzQixHQUE3QjtRQUNJLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQTlCTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7O29CQUFBO0lBNEJGLG1CQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxvQkFBWSxlQTJCeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbnZhciBvcmllbnRhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1vcmllbnRhdGlvbicpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgY291bnRlcjogbnVtYmVyID0gMTY7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgb3JpZW50YXRpb24uZW5hYmxlUm90YXRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuY291bnRlciA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50ZXIgKyBcIiB0YXBzIGxlZnRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIkhvb3JyYWFheSEgXFxuWW91IGFyZSByZWFkeSB0byBzdGFydCBidWlsZGluZyFcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgb25UYXAoKSB7XG4gICAgICAgIHRoaXMuY291bnRlci0tO1xuICAgICAgICBjb25zb2xlLmxvZyhvcmllbnRhdGlvbi5nZXRPcmllbnRhdGlvbigpKTsgIFxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRMYW5kc2NhcGVPcmllbnRhdGlvbigpIHtcbiAgICAgICAgb3JpZW50YXRpb24uc2V0T3JpZW50YXRpb24oXCJsYW5kc2NhcGVcIik7ICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9ydHJhaXRPcmllbnRhdGlvbigpIHtcbiAgICAgICAgb3JpZW50YXRpb24uc2V0T3JpZW50YXRpb24oXCJwb3J0cmFpdFwiKTsgIFxuICAgIH1cbn1cbiJdfQ==