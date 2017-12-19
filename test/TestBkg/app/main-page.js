
function onPageLoaded(args) {
  console.log("onPageLoaded");
}
exports.onPageLoaded = onPageLoaded;

function navigatingTo(args) {
  console.log("on NavigatingTo");
}
exports.navigatingTo = navigatingTo;

function webViewLoaded(args) {
  console.log("on webViewLoaded");

  const webview = args.object;
  if (!args.object.page.isInitiallyLoaded) {
    webview.src = "https://nativescript.org";

    args.object.page.isInitiallyLoaded = true;
  }

}
exports.webViewLoaded = webViewLoaded;

