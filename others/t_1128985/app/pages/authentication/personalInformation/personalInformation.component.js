"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var router_3 = require("nativescript-angular/router");
var forms_1 = require("@angular/forms");
var formValidation_service_1 = require("../../../shared/services/formValidation.service");
var authentication_service_1 = require("../authentication.service");
var global_1 = require("../../../shared/global");
var app = require("tns-core-modules/application");
var page_1 = require("ui/page");
var authentication_model_1 = require("../authentication.model");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
// import { MaskedTextFieldModule } from "nativescript-masked-text-field/angular";
var PersonalInformationComponent = (function () {
    //  @ViewChild("dob") dob1: ElementRef;
    function PersonalInformationComponent(route, _globals, auth_service, _formValidationService, router, fb, page, _routerExtensions) {
        this.route = route;
        this._globals = _globals;
        this.auth_service = auth_service;
        this._formValidationService = _formValidationService;
        this.router = router;
        this.fb = fb;
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this.title = "Authentication";
        this.isValidEmail = true;
        this.isEmailFilled = true;
        this.isValidMobileNo = true;
        this.isFirstNameValid = true;
        this.isFirstNameFilled = true;
        this.isLastNameFilled = true;
        this.isLastNameValid = true;
        this.isDOBValid = true;
        this.isMobileFilled = true;
        this.isDOBFilled = true;
        this.isAgeValid = true;
        this.pinfo = new authentication_model_1.PersonalInfo();
        this.personForm = fb.group({
            "firstName": ["", [forms_1.Validators.required,]],
            "lastName": ["", [forms_1.Validators.required]],
            "emailAddress": ["", [forms_1.Validators.required]],
            "mobileNum": ["", [forms_1.Validators.required]],
            "dob": ["", [forms_1.Validators.required]],
        });
    }
    PersonalInformationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hintText = "MM/DD/YYYY";
        this.currentDate = "";
        this.currentNumber = "";
        this._globals.user_state = "RNV";
        this._globals.is_auth_cancelled = false;
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
    };
    PersonalInformationComponent.prototype.onContinue = function (firstName, lastName, emailAddress, dob, mobileNum) {
        //on click of continue
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
        this.pinfo.fname = this.firstName;
        this.pinfo.lname = this.lastName;
        this.pinfo.dob = this.dob;
        if (this.register_type === "mobile") {
            if (this.isValidEmail && this.isEmailFilled && this.isAgeValid && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
                loader.show();
                this.pinfo.email = this.emailAddress;
                this.pinfo.mobile = this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
                loader.hide();
            }
        }
        else if (this.register_type === "email") {
            if (this.isValidMobileNo && this.isMobileFilled && this.isAgeValid && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
                loader.show();
                this.pinfo.mobile = this.mobileNum;
                this.pinfo.email = this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
                loader.hide();
            }
        }
    };
    PersonalInformationComponent.prototype.goBackFn = function () {
        // this.routerExtensions.back();
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        this._routerExtensions.navigate(["/home/signedHome"], {
            animated: false
        });
    };
    //on click of cancel
    PersonalInformationComponent.prototype.oncancelFn = function () {
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        if (this._globals.user_state === "RNV") {
            this._routerExtensions.navigate(["/create/verification", this._globals.registration_mode, "maybelater"], {
                animated: false
            });
        }
        else if (this._globals.user_state === "RV") {
            this._routerExtensions.navigate(["/home/signedHome"], {
                animated: false
            });
        }
    };
    // For dynamic validation 
    PersonalInformationComponent.prototype.validCheck = function (arg, type) {
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
    PersonalInformationComponent.prototype.goToLastNameField = function () {
        this.lastNameField.nativeElement.focus();
    };
    PersonalInformationComponent.prototype.goToDOBField = function () {
        this.DOBTextField.nativeElement.focus();
    };
    PersonalInformationComponent.prototype.goToMoEmail = function () {
        if (this.register_type === "mobile") {
            this.emailField.nativeElement.focus();
        }
        else if (this.register_type === "email") {
            this.moField.nativeElement.focus();
        }
    };
    // To Autoformat the date of birth
    PersonalInformationComponent.prototype.autoFormat = function (dob) {
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
    return PersonalInformationComponent;
}());
__decorate([
    core_1.ViewChild("firstNameField"),
    __metadata("design:type", core_1.ElementRef)
], PersonalInformationComponent.prototype, "firstNameField", void 0);
__decorate([
    core_1.ViewChild("lastNameField"),
    __metadata("design:type", core_1.ElementRef)
], PersonalInformationComponent.prototype, "lastNameField", void 0);
__decorate([
    core_1.ViewChild("DOBTextField"),
    __metadata("design:type", core_1.ElementRef)
], PersonalInformationComponent.prototype, "DOBTextField", void 0);
__decorate([
    core_1.ViewChild("moField"),
    __metadata("design:type", core_1.ElementRef)
], PersonalInformationComponent.prototype, "moField", void 0);
__decorate([
    core_1.ViewChild("emailField"),
    __metadata("design:type", core_1.ElementRef)
], PersonalInformationComponent.prototype, "emailField", void 0);
PersonalInformationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./personalInformation.component.html",
        styleUrls: ["../authentication.css"]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        global_1.Globals,
        authentication_service_1.AuthenticationService,
        formValidation_service_1.FormValidationService,
        router_2.Router,
        forms_1.FormBuilder,
        page_1.Page,
        router_3.RouterExtensions])
], PersonalInformationComponent);
exports.PersonalInformationComponent = PersonalInformationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uYWxJbmZvcm1hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZXJzb25hbEluZm9ybWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRTtBQUMxRSwwQ0FBaUQ7QUFDakQsMENBQXlDO0FBRXpDLHNEQUErRDtBQUMvRCx3Q0FBdUg7QUFDdkgsMEZBQXdGO0FBQ3hGLG9FQUFrRTtBQUNsRSxpREFBaUQ7QUFFakQsa0RBQW9EO0FBRXBELGdDQUErQjtBQUUvQixnRUFBdUQ7QUFDdkQsaUZBQWdFO0FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQUNwQyxrRkFBa0Y7QUFRbEYsSUFBYSw0QkFBNEI7SUF1Q3ZDLHVDQUF1QztJQUVyQyxzQ0FBMkIsS0FBcUIsRUFDckMsUUFBaUIsRUFDakIsWUFBbUMsRUFDbEMsc0JBQTZDLEVBQzdDLE1BQWMsRUFDZCxFQUFlLEVBQ2YsSUFBVSxFQUNWLGlCQUFtQztRQVBwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUNsQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUEvQy9DLFVBQUssR0FBVyxnQkFBZ0IsQ0FBQztRQUkxQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLElBQUksQ0FBQztR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Q0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO29CQUNILENBQUM7Z0JBQ1IsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFDO29CQUNwQixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3BCLENBQUM7WUFDSixDQUFDO1FBQ0UsQ0FBQztJQUVILENBQUM7SUFDTCxtQ0FBQztBQUFELENBQUMsQUFwUEQsSUFvUEM7QUFyTmdDO0lBQTVCLGdCQUFTLENBQUMsZ0JBQWdCLENBQUM7OEJBQWlCLGlCQUFVO29FQUFDO0FBQzVCO0lBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDOzhCQUFnQixpQkFBVTttRUFBQztBQUMzQjtJQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQzs4QkFBZSxpQkFBVTtrRUFBQztBQUM5QjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBVSxpQkFBVTs2REFBQztBQUNqQjtJQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQzs4QkFBYSxpQkFBVTtnRUFBQztBQW5DdkMsNEJBQTRCO0lBTHhDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUN2QyxDQUFDO3FDQTBDb0MsdUJBQWM7UUFDM0IsZ0JBQU87UUFDSCw4Q0FBcUI7UUFDViw4Q0FBcUI7UUFDckMsZUFBTTtRQUNWLG1CQUFXO1FBQ1QsV0FBSTtRQUNTLHlCQUFnQjtHQWhEdEMsNEJBQTRCLENBb1B4QztBQXBQWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycywgUmVhY3RpdmVGb3Jtc01vZHVsZSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzTW9kdWxlIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgUGVyc29uYWxJbmZvIH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uLm1vZGVsXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuLy8gaW1wb3J0IHsgTWFza2VkVGV4dEZpZWxkTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXNrZWQtdGV4dC1maWVsZC9hbmd1bGFyXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BlcnNvbmFsSW5mb3JtYXRpb24uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4uL2F1dGhlbnRpY2F0aW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBQZXJzb25hbEluZm9ybWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICB0aXRsZTogc3RyaW5nID0gXCJBdXRoZW50aWNhdGlvblwiO1xuICAgIHB1YmxpYyBwZXJzb25Gb3JtOiBGb3JtR3JvdXA7XG4gICAgcHVibGljIHJlZ19pZDogc3RyaW5nO1xuICAgIHB1YmxpYyByZWdpc3Rlcl90eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGlzVmFsaWRFbWFpbDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzRW1haWxGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc1ZhbGlkTW9iaWxlTm86IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0ZpcnN0TmFtZVZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNGaXJzdE5hbWVGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0xhc3ROYW1lRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNMYXN0TmFtZVZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNET0JWYWxpZDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzTW9iaWxlRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNET0JGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0FnZVZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgb3RoZXJUeXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBkb2I6IHN0cmluZztcbiAgICBwdWJsaWMgbW9iaWxlTnVtOiBzdHJpbmc7XG4gICAgcHVibGljIGVtYWlsQWRkcmVzczogc3RyaW5nO1xuICAgIHB1YmxpYyB1ZGF0ZTtcbiAgICBwdWJsaWMgdW51bWJlcjtcbiAgICBwdWJsaWMgY3VycmVudERhdGU7XG4gICAgcHVibGljIGN1cnJlbnROdW1iZXI7XG4gICAgcHVibGljIG1iTnVtYmVyO1xuICAgIHB1YmxpYyBvbGRET0I6c3RyaW5nO1xuICAgIHB1YmxpYyBoaW50VGV4dDpzdHJpbmc7XG4gICAgcGluZm8gPSBuZXcgUGVyc29uYWxJbmZvKCk7XG4gICAgXG4gICAgQFZpZXdDaGlsZChcImZpcnN0TmFtZUZpZWxkXCIpIGZpcnN0TmFtZUZpZWxkOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJsYXN0TmFtZUZpZWxkXCIpIGxhc3ROYW1lRmllbGQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcIkRPQlRleHRGaWVsZFwiKSBET0JUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcIm1vRmllbGRcIikgbW9GaWVsZDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiZW1haWxGaWVsZFwiKSBlbWFpbEZpZWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIFxuXG4gIC8vICBAVmlld0NoaWxkKFwiZG9iXCIpIGRvYjE6IEVsZW1lbnRSZWY7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcbiAgICAgICAgcHVibGljIGF1dGhfc2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9mb3JtVmFsaWRhdGlvblNlcnZpY2U6IEZvcm1WYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLnBlcnNvbkZvcm0gPSBmYi5ncm91cCh7XG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIF1dLFxuICAgICAgICAgICAgXCJsYXN0TmFtZVwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcbiAgICAgICAgICAgIFwiZW1haWxBZGRyZXNzXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxuICAgICAgICAgICAgXCJtb2JpbGVOdW1cIjogW1wiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXG4gICAgICAgICAgICBcImRvYlwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcbiAgICAgICAgICAgIFxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmhpbnRUZXh0PVwiTU0vREQvWVlZWVwiO1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gXCJcIjtcbiAgICAgICAgdGhpcy5jdXJyZW50TnVtYmVyPVwiXCI7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9IFwiUk5WXCI7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNfYXV0aF9jYW5jZWxsZWQ9ZmFsc2U7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH1cIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlcl90eXBlID0gcGFyYW1zW1widHlwZVwiXTtcbiAgICAgICAgICAgIHRoaXMucmVnX2lkID0gcGFyYW1zW1wiaWRcIl07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmF1dGhfc2VydmljZS51c2VyX3JlZ2lzdHJhdGlvbl90eXBlID0gdGhpcy5yZWdpc3Rlcl90eXBlO1xuICAgICAgICB0aGlzLmF1dGhfc2VydmljZS51c2VyX25hbWUgPSB0aGlzLnJlZ19pZDtcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJtb2JpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5vdGhlclR5cGUgPSBcImVtYWlsXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcImVtYWlsXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJtb2JpbGVcIjtcbiAgICAgICAgfSAgICAgICBcbiAgICAgICAgICAgXG4gICAgICAgXG4gICAgfVxuICAgIHB1YmxpYyBvbkNvbnRpbnVlKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsQWRkcmVzcyxkb2IsbW9iaWxlTnVtKSB7ICAgICAgICAgXG4gICAgICAvL29uIGNsaWNrIG9mIGNvbnRpbnVlXG4gICAgICAgIHRoaXMuaXNWYWxpZEVtYWlsID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmVtYWlsTWF0Y2hWYWxpZGF0b3IoZW1haWxBZGRyZXNzKTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTm8gPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyVmFsaWRhdG9yKG1vYmlsZU51bSk7XG4gICAgICAgIHRoaXMuaXNGaXJzdE5hbWVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoZmlyc3ROYW1lKTtcbiAgICAgICAgdGhpcy5pc0xhc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGxhc3ROYW1lKTtcbiAgICAgICAgdGhpcy5pc0ZpcnN0TmFtZVZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm9ubHlBbHBoYWJldHNWYWxpZGF0b3IoZmlyc3ROYW1lKTtcbiAgICAgICAgdGhpcy5pc0xhc3ROYW1lVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uub25seUFscGhhYmV0c1ZhbGlkYXRvcihsYXN0TmFtZSk7XG4gICAgICAgIHRoaXMuaXNBZ2VWYWxpZCA9IHRoaXMuaXNET0JWYWxpZCAmJiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubWluaW11bUFnZVZhbGlkYXRvcihkb2IpICYmICB0aGlzLmlzRE9CRmlsbGVkO1xuICAgICAgICB0aGlzLmlzRE9CRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGRvYik7XG4gICAgICAgIHRoaXMuaXNET0JWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5kYXRlVmFsaWRhdG9yKGRvYik7ICAgICAgIFxuICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoZW1haWxBZGRyZXNzKTtcbiAgICAgICAgdGhpcy5pc01vYmlsZUZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5tb2JpbGVOdW1iZXJGaWxsZWRWYWxpZGF0b3IoIG1vYmlsZU51bSk7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9mbmFtZSA9IHRoaXMuZmlyc3ROYW1lO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfbG5hbWUgPSB0aGlzLmxhc3ROYW1lO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfZG9iID0gdGhpcy5kb2I7XG4gICAgICAgIHRoaXMucGluZm8uZm5hbWU9dGhpcy5maXJzdE5hbWU7XG4gICAgICAgIHRoaXMucGluZm8ubG5hbWU9dGhpcy5sYXN0TmFtZTtcbiAgICAgICAgdGhpcy5waW5mby5kb2I9dGhpcy5kb2I7XG5cbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJtb2JpbGVcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZEVtYWlsICYmIHRoaXMuaXNFbWFpbEZpbGxlZCAmJnRoaXMuaXNBZ2VWYWxpZCAmJiB0aGlzLmlzRmlyc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0xhc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuaXNGaXJzdE5hbWVGaWxsZWQgJiYgdGhpcy5pc0xhc3ROYW1lRmlsbGVkICYmIHRoaXMuaXNET0JGaWxsZWQpIHtcbiAgICAgICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgICAgICAgICB0aGlzLnBpbmZvLmVtYWlsPXRoaXMuZW1haWxBZGRyZXNzO1xuICAgICAgICAgICAgICAgdGhpcy5waW5mby5tb2JpbGU9dGhpcy5yZWdfaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9tZW1iZXJfaW5mb1wiXSwge1xuICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJlbWFpbFwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkTW9iaWxlTm8gJiYgdGhpcy5pc01vYmlsZUZpbGxlZCAmJnRoaXMuaXNBZ2VWYWxpZCAmJiB0aGlzLmlzRmlyc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0xhc3ROYW1lVmFsaWQgJiYgdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuaXNGaXJzdE5hbWVGaWxsZWQgJiYgdGhpcy5pc0xhc3ROYW1lRmlsbGVkICYmIHRoaXMuaXNET0JGaWxsZWQpIHtcbiAgICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgICAgICAgIHRoaXMucGluZm8ubW9iaWxlPXRoaXMubW9iaWxlTnVtO1xuICAgICAgICAgICAgICAgdGhpcy5waW5mby5lbWFpbD10aGlzLnJlZ19pZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL21lbWJlcl9pbmZvXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBnb0JhY2tGbigpIHtcbiAgICAgICAgLy8gdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuY2hhbmdlUmVnaXN0ZXIoKTtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL29uIGNsaWNrIG9mIGNhbmNlbFxuICAgIHB1YmxpYyBvbmNhbmNlbEZuKCkgeyAgICBcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuY2hhbmdlUmVnaXN0ZXIoKTtcbiAgICAgICAgaWYodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlPT09XCJSTlZcIil7XG4gICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NyZWF0ZS92ZXJpZmljYXRpb25cIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgXCJtYXliZWxhdGVyXCJdLCB7XG4gICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlPT09XCJSVlwiKXtcbiAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcbiAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIH0gICAgICBcbiAgICB9XG4gICAgLy8gRm9yIGR5bmFtaWMgdmFsaWRhdGlvbiBcbiAgICBwdWJsaWMgdmFsaWRDaGVjayhhcmcsIHR5cGUpIHtcbiAgICAgICAgaWYgKGFyZyAhPT0gdW5kZWZpbmVkICYmIGFyZyAhPT0gXCJcIikge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcnN0TmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRmlyc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNGaXJzdE5hbWVWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5vbmx5QWxwaGFiZXRzVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsYXN0TmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTGFzdE5hbWVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xhc3ROYW1lVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uub25seUFscGhhYmV0c1ZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSBcImVtYWlsQWRkcmVzc1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkRW1haWwgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZW1haWxNYXRjaFZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9iXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNET0JGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RPQlZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmRhdGVWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FnZVZhbGlkID0gdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5taW5pbXVtQWdlVmFsaWRhdG9yKGFyZykgJiYgIHRoaXMuaXNET0JGaWxsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyBcbiAgICAgICAgICAgICAgICBjYXNlIFwibW9iaWxlTnVtXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNb2JpbGVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyRmlsbGVkVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZE1vYmlsZU5vID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlclZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgXG4gICAgXG4gICAgZ29Ub0xhc3ROYW1lRmllbGQoKSB7XG4gICAgICAgIHRoaXMubGFzdE5hbWVGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGdvVG9ET0JGaWVsZCgpIHtcbiAgICAgICAgdGhpcy5ET0JUZXh0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBnb1RvTW9FbWFpbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJtb2JpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5lbWFpbEZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnJlZ2lzdGVyX3R5cGUgPT09IFwiZW1haWxcIikge1xuICAgICAgICAgICAgdGhpcy5tb0ZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUbyBBdXRvZm9ybWF0IHRoZSBkYXRlIG9mIGJpcnRoXG4gIHB1YmxpYyBhdXRvRm9ybWF0KGRvYil7ICAgIFxuICAgICAgIGxldCBpc0VyYXNpbmc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgIGlmKHRoaXMub2xkRE9CPT0gdW5kZWZpbmVkIHx8IHRoaXMub2xkRE9CPT1cIlwiKVxuICAgICAgIHtcbiAgICAgICAgICAgdGhpcy5vbGRET0IgPSBkb2I7XG4gICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgIGlmKHRoaXMub2xkRE9CLmxlbmd0aD5kb2IubGVuZ3RoKVxuICAgICAgICAgICB7ICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaXNFcmFzaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZERPQiA9IGRvYjsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgfVxuICAgICAgfSBcbiAgICAgIGlmKCEgaXNFcmFzaW5nICl7XG4gICAgICAgICBpZihkb2IhPT11bmRlZmluZWQgJiYgZG9iIT09XCJcIil7XG4gICAgICAgIGlmKGRvYi5sZW5ndGg9PTMpe1xuICAgICAgICAvLyB0aGlzLmRvYj10aGlzLmRvYisnLyc7XG4gICAgICAgIGlmKGRvYi5jaGFyQXQoZG9iLmxlbmd0aC0xKSE9XCIvXCIpe1xuICAgICAgICAgICAgIHRoaXMuZG9iPWRvYi5zbGljZSgwLCBkb2IubGVuZ3RoLTEpICsgXCIvXCIgKyBkb2Iuc2xpY2UoZG9iLmxlbmd0aC0xKTtcbiAgICAgICAgIGxldCBuZXh0VGV4dEZpZWxkOlRleHRGaWVsZCA9IDxUZXh0RmllbGQ+IHRoaXMuRE9CVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7IFxuICAgICAgICBuZXh0VGV4dEZpZWxkLnRleHQgPSB0aGlzLmRvYjsgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQgKCgpID0+IHtcbiAgICAgIG5leHRUZXh0RmllbGQuYW5kcm9pZC5zZXRTZWxlY3Rpb24oZG9iLmxlbmd0aCsxKTtcbiAgICB9LCAxMDApXG4gICAgICAgIH0gICAgICAgXG4gICAgfSAgICBcbiAgICBlbHNlIGlmKGRvYi5sZW5ndGg9PTYpe1xuICAgICAgICAvLyB0aGlzLmRvYj10aGlzLmRvYisnLyc7XG4gICAgICAgIGlmKGRvYi5jaGFyQXQoZG9iLmxlbmd0aC0xKSE9XCIvXCIpe1xuICAgICAgICAgICAgIHRoaXMuZG9iPWRvYi5zbGljZSgwLCBkb2IubGVuZ3RoLTEpICsgXCIvXCIgKyBkb2Iuc2xpY2UoZG9iLmxlbmd0aC0xKTtcbiAgICAgICAgICAgICBsZXQgbmV4dFRleHRGaWVsZDpUZXh0RmllbGQgPSA8VGV4dEZpZWxkPiB0aGlzLkRPQlRleHRGaWVsZC5uYXRpdmVFbGVtZW50OyBcbiAgICAgICAgbmV4dFRleHRGaWVsZC50ZXh0ID0gdGhpcy5kb2I7ICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0ICgoKSA9PiB7XG4gICAgICBuZXh0VGV4dEZpZWxkLmFuZHJvaWQuc2V0U2VsZWN0aW9uKGRvYi5sZW5ndGgrMSk7XG4gICAgfSwgMTAwKVxuICAgICAgICB9ICAgICAgICBcbiB9XG4gZWxzZSBpZihkb2IubGVuZ3RoPT0xMCl7XG4gICAgIHRoaXMub2xkRE9CPXRoaXMuZG9iO1xuICAgICAgfVxuICAgfVxuICAgICAgfVxuICAgIFxuICAgIH1cbn0iXX0=