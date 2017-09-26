var frameModule = require("ui/frame");
var utils = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");
var applicationSettingsModule = require("application-settings");
var app = require('application');
var token = require('~/common/token.js');

var utility = require("~/common/utility");
var constants = require("~/common/constants");
var phone = require("nativescript-phone");

// used to prevent from making multiple navigation attempts
function isNavigating() {
    var isNavigating = applicationSettingsModule.getBoolean("isNavigating");
    //console.log("Navigation Attempt: Currently " + (isNavigating ? "" : "NOT ") + "navigating.");
    if (!applicationSettingsModule.getBoolean("isNavigating")) {
        applicationSettingsModule.setBoolean("isNavigating", true);
        console.log("navigating",applicationSettingsModule.getBoolean("isNavigating"));
        return false;
    }
    return true;
}

function deleteToken(){
    if (applicationSettingsModule.getString("token")) {
        console.log("appSetting", applicationSettingsModule.getString("token"));
        token.deleteToken(applicationSettingsModule.getString("token"));
        applicationSettingsModule.setString("token", "");
    }    
}

module.exports = {
    goToDisclaimer: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/disclaimer/disclaimer',
                backstackVisible: false,
                clearHistory: true,
                animated: false
            });
        }
    },

    goToProviderSearchPage: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate("views/provider-search/main");
        }
    },

    goToLocationSearchPage: function () {
        deleteToken();
        if (!isNavigating()) {
            applicationSettingsModule.setBoolean("forceLocation", true);
            frameModule.topmost().navigate({
                moduleName: "views/location-search/main",
                context: {
                    erAndUrgentCareOnly: false
                }
            });
        }
    },

    goToFindEROrUrgentCare: function () {
        deleteToken();
        applicationSettingsModule.setBoolean("isLocationSearchInitialized", false);
        applicationSettingsModule.setBoolean("forceLocation", true);
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: "views/location-search/main",
                context: {
                    erAndUrgentCareOnly: true
                }
            });
        }
    },

    goToInQuicker: function (url) {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/inquicker/main',
                context: {
                    url: url
                }
            });
        }
    },

    goToConditionSearch: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate("views/condition-search/main");
        }
    },

    goToAccessUH: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/welcome/main'
            });
        }
    },

    goToExploreHealth: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/welcome/main',
                context: {
                    explore: true
                }
            });
        }
    },

    goToProviderDetail: function (providerId) {
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/provider/main',
                context: {
                    providerId: providerId
                }
            });
        }
    },

    goToSymptomCheckerPage: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/symptom-checker/main'
            });
        }
    },

    goToFindPHR: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/find-phr/main'
            });
        }
    },

    goToMapPage: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/test/maps/maps'
            });
        }
    },

    goToReferralEase: function () {
        deleteToken();
        frameModule.topmost().navigate({
            //moduleName: 'views/referral-ease/referral-ease'
            moduleName: 'views/tutorial/tutorial'
        });
    },

    goToScheduling: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/schedule-appt/main'
                //moduleName: 'views/tutorial/tutorial'
            });
        }
    },

    goToTermsOfUse: function (args,disclaimer) {
        deleteToken();
        var page = args.object.page;
        //utility.leavingapp(function (data) {
        //    analytics.trackEvent('LinkClick.TermsOfUse.Menu');
        //    utils.openUrl("http://www.uhhospitals.org/terms-and-conditions");
        //}, function (data) {
        //    // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        //});

        firebase.analytics.logEvent({
            key: "ViewTermsAndConditions"
        });

        frameModule.topmost().navigate({
            moduleName: 'views/terms-conditions/terms-conditions',
            context: {
                disclaimer: disclaimer
            }
        });
    },

    goToAboutUHNow: function () {
        deleteToken();
        frameModule.topmost().navigate({
            moduleName: 'views/about-uhnow/about-uhnow'
        });
    },

    goToContactUH: function () {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/contact-uh/main'
            });
        }
    },

    goToRequestedAppointment: function (provider) {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/request-an-appointment/main',
                context: {
                    provider: provider
                }
            });
        }
    },
    goToRequestedAppointmentConfirmation: function (referenceid) {
        deleteToken();
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/requestappointmentconfirmation/main',
                context: {
                    referenceid: referenceid
                }
            });
        }
    },

    launchReferralEase: function (e) {
        deleteToken();
        if (!isNavigating()) {            
            console.log(applicationSettingsModule.getNumber("tutorial"));
            if (applicationSettingsModule.getNumber("tutorial") != 1) {
                console.log("go to tutorial");
                frameModule.topmost().navigate({
                    moduleName: 'views/tutorial/tutorial'
                });
            } else {
                console.log("go to referral ease");
                frameModule.topmost().navigate({
                    moduleName: 'views/referral-ease/referral-ease'
                });
            }
        }
    },

    //callToSchedule: function (args) {
    //    //analytics.trackEvent('LinkClick.CallToSchedule');
    //    //utils.openUrl("tel://18668442273");
    //    console.log("hit call to schedule");
    //    utility.launchPopup("confirm", function (data) {
    //        analytics.trackEvent('LinkClick.Dial911');
    //        utils.openUrl("tel://18668442273");
    //    }, null, {
    //        title: "Dialing 1-8668442273 ",
    //        message: "Are you sure want to call (866)UH4-2273?"
    //    });
    //},

    callToSchedule: function (args) {
        console.log("hit call to schedule");
        phone.dial("866-844-2273", true);
    },

    goToUHVirtualVisit: function () {
        deleteToken();
        frameModule.topmost().navigate({
            moduleName: 'views/uh-virtual-visit/main'
        });
    }

};
