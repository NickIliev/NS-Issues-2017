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
        this.items[args.itemIndex].isSelected = true;
    };
    ItemsComponent.prototype.itemDeselected = function (args) {
        this.items[args.itemIndex].isSelected = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVM3QyxJQUFhLGNBQWM7SUFHdkIsd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUN4RCw0QkFBNEI7UUFDNUIsK0VBQStFO1FBQy9FLGdFQUFnRTtRQUNoRSxJQUFJO0lBQ1IsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxJQUF1QjtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ2pELENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsSUFBdUI7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBRUQsc0NBQWEsR0FBYixVQUFjLElBQW1CO0lBRWpDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDeEMsQ0FBQztxQ0FJbUMsMEJBQVc7R0FIbkMsY0FBYyxDQStCMUI7QUEvQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0uc2VydmljZVwiO1xuXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCJcbmltcG9ydCB7IEl0ZW1FdmVudEFyZ3MgIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlldy9hbmd1bGFyXCJcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpdGVtczogSXRlbVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgaXRlbVNlbGVjdGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gc2VsZWN0aW5nIVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVtSW5kZXg6IFwiICsgYXJncy5pdGVtSW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImdyb3VwSW5kZXg6IFwiICsgYXJncy5ncm91cEluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXR1cm5WYWx1ZTogXCIgKyBhcmdzLnJldHVyblZhbHVlKTsgLy8gdHJ1ZVxuICAgICAgICAvLyBpZiAoYXJncy5pdGVtSW5kZXggPiA1KSB7XG4gICAgICAgIC8vICAgICBhcmdzLnJldHVyblZhbHVlID0gZmFsc2U7IC8vIGFsbCBpdGVtcyB3aXRoIGluZGV4ID4gNSBXT05UIGJlIHNlbGVjdGlibGVcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwicmV0dXJuVmFsdWU6IFwiICsgYXJncy5yZXR1cm5WYWx1ZSk7IC8vIGZhbHNlXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBpdGVtU2VsZWN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5pdGVtc1thcmdzLml0ZW1JbmRleF0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaXRlbURlc2VsZWN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5pdGVtc1thcmdzLml0ZW1JbmRleF0uaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uSXRlbUxvYWRpbmcoYXJnczogSXRlbUV2ZW50QXJncykge1xuXG4gICAgfVxufVxuIl19