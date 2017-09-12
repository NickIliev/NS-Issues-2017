import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as frame from "ui/frame";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

}

export function goBack() {
    frame.goBack();
}