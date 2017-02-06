import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

let vm = new HelloWorldModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = vm;
}