"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var global_1 = require("../../../shared/global");
var login_service_1 = require("../login.service");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var dialogs_1 = require("ui/dialogs");
var appSettings = require("application-settings");
var app = require("tns-core-modules/application");
var page_1 = require("ui/page");
var ChangeUserComponent = (function () {
    function ChangeUserComponent(_router, _globals, _loginService, page) {
        this._router = _router;
        this._globals = _globals;
        this._loginService = _loginService;
        this.page = page;
        this.secureStorage = new nativescript_secure_storage_1.SecureStorage();
    }
    ChangeUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.title = "Change Online ID";
        this.secureStorage.get({
            key: "UserName"
        }).then(function (value) {
            if (value) {
                _this.userName = value.substring(0, 3) + value.substring(3).replace(/./g, "*");
            }
            else {
                _this.userName = "";
            }
        });
        if (appSettings.getBoolean("isEnableTouchID") === true) {
            this.isTouchIdEnable = true;
            this._loginService.isEnablenotify = true;
        }
        else {
            this.isTouchIdEnable = false;
            this._loginService.isEnablenotify = false;
        }
    };
    ChangeUserComponent.prototype.goBack = function () {
        this._router.back();
        this._globals.isShowTouchID = false;
    };
    ChangeUserComponent.prototype.diffUser = function () {
        this._loginService.isnotify = true;
        this._loginService.isuserChange = false;
        appSettings.setBoolean("isTouchIDdisableNotification", false);
        this._router.navigate(["/login"], {
            animated: false
        });
        appSettings.remove("isEnableTouchID");
        appSettings.remove("isRememberMe");
        this.secureStorage.remove({
            key: "UserName",
        });
        if (this.isTouchIdEnable) {
            dialogs_1.alert({
                title: "For security, ‘Touch ID’ and ‘Remember Me’ has been reset",
                message: "You will need to re-enable it on your next sign in.",
                okButtonText: "OK"
            });
        }
        else {
            dialogs_1.alert({
                title: "For security, 'Remember Me’ has been reset",
                message: "You will need to re-enable it on your next sign in.",
                okButtonText: "OK"
            });
        }
        this._globals.isShowTouchID = false;
    };
    return ChangeUserComponent;
}());
ChangeUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./changeUser.component.html",
        styleUrls: ["changeUser.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        global_1.Globals,
        login_service_1.LoginService,
        page_1.Page])
], ChangeUserComponent);
exports.ChangeUserComponent = ChangeUserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlVXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFuZ2VVc2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQUVoRixzREFBK0Q7QUFDL0QsaURBQWlEO0FBQ2pELGtEQUFnRDtBQUNoRCwyRUFBNEQ7QUFDNUQsc0NBQW1DO0FBRW5DLGtEQUFvRDtBQUNwRCxrREFBb0Q7QUFDcEQsZ0NBQStCO0FBVS9CLElBQWEsbUJBQW1CO0lBTTVCLDZCQUFvQixPQUF5QixFQUNqQyxRQUFpQixFQUNsQixhQUEyQixFQUMzQixJQUFVO1FBSEQsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDakMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBTmQsa0JBQWEsR0FBRyxJQUFJLDJDQUFhLEVBQUUsQ0FBQztJQVEzQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQXVCQztRQXRCRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1lBQ25CLEdBQUcsRUFBRSxVQUFVO1NBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsRixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzdDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDeEMsV0FBVyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLFFBQVEsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0QyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxVQUFVO1NBQ2xCLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLGVBQUssQ0FBQztnQkFDRixLQUFLLEVBQUUsMkRBQTJEO2dCQUNsRSxPQUFPLEVBQUUscURBQXFEO2dCQUM5RCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixlQUFLLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLDRDQUE0QztnQkFDbkQsT0FBTyxFQUFFLHFEQUFxRDtnQkFDOUQsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBR0wsMEJBQUM7QUFBRCxDQUFDLEFBekVELElBeUVDO0FBekVZLG1CQUFtQjtJQVAvQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FFaEMsQ0FBQztxQ0FRK0IseUJBQWdCO1FBQ3ZCLGdCQUFPO1FBQ0gsNEJBQVk7UUFDckIsV0FBSTtHQVRaLG1CQUFtQixDQXlFL0I7QUF6RVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gXCIuLi9sb2dpbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlY3VyZVN0b3JhZ2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNlY3VyZS1zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgZ2V0TnVtYmVyLCBzZXROdW1iZXIsIGdldFN0cmluZywgc2V0U3RyaW5nLCBoYXNLZXksIHJlbW92ZSwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NoYW5nZVVzZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiY2hhbmdlVXNlci5jc3NcIl1cclxuXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VjdXJlU3RvcmFnZSA9IG5ldyBTZWN1cmVTdG9yYWdlKCk7XHJcbiAgICBwdWJsaWMgdXNlck5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1RvdWNoSWRFbmFibGU6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBfZ2xvYmFsczogR2xvYmFscyxcclxuICAgICAgICBwdWJsaWMgX2xvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBwYWdlOiBQYWdlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiQ2hhbmdlIE9ubGluZSBJRFwiO1xyXG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5nZXQoe1xyXG4gICAgICAgICAgICBrZXk6IFwiVXNlck5hbWVcIlxyXG4gICAgICAgIH0pLnRoZW4odmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlck5hbWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgMykgKyB2YWx1ZS5zdWJzdHJpbmcoMykucmVwbGFjZSgvLi9nLCBcIipcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5nZXRCb29sZWFuKFwiaXNFbmFibGVUb3VjaElEXCIpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaElkRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzRW5hYmxlbm90aWZ5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaElkRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2luU2VydmljZS5pc0VuYWJsZW5vdGlmeSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyLmJhY2soKTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzU2hvd1RvdWNoSUQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkaWZmVXNlcigpIHtcclxuICAgICAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXNub3RpZnkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luU2VydmljZS5pc3VzZXJDaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvblwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJpc0VuYWJsZVRvdWNoSURcIik7XHJcbiAgICAgICAgYXBwU2V0dGluZ3MucmVtb3ZlKFwiaXNSZW1lbWJlck1lXCIpO1xyXG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5yZW1vdmUoe1xyXG4gICAgICAgICAgICBrZXk6IFwiVXNlck5hbWVcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5pc1RvdWNoSWRFbmFibGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRm9yIHNlY3VyaXR5LCDigJhUb3VjaCBJROKAmSBhbmQg4oCYUmVtZW1iZXIgTWXigJkgaGFzIGJlZW4gcmVzZXRcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IHdpbGwgbmVlZCB0byByZS1lbmFibGUgaXQgb24geW91ciBuZXh0IHNpZ24gaW4uXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkZvciBzZWN1cml0eSwgJ1JlbWVtYmVyIE1l4oCZIGhhcyBiZWVuIHJlc2V0XCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdSB3aWxsIG5lZWQgdG8gcmUtZW5hYmxlIGl0IG9uIHlvdXIgbmV4dCBzaWduIGluLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNTaG93VG91Y2hJRCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19