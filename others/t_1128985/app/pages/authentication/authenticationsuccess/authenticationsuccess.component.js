"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var formValidation_service_1 = require("../../../shared/services/formValidation.service");
var authentication_service_1 = require("../authentication.service");
var global_1 = require("../../../shared/global");
var appSettingsModule = require("application-settings");
var appSettings = require("application-settings");
var app = require("tns-core-modules/application");
var page_1 = require("ui/page");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var AuthenticationSuccessComponent = (function () {
    function AuthenticationSuccessComponent(formValidationService, page, _routerExtensions, authService, _globals, _router) {
        this.formValidationService = formValidationService;
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this.authService = authService;
        this._globals = _globals;
        this._router = _router;
        this.title = "Authentication";
        this.isUserNameEmpty = false;
        this.isUserNameInvalid = false;
        this.isPasswordEmpty = false;
        this.isPasswordInvalid = false;
    }
    AuthenticationSuccessComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.signInType = this.transform(this.authService.user_registration_type);
        this.signInTypeValue = this.transform(this.authService.user_name);
    };
    // Capitalize the first letter of the string
    AuthenticationSuccessComponent.prototype.transform = function (value) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    };
    // Validating all fields
    AuthenticationSuccessComponent.prototype.validateUserInfo = function () {
        var isError = false;
        this.isUserNameEmpty = !this.formValidationService.fieldFilledValidator(this.username);
        this.isUserNameInvalid = !this.formValidationService.usernameValidator(this.username);
        this.isPasswordEmpty = !this.formValidationService.fieldFilledValidator(this.password);
        this.isPasswordInvalid = !this.formValidationService.passwordPatternValidator(this.password);
        if (this.isUserNameEmpty || this.isUserNameInvalid || this.isPasswordEmpty || this.isPasswordInvalid) {
            isError = true;
        }
        return isError;
    };
    AuthenticationSuccessComponent.prototype.continueMyBlue = function () {
        loader.show();
        this._routerExtensions.navigate(["/login"], {
            animated: false
        });
        loader.hide();
    };
    AuthenticationSuccessComponent.prototype.continueToMyBluePage = function () {
        loader.show();
        appSettingsModule.setString("firstName", "");
        appSettingsModule.setString("lastName", "");
        appSettingsModule.setString("dob", "");
        appSettingsModule.setString("emailAddress", "");
        appSettingsModule.setString("mobileNum", "");
        // Forward to my blue main page
        this._globals.isLoggedIn = true;
        this._globals.isUnauthenticated = false;
        this._globals.isanonymous = false;
        this._globals.isAuthenticationSuccess = true;
        this._globals.changeLogin();
        appSettings.setBoolean("isAuthenticated", true);
        appSettings.setNumber("isFirstTimeOpened", 1);
        this._globals.user_updatedusername = "";
        this._globals.user_updatedpassword = "";
        appSettingsModule.setString("verify-unauthenticate", "fully-authenticated");
        this._globals.user_state = "ANV";
        this._routerExtensions.navigate(["/login"], {
            animated: false
        });
        loader.hide();
        // this._routerExtensions.navigate(["/home/signedHome"], {
        //     animated: false
        //   });
    };
    AuthenticationSuccessComponent.prototype.updateUserInformation = function () {
        if (!this.validateUserInfo()) {
            //  Call the backend API Service after the UI fields validation
            this._globals.user_updatedusername = this.username;
            this._globals.user_updatedpassword = this.password;
            this.close();
        }
    };
    // To close the modal-window
    AuthenticationSuccessComponent.prototype.close = function () {
        this.continueToMyBluePage();
    };
    return AuthenticationSuccessComponent;
}());
AuthenticationSuccessComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./authenticationsuccess.component.html",
        styleUrls: ["../authentication.css"],
    }),
    __metadata("design:paramtypes", [formValidation_service_1.FormValidationService, page_1.Page, router_2.RouterExtensions, authentication_service_1.AuthenticationService, global_1.Globals, router_1.Router])
], AuthenticationSuccessComponent);
exports.AuthenticationSuccessComponent = AuthenticationSuccessComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb25zdWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGhlbnRpY2F0aW9uc3VjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsMENBQXlDO0FBRXpDLHNEQUErRDtBQUUvRCwwRkFBd0Y7QUFDeEYsb0VBQWtFO0FBQ2xFLGlEQUFpRDtBQUVqRCx3REFBMEQ7QUFDMUQsa0RBQW9EO0FBQ3BELGtEQUFvRDtBQUNwRCxnQ0FBK0I7QUFDL0IsaUZBQWdFO0FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVFwQyxJQUFhLDhCQUE4QjtJQVl6Qyx3Q0FBNEIscUJBQTRDLEVBQVUsSUFBVSxFQUFVLGlCQUFtQyxFQUFVLFdBQWtDLEVBQVUsUUFBaUIsRUFBVSxPQUFlO1FBQTdNLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVM7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBWHpPLFVBQUssR0FBVyxnQkFBZ0IsQ0FBQztRQUcxQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO0lBTTFDLENBQUM7SUFDRCxpREFBUSxHQUFSO1FBQ0UsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FB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QixXQUFJLEVBQTZCLHlCQUFnQixFQUF1Qiw4Q0FBcUIsRUFBb0IsZ0JBQU8sRUFBbUIsZUFBTTtHQVo5Tiw4QkFBOEIsQ0E2RjFDO0FBN0ZZLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9mb3JtVmFsaWRhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5cbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzTW9kdWxlIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG52YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiBcIi4vYXV0aGVudGljYXRpb25zdWNjZXNzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi4vYXV0aGVudGljYXRpb24uY3NzXCJdLFxuXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU3VjY2Vzc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRpdGxlOiBzdHJpbmcgPSBcIkF1dGhlbnRpY2F0aW9uXCI7XG4gIHB1YmxpYyBzaWduSW5UeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBzaWduSW5UeXBlVmFsdWU6IHN0cmluZztcbiAgcHVibGljIGlzVXNlck5hbWVFbXB0eTogQm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNVc2VyTmFtZUludmFsaWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzUGFzc3dvcmRFbXB0eTogQm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNQYXNzd29yZEludmFsaWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nO1xuIFxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggcHJpdmF0ZSBmb3JtVmFsaWRhdGlvblNlcnZpY2U6IEZvcm1WYWxpZGF0aW9uU2VydmljZSwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsIHByaXZhdGUgX2dsb2JhbHM6IEdsb2JhbHMsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICB9XG4gICAgdGhpcy5zaWduSW5UeXBlID0gdGhpcy50cmFuc2Zvcm0odGhpcy5hdXRoU2VydmljZS51c2VyX3JlZ2lzdHJhdGlvbl90eXBlKTtcbiAgICB0aGlzLnNpZ25JblR5cGVWYWx1ZSA9IHRoaXMudHJhbnNmb3JtKHRoaXMuYXV0aFNlcnZpY2UudXNlcl9uYW1lKTtcbiAgfVxuICAvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgdGhlIHN0cmluZ1xuICBwdWJsaWMgdHJhbnNmb3JtKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgLy8gVmFsaWRhdGluZyBhbGwgZmllbGRzXG4gIHB1YmxpYyB2YWxpZGF0ZVVzZXJJbmZvKCk6IEJvb2xlYW4ge1xuICAgIGxldCBpc0Vycm9yOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgICB0aGlzLmlzVXNlck5hbWVFbXB0eSA9ICF0aGlzLmZvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcih0aGlzLnVzZXJuYW1lKTtcbiAgICB0aGlzLmlzVXNlck5hbWVJbnZhbGlkID0gIXRoaXMuZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnVzZXJuYW1lVmFsaWRhdG9yKHRoaXMudXNlcm5hbWUpO1xuICAgIHRoaXMuaXNQYXNzd29yZEVtcHR5ID0gIXRoaXMuZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKHRoaXMucGFzc3dvcmQpO1xuICAgIHRoaXMuaXNQYXNzd29yZEludmFsaWQgPSAhdGhpcy5mb3JtVmFsaWRhdGlvblNlcnZpY2UucGFzc3dvcmRQYXR0ZXJuVmFsaWRhdG9yKHRoaXMucGFzc3dvcmQpO1xuICAgIGlmICh0aGlzLmlzVXNlck5hbWVFbXB0eSB8fCB0aGlzLmlzVXNlck5hbWVJbnZhbGlkIHx8IHRoaXMuaXNQYXNzd29yZEVtcHR5IHx8IHRoaXMuaXNQYXNzd29yZEludmFsaWQpIHtcbiAgICAgIGlzRXJyb3IgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNFcnJvcjtcbiAgfVxuIHB1YmxpYyBjb250aW51ZU15Qmx1ZSgpe1xuICAgbG9hZGVyLnNob3coKTtcbiAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgbG9hZGVyLmhpZGUoKTtcbiAgfVxuICBwdWJsaWMgY29udGludWVUb015Qmx1ZVBhZ2UoKSB7XG4gICAgbG9hZGVyLnNob3coKTtcbiAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJmaXJzdE5hbWVcIiwgXCJcIik7XG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwibGFzdE5hbWVcIiwgXCJcIik7XG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwiZG9iXCIsIFwiXCIpO1xuICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImVtYWlsQWRkcmVzc1wiLCBcIlwiKTtcbiAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJtb2JpbGVOdW1cIiwgXCJcIik7XG4gICAgLy8gRm9yd2FyZCB0byBteSBibHVlIG1haW4gcGFnZVxuICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IHRydWU7XG4gICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcbiAgICB0aGlzLl9nbG9iYWxzLmlzQXV0aGVudGljYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZUxvZ2luKCk7XG4gICAgYXBwU2V0dGluZ3Muc2V0Qm9vbGVhbihcImlzQXV0aGVudGljYXRlZFwiLCB0cnVlKTtcbiAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJpc0ZpcnN0VGltZU9wZW5lZFwiLCAxKTtcbiAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXBkYXRlZHVzZXJuYW1lID0gXCJcIjtcbiAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXBkYXRlZHBhc3N3b3JkID0gXCJcIjtcbiAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJ2ZXJpZnktdW5hdXRoZW50aWNhdGVcIiwgXCJmdWxseS1hdXRoZW50aWNhdGVkXCIpO1xuICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZT1cIkFOVlwiO1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgIGxvYWRlci5oaWRlKCk7XG4gICAgLy8gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgLy8gICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgIC8vICAgfSk7XG5cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVVc2VySW5mb3JtYXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlVXNlckluZm8oKSkge1xuICAgICAgLy8gIENhbGwgdGhlIGJhY2tlbmQgQVBJIFNlcnZpY2UgYWZ0ZXIgdGhlIFVJIGZpZWxkcyB2YWxpZGF0aW9uXG4gICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXBkYXRlZHVzZXJuYW1lID0gdGhpcy51c2VybmFtZTtcbiAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl91cGRhdGVkcGFzc3dvcmQgPSB0aGlzLnBhc3N3b3JkO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuXG4gICAgfVxuICB9XG5cbiAgLy8gVG8gY2xvc2UgdGhlIG1vZGFsLXdpbmRvd1xuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy5jb250aW51ZVRvTXlCbHVlUGFnZSgpO1xuICAgIFxuXG4gIH1cbn1cbiJdfQ==