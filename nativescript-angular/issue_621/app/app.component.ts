import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public isVisible: boolean = true;

    onTap() {
        if (this.isVisible) {
            this.isVisible = false;
        } else  {
            this.isVisible = true;
        }
    }
}
