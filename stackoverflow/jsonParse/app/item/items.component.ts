import { Component, OnInit } from "@angular/core";

import { Grocery } from "./item";
import { MyHttpGetService } from "./item.service";


import "rxjs/add/operator/map";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    providers: [MyHttpGetService]
})
export class ItemsComponent implements OnInit {
    groceryList: Array<Grocery> = [];

    constructor(private myHttpGetService: MyHttpGetService) { }

    ngOnInit() {
        this.myHttpGetService.load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach((groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                });
            });
    }
}
