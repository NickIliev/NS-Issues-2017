"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.itemSelecting = function (args) {
        console.log("Item selecting!");
        console.log("itemIndex: " + args.itemIndex);
        console.log("groupIndex: " + args.groupIndex);
        console.log("returnValue: " + args.returnValue); // true
        // if (args.itemIndex > 5) {
        //     args.returnValue = false; // all items with index > 5 WONT be selectible
        //     console.log("returnValue: " + args.returnValue); // false
        // }
    };
    ItemsComponent.prototype.itemSelected = function (args) {
        console.log("Item selected!");
        // console.log("itemIndex: " + args.itemIndex);
        // console.log("groupIndex: " + args.groupIndex);
    };
    ItemsComponent.prototype.itemDeselected = function (args) {
        console.log("Item deselected!");
        // console.log("itemIndex: " + args.itemIndex);
        // console.log("groupIndex: " + args.groupIndex);
    };
    ItemsComponent.prototype.onItemLoading = function (args) {
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVM3QyxJQUFhLGNBQWM7SUFHdkIsd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUN4RCw0QkFBNEI7UUFDNUIsK0VBQStFO1FBQy9FLGdFQUFnRTtRQUNoRSxJQUFJO0lBQ1IsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxJQUF1QjtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsK0NBQStDO1FBQy9DLGlEQUFpRDtJQUNyRCxDQUFDO0lBRUQsdUNBQWMsR0FBZCxVQUFlLElBQXVCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQywrQ0FBK0M7UUFDL0MsaURBQWlEO0lBQ3JELENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBbUI7SUFFakMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO3FDQUltQywwQkFBVztHQUhuQyxjQUFjLENBbUMxQjtBQW5DWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhICB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXdcIlxuaW1wb3J0IHsgSXRlbUV2ZW50QXJncyAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3L2FuZ3VsYXJcIlxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW1zOiBJdGVtW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcbiAgICB9XG5cbiAgICBpdGVtU2VsZWN0aW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBzZWxlY3RpbmchXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1JbmRleDogXCIgKyBhcmdzLml0ZW1JbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ3JvdXBJbmRleDogXCIgKyBhcmdzLmdyb3VwSW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJldHVyblZhbHVlOiBcIiArIGFyZ3MucmV0dXJuVmFsdWUpOyAvLyB0cnVlXG4gICAgICAgIC8vIGlmIChhcmdzLml0ZW1JbmRleCA+IDUpIHtcbiAgICAgICAgLy8gICAgIGFyZ3MucmV0dXJuVmFsdWUgPSBmYWxzZTsgLy8gYWxsIGl0ZW1zIHdpdGggaW5kZXggPiA1IFdPTlQgYmUgc2VsZWN0aWJsZVxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJyZXR1cm5WYWx1ZTogXCIgKyBhcmdzLnJldHVyblZhbHVlKTsgLy8gZmFsc2VcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGl0ZW1TZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gc2VsZWN0ZWQhXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIml0ZW1JbmRleDogXCIgKyBhcmdzLml0ZW1JbmRleCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ3JvdXBJbmRleDogXCIgKyBhcmdzLmdyb3VwSW5kZXgpO1xuICAgIH1cblxuICAgIGl0ZW1EZXNlbGVjdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBkZXNlbGVjdGVkIVwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdGVtSW5kZXg6IFwiICsgYXJncy5pdGVtSW5kZXgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdyb3VwSW5kZXg6IFwiICsgYXJncy5ncm91cEluZGV4KTtcbiAgICB9XG5cbiAgICBvbkl0ZW1Mb2FkaW5nKGFyZ3M6IEl0ZW1FdmVudEFyZ3MpIHtcblxuICAgIH1cbn1cbiJdfQ==