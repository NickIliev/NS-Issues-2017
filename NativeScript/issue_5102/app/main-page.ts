import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { topmost } from "ui/frame";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onEvent(args: EventData) {
    if (args.eventName === "loaded") {
        console.log("Loaded event! (just before OFF)"); 
        // on intial load the loaded event will be removed
        // then on navigating to sub-age and back the loaded event won't be attached adn this code will never execute again
    }

    console.log(args.object + ":" + args.eventName);
    try {
        args.object.off(args.eventName);
        console.log("Event with name "+ args.eventName + " removed!");
    } catch (error) {
        console.log(error.stack);
    }
}

export function nav() {
    topmost().navigate("sub-page");
}