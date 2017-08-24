import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    textOne: string;
    textTwo: string;
    textThree: string;
    textFour: string;

    ngOnInit(): void {
        this.textOne = "Hello";
        this.textTwo = "how are you? how are you? how are you?";
        this.textThree = "Button";
        this.textFour = "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test";
    }
}
