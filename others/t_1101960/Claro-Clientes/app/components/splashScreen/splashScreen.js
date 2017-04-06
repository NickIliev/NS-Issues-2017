'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper');


var frameModule = require("ui/frame");
var enums = require("ui/enums");
function pageLoaded(args) {
    var page = args.object;
    // helpers.platformInit(page);
    // Hide the iOS UINavigationBar so it doesn't get in the way of the animation
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    }

    // additional pageLoaded
    if (isInit) {
        isInit = false;
    }
    startCount();

    page.getViewById("Imagen").animate({
        translate: { x: 0, y: 0 },
        duration: 400,
        curve: enums.AnimationCurve.easeOut
    }).then(function () {
        return page.getViewById("Label").animate({
            translate: { x: 0, y: 0 },
            duration: 400,
            curve: enums.AnimationCurve.easeOut
        });
    });


}
exports.pageLoaded = pageLoaded;

var c = 0, t, timer_is_on = 0;
function timedCount() {
    c = c + 1;
    t = setTimeout(function () { timedCount() }, 1000);
    if (c == 10) {
        stopCount();
    }
}

function startCount() {
    //if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
    //}
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;

    try {
        helpers.navigate({
            moduleName: "components/homeView/homeView",
            animated: true,
            transition: {
                name: "slide"
            },
            clearHistory: true,
        });
    }
    catch (err) {
        alert(err.message);
    }
}