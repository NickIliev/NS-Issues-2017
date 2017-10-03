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
    ItemsComponent.prototype.ngAfterViewInit = function () {
        var nativeElement = this.tabView.nativeElement;
        console.log(nativeElement);
    };
    ItemsComponent.prototype.onTabLoaded = function (args) {
        var tab = args.object;
        console.log("ontabLoaded: " + tab.nativeView);
    };
    __decorate([
        core_1.ViewChild('tabView'),
        __metadata("design:type", core_1.ElementRef)
    ], ItemsComponent.prototype, "tabView", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBR3pFLCtDQUE2QztBQVc3QztJQUtJLHdCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFakQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUNJLElBQUksYUFBYSxHQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFL0IsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxJQUFlO1FBQ3ZCLElBQUksR0FBRyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFsQnFCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFXLGlCQUFVO21EQUFDO0lBSGxDLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBTW1DLDBCQUFXO09BTG5DLGNBQWMsQ0FzQjFCO0lBQUQscUJBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgVGFiVmlldyB9IGZyb20gXCJ1aS90YWItdmlld1wiO1xuXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpdGVtczogSXRlbVtdO1xuXG4gICAgQFZpZXdDaGlsZCgndGFiVmlldycpIHRhYlZpZXcgOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IG5hdGl2ZUVsZW1lbnQgPSA8VGFiVmlldz50aGlzLnRhYlZpZXcubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc29sZS5sb2cobmF0aXZlRWxlbWVudCk7XG5cbiAgICB9XG5cbiAgICBvblRhYkxvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcbiAgICAgICAgbGV0IHRhYiA9IDxUYWJWaWV3PmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwib250YWJMb2FkZWQ6IFwiICsgdGFiLm5hdGl2ZVZpZXcpXG4gICAgfVxufSJdfQ==