var app = require("application");
var platform = require("platform");
var frameModule = require("ui/frame");
var actionBar = require("ui/action-bar").ActionBar;
var utils = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");
var navigation = require("~/components/navigation");
var utility = require("~/common/utility");

// TODO: Correct iPhone ActionBar color
function styleActionBar() {
	var topmost = frameModule.topmost();
	if (topmost.ios) {
		var navigationBar = topmost.ios.controller.navigationBar;
		//navigationBar.barTintColor = UIColor.colorWithRedGreenBlueAlpha(0.741, 0.220, 0.224, 1);
		//navigationBar.titleTextAttributes = new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]);
		//navigationBar.barStyle = 0;
		// added this lines of code
    	navigationBar.shadowImage = UIImage.new();
    	navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default)

		//navigationBar.tintColor = UIColor.whiteColor();
	}

	// remove space from navigationButtons section
	// if (app.android) {
	// 	ActionBar actionBar = getSupportActionBar();
	// 	actionBar.setDisplayShowHomeEnabled(false);
	// 	actionBar.setDisplayShowCustomEnabled(true);
	// 	actionBar.setDisplayShowTitleEnabled(false);
	// 	View customView = getLayoutInflater().inflate(R.layout.main_action_bar, null);
	// 	actionBar.setCustomView(customView);
	// 	Toolbar parent =(Toolbar) customView.getParent();
	// 	parent.setContentInsetsAbsolute(0,0);
    // }
};

function hideiOSBackButton() {
	var topmost = frameModule.topmost();
	//if (topmost.ios) {
	//	// Hide the Back arrow
	//	var controller = topmost.ios.controller;
	//	controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
	//}
};

exports.initialize = function (page, options) {
    var contactUH = page.getViewById("contactUH");
    if (contactUH) {
        contactUH.off("tap");
        contactUH.on("tap", function (args) {
			firebase.analytics.logEvent({
				key: "CallUHButton"
			});
            navigation.callToSchedule();
        });
    }

	//var lblContactUH = page.getViewById("lblContactUH");
	//if (lblContactUH) {
    //    lblContactUH.off("tap");
    //    lblContactUH.on("tap", function (args) {
	//		analytics.trackEvent('LinkClick.CallUH');
    //        utils.openUrl("tel://18668442273");
    //    });
    //}

	//var lblContactUHNumber = page.getViewById("lblContactUHNumber");
	//if (lblContactUHNumber) {
    //    lblContactUHNumber.off("tap");
    //    lblContactUHNumber.on("tap", function (args) {
	//		analytics.trackEvent('LinkClick.CallUH');
    //        utils.openUrl("tel://18668442273");
    //    });
    //}

	var tappableLogo = page.getViewById("tappableLogo");
    if (tappableLogo) {
        tappableLogo.off("tap");
        tappableLogo.on("tap", function (args) {
            navigation.goToAccessUH();
        });
    }

    // TODO: don't hide iOS back button if need back button on page
    // also need to show android back button when applicable?
	if(options != null && !options.showBackButton) {
    	hideiOSBackButton();
	}
    styleActionBar();
};