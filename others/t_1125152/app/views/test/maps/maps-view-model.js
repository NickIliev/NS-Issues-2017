var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function MapViewModel() {
    var data = {
        pageTitle: "Google Maps Test",
        isLoading: false,
        locationTitle: "Cleveland",
        locationSnippet: "Somewhere in Ohio",
        latitude: 41.005,
        longitude: -81.005,
        zoom: 6,
        bearing: 0,
        tilt: 0,
        selectedLocation: {},
        markers: []
    };
    
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        var that = this;

    };

    return viewModel;
}

module.exports = MapViewModel;