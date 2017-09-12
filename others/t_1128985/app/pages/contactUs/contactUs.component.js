"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var global_1 = require("../../shared/global");
var app = require("tns-core-modules/application");
var permissions = require("nativescript-permissions");
var phone = require("nativescript-phone");
var page_1 = require("ui/page");
var ContactUsComponent = (function () {
    function ContactUsComponent(_router, _globals, page) {
        this._router = _router;
        this._globals = _globals;
        this.page = page;
        this.contactUsData = null;
        this.togglePanel = -1;
        this.timePeriod = true;
        this.isLoggedIn = false;
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.pageStartTime = new Date().getTime();
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.isLoggedIn = this._globals.isLoggedIn;
        this.title = "Contact Us";
        // this.contactUsData = {
        //     "memberServiceOperationHour": "Monday - Friday 8am - 6pm EST",
        //     "memberServiceNumber": "1-888-247-2583",
        //     "memberServiceNumberUnauthenticated": "1-888-247-BLUE (2583)",
        //     "fromTime": "8am",
        //     "toTime": "6pm",
        //     "additionalCallService": [{
        //         "title": "Financial Accounts",
        //         "operationTime": "Monday - Fri 8am - 6pm EST",
        //         "phoneNumberList": [{
        //             "displayPhoneNumber": "1-888-123-4567",
        //             "phoneNumber": "1-888-123-4567",
        //             "title": "Financial Account Support:",
        //             "availableTime": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         }]
        //     }, {
        //         "title": "Clinical Support",
        //         "operationTime": "Monday - Fri 8am - 6pm EST",
        //         "phoneNumberList": [{
        //             "displayPhoneNumber": "1-800-444-2426",
        //             "phoneNumber": "1-800-444-2426",
        //             "title": "Behavioral Health & \nSubstance Abuse",
        //             "available": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         },
        //         {
        //             "displayPhoneNumber": "1-800-247-BLUE (2583)",
        //             "phoneNumber": "1-800-247-4567",
        //             "title": "Nurse Care Line / \nBlue Care Line",
        //             "available": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         },
        //         {
        //             "displayPhoneNumber": "1-800-892-5119",
        //             "phoneNumber": "1-800-892-5119",
        //             "title": "Mail Service Pharmarcy",
        //             "available": {
        //                 "fromTime": "8am",
        //                 "toTime": "6pm"
        //             }
        //         }]
        //     }]
        // };
        var getTime = new Date();
        this.timePeriod = (getTime.getHours() >= 8 && getTime.getHours() < 18);
    }
    ContactUsComponent.prototype.ngOnInit = function () {
        //this.pageStartTime = new Date().getTime();
    };
    ContactUsComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    /* CALL AND ADD TO CONTACTS */
    ContactUsComponent.prototype.callPhone = function (phoneNo) {
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
    ContactUsComponent.prototype.tabClick = function (index) {
        this.togglePanel = this.togglePanel === index ? -1 : index;
    };
    ContactUsComponent.prototype.goBack = function () {
        this._router.back();
    };
    return ContactUsComponent;
}());
ContactUsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./contactUs.component.html",
        styleUrls: ["contactUs.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        global_1.Globals,
        page_1.Page])
], ContactUsComponent);
exports.ContactUsComponent = ContactUsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdFVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RVcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFDakUsc0RBQStEO0FBQy9ELDhDQUE4QztBQUM5QyxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBQ3hELDBDQUE0QztBQUM1QyxnQ0FBK0I7QUFRL0IsSUFBYSxrQkFBa0I7SUFZM0IsNEJBQTJCLE9BQXlCLEVBQ3pDLFFBQWlCLEVBQ2pCLElBQVU7UUFGTSxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQU07UUFYZCxrQkFBYSxHQUFRLElBQUksQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUVuQyxrQkFBYSxHQUFZLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFZLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBWSxDQUFDLENBQUM7UUFLNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7UUFDckUsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDMUIseUJBQXlCO1FBQ3pCLHFFQUFxRTtRQUNyRSwrQ0FBK0M7UUFDL0MscUVBQXFFO1FBQ3JFLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsa0NBQWtDO1FBQ2xD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eyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIHBlcm1pc3Npb25zIGZyb20gXCJuYXRpdmVzY3JpcHQtcGVybWlzc2lvbnNcIjtcbmltcG9ydCAqIGFzIHBob25lIGZyb20gXCJuYXRpdmVzY3JpcHQtcGhvbmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NvbnRhY3RVcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiY29udGFjdFVzLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDb250YWN0VXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgcHVibGljIHRpdGxlOiBTdHJpbmc7XG4gICAgcHVibGljIGNvbnRhY3RVc0RhdGE6IGFueSA9IG51bGw7XG4gICAgcHVibGljIHRvZ2dsZVBhbmVsOiBudW1iZXIgPSAtMTtcbiAgICBwdWJsaWMgdGltZVBlcmlvZDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzTG9nZ2VkSW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHBhZ2VTdGFydFRpbWUgOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VFbmRUaW1lIDogbnVtYmVyID0gMDtcbiAgICBwYWdlVGltZURpZmZlcmVuY2UgOiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxuICAgICAgICBwdWJsaWMgcGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNMb2dnZWRJbiA9IHRoaXMuX2dsb2JhbHMuaXNMb2dnZWRJbjtcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiQ29udGFjdCBVc1wiO1xuICAgICAgICAvLyB0aGlzLmNvbnRhY3RVc0RhdGEgPSB7XG4gICAgICAgIC8vICAgICBcIm1lbWJlclNlcnZpY2VPcGVyYXRpb25Ib3VyXCI6IFwiTW9uZGF5IC0gRnJpZGF5IDhhbSAtIDZwbSBFU1RcIixcbiAgICAgICAgLy8gICAgIFwibWVtYmVyU2VydmljZU51bWJlclwiOiBcIjEtODg4LTI0Ny0yNTgzXCIsXG4gICAgICAgIC8vICAgICBcIm1lbWJlclNlcnZpY2VOdW1iZXJVbmF1dGhlbnRpY2F0ZWRcIjogXCIxLTg4OC0yNDctQkxVRSAoMjU4MylcIixcbiAgICAgICAgLy8gICAgIFwiZnJvbVRpbWVcIjogXCI4YW1cIixcbiAgICAgICAgLy8gICAgIFwidG9UaW1lXCI6IFwiNnBtXCIsXG4gICAgICAgIC8vICAgICBcImFkZGl0aW9uYWxDYWxsU2VydmljZVwiOiBbe1xuICAgICAgICAvLyAgICAgICAgIFwidGl0bGVcIjogXCJGaW5hbmNpYWwgQWNjb3VudHNcIixcbiAgICAgICAgLy8gICAgICAgICBcIm9wZXJhdGlvblRpbWVcIjogXCJNb25kYXkgLSBGcmkgOGFtIC0gNnBtIEVTVFwiLFxuICAgICAgICAvLyAgICAgICAgIFwicGhvbmVOdW1iZXJMaXN0XCI6IFt7XG4gICAgICAgIC8vICAgICAgICAgICAgIFwiZGlzcGxheVBob25lTnVtYmVyXCI6IFwiMS04ODgtMTIzLTQ1NjdcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJwaG9uZU51bWJlclwiOiBcIjEtODg4LTEyMy00NTY3XCIsXG4gICAgICAgIC8vICAgICAgICAgICAgIFwidGl0bGVcIjogXCJGaW5hbmNpYWwgQWNjb3VudCBTdXBwb3J0OlwiLFxuICAgICAgICAvLyAgICAgICAgICAgICBcImF2YWlsYWJsZVRpbWVcIjoge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJmcm9tVGltZVwiOiBcIjhhbVwiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJ0b1RpbWVcIjogXCI2cG1cIlxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfV1cbiAgICAgICAgLy8gICAgIH0sIHtcbiAgICAgICAgLy8gICAgICAgICBcInRpdGxlXCI6IFwiQ2xpbmljYWwgU3VwcG9ydFwiLFxuICAgICAgICAvLyAgICAgICAgIFwib3BlcmF0aW9uVGltZVwiOiBcIk1vbmRheSAtIEZyaSA4YW0gLSA2cG0gRVNUXCIsXG4gICAgICAgIC8vICAgICAgICAgXCJwaG9uZU51bWJlckxpc3RcIjogW3tcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJkaXNwbGF5UGhvbmVOdW1iZXJcIjogXCIxLTgwMC00NDQtMjQyNlwiLFxuICAgICAgICAvLyAgICAgICAgICAgICBcInBob25lTnVtYmVyXCI6IFwiMS04MDAtNDQ0LTI0MjZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkJlaGF2aW9yYWwgSGVhbHRoICYgXFxuU3Vic3RhbmNlIEFidXNlXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwiZnJvbVRpbWVcIjogXCI4YW1cIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwidG9UaW1lXCI6IFwiNnBtXCJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAge1xuICAgICAgICAvLyAgICAgICAgICAgICBcImRpc3BsYXlQaG9uZU51bWJlclwiOiBcIjEtODAwLTI0Ny1CTFVFICgyNTgzKVwiLFxuICAgICAgICAvLyAgICAgICAgICAgICBcInBob25lTnVtYmVyXCI6IFwiMS04MDAtMjQ3LTQ1NjdcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk51cnNlIENhcmUgTGluZSAvIFxcbkJsdWUgQ2FyZSBMaW5lXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwiZnJvbVRpbWVcIjogXCI4YW1cIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwidG9UaW1lXCI6IFwiNnBtXCJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAge1xuICAgICAgICAvLyAgICAgICAgICAgICBcImRpc3BsYXlQaG9uZU51bWJlclwiOiBcIjEtODAwLTg5Mi01MTE5XCIsXG4gICAgICAgIC8vICAgICAgICAgICAgIFwicGhvbmVOdW1iZXJcIjogXCIxLTgwMC04OTItNTExOVwiLFxuICAgICAgICAvLyAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTWFpbCBTZXJ2aWNlIFBoYXJtYXJjeVwiLFxuICAgICAgICAvLyAgICAgICAgICAgICBcImF2YWlsYWJsZVwiOiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcImZyb21UaW1lXCI6IFwiOGFtXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcInRvVGltZVwiOiBcIjZwbVwiXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XVxuICAgICAgICAvLyAgICAgfV1cbiAgICAgICAgLy8gfTtcbiAgICAgICAgbGV0IGdldFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnRpbWVQZXJpb2QgPSAoZ2V0VGltZS5nZXRIb3VycygpID49IDggJiYgZ2V0VGltZS5nZXRIb3VycygpIDwgMTgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL3RoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICAvKiBDQUxMIEFORCBBREQgVE8gQ09OVEFDVFMgKi9cblxuICAgIHB1YmxpYyBjYWxsUGhvbmUocGhvbmVObykge1xuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIC8vIGFuZHJvaWQgY29uZGl0aW9uXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbnMoW2FuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQUxMX1BIT05FXSxcbiAgICAgICAgICAgICAgICBcIkFwcCBOZWVkcyBUaGUgRm9sbG93aW5nIHBlcm1pc3Npb25zXCIpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBQZXJtaXNzaW9uIEdyYW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcGhvbmUuZGlhbChwaG9uZU5vLnRvU3RyaW5nKCksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVybWlzc2lvbiBEZW5pZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlvc1xuICAgICAgICAgICAgcGhvbmUuZGlhbChwaG9uZU5vLnRvU3RyaW5nKCksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGFiQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy50b2dnbGVQYW5lbCA9IHRoaXMudG9nZ2xlUGFuZWwgPT09IGluZGV4ID8gLTEgOiBpbmRleDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIuYmFjaygpO1xuICAgIH1cblxufSJdfQ==