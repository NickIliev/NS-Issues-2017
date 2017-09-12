"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var myDoctors_service_1 = require("../myDoctors.service");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var ViewVisitHistoryComponent = (function () {
    function ViewVisitHistoryComponent(modalParams, _doctorService, page) {
        this.modalParams = modalParams;
        this._doctorService = _doctorService;
        this.page = page;
    }
    ViewVisitHistoryComponent.prototype.ngOnInit = function () {
        this.selectedMember = this._doctorService.selectedMember;
        this.selectedDoctor = this._doctorService.selectedDoctor;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    };
    ViewVisitHistoryComponent.prototype.closeModal = function () {
        this.modalParams.closeCallback();
    };
    return ViewVisitHistoryComponent;
}());
ViewVisitHistoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./viewVisitHistory.component.html",
        styleUrls: ["./viewVisitHistory.css"]
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
        myDoctors_service_1.MyDoctorsService,
        page_1.Page])
], ViewVisitHistoryComponent);
exports.ViewVisitHistoryComponent = ViewVisitHistoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1Zpc2l0SGlzdG9yeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3VmlzaXRIaXN0b3J5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFDNUUsMERBQXdEO0FBQ3hELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSx5QkFBeUI7SUFJbEMsbUNBQ1ksV0FBOEIsRUFDOUIsY0FBZ0MsRUFDaEMsSUFBVTtRQUZWLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUN0QixDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRU0sOENBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHTCxnQ0FBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlkseUJBQXlCO0lBTnJDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztLQUN4QyxDQUFDO3FDQU8yQiwyQkFBaUI7UUFDZCxvQ0FBZ0I7UUFDMUIsV0FBSTtHQVBiLHlCQUF5QixDQXVCckM7QUF2QlksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBNeURvY3RvcnNTZXJ2aWNlIH0gZnJvbSBcIi4uL215RG9jdG9ycy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdmlld1Zpc2l0SGlzdG9yeS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi92aWV3VmlzaXRIaXN0b3J5LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFZpZXdWaXNpdEhpc3RvcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBzZWxlY3RlZE1lbWJlcjtcbiAgICBwdWJsaWMgc2VsZWN0ZWREb2N0b3I7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbW9kYWxQYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgICAgICBwcml2YXRlIF9kb2N0b3JTZXJ2aWNlOiBNeURvY3RvcnNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IHRoaXMuX2RvY3RvclNlcnZpY2Uuc2VsZWN0ZWRNZW1iZXI7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREb2N0b3IgPSB0aGlzLl9kb2N0b3JTZXJ2aWNlLnNlbGVjdGVkRG9jdG9yO1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMubW9kYWxQYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgIH1cblxuXG59Il19