"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("application");
application_1.on(application_1.uncaughtErrorEvent, function (args) {
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
application_1.start({ moduleName: "main-page" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFDYiwyQ0FBNEQ7QUFFNUQsZ0JBQUUsQ0FBQyxnQ0FBa0IsRUFBRSxVQUFDLElBQUk7SUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZixrRUFBa0U7UUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLHVEQUF1RDtRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSCxtQkFBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7IG9uLCBzdGFydCwgdW5jYXVnaHRFcnJvckV2ZW50IH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbm9uKHVuY2F1Z2h0RXJyb3JFdmVudCwgKGFyZ3MpID0+IHtcbiAgICBpZiAoYXJncy5hbmRyb2lkKSB7XG4gICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIE5hdGl2ZVNjcmlwdEVycm9yLlxuICAgICAgICBjb25zb2xlLmxvZyhcIiAqKiogTmF0aXZlU2NyaXB0RXJyb3IgKioqIDogXCIgKyBhcmdzLmFuZHJvaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiAqKiogU3RhY2tUcmFjZSAqKiogOiBcIiArIGFyZ3MuYW5kcm9pZC5zdGFja1RyYWNlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgKioqIG5hdGl2ZUV4Y2VwdGlvbiAqKiogOiBcIiArIGFyZ3MuYW5kcm9pZC5uYXRpdmVFeGNlcHRpb24pO1xuICAgIH1cbiAgICBlbHNlIGlmIChhcmdzLmlvcykge1xuICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgTmF0aXZlU2NyaXB0RXJyb3IuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF0aXZlU2NyaXB0RXJyb3I6IFwiICsgYXJncy5pb3MpO1xuICAgIH1cbn0pO1xuc3RhcnQoeyBtb2R1bGVOYW1lOiBcIm1haW4tcGFnZVwiIH0pOyJdfQ==