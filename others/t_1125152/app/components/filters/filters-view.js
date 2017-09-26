var frameModule = require("ui/frame");
var gesturesModule = require("ui/gestures");
var topmost = frameModule.topmost();
var dialogs = require("ui/dialogs");
var utility = require("~/common/utility");
var Observable = require("data/observable").Observable;
var RadListView = require("nativescript-telerik-ui/listview").RadListView;
var applicationSettingsModule = require("application-settings");
var token = require("~/common/token");
var View = require("~/common/view-base");

var FiltersViewModel = require("./filters-view-model");
var view = new View();
view.viewModel = new FiltersViewModel();

var page;
var filterByInsurance;
var insuranceListViewContainer;
var closeInsuranceFilter;
var insuranceLabel;
var insuranceIcon;
var zipCodeLabel;
var zipCodeIcon;
var rdbName;
var problem;
var module;
var searchTerm;
var tokenObj;
var filterModal = new View();

view.onShowingModally = function (args) {
    var that = view;

    page = args.object;

    var options = {
        pageName: "FiltersView"
    };
    module = args.context.module;
    searchTerm = args.context.searchTerm;
    tokenObj = args.context.token;

    if (module == 'referral provider') {
        var ReferralProvidersViewModel = require("../../views/referral-providers/referral-providers-view-model");
        filterModal.viewModel = new ReferralProvidersViewModel();
        filterModal.viewModel.set("problem", args.context.problem);
    } else {
        var ProviderSearchViewModel = require("../../views/provider-search/provider-search-view-model");
        filterModal.viewModel = new ProviderSearchViewModel();
    }

    that.txtInsurance = page.getViewById("txtInsurance");
    filterByInsurance = page.getViewById("filterByInsurance");
    insuranceListViewContainer = page.getViewById("insuranceListViewContainer");
    closeInsuranceFilter = page.getViewById("closeInsuranceFilter");
    insuranceLabel = page.getViewById("insuranceLabel");
    insuranceIcon = page.getViewById("insuranceIcon");

    that.zipCode = page.getViewById("zipCode");
    zipCodeIcon = page.getViewById("zipCodeIcon");
    zipCodeLabel = page.getViewById("zipCodeLabel");
    rdbName = page.getViewById("zipCodeLabel");

    closeInsuranceFilter.animate({
        opacity: 0
    });

    view.setFilters();
    var modalPage = args.object;
    if (modalPage.ios && modalPage.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
        modalPage.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    }

    token.updateToken(tokenObj);
    applicationSettingsModule.setBoolean("isShowingModal", false);

    that.initialize(args, options);
}

view.onShownModally = function (args) {
    var that = view;
    that.closeCallback = args.closeCallback;
    var modalPage = args.object;

    // if (frame.topmost().currentPage.modal !== args.object) {
    //     throw new Error(`frame.topmost().currentPage.modal.id: ${frame.topmost().currentPage.modal.id}; modalPage.id: ${modalPage.id}`);
    // }
}

view.hasFocus = function () {

    insuranceListViewContainer
    console.log(filterByInsurance);
    filterByInsurance.animate({
        translate: { x: 0, y: -235 }
    });
    insuranceListViewContainer.animate({
        opacity: 1
    });
    closeInsuranceFilter.animate({
        opacity: 1
    });
}

view.setZipCode = function (args) {
    var that = view;
    var text = args.object.text;
    if (text.length == 5) {
        zipCodeLabel.text = "Zip Code Added";
        zipCodeLabel.className = "hasValue";
        zipCodeIcon.className = "iconCheckCircle";
    } else if(text.length > 5){
        zipCodeLabel.text = "Check Zip Code";
        zipCodeLabel.className = "hasNoValue";
        zipCodeIcon.className = "iconPlusCircle";
    } else if (text.length > 0 && text.length < 5) {
        zipCodeLabel.text = "Zip Code too Short";
        zipCodeLabel.className = "hasNoValue";
        zipCodeIcon.className = "iconPlusCircle";
    } else if (text.length < 1) {
        zipCodeLabel.text = "Add Zip Code";
        zipCodeLabel.className = "hasNoValue";
        zipCodeIcon.className = "iconPlusCircle";
    }
}


view.close = function () {
    var that = view;
    console.log("close click");
    filterByInsurance.animate({
        translate: { x: 0, y: 0 }
    });
    insuranceListViewContainer.animate({
        opacity: 0
    });
    closeInsuranceFilter.animate({
        opacity: 0
    });

    if (that.txtInsurance.text.length > 0) {
        insuranceLabel.className = 'hasValue';
        insuranceLabel.text = "Insurance Added";
        insuranceIcon.className = "iconCheckCircle";
    } else {
        insuranceLabel.className = 'hasNoValue';
        insuranceLabel.text = "Add Insurance";
        insuranceIcon.className = "iconPlusCircle";
    }
    token.updateToken(tokenObj);
}

view.checkInsurance = function () {
    var that = view;
    if (that.txtInsurance.text.length > 0) {
        insuranceLabel.className = 'hasValue';
        insuranceLabel.text = "Insurance Added";
        insuranceIcon.className = "iconCheckCircle";
    } else {
        insuranceLabel.className = 'hasNoValue';
        insuranceLabel.text = "Add Insurance";
        insuranceIcon.className = "iconPlusCircle";
    }
}

view.setFilters = function () {
    var that = view;
    var gender = that.viewModel.get("gender");
    console.log("gender", gender);
    if (gender === "A") {
        page.getViewById("rdbAll").src = "~/images/common/radio-checked.png";
        page.getViewById("rdbMale").src = "~/images/common/radio-unchecked.png";
        page.getViewById("rdbFemale").src = "~/images/common/radio-unchecked.png";
    } else if (gender === "Male") {
        page.getViewById("rdbAll").src = "~/images/common/radio-unchecked.png";
        page.getViewById("rdbMale").src = "~/images/common/radio-checked.png";
        page.getViewById("rdbFemale").src = "~/images/common/radio-unchecked.png";
    } else if (gender === "Female") {
        page.getViewById("rdbAll").src = "~/images/common/radio-unchecked.png";
        page.getViewById("rdbMale").src = "~/images/common/radio-unchecked.png";
        page.getViewById("rdbFemale").src = "~/images/common/radio-checked.png";
    }

    var sort = that.viewModel.get("sort");
    console.log("sort", sort);
    if (sort === "Closest") {
        page.getViewById("rdbDistance").src = "~/images/common/radio-checked.png";
        page.getViewById("rdbName").src = "~/images/common/radio-unchecked.png";
    } else if (sort === "Name") {
        page.getViewById("rdbDistance").src = "~/images/common/radio-unchecked.png";
        page.getViewById("rdbName").src = "~/images/common/radio-checked.png";
    } 
}

view.changeFocus = function (args) {
    var txt1 = args.object.page.getViewById("first");
    var txt2 = args.object.page.getViewById("second");
    if (isTxt1Focused) {
        txt2.focus();
    } else {
        txt1.focus();
    }
    isTxt1Focused = !isTxt1Focused;

    if (device.os === platformNames.android) {
        var imm = utils.ad.getInputMethodManager();
        imm.showSoftInput(args.object.android, android.view.inputmethod.InputMethodManager.SHOW_IMPLICIT);
    }
}

view.resetSort = function () {
    console.log("all Sort radio");
    var that = view;
    page.getViewById("rdbName").src = "~/images/common/radio-unchecked.png";
    page.getViewById("rdbDistance").src = "~/images/common/radio-unchecked.png";
}

view.resetFilter = function () {
    console.log("all Filter radio");
    var that = view;
    page.getViewById("rdbMale").src = "~/images/common/radio-unchecked.png";
    page.getViewById("rdbFemale").src = "~/images/common/radio-unchecked.png";
    page.getViewById("rdbAll").src = "~/images/common/radio-unchecked.png";
    token.updateToken(tokenObj);
}

view.Name = function (args) {
    var that = view;
    view.resetSort();
    page.getViewById("rdbName").src = "~/images/common/radio-checked.png";
    that.viewModel.set("sort", "Name");
    console.log("Name true");
    filterModal.viewModel.set("sort", "Name");
}

view.Distance = function (args) {
    var that = view;
    view.resetSort();
    page.getViewById("rdbDistance").src = "~/images/common/radio-checked.png";
    that.viewModel.set("sort", "Closest");
    console.log("Distance true");
    filterModal.viewModel.set("sort", "Closest");
}

view.Male = function (args) {
    var that = view;
    view.resetFilter();
    page.getViewById("rdbMale").src = "~/images/common/radio-checked.png";
    that.viewModel.set("gender", "Male");
    console.log("Male true");
    filterModal.viewModel.set("gender", "Male");
}

view.Female = function (args) {
    var that = view;
    view.resetFilter();
    page.getViewById("rdbFemale").src = "~/images/common/radio-checked.png";
    that.viewModel.set("gender", "Female");
    console.log("Female true");
    filterModal.viewModel.set("gender", "Female");
}

view.All = function (args) {
    var that = view;
    view.resetFilter();
    page.getViewById("rdbAll").src = "~/images/common/radio-checked.png";
    that.viewModel.set("gender", "A");
    console.log("All true");
    filterModal.viewModel.set("gender", "A");
}

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
    console.log("insurance selected", insurance);
    that.viewModel.get("filters").push(filter);

    that.txtInsurance.text = insurance;
    that.viewModel.insurance = insurance;
    that.viewModel.clearInsuranceSearchResults();

    console.log("insurance filter added");
};

view.closeFilter = function (confirmation) {
    var that = view;
    var filter = page.getViewById("filter");
    console.log(filter);
    if (that.closeCallback) {
        console.log("close");
        console.log("confirmation", confirmation);
        that.closeCallback(confirmation);
    } else {
        frame.topmost().goBack();
    }
    view.setVMFilters();
}

view.setVMFilters = function () {
    var that = view;
    var filters = filterModal.viewModel.get("filters");

    filterModal.viewModel.set("searchTerm", searchTerm);

    console.log("vm gender", filters.length);
    console.log("vm gender", that.viewModel.gender);

    filterModal.viewModel.gender = that.viewModel.gender;
    for (var i = 0; i < filters.length; i++) {
        if (filters[i].field === "Gender") {
            filters[i].value = that.viewModel.gender;
        }
    }
    if (that.zipCode.text.length > 0) {
        var filter = {
            field: "Zip Code",
            value: that.zipCode.text
        };
        filterModal.viewModel.get("filters").push(filter);
    }
    if (that.txtInsurance.text.length > 0) {
        var filter = {
            field: "Insurance",
            value: that.txtInsurance.text
        };
        filterModal.viewModel.get("filters").push(filter);
    }
    if (module == 'referral provider') {
        filterModal.viewModel.set("token", tokenObj);
        token.updateToken(tokenObj);
        console.log("referal provider filer")
    }
    filterModal.viewModel.set("zipCode", that.zipCode.text);
    filterModal.viewModel.set("insurance", that.txtInsurance.text);
    filterModal.viewModel.search();
}


module.exports = view;