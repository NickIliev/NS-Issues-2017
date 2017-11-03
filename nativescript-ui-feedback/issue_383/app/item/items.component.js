"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var autocomplete_1 = require("nativescript-pro-ui/autocomplete");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function ItemsComponent(itemService, router) {
        this.itemService = itemService;
        this.router = router;
    }
    Object.defineProperty(ItemsComponent.prototype, "footballers", {
        get: function () {
            return this._footballers;
        },
        enumerable: true,
        configurable: true
    });
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
        this.initAutocompleteItems();
    };
    ItemsComponent.prototype.onDidAutoComplete = function (args) {
        var id = this.items.find(function (f) { return f.name === args.text; }).id;
        this.router.navigate(["/item", id]);
    };
    ItemsComponent.prototype.initAutocompleteItems = function () {
        this._footballers = new observable_array_1.ObservableArray();
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var fb = _a[_i];
            this._footballers.push(new autocomplete_1.TokenModel(fb.name, undefined));
        }
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService, router_1.RouterExtensions])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCxpRUFBcUY7QUFDckYsMkVBQXlFO0FBR3pFLCtDQUE2QztBQU83QztJQVNJLDZJQUE2STtJQUM3SSxpSEFBaUg7SUFDakgsd0JBQW9CLFdBQXdCLEVBQVUsTUFBd0I7UUFBMUQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFJLENBQUM7SUFObkYsc0JBQUksdUNBQVc7YUFBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBTUQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsMENBQWlCLEdBQWpCLFVBQWtCLElBQTJCO1FBQ3pDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLDhDQUFxQixHQUE3QjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxrQ0FBZSxFQUFjLENBQUM7UUFFdEQsR0FBRyxDQUFDLENBQWEsVUFBVSxFQUFWLEtBQUEsSUFBSSxDQUFDLEtBQUssRUFBVixjQUFVLEVBQVYsSUFBVTtZQUF0QixJQUFNLEVBQUUsU0FBQTtZQUNULElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBN0JRLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBWW1DLDBCQUFXLEVBQWtCLHlCQUFnQjtPQVhyRSxjQUFjLENBOEIxQjtJQUFELHFCQUFDO0NBQUEsQUE5QkQsSUE4QkM7QUE5Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlRXZlbnREYXRhLCBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpdGVtczogSXRlbVtdO1xuXG4gICAgcHJpdmF0ZSBfZm9vdGJhbGxlcnM6IE9ic2VydmFibGVBcnJheTxUb2tlbk1vZGVsPjtcblxuICAgIGdldCBmb290YmFsbGVycygpOiBPYnNlcnZhYmxlQXJyYXk8VG9rZW5Nb2RlbD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9vdGJhbGxlcnM7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy4oCZcyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw4oCZcyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgICAgICB0aGlzLmluaXRBdXRvY29tcGxldGVJdGVtcygpO1xuICAgIH1cblxuICAgIG9uRGlkQXV0b0NvbXBsZXRlKGFyZ3M6IEF1dG9Db21wbGV0ZUV2ZW50RGF0YSkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuaXRlbXMuZmluZCgoZikgPT4gZi5uYW1lID09PSBhcmdzLnRleHQpLmlkO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvaXRlbVwiLCBpZF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEF1dG9jb21wbGV0ZUl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9mb290YmFsbGVycyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8VG9rZW5Nb2RlbD4oKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZiIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zvb3RiYWxsZXJzLnB1c2gobmV3IFRva2VuTW9kZWwoZmIubmFtZSwgdW5kZWZpbmVkKSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19