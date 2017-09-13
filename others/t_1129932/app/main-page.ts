import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new ViewModel();
}