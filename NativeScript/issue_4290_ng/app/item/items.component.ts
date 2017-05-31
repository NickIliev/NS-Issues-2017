import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { Page } from "ui/page";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService, private page: Page) { }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.items = this.itemService.getItems();
    }
}
