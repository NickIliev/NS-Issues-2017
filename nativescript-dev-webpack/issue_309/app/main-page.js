"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var webViewModule = require("ui/web-view");
var platformModule = require("platform");
function navigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;
    var webView = page.getViewById("webView");
    webView.on(webViewModule.WebView.loadFinishedEvent, function (args) {
        if (platformModule.isAndroid) {
            var MyWebChromeClient = (function (_super) {
                __extends(MyWebChromeClient, _super);
                function MyWebChromeClient() {
                    var _this = _super.call(this) || this;
                    return global.__native(_this);
                }
                MyWebChromeClient.prototype.init = function () {
                };
                MyWebChromeClient.prototype.onJsAlert = function (webview, url, msg, result) {
                    console.log(msg, "MESSAGE");
                    result.confirm();
                    return true;
                };
                return MyWebChromeClient;
            }(android.webkit.WebChromeClient));
            args.object.android.getSettings().setJavaScriptEnabled(true);
            args.object.android.setWebChromeClient(new MyWebChromeClient());
        }
        if (args.error) {
            console.log(args.error);
        }
    });
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW9EO0FBQ3BELDJDQUE2QztBQUM3Qyx5Q0FBMkM7QUFHM0Msc0JBQTZCLElBQWU7SUFDeEM7Ozs7TUFJRTtJQUNGLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUxQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBUyxJQUFpQztRQUMxRixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQjtnQkFBZ0MscUNBQThCO2dCQUMxRDtvQkFBQSxZQUNJLGlCQUFPLFNBRVY7b0JBREcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQ0QsZ0NBQUksR0FBSjtnQkFDQSxDQUFDO2dCQUNELHFDQUFTLEdBQVQsVUFBVSxPQUErQixFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsTUFBK0I7b0JBQ2hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUU1QixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRWpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0wsd0JBQUM7WUFBRCxDQUFDLEFBZEQsQ0FBZ0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBYzdEO1lBQ3VCLElBQUksQ0FBQyxNQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxNQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQXJDRCxvQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgSGVsbG9Xb3JsZE1vZGVsIH0gZnJvbSAnLi9tYWluLXZpZXctbW9kZWwnO1xuaW1wb3J0ICogYXMgd2ViVmlld01vZHVsZSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJwbGF0Zm9ybVwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG4gICAgLypcbiAgICBUaGlzIGdldHMgYSByZWZlcmVuY2UgdGhpcyBwYWdl4oCZcyA8UGFnZT4gVUkgY29tcG9uZW50LiBZb3UgY2FuXG4gICAgdmlldyB0aGUgQVBJIHJlZmVyZW5jZSBvZiB0aGUgUGFnZSB0byBzZWUgd2hhdOKAmXMgYXZhaWxhYmxlIGF0XG4gICAgaHR0cHM6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYXBpLXJlZmVyZW5jZS9jbGFzc2VzL191aV9wYWdlXy5wYWdlLmh0bWxcbiAgICAqL1xuICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgdmFyIHdlYlZpZXcgPSBwYWdlLmdldFZpZXdCeUlkKFwid2ViVmlld1wiKTtcblxuICAgIHdlYlZpZXcub24od2ViVmlld01vZHVsZS5XZWJWaWV3LmxvYWRGaW5pc2hlZEV2ZW50LCBmdW5jdGlvbihhcmdzOiB3ZWJWaWV3TW9kdWxlLkxvYWRFdmVudERhdGEpIHtcbiAgICAgICAgaWYgKHBsYXRmb3JtTW9kdWxlLmlzQW5kcm9pZCkge1xuICAgICAgICAgICAgY2xhc3MgTXlXZWJDaHJvbWVDbGllbnQgZXh0ZW5kcyBhbmRyb2lkLndlYmtpdC5XZWJDaHJvbWVDbGllbnQge1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsLl9fbmF0aXZlKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbkpzQWxlcnQod2VidmlldzogYW5kcm9pZC53ZWJraXQuV2ViVmlldywgdXJsOiBzdHJpbmcsIG1zZzogc3RyaW5nLCByZXN1bHQ6IGFuZHJvaWQud2Via2l0LkpzUmVzdWx0KTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZywgXCJNRVNTQUdFXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb25maXJtKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKDx3ZWJWaWV3TW9kdWxlLldlYlZpZXc+YXJncy5vYmplY3QpLmFuZHJvaWQuZ2V0U2V0dGluZ3MoKS5zZXRKYXZhU2NyaXB0RW5hYmxlZCh0cnVlKTtcblxuICAgICAgICAgICAgKDx3ZWJWaWV3TW9kdWxlLldlYlZpZXc+YXJncy5vYmplY3QpLmFuZHJvaWQuc2V0V2ViQ2hyb21lQ2xpZW50KG5ldyBNeVdlYkNocm9tZUNsaWVudCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmdzLmVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcbn0iXX0=