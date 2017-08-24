"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.webViewSrc = "https://www.nativescript.org/";
    }
    ItemsComponent.prototype.onWebViewLoaded = function (args) {
        var webview = args.object;
        var myWebChromeClient = new MyWebChromeClient();
        webview.android.setWebChromeClient(myWebChromeClient);
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
var MyWebChromeClient = (function (_super) {
    __extends(MyWebChromeClient, _super);
    function MyWebChromeClient() {
        var _this = _super.call(this) || this;
        return global.__native(_this);
    }
    MyWebChromeClient.prototype.onShowFileChooser = function () {
        console.log("Test");
    };
    return MyWebChromeClient;
}(android.webkit.WebChromeClient));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBVWxELElBQWEsY0FBYztJQUwzQjtRQU9XLGVBQVUsR0FBVywrQkFBK0IsQ0FBQztJQVloRSxDQUFDO0lBVkcsd0NBQWUsR0FBZixVQUFnQixJQUFJO1FBRWhCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFMUIsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFFaEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRTFELENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDeEMsQ0FBQztHQUNXLGNBQWMsQ0FjMUI7QUFkWSx3Q0FBYztBQWlCM0I7SUFBZ0MscUNBQThCO0lBQzFEO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELDZDQUFpQixHQUFqQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQVRELENBQWdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxHQVM3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyB3ZWJWaWV3U3JjOiBzdHJpbmcgPSBcImh0dHBzOi8vd3d3Lm5hdGl2ZXNjcmlwdC5vcmcvXCI7XG5cbiAgICBvbldlYlZpZXdMb2FkZWQoYXJncykge1xuXG4gICAgICAgIHZhciB3ZWJ2aWV3ID0gYXJncy5vYmplY3Q7XG5cbiAgICAgICAgbGV0IG15V2ViQ2hyb21lQ2xpZW50ID0gbmV3IE15V2ViQ2hyb21lQ2xpZW50KCk7XG5cbiAgICAgICAgd2Vidmlldy5hbmRyb2lkLnNldFdlYkNocm9tZUNsaWVudChteVdlYkNocm9tZUNsaWVudCk7XG5cbiAgICB9XG5cbn1cblxuXG5jbGFzcyBNeVdlYkNocm9tZUNsaWVudCBleHRlbmRzIGFuZHJvaWQud2Via2l0LldlYkNocm9tZUNsaWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHJldHVybiBnbG9iYWwuX19uYXRpdmUodGhpcyk7XG4gICAgfVxuXG4gICAgb25TaG93RmlsZUNob29zZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGVzdFwiKTtcbiAgICB9XG59Il19