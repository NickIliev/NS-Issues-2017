"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Toast = require("nativescript-toast");
var layout_base_1 = require("ui/layouts/layout-base");
var nativescript_locate_address_1 = require("nativescript-locate-address");
var app = require("tns-core-modules/application");
var permissions = require("nativescript-permissions");
var phone = require("nativescript-phone");
var releaseJson = require("../config/release.json");
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
        this.versionNumber = releaseJson.versionnumber;
        this.buildValue = releaseJson.buildnumber;
        this.releaseVersion = releaseJson.releaseVersion;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1GO0FBQ25GLDBDQUE0QztBQUU1QyxzREFBb0Q7QUFDcEQsMkVBQTREO0FBQzVELGtEQUFvRDtBQUNwRCxzREFBd0Q7QUFDeEQsMENBQTRDO0FBRTVDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBR3BELGlCQUFVLEVBQUUsQ0FBQztBQUNiO0lBK0JJO1FBOUJBLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQUN6QixzQkFBaUIsR0FBUyxRQUFRLENBQUM7UUFXbkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixrQkFBYSxHQUFXLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDbEQsZUFBVSxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDN0MsbUJBQWMsR0FBVyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBRXBELHNCQUFpQixHQUFVLEtBQUssQ0FBQztRQUNqQyxpQkFBWSxHQUFhLEtBQUssQ0FBQztRQUMvQix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDcEMsb0JBQWUsR0FBUyxLQUFLLENBQUM7UUFFM0IsYUFBUSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNqRCxvQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUlsRSxDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxnQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELCtCQUFhLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQseUNBQXVCLEdBQXZCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUVELGtDQUFnQixHQUFoQixVQUFpQixPQUFPLEVBQUUsUUFBUTtRQUM5QixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELHlCQUF5QjtJQUN6QixzREFBb0MsR0FBcEMsVUFBcUMsSUFBVSxFQUFFLFFBQWlCO1FBQzlELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLHdCQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksVUFBVSxHQUFlLElBQUksQ0FBQztZQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBTSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsR0FBRyxRQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdEUsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMvRCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTSwrQkFBYSxHQUFwQixVQUFxQixRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPO1FBQy9DLElBQUksY0FBYyxHQUFHLElBQUksMkNBQWEsRUFBRSxDQUFDO1FBQ3pDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDbEIsT0FBTyxFQUFFLFFBQVEsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLE9BQU87U0FDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLG1FQUFtRTtRQUN2RSxDQUFDLEVBQUUsVUFBQyxHQUFHO1lBQ0gsY0FBYztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixPQUFPO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2Ysb0JBQW9CO1lBQ3BCLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUNuRSxxQ0FBcUMsQ0FBQztpQkFDckMsSUFBSSxDQUFDO2dCQUNGLHFCQUFxQjtnQkFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQztnQkFDSCxvQkFBb0I7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixNQUFNO1lBQ04sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNMLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQWxHRCxJQWtHQztBQXRFYTtJQUFULGFBQU0sRUFBRTs4QkFBVyxtQkFBWTt5Q0FBMkI7QUFDakQ7SUFBVCxhQUFNLEVBQUU7OEJBQWtCLG1CQUFZO2dEQUEyQjtBQTdCekQsMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdGFibGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgTGF5b3V0QmFzZSB9IGZyb20gXCJ1aS9sYXlvdXRzL2xheW91dC1iYXNlXCI7XHJcbmltcG9ydCB7IExvY2F0ZUFkZHJlc3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2F0ZS1hZGRyZXNzXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCI7XHJcbmltcG9ydCAqIGFzIHBob25lIGZyb20gXCJuYXRpdmVzY3JpcHQtcGhvbmVcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3NNb2R1bGUgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmxldCByZWxlYXNlSnNvbiA9IHJlcXVpcmUoXCIuLi9jb25maWcvcmVsZWFzZS5qc29uXCIpO1xyXG5kZWNsYXJlIHZhciBhbmRyb2lkO1xyXG5cclxuSW5qZWN0YWJsZSgpO1xyXG5leHBvcnQgY2xhc3MgR2xvYmFscyB7XHJcbiAgICBpc0xvZ2dlZEluOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc1VuYXV0aGVudGljYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNhbm9ueW1vdXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNTaG93VG91Y2hJRDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpc0F1dGhlbnRpY2F0aW9uU3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgcHVibGljIHJlZ2lzdHJhdGlvbl9tb2RlOiBzdHJpbmc9XCJtb2JpbGVcIjtcclxuICAgIHB1YmxpYyB1c2VyX2lkZW50aXR5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcl9yZWdfcGFzc3dvcmQ6IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VyX2ZuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcl9sbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXJfZG9iOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcl91c2VyaWR0eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcl91c2VyaWRudW06IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VyX3Nzbjogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXJfdXBkYXRlZHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcl91cGRhdGVkcGFzc3dvcmQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1R1cm5PZmY6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyB1c2VyX3N0YXRlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdmVyc2lvbk51bWJlcjogc3RyaW5nID0gcmVsZWFzZUpzb24udmVyc2lvbm51bWJlcjtcclxuICAgIHB1YmxpYyBidWlsZFZhbHVlOiBzdHJpbmcgPSByZWxlYXNlSnNvbi5idWlsZG51bWJlcjtcclxuICAgIHB1YmxpYyByZWxlYXNlVmVyc2lvbjogc3RyaW5nID0gcmVsZWFzZUpzb24ucmVsZWFzZVZlcnNpb247XHJcbiAgICBwdWJsaWMgcHJvbW9TdGF0ZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzX2F1dGhfY2FuY2VsbGVkOiBib29sZWFuPWZhbHNlO1xyXG4gICAgcHVibGljIGlzY2FyZHNsaWRlcjogYm9vbGVhbiA9ICBmYWxzZTtcclxuICAgIHB1YmxpYyBpc2NhcmRTZWNvbmRTbGlkZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc0F1dGhDYW5jZWxsZWQ6Qm9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBAT3V0cHV0KCkgTG9nZ2VkSW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIFVuYXV0aGVudGljYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VMb2dpbigpIHtcclxuICAgICAgICB0aGlzLkxvZ2dlZEluLmVtaXQodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VbmF1dGhlbnRpY2F0ZWQuZW1pdChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5Mb2dnZWRJbi5lbWl0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlVuYXV0aGVudGljYXRlZC5lbWl0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldGxvZ2luVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTG9nZ2VkSW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VW5hdXRoZW50aWNhdGVkVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVW5hdXRoZW50aWNhdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dUb2FzdE1lc3NhZ2UobWVzc2FnZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBsZXQgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChtZXNzYWdlLCBkdXJhdGlvbik7XHJcbiAgICAgICAgdG9hc3Quc2hvdygpO1xyXG4gICAgfVxyXG4gICAgLy8gZGlhYmxlIHRoZSB0YXAgbGF5b3V0c1xyXG4gICAgc2V0SXNVc2VySW50ZXJhY3Rpb25FbmFibGVkUmVjdXJzaXZlKHZpZXc6IFZpZXcsIG5ld1ZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdmlldy5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSBuZXdWYWx1ZTtcclxuICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIExheW91dEJhc2UpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dEJhc2UgPSA8TGF5b3V0QmFzZT52aWV3O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gbGF5b3V0QmFzZS5nZXRDaGlsZHJlbkNvdW50KCk7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gbGF5b3V0QmFzZS5nZXRDaGlsZEF0KGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWRSZWN1cnNpdmUoY2hpbGQsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9jYXRlQWRkcmVzcyhhZGRyZXNzMSwgY2l0eSwgc3RhdGUsIHppcGNvZGUpIHtcclxuICAgICAgICBsZXQgX2xvY2F0ZUFkZHJlc3MgPSBuZXcgTG9jYXRlQWRkcmVzcygpO1xyXG4gICAgICAgIF9sb2NhdGVBZGRyZXNzLmxvY2F0ZSh7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MxICsgY2l0eSArIHN0YXRlICsgemlwY29kZSxcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEFkZHJlc3M6ICR7dGhpcy5hZGRyZXNzfSBsb2NhdGVBZGRyZXNzIGxhdW5jaGVkIWApO1xyXG4gICAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsbFBob25lKHBob25lTm8pe1xyXG4gICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgLy8gYW5kcm9pZCBjb25kaXRpb25cclxuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFthbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQ0FMTF9QSE9ORV0sXHJcbiAgICAgICAgICAgICAgICBcIkFwcCBOZWVkcyBUaGUgRm9sbG93aW5nIHBlcm1pc3Npb25zXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVybWlzc2lvbiBHcmFudGVkXHJcbiAgICAgICAgICAgICAgICAgICAgcGhvbmUuZGlhbChwaG9uZU5vLnRvU3RyaW5nKCksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVybWlzc2lvbiBEZW5pZWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaW9zXHJcbiAgICAgICAgICAgIHBob25lLmRpYWwocGhvbmVOby50b1N0cmluZygpLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=