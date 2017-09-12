"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var registration_service_1 = require("../../registration/registration.service");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var AuthenticateSharedPromoComponent = (function () {
    function AuthenticateSharedPromoComponent(params, _registrationservice, modalParams, _routerExtensions, router, vcRef, page) {
        this.params = params;
        this._registrationservice = _registrationservice;
        this.modalParams = modalParams;
        this._routerExtensions = _routerExtensions;
        this.router = router;
        this.vcRef = vcRef;
        this.page = page;
        this.yesButton = "Yes, Authenticate Me";
        this.cancelButton = "Maybe later";
        this.reg_type = this._registrationservice.registration_type;
        this.user_id = this._registrationservice.user_name;
    }
    AuthenticateSharedPromoComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; }";
        }
    };
    AuthenticateSharedPromoComponent.prototype.authenticateMe = function () {
        this.params.closeCallback();
        this._routerExtensions.navigate(["/create/verification", this.reg_type, "getauthenticated"], {
            animated: false
        });
    };
    AuthenticateSharedPromoComponent.prototype.verifyMe = function () {
        this.params.closeCallback();
        this._routerExtensions.navigate(["/create/verification", this.reg_type, "maybelater"], {
            animated: false
        });
    };
    AuthenticateSharedPromoComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    AuthenticateSharedPromoComponent.prototype.close = function () {
        this.params.closeCallback();
    };
    return AuthenticateSharedPromoComponent;
}());
AuthenticateSharedPromoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "authenticateSharedPromo.component.html",
        styleUrls: ["authenticatePromo.css"],
    }),
    __metadata("design:paramtypes", [dialogs_2.ModalDialogParams,
        registration_service_1.RegistrationService,
        dialogs_1.ModalDialogService,
        router_2.RouterExtensions,
        router_1.Router,
        core_1.ViewContainerRef,
        page_1.Page])
], AuthenticateSharedPromoComponent);
exports.AuthenticateSharedPromoComponent = AuthenticateSharedPromoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUF5QztBQUV6QyxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLG1FQUE0RTtBQUM1RSxnRkFBOEU7QUFDOUUsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQVFwRCxJQUFhLGdDQUFnQztJQU16QywwQ0FBMkIsTUFBeUIsRUFDNUMsb0JBQXlDLEVBQ3pDLFdBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxNQUFjLEVBQ2QsS0FBdUIsRUFDdkIsSUFBVTtRQU5TLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQzVDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQU07UUFYWCxjQUFTLEdBQUcsc0JBQXNCLENBQUM7UUFDbkMsaUJBQVksR0FBRyxhQUFhLENBQUM7UUFXaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxtREFBUSxHQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxrQ0FBa0MsQ0FBQztRQUN2RCxDQUFDO0lBQ0wsQ0FBQztJQUNNLHlEQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3hGLFFBQVEsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxtREFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUNsRixRQUFRLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saURBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ00sZ0RBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNMLHVDQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxnQ0FBZ0M7SUFONUMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0tBQ3ZDLENBQUM7cUNBUXFDLDJCQUFpQjtRQUN0QiwwQ0FBbUI7UUFDNUIsNEJBQWtCO1FBQ1oseUJBQWdCO1FBQzNCLGVBQU07UUFDUCx1QkFBZ0I7UUFDakIsV0FBSTtHQVpULGdDQUFnQyxDQXlDNUM7QUF6Q1ksNEVBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXV0aGVudGljYXRlU2hhcmVkUHJvbW8uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXV0aGVudGljYXRlUHJvbW8uY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0ZVNoYXJlZFByb21vQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyB5ZXNCdXR0b24gPSBcIlllcywgQXV0aGVudGljYXRlIE1lXCI7XHJcbiAgICBwdWJsaWMgY2FuY2VsQnV0dG9uID0gXCJNYXliZSBsYXRlclwiO1xyXG4gICAgcHVibGljIHJlZ190eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcl9pZDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXHJcbiAgICBwcml2YXRlIF9yZWdpc3RyYXRpb25zZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5yZWdfdHlwZSA9IHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UucmVnaXN0cmF0aW9uX3R5cGU7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS51c2VyX25hbWU7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgfVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhdXRoZW50aWNhdGVNZSgpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLnJlZ190eXBlLCBcImdldGF1dGhlbnRpY2F0ZWRcIl0sIHtcclxuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2ZXJpZnlNZSgpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLnJlZ190eXBlLCBcIm1heWJlbGF0ZXJcIl0sIHtcclxuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgfVxyXG59Il19