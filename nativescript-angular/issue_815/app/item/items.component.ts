import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    now = Date.parse('2017-05-22T07:05:09Z');

    ngOnInit() {
        console.log(this.now); // miliseconds from 1.1.1970
    }
}

