"use strict";
var core_1 = require("@angular/core");
var AssetViewListComponent = (function () {
    function AssetViewListComponent() {
        this.select = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
        this.loadMore = new core_1.EventEmitter();
    }
    /// Add fields instance
    AssetViewListComponent.prototype.onSelect = function (item) {
        this.select.emit({
            item: item
        });
    };
    AssetViewListComponent.prototype.onAdd = function () {
        this.navigate.emit();
    };
    /// partial additional methods
    AssetViewListComponent.prototype.onLoadMoreItemsRequested = function (event) {
        this.loadMore.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssetViewListComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssetViewListComponent.prototype, "items", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssetViewListComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssetViewListComponent.prototype, "navigate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssetViewListComponent.prototype, "loadMore", void 0);
    AssetViewListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-assetView-list",
            templateUrl: "assetView-list.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AssetViewListComponent);
    return AssetViewListComponent;
}());
exports.AssetViewListComponent = AssetViewListComponent;
//# sourceMappingURL=assetView-list.component.js.map