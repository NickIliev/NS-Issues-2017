import "./bundle-config";
import * as app from 'application';
var utils = require("utils/utils");

declare var android: any;
declare var java: any;
var intent;

if (app.android) {
    app.android.on(app.AndroidApplication.activityCreatedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
        var context = utils.ad.getApplicationContext();

        intent = android.app.PendingIntent.getActivity(context, 0, new android.content.Intent(args.activity.getIntent()), args.activity.getIntent().getFlags());
    });

    app.android.on(app.AndroidApplication.activityBackPressedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
        // Set args.cancel = true to cancel back navigation and do something custom.

        var mgr = app.android.context.getSystemService(android.content.Context.ALARM_SERVICE);
        mgr.set(android.app.AlarmManager.RTC, java.lang.System.currentTimeMillis() + 2000, intent);
        java.lang.System.exit(2);
    });
}

app.on(app.suspendEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("on suspendEvent - Activity: " + args.android);

        var mgr = app.android.context.getSystemService(android.content.Context.ALARM_SERVICE);
        mgr.set(android.app.AlarmManager.RTC, java.lang.System.currentTimeMillis() + 2000, intent);
        java.lang.System.exit(2);
    }
});

app.on(app.exitEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("on exitEvent - Activity: " + args.android);

        var mgr = app.android.context.getSystemService(android.content.Context.ALARM_SERVICE);
        mgr.set(android.app.AlarmManager.RTC, java.lang.System.currentTimeMillis() + 2000, intent);
        java.lang.System.exit(2);
    }
});

app.on(app.uncaughtErrorEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an NativeScriptError.
        console.log("on uncaughtErrorEvent - NativeScriptError: " + args.android);

        var mgr = app.android.context.getSystemService(android.content.Context.ALARM_SERVICE);
        mgr.set(android.app.AlarmManager.RTC, java.lang.System.currentTimeMillis() + 2000, intent);
        java.lang.System.exit(2);
    } 
});

app.start({ moduleName: 'main-page' });
