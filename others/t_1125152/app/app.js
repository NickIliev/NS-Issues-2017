var app = require("application");
var applicationSettings = require("application-settings");
var platform = require("platform");
var firebase = require("nativescript-plugin-firebase");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var frameModule = require("ui/frame");
var appversion = require("nativescript-appversion");
var token = require("~/common/token");
var timer = require("timer");

// set defaultTransition between pages
frameModule.Frame.defaultTransition = { name: "slide" };

var intervalID;

appversion.getVersionName().then(function (version) {
    console.log("AppVersion: ", version);
    applicationSettings.setString("appVersion", version);
});

if (platform.device.os === platform.platformNames.android) {
    app.onLaunch = function (intent) {
        // hook the onActivityCreated callback upon application launching
        app.android.onActivityCreated = function (activity) {
            // apply the default theme once the Activity is created
            // Changing the SplashTheme for AppTheme
            var id = activity.getResources().getIdentifier("AppTheme", "style", activity.getPackageName());
            activity.setTheme(id);
        }
    }
}else {
    if (app.ios) {
        var fontModule = require("ui/styling/font");
        if (fontModule.ios) {
            fontModule.ios.registerFont("FontAwesome.otf");
            fontModule.ios.registerFont("KlinicSlabLight.otf");
        }
        // Google Maps API
        GMSServices.provideAPIKey(constants.googleMapsAPIKey);
    }
}

//appversion.getVersionName().then(function (version) {
//    console.log("App version: " + version);
//    appVersionName = version;
//    console.log("AppVersion: ", appVersionName);
//});

//console.log("Device model: " + platform.device.model);
//console.log("Device type: " + platform.device.deviceType);
applicationSettings.setString("osVersion", platform.device.os);
//console.log("OS version: " + platform.device.osVersion);
//console.log("SDK Version: " + platform.device.sdkVersion);

//console.log("Screen width: " + platform.screen.mainScreen.widthPixels);
//console.log("Screen height: " + platform.screen.mainScreen.heightPixels);
//console.log("Screen scale: " + platform.screen.mainScreen.scale);

//start firebase
firebase.init({
    iOSEmulatorFlush: true
}).then(
    function (instance) {
        console.log("firebase.init done");
    },
    function (error) {
        console.log("firebase.init error: " + error);
    }
);

app.on(app.launchEvent, function (context) {
    console.log("appState", applicationSettings.getString("appState")); // Prints "John Doe".
    //analytics.init({ appId: constants.analyticsId });
    //analytics.start();
});

app.on(app.exitEvent, function (context) {
    //analytics.stop();
});

app.on(app.suspendEvent, function (args) {
    applicationSettings.setString("appState", "suspended");
    console.log("appState", applicationSettings.getString("appState")); // Prints "John Doe".
    if (applicationSettings.getBoolean("activeSession")) {
        token.startAppStateTimer();
    }
});

app.on(app.resumeEvent, function (args) {
    applicationSettings.setString("appState", "resumed");
    console.log("appState", applicationSettings.getString("appState")); // Prints "John Doe".
    if (applicationSettings.getBoolean("activeSession")) {
        token.stopAppStateTimer();
    }
});

// TODO: implement handling of uncaught errors with analytics 
app.on(app.uncaughtErrorEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an NativeScriptError.
        //console.log("NativeScriptError: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        //console.log("NativeScriptError: " + args.ios);
    }
    utility.resetAppSettings();
});

//app.mainModule = "views/find-phr/main";
//app.mainModule = "views/location-search/main";
//app.mainModule = "views/symptom-checker/main";
//app.mainModule = "views/contact-uh/main";
//app.mainModule = "views/condition-search/main";
//app.mainModule = "views/provider-search/main";
//if (!applicationSettings.getBoolean("isAccepted")) {
//    app.start({ moduleName: "views/disclaimer/disclaimer" });
//} else {
//    app.start({ moduleName: "views/welcome/welcome" });
//};
app.start({ moduleName: "views/disclaimer/disclaimer" });
//app.mainModule = "views/disclaimer/disclaimer";
//app.mainModule = "views/schedule-appt/schedule-appt";
//app.mainModule = "views/test/maps/maps";
//app.mainModule = "views/test/scanner/scanner";
//app.mainModule = "views/test/list/list";
//app.mainModule = "views/referral-ease/referral-ease";
//app.mainModule = "views/request-an-appointment/main";
//app.mainModule = "views/requestappointmentconfirmation/main";