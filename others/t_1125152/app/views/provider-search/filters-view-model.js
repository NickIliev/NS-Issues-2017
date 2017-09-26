var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var constants = require("~/common/constants");
var utility = require("~/common/utility");
var cloneModule = require("~/common/clone-extend");

var model = require("~/views/provider-search/provider-search-model");
var dropdown = require("~/components/dropdown");

var FiltersViewModel = new Observable({
    showInsurance: true,
    showFilters: false,
    showInsuranceSelection: false,
    showConditionSelection: false,
    sortBy: new Observable({
        SelectedIndex: 0,
        SortTypes: new dropdown(model.SortTypes, "DisplayValue")//model.SortTypes
    }),
    filters: new ObservableArray ([]),
    Gender: new Observable ({
        isSelected: false,
        SelectedIndex: 0,
        Genders: new dropdown(model.Genders, "DisplayValue") // model.Genders
    }),
    Insurance: new Observable({
        numSelected: 0,
        numSelectedMax: 2,
        SearchTerm: "",
        Insurances: {
            Data: new ObservableArray ([]),
            Count: 0
        }
    }),
    Condition: new Observable({
        numSelected: 0,
        numSelectedMax: 1,
        SearchTerm: "",
        Conditions: {
            Data: new ObservableArray ([]),
            Count: 0
        }
    }),
    currentCriteria: new Observable ({})
});

FiltersViewModel.setDefaults = function () {
    var that = this;
    that.set("showInsurance", true);
    that.set("showFilters", false);
    that.set("showInsuranceSelection", false);
    that.set("showConditionSelection", false);
    that.sortBy.set("SelectedIndex", 0);
    that.Gender.set("isSelected", false);
    that.Gender.set("SelectedIndex", 0);
    that.Insurance.set("numSelected", 0);
    that.Insurance.set("SearchTerm", "");
    that.Insurance.set("Insurances", {
            Data: new ObservableArray ([]),
            Count: 0
        });
    that.Condition.set("numSelected", 0);
    that.Condition.set("SearchTerm", "");
    that.Condition.set("Conditions", {
            Data: new ObservableArray ([]),
            Count: 0
        });

    that.set("filters", new ObservableArray([]));
    that.currentCriteria.set("filters", new ObservableArray([]));
    that.currentCriteria.set("Gender", {
        isSelected: false,
        SelectedIndex: 0
    });
    that.currentCriteria.set("Condition", 0);
    that.currentCriteria.set("Insurance", 0);
    that.currentCriteria.set("sortBy", 0);
};

FiltersViewModel.resetCriteria = function () {
    var that = this;

    that.get("sortBy").set("SelectedIndex", that.get("currentCriteria").sortBy);
    
    that.get("Gender").set("isSelected", that.get("currentCriteria").get("Gender").isSelected);
    that.get("Gender").set("SelectedIndex", that.get("currentCriteria").get("Gender").SelectedIndex);

    that.get("Insurance").set("numSelected", that.get("currentCriteria").get("Insurance"));
    that.get("Condition").set("numSelected", that.get("currentCriteria").get("Condition"));

    that.set("filters", new ObservableArray(cloneModule.clone(that.get("currentCriteria").get("filters")._array)));

    that.resetSearches();
};

FiltersViewModel.applyCriteria = function () {
    var that = this;

    that.get("currentCriteria").set("sortBy", that.get("sortBy").get("SelectedIndex"));
    that.get("currentCriteria").set("Gender", {
        isSelected: that.get("Gender").get("isSelected"),
        SelectedIndex: that.get("Gender").get("SelectedIndex"),
    });
    that.get("currentCriteria").set("Insurance", that.get("Insurance").get("numSelected"));
    that.get("currentCriteria").set("Condition", that.get("Condition").get("numSelected"));

    that.get("currentCriteria").set("filters", new ObservableArray(cloneModule.clone(that.get("filters")._array)));

    that.resetSearches();
};

FiltersViewModel.sortBy.on(Observable.propertyChangeEvent, function(propertyChangeData){
    console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
});

FiltersViewModel.Gender.on(Observable.propertyChangeEvent, function(propertyChangeData){
    var that = FiltersViewModel;
    if(propertyChangeData.propertyName === "SelectedIndex" && propertyChangeData.value !== 0) {
        console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);

        var gender = that.Gender.Genders._array[propertyChangeData.value];
        var filter = {
            type: "dropdown",
            field: "Gender",
            display: "Gender: " + gender.DisplayValue,
            controlId: "genderFilter",
            value: gender.Value
        };
        that.filters.push(filter);
        that.notify({eventName: "hideFilterControl", filter: filter});

        console.log("gender filter added");
    }
});

FiltersViewModel.Insurance.on(Observable.propertyChangeEvent, function(propertyChangeData){
    if (propertyChangeData.propertyName === "SearchTerm" &&
        propertyChangeData.value.length > 2) {
        console.log(propertyChangeData.value);
        FiltersViewModel.insuranceSearch();
    }
});

FiltersViewModel.Condition.on(Observable.propertyChangeEvent, function(propertyChangeData){
    if (propertyChangeData.propertyName === "SearchTerm" &&
        propertyChangeData.value.length > 2) {
        console.log(propertyChangeData.value);
        FiltersViewModel.conditionSearch();
    }
});

FiltersViewModel.clearInsuranceSearchResults = function () {
    var that = this;
    that.notify({eventName: "scrollToTopList"});
    while (that.Insurance.Insurances.Data.length) {
        that.Insurance.Insurances.Data.pop();
    }
    that.Insurance.Insurances.Count = 0;
};

FiltersViewModel.clearConditionSearchResults = function () {
    var that = this;
    that.notify({eventName: "scrollToTopList"});
    while (that.Condition.Conditions.Data.length) {
        that.Condition.Conditions.Data.pop();
    }
    that.Condition.Conditions.Count = 0;
};

FiltersViewModel.insuranceSearch = function () {
    var that = this;
    console.log("filtering results started");
    that.clearInsuranceSearchResults();

    var requestOptions = {
        url: constants.apiUrl + "Insurance/GetBySearch",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            SearchTerm: that.Insurance.SearchTerm
        })
    };

    that.insuranceRequest = utility.httpRequest(that, requestOptions,
        function (response) { // success callback
            console.log("searchCompleted");
            var filters = that.get("filters");
            var data = response.content.toJSON();
            that.Insurance.Insurances.Count = data.Count;

            data.Data.forEach(function(insurance) {
                // only show search results that are not already in filters
                if(filters.filter(function(item) {
                    return (insurance === item.value)
                }, insurance).length === 0) {
                    that.Insurance.Insurances.Data.push(insurance);
                }
            });
        },
        function () { // error callback
        })
        .then(function(){
            that.hidePageLoading();
            that.set("loadingResults", false);
        });    

    return that.insuranceRequest;
};

FiltersViewModel.conditionSearch = function () {
    var that = this;
    console.log("filtering results started");
    that.clearConditionSearchResults();

    var requestOptions = {
        url: constants.apiUrl + "Condition/GetBySearch",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            SearchTerm: that.Condition.SearchTerm
        })
    };

    that.conditionRequest = utility.httpRequest(that, requestOptions,
        function (response) { // success callback
            console.log("searchCompleted");
            var filters = that.get("filters");
            var data = response.content.toJSON();
            that.Condition.Conditions.Count = data.Count

            data.Data.forEach(function(condition) {
                // only show search results that are not already in filters
                if(filters.filter(function(item) {
                    return (condition === item.value)
                }, condition).length === 0) {
                    that.Condition.Conditions.Data.push(condition);
                }
            });
        },
        function () { // error callback
        })
        .then(function(){
            that.hidePageLoading();
            that.set("loadingResults", false);
        });    

    return that.conditionRequest;
};

FiltersViewModel.resetSearches = function () {
    var that = this;

    that.clearInsuranceSearchResults();
    that.clearConditionSearchResults();

    that.Insurance.set("SearchTerm", "");
    that.Condition.set("SearchTerm", "");

    that.notify({eventName: "resetTextViews"});
}

module.exports = FiltersViewModel;