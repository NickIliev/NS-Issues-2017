"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
        this._canBeSelected = false;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.itemSelected = function (args) {
        if (this._canBeSelected) {
            console.log("Selectible ITEM!");
            var item = this.items[args.itemIndex];
            item.selected = true; // using selected property of our item to apply the style (and this way overwrite the default selected styling)
        }
        else {
            console.log("NON-Selectible item!");
            var item = this.items[args.itemIndex];
            item.selected = false; // using selected property of our item to apply the style (and this way overwrite the default selected styling)
        }
    };
    ItemsComponent.prototype.itemDeselected = function (args) {
        var item = this.items[args.itemIndex];
        item.selected = false;
    };
    ItemsComponent.prototype.itemSelecting = function (args) {
        // on item selecting we create the rule if the item should be selectable or not
        if (args.itemIndex < 10) {
            this._canBeSelected = true;
        }
        else {
            this._canBeSelected = false;
        }
        console.log("this._canBeSelected: " + this._canBeSelected);
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        providers: [item_service_1.ItemService],
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVU3QyxJQUFhLGNBQWM7SUFHdkIsd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTXBDLG1CQUFjLEdBQVksS0FBSyxDQUFDO0lBTlEsQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFJTSxxQ0FBWSxHQUFuQixVQUFvQixJQUF1QjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQywrR0FBK0c7UUFDekksQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXRDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsK0dBQStHO1FBQzFJLENBQUM7SUFDTCxDQUFDO0lBRU0sdUNBQWMsR0FBckIsVUFBc0IsSUFBdUI7UUFFekMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVNLHNDQUFhLEdBQXBCLFVBQXFCLElBQXVCO1FBQ3hDLCtFQUErRTtRQUMvRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksY0FBYztJQU4xQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDeEIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO3FDQUltQywwQkFBVztHQUhuQyxjQUFjLENBMEMxQjtBQTFDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbSXRlbVNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW1zOiBJdGVtW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYW5CZVNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgaXRlbVNlbGVjdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW5CZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGlibGUgSVRFTSFcIik7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuaXRlbXNbYXJncy5pdGVtSW5kZXhdO1xuXG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTsgLy8gdXNpbmcgc2VsZWN0ZWQgcHJvcGVydHkgb2Ygb3VyIGl0ZW0gdG8gYXBwbHkgdGhlIHN0eWxlIChhbmQgdGhpcyB3YXkgb3ZlcndyaXRlIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0eWxpbmcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5PTi1TZWxlY3RpYmxlIGl0ZW0hXCIpO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLml0ZW1zW2FyZ3MuaXRlbUluZGV4XTtcblxuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlOyAvLyB1c2luZyBzZWxlY3RlZCBwcm9wZXJ0eSBvZiBvdXIgaXRlbSB0byBhcHBseSB0aGUgc3R5bGUgKGFuZCB0aGlzIHdheSBvdmVyd3JpdGUgdGhlIGRlZmF1bHQgc2VsZWN0ZWQgc3R5bGluZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpdGVtRGVzZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuXG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5pdGVtc1thcmdzLml0ZW1JbmRleF07XG5cbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpdGVtU2VsZWN0aW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIC8vIG9uIGl0ZW0gc2VsZWN0aW5nIHdlIGNyZWF0ZSB0aGUgcnVsZSBpZiB0aGUgaXRlbSBzaG91bGQgYmUgc2VsZWN0YWJsZSBvciBub3RcbiAgICAgICAgaWYgKGFyZ3MuaXRlbUluZGV4IDwgMTApIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbkJlU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY2FuQmVTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl9jYW5CZVNlbGVjdGVkOiBcIiArIHRoaXMuX2NhbkJlU2VsZWN0ZWQpO1xuICAgIH1cbn1cbiJdfQ==