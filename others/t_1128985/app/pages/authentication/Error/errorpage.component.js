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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JwYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9ycGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsMENBQXlDO0FBRXpDLHNEQUErRDtBQU8vRCxJQUFhLGtCQUFrQjtJQUUxQiw0QkFBMkIsTUFBYyxFQUFXLGdCQUFrQztRQUEzRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVcscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUR2RixVQUFLLEdBQVcsZ0JBQWdCLENBQUM7SUFDMkQsQ0FBQztJQUN0RixtQ0FBTSxHQUFiO1FBQ0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksa0JBQWtCO0lBTDlCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUN2QyxDQUFDO3FDQUdzQyxlQUFNLEVBQTZCLHlCQUFnQjtHQUY5RSxrQkFBa0IsQ0FNOUI7QUFOWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9lcnJvcnBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4uL2F1dGhlbnRpY2F0aW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvclBhZ2VDb21wb25lbnQge1xuICAgIHRpdGxlOiBzdHJpbmcgPSBcIkF1dGhlbnRpY2F0aW9uXCI7XG4gICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCApIHt9XG4gICAgcHVibGljIGdvQmFjaygpIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICB9XG59Il19