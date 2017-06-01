"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.webViewSrc = "https://www.nativescript.org/";
    }
    ItemsComponent.prototype.onWebViewLoaded = function (args) {
        var webview = args.object;
        var myWebChromeClient = android.webkit.WebChromeClient.extend({
            onShowFileChooser: function () {
                console.log("Test");
            }
        });
        webview.android.setWebChromeClient(new myWebChromeClient());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBWWxELElBQWEsY0FBYztJQUwzQjtRQU9XLGVBQVUsR0FBVywrQkFBK0IsQ0FBQztJQVloRSxDQUFDO0lBVkcsd0NBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFDMUQsaUJBQWlCLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7R0FDVyxjQUFjLENBYzFCO0FBZFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0uc2VydmljZVwiO1xuXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyB3ZWJWaWV3U3JjOiBzdHJpbmcgPSBcImh0dHBzOi8vd3d3Lm5hdGl2ZXNjcmlwdC5vcmcvXCI7XG5cbiAgICBvbldlYlZpZXdMb2FkZWQoYXJncykge1xuICAgICAgICB2YXIgd2VidmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgbXlXZWJDaHJvbWVDbGllbnQgPSBhbmRyb2lkLndlYmtpdC5XZWJDaHJvbWVDbGllbnQuZXh0ZW5kKHtcbiAgICAgICAgICAgIG9uU2hvd0ZpbGVDaG9vc2VyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXN0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2Vidmlldy5hbmRyb2lkLnNldFdlYkNocm9tZUNsaWVudChuZXcgbXlXZWJDaHJvbWVDbGllbnQoKSk7XG4gICAgfVxuXG59XG4iXX0=