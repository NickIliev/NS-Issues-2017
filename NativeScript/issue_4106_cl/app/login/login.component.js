"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var color_1 = require("color");
var connectivity_1 = require("connectivity");
var animation_1 = require("ui/animation");
var page_1 = require("ui/page");
var common_1 = require("@angular/common");
var shared_1 = require("../shared");
var router_2 = require("nativescript-angular/router");
var application_settings_1 = require("application-settings");
var core_2 = require("@ngx-translate/core");
var LoginComponent = (function () {
    function LoginComponent(router, userService, hieberService, routerExtensions, translate, page, location) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        this.hieberService = hieberService;
        this.routerExtensions = routerExtensions;
        this.translate = translate;
        this.page = page;
        this.location = location;
        this.isLoggingIn = true;
        this.isAuthenticating = false;
        this.user = new shared_1.User();
        translate.get('HOME.login_error_dialog', { value: '' }).subscribe(function (res) {
            _this.login_error_dialog = res;
            //=> 'hello world'
        });
    }
    LoginComponent.prototype.goBack = function () {
        this.location.back();
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.page.getViewById("email").ios.inputAccessoryView = UIView.alloc().init();
        this.page.getViewById("pwd").ios.inputAccessoryView = UIView.alloc().init();
    };
    // focusPassword() {
    //   this.password.nativeElement.focus();
    // }
    LoginComponent.prototype.submit = function () {
        this.isAuthenticating = true;
        this.login();
    };
    /** Login Web API call and response Handaling  */
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            this.isAuthenticating = false;
            return;
        }
        this.userService.login(this.user)
            .subscribe(function () {
            _this.getCurrentUser();
        }, function (error) {
            _this.user.password = "";
            _this.isAuthenticating = false;
        });
    };
    LoginComponent.prototype.openForgotPasswordDialog = function () {
        this.translate.get('HOME.forgot_password_dialog', { value: '' }).subscribe(function (res) {
            shared_1.alert(res);
            //=> 'hello world'
        });
    };
    LoginComponent.prototype.getCurrentUser = function () {
        var _this = this;
        this.isAuthenticating = true;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            this.isAuthenticating = false;
            return;
        }
        this.hieberService.currentUserDetail().subscribe((function (data) {
            _this.isAuthenticating = false;
            application_settings_1.setNumber("userID", data.UserID);
            application_settings_1.setString("userName", data.Name);
            application_settings_1.setString("userProfilePicture", data.Picture.File);
            //  setString("userDetails",data.json());
            _this.routerExtensions.navigate(["/main-menu"], {
                clearHistory: true,
                transition: {
                    name: "slideLeft",
                    duration: 200,
                    curve: "linear"
                }
            });
        }), function (error) {
            _this.isAuthenticating = false;
            _this.user.password = "";
            _this.translate.get('HOME.login_error_dialog', { value: '' }).subscribe(function (res) {
                shared_1.alert(res);
                //=> 'hello world'
            });
        });
    };
    LoginComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    LoginComponent.prototype.showMainContent = function () {
        var initialContainer = this.initialContainer.nativeElement;
        var mainContainer = this.mainContainer.nativeElement;
        var formControls = this.formControls.nativeElement;
        var animations = [];
        // Fade out the initial content over one half second
        initialContainer.animate({
            opacity: 0,
            duration: 500
        }).then(function () {
            // After the animation completes, hide the initial container and
            // show the main container and logo. The main container and logo will
            // not immediately appear because their opacity is set to 0 in CSS.
            initialContainer.style.visibility = "collapse";
            mainContainer.style.visibility = "visible";
            // Fade in the main container and logo over one half second.
            animations.push({ target: mainContainer, opacity: 1, duration: 500 });
            // Slide up the form controls and sign up container.
            animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });
            // Kick off the animation queue
            new animation_1.Animation(animations, false).play();
        });
    };
    LoginComponent.prototype.setTextFieldColors = function () {
        var emailTextField = this.email.nativeElement;
        var passwordTextField = this.password.nativeElement;
        var mainTextColor = new color_1.Color(this.isLoggingIn ? "black" : "#C4AFB4");
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;
        var hintColor = new color_1.Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
        shared_1.setHintColor({ view: emailTextField, color: hintColor });
        shared_1.setHintColor({ view: passwordTextField, color: hintColor });
    };
    return LoginComponent;
}());
__decorate([
    core_1.ViewChild("initialContainer"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "initialContainer", void 0);
__decorate([
    core_1.ViewChild("mainContainer"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "mainContainer", void 0);
__decorate([
    core_1.ViewChild("formControls"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "formControls", void 0);
__decorate([
    core_1.ViewChild("email"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "email", void 0);
__decorate([
    core_1.ViewChild("password"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "password", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: "gr-login",
        templateUrl: "login/login.component.html",
        styleUrls: ["login/login-common.css", "login/login.component.css"],
    }),
    __metadata("design:paramtypes", [router_1.Router,
        shared_1.LoginService, shared_1.HieberService, router_2.RouterExtensions, core_2.TranslateService,
        page_1.Page, common_1.Location])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QywrQkFBOEI7QUFDOUIsNkNBQWlFO0FBQ2pFLDBDQUF5QztBQUd6QyxnQ0FBK0I7QUFFL0IsMENBQTJDO0FBQzNDLG9DQUFtRjtBQUNuRixzREFBK0Q7QUFDL0QsNkRBQWtGO0FBQ2xGLDRDQUF1RDtBQVF2RCxJQUFhLGNBQWM7SUFhekIsd0JBQW9CLE1BQWMsRUFDeEIsV0FBeUIsRUFBVSxhQUE0QixFQUFVLGdCQUFrQyxFQUFVLFNBQTJCLEVBQ2hKLElBQVUsRUFBVSxRQUFrQjtRQUZoRCxpQkFTQztRQVRtQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDaEosU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFiaEQsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBYXZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFJLEVBQUUsQ0FBQztRQUV2QixTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBVztZQUM1RSxLQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1lBQzlCLGtCQUFrQjtRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwrQkFBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFD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UyxDQUFDLGtCQUFrQixDQUFDOzhCQUFtQixpQkFBVTt3REFBQztBQUNoQztJQUEzQixnQkFBUyxDQUFDLGVBQWUsQ0FBQzs4QkFBZ0IsaUJBQVU7cURBQUM7QUFDM0I7SUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7OEJBQWUsaUJBQVU7b0RBQUM7QUFDaEM7SUFBbkIsZ0JBQVMsQ0FBQyxPQUFPLENBQUM7OEJBQVEsaUJBQVU7NkNBQUM7QUFDZjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBVyxpQkFBVTtnREFBQztBQVRqQyxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDO0tBQ25FLENBQUM7cUNBYzRCLGVBQU07UUFDWCxxQkFBWSxFQUF5QixzQkFBYSxFQUE0Qix5QkFBZ0IsRUFBcUIsdUJBQWdCO1FBQzFJLFdBQUksRUFBb0IsaUJBQVE7R0FmckMsY0FBYyxDQXdKMUI7QUF4Slksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwidWkvYW5pbWF0aW9uXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGFsZXJ0LCBzZXRIaW50Q29sb3IsIExvZ2luU2VydmljZSwgSGllYmVyU2VydmljZSwgVXNlciB9IGZyb20gXCIuLi9zaGFyZWRcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZ2V0U3RyaW5nLCBnZXROdW1iZXIsIHNldE51bWJlciwgc2V0U3RyaW5nIH0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJnci1sb2dpblwiLFxuICB0ZW1wbGF0ZVVybDogXCJsb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcImxvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJsb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXI6IFVzZXI7XG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcbiAgaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoXCJpbml0aWFsQ29udGFpbmVyXCIpIGluaXRpYWxDb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJtYWluQ29udGFpbmVyXCIpIG1haW5Db250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJmb3JtQ29udHJvbHNcIikgZm9ybUNvbnRyb2xzOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiZW1haWxcIikgZW1haWw6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJwYXNzd29yZFwiKSBwYXNzd29yZDogRWxlbWVudFJlZjtcblxuICBmb3Jnb3RfcGFzc3dvcmRfZGlhbG9nOiBzdHJpbmc7XG4gIGxvZ2luX2Vycm9yX2RpYWxvZzogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogTG9naW5TZXJ2aWNlLCBwcml2YXRlIGhpZWJlclNlcnZpY2U6IEhpZWJlclNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG5cbiAgICB0cmFuc2xhdGUuZ2V0KCdIT01FLmxvZ2luX2Vycm9yX2RpYWxvZycsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMubG9naW5fZXJyb3JfZGlhbG9nID0gcmVzO1xuICAgICAgLy89PiAnaGVsbG8gd29ybGQnXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ29CYWNrKCkge1xuICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cbiAgICB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJlbWFpbFwiKS5pb3MuaW5wdXRBY2Nlc3NvcnlWaWV3ID0gVUlWaWV3LmFsbG9jKCkuaW5pdCgpO1xuICAgIHRoaXMucGFnZS5nZXRWaWV3QnlJZChcInB3ZFwiKS5pb3MuaW5wdXRBY2Nlc3NvcnlWaWV3ID0gVUlWaWV3LmFsbG9jKCkuaW5pdCgpO1xuICB9XG5cbiAgLy8gZm9jdXNQYXNzd29yZCgpIHtcbiAgLy8gICB0aGlzLnBhc3N3b3JkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgLy8gfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMubG9naW4oKTtcbiAgfVxuXG5cbiAgLyoqIExvZ2luIFdlYiBBUEkgY2FsbCBhbmQgcmVzcG9uc2UgSGFuZGFsaW5nICAqL1xuICBsb2dpbigpIHtcbiAgICBpZiAoZ2V0Q29ubmVjdGlvblR5cGUoKSA9PT0gY29ubmVjdGlvblR5cGUubm9uZSkge1xuICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudXNlclNlcnZpY2UubG9naW4odGhpcy51c2VyKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50VXNlcigpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSBcIlwiO1xuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIG9wZW5Gb3Jnb3RQYXNzd29yZERpYWxvZygpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUuZm9yZ290X3Bhc3N3b3JkX2RpYWxvZycsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICAvLz0+ICdoZWxsbyB3b3JsZCdcbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50VXNlcigpIHtcbiAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSB0cnVlO1xuICAgIGlmIChnZXRDb25uZWN0aW9uVHlwZSgpID09PSBjb25uZWN0aW9uVHlwZS5ub25lKSB7XG4gICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oaWViZXJTZXJ2aWNlLmN1cnJlbnRVc2VyRGV0YWlsKCkuc3Vic2NyaWJlKFxuICAgICAgKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgc2V0TnVtYmVyKFwidXNlcklEXCIsIGRhdGEuVXNlcklEKTtcbiAgICAgICAgc2V0U3RyaW5nKFwidXNlck5hbWVcIiwgZGF0YS5OYW1lKTtcbiAgICAgICAgc2V0U3RyaW5nKFwidXNlclByb2ZpbGVQaWN0dXJlXCIsIGRhdGEuUGljdHVyZS5GaWxlKTtcbiAgICAgICAgLy8gIHNldFN0cmluZyhcInVzZXJEZXRhaWxzXCIsZGF0YS5qc29uKCkpO1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL21haW4tbWVudVwiXSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVMZWZ0XCIsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgIGN1cnZlOiBcImxpbmVhclwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51c2VyLnBhc3N3b3JkID0gXCJcIjtcblxuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ0hPTUUubG9naW5fZXJyb3JfZGlhbG9nJywgeyB2YWx1ZTogJycgfSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGFsZXJ0KHJlcylcbiAgICAgICAgICAvLz0+ICdoZWxsbyB3b3JsZCdcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xuICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XG4gICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxuICAgICAgZHVyYXRpb246IDEwMDAwXG4gICAgfSk7XG4gIH1cblxuICBzaG93TWFpbkNvbnRlbnQoKSB7XG4gICAgbGV0IGluaXRpYWxDb250YWluZXIgPSA8Vmlldz50aGlzLmluaXRpYWxDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgbWFpbkNvbnRhaW5lciA9IDxWaWV3PnRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBmb3JtQ29udHJvbHMgPSA8Vmlldz50aGlzLmZvcm1Db250cm9scy5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBhbmltYXRpb25zID0gW107XG4gICAgLy8gRmFkZSBvdXQgdGhlIGluaXRpYWwgY29udGVudCBvdmVyIG9uZSBoYWxmIHNlY29uZFxuICAgIGluaXRpYWxDb250YWluZXIuYW5pbWF0ZSh7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgZHVyYXRpb246IDUwMFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgLy8gQWZ0ZXIgdGhlIGFuaW1hdGlvbiBjb21wbGV0ZXMsIGhpZGUgdGhlIGluaXRpYWwgY29udGFpbmVyIGFuZFxuICAgICAgLy8gc2hvdyB0aGUgbWFpbiBjb250YWluZXIgYW5kIGxvZ28uIFRoZSBtYWluIGNvbnRhaW5lciBhbmQgbG9nbyB3aWxsXG4gICAgICAvLyBub3QgaW1tZWRpYXRlbHkgYXBwZWFyIGJlY2F1c2UgdGhlaXIgb3BhY2l0eSBpcyBzZXQgdG8gMCBpbiBDU1MuXG4gICAgICBpbml0aWFsQ29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XG4gICAgICBtYWluQ29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuICAgICAgLy8gRmFkZSBpbiB0aGUgbWFpbiBjb250YWluZXIgYW5kIGxvZ28gb3ZlciBvbmUgaGFsZiBzZWNvbmQuXG4gICAgICBhbmltYXRpb25zLnB1c2goeyB0YXJnZXQ6IG1haW5Db250YWluZXIsIG9wYWNpdHk6IDEsIGR1cmF0aW9uOiA1MDAgfSk7XG5cbiAgICAgIC8vIFNsaWRlIHVwIHRoZSBmb3JtIGNvbnRyb2xzIGFuZCBzaWduIHVwIGNvbnRhaW5lci5cbiAgICAgIGFuaW1hdGlvbnMucHVzaCh7IHRhcmdldDogZm9ybUNvbnRyb2xzLCB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LCBvcGFjaXR5OiAxLCBkZWxheTogNjUwLCBkdXJhdGlvbjogMTUwIH0pO1xuXG4gICAgICAvLyBLaWNrIG9mZiB0aGUgYW5pbWF0aW9uIHF1ZXVlXG4gICAgICBuZXcgQW5pbWF0aW9uKGFuaW1hdGlvbnMsIGZhbHNlKS5wbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRUZXh0RmllbGRDb2xvcnMoKSB7XG4gICAgbGV0IGVtYWlsVGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLmVtYWlsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHBhc3N3b3JkVGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLnBhc3N3b3JkLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBsZXQgbWFpblRleHRDb2xvciA9IG5ldyBDb2xvcih0aGlzLmlzTG9nZ2luZ0luID8gXCJibGFja1wiIDogXCIjQzRBRkI0XCIpO1xuICAgIGVtYWlsVGV4dEZpZWxkLmNvbG9yID0gbWFpblRleHRDb2xvcjtcbiAgICBwYXNzd29yZFRleHRGaWVsZC5jb2xvciA9IG1haW5UZXh0Q29sb3I7XG5cbiAgICBsZXQgaGludENvbG9yID0gbmV3IENvbG9yKHRoaXMuaXNMb2dnaW5nSW4gPyBcIiNBQ0E2QTdcIiA6IFwiI0M0QUZCNFwiKTtcbiAgICBzZXRIaW50Q29sb3IoeyB2aWV3OiBlbWFpbFRleHRGaWVsZCwgY29sb3I6IGhpbnRDb2xvciB9KTtcbiAgICBzZXRIaW50Q29sb3IoeyB2aWV3OiBwYXNzd29yZFRleHRGaWVsZCwgY29sb3I6IGhpbnRDb2xvciB9KTtcbiAgfVxufVxuIl19