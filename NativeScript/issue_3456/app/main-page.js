function onLoaded(args) {

    var page = args.object;

    var wv = page.getViewById("wv");

    if (android.os.Build.VERSION.SDK_INT >= 21) {  		     
        android.webkit.CookieManager.getInstance().setAcceptThirdPartyCookies(wv.android, true);
    }
}
exports.onLoaded = onLoaded;