var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Referral Providers",
    pageName: "ReferralProviders",
    contentPath: "~/views/referral-providers",
    contentModuleName: "referral-providers",
    showBackButton: true
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;