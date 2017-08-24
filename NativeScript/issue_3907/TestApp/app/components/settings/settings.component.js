"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SettingsComponent = (function () {
    function SettingsComponent(router) {
        this.router = router;
    }
    SettingsComponent.prototype.showNotifications = function () {
        this.router.navigate(["/notifications"]);
    };
    SettingsComponent.prototype.showPro = function () {
        console.log("navigate to pro");
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "settings",
        templateUrl: "settings.html",
        styleUrls: ["settings.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUM7QUFDekMsMENBQXlDO0FBV3pDLElBQWEsaUJBQWlCO0lBRzFCLDJCQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFdEMsNkNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUdELG1DQUFPLEdBQVA7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSxpQkFBaUI7SUFSN0IsZ0JBQVMsQ0FBRTtRQUNSLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsZUFBZTtRQUM1QixTQUFTLEVBQUMsQ0FBQyxjQUFjLENBQUM7S0FDN0IsQ0FBQztxQ0FNOEIsZUFBTTtHQUh6QixpQkFBaUIsQ0FhN0I7QUFiWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5cbkBDb21wb25lbnQgKHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwic2V0dGluZ3MuaHRtbFwiLFxuICAgIHN0eWxlVXJsczpbXCJzZXR0aW5ncy5jc3NcIl1cbn0pXG5cblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IHtcblxuICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgIHNob3dOb3RpZmljYXRpb25zKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbm90aWZpY2F0aW9uc1wiXSlcbiAgICB9XG4gICAgXG4gICAgXG4gICAgc2hvd1BybygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJuYXZpZ2F0ZSB0byBwcm9cIilcbiAgICB9XG59Il19