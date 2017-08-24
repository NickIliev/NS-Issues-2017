/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { WebView, LoadEventData } from "ui/web-view";

let wv: WebView;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
wv = <WebView>page.getViewById("wv");

wv.on("loadFinished", (args) => {
    console.log("getActualSize")
    console.log(wv.getActualSize().height);
    console.log(wv.getActualSize().width);
    console.log("getMeasuredHeight")
    console.log(wv.getMeasuredHeight());
    console.log("getMeasuredWidth")
    console.log(wv.getMeasuredWidth());
})

    page.bindingContext = new HelloWorldModel();
}

export function onWebViewLoaded(args) {
    var webview = args.object;

    setTimeout(function() {
        console.log("getActualSize")
        console.log(webview.getActualSize().height);
        console.log(webview.getActualSize().width);
        console.log("getMeasuredHeight")
        console.log(webview.getMeasuredHeight());
        console.log("getMeasuredWidth")
        console.log(webview.getMeasuredWidth());
    }, 100);
}