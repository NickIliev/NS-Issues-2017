var Observable = require("data/observable").Observable;
var imageSource = require("image-source");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");

var ConditionSearchViewModel = require("./condition-search-view-model");

var view = new View();
view.viewModel = new ConditionSearchViewModel([]);

view.loaded = function(page) {
    var that = view;
    that.page = page;

    that.webView = that.page.getViewById("wvStaywell");

    tabViewUtil.selectTab(that.viewModel, that.page, 1);

    // hide android webView zoom controls
    if (that.webView.android) {
        that.webView.android.getSettings().setBuiltInZoomControls(false);
    }
};

view.onWebViewLoadFinished = function (args) {
    var that = view;
    if (args.error) {
        that.viewModel.set("isLoading", false);
        console.log("Error Loading URL. Please try again.");
        that.viewModel.showError(args.error.toString());
    }
    else {
        that.viewModel.set("isLoading", false);
    }
};

view.onWebViewLoadStarted = function (args) {
    var webView = args.object;
    view.viewModel.set("isLoading", true);
};

view.showAccessUH = function (args) {
    /*view.viewModel.set("selectedScreen", 0);*/
    navigation.goToAccessUH();
    console.log("tab1 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};
view.showEHI = function (args) {
    //view.viewModel.set("selectedScreen", 1);
    navigation.goToExploreHealth();
    console.log("tab2 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};

module.exports = view;