var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Referral Availablility",
    pageName: "ReferralAvailablility",
    contentPath: "~/views/referral-availability",
    contentModuleName: "referral-availability",
    showBackButton: true
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;