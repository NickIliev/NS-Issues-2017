import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    intertialResolution: number;

    myOtherProp: number;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.intertialResolution = 10;
    }

    onValueChange(args) {
        console.log(args.value);
        this.myOtherProp = args.value;
    }
}
