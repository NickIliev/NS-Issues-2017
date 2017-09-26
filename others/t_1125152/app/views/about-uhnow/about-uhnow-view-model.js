var Observable = require("data/observable").Observable;
var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var appSettings = require("application-settings");
var appversion = require("nativescript-appversion");
var appVersionName;

function AboutUHNowViewModel() {
    var data = {
        isLoading: false,
        appVersion: null,
        releaseDate: null,
        apiVersion: null
    };
    var viewModel = new ViewModel(data);


    viewModel.load = function () {
        var that = this;
        that.set("appVersion", appSettings.getString("appVersion"));
        //var requestOptions = {
        //    url: constants.referralEaseUrl + "Compatibility/CheckCompatibility/",
        //    method: "POST",
        //    headers: { "Content-Type": "application/json" }
        //};
        //console.log("compatibility request content", requestOptions.url);
        //return utility.httpRequest(that, requestOptions,
        //    function (response) { // success callback
        //        console.log(response);
        //        response = response.content.toJSON();
        //        that.set("releaseDate", viewModel.dateFormat(response.Data.ReleaseDate));
        //        that.set("apiVersion", response.Data.CurrentServiceVersion);
        //    },
        //    function () { // error callback
        //        content.log("error");
        //    }
        //);
    }

    viewModel.dateFormat = function(versionDate) {
        var newDate = versionDate.split("T");
        newDate = newDate[0].split("-")
        newDate = new Date(versionDate).toUTCString();
        newDate = newDate.split(" ");
        newDate = newDate[2] + " " + newDate[1] + ", " + newDate[3];
        return newDate;
    }


    //viewModel.load = function () {
    //    var that = this;

    //};

    return viewModel;
}

module.exports = AboutUHNowViewModel;