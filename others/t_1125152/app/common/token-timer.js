var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var app = require('application');
var http = require("http");
var applicationSettingsModule = require("application-settings");

var utility = {

    launchPopup: function (type, callback, cancelCallback, context) {
        if(!applicationSettingsModule.getBoolean("isShowingModal")) {
            //console.log("launch popup");

            if(!context) {
                context = {
                    title: "Alert: Leaving APP",
                    message: 'You are leaving the application.',
                }
            }
            context.type = type;
            context.okButtonText = "Continue";
            context.cancelButtonText = "Cancel";

            frameModule.topmost().currentPage.showModal("./components/popup/popup", context, function (confirm) {
                if(confirm) {
                    if(callback) {
                        callback();
                    }
                }
                else {
                    if(cancelCallback) {
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
                        utility.hideKeyboardInputForLayout(frameModule.topmost().currentPage);
                    });
                }
                if(child._childrenCount > 0) {
                    // traverse children
                    utility.hideKeyboardsOnTapOutside(child);
                }
            }
        }, this);
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
		layout._eachChildView(function(child) {
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
            if(e.message) {
                error = "Error occurred: " + e.message
                if(app.android &&
                   e.message.includes("java.net.UnknownHostException")) {
                    error = nativeExceptions.android["java.net.UnknownHostException"] || "Error occurred: " + e.message;
                }
                else if(app.ios && e.message.includes("The Internet connection appears to be offline.")) { // TODO: update with ios UnknownHostException
                    error = nativeExceptions.ios["The Internet connection appears to be offline."] || "Error occurred: " + e.message;
                }
            }
            else {
                error = "Error occurred: " + e;
            }
            that.showError(error);
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
    }

};

module.exports = utility;