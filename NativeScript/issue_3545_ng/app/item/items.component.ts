import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    public longName: string 

    constructor(private page: Page, private itemService: ItemService) {
        let tf = <TextField>this.page.getViewById("tf");

     }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        this.longName = "This is a Very Long String so its text should be wraped to new line but this is not happening";
    }
}
