var frame = require("ui/frame");
var Observable = require("data/observable").Observable;
var app = require("application");
var http = require("http");
var utils = require("utils/utils");

var updateRequiredViewModel = require("~/components/update-required/update-required-view-model");

var view = new Observable();
view.viewModel = updateRequiredViewModel;


view.loaded = function (args) {
    var that = view;
    that.page = args.object;

    that.page.bindingContext = that.page.navigationContext;
    if (app.android) {
        args.object.getViewById("appStoreImage").src = "~/images/google-play-badge.png";
    } else {
        args.object.getViewById("appStoreImage").src = "~/images/app-store-badge.png"
    }
    console.log("update popup is showing");

    // if (that.page.ios && that.page.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
    //     that.page.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    // }
}

view.getCurrentVersion = function () {
    if (app.android) {
        console.log("launch Google Play");
        utils.openUrl("https://play.google.com/store/apps/details?id=org.uhhospitals.uhnow");
    } else {
        console.log("launch Apple Store");
        utils.openUrl("https://itunes.apple.com/us/app/uh-now/id1211816720?mt=8");
    }
}

module.exports = view;