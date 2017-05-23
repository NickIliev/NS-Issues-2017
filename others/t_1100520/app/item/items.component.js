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
        if (args.itemIndex > 5) {
            args.returnValue = false; // all items with index > 5 WONT be selectible
            console.log("returnValue: " + args.returnValue); // false
        }
    };
    ItemsComponent.prototype.itemSelected = function (args) {
        console.log("Item selected!");
        console.log("itemIndex: " + args.itemIndex);
        console.log("groupIndex: " + args.groupIndex);
    };
    ItemsComponent.prototype.itemDeselected = function (args) {
        console.log("Item deselected!");
        console.log("itemIndex: " + args.itemIndex);
        console.log("groupIndex: " + args.groupIndex);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVM3QyxJQUFhLGNBQWM7SUFHdkIsd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUV4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyw4Q0FBOEM7WUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUM3RCxDQUFDO0lBRUwsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxJQUF1QjtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsdUNBQWMsR0FBZCxVQUFlLElBQXVCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDeEMsQ0FBQztxQ0FJbUMsMEJBQVc7R0FIbkMsY0FBYyxDQWlDMUI7QUFqQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0uc2VydmljZVwiO1xuXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXdcIlxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaXRlbXM6IEl0ZW1bXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIH1cblxuICAgIGl0ZW1TZWxlY3RpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJdGVtIHNlbGVjdGluZyFcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbUluZGV4OiBcIiArIGFyZ3MuaXRlbUluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJncm91cEluZGV4OiBcIiArIGFyZ3MuZ3JvdXBJbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmV0dXJuVmFsdWU6IFwiICsgYXJncy5yZXR1cm5WYWx1ZSk7IC8vIHRydWVcblxuICAgICAgICBpZiAoYXJncy5pdGVtSW5kZXggPiA1KSB7XG4gICAgICAgICAgICBhcmdzLnJldHVyblZhbHVlID0gZmFsc2U7IC8vIGFsbCBpdGVtcyB3aXRoIGluZGV4ID4gNSBXT05UIGJlIHNlbGVjdGlibGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmV0dXJuVmFsdWU6IFwiICsgYXJncy5yZXR1cm5WYWx1ZSk7IC8vIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIFxuICAgIH1cblxuICAgIGl0ZW1TZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gc2VsZWN0ZWQhXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1JbmRleDogXCIgKyBhcmdzLml0ZW1JbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ3JvdXBJbmRleDogXCIgKyBhcmdzLmdyb3VwSW5kZXgpO1xuICAgIH1cblxuICAgIGl0ZW1EZXNlbGVjdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBkZXNlbGVjdGVkIVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVtSW5kZXg6IFwiICsgYXJncy5pdGVtSW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImdyb3VwSW5kZXg6IFwiICsgYXJncy5ncm91cEluZGV4KTtcbiAgICB9XG59XG4iXX0=