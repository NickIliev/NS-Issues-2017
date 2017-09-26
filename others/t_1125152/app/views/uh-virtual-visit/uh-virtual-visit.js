var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var navigation = require("~/components/navigation");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var frame = require("ui/frame");
var WebView = require("ui/web-view").WebView;

var View = require("~/common/view-base");

var UHVirtualVisitViewModel = require("./uh-virtual-visit-view-model");

var view = new View();
view.viewModel = new UHVirtualVisitViewModel();

view.loaded = function(page) {    
    var that = view;
    that.page = page;
    that.webView = that.page.getViewById("webView");
    that.webView.on(WebView.loadFinishedEvent, function (result) {
        var message;
        if (!result.error) {
            message = "WebView finished loading " + result.url;
            that.viewModel.set("loadingError", false);
            that.viewModel.set("isLoading", false);
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

};

module.exports = view;
