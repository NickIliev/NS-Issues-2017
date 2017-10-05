import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-initial",
    moduleId: module.id,
    templateUrl: "./initial.component.html",
})
export class InitialComponent {

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions) { }


    navigate() {
        this.routerExtensions.navigate(['/items'], {
            transition: {
                name: "fade",
                duration: 500
            }
        });
    }
}