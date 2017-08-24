// import { Component, OnInit } from "@angular/core";

// import { Item } from "./item";
// import { ItemService } from "./item.service";

// @Component({
//     selector: "ns-items",
//     moduleId: module.id,
//     templateUrl: "./items.component.html",
// })
// export class ItemsComponent implements OnInit {
//     items: Item[];

//     constructor(private itemService: ItemService) { }

//     ngOnInit(): void {
//         this.items = this.itemService.getItems();
//     }
// }

import {trigger, style, animate, state, transition } from "@angular/animations";
import {Component} from "@angular/core";

@Component({
    selector: "animation-states",
    template: `
        <stack-layout>
            <Button class="btn" text="Touch me!" [@state]=" isOn ? 'active' : 'inactive' " (tap)="onTap()"></Button>
            <button text="Debug button to interact" (tap)="onTap()"></button>
        </stack-layout>`,
    animations: [
        trigger("state", [
            state("inactive", style({ backgroundColor: "blue", transform: "scaleX(0.5) scaleY(0.5) translateX(-10px) translateY(-10px)"})),
            state("active", style({ backgroundColor: "red", transform: "scaleX(2) scaleY(2) translateX(100px) translateY(100px)"})),
            transition(':enter', []),
            transition('inactive => active', animate('600ms ease-in-out')),
            transition('active => inactive', animate('600ms ease-in-out'))
        ])
    ],
    styles: [
        `.btn {
            width: 100px;
            height: 100px;
        }
        `
    ]
})
export class ItemsComponent {

    isOn = false;
    onTap() {
        this.isOn = !this.isOn;
    }
}
