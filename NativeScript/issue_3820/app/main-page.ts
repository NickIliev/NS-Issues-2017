import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ScrollView } from "ui/scroll-view";

export function onLoaded(args: EventData) { 
    let page = <Page>args.object;

    var scroll = <ScrollView>page.getViewById("scroll");

    scroll.android.setScrollbarFadingEnabled(false);
    scroll.android.setVerticalScrollBarEnabled(true);
    scroll.android.setVerticalFadingEdgeEnabled(false);

    console.log(scroll.android);

    scroll.android.setScrollBarDefaultDelayBeforeFade(5000);
    scroll.android.setScrollBarFadeDuration(10);

    console.log(scroll.android.getScrollBarDefaultDelayBeforeFade()) // 5000
    console.log(scroll.android.getScrollBarFadeDuration()) // 10
}