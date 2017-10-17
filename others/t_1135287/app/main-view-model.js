"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.initDataItems();
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "dataItems", {
        get: function () {
            return this.get("_dataItems");
        },
        set: function (value) {
            this.set("_dataItems", value);
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.initDataItems = function () {
        this.dataItems = new observable_array_1.ObservableArray();
        for (var i = 0; i < 55; i++) {
            this.dataItems.push(new DataItem("Item " + i));
        }
    };
    HelloWorldModel.prototype.itemTapped = function (args) {
        var item = this.dataItems.getItem(args.index);
        item.selected = !item.selected;
    };
    // You can also use itemSelected event and itemDeselected to provide this logic
    HelloWorldModel.prototype.itemSelected = function (args) {
        console.log("itemSelected");
        var item = this.dataItems.getItem(args.index);
        item.selected = true;
    };
    // You can also use itemSelected event and itemDeselected to provide this logic
    HelloWorldModel.prototype.itemDeselected = function (args) {
        var item = this.dataItems.getItem(args.index);
        item.selected = false;
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
var DataItem = (function (_super) {
    __extends(DataItem, _super);
    function DataItem(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.selected = false;
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "selected", {
        get: function () {
            return this.get('_selected');
        },
        set: function (value) {
            this.set('_selected', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "name", {
        get: function () {
            return this.get('_itemName');
        },
        set: function (value) {
            this.set('_itemName', value);
        },
        enumerable: true,
        configurable: true
    });
    return DataItem;
}(observable_1.Observable));
exports.DataItem = DataItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLDJFQUF5RTtBQUd6RTtJQUFxQyxtQ0FBVTtJQUUzQztRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQURHLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVELHNCQUFJLHNDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsQyxDQUFDO2FBRUQsVUFBYyxLQUFnQztZQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQU1PLHVDQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtDQUFlLEVBQVksQ0FBQztRQUVqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7SUFDTCxDQUFDO0lBRU0sb0NBQVUsR0FBakIsVUFBa0IsSUFBdUI7UUFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFRCwrRUFBK0U7SUFDeEUsc0NBQVksR0FBbkIsVUFBb0IsSUFBdUI7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELCtFQUErRTtJQUN4RSx3Q0FBYyxHQUFyQixVQUFzQixJQUF1QjtRQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTFDRCxDQUFxQyx1QkFBVSxHQTBDOUM7QUExQ1ksMENBQWU7QUE0QzVCO0lBQThCLDRCQUFVO0lBa0JwQyxrQkFBWSxJQUFZO1FBQXhCLFlBQ0ksaUJBQU8sU0FJVjtRQUZHLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztJQUMxQixDQUFDO0lBckJELHNCQUFXLDhCQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVywwQkFBSTthQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQWdCLEtBQWE7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7O09BSkE7SUFZTCxlQUFDO0FBQUQsQ0FBQyxBQXhCRCxDQUE4Qix1QkFBVSxHQXdCdkM7QUF4QlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlld1wiO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoKTtcbiAgICB9XG5cbiAgICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoXCJfZGF0YUl0ZW1zXCIpO1xuICAgIH1cblxuICAgIHNldCBkYXRhSXRlbXModmFsdWU6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT4pIHtcbiAgICAgICAgdGhpcy5zZXQoXCJfZGF0YUl0ZW1zXCIsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuZGF0YUl0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT4oKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU1OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUl0ZW1zLnB1c2gobmV3IERhdGFJdGVtKFwiSXRlbSBcIiArIGkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpdGVtVGFwcGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbShhcmdzLmluZGV4KTtcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICFpdGVtLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8vIFlvdSBjYW4gYWxzbyB1c2UgaXRlbVNlbGVjdGVkIGV2ZW50IGFuZCBpdGVtRGVzZWxlY3RlZCB0byBwcm92aWRlIHRoaXMgbG9naWNcbiAgICBwdWJsaWMgaXRlbVNlbGVjdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbVNlbGVjdGVkXCIpO1xuXG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbShhcmdzLmluZGV4KTtcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gWW91IGNhbiBhbHNvIHVzZSBpdGVtU2VsZWN0ZWQgZXZlbnQgYW5kIGl0ZW1EZXNlbGVjdGVkIHRvIHByb3ZpZGUgdGhpcyBsb2dpY1xuICAgIHB1YmxpYyBpdGVtRGVzZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0oYXJncy5pbmRleCk7XG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhSXRlbSBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdfc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2V0KCdfc2VsZWN0ZWQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ19pdGVtTmFtZScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0KCdfaXRlbU5hbWUnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==