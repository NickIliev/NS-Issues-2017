import { Component} from "@angular/core";
var orientation = require('nativescript-orientation');

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    public onTap() {
        console.log(orientation.getOrientation());  
    }
}
