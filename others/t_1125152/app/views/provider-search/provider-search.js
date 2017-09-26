var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");
var applicationSettingsModule = require("application-settings");
var frameModule = require('ui/frame');
var utility = require("~/common/utility");
var utils = require("utils/utils");
var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var mapsModule = require("nativescript-google-maps-sdk");
var tabViewUtil = require("~/components/tabview-util");
var Label = require("ui/label").Label;
var location = require("~/components/location");
var firebase = require("nativescript-plugin-firebase");
var appSettings = require("application-settings");
//Added form appjs
var applicationSettings = require("application-settings");
var ProviderSearchViewModel = require("./provider-search-view-model");

var label = new Label();
var view = new View();
view.viewModel = new ProviderSearchViewModel();

var providerList;

// initial loading
view.loaded = function (page) {
    var that = view;
    that.page = page;
    var filter = that.page.getViewById("filter");
    filter.animate({
        translate: { x: 0, y: 1500 }
    });

    providerList = that.page.getViewById("providers-list");
    that.providerListElement = that.page.getViewById("providers-list");

    that.searchBox = that.page.getViewById("txtSearchBox");
    txtIns = that.page.getViewById("txtInsurance");
    txtZip = that.page.getViewById("txtzip");


    tabViewUtil.selectTab(that.viewModel, that.page, 0);

    that.txtInsurance = page.getViewById("txtInsurance");
    var gender = that.viewModel.get("gender");
    if (gender === "A") {
        that.page.getViewById("rdbAll").src = "~/images/common/radio-checked.png";
        that.page.getViewById("rdbMale").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbFemale").src = "~/images/common/radio-unchecked.png";
    } else if (gender === "Male") {
        that.page.getViewById("rdbAll").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbMale").src = "~/images/common/radio-checked.png";
        that.page.getViewById("rdbFemale").src = "~/images/common/radio-unchecked.png";
    } else if (gender === "Female") {
        that.page.getViewById("rdbAll").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbMale").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbFemale").src = "~/images/common/radio-checked.png";
    }

    var sort = that.viewModel.get("sort");
    if (sort === "Closest") {
        that.page.getViewById("rdbDistance").src = "~/images/common/radio-checked.png";
        that.page.getViewById("rdbName").src = "~/images/common/radio-unchecked.png";
    } else if (sort === "Name") {
        that.page.getViewById("rdbDistance").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbName").src = "~/images/common/radio-checked.png";
    }
    if (that.viewModel.searchResults.Count > 0) {
        providerList.refresh(); 
        if(that.providerListElement.items!= undefined)
            providerList.scrollToIndex(appSettings.getNumber("scrollToIndex"));
        //console.log("scroll");
    }
    console.log("search results", that.viewModel.searchResults.Count);

    var ageGroup = that.viewModel.get("ageGroup");
    if (ageGroup == "A") {
        that.page.getViewById("rdbAllAges").src = "~/images/common/radio-checked.png";
        that.page.getViewById("rdbPeds").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbAdults").src = "~/images/common/radio-unchecked.png";
    } else if (ageGroup === "Pediatrics") {
        that.page.getViewById("rdbAllAges").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbPeds").src = "~/images/common/radio-checked.png";
        that.page.getViewById("rdbAdults").src = "~/images/common/radio-unchecked.png";
    } else if (ageGroup === "Adults") {
        that.page.getViewById("rdbAllAges").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbPeds").src = "~/images/common/radio-unchecked.png";
        that.page.getViewById("rdbAdults").src = "~/images/common/radio-checked.png";
    }
}
view.onSearchBtnTap = function (args) {
    var that = view;
    view.search(args);
};

view.search = function (args) {
    var that = view;

    console.log("searchbuttonpress");

    if (that.viewModel.get("searchTerm").trim() === "") {
        return;
    };

    var searchBar = that.page.getViewById("txtSearchBox");
    if (searchBar.ios) {
        searchBar.ios.endEditing(true);
    } else if (searchBar.android) {
        searchBar.android.clearFocus();
    }

    if (!that.viewModel.get("searchButtonPressed")) {
        that.viewModel.set("searchButtonPressed", true);
        that.viewModel.search();
    }
};

//view.selectProvider = function (args) {
//    var providerData = view.viewModel.searchResults.Data.getItem(args.itemIndex);
//    navigation.goToProviderDetail(providerData.ProviderID);
//};

view.showIndex = function (args) {
    var that = view;
    var providerData = view.viewModel.searchResults.Data.getItem(args.itemIndex);
    console.log("itemIndex Info", JSON.stringify(providerData.ProviderID));
    appSettings.setNumber("scrollToIndex", args.itemIndex);
    console.log("showIndex....", appSettings.getNumber("scrollToIndex"));
    //providerList.scrollToIndex(10);
    navigation.goToProviderDetail(providerData.ProviderID);
}

view.selectedProvider = function (args) {
    //console.log("Binding Context id", args.object.bindingContext.ProviderID);
    navigation.goToProviderDetail(args.object.bindingContext.ProviderID);
};

view.requestAnAppointment = function (args) {
    console.log("item index", args.object.index);
    appSettings.setNumber("scrollToIndex", args.object.index);
    navigation.goToRequestedAppointment({
        FullName: args.object.bindingContext.FullName.split(',')[0],
        Degree: args.object.bindingContext.Degree,
        Specialties: args.object.bindingContext.Specialties
    });
};

view.onTapZocDocWidget = function (args) {
    var that = view;
    var provider = args.object.bindingContext;
    console.log("item index", args.object.index);
    appSettings.setNumber("scrollToIndex", args.object.index);
    console.log("provider.ZocDocId :" + provider.ZocDocId)

    if (provider.ZocDocId != null) {

        console.log("provider.ZocDocId :" + provider.ZocDocId)

        utility.leavingapp(function (data) {

            firebase.analytics.logEvent({
                key: "ScheduleOnZocDoc",
                parameters: [
                {
                    key: "ZocDocId",
                    value: provider != null && provider.ZocDocId != null ? provider.ZocDocId.toString() : null
                },
                {
                    key: "ProviderID",
                    value: provider != null && provider.ProviderID != null ? provider.ProviderID.toString() : null
                }]
            });
            utils.openUrl("http://www.zocdoc.com/doctor/" + provider.ZocDocId);
        }, function (data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    }
    else {
        that.viewModel.showError("There was an error opening ZocDoc scheduling for this provider.");
    }
};

view.callAppointmentNumber = function (args) {
    //console.log("item index", args.object.index);
    var provider = args.object.bindingContext;

    appSettings.setNumber("scrollToIndex", args.object.index);

    firebase.analytics.logEvent({
        key: "ProviderCallToSchedule",
        parameters: [
        {
            key: "ProviderID",
            value: provider != null && provider.ProviderID != null ? provider.ProviderID.toString() : null
        }]
    });
    var appointmentNumber = args.object.bindingContext.AppointmentPhone ? args.object.bindingContext.AppointmentPhone : navigation.callToSchedule();
};

view.disableInput = function () {
    var that = view;
    that.searchBox.editable = false;
};

view.enableInput = function () {
    var that = view;
    that.searchBox.editable = true;
};

view.goBack = function () {
    topmost.goBack();
};

view.resetSort = function () {
    console.log("all Sort radio");
    var that = view;
    that.page.getViewById("rdbName").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbDistance").src = "~/images/common/radio-unchecked.png";
}

view.resetFilter = function () {
    console.log("all Filter radio");
    var that = view;
    that.page.getViewById("rdbMale").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbFemale").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbAll").src = "~/images/common/radio-unchecked.png";
}
view.resetAgeGroup = function () {
    var that = view;
    that.page.getViewById("rdbPeds").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbAdults").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbAllAges").src = "~/images/common/radio-unchecked.png";
}
view.resetAll = function () {
    var that = view;
    view.All();
    view.AllAges();
    view.Distance();
    txtZip.text = "";
    that.viewModel.setAndWatchInsuranceSearchTerm("", that.txtInsurance);
    console.log("reset");
    }
view.Name = function (args) {
    var that = view;
    view.resetSort();
    that.page.getViewById("rdbName").src = "~/images/common/radio-checked.png";
    that.viewModel.set("currentSort", "Name");
    console.log("currentSort", that.viewModel.sort);
    console.log("Name true");
}

view.Distance = function (args) {
    var that = view;
    view.resetSort();
    that.page.getViewById("rdbDistance").src = "~/images/common/radio-checked.png";
    that.viewModel.set("currentSort", "Closest");
    console.log("currentSort", that.viewModel.sort);
    console.log("Distance true");
}

view.Male = function (args) {
    var that = view;
    view.resetFilter();
    that.page.getViewById("rdbMale").src = "~/images/common/radio-checked.png";
    that.viewModel.set("gender", "Male");
    console.log("Male true");
}

view.Female = function (args) {
    var that = view;
    view.resetFilter();
    that.page.getViewById("rdbFemale").src = "~/images/common/radio-checked.png";
    that.viewModel.set("gender", "Female");
    console.log("Female true");
}

view.All = function (args) {
    var that = view;
    view.resetFilter();
    that.page.getViewById("rdbAll").src = "~/images/common/radio-checked.png";
    that.viewModel.set("gender", "A");
    console.log("All true");
}

view.Peds = function (args) {
    var that = view;
    view.resetAgeGroup();
    that.page.getViewById("rdbPeds").src = "~/images/common/radio-checked.png";
    that.viewModel.set("ageGroup", "Pediatrics");
    console.log("Peds true");
}

view.Adults = function (args) {
    var that = view;
    view.resetAgeGroup();
    that.page.getViewById("rdbAdults").src = "~/images/common/radio-checked.png";
    that.viewModel.set("ageGroup", "Adults");
    console.log("Adults true");
}

view.AllAges = function (args) {
    var that = view;
    view.resetAgeGroup();
    that.page.getViewById("rdbAllAges").src = "~/images/common/radio-checked.png";
    that.viewModel.set("ageGroup", "A");
    console.log("All Ages true");
}

view.showFilter = function () {
    var that = view;
    var filter = that.page.getViewById("filter");
    if (that.viewModel.get("searchType") === 1) {
        filter.animate({
            opacity: 1,
            translate: { x: 0, y: 0 }
        });
    } else {
        var context = {
            title: "No search results",
            //message: "To schedule Referral# TW919503310, please call UH Connor Integrative Health Network at 216-285-4070.",
            message: "You must search for a provider before refining results.",
            okButtonText: "Try Again",
            cancelButtonText: "Contact UH"
        };
        utility.launchPopup("action", function (data) {
            // callback
        }, null, context);
    }
}

view.tapClose = function () {
    var that = view;
    that.closeFilter();
    view.resetAll();
    view.doFilterSort();
}

view.tapApply = function () {
    var that = view;
    
    firebase.analytics.logEvent({
        key: "FilterProviderSearchResults"
    });
    console.log("Apply Filters");

    view.doFilterSort();
}

view.closeFilter = function () {
    var that = view;
    var filter = that.page.getViewById("filter");
    console.log(filter);
    filter.animate({
        translate: { x: 0, y: 1000 }
    });
    view.closeIns();
}

view.showIns = function () {
    var that = view;
    var insObject = that.page.getViewById("insContainer");
    console.log(insObject);
    insObject.className = "showIns";
    insObject.animate({
        translate: { x: 0, y: -160 }
    });
   //view.viewModel.set("isSearching", true);
}

view.closeIns = function () {
    var that = view;
    var insObject = that.page.getViewById("insContainer");
    console.log(insObject);
    insObject.animate({
        translate: { x: 0, y: 0 }
    });
    insObject.className = "closeIns";
    that.viewModel.setAndWatchInsuranceSearchTerm(that.viewModel.insurance, that.txtInsurance);
    console.log("Insurance.SearchTerm", that.viewModel.insurance);
    console.log("request options", that.viewModel.getRequestOptions().content);
}

view.clearZip = function () {
    txtZip.text = "";
}

view.clearIns = function (args) {
    var that = view;
    that.viewModel.set("insurance", "");

    that.viewModel.setAndWatchInsuranceSearchTerm("", that.txtInsurance);
    that.viewModel.clearInsuranceSearchResults();
    view.closeIns();
};

view.doFilterSort = function () {
    var that = view;
    txtIns.dismissSoftInput();
    txtZip.dismissSoftInput();
    view.viewModel.set("isSearching", false);
    view.emptyFilters();
    var filters = that.viewModel.filters;
    var insurance = that.viewModel.Insurance.SearchTerm;
    console.log("Insurance.SearchTerm", insurance);
    if (insurance) {
        var filter = {
            type: "autocomplete",
            field: "Insurance",
            display: "Insurance: " + insurance,
            controlId: "insuranceFilter",
            value: that.viewModel.get("insurance")
        };
        that.viewModel.get("filters").push(filter);
    }
    if (txtZip.text) {
        if(isNaN(txtZip.text)){
         var filter = {
            type: "autocomplete",
            field: "City",
            display: "Zip: " + txtZip.text,
            controlId: "zipFilter",
            value: txtZip.text
        };
         }
     else{
            var filter = {
            type: "autocomplete",
            field: "Zip",
            display: "Zip: " + txtZip.text,
            controlId: "zipFilter",
            value: txtZip.text
        };
         }
        that.viewModel.get("filters").push(filter);
    }
    for (var i = 0; i < filters.length; i++) {
        console.log("filter field", filters[i].field);
        if (filters[i].field === "Gender") {
            filters[i].value = that.viewModel.get("gender");
        };
    }
    for (var i = 0; i < filters.length; i++) {
        console.log("filter field", filters[i].field);
        if (filters[i].field === "AgeGroup") {
            filters[i].value = that.viewModel.get("ageGroup");
        };
    }
    //console.log("request options", that.viewModel.getRequestOptions().content);
    that.viewModel.clearInsuranceSearchResults();
    view.closeFilter();
    view.viewModel.search();
}

view.selectInsurance = function (args) {
    var that = view;

    var insurance = args.view.bindingContext;

    that.viewModel.setAndWatchInsuranceSearchTerm(insurance, that.txtInsurance);
    that.viewModel.set("insurance", insurance);
    that.viewModel.clearInsuranceSearchResults();

    console.log("insurance filter added", insurance);
    that.page.getViewById("lvInsurance").refresh();
    view.closeIns();
};

view.emptyFilters = function () {
    var that = view;
    var filters = that.viewModel.get("filters");
    for (var i = filters.length; i--;) {
        if (filters[i].field === "Insurance" || filters[i].field === "Zip") {
            filters.splice(i, 1);
        }
    };
}

view.discardChanges = function () {
    var that = view;
    var filters = that.viewModel.filters;
    var selectedFilters = [];

    for (var i = 0; i < filters.length; i++) {
        if (filters[i].field === "Gender") {
            that.viewModel.set("gender", filters[i].value);
        }
    }

    that.viewModel.set("sort", that.viewModel.get("currentSort"));

    that.refreshRadioButtons();
}

// custom viewModel events
view.viewModel.on("notifyLoadOnDemandFinished", function (eventData) {
    view.providerListElement.notifyLoadOnDemandFinished();
});

view.viewModel.on("refresh", function (eventData) {
    view.providerListElement.refresh();
});

view.viewModel.on("scrollToTopList", function (eventData) {
    var that = view;
    if (that.viewModel.searchResults.Count > 0) {
        that.providerListElement.scrollToIndex(0);
    }
});

view.viewModel.on("disableInput", function (eventData) {
    view.disableInput();
});

view.viewModel.on("enableInput", function (eventData) {
    view.enableInput();
});

view.viewModel.on("setSearchBoxHint", function (eventData) {
    view.searchBox.hint = eventData.hint;
});

view.showConditionSelect = function () {
    var that = view;
    if (!applicationSettingsModule.getBoolean("isShowingModal")) {
        that.page.showModal("./views/provider-search/condition-select", {}, function (data) {
            console.log(JSON.stringify(data));
            if (data && data.isItemSelected && data.display) {
                that.viewModel.set("isConditionTriggered", true);
                that.viewModel.set("searchTerm", data.display);
                that.search();
                console.log("search");
            }
            else {
                //cancelCallback();
                console.log("cancel");
            }
        }, false);
    }
};


view.showMap = function (args) {
    var index = args.object.index;
    console.log("index", index);
    var context = {
        data: view.viewModel.searchResults.Data.getItem(index)
    };

    utility.launchMap("action", function (data) {
        // callback
    }, null, context);
}

view.clearSearchTerm = function (args) {
    var that = view;
    that.viewModel.set("searchTerm", "");

    that.page.getViewById("txtSearchBox").focus();
};

view.viewModel.on("showConditionSelect", function (eventData) {
    view.showConditionSelect();
});

view.showAccessUH = function (args) {
    /*view.viewModel.set("selectedScreen", 0);*/
    navigation.goToAccessUH();
    console.log("tab1 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};
view.showEHI = function (args) {
    //view.viewModel.set("selectedScreen", 1);
    navigation.goToExploreHealth();
    console.log("tab2 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};

module.exports = view;