import { Component } from "@angular/core";

import { Product } from "nativescript-purchase/product";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent { 

    constructor(private product: Product) {
        
    }
}
