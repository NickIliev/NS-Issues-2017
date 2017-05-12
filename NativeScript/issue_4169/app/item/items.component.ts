import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { Injectable } from "@angular/core";
import { Couchbase } from "nativescript-couchbase";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    public database: Couchbase;

    constructor(private itemService: ItemService) { 

      this.database = new Couchbase("database_name");
      this.database.createView("database_view", "1", function(document, emitter) {
          emitter.emit(document._id, document);
      });
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();


    }
}
