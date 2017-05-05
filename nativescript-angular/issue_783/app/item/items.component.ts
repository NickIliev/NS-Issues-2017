import { Component, OnInit, NgZone } from "@angular/core";
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { on as applicationOn, launchEvent, suspendEvent, resumeEvent, exitEvent, lowMemoryEvent, uncaughtErrorEvent, ApplicationEventData, start as applicationStart } from "application";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService, private routerExtensions: RouterExtensions, private ngZone: NgZone) { 
        applicationOn(suspendEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("suspendEvent")
                console.log("Activity: " + args.android);

            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });

        applicationOn(resumeEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.


                this.routerExtensions.navigate(['/pin'], { clearHistory: true, animated: false });


                console.log("resumeEvent")
                console.log("Activity: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
}
