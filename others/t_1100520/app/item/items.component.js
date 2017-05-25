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
    ItemsComponent.prototype.radListLoaded = function (args) {
        var listView = args.object;
        console.log("itemSelected'");
        listView.selectItemAt(0);
    };
    ItemsComponent.prototype.itemSelected = function (args) {
        console.log("itemSelected'");
        this.items[args.itemIndex].isSelected = true;
    };
    ItemsComponent.prototype.itemDeselected = function (args) {
        console.log("itemDeselected'");
        this.items[args.itemIndex].isSelected = false;
    };
    ItemsComponent.prototype.onItemLoading = function (args) {
        console.log("onItemLoading'");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVM3QyxJQUFhLGNBQWM7SUFHdkIsd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUN4RCw0QkFBNEI7UUFDNUIsK0VBQStFO1FBQy9FLGdFQUFnRTtRQUNoRSxJQUFJO0lBQ1IsQ0FBQztJQUdELHNDQUFhLEdBQWIsVUFBYyxJQUF1QjtRQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLElBQXVCO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBRUQsdUNBQWMsR0FBZCxVQUFlLElBQXVCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ2xELENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBbUI7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDeEMsQ0FBQztxQ0FJbUMsMEJBQVc7R0FIbkMsY0FBYyxDQXdDMUI7QUF4Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xyXG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0uc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiXHJcbmltcG9ydCB7IEl0ZW1FdmVudEFyZ3MgIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlldy9hbmd1bGFyXCJcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGl0ZW1zOiBJdGVtW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVNlbGVjdGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBzZWxlY3RpbmchXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbUluZGV4OiBcIiArIGFyZ3MuaXRlbUluZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdyb3VwSW5kZXg6IFwiICsgYXJncy5ncm91cEluZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJldHVyblZhbHVlOiBcIiArIGFyZ3MucmV0dXJuVmFsdWUpOyAvLyB0cnVlXHJcbiAgICAgICAgLy8gaWYgKGFyZ3MuaXRlbUluZGV4ID4gNSkge1xyXG4gICAgICAgIC8vICAgICBhcmdzLnJldHVyblZhbHVlID0gZmFsc2U7IC8vIGFsbCBpdGVtcyB3aXRoIGluZGV4ID4gNSBXT05UIGJlIHNlbGVjdGlibGVcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJyZXR1cm5WYWx1ZTogXCIgKyBhcmdzLnJldHVyblZhbHVlKTsgLy8gZmFsc2VcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJhZExpc3RMb2FkZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcclxuICAgICAgICB2YXIgbGlzdFZpZXcgPSBhcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1TZWxlY3RlZCdcIik7XHJcbiAgICAgICAgbGlzdFZpZXcuc2VsZWN0SXRlbUF0KDApO1xyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1TZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbVNlbGVjdGVkJ1wiKTtcclxuICAgICAgICB0aGlzLml0ZW1zW2FyZ3MuaXRlbUluZGV4XS5pc1NlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpdGVtRGVzZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbURlc2VsZWN0ZWQnXCIpO1xyXG4gICAgICAgIHRoaXMuaXRlbXNbYXJncy5pdGVtSW5kZXhdLmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkl0ZW1Mb2FkaW5nKGFyZ3M6IEl0ZW1FdmVudEFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uSXRlbUxvYWRpbmcnXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==