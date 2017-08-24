import { Component, OnInit } from "@angular/core";

import * as Camera from 'nativescript-camera';

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    ngOnInit() {
        Camera.requestPermissions();
    }

    takePhoto() {
        console.log("Before taking picture");
        Camera.takePicture()
            .then((imageAsset) => {
                console.log("Result is an image asset instance");
            }).catch((err) => {
                console.log("Error -> " + err.message);
            });
    }
}
