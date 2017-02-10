import { Component } from "@angular/core";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {
    pickerItems: Array<number> = [1, 2, 3, 4, 5];
}
