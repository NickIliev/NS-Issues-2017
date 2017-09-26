var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var Observable = require("data/observable").Observable;
var ViewModel = require("~/common/view-model-base");
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var timer = require("timer");
var constants = require("~/common/constants");
var utility = require("~/common/utility");

function FiltersViewModel() {
    var data = {
        pageTitle: "FiltersViewModel",
        isLoading: true,
        provRefResults: {
            Count: -1,
            Data: new ObservableArray([])
        },
        Insurance: new Observable({
            numSelected: 0,
            numSelectedMax: 2,
            SearchTerm: "",
            Insurances: {
                Data: new ObservableArray([]),
                Count: 0
            }
        }),
        filters: [
            {
                field: "Gender",
                value: "A"
            },
            {
                field: "Problem",
                value: null
            }
        ],
        gender: "A",
        insurance: null,
        sort: "Closest",
        selectedScreen: 0,
        searchTerm: "",
        patientMRN: "",
        problem: "",
        token: "",
        reqID: "",
        preferredPhysicianNPI: "",
        lat: 41.474622,
        lon: -81.778841,
        take: 4,
        skip: 0,
        lastIndex: 0,
        isSearching: false,
        loadingResults: false,
        searchType: "",
        totalCount: 0
    };

    var viewModel = new ViewModel(data);

    viewModel.load = function (context) {
        var that = this;

        console.log("filter view model load");
    };

    viewModel.Insurance.on(Observable.propertyChangeEvent, function (propertyChangeData) {
        console.log("start search");
        if (propertyChangeData.propertyName === "SearchTerm" &&
            propertyChangeData.value.length > 2) {
            //console.log("propertyChangeData.value", propertyChangeData.value);
            viewModel.insuranceSearch();
        }
    });

    viewModel.insuranceSearch = function () {
        var that = this;
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

                data.Data.forEach(function (insurance) {
                    // only show search results that are not already in filters
                    if (filters.filter(function (item) {
                        return (insurance === item.value)
                    }, insurance).length === 0) {
                        that.Insurance.Insurances.Data.push(insurance);
                    }
                });
            },
            function () { // error callback
            })
            .then(function () {
                that.hidePageLoading();
                that.set("loadingResults", false);
            });

        return that.insuranceRequest;
    };

    viewModel.clearInsuranceSearchResults = function () {
        var that = this;
        that.notify({ eventName: "scrollToTopList" });
        while (that.Insurance.Insurances.Data.length) {
            that.Insurance.Insurances.Data.pop();
        }
        that.Insurance.Insurances.Count = 0;
    };

    return viewModel;

}


module.exports = FiltersViewModel;