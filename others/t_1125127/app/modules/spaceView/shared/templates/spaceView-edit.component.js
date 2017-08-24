"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var SpaceViewEditComponent = (function () {
    /// placeholder for field
    function SpaceViewEditComponent() {
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
        /// placeholder for component constructor
    }
    Object.defineProperty(SpaceViewEditComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    SpaceViewEditComponent.prototype.ngOnInit = function () {
        /// placeholder for component init
    };
    SpaceViewEditComponent.prototype.onUpdate = function () {
        this.update.emit({
            item: this.item
        });
    };
    SpaceViewEditComponent.prototype.onDelete = function () {
        this.delete.emit({
            item: this.item
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceViewEditComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SpaceViewEditComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceViewEditComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceViewEditComponent.prototype, "delete", void 0);
    SpaceViewEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-spaceView-edit",
            templateUrl: "spaceView-edit.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceViewEditComponent);
    return SpaceViewEditComponent;
}());
exports.SpaceViewEditComponent = SpaceViewEditComponent;
//# sourceMappingURL=spaceView-edit.component.js.map