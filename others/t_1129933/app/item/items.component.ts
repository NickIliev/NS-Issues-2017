import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { ListView } from "ui/list-view";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    
    lv: ListView;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();  
    }

    onListLoaded(args) {
        this.lv = <ListView>args.object;
        this.lv.ios.cellLayoutMarginsFollowReadableWidth = false;
    }
}