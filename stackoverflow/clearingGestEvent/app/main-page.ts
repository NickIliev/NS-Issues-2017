import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as gestures from "ui/gestures";

let layout;

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    
    layout = page.getViewById("layout");

    layout.on("swipe", (args:  gestures.SwipeGestureEventData) => {
        console.log("Swipe dir = " + args.direction );
    });
}

export function stopObserver() {
    layout.off("swipe");
}
