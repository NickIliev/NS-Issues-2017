import { Component } from "@angular/core";
import { requestPermissions } from "nativescript-camera";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {

    getPermissions() {
        requestPermissions();
    }
}