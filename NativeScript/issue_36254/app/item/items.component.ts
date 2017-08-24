import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Array<any>;

    constructor() { }

    ngOnInit(): void {
        this.items = [1, 2, 3, 4, 5]
    }
}
