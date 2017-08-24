import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { GridLayout } from "ui/layouts/grid-layout";

import { WebView, LoadEventData } from "ui/web-view";

export function onLoaded(args: EventData) {
    let page = <Page>args.object;

    let grid = <GridLayout>page.getViewById("grid");

    let webView = new WebView();
    webView.src = "https://github.com";
    
    webView.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
        let message;
        if (!args.error) {
            message = "WebView finished loading " + args.url;
        }
        else {
            message = "Error loading " + args.url + ": " + args.error;
        }
    });

    grid.addChild(webView);    
}