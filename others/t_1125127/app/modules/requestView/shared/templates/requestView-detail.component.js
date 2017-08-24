"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var RequestViewDetailComponent = (function () {
    function RequestViewDetailComponent() {
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(RequestViewDetailComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    RequestViewDetailComponent.prototype.onEdit = function () {
        this.navigate.emit();
    };
    Object.defineProperty(RequestViewDetailComponent.prototype, "statusName", {
        /// partial additional methods
        // START_CUSTOM_CODE_requestViewModelDetailComponentAdditionalMethods
        get: function () {
            var result = "";
            // let current: shared.Item = this.item.getValue();
            result = shared.RequestStatuses[this.item.data.Status] + "\0";
            return result;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RequestViewDetailComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], RequestViewDetailComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewDetailComponent.prototype, "navigate", void 0);
    RequestViewDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-requestView-detail",
            templateUrl: "requestView-detail.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], RequestViewDetailComponent);
    return RequestViewDetailComponent;
}());
exports.RequestViewDetailComponent = RequestViewDetailComponent;
//# sourceMappingURL=requestView-detail.component.js.map