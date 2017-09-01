import { Component } from "@angular/core";
import * as application from "application";

import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent { 
    isExit: boolean = true;
    counter: number = 0;

    backCallback: (data: application.AndroidActivityBackPressedEventData) => void;

    constructor(private routerExtensions: RouterExtensions) {
        console.log("-------->>>  AppComponent.constructor");
    }

    ngOnInit() {
        console.log("-------->>>  AppComponent.ngOnInit");

        this.backCallback = (data: application.AndroidActivityBackPressedEventData) => {
            console.log("-------->>>  EVENT");
        
            console.log(!(this.routerExtensions.canGoBackToPreviousPage()) + " can go back");
            if (!(this.routerExtensions.canGoBack())) {
              console.log("inside router");
              if (this.isExit) {
                console.log("Press once again to exit");
                console.log("open");                    
                data.cancel = true; // It makes the app to stay idle without minimizing
                this.isExit = false;
              }
              else {
                console.log("-------->>>  CLOSE - will detach event");
                data.cancel = false; // It minimizes the app
                application.android.off(application.AndroidApplication.activityBackPressedEvent, this.backCallback);
                this.isExit = true;
              }
              setTimeout(() => {
                this.isExit = true;
              }, 3000);
            }
            // true if there are pages to go back to, and false if there are no pages in the router history
          }
        
        application.android.on(application.AndroidApplication.activityBackPressedEvent, this.backCallback);
    }
}
