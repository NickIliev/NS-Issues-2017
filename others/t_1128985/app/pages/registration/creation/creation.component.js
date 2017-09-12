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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtHO0FBQ2xHLDBDQUF5QztBQUd6Qyx3Q0FBdUg7QUFDdkgsMEZBQXdGO0FBQ3hGLHNEQUErRDtBQUkvRCxnRUFBOEQ7QUFDOUQsNERBQW1EO0FBRW5ELG1FQUE2RTtBQUM3RSxzQ0FBaUQ7QUFDakQsaUZBQWdFO0FBQ2hFLGlEQUFpRDtBQUNqRCx3REFBMEQ7QUFFMUQsMkNBQTZDO0FBQzdDLGtEQUFvRDtBQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFTcEMsSUFBYSxpQkFBaUI7SUFrRDVCLDJCQUEyQixNQUFjLEVBQVMsUUFBaUIsRUFBVSxjQUFrQyxFQUFVLEtBQXVCLEVBQVUsRUFBZSxFQUFVLGdCQUFrQyxFQUFVLHNCQUE2QyxFQUFVLG9CQUF5QztRQUFwUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQTdDL1QsVUFBSyxHQUFXLFVBQVUsQ0FBQztRQWtDM0IsU0FBSSxHQUFHLElBQUksK0JBQVUsRUFBRSxDQUFDO1FBQ2pCLDhCQUF5QixHQUFZLEtBQUssQ0FBQztRQUMzQyw2QkFBd0IsR0FBWSxLQUFLLENBQUM7UUFDMUMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQUNsQyw2QkFBd0IsR0FBVyxNQUFNLENBQUM7UUFDMUMsNEJBQXVCLEdBQVcsTUFBTSxDQUFDO1FBQzlDLGtCQUFhLEdBQVksQ0FBQyxDQUFDO1FBQzdCLGdCQUFXLEdBQVksQ0FBQyxDQUFDO1FBQ3pCLHVCQUFrQixHQUFZLENBQUMsQ0FBQztRQUc5QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3pCLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUNELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFOUMsQ0FBQztJQUVNLDJEQUErQixHQUF0QztRQUNFLHNFQUFzRTtRQUN0RSxJQUFJLENBQUMseUJBQXlCLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQy9HLENBQUM7SUFFQSwyQ0FBZSxHQUFmO1FBR0csSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFFbEUsQ0FBQztJQUVNLDBEQUE4QixHQUFyQztRQUNFLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQzdHLENBQUM7SUFDRCwwQkFBMEI7SUFDbkIsdUNBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDdEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsOEJBQThCO0lBQ3ZCLHNDQUFVLEdBQWpCLFVBQWtCLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRztRQUM3QixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUMzRSxJQUFJLGNBQWMsR0FBRyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0RCxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHlDQUF5QyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRixNQUFNLENBQUM7WUFDVDtnQkFDRSxLQUFLLENBQUM7UUFDVixDQUFDO1FBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEQsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO2dCQUN2SixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSTtnQkFDRixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUNsRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUM7Z0JBQ3BJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUNELGtEQUFrRDtRQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBRWhELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsK0JBQVUsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1lBQy9CLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDOUIsQ0FBQztZQUNELHlDQUF5QztZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFFaEUsSUFBSSxPQUFPLEdBQUc7Z0JBQ1osT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO2FBQzdCLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3hELENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNuRCxDQUFDO1lBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBQyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDN0csUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWQsa0RBQWtEO1lBQ2xELDJCQUEyQjtZQUMzQixpQ0FBaUM7WUFDakMsd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4QywwQ0FBMEM7WUFDMUMsdUNBQXVDO1lBQ3ZDLG1IQUFtSDtZQUNuSCxvQkFBb0I7WUFDcEIsTUFBTTtZQUNOLGlCQUFpQjtZQUVqQixPQUFPO1lBQ1AsZUFBZTtZQUNmLGtDQUFrQztZQUNsQywwQkFBMEI7WUFDMUIsUUFBUTtZQUNSLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNILENBQUM7SUFDRCwyQ0FBMkM7SUFDcEMsc0NBQVUsR0FBakIsVUFBa0IsR0FBRztRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO2dCQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7WUFDNUIsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztZQUM1QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxpQ0FBSyxHQUFaO1FBQ0csSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxjQUFjO0lBQ1Asa0NBQU0sR0FBYjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sMkNBQWUsR0FBdEI7UUFDRSxJQUFJLEtBQUssR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNoRCxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV6QixJQUFJLE1BQU0sR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUNsRCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUUxQixJQUFJLEtBQUssR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNoRCxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV6QixJQUFJLFFBQVEsR0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUN0RCxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ00sc0NBQVUsR0FBakIsVUFBa0IsR0FBRyxFQUFFLElBQUk7UUFDekIsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEtBQUssUUFBUTtvQkFDWCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsRixLQUFLLENBQUM7Z0JBQ1IsS0FBSyxXQUFXO29CQUNkLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BGLEtBQUssQ0FBQztnQkFDUixLQUFLLFNBQVM7b0JBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6RSxLQUFLLENBQUM7Z0JBQ1IsS0FBSyxXQUFXO29CQUNkLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25GLEtBQUssQ0FBQztZQUNWLENBQUM7UUFDSCxDQUFDO0lBRUgsQ0FBQztJQUlELG1EQUF1QixHQUF2QjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxNQUFNLENBQUM7UUFDeEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLHVCQUF1QixHQUFHLE1BQU0sQ0FBQztRQUN4QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7UUFDekMsQ0FBQztJQUNILENBQUM7SUFFRCxvREFBd0IsR0FBeEI7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7UUFDekMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQzFDLENBQUM7SUFDSCxDQUFDO0lBRU0sNERBQWdDLEdBQXZDO1FBQUEsaUJBT0M7UUFOQyxVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQ2pDLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUMzQyxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVNLDJEQUErQixHQUF0QztRQUFBLGlCQU9DO1FBTkMsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUNqQyxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQzdDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FDN0MsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFDRCxzQ0FBVSxHQUFWO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNELHdDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUgsd0JBQUM7QUFBRCxDQUFDLEFBaldELElBaVdDO0FBL1ZpQztJQUEvQixnQkFBUyxDQUFDLG1CQUFtQixDQUFDOzhCQUFLLGlCQUFVOzZDQUFDO0FBSTdCO0lBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDOzhCQUE0QixpQkFBVTtvRUFBQztBQUN0QztJQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQzs4QkFBMEIsaUJBQVU7a0VBQUM7QUFDcEM7SUFBakIsZ0JBQVMsQ0FBQyxLQUFLLENBQUM7OEJBQXlCLGlCQUFVO2lFQUFDO0FBQ25DO0lBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDOzhCQUEyQixpQkFBVTttRUFBQztBQUNuQztJQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFBUSxpQkFBVTtnREFBQztBQUNqQjtJQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs4QkFBUyxpQkFBVTtpREFBQztBQUNwQjtJQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFBUSxpQkFBVTtnREFBQztBQUNmO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFXLGlCQUFVO21EQUFDO0FBYmpDLGlCQUFpQjtJQVI3QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7UUFDbEMsU0FBUyxFQUFFLENBQUMsOENBQXFCLENBQUM7S0FDbkMsQ0FBQztxQ0FvRG1DLGVBQU0sRUFBbUIsZ0JBQU8sRUFBMEIsNEJBQWtCLEVBQWlCLHVCQUFnQixFQUFjLG1CQUFXLEVBQTRCLHlCQUFnQixFQUFrQyw4Q0FBcUIsRUFBZ0MsMENBQW1CO0dBbERwVCxpQkFBaUIsQ0FpVzdCO0FBaldZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENoZWNrQm94IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jaGVja2JveFwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDcmVhdGVVc2VyIH0gZnJvbSBcIi4uL3JlZ2lzdHJhdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRlUHJvbW9Db21wb25lbnQgfSBmcm9tIFwiLi4vYXV0aGVudGljYXRlUHJvbW8vYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcbmltcG9ydCAqIGFzIGNvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm1iLWNyZWF0ZVwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NyZWF0aW9uLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi4vcmVnaXN0cmF0aW9uLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRm9ybVZhbGlkYXRpb25TZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIENyZWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiBcbiAgQFZpZXdDaGlsZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpIGFjOiBFbGVtZW50UmVmO1xuIFxuXG4gIHRpdGxlOiBzdHJpbmcgPSBcIlJlZ2lzdGVyXCI7XG4gIEBWaWV3Q2hpbGQoXCJDQjFcIikgYWNjZXB0VGVybXNNb2JpbGVDaGVja0JveDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIkNCMlwiKSBtYXJrZXRpbmdNb2JpbGVDaGVja0JveDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIkNCNFwiKSBtYXJrZXRpbmdFbWFpbENoZWNrQm94OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiQ0IzXCIpIGFjY2VwdFRlcm1zRW1haWxDaGVja0JveDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm1vYk5vXCIpIG1vYk5vOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibW9iUHdkXCIpIG1vYlB3ZDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImVtYWlsXCIpIGVtYWlsOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiZW1haWxQd2RcIikgZW1haWxQd2Q6IEVsZW1lbnRSZWY7XG5cbiAgcHVibGljIGhpZ2hsaWdodGVkRGl2OiBzdHJpbmc7XG4gIHB1YmxpYyBpc01vYmlsZUZvcm06IEJvb2xlYW47XG4gIHB1YmxpYyBtb2JpbGVGb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyBlbWFpbEZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIG1vYmlsZUNoZWNrYm94ZXNDaGVja2VkOiBCb29sZWFuO1xuICBwdWJsaWMgZW1haWxDaGVja2JveGVzQ2hlY2tlZDogQm9vbGVhbjtcbiAgcHVibGljIG1vYmlsZUNvbnRpbnVlQ2xpY2tlZDogQm9vbGVhbjtcbiAgcHVibGljIGVtYWlsQ29udGludWVDbGlja2VkOiBCb29sZWFuO1xuICBwdWJsaWMgaXNWYWxpZEVtYWlsOiBCb29sZWFuO1xuICBwdWJsaWMgaXNFbWFpbEZpbGxlZDogQm9vbGVhbjtcbiAgcHVibGljIGlzRW1haWxQYXNzd29yZFZhbGlkOiBCb29sZWFuO1xuICBwdWJsaWMgaXNFbWFpbFBhc3N3b3JkRmlsbGVkOiBCb29sZWFuO1xuICBwdWJsaWMgaXNWYWxpZE1vYmlsZU51bWJlcjogQm9vbGVhbjtcbiAgcHVibGljIGlzTW9iaWxlTnVtYmVyRmlsbGVkOiBCb29sZWFuO1xuICBwdWJsaWMgaXNNb2JpbGVQYXNzd29yZFZhbGlkOiBCb29sZWFuO1xuICBwdWJsaWMgaXNNb2JpbGVQYXNzd29yZEZpbGxlZDogQm9vbGVhbjtcbiAgcHVibGljIHJlZ2lzdGVyVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgbW9iaWxlVXNlclZhbGlkOiBCb29sZWFuO1xuICBwdWJsaWMgZW1haWxVc2VyVmFsaWQ6IEJvb2xlYW47XG4gIG1vYmlsZU5vOiBzdHJpbmc7XG4gIG1vYmlsZVBhc3N3b3JkOiBzdHJpbmc7XG4gIGVtYWlsSWQ6IHN0cmluZztcbiAgZW1haWxQc3dkOiBzdHJpbmc7XG4gIFxuICB1c2VyID0gbmV3IENyZWF0ZVVzZXIoKTtcbiAgcHVibGljIG1vYmlsZWNoZWNrQm94QWNjZXB0VGVybXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGVtYWlsY2hlY2tCb3hBY2NlcHRUZXJtczogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNFbWFpbFB3ZFNlY3VyZTogQm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBpc01vYmlsZVB3ZFNlY3VyZTogQm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBzaG93T3JIaWRlTW9iaWxlUHdkTGFiZWw6IFN0cmluZyA9IFwiU2hvd1wiO1xuICBwdWJsaWMgc2hvd09ySGlkZUVtYWlsUHdkTGFiZWw6IFN0cmluZyA9IFwiU2hvd1wiO1xuICAgIHBhZ2VTdGFydFRpbWUgOiBudW1iZXIgPSAwO1xuICBwYWdlRW5kVGltZSA6IG51bWJlciA9IDA7XG4gIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscywgcHJpdmF0ZSBhdXRoUHJvbW9Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIF9mb3JtVmFsaWRhdGlvblNlcnZpY2U6IEZvcm1WYWxpZGF0aW9uU2VydmljZSwgcHJpdmF0ZSBfcmVnaXN0cmF0aW9uc2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSkge1xuICAgIHRoaXMubW9iaWxlQ2hlY2tib3hlc0NoZWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1haWxDaGVja2JveGVzQ2hlY2tlZCA9IHRydWU7XG4gICAgdGhpcy5tb2JpbGVDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtYWlsQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy5pc1ZhbGlkRW1haWwgPSB0cnVlO1xuICAgIHRoaXMuaXNFbWFpbEZpbGxlZCA9IHRydWU7XG4gICAgdGhpcy5pc0VtYWlsUGFzc3dvcmRWYWxpZCA9IHRydWU7XG4gICAgdGhpcy5pc0VtYWlsUGFzc3dvcmRGaWxsZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNWYWxpZE1vYmlsZU51bWJlciA9IHRydWU7XG4gICAgdGhpcy5pc01vYmlsZU51bWJlckZpbGxlZCA9IHRydWU7XG4gICAgdGhpcy5pc01vYmlsZVBhc3N3b3JkVmFsaWQgPSB0cnVlO1xuICAgIHRoaXMuaXNNb2JpbGVQYXNzd29yZEZpbGxlZCA9IHRydWU7XG4gICAgdGhpcy5tb2JpbGVVc2VyVmFsaWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtYWlsVXNlclZhbGlkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodGVkRGl2ID0gXCJmcm9tZW1haWxcIjtcbiAgICAgIHRoaXMuaXNNb2JpbGVGb3JtID0gZmFsc2U7XG4gICAgICB0aGlzLnJlZ2lzdGVyVHlwZSA9IFwiZW1haWxcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodGVkRGl2ID0gXCJmcm9tZW1haWxcIjtcbiAgICAgIHRoaXMuaXNNb2JpbGVGb3JtID0gZmFsc2U7XG4gICAgICB0aGlzLnJlZ2lzdGVyVHlwZSA9IFwiZW1haWxcIjtcbiAgICB9XG4gICAgdGhpcy5tb2JpbGVGb3JtID0gZmIuZ3JvdXAoe1xuICAgICAgXCJtb2JpbGVOb1wiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsXV0sXG4gICAgICBcIm1vYmlsZVBhc3N3b3JkXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxuICAgIH0pO1xuICAgIHRoaXMuZW1haWxGb3JtID0gZmIuZ3JvdXAoe1xuICAgICAgXCJlbWFpbElkXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICAgIFwiZW1haWxQc3dkXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICB9KTtcblxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgXG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlbW9iaWxlY2hlY2tCb3hBY2NlcHRUZXJtcygpIHtcbiAgICAvLyAgdGhpcy5tb2JpbGVjaGVja0JveEFjY2VwdFRlcm1zID0gISB0aGlzLm1vYmlsZWNoZWNrQm94QWNjZXB0VGVybXM7XG4gICAgdGhpcy5hY2NlcHRUZXJtc01vYmlsZUNoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9ICF0aGlzLmFjY2VwdFRlcm1zTW9iaWxlQ2hlY2tCb3gubmF0aXZlRWxlbWVudC5jaGVja2VkO1xuICB9XG5cbiAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiBcblxuICAgICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xuXG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlZW1haWxjaGVja0JveEFjY2VwdFRlcm1zKCkge1xuICAgIC8vIHRoaXMuZW1haWxjaGVja0JveEFjY2VwdFRlcm1zID0gIXRoaXMuZW1haWxjaGVja0JveEFjY2VwdFRlcm1zO1xuICAgIHRoaXMuYWNjZXB0VGVybXNFbWFpbENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9ICF0aGlzLmFjY2VwdFRlcm1zRW1haWxDaGVja0JveC5uYXRpdmVFbGVtZW50LmNoZWNrZWQ7XG4gIH1cbiAgLy8gVG8gY2xlYXIgYWxsIHRoZSBmaWVsZHNcbiAgcHVibGljIGNsZWFyRmllbGRzKCkge1xuICAgIHRoaXMubW9iaWxlTm8gPSBcIlwiO1xuICAgIHRoaXMubW9iaWxlUGFzc3dvcmQgPSBcIlwiO1xuICAgIHRoaXMubW9iaWxlTm8gPSBcIlwiO1xuICAgIHRoaXMuZW1haWxJZCA9IFwiXCI7XG4gICAgdGhpcy5lbWFpbFBzd2QgPSBcIlwiO1xuICAgIHRoaXMubW9iaWxlY2hlY2tCb3hBY2NlcHRUZXJtcyA9IGZhbHNlO1xuICAgIHRoaXMuZW1haWxjaGVja0JveEFjY2VwdFRlcm1zID0gZmFsc2U7XG4gICAgdGhpcy5tb2JpbGVDaGVja2JveGVzQ2hlY2tlZCA9IHRydWU7XG4gICAgdGhpcy5lbWFpbENoZWNrYm94ZXNDaGVja2VkID0gdHJ1ZTtcbiAgICB0aGlzLm1vYmlsZUNvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1haWxDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRydWU7XG4gICAgdGhpcy5pc0VtYWlsRmlsbGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzRW1haWxQYXNzd29yZFZhbGlkID0gdHJ1ZTtcbiAgICB0aGlzLmlzRW1haWxQYXNzd29yZEZpbGxlZCA9IHRydWU7XG4gICAgdGhpcy5pc1ZhbGlkTW9iaWxlTnVtYmVyID0gdHJ1ZTtcbiAgICB0aGlzLmlzTW9iaWxlTnVtYmVyRmlsbGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRWYWxpZCA9IHRydWU7XG4gICAgdGhpcy5pc01vYmlsZVBhc3N3b3JkRmlsbGVkID0gdHJ1ZTtcbiAgICB0aGlzLm1vYmlsZVVzZXJWYWxpZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1haWxVc2VyVmFsaWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIE9uIGNsaWNrIG9mIGNvbnRpbnVlIGJ1dHRvblxuICBwdWJsaWMgY3JlYXRlVXNlcih0eXBlLCBpZCwgcHdkKSB7XG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwicmVnaXN0ZXJlZC11bi1hdXRoXCIpO1xuICAgIGxldCBjb25uZWN0aW9uVHlwZSA9IGNvbm5lY3Rpdml0eS5nZXRDb25uZWN0aW9uVHlwZSgpO1xuICAgIHN3aXRjaCAoY29ubmVjdGlvblR5cGUpIHtcbiAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuc2hvd1RvYXN0TWVzc2FnZShcIk5vIGludGVybmV0IGF2YWlsYWJsZSwgcGxlYXNlIGNvbm5lY3QhIVwiLCBcImxvbmdlclwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5kaXNtaXNzS2V5Qm9hcmQoKTtcblxuICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImZpcnN0TmFtZVwiLCBcIlwiKTtcbiAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJsYXN0TmFtZVwiLCBcIlwiKTtcbiAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJkb2JcIiwgXCJcIik7XG4gICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwiZW1haWxBZGRyZXNzXCIsIFwiXCIpO1xuICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcIm1vYmlsZU51bVwiLCBcIlwiKTtcblxuICAgIGlmICh0eXBlID09PSBcIm1vYmlsZU5vXCIpIHtcbiAgICAgIHRoaXMubW9iaWxlQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNNb2JpbGVOdW1iZXJGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoaWQpO1xuICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTnVtYmVyID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlclZhbGlkYXRvcihpZCk7XG4gICAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5wYXNzd29yZFBhdHRlcm5WYWxpZGF0b3IocHdkKTtcbiAgICAgIHRoaXMuaXNNb2JpbGVQYXNzd29yZEZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihwd2QpO1xuICAgICAgdGhpcy5tb2JpbGVDaGVja2JveGVzQ2hlY2tlZCA9IHRoaXMuYWNjZXB0VGVybXNNb2JpbGVDaGVja0JveC5uYXRpdmVFbGVtZW50LmNoZWNrZWQ7XG4gICAgICBpZiAodGhpcy5pc01vYmlsZU51bWJlckZpbGxlZCAmJiB0aGlzLmlzVmFsaWRNb2JpbGVOdW1iZXIgJiYgdGhpcy5pc01vYmlsZVBhc3N3b3JkVmFsaWQgJiYgdGhpcy5pc01vYmlsZVBhc3N3b3JkRmlsbGVkICYmIHRoaXMubW9iaWxlQ2hlY2tib3hlc0NoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5tb2JpbGVVc2VyVmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAgICB0aGlzLm1vYmlsZVVzZXJWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSBcImVtYWlsSWRcIikge1xuICAgICAgdGhpcy5lbWFpbENvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoaWQpO1xuICAgICAgdGhpcy5pc1ZhbGlkRW1haWwgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZW1haWxNYXRjaFZhbGlkYXRvcihpZCk7XG4gICAgICB0aGlzLmlzRW1haWxQYXNzd29yZFZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnBhc3N3b3JkUGF0dGVyblZhbGlkYXRvcihwd2QpO1xuICAgICAgdGhpcy5pc0VtYWlsUGFzc3dvcmRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IocHdkKTtcbiAgICAgIHRoaXMuZW1haWxDaGVja2JveGVzQ2hlY2tlZCA9IHRoaXMuYWNjZXB0VGVybXNFbWFpbENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcbiAgICAgIGlmICh0aGlzLmlzRW1haWxGaWxsZWQgJiYgdGhpcy5pc1ZhbGlkRW1haWwgJiYgdGhpcy5pc0VtYWlsUGFzc3dvcmRWYWxpZCAmJiB0aGlzLmlzRW1haWxQYXNzd29yZEZpbGxlZCAmJiB0aGlzLmVtYWlsQ2hlY2tib3hlc0NoZWNrZWQpXG4gICAgICAgIHRoaXMuZW1haWxVc2VyVmFsaWQgPSB0cnVlO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLmVtYWlsVXNlclZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIFRvIGNoZWNrIGlmIHRoZSBmb3JtIGlzIHZhbGlkIGFuZCB0aGVuIGNvbnRpbnVlXG4gICAgaWYgKHRoaXMubW9iaWxlVXNlclZhbGlkIHx8IHRoaXMuZW1haWxVc2VyVmFsaWQpIHtcbiAgICAgIFxuICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJUeXBlLS1cIiArIENyZWF0ZVVzZXIpO1xuICAgICAgaWYgKHRoaXMucmVnaXN0ZXJUeXBlID09PSBcIm1vYmlsZVwiKSB7XG4gICAgICAgIHRoaXMudXNlci5yZWd0eXBlID0gXCJNT0JJTEVcIjtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJUeXBlID09PSBcImVtYWlsXCIpIHtcbiAgICAgICAgdGhpcy51c2VyLnJlZ3R5cGUgPSBcIkVNQUlMXCI7XG4gICAgICB9XG4gICAgICAvLyB0aGlzLnVzZXIucmVndHlwZSA9IHRoaXMucmVnaXN0ZXJUeXBlO1xuICAgICAgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSA9IHRoaXMucmVnaXN0ZXJUeXBlO1xuICAgICAgdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS5yZWdpc3RyYXRpb25fdHlwZSA9IHRoaXMucmVnaXN0ZXJUeXBlO1xuXG4gICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5tb2JpbGVVc2VyVmFsaWQpIHtcbiAgICAgICAgdGhpcy51c2VyLnVzZXJpZCA9IHRoaXMubW9iaWxlTm87XG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eSA9IHRoaXMubW9iaWxlTm87XG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9yZWdfcGFzc3dvcmQgPSB0aGlzLm1vYmlsZVBhc3N3b3JkO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5lbWFpbFVzZXJWYWxpZCkge1xuICAgICAgICB0aGlzLnVzZXIudXNlcmlkID0gdGhpcy5lbWFpbElkO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHkgPSB0aGlzLmVtYWlsSWQ7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9yZWdfcGFzc3dvcmQgPSB0aGlzLmVtYWlsUHN3ZDtcbiAgICAgIH1cbiAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBcIlJOVlwiO1xuICAgICAgICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLl9nbG9iYWxzLmlzQXV0aENhbmNlbGxlZD1mYWxzZTtcbiAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9yZWdfaG9tZVwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLnVzZXIudXNlcmlkXSwge1xuICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgbG9hZGVyLmhpZGUoKTtcblxuICAgICAgLy8gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS5jcmVhdGVVc2VyKHRoaXMudXNlcilcbiAgICAgIC8vICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzcy0tLVwiKTtcbiAgICAgIC8vICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBcIlJOVlwiO1xuICAgICAgLy8gICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICAvLyB0aGlzLl9nbG9iYWxzLmlzQXV0aENhbmNlbGxlZD1mYWxzZTtcbiAgICAgIC8vIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9yZWdfaG9tZVwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLnVzZXIudXNlcmlkXSwge1xuICAgICAgLy8gICBhbmltYXRlZDogZmFsc2VcbiAgICAgIC8vIH0pO1xuICAgICAgLy8gbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgIFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICBlcnJvciA9PiB7XG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcmxsbC0tLVwiKTtcbiAgICAgIC8vICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAvLyAgIH0pO1xuICAgICAgdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS51c2VyX25hbWUgPSB0aGlzLnVzZXIudXNlcmlkO1xuICAgICAgdGhpcy5fZ2xvYmFscy51c2VyX2lkZW50aXR5ID0gdGhpcy51c2VyLnVzZXJpZDtcbiAgICAgIGNvbnNvbGUuZGlyKHRoaXMudXNlcik7XG4gICAgfVxuICB9XG4gIC8vIFRvIHN3aXRjaCBmcm9tIG1vYmlsZSBmb3JtIHRvIGVtYWlsIGZvcm1cbiAgcHVibGljIHN3aXRjaFZpZXcoYXJnKSB7XG4gICAgdGhpcy5jbGVhckZpZWxkcygpO1xuICAgIGlmICghdGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcbiAgICAgIGlmIChhcmcgPT09IFwiZnJvbW1vYmlsZVwiKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlID0gXCJtb2JpbGVcIjtcbiAgICAgICAgdGhpcy5pc01vYmlsZUZvcm0gPSB0cnVlO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRGl2ID0gYXJnO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYXJnID09PSBcImZyb21lbWFpbFwiKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlID0gXCJlbWFpbFwiO1xuICAgICAgICB0aGlzLmlzTW9iaWxlRm9ybSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRGl2ID0gYXJnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2dpbigpe1xuICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgfVxuICAvLyBiYWNrIGJ1dHRvblxuICBwdWJsaWMgZ29CYWNrKCkge1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgZGlzbWlzc0tleUJvYXJkKCkge1xuICAgIGxldCBtb2JObyA9IDxUZXh0RmllbGQ+dGhpcy5tb2JOby5uYXRpdmVFbGVtZW50O1xuICAgIG1vYk5vLmRpc21pc3NTb2Z0SW5wdXQoKTtcblxuICAgIGxldCBtb2JQd2QgPSA8VGV4dEZpZWxkPnRoaXMubW9iUHdkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbW9iUHdkLmRpc21pc3NTb2Z0SW5wdXQoKTtcblxuICAgIGxldCBlbWFpbCA9IDxUZXh0RmllbGQ+dGhpcy5lbWFpbC5uYXRpdmVFbGVtZW50O1xuICAgIG1vYk5vLmRpc21pc3NTb2Z0SW5wdXQoKTtcblxuICAgIGxldCBlbWFpbFB3ZCA9IDxUZXh0RmllbGQ+dGhpcy5lbWFpbFB3ZC5uYXRpdmVFbGVtZW50O1xuICAgIGVtYWlsUHdkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgfVxuICBwdWJsaWMgdmFsaWRDaGVjayhhcmcsIHR5cGUpIHtcbiAgICBpZiAoYXJnICE9PSB1bmRlZmluZWQgJiYgYXJnICE9PSBcIlwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcIm1vYmlsZVwiOlxuICAgICAgICAgIHRoaXMuaXNNb2JpbGVOdW1iZXJGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICB0aGlzLmlzVmFsaWRNb2JpbGVOdW1iZXIgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtcGFzc3dvcmRcIjpcbiAgICAgICAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5wYXNzd29yZFBhdHRlcm5WYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICB0aGlzLmlzTW9iaWxlUGFzc3dvcmRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVtYWlsSWRcIjpcbiAgICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5lbWFpbE1hdGNoVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlcGFzc3dvcmRcIjpcbiAgICAgICAgICB0aGlzLmlzRW1haWxQYXNzd29yZFZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnBhc3N3b3JkUGF0dGVyblZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgIHRoaXMuaXNFbWFpbFBhc3N3b3JkRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG5cbiAgc2hvd09ySGlkZUVtYWlsUGFzc3dvcmQoKSB7XG4gICAgdGhpcy5pc0VtYWlsUHdkU2VjdXJlID0gIXRoaXMuaXNFbWFpbFB3ZFNlY3VyZTtcbiAgICBpZiAodGhpcy5pc0VtYWlsUHdkU2VjdXJlKSB7XG4gICAgICB0aGlzLnNob3dPckhpZGVFbWFpbFB3ZExhYmVsID0gXCJTaG93XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd09ySGlkZUVtYWlsUHdkTGFiZWwgPSBcIkhpZGVcIjtcbiAgICB9XG4gICAgaWYgKGFwcC5hbmRyb2lkKSB7XG4gICAgICB0aGlzLnJldGFpbkN1cnNvclBvc0ZvckVtYWlsUHdkRmllbGQoKTtcbiAgICB9XG4gIH1cblxuICBzaG93T3JIaWRlTW9iaWxlUGFzc3dvcmQoKSB7XG4gICAgdGhpcy5pc01vYmlsZVB3ZFNlY3VyZSA9ICF0aGlzLmlzTW9iaWxlUHdkU2VjdXJlO1xuICAgIGlmICh0aGlzLmlzTW9iaWxlUHdkU2VjdXJlKSB7XG4gICAgICB0aGlzLnNob3dPckhpZGVNb2JpbGVQd2RMYWJlbCA9IFwiU2hvd1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dPckhpZGVNb2JpbGVQd2RMYWJlbCA9IFwiSGlkZVwiO1xuICAgIH1cbiAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgIHRoaXMucmV0YWluQ3Vyc29yUG9zRm9yTW9iaWxlUHdkRmllbGQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmV0YWluQ3Vyc29yUG9zRm9yTW9iaWxlUHdkRmllbGQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBhbmRyb2lkLnRleHQuU2VsZWN0aW9uLnNldFNlbGVjdGlvbihcbiAgICAgICAgdGhpcy5tb2JQd2QubmF0aXZlRWxlbWVudC5hbmRyb2lkLmdldFRleHQoKSxcbiAgICAgICAgdGhpcy5tb2JQd2QubmF0aXZlRWxlbWVudC5hbmRyb2lkLmxlbmd0aCgpXG4gICAgICApO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHVibGljIHJldGFpbkN1cnNvclBvc0ZvckVtYWlsUHdkRmllbGQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBhbmRyb2lkLnRleHQuU2VsZWN0aW9uLnNldFNlbGVjdGlvbihcbiAgICAgICAgdGhpcy5lbWFpbFB3ZC5uYXRpdmVFbGVtZW50LmFuZHJvaWQuZ2V0VGV4dCgpLFxuICAgICAgICB0aGlzLmVtYWlsUHdkLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5sZW5ndGgoKVxuICAgICAgKTtcbiAgICB9LCAwKTtcbiAgfVxuICBnb1RvTW9iUHdkKCkge1xuICAgIHRoaXMubW9iUHdkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuICBnb1RvRW1haWxQd2QoKSB7XG4gICAgdGhpcy5lbWFpbFB3ZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxufVxuIl19