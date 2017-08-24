import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { startMonitoring, stopMonitoring, connectionType } from "connectivity";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function monitor() {
    console.log("monitor")
    startMonitoring((newConnectionType: number) => {
        switch (newConnectionType) {
            case connectionType.none:
                console.log("Connection type changed to none.");
                break;
            case connectionType.wifi:
                console.log("Connection type changed to WiFi.");
                break;
            case connectionType.mobile:
                console.log("Connection type changed to mobile.");
                break;

        }
    });
}