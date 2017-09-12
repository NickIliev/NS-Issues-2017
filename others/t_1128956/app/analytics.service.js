"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_adobe_analytics_1 = require("nativescript-adobe-analytics");
var AnalyticsService = (function () {
    function AnalyticsService() {
        this._analytics = new nativescript_adobe_analytics_1.AdobeAnalytics();
        // if (!isIOS) {
        //     AdobeAnalytics.configure({ sample: 'Nathan testing Android' });
        // }
    }
    Object.defineProperty(AnalyticsService.prototype, "plugin", {
        get: function () {
            return this._analytics;
        },
        enumerable: true,
        configurable: true
    });
    return AnalyticsService;
}());
AnalyticsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AnalyticsService);
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmFseXRpY3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2RUFBOEQ7QUFJOUQsSUFBYSxnQkFBZ0I7SUFJekI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNkNBQWMsRUFBRSxDQUFDO1FBQ3ZDLGdCQUFnQjtRQUNoQixzRUFBc0U7UUFDdEUsSUFBSTtJQUNSLENBQUM7SUFFRCxzQkFBVyxvQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLGdCQUFnQjtJQUQ1QixpQkFBVSxFQUFFOztHQUNBLGdCQUFnQixDQWM1QjtBQWRZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tICduYXRpdmVzY3JpcHQtYWRvYmUtYW5hbHl0aWNzJztcclxuaW1wb3J0IHsgaXNJT1MgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtJztcclxuXHJcbkBJbmplY3RhYmxlKCkgXHJcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9hbmFseXRpY3M6IEFkb2JlQW5hbHl0aWNzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2FuYWx5dGljcyA9IG5ldyBBZG9iZUFuYWx5dGljcygpO1xyXG4gICAgICAgIC8vIGlmICghaXNJT1MpIHtcclxuICAgICAgICAvLyAgICAgQWRvYmVBbmFseXRpY3MuY29uZmlndXJlKHsgc2FtcGxlOiAnTmF0aGFuIHRlc3RpbmcgQW5kcm9pZCcgfSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGx1Z2luKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbmFseXRpY3M7XHJcbiAgICB9XHJcbn0iXX0=