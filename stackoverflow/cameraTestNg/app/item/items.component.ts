import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { Image } from "ui/image"
import * as camera from "nativescript-camera";

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
    }

    takePicture() {
        camera.takePicture({})
            .then(imageAsset => {
                var image = new Image();
                image.src = imageAsset;
            }).catch(err => {
                console.log(err.message);
            })
    }
}
