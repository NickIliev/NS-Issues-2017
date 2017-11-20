import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls:["./items.component.css"]
})
export class ItemsComponent  {
    isLoggingIn: boolean = true;

    changeValue() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}