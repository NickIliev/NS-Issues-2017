import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    @ViewChild("myStack2") private myStack2: ElementRef;

    ngOnInit(): void {
        // this.myStack2.nativeElement.marginTop = 200;
    }
}