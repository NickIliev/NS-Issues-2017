var frame = require("ui/frame");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var RadListView = require("nativescript-telerik-ui/listview").RadListView;
var applicationSettingsModule = require("application-settings");
var formUtil = require("~/components/form-util");

var tokenTimerViewModel = require("~/components/token-timer/token-timer-view-model");

var view = new Observable();
view.viewModel = tokenTimerViewModel;

view.onShowingModally = function (args) {
    var that = view;
    that.page = args.object;
    that.navigationContext = args.context;

    that.page.bindingContext = tokenTimerViewModel;

    that.viewModel.load(that.navigationContext);

    that.page = args.object;
    applicationSettingsModule.setBoolean("isShowingModal", false);
    // if (that.page.ios && that.page.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
    //     that.page.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    // }
}

view.onShownModally = function (args) {
    var that = view;
    that.closeCallback = args.closeCallback;
    view.viewModel.set("closeCallBack", args.closeCallback);

    //if (frame.topmost().currentPage.modal !== args.object) {
        //throw new Error(`frame.topmost().currentPage.modal.id: ${frame.topmost().currentPage.modal.id}; page.id: ${that.page.id}`);
    //}
}


view.onLoaded = function (args) {
    
}

view.onUnloaded = function() {
    var that = view;

    that.viewModel.reset();

    applicationSettingsModule.setBoolean("isShowingModal", false);
}

view.close = function (confirmation) {
    var that = view;
    that.viewModel.clearTimerInterval();
    if (that.closeCallback) {
        console.log("close");
        console.log("confirmation", confirmation);
        that.closeCallback(confirmation);
    } else {
        frame.topmost().goBack();
    }
}

view.onTapContinue = function (args) {
    view.close(true);
}

view.onTapLeave = function (args) {
    view.close(false);
    frameModule.topmost().navigate({
        moduleName: "views/welcome/main/",
        clearHistory: true,
        transition: {
            name: "slideRight",
            duration: 0
        }
    });
}

module.exports = view;