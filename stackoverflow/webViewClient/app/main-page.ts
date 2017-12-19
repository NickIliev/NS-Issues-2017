
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { WebView } from "ui/web-view";

import { WebViewClientSslImpl } from "./web-view";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}


export function onWvLoaded(args) {
    let wv = <WebView>args.object;

    const clientWithSsl = new WebViewClientSslImpl(wv);
    const androidWebView = <android.webkit.WebView>wv.android;
    androidWebView.setWebViewClient(clientWithSsl);
}

