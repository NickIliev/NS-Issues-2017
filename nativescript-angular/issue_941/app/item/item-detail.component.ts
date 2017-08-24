import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RouterExtensions } from "nativescript-angular/router";
import { Item } from "./item";
import { ItemService } from "./item.service";

import "rxjs/add/operator/map";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent implements OnInit {
    item: Item;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute, private routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        // const id = +this.route.snapshot.params["id"];
        // this.item = this.itemService.getItem(id);

        this.route.params
        .map(params => this.itemService.getItem(+params["id"]))
        .subscribe(item => this.item = item);
    }

    goToItemThree() {
        console.log("goToNextItem");
        this.routerExtensions.navigate(['/item', 3]);
    }

    backToPrevious() {
        this.routerExtensions.backToPreviousPage();
    }

    back() {
        this.routerExtensions.back();
    }
}
