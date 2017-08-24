var viewModel = require('./main-view-model');
var app = require("application");
var observable = require("data/observable");

function pageLoaded(args) {
    var page = args.object;

    var webview = page.getViewById("wv");
    console.log(webview);
    
    if (app.android) {
        var wvSettings = webview.android.getSettings();
        wvSettings.setJavaScriptEnabled(true);
        wvSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        wvSettings.setDomStorageEnabled(true);

        // viewModel.set("htmlString", '<iframe width="100%" height="540" src="http://d585tldpucybw.cloudfront.net/telerik-videos/homepage/video-header.mp4" frameborder="0"></iframe>');

        viewModel.set("htmlString", '<iframe width="100%" height="540" src="video/my-video.mp4" frameborder="0"></iframe>');
    }

    page.bindingContext = viewModel;
}

exports.pageLoaded = pageLoaded;