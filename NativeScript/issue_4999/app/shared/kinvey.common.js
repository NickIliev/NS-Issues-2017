"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kinvey_nativescript_sdk_1 = require("kinvey-nativescript-sdk");
var config_1 = require("./config");
/* ***********************************************************
* The {N} Kinvey plugin initialization is explained in the plugin readme here:
* http://devcenter.kinvey.com/nativescript/guides/getting-started#ConfigureYourApp
* In this template, Kinvey is set up with a custom existing project, so that
* You can build and run this template without creating your own Kinvey project.
*************************************************************/
kinvey_nativescript_sdk_1.Kinvey.init({
    appKey: config_1.Config.kinveyAppKey,
    appSecret: config_1.Config.kinveyAppSecret
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ludmV5LmNvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImtpbnZleS5jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBaUQ7QUFFakQsbUNBQWtDO0FBRWxDOzs7Ozs4REFLOEQ7QUFFOUQsZ0NBQU0sQ0FBQyxJQUFJLENBQUM7SUFDUixNQUFNLEVBQUUsZUFBTSxDQUFDLFlBQVk7SUFDM0IsU0FBUyxFQUFFLGVBQU0sQ0FBQyxlQUFlO0NBQ3BDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEtpbnZleSB9IGZyb20gXCJraW52ZXktbmF0aXZlc2NyaXB0LXNka1wiO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogVGhlIHtOfSBLaW52ZXkgcGx1Z2luIGluaXRpYWxpemF0aW9uIGlzIGV4cGxhaW5lZCBpbiB0aGUgcGx1Z2luIHJlYWRtZSBoZXJlOlxuKiBodHRwOi8vZGV2Y2VudGVyLmtpbnZleS5jb20vbmF0aXZlc2NyaXB0L2d1aWRlcy9nZXR0aW5nLXN0YXJ0ZWQjQ29uZmlndXJlWW91ckFwcFxuKiBJbiB0aGlzIHRlbXBsYXRlLCBLaW52ZXkgaXMgc2V0IHVwIHdpdGggYSBjdXN0b20gZXhpc3RpbmcgcHJvamVjdCwgc28gdGhhdFxuKiBZb3UgY2FuIGJ1aWxkIGFuZCBydW4gdGhpcyB0ZW1wbGF0ZSB3aXRob3V0IGNyZWF0aW5nIHlvdXIgb3duIEtpbnZleSBwcm9qZWN0LlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuS2ludmV5LmluaXQoe1xuICAgIGFwcEtleTogQ29uZmlnLmtpbnZleUFwcEtleSxcbiAgICBhcHBTZWNyZXQ6IENvbmZpZy5raW52ZXlBcHBTZWNyZXRcbn0pO1xuIl19