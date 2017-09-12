"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var global_1 = require("../../shared/global");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var HappyComponent = (function () {
    function HappyComponent(_routerExtensions, _globals, page) {
        this._routerExtensions = _routerExtensions;
        this._globals = _globals;
        this.page = page;
        this.title = "Construction";
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
    HappyComponent.prototype.btnBack = function () {
        if (!this._globals.isLoggedIn || !this._globals.isUnauthenticated) {
            this._routerExtensions.back();
        }
        else {
            var index_1;
            if (this._routerExtensions.locationStrategy._getStates().length > 1) {
                index_1 = this._routerExtensions.locationStrategy._getStates().length - 2;
                this._routerExtensions.navigate([this._routerExtensions.locationStrategy._getStates()[index_1].url], { clearHistory: true });
            }
        }
    };
    HappyComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    return HappyComponent;
}());
HappyComponent = __decorate([
    core_1.Component({
        template: "\n<ActionBar class=\"header\">\n    <NavigationButton ios.position=\"left\" *mbIfAndroid android.systemIcon=\"ic_menu_back\" (tap)=\"goBack()\"></NavigationButton>\n    <NavigationButton *mbIfIos visibility=\"collapse\"></NavigationButton>\n    <ActionItem *mbIfIos>\n        <Image src=\"~/images/icon/ios_back.png\" (tap)=\"goBack();\" class=\"actionArrow\"></Image>\n    </ActionItem>\n    <StackLayout class=\"iosActionbar\" *mbIfIos>\n        <mb-header [title]=\"title\"></mb-header>\n    </StackLayout>\n    <StackLayout *mbIfAndroid>\n        <mb-header [title]=\"title\"></mb-header>\n    </StackLayout>\n</ActionBar>\n<mb-side-menu *mbIfAndroid></mb-side-menu>\n<GridLayout rows=\"*\" columns=\"*\">\n    <mb-side-menu *mbIfIos></mb-side-menu>\n        <StackLayout style.textAlignment=\"center\">\n            <Image src=\"~/images/construction.png\"></Image>\n            <StackLayout>\n                <Button text=\"Back\" class=\"happyBtn\" (tap)=\"btnBack();\" clearHistory=\"true\" width=\"250\"></Button>\n            </StackLayout>\n        </StackLayout>\n    </GridLayout>\n    "
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        global_1.Globals,
        page_1.Page])
], HappyComponent);
exports.HappyComponent = HappyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFwcHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGFwcHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHNEQUErRDtBQUMvRCw4Q0FBOEM7QUFDOUMsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQTZCcEQsSUFBYSxjQUFjO0lBR3ZCLHdCQUFvQixpQkFBbUMsRUFDNUMsUUFBaUIsRUFDaEIsSUFBVTtRQUZGLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDNUMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBSnRCLFVBQUssR0FBVyxjQUFjLENBQUM7UUFLM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLGdDQUFPLEdBQWQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksT0FBYSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsT0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDL0gsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU0sK0JBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBM0JZLGNBQWM7SUEzQjFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsNmtDQXdCVDtLQUNKLENBQUM7cUNBSXlDLHlCQUFnQjtRQUNsQyxnQkFBTztRQUNWLFdBQUk7R0FMYixjQUFjLENBMkIxQjtBQTNCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHRlbXBsYXRlOiBgXHJcbjxBY3Rpb25CYXIgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgIDxOYXZpZ2F0aW9uQnV0dG9uIGlvcy5wb3NpdGlvbj1cImxlZnRcIiAqbWJJZkFuZHJvaWQgYW5kcm9pZC5zeXN0ZW1JY29uPVwiaWNfbWVudV9iYWNrXCIgKHRhcCk9XCJnb0JhY2soKVwiPjwvTmF2aWdhdGlvbkJ1dHRvbj5cclxuICAgIDxOYXZpZ2F0aW9uQnV0dG9uICptYklmSW9zIHZpc2liaWxpdHk9XCJjb2xsYXBzZVwiPjwvTmF2aWdhdGlvbkJ1dHRvbj5cclxuICAgIDxBY3Rpb25JdGVtICptYklmSW9zPlxyXG4gICAgICAgIDxJbWFnZSBzcmM9XCJ+L2ltYWdlcy9pY29uL2lvc19iYWNrLnBuZ1wiICh0YXApPVwiZ29CYWNrKCk7XCIgY2xhc3M9XCJhY3Rpb25BcnJvd1wiPjwvSW1hZ2U+XHJcbiAgICA8L0FjdGlvbkl0ZW0+XHJcbiAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJpb3NBY3Rpb25iYXJcIiAqbWJJZklvcz5cclxuICAgICAgICA8bWItaGVhZGVyIFt0aXRsZV09XCJ0aXRsZVwiPjwvbWItaGVhZGVyPlxyXG4gICAgPC9TdGFja0xheW91dD5cclxuICAgIDxTdGFja0xheW91dCAqbWJJZkFuZHJvaWQ+XHJcbiAgICAgICAgPG1iLWhlYWRlciBbdGl0bGVdPVwidGl0bGVcIj48L21iLWhlYWRlcj5cclxuICAgIDwvU3RhY2tMYXlvdXQ+XHJcbjwvQWN0aW9uQmFyPlxyXG48bWItc2lkZS1tZW51ICptYklmQW5kcm9pZD48L21iLXNpZGUtbWVudT5cclxuPEdyaWRMYXlvdXQgcm93cz1cIipcIiBjb2x1bW5zPVwiKlwiPlxyXG4gICAgPG1iLXNpZGUtbWVudSAqbWJJZklvcz48L21iLXNpZGUtbWVudT5cclxuICAgICAgICA8U3RhY2tMYXlvdXQgc3R5bGUudGV4dEFsaWdubWVudD1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICA8SW1hZ2Ugc3JjPVwifi9pbWFnZXMvY29uc3RydWN0aW9uLnBuZ1wiPjwvSW1hZ2U+XHJcbiAgICAgICAgICAgIDxTdGFja0xheW91dD5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIkJhY2tcIiBjbGFzcz1cImhhcHB5QnRuXCIgKHRhcCk9XCJidG5CYWNrKCk7XCIgY2xlYXJIaXN0b3J5PVwidHJ1ZVwiIHdpZHRoPVwiMjUwXCI+PC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICAgICAgPC9TdGFja0xheW91dD5cclxuICAgIDwvR3JpZExheW91dD5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIEhhcHB5Q29tcG9uZW50IHtcclxuICAgIHRpdGxlOiBzdHJpbmcgPSBcIkNvbnN0cnVjdGlvblwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJ0bkJhY2soKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gfHwgIXRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubG9jYXRpb25TdHJhdGVneS5fZ2V0U3RhdGVzKCkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmxvY2F0aW9uU3RyYXRlZ3kuX2dldFN0YXRlcygpLmxlbmd0aCAtIDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFt0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmxvY2F0aW9uU3RyYXRlZ3kuX2dldFN0YXRlcygpW2luZGV4XS51cmxdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==