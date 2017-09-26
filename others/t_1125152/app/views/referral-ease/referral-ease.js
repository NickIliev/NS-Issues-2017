var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var firebase = require("nativescript-plugin-firebase");
var app = require("application");
var View = require("~/common/view-base")

//accelerometer.startAccelerometerUpdates(function (data) {
//    console.log("x: " + data.x + "y: " + data.y + "z: " + data.z);
//}, { sensorDelay: "normal" });

var ScannerViewModel = require("./scanner-view-model");

var page;
var refInput
var view = new View();
view.viewModel = new ScannerViewModel();

view.loaded = function (args) {
    var that = view;
    page = args.object;

    var options = {
        pageName: "ScanReferral"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
      
    view.disMissFocus();
    that.viewModel.load(args);
    if (app.ios) {

        var referralInput = page.getViewById("referralInput");

        referralInput.text = "";
    }
};

view.disMissFocus = function () {
    var referralInput = page.getViewById("referralInput");
    if (referralInput.ios) {
        referralInput.ios.endEditing(true);
    } else if (referralInput.android) {
        referralInput.android.clearFocus();
    }
}

view.scan = function () {
    var that = view;
    view.disMissFocus();
    view.viewModel.scan();
};

view.verify = function (args) {
    var that = view;
    firebase.analytics.logEvent({
        key: "SMNReferral",
        parameters: [
        {
            key: "SMNScan",
            value: "Manual Entry"
        }]
    });
    refInput = page.getViewById("referralInput");
    view.viewModel.verify(refInput.text);
};

view.unloaded = function (args) {
    var that = view;
    page.getViewById("referralInput").text = "";
    console.log("unloaded");
}
view.viewTutorial = function () {
    var that = view;
    console.log("relaunch tutorial");
    frameModule.topmost().navigate({
        moduleName: 'views/tutorial/tutorial/'
    });
}

view.clear = function () {
    var that = view;
    that.viewModel.set("scanCode", null);
}


module.exports = view;