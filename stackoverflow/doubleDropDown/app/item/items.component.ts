import { Component, OnInit } from "@angular/core";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    public selectedIndex = 1;
    public items: Array<string> = [];
    public secondaryItems: Array<string> = [];

    constructor() {
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
            this.secondaryItems.push("seconddary item " + i);
        }
    }

    ngOnInit() {

    }
 
    public onchangeState(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
 
    public onopen() {
        console.log("Drop Down opened.");
    }
}
