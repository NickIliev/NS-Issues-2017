var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var utility = require("~/common/utility");

var constants = require("~/common/constants");
var utility = require("~/common/utility");
var cloneModule = require("~/common/clone-extend");

var model = require("~/views/provider-search/provider-search-model");

var FiltersViewModel = new Observable({
    isInitialized: false,
    sortByClosest: true,
    isFilterSelectAll: true,
    filterBy: new ObservableArray ([]),
    currentCriteria: new Observable ({
        sortByClosest: true,
        filterBy: new ObservableArray([])
    })
});

FiltersViewModel.load = function () {
    var that = this;
    
    console.log("loading location types");

    var requestOptions = {
        url: constants.apiUrl + "LocationType/Get",
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };

    return utility.httpRequest(that, requestOptions,
        function (response) { // success callback
            console.log("get locationTypes completed");
            var data = response.content.toJSON();
            data.Data.forEach(function(item) {
                item.isSelected = true;
                that.filterBy.push(item);
            });
            that.applyCriteria();
        },
        function () { // error callback
        })
        .then(function (){
            that.set("isInitialized", true);
        });
};

FiltersViewModel.selectERAndUrgentCare = function () {
    var that = this;
    // select ER and Urgent Care filters only, but leave sorting alone
    that.set("isFilterSelectAll", false);
    if (that.filterBy.length > 0) {
        that.filterBy.forEach(function (item) {
            if (item.IsEROrUrgentCareFilter) {
                item.isSelected = true;
            }
            else {
                item.isSelected = false;
            }
            console.log(item.Name + ": " + item.isSelected);
        });
    }
    that.applyCriteria();
};

FiltersViewModel.setDefaults = function () {
    var that = this;
    that.set("sortByClosest", true);
};

FiltersViewModel.resetCriteria = function () {
    var that = this;

    that.set("filterBy", new ObservableArray(cloneModule.clone(that.get("currentCriteria").get("filterBy")._array)));
    that.set("sortByClosest", that.get("currentCriteria").get("sortByClosest"));
    that.set("isFilterSelectAll", that.get("currentCriteria").get("isFilterSelectAll"));
};

FiltersViewModel.applyCriteria = function () {
    var that = this;

    that.get("currentCriteria").set("filterBy", new ObservableArray(cloneModule.clone(that.get("filterBy")._array)));
    that.get("currentCriteria").set("sortByClosest", that.get("sortByClosest"));
    that.get("currentCriteria").set("isFilterSelectAll", that.get("isFilterSelectAll"));
};

module.exports = FiltersViewModel;