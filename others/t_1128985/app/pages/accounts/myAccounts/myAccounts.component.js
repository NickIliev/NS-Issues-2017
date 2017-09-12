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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlBY2NvdW50cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteUFjY291bnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRTtBQUNqRSxrRUFBa0U7QUFDbEUsMkVBQTJFO0FBQzNFLGtEQUFrRTtBQUNsRSxzREFBK0Q7QUFDL0Qsd0RBQXFEO0FBRXJELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSxtQkFBbUI7SUFjM0IsNkJBQW9CLGlCQUFtQyxFQUM1QyxlQUErQixFQUMvQixJQUFVO1FBRkQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUM1QyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQWJmLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLFVBQUssR0FBRyxlQUFlLENBQUM7UUFDeEIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1Qix1QkFBa0IsR0FBbUIsRUFBRSxDQUFDO1FBQ3hDLHFCQUFnQixHQUFtQixFQUFFLENBQUM7UUFFN0Msa0JBQWEsR0FBWSxDQUFDLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxDQUFDLENBQUM7UUFDekIsdUJBQWtCLEdBQVksQ0FBQyxDQUFDO1FBSzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLGdCQUFnQixHQUF1QyxJQUFJLGdDQUFnQixFQUFFLENBQUM7UUFDbEYsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXJDLElBQUksZ0JBQWdCLEdBQXVDLElBQUksZ0NBQWdCLEVBQUUsQ0FBQztRQUNsRixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpELGVBQWU7UUFDZixJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRXBFLGFBQWE7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQ3BFLENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDcEUsQ0FBQztJQUVNLG1EQUFxQixHQUE1QixVQUE2QixJQUFJO1FBQzdCLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNqQyxLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNwQztnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG9DQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQWxFRCxJQWtFQztBQWxFWSxtQkFBbUI7SUFOL0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDLENBQUM7cUNBZ0IwQyx5QkFBZ0I7UUFDM0IsaUNBQWM7UUFDekIsV0FBSTtHQWhCYixtQkFBbUIsQ0FrRS9CO0FBbEVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vIGltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuLy8gaW1wb3J0ICogYXMgc2VnbWVudGVkQmFyTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tIFwiLi4vYWNjb3VudHMuc2VydmljZVwiO1xuaW1wb3J0IHsgQWNjb3VudE1vZGVsIH0gZnJvbSBcIi4uL2FjY291bnRzLm1vZGVsXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIm15QWNjb3VudHMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4uL2FjY291bnRzLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIE15QWNjb3VudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgcHVibGljIHRhYkl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPjtcbiAgICBwdWJsaWMgdGFiUHJvcGVydHk6IHN0cmluZyA9IFwiSXRlbSAxXCI7XG4gICAgcHVibGljIHRpdGxlID0gXCJNeSBGaW5hbmNpYWxzXCI7XG4gICAgcHVibGljIGlzQ3VycmVudFllYXJTZWxlY3RlZCA9IHRydWU7XG4gICAgcHVibGljIGlzUHJpb3JZZWFyU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBwdWJsaWMgY3VycmVudEFjY291bnRMaXN0OiBBY2NvdW50TW9kZWxbXSA9IFtdO1xuICAgIHB1YmxpYyBwcmlvckFjY291bnRMaXN0OiBBY2NvdW50TW9kZWxbXSA9IFtdO1xuXG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XG4gICAgcGFnZUVuZFRpbWUgOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XG5cbiAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBfYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgdGhpcy50YWJJdGVtcyA9IFtdO1xuICAgICAgICBsZXQgdG1wU2VnbWVudGVkQmFyMTogU2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgIHRtcFNlZ21lbnRlZEJhcjEudGl0bGUgPSBcIjIwMTdcIjtcbiAgICAgICAgdGhpcy50YWJJdGVtcy5wdXNoKHRtcFNlZ21lbnRlZEJhcjEpO1xuXG4gICAgICAgIGxldCB0bXBTZWdtZW50ZWRCYXIyOiBTZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgdG1wU2VnbWVudGVkQmFyMi50aXRsZSA9IFwiUHJpb3IgWWVhclwiO1xuICAgICAgICB0aGlzLnRhYkl0ZW1zLnB1c2godG1wU2VnbWVudGVkQmFyMik7XG4gICAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgYWNjb3VudHNEYXRhID0gdGhpcy5fYWNjb3VudFNlcnZpY2UuZ2V0QWxsQWNjb3VudHMoKTtcblxuICAgICAgICAvLyBDdXJyZW50IFllYXJcbiAgICAgICAgdGhpcy5jdXJyZW50QWNjb3VudExpc3QgPSBhY2NvdW50c0RhdGEuYWNjb3VudC5jdXJyZW50WWVhci5hY2NvdW50cztcblxuICAgICAgICAvLyBQcmlvciBZZWFyXG4gICAgICAgIHRoaXMucHJpb3JBY2NvdW50TGlzdCA9IGFjY291bnRzRGF0YS5hY2NvdW50LnByaW9yWWVhci5hY2NvdW50cztcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBzd2l0Y2ggKHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ3VycmVudFllYXJTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW9yWWVhclNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRZZWFyU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpb3JZZWFyU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxufVxuIl19