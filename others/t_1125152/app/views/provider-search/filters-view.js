var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var RadListView = require("nativescript-telerik-ui/listview").RadListView;
var applicationSettingsModule = require("application-settings");
var formUtil = require("~/components/form-util");

var filterBy = require("~/views/provider-search/filters-view-model");

var view = new Observable();
view.viewModel = filterBy;

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

    that.page.bindingContext = filterBy;

    // TODO: modularize autocomplete
    that.lvInsurance = that.page.getViewById("lvInsurance");
    that.insuranceFilter = that.page.getViewById("insuranceFilter");
    that.txtInsurance = that.page.getViewById("txtInsurance");

    that.lvCondition = that.page.getViewById("lvCondition");
    that.conditionFilter = that.page.getViewById("conditionFilter");
    that.txtCondition = that.page.getViewById("txtCondition");

    if (that.viewModel.Gender.get("isSelected")) {
        that.hideFilterControl({type: "dropdown", controlId: "genderFilter", field: "Gender"});
    }

    if (that.viewModel.Insurance.get("numSelected") >= that.viewModel.Insurance.get("numSelectedMax")) {
        that.hideFilterControl({type: "autocomplete", controlId: "insuranceFilter", field: "Insurance"});
    }

    if (that.viewModel.Condition.get("numSelected") >= that.viewModel.Condition.get("numSelectedMax")) {
        that.hideFilterControl({type: "autocomplete", controlId: "conditionFilter", field: "Condition"});
    }
    // formUtil.hideKeyboardOnBlur(that.page, [that.txtInsuranceSearchBox, that.txtConditionSearchBox]);

    // // TODO: correct blur on listview gesture. scrolling?
    // formUtil.hideKeyboardOnBlur(that.lvInsurance, [that.txtInsuranceSearchBox]);
    // formUtil.hideKeyboardOnBlur(that.lvCondition, [that.txtConditionSearchBox]);

    that.viewModel.applyCriteria();
}

view.onUnloaded = function() {
    var that = view;

    if (that.viewModel.get("isApplyPressed")) {
        that.viewModel.set("isApplyPressed", false);
    }
    else {
        that.viewModel.resetCriteria();
    }
    applicationSettingsModule.setBoolean("isShowingModal", false);
}

view.onApplyButtonTap = function () {
    var that = view;
    that.viewModel.applyCriteria();
    that.viewModel.set("isApplyPressed", true);
    if (that.closeCallback) {
        // call search on return
        that.closeCallback({
            isCallingSearch: true,
            condition: that.viewModel.get("selectedCondition")
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

view.showFilterControl = function(filter) {
    var that = view;
    var filterControl = that.page.getViewById(filter.controlId);
    filterControl.set("visibility", "visible");
};

view.hideFilterControl = function(filter) {
    var that = view;
    var filterControl = that.page.getViewById(filter.controlId);
    filterControl.set("visibility", "collapse");
    if (filter.type === "dropdown") {
        view.viewModel.get(filter.field).set("isSelected", true);
    }
};

view.viewModel.on("showFilterControl", function (eventData) {
    view.showFilterControl(eventData.filter);
});

view.viewModel.on("hideFilterControl", function (eventData) {
    view.hideFilterControl(eventData.filter);
});

view.removeFilter = function (args) {
    var that = view;

    // prevent multiple taps
    if(!that.viewModel.isRemovingFilter) {
        that.viewModel.set("isRemovingFilter", true);
        var filter = args.view.bindingContext;

        // remove specific item (create new array without it)
        var newArray = that.viewModel.get("filters").filter(function(item){
            return item != filter;
        }, filter);

        that.viewModel.set("filters", new ObservableArray(newArray));

        if (filter.type === "dropdown") {
            that.viewModel.get(filter.field).set("isSelected", false);
            that.viewModel.get(filter.field).set("SelectedIndex", 0);
        }
        else if (filter.type === "autocomplete") {
            that.viewModel.get(filter.field).set("numSelected", that.viewModel.get(filter.field).get("numSelected") - 1);
        }
        that.showFilterControl(filter);
        that.viewModel.set("isRemovingFilter", false);

        if(filter.field === "Condition") {
            that.viewModel.set("selectedCondition", "");
        }
    }
};

// TODO:create common method to be used by condition
view.selectInsurance = function (args) {
    var that = view;
    var insurance = args.view.bindingContext;

    var filter = {
        type: "autocomplete",
        field: "Insurance",
        display: "Insurance: " + insurance,
        controlId: "insuranceFilter",
        value: insurance
    };

    that.viewModel.get("filters").push(filter);
    
    that.viewModel.get(filter.field).set("numSelected", that.viewModel.get(filter.field).get("numSelected") + 1);    
    if(that.viewModel.Insurance.get("numSelected") >= that.viewModel.Insurance.get("numSelectedMax")) {
        that.hideFilterControl(filter);
    }
    that.txtInsurance.text = "";
    that.viewModel.clearInsuranceSearchResults();

    console.log("insurance filter added");
};

view.selectCondition = function (args) {
    var that = view;
    var condition = args.view.bindingContext;

    var filter = {
        type: "autocomplete",
        field: "Condition",
        display: "Condition: " + condition.Name,
        controlId: "conditionFilter",
        value: condition.ClinicalTermId
    };

    that.viewModel.get("filters").push(filter);
    that.viewModel.set("selectedCondition", condition.Name);
    
    that.viewModel.get(filter.field).set("numSelected", that.viewModel.get(filter.field).get("numSelected") + 1);    
    if(that.viewModel.Condition.get("numSelected") >= that.viewModel.Condition.get("numSelectedMax")) {
        that.hideFilterControl(filter);
    }
    that.txtCondition.text = "";
    that.viewModel.clearConditionSearchResults();

    console.log("condition filter added");
};

view.resetTextViews = function () {
    var that = view;
    if(that.txtCondition && that.txtInsurance) {
        that.txtCondition.text = "";
        that.txtInsurance.text = "";
    }
};

view.viewModel.on("resetTextViews", function (eventData) {
    view.resetTextViews();
});

module.exports = view;