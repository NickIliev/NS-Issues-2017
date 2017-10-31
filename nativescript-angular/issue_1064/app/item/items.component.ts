import { Component, ViewChild, ElementRef } from "@angular/core";
import { GridLayout } from "ui/layouts/grid-layout";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {

    @ViewChild("grid") ref : ElementRef;

    ngAfterViewInit() {
        console.log(this.ref);
        console.log(this.ref.nativeElement); // GridLayout
    }
}