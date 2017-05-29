"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomAppDelegate = (function (_super) {
    __extends(CustomAppDelegate, _super);
    function CustomAppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAppDelegate.prototype.applicationDidEnterBackground = function (application) {
        console.log("applicationDidEnterBackground");
    };
    CustomAppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        console.log("applicationDidFinishLaunchingWithOptions");
        return CustomAppDelegate._promise("applicationDidFinishLaunchingWithOptions", { application: application, launchOptions: launchOptions });
    };
    CustomAppDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
        console.log("applicationOpenURLOptions");
        return CustomAppDelegate._promise("applicationOpenURLOptions", { application: application, url: url, options: options });
    };
    CustomAppDelegate.prototype.applicationContinueUserActivityRestorationHandler = function (application, userActivity, restorationHandler) {
        console.log("applicationContinueUserActivityRestorationHandler");
        return CustomAppDelegate._promise("applicationContinueUserActivityRestorationHandler", { application: application, userActivity: userActivity, restorationHandler: restorationHandler });
    };
    CustomAppDelegate._promise = function (fn, args) {
        var constants = {
            state: args.application.applicationState
        };
        var promise = Promise.resolve().then(function () {
            return { fn: fn, args: args, constants: constants };
        });
        var entry;
        if (!(entry = this._queue[fn])) {
            entry = { callbacks: [], promise: promise };
            this._queue[fn] = entry;
            return entry;
        }
        entry.promise = promise;
        if (entry.callbacks.length > 0) {
            entry.callbacks.forEach(function (callback) {
                entry.promise.then(callback);
            });
        }
        return entry;
    };
    CustomAppDelegate.apply = function (fn, callback) {
        var entry;
        if (!(entry = this._queue[fn])) {
            entry = this._queue[fn] = { callbacks: [], promise: false };
        }
        if (!entry.promise) {
            entry.callbacks.push(callback);
        }
        else {
            entry.promise.then(callback);
        }
        return entry;
    };
    return CustomAppDelegate;
}(UIResponder));
CustomAppDelegate.ObjCProtocols = [UIApplicationDelegate];
CustomAppDelegate._queue = {};
exports.CustomAppDelegate = CustomAppDelegate;
var handler = function restorationHandler() {
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWFwcC1kZWxlZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbS1hcHAtZGVsZWdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUF1QyxxQ0FBVztJQUFsRDs7SUFtRUEsQ0FBQztJQS9EVSx5REFBNkIsR0FBcEMsVUFBcUMsV0FBMEI7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxvRUFBd0MsR0FBL0MsVUFBZ0QsV0FBMEIsRUFBRSxhQUFrQjtRQUMxRixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQywwQ0FBMEMsRUFBRSxFQUFFLFdBQVcsYUFBQSxFQUFFLGFBQWEsZUFBQSxFQUFFLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBRUoscURBQXlCLEdBQXpCLFVBQTBCLFdBQWlDLEVBQUUsR0FBVyxFQUFFLE9BQTRCO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEVBQUUsV0FBVyxhQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRSw2RUFBaUQsR0FBakQsVUFBa0QsV0FBaUMsRUFBRSxZQUFZLEVBQUUsa0JBQWtCO1FBQ2pILE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLG1EQUFtRCxFQUFFLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsa0JBQWtCLG9CQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQzNJLENBQUM7SUFFbUIsMEJBQVEsR0FBekIsVUFBMEIsRUFBVSxFQUFFLElBQVM7UUFDakQsSUFBSSxTQUFTLEdBQUc7WUFFZixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7U0FDeEMsQ0FBQztRQUVGLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDcEMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksS0FBSyxDQUFDO1FBRVYsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7Z0JBQ3hDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRWEsdUJBQUssR0FBbkIsVUFBb0IsRUFBVSxFQUFFLFFBQWE7UUFDNUMsSUFBSSxLQUFLLENBQUM7UUFFVixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUM3RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUFuRUQsQ0FBdUMsV0FBVztBQUNoQywrQkFBYSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNyQyx3QkFBTSxHQUFXLEVBQUUsQ0FBQztBQUY1Qiw4Q0FBaUI7QUFxRTlCLElBQUksT0FBTyxHQUFHO0FBRWQsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1c3RvbUFwcERlbGVnYXRlIGV4dGVuZHMgVUlSZXNwb25kZXIgaW1wbGVtZW50cyBVSUFwcGxpY2F0aW9uRGVsZWdhdGUge1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtVSUFwcGxpY2F0aW9uRGVsZWdhdGVdO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX3F1ZXVlOiBPYmplY3QgPSB7fTtcblxuICAgIHB1YmxpYyBhcHBsaWNhdGlvbkRpZEVudGVyQmFja2dyb3VuZChhcHBsaWNhdGlvbjogVUlBcHBsaWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFwcGxpY2F0aW9uRGlkRW50ZXJCYWNrZ3JvdW5kXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uLCBsYXVuY2hPcHRpb25zOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zXCIpO1xuICAgICAgICByZXR1cm4gQ3VzdG9tQXBwRGVsZWdhdGUuX3Byb21pc2UoXCJhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zXCIsIHsgYXBwbGljYXRpb24sIGxhdW5jaE9wdGlvbnMgfSk7XG4gICAgfVxuXG5cdGFwcGxpY2F0aW9uT3BlblVSTE9wdGlvbnMoYXBwbGljYXRpb246IHR5cGVvZiBVSUFwcGxpY2F0aW9uLCB1cmw6IHN0cmluZywgb3B0aW9uczogdHlwZW9mIE5TRGljdGlvbmFyeSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFwcGxpY2F0aW9uT3BlblVSTE9wdGlvbnNcIik7XG5cdFx0cmV0dXJuIEN1c3RvbUFwcERlbGVnYXRlLl9wcm9taXNlKFwiYXBwbGljYXRpb25PcGVuVVJMT3B0aW9uc1wiLCB7IGFwcGxpY2F0aW9uLCB1cmwsIG9wdGlvbnMgfSk7XG5cdH1cblxuICAgIGFwcGxpY2F0aW9uQ29udGludWVVc2VyQWN0aXZpdHlSZXN0b3JhdGlvbkhhbmRsZXIoYXBwbGljYXRpb246IHR5cGVvZiBVSUFwcGxpY2F0aW9uLCB1c2VyQWN0aXZpdHksIHJlc3RvcmF0aW9uSGFuZGxlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFwcGxpY2F0aW9uQ29udGludWVVc2VyQWN0aXZpdHlSZXN0b3JhdGlvbkhhbmRsZXJcIik7XG5cdFx0cmV0dXJuIEN1c3RvbUFwcERlbGVnYXRlLl9wcm9taXNlKFwiYXBwbGljYXRpb25Db250aW51ZVVzZXJBY3Rpdml0eVJlc3RvcmF0aW9uSGFuZGxlclwiLCB7IGFwcGxpY2F0aW9uLCB1c2VyQWN0aXZpdHksIHJlc3RvcmF0aW9uSGFuZGxlciB9KTtcblx0fVxuXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfcHJvbWlzZShmbjogc3RyaW5nLCBhcmdzOiBhbnkpIHtcblx0XHRsZXQgY29uc3RhbnRzID0ge1xuXHRcdFx0Ly8ga2VlcCBhIGNvcHkgb2YgdGhlIGNhbGwtdGltZSBhcHBsaWNhdGlvbiBzdGF0ZVxuXHRcdFx0c3RhdGU6IGFyZ3MuYXBwbGljYXRpb24uYXBwbGljYXRpb25TdGF0ZVxuXHRcdH07XG5cblx0XHRsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0cmV0dXJuIHsgZm46IGZuLCBhcmdzOiBhcmdzLCBjb25zdGFudHM6IGNvbnN0YW50cyB9O1xuXHRcdH0pO1xuXG5cdFx0bGV0IGVudHJ5O1xuXG5cdFx0aWYgKCEoZW50cnkgPSB0aGlzLl9xdWV1ZVtmbl0pKSB7XG5cdFx0XHRlbnRyeSA9IHsgY2FsbGJhY2tzOiBbXSwgcHJvbWlzZTogcHJvbWlzZSB9O1xuXHRcdFx0dGhpcy5fcXVldWVbZm5dID0gZW50cnk7XG5cdFx0XHRyZXR1cm4gZW50cnk7XG5cdFx0fVxuXG5cdFx0ZW50cnkucHJvbWlzZSA9IHByb21pc2U7XG5cblx0XHRpZiAoZW50cnkuY2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcblx0XHRcdGVudHJ5LmNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGVudHJ5LnByb21pc2UudGhlbihjYWxsYmFjayk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZW50cnk7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIGFwcGx5KGZuOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcblx0XHRsZXQgZW50cnk7XG5cblx0XHRpZiAoIShlbnRyeSA9IHRoaXMuX3F1ZXVlW2ZuXSkpIHtcblx0XHRcdGVudHJ5ID0gdGhpcy5fcXVldWVbZm5dID0geyBjYWxsYmFja3M6IFtdLCBwcm9taXNlOiBmYWxzZSB9O1xuXHRcdH1cblxuXHRcdGlmICghZW50cnkucHJvbWlzZSkge1xuXHRcdFx0ZW50cnkuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbnRyeS5wcm9taXNlLnRoZW4oY2FsbGJhY2spO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbnRyeTtcblx0fVxufVxuXG52YXIgaGFuZGxlciA9IGZ1bmN0aW9uIHJlc3RvcmF0aW9uSGFuZGxlcigpe1xuXG59Il19