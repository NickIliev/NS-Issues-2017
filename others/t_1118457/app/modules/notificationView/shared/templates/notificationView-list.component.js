"use strict";
var core_1 = require("@angular/core");
var NotificationViewListComponent = (function () {
    function NotificationViewListComponent() {
        this.select = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
    }
    /// Add fields instance
    NotificationViewListComponent.prototype.onSelect = function (item) {
        this.select.emit({
            item: item
        });
    };
    NotificationViewListComponent.prototype.onAdd = function () {
        this.navigate.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NotificationViewListComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NotificationViewListComponent.prototype, "items", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NotificationViewListComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NotificationViewListComponent.prototype, "navigate", void 0);
    NotificationViewListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-notificationView-list",
            templateUrl: "notificationView-list.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationViewListComponent);
    return NotificationViewListComponent;
}());
exports.NotificationViewListComponent = NotificationViewListComponent;
