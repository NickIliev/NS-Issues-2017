"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var appSettings = require("application-settings");
var global_1 = require("../../shared/global");
var login_service_1 = require("./login.service");
var login_model_1 = require("./login.model");
var observable_1 = require("data/observable");
var nativescript_fingerprint_auth_1 = require("nativescript-fingerprint-auth");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var formValidation_service_1 = require("../../shared/services/formValidation.service");
var app = require("tns-core-modules/application");
var dialogs = require("ui/dialogs");
var application_settings_1 = require("application-settings");
var connectivity = require("connectivity");
var page_1 = require("ui/page");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(_routerExtensions, _globals, renderer, _loginService, _formValidationService, page) {
        var _this = _super.call(this) || this;
        _this._routerExtensions = _routerExtensions;
        _this._globals = _globals;
        _this.renderer = renderer;
        _this._loginService = _loginService;
        _this._formValidationService = _formValidationService;
        _this.page = page;
        _this.isremember = true;
        _this.isEnable = false;
        _this.secureStorage = new nativescript_secure_storage_1.SecureStorage();
        _this.touchIDInteraction = true;
        _this.loginUser = new login_model_1.LoginUser();
        _this.isUserNameFilled = true;
        _this.isPasswordFilled = true;
        _this.lblPasswordReq = true;
        _this.lblUserNameReq = true;
        _this.touchID = false;
        _this.isnotify = false;
        _this.isuserChange = false;
        _this.touchID_src = "~/images/icon/touchID@2x.png";
        _this.showFlag = 0;
        _this.hideFlag = 0;
        _this.touchIDGrid = "touchIDGrid";
        _this.isTouchIDdisableNotificationclose = true;
        _this.lblPassword = "*Required Field";
        _this.isLoginApi = false;
        _this.signInInteraction = true;
        _this.pageStartTime = 0;
        _this.pageEndTime = 0;
        _this.pageTimeDifference = 0;
        _this.pageStartTime = new Date().getTime();
        _this.fingerprintAuth = new nativescript_fingerprint_auth_1.FingerprintAuth();
        _this.isUserNameFilled = true;
        _this.isPasswordFilled = true;
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.title = "Sign In";
        this.isUserNameFilled = true;
        this.isPasswordFilled = true;
        this.isTouchIDdisableNotification = application_settings_1.getBoolean("isTouchIDdisableNotification", false);
        this.isnotify = this._loginService.isnotify;
        this.isEnablenotify = this._loginService.isEnablenotify;
        this.isuserChange = this._loginService.isuserChange;
        this.userName = "";
        this.password = "";
        this.isLoginApi = false;
        if (this.isnotify) {
            // this.isremember = false;
            this.rememberSwitch.nativeElement.checked = !this.isnotify;
        }
        this.enableTouchIDSwitch.nativeElement.checked = appSettings.getBoolean("isEnableTouchID", this.enableTouchIDSwitch.nativeElement.checked);
        if (this.enableTouchIDSwitch.nativeElement.checked) {
            this.touchID = true;
            if (this.isTouchIDdisableNotification) {
                this.touchIDGrid = "touchIDDisable";
                this.touchID_src = "~/images/icon/touch_disabled.png";
                this.touchIDInteraction = false;
                this._globals.isShowTouchID = false;
            }
            if (this._globals.isShowTouchID) {
                this.doVerifyFingerprintWithCustomFallback();
            }
            else {
                this._globals.isShowTouchID = true;
            }
        }
        else if (!this.enableTouchIDSwitch.nativeElement.checked) {
            if (this.touchIDStack) {
                this.touchIDGrid = "touchIDDisable";
                this.touchID_src = "~/images/icon/touch_disabled.png";
                this.touchIDInteraction = false;
            }
        }
        this.rememberSwitch.nativeElement.checked = appSettings.getBoolean("isRememberMe", this.rememberSwitch.nativeElement.checked);
        if (this.rememberSwitch.nativeElement.checked) {
            this._loginService.isEnable = this.enableTouchIDSwitch.nativeElement.checked;
        }
        // User Name from storage
        if (appSettings.getBoolean("isFirstInstall")) {
            appSettings.setBoolean("isFirstInstall", false);
            this.secureStorage.remove({
                key: "UserName",
            });
        }
        else {
            this.secureStorage.get({
                key: "UserName"
            }).then(function (value) {
                if (value) {
                    _this.userName = value;
                    _this.isuserChange = true;
                }
                else {
                    _this.userName = "";
                    _this.password = "";
                }
            });
        }
        if (appSettings.getString("userName") !== undefined) {
            this.userName = appSettings.getString("userName");
            this.isUserNameFilled = true;
        }
        if (appSettings.getString("password") !== undefined) {
            // this.password = appSettings .getString("password");
            this.isPasswordFilled = true;
        }
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        // console.log(this.touchIDStack)
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    LoginComponent.prototype.Login = function (userName, password) {
        var _this = this;
        this.isLoginApi = false;
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                this._globals.showToastMessage("No internet available, please connect!!", "longer");
                return;
            default:
                break;
        }
        if (this.rememberSwitch.nativeElement.checked) {
            if (this.userName !== undefined) {
                appSettings.setString("userName", this.userName);
                this.isUserNameFilled = true;
            }
            if (this.password !== undefined) {
                //  appSettings .setString("password", this.password);
                this.isPasswordFilled = true;
            }
        }
        else {
            if (this.userName !== undefined) {
                appSettings.remove("userName");
            }
            if (this.password !== undefined) {
                appSettings.remove("password");
            }
        }
        if (this.userName === undefined || this.userName === "") {
            this.isUserNameFilled = false;
            var userNametxt = this.userNametxt.nativeElement;
            userNametxt.focus();
        }
        else {
            this.isUserNameFilled = true;
        }
        if (this.password === undefined || this.password === "") {
            this.isPasswordFilled = false;
            if (this.isUserNameFilled) {
                this.lblPassword = "*Required Field";
                var passwordtxt = this.passwordtxt.nativeElement;
                passwordtxt.focus();
            }
        }
        else {
            this.isPasswordFilled = true;
            this.lblPassword = "*Required Field";
        }
        if (this.isPasswordFilled && this.isUserNameFilled) {
            loader.show();
            // this.signInInteraction = false;
            // var params = "{"username":"user01" , "password":"password01"}"
            this.loginUser.username = this.userName;
            this.loginUser.password = this.password;
            var params = this.loginUser;
            this._loginService.loginUser(JSON.stringify(this.loginUser))
                .subscribe(function (data) {
                //    this.signInInteraction = true;
                loader.hide();
                _this.navHome();
            }, function (error) {
                //   this.signInInteraction = true;
                _this.isLoginApi = true;
                loader.hide();
            });
            // this.navHome();
        }
        if (this.isPasswordFilled) {
            this.lblPasswordReq = true;
        }
        if (this.isUserNameFilled) {
            this.lblUserNameReq = true;
        }
    };
    LoginComponent.prototype.Delete = function () {
        appSettings.remove("userName");
        appSettings.remove("password");
    };
    LoginComponent.prototype.ForgotPassword = function () {
        this.isLoginApi = false;
        this.userName = "";
        this.password = "";
        this.dismissKeyBoard();
        this._routerExtensions.navigate(["/happy"], {
            animated: false
        });
        this._loginService.isnotify = false;
        this._loginService.isuserChange = false;
    };
    LoginComponent.prototype.goBack = function () {
        this.dismissKeyBoard();
        if (this._globals.isLoggedIn) {
            this._routerExtensions.back();
        }
        else {
            this._routerExtensions.navigate(["/home/anonymousHome"], {
                animated: false
            });
        }
        this.isLoginApi = false;
        this._loginService.isnotify = false;
        this._loginService.isuserChange = false;
    };
    LoginComponent.prototype.contactMemberNav = function () {
        this.dismissKeyBoard();
        this.isLoginApi = false;
        this._routerExtensions.navigate(["/contactUs"], {
            animated: false
        });
    };
    LoginComponent.prototype.toggleisremember = function (args) {
        var rememberSwitch = args.object;
        if (this.enableTouchIDSwitch.nativeElement.checked) {
            this.enableTouchIDSwitch.nativeElement.checked = rememberSwitch.checked;
        }
        else {
            //  this.rememberSwitch.nativeElement.checked = !this.rememberSwitch.nativeElement.checked;
        }
    };
    LoginComponent.prototype.toggleisEnable = function (args) {
        var _this = this;
        var enableSwitch = args.object;
        if (enableSwitch.checked) {
            this.fingerprintAuth.available().then(function (avail) {
                if (avail) {
                    if (!_this.touchID) {
                        dialogs.alert({
                            message: ("Touch ID will be enabled on your next sign in"),
                            okButtonText: "Ok"
                        });
                    }
                    _this.rememberSwitch.nativeElement.checked = enableSwitch.checked;
                }
                else {
                    dialogs.alert({
                        title: "Enable Touch ID Login",
                        message: ("The Touch ID login option is only available for devices with Touch ID enabled. Enabling this option allows for a quick login to My Blue using Touch ID authentication."),
                        okButtonText: "Ok"
                    });
                    enableSwitch.checked = false;
                    appSettings.setBoolean("isEnableTouchID", false);
                }
            }, function (error) {
                dialogs.alert({
                    title: "Enable Touch ID Login",
                    message: ("The Touch ID login option is only available for devices with Touch ID enabled. Enabling this option allows for a quick login to My Blue using Touch ID authentication."),
                    okButtonText: "Ok"
                });
                enableSwitch.checked = false;
                appSettings.setBoolean("isEnableTouchID", false);
            });
        }
        this._loginService.isEnable = enableSwitch.checked;
    };
    LoginComponent.prototype.doCheckAvailable = function () {
        this.fingerprintAuth.available().then(function (avail) {
            dialogs.alert({
                title: "Fingerprint scanner available?",
                message: avail ? "YES" : "NO",
                okButtonText: "OK"
            });
        });
    };
    LoginComponent.prototype.doCheckFingerprintsChanged = function () {
        this.fingerprintAuth.didFingerprintDatabaseChange().then(function (changed) {
            dialogs.alert({
                title: "Fingerprint DB changed?",
                message: changed ? "YES" : "NO",
                okButtonText: "OK"
            });
        });
    };
    LoginComponent.prototype.doVerifyFingerprintWithCustomFallback = function () {
        var _this = this;
        this.fingerprintAuth.verifyFingerprintWithCustomFallback({
            message: "Sign in with the online ID " + this.userName.substring(0, 3) + this.userName.substring(3).replace(/./g, "*"),
            fallbackMessage: "Password" // optional
        }).then(function () {
            _this.navHome();
        }, function (error) {
            if (app.android) {
                // do nothing
            }
            else if (app.ios) {
                if (error.code === -1) {
                    dialogs.alert({
                        title: "For security, Touch ID has been temporarily disabled",
                        message: ("Please sign in with your username and password. Touch ID will be re-enabled on your next sign in"),
                        okButtonText: "Ok"
                    }).then(function () {
                        _this.isTouchIDdisableNotification = true;
                        appSettings.setBoolean("isTouchIDdisableNotification", true);
                    });
                    _this.touchIDGrid = "touchIDDisable";
                    _this.touchIDInteraction = false;
                    _this.touchID_src = "~/images/icon/touch_disabled.png";
                }
                if (error.code === -8 || typeof (error.code) === "undefined") {
                    setTimeout(function () {
                        dialogs.alert({
                            title: "Touch ID is locked out",
                            message: ("please lock the device and unlock the device"),
                            okButtonText: "Ok"
                        }).then(function () {
                            // do nothing
                        });
                        _this.touchIDGrid = "touchIDDisable";
                        _this.touchIDInteraction = false;
                        _this.touchID_src = "~/images/icon/touch_disabled.png";
                    }, 500);
                }
            }
        });
    };
    LoginComponent.prototype.navHome = function () {
        var currentState = appSettings.getString("verify-unauthenticate");
        this.dismissKeyBoard();
        if (this.enableTouchIDSwitch.nativeElement.checked || this.rememberSwitch.nativeElement.checked) {
            this.secureStorage.set({
                key: "UserName",
                value: this.userName
            });
        }
        else {
            this.secureStorage.remove({
                key: "UserName",
            });
        }
        appSettings.setBoolean("isRememberMe", this.rememberSwitch.nativeElement.checked);
        appSettings.setBoolean("isEnableTouchID", this.enableTouchIDSwitch.nativeElement.checked);
        this._globals.changeLogin();
        this._loginService.isnotify = false;
        this._loginService.isuserChange = false;
        this.isTouchIDdisableNotification = false;
        this._globals.isanonymous = false;
        this.isLoginApi = false;
        /* this.userName = "";
        this.password = ""; */
        appSettings.setBoolean("isTouchIDdisableNotification", false);
        if (currentState == "un-auth") {
            //ramya
            this._globals.isLoggedIn = false;
            this._globals.isUnauthenticated = true;
            this._globals.isAuthCancelled = true;
            this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
                animated: false
            });
            // this._routerExtensions.navigate(["/home/signedHome"], {
            //   animated: false
            // });
        }
        else if (currentState == "auth-success") {
            this._routerExtensions.navigate(["/personal_info/authentication_success"], {
                animated: false
            });
        }
        else if (currentState == "cancel-auth") {
            this._globals.is_auth_cancelled = true;
            this._routerExtensions.navigate(["/home/signedHome"], {
                animated: false
            });
            // this._globals.isAuthCancelled=true;
            // this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
            //   animated: false
            // });
        }
        else if (currentState == "registered-un-auth" && this._globals.user_state == "RNV") {
            // Raghu    
            this._globals.isLoggedIn = false;
            this._globals.isUnauthenticated = true;
            this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
                animated: false
            });
        }
        else if (currentState == "goto-auth") {
            this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
                animated: false
            });
        }
        else {
            //Jai
            this._globals.isLoggedIn = true;
            this._globals.isUnauthenticated = false;
            this._routerExtensions.navigate(["/home/signedHome"], {
                animated: false
            });
            // this._routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.userName], {
            //   animated: false
            // });
        }
    };
    LoginComponent.prototype.changeUser = function () {
        this.dismissKeyBoard();
        this.isLoginApi = false;
        this._routerExtensions.navigate(["/login/changeUser"], {
            animated: false
        });
        this._loginService.isuserChange = false;
    };
    LoginComponent.prototype.nofiyClose = function () {
        this.isnotify = false;
        this.isTouchIDdisableNotificationclose = false;
        this.isLoginApi = false;
    };
    LoginComponent.prototype.dismissKeyBoard = function () {
        var passwordtxt = this.passwordtxt.nativeElement;
        passwordtxt.dismissSoftInput();
        var userNametxt = this.userNametxt.nativeElement;
        userNametxt.dismissSoftInput();
    };
    LoginComponent.prototype.showPassword = function () {
        if (this.showFlag == 0) {
            this.passwordtxt.nativeElement.secure = false;
            this.showText.nativeElement.text = "Hide";
            this.showFlag = 1;
        }
        else if (this.showFlag == 1) {
            this.passwordtxt.nativeElement.secure = true;
            this.passwordStr = this.passwordtxt.nativeElement.text;
            this.showText.nativeElement.text = "Show";
            this.showFlag = 0;
            this.hideFlag = 1;
        }
        if (app.android) {
            this.setCursorToEnd();
        }
    };
    LoginComponent.prototype.setCursorToEnd = function () {
        var _this = this;
        setTimeout(function () {
            android.text.Selection.setSelection(_this.passwordtxt.nativeElement.android.getText(), _this.passwordtxt.nativeElement.android.length());
        }, 0);
    };
    LoginComponent.prototype.savingText = function (password) {
        this.passwordStr = password;
        if (this.hideFlag == 1) {
            this.passwordtxt.nativeElement.text = this.passwordStr + password;
            this.hideFlag = 0;
        }
    };
    LoginComponent.prototype.registerNow = function () {
        this.isLoginApi = false;
        this.userName = "";
        this.password = "";
        this._routerExtensions.navigate(["/create"], {
            animated: false
        });
    };
    LoginComponent.prototype.goToPasswordField = function () {
        this.passwordtxt.nativeElement.focus();
    };
    return LoginComponent;
}(observable_1.Observable));
__decorate([
    core_1.ViewChild("rememberSwitch"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "rememberSwitch", void 0);
__decorate([
    core_1.ViewChild("enableTouchIDSwitch"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "enableTouchIDSwitch", void 0);
__decorate([
    core_1.ViewChild("touchIDStack"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "touchIDStack", void 0);
__decorate([
    core_1.ViewChild("userNametxt"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "userNametxt", void 0);
__decorate([
    core_1.ViewChild("passwordtxt"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "passwordtxt", void 0);
__decorate([
    core_1.ViewChild("showText"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "showText", void 0);
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./login.component.html",
        styleUrls: ["login.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        global_1.Globals,
        core_1.Renderer,
        login_service_1.LoginService,
        formValidation_service_1.FormValidationService,
        page_1.Page])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlIO0FBRWpILHNEQUErRDtBQUMvRCxrREFBb0Q7QUFDcEQsOENBQThDO0FBQzlDLGlEQUErQztBQUMvQyw2Q0FBMEM7QUFFMUMsOENBQTZDO0FBQzdDLCtFQUFnRTtBQUNoRSwyRUFBNEQ7QUFDNUQsdUZBQXFGO0FBQ3JGLGtEQUFvRDtBQUNwRCxvQ0FBc0M7QUFDdEMsNkRBQWlJO0FBRWpJLDJDQUE2QztBQUU3QyxnQ0FBK0I7QUFFL0IsaUZBQWtFO0FBQ2xFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVVwQyxJQUFhLGNBQWM7SUFBUyxrQ0FBVTtJQXVDNUMsd0JBQW9CLGlCQUFtQyxFQUM3QyxRQUFpQixFQUNqQixRQUFrQixFQUNuQixhQUEyQixFQUMxQixzQkFBNkMsRUFDOUMsSUFBVTtRQUxuQixZQU1FLGlCQUFPLFNBS1I7UUFYbUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUM3QyxjQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbkIsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDMUIsNEJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM5QyxVQUFJLEdBQUosSUFBSSxDQUFNO1FBakNaLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsbUJBQWEsR0FBRyxJQUFJLDJDQUFhLEVBQUUsQ0FBQztRQUNwQyx3QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFDMUMsZUFBUyxHQUFHLElBQUksdUJBQVMsRUFBRSxDQUFDO1FBQ3JCLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUNqQyxzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsb0JBQWMsR0FBWSxJQUFJLENB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OzhCQUFlLGlCQUFVO29EQUFDO0FBQzFCO0lBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDOzhCQUFjLGlCQUFVO21EQUFDO0FBQ3hCO0lBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDOzhCQUFjLGlCQUFVO21EQUFDO0FBQzNCO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFXLGlCQUFVO2dEQUFDO0FBTmpDLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUV6QixDQUFDO3FDQXlDdUMseUJBQWdCO1FBQ25DLGdCQUFPO1FBQ1AsZUFBUTtRQUNKLDRCQUFZO1FBQ0YsOENBQXFCO1FBQ3hDLFdBQUk7R0E1Q1IsY0FBYyxDQStnQjFCO0FBL2dCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBSZW5kZXJlciwgSW5qZWN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gXCIuL2xvZ2luLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTG9naW5Vc2VyIH0gZnJvbSBcIi4vbG9naW4ubW9kZWxcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgRmluZ2VycHJpbnRBdXRoIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1maW5nZXJwcmludC1hdXRoXCI7XHJcbmltcG9ydCB7IFNlY3VyZVN0b3JhZ2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNlY3VyZS1zdG9yYWdlXCI7XHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBnZXROdW1iZXIsIHNldE51bWJlciwgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGhhc0tleSwgcmVtb3ZlLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgKiBhcyBjb25uZWN0aXZpdHkgZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xyXG5pbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidWkvc3dpdGNoXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbmRlY2xhcmUgdmFyIE1CUHJvZ3Jlc3NIVURNb2RlRGV0ZXJtaW5hdGU7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImxvZ2luLmNzc1wiXVxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBleHRlbmRzIE9ic2VydmFibGUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIEBWaWV3Q2hpbGQoXCJyZW1lbWJlclN3aXRjaFwiKSByZW1lbWJlclN3aXRjaDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZW5hYmxlVG91Y2hJRFN3aXRjaFwiKSBlbmFibGVUb3VjaElEU3dpdGNoOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ0b3VjaElEU3RhY2tcIikgdG91Y2hJRFN0YWNrOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJ1c2VyTmFtZXR4dFwiKSB1c2VyTmFtZXR4dDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmR0eHRcIikgcGFzc3dvcmR0eHQ6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInNob3dUZXh0XCIpIHNob3dUZXh0OiBFbGVtZW50UmVmO1xyXG5cclxuICBwdWJsaWMgdXNlck5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgaXNyZW1lbWJlcjogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGlzRW5hYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIHNlY3VyZVN0b3JhZ2UgPSBuZXcgU2VjdXJlU3RvcmFnZSgpO1xyXG4gIHB1YmxpYyB0b3VjaElESW50ZXJhY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGxvZ2luVXNlciA9IG5ldyBMb2dpblVzZXIoKTtcclxuICBwdWJsaWMgaXNVc2VyTmFtZUZpbGxlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGlzUGFzc3dvcmRGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBsYmxQYXNzd29yZFJlcTogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGxibFVzZXJOYW1lUmVxOiBib29sZWFuID0gdHJ1ZTtcclxuICBwcml2YXRlIGZpbmdlcnByaW50QXV0aDogRmluZ2VycHJpbnRBdXRoO1xyXG4gIHB1YmxpYyB0b3VjaElEOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzbm90aWZ5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzRW5hYmxlbm90aWZ5OiBib29sZWFuO1xyXG4gIHB1YmxpYyBpc3VzZXJDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvbjogYm9vbGVhbjtcclxuICBwdWJsaWMgdG91Y2hJRF9zcmM6IHN0cmluZyA9IFwifi9pbWFnZXMvaWNvbi90b3VjaElEQDJ4LnBuZ1wiO1xyXG4gIHB1YmxpYyBzaG93RmxhZyA9IDA7XHJcbiAgcHVibGljIGhpZGVGbGFnID0gMDtcclxuICBwdWJsaWMgcGFzc3dvcmRTdHI6IHN0cmluZztcclxuICB0b3VjaElER3JpZCA9IFwidG91Y2hJREdyaWRcIjtcclxuICBpc1RvdWNoSURkaXNhYmxlTm90aWZpY2F0aW9uY2xvc2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGxibFBhc3N3b3JkOiBzdHJpbmcgPSBcIipSZXF1aXJlZCBGaWVsZFwiO1xyXG4gIGlzTG9naW5BcGk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaWduSW5JbnRlcmFjdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgcGFnZVN0YXJ0VGltZTogbnVtYmVyID0gMDtcclxuICBwYWdlRW5kVGltZTogbnVtYmVyID0gMDtcclxuICBwYWdlVGltZURpZmZlcmVuY2U6IG51bWJlciA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsXHJcbiAgICBwdWJsaWMgX2xvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsXHJcbiAgICBwdWJsaWMgcGFnZTogUGFnZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgdGhpcy5maW5nZXJwcmludEF1dGggPSBuZXcgRmluZ2VycHJpbnRBdXRoKCk7XHJcbiAgICB0aGlzLmlzVXNlck5hbWVGaWxsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pc1Bhc3N3b3JkRmlsbGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aXRsZSA9IFwiU2lnbiBJblwiO1xyXG4gICAgdGhpcy5pc1VzZXJOYW1lRmlsbGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNQYXNzd29yZEZpbGxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb24gPSBnZXRCb29sZWFuKFwiaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvblwiLCBmYWxzZSk7XHJcbiAgICB0aGlzLmlzbm90aWZ5ID0gdGhpcy5fbG9naW5TZXJ2aWNlLmlzbm90aWZ5O1xyXG4gICAgdGhpcy5pc0VuYWJsZW5vdGlmeSA9IHRoaXMuX2xvZ2luU2VydmljZS5pc0VuYWJsZW5vdGlmeTtcclxuICAgIHRoaXMuaXN1c2VyQ2hhbmdlID0gdGhpcy5fbG9naW5TZXJ2aWNlLmlzdXNlckNoYW5nZTtcclxuICAgIHRoaXMudXNlck5hbWUgPSBcIlwiO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IFwiXCI7XHJcbiAgICB0aGlzLmlzTG9naW5BcGkgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmlzbm90aWZ5KSB7XHJcbiAgICAgIC8vIHRoaXMuaXNyZW1lbWJlciA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9ICF0aGlzLmlzbm90aWZ5O1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IGFwcFNldHRpbmdzLmdldEJvb2xlYW4oXCJpc0VuYWJsZVRvdWNoSURcIiwgdGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCk7XHJcbiAgICBpZiAodGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLnRvdWNoSUQgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy5pc1RvdWNoSURkaXNhYmxlTm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaElER3JpZCA9IFwidG91Y2hJRERpc2FibGVcIjtcclxuICAgICAgICB0aGlzLnRvdWNoSURfc3JjID0gXCJ+L2ltYWdlcy9pY29uL3RvdWNoX2Rpc2FibGVkLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMudG91Y2hJREludGVyYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc1Nob3dUb3VjaElEID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNTaG93VG91Y2hJRCkge1xyXG4gICAgICAgIHRoaXMuZG9WZXJpZnlGaW5nZXJwcmludFdpdGhDdXN0b21GYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNTaG93VG91Y2hJRCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCF0aGlzLmVuYWJsZVRvdWNoSURTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkKSB7XHJcbiAgICAgIGlmICh0aGlzLnRvdWNoSURTdGFjaykge1xyXG4gICAgICAgIHRoaXMudG91Y2hJREdyaWQgPSBcInRvdWNoSUREaXNhYmxlXCI7XHJcbiAgICAgICAgdGhpcy50b3VjaElEX3NyYyA9IFwifi9pbWFnZXMvaWNvbi90b3VjaF9kaXNhYmxlZC5wbmdcIjtcclxuICAgICAgICB0aGlzLnRvdWNoSURJbnRlcmFjdGlvbiA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW1lbWJlclN3aXRjaC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSBhcHBTZXR0aW5ncy5nZXRCb29sZWFuKFwiaXNSZW1lbWJlck1lXCIsIHRoaXMucmVtZW1iZXJTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkKTtcclxuXHJcbiAgICBpZiAodGhpcy5yZW1lbWJlclN3aXRjaC5uYXRpdmVFbGVtZW50LmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzRW5hYmxlID0gdGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVc2VyIE5hbWUgZnJvbSBzdG9yYWdlXHJcbiAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsXCIpKSB7XHJcbiAgICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc0ZpcnN0SW5zdGFsbFwiLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5yZW1vdmUoe1xyXG4gICAgICAgIGtleTogXCJVc2VyTmFtZVwiLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UuZ2V0KHtcclxuICAgICAgICBrZXk6IFwiVXNlck5hbWVcIlxyXG4gICAgICB9KS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMudXNlck5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMuaXN1c2VyQ2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMucGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInVzZXJOYW1lXCIpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy51c2VyTmFtZSA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcInVzZXJOYW1lXCIpO1xyXG4gICAgICB0aGlzLmlzVXNlck5hbWVGaWxsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInBhc3N3b3JkXCIpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gdGhpcy5wYXNzd29yZCA9IGFwcFNldHRpbmdzIC5nZXRTdHJpbmcoXCJwYXNzd29yZFwiKTtcclxuICAgICAgdGhpcy5pc1Bhc3N3b3JkRmlsbGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudG91Y2hJRFN0YWNrKVxyXG4gICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyBMb2dpbih1c2VyTmFtZSwgcGFzc3dvcmQpIHtcclxuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xyXG4gICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gY29ubmVjdGl2aXR5LmdldENvbm5lY3Rpb25UeXBlKCk7XHJcbiAgICBzd2l0Y2ggKGNvbm5lY3Rpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiTm8gaW50ZXJuZXQgYXZhaWxhYmxlLCBwbGVhc2UgY29ubmVjdCEhXCIsIFwibG9uZ2VyXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCkge1xyXG4gICAgICBpZiAodGhpcy51c2VyTmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidXNlck5hbWVcIiwgdGhpcy51c2VyTmFtZSk7XHJcbiAgICAgICAgdGhpcy5pc1VzZXJOYW1lRmlsbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucGFzc3dvcmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vICBhcHBTZXR0aW5ncyAuc2V0U3RyaW5nKFwicGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZCk7XHJcbiAgICAgICAgdGhpcy5pc1Bhc3N3b3JkRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy51c2VyTmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYXBwU2V0dGluZ3MucmVtb3ZlKFwidXNlck5hbWVcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucGFzc3dvcmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFwcFNldHRpbmdzLnJlbW92ZShcInBhc3N3b3JkXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudXNlck5hbWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnVzZXJOYW1lID09PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuaXNVc2VyTmFtZUZpbGxlZCA9IGZhbHNlO1xyXG4gICAgICBsZXQgdXNlck5hbWV0eHQgPSA8VGV4dEZpZWxkPnRoaXMudXNlck5hbWV0eHQubmF0aXZlRWxlbWVudDtcclxuICAgICAgdXNlck5hbWV0eHQuZm9jdXMoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmlzVXNlck5hbWVGaWxsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGFzc3dvcmQgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnBhc3N3b3JkID09PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuaXNQYXNzd29yZEZpbGxlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5pc1VzZXJOYW1lRmlsbGVkKSB7XHJcbiAgICAgICAgdGhpcy5sYmxQYXNzd29yZCA9IFwiKlJlcXVpcmVkIEZpZWxkXCI7XHJcbiAgICAgICAgbGV0IHBhc3N3b3JkdHh0ID0gPFRleHRGaWVsZD50aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgcGFzc3dvcmR0eHQuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZiAoIXRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5wYXNzd29yZFBhdHRlcm5WYWxpZGF0b3IodGhpcy5wYXNzd29yZCkpIHtcclxuICAgIC8vICAgdGhpcy5pc1Bhc3N3b3JkRmlsbGVkID0gZmFsc2U7XHJcbiAgICAvLyAgIHRoaXMubGJsUGFzc3dvcmQgPSBcIlBhc3N3b3JkIGRpZCBub3QgbWF0Y2ggdGhlIG1pbmltdW0gY3JpdGVyaWEgXCJcclxuICAgIC8vIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmlzUGFzc3dvcmRGaWxsZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmxibFBhc3N3b3JkID0gXCIqUmVxdWlyZWQgRmllbGRcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1Bhc3N3b3JkRmlsbGVkICYmIHRoaXMuaXNVc2VyTmFtZUZpbGxlZCkge1xyXG4gICAgICBsb2FkZXIuc2hvdygpO1xyXG4gICAgICAvLyB0aGlzLnNpZ25JbkludGVyYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgIC8vIHZhciBwYXJhbXMgPSBcIntcInVzZXJuYW1lXCI6XCJ1c2VyMDFcIiAsIFwicGFzc3dvcmRcIjpcInBhc3N3b3JkMDFcIn1cIlxyXG4gICAgICB0aGlzLmxvZ2luVXNlci51c2VybmFtZSA9IHRoaXMudXNlck5hbWU7XHJcbiAgICAgIHRoaXMubG9naW5Vc2VyLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcclxuICAgICAgbGV0IHBhcmFtczogYW55ID0gdGhpcy5sb2dpblVzZXI7XHJcblxyXG4gICAgICB0aGlzLl9sb2dpblNlcnZpY2UubG9naW5Vc2VyKEpTT04uc3RyaW5naWZ5KHRoaXMubG9naW5Vc2VyKSlcclxuICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAvLyAgICB0aGlzLnNpZ25JbkludGVyYWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICB0aGlzLm5hdkhvbWUoKTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAvLyAgIHRoaXMuc2lnbkluSW50ZXJhY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5pc0xvZ2luQXBpID0gdHJ1ZTtcclxuICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIC8vIHRoaXMubmF2SG9tZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNQYXNzd29yZEZpbGxlZCkge1xyXG4gICAgICB0aGlzLmxibFBhc3N3b3JkUmVxID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzVXNlck5hbWVGaWxsZWQpIHtcclxuICAgICAgdGhpcy5sYmxVc2VyTmFtZVJlcSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVsZXRlKCkge1xyXG4gICAgYXBwU2V0dGluZ3MucmVtb3ZlKFwidXNlck5hbWVcIik7XHJcbiAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJwYXNzd29yZFwiKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBGb3Jnb3RQYXNzd29yZCgpIHtcclxuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xyXG4gICAgdGhpcy51c2VyTmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcclxuICAgIHRoaXMuZGlzbWlzc0tleUJvYXJkKCk7XHJcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9oYXBweVwiXSwge1xyXG4gICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzbm90aWZ5ID0gZmFsc2U7XHJcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXN1c2VyQ2hhbmdlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgdGhpcy5kaXNtaXNzS2V5Qm9hcmQoKTtcclxuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL2Fub255bW91c0hvbWVcIl0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzTG9naW5BcGkgPSBmYWxzZTtcclxuICAgIHRoaXMuX2xvZ2luU2VydmljZS5pc25vdGlmeSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzdXNlckNoYW5nZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbnRhY3RNZW1iZXJOYXYoKSB7XHJcbiAgICB0aGlzLmRpc21pc3NLZXlCb2FyZCgpO1xyXG4gICAgdGhpcy5pc0xvZ2luQXBpID0gZmFsc2U7XHJcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jb250YWN0VXNcIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVpc3JlbWVtYmVyKGFyZ3MpIHtcclxuICAgIGxldCByZW1lbWJlclN3aXRjaCA9IDxTd2l0Y2g+YXJncy5vYmplY3Q7XHJcbiAgICBpZiAodGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLmVuYWJsZVRvdWNoSURTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkID0gcmVtZW1iZXJTd2l0Y2guY2hlY2tlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vICB0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9ICF0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVpc0VuYWJsZShhcmdzKSB7XHJcbiAgICBsZXQgZW5hYmxlU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcclxuICAgIGlmIChlbmFibGVTd2l0Y2guY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLmZpbmdlcnByaW50QXV0aC5hdmFpbGFibGUoKS50aGVuKFxyXG4gICAgICAgIChhdmFpbDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgaWYgKGF2YWlsKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50b3VjaElEKSB7IC8vIGNoZWNrcyB0b3VjaElEU3RhY2sgZW5hYmxlZFxyXG4gICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogKFwiVG91Y2ggSUQgd2lsbCBiZSBlbmFibGVkIG9uIHlvdXIgbmV4dCBzaWduIGluXCIpLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IGVuYWJsZVN3aXRjaC5jaGVja2VkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiBcIkVuYWJsZSBUb3VjaCBJRCBMb2dpblwiLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IChgVGhlIFRvdWNoIElEIGxvZ2luIG9wdGlvbiBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZGV2aWNlcyB3aXRoIFRvdWNoIElEIGVuYWJsZWQuIEVuYWJsaW5nIHRoaXMgb3B0aW9uIGFsbG93cyBmb3IgYSBxdWljayBsb2dpbiB0byBNeSBCbHVlIHVzaW5nIFRvdWNoIElEIGF1dGhlbnRpY2F0aW9uLmApLFxyXG4gICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBlbmFibGVTd2l0Y2guY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNFbmFibGVUb3VjaElEXCIsIGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkVuYWJsZSBUb3VjaCBJRCBMb2dpblwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAoYFRoZSBUb3VjaCBJRCBsb2dpbiBvcHRpb24gaXMgb25seSBhdmFpbGFibGUgZm9yIGRldmljZXMgd2l0aCBUb3VjaCBJRCBlbmFibGVkLiBFbmFibGluZyB0aGlzIG9wdGlvbiBhbGxvd3MgZm9yIGEgcXVpY2sgbG9naW4gdG8gTXkgQmx1ZSB1c2luZyBUb3VjaCBJRCBhdXRoZW50aWNhdGlvbi5gKSxcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZW5hYmxlU3dpdGNoLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc0VuYWJsZVRvdWNoSURcIiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXNFbmFibGUgPSBlbmFibGVTd2l0Y2guY2hlY2tlZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkb0NoZWNrQXZhaWxhYmxlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5maW5nZXJwcmludEF1dGguYXZhaWxhYmxlKCkudGhlbihcclxuICAgICAgKGF2YWlsOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICB0aXRsZTogXCJGaW5nZXJwcmludCBzY2FubmVyIGF2YWlsYWJsZT9cIixcclxuICAgICAgICAgIG1lc3NhZ2U6IGF2YWlsID8gXCJZRVNcIiA6IFwiTk9cIixcclxuICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZG9DaGVja0ZpbmdlcnByaW50c0NoYW5nZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmZpbmdlcnByaW50QXV0aC5kaWRGaW5nZXJwcmludERhdGFiYXNlQ2hhbmdlKCkudGhlbihcclxuICAgICAgKGNoYW5nZWQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgIHRpdGxlOiBcIkZpbmdlcnByaW50IERCIGNoYW5nZWQ/XCIsXHJcbiAgICAgICAgICBtZXNzYWdlOiBjaGFuZ2VkID8gXCJZRVNcIiA6IFwiTk9cIixcclxuICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZG9WZXJpZnlGaW5nZXJwcmludFdpdGhDdXN0b21GYWxsYmFjaygpOiB2b2lkIHtcclxuICAgIHRoaXMuZmluZ2VycHJpbnRBdXRoLnZlcmlmeUZpbmdlcnByaW50V2l0aEN1c3RvbUZhbGxiYWNrKHtcclxuICAgICAgbWVzc2FnZTogXCJTaWduIGluIHdpdGggdGhlIG9ubGluZSBJRCBcIiArIHRoaXMudXNlck5hbWUuc3Vic3RyaW5nKDAsIDMpICsgdGhpcy51c2VyTmFtZS5zdWJzdHJpbmcoMykucmVwbGFjZSgvLi9nLCBcIipcIiksIC8vIG9wdGlvbmFsXHJcbiAgICAgIGZhbGxiYWNrTWVzc2FnZTogXCJQYXNzd29yZFwiIC8vIG9wdGlvbmFsXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uYXZIb21lKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IFwiRm9yIHNlY3VyaXR5LCBUb3VjaCBJRCBoYXMgYmVlbiB0ZW1wb3JhcmlseSBkaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IChcIlBsZWFzZSBzaWduIGluIHdpdGggeW91ciB1c2VybmFtZSBhbmQgcGFzc3dvcmQuIFRvdWNoIElEIHdpbGwgYmUgcmUtZW5hYmxlZCBvbiB5b3VyIG5leHQgc2lnbiBpblwiKSxcclxuICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc1RvdWNoSURkaXNhYmxlTm90aWZpY2F0aW9uXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy50b3VjaElER3JpZCA9IFwidG91Y2hJRERpc2FibGVcIjtcclxuICAgICAgICAgICAgdGhpcy50b3VjaElESW50ZXJhY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50b3VjaElEX3NyYyA9IFwifi9pbWFnZXMvaWNvbi90b3VjaF9kaXNhYmxlZC5wbmdcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAtOCB8fCB0eXBlb2YgKGVycm9yLmNvZGUpID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAgICAvLyA8PDwtLS0gICAgdXNpbmcgKCk9PiBzeW50YXhcclxuICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlRvdWNoIElEIGlzIGxvY2tlZCBvdXRcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IChcInBsZWFzZSBsb2NrIHRoZSBkZXZpY2UgYW5kIHVubG9jayB0aGUgZGV2aWNlXCIpLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcclxuICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLnRvdWNoSURHcmlkID0gXCJ0b3VjaElERGlzYWJsZVwiO1xyXG4gICAgICAgICAgICAgIHRoaXMudG91Y2hJREludGVyYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy50b3VjaElEX3NyYyA9IFwifi9pbWFnZXMvaWNvbi90b3VjaF9kaXNhYmxlZC5wbmdcIjtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuYXZIb21lKCkge1xyXG4gICAgbGV0IGN1cnJlbnRTdGF0ZSA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcInZlcmlmeS11bmF1dGhlbnRpY2F0ZVwiKTtcclxuICAgIHRoaXMuZGlzbWlzc0tleUJvYXJkKCk7XHJcbiAgICBpZiAodGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCB8fCB0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLnNlY3VyZVN0b3JhZ2Uuc2V0KHtcclxuICAgICAgICBrZXk6IFwiVXNlck5hbWVcIixcclxuICAgICAgICB2YWx1ZTogdGhpcy51c2VyTmFtZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UucmVtb3ZlKHtcclxuICAgICAgICBrZXk6IFwiVXNlck5hbWVcIixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNSZW1lbWJlck1lXCIsIHRoaXMucmVtZW1iZXJTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkKTtcclxuICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc0VuYWJsZVRvdWNoSURcIiwgdGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCk7XHJcblxyXG4gICAgdGhpcy5fZ2xvYmFscy5jaGFuZ2VMb2dpbigpO1xyXG4gICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzbm90aWZ5ID0gZmFsc2U7XHJcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXN1c2VyQ2hhbmdlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb24gPSBmYWxzZTtcclxuICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xyXG4gICAgLyogdGhpcy51c2VyTmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjsgKi9cclxuICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc1RvdWNoSURkaXNhYmxlTm90aWZpY2F0aW9uXCIsIGZhbHNlKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFN0YXRlID09IFwidW4tYXV0aFwiKSB7XHJcbiAgICAgIC8vcmFteWFcclxuICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9nbG9iYWxzLmlzQXV0aENhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcmVnX2hvbWVcIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy51c2VyTmFtZV0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xyXG4gICAgICAvLyAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAvLyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PSBcImF1dGgtc3VjY2Vzc1wiKSB7XHJcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vYXV0aGVudGljYXRpb25fc3VjY2Vzc1wiXSwge1xyXG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PSBcImNhbmNlbC1hdXRoXCIpIHtcclxuICAgICAgdGhpcy5fZ2xvYmFscy5pc19hdXRoX2NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xyXG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgICAgLy8gdGhpcy5fZ2xvYmFscy5pc0F1dGhDYW5jZWxsZWQ9dHJ1ZTtcclxuICAgICAgLy8gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9yZWdfaG9tZVwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLnVzZXJOYW1lXSwge1xyXG4gICAgICAvLyAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAvLyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PSBcInJlZ2lzdGVyZWQtdW4tYXV0aFwiICYmIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9PSBcIlJOVlwiKSB7XHJcbiAgICAgIC8vIFJhZ2h1ICAgIFxyXG4gICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcmVnX2hvbWVcIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy51c2VyTmFtZV0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT0gXCJnb3RvLWF1dGhcIikge1xyXG4gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3BlcnNvbmFsX2luZm9cIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy5fZ2xvYmFscy51c2VyX2lkZW50aXR5XSwge1xyXG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIHtcclxuICAgICAgLy9KYWlcclxuICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcmVnX2hvbWVcIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy51c2VyTmFtZV0sIHtcclxuICAgICAgLy8gICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZVVzZXIoKSB7XHJcbiAgICB0aGlzLmRpc21pc3NLZXlCb2FyZCgpO1xyXG4gICAgdGhpcy5pc0xvZ2luQXBpID0gZmFsc2U7XHJcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpbi9jaGFuZ2VVc2VyXCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXN1c2VyQ2hhbmdlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbm9maXlDbG9zZSgpIHtcclxuICAgIHRoaXMuaXNub3RpZnkgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvbmNsb3NlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzTG9naW5BcGkgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNtaXNzS2V5Qm9hcmQoKSB7XHJcbiAgICBsZXQgcGFzc3dvcmR0eHQgPSA8VGV4dEZpZWxkPnRoaXMucGFzc3dvcmR0eHQubmF0aXZlRWxlbWVudDtcclxuICAgIHBhc3N3b3JkdHh0LmRpc21pc3NTb2Z0SW5wdXQoKTtcclxuICAgIGxldCB1c2VyTmFtZXR4dCA9IDxUZXh0RmllbGQ+dGhpcy51c2VyTmFtZXR4dC5uYXRpdmVFbGVtZW50O1xyXG4gICAgdXNlck5hbWV0eHQuZGlzbWlzc1NvZnRJbnB1dCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dQYXNzd29yZCgpIHtcclxuICAgIGlmICh0aGlzLnNob3dGbGFnID09IDApIHtcclxuICAgICAgdGhpcy5wYXNzd29yZHR4dC5uYXRpdmVFbGVtZW50LnNlY3VyZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNob3dUZXh0Lm5hdGl2ZUVsZW1lbnQudGV4dCA9IFwiSGlkZVwiO1xyXG4gICAgICB0aGlzLnNob3dGbGFnID0gMTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zaG93RmxhZyA9PSAxKSB7XHJcbiAgICAgIHRoaXMucGFzc3dvcmR0eHQubmF0aXZlRWxlbWVudC5zZWN1cmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnBhc3N3b3JkU3RyID0gdGhpcy5wYXNzd29yZHR4dC5uYXRpdmVFbGVtZW50LnRleHQ7XHJcbiAgICAgIHRoaXMuc2hvd1RleHQubmF0aXZlRWxlbWVudC50ZXh0ID0gXCJTaG93XCI7XHJcbiAgICAgIHRoaXMuc2hvd0ZsYWcgPSAwO1xyXG4gICAgICB0aGlzLmhpZGVGbGFnID0gMTtcclxuICAgIH1cclxuICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICB0aGlzLnNldEN1cnNvclRvRW5kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRDdXJzb3JUb0VuZCgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBhbmRyb2lkLnRleHQuU2VsZWN0aW9uLnNldFNlbGVjdGlvbihcclxuICAgICAgICB0aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5nZXRUZXh0KCksXHJcbiAgICAgICAgdGhpcy5wYXNzd29yZHR4dC5uYXRpdmVFbGVtZW50LmFuZHJvaWQubGVuZ3RoKClcclxuICAgICAgKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxuICBwdWJsaWMgc2F2aW5nVGV4dChwYXNzd29yZCkge1xyXG4gICAgdGhpcy5wYXNzd29yZFN0ciA9IHBhc3N3b3JkO1xyXG4gICAgaWYgKHRoaXMuaGlkZUZsYWcgPT0gMSkge1xyXG4gICAgICB0aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQudGV4dCA9IHRoaXMucGFzc3dvcmRTdHIgKyBwYXNzd29yZDtcclxuICAgICAgdGhpcy5oaWRlRmxhZyA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyByZWdpc3Rlck5vdygpIHtcclxuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xyXG4gICAgdGhpcy51c2VyTmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NyZWF0ZVwiXSwge1xyXG4gICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuICBnb1RvUGFzc3dvcmRGaWVsZCgpIHtcclxuICAgIHRoaXMucGFzc3dvcmR0eHQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxufVxyXG4iXX0=