var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Welcome",
    pageName: "AccessUH",
    contentPath: "~/views/welcome",
    contentModuleName: "welcome",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;