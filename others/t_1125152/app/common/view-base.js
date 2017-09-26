var observableModule = require("data/observable");
var applicationSettingsModule = require("application-settings");
var actionBarUtil = require("~/components/action-bar/action-bar-util");
var drawerCallbacks = require("~/components/drawer-menu/drawer-util");
var utils = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");
var frameModule = require('ui/frame');
var utility = require('~/common/utility.js');
var app = require('application');
var tabViewUtil = require("~/components/tabview-util");
var navigation = require("~/components/navigation");

var View = (function (_super) {

    __extends(View, _super);

    function View() {
        _super.apply(this, arguments);
    }
    
    View.drawerButton = null;

    View.prototype.initialize = function (args, options) {
        var that = this;
       
        that.page = args.object;
        that.page.bindingContext = that.viewModel;

        actionBarUtil.initialize(that.page, options);

        that.drawerElement = that.page.getViewById("drawer");
        if(that.drawerElement) {
            that.drawerElement.delegate = new drawerCallbacks();
        }

        if(app.android) {
            utility.hideKeyboardsOnTapOutside(that.page);

            tabViewUtil.disableCaps(that.page);
        }
        
        if(options && options.pageName) {
            firebase.analytics.logEvent({
                key: "ViewPage",
                parameters: [
                {
                    key: "PageName",
                    value: options.pageName
                }]
            });
        }

        applicationSettingsModule.setBoolean("isNavigating", false);
    };

    View.prototype.toggleSideDrawer = function (args) {
        var drawerElement = args.object.actionBar.page.getViewById("drawer");
        if(drawerElement) {
            // hide any soft keyboard showing on the page
            
            if(!drawerElement.getIsOpen()) {
                if(app.android) {
                    utility.hideKeyboardInputForLayout(frameModule.topmost().currentPage);
                }             
            }

            drawerElement.toggleDrawerState();
        }
    };

    View.prototype.callUH = function (args) {
        firebase.analytics.logEvent({
			key: "CallUHButton"
		});
        navigation.callToSchedule();
    };

    return View;

})(observableModule.Observable);

module.exports = View;