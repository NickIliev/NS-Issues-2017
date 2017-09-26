var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Health Conditions",
    pageName: "ConditionSearch",
    contentPath: "~/views/condition-search",
    contentModuleName: "condition-search",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;