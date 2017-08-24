"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.isLogged = false;
    }
    ItemsComponent.prototype.onIndexChanged = function (args) {
        var tabView = args.object;
        console.log("Selected index changed! New inxed: " + tabView.selectedIndex);
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQWtEO0FBUWxELElBQWEsY0FBYztJQUwzQjtRQU9XLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFNckMsQ0FBQztJQUpVLHVDQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFDdEIsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7R0FDVyxjQUFjLENBUTFCO0FBUlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFRhYlZpZXcsIFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInVpL3RhYi12aWV3XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50ICB7XG5cbiAgICBwdWJsaWMgaXNMb2dnZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBvbkluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCB0YWJWaWV3ID0gPFRhYlZpZXc+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaW5kZXggY2hhbmdlZCEgTmV3IGlueGVkOiBcIiArIHRhYlZpZXcuc2VsZWN0ZWRJbmRleCk7XG4gICAgfVxufVxuIl19