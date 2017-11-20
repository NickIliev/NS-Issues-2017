import "./bundle-config";
import * as app from 'application';
import { ios, start as applicationStart } from "application";

class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean {
        console.log("applicationWillFinishLaunchingWithOptions: " + launchOptions)

        return true;
    }

    applicationDidBecomeActive(application: UIApplication): void {
        console.log("applicationDidBecomeActive: " + application)
    }

    applicationWillResignActive(application: UIApplication): void {
        console.log("applicationWillResignActive")
    }

    applicationWillTerminate(application: UIApplication): void {
        console.log("applicationWillTerminate: " + application);
    }
}
ios.delegate = MyDelegate;

app.start({ moduleName: 'main-page' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
