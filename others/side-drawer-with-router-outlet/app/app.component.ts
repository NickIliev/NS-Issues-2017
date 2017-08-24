import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    @ViewChild("RadSideDrawerComponent") public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(public router: Router) { }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;

        console.log(this.drawer);

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.drawer.closeDrawer();
            }
        });
    }

    onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }
}
