"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var MainPageInnerComponent = (function () {
    function MainPageInnerComponent(page) {
        this.page = page;
    }
    MainPageInnerComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    return MainPageInnerComponent;
}());
MainPageInnerComponent = __decorate([
    core_1.Component({
        selector: 'app-main-page-inner',
        templateUrl: 'pages/main-page/main-page-inner/main-page-inner.html',
        styleUrls: ['pages/main-page/main-page-inner/main-page-inner-common.css'],
    }),
    __metadata("design:paramtypes", [page_1.Page])
], MainPageInnerComponent);
exports.MainPageInnerComponent = MainPageInnerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLWlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS1pbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsZ0NBQStCO0FBUS9CLElBQWEsc0JBQXNCO0lBQ2pDLGdDQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFJLENBQUM7SUFFbkMseUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLHNCQUFzQjtJQU5sQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixXQUFXLEVBQUUsc0RBQXNEO1FBQ25FLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO0tBQzFFLENBQUM7cUNBRzBCLFdBQUk7R0FEbkIsc0JBQXNCLENBTWxDO0FBTlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1haW4tcGFnZS1pbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvbWFpbi1wYWdlL21haW4tcGFnZS1pbm5lci9tYWluLXBhZ2UtaW5uZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9tYWluLXBhZ2UvbWFpbi1wYWdlLWlubmVyL21haW4tcGFnZS1pbm5lci1jb21tb24uY3NzJ10sXG59KVxuXG5leHBvcnQgY2xhc3MgTWFpblBhZ2VJbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cbn0iXX0=