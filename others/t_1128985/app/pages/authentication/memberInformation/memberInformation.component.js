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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVySW5mb3JtYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVtYmVySW5mb3JtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBRXpFLDBDQUF5QztBQUV6QyxnQ0FBK0I7QUFDL0Isc0RBQStEO0FBRS9ELHdDQUF1SDtBQUd2SCxvRUFBa0U7QUFDbEUsMEZBQXdGO0FBQ3hGLGlEQUFpRDtBQUNqRCxrREFBb0Q7QUFFcEQsZ0VBQXFEO0FBQ3JELGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFDcEMsMkZBQTJGO0FBTTNGLElBQWEsMEJBQTBCO0lBNEJuQyxvQ0FBMkIsTUFBYyxFQUM3QixJQUFVLEVBQ1gsUUFBaUIsRUFDaEIsc0JBQTZDLEVBQzlDLFlBQW1DLEVBQ2xDLEVBQWUsRUFDZixpQkFBbUM7UUFOcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM3QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzlDLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUNsQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWpDL0MsVUFBSyxHQUFXLGdCQUFnQixDQUFDO1FBTzFCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBR2hDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUNuQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsVUFBSyxHQUFTLEVBQUUsQ0FBQztRQUNqQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBSWpCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUNwQyxzQkFBaUIsR0FB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QVMsQ0FBQzs4QkFBVSxpQkFBVTsyREFBQztBQTNCakMsMEJBQTBCO0lBTHRDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLG9DQUFvQztRQUNqRCxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUN2QyxDQUFDO3FDQTZCcUMsZUFBTTtRQUN2QixXQUFJO1FBQ0QsZ0JBQU87UUFDUSw4Q0FBcUI7UUFDaEMsOENBQXFCO1FBQzlCLG1CQUFXO1FBQ0kseUJBQWdCO0dBbEN0QywwQkFBMEIsQ0E4TXRDO0FBOU1ZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0ICxWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgTWVtYmVySW5mbyB9IGZyb20gXCIuLi9hdXRoZW50aWNhdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG52YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbi8vIHJlZ2lzdGVyRWxlbWVudChcIkRyb3BEb3duXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2Ryb3AtZG93blwiKS5Ecm9wRG93bik7XG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWVtYmVySW5mb3JtYXRpb24uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4uL2F1dGhlbnRpY2F0aW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBNZW1iZXJJbmZvcm1hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdGl0bGU6IHN0cmluZyA9IFwiQXV0aGVudGljYXRpb25cIjtcbiAgICBwdWJsaWMgaWR0eXBlczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleDogTnVtYmVyO1xuICAgIHB1YmxpYyBkZGluZGV4OiBOdW1iZXI7XG4gICAgcHVibGljIHNob3dNZW1pZFRleHRGaWVsZDogQm9vbGVhbjtcbiAgICBwdWJsaWMgc2hvd0RlYml0bm9UZXh0RmllbGQ6IEJvb2xlYW47XG4gICAgcHVibGljIHNob3dTdHVkZW50aWRUZXh0RmllbGQ6IEJvb2xlYW47XG4gICAgcHVibGljIGlzRXJyb3JPY2N1cmVkOiBCb29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGN1cnJlbnRUeXBlOiBzdHJpbmc7XG4gICAgcHVibGljIG90aGVyVHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpc01lbUlkVmFsaWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc0RlYml0TnVtYmVyVmFsaWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc1N0dWRlbnRJZFZhbGlkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgbWVtaWQ6IHN0cmluZz1cIlwiO1xuICAgIHB1YmxpYyBzdWZmaXg6c3RyaW5nPVwiXCI7XG4gICAgcHVibGljIGRlYml0Y2FyZG5vOiBzdHJpbmc7XG4gICAgcHVibGljIHN0dWRlbnRpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBpZFR5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgaXNNZW1JZEZpbGxlZDogQm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzRGViaXROdW1iZXJGaWxsZWQ6IEJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc1N0dWRlbnRJZEZpbGxlZDogQm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgcHVibGljIGhlbHBJbmZvSHRtbDogc3RyaW5nID0gXCI8IURPQ1RZUEUgaHRtbD48aHRtbD48aGVhZD48dGl0bGU+TXlUaXRsZTwvdGl0bGU+PG1ldGEgY2hhcnNldD1cXFwidXRmLThcXFwiIC8+PHN0eWxlPiBib2R5e2JhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7Zm9udC1mYW1pbHk6IEFyaWFsO308L3N0eWxlPjwvaGVhZD48Ym9keT48cD48c3BhbiBzdHlsZT1cXFwicGFkZGluZzogNzA7Y29sb3I6IzAwMDAwMDtmb250LXdlaWdodDpib2xkO1xcXCI+V2hhdCBpcyBNZW1iZXIgSW5mb3JtYXRpb24/PC9zcGFuPjwvYnI+TnVsbGFtIG1vbGxpcywgbGVjdHVzIGF0IGVsZWlmZW5kIHRpbmNpZHVudCwgcHVydXMgdG9ydG9yIGFsaXF1ZXQgZmVsaXMsIHNpdCBhbWV0IGludGVyZHVtIHZlbGl0IGxpZ3VsYSBuZWMgZXJhdCBsZWlmZW5kIHRpbmNpZHVudCwgcHVydXMgdG9ydG9yIGFsaXF1ZXQgZmVsaXMuPC9wPlwiO1xuICAgIHB1YmxpYyBpc0hlbHBJbmZvVmlzaWJsZTogQm9vbGVhbiA9IGZhbHNlO1xuICAgIG1pbmZvPW5ldyBNZW1iZXJJbmZvKCk7XG4gICAgQFZpZXdDaGlsZChcInR4dGZsZDFcIikgdHh0ZmxkMTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidHh0ZmxkMlwiKSB0eHRmbGQyOiBFbGVtZW50UmVmO1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcbiAgICAgICAgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBhdXRoX3NlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2dsb2JhbHMuaXNUdXJuT2ZmKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0RlYml0bm9UZXh0RmllbGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U3R1ZGVudGlkVGV4dEZpZWxkID0gZmFsc2U7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBcIlJOVlwiO1xuICAgICAgICAgdGhpcy5fZ2xvYmFscy5pc19hdXRoX2NhbmNlbGxlZD1mYWxzZTtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW9zU3BlY2lmaWMgPSBcIkNob29zZU9uZVwiO1xuICAgICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcbiAgICAgICAgICAgIHRoaXMuaWR0eXBlcyA9IFtcIkJDQlNNQSBNZW1iZXIgSURcIl07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pZHR5cGVzID0gW1wiQkNCU01BIE1lbWJlciBJRFwiLCBcIkZpbmFuY2lhbCBEZWJpdCBDYXJkIE51bWJlclwiLCBcIlN0dWRlbnQgSUQgTnVtYmVyXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuaWR0eXBlcy51bnNoaWZ0KGlvc1NwZWNpZmljKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudFR5cGUgPSB0aGlzLmF1dGhfc2VydmljZS51c2VyX3JlZ2lzdHJhdGlvbl90eXBlO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gXCJtb2JpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5vdGhlclR5cGUgPSBcImVtYWlsXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jdXJyZW50VHlwZSA9IFwiZW1haWxcIikge1xuICAgICAgICAgICAgdGhpcy5vdGhlclR5cGUgPSBcIm1vYmlsZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIC8vIGlvc1xuICAgICAgICB0aGlzLmRkaW5kZXggPSBhcmdzLm5ld0luZGV4O1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5kZGluZGV4ID0gYXJncy5uZXdJbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kZGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNob3dEZWJpdG5vVGV4dEZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNob3dTdHVkZW50aWRUZXh0RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl91c2VyaWR0eXBlID0gXCJCQ0JTTUEgTWVtYmVyIElEXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5kZGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dEZWJpdG5vVGV4dEZpZWxkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2hvd01lbWlkVGV4dEZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNob3dTdHVkZW50aWRUZXh0RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbHMudXNlcl91c2VyaWR0eXBlID0gXCJGaW5hbmNpYWwgRGViaXQgQ2FyZCBOdW1iZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRkaW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0dWRlbnRpZFRleHRGaWVsZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zaG93RGViaXRub1RleHRGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3VzZXJpZHR5cGUgPSBcIlN0dWRlbnQgSUQgTnVtYmVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNZW1pZFRleHRGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zaG93RGViaXRub1RleHRGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zaG93U3R1ZGVudGlkVGV4dEZpZWxkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25vcGVuKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRyb3AgRG93biBvcGVuZWQuXCIpO1xuICAgIH1cbiAgICBwdWJsaWMgb25Db250aW51ZShtZW1pZCwgc3VmZml4KSB7XG4gICAgICAgIHRoaXMubWluZm8ubWVtaWQ9bWVtaWQ7XG4gICAgICAgIHRoaXMubWluZm8uc3VmZml4PXN1ZmZpeDtcbiAgICAgICAgdmFyIG1lbWJlcklkPW1lbWlkK3N1ZmZpeDtcbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5pc01lbUlkVmFsaWQgPSAodGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmFscGhhTnVtZXJpY01lbVZhbGlkYXRvcihtZW1iZXJJZCkgJiYgdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1lbWJlcklkVmFsaWRhdG9yKG1lbWJlcklkKSk7XG4gICAgICAgIC8vIHRoaXMuaXNEZWJpdE51bWJlclZhbGlkID0gKHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5vbmx5RGlnaXRzVmFsaWRhdG9yKGRlYml0Y2FyZG5vKSAmJiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZGViaXRDYXJkTm9WYWxpZGF0b3IoZGViaXRjYXJkbm8pKTtcbiAgICAgICAgLy8gdGhpcy5pc1N0dWRlbnRJZFZhbGlkID0gKHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5vbmx5RGlnaXRzVmFsaWRhdG9yKHN0dWRlbnRpZCkgJiYgdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1lbWJlcklkVmFsaWRhdG9yKHN0dWRlbnRpZCkpO1xuICAgICAgIHRoaXMuaXNNZW1JZEZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihtZW1pZCk7XG4gICAgICBcbiAgICAgICAgLy8gdGhpcy5pc0RlYml0TnVtYmVyRmlsbGVkID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmZpZWxkRmlsbGVkVmFsaWRhdG9yKGRlYml0Y2FyZG5vKTtcbiAgICAgICAgLy8gdGhpcy5pc1N0dWRlbnRJZEZpbGxlZCA9IHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5maWVsZEZpbGxlZFZhbGlkYXRvcihzdHVkZW50aWQpO1xuICAgICAgICAvLyBpZiAodGhpcy5fZ2xvYmFscy51c2VyX3VzZXJpZHR5cGUgPT09IFwiU3R1ZGVudCBJRCBOdW1iZXJcIikge1xuICAgICAgICAvLyAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3VzZXJpZG51bSA9IHN0dWRlbnRpZDtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIGlmICh0aGlzLl9nbG9iYWxzLnVzZXJfdXNlcmlkdHlwZSA9PT0gXCJGaW5hbmNpYWwgRGViaXQgQ2FyZCBOdW1iZXJcIikge1xuICAgICAgICAvLyAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3VzZXJpZG51bSA9IGRlYml0Y2FyZG5vO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2UgaWYgKHRoaXMuX2dsb2JhbHMudXNlcl91c2VyaWR0eXBlID09PSBcIkJDQlNNQSBNZW1iZXIgSURcIikge1xuICAgICAgICAvLyAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3VzZXJpZG51bSA9IG1lbWlkO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmICgobWVtYmVySWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmlzTWVtSWRWYWxpZCAmJiBtZW1iZXJJZCE9PVwiXCIpICkge1xuICAgICAgICAgICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcbiAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3ZlcmlmeV9pZGVudGl0eVwiXSwge1xuICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLm90aGVyVHlwZSwgXCJhdXRoZW50aWNhdGUtdmVyaWZ5XCJdLCB7XG4gICAgICAgICAgICAgICAgLy8gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby92ZXJpZnlfaWRlbnRpdHlcIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzRXJyb3JPY2N1cmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3BlcnNvbmFsX2luZm9cIiwgdGhpcy5fZ2xvYmFscy5yZWdpc3RyYXRpb25fbW9kZSwgdGhpcy5fZ2xvYmFscy51c2VyX2lkZW50aXR5XSwge1xuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIG9uY2FuY2VsRm4oKSB7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmlzYW5vbnltb3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9nbG9iYWxzLmNoYW5nZVJlZ2lzdGVyKCk7XG4gICAgICAgIHRoaXMuX2dsb2JhbHMuaXNfYXV0aF9jYW5jZWxsZWQ9dHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9zaWduZWRIb21lXCJdLCB7XG4gICAgICAgIC8vICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIC8vIH0pO1xuICAgICAgICBpZih0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGU9PT1cIlJOVlwiKXtcbiAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3JlYXRlL3ZlcmlmaWNhdGlvblwiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCBcIm1heWJlbGF0ZXJcIl0sIHtcbiAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGU9PT1cIlJWXCIpe1xuICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvc2lnbmVkSG9tZVwiXSwge1xuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgc2hvd09ySGlkZUNvbnRleHR1YWxIZWxwKCkge1xuICAgICAgICB0aGlzLmlzSGVscEluZm9WaXNpYmxlID0gIXRoaXMuaXNIZWxwSW5mb1Zpc2libGU7XG4gICAgfVxuXG4gICAgcHVibGljIGhhcHB5TmF2aWdhdGUoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hhcHB5XCJdLCB7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkQ2hlY2sobWVtaWQsIHN1ZmZpeCkge1xuICAgICAgICBsZXQgbWVtYmVySWQ9bWVtaWQrc3VmZml4O1xuICAgICAgICBpZiAobWVtYmVySWQgIT09IHVuZGVmaW5lZCAmJiBtZW1iZXJJZCAhPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5pc01lbUlkVmFsaWQgPSAodGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmFscGhhTnVtZXJpY01lbVZhbGlkYXRvcihtZW1iZXJJZCkgJiYgdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLm1lbWJlcklkVmFsaWRhdG9yKG1lbWJlcklkKSk7XG4gICAgICAgICAgICB0aGlzLmlzTWVtSWRGaWxsZWQgPSB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZmllbGRGaWxsZWRWYWxpZGF0b3IobWVtYmVySWQpO1xuICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBwdWJsaWMgY2hhbmdlRm9jdXMobWVtaWQpe1xuICAgICAgICBpZihtZW1pZC5sZW5ndGg9PT0xMil7XG4gICAgICAgICAgICAgIGxldCBuZXh0VGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLnR4dGZsZDIubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgbmV4dFRleHRGaWVsZC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdvVG9TdWZmaXhGaWVsZCgpIHtcbiAgICAgICAgdGhpcy50eHRmbGQyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59Il19