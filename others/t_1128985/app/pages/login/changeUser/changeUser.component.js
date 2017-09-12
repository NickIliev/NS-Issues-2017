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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlVXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFuZ2VVc2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQUVoRixzREFBK0Q7QUFDL0QsaURBQWlEO0FBQ2pELGtEQUFnRDtBQUNoRCwyRUFBNEQ7QUFDNUQsc0NBQW1DO0FBRW5DLGtEQUFvRDtBQUNwRCxrREFBb0Q7QUFDcEQsZ0NBQStCO0FBVS9CLElBQWEsbUJBQW1CO0lBTTVCLDZCQUFvQixPQUF5QixFQUNqQyxRQUFpQixFQUNsQixhQUEyQixFQUMzQixJQUFVO1FBSEQsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDakMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBTmQsa0JBQWEsR0FBRyxJQUFJLDJDQUFhLEVBQUUsQ0FBQztJQVEzQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQXVCQztRQXRCRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1lBQ25CLEdBQUcsRUFBRSxVQUFVO1NBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsRixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzdDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDeEMsV0FBVyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLFFBQVEsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0QyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxVQUFVO1NBQ2xCLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLGVBQUssQ0FBQztnQkFDRixLQUFLLEVBQUUsMkRBQTJEO2dCQUNsRSxPQUFPLEVBQUUscURBQXFEO2dCQUM5RCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixlQUFLLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLDRDQUE0QztnQkFDbkQsT0FBTyxFQUFFLHFEQUFxRDtnQkFDOUQsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBR0wsMEJBQUM7QUFBRCxDQUFDLEFBekVELElBeUVDO0FBekVZLG1CQUFtQjtJQVAvQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FFaEMsQ0FBQztxQ0FRK0IseUJBQWdCO1FBQ3ZCLGdCQUFPO1FBQ0gsNEJBQVk7UUFDckIsV0FBSTtHQVRaLG1CQUFtQixDQXlFL0I7QUF6RVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tIFwiLi4vbG9naW4uc2VydmljZVwiO1xuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGdldE51bWJlciwgc2V0TnVtYmVyLCBnZXRTdHJpbmcsIHNldFN0cmluZywgaGFzS2V5LCByZW1vdmUsIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NoYW5nZVVzZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImNoYW5nZVVzZXIuY3NzXCJdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VVc2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWN1cmVTdG9yYWdlID0gbmV3IFNlY3VyZVN0b3JhZ2UoKTtcbiAgICBwdWJsaWMgdXNlck5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgaXNUb3VjaElkRW5hYmxlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBfZ2xvYmFsczogR2xvYmFscyxcbiAgICAgICAgcHVibGljIF9sb2dpblNlcnZpY2U6IExvZ2luU2VydmljZSxcbiAgICAgICAgcHVibGljIHBhZ2U6IFBhZ2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGl0bGUgPSBcIkNoYW5nZSBPbmxpbmUgSURcIjtcbiAgICAgICAgdGhpcy5zZWN1cmVTdG9yYWdlLmdldCh7XG4gICAgICAgICAgICBrZXk6IFwiVXNlck5hbWVcIlxuICAgICAgICB9KS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlck5hbWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgMykgKyB2YWx1ZS5zdWJzdHJpbmcoMykucmVwbGFjZSgvLi9nLCBcIipcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5nZXRCb29sZWFuKFwiaXNFbmFibGVUb3VjaElEXCIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmlzVG91Y2hJZEVuYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXNFbmFibGVub3RpZnkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1RvdWNoSWRFbmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2luU2VydmljZS5pc0VuYWJsZW5vdGlmeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIuYmFjaygpO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzU2hvd1RvdWNoSUQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkaWZmVXNlcigpIHtcbiAgICAgICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzbm90aWZ5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzdXNlckNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvblwiLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgYXBwU2V0dGluZ3MucmVtb3ZlKFwiaXNFbmFibGVUb3VjaElEXCIpO1xuICAgICAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJpc1JlbWVtYmVyTWVcIik7XG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5yZW1vdmUoe1xuICAgICAgICAgICAga2V5OiBcIlVzZXJOYW1lXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5pc1RvdWNoSWRFbmFibGUpIHtcbiAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJGb3Igc2VjdXJpdHksIOKAmFRvdWNoIElE4oCZIGFuZCDigJhSZW1lbWJlciBNZeKAmSBoYXMgYmVlbiByZXNldFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IHdpbGwgbmVlZCB0byByZS1lbmFibGUgaXQgb24geW91ciBuZXh0IHNpZ24gaW4uXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkZvciBzZWN1cml0eSwgJ1JlbWVtYmVyIE1l4oCZIGhhcyBiZWVuIHJlc2V0XCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJZb3Ugd2lsbCBuZWVkIHRvIHJlLWVuYWJsZSBpdCBvbiB5b3VyIG5leHQgc2lnbiBpbi5cIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc1Nob3dUb3VjaElEID0gZmFsc2U7XG4gICAgfVxuXG5cbn1cbiJdfQ==