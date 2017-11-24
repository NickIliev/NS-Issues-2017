import { Component, OnInit } from "@angular/core";
import { LoadingIndicator } from "nativescript-loading-indicator";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    private indicator: LoadingIndicator;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) {
        this.indicator = new LoadingIndicator();
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        this.showLoader();
    }

    public showLoader() {
        this.indicator.show({ ios: { dimBackground: true } });
    }
}