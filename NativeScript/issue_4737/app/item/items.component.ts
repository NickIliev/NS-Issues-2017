import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {
    date = new Date();
    newDate = new Date('2015-05-05');

    onDateChanged(args) {
        console.dir(args);
    }
}