"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var shared = require("../../../../shared");
var RequestViewAddComponent = (function () {
    function RequestViewAddComponent() {
        /// placeholder for component constructor
        this.add = new core_1.EventEmitter();
        /// placeholder for field
        this.dropdownlistJobTypeDropDown = new Object();
        this.dropdownlistPriorityDropDown = new Object();
        this.dropdownlistSpaceDropDown = new Object();
        this.dropdownlistBuildingDropDown = new Object();
        this.dropdownlistJobTypeDropDown.items$ = new Observable_1.Observable(Object);
        this.dropdownlistJobTypeDropDown.itemsIndicators = new Array();
        this.dropdownlistPriorityDropDown.items$ = new Observable_1.Observable(Object);
        this.dropdownlistPriorityDropDown.itemsIndicators = new Array();
        this.dropdownlistSpaceDropDown.items$ = new Observable_1.Observable(Object);
        this.dropdownlistSpaceDropDown.itemsIndicators = new Array();
        this.dropdownlistBuildingDropDown.items$ = new Observable_1.Observable(Object);
        this.dropdownlistBuildingDropDown.itemsIndicators = new Array();
    }
    Object.defineProperty(RequestViewAddComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    RequestViewAddComponent.prototype.onSelectedPickerChanged = function (picker, dropdown, dataBind) {
        this.item.data[dataBind] = this[dropdown].itemsIndicators[picker.selectedIndex];
    };
    RequestViewAddComponent.prototype.ngOnInit = function () {
        /// placeholder for component init
        var _this = this;
        this.dropdownlistJobTypeDropDown.items$ = this.service.getDbCollection('JobType').map(function (data) { return data.map(function (item, index) {
            if (_this.item.data.JobType === item.Id) {
                _this.dropdownlistJobTypeDropDown.index = index;
            }
            _this.dropdownlistJobTypeDropDown.itemsIndicators.push(item.Id);
            return item.Name;
        }); });
        this.dropdownlistPriorityDropDown.items$ = this.service.getDbCollection('Priority').map(function (data) { return data.map(function (item, index) {
            if (_this.item.data.Priority === item.Id) {
                _this.dropdownlistPriorityDropDown.index = index;
            }
            _this.dropdownlistPriorityDropDown.itemsIndicators.push(item.Id);
            return item.Name;
        }); });
        this.dropdownlistSpaceDropDown.items$ = this.service.getDbCollection('Space').map(function (data) { return data.map(function (item, index) {
            if (_this.item.data.Space === item.Id) {
                _this.dropdownlistSpaceDropDown.index = index;
            }
            _this.dropdownlistSpaceDropDown.itemsIndicators.push(item.Id);
            return item.CodeName;
        }); });
        this.dropdownlistBuildingDropDown.items$ = this.service.getDbCollection('Building').map(function (data) { return data.map(function (item, index) {
            if (_this.item.data.Building === item.Id) {
                _this.dropdownlistBuildingDropDown.index = index;
            }
            _this.dropdownlistBuildingDropDown.itemsIndicators.push(item.Id);
            return item.Name;
        }); });
    };
    RequestViewAddComponent.prototype.onAdd = function () {
        this.add.emit({
            item: this.item
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], RequestViewAddComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "add", void 0);
    __decorate([
        core_1.ViewChild("emailNotification"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "emailNotificationInst", void 0);
    __decorate([
        core_1.ViewChild("dropdownlistJobType"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "dropdownlistJobTypeInst", void 0);
    __decorate([
        core_1.ViewChild("dropdownlistPriority"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "dropdownlistPriorityInst", void 0);
    __decorate([
        core_1.ViewChild("accessArrangements"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "accessArrangementsInst", void 0);
    __decorate([
        core_1.ViewChild("actionRequired"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "actionRequiredInst", void 0);
    __decorate([
        core_1.ViewChild("description"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "descriptionInst", void 0);
    __decorate([
        core_1.ViewChild("dropdownlistSpace"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "dropdownlistSpaceInst", void 0);
    __decorate([
        core_1.ViewChild("dropdownlistBuilding"), 
        __metadata('design:type', Object)
    ], RequestViewAddComponent.prototype, "dropdownlistBuildingInst", void 0);
    RequestViewAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-requestView-add",
            templateUrl: "requestView-add.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], RequestViewAddComponent);
    return RequestViewAddComponent;
}());
exports.RequestViewAddComponent = RequestViewAddComponent;
