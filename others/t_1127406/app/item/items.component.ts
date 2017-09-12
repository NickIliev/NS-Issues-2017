import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    buttonTapped: string;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor() { }

    ngOnInit(): void {
        this.buttonTapped = "";
    }
    onTap(args){
        console.log("on tap");
        console.log("==========");

        this.buttonTapped += " Button tapped!";
    }
}