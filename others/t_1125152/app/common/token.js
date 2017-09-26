var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var app = require('application');
var http = require("http");
var constants = require("~/common/constants");
var httpStatusCode = require("~/common/exceptions").httpStatusCode;
var nativeExceptions = require("~/common/exceptions").nativeExceptions;
var appSettings = require("application-settings");
var timer = require("timer");
var timerSetTimeOut;
var appStateTimer;
var timerSetTimeOut;
var timerStatus = "incomplete";
var date1;
var date2;

var utility = {
    //activity check starts @ 4 mins
    startTimer: function (token) {
        if (appSettings.getBoolean("activeSession")) {
            var seconds;
            if (constants.referralEaseUrl != 'http://stage.srhgrafx.com/uhservices/') {
                seconds = 2 * 60 * 1000
            } else {
                seconds = 60 * 60 * 1000
            }
            clearTimeout(timerSetTimeOut);
            //console.log("startTimer", token);
            timerSetTimeOut = timer.setTimeout(() => {
                var i = 0;
                console.log("timer finished");
                timerStatus = "complete";
                var context = {
                    title: "Are you still working?",
                    message: "Your session will expire in ",
                    type: "confirm",
                    token: token
                }
                if (appSettings.getString("appState") != "suspended") {
                    utility.launchPopup("confirm", function (data) {
                    }, null, context);
                }
                console.log("active timer: ", i++);
            }, seconds);
            timerSetTimeOut;
        }
    },

    startAppStateTimer: function () {
        // console.log("startAppStateTimer");
        // console.log("activeSession", appSettings.getBoolean("activeSession"));
        // console.log("date1",new Date().getTime());
        date1 = new Date().getTime();
        if (appSettings.getBoolean("activeSession") == true) {
            console.log("session Active")
            var i = 0;
            appStateTimer = timer.setInterval(function () {
                appSettings.setNumber("timerSuspended", i++);
                console.log("suspended timer: ", appSettings.getNumber("timerSuspended"));
            }, 1000);
        } else {
            appSettings.setBoolean("activeSession", false);
            timer.clearInterval(appStateTimer);
            console.log("session Inactive");
        }
    },

    stopAppStateTimer: function () {
        // console.log("date2",new Date().getTime());        
        // console.log("stopAppStateTimer");
        // console.log("dateDiff",(date2 - date1));
        date2 = new Date().getTime();
        timer.clearInterval(appStateTimer);
        clearTimeout(timerSetTimeOut);
        if ( (date2 - date1) > (2 * 60 * 1000) ) {
            // appSettings.setNumber("timerPopUp", 0);
            // appSettings.setNumber("timerSuspended", 0);
            console.log("timer done");
            timer.setTimeout(() => {
                console.log("redirecting home...");
                utility.deleteToken(appSettings.getString("token"));
                utility.resumePopup();
                appSettings.setBoolean("activeSession", false);
            }, 500);
        }
    },

    updateToken: function (token) {
        if (appSettings.getBoolean("activeSession")) {
            console.log("updateToken", token);
            var requestOptions = {
                url: constants.referralEaseUrl + "Authenticate/UpdateToken?token=" + token,
                method: "POST",
                headers: { "Content-Type": "application/json", "token": token }
            };
            return utility.httpRequest(null, requestOptions,
                function (response) { // success callback
                    //console.log("update token response", JSON.stringify(response));
                    var data = response.content.toJSON();
                    if (data.Messages.toString() != "Success") {
                        var context = {
                            title: "Your session has expired",
                            message: "Sessions expire after five minutes of inactivity. Please try scheduling this referral again."
                        };
                        utility.popUp("action", function (data) {
                            // callback
                        }, null, context);
                        frameModule.topmost().navigate({
                            moduleName: "views/welcome/main/",
                            transition: {
                                name: "slideRight",
                                duration: 380,
                                curve: "easeIn"
                            }
                        });
                    } else {
                        utility.startTimer(token);
                        //console.log("token updated");
                    }
                },
                function () { // error callback
                    content.log("error");
                }
            );
        }
    },

    deleteToken: function (token) {
        appSettings.setBoolean("activeSession", false);
        clearTimeout(timerSetTimeOut);
        console.log("delete token", token);
        var requestOptions = {
            url: constants.referralEaseUrl + "Authenticate/DeleteToken?token=" + token,
            method: "POST",
            headers: { "Content-Type": "application/json", "token": token }
        };
        return utility.httpRequest(null, requestOptions,
            function (response) { // success callback
                console.log("delete token response", JSON.stringify(response));
                var data = response.content.toJSON();
                appSettings.setString("token", null);
            },
            function () { // error callback
                content.log("error");
            }
        );
    },

    launchPopup: function (type, callback, cancelCallback, context) {
        if (!appSettings.getBoolean("isShowingModal")) {
            //console.log("launch popup");

            context.type = type;
            context.okButtonText = "Continue";
            context.cancelButtonText = "Leave";

            frameModule.topmost().currentPage.showModal("./components/token-timer/token-timer", context, function (confirm) {
                if (confirm == false) {
                    console.log("false confirm");
                    utility.deleteToken(context.token);
                } else {
                    console.log("true confirm");
                }
                if (confirm) {
                    utility.updateToken(context.token);
                    console.log("click to update token");
                    if (callback) {
                        callback();
                    }
                }
                else {
                    if (cancelCallback) {
                        cancelCallback();
                        utility.deleteToken(context.token);
                        console.log("delete token")
                    }
                }
            }, true);
        }
    },

    showCalendar: function (type, callback, cancelCallback, context) {
        if (!appSettings.getBoolean("isShowingModal")) {
            console.log("launch calendar, update token");
            utility.updateToken(context.token);

            context.type = type;
            context.okButtonText = "Continue";
            context.cancelButtonText = "Leave";

            frameModule.topmost().currentPage.showModal("./components/calendar/calendar", context, function (confirm) {
                if (confirm == false) {
                    console.log("false confirm");
                    utility.deleteToken(context.token);
                } else {
                    console.log("true confirm");
                };
                if (confirm) {
                    utility.updateToken(context.token);
                    console.log("click to updat token");
                    if (callback) {
                        callback();
                    }
                }
                else {
                    if (cancelCallback) {
                        cancelCallback();
                        utility.deleteToken(context.token);
                        console.log("delete token")
                    }
                }
            }, true);
        }
    },

    resumePopup: function (type, callback, cancelCallback, context) {
        appSettings.setBoolean("isShowingModal", false);
        if (!appSettings.getBoolean("isShowingModal")) {
            //console.log("launch popup");
            var context = {
                title: "Session Time out",
                message: "Your Schedule Me Now session has timed out."
            };
            context.type = "action";
            context.okButtonText = "Continue";
            context.cancelButtonText = "Leave";
            frameModule.topmost().currentPage.showModal("./components/popup/popup", context,
                function (confirm) {
                    frameModule.topmost().navigate({
                        moduleName: "views/welcome/main/",
                        transition: {
                            name: "slideRight",
                            duration: 380,
                            curve: "easeIn"
                        },
                        clearHistory: true,
                        backstackVisible: false
                        
                    });                            
                    if (confirm) {
                        if (callback) {
                            callback();
                        }
                    } else {
                        if (cancelCallback) {
                            cancelCallback();
                        }
                    }
                }, false);
            
            // if (app.android) {
            //     frameModule.topmost().currentPage.showModal("./components/popup/popup", context,
            //         function (confirm) {
            //             if (confirm) {
            //                 if (callback) {
            //                     callback();
            //                 }
            //             } else {
            //                 if (cancelCallback) {
            //                     cancelCallback();
            //                 }
            //             }
            //         }, false);
            // } else {
            //     frameModule.topmost().navigate({
            //         moduleName: "views/welcome/main/",
            //         transition: {
            //             name: "slideRight",
            //             duration: 380,
            //             curve: "easeIn"
            //         }
            //     });                
            //     dialogs.alert({
            //         title: "Session Time out",
            //         message: "Your Schedule Me Now session has timed out.",
            //         okButtonText: "OK"
            //     }).then(function () {
            //         console.log("SMN Timeout Dialog");
            //     });
            // }
        }
    },

    hideKeyboardsOnTapOutside: function (layout) {
        // traverse children and hide all keyboard input when
        // touching things other than the editable fields
        utility.getChildViewsFromLayout(layout).forEach(function (child) {
            if (child) {
                if (child.typeName !== "TextField" &&
                   child.typeName !== "EditText") {
                    child.on("touch", function () {
                        utility.hideKeyboardInputForLayout(frameModule.topmost().currentPage);
                    });
                }
                if (child._childrenCount > 0) {
                    // traverse children
                    utility.hideKeyboardsOnTapOutside(child);
                }
            }
        }, this);
    },

    hideKeyboardInputForLayout: function (layout) {
        //  traverse children and call dismissSoftInput if editable field
        utility.getChildViewsFromLayout(layout).forEach(function (child) {
            if (child) {
                if (child.typeName === "TextField" ||
                   child.typeName === "EditText") {
                    child.dismissSoftInput();
                }
                else if (child._childrenCount > 0) {
                    // traverse children
                    utility.hideKeyboardInputForLayout(child);
                }
            }
        }, this);
    },

    getChildViewsFromLayout: function (layout) {
        var returnViews = [];
        layout._eachChildView(function (child) {
            returnViews.push(child);
        });
        return returnViews;
    },

    httpRequest: function (viewModel, requestOptions, callback, failCallback) {
        var that = viewModel;
        return http.request(requestOptions)
        .then(function (response) {
            //console.log("get categories completed");
            if (response.statusCode == 200) {
                if (callback) {
                    callback(response);
                }
            }
            else {
                var errorMsg = utility.getErrorMessage(response.statusCode);
                that.showError(errorMsg);

                if (failCallback) {
                    failCallback();
                }
            }
        })
        .catch(function (e) {
            var error = "";
            if (e.message) {
                error = "Error occurred: " + e.message
                if (app.android &&
                   e.message.includes("java.net.UnknownHostException")) {
                    error = nativeExceptions.android["java.net.UnknownHostException"] || "Error occurred: " + e.message;
                }
                else if (app.ios && e.message.includes("The Internet connection appears to be offline.")) { // TODO: update with ios UnknownHostException
                    error = nativeExceptions.ios["The Internet connection appears to be offline."] || "Error occurred: " + e.message;
                }
            }
            else {
                error = "Error occurred: " + e;
            }
            that.showError(error);
            if (failCallback) {
                failCallback();
            }
        });
    },

    getErrorMessage: function (statusCode) {
        return (httpStatusCode[statusCode] != null ? httpStatusCode[statusCode] : httpStatusCode["default"]);
    },

    resetAppSettings: function () {
        appSettings.setBoolean("isShowingModal", true);
        appSettings.setBoolean("forceLocation", false);
        appSettings.setBoolean("isLocationSearchInitialized", false);
    }

};

module.exports = utility;