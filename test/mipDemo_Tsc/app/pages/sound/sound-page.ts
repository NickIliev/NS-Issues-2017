import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { SoundViewModel } from "./sound-view-model";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new SoundViewModel();
}