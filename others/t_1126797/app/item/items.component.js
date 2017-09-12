"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var builder_1 = require("ui/builder");
var ItemsComponent = (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function ItemsComponent(page) {
        this.page = page;
    }
    ItemsComponent.prototype.ngAfterViewInit = function () {
        this.stack = this.page.getViewById("container");
        console.log(this.stack);
        console.log('before');
        var view = builder_1.parse('<AbsoluteLayout><Label text="TESTING"></Label></AbsoluteLayout>');
        console.log('after');
        this.stack.addChild(view);
    };
    ItemsComponent.prototype.addView = function () {
        console.log('before');
        var view = builder_1.parse('<AbsoluteLayout><Label text="TESTING"></Label></AbsoluteLayout>');
        console.log('after');
        this.stack.addChild(view);
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBRTFDLGdDQUErQjtBQUUvQixzQ0FBbUM7QUFPbkM7SUFHSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2pILHdCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUU3QixDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUNHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFNLElBQUksR0FBRyxlQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztRQUN0RixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRixnQ0FBTyxHQUFQO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFNLElBQUksR0FBRyxlQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztRQUN0RixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUExQlEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FNNEIsV0FBSTtPQUxyQixjQUFjLENBMkIxQjtJQUFELHFCQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJ1aS9idWlsZGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IHtcbiAgICBzdGFjazogU3RhY2tMYXlvdXQ7XG5cbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLigJlzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDigJlzIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcblxuICAgICB9XG5cbiAgICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnN0YWNrID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiY29udGFpbmVyXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YWNrKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnYmVmb3JlJyk7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBwYXJzZSgnPEFic29sdXRlTGF5b3V0PjxMYWJlbCB0ZXh0PVwiVEVTVElOR1wiPjwvTGFiZWw+PC9BYnNvbHV0ZUxheW91dD4nKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyJyk7XG5cbiAgICAgICAgdGhpcy5zdGFjay5hZGRDaGlsZCh2aWV3KTtcbiAgICAgfVxuXG4gICAgYWRkVmlldygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2JlZm9yZScpO1xuICAgICAgICBjb25zdCB2aWV3ID0gcGFyc2UoJzxBYnNvbHV0ZUxheW91dD48TGFiZWwgdGV4dD1cIlRFU1RJTkdcIj48L0xhYmVsPjwvQWJzb2x1dGVMYXlvdXQ+Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZnRlcicpO1xuXG4gICAgICAgIHRoaXMuc3RhY2suYWRkQ2hpbGQodmlldyk7XG4gICAgfVxufSJdfQ==