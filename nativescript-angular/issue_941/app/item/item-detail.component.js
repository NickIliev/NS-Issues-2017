"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var item_service_1 = require("./item.service");
require("rxjs/add/operator/map");
var ItemDetailComponent = (function () {
    function ItemDetailComponent(itemService, route, routerExtensions) {
        this.itemService = itemService;
        this.route = route;
        this.routerExtensions = routerExtensions;
    }
    ItemDetailComponent.prototype.ngOnInit = function () {
        // const id = +this.route.snapshot.params["id"];
        // this.item = this.itemService.getItem(id);
        var _this = this;
        this.route.params
            .map(function (params) { return _this.itemService.getItem(+params["id"]); })
            .subscribe(function (item) { return _this.item = item; });
    };
    ItemDetailComponent.prototype.goToItemThree = function () {
        console.log("goToNextItem");
        this.routerExtensions.navigate(['/item', 3]);
    };
    ItemDetailComponent.prototype.backToPrevious = function () {
        this.routerExtensions.backToPreviousPage();
    };
    ItemDetailComponent.prototype.back = function () {
        this.routerExtensions.back();
    };
    ItemDetailComponent = __decorate([
        core_1.Component({
            selector: "ns-details",
            moduleId: module.id,
            templateUrl: "./item-detail.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            router_1.ActivatedRoute, router_2.RouterExtensions])
    ], ItemDetailComponent);
    return ItemDetailComponent;
}());
exports.ItemDetailComponent = ItemDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUVqRCxzREFBK0Q7QUFFL0QsK0NBQTZDO0FBRTdDLGlDQUErQjtBQU8vQjtJQUdJLDZCQUNZLFdBQXdCLEVBQ3hCLEtBQXFCLEVBQVUsZ0JBQWtDO1FBRGpFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN6RSxDQUFDO0lBRUwsc0NBQVEsR0FBUjtRQUNJLGdEQUFnRDtRQUNoRCw0Q0FBNEM7UUFGaEQsaUJBT0M7UUFIRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07YUFDaEIsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQzthQUN0RCxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDRDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsa0NBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBNUJRLG1CQUFtQjtRQUwvQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7U0FDOUMsQ0FBQzt5Q0FLMkIsMEJBQVc7WUFDakIsdUJBQWMsRUFBNEIseUJBQWdCO09BTHBFLG1CQUFtQixDQTZCL0I7SUFBRCwwQkFBQztDQUFBLEFBN0JELElBNkJDO0FBN0JZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1kZXRhaWxzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW0tZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW06IEl0ZW07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnNcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XG4gICAgICAgIC8vIHRoaXMuaXRlbSA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbShpZCk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXNcbiAgICAgICAgLm1hcChwYXJhbXMgPT4gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtKCtwYXJhbXNbXCJpZFwiXSkpXG4gICAgICAgIC5zdWJzY3JpYmUoaXRlbSA9PiB0aGlzLml0ZW0gPSBpdGVtKTtcbiAgICB9XG5cbiAgICBnb1RvSXRlbVRocmVlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdvVG9OZXh0SXRlbVwiKTtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2l0ZW0nLCAzXSk7XG4gICAgfVxuXG4gICAgYmFja1RvUHJldmlvdXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbn1cbiJdfQ==