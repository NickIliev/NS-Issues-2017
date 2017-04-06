var application = require('application'),
    mainModule = 'components/homeView/homeView';

var fresco = require("nativescript-fresco");

if (application.android) {
    application.onLaunch = function (intent) {
        fresco.initialize();
    };
}

application.start({
    moduleName: mainModule
});