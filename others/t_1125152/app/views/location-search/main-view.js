var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Find a Location",
    pageName: "LocationSearch",
    contentPath: "~/views/location-search",
    contentModuleName: "location-search",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;