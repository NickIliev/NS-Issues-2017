import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    id: number = 5;
    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private nav: Router
    ) { }

    ngOnInit() {
        this.route.params
            .map(params => this.itemService.getItem(+params["id"]))
            .subscribe(item => this.item = item);
    }

    openDetails(): void {
        console.log("openDetails clicked");
        console.log(this.id);

        this.routerExtensions.navigate(['/item', this.id]);  // This doesn't work

        this.id--;
    }

    goBack() {
        this.routerExtensions.back();
    }
}
