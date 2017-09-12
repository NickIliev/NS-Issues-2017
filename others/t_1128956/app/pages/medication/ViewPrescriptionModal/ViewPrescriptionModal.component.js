"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var medication_service_1 = require("../medication.service");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var ViewPrescriptionModalComponent = (function () {
    function ViewPrescriptionModalComponent(modalParams, _medicationservice, page) {
        this.modalParams = modalParams;
        this._medicationservice = _medicationservice;
        this.page = page;
        this.selectedUser = this._medicationservice.selectedUser;
        this.medication = this._medicationservice.historySelectedMember;
    }
    ViewPrescriptionModalComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    };
    ViewPrescriptionModalComponent.prototype.onApplyFilter = function () {
        this.modalParams.closeCallback();
    };
    ViewPrescriptionModalComponent.prototype.closeModal = function () {
        this.modalParams.closeCallback();
    };
    return ViewPrescriptionModalComponent;
}());
ViewPrescriptionModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./ViewPrescriptionModal.component.html",
        styleUrls: ["ViewPrescriptionModal.css"]
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
        medication_service_1.MedicationService,
        page_1.Page])
], ViewPrescriptionModalComponent);
exports.ViewPrescriptionModalComponent = ViewPrescriptionModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld1ByZXNjcmlwdGlvbk1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlZpZXdQcmVzY3JpcHRpb25Nb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsbUVBQTRFO0FBQzVFLDREQUEwRDtBQUMxRCxnQ0FBK0I7QUFDL0Isa0RBQW9EO0FBUXBELElBQWEsOEJBQThCO0lBSXZDLHdDQUEyQixXQUE4QixFQUM5QyxrQkFBcUMsRUFDcEMsSUFBVTtRQUZLLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3BDLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDO0lBQ3BFLENBQUM7SUFFRCxpREFBUSxHQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNEQUFhLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sbURBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHTCxxQ0FBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksOEJBQThCO0lBTjFDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdDQUF3QztRQUNyRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUMzQyxDQUFDO3FDQU0wQywyQkFBaUI7UUFDMUIsc0NBQWlCO1FBQzlCLFdBQUk7R0FOYiw4QkFBOEIsQ0EwQjFDO0FBMUJZLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IE1lZGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL21lZGljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL1ZpZXdQcmVzY3JpcHRpb25Nb2RhbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJWaWV3UHJlc2NyaXB0aW9uTW9kYWwuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVmlld1ByZXNjcmlwdGlvbk1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIG1lZGljYXRpb246IGFueTtcclxuICAgIHNlbGVjdGVkVXNlcjogYW55O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsUGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcclxuICAgICAgICBwdWJsaWMgX21lZGljYXRpb25zZXJ2aWNlOiBNZWRpY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVXNlciA9IHRoaXMuX21lZGljYXRpb25zZXJ2aWNlLnNlbGVjdGVkVXNlcjtcclxuICAgICAgICB0aGlzLm1lZGljYXRpb24gPSB0aGlzLl9tZWRpY2F0aW9uc2VydmljZS5oaXN0b3J5U2VsZWN0ZWRNZW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25BcHBseUZpbHRlcigpIHtcclxuICAgICAgICB0aGlzLm1vZGFsUGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICB0aGlzLm1vZGFsUGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcblxyXG59Il19