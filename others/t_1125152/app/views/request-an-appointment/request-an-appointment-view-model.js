var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var geolocation = require("nativescript-geolocation");
//var listViewModule = require("nativescript-telerik-ui/listview");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var validator = require("email-validator");
var dropdown = require("~/components/dropdown");
var frameModule = require("ui/frame");
var navigation = require("~/components/navigation");
var model = require("./request-an-appointment-model");
function RequestAppointmentViewModel() {
    var data = {
        pageTitle: "Request An Appointment",
        isLoading: false,
        selectedScreen: 0,
        firstname: "",
        lastname: "",
        addressline1: "",
        addressline2: "",
        city: "",
        states: new dropdown([], "DisplayValue"),
        zipcode: "",
        gender: null,
        birthdate: "",
        firstnamecontact: "",
        lastnamecontact: "",
        phoneContact: "",
        emailcontact: "",
        //specialities: null,
        selectedIndex: 0,
        selectedIndexspeciality: 1,
        selectedIndexRelationTypes: 1,
        selectedIndexGenders: 0,

        understand: false,
        self: false,
        partner: false,
        child: false,
        spouse: false,
        other: false,
        male: false,
        female: false,
        StateId: null,
        specialities: new dropdown([], "DisplayValue"),
        relationShipTypesIOS: new dropdown(model.relationshipTypesIOS, "DisplayValue"),
        relationShipTypes: new dropdown(model.relationshipTypes, "DisplayValue"),
        Genders: new dropdown(model.Genders, "DisplayValue"),
        GendersIOS: new dropdown(model.GendersIOS, "DisplayValue"),
        reasonforappointment: null,
        relationship: null,
        appointTypeSelf: false,
        SamePatientInfo: false,
        provider: {},
        SpecialtyId: null,
        SpecialtyID: null,
        referenceNumber: 0,
        providerName: null,
        isLoading: false,
        isSearching: false,
        //relationshipTypes: new ObservableArray(RequestAppointmentModel.relationshipTypes)

    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        console.log("loading viewModel...........................");
    };


    viewModel.on(Observable.propertyChangeEvent, function (propertyChangeData) {
        if (propertyChangeData.propertyName === "selectedIndexRelationTypes") {
            console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        }
        else if (propertyChangeData.propertyName === "selectedIndexGenders") {
            console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        }
        else if (propertyChangeData.propertyName === "selectedIndexspeciality") {
            console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        }
        else if (propertyChangeData.propertyName === "selectedIndex") {
            console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        }
    });

    

    //** Bind Usa States dropdown **//
    viewModel.getStates = function () {
        var that = this;
        console.log("getStates method loading");

        var requestOptions = {
            url: constants.apiUrl + "State/GetAllByCountryId?id=238",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        console.log("hi state")
        utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                var data = response.content.toJSON();
                var states = [ ];
                data.Data.forEach(function (item) {
                    states.push({
                        StateId: item.StateId,
                       // StateName: item.StateName
                       Abbreviation: item.Abbreviation
                    });
                    console.log(JSON.stringify(item));
                });
                //that.set("states", new dropdown(states, "StateName"));
                that.set("states", new dropdown(states, "Abbreviation"));
                that.set("selectedIndex", 34); // default ohio
            },
            function () { // error callback
            });
    }




    //** Bind specialities dropdown **//
    viewModel.getSpecialities = function (args) {
        var that = this;
        console.log("getSpecialities method loading 1" + args);

        var requestOptions = {
            url: constants.apiUrl + "RequestAppointment/GetSpecialities",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };

        utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                var data = response.content.toJSON();
                var specialities = [];
                data.Data.forEach(function (item) {
                    specialities.push({
                        SpecialtyId: item.SpecialtyID,
                        Name: item.Name
                    });
                }); 
                that.set("specialities", new dropdown(specialities, "Name"));

                that.selectSpecialty(args);
            },
            function () { // error callback
            });
    }

    //refershing dropdown and setting match value again 
    viewModel.selectSpecialty = function (args) {
        var that = this;
        var index = 0;
        var count = 0;
        var itemsName = "", itemsName0 = "";
        //console.log(args[1]+"....args........."+typeof(args));
        
        if(args != undefined && typeof(args) == "object"){
            if(args[1] != undefined){
                itemsName = args[1];
                itemsName0 = args[0];
                that.get("specialities")._array.forEach(function (item) {
                    //console.log(JSON.stringify(item));
                    if (item.Name == itemsName.trim() || item.Name == itemsName0.trim()){
                        index = count;
                    }
                    count++;
                });
            } else {
                itemsName = args[0];
                that.get("specialities")._array.forEach(function (item) {
                    //console.log(JSON.stringify(item));
                    if (item.Name == itemsName.trim()){
                        index = count;
                    }
                    count++;
                });
            }
            
        } else if(args != undefined && args.indexOf(',')>0){
            itemsName = args.split(',')[1];
            itemsName0 = args.split(',')[0];
            that.get("specialities")._array.forEach(function (item) {
                //console.log(JSON.stringify(item));
                    if (item.Name == itemsName.trim() || item.Name == itemsName0.trim()){
                        index = count;
                    }
                count++;
            });
        } else {
            that.get("specialities")._array.forEach(function (item) {
                console.log(JSON.stringify(item));
                    if (item.Name == args){
                        index = count;
                    }
                count++;
            });
        }
        // that.get("specialities")._array.forEach(function (item) {
        //     console.log(JSON.stringify(item));
        //         if (item.Name == itemsName.trim()){
        //             index = count;
        //         }
        //         if (item.Name == args){
        //             index = count;
        //         }
        //     count++;
        // });
        console.log("Set index " + index);
        that.set("selectedIndexspeciality", index); //default primary care
    }




    //** Email Validation **//
    viewModel.isValidEmail = function () {
        var email = this.get("emailcontact");
        return validator.validate(email);
    };


    //** submit form on submit button **//



    viewModel.SubmitForm = function () {
         
        var that = this;
        
        that.set("isLoading", true);

        that.set("isSearching", true);
       /* if (that.male == true) {
            that.set("gender", "male");
        }
        else {
            that.set("gender", "female");

        }*/
        var v = that.gender;

        /*if (that.self) {
            that.set("relationship", "Self");
        }
        else if (that.spouse) {
            that.set("relationship", "spouse");
        }
        else if (that.partner) {
            that.set("relationship", "partner");
        }
        else if (that.child) {
            that.set("relationship", "child");
        }
        else if (that.other) {
            that.set("relationship", "other");
        }*/

        console.log("Hit Submit Button");

        //var c = that.specialities._array[that.selectedIndexspeciality].Name;

        //var testa = that.specialities._array;
        //var test2 = that.selectedIndexspeciality;
        //console.log(that.relationShipTypes._array[that.selectedIndexRelationTypes.Value]+"....relationShipTypes");
        var requestOptions = {
            url: constants.apiUrl + "RequestAppointment/SubmitAMAForm",
            method: "Post",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({

                
                AppointmentType: that.relationShipTypes._array[that.selectedIndexRelationTypes].Value || that.relationShipTypesIOS._array[that.selectedIndexRelationTypes].Value,
                //AppointmentType: that.relationShipTypesIOS._array[that.selectedIndexRelationTypes].Value,
                //AppointmentType: that.realtionship,
                PatientStateId: that.states._array[that.selectedIndex].StateId,
                PatientFirstName: that.firstname,
                PatientLastName: that.lastname,
                PatientAddressLine1: that.addressline1,
                PatientAddressLine2: that.addressline2,
                PatientCity: that.city,
                PatientZip: that.zipcode,
               // PatientGender: that.gender,
                //PatientGender:that.Genders._array[that.selectedIndexGenders].Value,
                PatientGender:that.GendersIOS._array[that.selectedIndexGenders].Value || that.Genders._array[that.selectedIndexGenders].Value,
                PatientBirthDate: that.birthdate,
                ContactFirstName: that.firstnamecontact == "" ? that.firstname : that.firstnamecontact,
                ContactLastName: that.lastnamecontact == "" ? that.lastname : that.lastnamecontact,
                ContactPhoneNumber: that.phoneContact,
                ContactEmailAddress: that.emailcontact,
                ClinicalSpecialtyid: that.specialities._array[that.selectedIndexspeciality].SpecialtyId,
                ReasonForAppointment: that.reasonforappointment,
                ProviderName: that.provider.FullName
            })
        };

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback


                var result = response.content.toJSON();

                console.log(result.Data + "Records inserted successfully");


                if (result && result.Data) {
                    var data = result.Data;
                    console.log("request an appointment confirmation tap");
                    navigation.goToRequestedAppointmentConfirmation(data);
                }

                //if (result && result.data) {
                //    console.log("request an appointment confirmation tap");
                //    var data = result.data;
                //    navigation.goToRequestedAppointmentConfirmation(data);
                //}


                //frameModule.topmost().navigate("views/requestappointmentconfirmation/main");

                //frameModule.topmost().navigate({
                //    moduleName: "views/requestappointmentconfirmation/main",
                //    context: {
                //       // erAndUrgentCareOnly: false,
                //        referenceNumber :data
                //    }
                //});


                //utility.launchPopup("acknowledge", null, null, {
                //    title: "Thank You",
                //    message: "We have recieved your request for an appointment and will respond within one business day."
                //});

                that.clearForm();
            },

            function () { // error callback
                that.showError("Data did not save. Please try again later");
            })
            .then(function () {
                that.set("isSearching", false);
                that.set("searchButtonPressed", false);
            });

    }


    viewModel.clearForm = function () {
        var that = this;

        that.set("firstname", "");
        that.set("lastname", "");
        // that.set("addressline1", "");
        // that.set("addressline2", "");
        // that.set("city", "");
        that.set("zipcode", "");
        that.set("birthdate", "");
        that.set("firstnamecontact", "");
        that.set("lastnamecontact", "");
        //that.set("phonenumber", "");
        that.set("phoneContact","");
        that.set("emailcontact", "");
        /*that.set("male", "false");
        that.set("female", "false");
        that.set("self", "false");
        that.set("spouse", "false");
        that.set("partner", "false");
        that.set("child", "false");
        that.set("other", "false");*/
        that.set("selectedIndexGenders", 0);
        that.set("selectedIndexRelationTypes", 1);
        that.set("selectedIndex", 34);
        that.set("selectedIndexspeciality", 1);
        that.set("reasonforappointment", "");
    }

    viewModel.clickLeft = function (args) {
        console.log("i clicked tab " + args.object.id);
        navigation.goToAccessUH();
    }

    viewModel.clickRight = function (args) {
        console.log("i clicked tab " + args.object.id);
        navigation.goToExploreHealth();
    }

    return viewModel;
}

module.exports = RequestAppointmentViewModel;