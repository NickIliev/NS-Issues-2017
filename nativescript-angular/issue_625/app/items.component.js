"use strict";
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.listview = this.lv.nativeElement;
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.scrollToBottom = function () {
        this.listview.scrollToIndex(this.items.length - 1);
    };
    __decorate([
        core_1.ViewChild("listview"), 
        __metadata('design:type', core_1.ElementRef)
    ], ItemsComponent.prototype, "lv", void 0);
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            templateUrl: "items.component.html",
        }), 
        __metadata('design:paramtypes', [item_service_1.ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=items.component.js.map