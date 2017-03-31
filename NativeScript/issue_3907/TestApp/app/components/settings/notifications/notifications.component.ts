import { Component } from '@angular/core'


@Component ({
    moduleId: module.id,
    selector: "notifications",
    templateUrl: "notifications.html",
})


export class NotificationsComponent {

    showPro() {
        console.log("navigate to pro")
    }
}