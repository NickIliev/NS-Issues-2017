"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var RequestViewEditComponent = (function () {
    /// placeholder for field
    function RequestViewEditComponent() {
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
        /// placeholder for component constructor
    }
    Object.defineProperty(RequestViewEditComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    RequestViewEditComponent.prototype.ngOnInit = function () {
        /// placeholder for component init
    };
    RequestViewEditComponent.prototype.onUpdate = function () {
        this.update.emit({
            item: this.item
        });
    };
    RequestViewEditComponent.prototype.onDelete = function () {
        this.delete.emit({
            item: this.item
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RequestViewEditComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], RequestViewEditComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewEditComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewEditComponent.prototype, "delete", void 0);
    RequestViewEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-requestView-edit",
            templateUrl: "requestView-edit.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], RequestViewEditComponent);
    return RequestViewEditComponent;
}());
exports.RequestViewEditComponent = RequestViewEditComponent;
//# sourceMappingURL=requestView-edit.component.js.map