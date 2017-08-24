import { Component, OnInit, } from "@angular/core";

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

    constructor(private itemService: ItemService, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    navigateTo(id) {
        this.routerExtensions.navigate(['/item', id], { clearHistory: true, animated: false })
    }
}
