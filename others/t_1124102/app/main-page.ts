import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Button } from 'ui/button';
import { HelloWorldModel } from './main-view-model';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onButtonLoaded(args) {
    let btn = <Button>args.object;
}