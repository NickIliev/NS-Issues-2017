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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvYmUuZGVsZWdhdGUuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkb2JlLmRlbGVnYXRlLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBOEQ7QUFDOUQsc0RBQWtEO0FBRWxEO0lBRUk7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1QsNkNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0wsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZG9iZUFuYWx5dGljcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hZG9iZS1hbmFseXRpY3MnO1xyXG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFkb2JlRGVtb0FwcERlbGVnYXRlIHsgXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKCFpc0lPUykge1xyXG4gICAgICAgICAgICBBZG9iZUFuYWx5dGljcy5jb25maWd1cmUoeyBzYW1wbGU6ICdNb2hhbW1hZCB0ZXN0aW5nIEFuZHJvaWQnIH0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==