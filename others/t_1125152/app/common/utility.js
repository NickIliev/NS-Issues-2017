var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var app = require('application');
var http = require("http");
var httpStatusCode = require("~/common/exceptions").httpStatusCode;
var nativeExceptions = require("~/common/exceptions").nativeExceptions;
var applicationSettingsModule = require("application-settings");

var utility = {

    launchPopup: function (type, callback, cancelCallback, context) {
        if (!context.okButtonText) {
            context.okButtonText = 'CONTINUE';
            context.cancelButtonText = 'CANCEL';
        };
        if (!applicationSettingsModule.getBoolean("isShowingModal")) {
            //console.log("launch popup");

            if (!context) {
                context = {
                    title: "Alert: Leaving App",
                    message: 'You are leaving the application.',
                }
            }
            context.type = type;
            context.okButtonText = "Continue";
            context.cancelButtonText = "Cancel";

            frameModule.topmost().currentPage.showModal(
                "./components/popup/popup",
                context,
                function (confirm) {
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
        }
    },


hideKeyboardsOnTapOutside: function (layout) {
    // traverse children and hide all keyboard input when
    // touching things other than the editable fields
    utility.getChildViewsFromLayout(layout).forEach(function(child) {
        if(child) {
            if(child.typeName !== "TextField" &&
                child.typeName !== "EditText") {
                child.on("touch", function() {
                    // Check if currentPage instance exists
                    if (frameModule.topmost().currentPage !== null) {
                        utility.hideKeyboardInputForLayout(frameModule.topmost().currentPage);
                    }
                });
            }
            if(child._childrenCount > 0) {
                // traverse children
                utility.hideKeyboardsOnTapOutside(child);
            }
        }
    }, this);
},

    leavingapp: function (callback, cancelCallback, context) {
        if (!applicationSettingsModule.getBoolean("isShowingModal")) {
            //console.log("launch popup");

            frameModule.topmost().currentPage.showModal("./common/leaving-app/leaving-app", context, function (confirm) {
                if (confirm) {
                    if (callback) {
                        callback();
                    }
                }
                else {
                    if (cancelCallback) {
                        cancelCallback();
                    }
                }
            }, true);
        }
    },

    launchMap: function (action, callback, cancelCallback, context) {
        if (!applicationSettingsModule.getBoolean("isShowingModal")) {
            //console.log("launch popup");
            frameModule.topmost().currentPage.showModal("./components/provider-map/provider-map", context, function (confirm) {
                if (confirm) {
                    if (callback) {
                        callback();
                    }
                }
                else {
                    if (cancelCallback) {
                        cancelCallback();
                    }
                }
            }, true);
        }
    },

    hideKeyboardInputForLayout: function (layout) {
        //  traverse children and call dismissSoftInput if editable field
        utility.getChildViewsFromLayout(layout).forEach(function(child) {
            if(child) {
                if(child.typeName === "TextField" ||
                   child.typeName === "EditText") {
                    child.dismissSoftInput();
                }
                else if(child._childrenCount > 0) {
                    // traverse children
                    utility.hideKeyboardInputForLayout(child);
                }
            }
        }, this);
    },

    getChildViewsFromLayout: function (layout) {
        var returnViews = [];
        layout.eachChildView(function (child) {
            returnViews.push(child);
        });
        return returnViews;
    },

    httpRequest: function(viewModel, requestOptions, callback, failCallback) {
        var that = viewModel;
        return http.request(requestOptions)
        .then(function (response) {
            //console.log("get categories completed");
            if (response.statusCode == 200) {
                if(callback) {
                    callback(response);
                }
            }
            else {
                var errorMsg = utility.getErrorMessage(response.statusCode);
                that.showError(errorMsg);

                if(failCallback) {
                    failCallback();
                }
            }
        })
        .catch(function (e) {
            var error = "";
            var title = "Error";
            if(e.message) {
                error = "Error occurred: " + e.message
                if(app.android &&
                    e.message.includes("java.net.UnknownHostException")) {
                    error = nativeExceptions.android["java.net.UnknownHostException"].message || "Error occurred: " + e.message;
                    title = nativeExceptions.android["java.net.UnknownHostException"].title;
                }
                else if(app.ios && e.message.includes("The Internet connection appears to be offline.")) { // TODO: update with ios UnknownHostException
                    error = nativeExceptions.ios["The Internet connection appears to be offline."].message || "Error occurred: " + e.message;
                    title = nativeExceptions.ios["The Internet connection appears to be offline."].title
                }
            }
            else {
                error = "Error occurred: " + e;
            }
            that.showError(error, title);
            if(failCallback) {
                failCallback();
            }
        });
    },

    getErrorMessage: function(statusCode) {
        return (httpStatusCode[statusCode] != null ? httpStatusCode[statusCode] : httpStatusCode["default"]);
    },

    resetAppSettings: function() {
        applicationSettingsModule.setBoolean("isShowingModal", false);
        applicationSettingsModule.setBoolean("forceLocation", false);
        applicationSettingsModule.setBoolean("isLocationSearchInitialized", false);
    },

    formatPhoneNumber: function(phoneNumber) {
        return (phoneNumber != null ? phoneNumber.replace("(", "").replace(")", "-") : phoneNumber);
    },

    showError: function (error, title) {
        console.log(error);
        console.log(typeof title);
        var context = {
            title: typeof title === "undefined" ? "Error" : title,
            message: error
        }
        this.launchPopup("acknowledge", function (data) {
            // callback
        }, null, context);
    }
};

module.exports = utility;