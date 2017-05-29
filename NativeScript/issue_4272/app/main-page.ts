
import { EventData } from 'data/observable';
import { Page } from 'ui/page';


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

}