import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { ListView } from "ui/list-view";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

onListLoaded(args) {
    let list = <ListView>args.object;

    setTimeout(function() {
        console.log("actual height size: " + list.getActualSize().height);
        console.log("getMeasuredHeight : " + list.getMeasuredHeight());
    }, 300);
}

}