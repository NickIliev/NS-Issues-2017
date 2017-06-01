import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {

    public webViewSrc: string = "https://www.nativescript.org/";

    onWebViewLoaded(args) {

        var webview = args.object;

        let myWebChromeClient = new MyWebChromeClient();

        webview.android.setWebChromeClient(myWebChromeClient);

    }

}


class MyWebChromeClient extends android.webkit.WebChromeClient {
    constructor() {
        super();
        return global.__native(this);
    }

    onShowFileChooser() {
        console.log("Test");
    }
}