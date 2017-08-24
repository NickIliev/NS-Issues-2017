"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var AssetViewEditComponent = (function () {
    /// placeholder for field
    function AssetViewEditComponent() {
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
        /// placeholder for component constructor
    }
    Object.defineProperty(AssetViewEditComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    AssetViewEditComponent.prototype.ngOnInit = function () {
        /// placeholder for component init
    };
    AssetViewEditComponent.prototype.onUpdate = function () {
        this.update.emit({
            item: this.item
        });
    };
    AssetViewEditComponent.prototype.onDelete = function () {
        this.delete.emit({
            item: this.item
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssetViewEditComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AssetViewEditComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssetViewEditComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssetViewEditComponent.prototype, "delete", void 0);
    AssetViewEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-assetView-edit",
            templateUrl: "assetView-edit.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AssetViewEditComponent);
    return AssetViewEditComponent;
}());
exports.AssetViewEditComponent = AssetViewEditComponent;
//# sourceMappingURL=assetView-edit.component.js.map