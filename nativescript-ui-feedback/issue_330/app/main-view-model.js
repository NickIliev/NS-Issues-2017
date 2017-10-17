"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var autocomplete_1 = require("nativescript-pro-ui/autocomplete");
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
            return this.get("_dataItems");
        },
        set: function (value) {
            this.set("_dataItems", value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.initDataItems = function () {
        this.dataItems = new observable_array_1.ObservableArray();
        for (var i = 0; i < this.countries.length; i++) {
            this.dataItems.push(new autocomplete_1.TokenModel(this.countries[i], undefined));
        }
    };
    ViewModel.prototype.onSuggestSelected = function (args) {
        this.autocmp.suggestMode = "Suggest";
        this.autocmp.resetAutocomplete();
    };
    ViewModel.prototype.onAppendSelected = function (args) {
        this.autocmp.suggestMode = "Append";
        this.autocmp.completionMode = "StartsWith";
        this.autocmp.resetAutocomplete();
    };
    ViewModel.prototype.onSuggestAppendSelected = function (args) {
        this.autocmp.suggestMode = "SuggestAppend";
        this.autocmp.completionMode = "StartsWith";
        this.autocmp.resetAutocomplete();
    };
    ViewModel.prototype.onStartsWithSelected = function (args) {
        this.autocmp.completionMode = "StartsWith";
        this.autocmp.resetAutocomplete();
    };
    ViewModel.prototype.onContainsSelected = function (args) {
        this.autocmp.completionMode = "Contains";
        this.autocmp.suggestMode = "Suggest";
        this.autocmp.resetAutocomplete();
    };
    ViewModel.prototype.onPlainSelected = function (args) {
        this.autocmp.displayMode = "Plain";
        this.autocmp.resetAutocomplete();
    };
    ViewModel.prototype.onTokensSelected = function (args) {
        this.autocmp.displayMode = "Tokens";
        this.autocmp.resetAutocomplete();
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLDBEQUF3RDtBQUN4RCxpRUFBOEQ7QUFHOUQ7SUFBK0IsNkJBQVU7SUFRckMsbUJBQVksSUFBSTtRQUFoQixZQUNJLGlCQUFPLFNBSVY7UUFYTyxlQUFTLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPO1lBQzlILFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVM7WUFDekUsUUFBUSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUTtZQUNqRixRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUztZQUNwRixjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUkxQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBQ3pCLENBQUM7SUFFRCxzQkFBSSxnQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsQ0FBQzthQUVELFVBQWMsS0FBa0M7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BSkE7SUFNTyxpQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxrQ0FBZSxFQUFjLENBQUM7UUFFbkQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQztJQUNMLENBQUM7SUFFTSxxQ0FBaUIsR0FBeEIsVUFBeUIsSUFBSTtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxvQ0FBZ0IsR0FBdkIsVUFBd0IsSUFBSTtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sMkNBQXVCLEdBQTlCLFVBQStCLElBQUk7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLHdDQUFvQixHQUEzQixVQUE0QixJQUFJO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLHNDQUFrQixHQUF6QixVQUEwQixJQUFJO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxtQ0FBZSxHQUF0QixVQUF1QixJQUFJO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLG9DQUFnQixHQUF2QixVQUF3QixJQUFJO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQXBFRCxDQUErQix1QkFBVSxHQW9FeEM7QUFwRVksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZS1hcnJheSc7XG5pbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlXCI7XG5cblxuZXhwb3J0IGNsYXNzIFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgYXV0b2NtcDtcbiAgICBwcml2YXRlIGNvdW50cmllcyA9IFtcIkF1c3RyYWxpYVwiLCBcIkFsYmFuaWFcIiwgXCJBdXN0cmlhXCIsIFwiQXJnZW50aW5hXCIsIFwiTWFsZGl2ZXNcIiwgXCJCdWxnYXJpYVwiLCBcIkJlbGdpdW1cIiwgXCJDeXBydXNcIiwgXCJJdGFseVwiLCBcIkphcGFuXCIsXG4gICAgICAgIFwiRGVubWFya1wiLCBcIkZpbmxhbmRcIiwgXCJGcmFuY2VcIiwgXCJHZXJtYW55XCIsIFwiR3JlZWNlXCIsIFwiSHVuZ2FyeVwiLCBcIklyZWxhbmRcIixcbiAgICAgICAgXCJMYXR2aWFcIiwgXCJMdXhlbWJvdXJnXCIsIFwiTWFjZWRvbmlhXCIsIFwiTW9sZG92YVwiLCBcIk1vbmFjb1wiLCBcIk5ldGhlcmxhbmRzXCIsIFwiTm9yd2F5XCIsXG4gICAgICAgIFwiUG9sYW5kXCIsIFwiUm9tYW5pYVwiLCBcIlJ1c3NpYVwiLCBcIlN3ZWRlblwiLCBcIlNsb3ZlbmlhXCIsIFwiU2xvdmFraWFcIiwgXCJUdXJrZXlcIiwgXCJVa3JhaW5lXCIsXG4gICAgICAgIFwiVmF0aWNhbiBDaXR5XCIsIFwiQ2hhZFwiLCBcIkNoaW5hXCIsIFwiQ2hpbGVcIl07XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHZhciBwYWdlID0gYXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuYXV0b2NtcCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJhdXRvY21wXCIpO1xuICAgICAgICB0aGlzLmluaXREYXRhSXRlbXMoKTtcbiAgICB9XG5cbiAgICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxUb2tlbk1vZGVsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChcIl9kYXRhSXRlbXNcIik7XG4gICAgfVxuXG4gICAgc2V0IGRhdGFJdGVtcyh2YWx1ZTogT2JzZXJ2YWJsZUFycmF5PFRva2VuTW9kZWw+KSB7XG4gICAgICAgIHRoaXMuc2V0KFwiX2RhdGFJdGVtc1wiLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YUl0ZW1zKCkge1xuICAgICAgICB0aGlzLmRhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8VG9rZW5Nb2RlbD4oKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY291bnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFJdGVtcy5wdXNoKG5ldyBUb2tlbk1vZGVsKHRoaXMuY291bnRyaWVzW2ldLCB1bmRlZmluZWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblN1Z2dlc3RTZWxlY3RlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuYXV0b2NtcC5zdWdnZXN0TW9kZSA9IFwiU3VnZ2VzdFwiO1xuICAgICAgICB0aGlzLmF1dG9jbXAucmVzZXRBdXRvY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25BcHBlbmRTZWxlY3RlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuYXV0b2NtcC5zdWdnZXN0TW9kZSA9IFwiQXBwZW5kXCI7XG4gICAgICAgIHRoaXMuYXV0b2NtcC5jb21wbGV0aW9uTW9kZSA9IFwiU3RhcnRzV2l0aFwiO1xuICAgICAgICB0aGlzLmF1dG9jbXAucmVzZXRBdXRvY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdWdnZXN0QXBwZW5kU2VsZWN0ZWQoYXJncykge1xuICAgICAgICB0aGlzLmF1dG9jbXAuc3VnZ2VzdE1vZGUgPSBcIlN1Z2dlc3RBcHBlbmRcIjtcbiAgICAgICAgdGhpcy5hdXRvY21wLmNvbXBsZXRpb25Nb2RlID0gXCJTdGFydHNXaXRoXCI7XG4gICAgICAgIHRoaXMuYXV0b2NtcC5yZXNldEF1dG9jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblN0YXJ0c1dpdGhTZWxlY3RlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuYXV0b2NtcC5jb21wbGV0aW9uTW9kZSA9IFwiU3RhcnRzV2l0aFwiO1xuICAgICAgICB0aGlzLmF1dG9jbXAucmVzZXRBdXRvY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Db250YWluc1NlbGVjdGVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5hdXRvY21wLmNvbXBsZXRpb25Nb2RlID0gXCJDb250YWluc1wiO1xuICAgICAgICB0aGlzLmF1dG9jbXAuc3VnZ2VzdE1vZGUgPSBcIlN1Z2dlc3RcIjtcbiAgICAgICAgdGhpcy5hdXRvY21wLnJlc2V0QXV0b2NvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uUGxhaW5TZWxlY3RlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuYXV0b2NtcC5kaXNwbGF5TW9kZSA9IFwiUGxhaW5cIjtcbiAgICAgICAgdGhpcy5hdXRvY21wLnJlc2V0QXV0b2NvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVG9rZW5zU2VsZWN0ZWQoYXJncykge1xuICAgICAgICB0aGlzLmF1dG9jbXAuZGlzcGxheU1vZGUgPSBcIlRva2Vuc1wiO1xuICAgICAgICB0aGlzLmF1dG9jbXAucmVzZXRBdXRvY29tcGxldGUoKTtcbiAgICB9XG59Il19