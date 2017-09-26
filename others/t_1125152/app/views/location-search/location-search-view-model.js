var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var listViewModule = require("nativescript-telerik-ui/listview");
var app = require("application");
var applicationSettingsModule = require("application-settings");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var location = require("~/components/location");
var utility = require("~/common/utility");
var navigation = require("~/components/navigation");
var firebase = require("nativescript-plugin-firebase");
var cloneModule = require("~/common/clone-extend");

var model = require("~/views/provider-search/provider-search-model");

function LocationSearchViewModel(items) {
    var data = {
        pageTitle: "Search Locations",
        searchResults: {
            Count: -1,
            Data: new ObservableArray([])
        },
        searchTerm: "",
        currentSearch: {},
        isInitialized: false,
        isSearching: false,
        loadingResults: false,
        currentLocation: {},
        showLocationFailureWarning: true,
        selectedScreen: 0,
        showList: true,
        mapView: new Observable({
            latitude: 41.506235,
            longitude: -81.605221,
            zoom: 8,
            bearing: 0,
            tilt: 0,
            padding: [40,40,40,40]
        }),
        listViewOnDemandMode: listViewModule.ListViewLoadOnDemandMode.None,
        pageTitle: "Find a Location",
        hasPerformedSearch: false,
        sortByClosest: true,
        isFilterSelectAll: true,
        filterBy: new ObservableArray([]),
        currentCriteria: new Observable({
            sortByClosest: true,
            filterBy: new ObservableArray([])
        })
    };
    var viewModel = new ViewModel(data);

    viewModel.clearSearchResults = function () {
        var that = this;

        if(that.get("searchResults").Data.length > 0) {
            // switch back to list view
            that.set("showList", true);
            that.notify({eventName: "scrollToTopList"});

            // remove markers from mapView
            that.notify({eventName: "removeMapMarkers"});

            // clear search results
            while (that.get("searchResults").Data.length) {
                that.searchResults.Data.pop();
            }
            //that.searchResults.Data=new ObservableArray([]);
            that.searchResults.Count = -1;
        }
        console.log("results cleared");
    };

    viewModel.getFilters = function () {
        var that = this;
        var filters = []

        that.currentCriteria.filterBy.forEach(function(item) {
            if(item.isSelected) {
                filters.push(item.LocationTypeID);
            }
        }, this);
        
        return filters.length > 0 ? filters : null;
    };

    viewModel.search = function () {
        var that = this;

        console.log("searchStarted");
        that.set("isSearching", true);
        that.clearSearchResults();

        //if(that.filterBy.currentCriteria.get("sortByClosest")) {
        location.getLocation(that, function (success) {
            if(!success) {
                // couldn't get location
                if(that.get("showLocationFailureWarning")) {
                    that.showError("Couldn't get current location. Searching without.");
                    that.set("showLocationFailureWarning", false);
                }
                //that.set("sortByClosest", false);
               // that.currentCriteria.set("sortByClosest", false);
            } 
            that.doSearch();
        });
        // }
        // else {
        //     that.doSearch();
        // }
    };

    viewModel.getSearchRequestOptions = function (locationTypeIds) {
        var that = this;
        return {
            url: constants.apiUrl + "Location/GetBySearch",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                SearchTerm: that.get("currentSearch").searchTerm,
                Skip: that.get("currentSearch").skip,
                Take: that.get("currentSearch").take,
                Sort: [{
                    Field: that.currentCriteria.sortByClosest ? "Closest" : "Zip"
                }],
                LocationTypeIds: typeof locationTypeIds != 'undefined' ? locationTypeIds : that.getFilters(),
                CurrentLocation: {
                    Latitude: that.get("currentLocation").latitude,
                    Longitude: that.get("currentLocation").longitude
                }
            })
        };
    };

    viewModel.doSearch = function () {
        var that = this;

        console.log("currentLocation: " + JSON.stringify(that.get("currentLocation")));
        
        that.set("currentSearch", {
            searchTerm: that.get("searchTerm"),
            skip: 0,
            take: 15
        });

        var locationTypeIds = that.getFilters(); 

        var requestOptions = that.getSearchRequestOptions(locationTypeIds);

        if(requestOptions && (locationTypeIds || that.get("isFilterSelectAll"))) {
            return utility.httpRequest(that, requestOptions,
                function (response) { // success callback
                    console.log("searchCompleted");
                    var data = response.content.toJSON();
                    // workaround for activity indicator on radlistview not always showing
                    if (app.android) {
                        that.notify({ eventName: "refresh" });
                    }

                    that.searchResults.Count = data.Count;
                    data.Data.forEach(function(item) {
                        item.InQuickerWidget = that.createInQuickerWidget(item.InQuickerURL, item.DisplayName);
                        item.AppointmentPhone = utility.formatPhoneNumber(item.AppointmentPhone);

                        that.searchResults.Data.push(item);
                    });

                    var currentLength = that.get("searchResults").Data.length;
                    console.log("listLength: " + currentLength);
                    var totalCount = that.get("searchResults").Count;
                    console.log("totalCount: " + totalCount);

                    // add markers for locations to the map view
                    that.notify({eventName: "addMapMarkersAndCenter"});

                    if (that.get("searchResults").Data.length < that.get("searchResults").Count) {
                        that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                    } else {
                        that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                    }
                    that.set("hasPerformedSearch", true);
                },
                function () { // error callback
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                })
                .then(function(){
                    that.set("isSearching", false);
                    that.set("searchButtonPressed", false);
                    applicationSettingsModule.setBoolean("isLocationSearchInitialized", true);
                });

        }
        else {
            that.showError("Please select at least one location type from the filters.");
            that.set("hasPerformedSearch", true);
            that.set("isSearching", false);
            that.set("searchButtonPressed", false);
            applicationSettingsModule.setBoolean("isLocationSearchInitialized", true);
        }
    };
    
    viewModel.searchWithNewCriteria = function () {
        var that = this;
        if(that.get("currentSearch").searchTerm != undefined && that.get("currentSearch").searchTerm != null) {
            that.set("searchTerm", that.get("currentSearch").searchTerm)
        }
        that.search();
    };

    viewModel.loadMoreResults = function(args) {
        var that = this;

        console.log("loadingMoreResults Started");
        that.set("loadingResults", true);
        
        that.currentSearch.skip += 15;

        return utility.httpRequest(that, that.getSearchRequestOptions(),
            function (response) { // success callback
                console.log("Initial Length: " + that.get("searchResults").Data.length);
                var data = response.content.toJSON();

                data.Data.forEach(function(item) {
                    item.InQuickerWidget = that.createInQuickerWidget(item.InQuickerURL, item.DisplayName);
                    that.searchResults.Data.push(item);
                });
                console.log("New Length: " + that.get("searchResults").Data.length);
                if (that.get("searchResults").Data.length >= that.get("searchResults").Count) {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                }
                else {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                }
            },
            function () { // error callback
                that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
            })
            .then(function(){
                that.set("loadingResults", false);
                that.notify({eventName: "notifyLoadOnDemandFinished"});
            });
    };

    viewModel.createInQuickerWidget = function (url, displayName) {
        if (url == null || url === "") {
            return null;
        }
        else {
            if (app.android) {
                return '<html><head><style>input{font-size:12px !important; background-color:#e9e8ea;-webkit-appearance:none;border-radius:0px;padding: 3px 5px;box-shadow: none !important;-webkit-box-shadow: none !important;margin-left:0px;border: 1px solid #a7a4a7;}select{font-size:12px !important;border: 1px solid #a7a4a7;background-color:#e9e8ea;-webkit-border-radius:none;border-radius:0px;margin-right: 1px;padding:2px;background-image: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png); background-repeat: no-repeat; background-color:#e9e9ea; background-size: 8px 8px; background-position: 128px ; width: 140px; -webkit-appearance:none; "}</style></head><body><div style="text-align: right; margin-right: -5px;><div style="float: right" class="inquickerEle"><div style="margin-bottom: 0px; color: #3c3c3c; font-size: 14px; font-family: "DroidSans";">Check in now:</div><div style="width: 100%;"><a class="inquicker-hmp" href="' + url + '">Tap Here to Check in now</a></div></div></div><script src="http://inquicker.com/assets/hold_my_place.js"></script></body></html>';
            } else {
                return '<html><head><style>input{background-color:#e9e8ea;-webkit-appearance:none;border-radius:0px;padding: 3px 5px;box-shadow: none !important;margin-left:0px;border: 1px solid #a7a4a7;}select{border: 1px solid #a7a4a7;background-color:#e9e8ea;-webkit-border-radius:none;border-radius:0px;margin-right: 1px;padding: 3px 2px;background-image: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png); background-repeat: no-repeat; background-color:#e9e9ea; background-size: 10 10; background-position: 104px center; width: 120px; -webkit-appearance:none;"}</style></head><body><div style="text-align: right; margin-right: -5px;><div style="float: right" class="inquickerEle"><div style="margin-bottom: 0px; color: #3c3c3c; font-size: 14px">Check in now:</div><div style="width: 100%;"><a class="inquicker-hmp" href="' + url + '">Tap Here to Check in now</a></div></div></div><script src="http://inquicker.com/assets/hold_my_place.js"></script></body></html>';
                
            } 
        }
    };

    viewModel.loadFilters = function () {
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
                data.Data.forEach(function (item) {
                    item.isSelected = true;
                    that.filterBy.push(item);
                });
                that.applyFilters();
            },
            function () { // error callback
            })
            .then(function () {
                that.set("isInitialized", true);
            });
    };

    viewModel.selectERAndUrgentCare = function () {
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
        that.applyFilters();
    };

    viewModel.setDefaults = function () {
        var that = this;
        that.set("sortByClosest", true);
    };

    viewModel.discardChanges = function () {
        var that = this;

        that.set("filterBy", new ObservableArray(cloneModule.clone(that.get("currentCriteria").get("filterBy")._array)));
        that.set("sortByClosest", that.get("currentCriteria").get("sortByClosest"));
        that.set("isFilterSelectAll", that.get("currentCriteria").get("isFilterSelectAll"));
    };

    viewModel.applyFilters = function () {
        var that = this;

        that.get("currentCriteria").set("filterBy", new ObservableArray(cloneModule.clone(that.get("filterBy")._array)));
        that.get("currentCriteria").set("sortByClosest", that.get("sortByClosest"));
        that.get("currentCriteria").set("isFilterSelectAll", that.get("isFilterSelectAll"));
    };

    viewModel.clickLeft = function (args) {
        console.log("i clicked tab " + args.object.id);
        navigation.goToAccessUH();
    }

    viewModel.clickRight = function (args) {
        console.log("i clicked tab " + args.object.id);
        navigation.goToExploreHealth();
    }

    return viewModel;
}

module.exports = LocationSearchViewModel;