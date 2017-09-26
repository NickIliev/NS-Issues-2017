var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var applicationSettings = require("application-settings");
var navigation = require("~/components/navigation");
var firebase = require("nativescript-plugin-firebase");
//var calendarModule = require("nativescript-telerik-ui/calendar");
var ViewModel = require("~/common/view-model-base");
var token = require("~/common/token");

var lat;
var lon;
var data;
var practitionerID;
var startDate;
var endDate;
var searchTerm;
var requestOptions;
function ReferralAvailabilityViewModel() {
    var data = {
        pageTitle: "ReferralAvailability",
        isLoading: true,
        height: 0,
        selectedDateIndex: true,
        selectedProvider: {
            Count: -1,
            Data: new ObservableArray([])
        },
        providerLocations: new Observable({
            Count: -1,
            Data: new ObservableArray([])
        }),
        rowLocationIDs: {
            Count: -1,
            Data: new ObservableArray([])
        },
        token: "",
        message: "",
        RestrictedMessage: null
    };

    var viewModel = new ViewModel(data);

    viewModel.load = function (apptInfo) {
        var that = this;

        var events = new Array();

        that.empty();
        that.starRating(apptInfo.rating);
        that.set("isLoading", true);
        that.set("FullName", apptInfo.practitionerName);
        that.set("Specialty", apptInfo.searchTerm);
        that.set("Image", apptInfo.image);
        that.set("token", apptInfo.token);
        that.set("preferred", apptInfo.preferred);
        that.set("bestMatch", apptInfo.bestMatch);
        token.updateToken(that.token);

        newEndDate = new Date(apptInfo.startDate);
        convertedEndDate = new Date(new Date(newEndDate).setMonth(newEndDate.getMonth() + 2));
        var month = convertedEndDate.getMonth() + 1;
        var day = convertedEndDate.getDate();
        var year = convertedEndDate.getFullYear();
        endDate = year + "-" + month + "-" + day;

        var requestOptions = {
            url: constants.referralEaseUrl + "Provider/GetProviderAppointmentsByRange",
            method: "POST",
            headers: { "Content-Type": "application/json", "token": apptInfo.token },
            content: JSON.stringify(
                {
                    SearchTerm: apptInfo.searchTerm,
                    PractitionerID: apptInfo.practitionerID,
                    AppointmentStartDate: apptInfo.startDate,
                    AppointmentEndDate: endDate,
                    CurrentLocation: {
                        Latitude: apptInfo.lat,
                        Longitude: apptInfo.lon
                    }
                }
            )
        };
        console.log(requestOptions.content);
        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                token.updateToken(that.token);
                data = response.content.toJSON();
                //console.log("availability response", JSON.stringify(data));
                that.set("count", data.Data.Count);
                if (data.Data.Count > 0) {
                    providerID = data.Data.ProviderSearchResults;
                    var locations = [];
                    data.Data.ProviderSearchResults.forEach(function (item) {
                        var specialties = [];
                        item.Specialties.forEach(function (item) {
                            specialties.push(item);
                        });
                        that.set("Specialties", specialties.join(", "));
                        that.set("Gender", item.Gender);
                        var fullName = item.FullName + ', ' + item.Degree;
                        var specialty = item.Specialties;
                        //console.log("item");
                        var z = -1;
                        var locationTotal = 0;
                        var providerID = item.ProviderID;
                        var cities = [];
                        item.Locations.forEach(function (item) {
                            var a = -1;
                            //console.log(item.Location.Address1);
                            //console.log(item.RestrictedMessage);
                            //if (item.Location.Address1 == '11100 Euclid Ave') {
                            //    item.RestrictedMessage = "SuperMed accepted at this location starting 10/1/2017";
                            //}else if(item.Location.City == 'Bedford'){
                            //    item.RestrictedMessage = "SuperMed accepted at this location starting 10/1/2017";
                            //}
                            //that.set("RestrictedMessage", item.RestrictedMessage);
                            var IsInsuranceRestricted = item.IsInsuranceRestricted;
                            if (item.Location.Suite) {
                                item.Location.Address1 = item.Location.Address1 + ', Suite ' + item.Location.Suite;
                            };
                            //console.log("IsInsuranceRestricted", item.IsInsuranceRestricted);
                            //console.log("RestrictedMessage", item.RestrictedMessage);
                            // if (item.IsInsuranceRestricted != null || item.IsInsuranceRestricted != '') {
                            //     item.RestrictedMessage = "SuperMed not accepted at UH Cleveland Medical Center, " + item.Location.Address1;
                            // } else {
                            //     item.RestrictedMessage = null
                            // };
                            item.Location.Distance = parseFloat(item.Location.Distance).toFixed(2) + ' mi';
                            item.Location.CityStateZip = item.Location.City + ', ' + item.Location.State + ' ' + item.Location.PostalCode;
                            var distance = parseFloat(item.Location.Distance).toFixed(1) + 'm';
                            item.Location.City = item.Location.City + ' ' + '(' + distance + ')';
                            cities.push(item.Location.City);
                            var apptDates = new Array;
                            var apptTimes = new Array;
                            var apptMeta = new Array;
                            var departmentID = item.DepartmentID;
                            var items = [];
                            var apptCount;
                            //console.log("NoAvailability", item.NoAvailability);
                            if (item.Appointments != null) {
                                z++;
                                var locationID = item.Location.LocationID;
                                //console.log("locationID availability view model", item.Location.LocationID);
                                var joinedDates = [];
                                locationTotal += 1;
                                item.TotalLocations = locationTotal;
                                item.Appointments.forEach(function (item) {
                                    //console.log("appointment item");
                                    a++;
                                    //console.log("date", item.Date);
                                    var date = new Date(item.Date).toUTCString();
                                    date = date.split(" ");
                                    var month = date[2];
                                    var day = date[1];
                                    var weekday = date[0];
                                    var year = date[3];
                                    item.FullName = fullName;
                                    item.Specialty = specialty;
                                    item.DateView = weekday + '\n' + month + ' ' + day;
                                    var AppointmentDate = item.Date;
                                    var k = -1;
                                    item.AppointmentByDay.forEach(function (item) {
                                        k++;
                                        var time = item.StartTime; // your input
                                        time = time.split(':'); // convert to array
                                        var hours = Number(time[0]);
                                        var minutes = Number(time[1]);
                                        var startTime = "" + ((hours > 12) ? hours - 12 : hours);  // get hours
                                        startTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
                                        startTime += (hours >= 12) ? "pm" : "am";  // get AM/PM
                                        item.AppointmentId = item.AppointmentId;
                                        item.AppointmentTypeId = item.AppointmentTypeId;
                                        item.DateView = weekday + ' ' + month + ' ' + day + '\n' + startTime;
                                        item.DateIndex = "DateIndex" + k;
                                        item.isVisible = true;
                                        item.LocationID = locationID;
                                        item.ProviderID = providerID;
                                        item.DepartmentID = departmentID;
                                        item.AppointmentDate = AppointmentDate;
                                        item.AppointmentTime = item.StartTime;
                                        item.LocationIndex = "LocationIndex" + z;
                                        joinedDates.push({ "ApptTime": weekday + ' ' + month + ' ' + day + '\n' + startTime, "AppointmentTypeId": item.AppointmentTypeId, "AppointmentDate": AppointmentDate, "AppointmentTime": item.StartTime, "DepartmentID": departmentID, "ProviderID": providerID, "AppointmentId": item.AppointmentId, "DateIndex": "DateIndex" + k, "LocationIndex": "LocationIndex" + z, "className": "days", "LocationID": item.LocationID, "IsInsuranceRestricted" : IsInsuranceRestricted, "DisplayTime": startTime, "Tap": "selectAppt" });
                                    });
                                    apptCount += item.AppointmentByDay.length;
                                });
                                if (joinedDates.length > 7) {
                                    joinedDates.splice(7);
                                    joinedDates.push({ "ApptTime": " \n ", "AppointmentTypeId": "", "LocationIndex": "LocationIndex" + z, "AppointmentDate": "", "AppointmentTime": "", "DepartmentID": "", "ProviderID": providerID, "AppointmentId": "MoreTimes", "className": "moreTimes", "LocationID": null, "DisplayTime": null, "Tap": "showCalendar" });
                                }
                                //joinedDates[0].className = "daysSelected";
                                item.JoinedDates = joinedDates;
                                that.rowLocationIDs.Data.push("LocationIndex" + z);
                                item.LocationIndex = "LocationIndex" + z;
                                item.LocationItem = locationTotal;
                                item.TotalLocations = 0;
                                //that.providerLocations.Data.push(item);
                                locations.push(item);
                            }
                            item.TotalLocations = locationTotal;
                        });
                        for (var i = 0; i < item.Locations.length; i++) {
                            item.Locations[i].TotalLocations = locationTotal;
                        }
                        that.set("Cities", cities.join(", "));
                        that.set("totalLocations", locationTotal);
                        that.selectedProvider.Data.push(item);
                    });

                    that.providerLocations.set("Data", new ObservableArray(locations));

                    that.set("isLoading", false);
                    that.set("selectedDateIndex", true);
                    that.set("calendarEvents", events);
                } else {
                    that.set("isLoading", false);
                    var context = {
                        title: "No Availability Found",
                        message: "We were unable to find availability for " + apptInfo.practitionerName + ". Please contact University Hospitals at 1-866-UH4-CARE for help scheduling this referral.",
                        okButtonText: "Try Again",
                        cancelButtonText: "Contact UH"
                    };
                    utility.launchPopup("action", function (data) {
                        // callback
                    }, null, context);
                    that.set("message", context.message);
                }
            },
            function () { // error callback
                that.set("isLoading", false);
            }
        );
    };

    viewModel.starRating = function (rating) {
        var that = this;
        var stars;
        if (rating != null) {
            stars = rating * 18;
        } else {
            stars = null;
        }
        that.set("Stars", stars);
        that.set("Rating", rating);
    }

    viewModel.empty = function () {
        var that = this;
        that.providerLocations.set("Data", new ObservableArray([]));
        //if (that.get("providerLocations").Data.length > 0) {
        //    while (that.get("providerLocations").Data.length) {
        //        that.providerLocations.Data.pop();
        //    }
        //}
    };

    viewModel.viewProfile = function (args) {
        var that = this;

        console.log("view profile Practioner ID:", providerID[0].PractitionerID);
        token.updateToken(that.token);
        //applicationSettings.setBoolean("isNavigating",false);
        firebase.analytics.logEvent({
            key: "SMNViewProviderProfile",
            parameters: [
            {
                key: "ProviderID",
                value: providerID[0] != null && providerID[0].ProviderID != null ? providerID[0].ProviderID.toString() : null
            }]
        });
        navigation.goToProviderDetail(providerID[0].PractitionerID, that.token);
    }

    viewModel.showTimes = function (apptDate) {

        var that = this;
        data.Data.ProviderSearchResults.forEach(function (item) {

            item.Locations.forEach(function (item) {
                item.Appointments.forEach(function (item) {
                    item.AppointmentByDay.forEach(function (item) {
                        //console.log(JSON.stringify(item.StartTime));
                    })
                })
            })
        })
        //console.log("apptDate", apptDate);
        that.set("selectedDateIndex", false);
        that.set("height", 100);
    }

    return viewModel;
}

module.exports = ReferralAvailabilityViewModel;