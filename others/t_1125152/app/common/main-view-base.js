var Observable = require("data/observable").Observable;
var builder = require("ui/builder");
var frameModule = require('ui/frame');
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var Label = require('ui/label').Label;
var viewModule = require("ui/core/view");
var applicationSettingsModule = require("application-settings");
var disclaimerUtil = require("~/components/disclaimer-util");
var updateCheckUtil = require("~/components/update-check-util");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");

//var MainViewModel = require("./main-view-model");

function MainView (options) {
    var view = new View();

    view.navigatingTo = function(args) {
        var that = view;

        applicationSettingsModule.setBoolean("isNavigating", false);
        disclaimerUtil.checkDisclaimer();
        updateCheckUtil.checkCompatibility();

        // show loading indicator
        that.viewModel.set("isLoading", true);
    };

    view.loaded = function(args) {
        var that = view;
    };

    view.navigatedTo = function (args) {
        var that = view;
        var pageOptions = {
            pageName: options.pageName,
            showBackButton: options.showBackButton
        };

        var page = args.object;
        var currentPage = frameModule.topmost().currentPage;
        var pageContent = page.getViewById("pageContent");
        var currentPageContent = currentPage.getViewById("pageContent");
        that.createContent(page);
        
        that.initialize(args, pageOptions);
    };

    view.createContent = function(page) {
        var that = view;
        var pageContent = page.getViewById("pageContent");

        var contentLayout = builder.load({
            path: options.contentPath,
            name: options.contentModuleName,
            page: page
        });
        pageContent.addChild(contentLayout);

        var contentView = require(options.contentPath + "/" + options.contentModuleName);
        contentView.loaded(page);
        contentLayout.bindingContext = contentView.viewModel;

        // hide loading indicator
        that.viewModel.set("isLoading", false);
    };

    return view;
}

exports.MainView = MainView;