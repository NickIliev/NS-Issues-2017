import { EventData } from 'data/observable';
import { Page } from 'ui/page';

export function onLoaded(args: EventData) {

    let page = <Page>args.object;
    
    console.log(page.getViewById("btn1")); //undefined
}