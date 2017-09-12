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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld1ByZXNjcmlwdGlvbk1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlZpZXdQcmVzY3JpcHRpb25Nb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsbUVBQTRFO0FBQzVFLDREQUEwRDtBQUMxRCxnQ0FBK0I7QUFDL0Isa0RBQW9EO0FBUXBELElBQWEsOEJBQThCO0lBSXZDLHdDQUEyQixXQUE4QixFQUM5QyxrQkFBcUMsRUFDcEMsSUFBVTtRQUZLLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3BDLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDO0lBQ3BFLENBQUM7SUFFRCxpREFBUSxHQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNEQUFhLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sbURBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHTCxxQ0FBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksOEJBQThCO0lBTjFDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdDQUF3QztRQUNyRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUMzQyxDQUFDO3FDQU0wQywyQkFBaUI7UUFDMUIsc0NBQWlCO1FBQzlCLFdBQUk7R0FOYiw4QkFBOEIsQ0EwQjFDO0FBMUJZLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgTWVkaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vbWVkaWNhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vVmlld1ByZXNjcmlwdGlvbk1vZGFsLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJWaWV3UHJlc2NyaXB0aW9uTW9kYWwuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgVmlld1ByZXNjcmlwdGlvbk1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBtZWRpY2F0aW9uOiBhbnk7XG4gICAgc2VsZWN0ZWRVc2VyOiBhbnk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHB1YmxpYyBfbWVkaWNhdGlvbnNlcnZpY2U6IE1lZGljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIgPSB0aGlzLl9tZWRpY2F0aW9uc2VydmljZS5zZWxlY3RlZFVzZXI7XG4gICAgICAgIHRoaXMubWVkaWNhdGlvbiA9IHRoaXMuX21lZGljYXRpb25zZXJ2aWNlLmhpc3RvcnlTZWxlY3RlZE1lbWJlcjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLm1vZGFsUGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gICAgfVxuXG5cbn0iXX0=