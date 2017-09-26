var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var ViewModel = require("~/common/view-model-base");
var listViewModule = require("nativescript-telerik-ui/listview");
var app = require("application");
var timer = require("timer");
//var location = require("~/components/location");
var geolocation = require("nativescript-geolocation");
var token = require("~/common/token");
var appSettings = require("application-settings");
var connectivity = require("connectivity");

function ReferralProvidersViewModel() {
    var m;
    var page;
    var data = {
        pageTitle: "Referral Providers",
        isLoading: true,
        searchResults: new Observable({
            Count: -1,
            Data: new ObservableArray([])
        }),
        Insurance: new Observable({
            numSelected: 0,
            numSelectedMax: 2,
            SearchTerm: "",
            Insurances: {
                Data: new ObservableArray([]),
                Count: 0
            }
        }),
        mapCities: {
            Data: new ObservableArray([])
        },
        filters: [
            {
                field: "Gender",
                value: "B"
            },
            {
                field: "Problem",
                value: null
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
        gender: "A",
        insurance: null,
        searchTerm: "",
        sort: "Zip",
        patientMRN: "",
        problem: "",
        token: "",
        reqID: "",
        referral: "",
        dob: "",
        orderReason: "",
        referralType: "",
        orderingProvider: "",
        date: "",
        preferredPhysicianNPI: "",
        zipCode: null,
        lat: 41.474622,
        lon: -81.778841,
        listViewOnDemandMode: listViewModule.ListViewLoadOnDemandMode.None,
        take: 8,
        skip: 0,
        lastIndex: 0,
        isSearching: false,
        loadingResults: false,
        searchType: "",
        totalCount: 0,
        isGeoError: true,
        defautlZipSet: null,
        isZipCodeSearched: null,
        geoAlertType: "new",
        fullName: null,
        isMore: false,
        showMap: false,
        showZipFinder: false,
        showFilter: false
    };

    var viewModel = new ViewModel(data);

    viewModel.load = function (apptInfo, args) {
        var that = this;
        page = args;
        that.clearSearchResults();
        that.set("referral", "Requisition: " + apptInfo.reqID);
        that.set("referralType", "Type: " + apptInfo.searchTerm);
        that.set("orderReason", viewModel.parseProblem(apptInfo.problem));
        that.set("date", "Date: " + apptInfo.date);
        that.set("orderingProvider", "Provider: " + apptInfo.orderingProvider);
        that.set("sort", that.sort);
        that.set("gender", that.gender);
        that.set("searchTerm", apptInfo.searchTerm);
        that.set("dob", apptInfo.dob);
        that.set("token", apptInfo.token);
        that.set("problem", apptInfo.problem);
        that.set("isLoading", true);
        that.set("zipCode", apptInfo.zipCode);
        that.set("preferredPhysicianNPI", apptInfo.PreferredPhysicianNPI);
        that.set("fullName", apptInfo.fullName);
        viewModel.checkGPS();
        //check that location services is enabled
        //location.getLocation(that, function (success) {
        //    console.log("location search");
        //    console.log("location success", success);
        //    if (success == true) {
        //        that.set("lat", that.get("currentLocation").latitude);
        //        that.set("lon", that.get("currentLocation").longitude);
        //        viewModel.search();
        //    } else {
        //        that.set("lat", 41.4637257);
        //        that.set("lon", -81.5934999);
        //        viewModel.search();
        //    }
        //});
    };

    var connectionType = connectivity.getConnectionType();
    console.log("connectionType", JSON.stringify(connectivity.connectionType));
    switch (connectionType) {
        case connectivity.connectionType.none:
            console.log("No connection");
            break;
        case connectivity.connectionType.wifi:
            console.log("WiFi connection");
            break;
        case connectivity.connectionType.mobile:
            console.log("Mobile connection");
            break;
    }

    //get GPS coordinates from location services
    viewModel.getLocation = function () {
        var that = this;
        console.log("getLocation code here");
        var location = geolocation.getCurrentLocation({ desiredAccuracy: 20, updateDistance: 10, maximumAge: 300000, timeout: 5000 }).
        then(function (loc) {
            if (loc) {
                //console.log("Current location is: " + JSON.stringify(loc));
                that.set("lat", loc.latitude);
                that.set("lon", loc.longitude);
                viewModel.search();
            }
        }, function (e) {
            //if GPS search throws an error call error handler
            console.log("gps error", e);
            viewModel.geoErrorHandler(e);
            that.set("isGeoError", true);
        });
        token.updateToken(that.token);
    }

    viewModel.geoErrorHandler = function (e) {
        //if GPS is enabled but throws an error skip countdown...
        if (geolocation.isEnabled()) {
            viewModel.geoErrorAlert()
        } else {
            timer.setTimeout(() => {
                viewModel.geoErrorAlert();
            }, 5000);
        }
    }

    viewModel.geoErrorAlert = function () {
        var that = this;
        if (appSettings.getNumber("lat") != 0 && appSettings.getNumber("lon") != 0 && appSettings.getBoolean("isZipCodeSearched") == true) {
            that.set("lat", appSettings.getNumber("lat"));
            that.set("lon", appSettings.getNumber("lon"));
            that.showZipFinder = false;
            viewModel.search();
            console.log("zipcode set; search starting");
        } else {
            that.showZipFinder = true;
            viewModel.set("isLoading", false);
        }
        token.updateToken(that.token);
    }

    viewModel.checkGPS = function (callback) {
        if (geolocation.isEnabled()) {
            console.log("geolocation disabled");
            viewModel.getLocation();
            callback = true;
        } else {
            console.log("geolocation requested");
            geolocation.enableLocationRequest().then(function(){
                console.log("geolocation disabled");
                console.log("geolocation: ", geolocation.isEnabled());
                viewModel.getLocation();
            }, function (e) {
                console.log("error: ", e);
                viewModel.geoErrorAlert();
            }
        );
            //viewModel.getLocation();
        }
    }
    viewModel.clearSearchResults = function () {
        var that = this;
        //if (that.get("searchResults").Data.length > 0) {
        //    that.searchResults.Data = new ObservableArray([]);
        //    that.get("searchResults").Data = [];
        //    console.log("length", that.get("searchResults").Data.length);
        //}
        while (that.get("searchResults").Data.length) {
            that.searchResults.Data.pop();
        }
        that.searchResults.Count = -1;
    };

    viewModel.parseProblem = function (problem) {
        problem = problem.split("-");
        return "Problem: " + problem[0];
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
        var that = this;
        var filters = [];

        that.filters.forEach(function (item) {
            if (item.field == "Problem") {
                item.value = that.problem;
            };
            filters.push({
                Operator: "Eq",
                Field: item.field,
                Value: item.value
            });
            console.log("filter: " + item.field + " - " + item.value);
        }, this);

        return filters.length > 0 ? filters : null;
    };

    viewModel.getRequestOptions = function () {
        var that = this;
        var filters = that.getFilters();
        var searchSeed = null;
        if (that.searchType == "new") {
            that.skip = 0;
            that.take = 8;
            that.lastIndex = 0;
        }
        if (appSettings.getNumber("searchSeed") == 0) {
            searchSeed = null
        } else {
            searchSeed = appSettings.getNumber("searchSeed");
        }
        try {
            return {
                url: constants.referralEaseUrl + "Provider/GetReferralProvidersBySearch",
                method: "POST",
                headers: { "Content-Type": "application/json", "token": that.token },
                content: JSON.stringify(
                    {
                        SearchTerm: that.searchTerm,
                        DateOfBirth: that.dob,
                        Skip: that.skip,
                        Take: that.take,
                        LastIndex: that.lastIndex,
                        RenderImage: true,
                        Debug: false,
                        PreferredPhysicianNPI: that.preferredPhysicianNPI,
                        ConditionSearchSeed: searchSeed,
                        CurrentLocation: {
                            Latitude: that.lat,
                            Longitude: that.lon
                        },
                        Sort: [
                            { Field: that.sort }
                        ],
                        Filter: {
                            Logic: "AND",
                            Filters: filters
                        }
                    })
            };
        }
        catch (e) {
            // statements to handle any exceptions
            console.log("error: ", e); // pass exception object to error handler
        }
    }

    viewModel.getCities = function (locations) {
        var that = this;
        var citiesArray = [];
        var cities = {
            location: "",
            total: "",
            array: "",
            all: "",
            more: ""
        };
        if (locations.length < 4) {
            locations.forEach(function (item) {
                var distance = parseFloat(item.Location.Distance).toFixed(1) + ' mi';
                cities.more = null;
            });
        } else if(locations.length > 3) {
            for (var i = 0; i < 3; i++) {
                //console.log("cities", locations[i].Location.City);
                var distance = parseFloat(locations[i].Location.Distance).toFixed(2) + ' mi';
                that.set("isMore", true);
            }
            cities.more += "+" + (locations.length - 3);
        }
        locations.forEach(function (item) {
            var distance = parseFloat(item.Location.Distance).toFixed(1) + ' mi';
            item.Location.City = item.Location.City.replace("Heights","Hts.");
            item.Location.City = item.Location.City.replace("North","N.");
            item.Location.City = item.Location.City.replace("South","S.");
            citiesArray.push(item.Location.City + ' ' + '(' + distance + ')');
        })
        cities.all = citiesArray;
        cities.total = locations.length;
        return cities;
    };

    viewModel.getSpecialties = function (specialties) {
        //console.log("specialties",JSON.stringify(specialties));
        var specialtiesText = "";

        specialties.forEach(function (specialty) {
            specialtiesText += specialty + ", ";
        });

        if (specialtiesText.length > 0) {
            specialtiesText = specialtiesText.substring(0, specialtiesText.length - 2);
        }
        return specialtiesText;
    };

    viewModel.getNext = function (next) {
        var nextDate = "";
        var date = next.split("T");
        date = date[0];
        date = new Date(date).toUTCString();
        //console.log("new date: " + date + " old date: " + next);
        date = date.toString();
        date = date.split(" ");
        var day = date[1];
        var month = date[2];
        var weekday = date[0];
        nextDate = weekday + ' ' + month + ' ' + day;
        return nextDate;
    }

    viewModel.starRating = function (rating) {
        if (rating != null) {
            rating = rating * 16;
        } else {
            rating = null;
        }
        return rating;
    }

    viewModel.search = function () {
        var that = this;
        that.clearSearchResults();
        that.set("isLoading", true);
        m = -1;
        that.set("searchType", "new");
        var requestOptions = that.getRequestOptions();
        token.updateToken(that.token);
        console.log("referral provider content", requestOptions.content);

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                that.clearSearchResults();
                token.updateToken(that.token);
                var data = response.content.toJSON();
                if (app.android) {
                    that.notify({ eventName: "refresh" });
                }
                var count = data.Data.Count;
                //console.log(JSON.stringify('responseType: ' + data.ResponseType + ', responseMessages: ' + data.Messages + ', responseCount: ' + data.Data.Count + ', totalCount: ' + data.Data.TotalCount));
                //console.log("referral providers", JSON.stringify(response));
                that.set("count", data.Data.TotalCount);
                //console.log("searchSeed before search", searchSeed);
                if (data.Data.ConditionSearchSeed != null) {
                    appSettings.setNumber("searchSeed", data.Data.ConditionSearchSeed);
                } else {
                    appSettings.setNumber("searchSeed", 0);
                };
                var locations = [];
                if (data.Data.TotalCount >= 1) {
                    that.searchResults.Count = data.Data.Count;
                    data.Data.ProviderSearchResults.forEach(function (item) {
                        //console.log("Specialties", item.Specialties);
                        m++;
                        item.pageTitle = that.pageTitle;
                        if (item.Image == null || item.Image == "") {
                            item.Image = '~/images/profile.png';
                        } else {
                            item.Image = 'data:image/png;base64,' + item.Image;
                        };
                        //var specialties = item.Specialties.split(",");
                        //item.Specialties.forEach(function (item) {
                        //    console.log("Specialties length", item);
                        //});
                        //item.FullName = m + '. ' + item.FullName;
                        //console.log(m + '. ' + item.FullName);
                        item.Locations.forEach(function (item) {
                            locations.push(item.Location.City);
                        })
                        //console.log("Locations", JSON.stringify(item.Locations));
                        //item.MoreSpecialties = that.getSpecialties(item.Specialties);
                        item.Specialties = that.getSpecialties(item.Specialties);
                        item.AllCities = that.getCities(item.Locations).all;
                        item.Cities = that.getCities(item.Locations).location;
                        item.TotalLocations = that.getCities(item.Locations).total;
                        item.Distance_ClosestNextAvailable = parseFloat(item.Distance_ClosestNextAvailable).toFixed(2) + ' mi';
                        item.More = that.getCities(item.Locations).more;
                        item.Index = "item" + m;
                        if (item.Degree) {
                            item.FullName = item.FullName + ', ' + item.Degree;
                        }
                        item.Stars = that.starRating(item.Rating);
                        //console.log("Rating ", item.Rating);
                        item.Availability = that.getNext(item.NextAvailableDate);
                        that.searchResults.Data.push(item);
                    });
                    that.set("skip", that.get("searchResults").Data.length);
                    that.set("isLoading", false);
                    that.totalCount = data.Data.TotalCount;
                    if (that.get("searchResults").Data.length < data.Data.TotalCount) {
                        that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                    } else {
                        that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                    };
                } else if (data.Data.TotalCount < 1) {
                    that.set("message", "Sorry, we could not find an appropriate provider. Please contact University Hospitals at 1-866-UH4-CARE for assistance with this referral.");
                    var context = {
                        title: "Please Contact UH",
                        //message: "To schedule Referral# TW919503310, please call UH Connor Integrative Health Network at 216-285-4070.",
                        message: "Sorry, we could not find an appropriate provider. Please contact University Hospitals at 1-866-UH4-CARE for assistance with this referral.",
                        okButtonText: "Try Again",
                        cancelButtonText: "Contact UH"
                    };
                    utility.launchPopup("action", function (data) {
                        // callback
                    }, null, context);
                    that.set("isLoading", false);
                };
                that.set("isLoading", false);
            },
            function (e) { // error callback
                console.log("search error",e);
                that.set("isLoading", false);
                that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
            })
            .then(function () {
                console.log("post-search");
                console.log("listViewOnDemandMode", that.listViewOnDemandMode);
                that.set("loadingResults", false);
            });
    };

    var k = 0;
    viewModel.loadMoreResults = function (args) {
        var that = this;
        token.updateToken(that.token);
        m = that.skip -1;
        k++;
        that.set("loadingResults", true);
        that.searchType = "endless";

        var requestOptions = that.getRequestOptions();

        console.log("load more content " + k, requestOptions.content);

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                //console.log("loadingMoreResults Completed");
                var i = -1;
                var data = response.content.toJSON();
                //console.log("return search seed", JSON.stringify(data.Data.ConditionSearchSeed));
                //console.log("Initial Length: " + that.get("searchResults").Data.length);
                var listView = args.object;
                //console.log("New Length: " + that.get("searchResults").Data.length);
                if (data.Data.ConditionSearchSeed != null) {
                    appSettings.setNumber("searchSeed", data.Data.ConditionSearchSeed);
                } else {
                    appSettings.setNumber("searchSeed", 0);
                };
                data.Data.ProviderSearchResults.forEach(function (item) {
                    item.pageTitle = that.pageTitle;
                    m++;
                    if (item.Image == null || item.Image == "") {
                        item.Image = '~/images/profile.png';
                    } else {
                        item.Image = 'data:image/png;base64,' + item.Image;
                    };
                    //item.FullName = m + '. ' +item.FullName;
                    //console.log(m + '. ' + item.FullName);
                    item.MoreSpecialties = that.getSpecialties(item.Specialties);
                        item.Specialties = that.getSpecialties(item.Specialties);
                    item.AllCities = that.getCities(item.Locations).all;
                    item.Cities = that.getCities(item.Locations).location;
                    item.TotalLocations = that.getCities(item.Locations).total;
                    item.Distance_ClosestNextAvailable = parseFloat(item.Distance_ClosestNextAvailable).toFixed(2) + ' mi';
                    item.More = that.getCities(item.Locations).more;
                    item.Index = "item" + m;
                    if (item.Degree) {
                        item.FullName = item.FullName + ', ' + item.Degree;
                    }
                    item.Stars = that.starRating(item.Rating);
                    item.Availability = that.getNext(item.NextAvailableDate);
                    that.searchResults.Data.push(item);
                });

                //console.log(k + " Count: " + data.Data.TotalCount);
                //console.log(k + " data length: " + that.get("searchResults").Data.length);
                that.skip = that.get("searchResults").Data.length;
                if (that.get("searchResults").Data.length >= data.Data.TotalCount) {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                }
                else {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                };
                console.log("list view mode", that.listViewOnDemandMode);
            },
            function () { // error callback
                that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
            })
            .then(function () {
                that.set("loadingResults", false)
                that.notify({ eventName: "notifyLoadOnDemandFinished" });
            });

    };

    viewModel.selectAppt = function (apptInfo, bookInfo) {
        var that = this;
        //console.log("bookInfo", JSON.stringify(bookInfo));
        //console.log("apptInfo", JSON.stringify(apptInfo));
        token.updateToken(that.token);
        var startDate = bookInfo.NextAvailableDate.split("T");
        startDate = startDate[0];
        var endDate = new Date(bookInfo.NextAvailableDate);
        endDate.setDate(endDate.getDate() + 7);
        frameModule.topmost().navigate({
            moduleName: "views/referral-availability/main/",
            context: {
                AthenaPatientId: apptInfo.AthenaPatientId,
                date: apptInfo.date,
                endDate: endDate,
                image: bookInfo.Image,
                lat: that.lat,
                lon: that.lon,
                orderingProvider: apptInfo.orderingProvider,
                orderReason: apptInfo.orderReason,
                patientMRN: apptInfo.patientMRN,
                fullName: apptInfo.fullName,
                email: apptInfo.email,
                practitionerName: bookInfo.FullName,
                practitionerID: bookInfo.PractitionerID,
                preferred: bookInfo.PreferredProvider,
                searchTerm: apptInfo.searchTerm,
                referral: apptInfo.referral,
                reqID: apptInfo.reqID,
                token: apptInfo.token,
                startDate: startDate,
                rating: bookInfo.Rating,
                dob: apptInfo.dob,
                zipCode: apptInfo.zipCode,
                bestMatch: bookInfo.BestMatch
            }
        });
    }

    viewModel.Insurance.on(Observable.propertyChangeEvent, function (propertyChangeData) {
        var that = this;
        if (propertyChangeData.propertyName === "SearchTerm" && propertyChangeData.value.length > 3) {
            viewModel.insuranceSearch();
        }
    });

    viewModel.insuranceSearch = function () {
        var that = this;
        console.log("filtering results started");
        token.updateToken(that.token);
        that.clearInsuranceSearchResults();

        var requestOptions = {
            url: constants.apiUrl + "Insurance/GetBySearch",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                SearchTerm: that.Insurance.SearchTerm
            })
        };
        //console.log("search url", requestOptions.url);
        //console.log("search content", requestOptions.content);
        that.insuranceRequest = utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                //console.log("searchCompleted");
                //console.log(JSON.stringify(response));
                var filters = that.get("filters");
                var data = response.content.toJSON();
                that.Insurance.Insurances.Count = data.Count;
                if (data.Count > 0) {
                    that.set("isSearching", false);
                };
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
            }).then(function () {
                that.hidePageLoading();
                that.set("loadingResults", false);
            });

        return that.insuranceRequest;
    };

    viewModel.clearInsuranceSearchResults = function () {
        var that = this;
        while (that.Insurance.Insurances.Data.length) {
            that.Insurance.Insurances.Data.pop();
        }
        that.Insurance.Insurances.Count = 0;
    };

    return viewModel;
}

module.exports = ReferralProvidersViewModel;