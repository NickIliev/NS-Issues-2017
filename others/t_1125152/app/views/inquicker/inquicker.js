var Observable = require("data/observable").Observable;
var WebView = require("ui/web-view").WebView;

var View = require("~/common/view-base")
var constants = require("~/common/constants")
var tabViewUtil = require("~/components/tabview-util");

var InQuickerViewModel = require("./inquicker-view-model");
var navigation = require("~/components/navigation");

var view = new View();
view.viewModel = new InQuickerViewModel();

view.navigatingTo = function (args) {
	var that = view;
	that.viewModel.set("isLoading", true);
};

view.loaded = function (page) {
    var that = view;
	that.page = page;
	that.navigationContext = that.page.navigationContext;

	that.mainContentElement = that.page.getViewById("main-content");

    tabViewUtil.selectTab(that.viewModel, that.page, 0);

	that.webView = that.page.getViewById("webView");
	that.webView.on(WebView.loadFinishedEvent, function (result) {
		var message;
		if (!result.error) {
			message = "WebView finished loading " + result.url;
			that.viewModel.set("loadingError", false);
		}
		else {
			message = "Error loading " + result.url + ": " + result.error;
			that.viewModel.set("loadingError", true);
			that.showError("There was a problem with loading the InQuicker page. Please try again or call the location if you continue experiencing this issue.");
		}
		that.viewModel.set("initialized", true);
		that.viewModel.set("isLoading", false);
		//that.webView.resize();
		console.log(message);
	});
	that.webView.src = that.navigationContext.url;
	
	// hide android webView zoom controls
	if(that.webView.android) {
		that.webView.android.getSettings().setBuiltInZoomControls(false);
	}
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