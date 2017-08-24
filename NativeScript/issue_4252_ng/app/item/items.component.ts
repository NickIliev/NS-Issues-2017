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
            method: "POST",
            headers: { 
                "X-HTTP-Method-Override": "PATCH",
                "Content-Type": "application/json"
            },
            content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
        }).then(function (response) {


            for (var key in response) {
                if (response.hasOwnProperty(key)) {
                    var element = response[key];
                    console.log(key + " " + element);
                }
            }

        }, function (e) {
            console.log("Error occurred " + e);
        });
    }
}
