var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var utility = require("~/common/utility");
var listViewModule = require("nativescript-telerik-ui/listview");
var location = require("~/components/location");
var dropdown = require("~/components/dropdown");
var app = require("application");
var frameModule = require("ui/frame");

var ViewModel = require("~/common/view-model-base");
var constants = require("~/common/constants");
var navigation = require("~/components/navigation");

var model = require("~/views/provider-search/provider-search-model");

function ProviderSearchViewModel() {
    var k;
    var data = {
        pageTitle: "Search Providers",
        searchResults: {
            Count: -1,
            Data: new ObservableArray([])
        },
        Insurance: new Observable({
            numSelected: 0,
            numSelectedMax: 2,
            SearchTerm: new Observable(""),
            Insurances: {
                Data: new ObservableArray([]),
                Count: 0
            }
        }),
        mapCities: {
            Data: new ObservableArray([])
        },
        gender: "A",
        ageGroup: "A",
        filters: [
            {
                field: "Gender",
                value: "A"
            },
            {
                field: "Zip",
                value: "12345"
            },
            {
                field: "AgeGroup",
                value: "A"
            }
        ],
        mapView: new Observable({
            latitude: 41.506235,
            longitude: -81.605221,
            zoom: 8,
            bearing: 0,
            tilt: 0,
            padding: [40, 40, 40, 40]
        }),
        insurance: null,
        searchTerm: "",
        sort: "Closest",
        currentSort: "Closest",
        currentSearch: {},
        isLoading: false,
        isSearching: false,
        loadingResults: false,
        currentLocation: {},
        selectedScreen: 0,
        searchType: 0,
        listViewOnDemandMode: listViewModule.ListViewLoadOnDemandMode.None,
        showMap: false
    };

    var viewModel = new ViewModel(data);

    viewModel.clearSearchResults = function () {
        var that = this;
        that.notify({ eventName: "scrollToTopList" });
        while (that.get("searchResults").Data.length) {
            that.searchResults.Data.pop();
        }
        that.searchResults.Count = -1;
    };

    viewModel.getFilter = function (field) {
        var that = this;
        var filter = "";

        that.get("filters").forEach(function (item) {
            if (item.field === field) {
                filter = item.value;
            }
        }, this);
        
        return filter;
    };

    viewModel.getFilters = function () {
        console.log("getFilters");
        var that = this;
        var filters = [];

        that.filters.forEach(function (item) {
            filters.push({
                Operator: "Eq",
                Field: item.field,
                Value: item.value
            });
            console.log("filter: " + item.field + " - " + item.value);
        }, this);

        return filters.length > 0 ? filters : null;
    };


    viewModel.getCities = function (locations) {
        var that = this;
        var citiesArray = [];
        var cities = {
            location: "",
            total: "",
            array: "",
            all: null,
            more: "",
            isMore: false
        };
        if (locations.length < 4) {
            locations.forEach(function (item) {
                //console.log("distance", item.Distance);
                var distance = item.Distance;
                if(distance != null){
                    distance = ' (' + distance + ' mi)';
                } else {
                    distance = ""
                }
                cities.location += item.City + distance + "\n";
                cities.more = null;
            });
        } else if (locations.length > 3) {
            for (var i = 0; i < 3; i++) {
                //console.log("cities", locations[i].Location.City);
                var distance = locations[i].Distance;
                if (distance != null) {
                    distance = ' (' + distance + ' mi)';
                } else {
                    distance = ""
                }
                cities.location += locations[i].City + '\n';
                that.set("isMore", true);
            }
        }
        locations.forEach(function (item) {
            var distance = item.Distance + ' mi';
            item.City = item.City.replace("Heights","Hts.");
            item.City = item.City.replace("North","N.");
            item.City = item.City.replace("South","S.");
            citiesArray.push(item.City);
            //that.mapCities.Data.push(item.City);
        })        
        cities.all = citiesArray;
        cities.total = locations.length;
        //cities.location = citiesArray;
        return cities;
    };


    viewModel.getRequestOptions = function () {
        var that = this;

        var currentSearch = that.get("currentSearch");
        var currentLocation = that.get("currentLocation");

        var filters = that.getFilters();

        return {
            url: constants.apiUrl + "Provider/GetBySearch",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                SearchTerm: currentSearch.searchTerm,
                Skip: currentSearch.skip,
                Take: currentSearch.take,
                Sort: [{
                    Field: that.get("currentSort")
                }],
                Filter: {
                    Logic: "AND",
                    Filters: filters
                },
                currentLocation: {
                    Latitude: currentLocation.latitude,
                    Longitude: currentLocation.longitude
                }
            })
        };
    };

    viewModel.getSpecialtiesText = function (specialties) {
        console.log("specialties",JSON.stringify(specialties));
        var specialtiesText = "";

        specialties.forEach(function (specialty) {
            specialtiesText += specialty + ", ";
        });

        if (specialtiesText.length > 0) {
            specialtiesText = specialtiesText.substring(0, specialtiesText.length - 2);
        }
        return specialtiesText;
    };

    viewModel.search = function () {
        var that = this;
        that.set("searchType", 1);
        console.log("searchStarted");
        that.set("isSearching", true);
        that.clearSearchResults();

        location.getLocation(that, function (success) {
            if (!success &&
                that.get("currentSort") === "Closest") {
                // couldn't get location
                that.showError("Couldn't get current location. Sorting by name instead.");
                that.set("sort", "Name");
                that.set("currentSort", "Name");
            }
            that.doSearch();
        });
    };

    viewModel.doSearch = function () {
        var that = this;
        k = -1;
        that.set("currentSearch", {
            searchTerm: that.get("searchTerm"),
            skip: 0,
            take: 15
        });

        var requestOptions = that.getRequestOptions();
        console.log(requestOptions.content);

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                that.clearSearchResults();
                var data = response.content.toJSON();
                if (app.android) {
                    that.notify({ eventName: "refresh" });
                };
                that.searchResults.Count = data.Data.Count;
                data.Data.ProviderSearchResults.forEach(function (item) {
                    //console.log("Locations", JSON.stringify(item.Locations));
                    k++;
                    item.Index = k;
                    //item.FullName = k + '. ' + item.FullName;
                    item.pageTitle = that.pageTitle;
                    if (item.Image == null || item.Image == "") {
                        item.Image = '~/images/profile.png';
                    } else {
                        item.Image = 'data:image/png;base64,' + item.Image;
                    };
                    item.Locations.forEach(function (item) {
                        if (item.Distance != null) {
                            item.City = item.City + " (" + item.Distance + "m)";
                        }
                    })
                    item.Specialties = that.getSpecialtiesText(item.Specialties);                    
                    item.Stars = that.starRating(item.Rating);
                    item.AllCities = that.getCities(item.Locations).all;
                    item.Cities = that.getCities(item.Locations).location;
                    item.TotalLocations = that.getCities(item.Locations).total;
                    item.More = that.getCities(item.Locations).more;
                    if (item.Degree) {
                        item.FullName = item.FullName + ', ' + item.Degree;
                    }
                    //item.ZocDocId = 163446;
                    //console.log("zoc docID: " + item.ZocDocId);
                    that.searchResults.Data.push(item);
                });
                var currentLength = that.get("searchResults").Data.length;
                console.log("listLength: " + currentLength);
                var totalCount = that.get("searchResults").Count;
                console.log("totalCount: " + totalCount);
                if (that.get("searchResults").Data.length < that.get("searchResults").Count) {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                } else {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                }
            },
            function (response) { // error callback
                console.log("error callback");
                that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
            })
            .then(function () {
                console.log("post-search");
                that.set("isSearching", false);
                that.set("searchButtonPressed", false);
            });
    };

    viewModel.searchWithNewCriteria = function () {
        var that = this;
        if (that.get("currentSearch").searchTerm != undefined && that.get("currentSearch").searchTerm != null) {
            that.set("searchTerm", that.get("currentSearch").searchTerm)
        }
        that.search();
    };

    viewModel.loadMoreResults = function (args) {
        var that = this;
        console.log("loadingMoreResults Started");
        that.set("loadingResults", true);

        that.currentSearch.skip += 15;
        k = that.currentSearch.skip - 1;

        var requestOptions = that.getRequestOptions();

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                console.log("loadingMoreResults Completed");
                var data = response.content.toJSON();
                //console.log("Initial Length: " + that.get("searchResults").Data.length);
                var listView = args.object;
                data.Data.ProviderSearchResults.forEach(function (item) {
                    k++;
                    item.Index = k;
                    //item.FullName = k + '. ' + item.FullName
                    item.pageTitle = that.pageTitle;
                    if (item.Image == null || item.Image == "") {
                        item.Image = '~/images/profile.png';
                    } else {
                        item.Image = 'data:image/png;base64,' + item.Image;
                    };
                    item.Locations.forEach(function (item) {
                        if (item.Distance != null) {
                            item.City = item.City + " (" + item.Distance + "m)";
                        }
                    });
                    item.Specialties = that.getSpecialtiesText(item.Specialties);
                    item.Stars = that.starRating(item.Rating);
                    item.AllCities = that.getCities(item.Locations).all;
                    item.Cities = that.getCities(item.Locations).location;
                    item.TotalLocations = that.getCities(item.Locations).total;
                    item.More = that.getCities(item.Locations).more;
                    if (item.Degree) {
                        item.FullName = item.FullName + ', ' + item.Degree;
                    }
                    that.searchResults.Data.push(item);
                });
                //console.log("New Length: " + that.get("searchResults").Data.length);
                var currentLength = that.get("searchResults").Data.length;
                var totalCount = that.get("searchResults").Count;
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
            .then(function () {
                that.set("loadingResults", false)
                that.notify({ eventName: "notifyLoadOnDemandFinished" });
            });
    };

    viewModel.setAndWatchInsuranceSearchTerm = function (insuranceSearchTerm, txtIns) {
        viewModel.Insurance.off(Observable.propertyChangeEvent);

        if(txtIns) {
            txtIns.text = insuranceSearchTerm;
        }
        viewModel.Insurance.set("SearchTerm", insuranceSearchTerm);

        viewModel.Insurance.on(Observable.propertyChangeEvent, function (propertyChangeData) {
            if (propertyChangeData.propertyName === "SearchTerm" &&
                propertyChangeData.value.length > 2) {
                console.log(propertyChangeData.value);
                if(!viewModel.get("isSearching")) {
                    viewModel.insuranceSearch();
                }
            }
        });
    };
    viewModel.setAndWatchInsuranceSearchTerm("");

    viewModel.insuranceSearch = function () {
        var that = this;
        that.clearInsuranceSearchResults();

        that.set("isSearching", true);

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
                //console.log("searchCompleted");
                //console.log(JSON.stringify(response));
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
                that.set("isSearching", false);
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


    viewModel.starRating = function (rating) {
        if (rating != null) {
            rating = rating * 16;
        } else {
            rating = null;
        }
        return rating;
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

module.exports = ProviderSearchViewModel;