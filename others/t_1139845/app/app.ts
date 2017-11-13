import "./bundle-config";
import * as app from 'application';
import { ios, start as applicationStart } from "application";

class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];
    public backgroundedToLockScreen: boolean;

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean {
        console.log("applicationWillFinishLaunchingWithOptions: " + launchOptions)

        return true;
    }

    applicationDidBecomeActive(application: UIApplication): void {
        console.log("applicationDidBecomeActive: " + application)
    }

    applicationDidEnterBackground(application: UIApplication): void {
        var screenBrightness = UIScreen.mainScreen.brightness;

        this.backgroundedToLockScreen = screenBrightness <= 0.0;
    }

    applicationWillEnterForeground(application: UIApplication): void {
        console.log("applicationWillEnterForeground: " + application);

        if (this.backgroundedToLockScreen) {
            console.log("was in LOCK Screen"); // app was backgrounded to lock screen
        } else {
            console.log("was in suspend due to HOME button or similar");  // app was backgrounded on purpose by tapping the home button or switching apps.
        }
        this.backgroundedToLockScreen = false;
    }
}
ios.delegate = MyDelegate;

app.start({ moduleName: 'main-page' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
