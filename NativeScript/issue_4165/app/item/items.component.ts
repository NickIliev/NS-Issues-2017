import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { Label } from "ui/label";

import { GestureTypes, SwipeGestureEventData } from "ui/gestures";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    @ViewChild("lbl") lbl: ElementRef;
    label: Label;

    constructor(private itemService: ItemService) { 
        
    }

    ngOnInit(): void {
        this.label = this.lbl.nativeElement;


        this.label.on("swipe", () => {
            console.log("on swipe");
        });

        this.items = this.itemService.getItems();
    }
}
