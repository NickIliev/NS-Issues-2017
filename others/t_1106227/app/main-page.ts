import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { WebView } from "ui/web-view";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function onWebviewLoaded(args: EventData) {

    var webView = <WebView>args.object;

    let url = NSURL.URLWithString("http://docs.nativescript.org");

    var userName = "";
    var password = "";

    let post = NSString.stringWithString("UserId=%@&pin=%@," + "@" + userName + ",@" + password);
    let postData = post.dataUsingEncoding(NSUTF8StringEncoding);
    let postLength = "" + postData.length;

    var requestMutable = NSMutableURLRequest.requestWithURL(url);

    requestMutable.HTTPMethod = "POST";
    requestMutable.setValueForHTTPHeaderField(postLength, "Content-Length");
    requestMutable.HTTPBody = postData;

    webView.ios.loadRequest(requestMutable);
}