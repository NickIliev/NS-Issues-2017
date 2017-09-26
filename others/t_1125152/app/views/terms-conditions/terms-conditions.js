var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");
var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var dialogsModule = require("ui/dialogs");
var TermsConditionsViewModel = require("./terms-conditions-view-model");
var utility = require("~/common/utility");
var firebase = require("nativescript-plugin-firebase");
var utils = require("utils/utils");
var frame = require("ui/frame");
var view = new View();
view.viewModel = new TermsConditionsViewModel();

view.loaded = function (args) {

    var that = view;

    var options = {

        pageName: "TermsAndConditions"

    };

    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");

    that.navigationContext = that.page.navigationContext;
    
   
    if (that.viewModel.get("terms").length == 0) {
        view.viewModel.GetTermsCondition();
    }
};

view.onBackButtonTap = function (args) {
    var that = view;
    if (that.navigationContext.disclaimer) {
        navigation.goToDisclaimer();
    }
    else {
        var topmost = frame.topmost();
            topmost.goBack();
    }
}
view.goToTermsOfUse = navigation.goToTermsOfUse;

module.exports = view;