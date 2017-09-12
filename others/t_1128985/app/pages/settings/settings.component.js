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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlHO0FBRXpHLHNEQUErRDtBQUUvRCxrREFBb0Q7QUFHcEQsZ0NBQStCO0FBQy9CLDhDQUE4QztBQUU5QyxtRUFBNkU7QUFDN0UsdUZBQXFGO0FBT3JGLElBQWEsaUJBQWlCO0lBNEIxQiwyQkFBMEIsUUFBaUIsRUFDL0IsaUJBQW1DLEVBQ25DLFVBQThCLEVBQzlCLEtBQXVCLEVBQ3ZCLHNCQUE2QyxFQUM3QyxJQUFVO1FBTEksYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsU0FBSSxHQUFKLElBQUksQ0FBTTtRQTlCdEIsVUFBSyxHQUFXLFVBQVUsQ0FBQztRQUVwQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUM1QixlQUFVLEdBQVcsVUFBVSxDQUFDO1FBRWhDLDhCQUF5QixHQUFXLElBQUksQ0FBQztRQUN6QyxpQ0FBNEIsR0FBVyxLQUFLLENBQUM7UUFDN0Msb0JBQWUsR0FBVyxJQUFJLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBQ2xDLGlCQUFZLEdBQVUsd0JBQXdCLENBQUM7UUFDL0Msb0JBQWUsR0FBRztZQUNyQixVQUFVLEVBQUUsTUFBTTtZ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SUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBRWxFLENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUFqSUQsSUFpSUM7QUFoSTRCO0lBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDOzhCQUFhLGlCQUFVO3FEQUFDO0FBQzNCO0lBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDOzhCQUFTLGlCQUFVO2lEQUFDO0FBRi9CLGlCQUFpQjtJQUw3QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDaEMsQ0FBQztxQ0E2QnNDLGdCQUFPO1FBQ1oseUJBQWdCO1FBQ3ZCLDRCQUFrQjtRQUN2Qix1QkFBZ0I7UUFDQyw4Q0FBcUI7UUFDdkMsV0FBSTtHQWpDYixpQkFBaUIsQ0FpSTdCO0FBaklZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFNldHRpbmdzU2VydmljZSB9IGZyb20gXCIuL3NldHRpbmdzLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInVpL3N3aXRjaFwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9mb3JtVmFsaWRhdGlvbi5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9zZXR0aW5ncy5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICBAVmlld0NoaWxkKCdjdXJyZW50UHdkJykgY3VycmVudFB3ZDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCduZXdQd2QnKSBuZXdQd2Q6IEVsZW1lbnRSZWY7XG4gICAgdGl0bGU6IHN0cmluZyA9IFwiU2V0dGluZ3NcIjtcblxuICAgIHB1YmxpYyBpc0VtYWlsQ2xpY2tlZDogQm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc01vYmlsZUNsaWNrZWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaW52YWxpZEVtYWlsTGJsOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGludmFsaWRNb2JpbGVMYmw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgZW1haWxSZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBlbWFpbGlkOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBtb2JpbGVOdW1iZXI6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIG1vYmlsZVRleHQ6IG51bWJlciA9IDYxNzEyMzQ1Njc7XG5cbiAgICBwdWJsaWMgaXNQcm9maWxlU2V0dGluZ3NTZWxlY3RlZDpib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNQcmVmZXJlbmNlU2V0dGluZ3NTZWxlY3RlZDpib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzUGFzc3dvcmRWYWxpZDpib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNOZXdQYXNzd29yZFZhbGlkOmJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBlbWFpbERpc2FibGU6c3RyaW5nID0gXCJBZGQgeW91ciBlbWFpbCBhZGRyZXNzXCI7XG4gICAgcHVibGljIHNob3dQYXNzd29yZEJ0biA9IHtcbiAgICAgICAgY3VycmVudFB3ZDogXCJTaG93XCIsXG4gICAgICAgIG5ld1B3ZDogXCJTaG93XCJcbiAgICB9O1xuXG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XG4gICAgcGFnZUVuZFRpbWUgOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIHByb21vTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfZm9ybVZhbGlkYXRpb25TZXJ2aWNlOiBGb3JtVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd1Bhc3N3b3JkIChjdXJyZW50RmllbGQpIHtcbiAgICAgICAgLy90aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2VjdXJlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zaG93UGFzc3dvcmRCdG5bY3VycmVudEZpZWxkXSA9PT0gJ1Nob3cnKSB7XG4gICAgICAgICAgICB0aGlzW2N1cnJlbnRGaWVsZF0ubmF0aXZlRWxlbWVudC5zZWN1cmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkQnRuW2N1cnJlbnRGaWVsZF0gPSBcIkhpZGVcIlxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG93UGFzc3dvcmRCdG5bY3VycmVudEZpZWxkXSA9PT0gJ0hpZGUnKSB7XG4gICAgICAgICAgICB0aGlzW2N1cnJlbnRGaWVsZF0ubmF0aXZlRWxlbWVudC5zZWN1cmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRCdG5bY3VycmVudEZpZWxkXSA9IFwiU2hvd1wiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29yVG9FbmQoY3VycmVudEZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1hdE1vYmlsZU51bWJlcihtb2JOdW1iZXI6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbW9iTnVtYmVyLnRvU3RyaW5nKCkucmVwbGFjZSgvKFxcZHszfSkoXFxkezN9KShcXGR7NH0pLywgXCIoJDEpICQyLSQzXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDdXJzb3JUb0VuZChjdXJyZW50RmllbGQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBhbmRyb2lkLnRleHQuU2VsZWN0aW9uLnNldFNlbGVjdGlvbihcbiAgICAgICAgICAgICAgICB0aGlzW2N1cnJlbnRGaWVsZF0ubmF0aXZlRWxlbWVudC5hbmRyb2lkLmdldFRleHQoKSxcbiAgICAgICAgICAgICAgICB0aGlzW2N1cnJlbnRGaWVsZF0ubmF0aXZlRWxlbWVudC5hbmRyb2lkLmxlbmd0aCgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBzYXZlRW1haWwoZW1haWxpZCkge1xuICAgICAgICBpZiAoZW1haWxpZCA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKCEodGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmVtYWlsTWF0Y2hWYWxpZGF0b3IoZW1haWxpZCkpKSB7XG4gICAgICAgICAgICB0aGlzLmludmFsaWRFbWFpbExibCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnZhbGlkRW1haWxMYmwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0VtYWlsQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtYWlsRGlzYWJsZSA9IGVtYWlsaWQ7XG4gICAgfVxuXG4gICAgc2F2ZU1vYmlsZShtb2JpbGVOdW1iZXIpIHtcbiAgICAgICAgaWYgKCEobW9iaWxlTnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKG1vYmlsZU51bWJlci5sZW5ndGggPCAxMCkge1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkTW9iaWxlTGJsID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmludmFsaWRNb2JpbGVMYmwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vYmlsZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb2JpbGVUZXh0ID0gbW9iaWxlTnVtYmVyO1xuICAgICAgICAvL3RoaXMuZW1haWxEaXNhYmxlID0gdGhpcy5lbWFpbGlkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKHRhYk5hbWUpIHtcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGVTZXR0aW5nc1NlbGVjdGVkID0gdGFiTmFtZSA9PSBcInByb2ZpbGVTZXR0aW5nc1wiO1xuICAgICAgICB0aGlzLmlzUHJlZmVyZW5jZVNldHRpbmdzU2VsZWN0ZWQgPSB0YWJOYW1lID09IFwicHJlZmVyZW5jZVNldHRpbmdzXCJcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuICAgICAgICBpZiAoZW1haWwgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UucGFzc3dvcmRQYXR0ZXJuVmFsaWRhdG9yKHRoaXMubmV3UHdkLm5hdGl2ZUVsZW1lbnQudGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5pc1Bhc3N3b3JkVmFsaWQgPSB0aGlzLnZhbGlkYXRlRW1haWwodGhpcy5uZXdQd2QubmF0aXZlRWxlbWVudC50ZXh0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbiAgICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudG91Y2hJRFN0YWNrKVxuXG4gICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICB0aGlzLnBhZ2VUaW1lRGlmZmVyZW5jZSA9IHRoaXMucGFnZUVuZFRpbWUgLSB0aGlzLnBhZ2VTdGFydFRpbWU7XG5cbiAgfVxuXG59Il19