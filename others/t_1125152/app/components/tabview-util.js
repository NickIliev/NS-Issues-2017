var utility = require("~/common/utility");
var platform = require("platform");

var tabViewUtil = {
    selectTab: function (viewModel, page, index) {
        if (require("application").android) {
            var tabView = page.getViewById("mainTabs");
            if (tabView) {
                tabView.selectedIndex = index;
            }
        }
        else {
            viewModel.set("selectedScreen", index);
        }
    },

    disableCaps: function (page) {
        //if (platform.device.os === platform.platformNames.android) {
        //    utility.getChildViewsFromLayout(page).some(function (child) {
        //        if (child) {
        //            if (child.typeName === "TabView") {
        //                var tab = child._getAndroidTabView();
        //                for (var i = 0; i < child.items.length; i++) {
        //                    tab.getTextViewForItemAt(i).setAllCaps(false);
        //                }
        //            }
        //            else if(child._childrenCount > 0) {
        //                // traverse children
        //                tabViewUtil.disableCaps(child);
        //            }
        //            return child.typeName === "TabView";
        //        }
        //    }, this);
        //}

    }

}

module.exports = tabViewUtil;