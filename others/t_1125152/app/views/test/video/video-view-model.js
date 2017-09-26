var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function VideoViewModel() {
    var data = {
        pageTitle: "Video Test",
        isLoading: true
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        var that = this;

    };

    return viewModel;
}

module.exports = VideoViewModel;