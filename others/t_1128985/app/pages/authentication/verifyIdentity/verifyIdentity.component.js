"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var securityQuestionOne_component_1 = require("../authenticationsecurityquestions/securityquestion1/securityQuestionOne.component");
var core_2 = require("@angular/core");
var formValidation_service_1 = require("../../../shared/services/formValidation.service");
var global_1 = require("../../../shared/global");
var page_1 = require("ui/page");
var authenticationsuccess_component_1 = require("../authenticationsuccess/authenticationsuccess.component");
var app = require("tns-core-modules/application");
var authentication_model_1 = require("../authentication.model");
var authentication_service_1 = require("../authentication.service");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var VerifyIdentityComponent = (function () {
    function VerifyIdentityComponent(router, page, _globals, _formValidationService, _routerExtensions, vcRef, securityQuestionModal, auth_service) {
        this.router = router;
        this.page = page;
        this._globals = _globals;
        this._formValidationService = _formValidationService;
        this._routerExtensions = _routerExtensions;
        this.vcRef = vcRef;
        this.securityQuestionModal = securityQuestionModal;
        this.auth_service = auth_service;
        this.title = "Authentication";
        this.isSnnClicked = false;
        this.isValidSSN = true;
        this.ssnId = "";
        this.isSSnFilled = true;
        this.isSSnValid = true;
        this.ssninfo = new authentication_model_1.SSNInfo();
        this.isTurnOff = true;
        /*
        if (this._globals.isTurnOff) {
            this.isTurnOff = true;
        }
        */
    }
    VerifyIdentityComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0}";
        }
        this.activityIndicator = this.ac.nativeElement;
        this.busy = false;
        this._globals.user_ssn = "";
        this.currentType = this.auth_service.user_registration_type;
        if (this.currentType === "mobile") {
            this.otherType = "email";
        }
        else if (this.currentType = "email") {
            this.otherType = "mobile";
        }
    };
    VerifyIdentityComponent.prototype.inputSsn = function () {
        this.isSnnClicked = true;
    };
    VerifyIdentityComponent.prototype.continueWithSSN = function (ssnId) {
        this.ssninfo.ssnid = ssnId;
        this.isSSnValid = this._formValidationService.snnNumberValidator(ssnId);
        this.isValidSSN = this._formValidationService.snnNumberValidator(ssnId);
        this.isSSnFilled = this._formValidationService.fieldFilledValidator(ssnId);
        if (this.isValidSSN && this.isSSnFilled) {
            loader.show();
            this._globals.user_ssn = ssnId;
            var options = {
                context: {},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            if (this.otherType === undefined || this.otherType === "") {
                this.otherType = "mobile";
            }
            this._routerExtensions.navigate(["/create/verification", this.otherType, "authenticate-verify"], {
                animated: false
            });
            loader.hide();
            // this.securityQuestionModal.showModal(AuthenticationSuccessComponent, options).then(res => {
            //     if (res === "true") {
            //         this._routerExtensions.navigate(["/home/signedHome"], {
            //              animated: false,
            //             clearHistory: true
            //         });
            //     }
            // });
        }
    };
    VerifyIdentityComponent.prototype.onCancel = function () {
        this._routerExtensions.navigate(["/personal_info/error_page"], {
            animated: false
        });
    };
    VerifyIdentityComponent.prototype.continueToQuestions = function () {
        var _this = this;
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.securityQuestionModal.showModal(securityQuestionOne_component_1.SecurityQuestionOneComponent, options).then(function (res) {
            // Showing the authentication screen on click of submit button
            if (res === "true") {
                var options_1 = {
                    context: {},
                    fullscreen: true,
                    viewContainerRef: _this.vcRef
                };
                _this.securityQuestionModal.showModal(authenticationsuccess_component_1.AuthenticationSuccessComponent, options_1).then(function (res) {
                    if (res === "true") {
                        _this._routerExtensions.navigate(["/home/signedHome"], {
                            animated: false,
                            clearHistory: true
                        });
                    }
                });
            }
        });
    };
    // back button
    VerifyIdentityComponent.prototype.goBack = function () {
        this._routerExtensions.navigate(["/personal_info/member_info"], {
            animated: false
        });
    };
    VerifyIdentityComponent.prototype.oncancelFn = function () {
        this._globals.is_auth_cancelled = true;
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        //  this._routerExtensions.navigate(["/home/signedHome"], {
        //      animated: false
        // });
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
    VerifyIdentityComponent.prototype.validCheck = function (arg, type) {
        if (arg !== undefined && arg !== "") {
            switch (type) {
                case "ssnId":
                    this.isValidSSN = this._formValidationService.snnNumberValidator(arg);
                    this.isSSnFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isSSnValid = this._formValidationService.snnNumberValidator(arg);
                    break;
            }
        }
    };
    return VerifyIdentityComponent;
}());
__decorate([
    core_1.ViewChild("activityIndicator"),
    __metadata("design:type", core_1.ElementRef)
], VerifyIdentityComponent.prototype, "ac", void 0);
__decorate([
    core_1.ViewChild("ssnTextField"),
    __metadata("design:type", core_1.ElementRef)
], VerifyIdentityComponent.prototype, "ssTextField", void 0);
VerifyIdentityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./verifyIdentity.component.html",
        styleUrls: ["../authentication.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page,
        global_1.Globals,
        formValidation_service_1.FormValidationService,
        router_2.RouterExtensions,
        core_2.ViewContainerRef,
        dialogs_1.ModalDialogService, authentication_service_1.AuthenticationService])
], VerifyIdentityComponent);
exports.VerifyIdentityComponent = VerifyIdentityComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5SWRlbnRpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmVyaWZ5SWRlbnRpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1GO0FBRW5GLDBDQUF5QztBQUV6QyxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLG9JQUFrSTtBQUNsSSxzQ0FBaUQ7QUFDakQsMEZBQXdGO0FBRXhGLGlEQUFpRDtBQUNqRCxnQ0FBK0I7QUFDL0IsNEdBQTBHO0FBQzFHLGtEQUFvRDtBQUNwRCxnRUFBa0Q7QUFDbEQsb0VBQWtFO0FBQ2xFLGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFNcEMsSUFBYSx1QkFBdUI7SUFpQmhDLGlDQUEyQixNQUFjLEVBQVUsSUFBVSxFQUNsRCxRQUFpQixFQUNoQixzQkFBNkMsRUFDN0MsaUJBQW1DLEVBQ25DLEtBQXVCLEVBQ3ZCLHFCQUF5QyxFQUFTLFlBQW1DO1FBTHRFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDaEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBb0I7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBdUI7UUFoQmpHLFVBQUssR0FBVyxnQkFBZ0IsQ0FBQztRQUMxQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLFVBQUssR0FBUyxFQUFFLENBQUM7UUFDakIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUNsQyxZQUFPLEdBQUMsSUFBSSw4QkFBTyxFQUFFLENB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LHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEUsS0FBSyxDQUFDO1lBRWQsQ0FBQztRQUNMLENBQUM7SUFFTCxDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBckpELElBcUpDO0FBbkptQztJQUEvQixnQkFBUyxDQUFDLG1CQUFtQixDQUFDOzhCQUFLLGlCQUFVO21EQUFDO0FBQ3BCO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzhCQUFjLGlCQUFVOzREQUFDO0FBSDFDLHVCQUF1QjtJQUxuQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7S0FDdkMsQ0FBQztxQ0FrQnFDLGVBQU0sRUFBZ0IsV0FBSTtRQUN4QyxnQkFBTztRQUNRLDhDQUFxQjtRQUMxQix5QkFBZ0I7UUFDNUIsdUJBQWdCO1FBQ0EsNEJBQWtCLEVBQXVCLDhDQUFxQjtHQXRCeEYsdUJBQXVCLENBcUpuQztBQXJKWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBTZWN1cml0eVF1ZXN0aW9uT25lQ29tcG9uZW50IH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uc2VjdXJpdHlxdWVzdGlvbnMvc2VjdXJpdHlxdWVzdGlvbjEvc2VjdXJpdHlRdWVzdGlvbk9uZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9mb3JtVmFsaWRhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ1aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblN1Y2Nlc3NDb21wb25lbnQgfSBmcm9tIFwiLi4vYXV0aGVudGljYXRpb25zdWNjZXNzL2F1dGhlbnRpY2F0aW9uc3VjY2Vzcy5jb21wb25lbnRcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgU1NOSW5mbyB9IGZyb20gXCIuLi9hdXRoZW50aWNhdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdmVyaWZ5SWRlbnRpdHkuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4uL2F1dGhlbnRpY2F0aW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJpZnlJZGVudGl0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGFjdGl2aXR5SW5kaWNhdG9yOiBBY3Rpdml0eUluZGljYXRvcjtcbiAgICBAVmlld0NoaWxkKFwiYWN0aXZpdHlJbmRpY2F0b3JcIikgYWM6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInNzblRleHRGaWVsZFwiKSBzc1RleHRGaWVsZDogRWxlbWVudFJlZjtcbiAgICBwdWJsaWMgYnVzeTogYm9vbGVhbjtcbiAgIFxuICAgIHRpdGxlOiBzdHJpbmcgPSBcIkF1dGhlbnRpY2F0aW9uXCI7XG4gICAgcHVibGljIGlzU25uQ2xpY2tlZDogQm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc1ZhbGlkU1NOOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgc3NuSWQ6IHN0cmluZz1cIlwiO1xuICAgIHB1YmxpYyBpc1NTbkZpbGxlZDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzU1NuVmFsaWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHNzbmluZm89bmV3IFNTTkluZm8oKTtcbiAgICBwdWJsaWMgY3VycmVudFR5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgb3RoZXJUeXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGlzVHVybk9mZjogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcbiAgICAgICAgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgc2VjdXJpdHlRdWVzdGlvbk1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHB1YmxpYyBhdXRoX3NlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSwgKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHVybk9mZiA9IHRydWU7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1R1cm5PZmYgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKi9cbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH1cIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gdGhpcy5hYy5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3NzbiA9IFwiXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFR5cGUgPSB0aGlzLmF1dGhfc2VydmljZS51c2VyX3JlZ2lzdHJhdGlvbl90eXBlO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gXCJtb2JpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5vdGhlclR5cGUgPSBcImVtYWlsXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jdXJyZW50VHlwZSA9IFwiZW1haWxcIikge1xuICAgICAgICAgICAgdGhpcy5vdGhlclR5cGUgPSBcIm1vYmlsZVwiO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgcHVibGljIGlucHV0U3NuKCkge1xuICAgICAgICB0aGlzLmlzU25uQ2xpY2tlZCA9IHRydWU7XG4gICAgfVxuICAgIHB1YmxpYyBjb250aW51ZVdpdGhTU04oc3NuSWQpIHtcbiAgICAgICAgdGhpcy5zc25pbmZvLnNzbmlkPXNzbklkO1xuICAgICAgICB0aGlzLmlzU1NuVmFsaWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uuc25uTnVtYmVyVmFsaWRhdG9yKHNzbklkKTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkU1NOID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnNubk51bWJlclZhbGlkYXRvcihzc25JZCkgO1xuICAgICAgICB0aGlzLmlzU1NuRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKHNzbklkKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNTTiAmJiB0aGlzLmlzU1NuRmlsbGVkKSB7XG4gICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3NzbiA9IHNzbklkO1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYodGhpcy5vdGhlclR5cGU9PT11bmRlZmluZWQgfHwgdGhpcy5vdGhlclR5cGU9PT1cIlwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyVHlwZT1cIm1vYmlsZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLm90aGVyVHlwZSwgXCJhdXRoZW50aWNhdGUtdmVyaWZ5XCJdLCB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAvLyB0aGlzLnNlY3VyaXR5UXVlc3Rpb25Nb2RhbC5zaG93TW9kYWwoQXV0aGVudGljYXRpb25TdWNjZXNzQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHJlcyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBvbkNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9lcnJvcl9wYWdlXCJdLCB7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBjb250aW51ZVRvUXVlc3Rpb25zKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZWN1cml0eVF1ZXN0aW9uTW9kYWwuc2hvd01vZGFsKFNlY3VyaXR5UXVlc3Rpb25PbmVDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIC8vIFNob3dpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHNjcmVlbiBvbiBjbGljayBvZiBzdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICBpZiAocmVzID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN1cml0eVF1ZXN0aW9uTW9kYWwuc2hvd01vZGFsKEF1dGhlbnRpY2F0aW9uU3VjY2Vzc0NvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGJhY2sgYnV0dG9uXG4gICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9tZW1iZXJfaW5mb1wiXSwge1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIHB1YmxpYyBvbmNhbmNlbEZuKCkge1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzX2F1dGhfY2FuY2VsbGVkPXRydWU7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XG4gICAgICAgIC8vICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcbiAgICAgICAgLy8gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIGlmKHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZT09PVwiUk5WXCIpe1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCBcIm1heWJlbGF0ZXJcIl0sIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlPT09XCJSVlwiKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHZhbGlkQ2hlY2soYXJnLCB0eXBlKSB7XG4gICAgICAgIGlmIChhcmcgIT09IHVuZGVmaW5lZCAmJiBhcmcgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzc25JZFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWRTU04gPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2Uuc25uTnVtYmVyVmFsaWRhdG9yKGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTU25GaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NTblZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnNubk51bWJlclZhbGlkYXRvcihhcmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59Il19