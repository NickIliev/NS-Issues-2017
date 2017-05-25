import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: "list",
    moduleId: module.id,
    templateUrl: "items.component.html"
})
export class ItemsComponent implements OnInit {
    groceryList: Array<Object> = [];

    ngOnInit() {
        this.groceryList.push({ name: "Apples" });
        this.groceryList.push({ name: "Bananas" });
        this.groceryList.push({ name: "Oranges" });
        console.dir(this.groceryList)
    }
}