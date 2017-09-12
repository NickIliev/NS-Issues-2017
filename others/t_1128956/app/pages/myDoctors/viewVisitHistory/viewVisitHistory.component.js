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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1Zpc2l0SGlzdG9yeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3VmlzaXRIaXN0b3J5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFDNUUsMERBQXdEO0FBQ3hELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSx5QkFBeUI7SUFJbEMsbUNBQ1ksV0FBOEIsRUFDOUIsY0FBZ0MsRUFDaEMsSUFBVTtRQUZWLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUN0QixDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRU0sOENBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHTCxnQ0FBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlkseUJBQXlCO0lBTnJDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztLQUN4QyxDQUFDO3FDQU8yQiwyQkFBaUI7UUFDZCxvQ0FBZ0I7UUFDMUIsV0FBSTtHQVBiLHlCQUF5QixDQXVCckM7QUF2QlksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgTXlEb2N0b3JzU2VydmljZSB9IGZyb20gXCIuLi9teURvY3RvcnMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ZpZXdWaXNpdEhpc3RvcnkuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi92aWV3VmlzaXRIaXN0b3J5LmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdWaXNpdEhpc3RvcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHVibGljIHNlbGVjdGVkTWVtYmVyO1xyXG4gICAgcHVibGljIHNlbGVjdGVkRG9jdG9yO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG1vZGFsUGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcclxuICAgICAgICBwcml2YXRlIF9kb2N0b3JTZXJ2aWNlOiBNeURvY3RvcnNTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXIgPSB0aGlzLl9kb2N0b3JTZXJ2aWNlLnNlbGVjdGVkTWVtYmVyO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREb2N0b3IgPSB0aGlzLl9kb2N0b3JTZXJ2aWNlLnNlbGVjdGVkRG9jdG9yO1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbFBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==