var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var geolocation = require("nativescript-geolocation");
var listViewModule = require("nativescript-telerik-ui/listview");
var app = require("application");
var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var validator = require("email-validator");
var dropdown = require("~/components/dropdown");
var navigation = require("~/components/navigation");

function ContactUHViewModel() {
    var data = {
        pageTitle: "Contact-UH",
        isLoading: false,
        selectedScreen: 0,
        firstname: "",
        lastname: "",
        primaryphone: "",
        email: "",
        comments: "",
        categories: null,
        selectedIndex: -1,
        newValue: "",

    };
    var viewModel = new ViewModel(data);

    viewModel.on(Observable.propertyChangeEvent, function (propertyChangeData) {
        if (propertyChangeData.propertyName === "selectedIndex") {
            console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        }
        // else if (propertyChangeData.propertyName === "primaryphone") {
        //     newValue = propertyChangeData.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3');
        //     console.log(propertyChangeData.propertyName + " Phone number has been changed and the new value is: " + newValue);
        //     viewModel.set("primaryphone", newValue);
        // }
    });


    viewModel.load = function () {
        console.log("loading viewModel");
    };


    viewModel.isValidEmail = function () {
        var email = this.get("email");
        return validator.validate(email);
    };

    //** Bind Categories dropdown **//
    viewModel.getCategory = function () {
        var that = this;
        console.log("get categories started");

        var requestOptions = {
            url: constants.apiUrl + "ContactUH/GetCategory",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };

        utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                var data = response.content.toJSON();
                var categories = [];
                if(app.ios || app.android){
                    categories.push({
                        CategoryID: "",
                        CategoryName: "Please select a category*"
                    });
                }
                data.Data.forEach(function (item) {
                    categories.push({
                        CategoryID: item.CategoryID,
                        CategoryName: item.CategoryName
                    });
                    console.log(JSON.stringify(item));
                });
                that.set("categories", new dropdown(categories, "CategoryName"));
                that.set("selectedIndex", 0);
            },
            function () { // error callback
            });
    }

    //** submit form on submit button **//
    viewModel.submitForm = function () {
        var that = this;
        console.log("get categories started.........................");

        var requestOptions = {
            url: constants.apiUrl + "ContactUH/SubmitForm",
            method: "Post",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                CategoryID: that.categories._array[that.selectedIndex].CategoryID,
                FirstName: that.firstname,
                LastName: that.lastname,
                EmailAddress: that.email,
                Phone: that.primaryphone,
                Comments: that.comments

            })
        };

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                console.log("get categories completed");

                var data = response.content.toJSON();
                console.log("Records inserted successfully");

                utility.launchPopup("acknowledge", null, null, {
                    title: "Thank You",
                    message: "Thank You for contacting University Hospitals. If you need immediate assistance, Please contact us at 1-866-UH4-CARE."
                });

                that.set("firstname", "");
                that.set("lastname", "");
                that.set("email", "");
                that.set("primaryphone", "");
                that.set("comments", "");

            },
            function () { // error callback
                that.showError("Data did not save. Please try again later");
            })
            .then(function () {
                that.set("isSearching", false);
                that.set("searchButtonPressed", false);
            });

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

module.exports = ContactUHViewModel;