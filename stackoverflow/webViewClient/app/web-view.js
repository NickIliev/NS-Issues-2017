"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebViewClientSslImpl = (function (_super) {
    __extends(WebViewClientSslImpl, _super);
    function WebViewClientSslImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    WebViewClientSslImpl.prototype.shouldOverrideUrlLoading = function (view, url) {
        return false;
    };
    WebViewClientSslImpl.prototype.onPageStarted = function (view, url, favicon) {
        _super.prototype.onPageStarted.call(this, view, url, favicon);
        var owner = this.owner;
        if (owner) {
            owner._onLoadStarted(url, undefined);
        }
    };
    WebViewClientSslImpl.prototype.onPageFinished = function (view, url) {
        _super.prototype.onPageFinished.call(this, view, url);
        var owner = this.owner;
        if (owner) {
            owner._onLoadFinished(url, undefined);
        }
    };
    WebViewClientSslImpl.prototype.onReceivedError = function () {
        var view = arguments[0];
        if (arguments.length === 4) {
            var errorCode = arguments[1];
            var description = arguments[2];
            var failingUrl = arguments[3];
            _super.prototype.onReceivedError.call(this, view, errorCode, description, failingUrl);
            var owner = this.owner;
            if (owner) {
                owner._onLoadFinished(failingUrl, description + "(" + errorCode + ")");
            }
        }
        else {
            var request = arguments[1];
            var error = arguments[2];
            _super.prototype.onReceivedError.call(this, view, request, error);
            var owner = this.owner;
            if (owner) {
                owner._onLoadFinished(error.getUrl && error.getUrl(), error.getDescription() + "(" + error.getErrorCode() + ")");
            }
        }
    };
    WebViewClientSslImpl.prototype.onReceivedSslError = function (view, handler, error) {
        handler.proceed();
    };
    return WebViewClientSslImpl;
}(android.webkit.WebViewClient));
exports.WebViewClientSslImpl = WebViewClientSslImpl;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWItdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQTBDLHdDQUE0QjtJQUVsRSw4QkFBbUIsS0FBVTtRQUE3QixZQUNJLGlCQUFPLFNBRVY7UUFIa0IsV0FBSyxHQUFMLEtBQUssQ0FBSztRQUV6QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sdURBQXdCLEdBQS9CLFVBQWdDLElBQTRCLEVBQUUsR0FBVztRQUNyRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSw0Q0FBYSxHQUFwQixVQUFxQixJQUE0QixFQUFFLEdBQVcsRUFBRSxPQUFnQztRQUM1RixpQkFBTSxhQUFhLFlBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDZDQUFjLEdBQXJCLFVBQXNCLElBQTRCLEVBQUUsR0FBVztRQUMzRCxpQkFBTSxjQUFjLFlBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7SUFDTCxDQUFDO0lBRU0sOENBQWUsR0FBdEI7UUFDSSxJQUFJLElBQUksR0FBMkIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLFNBQVMsR0FBVyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxXQUFXLEdBQVcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksVUFBVSxHQUFXLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0QyxpQkFBTSxlQUFlLFlBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFaEUsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLFdBQVcsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLE9BQU8sR0FBUSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxLQUFLLEdBQVEsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlCLGlCQUFNLGVBQWUsWUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3JILENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlEQUFrQixHQUF6QixVQUEwQixJQUFTLEVBQUUsT0FBWSxFQUFFLEtBQVU7UUFDekQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUF4REQsQ0FBMEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBd0RyRTtBQXhEWSxvREFBb0I7QUF3RGhDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgV2ViVmlld0NsaWVudFNzbEltcGwgZXh0ZW5kcyBhbmRyb2lkLndlYmtpdC5XZWJWaWV3Q2xpZW50IHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBhbnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwuX19uYXRpdmUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3VsZE92ZXJyaWRlVXJsTG9hZGluZyh2aWV3OiBhbmRyb2lkLndlYmtpdC5XZWJWaWV3LCB1cmw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25QYWdlU3RhcnRlZCh2aWV3OiBhbmRyb2lkLndlYmtpdC5XZWJWaWV3LCB1cmw6IHN0cmluZywgZmF2aWNvbjogYW5kcm9pZC5ncmFwaGljcy5CaXRtYXApIHtcclxuICAgICAgICBzdXBlci5vblBhZ2VTdGFydGVkKHZpZXcsIHVybCwgZmF2aWNvbik7XHJcbiAgICAgICAgY29uc3Qgb3duZXIgPSB0aGlzLm93bmVyO1xyXG4gICAgICAgIGlmIChvd25lcikge1xyXG4gICAgICAgICAgICBvd25lci5fb25Mb2FkU3RhcnRlZCh1cmwsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblBhZ2VGaW5pc2hlZCh2aWV3OiBhbmRyb2lkLndlYmtpdC5XZWJWaWV3LCB1cmw6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLm9uUGFnZUZpbmlzaGVkKHZpZXcsIHVybCk7XHJcbiAgICAgICAgY29uc3Qgb3duZXIgPSB0aGlzLm93bmVyO1xyXG4gICAgICAgIGlmIChvd25lcikge1xyXG4gICAgICAgICAgICBvd25lci5fb25Mb2FkRmluaXNoZWQodXJsLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25SZWNlaXZlZEVycm9yKCkge1xyXG4gICAgICAgIGxldCB2aWV3OiBhbmRyb2lkLndlYmtpdC5XZWJWaWV3ID0gYXJndW1lbnRzWzBdO1xyXG5cclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JDb2RlOiBudW1iZXIgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbjogc3RyaW5nID0gYXJndW1lbnRzWzJdO1xyXG4gICAgICAgICAgICBsZXQgZmFpbGluZ1VybDogc3RyaW5nID0gYXJndW1lbnRzWzNdO1xyXG5cclxuICAgICAgICAgICAgc3VwZXIub25SZWNlaXZlZEVycm9yKHZpZXcsIGVycm9yQ29kZSwgZGVzY3JpcHRpb24sIGZhaWxpbmdVcmwpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb3duZXIgPSB0aGlzLm93bmVyO1xyXG4gICAgICAgICAgICBpZiAob3duZXIpIHtcclxuICAgICAgICAgICAgICAgIG93bmVyLl9vbkxvYWRGaW5pc2hlZChmYWlsaW5nVXJsLCBkZXNjcmlwdGlvbiArIFwiKFwiICsgZXJyb3JDb2RlICsgXCIpXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3Q6IGFueSA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICAgICAgbGV0IGVycm9yOiBhbnkgPSBhcmd1bWVudHNbMl07XHJcblxyXG4gICAgICAgICAgICBzdXBlci5vblJlY2VpdmVkRXJyb3IodmlldywgcmVxdWVzdCwgZXJyb3IpO1xyXG4gICAgICAgICAgICBjb25zdCBvd25lciA9IHRoaXMub3duZXI7XHJcbiAgICAgICAgICAgIGlmIChvd25lcikge1xyXG4gICAgICAgICAgICAgICAgb3duZXIuX29uTG9hZEZpbmlzaGVkKGVycm9yLmdldFVybCAmJiBlcnJvci5nZXRVcmwoKSwgZXJyb3IuZ2V0RGVzY3JpcHRpb24oKSArIFwiKFwiICsgZXJyb3IuZ2V0RXJyb3JDb2RlKCkgKyBcIilcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmVjZWl2ZWRTc2xFcnJvcih2aWV3OiBhbnksIGhhbmRsZXI6IGFueSwgZXJyb3I6IGFueSkge1xyXG4gICAgICAgIGhhbmRsZXIucHJvY2VlZCgpO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=