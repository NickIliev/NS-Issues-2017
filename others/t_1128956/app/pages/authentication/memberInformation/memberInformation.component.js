"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var router_2 = require("nativescript-angular/router");
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../authentication.service");
var formValidation_service_1 = require("../../../shared/services/formValidation.service");
var global_1 = require("../../../shared/global");
var app = require("tns-core-modules/application");
var authentication_model_1 = require("../authentication.model");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
// registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);
var MemberInformationComponent = (function () {
    function MemberInformationComponent(router, page, _globals, _formValidationService, auth_service, fb, _routerExtensions) {
        this.router = router;
        this.page = page;
        this._globals = _globals;
        this._formValidationService = _formValidationService;
        this.auth_service = auth_service;
        this.fb = fb;
        this._routerExtensions = _routerExtensions;
        this.title = "Authentication";
        this.isErrorOccured = false;
        this.isMemIdValid = true;
        this.isDebitNumberValid = true;
        this.isStudentIdValid = true;
        this.memid = "";
        this.suffix = "";
        this.isMemIdFilled = true;
        this.isDebitNumberFilled = true;
        this.isStudentIdFilled = true;
        this.helpInfoHtml = "<!DOCTYPE html><html><head><title>MyTitle</title><meta charset=\"utf-8\" /><style> body{background-color: #efefef;font-family: Arial;}</style></head><body><p><span style=\"padding: 70;color:#000000;font-weight:bold;\">What is Member Information?</span></br>Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat leifend tincidunt, purus tortor aliquet felis.</p>";
        this.isHelpInfoVisible = false;
        this.minfo = new authentication_model_1.MemberInfo();
        if (this._globals.isTurnOff) {
            this.showMemidTextField = true;
        }
        else {
            this.showMemidTextField = false;
        }
        this.showDebitnoTextField = false;
        this.showStudentidTextField = false;
    }
    MemberInformationComponent.prototype.ngOnInit = function () {
        this._globals.user_state = "RNV";
        this._globals.is_auth_cancelled = false;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        var iosSpecific = "ChooseOne";
        if (this._globals.isTurnOff) {
            this.idtypes = ["BCBSMA Member ID"];
            this.selectedIndex = 1;
        }
        else {
            this.idtypes = ["BCBSMA Member ID", "Financial Debit Card Number", "Student ID Number"];
        }
        if (app.ios) {
            this.idtypes.unshift(iosSpecific);
        }
        this.currentType = this.auth_service.user_registration_type;
        if (this.currentType === "mobile") {
            this.otherType = "email";
        }
        else if (this.currentType = "email") {
            this.otherType = "mobile";
        }
    };
    MemberInformationComponent.prototype.onchange = function (args) {
        // ios
        this.ddindex = args.newIndex;
        if (app.ios) {
            this.ddindex = args.newIndex - 1;
        }
        if (this.ddindex === 0) {
            this.showMemidTextField = true;
            this.showDebitnoTextField = false;
            this.showStudentidTextField = false;
            this._globals.user_useridtype = "BCBSMA Member ID";
        }
        else if (this.ddindex === 1) {
            this.showDebitnoTextField = true;
            this.showMemidTextField = false;
            this.showStudentidTextField = false;
            this._globals.user_useridtype = "Financial Debit Card Number";
        }
        else if (this.ddindex === 2) {
            this.showStudentidTextField = true;
            this.showMemidTextField = false;
            this.showDebitnoTextField = false;
            this._globals.user_useridtype = "Student ID Number";
        }
        else {
            this.showMemidTextField = false;
            this.showDebitnoTextField = false;
            this.showStudentidTextField = false;
        }
    };
    MemberInformationComponent.prototype.onopen = function () {
        // console.log("Drop Down opened.");
    };
    MemberInformationComponent.prototype.onContinue = function (memid, suffix) {
        this.minfo.memid = memid;
        this.minfo.suffix = suffix;
        var memberId = memid + suffix;
        this.isMemIdValid = (this._formValidationService.alphaNumericMemValidator(memberId) && this._formValidationService.memberIdValidator(memberId));
        // this.isDebitNumberValid = (this._formValidationService.onlyDigitsValidator(debitcardno) && this._formValidationService.debitCardNoValidator(debitcardno));
        // this.isStudentIdValid = (this._formValidationService.onlyDigitsValidator(studentid) && this._formValidationService.memberIdValidator(studentid));
        this.isMemIdFilled = this._formValidationService.fieldFilledValidator(memid);
        // this.isDebitNumberFilled = this._formValidationService.fieldFilledValidator(debitcardno);
        // this.isStudentIdFilled = this._formValidationService.fieldFilledValidator(studentid);
        // if (this._globals.user_useridtype === "Student ID Number") {
        //     this._globals.user_useridnum = studentid;
        // }
        // else if (this._globals.user_useridtype === "Financial Debit Card Number") {
        //     this._globals.user_useridnum = debitcardno;
        // }
        // else if (this._globals.user_useridtype === "BCBSMA Member ID") {
        //     this._globals.user_useridnum = memid;
        // }
        if ((memberId !== undefined && this.isMemIdValid && memberId !== "")) {
            loader.show();
            if (this._globals.isTurnOff) {
                this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                    animated: false
                });
                loader.hide();
            }
            else {
                // this._routerExtensions.navigate(["/create/verification", this.otherType, "authenticate-verify"], {
                //      animated: false
                // });
                this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                    animated: false
                });
                loader.hide();
            }
        }
        else {
            this.isErrorOccured = true;
        }
    };
    MemberInformationComponent.prototype.goBack = function () {
        this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
            animated: false
        });
    };
    MemberInformationComponent.prototype.oncancelFn = function () {
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        this._globals.is_auth_cancelled = true;
        // this._routerExtensions.navigate(["/home/signedHome"], {
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
    MemberInformationComponent.prototype.showOrHideContextualHelp = function () {
        this.isHelpInfoVisible = !this.isHelpInfoVisible;
    };
    MemberInformationComponent.prototype.happyNavigate = function () {
        this._routerExtensions.navigate(["/happy"], {
            animated: false
        });
    };
    MemberInformationComponent.prototype.validCheck = function (memid, suffix) {
        var memberId = memid + suffix;
        if (memberId !== undefined && memberId !== "") {
            this.isMemIdValid = (this._formValidationService.alphaNumericMemValidator(memberId) && this._formValidationService.memberIdValidator(memberId));
            this.isMemIdFilled = this._formValidationService.fieldFilledValidator(memberId);
        }
    };
    MemberInformationComponent.prototype.changeFocus = function (memid) {
        if (memid.length === 12) {
            var nextTextField = this.txtfld2.nativeElement;
            nextTextField.focus();
        }
    };
    MemberInformationComponent.prototype.goToSuffixField = function () {
        this.txtfld2.nativeElement.focus();
    };
    return MemberInformationComponent;
}());
__decorate([
    core_1.ViewChild("txtfld1"),
    __metadata("design:type", core_1.ElementRef)
], MemberInformationComponent.prototype, "txtfld1", void 0);
__decorate([
    core_1.ViewChild("txtfld2"),
    __metadata("design:type", core_1.ElementRef)
], MemberInformationComponent.prototype, "txtfld2", void 0);
MemberInformationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./memberInformation.component.html",
        styleUrls: ["../authentication.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        page_1.Page,
        global_1.Globals,
        formValidation_service_1.FormValidationService,
        authentication_service_1.AuthenticationService,
        forms_1.FormBuilder,
        router_2.RouterExtensions])
], MemberInformationComponent);
exports.MemberInformationComponent = MemberInformationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVySW5mb3JtYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVtYmVySW5mb3JtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBRXpFLDBDQUF5QztBQUV6QyxnQ0FBK0I7QUFDL0Isc0RBQStEO0FBRS9ELHdDQUF1SDtBQUd2SCxvRUFBa0U7QUFDbEUsMEZBQXdGO0FBQ3hGLGlEQUFpRDtBQUNqRCxrREFBb0Q7QUFFcEQsZ0VBQXFEO0FBQ3JELGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFDcEMsMkZBQTJGO0FBTTNGLElBQWEsMEJBQTBCO0lBNEJuQyxvQ0FBMkIsTUFBYyxFQUM3QixJQUFVLEVBQ1gsUUFBaUIsRUFDaEIsc0JBQTZDLEVBQzlDLFlBQW1DLEVBQ2xDLEVBQWUsRUFDZixpQkFBbUM7UUFOcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM3QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzlDLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUNsQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWpDL0MsVUFBSyxHQUFXLGdCQUFnQixDQUFDO1FBTzFCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBR2hDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUNuQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsVUFBSyxHQUFTLEVBQUUsQ0FBQztRQUNqQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBSWpCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUNwQyxzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFFbEMsaUJBQVksR0FBVyxzYUFBc2EsQ0FBQztRQUM5YixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDMUMsVUFBSyxHQUFDLElBQUksaUNBQVUsRUFBRSxDQUFDO1FBVW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQztRQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBQ0QsNkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFDLEtBQUssQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7UUFDRCxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSw2QkFBNkIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBRU0sNkNBQVEsR0FBZixVQUFnQixJQUFtQztRQUMvQyxNQUFNO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLGtCQUFrQixDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLDZCQUE2QixDQUFDO1FBQ2xFLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLG1CQUFtQixDQUFDO1FBQ3hELENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLENBQUM7SUFDTCxDQUFDO0lBRU0sMkNBQU0sR0FBYjtRQUNJLG9DQUFvQztJQUN4QyxDQUFDO0lBQ00sK0NBQVUsR0FBakIsVUFBa0IsS0FBSyxFQUFFLE1BQU07UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLFFBQVEsR0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDO1FBRzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEosNkpBQTZKO1FBQzdKLG9KQUFvSjtRQUNySixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RSw0RkFBNEY7UUFDNUYsd0ZBQXdGO1FBQ3hGLCtEQUErRDtRQUMvRCxnREFBZ0Q7UUFDaEQsSUFBSTtRQUNKLDhFQUE4RTtRQUM5RSxrREFBa0Q7UUFDbEQsSUFBSTtRQUNKLG1FQUFtRTtRQUNuRSw0Q0FBNEM7UUFDNUMsSUFBSTtRQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLFFBQVEsS0FBRyxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLEVBQUU7b0JBQ2xFLFFBQVEsRUFBRSxLQUFLO2lCQUNuQixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFFRixxR0FBcUc7Z0JBQ3JHLHVCQUF1QjtnQkFDdkIsTUFBTTtnQkFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtvQkFDaEUsUUFBUSxFQUFFLEtBQUs7aUJBQ25CLENBQUMsQ0FBQztnQkFDRixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQztRQUVMLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUM7SUFDTCxDQUFDO0lBQ00sMkNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDM0gsUUFBUSxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNNLCtDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ3JDLDBEQUEwRDtRQUMxRCx1QkFBdUI7UUFDdkIsTUFBTTtRQUNOLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFHLEtBQUssQ0FBQyxDQUFBLENBQUM7WUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLEVBQUU7Z0JBQ3ZHLFFBQVEsRUFBRSxLQUFLO2FBQ25CLENBQUMsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDdEQsUUFBUSxFQUFFLEtBQUs7YUFDbkIsQ0FBQyxDQUFDO1FBQ0gsQ0FBQztJQUNMLENBQUM7SUFDTSw2REFBd0IsR0FBL0I7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDckQsQ0FBQztJQUVNLGtEQUFhLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hDLFFBQVEsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSwrQ0FBVSxHQUFqQixVQUFrQixLQUFLLEVBQUUsTUFBTTtRQUMzQixJQUFJLFFBQVEsR0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRixDQUFDO0lBRUwsQ0FBQztJQUNNLGdEQUFXLEdBQWxCLFVBQW1CLEtBQUs7UUFDcEIsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBRyxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBQ2hCLElBQUksYUFBYSxHQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQzFELGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUNELG9EQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0wsaUNBQUM7QUFBRCxDQUFDLEFBOU1ELElBOE1DO0FBcEx5QjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBVSxpQkFBVTsyREFBQztBQUNwQjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBVSxpQkFBVTsyREFBQztBQTNCakMsMEJBQTBCO0lBTHRDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLG9DQUFvQztRQUNqRCxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUN2QyxDQUFDO3FDQTZCcUMsZUFBTTtRQUN2QixXQUFJO1FBQ0QsZ0JBQU87UUFDUSw4Q0FBcUI7UUFDaEMsOENBQXFCO1FBQzlCLG1CQUFXO1FBQ0kseUJBQWdCO0dBbEN0QywwQkFBMEIsQ0E4TXRDO0FBOU1ZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0ICxWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycywgUmVhY3RpdmVGb3Jtc01vZHVsZSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9mb3JtVmFsaWRhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgTWVtYmVySW5mbyB9IGZyb20gXCIuLi9hdXRoZW50aWNhdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbi8vIHJlZ2lzdGVyRWxlbWVudChcIkRyb3BEb3duXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiKS5Ecm9wRG93bik7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWVtYmVySW5mb3JtYXRpb24uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi4vYXV0aGVudGljYXRpb24uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZW1iZXJJbmZvcm1hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB0aXRsZTogc3RyaW5nID0gXCJBdXRoZW50aWNhdGlvblwiO1xyXG4gICAgcHVibGljIGlkdHlwZXM6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleDogTnVtYmVyO1xyXG4gICAgcHVibGljIGRkaW5kZXg6IE51bWJlcjtcclxuICAgIHB1YmxpYyBzaG93TWVtaWRUZXh0RmllbGQ6IEJvb2xlYW47XHJcbiAgICBwdWJsaWMgc2hvd0RlYml0bm9UZXh0RmllbGQ6IEJvb2xlYW47XHJcbiAgICBwdWJsaWMgc2hvd1N0dWRlbnRpZFRleHRGaWVsZDogQm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc0Vycm9yT2NjdXJlZDogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGN1cnJlbnRUeXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb3RoZXJUeXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNNZW1JZFZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc0RlYml0TnVtYmVyVmFsaWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzU3R1ZGVudElkVmFsaWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIG1lbWlkOiBzdHJpbmc9XCJcIjtcclxuICAgIHB1YmxpYyBzdWZmaXg6c3RyaW5nPVwiXCI7XHJcbiAgICBwdWJsaWMgZGViaXRjYXJkbm86IHN0cmluZztcclxuICAgIHB1YmxpYyBzdHVkZW50aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBpZFR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc01lbUlkRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc0RlYml0TnVtYmVyRmlsbGVkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc1N0dWRlbnRJZEZpbGxlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIHB1YmxpYyBoZWxwSW5mb0h0bWw6IHN0cmluZyA9IFwiPCFET0NUWVBFIGh0bWw+PGh0bWw+PGhlYWQ+PHRpdGxlPk15VGl0bGU8L3RpdGxlPjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIiAvPjxzdHlsZT4gYm9keXtiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO2ZvbnQtZmFtaWx5OiBBcmlhbDt9PC9zdHlsZT48L2hlYWQ+PGJvZHk+PHA+PHNwYW4gc3R5bGU9XFxcInBhZGRpbmc6IDcwO2NvbG9yOiMwMDAwMDA7Zm9udC13ZWlnaHQ6Ym9sZDtcXFwiPldoYXQgaXMgTWVtYmVyIEluZm9ybWF0aW9uPzwvc3Bhbj48L2JyPk51bGxhbSBtb2xsaXMsIGxlY3R1cyBhdCBlbGVpZmVuZCB0aW5jaWR1bnQsIHB1cnVzIHRvcnRvciBhbGlxdWV0IGZlbGlzLCBzaXQgYW1ldCBpbnRlcmR1bSB2ZWxpdCBsaWd1bGEgbmVjIGVyYXQgbGVpZmVuZCB0aW5jaWR1bnQsIHB1cnVzIHRvcnRvciBhbGlxdWV0IGZlbGlzLjwvcD5cIjtcclxuICAgIHB1YmxpYyBpc0hlbHBJbmZvVmlzaWJsZTogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbWluZm89bmV3IE1lbWJlckluZm8oKTtcclxuICAgIEBWaWV3Q2hpbGQoXCJ0eHRmbGQxXCIpIHR4dGZsZDE6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwidHh0ZmxkMlwiKSB0eHRmbGQyOiBFbGVtZW50UmVmO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcclxuICAgICAgICBwcml2YXRlIF9mb3JtVmFsaWRhdGlvblNlcnZpY2U6IEZvcm1WYWxpZGF0aW9uU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgYXV0aF9zZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dEZWJpdG5vVGV4dEZpZWxkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U3R1ZGVudGlkVGV4dEZpZWxkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBcIlJOVlwiO1xyXG4gICAgICAgICB0aGlzLl9nbG9iYWxzLmlzX2F1dGhfY2FuY2VsbGVkPWZhbHNlO1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlvc1NwZWNpZmljID0gXCJDaG9vc2VPbmVcIjtcclxuICAgICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcclxuICAgICAgICAgICAgdGhpcy5pZHR5cGVzID0gW1wiQkNCU01BIE1lbWJlciBJRFwiXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWR0eXBlcyA9IFtcIkJDQlNNQSBNZW1iZXIgSURcIiwgXCJGaW5hbmNpYWwgRGViaXQgQ2FyZCBOdW1iZXJcIiwgXCJTdHVkZW50IElEIE51bWJlclwiXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWR0eXBlcy51bnNoaWZ0KGlvc1NwZWNpZmljKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFR5cGUgPSB0aGlzLmF1dGhfc2VydmljZS51c2VyX3JlZ2lzdHJhdGlvbl90eXBlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJlbWFpbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmN1cnJlbnRUeXBlID0gXCJlbWFpbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJUeXBlID0gXCJtb2JpbGVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gaW9zXHJcbiAgICAgICAgdGhpcy5kZGluZGV4ID0gYXJncy5uZXdJbmRleDtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLmRkaW5kZXggPSBhcmdzLm5ld0luZGV4IC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRkaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWVtaWRUZXh0RmllbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dEZWJpdG5vVGV4dEZpZWxkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0dWRlbnRpZFRleHRGaWVsZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXNlcmlkdHlwZSA9IFwiQkNCU01BIE1lbWJlciBJRFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmRkaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGViaXRub1RleHRGaWVsZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01lbWlkVGV4dEZpZWxkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0dWRlbnRpZFRleHRGaWVsZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXNlcmlkdHlwZSA9IFwiRmluYW5jaWFsIERlYml0IENhcmQgTnVtYmVyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGRpbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdHVkZW50aWRUZXh0RmllbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dEZWJpdG5vVGV4dEZpZWxkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl91c2VyaWR0eXBlID0gXCJTdHVkZW50IElEIE51bWJlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWVtaWRUZXh0RmllbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGViaXRub1RleHRGaWVsZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdHVkZW50aWRUZXh0RmllbGQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9ub3BlbigpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRyb3AgRG93biBvcGVuZWQuXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ29udGludWUobWVtaWQsIHN1ZmZpeCkge1xyXG4gICAgICAgIHRoaXMubWluZm8ubWVtaWQ9bWVtaWQ7XHJcbiAgICAgICAgdGhpcy5taW5mby5zdWZmaXg9c3VmZml4O1xyXG4gICAgICAgIHZhciBtZW1iZXJJZD1tZW1pZCtzdWZmaXg7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuaXNNZW1JZFZhbGlkID0gKHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5hbHBoYU51bWVyaWNNZW1WYWxpZGF0b3IobWVtYmVySWQpICYmIHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5tZW1iZXJJZFZhbGlkYXRvcihtZW1iZXJJZCkpO1xyXG4gICAgICAgIC8vIHRoaXMuaXNEZWJpdE51bWJlclZhbGlkID0gKHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5vbmx5RGlnaXRzVmFsaWRhdG9yKGRlYml0Y2FyZG5vKSAmJiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZGViaXRDYXJkTm9WYWxpZGF0b3IoZGViaXRjYXJkbm8pKTtcclxuICAgICAgICAvLyB0aGlzLmlzU3R1ZGVudElkVmFsaWQgPSAodGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm9ubHlEaWdpdHNWYWxpZGF0b3Ioc3R1ZGVudGlkKSAmJiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UubWVtYmVySWRWYWxpZGF0b3Ioc3R1ZGVudGlkKSk7XHJcbiAgICAgICB0aGlzLmlzTWVtSWRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IobWVtaWQpO1xyXG4gICAgICBcclxuICAgICAgICAvLyB0aGlzLmlzRGViaXROdW1iZXJGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IoZGViaXRjYXJkbm8pO1xyXG4gICAgICAgIC8vIHRoaXMuaXNTdHVkZW50SWRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3Ioc3R1ZGVudGlkKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5fZ2xvYmFscy51c2VyX3VzZXJpZHR5cGUgPT09IFwiU3R1ZGVudCBJRCBOdW1iZXJcIikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXNlcmlkbnVtID0gc3R1ZGVudGlkO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIGlmICh0aGlzLl9nbG9iYWxzLnVzZXJfdXNlcmlkdHlwZSA9PT0gXCJGaW5hbmNpYWwgRGViaXQgQ2FyZCBOdW1iZXJcIikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXNlcmlkbnVtID0gZGViaXRjYXJkbm87XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2UgaWYgKHRoaXMuX2dsb2JhbHMudXNlcl91c2VyaWR0eXBlID09PSBcIkJDQlNNQSBNZW1iZXIgSURcIikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfdXNlcmlkbnVtID0gbWVtaWQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmICgobWVtYmVySWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmlzTWVtSWRWYWxpZCAmJiBtZW1iZXJJZCE9PVwiXCIpICkge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3ZlcmlmeV9pZGVudGl0eVwiXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jcmVhdGUvdmVyaWZpY2F0aW9uXCIsIHRoaXMub3RoZXJUeXBlLCBcImF1dGhlbnRpY2F0ZS12ZXJpZnlcIl0sIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3ZlcmlmeV9pZGVudGl0eVwiXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzRXJyb3JPY2N1cmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcGVyc29uYWxfaW5mb1wiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHldLCB7XHJcbiAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBvbmNhbmNlbEZuKCkge1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFscy5pc19hdXRoX2NhbmNlbGxlZD10cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xyXG4gICAgICAgIC8vICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgaWYodGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlPT09XCJSTlZcIil7XHJcbiAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCBcIm1heWJlbGF0ZXJcIl0sIHtcclxuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX2dsb2JhbHMudXNlcl9zdGF0ZT09PVwiUlZcIil7XHJcbiAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3NpZ25lZEhvbWVcIl0sIHtcclxuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93T3JIaWRlQ29udGV4dHVhbEhlbHAoKSB7XHJcbiAgICAgICAgdGhpcy5pc0hlbHBJbmZvVmlzaWJsZSA9ICF0aGlzLmlzSGVscEluZm9WaXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXBweU5hdmlnYXRlKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hhcHB5XCJdLCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZENoZWNrKG1lbWlkLCBzdWZmaXgpIHtcclxuICAgICAgICBsZXQgbWVtYmVySWQ9bWVtaWQrc3VmZml4O1xyXG4gICAgICAgIGlmIChtZW1iZXJJZCAhPT0gdW5kZWZpbmVkICYmIG1lbWJlcklkICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNZW1JZFZhbGlkID0gKHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5hbHBoYU51bWVyaWNNZW1WYWxpZGF0b3IobWVtYmVySWQpICYmIHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5tZW1iZXJJZFZhbGlkYXRvcihtZW1iZXJJZCkpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTWVtSWRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IobWVtYmVySWQpO1xyXG4gICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIGNoYW5nZUZvY3VzKG1lbWlkKXtcclxuICAgICAgICBpZihtZW1pZC5sZW5ndGg9PT0xMil7XHJcbiAgICAgICAgICAgICAgbGV0IG5leHRUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMudHh0ZmxkMi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgIG5leHRUZXh0RmllbGQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb1RvU3VmZml4RmllbGQoKSB7XHJcbiAgICAgICAgdGhpcy50eHRmbGQyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxufSJdfQ==