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
        setTimeout(function () {
            _this.params.closeCallback();
        }, 100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdHJpY3RlZEFjY2Vzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN0cmljdGVkQWNjZXNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUdwRSxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLG1FQUE0RTtBQUM1RSw4Q0FBOEM7QUFDOUMsZ0NBQStCO0FBQy9CLDhEQUE0RDtBQUM1RCxrREFBb0Q7QUFTcEQsSUFBYSx5QkFBeUI7SUFFbEMsbUNBQW9CLE1BQXlCLEVBQ3JDLFdBQStCLEVBQVMsWUFBeUIsRUFDakUsaUJBQW1DLEVBQ25DLEtBQXVCLEVBQ3ZCLElBQVUsRUFDWCxRQUFpQjtRQUxKLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ2pFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNYLGFBQVEsR0FBUixRQUFRLENBQVM7UUFOakIsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQVFyQixDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUNJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsK0NBQStDLENBQUM7UUFDcEUsQ0FBQztJQUNMLENBQUM7SUFFRCxnREFBWSxHQUFaO1FBQUEsaUJBcUNDO1FBcENDLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRU4sb0lBQW9JO1FBQ3BJLG1DQUFtQztRQUNuQyx1QkFBdUI7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDTCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtZQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QixFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDOUgsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsNEJBQTRCLENBQUMsRUFBRTtvQkFDOUQsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtvQkFDbEUsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILENBQUM7SUFFRCw4Q0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMENBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQS9ERCxJQStEQztBQS9EWSx5QkFBeUI7SUFQckMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO0tBRXhDLENBQUM7cUNBSThCLDJCQUFpQjtRQUN4Qiw0QkFBa0IsRUFBdUIsMEJBQVc7UUFDOUMseUJBQWdCO1FBQzVCLHVCQUFnQjtRQUNqQixXQUFJO1FBQ0QsZ0JBQU87R0FQZix5QkFBeUIsQ0ErRHJDO0FBL0RZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBIb21lU2VydmljZSB9IGZyb20gXCIuLi8uLi9wYWdlcy9ob21lL2hvbWUuc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzdHJpY3RlZEFjY2Vzcy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3Jlc3RyaWN0ZWRBY2Nlc3MuY3NzXCJdLFxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN0cmljdGVkQWNjZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyBhdXRoSW5mbyA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxyXG4gICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwdWJsaWMgX2hvbWVTZXJ2aWNlOiBIb21lU2VydmljZSxcclxuICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdXRoZW50aWNhdGUoKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3BlcnNvbmFsX2luZm9cIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy5fZ2xvYmFscy51c2VyX2lkZW50aXR5XSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7ICAgICBcclxuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzX2F1dGhfY2FuY2VsbGVkKSB7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgaW5mbyA9IHRoaXMuX2hvbWVTZXJ2aWNlLmdldEF1dGhJbmZvKCk7XHJcbiAgICAgIHRoaXMuYXV0aEluZm8gPSBpbmZvO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgbGV0IGluZm8gPSB0aGlzLl9ob21lU2VydmljZS5nZXROZXdVc2VyQXV0aEluZm8oKTtcclxuICAgICAgdGhpcy5hdXRoSW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRoSW5mby5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlID0gaXRlbS51c2VyU3RhdGU7XHJcbiAgICAgIGlmIChpdGVtLmZpcnN0TmFtZSA9PT0gXCJcIiB8fCBpdGVtLmZpcnN0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMuX2dsb2JhbHMucmVnaXN0cmF0aW9uX21vZGUsIHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eV0sIHtcclxuICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGl0ZW0ubWVtYmVySWQgPT09IFwiXCIgfHwgaXRlbS5tZW1iZXJJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9tZW1iZXJfaW5mb1wiXSwge1xyXG4gICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaXRlbS5zc24gPT09IFwiXCIgfHwgaXRlbS5zc24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vdmVyaWZ5X2lkZW50aXR5XCJdLCB7XHJcbiAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgXHJcbiAgICB9XHJcblxyXG4gICAgbWF5QmVMYXRlcigpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgIH1cclxufSJdfQ==