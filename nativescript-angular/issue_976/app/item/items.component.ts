import { Component } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {

    isReg: boolean = false;

    onCheckedChange() {
        this.isReg = !this.isReg; //removing the border-radius (in app.css) will allow the content to show up
        console.log(this.isReg);
        console.log("removing the border-radius (in app.css) will allow the content to show up in iOS");
    }
}