
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

export function pageLoaded(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

