var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Contact UH",
    pageName: "ContactUH",
    contentPath: "~/views/contact-uh",
    contentModuleName: "contact-uh",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;