import * as appSettings from 'application-settings';
var utils = require("medportal-utils");
var Observable = require("data/observable").Observable;
var observableArrayModule = require("data/observable-array");
// import { Settings } from "../../models/Settings"



function createViewModel() {
    var profile = utils.mppProfile();
    // let settings: Settings = new Settings();
    
    var viewModel = new Observable();
    viewModel.pageTitle = "";
    viewModel.filterIndex = 0;
    viewModel.items = new observableArrayModule.ObservableArray();
    viewModel.isInitalized = false;    
    viewModel.cohort = profile.UndergradCohort;
    viewModel.userID = profile.UserID;
    viewModel.searchText = "";
    viewModel.globalFilter = "Required";
    viewModel.completionFilter = "All";
    viewModel.subfilter = "Show%20All";

    // viewModel.clerkshipId = settings.ClerkshipID;
    // viewModel.clerkshipName = settings.ClerkshipName;
    // viewModel.rotationId = settings.RotationID;
    // viewModel.RotationName = settings.RotationName;
    // viewModel.locationId = settings.LocationID;
    // viewModel.locationName = settings.LocationName;

    viewModel.refresh = function(){
        // var settings = new Settings();

        // viewModel.set("clerkshipId", settings.ClerkshipID);
        // viewModel.set("clerkshipName", settings.ClerkshipName);
        // viewModel.set("rotationId", settings.RotationID);
        // viewModel.set("crotationName", settings.RotationName);
        // viewModel.set("clocationId", settings.LocationID);
        // viewModel.set("clocationName", settings.LocationName);
    }

    return viewModel;
}

exports.createViewModel = createViewModel;