import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Array<any> = [];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.extractData();
    }

    private extractData() {
        this.itemService.getItems()
            .subscribe((result) => {

                for (var index = 0; index < result["photos"].length; index++) {
                    var element = result["photos"][index];
                    console.dir(element);

                    this.items.push({
                        id: element["id"],
                        name: element["camera"]["sol"],
                        role: element["camera"]["earth_date"],
                        imageUrl: element["img_src"]
                    });
                }
            }, (error) => {
                console.log(error);
            });
    }
}