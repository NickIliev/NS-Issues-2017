"use strict";
var core_1 = require("@angular/core");
var RequestViewListComponent = (function () {
    function RequestViewListComponent() {
        this.select = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
        this.loadMore = new core_1.EventEmitter();
        this.filterChanged = new core_1.EventEmitter();
    }
    /// Add fields instance
    RequestViewListComponent.prototype.onSelect = function (item) {
        this.select.emit({
            item: item
        });
    };
    RequestViewListComponent.prototype.onAdd = function () {
        this.navigate.emit();
    };
    /// partial additional methods
    RequestViewListComponent.prototype.onLoadMoreItemsRequested = function (event) {
        this.loadMore.emit(event);
    };
    RequestViewListComponent.prototype.onIndexChanged = function (event) {
        this.filterChanged.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RequestViewListComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RequestViewListComponent.prototype, "items", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewListComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewListComponent.prototype, "navigate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewListComponent.prototype, "loadMore", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RequestViewListComponent.prototype, "filterChanged", void 0);
    RequestViewListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-requestView-list",
            templateUrl: "requestView-list.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], RequestViewListComponent);
    return RequestViewListComponent;
}());
exports.RequestViewListComponent = RequestViewListComponent;
