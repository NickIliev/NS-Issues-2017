"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.prices = { "price": 3 };
        this.currencyConverter = new CurrencyConverter(2);
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
var CurrencyConverter = (function () {
    function CurrencyConverter(input) {
    }
    CurrencyConverter.prototype.convertFrom = function (input) {
        console.log(input * 4);
        return input * 4;
    };
    CurrencyConverter.prototype.convertTo = function (input) {
        console.log(input * 2);
        return input * 2;
    };
    return CurrencyConverter;
}());
exports.CurrencyConverter = CurrencyConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVM3QztJQUtJLHdCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFakQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQVZRLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBTW1DLDBCQUFXO09BTG5DLGNBQWMsQ0FXMUI7SUFBRCxxQkFBQztDQUFBLEFBWEQsSUFXQztBQVhZLHdDQUFjO0FBYTNCO0lBQ0ksMkJBQVksS0FBYTtJQUFJLENBQUM7SUFFOUIsdUNBQVcsR0FBWCxVQUFZLEtBQWE7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELHFDQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgUHJvcGVydHlDb252ZXJ0ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9kYXRhZm9ybVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjdXJyZW5jeUNvbnZlcnRlcjogYW55O1xuICAgIHByaWNlczogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJpY2VzID0ge1wicHJpY2VcIjogM307XG4gICAgICAgIHRoaXMuY3VycmVuY3lDb252ZXJ0ZXIgPSBuZXcgQ3VycmVuY3lDb252ZXJ0ZXIoMik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lDb252ZXJ0ZXIgaW1wbGVtZW50cyBQcm9wZXJ0eUNvbnZlcnRlciB7XG4gICAgY29uc3RydWN0b3IoaW5wdXQ6IG51bWJlcikgeyB9XG5cbiAgICBjb252ZXJ0RnJvbShpbnB1dDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlucHV0ICogNCk7XG4gICAgICAgIHJldHVybiBpbnB1dCAqIDQ7XG4gICAgfVxuXG4gICAgY29udmVydFRvKGlucHV0OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQgKiAyKTtcbiAgICAgICAgcmV0dXJuIGlucHV0ICogMjtcbiAgICB9XG59Il19