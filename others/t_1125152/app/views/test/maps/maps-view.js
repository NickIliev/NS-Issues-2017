var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var mapsModule = require("nativescript-google-maps-sdk");

var View = require("~/common/view-base")

var MapViewModel = require("./maps-view-model");

var view = new View();
view.viewModel = new MapViewModel();

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "GoogleMapsTest"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
    
    that.viewModel.set("selectedLocation", that.page.navigationContext);
};

view.OnMapReady = function (args) {
    var that = view;
    var mapView = args.object;

    console.log("Setting a marker...");
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(that.viewModel.get("latitude"), that.viewModel.get("longitude"));
    marker.title = that.viewModel.get("locationTitle");
    marker.snippet = that.viewModel.get("locationSnippet");;
    marker.userData = { index: 1 };
    mapView.addMarker(marker);
}

view.onMarkerSelect = function (args) {
    console.log("Clicked on " + args.marker.title);
}

view.onCameraChanged = function (args) {
    console.log("Camera changed: " + JSON.stringify(args.camera));
}

module.exports = view;