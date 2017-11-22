var index = 0;

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
  if (index == 0) {
    webview.src = "https://nativescript.org";
  }
  index += 1;
}
exports.webViewLoaded = webViewLoaded;

