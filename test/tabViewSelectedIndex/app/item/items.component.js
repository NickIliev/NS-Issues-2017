"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.myFirstItem = { title: "Selected", iconSource: "~/images/logo.png" };
        this.mySecondItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
        this.myThirdItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
    }
    ItemsComponent.prototype.onIndexChange = function (args) {
        switch (args.value) {
            case 0:
                console.log(args.value);
                this.myFirstItem = { title: "Selected", iconSource: "~/images/logo.png" };
                this.mySecondItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                this.myThirdItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                break;
            case 1:
                console.log(args.value);
                this.myFirstItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                this.mySecondItem = { title: "Selected", iconSource: "~/images/logo.png" };
                this.myThirdItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                console.log(this.mySecondItem.iconSource);
                break;
            case 2:
                console.log(args.value);
                this.myFirstItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                this.mySecondItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                this.myThirdItem = { title: "Selected", iconSource: "~/images/logo.png" };
                break;
            default:
                break;
        }
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBVWxELElBQWEsY0FBYztJQUt2QjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO1FBQzFFLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO1FBQy9FLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO0lBQ2xGLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNkLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLENBQUM7Z0JBRTFFLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztnQkFFOUUsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztnQkFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLENBQUM7Z0JBQzNFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO2dCQUU5RSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQ3pDLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLENBQUM7Z0JBQzlFLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO2dCQUUvRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztnQkFDMUUsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksY0FBYztJQU4xQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDeEMsQ0FBQzs7R0FFVyxjQUFjLENBd0MxQjtBQXhDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwidWkvdGFiLXZpZXdcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5cbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCB7XG4gICAgcHVibGljIG15Rmlyc3RJdGVtOiBhbnk7XG4gICAgcHVibGljIG15U2Vjb25kSXRlbTogYW55O1xuICAgIHB1YmxpYyBteVRoaXJkSXRlbTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubXlGaXJzdEl0ZW0gPSB7IHRpdGxlOiBcIlNlbGVjdGVkXCIsIGljb25Tb3VyY2U6IFwifi9pbWFnZXMvbG9nby5wbmdcIiB9O1xuICAgICAgICB0aGlzLm15U2Vjb25kSXRlbSA9IHsgdGl0bGU6IFwiTmF0aXZlU2NyaXB0XCIsIGljb25Tb3VyY2U6IFwifi9pbWFnZXMvaWNvbi5wbmdcIiB9O1xuICAgICAgICB0aGlzLm15VGhpcmRJdGVtID0geyB0aXRsZTogXCJOYXRpdmVTY3JpcHRcIiwgaWNvblNvdXJjZTogXCJ+L2ltYWdlcy9pY29uLnBuZ1wiIH07XG4gICAgfVxuXG4gICAgb25JbmRleENoYW5nZShhcmdzKSB7XG4gICAgICAgIHN3aXRjaCAoYXJncy52YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZ3MudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubXlGaXJzdEl0ZW0gPSB7IHRpdGxlOiBcIlNlbGVjdGVkXCIsIGljb25Tb3VyY2U6IFwifi9pbWFnZXMvbG9nby5wbmdcIiB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5teVNlY29uZEl0ZW0gPSB7IHRpdGxlOiBcIk5hdGl2ZVNjcmlwdFwiLCBpY29uU291cmNlOiBcIn4vaW1hZ2VzL2ljb24ucG5nXCIgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm15VGhpcmRJdGVtID0geyB0aXRsZTogXCJOYXRpdmVTY3JpcHRcIiwgaWNvblNvdXJjZTogXCJ+L2ltYWdlcy9pY29uLnBuZ1wiIH07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTogXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJncy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5teUZpcnN0SXRlbSA9IHsgdGl0bGU6IFwiTmF0aXZlU2NyaXB0XCIsIGljb25Tb3VyY2U6IFwifi9pbWFnZXMvaWNvbi5wbmdcIiB9O1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZWNvbmRJdGVtID0geyB0aXRsZTogXCJTZWxlY3RlZFwiLCBpY29uU291cmNlOiBcIn4vaW1hZ2VzL2xvZ28ucG5nXCIgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm15VGhpcmRJdGVtID0geyB0aXRsZTogXCJOYXRpdmVTY3JpcHRcIiwgaWNvblNvdXJjZTogXCJ+L2ltYWdlcy9pY29uLnBuZ1wiIH07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15U2Vjb25kSXRlbS5pY29uU291cmNlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZ3MudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubXlGaXJzdEl0ZW0gPSB7IHRpdGxlOiBcIk5hdGl2ZVNjcmlwdFwiLCBpY29uU291cmNlOiBcIn4vaW1hZ2VzL2ljb24ucG5nXCIgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm15U2Vjb25kSXRlbSA9IHsgdGl0bGU6IFwiTmF0aXZlU2NyaXB0XCIsIGljb25Tb3VyY2U6IFwifi9pbWFnZXMvaWNvbi5wbmdcIiB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5teVRoaXJkSXRlbSA9IHsgdGl0bGU6IFwiU2VsZWN0ZWRcIiwgaWNvblNvdXJjZTogXCJ+L2ltYWdlcy9sb2dvLnBuZ1wiIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==