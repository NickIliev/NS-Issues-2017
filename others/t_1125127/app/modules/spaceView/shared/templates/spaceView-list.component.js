"use strict";
var core_1 = require("@angular/core");
var SpaceViewListComponent = (function () {
    function SpaceViewListComponent() {
        this.select = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
        this.loadMore = new core_1.EventEmitter();
    }
    /// Add fields instance
    SpaceViewListComponent.prototype.onSelect = function (item) {
        this.select.emit({
            item: item
        });
    };
    SpaceViewListComponent.prototype.onAdd = function () {
        this.navigate.emit();
    };
    /// partial additional methods
    SpaceViewListComponent.prototype.onLoadMoreItemsRequested = function (event) {
        this.loadMore.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceViewListComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceViewListComponent.prototype, "items", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceViewListComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceViewListComponent.prototype, "navigate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceViewListComponent.prototype, "loadMore", void 0);
    SpaceViewListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-spaceView-list",
            templateUrl: "spaceView-list.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceViewListComponent);
    return SpaceViewListComponent;
}());
exports.SpaceViewListComponent = SpaceViewListComponent;
//# sourceMappingURL=spaceView-list.component.js.map