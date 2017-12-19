
var frameModule = require("ui/frame");

function pageLoaded(args) {
  var page = args.object;

var tabView = page.getViewById("tab");

tabView.items.forEach(tabViewItem => {
    var tabBarItem = tabViewItem._iosViewController.tabBarItem;
    tabBarItem.titlePositionAdjustment = { horizontal: 0, vertical: 0 };
});

  // tabViewItem1.nativeView.setTitlePositionAdjustment({ horizontal: 0, vertical: -20 });
}
exports.pageLoaded = pageLoaded;
