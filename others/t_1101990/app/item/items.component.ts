import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { WebView, LoadEventData } from "ui/web-view"

declare var android: any; // this is needed only to overcome the missing declarations files for android API
// if you need intellisense for Andriod api then you can install tns-platform-declarations

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit, AfterViewInit {

    @ViewChild("webview") webviewField: ElementRef;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() { }

    public onWebViewLoaded(args: LoadEventData) {
        console.log("onWebViewLoaded");
        console.log(args.object); // webview

        setTimeout(() => {
            this.show();
        }, 500);
    }

    show() {
        let webView = <WebView>this.webviewField.nativeElement;
        console.log(webView.android); // android.webkit.WebView

        webView.android.getSettings().setUseWideViewPort(true);
        webView.android.getSettings().setLoadWithOverviewMode(true);
        webView.android.getSettings().setJavaScriptEnabled(true);
        webView.android.getSettings().setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm.SINGLE_COLUMN); // notice this parameter is coming from the android API

        var WebChromClient = android.webkit.WebChromeClient.extend({
            onProgressChanged(view, newProgress) {
                console.log(view);
                console.log("this is loading " + newProgress);
            }
        })

        var client = new WebChromClient();

        webView.android.setWebChromeClient(client);
    }
}
