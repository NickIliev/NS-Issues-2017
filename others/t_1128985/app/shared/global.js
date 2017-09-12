"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Toast = require("nativescript-toast");
var layout_base_1 = require("ui/layouts/layout-base");
var nativescript_locate_address_1 = require("nativescript-locate-address");
var app = require("tns-core-modules/application");
var permissions = require("nativescript-permissions");
var phone = require("nativescript-phone");
core_1.Injectable();
var Globals = (function () {
    function Globals() {
        this.isLoggedIn = false;
        this.isUnauthenticated = false;
        this.isanonymous = true;
        this.isShowTouchID = true;
        this.isAuthenticationSuccess = false;
        this.registration_mode = "mobile";
        this.isTurnOff = false;
        this.is_auth_cancelled = false;
        this.iscardslider = false;
        this.iscardSecondSlider = false;
        this.isAuthCancelled = false;
        this.LoggedIn = new core_1.EventEmitter();
        this.Unauthenticated = new core_1.EventEmitter();
    }
    Globals.prototype.changeLogin = function () {
        this.LoggedIn.emit(true);
        this.Unauthenticated.emit(false);
    };
    Globals.prototype.changeRegister = function () {
        this.LoggedIn.emit(false);
        this.Unauthenticated.emit(true);
    };
    Globals.prototype.getloginValue = function () {
        return this.LoggedIn;
    };
    Globals.prototype.getUnauthenticatedValue = function () {
        return this.Unauthenticated;
    };
    Globals.prototype.showToastMessage = function (message, duration) {
        var toast = Toast.makeText(message, duration);
        toast.show();
    };
    // diable the tap layouts
    Globals.prototype.setIsUserInteractionEnabledRecursive = function (view, newValue) {
        view.isUserInteractionEnabled = newValue;
        if (view instanceof layout_base_1.LayoutBase) {
            var layoutBase = view;
            for (var i = 0, length_1 = layoutBase.getChildrenCount(); i < length_1; i++) {
                var child = layoutBase.getChildAt(i);
                this.setIsUserInteractionEnabledRecursive(child, newValue);
            }
        }
    };
    Globals.prototype.locateAddress = function (address1, city, state, zipcode) {
        var _locateAddress = new nativescript_locate_address_1.LocateAddress();
        _locateAddress.locate({
            address: address1 + city + state + zipcode,
        }).then(function () {
            // console.log(`Address: ${this.address} locateAddress launched!`);
        }, function (err) {
            // alert(err);
        });
    };
    Globals.prototype.callPhone = function (phoneNo) {
        if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.CALL_PHONE], "App Needs The Following permissions")
                .then(function () {
                // Permission Granted
                phone.dial(phoneNo.toString(), true);
            })
                .catch(function () {
                // Permission Denied
            });
        }
        else {
            // ios
            phone.dial(phoneNo.toString(), true);
        }
    };
    return Globals;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Globals.prototype, "LoggedIn", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Globals.prototype, "Unauthenticated", void 0);
exports.Globals = Globals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1GO0FBQ25GLDBDQUE0QztBQUU1QyxzREFBb0Q7QUFDcEQsMkVBQTREO0FBQzVELGtEQUFvRDtBQUNwRCxzREFBd0Q7QUFDeEQsMENBQTRDO0FBSTVDLGlCQUFVLEVBQUUsQ0FBQztBQUNiO0lBNEJJO1FBM0JBLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQUN6QixzQkFBaUIsR0FBUyxRQUFRLENBQUM7UUFXbkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUczQixzQkFBaUIsR0FBVSxLQUFLLENBQUM7UUFDakMsaUJBQVksR0FBYSxLQUFLLENBQUM7UUFDL0IsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLG9CQUFlLEdBQVMsS0FBSyxDQUFDO1FBRTNCLGFBQVEsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDakQsb0JBQWUsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJbEUsQ0FBQztJQUVELDZCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsZ0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCwrQkFBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELHlDQUF1QixHQUF2QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxrQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBTyxFQUFFLFFBQVE7UUFDOUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDRCx5QkFBeUI7SUFDekIsc0RBQW9DLEdBQXBDLFVBQXFDLElBQVUsRUFBRSxRQUFpQjtRQUM5RCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSx3QkFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLFVBQVUsR0FBZSxJQUFJLENBQUM7WUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQU0sR0FBRyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEdBQUcsUUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RFLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0QsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU0sK0JBQWEsR0FBcEIsVUFBcUIsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTztRQUMvQyxJQUFJLGNBQWMsR0FBRyxJQUFJLDJDQUFhLEVBQUUsQ0FBQztRQUN6QyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxRQUFRLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxPQUFPO1NBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixtRUFBbUU7UUFDdkUsQ0FBQyxFQUFFLFVBQUMsR0FBRztZQUNILGNBQWM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sMkJBQVMsR0FBaEIsVUFBaUIsT0FBTztRQUNuQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLG9CQUFvQjtZQUNwQixXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFDbkUscUNBQXFDLENBQUM7aUJBQ3JDLElBQUksQ0FBQztnQkFDRixxQkFBcUI7Z0JBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUM7Z0JBQ0gsb0JBQW9CO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsTUFBTTtZQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUEvRkQsSUErRkM7QUF0RWE7SUFBVCxhQUFNLEVBQUU7OEJBQVcsbUJBQVk7eUNBQTJCO0FBQ2pEO0lBQVQsYUFBTSxFQUFFOzhCQUFrQixtQkFBWTtnREFBMkI7QUExQnpELDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3RhYmxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IExheW91dEJhc2UgfSBmcm9tIFwidWkvbGF5b3V0cy9sYXlvdXQtYmFzZVwiO1xuaW1wb3J0IHsgTG9jYXRlQWRkcmVzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYXRlLWFkZHJlc3NcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xuaW1wb3J0ICogYXMgcGhvbmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1waG9uZVwiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3NNb2R1bGUgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5kZWNsYXJlIHZhciBhbmRyb2lkO1xuXG5JbmplY3RhYmxlKCk7XG5leHBvcnQgY2xhc3MgR2xvYmFscyB7XG4gICAgaXNMb2dnZWRJbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzVW5hdXRoZW50aWNhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNhbm9ueW1vdXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlzU2hvd1RvdWNoSUQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlzQXV0aGVudGljYXRpb25TdWNjZXNzID0gZmFsc2U7XG4gICAgcHVibGljIHJlZ2lzdHJhdGlvbl9tb2RlOiBzdHJpbmc9XCJtb2JpbGVcIjtcbiAgICBwdWJsaWMgdXNlcl9pZGVudGl0eTogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VyX3JlZ19wYXNzd29yZDogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VyX2ZuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJfbG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgdXNlcl9kb2I6IHN0cmluZztcbiAgICBwdWJsaWMgdXNlcl91c2VyaWR0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJfdXNlcmlkbnVtOiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJfc3NuOiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJfdXBkYXRlZHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJfdXBkYXRlZHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgcHVibGljIGlzVHVybk9mZjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyB1c2VyX3N0YXRlOiBzdHJpbmc7XG4gICAgcHVibGljIHByb21vU3RhdGU6IHN0cmluZztcbiAgICBwdWJsaWMgaXNfYXV0aF9jYW5jZWxsZWQ6IGJvb2xlYW49ZmFsc2U7XG4gICAgcHVibGljIGlzY2FyZHNsaWRlcjogYm9vbGVhbiA9ICBmYWxzZTtcbiAgICBwdWJsaWMgaXNjYXJkU2Vjb25kU2xpZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzQXV0aENhbmNlbGxlZDpCb29sZWFuPWZhbHNlO1xuXG4gICAgQE91dHB1dCgpIExvZ2dlZEluOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgVW5hdXRoZW50aWNhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgIFxuICAgIH1cblxuICAgIGNoYW5nZUxvZ2luKCkge1xuICAgICAgICB0aGlzLkxvZ2dlZEluLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMuVW5hdXRoZW50aWNhdGVkLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIGNoYW5nZVJlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLkxvZ2dlZEluLmVtaXQoZmFsc2UpO1xuICAgICAgICB0aGlzLlVuYXV0aGVudGljYXRlZC5lbWl0KHRydWUpO1xuICAgIH1cblxuICAgIGdldGxvZ2luVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkxvZ2dlZEluO1xuICAgIH1cblxuICAgIGdldFVuYXV0aGVudGljYXRlZFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5VbmF1dGhlbnRpY2F0ZWQ7XG4gICAgfVxuXG4gICAgc2hvd1RvYXN0TWVzc2FnZShtZXNzYWdlLCBkdXJhdGlvbikge1xuICAgICAgICBsZXQgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChtZXNzYWdlLCBkdXJhdGlvbik7XG4gICAgICAgIHRvYXN0LnNob3coKTtcbiAgICB9XG4gICAgLy8gZGlhYmxlIHRoZSB0YXAgbGF5b3V0c1xuICAgIHNldElzVXNlckludGVyYWN0aW9uRW5hYmxlZFJlY3Vyc2l2ZSh2aWV3OiBWaWV3LCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB2aWV3LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIExheW91dEJhc2UpIHtcbiAgICAgICAgICAgIGxldCBsYXlvdXRCYXNlID0gPExheW91dEJhc2U+dmlldztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBsYXlvdXRCYXNlLmdldENoaWxkcmVuQ291bnQoKTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gbGF5b3V0QmFzZS5nZXRDaGlsZEF0KGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SXNVc2VySW50ZXJhY3Rpb25FbmFibGVkUmVjdXJzaXZlKGNoaWxkLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbG9jYXRlQWRkcmVzcyhhZGRyZXNzMSwgY2l0eSwgc3RhdGUsIHppcGNvZGUpIHtcbiAgICAgICAgbGV0IF9sb2NhdGVBZGRyZXNzID0gbmV3IExvY2F0ZUFkZHJlc3MoKTtcbiAgICAgICAgX2xvY2F0ZUFkZHJlc3MubG9jYXRlKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MxICsgY2l0eSArIHN0YXRlICsgemlwY29kZSxcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQWRkcmVzczogJHt0aGlzLmFkZHJlc3N9IGxvY2F0ZUFkZHJlc3MgbGF1bmNoZWQhYCk7XG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgIC8vIGFsZXJ0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYWxsUGhvbmUocGhvbmVObyl7XG4gICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIC8vIGFuZHJvaWQgY29uZGl0aW9uXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbnMoW2FuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQUxMX1BIT05FXSxcbiAgICAgICAgICAgICAgICBcIkFwcCBOZWVkcyBUaGUgRm9sbG93aW5nIHBlcm1pc3Npb25zXCIpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBQZXJtaXNzaW9uIEdyYW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcGhvbmUuZGlhbChwaG9uZU5vLnRvU3RyaW5nKCksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVybWlzc2lvbiBEZW5pZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlvc1xuICAgICAgICAgICAgcGhvbmUuZGlhbChwaG9uZU5vLnRvU3RyaW5nKCksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==