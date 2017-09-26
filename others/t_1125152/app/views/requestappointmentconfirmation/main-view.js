var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Request Appointment Confirmation", // title anythig
    pageName: "RequestAppointmentConfirmation", // page name same as written view .js
    contentPath: "~/views/requestappointmentconfirmation", // showing folder //..module path
    contentModuleName: "requestappointmentconfirmation", //xml page name
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;