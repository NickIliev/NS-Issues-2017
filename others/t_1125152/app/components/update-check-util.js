var app = require("application");
var appSettings = require("application-settings");
var navigation = require("~/components/navigation");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var http = require("http");
var frameModule = require("ui/frame");
var appversion = require("nativescript-appversion");
var platform = require("platform");
var appVersionName;

exports.checkCompatibility = function () {
    console.log("checking compatibility");
    var that = this;

    http.request({
        url: constants.referralEaseUrl + "Compatibility/CheckCompatibility",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ AppVersion: appSettings.getString("appVersion"), MobilePlatform: platform.device.os })
    }).then(function (response) {
        var response = response.content.toJSON();
        //console.log("compatibility response", JSON.stringify(response));
        exports.compatibilityHandler(response);
    }, function (error) {
        console.error(JSON.stringify(error));
    });
}

exports.compatibilityHandler = function(response) {
    console.log("compatibility handler", JSON.stringify(response));
    console.log("response",response.ResponseType);
    if (response) {
        if (response.Messages == 'Success') {
            if (response.Data.CompatibleVersion === false) {
                exports.updateRequired();
                console.log("version compatible: ", response.Data.CompatibleVersion);
            }
        } else {
            //bad responseType handler
        }
    } else {
        //no response handler

    }
}

exports.updateRequired = function () {
    console.log("launch upgrade app popup start");
    frameModule.topmost().navigate({
        moduleName: "components/update-required/update-required",
        context: {
            title: "Update Required",
            message: "For the best app experience version " + appSettings.getString("appVersion") + " must be updated to the latest version."
        },
        clearHistory: true,
        backstackVisible: false,
        animated: true,
        transition: {
            name: "fade",
            duration: 0,
            curve: "easeIn"
        }
    });
    console.log("launch upgrade app popup finish");
}