"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var Country = (function () {
    function Country(Country, Amount, SecondVal, ThirdVal, Impact, Year) {
        this.Country = Country;
        this.Amount = Amount;
        this.SecondVal = SecondVal;
        this.ThirdVal = ThirdVal;
        this.Impact = Impact;
        this.Year = Year;
    }
    return Country;
}());
exports.Country = Country;
var ItemsComponent = (function () {
    function ItemsComponent(_dataService) {
        this._dataService = _dataService;
        this.barSeries = "Bar Series";
    }
    Object.defineProperty(ItemsComponent.prototype, "categoricalSource", {
        get: function () {
            return this._categoricalSource;
        },
        enumerable: true,
        configurable: true
    });
    ItemsComponent.prototype.ngOnInit = function () {
        this._categoricalSource = new observable_array_1.ObservableArray(this._dataService.getCategoricalSource());
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQUM3QywyRUFBeUU7QUFFekU7SUFDSSxpQkFBbUIsT0FBZ0IsRUFBUyxNQUFlLEVBQVMsU0FBa0IsRUFBUyxRQUFpQixFQUFTLE1BQWUsRUFBUyxJQUFhO1FBQTNJLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztRQUFTLGFBQVEsR0FBUixRQUFRLENBQVM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUztJQUM5SixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksMEJBQU87QUFVcEI7SUFNSSx3QkFBb0IsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7SUFDbEMsQ0FBQztJQUVELHNCQUFJLDZDQUFpQjthQUFyQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFFRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBaEJRLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBT29DLDBCQUFXO09BTnBDLGNBQWMsQ0FpQjFCO0lBQUQscUJBQUM7Q0FBQSxBQWpCRCxJQWlCQztBQWpCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuZXhwb3J0IGNsYXNzIENvdW50cnkge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBDb3VudHJ5Pzogc3RyaW5nLCBwdWJsaWMgQW1vdW50PzogbnVtYmVyLCBwdWJsaWMgU2Vjb25kVmFsPzogbnVtYmVyLCBwdWJsaWMgVGhpcmRWYWw/OiBudW1iZXIsIHB1YmxpYyBJbXBhY3Q/OiBudW1iZXIsIHB1YmxpYyBZZWFyPzogbnVtYmVyKSB7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBiYXJTZXJpZXM6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2NhdGVnb3JpY2FsU291cmNlOiBPYnNlcnZhYmxlQXJyYXk8Q291bnRyeT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhU2VydmljZTogSXRlbVNlcnZpY2UpIHsgXG4gICAgICAgIHRoaXMuYmFyU2VyaWVzID0gXCJCYXIgU2VyaWVzXCI7XG4gICAgfVxuXG4gICAgZ2V0IGNhdGVnb3JpY2FsU291cmNlKCk6IE9ic2VydmFibGVBcnJheTxDb3VudHJ5PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYXRlZ29yaWNhbFNvdXJjZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fY2F0ZWdvcmljYWxTb3VyY2UgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuX2RhdGFTZXJ2aWNlLmdldENhdGVnb3JpY2FsU291cmNlKCkpO1xuICAgIH1cbn0iXX0=