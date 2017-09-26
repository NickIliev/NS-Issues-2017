var navigation = require("~/components/navigation");
var firebase = require("nativescript-plugin-firebase");

var menuActions = {
    
    tapHome: function(args) {
        navigation.goToAccessUH();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Home"
            }]
        });
    },

    tapSMN: function(args) {
        navigation.goToScheduling();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Schedule me now"
            }]
        });
    },

    tapFindADoctor: function(args) {
        navigation.goToProviderSearchPage();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Find a Doctor"
            }]
        });
    },

    tapFindALocation: function(args) {
        navigation.goToLocationSearchPage();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Find a Location"
            }]
        });
    },
    
    tapFindERUrgentCare: function(args) {
        navigation.goToFindEROrUrgentCare();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Find ER/Urgent Care"
            }]
        });
    },

    tapSymptomChecker: function(args) {
        navigation.goToSymptomCheckerPage();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Symptom Checker"
            }]
        });
    },

    tapContactUH: function(args) {
        navigation.goToContactUH();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Contact UH"
            }]
        });
    },

    tapTermsOfUse: function(args) {
        navigation.goToTermsOfUse(args);
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Terms of Use"
            }]
        });
    },

    tapAboutUHNow: function(args) {
        navigation.goToAboutUHNow();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "About UH Now"
            }]
        });
    },
    
    tapLogo: function(args) {
        navigation.goToAccessUH();
        firebase.analytics.logEvent({
            key: "MenuItemTap",
            parameters: [
            {
                key: "Name",
                value: "Logo"
            }]
        });
    }

}

module.exports = menuActions