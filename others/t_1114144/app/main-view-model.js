"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_array_1 = require("tns-core-modules/data/observable-array");
var observable_1 = require("tns-core-modules/data/observable");
var posts = require("./posts.json");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this.initDataItems();
        _this.enabled = true;
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "dataItems", {
        get: function () {
            return this.get("_dataItems");
        },
        set: function (value) {
            this.set("_dataItems", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "enabled", {
        get: function () {
            return this.get("_enabled");
        },
        set: function (value) {
            this.set("_enabled", value);
            this.updateStatusText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "_currentStatus", {
        get: function () {
            return this.get("currentStatus");
        },
        set: function (value) {
            this.set("currentStatus", value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.initDataItems = function () {
        this.dataItems = new observable_array_1.ObservableArray();
        for (var i = 0; i < posts.names.length; i++) {
            this.dataItems.push(new DataItem(posts.names[i], posts.titles[i], posts.text[i]));
        }
    };
    ViewModel.prototype.updateStatusText = function () {
        this._currentStatus = !this.enabled ? "Enable" : "Disable";
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
var DataItem = (function () {
    function DataItem(name, title, text) {
        this.name = name;
        this.text = text;
        this.title = title;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkVBQXlFO0FBQ3pFLCtEQUE4RDtBQUM5RCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFcEM7SUFBK0IsNkJBQVU7SUFDckM7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFGRyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O0lBQ3hCLENBQUM7SUFFRCxzQkFBSSxnQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsQ0FBQzthQUVELFVBQWMsS0FBZ0M7WUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSw4QkFBTzthQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsQ0FBQzthQUVELFVBQVksS0FBYztZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7T0FMQTtJQU9ELHNCQUFJLHFDQUFjO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsQ0FBQzthQUVELFVBQW1CLEtBQWE7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BSkE7SUFNTyxpQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFFakQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDO0lBQ0wsQ0FBQztJQUVPLG9DQUFnQixHQUF4QjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDL0QsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUErQix1QkFBVSxHQTJDeEM7QUEzQ1ksOEJBQVM7QUE2Q3RCO0lBS0ksa0JBQVksSUFBWSxFQUFFLEtBQWEsRUFBRSxJQUFZO1FBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xudmFyIHBvc3RzID0gcmVxdWlyZShcIi4vcG9zdHMuanNvblwiKTtcblxuZXhwb3J0IGNsYXNzIFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoKTtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoXCJfZGF0YUl0ZW1zXCIpO1xuICAgIH1cblxuICAgIHNldCBkYXRhSXRlbXModmFsdWU6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT4pIHtcbiAgICAgICAgdGhpcy5zZXQoXCJfZGF0YUl0ZW1zXCIsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgZW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiX2VuYWJsZWRcIik7XG4gICAgfVxuXG4gICAgc2V0IGVuYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXQoXCJfZW5hYmxlZFwiLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzVGV4dCgpO1xuICAgIH1cblxuICAgIGdldCBfY3VycmVudFN0YXR1cygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoXCJjdXJyZW50U3RhdHVzXCIpO1xuICAgIH1cblxuICAgIHNldCBfY3VycmVudFN0YXR1cyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0KFwiY3VycmVudFN0YXR1c1wiLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YUl0ZW1zKCkge1xuICAgICAgICB0aGlzLmRhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+KCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3N0cy5uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5kYXRhSXRlbXMucHVzaChuZXcgRGF0YUl0ZW0ocG9zdHMubmFtZXNbaV0sIHBvc3RzLnRpdGxlc1tpXSwgcG9zdHMudGV4dFtpXSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVTdGF0dXNUZXh0KCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gIXRoaXMuZW5hYmxlZCA/IFwiRW5hYmxlXCIgOiBcIkRpc2FibGVcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhSXRlbSB7XG4gICAgcHVibGljIG5hbWU7XG4gICAgcHVibGljIHRpdGxlO1xuICAgIHB1YmxpYyB0ZXh0O1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cbn1cbiJdfQ==