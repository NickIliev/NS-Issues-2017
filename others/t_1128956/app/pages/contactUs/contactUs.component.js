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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdFVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RVcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFDakUsc0RBQStEO0FBQy9ELDhDQUE4QztBQUM5QyxrREFBb0Q7QUFDcEQsc0RBQXdEO0FBQ3hELDBDQUE0QztBQUM1QyxnQ0FBK0I7QUFRL0IsSUFBYSxrQkFBa0I7SUFZM0IsNEJBQTJCLE9BQXlCLEVBQ3pDLFFBQWlCLEVBQ2pCLElBQVU7UUFGTSxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQU07UUFYZCxrQkFBYSxHQUFRLElBQUksQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUVuQyxrQkFBYSxHQUFZLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFZLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBWSxDQUFDLENBQUM7UUFLNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7UUFDckUsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDMUIseUJBQXlCO1FBQ3pCLHFFQUFxRTtRQUNyRSwrQ0FBK0M7UUFDL0MscUVBQXFFO1FBQ3JFLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsa0NBQWtDO1FBQ2xDLHlDQUF5QztRQUN6Qyx5REFBeUQ7UUFDekQsZ0NBQWdDO1FBQ2hDLHNEQUFzRDtRQUN0RCwrQ0FBK0M7UUFDL0MscURBQXFEO1FBQ3JELGlDQUFpQztRQUNqQyxxQ0FBcUM7UUFDckMsa0NBQWtDO1FBQ2xDLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsV0FBVztRQUNYLHVDQUF1QztRQUN2Qyx5REFBeUQ7UUFDekQsZ0NBQWdDO1FBQ2hDLHNEQUFzRDtRQUN0RCwrQ0FBK0M7UUFDL0MsZ0VBQWdFO1FBQ2hFLDZCQUE2QjtRQUM3QixxQ0FBcUM7UUFDckMsa0NBQWtDO1FBQ2xDLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsWUFBWTtRQUNaLDZEQUE2RDtRQUM3RCwrQ0FBK0M7UUFDL0MsNkRBQTZEO1FBQzdELDZCQUE2QjtRQUM3QixxQ0FBcUM7UUFDckMsa0NBQWtDO1FBQ2xDLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsWUFBWTtRQUNaLHNEQUFzRDtRQUN0RCwrQ0FBK0M7UUFDL0MsaURBQWlEO1FBQ2pELDZCQUE2QjtRQUM3QixxQ0FBcUM7UUFDckMsa0NBQWtDO1FBQ2xDLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsU0FBUztRQUNULEtBQUs7UUFDTCxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNJLDRDQUE0QztJQUNqRCxDQUFDO0lBRUEsNENBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3BFLENBQUM7SUFFRCw4QkFBOEI7SUFFdkIsc0NBQVMsR0FBaEIsVUFBaUIsT0FBTztRQUNwQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLG9CQUFvQjtZQUNwQixXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFDbkUscUNBQXFDLENBQUM7aUJBQ3JDLElBQUksQ0FBQztnQkFDRixxQkFBcUI7Z0JBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUM7Z0JBQ0gsb0JBQW9CO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsTUFBTTtZQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQVEsR0FBUixVQUFTLEtBQUs7UUFDVixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMvRCxDQUFDO0lBRU0sbUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVMLHlCQUFDO0FBQUQsQ0FBQyxBQWxIRCxJQWtIQztBQWxIWSxrQkFBa0I7SUFMOUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUMvQixDQUFDO3FDQWFzQyx5QkFBZ0I7UUFDL0IsZ0JBQU87UUFDWCxXQUFJO0dBZFosa0JBQWtCLENBa0g5QjtBQWxIWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xyXG5pbXBvcnQgKiBhcyBwaG9uZSBmcm9tIFwibmF0aXZlc2NyaXB0LXBob25lXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5kZWNsYXJlIHZhciBhbmRyb2lkO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jb250YWN0VXMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiY29udGFjdFVzLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGFjdFVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICBwdWJsaWMgdGl0bGU6IFN0cmluZztcclxuICAgIHB1YmxpYyBjb250YWN0VXNEYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIHRvZ2dsZVBhbmVsOiBudW1iZXIgPSAtMTtcclxuICAgIHB1YmxpYyB0aW1lUGVyaW9kOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc0xvZ2dlZEluOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlRW5kVGltZSA6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlVGltZURpZmZlcmVuY2UgOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxyXG4gICAgICAgIHB1YmxpYyBwYWdlOiBQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0xvZ2dlZEluID0gdGhpcy5fZ2xvYmFscy5pc0xvZ2dlZEluO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBcIkNvbnRhY3QgVXNcIjtcclxuICAgICAgICAvLyB0aGlzLmNvbnRhY3RVc0RhdGEgPSB7XHJcbiAgICAgICAgLy8gICAgIFwibWVtYmVyU2VydmljZU9wZXJhdGlvbkhvdXJcIjogXCJNb25kYXkgLSBGcmlkYXkgOGFtIC0gNnBtIEVTVFwiLFxyXG4gICAgICAgIC8vICAgICBcIm1lbWJlclNlcnZpY2VOdW1iZXJcIjogXCIxLTg4OC0yNDctMjU4M1wiLFxyXG4gICAgICAgIC8vICAgICBcIm1lbWJlclNlcnZpY2VOdW1iZXJVbmF1dGhlbnRpY2F0ZWRcIjogXCIxLTg4OC0yNDctQkxVRSAoMjU4MylcIixcclxuICAgICAgICAvLyAgICAgXCJmcm9tVGltZVwiOiBcIjhhbVwiLFxyXG4gICAgICAgIC8vICAgICBcInRvVGltZVwiOiBcIjZwbVwiLFxyXG4gICAgICAgIC8vICAgICBcImFkZGl0aW9uYWxDYWxsU2VydmljZVwiOiBbe1xyXG4gICAgICAgIC8vICAgICAgICAgXCJ0aXRsZVwiOiBcIkZpbmFuY2lhbCBBY2NvdW50c1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgXCJvcGVyYXRpb25UaW1lXCI6IFwiTW9uZGF5IC0gRnJpIDhhbSAtIDZwbSBFU1RcIixcclxuICAgICAgICAvLyAgICAgICAgIFwicGhvbmVOdW1iZXJMaXN0XCI6IFt7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJkaXNwbGF5UGhvbmVOdW1iZXJcIjogXCIxLTg4OC0xMjMtNDU2N1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwicGhvbmVOdW1iZXJcIjogXCIxLTg4OC0xMjMtNDU2N1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwidGl0bGVcIjogXCJGaW5hbmNpYWwgQWNjb3VudCBTdXBwb3J0OlwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiYXZhaWxhYmxlVGltZVwiOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwiZnJvbVRpbWVcIjogXCI4YW1cIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJ0b1RpbWVcIjogXCI2cG1cIlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIH1dXHJcbiAgICAgICAgLy8gICAgIH0sIHtcclxuICAgICAgICAvLyAgICAgICAgIFwidGl0bGVcIjogXCJDbGluaWNhbCBTdXBwb3J0XCIsXHJcbiAgICAgICAgLy8gICAgICAgICBcIm9wZXJhdGlvblRpbWVcIjogXCJNb25kYXkgLSBGcmkgOGFtIC0gNnBtIEVTVFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgXCJwaG9uZU51bWJlckxpc3RcIjogW3tcclxuICAgICAgICAvLyAgICAgICAgICAgICBcImRpc3BsYXlQaG9uZU51bWJlclwiOiBcIjEtODAwLTQ0NC0yNDI2XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJwaG9uZU51bWJlclwiOiBcIjEtODAwLTQ0NC0yNDI2XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkJlaGF2aW9yYWwgSGVhbHRoICYgXFxuU3Vic3RhbmNlIEFidXNlXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJhdmFpbGFibGVcIjoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcImZyb21UaW1lXCI6IFwiOGFtXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwidG9UaW1lXCI6IFwiNnBtXCJcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiZGlzcGxheVBob25lTnVtYmVyXCI6IFwiMS04MDAtMjQ3LUJMVUUgKDI1ODMpXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJwaG9uZU51bWJlclwiOiBcIjEtODAwLTI0Ny00NTY3XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk51cnNlIENhcmUgTGluZSAvIFxcbkJsdWUgQ2FyZSBMaW5lXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJhdmFpbGFibGVcIjoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcImZyb21UaW1lXCI6IFwiOGFtXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFwidG9UaW1lXCI6IFwiNnBtXCJcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiZGlzcGxheVBob25lTnVtYmVyXCI6IFwiMS04MDAtODkyLTUxMTlcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICBcInBob25lTnVtYmVyXCI6IFwiMS04MDAtODkyLTUxMTlcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTWFpbCBTZXJ2aWNlIFBoYXJtYXJjeVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXCJmcm9tVGltZVwiOiBcIjhhbVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBcInRvVGltZVwiOiBcIjZwbVwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgfV1cclxuICAgICAgICAvLyAgICAgfV1cclxuICAgICAgICAvLyB9O1xyXG4gICAgICAgIGxldCBnZXRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLnRpbWVQZXJpb2QgPSAoZ2V0VGltZS5nZXRIb3VycygpID49IDggJiYgZ2V0VGltZS5nZXRIb3VycygpIDwgMTgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBDQUxMIEFORCBBREQgVE8gQ09OVEFDVFMgKi9cclxuXHJcbiAgICBwdWJsaWMgY2FsbFBob25lKHBob25lTm8pIHtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgLy8gYW5kcm9pZCBjb25kaXRpb25cclxuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFthbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQ0FMTF9QSE9ORV0sXHJcbiAgICAgICAgICAgICAgICBcIkFwcCBOZWVkcyBUaGUgRm9sbG93aW5nIHBlcm1pc3Npb25zXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVybWlzc2lvbiBHcmFudGVkXHJcbiAgICAgICAgICAgICAgICAgICAgcGhvbmUuZGlhbChwaG9uZU5vLnRvU3RyaW5nKCksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVybWlzc2lvbiBEZW5pZWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaW9zXHJcbiAgICAgICAgICAgIHBob25lLmRpYWwocGhvbmVOby50b1N0cmluZygpLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGFiQ2xpY2soaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZVBhbmVsID0gdGhpcy50b2dnbGVQYW5lbCA9PT0gaW5kZXggPyAtMSA6IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyLmJhY2soKTtcclxuICAgIH1cclxuXHJcbn0iXX0=