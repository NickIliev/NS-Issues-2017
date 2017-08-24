"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var DrawerComponent = (function () {
    function DrawerComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.navigationItems = [
            {
                title: "Home",
                route: "/home",
                icon: "\uf015"
            },
            {
                title: "Browse",
                route: "/browse",
                icon: "\uf1ea"
            },
            {
                title: "Search",
                route: "/search",
                icon: "\uf002"
            },
            {
                title: "Featured",
                route: "/featured",
                icon: "\uf005"
            },
            {
                title: "Settings",
                route: "/settings",
                icon: "\uf013"
            }
        ];
    }
    DrawerComponent.prototype.ngOnInit = function () {
    };
    DrawerComponent.prototype.onNavigationItemTap = function (args) {
        var route = args.view.bindingContext.route;
        this.routerExtensions.navigate([route], {
            transition: {
                name: "slide"
            }
        });
    };
    DrawerComponent.prototype.isPageSelected = function (pageTitle) {
        return pageTitle === this.selectedPage;
    };
    return DrawerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DrawerComponent.prototype, "selectedPage", void 0);
DrawerComponent = __decorate([
    core_1.Component({
        selector: "MyDrawer",
        moduleId: module.id,
        templateUrl: "./drawer.component.html",
        styleUrls: ["./drawer.component.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions])
], DrawerComponent);
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBUy9ELElBQWEsZUFBZTtJQThCeEIseUJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBNUJ0RCxvQkFBZSxHQUFRO1lBQ25CO2dCQUNJLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxPQUFPO2dCQUNkLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLEtBQUssRUFBRSxXQUFXO2dCQUNsQixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxVQUFVO2dCQUNqQixLQUFLLEVBQUUsV0FBVztnQkFDbEIsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFBO0lBSUQsQ0FBQztJQUVELGtDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNkNBQW1CLEdBQW5CLFVBQW9CLElBQW1CO1FBQ25DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEMsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxPQUFPO2FBQ2hCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdDQUFjLEdBQWQsVUFBZSxTQUFpQjtRQUM1QixNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0MsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQztBQWhEWTtJQUFSLFlBQUssRUFBRTs7cURBQXNCO0FBRHJCLGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO0tBQ3hDLENBQUM7cUNBK0J3Qyx5QkFBZ0I7R0E5QjdDLGVBQWUsQ0FpRDNCO0FBakRZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBJdGVtRXZlbnREYXRhIH0gZnJvbSBcInVpL2xpc3Qtdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJNeURyYXdlclwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9kcmF3ZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vZHJhd2VyLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRHJhd2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBzZWxlY3RlZFBhZ2U6IHN0cmluZztcbiAgICBuYXZpZ2F0aW9uSXRlbXM6IGFueSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6IFwiSG9tZVwiLFxuICAgICAgICAgICAgcm91dGU6IFwiL2hvbWVcIixcbiAgICAgICAgICAgIGljb246IFwiXFx1ZjAxNVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkJyb3dzZVwiLFxuICAgICAgICAgICAgcm91dGU6IFwiL2Jyb3dzZVwiLFxuICAgICAgICAgICAgaWNvbjogXCJcXHVmMWVhXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6IFwiU2VhcmNoXCIsXG4gICAgICAgICAgICByb3V0ZTogXCIvc2VhcmNoXCIsXG4gICAgICAgICAgICBpY29uOiBcIlxcdWYwMDJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogXCJGZWF0dXJlZFwiLFxuICAgICAgICAgICAgcm91dGU6IFwiL2ZlYXR1cmVkXCIsXG4gICAgICAgICAgICBpY29uOiBcIlxcdWYwMDVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogXCJTZXR0aW5nc1wiLFxuICAgICAgICAgICAgcm91dGU6IFwiL3NldHRpbmdzXCIsXG4gICAgICAgICAgICBpY29uOiBcIlxcdWYwMTNcIlxuICAgICAgICB9XG4gICAgXVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBvbk5hdmlnYXRpb25JdGVtVGFwKGFyZ3M6IEl0ZW1FdmVudERhdGEpIHtcbiAgICAgICAgbGV0IHJvdXRlID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0LnJvdXRlO1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3JvdXRlXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc1BhZ2VTZWxlY3RlZChwYWdlVGl0bGUgOnN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcGFnZVRpdGxlID09PSB0aGlzLnNlbGVjdGVkUGFnZTtcbiAgICB9XG59XG4iXX0=