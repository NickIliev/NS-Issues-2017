import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { TicketViewModel } from './main-view-model';

export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new TicketViewModel();
}