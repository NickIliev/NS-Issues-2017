import { Component } from "@angular/core";
// import { device } from "platform";
// import { DeviceType } from "ui/enums";

// const isTablet: boolean = (device.deviceType == DeviceType.Tablet);
// console.log("isTablet: " + isTablet);

// let cssPath = isTablet ? './tablet.css' : './phone.css';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
    styleUrls: ['./custom.css']
})

export class AppComponent { }
