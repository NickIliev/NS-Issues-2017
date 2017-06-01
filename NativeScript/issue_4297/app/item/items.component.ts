import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

declare var android: any;

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {

    public webViewSrc: string = "https://www.nativescript.org/";

    onWebViewLoaded(args) {
        var webview = args.object;
        let myWebChromeClient = android.webkit.WebChromeClient.extend({
            onShowFileChooser: () => {
                console.log("Test");
            }
        });
        webview.android.setWebChromeClient(new myWebChromeClient());
    }

}
