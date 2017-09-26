var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var RadListView = require("nativescript-telerik-ui/listview").RadListView;
var applicationSettingsModule = require("application-settings");
var formUtil = require("~/components/form-util");


var viewModel = require("~/views/provider-search/condition-select-view-model");

var view = new Observable();
view.viewModel = viewModel;

view.onShowingModally = function (args) {
    var modalPage = args.object;
    if (modalPage.ios && modalPage.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
        modalPage.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    }
    applicationSettingsModule.setBoolean("isShowingModal", true);
}

view.onShownModally = function (args) {
    var that = view;
    that.closeCallback = args.closeCallback;
    var modalPage = args.object;

    // if (frame.topmost().currentPage.modal !== args.object) {
    //     throw new Error(`frame.topmost().currentPage.modal.id: ${frame.topmost().currentPage.modal.id}; modalPage.id: ${modalPage.id}`);
    // }
}

view.onLoaded = function (args) {
    var that = view;
    that.page = args.object;

    that.page.bindingContext = viewModel;

    that.lvCondition = that.page.getViewById("lvCondition");
    that.conditionFilter = that.page.getViewById("conditionFilter");
    that.txtCondition = that.page.getViewById("txtCondition");
}

view.onUnloaded = function() {
    var that = view;

    that.viewModel.resetSearch();
    applicationSettingsModule.setBoolean("isShowingModal", false);
}

view.onSelectCondition = function (args) {
    var that = view;
    var condition = args.view.bindingContext;

    that.setFilter(condition);

    if (that.closeCallback) {
        // call search on return
        that.closeCallback({
            isItemSelected: true,
            display: condition.Name
        });
    }
    else {
        frame.topmost().goBack();
    }
}

view.onCancelButtonTap = function () {
    var that = view;
    if (that.closeCallback) {
        that.closeCallback();
    }
    else {
        frame.topmost().goBack();
    }
}

view.setFilter = function (condition) {
    var that = view;

    var filter = {
        type: "autocomplete",
        field: "Condition",
        display: "Condition: " + condition.Name,
        controlId: "conditionFilter",
        value: condition.ClinicalTermId
    };

    that.viewModel.filterBy.setDefaults();
    that.viewModel.filterBy.currentCriteria.get("filters").push(filter);
    that.viewModel.filterBy.get("filters").push(filter);
    that.viewModel.filterBy.set("selectedCondition", condition.Name);
    
    that.viewModel.filterBy.Condition.set("numSelected", 1);    
    
    that.txtCondition.text = "";
    that.viewModel.clearSearchResults();

    console.log("condition filter added");
};

view.viewModel.on("resetTextViews", function (eventData) {
    that.txtCondition.text = "";
});

module.exports = view;