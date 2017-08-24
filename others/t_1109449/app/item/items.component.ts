import { Component, OnInit } from "@angular/core";
import { WebView, LoadEventData } from "ui/web-view";

declare var android: any;
declare var org: any;

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

    onWebViewLoaded(args: LoadEventData) {
        var webView = <WebView>args.object;

        console.log("webView: " + webView);

        webView.android.getSettings().setUseWideViewPort(true);
        webView.android.getSettings().setLoadWithOverviewMode(true);
        webView.android.getSettings().setJavaScriptEnabled(true);
        webView.android.getSettings().setCacheMode(android.webkit.WebSettings.LOAD_NO_CACHE);
        webView.android.getSettings().setRenderPriority(android.webkit.WebSettings.RenderPriority.HIGH);
        webView.android.getSettings().setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm.SINGLE_COLUMN); // notice this parameter is coming from the android API

        var arr = ["ticket=1234567","BASE64"];

        webView.android.postUrl("http://posttestserver.com/post.php", arr);
    }
}
