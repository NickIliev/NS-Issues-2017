"use strict";
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
    }
    ItemsComponent.prototype.ngOnInit = function () { };
    ItemsComponent.prototype.ngAfterViewInit = function () { };
    ItemsComponent.prototype.onWebViewLoaded = function (args) {
        var _this = this;
        console.log("onWebViewLoaded");
        console.log(args.object); // webview
        setTimeout(function () {
            _this.show();
        }, 500);
    };
    ItemsComponent.prototype.show = function () {
        var webView = this.webviewField.nativeElement;
        console.log(webView.android); // android.webkit.WebView
        webView.android.getSettings().setUseWideViewPort(true);
        webView.android.getSettings().setLoadWithOverviewMode(true);
        webView.android.getSettings().setJavaScriptEnabled(true);
        webView.android.getSettings().setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm.SINGLE_COLUMN); // notice this parameter is coming from the android API
    };
    return ItemsComponent;
}());
__decorate([
    core_1.ViewChild("webview"),
    __metadata("design:type", core_1.ElementRef)
], ItemsComponent.prototype, "webviewField", void 0);
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBd0Y7QUFVeEYsSUFBYSxjQUFjO0lBSXZCO0lBQWdCLENBQUM7SUFFakIsaUNBQVEsR0FBUixjQUFhLENBQUM7SUFFZCx3Q0FBZSxHQUFmLGNBQW9CLENBQUM7SUFFZCx3Q0FBZSxHQUF0QixVQUF1QixJQUFtQjtRQUExQyxpQkFPQztRQU5HLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVU7UUFFcEMsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCw2QkFBSSxHQUFKO1FBQ0ksSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7UUFFdkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyx1REFBdUQ7SUFFdkssQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQztBQTVCeUI7SUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7OEJBQWUsaUJBQVU7b0RBQUM7QUFGdEMsY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDeEMsQ0FBQzs7R0FDVyxjQUFjLENBOEIxQjtBQTlCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ1aS93ZWItdmlld1wiXG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQFZpZXdDaGlsZChcIndlYnZpZXdcIikgd2Vidmlld0ZpZWxkOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7IH1cblxuICAgIHB1YmxpYyBvbldlYlZpZXdMb2FkZWQoYXJnczogTG9hZEV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uV2ViVmlld0xvYWRlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5vYmplY3QpOyAvLyB3ZWJ2aWV3XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBsZXQgd2ViVmlldyA9IDxXZWJWaWV3PnRoaXMud2Vidmlld0ZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgY29uc29sZS5sb2cod2ViVmlldy5hbmRyb2lkKTsgLy8gYW5kcm9pZC53ZWJraXQuV2ViVmlld1xuXG4gICAgICAgIHdlYlZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpLnNldFVzZVdpZGVWaWV3UG9ydCh0cnVlKTtcbiAgICAgICAgd2ViVmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0TG9hZFdpdGhPdmVydmlld01vZGUodHJ1ZSk7XG4gICAgICAgIHdlYlZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpLnNldEphdmFTY3JpcHRFbmFibGVkKHRydWUpO1xuICAgICAgICB3ZWJWaWV3LmFuZHJvaWQuZ2V0U2V0dGluZ3MoKS5zZXRMYXlvdXRBbGdvcml0aG0oYW5kcm9pZC53ZWJraXQuV2ViU2V0dGluZ3MuTGF5b3V0QWxnb3JpdGhtLlNJTkdMRV9DT0xVTU4pOyAvLyBub3RpY2UgdGhpcyBwYXJhbWV0ZXIgaXMgY29taW5nIGZyb20gdGhlIGFuZHJvaWQgQVBJXG5cbiAgICB9XG59XG4iXX0=