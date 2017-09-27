"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var constants_1 = require("./constants");
var ListSelectorViewModel = (function (_super) {
    __extends(ListSelectorViewModel, _super);
    // tslint:disable-next-line:ban-types
    function ListSelectorViewModel(context, _closeCallback) {
        var _this = _super.call(this) || this;
        _this._closeCallback = _closeCallback;
        _this._tag = context.tag;
        var protoItems = _this.resolveProtoItems();
        _this._selectedIndex = protoItems.indexOf(context.selectedValue);
        _this._items = [];
        for (var i = 0; i < protoItems.length; i++) {
            _this._items.push({
                value: protoItems[i],
                isSelected: i === _this._selectedIndex ? true : false
            });
        }
        return _this;
    }
    ListSelectorViewModel.prototype.selectItem = function (newSelectedIndex) {
        var oldSelectedItem = this._items[this._selectedIndex];
        oldSelectedItem.isSelected = false;
        var newSelectedItem = this._items[newSelectedIndex];
        newSelectedItem.isSelected = true;
        this._selectedIndex = newSelectedIndex;
        this._closeCallback(newSelectedItem.value);
    };
    ListSelectorViewModel.prototype.cancelSelection = function () {
        this._closeCallback(null);
    };
    Object.defineProperty(ListSelectorViewModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListSelectorViewModel.prototype, "title", {
        get: function () {
            return "Select Car " + this.capitalizeFirstLetter(this._tag);
        },
        enumerable: true,
        configurable: true
    });
    ListSelectorViewModel.prototype.resolveProtoItems = function () {
        switch (this._tag) {
            case "class":
                return constants_1.carClassList;
            case "doors":
                return constants_1.carDoorList;
            case "seats":
                return constants_1.carSeatList;
            case "transmission":
                return constants_1.carTransmissionList;
        }
    };
    ListSelectorViewModel.prototype.capitalizeFirstLetter = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return ListSelectorViewModel;
}(observable_1.Observable));
exports.ListSelectorViewModel = ListSelectorViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rvci12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdC1zZWxlY3Rvci12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLHlDQUEwRjtBQUUxRjtJQUEyQyx5Q0FBVTtJQUtqRCxxQ0FBcUM7SUFDckMsK0JBQVksT0FBWSxFQUFVLGNBQXdCO1FBQTFELFlBQ0ksaUJBQU8sU0FhVjtRQWRpQyxvQkFBYyxHQUFkLGNBQWMsQ0FBVTtRQUd0RCxLQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFFeEIsSUFBTSxVQUFVLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDNUMsS0FBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRSxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN6QyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDYixLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsVUFBVSxFQUFFLENBQUMsS0FBSyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxLQUFLO2FBQ3ZELENBQUMsQ0FBQztRQUNQLENBQUM7O0lBQ0wsQ0FBQztJQUVELDBDQUFVLEdBQVYsVUFBVyxnQkFBd0I7UUFDL0IsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekQsZUFBZSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbkMsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RELGVBQWUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxzQkFBSSx3Q0FBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3Q0FBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLGdCQUFjLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7SUFFTyxpREFBaUIsR0FBekI7UUFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLE9BQU87Z0JBQ1IsTUFBTSxDQUFDLHdCQUFZLENBQUM7WUFDeEIsS0FBSyxPQUFPO2dCQUNSLE1BQU0sQ0FBQyx1QkFBVyxDQUFDO1lBQ3ZCLEtBQUssT0FBTztnQkFDUixNQUFNLENBQUMsdUJBQVcsQ0FBQztZQUN2QixLQUFLLGNBQWM7Z0JBQ2YsTUFBTSxDQUFDLCtCQUFtQixDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRU8scURBQXFCLEdBQTdCLFVBQThCLEdBQVc7UUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBN0RELENBQTJDLHVCQUFVLEdBNkRwRDtBQTdEWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IHsgY2FyQ2xhc3NMaXN0LCBjYXJEb29yTGlzdCwgY2FyU2VhdExpc3QsIGNhclRyYW5zbWlzc2lvbkxpc3QgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMaXN0U2VsZWN0b3JWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiBBcnJheTxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfdGFnOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDogYW55LCBwcml2YXRlIF9jbG9zZUNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RhZyA9IGNvbnRleHQudGFnO1xyXG5cclxuICAgICAgICBjb25zdCBwcm90b0l0ZW1zID0gdGhpcy5yZXNvbHZlUHJvdG9JdGVtcygpO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBwcm90b0l0ZW1zLmluZGV4T2YoY29udGV4dC5zZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdG9JdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm90b0l0ZW1zW2ldLFxyXG4gICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogaSA9PT0gdGhpcy5fc2VsZWN0ZWRJbmRleCA/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0SXRlbShuZXdTZWxlY3RlZEluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvbGRTZWxlY3RlZEl0ZW0gPSB0aGlzLl9pdGVtc1t0aGlzLl9zZWxlY3RlZEluZGV4XTtcclxuICAgICAgICBvbGRTZWxlY3RlZEl0ZW0uaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdTZWxlY3RlZEl0ZW0gPSB0aGlzLl9pdGVtc1tuZXdTZWxlY3RlZEluZGV4XTtcclxuICAgICAgICBuZXdTZWxlY3RlZEl0ZW0uaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IG5ld1NlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgIHRoaXMuX2Nsb3NlQ2FsbGJhY2sobmV3U2VsZWN0ZWRJdGVtLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5jZWxTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY2xvc2VDYWxsYmFjayhudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXRlbXMoKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgU2VsZWN0IENhciAke3RoaXMuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHRoaXMuX3RhZyl9YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc29sdmVQcm90b0l0ZW1zKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fdGFnKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhckNsYXNzTGlzdDtcclxuICAgICAgICAgICAgY2FzZSBcImRvb3JzXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FyRG9vckxpc3Q7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZWF0c1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhclNlYXRMaXN0O1xyXG4gICAgICAgICAgICBjYXNlIFwidHJhbnNtaXNzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FyVHJhbnNtaXNzaW9uTGlzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcbiAgICB9XHJcbn1cclxuIl19