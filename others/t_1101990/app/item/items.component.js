"use strict";
var core_1 = require("@angular/core");
// if you need intellisense for Andriod api then you can install tns-platform-declarations
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
        var WebChromClient = android.webkit.WebChromeClient.extend({
            onProgressChanged: function (view, newProgress) {
                console.log(view);
                console.log("this is loading " + newProgress);
            }
        });
        var client = new WebChromClient();
        webView.android.setWebChromeClient(client);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBd0Y7QUFJeEYsMEZBQTBGO0FBTzFGLElBQWEsY0FBYztJQUl2QjtJQUFnQixDQUFDO0lBRWpCLGlDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsd0NBQWUsR0FBZixjQUFvQixDQUFDO0lBRWQsd0NBQWUsR0FBdEIsVUFBdUIsSUFBbUI7UUFBMUMsaUJBT0M7UUFORyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVO1FBRXBDLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsNkJBQUksR0FBSjtRQUNJLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMseUJBQXlCO1FBRXZELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsdURBQXVEO1FBRW5LLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztZQUN2RCxpQkFBaUIsWUFBQyxJQUFJLEVBQUUsV0FBVztnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUNsRCxDQUFDO1NBQ0osQ0FBQyxDQUFBO1FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUVsQyxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUFyQ3lCO0lBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDOzhCQUFlLGlCQUFVO29EQUFDO0FBRnRDLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7O0dBQ1csY0FBYyxDQXVDMUI7QUF2Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIlxuXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7IC8vIHRoaXMgaXMgbmVlZGVkIG9ubHkgdG8gb3ZlcmNvbWUgdGhlIG1pc3NpbmcgZGVjbGFyYXRpb25zIGZpbGVzIGZvciBhbmRyb2lkIEFQSVxuLy8gaWYgeW91IG5lZWQgaW50ZWxsaXNlbnNlIGZvciBBbmRyaW9kIGFwaSB0aGVuIHlvdSBjYW4gaW5zdGFsbCB0bnMtcGxhdGZvcm0tZGVjbGFyYXRpb25zXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoXCJ3ZWJ2aWV3XCIpIHdlYnZpZXdGaWVsZDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkgeyB9XG5cbiAgICBwdWJsaWMgb25XZWJWaWV3TG9hZGVkKGFyZ3M6IExvYWRFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbldlYlZpZXdMb2FkZWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3Mub2JqZWN0KTsgLy8gd2Vidmlld1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgbGV0IHdlYlZpZXcgPSA8V2ViVmlldz50aGlzLndlYnZpZXdGaWVsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWJWaWV3LmFuZHJvaWQpOyAvLyBhbmRyb2lkLndlYmtpdC5XZWJWaWV3XG5cbiAgICAgICAgd2ViVmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0VXNlV2lkZVZpZXdQb3J0KHRydWUpO1xuICAgICAgICB3ZWJWaWV3LmFuZHJvaWQuZ2V0U2V0dGluZ3MoKS5zZXRMb2FkV2l0aE92ZXJ2aWV3TW9kZSh0cnVlKTtcbiAgICAgICAgd2ViVmlldy5hbmRyb2lkLmdldFNldHRpbmdzKCkuc2V0SmF2YVNjcmlwdEVuYWJsZWQodHJ1ZSk7XG4gICAgICAgIHdlYlZpZXcuYW5kcm9pZC5nZXRTZXR0aW5ncygpLnNldExheW91dEFsZ29yaXRobShhbmRyb2lkLndlYmtpdC5XZWJTZXR0aW5ncy5MYXlvdXRBbGdvcml0aG0uU0lOR0xFX0NPTFVNTik7IC8vIG5vdGljZSB0aGlzIHBhcmFtZXRlciBpcyBjb21pbmcgZnJvbSB0aGUgYW5kcm9pZCBBUElcblxuICAgICAgICB2YXIgV2ViQ2hyb21DbGllbnQgPSBhbmRyb2lkLndlYmtpdC5XZWJDaHJvbWVDbGllbnQuZXh0ZW5kKHtcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3NDaGFuZ2VkKHZpZXcsIG5ld1Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmlldyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIGxvYWRpbmcgXCIgKyBuZXdQcm9ncmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyBXZWJDaHJvbUNsaWVudCgpO1xuXG4gICAgICAgIHdlYlZpZXcuYW5kcm9pZC5zZXRXZWJDaHJvbWVDbGllbnQoY2xpZW50KTtcbiAgICB9XG59XG4iXX0=