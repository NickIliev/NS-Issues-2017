"use strict";
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var enums_1 = require("ui/enums");
var shared = require("../../../../shared");
var RequestViewAddComponent = (function () {
    // END: fields for longListPicker
    function RequestViewAddComponent() {
        /// placeholder for component constructor
        this.add = new core_1.EventEmitter();
        /// placeholder for field
        // START: fields for longListPicker
        this.showingLongListPicker = false;
        this.unfilteredItemsToShow = [];
        this.itemsToShow = [];
        this.selectedSite = '';
        this.selectedBuilding = '';
        this.selectedSpace = '';
        this.selectedPriority = '';
        this.selectedJobType = '';
        this.siteMap = {};
        this.buildingMap = {};
        this.spaceMap = {};
        this.priorityMap = {};
        this.jobTypeMap = {};
        this.listSites = [];
        this.listBuildings = [];
        this.listSpaces = [];
        this.listPriority = [];
        this.listJobType = [];
    }
    Object.defineProperty(RequestViewAddComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    RequestViewAddComponent.prototype.ngOnInit = function () {
        /// placeholder for component init
        var _this = this;
        this.item.data["Site"] = this.service.currentUser.DefaultSite;
        this.item.data["Building"] = this.service.currentUser.DefaultBuilding;
        this.populateSitesList();
        this.populateBuildingsList();
        this.populateSpacesList();
        this.service.getDbCollection('Priority').subscribe(function (items) {
            items.sort(_this.sortDisplayOrder);
            items.forEach(function (item) {
                _this.priorityMap[item.Name] = item.Id;
                _this.listPriority.push(item.Name);
                if (item.Id == _this.item.data.Priority) {
                    _this.selectedPriority = item.Name;
                    setTimeout(function () { }, 0);
                }
            });
        });
        this.service.getDbCollection('JobType').subscribe(function (items) {
            items.forEach(function (item) {
                _this.jobTypeMap[item.Name] = item.Id;
                _this.listJobType.push(item.Name);
                if (item.Id == _this.item.data.JobType) {
                    _this.selectedJobType = item.Name;
                    setTimeout(function () { }, 0);
                }
            });
            _this.listJobType.sort();
        });
        this.item.data["Establishment"] = this.service.currentUser.Establishment;
        this.item.data["RequestOriginator"] = this.service.currentUser.Id;
        this.item.data["EmailNotificationEnabled"] = true;
        this.item.data["LoggedAt"] = new Date();
        this.item.data["Status"] = shared.RequestStatuses.Entered;
    };
    RequestViewAddComponent.prototype.populateSitesList = function () {
        var _this = this;
        this.listSites = [];
        this.service.getDbCollection('Site').subscribe(function (items) {
            items.forEach(function (item) {
                _this.siteMap[item.Name] = item.Id;
                _this.listSites.push(item.Name);
                if (item.Id == _this.item.data.Site) {
                    _this.selectedSite = item.Name;
                    setTimeout(function () { }, 0);
                }
            });
            _this.listSites.sort();
        });
    };
    RequestViewAddComponent.prototype.populateBuildingsList = function () {
        var _this = this;
        this.listBuildings = [];
        var buildingFilter = this.service.buildFilterEquals("Site", this.item.data.Site);
        this.service.getDbCollection('Building', buildingFilter).subscribe(function (items) {
            items.forEach(function (item) {
                _this.buildingMap[item.Name] = item.Id;
                _this.listBuildings.push(item.Name);
                if (item.Id == _this.item.data.Building) {
                    _this.selectedBuilding = item.Name;
                    setTimeout(function () { }, 0);
                }
            });
            _this.listBuildings.sort();
        });
    };
    RequestViewAddComponent.prototype.populateSpacesList = function () {
        var _this = this;
        this.listSpaces = [];
        var spaceFilter = this.service.buildFilterEquals("Building", this.item.data.Building);
        this.service.getDbCollection('Space', spaceFilter).subscribe(function (items) {
            items.forEach(function (item) {
                _this.spaceMap[item.CodeName] = item.Id;
                _this.listSpaces.push(item.CodeName);
                if (item.Id == _this.item.data.Space) {
                    _this.selectedSpace = item.CodeName;
                    setTimeout(function () { }, 0);
                }
            });
            _this.listSpaces.sort();
        });
    };
    RequestViewAddComponent.prototype.onAdd = function () {
        this.add.emit({
            item: this.item
        });
    };
    /// partial additional methods
    RequestViewAddComponent.prototype.sortName = function (a, b) {
        var x = a.Name.toLowerCase();
        var y = b.Name.toLowerCase();
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    };
    RequestViewAddComponent.prototype.sortCodeName = function (a, b) {
        var x = a.CodeName.toLowerCase();
        var y = b.CodeName.toLowerCase();
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    };
    RequestViewAddComponent.prototype.sortDisplayOrder = function (a, b) {
        return a.DisplayOrder - b.DisplayOrder;
    };
    // START: LongListPicker
    RequestViewAddComponent.prototype.showSites = function () {
        this.animateLongListPicker('sites');
        this.itemsToShow = this.listSites;
        this.unfilteredItemsToShow = this.listSites;
    };
    RequestViewAddComponent.prototype.showBuildings = function () {
        this.animateLongListPicker('buildings');
        this.itemsToShow = this.listBuildings;
        this.unfilteredItemsToShow = this.listBuildings;
    };
    RequestViewAddComponent.prototype.showSpaces = function () {
        this.animateLongListPicker('spaces');
        this.itemsToShow = this.listSpaces;
        this.unfilteredItemsToShow = this.listSpaces;
    };
    RequestViewAddComponent.prototype.showPriority = function () {
        this.animateLongListPicker('priority');
        this.itemsToShow = this.listPriority;
        this.unfilteredItemsToShow = this.listPriority;
    };
    RequestViewAddComponent.prototype.showJobType = function () {
        this.animateLongListPicker('jobType');
        this.itemsToShow = this.listJobType;
        this.unfilteredItemsToShow = this.listJobType;
    };
    RequestViewAddComponent.prototype.filterLongList = function () {
        var _this = this;
        this.itemsToShow = this.unfilteredItemsToShow.filter(function (item) {
            return item.toLowerCase().indexOf(_this.filterItem.toLowerCase()) !== -1;
        });
    };
    RequestViewAddComponent.prototype.animateLongListPicker = function (type) {
        this.showingLongListPicker = type;
        this.longListPickerDimmer.nativeElement.opacity = 0;
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 1,
            duration: 200
        });
        this.longListPickerContainer.nativeElement.opacity = 1;
        this.longListPickerContainer.nativeElement.scaleX = .7;
        this.longListPickerContainer.nativeElement.scaleY = .7;
        this.longListPickerContainer.nativeElement.animate({
            opacity: 1,
            scale: { x: 1, y: 1 },
            duration: 400,
            curve: enums_1.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    };
    RequestViewAddComponent.prototype.chooseLongList = function (event) {
        this.filterItem = '';
        if (this.showingLongListPicker == 'sites') {
            this.selectedSite = this.itemsToShow[event.index];
            this.item.data.Site = this.siteMap[this.selectedSite];
            this.selectedBuilding = '';
            this.item.data.Building = 0;
            this.selectedSpace = '';
            this.item.data.Space = 0;
            this.populateBuildingsList();
        }
        else if (this.showingLongListPicker == 'buildings') {
            this.selectedBuilding = this.itemsToShow[event.index];
            this.item.data.Building = this.buildingMap[this.selectedBuilding];
            this.selectedSpace = '';
            this.populateSpacesList();
        }
        else if (this.showingLongListPicker == 'spaces') {
            this.selectedSpace = this.itemsToShow[event.index];
            this.item.data.Space = this.spaceMap[this.selectedSpace];
        }
        else if (this.showingLongListPicker == 'priority') {
            this.selectedPriority = this.itemsToShow[event.index];
            this.item.data.Priority = this.priorityMap[this.selectedPriority];
        }
        else if (this.showingLongListPicker == 'jobType') {
            this.selectedJobType = this.itemsToShow[event.index];
            this.item.data.JobType = this.jobTypeMap[this.selectedJobType];
        }
        this.closeLongListPicker();
    };
    RequestViewAddComponent.prototype.closeLongListPicker = function () {
        var _this = this;
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 0,
            duration: 200
        });
        this.longListPickerContainer.nativeElement.animate({
            opacity: 0,
            scale: { x: .7, y: .7 },
            duration: 300,
            curve: enums_1.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(function () {
            _this.showingLongListPicker = false;
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
        core_1.ViewChild("longListPickerContainer"), 
        __metadata('design:type', core_2.ElementRef)
    ], RequestViewAddComponent.prototype, "longListPickerContainer", void 0);
    __decorate([
        core_1.ViewChild("longListPickerDimmer"), 
        __metadata('design:type', core_2.ElementRef)
    ], RequestViewAddComponent.prototype, "longListPickerDimmer", void 0);
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
//# sourceMappingURL=requestView-add.component.js.map