"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// the `JavaProxy` decorator specifies the package and the name for the native *.JAVA file generated. 
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Application.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        console.log("org.myApp.Application onCreate!! ");
        this.upgradeSecurityProvider();
    };
    Application.prototype.attachBaseContext = function (baseContext) {
        _super.prototype.attachBaseContext.call(this, baseContext);
    };
    Application.prototype.upgradeSecurityProvider = function () {
        com.google.android.gms.security.ProviderInstaller.installIfNeededAsync(this, new com.google.android.gms.security.ProviderInstaller.ProviderInstallListener({
            onProviderInstalled: function () {
                console.log("onProviderInstalled");
            },
            onProviderInstallFailed: function (errorCode, intent) {
                console.log("onProviderInstalledFailed");
                console.log("errorCode: " + errorCode);
            }
        }));
    };
    Application = __decorate([
        JavaProxy("org.myApp.Application")
    ], Application);
    return Application;
}(android.app.Application));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxzR0FBc0c7QUFFdEc7SUFBMEIsK0JBQXVCO0lBQWpEOztJQXdCQSxDQUFDO0lBdkJVLDhCQUFRLEdBQWY7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVTLHVDQUFpQixHQUEzQixVQUE0QixXQUFvQztRQUM1RCxpQkFBTSxpQkFBaUIsWUFBQyxXQUFXLENBQUMsQ0FBQztJQUV6QyxDQUFDO0lBRU8sNkNBQXVCLEdBQS9CO1FBQ0ksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDO1lBQ3ZKLG1CQUFtQixFQUFHO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUNELHVCQUF1QixFQUFFLFVBQUMsU0FBUyxFQUFFLE1BQU07Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDM0MsQ0FBQztTQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ1AsQ0FBQztJQXZCQyxXQUFXO1FBRGhCLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztPQUM3QixXQUFXLENBd0JoQjtJQUFELGtCQUFDO0NBQUEsQUF4QkQsQ0FBMEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBd0JoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5kZWNsYXJlIGxldCBjb206IGFueTtcblxuLy8gdGhlIGBKYXZhUHJveHlgIGRlY29yYXRvciBzcGVjaWZpZXMgdGhlIHBhY2thZ2UgYW5kIHRoZSBuYW1lIGZvciB0aGUgbmF0aXZlICouSkFWQSBmaWxlIGdlbmVyYXRlZC4gXG5ASmF2YVByb3h5KFwib3JnLm15QXBwLkFwcGxpY2F0aW9uXCIpXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIGFuZHJvaWQuYXBwLkFwcGxpY2F0aW9uIHtcbiAgICBwdWJsaWMgb25DcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uQ3JlYXRlKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJvcmcubXlBcHAuQXBwbGljYXRpb24gb25DcmVhdGUhISBcIik7XG4gICAgICAgIHRoaXMudXBncmFkZVNlY3VyaXR5UHJvdmlkZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXR0YWNoQmFzZUNvbnRleHQoYmFzZUNvbnRleHQ6IGFuZHJvaWQuY29udGVudC5Db250ZXh0KSB7XG4gICAgICAgIHN1cGVyLmF0dGFjaEJhc2VDb250ZXh0KGJhc2VDb250ZXh0KTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgdXBncmFkZVNlY3VyaXR5UHJvdmlkZXIoKSB7XG4gICAgICAgIGNvbS5nb29nbGUuYW5kcm9pZC5nbXMuc2VjdXJpdHkuUHJvdmlkZXJJbnN0YWxsZXIuaW5zdGFsbElmTmVlZGVkQXN5bmModGhpcywgbmV3IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMuc2VjdXJpdHkuUHJvdmlkZXJJbnN0YWxsZXIuUHJvdmlkZXJJbnN0YWxsTGlzdGVuZXIoe1xuICAgICAgICAgICAgb25Qcm92aWRlckluc3RhbGxlZDogICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uUHJvdmlkZXJJbnN0YWxsZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Qcm92aWRlckluc3RhbGxGYWlsZWQ6IChlcnJvckNvZGUsIGludGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25Qcm92aWRlckluc3RhbGxlZEZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yQ29kZTogXCIgKyBlcnJvckNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICB9XG59Il19