"use strict";
import { on, start, uncaughtErrorEvent, android, ios } from "application";

on(uncaughtErrorEvent, (args) => {
    if (android) {
        // For Android applications, args.android is an NativeScriptError.
        console.log(" *** NativeScriptError *** : " + args.android);
        console.log(" *** StackTrace *** : " + args.android.stackTrace);
        console.log(" *** nativeException *** : " + args.android.nativeException);

    } else if (ios) {
        // For iOS applications, args.ios is NativeScriptError.
        console.log(" ||||| NativeScriptError in iOS ||||| " + args.ios);
    }
});
start({ moduleName: "main-page" });