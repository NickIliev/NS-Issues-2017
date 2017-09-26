var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");
var applicationSettingsModule = require("application-settings");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var dialogsModule = require("ui/dialogs");
var RequestAppointmentViewModel = require("./request-an-appointment-view-model");
var frame = require("ui/frame");
var utility = require("~/common/utility");
var phone = require("nativescript-phone");
var view = new View();
view.viewModel = new RequestAppointmentViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");
    view.viewModel.clearForm();
    console.log("view loaded.,,,,,,,,");
    that.navigationContext = that.page.navigationContext;
    that.viewModel.set("provider", that.navigationContext.provider);

    if (that.viewModel.get("states") == null || that.viewModel.get("states")._array.length === 0) {
        view.viewModel.getStates();
    }

    if (that.viewModel.get("specialities") == null || that.viewModel.get("specialities")._array.length === 0) {
        view.viewModel.getSpecialities(that.navigationContext.provider.Specialties);

    }
    else {
        view.viewModel.selectSpecialty(that.navigationContext.provider.Specialties);
    }
    //view.viewModel.clearForm();
};


view.chkMale = function (args) {
    console.log("check male");
    var that = view;

    that.page.getViewById("acceptCheckMale").src = "~/images/common/radio_selected.png";
    that.page.getViewById("acceptCheckFemale").src = "~/images/common/radio_unselected.png";
    that.viewModel.set("male", true);

};

view.chkFemale = function (args) {
    console.log("check Female");
    var that = view;
    that.page.getViewById("acceptCheckFemale").src = "~/images/common/radio_selected.png";
    that.page.getViewById("acceptCheckMale").src = "~/images/common/radio_unselected.png";
    that.viewModel.set("female", true);

};


view.reset = function () {
    console.log("all reset radio");
    var that = view;
    that.page.getViewById("rdbSelf").src = "~/images/common/radio_unselected.png";
    that.page.getViewById("rdbSpouse").src = "~/images/common/radio_unselected.png";
    that.page.getViewById("rdbPartner").src = "~/images/common/radio_unselected.png";
    that.page.getViewById("rdbchild").src = "~/images/common/radio_unselected.png";
    that.page.getViewById("rdbOther").src = "~/images/common/radio_unselected.png";
    that.viewModel.set("self", false);
    that.viewModel.set("partner", false);
    that.viewModel.set("child", false);
    that.viewModel.set("spouse", false);
    that.viewModel.set("other", false);

}

view.self = function (args) {
    var that = view;
    view.reset();
    that.page.getViewById("rdbSelf").src = "~/images/common/radio_selected.png";
    that.viewModel.set("self", true);
    console.log("self true");
    that.viewModel.set("appointTypeSelf", true);

}

view.Spouse = function (args) {
    var that = view;
    view.reset();
    that.page.getViewById("rdbSpouse").src = "~/images/common/radio_selected.png";
    that.viewModel.set("spouse", true);
    console.log("Spouse true");
    that.viewModel.set("appointTypeSelf", false);
    that.set("firstnamecontact", "");
    that.set("lastnamecontact", "");
}

view.Partner = function (args) {
    var that = view;
    view.reset();
    that.page.getViewById("rdbPartner").src = "~/images/common/radio_selected.png";
    that.viewModel.set("partner", true);
    console.log("partner true");
    that.viewModel.set("appointTypeSelf", false);
    that.set("firstnamecontact", "");
    that.set("lastnamecontact", "");
}

view.child = function (args) {
    var that = view;
    view.reset();
    that.page.getViewById("rdbchild").src = "~/images/common/radio_selected.png";
    that.viewModel.set("child", true);
    console.log("child true");
    that.viewModel.set("appointTypeSelf", false);
    that.set("firstnamecontact", "");
    that.set("lastnamecontact", "");
}

view.other = function (args) {
    var that = view;
    view.reset();
    that.page.getViewById("rdbOther").src = "~/images/common/radio_selected.png";
    that.viewModel.set("other", true);
    console.log("other true");
    that.viewModel.set("appointTypeSelf", false);
    that.set("firstnamecontact", "");
    that.set("lastnamecontact", "");
}

view.showAccessUH = function (args) {
    //view.viewModel.set("selectedScreen", 0);
    navigation.goToAccessUH();
    console.log("tab1 click");
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"));
};
view.showEHI = function (args) {
    //view.viewModel.set("selectedScreen", 1);
     navigation.goToExploreHealth();
    console.log("tab2 click");
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"));
};


//** All fields Validation ** // 

view.SubmitForm = function (args) {

    var that = view;

    that.viewModel.set("isLoading", false);
    that.viewModel.set("isSearching", false);

    var nameExp = /^[a-zA-Z ]*$/;

    var primaryphoneView = that.page.getViewById("phoneContact");
    var primaryphone = "";
    primaryphone = primaryphoneView.text.replace(/-/g, "");
    //var birthdate = that.page.getViewById("birthdate");
    var birthdate = that.viewModel.birthdate;
    if (that.viewModel.firstname != "" && that.viewModel.lastname != "") {

        // if (that.viewModel.addressline1 != "") {

        //     if (that.viewModel.city != "") {

        //         if (that.viewModel.states != "") {

                    if (that.viewModel.zipcode != "") {

                        if(that.viewModel.selectedIndexGenders >= 1 ){

                        if (that.viewModel.birthdate  != "") {

                            if (primaryphone != "" && primaryphone.length == 10) {

                                if (that.viewModel.isValidEmail() && that.viewModel.emailcontact != "") {

                                    if (that.viewModel.specialities) {
                                        console.log(that.viewModel.reasonforappointment+".....that.viewModel.reasonforappointment");
                                        
                                        if (that.viewModel.reasonforappointment == null || that.viewModel.reasonforappointment == ""){
                                            that.viewModel.reasonforappointment = "";
                                        }
                                        if (that.viewModel.reasonforappointment != "") {

                                               if(that.viewModel.selectedIndexRelationTypes != 1 ){
                                                   if (that.viewModel.firstnamecontact != "") {
                                                    if (that.viewModel.lastnamecontact != "") {
                                                        that.viewModel.set("isLoading", true);
                                                        that.viewModel.set("isSearching", true);
                                                        that.viewModel.SubmitForm(); // submit
                                                    }
                                                    else
                                                        that.viewModel.showError("Please enter your lastname.");
                                                }
                                                else {
                                                    that.viewModel.showError("Please enter your first name.");
                                                }
                                               }
                                               else{
                                                   that.viewModel.SubmitForm();
                                               }
                                            // if (that.viewModel.get("appointTypeSelf") ) {

                                            //     if (that.viewModel.firstnamecontact != "" ) {
                                            //         if (that.viewModel.lastnamecontact != "" ) {
                                            //             that.viewModel.set("isLoading", true);
                                            //             that.viewModel.set("isSearching", true);

                                            //             that.viewModel.SubmitForm(); // submit
                                            //         }
                                            //         else
                                            //             that.viewModel.showError("Please enter your lastname.");
                                            //     }
                                            //     else {
                                            //         that.viewModel.showError("Please enter your first name.");
                                            //     }
                                            // }
                                            // else {
                                            //     if (that.viewModel.firstnamecontact != "") {
                                            //         if (that.viewModel.lastnamecontact != "") {
                                            //             that.viewModel.set("isLoading", true);
                                            //             that.viewModel.set("isSearching", true);
                                            //             that.viewModel.SubmitForm(); // submit
                                            //         }
                                            //         else
                                            //             that.viewModel.showError("Please enter your lastname.");
                                            //     }
                                            //     else {
                                            //         that.viewModel.showError("Please enter your first name.");
                                            //     }
                                            // }

                                        }
                                        else
                                            that.viewModel.showError("Please enter a reason for this appointment.");
                                    }
                                    else
                                        that.viewModel.showError("Please select a clinical area/speciality");
                                }
                                else
                                    that.viewModel.showError("Please enter your email.");
                            }
                            else
                                that.viewModel.showError("Please enter your phone number.");
                        }
                        else 
                            that.viewModel.showError("Please enter the patient's birth date.");
                        } else
                            that.viewModel.showError("Please enter the patient's gender.");
                        }
                    else
                        that.viewModel.showError("Please enter the patient's zip code.");
        //         }
        //         else
        //             that.viewModel.showError("Please select the patient's states.");
        //     }
        //     else
        //         that.viewModel.showError("Please enter the patient's city.");
        // }
        // else
        //     that.viewModel.showError("Please enter the patient's address1.");
    }
    else
        that.viewModel.showError("Please enter the patient's firstname and lastname.");

};


// view.checkUncheckSamePatientInfo = function (args) {
//     var that = view;
//     that.viewModel.set("appointTypeSelf", false);

//     that.viewModel.set("SamePatientInfo", !that.viewModel.get("SamePatientInfo")); // set true/false check box
//     console.log(that.viewModel.get("SamePatientInfo"));
// };

view.goBackToResults = function (args) {
    console.log("hit tap")
    var topmost = frame.topmost();
    topmost.goBack();
};

view.tapCallElyria = function (args) {
    console.log("hit call to Elyria");
    phone.dial("440-329-7500", true);
    //utility.launchPopup("confirm", function (data) {
    //    analytics.trackEvent('LinkClick.Dial911');
    //    utils.openUrl("tel://14403297500");
    //}, null, {
    //    title: "Dialing 1-4403297500 ",
    //    message: "Are you sure want to call 440-329-7500?"
    //});
};


view.TabCallPharma = function (args) {
    console.log("hit call to Paharma");
    phone.dial("440-743-3000", true);
    //utility.launchPopup("confirm", function (data) {
    //    analytics.trackEvent('LinkClick.Dial911');
    //    utils.openUrl("tel://14407433000");
    //}, null, {
    //    title: "Dialing 1-440-743-3000 ",
    //    message: "Are you sure want to call 440-743-3000?"
    //});
};

view.tapCallUhCare = navigation.callToSchedule;
view.call911 = function (args) {
    console.log("hit call to 911");
    phone.dial("911", true);
};

module.exports = view;