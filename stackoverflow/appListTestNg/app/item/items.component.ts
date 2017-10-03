import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import * as AppList from "nativescript-applist";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService) {
        
        AppList.getInstalledApps((apps) => {
            console.log("Second", "Test");
            console.dir(apps);
        }, { withIcons: true });
        
     }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
}