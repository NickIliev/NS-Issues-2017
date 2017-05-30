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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUV4RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUU3QztJQUlJO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxzQkFBSSxnQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFHTyxpQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFFOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNMLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksaUJBQVMsWUFvQnJCLENBQUE7QUFFRDtJQUlJLGtCQUFZLElBQVksRUFBRSxLQUFhO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxnQkFBUSxXQVFwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuXG52YXIganNvbiA9IHJlcXVpcmUoXCIuL1Bob3Rvc1dpdGhOYW1lcy5qc29uXCIpO1xuXG5leHBvcnQgY2xhc3MgVmlld01vZGVsIHtcblxuICAgIHByaXZhdGUgX2l0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGFJdGVtcygpO1xuICAgIH1cblxuICAgIGdldCBkYXRhSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICB9XG5cblxuICAgIHByaXZhdGUgaW5pdERhdGFJdGVtcygpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPigpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaChuZXcgRGF0YUl0ZW0oanNvbi5uYW1lc1tpXSwganNvbi5lbWFpbHNbaV0pKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERhdGFJdGVtIHtcbiAgICBwdWJsaWMgaXRlbU5hbWU7XG4gICAgcHVibGljIGl0ZW1FbWFpbDtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZW1haWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLml0ZW1OYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pdGVtRW1haWwgPSBlbWFpbDtcbiAgICB9XG59XG4iXX0=