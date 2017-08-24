import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    public typing: string = "";
    public hint: string = "Type a message";

    public sendMessage(message: string) {
        if (message == "") {
            return;
        }

        this.typing  = "";
    }
}
