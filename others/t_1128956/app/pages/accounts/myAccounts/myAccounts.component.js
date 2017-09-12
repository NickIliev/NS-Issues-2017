"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { RouterExtensions } from 'nativescript-angular/router';
// import * as segmentedBarModule from "tns-core-modules/ui/segmented-bar";
var segmented_bar_1 = require("ui/segmented-bar");
var router_1 = require("nativescript-angular/router");
var accounts_service_1 = require("../accounts.service");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var MyAccountsComponent = (function () {
    function MyAccountsComponent(_routerExtensions, _accountService, page) {
        this._routerExtensions = _routerExtensions;
        this._accountService = _accountService;
        this.page = page;
        this.tabProperty = "Item 1";
        this.title = "My Financials";
        this.isCurrentYearSelected = true;
        this.isPriorYearSelected = false;
        this.currentAccountList = [];
        this.priorAccountList = [];
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.pageStartTime = new Date().getTime();
        this.tabItems = [];
        var tmpSegmentedBar1 = new segmented_bar_1.SegmentedBarItem();
        tmpSegmentedBar1.title = "2017";
        this.tabItems.push(tmpSegmentedBar1);
        var tmpSegmentedBar2 = new segmented_bar_1.SegmentedBarItem();
        tmpSegmentedBar2.title = "Prior Year";
        this.tabItems.push(tmpSegmentedBar2);
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
    MyAccountsComponent.prototype.ngOnInit = function () {
        var accountsData = this._accountService.getAllAccounts();
        // Current Year
        this.currentAccountList = accountsData.account.currentYear.accounts;
        // Prior Year
        this.priorAccountList = accountsData.account.priorYear.accounts;
    };
    MyAccountsComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    MyAccountsComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        switch (segmetedBar.selectedIndex) {
            case 0:
                this.isCurrentYearSelected = true;
                this.isPriorYearSelected = false;
                break;
            case 1:
                this.isCurrentYearSelected = false;
                this.isPriorYearSelected = true;
            default:
                break;
        }
    };
    MyAccountsComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    return MyAccountsComponent;
}());
MyAccountsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "myAccounts.component.html",
        styleUrls: ["../accounts.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        accounts_service_1.AccountService,
        page_1.Page])
], MyAccountsComponent);
exports.MyAccountsComponent = MyAccountsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlBY2NvdW50cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteUFjY291bnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRTtBQUNqRSxrRUFBa0U7QUFDbEUsMkVBQTJFO0FBQzNFLGtEQUFrRTtBQUNsRSxzREFBK0Q7QUFDL0Qsd0RBQXFEO0FBRXJELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSxtQkFBbUI7SUFjM0IsNkJBQW9CLGlCQUFtQyxFQUM1QyxlQUErQixFQUMvQixJQUFVO1FBRkQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUM1QyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQWJmLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLFVBQUssR0FBRyxlQUFlLENBQUM7UUFDeEIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1Qix1QkFBa0IsR0FBbUIsRUFBRSxDQUFDO1FBQ3hDLHFCQUFnQixHQUFtQixFQUFFLENBQUM7UUFFN0Msa0JBQWEsR0FBWSxDQUFDLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxDQUFDLENBQUM7UUFDekIsdUJBQWtCLEdBQVksQ0FBQyxDQUFDO1FBSzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLGdCQUFnQixHQUF1QyxJQUFJLGdDQUFnQixFQUFFLENBQUM7UUFDbEYsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXJDLElBQUksZ0JBQWdCLEdBQXVDLElBQUksZ0NBQWdCLEVBQUUsQ0FBQztRQUNsRixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpELGVBQWU7UUFDZixJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRXBFLGFBQWE7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQ3BFLENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDcEUsQ0FBQztJQUVNLG1EQUFxQixHQUE1QixVQUE2QixJQUFJO1FBQzdCLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNqQyxLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNwQztnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG9DQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQWxFRCxJQWtFQztBQWxFWSxtQkFBbUI7SUFOL0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDLENBQUM7cUNBZ0IwQyx5QkFBZ0I7UUFDM0IsaUNBQWM7UUFDekIsV0FBSTtHQWhCYixtQkFBbUIsQ0FrRS9CO0FBbEVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XHJcbi8vIGltcG9ydCAqIGFzIHNlZ21lbnRlZEJhck1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSBcIi4uL2FjY291bnRzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQWNjb3VudE1vZGVsIH0gZnJvbSBcIi4uL2FjY291bnRzLm1vZGVsXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIm15QWNjb3VudHMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi4vYWNjb3VudHMuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTXlBY2NvdW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgcHVibGljIHRhYkl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPjtcclxuICAgIHB1YmxpYyB0YWJQcm9wZXJ0eTogc3RyaW5nID0gXCJJdGVtIDFcIjtcclxuICAgIHB1YmxpYyB0aXRsZSA9IFwiTXkgRmluYW5jaWFsc1wiO1xyXG4gICAgcHVibGljIGlzQ3VycmVudFllYXJTZWxlY3RlZCA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNQcmlvclllYXJTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgcHVibGljIGN1cnJlbnRBY2NvdW50TGlzdDogQWNjb3VudE1vZGVsW10gPSBbXTtcclxuICAgIHB1YmxpYyBwcmlvckFjY291bnRMaXN0OiBBY2NvdW50TW9kZWxbXSA9IFtdO1xyXG5cclxuICAgIHBhZ2VTdGFydFRpbWUgOiBudW1iZXIgPSAwO1xyXG4gICAgcGFnZUVuZFRpbWUgOiBudW1iZXIgPSAwO1xyXG4gICAgcGFnZVRpbWVEaWZmZXJlbmNlIDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIF9hY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiSXRlbXMgPSBbXTtcclxuICAgICAgICBsZXQgdG1wU2VnbWVudGVkQmFyMTogU2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XHJcbiAgICAgICAgdG1wU2VnbWVudGVkQmFyMS50aXRsZSA9IFwiMjAxN1wiO1xyXG4gICAgICAgIHRoaXMudGFiSXRlbXMucHVzaCh0bXBTZWdtZW50ZWRCYXIxKTtcclxuXHJcbiAgICAgICAgbGV0IHRtcFNlZ21lbnRlZEJhcjI6IFNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgIHRtcFNlZ21lbnRlZEJhcjIudGl0bGUgPSBcIlByaW9yIFllYXJcIjtcclxuICAgICAgICB0aGlzLnRhYkl0ZW1zLnB1c2godG1wU2VnbWVudGVkQmFyMik7XHJcbiAgICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGxldCBhY2NvdW50c0RhdGEgPSB0aGlzLl9hY2NvdW50U2VydmljZS5nZXRBbGxBY2NvdW50cygpO1xyXG5cclxuICAgICAgICAvLyBDdXJyZW50IFllYXJcclxuICAgICAgICB0aGlzLmN1cnJlbnRBY2NvdW50TGlzdCA9IGFjY291bnRzRGF0YS5hY2NvdW50LmN1cnJlbnRZZWFyLmFjY291bnRzO1xyXG5cclxuICAgICAgICAvLyBQcmlvciBZZWFyXHJcbiAgICAgICAgdGhpcy5wcmlvckFjY291bnRMaXN0ID0gYWNjb3VudHNEYXRhLmFjY291bnQucHJpb3JZZWFyLmFjY291bnRzO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xyXG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc3dpdGNoIChzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50WWVhclNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmlvclllYXJTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50WWVhclNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpb3JZZWFyU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==