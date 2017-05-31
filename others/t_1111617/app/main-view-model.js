"use strict";
var observable_array_1 = require("data/observable-array");
var json = require("./PhotosWithNames.json");
var ViewModel = (function () {
    function ViewModel() {
        this.initDataItems();
    }
    Object.defineProperty(ViewModel.prototype, "dataItems", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        for (var i = 0; i < json.names.length; i++) {
            this._items.push(new DataItem(json.names[i], json.emails[i]));
        }
    };
    return ViewModel;
}());
exports.ViewModel = ViewModel;
var DataItem = (function () {
    function DataItem(name, email) {
        this.itemName = name;
        this.itemEmail = email;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUV4RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUU3QztJQUlJO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxzQkFBSSxnQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFHTyxpQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFFOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNMLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksaUJBQVMsWUFvQnJCLENBQUE7QUFFRDtJQUlJLGtCQUFZLElBQVksRUFBRSxLQUFhO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxnQkFBUSxXQVFwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5cclxudmFyIGpzb24gPSByZXF1aXJlKFwiLi9QaG90b3NXaXRoTmFtZXMuanNvblwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBWaWV3TW9kZWwge1xyXG5cclxuICAgIHByaXZhdGUgX2l0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGFJdGVtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkYXRhSXRlbXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhSXRlbXMoKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPigpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaChuZXcgRGF0YUl0ZW0oanNvbi5uYW1lc1tpXSwganNvbi5lbWFpbHNbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhSXRlbSB7XHJcbiAgICBwdWJsaWMgaXRlbU5hbWU7XHJcbiAgICBwdWJsaWMgaXRlbUVtYWlsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZW1haWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaXRlbU5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuaXRlbUVtYWlsID0gZW1haWw7XHJcbiAgICB9XHJcbn1cclxuIl19