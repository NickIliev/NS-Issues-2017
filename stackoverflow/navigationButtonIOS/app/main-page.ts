import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { topmost } from "ui/frame";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function goToSub() {
    topmost().navigate({
        moduleName: "sub-page",
        // clearHistory: true  // set this and NavigationButton wont appear in the next page
    });
}