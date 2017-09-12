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
var global_1 = require("../../../shared/global");
var AuthenticatePromoComponent = (function () {
    function AuthenticatePromoComponent(params, _registrationservice, modalParams, _routerExtensions, router, vcRef, page, _globals) {
        this.params = params;
        this._registrationservice = _registrationservice;
        this.modalParams = modalParams;
        this._routerExtensions = _routerExtensions;
        this.router = router;
        this.vcRef = vcRef;
        this.page = page;
        this._globals = _globals;
        this.authInfo = [];
        this.reg_type = this._registrationservice.registration_type;
        this.user_id = this._registrationservice.user_name;
    }
    AuthenticatePromoComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; }";
        }
    };
    // public authenticateMe() {
    //     this.params.closeCallback();
    //     let info = this._registrationservice.getAuthInfo();
    //     this.authInfo = info;
    //     this.authInfo.map((item) => {
    //         this._globals.user_state = item.userState;
    //         if (item.firstName === "" || item.firstName === undefined) {
    //             this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
    //                 animated: false
    //             });
    //         }
    //         else if (item.memberId === "" || item.memberId === undefined) {
    //             this._routerExtensions.navigate(["/personal_info/member_info"], {
    //                 animated: false
    //             });
    //         }
    //         else if (item.ssn === "" || item.ssn === undefined) {
    //             this._routerExtensions.navigate(["/personal_info/verify_identity"], {
    //                 animated: false
    //             });
    //         }
    //     });
    //     this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
    //         animated: false
    //     });
    // }
    // public verifyMe() {
    //     this.params.closeCallback();
    //     this._routerExtensions.navigate(["/create/verification", this.reg_type, "maybelater"], {
    //         animated: false
    //     });
    // }
    AuthenticatePromoComponent.prototype.authenticateMe = function () {
        var _this = this;
        if (this._globals.promoState === "fromRegistration") {
            this.params.closeCallback();
        }
        else {
            this.params.closeCallback();
            var info = this._registrationservice.getAuthInfo();
            this.authInfo = info;
            this.authInfo.map(function (item) {
                _this._globals.user_state = item.userState;
                if (item.firstName === "" || item.firstName === undefined) {
                    _this._routerExtensions.navigate(["/personal_info/personal_info", _this.reg_type, _this.user_id], {
                        animated: false
                    });
                }
                else if (item.memberId === "" || item.memberId === undefined) {
                    _this._routerExtensions.navigate(["/personal_info/member_info"], {
                        animated: false
                    });
                }
                else if (item.ssn === "" || item.ssn === undefined) {
                    _this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                        animated: false
                    });
                }
            });
            this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
                animated: false
            });
        }
    };
    AuthenticatePromoComponent.prototype.verifyMe = function () {
        if (this._globals.promoState === "fromRegistration") {
            this.params.closeCallback("fromreg");
        }
        else {
            this.params.closeCallback();
            this._routerExtensions.navigate(["/create/verification", this.reg_type, "maybelater"], {
                animated: false
            });
        }
    };
    AuthenticatePromoComponent.prototype.close = function () {
        this.params.closeCallback();
    };
    return AuthenticatePromoComponent;
}());
AuthenticatePromoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "authenticatePromo.component.html",
        styleUrls: ["authenticatePromo.css"],
    }),
    __metadata("design:paramtypes", [dialogs_2.ModalDialogParams,
        registration_service_1.RegistrationService,
        dialogs_1.ModalDialogService,
        router_2.RouterExtensions,
        router_1.Router,
        core_1.ViewContainerRef,
        page_1.Page,
        global_1.Globals])
], AuthenticatePromoComponent);
exports.AuthenticatePromoComponent = AuthenticatePromoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUF5QztBQUV6QyxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLG1FQUE0RTtBQUM1RSxnRkFBOEU7QUFDOUUsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUNwRCxpREFBaUQ7QUFRakQsSUFBYSwwQkFBMEI7SUFJbkMsb0NBQTJCLE1BQXlCLEVBQ3hDLG9CQUF5QyxFQUN6QyxXQUErQixFQUMvQixpQkFBbUMsRUFDbkMsTUFBYyxFQUNkLEtBQXVCLEVBQ3ZCLElBQVUsRUFDWCxRQUFpQjtRQVBELFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQU07UUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBUnJCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFTakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDO0lBQ3ZELENBQUM7SUFDRCw2Q0FBUSxHQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxrQ0FBa0MsQ0FBQztRQUN2RCxDQUFDO0lBQ0wsQ0FBQztJQUNELDRCQUE0QjtJQUM1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O1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsRUFBRTtnQkFDbkYsUUFBUSxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTSwwQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsaUNBQUM7QUFBRCxDQUFDLEFBeEdELElBd0dDO0FBeEdZLDBCQUEwQjtJQU50QyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7S0FDdkMsQ0FBQztxQ0FNcUMsMkJBQWlCO1FBQ2xCLDBDQUFtQjtRQUM1Qiw0QkFBa0I7UUFDWix5QkFBZ0I7UUFDM0IsZUFBTTtRQUNQLHVCQUFnQjtRQUNqQixXQUFJO1FBQ0QsZ0JBQU87R0FYbkIsMEJBQTBCLENBd0d0QztBQXhHWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXV0aGVudGljYXRlUHJvbW8uY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0ZVByb21vQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyByZWdfdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXJfaWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBhdXRoSW5mbyA9IFtdO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcclxuICAgICAgICBwcml2YXRlIF9yZWdpc3RyYXRpb25zZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWxQYXJhbXM6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzKSB7XHJcbiAgICAgICAgdGhpcy5yZWdfdHlwZSA9IHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UucmVnaXN0cmF0aW9uX3R5cGU7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS51c2VyX25hbWU7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgfVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHB1YmxpYyBhdXRoZW50aWNhdGVNZSgpIHtcclxuICAgIC8vICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcblxyXG4gICAgLy8gICAgIGxldCBpbmZvID0gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS5nZXRBdXRoSW5mbygpO1xyXG4gICAgLy8gICAgIHRoaXMuYXV0aEluZm8gPSBpbmZvO1xyXG4gICAgLy8gICAgIHRoaXMuYXV0aEluZm8ubWFwKChpdGVtKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9IGl0ZW0udXNlclN0YXRlO1xyXG4gICAgLy8gICAgICAgICBpZiAoaXRlbS5maXJzdE5hbWUgPT09IFwiXCIgfHwgaXRlbS5maXJzdE5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMucmVnX3R5cGUsIHRoaXMudXNlcl9pZF0sIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGVsc2UgaWYgKGl0ZW0ubWVtYmVySWQgPT09IFwiXCIgfHwgaXRlbS5tZW1iZXJJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL21lbWJlcl9pbmZvXCJdLCB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBlbHNlIGlmIChpdGVtLnNzbiA9PT0gXCJcIiB8fCBpdGVtLnNzbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3ZlcmlmeV9pZGVudGl0eVwiXSwge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMucmVnX3R5cGUsIHRoaXMudXNlcl9pZF0sIHtcclxuICAgIC8vICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHB1YmxpYyB2ZXJpZnlNZSgpIHtcclxuICAgIC8vICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAvLyAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLnJlZ190eXBlLCBcIm1heWJlbGF0ZXJcIl0sIHtcclxuICAgIC8vICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGF1dGhlbnRpY2F0ZU1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLnByb21vU3RhdGUgPT09IFwiZnJvbVJlZ2lzdHJhdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UuZ2V0QXV0aEluZm8oKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoSW5mbyA9IGluZm87XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aEluZm8ubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBpdGVtLnVzZXJTdGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmZpcnN0TmFtZSA9PT0gXCJcIiB8fCBpdGVtLmZpcnN0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMucmVnX3R5cGUsIHRoaXMudXNlcl9pZF0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtLm1lbWJlcklkID09PSBcIlwiIHx8IGl0ZW0ubWVtYmVySWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vbWVtYmVyX2luZm9cIl0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtLnNzbiA9PT0gXCJcIiB8fCBpdGVtLnNzbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby92ZXJpZnlfaWRlbnRpdHlcIl0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMucmVnX3R5cGUsIHRoaXMudXNlcl9pZF0sIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZlcmlmeU1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLnByb21vU3RhdGUgPT09IFwiZnJvbVJlZ2lzdHJhdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soXCJmcm9tcmVnXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLnJlZ190eXBlLCBcIm1heWJlbGF0ZXJcIl0sIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgIH1cclxufSJdfQ==