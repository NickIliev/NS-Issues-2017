"use strict";
var observable_array_1 = require("data/observable-array");
var autocompleteModule = require("nativescript-telerik-ui-pro/autocomplete");
var observableModule = require("ui/core/dependency-observable");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(args) {
        var _this = _super.call(this) || this;
        _this.countries = ["Australia", "Albania", "Austria", "Argentina", "Maldives", "Bulgaria", "Belgium", "Cyprus", "Italy", "Japan",
            "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
            "Latvia", "Luxembourg", "Macedonia", "Moldova", "Monaco", "Netherlands", "Norway",
            "Poland", "Romania", "Russia", "Sweden", "Slovenia", "Slovakia", "Turkey", "Ukraine",
            "Vatican City", "Chad", "China", "Chile"];
        var page = args.object;
        _this.autocmp = page.getViewById("autocmp");
        _this.initDataItems();
        return _this;
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
        for (var i = 0; i < this.countries.length; i++) {
            this._items.push(new autocompleteModule.TokenModel(this.countries[i], undefined));
        }
    };
    ViewModel.prototype.onTokenAdded = function (args) {
        this.set("eventName", "Token Added!");
    };
    ViewModel.prototype.onTokenRemoved = function (args) {
        this.set("eventName", "Token Removed!");
    };
    ViewModel.prototype.onTokenSelected = function (args) {
        this.set("eventName", "Token Selected!");
    };
    ViewModel.prototype.onTokenDeselected = function (args) {
        this.set("eventName", "Token Deselected!");
    };
    ViewModel.prototype.onSuggestionViewVisible = function (args) {
        this.set("eventName", "Suggestion View Visisble!");
    };
    ViewModel.prototype.onWrapSelected = function (args) {
        this.autocmp.layoutMode = "Wrap";
        this.autocmp.resetAutocomplete();
    };
    return ViewModel;
}(observableModule.DependencyObservable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwREFBc0Q7QUFDdEQsNkVBQStFO0FBQy9FLGdFQUFrRTtBQUVsRTtJQUErQiw2QkFBcUM7SUFVaEUsbUJBQVksSUFBSTtRQUFoQixZQUNJLGlCQUFPLFNBSVY7UUFYTyxlQUFTLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxPQUFPO1lBQ3hGLFNBQVMsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFNBQVM7WUFDbkUsUUFBUSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsUUFBUTtZQUMzRSxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsU0FBUztZQUM3RSxjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUkxRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBQ3pCLENBQUM7SUFFRCxzQkFBSSxnQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFTyxpQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBZSxFQUFpQyxDQUFDO1FBRW5FLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQztJQUNMLENBQUM7SUFFTSxnQ0FBWSxHQUFuQixVQUFvQixJQUFJO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxrQ0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLG1DQUFlLEdBQXRCLFVBQXVCLElBQUk7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0scUNBQWlCLEdBQXhCLFVBQXlCLElBQUk7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sMkNBQXVCLEdBQTlCLFVBQStCLElBQUk7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sa0NBQWMsR0FBckIsVUFBc0IsSUFBSTtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFyREQsQ0FBK0IsZ0JBQWdCLENBQUMsb0JBQW9CLEdBcURuRTtBQXJEWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgKiBhcyBhdXRvY29tcGxldGVNb2R1bGUgZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9hdXRvY29tcGxldGVcIjtcbmltcG9ydCAqIGFzIG9ic2VydmFibGVNb2R1bGUgZnJvbSBcInVpL2NvcmUvZGVwZW5kZW5jeS1vYnNlcnZhYmxlXCI7XG5cbmV4cG9ydCBjbGFzcyBWaWV3TW9kZWwgZXh0ZW5kcyBvYnNlcnZhYmxlTW9kdWxlLkRlcGVuZGVuY3lPYnNlcnZhYmxle1xuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IE9ic2VydmFibGVBcnJheTxhdXRvY29tcGxldGVNb2R1bGUuVG9rZW5Nb2RlbD47XG4gICAgcHJpdmF0ZSBhdXRvY21wO1xuICAgIHByaXZhdGUgY291bnRyaWVzID0gW1wiQXVzdHJhbGlhXCIsIFwiQWxiYW5pYVwiLFwiQXVzdHJpYVwiLCBcIkFyZ2VudGluYVwiLCBcIk1hbGRpdmVzXCIsXCJCdWxnYXJpYVwiLFwiQmVsZ2l1bVwiLFwiQ3lwcnVzXCIsXCJJdGFseVwiLFwiSmFwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlbm1hcmtcIixcIkZpbmxhbmRcIixcIkZyYW5jZVwiLFwiR2VybWFueVwiLFwiR3JlZWNlXCIsXCJIdW5nYXJ5XCIsXCJJcmVsYW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMYXR2aWFcIixcIkx1eGVtYm91cmdcIixcIk1hY2Vkb25pYVwiLFwiTW9sZG92YVwiLFwiTW9uYWNvXCIsXCJOZXRoZXJsYW5kc1wiLFwiTm9yd2F5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQb2xhbmRcIixcIlJvbWFuaWFcIixcIlJ1c3NpYVwiLFwiU3dlZGVuXCIsXCJTbG92ZW5pYVwiLFwiU2xvdmFraWFcIixcIlR1cmtleVwiLFwiVWtyYWluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVmF0aWNhbiBDaXR5XCIsIFwiQ2hhZFwiLCBcIkNoaW5hXCIsIFwiQ2hpbGVcIl07XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHZhciBwYWdlID0gYXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuYXV0b2NtcCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJhdXRvY21wXCIpO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoKTtcbiAgICB9XG5cbiAgICBnZXQgZGF0YUl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YUl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8YXV0b2NvbXBsZXRlTW9kdWxlLlRva2VuTW9kZWw+KCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvdW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaChuZXcgYXV0b2NvbXBsZXRlTW9kdWxlLlRva2VuTW9kZWwodGhpcy5jb3VudHJpZXNbaV0sdW5kZWZpbmVkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Ub2tlbkFkZGVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJldmVudE5hbWVcIiwgXCJUb2tlbiBBZGRlZCFcIik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVG9rZW5SZW1vdmVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJldmVudE5hbWVcIiwgXCJUb2tlbiBSZW1vdmVkIVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Ub2tlblNlbGVjdGVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJldmVudE5hbWVcIiwgXCJUb2tlbiBTZWxlY3RlZCFcIik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVG9rZW5EZXNlbGVjdGVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zZXQoXCJldmVudE5hbWVcIiwgXCJUb2tlbiBEZXNlbGVjdGVkIVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdWdnZXN0aW9uVmlld1Zpc2libGUoYXJncykge1xuICAgICAgICB0aGlzLnNldChcImV2ZW50TmFtZVwiLCBcIlN1Z2dlc3Rpb24gVmlldyBWaXNpc2JsZSFcIik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uV3JhcFNlbGVjdGVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5hdXRvY21wLmxheW91dE1vZGUgPSBcIldyYXBcIjtcbiAgICAgICAgdGhpcy5hdXRvY21wLnJlc2V0QXV0b2NvbXBsZXRlKCk7XG4gICAgfVxufSJdfQ==