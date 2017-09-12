"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var router_3 = require("nativescript-angular/router");
var forms_1 = require("@angular/forms");
var formValidation_service_1 = require("../../../shared/services/formValidation.service");
var authentication_service_1 = require("../../authentication/authentication.service");
var global_1 = require("../../../shared/global");
var app = require("tns-core-modules/application");
var page_1 = require("ui/page");
var authentication_model_1 = require("../../authentication/authentication.model");
// import { AuthenticatePromoComponent } from "../../registration/authenticatePromo/authenticatePromo.component";
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var core_2 = require("@angular/core");
var restrictedAccess_component_1 = require("../../../shared/restrictedAccess/restrictedAccess.component");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
// import {HomeService} from "../../home/home.service";
var RegistrationHomeComponent = (function () {
    function RegistrationHomeComponent(route, _globals, auth_service, _formValidationService, router, fb, page, authPromoModal, vcRef, _routerExtensions) {
        this.route = route;
        this._globals = _globals;
        this.auth_service = auth_service;
        this._formValidationService = _formValidationService;
        this.router = router;
        this.fb = fb;
        this.page = page;
        this.authPromoModal = authPromoModal;
        this.vcRef = vcRef;
        this._routerExtensions = _routerExtensions;
        this.title = "Authentication";
        this.healthyAricles = [{
                "title": "Healthy Living",
                "subtitle": "Tannings allure",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
                "category": "living",
                "imageURL": "~/images/redesign/article_healthyLiving.png",
                "titleImageURL": "~/images/redesign/healthy_living.png",
                "rowNum": 0
            },
            {
                "title": "Fitness",
                "subtitle": "Exercise program",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
                "category": "living",
                "imageURL": "~/images/redesign/article_fitness.png",
                "titleImageURL": "~/images/redesign/fitness.png",
                "rowNum": 1
            }
        ];
        this.isValidEmail = true;
        this.isEmailFilled = true;
        this.isValidMobileNo = true;
        this.isFirstNameValid = true;
        this.isFirstNameFilled = true;
        this.isLastNameFilled = true;
        this.isLastNameValid = true;
        this.isDOBValid = true;
        this.isAgeValid = true;
        this.isMobileFilled = true;
        this.isDOBFilled = true;
        this.personalInfo = new authentication_model_1.PersonalInfo();
        this.personForm = fb.group({
            "firstName": ["", [forms_1.Validators.required,]],
            "lastName": ["", [forms_1.Validators.required]],
            "emailAddress": ["", [forms_1.Validators.required]],
            "mobileNum": ["", [forms_1.Validators.required]],
            "dob": ["", [forms_1.Validators.required]],
        });
    }
    RegistrationHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAuthDismissed = this._globals.isAuthCancelled;
        this.hintText = "MM/DD/YYYY";
        this.currentDate = "";
        this.currentNumber = "";
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0}";
        }
        this.route.params.subscribe(function (params) {
            _this.register_type = params["type"];
            _this.reg_id = params["id"];
        });
        this.auth_service.user_registration_type = this.register_type;
        this.auth_service.user_name = this.reg_id;
        if (this.register_type === "mobile") {
            this.otherType = "email";
        }
        else if (this.register_type === "email") {
            this.otherType = "mobile";
        }
        loader.hide(); // jai workaround for demo 6.0 
        // setTimeout(() => {
        //     let firstNameField = <TextField>this.firstNameField.nativeElement;
        //     firstNameField.focus();
        // }, 1000);
    };
    RegistrationHomeComponent.prototype.onContinue = function (firstName, lastName, mobileNum, emailAddress, dob) {
        // let num1 = this.currentNumber.substring(1, 4);
        // let num2 = this.currentNumber.substring(5, 8);
        // let num3 = this.currentNumber.substring(9, 13);
        // this.mbNumber = num1 + num2 + num3;
        this.isValidEmail = this._formValidationService.emailMatchValidator(emailAddress);
        this.isValidMobileNo = this._formValidationService.mobileNumberValidator(mobileNum);
        this.isFirstNameFilled = this._formValidationService.fieldFilledValidator(firstName);
        this.isLastNameFilled = this._formValidationService.fieldFilledValidator(lastName);
        this.isFirstNameValid = this._formValidationService.onlyAlphabetsValidator(firstName);
        this.isLastNameValid = this._formValidationService.onlyAlphabetsValidator(lastName);
        this.isAgeValid = this.isDOBValid && this._formValidationService.minimumAgeValidator(dob) && this.isDOBFilled;
        this.isDOBFilled = this._formValidationService.fieldFilledValidator(dob);
        this.isDOBValid = this._formValidationService.dateValidator(dob);
        this.isEmailFilled = this._formValidationService.fieldFilledValidator(emailAddress);
        this.isMobileFilled = this._formValidationService.mobileNumberFilledValidator(mobileNum);
        this._globals.user_fname = this.firstName;
        this._globals.user_lname = this.lastName;
        this._globals.user_dob = this.dob;
        this.personalInfo.fname = this.firstName;
        this.personalInfo.lname = this.lastName;
        this.personalInfo.dob = this.dob;
        if (this.register_type === "mobile") {
            if (this.isValidEmail && this.isAgeValid && this.isEmailFilled && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
                loader.show();
                this.personalInfo.email = this.emailAddress;
                this.personalInfo.mobile = this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
                loader.hide();
            }
        }
        else if (this.register_type === "email") {
            if (this.isValidMobileNo && this.isAgeValid && this.isMobileFilled && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
                loader.show();
                this.personalInfo.mobile = this.currentNumber;
                this.personalInfo.email = this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
                loader.hide();
            }
        }
    };
    RegistrationHomeComponent.prototype.goBackFn = function () {
        // this.routerExtensions.back();
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        this._routerExtensions.navigate(["/home/signedHome"], {
            animated: false
        });
    };
    RegistrationHomeComponent.prototype.onAuthenticateGridClose = function () {
        this._globals.isAuthCancelled = true;
        this.isAuthDismissed = this._globals.isAuthCancelled;
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        // this._globals.promoState = "fromRegistration";
        // this._routerExtensions.navigate(["/create/verification", this.register_type, "cancel-auth"], {
        //      animated: false
        // });
        // this.authPromoModal.showModal(AuthenticatePromoComponent, options).then((res) => {
        //     if (res === "fromreg") {
        //         if (this._globals.user_state === "RNV") {
        //             this._routerExtensions.navigate(["/create/verification", this.register_type, "signInVerify"], {
        //                 animated: false
        //             });
        //         }
        //         else if (this._globals.user_state === "RV") {
        //             this._routerExtensions.navigate(["/home/signedHome"], {
        //                 animated: false
        //             });
        //         }
        //     }
        // });
    };
    RegistrationHomeComponent.prototype.showRestrictedAccessPopup = function () {
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.authPromoModal.showModal(restrictedAccess_component_1.RestrictedAccessComponent, options).then(function (res) {
        });
    };
    RegistrationHomeComponent.prototype.validCheck = function (arg, type) {
        if (arg !== undefined && arg !== "") {
            switch (type) {
                case "firstName":
                    this.isFirstNameFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isFirstNameValid = this._formValidationService.onlyAlphabetsValidator(arg);
                    break;
                case "lastName":
                    this.isLastNameFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isLastNameValid = this._formValidationService.onlyAlphabetsValidator(arg);
                    break;
                case "emailAddress":
                    this.isEmailFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isValidEmail = this._formValidationService.emailMatchValidator(arg);
                    break;
                case "dob":
                    this.isDOBFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isDOBValid = this._formValidationService.dateValidator(arg);
                    this.isAgeValid = this.isDOBValid && this._formValidationService.minimumAgeValidator(arg) && this.isDOBFilled;
                    break;
                case "mobileNum":
                    this.isMobileFilled = this._formValidationService.mobileNumberFilledValidator(arg);
                    this.isValidMobileNo = this._formValidationService.mobileNumberValidator(arg);
                    break;
            }
        }
    };
    RegistrationHomeComponent.prototype.setUpdatedDateValue = function (value) {
        this.udate = value;
        this.currentDate = this.udate;
        if (this.currentDate !== "") {
            if (this.currentDate.length === 10) {
                this.isDOBFilled = this._formValidationService.fieldFilledValidator(this.currentDate);
                this.isDOBValid = this._formValidationService.dateValidator(this.currentDate);
                this.isAgeValid = this.isDOBValid && this.isDOBFilled && this._formValidationService.minimumAgeValidator(this.currentDate);
            }
        }
    };
    RegistrationHomeComponent.prototype.setUpdatedNumberValue = function (value) {
        this.unumber = value;
        this.currentNumber = this.unumber;
        if (this.currentNumber !== "") {
            if (this.currentNumber.length === 13) {
                var num1 = this.currentNumber.substring(1, 4);
                var num2 = this.currentNumber.substring(5, 8);
                var num3 = this.currentNumber.substring(9, 13);
                this.mbNumber = num1 + num2 + num3;
                this.isMobileFilled = this._formValidationService.mobileNumberFilledValidator(this.mbNumber);
                this.isValidMobileNo = this._formValidationService.mobileNumberValidator(this.mbNumber);
            }
        }
    };
    RegistrationHomeComponent.prototype.closeCongratsGrid = function () {
        this.congratsGrid.nativeElement.visibility = "collapse";
        this.congratsShadow.nativeElement.visibility = "collapse";
    };
    RegistrationHomeComponent.prototype.goToLastName = function () {
        this.lastNameField.nativeElement.focus();
    };
    RegistrationHomeComponent.prototype.goToDOB = function () {
        this.DOBTextField.nativeElement.focus();
    };
    RegistrationHomeComponent.prototype.goToMoEmail = function () {
        if (this.register_type === "mobile") {
            this.emailTextField.nativeElement.focus();
        }
        else if (this.register_type === "email") {
            this.moTextField.nativeElement.focus();
        }
    };
    RegistrationHomeComponent.prototype.articleDetail = function () {
        this._routerExtensions.navigate(["/home/articleDetail"], {
            animated: false
        });
    };
    RegistrationHomeComponent.prototype.contactUs = function () {
        // this._routerExtensions.navigate(["/contactUs"], {
        //   animated: false
        // });
        this.showRestrictedAccessPopup();
    };
    RegistrationHomeComponent.prototype.searchNow = function () {
        this.showRestrictedAccessPopup();
    };
    RegistrationHomeComponent.prototype.autoFormat = function (dob) {
        var isErasing = false;
        if (this.oldDOB == undefined || this.oldDOB == "") {
            this.oldDOB = dob;
        }
        else {
            if (this.oldDOB.length > dob.length) {
                isErasing = true;
                this.oldDOB = dob;
            }
        }
        if (!isErasing) {
            if (dob !== undefined && dob !== "") {
                if (dob.length == 3) {
                    // this.dob=this.dob+'/';
                    if (dob.charAt(dob.length - 1) != "/") {
                        this.dob = dob.slice(0, dob.length - 1) + "/" + dob.slice(dob.length - 1);
                        var nextTextField_1 = this.DOBTextField.nativeElement;
                        nextTextField_1.text = this.dob;
                        setTimeout(function () {
                            nextTextField_1.android.setSelection(dob.length + 1);
                        }, 100);
                    }
                }
                else if (dob.length == 6) {
                    // this.dob=this.dob+'/';
                    if (dob.charAt(dob.length - 1) != "/") {
                        this.dob = dob.slice(0, dob.length - 1) + "/" + dob.slice(dob.length - 1);
                        var nextTextField_2 = this.DOBTextField.nativeElement;
                        nextTextField_2.text = this.dob;
                        setTimeout(function () {
                            nextTextField_2.android.setSelection(dob.length + 1);
                        }, 100);
                    }
                }
                else if (dob.length == 10) {
                    this.oldDOB = this.dob;
                }
            }
        }
    };
    return RegistrationHomeComponent;
}());
__decorate([
    core_1.ViewChild("firstNameField"),
    __metadata("design:type", core_1.ElementRef)
], RegistrationHomeComponent.prototype, "firstNameField", void 0);
__decorate([
    core_1.ViewChild("lastNameField"),
    __metadata("design:type", core_1.ElementRef)
], RegistrationHomeComponent.prototype, "lastNameField", void 0);
__decorate([
    core_1.ViewChild("congratsGrid"),
    __metadata("design:type", core_1.ElementRef)
], RegistrationHomeComponent.prototype, "congratsGrid", void 0);
__decorate([
    core_1.ViewChild("congratsShadow"),
    __metadata("design:type", core_1.ElementRef)
], RegistrationHomeComponent.prototype, "congratsShadow", void 0);
__decorate([
    core_1.ViewChild("DOBTextField"),
    __metadata("design:type", core_1.ElementRef)
], RegistrationHomeComponent.prototype, "DOBTextField", void 0);
__decorate([
    core_1.ViewChild("moTextField"),
    __metadata("design:type", core_1.ElementRef)
], RegistrationHomeComponent.prototype, "moTextField", void 0);
__decorate([
    core_1.ViewChild("emailTextField"),
    __metadata("design:type", core_1.ElementRef)
], RegistrationHomeComponent.prototype, "emailTextField", void 0);
RegistrationHomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./registrationhome.component.html",
        styleUrls: ["./registrationhome.css", "../../home/home.css"]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        global_1.Globals,
        authentication_service_1.AuthenticationService,
        formValidation_service_1.FormValidationService,
        router_2.Router,
        forms_1.FormBuilder,
        page_1.Page,
        dialogs_1.ModalDialogService,
        core_2.ViewContainerRef,
        router_3.RouterExtensions])
], RegistrationHomeComponent);
exports.RegistrationHomeComponent = RegistrationHomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb25ob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRTtBQUMxRSwwQ0FBaUQ7QUFDakQsMENBQXlDO0FBRXpDLHNEQUErRDtBQUMvRCx3Q0FBdUg7QUFDdkgsMEZBQXdGO0FBQ3hGLHNGQUFvRjtBQUNwRixpREFBaUQ7QUFDakQsa0RBQW9EO0FBQ3BELGdDQUErQjtBQUUvQixrRkFBeUU7QUFDekUsaUhBQWlIO0FBQ2pILG1FQUE2RTtBQUM3RSxzQ0FBaUQ7QUFHakQsMEdBQXdHO0FBQ3hHLGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFFcEMsdURBQXVEO0FBTXZELElBQWEseUJBQXlCO0lBMkRsQyxtQ0FBMkIsS0FBcUIsRUFDckMsUUFBaUIsRUFDakIsWUFBbUMsRUFDbEMsc0JBQTZDLEVBQzdDLE1BQWMsRUFDZCxFQUFlLEVBQ2YsSUFBVSxFQUNWLGNBQWtDLEVBQ2xDLEtBQXVCLEVBQ3ZCLGlCQUFtQztRQVRwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUNsQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBbkUvQyxVQUFLLEdBQVcsZ0JBQWdCLENBQUM7UUFDakMsbUJBQWMsR0FBYyxDQUFDO2dCQUM3QixPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixV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QUNFLENBQUM7SUFFSCxDQUFDO0lBRUwsZ0NBQUM7QUFBRCxDQUFDLEFBcFZELElBb1ZDO0FBL1RnQztJQUE1QixnQkFBUyxDQUFDLGdCQUFnQixDQUFDOzhCQUFpQixpQkFBVTtpRUFBQztBQUM1QjtJQUEzQixnQkFBUyxDQUFDLGVBQWUsQ0FBQzs4QkFBZ0IsaUJBQVU7Z0VBQUM7QUFDM0I7SUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7OEJBQWUsaUJBQVU7K0RBQUM7QUFDdEI7SUFBNUIsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzs4QkFBaUIsaUJBQVU7aUVBQUM7QUFDOUI7SUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7OEJBQWUsaUJBQVU7K0RBQUM7QUFDMUI7SUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7OEJBQWMsaUJBQVU7OERBQUM7QUFDckI7SUFBNUIsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzs4QkFBaUIsaUJBQVU7aUVBQUM7QUEzQi9DLHlCQUF5QjtJQUxyQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUMscUJBQXFCLENBQUM7S0FDOUQsQ0FBQztxQ0E0RG9DLHVCQUFjO1FBQzNCLGdCQUFPO1FBQ0gsOENBQXFCO1FBQ1YsOENBQXFCO1FBQ3JDLGVBQU07UUFDVixtQkFBVztRQUNULFdBQUk7UUFDTSw0QkFBa0I7UUFDM0IsdUJBQWdCO1FBQ0oseUJBQWdCO0dBcEV0Qyx5QkFBeUIsQ0FvVnJDO0FBcFZZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycywgUmVhY3RpdmVGb3Jtc01vZHVsZSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBQZXJzb25hbEluZm8gfSBmcm9tIFwiLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24ubW9kZWxcIjtcclxuLy8gaW1wb3J0IHsgQXV0aGVudGljYXRlUHJvbW9Db21wb25lbnQgfSBmcm9tIFwiLi4vLi4vcmVnaXN0cmF0aW9uL2F1dGhlbnRpY2F0ZVByb21vL2F1dGhlbnRpY2F0ZVByb21vLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgb2JzZXJ2YWJsZU1vZHVsZSA9IHJlcXVpcmUoXCJkYXRhL29ic2VydmFibGVcIik7XHJcbmltcG9ydCB7IEFydGljbGUgfSBmcm9tIFwiLi4vLi4vaG9tZS9ob21lLm1vZGVsXCI7XHJcbmltcG9ydCB7IFJlc3RyaWN0ZWRBY2Nlc3NDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3Jlc3RyaWN0ZWRBY2Nlc3MvcmVzdHJpY3RlZEFjY2Vzcy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5cclxuLy8gaW1wb3J0IHtIb21lU2VydmljZX0gZnJvbSBcIi4uLy4uL2hvbWUvaG9tZS5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVnaXN0cmF0aW9uaG9tZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3JlZ2lzdHJhdGlvbmhvbWUuY3NzXCIsXCIuLi8uLi9ob21lL2hvbWUuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25Ib21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHRpdGxlOiBzdHJpbmcgPSBcIkF1dGhlbnRpY2F0aW9uXCI7ICAgIFxyXG4gICAgaGVhbHRoeUFyaWNsZXM6IEFydGljbGVbXSA9IFt7XHJcbiAgICBcInRpdGxlXCI6IFwiSGVhbHRoeSBMaXZpbmdcIixcclxuICAgIFwic3VidGl0bGVcIjogXCJUYW5uaW5ncyBhbGx1cmVcIixcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdCBpcyBhIGxvbmcgZXN0YWJsaXNoZWQgZmFjdCB0aGF0IGEgcmVhZGVyIHdpbGwgYmUgZGlzdHJhY3RlZCBieSB0aGUgcmVhZGFibGUgY29udGVudCBvZiBhIHBhZ2UuXCIsXHJcbiAgICBcImNhdGVnb3J5XCI6IFwibGl2aW5nXCIsXHJcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vYXJ0aWNsZV9oZWFsdGh5TGl2aW5nLnBuZ1wiLFxyXG4gICAgXCJ0aXRsZUltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vaGVhbHRoeV9saXZpbmcucG5nXCIsXHJcbiAgICBcInJvd051bVwiOiAwXHJcbiAgfSxcclxuICB7XHJcbiAgICBcInRpdGxlXCI6IFwiRml0bmVzc1wiLFxyXG4gICAgXCJzdWJ0aXRsZVwiOiBcIkV4ZXJjaXNlIHByb2dyYW1cIixcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdCBpcyBhIGxvbmcgZXN0YWJsaXNoZWQgZmFjdCB0aGF0IGEgcmVhZGVyIHdpbGwgYmUgZGlzdHJhY3RlZCBieSB0aGUgcmVhZGFibGUgY29udGVudCBvZiBhIHBhZ2UuXCIsXHJcbiAgICBcImNhdGVnb3J5XCI6IFwibGl2aW5nXCIsXHJcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vYXJ0aWNsZV9maXRuZXNzLnBuZ1wiLFxyXG4gICAgXCJ0aXRsZUltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vZml0bmVzcy5wbmdcIixcclxuICAgIFwicm93TnVtXCI6IDFcclxuICB9XHJcbiAgXTtcclxuICAgIEBWaWV3Q2hpbGQoXCJmaXJzdE5hbWVGaWVsZFwiKSBmaXJzdE5hbWVGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJsYXN0TmFtZUZpZWxkXCIpIGxhc3ROYW1lRmllbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwiY29uZ3JhdHNHcmlkXCIpIGNvbmdyYXRzR3JpZDogRWxlbWVudFJlZjtcclxuICAgICBAVmlld0NoaWxkKFwiY29uZ3JhdHNTaGFkb3dcIikgY29uZ3JhdHNTaGFkb3c6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwiRE9CVGV4dEZpZWxkXCIpIERPQlRleHRGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJtb1RleHRGaWVsZFwiKSBtb1RleHRGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJlbWFpbFRleHRGaWVsZFwiKSBlbWFpbFRleHRGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIFxyXG4gICAgcHVibGljIHVkYXRlO1xyXG4gICAgcHVibGljIHVudW1iZXI7XHJcbiAgICBwdWJsaWMgY3VycmVudERhdGU7XHJcbiAgICBwdWJsaWMgY3VycmVudE51bWJlcjtcclxuICAgIHB1YmxpYyBtYk51bWJlcjtcclxuICAgIHB1YmxpYyBoaW50VGV4dDpzdHJpbmc7XHJcbiAgICBwdWJsaWMgcGVyc29uRm9ybTogRm9ybUdyb3VwO1xyXG4gICAgcHVibGljIHJlZ19pZDogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlZ2lzdGVyX3R5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1ZhbGlkRW1haWw6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzRW1haWxGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzVmFsaWRNb2JpbGVObzogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNGaXJzdE5hbWVWYWxpZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNGaXJzdE5hbWVGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzTGFzdE5hbWVGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzTGFzdE5hbWVWYWxpZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNET0JWYWxpZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNBZ2VWYWxpZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNNb2JpbGVGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzRE9CRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBvdGhlclR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGRvYjogc3RyaW5nO1xyXG4gICAgcHVibGljIG1vYmlsZU51bTogc3RyaW5nO1xyXG4gICAgcHVibGljIGVtYWlsQWRkcmVzczogc3RyaW5nO1xyXG4gICAgcHVibGljIG9sZERPQjpzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNBdXRoRGlzbWlzc2VkOkJvb2xlYW47XHJcbiAgICBwZXJzb25hbEluZm8gPSBuZXcgUGVyc29uYWxJbmZvKCk7XHJcbiAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcclxuICAgICAgICBwdWJsaWMgYXV0aF9zZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSBhdXRoUHJvbW9Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIHRoaXMucGVyc29uRm9ybSA9IGZiLmdyb3VwKHtcclxuICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIF1dLFxyXG4gICAgICAgICAgICBcImxhc3ROYW1lXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgICAgICBcImVtYWlsQWRkcmVzc1wiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgICAgICAgXCJtb2JpbGVOdW1cIjogW1wiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgICAgICAgIFwiZG9iXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgIH0pOyAgXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKSB7ICBcclxuICAgICAgICB0aGlzLmlzQXV0aERpc21pc3NlZD10aGlzLl9nbG9iYWxzLmlzQXV0aENhbmNlbGxlZDsgICAgXHJcbiAgICAgICAgdGhpcy5oaW50VGV4dD1cIk1NL0REL1lZWVlcIjsgICAgICAgXHJcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TnVtYmVyID0gXCJcIjtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlcl90eXBlID0gcGFyYW1zW1widHlwZVwiXTtcclxuICAgICAgICAgICAgdGhpcy5yZWdfaWQgPSBwYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmF1dGhfc2VydmljZS51c2VyX3JlZ2lzdHJhdGlvbl90eXBlID0gdGhpcy5yZWdpc3Rlcl90eXBlO1xyXG4gICAgICAgIHRoaXMuYXV0aF9zZXJ2aWNlLnVzZXJfbmFtZSA9IHRoaXMucmVnX2lkO1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdGVyX3R5cGUgPT09IFwibW9iaWxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdGhlclR5cGUgPSBcImVtYWlsXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJlbWFpbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJtb2JpbGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZGVyLmhpZGUoKTsgLy8gamFpIHdvcmthcm91bmQgZm9yIGRlbW8gNi4wIFxyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBsZXQgZmlyc3ROYW1lRmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZmlyc3ROYW1lRmllbGQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAvLyAgICAgZmlyc3ROYW1lRmllbGQuZm9jdXMoKTtcclxuICAgICAgICAvLyB9LCAxMDAwKTtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25Db250aW51ZShmaXJzdE5hbWUsIGxhc3ROYW1lLCBtb2JpbGVOdW0sIGVtYWlsQWRkcmVzcyxkb2IpIHtcclxuICAgICAgICAvLyBsZXQgbnVtMSA9IHRoaXMuY3VycmVudE51bWJlci5zdWJzdHJpbmcoMSwgNCk7XHJcbiAgICAgICAgLy8gbGV0IG51bTIgPSB0aGlzLmN1cnJlbnROdW1iZXIuc3Vic3RyaW5nKDUsIDgpO1xyXG4gICAgICAgIC8vIGxldCBudW0zID0gdGhpcy5jdXJyZW50TnVtYmVyLnN1YnN0cmluZyg5LCAxMyk7XHJcbiAgICAgICAgLy8gdGhpcy5tYk51bWJlciA9IG51bTEgKyBudW0yICsgbnVtMztcclxuICAgICAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5lbWFpbE1hdGNoVmFsaWRhdG9yKGVtYWlsQWRkcmVzcyk7XHJcbiAgICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTm8gPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyVmFsaWRhdG9yKG1vYmlsZU51bSk7XHJcbiAgICAgICAgdGhpcy5pc0ZpcnN0TmFtZUZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihmaXJzdE5hbWUpO1xyXG4gICAgICAgIHRoaXMuaXNMYXN0TmFtZUZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihsYXN0TmFtZSk7XHJcbiAgICAgICAgdGhpcy5pc0ZpcnN0TmFtZVZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm9ubHlBbHBoYWJldHNWYWxpZGF0b3IoZmlyc3ROYW1lKTtcclxuICAgICAgICB0aGlzLmlzTGFzdE5hbWVWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5vbmx5QWxwaGFiZXRzVmFsaWRhdG9yKGxhc3ROYW1lKTtcclxuICAgICAgICB0aGlzLmlzQWdlVmFsaWQgPSB0aGlzLmlzRE9CVmFsaWQgJiYgdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1pbmltdW1BZ2VWYWxpZGF0b3IoZG9iKSAmJiB0aGlzLmlzRE9CRmlsbGVkO1xyXG4gICAgICAgIHRoaXMuaXNET0JGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoZG9iKTtcclxuICAgICAgICB0aGlzLmlzRE9CVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZGF0ZVZhbGlkYXRvcihkb2IpO1xyXG5cclxuICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoZW1haWxBZGRyZXNzKTtcclxuICAgICAgICB0aGlzLmlzTW9iaWxlRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlckZpbGxlZFZhbGlkYXRvcihtb2JpbGVOdW0pO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9mbmFtZSA9IHRoaXMuZmlyc3ROYW1lO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9sbmFtZSA9IHRoaXMubGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy51c2VyX2RvYiA9IHRoaXMuZG9iO1xyXG4gICAgICAgIHRoaXMucGVyc29uYWxJbmZvLmZuYW1lID0gdGhpcy5maXJzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5wZXJzb25hbEluZm8ubG5hbWUgPSB0aGlzLmxhc3ROYW1lO1xyXG4gICAgICAgIHRoaXMucGVyc29uYWxJbmZvLmRvYiA9IHRoaXMuZG9iO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcIm1vYmlsZVwiKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRW1haWwgJiYgdGhpcy5pc0FnZVZhbGlkICYmIHRoaXMuaXNFbWFpbEZpbGxlZCAmJiB0aGlzLmlzRmlyc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0xhc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuaXNGaXJzdE5hbWVGaWxsZWQgJiYgdGhpcy5pc0xhc3ROYW1lRmlsbGVkICYmIHRoaXMuaXNET0JGaWxsZWQpIHtcclxuICAgICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25hbEluZm8uZW1haWwgPSB0aGlzLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uYWxJbmZvLm1vYmlsZSA9IHRoaXMucmVnX2lkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9tZW1iZXJfaW5mb1wiXSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJlbWFpbFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRNb2JpbGVObyAmJiB0aGlzLmlzQWdlVmFsaWQgJiYgdGhpcy5pc01vYmlsZUZpbGxlZCAmJiB0aGlzLmlzRmlyc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0xhc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuaXNGaXJzdE5hbWVGaWxsZWQgJiYgdGhpcy5pc0xhc3ROYW1lRmlsbGVkICYmIHRoaXMuaXNET0JGaWxsZWQpIHtcclxuICAgICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uYWxJbmZvLm1vYmlsZSA9IHRoaXMuY3VycmVudE51bWJlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uYWxJbmZvLmVtYWlsID0gdGhpcy5yZWdfaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL21lbWJlcl9pbmZvXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIGdvQmFja0ZuKCkge1xyXG4gICAgICAgIC8vIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc2Fub255bW91cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuY2hhbmdlUmVnaXN0ZXIoKTtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcclxuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQXV0aGVudGljYXRlR3JpZENsb3NlKCkge1xyXG4gICAgICAgdGhpcy5fZ2xvYmFscy5pc0F1dGhDYW5jZWxsZWQ9dHJ1ZTtcclxuICAgICAgIHRoaXMuaXNBdXRoRGlzbWlzc2VkPXRoaXMuX2dsb2JhbHMuaXNBdXRoQ2FuY2VsbGVkO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyB0aGlzLl9nbG9iYWxzLnByb21vU3RhdGUgPSBcImZyb21SZWdpc3RyYXRpb25cIjtcclxuICAgICAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jcmVhdGUvdmVyaWZpY2F0aW9uXCIsIHRoaXMucmVnaXN0ZXJfdHlwZSwgXCJjYW5jZWwtYXV0aFwiXSwge1xyXG4gICAgICAgIC8vICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gdGhpcy5hdXRoUHJvbW9Nb2RhbC5zaG93TW9kYWwoQXV0aGVudGljYXRlUHJvbW9Db21wb25lbnQsIG9wdGlvbnMpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAocmVzID09PSBcImZyb21yZWdcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9PT0gXCJSTlZcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NyZWF0ZS92ZXJpZmljYXRpb25cIiwgdGhpcy5yZWdpc3Rlcl90eXBlLCBcInNpZ25JblZlcmlmeVwiXSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9PT0gXCJSVlwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcbiAgICBzaG93UmVzdHJpY3RlZEFjY2Vzc1BvcHVwKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICB9O1xyXG4gICAgdGhpcy5hdXRoUHJvbW9Nb2RhbC5zaG93TW9kYWwoUmVzdHJpY3RlZEFjY2Vzc0NvbXBvbmVudCwgb3B0aW9ucykudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG4gICAgcHVibGljIHZhbGlkQ2hlY2soYXJnLCB0eXBlKSB7XHJcbiAgICAgICAgaWYgKGFyZyAhPT0gdW5kZWZpbmVkICYmIGFyZyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJmaXJzdE5hbWVcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRmlyc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ZpcnN0TmFtZVZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm9ubHlBbHBoYWJldHNWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsYXN0TmFtZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMYXN0TmFtZUZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMYXN0TmFtZVZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm9ubHlBbHBoYWJldHNWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFpbEFkZHJlc3NcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5lbWFpbE1hdGNoVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9iXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RPQkZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNET0JWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5kYXRlVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FnZVZhbGlkID0gdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5taW5pbXVtQWdlVmFsaWRhdG9yKGFyZykgJiYgIHRoaXMuaXNET0JGaWxsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vYmlsZU51bVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNb2JpbGVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyRmlsbGVkVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTm8gPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VXBkYXRlZERhdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy51ZGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50RGF0ZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RGF0ZS5sZW5ndGggPT09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRE9CRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKHRoaXMuY3VycmVudERhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0RPQlZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmRhdGVWYWxpZGF0b3IodGhpcy5jdXJyZW50RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWdlVmFsaWQgPSB0aGlzLmlzRE9CVmFsaWQgJiYgdGhpcy5pc0RPQkZpbGxlZCAmJiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubWluaW11bUFnZVZhbGlkYXRvcih0aGlzLmN1cnJlbnREYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRVcGRhdGVkTnVtYmVyVmFsdWUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVudW1iZXIgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnROdW1iZXIgPSB0aGlzLnVudW1iZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE51bWJlciAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50TnVtYmVyLmxlbmd0aCA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBudW0xID0gdGhpcy5jdXJyZW50TnVtYmVyLnN1YnN0cmluZygxLCA0KTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0yID0gdGhpcy5jdXJyZW50TnVtYmVyLnN1YnN0cmluZyg1LCA4KTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0zID0gdGhpcy5jdXJyZW50TnVtYmVyLnN1YnN0cmluZyg5LCAxMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1iTnVtYmVyID0gbnVtMSArIG51bTIgKyBudW0zO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vYmlsZUZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5tb2JpbGVOdW1iZXJGaWxsZWRWYWxpZGF0b3IodGhpcy5tYk51bWJlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWRNb2JpbGVObyA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5tb2JpbGVOdW1iZXJWYWxpZGF0b3IodGhpcy5tYk51bWJlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlQ29uZ3JhdHNHcmlkKCkge1xyXG4gICAgICAgIHRoaXMuY29uZ3JhdHNHcmlkLm5hdGl2ZUVsZW1lbnQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICB0aGlzLmNvbmdyYXRzU2hhZG93Lm5hdGl2ZUVsZW1lbnQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdvVG9MYXN0TmFtZSgpIHtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lRmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG4gICAgZ29Ub0RPQigpIHtcclxuICAgICAgICB0aGlzLkRPQlRleHRGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICBnb1RvTW9FbWFpbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1haWxUZXh0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcImVtYWlsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb1RleHRGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgYXJ0aWNsZURldGFpbCgpIHtcclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvYXJ0aWNsZURldGFpbFwiXSwge1xyXG4gICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuICBjb250YWN0VXMoKSB7XHJcbiAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jb250YWN0VXNcIl0sIHtcclxuICAgIC8vICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAvLyB9KTtcclxuICAgIHRoaXMuc2hvd1Jlc3RyaWN0ZWRBY2Nlc3NQb3B1cCgpO1xyXG4gIH1cclxuICBzZWFyY2hOb3coKXtcclxuICAgICAgdGhpcy5zaG93UmVzdHJpY3RlZEFjY2Vzc1BvcHVwKCk7XHJcbiAgfVxyXG4gICBwdWJsaWMgYXV0b0Zvcm1hdChkb2IpeyAgICBcclxuICAgICAgIGxldCBpc0VyYXNpbmc6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgaWYodGhpcy5vbGRET0I9PSB1bmRlZmluZWQgfHwgdGhpcy5vbGRET0I9PVwiXCIpXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5vbGRET0IgPSBkb2I7XHJcbiAgICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgIGlmKHRoaXMub2xkRE9CLmxlbmd0aD5kb2IubGVuZ3RoKVxyXG4gICAgICAgICAgIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlzRXJhc2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9sZERPQiA9IGRvYjsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICB9XHJcbiAgICAgIH0gXHJcbiBcclxuICAgICAgaWYoISBpc0VyYXNpbmcgKXtcclxuICAgICAgICAgaWYoZG9iIT09dW5kZWZpbmVkICYmIGRvYiE9PVwiXCIpe1xyXG4gICAgICAgIGlmKGRvYi5sZW5ndGg9PTMpe1xyXG4gICAgICAgIC8vIHRoaXMuZG9iPXRoaXMuZG9iKycvJztcclxuICAgICAgICBpZihkb2IuY2hhckF0KGRvYi5sZW5ndGgtMSkhPVwiL1wiKXtcclxuICAgICAgICAgICAgIHRoaXMuZG9iPWRvYi5zbGljZSgwLCBkb2IubGVuZ3RoLTEpICsgXCIvXCIgKyBkb2Iuc2xpY2UoZG9iLmxlbmd0aC0xKTtcclxuICAgICAgICAgbGV0IG5leHRUZXh0RmllbGQ6VGV4dEZpZWxkID0gPFRleHRGaWVsZD4gdGhpcy5ET0JUZXh0RmllbGQubmF0aXZlRWxlbWVudDsgXHJcbiAgICAgICAgbmV4dFRleHRGaWVsZC50ZXh0ID0gdGhpcy5kb2I7ICAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQgKCgpID0+IHtcclxuICAgICAgbmV4dFRleHRGaWVsZC5hbmRyb2lkLnNldFNlbGVjdGlvbihkb2IubGVuZ3RoKzEpO1xyXG4gICAgfSwgMTAwKVxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9ICAgIFxyXG4gICAgZWxzZSBpZihkb2IubGVuZ3RoPT02KXtcclxuICAgICAgICAvLyB0aGlzLmRvYj10aGlzLmRvYisnLyc7XHJcbiAgICAgICAgaWYoZG9iLmNoYXJBdChkb2IubGVuZ3RoLTEpIT1cIi9cIil7XHJcbiAgICAgICAgICAgICB0aGlzLmRvYj1kb2Iuc2xpY2UoMCwgZG9iLmxlbmd0aC0xKSArIFwiL1wiICsgZG9iLnNsaWNlKGRvYi5sZW5ndGgtMSk7XHJcbiAgICAgICAgICAgICBsZXQgbmV4dFRleHRGaWVsZDpUZXh0RmllbGQgPSA8VGV4dEZpZWxkPiB0aGlzLkRPQlRleHRGaWVsZC5uYXRpdmVFbGVtZW50OyBcclxuICAgICAgICBuZXh0VGV4dEZpZWxkLnRleHQgPSB0aGlzLmRvYjsgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dCAoKCkgPT4ge1xyXG4gICAgICBuZXh0VGV4dEZpZWxkLmFuZHJvaWQuc2V0U2VsZWN0aW9uKGRvYi5sZW5ndGgrMSk7XHJcbiAgICB9LCAxMDApXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiB9XHJcbiBlbHNlIGlmKGRvYi5sZW5ndGg9PTEwKXtcclxuICAgICB0aGlzLm9sZERPQj10aGlzLmRvYjtcclxuICAgICAgfVxyXG4gICB9XHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgfVxyXG4gIFxyXG59Il19