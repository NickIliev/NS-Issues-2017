var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Dialogs = require("ui/dialogs");
var ViewModel = require("~/common/view-model-base")


function TutorialViewModel() {
    var data = {
        pageTitle: "Tutorial",
        isLoading: false,
        selectedScreen: 0
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        var that = this;

    };


    return viewModel;
}


module.exports = TutorialViewModel;