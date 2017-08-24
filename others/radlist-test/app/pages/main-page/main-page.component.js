"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var MainPageComponent = (function () {
    function MainPageComponent(page) {
        this.page = page;
    }
    MainPageComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    return MainPageComponent;
}());
MainPageComponent = __decorate([
    core_1.Component({
        selector: 'app-main-page',
        templateUrl: 'pages/main-page/main-page.html',
        styleUrls: ['pages/main-page/main-page-common.css'],
    }),
    __metadata("design:paramtypes", [page_1.Page])
], MainPageComponent);
exports.MainPageComponent = MainPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsZ0NBQStCO0FBUS9CLElBQWEsaUJBQWlCO0lBQzVCLDJCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFJLENBQUM7SUFFbkMsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGlCQUFpQjtJQU43QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGVBQWU7UUFDekIsV0FBVyxFQUFFLGdDQUFnQztRQUM3QyxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztLQUNwRCxDQUFDO3FDQUcwQixXQUFJO0dBRG5CLGlCQUFpQixDQU03QjtBQU5ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tYWluLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL21haW4tcGFnZS9tYWluLXBhZ2UuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9tYWluLXBhZ2UvbWFpbi1wYWdlLWNvbW1vbi5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBNYWluUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cbn0iXX0=