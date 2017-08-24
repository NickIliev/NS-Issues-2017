import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
let page: Page;
export function navigatingTo(args: EventData) {

    page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function tapSyncUnsynced(args) {
    var message = page.getViewById('message-manual-journey');
    message.className = message.className + ' pulse';
}