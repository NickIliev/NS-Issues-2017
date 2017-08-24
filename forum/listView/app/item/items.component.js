"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.groceryList = [];
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.groceryList.push({ name: "Apples" });
        this.groceryList.push({ name: "Bananas" });
        this.groceryList.push({ name: "Oranges" });
        console.dir(this.groceryList);
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "list",
        moduleId: module.id,
        templateUrl: "items.component.html",
        styleUrls: ["list-common.css", "list.css"]
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBUXpFLElBQWEsY0FBYztJQU4zQjtRQU9JLGdCQUFXLEdBQWtCLEVBQUUsQ0FBQztJQVFwQyxDQUFDO0lBTkcsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksY0FBYztJQU4xQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxzQkFBc0I7UUFDbkMsU0FBUyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDO0tBQzdDLENBQUM7R0FDVyxjQUFjLENBUzFCO0FBVFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxpc3QtY29tbW9uLmNzc1wiLCBcImxpc3QuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBncm9jZXJ5TGlzdDogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ3JvY2VyeUxpc3QucHVzaCh7IG5hbWU6IFwiQXBwbGVzXCIgfSk7XG4gICAgICAgIHRoaXMuZ3JvY2VyeUxpc3QucHVzaCh7IG5hbWU6IFwiQmFuYW5hc1wiIH0pO1xuICAgICAgICB0aGlzLmdyb2NlcnlMaXN0LnB1c2goeyBuYW1lOiBcIk9yYW5nZXNcIiB9KTtcbiAgICAgICAgY29uc29sZS5kaXIodGhpcy5ncm9jZXJ5TGlzdClcbiAgICB9XG59Il19