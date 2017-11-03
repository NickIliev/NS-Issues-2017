"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_array_1 = require("tns-core-modules/data/observable-array");
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var ItemDetailComponent = (function () {
    function ItemDetailComponent(_dataService) {
        this._dataService = _dataService;
    }
    Object.defineProperty(ItemDetailComponent.prototype, "pieSource", {
        get: function () {
            return this._pieSource;
        },
        enumerable: true,
        configurable: true
    });
    ItemDetailComponent.prototype.ngOnInit = function () {
        this._pieSource = new observable_array_1.ObservableArray(this._dataService.getCategoricalSource());
    };
    ItemDetailComponent = __decorate([
        core_1.Component({
            selector: "ns-details",
            moduleId: module.id,
            templateUrl: "./item-detail.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], ItemDetailComponent);
    return ItemDetailComponent;
}());
exports.ItemDetailComponent = ItemDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkVBQXlFO0FBQ3pFLHNDQUFrRDtBQUdsRCwrQ0FBc0Q7QUFTdEQ7SUFJSSw2QkFBb0IsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7SUFBSSxDQUFDO0lBRWxELHNCQUFJLDBDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBWlEsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtTQUM5QyxDQUFDO3lDQU1vQywwQkFBVztPQUpwQyxtQkFBbUIsQ0FjL0I7SUFBRCwwQkFBQztDQUFBLEFBZEQsSUFjQztBQWRZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IENvdW50cnksIEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9pdGVtLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWRldGFpbHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbS1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5cbmV4cG9ydCBjbGFzcyBJdGVtRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgX3BpZVNvdXJjZTogT2JzZXJ2YWJsZUFycmF5PENvdW50cnk+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YVNlcnZpY2U6IEl0ZW1TZXJ2aWNlKSB7IH1cblxuICAgIGdldCBwaWVTb3VyY2UoKTogT2JzZXJ2YWJsZUFycmF5PENvdW50cnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpZVNvdXJjZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fcGllU291cmNlID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLl9kYXRhU2VydmljZS5nZXRDYXRlZ29yaWNhbFNvdXJjZSgpKTtcbiAgICB9XG5cbn1cbiJdfQ==