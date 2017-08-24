var drawerModule = require("nativescript-telerik-ui-pro/sidedrawer");
var ffSideDrawer;
var page;


exports.pageMainNavigated = function(args) {
    page = args.object;
    ffSideDrawer = page.getViewById('ffSideDrawer');
};


var openSideDrawer = function() {
    if(ffSideDrawer.getIsOpen()) {
        ffSideDrawer.closeDrawer();
    } else {
        ffSideDrawer.showDrawer();
    }
};
exports.openSideDrawer = openSideDrawer;