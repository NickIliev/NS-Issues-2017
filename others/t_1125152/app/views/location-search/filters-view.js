var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var RadListView = require("nativescript-telerik-ui/listview").RadListView;
var applicationSettingsModule = require("application-settings");
var formUtil = require("~/components/form-util");
var location = require("~/components/location");

var filterBy = require("~/views/location-search/filters-view-model");

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

    that.lvFilterBy = that.page.getViewById("lvFilterBy");

    if (!that.viewModel.get("isInitialized")) {
        that.viewModel.load();
    }
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
        that.closeCallback(true);
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

view.onTapClosestToMe = function (args) {
    var that = view;
    if (!that.viewModel.get("sortByClosest")) {
        location.requireLocation(that.viewModel, function(success) {
            if(success) {
                that.viewModel.set("sortByClosest", true);
            }
        });
    }
    else {
        that.viewModel.set("sortByClosest", false);
    }
}

view.onTapLocationType = function (args) {
    var that = view;
    var checkbox = args.view._subViews[0]._subViews[1]._subViews[0];
    var item = that.viewModel.get("filterBy").getItem(args.index);

    if (item.isSelected) {
        item.isSelected = false;
        that.viewModel.set("isFilterSelectAll", false);
    }
    else {
        item.isSelected = true;
        var allSelected = true;
        that.viewModel.filterBy.forEach(function(item) {
            if(!item.isSelected) {
                allSelected = false;
            }
        }, this);
        that.viewModel.set("isFilterSelectAll", allSelected);
    }

    that.lvFilterBy.refresh();

}

view.onTapSelectAll = function (args) {
    var that = view;
    if (!that.viewModel.get("isFilterSelectAll")) {
        that.viewModel.set("isFilterSelectAll", true);
        that.viewModel.filterBy.forEach(function(item) {
            item.isSelected = true;
        }, this);
        that.lvFilterBy.refresh();
    }
    else {
        that.viewModel.set("isFilterSelectAll", false);
        that.viewModel.filterBy.forEach(function(item) {
            item.isSelected = false;
        }, this);
        that.lvFilterBy.refresh();
    }

}

module.exports = view;