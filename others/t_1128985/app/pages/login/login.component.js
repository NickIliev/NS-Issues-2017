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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlIO0FBRWpILHNEQUErRDtBQUMvRCxrREFBb0Q7QUFDcEQsOENBQThDO0FBQzlDLGlEQUErQztBQUMvQyw2Q0FBMEM7QUFFMUMsOENBQTZDO0FBQzdDLCtFQUFnRTtBQUNoRSwyRUFBNEQ7QUFDNUQsdUZBQXFGO0FBQ3JGLGtEQUFvRDtBQUNwRCxvQ0FBc0M7QUFDdEMsNkRBQWlJO0FBRWpJLDJDQUE2QztBQUU3QyxnQ0FBK0I7QUFFL0IsaUZBQWtFO0FBQ2xFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVVwQyxJQUFhLGNBQWM7SUFBUyxrQ0FBVTtJQXVDNUMsd0JBQW9CLGlCQUFtQyxFQUM3QyxRQUFpQixFQUNqQixRQUFrQixFQUNuQixhQUEyQixFQUMxQixzQkFBNkMsRUFDOUMsSUFBVTtRQUxuQixZQU1FLGlCQUFPLFNBS1I7UUFYbUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUM3QyxjQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbkIsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDMUIsNEJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM5QyxVQUFJLEdBQUosSUFBSSxDQUFNO1FBakNaLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsbUJBQWEsR0FBRyxJQUFJLDJDQUFhLEVBQUUsQ0FBQztRQUNwQyx3QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFDMUMsZUFBUyxHQUFHLElBQUksdUJBQVMsRUFBRSxDQUFDO1FBQ3JCLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUNqQyxzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFFL0IsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLGlCQUFXLEdBQVcsOEJBQThCLENBQUM7UUFDckQsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFFcEIsaUJBQVcsR0FBRyxhQUFhLENBQUM7UUFDNUIsdUNBQWlDLEdBQVksSUFBSSxDQUFDO1FBQ2xELGlCQUFXLEdBQVcsaUJBQWlCLENBQUM7UUFDeEMsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQVM3QixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLCtDQUFlLEVBQUUsQ0FBQztRQUM3QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7O0lBQy9CLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQUEsaUJBOEVDO1FBN0VDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7UUFDbkUsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsNEJBQTRCLEdBQUcsaUNBQVUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7UUFDeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLGdCQUFnQixDQUFDO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLGtDQUFrQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDdEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUM7WUFDL0MsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNyQyxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxrQ0FBa0MsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNsQyxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5SCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQy9FLENBQUM7UUFFRCx5QkFBeUI7UUFDekIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxXQUFXLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO2dCQUN4QixHQUFHLEVBQUUsVUFBVTthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFDckIsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7Z0JBQ1gsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ25CLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsc0RBQXNEO1lBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0UsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xFLENBQUM7SUFHTSw4QkFBSyxHQUFaLFVBQWEsUUFBUSxFQUFFLFFBQVE7UUFBL0IsaUJBb0ZDO1FBbkZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BGLE1BQU0sQ0FBQztZQUNUO2dCQUNFLEtBQUssQ0FBQztRQUNWLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBRS9CLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLHNEQUFzRDtnQkFDdEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLFdBQVcsR0FBYyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztZQUM1RCxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztnQkFDckMsSUFBSSxXQUFXLEdBQWMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7Z0JBQzVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztRQUtELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1FBQ3ZDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxrQ0FBa0M7WUFDbEMsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN4QyxJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRWpDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN6RCxTQUFTLENBQUMsVUFBQyxJQUFJO2dCQUNkLG9DQUFvQztnQkFDcEMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNkLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVqQixDQUFDLEVBQ0QsVUFBQSxLQUFLO2dCQUNILG1DQUFtQztnQkFDbkMsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztZQUNMLGtCQUFrQjtRQUNwQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVNLCtCQUFNLEdBQWI7UUFDRSxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLHVDQUFjLEdBQXJCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQyxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzFDLENBQUM7SUFFTSwrQkFBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ3ZELFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzFDLENBQUM7SUFFTSx5Q0FBZ0IsR0FBdkI7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzlDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBSTtRQUMxQixJQUFJLGNBQWMsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBQzFFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLDJGQUEyRjtRQUM3RixDQUFDO0lBQ0gsQ0FBQztJQUVNLHVDQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFBMUIsaUJBcUNDO1FBcENDLElBQUksWUFBWSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQ25DLFVBQUMsS0FBYztnQkFDYixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUM7NEJBQ1osT0FBTyxFQUFFLENBQUMsK0NBQStDLENBQUM7NEJBQzFELFlBQVksRUFBRSxJQUFJO3lCQUNuQixDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxLQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztnQkFDbkUsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsS0FBSyxDQUFDO3dCQUNaLEtBQUssRUFBRSx1QkFBdUI7d0JBQzlCLE9BQU8sRUFBRSxDQUFDLHdLQUF3SyxDQUFDO3dCQUNuTCxZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUM3QixXQUFXLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO1lBQ0gsQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFDSixPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNaLEtBQUssRUFBRSx1QkFBdUI7b0JBQzlCLE9BQU8sRUFBRSxDQUFDLHdLQUF3SyxDQUFDO29CQUNuTCxZQUFZLEVBQUUsSUFBSTtpQkFDbkIsQ0FBQyxDQUFDO2dCQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixXQUFXLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FDRixDQUFDO1FBRUosQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7SUFDckQsQ0FBQztJQUVNLHlDQUFnQixHQUF2QjtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUNuQyxVQUFDLEtBQWM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNaLEtBQUssRUFBRSxnQ0FBZ0M7Z0JBQ3ZDLE9BQU8sRUFBRSxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUk7Z0JBQzdCLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVNLG1EQUEwQixHQUFqQztRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLENBQ3RELFVBQUMsT0FBZ0I7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNaLEtBQUssRUFBRSx5QkFBeUI7Z0JBQ2hDLE9BQU8sRUFBRSxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUk7Z0JBQy9CLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVNLDhEQUFxQyxHQUE1QztRQUFBLGlCQTJDQztRQTFDQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1DQUFtQyxDQUFDO1lBQ3ZELE9BQU8sRUFBRSw2QkFBNkIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7WUFDdEgsZUFBZSxFQUFFLFVBQVUsQ0FBQyxXQUFXO1NBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQ0w7WUFDRSxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixhQUFhO1lBQ2YsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ1osS0FBSyxFQUFFLHNEQUFzRDt3QkFDN0QsT0FBTyxFQUFFLENBQUMsa0dBQWtHLENBQUM7d0JBQzdHLFlBQVksRUFBRSxJQUFJO3FCQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNOLEtBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7d0JBQ3pDLFdBQVcsQ0FBQyxVQUFVLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxDQUFDO29CQUNILEtBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ3BDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsa0NBQWtDLENBQUM7Z0JBQ3hELENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzdELFVBQVUsQ0FBQzt3QkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDOzRCQUNaLEtBQUssRUFBRSx3QkFBd0I7NEJBQy9CLE9BQU8sRUFBRSxDQUFDLDhDQUE4QyxDQUFDOzRCQUN6RCxZQUFZLEVBQUUsSUFBSTt5QkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDTixhQUFhO3dCQUNmLENBQUMsQ0FBQyxDQUFDO3dCQUNILEtBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7d0JBQ3BDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7d0JBQ2hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsa0NBQWtDLENBQUM7b0JBQ3hELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGdDQUFPLEdBQWQ7UUFDRSxJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7Z0JBQ3JCLEdBQUcsRUFBRSxVQUFVO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTthQUNyQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xGLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEI7OEJBQ3NCO1FBQ3RCLFdBQVcsQ0FBQyxVQUFVLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFOUQsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsT0FBTztZQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMzRyxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7WUFDSCwwREFBMEQ7WUFDMUQsb0JBQW9CO1lBQ3BCLE1BQU07UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxFQUFFO2dCQUN6RSxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNwRCxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7WUFDSCxzQ0FBc0M7WUFDdEMsaUhBQWlIO1lBQ2pILG9CQUFvQjtZQUNwQixNQUFNO1FBQ1IsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksb0JBQW9CLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRixZQUFZO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0csUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUM5SCxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLENBQUM7WUFDSixLQUFLO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNwRCxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7WUFDSCxpSEFBaUg7WUFDakgsb0JBQW9CO1lBQ3BCLE1BQU07UUFDUixDQUFDO0lBRUgsQ0FBQztJQUVNLG1DQUFVLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3JELFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRU0sbUNBQVUsR0FBakI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsaUNBQWlDLEdBQUcsS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFTSx3Q0FBZSxHQUF0QjtRQUNFLElBQUksV0FBVyxHQUFjLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQzVELFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9CLElBQUksV0FBVyxHQUFjLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQzVELFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxxQ0FBWSxHQUFuQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFDTSx1Q0FBYyxHQUFyQjtRQUFBLGlCQU9DO1FBTkMsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQ2hELEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FDaEQsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFDTSxtQ0FBVSxHQUFqQixVQUFrQixRQUFRO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDbEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFDTSxvQ0FBVyxHQUFsQjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzQyxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsMENBQWlCLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQS9nQkQsQ0FBb0MsdUJBQVUsR0ErZ0I3QztBQTlnQjhCO0lBQTVCLGdCQUFTLENBQUMsZ0JBQWdCLENBQUM7OEJBQWlCLGlCQUFVO3NEQUFDO0FBQ3RCO0lBQWpDLGdCQUFTLENBQUMscUJBQXFCLENBQUM7OEJBQXNCLGlCQUFVOzJEQUFDO0FBQ3ZDO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzhCQUFlLGlCQUFVO29EQUFDO0FBQzFCO0lBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDOzhCQUFjLGlCQUFVO21EQUFDO0FBQ3hCO0lBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDOzhCQUFjLGlCQUFVO21EQUFDO0FBQzNCO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFXLGlCQUFVO2dEQUFDO0FBTmpDLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUV6QixDQUFDO3FDQXlDdUMseUJBQWdCO1FBQ25DLGdCQUFPO1FBQ1AsZUFBUTtRQUNKLDRCQUFZO1FBQ0YsOENBQXFCO1FBQ3hDLFdBQUk7R0E1Q1IsY0FBYyxDQStnQjFCO0FBL2dCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBSZW5kZXJlciwgSW5qZWN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIi4vbG9naW4uc2VydmljZVwiO1xuaW1wb3J0IHsgTG9naW5Vc2VyIH0gZnJvbSBcIi4vbG9naW4ubW9kZWxcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgRmluZ2VycHJpbnRBdXRoIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1maW5nZXJwcmludC1hdXRoXCI7XG5pbXBvcnQgeyBTZWN1cmVTdG9yYWdlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zZWN1cmUtc3RvcmFnZVwiO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9mb3JtVmFsaWRhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGdldE51bWJlciwgc2V0TnVtYmVyLCBnZXRTdHJpbmcsIHNldFN0cmluZywgaGFzS2V5LCByZW1vdmUsIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgVG91Y2hHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5kZWNsYXJlIHZhciBNQlByb2dyZXNzSFVETW9kZURldGVybWluYXRlO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9sb2dpbi5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcImxvZ2luLmNzc1wiXVxuXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgZXh0ZW5kcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZChcInJlbWVtYmVyU3dpdGNoXCIpIHJlbWVtYmVyU3dpdGNoOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiZW5hYmxlVG91Y2hJRFN3aXRjaFwiKSBlbmFibGVUb3VjaElEU3dpdGNoOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwidG91Y2hJRFN0YWNrXCIpIHRvdWNoSURTdGFjazogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcInVzZXJOYW1ldHh0XCIpIHVzZXJOYW1ldHh0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwicGFzc3dvcmR0eHRcIikgcGFzc3dvcmR0eHQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJzaG93VGV4dFwiKSBzaG93VGV4dDogRWxlbWVudFJlZjtcblxuICBwdWJsaWMgdXNlck5hbWU6IHN0cmluZztcbiAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICBwdWJsaWMgaXNyZW1lbWJlcjogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBpc0VuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2VjdXJlU3RvcmFnZSA9IG5ldyBTZWN1cmVTdG9yYWdlKCk7XG4gIHB1YmxpYyB0b3VjaElESW50ZXJhY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xuICBsb2dpblVzZXIgPSBuZXcgTG9naW5Vc2VyKCk7XG4gIHB1YmxpYyBpc1VzZXJOYW1lRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGlzUGFzc3dvcmRGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgbGJsUGFzc3dvcmRSZXE6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgbGJsVXNlck5hbWVSZXE6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGZpbmdlcnByaW50QXV0aDogRmluZ2VycHJpbnRBdXRoO1xuICBwdWJsaWMgdG91Y2hJRDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNub3RpZnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzRW5hYmxlbm90aWZ5OiBib29sZWFuO1xuICBwdWJsaWMgaXN1c2VyQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1RvdWNoSURkaXNhYmxlTm90aWZpY2F0aW9uOiBib29sZWFuO1xuICBwdWJsaWMgdG91Y2hJRF9zcmM6IHN0cmluZyA9IFwifi9pbWFnZXMvaWNvbi90b3VjaElEQDJ4LnBuZ1wiO1xuICBwdWJsaWMgc2hvd0ZsYWcgPSAwO1xuICBwdWJsaWMgaGlkZUZsYWcgPSAwO1xuICBwdWJsaWMgcGFzc3dvcmRTdHI6IHN0cmluZztcbiAgdG91Y2hJREdyaWQgPSBcInRvdWNoSURHcmlkXCI7XG4gIGlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb25jbG9zZTogYm9vbGVhbiA9IHRydWU7XG4gIGxibFBhc3N3b3JkOiBzdHJpbmcgPSBcIipSZXF1aXJlZCBGaWVsZFwiO1xuICBpc0xvZ2luQXBpOiBib29sZWFuID0gZmFsc2U7XG4gIHNpZ25JbkludGVyYWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgcGFnZVN0YXJ0VGltZTogbnVtYmVyID0gMDtcbiAgcGFnZUVuZFRpbWU6IG51bWJlciA9IDA7XG4gIHBhZ2VUaW1lRGlmZmVyZW5jZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgX2dsb2JhbHM6IEdsb2JhbHMsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgcHVibGljIF9sb2dpblNlcnZpY2U6IExvZ2luU2VydmljZSxcbiAgICBwcml2YXRlIF9mb3JtVmFsaWRhdGlvblNlcnZpY2U6IEZvcm1WYWxpZGF0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgcGFnZTogUGFnZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5maW5nZXJwcmludEF1dGggPSBuZXcgRmluZ2VycHJpbnRBdXRoKCk7XG4gICAgdGhpcy5pc1VzZXJOYW1lRmlsbGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzUGFzc3dvcmRGaWxsZWQgPSB0cnVlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICB9XG4gICAgdGhpcy50aXRsZSA9IFwiU2lnbiBJblwiO1xuICAgIHRoaXMuaXNVc2VyTmFtZUZpbGxlZCA9IHRydWU7XG4gICAgdGhpcy5pc1Bhc3N3b3JkRmlsbGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb24gPSBnZXRCb29sZWFuKFwiaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvblwiLCBmYWxzZSk7XG4gICAgdGhpcy5pc25vdGlmeSA9IHRoaXMuX2xvZ2luU2VydmljZS5pc25vdGlmeTtcbiAgICB0aGlzLmlzRW5hYmxlbm90aWZ5ID0gdGhpcy5fbG9naW5TZXJ2aWNlLmlzRW5hYmxlbm90aWZ5O1xuICAgIHRoaXMuaXN1c2VyQ2hhbmdlID0gdGhpcy5fbG9naW5TZXJ2aWNlLmlzdXNlckNoYW5nZTtcbiAgICB0aGlzLnVzZXJOYW1lID0gXCJcIjtcbiAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcbiAgICB0aGlzLmlzTG9naW5BcGkgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5pc25vdGlmeSkge1xuICAgICAgLy8gdGhpcy5pc3JlbWVtYmVyID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9ICF0aGlzLmlzbm90aWZ5O1xuICAgIH1cbiAgICB0aGlzLmVuYWJsZVRvdWNoSURTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkID0gYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRW5hYmxlVG91Y2hJRFwiLCB0aGlzLmVuYWJsZVRvdWNoSURTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkKTtcbiAgICBpZiAodGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCkge1xuICAgICAgdGhpcy50b3VjaElEID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb24pIHtcbiAgICAgICAgdGhpcy50b3VjaElER3JpZCA9IFwidG91Y2hJRERpc2FibGVcIjtcbiAgICAgICAgdGhpcy50b3VjaElEX3NyYyA9IFwifi9pbWFnZXMvaWNvbi90b3VjaF9kaXNhYmxlZC5wbmdcIjtcbiAgICAgICAgdGhpcy50b3VjaElESW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc1Nob3dUb3VjaElEID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc1Nob3dUb3VjaElEKSB7XG4gICAgICAgIHRoaXMuZG9WZXJpZnlGaW5nZXJwcmludFdpdGhDdXN0b21GYWxsYmFjaygpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNTaG93VG91Y2hJRCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCF0aGlzLmVuYWJsZVRvdWNoSURTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkKSB7XG4gICAgICBpZiAodGhpcy50b3VjaElEU3RhY2spIHtcbiAgICAgICAgdGhpcy50b3VjaElER3JpZCA9IFwidG91Y2hJRERpc2FibGVcIjtcbiAgICAgICAgdGhpcy50b3VjaElEX3NyYyA9IFwifi9pbWFnZXMvaWNvbi90b3VjaF9kaXNhYmxlZC5wbmdcIjtcbiAgICAgICAgdGhpcy50b3VjaElESW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IGFwcFNldHRpbmdzLmdldEJvb2xlYW4oXCJpc1JlbWVtYmVyTWVcIiwgdGhpcy5yZW1lbWJlclN3aXRjaC5uYXRpdmVFbGVtZW50LmNoZWNrZWQpO1xuXG4gICAgaWYgKHRoaXMucmVtZW1iZXJTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkKSB7XG4gICAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXNFbmFibGUgPSB0aGlzLmVuYWJsZVRvdWNoSURTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkO1xuICAgIH1cblxuICAgIC8vIFVzZXIgTmFtZSBmcm9tIHN0b3JhZ2VcbiAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsXCIpKSB7XG4gICAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxcIiwgZmFsc2UpO1xuICAgICAgdGhpcy5zZWN1cmVTdG9yYWdlLnJlbW92ZSh7XG4gICAgICAgIGtleTogXCJVc2VyTmFtZVwiLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZWN1cmVTdG9yYWdlLmdldCh7XG4gICAgICAgIGtleTogXCJVc2VyTmFtZVwiXG4gICAgICB9KS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51c2VyTmFtZSA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMuaXN1c2VyQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gXCJcIjtcbiAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInVzZXJOYW1lXCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudXNlck5hbWUgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ1c2VyTmFtZVwiKTtcbiAgICAgIHRoaXMuaXNVc2VyTmFtZUZpbGxlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJwYXNzd29yZFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyB0aGlzLnBhc3N3b3JkID0gYXBwU2V0dGluZ3MgLmdldFN0cmluZyhcInBhc3N3b3JkXCIpO1xuICAgICAgdGhpcy5pc1Bhc3N3b3JkRmlsbGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy50b3VjaElEU3RhY2spXG4gICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgfVxuXG5cbiAgcHVibGljIExvZ2luKHVzZXJOYW1lLCBwYXNzd29yZCkge1xuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xuICAgIGxldCBjb25uZWN0aW9uVHlwZSA9IGNvbm5lY3Rpdml0eS5nZXRDb25uZWN0aW9uVHlwZSgpO1xuICAgIHN3aXRjaCAoY29ubmVjdGlvblR5cGUpIHtcbiAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIk5vIGludGVybmV0IGF2YWlsYWJsZSwgcGxlYXNlIGNvbm5lY3QhIVwiLCBcImxvbmdlclwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCkge1xuICAgICAgaWYgKHRoaXMudXNlck5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ1c2VyTmFtZVwiLCB0aGlzLnVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy5pc1VzZXJOYW1lRmlsbGVkID0gdHJ1ZTtcblxuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFzc3dvcmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyAgYXBwU2V0dGluZ3MgLnNldFN0cmluZyhcInBhc3N3b3JkXCIsIHRoaXMucGFzc3dvcmQpO1xuICAgICAgICB0aGlzLmlzUGFzc3dvcmRGaWxsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsc2Uge1xuICAgICAgaWYgKHRoaXMudXNlck5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJ1c2VyTmFtZVwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhc3N3b3JkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXBwU2V0dGluZ3MucmVtb3ZlKFwicGFzc3dvcmRcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudXNlck5hbWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnVzZXJOYW1lID09PSBcIlwiKSB7XG4gICAgICB0aGlzLmlzVXNlck5hbWVGaWxsZWQgPSBmYWxzZTtcbiAgICAgIGxldCB1c2VyTmFtZXR4dCA9IDxUZXh0RmllbGQ+dGhpcy51c2VyTmFtZXR4dC5uYXRpdmVFbGVtZW50O1xuICAgICAgdXNlck5hbWV0eHQuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmlzVXNlck5hbWVGaWxsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXNzd29yZCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucGFzc3dvcmQgPT09IFwiXCIpIHtcbiAgICAgIHRoaXMuaXNQYXNzd29yZEZpbGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuaXNVc2VyTmFtZUZpbGxlZCkge1xuICAgICAgICB0aGlzLmxibFBhc3N3b3JkID0gXCIqUmVxdWlyZWQgRmllbGRcIjtcbiAgICAgICAgbGV0IHBhc3N3b3JkdHh0ID0gPFRleHRGaWVsZD50aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHBhc3N3b3JkdHh0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2UgaWYgKCF0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UucGFzc3dvcmRQYXR0ZXJuVmFsaWRhdG9yKHRoaXMucGFzc3dvcmQpKSB7XG4gICAgLy8gICB0aGlzLmlzUGFzc3dvcmRGaWxsZWQgPSBmYWxzZTtcbiAgICAvLyAgIHRoaXMubGJsUGFzc3dvcmQgPSBcIlBhc3N3b3JkIGRpZCBub3QgbWF0Y2ggdGhlIG1pbmltdW0gY3JpdGVyaWEgXCJcbiAgICAvLyB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmlzUGFzc3dvcmRGaWxsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5sYmxQYXNzd29yZCA9IFwiKlJlcXVpcmVkIEZpZWxkXCI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNQYXNzd29yZEZpbGxlZCAmJiB0aGlzLmlzVXNlck5hbWVGaWxsZWQpIHtcbiAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAvLyB0aGlzLnNpZ25JbkludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgICAvLyB2YXIgcGFyYW1zID0gXCJ7XCJ1c2VybmFtZVwiOlwidXNlcjAxXCIgLCBcInBhc3N3b3JkXCI6XCJwYXNzd29yZDAxXCJ9XCJcbiAgICAgIHRoaXMubG9naW5Vc2VyLnVzZXJuYW1lID0gdGhpcy51c2VyTmFtZTtcbiAgICAgIHRoaXMubG9naW5Vc2VyLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcbiAgICAgIGxldCBwYXJhbXM6IGFueSA9IHRoaXMubG9naW5Vc2VyO1xuXG4gICAgICB0aGlzLl9sb2dpblNlcnZpY2UubG9naW5Vc2VyKEpTT04uc3RyaW5naWZ5KHRoaXMubG9naW5Vc2VyKSlcbiAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgIC8vICAgIHRoaXMuc2lnbkluSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgdGhpcy5uYXZIb21lKCk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIC8vICAgdGhpcy5zaWduSW5JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luQXBpID0gdHJ1ZTtcbiAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIC8vIHRoaXMubmF2SG9tZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1Bhc3N3b3JkRmlsbGVkKSB7XG4gICAgICB0aGlzLmxibFBhc3N3b3JkUmVxID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNVc2VyTmFtZUZpbGxlZCkge1xuICAgICAgdGhpcy5sYmxVc2VyTmFtZVJlcSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIERlbGV0ZSgpIHtcbiAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJ1c2VyTmFtZVwiKTtcbiAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJwYXNzd29yZFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBGb3Jnb3RQYXNzd29yZCgpIHtcbiAgICB0aGlzLmlzTG9naW5BcGkgPSBmYWxzZTtcbiAgICB0aGlzLnVzZXJOYW1lID0gXCJcIjtcbiAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcbiAgICB0aGlzLmRpc21pc3NLZXlCb2FyZCgpO1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hhcHB5XCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXNub3RpZnkgPSBmYWxzZTtcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXN1c2VyQ2hhbmdlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ29CYWNrKCkge1xuICAgIHRoaXMuZGlzbWlzc0tleUJvYXJkKCk7XG4gICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbikge1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvYW5vbnltb3VzSG9tZVwiXSwge1xuICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmlzTG9naW5BcGkgPSBmYWxzZTtcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXNub3RpZnkgPSBmYWxzZTtcbiAgICB0aGlzLl9sb2dpblNlcnZpY2UuaXN1c2VyQ2hhbmdlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY29udGFjdE1lbWJlck5hdigpIHtcbiAgICB0aGlzLmRpc21pc3NLZXlCb2FyZCgpO1xuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NvbnRhY3RVc1wiXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlaXNyZW1lbWJlcihhcmdzKSB7XG4gICAgbGV0IHJlbWVtYmVyU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcbiAgICBpZiAodGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCkge1xuICAgICAgdGhpcy5lbmFibGVUb3VjaElEU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHJlbWVtYmVyU3dpdGNoLmNoZWNrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vICB0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9ICF0aGlzLnJlbWVtYmVyU3dpdGNoLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlaXNFbmFibGUoYXJncykge1xuICAgIGxldCBlbmFibGVTd2l0Y2ggPSA8U3dpdGNoPmFyZ3Mub2JqZWN0O1xuICAgIGlmIChlbmFibGVTd2l0Y2guY2hlY2tlZCkge1xuICAgICAgdGhpcy5maW5nZXJwcmludEF1dGguYXZhaWxhYmxlKCkudGhlbihcbiAgICAgICAgKGF2YWlsOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudG91Y2hJRCkgeyAvLyBjaGVja3MgdG91Y2hJRFN0YWNrIGVuYWJsZWRcbiAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogKFwiVG91Y2ggSUQgd2lsbCBiZSBlbmFibGVkIG9uIHlvdXIgbmV4dCBzaWduIGluXCIpLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlclN3aXRjaC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSBlbmFibGVTd2l0Y2guY2hlY2tlZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiRW5hYmxlIFRvdWNoIElEIExvZ2luXCIsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IChgVGhlIFRvdWNoIElEIGxvZ2luIG9wdGlvbiBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZGV2aWNlcyB3aXRoIFRvdWNoIElEIGVuYWJsZWQuIEVuYWJsaW5nIHRoaXMgb3B0aW9uIGFsbG93cyBmb3IgYSBxdWljayBsb2dpbiB0byBNeSBCbHVlIHVzaW5nIFRvdWNoIElEIGF1dGhlbnRpY2F0aW9uLmApLFxuICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbmFibGVTd2l0Y2guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0Qm9vbGVhbihcImlzRW5hYmxlVG91Y2hJRFwiLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkVuYWJsZSBUb3VjaCBJRCBMb2dpblwiLFxuICAgICAgICAgICAgbWVzc2FnZTogKGBUaGUgVG91Y2ggSUQgbG9naW4gb3B0aW9uIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBkZXZpY2VzIHdpdGggVG91Y2ggSUQgZW5hYmxlZC4gRW5hYmxpbmcgdGhpcyBvcHRpb24gYWxsb3dzIGZvciBhIHF1aWNrIGxvZ2luIHRvIE15IEJsdWUgdXNpbmcgVG91Y2ggSUQgYXV0aGVudGljYXRpb24uYCksXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVuYWJsZVN3aXRjaC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgYXBwU2V0dGluZ3Muc2V0Qm9vbGVhbihcImlzRW5hYmxlVG91Y2hJRFwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9XG4gICAgdGhpcy5fbG9naW5TZXJ2aWNlLmlzRW5hYmxlID0gZW5hYmxlU3dpdGNoLmNoZWNrZWQ7XG4gIH1cblxuICBwdWJsaWMgZG9DaGVja0F2YWlsYWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmZpbmdlcnByaW50QXV0aC5hdmFpbGFibGUoKS50aGVuKFxuICAgICAgKGF2YWlsOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgIHRpdGxlOiBcIkZpbmdlcnByaW50IHNjYW5uZXIgYXZhaWxhYmxlP1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IGF2YWlsID8gXCJZRVNcIiA6IFwiTk9cIixcbiAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGRvQ2hlY2tGaW5nZXJwcmludHNDaGFuZ2VkKCk6IHZvaWQge1xuICAgIHRoaXMuZmluZ2VycHJpbnRBdXRoLmRpZEZpbmdlcnByaW50RGF0YWJhc2VDaGFuZ2UoKS50aGVuKFxuICAgICAgKGNoYW5nZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgdGl0bGU6IFwiRmluZ2VycHJpbnQgREIgY2hhbmdlZD9cIixcbiAgICAgICAgICBtZXNzYWdlOiBjaGFuZ2VkID8gXCJZRVNcIiA6IFwiTk9cIixcbiAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGRvVmVyaWZ5RmluZ2VycHJpbnRXaXRoQ3VzdG9tRmFsbGJhY2soKTogdm9pZCB7XG4gICAgdGhpcy5maW5nZXJwcmludEF1dGgudmVyaWZ5RmluZ2VycHJpbnRXaXRoQ3VzdG9tRmFsbGJhY2soe1xuICAgICAgbWVzc2FnZTogXCJTaWduIGluIHdpdGggdGhlIG9ubGluZSBJRCBcIiArIHRoaXMudXNlck5hbWUuc3Vic3RyaW5nKDAsIDMpICsgdGhpcy51c2VyTmFtZS5zdWJzdHJpbmcoMykucmVwbGFjZSgvLi9nLCBcIipcIiksIC8vIG9wdGlvbmFsXG4gICAgICBmYWxsYmFja01lc3NhZ2U6IFwiUGFzc3dvcmRcIiAvLyBvcHRpb25hbFxuICAgIH0pLnRoZW4oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMubmF2SG9tZSgpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXBwLmlvcykge1xuICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAtMSkge1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkZvciBzZWN1cml0eSwgVG91Y2ggSUQgaGFzIGJlZW4gdGVtcG9yYXJpbHkgZGlzYWJsZWRcIixcbiAgICAgICAgICAgICAgbWVzc2FnZTogKFwiUGxlYXNlIHNpZ24gaW4gd2l0aCB5b3VyIHVzZXJuYW1lIGFuZCBwYXNzd29yZC4gVG91Y2ggSUQgd2lsbCBiZSByZS1lbmFibGVkIG9uIHlvdXIgbmV4dCBzaWduIGluXCIpLFxuICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXNUb3VjaElEZGlzYWJsZU5vdGlmaWNhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldEJvb2xlYW4oXCJpc1RvdWNoSURkaXNhYmxlTm90aWZpY2F0aW9uXCIsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRvdWNoSURHcmlkID0gXCJ0b3VjaElERGlzYWJsZVwiO1xuICAgICAgICAgICAgdGhpcy50b3VjaElESW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudG91Y2hJRF9zcmMgPSBcIn4vaW1hZ2VzL2ljb24vdG91Y2hfZGlzYWJsZWQucG5nXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAtOCB8fCB0eXBlb2YgKGVycm9yLmNvZGUpID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgICAgLy8gPDw8LS0tICAgIHVzaW5nICgpPT4gc3ludGF4XG4gICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlRvdWNoIElEIGlzIGxvY2tlZCBvdXRcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAoXCJwbGVhc2UgbG9jayB0aGUgZGV2aWNlIGFuZCB1bmxvY2sgdGhlIGRldmljZVwiKSxcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLnRvdWNoSURHcmlkID0gXCJ0b3VjaElERGlzYWJsZVwiO1xuICAgICAgICAgICAgICB0aGlzLnRvdWNoSURJbnRlcmFjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLnRvdWNoSURfc3JjID0gXCJ+L2ltYWdlcy9pY29uL3RvdWNoX2Rpc2FibGVkLnBuZ1wiO1xuICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmF2SG9tZSgpIHtcbiAgICBsZXQgY3VycmVudFN0YXRlID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIpO1xuICAgIHRoaXMuZGlzbWlzc0tleUJvYXJkKCk7XG4gICAgaWYgKHRoaXMuZW5hYmxlVG91Y2hJRFN3aXRjaC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgfHwgdGhpcy5yZW1lbWJlclN3aXRjaC5uYXRpdmVFbGVtZW50LmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5zZXQoe1xuICAgICAgICBrZXk6IFwiVXNlck5hbWVcIixcbiAgICAgICAgdmFsdWU6IHRoaXMudXNlck5hbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5yZW1vdmUoe1xuICAgICAgICBrZXk6IFwiVXNlck5hbWVcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNSZW1lbWJlck1lXCIsIHRoaXMucmVtZW1iZXJTd2l0Y2gubmF0aXZlRWxlbWVudC5jaGVja2VkKTtcbiAgICBhcHBTZXR0aW5ncy5zZXRCb29sZWFuKFwiaXNFbmFibGVUb3VjaElEXCIsIHRoaXMuZW5hYmxlVG91Y2hJRFN3aXRjaC5uYXRpdmVFbGVtZW50LmNoZWNrZWQpO1xuXG4gICAgdGhpcy5fZ2xvYmFscy5jaGFuZ2VMb2dpbigpO1xuICAgIHRoaXMuX2xvZ2luU2VydmljZS5pc25vdGlmeSA9IGZhbHNlO1xuICAgIHRoaXMuX2xvZ2luU2VydmljZS5pc3VzZXJDaGFuZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb24gPSBmYWxzZTtcbiAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gZmFsc2U7XG4gICAgdGhpcy5pc0xvZ2luQXBpID0gZmFsc2U7XG4gICAgLyogdGhpcy51c2VyTmFtZSA9IFwiXCI7XG4gICAgdGhpcy5wYXNzd29yZCA9IFwiXCI7ICovXG4gICAgYXBwU2V0dGluZ3Muc2V0Qm9vbGVhbihcImlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb25cIiwgZmFsc2UpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA9PSBcInVuLWF1dGhcIikge1xuICAgICAgLy9yYW15YVxuICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XG4gICAgICB0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2dsb2JhbHMuaXNBdXRoQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcmVnX2hvbWVcIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy51c2VyTmFtZV0sIHtcbiAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xuICAgICAgLy8gICBhbmltYXRlZDogZmFsc2VcbiAgICAgIC8vIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT0gXCJhdXRoLXN1Y2Nlc3NcIikge1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9hdXRoZW50aWNhdGlvbl9zdWNjZXNzXCJdLCB7XG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PSBcImNhbmNlbC1hdXRoXCIpIHtcbiAgICAgIHRoaXMuX2dsb2JhbHMuaXNfYXV0aF9jYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICAvLyB0aGlzLl9nbG9iYWxzLmlzQXV0aENhbmNlbGxlZD10cnVlO1xuICAgICAgLy8gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9yZWdfaG9tZVwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLnVzZXJOYW1lXSwge1xuICAgICAgLy8gICBhbmltYXRlZDogZmFsc2VcbiAgICAgIC8vIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT0gXCJyZWdpc3RlcmVkLXVuLWF1dGhcIiAmJiB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPT0gXCJSTlZcIikge1xuICAgICAgLy8gUmFnaHUgICAgXG4gICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9yZWdfaG9tZVwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLnVzZXJOYW1lXSwge1xuICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT0gXCJnb3RvLWF1dGhcIikge1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMuX2dsb2JhbHMucmVnaXN0cmF0aW9uX21vZGUsIHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eV0sIHtcbiAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBlbHNlIHtcbiAgICAgIC8vSmFpXG4gICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSB0cnVlO1xuICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3JlZ19ob21lXCIsIHRoaXMuX2dsb2JhbHMucmVnaXN0cmF0aW9uX21vZGUsIHRoaXMudXNlck5hbWVdLCB7XG4gICAgICAvLyAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgLy8gfSk7XG4gICAgfVxuXG4gIH1cblxuICBwdWJsaWMgY2hhbmdlVXNlcigpIHtcbiAgICB0aGlzLmRpc21pc3NLZXlCb2FyZCgpO1xuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luL2NoYW5nZVVzZXJcIl0sIHtcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgIH0pO1xuICAgIHRoaXMuX2xvZ2luU2VydmljZS5pc3VzZXJDaGFuZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBub2ZpeUNsb3NlKCkge1xuICAgIHRoaXMuaXNub3RpZnkgPSBmYWxzZTtcbiAgICB0aGlzLmlzVG91Y2hJRGRpc2FibGVOb3RpZmljYXRpb25jbG9zZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNMb2dpbkFwaSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGRpc21pc3NLZXlCb2FyZCgpIHtcbiAgICBsZXQgcGFzc3dvcmR0eHQgPSA8VGV4dEZpZWxkPnRoaXMucGFzc3dvcmR0eHQubmF0aXZlRWxlbWVudDtcbiAgICBwYXNzd29yZHR4dC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgbGV0IHVzZXJOYW1ldHh0ID0gPFRleHRGaWVsZD50aGlzLnVzZXJOYW1ldHh0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdXNlck5hbWV0eHQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICB9XG5cbiAgcHVibGljIHNob3dQYXNzd29yZCgpIHtcbiAgICBpZiAodGhpcy5zaG93RmxhZyA9PSAwKSB7XG4gICAgICB0aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQuc2VjdXJlID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dUZXh0Lm5hdGl2ZUVsZW1lbnQudGV4dCA9IFwiSGlkZVwiO1xuICAgICAgdGhpcy5zaG93RmxhZyA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNob3dGbGFnID09IDEpIHtcbiAgICAgIHRoaXMucGFzc3dvcmR0eHQubmF0aXZlRWxlbWVudC5zZWN1cmUgPSB0cnVlO1xuICAgICAgdGhpcy5wYXNzd29yZFN0ciA9IHRoaXMucGFzc3dvcmR0eHQubmF0aXZlRWxlbWVudC50ZXh0O1xuICAgICAgdGhpcy5zaG93VGV4dC5uYXRpdmVFbGVtZW50LnRleHQgPSBcIlNob3dcIjtcbiAgICAgIHRoaXMuc2hvd0ZsYWcgPSAwO1xuICAgICAgdGhpcy5oaWRlRmxhZyA9IDE7XG4gICAgfVxuICAgIGlmIChhcHAuYW5kcm9pZCkge1xuICAgICAgdGhpcy5zZXRDdXJzb3JUb0VuZCgpO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgc2V0Q3Vyc29yVG9FbmQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBhbmRyb2lkLnRleHQuU2VsZWN0aW9uLnNldFNlbGVjdGlvbihcbiAgICAgICAgdGhpcy5wYXNzd29yZHR4dC5uYXRpdmVFbGVtZW50LmFuZHJvaWQuZ2V0VGV4dCgpLFxuICAgICAgICB0aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5sZW5ndGgoKVxuICAgICAgKTtcbiAgICB9LCAwKTtcbiAgfVxuICBwdWJsaWMgc2F2aW5nVGV4dChwYXNzd29yZCkge1xuICAgIHRoaXMucGFzc3dvcmRTdHIgPSBwYXNzd29yZDtcbiAgICBpZiAodGhpcy5oaWRlRmxhZyA9PSAxKSB7XG4gICAgICB0aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQudGV4dCA9IHRoaXMucGFzc3dvcmRTdHIgKyBwYXNzd29yZDtcbiAgICAgIHRoaXMuaGlkZUZsYWcgPSAwO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgcmVnaXN0ZXJOb3coKSB7XG4gICAgdGhpcy5pc0xvZ2luQXBpID0gZmFsc2U7XG4gICAgdGhpcy51c2VyTmFtZSA9IFwiXCI7XG4gICAgdGhpcy5wYXNzd29yZCA9IFwiXCI7XG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlXCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBnb1RvUGFzc3dvcmRGaWVsZCgpIHtcbiAgICB0aGlzLnBhc3N3b3JkdHh0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxufVxuIl19