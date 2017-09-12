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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uYWxJbmZvcm1hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZXJzb25hbEluZm9ybWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRTtBQUMxRSwwQ0FBaUQ7QUFDakQsMENBQXlDO0FBRXpDLHNEQUErRDtBQUMvRCx3Q0FBdUg7QUFDdkgsMEZBQXdGO0FBQ3hGLG9FQUFrRTtBQUNsRSxpREFBaUQ7QUFFakQsa0RBQW9EO0FBRXBELGdDQUErQjtBQUUvQixnRUFBdUQ7QUFDdkQsaUZBQWdFO0FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQUNwQyxrRkFBa0Y7QUFRbEYsSUFBYSw0QkFBNEI7SUF1Q3ZDLHVDQUF1QztJQUVyQyxzQ0FBMkIsS0FBcUIsRUFDckMsUUFBaUIsRUFDakIsWUFBbUMsRUFDbEMsc0JBQTZDLEVBQzdDLE1BQWMsRUFDZCxFQUFlLEVBQ2YsSUFBVSxFQUNWLGlCQUFtQztRQVBwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUNsQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUEvQy9DLFVBQUssR0FBVyxnQkFBZ0IsQ0FBQztRQUkxQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLElBQUksQ0FBQztR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Q0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO29CQUNILENBQUM7Z0JBQ1IsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFDO29CQUNwQixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3BCLENBQUM7WUFDSixDQUFDO1FBQ0UsQ0FBQztJQUVILENBQUM7SUFDTCxtQ0FBQztBQUFELENBQUMsQUFwUEQsSUFvUEM7QUFyTmdDO0lBQTVCLGdCQUFTLENBQUMsZ0JBQWdCLENBQUM7OEJBQWlCLGlCQUFVO29FQUFDO0FBQzVCO0lBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDOzhCQUFnQixpQkFBVTttRUFBQztBQUMzQjtJQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQzs4QkFBZSxpQkFBVTtrRUFBQztBQUM5QjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBVSxpQkFBVTs2REFBQztBQUNqQjtJQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQzs4QkFBYSxpQkFBVTtnRUFBQztBQW5DdkMsNEJBQTRCO0lBTHhDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUN2QyxDQUFDO3FDQTBDb0MsdUJBQWM7UUFDM0IsZ0JBQU87UUFDSCw4Q0FBcUI7UUFDViw4Q0FBcUI7UUFDckMsZUFBTTtRQUNWLG1CQUFXO1FBQ1QsV0FBSTtRQUNTLHlCQUFnQjtHQWhEdEMsNEJBQTRCLENBb1B4QztBQXBQWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzTW9kdWxlIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFBlcnNvbmFsSW5mbyB9IGZyb20gXCIuLi9hdXRoZW50aWNhdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbi8vIGltcG9ydCB7IE1hc2tlZFRleHRGaWVsZE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFza2VkLXRleHQtZmllbGQvYW5ndWxhclwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGVyc29uYWxJbmZvcm1hdGlvbi5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuLi9hdXRoZW50aWNhdGlvbi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBlcnNvbmFsSW5mb3JtYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdGl0bGU6IHN0cmluZyA9IFwiQXV0aGVudGljYXRpb25cIjtcclxuICAgIHB1YmxpYyBwZXJzb25Gb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBwdWJsaWMgcmVnX2lkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJfdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzVmFsaWRFbWFpbDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNFbWFpbEZpbGxlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNWYWxpZE1vYmlsZU5vOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc0ZpcnN0TmFtZVZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc0ZpcnN0TmFtZUZpbGxlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNMYXN0TmFtZUZpbGxlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNMYXN0TmFtZVZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc0RPQlZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc01vYmlsZUZpbGxlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNET0JGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzQWdlVmFsaWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIG90aGVyVHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGxhc3ROYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZG9iOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbW9iaWxlTnVtOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZW1haWxBZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdWRhdGU7XHJcbiAgICBwdWJsaWMgdW51bWJlcjtcclxuICAgIHB1YmxpYyBjdXJyZW50RGF0ZTtcclxuICAgIHB1YmxpYyBjdXJyZW50TnVtYmVyO1xyXG4gICAgcHVibGljIG1iTnVtYmVyO1xyXG4gICAgcHVibGljIG9sZERPQjpzdHJpbmc7XHJcbiAgICBwdWJsaWMgaGludFRleHQ6c3RyaW5nO1xyXG4gICAgcGluZm8gPSBuZXcgUGVyc29uYWxJbmZvKCk7XHJcbiAgICBcclxuICAgIEBWaWV3Q2hpbGQoXCJmaXJzdE5hbWVGaWVsZFwiKSBmaXJzdE5hbWVGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJsYXN0TmFtZUZpZWxkXCIpIGxhc3ROYW1lRmllbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwiRE9CVGV4dEZpZWxkXCIpIERPQlRleHRGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJtb0ZpZWxkXCIpIG1vRmllbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwiZW1haWxGaWVsZFwiKSBlbWFpbEZpZWxkOiBFbGVtZW50UmVmO1xyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgLy8gIEBWaWV3Q2hpbGQoXCJkb2JcIikgZG9iMTogRWxlbWVudFJlZjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgICAgIHB1YmxpYyBhdXRoX3NlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9mb3JtVmFsaWRhdGlvblNlcnZpY2U6IEZvcm1WYWxpZGF0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgdGhpcy5wZXJzb25Gb3JtID0gZmIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIF1dLFxyXG4gICAgICAgICAgICBcImxhc3ROYW1lXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgICAgICBcImVtYWlsQWRkcmVzc1wiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgICAgICAgXCJtb2JpbGVOdW1cIjogW1wiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgICAgICAgIFwiZG9iXCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5oaW50VGV4dD1cIk1NL0REL1lZWVlcIjtcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gXCJcIjtcclxuICAgICAgICB0aGlzLmN1cnJlbnROdW1iZXI9XCJcIjtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBcIlJOVlwiO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNfYXV0aF9jYW5jZWxsZWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJfdHlwZSA9IHBhcmFtc1tcInR5cGVcIl07XHJcbiAgICAgICAgICAgIHRoaXMucmVnX2lkID0gcGFyYW1zW1wiaWRcIl07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hdXRoX3NlcnZpY2UudXNlcl9yZWdpc3RyYXRpb25fdHlwZSA9IHRoaXMucmVnaXN0ZXJfdHlwZTtcclxuICAgICAgICB0aGlzLmF1dGhfc2VydmljZS51c2VyX25hbWUgPSB0aGlzLnJlZ19pZDtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJlbWFpbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnJlZ2lzdGVyX3R5cGUgPT09IFwiZW1haWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVyVHlwZSA9IFwibW9iaWxlXCI7XHJcbiAgICAgICAgfSAgICAgICBcclxuICAgICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ29udGludWUoZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWxBZGRyZXNzLGRvYixtb2JpbGVOdW0pIHsgICAgICAgICBcclxuICAgICAgLy9vbiBjbGljayBvZiBjb250aW51ZVxyXG4gICAgICAgIHRoaXMuaXNWYWxpZEVtYWlsID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmVtYWlsTWF0Y2hWYWxpZGF0b3IoZW1haWxBZGRyZXNzKTtcclxuICAgICAgICB0aGlzLmlzVmFsaWRNb2JpbGVObyA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5tb2JpbGVOdW1iZXJWYWxpZGF0b3IobW9iaWxlTnVtKTtcclxuICAgICAgICB0aGlzLmlzRmlyc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGZpcnN0TmFtZSk7XHJcbiAgICAgICAgdGhpcy5pc0xhc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGxhc3ROYW1lKTtcclxuICAgICAgICB0aGlzLmlzRmlyc3ROYW1lVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uub25seUFscGhhYmV0c1ZhbGlkYXRvcihmaXJzdE5hbWUpO1xyXG4gICAgICAgIHRoaXMuaXNMYXN0TmFtZVZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm9ubHlBbHBoYWJldHNWYWxpZGF0b3IobGFzdE5hbWUpO1xyXG4gICAgICAgIHRoaXMuaXNBZ2VWYWxpZCA9IHRoaXMuaXNET0JWYWxpZCAmJiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubWluaW11bUFnZVZhbGlkYXRvcihkb2IpICYmICB0aGlzLmlzRE9CRmlsbGVkO1xyXG4gICAgICAgIHRoaXMuaXNET0JGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoZG9iKTtcclxuICAgICAgICB0aGlzLmlzRE9CVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZGF0ZVZhbGlkYXRvcihkb2IpOyAgICAgICBcclxuICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoZW1haWxBZGRyZXNzKTtcclxuICAgICAgICB0aGlzLmlzTW9iaWxlRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1vYmlsZU51bWJlckZpbGxlZFZhbGlkYXRvciggbW9iaWxlTnVtKTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfZm5hbWUgPSB0aGlzLmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfbG5hbWUgPSB0aGlzLmxhc3ROYW1lO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9kb2IgPSB0aGlzLmRvYjtcclxuICAgICAgICB0aGlzLnBpbmZvLmZuYW1lPXRoaXMuZmlyc3ROYW1lO1xyXG4gICAgICAgIHRoaXMucGluZm8ubG5hbWU9dGhpcy5sYXN0TmFtZTtcclxuICAgICAgICB0aGlzLnBpbmZvLmRvYj10aGlzLmRvYjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJtb2JpbGVcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRW1haWwgJiYgdGhpcy5pc0VtYWlsRmlsbGVkICYmdGhpcy5pc0FnZVZhbGlkICYmIHRoaXMuaXNGaXJzdE5hbWVWYWxpZCAmJiB0aGlzLmlzTGFzdE5hbWVWYWxpZCAmJiB0aGlzLmlzRE9CVmFsaWQgJiYgdGhpcy5pc0ZpcnN0TmFtZUZpbGxlZCAmJiB0aGlzLmlzTGFzdE5hbWVGaWxsZWQgJiYgdGhpcy5pc0RPQkZpbGxlZCkge1xyXG4gICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xyXG4gICAgICAgICAgICAgICB0aGlzLnBpbmZvLmVtYWlsPXRoaXMuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgICAgICAgICB0aGlzLnBpbmZvLm1vYmlsZT10aGlzLnJlZ19pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vbWVtYmVyX2luZm9cIl0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcImVtYWlsXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZE1vYmlsZU5vICYmIHRoaXMuaXNNb2JpbGVGaWxsZWQgJiZ0aGlzLmlzQWdlVmFsaWQgJiYgdGhpcy5pc0ZpcnN0TmFtZVZhbGlkICYmIHRoaXMuaXNMYXN0TmFtZVZhbGlkICYmIHRoaXMuaXNET0JWYWxpZCAmJiB0aGlzLmlzRmlyc3ROYW1lRmlsbGVkICYmIHRoaXMuaXNMYXN0TmFtZUZpbGxlZCAmJiB0aGlzLmlzRE9CRmlsbGVkKSB7XHJcbiAgICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcclxuICAgICAgICAgICAgICAgdGhpcy5waW5mby5tb2JpbGU9dGhpcy5tb2JpbGVOdW07XHJcbiAgICAgICAgICAgICAgIHRoaXMucGluZm8uZW1haWw9dGhpcy5yZWdfaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL21lbWJlcl9pbmZvXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrRm4oKSB7XHJcbiAgICAgICAgLy8gdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5jaGFuZ2VSZWdpc3RlcigpO1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xyXG4gICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL29uIGNsaWNrIG9mIGNhbmNlbFxyXG4gICAgcHVibGljIG9uY2FuY2VsRm4oKSB7ICAgIFxyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XHJcbiAgICAgICAgaWYodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlPT09XCJSTlZcIil7XHJcbiAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCBcIm1heWJlbGF0ZXJcIl0sIHtcclxuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZT09PVwiUlZcIil7XHJcbiAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcclxuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH0gICAgICBcclxuICAgIH1cclxuICAgIC8vIEZvciBkeW5hbWljIHZhbGlkYXRpb24gXHJcbiAgICBwdWJsaWMgdmFsaWRDaGVjayhhcmcsIHR5cGUpIHtcclxuICAgICAgICBpZiAoYXJnICE9PSB1bmRlZmluZWQgJiYgYXJnICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcnN0TmFtZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNGaXJzdE5hbWVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRmlyc3ROYW1lVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uub25seUFscGhhYmV0c1ZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImxhc3ROYW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xhc3ROYW1lRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xhc3ROYW1lVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uub25seUFscGhhYmV0c1ZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFpbEFkZHJlc3NcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRW1haWxGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWRFbWFpbCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5lbWFpbE1hdGNoVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9iXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RPQkZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNET0JWYWxpZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5kYXRlVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FnZVZhbGlkID0gdGhpcy5pc0RPQlZhbGlkICYmIHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5taW5pbXVtQWdlVmFsaWRhdG9yKGFyZykgJiYgIHRoaXMuaXNET0JGaWxsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vYmlsZU51bVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNb2JpbGVGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyRmlsbGVkVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTW9iaWxlTm8gPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubW9iaWxlTnVtYmVyVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICBcclxuICAgIFxyXG4gICAgZ29Ub0xhc3ROYW1lRmllbGQoKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZUZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuICAgIGdvVG9ET0JGaWVsZCgpIHtcclxuICAgICAgICB0aGlzLkRPQlRleHRGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICBnb1RvTW9FbWFpbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1haWxGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucmVnaXN0ZXJfdHlwZSA9PT0gXCJlbWFpbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9GaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gVG8gQXV0b2Zvcm1hdCB0aGUgZGF0ZSBvZiBiaXJ0aFxyXG4gIHB1YmxpYyBhdXRvRm9ybWF0KGRvYil7ICAgIFxyXG4gICAgICAgbGV0IGlzRXJhc2luZzpib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICBpZih0aGlzLm9sZERPQj09IHVuZGVmaW5lZCB8fCB0aGlzLm9sZERPQj09XCJcIilcclxuICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLm9sZERPQiA9IGRvYjtcclxuICAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICAgaWYodGhpcy5vbGRET0IubGVuZ3RoPmRvYi5sZW5ndGgpXHJcbiAgICAgICAgICAgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaXNFcmFzaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMub2xkRE9CID0gZG9iOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgIH1cclxuICAgICAgfSBcclxuICAgICAgaWYoISBpc0VyYXNpbmcgKXtcclxuICAgICAgICAgaWYoZG9iIT09dW5kZWZpbmVkICYmIGRvYiE9PVwiXCIpe1xyXG4gICAgICAgIGlmKGRvYi5sZW5ndGg9PTMpe1xyXG4gICAgICAgIC8vIHRoaXMuZG9iPXRoaXMuZG9iKycvJztcclxuICAgICAgICBpZihkb2IuY2hhckF0KGRvYi5sZW5ndGgtMSkhPVwiL1wiKXtcclxuICAgICAgICAgICAgIHRoaXMuZG9iPWRvYi5zbGljZSgwLCBkb2IubGVuZ3RoLTEpICsgXCIvXCIgKyBkb2Iuc2xpY2UoZG9iLmxlbmd0aC0xKTtcclxuICAgICAgICAgbGV0IG5leHRUZXh0RmllbGQ6VGV4dEZpZWxkID0gPFRleHRGaWVsZD4gdGhpcy5ET0JUZXh0RmllbGQubmF0aXZlRWxlbWVudDsgXHJcbiAgICAgICAgbmV4dFRleHRGaWVsZC50ZXh0ID0gdGhpcy5kb2I7ICAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQgKCgpID0+IHtcclxuICAgICAgbmV4dFRleHRGaWVsZC5hbmRyb2lkLnNldFNlbGVjdGlvbihkb2IubGVuZ3RoKzEpO1xyXG4gICAgfSwgMTAwKVxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9ICAgIFxyXG4gICAgZWxzZSBpZihkb2IubGVuZ3RoPT02KXtcclxuICAgICAgICAvLyB0aGlzLmRvYj10aGlzLmRvYisnLyc7XHJcbiAgICAgICAgaWYoZG9iLmNoYXJBdChkb2IubGVuZ3RoLTEpIT1cIi9cIil7XHJcbiAgICAgICAgICAgICB0aGlzLmRvYj1kb2Iuc2xpY2UoMCwgZG9iLmxlbmd0aC0xKSArIFwiL1wiICsgZG9iLnNsaWNlKGRvYi5sZW5ndGgtMSk7XHJcbiAgICAgICAgICAgICBsZXQgbmV4dFRleHRGaWVsZDpUZXh0RmllbGQgPSA8VGV4dEZpZWxkPiB0aGlzLkRPQlRleHRGaWVsZC5uYXRpdmVFbGVtZW50OyBcclxuICAgICAgICBuZXh0VGV4dEZpZWxkLnRleHQgPSB0aGlzLmRvYjsgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dCAoKCkgPT4ge1xyXG4gICAgICBuZXh0VGV4dEZpZWxkLmFuZHJvaWQuc2V0U2VsZWN0aW9uKGRvYi5sZW5ndGgrMSk7XHJcbiAgICB9LCAxMDApXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiB9XHJcbiBlbHNlIGlmKGRvYi5sZW5ndGg9PTEwKXtcclxuICAgICB0aGlzLm9sZERPQj10aGlzLmRvYjtcclxuICAgICAgfVxyXG4gICB9XHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgfVxyXG59Il19