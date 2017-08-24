"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var NotificationViewDetailComponent = (function () {
    function NotificationViewDetailComponent() {
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(NotificationViewDetailComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    NotificationViewDetailComponent.prototype.onEdit = function () {
        this.navigate.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NotificationViewDetailComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], NotificationViewDetailComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NotificationViewDetailComponent.prototype, "navigate", void 0);
    NotificationViewDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-notificationView-detail",
            templateUrl: "notificationView-detail.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationViewDetailComponent);
    return NotificationViewDetailComponent;
}());
exports.NotificationViewDetailComponent = NotificationViewDetailComponent;
//# sourceMappingURL=notificationView-detail.component.js.map