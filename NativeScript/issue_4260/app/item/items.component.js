"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.searchBarLoaded = function (args) {
        var searchbar = args.object;
        console.log("searchBarLoaded");
    };
    ItemsComponent.prototype.onSubmit = function (args) {
        var searchbar = args.object;
        console.log("onSubmit");
        searchbar.dismissSoftInput();
    };
    ItemsComponent.prototype.searchBarTextChanged = function (args) {
        var searchbar = args.object;
        console.log("searchBarTextChanged: " + searchbar.text);
        if (searchbar.text != "") {
            this.searchPhrase = searchbar.text;
            this.beginSearch();
        }
        else {
            setTimeout(function () {
                searchbar.dismissSoftInput();
            }, 300);
        }
    };
    ItemsComponent.prototype.beginSearch = function () {
        // filter items list here
    };
    ItemsComponent.prototype.onClear = function (args) {
        var searchbar = args.object;
        console.log("onClear");
        searchbar.dismissSoftInput();
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQVU3QyxJQUFhLGNBQWM7SUFJdkIsd0JBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF1QixJQUFJO1FBQ3ZCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxpQ0FBUSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSw2Q0FBb0IsR0FBM0IsVUFBNEIsSUFBSTtRQUM1QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFVBQVUsQ0FBQztnQkFDUCxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNqQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDO0lBQ0wsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQ0kseUJBQXlCO0lBQzdCLENBQUM7SUFFTSxnQ0FBTyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBaERELElBZ0RDO0FBaERZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7cUNBS21DLDBCQUFXO0dBSm5DLGNBQWMsQ0FnRDFCO0FBaERZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24gfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaXRlbXM6IEl0ZW1bXTtcbiAgICBzZWFyY2hQaHJhc2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWFyY2hCYXJMb2FkZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoYmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoQmFyTG9hZGVkXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblN1Ym1pdChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hiYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25TdWJtaXRcIik7XG4gICAgICAgIHNlYXJjaGJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlYXJjaEJhclRleHRDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaGJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2hCYXJUZXh0Q2hhbmdlZDogXCIgKyBzZWFyY2hiYXIudGV4dCk7XG5cbiAgICAgICAgaWYgKHNlYXJjaGJhci50ZXh0ICE9IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGhyYXNlID0gc2VhcmNoYmFyLnRleHQ7XG4gICAgICAgICAgICB0aGlzLmJlZ2luU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlYXJjaGJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJlZ2luU2VhcmNoKCkge1xuICAgICAgICAvLyBmaWx0ZXIgaXRlbXMgbGlzdCBoZXJlXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoYmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQ2xlYXJcIik7XG4gICAgICAgIHNlYXJjaGJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgfVxufVxuIl19