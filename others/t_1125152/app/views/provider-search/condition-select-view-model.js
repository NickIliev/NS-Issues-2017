var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var constants = require("~/common/constants");
var utility = require("~/common/utility");
var cloneModule = require("~/common/clone-extend");

var model = require("~/views/provider-search/provider-search-model");
var dropdown = require("~/components/dropdown");

var filterBy = require("~/views/provider-search/filters-view-model");

var ConditionSelectViewModel = new Observable({
    SearchTerm: "",
    Conditions: {
        Data: new ObservableArray ([]),
        Count: 0
    },
    filterBy: filterBy,
    isLoadingResults: false
});

ConditionSelectViewModel.on(Observable.propertyChangeEvent, function(propertyChangeData){
    var that = ConditionSelectViewModel;
    if (propertyChangeData.propertyName === "SearchTerm" &&
        propertyChangeData.value.length > 2) {
        if (that.Conditions.Data.length == 0) {
            that.set("isLoadingResults", true);
        }
        console.log(propertyChangeData.value);
        that.conditionSearch();
    }
});

ConditionSelectViewModel.conditionSearch = function () {
    var that = this;
    console.log("filtering results started");
    that.clearSearchResults();

    var requestOptions = {
        url: constants.apiUrl + "Condition/GetBySearch",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            SearchTerm: that.SearchTerm
        })
    };

    that.conditionRequest = utility.httpRequest(that, requestOptions,
        function (response) { // success callback
            console.log("searchCompleted");
            var data = response.content.toJSON();
            that.Conditions.Count = data.Count

            data.Data.forEach(function(condition) {
                // only show search results that are not already in filters
                that.Conditions.Data.push(condition);
            });
        },
        function () { // error callback
        })
        .then(function(){
            that.set("isLoadingResults", false);
        });   

    return that.conditionRequest;
};

ConditionSelectViewModel.clearSearchResults = function () {
    var that = this;
    that.notify({eventName: "scrollToTopList"});
    while (that.Conditions.Data.length) {
        that.Conditions.Data.pop();
    }
    that.Conditions.Count = 0;
};

ConditionSelectViewModel.resetSearch = function () {
    var that = this;

    that.clearSearchResults();

    that.set("SearchTerm", "");

    that.notify({eventName: "resetTextView"});
}

module.exports = ConditionSelectViewModel;