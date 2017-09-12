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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aGVudGljYXRlUHJvbW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUF5QztBQUV6QyxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLG1FQUE0RTtBQUM1RSxnRkFBOEU7QUFDOUUsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQUNwRCxpREFBaUQ7QUFRakQsSUFBYSwwQkFBMEI7SUFJbkMsb0NBQTJCLE1BQXlCLEVBQ3hDLG9CQUF5QyxFQUN6QyxXQUErQixFQUMvQixpQkFBbUMsRUFDbkMsTUFBYyxFQUNkLEtBQXVCLEVBQ3ZCLElBQVUsRUFDWCxRQUFpQjtRQVBELFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQU07UUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBUnJCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFTakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDO0lBQ3ZELENBQUM7SUFDRCw2Q0FBUSxHQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxrQ0FBa0MsQ0FBQztRQUN2RCxDQUFDO0lBQ0wsQ0FBQztJQUNELDRCQUE0QjtJQUM1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O1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsRUFBRTtnQkFDbkYsUUFBUSxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTSwwQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsaUNBQUM7QUFBRCxDQUFDLEFBeEdELElBd0dDO0FBeEdZLDBCQUEwQjtJQU50QyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7S0FDdkMsQ0FBQztxQ0FNcUMsMkJBQWlCO1FBQ2xCLDBDQUFtQjtRQUM1Qiw0QkFBa0I7UUFDWix5QkFBZ0I7UUFDM0IsZUFBTTtRQUNQLHVCQUFnQjtRQUNqQixXQUFJO1FBQ0QsZ0JBQU87R0FYbkIsMEJBQTBCLENBd0d0QztBQXhHWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImF1dGhlbnRpY2F0ZVByb21vLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJhdXRoZW50aWNhdGVQcm9tby5jc3NcIl0sXG59KVxuXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRlUHJvbW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyByZWdfdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VyX2lkOiBzdHJpbmc7XG4gICAgcHVibGljIGF1dGhJbmZvID0gW107XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcbiAgICAgICAgcHJpdmF0ZSBfcmVnaXN0cmF0aW9uc2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscykge1xuICAgICAgICB0aGlzLnJlZ190eXBlID0gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS5yZWdpc3RyYXRpb25fdHlwZTtcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS51c2VyX25hbWU7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IH1cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBwdWJsaWMgYXV0aGVudGljYXRlTWUoKSB7XG4gICAgLy8gICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcblxuICAgIC8vICAgICBsZXQgaW5mbyA9IHRoaXMuX3JlZ2lzdHJhdGlvbnNlcnZpY2UuZ2V0QXV0aEluZm8oKTtcbiAgICAvLyAgICAgdGhpcy5hdXRoSW5mbyA9IGluZm87XG4gICAgLy8gICAgIHRoaXMuYXV0aEluZm8ubWFwKChpdGVtKSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBpdGVtLnVzZXJTdGF0ZTtcbiAgICAvLyAgICAgICAgIGlmIChpdGVtLmZpcnN0TmFtZSA9PT0gXCJcIiB8fCBpdGVtLmZpcnN0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMucmVnX3R5cGUsIHRoaXMudXNlcl9pZF0sIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBlbHNlIGlmIChpdGVtLm1lbWJlcklkID09PSBcIlwiIHx8IGl0ZW0ubWVtYmVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vbWVtYmVyX2luZm9cIl0sIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBlbHNlIGlmIChpdGVtLnNzbiA9PT0gXCJcIiB8fCBpdGVtLnNzbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby92ZXJpZnlfaWRlbnRpdHlcIl0sIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcGVyc29uYWxfaW5mb1wiLCB0aGlzLnJlZ190eXBlLCB0aGlzLnVzZXJfaWRdLCB7XG4gICAgLy8gICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAvLyAgICAgfSk7XG5cbiAgICAvLyB9XG5cbiAgICAvLyBwdWJsaWMgdmVyaWZ5TWUoKSB7XG4gICAgLy8gICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAvLyAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLnJlZ190eXBlLCBcIm1heWJlbGF0ZXJcIl0sIHtcbiAgICAvLyAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICBwdWJsaWMgYXV0aGVudGljYXRlTWUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLnByb21vU3RhdGUgPT09IFwiZnJvbVJlZ2lzdHJhdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG5cbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5fcmVnaXN0cmF0aW9uc2VydmljZS5nZXRBdXRoSW5mbygpO1xuICAgICAgICAgICAgdGhpcy5hdXRoSW5mbyA9IGluZm87XG4gICAgICAgICAgICB0aGlzLmF1dGhJbmZvLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZSA9IGl0ZW0udXNlclN0YXRlO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmZpcnN0TmFtZSA9PT0gXCJcIiB8fCBpdGVtLmZpcnN0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcGVyc29uYWxfaW5mb1wiLCB0aGlzLnJlZ190eXBlLCB0aGlzLnVzZXJfaWRdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0ubWVtYmVySWQgPT09IFwiXCIgfHwgaXRlbS5tZW1iZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vbWVtYmVyX2luZm9cIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXRlbS5zc24gPT09IFwiXCIgfHwgaXRlbS5zc24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3ZlcmlmeV9pZGVudGl0eVwiXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3BlcnNvbmFsX2luZm9cIiwgdGhpcy5yZWdfdHlwZSwgdGhpcy51c2VyX2lkXSwge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdmVyaWZ5TWUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLnByb21vU3RhdGUgPT09IFwiZnJvbVJlZ2lzdHJhdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKFwiZnJvbXJlZ1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NyZWF0ZS92ZXJpZmljYXRpb25cIiwgdGhpcy5yZWdfdHlwZSwgXCJtYXliZWxhdGVyXCJdLCB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgIH1cbn0iXX0=