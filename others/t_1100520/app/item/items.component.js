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
        // based on the isSelected property in item.service.ts
        for (var index = 0; index < this.items.length; index++) {
            var item = this.items[index];
            console.log("item.isSelected: " + item.isSelected);
            if (item.isSelected) {
                listView.selectItemAt(index);
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVM3QyxJQUFhLGNBQWM7SUFHdkIsd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUN4RCw0QkFBNEI7UUFDNUIsK0VBQStFO1FBQy9FLGdFQUFnRTtRQUNoRSxJQUFJO0lBQ1IsQ0FBQztJQUdELHNDQUFhLEdBQWIsVUFBYyxJQUF1QjtRQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTNCLHNEQUFzRDtRQUN0RCxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDckQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBWSxHQUFaLFVBQWEsSUFBdUI7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ2pELENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsSUFBdUI7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxJQUFtQjtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQztBQS9DWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO3FDQUltQywwQkFBVztHQUhuQyxjQUFjLENBK0MxQjtBQS9DWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XHJcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXdcIlxyXG5pbXBvcnQgeyBJdGVtRXZlbnRBcmdzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlldy9hbmd1bGFyXCJcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGl0ZW1zOiBJdGVtW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVNlbGVjdGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBzZWxlY3RpbmchXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbUluZGV4OiBcIiArIGFyZ3MuaXRlbUluZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdyb3VwSW5kZXg6IFwiICsgYXJncy5ncm91cEluZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJldHVyblZhbHVlOiBcIiArIGFyZ3MucmV0dXJuVmFsdWUpOyAvLyB0cnVlXHJcbiAgICAgICAgLy8gaWYgKGFyZ3MuaXRlbUluZGV4ID4gNSkge1xyXG4gICAgICAgIC8vICAgICBhcmdzLnJldHVyblZhbHVlID0gZmFsc2U7IC8vIGFsbCBpdGVtcyB3aXRoIGluZGV4ID4gNSBXT05UIGJlIHNlbGVjdGlibGVcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJyZXR1cm5WYWx1ZTogXCIgKyBhcmdzLnJldHVyblZhbHVlKTsgLy8gZmFsc2VcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJhZExpc3RMb2FkZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcclxuICAgICAgICB2YXIgbGlzdFZpZXcgPSBhcmdzLm9iamVjdDtcclxuXHJcbiAgICAgICAgLy8gYmFzZWQgb24gdGhlIGlzU2VsZWN0ZWQgcHJvcGVydHkgaW4gaXRlbS5zZXJ2aWNlLnRzXHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbS5pc1NlbGVjdGVkOiBcIiArIGl0ZW0uaXNTZWxlY3RlZClcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaXNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdFZpZXcuc2VsZWN0SXRlbUF0KGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpdGVtU2VsZWN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1TZWxlY3RlZCdcIik7XHJcbiAgICAgICAgdGhpcy5pdGVtc1thcmdzLml0ZW1JbmRleF0uaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbURlc2VsZWN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1EZXNlbGVjdGVkJ1wiKTtcclxuICAgICAgICB0aGlzLml0ZW1zW2FyZ3MuaXRlbUluZGV4XS5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtTG9hZGluZyhhcmdzOiBJdGVtRXZlbnRBcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkl0ZW1Mb2FkaW5nJ1wiKTtcclxuICAgIH1cclxufVxyXG4iXX0=