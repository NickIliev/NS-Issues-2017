import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { ListView } from "ui/list-view";

@Component({
    selector: "ns-items",
    templateUrl: "items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    @ViewChild("listview") lv: ElementRef;
    listview: ListView;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.listview = this.lv.nativeElement;
        this.items = this.itemService.getItems();
    }

    scrollToBottom() {
        this.listview.scrollToIndex(this.items.length - 1);
    }
}
