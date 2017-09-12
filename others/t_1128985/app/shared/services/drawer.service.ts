import { Injectable } from "@angular/core";
import { SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";

@Injectable()
export class DrawerService {

    public drawer: SideDrawerType;

    public toggle(force?: boolean) {        
        //this.drawer.toggleDrawerState();
        this.drawer.showDrawer();
        // if (this.drawer) {
        //     if (typeof force !== "undefined") {
        //         if (force === false) {
        //             this.drawer.closeDrawer();
        //         }
        //     } else {
        //         this.drawer.toggleDrawerState();
        //     }
        // } else {
        // }
    }

    public enableGesture(isEnable?: boolean) {
        this.drawer.gesturesEnabled = isEnable;

    }
}