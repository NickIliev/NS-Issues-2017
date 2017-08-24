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

    constructor(private routerExtensions: RouterExtensions, private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    goToFiveWithClearHistory() {
        this.routerExtensions.navigate(["item/5"], { clearHistory: true });
    }

    goToFiveWithClearHistoryAndNoTransition() {
        this.routerExtensions.navigate(["item/5"], { animated: false, clearHistory: true });
    }

    goToFiveWithClearHistoryAndTransition() {
        this.routerExtensions.navigate(["item/5"], { transition: {
            name: "slide",
            duration: 2000
        }, clearHistory: true });
    }

    goToFiveWithoutClearHistory() {
        this.routerExtensions.navigate(["item/5"], { clearHistory: false });
    }
}
