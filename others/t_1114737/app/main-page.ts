var app = require("application");
var frameModule = require("ui/frame");
var appSettings = require("application-settings");
import { Observable, fromObject } from 'data/observable'
var application = require("application");
import * as utilsModule from "utils/utils";
var utils = require("medportal-utils");
var modelFactory = require("./model");
// import { Helper } from "../../helpers/helpers"
import * as colorModule from "color"
// import { Settings } from "../../models/Settings"
import * as dialogs from "ui/dialogs";
import { Label } from "ui/label";
import { StackLayout } from "ui/layouts/stack-layout";
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";
import * as listViewModule from "nativescript-telerik-ui/listview"

// import { Encounter } from "../../models/Encounter"

let listView;
var init = false;
var page;
var viewModel;
//let settings: Settings; 
let snackbar: SnackBar;

declare var UIImage: any;

exports.onNavigatingTo = function(args) {
    //settings = new Settings();
    snackbar = new SnackBar();

    // if(!settings.HasLocationData()){
    //     openSettings();
    // }

} 

exports.onPageLoaded = function(args){
    page = args.object;
    listView = page.getViewById("list");


    if (app.android) {

    }

    if(!init){
        viewModel = new modelFactory.createViewModel();
        init = true;
    }else{
        viewModel.refresh();
    }

    loadItems();

    page.bindingContext = viewModel;

    if(application.ios){
        var element = page.getViewById("searchBar").ios;
        element.barTintColor = new colorModule.Color("#c0c0c0").ios;
        element.setBackgroundImage = UIImage.alloc().init();
        //element.searchBarStyle = UISearchBarStyleMinimal;
    } else {
        var layout = page.getViewById("layout").android;
        var searchbox = page.getViewById("searchBar");
        layout.setFocusableInTouchMode(true);
        layout.setFocusable(true);
        searchbox.android.clearFocus();

        var globalScroll = page.getViewById("globalScroll");
        var subScroll = page.getViewById("subScroll");

        globalScroll.android.setHorizontalScrollBarEnabled(false);
        subScroll.android.setHorizontalScrollBarEnabled(false);

    }
}

exports.onProfile = function(args){
    utils.getProfile().then((data) => {
        console.log("PROFILE");
            console.dir(data);
    });
}

exports.onItemTap = function(args){
    var tappedItemIndex = args.index;
    frameModule.topmost().navigate({
        moduleName: "./views/detail/detail",
        context: {
            item: viewModel.items.getItem(tappedItemIndex),
            clerkshipId: viewModel.clerkshipId,
            cohort: viewModel.cohort,
            userID: viewModel.userID
        },
        animated: false
    });
}
 
exports.onSwipeStarted = function(args){
    args.data.swipeLimits.left = 0;
    
    var swipeLimits = args.data.swipeLimits;

    if (application.android) {
    
        var displayDensity = utilsModule.layout.getDisplayDensity();

        swipeLimits.threshold = listView.getMeasuredWidth() / 2;
        swipeLimits.right = listView.getMeasuredWidth() * displayDensity;
    } else {
        swipeLimits.threshold = listView.getMeasuredWidth() / 3;
        swipeLimits.right = listView.getMeasuredWidth();
    }
    console.log("listView.getMeasuredWidth:" + listView.getMeasuredWidth());        
    console.log("DisplayDensity:" + displayDensity);    
    console.log("Threshold:" + swipeLimits.threshold);
    console.log("Right:" + swipeLimits.right);
}
 

exports.onSwipeEnded = function (args: listViewModule.SwipeActionsEventData) {
    if (args.data.x > 0) { //Ignore left swipe
        if (Math.abs(args.data.x) >= args.data.swipeLimits.threshold) {
            console.log("Swipe worked: " + Math.abs(args.data.x) + " over threshold " + args.data.swipeLimits.threshold);
            var index = args.index;
        
            var oldItem = viewModel.items.getItem(index);
            console.log(JSON.stringify(oldItem));

            // var encounter = new Encounter();
            // encounter.EncounterID = oldItem.ID;
            // encounter.PatientID = oldItem.PatientTypeID;
            // encounter.RoleID = oldItem.RoleID;
            // encounter.Notes = "";
            // encounter.ClerkshipID = viewModel.clerkshipId;
            // encounter.LocationID = viewModel.locationId;
            // encounter.RotationID = viewModel.rotationId;

            // Helper.SaveEncounter(encounter).then(() => {
            //     snackbar.simple("Logged " + oldItem.Name).then(args => {
            //     });
            // });
        
            var mainView = <StackLayout>args.mainView;
            var status = args.mainView.getViewById("status");
            console.log(status.style.visibility + " " + oldItem.get("Status"));
            status.style.visibility = "visible";
            oldItem.set("Status", "complete");
            oldItem.set("Name", "test");
            console.log(status.style.visibility + " " + oldItem.get("Status"));
        
            listView.notifySwipeToExecuteFinished();
        }
        else {
            console.log("Did not swipe far enough");
            console.log("Width: " + listView.getMeasuredWidth());
            console.log("Threshold: " + args.data.swipeLimits.threshold);
            console.log("x: " + Math.abs(args.data.x));
        }
    }

}

exports.onLoadStats = function(args){
    frameModule.topmost().navigate({
        moduleName: "./views/stats/stats",
        animated: false
    });
}

exports.onOpenSchedule = function(args){
    frameModule.topmost().navigate({
        moduleName: "./views/schedule/schedule",
        context: {},
        animated: false
    });
}

exports.onChangeLocation = function(args){
    openSettings();
}

function openSettings(){
        frameModule.topmost().navigate({
        moduleName: "./views/list/settings/settings",
        context: {
        },
        clearHistory: true,
        animated: true
    });
}

exports.onShowLocation = function (args) {
    var message =  "Logging ECEs for " + settings.ClerkshipName + " in " +  settings.RotationName + " at " + settings.LocationName;

    if (app.ios) {
        dialogs.action({
            title: "Location information",
            message: message,
            actions: ["Close", "Change"]
        }).then((result) => {
            if (result == "Change") {
                openSettings();
            }
        });
    } else {
        dialogs.alert({
            title: "Location information",
            message: message,
            okButtonText: "Okay"
        });
    }    
}

exports.pullToRefreshInitiated = function (args) {
    loadItems().then(function () {
        args.object.notifyPullToRefreshFinished();
    });
}

exports.onSearch = function (args) {
    loadItems();
}

exports.onSearchClear = function (args) {
    loadItems();
}

exports.onFilterIndexChanged = function(args){
    if(args.oldIndex){
        /*var bar = page.getViewById("completionFilterBar");

        viewModel.completionFilter = bar.items[args.newIndex].title;
        viewModel.set("isInitalized", false);
        loadItems();*/
    }
}

function loadItems(){
    listView.suspendUpdates();
    viewModel.items.length = 0;

    return new Promise(function(resolve, reject) {
        var url = "/RestApi/ece/encounters?" + buildUrl();

        console.log("Remote Data");
        console.log(url);
        viewModel.set("isInitalized", false);
        viewModel.items.length = 0;
        utils.getRemoteJson(url, "GET").then(function(data){
            for(var i=0; i< data.length; i++){
                let item: Observable = fromObject(data[i]);
                viewModel.items.push(item); 
            }
            
            console.log("Added " + viewModel.items.length + " items");
            init = true;
            viewModel.set("isInitalized", true);
            listView.resumeUpdates(true);
            resolve();
        });
    });
}

exports.onGlobalFilter = function(args){
    viewModel.set("globalFilter", args.object.filter);
    loadItems();
}

exports.onSubFilter = function(args){
    viewModel.set("subfilter", args.object.filter);
    loadItems();
}


function buildUrl() {
    return "clerkshipID=" + viewModel.clerkshipId  + "&"+
           "cohort=" + viewModel.cohort  + "&"+
           "userID=" + viewModel.userID  + "&"+
           "searchText=" + viewModel.searchText  + "&"+
           "globalFilter=" + viewModel.globalFilter  + "&"+
           "completionFilter=" + viewModel.completionFilter  + "&"+
           "subfilter=" + viewModel.subfilter  + "";
}