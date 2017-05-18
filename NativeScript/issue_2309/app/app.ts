"use strict";
import { on, start, uncaughtErrorEvent } from "application";

on(uncaughtErrorEvent, (args) => {
    if (args.android) {
        // For Android applications, args.android is an NativeScriptError.
        console.log(" *** NativeScriptError *** : " + args.android);
        console.log(" *** StackTrace *** : " + args.android.stackTrace);
        console.log(" *** nativeException *** : " + args.android.nativeException);
    }
    else if (args.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        console.log("NativeScriptError: " + args.ios);
    }
});
start({ moduleName: "main-page" });