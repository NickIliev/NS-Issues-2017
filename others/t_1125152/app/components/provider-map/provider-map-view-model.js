var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var token = require("~/common/token");
var frameModule = require("ui/frame");

var constants = require("~/common/constants");
var utility = require("~/common/utility");
var userToken = null;

var ProviderMapViewModel = new Observable({
    title: "",
    message: "",
    type: "",
    latitude: 41.506235,
    longitude: -81.605221,
    zoom: 8,
    bearing: 0,
    tilt: 0,
    padding: [40, 40, 40, 40]

});

var data = {
    mapCities: {
        Data: new ObservableArray([])
    }
}

var mapView = new Observable({
    latitude: 41.506235,
    longitude: -81.605221,
    zoom: 8,
    bearing: 0,
    tilt: 0,
    padding: [40, 40, 40, 40]
});

ProviderMapViewModel.load = function (context) {
    var that = this;
    that.set("latitude", 41.506235);
    that.set("longitude", -81.605221);
    that.set("zoom", 8);
    that.set("bearing", 0);
    that.set("tilt", 0);
    that.set("DocName", context.FullName);
    that.set("Image", context.Image);
    that.set("Specialties", context.Specialties);
    that.set("BestMatch", context.BestMatch);
    that.set("PreferredProvider", context.PreferredProvider);
    that.set("Rating", context.Rating);
    that.set("Stars", context.Stars);
    that.set("AllCities", context.AllCities);
    that.set("pageTitle", context.pageTitle);
    that.set("Availability", context.Availability);
    that.set("PreferredProvider", context.PreferredProvider);
    that.set("ZocDocId", context.ZocDocId);
    that.set("Index", context.Index);

    //context.Locations.forEach(function (item) {
    //    console.log("Locations", JSON.stringify(item.Location.Coordinates))
    //})

    //that.set("title", context.title);
    //that.set("message", context.message);
    //that.set("type", context.type);
};

ProviderMapViewModel.reset = function () {
    var that = this;
    that.set("title", "");
    that.set("message", "");
    that.set("type", "");
};


module.exports = ProviderMapViewModel;