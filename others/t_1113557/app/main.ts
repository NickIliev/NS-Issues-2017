// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import { isIOS } from "platform";
import * as application from "application";

if(isIOS) {
    class AppDelegate extends NSObject implements UIApplicationDelegate {
        static ObjCProtocols = [UIApplicationDelegate];

        static ObjCExposedMethods = {
            "runOnBackground": { returns: interop.types.void }
        };

        private timer;
        private timerCounter;
        private bgTask;

        applicationDidEnterBackground(app: UIApplication) {
            console.log("applicaiton is in background");

            this.bgTask = app.beginBackgroundTaskWithNameExpirationHandler("My Task", () => {
                this.endBackgroundTask();
            })

            this.timerCounter = 10;
            this.timer = NSTimer.scheduledTimerWithTimeIntervalTargetSelectorUserInfoRepeats(2, this, "runOnBackground", null, true);
        }

        private endBackgroundTask(): void {
            if (this.timer) {
                this.timer.invalidate();
                this.timer = null;
            }

            this.timerCounter = 10;
            (<any>UIApplication).sharedApplication().endBackgroundTask(this.bgTask);
            this.bgTask = UIBackgroundTaskInvalid;
        }

        runOnBackground(): void {
            if(this.timerCounter == 10) {
                console.log("this code will be executed on the 10th tick"); // execute this code after 5 minutes or as your logic requires
                return;
            }
            
            console.log(this.timerCounter);
            this.timerCounter--;
        }
    }

    application.ios.delegate = AppDelegate;
}


platformNativeScriptDynamic().bootstrapModule(AppModule);
