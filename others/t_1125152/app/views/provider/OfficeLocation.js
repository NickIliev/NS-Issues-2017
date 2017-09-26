var Observable = require("data/observable").Observable;
var imageSource = require("image-source");
var utils = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");
var navigation = require("~/components/navigation");
var frame = require("ui/frame");
var phone = require("nativescript-phone");
var app = require("application");

var utility = require("~/common/utility");
var View = require("~/common/view-base")


exports.getDirections = function (args) {
    //var that = view;
    var locationData = args.object.bindingContext;

    utility.leavingapp(function (data) {
        //var provider = that.viewModel.get('selectedProvider');
        //var providerId = null;
        //if (provider != null) {
        //    providerId = provider.ProviderID;
        //}
        //firebase.analytics.logEvent({
        //    key: "ProviderGetDirections",
        //    parameters: [
        //    {
        //        key: "ProviderID",
        //        value: provider != null && provider.ProviderID != null ? provider.ProviderID.toString() : null
        //    }]
        //});
        utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + locationData.Coordinates.Latitude + "," + locationData.Coordinates.Longitude);
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};


exports.launchMap = function (args) {

    
    try {
        var location = args.object.get("parent").get("parent").bindingContext;

        utility.leavingapp(function (data) {
            // firebase.analytics.logEvent({
            //     key: "LocationGetDirections",
            //     parameters: [
            //     {
            //         key: "LocationID",
            //         value: location != null && location.LocationID != null ? location.LocationID.toString() : null
            //     }]
            // });
            console.log("launching map for " + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);

            var formattedAddress = "";
            if (location.Address1) {
                // using street address
                formattedAddress += location.Address1;

                if (location.Address2) {
                    formattedAddress += " " + location.Address2;
                }
                if (location.City && location.State) {
                    formattedAddress += " " + location.City + ", " + location.State;
                }
                if (location.PostalCode) {
                    formattedAddress += " " + location.PostalCode;
                }
            }
            else if (location.Coordinates &&
                    location.Coordinates.Latitude &&
                    location.Coordinates.Longitude) {
                // using geocordinates
                utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);
            }
            else {
                that.showError("Error mapping location. Could not find address or geocordinates for selected location.");
            }
            utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + encodeURIComponent(formattedAddress));
        }, function (data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    }
    catch(ex) {
        console.log("Failed to get location for launchMap");
    }
};

exports.uhcare = function (args) {
    console.log("hit call to schedule");
    phone.dial("866-844-2273", true);
};

exports.aapcall = function (args) {

    var appphone = args.object.text;
    console.log("Dial appointmentNumbertext" + appphone);
    phone.dial(appphone, true);
};



