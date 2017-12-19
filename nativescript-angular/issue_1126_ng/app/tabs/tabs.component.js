"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var TabsComponent = (function () {
    function TabsComponent() {
    }
    Object.defineProperty(TabsComponent.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            if (this._title !== value) {
                this._title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    TabsComponent.prototype.getIconSource = function (icon) {
        return platform_1.isAndroid ? "" : "res://tabIcons/" + icon;
    };
    TabsComponent.prototype.onSelectedIndexChanged = function (args) {
        var tabView = args.object;
        var selectedTabViewItem = tabView.items[args.newIndex];
        this.title = selectedTabViewItem.title;
        console.log(tabView.selectedIndex);
        this.tabIndex = tabView.selectedIndex;
    };
    TabsComponent = __decorate([
        core_1.Component({
            selector: "TabsComponent",
            moduleId: module.id,
            templateUrl: "./tabs.component.html",
            styleUrls: ["./tabs.component.css"]
        })
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxxQ0FBcUM7QUFTckM7SUFBQTtJQTRCQSxDQUFDO0lBdkJHLHNCQUFJLGdDQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBVSxLQUFhO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7OztPQU5BO0lBUUQscUNBQWEsR0FBYixVQUFjLElBQVk7UUFDdEIsTUFBTSxDQUFDLG9CQUFTLEdBQUcsRUFBRSxHQUFHLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBRUQsOENBQXNCLEdBQXRCLFVBQXVCLElBQW1DO1FBQ3RELElBQU0sT0FBTyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUV2QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDMUMsQ0FBQztJQTNCUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csYUFBYSxDQTRCekI7SUFBRCxvQkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSwgVGFiVmlldywgVGFiVmlld0l0ZW0gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJUYWJzQ29tcG9uZW50XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vdGFicy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNDb21wb25lbnQge1xuXG4gICAgdGFiSW5kZXg6IG51bWJlcjtcbiAgICBwcml2YXRlIF90aXRsZTogc3RyaW5nO1xuXG4gICAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZTtcbiAgICB9XG5cbiAgICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fdGl0bGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SWNvblNvdXJjZShpY29uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaXNBbmRyb2lkID8gXCJcIiA6IFwicmVzOi8vdGFiSWNvbnMvXCIgKyBpY29uO1xuICAgIH1cblxuICAgIG9uU2VsZWN0ZWRJbmRleENoYW5nZWQoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgY29uc3QgdGFiVmlldyA9IDxUYWJWaWV3PmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRhYlZpZXdJdGVtID0gdGFiVmlldy5pdGVtc1thcmdzLm5ld0luZGV4XTtcblxuICAgICAgICB0aGlzLnRpdGxlID0gc2VsZWN0ZWRUYWJWaWV3SXRlbS50aXRsZTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0YWJWaWV3LnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnRhYkluZGV4ID0gdGFiVmlldy5zZWxlY3RlZEluZGV4O1xuICAgIH1cbn1cbiJdfQ==