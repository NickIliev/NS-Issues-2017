"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var formValidation_service_1 = require("../../../shared/services/formValidation.service");
var router_2 = require("nativescript-angular/router");
var registration_service_1 = require("../registration.service");
var registration_model_1 = require("../registration.model");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var core_2 = require("@angular/core");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var global_1 = require("../../../shared/global");
var appSettingsModule = require("application-settings");
var connectivity = require("connectivity");
var app = require("tns-core-modules/application");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var CreationComponent = (function () {
    function CreationComponent(router, _globals, authPromoModal, vcRef, fb, routerExtensions, _formValidationService, _registrationservice) {
        this.router = router;
        this._globals = _globals;
        this.authPromoModal = authPromoModal;
        this.vcRef = vcRef;
        this.fb = fb;
        this.routerExtensions = routerExtensions;
        this._formValidationService = _formValidationService;
        this._registrationservice = _registrationservice;
        this.title = "Register";
        this.user = new registration_model_1.CreateUser();
        this.mobilecheckBoxAcceptTerms = false;
        this.emailcheckBoxAcceptTerms = false;
        this.isEmailPwdSecure = true;
        this.isMobilePwdSecure = true;
        this.showOrHideMobilePwdLabel = "Show";
        this.showOrHideEmailPwdLabel = "Show";
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.mobileCheckboxesChecked = true;
        this.emailCheckboxesChecked = true;
        this.mobileContinueClicked = false;
        this.emailContinueClicked = false;
        this.isValidEmail = true;
        this.isEmailFilled = true;
        this.isEmailPasswordValid = true;
        this.isEmailPasswordFilled = true;
        this.isValidMobileNumber = true;
        this.isMobileNumberFilled = true;
        this.isMobilePasswordValid = true;
        this.isMobilePasswordFilled = true;
        this.mobileUserValid = false;
        this.emailUserValid = false;
        if (this._globals.isTurnOff) {
            this.highlightedDiv = "fromemail";
            this.isMobileForm = false;
            this.registerType = "email";
        }
        else {
            this.highlightedDiv = "fromemail";
            this.isMobileForm = false;
            this.registerType = "email";
        }
        this.mobileForm = fb.group({
            "mobileNo": ["", [forms_1.Validators.required,]],
            "mobilePassword": ["", [forms_1.Validators.required]],
        });
        this.emailForm = fb.group({
            "emailId": ["", [forms_1.Validators.required,]],
            "emailPswd": ["", [forms_1.Validators.required,]],
        });
    }
    CreationComponent.prototype.ngOnInit = function () {
        this.pageStartTime = new Date().getTime();
    };
    CreationComponent.prototype.togglemobilecheckBoxAcceptTerms = function () {
        //  this.mobilecheckBoxAcceptTerms = ! this.mobilecheckBoxAcceptTerms;
        this.acceptTermsMobileCheckBox.nativeElement.checked = !this.acceptTermsMobileCheckBox.nativeElement.checked;
    };
    CreationComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    CreationComponent.prototype.toggleemailcheckBoxAcceptTerms = function () {
        // this.emailcheckBoxAcceptTerms = !this.emailcheckBoxAcceptTerms;
        this.acceptTermsEmailCheckBox.nativeElement.checked = !this.acceptTermsEmailCheckBox.nativeElement.checked;
    };
    // To clear all the fields
    CreationComponent.prototype.clearFields = function () {
        this.mobileNo = "";
        this.mobilePassword = "";
        this.mobileNo = "";
        this.emailId = "";
        this.emailPswd = "";
        this.mobilecheckBoxAcceptTerms = false;
        this.emailcheckBoxAcceptTerms = false;
        this.mobileCheckboxesChecked = true;
        this.emailCheckboxesChecked = true;
        this.mobileContinueClicked = false;
        this.emailContinueClicked = false;
        this.isValidEmail = true;
        this.isEmailFilled = true;
        this.isEmailPasswordValid = true;
        this.isEmailPasswordFilled = true;
        this.isValidMobileNumber = true;
        this.isMobileNumberFilled = true;
        this.isMobilePasswordValid = true;
        this.isMobilePasswordFilled = true;
        this.mobileUserValid = false;
        this.emailUserValid = false;
    };
    // On click of continue button
    CreationComponent.prototype.createUser = function (type, id, pwd) {
        appSettingsModule.setString("verify-unauthenticate", "registered-un-auth");
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                this._globals.showToastMessage("No internet available, please connect!!", "longer");
                return;
            default:
                break;
        }
        this.dismissKeyBoard();
        appSettingsModule.setString("firstName", "");
        appSettingsModule.setString("lastName", "");
        appSettingsModule.setString("dob", "");
        appSettingsModule.setString("emailAddress", "");
        appSettingsModule.setString("mobileNum", "");
        if (type === "mobileNo") {
            this.mobileContinueClicked = true;
            this.isMobileNumberFilled = this._formValidationService.fieldFilledValidator(id);
            this.isValidMobileNumber = this._formValidationService.mobileNumberValidator(id);
            this.isMobilePasswordValid = this._formValidationService.passwordPatternValidator(pwd);
            this.isMobilePasswordFilled = this._formValidationService.fieldFilledValidator(pwd);
            this.mobileCheckboxesChecked = this.acceptTermsMobileCheckBox.nativeElement.checked;
            if (this.isMobileNumberFilled && this.isValidMobileNumber && this.isMobilePasswordValid && this.isMobilePasswordFilled && this.mobileCheckboxesChecked) {
                this.mobileUserValid = true;
            }
            else
                this.mobileUserValid = false;
        }
        else if (type === "emailId") {
            this.emailContinueClicked = true;
            this.isEmailFilled = this._formValidationService.fieldFilledValidator(id);
            this.isValidEmail = this._formValidationService.emailMatchValidator(id);
            this.isEmailPasswordValid = this._formValidationService.passwordPatternValidator(pwd);
            this.isEmailPasswordFilled = this._formValidationService.fieldFilledValidator(pwd);
            this.emailCheckboxesChecked = this.acceptTermsEmailCheckBox.nativeElement.checked;
            if (this.isEmailFilled && this.isValidEmail && this.isEmailPasswordValid && this.isEmailPasswordFilled && this.emailCheckboxesChecked)
                this.emailUserValid = true;
            else
                this.emailUserValid = false;
        }
        // To check if the form is valid and then continue
        if (this.mobileUserValid || this.emailUserValid) {
            loader.show();
            console.log("registerType--" + registration_model_1.CreateUser);
            if (this.registerType === "mobile") {
                this.user.regtype = "MOBILE";
            }
            else if (this.registerType === "email") {
                this.user.regtype = "EMAIL";
            }
            // this.user.regtype = this.registerType;
            this._globals.registration_mode = this.registerType;
            this._registrationservice.registration_type = this.registerType;
            var options = {
                context: {},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            if (this.mobileUserValid) {
                this.user.userid = this.mobileNo;
                this._globals.user_identity = this.mobileNo;
                this._globals.user_reg_password = this.mobilePassword;
            }
            else if (this.emailUserValid) {
                this.user.userid = this.emailId;
                this._globals.user_identity = this.emailId;
                this._globals.user_reg_password = this.emailPswd;
            }
            this._globals.user_state = "RNV";
            this._globals.isLoggedIn = false;
            this._globals.isUnauthenticated = true;
            this._globals.isAuthCancelled = false;
            this.routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.user.userid], {
                animated: false
            });
            loader.hide();
            // this._registrationservice.createUser(this.user)
            //   .subscribe((data) => {
            //     console.log("success---");
            //     this._globals.user_state = "RNV";
            //     this._globals.isLoggedIn = false;
            // this._globals.isUnauthenticated = true;
            // this._globals.isAuthCancelled=false;
            // this.routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.user.userid], {
            //   animated: false
            // });
            // loader.hide();
            //   },
            //   error => {
            //     console.log("errorlll---");
            //     console.dir(error);
            //   });
            this._registrationservice.user_name = this.user.userid;
            this._globals.user_identity = this.user.userid;
            console.dir(this.user);
        }
    };
    // To switch from mobile form to email form
    CreationComponent.prototype.switchView = function (arg) {
        this.clearFields();
        if (!this._globals.isTurnOff) {
            if (arg === "frommobile") {
                this.registerType = "mobile";
                this.isMobileForm = true;
                this.highlightedDiv = arg;
            }
            else if (arg === "fromemail") {
                this.registerType = "email";
                this.isMobileForm = false;
                this.highlightedDiv = arg;
            }
        }
    };
    CreationComponent.prototype.login = function () {
        this.routerExtensions.navigate(["/login"], {
            animated: false
        });
    };
    // back button
    CreationComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    CreationComponent.prototype.dismissKeyBoard = function () {
        var mobNo = this.mobNo.nativeElement;
        mobNo.dismissSoftInput();
        var mobPwd = this.mobPwd.nativeElement;
        mobPwd.dismissSoftInput();
        var email = this.email.nativeElement;
        mobNo.dismissSoftInput();
        var emailPwd = this.emailPwd.nativeElement;
        emailPwd.dismissSoftInput();
    };
    CreationComponent.prototype.validCheck = function (arg, type) {
        if (arg !== undefined && arg !== "") {
            switch (type) {
                case "mobile":
                    this.isMobileNumberFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isValidMobileNumber = this._formValidationService.mobileNumberValidator(arg);
                    break;
                case "mpassword":
                    this.isMobilePasswordValid = this._formValidationService.passwordPatternValidator(arg);
                    this.isMobilePasswordFilled = this._formValidationService.fieldFilledValidator(arg);
                    break;
                case "emailId":
                    this.isEmailFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isValidEmail = this._formValidationService.emailMatchValidator(arg);
                    break;
                case "epassword":
                    this.isEmailPasswordValid = this._formValidationService.passwordPatternValidator(arg);
                    this.isEmailPasswordFilled = this._formValidationService.fieldFilledValidator(arg);
                    break;
            }
        }
    };
    CreationComponent.prototype.showOrHideEmailPassword = function () {
        this.isEmailPwdSecure = !this.isEmailPwdSecure;
        if (this.isEmailPwdSecure) {
            this.showOrHideEmailPwdLabel = "Show";
        }
        else {
            this.showOrHideEmailPwdLabel = "Hide";
        }
        if (app.android) {
            this.retainCursorPosForEmailPwdField();
        }
    };
    CreationComponent.prototype.showOrHideMobilePassword = function () {
        this.isMobilePwdSecure = !this.isMobilePwdSecure;
        if (this.isMobilePwdSecure) {
            this.showOrHideMobilePwdLabel = "Show";
        }
        else {
            this.showOrHideMobilePwdLabel = "Hide";
        }
        if (app.android) {
            this.retainCursorPosForMobilePwdField();
        }
    };
    CreationComponent.prototype.retainCursorPosForMobilePwdField = function () {
        var _this = this;
        setTimeout(function () {
            android.text.Selection.setSelection(_this.mobPwd.nativeElement.android.getText(), _this.mobPwd.nativeElement.android.length());
        }, 0);
    };
    CreationComponent.prototype.retainCursorPosForEmailPwdField = function () {
        var _this = this;
        setTimeout(function () {
            android.text.Selection.setSelection(_this.emailPwd.nativeElement.android.getText(), _this.emailPwd.nativeElement.android.length());
        }, 0);
    };
    CreationComponent.prototype.goToMobPwd = function () {
        this.mobPwd.nativeElement.focus();
    };
    CreationComponent.prototype.goToEmailPwd = function () {
        this.emailPwd.nativeElement.focus();
    };
    return CreationComponent;
}());
__decorate([
    core_1.ViewChild("activityIndicator"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "ac", void 0);
__decorate([
    core_1.ViewChild("CB1"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "acceptTermsMobileCheckBox", void 0);
__decorate([
    core_1.ViewChild("CB2"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "marketingMobileCheckBox", void 0);
__decorate([
    core_1.ViewChild("CB4"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "marketingEmailCheckBox", void 0);
__decorate([
    core_1.ViewChild("CB3"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "acceptTermsEmailCheckBox", void 0);
__decorate([
    core_1.ViewChild("mobNo"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "mobNo", void 0);
__decorate([
    core_1.ViewChild("mobPwd"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "mobPwd", void 0);
__decorate([
    core_1.ViewChild("email"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "email", void 0);
__decorate([
    core_1.ViewChild("emailPwd"),
    __metadata("design:type", core_1.ElementRef)
], CreationComponent.prototype, "emailPwd", void 0);
CreationComponent = __decorate([
    core_1.Component({
        selector: "mb-create",
        moduleId: module.id,
        templateUrl: "./creation.component.html",
        styleUrls: ["../registration.css"],
        providers: [formValidation_service_1.FormValidationService]
    }),
    __metadata("design:paramtypes", [router_1.Router, global_1.Globals, dialogs_1.ModalDialogService, core_2.ViewContainerRef, forms_1.FormBuilder, router_2.RouterExtensions, formValidation_service_1.FormValidationService, registration_service_1.RegistrationService])
], CreationComponent);
exports.CreationComponent = CreationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtHO0FBQ2xHLDBDQUF5QztBQUd6Qyx3Q0FBdUg7QUFDdkgsMEZBQXdGO0FBQ3hGLHNEQUErRDtBQUkvRCxnRUFBOEQ7QUFDOUQsNERBQW1EO0FBRW5ELG1FQUE2RTtBQUM3RSxzQ0FBaUQ7QUFDakQsaUZBQWdFO0FBQ2hFLGlEQUFpRDtBQUNqRCx3REFBMEQ7QUFFMUQsMkNBQTZDO0FBQzdDLGtEQUFvRDtBQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFTcEMsSUFBYSxpQkFBaUI7SUFrRDVCLDJCQUEyQixNQUFjLEVBQVMsUUFBaUIsRUFBVSxjQUFrQyxFQUFVLEtBQXVCLEVBQVUsRUFBZSxFQUFVLGdCQUFrQyxFQUFVLHNCQUE2QyxFQUFVLG9CQUF5QztRQUFwUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQTdDL1QsVUFBSyxHQUFXLFVBQVUsQ0FBQztRQWtDM0IsU0FBSSxHQUFHLElBQUksK0JBQVUsRUFBRSxDQUFDO1FBQ2pCLDhCQUF5QixHQUFZLEtBQUssQ0FBQztRQUMzQyw2QkFBd0IsR0FBWSxLQUFLLENBQUM7UUFDMUMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQUNsQyw2QkFBd0IsR0FBVyxNQUFNLENBQUM7UUFDMUMsNEJBQXVC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cG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDaGVja0JveCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY2hlY2tib3hcIjtcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ1aS93ZWItdmlld1wiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vcmVnaXN0cmF0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3JlYXRlVXNlciB9IGZyb20gXCIuLi9yZWdpc3RyYXRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHsgQXV0aGVudGljYXRlUHJvbW9Db21wb25lbnQgfSBmcm9tIFwiLi4vYXV0aGVudGljYXRlUHJvbW8vYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3NNb2R1bGUgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcclxuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJtYi1jcmVhdGVcIixcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vY3JlYXRpb24uY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4uL3JlZ2lzdHJhdGlvbi5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbRm9ybVZhbGlkYXRpb25TZXJ2aWNlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuIFxyXG4gIEBWaWV3Q2hpbGQoXCJhY3Rpdml0eUluZGljYXRvclwiKSBhYzogRWxlbWVudFJlZjtcclxuIFxyXG5cclxuICB0aXRsZTogc3RyaW5nID0gXCJSZWdpc3RlclwiO1xyXG4gIEBWaWV3Q2hpbGQoXCJDQjFcIikgYWNjZXB0VGVybXNNb2JpbGVDaGVja0JveDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiQ0IyXCIpIG1hcmtldGluZ01vYmlsZUNoZWNrQm94OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJDQjRcIikgbWFya2V0aW5nRW1haWxDaGVja0JveDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiQ0IzXCIpIGFjY2VwdFRlcm1zRW1haWxDaGVja0JveDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwibW9iTm9cIikgbW9iTm86IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIm1vYlB3ZFwiKSBtb2JQd2Q6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImVtYWlsXCIpIGVtYWlsOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlbWFpbFB3ZFwiKSBlbWFpbFB3ZDogRWxlbWVudFJlZjtcclxuXHJcbiAgcHVibGljIGhpZ2hsaWdodGVkRGl2OiBzdHJpbmc7XHJcbiAgcHVibGljIGlzTW9iaWxlRm9ybTogQm9vbGVhbjtcclxuICBwdWJsaWMgbW9iaWxlRm9ybTogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyBlbWFpbEZvcm06IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgbW9iaWxlQ2hlY2tib3hlc0NoZWNrZWQ6IEJvb2xlYW47XHJcbiAgcHVibGljIGVtYWlsQ2hlY2tib3hlc0NoZWNrZWQ6IEJvb2xlYW47XHJcbiAgcHVibGljIG1vYmlsZUNvbnRpbnVlQ2xpY2tlZDogQm9vbGVhbjtcclxuICBwdWJsaWMgZW1haWxDb250aW51ZUNsaWNrZWQ6IEJvb2xlYW47XHJcbiAgcHVibGljIGlzVmFsaWRFbWFpbDogQm9vbGVhbjtcclxuICBwdWJsaWMgaXNFbWFpbEZpbGxlZDogQm9vbGVhbjtcclxuICBwdWJsaWMgaXNFbWFpbFBhc3N3b3JkVmFsaWQ6IEJvb2xlYW47XHJcbiAgcHVibGljIGlzRW1haWxQYXNzd29yZEZpbGxlZDogQm9vbGVhbjtcclxuICBwdWJsaWMgaXNWYWxpZE1vYmlsZU51bWJlcjogQm9vbGVhbjtcclxuICBwdWJsaWMgaXNNb2JpbGVOdW1iZXJGaWxsZWQ6IEJvb2xlYW47XHJcbiAgcHVibGljIGlzTW9iaWxlUGFzc3dvcmRWYWxpZDogQm9vbGVhbjtcclxuICBwdWJsaWMgaXNNb2JpbGVQYXNzd29yZEZpbGxlZDogQm9vbGVhbjtcclxuICBwdWJsaWMgcmVnaXN0ZXJUeXBlOiBzdHJpbmc7XHJcbiAgcHVibGljIG1vYmlsZVVzZXJWYWxpZDogQm9vbGVhbjtcclxuICBwdWJsaWMgZW1haWxVc2VyVmFsaWQ6IEJvb2xlYW47XHJcbiAgbW9iaWxlTm86IHN0cmluZztcclxuICBtb2JpbGVQYXNzd29yZDogc3RyaW5nO1xyXG4gIGVtYWlsSWQ6IHN0cmluZztcclxuICBlbWFpbFBzd2Q6IHN0cmluZztcclxuICBcclxuICB1c2VyID0gbmV3IENyZWF0ZVVzZXIoKTtcclxuICBwdWJsaWMgbW9iaWxlY2hlY2tCb3hBY2NlcHRUZXJtczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBlbWFpbGNoZWNrQm94QWNjZXB0VGVybXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgaXNFbWFpbFB3ZFNlY3VyZTogQm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGlzTW9iaWxlUHdkU2VjdXJlOiBCb29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgc2hvd09ySGlkZU1vYmlsZVB3ZExhYmVsOiBTdHJpbmcgPSBcIlNob3dcIjtcclxuICBwdWJsaWMgc2hvd09ySGlkZUVtYWlsUHdkTGFiZWw6IFN0cmluZyA9IFwiU2hvd1wiO1xyXG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XHJcbiAgcGFnZUVuZFRpbWUgOiBudW1iZXIgPSAwO1xyXG4gIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsIHByaXZhdGUgYXV0aFByb21vTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsIHByaXZhdGUgX3JlZ2lzdHJhdGlvbnNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UpIHtcclxuICAgIHRoaXMubW9iaWxlQ2hlY2tib3hlc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5lbWFpbENoZWNrYm94ZXNDaGVja2VkID0gdHJ1ZTtcclxuICAgIHRoaXMubW9iaWxlQ29udGludWVDbGlja2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLmVtYWlsQ29udGludWVDbGlja2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRydWU7XHJcbiAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pc0VtYWlsUGFzc3dvcmRWYWxpZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzRW1haWxQYXNzd29yZEZpbGxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzVmFsaWRNb2JpbGVOdW1iZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5pc01vYmlsZU51bWJlckZpbGxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRWYWxpZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRGaWxsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5tb2JpbGVVc2VyVmFsaWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZW1haWxVc2VyVmFsaWQgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodGVkRGl2ID0gXCJmcm9tZW1haWxcIjtcclxuICAgICAgdGhpcy5pc01vYmlsZUZvcm0gPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZWdpc3RlclR5cGUgPSBcImVtYWlsXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRlZERpdiA9IFwiZnJvbWVtYWlsXCI7XHJcbiAgICAgIHRoaXMuaXNNb2JpbGVGb3JtID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJUeXBlID0gXCJlbWFpbFwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2JpbGVGb3JtID0gZmIuZ3JvdXAoe1xyXG4gICAgICBcIm1vYmlsZU5vXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcclxuICAgICAgXCJtb2JpbGVQYXNzd29yZFwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5lbWFpbEZvcm0gPSBmYi5ncm91cCh7XHJcbiAgICAgIFwiZW1haWxJZFwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsXV0sXHJcbiAgICAgIFwiZW1haWxQc3dkXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlbW9iaWxlY2hlY2tCb3hBY2NlcHRUZXJtcygpIHtcclxuICAgIC8vICB0aGlzLm1vYmlsZWNoZWNrQm94QWNjZXB0VGVybXMgPSAhIHRoaXMubW9iaWxlY2hlY2tCb3hBY2NlcHRUZXJtcztcclxuICAgIHRoaXMuYWNjZXB0VGVybXNNb2JpbGVDaGVja0JveC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSAhdGhpcy5hY2NlcHRUZXJtc01vYmlsZUNoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcclxuICB9XHJcblxyXG4gICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiBcclxuXHJcbiAgICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICB0aGlzLnBhZ2VUaW1lRGlmZmVyZW5jZSA9IHRoaXMucGFnZUVuZFRpbWUgLSB0aGlzLnBhZ2VTdGFydFRpbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZWVtYWlsY2hlY2tCb3hBY2NlcHRUZXJtcygpIHtcclxuICAgIC8vIHRoaXMuZW1haWxjaGVja0JveEFjY2VwdFRlcm1zID0gIXRoaXMuZW1haWxjaGVja0JveEFjY2VwdFRlcm1zO1xyXG4gICAgdGhpcy5hY2NlcHRUZXJtc0VtYWlsQ2hlY2tCb3gubmF0aXZlRWxlbWVudC5jaGVja2VkID0gIXRoaXMuYWNjZXB0VGVybXNFbWFpbENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcclxuICB9XHJcbiAgLy8gVG8gY2xlYXIgYWxsIHRoZSBmaWVsZHNcclxuICBwdWJsaWMgY2xlYXJGaWVsZHMoKSB7XHJcbiAgICB0aGlzLm1vYmlsZU5vID0gXCJcIjtcclxuICAgIHRoaXMubW9iaWxlUGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgdGhpcy5tb2JpbGVObyA9IFwiXCI7XHJcbiAgICB0aGlzLmVtYWlsSWQgPSBcIlwiO1xyXG4gICAgdGhpcy5lbWFpbFBzd2QgPSBcIlwiO1xyXG4gICAgdGhpcy5tb2JpbGVjaGVja0JveEFjY2VwdFRlcm1zID0gZmFsc2U7XHJcbiAgICB0aGlzLmVtYWlsY2hlY2tCb3hBY2NlcHRUZXJtcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb2JpbGVDaGVja2JveGVzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLmVtYWlsQ2hlY2tib3hlc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5tb2JpbGVDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZW1haWxDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNWYWxpZEVtYWlsID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNFbWFpbEZpbGxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzRW1haWxQYXNzd29yZFZhbGlkID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNFbWFpbFBhc3N3b3JkRmlsbGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNWYWxpZE1vYmlsZU51bWJlciA9IHRydWU7XHJcbiAgICB0aGlzLmlzTW9iaWxlTnVtYmVyRmlsbGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNNb2JpbGVQYXNzd29yZFZhbGlkID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNNb2JpbGVQYXNzd29yZEZpbGxlZCA9IHRydWU7XHJcbiAgICB0aGlzLm1vYmlsZVVzZXJWYWxpZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbWFpbFVzZXJWYWxpZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gT24gY2xpY2sgb2YgY29udGludWUgYnV0dG9uXHJcbiAgcHVibGljIGNyZWF0ZVVzZXIodHlwZSwgaWQsIHB3ZCkge1xyXG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwicmVnaXN0ZXJlZC11bi1hdXRoXCIpO1xyXG4gICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gY29ubmVjdGl2aXR5LmdldENvbm5lY3Rpb25UeXBlKCk7XHJcbiAgICBzd2l0Y2ggKGNvbm5lY3Rpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5zaG93VG9hc3RNZXNzYWdlKFwiTm8gaW50ZXJuZXQgYXZhaWxhYmxlLCBwbGVhc2UgY29ubmVjdCEhXCIsIFwibG9uZ2VyXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRpc21pc3NLZXlCb2FyZCgpO1xyXG5cclxuICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImZpcnN0TmFtZVwiLCBcIlwiKTtcclxuICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImxhc3ROYW1lXCIsIFwiXCIpO1xyXG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwiZG9iXCIsIFwiXCIpO1xyXG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwiZW1haWxBZGRyZXNzXCIsIFwiXCIpO1xyXG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwibW9iaWxlTnVtXCIsIFwiXCIpO1xyXG5cclxuICAgIGlmICh0eXBlID09PSBcIm1vYmlsZU5vXCIpIHtcclxuICAgICAgdGhpcy5tb2JpbGVDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmlzTW9iaWxlTnVtYmVyRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGlkKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTnVtYmVyID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlclZhbGlkYXRvcihpZCk7XHJcbiAgICAgIHRoaXMuaXNNb2JpbGVQYXNzd29yZFZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnBhc3N3b3JkUGF0dGVyblZhbGlkYXRvcihwd2QpO1xyXG4gICAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IocHdkKTtcclxuICAgICAgdGhpcy5tb2JpbGVDaGVja2JveGVzQ2hlY2tlZCA9IHRoaXMuYWNjZXB0VGVybXNNb2JpbGVDaGVja0JveC5uYXRpdmVFbGVtZW50LmNoZWNrZWQ7XHJcbiAgICAgIGlmICh0aGlzLmlzTW9iaWxlTnVtYmVyRmlsbGVkICYmIHRoaXMuaXNWYWxpZE1vYmlsZU51bWJlciAmJiB0aGlzLmlzTW9iaWxlUGFzc3dvcmRWYWxpZCAmJiB0aGlzLmlzTW9iaWxlUGFzc3dvcmRGaWxsZWQgJiYgdGhpcy5tb2JpbGVDaGVja2JveGVzQ2hlY2tlZCkge1xyXG4gICAgICAgIHRoaXMubW9iaWxlVXNlclZhbGlkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5tb2JpbGVVc2VyVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT09IFwiZW1haWxJZFwiKSB7XHJcbiAgICAgIHRoaXMuZW1haWxDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoaWQpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5lbWFpbE1hdGNoVmFsaWRhdG9yKGlkKTtcclxuICAgICAgdGhpcy5pc0VtYWlsUGFzc3dvcmRWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5wYXNzd29yZFBhdHRlcm5WYWxpZGF0b3IocHdkKTtcclxuICAgICAgdGhpcy5pc0VtYWlsUGFzc3dvcmRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IocHdkKTtcclxuICAgICAgdGhpcy5lbWFpbENoZWNrYm94ZXNDaGVja2VkID0gdGhpcy5hY2NlcHRUZXJtc0VtYWlsQ2hlY2tCb3gubmF0aXZlRWxlbWVudC5jaGVja2VkO1xyXG4gICAgICBpZiAodGhpcy5pc0VtYWlsRmlsbGVkICYmIHRoaXMuaXNWYWxpZEVtYWlsICYmIHRoaXMuaXNFbWFpbFBhc3N3b3JkVmFsaWQgJiYgdGhpcy5pc0VtYWlsUGFzc3dvcmRGaWxsZWQgJiYgdGhpcy5lbWFpbENoZWNrYm94ZXNDaGVja2VkKVxyXG4gICAgICAgIHRoaXMuZW1haWxVc2VyVmFsaWQgPSB0cnVlO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5lbWFpbFVzZXJWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gVG8gY2hlY2sgaWYgdGhlIGZvcm0gaXMgdmFsaWQgYW5kIHRoZW4gY29udGludWVcclxuICAgIGlmICh0aGlzLm1vYmlsZVVzZXJWYWxpZCB8fCB0aGlzLmVtYWlsVXNlclZhbGlkKSB7XHJcbiAgICAgIFxyXG4gICAgICBsb2FkZXIuc2hvdygpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyVHlwZS0tXCIgKyBDcmVhdGVVc2VyKTtcclxuICAgICAgaWYgKHRoaXMucmVnaXN0ZXJUeXBlID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgICAgdGhpcy51c2VyLnJlZ3R5cGUgPSBcIk1PQklMRVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJUeXBlID09PSBcImVtYWlsXCIpIHtcclxuICAgICAgICB0aGlzLnVzZXIucmVndHlwZSA9IFwiRU1BSUxcIjtcclxuICAgICAgfVxyXG4gICAgICAvLyB0aGlzLnVzZXIucmVndHlwZSA9IHRoaXMucmVnaXN0ZXJUeXBlO1xyXG4gICAgICB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlID0gdGhpcy5yZWdpc3RlclR5cGU7XHJcbiAgICAgIHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UucmVnaXN0cmF0aW9uX3R5cGUgPSB0aGlzLnJlZ2lzdGVyVHlwZTtcclxuXHJcbiAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5tb2JpbGVVc2VyVmFsaWQpIHtcclxuICAgICAgICB0aGlzLnVzZXIudXNlcmlkID0gdGhpcy5tb2JpbGVObztcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHkgPSB0aGlzLm1vYmlsZU5vO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9yZWdfcGFzc3dvcmQgPSB0aGlzLm1vYmlsZVBhc3N3b3JkO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuZW1haWxVc2VyVmFsaWQpIHtcclxuICAgICAgICB0aGlzLnVzZXIudXNlcmlkID0gdGhpcy5lbWFpbElkO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eSA9IHRoaXMuZW1haWxJZDtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfcmVnX3Bhc3N3b3JkID0gdGhpcy5lbWFpbFBzd2Q7XHJcbiAgICAgIH1cclxuICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9IFwiUk5WXCI7XHJcbiAgICAgICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2dsb2JhbHMuaXNBdXRoQ2FuY2VsbGVkPWZhbHNlO1xyXG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcmVnX2hvbWVcIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy51c2VyLnVzZXJpZF0sIHtcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIGxvYWRlci5oaWRlKCk7XHJcblxyXG4gICAgICAvLyB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy51c2VyKVxyXG4gICAgICAvLyAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzcy0tLVwiKTtcclxuICAgICAgLy8gICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9IFwiUk5WXCI7XHJcbiAgICAgIC8vICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgLy8gdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XHJcbiAgICAgIC8vIHRoaXMuX2dsb2JhbHMuaXNBdXRoQ2FuY2VsbGVkPWZhbHNlO1xyXG4gICAgICAvLyB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcmVnX2hvbWVcIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy51c2VyLnVzZXJpZF0sIHtcclxuICAgICAgLy8gICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgIFxyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vICAgZXJyb3IgPT4ge1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcmxsbC0tLVwiKTtcclxuICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgLy8gICB9KTtcclxuICAgICAgdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS51c2VyX25hbWUgPSB0aGlzLnVzZXIudXNlcmlkO1xyXG4gICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHkgPSB0aGlzLnVzZXIudXNlcmlkO1xyXG4gICAgICBjb25zb2xlLmRpcih0aGlzLnVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBUbyBzd2l0Y2ggZnJvbSBtb2JpbGUgZm9ybSB0byBlbWFpbCBmb3JtXHJcbiAgcHVibGljIHN3aXRjaFZpZXcoYXJnKSB7XHJcbiAgICB0aGlzLmNsZWFyRmllbGRzKCk7XHJcbiAgICBpZiAoIXRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XHJcbiAgICAgIGlmIChhcmcgPT09IFwiZnJvbW1vYmlsZVwiKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlclR5cGUgPSBcIm1vYmlsZVwiO1xyXG4gICAgICAgIHRoaXMuaXNNb2JpbGVGb3JtID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRGl2ID0gYXJnO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGFyZyA9PT0gXCJmcm9tZW1haWxcIikge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlID0gXCJlbWFpbFwiO1xyXG4gICAgICAgIHRoaXMuaXNNb2JpbGVGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZERpdiA9IGFyZztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luKCl7XHJcbiAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAgIH0pO1xyXG4gIH1cclxuICAvLyBiYWNrIGJ1dHRvblxyXG4gIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc21pc3NLZXlCb2FyZCgpIHtcclxuICAgIGxldCBtb2JObyA9IDxUZXh0RmllbGQ+dGhpcy5tb2JOby5uYXRpdmVFbGVtZW50O1xyXG4gICAgbW9iTm8uZGlzbWlzc1NvZnRJbnB1dCgpO1xyXG5cclxuICAgIGxldCBtb2JQd2QgPSA8VGV4dEZpZWxkPnRoaXMubW9iUHdkLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBtb2JQd2QuZGlzbWlzc1NvZnRJbnB1dCgpO1xyXG5cclxuICAgIGxldCBlbWFpbCA9IDxUZXh0RmllbGQ+dGhpcy5lbWFpbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgbW9iTm8uZGlzbWlzc1NvZnRJbnB1dCgpO1xyXG5cclxuICAgIGxldCBlbWFpbFB3ZCA9IDxUZXh0RmllbGQ+dGhpcy5lbWFpbFB3ZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgZW1haWxQd2QuZGlzbWlzc1NvZnRJbnB1dCgpO1xyXG4gIH1cclxuICBwdWJsaWMgdmFsaWRDaGVjayhhcmcsIHR5cGUpIHtcclxuICAgIGlmIChhcmcgIT09IHVuZGVmaW5lZCAmJiBhcmcgIT09IFwiXCIpIHtcclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcIm1vYmlsZVwiOlxyXG4gICAgICAgICAgdGhpcy5pc01vYmlsZU51bWJlckZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTnVtYmVyID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlclZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIm1wYXNzd29yZFwiOlxyXG4gICAgICAgICAgdGhpcy5pc01vYmlsZVBhc3N3b3JkVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UucGFzc3dvcmRQYXR0ZXJuVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJlbWFpbElkXCI6XHJcbiAgICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgIHRoaXMuaXNWYWxpZEVtYWlsID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmVtYWlsTWF0Y2hWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJlcGFzc3dvcmRcIjpcclxuICAgICAgICAgIHRoaXMuaXNFbWFpbFBhc3N3b3JkVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UucGFzc3dvcmRQYXR0ZXJuVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICB0aGlzLmlzRW1haWxQYXNzd29yZEZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHNob3dPckhpZGVFbWFpbFBhc3N3b3JkKCkge1xyXG4gICAgdGhpcy5pc0VtYWlsUHdkU2VjdXJlID0gIXRoaXMuaXNFbWFpbFB3ZFNlY3VyZTtcclxuICAgIGlmICh0aGlzLmlzRW1haWxQd2RTZWN1cmUpIHtcclxuICAgICAgdGhpcy5zaG93T3JIaWRlRW1haWxQd2RMYWJlbCA9IFwiU2hvd1wiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93T3JIaWRlRW1haWxQd2RMYWJlbCA9IFwiSGlkZVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgIHRoaXMucmV0YWluQ3Vyc29yUG9zRm9yRW1haWxQd2RGaWVsZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvd09ySGlkZU1vYmlsZVBhc3N3b3JkKCkge1xyXG4gICAgdGhpcy5pc01vYmlsZVB3ZFNlY3VyZSA9ICF0aGlzLmlzTW9iaWxlUHdkU2VjdXJlO1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGVQd2RTZWN1cmUpIHtcclxuICAgICAgdGhpcy5zaG93T3JIaWRlTW9iaWxlUHdkTGFiZWwgPSBcIlNob3dcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd09ySGlkZU1vYmlsZVB3ZExhYmVsID0gXCJIaWRlXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgdGhpcy5yZXRhaW5DdXJzb3JQb3NGb3JNb2JpbGVQd2RGaWVsZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldGFpbkN1cnNvclBvc0Zvck1vYmlsZVB3ZEZpZWxkKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGFuZHJvaWQudGV4dC5TZWxlY3Rpb24uc2V0U2VsZWN0aW9uKFxyXG4gICAgICAgIHRoaXMubW9iUHdkLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5nZXRUZXh0KCksXHJcbiAgICAgICAgdGhpcy5tb2JQd2QubmF0aXZlRWxlbWVudC5hbmRyb2lkLmxlbmd0aCgpXHJcbiAgICAgICk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXRhaW5DdXJzb3JQb3NGb3JFbWFpbFB3ZEZpZWxkKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGFuZHJvaWQudGV4dC5TZWxlY3Rpb24uc2V0U2VsZWN0aW9uKFxyXG4gICAgICAgIHRoaXMuZW1haWxQd2QubmF0aXZlRWxlbWVudC5hbmRyb2lkLmdldFRleHQoKSxcclxuICAgICAgICB0aGlzLmVtYWlsUHdkLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5sZW5ndGgoKVxyXG4gICAgICApO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG4gIGdvVG9Nb2JQd2QoKSB7XHJcbiAgICB0aGlzLm1vYlB3ZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG4gIGdvVG9FbWFpbFB3ZCgpIHtcclxuICAgIHRoaXMuZW1haWxQd2QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19