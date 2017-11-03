import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as webViewModule from "ui/web-view";
import * as platformModule from "platform";


export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;
    var webView = page.getViewById("webView");

    webView.on(webViewModule.WebView.loadFinishedEvent, function(args: webViewModule.LoadEventData) {
        if (platformModule.isAndroid) {
            class MyWebChromeClient extends android.webkit.WebChromeClient {
                constructor() {
                    super();
                    return global.__native(this);
                }
                init() {
                }
                onJsAlert(webview: android.webkit.WebView, url: string, msg: string, result: android.webkit.JsResult): boolean {
                    console.log(msg, "MESSAGE");

                    result.confirm();

                    return true;
                }
            }
            (<webViewModule.WebView>args.object).android.getSettings().setJavaScriptEnabled(true);

            (<webViewModule.WebView>args.object).android.setWebChromeClient(new MyWebChromeClient());
        }

        if (args.error) {
            console.log(args.error);
        }
    });

    page.bindingContext = new HelloWorldModel();
}