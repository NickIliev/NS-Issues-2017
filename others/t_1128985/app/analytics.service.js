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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmFseXRpY3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2RUFBOEQ7QUFJOUQsSUFBYSxnQkFBZ0I7SUFJekI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNkNBQWMsRUFBRSxDQUFDO1FBQ3ZDLGdCQUFnQjtRQUNoQixzRUFBc0U7UUFDdEUsSUFBSTtJQUNSLENBQUM7SUFFRCxzQkFBVyxvQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLGdCQUFnQjtJQUQ1QixpQkFBVSxFQUFFOztHQUNBLGdCQUFnQixDQWM1QjtBQWRZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkb2JlQW5hbHl0aWNzIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFkb2JlLWFuYWx5dGljcyc7XG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0nO1xuXG5ASW5qZWN0YWJsZSgpIFxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfYW5hbHl0aWNzOiBBZG9iZUFuYWx5dGljcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9hbmFseXRpY3MgPSBuZXcgQWRvYmVBbmFseXRpY3MoKTtcbiAgICAgICAgLy8gaWYgKCFpc0lPUykge1xuICAgICAgICAvLyAgICAgQWRvYmVBbmFseXRpY3MuY29uZmlndXJlKHsgc2FtcGxlOiAnTmF0aGFuIHRlc3RpbmcgQW5kcm9pZCcgfSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBsdWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuYWx5dGljcztcbiAgICB9XG59Il19