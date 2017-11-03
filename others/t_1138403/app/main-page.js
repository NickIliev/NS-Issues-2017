var vmModule = require("./main-view-model");
var builder = require("ui/builder");
var mapsModule = require("nativescript-google-maps-sdk");
var permissions = require("nativescript-permissions");
var application = require("application");
var Color = require("color").Color;
var style = require('./map-style.json');

function wait(milliSeconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(milliSeconds);
        }, milliSeconds);
    });
}

function requestPermissions() {
    return new Promise(function (resolve, reject) {
        if (!application.android) return resolve(true);
        permissions.requestPermission([
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_COARSE_LOCATION],
            "This demo will stink without these...")
            .then(function (result) {
                console.log("Permissions granted!");
                resolve(true);
            })
            .catch(function (result) {
                console.log("Permissions failed :(", result);
                resolve(false);
            });

    });
}

function printUISettings(settings) {
    console.log("Current UI setting:\n" + JSON.stringify({
        compassEnabled: settings.compassEnabled,
        indoorLevelPickerEnabled: settings.indoorLevelPickerEnabled,
        mapToolbarEnabled: settings.mapToolbarEnabled,
        myLocationButtonEnabled: settings.myLocationButtonEnabled,
        rotateGesturesEnabled: settings.rotateGesturesEnabled,
        scrollGesturesEnabled: settings.scrollGesturesEnabled,
        tiltGesturesEnabled: settings.tiltGesturesEnabled,
        zoomControlsEnabled: settings.zoomControlsEnabled,
        zoomGesturesEnabled: settings.zoomGesturesEnabled
    }, undefined, 2));
}

function pageLoaded(args) {
    console.log("page loaded");
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;

var mapView = null;

function onMapReady(args) {
    console.log("map ready");
    mapView = args.object;

    console.log("onMapReady");
    mapView.settings.compassEnabled = true;
    printUISettings(mapView.settings);


    console.log("Setting a marker...");
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.20);
    marker.title = "Sydney";
    marker.snippet = "Australia";
    marker.color = "green";
    marker.userData = { index: 1 };
    mapView.addMarker(marker);
}

function onCoordinateTapped(args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
}

function onMarkerEvent(args) {
    console.log("Marker Event: '" + args.eventName
        + "' triggered on: " + args.marker.title
        + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
}

function onMarkerSelect(args) {
    console.log("showInfoWindow");
    args.marker.showInfoWindow();
}

function onMarkerTapped(args) {
    console.log("hideInfoWindow");
    args.marker.hideInfoWindow();
}

var lastCamera = null;
function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === lastCamera);
    lastCamera = JSON.stringify(args.camera);
    var bounds = mapView.projection.visibleRegion.bounds;
    console.log("Current bounds: " + JSON.stringify({
        southwest: [bounds.southwest.latitude, bounds.southwest.longitude],
        northeast: [bounds.northeast.latitude, bounds.northeast.longitude]
    }));
}

exports.onMapReady = onMapReady;
exports.onCoordinateTapped = onCoordinateTapped;
exports.onMarkerEvent = onMarkerEvent;

exports.onMarkerSelect = onMarkerSelect;
exports.onMarkerTapped = onMarkerTapped;
exports.onCameraChanged = onCameraChanged;
