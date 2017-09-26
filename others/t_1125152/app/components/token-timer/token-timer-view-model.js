var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var timer = require("timer");
var appSettings = require("application-settings");
var constants = require("~/common/constants");
var utility = require("~/common/utility");

var deadline;
var intervalID;

var TokenTimerViewModel = new Observable({
    title: "",
    message: "",
    type: "",
    closeCallBack: ""
});

var i = 0;
TokenTimerViewModel.load = function (context) {
    var that = this;
    deadline = new Date(Date.parse(new Date()) + 60 * 1000);

    that.set("title", context.title);
    that.set("message", context.message);
    that.set("type", context.type);
    that.set("secs", "00");
    that.set("mins", "1");
    TokenTimerViewModel.updateClock(deadline);
    intervalID = timer.setInterval(function () {
        TokenTimerViewModel.updateClock(deadline);
        appSettings.setNumber("timerPopUp", i++);
        console.log("timer: ", appSettings.getNumber("timerPopUp"));
    }, 1000);
};

TokenTimerViewModel.reset = function () {
    var that = this;

    that.set("title", "");
    that.set("message", "");
    that.set("type", "");
    that.set("secs", "");
    that.set("mins", "");
};

TokenTimerViewModel.getTimeRemaining = function (endtime) {
    var that = this;
    var t = Date.parse(endtime) - Date.parse(new Date());
    var secs = Math.floor((t / 1000) % 60);
    var mins = Math.floor((t / 1000 / 60) % 60);
    return {
        'total': t,
        'secs': secs,
        'mins': mins
    };
}


TokenTimerViewModel.clearTimerInterval = function () {
    console.log("timerInterval cleared");
    timer.clearInterval(intervalID);
}

TokenTimerViewModel.updateClock = function (endtime) {
    var that = this;
    var t = TokenTimerViewModel.getTimeRemaining(endtime);
    that.set("secs", ('0' + t.secs).slice(-2));
    that.set("mins", ('0' + t.mins).slice(-2));
    intervalID;
    //console.log("total", t.total);

    if (t.total <= 0) {
        that.closeCallBack(false);
        deadline = new Date(Date.parse(new Date()) + 60 * 1000);
        timer.clearInterval(intervalID);
        appSettings.setNumber("timerPopUp", 0);
        frameModule.topmost().navigate({
            moduleName: "views/welcome/main/",
            clearHistory: true,
            transition: {
                name: "fade",
                duration: 0
            }
        });
    }
}

module.exports = TokenTimerViewModel;