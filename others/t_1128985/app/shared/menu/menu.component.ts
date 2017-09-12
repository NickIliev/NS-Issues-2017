import { Component } from "@angular/core";
import { DrawerService } from "../services/drawer.service";

@Component({
    selector: "mb-menu",
    template: `
        <StackLayout (touch)="drawerService.toggle()" class="hamburgerMenu"><Image src="~/images/icon/hamburger_menu.png" class=""></Image></StackLayout>
     `
})
export class MenuComponent {

    constructor(public drawerService: DrawerService) {

    }
}
