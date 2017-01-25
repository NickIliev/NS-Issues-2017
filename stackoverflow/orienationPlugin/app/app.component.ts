import { Component, OnInit } from "@angular/core";
var orientation = require('nativescript-orientation');

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    public counter: number = 16;

    ngOnInit() {
        orientation.enableRotation();
    }

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
        console.log(orientation.getOrientation());  
    }

    public setLandscapeOrientation() {
        orientation.setOrientation("landscape");  
    }

    public setPortraitOrientation() {
        orientation.setOrientation("portrait");  
    }
}
