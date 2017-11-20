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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxzR0FBc0c7QUFFdEc7SUFBMEIsK0JBQXVCO0lBQWpEOztJQXdCQSxDQUFDO0lBdkJVLDhCQUFRLEdBQWY7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVTLHVDQUFpQixHQUEzQixVQUE0QixXQUFvQztRQUM1RCxpQkFBTSxpQkFBaUIsWUFBQyxXQUFXLENBQUMsQ0FBQztJQUV6QyxDQUFDO0lBRU8sNkNBQXVCLEdBQS9CO1FBQ0ksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDO1lBQ3ZKLG1CQUFtQixFQUFHO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUNELHVCQUF1QixFQUFFLFVBQUMsU0FBUyxFQUFFLE1BQU07Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDM0MsQ0FBQztTQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ1AsQ0FBQztJQXZCQyxXQUFXO1FBRGhCLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztPQUM3QixXQUFXLENBd0JoQjtJQUFELGtCQUFDO0NBQUEsQUF4QkQsQ0FBMEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBd0JoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG4vLyB0aGUgZGVwZW5kZW5jeSB0byBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zIGluIEFwcF9SZXNvdXJjZXMvYW5kcm9pZC9hcHAuZ3JhZGVcbmRlY2xhcmUgbGV0IGNvbTogYW55O1xuXG4vLyB0aGUgYEphdmFQcm94eWAgZGVjb3JhdG9yIHNwZWNpZmllcyB0aGUgcGFja2FnZSBhbmQgdGhlIG5hbWUgZm9yIHRoZSBuYXRpdmUgKi5KQVZBIGZpbGUgZ2VuZXJhdGVkLiBcbkBKYXZhUHJveHkoXCJvcmcubXlBcHAuQXBwbGljYXRpb25cIilcbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgYW5kcm9pZC5hcHAuQXBwbGljYXRpb24ge1xuICAgIHB1YmxpYyBvbkNyZWF0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25DcmVhdGUoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm9yZy5teUFwcC5BcHBsaWNhdGlvbiBvbkNyZWF0ZSEhIFwiKTtcbiAgICAgICAgdGhpcy51cGdyYWRlU2VjdXJpdHlQcm92aWRlcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhdHRhY2hCYXNlQ29udGV4dChiYXNlQ29udGV4dDogYW5kcm9pZC5jb250ZW50LkNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIuYXR0YWNoQmFzZUNvbnRleHQoYmFzZUNvbnRleHQpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGdyYWRlU2VjdXJpdHlQcm92aWRlcigpIHtcbiAgICAgICAgY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5zZWN1cml0eS5Qcm92aWRlckluc3RhbGxlci5pbnN0YWxsSWZOZWVkZWRBc3luYyh0aGlzLCBuZXcgY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5zZWN1cml0eS5Qcm92aWRlckluc3RhbGxlci5Qcm92aWRlckluc3RhbGxMaXN0ZW5lcih7XG4gICAgICAgICAgICBvblByb3ZpZGVySW5zdGFsbGVkOiAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25Qcm92aWRlckluc3RhbGxlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblByb3ZpZGVySW5zdGFsbEZhaWxlZDogKGVycm9yQ29kZSwgaW50ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvblByb3ZpZGVySW5zdGFsbGVkRmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JDb2RlOiBcIiArIGVycm9yQ29kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgIH1cbn1cbiJdfQ==