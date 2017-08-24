"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(name, id) {
        var _this = _super.call(this) || this;
        _this._name = name;
        _this._id = id;
        return _this;
    }
    Object.defineProperty(Item.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (this._name !== value) {
                this._name = value;
                this.notifyPropertyChange('name', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            if (this._id !== value) {
                this._id = value;
                this.notifyPropertyChange('id', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Item.prototype.toString = function () {
        return this.name + " " + this.id;
    };
    return Item;
}(observable_1.Observable));
exports.Item = Item;
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ViewModel.prototype, "items", {
        get: function () {
            this._items = new observable_array_1.ObservableArray();
            for (var i = 0; i < 10; i++) {
                this._items.push(new Item("Item", i));
            }
            return this._items;
        },
        set: function (value) {
            this._items = value;
        },
        enumerable: true,
        configurable: true
    });
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBNkM7QUFDN0MsMERBQXdEO0FBRXhEO0lBQTBCLHdCQUFVO0lBSWhDLGNBQVksSUFBWSxFQUFFLEVBQVU7UUFBcEMsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsS0FBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O0lBQ2xCLENBQUM7SUFFRCxzQkFBSSxzQkFBSTthQUFSO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQVMsS0FBYTtZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQzVDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNELHNCQUFJLG9CQUFFO2FBQU47WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixDQUFDO2FBRUQsVUFBTyxLQUFhO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDMUMsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU00sdUJBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBSSxJQUFJLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxFQUFJLENBQUM7SUFDckMsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBbkNELENBQTBCLHVCQUFVLEdBbUNuQztBQW5DWSxvQkFBSTtBQXFDakI7SUFBK0IsNkJBQVU7SUFBekM7O0lBY0EsQ0FBQztJQVhHLHNCQUFJLDRCQUFLO2FBQVQ7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQWUsRUFBUSxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBVSxLQUE0QjtZQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FKQTtJQUtMLGdCQUFDO0FBQUQsQ0FBQyxBQWRELENBQStCLHVCQUFVLEdBY3hDO0FBZFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuXG5leHBvcnQgY2xhc3MgSXRlbSBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuICAgIH1cblxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX25hbWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCduYW1lJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9pZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2lkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdpZCcsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSAke3RoaXMuaWR9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9pdGVtczogT2JzZXJ2YWJsZUFycmF5PEl0ZW0+O1xuXG4gICAgZ2V0IGl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxJdGVtPiB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxJdGVtPigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2gobmV3IEl0ZW0oYEl0ZW1gLCBpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cblxuICAgIHNldCBpdGVtcyh2YWx1ZTogT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gdmFsdWU7XG4gICAgfVxufSJdfQ==