var navigation = require("~/components/navigation");
//var accelerometer = require("~/components/accelerometer").startAccelerometerUpdates;
var timer = require("timer");
var firebase = require("nativescript-plugin-firebase");

//var z;
//accelerometer(function (data) {
//    z = data.z;
//},
//    { sensorDelay: "normal" }
//);

//timer.setInterval(() => {
//    var i = 0;
//    i++;
//    console.log(i + ". " + z);
//}, 2000);

exports.findProviderTap = function (e) {
    navigation.goToProviderSearchPage();
    firebase.analytics.logEvent({
        key: "TapTile",
        parameters: [
        {
            key: "Name",
            value: "Find a Doctor"
        }]
    });
};

exports.findLocationTap = function (e) {
    navigation.goToLocationSearchPage();
    firebase.analytics.logEvent({
        key: "TapTile",
        parameters: [
        {
            key: "Name",
            value: "Find a Location"
        }]
    });
};

exports.findPHRTap = function (e) {
    navigation.goToFindPHR();
    firebase.analytics.logEvent({
        key: "TapTile",
        parameters: [
        {
            key: "Name",
            value: "My Personal Health Record"
        }]
    });
};

exports.findERTap = function (e) {
    navigation.goToFindEROrUrgentCare();
    firebase.analytics.logEvent({
        key: "TapTile",
        parameters: [
        {
            key: "Name",
            value: "Find ER or Urgent Care"
        }]
    });
}
exports.launchReferralEase = function (e) {
    navigation.goToReferralEase();
}
exports.launchScheduling = function (e) {
    navigation.goToScheduling();
    firebase.analytics.logEvent({
        key: "TapTile",
        parameters: [
        {
            key: "Name",
            value: "Schedule Me Now"
        }]
    });
}
exports.uhVirtualVisit = function (e) {
    navigation.goToUHVirtualVisit();
}