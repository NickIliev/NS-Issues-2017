var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "UH Virtual Visit",
    pageName: "UHVirtualVisit",
    contentPath: "~/views/uh-virtual-visit",
    contentModuleName: "uh-virtual-visit",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;