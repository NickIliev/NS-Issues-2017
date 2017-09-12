"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var ErrorPageComponent = (function () {
    function ErrorPageComponent(router, routerExtensions) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.title = "Authentication";
    }
    ErrorPageComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return ErrorPageComponent;
}());
ErrorPageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./errorpage.component.html",
        styleUrls: ["../authentication.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, router_2.RouterExtensions])
], ErrorPageComponent);
exports.ErrorPageComponent = ErrorPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JwYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9ycGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsMENBQXlDO0FBRXpDLHNEQUErRDtBQU8vRCxJQUFhLGtCQUFrQjtJQUUxQiw0QkFBMkIsTUFBYyxFQUFXLGdCQUFrQztRQUEzRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVcscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUR2RixVQUFLLEdBQVcsZ0JBQWdCLENBQUM7SUFDMkQsQ0FBQztJQUN0RixtQ0FBTSxHQUFiO1FBQ0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksa0JBQWtCO0lBTDlCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUN2QyxDQUFDO3FDQUdzQyxlQUFNLEVBQTZCLHlCQUFnQjtHQUY5RSxrQkFBa0IsQ0FNOUI7QUFOWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZXJyb3JwYWdlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4uL2F1dGhlbnRpY2F0aW9uLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXJyb3JQYWdlQ29tcG9uZW50IHtcclxuICAgIHRpdGxlOiBzdHJpbmcgPSBcIkF1dGhlbnRpY2F0aW9uXCI7XHJcbiAgICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsICkge31cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gIH1cclxufSJdfQ==