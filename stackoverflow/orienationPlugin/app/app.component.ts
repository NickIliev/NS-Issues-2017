import { Component, OnInit } from "@angular/core";
var orientation = require('nativescript-orientation');

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    ngOnInit() {
        orientation.enableRotation();
    }

  
    public onTap() {
        console.log(orientation.getOrientation());  
    }
}
