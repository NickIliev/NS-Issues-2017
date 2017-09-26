var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var RadListView = require("nativescript-telerik-ui/listview").RadListView;
var applicationSettingsModule = require("application-settings");
var formUtil = require("~/components/form-util");

var popupViewModel = require("~/components/popup/popup-view-model");

var view = new Observable();
view.viewModel = popupViewModel;

view.onShowingModally = function (args) {
    var that = view;
    that.page = args.object;
    that.navigationContext = args.context;

    that.page.bindingContext = popupViewModel;

    that.viewModel.load(that.navigationContext);

    that.page = args.object;

    applicationSettingsModule.setBoolean("isShowingModal", true);
    // if (that.page.ios && that.page.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
    //     that.page.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    // }
}

view.onShownModally = function (args) {
    var that = view;
    that.closeCallback = args.closeCallback;

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

    if (that.closeCallback) {
        that.closeCallback(confirmation);
    }
    else {
        frame.topmost().goBack();
    }
}

view.onTapContinue = function (args) {
    view.close(true);
}

view.onTapCancel = function (args) {
    view.close(false);
}

module.exports = view;