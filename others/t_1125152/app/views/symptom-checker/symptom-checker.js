var Observable = require("data/observable").Observable;
var WebView = require("ui/web-view").WebView;

var View = require("~/common/view-base")
var constants = require("~/common/constants")
var tabViewUtil = require("~/components/tabview-util");

var SymptomCheckerViewModel = require("./symptom-checker-view-model");

var applicationSettingsModule = require("application-settings");
var navigation = require("~/components/navigation");

var view = new View();
view.viewModel = new SymptomCheckerViewModel();

view.navigatingTo = function (args) {
	var that = view;
	that.viewModel.set("isLoading", true);
};

view.loaded = function (page) {
    var that = view;
	that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

    tabViewUtil.selectTab(that.viewModel, that.page, 1);

    // if (!that.viewModel.get("initialized")) {
        // TODO: replace with binding below to support revisiting page and maintaining view
	    that.webView = that.page.getViewById("webView");
	    that.webView.on(WebView.loadFinishedEvent, function (result) {
	        var message;
	        if (!result.error) {
	            message = "WebView finished loading " + result.url;
	        }
	        else {
	            message = "Error loading " + result.url + ": " + result.error;
	        }
	        that.viewModel.set("initialized", true);
			that.viewModel.set("isLoading", false);
	        //that.webView.resize();
	        console.log(message);
	    });
	    //that.webView.src = "~/views/symptom-checker/symptom-checker.html";
		that.webView.src = constants.symptomCheckerURL;
		
		// hide android webView zoom controls
		if(that.webView.android) {
			that.webView.android.getSettings().setBuiltInZoomControls(false);
		}
    // }

    // TODO: bind webview here to support revisiting page and maintaining view
};

view.showAccessUH = function (args) {
    view.viewModel.set("selectedScreen", 0);
};
view.showEHI = function (args) {
    //view.viewModel.set("selectedScreen", 1);
    navigation.goToExploreHealth();
    console.log("tab2 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};

module.exports = view;