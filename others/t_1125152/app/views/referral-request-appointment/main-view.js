var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Referral Appointment Request",
    pageName: "ReferralAppointmentRequest",
    contentPath: "~/views/referral-request-appointment",
    contentModuleName: "referral-request-appointment",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;