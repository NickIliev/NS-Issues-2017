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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlcmlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0Y7QUFDeEYsMENBQWlEO0FBQ2pELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFHL0Isd0NBQXVIO0FBQ3ZILHNEQUErRDtBQUUvRCxtRUFBNkU7QUFDN0UsaURBQWlEO0FBQ2pELHNDQUFpRDtBQUNqRCw0REFBbUQ7QUFDbkQsZ0VBQThEO0FBSTlELHdEQUEwRDtBQUMxRCxrREFBb0Q7QUFDcEQsaUZBQWdFO0FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQU9wQyxJQUFhLHFCQUFxQjtJQTBCOUIsK0JBQTJCLEtBQXFCLEVBQ3JDLFFBQWlCLEVBQ2hCLE1BQWMsRUFDZCxFQUFlLEVBQ2YsSUFBVSxFQUNWLGlCQUFtQyxFQUNuQyxpQkFBcUMsRUFDckMsS0FBdUIsRUFDdkIsb0JBQXlDO1FBUjFCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW9CO1FBQ3JDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFqQ3JELFVBQUssR0FBVyxjQUFjLENBQUM7UUFpQi9CLFNBQUksR0FBRyxJQUFJLCtCQUFVLEVBQUUsQ0FBQztRQWtCcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFB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QjtRQUM1QyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztLQUVyQyxDQUFDO3FDQTJCb0MsdUJBQWM7UUFDM0IsZ0JBQU87UUFDUixlQUFNO1FBQ1YsbUJBQVc7UUFDVCxXQUFJO1FBQ1MseUJBQWdCO1FBQ2hCLDRCQUFrQjtRQUM5Qix1QkFBZ0I7UUFDRCwwQ0FBbUI7R0FsQzVDLHFCQUFxQixDQTRQakM7QUE1UFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBUZXh0VmlldyB9IGZyb20gXCJ1aS90ZXh0LXZpZXdcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBWZXJpZnlVc2VyIH0gZnJvbSBcIi4uL3JlZ2lzdHJhdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG52YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi92ZXJpZmljYXRpb24uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi4vcmVnaXN0cmF0aW9uLmNzc1wiXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIFZlcmlmaWNhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB0aXRsZTogc3RyaW5nID0gXCJWZXJpZmljYXRpb25cIjtcclxuICAgIHB1YmxpYyBjb2wxSW5wdXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBjb2wySW5wdXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBjb2wzSW5wdXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBjb2w0SW5wdXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBjb2w1SW5wdXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBjb2w2SW5wdXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBjaGFyTGltaXQ6IE51bWJlcjtcclxuICAgIHB1YmxpYyB2ZXJpZnlGb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJfdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHZlcmlmeXRleHQ6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWdfdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXJfaWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nOyAgXHJcblxyXG5cclxuXHJcbiAgICB1c2VyID0gbmV3IFZlcmlmeVVzZXIoKTtcclxuICAgIEBWaWV3Q2hpbGQoXCJ0eHRmaWVsZDFcIikgdHh0ZmllbGQxOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcInR4dGZpZWxkMlwiKSB0eHRmaWVsZDI6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQzXCIpIHR4dGZpZWxkMzogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJ0eHRmaWVsZDRcIikgdHh0ZmllbGQ0OiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcInR4dGZpZWxkNVwiKSB0eHRmaWVsZDU6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwidHh0ZmllbGQ2XCIpIHR4dGZpZWxkNjogRWxlbWVudFJlZjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maXJtYXRpb25Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfcmVnaXN0cmF0aW9uc2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLmNvbDFJbnB1dCA9IFwiXCI7IHRoaXMuY29sMklucHV0ID0gXCJcIjsgdGhpcy5jb2wzSW5wdXQgPSBcIlwiOyB0aGlzLmNvbDRJbnB1dCA9IFwiXCI7IHRoaXMuY29sNUlucHV0ID0gXCJcIjsgdGhpcy5jb2w2SW5wdXQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2hhckxpbWl0ID0gMTtcclxuICAgICAgICB0aGlzLnZlcmlmeUZvcm0gPSBmYi5ncm91cCh7XHJcbiAgICAgICAgICAgIFwiY29sMUlucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcclxuICAgICAgICAgICAgXCJjb2wySW5wdXRcIjogW1wiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLF1dLFxyXG4gICAgICAgICAgICBcImNvbDNJbnB1dFwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsXV0sXHJcbiAgICAgICAgICAgIFwiY29sNElucHV0XCI6IFtcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCxdXSxcclxuICAgICAgICAgICAgXCJjb2w1SW5wdXRcIjogW1wiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLF1dLFxyXG4gICAgICAgICAgICBcImNvbDZJbnB1dFwiOiBbXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsXV0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWdfdHlwZSA9IHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UucmVnaXN0cmF0aW9uX3R5cGU7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS51c2VyX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBhcmFtc1tcInBsYWNlaG9sZGVyXCJdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlciA9PSBcImF1dGhlbnRpY2F0ZS12ZXJpZnlcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiVmVyaWZ5IFlvdXIgQWNjb3VudFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlZlcmlmaWNhdGlvblwiO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5wbGFjZWhvbGRlciA9PSBcInNpZ25JblZlcmlmeVwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnRpdGxlID0gXCJWZXJpZmljYXRpb25cIjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyX3R5cGUgPSBwYXJhbXNbXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWdpc3Rlcl90eXBlID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcmlmeXRleHQgPSBcIiB0ZXh0IG1lc3NhZ2VcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnJlZ2lzdGVyX3R5cGUgPT09IFwiZW1haWxcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJpZnl0ZXh0ID0gXCJlbWFpbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMucmVnaXN0cmF0aW9uX21vZGUgPT09IFwibW9iaWxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyLnJlZ3R5cGUgPSBcIk1PQklMRVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlID09PSBcImVtYWlsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyLnJlZ3R5cGUgPSBcIkVNQUlMXCI7XHJcbiAgICAgICAgfVxyXG5cdFx0IGlmKHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eSE9PXVuZGVmaW5lZCAmJiB0aGlzLl9nbG9iYWxzLnVzZXJfcmVnX3Bhc3N3b3JkIT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy51c2VyLnVzZXJpZCA9IHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eTtcclxuICAgICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSB0aGlzLl9nbG9iYWxzLnVzZXJfcmVnX3Bhc3N3b3JkO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuICAgICAgICAgdGhpcy51c2VyLnVzZXJpZCA9IFwiMTIzNDU2Nzg5MFwiO1xyXG4gICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IFwicGFzc3dvcmRAMTIzXCI7XHJcblx0XHR9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZpcnN0VGV4dEZpZWxkID0gPFRleHRWaWV3PnRoaXMudHh0ZmllbGQxLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgZmlyc3RUZXh0RmllbGQuZm9jdXMoKTtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RUeHRGbGQgPSA8VGV4dFZpZXc+dGhpcy50eHRmaWVsZDEubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGZpcnN0VHh0RmxkLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvLyBvbiBjbGljayBvZiBjb250aW51ZSBidXR0b25cclxuICAgIHB1YmxpYyB2ZXJpZnlVc2VyKCkge1xyXG4gICAgICAgIHRoaXMudXNlci5jb2RlID0gdGhpcy5jb2wxSW5wdXQgKyB0aGlzLmNvbDJJbnB1dCArIHRoaXMuY29sM0lucHV0ICsgdGhpcy5jb2w0SW5wdXQgKyB0aGlzLmNvbDVJbnB1dCArIHRoaXMuY29sNklucHV0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy51c2VyLmNvZGUubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlciA9PT0gXCJhdXRoZW50aWNhdGUtdmVyaWZ5XCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vdmVyaWZ5X2lkZW50aXR5XCJdKTtcclxuICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL2F1dGhlbnRpY2F0aW9uX3N1Y2Nlc3NcIl0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJ2ZXJpZnktdW5hdXRoZW50aWNhdGVcIiwgXCJhdXRoLXN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UudmVyaWZ5VXNlcih0aGlzLnVzZXIpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9hdXRoZW50aWNhdGlvbl9zdWNjZXNzXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwiYXV0aC1zdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGFjZWhvbGRlciA9PT0gXCJnZXRhdXRoZW50aWNhdGVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwiZ290by1hdXRoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9yZWdpc3RyYXRpb25zZXJ2aWNlLnZlcmlmeVVzZXIodGhpcy51c2VyKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcInZlcmlmeS11bmF1dGhlbnRpY2F0ZVwiLCBcImdvdG8tYXV0aFwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYWNlaG9sZGVyID09PSBcIm1heWJlbGF0ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwiZmlyc3ROYW1lXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwibGFzdE5hbWVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJkb2JcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJlbWFpbEFkZHJlc3NcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJtb2JpbGVOdW1cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5jaGFuZ2VSZWdpc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcInZlcmlmeS11bmF1dGhlbnRpY2F0ZVwiLCBcInVuLWF1dGhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS52ZXJpZnlVc2VyKHRoaXMudXNlcikuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJ2ZXJpZnktdW5hdXRoZW50aWNhdGVcIiwgXCJ1bi1hdXRoXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucGxhY2Vob2xkZXIgPT09IFwiY2FuY2VsLWF1dGhcIikge1xyXG4gICAgICAgICAgICAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwiY2FuY2VsLWF1dGhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS52ZXJpZnlVc2VyKHRoaXMudXNlcikuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwiY2FuY2VsLWF1dGhcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnBsYWNlaG9sZGVyID09PSBcInNpZ25JblZlcmlmeVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJmaXJzdE5hbWVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5nc01vZHVsZS5zZXRTdHJpbmcoXCJsYXN0TmFtZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImRvYlwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcImVtYWlsQWRkcmVzc1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcIm1vYmlsZU51bVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5pc2Fub255bW91cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzTW9kdWxlLnNldFN0cmluZyhcInZlcmlmeS11bmF1dGhlbnRpY2F0ZVwiLCBcInJlZ2lzdGVyZWQtdW4tYXV0aFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGU9XCJSVlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS52ZXJpZnlVc2VyKHRoaXMudXNlcikuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYXBwU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKFwidmVyaWZ5LXVuYXV0aGVudGljYXRlXCIsIFwicmVnaXN0ZXJlZC11bi1hdXRoXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZT1cIlJWXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNoYW5nZUZvY3VzKGlucHV0LCBpZCkge1xyXG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRUZXh0RmllbGQgPSA8VGV4dFZpZXc+dGhpcy50eHRmaWVsZDIubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKGlkID09PSBcIjJcIikge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkMi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjNcIikge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkMy5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjRcIikge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkNC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjVcIikge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkNS5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIjZcIikge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRleHRGaWVsZCA9IDxUZXh0Vmlldz50aGlzLnR4dGZpZWxkNi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGV4dEZpZWxkID0gPFRleHRWaWV3PnRoaXMudHh0ZmllbGQ2Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcmlmeVVzZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXh0VGV4dEZpZWxkLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaGFwcHlOYXZpZ2F0ZSgpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9oYXBweVwiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==