'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    // additional requires
    viewModel = require('./homeView-view-model');

// additional functions
var stripeModule = require('nativescript-stripe');

var stripe = new stripeModule.Stripe('pk_test_3kSd0ztS0q1OaOC9IaZnIhx2');
var cc;

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    cc = page.getViewById("card");

    if (isInit) {
        isInit = false
        // additional pageInit
    }
 
    
    cc.name = "Osei Fortune";


    stripe.createToken(cc.card, (error, token) => {
        if (!error) {
            //Do something with your token; 

        } else {
            console.log(error);
        }
    });


}

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
exports.pageLoaded = pageLoaded;