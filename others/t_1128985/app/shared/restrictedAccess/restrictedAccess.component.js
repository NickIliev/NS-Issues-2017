"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var global_1 = require("../../shared/global");
var page_1 = require("ui/page");
var home_service_1 = require("../../pages/home/home.service");
var app = require("tns-core-modules/application");
var RestrictedAccessComponent = (function () {
    function RestrictedAccessComponent(params, modalParams, _homeService, _routerExtensions, vcRef, page, _globals) {
        this.params = params;
        this.modalParams = modalParams;
        this._homeService = _homeService;
        this._routerExtensions = _routerExtensions;
        this.vcRef = vcRef;
        this.page = page;
        this._globals = _globals;
        this.authInfo = [];
    }
    RestrictedAccessComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0}";
        }
    };
    RestrictedAccessComponent.prototype.authenticate = function () {
        var _this = this;
        this.params.closeCallback();
        // this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
        //                  animated: false
        //             });     
        if (this._globals.is_auth_cancelled) {
            var info = this._homeService.getAuthInfo();
            this.authInfo = info;
        }
        else {
            var info = this._homeService.getNewUserAuthInfo();
            this.authInfo = info;
        }
        this.authInfo.map(function (item) {
            _this._globals.user_state = item.userState;
            if (item.firstName === "" || item.firstName === undefined) {
                _this._routerExtensions.navigate(["/personal_info/personal_info", _this._globals.registration_mode, _this._globals.user_identity], {
                    animated: false
                });
            }
            else if (item.memberId === "" || item.memberId === undefined) {
                _this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
            }
            else if (item.ssn === "" || item.ssn === undefined) {
                _this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                    animated: false
                });
            }
        });
    };
    RestrictedAccessComponent.prototype.mayBeLater = function () {
        this.params.closeCallback();
    };
    RestrictedAccessComponent.prototype.goBack = function () {
        this.params.closeCallback();
    };
    return RestrictedAccessComponent;
}());
RestrictedAccessComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./restrictedAccess.component.html",
        styleUrls: ["./restrictedAccess.css"],
    }),
    __metadata("design:paramtypes", [dialogs_2.ModalDialogParams,
        dialogs_1.ModalDialogService, home_service_1.HomeService,
        router_1.RouterExtensions,
        core_1.ViewContainerRef,
        page_1.Page,
        global_1.Globals])
], RestrictedAccessComponent);
exports.RestrictedAccessComponent = RestrictedAccessComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdHJpY3RlZEFjY2Vzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN0cmljdGVkQWNjZXNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUdwRSxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLG1FQUE0RTtBQUM1RSw4Q0FBOEM7QUFDOUMsZ0NBQStCO0FBQy9CLDhEQUE0RDtBQUM1RCxrREFBb0Q7QUFTcEQsSUFBYSx5QkFBeUI7SUFFbEMsbUNBQW9CLE1BQXlCLEVBQ3JDLFdBQStCLEVBQVMsWUFBeUIsRUFDakUsaUJBQW1DLEVBQ25DLEtBQXVCLEVBQ3ZCLElBQVUsRUFDWCxRQUFpQjtRQUxKLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ2pFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNYLGFBQVEsR0FBUixRQUFRLENBQVM7UUFOakIsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQVFyQixDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUNJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsK0NBQStDLENBQUM7UUFDcEUsQ0FBQztJQUNMLENBQUM7SUFFRCxnREFBWSxHQUFaO1FBQUEsaUJBa0NDO1FBakNHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUIsb0lBQW9JO1FBQ3BJLG1DQUFtQztRQUNuQyx1QkFBdUI7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDTCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtZQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QixFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDOUgsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsNEJBQTRCLENBQUMsRUFBRTtvQkFDOUQsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtvQkFDbEUsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILENBQUM7SUFFRCw4Q0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMENBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQTVERCxJQTREQztBQTVEWSx5QkFBeUI7SUFQckMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO0tBRXhDLENBQUM7cUNBSThCLDJCQUFpQjtRQUN4Qiw0QkFBa0IsRUFBdUIsMEJBQVc7UUFDOUMseUJBQWdCO1FBQzVCLHVCQUFnQjtRQUNqQixXQUFJO1FBQ0QsZ0JBQU87R0FQZix5QkFBeUIsQ0E0RHJDO0FBNURZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEhvbWVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3BhZ2VzL2hvbWUvaG9tZS5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3RyaWN0ZWRBY2Nlc3MuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcmVzdHJpY3RlZEFjY2Vzcy5jc3NcIl0sXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgYXV0aEluZm8gPSBbXTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwdWJsaWMgX2hvbWVTZXJ2aWNlOiBIb21lU2VydmljZSxcbiAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscykge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH1cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF1dGhlbnRpY2F0ZSgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3BlcnNvbmFsX2luZm9cIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy5fZ2xvYmFscy51c2VyX2lkZW50aXR5XSwge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAvLyAgICAgICAgICAgICB9KTsgICAgIFxuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzX2F1dGhfY2FuY2VsbGVkKSB7XG4gICAgICBcbiAgICAgIGxldCBpbmZvID0gdGhpcy5faG9tZVNlcnZpY2UuZ2V0QXV0aEluZm8oKTtcbiAgICAgIHRoaXMuYXV0aEluZm8gPSBpbmZvO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgbGV0IGluZm8gPSB0aGlzLl9ob21lU2VydmljZS5nZXROZXdVc2VyQXV0aEluZm8oKTtcbiAgICAgIHRoaXMuYXV0aEluZm8gPSBpbmZvO1xuICAgIH1cblxuICAgIHRoaXMuYXV0aEluZm8ubWFwKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBpdGVtLnVzZXJTdGF0ZTtcbiAgICAgIGlmIChpdGVtLmZpcnN0TmFtZSA9PT0gXCJcIiB8fCBpdGVtLmZpcnN0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcGVyc29uYWxfaW5mb1wiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHldLCB7XG4gICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlbS5tZW1iZXJJZCA9PT0gXCJcIiB8fCBpdGVtLm1lbWJlcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9tZW1iZXJfaW5mb1wiXSwge1xuICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZW0uc3NuID09PSBcIlwiIHx8IGl0ZW0uc3NuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby92ZXJpZnlfaWRlbnRpdHlcIl0sIHtcbiAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIFxuICAgIH1cblxuICAgIG1heUJlTGF0ZXIoKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG59Il19