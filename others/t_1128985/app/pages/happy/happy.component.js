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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFwcHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGFwcHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHNEQUErRDtBQUMvRCw4Q0FBOEM7QUFDOUMsZ0NBQStCO0FBQy9CLGtEQUFvRDtBQTZCcEQsSUFBYSxjQUFjO0lBR3ZCLHdCQUFvQixpQkFBbUMsRUFDNUMsUUFBaUIsRUFDaEIsSUFBVTtRQUZGLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDNUMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBSnRCLFVBQUssR0FBVyxjQUFjLENBQUM7UUFLM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLGdDQUFPLEdBQWQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksT0FBYSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsT0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDL0gsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU0sK0JBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBM0JZLGNBQWM7SUEzQjFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsNmtDQXdCVDtLQUNKLENBQUM7cUNBSXlDLHlCQUFnQjtRQUNsQyxnQkFBTztRQUNWLFdBQUk7R0FMYixjQUFjLENBMkIxQjtBQTNCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZTogYFxuPEFjdGlvbkJhciBjbGFzcz1cImhlYWRlclwiPlxuICAgIDxOYXZpZ2F0aW9uQnV0dG9uIGlvcy5wb3NpdGlvbj1cImxlZnRcIiAqbWJJZkFuZHJvaWQgYW5kcm9pZC5zeXN0ZW1JY29uPVwiaWNfbWVudV9iYWNrXCIgKHRhcCk9XCJnb0JhY2soKVwiPjwvTmF2aWdhdGlvbkJ1dHRvbj5cbiAgICA8TmF2aWdhdGlvbkJ1dHRvbiAqbWJJZklvcyB2aXNpYmlsaXR5PVwiY29sbGFwc2VcIj48L05hdmlnYXRpb25CdXR0b24+XG4gICAgPEFjdGlvbkl0ZW0gKm1iSWZJb3M+XG4gICAgICAgIDxJbWFnZSBzcmM9XCJ+L2ltYWdlcy9pY29uL2lvc19iYWNrLnBuZ1wiICh0YXApPVwiZ29CYWNrKCk7XCIgY2xhc3M9XCJhY3Rpb25BcnJvd1wiPjwvSW1hZ2U+XG4gICAgPC9BY3Rpb25JdGVtPlxuICAgIDxTdGFja0xheW91dCBjbGFzcz1cImlvc0FjdGlvbmJhclwiICptYklmSW9zPlxuICAgICAgICA8bWItaGVhZGVyIFt0aXRsZV09XCJ0aXRsZVwiPjwvbWItaGVhZGVyPlxuICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgPFN0YWNrTGF5b3V0ICptYklmQW5kcm9pZD5cbiAgICAgICAgPG1iLWhlYWRlciBbdGl0bGVdPVwidGl0bGVcIj48L21iLWhlYWRlcj5cbiAgICA8L1N0YWNrTGF5b3V0PlxuPC9BY3Rpb25CYXI+XG48bWItc2lkZS1tZW51ICptYklmQW5kcm9pZD48L21iLXNpZGUtbWVudT5cbjxHcmlkTGF5b3V0IHJvd3M9XCIqXCIgY29sdW1ucz1cIipcIj5cbiAgICA8bWItc2lkZS1tZW51ICptYklmSW9zPjwvbWItc2lkZS1tZW51PlxuICAgICAgICA8U3RhY2tMYXlvdXQgc3R5bGUudGV4dEFsaWdubWVudD1cImNlbnRlclwiPlxuICAgICAgICAgICAgPEltYWdlIHNyYz1cIn4vaW1hZ2VzL2NvbnN0cnVjdGlvbi5wbmdcIj48L0ltYWdlPlxuICAgICAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIkJhY2tcIiBjbGFzcz1cImhhcHB5QnRuXCIgKHRhcCk9XCJidG5CYWNrKCk7XCIgY2xlYXJIaXN0b3J5PVwidHJ1ZVwiIHdpZHRoPVwiMjUwXCI+PC9CdXR0b24+XG4gICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgIDwvR3JpZExheW91dD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEhhcHB5Q29tcG9uZW50IHtcbiAgICB0aXRsZTogc3RyaW5nID0gXCJDb25zdHJ1Y3Rpb25cIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYnRuQmFjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW4gfHwgIXRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5sb2NhdGlvblN0cmF0ZWd5Ll9nZXRTdGF0ZXMoKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmxvY2F0aW9uU3RyYXRlZ3kuX2dldFN0YXRlcygpLmxlbmd0aCAtIDI7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5sb2NhdGlvblN0cmF0ZWd5Ll9nZXRTdGF0ZXMoKVtpbmRleF0udXJsXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG59XG4iXX0=