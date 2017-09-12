"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var page_1 = require("ui/page");
var forms_1 = require("@angular/forms");
var router_3 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var global_1 = require("../../../shared/global");
var core_2 = require("@angular/core");
var registration_model_1 = require("../registration.model");
var registration_service_1 = require("../registration.service");
var appSettingsModule = require("application-settings");
var app = require("tns-core-modules/application");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var VerificationComponent = (function () {
    function VerificationComponent(route, _globals, router, fb, page, _routerExtensions, confirmationModal, vcRef, _registrationservice) {
        this.route = route;
        this._globals = _globals;
        this.router = router;
        this.fb = fb;
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this.confirmationModal = confirmationModal;
        this.vcRef = vcRef;
        this._registrationservice = _registrationservice;
        this.title = "Verification";
        this.user = new registration_model_1.VerifyUser();
        this.col1Input = "";
        this.col2Input = "";
        this.col3Input = "";
        this.col4Input = "";
        this.col5Input = "";
        this.col6Input = "";
        this.charLimit = 1;
        this.verifyForm = fb.group({
            "col1Input": ["", [forms_1.Validators.required,]],
            "col2Input": ["", [forms_1.Validators.required,]],
            "col3Input": ["", [forms_1.Validators.required,]],
            "col4Input": ["", [forms_1.Validators.required,]],
            "col5Input": ["", [forms_1.Validators.required,]],
            "col6Input": ["", [forms_1.Validators.required,]],
        });
        this.reg_type = this._registrationservice.registration_type;
        this.user_id = this._registrationservice.user_name;
    }
    VerificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.route.params.subscribe(function (params) {
            _this.placeholder = params["placeholder"];
            if (_this.placeholder == "authenticate-verify") {
                _this.title = "Verify Your Account";
            }
            else
                _this.title = "Verification";
            // if (this.placeholder == "signInVerify") {
            //     this.title = "Verification";
            // }
            _this.register_type = params["name"];
            if (_this.register_type === "mobile") {
                _this.verifytext = " text message";
            }
            else if (_this.register_type === "email") {
                _this.verifytext = "email";
            }
        });
        if (this._globals.registration_mode === "mobile") {
            this.user.regtype = "MOBILE";
        }
        else if (this._globals.registration_mode === "email") {
            this.user.regtype = "EMAIL";
        }
        if (this._globals.user_identity !== undefined && this._globals.user_reg_password !== undefined) {
            this.user.userid = this._globals.user_identity;
            this.user.password = this._globals.user_reg_password;
        }
        else {
            this.user.userid = "1234567890";
            this.user.password = "password@123";
        }
        var firstTextField = this.txtfield1.nativeElement;
        firstTextField.focus();
        if (app.android) {
            setTimeout(function () {
                var firstTxtFld = _this.txtfield1.nativeElement;
                firstTxtFld.focus();
            }, 1000);
        }
    };
    // on click of continue button
    VerificationComponent.prototype.verifyUser = function () {
        this.user.code = this.col1Input + this.col2Input + this.col3Input + this.col4Input + this.col5Input + this.col6Input;
        if (this.user.code.length === 6) {
            loader.show();
            if (this.placeholder === "authenticate-verify") {
                //    this._routerExtensions.navigate(["/personal_info/verify_identity"]);
                this._routerExtensions.navigate(["/personal_info/authentication_success"], {
                    animated: false
                });
                appSettingsModule.setString("verify-unauthenticate", "auth-success");
                loader.hide();
                // this._registrationservice.verifyUser(this.user).subscribe((data) => {
                //      this._routerExtensions.navigate(["/personal_info/authentication_success"], {
                //      animated: false
                //       });
                //     appSettingsModule.setString("verify-unauthenticate", "auth-success");
                //        loader.hide();
                // },
                //     error => {
                //         console.dir(error);
                //     });
            }
            else if (this.placeholder === "getauthenticated") {
                appSettingsModule.setString("verify-unauthenticate", "goto-auth");
                this._routerExtensions.navigate(["/login"], {
                    animated: false
                });
                loader.hide();
                // this._registrationservice.verifyUser(this.user).subscribe((data) => {
                //     appSettingsModule.setString("verify-unauthenticate", "goto-auth");
                //     this._routerExtensions.navigate(["/login"], {
                //         animated: false
                //     });
                //        loader.hide();
                // },
                //     error => {
                //         console.dir(error);
                //     });
            }
            else if (this.placeholder === "maybelater") {
                appSettingsModule.setString("firstName", "");
                appSettingsModule.setString("lastName", "");
                appSettingsModule.setString("dob", "");
                appSettingsModule.setString("emailAddress", "");
                appSettingsModule.setString("mobileNum", "");
                this._globals.isUnauthenticated = true;
                this._globals.isanonymous = false;
                this._globals.isLoggedIn = false;
                this._globals.changeRegister();
                appSettingsModule.setString("verify-unauthenticate", "un-auth");
                this._routerExtensions.navigate(["/login"], {
                    animated: false
                });
                loader.hide();
                // this._registrationservice.verifyUser(this.user).subscribe((data) => {
                //     appSettingsModule.setString("verify-unauthenticate", "un-auth");
                //     this._routerExtensions.navigate(["/login"], {
                //         animated: false
                //     });
                //       loader.hide();
                // },
                //     error => {
                //         console.dir(error);
                //     });
            }
            else if (this.placeholder === "cancel-auth") {
                appSettingsModule.setString("verify-unauthenticate", "cancel-auth");
                this._routerExtensions.navigate(["/login"], {
                    animated: false
                });
                loader.hide();
                // this._registrationservice.verifyUser(this.user).subscribe((data) => {
                //     appSettingsModule.setString("verify-unauthenticate", "cancel-auth");
                //     this._routerExtensions.navigate(["/login"], {
                //         animated: false
                //     });
                //       loader.hide();
                // },
                //     error => {
                //         console.dir(error);
                //     });
            }
            else if (this.placeholder === "signInVerify") {
                appSettingsModule.setString("firstName", "");
                appSettingsModule.setString("lastName", "");
                appSettingsModule.setString("dob", "");
                appSettingsModule.setString("emailAddress", "");
                appSettingsModule.setString("mobileNum", "");
                this._globals.isUnauthenticated = true;
                this._globals.isanonymous = false;
                this._globals.isLoggedIn = false;
                this._globals.changeRegister();
                appSettingsModule.setString("verify-unauthenticate", "registered-un-auth");
                this._globals.user_state = "RV";
                this._routerExtensions.navigate(["/login"], {
                    animated: false
                });
                loader.hide();
                // this._registrationservice.verifyUser(this.user).subscribe((data) => {
                //     appSettingsModule.setString("verify-unauthenticate", "registered-un-auth");
                //     this._globals.user_state="RV";
                //      this._routerExtensions.navigate(["/login"], {
                //         animated: false
                //     });
                //        loader.hide();
                // },
                //     error => {
                //         console.dir(error);
                //     });
            }
        }
    };
    VerificationComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    VerificationComponent.prototype.changeFocus = function (input, id) {
        if (input.length === 1) {
            var nextTextField = this.txtfield2.nativeElement;
            if (id === "2") {
                nextTextField = this.txtfield2.nativeElement;
            }
            else if (id === "3") {
                nextTextField = this.txtfield3.nativeElement;
            }
            else if (id === "4") {
                nextTextField = this.txtfield4.nativeElement;
            }
            else if (id === "5") {
                nextTextField = this.txtfield5.nativeElement;
            }
            else if (id === "6") {
                nextTextField = this.txtfield6.nativeElement;
            }
            else if (id === "") {
                nextTextField = this.txtfield6.nativeElement;
                this.verifyUser();
            }
            nextTextField.focus();
        }
    };
    VerificationComponent.prototype.happyNavigate = function () {
        this._routerExtensions.navigate(["/happy"], {
            animated: false
        });
    };
    return VerificationComponent;
}());
__decorate([
    core_1.ViewChild("txtfield1"),
    __metadata("design:type", core_1.ElementRef)
], VerificationComponent.prototype, "txtfield1", void 0);
__decorate([
    core_1.ViewChild("txtfield2"),
    __metadata("design:type", core_1.ElementRef)
], VerificationComponent.prototype, "txtfield2", void 0);
__decorate([
    core_1.ViewChild("txtfield3"),
    __metadata("design:type", core_1.ElementRef)
], VerificationComponent.prototype, "txtfield3", void 0);
__decorate([
    core_1.ViewChild("txtfield4"),
    __metadata("design:type", core_1.ElementRef)
], VerificationComponent.prototype, "txtfield4", void 0);
__decorate([
    core_1.ViewChild("txtfield5"),
    __metadata("design:type", core_1.ElementRef)
], VerificationComponent.prototype, "txtfield5", void 0);
__decorate([
    core_1.ViewChild("txtfield6"),
    __metadata("design:type", core_1.ElementRef)
], VerificationComponent.prototype, "txtfield6", void 0);
VerificationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./verification.component.html",
        styleUrls: ["../registration.css"]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        global_1.Globals,
        router_2.Router,
        forms_1.FormBuilder,
        page_1.Page,
        router_3.RouterExtensions,
        dialogs_1.ModalDialogService,
        core_2.ViewContainerRef,
        registration_service_1.RegistrationService])
], VerificationComponent);
exports.VerificationComponent = VerificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlcmlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0Y7QUFDeEYsMENBQWlEO0FBQ2pELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFHL0Isd0NBQXVIO0FBQ3ZILHNEQUErRDtBQUUvRCxtRUFBNkU7QUFDN0UsaURBQWlEO0FBQ2pELHNDQUFpRDtBQUNqRCw0REFBbUQ7QUFDbkQsZ0VBQThEO0FBSTlELHdEQUEwRDtBQUMxRCxrREFBb0Q7QUFDcEQsaUZBQWdFO0FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQU9wQyxJQUFhLHFCQUFxQjtJQTBCOUIsK0JBQTJCLEtBQXFCLEVBQ3JDLFFBQWlCLEVBQ2hCLE1BQWMsRUFDZCxFQUFlLEVBQ2YsSUFBVSxFQUNWLGlCQUFtQyxFQUNuQyxpQkFBcUMsRUFDckMsS0FBdUIsRUFDdkIsb0JBQXlDO1FBUjFCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW9CO1FBQ3JDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFqQ3JELFVBQUssR0FBVyxjQUFjLENBQUM7UUFpQi9CLFNBQUksR0FBRyxJQUFJLCtCQUFVLEVBQUUsQ0FBQztRQWtCcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFB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QjtRQUM1QyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztLQUVyQyxDQUFDO3FDQTJCb0MsdUJBQWM7UUFDM0IsZ0JBQU87UUFDUixlQUFNO1FBQ1YsbUJBQVc7UUFDVCxXQUFJO1FBQ1MseUJBQWdCO1FBQ2hCLDRCQUFrQjtRQUM5Qix1QkFBZ0I7UUFDRCwwQ0FBbUI7R0FsQzVDLHFCQUFxQixDQTRQakM7QUE1UFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSBcInVpL3RleHQtdmlld1wiO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWZXJpZnlVc2VyIH0gZnJvbSBcIi4uL3JlZ2lzdHJhdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gXCIuLi9yZWdpc3RyYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgYW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzTW9kdWxlIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ZlcmlmaWNhdGlvbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi4vcmVnaXN0cmF0aW9uLmNzc1wiXVxuXG59KVxuZXhwb3J0IGNsYXNzIFZlcmlmaWNhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdGl0bGU6IHN0cmluZyA9IFwiVmVyaWZpY2F0aW9uXCI7XG4gICAgcHVibGljIGNvbDFJbnB1dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjb2wySW5wdXQ6IHN0cmluZztcbiAgICBwdWJsaWMgY29sM0lucHV0OiBzdHJpbmc7XG4gICAgcHVibGljIGNvbDRJbnB1dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjb2w1SW5wdXQ6IHN0cmluZztcbiAgICBwdWJsaWMgY29sNklucHV0OiBzdHJpbmc7XG4gICAgcHVibGljIGNoYXJMaW1pdDogTnVtYmVyO1xuICAgIHB1YmxpYyB2ZXJpZnlGb3JtOiBGb3JtR3JvdXA7XG4gICAgcHVibGljIHJlZ2lzdGVyX3R5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgdmVyaWZ5dGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyByZWdfdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VyX2lkOiBzdHJpbmc7XG4gICAgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7ICBcblxuXG5cbiAgICB1c2VyID0gbmV3IFZlcmlmeVVzZXIoKTtcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQxXCIpIHR4dGZpZWxkMTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQyXCIpIHR4dGZpZWxkMjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQzXCIpIHR4dGZpZWxkMzogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQ0XCIpIHR4dGZpZWxkNDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQ1XCIpIHR4dGZpZWxkNTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQ2XCIpIHR4dGZpZWxkNjogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIGNvbmZpcm1hdGlvbk1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlZ2lzdHJhdGlvbnNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UpIHtcblxuICAgICAgICB0aGlzLmNvbDFJbnB1dCA9IFwiXCI7IHRoaXMuY29sMklucHV0ID0gXCJcIjsgdGhpcy5jb2wzSW5wdXQgPSBcIlwiOyB0aGlzLmNvbDRJbnB1dCA9IFwiXCI7IHRoaXMuY29sNUlucHV0ID0gXCJcIjsgdGhpcy5jb2w2SW5wdXQgPSBcIlwiO1xuICAgICAgICB0aGlzLmNoYXJMaW1pdCA9IDE7XG4gICAgICAgIHRoaXMudmVyaWZ5Rm9ybSA9IGZiLmdyb3VwKHtcbiAgICAgICAgICAgIFwiY29sMUlucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICAgICAgICAgIFwiY29sMklucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICAgICAgICAgIFwiY29sM0lucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICAgICAgICAgIFwiY29sNElucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICAgICAgICAgIFwiY29sNUlucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICAgICAgICAgIFwiY29sNklucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVnX3R5cGUgPSB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLnJlZ2lzdHJhdGlvbl90eXBlO1xuICAgICAgICB0aGlzLnVzZXJfaWQgPSB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLnVzZXJfbmFtZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGFyYW1zW1wicGxhY2Vob2xkZXJcIl07XG4gICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlciA9PSBcImF1dGhlbnRpY2F0ZS12ZXJpZnlcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlZlcmlmeSBZb3VyIEFjY291bnRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJWZXJpZmljYXRpb25cIjtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnBsYWNlaG9sZGVyID09IFwic2lnbkluVmVyaWZ5XCIpIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnRpdGxlID0gXCJWZXJpZmljYXRpb25cIjtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJfdHlwZSA9IHBhcmFtc1tcIm5hbWVcIl07XG4gICAgICAgICAgICBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcIm1vYmlsZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZXJpZnl0ZXh0ID0gXCIgdGV4dCBtZXNzYWdlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnJlZ2lzdGVyX3R5cGUgPT09IFwiZW1haWxcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudmVyaWZ5dGV4dCA9IFwiZW1haWxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlID09PSBcIm1vYmlsZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXIucmVndHlwZSA9IFwiTU9CSUxFXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSA9PT0gXCJlbWFpbFwiKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXIucmVndHlwZSA9IFwiRU1BSUxcIjtcbiAgICAgICAgfVxuXHRcdCBpZih0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHkhPT11bmRlZmluZWQgJiYgdGhpcy5fZ2xvYmFscy51c2VyX3JlZ19wYXNzd29yZCE9PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLnVzZXIudXNlcmlkID0gdGhpcy5fZ2xvYmFscy51c2VyX2lkZW50aXR5O1xuICAgICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSB0aGlzLl9nbG9iYWxzLnVzZXJfcmVnX3Bhc3N3b3JkO1xuXHRcdH1cblx0XHRlbHNle1xuICAgICAgICAgdGhpcy51c2VyLnVzZXJpZCA9IFwiMTIzNDU2Nzg5MFwiO1xuICAgICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSBcInBhc3N3b3JkQDEyM1wiO1xuXHRcdH1cbiAgICAgICAgXG4gICAgICAgIGxldCBmaXJzdFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkMS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBmaXJzdFRleHRGaWVsZC5mb2N1cygpO1xuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdFR4dEZsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkMS5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgIGZpcnN0VHh0RmxkLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIC8vIG9uIGNsaWNrIG9mIGNvbnRpbnVlIGJ1dHRvblxuICAgIHB1YmxpYyB2ZXJpZnlVc2VyKCkge1xuICAgICAgICB0aGlzLnVzZXIuY29kZSA9IHRoaXMuY29sMUlucHV0ICsgdGhpcy5jb2wySW5wdXQgKyB0aGlzLmNvbDNJbnB1dCArIHRoaXMuY29sNElucHV0ICsgdGhpcy5jb2w1SW5wdXQgKyB0aGlzLmNvbDZJbnB1dDtcblxuICAgICAgICBpZiAodGhpcy51c2VyLmNvZGUubGVuZ3RoID09PSA2KSB7XG4gICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyID09PSBcImF1dGhlbnRpY2F0ZS12ZXJpZnlcIikge1xuICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vdmVyaWZ5X2lkZW50aXR5XCJdKTtcbiAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9hdXRoZW50aWNhdGlvbl9zdWNjZXNzXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwiYXV0aC1zdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UudmVyaWZ5VXNlcih0aGlzLnVzZXIpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL2F1dGhlbnRpY2F0aW9uX3N1Y2Nlc3NcIl0sIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIC8vICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJ2ZXJpZnktdW5hdXRoZW50aWNhdGVcIiwgXCJhdXRoLXN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAgICAvLyAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGFjZWhvbGRlciA9PT0gXCJnZXRhdXRoZW50aWNhdGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcInZlcmlmeS11bmF1dGhlbnRpY2F0ZVwiLCBcImdvdG8tYXV0aFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLnZlcmlmeVVzZXIodGhpcy51c2VyKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwiZ290by1hdXRoXCIpO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2Vob2xkZXIgPT09IFwibWF5YmVsYXRlclwiKSB7XG4gICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwiZmlyc3ROYW1lXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImxhc3ROYW1lXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImRvYlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJlbWFpbEFkZHJlc3NcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwibW9iaWxlTnVtXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XG4gICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcInZlcmlmeS11bmF1dGhlbnRpY2F0ZVwiLCBcInVuLWF1dGhcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLnZlcmlmeVVzZXIodGhpcy51c2VyKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwidW4tYXV0aFwiKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wbGFjZWhvbGRlciA9PT0gXCJjYW5jZWwtYXV0aFwiKSB7XG4gICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwiY2FuY2VsLWF1dGhcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLnZlcmlmeVVzZXIodGhpcy51c2VyKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcInZlcmlmeS11bmF1dGhlbnRpY2F0ZVwiLCBcImNhbmNlbC1hdXRoXCIpO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAgICAvLyAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wbGFjZWhvbGRlciA9PT0gXCJzaWduSW5WZXJpZnlcIikge1xuICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImZpcnN0TmFtZVwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJsYXN0TmFtZVwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJkb2JcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwiZW1haWxBZGRyZXNzXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcIm1vYmlsZU51bVwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5jaGFuZ2VSZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwicmVnaXN0ZXJlZC11bi1hdXRoXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGU9XCJSVlwiO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLnZlcmlmeVVzZXIodGhpcy51c2VyKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwicmVnaXN0ZXJlZC11bi1hdXRoXCIpO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGU9XCJSVlwiO1xuICAgICAgICAgICAgICAgIC8vICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgICAgIC8vICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG4gICAgcHVibGljIGNoYW5nZUZvY3VzKGlucHV0LCBpZCkge1xuICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgbmV4dFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkMi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgaWYgKGlkID09PSBcIjJcIikge1xuICAgICAgICAgICAgICAgIG5leHRUZXh0RmllbGQgPSA8VGV4dFZpZXc+dGhpcy50eHRmaWVsZDIubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjNcIikge1xuICAgICAgICAgICAgICAgIG5leHRUZXh0RmllbGQgPSA8VGV4dFZpZXc+dGhpcy50eHRmaWVsZDMubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjRcIikge1xuICAgICAgICAgICAgICAgIG5leHRUZXh0RmllbGQgPSA8VGV4dFZpZXc+dGhpcy50eHRmaWVsZDQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjVcIikge1xuICAgICAgICAgICAgICAgIG5leHRUZXh0RmllbGQgPSA8VGV4dFZpZXc+dGhpcy50eHRmaWVsZDUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjZcIikge1xuICAgICAgICAgICAgICAgIG5leHRUZXh0RmllbGQgPSA8VGV4dFZpZXc+dGhpcy50eHRmaWVsZDYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbmV4dFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkNi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMudmVyaWZ5VXNlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dFRleHRGaWVsZC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcHB5TmF2aWdhdGUoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hhcHB5XCJdLCB7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==