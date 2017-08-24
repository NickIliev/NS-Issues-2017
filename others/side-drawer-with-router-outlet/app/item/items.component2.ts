import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router"
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items2",
    moduleId: module.id,
    templateUrl: "./items.component2.html",
})
export class ItemsComponent2 {
    items: Item[];

    constructor(private router: RouterExtensions) { }
    onTap() {
        console.log("back button tap");
        this.router.back();
    }
}
