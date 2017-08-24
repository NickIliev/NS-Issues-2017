import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    @ViewChild("CB1") FirstCheckBox: ElementRef;

    constructor(private itemService: ItemService) { }

    public toggleCheck() {
        this.FirstCheckBox.nativeElement.toggle();
    }

    public getCheckProp() {
        console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
}
