"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var SpaceViewDetailComponent = (function () {
    function SpaceViewDetailComponent() {
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(SpaceViewDetailComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    SpaceViewDetailComponent.prototype.onEdit = function () {
        this.navigate.emit();
    };
    /// partial additional methods
    // START_CUSTOM_CODE_spaceViewModelDetailComponentAdditionalMethods
    SpaceViewDetailComponent.prototype.onIndexChanged = function (event) {
        //this.filterChanged.emit(event);
    };
    SpaceViewDetailComponent.prototype.onNewRequest = function (event) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceViewDetailComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SpaceViewDetailComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceViewDetailComponent.prototype, "navigate", void 0);
    SpaceViewDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-spaceView-detail",
            templateUrl: "spaceView-detail.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceViewDetailComponent);
    return SpaceViewDetailComponent;
}());
exports.SpaceViewDetailComponent = SpaceViewDetailComponent;
//# sourceMappingURL=spaceView-detail.component.js.map