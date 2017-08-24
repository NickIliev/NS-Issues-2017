"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var autocomplete_1 = require("nativescript-telerik-ui-pro/autocomplete");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this._isChecked = true;
        _this.countries = ["Australia", "Albania", "Austria", "Argentina", "Maldives", "Bulgaria", "Belgium", "Cyprus", "Italy", "Japan",
            "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
            "Latvia", "Luxembourg", "Macedonia", "Moldova", "Monaco", "Netherlands", "Norway",
            "Poland", "Romania", "Russia", "Sweden", "Slovenia", "Slovakia", "Turkey", "Ukraine",
            "Vatican City", "Chad", "China", "Chile"];
        // Initialize default values.
        _this.tfText = "Default text";
        _this.initDataItems();
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "isChecked", {
        get: function () {
            return this._isChecked;
        },
        set: function (value) {
            if (this._isChecked !== value) {
                this._isChecked = value;
                this.notifyPropertyChange('isChecked', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelloWorldModel.prototype, "tfText", {
        get: function () {
            return this._tfText;
        },
        set: function (value) {
            if (this._tfText !== value) {
                this._tfText = value;
                this.notifyPropertyChange('tfText', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelloWorldModel.prototype, "dataItems", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        for (var i = 0; i < this.countries.length; i++) {
            this._items.push(new autocomplete_1.TokenModel(this.countries[i], undefined));
        }
    };
    HelloWorldModel.prototype.onTokenAdded = function (args) {
        console.log(args.eventName);
        console.log(args.object);
        this.set("eventName", "Token Added!");
    };
    HelloWorldModel.prototype.onTokenRemoved = function (args) {
        this.set("eventName", "Token Removed!");
    };
    HelloWorldModel.prototype.onTokenSelected = function (args) {
        this.set("eventName", "Token Selected!");
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLDBEQUF3RDtBQUN4RCx5RUFBc0U7QUFHdEU7SUFBcUMsbUNBQVU7SUFXM0M7UUFBQSxZQUNJLGlCQUFPLFNBS1Y7UUFmTyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixlQUFTLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPO1lBQzlILFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVM7WUFDekUsUUFBUSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUTtZQUNqRixRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUztZQUNwRixjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUsxQyw2QkFBNkI7UUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDN0IsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztJQUN6QixDQUFDO0lBRUQsc0JBQUksc0NBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFFRCxVQUFjLEtBQWM7WUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNqRCxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFRRCxzQkFBSSxtQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQVcsS0FBYTtZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQzlDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNELHNCQUFJLHNDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVPLHVDQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLEVBQWMsQ0FBQztRQUVoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFZLEdBQW5CLFVBQW9CLElBQTJCO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSx3Q0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLHlDQUFlLEdBQXRCLFVBQXVCLElBQUk7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUwsc0JBQUM7QUFBRCxDQUFDLEFBbkVELENBQXFDLHVCQUFVLEdBbUU5QztBQW5FWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgVG9rZW5Nb2RlbCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgeyBBdXRvQ29tcGxldGVFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2F1dG9jb21wbGV0ZVwiO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9pc0NoZWNrZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgX3RmVGV4dDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2l0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8VG9rZW5Nb2RlbD47XG4gICAgcHJpdmF0ZSBjb3VudHJpZXMgPSBbXCJBdXN0cmFsaWFcIiwgXCJBbGJhbmlhXCIsIFwiQXVzdHJpYVwiLCBcIkFyZ2VudGluYVwiLCBcIk1hbGRpdmVzXCIsIFwiQnVsZ2FyaWFcIiwgXCJCZWxnaXVtXCIsIFwiQ3lwcnVzXCIsIFwiSXRhbHlcIiwgXCJKYXBhblwiLFxuICAgICAgICBcIkRlbm1hcmtcIiwgXCJGaW5sYW5kXCIsIFwiRnJhbmNlXCIsIFwiR2VybWFueVwiLCBcIkdyZWVjZVwiLCBcIkh1bmdhcnlcIiwgXCJJcmVsYW5kXCIsXG4gICAgICAgIFwiTGF0dmlhXCIsIFwiTHV4ZW1ib3VyZ1wiLCBcIk1hY2Vkb25pYVwiLCBcIk1vbGRvdmFcIiwgXCJNb25hY29cIiwgXCJOZXRoZXJsYW5kc1wiLCBcIk5vcndheVwiLFxuICAgICAgICBcIlBvbGFuZFwiLCBcIlJvbWFuaWFcIiwgXCJSdXNzaWFcIiwgXCJTd2VkZW5cIiwgXCJTbG92ZW5pYVwiLCBcIlNsb3Zha2lhXCIsIFwiVHVya2V5XCIsIFwiVWtyYWluZVwiLFxuICAgICAgICBcIlZhdGljYW4gQ2l0eVwiLCBcIkNoYWRcIiwgXCJDaGluYVwiLCBcIkNoaWxlXCJdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IHZhbHVlcy5cbiAgICAgICAgdGhpcy50ZlRleHQgPSBcIkRlZmF1bHQgdGV4dFwiO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoKTtcbiAgICB9XG5cbiAgICBnZXQgaXNDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNDaGVja2VkO1xuICAgIH1cblxuICAgIHNldCBpc0NoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQ2hlY2tlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzQ2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaXNDaGVja2VkJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHRmVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGZUZXh0O1xuICAgIH1cblxuICAgIHNldCB0ZlRleHQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fdGZUZXh0ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGZUZXh0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCd0ZlRleHQnLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBkYXRhSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxUb2tlbk1vZGVsPigpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb3VudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2gobmV3IFRva2VuTW9kZWwodGhpcy5jb3VudHJpZXNbaV0sIHVuZGVmaW5lZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uVG9rZW5BZGRlZChhcmdzOiBBdXRvQ29tcGxldGVFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5ldmVudE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzLm9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5zZXQoXCJldmVudE5hbWVcIiwgXCJUb2tlbiBBZGRlZCFcIik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVG9rZW5SZW1vdmVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJldmVudE5hbWVcIiwgXCJUb2tlbiBSZW1vdmVkIVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Ub2tlblNlbGVjdGVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJldmVudE5hbWVcIiwgXCJUb2tlbiBTZWxlY3RlZCFcIik7XG4gICAgfVxuXG59Il19