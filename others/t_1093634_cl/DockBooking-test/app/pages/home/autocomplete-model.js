"use strict";
var observable_array_1 = require("data/observable-array");
var observableModule = require("ui/core/dependency-observable");
var autocompleteModule = require("nativescript-telerik-ui-pro/autocomplete");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(args) {
        var _this = _super.call(this) || this;
        _this.countries = ["Australia", "Albania", "Austria", "Argentina", "Maldives", "Bulgaria", "Belgium", "Cyprus",
            "Italy", "Isernia", "Istria", "Iran", "Iraq", "Iglesias", "Ingrato", "India", "Iceland",
            "Japan", "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
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
        // this.set("eventName", "Suggerimento cliccato");
    };
    ViewModel.prototype.onSuggestionViewVisible = function (args) {
        // this.set("eventName", "Suggestion View Visisble!");
        // console.log('ciao');
    };
    return ViewModel;
}(observableModule.DependencyObservable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0b2NvbXBsZXRlLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwREFBc0Q7QUFDdEQsZ0VBQW1FO0FBQ25FLDZFQUFnRjtBQUVoRjtJQUErQiw2QkFBcUM7SUFXaEUsbUJBQVksSUFBSTtRQUFoQixZQUNJLGlCQUFPLFNBSVY7UUFaTyxlQUFTLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsUUFBUTtZQUN4RSxPQUFPLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFNBQVM7WUFDL0UsT0FBTyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFNBQVM7WUFDM0UsUUFBUSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsUUFBUTtZQUMzRSxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsU0FBUztZQUM3RSxjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUkxRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBQ3pCLENBQUM7SUFFRCxzQkFBSSxnQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFTyxpQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBZSxFQUFpQyxDQUFDO1FBRW5FLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQztJQUNMLENBQUM7SUFFTSxnQ0FBWSxHQUFuQixVQUFvQixJQUFJO1FBQ3BCLGtEQUFrRDtJQUN0RCxDQUFDO0lBRU0sMkNBQXVCLEdBQTlCLFVBQStCLElBQUk7UUFDL0Isc0RBQXNEO1FBQ3RELHVCQUF1QjtJQUMzQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBdENELENBQStCLGdCQUFnQixDQUFDLG9CQUFvQixHQXNDbkU7QUF0Q1ksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGVBcnJheX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IG9ic2VydmFibGVNb2R1bGUgPSByZXF1aXJlKFwidWkvY29yZS9kZXBlbmRlbmN5LW9ic2VydmFibGVcIik7XG5pbXBvcnQgYXV0b2NvbXBsZXRlTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9hdXRvY29tcGxldGVcIik7XG5cbmV4cG9ydCBjbGFzcyBWaWV3TW9kZWwgZXh0ZW5kcyBvYnNlcnZhYmxlTW9kdWxlLkRlcGVuZGVuY3lPYnNlcnZhYmxlIHtcblxuICAgIHByaXZhdGUgX2l0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8YXV0b2NvbXBsZXRlTW9kdWxlLlRva2VuTW9kZWw+O1xuICAgIHByaXZhdGUgYXV0b2NtcDtcbiAgICBwcml2YXRlIGNvdW50cmllcyA9IFtcIkF1c3RyYWxpYVwiLCBcIkFsYmFuaWFcIixcIkF1c3RyaWFcIiwgXCJBcmdlbnRpbmFcIiwgXCJNYWxkaXZlc1wiLFwiQnVsZ2FyaWFcIixcIkJlbGdpdW1cIixcIkN5cHJ1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSXRhbHlcIixcIklzZXJuaWFcIixcIklzdHJpYVwiLFwiSXJhblwiLFwiSXJhcVwiLFwiSWdsZXNpYXNcIixcIkluZ3JhdG9cIixcIkluZGlhXCIsXCJJY2VsYW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJKYXBhblwiLFwiRGVubWFya1wiLFwiRmlubGFuZFwiLFwiRnJhbmNlXCIsXCJHZXJtYW55XCIsXCJHcmVlY2VcIixcIkh1bmdhcnlcIixcIklyZWxhbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxhdHZpYVwiLFwiTHV4ZW1ib3VyZ1wiLFwiTWFjZWRvbmlhXCIsXCJNb2xkb3ZhXCIsXCJNb25hY29cIixcIk5ldGhlcmxhbmRzXCIsXCJOb3J3YXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvbGFuZFwiLFwiUm9tYW5pYVwiLFwiUnVzc2lhXCIsXCJTd2VkZW5cIixcIlNsb3ZlbmlhXCIsXCJTbG92YWtpYVwiLFwiVHVya2V5XCIsXCJVa3JhaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWYXRpY2FuIENpdHlcIiwgXCJDaGFkXCIsIFwiQ2hpbmFcIiwgXCJDaGlsZVwiXTtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdmFyIHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5hdXRvY21wID0gcGFnZS5nZXRWaWV3QnlJZChcImF1dG9jbXBcIik7XG4gICAgICAgIHRoaXMuaW5pdERhdGFJdGVtcygpO1xuICAgIH1cblxuICAgIGdldCBkYXRhSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxhdXRvY29tcGxldGVNb2R1bGUuVG9rZW5Nb2RlbD4oKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY291bnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKG5ldyBhdXRvY29tcGxldGVNb2R1bGUuVG9rZW5Nb2RlbCh0aGlzLmNvdW50cmllc1tpXSx1bmRlZmluZWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblRva2VuQWRkZWQoYXJncykge1xuICAgICAgICAvLyB0aGlzLnNldChcImV2ZW50TmFtZVwiLCBcIlN1Z2dlcmltZW50byBjbGljY2F0b1wiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdWdnZXN0aW9uVmlld1Zpc2libGUoYXJncykge1xuICAgICAgICAvLyB0aGlzLnNldChcImV2ZW50TmFtZVwiLCBcIlN1Z2dlc3Rpb24gVmlldyBWaXNpc2JsZSFcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaWFvJyk7XG4gICAgfVxufVxuIl19