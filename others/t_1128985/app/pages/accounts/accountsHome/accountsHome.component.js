"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { RouterExtensions } from "nativescript-angular/router";
// import * as segmentedBarModule from "tns-core-modules/ui/segmented-bar";
var segmented_bar_1 = require("ui/segmented-bar");
var router_1 = require("nativescript-angular/router");
var accounts_service_1 = require("../accounts.service");
var app = require("tns-core-modules/application");
var permissions = require("nativescript-permissions");
var phone = require("nativescript-phone");
var page_1 = require("ui/page");
var AccountsHomeComponent = (function () {
    function AccountsHomeComponent(_router, _accountService, page) {
        this._router = _router;
        this._accountService = _accountService;
        this.page = page;
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
    AccountsHomeComponent.prototype.ngOnInit = function () {
        var accountsData = this._accountService.getAllAccounts();
        this.actionItemCount = accountsData.actionItems;
        // Current Year
        this.currentAccountList = accountsData.account.currentYear.accounts;
        // Prior Year
        this.priorAccountList = accountsData.account.priorYear.accounts;
    };
    AccountsHomeComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    AccountsHomeComponent.prototype.goToMyAccounts = function () {
        this._router.navigate(["/accounts/myAccounts"], {
            animated: false
        });
    };
    AccountsHomeComponent.prototype.callPhone = function (phoneNo) {
        if (app.android) {
            // android condition
            permissions.requestPermissions([android.Manifest.permission.CALL_PHONE], "App Needs The Following permissions")
                .then(function () {
                // Permission Granted
                phone.dial(phoneNo.toString(), true);
            })
                .catch(function () {
                // Permission Denied
            });
        }
        else {
            // ios
            phone.dial(phoneNo.toString(), true);
        }
    };
    AccountsHomeComponent.prototype.onTabChange = function (args) {
        var segmentedBar = args.object;
        switch (segmentedBar.selectedIndex) {
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
    AccountsHomeComponent.prototype.goBack = function () {
        this._router.back();
    };
    return AccountsHomeComponent;
}());
AccountsHomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "accountsHome.component.html",
        styleUrls: ["../accounts.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        accounts_service_1.AccountService,
        page_1.Page])
], AccountsHomeComponent);
exports.AccountsHomeComponent = AccountsHomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHNIb21lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnRzSG9tZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFDakUsa0VBQWtFO0FBQ2xFLDJFQUEyRTtBQUMzRSxrREFBa0U7QUFDbEUsc0RBQStEO0FBQy9ELHdEQUFxRDtBQUVyRCxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBQ3hELDBDQUE0QztBQUM1QyxnQ0FBK0I7QUFTL0IsSUFBYSxxQkFBcUI7SUFnQjlCLCtCQUFvQixPQUF5QixFQUNqQyxlQUErQixFQUMvQixJQUFVO1FBRkYsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDakMsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLFNBQUksR0FBSixJQUFJLENBQU07UUFoQmYsVUFBSyxHQUFHLGVBQWUsQ0FBQztRQUV4QiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0Isd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBSTVCLHVCQUFrQixHQUFtQixFQUFFLENBQUM7UUFDeEMscUJBQWdCLEdBQW1CLEVBQUUsQ0FBQztRQUU3QyxrQkFBYSxHQUFZLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFZLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBWSxDQUFDLENBQUM7UUFLNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksZ0JBQWdCLEdBQXVDLElBQUksZ0NBQWdCLEVBQUUsQ0FBQztRQUNsRixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFckMsSUFBSSxnQkFBZ0IsR0FBdUMsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFD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LEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztLQUNqQyxDQUFDO3FDQWtCK0IseUJBQWdCO1FBQ2hCLGlDQUFjO1FBQ3pCLFdBQUk7R0FsQmIscUJBQXFCLENBaUdqQztBQWpHWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vLyBpbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuLy8gaW1wb3J0ICogYXMgc2VnbWVudGVkQmFyTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tIFwiLi4vYWNjb3VudHMuc2VydmljZVwiO1xuaW1wb3J0IHsgQWNjb3VudE1vZGVsIH0gZnJvbSBcIi4uL2FjY291bnRzLm1vZGVsXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIHBlcm1pc3Npb25zIGZyb20gXCJuYXRpdmVzY3JpcHQtcGVybWlzc2lvbnNcIjtcbmltcG9ydCAqIGFzIHBob25lIGZyb20gXCJuYXRpdmVzY3JpcHQtcGhvbmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJhY2NvdW50c0hvbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4uL2FjY291bnRzLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEFjY291bnRzSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBwdWJsaWMgdGl0bGUgPSBcIk15IEZpbmFuY2lhbHNcIjtcblxuICAgIHB1YmxpYyBpc0N1cnJlbnRZZWFyU2VsZWN0ZWQgPSB0cnVlO1xuICAgIHB1YmxpYyBpc1ByaW9yWWVhclNlbGVjdGVkID0gZmFsc2U7XG4gICAgcHVibGljIHRhYkl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPjtcblxuICAgIHB1YmxpYyBhY3Rpb25JdGVtQ291bnQ6IG51bWJlcjtcbiAgICBwdWJsaWMgY3VycmVudEFjY291bnRMaXN0OiBBY2NvdW50TW9kZWxbXSA9IFtdO1xuICAgIHB1YmxpYyBwcmlvckFjY291bnRMaXN0OiBBY2NvdW50TW9kZWxbXSA9IFtdO1xuXG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XG4gICAgcGFnZUVuZFRpbWUgOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX2FjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIHRoaXMudGFiSXRlbXMgPSBbXTtcbiAgICAgICAgbGV0IHRtcFNlZ21lbnRlZEJhcjE6IFNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICB0bXBTZWdtZW50ZWRCYXIxLnRpdGxlID0gXCIyMDE3XCI7XG4gICAgICAgIHRoaXMudGFiSXRlbXMucHVzaCh0bXBTZWdtZW50ZWRCYXIxKTtcblxuICAgICAgICBsZXQgdG1wU2VnbWVudGVkQmFyMjogU2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgIHRtcFNlZ21lbnRlZEJhcjIudGl0bGUgPSBcIlByaW9yIFllYXJcIjtcbiAgICAgICAgdGhpcy50YWJJdGVtcy5wdXNoKHRtcFNlZ21lbnRlZEJhcjIpO1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBsZXQgYWNjb3VudHNEYXRhID0gdGhpcy5fYWNjb3VudFNlcnZpY2UuZ2V0QWxsQWNjb3VudHMoKTtcblxuICAgICAgICB0aGlzLmFjdGlvbkl0ZW1Db3VudCA9IGFjY291bnRzRGF0YS5hY3Rpb25JdGVtcztcbiAgICAgICAgLy8gQ3VycmVudCBZZWFyXG4gICAgICAgIHRoaXMuY3VycmVudEFjY291bnRMaXN0ID0gYWNjb3VudHNEYXRhLmFjY291bnQuY3VycmVudFllYXIuYWNjb3VudHM7XG5cbiAgICAgICAgLy8gUHJpb3IgWWVhclxuICAgICAgICB0aGlzLnByaW9yQWNjb3VudExpc3QgPSBhY2NvdW50c0RhdGEuYWNjb3VudC5wcmlvclllYXIuYWNjb3VudHM7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ29Ub015QWNjb3VudHMoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvYWNjb3VudHMvbXlBY2NvdW50c1wiXSwge1xuICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsbFBob25lKHBob25lTm8pIHtcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XG4gICAgICAgICAgICAvLyBhbmRyb2lkIGNvbmRpdGlvblxuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFthbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQ0FMTF9QSE9ORV0sXG4gICAgICAgICAgICAgICAgXCJBcHAgTmVlZHMgVGhlIEZvbGxvd2luZyBwZXJtaXNzaW9uc1wiKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVybWlzc2lvbiBHcmFudGVkXG4gICAgICAgICAgICAgICAgICAgIHBob25lLmRpYWwocGhvbmVOby50b1N0cmluZygpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBlcm1pc3Npb24gRGVuaWVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpb3NcbiAgICAgICAgICAgIHBob25lLmRpYWwocGhvbmVOby50b1N0cmluZygpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblRhYkNoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBzd2l0Y2ggKHNlZ21lbnRlZEJhci5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRZZWFyU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmlvclllYXJTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50WWVhclNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW9yWWVhclNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIuYmFjaygpO1xuICAgIH1cblxuXG59XG4iXX0=