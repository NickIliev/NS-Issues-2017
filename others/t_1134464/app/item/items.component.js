"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var listview_1 = require("nativescript-pro-ui/listview");
var application_1 = require("application");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
        this.columns = 2;
        console.log("constructor");
    }
    ItemsComponent.prototype.onRadListLoaded = function (args) {
        this.radList = args.object;
    };
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = this.itemService.getItems();
        application_1.on("orientationChanged", function (args) {
            console.log("orientationChanged");
            if (args.newValue == "portrait") {
                var staggeredLayout = new listview_1.ListViewStaggeredLayout();
                staggeredLayout.scrollDirection = "Vertical";
                staggeredLayout.spanCount = 2;
                _this.radList.listViewLayout = staggeredLayout;
            }
            else {
                var staggeredLayout = new listview_1.ListViewStaggeredLayout();
                staggeredLayout.scrollDirection = "Vertical";
                staggeredLayout.spanCount = 3;
                _this.radList.listViewLayout = staggeredLayout;
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQUU3Qyx5REFBb0Y7QUFFcEYsMkNBQXNHO0FBT3RHO0lBTUksd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSjVDLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFLaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRUQsd0NBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDNUMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFxQkc7UUFwQkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLGdCQUFhLENBQUMsb0JBQW9CLEVBQUUsVUFBQyxJQUFpQztZQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFbEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLGVBQWUsR0FBRyxJQUFJLGtDQUF1QixFQUFFLENBQUM7Z0JBQ3BELGVBQWUsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO2dCQUM3QyxlQUFlLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFFOUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO1lBQ2xELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLGVBQWUsR0FBRyxJQUFJLGtDQUF1QixFQUFFLENBQUM7Z0JBQ3BELGVBQWUsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO2dCQUM3QyxlQUFlLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFFOUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO1lBQ2xELENBQUM7UUFHTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFuQ00sY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FPbUMsMEJBQVc7T0FObkMsY0FBYyxDQXFDMUI7SUFBRCxxQkFBQztDQUFBLEFBckNELElBcUNDO0FBckNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgUmFkTGlzdFZpZXcsIExpc3RWaWV3U3RhZ2dlcmVkTGF5b3V0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXdcIjtcblxuaW1wb3J0IHsgb24gYXMgYXBwbGljYXRpb25Pbiwgb2ZmIGFzIGFwcGxpY2F0aW9uT2ZmLCBPcmllbnRhdGlvbkNoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW1zOiBJdGVtW107XG4gICAgY29sdW1uczogbnVtYmVyID0gMjtcblxuICAgIHJhZExpc3Q6IFJhZExpc3RWaWV3O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uc3RydWN0b3JcIilcbiAgICB9XG5cbiAgICBvblJhZExpc3RMb2FkZWQoYXJncykge1xuICAgICAgICB0aGlzLnJhZExpc3QgPSA8UmFkTGlzdFZpZXc+YXJncy5vYmplY3Q7ICAgIFxuICAgIH1cblxuICAgIG5nT25Jbml0KCkgeyAgXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgICAgIGFwcGxpY2F0aW9uT24oXCJvcmllbnRhdGlvbkNoYW5nZWRcIiwgKGFyZ3M6IE9yaWVudGF0aW9uQ2hhbmdlZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcmllbnRhdGlvbkNoYW5nZWRcIik7XG5cbiAgICAgICAgICAgIGlmKGFyZ3MubmV3VmFsdWUgPT0gXCJwb3J0cmFpdFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YWdnZXJlZExheW91dCA9IG5ldyBMaXN0Vmlld1N0YWdnZXJlZExheW91dCgpO1xuICAgICAgICAgICAgICAgIHN0YWdnZXJlZExheW91dC5zY3JvbGxEaXJlY3Rpb24gPSBcIlZlcnRpY2FsXCI7XG4gICAgICAgICAgICAgICAgc3RhZ2dlcmVkTGF5b3V0LnNwYW5Db3VudCA9IDI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJhZExpc3QubGlzdFZpZXdMYXlvdXQgPSBzdGFnZ2VyZWRMYXlvdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdGFnZ2VyZWRMYXlvdXQgPSBuZXcgTGlzdFZpZXdTdGFnZ2VyZWRMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICBzdGFnZ2VyZWRMYXlvdXQuc2Nyb2xsRGlyZWN0aW9uID0gXCJWZXJ0aWNhbFwiO1xuICAgICAgICAgICAgICAgIHN0YWdnZXJlZExheW91dC5zcGFuQ291bnQgPSAzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yYWRMaXN0Lmxpc3RWaWV3TGF5b3V0ID0gc3RhZ2dlcmVkTGF5b3V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSk7ICBcbiAgICAgIH1cblxufSJdfQ==