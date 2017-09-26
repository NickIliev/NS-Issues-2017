var Observable = require("data/observable").Observable;
var utility = require("~/common/utility");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function MainViewModel(options) {
    var data = {
        pageTitle: options.pageTitle,
        isLoading: true
    };
    var viewModel = new ViewModel(data);

    return viewModel;
}

exports.MainViewModel = MainViewModel;