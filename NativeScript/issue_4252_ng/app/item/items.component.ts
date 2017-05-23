import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import * as http from "http";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();

        http.request({
            url: "https://httpbin.org/patch",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
        }).then(function (response) {
            let result = response.content.toJSON();

            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    var element = result[key];
                    console.log(key + " " + element);
                }
            }

        }, function (e) {
            console.log("Error occurred " + e);
        });
    }
}
