var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var navigation = require("~/components/navigation");
function InQuickerViewModel() {
    var data = {
        pageTitle: "InQuicker Scheduling",
        isLoading: true,
        selectedScreen: 0
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        var that = this;

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

module.exports = InQuickerViewModel;