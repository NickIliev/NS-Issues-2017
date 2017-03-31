import { Component } from '@angular/core'
import { Router } from "@angular/router";


@Component ({
    moduleId: module.id,
    selector: "settings",
    templateUrl: "settings.html",
    styleUrls:["settings.css"]
})


export class SettingsComponent {

   
    constructor(private router: Router) {}

    showNotifications() {
        this.router.navigate(["/notifications"])
    }
    
    
    showPro() {
        console.log("navigate to pro")
    }
}