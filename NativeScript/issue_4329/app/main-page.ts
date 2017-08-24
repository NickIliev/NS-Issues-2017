import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { StackLayout } from "ui/layouts/stack-layout";
import { ScrollView } from "ui/scroll-view";
import { screen, ScreenMetrics } from "platform";
let screenScale;
let scroll;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onPageLoaded(args: EventData) {
    let page = <Page>args.object;

    let stack = <StackLayout>page.getViewById("stack");
    scroll = <ScrollView>page.getViewById("scroll");
    
    screenScale = screen.mainScreen.scale;
    console.log("screenScale; " + screenScale);

    page.bindingContext = new HelloWorldModel();
}

export function onStackLoaded(args: EventData) {
    let stack = <StackLayout>args.object;

    setTimeout(function () {
        console.log("stack.getMeasuredHeight: " + stack.getMeasuredHeight());
        console.log("stack.getMeasuredWidth: " + stack.getMeasuredWidth());

        let heightDP = stack.getMeasuredHeight() / screenScale;
        let widthDP = stack.getMeasuredWidth() / screenScale;
        console.log("heightDP: " + heightDP);
        console.log("widthDP: " + widthDP);

        scroll.scrollToVerticalOffset(heightDP/2); // will scroll to 1000DP (as the total height is 2000)
    }, 100);
}
