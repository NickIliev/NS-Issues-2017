import { Component } from "@angular/core";

import { Page } from "ui/page";
import { StackLayout } from "ui/layouts/stack-layout";
import { parse } from "ui/builder";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {
    stack: StackLayout;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private page: Page) {

     }

     ngAfterViewInit() {
        this.stack = this.page.getViewById("container");
        console.log(this.stack);

        console.log('before');
        const view = parse('<AbsoluteLayout><Label text="TESTING"></Label></AbsoluteLayout>');
        console.log('after');

        this.stack.addChild(view);
     }

    addView() {
        console.log('before');
        const view = parse('<Label text="TESTING"></Label>');
        console.log('after');

        this.stack.addChild(view);
    }
}