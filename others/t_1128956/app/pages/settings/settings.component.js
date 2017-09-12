"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var app = require("tns-core-modules/application");
var page_1 = require("ui/page");
var global_1 = require("../../shared/global");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var formValidation_service_1 = require("../../shared/services/formValidation.service");
var SettingsComponent = (function () {
    function SettingsComponent(_globals, _routerExtensions, promoModal, vcRef, _formValidationService, page) {
        this._globals = _globals;
        this._routerExtensions = _routerExtensions;
        this.promoModal = promoModal;
        this.vcRef = vcRef;
        this._formValidationService = _formValidationService;
        this.page = page;
        this.title = "Settings";
        this.isEmailClicked = false;
        this.isMobileClicked = false;
        this.invalidEmailLbl = false;
        this.invalidMobileLbl = false;
        this.emailRequired = false;
        this.emailid = "";
        this.mobileNumber = null;
        this.mobileText = 6171234567;
        this.isProfileSettingsSelected = true;
        this.isPreferenceSettingsSelected = false;
        this.isPasswordValid = true;
        this.isNewPasswordValid = true;
        this.emailDisable = "Add your email address";
        this.showPasswordBtn = {
            currentPwd: "Show",
            newPwd: "Show"
        };
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.pageStartTime = new Date().getTime();
    }
    SettingsComponent.prototype.showPassword = function (currentField) {
        //this.el.nativeElement.secure = false;
        if (this.showPasswordBtn[currentField] === 'Show') {
            this[currentField].nativeElement.secure = false;
            this.showPasswordBtn[currentField] = "Hide";
        }
        else if (this.showPasswordBtn[currentField] === 'Hide') {
            this[currentField].nativeElement.secure = true;
            this.showPasswordBtn[currentField] = "Show";
        }
        if (app.android) {
            this.setCursorToEnd(currentField);
        }
    };
    SettingsComponent.prototype.formatMobileNumber = function (mobNumber) {
        return mobNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    };
    SettingsComponent.prototype.setCursorToEnd = function (currentField) {
        var _this = this;
        setTimeout(function () {
            android.text.Selection.setSelection(_this[currentField].nativeElement.android.getText(), _this[currentField].nativeElement.android.length());
        }, 0);
    };
    SettingsComponent.prototype.saveEmail = function (emailid) {
        if (emailid === "") {
            return false;
        }
        else if (!(this._formValidationService.emailMatchValidator(emailid))) {
            this.invalidEmailLbl = true;
            return false;
        }
        this.invalidEmailLbl = false;
        this.isEmailClicked = false;
        this.emailDisable = emailid;
    };
    SettingsComponent.prototype.saveMobile = function (mobileNumber) {
        if (!(mobileNumber)) {
            return false;
        }
        else if (mobileNumber.length < 10) {
            this.invalidMobileLbl = true;
            return false;
        }
        this.invalidMobileLbl = false;
        this.isMobileClicked = false;
        this.mobileText = mobileNumber;
        //this.emailDisable = this.emailid;
    };
    SettingsComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    };
    SettingsComponent.prototype.onSelectedIndexChange = function (tabName) {
        this.isProfileSettingsSelected = tabName == "profileSettings";
        this.isPreferenceSettingsSelected = tabName == "preferenceSettings";
    };
    SettingsComponent.prototype.validateEmail = function (email) {
        if (email === "") {
            return false;
        }
        else {
            return this._formValidationService.passwordPatternValidator(this.newPwd.nativeElement.text);
        }
    };
    SettingsComponent.prototype.updateClicked = function () {
        this.isPasswordValid = this.validateEmail(this.newPwd.nativeElement.text);
    };
    SettingsComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    SettingsComponent.prototype.ngAfterViewInit = function () {
        // console.log(this.touchIDStack)
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    return SettingsComponent;
}());
__decorate([
    core_1.ViewChild('currentPwd'),
    __metadata("design:type", core_1.ElementRef)
], SettingsComponent.prototype, "currentPwd", void 0);
__decorate([
    core_1.ViewChild('newPwd'),
    __metadata("design:type", core_1.ElementRef)
], SettingsComponent.prototype, "newPwd", void 0);
SettingsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./settings.component.html",
        styleUrls: ["./settings.css"],
    }),
    __metadata("design:paramtypes", [global_1.Globals,
        router_1.RouterExtensions,
        dialogs_1.ModalDialogService,
        core_1.ViewContainerRef,
        formValidation_service_1.FormValidationService,
        page_1.Page])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlHO0FBRXpHLHNEQUErRDtBQUUvRCxrREFBb0Q7QUFHcEQsZ0NBQStCO0FBQy9CLDhDQUE4QztBQUU5QyxtRUFBNkU7QUFDN0UsdUZBQXFGO0FBT3JGLElBQWEsaUJBQWlCO0lBNEIxQiwyQkFBMEIsUUFBaUIsRUFDL0IsaUJBQW1DLEVBQ25DLFVBQThCLEVBQzlCLEtBQXVCLEVBQ3ZCLHNCQUE2QyxFQUM3QyxJQUFVO1FBTEksYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsU0FBSSxHQUFKLElBQUksQ0FBTTtRQTlCdEIsVUFBSyxHQUFXLFVBQVUsQ0FBQztRQUVwQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUM1QixlQUFVLEdBQVcsVUFBVSxDQUFDO1FBRWhDLDhCQUF5QixHQUFXLElBQUksQ0FBQztRQUN6QyxpQ0FBNEIsR0FBVyxLQUFLLENBQUM7UUFDN0Msb0JBQWUsR0FBVyxJQUFJLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBQ2xDLGlCQUFZLEdBQVUsd0JBQXdCLENBQUM7UUFDL0Msb0JBQWUsR0FBRztZQUNyQixVQUFVLEVBQUUsTUFBTTtZ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SUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBRWxFLENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUFqSUQsSUFpSUM7QUFoSTRCO0lBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDOzhCQUFhLGlCQUFVO3FEQUFDO0FBQzNCO0lBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDOzhCQUFTLGlCQUFVO2lEQUFDO0FBRi9CLGlCQUFpQjtJQUw3QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDaEMsQ0FBQztxQ0E2QnNDLGdCQUFPO1FBQ1oseUJBQWdCO1FBQ3ZCLDRCQUFrQjtRQUN2Qix1QkFBZ0I7UUFDQyw4Q0FBcUI7UUFDdkMsV0FBSTtHQWpDYixpQkFBaUIsQ0FpSTdCO0FBaklZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInVpL3N3aXRjaFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NldHRpbmdzLmNzc1wiXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIEBWaWV3Q2hpbGQoJ2N1cnJlbnRQd2QnKSBjdXJyZW50UHdkOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnbmV3UHdkJykgbmV3UHdkOiBFbGVtZW50UmVmO1xyXG4gICAgdGl0bGU6IHN0cmluZyA9IFwiU2V0dGluZ3NcIjtcclxuXHJcbiAgICBwdWJsaWMgaXNFbWFpbENsaWNrZWQ6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc01vYmlsZUNsaWNrZWQ6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpbnZhbGlkRW1haWxMYmw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpbnZhbGlkTW9iaWxlTGJsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZW1haWxSZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGVtYWlsaWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgbW9iaWxlTnVtYmVyOiBudW1iZXIgPSBudWxsO1xyXG4gICAgcHVibGljIG1vYmlsZVRleHQ6IG51bWJlciA9IDYxNzEyMzQ1Njc7XHJcblxyXG4gICAgcHVibGljIGlzUHJvZmlsZVNldHRpbmdzU2VsZWN0ZWQ6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNQcmVmZXJlbmNlU2V0dGluZ3NTZWxlY3RlZDpib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNQYXNzd29yZFZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzTmV3UGFzc3dvcmRWYWxpZDpib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBlbWFpbERpc2FibGU6c3RyaW5nID0gXCJBZGQgeW91ciBlbWFpbCBhZGRyZXNzXCI7XHJcbiAgICBwdWJsaWMgc2hvd1Bhc3N3b3JkQnRuID0ge1xyXG4gICAgICAgIGN1cnJlbnRQd2Q6IFwiU2hvd1wiLFxyXG4gICAgICAgIG5ld1B3ZDogXCJTaG93XCJcclxuICAgIH07XHJcblxyXG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlRW5kVGltZSA6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlVGltZURpZmZlcmVuY2UgOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHByb21vTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgX2Zvcm1WYWxpZGF0aW9uU2VydmljZTogRm9ybVZhbGlkYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UGFzc3dvcmQgKGN1cnJlbnRGaWVsZCkge1xyXG4gICAgICAgIC8vdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNlY3VyZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnNob3dQYXNzd29yZEJ0bltjdXJyZW50RmllbGRdID09PSAnU2hvdycpIHtcclxuICAgICAgICAgICAgdGhpc1tjdXJyZW50RmllbGRdLm5hdGl2ZUVsZW1lbnQuc2VjdXJlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkQnRuW2N1cnJlbnRGaWVsZF0gPSBcIkhpZGVcIlxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd1Bhc3N3b3JkQnRuW2N1cnJlbnRGaWVsZF0gPT09ICdIaWRlJykge1xyXG4gICAgICAgICAgICB0aGlzW2N1cnJlbnRGaWVsZF0ubmF0aXZlRWxlbWVudC5zZWN1cmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZEJ0bltjdXJyZW50RmllbGRdID0gXCJTaG93XCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnNvclRvRW5kKGN1cnJlbnRGaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvcm1hdE1vYmlsZU51bWJlcihtb2JOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBtb2JOdW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC8oXFxkezN9KShcXGR7M30pKFxcZHs0fSkvLCBcIigkMSkgJDItJDNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1cnNvclRvRW5kKGN1cnJlbnRGaWVsZCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBhbmRyb2lkLnRleHQuU2VsZWN0aW9uLnNldFNlbGVjdGlvbihcclxuICAgICAgICAgICAgICAgIHRoaXNbY3VycmVudEZpZWxkXS5uYXRpdmVFbGVtZW50LmFuZHJvaWQuZ2V0VGV4dCgpLFxyXG4gICAgICAgICAgICAgICAgdGhpc1tjdXJyZW50RmllbGRdLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5sZW5ndGgoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVFbWFpbChlbWFpbGlkKSB7XHJcbiAgICAgICAgaWYgKGVtYWlsaWQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoISh0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZW1haWxNYXRjaFZhbGlkYXRvcihlbWFpbGlkKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnZhbGlkRW1haWxMYmwgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW52YWxpZEVtYWlsTGJsID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0VtYWlsQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZW1haWxEaXNhYmxlID0gZW1haWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlTW9iaWxlKG1vYmlsZU51bWJlcikge1xyXG4gICAgICAgIGlmICghKG1vYmlsZU51bWJlcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobW9iaWxlTnVtYmVyLmxlbmd0aCA8IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZE1vYmlsZUxibCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkTW9iaWxlTGJsID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc01vYmlsZUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1vYmlsZVRleHQgPSBtb2JpbGVOdW1iZXI7XHJcbiAgICAgICAgLy90aGlzLmVtYWlsRGlzYWJsZSA9IHRoaXMuZW1haWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKHRhYk5hbWUpIHtcclxuICAgICAgICB0aGlzLmlzUHJvZmlsZVNldHRpbmdzU2VsZWN0ZWQgPSB0YWJOYW1lID09IFwicHJvZmlsZVNldHRpbmdzXCI7XHJcbiAgICAgICAgdGhpcy5pc1ByZWZlcmVuY2VTZXR0aW5nc1NlbGVjdGVkID0gdGFiTmFtZSA9PSBcInByZWZlcmVuY2VTZXR0aW5nc1wiXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcclxuICAgICAgICBpZiAoZW1haWwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UucGFzc3dvcmRQYXR0ZXJuVmFsaWRhdG9yKHRoaXMubmV3UHdkLm5hdGl2ZUVsZW1lbnQudGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDbGlja2VkKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXNzd29yZFZhbGlkID0gdGhpcy52YWxpZGF0ZUVtYWlsKHRoaXMubmV3UHdkLm5hdGl2ZUVsZW1lbnQudGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy50b3VjaElEU3RhY2spXHJcblxyXG4gICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xyXG5cclxuICB9XHJcblxyXG59Il19