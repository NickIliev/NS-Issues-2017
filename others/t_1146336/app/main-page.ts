
import { EventData } from 'data/observable';
import { Page } from 'ui/page';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

// Import Section

import { View } from "ui/core/view";
import * as geolocation from "nativescript-geolocation";
import { Image } from "ui/image";
import { Accuracy } from "ui/enums";

// Function to get the current location
export function buttonGetLocationTap() {
    geolocation.isEnabled().then(function (isEnabled) {
        if (!isEnabled) {
            geolocation.enableLocationRequest().then(function () { }, function (e) {
                console.log("Error: " + (e.message || e));
            });
        }
    }, function (e) {
        console.log("Error: " + (e.message || e));
    });

    if (geolocation.isEnabled()) {
        var location = geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high , updateTime: 5000, timeout: 20000 }).
            then(function (loc) {
                console.log("current location as of " + loc.timestamp);
                if (loc) {
                    console.log("Current location is: Longitude => " + loc.longitude + "; Latitude => " + loc.latitude +
                        "; Hor.Accuracy: " + loc.horizontalAccuracy + "; Ver.Accuracy: " + loc.verticalAccuracy);
                }
            }, function (e) {
                console.log("Error: " + e.message);
            });
    }
}