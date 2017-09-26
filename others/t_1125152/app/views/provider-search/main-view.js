var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Find a Provider",
    pageName: "ProviderSearch",
    contentPath: "~/views/provider-search",
    contentModuleName: "provider-search",
    showBackButton: true
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;