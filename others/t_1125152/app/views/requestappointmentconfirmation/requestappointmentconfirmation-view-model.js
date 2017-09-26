var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var geolocation = require("nativescript-geolocation");
var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var navigation = require("~/components/navigation");



function RequestAppConfirmarionViewModel() {
    var data = {
        pageTitle: "Request An Appointment Confirmation",
        isLoading: false,
        selectedScreen: 0

    }

    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        console.log("loading viewModel");
    };

    //Android Tabview Click
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

module.exports = RequestAppConfirmarionViewModel;