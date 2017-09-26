var Observable = require("data/observable").Observable;
var utils = require("utils/utils");
var http = require("http");
var utility = require("~/common/utility");
var appSettings = require("application-settings");
var appversion = require("nativescript-appversion");
var constants = require("~/common/constants");
var disclaimerUtil = require("~/components/disclaimer-util");
var frameModule = require("ui/frame");
var platform = require("platform");

var AboutUHNowViewModel = require("./about-uhnow-view-model");
var View = require("~/common/view-base");
var view = new View();
view.viewModel = new AboutUHNowViewModel();

view.loaded = function(args) {
    var that = view;
    var options = {
        pageName: "AboutUHNow"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
    http.request({
        url: constants.referralEaseUrl + "Compatibility/CheckCompatibility",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ AppVersion: appSettings.getString("appVersion"), MobilePlatform: platform.device.os })
    }).then(function (response) {
        var response = response.content.toJSON();
        console.log("about UH response", JSON.stringify(response));
        console.log(response.Data.CurrentServiceVersion);
        console.log(view.dateFormat(response.Data.ReleaseDate));
        view.viewModel.set("releaseDate", view.dateFormat(response.Data.ReleaseDate));
        view.viewModel.set("apiVersion", response.Data.CurrentServiceVersion);

    }, function (error) {
        console.error(JSON.stringify(error));
    });

    that.viewModel.load();
};

view.dateFormat = function(versionDate) {
    var newDate = versionDate.split("T");
    newDate = newDate[0].split("-")
    newDate = new Date(versionDate).toUTCString();
    newDate = newDate.split(" ");
    newDate = newDate[2] + " " + newDate[1] + ", " + newDate[3];
    return newDate;
}


module.exports = view;
