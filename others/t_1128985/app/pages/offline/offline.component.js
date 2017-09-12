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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvZmZsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxzREFBK0Q7QUFDL0QsOENBQThDO0FBQzlDLGdDQUErQjtBQUMvQixrREFBb0Q7QUEyQnBELElBQWEsZ0JBQWdCO0lBR3pCLDBCQUFvQixpQkFBbUMsRUFDNUMsUUFBaUIsRUFDaEIsSUFBVTtRQUZGLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDNUMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBSnRCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFLdEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtJQUNyQiwyRUFBMkU7SUFDM0UsdURBQXVEO0lBQ3ZELCtCQUErQjtJQUMvQixjQUFjO0lBQ2QsUUFBUTtJQUNSLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsaUZBQWlGO0lBQ2pGLHVGQUF1RjtJQUN2RiwwSUFBMEk7SUFDMUksWUFBWTtJQUNaLFFBQVE7SUFDUixJQUFJO0lBRUcsaUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLGdCQUFnQjtJQXpCNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxxNkJBc0JUO0tBQ0osQ0FBQztxQ0FJeUMseUJBQWdCO1FBQ2xDLGdCQUFPO1FBQ1YsV0FBSTtHQUxiLGdCQUFnQixDQTZCNUI7QUE3QlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgXG48QWN0aW9uQmFyIGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgPE5hdmlnYXRpb25CdXR0b24gaW9zLnBvc2l0aW9uPVwibGVmdFwiICptYklmQW5kcm9pZCBhbmRyb2lkLnN5c3RlbUljb249XCJpY19tZW51X2JhY2tcIiAodGFwKT1cImdvQmFjaygpXCI+PC9OYXZpZ2F0aW9uQnV0dG9uPlxuICAgIDxOYXZpZ2F0aW9uQnV0dG9uICptYklmSW9zIHZpc2liaWxpdHk9XCJjb2xsYXBzZVwiPjwvTmF2aWdhdGlvbkJ1dHRvbj5cbiAgICA8QWN0aW9uSXRlbSAqbWJJZklvcz5cbiAgICAgICAgPEltYWdlIHNyYz1cIn4vaW1hZ2VzL2ljb24vaW9zX2JhY2sucG5nXCIgKHRhcCk9XCJnb0JhY2soKTtcIiBjbGFzcz1cImFjdGlvbkFycm93XCI+PC9JbWFnZT5cbiAgICA8L0FjdGlvbkl0ZW0+XG4gICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaW9zQWN0aW9uYmFyXCIgKm1iSWZJb3M+XG4gICAgICAgIDxtYi1oZWFkZXIgW3RpdGxlXT1cInRpdGxlXCI+PC9tYi1oZWFkZXI+XG4gICAgPC9TdGFja0xheW91dD5cbiAgICA8U3RhY2tMYXlvdXQgKm1iSWZBbmRyb2lkPlxuICAgICAgICA8bWItaGVhZGVyIFt0aXRsZV09XCJ0aXRsZVwiPjwvbWItaGVhZGVyPlxuICAgIDwvU3RhY2tMYXlvdXQ+XG48L0FjdGlvbkJhcj5cblxuPG1iLXNpZGUtbWVudSAqbWJJZkFuZHJvaWQ+PC9tYi1zaWRlLW1lbnU+XG48U3RhY2tMYXlvdXQ+XG4gICAgPG1iLXNpZGUtbWVudSAqbWJJZklvcz48L21iLXNpZGUtbWVudT5cbiAgICAgICAgPFN0YWNrTGF5b3V0IHdpZHRoPVwiMTAwJVwiPlxuICAgICAgICAgICAgPEltYWdlIHN0cmV0Y2g9XCJhc3BlY3RGaWxsXCIgc3JjPVwifi9pbWFnZXMvb2ZmbGluZS5wbmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9JbWFnZT5cbiAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICA8L1N0YWNrTGF5b3V0PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgT2ZmbGluZUNvbXBvbmVudCB7XG4gICAgdGl0bGU6IHN0cmluZyA9IFwiT2ZmbGluZVwiO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyBidG5CYWNrKCkge1xuICAgIC8vICAgICBpZiAoIXRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbiB8fCAhdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZCkge1xuICAgIC8vICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9ob21lJ10sIHtcbiAgICAvLyAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNlIHtcbiAgICAvLyAgICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xuICAgIC8vICAgICAgICAgaWYgKHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubG9jYXRpb25TdHJhdGVneS5fZ2V0U3RhdGVzKCkubGVuZ3RoID4gMSkge1xuICAgIC8vICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5sb2NhdGlvblN0cmF0ZWd5Ll9nZXRTdGF0ZXMoKS5sZW5ndGggLSAyO1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3RoaXMuX3JvdXRlckV4dGVuc2lvbnMubG9jYXRpb25TdHJhdGVneS5fZ2V0U3RhdGVzKClbaW5kZXhdLnVybF0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxufVxuIl19