import { AfterViewInit, Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Label } from "tns-core-modules/ui/label";

@Component({
    selector: "lifecycle",
    moduleId: module.id,
    template: `
        <GridLayout columns="auto" rows="auto">
            <Label id="label1" col="0" row="0"></Label>
        </GridLayout>
    `
})
export class ItemsComponent implements AfterViewInit {

    private _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    public ngAfterViewInit(): void {
        
        setTimeout(() => {
            let label: Label = this._page.getViewById<Label>("label1");
            // label.android will be undefined on android
            console.log("ngAfterViewInit Android: " + label.android + " iOS: " + label.ios);
        }, 1);

    }
}