"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var dataItem_service_1 = require("./dataItem.service");
var BrowseComponent = (function () {
    function BrowseComponent(_dataItemService) {
        this._dataItemService = _dataItemService;
    }
    Object.defineProperty(BrowseComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    BrowseComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray(this._dataItemService.getDataItems());
    };
    BrowseComponent = __decorate([
        core_1.Component({
            selector: "Browse",
            moduleId: module.id,
            providers: [dataItem_service_1.DataItemService],
            templateUrl: "./browse.component.html"
        }),
        __metadata("design:paramtypes", [dataItem_service_1.DataItemService])
    ], BrowseComponent);
    return BrowseComponent;
}());
exports.BrowseComponent = BrowseComponent;
var DataItem = (function () {
    function DataItem(id, name, description, title, text, image, selected, type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.title = title;
        this.text = text;
        this.image = image;
        this.selected = selected;
        this.type = type;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMkVBQXlFO0FBQ3pFLHVEQUFxRDtBQVFyRDtJQUdRLHlCQUFvQixnQkFBaUM7UUFBakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtJQUNyRCxDQUFDO0lBRUQsc0JBQUksc0NBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsa0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFaSSxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFDLENBQUMsa0NBQWUsQ0FBQztZQUMzQixXQUFXLEVBQUUseUJBQXlCO1NBQ3pDLENBQUM7eUNBSTRDLGtDQUFlO09BSGhELGVBQWUsQ0FhM0I7SUFBRCxzQkFBQztDQUFBLEFBYkQsSUFhQztBQWJZLDBDQUFlO0FBZTVCO0lBQ0ksa0JBQW1CLEVBQVcsRUFBUyxJQUFhLEVBQVMsV0FBb0IsRUFBUyxLQUFjLEVBQVMsSUFBYSxFQUFTLEtBQWMsRUFBUyxRQUFrQixFQUFTLElBQWE7UUFBbkwsT0FBRSxHQUFGLEVBQUUsQ0FBUztRQUFTLFNBQUksR0FBSixJQUFJLENBQVM7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUFTLFVBQUssR0FBTCxLQUFLLENBQVM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFTO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFTO0lBQ3RNLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IERhdGFJdGVtU2VydmljZSB9IGZyb20gXCIuL2RhdGFJdGVtLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQnJvd3NlXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgcHJvdmlkZXJzOltEYXRhSXRlbVNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9icm93c2UuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnJvd3NlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGFJdGVtU2VydmljZTogRGF0YUl0ZW1TZXJ2aWNlKSB7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUl0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLl9kYXRhSXRlbVNlcnZpY2UuZ2V0RGF0YUl0ZW1zKCkpO1xyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFJdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZD86IG51bWJlciwgcHVibGljIG5hbWU/OiBzdHJpbmcsIHB1YmxpYyBkZXNjcmlwdGlvbj86IHN0cmluZywgcHVibGljIHRpdGxlPzogc3RyaW5nLCBwdWJsaWMgdGV4dD86IHN0cmluZywgcHVibGljIGltYWdlPzogc3RyaW5nLCBwdWJsaWMgc2VsZWN0ZWQ/OiBib29sZWFuLCBwdWJsaWMgdHlwZT86IHN0cmluZykge1xyXG4gICAgfVxyXG59Il19