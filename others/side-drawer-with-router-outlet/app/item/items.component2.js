"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ItemsComponent2 = (function () {
    function ItemsComponent2(router) {
        this.router = router;
    }
    ItemsComponent2.prototype.onTap = function () {
        console.log("back button tap");
        this.router.back();
    };
    return ItemsComponent2;
}());
ItemsComponent2 = __decorate([
    core_1.Component({
        selector: "ns-items2",
        moduleId: module.id,
        templateUrl: "./items.component2.html",
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions])
], ItemsComponent2);
exports.ItemsComponent2 = ItemsComponent2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50Mi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZW1zLmNvbXBvbmVudDIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQThEO0FBUzlELElBQWEsZUFBZTtJQUd4Qix5QkFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBSSxDQUFDO0lBQ2pELCtCQUFLLEdBQUw7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLGVBQWU7SUFMM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUseUJBQXlCO0tBQ3pDLENBQUM7cUNBSThCLHlCQUFnQjtHQUhuQyxlQUFlLENBUTNCO0FBUlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXMyXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudDIuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudDIge1xuICAgIGl0ZW1zOiBJdGVtW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucykgeyB9XG4gICAgb25UYXAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmFjayBidXR0b24gdGFwXCIpO1xuICAgICAgICB0aGlzLnJvdXRlci5iYWNrKCk7XG4gICAgfVxufVxuIl19