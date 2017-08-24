"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var AssetViewDetailComponent = (function () {
    function AssetViewDetailComponent() {
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(AssetViewDetailComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    AssetViewDetailComponent.prototype.onEdit = function () {
        this.navigate.emit();
    };
    /// partial additional methods
    // START_CUSTOM_CODE_assetViewModelDetailComponentAdditionalMethods
    AssetViewDetailComponent.prototype.onIndexChanged = function (event) {
        //this.filterChanged.emit(event);
    };
    AssetViewDetailComponent.prototype.onNewRequest = function (event) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssetViewDetailComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AssetViewDetailComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssetViewDetailComponent.prototype, "navigate", void 0);
    AssetViewDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-assetView-detail",
            templateUrl: "assetView-detail.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AssetViewDetailComponent);
    return AssetViewDetailComponent;
}());
exports.AssetViewDetailComponent = AssetViewDetailComponent;
//# sourceMappingURL=assetView-detail.component.js.map