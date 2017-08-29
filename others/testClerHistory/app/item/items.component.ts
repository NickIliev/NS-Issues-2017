import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService, private _routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    onTap() {
        this._routerExtensions.navigate(["/item", 3], {
            animated: false,
            clearHistory: true
          });
    }
}