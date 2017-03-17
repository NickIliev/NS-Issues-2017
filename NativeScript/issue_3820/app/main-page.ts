import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ScrollView } from "ui/scroll-view";

export function onLoaded(args: EventData) { 
    let page = <Page>args.object;

    var scroll = <ScrollView>page.getViewById("scroll");

    scroll.android.setScrollbarFadingEnabled(false);
    scroll.android.setVerticalScrollBarEnabled(true);
    scroll.android.setVerticalFadingEdgeEnabled(false);

    scroll.android.scrollBarDefaultDelayBeforeFade = 5000;
    scroll.android.scrollbarFadeDuration = 0;
}