import * as application from "application";

declare let com: any;

// the `JavaProxy` decorator specifies the package and the name for the native *.JAVA file generated. 
@JavaProxy("org.myApp.Application")
class Application extends android.app.Application {
    public onCreate(): void {
        super.onCreate();

        console.log("org.myApp.Application onCreate!! ");
        this.upgradeSecurityProvider();
    }

    protected attachBaseContext(baseContext: android.content.Context) {
        super.attachBaseContext(baseContext);

    }

    private upgradeSecurityProvider() {
        com.google.android.gms.security.ProviderInstaller.installIfNeededAsync(this, new com.google.android.gms.security.ProviderInstaller.ProviderInstallListener({
            onProviderInstalled:  () => {
                console.log("onProviderInstalled");
            },
            onProviderInstallFailed: (errorCode, intent) => {
                console.log("onProviderInstalledFailed");
                console.log("errorCode: " + errorCode);
            }
        }))
    }
}