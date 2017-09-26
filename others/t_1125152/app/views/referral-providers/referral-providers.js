var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var appSettings = require("application-settings");
var app = require('application');
var topmost = frameModule.topmost();
var utility = require("~/common/utility");
var token = require("~/common/token");
var http = require("http");
var constants = require("~/common/constants");
var gestures = require("ui/gestures");
var View = require("~/common/view-base");

var ReferralProvidersViewModel = require("./referral-providers-view-model");

var view = new View();
view.viewModel = new ReferralProvidersViewModel();

var apptInfo = null;
var bookInfo = null;
var userToken = null;
var txtIns;
var txtZip;
var zip;
var zipFinder;
var zipCodeInput;
var zipSwtich;
var filter;
var insObject;

view.loaded = function (page) {
    var that = view;
    that.page = page;
    filter = that.page.getViewById("filter");
    zipFinder = that.page.getViewById("zipFinder");
    zipCodeInput = that.page.getViewById("zipCodeInput");
    zipSwtich = that.page.getViewById("zipSwtich");
    insObject = that.page.getViewById("insContainer");

    that.providerListElement = that.page.getViewById("providers-list");

    apptInfo = that.page.navigationContext;
    console.log("referral provider", JSON.stringify(apptInfo));

    txtIns = that.page.getViewById("txtInsurance");
    txtZip = that.page.getViewById("txtzip");

    userToken = apptInfo.token;

    //patient = args.object.navigationContext;
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
    //console.log("zipCode", apptInfo.zipCode);
    view.resetAll();
    that.viewModel.load(apptInfo, page);
    //console.log("page title", that.viewModel.pageTitle);
    token.updateToken(userToken);
};

//view.onSwipeCellStarted = function (args) {
//    var swipeLimits = args.data.swipeLimits;
//    var swipeView = args['object'];
//    var leftItem = swipeView.getViewById('profile');
//    var middleItem = swipeView.getViewById('specialties');
//    var rightItem = swipeView.getViewById('locations');
//    if (app.android){
//        swipeLimits.left = rightItem.getMeasuredWidth() + leftItem.getMeasuredWidth() + middleItem.getMeasuredWidth();
//        console.log("swipeLimits.left", swipeLimits.left);
//        swipeLimits.right = 10;
//        console.log("rightItem", rightItem.getMeasuredWidth());
//        swipeLimits.threshold = rightItem.getMeasuredWidth() + leftItem.getMeasuredWidth() + middleItem.getMeasuredWidth();
//    }else{
//        swipeLimits.right = rightItem.getMeasuredWidth() + leftItem.getMeasuredWidth() + middleItem.getMeasuredWidth();
//        console.log("swipeLimits.left", swipeLimits.left);
//        swipeLimits.left = 10;
//        console.log("rightItem", rightItem.getMeasuredWidth());        
//    }
//    console.log("x", args.data.x)
//    token.updateToken(userToken);
//}

//view.onSwipeCellFinished = function () {
//    token.updateToken(userToken);
//}

view.tapClose = function () {
    var that = view;
    that.closeFilter();
    view.resetAll();
    view.doFilterSort();
}

view.closeZipFinder = function () {
    var that = view;
    that.viewModel.set("showZipFinder", false);
}
view.showZipFinder = function () {
    var that = view;
    that.viewModel.set("geoAlertType", "change");
    that.viewModel.geoErrorAlert();
    that.viewModel.set("isGeoError", false);
}

view.loadZipFinder = function () {
    var that = view;
    that.viewModel.set("geoAlertType","change");
    that.viewModel.set("isGeoError", false);
    zipFinder.animate({
        opacity: 1,
        translate: { x: 0, y: 0 }
    });
}

view.saveZip = function () {
    var that = view;
    console.log("zipSwtich", zipSwtich.checked);
    if (zipSwtich.checked == false) {
        var context = {
            title: "Save Zipcode Location?",
            message: "Keep " + zipCodeInput.text + " as your default location (we won't ask you again to enter a zipcode)?"
        }
        utility.launchPopup("confirm", function (data) {
            // callback
            zipSwtich.checked = true;
            appSettings.setBoolean("saveZip", true);
            console.log("save zip");
        }, function (data) {
            zipSwtich.checked = false;
            appSettings.setBoolean("saveZip", false);
            console.log("dont save zip")
        }, context);
    }
    token.updateToken(that.viewModel.token);
}

view.findZipCoords = function (page) {
    var that = view;
    that.page = page;
    token.updateToken(userToken);
    console.log("zipCodeInput", zipCodeInput.text);
    view.viewModel.set("zipCode", zipCodeInput.text);
    http.request({
        url: constants.referralEaseUrl + "Location/GetZipCodeLocation",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            Zipcode: zipCodeInput.text
        })
    }).then(function (response) {
        var response = response.content.toJSON();
        console.log("zipcode coordinates lookup response", JSON.stringify(response));
        token.updateToken(apptInfo.token);
        if (response.Messages == "SUCCESS") {
            that.viewModel.set("showZipFinder", false);
            view.disMissFocus();
            zipCodeInput.dismissSoftInput();
            console.log("success, found coords", response.Data.Coordinates.Latitude + ' ' + response.Data.Coordinates.Longitude);
            that.viewModel.set("lat", response.Data.Coordinates.Latitude);
            that.viewModel.set("lon", response.Data.Coordinates.Longitude);
            appSettings.setNumber("lat", response.Data.Coordinates.Latitude);
            appSettings.setNumber("lon", response.Data.Coordinates.Longitude);
            console.log("viewModel coords", that.viewModel.get("lat") + ' ' + that.viewModel.get("lon"));
            console.log("appSettings coords", appSettings.getNumber("lat") + ' ' + appSettings.getNumber("lon"));
            appSettings.setBoolean("isZipCodeSearched", true);
            that.viewModel.search();
        } else if (response.Messages == "NOT FOUND") {
            var context = {
                title: "Zipcode not found",
                message: "We were unable to locate the zipcode provided. Pleaes check the zipcode and try again."
            }
            utility.launchPopup("action", function (data) {
                token.updateToken(that.viewModel.token);
                // callback
            }, null, context);
        }
        //that.viewModel.set("isLoading", false);
    }, function (error) {
        console.error(JSON.stringify(error));
        //view.viewModel.set("isLoading", false);
    });
}

view.btnLoaded = function (args) {
    var that = view;
    var btnIndex = args.object.index;
    var index = btnIndex.split("item");
    index = index[1] - 1;
    console.log('Clicked item with index ' + index);
    bookInfo = view.viewModel.searchResults.Data.getItem(index);
    //console.log("lat", that.get("currentLocation").latitude);
    that.viewModel.selectAppt(apptInfo, bookInfo);
};

view.goBack = function () {
    //view.resetAll();
    topmost.goBack();
};

view.resetSort = function () {
    console.log("all Sort radio");
    var that = view;
    that.page.getViewById("rdbName").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbDistance").src = "~/images/common/radio-unchecked.png";
    token.updateToken(userToken);
}

view.resetFilter = function () {
    console.log("all Filter radio");
    var that = view;
    that.page.getViewById("rdbMale").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbFemale").src = "~/images/common/radio-unchecked.png";
    that.page.getViewById("rdbAll").src = "~/images/common/radio-unchecked.png";
    token.updateToken(userToken);
}
view.resetAll = function () {
    var that = view;
    view.All();
    view.Distance();
    txtZip.text = "";
    txtIns.text = "";
    console.log("reset");
    var filters = that.viewModel.filters;
    for (var i = 0; i < filters.length; i++) {
        var field = filters[i].field;
        switch (field) {
            case "Gender":
                filters[i].value = "A";
                break;
            //case "Problem":
            //    filters[i].value = that.viewModel.get("problem");
            //    break;
        }
    }
    if (filters.length > 2) {
        filters.length = 2;
    }
    console.log("filters",JSON.stringify(filters));
}
view.Name = function (args) {
    var that = view;
    view.resetSort();
    that.page.getViewById("rdbName").src = "~/images/common/radio-checked.png";
    that.viewModel.set("sort", "Name");
    console.log("Name true");
}

view.Distance = function (args) {
    var that = view;
    view.resetSort();
    that.page.getViewById("rdbDistance").src = "~/images/common/radio-checked.png";
    that.viewModel.set("sort", "Closest");
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

view.problemFilter = function () {
    var that = view;
    console.log("problem filter", apptInfo.problem);
    var filters = that.viewModel.filters;
    for (var i = 0; i < filters.length; i++) {
        if (filters[i].field != "Problem") {
            var problem = apptInfo.problem;
            var filter = {
                type: "autocomplete",
                field: "Problem",
                display: "Problem: " + problem,
                controlId: "problemFilter",
                value: problem
            };
        }
    }

    that.viewModel.get("filters").push(filter);

    console.log("problem filter added");
};

view.selectInsurance = function (args) {
    var that = view;
    var insurance = args.view.bindingContext;
    console.log("insurance list tap", insurance);

    that.viewModel.set("insurance", insurance);

    that.viewModel.clearInsuranceSearchResults();

    console.log("insurance filter added");
    token.updateToken(userToken);
};

view.showFilter = function () {
    var that = view;
    that.viewModel.set("showFilter", true);
    token.updateToken(userToken);
}

view.closeFilter = function () {
    var that = view;
    that.viewModel.set("showFilter", false);
    token.updateToken(userToken);
    view.closeIns();
}

view.showIns = function () {
    var that = view;
    var insObject = that.page.getViewById("insContainer");
    console.log(insObject);
    insObject.className = "showIns";
    insObject.animate({
        translate: { x: 0, y: -112 }
    });
    view.viewModel.set("isSearching", true);
}

view.closeIns = function () {
    var that = view;
    console.log(insObject);
    insObject.animate({
        translate: { x: 0, y: 0 }
    });
    insObject.className = "closeIns";
    txtIns.text = that.viewModel.insurance;
}

view.clearZip = function () {
    txtZip.text = "";
}

view.clearIns = function (args) {
    var that = view;
    that.viewModel.set("insurance", "");

    txtIns.text = "";
    that.viewModel.clearInsuranceSearchResults();
    view.closeIns();
    token.updateToken(userToken);
};

view.doFilterSort = function () {
    var that = view;
    that.viewModel.set("isLoading", true);
    token.updateToken(userToken);
    var reg = new RegExp("[0-9]$");
    console.log(reg.test(txtZip.text));

    //that.viewModel.set("isSearching", false);
    view.emptyFilters();
    var filters = that.viewModel.filters;
    var insurance = that.viewModel.Insurance.SearchTerm;
    //console.log("Insurance.SearchTerm", insurance);
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
        if (reg.test(txtZip.text) == true) {
            that.viewModel.sort = "Zip";
            var filter = {
                type: "autocomplete",
                field: "Zip",
                display: "Zip: " + txtZip.text,
                controlId: "zipFilter",
                value: txtZip.text
            };
        } else {
            that.viewModel.sort = "City";
            var filter = {
                type: "autocomplete",
                field: "City",
                display: "City: " + txtZip.text,
                controlId: "CityFilter",
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
    console.log("request options", that.viewModel.getRequestOptions().content);
    that.viewModel.clearInsuranceSearchResults();
    view.closeFilter();
    that.viewModel.search();
}

view.selectInsurance = function (args) {
    var that = view;

    var insurance = args.view.bindingContext;

    that.viewModel.set("Insurance.SearchTerm", insurance);
    txtIns.text = insurance;
    that.viewModel.set("insurance", insurance);
    that.viewModel.clearInsuranceSearchResults();

    console.log("insurance filter added", insurance);
    that.page.getViewById("lvInsurance").refresh();
    view.closeIns();
};

view.emptyFilters = function () {
    var that = view;
    var filters = that.viewModel.get("filters");
    that.viewModel.sort = "Closest";
    for (var i = filters.length; i--;) {
        if (filters[i].field === "Insurance" || filters[i].field === "Zip" || filters[i].field === "City" ) {
            filters.splice(i, 1);
        }
    };
}

view.selectAppt = function (index) {
    var that = view;
    console.log("clicked ", index);
    bookInfo = view.viewModel.searchResults.Data.getItem(index);
    //console.log("lat", that.get("currentLocation").latitude);
    that.viewModel.selectAppt(apptInfo, bookInfo);
    token.updateToken(userToken);
};

view.listAppt = function (args) {
    console.log("itemIndex",args.itemIndex);
    view.selectAppt(args.itemIndex);
}

view.btnAppt = function (args) {
    var btnIndex = args.object.index;
    var index = btnIndex.split("item");
    index = index[1];
    view.selectAppt(index);
    token.updateToken(userToken);
};

view.disMissFocus = function () {
    if (zipCodeInput.ios) {
        zipCodeInput.ios.endEditing(true);
    } else if (zipCodeInput.android) {
        zipCodeInput.android.clearFocus();
    }
}

view.showMap = function (args) {
    var index = args.object.index;
    index = index.split("item");
    index = index[1];
    console.log("index", index);
    var context = {
        data: view.viewModel.searchResults.Data.getItem(index),
        apptVars: apptInfo,
        token: userToken
    };

    utility.launchMap("action", function (data) {
        // callback
    }, null, context);
}

//view.launchMap = function (args) {
//    var that = view;
//    var itemIndex = args.object.index;
//    var index = itemIndex.split("item");
//    index = index[1]- 1;
//    token.updateToken(userToken);
//    var locations = that.viewModel.searchResults.Data.getItem(index);
//    if (that.viewModel.mapCities.Data.length > 0) {
//        while (that.viewModel.mapCities.Data.length > 0) {
//            that.viewModel.mapCities.Data.pop();
//        }
//    }
//    //console.log("allCities", JSON.stringify(locations));
//    locations.Locations.forEach(function (item) {
//        that.viewModel.mapCities.Data.push(item.Location.City);
//    })
//    console.log("Cities", JSON.stringify(locations.AllCities));
//    that.viewModel.set("allCities", locations.AllCities);
//    that.viewModel.set("Image", locations.Image);
//    that.viewModel.set("BestMatch", locations.BestMatch);
//    that.viewModel.set("DocName", locations.FullName);
//    that.viewModel.set("Availability", locations.Availability);
//    that.viewModel.set("Rating", locations.Rating);
//    that.viewModel.set("Stars", locations.Stars);
//    that.viewModel.set("Specialties", locations.Specialties);
//    that.viewModel.set("PreferredProvider", locations.PreferredProvider);
//    that.viewModel.set("Gender", locations.Gender);
//    that.viewModel.set("Index", locations.Index);
//    view.addMapMarkersAndCenter(locations);
//}

//view.onMapReady = function (args) {
//    var that = view;
//    that.mapView = args.object;
//    console.log("Map Ready");
//    that.viewModel.set("isMapInitialized", true);
//};

//view.addMapMarkersAndCenter = function (locations) {
//    var that = view;
//    view.removeMapMarkers();
//    if (that.mapView) {
//        token.updateToken(userToken);
//        //add markers for location search results
//        var i = -1;
//        locations.Locations.forEach(function (item) {
//            i++;
//            console.log(item.Location.City + ", Lat: " + item.Location.Coordinates.Latitude + ", Lon: " + item.Location.Coordinates.Longitude);
//            var marker = new mapsModule.Marker();
//            var distance = parseFloat(item.Location.Distance).toFixed(2);
//            marker.position = mapsModule.Position.positionFromLatLng(item.Location.Coordinates.Latitude, item.Location.Coordinates.Longitude);
//            marker.title = item.Location.City;
//            marker.snippet = item.Location.Address1 + (item.Location.Address2 != null ? " " + item.Location.Address2 : "") + " - " + (item.Location.Distance != null ? " " + distance + "mi" : "");
//            marker.userData = { index: i };
//            that.mapView.addMarker(marker);
//        }, this);
//    }
//    that.viewModel.showMap = true;
//};

//view.viewModel.on("addMapMarkersAndCenter", function () {
//    view.addMapMarkersAndCenter();
//});

//view.onMarkerSelect = function (){
//    token.updateToken(userToken);  

//}

//view.markerInfoWindowTapped = function (){
//    token.updateToken(userToken);    
//}

//view.onCameraChanged = function (){
//    token.updateToken(userToken);    
//}

//view.removeMapMarkers = function () {
//    var that = view;
//    try{
//        if (that.mapView) {
//            console.log("removing markers");
//            for (var i = 0; i < 10; i++) {
//                var marker = that.mapView.findMarker(function (marker) {
//                    return marker.userData.index === i;
//                });
//                //console.log(marker.length);
//                if (marker) {
//                    that.mapView.removeMarker(marker);
//                    console.log("remove marker", JSON.stringify(marker));
//                    //console.log("removed marker for LocationID: " + item.Location.Address1);
//                }
//            };
//        }

//    }catch(e){
//        console.log("error",e);
//    }
//};

view.closeMapView = function () {
    var that = view;
    that.viewModel.showMap = false;
    token.updateToken(userToken);
}

// custom viewModel events

view.viewModel.on("notifyLoadOnDemandFinished", function (eventData) {
    view.providerListElement.notifyLoadOnDemandFinished();
    //view.providerListElement.scrollToIndex(eventData.index - 5);
    //console.log("notifyLoadOnDemandFinished");
    //console.log(JSON.stringify(eventData));
    //console.log("event data", eventData.index);
});

view.viewModel.on("refresh", function (eventData) {
    var that = view;
    view.providerListElement.refresh();
});

//view.viewProfile = function (args) {
//    var that = view;
//    var index = args.object.index;
//    index = index.split("item");
//    index = index[1];
//    console.log("new index", index);
//    token.updateToken(userToken);
//}

//view.moreInfo = function (args) {
//    var index = args.object.index;
//    index = index.split("item");
//    index = index[1];
//    console.log("new index", index);
//    view.launchMap(args);
//    token.updateToken(userToken);
//}

//view.setIndex = function (args) {
//    var index = args;
//    return newIndex;
//}

module.exports = view;
