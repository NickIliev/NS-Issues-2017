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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5SWRlbnRpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmVyaWZ5SWRlbnRpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1GO0FBRW5GLDBDQUF5QztBQUV6QyxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLG9JQUFrSTtBQUNsSSxzQ0FBaUQ7QUFDakQsMEZBQXdGO0FBRXhGLGlEQUFpRDtBQUNqRCxnQ0FBK0I7QUFDL0IsNEdBQTBHO0FBQzFHLGtEQUFvRDtBQUNwRCxnRUFBa0Q7QUFDbEQsb0VBQWtFO0FBQ2xFLGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFNcEMsSUFBYSx1QkFBdUI7SUFpQmhDLGlDQUEyQixNQUFjLEVBQVUsSUFBVSxFQUNsRCxRQUFpQixFQUNoQixzQkFBNkMsRUFDN0MsaUJBQW1DLEVBQ25DLEtBQXVCLEVBQ3ZCLHFCQUF5QyxFQUFTLFlBQW1DO1FBTHRFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDaEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBb0I7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBdUI7UUFoQmpHLFVBQUssR0FBVyxnQkFBZ0IsQ0FBQztRQUMxQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLFVBQUssR0FBUyxFQUFFLENBQUM7UUFDakIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUNsQyxZQUFPLEdBQUMsSUFBSSw4QkFBTyxFQUFFLENB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LHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEUsS0FBSyxDQUFDO1lBRWQsQ0FBQztRQUNMLENBQUM7SUFFTCxDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBckpELElBcUpDO0FBbkptQztJQUEvQixnQkFBUyxDQUFDLG1CQUFtQixDQUFDOzhCQUFLLGlCQUFVO21EQUFDO0FBQ3BCO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzhCQUFjLGlCQUFVOzREQUFDO0FBSDFDLHVCQUF1QjtJQUxuQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7S0FDdkMsQ0FBQztxQ0FrQnFDLGVBQU0sRUFBZ0IsV0FBSTtRQUN4QyxnQkFBTztRQUNRLDhDQUFxQjtRQUMxQix5QkFBZ0I7UUFDNUIsdUJBQWdCO1FBQ0EsNEJBQWtCLEVBQXVCLDhDQUFxQjtHQXRCeEYsdUJBQXVCLENBcUpuQztBQXJKWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBTZWN1cml0eVF1ZXN0aW9uT25lQ29tcG9uZW50IH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uc2VjdXJpdHlxdWVzdGlvbnMvc2VjdXJpdHlxdWVzdGlvbjEvc2VjdXJpdHlRdWVzdGlvbk9uZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ1aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblN1Y2Nlc3NDb21wb25lbnQgfSBmcm9tIFwiLi4vYXV0aGVudGljYXRpb25zdWNjZXNzL2F1dGhlbnRpY2F0aW9uc3VjY2Vzcy5jb21wb25lbnRcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IFNTTkluZm8gfSBmcm9tIFwiLi4vYXV0aGVudGljYXRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ZlcmlmeUlkZW50aXR5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4uL2F1dGhlbnRpY2F0aW9uLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmVyaWZ5SWRlbnRpdHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHVibGljIGFjdGl2aXR5SW5kaWNhdG9yOiBBY3Rpdml0eUluZGljYXRvcjtcclxuICAgIEBWaWV3Q2hpbGQoXCJhY3Rpdml0eUluZGljYXRvclwiKSBhYzogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJzc25UZXh0RmllbGRcIikgc3NUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBwdWJsaWMgYnVzeTogYm9vbGVhbjtcclxuICAgXHJcbiAgICB0aXRsZTogc3RyaW5nID0gXCJBdXRoZW50aWNhdGlvblwiO1xyXG4gICAgcHVibGljIGlzU25uQ2xpY2tlZDogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzVmFsaWRTU046IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHNzbklkOiBzdHJpbmc9XCJcIjtcclxuICAgIHB1YmxpYyBpc1NTbkZpbGxlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNTU25WYWxpZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBzc25pbmZvPW5ldyBTU05JbmZvKCk7XHJcbiAgICBwdWJsaWMgY3VycmVudFR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBvdGhlclR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1R1cm5PZmY6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSxcclxuICAgICAgICBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsXHJcbiAgICAgICAgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgc2VjdXJpdHlRdWVzdGlvbk1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHB1YmxpYyBhdXRoX3NlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUdXJuT2ZmID0gdHJ1ZTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVHVybk9mZiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKi9cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gdGhpcy5hYy5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zc24gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFR5cGUgPSB0aGlzLmF1dGhfc2VydmljZS51c2VyX3JlZ2lzdHJhdGlvbl90eXBlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJlbWFpbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmN1cnJlbnRUeXBlID0gXCJlbWFpbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJtb2JpbGVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIGlucHV0U3NuKCkge1xyXG4gICAgICAgIHRoaXMuaXNTbm5DbGlja2VkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb250aW51ZVdpdGhTU04oc3NuSWQpIHtcclxuICAgICAgICB0aGlzLnNzbmluZm8uc3NuaWQ9c3NuSWQ7XHJcbiAgICAgICAgdGhpcy5pc1NTblZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnNubk51bWJlclZhbGlkYXRvcihzc25JZCk7XHJcbiAgICAgICAgdGhpcy5pc1ZhbGlkU1NOID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnNubk51bWJlclZhbGlkYXRvcihzc25JZCkgO1xyXG4gICAgICAgIHRoaXMuaXNTU25GaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3Ioc3NuSWQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRTU04gJiYgdGhpcy5pc1NTbkZpbGxlZCkge1xyXG4gICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3NuID0gc3NuSWQ7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZih0aGlzLm90aGVyVHlwZT09PXVuZGVmaW5lZCB8fCB0aGlzLm90aGVyVHlwZT09PVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdGhlclR5cGU9XCJtb2JpbGVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jcmVhdGUvdmVyaWZpY2F0aW9uXCIsIHRoaXMub3RoZXJUeXBlLCBcImF1dGhlbnRpY2F0ZS12ZXJpZnlcIl0sIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zZWN1cml0eVF1ZXN0aW9uTW9kYWwuc2hvd01vZGFsKEF1dGhlbnRpY2F0aW9uU3VjY2Vzc0NvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKHJlcyA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL2Vycm9yX3BhZ2VcIl0sIHtcclxuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29udGludWVUb1F1ZXN0aW9ucygpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2VjdXJpdHlRdWVzdGlvbk1vZGFsLnNob3dNb2RhbChTZWN1cml0eVF1ZXN0aW9uT25lQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIC8vIFNob3dpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHNjcmVlbiBvbiBjbGljayBvZiBzdWJtaXQgYnV0dG9uXHJcbiAgICAgICAgICAgIGlmIChyZXMgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY3VyaXR5UXVlc3Rpb25Nb2RhbC5zaG93TW9kYWwoQXV0aGVudGljYXRpb25TdWNjZXNzQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGJhY2sgYnV0dG9uXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vbWVtYmVyX2luZm9cIl0sIHtcclxuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uY2FuY2VsRm4oKSB7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc19hdXRoX2NhbmNlbGxlZD10cnVlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XHJcbiAgICAgICAgLy8gIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xyXG4gICAgICAgIC8vICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgaWYodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlPT09XCJSTlZcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NyZWF0ZS92ZXJpZmljYXRpb25cIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgXCJtYXliZWxhdGVyXCJdLCB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlPT09XCJSVlwiKXtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHZhbGlkQ2hlY2soYXJnLCB0eXBlKSB7XHJcbiAgICAgICAgaWYgKGFyZyAhPT0gdW5kZWZpbmVkICYmIGFyZyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzc25JZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZFNTTiA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5zbm5OdW1iZXJWYWxpZGF0b3IoYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU1NuRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NTblZhbGlkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLnNubk51bWJlclZhbGlkYXRvcihhcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=