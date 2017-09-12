"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_adobe_analytics_1 = require("nativescript-adobe-analytics");
var platform_1 = require("tns-core-modules/platform");
var AdobeDemoAppDelegate = (function () {
    function AdobeDemoAppDelegate() {
        if (!platform_1.isIOS) {
            nativescript_adobe_analytics_1.AdobeAnalytics.configure({ sample: 'Mohammad testing Android' }, true);
        }
    }
    return AdobeDemoAppDelegate;
}());
exports.AdobeDemoAppDelegate = AdobeDemoAppDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvYmUuZGVsZWdhdGUuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkb2JlLmRlbGVnYXRlLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBOEQ7QUFDOUQsc0RBQWtEO0FBRWxEO0lBRUk7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1QsNkNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0wsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZG9iZUFuYWx5dGljcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hZG9iZS1hbmFseXRpY3MnO1xuaW1wb3J0IHsgaXNJT1MgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtJztcblxuZXhwb3J0IGNsYXNzIEFkb2JlRGVtb0FwcERlbGVnYXRlIHsgXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKCFpc0lPUykge1xuICAgICAgICAgICAgQWRvYmVBbmFseXRpY3MuY29uZmlndXJlKHsgc2FtcGxlOiAnTW9oYW1tYWQgdGVzdGluZyBBbmRyb2lkJyB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=