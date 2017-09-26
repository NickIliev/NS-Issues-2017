var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");
var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var dialogsModule = require("ui/dialogs");
var ContactUHViewModel = require("./contact-uh-view-model");
var utility = require("~/common/utility");
var firebase = require("nativescript-plugin-firebase");
var utils = require("utils/utils");
var phone = require("nativescript-phone");
var view = new View();
view.viewModel = new ContactUHViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

    if(that.viewModel.get("categories") == null) {
        view.viewModel.getCategory();
    }

    that.viewModel.set("firstname", "");
    that.viewModel.set("lastname", "");
    that.viewModel.set("email", "");
    that.viewModel.set("primaryphone", "");
    that.viewModel.set("comments", "");

};


view.SubmitForm = function () {
    var that = view
    var primaryphoneView = that.page.getViewById("primaryphone");

    console.log("submit button clicked");

    if (that.viewModel.email != "" && that.viewModel.firstname != "" && that.viewModel.lastname != "") {

        if (that.viewModel.isValidEmail()) {  // email Validation

            var nameExp = /^[a-zA-Z ]*$/;

            if (that.viewModel.firstname.match(nameExp) && that.viewModel.lastname.match(nameExp)) {   // Name Validation


                var primaryphone = "";
                primaryphone = primaryphoneView.text.replace(/-/g, "");

                if (primaryphone != "" && primaryphone.length == 10) {

                    if (that.viewModel.comments != "") {
                        that.viewModel.set("primaryphone", primaryphone);
                        console.log(primaryphone + " is valid phone!");
                        that.viewModel.submitForm();
                    }
                    else {
                        that.viewModel.showError("Comments can not be blank.");
                    }
                }
                else {
                    that.viewModel.showError("Enter a valid phone number.");
                }
            }
            else {
                that.viewModel.showError("Enter a valid name.");
            }
        }
        else {
            if (that.viewModel.email == "") {
                that.viewModel.showError("Email address can not be blank");
            }
            else {
                that.viewModel.showError("Enter correct email address");
            }

        }
    }
    else {
        that.viewModel.showError("All fields are required.");
    }
}

view.showAccessUH = function (args) {
    /*view.viewModel.set("selectedScreen", 0);*/
    navigation.goToAccessUH();
    console.log("tab1 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};
view.showEHI = function (args) {
    //view.viewModel.set("selectedScreen", 1);
    navigation.goToExploreHealth();
    console.log("tab2 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};
view.requestAppointment = function (args) {
    //view.viewModel.set("selectedScreen", 1);
    navigation.goToRequestedAppointment(args);
    console.log("tab2 click")
    //console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};

// view.dial911 = function () {
//     phone.dial("911", true);

//     console.log("Dial 911");

//     firebase.analytics.logEvent({
//         key: "Dial911"
//     });
// };
view.call911 = function (args) {
    console.log("hit call to 911");
    phone.dial("911", true);
};

view.callToSchedule= navigation.callToSchedule;
module.exports = view;