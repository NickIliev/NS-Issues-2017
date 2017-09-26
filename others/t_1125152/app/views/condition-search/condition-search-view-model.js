var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var imageSource = require("image-source");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var navigation = require("~/components/navigation");


function ConditionSearchViewModel(items) {
    var data = {
        pageTitle: "Search Providers",
        searchResults: new ObservableArray(items),
        searchTerm: "",
        isLoading: true,
        selectedScreen: 1,
        url: "http://www.uhhospitals.org/health-and-wellness/health-and-wellness-library?device=staywellapp"
    };
    var viewModel = new ViewModel(data);

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

module.exports = ConditionSearchViewModel;