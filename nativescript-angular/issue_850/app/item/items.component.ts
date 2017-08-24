import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { Label } from "ui/label";
import { TabView, TabViewItem } from "ui/tab-view";

import { TabViewItemDirective } from "nativescript-angular";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    isLoggedIn: boolean = false;

    tabView: TabView;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    onChange() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    onTabLoaded(args) {
        this.tabView = args.object;
    }
}
