"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("application");
application_1.on(application_1.uncaughtErrorEvent, function (args) {
    if (application_1.android) {
        // For Android applications, args.android is an NativeScriptError.
        console.log(" *** NativeScriptError *** : " + args.android);
        console.log(" *** StackTrace *** : " + args.android.stackTrace);
        console.log(" *** nativeException *** : " + args.android.nativeException);
    }
    else if (application_1.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        console.log(" ||||| NativeScriptError in iOS ||||| " + args.ios);
    }
});
application_1.start({ moduleName: "main-page" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFDYiwyQ0FBMEU7QUFFMUUsZ0JBQUUsQ0FBQyxnQ0FBa0IsRUFBRSxVQUFDLElBQUk7SUFDeEIsRUFBRSxDQUFDLENBQUMscUJBQU8sQ0FBQyxDQUFDLENBQUM7UUFDVixrRUFBa0U7UUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUU5RSxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsdURBQXVEO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUNILG1CQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgb24sIHN0YXJ0LCB1bmNhdWdodEVycm9yRXZlbnQsIGFuZHJvaWQsIGlvcyB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5vbih1bmNhdWdodEVycm9yRXZlbnQsIChhcmdzKSA9PiB7XG4gICAgaWYgKGFuZHJvaWQpIHtcbiAgICAgICAgLy8gRm9yIEFuZHJvaWQgYXBwbGljYXRpb25zLCBhcmdzLmFuZHJvaWQgaXMgYW4gTmF0aXZlU2NyaXB0RXJyb3IuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiICoqKiBOYXRpdmVTY3JpcHRFcnJvciAqKiogOiBcIiArIGFyZ3MuYW5kcm9pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiICoqKiBTdGFja1RyYWNlICoqKiA6IFwiICsgYXJncy5hbmRyb2lkLnN0YWNrVHJhY2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiAqKiogbmF0aXZlRXhjZXB0aW9uICoqKiA6IFwiICsgYXJncy5hbmRyb2lkLm5hdGl2ZUV4Y2VwdGlvbik7XG5cbiAgICB9IGVsc2UgaWYgKGlvcykge1xuICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgTmF0aXZlU2NyaXB0RXJyb3IuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIHx8fHx8IE5hdGl2ZVNjcmlwdEVycm9yIGluIGlPUyB8fHx8fCBcIiArIGFyZ3MuaW9zKTtcbiAgICB9XG59KTtcbnN0YXJ0KHsgbW9kdWxlTmFtZTogXCJtYWluLXBhZ2VcIiB9KTsiXX0=