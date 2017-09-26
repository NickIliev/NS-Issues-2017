var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Request Appointment", // title anythig
    pageName: "Request-An-Appointment", // age name same as written view .js
    contentPath: "~/views/request-an-appointment", // showing folder //..module path
    contentModuleName: "request-an-appointment", //xml page name
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;