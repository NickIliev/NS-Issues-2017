var app = require("application");
var applicationSettingsModule = require("application-settings");
var navigation = require("~/components/navigation");
var firebase = require("nativescript-plugin-firebase");

exports.checkDisclaimer = function () {
    if (!applicationSettingsModule.getBoolean("isAccepted")) {
        navigation.goToDisclaimer();
    };
};

exports.setDisclaimer = function (accepted) {
    applicationSettingsModule.setBoolean("isAccepted", accepted);
    firebase.analytics.logEvent({
        key: "DisclaimerAccepted"
    });
};