import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router"
import { Item } from "./item";
import { ItemService } from "./item.service";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer';

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {
    items: Item[];

    constructor(private router: RouterExtensions) { }

    onTap() {
        console.log("back button tap");
        this.router.back();
    }
}
