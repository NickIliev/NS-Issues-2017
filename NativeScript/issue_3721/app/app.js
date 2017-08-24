/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
"use strict";
require("./bundle-config");
var application = require("application");
application.on(application.launchEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
        console.log("Launched Android application with the following intent: " + args.android + ".");
    }
    else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        console.log("Launched iOS application with options: " + args.ios);
    }
});
application.on(application.suspendEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    }
    else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});
application.on(application.resumeEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    }
    else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});
application.on(application.exitEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    }
    else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});
application.on(application.lowMemoryEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    }
    else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});
application.on(application.uncaughtErrorEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an NativeScriptError.
        console.log("NativeScriptError: " + args.android);
    }
    else if (args.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        console.log("NativeScriptError: " + args.ios);
    }
});
// Android activity events
if (application.android) {
    application.android.on(application.AndroidApplication.activityCreatedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });
    application.android.on(application.AndroidApplication.activityDestroyedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application.android.on(application.AndroidApplication.activityStartedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application.android.on(application.AndroidApplication.activityPausedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application.android.on(application.AndroidApplication.activityResumedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application.android.on(application.AndroidApplication.activityStoppedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application.android.on(application.AndroidApplication.saveActivityStateEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });
    application.android.on(application.AndroidApplication.activityResultEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity +
            ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);
    });
    application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
        // Set args.cancel = true to cancel back navigation and do something custom.
    });
}
application.start({ moduleName: 'main-page' });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7O0FBRUYsMkJBQXlCO0FBQ3pCLHlDQUEyQztBQUUzQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxJQUFzQztJQUNwRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNmLDZFQUE2RTtRQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsa0VBQWtFO1FBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxVQUFVLElBQXNDO0lBQ3JGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2YsdUVBQXVFO1FBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLG1EQUFtRDtRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FB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R0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxJQUEwQztRQUM1SCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxJQUEwQztRQUMzSCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxJQUEwQztRQUM1SCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxJQUEwQztRQUM1SCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxJQUFnRDtRQUNwSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUcsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxJQUFnRDtRQUNqSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUTtZQUNuRSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoSCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLElBQXFEO1FBQzNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RSw0RUFBNEU7SUFDaEYsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBR0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBRS9DOzs7RUFHRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5JbiBOYXRpdmVTY3JpcHQsIHRoZSBhcHAudHMgZmlsZSBpcyB0aGUgZW50cnkgcG9pbnQgdG8geW91ciBhcHBsaWNhdGlvbi5cbllvdSBjYW4gdXNlIHRoaXMgZmlsZSB0byBwZXJmb3JtIGFwcC1sZXZlbCBpbml0aWFsaXphdGlvbiwgYnV0IHRoZSBwcmltYXJ5XG5wdXJwb3NlIG9mIHRoZSBmaWxlIGlzIHRvIHBhc3MgY29udHJvbCB0byB0aGUgYXBw4oCZcyBmaXJzdCBtb2R1bGUuXG4qL1xuXG5pbXBvcnQgXCIuL2J1bmRsZS1jb25maWdcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gJ2FwcGxpY2F0aW9uJztcblxuYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24ubGF1bmNoRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBhcHBsaWNhdGlvbi5BcHBsaWNhdGlvbkV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFuZHJvaWQpIHtcbiAgICAgICAgLy8gRm9yIEFuZHJvaWQgYXBwbGljYXRpb25zLCBhcmdzLmFuZHJvaWQgaXMgYW4gYW5kcm9pZC5jb250ZW50LkludGVudCBjbGFzcy5cbiAgICAgICAgY29uc29sZS5sb2coXCJMYXVuY2hlZCBBbmRyb2lkIGFwcGxpY2F0aW9uIHdpdGggdGhlIGZvbGxvd2luZyBpbnRlbnQ6IFwiICsgYXJncy5hbmRyb2lkICsgXCIuXCIpO1xuICAgIH0gZWxzZSBpZiAoYXJncy5pb3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgTlNEaWN0aW9uYXJ5IChsYXVuY2hPcHRpb25zKS5cbiAgICAgICAgY29uc29sZS5sb2coXCJMYXVuY2hlZCBpT1MgYXBwbGljYXRpb24gd2l0aCBvcHRpb25zOiBcIiArIGFyZ3MuaW9zKTtcbiAgICB9XG59KTtcblxuYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24uc3VzcGVuZEV2ZW50LCBmdW5jdGlvbiAoYXJnczogYXBwbGljYXRpb24uQXBwbGljYXRpb25FdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5hbmRyb2lkKSB7XG4gICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIGFuZHJvaWQgYWN0aXZpdHkgY2xhc3MuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWN0aXZpdHk6IFwiICsgYXJncy5hbmRyb2lkKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XG4gICAgICAgIC8vIEZvciBpT1MgYXBwbGljYXRpb25zLCBhcmdzLmlvcyBpcyBVSUFwcGxpY2F0aW9uLlxuICAgICAgICBjb25zb2xlLmxvZyhcIlVJQXBwbGljYXRpb246IFwiICsgYXJncy5pb3MpO1xuICAgIH1cbn0pO1xuXG5hcHBsaWNhdGlvbi5vbihhcHBsaWNhdGlvbi5yZXN1bWVFdmVudCwgZnVuY3Rpb24gKGFyZ3M6IGFwcGxpY2F0aW9uLkFwcGxpY2F0aW9uRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYW5kcm9pZCkge1xuICAgICAgICAvLyBGb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMsIGFyZ3MuYW5kcm9pZCBpcyBhbiBhbmRyb2lkIGFjdGl2aXR5IGNsYXNzLlxuICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2aXR5OiBcIiArIGFyZ3MuYW5kcm9pZCk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmlvcykge1xuICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgVUlBcHBsaWNhdGlvbi5cbiAgICAgICAgY29uc29sZS5sb2coXCJVSUFwcGxpY2F0aW9uOiBcIiArIGFyZ3MuaW9zKTtcbiAgICB9XG59KTtcblxuYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24uZXhpdEV2ZW50LCBmdW5jdGlvbiAoYXJnczogYXBwbGljYXRpb24uQXBwbGljYXRpb25FdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5hbmRyb2lkKSB7XG4gICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIGFuZHJvaWQgYWN0aXZpdHkgY2xhc3MuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWN0aXZpdHk6IFwiICsgYXJncy5hbmRyb2lkKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XG4gICAgICAgIC8vIEZvciBpT1MgYXBwbGljYXRpb25zLCBhcmdzLmlvcyBpcyBVSUFwcGxpY2F0aW9uLlxuICAgICAgICBjb25zb2xlLmxvZyhcIlVJQXBwbGljYXRpb246IFwiICsgYXJncy5pb3MpO1xuICAgIH1cbn0pO1xuXG5hcHBsaWNhdGlvbi5vbihhcHBsaWNhdGlvbi5sb3dNZW1vcnlFdmVudCwgZnVuY3Rpb24gKGFyZ3M6IGFwcGxpY2F0aW9uLkFwcGxpY2F0aW9uRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYW5kcm9pZCkge1xuICAgICAgICAvLyBGb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMsIGFyZ3MuYW5kcm9pZCBpcyBhbiBhbmRyb2lkIGFjdGl2aXR5IGNsYXNzLlxuICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2aXR5OiBcIiArIGFyZ3MuYW5kcm9pZCk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmlvcykge1xuICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgVUlBcHBsaWNhdGlvbi5cbiAgICAgICAgY29uc29sZS5sb2coXCJVSUFwcGxpY2F0aW9uOiBcIiArIGFyZ3MuaW9zKTtcbiAgICB9XG59KTtcblxuYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24udW5jYXVnaHRFcnJvckV2ZW50LCBmdW5jdGlvbiAoYXJnczogYXBwbGljYXRpb24uQXBwbGljYXRpb25FdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5hbmRyb2lkKSB7XG4gICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIE5hdGl2ZVNjcmlwdEVycm9yLlxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdGl2ZVNjcmlwdEVycm9yOiBcIiArIGFyZ3MuYW5kcm9pZCk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmlvcykge1xuICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgTmF0aXZlU2NyaXB0RXJyb3IuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF0aXZlU2NyaXB0RXJyb3I6IFwiICsgYXJncy5pb3MpO1xuICAgIH1cbn0pO1xuXG5cbi8vIEFuZHJvaWQgYWN0aXZpdHkgZXZlbnRzXG5pZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5Q3JlYXRlZEV2ZW50LCBmdW5jdGlvbiAoYXJnczogYXBwbGljYXRpb24uQW5kcm9pZEFjdGl2aXR5QnVuZGxlRXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQ6IFwiICsgYXJncy5ldmVudE5hbWUgKyBcIiwgQWN0aXZpdHk6IFwiICsgYXJncy5hY3Rpdml0eSArIFwiLCBCdW5kbGU6IFwiICsgYXJncy5idW5kbGUpO1xuICAgIH0pO1xuXG4gICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlEZXN0cm95ZWRFdmVudCwgZnVuY3Rpb24gKGFyZ3M6IGFwcGxpY2F0aW9uLkFuZHJvaWRBY3Rpdml0eUV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50OiBcIiArIGFyZ3MuZXZlbnROYW1lICsgXCIsIEFjdGl2aXR5OiBcIiArIGFyZ3MuYWN0aXZpdHkpO1xuICAgIH0pO1xuXG4gICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlTdGFydGVkRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudDogXCIgKyBhcmdzLmV2ZW50TmFtZSArIFwiLCBBY3Rpdml0eTogXCIgKyBhcmdzLmFjdGl2aXR5KTtcbiAgICB9KTtcblxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5UGF1c2VkRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudDogXCIgKyBhcmdzLmV2ZW50TmFtZSArIFwiLCBBY3Rpdml0eTogXCIgKyBhcmdzLmFjdGl2aXR5KTtcbiAgICB9KTtcblxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5UmVzdW1lZEV2ZW50LCBmdW5jdGlvbiAoYXJnczogYXBwbGljYXRpb24uQW5kcm9pZEFjdGl2aXR5RXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQ6IFwiICsgYXJncy5ldmVudE5hbWUgKyBcIiwgQWN0aXZpdHk6IFwiICsgYXJncy5hY3Rpdml0eSk7XG4gICAgfSk7XG5cbiAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eVN0b3BwZWRFdmVudCwgZnVuY3Rpb24gKGFyZ3M6IGFwcGxpY2F0aW9uLkFuZHJvaWRBY3Rpdml0eUV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50OiBcIiArIGFyZ3MuZXZlbnROYW1lICsgXCIsIEFjdGl2aXR5OiBcIiArIGFyZ3MuYWN0aXZpdHkpO1xuICAgIH0pO1xuXG4gICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uc2F2ZUFjdGl2aXR5U3RhdGVFdmVudCwgZnVuY3Rpb24gKGFyZ3M6IGFwcGxpY2F0aW9uLkFuZHJvaWRBY3Rpdml0eUJ1bmRsZUV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50OiBcIiArIGFyZ3MuZXZlbnROYW1lICsgXCIsIEFjdGl2aXR5OiBcIiArIGFyZ3MuYWN0aXZpdHkgKyBcIiwgQnVuZGxlOiBcIiArIGFyZ3MuYnVuZGxlKTtcbiAgICB9KTtcblxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5UmVzdWx0RXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlSZXN1bHRFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudDogXCIgKyBhcmdzLmV2ZW50TmFtZSArIFwiLCBBY3Rpdml0eTogXCIgKyBhcmdzLmFjdGl2aXR5ICtcbiAgICAgICAgICAgIFwiLCByZXF1ZXN0Q29kZTogXCIgKyBhcmdzLnJlcXVlc3RDb2RlICsgXCIsIHJlc3VsdENvZGU6IFwiICsgYXJncy5yZXN1bHRDb2RlICsgXCIsIEludGVudDogXCIgKyBhcmdzLmludGVudCk7XG4gICAgfSk7XG5cbiAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50OiBcIiArIGFyZ3MuZXZlbnROYW1lICsgXCIsIEFjdGl2aXR5OiBcIiArIGFyZ3MuYWN0aXZpdHkpO1xuICAgICAgICAvLyBTZXQgYXJncy5jYW5jZWwgPSB0cnVlIHRvIGNhbmNlbCBiYWNrIG5hdmlnYXRpb24gYW5kIGRvIHNvbWV0aGluZyBjdXN0b20uXG4gICAgfSk7XG59XG5cblxuYXBwbGljYXRpb24uc3RhcnQoeyBtb2R1bGVOYW1lOiAnbWFpbi1wYWdlJyB9KTtcblxuLypcbkRvIG5vdCBwbGFjZSBhbnkgY29kZSBhZnRlciB0aGUgYXBwbGljYXRpb24gaGFzIGJlZW4gc3RhcnRlZCBhcyBpdCB3aWxsIG5vdFxuYmUgZXhlY3V0ZWQgb24gaU9TLlxuKi9cbiJdfQ==