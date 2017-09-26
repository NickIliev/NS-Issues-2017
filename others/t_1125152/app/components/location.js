var geolocation = require("nativescript-geolocation");
var constants = require("~/common/constants");
var applicationSettingsModule = require("application-settings");

function dateDiff(a, b) {
  return (b.getTime() - a.getTime());
}

var locationModule = {
    getLocation: function (viewModel, callback) {
        //console.log("Getting Location");
        if(geolocation.isEnabled()) {
            var currentLocation = viewModel.get("currentLocation");
            var locationTimestamp = (currentLocation && currentLocation.timestamp) ? currentLocation.timestamp : null;
            var now = new Date();
            if(locationTimestamp == null ||
               dateDiff(locationTimestamp, now) >= constants.maxLocationAge) {
                geolocation.getCurrentLocation()
                    .then(function (data) {
                        if(data) {
                            viewModel.set("currentLocation", data);
                            console.log("currentLocation" + JSON.stringify(data));
                            callback(true);
                        }
                        else {
                            callback(false);
                        }
                    });
            }
            else {
                callback(true);
            }
        }
        else {
            viewModel.set("currentLocation", {});
            // if(applicationSettingsModule.getBoolean("forceLocation")) {
            applicationSettingsModule.setBoolean("forceLocation", false);
            geolocation.enableLocationRequest()
                .then(function(){
                    geolocation.getCurrentLocation()
                        .then(function (data) {
                            if(data) {
                                viewModel.set("currentLocation", data);
                                console.log("currentLocaiton" + JSON.stringify(data));
                                callback(true);
                            }
                            else {
                                callback(false);
                            }
                        });
                })
                .catch(function (error) {
                    callback(false);
                });
            // }
            // else {
            //     callback(false);
            // }
        }
    },

    requireLocation: function (viewModel, callback) {
        if(geolocation.isEnabled()) {
           callback(true); 
        }
        else {
            geolocation.enableLocationRequest()
                .then(function(){
                    callback(true);
                })
                .catch(function (error) {
                    callback(false);
                });
        }
    }

}

module.exports = locationModule;