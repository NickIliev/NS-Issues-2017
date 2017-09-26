var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var constants = require("~/common/constants");
var utility = require("~/common/utility");

var UpdateRequiredViewModel = new Observable({
    title: "",
    message: "",
    type: ""
});

UpdateRequiredViewModel.load = function (context) {
    var that = this;

    that.set("title", context.title);
    that.set("message", context.message);
    that.set("type", context.type);
};

UpdateRequiredViewModel.reset = function () {
    var that = this;

    that.set("title", "");
    that.set("message", "");
    that.set("type", "");
};

module.exports = UpdateRequiredViewModel;