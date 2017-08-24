import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    clearHistoryFalse() {
        // No problem when clearHistory is set to false via routerExtensions
        // this  issue qwith clearHistory false is only observable when set via HTML
        this.routerExtensions.navigate(["/item/5"], { clearHistory: false })
    }
}
