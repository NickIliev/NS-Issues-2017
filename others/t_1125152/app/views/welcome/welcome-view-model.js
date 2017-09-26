var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function WelcomeViewModel() {
    var data = {
        pageTitle: "Dashboard",
        isLoading: false,
        selectedScreen: 0,
        showBackButton: false
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {

    };

    return viewModel;
}

module.exports = WelcomeViewModel;