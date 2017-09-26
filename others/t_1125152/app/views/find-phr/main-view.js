var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Find PHR",
    pageName: "FindPHR",
    contentPath: "~/views/find-phr",
    contentModuleName: "find-phr",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;