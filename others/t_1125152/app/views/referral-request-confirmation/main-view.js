var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;
var appSettings = require("application-settings");

var options = {
    pageTitle: "Referral Request Confirmation",
    pageName: "ReferralRequestConfirmation",
    contentPath: "~/views/referral-request-confirmation",
    contentModuleName: "referral-request-confirmation",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

view.loaded = function () {
    console.log("hideActionBar", appSettings.getBoolean("hideActionBar"));
    view.viewModel.set("hideActionBar", appSettings.getBoolean("hideActionBar"));
}

module.exports = view;