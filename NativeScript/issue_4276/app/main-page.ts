import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { GridLayout } from "ui/layouts/grid-layout";
import { Color } from "color";

export function onPageLoaded(args: EventData) {
    let page = <Page>args.object;
    let view = <GridLayout>page.getViewById("view1");


    view.backgroundColor = new Color("red");
    view.animate({ backgroundColor: new Color("green"), duration: 2000 });
}