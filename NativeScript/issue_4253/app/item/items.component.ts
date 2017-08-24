import { Component, OnInit } from "@angular/core";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    public bindedText: any;

    ngOnInit(): void {
        this.bindedText = "binding"
    }
}
