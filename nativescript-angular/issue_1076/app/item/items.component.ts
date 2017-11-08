import { Component, OnInit, NgZone } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import * as app from "application";
import * as enums from "ui/enums";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    items: Item[];
    isLandscape: boolean;
    
    constructor(private itemService: ItemService, private zone: NgZone) {
        app.on('orientationChanged', (args) => {
            console.log(args.newValue);
            this.zone.run(() => {
                if (args.newValue === 'landscape') { 
                    this.isLandscape = true; 
                    console.log(this.isLandscape);
                } else { 
                    this.isLandscape = false; 
                    console.log(this.isLandscape);
                };
            })
        });
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
}