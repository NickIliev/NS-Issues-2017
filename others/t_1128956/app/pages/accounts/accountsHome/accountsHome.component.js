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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHNIb21lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnRzSG9tZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFDakUsa0VBQWtFO0FBQ2xFLDJFQUEyRTtBQUMzRSxrREFBa0U7QUFDbEUsc0RBQStEO0FBQy9ELHdEQUFxRDtBQUVyRCxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBQ3hELDBDQUE0QztBQUM1QyxnQ0FBK0I7QUFTL0IsSUFBYSxxQkFBcUI7SUFnQjlCLCtCQUFvQixPQUF5QixFQUNqQyxlQUErQixFQUMvQixJQUFVO1FBRkYsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDakMsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLFNBQUksR0FBSixJQUFJLENBQU07UUFoQmYsVUFBSyxHQUFHLGVBQWUsQ0FBQztRQUV4QiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0Isd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBSTVCLHVCQUFrQixHQUFtQixFQUFFLENBQUM7UUFDeEMscUJBQWdCLEdBQW1CLEVBQUUsQ0FBQztRQUU3QyxrQkFBYSxHQUFZLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFZLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBWSxDQUFDLENBQUM7UUFLNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksZ0JBQWdCLEdBQXVDLElBQUksZ0NBQWdCLEVBQUUsQ0FBQztRQUNsRixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFckMsSUFBSSxnQkFBZ0IsR0FBdUMsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1FBQ2xGLGdCQUFnQixDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7SUFFTCxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUVJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQ2hELGVBQWU7UUFDZixJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRXBFLGFBQWE7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQ3BFLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDcEUsQ0FBQztJQUVNLDhDQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQzNDLFFBQVEsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5Q0FBUyxHQUFoQixVQUFpQixPQUFPO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2Qsb0JBQW9CO1lBQ3BCLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUNuRSxxQ0FBcUMsQ0FBQztpQkFDckMsSUFBSSxDQUFDO2dCQUNGLHFCQUFxQjtnQkFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQztnQkFDSCxvQkFBb0I7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixNQUFNO1lBQ04sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNMLENBQUM7SUFFTSwyQ0FBVyxHQUFsQixVQUFtQixJQUFJO1FBQ25CLElBQUksWUFBWSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNqQyxLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNwQztnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFHTCw0QkFBQztBQUFELENBQUMsQUFqR0QsSUFpR0M7QUFqR1kscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztLQUNqQyxDQUFDO3FDQWtCK0IseUJBQWdCO1FBQ2hCLGlDQUFjO1FBQ3pCLFdBQUk7R0FsQmIscUJBQXFCLENBaUdqQztBQWpHWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIGltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbi8vIGltcG9ydCAqIGFzIHNlZ21lbnRlZEJhck1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSBcIi4uL2FjY291bnRzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQWNjb3VudE1vZGVsIH0gZnJvbSBcIi4uL2FjY291bnRzLm1vZGVsXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCI7XHJcbmltcG9ydCAqIGFzIHBob25lIGZyb20gXCJuYXRpdmVzY3JpcHQtcGhvbmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmRlY2xhcmUgdmFyIGFuZHJvaWQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhY2NvdW50c0hvbWUuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi4vYWNjb3VudHMuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQWNjb3VudHNIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICBwdWJsaWMgdGl0bGUgPSBcIk15IEZpbmFuY2lhbHNcIjtcclxuXHJcbiAgICBwdWJsaWMgaXNDdXJyZW50WWVhclNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc1ByaW9yWWVhclNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgdGFiSXRlbXM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xyXG5cclxuICAgIHB1YmxpYyBhY3Rpb25JdGVtQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjdXJyZW50QWNjb3VudExpc3Q6IEFjY291bnRNb2RlbFtdID0gW107XHJcbiAgICBwdWJsaWMgcHJpb3JBY2NvdW50TGlzdDogQWNjb3VudE1vZGVsW10gPSBbXTtcclxuXHJcbiAgICBwYWdlU3RhcnRUaW1lIDogbnVtYmVyID0gMDtcclxuICAgIHBhZ2VFbmRUaW1lIDogbnVtYmVyID0gMDtcclxuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgX2FjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcclxuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWJJdGVtcyA9IFtdO1xyXG4gICAgICAgIGxldCB0bXBTZWdtZW50ZWRCYXIxOiBTZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcclxuICAgICAgICB0bXBTZWdtZW50ZWRCYXIxLnRpdGxlID0gXCIyMDE3XCI7XHJcbiAgICAgICAgdGhpcy50YWJJdGVtcy5wdXNoKHRtcFNlZ21lbnRlZEJhcjEpO1xyXG5cclxuICAgICAgICBsZXQgdG1wU2VnbWVudGVkQmFyMjogU2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XHJcbiAgICAgICAgdG1wU2VnbWVudGVkQmFyMi50aXRsZSA9IFwiUHJpb3IgWWVhclwiO1xyXG4gICAgICAgIHRoaXMudGFiSXRlbXMucHVzaCh0bXBTZWdtZW50ZWRCYXIyKTtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgbGV0IGFjY291bnRzRGF0YSA9IHRoaXMuX2FjY291bnRTZXJ2aWNlLmdldEFsbEFjY291bnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aW9uSXRlbUNvdW50ID0gYWNjb3VudHNEYXRhLmFjdGlvbkl0ZW1zO1xyXG4gICAgICAgIC8vIEN1cnJlbnQgWWVhclxyXG4gICAgICAgIHRoaXMuY3VycmVudEFjY291bnRMaXN0ID0gYWNjb3VudHNEYXRhLmFjY291bnQuY3VycmVudFllYXIuYWNjb3VudHM7XHJcblxyXG4gICAgICAgIC8vIFByaW9yIFllYXJcclxuICAgICAgICB0aGlzLnByaW9yQWNjb3VudExpc3QgPSBhY2NvdW50c0RhdGEuYWNjb3VudC5wcmlvclllYXIuYWNjb3VudHM7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLnBhZ2VUaW1lRGlmZmVyZW5jZSA9IHRoaXMucGFnZUVuZFRpbWUgLSB0aGlzLnBhZ2VTdGFydFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvVG9NeUFjY291bnRzKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvYWNjb3VudHMvbXlBY2NvdW50c1wiXSwge1xyXG4gICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGxQaG9uZShwaG9uZU5vKSB7XHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIC8vIGFuZHJvaWQgY29uZGl0aW9uXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9ucyhbYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLkNBTExfUEhPTkVdLFxyXG4gICAgICAgICAgICAgICAgXCJBcHAgTmVlZHMgVGhlIEZvbGxvd2luZyBwZXJtaXNzaW9uc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBlcm1pc3Npb24gR3JhbnRlZFxyXG4gICAgICAgICAgICAgICAgICAgIHBob25lLmRpYWwocGhvbmVOby50b1N0cmluZygpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBlcm1pc3Npb24gRGVuaWVkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlvc1xyXG4gICAgICAgICAgICBwaG9uZS5kaWFsKHBob25lTm8udG9TdHJpbmcoKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRhYkNoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21lbnRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc3dpdGNoIChzZWdtZW50ZWRCYXIuc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ3VycmVudFllYXJTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpb3JZZWFyU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ3VycmVudFllYXJTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW9yWWVhclNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlci5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=