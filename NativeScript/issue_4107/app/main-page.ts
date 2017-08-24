/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { StackLayout } from "ui/layouts/stack-layout";
import { WebView } from "ui/web-view";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    let stack = <StackLayout>page.getViewById("container");

    const webView = new WebView();
    webView.src = "<html></html>";
    webView.on(WebView.loadedEvent, () => {
        console.log("TEST TEST TEST")
    });

    stack.addChild(webView);
}