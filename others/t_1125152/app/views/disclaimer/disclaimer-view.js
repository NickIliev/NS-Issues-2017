var Observable = require("data/observable").Observable;
var utils = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");

var utility = require("~/common/utility");
var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var disclaimerUtil = require("~/components/disclaimer-util");

var DisclaimerViewModel = require("./disclaimer-view-model");
var frameModule = require("ui/frame");
var view = new View();
view.viewModel = new DisclaimerViewModel();

view.loaded = function(args) {
    console.log("disclaimer-view oloaded");
    var that = view;
    var options = {
        pageName: "Disclaimer"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
};

view.onNavigatedTo = function(args) {
    console.log("disclaimer-view onNavigatedTo");
    var that = view;
    var options = {
        pageName: "Disclaimer"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
};

view.onTapTermsLink = function (args) {
    var that = view;
    navigation.goToTermsOfUse(args,true);
};

view.btnIagree = function (args) {
    var that = view;
    that.viewModel.set("understand", true);
    that.viewModel.set("accept", true);

    if (that.viewModel.isAccepted()) {
        disclaimerUtil.setDisclaimer(true);
        navigation.goToAccessUH();
    }
}


module.exports = view;
