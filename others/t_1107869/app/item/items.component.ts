import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Item } from "./item";
import { ItemService } from "./item.service";

import { ListViewEventData } from "nativescript-telerik-ui-pro/listview";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    providers: [ItemService],
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    private _canBeSelected: boolean = false;

    public itemSelected(args: ListViewEventData) {
        if (this._canBeSelected) {
            console.log("Selectible ITEM!");
            var item = this.items[args.itemIndex];

            item.selected = true; // using selected property of our item to apply the style (and this way overwrite the default selected styling)
        } else {
            console.log("NON-Selectible item!");
            var item = this.items[args.itemIndex];

            item.selected = false; // using selected property of our item to apply the style (and this way overwrite the default selected styling)
        }
    }

    public itemDeselected(args: ListViewEventData) {

        var item = this.items[args.itemIndex];

        item.selected = false;
    }

    public itemSelecting(args: ListViewEventData) {
        // on item selecting we create the rule if the item should be selectable or not
        if (args.itemIndex < 10) {
            this._canBeSelected = true;
        } else {
            this._canBeSelected = false;
        }

        console.log("this._canBeSelected: " + this._canBeSelected);
    }
}
