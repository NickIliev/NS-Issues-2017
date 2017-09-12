"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var global_1 = require("../../shared/global");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var OfflineComponent = (function () {
    function OfflineComponent(_routerExtensions, _globals, page) {
        this._routerExtensions = _routerExtensions;
        this._globals = _globals;
        this.page = page;
        this.title = "Offline";
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
    // public btnBack() {
    //     if (!this._globals.isLoggedIn || !this._globals.isUnauthenticated) {
    //         this._routerExtensions.navigate(['/home'], {
    //              animated: false
    //         });
    //     }
    //     else {
    //         let index: number;
    //         if (this._routerExtensions.locationStrategy._getStates().length > 1) {
    //             index = this._routerExtensions.locationStrategy._getStates().length - 2;
    //             this._routerExtensions.navigate([this._routerExtensions.locationStrategy._getStates()[index].url], { clearHistory: true });
    //         }
    //     }
    // }
    OfflineComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    return OfflineComponent;
}());
OfflineComponent = __decorate([
    core_1.Component({
        template: "\n<ActionBar class=\"header\">\n    <NavigationButton ios.position=\"left\" *mbIfAndroid android.systemIcon=\"ic_menu_back\" (tap)=\"goBack()\"></NavigationButton>\n    <NavigationButton *mbIfIos visibility=\"collapse\"></NavigationButton>\n    <ActionItem *mbIfIos>\n        <Image src=\"~/images/icon/ios_back.png\" (tap)=\"goBack();\" class=\"actionArrow\"></Image>\n    </ActionItem>\n    <StackLayout class=\"iosActionbar\" *mbIfIos>\n        <mb-header [title]=\"title\"></mb-header>\n    </StackLayout>\n    <StackLayout *mbIfAndroid>\n        <mb-header [title]=\"title\"></mb-header>\n    </StackLayout>\n</ActionBar>\n\n<mb-side-menu *mbIfAndroid></mb-side-menu>\n<StackLayout>\n    <mb-side-menu *mbIfIos></mb-side-menu>\n        <StackLayout width=\"100%\">\n            <Image stretch=\"aspectFill\" src=\"~/images/offline.png\" width=\"100%\" height=\"100%\"></Image>\n        </StackLayout>\n    </StackLayout>\n    "
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        global_1.Globals,
        page_1.Page])
], OfflineComponent);
exports.OfflineComponent = OfflineComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvZmZsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxzREFBK0Q7QUFDL0QsOENBQThDO0FBQzlDLGdDQUErQjtBQUMvQixrREFBb0Q7QUEyQnBELElBQWEsZ0JBQWdCO0lBR3pCLDBCQUFvQixpQkFBbUMsRUFDNUMsUUFBaUIsRUFDaEIsSUFBVTtRQUZGLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDNUMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBSnRCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFLdEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtJQUNyQiwyRUFBMkU7SUFDM0UsdURBQXVEO0lBQ3ZELCtCQUErQjtJQUMvQixjQUFjO0lBQ2QsUUFBUTtJQUNSLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsaUZBQWlGO0lBQ2pGLHVGQUF1RjtJQUN2RiwwSUFBMEk7SUFDMUksWUFBWTtJQUNaLFFBQVE7SUFDUixJQUFJO0lBRUcsaUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLGdCQUFnQjtJQXpCNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxxNkJBc0JUO0tBQ0osQ0FBQztxQ0FJeUMseUJBQWdCO1FBQ2xDLGdCQUFPO1FBQ1YsV0FBSTtHQUxiLGdCQUFnQixDQTZCNUI7QUE3QlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgdGVtcGxhdGU6IGBcclxuPEFjdGlvbkJhciBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgPE5hdmlnYXRpb25CdXR0b24gaW9zLnBvc2l0aW9uPVwibGVmdFwiICptYklmQW5kcm9pZCBhbmRyb2lkLnN5c3RlbUljb249XCJpY19tZW51X2JhY2tcIiAodGFwKT1cImdvQmFjaygpXCI+PC9OYXZpZ2F0aW9uQnV0dG9uPlxyXG4gICAgPE5hdmlnYXRpb25CdXR0b24gKm1iSWZJb3MgdmlzaWJpbGl0eT1cImNvbGxhcHNlXCI+PC9OYXZpZ2F0aW9uQnV0dG9uPlxyXG4gICAgPEFjdGlvbkl0ZW0gKm1iSWZJb3M+XHJcbiAgICAgICAgPEltYWdlIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW9zX2JhY2sucG5nXCIgKHRhcCk9XCJnb0JhY2soKTtcIiBjbGFzcz1cImFjdGlvbkFycm93XCI+PC9JbWFnZT5cclxuICAgIDwvQWN0aW9uSXRlbT5cclxuICAgIDxTdGFja0xheW91dCBjbGFzcz1cImlvc0FjdGlvbmJhclwiICptYklmSW9zPlxyXG4gICAgICAgIDxtYi1oZWFkZXIgW3RpdGxlXT1cInRpdGxlXCI+PC9tYi1oZWFkZXI+XHJcbiAgICA8L1N0YWNrTGF5b3V0PlxyXG4gICAgPFN0YWNrTGF5b3V0ICptYklmQW5kcm9pZD5cclxuICAgICAgICA8bWItaGVhZGVyIFt0aXRsZV09XCJ0aXRsZVwiPjwvbWItaGVhZGVyPlxyXG4gICAgPC9TdGFja0xheW91dD5cclxuPC9BY3Rpb25CYXI+XHJcblxyXG48bWItc2lkZS1tZW51ICptYklmQW5kcm9pZD48L21iLXNpZGUtbWVudT5cclxuPFN0YWNrTGF5b3V0PlxyXG4gICAgPG1iLXNpZGUtbWVudSAqbWJJZklvcz48L21iLXNpZGUtbWVudT5cclxuICAgICAgICA8U3RhY2tMYXlvdXQgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgICAgIDxJbWFnZSBzdHJldGNoPVwiYXNwZWN0RmlsbFwiIHNyYz1cIn4vaW1hZ2VzL29mZmxpbmUucG5nXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjwvSW1hZ2U+XHJcbiAgICAgICAgPC9TdGFja0xheW91dD5cclxuICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZmZsaW5lQ29tcG9uZW50IHtcclxuICAgIHRpdGxlOiBzdHJpbmcgPSBcIk9mZmxpbmVcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBidG5CYWNrKCkge1xyXG4gICAgLy8gICAgIGlmICghdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluIHx8ICF0aGlzLl9nbG9iYWxzLmlzVW5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvaG9tZSddLCB7XHJcbiAgICAvLyAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlIHtcclxuICAgIC8vICAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XHJcbiAgICAvLyAgICAgICAgIGlmICh0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmxvY2F0aW9uU3RyYXRlZ3kuX2dldFN0YXRlcygpLmxlbmd0aCA+IDEpIHtcclxuICAgIC8vICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5sb2NhdGlvblN0cmF0ZWd5Ll9nZXRTdGF0ZXMoKS5sZW5ndGggLSAyO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5sb2NhdGlvblN0cmF0ZWd5Ll9nZXRTdGF0ZXMoKVtpbmRleF0udXJsXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=