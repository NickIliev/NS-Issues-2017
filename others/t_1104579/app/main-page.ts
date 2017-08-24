import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { StackLayout } from 'ui/layouts/stack-layout';
import { Button } from 'ui/button';

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onPageLoaded(args: EventData) {
    let page = <Page>args.object;
    console.log("onPageLoaded")
}

export function onStackLoaded(args: EventData) {
    let stack = <StackLayout>args.object;
    console.log("onStackoaded")
}

export function onButtonLoaded(args: EventData) {
    let button = <Button>args.object;
    console.log("onButtonLoaded")
}