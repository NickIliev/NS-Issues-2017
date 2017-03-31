var application = require('application'),
    mainModule = 'navigation/navigation';

var platform  = require('platform');

var platform = require("platform");
application.on(application.launchEvent, function (args) {
    if (platform.isIOS) {
        STPPaymentConfiguration.sharedConfiguration().publishableKey = "youApiKey";
    }
});

// START_CUSTOM_CODE_nativeScriptApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_nativeScriptApp
application.start({
    moduleName: mainModule
});