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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb25ob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRTtBQUMxRSwwQ0FBaUQ7QUFDakQsMENBQXlDO0FBRXpDLHNEQUErRDtBQUMvRCx3Q0FBdUg7QUFDdkgsMEZBQXdGO0FBQ3hGLHNGQUFvRjtBQUNwRixpREFBaUQ7QUFDakQsa0RBQW9EO0FBQ3BELGdDQUErQjtBQUUvQixrRkFBeUU7QUFDekUsaUhBQWlIO0FBQ2pILG1FQUE2RTtBQUM3RSxzQ0FBaUQ7QUFHakQsMEdBQXdHO0FBQ3hHLGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFFcEMsdURBQXVEO0FBTXZELElBQWEseUJBQXlCO0lBMkRsQyxtQ0FBMkIsS0FBcUIsRUFDckMsUUFBaUIsRUFDakIsWUFBbUMsRUFDbEMsc0JBQTZDLEVBQzdDLE1BQWMsRUFDZCxFQUFlLEVBQ2YsSUFBVSxFQUNWLGNBQWtDLEVBQ2xDLEtBQXVCLEVBQ3ZCLGlCQUFtQztRQVRwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUNsQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBbkUvQyxVQUFLLEdBQVcsZ0JBQWdCLENBQUM7UUFDakMsbUJBQWMsR0FBYyxDQUFDO2dCQUM3QixPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixV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QUNFLENBQUM7SUFFSCxDQUFDO0lBRUwsZ0NBQUM7QUFBRCxDQUFDLEFBcFZELElBb1ZDO0FBL1RnQztJQUE1QixnQkFBUyxDQUFDLGdCQUFnQixDQUFDOzhCQUFpQixpQkFBVTtpRUFBQztBQUM1QjtJQUEzQixnQkFBUyxDQUFDLGVBQWUsQ0FBQzs4QkFBZ0IsaUJBQVU7Z0VBQUM7QUFDM0I7SUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7OEJBQWUsaUJBQVU7K0RBQUM7QUFDdEI7SUFBNUIsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzs4QkFBaUIsaUJBQVU7aUVBQUM7QUFDOUI7SUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7OEJBQWUsaUJBQVU7K0RBQUM7QUFDMUI7SUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7OEJBQWMsaUJBQVU7OERBQUM7QUFDckI7SUFBNUIsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzs4QkFBaUIsaUJBQVU7aUVBQUM7QUEzQi9DLHlCQUF5QjtJQUxyQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUMscUJBQXFCLENBQUM7S0FDOUQsQ0FBQztxQ0E0RG9DLHVCQUFjO1FBQzNCLGdCQUFPO1FBQ0gsOENBQXFCO1FBQ1YsOENBQXFCO1FBQ3JDLGVBQU07UUFDVixtQkFBVztRQUNULFdBQUk7UUFDTSw0QkFBa0I7UUFDM0IsdUJBQWdCO1FBQ0oseUJBQWdCO0dBcEV0Qyx5QkFBeUIsQ0FvVnJDO0FBcFZZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBQZXJzb25hbEluZm8gfSBmcm9tIFwiLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24ubW9kZWxcIjtcbi8vIGltcG9ydCB7IEF1dGhlbnRpY2F0ZVByb21vQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3JlZ2lzdHJhdGlvbi9hdXRoZW50aWNhdGVQcm9tby9hdXRoZW50aWNhdGVQcm9tby5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IG9ic2VydmFibGVNb2R1bGUgPSByZXF1aXJlKFwiZGF0YS9vYnNlcnZhYmxlXCIpO1xuaW1wb3J0IHsgQXJ0aWNsZSB9IGZyb20gXCIuLi8uLi9ob21lL2hvbWUubW9kZWxcIjtcbmltcG9ydCB7IFJlc3RyaWN0ZWRBY2Nlc3NDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3Jlc3RyaWN0ZWRBY2Nlc3MvcmVzdHJpY3RlZEFjY2Vzcy5jb21wb25lbnRcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5cbi8vIGltcG9ydCB7SG9tZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9ob21lL2hvbWUuc2VydmljZVwiO1xuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3JlZ2lzdHJhdGlvbmhvbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcmVnaXN0cmF0aW9uaG9tZS5jc3NcIixcIi4uLy4uL2hvbWUvaG9tZS5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0cmF0aW9uSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdGl0bGU6IHN0cmluZyA9IFwiQXV0aGVudGljYXRpb25cIjsgICAgXG4gICAgaGVhbHRoeUFyaWNsZXM6IEFydGljbGVbXSA9IFt7XG4gICAgXCJ0aXRsZVwiOiBcIkhlYWx0aHkgTGl2aW5nXCIsXG4gICAgXCJzdWJ0aXRsZVwiOiBcIlRhbm5pbmdzIGFsbHVyZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdCBpcyBhIGxvbmcgZXN0YWJsaXNoZWQgZmFjdCB0aGF0IGEgcmVhZGVyIHdpbGwgYmUgZGlzdHJhY3RlZCBieSB0aGUgcmVhZGFibGUgY29udGVudCBvZiBhIHBhZ2UuXCIsXG4gICAgXCJjYXRlZ29yeVwiOiBcImxpdmluZ1wiLFxuICAgIFwiaW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9yZWRlc2lnbi9hcnRpY2xlX2hlYWx0aHlMaXZpbmcucG5nXCIsXG4gICAgXCJ0aXRsZUltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vaGVhbHRoeV9saXZpbmcucG5nXCIsXG4gICAgXCJyb3dOdW1cIjogMFxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkZpdG5lc3NcIixcbiAgICBcInN1YnRpdGxlXCI6IFwiRXhlcmNpc2UgcHJvZ3JhbVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdCBpcyBhIGxvbmcgZXN0YWJsaXNoZWQgZmFjdCB0aGF0IGEgcmVhZGVyIHdpbGwgYmUgZGlzdHJhY3RlZCBieSB0aGUgcmVhZGFibGUgY29udGVudCBvZiBhIHBhZ2UuXCIsXG4gICAgXCJjYXRlZ29yeVwiOiBcImxpdmluZ1wiLFxuICAgIFwiaW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9yZWRlc2lnbi9hcnRpY2xlX2ZpdG5lc3MucG5nXCIsXG4gICAgXCJ0aXRsZUltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vZml0bmVzcy5wbmdcIixcbiAgICBcInJvd051bVwiOiAxXG4gIH1cbiAgXTtcbiAgICBAVmlld0NoaWxkKFwiZmlyc3ROYW1lRmllbGRcIikgZmlyc3ROYW1lRmllbGQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImxhc3ROYW1lRmllbGRcIikgbGFzdE5hbWVGaWVsZDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiY29uZ3JhdHNHcmlkXCIpIGNvbmdyYXRzR3JpZDogRWxlbWVudFJlZjtcbiAgICAgQFZpZXdDaGlsZChcImNvbmdyYXRzU2hhZG93XCIpIGNvbmdyYXRzU2hhZG93OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJET0JUZXh0RmllbGRcIikgRE9CVGV4dEZpZWxkOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJtb1RleHRGaWVsZFwiKSBtb1RleHRGaWVsZDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiZW1haWxUZXh0RmllbGRcIikgZW1haWxUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgcHVibGljIHVkYXRlO1xuICAgIHB1YmxpYyB1bnVtYmVyO1xuICAgIHB1YmxpYyBjdXJyZW50RGF0ZTtcbiAgICBwdWJsaWMgY3VycmVudE51bWJlcjtcbiAgICBwdWJsaWMgbWJOdW1iZXI7XG4gICAgcHVibGljIGhpbnRUZXh0OnN0cmluZztcbiAgICBwdWJsaWMgcGVyc29uRm9ybTogRm9ybUdyb3VwO1xuICAgIHB1YmxpYyByZWdfaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgcmVnaXN0ZXJfdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpc1ZhbGlkRW1haWw6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0VtYWlsRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNWYWxpZE1vYmlsZU5vOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNGaXJzdE5hbWVWYWxpZDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzRmlyc3ROYW1lRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNMYXN0TmFtZUZpbGxlZDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzTGFzdE5hbWVWYWxpZDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzRE9CVmFsaWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0FnZVZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNNb2JpbGVGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0RPQkZpbGxlZDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIG90aGVyVHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbGFzdE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZG9iOiBzdHJpbmc7XG4gICAgcHVibGljIG1vYmlsZU51bTogc3RyaW5nO1xuICAgIHB1YmxpYyBlbWFpbEFkZHJlc3M6IHN0cmluZztcbiAgICBwdWJsaWMgb2xkRE9COnN0cmluZztcbiAgICBwdWJsaWMgaXNBdXRoRGlzbWlzc2VkOkJvb2xlYW47XG4gICAgcGVyc29uYWxJbmZvID0gbmV3IFBlcnNvbmFsSW5mbygpO1xuICAgXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsXG4gICAgICAgIHB1YmxpYyBhdXRoX3NlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgYXV0aFByb21vTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLnBlcnNvbkZvcm0gPSBmYi5ncm91cCh7XG4gICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgXV0sXG4gICAgICAgICAgICBcImxhc3ROYW1lXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxuICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjogW1wiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXG4gICAgICAgICAgICBcIm1vYmlsZU51bVwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcbiAgICAgICAgICAgIFwiZG9iXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxuICAgICAgICB9KTsgIFxuXG5cbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCkgeyAgXG4gICAgICAgIHRoaXMuaXNBdXRoRGlzbWlzc2VkPXRoaXMuX2dsb2JhbHMuaXNBdXRoQ2FuY2VsbGVkOyAgICBcbiAgICAgICAgdGhpcy5oaW50VGV4dD1cIk1NL0REL1lZWVlcIjsgICAgICAgXG4gICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnROdW1iZXIgPSBcIlwiO1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJfdHlwZSA9IHBhcmFtc1tcInR5cGVcIl07XG4gICAgICAgICAgICB0aGlzLnJlZ19pZCA9IHBhcmFtc1tcImlkXCJdO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hdXRoX3NlcnZpY2UudXNlcl9yZWdpc3RyYXRpb25fdHlwZSA9IHRoaXMucmVnaXN0ZXJfdHlwZTtcbiAgICAgICAgdGhpcy5hdXRoX3NlcnZpY2UudXNlcl9uYW1lID0gdGhpcy5yZWdfaWQ7XG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdGVyX3R5cGUgPT09IFwibW9iaWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJlbWFpbFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJlbWFpbFwiKSB7XG4gICAgICAgICAgICB0aGlzLm90aGVyVHlwZSA9IFwibW9iaWxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZGVyLmhpZGUoKTsgLy8gamFpIHdvcmthcm91bmQgZm9yIGRlbW8gNi4wIFxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICAgIGxldCBmaXJzdE5hbWVGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5maXJzdE5hbWVGaWVsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAvLyAgICAgZmlyc3ROYW1lRmllbGQuZm9jdXMoKTtcbiAgICAgICAgLy8gfSwgMTAwMCk7XG5cbiAgICB9XG4gICAgcHVibGljIG9uQ29udGludWUoZmlyc3ROYW1lLCBsYXN0TmFtZSwgbW9iaWxlTnVtLCBlbWFpbEFkZHJlc3MsZG9iKSB7XG4gICAgICAgIC8vIGxldCBudW0xID0gdGhpcy5jdXJyZW50TnVtYmVyLnN1YnN0cmluZygxLCA0KTtcbiAgICAgICAgLy8gbGV0IG51bTIgPSB0aGlzLmN1cnJlbnROdW1iZXIuc3Vic3RyaW5nKDUsIDgpO1xuICAgICAgICAvLyBsZXQgbnVtMyA9IHRoaXMuY3VycmVudE51bWJlci5zdWJzdHJpbmcoOSwgMTMpO1xuICAgICAgICAvLyB0aGlzLm1iTnVtYmVyID0gbnVtMSArIG51bTIgKyBudW0zO1xuICAgICAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5lbWFpbE1hdGNoVmFsaWRhdG9yKGVtYWlsQWRkcmVzcyk7XG4gICAgICAgIHRoaXMuaXNWYWxpZE1vYmlsZU5vID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlclZhbGlkYXRvcihtb2JpbGVOdW0pO1xuICAgICAgICB0aGlzLmlzRmlyc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGZpcnN0TmFtZSk7XG4gICAgICAgIHRoaXMuaXNMYXN0TmFtZUZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihsYXN0TmFtZSk7XG4gICAgICAgIHRoaXMuaXNGaXJzdE5hbWVWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5vbmx5QWxwaGFiZXRzVmFsaWRhdG9yKGZpcnN0TmFtZSk7XG4gICAgICAgIHRoaXMuaXNMYXN0TmFtZVZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm9ubHlBbHBoYWJldHNWYWxpZGF0b3IobGFzdE5hbWUpO1xuICAgICAgICB0aGlzLmlzQWdlVmFsaWQgPSB0aGlzLmlzRE9CVmFsaWQgJiYgdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1pbmltdW1BZ2VWYWxpZGF0b3IoZG9iKSAmJiB0aGlzLmlzRE9CRmlsbGVkO1xuICAgICAgICB0aGlzLmlzRE9CRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGRvYik7XG4gICAgICAgIHRoaXMuaXNET0JWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5kYXRlVmFsaWRhdG9yKGRvYik7XG5cbiAgICAgICAgdGhpcy5pc0VtYWlsRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGVtYWlsQWRkcmVzcyk7XG4gICAgICAgIHRoaXMuaXNNb2JpbGVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyRmlsbGVkVmFsaWRhdG9yKG1vYmlsZU51bSk7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9mbmFtZSA9IHRoaXMuZmlyc3ROYW1lO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfbG5hbWUgPSB0aGlzLmxhc3ROYW1lO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfZG9iID0gdGhpcy5kb2I7XG4gICAgICAgIHRoaXMucGVyc29uYWxJbmZvLmZuYW1lID0gdGhpcy5maXJzdE5hbWU7XG4gICAgICAgIHRoaXMucGVyc29uYWxJbmZvLmxuYW1lID0gdGhpcy5sYXN0TmFtZTtcbiAgICAgICAgdGhpcy5wZXJzb25hbEluZm8uZG9iID0gdGhpcy5kb2I7XG5cbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJtb2JpbGVcIikge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRW1haWwgJiYgdGhpcy5pc0FnZVZhbGlkICYmIHRoaXMuaXNFbWFpbEZpbGxlZCAmJiB0aGlzLmlzRmlyc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0xhc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuaXNGaXJzdE5hbWVGaWxsZWQgJiYgdGhpcy5pc0xhc3ROYW1lRmlsbGVkICYmIHRoaXMuaXNET0JGaWxsZWQpIHtcbiAgICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbmFsSW5mby5lbWFpbCA9IHRoaXMuZW1haWxBZGRyZXNzO1xuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uYWxJbmZvLm1vYmlsZSA9IHRoaXMucmVnX2lkO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vbWVtYmVyX2luZm9cIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJlbWFpbFwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkTW9iaWxlTm8gJiYgdGhpcy5pc0FnZVZhbGlkICYmIHRoaXMuaXNNb2JpbGVGaWxsZWQgJiYgdGhpcy5pc0ZpcnN0TmFtZVZhbGlkICYmIHRoaXMuaXNMYXN0TmFtZVZhbGlkICYmIHRoaXMuaXNET0JWYWxpZCAmJiB0aGlzLmlzRmlyc3ROYW1lRmlsbGVkICYmIHRoaXMuaXNMYXN0TmFtZUZpbGxlZCAmJiB0aGlzLmlzRE9CRmlsbGVkKSB7XG4gICAgICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uYWxJbmZvLm1vYmlsZSA9IHRoaXMuY3VycmVudE51bWJlcjtcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbmFsSW5mby5lbWFpbCA9IHRoaXMucmVnX2lkO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vbWVtYmVyX2luZm9cIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBnb0JhY2tGbigpIHtcbiAgICAgICAgLy8gdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuY2hhbmdlUmVnaXN0ZXIoKTtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQXV0aGVudGljYXRlR3JpZENsb3NlKCkge1xuICAgICAgIHRoaXMuX2dsb2JhbHMuaXNBdXRoQ2FuY2VsbGVkPXRydWU7XG4gICAgICAgdGhpcy5pc0F1dGhEaXNtaXNzZWQ9dGhpcy5fZ2xvYmFscy5pc0F1dGhDYW5jZWxsZWQ7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxuICAgICAgICB9O1xuICAgICAgICAvLyB0aGlzLl9nbG9iYWxzLnByb21vU3RhdGUgPSBcImZyb21SZWdpc3RyYXRpb25cIjtcbiAgICAgICAgLy8gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLnJlZ2lzdGVyX3R5cGUsIFwiY2FuY2VsLWF1dGhcIl0sIHtcbiAgICAgICAgLy8gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIHRoaXMuYXV0aFByb21vTW9kYWwuc2hvd01vZGFsKEF1dGhlbnRpY2F0ZVByb21vQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgLy8gICAgIGlmIChyZXMgPT09IFwiZnJvbXJlZ1wiKSB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9PT0gXCJSTlZcIikge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jcmVhdGUvdmVyaWZpY2F0aW9uXCIsIHRoaXMucmVnaXN0ZXJfdHlwZSwgXCJzaWduSW5WZXJpZnlcIl0sIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgZWxzZSBpZiAodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlID09PSBcIlJWXCIpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICB9XG4gICAgc2hvd1Jlc3RyaWN0ZWRBY2Nlc3NQb3B1cCgpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICB9O1xuICAgIHRoaXMuYXV0aFByb21vTW9kYWwuc2hvd01vZGFsKFJlc3RyaWN0ZWRBY2Nlc3NDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4oKHJlcykgPT4ge1xuXG4gICAgfSk7XG4gIH1cbiAgICBwdWJsaWMgdmFsaWRDaGVjayhhcmcsIHR5cGUpIHtcbiAgICAgICAgaWYgKGFyZyAhPT0gdW5kZWZpbmVkICYmIGFyZyAhPT0gXCJcIikge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcnN0TmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRmlyc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNGaXJzdE5hbWVWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5vbmx5QWxwaGFiZXRzVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsYXN0TmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTGFzdE5hbWVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xhc3ROYW1lVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uub25seUFscGhhYmV0c1ZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZW1haWxBZGRyZXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbEZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5lbWFpbE1hdGNoVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkb2JcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RPQkZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRE9CVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZGF0ZVZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQWdlVmFsaWQgPSB0aGlzLmlzRE9CVmFsaWQgJiYgdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1pbmltdW1BZ2VWYWxpZGF0b3IoYXJnKSAmJiAgdGhpcy5pc0RPQkZpbGxlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb2JpbGVOdW1cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01vYmlsZUZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5tb2JpbGVOdW1iZXJGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTm8gPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBzZXRVcGRhdGVkRGF0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMudWRhdGU7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnREYXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RGF0ZS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0RPQkZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcih0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRE9CVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZGF0ZVZhbGlkYXRvcih0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWdlVmFsaWQgPSB0aGlzLmlzRE9CVmFsaWQgJiYgdGhpcy5pc0RPQkZpbGxlZCAmJiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubWluaW11bUFnZVZhbGlkYXRvcih0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgc2V0VXBkYXRlZE51bWJlclZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudW51bWJlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLmN1cnJlbnROdW1iZXIgPSB0aGlzLnVudW1iZXI7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnROdW1iZXIgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnROdW1iZXIubGVuZ3RoID09PSAxMykge1xuICAgICAgICAgICAgICAgIGxldCBudW0xID0gdGhpcy5jdXJyZW50TnVtYmVyLnN1YnN0cmluZygxLCA0KTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtMiA9IHRoaXMuY3VycmVudE51bWJlci5zdWJzdHJpbmcoNSwgOCk7XG4gICAgICAgICAgICAgICAgbGV0IG51bTMgPSB0aGlzLmN1cnJlbnROdW1iZXIuc3Vic3RyaW5nKDksIDEzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1iTnVtYmVyID0gbnVtMSArIG51bTIgKyBudW0zO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb2JpbGVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyRmlsbGVkVmFsaWRhdG9yKHRoaXMubWJOdW1iZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZE1vYmlsZU5vID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlclZhbGlkYXRvcih0aGlzLm1iTnVtYmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZUNvbmdyYXRzR3JpZCgpIHtcbiAgICAgICAgdGhpcy5jb25ncmF0c0dyaWQubmF0aXZlRWxlbWVudC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmNvbmdyYXRzU2hhZG93Lm5hdGl2ZUVsZW1lbnQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcbiAgICAgICAgXG4gICAgfVxuICAgIGdvVG9MYXN0TmFtZSgpIHtcbiAgICAgICAgdGhpcy5sYXN0TmFtZUZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgZ29Ub0RPQigpIHtcbiAgICAgICAgdGhpcy5ET0JUZXh0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBnb1RvTW9FbWFpbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJtb2JpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5lbWFpbFRleHRGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcImVtYWlsXCIpIHtcbiAgICAgICAgICAgIHRoaXMubW9UZXh0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICBhcnRpY2xlRGV0YWlsKCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvYXJ0aWNsZURldGFpbFwiXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgY29udGFjdFVzKCkge1xuICAgIC8vIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NvbnRhY3RVc1wiXSwge1xuICAgIC8vICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgLy8gfSk7XG4gICAgdGhpcy5zaG93UmVzdHJpY3RlZEFjY2Vzc1BvcHVwKCk7XG4gIH1cbiAgc2VhcmNoTm93KCl7XG4gICAgICB0aGlzLnNob3dSZXN0cmljdGVkQWNjZXNzUG9wdXAoKTtcbiAgfVxuICAgcHVibGljIGF1dG9Gb3JtYXQoZG9iKXsgICAgXG4gICAgICAgbGV0IGlzRXJhc2luZzpib29sZWFuID0gZmFsc2U7XG4gICAgICAgaWYodGhpcy5vbGRET0I9PSB1bmRlZmluZWQgfHwgdGhpcy5vbGRET0I9PVwiXCIpXG4gICAgICAge1xuICAgICAgICAgICB0aGlzLm9sZERPQiA9IGRvYjtcbiAgICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICAgaWYodGhpcy5vbGRET0IubGVuZ3RoPmRvYi5sZW5ndGgpXG4gICAgICAgICAgIHsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpc0VyYXNpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub2xkRE9CID0gZG9iOyAgICAgICAgICAgICAgIFxuICAgICAgICAgICB9XG4gICAgICB9IFxuIFxuICAgICAgaWYoISBpc0VyYXNpbmcgKXtcbiAgICAgICAgIGlmKGRvYiE9PXVuZGVmaW5lZCAmJiBkb2IhPT1cIlwiKXtcbiAgICAgICAgaWYoZG9iLmxlbmd0aD09Myl7XG4gICAgICAgIC8vIHRoaXMuZG9iPXRoaXMuZG9iKycvJztcbiAgICAgICAgaWYoZG9iLmNoYXJBdChkb2IubGVuZ3RoLTEpIT1cIi9cIil7XG4gICAgICAgICAgICAgdGhpcy5kb2I9ZG9iLnNsaWNlKDAsIGRvYi5sZW5ndGgtMSkgKyBcIi9cIiArIGRvYi5zbGljZShkb2IubGVuZ3RoLTEpO1xuICAgICAgICAgbGV0IG5leHRUZXh0RmllbGQ6VGV4dEZpZWxkID0gPFRleHRGaWVsZD4gdGhpcy5ET0JUZXh0RmllbGQubmF0aXZlRWxlbWVudDsgXG4gICAgICAgIG5leHRUZXh0RmllbGQudGV4dCA9IHRoaXMuZG9iOyAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCAoKCkgPT4ge1xuICAgICAgbmV4dFRleHRGaWVsZC5hbmRyb2lkLnNldFNlbGVjdGlvbihkb2IubGVuZ3RoKzEpO1xuICAgIH0sIDEwMClcbiAgICAgICAgfSAgICAgICBcbiAgICB9ICAgIFxuICAgIGVsc2UgaWYoZG9iLmxlbmd0aD09Nil7XG4gICAgICAgIC8vIHRoaXMuZG9iPXRoaXMuZG9iKycvJztcbiAgICAgICAgaWYoZG9iLmNoYXJBdChkb2IubGVuZ3RoLTEpIT1cIi9cIil7XG4gICAgICAgICAgICAgdGhpcy5kb2I9ZG9iLnNsaWNlKDAsIGRvYi5sZW5ndGgtMSkgKyBcIi9cIiArIGRvYi5zbGljZShkb2IubGVuZ3RoLTEpO1xuICAgICAgICAgICAgIGxldCBuZXh0VGV4dEZpZWxkOlRleHRGaWVsZCA9IDxUZXh0RmllbGQ+IHRoaXMuRE9CVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7IFxuICAgICAgICBuZXh0VGV4dEZpZWxkLnRleHQgPSB0aGlzLmRvYjsgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQgKCgpID0+IHtcbiAgICAgIG5leHRUZXh0RmllbGQuYW5kcm9pZC5zZXRTZWxlY3Rpb24oZG9iLmxlbmd0aCsxKTtcbiAgICB9LCAxMDApXG4gICAgICAgIH0gICAgICAgIFxuIH1cbiBlbHNlIGlmKGRvYi5sZW5ndGg9PTEwKXtcbiAgICAgdGhpcy5vbGRET0I9dGhpcy5kb2I7XG4gICAgICB9XG4gICB9XG4gICAgICB9XG4gICAgXG4gICAgfVxuICBcbn0iXX0=