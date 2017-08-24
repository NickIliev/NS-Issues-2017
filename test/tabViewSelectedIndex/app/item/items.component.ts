import { Component, OnInit } from "@angular/core";

import { SelectedIndexChangedEventData } from "ui/tab-view";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})

export class ItemsComponent {
    public myFirstItem: any;
    public mySecondItem: any;
    public myThirdItem: any;

    constructor() {
        this.myFirstItem = { title: "Selected", iconSource: "~/images/logo.png" };
        this.mySecondItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
        this.myThirdItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
    }

    onIndexChange(args) {
        switch (args.value) {
            case 0:
                console.log(args.value);
                this.myFirstItem = { title: "Selected", iconSource: "~/images/logo.png" };

                this.mySecondItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                this.myThirdItem = { title: "NativeScript", iconSource: "~/images/icon.png" };

                break;
            case 1: 
                console.log(args.value);
                this.myFirstItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                this.mySecondItem = { title: "Selected", iconSource: "~/images/logo.png" };
                this.myThirdItem = { title: "NativeScript", iconSource: "~/images/icon.png" };

                console.log(this.mySecondItem.iconSource)
                break;
            case 2:
                console.log(args.value);
                this.myFirstItem = { title: "NativeScript", iconSource: "~/images/icon.png" };
                this.mySecondItem = { title: "NativeScript", iconSource: "~/images/icon.png" };

                this.myThirdItem = { title: "Selected", iconSource: "~/images/logo.png" };
                break;
            default:
                break;
        }
    }
}