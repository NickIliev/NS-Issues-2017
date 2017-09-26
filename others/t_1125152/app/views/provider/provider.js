var Observable = require("data/observable").Observable;
var imageSource = require("image-source");
var utils = require("utils/utils");
var builder = require("ui/builder");
var firebase = require("nativescript-plugin-firebase");
var navigation = require("~/components/navigation");
var frame = require("ui/frame");
//var tools = require("nativescript-swiss-army-knife").SwissArmyKnife();
var app = require("application");

var utility = require("~/common/utility");
var View = require("~/common/view-base")
var ObservableArray = require("data/observable-array").ObservableArray;
var tabViewModule =require("ui/tab-view");
var ProviderViewModel = require("./provider-view-model");

var stackLayoutModule = require("ui/layouts/stack-layout");
var textViewModule = require("ui/text-view");
var view = new View();
view.viewModel = new ProviderViewModel();
var phone = require("nativescript-phone");

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

    that.webView = that.page.getViewById("wvAwards");

    // hide android webView zoom controls
    if (that.webview && that.webView.android) {
        that.webView.android.getSettings().setBuiltInZoomControls(false);
    }

    that.navigationContext = that.page.navigationContext;
    that.viewModel.set("selectedScreen", "tap1");
    that.viewModel.load(that.navigationContext.providerId);

    // disable tab menu scrollbar
    if(app.ios) {
        var scrollview = that.page.getViewById("horizontalScroll");
        if (scrollview.ios) {
            scrollview.ios.showsHorizontalScrollIndicator = false;
        }
    }

};

view.listViewLoaded = function listViewLoaded(args) {
    var listView = args.object;
    if (listView.ios) {
        listView.ios.separatorStyle = UITableViewCellSeparatorStyle.UITableViewCellSeparatorStyleNone;
    }
}

view.populateTabView = function (args) {
    var that = view;
    console.log("start populating tab view");

    var tabView = that.page.getViewById("tvProviderDetails");
    if (that.viewModel.get("Locationstab") === "show") {
        tabView.items.push(view.createTabViewItem("OfficeLocation", "Office Locations"));
    }

    if (that.viewModel.get("biotab") === "show") {
        tabView.items.push(view.createTabViewItem("Biography", "Biography"));
    }
    if (that.viewModel.get("Educationstab") === "show") {
        tabView.items.push(view.createTabViewItem("Education", "Education"));
    }
    if (that.viewModel.get("Expertisetab") === "show") {
        tabView.items.push(view.createTabViewItem("Expertise", "Expertise"));
    }
    if (that.viewModel.get("Insurancestab") === "show") {
        tabView.items.push(view.createTabViewItem("Insurances", "Insurances"));
    }

    if (that.viewModel.get("industrytab") === "show") {
        tabView.items.push(view.createTabViewItem("IndustryRelationships", "Industry Relationships"));
    }

    var myStack = tabView.parent;
    myStack.removeChildren();
    myStack.addChild(tabView);
    console.log("end populating tab view");
}

view.createTabViewItem = function (fileName, tabTitle){
    var tabViewItem = new tabViewModule.TabViewItem();
    tabViewItem.title = tabTitle;
    var tabContent = builder.load({
        path: "~/views/provider",
        name: fileName,
        page: view.page
    });
    tabViewItem.view = tabContent;
    return tabViewItem;
}

view.viewModel.on("doneLoadingProviderDetails", function (eventData) {
    var that = view;

    if (app.android) {
        that.populateTabView();
    }
});

view.getDirections = function (args) {
    var that = view;
    var locationData = args.view.bindingContext;

    utility.leavingapp(function (data) {
        var provider = that.viewModel.get('selectedProvider');
        var providerId = null;
        if(provider != null) {
            providerId = provider.ProviderID;
        }
        firebase.analytics.logEvent({
            key: "ProviderGetDirections",
            parameters: [
            {
                key: "ProviderID",
                value: provider != null && provider.ProviderID != null ? provider.ProviderID.toString() : null
            }]
        });
        utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + locationData.Coordinates.Latitude + "," + locationData.Coordinates.Longitude);
    }, function(data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.creatingVideo = function (args) {
    if(require('application').android) {
        var nativeView = new com.google.android.youtube.player.YouTubePlayerView(args.context);
        //nativeView.getParent().setLayerType(android.view.View.LAYER_TYPE_NONE, null);

        var onInitializedListener = new com.google.android.youtube.player.YouTubePlayer.OnInitializedListener(
            {
                onInitializationFailure: function(provider, error) {
                    alert("Error is[" + error + "]");
                },
                onInitializationSuccess: function (provider, player) {
                    player.cueVideo("UxjgUjVpe24");
                },
            });
  
        // This is the google services personal ID, please replace it.
        nativeView.initialize("AIzaSyA0mwtxBgOp2Nj7fCiYTAZThx8z9Xf5Ux0", onInitializedListener)
        args.view = nativeView;
    }
    else {
        var test = "ios";
    }
};

view.goBackToResults = function (args) {
    var topmost = frame.topmost();
    topmost.goBack();
};

view.callAppointmentNumber = function (args) {
    var that = view;
    var selectedProvider = view.viewModel.get("selectedProvider");

    var appointmentNumber = selectedProvider.AppointmentPhone ? selectedProvider.AppointmentPhone : navigation.callToSchedule();
    utils.openUrl("tel://" + appointmentNumber);

    firebase.analytics.logEvent({
       key: "ProviderCallToSchedule",
       parameters: [
       {
           key: "ProviderID",
           value: selectedProvider != null && selectedProvider.ProviderID != null ? selectedProvider.ProviderID.toString() : null
       }]
    });
};

view.requestAnAppointment = function (args) {
    var that = view;
    var provider = that.viewModel.get('selectedProvider');
    navigation.goToRequestedAppointment({
        FullName: provider.FullName,
        Degree: provider.Degree,
        Specialties: provider.Specialties
    });
};

view.TabViewMenuTap = function (args) {
    var id = args.object.id;

    view.viewModel.set("selectedScreen", id);
    console.log("Tapped tab menu item with id: " + id);

    //var offset = ;
    //that.scroll.scrollToHorizontalOffset(offset);
};
view.onTapZocDocWidget = function(args) {
    var that = view;

    var provider = that.viewModel.get("selectedProvider");

    if(provider.ZocDocId) {

        utility.leavingapp(function (data) {
            firebase.analytics.logEvent({
                key: "ScheduleOnZocDoc",
                parameters: [
                {
                    key: "ZocDocId",
                    value: provider != null && provider.ZocDocId != null ? provider.ZocDocId.toString() : null
                },
                {
                    key: "ProviderID",
                    value: provider != null && provider.ProviderID != null ? provider.ProviderID.toString() : null
                }]
            });
            utils.openUrl("http://www.zocdoc.com/doctor/" + provider.ZocDocId);
        }, function (data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });

    }
    else {
        that.viewModel.showError("There was an error opening ZocDoc scheduling for this provider.");
    }

};

view.launchMap = function (args) {
    var that = view;
    try {
        var location = args.object.get("parent").get("parent").bindingContext;

        utility.leavingapp(function (data) {
            // firebase.analytics.logEvent({
            //     key: "LocationGetDirections",
            //     parameters: [
            //     {
            //         key: "LocationID",
            //         value: location != null && location.LocationID != null ? location.LocationID.toString() : null
            //     }]
            // });
            console.log("launching map for " + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);

            var formattedAddress = "";
            if (location.Address1) {
                // using street address
                formattedAddress += location.Address1;

                if (location.Address2) {
                    formattedAddress += " " + location.Address2;
                }
                if (location.City && location.State) {
                    formattedAddress += " " + location.City + ", " + location.State;
                }
                if (location.PostalCode) {
                    formattedAddress += " " + location.PostalCode;
                }
            }
            else if (location.Coordinates &&
                    location.Coordinates.Latitude &&
                    location.Coordinates.Longitude) {
                // using geocordinates
                utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);
            }
            else {
                that.showError("Error mapping location. Could not find address or geocordinates for selected location.");
            }
            utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + encodeURIComponent(formattedAddress));
        }, function (data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    }
    catch(ex) {
        console.log("Failed to get location for launchMap");
    }
};

view.uhcare = navigation.callToSchedule;

view.aapcall = function (args) {

    var appphone = args.object.text;
    console.log("Dial appointmentNumbertext" + appphone);
    phone.dial(appphone, true);

};

module.exports = view;
