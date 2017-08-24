"use strict";
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.selectedIndex = 1;
        this.items = [];
        this.secondaryItems = [];
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
            this.secondaryItems.push("seconddary item " + i);
        }
    }
    ItemsComponent.prototype.ngOnInit = function () {
    };
    ItemsComponent.prototype.onchangeState = function (args) {
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
    };
    ItemsComponent.prototype.onopen = function () {
        console.log("Drop Down opened.");
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFVbEQsSUFBYSxjQUFjO0lBS3ZCO1FBSk8sa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFDMUIsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBR3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBRUQsaUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFTSxzQ0FBYSxHQUFwQixVQUFxQixJQUFtQztRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUF5QyxJQUFJLENBQUMsUUFBUSxZQUFPLElBQUksQ0FBQyxRQUFVLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sK0JBQU0sR0FBYjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBeEJZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7O0dBQ1csY0FBYyxDQXdCMUI7QUF4Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4ID0gMTtcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBwdWJsaWMgc2Vjb25kYXJ5SXRlbXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goXCJkYXRhIGl0ZW0gXCIgKyBpKTtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kYXJ5SXRlbXMucHVzaChcInNlY29uZGRhcnkgaXRlbSBcIiArIGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG4gXG4gICAgcHVibGljIG9uY2hhbmdlU3RhdGUoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkIGZyb20gJHthcmdzLm9sZEluZGV4fSB0byAke2FyZ3MubmV3SW5kZXh9YCk7XG4gICAgfVxuIFxuICAgIHB1YmxpYyBvbm9wZW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRHJvcCBEb3duIG9wZW5lZC5cIik7XG4gICAgfVxufVxuIl19