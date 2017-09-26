
import { EventData } from 'data/observable';
import { Page } from 'ui/page';


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    console.log("navigatingTo"); // first event
}

export function navigatedTo(args: EventData) {
    console.log("navigatedTo"); // second event
}

export function loaded(args: EventData) {
    console.log("loaded"); // lastly this event will be fired
}