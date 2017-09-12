import { Component, OnInit } from "@angular/core";
import { EventData, Observable } from 'data/observable';
import * as connectivity from "connectivity";
import { Switch } from "ui/switch";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {

    myText: Date;
    private observable: Observable;
    switchStatus: boolean;
    switch: Switch;

    connectionStatus: string = "checking ...";

    constructor() {
        this.observable = new Observable();
        this.switchStatus = false;
    }

    public onSwitchLoaded(args) {
        this.switch = <Switch>args.object;
    }

    public onStackTap() {
        let connectionType = connectivity.getConnectionType();
        console.log("connectionType: " + connectionType);
        switch (connectionType) {
            case connectivity.connectionType.none:
                this.connectionStatus = "None";
                this.switch.checked = false;
                break;
            case connectivity.connectionType.wifi:
                this.connectionStatus = "Wi-Fi";
                this.switch.checked = true;
                break;
            case connectivity.connectionType.mobile:
                this.connectionStatus = "Mobile";
                this.switch.checked = true;
                break;
            default:
                break;
        }
    }

    public onSecondChecked(args) {
        console.log("switch change value");
        console.log(args.object.checked);
        let connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                args.object.checked = false;
                break;
            default:
                break;
        }
    }
}