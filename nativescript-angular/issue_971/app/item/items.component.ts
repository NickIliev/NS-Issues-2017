import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { TabView } from "ui/tab-view";

import { EventData } from "data/observable";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    @ViewChild('tabView') tabView : ElementRef;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    ngAfterViewInit() : void {
        let nativeElement = <TabView>this.tabView.nativeElement;
        console.log(nativeElement);

    }

    onTabLoaded(args: EventData) {
        let tab = <TabView>args.object;

        console.log("ontabLoaded: " + tab.nativeView)
    }
}