var Observable = require("data/observable").Observable;
var fileSystemModule = require("file-system");
var cacheFileName = "cache.json";
var cacheFile = fileSystemModule.knownFolders.documents().getFile(cacheFileName);

var disclaimerUtil = require("~/components/disclaimer-util");
var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function DisclaimerViewModel() {
    var data = {
        isLoading: false,
        understand: false,
        accept: false
    };
    var viewModel = new ViewModel(data);

    viewModel.isAccepted = function () {
        var that = viewModel;
        return (that.get("understand") && that.get("accept"));
        that.viewModel.set("isLoading", false);
    };

    //viewModel.load = function () {
    //    var that = this;

    //};

    return viewModel;
}

module.exports = DisclaimerViewModel;