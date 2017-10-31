import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { RadListView, ListViewStaggeredLayout } from "nativescript-pro-ui/listview";

import { on as applicationOn, off as applicationOff, OrientationChangedEventData } from "application";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    columns: number = 2;

    radList: RadListView;

    constructor(private itemService: ItemService) { 
        console.log("constructor")
    }

onRadListLoaded(args) {
    this.radList = <RadListView>args.object;    
}

ngOnInit() {  
    this.items = this.itemService.getItems();
    applicationOn("orientationChanged", (args: OrientationChangedEventData) => {
        console.log("orientationChanged");

        if(args.newValue == "portrait") {
            let staggeredLayout = new ListViewStaggeredLayout();
            staggeredLayout.scrollDirection = "Vertical";
            staggeredLayout.spanCount = 2;

            this.radList.listViewLayout = staggeredLayout;
        } else {
            let staggeredLayout = new ListViewStaggeredLayout();
            staggeredLayout.scrollDirection = "Vertical";
            staggeredLayout.spanCount = 3;

            this.radList.listViewLayout = staggeredLayout;
        }
    });  
    }

}